import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { toast } from "sonner";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { listOpenings } from "@/lib/careers.functions";
import { Briefcase, MapPin, Clock, Upload } from "lucide-react";

const openingsQuery = queryOptions({
  queryKey: ["job-openings"],
  queryFn: () => listOpenings(),
});

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers — Institute of NeuroDevelopment" },
      {
        name: "description",
        content:
          "Join the Institute of NeuroDevelopment team in Kolkata. Browse open roles in clinical coaching, operations and content, and apply online with your resume.",
      },
      { property: "og:title", content: "Careers at Institute of NeuroDevelopment" },
      {
        property: "og:description",
        content: "Open roles for therapists, coaches and coordinators who want to help families make measurable progress.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "https://neurodevelopment.in/careers" }],
  }),
  component: CareersPage,
  errorComponent: () => (
    <SiteLayout>
      <div className="mx-auto max-w-3xl px-5 py-24 text-center">
        <h1 className="font-display text-3xl">Careers</h1>
        <p className="mt-3 text-muted-foreground">
          We couldn't load openings right now. Please email instituteofneurodevelopment@gmail.com.
        </p>
      </div>
    </SiteLayout>
  ),
});

function CareersPage() {
  const { data: allOpenings } = useSuspenseQuery(openingsQuery);
  const [selected, setSelected] = useState<{ id?: string; title: string } | null>(null);
  const [q, setQ] = useState("");
  const [location, setLocation] = useState("all");
  const [roleType, setRoleType] = useState("all");
  const [workMode, setWorkMode] = useState("all");

  const uniq = (values: (string | null | undefined)[]) =>
    Array.from(new Set(values.filter((v): v is string => Boolean(v && v.trim())))).sort();

  const locations = uniq(allOpenings.map((j) => j.location));
  const roleTypes = uniq(allOpenings.map((j) => j.employment_type));
  const workModes = uniq(allOpenings.map((j) => j.work_mode));

  const openings = allOpenings.filter((job) => {
    if (location !== "all" && job.location !== location) return false;
    if (roleType !== "all" && job.employment_type !== roleType) return false;
    if (workMode !== "all" && job.work_mode !== workMode) return false;
    if (q.trim()) {
      const hay = `${job.title} ${job.department} ${job.summary} ${job.description}`.toLowerCase();
      if (!hay.includes(q.trim().toLowerCase())) return false;
    }
    return true;
  });

  const filtersActive = q.trim() !== "" || location !== "all" || roleType !== "all" || workMode !== "all";

  return (
    <SiteLayout>
      <section className="mx-auto max-w-5xl px-5 py-16 md:py-20">
        <Badge variant="outline" className="rounded-full">We're hiring</Badge>
        <h1 className="mt-4 font-display text-3xl md:text-5xl">Careers at Institute of NeuroDevelopment</h1>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          We're building a parent-led neurodevelopment system for families across India and beyond.
          If you care about measurable progress over endless therapy cycles, we'd like to meet you.
        </p>
      </section>

      <section className="mx-auto max-w-5xl px-5 pb-8">
        <h2 className="font-display text-2xl">Open positions</h2>

        {allOpenings.length > 0 ? (
          <div className="mt-6 rounded-2xl border border-border bg-card/40 p-4 text-left">
            <div className="grid gap-3 md:grid-cols-4">
              <div>
                <Label htmlFor="job-search" className="text-xs">Search</Label>
                <Input
                  id="job-search"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Role or keyword"
                  className="mt-1.5"
                />
              </div>
              <FilterSelect id="filter-location" label="Location" value={location} onChange={setLocation} options={locations} allLabel="All locations" />
              <FilterSelect id="filter-type" label="Role type" value={roleType} onChange={setRoleType} options={roleTypes} allLabel="All role types" />
              <FilterSelect id="filter-mode" label="Work mode" value={workMode} onChange={setWorkMode} options={workModes} allLabel="All work modes" />
            </div>
            <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
              <p className="text-xs text-muted-foreground">
                Showing {openings.length} of {allOpenings.length} {allOpenings.length === 1 ? "role" : "roles"}
              </p>
              {filtersActive ? (
                <Button
                  variant="ghost"
                  size="sm"
                  className="rounded-full"
                  onClick={() => { setQ(""); setLocation("all"); setRoleType("all"); setWorkMode("all"); }}
                >
                  Clear filters
                </Button>
              ) : null}
            </div>
          </div>
        ) : null}

        {allOpenings.length === 0 ? (
          <p className="mt-4 text-muted-foreground">
            No openings right now. You can still send us a general application below — we keep resumes on file.
          </p>
        ) : openings.length === 0 ? (
          <p className="mt-6 text-muted-foreground">
            No roles match these filters. Clear them, or send a general application below.
          </p>
        ) : (
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {openings.map((job) => (
              <article key={job.id} className="rounded-2xl border border-border bg-card/60 p-6 text-left">
                <h3 className="font-display text-xl">{job.title}</h3>
                <div className="mt-3 flex flex-wrap gap-3 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1"><Briefcase className="h-3.5 w-3.5" />{job.department}</span>
                  <span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{job.location}</span>
                  <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{job.employment_type}</span>
                  {job.work_mode ? <span className="inline-flex items-center gap-1"><Building2 className="h-3.5 w-3.5" />{job.work_mode}</span> : null}
                  {job.experience ? <span>{job.experience} experience</span> : null}
                </div>

                {job.summary ? <p className="mt-4 text-sm text-muted-foreground">{job.summary}</p> : null}
                {job.description ? <p className="mt-3 text-sm text-muted-foreground">{job.description}</p> : null}

                {job.responsibilities?.length ? (
                  <div className="mt-4">
                    <div className="text-sm font-medium">What you'll do</div>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                      {job.responsibilities.map((r) => <li key={r}>{r}</li>)}
                    </ul>
                  </div>
                ) : null}
                {job.requirements?.length ? (
                  <div className="mt-4">
                    <div className="text-sm font-medium">What we're looking for</div>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                      {job.requirements.map((r) => <li key={r}>{r}</li>)}
                    </ul>
                  </div>
                ) : null}
                {job.salary_note ? <p className="mt-4 text-sm">{job.salary_note}</p> : null}
                {job.apply_by ? (
                  <p className="mt-2 text-xs text-muted-foreground">Apply by {job.apply_by}</p>
                ) : null}

                <Button
                  className="mt-5 rounded-full"
                  onClick={() => {
                    setSelected({ id: job.id, title: job.title });
                    document.getElementById("apply")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Apply for this role
                </Button>
              </article>
            ))}
          </div>
        )}
      </section>

      <section id="apply" className="mx-auto max-w-2xl px-5 pb-24 pt-8">
        <h2 className="font-display text-2xl">Apply</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {selected ? `Applying for: ${selected.title}` : "Send a general application, or pick a role above."}
        </p>
        <ApplicationForm selected={selected} onDone={() => setSelected(null)} />
      </section>
    </SiteLayout>
  );
}

function ApplicationForm({
  selected,
  onDone,
}: {
  selected: { id?: string; title: string } | null;
  onDone: () => void;
}) {
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <div className="mt-6 rounded-2xl border border-border bg-card/60 p-8 text-center">
        <h3 className="font-display text-xl">Application received</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Thank you. If your profile fits, our team will reach out on the phone number or email you shared.
        </p>
        <Button variant="outline" className="mt-5 rounded-full" onClick={() => { setDone(false); onDone(); }}>
          Submit another application
        </Button>
      </div>
    );
  }

  return (
    <form
      className="mt-6 space-y-4 text-left"
      onSubmit={async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const fd = new FormData(form);
        if (selected?.id) fd.set("jobId", selected.id);
        fd.set("jobTitle", selected?.title ?? "General application");
        setBusy(true);
        try {
          const res = await fetch("/api/public/job-application", { method: "POST", body: fd });
          const json = (await res.json()) as { ok?: boolean; error?: string };
          if (!res.ok || !json.ok) {
            toast.error(json.error ?? "Could not submit your application");
            return;
          }
          form.reset();
          setDone(true);
        } catch {
          toast.error("Network error. Please try again.");
        } finally {
          setBusy(false);
        }
      }}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="fullName">Full name *</Label>
          <Input id="fullName" name="fullName" required maxLength={120} className="mt-1.5" />
        </div>
        <div>
          <Label htmlFor="email">Email *</Label>
          <Input id="email" name="email" type="email" required maxLength={200} className="mt-1.5" />
        </div>
        <div>
          <Label htmlFor="phone">Phone / WhatsApp *</Label>
          <Input id="phone" name="phone" required maxLength={40} className="mt-1.5" />
        </div>
        <div>
          <Label htmlFor="city">City</Label>
          <Input id="city" name="city" maxLength={120} className="mt-1.5" />
        </div>
        <div>
          <Label htmlFor="currentRole">Current role</Label>
          <Input id="currentRole" name="currentRole" maxLength={160} className="mt-1.5" />
        </div>
        <div>
          <Label htmlFor="experienceYears">Years of experience</Label>
          <Input id="experienceYears" name="experienceYears" maxLength={40} className="mt-1.5" />
        </div>
      </div>

      <div>
        <Label htmlFor="linkUrl">LinkedIn / portfolio link</Label>
        <Input id="linkUrl" name="linkUrl" placeholder="https://" maxLength={300} className="mt-1.5" />
      </div>

      <div>
        <Label htmlFor="coverNote">Why you're a fit</Label>
        <Textarea id="coverNote" name="coverNote" rows={5} maxLength={3000} className="mt-1.5" />
      </div>

      <div>
        <Label htmlFor="resume">Resume (PDF, DOC or DOCX, max 8 MB) *</Label>
        <Input
          id="resume"
          name="resume"
          type="file"
          required
          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          className="mt-1.5"
        />
      </div>

      <Button type="submit" disabled={busy} className="w-full rounded-full gap-2">
        <Upload className="h-4 w-4" />
        {busy ? "Submitting…" : "Submit application"}
      </Button>
      <p className="text-xs text-muted-foreground">
        Your details and resume are stored securely and used only for recruitment.
      </p>
    </form>
  );
}
