import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useMemo, useState } from "react";
import { useEffect } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { CheckCircle2, MessageCircle } from "lucide-react";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import type { Country } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { Country as CSCCountry, State as CSCState } from "country-state-city";
import {
  cacheKey,
  clearCache,
  getFromCache,
  validatePin,
  writeCache,
  detectCountryFromPin,
  type CachedPin,
} from "@/lib/pin-lookup";

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
  name: z.string().trim().min(1, "Parent name is required").max(100),
  childName: z.string().trim().min(1, "Child name is required").max(100),
  email: z.string().trim().email("Please enter a valid email").max(200),
  phone: z.string().trim().min(5, "Phone is required to confirm the booking").max(40),
  childAge: z.string().trim().min(1, "Child's age is required").max(40),
  district: z.string().trim().max(120).optional(),
  pincode: z.string().trim().max(20).optional(),
  state: z.string().trim().max(120).optional(),
  country: z.string().trim().min(1, "Country is required").max(120),
  countryCode: z.string().trim().length(2).optional(),
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
    `Parent: ${d.name}`,
    `Child: ${d.childName}`,
    `Email: ${d.email}`,
    `Phone: ${d.phone}`,
    d.childAge ? `Child age: ${d.childAge}` : "",
    `Location: ${[d.district, d.state, d.country, d.pincode && `PIN ${d.pincode}`].filter(Boolean).join(", ")}`,
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
  const [concernValue, setConcernValue] = useState<string>("");
  const [countryCode, setCountryCode] = useState<Country>("IN");
  const [phone, setPhone] = useState<string>("");
  const [countryIso, setCountryIso] = useState<string>("IN");
  const [stateName, setStateName] = useState<string>("");
  const [pincode, setPincode] = useState<string>("");
  const [district, setDistrict] = useState<string>("");
  const [pinLookup, setPinLookup] = useState<"idle" | "loading" | "done" | "error">("idle");

  const allCountries = useMemo(() => CSCCountry.getAllCountries(), []);
  const statesForCountry = useMemo(
    () => (countryIso ? CSCState.getStatesOfCountry(countryIso) : []),
    [countryIso],
  );
  const countryName = useMemo(
    () => allCountries.find((c) => c.isoCode === countryIso)?.name || "",
    [allCountries, countryIso],
  );

  // Auto-fetch address from PIN / ZIP — mirrors the popup form behaviour.
  useEffect(() => {
    const pin = pincode.trim();
    if (!pin || pin.length < 3) {
      setPinLookup("idle");
      return;
    }
    let effectiveCC = countryIso || "IN";
    const check = validatePin(pin, effectiveCC);
    if (!check.ok) {
      const detected = detectCountryFromPin(pin);
      if (!detected) {
        setPinLookup("idle");
        return;
      }
      effectiveCC = detected;
    }
    const key = cacheKey(effectiveCC, pin);
    const cached = getFromCache(key) || getFromCache(`*:${pin}`);
    if (cached) {
      setDistrict((d) => d || cached.district);
      if (cached.state) setStateName(cached.state);
      if (cached.countryCode) {
        setCountryIso(cached.countryCode);
        setCountryCode(cached.countryCode as Country);
      }
      setPinLookup("done");
      return;
    }
    let cancelled = false;
    const controller = new AbortController();
    const t = setTimeout(async () => {
      setPinLookup("loading");
      try {
        if (effectiveCC === "IN" && /^\d{6}$/.test(pin)) {
          const res = await fetch(`https://api.postalpincode.in/pincode/${pin}`, {
            signal: controller.signal,
          });
          const data = await res.json();
          const office = data?.[0]?.PostOffice?.[0];
          if (!cancelled && office) {
            const payload: CachedPin = {
              area: office.Name || office.Block || "",
              district: office.District || "",
              state: office.State || "",
              country: office.Country || "India",
              countryCode: "IN",
            };
            writeCache(cacheKey("IN", pin), payload);
            setDistrict((d) => d || payload.district);
            if (payload.state) setStateName(payload.state);
            setCountryIso("IN");
            setCountryCode("IN");
            setPinLookup("done");
            return;
          }
        }
        const candidates = Array.from(
          new Set(
            [effectiveCC, countryIso, detectCountryFromPin(pin), "US"]
              .filter(Boolean)
              .map((c) => String(c).toLowerCase()),
          ),
        );
        let filled = false;
        for (const cc of candidates) {
          try {
            const res = await fetch(
              `https://api.zippopotam.us/${cc}/${encodeURIComponent(pin)}`,
              { signal: controller.signal },
            );
            if (!res.ok) continue;
            const data = await res.json();
            const place = data?.places?.[0];
            if (cancelled || !place) continue;
            const payload: CachedPin = {
              area: place["place name"] || "",
              district: place["place name"] || "",
              state: place["state"] || "",
              country: data.country || "",
              countryCode: cc.toUpperCase(),
            };
            writeCache(cacheKey(cc.toUpperCase(), pin), payload);
            setDistrict((d) => d || payload.district);
            if (payload.state) setStateName(payload.state);
            setCountryIso(cc.toUpperCase());
            setCountryCode(cc.toUpperCase() as Country);
            setPinLookup("done");
            filled = true;
            break;
          } catch {
            /* try next */
          }
        }
        if (!filled && !cancelled) setPinLookup("error");
      } catch {
        if (!cancelled) setPinLookup("error");
      }
    }, 450);
    return () => {
      cancelled = true;
      controller.abort();
      clearTimeout(t);
    };
  }, [pincode, countryIso]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const raw = Object.fromEntries(fd) as Record<string, string>;
    const finalConcern =
      raw.concern === "other" ? (raw.concernOther || "Other") : (raw.concern || "");
    // Strict phone validation per selected country (enforces exact length)
    if (!phone || !isValidPhoneNumber(phone, countryCode)) {
      toast.error(
        "Enter a valid phone number for the selected country code (e.g. +91 followed by 10 digits).",
      );
      return;
    }
    const parsed = schema.safeParse({
      ...raw,
      concern: finalConcern,
      phone,
      country: countryName,
      state: stateName,
      district,
      pincode,
      countryCode: countryIso || undefined,
      mode: raw.mode || "either",
    });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check the form");
      return;
    }
    setBusy(true);
    try {
      if (pincode.trim()) {
        const check = validatePin(pincode.trim(), countryIso || undefined);
        if (!check.ok) {
          toast.error(
            `Invalid PIN / ZIP for the selected country (expected ${check.hint}).`,
          );
          setBusy(false);
          return;
        }
      }
      const res = await fetch("/api/public/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (!res.ok) {
        let serverMsg = "";
        try {
          const body = await res.json();
          serverMsg = body?.issues?.[0]?.message || body?.error || "";
        } catch {
          /* ignore */
        }
        toast.error(
          serverMsg ||
            "Could not submit right now. Please call or WhatsApp +91 94333 08880.",
        );
        return;
      }
      toast.success("Booking received. Our team will reach out shortly.");
      setConfirmed({ name: parsed.data.name, whatsapp: buildWhatsAppLink(parsed.data) });
      form.reset();
      setConcernValue("");
      setPhone("");
      setStateName("");
      setPincode("");
      setDistrict("");
      setPinLookup("idle");
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
              We've received your request. Our team will call or message you within one
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
                <Label htmlFor="name">Parent name *</Label>
                <Input id="name" name="name" required maxLength={100} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="childName">Child name *</Label>
                <Input id="childName" name="childName" required maxLength={100} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input id="email" name="email" type="email" required maxLength={200} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="childAge">Child's age *</Label>
                <Input id="childAge" name="childAge" required placeholder="e.g. 4 years" maxLength={40} />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="phone">Contact number *</Label>
                <PhoneInput
                  international
                  countryCallingCodeEditable={false}
                  defaultCountry={countryCode}
                  country={countryCode}
                  value={phone}
                  onChange={(v) => setPhone((v as string) || "")}
                  onCountryChange={(c) => c && setCountryCode(c)}
                  className="booking-phone-input flex gap-2 rounded-md border border-input bg-background px-2 py-2 text-sm focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/40"
                />
                <p className="text-xs text-muted-foreground">
                  Digits must match the selected country code (e.g. +91 requires exactly 10 digits).
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="pincode">
                  PIN / ZIP code{" "}
                  <span className="text-xs text-muted-foreground">
                    {pinLookup === "loading"
                      ? "(looking up…)"
                      : pinLookup === "error"
                      ? "(not found — fill manually)"
                      : "(auto-fills address)"}
                  </span>
                </Label>
                <Input
                  id="pincode"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  maxLength={12}
                  placeholder="e.g. 700005 or 90210"
                  inputMode="text"
                  autoComplete="postal-code"
                />
                <button
                  type="button"
                  onClick={() => {
                    clearCache();
                    setPinLookup("idle");
                  }}
                  className="text-[11px] text-muted-foreground underline hover:text-foreground"
                >
                  Clear address cache
                </button>
              </div>
              <div className="space-y-2">
                <Label htmlFor="district">District (optional)</Label>
                <Input
                  id="district"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  maxLength={120}
                  placeholder="e.g. Kolkata"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country *</Label>
                <select
                  id="country"
                  value={countryIso}
                  onChange={(e) => {
                    setCountryIso(e.target.value);
                    setStateName("");
                    if (e.target.value) setCountryCode(e.target.value as Country);
                  }}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="">Select country</option>
                  {allCountries.map((c) => (
                    <option key={c.isoCode} value={c.isoCode}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="state">State (optional)</Label>
                {statesForCountry.length > 0 ? (
                  <select
                    id="state"
                    value={stateName}
                    onChange={(e) => setStateName(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="">Select state</option>
                    {statesForCountry.map((s) => (
                      <option key={s.isoCode} value={s.name}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                ) : (
                  <Input
                    id="state"
                    value={stateName}
                    onChange={(e) => setStateName(e.target.value)}
                    maxLength={120}
                  />
                )}
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="concern">Primary concern</Label>
                <Select name="concern" value={concernValue} onValueChange={setConcernValue}>
                  <SelectTrigger id="concern"><SelectValue placeholder="Select primary concern" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Speech & language delay">Speech & language delay</SelectItem>
                    <SelectItem value="Autism / ASD">Autism / ASD</SelectItem>
                    <SelectItem value="ADHD / Hyperactivity">ADHD / Hyperactivity</SelectItem>
                    <SelectItem value="Learning difficulty">Learning difficulty</SelectItem>
                    <SelectItem value="Behavioural issues">Behavioural issues</SelectItem>
                    <SelectItem value="Developmental delay">Developmental delay</SelectItem>
                    <SelectItem value="School refusal / anxiety">School refusal / anxiety</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {concernValue === "other" && (
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="concernOther">Please describe the concern</Label>
                  <Input
                    id="concernOther"
                    name="concernOther"
                    placeholder="Tell us briefly…"
                    maxLength={120}
                  />
                </div>
              )}
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="timeFrame">How long has this been a concern?</Label>
                <Select name="timeFrame" defaultValue="">
                  <SelectTrigger id="timeFrame"><SelectValue placeholder="Select a time frame" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Less than 1 month">Less than 1 month</SelectItem>
                    <SelectItem value="1–3 months">1–3 months</SelectItem>
                    <SelectItem value="3–6 months">3–6 months</SelectItem>
                    <SelectItem value="6–12 months">6–12 months</SelectItem>
                    <SelectItem value="More than 1 year">More than 1 year</SelectItem>
                    <SelectItem value="Since birth / always">Since birth / always</SelectItem>
                  </SelectContent>
                </Select>
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
            <style>{`
              .booking-phone-input .PhoneInputInput {
                border: none;
                outline: none;
                background: transparent;
                flex: 1;
                min-width: 0;
                font-size: 0.875rem;
                color: inherit;
              }
              .booking-phone-input .PhoneInputCountrySelect {
                background: transparent;
                color: inherit;
              }
              .booking-phone-input .PhoneInputCountrySelect option {
                background: var(--card);
                color: var(--card-foreground);
              }
            `}</style>
          </form>
        )}
      </section>

      <section className="mx-auto max-w-5xl px-5 pb-20">
        <div className="mb-4 text-center">
          <h2 className="font-display text-3xl">Visit us</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            26, Raja Nabakrishna Street, opposite Sobhabazar Rajbari, Kolkata 700005
          </p>
        </div>
        <div className="overflow-hidden rounded-3xl border border-border">
          <iframe
            title="Institute of NeuroDevelopment — Google Maps location"
            src="https://www.google.com/maps?q=Institute+of+NeuroDevelopment,+Kolkata&ll=22.5964906,88.366761&z=19&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-[360px] w-full"
          />
        </div>
        <div className="mt-3 text-center">
          <a
            href="https://www.google.com/maps/place/Institute+of+NeuroDevelopment/@22.5964906,88.366761,19z/data=!4m6!3m5!1s0x3a02770058f0c535:0x278c6b12916e5dd2!8m2!3d22.5964906!4d88.366761!16s%2Fg%2F11xgw0sfc1"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary underline"
          >
            Open in Google Maps
          </a>
        </div>
      </section>
    </SiteLayout>
  );
}
