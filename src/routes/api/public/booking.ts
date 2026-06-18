import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().min(5).max(40),
  childAge: z.string().trim().max(40).optional().default(""),
  concern: z.string().trim().max(120).optional().default(""),
  preferredDate: z.string().trim().max(40).optional().default(""),
  preferredTime: z.string().trim().max(40).optional().default(""),
  mode: z.enum(["online", "in-person", "either"]).optional().default("either"),
  message: z.string().trim().max(2000).optional().default(""),
});

const SHEET_ID = "1ZsiC5ZVaSm78k08bUA8Fl1YLpSB-rExRMTzllv5v6T8";

async function appendToSheet(row: string[]) {
  const lovableKey = process.env.LOVABLE_API_KEY;
  const sheetsKey = process.env.GOOGLE_SHEETS_API_KEY;
  if (!lovableKey || !sheetsKey) {
    console.error("Sheets credentials missing");
    return { ok: false };
  }
  const url = `https://connector-gateway.lovable.dev/google_sheets/v4/spreadsheets/${SHEET_ID}/values/Sheet1!A1:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${lovableKey}`,
      "X-Connection-Api-Key": sheetsKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ values: [row] }),
  });
  if (!res.ok) {
    console.error("Sheets append failed", res.status, await res.text());
    return { ok: false };
  }
  return { ok: true };
}

export const Route = createFileRoute("/api/public/booking")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let parsed;
        try {
          parsed = schema.parse(await request.json());
        } catch (e) {
          return Response.json({ error: "Invalid input" }, { status: 400 });
        }

        const summary = [
          parsed.concern && `Concern: ${parsed.concern}`,
          parsed.childAge && `Child age: ${parsed.childAge}`,
          parsed.preferredDate && `Preferred: ${parsed.preferredDate} ${parsed.preferredTime}`.trim(),
          `Mode: ${parsed.mode}`,
          parsed.message && `Message: ${parsed.message}`,
        ]
          .filter(Boolean)
          .join(" · ");

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

        // Save to leads table
        const { data: lead, error } = await supabaseAdmin
          .from("leads")
          .insert({
            source: "booking_form",
            contact_name: parsed.name,
            contact_email: parsed.email,
            contact_phone: parsed.phone,
            summary,
          })
          .select("id")
          .single();

        if (error) {
          console.error("Lead insert failed", error);
        }

        // Append to Google Sheet (best-effort; do not fail the request if sheets is down)
        await appendToSheet([
          new Date().toISOString(),
          parsed.name,
          parsed.email,
          parsed.phone,
          parsed.childAge,
          parsed.concern,
          parsed.preferredDate,
          parsed.preferredTime,
          parsed.mode,
          parsed.message,
          "website-booking",
        ]);

        return Response.json({ ok: true, leadId: lead?.id ?? null });
      },
    },
  },
});
