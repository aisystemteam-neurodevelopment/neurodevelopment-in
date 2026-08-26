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
  careersSaveReview,
  careersParseResume,
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

type AdminData = Awaited<ReturnType<typeof careersAdminData>>;
type Opening = AdminData["openings"][number];
type Application = AdminData["applications"][number];
type AuditEntry = AdminData["audit"][number];
type Role = AdminData["role"];

const emptyDraft = {
  id: undefined as string | undefined,
  title: "",
  department: "General",
  location: "Kolkata",
  employment_type: "Full-time",
  work_mode: "On-site",
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
  const saveReview = useServerFn(careersSaveReview);
  const parseResume = useServerFn(careersParseResume);
  const resumeLink = useServerFn(careersResumeLink);

  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<Role>("reviewer");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [openings, setOpenings] = useState<Opening[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [audit, setAudit] = useState<AuditEntry[]>([]);
  const [draft, setDraft] = useState({ ...emptyDraft });
  const [openReview, setOpenReview] = useState<string | null>(null);

  useEffect(() => {
    const saved = sessionStorage.getItem(TOKEN_KEY);
    if (saved) setToken(saved);
  }, []);

  const refresh = useCallback(
    async (t: string) => {
      try {
        const data = await loadData({ data: { token: t } });
        setRole(data.role);
        setOpenings(data.openings);
        setApplications(data.applications);
        setAudit(data.audit);
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
          <p className="mt-2 text-sm text-muted-foreground">
            Sign in with your admin or reviewer password.
          </p>
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
                setRole(res.role);
                setToken(res.token);
                toast.success(`Signed in as ${res.role}`);
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
  const isAdmin = role === "admin";

  return (
    <SiteLayout>
      <section className="mx-auto max-w-5xl px-5 py-14 text-left">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="font-display text-2xl">Careers admin</h1>
            <p className="mt-1 text-xs text-muted-foreground">
              Signed in as <Badge variant="outline">{role}</Badge>{" "}
              {isAdmin ? "— full access" : "— can review applicants and change statuses only"}
            </p>
          </div>
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

        {isAdmin ? (
          <>
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
                      work_mode: draft.work_mode,
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
                  <Label htmlFor="etype">Role type</Label>
                  <select
                    id="etype"
                    value={draft.employment_type}
                    onChange={(e) => setDraft({ ...draft, employment_type: e.target.value })}
                    className="mt-1.5 h-10 w-full rounded-md border border-border bg-background px-3 text-sm"
                  >
                    {["Full-time", "Part-time", "Contract", "Internship", "Consultant"].map((v) => (
                      <option key={v} value={v}>{v}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label htmlFor="wmode">Work mode</Label>
                  <select
                    id="wmode"
                    value={draft.work_mode}
                    onChange={(e) => setDraft({ ...draft, work_mode: e.target.value })}
                    className="mt-1.5 h-10 w-full rounded-md border border-border bg-background px-3 text-sm"
                  >
                    {["On-site", "Hybrid", "Remote"].map((v) => (
                      <option key={v} value={v}>{v}</option>
                    ))}
                  </select>
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
          </>
        ) : null}

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
                  {o.department} · {o.location} · {o.employment_type} · {o.work_mode}
                </div>
              </div>
              {isAdmin ? (
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
                        work_mode: o.work_mode,
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
              ) : null}
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
                <Button
                  size="sm"
                  variant="outline"
                  className="rounded-full"
                  onClick={() => setOpenReview(openReview === a.id ? null : a.id)}
                >
                  {openReview === a.id ? "Hide review" : "Review"}
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
                      await refresh(t);
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

              {openReview === a.id ? (
                <ReviewPanel
                  application={a}
                  onParse={async () => {
                    const parsed = await parseResume({ data: { token: t, id: a.id } });
                    setApplications((prev) =>
                      prev.map((x) =>
                        x.id === a.id
                          ? {
                              ...x,
                              parsed_name: parsed.name,
                              parsed_experience: parsed.experience,
                              parsed_skills: parsed.skills,
                              parsed_summary: parsed.summary,
                              parsed_at: parsed.parsed_at,
                            }
                          : x,
                      ),
                    );
                    return parsed;
                  }}
                  onSave={async (values) => {
                    await saveReview({ data: { token: t, id: a.id, ...values } });
                    setApplications((prev) => prev.map((x) => (x.id === a.id ? { ...x, ...values } : x)));
                    await refresh(t);
                  }}
                />
              ) : null}
            </div>
          ))}
        </div>

        <h2 className="mt-12 font-display text-xl">Activity log</h2>
        <p className="mt-1 text-xs text-muted-foreground">
          Every job edit and applicant status change, newest first.
        </p>
        <div className="mt-4 overflow-x-auto rounded-xl border border-border">
          <table className="w-full min-w-[640px] text-sm">
            <thead className="bg-muted/40 text-left text-xs uppercase text-muted-foreground">
              <tr>
                <th className="px-4 py-2">When</th>
                <th className="px-4 py-2">Who</th>
                <th className="px-4 py-2">Action</th>
                <th className="px-4 py-2">Item</th>
                <th className="px-4 py-2">Details</th>
              </tr>
            </thead>
            <tbody>
              {audit.length === 0 ? (
                <tr><td colSpan={5} className="px-4 py-4 text-muted-foreground">No activity recorded yet.</td></tr>
              ) : null}
              {audit.map((e) => (
                <tr key={e.id} className="border-t border-border align-top">
                  <td className="px-4 py-2 whitespace-nowrap text-xs text-muted-foreground">
                    {new Date(e.created_at).toLocaleString("en-IN")}
                  </td>
                  <td className="px-4 py-2"><Badge variant="outline">{e.actor_role}</Badge></td>
                  <td className="px-4 py-2">{e.action.replace(/_/g, " ")}</td>
                  <td className="px-4 py-2">{e.entity_label ?? "—"}</td>
                  <td className="px-4 py-2 text-xs text-muted-foreground">{describeDetails(e.details)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </SiteLayout>
  );
}

function describeDetails(details: AuditEntry["details"]): string {
  if (!details || Object.keys(details).length === 0) return "—";
  return Object.entries(details)
    .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(", ") || "—" : String(v)}`)
    .join(" · ");
}

function ReviewPanel({
  application,
  onParse,
  onSave,
}: {
  application: Application;
  onParse: () => Promise<{ name: string | null; experience: string | null; skills: string[]; summary: string | null }>;
  onSave: (values: {
    parsed_name: string;
    parsed_experience: string;
    parsed_skills: string[];
    parsed_summary: string;
    review_notes: string;
  }) => Promise<void>;
}) {
  const [name, setName] = useState(application.parsed_name ?? application.full_name);
  const [experience, setExperience] = useState(application.parsed_experience ?? application.experience_years ?? "");
  const [skills, setSkills] = useState((application.parsed_skills ?? []).join(", "));
  const [summary, setSummary] = useState(application.parsed_summary ?? "");
  const [notes, setNotes] = useState(application.review_notes ?? "");
  const [working, setWorking] = useState(false);

  return (
    <div className="mt-4 rounded-xl border border-border bg-card/40 p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="text-sm font-medium">Applicant review</div>
        <div className="flex items-center gap-2">
          {application.parsed_at ? (
            <span className="text-xs text-muted-foreground">
              Resume read {new Date(application.parsed_at).toLocaleString("en-IN")}
            </span>
          ) : null}
          <Button
            size="sm"
            variant="outline"
            className="rounded-full"
            disabled={working}
            onClick={async () => {
              setWorking(true);
              try {
                const parsed = await onParse();
                setName(parsed.name ?? name);
                setExperience(parsed.experience ?? experience);
                if (parsed.skills.length) setSkills(parsed.skills.join(", "));
                setSummary(parsed.summary ?? summary);
                toast.success("Fields filled from the resume");
              } catch {
                toast.error("Could not read the resume");
              } finally {
                setWorking(false);
              }
            }}
          >
            {working ? "Reading…" : "Auto-fill from resume"}
          </Button>
        </div>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <Label>Name</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} className="mt-1.5" />
        </div>
        <div>
          <Label>Experience</Label>
          <Input value={experience} onChange={(e) => setExperience(e.target.value)} className="mt-1.5" />
        </div>
      </div>
      <div className="mt-4">
        <Label>Skills (comma separated)</Label>
        <Input value={skills} onChange={(e) => setSkills(e.target.value)} className="mt-1.5" />
      </div>
      <div className="mt-4">
        <Label>Resume summary</Label>
        <Textarea rows={3} value={summary} onChange={(e) => setSummary(e.target.value)} className="mt-1.5" />
      </div>
      <div className="mt-4">
        <Label>Reviewer notes</Label>
        <Textarea rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} className="mt-1.5" />
      </div>
      <Button
        size="sm"
        className="mt-4 rounded-full"
        disabled={working}
        onClick={async () => {
          setWorking(true);
          try {
            await onSave({
              parsed_name: name.trim(),
              parsed_experience: experience.trim(),
              parsed_skills: skills.split(",").map((s) => s.trim()).filter(Boolean).slice(0, 30),
              parsed_summary: summary.trim(),
              review_notes: notes.trim(),
            });
            toast.success("Review saved");
          } catch {
            toast.error("Could not save the review");
          } finally {
            setWorking(false);
          }
        }}
      >
        Save review
      </Button>
    </div>
  );
}
