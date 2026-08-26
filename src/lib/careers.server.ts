import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

export type Opening = {
  id: string;
  title: string;
  slug: string;
  department: string;
  location: string;
  employment_type: string;
  work_mode: string;
  experience: string | null;
  summary: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  salary_note: string | null;
  apply_by: string | null;
  published: boolean;
  created_at: string;
};

export type OpeningInput = {
  id?: string;
  title: string;
  department: string;
  location: string;
  employment_type: string;
  work_mode: string;
  experience: string;
  summary: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  salary_note: string;
  apply_by: string;
  published: boolean;
};

const OPENING_COLUMNS =
  "id, title, slug, department, location, employment_type, work_mode, experience, summary, description, responsibilities, requirements, salary_note, apply_by, published, created_at";

/** Publishable-key client for public reads (RLS applies as anon). */
function publicClient() {
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"] ?? process.env["SUPABASE_ANON_KEY"]!;
  return createClient<Database>(process.env["SUPABASE_URL"]!, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const h = new Headers(init?.headers);
        if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) h.delete("Authorization");
        h.set("apikey", key);
        return fetch(input, { ...init, headers: h });
      },
    },
  });
}

export async function fetchPublishedOpenings(): Promise<Opening[]> {
  const { data, error } = await publicClient()
    .from("job_openings")
    .select(OPENING_COLUMNS)
    .eq("published", true)
    .order("created_at", { ascending: false });
  if (error) {
    console.error("Failed to load job openings", error.message);
    return [];
  }
  return (data ?? []) as Opening[];
}

/* ---------------- roles + admin session ---------------- */

export type CareersRole = "admin" | "reviewer";

const TOKEN_TTL_MS = 8 * 60 * 60 * 1000;

function passwordFor(role: CareersRole): string | null {
  const pwd =
    role === "admin" ? process.env["CAREERS_ADMIN_PASSWORD"] : process.env["CAREERS_REVIEWER_PASSWORD"];
  return pwd && pwd.length > 0 ? pwd : null;
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

async function hmac(payload: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(`careers-admin:${secret}`),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/** Matches the password against both roles; admin wins when the two are identical. */
export async function createAdminToken(password: string): Promise<{ token: string; role: CareersRole } | null> {
  for (const role of ["admin", "reviewer"] as const) {
    const expected = passwordFor(role);
    if (!expected || !timingSafeEqual(password, expected)) continue;
    const exp = String(Date.now() + TOKEN_TTL_MS);
    const payload = `${role}.${exp}`;
    return { token: `${payload}.${await hmac(payload, expected)}`, role };
  }
  return null;
}

export async function requireSession(token: string): Promise<CareersRole> {
  const [role, exp, sig] = token.split(".");
  if ((role !== "admin" && role !== "reviewer") || !exp || !sig) throw new Error("Unauthorized");
  if (Number(exp) < Date.now()) throw new Error("Session expired");
  const secret = passwordFor(role);
  if (!secret) throw new Error("Unauthorized");
  if (!timingSafeEqual(sig, await hmac(`${role}.${exp}`, secret))) throw new Error("Unauthorized");
  return role;
}

/** Session check that also enforces the admin-only capability set. */
export async function requireAdminRole(token: string): Promise<CareersRole> {
  const role = await requireSession(token);
  if (role !== "admin") throw new Error("Reviewers cannot change job postings");
  return role;
}

/* ---------------- admin data ---------------- */

async function admin() {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  return supabaseAdmin;
}

export function slugify(title: string): string {
  return (
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60) || `role-${Date.now()}`
  );
}

export type AuditEntry = {
  id: string;
  actor_role: string;
  action: string;
  entity_type: string;
  entity_id: string | null;
  entity_label: string | null;
  details: Record<string, unknown>;
  created_at: string;
};

export async function logAudit(entry: {
  actorRole: CareersRole;
  action: string;
  entityType: "job_opening" | "job_application";
  entityId?: string | null;
  entityLabel?: string | null;
  details?: Record<string, unknown>;
}) {
  try {
    const db = await admin();
    await db.from("careers_audit_log").insert({
      actor_role: entry.actorRole,
      action: entry.action,
      entity_type: entry.entityType,
      entity_id: entry.entityId ?? null,
      entity_label: entry.entityLabel ?? null,
      details: (entry.details ?? {}) as never,
    });
  } catch (err) {
    console.error("Audit log write failed", err);
  }
}

export async function adminListAudit(limit = 200): Promise<AuditEntry[]> {
  const db = await admin();
  const { data, error } = await db
    .from("careers_audit_log")
    .select("id, actor_role, action, entity_type, entity_id, entity_label, details, created_at")
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) throw new Error(error.message);
  return (data ?? []) as AuditEntry[];
}

