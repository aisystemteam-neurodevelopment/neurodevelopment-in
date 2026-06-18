import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { RoleGuard } from "@/components/site/RoleGuard";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/app/leads")({
  head: () => ({ meta: [{ title: "Leads — IND Staff" }] }),
  component: () => (
    <RoleGuard
      allow={["coordinator", "clinical_advisor", "sales", "content_manager", "admin"]}
      label="IND staff (coordinators, advisors, sales, content, admin)"
    >
      <LeadsPage />
    </RoleGuard>
  ),
});

type Lead = {
  id: string;
  contact_name: string | null;
  contact_email: string | null;
  stage: string;
  source: string;
  summary: string | null;
  created_at: string;
};

type Msg = { id: string; role: string; content: string; created_at: string };

function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Msg[]>([]);

  useEffect(() => {
    supabase
      .from("leads")
      .select("id,contact_name,contact_email,stage,source,summary,created_at")
      .order("created_at", { ascending: false })
      .limit(100)
      .then(({ data }) => setLeads((data as Lead[]) ?? []));
  }, []);

  useEffect(() => {
    if (!activeId) return;
    supabase
      .from("lead_messages")
      .select("id,role,content,created_at")
      .eq("lead_id", activeId)
      .order("created_at", { ascending: true })
      .then(({ data }) => setMessages((data as Msg[]) ?? []));
  }, [activeId]);

  return (
    <SiteLayout>
      <section className="mx-auto max-w-7xl px-5 py-10">
        <h1 className="font-display text-3xl">Leads</h1>
        <p className="text-sm text-muted-foreground">{leads.length} most recent</p>

        <div className="mt-6 grid gap-4 lg:grid-cols-[420px_1fr]">
          <div className="rounded-3xl border border-border bg-card">
            <ul className="divide-y divide-border">
              {leads.map((l) => (
                <li
                  key={l.id}
                  onClick={() => setActiveId(l.id)}
                  className={`cursor-pointer p-4 hover:bg-muted ${activeId === l.id ? "bg-muted" : ""}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{l.contact_name ?? "Anonymous parent"}</div>
                    <Badge variant="outline">{l.stage}</Badge>
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    {l.contact_email ?? "—"} · {l.source} · {new Date(l.created_at).toLocaleString()}
                  </div>
                  {l.summary && <div className="mt-1 text-xs text-muted-foreground">{l.summary}</div>}
                </li>
              ))}
              {leads.length === 0 && <li className="p-6 text-sm text-muted-foreground">No leads yet.</li>}
            </ul>
          </div>

          <div className="rounded-3xl border border-border bg-card p-5">
            {!activeId && <p className="text-sm text-muted-foreground">Select a lead to see the conversation.</p>}
            {activeId && (
              <div className="space-y-3">
                {messages.map((m) => (
                  <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-2 text-sm ${
                        m.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : m.role === "assistant"
                          ? "bg-secondary"
                          : "bg-warm text-warm-foreground"
                      }`}
                    >
                      {m.content}
                    </div>
                  </div>
                ))}
                {messages.length === 0 && <p className="text-sm text-muted-foreground">No messages yet.</p>}
              </div>
            )}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
