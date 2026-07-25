import { Quote } from "lucide-react";

type Story = {
  name: string;
  location: string;
  child: string;
  initials: string;
  photoTone: string; // background color for avatar
  starting: string;
  phase: string;
  outcomes: string[];
  quote: string;
  tier: string;
};

const stories: Story[] = [
  {
    name: "Anjali & Rohan M.",
    location: "Bengaluru, India",
    child: "Son, 4 yrs · ASD profile",
    initials: "AM",
    photoTone: "bg-sage text-sage-foreground",
    starting:
      "18 months of speech + OT in parallel. 6+ hrs/week of therapy, ₹38,000/month, meltdowns rising, no shared plan.",
    phase: "Entered Phase 1 — Connection, Engagement & Regulation",
    outcomes: [
      "Meltdowns down from 5–6/day to 1–2/day in 8 weeks",
      "Sustained eye contact during play returned within 6 weeks",
      "Moved into Phase 2 at month 5; speech work now compounds",
    ],
    quote:
      "For the first time in two years, we knew exactly what we were doing each week — and we could see it working.",
    tier: "Flightpath Essential",
  },
  {
    name: "Priya S.",
    location: "Dubai, UAE",
    child: "Daughter, 5 yrs · Speech delay",
    initials: "PS",
    photoTone: "bg-warm text-foreground",
    starting:
      "Tried three centres in two cities. Each gave a different plan. Parent confidence collapsing, child anxious about sessions.",
    phase: "Entered Phase 2 — Play, Adaptive Learning & Problem-Solving",
    outcomes: [
      "First 3-word spontaneous sentences in week 9",
      "Parent stopped 2 of 4 external therapies — sequence took over",
      "Cleared Phase 2 readiness signals in month 6",
    ],
    quote:
      "We stopped buying more sessions. We started owning the system. The change in our daughter — and in us — was structural.",
    tier: "Flightpath Elite",
  },
  {
    name: "Ramesh & Kavita D.",
    location: "Pune, India",
    child: "Son, 6 yrs · Executive function gaps",
    initials: "RD",
    photoTone: "bg-primary/15 text-primary",
    starting:
      "Bright child, struggling at school. ‘Try harder’ feedback from teachers. Family exhausted, evenings full of conflict.",
    phase: "Entered Phase 4 — Social-Emotional Mastery & Executive Function",
    outcomes: [
      "Homework conflict reduced from daily to ~1 day/week in 10 weeks",
      "Self-initiated morning routine by month 4",
      "School noted ‘visibly more independent’ in term review",
    ],
    quote:
      "We finally had a name for what was going on, a sequence to follow, and a coach who didn’t panic when we did.",
    tier: "Flightpath Core",
  },
];

export function TestimonialStories() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20">
      <div className="mx-auto max-w-2xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
          Parent stories · measurable outcomes
        </span>
        <h2 className="mt-4 font-display text-4xl">
          Three families. Three starting points. One structured pathway.
        </h2>
        <p className="mt-3 text-muted-foreground">
          We publish stories the way we run the system: starting point, phase entered,
          driver worked, signals observed. No miracles, no anonymous quotes — only
          what we measured.
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {stories.map((s) => (
          <article
            key={s.name}
            className="flex flex-col rounded-3xl border border-border bg-card p-6 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div
                className={`grid h-12 w-12 place-items-center rounded-full font-display text-lg ${s.photoTone}`}
                aria-hidden="true"
              >
                {s.initials}
              </div>
              <div>
                <div className="font-medium">{s.name}</div>
                <div className="text-xs text-muted-foreground">{s.location}</div>
              </div>
            </div>
            <div className="mt-3 text-xs uppercase tracking-widest text-primary">
              {s.tier}
            </div>
            <div className="mt-1 text-sm font-medium">{s.child}</div>

            <div className="mt-4 space-y-3 text-sm">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Starting point
                </div>
                <p className="mt-1 text-muted-foreground">{s.starting}</p>
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Phase entered
                </div>
                <p className="mt-1 text-muted-foreground">{s.phase}</p>
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Signals observed
                </div>
                <ul className="mt-1 space-y-1">
                  {s.outcomes.map((o) => (
                    <li key={o} className="flex gap-2 text-muted-foreground">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      <span>{o}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <blockquote className="mt-5 rounded-2xl bg-secondary/40 p-4 text-sm italic text-foreground">
              <Quote className="mb-2 h-4 w-4 text-primary" />
              {s.quote}
            </blockquote>
          </article>
        ))}
      </div>

      <p className="mt-6 text-xs text-muted-foreground">
        Names and locations changed where requested. All stories published with full parent
        consent. We do not publish outcome percentages, because development is a tracked
        trajectory — not a guarantee.
      </p>
    </section>
  );
}
