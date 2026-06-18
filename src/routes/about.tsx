import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { Compass, Layers, HeartHandshake, LineChart, Sparkles, ArrowRight } from "lucide-react";

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
      <section className="mx-auto max-w-4xl px-5 pt-16 pb-10">
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
          Dr. Das is the founder of the Institute of NeuroDevelopment and the architect of that
          system. Not a service provider. Not another clinician on a long list. The category
          architect behind a parent-led model now used by thousands of families.
        </p>
      </section>

      {/* Master positioning callout */}
      <section className="mx-auto max-w-5xl px-5 pb-12">
        <div className="rounded-3xl border border-border bg-secondary/40 p-8 md:p-10">
          <div className="text-xs uppercase tracking-widest text-muted-foreground">
            Master positioning
          </div>
          <p className="mt-3 font-display text-2xl leading-snug md:text-3xl">
            &ldquo;Diagnoses describe patterns. Drivers determine outcomes. We don&apos;t sell
            therapy &mdash; we engineer developmental progress, with the parent as the engine.&rdquo;
          </p>
          <div className="mt-5 text-sm text-muted-foreground">
            Dr. Diptanshu Das &mdash; Founder &amp; System Architect, IND
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
              Clarity &middot; Structure &middot; Ownership &middot; Progress &middot; Independence
            </h2>
            <p className="mt-3 text-muted-foreground">
              Every part of the IND system &mdash; the Flightpath, the weekly parent action, the
              measured signal &mdash; is built to advance one of these five outcomes.
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
          <em>integrating architecture</em> &mdash; a structured pathway that put the right
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
            Every IND family moves through the same arc: confusion &rarr; insight &rarr; trust
            &rarr; ownership &rarr; mastery &rarr; leadership of their child&apos;s development.
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
                <div className="mt-1 font-medium">&rarr; {r.to}</div>
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
              The Institute of NeuroDevelopment is the organisation through which Dr. Das&apos;s
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
              <li>&middot; Working with children since 2005</li>
              <li>&middot; Institute of NeuroDevelopment founded in 2020</li>
              <li>&middot; 10,000+ families served</li>
              <li>&middot; Parents reached in 10+ countries</li>
              <li>&middot; 200+ active Breakthrough Flightpath families</li>
              <li>&middot; 170+ parent-education webinars delivered</li>
              <li>&middot; Weekly live parent webinars since 2023</li>
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
