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
import { Briefcase, MapPin, Clock, Upload, Building2 } from "lucide-react";

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
  const [progress, setProgress] = useState<number | null>(null);
  const [resumeError, setResumeError] = useState<string | null>(null);
  const [resumeOk, setResumeOk] = useState(false);
  const [done, setDone] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [values, setValues] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    currentRole: "",
    experienceYears: "",
    linkUrl: "",
    coverNote: "",
  });

  const contactComplete =
    values.fullName.trim().length >= 2 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()) &&
    values.phone.trim().length >= 6 &&
    values.city.trim().length >= 2 &&
    values.currentRole.trim().length >= 2 &&
    values.experienceYears.trim().length >= 1;

  const errorFor = (field: keyof typeof values, label: string) => {
    if (!touched[field]) return null;
    const v = values[field].trim();
    switch (field) {
      case "fullName":
      case "currentRole":
      case "city":
        return v.length < 2 ? `${label} is required` : null;
      case "email":
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? null : "Enter a valid email";
      case "phone":
        return v.length < 6 ? `${label} is required` : null;
      case "experienceYears":
        return v.length < 1 ? `${label} is required` : null;
      default:
        return null;
    }
  };

  const MAX_RESUME_BYTES = 8 * 1024 * 1024;
  const ALLOWED_EXTENSIONS = ["pdf", "doc", "docx"];
  const ALLOWED_MIMES = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  const validateResume = (file: File | null | undefined): string | null => {
    if (!file || file.size === 0) return "Please attach your resume";
    if (file.size > MAX_RESUME_BYTES) return "Resume must be under 8 MB";
    const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
    const extOk = ALLOWED_EXTENSIONS.includes(ext);
    const mimeOk = file.type === "" || ALLOWED_MIMES.includes(file.type);
    if (!extOk || !mimeOk) return "Only PDF, DOC or DOCX files are allowed";
    return null;
  };

  const submitWithProgress = (fd: FormData) =>
    new Promise<{ ok: boolean; error?: string }>((resolve) => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", "/api/public/job-application");
      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) setProgress(Math.round((e.loaded / e.total) * 100));
      };
      xhr.onload = () => {
        try {
          const json = JSON.parse(xhr.responseText) as { ok?: boolean; error?: string };
          resolve(xhr.status >= 200 && xhr.status < 300 && json.ok ? { ok: true } : { ok: false, error: json.error ?? "Could not submit your application" });
        } catch {
          resolve({ ok: false, error: "Could not submit your application" });
        }
      };
      xhr.onerror = () => resolve({ ok: false, error: "Network error. Please try again." });
      xhr.send(fd);
    });

  const update = (field: keyof typeof values, value: string) => {
    setValues((s) => ({ ...s, [field]: value }));
    setTouched((s) => ({ ...s, [field]: true }));
  };

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
        if (!contactComplete) {
          setTouched({
            fullName: true,
            email: true,
            phone: true,
            city: true,
            currentRole: true,
            experienceYears: true,
            linkUrl: true,
            coverNote: true,
          });
          toast.error("Please complete all contact details before uploading your resume.");
          return;
        }
        const form = e.currentTarget;
        const fd = new FormData(form);
        const file = form.resume.files?.[0] as File | undefined;
        const fileError = validateResume(file);
        if (fileError) {
          setResumeError(fileError);
          setResumeOk(false);
          toast.error(fileError);
          return;
        }
        if (selected?.id) fd.set("jobId", selected.id);
        fd.set("jobTitle", selected?.title ?? "General application");
        setBusy(true);
        setProgress(0);
        try {
          const result = await submitWithProgress(fd);
          if (!result.ok) {
            toast.error(result.error ?? "Could not submit your application");
            return;
          }
          form.reset();
          setResumeOk(false);
          setResumeError(null);
          setValues({
            fullName: "",
            email: "",
            phone: "",
            city: "",
            currentRole: "",
            experienceYears: "",
            linkUrl: "",
            coverNote: "",
          });
          setTouched({});
          setDone(true);
        } catch {
          toast.error("Network error. Please try again.");
        } finally {
          setBusy(false);
          setProgress(null);
        }
      }}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField
          id="fullName"
          name="fullName"
          label="Full name"
          required
          maxLength={120}
          value={values.fullName}
          error={errorFor("fullName", "Full name")}
          onChange={(v) => update("fullName", v)}
        />
        <TextField
          id="email"
          name="email"
          type="email"
          label="Email"
          required
          maxLength={200}
          value={values.email}
          error={errorFor("email", "Email")}
          onChange={(v) => update("email", v)}
        />
        <TextField
          id="phone"
          name="phone"
          label="Phone / WhatsApp"
          required
          maxLength={40}
          value={values.phone}
          error={errorFor("phone", "Phone / WhatsApp")}
          onChange={(v) => update("phone", v)}
        />
        <TextField
          id="city"
          name="city"
          label="City"
          required
          maxLength={120}
          value={values.city}
          error={errorFor("city", "City")}
          onChange={(v) => update("city", v)}
        />
        <TextField
          id="currentRole"
          name="currentRole"
          label="Current role"
          required
          maxLength={160}
          value={values.currentRole}
          error={errorFor("currentRole", "Current role")}
          onChange={(v) => update("currentRole", v)}
        />
        <TextField
          id="experienceYears"
          name="experienceYears"
          label="Years of experience"
          required
          maxLength={40}
          value={values.experienceYears}
          error={errorFor("experienceYears", "Years of experience")}
          onChange={(v) => update("experienceYears", v)}
        />
      </div>

      <div>
        <Label htmlFor="linkUrl">LinkedIn / portfolio link</Label>
        <Input
          id="linkUrl"
          name="linkUrl"
          placeholder="https://"
          maxLength={300}
          value={values.linkUrl}
          onChange={(e) => update("linkUrl", e.target.value)}
          className="mt-1.5"
        />
      </div>

      <div>
        <Label htmlFor="coverNote">Why you're a fit</Label>
        <Textarea
          id="coverNote"
          name="coverNote"
          rows={5}
          maxLength={3000}
          value={values.coverNote}
          onChange={(e) => update("coverNote", e.target.value)}
          className="mt-1.5"
        />
      </div>

      <div>
        <Label htmlFor="resume" className={contactComplete ? "" : "text-muted-foreground"}>
          Resume (PDF, DOC or DOCX, max 8 MB) *
        </Label>
        <Input
          id="resume"
          name="resume"
          type="file"
          required
          disabled={!contactComplete || busy}
          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          className={`mt-1.5 ${resumeError ? "border-destructive focus-visible:ring-destructive" : ""}`}
          aria-invalid={resumeError ? "true" : "false"}
          onChange={(e) => {
            const err = validateResume(e.target.files?.[0]);
            setResumeError(err);
            setResumeOk(!err);
            if (err) toast.error(err);
          }}
        />
        {!contactComplete ? (
          <p className="mt-1.5 text-xs text-destructive">
            Complete all contact details above before uploading your resume.
          </p>
        ) : resumeError ? (
          <p className="mt-1.5 text-xs text-destructive">{resumeError}</p>
        ) : resumeOk ? (
          <p className="mt-1.5 text-xs text-green-500">Resume looks good — ready to submit.</p>
        ) : null}
      </div>

      {busy && progress !== null ? (
        <div aria-live="polite">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{progress < 100 ? "Uploading resume…" : "Processing application…"}</span>
            <span>{progress}%</span>
          </div>
          <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary transition-all duration-200"
              style={{ width: `${progress}%` }}
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
        </div>
      ) : null}

      <Button type="submit" disabled={busy || !contactComplete} className="w-full rounded-full gap-2">
        <Upload className="h-4 w-4" />
        {busy ? (progress !== null && progress < 100 ? `Uploading… ${progress}%` : "Submitting…") : "Submit application"}
      </Button>
      <p className="text-xs text-muted-foreground">
        Your details and resume are stored securely and used only for recruitment.
      </p>
    </form>
  );
}

function TextField({
  id,
  name,
  label,
  type = "text",
  required,
  maxLength,
  value,
  error,
  onChange,
}: {
  id: string;
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  maxLength?: number;
  value: string;
  error: string | null;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <Label htmlFor={id}>
        {label}
        {required ? " *" : null}
      </Label>
      <Input
        id={id}
        name={name}
        type={type}
        required={required}
        maxLength={maxLength}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`mt-1.5 ${error ? "border-destructive focus-visible:ring-destructive" : ""}`}
        aria-invalid={error ? "true" : "false"}
      />
      {error ? <p className="mt-1 text-xs text-destructive">{error}</p> : null}
    </div>
  );
}

function FilterSelect({
  id,
  label,
  value,
  onChange,
  options,
  allLabel,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  allLabel: string;
}) {
  return (
    <div>
      <Label htmlFor={id} className="text-xs">{label}</Label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 h-10 w-full rounded-md border border-border bg-background px-3 text-sm"
      >
        <option value="all">{allLabel}</option>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}
