import { useState } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

type FormState = {
  name: string;
  email: string;
  phone: string;
  programme: string;
  paymentDate: string;
  amount: string;
  transactionId: string;
  reason: string;
  details: string;
  recordingsAccessed: boolean;
};

const initial: FormState = {
  name: "",
  email: "",
  phone: "",
  programme: "",
  paymentDate: "",
  amount: "",
  transactionId: "",
  reason: "",
  details: "",
  recordingsAccessed: false,
};

export function RefundRequestForm() {
  const [form, setForm] = useState<FormState>(initial);
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");
    try {
      let attachmentPath: string | null = null;
      if (!file) throw new Error("Please attach your payment screenshot or receipt — it is required.");
      if (file.size > 8 * 1024 * 1024) throw new Error("Screenshot must be under 8 MB");
      const ext = file.name.split(".").pop()?.toLowerCase() || "png";
      const path = `${new Date().toISOString().slice(0, 10)}/${crypto.randomUUID()}.${ext}`;
      const { error: upErr } = await supabase.storage
        .from("refund-screenshots")
        .upload(path, file, { contentType: file.type, upsert: false });
      if (upErr) throw new Error("Could not upload screenshot: " + upErr.message);
      attachmentPath = path;
      const res = await fetch("/api/public/refund-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, attachmentPath }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Submission failed");
      }
      setStatus("success");
      setForm(initial);
      setFile(null);
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Submission failed");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-primary/30 bg-primary/5 p-6 text-left">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="mt-0.5 h-5 w-5 text-primary" />
          <div>
            <p className="font-display text-lg">Refund request received</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Our team will review your request and reply to your registered email within 3–5 business days.
              For urgent issues, write to{" "}
              <a href="mailto:instituteofneurodevelopment@gmail.com" className="underline">
                instituteofneurodevelopment@gmail.com
              </a>
              .
            </p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="mt-4 text-sm font-medium text-primary underline"
            >
              Submit another request
            </button>
          </div>
        </div>
      </div>
    );
  }

  const input =
    "mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30";
  const label = "block text-sm font-medium";

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-border bg-card/40 p-6 text-left">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-1">
          <label className={label} htmlFor="rf-name">Full name *</label>
          <input id="rf-name" required value={form.name} onChange={(e) => update("name", e.target.value)} className={input} />
        </div>
        <div className="sm:col-span-1">
          <label className={label} htmlFor="rf-phone">Registered phone *</label>
          <input id="rf-phone" required value={form.phone} onChange={(e) => update("phone", e.target.value)} className={input} />
        </div>
        <div className="sm:col-span-2">
          <label className={label} htmlFor="rf-email">Registered email *</label>
          <input id="rf-email" type="email" required value={form.email} onChange={(e) => update("email", e.target.value)} className={input} />
        </div>
        <div className="sm:col-span-2">
          <label className={label} htmlFor="rf-programme">Programme name *</label>
          <input id="rf-programme" required value={form.programme} onChange={(e) => update("programme", e.target.value)} className={input} placeholder="e.g. Breakthrough Blueprint, Counselling, Assessment…" />
        </div>
        <div>
          <label className={label} htmlFor="rf-date">Date of payment *</label>
          <input id="rf-date" type="date" required value={form.paymentDate} onChange={(e) => update("paymentDate", e.target.value)} className={input} />
        </div>
        <div>
          <label className={label} htmlFor="rf-amount">Amount paid *</label>
          <input id="rf-amount" required value={form.amount} onChange={(e) => update("amount", e.target.value)} className={input} placeholder="₹" />
        </div>
        <div className="sm:col-span-2">
          <label className={label} htmlFor="rf-txn">Transaction ID / UTR / Receipt no.</label>
          <input id="rf-txn" value={form.transactionId} onChange={(e) => update("transactionId", e.target.value)} className={input} />
        </div>
        <div className="sm:col-span-2">
          <label className={label} htmlFor="rf-reason">Reason for refund request *</label>
          <textarea id="rf-reason" required rows={3} value={form.reason} onChange={(e) => update("reason", e.target.value)} className={input} />
        </div>
        <div className="sm:col-span-2">
          <label className={label} htmlFor="rf-details">Any relevant issue or grievance details</label>
          <textarea id="rf-details" rows={3} value={form.details} onChange={(e) => update("details", e.target.value)} className={input} />
        </div>
        <div className="sm:col-span-2">
          <label className={label} htmlFor="rf-file">Payment screenshot / receipt * (PNG, JPG, PDF — max 8 MB)</label>
          <input
            id="rf-file"
            type="file"
            required
            accept="image/png,image/jpeg,image/webp,application/pdf"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            className="mt-1 block w-full text-sm text-muted-foreground file:mr-3 file:rounded-md file:border-0 file:bg-primary file:px-3 file:py-2 file:text-sm file:font-medium file:text-primary-foreground hover:file:bg-primary/90"
          />
          {file && <p className="mt-1 text-xs text-muted-foreground">Selected: {file.name} ({Math.round(file.size / 1024)} KB)</p>}
        </div>
        <div className="sm:col-span-2 flex items-start gap-2">
          <input
            id="rf-rec"
            type="checkbox"
            checked={form.recordingsAccessed}
            onChange={(e) => update("recordingsAccessed", e.target.checked)}
            className="mt-1"
          />
          <label htmlFor="rf-rec" className="text-sm text-muted-foreground">
            I confirm I have <strong>not</strong> viewed, downloaded, accessed or shared any Breakthrough Blueprint recording or replay. (Required per section 3.3 of the refund policy.)
          </label>
        </div>
      </div>

      {status === "error" && (
        <p className="mt-3 text-sm text-destructive">{errorMsg || "Something went wrong. Please try again."}</p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60"
      >
        {status === "submitting" ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
        Submit refund request
      </button>
    </form>
  );
}