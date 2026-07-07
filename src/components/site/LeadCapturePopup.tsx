import { useEffect, useMemo, useState } from "react";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import type { Country } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { supabase } from "@/integrations/supabase/client";

const STORAGE_KEY = "ind_lead_captured";

type Form = {
  child_name: string;
  parent_name: string;
  child_age: string;
  area: string;
  district: string;
  state: string;
  country: string;
  phone: string;
};

const empty: Form = {
  child_name: "",
  parent_name: "",
  child_age: "",
  area: "",
  district: "",
  state: "",
  country: "",
  phone: "",
};

export function LeadCapturePopup() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<Form>(empty);
  const [countryCode, setCountryCode] = useState<Country>("IN");
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Show after 5s if not previously captured
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (localStorage.getItem(STORAGE_KEY)) return;
    const t = setTimeout(() => setOpen(true), 5000);
    return () => clearTimeout(t);
  }, []);

  // Body scroll lock + block ESC while open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        e.stopPropagation();
      }
    };
    window.addEventListener("keydown", onKey, true);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey, true);
    };
  }, [open]);

  // IP geolocation pre-fill on open
  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("https://ipwho.is/");
        const data = await res.json();
        if (cancelled || !data || data.success === false) return;
        setForm((f) => ({
          ...f,
          country: f.country || data.country || "",
          state: f.state || data.region || "",
          district: f.district || data.city || "",
        }));
        if (data.country_code) setCountryCode(data.country_code as Country);
      } catch {
        // silent — user fills manually
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [open]);

  const set = <K extends keyof Form>(k: K, v: Form[K]) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const validate = (): boolean => {
    const e: Partial<Record<keyof Form, string>> = {};
    if (!form.child_name.trim()) e.child_name = "Required";
    if (!form.parent_name.trim()) e.parent_name = "Required";
    if (!form.child_age.trim()) e.child_age = "Required";
    if (!form.area.trim()) e.area = "Required";
    if (!form.district.trim()) e.district = "Required";
    if (!form.state.trim()) e.state = "Required";
    if (!form.country.trim()) e.country = "Required";
    if (!form.phone.trim()) {
      e.phone = "Required";
    } else if (!isValidPhoneNumber(form.phone, countryCode)) {
      e.phone = "Enter a valid phone number for the selected country";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  async function onSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    setSubmitError(null);
    if (!validate()) return;
    setSubmitting(true);
    try {
      const { error } = await supabase.from("leads").insert({
        source: "website_popup",
        child_name: form.child_name.trim(),
        parent_name: form.parent_name.trim(),
        child_age: form.child_age.trim(),
        area: form.area.trim(),
        district: form.district.trim(),
        state: form.state.trim(),
        country: form.country.trim(),
        phone: form.phone,
        contact_name: form.parent_name.trim(),
        contact_phone: form.phone,
      });
      if (error) throw error;
      localStorage.setItem(STORAGE_KEY, "1");
      setOpen(false);
    } catch (err) {
      console.error("Popup lead insert failed", err);
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const inputCls = useMemo(
    () =>
      "w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40",
    [],
  );

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lead-popup-title"
      onClick={(e) => e.stopPropagation()}
    >
      <div
        className="w-full max-w-[440px] max-h-[92vh] overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2
          id="lead-popup-title"
          className="font-display text-2xl text-primary"
        >
          Start your child's progress journey
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Share a few details and we'll show you the way forward.
        </p>

        <form onSubmit={onSubmit} className="mt-5 space-y-3">
          <Field label="Child's name" error={errors.child_name}>
            <input
              className={inputCls}
              value={form.child_name}
              onChange={(e) => set("child_name", e.target.value)}
              maxLength={100}
            />
          </Field>
          <Field label="Parent's name" error={errors.parent_name}>
            <input
              className={inputCls}
              value={form.parent_name}
              onChange={(e) => set("parent_name", e.target.value)}
              maxLength={100}
            />
          </Field>
          <Field label="Child's age" error={errors.child_age}>
            <input
              className={inputCls}
              value={form.child_age}
              onChange={(e) => set("child_age", e.target.value)}
              maxLength={20}
              placeholder="e.g. 4 yrs"
            />
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Area" error={errors.area}>
              <input
                className={inputCls}
                value={form.area}
                onChange={(e) => set("area", e.target.value)}
                maxLength={120}
              />
            </Field>
            <Field label="District" error={errors.district}>
              <input
                className={inputCls}
                value={form.district}
                onChange={(e) => set("district", e.target.value)}
                maxLength={120}
              />
            </Field>
            <Field label="State" error={errors.state}>
              <input
                className={inputCls}
                value={form.state}
                onChange={(e) => set("state", e.target.value)}
                maxLength={120}
              />
            </Field>
            <Field label="Country" error={errors.country}>
              <input
                className={inputCls}
                value={form.country}
                onChange={(e) => set("country", e.target.value)}
                maxLength={120}
              />
            </Field>
          </div>

          <Field label="Contact number" error={errors.phone}>
            <PhoneInput
              international
              countryCallingCodeEditable={false}
              defaultCountry={countryCode}
              country={countryCode}
              value={form.phone}
              onChange={(v) => set("phone", (v as string) || "")}
              onCountryChange={(c) => c && setCountryCode(c)}
              className="lead-phone-input flex gap-2 rounded-md border border-input bg-background px-2 py-2 text-sm"
            />
          </Field>

          {submitError && (
            <p className="text-sm text-destructive">{submitError}</p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="mt-2 w-full rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition hover:bg-primary/90 disabled:opacity-60"
          >
            {submitting ? "Please wait…" : "Show me the way forward"}
          </button>
        </form>
      </div>
      <style>{`
        .lead-phone-input .PhoneInputInput {
          border: none;
          outline: none;
          background: transparent;
          flex: 1;
          min-width: 0;
          font-size: 0.875rem;
        }
      `}</style>
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-foreground">
        {label} <span className="text-destructive">*</span>
      </span>
      {children}
      {error && <span className="mt-1 block text-xs text-destructive">{error}</span>}
    </label>
  );
}