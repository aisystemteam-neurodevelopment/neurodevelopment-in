import { useState } from "react";
import { Quote } from "lucide-react";

type Lang = "en" | "bn";

type LocalizedStory = {
  name: string;
  location: string;
  initials: string;
  photoTone: string;
  tier: string;
  en: {
    location: string;
    child: string;
    starting: string;
    phase: string;
    outcomes: string[];
    quote: string;
    tier: string;
  };
  bn: {
    location: string;
    child: string;
    starting: string;
    phase: string;
    outcomes: string[];
    quote: string;
    tier: string;
  };
};

const stories: LocalizedStory[] = [
  {
    name: "Anjali & Rohan M.",
    location: "Bengaluru, India",
    initials: "AM",
    photoTone: "bg-sage text-sage-foreground",
    tier: "Flightpath Essential",
    en: {
      location: "Bengaluru, India",
      child: "Son, 4 yrs · ASD profile",
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
    bn: {
      location: "বেঙ্গালুরু, ভারত",
      child: "ছেলে, ৪ বছর · ASD প্রোফাইল",
      starting:
        "১৮ মাস ধরে একসাথে Speech ও OT চলছিল। সপ্তাহে ৬+ ঘণ্টা থেরাপি, মাসে ₹৩৮,০০০ খরচ, মেল্টডাউন বাড়ছিল, কোনো একটাও সাধারণ প্ল্যান ছিল না।",
      phase: "শুরু — Phase 1: Connection, Engagement ও Regulation",
      outcomes: [
        "৮ সপ্তাহে মেল্টডাউন দিনে ৫–৬ থেকে কমে ১–২",
        "৬ সপ্তাহে খেলার সময় চোখে চোখ রাখা ফিরে এলো",
        "৫ মাসে Phase 2-তে উত্তরণ; এখন speech work যোগ হয়ে এগোচ্ছে",
      ],
      quote:
        "দু'বছরে এই প্রথম, আমরা ঠিক জানতাম প্রতি সপ্তাহে কী করছি — আর সেটার ফলও চোখের সামনে দেখতে পাচ্ছিলাম।",
      tier: "Flightpath Essential",
    },
  },
  {
    name: "Priya S.",
    location: "Dubai, UAE",
    initials: "PS",
    photoTone: "bg-warm text-foreground",
    tier: "Flightpath Elite",
    en: {
      location: "Dubai, UAE",
      child: "Daughter, 5 yrs · Speech delay",
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
    bn: {
      location: "দুবাই, UAE",
      child: "মেয়ে, ৫ বছর · Speech delay",
      starting:
        "দুই শহরে তিনটি সেন্টারে চেষ্টা করেছি। প্রত্যেকেই আলাদা প্ল্যান দিয়েছে। অভিভাবক হিসেবে আত্মবিশ্বাস ভেঙে পড়ছিল, মেয়ে সেশন নিয়ে উদ্বিগ্ন থাকত।",
      phase: "শুরু — Phase 2: Play, Adaptive Learning ও Problem-Solving",
      outcomes: [
        "৯ম সপ্তাহেই প্রথম ৩ শব্দের spontaneous বাক্য",
        "৪টির মধ্যে ২টি বাইরের থেরাপি বন্ধ — sequence-ই দায়িত্ব নিয়েছে",
        "৬ মাসে Phase 2 readiness signals পূরণ",
      ],
      quote:
        "আমরা আরও সেশন কিনতে বন্ধ করেছি, system-টা নিজেদের হাতে নিয়েছি। মেয়ের পরিবর্তন — আর আমাদের পরিবর্তন — দুটোই ভিতরের।",
      tier: "Flightpath Elite",
    },
  },
  {
    name: "Ramesh & Kavita D.",
    location: "Pune, India",
    initials: "RD",
    photoTone: "bg-primary/15 text-primary",
    tier: "Flightpath Core",
    en: {
      location: "Pune, India",
      child: "Son, 6 yrs · Executive function gaps",
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
    bn: {
      location: "পুনে, ভারত",
      child: "ছেলে, ৬ বছর · Executive function-এ ঘাটতি",
      starting:
        "মেধাবী ছেলে, স্কুলে কষ্ট করছিল। শিক্ষকদের একটাই কথা — ‘আরও চেষ্টা করো’। পরিবার ক্লান্ত, সন্ধ্যা মানেই সংঘাত।",
      phase: "শুরু — Phase 4: Social-Emotional Mastery ও Executive Function",
      outcomes: [
        "১০ সপ্তাহে homework নিয়ে সংঘাত প্রতিদিন থেকে কমে সপ্তাহে ~১ দিন",
        "৪ মাসে নিজে থেকেই morning routine শুরু",
        "টার্ম রিভিউতে স্কুল লিখেছে — ‘স্পষ্টতই অনেক বেশি স্বনির্ভর’",
      ],
      quote:
        "অবশেষে সমস্যার একটা নাম পেলাম, অনুসরণ করার মতো একটা sequence পেলাম, আর একজন coach পেলাম যিনি আমাদের ঘাবড়ানোর সময়েও ঘাবড়াননি।",
      tier: "Flightpath Core",
    },
  },
];

const copy = {
  en: {
    eyebrow: "Parent stories · measurable outcomes",
    heading: "Three families. Three starting points. One structured pathway.",
    intro:
      "We publish stories the way we run the system: starting point, phase entered, driver worked, signals observed. No miracles, no anonymous quotes — only what we measured.",
    startingPoint: "Starting point",
    phaseEntered: "Phase entered",
    signals: "Signals observed",
    footer:
      "Names and locations changed where requested. All stories published with full parent consent. We do not publish outcome percentages, because development is a tracked trajectory — not a guarantee.",
    toggleEn: "English",
    toggleBn: "বাংলা",
  },
  bn: {
    eyebrow: "অভিভাবকদের গল্প · মাপা যায় এমন ফলাফল",
    heading: "তিনটি পরিবার। তিনটি শুরু। একটাই কাঠামোবদ্ধ পথ।",
    intro:
      "আমরা যেভাবে system চালাই, ঠিক সেভাবেই গল্প প্রকাশ করি: শুরুর অবস্থা, যে phase-এ ঢোকা হলো, যে driver-এ কাজ হলো, যে signals দেখা গেল। কোনো অলৌকিক দাবি নেই, কোনো অজানা কোট নেই — শুধু যা মাপা হয়েছে।",
    startingPoint: "শুরুর অবস্থা",
    phaseEntered: "যে Phase-এ ঢোকা হলো",
    signals: "যে signals দেখা গেল",
    footer:
      "অনুরোধ অনুযায়ী কোথাও কোথাও নাম ও অবস্থান পরিবর্তন করা হয়েছে। সব গল্প অভিভাবকদের সম্মতি নিয়েই প্রকাশিত। আমরা ফলাফলের শতাংশ প্রকাশ করি না, কারণ শিশু-বিকাশ একটি tracked trajectory — কোনো গ্যারান্টি নয়।",
    toggleEn: "English",
    toggleBn: "বাংলা",
  },
};

export function TestimonialStories() {
  const [lang, setLang] = useState<Lang>("en");
  const t = copy[lang];
  return (
    <section className="mx-auto max-w-6xl px-5 py-20">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
            {t.eyebrow}
          </span>
          <h2 className="mt-4 font-display text-4xl">{t.heading}</h2>
          <p className="mt-3 text-muted-foreground">{t.intro}</p>
        </div>
        <div
          role="group"
          aria-label="Language"
          className="inline-flex shrink-0 rounded-full border border-border bg-card p-1 text-xs"
        >
          <button
            type="button"
            onClick={() => setLang("en")}
            aria-pressed={lang === "en"}
            className={`rounded-full px-3 py-1 transition ${lang === "en" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
          >
            English
          </button>
          <button
            type="button"
            onClick={() => setLang("bn")}
            aria-pressed={lang === "bn"}
            className={`rounded-full px-3 py-1 transition ${lang === "bn" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
          >
            বাংলা
          </button>
        </div>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {stories.map((s) => {
          const L = s[lang];
          return (
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
                <div className="text-xs text-muted-foreground">{L.location}</div>
              </div>
            </div>
            <div className="mt-3 text-xs uppercase tracking-widest text-primary">
              {L.tier}
            </div>
            <div className="mt-1 text-sm font-medium">{L.child}</div>

            <div className="mt-4 space-y-3 text-sm">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {t.startingPoint}
                </div>
                <p className="mt-1 text-muted-foreground">{L.starting}</p>
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {t.phaseEntered}
                </div>
                <p className="mt-1 text-muted-foreground">{L.phase}</p>
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {t.signals}
                </div>
                <ul className="mt-1 space-y-1">
                  {L.outcomes.map((o) => (
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
              {L.quote}
            </blockquote>
          </article>
          );
        })}
      </div>

      <p className="mt-6 text-xs text-muted-foreground">{t.footer}</p>
    </section>
  );
}
