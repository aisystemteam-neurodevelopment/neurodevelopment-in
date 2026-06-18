import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const Route = createFileRoute("/faq")({
  head: () => ({
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

type Lang = "en" | "bn";
type Faq = { en: { q: string; a: string }; bn: { q: string; a: string } };

const slowProgress: Faq[] = [
  {
    en: {
      q: "We've been in therapy for months — sometimes years — and progress feels slow. Why?",
      a: "Slow progress is rarely about effort. It usually means the underlying drivers — regulation, connection, communication, independence — are being worked on out of order, or only inside the therapy room. Real change compounds when the right driver is targeted, in sequence, across the 100+ waking hours your child spends at home.",
    },
    bn: {
      q: "মাস — কখনো বছর — ধরে থেরাপি করছি, কিন্তু অগ্রগতি ধীর মনে হচ্ছে। কেন?",
      a: "ধীর অগ্রগতির আসল কারণ পরিশ্রমের অভাব নয়। সাধারণত মূল drivers — regulation, connection, communication, independence — ভুল ক্রমে কাজ হচ্ছে, অথবা শুধু থেরাপি রুমের মধ্যেই সীমাবদ্ধ থাকছে। সঠিক driver-এ, সঠিক sequence-এ, এবং বাড়িতে শিশুর প্রতিদিনের ১০০+ জাগ্রত ঘণ্টায় কাজ হলে তবেই পরিবর্তন জমতে শুরু করে।",
    },
  },
  {
    en: {
      q: "Will more sessions per week make things move faster?",
      a: "Usually not. Adding hours to a fragmented plan multiplies the fragmentation. Sequencing the right driver first — and embedding it in daily routines — moves the needle faster than stacking sessions.",
    },
    bn: {
      q: "সপ্তাহে আরও বেশি সেশন নিলে কি দ্রুত উন্নতি হবে?",
      a: "সাধারণত না। ভেঙে যাওয়া প্ল্যানে আরও ঘণ্টা যোগ করলে ভাঙনটাই বাড়ে। আগে সঠিক driver-কে sequence-এ আনা — এবং সেটাকে দৈনন্দিন routine-এ ঢুকিয়ে দেওয়া — সেশন বাড়ানোর চেয়ে অনেক দ্রুত ফল দেয়।",
    },
  },
  {
    en: {
      q: "How soon will we see change with IND?",
      a: "Most families notice shifts in regulation and connection within the first few weeks because that's where the system starts. Communication and independence build from there over the 52-week Flightpath. We don't promise timelines — we promise structure and visible weekly progress.",
    },
    bn: {
      q: "IND-এ কত তাড়াতাড়ি পরিবর্তন দেখা যাবে?",
      a: "বেশিরভাগ পরিবার প্রথম কয়েক সপ্তাহেই regulation ও connection-এ পরিবর্তন লক্ষ্য করেন, কারণ system এখান থেকেই শুরু হয়। এরপর ৫২-সপ্তাহের Flightpath ধরে communication ও independence গড়ে ওঠে। আমরা timeline-এর প্রতিশ্রুতি দিই না — আমরা প্রতিশ্রুতি দিই কাঠামো এবং প্রতি সপ্তাহে দৃশ্যমান অগ্রগতির।",
    },
  },
];

const fragmented: Faq[] = [
  {
    en: {
      q: "Every professional we meet says something different. Who do we listen to?",
      a: "That's the core problem with fragmented care — three specialists, three plans, no one owning the whole child. IND replaces that with one structured system and a single sequence: Regulation → Connection → Communication → Independence. You stop choosing between opinions and start executing one plan.",
    },
    bn: {
      q: "যত পেশাদারের সাথে দেখা করি, প্রত্যেকে আলাদা কথা বলেন। কাকে শুনব?",
      a: "এটাই খণ্ড-খণ্ড চিকিৎসার মূল সমস্যা — তিন বিশেষজ্ঞ, তিন প্ল্যান, কেউ পুরো শিশুর দায়িত্ব নিচ্ছেন না। IND এর জায়গায় দেয় একটাই কাঠামোবদ্ধ system এবং একটাই sequence: Regulation → Connection → Communication → Independence। মতামতের মধ্যে বেছে নেওয়া বন্ধ করে, একটাই প্ল্যান কার্যকর করা শুরু হয়।",
    },
  },
  {
    en: {
      q: "We're already doing speech, OT, and special ed. Where does IND fit?",
      a: "IND doesn't replace them — it gives them a spine. Most therapies optimise a slice. The system organises the whole week around the right driver so each therapy actually compounds instead of pulling in different directions.",
    },
    bn: {
      q: "আমরা এখনই speech, OT, special ed করছি। IND এর মধ্যে কোথায় বসে?",
      a: "IND এগুলোকে প্রতিস্থাপন করে না — মেরুদণ্ড দেয়। বেশিরভাগ থেরাপি একটি অংশকে optimise করে। System পুরো সপ্তাহকে সঠিক driver ঘিরে সাজায়, যাতে প্রতিটি থেরাপি আলাদা দিকে না টেনে একসাথে যোগ হয়ে এগোয়।",
    },
  },
  {
    en: {
      q: "How is this different from another therapy plan?",
      a: "It isn't a therapy plan. It's a developmental architecture for the home — phase, week, parent action, measurable signal. Therapies are inputs to it, not the centre of it.",
    },
    bn: {
      q: "এটা আর-একটা থেরাপি প্ল্যান থেকে আলাদা কীভাবে?",
      a: "এটা থেরাপি প্ল্যান নয়। এটা বাড়ির জন্য একটা developmental architecture — phase, week, অভিভাবকের action, মাপা যায় এমন signal। থেরাপিগুলো এর input — কেন্দ্র নয়।",
    },
  },
];

const dependency: Faq[] = [
  {
    en: {
      q: "Are we going to be in therapy forever?",
      a: "That's the trap of input-based care — endless sessions with no exit. The Flightpath is 52 weeks with a defined end. The goal is not lifelong dependency on professionals; it's a parent who can lead their child's development with confidence.",
    },
    bn: {
      q: "আমরা কি সারাজীবন থেরাপির মধ্যে থাকব?",
      a: "ইনপুট-নির্ভর চিকিৎসার এটাই ফাঁদ — অশেষ সেশন, কোনো বেরোনোর পথ নেই। Flightpath ৫২ সপ্তাহের, একটা নির্দিষ্ট শেষ আছে। লক্ষ্য পেশাদারদের উপর আজীবন নির্ভরশীলতা নয় — লক্ষ্য এমন একজন অভিভাবক, যিনি আত্মবিশ্বাসের সাথে নিজের সন্তানের বিকাশকে নেতৃত্ব দিতে পারেন।",
    },
  },
  {
    en: {
      q: "What happens when the program ends?",
      a: "By the end, you own the framework. You know your child's drivers, you've run the system for a year, and you can adapt it as your child grows. Some families choose a second cycle for new goals — but that's a choice, not a dependency.",
    },
    bn: {
      q: "প্রোগ্রাম শেষ হলে কী হবে?",
      a: "শেষে framework-টা আপনার নিজের হাতে থাকে। আপনি জানেন সন্তানের drivers, এক বছর ধরে system চালিয়েছেন, এবং সন্তান বড় হলে সেটা মানিয়ে নিতে পারেন। কিছু পরিবার নতুন লক্ষ্যের জন্য দ্বিতীয় cycle বেছে নেন — কিন্তু সেটা পছন্দ, নির্ভরশীলতা নয়।",
    },
  },
  {
    en: {
      q: "Isn't this just shifting the work onto parents?",
      a: "Parents are already doing the work — usually without structure, often blaming themselves. IND gives that work a system, a sequence, and a guide. Less guesswork, fewer hours wasted on the wrong thing, more progress per week of effort.",
    },
    bn: {
      q: "এটা কি কেবল অভিভাবকদের ঘাড়ে কাজ চাপানো নয়?",
      a: "অভিভাবকরা এমনিতেই কাজটা করছেন — সাধারণত কাঠামো ছাড়া, প্রায়ই নিজেদের দোষ দিতে দিতে। IND সেই কাজকে দেয় একটা system, একটা sequence, এবং একজন guide। কম অনুমান, ভুল জিনিসে কম ঘণ্টা নষ্ট, প্রতি সপ্তাহের চেষ্টার বিনিময়ে বেশি অগ্রগতি।",
    },
  },
];

const practical: Faq[] = [
  {
    en: {
      q: "Is this online or in person?",
      a: "Both. Mode depends on your location and your child's needs. Our clinical home base is in Kolkata; families from 10+ countries work with us online.",
    },
    bn: {
      q: "এটা অনলাইন না সরাসরি?",
      a: "দুটোই। মাধ্যম নির্ভর করে আপনার অবস্থান ও সন্তানের প্রয়োজনের উপর। আমাদের clinical home base কলকাতায়; ১০+ দেশের পরিবার আমাদের সাথে online কাজ করেন।",
    },
  },
  {
    en: {
      q: "Which children is this for?",
      a: "Primarily ages 2–12 with autism-related challenges, ADHD, speech delay, behavioural difficulties, and broader social-emotional or learning concerns.",
    },
    bn: {
      q: "এটা কোন শিশুদের জন্য?",
      a: "মূলত ২–১২ বছর বয়সী শিশু, যাদের autism-সংক্রান্ত চ্যালেঞ্জ, ADHD, speech delay, আচরণগত সমস্যা, কিংবা বৃহত্তর social-emotional বা শেখার সমস্যা রয়েছে।",
    },
  },
  {
    en: {
      q: "Will my child be diagnosed online?",
      a: "No. Diagnosis requires in-person evaluation. Online, we focus on understanding your child and guiding the next right step.",
    },
    bn: {
      q: "আমার সন্তানের diagnosis কি অনলাইনে হবে?",
      a: "না। Diagnosis-এর জন্য সরাসরি মূল্যায়ন প্রয়োজন। অনলাইনে আমরা সন্তানকে বোঝা এবং পরবর্তী সঠিক পদক্ষেপের দিকনির্দেশ দেওয়াকেই গুরুত্ব দিই।",
    },
  },
  {
    en: {
      q: "How much does it cost?",
      a: "The right plan depends on your child's current condition and the level of support needed. Our team understands the child first, then guides you to a suitable plan.",
    },
    bn: {
      q: "খরচ কত?",
      a: "সঠিক প্ল্যান নির্ভর করে আপনার সন্তানের বর্তমান অবস্থা এবং প্রয়োজনীয় সহায়তার মাত্রার উপর। আমাদের team প্রথমে সন্তানকে বোঝে, এরপর উপযুক্ত প্ল্যানের দিকে গাইড করে।",
    },
  },
  {
    en: {
      q: "Can you guarantee results?",
      a: "No — and we never will. Anyone guaranteeing specific outcomes in child development is not being honest. We promise a clear system, weekly structure, and our full effort.",
    },
    bn: {
      q: "ফলাফলের গ্যারান্টি দিতে পারেন?",
      a: "না — এবং কখনোই দেব না। শিশু-বিকাশে নির্দিষ্ট ফলাফলের গ্যারান্টি যিনি দেন, তিনি সৎ নন। আমরা প্রতিশ্রুতি দিই একটি স্পষ্ট system, সাপ্তাহিক কাঠামো এবং আমাদের পূর্ণ চেষ্টার।",
    },
  },
];

const pageCopy = {
  en: {
    eyebrow: "FAQ",
    h1: "Straight answers, no hype",
    intro:
      "Most families come to us tired of slow progress, contradictory advice, and the feeling that therapy will never end. Here's how the IND system addresses each of those, honestly.",
    s1Title: "If progress feels slow",
    s1Lead: "Why effort isn't the problem — sequence is.",
    s2Title: "If the advice feels fragmented",
    s2Lead: "One sequence replaces a stack of opinions.",
    s3Title: "If you're worried about dependency",
    s3Lead: "The Flightpath has an end. Parent leadership is the goal.",
    s4Title: "Practical questions",
    s4Lead: "The everyday details parents ask before starting.",
    ctaTitle: "Still unsure where you fit?",
    ctaBody: "Tell us about your child. We'll point you to the right starting phase — no pressure, no script.",
    ctaPrimary: "Book an appointment",
    ctaSecondary: "See the approach",
  },
  bn: {
    eyebrow: "FAQ",
    h1: "সরাসরি উত্তর, কোনো অতিরঞ্জন নেই",
    intro:
      "বেশিরভাগ পরিবার আমাদের কাছে আসেন ধীর অগ্রগতি, পরস্পরবিরোধী পরামর্শ, এবং থেরাপি কখনো শেষ হবে না — এই ক্লান্তি নিয়ে। IND system প্রতিটির উত্তর কীভাবে দেয়, সৎভাবে বললাম।",
    s1Title: "অগ্রগতি ধীর মনে হলে",
    s1Lead: "সমস্যা চেষ্টায় নয় — sequence-এ।",
    s2Title: "পরামর্শ খণ্ড-খণ্ড মনে হলে",
    s2Lead: "মতামতের স্তূপের জায়গায় একটাই sequence।",
    s3Title: "নির্ভরশীলতা নিয়ে চিন্তা থাকলে",
    s3Lead: "Flightpath-এর একটা শেষ আছে। লক্ষ্য — অভিভাবকের নেতৃত্ব।",
    s4Title: "বাস্তব প্রশ্ন",
    s4Lead: "শুরু করার আগে অভিভাবকরা যা সাধারণত জানতে চান।",
    ctaTitle: "এখনো নিশ্চিত নন কোথায় ফিট করেন?",
    ctaBody: "সন্তানের কথা আমাদের জানান। আমরা সঠিক শুরুর phase দেখিয়ে দেব — কোনো চাপ নেই, কোনো script নেই।",
    ctaPrimary: "Appointment নিন",
    ctaSecondary: "Approach দেখুন",
  },
};

function Section({
  title,
  lead,
  items,
  startIndex,
  lang,
}: {
  title: string;
  lead: string;
  items: Faq[];
  startIndex: number;
  lang: Lang;
}) {
  return (
    <section className="mx-auto max-w-3xl px-5 pb-12">
      <h2 className="font-display text-2xl">{title}</h2>
      <p className="mt-2 text-muted-foreground">{lead}</p>
      <Accordion type="single" collapsible className="mt-4 w-full">
        {items.map((f, i) => (
          <AccordionItem key={f.en.q} value={`f${startIndex + i}`}>
            <AccordionTrigger className="text-left font-display text-lg">{f[lang].q}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">{f[lang].a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}

function FaqPage() {
  const [lang, setLang] = useState<Lang>("en");
  const t = pageCopy[lang];
  return (
    <SiteLayout>
      <section className="mx-auto max-w-3xl px-5 pt-16 pb-10">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-widest text-muted-foreground">{t.eyebrow}</p>
            <h1 className="mt-2 font-display text-5xl">{t.h1}</h1>
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
        <p className="mt-4 text-lg text-muted-foreground">{t.intro}</p>
      </section>

      <Section
        title={t.s1Title}
        lead={t.s1Lead}
        items={slowProgress}
        startIndex={0}
        lang={lang}
      />
      <Section
        title={t.s2Title}
        lead={t.s2Lead}
        items={fragmented}
        startIndex={slowProgress.length}
        lang={lang}
      />
      <Section
        title={t.s3Title}
        lead={t.s3Lead}
        items={dependency}
        startIndex={slowProgress.length + fragmented.length}
        lang={lang}
      />
      <Section
        title={t.s4Title}
        lead={t.s4Lead}
        items={practical}
        startIndex={slowProgress.length + fragmented.length + dependency.length}
        lang={lang}
      />

      <section className="mx-auto max-w-3xl px-5 pb-20">
        <div className="rounded-2xl border bg-card p-8">
          <h3 className="font-display text-2xl">{t.ctaTitle}</h3>
          <p className="mt-2 text-muted-foreground">{t.ctaBody}</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              to="/contact"
              className="inline-flex h-10 items-center rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground hover:opacity-90"
            >
              {t.ctaPrimary}
            </Link>
            <Link
              to="/approach"
              className="inline-flex h-10 items-center rounded-md border px-5 text-sm font-medium hover:bg-accent"
            >
              {t.ctaSecondary}
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
