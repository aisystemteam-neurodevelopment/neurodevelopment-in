import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";

export const Route = createFileRoute("/staff/manage")({
  component: ManagePage,
});

type Profile = { id: string; full_name: string | null; department_id: string | null; is_tl: boolean };
type Task = {
  id: string;
  title: string;
  status: "todo" | "in_progress" | "done";
  priority: "low" | "normal" | "high" | "urgent";
  month_bucket: string;
  due_date: string | null;
  assignee_id: string | null;
  department_id: string;
};
type Dept = { id: string; name: string };

function monthKey(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-01`;
}

function ManagePage() {
  const { user, isAdmin } = useAuth();
  const [me, setMe] = useState<Profile | null>(null);
  const [depts, setDepts] = useState<Dept[]>([]);
  const [departmentId, setDepartmentId] = useState<string>("");
  const [team, setTeam] = useState<Profile[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<{ assignee?: string; status?: string; month?: string }>({});

  useEffect(() => {
    if (!user) return;
    supabase
      .from("profiles")
      .select("id,full_name,department_id,is_tl")
      .eq("id", user.id)
      .maybeSingle()
      .then(({ data }) => {
        setMe(data as Profile | null);
        if (data?.department_id) setDepartmentId(data.department_id);
      });
    supabase.from("departments").select("id,name").order("name").then(({ data }) => setDepts((data as Dept[]) ?? []));
  }, [user]);

  useEffect(() => {
    if (!departmentId) return;
    supabase
      .from("profiles")
      .select("id,full_name,department_id,is_tl")
      .eq("department_id", departmentId)
      .order("full_name")
      .then(({ data }) => setTeam((data as Profile[]) ?? []));
    supabase
      .from("tasks")
      .select("id,title,status,priority,month_bucket,due_date,assignee_id,department_id")
      .eq("department_id", departmentId)
      .order("month_bucket", { ascending: true })
      .then(({ data }) => setTasks((data as Task[]) ?? []));
  }, [departmentId]);

  const now = new Date();
  const thisMonth = monthKey(now);
  const nextMonth = monthKey(new Date(now.getFullYear(), now.getMonth() + 1, 1));

  const workload = useMemo(() => {
    const map: Record<string, { thisM: number; nextM: number; overdue: number; done: number }> = {};
    team.forEach((p) => (map[p.id] = { thisM: 0, nextM: 0, overdue: 0, done: 0 }));
    tasks.forEach((t) => {
      if (!t.assignee_id || !map[t.assignee_id]) return;
      const k = (t.month_bucket ?? "").slice(0, 10);
      if (t.status === "done") map[t.assignee_id].done++;
      else if (k === thisMonth) map[t.assignee_id].thisM++;
      else if (k === nextMonth) map[t.assignee_id].nextM++;
      else if (t.due_date && new Date(t.due_date) < now) map[t.assignee_id].overdue++;
    });
    return map;
  }, [team, tasks, thisMonth, nextMonth, now]);

  const filtered = tasks.filter(
    (t) =>
      (!filter.assignee || t.assignee_id === filter.assignee) &&
      (!filter.status || t.status === filter.status) &&
      (!filter.month || (t.month_bucket ?? "").slice(0, 10) === filter.month),
  );

  async function refreshTasks() {
    const { data } = await supabase
      .from("tasks")
      .select("id,title,status,priority,month_bucket,due_date,assignee_id,department_id")
      .eq("department_id", departmentId)
      .order("month_bucket", { ascending: true });
    setTasks((data as Task[]) ?? []);
  }

  async function setTaskStatus(id: string, status: Task["status"]) {
    const prev = tasks;
    setTasks((c) => c.map((t) => (t.id === id ? { ...t, status } : t)));
    const { error } = await supabase.from("tasks").update({ status }).eq("id", id);
    if (error) {
      setTasks(prev);
      toast.error(error.message);
    }
  }

  if (!me) return <p className="text-sm text-muted-foreground">Loading…</p>;

  const canAct = me.is_tl || isAdmin;

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <Label className="text-xs uppercase tracking-wider text-muted-foreground">Department</Label>
          <Select value={departmentId} onValueChange={setDepartmentId}>
            <SelectTrigger className="mt-1 w-64">
              <SelectValue placeholder="Pick a department" />
            </SelectTrigger>
            <SelectContent>
              {depts.map((d) => (
                <SelectItem key={d.id} value={d.id}>{d.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {!canAct && (
            <p className="mt-2 text-xs text-muted-foreground">
              You can view this department but only TLs/coordinators or admins can assign tasks.
            </p>
          )}
        </div>
        {canAct && departmentId && (
          <AssignTaskDialog
            team={team}
            departmentId={departmentId}
            userId={user!.id}
            thisMonth={thisMonth}
            onCreated={refreshTasks}
          />
        )}
      </div>

      <div>
        <h2 className="font-display text-xl">Team workload</h2>
        {team.length === 0 ? (
          <p className="mt-2 text-sm text-muted-foreground">No team members yet for this department.</p>
        ) : (
          <ul className="mt-3 grid gap-3 sm:grid-cols-2">
            {team.map((p) => {
              const w = workload[p.id] ?? { thisM: 0, nextM: 0, overdue: 0, done: 0 };
              return (
                <li key={p.id} className="rounded-2xl border border-border bg-card p-4">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">{p.full_name ?? "Unnamed"}</p>
                    {p.is_tl && <Badge>TL</Badge>}
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2 text-xs">
                    <Badge variant="outline">This month: {w.thisM}</Badge>
                    <Badge variant="outline">Next: {w.nextM}</Badge>
                    {w.overdue > 0 && <Badge variant="destructive">Overdue {w.overdue}</Badge>}
                    <Badge variant="secondary">Done {w.done}</Badge>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <div>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 className="font-display text-xl">All tasks</h2>
          <div className="flex flex-wrap gap-2">
            <Select value={filter.assignee ?? "all"} onValueChange={(v) => setFilter((f) => ({ ...f, assignee: v === "all" ? undefined : v }))}>
              <SelectTrigger className="w-44"><SelectValue placeholder="Member" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All members</SelectItem>
                {team.map((p) => <SelectItem key={p.id} value={p.id}>{p.full_name ?? "Unnamed"}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={filter.month ?? "all"} onValueChange={(v) => setFilter((f) => ({ ...f, month: v === "all" ? undefined : v }))}>
              <SelectTrigger className="w-44"><SelectValue placeholder="Month" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All months</SelectItem>
                <SelectItem value={thisMonth}>This month</SelectItem>
                <SelectItem value={nextMonth}>Next month</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filter.status ?? "all"} onValueChange={(v) => setFilter((f) => ({ ...f, status: v === "all" ? undefined : v }))}>
              <SelectTrigger className="w-36"><SelectValue placeholder="Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="todo">To do</SelectItem>
                <SelectItem value="in_progress">In progress</SelectItem>
                <SelectItem value="done">Done</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {filtered.length === 0 ? (
          <p className="mt-3 rounded-lg border border-dashed border-border p-6 text-sm text-muted-foreground">
            No tasks match these filters.
          </p>
        ) : (
          <ul className="mt-3 space-y-2">
            {filtered.map((t) => {
              const member = team.find((p) => p.id === t.assignee_id);
              return (
                <li key={t.id} className="flex flex-wrap items-center gap-3 rounded-xl border border-border bg-card p-3">
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">{t.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {member?.full_name ?? "Unassigned"} · {(t.month_bucket ?? "").slice(0, 7)}
                      {t.due_date ? ` · due ${new Date(t.due_date).toLocaleDateString()}` : ""}
                    </p>
                  </div>
                  <Badge variant="outline" className="capitalize">{t.priority}</Badge>
                  <Select value={t.status} onValueChange={(v) => setTaskStatus(t.id, v as Task["status"])} disabled={!canAct}>
                    <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todo">To do</SelectItem>
                      <SelectItem value="in_progress">In progress</SelectItem>
                      <SelectItem value="done">Done</SelectItem>
                    </SelectContent>
                  </Select>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

function AssignTaskDialog({
  team,
  departmentId,
  userId,
  thisMonth,
  onCreated,
}: {
  team: Profile[];
  departmentId: string;
  userId: string;
  thisMonth: string;
  onCreated: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    const fd = new FormData(e.currentTarget);
    const { error } = await supabase.from("tasks").insert({
      department_id: departmentId,
      assignee_id: String(fd.get("assignee")),
      assigned_by: userId,
      title: String(fd.get("title")),
      description: String(fd.get("description") ?? ""),
      due_date: (fd.get("due_date") as string) || null,
      month_bucket: String(fd.get("month_bucket")),
      priority: String(fd.get("priority")) as Task["priority"],
    });
    setBusy(false);
    if (error) toast.error(error.message);
    else {
      toast.success("Task assigned");
      setOpen(false);
      onCreated();
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-full" disabled={team.length === 0}>Assign task</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader><DialogTitle>Assign a new task</DialogTitle></DialogHeader>
        <form onSubmit={submit} className="grid gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="assignee">Member</Label>
            <select id="assignee" name="assignee" required className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
              {team.map((p) => <option key={p.id} value={p.id}>{p.full_name ?? "Unnamed"}</option>)}
            </select>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" required maxLength={200} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" name="description" rows={3} maxLength={2000} />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="month_bucket">Month</Label>
              <select id="month_bucket" name="month_bucket" defaultValue={thisMonth} className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
                <option value={thisMonth}>This month</option>
                <option value={monthKey(new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1))}>Next month</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="due_date">Due date</Label>
              <Input id="due_date" name="due_date" type="date" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="priority">Priority</Label>
              <select id="priority" name="priority" defaultValue="normal" className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
                <option value="low">Low</option>
                <option value="normal">Normal</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
          </div>
          <Button type="submit" disabled={busy} className="rounded-full">Assign</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
