import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, ArrowRight, Sparkles, Zap, Crown, Rocket, Download, HelpCircle } from "lucide-react";
import { PaymentModal, type ProgramPayment } from "@/components/programs/PaymentModal";
import { PlanQuiz } from "@/components/programs/PlanQuiz";
import { downloadProgramsPdf } from "@/lib/programsPdf";

export const Route = createFileRoute("/programs")({
  head: () => ({
    meta: [
      { title: "Programs & Pricing — Institute of NeuroDevelopment" },
      {
        name: "description",
        content:
          "From a ₹249 masterclass to the full Flightpath enrollment. Transparent pricing for IND's parent-led NeuroDevelopment programs — Block to Breakthrough, Bootcamp, and the 3-tier Flightpath (Core, Essential, Elite).",
      },
      { property: "og:title", content: "IND Programs & Pricing" },
      { property: "og:description", content: "Masterclass, Pre-enrollment, and the 3-tier Flightpath enrollment." },
    ],
  }),
  component: ProgramsPage,
});

type ProgramCard = ProgramPayment & {
  icon: typeof Sparkles;
  badge?: string;
  cta: string;
  featured?: boolean;
};

const ENTRY: ProgramCard[] = [
  {
    programKey: "masterclass",
    name: "Masterclass",
    tagline: "Start here. One session.",
    priceINR: 249,
    durationLabel: "Live webinar",
    cta: "Join the next session",
    highlights: [
      "See the parent-led system in 90 minutes",
      "Understand the invisible loss model",
      "Q&A with the IND team",
    ],
    ifYouDoNotEnroll: [
      "You'll keep guessing which therapy framework actually fits your child.",
      "You miss the dominant-bottleneck lens — the difference between months of effort and weeks.",
      "The next live cohort is limited; recordings are not shared publicly.",
    ],
    icon: Sparkles,
  },
  {
    programKey: "b2b",
    name: "Block to Breakthrough",
    tagline: "Clear the mind blockage.",
    priceINR: 10000,
    durationLabel: "6 weeks",
    cta: "Apply for B2B",
    highlights: [
      "6-week guided clarity program",
      "Identify your child's dominant bottleneck",
      "Build your first parent-led daily rhythm",
    ],
    ifYouDoNotEnroll: [
      "Without clarity, every therapy hour costs you twice — money and momentum.",
      "Mental blocks compound: another 6 months of 'we'll figure it out' is the real expense.",
      "Most families who skip B2B re-enter later at a higher tier anyway.",
    ],
    icon: Zap,
  },
  {
    programKey: "pre_enrollment",
    name: "Pre-enrollment",
    tagline: "B2B + Bootcamp bundle.",
    priceINR: 20000,
    durationLabel: "6 weeks + 2 days",
    cta: "Reserve a seat",
    highlights: [
      "Everything in Block to Breakthrough",
      "2-day Bootcamp (only available in this bundle)",
      "Weekly Boost Session for momentum",
    ],
    ifYouDoNotEnroll: [
      "Bootcamp is NOT sold separately — skipping pre-enrollment closes that door.",
      "Families that enter Flightpath cold take longer to find their rhythm.",
      "Weekly Boost Session is what converts insight into action — without it, plans stall.",
    ],
    badge: "Most chosen entry path",
    icon: Rocket,
  },
];

const FLIGHTPATH: ProgramCard[] = [
  {
    programKey: "flightpath_core",
    name: "Flightpath — Core",
    tagline: "The foundation of the Flightpath.",
    priceINR: 120000,
    durationLabel: "Full enrollment",
    cta: "Choose Core",
    highlights: [
      "Clarity Session with the IND team",
      "Progress Partner support",
      "Phase-based developmental roadmap",
      "Access to the parent workspace",
    ],
    ifYouDoNotEnroll: [
      "The invisible loss compounds quietly — 6 months of unstructured effort can cost more than Core itself.",
      "Without a Progress Partner, parents drift between conflicting advice.",
      "Phase-based work cannot be reverse-engineered from YouTube.",
    ],
    icon: Sparkles,
  },
  {
    programKey: "flightpath_essential",
    name: "Flightpath — Essential",
    tagline: "Core + ongoing weekly momentum.",
    priceINR: 200000,
    durationLabel: "Full enrollment",
    cta: "Choose Essential",
    highlights: [
      "Everything in Core",
      "Weekly Boost Session",
      "Closer iteration cycles with the team",
      "Priority response on the parent workspace",
    ],
    ifYouDoNotEnroll: [
      "Weekly cadence is what most families say made the difference — fortnightly is too slow when drivers shift.",
      "You'll likely upgrade later — and lose weeks of compounding progress in the meantime.",
      "Priority response matters when a regulation crisis hits on a Tuesday.",
    ],
    featured: true,
    badge: "Most families choose this",
    icon: Zap,
  },
  {
    programKey: "flightpath_elite",
    name: "Flightpath — Elite",
    tagline: "Essential + deep strengths work.",
    priceINR: 240000,
    durationLabel: "Full enrollment",
    cta: "Choose Elite",
    highlights: [
      "Everything in Essential",
      "Strength Finder Session",
      "Personalised driver-mapping with senior team",
      "Highest-touch coordination",
    ],
    ifYouDoNotEnroll: [
      "Strength Finder is the difference between managing weaknesses and building a life around strengths.",
      "Senior-team mapping is not available at lower tiers — at all.",
      "Highest-touch coordination removes the parent's coordination tax (often 5–10 hrs/week).",
    ],
    icon: Crown,
  },
];

