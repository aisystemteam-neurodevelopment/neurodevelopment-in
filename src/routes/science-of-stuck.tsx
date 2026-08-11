import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Part1 } from "@/components/masterclass/Part1";
import { Part2 } from "@/components/masterclass/Part2";
import { Part3 } from "@/components/masterclass/Part3";
import { Part4 } from "@/components/masterclass/Part4";
import { Part5 } from "@/components/masterclass/Part5";

const title = "Science of Stuck™ — Live Masterclass for Parents";
const description =
  "কেন থেরাপি চললেও উন্নতি থেমে যায়? Science of Stuck™ — Dr. Diptanshu Das-এর ৩ ঘণ্টার live masterclass, autism ও ADHD-র বাবা-মায়েদের জন্য।";

export const Route = createFileRoute("/science-of-stuck")({
  head: () => ({
    links: [{ rel: "canonical", href: "https://neurodevelopment.in/science-of-stuck" }],
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Institute of NeuroDevelopment" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
  }),
  component: ScienceOfStuckPage,
});

function ScienceOfStuckPage() {
  return (
    <SiteLayout>
      <h1 className="sr-only">Science of Stuck — Live Masterclass by Institute of NeuroDevelopment</h1>
      <Part1 />
      <Part2 />
      <Part3 />
      <Part4 />
      <Part5 />
    </SiteLayout>
  );
}