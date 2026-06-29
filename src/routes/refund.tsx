import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { FileText, Mail, Phone, Clock, AlertCircle, ShieldCheck } from "lucide-react";
import { RefundRequestForm } from "@/components/site/RefundRequestForm";

export const Route = createFileRoute("/refund")({
  head: () => ({
    meta: [
      { title: "Refund & Cancellation Policy — IND" },
      { name: "description", content: "How refunds and cancellations work for IND counselling and programmes." },
      { property: "og:title", content: "Refund & Cancellation Policy — IND" },
      { property: "og:description", content: "How refunds and cancellations work for IND counselling and programmes." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: RefundPage,
});

function RefundPage() {
  return (
    <SiteLayout>
      <div className="refund-page" data-no-center>
        <article className="mx-auto max-w-3xl px-5 py-16">
          <header className="mb-10 border-b border-border pb-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              <FileText className="h-3.5 w-3.5" />
              <span>Legal Policy</span>
            </div>
            <h1 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">
              Refund &amp; Cancellation Policy
            </h1>
            <p className="mt-3 text-sm text-muted-foreground">
              Effective Date: 2nd May, 2026
            </p>
            <p className="mt-4 text-muted-foreground">
              This Refund Policy governs payments made to the Institute of NeuroDevelopment through
              neurodevelopment.in, payment gateways, direct transfers, links, invoices, or any officially
              authorized channel. By enrolling in any webinar, course, counselling, bootcamp, programme,
              membership, or service, the participant agrees to this Refund Policy.
            </p>
          </header>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl border border-border bg-card/60 p-5">
              <Clock className="h-5 w-5 text-primary" />
              <h3 className="mt-3 font-display text-base">Processing Time</h3>
              <p className="mt-1 text-sm text-muted-foreground">7 to 30 business days after approval, depending on banking and verification.</p>
            </div>
            <div className="rounded-xl border border-border bg-card/60 p-5">
              <AlertCircle className="h-5 w-5 text-primary" />
              <h3 className="mt-3 font-display text-base">Default Rule</h3>
              <p className="mt-1 text-sm text-muted-foreground">All payments are non-refundable by default unless otherwise stated in writing.</p>
            </div>
            <div className="rounded-xl border border-border bg-card/60 p-5 sm:col-span-2 lg:col-span-1">
              <ShieldCheck className="h-5 w-5 text-primary" />
              <h3 className="mt-3 font-display text-base">Final Authority</h3>
              <p className="mt-1 text-sm text-muted-foreground">The Institute reserves the right to interpret eligibility and make the final decision.</p>
            </div>
          </div>

          <div className="prose prose-neutral mt-12 max-w-none text-foreground">
            <h2 className="font-display text-2xl">1. General Policy</h2>

            <h3 className="mt-6 font-display text-lg">1.1 Default No-Refund Rule</h3>
            <p className="text-muted-foreground">
              All payments made to the Institute of NeuroDevelopment are <strong>non-refundable by default</strong>,
              unless a specific programme, service, or written offer expressly states otherwise.
            </p>

            <h3 className="mt-6 font-display text-lg">1.2 Limited Exceptions</h3>
            <p className="text-muted-foreground">
              Refunds, if any, shall only be considered where a programme-specific refund clause exists in
              this policy or where the Institute has explicitly agreed in writing.
            </p>

            <h3 className="mt-6 font-display text-lg">1.3 Non-Refundable Charges</h3>
            <p className="text-muted-foreground">The following are ordinarily non-refundable:</p>
            <ul className="mt-2 list-disc pl-6 text-muted-foreground">
              <li>Registration fees</li>
              <li>Processing fees</li>
              <li>Gateway charges</li>
              <li>Taxes or statutory levies already remitted</li>
              <li>Administrative charges</li>
              <li>Counselling fees already utilized</li>
              <li>Downloaded or accessed digital content</li>
              <li>Delivered sessions, attended classes, consumed programme days, or utilized services</li>
              <li>Bonuses, gifts, add-ons, or complimentary benefits already delivered or accessed</li>
            </ul>

            <h3 className="mt-6 font-display text-lg">1.4 Untraceable / Unverifiable Payments</h3>
            <p className="text-muted-foreground">
              Payments that cannot be verified due to missing records, failed references, third-party errors,
              incomplete transaction proof, chargeback complications, or inability to establish receipt may
              not be eligible for refund until verification is completed.
            </p>

            <h3 className="mt-6 font-display text-lg">1.5 Method of Refund</h3>
            <p className="text-muted-foreground">
              Approved refunds shall ordinarily be processed through the original payment mode or any
              reasonable lawful mode determined by the Institute.
            </p>

            <h3 className="mt-6 font-display text-lg">1.6 Processing Time</h3>
            <p className="text-muted-foreground">
              Approved refunds may take <strong>7 to 30 business days</strong>, depending on banking systems,
              payment gateways, verification, and administrative review.
            </p>

            <h2 className="mt-10 font-display text-2xl">2. How to Request a Refund</h2>
            <p className="text-muted-foreground">
              Unless a programme specifically requires a separate form link, refund requests must be submitted by email to{" "}
              <a href="mailto:instituteofneurodevelopment@gmail.com" className="underline">instituteofneurodevelopment@gmail.com</a>,{" "}
              or through the official refund request form below.
            </p>
            <div className="mt-6">
              <RefundRequestForm />
            </div>
            <p className="mt-3 text-muted-foreground">Incomplete requests may be delayed or rejected.</p>

            <h2 className="mt-10 font-display text-2xl">3. Programme-Specific Refund Terms</h2>

            <h3 className="mt-6 font-display text-lg">3.1 Science of Stuck Webinar</h3>
            <p className="text-muted-foreground"><strong>100% Refund Eligibility (Conditional)</strong> — Participants who sign up under an offer carrying a 100% refund commitment may be eligible, subject to compliance with all stated conditions.</p>
            <p className="mt-3 text-muted-foreground"><strong>Conditions to Claim.</strong> The participant must:</p>
            <ol className="mt-2 list-decimal pl-6 text-muted-foreground">
              <li>Submit a written request to instituteofneurodevelopment@gmail.com</li>
              <li>Attach payment proof and transaction details</li>
              <li>Clearly explain the issue or grounds for refund</li>
              <li>Submit within the timeline stated during the offer, webinar page, or onboarding communication</li>
              <li>Comply with any attendance, participation, or action requirements stated at the time of enrollment</li>
            </ol>
            <p className="mt-3 text-muted-foreground"><strong>Exclusions.</strong> Refund may be denied where:</p>
            <ul className="mt-2 list-disc pl-6 text-muted-foreground">
              <li>Fraudulent claims are suspected</li>
              <li>Bonus materials were accessed and non-separable in value</li>
              <li>False information was provided</li>
              <li>Chargeback initiated before internal resolution</li>
              <li>Terms of the specific offer were not met</li>
            </ul>

            <h3 className="mt-6 font-display text-lg">3.2 Blocks to Breakthroughs</h3>
            <p className="text-muted-foreground"><strong>100% Refund Eligibility (Performance-Based Conditional Refund)</strong> — A participant may be eligible for a 100% refund only after completion of the full six (6) weeks of coursework and after all required submissions have been completed.</p>
            <p className="mt-3 text-muted-foreground"><strong>Mandatory Conditions.</strong> The participant must:</p>
            <ol className="mt-2 list-decimal pl-6 text-muted-foreground">
              <li>Complete all six weeks of coursework in full</li>
              <li>Attend or consume all mandatory learning modules, sessions, assignments, and tasks</li>
              <li>Complete all requirements for Breakthrough Blueprint as prescribed</li>
              <li>Submit the required questions / review / compliance details through the stipulated official form link shared by the Institute</li>
              <li>Apply only after completion of all requirements</li>
            </ol>
            <p className="mt-3 text-muted-foreground"><strong>Not Allowed Before Completion.</strong> No refund request shall be entertained midway through the six-week period, before all coursework is completed, before required tasks are fulfilled, or before stipulated form submission.</p>
            <p className="mt-3 text-muted-foreground"><strong>Institute Review.</strong> The Institute reserves the right to verify completion records, participation logs, assignment submissions, attendance, and compliance before approval.</p>

            <h3 className="mt-6 font-display text-lg">3.3 Breakthrough Blueprint Recordings</h3>
            <p className="text-muted-foreground"><strong>No Refund if Recordings Accessed.</strong> If a participant or parent has viewed, downloaded, accessed, or shared any Breakthrough Blueprint recording or replay, the refund request will not be accepted. Recordings are treated as delivered digital content from the moment they are accessed.</p>

            <h3 className="mt-6 font-display text-lg">3.4 Breakthrough Blueprint (2-Day Bootcamp)</h3>
            <p className="text-muted-foreground"><strong>Conditional Refund After Day 1 Attendance.</strong> If a participant attends Day 1 of the 2-day programme and wishes to claim an eligible refund under the applicable offer terms, the claim must be made on the same Day 1, <strong>no later than 10:00 p.m. India Standard Time (IST)</strong>.</p>
            <p className="mt-3 text-muted-foreground"><strong>How to Apply.</strong> Through the stipulated official refund form link, or by email to instituteofneurodevelopment@gmail.com.</p>
            <p className="mt-3 text-muted-foreground"><strong>Required Details:</strong> Full name, registered mobile number, proof of payment, programme batch/date, reason for request.</p>
            <p className="mt-3 text-muted-foreground"><strong>Late Requests.</strong> Requests made after 10:00 p.m. IST on Day 1 may be rejected. Once Day 2 begins, refund claims may not be entertained unless required by law.</p>

            <h3 className="mt-6 font-display text-lg">3.5 Breakthrough Flightpath</h3>
            <p className="text-muted-foreground"><strong>Voluntary Exit Refund Policy.</strong> Participants who choose to discontinue may apply for an exit settlement after completion of one full month from joining, and not within the first month. Joining date means the official onboarding / programme start date communicated by the Institute. No voluntary exit refund request can be processed within the first 30 days.</p>
            <p className="mt-3 text-muted-foreground"><strong>Refund Calculation.</strong> If approved, the balance amount may be refunded after deducting charges on a pro rata basis, including but not limited to: time enrolled, sessions attended, coaching utilized, resources unlocked, counselling sessions taken, team support consumed, bonuses delivered, and administrative costs.</p>
            <p className="mt-3 text-muted-foreground"><strong>Application Method.</strong> Through the stipulated official form link provided by the Institute.</p>
            <p className="mt-3 text-muted-foreground"><strong>Processing.</strong> The Institute may require settlement discussions, verification, dues clearance, and account reconciliation before payout.</p>

            <h2 className="mt-10 font-display text-2xl">4. Bonuses, Gifts, Add-ons, Discounts, Offers</h2>
            <p className="text-muted-foreground"><strong>4.1 Bonuses Already Delivered.</strong> If bonuses, add-on resources, counselling sessions, templates, assessments, recordings, private groups, extra sessions, or any additional benefits have already been delivered, accessed, or availed, refund may become inapplicable, or the fair value / listed value of such benefits may be deducted from the refund.</p>
            <p className="mt-3 text-muted-foreground"><strong>4.2 Promotional Offers.</strong> Where a participant joined using combo offers, scholarships, conditional discounts, fast-action bonuses, bundle pricing, installment concessions, upgrades, or limited-period offers, those benefits may be withdrawn, recalculated, or adjusted if a refund is requested.</p>
            <p className="mt-3 text-muted-foreground"><strong>4.3 Cross-Programme Benefits.</strong> If enrollment in one programme unlocked benefits in another programme, those values may also be considered while calculating refund.</p>

            <h2 className="mt-10 font-display text-2xl">5. Chargebacks and Payment Disputes</h2>
            <p className="text-muted-foreground">Initiating a chargeback or payment dispute without first contacting the Institute for resolution may result in suspension of access, withholding of certificates/materials, denial of future enrollment, and submission of supporting records to payment processors.</p>

            <h2 className="mt-10 font-display text-2xl">6. Misconduct / Policy Violations</h2>
            <p className="text-muted-foreground">No refund shall be due where removal or suspension occurs due to abuse of staff or community members, disruptive conduct, harassment, unauthorized sharing of content, piracy / copying / redistribution, misrepresentation, or violation of programme rules.</p>

            <h2 className="mt-10 font-display text-2xl">7. Force Majeure</h2>
            <p className="text-muted-foreground">Refunds shall not automatically arise due to delays, rescheduling, or interruptions caused by events beyond reasonable control, including natural disasters, pandemic situations, internet outages, government restrictions, platform failures, medical emergencies, or civil disruptions. Reasonable alternatives such as rescheduling, credits, recordings, substitutes, or extensions may be offered.</p>

            <h2 className="mt-10 font-display text-2xl">8. Final Decision</h2>
            <p className="text-muted-foreground">The Institute reserves the right to interpret eligibility, verify facts, request evidence, calculate deductions, and make the final decision on refund claims, subject to applicable law.</p>

            <h2 className="mt-10 font-display text-2xl">9. Contact</h2>
            <p className="text-muted-foreground">
              For refund matters, write to{" "}
              <a href="mailto:instituteofneurodevelopment@gmail.com" className="underline">instituteofneurodevelopment@gmail.com</a>{" "}
              or call{" "}
              <a href="tel:+919433308880" className="underline">+91 94333 08880</a>.
            </p>

            <h2 className="mt-10 font-display text-2xl">10. Important Note</h2>
            <p className="text-muted-foreground">By making payment to any programme of the Institute of NeuroDevelopment, the participant confirms that they have read, understood, and accepted this Refund Policy.</p>
          </div>

          <div className="mt-12 rounded-xl border border-border bg-card/60 p-6">
            <h3 className="font-display text-lg">Need help with a refund?</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Our support team is available to answer questions about eligibility, documentation, and timelines.
            </p>
            <div className="mt-4 flex flex-wrap gap-4">
              <a
                href="mailto:instituteofneurodevelopment@gmail.com"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                <Mail className="h-4 w-4" />
                Email support
              </a>
              <a
                href="tel:+919433308880"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-card/80"
              >
                <Phone className="h-4 w-4" />
                +91 94333 08880
              </a>
            </div>
          </div>
        </article>
      </div>
    </SiteLayout>
  );
}

