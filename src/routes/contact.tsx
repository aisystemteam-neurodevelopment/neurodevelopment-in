import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { CheckCircle2, MessageCircle } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Book an Appointment — Institute of NeuroDevelopment" },
      { name: "description", content: "Book a consultation with the IND team. Online or in-person, in Kolkata." },
      { property: "og:title", content: "Book an Appointment — IND" },
      { property: "og:description", content: "Tell us about your child. Our team will reach out personally." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Book an Appointment — IND" },
      { name: "twitter:description", content: "Tell us about your child. Our team will reach out personally." },
    ],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(1, "Please share your name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(200),
  phone: z.string().trim().min(5, "Phone is required to confirm the booking").max(40),
  childAge: z.string().trim().max(40).optional(),
  concern: z.string().trim().max(120).optional(),
  concernOther: z.string().trim().max(120).optional(),
  timeFrame: z.string().trim().max(60).optional(),
  mode: z.enum(["online", "in-person", "either"]),
  message: z.string().trim().max(2000).optional(),
});

const WHATSAPP_NUMBER = "919433308880"; // +91 94333 08880

function buildWhatsAppLink(d: z.infer<typeof schema>) {
  const lines = [
    "Hi IND, I'd like to book an appointment.",
    `Name: ${d.name}`,
    `Email: ${d.email}`,
    `Phone: ${d.phone}`,
    d.childAge ? `Child age: ${d.childAge}` : "",
    d.concern ? `Concern: ${d.concern}` : "",
    d.concernOther ? `Other concern: ${d.concernOther}` : "",
    d.timeFrame ? `Time frame: ${d.timeFrame}` : "",
    `Mode: ${d.mode}`,
    d.message ? `Notes: ${d.message}` : "",
  ].filter(Boolean);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
}

function ContactPage() {
  const [busy, setBusy] = useState(false);
  const [confirmed, setConfirmed] = useState<{ name: string; whatsapp: string } | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const raw = Object.fromEntries(fd) as Record<string, string>;
    const parsed = schema.safeParse({ ...raw, mode: raw.mode || "either" });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check the form");
      return;
    }
    setBusy(true);
    try {
      const res = await fetch("/api/public/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (!res.ok) {
        toast.error("Could not submit right now. Please call or WhatsApp +91 94333 08880.");
        return;
      }
      toast.success("Booking received. Our team will reach out shortly.");
      setConfirmed({ name: parsed.data.name, whatsapp: buildWhatsAppLink(parsed.data) });
      form.reset();
    } catch {
      toast.error("Network issue. Please call or WhatsApp +91 94333 08880.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <SiteLayout>
      <section className="mx-auto max-w-3xl px-5 pt-16 pb-6">
        <h1 className="font-display text-5xl">Book an appointment</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Share a little about your child and how to reach you. Someone from our team will
          confirm a time within one working day.
        </p>
      </section>

      <section className="mx-auto grid max-w-3xl gap-3 px-5 pb-6 sm:grid-cols-3">
        <a href="tel:+919433308880" className="rounded-2xl border border-border bg-card p-4 text-sm hover:bg-muted">
          <div className="text-xs text-muted-foreground">Call</div>
          <div className="mt-1 font-medium">+91 94333 08880</div>
        </a>
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-2xl border border-border bg-card p-4 text-sm hover:bg-muted"
        >
          <div className="text-xs text-muted-foreground">WhatsApp</div>
          <div className="mt-1 font-medium">+91 94333 08880</div>
        </a>
        <a href="mailto:instituteofneurodevelopment@gmail.com" className="rounded-2xl border border-border bg-card p-4 text-sm hover:bg-muted">
          <div className="text-xs text-muted-foreground">Email</div>
          <div className="mt-1 font-medium break-all">instituteofneurodevelopment@gmail.com</div>
        </a>
      </section>

      <section className="mx-auto max-w-2xl px-5 pb-20">
        {confirmed ? (
          <div className="rounded-3xl border border-border bg-card p-8 text-center">
            <CheckCircle2 className="mx-auto h-12 w-12 text-primary" />
            <h2 className="mt-4 font-display text-3xl">Thank you, {confirmed.name}.</h2>
            <p className="mx-auto mt-3 max-w-md text-muted-foreground">
              We&apos;ve received your request. Our team will call or message you within one
              working day to confirm a time.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg" className="rounded-full px-6">
                <a href={confirmed.whatsapp} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Send the same on WhatsApp
                </a>
              </Button>
              <Button variant="outline" size="lg" className="rounded-full px-6" onClick={() => setConfirmed(null)}>
                Submit another request
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-4 rounded-3xl border border-border bg-card p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Your name *</Label>
                <Input id="name" name="name" required maxLength={100} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone / WhatsApp *</Label>
                <Input id="phone" name="phone" required maxLength={40} placeholder="+91 …" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input id="email" name="email" type="email" required maxLength={200} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="childAge">Child&apos;s age</Label>
                <Input id="childAge" name="childAge" placeholder="e.g. 4 years" maxLength={40} />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="concern">Primary concern</Label>
                <Input
                  id="concern"
                  name="concern"
                  placeholder="e.g. Speech delay, hyperactivity, school refusal…"
                  maxLength={120}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="preferredDate">Preferred date</Label>
                <Input id="preferredDate" name="preferredDate" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="preferredTime">Preferred time</Label>
                <Input id="preferredTime" name="preferredTime" type="time" />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="mode">Consultation mode</Label>
                <Select name="mode" defaultValue="either">
                  <SelectTrigger id="mode"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="online">Online</SelectItem>
                    <SelectItem value="in-person">In-person (Kolkata)</SelectItem>
                    <SelectItem value="either">Either works</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Anything else we should know?</Label>
              <Textarea id="message" name="message" rows={4} maxLength={2000} />
            </div>
            <Button disabled={busy} type="submit" size="lg" className="w-full rounded-full">
              {busy ? "Sending…" : "Book appointment"}
            </Button>
            <p className="text-center text-xs text-muted-foreground">
              By submitting, you agree to be contacted by our team. See our{" "}
              <a href="/privacy" className="underline">Privacy Policy</a>.
            </p>
          </form>
        )}
      </section>
    </SiteLayout>
  );
}
