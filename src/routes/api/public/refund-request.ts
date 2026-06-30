import { createFileRoute } from "@tanstack/react-router";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().min(5).max(40),
  programme: z.string().trim().min(1).max(160),
  paymentDate: z.string().trim().min(1).max(40),
  amount: z.string().trim().min(1).max(40),
  transactionId: z.string().trim().max(120).optional().default(""),
  reason: z.string().trim().min(1).max(2000),
  details: z.string().trim().max(4000).optional().default(""),
  recordingsAccessed: z.boolean().optional().default(false),
  attachmentPath: z.string().trim().max(300).nullable().optional(),
});

export const Route = createFileRoute("/api/public/refund-request")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let parsed;
        try {
          parsed = schema.parse(await request.json());
        } catch {
          return Response.json({ error: "Invalid input" }, { status: 400 });
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
          attachment_path: parsed.attachmentPath || null,
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