export async function adminListOpenings(): Promise<Opening[]> {
  const db = await admin();
  const { data, error } = await db
    .from("job_openings")
    .select(OPENING_COLUMNS)
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []) as Opening[];
}

export async function adminSaveOpening(input: OpeningInput, actorRole: CareersRole) {
  const db = await admin();
  const row = {
    title: input.title,
    department: input.department || "General",
    location: input.location || "Kolkata",
    employment_type: input.employment_type || "Full-time",
    work_mode: input.work_mode || "On-site",
    experience: input.experience || null,
    summary: input.summary,
    description: input.description,
    responsibilities: input.responsibilities,
    requirements: input.requirements,
    salary_note: input.salary_note || null,
    apply_by: input.apply_by || null,
    published: input.published,
  };

  if (input.id) {
    const { data: before } = await db.from("job_openings").select(OPENING_COLUMNS).eq("id", input.id).single();
    const { error } = await db.from("job_openings").update(row).eq("id", input.id);
    if (error) throw new Error(error.message);
    await logAudit({
      actorRole,
      action: "opening_updated",
      entityType: "job_opening",
      entityId: input.id,
      entityLabel: input.title,
      details: { changed: diffKeys(before as Record<string, unknown> | null, row) },
    });
    return { id: input.id };
  }

  const { data, error } = await db
    .from("job_openings")
    .insert({ ...row, slug: `${slugify(input.title)}-${Math.random().toString(36).slice(2, 6)}` })
    .select("id")
    .single();
  if (error) throw new Error(error.message);
  await logAudit({
    actorRole,
    action: "opening_created",
    entityType: "job_opening",
    entityId: data.id,
    entityLabel: input.title,
    details: { published: input.published },
  });
  return { id: data.id };
}

function diffKeys(before: Record<string, unknown> | null, after: Record<string, unknown>): string[] {
  if (!before) return Object.keys(after);
  return Object.keys(after).filter((k) => JSON.stringify(before[k]) !== JSON.stringify(after[k]));
}

export async function adminDeleteOpening(id: string, actorRole: CareersRole) {
  const db = await admin();
  const { data: before } = await db.from("job_openings").select("title").eq("id", id).single();
  const { error } = await db.from("job_openings").delete().eq("id", id);
  if (error) throw new Error(error.message);
  await logAudit({
    actorRole,
    action: "opening_deleted",
    entityType: "job_opening",
    entityId: id,
    entityLabel: before?.title ?? null,
  });
}

export type Application = {
  id: string;
  job_id: string | null;
  job_title: string;
  full_name: string;
  email: string;
  phone: string;
  city: string | null;
  current_role_title: string | null;
  experience_years: string | null;
  cover_note: string | null;
  link_url: string | null;
  resume_path: string;
  status: string;
  parsed_name: string | null;
  parsed_experience: string | null;
  parsed_skills: string[];
  parsed_summary: string | null;
  parsed_at: string | null;
  review_notes: string | null;
  created_at: string;
};

const APPLICATION_COLUMNS =
  "id, job_id, job_title, full_name, email, phone, city, current_role_title, experience_years, cover_note, link_url, resume_path, status, parsed_name, parsed_experience, parsed_skills, parsed_summary, parsed_at, review_notes, created_at";

