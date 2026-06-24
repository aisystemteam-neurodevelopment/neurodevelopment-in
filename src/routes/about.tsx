import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { Compass, Layers, HeartHandshake, LineChart, Sparkles, ArrowRight } from "lucide-react";
import drDas from "@/assets/dr-das.png.asset.json";
import { LinkedInIcon, LINKEDIN_URL } from "@/components/site/SocialIcons";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Dr. Diptanshu Das — Architect of the Parent-Led NeuroDevelopment System | IND" },
      {
        name: "description",
        content:
          "Dr. Diptanshu Das is the founder of the Institute of NeuroDevelopment and the architect of a parent-led neurodevelopment system that helps families create measurable developmental progress through clarity, structure, ownership, and independence.",
      },
      { property: "og:title", content: "Dr. Diptanshu Das — Founder & System Architect, IND" },
      {
        property: "og:description",
        content:
          "IND helps parents create measurable developmental progress through a structured, parent-led, phase-based system. Designed by Dr. Diptanshu Das.",
      },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Dr. Diptanshu Das — Founder & System Architect, IND" },
      { name: "twitter:description", content: "Architect of a parent-led neurodevelopment system." },
    ],
  }),
  component: AboutPage,
});

const pillars = [
  {
    icon: Compass,
    t: "Clarity",
    d: "One developmental picture instead of five competing opinions. Parents finally know what to do, and why, this week.",
  },
  {
    icon: Layers,
    t: "Structure",
    d: "A phase-based architecture with sequence as law. Regulation before speech, thinking before social, always.",
  },
  {
    icon: HeartHandshake,
    t: "Ownership",
    d: "Parents become the growth engine. The system is coached; the daily execution is led at home.",
  },
  {
    icon: LineChart,
    t: "Progress",
    d: "Measurable signals each week. Activity is not progress — a tracked developmental trajectory is.",
  },
  {
    icon: Sparkles,
    t: "Independence",
    d: "The endpoint is a child who can function and a parent who can lead — not lifelong dependency on a clinic.",
  },
];