function ProgramsPage() {
  const [selected, setSelected] = useState<ProgramPayment | null>(null);
  const [open, setOpen] = useState(false);

  const openPayment = (p: ProgramPayment) => {
    setSelected(p);
    setOpen(true);
  };

  return (
    <SiteLayout>
      <PaymentModal program={selected} open={open} onOpenChange={setOpen} />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_50%_0%,var(--warm)_0%,transparent_60%)]" />
        <div className="mx-auto max-w-4xl px-5 py-20 text-center md:py-24">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
            <Sparkles className="h-3 w-3" /> Programs & pricing
          </span>
          <h1 className="mt-5 font-display text-5xl leading-[1.05] md:text-6xl">
            One ladder. <span className="text-primary">From a single masterclass to the full Flightpath.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
            We publish every price openly. Families step in where it makes sense — a ₹249
            masterclass, a 6-week clarity program, or the full parent-led enrollment.
          </p>

          {/* Quiz + PDF actions */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <PlanQuiz
              trigger={
                <Button size="lg" className="rounded-full px-6">
                  <HelpCircle className="mr-2 h-4 w-4" />
                  Which plan is right for you?
                </Button>
              }
            />
            <Button
              size="lg"
              variant="outline"
              className="rounded-full px-6"
              onClick={() => downloadProgramsPdf()}
            >
              <Download className="mr-2 h-4 w-4" />
              Download comparison (PDF)
            </Button>
          </div>
        </div>
      </section>

      {/* Entry / Pre-enrollment */}
      <section className="mx-auto max-w-6xl px-5 pb-10">
        <div className="mb-8 flex items-end justify-between gap-3">
          <div>
            <h2 className="font-display text-3xl">Start &amp; pre-enrollment</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              The on-ramp. Designed to give clarity before any long commitment.
            </p>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {ENTRY.map((p) => {
            const Icon = p.icon;
            const featured = !!p.badge;
            return (
              <div
                key={p.name}
                className={`relative flex flex-col rounded-3xl border bg-card p-6 ${
                  featured ? "border-primary shadow-[0_10px_40px_-20px_var(--primary)]" : "border-border"
                }`}
              >
                {p.badge && (
                  <Badge className="absolute -top-3 left-6 rounded-full px-3 py-1 text-[10px] uppercase tracking-wider">
                    {p.badge}
                  </Badge>
                )}
                <div className="flex items-center gap-2">
                  <Icon className="h-5 w-5 text-primary" />
                  <h3 className="font-display text-xl">{p.name}</h3>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{p.tagline}</p>
                <div className="mt-5 flex items-baseline gap-2">
                  <span className="font-display text-4xl">
                    ₹{p.priceINR.toLocaleString("en-IN")}
                  </span>
                  <span className="text-xs text-muted-foreground">/ {p.durationLabel}</span>
                </div>
                <ul className="mt-5 space-y-2 text-sm">
                  {p.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span className="text-muted-foreground">{h}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 pt-2">
                  <Button
                    onClick={() => openPayment(p)}
                    variant={featured ? "default" : "outline"}
                    className="w-full rounded-full"
                  >
                    {p.cta} <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-4 text-xs text-muted-foreground">
          Note: The 2-day Bootcamp is only available inside the Pre-enrollment bundle — not sold separately.
        </p>
      </section>

      {/* Flightpath */}
      <section className="bg-secondary/40 py-20">
        <div className="mx-auto max-w-6xl px-5">
          <div className="mb-8 max-w-2xl">
            <Badge variant="outline" className="rounded-full">Enrollment</Badge>
            <h2 className="mt-3 font-display text-3xl">The Flightpath — BTFP</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              The full parent-led NeuroDevelopment enrollment, organised into three tiers so
              families can choose the level of support that fits their phase.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {FLIGHTPATH.map((t) => {
              const Icon = t.icon;
              return (
                <div
                  key={t.name}
                  className={`relative flex flex-col rounded-3xl border bg-background p-7 ${
                    t.featured
                      ? "border-primary shadow-[0_20px_60px_-30px_var(--primary)] md:-translate-y-2"
                      : "border-border"
                  }`}
                >
                  {t.badge && (
                    <Badge className="absolute -top-3 left-7 rounded-full px-3 py-1 text-[10px] uppercase tracking-wider">
                      {t.badge}
                    </Badge>
                  )}
                  <div className="flex items-center gap-2">
                    <Icon className="h-5 w-5 text-primary" />
                    <h3 className="font-display text-2xl">{t.name.replace("Flightpath — ", "")}</h3>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{t.tagline}</p>
                  <div className="mt-6 flex items-baseline gap-2">
                    <span className="font-display text-5xl">
                      ₹{t.priceINR.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <ul className="mt-6 space-y-2.5 text-sm">
                    {t.highlights.map((b) => (
                      <li key={b} className="flex items-start gap-2">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span className="text-muted-foreground">{b}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-7 pt-2">
                    <Button
                      onClick={() => openPayment(t)}
                      variant={t.featured ? "default" : "outline"}
                      className="w-full rounded-full"
                    >
                      {t.cta} <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

          <p className="mt-6 text-xs text-muted-foreground">
            Sequence is law: Regulation → Connection → Communication → Independence. Every
            Flightpath tier follows the same phase architecture; tiers differ in cadence and depth
            of support, not in the underlying system.
          </p>
        </div>
      </section>

      {/* Comparison table */}
      <section className="mx-auto max-w-5xl px-5 py-20">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 className="font-display text-3xl">At a glance</h2>
          <Button
            variant="outline"
            size="sm"
            className="rounded-full"
            onClick={() => downloadProgramsPdf()}
          >
            <Download className="mr-2 h-4 w-4" /> Download PDF
          </Button>
        </div>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-4 py-3 text-left">Program</th>
                <th className="px-4 py-3 text-left">Duration</th>
                <th className="px-4 py-3 text-left">Key benefit</th>
                <th className="px-4 py-3 text-right">Price</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Masterclass / Webinar", "Live session", "Understand the system", "₹249"],
                ["Block to Breakthrough", "6 weeks", "Clear mind blockage", "₹10,000"],
                ["Pre-enrollment (B2B + Bootcamp)", "6 weeks + 2 days", "Boost Session weekly", "₹20,000"],
                ["Flightpath — Core", "Enrollment", "Clarity Session + Progress Partner", "₹1,20,000"],
                ["Flightpath — Essential", "Enrollment", "Core + Weekly Boost Session", "₹2,00,000"],
                ["Flightpath — Elite", "Enrollment", "Essential + Strength Finder Session", "₹2,40,000"],
              ].map((row) => (
                <tr key={row[0]} className="border-t border-border">
                  <td className="px-4 py-3 font-medium">{row[0]}</td>
                  <td className="px-4 py-3 text-muted-foreground">{row[1]}</td>
                  <td className="px-4 py-3 text-muted-foreground">{row[2]}</td>
                  <td className="px-4 py-3 text-right font-display text-base">{row[3]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Bootcamp is bundled inside Pre-enrollment and is not sold as a standalone product.
          GST (18%) applies. EMI options available at checkout.
        </p>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-3xl px-5 pb-24 text-center">
        <h2 className="font-display text-3xl">Not sure where to start?</h2>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          Take the 4-question plan finder, or talk to us directly.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <PlanQuiz
            trigger={
              <Button size="lg" className="rounded-full px-8">
                <HelpCircle className="mr-2 h-4 w-4" /> Find my plan
              </Button>
            }
          />
          <Button asChild size="lg" variant="outline" className="rounded-full px-8">
            <Link to="/contact">Book an appointment</Link>
          </Button>
        </div>
      </section>
    </SiteLayout>
  );
}