export async function adminListApplications(): Promise<Application[]> {
  const db = await admin();
  const { data, error } = await db
    .from("job_applications")
    .select(APPLICATION_COLUMNS)
    .order("created_at", { ascending: false })
    .limit(500);
  if (error) throw new Error(error.message);
  return (data ?? []) as Application[];
}

export async function adminSetApplicationStatus(id: string, status: string, actorRole: CareersRole) {
  const db = await admin();
  const { data: before } = await db
    .from("job_applications")
    .select("status, full_name, job_title, email")
    .eq("id", id)
    .single();
  const { error } = await db.from("job_applications").update({ status }).eq("id", id);
  if (error) throw new Error(error.message);
  await logAudit({
    actorRole,
    action: "application_status_changed",
    entityType: "job_application",
    entityId: id,
    entityLabel: before ? `${before.full_name} — ${before.job_title}` : null,
    details: { from: before?.status ?? null, to: status },
  });
}

export async function adminSaveReview(
  id: string,
  review: { parsed_name: string; parsed_experience: string; parsed_skills: string[]; parsed_summary: string; review_notes: string },
  actorRole: CareersRole,
) {
  const db = await admin();
  const { data: before } = await db
    .from("job_applications")
    .select("full_name, job_title, parsed_name, parsed_experience, parsed_skills, parsed_summary, review_notes")
    .eq("id", id)
    .single();
  const row = {
    parsed_name: review.parsed_name || null,
    parsed_experience: review.parsed_experience || null,
    parsed_skills: review.parsed_skills,
    parsed_summary: review.parsed_summary || null,
    review_notes: review.review_notes || null,
  };
  const { error } = await db.from("job_applications").update(row).eq("id", id);
  if (error) throw new Error(error.message);
  await logAudit({
    actorRole,
    action: "application_review_saved",
    entityType: "job_application",
    entityId: id,
    entityLabel: before ? `${before.full_name} — ${before.job_title}` : null,
    details: { changed: diffKeys(before as Record<string, unknown> | null, row) },
  });
}

export async function adminResumeUrl(path: string): Promise<string> {
  const db = await admin();
  const { data, error } = await db.storage.from("job-resumes").createSignedUrl(path, 300);
  if (error || !data) throw new Error(error?.message ?? "Could not create link");
  return data.signedUrl;
}

/* ---------------- resume parsing ---------------- */

export async function parseApplicationResume(id: string, actorRole: CareersRole) {
  const db = await admin();
  const { data: app, error } = await db
    .from("job_applications")
    .select("id, full_name, job_title, resume_path")
    .eq("id", id)
    .single();
  if (error || !app) throw new Error("Application not found");

  const parsed = await parseResumeAtPath(app.resume_path);
  const { error: upErr } = await db
    .from("job_applications")
    .update({
      parsed_name: parsed.name,
      parsed_experience: parsed.experience,
      parsed_skills: parsed.skills,
      parsed_summary: parsed.summary,
      parsed_at: new Date().toISOString(),
    })
    .eq("id", id);
  if (upErr) throw new Error(upErr.message);

  await logAudit({
    actorRole,
    action: "resume_parsed",
    entityType: "job_application",
    entityId: id,
    entityLabel: `${app.full_name} — ${app.job_title}`,
    details: { skills: parsed.skills.length },
  });

  return { ...parsed, parsed_at: new Date().toISOString() };
}

/** Downloads a stored resume and extracts structured fields. */
export async function parseResumeAtPath(path: string) {
  const db = await admin();
  const { data: file, error } = await db.storage.from("job-resumes").download(path);
  if (error || !file) throw new Error("Could not read the stored resume");
  const bytes = new Uint8Array(await file.arrayBuffer());
  const ext = path.split(".").pop() ?? "pdf";
  const { extractResumeText, extractResumeFields } = await import("./careers-resume.server");
  const text = await extractResumeText(bytes, ext);
  return await extractResumeFields(text);
}
