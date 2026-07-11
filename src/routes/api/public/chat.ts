import { createFileRoute } from "@tanstack/react-router";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { z } from "zod";
import { createHmac, timingSafeEqual } from "crypto";

function hmacSecret(): string {
  return (
    process.env.LEAD_SESSION_SECRET ||
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_DB_URL ||
    ""
  );
}
function signLeadId(leadId: string): string {
  return createHmac("sha256", hmacSecret()).update(leadId).digest("hex");
}
function verifyLeadToken(leadId: string, token: string | null | undefined): boolean {
  if (!token) return false;
  const expected = signLeadId(leadId);
  const a = Buffer.from(token);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

const bodySchema = z.object({
  leadId: z.string().uuid().nullable().optional(),
  leadToken: z.string().max(200).nullable().optional(),
  message: z.string().trim().min(1).max(4000),
  contact: z
    .object({
      name: z.string().trim().max(100).optional(),
      email: z.string().trim().email().max(200).optional(),
      phone: z.string().trim().max(40).optional(),
    })
    .optional(),
});

export const Route = createFileRoute("/api/public/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let parsed;
        try {
          parsed = bodySchema.parse(await request.json());
        } catch {
          return new Response("Invalid input", { status: 400 });
        }

        const apiKey = process.env.LOVABLE_API_KEY;
        if (!apiKey) return new Response("AI not configured", { status: 500 });

        // Get-or-create lead
        let leadId = parsed.leadId ?? null;
        const tokenValid =
          !!leadId && verifyLeadToken(leadId, parsed.leadToken ?? null);
        if (!leadId || !tokenValid) {
          const { data, error } = await supabaseAdmin
            .from("leads")
            .insert({
              source: "chat",
              contact_name: parsed.contact?.name ?? null,
              contact_email: parsed.contact?.email ?? null,
              contact_phone: parsed.contact?.phone ?? null,
            })
            .select("id")
            .single();
          if (error || !data) return new Response("Could not start lead", { status: 500 });
          leadId = data.id;
        } else if (parsed.contact) {
          await supabaseAdmin
            .from("leads")
            .update({
              contact_name: parsed.contact.name ?? null,
              contact_email: parsed.contact.email ?? null,
              contact_phone: parsed.contact.phone ?? null,
            })
            .eq("id", leadId);
        }

        // Save user message
        await supabaseAdmin.from("lead_messages").insert({
          lead_id: leadId!,
          role: "user",
          content: parsed.message,
        });

        // Build system prompt from knowledge snippets
        const { data: snippets } = await supabaseAdmin
          .from("knowledge_snippets")
          .select("content,display_order")
          .eq("active", true)
          .order("display_order", { ascending: true });

        const systemPrompt =
          (snippets ?? []).map((s) => s.content).join("\n\n") +
          "\n\nKeep responses under 150 words. One question at a time. Warm, calm, plain language.";

        // Load conversation history (last 30)
        const { data: history } = await supabaseAdmin
          .from("lead_messages")
          .select("role,content")
          .eq("lead_id", leadId!)
          .order("created_at", { ascending: true })
          .limit(30);

        // Call Lovable AI (non-streaming for simplicity + reliability in v1)
        const aiRes = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "google/gemini-3-flash-preview",
            messages: [
              { role: "system", content: systemPrompt },
              ...(history ?? []).map((m) => ({ role: m.role, content: m.content })),
            ],
          }),
        });

        if (aiRes.status === 429) {
          return Response.json(
            { leadId, leadToken: signLeadId(leadId!), error: "Lots of conversations right now — please try again in a moment." },
            { status: 429 },
          );
        }
        if (aiRes.status === 402) {
          return Response.json(
            { leadId, leadToken: signLeadId(leadId!), error: "Our AI assistant is unavailable right now. Please use the contact form." },
            { status: 402 },
          );
        }
        if (!aiRes.ok) {
          console.error("AI gateway error", aiRes.status, await aiRes.text());
          return Response.json({ leadId, leadToken: signLeadId(leadId!), error: "Assistant could not respond." }, { status: 500 });
        }

        const json = (await aiRes.json()) as { choices?: { message?: { content?: string } }[] };
        const reply = json.choices?.[0]?.message?.content ?? "I'm here. Could you tell me a little more?";

        await supabaseAdmin.from("lead_messages").insert({
          lead_id: leadId!,
          role: "assistant",
          content: reply,
        });

        return Response.json({ leadId, leadToken: signLeadId(leadId!), reply });
      },
    },
  },
});
