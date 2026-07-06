import { createFileRoute } from "@tanstack/react-router";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { z } from "zod";

const MAX_FILE_BYTES = 8 * 1024 * 1024;
const ALLOWED_MIME: Record<string, string> = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/webp": "webp",
  "application/pdf": "pdf",
};

const fieldsSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().min(5).max(40),
  programme: z.string().trim().min(1).max(160),
  paymentDate: z.string().trim().min(1).max(40),
  amount: z.string().trim().min(1).max(40),
  transactionId: z.string().trim().max(120).optional().default(""),
  reason: z.string().trim().min(1).max(2000),
  details: z.string().trim().max(4000).optional().default(""),
  recordingsAccessed: z.union([z.boolean(), z.string()]).optional().default(false).transform((v) => v === true || v === "true" || v === "on"),
});

export const Route = createFileRoute("/api/public/refund-request")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const ct = request.headers.get("content-type") ?? "";
        if (!ct.includes("multipart/form-data")) {
          return Response.json({ error: "Expected multipart/form-data" }, { status: 400 });
        }
        let form: FormData;
        try {
          form = await request.formData();
        } catch {
          return Response.json({ error: "Invalid form data" }, { status: 400 });
        }
        const raw: Record<string, unknown> = {};
        for (const key of [
          "name","email","phone","programme","paymentDate","amount",
          "transactionId","reason","details","recordingsAccessed",
        ]) {
          const v = form.get(key);
          if (v !== null) raw[key] = v;
        }
        let parsed;
        try {
          parsed = fieldsSchema.parse(raw);
        } catch {
          return Response.json({ error: "Invalid input" }, { status: 400 });
        }

        const file = form.get("file");
        if (!(file instanceof File) || file.size === 0) {
          return Response.json({ error: "Payment screenshot is required" }, { status: 400 });
        }
        if (file.size > MAX_FILE_BYTES) {
          return Response.json({ error: "Screenshot must be under 8 MB" }, { status: 400 });
        }
        const ext = ALLOWED_MIME[file.type];
        if (!ext) {
          return Response.json({ error: "Only PNG, JPG, WEBP or PDF files are allowed" }, { status: 400 });
        }

        const day = new Date().toISOString().slice(0, 10);
        const attachmentPath = `${day}/${crypto.randomUUID()}.${ext}`;
        const bytes = new Uint8Array(await file.arrayBuffer());
        const { error: upErr } = await supabaseAdmin.storage
          .from("refund-screenshots")
          .upload(attachmentPath, bytes, { contentType: file.type, upsert: false });
        if (upErr) {
          console.error("Refund screenshot upload failed", upErr);
          return Response.json({ error: "Could not upload screenshot" }, { status: 500 });
        }

        const summary = [
          `Programme: ${parsed.programme}`,
          `Payment date: ${parsed.paymentDate}`,
          `Amount: ${parsed.amount}`,
          parsed.transactionId && `Txn/UTR: ${parsed.transactionId}`,
          `Reason: ${parsed.reason}`,
          parsed.details && `Details: ${parsed.details}`,
          `Blueprint recordings accessed: ${parsed.recordingsAccessed ? "Yes" : "No"}`,
        ]
          .filter(Boolean)
          .join(" | ");

        const { error } = await supabaseAdmin.from("leads").insert({
          source: "refund_request",
          contact_name: parsed.name,
          contact_email: parsed.email,
          contact_phone: parsed.phone,
          summary,
          attachment_path: attachmentPath,
        });

        if (error) {
          console.error("Refund request insert failed", error);
          return Response.json({ error: "Could not save" }, { status: 500 });
        }

        return Response.json({ ok: true });
      },
    },
  },
});