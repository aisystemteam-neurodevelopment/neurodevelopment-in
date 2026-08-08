import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const Route = createFileRoute("/faq")({
  head: () => ({
    links: [{ rel: "canonical", href: "https://neurodevelopment.in/faq" }],
    meta: [
      { title: "FAQ — Institute of NeuroDevelopment" },
      {
        name: "description",
        content:
          "Straight answers on slow progress, fragmented advice, and therapy dependency — and how IND's parent-led system changes the trajectory.",
      },
      { property: "og:title", content: "FAQ — IND" },
      {
        property: "og:description",
        content: "Straight answers on slow progress, fragmented advice, and therapy dependency.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "FAQ — IND" },
      {
        name: "twitter:description",
        content: "Straight answers on slow progress, fragmented advice, and therapy dependency.",
      },
    ],
  }),
  component: FaqPage,
});

type Faq = { q: string; a: string };

const slowProgress: Faq[] = [
  {
    q: "We've been in therapy for months — sometimes years — and progress feels slow. Why?",
    a: "Slow progress is rarely about effort. It usually means the underlying drivers — regulation, connection, communication, independence — are being worked on out of order, or only inside the therapy room. Real change compounds when the right driver is targeted, in sequence, across the 100+ waking hours your child spends at home.",
  },
  {
    q: "Will more sessions per week make things move faster?",
    a: "Usually not. Adding hours to a fragmented plan multiplies the fragmentation. Sequencing the right driver first — and embedding it in daily routines — moves the needle faster than stacking sessions.",
  },
  {
    q: "How soon will we see change with IND?",
    a: "Most families notice shifts in regulation and connection within the first few weeks because that's where the system starts. Communication and independence build from there over the 52-week Flightpath. We don't promise timelines — we promise structure and visible weekly progress.",
  },
];

const fragmented: Faq[] = [
  {
    q: "Every professional we meet says something different. Who do we listen to?",
    a: "That's the core problem with fragmented care — three specialists, three plans, no one owning the whole child. IND replaces that with one structured system and a single sequence: Regulation → Connection → Communication → Independence. You stop choosing between opinions and start executing one plan.",
  },
  {
    q: "We're already doing speech, OT, and special ed. Where does IND fit?",
    a: "IND doesn't replace them — it gives them a spine. Most therapies optimise a slice. The system organises the whole week around the right driver so each therapy actually compounds instead of pulling in different directions.",
  },
  {
    q: "How is this different from another therapy plan?",
    a: "It isn't a therapy plan. It's a developmental architecture for the home — phase, week, parent action, measurable signal. Therapies are inputs to it, not the centre of it.",
  },
];

const dependency: Faq[] = [
  {
    q: "Are we going to be in therapy forever?",
    a: "That's the trap of input-based care — endless sessions with no exit. The Flightpath is 52 weeks with a defined end. The goal is not lifelong dependency on professionals; it's a parent who can lead their child's development with confidence.",
  },
  {
    q: "What happens when the program ends?",
    a: "By the end, you own the framework. You know your child's drivers, you've run the system for a year, and you can adapt it as your child grows. Some families choose a second cycle for new goals — but that's a choice, not a dependency. And you can always connect with us or contact us — lifetime.",
  },
  {
    q: "Isn't this just shifting the work onto parents?",
    a: "Parents are already doing the work — usually without structure, often blaming themselves. IND gives that work a system, a sequence, and a guide. Less guesswork, fewer hours wasted on the wrong thing, more progress per week of effort.",
  },
];

const practical: Faq[] = [
  {
    q: "Is this online or in person?",
    a: "Both. Mode depends on your location and your child's needs. Our clinical home base is in Kolkata; families from 10+ countries work with us online.",
  },
  {
    q: "Which children is this for?",
    a: "Primarily ages 2–12 with autism-related challenges, ADHD, speech delay, behavioural difficulties, and broader social-emotional or learning concerns.",
  },
  {
    q: "Will my child be diagnosed online?",
    a: "Yes — we offer online diagnosis. Our team evaluates your child through structured online sessions, understands the full picture, and guides the next right step. In-person follow-up is offered when it adds clinical value, but it isn't required to get started.",
  },
  {
    q: "How much does it cost?",
    a: "The right plan depends on your child's current condition and the level of support needed. Our team understands the child first, then guides you to a suitable plan.",
  },
  {
    q: "Can you guarantee results?",
    a: "Yes — we guarantee specific outcomes, provided you regularly carry out the activities we teach you. The system works when it is run consistently at home. Show up with the weekly structure, log the activities, and the outcomes follow. Effort on your side + our framework = measurable progress.",
  },
];

function Section({ title, lead, items, startIndex }: { title: string; lead: string; items: Faq[]; startIndex: number }) {
  return (
    <section className="mx-auto max-w-3xl px-5 pb-12">
      <h2 className="font-display text-2xl">{title}</h2>
      <p className="mt-2 text-muted-foreground">{lead}</p>
      <Accordion type="single" collapsible className="mt-4 w-full">
        {items.map((f, i) => (
          <AccordionItem key={f.q} value={`f${startIndex + i}`}>
            <AccordionTrigger className="text-left font-display text-lg">{f.q}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}

function FaqPage() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-3xl px-5 pt-16 pb-10">
        <p className="text-sm uppercase tracking-widest text-muted-foreground">FAQ</p>
        <h1 className="mt-2 font-display text-5xl">Straight answers, no hype</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Most families come to us tired of slow progress, contradictory advice, and the feeling
          that therapy will never end. Here's how the IND system addresses each of those, honestly.
        </p>
      </section>

      <Section
        title="If progress feels slow"
        lead="Why effort isn't the problem — sequence is."
        items={slowProgress}
        startIndex={0}
      />
      <Section
        title="If the advice feels fragmented"
        lead="One sequence replaces a stack of opinions."
        items={fragmented}
        startIndex={slowProgress.length}
      />
      <Section
        title="If you're worried about dependency"
        lead="The Flightpath has an end. Parent leadership is the goal."
        items={dependency}
        startIndex={slowProgress.length + fragmented.length}
      />
      <Section
        title="Practical questions"
        lead="The everyday details parents ask before starting."
        items={practical}
        startIndex={slowProgress.length + fragmented.length + dependency.length}
      />

      <section className="mx-auto max-w-3xl px-5 pb-20">
        <div className="rounded-2xl border bg-card p-8">
          <h3 className="font-display text-2xl">Still unsure where you fit?</h3>
          <p className="mt-2 text-muted-foreground">
            Tell us about your child. We'll point you to the right starting phase — no pressure, no script.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              to="/contact"
              className="inline-flex h-10 items-center rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground hover:opacity-90"
            >
              Book an appointment
            </Link>
            <Link
              to="/approach"
              className="inline-flex h-10 items-center rounded-md border px-5 text-sm font-medium hover:bg-accent"
            >
              See the approach
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
