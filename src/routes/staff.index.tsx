import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth-context";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

export const Route = createFileRoute("/staff/")({
  component: MyTasksPage,
});

type Task = {
  id: string;
  title: string;
  description: string | null;
  due_date: string | null;
  month_bucket: string;
  status: "todo" | "in_progress" | "done";
  priority: "low" | "normal" | "high" | "urgent";
  department_id: string;
};

type Dept = { id: string; name: string };

function monthKey(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-01`;
}

function MyTasksPage() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [depts, setDepts] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!user) return;
    supabase
      .from("tasks")
      .select("id,title,description,due_date,month_bucket,status,priority,department_id")
      .eq("assignee_id", user.id)
      .order("due_date", { ascending: true })
      .then(({ data }) => setTasks((data as Task[]) ?? []));
    supabase
      .from("departments")
      .select("id,name")
      .then(({ data }) =>
        setDepts(Object.fromEntries(((data as Dept[]) ?? []).map((d) => [d.id, d.name]))),
      );
  }, [user]);

  const now = new Date();
  const thisMonth = monthKey(now);
  const nextMonth = monthKey(new Date(now.getFullYear(), now.getMonth() + 1, 1));

  const groups = useMemo(() => {
    const byKey: Record<string, Task[]> = { [thisMonth]: [], [nextMonth]: [], other: [] };
    tasks.forEach((t) => {
      const k = (t.month_bucket ?? "").slice(0, 10);
      if (k === thisMonth) byKey[thisMonth].push(t);
      else if (k === nextMonth) byKey[nextMonth].push(t);
      else byKey.other.push(t);
    });
    return byKey;
  }, [tasks, thisMonth, nextMonth]);

  async function setStatus(t: Task, status: Task["status"]) {
    const prev = tasks;
    setTasks((cur) => cur.map((x) => (x.id === t.id ? { ...x, status } : x)));
    const { error } = await supabase.from("tasks").update({ status }).eq("id", t.id);
    if (error) {
      setTasks(prev);
      toast.error(error.message);
    }
  }

  return (
    <div className="space-y-8">
      <Bucket label="This month" tasks={groups[thisMonth]} depts={depts} setStatus={setStatus} />
      <Bucket label="Next month" tasks={groups[nextMonth]} depts={depts} setStatus={setStatus} />
      {groups.other.length > 0 && (
        <Bucket label="Later / overdue" tasks={groups.other} depts={depts} setStatus={setStatus} />
      )}
      {tasks.length === 0 && (
        <div className="rounded-lg border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
          No tasks assigned yet. Your coordinator/TL will publish work here.
        </div>
      )}
    </div>
  );
}

function Bucket({
  label,
  tasks,
  depts,
  setStatus,
}: {
  label: string;
  tasks: Task[];
  depts: Record<string, string>;
  setStatus: (t: Task, s: Task["status"]) => void;
}) {
  if (tasks.length === 0) {
    return (
      <div>
        <h2 className="font-display text-xl">{label}</h2>
        <p className="mt-2 rounded-lg border border-dashed border-border p-4 text-sm text-muted-foreground">
          Nothing scheduled.
        </p>
      </div>
    );
  }
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <h2 className="font-display text-xl">{label}</h2>
        <span className="text-xs text-muted-foreground">{tasks.length} task(s)</span>
      </div>
      <ul className="mt-3 space-y-3">
        {tasks.map((t) => (
          <li key={t.id} className="rounded-2xl border border-border bg-card p-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="font-medium">{t.title}</p>
                {t.description && (
                  <p className="mt-1 text-sm text-muted-foreground">{t.description}</p>
                )}
                <div className="mt-2 flex flex-wrap gap-2 text-xs">
                  <Badge variant="outline">{depts[t.department_id] ?? "Department"}</Badge>
                  <Badge variant="secondary" className="capitalize">{t.priority}</Badge>
                  {t.due_date && (
                    <Badge variant="outline">Due {new Date(t.due_date).toLocaleDateString()}</Badge>
                  )}
                </div>
              </div>
              <Select value={t.status} onValueChange={(v) => setStatus(t, v as Task["status"])}>
                <SelectTrigger className="w-36">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todo">To do</SelectItem>
                  <SelectItem value="in_progress">In progress</SelectItem>
                  <SelectItem value="done">Done</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
