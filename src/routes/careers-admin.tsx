import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  careersLogin,
  careersAdminData,
  careersSaveOpening,
  careersDeleteOpening,
  careersSetApplicationStatus,
  careersResumeLink,
} from "@/lib/careers.functions";

const TOKEN_KEY = "ind-careers-admin-token";
const STATUSES = ["new", "shortlisted", "interviewing", "hired", "rejected"] as const;

export const Route = createFileRoute("/careers-admin")({
  head: () => ({
    meta: [
      { title: "Careers admin — Institute of NeuroDevelopment" },
      { name: "description", content: "Internal dashboard to post job openings and review applications." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Careers admin" },
      { property: "og:description", content: "Internal careers dashboard." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  ssr: false,
  component: CareersAdmin,
});

type Opening = Awaited<ReturnType<typeof careersAdminData>>["openings"][number];
type Application = Awaited<ReturnType<typeof careersAdminData>>["applications"][number];

const emptyDraft = {
  id: undefined as string | undefined,
  title: "",
  department: "General",
  location: "Kolkata",
  employment_type: "Full-time",
  experience: "",
  summary: "",
  description: "",
  responsibilities: "",
  requirements: "",
  salary_note: "",
  apply_by: "",
  published: true,
};

function CareersAdmin() {
  const login = useServerFn(careersLogin);
  const loadData = useServerFn(careersAdminData);
  const saveOpening = useServerFn(careersSaveOpening);
  const deleteOpening = useServerFn(careersDeleteOpening);
  const setStatus = useServerFn(careersSetApplicationStatus);
  const resumeLink = useServerFn(careersResumeLink);

  const [token, setToken] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [openings, setOpenings] = useState<Opening[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [draft, setDraft] = useState({ ...emptyDraft });

  useEffect(() => {
    const saved = sessionStorage.getItem(TOKEN_KEY);
    if (saved) setToken(saved);
  }, []);

  const refresh = useCallback(
    async (t: string) => {
      try {
        const data = await loadData({ data: { token: t } });
        setOpenings(data.openings);
        setApplications(data.applications);
      } catch {
        sessionStorage.removeItem(TOKEN_KEY);
        setToken(null);
        toast.error("Session expired. Please sign in again.");
      }
    },
    [loadData],
  );

  useEffect(() => {
    if (token) void refresh(token);
  }, [token, refresh]);

  if (!token) {
    return (
      <SiteLayout>
        <section className="mx-auto max-w-sm px-5 py-24">
          <h1 className="font-display text-2xl">Careers admin</h1>
          <p className="mt-2 text-sm text-muted-foreground">Enter the admin password to continue.</p>
          <form
            className="mt-6 space-y-3 text-left"
            onSubmit={async (e) => {
              e.preventDefault();
              setBusy(true);
              try {
                const res = await login({ data: { password } });
                if (!res.ok) {
                  toast.error("Incorrect password");
                  return;
                }
                sessionStorage.setItem(TOKEN_KEY, res.token);
                setPassword("");
                setToken(res.token);
              } catch {
                toast.error("Could not sign in");
              } finally {
                setBusy(false);
              }
            }}
          >
            <Label htmlFor="pwd">Password</Label>
            <Input id="pwd" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <Button type="submit" className="w-full rounded-full" disabled={busy}>
              {busy ? "Checking…" : "Sign in"}
            </Button>
          </form>
        </section>
      </SiteLayout>
    );
  }

  const t = token;

  return (
    <SiteLayout>
      <section className="mx-auto max-w-5xl px-5 py-14 text-left">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="font-display text-2xl">Careers admin</h1>
          <Button
            variant="outline"
            size="sm"
            className="rounded-full"
            onClick={() => {
              sessionStorage.removeItem(TOKEN_KEY);
              setToken(null);
            }}
          >
            Sign out
          </Button>
        </div>

        <h2 className="mt-10 font-display text-xl">{draft.id ? "Edit opening" : "Post a new opening"}</h2>
        <form
          className="mt-4 space-y-4 rounded-2xl border border-border bg-card/50 p-5"
          onSubmit={async (e) => {
            e.preventDefault();
            setBusy(true);
            try {
              await saveOpening({
                data: {
                  token: t,
                  ...(draft.id ? { id: draft.id } : {}),
                  title: draft.title,
                  department: draft.department,
                  location: draft.location,
                  employment_type: draft.employment_type,
                  experience: draft.experience,
                  summary: draft.summary,
                  description: draft.description,
                  responsibilities: draft.responsibilities.split("\n").map((s) => s.trim()).filter(Boolean),
                  requirements: draft.requirements.split("\n").map((s) => s.trim()).filter(Boolean),
                  salary_note: draft.salary_note,
                  apply_by: draft.apply_by,
                  published: draft.published,
                },
              });
              toast.success(draft.id ? "Opening updated" : "Opening posted");
              setDraft({ ...emptyDraft });
              await refresh(t);
            } catch {
              toast.error("Could not save the opening");
            } finally {
              setBusy(false);
            }
          }}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="title">Title *</Label>
              <Input id="title" required value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="dept">Department</Label>
              <Input id="dept" value={draft.department} onChange={(e) => setDraft({ ...draft, department: e.target.value })} className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="loc">Location</Label>
              <Input id="loc" value={draft.location} onChange={(e) => setDraft({ ...draft, location: e.target.value })} className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="etype">Employment type</Label>
              <Input id="etype" value={draft.employment_type} onChange={(e) => setDraft({ ...draft, employment_type: e.target.value })} className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="exp">Experience</Label>
              <Input id="exp" placeholder="2–4 years" value={draft.experience} onChange={(e) => setDraft({ ...draft, experience: e.target.value })} className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="applyby">Apply by (YYYY-MM-DD)</Label>
              <Input id="applyby" value={draft.apply_by} onChange={(e) => setDraft({ ...draft, apply_by: e.target.value })} className="mt-1.5" />
            </div>
          </div>
          <div>
            <Label htmlFor="summary">One-line summary</Label>
            <Input id="summary" value={draft.summary} onChange={(e) => setDraft({ ...draft, summary: e.target.value })} className="mt-1.5" />
          </div>
          <div>
            <Label htmlFor="desc">Description</Label>
            <Textarea id="desc" rows={4} value={draft.description} onChange={(e) => setDraft({ ...draft, description: e.target.value })} className="mt-1.5" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="resp">Responsibilities (one per line)</Label>
              <Textarea id="resp" rows={5} value={draft.responsibilities} onChange={(e) => setDraft({ ...draft, responsibilities: e.target.value })} className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="req">Requirements (one per line)</Label>
              <Textarea id="req" rows={5} value={draft.requirements} onChange={(e) => setDraft({ ...draft, requirements: e.target.value })} className="mt-1.5" />
            </div>
          </div>
          <div>
            <Label htmlFor="salary">Compensation note</Label>
            <Input id="salary" value={draft.salary_note} onChange={(e) => setDraft({ ...draft, salary_note: e.target.value })} className="mt-1.5" />
          </div>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={draft.published} onChange={(e) => setDraft({ ...draft, published: e.target.checked })} />
            Published (visible on /careers)
          </label>
          <div className="flex gap-2">
            <Button type="submit" className="rounded-full" disabled={busy}>
              {draft.id ? "Save changes" : "Post opening"}
            </Button>
            {draft.id ? (
              <Button type="button" variant="outline" className="rounded-full" onClick={() => setDraft({ ...emptyDraft })}>
                Cancel
              </Button>
            ) : null}
          </div>
        </form>

        <h2 className="mt-12 font-display text-xl">Openings ({openings.length})</h2>
        <div className="mt-4 space-y-3">
          {openings.map((o) => (
            <div key={o.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border p-4">
              <div>
                <div className="font-medium">
                  {o.title}{" "}
                  <Badge variant={o.published ? "default" : "outline"} className="ml-2 align-middle">
                    {o.published ? "Live" : "Draft"}
                  </Badge>
                </div>
                <div className="text-xs text-muted-foreground">
                  {o.department} · {o.location} · {o.employment_type}
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="rounded-full"
                  onClick={() =>
                    setDraft({
                      id: o.id,
                      title: o.title,
                      department: o.department,
                      location: o.location,
                      employment_type: o.employment_type,
                      experience: o.experience ?? "",
                      summary: o.summary,
                      description: o.description,
                      responsibilities: (o.responsibilities ?? []).join("\n"),
                      requirements: (o.requirements ?? []).join("\n"),
                      salary_note: o.salary_note ?? "",
                      apply_by: o.apply_by ?? "",
                      published: o.published,
                    })
                  }
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="rounded-full"
                  onClick={async () => {
                    if (!confirm(`Delete "${o.title}"?`)) return;
                    try {
                      await deleteOpening({ data: { token: t, id: o.id } });
                      toast.success("Opening deleted");
                      await refresh(t);
                    } catch {
                      toast.error("Could not delete");
                    }
                  }}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>

        <h2 className="mt-12 font-display text-xl">Applications ({applications.length})</h2>
        <div className="mt-4 space-y-3">
          {applications.length === 0 ? (
            <p className="text-sm text-muted-foreground">No applications yet.</p>
          ) : null}
          {applications.map((a) => (
            <div key={a.id} className="rounded-xl border border-border p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="font-medium">
                  {a.full_name} <span className="text-muted-foreground">· {a.job_title}</span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {new Date(a.created_at).toLocaleString("en-IN")}
                </span>
              </div>
              <div className="mt-1 text-sm text-muted-foreground">
                {a.email} · {a.phone}
                {a.city ? ` · ${a.city}` : ""}
                {a.experience_years ? ` · ${a.experience_years} yrs` : ""}
                {a.current_role_title ? ` · ${a.current_role_title}` : ""}
              </div>
              {a.cover_note ? <p className="mt-2 whitespace-pre-wrap text-sm">{a.cover_note}</p> : null}
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="rounded-full"
                  onClick={async () => {
                    try {
                      const { url } = await resumeLink({ data: { token: t, path: a.resume_path } });
                      window.open(url, "_blank", "noopener");
                    } catch {
                      toast.error("Could not open resume");
                    }
                  }}
                >
                  Open resume
                </Button>
                {a.link_url ? (
                  <a href={a.link_url} target="_blank" rel="noopener noreferrer" className="text-sm underline">
                    Profile link
                  </a>
                ) : null}
                <select
                  className="rounded-full border border-border bg-background px-3 py-1.5 text-sm"
                  value={a.status}
                  onChange={async (e) => {
                    const status = e.target.value as (typeof STATUSES)[number];
                    try {
                      await setStatus({ data: { token: t, id: a.id, status } });
                      setApplications((prev) => prev.map((x) => (x.id === a.id ? { ...x, status } : x)));
                    } catch {
                      toast.error("Could not update status");
                    }
                  }}
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
