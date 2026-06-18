import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/family/progress")({
  component: ProgressPage,
});

type Report = {
  id: string;
  week_start: string;
  phase: string | null;
  summary: string;
  created_at: string;
};

function ProgressPage() {
  const [items, setItems] = useState<Report[]>([]);

  useEffect(() => {
    supabase
      .from("progress_reports")
      .select("id,week_start,phase,summary,created_at")
      .order("week_start", { ascending: false })
      .then(({ data }) => setItems((data as Report[]) ?? []));
  }, []);

  if (items.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
        No progress reports yet. Your coordinator will publish weekly notes here as your child progresses.
      </div>
    );
  }

  return (
    <ul className="space-y-4">
      {items.map((r) => (
        <li key={r.id} className="rounded-2xl border border-border bg-card p-5">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline">Week of {new Date(r.week_start).toLocaleDateString()}</Badge>
            {r.phase && <Badge variant="secondary">{r.phase}</Badge>}
          </div>
          <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed">{r.summary}</p>
        </li>
      ))}
    </ul>
  );
}
