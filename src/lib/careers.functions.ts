import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const listOpenings = createServerFn({ method: "GET" }).handler(async () => {
  const { fetchPublishedOpenings } = await import("./careers.server");
  return await fetchPublishedOpenings();
});

export const careersLogin = createServerFn({ method: "POST" })
  .inputValidator((d: { password: string }) => z.object({ password: z.string().min(1).max(200) }).parse(d))
  .handler(async ({ data }) => {
    const { createAdminToken } = await import("./careers.server");
    const token = await createAdminToken(data.password);
    if (!token) return { ok: false as const };
    return { ok: true as const, token };
  });

export const careersAdminData = createServerFn({ method: "POST" })
  .inputValidator((d: { token: string }) => z.object({ token: z.string().min(1).max(300) }).parse(d))
  .handler(async ({ data }) => {
    const m = await import("./careers.server");
    await m.requireAdmin(data.token);
    const [openings, applications] = await Promise.all([m.adminListOpenings(), m.adminListApplications()]);
    return { openings, applications };
  });

const openingSchema = z.object({
  token: z.string().min(1).max(300),
  id: z.string().uuid().optional(),
  title: z.string().trim().min(2).max(160),
  department: z.string().trim().max(80).default(""),
  location: z.string().trim().max(120).default(""),
  employment_type: z.string().trim().max(60).default(""),
  experience: z.string().trim().max(60).default(""),
  summary: z.string().trim().max(400).default(""),
  description: z.string().trim().max(6000).default(""),
  responsibilities: z.array(z.string().trim().max(400)).max(20).default([]),
  requirements: z.array(z.string().trim().max(400)).max(20).default([]),
  salary_note: z.string().trim().max(200).default(""),
  apply_by: z.string().trim().max(20).default(""),
  published: z.boolean().default(true),
});

export const careersSaveOpening = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => openingSchema.parse(d))
  .handler(async ({ data }) => {
    const m = await import("./careers.server");
    await m.requireAdmin(data.token);
    const { token: _t, ...input } = data;
    return await m.adminSaveOpening(input);
  });

export const careersDeleteOpening = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => z.object({ token: z.string().min(1), id: z.string().uuid() }).parse(d))
  .handler(async ({ data }) => {
    const m = await import("./careers.server");
    await m.requireAdmin(data.token);
    await m.adminDeleteOpening(data.id);
    return { ok: true };
  });

export const careersSetApplicationStatus = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) =>
    z
      .object({
        token: z.string().min(1),
        id: z.string().uuid(),
        status: z.enum(["new", "shortlisted", "interviewing", "hired", "rejected"]),
      })
      .parse(d),
  )
  .handler(async ({ data }) => {
    const m = await import("./careers.server");
    await m.requireAdmin(data.token);
    await m.adminSetApplicationStatus(data.id, data.status);
    return { ok: true };
  });

export const careersResumeLink = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => z.object({ token: z.string().min(1), path: z.string().min(1).max(300) }).parse(d))
  .handler(async ({ data }) => {
    const m = await import("./careers.server");
    await m.requireAdmin(data.token);
    return { url: await m.adminResumeUrl(data.path) };
  });
