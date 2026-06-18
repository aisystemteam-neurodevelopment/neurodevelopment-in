import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/family/")({
  component: FamilyOverview,
});

const PHASES = ["Regulation", "Connection", "Communication", "Independence"];

function FamilyOverview() {
  const { user } = useAuth();
  const [counts, setCounts] = useState({ appts: 0, modules: 0, reports: 0, products: 0 });
  const [phase, setPhase] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    Promise.all([
      supabase.from("appointments").select("id", { count: "exact", head: true }).gte("scheduled_at", new Date().toISOString()),
      supabase.from("modules").select("id,phase", { count: "exact" }).eq("status", "todo").order("created_at", { ascending: false }).limit(50),
      supabase.from("progress_reports").select("id", { count: "exact", head: true }),
      supabase.from("products").select("id", { count: "exact", head: true }),
    ]).then(([a, m, r, p]) => {
      setCounts({
        appts: a.count ?? 0,
        modules: (m.data ?? []).length,
        reports: r.count ?? 0,
        products: p.count ?? 0,
      });
      const latest = (m.data ?? [])[0] as { phase?: string } | undefined;
      if (latest?.phase) setPhase(latest.phase);
    });
  }, [user]);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-border bg-secondary/40 p-6">
        <p className="text-xs uppercase tracking-wider text-muted-foreground">Current phase</p>
        <p className="mt-1 font-display text-2xl">{phase ?? "Phase not set yet"}</p>
        <div className="mt-3 flex flex-wrap gap-2 text-xs">
          {PHASES.map((p) => (
            <Badge key={p} variant={p === phase ? "default" : "outline"} className="capitalize">
              {p}
            </Badge>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Upcoming appointments" value={counts.appts} />
        <StatCard label="Open module tasks" value={counts.modules} />
        <StatCard label="Progress reports" value={counts.reports} />
        <StatCard label="Assigned products" value={counts.products} />
      </div>

      <Card>
        <CardHeader><CardTitle className="font-display">How this works</CardTitle></CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>Sequence is law: Regulation → Connection → Communication → Independence.</p>
          <p>Your coordinator will publish appointments, weekly module actions, and progress notes here as your child moves through the flightpath.</p>
          <p>Open each tab on the left to see the latest.</p>
        </CardContent>
      </Card>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="mt-2 font-display text-3xl">{value}</p>
    </div>
  );
}
