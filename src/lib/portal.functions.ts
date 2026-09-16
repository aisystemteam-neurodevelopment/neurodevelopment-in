import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const profileSchema = z.object({
  fullName: z.string().trim().min(2).max(120),
  phone: z.string().trim().min(7).max(24),
  city: z.string().trim().max(120),
});

export const initializeParentPortal = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.getUserById(context.userId);
    if (authError || !authData.user?.email || !authData.user.email_confirmed_at) {
      throw new Error("A verified email address is required.");
    }

    const email = authData.user.email.trim().toLowerCase();
    const metadata = authData.user.user_metadata ?? {};
    const fullName = typeof metadata.full_name === "string" ? metadata.full_name.trim() : "";
    const phone = typeof metadata.phone === "string" ? metadata.phone.trim() : "";
    const city = typeof metadata.city === "string" ? metadata.city.trim() : "";

    await supabaseAdmin.from("profiles").upsert(
      {
        id: context.userId,
        full_name: fullName || email,
        phone: phone || null,
        city: city || null,
      },
      { onConflict: "id", ignoreDuplicates: true },
    );

    const { data: matchedLeads, error: matchError } = await supabaseAdmin
      .from("leads")
      .select("id, child_id")
      .is("parent_id", null)
      .ilike("contact_email", email);
    if (matchError) throw matchError;

    let defaultChildId: string | null = null;
    const { data: existingChild } = await supabaseAdmin
      .from("children")
      .select("id")
      .eq("parent_id", context.userId)
      .order("created_at", { ascending: true })
      .limit(1)
      .maybeSingle();
    defaultChildId = existingChild?.id ?? null;

    if (matchedLeads && matchedLeads.length > 0) {
      for (const lead of matchedLeads) {
        const { error } = await supabaseAdmin
          .from("leads")
          .update({ parent_id: context.userId, child_id: lead.child_id ?? defaultChildId })
          .eq("id", lead.id)
          .is("parent_id", null);
        if (error) throw error;
      }
    } else {
      const { error } = await supabaseAdmin.from("leads").insert({
        parent_id: context.userId,
        child_id: defaultChildId,
        contact_name: fullName || email,
        contact_email: email,
        contact_phone: phone || null,
        parent_name: fullName || email,
        phone: phone || null,
        source: "parent_registration",
      });
      if (error) throw error;
    }

    return { ok: true };
  });

export const getParentPortal = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const results = await Promise.all([
      context.supabase.from("profiles").select("id, full_name, phone, city, avatar_url").eq("id", context.userId).single(),
      context.supabase.from("children").select("id, name, age_years, primary_concern, current_therapies, notes, created_at").eq("parent_id", context.userId).order("created_at"),
      context.supabase.from("leads").select("id, stage, source, created_at, contacted_at, counselling_scheduled_at, counselling_completed_at, payment_pending_at, first_paid_at, enrolled_at").eq("parent_id", context.userId).order("created_at", { ascending: false }),
      context.supabase.from("appointments").select("id, child_id, scheduled_at, mode, location, status, notes").eq("parent_id", context.userId).order("scheduled_at", { ascending: false }),
      context.supabase.from("modules").select("id, child_id, phase, week, title, description, status, completed_at").eq("parent_id", context.userId).order("week"),
      context.supabase.from("progress_reports").select("id, child_id, week_start, phase, summary, created_at").eq("parent_id", context.userId).order("week_start", { ascending: false }),
      context.supabase.from("payment_orders").select("id, program_name, plan_type, total_amount, currency, status, paid_at, created_at, schedule").eq("user_id", context.userId).order("created_at", { ascending: false }),
      context.supabase.from("lead_conversion_events").select("id, lead_id, event_type, source, occurred_at").eq("parent_id", context.userId).order("occurred_at"),
    ]);

    const failed = results.find((result) => result.error);
    if (failed?.error) throw failed.error;

    return {
      profile: results[0].data,
      children: results[1].data ?? [],
      leads: results[2].data ?? [],
      appointments: results[3].data ?? [],
      modules: results[4].data ?? [],
      reports: results[5].data ?? [],
      payments: results[6].data ?? [],
      conversionEvents: results[7].data ?? [],
    };
  });

export const updateParentProfile = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => profileSchema.parse(input))
  .handler(async ({ context, data }) => {
    const { error } = await context.supabase
      .from("profiles")
      .update({ full_name: data.fullName, phone: data.phone, city: data.city || null })
      .eq("id", context.userId);
    if (error) throw error;
    return { ok: true };
  });