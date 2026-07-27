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
  MDivider,
} from "@/components/masterclass/primitives";
import { CTAButtons } from "@/components/masterclass/RegistrationForm";

export function Part4() {
  return (
    <>
      {/* Section 19: What Happens Inside These Three Hours */}
      <MSection tone="default">
        <Eyebrow>Science of Stuck™</Eyebrow>
        <MHeading>
          এই তিন ঘণ্টায়...
          <br />
          আপনার সঙ্গে কী ঘটবে?
        </MHeading>

        <MSub>প্রথমেই...</MSub>
        <MText>
          একটা কথা পরিষ্কার করে বলি। এটি... কোনো Motivation Session নয়। কোনো Parenting Tips
          Webinar নয়। কোনো Therapy Training-ও নয়। আপনি... এখানে... শুধু Information নিতে আসছেন
          না। আপনি... একটি নতুন Lens নিয়ে... ফিরে যাবেন।
        </MText>

        <MDivider />

        <MSub>
          প্রথম ঘণ্টা
          <br />
          Why Do Families Get Stuck?
        </MSub>
        <MText>
          যেখানে... আপনি প্রথমবার... Stuckness-কে নতুনভাবে দেখতে শুরু করবেন।
        </MText>
        <MText>
          এই অংশে... আমরা... কোনো Technique দিয়ে শুরু করব না। কারণ... Technique-এর আগে...
          দৃষ্টিভঙ্গি বদলানো প্রয়োজন। আপনি বুঝতে শুরু করবেন... কেন... অনেক ভালো বাবা-মা...
          অনেক চেষ্টা করার পরেও... বারবার... একই জায়গায় ফিরে আসেন। কেন... শুধু আরও চেষ্টা...
          সবসময়... আরও Progress এনে দেয় না। এবং... কেন... Direction... Effort-এর থেকেও...
          বেশি গুরুত্বপূর্ণ।
        </MText>
        <MText>
          এই অংশ শেষে... হয়তো... আপনি... নিজের Journey-কে... একেবারে নতুন চোখে দেখতে শুরু
          করবেন।
        </MText>

        <MDivider />

        <MSub>
          দ্বিতীয় ঘণ্টা
          <br />
          The Science Behind Progress
        </MSub>
        <MText>
          যেখানে... Development-এর ভেতরের সংযোগগুলো... ধীরে ধীরে পরিষ্কার হতে শুরু করবে।
        </MText>
        <MText>
          আপনি... প্রথমবার... দেখতে শুরু করবেন... কীভাবে... একটি Developmental Area... অন্য
          Area-এর সঙ্গে... গভীরভাবে যুক্ত। কেন... কখনও... যে জায়গাটাকে... সমস্যা বলে মনে হয়...
          সেটা... আসল Root নাও হতে পারে। এবং... কেন... অনেক সময়... সবচেয়ে বড় Leverage...
          অন্য কোথাও লুকিয়ে থাকে।
        </MText>
        <MText>
          আমরা... আপনাকে... একটি Framework দেব। যাতে... Webinar শেষ হওয়ার পরেও... আপনি...
          নতুন Situation-গুলোকে... আরও পরিষ্কারভাবে... দেখতে পারেন।
        </MText>

        <MDivider />

        <MSub>
          তৃতীয় ঘণ্টা
          <br />
          From Clarity to Action
        </MSub>
        <MText>যেখানে... আপনি বুঝতে পারবেন... এখন থেকে কীভাবে এগোবেন।</MText>
        <MText>
          এই অংশে... আমরা... আপনাকে... কোনো Fixed Formula দেব না। কারণ... প্রত্যেক শিশুর
          Journey... আলাদা। বরং... আমরা... এমন কিছু Principles নিয়ে আলোচনা করব... যেগুলো...
          আপনাকে... নিজের সন্তানের Journey-র... পরবর্তী সিদ্ধান্তগুলো... আরও সচেতনভাবে নিতে
          সাহায্য করবে।
        </MText>
        <MText>আপনি... Webinar শেষ করবেন... আরও Advice নিয়ে নয়। আরও Clarity নিয়ে।</MText>

        <MDivider />

        <MHeading className="text-2xl md:text-3xl">আপনি কী পাবেন?</MHeading>
        <MList
          items={[
            <>
              <strong>একটি নতুন Way of Thinking</strong> — যা Development-কে একটি Connected
              Journey হিসেবে দেখতে সাহায্য করবে।
            </>,
            <>
              <strong>একটি Decision Framework</strong> — যাতে নতুন Advice পেলেই Confused হয়ে
              না গিয়ে বুঝে বিচার করতে পারেন।
            </>,
            <>
              <strong>একটি Developmental Lens</strong> — যা শুধু বর্তমান নয়... আগামী দিনের
              Decision-ও সহজ করবে।
            </>,
            <>
              <strong>একটি Language</strong> — যার মাধ্যমে আপনি Doctor, Therapist, Teacher এবং
              পরিবারের অন্য সদস্যদের সঙ্গে আরও Meaningful আলোচনা করতে পারবেন।
            </>,
            <>
              <strong>একটি Roadmap</strong> — যদিও এটি সব পরিবারের জন্য একই হবে না, তবুও আপনি
              বুঝতে পারবেন Journey-টা কীভাবে ভাবতে হয়।
            </>,
          ]}
        />

        <MHeading className="text-2xl md:text-3xl">আপনি কী পাবেন না?</MHeading>
        <MText>কারণ... সঠিক প্রত্যাশা... সঠিক সিদ্ধান্ত নিতে সাহায্য করে।</MText>
        <MList
          items={[
            <>
              <strong>১০০টি Quick Tips</strong> — কারণ Tips, Context ছাড়া অনেক সময় আরও
              Confusion তৈরি করে।
            </>,
            <>
              <strong>Magic Technique</strong> — কারণ Development কোনো Shortcut-এর উপর দাঁড়িয়ে
              থাকে না।
            </>,
            <>
              <strong>Overnight Transformation-এর প্রতিশ্রুতি</strong> — কারণ বাস্তব পরিবর্তন
              সময়ের সঙ্গে Consistency-এর মাধ্যমে তৈরি হয়।
            </>,
            <>
              <strong>One-Size-Fits-All Solution</strong> — কারণ প্রত্যেক শিশুর Journey নিজস্ব।
            </>,
          ]}
        />

        <MSub>বরং...</MSub>
        <MText>
          আপনি পাবেন... <strong>একটি নতুন বোঝাপড়া।</strong> আর... অনেক সময়... সেটাই...
          সবচেয়ে বড় Breakthrough। কারণ... যখন... বোঝা বদলায়... তখন... Decision বদলায়।
          Decision বদলালে... Daily Life বদলায়। আর... Daily Life বদলালে... Development-এর জন্য...
          নতুন সুযোগ তৈরি হয়।
        </MText>

        <MText>
          এই Webinar... শেষ হওয়ার পরে... আমরা চাই... আপনি... কমপক্ষে... এই তিনটি কথা...
          নিজের কাছে বলতে পারেন।
        </MText>
        <MList
          items={[
            "আমি এখন বুঝতে পারছি...",
            "আমি এখন কম Confused...",
            "আমি এখন জানি... পরবর্তী গুরুত্বপূর্ণ পদক্ষেপ কী হতে পারে।",
          ]}
        />

        <MText>
          আর... যদি... এই তিন ঘণ্টা শেষে... আপনার মনে হয়... আপনি... কোনো নতুন Clarity
          পাননি... কোনো মূল্য পাননি... কোনো নতুন Perspective পাননি... তাহলে... আমরা...
          আপনার Registration Fee... <strong>১০০% ফেরত দেব।</strong> কারণ... Science of Stuck™...
          Information বিক্রি করে না। Understanding তৈরি করতে চায়।
        </MText>

        <MEmphasis>হ্যাঁ... আমি এই তিন ঘণ্টার অভিজ্ঞতার অংশ হতে চাই।</MEmphasis>
        <CTAButtons />
      </MSection>

      {/* Section 20: Everything You Receive */}
      <MSection tone="muted">
        <MHeading>
          আপনার Registration-এর সঙ্গে...
          <br />
          শুধু একটি Webinar নয়।
          <br />
          একটি সম্পূর্ণ Learning Experience।
        </MHeading>
        <MText>
          Science of Stuck™-এ... আপনার Registration... শুধু... তিন ঘণ্টার একটি Live Session-এর
          জন্য নয়। আমরা চাই... এই Experience... Webinar শেষ হওয়ার পরেও... আপনার সঙ্গে থাকুক।
          তাই... আপনার জন্য... আমরা... কিছু গুরুত্বপূর্ণ Resources... একসঙ্গে রেখেছি।
        </MText>

        <MCards
          columns={2}
          items={[
            {
              title: "🎥 ৩ ঘণ্টার Live Science of Stuck™ Experience",
              body: (
                <>
                  মূল্য: অমূল্য। এটাই এই Journey-র মূল অংশ। এখানে আপনি শুধু Information পাবেন
                  না। একটি নতুন Developmental Lens নিয়ে ফিরবেন। এমন একটি Way of Thinking যা
                  আপনার আগামী দিনের অনেক সিদ্ধান্তকে আরও পরিষ্কার করে তুলতে পারে।
                </>
              ),
            },
            {
              title: "📒 Science of Stuck™ Digital Workbook",
              body: (
                <>
                  অনেক সময় Webinar চলাকালীন সবকিছু মনে রাখা সম্ভব হয় না। তাই আপনার জন্য একটি
                  Guided Workbook থাকবে, যেখানে আপনি নিজের পর্যবেক্ষণ, প্রশ্ন, উপলব্ধি লিখে
                  রাখতে পারবেন। কারণ যে Learning লেখা হয়, তা আরও গভীর হয়।
                </>
              ),
            },
            {
              title: "📝 Reflection & Action Sheets",
              body: (
                <>
                  Webinar শেষ হওয়ার পরে সবচেয়ে গুরুত্বপূর্ণ প্রশ্ন হলো "এখন আমি কীভাবে ভাবব?"
                  এই Reflection Sheets আপনাকে নিজের সন্তানের Journey আরও সচেতনভাবে পর্যবেক্ষণ
                  করতে সাহায্য করবে।
                </>
              ),
            },
            {
              title: "📂 Key Concepts Summary",
              body: (
                <>
                  অনেক সময় একটি Webinar-এর সবচেয়ে গুরুত্বপূর্ণ অংশ কয়েকটি Core Idea। এই
                  Summary আপনাকে সেই Core Principles পরে আবার দ্রুত Review করতে সাহায্য করবে।
                </>
              ),
            },
            {
              title: "📱 Access to the Session Recording*",
              body: (
                <>
                  আমরা জানি সবসময় প্রত্যেক মুহূর্ত লিখে রাখা সম্ভব নয়। তাই আপনি নির্দিষ্ট
                  সময়ের জন্য Session Recording-এ Access পাবেন, যাতে গুরুত্বপূর্ণ অংশগুলো আবার
                  দেখে নিতে পারেন। *Recording Access-এর সময়সীমা Registration Page-এ উল্লেখ
                  থাকবে।
                </>
              ),
            },
            {
              title: "📋 Parent Self-Reflection Framework",
              body: (
                <>
                  Webinar-এর সবচেয়ে গুরুত্বপূর্ণ Learning শুরু হয় নিজেকে প্রশ্ন করা দিয়ে। এই
                  Framework আপনাকে শুধু শিশুকে নয়, নিজের Decision-making Pattern-কেও নতুনভাবে
                  দেখতে সাহায্য করবে।
                </>
              ),
            },
            {
              title: "📚 Carefully Curated Next-Step Resources",
              body: (
                <>
                  Science of Stuck™ শেষ নয়। এটি শুরু। তাই যদি আপনি আরও গভীরে যেতে চান, তাহলে
                  কোন বিষয়গুলো পরবর্তী ধাপে শেখা প্রয়োজন সেই বিষয়ে একটি পরিষ্কার Direction
                  আপনি পাবেন।
                </>
              ),
            },
          ]}
        />

        <MSub>কিন্তু...</MSub>
        <MText>সবচেয়ে মূল্যবান জিনিসটি... এগুলোর কোনোটাই নয়।</MText>
        <MSub>সবচেয়ে মূল্যবান বিষয় হলো... আপনি আর একা থাকবেন না।</MSub>
        <MText>
          কারণ... আপনি বুঝতে পারবেন... হাজার হাজার পরিবার... একই ধরনের প্রশ্ন নিয়ে... এই
          Journey শুরু করেছেন। আর... Confusion... কমে যায়... যখন... বোঝা... স্পষ্ট হতে শুরু
          করে।
        </MText>

        <MSub>সংক্ষেপে... আপনার Registration-এ যা যা থাকছে</MSub>
        <MList
          items={[
            "৩ ঘণ্টার Live Science of Stuck™ Experience",
            "Guided Digital Workbook",
            "Reflection & Action Sheets",
            "Key Concepts Summary",
            "Recording Access*",
            "Parent Self-Reflection Framework",
            "Carefully Curated Next-Step Resources",
          ]}
        />
        <MText className="text-sm">
          *কিছু Resource সময়ে সময়েই আরও সমৃদ্ধ করা হতে পারে, যাতে প্রতিটি নতুন
          অংশগ্রহণকারী সর্বশেষ সংস্করণটি পান।
        </MText>

        <MEmphasis>হ্যাঁ... আমি এই সম্পূর্ণ Learning Experience-এর অংশ হতে চাই।</MEmphasis>
        <CTAButtons />
      </MSection>

      {/* Section 21: Bonuses */}
      <MSection tone="default">
        <MHeading>
          আমাদের পক্ষ থেকে...
          <br />
          আপনার Journey-কে আরও সহজ করার কিছু অতিরিক্ত সহায়তা।
        </MHeading>
        <MText>
          Science of Stuck™... শুধু... তিন ঘণ্টার একটি Webinar নয়। আমরা জানি... অনেক বাবা-মা...
          Webinar-এর পরে... নতুন প্রশ্ন নিয়ে... বাসায় ফিরে যান। তাই... আপনার Learning-কে...
          আরও সহজ... আরও বাস্তব... করার জন্য... আমরা... কিছু অতিরিক্ত সহায়তা... রেখেছি।
        </MText>

        <MCards
          columns={2}
          items={[
            {
              title: "🎁 Special Resource 1: The Science of Stuck™ Parent Reflection Guide",
              body: (
                <>
                  Webinar শেষ হওয়ার পরে অনেক সময় সবচেয়ে গুরুত্বপূর্ণ Learning শুরু হয়। কারণ
                  তখন আপনি নিজের সন্তানের Journey-কে নতুন চোখে দেখতে শুরু করেন। এই Reflection
                  Guide আপনাকে ঠিক সেই কাজটাই করতে সাহায্য করবে — কোন প্রশ্নগুলো নিজেকে করবেন,
                  কী লক্ষ্য করবেন, কীভাবে পর্যবেক্ষণ করবেন। কারণ ভালো Observation অনেক সময়
                  ভালো Intervention-এরও আগে আসে।
                </>
              ),
            },
            {
              title: "🎁 Special Resource 2: Development Opportunity Checklist",
              body: (
                <>
                  অনেক বাবা-মা ভাবেন Development শুধু Therapy Session-এ হয়। এই Checklist
                  দেখাবে কীভাবে প্রতিদিনের ছোট ছোট মুহূর্তগুলোও Development-এর সুযোগ হতে পারে —
                  খাওয়ার সময়, খেলার সময়, গল্পের সময়, অপেক্ষার সময়। দৈনন্দিন জীবনের অনেক ছোট
                  মুহূর্ত নতুন অর্থ পাবে।
                </>
              ),
            },
            {
              title: "🎁 Special Resource 3: Ask Better Questions Framework",
              body: (
                <>
                  অনেক সময় সঠিক উত্তর সঠিক প্রশ্ন থেকেই শুরু হয়। এই Framework আপনাকে Doctor,
                  Therapist, Teacher এবং নিজেকেও আরও Meaningful প্রশ্ন করতে সাহায্য করবে। কারণ
                  যখন প্রশ্ন বদলায়, উত্তরও বদলাতে শুরু করে।
                </>
              ),
            },
            {
              title: "🎁 Special Resource 4: Recommended Reading & Learning Path",
              body: (
                <>
                  Science of Stuck™ আপনার Journey-এর শুরু, শেষ নয়। তাই যদি আপনি আরও গভীরে যেতে
                  চান, তাহলে কোন বিষয়... কোন ক্রমে... অন্বেষণ করা উপকারী হতে পারে... তার একটি
                  Curated Learning Path আপনি পাবেন। যাতে Google-এর অসংখ্য তথ্যের ভিড়ে আপনি
                  হারিয়ে না যান।
                </>
              ),
            },
            {
              title: "🎁 Special Resource 5: Exclusive Invitation to the Next Step",
              body: (
                <>
                  Webinar শেষে যদি আপনার মনে হয় আপনি আরও Structured Guidance চান, তাহলে
                  আপনাকে আমাদের পরবর্তী Learning Experience সম্পর্কে জানানো হবে। এটি কোনো
                  বাধ্যবাধকতা নয়, কোনো Pressure নয়। শুধু যাঁরা Journey চালিয়ে যেতে চান, তাঁদের
                  জন্য একটি Invitation।
                </>
              ),
            },
          ]}
        />

        <MSub>কিন্তু...</MSub>
        <MText>সবচেয়ে বড় Bonus... এগুলোর কোনোটাই নয়।</MText>
        <MSub>সবচেয়ে বড় Bonus হলো... আপনি আর আগের মানুষ থাকবেন না।</MSub>
        <MText>
          কারণ... আপনি... যেভাবে... আজ... Development-কে দেখছেন... Webinar-এর পরে... সম্ভবত...
          সেভাবে... আর দেখবেন না। আপনি... শুধু... আরও Information নিয়ে ফিরবেন না। আরও Clear
          Thinking... নিয়ে ফিরবেন। আর... অনেক সময়... একটি পরিষ্কার চিন্তাধারাই... সবচেয়ে
          মূল্যবান Resource।
        </MText>

        <MSub>আমাদের বিশ্বাস...</MSub>
        <MText>
          ভালো Resource... Decision নেয় না। <strong>ভালো Parent-ই Decision নেন।</strong> আর...
          যখন... একজন Parent... আরও পরিষ্কারভাবে... বুঝতে শুরু করেন... তখন... একটি Resource...
          হঠাৎ করেই... অনেক বেশি কার্যকর হয়ে ওঠে। তাই... এই অতিরিক্ত সহায়তাগুলোর... উদ্দেশ্য...
          আপনাকে... আরও Information দেওয়া নয়। বরং... আপনার Understanding-কে... আরও গভীর করা।
        </MText>

        <MSub>সংক্ষেপে... আপনার Registration-এর সঙ্গে অতিরিক্ত যা থাকছে</MSub>
        <MList
          items={[
            "Parent Reflection Guide",
            "Development Opportunity Checklist",
            "Ask Better Questions Framework",
            "Recommended Learning Path",
            "Invitation to the Next Learning Experience",
          ]}
        />

        <MText>
          এখন... একটি বাস্তব প্রশ্ন। আপনি... আজ... যা যা পাচ্ছেন... সেগুলোর... সম্মিলিত মূল্য...
          কত? এবং... আপনাকে... আসলে... কত দিতে হবে? চলুন... পরের অংশে... খুব স্বচ্ছভাবে...
          সেটাই দেখি।
        </MText>

        <MEmphasis>হ্যাঁ... আমি এই সম্পূর্ণ Experience এবং অতিরিক্ত সহায়তার অংশ হতে চাই।</MEmphasis>
        <CTAButtons />
      </MSection>

      {/* Section 22: Total Value Stack */}
      <MSection tone="muted">
        <MHeading>
          এই Experience-এর মূল্য...
          <br />
          শুধু Registration Fee দিয়ে মাপা যায় না।
        </MHeading>

        <MText>
          যদি... আপনি... Science of Stuck™-কে... শুধু... একটি Webinar হিসেবে দেখেন... তাহলে...
          এর মূল্য... হয়তো... Registration Fee-ই।
        </MText>
        <MText>
          কিন্তু... যদি... আপনি... এটিকে... একটি নতুন Way of Thinking-এর... শুরু হিসেবে
          দেখেন... তাহলে... এর মূল্য... সম্পূর্ণ অন্যরকম।
        </MText>

        <MSub>একটু ভেবে দেখুন...</MSub>
        <MText>
          একজন Parent হিসেবে... আপনি... গত কয়েক বছরে... কত সময় ব্যয় করেছেন... Information
          খুঁজতে? Google-এ। YouTube-এ। Facebook Group-এ। একজনের Advice। আরেকজনের Opinion।
          নতুন Video। নতুন Technique। নতুন Promise।
        </MText>

        <MQuote>প্রশ্ন হলো... এই Information-এর ভিড়ে... আপনার Confusion কি কমেছে? নাকি... আরও বেড়েছে?</MQuote>

        <MText>
          Science of Stuck™... আরও Information যোগ করার জন্য নয়। বরং... যা জানেন...
          সেগুলোকে... একটি Connected Picture-এ... দেখতে সাহায্য করার জন্য।
        </MText>

        <MText>
          এই Experience-এর মূল্য... হয়তো... একটি Workbook নয়। একটি Recording-ও নয়। একটি
          Webinar-ও নয়।
        </MText>

        <MSub>সবচেয়ে বড় মূল্য... হলো... ভুল Direction-এ আরও কয়েক মাস না কাটানো।</MSub>
        <MText>
          কারণ... কখনও কখনও... সবচেয়ে বড় ক্ষতি... চেষ্টা না করা নয়। সবচেয়ে বড় ক্ষতি...
          ভুল জায়গায়... অসংখ্য চেষ্টা করে যাওয়া।
        </MText>

        <MSub>সবচেয়ে মূল্যবান বিষয়... হলো... আপনি আরও সচেতন Decision নিতে শুরু করবেন।</MSub>
        <MText>
          যদিও... একটি Webinar... আপনার সন্তানের Journey... শেষ করে দিতে পারে না। কিন্তু...
          এটি... আপনার আগামী Decision-গুলোকে... অনেক বেশি Meaningful করে তুলতে পারে।
        </MText>

        <MSub>আপনি যা পাচ্ছেন...</MSub>
        <MList
          items={[
            "৩ ঘণ্টার Live Experience",
            "Guided Workbook",
            "Reflection Framework",
            "Recording Access*",
            "Parent Learning Resources",
            "একটি নতুন Developmental Lens",
            "আরও পরিষ্কার Decision-Making",
            "একটি Connected Way of Thinking",
          ]}
        />

        <MSub>কিন্তু...</MSub>
        <MText>
          সবচেয়ে গুরুত্বপূর্ণ বিষয়... শেষের দুটো। কারণ... Resources... সময়ের সঙ্গে... পুরনো
          হতে পারে। কিন্তু... <strong>Thinking Framework...</strong> আপনার সঙ্গে... অনেক দূর
          পর্যন্ত... থাকে।
        </MText>

        <MText>
          তাই... আমরা... এই Experience-এর... মূল্য... কোনো কৃত্রিম সংখ্যা দিয়ে... প্রমাণ
          করার চেষ্টা করি না। আমরা চাই... আপনি... নিজেই... একটি প্রশ্ন করুন।
        </MText>

        <MQuote>যদি... এই তিন ঘণ্টা... আপনাকে... শুধু... একটি গুরুত্বপূর্ণ ভুল সিদ্ধান্ত... এড়াতে সাহায্য করে... তাহলে... এর মূল্য... আপনার কাছে... কত?</MQuote>
        <MQuote>যদি... এই তিন ঘণ্টা... আপনার... Confusion... কিছুটা কমিয়ে দেয়... তাহলে... তার মূল্য... কত?</MQuote>
        <MQuote>যদি... এই তিন ঘণ্টা... আপনাকে... আপনার সন্তানের Journey-কে... আরও পরিষ্কারভাবে দেখতে সাহায্য করে... তাহলে... তার মূল্য... কত?</MQuote>

        <MText>এখন... চলুন... খুব স্বচ্ছভাবে... Registration Fee-টা... দেখে নেওয়া যাক।</MText>

        <MSub>আজকের Registration — Science of Stuck™</MSub>
        <MList
          items={[
            "Live 3-Hour Experience",
            "Complete Learning Resources",
            "Workbook",
            "Reflection Framework",
            "Recording Access*",
            "Parent Success Resources",
          ]}
        />

        <MHeading className="text-2xl md:text-3xl">
          আজকের Registration Fee
          <br />
          ₹___
        </MHeading>
        <MText className="text-sm">(Insert Actual Price)</MText>

        <MText>
          এবং... আপনার জন্য... আমাদের একটি প্রতিশ্রুতি। যদি... Science of Stuck™... শেষ
          হওয়ার পরে... আপনার মনে হয়... আপনি... কোনো নতুন বোঝাপড়া পাননি... কোনো নতুন Clarity
          পাননি... কোনো বাস্তব মূল্য পাননি... তাহলে... আমরা... আপনার Registration Fee...
          <strong> ১০০% ফেরত দেব।</strong> কারণ... আমরা বিশ্বাস করি... Trust... প্রথমে আসে।
          Transaction... তার পরে।
        </MText>

        <MText>
          আপনি... আজ... কোন সিদ্ধান্ত নেবেন... সেটা... সম্পূর্ণ আপনার। আপনি... আজ না-ও আসতে
          পারেন। সেটাও... আপনার সিদ্ধান্ত। কিন্তু... যদি... আপনার মনে হয়... এখন... আরও
          পরিষ্কারভাবে... বিষয়গুলোকে বুঝতে হবে... তাহলে... আমরা... এই Journey-তে... আপনাকে
          স্বাগত জানাই।
        </MText>

        <MEmphasis>হ্যাঁ... আমি এই Journey শুরু করতে প্রস্তুত।</MEmphasis>
        <CTAButtons />
      </MSection>

      {/* Section 23: 100% Money Back Guarantee */}
      <MSection tone="accent">
        <MHeading>
          আমাদের সবচেয়ে গুরুত্বপূর্ণ প্রতিশ্রুতি।
          <br />
          আপনার বিশ্বাস...
          <br />
          আমাদের কাছে Registration Fee-এর থেকেও বেশি মূল্যবান।
        </MHeading>

        <MText>
          আমরা... একটি কথা... শুরু থেকেই... পরিষ্কার রাখতে চাই। আমরা... চাই না... আপনি...
          শুধু... Marketing-এর কথায়... Science of Stuck™-এ যোগ দিন। আমরা চাই... আপনি... নিজে
          Experience করুন। তারপর... নিজেই বিচার করুন।
        </MText>

        <MText>
          কারণ... আমরা জানি... আপনার মতো... অনেক বাবা-মা... ইতিমধ্যেই... অনেক Webinar-এ
          অংশ নিয়েছেন। অনেক বই পড়েছেন। অনেক Video দেখেছেন। অনেক Advice শুনেছেন। অনেক
          Promise-ও শুনেছেন।
        </MText>

        <MQuote>যদি এটাও সেরকমই হয়?</MQuote>
        <MText>
          এটি... খুবই স্বাভাবিক প্রশ্ন। আর... ঠিক সেই কারণেই... আমরা... এই প্রতিশ্রুতি
          দিচ্ছি।
        </MText>

        <MSub>আমাদের প্রতিশ্রুতি</MSub>
        <MText>
          যদি... আপনি... Science of Stuck™-এর... সম্পূর্ণ Live Webinar-এ... অংশগ্রহণ করেন...
          মনোযোগ দিয়ে... পুরো Session দেখেন... তারপরও... আপনার মনে হয়...
        </MText>
        <MList
          items={[
            "❌ আপনি কোনো নতুন বোঝাপড়া পাননি",
            "❌ আপনার Confusion একটুও কমেনি",
            "❌ আপনার আগামী Decision-গুলো আরও পরিষ্কার হয়নি",
            "❌ এই Experience আপনার কাছে কোনো বাস্তব মূল্য তৈরি করেনি",
          ]}
        />

        <MText>
          তাহলে... আমরা... আপনার Registration Fee... <strong>১০০% ফেরত দেব।</strong> কোনো
          তর্ক নয়। কোনো অস্বস্তিকর আলোচনা নয়। কারণ... আমরা চাই... আপনার সিদ্ধান্ত... বিশ্বাসের
          উপর দাঁড়িয়ে থাকুক। ভয়ের উপর নয়।
        </MText>

        <MSub>কেন... আমরা... এই প্রতিশ্রুতি দিতে পারছি?</MSub>
        <MText>
          কারণ... আমরা... কোনো Information বিক্রি করছি না। আমরা... একটি Way of Thinking...
          Experience করার আমন্ত্রণ জানাচ্ছি।
        </MText>
        <MText>
          আর... আমাদের বিশ্বাস... যদি... আপনি... খোলা মনে... এই তিন ঘণ্টার Journey-তে...
          থাকেন... তাহলে... আপনি... কোনো না কোনো নতুন উপলব্ধি... নিয়েই ফিরবেন।
        </MText>

        <MText>
          এই Guarantee... আসলে... একটি Refund Policy নয়। এটি... আমাদের নিজেদের প্রতি...
          একটি দায়বদ্ধতা। যে... আমরা... প্রতিটি Webinar-কে... এমনভাবে প্রস্তুত করব... যাতে...
          এটি... আপনার সময়ের... যোগ্য হয়।
        </MText>

        <MText>
          আমরা... চাই না... আপনি... Risk নিয়ে আসুন। আমরা... চাই... Risk... আমরাই নিই। আপনার
          কাজ... শুধু... একটি কাজ। <strong>এসে দেখুন।</strong>
        </MText>

        <MSub>তবে... একটি ছোট অনুরোধ আছে।</MSub>
        <MText>
          এই প্রতিশ্রুতির উদ্দেশ্য... অপব্যবহার নয়। বরং... সৎভাবে... Experience করার সুযোগ
          দেওয়া। তাই... Refund-এর জন্য... আমাদের শুধু তিনটি বিষয় প্রয়োজন হবে।
        </MText>
        <MList
          items={[
            "আপনি সম্পূর্ণ Webinar-এ উপস্থিত ছিলেন।",
            "আপনি মনোযোগ দিয়ে পুরো Session সম্পন্ন করেছেন।",
            "Webinar শেষে নির্ধারিত Feedback Form সৎভাবে পূরণ করেছেন এবং জানিয়েছেন কেন এটি আপনার জন্য মূল্যবান হয়নি।",
          ]}
        />
        <MText>
          কারণ... আপনার Feedback... আমাদের কাছে... Refund-এর থেকেও... বেশি মূল্যবান। সেই
          Feedback-ই... আমাদের... পরবর্তী Webinar-কে... আরও উন্নত করতে সাহায্য করে।
        </MText>

        <MText>
          আমরা... একটি বিষয়... আপনার কাছে... প্রতিশ্রুতি দিচ্ছি। যদি... আপনি... সত্যিই মনে
          করেন... আমরা... আমাদের প্রতিশ্রুতি পূরণ করতে পারিনি... তাহলে... আমরাও... আমাদের
          দায়িত্ব পালন করব।
        </MText>
        <MText>
          কারণ... বিশ্বাস... দুই দিক থেকেই... রক্ষা করতে হয়। আপনি... আপনার সময়... আমাদের
          দিচ্ছেন। আমরা... আমাদের সততা... আপনাকে দিচ্ছি।
        </MText>

        <MQuote>
          সবচেয়ে বড় Risk... কী? ₹___ টাকার Registration Fee? নাকি... আরও কয়েক মাস... একই
          Confusion নিয়ে... এগিয়ে যাওয়া? আমরা... আপনার হয়ে... এই প্রশ্নের উত্তর দেব না।
          সিদ্ধান্ত... আপনার।
        </MQuote>

        <MText>
          তাই... আপনি... আজ... সম্পূর্ণ নিশ্চিন্তে... Registration করতে পারেন। কারণ... আপনি...
          কোনো অন্ধ প্রতিশ্রুতির উপর... ভরসা করছেন না। আপনি... একটি Experience-কে... নিজে
          যাচাই করার সুযোগ নিচ্ছেন।
        </MText>

        <MCards
          columns={2}
          items={[
            {
              title: "🛡️ Science of Stuck™ Promise",
              body: (
                <>
                  Attend the complete live webinar. Experience it with an open mind. If you
                  genuinely feel you gained no meaningful clarity, simply let us know through
                  the feedback form.
                  <br />
                  <strong>We&apos;ll refund 100% of your registration fee.</strong>
                  <br />
                  Because we want you to decide based on your experience, not our claims.
                </>
              ),
            },
          ]}
        />

        <MEmphasis>হ্যাঁ... সম্পূর্ণ নিশ্চিন্তে Science of Stuck™-এ যোগ দিতে চাই।</MEmphasis>
        <CTAButtons />
      </MSection>

      {/* Section 24: Why We Can Offer This Guarantee (Why Participation Stays Limited) */}
      <MSection tone="default">
        <MHeading>কেন... Science of Stuck™-এ অংশগ্রহণ সীমিত রাখা হয়?</MHeading>

        <MText>
          যদি... এটি... শুধু একটি Recorded Course হতো... তাহলে... হাজার হাজার মানুষ...
          একসঙ্গে... দেখতে পারতেন। কিন্তু... Science of Stuck™... সেরকম নয়।
        </MText>

        <MText>
          এটি... একটি Live Experience। যেখানে... আমরা চাই... প্রতিটি Parent... শুধু...
          শুনবেন না। ভাববেন। প্রশ্ন করবেন। নিজের Journey-র সঙ্গে... সংযোগ করবেন।
        </MText>

        <MText>
          তাই... আমরা... প্রতিটি Webinar-এ... Registration... সীমিত রাখি। কারণ... আমাদের
          কাছে... Quality... সবসময়... Quantity-এর আগে।
        </MText>

        <MText>
          আমরা চাই না... আপনি... আরও একটি Webinar Attend করুন। আমরা চাই... আপনি... একটি
          Meaningful Experience নিয়ে ফিরুন।
        </MText>

        <MSub>Live Session-এর... একটি বিশেষ শক্তি আছে।</MSub>
        <MText>
          আপনি জানেন... নির্দিষ্ট দিনে... নির্দিষ্ট সময়ে... আপনি... হাজারো Parent-এর সঙ্গে...
          একই প্রশ্ন... একই উপলব্ধি... একই Journey-এর অংশ হচ্ছেন। এই Shared Experience...
          অনেক সময়... Learning-কে... আরও গভীর করে তোলে।
        </MText>

        <MSub>আরেকটি কারণও আছে।</MSub>
        <MText>
          Science of Stuck™... কেবল... একটি Presentation নয়। এটি... বহু বছরের...
          পর্যবেক্ষণ... অভিজ্ঞতা... এবং... বাস্তব পরিবারগুলোর Journey... থেকে তৈরি। আমরা...
          প্রতিটি Batch-এর Feedback... খুব গুরুত্ব দিয়ে দেখি। নতুন প্রশ্ন... নতুন উপলব্ধি...
          নতুন Pattern... থাকলে... Webinar-টিকেও... নিয়মিত উন্নত করি। তাই... প্রতিটি Live
          Session... একটি Living Experience। স্থির নয়। ক্রমাগত উন্নত হচ্ছে।
        </MText>

        <MText>
          হয়তো... আপনি ভাবছেন... <strong>"আমি পরে করব।"</strong> অবশ্যই... সেটা... আপনার
          সিদ্ধান্ত। কিন্তু... নিজেকে... একটি প্রশ্ন করুন।
        </MText>

        <MQuote>
          গত কয়েক মাসে... কতবার... আপনি... নিজেকে বলেছেন... "আরও পরে..." আর... সেই "পরে"...
          কতবার... আসলে... এসেছে?
        </MQuote>

        <MText>
          আমরা... আপনাকে... চাপ দিতে চাই না। কিন্তু... একটি বাস্তব কথা বলতে চাই।
        </MText>

        <MText>
          Clarity... নিজে থেকে... একদিন... হঠাৎ আসে না। কেউ... সময় বের করে... থামে... শোনে...
          ভাবে... প্রশ্ন করে... তখনই... Clarity জন্ম নিতে শুরু করে।
        </MText>

        <MText>
          Science of Stuck™... হয়তো... আপনার সন্তানের Journey-র... সব প্রশ্নের উত্তর দেবে
          না। কিন্তু... এটি... হয়তো... সেই প্রশ্নগুলো... দেখতে শেখাবে... যেগুলো... এতদিন...
          আপনার চোখ এড়িয়ে গিয়েছিল।
        </MText>

        <MText>
          আর... যদি... আপনি... আজ... অংশগ্রহণ করার সিদ্ধান্ত নেন... তাহলে... আপনি... শুধু...
          একটি Seat বুক করছেন না। আপনি... নিজের জন্য... তিন ঘণ্টা... সচেতনভাবে...
          সংরক্ষণ করছেন। তিন ঘণ্টা... যেখানে... আপনি... প্রতিদিনের দৌড়ঝাঁপ থেকে... একটু
          থামবেন। শুধু... বুঝবেন। ভাববেন। এবং... নতুনভাবে দেখবেন।
        </MText>

        <MText>
          আমাদের অনুরোধ... Registration করবেন কি না... সেটা... আপনার সিদ্ধান্ত। কিন্তু...
          যদি... আপনি... মনে করেন... "একদিন বুঝব..." তাহলে... সেই "একদিন"... আজও হতে পারে।
        </MText>

        <MText>
          কারণ... একটি Journey... শুরু হয় না... যখন... সব উত্তর... পাওয়া যায়। একটি Journey...
          শুরু হয়... যখন... একটি সিদ্ধান্ত... নেওয়া হয়।
        </MText>

        <MText>
          আজ... আপনি... কোন সিদ্ধান্ত নেবেন... সেটা... শুধু... আপনার হাতেই। আমরা... শুধু...
          দরজাটা... খুলে রাখছি।
        </MText>

        <MEmphasis>হ্যাঁ... আমি আর "একদিন" অপেক্ষা করতে চাই না।</MEmphasis>
        <CTAButtons />
      </MSection>
    </>
  );
}
