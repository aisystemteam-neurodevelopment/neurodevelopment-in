import { createFileRoute } from "@tanstack/react-router";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().min(5).max(40),
  childAge: z.string().trim().max(40).optional().default(""),
  magnet: z.string().trim().max(80).default("5-signs-stuck-intervention"),
});

export const Route = createFileRoute("/api/public/lead-magnet")({
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
          `Lead magnet: ${parsed.magnet}`,
          parsed.childAge && `Child age: ${parsed.childAge}`,
        ]
          .filter(Boolean)
          .join(" · ");

        const { error } = await supabaseAdmin.from("leads").insert({
          source: "lead_magnet",
          contact_name: parsed.name,
          contact_email: parsed.email,
          contact_phone: parsed.phone,
          summary,
        });

        if (error) {
          console.error("Lead magnet insert failed", error);
          return Response.json({ error: "Could not save" }, { status: 500 });
        }

        return Response.json({ ok: true });
      },
    },
  },
});
