import { createFileRoute } from "@tanstack/react-router";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { z } from "zod";

const MAX_FILE_BYTES = 8 * 1024 * 1024;

type SniffResult = { ext: "png" | "jpg" | "webp" | "pdf"; mime: string };
function sniffFileType(bytes: Uint8Array): SniffResult | null {
  if (bytes.length >= 8 && bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47
      && bytes[4] === 0x0d && bytes[5] === 0x0a && bytes[6] === 0x1a && bytes[7] === 0x0a) {
    return { ext: "png", mime: "image/png" };
  }
  if (bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) {
    return { ext: "jpg", mime: "image/jpeg" };
  }
  if (bytes.length >= 12
      && bytes[0] === 0x52 && bytes[1] === 0x49 && bytes[2] === 0x46 && bytes[3] === 0x46
      && bytes[8] === 0x57 && bytes[9] === 0x45 && bytes[10] === 0x42 && bytes[11] === 0x50) {
    return { ext: "webp", mime: "image/webp" };
  }
  if (bytes.length >= 5 && bytes[0] === 0x25 && bytes[1] === 0x50 && bytes[2] === 0x44 && bytes[3] === 0x46 && bytes[4] === 0x2d) {
    return { ext: "pdf", mime: "application/pdf" };
  }
  return null;
}

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
        const bytes = new Uint8Array(await file.arrayBuffer());
        const sniffed = sniffFileType(bytes);
        if (!sniffed) {
          return Response.json({ error: "Only PNG, JPG, WEBP or PDF files are allowed" }, { status: 400 });
        }
        const day = new Date().toISOString().slice(0, 10);
        const attachmentPath = `${day}/${crypto.randomUUID()}.${sniffed.ext}`;
        const { error: upErr } = await supabaseAdmin.storage
          .from("refund-screenshots")
          .upload(attachmentPath, bytes, { contentType: sniffed.mime, upsert: false });
        if (upErr) {
          console.error("Refund screenshot upload failed", upErr);
          return Response.json({ error: "Could not upload screenshot" }, { status: 500 });
        }

        const { error } = await supabaseAdmin.from("refund_requests").insert({
          name: parsed.name,
          email: parsed.email,
          phone: parsed.phone,
          programme: parsed.programme,
          payment_date: parsed.paymentDate,
          amount: parsed.amount,
          transaction_id: parsed.transactionId || null,
          reason: parsed.reason,
          details: parsed.details || null,
          recordings_accessed: parsed.recordingsAccessed,
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