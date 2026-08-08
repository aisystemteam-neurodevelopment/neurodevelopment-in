import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
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
import { useMemo, useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { ArrowLeft, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";

export const Route = createFileRoute("/quiz")({
  head: () => ({
    links: [{ rel: "canonical", href: "https://neurodevelopment.in/quiz" }],
    meta: [
      { title: "Find Your Child's Path — 60-second Qualifier Quiz | IND" },
      {
        name: "description",
        content:
          "Answer 5 quick questions and our team will recommend the right next step for your child — assessment, therapy, or a structured programme.",
      },
      { property: "og:title", content: "Find Your Child's Path — IND" },
      {
        property: "og:description",
        content:
          "A 60-second quiz that helps us understand your child and recommend the right starting point.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: QuizPage,
});

type Track = "assessment" | "therapy" | "programme" | "consult";

type Option = { label: string; weights: Partial<Record<Track, number>>; tag?: string };
type Question = { id: string; q: string; help?: string; options: Option[] };

const QUESTIONS: Question[] = [
  {
    id: "concern",
    q: "What's your primary concern right now?",
    options: [
      { label: "Speech or language delay", weights: { assessment: 2, therapy: 3 }, tag: "Speech & language" },
      { label: "Autism / ASD traits", weights: { assessment: 3, programme: 3 }, tag: "Autism / ASD" },
      { label: "ADHD / hyperactivity / focus", weights: { assessment: 2, programme: 3 }, tag: "ADHD" },
      { label: "Learning difficulty at school", weights: { assessment: 3, therapy: 2 }, tag: "Learning difficulty" },
      { label: "Behaviour / emotional regulation", weights: { therapy: 3, programme: 2 }, tag: "Behaviour" },
      { label: "Not sure — I need help figuring this out", weights: { consult: 4 }, tag: "General guidance" },
    ],
  },
  {
    id: "age",
    q: "How old is your child?",
    options: [
      { label: "Under 3 years", weights: { assessment: 3, consult: 1 } },
      { label: "3–6 years", weights: { assessment: 2, therapy: 2, programme: 1 } },
      { label: "6–12 years", weights: { therapy: 2, programme: 3 } },
      { label: "12+ years", weights: { programme: 3, consult: 1 } },
    ],
  },
  {
    id: "duration",
    q: "How long has this been a concern?",
    options: [
      { label: "Just noticed in the last few weeks", weights: { consult: 3, assessment: 1 } },
      { label: "A few months", weights: { assessment: 2, therapy: 2 } },
      { label: "More than 6 months", weights: { assessment: 2, programme: 3 } },
      { label: "More than a year / since early childhood", weights: { programme: 4, therapy: 2 } },
    ],
  },
  {
    id: "tried",
    q: "Have you tried any support so far?",
    options: [
      { label: "No, this would be our first step", weights: { consult: 2, assessment: 2 } },
      { label: "Yes — speech / OT / counselling, but progress is slow", weights: { programme: 4 } },
      { label: "We have a diagnosis but no clear plan", weights: { programme: 3, therapy: 2 } },
      { label: "We have a plan, looking for a second opinion", weights: { consult: 3 } },
    ],
  },
  {
    id: "urgency",
    q: "How soon do you want to start?",
    options: [
      { label: "This week if possible", weights: { consult: 2, assessment: 2, therapy: 2 } },
      { label: "Within the next 2–4 weeks", weights: { assessment: 2, programme: 2 } },
      { label: "Exploring options, no rush", weights: { consult: 2 } },
    ],
  },
];

const RECOMMENDATIONS: Record<Track, { title: string; service: string; blurb: string }> = {
  assessment: {
    title: "Start with a Developmental Assessment",
    service: "Developmental assessment",
    blurb:
      "Based on your answers, the most useful first step is a structured assessment to understand exactly where your child stands and what's driving the concern.",
  },
  therapy: {
    title: "Targeted Therapy Sessions",
    service: "Therapy (speech / OT / behaviour)",
    blurb:
      "Your child sounds like a fit for focused therapy. We'll match the right specialist — speech, occupational, or behavioural — and set short, measurable goals.",
  },
  programme: {
    title: "A Structured NeuroDevelopment Programme",
    service: "Structured programme",
    blurb:
      "Given the duration and stage, a structured multi-week programme will give you a clear plan, weekly tracking, and the team support to actually see change.",
  },
  consult: {
    title: "Clarity Call with Our Care Team",
    service: "Clarity Call with Our Care Team",
    blurb:
      "Start with a clarity call with our care team. We'll listen to your concerns, help you understand what's going on, and guide you to the right next step — without rushing you into any programme.",
  },
};

const formSchema = z.object({
  name: z.string().trim().min(1, "Please share your name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(200),
  phone: z.string().trim().min(5, "Phone is required").max(40),
  preferredTime: z.string().trim().min(1, "Pick a preferred contact time").max(60),
});

function QuizPage() {
  const [step, setStep] = useState(0); // 0..QUESTIONS.length-1 = quiz, then = form, then +1 = thanks
  const [answers, setAnswers] = useState<Record<string, { label: string; weights: Partial<Record<Track, number>> }>>({});
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  const totalSteps = QUESTIONS.length + 1; // questions + capture form
  const isQuiz = step < QUESTIONS.length;
  const isForm = step === QUESTIONS.length;

  const recommendation = useMemo<Track>(() => {
    const scores: Record<Track, number> = { assessment: 0, therapy: 0, programme: 0, consult: 0 };
    for (const a of Object.values(answers)) {
      for (const [k, v] of Object.entries(a.weights)) {
        scores[k as Track] += v ?? 0;
      }
    }
    return (Object.entries(scores).sort((a, b) => b[1] - a[1])[0]?.[0] as Track) || "consult";
  }, [answers]);

  const concernTag = answers["concern"]?.label ?? "";

  function pick(q: Question, opt: Option) {
    setAnswers((prev) => ({ ...prev, [q.id]: { label: opt.label, weights: opt.weights } }));
    setTimeout(() => setStep((s) => s + 1), 120);
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const raw = Object.fromEntries(fd) as Record<string, string>;
    const parsed = formSchema.safeParse(raw);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check the form");
      return;
    }
    setBusy(true);
    try {
      const answerMap: Record<string, string> = {};
      for (const q of QUESTIONS) answerMap[q.q] = answers[q.id]?.label ?? "";
      const rec = RECOMMENDATIONS[recommendation];
      const res = await fetch("/api/public/quiz-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...parsed.data,
          service: rec.service,
          answers: answerMap,
          recommendation: rec.title,
          track: recommendation,
        }),
      });
      if (!res.ok) {
        toast.error("Could not submit right now. Please call or WhatsApp +91 94333 08880.");
        return;
      }
      toast.success("Thank you. Our care team will reach out shortly.");
      setDone(true);
    } catch {
      toast.error("Network issue. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <SiteLayout>
      <section className="mx-auto max-w-3xl px-5 pt-16 pb-6 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
          <Sparkles className="h-3.5 w-3.5 text-primary" /> 60-second qualifier
        </div>
        <h1 className="mt-4 font-display text-4xl sm:text-5xl">Find your child's path</h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
          Answer 5 quick questions. We'll recommend the right starting point and a member of our
          team will personally reach out.
        </p>
      </section>

      <section className="mx-auto max-w-2xl px-5 pb-20">
        {!done && (
          <div className="mb-4 h-1.5 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full bg-primary transition-all"
              style={{ width: `${Math.min(100, (step / totalSteps) * 100)}%` }}
            />
          </div>
        )}

        {done ? (
          <div className="rounded-3xl border border-border bg-card p-8 text-center">
            <CheckCircle2 className="mx-auto h-12 w-12 text-primary" />
            <h2 className="mt-4 font-display text-3xl">Your Clarity Call is on the way.</h2>
            <p className="mx-auto mt-3 max-w-md text-muted-foreground">
              A member of our care team will call or message you at your preferred time to walk
              you through the next step. You can also reach us on WhatsApp at +91 94333 08880.
            </p>
          </div>
        ) : isQuiz ? (
          <div className="rounded-3xl border border-border bg-card p-6 sm:p-8">
            <div className="mb-2 text-xs uppercase tracking-wide text-muted-foreground">
              Question {step + 1} of {QUESTIONS.length}
            </div>
            <h2 className="font-display text-2xl sm:text-3xl">{QUESTIONS[step].q}</h2>
            {QUESTIONS[step].help && (
              <p className="mt-2 text-sm text-muted-foreground">{QUESTIONS[step].help}</p>
            )}
            <div className="mt-6 grid gap-3">
              {QUESTIONS[step].options.map((opt) => {
                const active = answers[QUESTIONS[step].id]?.label === opt.label;
                return (
                  <button
                    key={opt.label}
                    type="button"
                    onClick={() => pick(QUESTIONS[step], opt)}
                    className={`group flex items-center justify-between rounded-2xl border px-4 py-3 text-left text-sm transition-colors ${
                      active
                        ? "border-primary bg-primary/10"
                        : "border-border bg-background hover:border-primary/50 hover:bg-muted"
                    }`}
                  >
                    <span>{opt.label}</span>
                    <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                  </button>
                );
              })}
            </div>
            {step > 0 && (
              <div className="mt-6">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setStep((s) => Math.max(0, s - 1))}
                  className="text-muted-foreground"
                >
                  <ArrowLeft className="mr-1 h-4 w-4" /> Back
                </Button>
              </div>
            )}
          </div>
        ) : isForm ? (
          <form onSubmit={onSubmit} className="space-y-5 rounded-3xl border border-border bg-card p-6 sm:p-8">
            <div className="rounded-2xl border border-primary/30 bg-primary/5 p-4">
              <div className="text-xs uppercase tracking-wide text-primary">Our recommendation</div>
              <div className="mt-1 font-display text-xl">{RECOMMENDATIONS[recommendation].title}</div>
              <p className="mt-2 text-sm text-muted-foreground">
                {RECOMMENDATIONS[recommendation].blurb}
              </p>
              {concernTag && (
                <p className="mt-2 text-xs text-muted-foreground">
                  Based on your concern: <span className="text-foreground">{concernTag}</span>
                </p>
              )}
            </div>

            <p className="text-sm text-muted-foreground">
              Share your details and we'll reach out to confirm a time and walk you through the
              next step.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Your name *</Label>
                <Input id="name" name="name" required maxLength={100} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone / WhatsApp *</Label>
                <Input id="phone" name="phone" required maxLength={40} placeholder="+91 …" />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="email">Email *</Label>
                <Input id="email" name="email" type="email" required maxLength={200} />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="service">Service of interest</Label>
                <Input
                  id="service"
                  name="service"
                  defaultValue={RECOMMENDATIONS[recommendation].service}
                  maxLength={120}
                  readOnly
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="preferredTime">Preferred contact time *</Label>
                <Select name="preferredTime" defaultValue="">
                  <SelectTrigger id="preferredTime">
                    <SelectValue placeholder="When should we call you?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Morning (9 AM – 12 PM)">Morning (9 AM – 12 PM)</SelectItem>
                    <SelectItem value="Afternoon (12 PM – 4 PM)">Afternoon (12 PM – 4 PM)</SelectItem>
                    <SelectItem value="Evening (4 PM – 8 PM)">Evening (4 PM – 8 PM)</SelectItem>
                    <SelectItem value="Anytime today">Anytime today</SelectItem>
                    <SelectItem value="Weekend only">Weekend only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                className="text-muted-foreground"
              >
                <ArrowLeft className="mr-1 h-4 w-4" /> Back
              </Button>
              <Button type="submit" size="lg" className="rounded-full px-6" disabled={busy}>
                {busy
                  ? "Sending…"
                  : recommendation === "consult"
                  ? "Book my Clarity Call"
                  : "Request my Clarity Call"}
              </Button>
            </div>
            <p className="text-center text-xs text-muted-foreground">
              By submitting, you agree to be contacted by our team. See our{" "}
              <a href="/privacy" className="underline">Privacy Policy</a>.
            </p>
          </form>
        ) : null}
      </section>
    </SiteLayout>
  );
}