import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { ArrowRight, Compass, HeartHandshake, ListChecks, Sparkles, Phone, Hourglass, TrendingDown, Layers, LineChart } from "lucide-react";
import { InvisibleLossCalculator } from "@/components/site/InvisibleLossCalculator";
import { LeadMagnetForm } from "@/components/site/LeadMagnetForm";
import { TestimonialStories } from "@/components/site/TestimonialStories";
import heroBg from "@/assets/hero-mountain.png.asset.json";
import heroBgMobile from "@/assets/hero-mountain-mobile.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    links: [
      { rel: "preload", as: "image", href: heroBg.url, fetchpriority: "high", media: "(min-width: 768px)" },
      { rel: "preload", as: "image", href: heroBgMobile.url, fetchpriority: "high", media: "(max-width: 767px)" },
      { rel: "canonical", href: "https://neurodevelopment.in/" },
    ],
    meta: [
      { title: "Institute of NeuroDevelopment — Parent-Led Progress" },
      {
        name: "description",
        content:
          "Not a therapy centre. A structured, parent-led neurodevelopment system that turns fragmented intervention into measurable progress. Founded by Dr. Diptanshu Das.",
      },
      { property: "og:title", content: "Institute of NeuroDevelopment — Parent-Led Progress" },
      { property: "og:description", content: "A structured, parent-led neurodevelopment system that turns fragmented intervention into measurable progress." },
      { property: "og:url", content: "https://neurodevelopment.in/" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Institute of NeuroDevelopment" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Institute of NeuroDevelopment — Parent-Led Progress" },
      { name: "twitter:description", content: "A structured, parent-led neurodevelopment system that turns fragmented intervention into measurable progress." },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Institute of NeuroDevelopment",
          url: "https://neurodevelopment.in/",
          telephone: "+91-94333-08880",
          email: "instituteofneurodevelopment@gmail.com",
          image: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/e615845d-d5d6-4842-81de-7874761f4644",
          address: {
            "@type": "PostalAddress",
            streetAddress: "26, Raja Nabakrishna Street, opposite Sobhabazar Rajbari",
            addressLocality: "Kolkata",
            postalCode: "700005",
            addressRegion: "West Bengal",
            addressCountry: "IN",
          },
          geo: { "@type": "GeoCoordinates", latitude: 22.5964906, longitude: 88.366761 },
        }),
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 -z-20 hidden bg-cover bg-center md:block"
          style={{ backgroundImage: `url(${heroBg.url})` }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 -z-20 block bg-cover bg-center md:hidden"
          style={{ backgroundImage: `url(${heroBgMobile.url})` }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(105deg,rgba(13,11,26,0.88)_0%,rgba(30,20,60,0.60)_45%,rgba(74,44,138,0.35)_70%,rgba(13,11,26,0.20)_100%)]"
          aria-hidden="true"
        />
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 md:grid-cols-2 md:py-28">

          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
              <Sparkles className="h-3 w-3" /> A Parent-Led NeuroDevelopment System
            </span>
            <h1 className="mt-5 font-display text-5xl leading-[1.05] md:text-6xl">
              Stop chasing therapies. <span className="text-primary">Start engineering progress.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-muted-foreground">
              IND is not a therapy centre. It is a structured developmental architecture that
              moves families from confusion and fragmented intervention to clarity, daily
              execution, and measurable progress — with the parent as the growth engine.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Button asChild size="lg" className="rounded-full px-6">
                <Link to="/contact">
                  Book an appointment <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full px-6">
                <Link to="/approach">See the system</Link>
              </Button>
              <a
                href="tel:+919433308880"
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
              >
                <Phone className="h-3.5 w-3.5" /> +91 94333 08880
              </a>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              We do not diagnose online and we never guarantee outcomes. We commit to clarity,
              structure, and our full effort.
            </p>
          </div>

          <div className="relative">
            <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
              <div className="text-xs uppercase tracking-wide text-muted-foreground">From the architect</div>
              <p className="mt-3 font-display text-2xl leading-snug">
                "Diagnoses describe patterns. Drivers determine outcomes. We engineer
                developmental progress — we don't sell therapy."
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-sage text-sage-foreground font-display">D</div>
                <div className="text-sm">
                  <div className="font-medium">Dr. Diptanshu Das</div>
                  <div className="text-muted-foreground">Founder & system architect, IND</div>
                </div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3 text-center">
              {[
                { n: "10,000+", l: "families served" },
                { n: "10+", l: "countries reached" },
                { n: "200+", l: "active Flightpath families" },
              ].map((s) => (
                <div key={s.l} className="rounded-2xl border border-border bg-background p-3">
                  <div className="font-display text-2xl text-primary">{s.n}</div>
                  <div className="mt-1 text-[11px] leading-tight text-muted-foreground">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What changes */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl leading-tight tracking-tight md:text-4xl">What changes when development becomes a system</h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Most families are stuck not because they aren't trying hard enough, but because
            no one has handed them a structured pathway. That is what IND replaces.
          </p>
        </div>
        <div className="mt-10 grid gap-10 md:grid-cols-3">
          {[
            {
              icon: Compass,
              title: "Clarity replaces confusion",
              body: "One integrated developmental architecture instead of five disconnected therapies pulling in different directions.",
            },
            {
              icon: ListChecks,
              title: "Structure replaces drift",
              body: "A phase-based pathway with one dominant bottleneck at a time — not a 'try everything' loop.",
            },
            {
              icon: HeartHandshake,
              title: "Ownership replaces dependence",
              body: "You become the growth engine. We coach the system; you lead the daily execution.",
            },
          ].map((c) => (
            <div key={c.title} className="rounded-3xl border border-border bg-card p-6">
              <c.icon className="h-6 w-6 text-primary" />
              <h3 className="mt-4 font-display text-xl">{c.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{c.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4 phase */}
      <section className="bg-secondary/40 py-20">
        <div className="mx-auto max-w-6xl px-5">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl leading-tight tracking-tight md:text-4xl">The 4-Phase Sequential Flightpath</h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Sequence is law. No speech before regulation. No social skills before thinking.
              No advanced learning before engagement. We move only when readiness is demonstrated.
            </p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-4">
            {[
              { n: "01", t: "Connection, Engagement & Regulation", d: "The foundation: attunement, calm, joint attention." },
              { n: "02", t: "Play, Adaptive Learning & Problem-Solving", d: "Curiosity, exploration, real-life adaptive skills." },
              { n: "03", t: "Thinking-Based Speech & Expression", d: "Functional communication driven by thinking, not rote." },
              { n: "04", t: "Social-Emotional Mastery & Executive Function", d: "Independence, regulation, life-ready skills." },
            ].map((p) => (
              <div key={p.n} className="rounded-2xl border border-border bg-background p-5">
                <div className="font-display text-sm text-primary">{p.n}</div>
                <div className="mt-1 font-display text-xl">{p.t}</div>
                <p className="mt-2 text-sm text-muted-foreground">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Invisible Loss */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="grid gap-10 md:grid-cols-2 md:items-start">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
              <Hourglass className="h-3 w-3" /> The Invisible Loss
            </span>
            <h2 className="mt-4 font-display text-3xl leading-tight tracking-tight md:text-4xl">
              Fragmented intervention has a cost. <span className="text-primary">Most families never see it on a bill.</span>
            </h2>
            <p className="mt-4 text-muted-foreground">
              When speech, OT, special ed, behaviour, and home advice each pull in their own
              direction, the child still moves — just not in a coordinated direction.
              Weeks pass. Sessions add up. The calendar fills. And the most valuable resource
              in neurodevelopment — <span className="text-foreground">time inside the developmental window</span> —
              quietly drains away.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              We call this the Invisible Loss. It's not a failure of effort or love. It's
              what happens when there is no single system owning the whole child.
            </p>
          </div>

          <div className="space-y-3">
            {[
              {
                icon: Layers,
                t: "Stacked inputs, no spine",
                d: "Three to five professionals, each optimising a slice. No one sequencing the whole.",
              },
              {
                icon: TrendingDown,
                t: "Activity mistaken for progress",
                d: "Hours logged, sessions attended, reports filed — without a measurable developmental trajectory.",
              },
              {
                icon: Hourglass,
                t: "Quiet drain on the developmental window",
                d: "Months and years compound. The cost shows up later, not in this week's invoice.",
              },
            ].map((c) => (
              <div key={c.t} className="flex gap-4 rounded-2xl border border-border bg-card p-5">
                <c.icon className="h-5 w-5 shrink-0 text-primary" />
                <div>
                  <div className="font-display text-lg">{c.t}</div>
                  <p className="mt-1 text-sm text-muted-foreground">{c.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bridge into measurable progress */}
        <div className="mt-12 rounded-3xl border border-border bg-secondary/40 p-8 md:p-10">
          <div className="flex items-start gap-4">
            <LineChart className="mt-1 h-6 w-6 text-primary" />
            <div>
              <h3 className="font-display text-2xl">
                What replaces the loss: a measurable progress framework
              </h3>
              <p className="mt-2 max-w-3xl text-muted-foreground">
                Inside the IND system, every week has a defined driver, a parent action, and a
                signal we look for. Progress stops being a feeling and becomes a tracked line.
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-4">
            {[
              { n: "Phase", d: "One of the four sequential phases anchors the work. No skipping ahead." },
              { n: "Driver", d: "The dominant bottleneck for this child, this week — not a generic plan." },
              { n: "Parent action", d: "A small, doable practice woven into the existing daily routine." },
              { n: "Signal", d: "A specific, observable change we measure and review week on week." },
            ].map((s) => (
              <div key={s.n} className="rounded-2xl border border-border bg-background p-5">
                <div className="font-display text-sm uppercase tracking-wide text-primary">{s.n}</div>
                <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild size="lg" className="rounded-full px-6">
              <Link to="/approach">
                See how progress is measured <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full px-6">
              <Link to="/contact">Book an appointment</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Interactive Invisible Loss calculator */}
      <InvisibleLossCalculator />


      {/* The cost of drift */}
      <section className="mx-auto max-w-6xl px-5 py-20">

        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl leading-tight tracking-tight md:text-4xl">Where families are stuck</h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            These are the patterns we hear every week. None of them are personal failures —
            they are signals that the current system is fragmented.
          </p>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {[
            { q: "We have tried many things, but progress is still too slow.", a: "Activity isn't the same as progress. Without sequence, effort scatters." },
            { q: "No one has given us a clear roadmap.", a: "A phase-based Flightpath replaces guesswork with a defined pathway and milestones." },
            { q: "We are confused about what the child really needs.", a: "Diagnoses describe patterns; drivers determine outcomes. We work the right driver first." },
            { q: "We're spending time and money, but not seeing enough change.", a: "When the dominant constraint stays unsolved, more sessions rarely fix it." },
            { q: "We feel helpless and dependent on experts.", a: "The goal is parent ownership and child independence — not lifelong reliance on a clinic." },
            { q: "We're scared of what happens if we wait.", a: "Developmental loss is cumulative. Early structured action is the highest-leverage move." },
          ].map((c) => (
            <div key={c.q} className="rounded-3xl border border-border bg-card p-6">
              <div className="font-display text-lg">"{c.q}"</div>
              <p className="mt-2 text-sm text-muted-foreground">{c.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonial stories with measurable outcomes */}
      <TestimonialStories />

      {/* Lead magnet — before the masterclass */}
      <LeadMagnetForm />

      {/* Proof & credibility */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
            Proof &amp; credibility
          </span>
          <h2 className="mt-4 font-display text-3xl leading-tight tracking-tight md:text-4xl">Numbers we can stand behind</h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            We don't use vanity metrics or guarantees. These are the verifiable signals of
            scale, continuity, and parent engagement behind the IND system.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {[
            { n: "2005", l: "Dr. Das working with children since" },
            { n: "2020", l: "Institute of NeuroDevelopment founded" },
            { n: "10,000+", l: "families served to date" },
            { n: "10+", l: "countries reached" },
            { n: "200+", l: "active Flightpath families" },
            { n: "170+", l: "parent-education webinars delivered" },
          ].map((s) => (
            <div key={s.l} className="rounded-2xl border border-border bg-card p-4 text-center">
              <div className="font-display text-2xl text-primary">{s.n}</div>
              <div className="mt-1 text-xs leading-tight text-muted-foreground">{s.l}</div>
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Figures reflect cumulative work since 2005 and active engagement under the Institute
          of NeuroDevelopment. We do not publish outcome percentages, because development is
          not a guarantee — it is a tracked trajectory.
        </p>

        {/* Success story template */}
        <div className="mt-14">
          <h3 className="font-display text-2xl">Success story — how we tell them</h3>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Every family story we publish follows the same structure, so the change is
            traceable, not anecdotal. This is the template, with one illustrative example.
          </p>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {/* The template */}
            <div className="rounded-3xl border border-dashed border-border bg-card p-6">
              <div className="text-xs uppercase tracking-widest text-muted-foreground">
                Template
              </div>
              <dl className="mt-4 space-y-4 text-sm">
                {[
                  { k: "Child profile", v: "Age, primary concern, diagnoses if any. No identifying details." },
                  { k: "Starting point", v: "What was happening before IND — therapies tried, parent state, daily reality." },
                  { k: "Phase entered", v: "Which of the 4 phases the family started in, and why." },
                  { k: "Driver targeted", v: "The dominant bottleneck addressed first — child, parent, or environment." },
                  { k: "Parent action", v: "The specific weekly practice the parent led at home." },
                  { k: "Signals observed", v: "Concrete, observable changes — not feelings, not promises." },
                  { k: "Where they are now", v: "Current phase, next driver, what comes after the Flightpath." },
                ].map((row) => (
                  <div key={row.k} className="grid grid-cols-3 gap-3">
                    <dt className="font-medium">{row.k}</dt>
                    <dd className="col-span-2 text-muted-foreground">{row.v}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Example */}
            <div className="rounded-3xl border border-border bg-secondary/40 p-6">
              <div className="text-xs uppercase tracking-widest text-muted-foreground">
                Example (illustrative)
              </div>
              <dl className="mt-4 space-y-4 text-sm">
                {[
                  { k: "Child profile", v: "Boy, age 4. Speech delay, frequent meltdowns, low eye contact." },
                  { k: "Starting point", v: "18 months of speech and OT. Parents exhausted, no shared plan, progress unclear." },
                  { k: "Phase entered", v: "Phase 1 — Connection, Engagement &amp; Regulation." },
                  { k: "Driver targeted", v: "Parent driver: emotional control under stress. Child driver: co-regulation." },
                  { k: "Parent action", v: "Two structured 10-minute regulation windows daily, woven into existing routine." },
                  { k: "Signals observed", v: "Meltdowns shorter and less frequent. Sustained eye contact during play returned within weeks." },
                  { k: "Where they are now", v: "Moved into Phase 2. Speech work now compounds because regulation is stable." },
                ].map((row) => (
                  <div key={row.k} className="grid grid-cols-3 gap-3">
                    <dt className="font-medium">{row.k}</dt>
                    <dd className="col-span-2 text-muted-foreground">{row.v}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 text-xs text-muted-foreground">
                Illustrative composite based on common Phase 1 patterns. Real stories are
                published only with full parent consent and identifying details removed.
              </p>
            </div>
          </div>
        </div>

        {/* Cohort highlights */}
        <div className="mt-14">
          <h3 className="font-display text-2xl">Cohort highlights — how we report</h3>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Beyond individual stories, we track movement at the cohort level. Each highlight
            states what we measured, the cohort it covers, and the time window — never a
            generic claim.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              {
                tag: "Cohort highlight template",
                m: "Metric measured",
                c: "Cohort definition (phase, age band, time window)",
                w: "What changed and what it does not claim",
              },
              {
                tag: "Engagement",
                m: "Weekly parent-action completion",
                c: "Active Flightpath families, last quarter",
                w: "Reflects parent execution rate, not child outcome.",
              },
              {
                tag: "Continuity",
                m: "Families completing a full phase before progression",
                c: "Phase 1 entrants, last 12 months",
                w: "Indicates sequence integrity, not therapy success rates.",
              },
            ].map((c) => (
              <div key={c.tag} className="rounded-3xl border border-border bg-card p-6">
                <div className="text-xs uppercase tracking-widest text-primary">{c.tag}</div>
                <div className="mt-3 font-display text-lg">{c.m}</div>
                <p className="mt-2 text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">Cohort:</span> {c.c}
                </p>
                <p className="mt-2 text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">Note:</span> {c.w}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Specific cohort numbers are published only when the underlying data is stable and
            reviewable. We'd rather say less than overstate.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-4xl px-5 pb-20 pt-20 text-center">

        <h2 className="font-display text-3xl leading-tight tracking-tight md:text-4xl">Ready for a structured pathway?</h2>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          Tell us about your child. We'll have a short, honest conversation to see whether
          our system is the right fit for your family right now.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg" className="rounded-full px-8">
            <Link to="/contact">Book an appointment</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="rounded-full px-8">
            <Link to="/chat">Talk to our assistant</Link>
          </Button>
        </div>
      </section>
    </SiteLayout>
  );
}
