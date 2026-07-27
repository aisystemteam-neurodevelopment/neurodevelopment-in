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
import { CTAButtons } from "@/components/masterclass/RegistrationForm";

export function Part2() {
  return (
    <>
      {/* Section 7: What You Will Finally Understand */}
      <MSection tone="default">
        <Eyebrow>Section 7</Eyebrow>
        <MHeading>এই ৩ ঘণ্টার পর...</MHeading>
        <MEmphasis>
          হয়তো আপনি আর কোনোদিন আপনার সন্তানের Development-কে আগের মতো দেখবেন না।
        </MEmphasis>
        <MSub>কারণ...</MSub>
        <MText>
          অনেক সময় একটি নতুন Technique জীবন বদলায় না। একটি নতুন Perspective বদলে দেয়।
        </MText>
        <MSub>Science of Stuck™-এ...</MSub>
        <MText>
          আমরা আপনাকে আরও Information দিতে চাই না। আমরা চাই আপনি এমন কিছু উপলব্ধি নিয়ে ফিরুন...
          যেগুলো আপনার আগামী কয়েক বছরের সিদ্ধান্তকে বদলে দিতে পারে।
        </MText>
        <MSub>আপনি হয়তো প্রথমবার বুঝতে শুরু করবেন...</MSub>
        <MList
          items={[
            "কেন এত চেষ্টা করেও অনেক সময় Progress খুব ধীরে হয় — এটা কি আপনার সন্তানের সীমাবদ্ধতা, নাকি সমস্যাটা অন্য কোথাও?",
            "কেন একই Diagnosis একই রকম Journey তৈরি করে না — দুইটি শিশু, একই বয়স, একই Diagnosis, কিন্তু একজন দ্রুত এগোয়, আরেকজন বছরের পর বছর একই জায়গায়।",
            "কেন শুধু \"আরও Therapy\" সবসময় আরও Progress এনে দেয় না — ঠিক সময়ে, ঠিক জিনিসটার উপর, ঠিকভাবে কাজ হচ্ছে তো?",
            "কেন কিছু পরিবর্তন বাস্তব জীবনে দেখা যায় না — Session-এ Skill দেখা যায়, বাড়িতে খুব কম।",
            "কেন শুধু Skill শেখানো আর Development এক জিনিস নয় — চিন্তা, বোঝা, যোগাযোগ, সম্পর্ক, সমস্যা সমাধান, স্বাধীনতা কীভাবে ধীরে ধীরে গড়ে ওঠে?",
            "কেন কিছু ছোট পরিবর্তন অনেক বড় পরিবর্তনের সূচনা হতে পারে — সব পরিবর্তনের মূল্য সমান নয়।",
            "কেন সব সমস্যার একসঙ্গে সমাধান করার চেষ্টা অনেক সময় উল্টো Progress ধীর করে দেয় — আসল Priority কী, এবং কীভাবে সেটা বোঝা যায়?",
            "কেন আপনার বাড়িটাই হতে পারে আপনার সন্তানের সবচেয়ে শক্তিশালী Learning Environment — প্রতিদিনের ছোট ছোট Interaction, Routine, Relationship, Conversation, Play-এর মধ্যেই।",
            "কেন একজন Parent শুধু Caregiver নন — আপনার ভূমিকাটা আপনি যতটা ভাবেন তার থেকেও অনেক বড়।",
            "সবচেয়ে গুরুত্বপূর্ণ উপলব্ধি — নিজের সন্তানের Development-কে একটি Connected Journey হিসেবে দেখতে শুরু করবেন। Speech, Behaviour, Attention, Learning, Emotional Regulation, Communication, Social Skills — এগুলো আর আলাদা আলাদা বিষয় বলে মনে হবে না।",
          ]}
        />
        <MDivider />
        <MText>
          আর এই পুরো সময় জুড়ে আমরা আপনাকে কোনো Magic Formula দেব না। কোনো Shortcut দেব না।
          কোনো Overnight Promise দেব না। কারণ একজন বাবা-মা Empty Hope নয়... Honest Clarity পাওয়ার যোগ্য।
        </MText>
        <MText>
          Webinar শেষ হওয়ার পরে আমরা চাই না আপনি শুধু বলুন "অনেক কিছু শিখলাম।"
        </MText>
        <MQuote>
          এখন আমি বুঝতে পারছি... এখন আমি জানি... এখন আমি কেন কী করব... সেটা বুঝে করছি।
        </MQuote>
        <MSub>Imagine...</MSub>
        <MText>
          যদি আগামী ছয় মাস আপনার প্রতিটি সিদ্ধান্ত আরও পরিষ্কার Understanding-এর উপর ভিত্তি করে হয়... তাহলে?
          যদি আপনি Advice-এর ভিড়ে হারিয়ে না গিয়ে নিজেই বুঝতে পারেন কোনটা গুরুত্বপূর্ণ আর কোনটা নয়... তাহলে?
        </MText>
        <MText>
          কারণ Clarity শুধু Confusion দূর করে না। Clarity Confidence তৈরি করে। আর Confidence Consistency তৈরি করে।
          আর Consistency সময় পেলে অসাধারণ পরিবর্তনের ভিত্তি হয়ে উঠতে পারে।
        </MText>
        <MDivider />
        <MText>
          কিন্তু একটা বড় সমস্যা এখনও রয়ে গেছে। বছরের পর বছর অনেক বাবা-মা কিছু বিশ্বাসকে সত্যি বলে মেনে নিয়েছেন।
          সেই বিশ্বাসগুলো এতটাই সাধারণ যে আমরা সেগুলোকে প্রশ্নই করি না। কিন্তু যদি সেগুলোর কয়েকটিই আপনার সন্তানের
          Progress-কে অজান্তেই ধীর করে রাখে?
        </MText>
        <MSub>৭টি সবচেয়ে বড় ভুল ধারণা যেগুলো হাজার হাজার পরিবারের Journey-কে প্রভাবিত করেছে।</MSub>
        <MEmphasis>হ্যাঁ... আমি নতুনভাবে বুঝতে চাই।</MEmphasis>
        <MText>আজই Science of Stuck-এ আমার আসনটি সংরক্ষণ করুন</MText>
        <CTAButtons />
      </MSection>

      {/* Section 8: The 7 Biggest Lies Parents Have Been Told */}
      <MSection tone="muted">
        <Eyebrow>Section 8</Eyebrow>
        <MHeading>৭টি বিশ্বাস যেগুলো আমরা বছরের পর বছর সত্যি বলে মেনে নিয়েছি।</MHeading>
        <MSub>
          কিন্তু... যদি সেগুলোর কয়েকটিই আপনার সন্তানের Progress-কে অজান্তেই ধীর করে রাখে?
        </MSub>
        <MText>
          এই অংশটা পড়ার সময় আমরা চাই না আপনি আমাদের বিশ্বাস করুন। আমরা শুধু চাই আপনি নিজের অভিজ্ঞতার সঙ্গে
          এই কথাগুলো মিলিয়ে দেখুন। কারণ Science of Stuck™-এ আমরা বিশ্বাস চাপিয়ে দিই না। আমরা প্রশ্ন করতে শিখি।
        </MText>
        <MCards
          columns={2}
          items={[
            {
              title: "বিশ্বাস ১: \"আরও Therapy মানেই আরও Progress.\"",
              body: "শুনতে খুব যুক্তিযুক্ত লাগে। কিন্তু যদি সমস্যাটা Quantity-এর না হয়ে Direction-এর হয়? যদি আরও বেশি করার আগে আরও পরিষ্কার বোঝাটা প্রয়োজন হয়?",
            },
            {
              title: "বিশ্বাস ২: \"সময়ই সব ঠিক করে দেবে।\"",
              body: "সময় নিজে Development তৈরি করে না। সময় Opportunity দেয়। প্রশ্নটা শুধু \"আর কতদিন অপেক্ষা করব?\" নয়, বরং \"অপেক্ষা করার সময়... আমরা কী করছি?\"",
            },
            {
              title: "বিশ্বাস ৩: \"আমার সন্তানের Diagnosis-ই সবকিছু বলে দেয়।\"",
              body: "Diagnosis গুরুত্বপূর্ণ, কিন্তু ভবিষ্যৎ লিখে দেয় না। একই Diagnosis দুই শিশুর দুই রকম Journey হতে পারে। Difference কোথায় তৈরি হয়?",
            },
            {
              title: "বিশ্বাস ৪: \"আমাদের কাজ Professionals-এর নির্দেশ মেনে চলা।\"",
              body: "আপনার সন্তান সপ্তাহে কত ঘণ্টা Professional-এর সঙ্গে থাকে, আর কত ঘণ্টা আপনার সঙ্গে? সবচেয়ে বড় Developmental Opportunity কোথায় তৈরি হওয়ার সম্ভাবনা বেশি?",
            },
            {
              title: "বিশ্বাস ৫: \"Speech এলেই সব ঠিক হয়ে যাবে।\"",
              body: "Speech-এর আগেও কি Development চলছে না? Connection, Understanding, Attention, Curiosity, Play, Emotional Safety — এসব কি Development-এর অংশ নয়?",
            },
            {
              title: "বিশ্বাস ৬: \"আমাদের সব সমস্যার উপর একসঙ্গে কাজ করতে হবে।\"",
              body: "একসঙ্গে সবকিছু সমান গুরুত্ব পেলে সবচেয়ে গুরুত্বপূর্ণ জিনিসটা অনেক সময় হারিয়ে যায়। যদি সবচেয়ে বড় পরিবর্তন একটি সবচেয়ে গুরুত্বপূর্ণ জায়গা থেকেই শুরু হয়?",
            },
            {
              title: "বিশ্বাস ৭: \"আমার সন্তানের সমস্যা আলাদা আলাদা।\"",
              body: "যদি এসব আলাদা সমস্যা না হয়ে একটি Developmental Story-এর পরস্পর যুক্ত অধ্যায় হয়? একটি জায়গার পরিবর্তন অন্য জায়গাগুলোকেও প্রভাবিত করে?",
            },
          ]}
        />
        <MDivider />
        <MText>
          হয়তো এই সাতটি বিশ্বাসের মধ্যে একটি, দুটি, অথবা কয়েকটি আপনার মধ্যেও ছিল। এতে অবাক হওয়ার কিছু নেই।
          কারণ আমাদের অধিকাংশই এই ধারণাগুলো নিয়েই Journey শুরু করি।
        </MText>
        <MText>
          কিন্তু যখন বিশ্বাস বদলায় তখন প্রশ্ন বদলায়। প্রশ্ন বদলালে Decision বদলায়। Decision বদলালে Journey বদলাতে শুরু করে।
        </MText>
        <MText>
          আর এখানেই Science of Stuck™ শুধু Information দেয় না। একটি Mental Shift তৈরি করে।
        </MText>
        <MQuote>আমার সন্তানের দিকে আমি আজ নতুন চোখে তাকাতে পারছি।</MQuote>
        <MSub>
          "যদি শুধু আরও Therapy-ই যথেষ্ট না হয়... তাহলে সমস্যা আসলে কোথায়?" এবং "কেন এত পরিবার বছরের পর বছর
          একই চক্রে ঘুরতে থাকে?"
        </MSub>
        <MEmphasis>হ্যাঁ... আমি বুঝতে চাই এতদিন আমরা কোন বিশ্বাসগুলো ধরে রেখেছিলাম।</MEmphasis>
        <CTAButtons />
      </MSection>

      {/* Section 9: Why More Therapy Doesn't Always Mean More Progress */}
      <MSection tone="default">
        <Eyebrow>Section 9</Eyebrow>
        <MHeading>তাহলে কেন শুধু আরও Therapy সবসময় আরও Progress তৈরি করে না?</MHeading>
        <MText>
          প্রথমেই একটি বিষয় খুব পরিষ্কার করে বলতে চাই। আমরা Therapy-এর বিরুদ্ধে নই। আমরা Doctor-এর বিরুদ্ধেও নই।
          আমরা নিজেরাও Healthcare Professionals। আমরা জানি একজন ভালো Therapist একটি শিশুর জীবনে অসাধারণ
          পরিবর্তন আনতে পারেন।
        </MText>
        <MSub>প্রশ্নটা হলো — সবকিছু কি একসঙ্গে একই দিকে এগোচ্ছে?</MSub>
        <MText>
          ধরুন একটি Orchestra-তে পৃথিবীর সেরা Violin Player, Pianist, Drummer, Flute Player আছেন। প্রত্যেকেই
          অসাধারণ। কিন্তু যদি প্রত্যেকে নিজের নিজের মতো বাজান, একজন আরেকজনকে না শুনে, কেউ Timing না মানেন,
          কেউ Conductor-এর সঙ্গে না চলেন, তাহলে কি হবে? ভালো Music? নাকি শব্দের ভিড়?
        </MText>
        <MText>
          Speech Therapy, OT, Behaviour Therapy, School, Home, Doctor, Special Educator, Assessment — সবাই
          নিজের জায়গা থেকে সর্বোচ্চ চেষ্টা করছেন। কিন্তু সবাই কি একই Developmental Destination-এর দিকে কাজ করছেন?
        </MText>
        <MSub>এখানেই আমরা একটি গুরুত্বপূর্ণ পার্থক্য দেখি।</MSub>
        <MText>
          অনেক পরিবার Therapy Plan পান। কিন্তু Development Plan পান না। Therapy Plan বলতে পারে এই সপ্তাহে কী
          Skill শেখানো হবে। কিন্তু Development Plan উত্তর দেয় — এখন সবচেয়ে গুরুত্বপূর্ণ পরিবর্তন কোনটি? কেন সেটাই
          সবচেয়ে গুরুত্বপূর্ণ? এর পরে কী আসবে? কীভাবে সবকিছু একে অপরের সঙ্গে যুক্ত?
        </MText>
        <MText>
          একটা গাছের কথা ভাবুন। আপনি প্রতিদিন পাতায়, ফুলে, ডালে জল দিচ্ছেন। কিন্তু শিকড়ে? যদি শিকড়টাই প্রয়োজনীয়
          পুষ্টি না পায়, তাহলে আপনি কি আরও জল দেবেন? নাকি প্রথমে Root System-টা বুঝবেন?
        </MText>
        <MSub>আর এখানেই Science of Stuck™ একটি ভিন্ন প্রশ্ন করে।</MSub>
        <MText>
          আমরা জিজ্ঞেস করি না "আর কী যোগ করা যায়?" আমরা জিজ্ঞেস করি "এখন সবচেয়ে গুরুত্বপূর্ণ Bottleneck কোনটি?"
          তারপর "ওটা সরালে আর কী কী পরিবর্তন সহজ হয়ে যেতে পারে?"
        </MText>
        <MText>
          কারণ সব পরিবর্তনের Leverage সমান নয়। কিছু পরিবর্তন আরও দশটি পরিবর্তনের দরজা খুলে দেয়। আর কিছু পরিবর্তন
          দেখতে ভালো লাগে, কিন্তু Development-এর গতিপথ খুব একটা বদলায় না।
        </MText>
        <MSub>আরও একটা প্রশ্ন...</MSub>
        <MText>
          আপনার সন্তান সপ্তাহে কত ঘণ্টা Therapy-তে থাকে? হয়তো ১, ২, ৩ ঘণ্টা। কিন্তু বাকি সময়? সেই সময়গুলোতে
          কে থাকে? আপনি। পরিবার। বাড়ি। Routine। খেলা। খাওয়ার সময়। গল্পের সময়। ঘুমের আগে। ছোট ছোট Interaction।
          তাহলে যদি Development বাস্তব জীবনের মধ্যেই সবচেয়ে বেশি ঘটে, তাহলে সেই বাস্তব জীবনটা Development-এর
          অংশ হওয়া উচিত নয়?
        </MText>
        <MSub>আর এখানেই আমরা একটি মৌলিক পার্থক্য দেখি।</MSub>
        <MText>
          অনেক Model Professional-কেন্দ্রিক। আমাদের চিন্তা Parent-inclusive নয়। Parent-centred-ও নয়। আমাদের চিন্তা
          Parent-led. এর অর্থ Professional-এর গুরুত্ব কমে যায় তা নয়। বরং Professional দিকনির্দেশনা দেন, Structure
          তৈরি করেন, Roadmap তৈরি করেন। কিন্তু Development প্রতিদিন জীবনের মধ্যে ঘটে। এবং সেই জায়গায় সবচেয়ে
          গুরুত্বপূর্ণ মানুষটি আপনিই।
        </MText>
        <MText>
          তাই Science of Stuck™ আপনাকে আরও Therapy করতে বলার আগে একটি প্রশ্ন করতে শেখাবে — "আমি কি সবচেয়ে
          গুরুত্বপূর্ণ জায়গাতেই কাজ করছি?" কারণ কখনও কখনও আরও Effort নয়, আরও Alignment-ই সবচেয়ে বড় পরিবর্তন আনে।
        </MText>
        <MSub>Imagine...</MSub>
        <MText>
          যদি Speech, Behaviour, Attention, Learning, Sensory, School — সবগুলোকে আলাদা Problem হিসেবে না দেখে
          একটি Connected Developmental Journey হিসেবে দেখা যায়... তাহলে? যদি প্রত্যেক Intervention একই Direction-এ
          কাজ করে... তাহলে? যদি প্রত্যেক Decision একটি বৃহত্তর Roadmap-এর অংশ হয়... তাহলে?
        </MText>
        <MQuote>তাহলে সেই Roadmap-টা দেখতে কেমন?</MQuote>
        <MEmphasis>হ্যাঁ... আমি জানতে চাই আমার সন্তানের Development-এর বড় ছবিটা।</MEmphasis>
        <CTAButtons />
      </MSection>

      {/* Section 10: The Hidden Cost of Waiting */}
      <MSection tone="muted">
        <Eyebrow>Section 10</Eyebrow>
        <MHeading>সবচেয়ে বড় ঝুঁকি হয়তো সময় চলে যাওয়া নয়। হয়তো ভুল দিকেই এগিয়ে যেতে থাকা।</MHeading>
        <MText>
          আমরা কখনও চাই না কোনো বাবা-মা এই Webinar-এ ভয় থেকে আসুন। কারণ ভয় কখনও দীর্ঘমেয়াদী পরিবর্তনের ভিত্তি
          হতে পারে না। আমরা চাই আপনি আসুন বোঝার ইচ্ছা থেকে।
        </MText>
        <MText>তবুও একটা সত্যি কথা আছে, যেটা এড়িয়ে যাওয়া যায় না।</MText>
        <MText>প্রতিদিন আপনার সন্তান শিখছে। প্রতিদিন। সে কিছু না কিছু শিখছেই। প্রশ্ন হলো — সে কী শিখছে?</MText>
        <MList
          items={[
            "সে কি আরও Curious হচ্ছে? নাকি আরও Withdraw করছে?",
            "সে কি মানুষের সঙ্গে Connect করতে শিখছে? নাকি আরও নিজের মধ্যে ঢুকে যাচ্ছে?",
            "সে কি Problem Solve করতে শিখছে? নাকি শুধু Prompt-এর অপেক্ষা করছে?",
            "সে কি নিজের চিন্তা প্রকাশ করতে শিখছে? নাকি চেষ্টা করার আগেই হাল ছেড়ে দিচ্ছে?",
          ]}
        />
        <MText>
          কারণ Development Pause করে না। হয় এগোয়, হয় অন্য কোনো Pattern শক্তিশালী হয়।
        </MText>
        <MSub>একটা ছোট্ট উদাহরণ...</MSub>
        <MText>
          ধরুন আপনি Kolkata থেকে Delhi যেতে চান। কিন্তু ভুল রাস্তা ধরলেন। আপনি অনেক মন দিয়ে গাড়ি চালাচ্ছেন। অনেক
          সময় দিচ্ছেন। অনেক Fuel ব্যবহার করছেন। কিন্তু Direction-টাই যদি ভুল হয়, তাহলে আরও Driving আপনাকে
          Destination-এর কাছে নিয়ে যাবে? নাকি আরও দূরে?
        </MText>
        <MText>
          তাই আমরা সময়কে সবচেয়ে বড় সমস্যা বলি না। আমরা বলি Direction matters. তারপর Consistency matters. তারপর
          Time compounds both. আপনি যেদিকে এগোচ্ছেন, সময় সেই দিকটাকেই আরও শক্তিশালী করে।
        </MText>
        <MQuote>আমরা ভাবছিলাম... আমরা ঠিক কাজটাই করছি।</MQuote>
        <MText>
          আমরা তাঁদের বলি আপনারা ভুল করার জন্য আসেননি। আপনারা যেটা জানতেন, সেটাই করেছেন। এবং যে কোনো দায়িত্বশীল
          বাবা-মাই ঠিক সেটাই করতেন।
        </MText>
        <MText>
          Science of Stuck™ দোষ খোঁজে না। Direction খোঁজে। কারণ একবার Direction পরিষ্কার হয়ে গেলে পরিশ্রম আরও
          Meaningful হয়ে ওঠে।
        </MText>
        <MSub>আমি কি শুধু ব্যস্ত? নাকি আমি সত্যিই সবচেয়ে গুরুত্বপূর্ণ জায়গায় কাজ করছি?</MSub>
        <MText>
          Busy হওয়া আর Effective হওয়া এক জিনিস নয়। অনেক পরিবার খুব ব্যস্ত। Appointment, Therapy, School,
          Homework, Practice, Travel — সব মিলিয়ে দিন শেষ। কিন্তু দিন শেষে একটাই প্রশ্ন থেকে যায় — আমরা কি
          সবচেয়ে বেশি Leverage-ওয়ালা জায়গাতেই কাজ করলাম?
        </MText>
        <MText>
          হয়তো আপনি খেয়াল করেছেন এই Page-এ আমরা কোথাও কোনো Miracle Promise করিনি। আমরা বলিনি "২১ দিনে বদলে
          যাবে।" আমরা বলিনি "সব সমস্যার সমাধান।" আমরা বলিনি "Guaranteed Recovery." কারণ Development একটি Journey।
          কিন্তু সেই Journey আরও স্পষ্ট হতে পারে। আরও সংগঠিত হতে পারে। আরও অর্থপূর্ণ হতে পারে। এবং সেটাই আমাদের
          প্রতিশ্রুতি।
        </MText>
        <MQuote>আমরা যা জানতাম... তার সর্বোচ্চটাই করেছিলাম।</MQuote>
        <MEmphasis>হ্যাঁ... আমি শুধু ব্যস্ত থাকতে চাই না। আমি সঠিক দিকেও এগোতে চাই।</MEmphasis>
        <CTAButtons />
      </MSection>

      {/* Section 11: Different Parents */}
      <MSection tone="default">
        <Eyebrow>Section 11</Eyebrow>
        <MHeading>বাইরে থেকে সমস্যাগুলো আলাদা দেখায়। ভেতরে... হয়তো তারা একই গল্প বলছে।</MHeading>
        <MText>
          গত কয়েক বছর ধরে হাজার হাজার পরিবারের সঙ্গে কথা বলতে বলতে আমরা একটা বিষয় বারবার লক্ষ্য করেছি। বাবা-মায়েরা
          ভিন্ন শহর থেকে আসেন। ভিন্ন বয়সের শিশু। ভিন্ন Diagnosis। ভিন্ন Challenges। ভিন্ন আর্থিক অবস্থা। ভিন্ন পরিবার।
          কিন্তু যখন তাঁরা কথা বলতে শুরু করেন, অদ্ভুতভাবে তাঁদের প্রশ্নগুলো প্রায় একই হয়ে যায়।
        </MText>
        <MCards
          columns={2}
          items={[
            {
              title: "পরিবার ১: \"আমার সন্তান এখনও কথা বলে না...\"",
              body: "ইশারায় বোঝায়। কান্না করে। হাত ধরে নিয়ে যায়। চোখে চোখ রাখে কম। \"Speech-টাই কি সবচেয়ে বড় সমস্যা?\"",
            },
            {
              title: "পরিবার ২: \"আমার সন্তান অনেক কথা বলে...\"",
              body: "কিন্তু Conversation হয় না। প্রশ্নের উত্তর দেয় না। নিজের কথাই বলে। \"সমস্যাটা তাহলে কোথায়?\"",
            },
            {
              title: "পরিবার ৩: \"আমার সন্তান খুব Intelligent...\"",
              body: "Alphabet, Numbers, Maps জানে। কিন্তু নতুন Situation-এ ভেঙে পড়ে। \"এত কিছু জানে... তবুও এত অসুবিধা কেন?\"",
            },
            {
              title: "পরিবার ৪: \"আমার সন্তান Hyperactive...\"",
              body: "এক জায়গায় বসে না। একটার পর একটা কাজ শুরু করে, শেষ করে না। \"Attention-টাই কি সবচেয়ে বড় সমস্যা?\"",
            },
            {
              title: "পরিবার ৫: \"আমার সন্তান খুব শান্ত...\"",
              body: "নিজের মতো থাকে, একাই খেলতে পারে। কিন্তু মানুষের সঙ্গে যোগাযোগ কম। \"ও কি সত্যিই শিখছে?\"",
            },
            {
              title: "পরিবার ৬: \"স্কুল থেকে প্রায়ই Complaint আসে...\"",
              body: "শোনে না, Rules মানে না, Group Activity করে না। কখনও Aggressive, কখনও Withdrawn। \"স্কুলই কি ঠিক নয়?\"",
            },
            {
              title: "পরিবার ৭: \"সবাই বলছে অপেক্ষা করো...\"",
              body: "Doctor বলছেন সময় দাও। পরিবার বলছে সব ঠিক হয়ে যাবে। \"অপেক্ষা করব... কিন্তু কী বুঝে?\"",
            },
            {
              title: "পরিবার ৮: \"আমরা অনেক চেষ্টা করেছি...\"",
              body: "Therapy, Assessment, School, Diet, Supplements, Home Programme, Videos, Books, Parent Groups। \"আমরা কি সবচেয়ে গুরুত্বপূর্ণ জিনিসটাই Miss করছি?\"",
            },
          ]}
        />
        <MDivider />
        <MText>
          এখন একটা প্রশ্ন। এই আটটি পরিবারের সমস্যা কি একই? না। Diagnosis একই? না। লক্ষণ একই? না। তাহলে কেন তাঁদের
          প্রশ্নগুলো এত আশ্চর্যভাবে একই?
        </MText>
        <MText>
          কারণ অনেক সময় আমরা Symptoms দেখি। কিন্তু Development Symptoms দিয়ে এগোয় না। Development এগোয় তার নিজের
          Logic অনুযায়ী। আর যখন সেই Logic কোথাও আটকে যায়, তখন বাইরে বিভিন্ন রকম Symptoms দেখা দিতে পারে।
        </MText>
        <MSub>একটা নদীর কথা ভাবুন...</MSub>
        <MText>
          একটি বড় নদী। মাঝখানে একটা বিশাল পাথর। তারপর কী হয়? কোথাও জল ধীরে যায়। কোথাও ঘূর্ণি তৈরি হয়। কোথাও পানি
          উপচে পড়ে। কোথাও নদী সরু হয়ে যায়। বাইরের দৃশ্য অনেক রকম। কিন্তু কারণ? হয়তো একটাই।
        </MText>
        <MText>
          Development-ও অনেকটা এমন। বাইরে Speech Delay, Behaviour Challenge, Learning Difficulty, Attention
          Problem, Meltdown, Sensory Issue, Social Difficulty। কিন্তু যদি এগুলোর কিছু একই Developmental
          Bottleneck-এর ভিন্ন ভিন্ন প্রকাশ হয়? তাহলে?
        </MText>
        <MText>
          আর এখানেই Science of Stuck™ Diagnosis-এর বাইরে গিয়ে একটি নতুন প্রশ্ন করে — "এই শিশুর Development কোথায়
          আটকে আছে?" কারণ যখন আটকে থাকার জায়গাটা স্পষ্ট হয়, তখন পথও ধীরে ধীরে স্পষ্ট হতে শুরু করে।
        </MText>
        <MQuote>
          আমাদের সমস্যাটা হয়তো এতটা আলাদা নয়... হয়তো আমরাও সেই একই জায়গায় আটকে আছি...
        </MQuote>
        <MText>
          এবং যদি Root Cause বোঝা যায়, তাহলে Journey-টাও বদলানো সম্ভব।
        </MText>
        <MSub>যদি Root Cause খুঁজে পাওয়া যায়... তাহলে এরপর কী?</MSub>
        <MText>
          সেখান থেকেই Institute of NeuroDevelopment-এর চিন্তাধারা একটি নতুন পথে হাঁটতে শুরু করে। কারণ আমরা শুধু
          Bottleneck খুঁজে থেমে যাই না। আমরা একটি সম্পূর্ণ Developmental Journey Design করার চেষ্টা করি।
        </MText>
        <MEmphasis>হ্যাঁ... আমি আমার সন্তানের Development-এর বড় ছবিটা বুঝতে চাই।</MEmphasis>
        <CTAButtons />
      </MSection>

      {/* Section 12: What Makes IND Different */}
      <MSection tone="accent">
        <Eyebrow>Section 12</Eyebrow>
        <MHeading>
          হয়তো সমস্যাটা কোনো এক Therapy-র ছিল না। সমস্যাটা ছিল সবকিছুকে একসঙ্গে না দেখার মধ্যে।
        </MHeading>
        <MSub>এখান থেকেই Institute of NeuroDevelopment-এর গল্প শুরু।</MSub>
        <MText>
          আমরা নিজেদের কখনও শুধু একটি Therapy Centre হিসেবে ভাবিনি। কারণ আমরা দেখেছি একটি শিশু শুধু Speech নয়,
          শুধু Behaviour নয়, শুধু Sensory নয়, শুধু Learning নয়। একটি শিশু এর চেয়ে অনেক বড়।
        </MText>
        <MText>
          তাই আমরা একটি প্রশ্ন দিয়ে শুরু করি — "এই শিশুর সবচেয়ে বড় সম্ভাবনাকে আটকে রেখেছে কী?" শুধু "ও কী পারে না?"
          তা নয়।
        </MText>
        <MText>
          আমাদের কাছে Development মানে একটি Building তৈরি করা। আপনি প্রথমে ছাদ বানাবেন না। প্রথমে Foundation।
          তারপর একটি তলা। তারপর আরেকটি তলা। তারপর সম্পূর্ণ কাঠামো। ঠিক তেমনই আমরা বিশ্বাস করি Development-এরও একটি
          Natural Order আছে। যখন সেই ক্রম (Sequence) সম্মান করা হয়, তখন পরিবর্তন আরও স্থায়ী হয়।
        </MText>
        <MText>
          আমরা আরেকটি প্রশ্ন করি — "আজ আমরা কী শেখাব?" এই প্রশ্নের আগে আমরা জিজ্ঞেস করি "আজ শেখানোর জন্য শিশুটি
          প্রস্তুত কি?" কারণ যদি ভিত্তিটাই তৈরি না হয়, তাহলে Skill শেখানো যায়, কিন্তু Skill টিকে থাকে না।
        </MText>
        <MText>
          আমরা Therapy-গুলোকে প্রতিযোগী হিসেবে দেখি না। আমরা ওগুলোকে একটি Orchestra-র Instrument হিসেবে দেখি।
          Speech Therapy, Occupational Therapy, Behaviour Support, Education, Medical Guidance — সবকিছুরই
          নিজস্ব ভূমিকা আছে। কিন্তু একটি প্রশ্ন — কে পুরো Symphony-টা দেখছে?
        </MText>
        <MText>
          আমাদের কাছে সবচেয়ে বড় প্রশ্ন আরও একটি Therapy যোগ করা নয়। বরং — সবকিছু কি একই Developmental
          Direction-এ এগোচ্ছে? কারণ Direction ছাড়া Effort অনেক সময় Fragmented হয়ে যায়। আর যখন সবকিছু একটি
          Common Direction-এ এগোয়, তখন ছোট ছোট পরিবর্তন ধীরে ধীরে একটি বড় পরিবর্তনের ভিত্তি তৈরি করে।
        </MText>
        <MSub>এই কারণেই আমরা একটি নতুন শব্দ ব্যবহার করি — Parent-Led NeuroDevelopment System</MSub>
        <MText>
          এর অর্থ Professional-এর গুরুত্ব কম নয়। বরং Professional-এর ভূমিকা আরও পরিষ্কার। তাঁরা দিশা দেখান।
          বোঝান। পরিকল্পনা করেন। পর্যবেক্ষণ করেন। প্রয়োজনে পথ সংশোধন করেন। কিন্তু Development প্রতিদিন বাড়িতে,
          বাস্তব জীবনে, Relationship-এর মধ্যে, Routine-এর মধ্যে, Play-এর মধ্যে, Conversation-এর মধ্যে ঘটে। আর এই
          জায়গাগুলোর সবচেয়ে গুরুত্বপূর্ণ মানুষটি আপনিই।
        </MText>
        <MText>
          তাই আমরা একটি Therapy Model তৈরি করিনি। আমরা একটি Development Model তৈরি করার চেষ্টা করেছি। একটি এমন
          Model যেখানে প্রশ্নটা হয় না "আজ কী Exercise করব?" প্রশ্নটা হয় "আজকের অভিজ্ঞতাকে কীভাবে Development-এর
          সুযোগে পরিণত করব?"
        </MText>
        <MText>
          আমাদের বিশ্বাস — Development Appointment-এর মধ্যে সীমাবদ্ধ নয়। Development জীবনের মধ্যে ঘটে। খাওয়ার
          সময়। গল্প বলার সময়। খেলার সময়। অপেক্ষা করার সময়। ভুল করার সময়। হাসার সময়। কাঁদার সময়। প্রতিদিনের
          অসংখ্য ছোট ছোট মুহূর্তে।
        </MText>
        <MText>
          তাই আমরা Session Count করি না। আমরা Developmental Opportunities দেখি। কারণ একটি সপ্তাহে Therapy-এর সময়
          হয়তো কয়েক ঘণ্টা। কিন্তু বাস্তব জীবন? সেখানে অসংখ্য Opportunity। এই Opportunity-গুলোকেই Meaningful করে
          তোলাই Parent-Led চিন্তার কেন্দ্রবিন্দু।
        </MText>
        <MText>
          আর এই কারণেই Institute of NeuroDevelopment নিজেদের শুধু একটি Centre বলে না। আমরা একটি Movement গড়ে
          তুলতে চাই। একটি Movement যেখানে বাবা-মা শুধু দর্শক নন। শুধু Appointment Manager নন। শুধু Home Practice
          Supervisor নন। বরং তাঁরা নিজেদের সন্তানের সবচেয়ে গুরুত্বপূর্ণ Development Partner।
        </MText>
        <MSub>আমাদের Vision...</MSub>
        <MText>
          শুধু একটি শিশুর Behaviour Improve করা নয়। শুধু Speech বাড়ানো নয়। শুধু Assessment Score উন্নত করা নয়।
          আমাদের Vision একটি পরিবারকে এমনভাবে সক্ষম করে তোলা যাতে তারা আগামী দিনের নতুন Challenge-গুলোর সামনেও
          আত্মবিশ্বাসের সঙ্গে নিজেদের পথ খুঁজে নিতে পারেন।
        </MText>
        <MText>
          হয়তো এখন আপনি বুঝতে পারছেন কেন আমরা Science of Stuck™-কে একটি Webinar বলি না। কারণ এটি একটি নতুন
          Developmental Lens। আর এই Lens-টাই Institute of NeuroDevelopment-এর সমস্ত কাজের ভিত্তি।
        </MText>
        <MQuote>
          এই চিন্তাগুলো কি শুধু তত্ত্ব? নাকি বাস্তব পরিবারগুলোর জীবনেও এর প্রভাব দেখা গেছে?
        </MQuote>
        <CTAButtons />
      </MSection>
    </>
  );
}
