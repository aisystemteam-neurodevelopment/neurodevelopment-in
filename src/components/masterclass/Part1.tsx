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

export function Part1() {
  return (
    <>
      {/* SECTION 1: HERO */}
      <MSection id="hero" tone="default">
        <Eyebrow>
          ১০,০০০+ পরিবারের পাশে | শিশুদের সঙ্গে কাজের অভিজ্ঞতা ২০০৫ সাল থেকে | ভারত, বাংলাদেশ ও
          বিশ্বের বিভিন্ন দেশের পরিবার | Institute of NeuroDevelopment
        </Eyebrow>

        <MHeading>
          আপনার সন্তানের ভবিষ্যৎ নিয়ে...
          <br />
          আপনিও কি কখনও গভীর রাতে চুপচাপ চিন্তা করেন?
        </MHeading>

        <MSub>{"\u201c\u0986\u09ae\u09b0\u09be \u0995\u09bf \u09b8\u09a4\u09cd\u09af\u09bf\u0987 \u09a0\u09bf\u0995 \u09aa\u09a5\u09c7 \u098f\u0997\u09cb\u099a\u09cd\u099b\u09bf?\u201d"}</MSub>
        <MSub>{"\u201c\u0986\u09ae\u09b0\u09be \u09af\u09be \u0995\u09b0\u099b\u09bf... \u09b8\u09c7\u099f\u09be \u0995\u09bf \u09af\u09a5\u09c7\u09b7\u09cd\u099f?\u201d"}</MSub>
        <MSub>
          {
            "\u201c\u09a8\u09be\u0995\u09bf \u0995\u09cb\u09a5\u09be\u0993 \u098f\u09ae\u09a8 \u0995\u09bf\u099b\u09c1... \u09af\u09c7\u099f\u09be \u0986\u09ae\u09b0\u09be \u098f\u0996\u09a8\u0993 \u09ac\u09c1\u099d\u09a4\u09c7\u0987 \u09aa\u09be\u09b0\u09bf\u09a8\u09bf?\u201d"
          }
        </MSub>

        <MText>যদি এই প্রশ্নগুলো কখনও আপনার মনেও এসে থাকে...</MText>
        <MText>তাহলে আপনি একা নন।</MText>
        <MText>হাজার হাজার বাবা-মা ঠিক এই প্রশ্নগুলো নিয়েই আমাদের কাছে এসেছেন।</MText>
        <MText>আর সেই কারণেই আমরা তৈরি করেছি...</MText>

        <MEmphasis>SCIENCE OF STUCK™</MEmphasis>
        <MSub>একটি ৩ ঘণ্টার Live Breakthrough Experience</MSub>
        <MText>
          যা হয়তো আপনার সন্তানের development-কে দেখার দৃষ্টিভঙ্গিই বদলে দিতে পারে।
        </MText>

        <MDivider />

        <MSub>Emotional Opening</MSub>
        <MText>আপনি একজন দায়িত্বশীল বাবা বা মা।</MText>
        <MText>আপনি চেষ্টা করছেন। অনেক চেষ্টা করছেন।</MText>
        <MList
          items={[
            "Doctor দেখিয়েছেন।",
            "Assessment করিয়েছেন।",
            "Therapy করাচ্ছেন।",
            "স্কুলে ভর্তি করেছেন।",
            "বাড়িতেও সময় দিচ্ছেন।",
            "Google-এ খুঁজেছেন।",
            "YouTube দেখেছেন।",
            "অন্য বাবা-মায়ের সঙ্গে কথা বলেছেন।",
            "সবাইয়ের পরামর্শ শুনেছেন।",
          ]}
        />
        <MText>কারণ... আপনার সন্তানের জন্য আপনি যা সম্ভব... সবই করতে চান।</MText>

        <MQuote>
          "আমরা এত কিছু করছি..." "তবুও যেন ঠিক যেটা হওয়ার কথা..." "...সেটা হচ্ছে না।"
        </MQuote>

        <MText>হয়তো improvement হচ্ছে... কিন্তু... যতটা আশা করেছিলেন... ততটা নয়।</MText>
        <MText>হয়তো নতুন কিছু শিখছে... কিন্তু... দৈনন্দিন জীবনে সেটা খুব একটা দেখা যাচ্ছে না।</MText>
        <MText>হয়তো সবাই বলছে... "সময় লাগবে।" কিন্তু...</MText>
        <MEmphasis>"আর কতটা সময়?"</MEmphasis>

        <MDivider />

        <MSub>যদি আমি বলি...</MSub>
        <MText>
          অনেক সময়... সমস্যাটা আপনার সন্তানের মধ্যে নয়। সমস্যাটা... আপনার parenting-এর মধ্যেও
          নয়। সমস্যাটা... Therapy-এর মধ্যেও নয়।
        </MText>
        <MEmphasis>তাহলে আসলে কোথায়?</MEmphasis>
        <MText>
          এই প্রশ্নের উত্তরই... হাজার হাজার পরিবারের জন্য নতুন পথ খুলে দিয়েছে। আর সেটাই আপনি
          জানবেন... Science of Stuck™-এ।
        </MText>

        <MDivider />

        <MSub>What is Science of Stuck?</MSub>
        <MText>এটা আর পাঁচটা Webinar নয়।</MText>
        <MText>
          এটা এমন একটি Breakthrough Experience... যেখানে আপনি প্রথমবার বুঝতে শুরু করবেন... কেন...
          কিছু শিশু অনেক দ্রুত এগোয়... আর কিছু শিশু... বছরের পর বছর চেষ্টা করার পরও... একই জায়গায়
          আটকে থাকে।
        </MText>

        <MSub>In just 3 hours, you may begin to understand...</MSub>
        <MList
          items={[
            "কেন শুধু বেশি Therapy মানেই বেশি Progress নয়।",
            "কেন একই Diagnosis থাকা দুই শিশুর উন্নতির গতি সম্পূর্ণ আলাদা হতে পারে।",
            "কেন অনেক Skill Session-এর বাইরে হারিয়ে যায়।",
            "কেন বাড়িই হতে পারে আপনার সন্তানের সবচেয়ে শক্তিশালী Development Environment।",
            "এবং সবচেয়ে গুরুত্বপূর্ণ... কীভাবে আপনি নিজেই আপনার সন্তানের সবচেয়ে বড় পরিবর্তনের শক্তি হয়ে উঠতে পারেন।",
          ]}
        />

        <MDivider />

        <MSub>This Is For Parents Who...</MSub>
        <MText>চটজলদি Tips খুঁজছেন না... বরং... নিজের সন্তানের Development-কে গভীরভাবে বুঝতে চান।</MText>
        <MText>
          কারণ... যখন বোঝাটা বদলায়... তখন সিদ্ধান্ত বদলায়। সিদ্ধান্ত বদলালে... পথ বদলায়। আর পথ
          বদলালে... অনেক সময় ভবিষ্যৎও বদলে যায়।
        </MText>

        <MHeading className="text-2xl md:text-3xl">
          হ্যাঁ, আমি জানতে চাই আমার সন্তান আসলে কোথায় আটকে আছে
        </MHeading>
        <CTAButtons />

        <MDivider />

        <MSub>১০০% Satisfaction Guarantee</MSub>
        <MText>
          আপনি যদি পুরো Webinar-এ অংশগ্রহণ করার পর মনে করেন... আপনি কোনো মূল্যবান Insight বা
          Clarity পাননি... আমরা আপনার Registration Fee ১০০% ফেরত দেব।
        </MText>
        <MText>
          কারণ... আমরা বিশ্বাস করি... একজন বাবা-মায়ের বিশ্বাস অর্জন করা, টাকা নেওয়ার চেয়ে অনেক
          বেশি গুরুত্বপূর্ণ।
        </MText>

        <MStats
          items={[
            { value: "১০,০০০+", label: "পরিবার" },
            { value: "১৭০+", label: "Parent Webinars" },
            { value: "Parent-Led", label: "NeuroDevelopment System" },
            { value: "2005", label: "Working with Children Since" },
          ]}
        />
        <MText className="mt-6">Institute of NeuroDevelopment</MText>
      </MSection>

      {/* SECTION 2: IMMEDIATE QUALIFICATION */}
      <MSection id="qualification" tone="muted">
        <MHeading>এই অভিজ্ঞতাটি (Science of Stuck) সবার জন্য নয়।</MHeading>
        <MSub>কিন্তু যদি নিচের কথাগুলোর মধ্যে নিজেকে খুঁজে পান...</MSub>
        <MSub>তাহলে হয়তো আপনি ঠিক জায়গাতেই এসেছেন।</MSub>

        <MText className="mt-8">আপনি কি এমন একজন বাবা বা মা... যিনি... নিজের সন্তানের জন্য যা সম্ভব... প্রায় সবই করেছেন?</MText>
        <MText>কারণ আপনি বিশ্বাস করেন...</MText>
        <MQuote>আমার সন্তানের মধ্যে আরও অনেক সম্ভাবনা আছে।</MQuote>
        <MText>কিন্তু... আজও আপনি পুরোপুরি নিশ্চিত নন... ঠিক কোন পথে এগোলে সবচেয়ে বেশি পরিবর্তন আসবে।</MText>
        <MText>যদি এমন হয়... আপনি একা নন।</MText>

        <MDivider />

        <MSub>অথবা... আপনার দিনগুলো কি এমনই কাটে?</MSub>
        <MText>
          সকালে... স্কুলের প্রস্তুতি... খাওয়ানো... অনুরোধ... বুঝিয়ে বলা... মাঝে মাঝে কান্না...
          মাঝে মাঝে Meltdown... মাঝে মাঝে Resistance... তারপর Therapy... তারপর আবার বাড়ি... তারপর
          Home Practice করার চেষ্টা...
        </MText>
        <MText>তারপর... রাতে নিজের মনে একটা প্রশ্ন...</MText>
        <MEmphasis>"আজ সত্যিই কিছু এগোল?"</MEmphasis>

        <MDivider />

        <MSub>হয়তো আপনার WhatsApp-এ আছে...</MSub>
        <MList
          items={[
            "Doctor-এর Prescription...",
            "Therapist-এর Advice...",
            "Assessment Report...",
            "School Feedback...",
            "YouTube Video...",
            "Facebook Group...",
            "Google Search...",
            "আর অসংখ্য Screenshot...",
          ]}
        />
        <MText>কিন্তু... একটা পরিষ্কার Roadmap নেই। কি আগে? কি পরে? কেন? কতদিন?</MText>
        <MText>কেউ যেন পুরো ছবিটা দেখাচ্ছে না।</MText>

        <MDivider />

        <MSub>হয়তো আপনি এমন একজন...</MSub>
        <MText>যিনি... Advice পাচ্ছেন অনেক... কিন্তু... Ownership নিচ্ছে কেউ না।</MText>
        <MText>
          একজন বলছেন Speech। আরেকজন বলছেন Behaviour। আরেকজন বলছেন OT। কেউ বলছেন Sensory। কেউ
          বলছেন Diet। কেউ বলছেন School Change। কেউ বলছেন অপেক্ষা করুন।
        </MText>
        <MEmphasis>"আমি আসলে কার কথা শুনব?"</MEmphasis>

        <MDivider />

        <MSub>অথবা... আপনি কি শুধু একটা জিনিস চান?</MSub>
        <MText>Clarity. আর কিছু নয়।</MText>
        <MText>কেউ যদি শুধু আপনাকে বুঝিয়ে দেয়...</MText>
        <MList
          items={[
            "আমার সন্তানের সবচেয়ে বড় Bottleneck এখন কী?",
            "কেন সেটা হচ্ছে?",
            "এখন সবচেয়ে গুরুত্বপূর্ণ কাজটা কী?",
          ]}
        />
        <MText>আপনি বাকিটা করতে প্রস্তুত।</MText>

        <MDivider />

        <MSub>হয়তো...</MSub>
        <MText>আপনার সন্তানের Diagnosis হয়েছে...</MText>
        <MCards
          items={[
            { title: "Autism" },
            { title: "ADHD" },
            { title: "Speech Delay" },
            { title: "Developmental Delay" },
            { title: "Learning Difficulty" },
            { title: "Sensory Processing Difficulty" },
          ]}
          columns={3}
        />
        <MText>
          অথবা... এখনও কোনো Diagnosis হয়নি... কিন্তু... আপনার বাবা-মায়ের অনুভূতি বলছে...
        </MText>
        <MQuote>কিছু একটা ঠিক হচ্ছে না...</MQuote>
        <MText>আমরা সেই অনুভূতিকে গুরুত্ব দিই। Diagnosis আমাদের জন্য শুরু... শেষ নয়।</MText>

        <MDivider />

        <MSub>এই Science of Stuck বিশেষভাবে তাঁদের জন্য...</MSub>
        <MText>যারা এখনও হাল ছাড়েননি। যারা এখনও শিখতে চান।</MText>
        <MText>যারা এখনও বিশ্বাস করেন...</MText>
        <MQuote>আমার সন্তানের আরও ভালো করার ক্ষমতা আছে।</MQuote>
        <MText>
          যারা... Professional-এর উপর পুরোপুরি নির্ভরশীল হয়ে থাকতে চান না... বরং... নিজের
          সন্তানের Development-এর একজন আত্মবিশ্বাসী Leader হতে চান।
        </MText>
        <MText>কারণ... আমাদের বিশ্বাস...</MText>
        <MEmphasis>একজন Empowered Parent... একটি শিশুর জীবনে... সবচেয়ে বড় Long-Term Difference তৈরি করতে পারেন।</MEmphasis>

        <MDivider />

        <MSub>কিন্তু... এই Webinar সবার জন্য নয়।</MSub>
        <MText>হয়তো এই Webinar আপনার জন্য নয় যদি... আপনি এমন কিছু খুঁজছেন...</MText>
        <MList
          items={[
            "যা এক রাতেই সব সমস্যার সমাধান করে দেবে।",
            "যেখানে শুধু কিছু Tips & Tricks দেওয়া হবে।",
            "যেখানে আপনার কোনো ভূমিকা থাকবে না।",
            "যেখানে শুধু নতুন Therapy-এর নাম বলা হবে।",
            "যেখানে প্রশ্ন করার প্রয়োজন নেই, শুধু Follow করলেই হবে।",
          ]}
        />
        <MText>Science of Stuck... এসবের কোনোটাই নয়।</MText>

        <MDivider />

        <MSub>কারণ...</MSub>
        <MText>এটি এমন বাবা-মায়েদের জন্য... যারা শুধু জানতে চান না...</MText>
        <MEmphasis>"What should I do?"</MEmphasis>
        <MText>বরং জানতে চান...</MText>
        <MEmphasis>"Why does my child seem stuck?"</MEmphasis>
        <MText>এবং...</MText>
        <MEmphasis>"What is the right sequence to create real progress?"</MEmphasis>

        <MDivider />

        <MText className="mt-8">এখন হয়তো আপনি ভাবছেন...</MText>
        <MEmphasis>"হ্যাঁ... এটাই তো আমাদের গল্প।"</MEmphasis>
        <MText>কিন্তু... যদি আমরা বলি...</MText>
        <MText>
          আপনার কষ্টের অর্ধেকটাই এসেছে... আপনার সন্তানের সমস্যা থেকে নয়... বরং এমন কিছু অদৃশ্য চাপ
          থেকে... যেগুলো আপনি প্রতিদিন বহন করছেন... ...তাহলে?
        </MText>
        <MText>পরের অংশে... আমরা কথা বলব... সেই কথাগুলো নিয়ে...</MText>
        <MSub>যেগুলো বেশিরভাগ বাবা-মা কাউকে কখনও বলেন না।</MSub>

        <MHeading className="text-2xl md:text-3xl">
          হ্যাঁ... আমি জানতে চাই কেন আমরা এতদিন আটকে ছিলাম।
        </MHeading>
        <CTAButtons />
      </MSection>

      {/* SECTION 3: THE EMOTIONAL REALITY */}
      <MSection id="emotional-reality" tone="default">
        <MHeading>আপনার সন্তানের কষ্টটা সবাই দেখতে পায়...</MHeading>
        <MSub>কিন্তু আপনার কষ্টটা?</MSub>
        <MSub>সেটা হয়তো খুব কম মানুষই বোঝে।</MSub>

        <MText className="mt-8">অনেকেই আপনার সন্তানকে দেখে। কিন্তু... খুব কম মানুষ... আপনাকে দেখে।</MText>
        <MText>
          আপনার ভয়... আপনার ক্লান্তি... আপনার অপরাধবোধ... আপনার অজস্র প্রশ্ন... সেগুলো খুব কম
          মানুষই দেখে।
        </MText>

        <MDivider />

        <MSub>কারণ...</MSub>
        <MText>আপনি হাসেন। অফিস করেন। বাড়ির কাজ করেন। সব দায়িত্ব পালন করেন। সবার সামনে নিজেকে শক্ত রাখেন।</MText>
        <MText>কিন্তু... রাতের নীরবতায়... আপনার মনটা অন্যরকম কথা বলে।</MText>

        <MDivider />

        <MSub>হয়তো আপনারও এমন হয়েছে...</MSub>
        <MText>রাতে ঘুমিয়ে পড়ার পরে... আপনি আপনার সন্তানের মুখের দিকে তাকিয়ে ভাবছেন...</MText>
        <MQuote>আমি কি আরও ভালো কিছু করতে পারতাম?</MQuote>

        <MText>অথবা... কোনো অন্য বাচ্চাকে খেলতে দেখে... আপনার মনে এক মুহূর্তের জন্য প্রশ্ন এসেছে...</MText>
        <MQuote>আমাদের সন্তানও কি কোনোদিন এমন হবে?</MQuote>

        <MText>অথবা... কেউ খুব সহজভাবে বলে দিয়েছে...</MText>
        <MQuote>আরও একটু Therapy করান...</MQuote>
        <MText>আর আপনার মনে হয়েছে...</MText>
        <MQuote>আমরা তো সেটাও করছি...</MQuote>

        <MText>অথবা... স্কুল থেকে ফোন এসেছে। আবার Complaint। আবার Meeting। আবার Explanation।</MText>
        <MText>আর আপনি মনে মনে শুধু ভেবেছেন...</MText>
        <MQuote>আজ আবার কী হলো?</MQuote>

        <MText>অথবা... কোনো আত্মীয় খুব সহজভাবে বলে দিয়েছেন...</MText>
        <MQuote>এখনও কথা বলে না? এত Therapy করিয়েও?</MQuote>
        <MText>আর আপনি... শুধু একটা হাসি দিয়েছেন। কারণ... সবাইকে সবকিছু বোঝানো যায় না।</MText>

        <MDivider />

        <MSub>এমনও কি হয়েছে...</MSub>
        <MText>
          আপনি Social Media-তে... অন্য কোনো শিশুর Progress Video দেখেছেন... খুব খুশি হওয়ার চেষ্টা
          করেছেন... কিন্তু... ভেতরে ভেতরে একটা কষ্ট হয়েছে...
        </MText>
        <MQuote>আমাদেরটা কেন এমন হচ্ছে না?</MQuote>
        <MText>তারপর... আবার নিজের মনকেই বুঝিয়েছেন...</MText>
        <MQuote>Comparison করা উচিত নয়...</MQuote>
        <MText>কিন্তু... মন কি সবসময় যুক্তির কথা শোনে?</MText>

        <MDivider />

        <MSub>হয়তো...</MSub>
        <MText>আপনি Google-এ একই প্রশ্ন... দশবার Search করেছেন।</MText>
        <MList
          items={[
            "Speech Delay",
            "Autism Recovery",
            "ADHD Treatment",
            "Best Therapy",
            "Best Diet",
            "Signs of Improvement",
          ]}
        />
        <MText>
          তারপর... একটা Article থেকে আরেকটা। একটা Video থেকে আরেকটা। একটা Parent Group থেকে
          আরেকটা।
        </MText>
        <MText>শেষে... Information অনেক বেড়েছে... কিন্তু...</MText>
        <MEmphasis>Clarity? হয়তো ততটা নয়।</MEmphasis>

        <MDivider />

        <MSub>সবচেয়ে কঠিন মুহূর্তগুলো হয়তো এগুলো...</MSub>
        <MText>যখন... আপনার সন্তান... আপনার দিকে তাকায় না। আপনার ডাকে সাড়া দেয় না।</MText>
        <MText>অথবা... একটা Meltdown শুরু হয়... আর আপনি জানেন না...</MText>
        <MEmphasis>এই মুহূর্তে ঠিক কী করা উচিত।</MEmphasis>

        <MText>
          অথবা... আপনি খুব আনন্দ নিয়ে... কিছু শেখাতে বসেছেন... কিন্তু... দশ মিনিটের মধ্যেই... সব
          ভেঙে গেছে। তারপর... নিজের উপরই রাগ হয়েছে।
        </MText>
        <MText>অথবা... আপনি ভেবেছেন...</MText>
        <MQuote>হয়তো আমি ভালো Parent নই...</MQuote>

        <MDivider />

        <MSub>যদি কখনও এমন ভেবে থাকেন...</MSub>
        <MText>আমরা একটা কথা বলতে চাই।</MText>
        <MEmphasis>আপনি খারাপ Parent নন।</MEmphasis>
        <MText>আপনি উদাসীন Parent নন। আপনি অলস Parent নন।</MText>
        <MText>বরং... আপনি সম্ভবত...</MText>
        <MEmphasis>একজন খুব ক্লান্ত Parent।</MEmphasis>
        <MText>
          একজন... যিনি অনেক চেষ্টা করছেন... কিন্তু... প্রতিদিন বুঝতে পারছেন না... কোন চেষ্টাটা...
          সবচেয়ে গুরুত্বপূর্ণ।
        </MText>

        <MDivider />

        <MSub>আর এখানেই...</MSub>
        <MText>বেশিরভাগ পরিবার একটা ভুল ধারণা তৈরি করে। তারা ভাবতে শুরু করে...</MText>
        <MQuote>হয়তো আমার সন্তানই খুব Difficult...</MQuote>
        <MText>অথবা...</MText>
        <MQuote>হয়তো আমাদের ভাগ্যটাই খারাপ...</MQuote>
        <MText>অথবা...</MText>
        <MQuote>হয়তো এতটাই হওয়ার ছিল...</MQuote>
        <MText>কিন্তু... যদি এগুলোর কোনোটাই পুরো সত্যি না হয়?</MText>

        <MDivider />

        <MSub>যদি...</MSub>
        <MText>
          আপনার সন্তানের Progress... শুধু... সে কত Therapy করছে... তার উপর নির্ভর না করে... আরও
          গভীর কিছু বিষয়ের উপর নির্ভর করে?
        </MText>
        <MText>যদি... এতদিন... আপনি সমস্যাটাকে... ভুল জায়গায় খুঁজে থাকেন?</MText>

        <MDivider />

        <MSub>Science of Stuck-এর যাত্রা শুরু হয়...</MSub>
        <MText>এই উপলব্ধি থেকে।</MText>
        <MEmphasis>দোষ খোঁজার মাধ্যমে নয়। বোঝার মাধ্যমে।</MEmphasis>
        <MText>কারণ... যখন আমরা সমস্যাকে নতুনভাবে দেখতে শিখি... তখনই... সমাধানের নতুন দরজাও খুলতে শুরু করে।</MText>

        <MDivider />

        <MSub>A quiet promise from us...</MSub>
        <MText>এই Webinar-এ...</MText>
        <MList
          items={[
            "আমরা আপনার সন্তানের বিচার করব না।",
            "আমরা আপনার Parenting-এর বিচার করব না।",
            "আমরা আপনাকে ভয়ও দেখাব না।",
          ]}
        />
        <MText>আমরা শুধু চেষ্টা করব... আপনার এতদিনের অভিজ্ঞতাগুলোকে... একটি নতুন আলোয় দেখাতে।</MText>
        <MText>
          অনেক অভিভাবকের জন্য সেই পরিবর্তিত দৃষ্টিভঙ্গিই ছিল সবচেয়ে বড় Turning Point, কারণ তারা
          প্রথমবার বুঝতে পেরেছিলেন কেন বছরের পর বছর চেষ্টা করেও তারা কাঙ্ক্ষিত অগ্রগতি পাচ্ছিলেন
          না, এবং কেন একটি parent-led roadmap এত গুরুত্বপূর্ণ।
        </MText>

        <MDivider />

        <MText className="mt-8">কিন্তু... একটা প্রশ্ন এখনও রয়ে গেল।</MText>
        <MEmphasis>যদি এত চেষ্টা... এত ভালোবাসা... তবুও কেন এমন হয়?</MEmphasis>
      </MSection>

      {/* SECTION 4: HIDDEN THOUGHTS PARENTS NEVER SAY OUT LOUD */}
      <MSection id="hidden-thoughts" tone="muted">
        <MText>মনটা কেঁপে ওঠে।</MText>
        <MText>তারপর... আবার নিজেকে বোঝান...</MText>
        <MQuote>প্রতিটা শিশুর Journey আলাদা।</MQuote>
        <MText>কিন্তু... একজন বাবা-মায়ের হৃদয়... সবসময় এত সহজে মানতে পারে না।</MText>

        <MDivider />

        <MSub>আর সবচেয়ে বড় ভয়টা?</MSub>
        <MText>অনেকেই মুখে বলেন না। কিন্তু... মনের ভেতরে প্রশ্নটা থেকে যায়।</MText>
        <MEmphasis>"আমার সন্তান কি কোনোদিন নিজের জীবনটা নিজে সামলাতে পারবে?"</MEmphasis>
        <MText>সত্যি বলতে... এই প্রশ্নটাই... অনেক বাবা-মায়ের প্রতিটি সিদ্ধান্তকে প্রভাবিত করে।</MText>

        <MDivider />

        <MSub>আমরা আপনাকে একটা কথা বলতে চাই।</MSub>
        <MText>এই অনুভূতিগুলো... দুর্বলতার লক্ষণ নয়।</MText>
        <MText>এগুলো... একজন দায়িত্বশীল বাবা-মায়ের ভালোবাসার প্রকাশ।</MText>
        <MText>
          কারণ... যে বাবা-মা ভাবেন... প্রশ্ন করেন... খোঁজ করেন... শেখেন... তাঁরাই পরিবর্তনের
          সম্ভাবনাকে বাঁচিয়ে রাখেন।
        </MText>

        <MDivider />

        <MSub>কিন্তু...</MSub>
        <MText>একটা বিষয় আমরা বহু বছর ধরে বারবার দেখেছি...</MText>
        <MText>
          অনেক পরিবার... এই ভয়গুলোর উত্তর খুঁজতে গিয়ে... আরও Advice সংগ্রহ করেন। আরও Therapy
          যোগ করেন। আরও Opinion নেন।
        </MText>
        <MText>কিন্তু... ভয়ের মূল কারণটা থেকে যায়। কেন?</MText>

        <MDivider />

        <MSub>কারণ...</MSub>
        <MText>ভয় কমে... Information দিয়ে নয়।</MText>
        <MEmphasis>ভয় কমে... Understanding দিয়ে।</MEmphasis>
        <MText>আর... Understanding আসে... যখন আপনি... পুরো ছবিটা দেখতে শুরু করেন।</MText>

        <MDivider />

        <MSub>হয়তো...</MSub>
        <MText>আজ পর্যন্ত... আপনি সমস্যাটাকে... অনেকগুলো আলাদা আলাদা অংশ হিসেবে দেখেছেন।</MText>
        <MList
          items={[
            "Speech...",
            "Behaviour...",
            "Attention...",
            "Learning...",
            "Sensory...",
            "School...",
            "Sleep...",
            "Food...",
          ]}
        />
        <MText>কিন্তু... যদি এগুলো... আলাদা সমস্যা না হয়ে... একই গল্পের... ভিন্ন ভিন্ন অধ্যায় হয়?</MText>

        <MDivider />

        <MSub>আর যদি...</MSub>
        <MText>আপনার সন্তানের Development... Random না হয়ে... একটি Natural Sequence অনুসরণ করে?</MText>
        <MText>তাহলে... হয়তো... অনেক প্রশ্নের উত্তর... একসঙ্গে পাওয়া সম্ভব।</MText>

        <MDivider />

        <MText className="mt-8">এবার... আমরা এমন একটি প্রশ্নের দিকে আসি... যেটা হয়তো... সবচেয়ে গুরুত্বপূর্ণ।</MText>
        <MEmphasis>
          কেন... এত ভালোবাসা... এত পরিশ্রম... এত টাকা... এত সময়... দেওয়ার পরও... অনেক শিশু যেন
          একই জায়গায় আটকে থাকে?
        </MEmphasis>
        <MText>এটা কি শুধুই ভাগ্য? Diagnosis? সময়?</MText>
        <MText>নাকি... আমরা এতদিন সমস্যাটাকেই ভুলভাবে দেখে এসেছি?</MText>
        <MText>সেখান থেকেই শুরু হবে... Science of Stuck-এর সবচেয়ে গুরুত্বপূর্ণ উপলব্ধি।</MText>

        <MHeading className="text-2xl md:text-3xl">
          হ্যাঁ... আমি জানতে চাই আসলে কেন এতদিন আমরা আটকে ছিলাম।
        </MHeading>
        <CTAButtons />
      </MSection>

      {/* SECTION 5: WHY EVERYTHING FEELS STUCK */}
      <MSection id="why-stuck" tone="default">
        <MHeading>তাহলে... কেন এত চেষ্টা করার পরও... অনেক শিশু যেন একই জায়গায় আটকে থাকে?</MHeading>

        <MSub>আমরা আপনাকে একটা প্রশ্ন করতে চাই...</MSub>
        <MText>
          যদি... একজন বাবা-মা... নিজের সর্বস্ব দিয়ে চেষ্টা করেন... ভালো Doctor দেখান... নিয়মিত
          Therapy করান... সময় দেন... ভালোবাসা দেন... তবুও... কাঙ্ক্ষিত Progress না আসে...
        </MText>
        <MEmphasis>তাহলে আসল সমস্যা কোথায়?</MEmphasis>

        <MDivider />

        <MSub>এটা কি...</MSub>
        <MText>আপনার সন্তানের ইচ্ছার অভাব? না।</MText>
        <MText>আপনার ভালোবাসার অভাব? না।</MText>
        <MText>আপনার পরিশ্রমের অভাব? সেটাও নয়।</MText>

        <MDivider />

        <MSub>তাহলে?</MSub>
        <MText>
          কেন এমন হয়... একই Diagnosis... দুইটি শিশু... একজন দ্রুত এগিয়ে যায়... আরেকজন... বছরের
          পর বছর... একই জায়গাতেই থেকে যায়?
        </MText>
        <MText>কেন... কিছু Skill... Therapy Room-এর বাইরে... হঠাৎ যেন হারিয়ে যায়?</MText>
        <MText>কেন... একদিন Improvement হয়... তারপর... আবার যেন সব থেমে যায়?</MText>
        <MText>
          কেন... কেউ আপনাকে বলেন... Speech-এর উপর কাজ করুন। আরেকজন বলেন... Behaviour। আরেকজন
          বলেন... Sensory। আরেকজন বলেন... Attention। কিন্তু... কেউ যেন... পুরো ছবিটা দেখান না।
        </MText>

        <MDivider />

        <MSub>যদি... আমরা একটা Observation শেয়ার করি?</MSub>
        <MText>
          বিগত বহু বছর ধরে... হাজার হাজার পরিবারের সঙ্গে কাজ করতে গিয়ে... আমরা একটা Pattern
          বারবার দেখেছি। খুবই অদ্ভুত একটা Pattern।
        </MText>
        <MText>প্রথমে... আমরাও সেটা বিশ্বাস করতে পারিনি। কিন্তু... যত পরিবার দেখেছি... Patternটা তত পরিষ্কার হয়েছে।</MText>

        <MSub>Patternটা কী?</MSub>
        <MText>যেসব পরিবার... শুধু আরও বেশি করার চেষ্টা করছিলেন... তাঁদের সবার Progress... এক রকম ছিল না।</MText>
        <MText>কিন্তু... যেসব পরিবার...</MText>
        <MList items={["কেন করছেন...", "কখন করছেন...", "কী আগে করবেন..."]} />
        <MText>এই তিনটি বিষয় বুঝতে শুরু করেছিলেন... তাঁদের Journey... একেবারে অন্যরকম হয়ে গিয়েছিল।</MText>

        <MDivider />

        <MSub>অর্থাৎ...</MSub>
        <MText>Differenceটা... শুধু Effort-এ ছিল না।</MText>
        <MText>Differenceটা... শুধু Therapy-তেও ছিল না।</MText>
        <MEmphasis>Differenceটা... বোঝার মধ্যে ছিল।</MEmphasis>

        <MDivider />

        <MSub>একটা ছোট উদাহরণ ভাবুন...</MSub>
        <MText>
          ধরুন... আপনি একটা বাড়ি তৈরি করছেন। আপনার কাছে... সব রকম Materials আছে। ভালো Engineer
          আছে। ভালো Workers আছে। অর্থেরও সমস্যা নেই।
        </MText>
        <MText>কিন্তু... যদি Foundation-এর আগেই... ছাদ বানাতে শুরু করেন... তাহলে?</MText>
        <MText>আপনি কি আরও Cement কিনবেন? আরও Worker আনবেন? নাকি... প্রথমে Foundation-টাই ঠিক করবেন?</MText>

        <MDivider />

        <MSub>Development-ও...</MSub>
        <MText>হয়তো... এমনই কিছু।</MText>
        <MText>
          যদি... কোনো Stage Skip হয়ে যায়... অথবা... যদি Sequence গুলিয়ে যায়... তাহলে... শুধু
          আরও বেশি Effort... সবসময়... আরও বেশি Progress তৈরি করে না।
        </MText>

        <MDivider />

        <MSub>এখানেই...</MSub>
        <MText>বেশিরভাগ পরিবার... একটা খুব গুরুত্বপূর্ণ জিনিস Miss করে ফেলেন।</MText>
        <MText>তাঁরা ভাবেন...</MText>
        <MQuote>আরও করলেই হয়তো হবে।</MQuote>
        <MText>কিন্তু... কখনও কখনও... সঠিক প্রশ্নটা... আরও কত করব... সেটা নয়।</MText>
        <MText>বরং...</MText>
        <MEmphasis>"আমি কি সবচেয়ে গুরুত্বপূর্ণ জায়গাতেই কাজ করছি?"</MEmphasis>

        <MDivider />

        <MSub>আর এখানেই...</MSub>
        <MText>Science of Stuck... একটি সম্পূর্ণ ভিন্ন প্রশ্ন করে।</MText>
        <MText>আমরা জিজ্ঞেস করি না...</MText>
        <MQuote>আপনার সন্তানের Diagnosis কী?</MQuote>
        <MText>আমরা প্রথমে জানতে চাই...</MText>
        <MQuote>আপনার সন্তানের Progress কোথায় আটকে আছে?</MQuote>
        <MText>কারণ... অনেক সময়... Diagnosis... গল্পের শুরু। কিন্তু... Stuckness... গল্পের আসল সূত্র।</MText>
        <MText>
          This reflects the philosophy behind IND's positioning that progress depends on
          identifying and resolving the dominant developmental bottleneck rather than focusing
          only on labels or isolated symptoms.
        </MText>

        <MDivider />

        <MSub>আর যদি...</MSub>
        <MText>
          আমরা বলি... প্রায় প্রত্যেক শিশুর Development-এ... একটি না একটি... Invisible
          Bottleneck থাকে।
        </MText>
        <MText>যেটা... চোখে দেখা যায় না। Report-এ সবসময় লেখা থাকে না।</MText>
        <MText>কিন্তু... সেটাই... বাকিগুলোকে ধীর করে দেয়।</MText>
        <MText>তাহলে? আপনি কি জানতে চাইবেন...</MText>
        <MEmphasis>কীভাবে সেটাকে চেনা যায়?</MEmphasis>

        <MDivider />

        <MSub>কারণ...</MSub>
        <MText>
          যখন... সঠিক Bottleneck-টা ধরা পড়ে... তখন... অনেক সময়... অন্য অনেক পরিবর্তন... তারপর
          থেকে... অনেক সহজ হয়ে যেতে শুরু করে।
        </MText>

        <MDivider />

        <MSub>কিন্তু...</MSub>
        <MText>আরও একটা প্রশ্ন আছে... যেটা... সবকিছু বদলে দিতে পারে।</MText>
        <MText>যদি... আপনার সন্তানের সবচেয়ে বড় Developmental Resource... Therapy Centre না হয়ে... আপনার নিজের বাড়ি হয়?</MText>
        <MText>যদি... সবচেয়ে বেশি পরিবর্তন... সপ্তাহে এক বা দুই ঘণ্টার Session-এ না হয়ে... প্রতিদিনের... ছোট ছোট মুহূর্তগুলোর মধ্যে তৈরি হয়?</MText>
        <MText>যদি... আপনার সন্তান... সবচেয়ে বেশি শেখে... আপনার সঙ্গে... বাস্তব জীবনের Interaction-এর মধ্যে?</MText>
        <MText>তাহলে... আপনার ভূমিকা... আসলে কতটা গুরুত্বপূর্ণ?</MText>

        <MDivider />

        <MText>আর যদি... আপনি ভাবছেন...</MText>
        <MQuote>এটা যদি সত্যি হয়... তাহলে এতদিন কেউ আমাদের এভাবে বুঝিয়ে বলেনি কেন?</MQuote>
        <MText>ঠিক এই প্রশ্ন থেকেই... Science of Stuck-এর পরের অংশ শুরু হয়।</MText>

        <MDivider />

        <MText className="mt-8">
          কারণ... আমরা এখন এমন একটি বিষয় নিয়ে কথা বলব... যেটা শুনে... অনেক বাবা-মা প্রথমে অবাক
          হন। তারপর... চুপ করে যান। তারপর... বলেন...
        </MText>
        <MQuote>এবার বুঝতে পারছি...</MQuote>
        <MEmphasis>
          সারা জীবন ধরে... আমরা আসলে কয়েকটি ভুল ধারণাকেই সত্যি বলে মেনে নিয়েছিলাম।
        </MEmphasis>
        <MText>সেই ভুল ধারণাগুলো কী? পরের অংশে... আমরা একে একে সেগুলো খুলে দেখব।</MText>

        <MHeading className="text-2xl md:text-3xl">
          হ্যাঁ... আমি জানতে চাই আমার সন্তানের আসল Bottleneck কোথায় হতে পারে।
        </MHeading>
        <CTAButtons />
      </MSection>

      {/* SECTION 6: INTRODUCING SCIENCE OF STUCK */}
      <MSection id="introducing-sos" tone="accent">
        <MHeading>যদি... প্রথমবারের মতো... সবকিছু একসঙ্গে বুঝতে শুরু করেন?</MHeading>

        <MSub>কল্পনা করুন...</MSub>
        <MText>
          হঠাৎ... আপনার গত কয়েক বছরের Journey... একটা একটা করে... Meaningful হতে শুরু করেছে।
        </MText>
        <MText>
          যে প্রশ্নগুলোর উত্তর... এতদিন আলাদা আলাদা জায়গায় খুঁজছিলেন... সেগুলো... হঠাৎ... একটা
          ছবির মতো... একসঙ্গে পরিষ্কার হয়ে যাচ্ছে।
        </MText>

        <MSub>আপনি হয়তো ভাবছেন...</MSub>
        <MQuote>"আচ্ছা..." "তাহলে সেই কারণেই..." "এতদিন আমরা একই জায়গায় ঘুরছিলাম..."</MQuote>

        <MDivider />

        <MSub>কারণ...</MSub>
        <MText>অনেক সময়... সমস্যা... Information-এর অভাব নয়।</MText>
        <MEmphasis>সমস্যা... Information-এর Fragmentation।</MEmphasis>
        <MText>অনেক Answer আছে। কিন্তু... একটা Connected Picture নেই।</MText>

        <MSub>Science of Stuck™...</MSub>
        <MEmphasis>সেই Connected Picture-টাই তৈরি করার জন্য।</MEmphasis>

        <MDivider />

        <MHeading className="text-2xl md:text-3xl">এটা Webinar নয়।</MHeading>
        <MSub>এটা... একটি Breakthrough Experience।</MSub>
        <MText>
          এমন একটি Experience... যেখানে... আপনি শুধু নতুন কিছু শিখবেন না। আপনি... অনেক পুরোনো
          বিষয়কে... একটি সম্পূর্ণ নতুন দৃষ্টিতে দেখতে শুরু করবেন।
        </MText>

        <MDivider />

        <MSub>এমন অনেক বাবা-মা আছেন...</MSub>
        <MText>যাঁরা Webinar শেষ হওয়ার পরে বলেছেন...</MText>
        <MQuote>"আজ প্রথমবার বুঝলাম..." "এতদিন আমরা কী Miss করছিলাম..."</MQuote>
        <MText>আবার কেউ বলেছেন...</MText>
        <MQuote>"এখন বুঝতে পারছি..." "কেন এত Advice পেয়েও আমরা Confused ছিলাম..."</MQuote>
        <MText>আরও অনেকে বলেছেন...</MText>
        <MQuote>আমরা আজ প্রথমবার একটা Roadmap দেখতে পেলাম...</MQuote>

        <MDivider />

        <MSub>এই Experience-এ...</MSub>
        <MText>আমরা... আপনাকে...</MText>
        <MList
          items={[
            "আরও Techniques শেখাতে চাই না।",
            "আরও Therapy List দিতে চাই না।",
            "আরও Homework দিতে চাই না।",
          ]}
        />

        <MSub>আমরা চাই...</MSub>
        <MText>আপনি... নিজেই... নতুনভাবে দেখতে শিখুন।</MText>
        <MText>
          কারণ... যখন দেখাটা বদলায়... Decision বদলায়। Decision বদলালে... Daily Actions বদলায়।
          আর... Daily Actions বদলালে... অনেক সময়... Development-এর দিকটাই বদলে যায়।
        </MText>

        <MDivider />

        <MSub>Science of Stuck™-এ...</MSub>
        <MText>আমরা... আপনার সন্তানের Diagnosis দিয়ে শুরু করি না।</MText>
        <MText>আমরা... আপনার Confusion দিয়ে শুরু করি।</MText>
        <MText>কারণ... যেখানে Confusion শেষ হয়... সেখান থেকেই... Clarity শুরু হয়।</MText>

        <MDivider />

        <MSub>এই ৩ ঘণ্টায়...</MSub>
        <MText>আপনি হয়তো... প্রথমবার বুঝবেন...</MText>
        <MSub className="mt-6">কেন...</MSub>
        <MText>কিছু পরিবর্তন... অনেক চেষ্টা করেও হয় না।</MText>
        <MSub className="mt-6">কেন...</MSub>
        <MText>কিছু ছোট পরিবর্তন... অনেক বড় পরিবর্তনের শুরু হতে পারে।</MText>
        <MSub className="mt-6">কেন...</MSub>
        <MText>কিছু Skills... আলাদা আলাদা শেখানো যায়... কিন্তু... Development... আলাদা আলাদা করে তৈরি হয় না।</MText>
        <MSub className="mt-6">আর... কেন...</MSub>
        <MText>অনেক পরিবার... একই Diagnosis থাকা সত্ত্বেও... সম্পূর্ণ ভিন্ন Journey অতিক্রম করেন।</MText>

        <MDivider />

        <MSub>সবচেয়ে গুরুত্বপূর্ণ বিষয়...</MSub>
        <MText>এই Session... আপনাকে... Ready-made Answer দেবে না।</MText>
        <MText>বরং... আপনাকে এমন Questions করতে শেখাবে... যেগুলো... সঠিক Answer-এর দিকে নিয়ে যায়।</MText>
        <MText>কারণ... অনেক সময়... একটি ভালো Question... দশটি Advice-এর থেকেও বেশি মূল্যবান।</MText>

        <MDivider />

        <MSub>Science of Stuck™...</MSub>
        <MText>আপনার সন্তানের সমস্যা নিয়ে নয়।</MText>
        <MEmphasis>আপনার সন্তানের সম্ভাবনা নিয়ে।</MEmphasis>
        <MText>আপনার অসহায়ত্ব নিয়ে নয়।</MText>
        <MEmphasis>আপনার নেতৃত্ব নিয়ে।</MEmphasis>
        <MText>আপনার নির্ভরতা নিয়ে নয়।</MText>
        <MEmphasis>আপনার সক্ষমতা নিয়ে।</MEmphasis>
        <MText>
          This reflects IND's philosophy of moving parents from dependence on fragmented
          interventions to becoming confident leaders of their child's developmental journey.
        </MText>

        <MDivider />

        <MSub>তাহলে... এই Experience-এ... আপনি কী কী Discover করতে পারেন?</MSub>
        <MText>আমরা যদি সব বলে দিই... তাহলে... Discovery-এর আনন্দটাই নষ্ট হয়ে যাবে।</MText>
        <MText>
          তবে... পরের অংশে... আমরা এমন কিছু বিষয় দেখাব... যেগুলো... হয়তো... আপনার আগামী কয়েক
          বছরের সিদ্ধান্তকে বদলে দিতে পারে।
        </MText>

        <MSub>আপনি হয়তো প্রথমবার বুঝতে শুরু করবেন...</MSub>
        <MList
          items={[
            "কেন Progress কখনও শুধু Effort-এর ফল নয়।",
            "কেন সব Intervention সমান গুরুত্বপূর্ণ নয়, আর কেন Prioritisation এত গুরুত্বপূর্ণ।",
            "কেন কিছু পরিবর্তন দেখা যায়, কিন্তু স্থায়ী হয় না।",
            "কেন Home Environment অনেক সময় Intervention-এর সবচেয়ে শক্তিশালী অংশ হয়ে ওঠে।",
            "কেন একজন Parent-এর ভূমিকা শুধু Supporter নয়, Development Partner।",
          ]}
        />
        <MText>কিন্তু... এগুলো কেবল শিরোনাম।</MText>
        <MText>
          প্রতিটি উপলব্ধির পেছনে রয়েছে এমন একটি Logic, যা আমরা Science of Stuck™-এ ধাপে ধাপে
          খুলে দেখাব।
        </MText>

        <MDivider />

        <MText className="mt-8">এখন আপনার মনে হয়তো একটা প্রশ্ন এসেছে...</MText>
        <MEmphasis>"ঠিক কী কী শিখব?"</MEmphasis>
        <MText>আমরা ইচ্ছে করেই... সবটা এখন বলব না।</MText>
        <MText>কারণ... আমরা চাই... আপনি শুধু Information-এর জন্য নয়... Transformation-এর জন্য আসুন।</MText>
        <MText>
          তবুও... পরের অংশে... আমরা এমন কিছু Powerful Discoveries-এর ঝলক দেখাব... যেগুলো শুনে...
          হয়তো আপনিও বলবেন...
        </MText>
        <MQuote>এগুলো যদি আগে জানতাম...</MQuote>

        <MHeading className="text-2xl md:text-3xl">হ্যাঁ, আমি নতুনভাবে দেখতে শিখতে চাই।</MHeading>
        <CTAButtons />
      </MSection>
    </>
  );
}
