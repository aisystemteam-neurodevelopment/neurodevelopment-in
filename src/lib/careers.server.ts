import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

export type Opening = {
  id: string;
  title: string;
  slug: string;
  department: string;
  location: string;
  employment_type: string;
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
  "id, title, slug, department, location, employment_type, experience, summary, description, responsibilities, requirements, salary_note, apply_by, published, created_at";

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

/* ---------------- admin session ---------------- */

const TOKEN_TTL_MS = 8 * 60 * 60 * 1000;

function adminPassword(): string {
  const pwd = process.env["CAREERS_ADMIN_PASSWORD"];
  if (!pwd) throw new Error("Careers admin is not configured");
  return pwd;
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

async function hmac(payload: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(`careers-admin:${adminPassword()}`),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function createAdminToken(password: string): Promise<string | null> {
  if (!timingSafeEqual(password, adminPassword())) return null;
  const exp = String(Date.now() + TOKEN_TTL_MS);
  return `${exp}.${await hmac(exp)}`;
}

export async function requireAdmin(token: string): Promise<void> {
  const [exp, sig] = token.split(".");
  if (!exp || !sig) throw new Error("Unauthorized");
  if (Number(exp) < Date.now()) throw new Error("Session expired");
  if (!timingSafeEqual(sig, await hmac(exp))) throw new Error("Unauthorized");
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

export async function adminListOpenings(): Promise<Opening[]> {
  const db = await admin();
  const { data, error } = await db
    .from("job_openings")
    .select(OPENING_COLUMNS)
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []) as Opening[];
}

export async function adminSaveOpening(input: OpeningInput) {
  const db = await admin();
  const row = {
    title: input.title,
    department: input.department || "General",
    location: input.location || "Kolkata",
    employment_type: input.employment_type || "Full-time",
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
    const { error } = await db.from("job_openings").update(row).eq("id", input.id);
    if (error) throw new Error(error.message);
    return { id: input.id };
  }
  const { data, error } = await db
    .from("job_openings")
    .insert({ ...row, slug: `${slugify(input.title)}-${Math.random().toString(36).slice(2, 6)}` })
    .select("id")
    .single();
  if (error) throw new Error(error.message);
  return { id: data.id };
}

export async function adminDeleteOpening(id: string) {
  const db = await admin();
  const { error } = await db.from("job_openings").delete().eq("id", id);
  if (error) throw new Error(error.message);
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
  created_at: string;
};

export async function adminListApplications(): Promise<Application[]> {
  const db = await admin();
  const { data, error } = await db
    .from("job_applications")
    .select(
      "id, job_id, job_title, full_name, email, phone, city, current_role_title, experience_years, cover_note, link_url, resume_path, status, created_at",
    )
    .order("created_at", { ascending: false })
    .limit(500);
  if (error) throw new Error(error.message);
  return (data ?? []) as Application[];
}

export async function adminSetApplicationStatus(id: string, status: string) {
  const db = await admin();
  const { error } = await db.from("job_applications").update({ status }).eq("id", id);
  if (error) throw new Error(error.message);
}

export async function adminResumeUrl(path: string): Promise<string> {
  const db = await admin();
  const { data, error } = await db.storage.from("job-resumes").createSignedUrl(path, 300);
  if (error || !data) throw new Error(error?.message ?? "Could not create link");
  return data.signedUrl;
}
