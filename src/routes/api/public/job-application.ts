import { createFileRoute } from "@tanstack/react-router";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { z } from "zod";

const MAX_FILE_BYTES = 8 * 1024 * 1024;

type SniffResult = { ext: "pdf" | "docx" | "doc"; mime: string };
function sniffResume(bytes: Uint8Array): SniffResult | null {
  if (
    bytes.length >= 5 &&
    bytes[0] === 0x25 && bytes[1] === 0x50 && bytes[2] === 0x44 && bytes[3] === 0x46 && bytes[4] === 0x2d
  ) {
    return { ext: "pdf", mime: "application/pdf" };
  }
  // DOCX (zip container)
  if (bytes.length >= 4 && bytes[0] === 0x50 && bytes[1] === 0x4b && (bytes[2] === 0x03 || bytes[2] === 0x05)) {
    return {
      ext: "docx",
      mime: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    };
  }
  // Legacy .doc (OLE compound file)
  if (
    bytes.length >= 8 &&
    bytes[0] === 0xd0 && bytes[1] === 0xcf && bytes[2] === 0x11 && bytes[3] === 0xe0 &&
    bytes[4] === 0xa1 && bytes[5] === 0xb1 && bytes[6] === 0x1a && bytes[7] === 0xe1
  ) {
    return { ext: "doc", mime: "application/msword" };
  }
  return null;
}

const fieldsSchema = z.object({
  jobId: z.string().uuid().optional(),
  jobTitle: z.string().trim().min(1).max(160),
  fullName: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().min(6).max(40),
  city: z.string().trim().min(2).max(120),
  currentRole: z.string().trim().min(2).max(160),
  experienceYears: z.string().trim().min(1).max(40),
  coverNote: z.string().trim().max(3000).optional().default(""),
  linkUrl: z.string().trim().max(300).optional().default(""),
});

export const Route = createFileRoute("/api/public/job-application")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const ct = request.headers.get("content-type") ?? "";
        if (!ct.includes("multipart/form-data")) {
          return Response.json({ error: "Expected multipart/form-data" }, { status: 400 });
        }
        let form: FormData;
        try {
          form = await request.formData();
        } catch {
          return Response.json({ error: "Invalid form data" }, { status: 400 });
        }

        const raw: Record<string, unknown> = {};
        for (const key of [
          "jobId", "jobTitle", "fullName", "email", "phone",
          "city", "currentRole", "experienceYears", "coverNote", "linkUrl",
        ]) {
          const v = form.get(key);
          if (v !== null && v !== "") raw[key] = v;
        }

        let parsed;
        try {
          parsed = fieldsSchema.parse(raw);
        } catch {
          return Response.json({ error: "Please check the required fields" }, { status: 400 });
        }
        if (parsed.linkUrl && !/^https?:\/\//i.test(parsed.linkUrl)) {
          return Response.json({ error: "Link must start with http:// or https://" }, { status: 400 });
        }

        const file = form.get("resume");
        if (!(file instanceof File) || file.size === 0) {
          return Response.json({ error: "Please attach your resume" }, { status: 400 });
        }
        if (file.size > MAX_FILE_BYTES) {
          return Response.json({ error: "Resume must be under 8 MB" }, { status: 400 });
        }
        const bytes = new Uint8Array(await file.arrayBuffer());
        const sniffed = sniffResume(bytes);
        if (!sniffed) {
          return Response.json({ error: "Only PDF, DOC or DOCX resumes are allowed" }, { status: 400 });
        }

        const day = new Date().toISOString().slice(0, 10);
        const resumePath = `${day}/${crypto.randomUUID()}.${sniffed.ext}`;
        const { error: upErr } = await supabaseAdmin.storage
          .from("job-resumes")
          .upload(resumePath, bytes, { contentType: sniffed.mime, upsert: false });
        if (upErr) {
          console.error("Resume upload failed", upErr);
          return Response.json({ error: "Could not upload resume" }, { status: 500 });
        }

        const { error } = await supabaseAdmin.from("job_applications").insert({
          job_id: parsed.jobId ?? null,
          job_title: parsed.jobTitle,
          full_name: parsed.fullName,
          email: parsed.email,
          phone: parsed.phone,
          city: parsed.city || null,
          current_role_title: parsed.currentRole || null,
          experience_years: parsed.experienceYears || null,
          cover_note: parsed.coverNote || null,
          link_url: parsed.linkUrl || null,
          resume_path: resumePath,
        });
        if (error) {
          console.error("Job application insert failed", error);
          return Response.json({ error: "Could not save your application" }, { status: 500 });
        }

        return Response.json({ ok: true });
      },
    },
  },
});
