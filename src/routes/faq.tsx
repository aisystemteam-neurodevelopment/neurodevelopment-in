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
      q: "মাসের পর মাস — কখনো বছর — থেরাপি করছি, কিন্তু progress ধীরে হচ্ছে মনে হয়। কেন?",
      a: "Progress ধীরে হওয়ার আসল কারণ effort-এর অভাব নয়। সাধারণত হয় কী — মূল drivers (regulation, connection, communication, independence) ভুল order-এ কাজ হচ্ছে, কিংবা শুধু থেরাপি রুমের ভিতরেই আটকে আছে। সঠিক driver-এ, সঠিক sequence-এ, আর বাড়িতে বাচ্চার রোজকার ১০০+ ঘণ্টায় কাজ করলে তবেই বদলটা জমতে শুরু করে।",
    },
  },
  {
    en: {
      q: "Will more sessions per week make things move faster?",
      a: "Usually not. Adding hours to a fragmented plan multiplies the fragmentation. Sequencing the right driver first — and embedding it in daily routines — moves the needle faster than stacking sessions.",
    },
    bn: {
      q: "সপ্তাহে আরও বেশি সেশন নিলে কি তাড়াতাড়ি improve করবে?",
      a: "সাধারণত না। ছড়ানো-ছিটানো প্ল্যানে আরও ঘণ্টা ঢাললে ছড়ানোটাই বাড়ে। আগে সঠিক driver-কে sequence-এ আনা — আর সেটাকে রোজকার routine-এ ঢুকিয়ে দেওয়া — সেশন বাড়ানোর থেকে অনেক তাড়াতাড়ি কাজ করে।",
    },
  },
  {
    en: {
      q: "How soon will we see change with IND?",
      a: "Most families notice shifts in regulation and connection within the first few weeks because that's where the system starts. Communication and independence build from there over the 52-week Flightpath. We don't promise timelines — we promise structure and visible weekly progress.",
    },
    bn: {
      q: "IND-এ কত তাড়াতাড়ি বদল দেখা যাবে?",
      a: "বেশিরভাগ পরিবার প্রথম কয়েক সপ্তাহেই regulation আর connection-এ বদল লক্ষ্য করেন, কারণ system এখান থেকেই শুরু হয়। এরপর ৫২-সপ্তাহের Flightpath ধরে communication আর independence ধীরে ধীরে গড়ে ওঠে। আমরা timeline-এর গ্যারান্টি দিই না — আমরা কথা দিই একটা ঠিকঠাক structure আর প্রতি সপ্তাহে চোখে দেখা যায় এমন progress-এর।",
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
      q: "যত professional-এর সাথে দেখা করি, প্রত্যেকে আলাদা কথা বলেন। কার কথা শুনব?",
      a: "এটাই ছড়ানো-ছিটানো care-এর আসল সমস্যা — তিনজন specialist, তিন রকম প্ল্যান, পুরো বাচ্চার দায়িত্ব কেউ নিচ্ছেন না। IND এর জায়গায় দেয় একটাই গোছানো system আর একটাই sequence: Regulation → Connection → Communication → Independence। মতামতের মধ্যে বেছে নেওয়া বন্ধ — একটাই প্ল্যান follow করা শুরু।",
    },
  },
  {
    en: {
      q: "We're already doing speech, OT, and special ed. Where does IND fit?",
      a: "IND doesn't replace them — it gives them a spine. Most therapies optimise a slice. The system organises the whole week around the right driver so each therapy actually compounds instead of pulling in different directions.",
    },
    bn: {
      q: "আমরা এমনিতেই speech, OT, special ed করছি। IND এর মধ্যে কোথায় বসে?",
      a: "IND এগুলোকে replace করে না — একটা মেরুদণ্ড দেয়। বেশিরভাগ থেরাপি একটা ছোট অংশ optimise করে। System পুরো সপ্তাহটাকে সঠিক driver-এর চারপাশে সাজায়, যাতে প্রতিটা থেরাপি আলাদা দিকে না টেনে একসাথে কাজ করে।",
    },
  },
  {
    en: {
      q: "How is this different from another therapy plan?",
      a: "It isn't a therapy plan. It's a developmental architecture for the home — phase, week, parent action, measurable signal. Therapies are inputs to it, not the centre of it.",
    },
    bn: {
      q: "এটা আর একটা থেরাপি প্ল্যান থেকে আলাদা কীভাবে?",
      a: "এটা থেরাপি প্ল্যানই না। এটা বাড়ির জন্য একটা developmental architecture — phase, week, বাবা-মার action, মাপা যায় এমন signal। থেরাপি এর input, কেন্দ্র নয়।",
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
      q: "আমরা কি সারাজীবন থেরাপির মধ্যেই থাকব?",
      a: "ইনপুট-নির্ভর care-এর এটাই ফাঁদ — অশেষ সেশন, বেরোনোর কোনো রাস্তা নেই। Flightpath ৫২ সপ্তাহের, একটা ঠিক করা শেষ আছে। লক্ষ্য professional-দের উপর সারাজীবনের নির্ভরশীলতা নয় — লক্ষ্য এমন একজন বাবা বা মা, যিনি নিজের কনফিডেন্সে নিজের বাচ্চার বিকাশটা lead করতে পারেন।",
    },
  },
  {
    en: {
      q: "What happens when the program ends?",
      a: "By the end, you own the framework. You know your child's drivers, you've run the system for a year, and you can adapt it as your child grows. Some families choose a second cycle for new goals — but that's a choice, not a dependency.",
    },
    bn: {
      q: "প্রোগ্রাম শেষ হলে কী হবে?",
      a: "শেষে framework-টা আপনার নিজের হাতে চলে আসে। আপনি জানেন বাচ্চার drivers কী, এক বছর ধরে নিজে system চালিয়েছেন, আর বাচ্চা বড় হতে হতে সেটা adjust করতে পারেন। কিছু পরিবার নতুন লক্ষ্যের জন্য দ্বিতীয় cycle বেছে নেন — কিন্তু সেটা চয়েস, নির্ভরশীলতা নয়।",
    },
  },
  {
    en: {
      q: "Isn't this just shifting the work onto parents?",
      a: "Parents are already doing the work — usually without structure, often blaming themselves. IND gives that work a system, a sequence, and a guide. Less guesswork, fewer hours wasted on the wrong thing, more progress per week of effort.",
    },
    bn: {
      q: "এটা তো শেষমেশ বাবা-মায়ের ঘাড়ে কাজ চাপানো, তাই না?",
      a: "বাবা-মা এমনিতেই কাজটা করছেন — সাধারণত কোনো structure ছাড়া, প্রায়ই নিজেদের দোষ দিতে দিতে। IND সেই কাজটার সাথে দেয় একটা system, একটা sequence, আর একজন guide। কম guesswork, ভুল জিনিসে কম ঘণ্টা নষ্ট, প্রতি সপ্তাহের effort-এ বেশি progress।",
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
      q: "এটা online না সরাসরি?",
      a: "দুটোই। কোনটা হবে, সেটা নির্ভর করে আপনি কোথায় থাকেন আর বাচ্চার কী দরকার তার উপর। আমাদের clinical home base কলকাতায়; ১০+ দেশের পরিবার আমাদের সাথে online কাজ করেন।",
    },
  },
  {
    en: {
      q: "Which children is this for?",
      a: "Primarily ages 2–12 with autism-related challenges, ADHD, speech delay, behavioural difficulties, and broader social-emotional or learning concerns.",
    },
    bn: {
      q: "এটা কোন বাচ্চাদের জন্য?",
      a: "মূলত ২–১২ বছর বয়সী বাচ্চা, যাদের autism-related চ্যালেঞ্জ, ADHD, speech delay, behaviour-এর সমস্যা, বা বড় কোনো social-emotional বা শেখার সমস্যা আছে।",
    },
  },
  {
    en: {
      q: "Will my child be diagnosed online?",
      a: "No. Diagnosis requires in-person evaluation. Online, we focus on understanding your child and guiding the next right step.",
    },
    bn: {
      q: "আমার বাচ্চার diagnosis কি online-এ হবে?",
      a: "না। Diagnosis-এর জন্য সরাসরি দেখা দরকার। Online-এ আমরা বাচ্চাকে বোঝা আর পরের সঠিক step দেখিয়ে দেওয়ার উপরেই focus করি।",
    },
  },
  {
    en: {
      q: "How much does it cost?",
      a: "The right plan depends on your child's current condition and the level of support needed. Our team understands the child first, then guides you to a suitable plan.",
    },
    bn: {
      q: "খরচ কত?",
      a: "সঠিক প্ল্যান নির্ভর করে আপনার বাচ্চার এখনকার অবস্থা আর কতটা support লাগবে তার উপর। আমাদের team আগে বাচ্চাকে বোঝে, তারপর আপনার জন্য মানানসই প্ল্যানের দিকে guide করে।",
    },
  },
  {
    en: {
      q: "Can you guarantee results?",
      a: "No — and we never will. Anyone guaranteeing specific outcomes in child development is not being honest. We promise a clear system, weekly structure, and our full effort.",
    },
    bn: {
      q: "ফলাফলের গ্যারান্টি দিতে পারেন?",
      a: "না — এবং কখনোই দেব না। বাচ্চার বিকাশে নির্দিষ্ট ফলাফলের গ্যারান্টি যিনি দেন, তিনি সৎ নন। আমরা কথা দিই একটা পরিষ্কার system, সপ্তাহের গোছানো plan, আর আমাদের পুরো effort-এর।",
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
    h1: "সরাসরি উত্তর, কোনো বাড়াবাড়ি নয়",
    intro:
      "বেশিরভাগ পরিবার আমাদের কাছে আসেন ক্লান্ত হয়ে — progress ধীরে হচ্ছে, পরামর্শ একেকজনের একেক রকম, মনে হচ্ছে থেরাপি কোনোদিন শেষ হবে না। IND system এই প্রতিটি জিনিসের উত্তর কীভাবে দেয়, সরাসরি বললাম।",
    s1Title: "Progress ধীরে মনে হলে",
    s1Lead: "সমস্যা effort-এ নয় — sequence-এ।",
    s2Title: "পরামর্শ ছড়ানো-ছিটানো মনে হলে",
    s2Lead: "অনেক মতামতের জায়গায় একটাই sequence।",
    s3Title: "নির্ভরশীলতা নিয়ে চিন্তা হলে",
    s3Lead: "Flightpath-এর একটা শেষ আছে। লক্ষ্য — বাবা-মায়ের নেতৃত্ব।",
    s4Title: "Practical প্রশ্ন",
    s4Lead: "শুরু করার আগে বাবা-মায়েরা সাধারণত যা জানতে চান।",
    ctaTitle: "এখনো বুঝতে পারছেন না কোথায় ফিট করেন?",
    ctaBody: "বাচ্চার কথা আমাদের জানান। আমরা সঠিক শুরুর phase দেখিয়ে দেব — কোনো চাপ নেই, কোনো script নেই।",
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
