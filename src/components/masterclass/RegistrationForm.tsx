import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircle2, MessageCircle, Sparkles } from "lucide-react";

export const WHATSAPP_LINK = "https://wa.me/message/PZQJYUEGGXGZE1";

const CONCERNS = [
  "Autism / ASD",
  "ADHD / Attention",
  "Speech & language delay",
  "Global developmental delay",
  "Learning difficulty",
  "Behaviour & meltdowns",
  "Not yet diagnosed",
  "Other",
];

export function RegistrationForm() {
  const [form, setForm] = useState({
    parentName: "",
    childName: "",
    childAge: "",
    phone: "",
    email: "",
    city: "",
    concern: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError(null);
    try {
      const res = await fetch("/api/public/masterclass", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error ?? "Could not save. Please try again.");
      }
      setStatus("ok");
    } catch (err) {
      setStatus("err");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  return (
    <div
      id="register"
      className="mx-auto mt-10 max-w-xl scroll-mt-24 rounded-3xl border border-border bg-card p-6 text-left md:p-8"
    >
      {status === "ok" ? (
        <div className="py-6 text-center">
          <CheckCircle2 className="mx-auto h-10 w-10 text-primary" />
          <h3 className="mt-3 font-display text-2xl">আপনার আসন সংরক্ষিত হয়েছে</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            আমরা WhatsApp-এ আপনাকে Zoom লিঙ্ক ও রিমাইন্ডার পাঠিয়ে দেব। নিশ্চিত করতে
            নিচের বোতামে ক্লিক করে আমাদের WhatsApp-এ একটি বার্তা পাঠান।
          </p>
          <Button asChild size="lg" className="mt-5 rounded-full">
            <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer">
              <MessageCircle className="mr-1 h-4 w-4" /> WhatsApp-এ নিশ্চিত করুন
            </a>
          </Button>
        </div>
      ) : (
        <form onSubmit={submit} className="space-y-4">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            <Sparkles className="h-3 w-3" /> Reserve your seat
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <Label htmlFor="mc-parent">Parent name *</Label>
              <Input
                id="mc-parent"
                required
                maxLength={100}
                value={form.parentName}
                onChange={(e) => setForm({ ...form, parentName: e.target.value })}
                placeholder="আপনার নাম"
              />
            </div>
            <div>
              <Label htmlFor="mc-child">Child name</Label>
              <Input
                id="mc-child"
                maxLength={100}
                value={form.childName}
                onChange={(e) => setForm({ ...form, childName: e.target.value })}
                placeholder="সন্তানের নাম"
              />
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <Label htmlFor="mc-age">Child age</Label>
              <Input
                id="mc-age"
                maxLength={40}
                value={form.childAge}
                onChange={(e) => setForm({ ...form, childAge: e.target.value })}
                placeholder="e.g. 4 yrs"
              />
            </div>
            <div>
              <Label htmlFor="mc-city">City</Label>
              <Input
                id="mc-city"
                maxLength={120}
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                placeholder="Kolkata / Dhaka / ..."
              />
            </div>
          </div>
          <div>
            <Label htmlFor="mc-phone">WhatsApp number *</Label>
            <Input
              id="mc-phone"
              required
              maxLength={40}
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="+91 ..."
            />
          </div>
          <div>
            <Label htmlFor="mc-email">Email</Label>
            <Input
              id="mc-email"
              type="email"
              maxLength={200}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="you@example.com"
            />
          </div>
          <div>
            <Label htmlFor="mc-concern">Primary concern</Label>
            <Select
              value={form.concern}
              onValueChange={(value) => setForm({ ...form, concern: value })}
            >
              <SelectTrigger id="mc-concern">
                <SelectValue placeholder="Select one" />
              </SelectTrigger>
              <SelectContent>
                {CONCERNS.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button
            type="submit"
            size="lg"
            className="w-full rounded-full"
            disabled={status === "loading"}
          >
            {status === "loading" ? "সংরক্ষণ হচ্ছে..." : "আমার আসনটি সংরক্ষণ করুন"}
          </Button>
          <Button asChild variant="outline" size="lg" className="w-full rounded-full">
            <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer">
              <MessageCircle className="mr-1 h-4 w-4" /> WhatsApp-এ প্রশ্ন করুন
            </a>
          </Button>
          <p className="text-xs leading-relaxed text-muted-foreground">
            আমরা শুধুমাত্র Masterclass সংক্রান্ত তথ্য পাঠাই। কোনো spam নয়।
          </p>
        </form>
      )}
    </div>
  );
}

export function CTAButtons({ label = "আমার আসনটি সংরক্ষণ করুন" }: { label?: string }) {
  return (
    <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
      <Button asChild size="lg" className="rounded-full px-7">
        <a href="#register">{label}</a>
      </Button>
      <Button asChild size="lg" variant="outline" className="rounded-full px-7">
        <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer">
          <MessageCircle className="mr-1 h-4 w-4" /> WhatsApp
        </a>
      </Button>
    </div>
  );
}