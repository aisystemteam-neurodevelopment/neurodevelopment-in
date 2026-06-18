import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export const Route = createFileRoute("/family/modules")({
  component: ModulesPage,
});

type Mod = {
  id: string;
  phase: string;
  week: number;
  title: string;
  description: string | null;
  status: "todo" | "in_progress" | "done";
};

function ModulesPage() {
  const [items, setItems] = useState<Mod[]>([]);

  useEffect(() => {
    supabase
      .from("modules")
      .select("id,phase,week,title,description,status")
      .order("week", { ascending: true })
      .then(({ data }) => setItems((data as Mod[]) ?? []));
  }, []);

  async function toggle(m: Mod, checked: boolean) {
    const next = checked ? "done" : "todo";
    const prev = items;
    setItems((cur) => cur.map((x) => (x.id === m.id ? { ...x, status: next } : x)));
    const { error } = await supabase
      .from("modules")
      .update({ status: next, completed_at: checked ? new Date().toISOString() : null })
      .eq("id", m.id);
    if (error) {
      setItems(prev);
      toast.error(error.message);
    }
  }

  if (items.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
        No modules assigned yet. Your coordinator will publish this week's parent actions here.
      </div>
    );
  }

  // Group by phase
  const groups: Record<string, Mod[]> = {};
  items.forEach((m) => {
    (groups[m.phase] ??= []).push(m);
  });

  return (
    <div className="space-y-6">
      {Object.entries(groups).map(([phase, mods]) => (
        <div key={phase}>
          <h2 className="font-display text-xl">{phase}</h2>
          <ul className="mt-3 space-y-2">
            {mods.map((m) => (
              <li key={m.id} className="flex items-start gap-3 rounded-xl border border-border bg-card p-4">
                <Checkbox
                  checked={m.status === "done"}
                  onCheckedChange={(c) => toggle(m, !!c)}
                  className="mt-0.5"
                />
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`font-medium ${m.status === "done" ? "line-through text-muted-foreground" : ""}`}>
                      {m.title}
                    </span>
                    <Badge variant="outline" className="text-xs">Week {m.week}</Badge>
                  </div>
                  {m.description && (
                    <p className="mt-1 text-sm text-muted-foreground">{m.description}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
