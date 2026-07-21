import { createFileRoute } from "@tanstack/react-router";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { z } from "zod";
import { validatePin } from "@/lib/pin-lookup";

const schema = z.object({
  name: z.string().trim().min(1).max(100),
  childName: z.string().trim().max(100).optional().default(""),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().min(5).max(40),
  childAge: z.string().trim().max(40).optional().default(""),
  district: z.string().trim().max(120).optional().default(""),
  state: z.string().trim().max(120).optional().default(""),
  country: z.string().trim().max(120).optional().default(""),
  countryCode: z
    .string()
    .trim()
    .regex(/^[A-Za-z]{2}$/i, "countryCode must be ISO-3166-1 alpha-2")
    .transform((v) => v.toUpperCase())
    .optional()
    .default(""),
  pincode: z
    .string()
    .trim()
    .max(12, "PIN/ZIP too long")
    .regex(/^[A-Za-z0-9 -]*$/, "PIN/ZIP has invalid characters")
    .optional()
    .default(""),
  concern: z.string().trim().max(120).optional().default(""),
  concernOther: z.string().trim().max(120).optional().default(""),
  timeFrame: z.string().trim().max(60).optional().default(""),
  mode: z.enum(["online", "in-person", "either"]).optional().default("either"),
  message: z.string().trim().max(2000).optional().default(""),
}).superRefine((val, ctx) => {
  if (!val.pincode) return; // optional — allow empty
  const { ok, hint } = validatePin(val.pincode, val.countryCode || undefined);
  if (!ok) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["pincode"],
      message: `Invalid PIN/ZIP format (${hint})`,
    });
  }
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
          const issues =
            e instanceof z.ZodError ? e.issues.map((i) => i.message) : undefined;
          return Response.json(
            { error: issues?.[0] || "Invalid input", issues },
            { status: 400 },
          );
        }

        const summary = [
          parsed.childName && `Child: ${parsed.childName}`,
          parsed.concern && `Concern: ${parsed.concern}`,
          parsed.childAge && `Child age: ${parsed.childAge}`,
          (parsed.district || parsed.state || parsed.country || parsed.pincode) &&
            `Location: ${[parsed.district, parsed.state, parsed.country, parsed.pincode && `PIN ${parsed.pincode}`].filter(Boolean).join(", ")}`,
          parsed.timeFrame && `Time frame: ${parsed.timeFrame}`,
          `Mode: ${parsed.mode}`,
          parsed.message && `Message: ${parsed.message}`,
        ]
          .filter(Boolean)
          .join(" · ");

        // Save to leads table
        const { data: lead, error } = await supabaseAdmin
          .from("leads")
          .insert({
            source: "booking_form",
            contact_name: parsed.name,
            contact_email: parsed.email,
            contact_phone: parsed.phone,
            parent_name: parsed.name,
            child_name: parsed.childName || null,
            child_age: parsed.childAge || null,
            district: parsed.district || null,
            state: parsed.state || null,
            country: parsed.country || null,
            phone: parsed.phone,
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
          parsed.childName,
          parsed.email,
          parsed.phone,
          parsed.childAge,
          parsed.district,
          parsed.state,
          parsed.country,
          parsed.pincode,
          parsed.concern,
          parsed.timeFrame,
          parsed.concernOther,
          parsed.mode,
          parsed.message,
          "website-booking",
        ]);

        return Response.json({ ok: true, leadId: lead?.id ?? null });
      },
    },
  },
});
