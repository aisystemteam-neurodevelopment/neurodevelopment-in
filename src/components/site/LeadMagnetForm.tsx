import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Download, CheckCircle2, FileText } from "lucide-react";

export function LeadMagnetForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", childAge: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError(null);
    try {
      const res = await fetch("/api/public/lead-magnet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, magnet: "5-signs-stuck-intervention" }),
      });
      if (!res.ok) throw new Error("Could not save. Please try again.");
      setStatus("ok");
    } catch (err) {
      setStatus("err");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  return (
    <section className="bg-secondary/40 py-20">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-2 md:items-center">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
            <FileText className="h-3 w-3" /> Free guide · before you book anything
          </span>
          <h2 className="mt-4 font-display text-4xl">
            5 signs your child is stuck in fragmented intervention
          </h2>
          <p className="mt-3 max-w-xl text-muted-foreground">
            A short, honest PDF written by Dr. Diptanshu Das. Read it before you book
            another session, evaluation, or programme — including ours. If even two of
            the signs match your week, get in touch and we'll point you to the right
            next step.
          </p>
          <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
            {[
              "What 'progress' actually looks like vs. what feels like progress",
              "The single question to ask every professional working with your child",
              "How to spot a missing developmental sequence in one weekend",
            ].map((b) => (
              <li key={b} className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-3xl border border-border bg-card p-6 md:p-8">
          {status === "ok" ? (
            <div className="py-6 text-center">
              <CheckCircle2 className="mx-auto h-10 w-10 text-primary" />
              <h3 className="mt-3 font-display text-2xl">Check your inbox</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Your copy of <em>5 signs your child is stuck in fragmented intervention</em> is on
                its way to <span className="font-medium text-foreground">{form.email}</span>.
              </p>
              <a
                href="/lead-magnets/5-signs-stuck-intervention.pdf"
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
              >
                <Download className="h-4 w-4" /> Download the PDF now
              </a>
              <p className="mt-4 text-xs text-muted-foreground">
                We'll also send the masterclass invite when the next cohort opens.
                Unsubscribe any time.
              </p>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-4">
              <div className="text-xs uppercase tracking-widest text-muted-foreground">
                Free download
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <Label htmlFor="lm-name">Parent name</Label>
                  <Input
                    id="lm-name"
                    required
                    maxLength={100}
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <Label htmlFor="lm-age">Child age (optional)</Label>
                  <Input
                    id="lm-age"
                    maxLength={40}
                    value={form.childAge}
                    onChange={(e) => setForm({ ...form, childAge: e.target.value })}
                    placeholder="e.g. 4 yrs"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="lm-email">Email</Label>
                <Input
                  id="lm-email"
                  type="email"
                  required
                  maxLength={200}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <Label htmlFor="lm-phone">Phone / WhatsApp</Label>
                <Input
                  id="lm-phone"
                  required
                  maxLength={40}
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+91 ..."
                />
              </div>
              {error && <p className="text-sm text-destructive">{error}</p>}
              <Button
                type="submit"
                size="lg"
                className="w-full rounded-full"
                disabled={status === "loading"}
              >
                {status === "loading" ? "Sending..." : (
                  <>
                    <Download className="mr-1 h-4 w-4" /> Send me the free PDF
                  </>
                )}
              </Button>
              <p className="text-xs text-muted-foreground">
                No spam. We use this only to send the guide and occasional masterclass
                invites. We do not diagnose over email.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
