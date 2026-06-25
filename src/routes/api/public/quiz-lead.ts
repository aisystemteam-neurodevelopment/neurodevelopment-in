import { createFileRoute } from "@tanstack/react-router";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().min(5).max(40),
  service: z.string().trim().max(120).optional().default(""),
  preferredTime: z.string().trim().max(60).optional().default(""),
  answers: z.record(z.string(), z.string()).optional().default({}),
  recommendation: z.string().trim().max(200).optional().default(""),
});

export const Route = createFileRoute("/api/public/quiz-lead")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let parsed;
        try {
          parsed = schema.parse(await request.json());
        } catch {
          return Response.json({ error: "Invalid input" }, { status: 400 });
        }

        const answerLines = Object.entries(parsed.answers)
          .map(([k, v]) => `${k}: ${v}`)
          .join(" · ");

        const summary = [
          parsed.recommendation && `Recommended: ${parsed.recommendation}`,
          parsed.service && `Service: ${parsed.service}`,
          parsed.preferredTime && `Preferred contact: ${parsed.preferredTime}`,
          answerLines && `Answers — ${answerLines}`,
        ]
          .filter(Boolean)
          .join(" | ");

        const { error } = await supabaseAdmin.from("leads").insert({
          source: "qualifier_quiz",
          contact_name: parsed.name,
          contact_email: parsed.email,
          contact_phone: parsed.phone,
          summary,
        });

        if (error) {
          console.error("Quiz lead insert failed", error);
          return Response.json({ error: "Could not save" }, { status: 500 });
        }

        return Response.json({ ok: true });
      },
    },
  },
});