function AboutPage() {
  return (
    <SiteLayout>
      {/* Founder hero */}
      <section className="mx-auto grid max-w-6xl gap-10 px-5 pt-16 pb-10 md:grid-cols-[1.2fr_1fr] md:items-center">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
            Founder &amp; system architect
          </span>
          <h1 className="mt-5 font-display text-5xl leading-[1.05] md:text-6xl">
            Dr. Diptanshu Das designed the system that{" "}
            <span className="text-primary">replaces fragmented therapy.</span>
          </h1>
          <p className="mt-6 text-xl leading-snug text-foreground/90">
            IND helps parents create measurable developmental progress through a structured,
            parent-led, phase-based system.
          </p>
          <p className="mt-4 text-lg text-muted-foreground">
            Dr. Das is the founder of the Institute of NeuroDevelopment and the architect of
            that system. Not a service provider. Not another clinician on a long list. The
            category architect behind a parent-led model now used by thousands of families.
          </p>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View Dr. Diptanshu Das's LinkedIn profile"
            className="mt-5 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted hover:text-primary"
          >
            <LinkedInIcon className="h-4 w-4 text-[#0A66C2]" />
            Dr. Das on LinkedIn
          </a>
        </div>
        <div className="relative mx-auto w-full max-w-sm">
          <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-[radial-gradient(60%_60%_at_50%_50%,var(--warm)_0%,transparent_70%)]" />
          <img
            src={drDas.url}
            alt="Dr. Diptanshu Das, Founder of the Institute of NeuroDevelopment"
            className="w-full rounded-3xl border border-border bg-card object-cover shadow-[0_30px_80px_-40px_rgba(0,0,0,0.5)]"
          />
        </div>
      </section>

      {/* Master positioning callout */}
      <section className="mx-auto max-w-5xl px-5 pb-12">
        <div className="rounded-3xl border border-border bg-secondary/40 p-8 md:p-10">
          <div className="text-xs uppercase tracking-widest text-muted-foreground">
            Master positioning
          </div>
          <p className="mt-3 font-display text-2xl leading-snug md:text-3xl">
            "Diagnoses describe patterns. Drivers determine outcomes. We don't sell
            therapy — we engineer developmental progress, with the parent as the engine."
          </p>
          <div className="mt-5 text-sm text-muted-foreground">
            Dr. Diptanshu Das — Founder &amp; System Architect, IND
          </div>
        </div>
      </section>

      {/* Authority signals */}
      <section className="mx-auto max-w-5xl px-5 pb-16">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          {[
            { t: "System creator", d: "Designed the 4-Phase Sequential Flightpath." },
            { t: "Category architect", d: "Defined parent-led neurodevelopment as a category." },
            { t: "Development strategist", d: "Drivers-first model over symptom-first thinking." },
            { t: "Long-term thinker", d: "Independence as the endpoint, not lifelong dependency." },
          ].map((c) => (
            <div key={c.t} className="rounded-3xl border border-border bg-card p-5">
              <div className="font-display text-lg">{c.t}</div>
              <p className="mt-2 text-sm text-muted-foreground">{c.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Messaging pillars */}
      <section className="bg-secondary/40 py-20">
        <div className="mx-auto max-w-6xl px-5">
          <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-widest text-muted-foreground">
              The five pillars
            </div>
            <h2 className="mt-2 font-display text-4xl">
              Clarity · Structure · Ownership · Progress · Independence
            </h2>
            <p className="mt-3 text-muted-foreground">
              Every part of the IND system — the Flightpath, the weekly parent action, the
              measured signal — is built to advance one of these five outcomes.
            </p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3 lg:grid-cols-5">
            {pillars.map((p) => (
              <div key={p.t} className="rounded-3xl border border-border bg-background p-6">
                <p.icon className="h-6 w-6 text-primary" />
                <div className="mt-4 font-display text-xl">{p.t}</div>
                <p className="mt-2 text-sm text-muted-foreground">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why he built IND */}
      <section className="mx-auto max-w-4xl px-5 py-16">
        <h2 className="font-display text-4xl">Why he built a system, not another clinic</h2>
        <p className="mt-4 text-lg text-muted-foreground">
          For two decades, Dr. Das saw the same painful pattern repeat: hard-working parents,
          fragmented therapies, slow progress, quiet despair. The problem was not the parents.
          It was not even the individual therapies. It was the absence of an{" "}
          <em>integrating architecture</em> — a structured pathway that put the right
          driver first, in the right sequence, with the parent at the centre.
        </p>
        <p className="mt-4 text-lg text-muted-foreground">
          IND was founded to be exactly that. Not another therapy centre. A systems-driven,
          parent-led developmental institute.
        </p>
      </section>

      {/* The shift */}
      <section className="bg-secondary/40 py-16">
        <div className="mx-auto max-w-5xl px-5">
          <h2 className="font-display text-3xl">The shift the system creates</h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Every IND family moves through the same arc: confusion → insight → trust
            → ownership → mastery → leadership of their child's development.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {[
              { from: "Symptom management", to: "Developmental architecture" },
              { from: "5 fragmented therapies", to: "1 integrated, sequenced plan" },
              { from: "Endless 'try everything'", to: "One dominant bottleneck at a time" },
              { from: "Therapist-led, parent watches", to: "Parent-led, system-supported" },
              { from: "Open-ended, no end in sight", to: "Phase-based Flightpath with clear milestones" },
              { from: "Hope and guesswork", to: "Measurable progress with monitored readiness" },
            ].map((r) => (
              <div key={r.from} className="rounded-2xl border border-border bg-background p-4 text-sm">
                <div className="text-muted-foreground line-through">{r.from}</div>
                <div className="mt-1 font-medium">→ {r.to}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IND the organisation */}
      <section className="mx-auto max-w-5xl px-5 py-16">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl">About the Institute</h2>
            <p className="mt-4 text-muted-foreground">
              The Institute of NeuroDevelopment is the organisation through which Dr. Das's
              system is delivered. Systems-driven. Parent-led. Structured. Measurable.
              Long-term. Ethical. Execution-focused.
            </p>
            <p className="mt-3 text-muted-foreground">
              Our mission: replace fragmented intervention with a developmental architecture
              that parents can understand, implement, and sustain.
            </p>
          </div>
          <div className="rounded-3xl border border-border bg-card p-6">
            <h3 className="font-display text-xl">By the numbers</h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>· Working with children since 2005</li>
              <li>· Institute of NeuroDevelopment founded in 2020</li>
              <li>· 10,000+ families served</li>
              <li>· Parents reached in 10+ countries</li>
              <li>· 200+ active Breakthrough Flightpath families</li>
              <li>· 170+ parent-education webinars delivered</li>
              <li>· Weekly live parent webinars since 2023</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-3xl px-5 pb-20 text-center">
        <h2 className="font-display text-3xl">Want to see if this system fits your family?</h2>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          A short, honest conversation is the fastest way to know.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg" className="rounded-full px-8">
            <Link to="/contact">
              Book an appointment <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="rounded-full px-8">
            <Link to="/approach">See the system</Link>
          </Button>
        </div>
      </section>
    </SiteLayout>
  );
}
