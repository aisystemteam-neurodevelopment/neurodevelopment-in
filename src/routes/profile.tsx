import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Your profile — IND" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ProfilePage,
});

type Profile = {
  id: string;
  full_name: string | null;
  phone: string | null;
  city: string | null;
  avatar_url: string | null;
  department_id: string | null;
  is_tl: boolean;
};

type Dept = { id: string; name: string };

function ProfilePage() {
  const { user, roles, loading, portalPath, signOut } = useAuth();
  const nav = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [depts, setDepts] = useState<Dept[]>([]);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!loading && !user) nav({ to: "/auth" });
  }, [user, loading, nav]);

  useEffect(() => {
    if (!user) return;
    supabase
      .from("profiles")
      .select("id,full_name,phone,city,avatar_url,department_id,is_tl")
      .eq("id", user.id)
      .maybeSingle()
      .then(({ data }) => setProfile(data as Profile | null));
    supabase
      .from("departments")
      .select("id,name")
      .order("name")
      .then(({ data }) => setDepts((data as Dept[]) ?? []));
  }, [user]);

  if (loading || !user) {
    return (
      <SiteLayout>
        <div className="p-10 text-center text-muted-foreground">Loading…</div>
      </SiteLayout>
    );
  }

  const dept = depts.find((d) => d.id === profile?.department_id);

  async function save(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!user) return;
    setBusy(true);
    const fd = new FormData(e.currentTarget);
    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: String(fd.get("full_name") ?? ""),
        phone: String(fd.get("phone") ?? ""),
        city: String(fd.get("city") ?? ""),
      })
      .eq("id", user.id);
    setBusy(false);
    if (error) toast.error(error.message);
    else {
      toast.success("Profile saved");
      setProfile((p) =>
        p
          ? {
              ...p,
              full_name: String(fd.get("full_name") ?? ""),
              phone: String(fd.get("phone") ?? ""),
              city: String(fd.get("city") ?? ""),
            }
          : p,
      );
    }
  }

  return (
    <SiteLayout>
      <section className="mx-auto max-w-3xl px-5 py-12">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl">Your profile</h1>
            <p className="mt-1 text-sm text-muted-foreground">{user.email}</p>
          </div>
          <Button asChild className="rounded-full">
            <Link to={portalPath}>Open your portal</Link>
          </Button>
        </div>

        <div className="mt-6 rounded-3xl border border-border bg-card p-6">
          <div className="flex flex-wrap items-center gap-2">
            {roles.length === 0 ? (
              <Badge variant="outline">No role yet</Badge>
            ) : (
              roles.map((r) => (
                <Badge key={r} variant="secondary" className="capitalize">
                  {r.replace(/_/g, " ")}
                </Badge>
              ))
            )}
            {profile?.is_tl && <Badge>Coordinator / TL</Badge>}
            {dept && <Badge variant="outline">{dept.name}</Badge>}
          </div>

          <form onSubmit={save} className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="full_name">Full name</Label>
              <Input
                id="full_name"
                name="full_name"
                defaultValue={profile?.full_name ?? ""}
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" name="phone" defaultValue={profile?.phone ?? ""} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="city">City</Label>
              <Input id="city" name="city" defaultValue={profile?.city ?? ""} />
            </div>
            <div className="sm:col-span-2 flex items-center gap-3">
              <Button disabled={busy} type="submit" className="rounded-full">
                Save changes
              </Button>
              <Button type="button" variant="ghost" onClick={() => signOut()}>
                Sign out
              </Button>
            </div>
          </form>
        </div>

        {roles.length === 0 || (roles.length === 1 && roles[0] === "parent_prospect") ? (
          <p className="mt-4 text-sm text-muted-foreground">
            Your role hasn't been assigned yet. An IND coordinator will set you up shortly.
          </p>
        ) : null}
      </section>
    </SiteLayout>
  );
}
