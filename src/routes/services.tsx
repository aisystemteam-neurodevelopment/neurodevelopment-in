import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "What we help with — Institute of NeuroDevelopment" },
      {
        name: "description",
        content:
          "Autism, ADHD, speech delay, behavioural and learning challenges. We help parents create breakthroughs in speech, regulation, learning, behaviour, social skills and independence.",
      },
      { property: "og:title", content: "Services & areas we help with — IND" },
      { property: "og:description", content: "From speech delay to school-readiness, we structure the home as the child's most powerful development environment." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Services & areas we help with — IND" },
      { name: "twitter:description", content: "Autism, ADHD, speech delay, behaviour and learning challenges." },
    ],
  }),
  component: ServicesPage,
});

const areas: { slug: string; t: string; d: string }[] = [
  { slug: "speech-delay", t: "Speech Delay", d: "Speech delay can co-occur with swallowing disorders (Dysphagia) and motor speech disorders (Apraxia). We work on the drivers behind functional communication." },
  { slug: "hyperactivity", t: "Hyperactivity", d: "Unchecked hyperactivity in children can be a silent barrier — often unseen by parents until it shapes school, sleep and behaviour." },
  { slug: "learning-disability", t: "Learning disability", d: "Learning disabilities, including those alongside autism, present significant challenges in academics and everyday life." },
  { slug: "daily-living-difficulty", t: "Difficulty in daily living activities", d: "A common challenge for neurodiverse children — affecting their ability to perform routine tasks and maintain independence." },
  { slug: "social-behavioural-difficulty", t: "Social & behavioural difficulty", d: "Common challenges impacting interactions, friendships and emotional regulation across home, school and community." },
  { slug: "cognitive-delay", t: "Cognitive delay", d: "Cognitive delays affect how a child processes information and performs daily tasks — and respond well to structured, parent-led inputs." },
  { slug: "epilepsy", t: "Epilepsy", d: "Epilepsy, often seen alongside autism, can disrupt daily life. Coordinated medical and developmental care reduces stress and accelerates progress." },
  { slug: "cerebral-palsy", t: "Cerebral Palsy", d: "Cerebral palsy can affect movement, coordination and daily tasks — impacting independence and quality of life. We integrate development with therapy." },
];

const outcomes = [
  "Improved connection and engagement",
  "Better eye contact and responsiveness",
  "Reduced meltdowns and dysregulation",
  "Increased attention span and focus",
  "Better speech emergence and communication",
  "Stronger comprehension and learning readiness",
  "Improved play skills and imagination",
  "Better behaviour through regulation, not suppression",
  "School readiness and classroom adaptation",
  "Sustainable gains through home implementation",
];

function ServicesPage() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-3xl px-5 pt-16 pb-10">
        <h1 className="font-display text-5xl">What we help families with</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          The labels differ. The underlying drivers are the same. We work on the small set of
          capacities that actually decide whether a child's development stabilises,
          accelerates — or quietly diverges.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-12">
        <div className="grid gap-4 md:grid-cols-2">
          {areas.map((a) => (
            <Link
              key={a.slug}
              to="/treatments/$slug"
              params={{ slug: a.slug }}
              className="group block rounded-3xl border border-border bg-card p-6 transition-colors hover:bg-muted/40"
            >
              <h2 className="font-display text-xl">{a.t}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{a.d}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                Learn more
                <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-secondary/40 py-16">
        <div className="mx-auto max-w-5xl px-5">
          <h2 className="font-display text-3xl">Outcomes families typically work toward</h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            We never guarantee outcomes — honest practitioners cannot. These are the
            directions of progress families pursue inside the Breakthrough Flightpath.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {outcomes.map((o) => (
              <div key={o} className="rounded-2xl border border-border bg-background px-4 py-3 text-sm">
                {o}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-16 text-center">
        <h2 className="font-display text-3xl">Not sure where your child fits?</h2>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          That's usually the case. Tell us a little — our assistant or our team will
          help you figure out the next step.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg" className="rounded-full px-8">
            <Link to="/chat">Talk to us</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="rounded-full px-8">
            <Link to="/approach">See our approach</Link>
          </Button>
        </div>
      </section>
    </SiteLayout>
  );
}
