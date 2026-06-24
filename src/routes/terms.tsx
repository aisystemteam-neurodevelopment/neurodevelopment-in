import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Use — Institute of NeuroDevelopment" },
      { name: "description", content: "Terms governing use of the IND website and services." },
      { property: "og:title", content: "Terms of Use — IND" },
      { property: "og:description", content: "Terms governing use of the IND website and services." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <SiteLayout>
      <article className="mx-auto max-w-3xl px-5 py-16">
        <h1 className="font-display text-5xl">Terms of Use</h1>
        <p className="mt-3 text-sm text-muted-foreground">Last updated: 2026</p>

        <div className="prose prose-neutral mt-10 max-w-none text-foreground">
          <h2 className="font-display text-2xl">No medical advice</h2>
          <p className="text-muted-foreground">
            Content on this website is educational. It is not a substitute for medical
            evaluation, diagnosis or therapy. Always consult a qualified clinician for
            decisions about your child's care.
          </p>

          <h2 className="mt-8 font-display text-2xl">Honest expectations</h2>
          <p className="text-muted-foreground">
            We never guarantee outcomes. Anyone who guarantees specific developmental
            results is not being honest. We promise structure, clarity, and our full
            effort.
          </p>

          <h2 className="mt-8 font-display text-2xl">Use of the assistant</h2>
          <p className="text-muted-foreground">
            Our online assistant provides general guidance and helps connect you with our
            team. It does not diagnose, prescribe or replace clinical evaluation.
          </p>

          <h2 className="mt-8 font-display text-2xl">Intellectual property</h2>
          <p className="text-muted-foreground">
            All content, frameworks and program materials are the property of the
            Institute of NeuroDevelopment. Personal, non-commercial reading is welcome;
            redistribution requires permission.
          </p>

          <h2 className="mt-8 font-display text-2xl">Changes</h2>
          <p className="text-muted-foreground">
            We may update these terms as our services evolve. Continued use of the
            website indicates acceptance of the current version.
          </p>
        </div>
      </article>
    </SiteLayout>
  );
}
