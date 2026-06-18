import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/refund")({
  head: () => ({
    meta: [
      { title: "Refund & Cancellation Policy — IND" },
      { name: "description", content: "How refunds and cancellations work for IND consultations and programs." },
      { property: "og:title", content: "Refund & Cancellation Policy — IND" },
      { property: "og:description", content: "How refunds and cancellations work for IND consultations and programs." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: RefundPage,
});

function RefundPage() {
  return (
    <SiteLayout>
      <article className="mx-auto max-w-3xl px-5 py-16">
        <h1 className="font-display text-5xl">Refund &amp; Cancellation</h1>
        <p className="mt-3 text-sm text-muted-foreground">Last updated: 2026</p>

        <div className="prose prose-neutral mt-10 max-w-none text-foreground">
          <h2 className="font-display text-2xl">Consultations</h2>
          <p className="text-muted-foreground">
            Consultation fees, once a session is booked, are non-refundable. You may
            reschedule once at no cost if you let our team know at least 24 hours before
            the scheduled time.
          </p>

          <h2 className="mt-8 font-display text-2xl">Program enrolment</h2>
          <p className="text-muted-foreground">
            Program fees are evaluated case-by-case based on the child&apos;s plan. Any
            refund or partial credit is decided by the clinical team in writing, in line
            with the agreement signed at enrolment.
          </p>

          <h2 className="mt-8 font-display text-2xl">No-show and late arrivals</h2>
          <p className="text-muted-foreground">
            If you miss a session without notice, the session is considered delivered.
            For online sessions, please join within 10 minutes of the scheduled time.
          </p>

          <h2 className="mt-8 font-display text-2xl">How to reach us</h2>
          <p className="text-muted-foreground">
            For any refund or rescheduling request, write to
            <a href="mailto:instituteofneurodevelopment@gmail.com" className="ml-1 underline">instituteofneurodevelopment@gmail.com</a>
            {" "}or call <a href="tel:+919433308880" className="underline">+91 94333 08880</a>.
          </p>
        </div>
      </article>
    </SiteLayout>
  );
}
