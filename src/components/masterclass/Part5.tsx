import {
  MSection,
  Eyebrow,
  MHeading,
  MSub,
  MText,
  MEmphasis,
  MQuote,
  MList,
  MCards,
  MStats,
  MDivider,
} from "@/components/masterclass/primitives";
import { CTAButtons, RegistrationForm } from "@/components/masterclass/RegistrationForm";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function Part5() {
  return (
    <>
      {/* Section 25: Why Seats Are Limited (Personal Letter) */}
      <MSection tone="default">
        <Eyebrow>Section 25</Eyebrow>
        <MHeading>একটি ব্যক্তিগত চিঠি...</MHeading>
        <MSub>একজন বাবা-মায়ের উদ্দেশে।</MSub>

        <MText>
          প্রিয় বাবা অথবা মা,
          <br />
          যদি আপনি এই পর্যন্ত আমার সঙ্গে থেকে থাকেন, তাহলে আমি ধরে নিচ্ছি আপনি আপনার সন্তানের
          জন্য সত্যিই সর্বোত্তমটা চান। হয়তো সেই কারণেই আজ আপনি এই Page-এ এসেছেন।
        </MText>

        <MText>
          আমি জানি না আপনার সন্তানের নাম কী। আমি জানি না তার বয়স কত। আমি জানি না আপনার
          Journey কতটা কঠিন ছিল।
        </MText>

        <MText>
          কিন্তু একটি বিষয় আমি জানি। আপনি ইচ্ছে করে কখনও কোনো ভুল সিদ্ধান্ত নেননি। আপনি যা
          করেছেন, যা করছেন, সবই ভালোবাসা থেকে করেছেন। আর সেই ভালোবাসার কারণেই আজও আপনি
          উত্তর খুঁজছেন।
        </MText>

        <MText>
          হয়তো কখনও আপনার মনে হয়েছে আপনি খুব ক্লান্ত। অনেক চেষ্টা করেছেন। অনেক জায়গায়
          গিয়েছেন। অনেক Advice শুনেছেন। তবুও মাঝে মাঝে মনে হয়েছে আপনি আসলেই কোন দিকে
          এগোচ্ছেন সেটা পরিষ্কার নয়।
        </MText>

        <MText>
          যদি এমন অনুভূতি কখনও আপনার হয়ে থাকে, তাহলে জানবেন আপনি একা নন। হাজার হাজার
          পরিবার এই একই জায়গা থেকে তাঁদের Journey শুরু করেছেন।
        </MText>

        <MText>
          আমি আপনাকে কোনো অলৌকিক পরিবর্তনের প্রতিশ্রুতি দিতে পারি না। কারণ বাস্তব
          Development এভাবে কাজ করে না। আমি আপনাকে একটি Shortcut-ও দিতে পারি না। কারণ তার
          অস্তিত্ব নেই।
        </MText>

        <MText>
          কিন্তু আমি একটি প্রতিশ্রুতি অবশ্যই দিতে পারি। আমি আমার সর্বোচ্চ সততা, সর্বোচ্চ
          অভিজ্ঞতা এবং বহু বছরের শেখাগুলো আপনার সঙ্গে শেয়ার করব।
        </MText>

        <MText>
          আমি চাই আপনি Science of Stuck™ শেষ করে কমপক্ষে এই অনুভূতি নিয়ে ফিরুন।
        </MText>

        <MQuote>
          "আজ আমি আমার সন্তানের Journey-কে গতকালের চেয়ে আরও ভালোভাবে বুঝতে পারছি।"
        </MQuote>

        <MText>
          যদি সেটুকুও হয়, তাহলে আমার বিশ্বাস এই তিন ঘণ্টা মূল্যবান হবে।
        </MText>

        <MText>
          আপনার সন্তান শুধু একটি Diagnosis নয়। শুধু একটি Report নয়। শুধু একটি Therapy Plan
          নয়। তিনি একজন মানুষ। নিজস্ব সম্ভাবনা নিয়ে। নিজস্ব গতি নিয়ে। নিজস্ব Journey নিয়ে।
        </MText>

        <MText>
          আর আপনিও শুধু একজন Caregiver নন। আপনি তাঁর জীবনের সবচেয়ে গুরুত্বপূর্ণ মানুষদের
          একজন। অনেক সময় সবচেয়ে গুরুত্বপূর্ণ পরিবর্তনের শুরুও আপনার মধ্যেই ঘটে।
        </MText>

        <MText>
          যদি আপনি এই Journey-তে আমাদের সঙ্গে হাঁটতে চান, তাহলে আপনাকে স্বাগত। আর যদি আজ
          সময়টা আপনার জন্য ঠিক না-ও হয়, তবুও আপনার Journey-র জন্য আমার আন্তরিক শুভেচ্ছা
          রইল।
        </MText>

        <MText>
          কারণ আমাদের লক্ষ্য শুধু Registration নয়। আমাদের লক্ষ্য আরও বেশি পরিবার আরও
          সচেতনভাবে তাঁদের সন্তানের Development Journey-তে নেতৃত্ব দিতে পারেন।
        </MText>

        <MText>
          হয়তো এই তিন ঘণ্টা আপনার Journey-র সব উত্তর দেবে না। কিন্তু হয়তো একটি নতুন
          প্রশ্ন দেবে। একটি নতুন দৃষ্টিভঙ্গি দেবে। একটি নতুন Direction দেবে। আর অনেক সময়
          সেখান থেকেই সবকিছুর শুরু হয়।
        </MText>

        <MSub>তাই...</MSub>
        <MText>
          যদি আপনার মনে হয় এখন সময় এসেছে আরও পরিষ্কারভাবে দেখার, বোঝার এবং সিদ্ধান্ত
          নেওয়ার, তাহলে আমি ব্যক্তিগতভাবে আপনাকে Science of Stuck™-এ আমন্ত্রণ জানাচ্ছি।
        </MText>

        <MDivider />

        <MHeading>দেখা হবে Science of Stuck™-এ।</MHeading>
        <MText>
          ডাঃ দীপ্তাংশু দাস
          <br />
          Founder
          <br />
          Institute of NeuroDevelopment
        </MText>

        <MDivider />

        <MSub>আপনার সন্তানের Journey-তে আরও একটি Webinar যোগ করবেন?</MSub>
        <MSub>নাকি একটি নতুন Way of Thinking?</MSub>
        <MText>আপনার সিদ্ধান্ত আজ থেকেই একটি নতুন Journey শুরু করতে পারে।</MText>

        <MCards
          columns={2}
          items={[
            { title: "✅ Science of Stuck™", body: "Live 3-Hour Transformational Experience" },
            { title: "✔ Parent-Led NeuroDevelopment Perspective" },
            { title: "✔ Guided Workbook" },
            { title: "✔ Reflection Resources" },
            { title: "✔ Session Recording*" },
            { title: "✔ 100% Clarity Guarantee" },
          ]}
        />

        <MEmphasis>[ হ্যাঁ... আমি Science of Stuck™-এ যোগ দিতে চাই ]</MEmphasis>
        <MText>আজই আমার আসনটি সংরক্ষণ করুন</MText>

        <div className="mt-8">
          <CTAButtons />
        </div>
      </MSection>

      {/* Section 26: Event Details */}
      <MSection tone="muted">
        <Eyebrow>Section 26</Eyebrow>
        <MHeading>সবকিছু এক জায়গায়।</MHeading>
        <MSub>Science of Stuck™ সম্পর্কে যা যা জানা প্রয়োজন।</MSub>

        <MText>
          📅 Webinar Details — Science of Stuck™
          <br />
          একটি Live Online Parent Learning Experience
        </MText>

        <MStats
          items={[
            { value: "[তারিখ লিখুন]", label: "📆 Date" },
            { value: "[সময় লিখুন]", label: "🕒 Time (ভারতীয় সময় অনুযায়ী)" },
            { value: "প্রায় ৩ ঘণ্টা", label: "⏳ Duration (মাঝখানে একটি সংক্ষিপ্ত বিরতি থাকবে)" },
            { value: "Live Online", label: "🌐 Mode" },
          ]}
        />

        <MText>
          আপনি ভারত, বাংলাদেশ অথবা বিশ্বের যেকোনো জায়গা থেকে অংশগ্রহণ করতে পারবেন।
        </MText>

        <MSub>👨‍👩‍👧 কারা অংশগ্রহণ করতে পারবেন?</MSub>
        <MList
          items={[
            "Autism Spectrum",
            "Speech Delay",
            "ADHD",
            "Developmental Delay",
            "Learning Difficulties",
            "Behavioural Challenges",
            "Social Communication Concerns",
            "অথবা যে কোনো Parent যিনি নিজের সন্তানের Development আরও গভীরভাবে বুঝতে চান।",
          ]}
        />

        <MSub>👥 একজন না দুজন?</MSub>
        <MText>
          আমাদের আন্তরিক অনুরোধ, সম্ভব হলে বাবা এবং মা দুজনেই একসঙ্গে অংশগ্রহণ করুন। কারণ
          একটি Shared Understanding পরবর্তী Journey-কে অনেক সহজ করে দেয়। যদি দুজনের পক্ষে
          সম্ভব না হয়, তাহলে অন্তত একজন Parent সম্পূর্ণ মনোযোগ দিয়ে Webinar-এ উপস্থিত থাকুন।
        </MText>

        <MSub>💻 কী লাগবে?</MSub>
        <MList
          items={[
            "একটি Mobile / Laptop / Desktop",
            "স্থিতিশীল Internet Connection",
            "একটি শান্ত পরিবেশ",
            "Notebook ও Pen (ঐচ্ছিক, তবে উপকারী)",
            "শেখার মানসিকতা",
          ]}
        />

        <MHeading className="text-2xl md:text-3xl">Registration করার পরে কী হবে?</MHeading>
        <MCards
          columns={3}
          items={[
            { title: "Step 1 — Registration Complete", body: "Payment সফল হলে আপনি একটি Confirmation Message পাবেন।" },
            { title: "Step 2 — Webinar Access", body: "আপনার Email এবং/অথবা WhatsApp-এ Live Session Link পাঠানো হবে।" },
            { title: "Step 3 — Reminder", body: "Webinar-এর আগে আপনাকে Reminder পাঠানো হবে যাতে আপনি সময়মতো যোগ দিতে পারেন।" },
            { title: "Step 4 — Attend Live", body: "নির্ধারিত সময়ে শুধু Link-এ Click করুন এবং Journey শুরু করুন।" },
            {
              title: "Step 5 — Continue Learning",
              body: "Webinar শেষে আপনি আপনার Registration-এর সঙ্গে যে Resources অন্তর্ভুক্ত রয়েছে সেগুলোর Access পাবেন। (যেখানে প্রযোজ্য)",
            },
          ]}
        />

        <MHeading className="text-2xl md:text-3xl">কয়েকটি গুরুত্বপূর্ণ অনুরোধ</MHeading>
        <MList
          items={[
            "সময়মতো Join করুন — কারণ প্রথম অংশ পরবর্তী অংশগুলোর ভিত্তি তৈরি করে।",
            "সম্পূর্ণ Webinar-এ থাকুন — Science of Stuck™ একটি Connected Experience। মাঝপথ থেকে Join করলে অনেক গুরুত্বপূর্ণ Context মিস হয়ে যেতে পারে।",
            "মন খুলে অংশ নিন — আপনি যদি শুধু আরও একটি Webinar দেখতে আসেন, তাহলে হয়তো এটি আরও একটি Webinar-ই মনে হবে। কিন্তু যদি নতুনভাবে দেখতে, ভাবতে এবং প্রশ্ন করতে আসেন, তাহলে Experience-টিও ভিন্ন হবে।",
          ]}
        />

        <MSub>সবচেয়ে বেশি উপকৃত হন কারা?</MSub>
        <MText>
          আমাদের অভিজ্ঞতায় সেই বাবা-মায়েরাই সবচেয়ে বেশি উপকৃত হন যাঁরা কৌতূহলী, নতুনভাবে
          ভাবতে প্রস্তুত, শুধুমাত্র Quick Tips নয় বোঝাপড়া তৈরি করতে চান, এবং নিজেদেরও
          Journey-এর অংশ হিসেবে দেখতে প্রস্তুত।
        </MText>

        <MSub>সবচেয়ে কম উপকৃত হন কারা?</MSub>
        <MText>
          যাঁরা শুধু একটি Magic Technique খুঁজছেন, অথবা একটি Single Formula যা সব শিশুর
          ক্ষেত্রে একইভাবে কাজ করবে। Science of Stuck™ সেরকম Experience নয়।
        </MText>

        <MSub>একটি শেষ কথা...</MSub>
        <MText>
          Registration আপনার জন্য একটি Seat সংরক্ষণ করবে। কিন্তু Transformation শুরু হবে
          যেদিন আপনি নিজেকে নতুনভাবে প্রশ্ন করতে শুরু করবেন। আমাদের আশা সেই দিনটি হবে
          Science of Stuck™-এর প্রথম দিন।
        </MText>

        <MHeading className="text-2xl md:text-3xl">Ready?</MHeading>
        <MSub>আপনার Seat অপেক্ষা করছে।</MSub>
        <MText>
          আপনার সন্তানের জন্য। আপনার পরিবারের জন্য। এবং আপনার নতুন Way of Thinking-এর জন্য।
        </MText>

        <MCards
          columns={2}
          items={[
            { title: "✅ Live 3-Hour Science of Stuck™" },
            { title: "✅ Parent Learning Experience" },
            { title: "✅ Guided Workbook" },
            { title: "✅ Reflection Resources" },
            { title: "✅ Session Recording* (যদি প্রযোজ্য)" },
            { title: "✅ Parent Learning Support Resources" },
            { title: "✅ 100% Clarity Guarantee" },
          ]}
        />

        <MStats
          items={[
            { value: "[তারিখ]", label: "📅 Date" },
            { value: "[সময়]", label: "🕒 Time" },
            { value: "₹____", label: "💰 Registration Fee" },
          ]}
        />

        <MEmphasis>[ হ্যাঁ... আমি Science of Stuck™-এ যোগ দিতে চাই ]</MEmphasis>
        <MText>আজই আমার আসনটি সংরক্ষণ করুন</MText>

        <div className="mt-8">
          <CTAButtons />
        </div>
      </MSection>

      {/* Section 27: Final Emotional Letter */}
      <MSection tone="default">
        <Eyebrow>Section 27</Eyebrow>
        <MHeading>আপনার মনে হয়তো এখনও কিছু প্রশ্ন আছে...</MHeading>
        <MSub>চলুন... সেগুলোর উত্তর একসঙ্গে দেখে নিই।</MSub>

        <div className="mx-auto mt-8 max-w-2xl text-left">
          <Accordion type="multiple" defaultValue={["item-0", "item-1", "item-2", "item-3", "item-4"]}>
            <AccordionItem value="item-0">
              <AccordionTrigger>
                ১. আমার সন্তানের এখনও Autism-এর Diagnosis হয়নি। আমি কি এই Webinar-এ অংশ নিতে পারি?
              </AccordionTrigger>
              <AccordionContent>
                অবশ্যই। Science of Stuck™ কোনো Diagnosis-কেন্দ্রিক Webinar নয়। এটি
                Development-কেন্দ্রিক। যদি আপনার সন্তানের Speech Delay, Communication
                Difficulty, Social Interaction-এর সমস্যা, Attention-এর সমস্যা, Learning
                Difficulty, Behavioural Challenge অথবা Development নিয়ে কোনো উদ্বেগ থাকে,
                তাহলে এই Webinar আপনার জন্য প্রাসঙ্গিক।
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-1">
              <AccordionTrigger>৩. আমি আগে অনেক Webinar করেছি। এটি কীভাবে আলাদা?</AccordionTrigger>
              <AccordionContent>
                Science of Stuck™ Quick Tips-এর Webinar নয়। Motivational Talk-ও নয়। এখানে
                আমরা শুধু কী করতে হবে সেটা বলি না। আমরা কেন, কখন এবং কীভাবে ভাবতে হবে সেটাও
                আলোচনা করি। আমাদের লক্ষ্য আরও Advice দেওয়া নয়। আরও Clarity তৈরি করা।
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>২. আমার সন্তান অনেক Therapy করছে। তাহলে কি এই Webinar-এর প্রয়োজন আছে?</AccordionTrigger>
              <AccordionContent>
                আমরা Therapy-এর বিকল্প নই। আমরা Therapy-কে আরও Connected Perspective-এ দেখতে
                সাহায্য করি। অনেক বাবা-মা Webinar-এর পরে বলেন তাঁরা Therapy-কে আরও
                Meaningfulভাবে বোঝতে শুরু করেছেন।
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>৪. যদি Webinar-এ অংশ নিয়ে আমার ভালো না লাগে?</AccordionTrigger>
              <AccordionContent>
                এই কারণেই আমরা ১০০% Clarity Guarantee রেখেছি। আপনি সম্পূর্ণ Webinar-এ
                অংশগ্রহণ করার পরেও যদি মনে করেন আপনি কোনো Meaningful Clarity পাননি, তাহলে
                আমরা আপনার Registration Fee ফেরত দেব।
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>৮. Webinar-এর পরে কি আমাকে কোনো Programme কিনতে হবে?</AccordionTrigger>
              <AccordionContent>
                না। কোনো বাধ্যবাধকতা নেই। Science of Stuck™ নিজে একটি Complete Learning
                Experience। Webinar শেষে আপনি নিজেই সিদ্ধান্ত নেবেন পরবর্তী কোনো Journey
                আপনার জন্য উপযুক্ত কি না। কোনো Pressure থাকবে না।
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>৫. Webinar কি Record করা হবে?</AccordionTrigger>
              <AccordionContent>
                যদি Recording Access এই Batch-এর জন্য অন্তর্ভুক্ত থাকে, তাহলে তার বিস্তারিত
                Registration-এর সময় জানিয়ে দেওয়া হবে। তবে আমাদের আন্তরিক অনুরোধ, সম্ভব হলে
                Live-এই অংশ নিন। কারণ Live Experience সবসময় আরও গভীর হয়।
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-6">
              <AccordionTrigger>৬. আমি যদি পুরো তিন ঘণ্টা থাকতে না পারি?</AccordionTrigger>
              <AccordionContent>
                আমরা অবশ্যই আপনার ব্যস্ততা বুঝি। তবে Science of Stuck™ একটি Connected
                Experience। প্রথম অংশ পরবর্তী অংশগুলোর ভিত্তি তৈরি করে। তাই সম্ভব হলে পুরো
                Session-এর জন্য সময় নির্ধারণ করুন।
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-7">
              <AccordionTrigger>৭. বাবা-মা দুজনকেই কি অংশ নিতে হবে?</AccordionTrigger>
              <AccordionContent>
                বাধ্যতামূলক নয়। কিন্তু সম্ভব হলে দুজনকেই একসঙ্গে অংশ নিতে আমরা উৎসাহিত করি।
                কারণ যখন বোঝাপড়া একই জায়গা থেকে শুরু হয়, তখন পরবর্তী Journey অনেক সহজ হয়।
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-8">
              <AccordionTrigger>৯. আমার সন্তান অনেক বড় / অনেক ছোট। তাহলে কি এটি আমার জন্য প্রযোজ্য?</AccordionTrigger>
              <AccordionContent>
                যদি আপনার মূল প্রশ্ন Development নিয়ে হয়, তাহলে এই Webinar আপনার জন্য
                উপকারী হতে পারে। কারণ এটি কোনো নির্দিষ্ট Skill শেখানোর Session নয়। এটি
                Development বোঝার Session।
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-9">
              <AccordionTrigger>১০. Webinar-এ কি আমি প্রশ্ন করতে পারব?</AccordionTrigger>
              <AccordionContent>
                হ্যাঁ। যেখানে সময়ের সুযোগ থাকবে, সেখানে আমরা অংশগ্রহণকারীদের প্রশ্ন গ্রহণ
                করার চেষ্টা করব। যদি সব প্রশ্ন Live-এ নেওয়া সম্ভব না হয়, তবুও অনেক সাধারণ
                প্রশ্নের উত্তর Webinar-এর মধ্যেই আলোচনা করা হবে।
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-10">
              <AccordionTrigger>১১. এই Webinar কি Doctor, Therapist বা Teacher-দের জন্যও উপযোগী?</AccordionTrigger>
              <AccordionContent>
                হ্যাঁ। যদিও Science of Stuck™ মূলত Parents-দের জন্য তৈরি। তবুও অনেক
                Professional এই Webinar-এ অংশ নিয়ে Development-কে আরও Integratedভাবে দেখতে
                সাহায্য পেয়েছেন।
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-11">
              <AccordionTrigger>১২. Registration করার পরে যদি কোনো সমস্যা হয়?</AccordionTrigger>
              <AccordionContent>
                চিন্তার কিছু নেই। আমাদের Support Team আপনাকে Registration, Access এবং
                প্রয়োজনীয় তথ্য পেতে সাহায্য করবে।
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <MText>
          হয়তো আপনার প্রশ্ন এই তালিকায় নেই। সেটাও স্বাভাবিক। প্রত্যেক পরিবারের Journey
          আলাদা।
        </MText>

        <MText>
          যদি Registration-এর আগে আপনার আরও কোনো প্রশ্ন থাকে, আমাদের Team-এর সঙ্গে যোগাযোগ
          করতে পারেন। আমরা যতটা সম্ভব সৎভাবে আপনার প্রশ্নের উত্তর দেব। কারণ আমরা চাই আপনি
          সম্পূর্ণ বুঝে সিদ্ধান্ত নিন।
        </MText>

        <MText>
          আর যদি আপনার মনে হয় আপনার সব প্রশ্নের উত্তর পেয়ে গেছেন, তাহলে হয়তো এখন শুধু একটি
          সিদ্ধান্তই বাকি।
        </MText>

        <MDivider />

        <MText>
          এই Page-এর শুরুতে আমরা একটি প্রশ্ন করেছিলাম।
        </MText>
        <MQuote>
          "যদি সমস্যা আপনার সন্তানের মধ্যে না হয়ে Journey-এর Direction-এর মধ্যে থাকে?"
        </MQuote>
        <MText>
          এখন শেষে এসে আমি আরেকটি প্রশ্ন রেখে যেতে চাই।
        </MText>

        <MSub>এক বছর পরে...</MSub>
        <MText>
          আপনি কোন জায়গায় থাকতে চান? আজকের একই Confusion-এ? নাকি আরও স্পষ্ট বোঝাপড়ার
          সঙ্গে আরও সচেতন সিদ্ধান্ত নেওয়ার জায়গায়? সেই উত্তর শুধু আপনিই দিতে পারবেন।
        </MText>

        <MEmphasis>আমি প্রস্তুত।</MEmphasis>
        <MSub>আমি Science of Stuck™-এর অংশ হতে চাই।</MSub>
        <MText>[ আজই আমার আসনটি সংরক্ষণ করুন ]</MText>

        <div className="mt-8">
          <CTAButtons />
        </div>
      </MSection>

      {/* Section 28: Final CTA */}
      <MSection id="register" tone="accent">
        <Eyebrow>Section 28</Eyebrow>
        <MHeading>হয়তো আজ আপনার সন্তানের Journey বদলে যাবে না।</MHeading>
        <MSub>কিন্তু হয়তো আপনার দেখার দৃষ্টিভঙ্গি বদলাতে শুরু করবে।</MSub>

        <MText>
          যখন আপনি এই Page-টি খুলেছিলেন, হয়তো আপনার মনে অনেক প্রশ্ন ছিল। আজও হয়তো সব
          প্রশ্নের উত্তর পাননি।
        </MText>

        <MText>কিন্তু হয়তো একটি বিষয় পরিষ্কার হয়েছে।</MText>

        <MSub>আপনার সন্তান কোনো Problem নয়।</MSub>
        <MText>
          তিনি একটি Journey-তে আছেন। আর আপনিও সেই Journey-র একজন গুরুত্বপূর্ণ সহযাত্রী।
        </MText>

        <MText>
          হয়তো আজ আপনার কাছে সব উত্তর নেই। আমাদের কাছেও সব উত্তর নেই। কারণ প্রত্যেক শিশুর
          Journey নিজস্ব।
        </MText>

        <MText>
          কিন্তু যা থাকতে পারে তা হলো আরও পরিষ্কারভাবে দেখার ক্ষমতা। আরও সচেতনভাবে
          সিদ্ধান্ত নেওয়ার ক্ষমতা। আরও অর্থপূর্ণভাবে প্রতিদিনকে ব্যবহার করার ক্ষমতা।
        </MText>

        <MHeading className="text-2xl md:text-3xl">Science of Stuck™... কোনো Destination নয়।</MHeading>
        <MText>এটি একটি Invitation।</MText>
        <MList
          items={[
            "একটি Invitation আরও গভীরভাবে বোঝার।",
            "একটি Invitation আরও ভালো প্রশ্ন করার।",
            "একটি Invitation আরও সচেতনভাবে নিজের সন্তানের পাশে দাঁড়ানোর।",
          ]}
        />

        <MSub>কারণ...</MSub>
        <MText>
          কখনও কখনও একটি নতুন Technique জীবন বদলায় না। একটি নতুন Perspective বদলে দেয়।
        </MText>

        <MText>
          হয়তো আগামী কয়েক মাস পর আপনি আজকের দিনটাকে মনে করবেন না, কারণ আপনি একটি Webinar-এ
          Registration করেছিলেন।
        </MText>

        <MText>
          হয়তো আপনি আজকের দিনটাকে মনে করবেন, কারণ এই দিন আপনি প্রথমবার নিজের সন্তানের
          Journey-কে একটি নতুনভাবে দেখতে শুরু করেছিলেন।
        </MText>

        <MText>
          আর যদি আজ আপনি এই সিদ্ধান্ত নেন, তাহলে আমরা এই Journey-তে আপনার পাশে থাকতে চাই।
        </MText>

        <MSub>কোনো চাপ দিয়ে নয়।</MSub>
        <MText>
          কোনো ভয় দেখিয়ে নয়। কোনো অলৌকিক প্রতিশ্রুতি দিয়ে নয়।
        </MText>

        <MText>বরং একটি বিশ্বাস নিয়ে।</MText>

        <MText>
          যে যখন একজন Parent আরও পরিষ্কারভাবে দেখতে শেখেন, তখন তিনি তাঁর সন্তানের জন্য
          আরও ভালো সিদ্ধান্ত নিতে পারেন।
        </MText>

        <MText>
          আর অনেক সময় সেই সিদ্ধান্তগুলোর সমষ্টিই একটি শিশুর ভবিষ্যৎ গড়ে তোলে।
        </MText>

        <MSub>তাই...</MSub>
        <MText>আজ সিদ্ধান্তটি Webinar-এ যোগ দেওয়ার নয়।</MText>
        <MSub>সিদ্ধান্তটি — আপনি কি আরও সচেতন Parent হতে প্রস্তুত?</MSub>
        <MText>
          যদি আপনার উত্তর "হ্যাঁ" হয়, তাহলে Science of Stuck™-এ আপনাকে স্বাগত।
        </MText>

        <MHeading className="text-2xl md:text-3xl">🌱 আপনার Journey এখান থেকেই শুরু হতে পারে।</MHeading>

        <MSub>Science of Stuck™ — Live Parent Learning Experience</MSub>
        <MList
          items={[
            "৩ ঘণ্টার Live Experience",
            "একটি নতুন Developmental Lens",
            "Guided Workbook",
            "Reflection Resources",
            "Recording Access* (যদি প্রযোজ্য)",
            "Parent Learning Support Resources",
            "১০০% Clarity Guarantee",
          ]}
        />

        <MStats items={[{ value: "₹____", label: "আজকের Registration Fee" }]} />

        <MEmphasis>আপনি যদি প্রস্তুত হন, আমরাও প্রস্তুত।</MEmphasis>
        <MText>[ হ্যাঁ, আমি Science of Stuck™-এ যোগ দিতে চাই ]</MText>
        <MText>আজই আমার আসনটি সংরক্ষণ করুন</MText>

        <MSub>একটি ছোট্ট ব্যক্তিগত বার্তা</MSub>
        <MText>
          ধন্যবাদ। শুধু এই Page-টি এতটা সময় নিয়ে পড়ার জন্য। আপনি Registration করুন অথবা
          আজ না-ও করুন, আমরা আন্তরিকভাবে আশা করি আজকের এই কয়েক মিনিট আপনাকে কমপক্ষে একটি
          নতুন প্রশ্ন, একটি নতুন উপলব্ধি, অথবা একটি নতুন দৃষ্টিভঙ্গি উপহার দিয়েছে।
        </MText>
        <MText>
          কারণ আমাদের বিশ্বাস, প্রতিটি সচেতন Parent একটি শিশুর ভবিষ্যৎ পরিবর্তন করার
          ক্ষমতা রাখেন। আর যদি Science of Stuck™ সেই Journey-র একটি ছোট্ট অংশও হতে পারে,
          তাহলেই আমাদের প্রচেষ্টা সার্থক।
        </MText>

        <div className="mt-10">
          <RegistrationForm />
        </div>
      </MSection>

      {/* Section 29: Frequently Asked Questions (Parent's Declaration) */}
      <MSection tone="muted">
        <Eyebrow>Section 29</Eyebrow>
        <MHeading>একটি সিদ্ধান্ত... যেটি শুধুমাত্র Registration-এর নয়।</MHeading>
        <MSub>এটি একজন Parent হিসেবে আপনি কেমন মানুষ হতে চান সেই সিদ্ধান্ত।</MSub>

        <MText>
          আজ এই Page-এর শেষে এসে আমি আপনাকে কোনো নতুন তথ্য দিতে চাই না। আমি শুধু কয়েকটি
          বাক্য আপনার সামনে রেখে যেতে চাই।
        </MText>

        <MSub>যদি...</MSub>
        <MText>
          আপনার মনে হয় এই কথাগুলো আপনারও কথা, তাহলে হয়তো Science of Stuck™ আপনার জন্যই।
        </MText>

        <MList
          items={[
            "আমি বিশ্বাস করি আমার সন্তান শুধু একটি Diagnosis নয়। তিনি একজন মানুষ। অসীম সম্ভাবনা নিয়ে।",
            "আমি বিশ্বাস করি শুধু আরও Information সবসময় আরও ভালো সিদ্ধান্ত এনে দেয় না। অনেক সময় আরও পরিষ্কার বোঝাপড়া বেশি গুরুত্বপূর্ণ।",
            "আমি বিশ্বাস করি Development শুধু Therapy Session-এ সীমাবদ্ধ নয়। প্রতিদিনের জীবনও Development-এর একটি গুরুত্বপূর্ণ অংশ।",
            "আমি বিশ্বাস করি Professional-দের একটি গুরুত্বপূর্ণ ভূমিকা আছে। কিন্তু একজন Parent হিসেবেও আমার একটি গুরুত্বপূর্ণ ভূমিকা আছে।",
            "আমি বিশ্বাস করি আমার সন্তানের Journey অন্য কারও সঙ্গে তুলনা করার নয়। এটি নিজস্ব।",
            "আমি বিশ্বাস করি আমার সব উত্তর আজই জানা প্রয়োজন নেই। কিন্তু সঠিক প্রশ্ন আজ থেকেই করতে পারি।",
            "আমি বিশ্বাস করি ভয় আমাকে সিদ্ধান্ত নিতে সাহায্য করে না। বোঝাপড়া করে।",
            "আমি বিশ্বাস করি আমার সন্তানের ভবিষ্যৎ একদিনে তৈরি হবে না। প্রতিদিনের ছোট ছোট সচেতন সিদ্ধান্তে গড়ে উঠবে।",
            "আমি বিশ্বাস করি আমি আজকের চেয়ে আরও সচেতন Parent হতে পারি। আর সেটাই আমার সন্তানের সবচেয়ে বড় উপহার হতে পারে।",
          ]}
        />

        <MText>
          যদি এই কথাগুলোর বেশিরভাগের সঙ্গে আপনি একমত হন, তাহলে হয়তো আপনি ইতিমধ্যেই Science
          of Stuck™-এর Journey শুরু করে ফেলেছেন। কারণ এই Journey Registration দিয়ে শুরু হয়
          না। এটি শুরু হয় একটি নতুনভাবে দেখতে শেখা দিয়ে।
        </MText>

        <MSub>আজ আপনি দুটি পথের সামনে দাঁড়িয়ে আছেন।</MSub>
        <MCards
          columns={2}
          items={[
            {
              title: "পথ এক",
              body: "আগের মতোই আরও Information, আরও Advice, আরও Confusion, আরও অপেক্ষা।",
            },
            {
              title: "পথ দুই",
              body: "আরও গভীরভাবে বোঝা। আরও সচেতনভাবে সিদ্ধান্ত নেওয়া। আরও উদ্দেশ্যপূর্ণভাবে নিজের সন্তানের Journey-র অংশ হয়ে ওঠা।",
            },
          ]}
        />

        <MText>
          আমরা আপনার হয়ে সিদ্ধান্ত নেব না। কারণ এটি আপনার Journey। আপনার পরিবার। আপনার
          সন্তান।
        </MText>
        <MText>আমরা শুধু একটি আমন্ত্রণ জানাচ্ছি।</MText>
        <MText>
          যদি আপনি এই দ্বিতীয় পথটি বেছে নিতে চান, তাহলে আমরা আপনাকে স্বাগত জানাই।
        </MText>

        <MHeading className="text-2xl md:text-3xl">🌱 Science of Stuck™</MHeading>
        <MSub>শুধু একটি Webinar নয়। একজন Parent-এর নতুন যাত্রার শুরু।</MSub>

        <MSub>আজকের Registration</MSub>
        <MList
          items={[
            "✅ Live 3-Hour Experience",
            "✅ Parent-Led NeuroDevelopment Perspective",
            "✅ Guided Workbook",
            "✅ Reflection Resources",
            "✅ Recording Access* (যদি প্রযোজ্য)",
            "✅ Parent Learning Resources",
            "✅ ১০০% Clarity Guarantee",
          ]}
        />

        <MStats items={[{ value: "₹____", label: "আজকের Registration Fee" }]} />

        <MSub>আজ আমি শুধু Webinar-এ Registration করছি না।</MSub>
        <MText>
          আমি আমার সন্তানের Journey-কে আরও সচেতনভাবে নেতৃত্ব দেওয়ার সিদ্ধান্ত নিচ্ছি।
        </MText>
        <MText>[ হ্যাঁ... আমি Science of Stuck™-এ যোগ দিতে চাই ]</MText>

        <div className="mt-8">
          <CTAButtons />
        </div>
      </MSection>

      {/* Section 30: Final Signature */}
      <MSection tone="default">
        <Eyebrow>Section 30</Eyebrow>
        <MHeading>সব কথা বলা হয়ে গেছে।</MHeading>

        <MSub>এখন সিদ্ধান্তটি সম্পূর্ণ আপনার।</MSub>

        <MText>আপনি চাইলে আজ Registration করতে পারেন।</MText>
        <MText>আপনি চাইলে আরও কিছুদিন ভাবতে পারেন।</MText>
        <MText>
          কিন্তু যে সিদ্ধান্তই নিন, সেটি ভয় থেকে নয়। বোঝাপড়া থেকে নিন।
        </MText>
        <MText>কারণ আপনার সন্তান এর যোগ্য।</MText>
        <MText>আর আপনিও।</MText>

        <MDivider />

        <MHeading className="text-2xl md:text-3xl">Science of Stuck™</MHeading>
        <MSub>Live Parent Learning Experience</MSub>

        <MStats
          items={[
            { value: "[Date]", label: "📅 Date" },
            { value: "[Time]", label: "🕒 Time" },
            { value: "Live Online", label: "💻 Mode" },
            { value: "₹____", label: "💰 Registration Fee" },
          ]}
        />

        <MList
          items={[
            "✔ Live 3-Hour Experience",
            "✔ Parent-Led NeuroDevelopment Perspective",
            "✔ Workbook",
            "✔ Reflection Resources",
            "✔ Recording Access* (if applicable)",
            "✔ 100% Clarity Guarantee",
          ]}
        />

        <MText>[ হ্যাঁ... আমি Science of Stuck™-এ যোগ দিতে চাই ]</MText>

        <div className="mt-8">
          <CTAButtons />
        </div>

        <MDivider />

        <MSub>Institute of NeuroDevelopment</MSub>
        <MText>Building Parent Leaders.</MText>
        <MText>Nurturing Child Potential.</MText>

        <MDivider />

        <MEmphasis>Thank you.</MEmphasis>
      </MSection>
    </>
  );
}
