import { createFileRoute } from "@tanstack/react-router";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { z } from "zod";

const schema = z.object({
  parentName: z.string().trim().min(1).max(100),
  childName: z.string().trim().max(100).optional().default(""),
  childAge: z.string().trim().max(40).optional().default(""),
  phone: z.string().trim().min(5).max(40),
  email: z.string().trim().email().max(200).optional().or(z.literal("")).default(""),
  city: z.string().trim().max(120).optional().default(""),
  concern: z.string().trim().max(120).optional().default(""),
});

export const Route = createFileRoute("/api/public/masterclass")({
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
          "Masterclass: Science of Stuck",
          parsed.childName && `Child: ${parsed.childName}`,
          parsed.childAge && `Age: ${parsed.childAge}`,
          parsed.city && `City: ${parsed.city}`,
          parsed.concern && `Concern: ${parsed.concern}`,
        ]
          .filter(Boolean)
          .join(" · ");

        const { error } = await supabaseAdmin.from("leads").insert({
          source: "masterclass_science_of_stuck",
          contact_name: parsed.parentName,
          contact_email: parsed.email || null,
          contact_phone: parsed.phone,
          parent_name: parsed.parentName,
          child_name: parsed.childName || null,
          child_age: parsed.childAge || null,
          phone: parsed.phone,
          summary,
        });

        if (error) {
          console.error("Masterclass registration insert failed", error);
          return Response.json({ error: "Could not save your registration" }, { status: 500 });
        }

        return Response.json({ ok: true });
      },
    },
  },
});