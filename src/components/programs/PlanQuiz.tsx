import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, RotateCcw, Sparkles } from "lucide-react";

type Plan =
  | "masterclass"
  | "b2b"
  | "preenrollment"
  | "core"
  | "essential"
  | "elite";

type Question = {
  id: string;
  q: string;
  options: { label: string; weights: Partial<Record<Plan, number>> }[];
};

const QUESTIONS: Question[] = [
  {
    id: "stage",
    q: "Where are you in your journey right now?",
    options: [
      {
        label: "Just exploring — I want to understand the system first",
        weights: { masterclass: 4, b2b: 1 },
      },
      {
        label: "Curious but stuck — I have mental blocks about what to do",
        weights: { b2b: 4, preenrollment: 2 },
      },
      {
        label: "Ready to commit — I want a full structured program",
        weights: { core: 3, essential: 4, elite: 2 },
      },
      {
        label: "I want the highest-touch support possible",
        weights: { elite: 5, essential: 2 },
      },
    ],
  },
  {
    id: "budget",
    q: "How much time can you realistically commit each week?",
    options: [
      { label: "An hour or two to learn", weights: { masterclass: 5 } },
      { label: "A few hours a week for 6 weeks", weights: { b2b: 4, preenrollment: 4 } },
      { label: "Daily practice + weekly review", weights: { core: 4, essential: 3 } },
      { label: "Full daily practice with high-touch support", weights: { essential: 3, elite: 5 } },
    ],
  },
  {
    id: "support",
    q: "How much weekly support do you want?",
    options: [
      { label: "Just learning, no calls yet", weights: { masterclass: 4 } },
      { label: "Light guidance over a few weeks", weights: { b2b: 4 } },
      {
        label: "Weekly Boost Session for momentum",
        weights: { preenrollment: 3, essential: 4, elite: 3 },
      },
      { label: "A Progress Partner walking alongside me", weights: { core: 4, essential: 3 } },
    ],
  },
  {
    id: "depth",
    q: "How deep do you want to go on your child's profile?",
    options: [
      { label: "Just want to understand the basics", weights: { masterclass: 3, b2b: 2 } },
      { label: "Clarity on dominant bottleneck", weights: { b2b: 3, preenrollment: 3, core: 3 } },
      { label: "Full driver mapping + roadmap", weights: { essential: 4 } },
      {
        label: "Strength-finder + personalised senior-team mapping",
        weights: { elite: 5 },
      },
    ],
  },
];

const PLAN_META: Record<Plan, { name: string; tagline: string; href: string }> = {
  masterclass: {
    name: "Masterclass",
    tagline: "Start here. Understand the system in 90 minutes.",
    href: "/contact",
  },
  b2b: {
    name: "Block to Breakthrough",
    tagline: "6-week clarity program to clear the mind blockage.",
    href: "/contact",
  },
  preenrollment: {
    name: "Pre-enrollment",
    tagline: "B2B + Bootcamp bundle — most chosen entry path.",
    href: "/contact",
  },
  core: {
    name: "Flightpath — Core",
    tagline: "Clarity Session + Progress Partner support.",
    href: "/contact",
  },
  essential: {
    name: "Flightpath — Essential",
    tagline: "Core + Weekly Boost Session. Most families choose this.",
    href: "/contact",
  },
  elite: {
    name: "Flightpath — Elite",
    tagline: "Essential + Strength Finder + senior-team mapping.",
    href: "/contact",
  },
};

export function PlanQuiz({ trigger }: { trigger: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState<Record<Plan, number>>({
    masterclass: 0,
    b2b: 0,
    preenrollment: 0,
    core: 0,
    essential: 0,
    elite: 0,
  });

  const reset = () => {
    setStep(0);
    setScores({ masterclass: 0, b2b: 0, preenrollment: 0, core: 0, essential: 0, elite: 0 });
  };

  const handleAnswer = (weights: Partial<Record<Plan, number>>) => {
    setScores((prev) => {
      const next = { ...prev };
      (Object.keys(weights) as Plan[]).forEach((k) => {
        next[k] = (next[k] ?? 0) + (weights[k] ?? 0);
      });
      return next;
    });
    setStep((s) => s + 1);
  };

  const total = QUESTIONS.length;
  const isDone = step >= total;
  const winner = (Object.entries(scores).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "masterclass") as Plan;
  const meta = PLAN_META[winner];

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        setOpen(o);
        if (!o) reset();
      }}
    >
      <div onClick={() => setOpen(true)} className="inline-flex">
        {trigger}
      </div>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">
            Which plan is right for you?
          </DialogTitle>
          <DialogDescription>
            {isDone
              ? "Based on your answers, here's where we'd start you."
              : `Question ${step + 1} of ${total} — 4 quick questions.`}
          </DialogDescription>
        </DialogHeader>

        {!isDone ? (
          <div className="mt-2">
            <div className="mb-4 h-1.5 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full bg-primary transition-all"
                style={{ width: `${((step + 1) / total) * 100}%` }}
              />
            </div>
            <h3 className="font-display text-lg">{QUESTIONS[step].q}</h3>
            <div className="mt-4 grid gap-2">
              {QUESTIONS[step].options.map((opt) => (
                <button
                  key={opt.label}
                  onClick={() => handleAnswer(opt.weights)}
                  className="rounded-xl border border-border bg-card px-4 py-3 text-left text-sm transition-all hover:border-primary hover:bg-primary/5"
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-2">
            <Badge className="rounded-full">
              <Sparkles className="mr-1 h-3 w-3" /> Recommended for you
            </Badge>
            <h3 className="mt-3 font-display text-3xl">{meta.name}</h3>
            <p className="mt-1 text-muted-foreground">{meta.tagline}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              <Button asChild className="rounded-full">
                <a href={meta.href}>
                  Continue with {meta.name} <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </Button>
              <Button variant="outline" onClick={reset} className="rounded-full">
                <RotateCcw className="mr-1 h-4 w-4" /> Retake quiz
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
