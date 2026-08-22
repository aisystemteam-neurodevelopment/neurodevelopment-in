import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { Hourglass, ListOrdered, Target, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/approach")({
  head: () => ({
    links: [{ rel: "canonical", href: "https://neurodevelopment.in/approach" }],
    meta: [
      { title: "Our Approach — Parent-Led NeuroDevelopment | IND" },
      {
        name: "description",
        content:
          "The 4-Phase Sequential Flightpath: drivers, not labels. One bottleneck at a time, in a structured parent-led developmental architecture.",
      },
      { property: "og:title", content: "Our approach — The Parent-Led NeuroDevelopment System" },
      { property: "og:description", content: "From fragmented intervention to structured, measurable, self-sustaining developmental progress." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Our approach — IND" },
      { name: "twitter:description", content: "Drivers, not labels. The 4-Phase Sequential Flightpath." },
    ],
  }),
  component: ApproachPage,
});

function ApproachPage() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-3xl px-5 pt-16 pb-10">
        <h1 className="font-display text-5xl">Diagnoses describe patterns. <span className="text-primary">Drivers determine outcomes.</span></h1>
        <p className="mt-5 text-lg text-muted-foreground">
          Our approach is a structured developmental architecture, not a menu of therapies. We
          identify the dominant bottleneck, strengthen the missing driver, monitor progress,
          and only move forward when readiness is demonstrated.
        </p>
      </section>

      {/* Foundational beliefs */}
      <section className="mx-auto max-w-5xl px-5 py-10">
        <h2 className="font-display text-3xl">What we believe</h2>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {[
            "Development is continuous, not session-based.",
            "Real change happens in daily life, not only in therapy rooms.",
            "Parents are the primary drivers of child development.",
            "Sequence matters more than intensity.",
            "One dominant constraint must be solved at a time.",
            "Measurable progress matters more than activity.",
            "Outcomes should be designed, not hoped for.",
            "The goal is independence, not lifelong dependency.",
          ].map((b) => (
            <div key={b} className="rounded-2xl border border-border bg-card px-4 py-3 text-sm">
              {b}
            </div>
          ))}
        </div>
      </section>

      {/* The Approach: three operating models */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
            The approach
          </span>
          <h2 className="mt-4 font-display text-4xl">
            Three models that decide how we work
          </h2>
          <p className="mt-3 text-muted-foreground">
            The system runs on three operating models: how we count what's being lost, how
            we order the work, and how we choose what to work on first. Together they replace
            guesswork with a defensible logic.
          </p>
        </div>

        {/* Invisible loss */}
        <div className="mt-10 grid gap-6 md:grid-cols-5 md:items-start">
          <div className="md:col-span-2">
            <div className="inline-flex items-center gap-2 text-primary">
              <Hourglass className="h-5 w-5" />
              <div className="font-display text-sm uppercase tracking-widest">Model 01</div>
            </div>
            <h3 className="mt-2 font-display text-2xl">The Invisible Loss</h3>
            <p className="mt-2 text-muted-foreground">
              Developmental delay carries a cost that doesn't show up on any invoice: the
              quiet drain on the developmental window itself. Until that future cost is named,
              urgency stays weak and effort stays scattered.
            </p>
          </div>
          <div className="md:col-span-3 grid gap-3 sm:grid-cols-2">
            {[
              { t: "Time is the asset", d: "Months inside the developmental window are non-recoverable. Activity does not buy time back." },
              { t: "Fragmentation compounds", d: "Three plans, no spine — the loss is not in any single session, it's in the gaps between them." },
              { t: "Cost is cumulative", d: "Small drifts add up across years. The bill arrives later, in capability not gained." },
              { t: "Naming the loss", d: "We make the cost visible so families can act on it — not from fear, from clarity." },
            ].map((c) => (
              <div key={c.t} className="rounded-2xl border border-border bg-card p-4">
                <div className="font-display text-base">{c.t}</div>
                <p className="mt-1 text-sm text-muted-foreground">{c.d}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Sequence is law */}
        <div className="mt-14 grid gap-6 md:grid-cols-5 md:items-start">
          <div className="md:col-span-2">
            <div className="inline-flex items-center gap-2 text-primary">
              <ListOrdered className="h-5 w-5" />
              <div className="font-display text-sm uppercase tracking-widest">Model 02</div>
            </div>
            <h3 className="mt-2 font-display text-2xl">Sequence is law</h3>
            <p className="mt-2 text-muted-foreground">
              Development is not a menu — it is an order. Skipping the foundation in
              search of visible skills is the most common reason progress stalls. We move only
              when the prerequisite is in place.
            </p>
            <div className="mt-4 rounded-2xl border border-border bg-secondary/40 p-4 text-sm">
              <span className="font-medium">The sequence:</span> Regulation → Connection
              → Communication → Independence.
            </div>
          </div>
          <div className="md:col-span-3 space-y-3">
            {[
              { rule: "No speech work before regulation.", why: "An unregulated nervous system cannot hold language acquisition." },
              { rule: "No social skills before thinking.", why: "Social fluency is built on flexible thinking, not scripts." },
              { rule: "No advanced learning before engagement.", why: "Without sustained engagement, learning input never becomes capacity." },
              { rule: "No new phase without demonstrated readiness.", why: "We advance on signals from the child, not on calendar weeks." },
            ].map((r) => (
              <div key={r.rule} className="flex gap-4 rounded-2xl border border-border bg-card p-4">
                <div className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-border bg-background text-xs font-medium">
                  &times;
                </div>
                <div>
                  <div className="font-medium">{r.rule}</div>
                  <p className="mt-1 text-sm text-muted-foreground">{r.why}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottleneck → Driver → Outcomes */}
        <div className="mt-14 grid gap-6 md:grid-cols-5 md:items-start">
          <div className="md:col-span-2">
            <div className="inline-flex items-center gap-2 text-primary">
              <Target className="h-5 w-5" />
              <div className="font-display text-sm uppercase tracking-widest">Model 03</div>
            </div>
            <h3 className="mt-2 font-display text-2xl">
              Dominant bottleneck → driver → outcomes
            </h3>
            <p className="mt-2 text-muted-foreground">
              We do not work on every weakness at once. We find the single dominant constraint
              for this child, this week — the bottleneck whose removal unlocks the most
              development — and route a specific driver against it. That is what produces
              measurable outcomes.
            </p>
          </div>
          <div className="md:col-span-3">
            <div className="grid gap-3 md:grid-cols-3">
              {[
                {
                  step: "01",
                  t: "Dominant bottleneck",
                  d: "The one constraint, today, that holds the most other progress hostage.",
                },
                {
                  step: "02",
                  t: "Driver targeted",
                  d: "A specific child, parent, or environment driver chosen to relieve that constraint.",
                },
                {
                  step: "03",
                  t: "Outcomes observed",
                  d: "A defined signal we measure week on week. If it doesn't move, we re-diagnose.",
                },
              ].map((s) => (
                <div key={s.step} className="rounded-2xl border border-border bg-card p-4">
                  <div className="font-display text-xs uppercase tracking-widest text-primary">
                    {s.step}
                  </div>
                  <div className="mt-1 font-display text-lg">{s.t}</div>
                  <p className="mt-1 text-sm text-muted-foreground">{s.d}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 rounded-2xl border border-dashed border-border bg-secondary/40 p-5 text-sm">
              <div className="text-xs uppercase tracking-widest text-muted-foreground">
                Worked example
              </div>
              <p className="mt-2">
                <span className="font-medium">Bottleneck:</span> child cannot sit through a meal
                without dysregulation.
              </p>
              <p className="mt-1">
                <span className="font-medium">Driver:</span> parent driver of co-regulation
                consistency — a structured 10-minute regulation window before meals.
              </p>
              <p className="mt-1">
                <span className="font-medium">Outcome signal:</span> meal-time meltdowns measured
                weekly. When the signal shifts, we re-rank the next bottleneck.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Three driver groups */}
      <section className="mx-auto max-w-6xl px-5 py-14">
        <h2 className="font-display text-3xl">The three driver systems</h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Every child's trajectory is shaped by three interlocking systems. We work all
          three — not the label.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            {
              t: "Child drivers",
              d: "Engagement, regulation, play & exploration, communication, thinking & problem-solving, focus, behavioural flexibility, social-emotional integration.",
            },
            {
              t: "Parent drivers",
              d: "Emotional control, stress resilience, developmental clarity, relational alignment, handling competence, decisive agency, action consistency, ownership.",
            },
            {
              t: "Environment drivers",
              d: "Physical and emotional safety, predictable structure, opportunity density, sensory balance, caregiver coordination, environmental consistency.",
            },
          ].map((c) => (
            <div key={c.t} className="rounded-3xl border border-border bg-card p-6">
              <div className="font-display text-xl">{c.t}</div>
              <p className="mt-2 text-sm text-muted-foreground">{c.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Flightpath */}
      <section className="bg-secondary/40 py-16">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="font-display text-3xl">The 4-Phase Sequential Flightpath</h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Sequence is law. No speech before regulation. No social skills before thinking.
            No advanced learning before engagement and stability.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-4">
            {[
              { n: "Phase 1", t: "Connection, Engagement & Regulation", d: "Build the foundation: attunement, calm, joint attention, regulated days." },
              { n: "Phase 2", t: "Play, Adaptive Learning & Problem-Solving", d: "Curiosity, exploration, daily-living capacity, flexible thinking." },
              { n: "Phase 3", t: "Thinking-Based Speech & Expression", d: "Functional, intent-driven communication — not rote scripts." },
              { n: "Phase 4", t: "Social-Emotional Mastery & Executive Function", d: "Independence, social fluency, life-ready executive skills." },
            ].map((p) => (
              <div key={p.n} className="rounded-2xl border border-background/20 bg-background p-5">
                <div className="font-display text-sm text-primary">{p.n}</div>
                <div
                  className="mt-1 font-display text-lg"
                  dangerouslySetInnerHTML={{ __html: p.t }}
                />
                <p
                  className="mt-2 text-sm text-muted-foreground"
                  dangerouslySetInnerHTML={{ __html: p.d }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* System logic */}
      <section className="mx-auto max-w-5xl px-5 py-16">
        <h2 className="font-display text-3xl">How the system runs</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {[
            { t: "Identify the dominant bottleneck", d: "We diagnose the constraint, not the symptom. The right driver first." },
            { t: "Strengthen the missing driver", d: "Targeted, parent-led action across home, environment, and routines." },
            { t: "Monitor progress, not activity", d: "Observable markers and monthly check-ins replace 'we're doing a lot'." },
            { t: "Move only on readiness", d: "We advance phases when the child is genuinely ready — never on a calendar." },
            { t: "Parent ownership over expert dependence", d: "We train you to lead. Independence is the endpoint, for child and family." },
            { t: "Honest commitments", d: "Evaluation can start online, with in-person follow-up in Kolkata when it helps. We don't sell miracle guarantees — we commit to clarity, structure, and full effort." },
          ].map((c) => (
            <div key={c.t} className="rounded-2xl border border-border bg-card p-5">
              <div className="font-display text-lg">{c.t}</div>
              <p className="mt-2 text-sm text-muted-foreground">{c.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Parent transformation arc */}
      <section className="bg-secondary/40 py-16">
        <div className="mx-auto max-w-5xl px-5">
          <h2 className="font-display text-3xl">The parent transformation arc</h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            The system is designed around an identity shift: the parent becomes the growth engine.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-2 text-sm">
            {["Confusion", "Insight", "Trust", "Ownership", "Mastery", "Leadership"].map((step, i, a) => (
              <div key={step} className="flex items-center gap-2">
                <span className="rounded-full border border-border bg-background px-4 py-2 font-medium">{step}</span>
                {i < a.length - 1 && <span className="text-muted-foreground">→</span>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-20 text-center">
        <h2 className="font-display text-3xl">See if the system fits your family</h2>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          A short, structured conversation will tell us — and you — whether this is
          the right next step right now.
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
