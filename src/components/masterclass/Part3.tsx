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
import drDas from "@/assets/dr-das.png.asset.json";

export function Part3() {
  return (
    <>
      {/* Section 13: Meet Your Guide */}
      <MSection tone="default">
        <Eyebrow>SECTION 13</Eyebrow>
        <MHeading>যদি ভাবেন... "এই কথাগুলো কে বলছেন?"</MHeading>
        <MSub>আপনার সেই প্রশ্নের উত্তর দেওয়ার সময় এসেছে।</MSub>

        <MSub>পরিচিত হোন... ডাঃ দীপ্তাংশু দাস-এর সঙ্গে</MSub>
        <img
          src={drDas.url}
          alt="Dr. Diptanshu Das"
          className="mx-auto mt-8 w-56 rounded-2xl border border-border bg-card"
          loading="lazy"
        />
        <MText className="mt-6">
          Founder — Institute of NeuroDevelopment (IND)
          <br />
          Creator of the Parent-Led NeuroDevelopment System
        </MText>

        <MSub>কিন্তু...</MSub>
        <MText>
          এই গল্পটা... কোনো Doctor-এর গল্প নয়। এটা... একজন মানুষের গল্প... যিনি... বহু বছর ধরে... একটি
          প্রশ্নের উত্তর খুঁজেছেন।
        </MText>

        <MSub>সেই প্রশ্নটা ছিল...</MSub>
        <MEmphasis>
          "কেন এত ভালো বাবা-মা... এত চেষ্টা করার পরও... তাঁদের সন্তানের কাঙ্ক্ষিত Progress দেখতে পান না?"
        </MEmphasis>

        <MSub>Career-এর শুরুতে...</MSub>
        <MText>
          আমিও... অন্য অনেক Professional-এর মতোই ভাবতাম... আরও Assessment... আরও Therapy... আরও
          Sessions... হয়তো... সমাধানের পথ। কারণ... আমাদেরও... সেভাবেই শেখানো হয়েছিল।
        </MText>

        <MSub>কিন্তু...</MSub>
        <MText>
          বছরের পর বছর... পরিবারগুলোর সঙ্গে কাজ করতে করতে... একটা বিষয় আমাকে গভীরভাবে নাড়িয়ে দিয়েছিল। আমি
          দেখছিলাম... খুব দায়িত্বশীল বাবা-মা। অসাধারণ নিবেদিত Therapist। ভালো Doctor। ভালো School। সবাই...
          নিজের জায়গা থেকে... সত্যিই চেষ্টা করছেন। তবুও... অনেক পরিবার... একই জায়গায় ঘুরপাক খাচ্ছেন।
        </MText>

        <MSub>আমার মনে প্রশ্ন জাগল...</MSub>
        <MEmphasis>"যদি সমস্যাটা মানুষগুলোর মধ্যে না হয়ে... System-এর মধ্যে হয়?"</MEmphasis>

        <MSub>সেই প্রশ্নটাই...</MSub>
        <MText>
          আমার শেখার পথ বদলে দিল। আমি... শুধু Disorders নিয়ে নয়... Development নিয়ে... আরও গভীরভাবে ভাবতে
          শুরু করলাম। শুধু Intervention নয়... Interaction নিয়ে। শুধু Session নয়... Daily Life নিয়ে। শুধু
          Child নয়... Parent, Home এবং Environment-এর ভূমিকা নিয়েও।
        </MText>

        <MSub>তারপর...</MSub>
        <MText>
          একটা উপলব্ধি ধীরে ধীরে পরিষ্কার হতে লাগল। অনেক পরিবার... Advice পাচ্ছেন। কিন্তু... Roadmap
          পাচ্ছেন না। Therapy পাচ্ছেন। কিন্তু... Integration পাচ্ছেন না। Progress-এর টুকরো টুকরো অভিজ্ঞতা
          পাচ্ছেন। কিন্তু... পুরো Journey-টা বুঝতে পারছেন না।
        </MText>

        <MSub>তখনই...</MSub>
        <MEmphasis>"যদি আমরা Therapy নিয়ে না ভেবে... Development-এর Architecture নিয়ে ভাবি?"</MEmphasis>

        <MSub>সেখান থেকেই...</MSub>
        <MText>
          ধীরে ধীরে... জন্ম নেয়... Institute of NeuroDevelopment এবং... পরবর্তীতে... Parent-Led
          NeuroDevelopment System। একটি System... যার উদ্দেশ্য... Therapy-কে Replace করা নয়। বরং...
          সবকিছুকে... একটি Connected Developmental Journey-তে... আনা।
        </MText>

        <MSub>আজ...</MSub>
        <MStats
          items={[
            { value: "১০,০০০+", label: "এই Journey-তে আমাদের উপর আস্থা রাখা পরিবার" },
          ]}
        />
        <MText>
          ভারত... বাংলাদেশ... এবং বিশ্বের বিভিন্ন দেশের... বাবা-মায়েরা... তাঁদের সন্তানের Development
          Journey-র... একটি অংশ হিসেবে... আমাদের পাশে পেয়েছেন। কিন্তু... সত্যি বলতে... এই সংখ্যাগুলো... আমার
          কাছে... সবচেয়ে গুরুত্বপূর্ণ নয়। সবচেয়ে গুরুত্বপূর্ণ... প্রতিটি পরিবারের... একটি করে গল্প। প্রতিটি
          শিশুর... একটি করে Journey। প্রতিটি বাবা-মায়ের... একটি করে নতুন উপলব্ধি।
        </MText>

        <MSub>আমাকে অনেকেই জিজ্ঞেস করেন... "আপনার Goal কী?"</MSub>
        <MText>
          আমার উত্তর... খুব সহজ। আমি চাই... যে বাবা-মা... আজ Confused... তিনি... একদিন... এমন জায়গায়
          পৌঁছান... যেখানে... তিনি নিজেই... আত্মবিশ্বাসের সঙ্গে বলতে পারেন...
        </MText>
        <MQuote>
          "আমি বুঝতে পারছি..." "আমরা কেন এটা করছি..." "এবং এরপর কী করব..."
        </MQuote>
        <MText>
          কারণ... আমার বিশ্বাস... সত্যিকারের Breakthrough... শুধু শিশুর মধ্যে ঘটে না। সেটা... বাবা-মায়ের
          মধ্যেও ঘটে। আর... যখন... বাবা-মায়ের বোঝা বদলায়... তখন... অনেক সময়... শিশুর Journey-ও বদলে যেতে
          শুরু করে।
        </MText>

        <MSub>তাই...</MSub>
        <MText>
          Science of Stuck™... আমার কাছে... একটি Webinar নয়। এটি... একটি Invitation। একসঙ্গে... নতুনভাবে
          ভাবার। নতুনভাবে প্রশ্ন করার। এবং... হয়তো... নতুনভাবে শুরু করার।
        </MText>

        <MSub>যদি...</MSub>
        <MText>
          আপনি এই পর্যন্ত পড়ে থাকেন... তাহলে... আমি আপনাকে... একটি কথা বলতে চাই। আপনি একা নন। আপনার
          সন্তানের Journey... আপনার একার দায়িত্বও নয়। আমরা... আপনার জন্য... কোনো Shortcut নিয়ে আসিনি।
          কিন্তু... একটি Structured Way of Thinking নিয়ে এসেছি। আর... কখনও কখনও... সেটাই... সবচেয়ে বড়
          Turning Point হয়ে ওঠে।
        </MText>

        <MSub>একটি ব্যক্তিগত আমন্ত্রণ...</MSub>
        <MText>
          এই শুক্রবার... আমি চাই... আপনি Science of Stuck™-এ আসুন। শুধু একজন Participant হিসেবে নয়। একজন
          Curious Parent হিসেবে। যিনি... নিজের সন্তানের ভবিষ্যৎ নিয়ে... আরও গভীরভাবে বুঝতে চান। যদি... এই
          তিন ঘণ্টা শেষে... আপনার মনে হয়... আপনি কোনো মূল্যবান Clarity পাননি... আমরা আপনার Registration
          Fee... ১০০% ফেরত দেব। কারণ... বিশ্বাস... অর্জন করা যায়। দাবি করে নেওয়া যায় না।
        </MText>

        <MEmphasis>হ্যাঁ... আমি Science of Stuck-এ অংশ নিতে চাই।</MEmphasis>
        <CTAButtons />
      </MSection>

      {/* Section 14: Why Parents Trust Dr Diptanshu Das */}
      <MSection tone="muted">
        <Eyebrow>SECTION 14</Eyebrow>
        <MHeading>বিশ্বাস... একদিনে তৈরি হয় না।</MHeading>
        <MSub>এটি তৈরি হয়... প্রতিটি পরিবারের অভিজ্ঞতা দিয়ে।</MSub>

        <MText>
          আপনি যখন... আপনার সন্তানের ভবিষ্যতের মতো... এত গুরুত্বপূর্ণ একটি সিদ্ধান্ত নেবেন... তখন... আপনার
          শুধু Inspiration দরকার নেই। আপনার দরকার... Confidence. আপনার দরকার... Evidence. আপনার দরকার...
          এই অনুভূতি...
        </MText>
        <MQuote>"হ্যাঁ... এরা সত্যিই বহু পরিবারকে কাছ থেকে দেখেছেন।"</MQuote>

        <MSub>গত কয়েক বছরে...</MSub>
        <MText>
          Institute of NeuroDevelopment-এর সঙ্গে... ১০,০০০-এরও বেশি পরিবার কোনো না কোনোভাবে যুক্ত হয়েছেন।
          কেউ... একটি Webinar-এ। কেউ... Assessment-এর মাধ্যমে। কেউ... Consultation-এ। কেউ... Training
          Programme-এ। কেউ... দীর্ঘমেয়াদী Implementation Journey-তে। প্রতিটি পরিবার... আমাদের কিছু না কিছু
          শিখিয়েছে। আর... সেই শিক্ষাগুলোই... আজকের System-টাকে আরও পরিণত করেছে।
        </MText>

        <MSub>আমাদের সবচেয়ে বড় শিক্ষক...</MSub>
        <MText>
          কোনো বই নয়। কোনো Conference নয়। কোনো Certificate নয়। বাস্তব পরিবার। কারণ... বই... Theory শেখায়।
          বাস্তব জীবন... Pattern শেখায়। আর... হাজার হাজার Pattern-এর মধ্যে... কিছু সত্য... ধীরে ধীরে... খুব
          পরিষ্কার হয়ে ওঠে।
        </MText>

        <MSub>তাই...</MSub>
        <MText>
          Science of Stuck™... কোনো একদিনে তৈরি হয়নি। এটি... অসংখ্য প্রশ্ন... অসংখ্য পর্যবেক্ষণ... অসংখ্য
          ভুল থেকে শেখা... অসংখ্য পরিবর্তন... এবং... অসংখ্য পরিবারের Journey-এর উপর দাঁড়িয়ে তৈরি হয়েছে।
        </MText>

        <MStats
          items={[
            { value: "১৭০+", label: "Parent Education Webinar" },
            { value: "২০+", label: "Intensive Bootcamp" },
            { value: "১০,০০০+", label: "যুক্ত হওয়া পরিবার" },
          ]}
        />
        <MText>আমরা... বহু Implementation Cohort-এর সঙ্গে কাজ করেছি। কারণ... একটি Idea... বাস্তব জীবনে কাজ করছে কি না... সেটা বোঝার একমাত্র উপায়... বাস্তব পরিবারগুলোর সঙ্গে পথ চলা।</MText>

        <MSub>আজ...</MSub>
        <MText>
          আমাদের সঙ্গে যুক্ত হয়েছেন... শুধু Kolkata-এর পরিবার নন। শুধু West Bengal-ও নয়। ভারতের বিভিন্ন
          প্রান্ত... বাংলাদেশ... এবং... বিশ্বের বিভিন্ন দেশে বসবাসকারী... বাংলাভাষী পরিবারও... এই Journey-র
          অংশ হয়েছেন। কারণ... একটি শিশুর Development... ভাষা বদলালে বদলায় না। দেশ বদলালে বদলায় না।
          Parent-এর প্রশ্নগুলোও... অদ্ভুতভাবে... একই থেকে যায়।
        </MText>

        <MSub>কিন্তু...</MSub>
        <MText>
          আমরা চাই না... আপনি... শুধু Numbers দেখে... বিশ্বাস করুন। কারণ... Numbers... Attention তৈরি করে।
          কিন্তু... Experience... Trust তৈরি করে।
        </MText>

        <MSub>তাই...</MSub>
        <MText>
          আমাদের সবচেয়ে বড় শক্তি... Statistics নয়। আমাদের সবচেয়ে বড় শক্তি... Families who stayed। যেসব
          বাবা-মা... শুধু একটি Session করেননি। শুধু একটি Webinar-এ আসেননি। বরং... নিজেদের Journey-র... একটি
          অংশ হিসেবে... এই চিন্তাধারাকে গ্রহণ করেছেন।
        </MText>

        <MSub>হয়তো... আপনি ভাবছেন... "কিন্তু আমার সন্তানের সমস্যা তো আলাদা..."</MSub>
        <MText>
          আমরা একমত। প্রত্যেক শিশুই আলাদা। তাই... আমরা... কখনও... Cookie Cutter Solution-এ বিশ্বাস করি না।
          আমাদের লক্ষ্য... প্রত্যেক শিশুর... নিজস্ব Journey-কে বোঝা। নিজস্ব Bottleneck-কে বোঝা। নিজস্ব
          Direction-কে বোঝা। কারণ... একটি System... সবার জন্য একই হতে পারে। কিন্তু... একটি Journey... কখনও
          একই হয় না।
        </MText>

        <MSub>আমাদের কাছে...</MSub>
        <MText>
          Authority-এর মানে... সব উত্তর জানা নয়। Authority-এর মানে... ঠিক প্রশ্নগুলো করতে জানা। কারণ...
          যখন... সঠিক প্রশ্ন করা হয়... তখন... সঠিক Direction খুঁজে পাওয়ার সম্ভাবনাও... অনেক বেড়ে যায়।
        </MText>

        <MText>
          আমরা... কখনও বলি না... "আমরা Miracle করি।" আমরা বলি... "আমরা একটি Structured Way of Thinking
          শিখাই।" আমরা বলি না... "আমরা আপনার সন্তানের ভবিষ্যৎ Guarantee করছি।" আমরা বলি... "আমরা আপনাকে
          এমনভাবে বুঝতে সাহায্য করব... যাতে আপনার আগামী সিদ্ধান্তগুলো আরও সচেতন হয়।"
        </MText>

        <MSub>আর হয়তো...</MSub>
        <MText>এই কারণেই... অনেক বাবা-মা... Science of Stuck™ শেষ হওয়ার পরে... একটি কথাই বলেন।</MText>
        <MQuote>"আজ আমরা প্রথমবার বুঝতে পারলাম... এতদিন আমরা কী দেখতে পাইনি।"</MQuote>

        <MSub>কিন্তু...</MSub>
        <MText>
          সবচেয়ে গুরুত্বপূর্ণ প্রমাণ... এখনও বাকি। Numbers নয়। Claims নয়। আমাদের কথা নয়। তাঁদের কথা... যাঁরা...
          এই Journey-টা... নিজেরা হেঁটেছেন।
        </MText>

        <MEmphasis>হ্যাঁ... আমি বাস্তব পরিবারগুলোর অভিজ্ঞতা শুনতে চাই।</MEmphasis>
        <CTAButtons />
      </MSection>

      {/* Section 15: Meet the Institute of NeuroDevelopment */}
      <MSection tone="default">
        <Eyebrow>SECTION 15</Eyebrow>
        <MHeading>Institute of NeuroDevelopment (IND)</MHeading>
        <MSub>
          আমরা নিজেদের একটি Therapy Centre বলি না। কারণ... আমরা বিশ্বাস করি... একটি শিশুর Development...
          Session দিয়ে নয়... একটি সম্পূর্ণ System দিয়ে এগোয়।
        </MSub>

        <MText>
          হয়তো... আপনি এতক্ষণে বুঝতে শুরু করেছেন... Science of Stuck™... শুধু একটি Webinar নয়। এটি... একটি
          বড় Journey-র... প্রথম ধাপ।
        </MText>

        <MSub>সেই Journey-র নাম... Institute of NeuroDevelopment</MSub>
        <MText>
          একটি Parent-Led NeuroDevelopment Ecosystem যেখানে... উদ্দেশ্য... শুধু শিশুকে কিছু Skill শেখানো
          নয়। বরং... একটি পরিবারকে... Development-এর নতুন ভাষা শেখানো।
        </MText>

        <MText>
          আমাদের কাছে... একটি শিশুর Journey... শুরু হয় না... Therapy দিয়ে। শুরু হয়... Understanding দিয়ে।
          কারণ... যখন... বোঝা পরিষ্কার হয়... তখন... Decision পরিষ্কার হয়। তাই... আমরা... একটি Connected
          Journey তৈরি করেছি। যেখানে... প্রতিটি ধাপ... পরবর্তী ধাপের জন্য... প্রস্তুত করে।
        </MText>

        <MCards
          columns={2}
          items={[
            {
              title: "প্রথম ধাপ — Science of Stuck™",
              body: "Confusion → Clarity। বাবা-মা প্রথমবার Development-কে একটি নতুন Lens দিয়ে দেখতে শুরু করেন। কেন Progress থেমে যেতে পারে, এবং কেন Direction সবচেয়ে গুরুত্বপূর্ণ তা বোঝেন।",
            },
            {
              title: "দ্বিতীয় ধাপ — Blocks to Breakthroughs™",
              body: "Clarity → Capability। \"এখন... বাস্তবে কীভাবে শুরু করব?\" — বাবা-মা Development-এর মূল নীতিগুলোকে নিজেদের জীবনে প্রয়োগ করতে শেখেন। শুধু Idea নয়, Execution।",
            },
            {
              title: "তৃতীয় ধাপ — Breakthrough Blueprint™",
              body: "Capability → Personalised Direction। প্রত্যেক শিশুকে একটি Diagnosis নয়, একটি Individual Journey হিসেবে দেখা হয়। Journey আরও Personal হয়।",
            },
            {
              title: "চতুর্থ ধাপ — Breakthrough Flightpath™",
              body: "Direction → Sustained Transformation। Focus থাকে Momentum, Consistency, Measurement, Adjustment, Independence-এ — Lifetime Dependency নয়।",
            },
          ]}
        />

        <MSub>তাই...</MSub>
        <MText>IND... একটি Clinic নয়। একটি Programme-ও নয়। একটি Webinar Company-ও নয়।</MText>
        <MSub>IND হলো...</MSub>
        <MText>একটি চিন্তাধারা। একটি Philosophy। একটি System। একটি Community। একটি Journey। একটি Movement। যেখানে... Professionals... Parents... Families... একই উদ্দেশ্যে... একসঙ্গে কাজ করেন।</MText>

        <MSub>আমরা বিশ্বাস করি...</MSub>
        <MText>
          একজন শিশুর সবচেয়ে বড় Resource... শুধু Therapist নন। শুধু Doctor নন। শুধু School-ও নয়। তার
          পরিবার। কারণ... Development... Relationship-এর মধ্যে ঘটে। Trust-এর মধ্যে ঘটে। Daily Life-এর
          মধ্যে ঘটে। অভ্যাসের মধ্যে ঘটে। Meaningful Interaction-এর মধ্যে ঘটে।
        </MText>

        <MSub>তাই...</MSub>
        <MText>আমাদের কাছে... সফলতা মানে... শুধু... একটি Assessment Score নয়। সফলতা মানে... যখন...</MText>
        <MQuote>"আমি এখন বুঝতে পারছি..."</MQuote>
        <MQuote>"এখন আর প্রতিটি সিদ্ধান্তে ভয় লাগে না..."</MQuote>
        <MQuote>"এখন আমাদের একটা পথ আছে।"</MQuote>

        <MSub>আর একটা বিষয়...</MSub>
        <MText>
          আমরা... কখনও চাই না... কোনো পরিবার... আমাদের উপর... চিরদিন নির্ভরশীল থাকুক। বরং... আমরা চাই...
          একদিন... আপনারা... এমন জায়গায় পৌঁছান... যেখানে... আপনারাই... নতুন Challenge-গুলোর সামনে...
          শান্তভাবে দাঁড়াতে পারবেন। কারণ... আমাদের কাছে... সত্যিকারের Success... তখনই... যখন... আপনারা...
          আমাদের কম প্রয়োজন করবেন।
        </MText>

        <MSub>যদি... আপনি এই Journey-র অংশ হতে চান...</MSub>
        <MText>
          তাহলে... আপনার প্রথম পদক্ষেপ... খুবই সহজ। কোনো বড় Commitment নয়। কোনো দীর্ঘ Programme নয়।
          শুধু... তিন ঘণ্টা। তিন ঘণ্টা... নিজের সন্তানের ভবিষ্যৎকে... নতুনভাবে দেখার জন্য।
        </MText>

        <MText>
          কারণ... আমরা বিশ্বাস করি... একটি পরিবার... প্রথমে... বুঝুক। তারপর... বিশ্বাস করুক। তারপর...
          সিদ্ধান্ত নিক। সেই কারণেই... আমাদের Journey... Science of Stuck™ দিয়েই শুরু হয়।
        </MText>

        <MEmphasis>হ্যাঁ... আমি Science of Stuck দিয়ে আমার Journey শুরু করতে চাই।</MEmphasis>
        <CTAButtons />
      </MSection>

      {/* Section 16: Client Transformation Videos */}
      <MSection tone="muted">
        <Eyebrow>SECTION 16</Eyebrow>
        <MHeading>একসময়... তাঁরাও ঠিক আপনার মতোই উত্তর খুঁজছিলেন।</MHeading>
        <MSub>আজ... তাঁরাই তাঁদের Journey নিজের মুখে শেয়ার করছেন।</MSub>

        <MText>
          একটা অনুরোধ... পরের কয়েক মিনিট... Numbers দেখবেন না। Claims শুনবেন না। Marketing-এর ভাষাও নয়।
          শুধু... কিছু বাবা-মায়ের কথা শুনুন। কারণ... হয়তো... কয়েক মাস আগে... তাঁরাও... ঠিক এই Page-টাই
          পড়ছিলেন।
        </MText>

        <MDivider />

        <MSub>"আমরা এত Therapy করিয়েও বুঝতে পারছিলাম না... আসলে কী Missing ছিল।"</MSub>
        <MText>
          <strong>Before:</strong> আমাদের সন্তান... নিজের জগতে থাকত। ডাকলে সাড়া দিত না। চোখে চোখ রাখত
          না। আমরা... Speech... OT... আরও Therapy... সবই করাচ্ছিলাম। কিন্তু... আমাদের সবচেয়ে বড় সমস্যা
          ছিল... আমরা বুঝতেই পারছিলাম না... কেন Progress এত ধীর।
        </MText>
        <MText>
          <strong>Then:</strong> Science of Stuck-এ... প্রথমবার... আমরা Development-কে... একটা Connected
          Journey হিসেবে দেখতে শিখলাম।
        </MText>
        <MText>
          <strong>Today:</strong> সবচেয়ে বড় পরিবর্তন... শুধু আমাদের সন্তানের মধ্যে হয়নি। আমাদের মধ্যেও
          হয়েছে। আজ... আমরা... আর Confused নই। আমরা বুঝে... Decision নিতে পারি।
        </MText>

        <MCards
          columns={2}
          items={[
            {
              title: "\"আমরা ভেবেছিলাম... Speech-টাই সবচেয়ে বড় সমস্যা।\"",
              body: "তারপর... আমরা বুঝলাম... সমস্যাটা... Speech-এর থেকেও গভীরে। আর... সেই বোঝাটা... আমাদের পুরো Journey বদলে দিল।",
            },
            {
              title: "\"আমাদের মনে হতো... সবাই Advice দিচ্ছে... কিন্তু Roadmap দিচ্ছে না।\"",
              body: "তারপর... প্রথমবার... আমরা বুঝলাম... কোনটা আগে। কেন আগে। এরপর কী।",
            },
            {
              title: "\"আমাদের সবচেয়ে বড় পরিবর্তন হয়েছিল... আমাদের চিন্তাভাবনায়।\"",
              body: "আমাদের সন্তান... ধীরে ধীরে... পরিবর্তন করেছে। কিন্তু... তারও আগে... আমরা বদলেছিলাম। আর... সেখান থেকেই... Journey বদলাতে শুরু করেছিল।",
            },
            {
              title: "\"আমরা আবার Hope করতে শিখেছিলাম...\"",
              body: "Hope... যেটা... Emotion-এর উপর দাঁড়িয়ে ছিল না। Understanding-এর উপর দাঁড়িয়ে ছিল।",
            },
          ]}
        />

        <MSub>Then... More Families</MSub>
        <MCards
          columns={2}
          items={[
            { title: "Speech Delay Families", body: "\"আমরা অপেক্ষা করছিলাম...\" — \"আজ বুঝতে পারছি...\"" },
            { title: "Autism Families", body: "\"আমরা Confused ছিলাম...\" — \"আজ Direction আছে...\"" },
            { title: "ADHD Families", body: "\"আমরা Behaviour নিয়েই ব্যস্ত ছিলাম...\" — \"আজ পুরো Development-কে দেখি...\"" },
            { title: "Parents Living Outside Kolkata", body: "\"আমরা ভাবিনি... Online হয়েও... এভাবে Connected অনুভব করব...\"" },
            { title: "Working Parents", body: "\"আমাদের সময় খুব কম ছিল...\" তবুও... \"আমরা Daily Life-এই Development-এর সুযোগ খুঁজতে শিখেছি...\"" },
          ]}
        />

        <MSub>WhatsApp Messages</MSub>
        <MQuote>"আজ ও প্রথমবার..."</MQuote>
        <MQuote>"আজ বুঝলাম..."</MQuote>
        <MQuote>"ধন্যবাদ... আমরা আর আগের মতো Confused নই..."</MQuote>
        <MQuote>"আজ ও নিজে থেকে..."</MQuote>

        <MSub>এক গুরুত্বপূর্ণ পর্যবেক্ষণ</MSub>
        <MText>
          হয়তো... আপনি খেয়াল করলেন... এই Stories-গুলোর মধ্যে... শিশুরা আলাদা। Diagnosis আলাদা। শহর আলাদা।
          শুরুটা আলাদা। কিন্তু... একটা বিষয়... প্রায় সবার গল্পেই আছে। প্রথম পরিবর্তনটা... অনেক সময়... শিশুর
          মধ্যে নয়। বাবা-মায়ের বোঝার মধ্যে। তারপর... ধীরে ধীরে... সেই বোঝাটা... প্রতিদিনের জীবন বদলাতে শুরু
          করে। আর... সেখান থেকেই... শিশুর Journey-ও... নতুন গতি পেতে শুরু করে।
        </MText>

        <MSub>But...</MSub>
        <MText>
          আমরা চাই না... আপনি... শুধু Success Story দেখুন। কারণ... প্রত্যেক Journey... একই রকম হয় না।
          প্রত্যেক শিশুর... নিজস্ব গতি আছে। নিজস্ব Challenge আছে। নিজস্ব Starting Point আছে। তাই... আমরা...
          Promise করি না... সবাই একই Outcome পাবেন। আমরা... Promise করি... আপনি... নিজের সন্তানের
          Journey-কে... আরও গভীরভাবে বুঝতে শিখবেন। আর... সেই বোঝার ভিত্তিতে... আরও সচেতন সিদ্ধান্ত নিতে
          পারবেন।
        </MText>

        <MEmphasis>হ্যাঁ... আমিও এমন বাস্তব পরিবর্তনের Journey শুরু করতে চাই।</MEmphasis>
        <CTAButtons />
      </MSection>

      {/* Section 17: Parent Stories */}
      <MSection tone="default">
        <Eyebrow>SECTION 17</Eyebrow>
        <MHeading>একটি শিশুর পরিবর্তনের আগে... অনেক সময় একজন বাবা-মায়ের ভেতরে একটি পরিবর্তন ঘটে।</MHeading>

        <MSub>বাইরে থেকে...</MSub>
        <MText>
          মানুষ যা দেখে... তা হলো... একটি শিশু... আগের থেকে... আরও ভালো Communicate করছে। আরও ভালো Engage
          করছে। আরও Calm হয়েছে। আরও শিখছে।
        </MText>

        <MSub>কিন্তু...</MSub>
        <MText>
          আমরা... আরও একটি পরিবর্তন দেখি। যেটা... Video-তে সবসময় ধরা পড়ে না। Assessment Report-এও লেখা
          থাকে না। কিন্তু... সেটাই... অনেক Journey-র Turning Point হয়ে ওঠে।
        </MText>

        <MSub>পরিবর্তন ১ — "আমরা আর প্রতিদিন Panic করতাম না।"</MSub>
        <MText>
          আগে... প্রতিটি নতুন Behaviour... একটি নতুন ভয় তৈরি করত। প্রতিটি Regression... মনে হতো... সব শেষ।
          প্রতিটি Opinion... মনে হতো... হয়তো এটাই ঠিক। তারপর... ধীরে ধীরে... একটি জিনিস বদলাল। আমরা বুঝতে
          শুরু করলাম। আর... Understanding... ধীরে ধীরে... Panic-কে... Replace করল।
        </MText>
        <MQuote>"আগে প্রতিদিন নতুন কিছু Try করতাম। এখন আগে বুঝি, তারপর সিদ্ধান্ত নিই।"</MQuote>

        <MSub>পরিবর্তন ২ — "আমরা Advice Collect করা বন্ধ করলাম।"</MSub>
        <MText>
          আগে... Facebook Group। YouTube। Google। বন্ধু। আত্মীয়। Doctor। Therapist। সব জায়গা থেকে...
          Advice। আজ... আমরা... Advice শুনি। কিন্তু... সব Advice Follow করি না। কারণ... আমাদের এখন... একটি
          Decision Framework আছে।
        </MText>
        <MQuote>"আগে সবাই যা বলত তাই করতাম। এখন বুঝে করি।"</MQuote>

        <MSub>পরিবর্তন ৩ — "আমরা আর শুধু Improvement খুঁজতাম না।"</MSub>
        <MText>
          আগে... আমরা ভাবতাম... আজ নতুন শব্দ বলেছে? আজ Meltdown কমেছে? আজ বসেছে? আজ লিখেছে? এখন... আমরা...
          আরও বড় ছবি দেখি। আজ... ও কি আরও Curious? আজ... আরও Connect করছে? আজ... আরও চেষ্টা করছে? আজ... আরও
          Safe অনুভব করছে? কারণ... আমরা বুঝেছি... সব Progress... একই রকম নয়।
        </MText>

        <MSub>পরিবর্তন ৪ — "আমরা আর নিজেদের দোষ দিতাম না।"</MSub>
        <MText>আগে... প্রতিটি Challenge-এর পরে... একটাই প্রশ্ন আসত।</MText>
        <MQuote>"আমি কি ভুল করলাম?"</MQuote>
        <MText>আজ... প্রশ্নটা বদলেছে।</MText>
        <MQuote>"আজকের অভিজ্ঞতা থেকে আমরা কী শিখলাম?"</MQuote>
        <MText>এই ছোট্ট পরিবর্তনটাই... অনেক পরিবারের... মানসিক চাপ... অনেক কমিয়ে দিয়েছে।</MText>

        <MSub>পরিবর্তন ৫ — "আমরা প্রথমবার Direction পেলাম।"</MSub>
        <MText>
          আগে... অনেক কাজ ছিল। কিন্তু... Priority ছিল না। আজ... সবকিছু করার চেষ্টা করি না। সবচেয়ে
          গুরুত্বপূর্ণ... কাজটা... আগে করি।
        </MText>
        <MQuote>"আমাদের প্রথমবার মনে হয়েছিল... আমরা কোথায় যাচ্ছি সেটা জানি।"</MQuote>

        <MSub>পরিবর্তন ৬ — "আমরা আবার ভবিষ্যৎ নিয়ে স্বপ্ন দেখতে শুরু করলাম।"</MSub>
        <MText>
          আগে... ভবিষ্যতের কথা ভাবলেই... ভয় লাগত। আজ... সব উত্তর পাইনি। সব Challenge শেষ হয়নি। কিন্তু...
          আমাদের কাছে... একটি পথ আছে। আর... একটি পথ... আশার থেকেও মূল্যবান। কারণ... আশা... অনুভূতি। পথ...
          দিকনির্দেশনা।
        </MText>

        <MSub>পরিবর্তন ৭ — "আমাদের সন্তানই শুধু বদলায়নি... আমাদের পরিবারও বদলেছে।"</MSub>
        <MText>
          আগে... Development... ছিল... একটি Constant Stress। আজ... এটি... আমাদের Daily Life-এর... একটি
          Meaningful অংশ। আগে... আমরা... শুধু সমস্যা দেখতাম। আজ... আমরা... ছোট ছোট Progress-ও দেখতে শিখেছি।
        </MText>

        <MSub>সবচেয়ে আশ্চর্যের বিষয়...</MSub>
        <MText>
          এই Stories-গুলোর মধ্যে... একটি Common Pattern আছে। কেউ বলেননি... "আমরা একটা Magic Technique
          পেয়েছিলাম।" কেউ বলেননি... "একটা Exercise সব বদলে দিয়েছে।" বরং... প্রায় সবাই... ভিন্ন ভিন্ন
          ভাষায়... একই কথাটা বলেছেন।
        </MText>
        <MQuote>"আমরা Development-কে নতুনভাবে দেখতে শিখেছিলাম।"</MQuote>

        <MText>
          হয়তো... এই কারণেই... Science of Stuck™... কোনো Motivation Seminar নয়। কোনো Therapy Workshop নয়।
          কোনো Parenting Tips Session-ও নয়। এটি... একটি... Way of Thinking Shift.
        </MText>

        <MText>
          আর... যখন... Thinking বদলায়... Decision বদলায়। Decision বদলালে... Daily Life বদলায়। Daily Life
          বদলালে... অনেক সময়... Development-ও... নতুন গতি পেতে শুরু করে।
        </MText>

        <MEmphasis>হ্যাঁ... আমিও এই পরিবর্তনের Journey শুরু করতে চাই।</MEmphasis>
        <CTAButtons />
      </MSection>

      {/* Section 18: Before vs After */}
      <MSection tone="muted">
        <Eyebrow>SECTION 18</Eyebrow>
        <MHeading>একটি পরিবারের Journey... যখন Confusion থেকে Clarity-এর দিকে এগোতে শুরু করে।</MHeading>

        <MText>
          সবচেয়ে বড় পরিবর্তন... অনেক সময়... একদিনে দেখা যায় না। এটি... ধীরে ধীরে... অসংখ্য ছোট ছোট
          পরিবর্তনের মাধ্যমে... একটি নতুন বাস্তবতা তৈরি করে।
        </MText>

        <MList
          items={[
            <>আগে প্রতিটি দিন শুরু হতো "আজ আবার কী হবে?" দিয়ে — আজ শুরু হয় "আজ আমরা সবচেয়ে গুরুত্বপূর্ণ কোন সুযোগটা তৈরি করতে পারি?" দিয়ে।</>,
            <>আগে Advice ছিল অনেক, Direction ছিল না — আজ Advice এখনও আছে, কিন্তু Direction-ও আছে।</>,
            <>আগে প্রতিটি নতুন Behaviour একটি নতুন Problem মনে হতো — আজ অনেক Behaviour একটি নতুন Signal হয়ে উঠেছে; আমরা শুধু "কী হচ্ছে?" দেখি না, "কেন হচ্ছে?" প্রশ্ন করি।</>,
            <>আগে Therapy ছিল Calendar-এর Event — আজ Development Daily Life-এর অংশ: খাওয়ার সময়, খেলার সময়, গল্প বলার সময়, অপেক্ষা করার সময়।</>,
            <>আগে বাড়ি ছিল Therapy-এর পরে ফিরে আসার জায়গা — আজ বাড়ি Development-এর সবচেয়ে গুরুত্বপূর্ণ পরিবেশ।</>,
            <>আগে Parents ভাবতেন "Professional-রা জানেন..." — আজ Parents ভাবেন "আমরাও বুঝতে শিখছি..."; Professional এখন Guide, Parent এখন Daily Change Leader।</>,
            <>আগে একটি Improvement দেখলে অনেক আশা, একটি Regression হলেই অনেক ভয় — আজ Progress-কে Journey হিসেবে দেখা হয়।</>,
            <>আগে প্রশ্ন ছিল "আর কী করব?" — আজ প্রশ্ন হলো "সবচেয়ে গুরুত্বপূর্ণ কাজটা কী?"</>,
            <>আগে Parent-এর সবচেয়ে বড় শক্তি ছিল ভালোবাসা — আজ ভালোবাসার সঙ্গে যুক্ত হয়েছে Understanding, আর তার সঙ্গে Direction।</>,
            <>আগে Development ছিল অনেকগুলো আলাদা আলাদা Target: Speech, Behaviour, Attention, Learning — আজ Development একটি Connected Journey।</>,
            <>আগে পরিবার শুধু Improvement খুঁজত — আজ পরিবার Pattern দেখতে শেখে।</>,
            <>আগে প্রতিটি নতুন Opinion নতুন Confusion তৈরি করত — আজ প্রতিটি নতুন Information একটি Framework-এর মধ্যে নিজের জায়গা খুঁজে নেয়।</>,
            <>আগে Future ভয় তৈরি করত — আজ Future একটি Direction তৈরি করে; সব প্রশ্নের উত্তর পাওয়া যায়নি, সব Challenge শেষ হয়নি, কিন্তু এখন Journey-এর একটি মানচিত্র আছে।</>,
          ]}
        />

        <MSub>সবচেয়ে বড় Before → After</MSub>
        <MCards
          columns={2}
          items={[
            { title: "আগে: \"আমরা জানি না কী করব।\"", body: "পরে: \"আমরা বুঝে সিদ্ধান্ত নিই।\"" },
            { title: "আগে: \"সবকিছু একসঙ্গে করতে হবে।\"", body: "পরে: \"সবচেয়ে গুরুত্বপূর্ণ জায়গা থেকে শুরু করি।\"" },
            { title: "আগে: \"আরও Advice দরকার।\"", body: "পরে: \"আরও Clarity দরকার।\"" },
            { title: "আগে: \"শুধু Session-এই Development হয়।\"", body: "পরে: \"Development প্রতিদিনের জীবনেও ঘটে।\"" },
            { title: "আগে: \"Professional-ই সব করবেন।\"", body: "পরে: \"Professional পথ দেখান, আমরা পথ চলি।\"" },
            { title: "আগে: \"আমরা অপেক্ষা করছি।\"", body: "পরে: \"আমরা উদ্দেশ্যপূর্ণভাবে এগোচ্ছি।\"" },
          ]}
        />

        <MSub>কিন্তু...</MSub>
        <MText>
          একটি বিষয়... আমরা কখনও বলি না। আমরা বলি না... "এই Journey সহজ।" কারণ... এটি সহজ নয়। এটি...
          Commitment চায়। ধৈর্য চায়। Consistency চায়। শেখার ইচ্ছা চায়। কিন্তু... আমরা এটাও দেখেছি...
          যখন... একটি পরিবার... একই Direction-এ... একসঙ্গে হাঁটতে শুরু করে... তখন... Journey... অনেক
          Meaningful হয়ে ওঠে।
        </MText>

        <MSub>এই কারণেই...</MSub>
        <MText>
          আমাদের কাছে... সফলতার সংজ্ঞা... শুধু একটি Skill নয়। শুধু একটি Assessment Score নয়। শুধু একটি
          Behaviour Change নয়। সফলতা হলো... যখন... একটি পরিবার... Confusion থেকে... Purposeful
          Progress-এর দিকে এগোতে শুরু করে।
        </MText>

        <MEmphasis>হ্যাঁ... আমি Confusion থেকে Clarity-এর Journey শুরু করতে চাই।</MEmphasis>
        <CTAButtons />
      </MSection>
    </>
  );
}
