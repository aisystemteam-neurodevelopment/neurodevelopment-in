import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Institute of NeuroDevelopment" },
      { name: "description", content: "How IND collects, uses and protects your information." },
      { property: "og:title", content: "Privacy Policy — IND" },
      { property: "og:description", content: "How IND collects, uses and protects your information." },
      { property: "og:type", content: "website" },
      { name: "robots", content: "index,follow" },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <SiteLayout>
      <article className="mx-auto max-w-3xl px-5 py-16">
        <h1 className="font-display text-5xl">Privacy Policy</h1>
        <p className="mt-3 text-sm text-muted-foreground">Last updated: 2026</p>

        <div className="prose prose-neutral mt-10 max-w-none text-foreground">
          <h2 className="font-display text-2xl">What we collect</h2>
          <p className="text-muted-foreground">
            When you contact us, book an appointment or use our assistant, we collect the
            information you choose to share — typically your name, email, phone number,
            your child&apos;s age and a short description of your concern. We do not
            collect financial information on this website.
          </p>

          <h2 className="mt-8 font-display text-2xl">How we use it</h2>
          <p className="text-muted-foreground">
            Your information is used solely to respond to your enquiry, schedule
            consultations, deliver the IND program if you choose to enrol, and improve
            the parent experience. We never sell or rent your data.
          </p>

          <h2 className="mt-8 font-display text-2xl">Who can see it</h2>
          <p className="text-muted-foreground">
            Only the IND clinical and care team. Where we use trusted third-party tools
            (e.g. our messaging system or scheduling sheet), they process data on our
            behalf under standard data-protection terms.
          </p>

          <h2 className="mt-8 font-display text-2xl">Children&apos;s data</h2>
          <p className="text-muted-foreground">
            Information about a child is shared by a parent or guardian. We treat it as
            sensitive health-related data and store it with strict access controls.
          </p>

          <h2 className="mt-8 font-display text-2xl">Your choices</h2>
          <p className="text-muted-foreground">
            You can ask us to update or delete your information at any time by emailing
            <a href="mailto:wecare@neurodevelopment.in" className="ml-1 underline">wecare@neurodevelopment.in</a>.
          </p>

          <h2 className="mt-8 font-display text-2xl">Cookies</h2>
          <p className="text-muted-foreground">
            We use minimal cookies for session management and basic analytics. No
            advertising trackers.
          </p>
        </div>
      </article>
    </SiteLayout>
  );
}
