import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { RoleGuard } from "@/components/site/RoleGuard";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

export const Route = createFileRoute("/app/admin")({
  head: () => ({ meta: [{ title: "Admin — IND" }, { name: "robots", content: "noindex" }] }),
  component: () => (
    <RoleGuard allow={["admin"]} label="IND admins">
      <AdminPage />
    </RoleGuard>
  ),
});

type Profile = {
  id: string;
  full_name: string | null;
  department_id: string | null;
  is_tl: boolean;
};
type Dept = { id: string; name: string };
type RoleRow = { user_id: string; role: string };

const ROLES = [
  "parent_prospect",
  "parent_enrolled",
  "employee",
  "coordinator",
  "clinical_advisor",
  "sales",
  "content_manager",
  "admin",
] as const;

function AdminPage() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [depts, setDepts] = useState<Dept[]>([]);
  const [rolesByUser, setRolesByUser] = useState<Record<string, string[]>>({});
  const [search, setSearch] = useState("");

  useEffect(() => {
    refresh();
    supabase.from("departments").select("id,name").order("name").then(({ data }) => setDepts((data as Dept[]) ?? []));
  }, []);

  async function refresh() {
    const { data: ps } = await supabase
      .from("profiles")
      .select("id,full_name,department_id,is_tl")
      .order("full_name");
    setProfiles((ps as Profile[]) ?? []);
    const { data: rs } = await supabase.from("user_roles").select("user_id,role");
    const m: Record<string, string[]> = {};
    ((rs as RoleRow[]) ?? []).forEach((r) => {
      (m[r.user_id] ??= []).push(r.role);
    });
    setRolesByUser(m);
  }

  async function setRole(userId: string, role: string) {
    await supabase.from("user_roles").delete().eq("user_id", userId);
    const { error } = await supabase.from("user_roles").insert({ user_id: userId, role: role as "admin" });
    if (error) toast.error(error.message);
    else {
      toast.success("Role updated");
      refresh();
    }
  }

  async function setDept(userId: string, value: string) {
    const department_id = value === "none" ? null : value;
    const { error } = await supabase.from("profiles").update({ department_id }).eq("id", userId);
    if (error) toast.error(error.message);
    else refresh();
  }

  async function toggleTL(userId: string, is_tl: boolean) {
    const { error } = await supabase.from("profiles").update({ is_tl }).eq("id", userId);
    if (error) toast.error(error.message);
    else refresh();
  }

  const visible = profiles.filter((p) =>
    !search ? true : (p.full_name ?? "").toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <SiteLayout>
      <section className="mx-auto max-w-7xl px-5 py-10">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="font-display text-3xl">Admin</h1>
            <p className="mt-1 text-sm text-muted-foreground">Manage users, roles, and departments.</p>
          </div>
          <Button asChild variant="outline">
            <Link to="/app/leads">Leads pipeline →</Link>
          </Button>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_280px]">
          <div>
            <div className="mb-3 flex items-center gap-3">
              <Input
                placeholder="Search by name…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="max-w-xs"
              />
              <span className="text-xs text-muted-foreground">{visible.length} users</span>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-border">
              <table className="w-full text-sm">
                <thead className="bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground">
                  <tr>
                    <th className="px-3 py-2 text-left">Name</th>
                    <th className="px-3 py-2 text-left">Role</th>
                    <th className="px-3 py-2 text-left">Department</th>
                    <th className="px-3 py-2 text-left">TL</th>
                  </tr>
                </thead>
                <tbody>
                  {visible.map((p) => {
                    const userRoles = rolesByUser[p.id] ?? [];
                    return (
                      <tr key={p.id} className="border-t border-border">
                        <td className="px-3 py-2">
                          <div className="font-medium">{p.full_name ?? "Unnamed"}</div>
                          <div className="text-xs text-muted-foreground">{p.id.slice(0, 8)}…</div>
                        </td>
                        <td className="px-3 py-2">
                          <Select
                            value={userRoles[0] ?? "parent_prospect"}
                            onValueChange={(v) => setRole(p.id, v)}
                          >
                            <SelectTrigger className="w-44"><SelectValue /></SelectTrigger>
                            <SelectContent>
                              {ROLES.map((r) => <SelectItem key={r} value={r}>{r.replace(/_/g, " ")}</SelectItem>)}
                            </SelectContent>
                          </Select>
                        </td>
                        <td className="px-3 py-2">
                          <Select
                            value={p.department_id ?? "none"}
                            onValueChange={(v) => setDept(p.id, v)}
                          >
                            <SelectTrigger className="w-48"><SelectValue placeholder="Department" /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="none">— None —</SelectItem>
                              {depts.map((d) => <SelectItem key={d.id} value={d.id}>{d.name}</SelectItem>)}
                            </SelectContent>
                          </Select>
                        </td>
                        <td className="px-3 py-2">
                          <Switch checked={p.is_tl} onCheckedChange={(c) => toggleTL(p.id, c)} />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <aside>
            <h2 className="font-display text-lg">Departments</h2>
            <p className="mt-1 text-xs text-muted-foreground">Mirrors your Unified IND Gameplan structure.</p>
            <ul className="mt-3 space-y-1">
              {depts.map((d) => (
                <li key={d.id} className="flex items-center justify-between rounded-md border border-border bg-card px-3 py-2 text-sm">
                  <span>{d.name}</span>
                  <Badge variant="outline" className="text-xs">{(profiles.filter((p) => p.department_id === d.id)).length}</Badge>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>
    </SiteLayout>
  );
}
