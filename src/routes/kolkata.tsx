import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Clock, Mail, Calendar, ArrowRight, Check, Stethoscope, Brain, Baby, Speech, Activity } from "lucide-react";
import kolkataClinic from "@/assets/kolkata-clinic.jpg.asset.json";

export const Route = createFileRoute("/kolkata")({
  head: () => ({
    links: [{ rel: "canonical", href: "https://neurodevelopment.in/kolkata" }],
    meta: [
      { title: "Autism Treatment & Neurodevelopmental Clinic in Kolkata" },
      {
        name: "description",
        content:
          "Neurodevelopmental clinic in Kolkata for autism, ADHD, speech delay and learning challenges. Evaluation can start online, with in-person assessment at Sobhabazar, Kolkata 700005.",
      },
      { property: "og:title", content: "Autism Treatment & Neurodevelopmental Clinic in Kolkata" },
      {
        property: "og:description",
        content:
          "Neurodevelopmental clinic in Kolkata for autism, ADHD, speech delay and learning challenges. Evaluation can start online, with in-person assessment at Sobhabazar, Kolkata 700005.",
      },
      { property: "og:url", content: "https://neurodevelopment.in/kolkata" },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "en_IN" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Autism Treatment & Neurodevelopmental Clinic in Kolkata" },
      {
        name: "twitter:description",
        content:
          "Neurodevelopmental clinic in Kolkata for autism, ADHD, speech delay and learning challenges. Evaluation can start online, with in-person assessment at Sobhabazar, Kolkata 700005.",
      },
    ],



    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "MedicalBusiness",
          "@id": "https://neurodevelopment.in/kolkata#clinic",
          name: "Institute of NeuroDevelopment — Kolkata",
          description:
            "Neurodevelopmental clinic in Kolkata offering assessment and parent-led intervention for autism, ADHD, speech delay and learning challenges.",
          url: "https://neurodevelopment.in/kolkata",
          telephone: "+91-94333-08880",
          email: "instituteofneurodevelopment@gmail.com",
          image: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/e615845d-d5d6-4842-81de-7874761f4644",
          sameAs: [
            "https://www.facebook.com/NeuroDevelopment.in",
            "https://www.instagram.com/institute_of_neurodevelopment",
            "https://www.youtube.com/@IND_Bengali",
          ],

          address: {
            "@type": "PostalAddress",
            streetAddress: "26, Raja Nabakrishna Street, opposite Sobhabazar Rajbari",
            addressLocality: "Kolkata",
            postalCode: "700005",
            addressRegion: "West Bengal",
            addressCountry: "IN",
          },
          geo: { "@type": "GeoCoordinates", latitude: 22.5964906, longitude: 88.366761 },
          openingHoursSpecification: [
            { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "10:00", closes: "18:00" },
            { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "10:00", closes: "14:00" },
          ],
          medicalSpecialty: [
            { "@type": "MedicalSpecialty", name: "Neurodevelopmental paediatrics" },
            { "@type": "MedicalSpecialty", name: "Developmental-behavioural paediatrics" },
          ],
          makesOffer: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "MedicalService",
                name: "Autism & neurodevelopmental review",
                description: "Structured observation and parent interview to understand communication, regulation, play, and learning patterns.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "MedicalService",
                name: "Speech and communication mapping",
                description: "Assessment of receptive language, expressive speech, motor-speech patterns, and functional communication readiness.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "MedicalService",
                name: "ADHD & attention regulation check",
                description: "Screen for attention, impulse control, and executive function drivers with home and school context.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "MedicalService",
                name: "Developmental milestone tracking",
                description: "For children aged 18 months to 8 years with delays in daily living, social play, or school readiness.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "MedicalService",
                name: "School-readiness & learning screen",
                description: "Pre-academic skills, comprehension, visual-motor integration, and behaviour in structured settings.",
              },
            },
          ],
          priceRange: "₹₹",
          currenciesAccepted: "INR",
          hasMap: "https://maps.google.com/?q=22.5964906,88.366761",
          areaServed: { "@type": "City", name: "Kolkata" },

        }),
      },
    ],
  }),
  component: KolkataPage,
});

const assessments = [
  {
    icon: Brain,
    title: "Autism & neurodevelopmental review",
    description: "Structured observation and parent interview to understand communication, regulation, play, and learning patterns.",
  },
  {
    icon: Speech,
    title: "Speech and communication mapping",
    description: "Assessment of receptive language, expressive speech, motor-speech patterns, and functional communication readiness.",
  },
  {
    icon: Activity,
    title: "ADHD & attention regulation check",
    description: "Screen for attention, impulse control, and executive function drivers with home and school context.",
  },
  {
    icon: Baby,
    title: "Developmental milestone tracking",
    description: "For children aged 18 months to 8 years with delays in daily living, social play, or school readiness.",
  },
  {
    icon: Stethoscope,
    title: "School-readiness & learning screen",
    description: "Pre-academic skills, comprehension, visual-motor integration, and behaviour in structured settings.",
  },
];

const whatToExpect = [
  "A 45–60 minute in-person session with the child and parent(s)",
  "Review of prior reports, diagnoses, and current concerns",
  "Clear explanation of the developmental drivers we see",
  "A written next-step plan before you leave the clinic",
  "Online evaluation is available too — the Kolkata visit adds in-person clinical detail",
];

const fees = [
  { label: "Initial assessment", value: "₹2,500 – ₹3,500" },
  { label: "Follow-up consultation", value: "₹1,500 – ₹2,000" },
  { label: "Programme fee guidance", value: "Shared after assessment" },
];

const hours = [
  { day: "Monday – Friday", time: "10:00 AM – 6:00 PM" },
  { day: "Saturday", time: "10:00 AM – 2:00 PM" },
  { day: "Sunday", time: "Closed" },
];

function KolkataPage() {
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative overflow-hidden bg-secondary/40">
        <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3" /> Kolkata clinic
            </span>
            <h1 className="mt-5 font-display text-4xl leading-tight md:text-5xl">
              Autism treatment & neurodevelopmental clinic in <span className="text-primary">Kolkata</span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              For autism, ADHD, speech delay, and learning challenges. Evaluation can start online, with in-person assessment at Sobhabazar, Kolkata, and a clear parent-led plan.
            </p>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg" className="rounded-full px-6">
                <Link to="/contact">
                  Book an appointment <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full px-6">
                <a href="tel:+919433308880">
                  <Phone className="mr-1.5 h-4 w-4" /> +91 94333 08880
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Assessments */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <h2 className="text-center font-display text-3xl md:text-4xl">What we assess</h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">
          We do not replace a medical diagnosis. We identify the developmental drivers that are blocking your child's progress, so the home becomes the most powerful intervention space.
        </p>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {assessments.map((a) => (
            <div key={a.title} className="rounded-3xl border border-border bg-card p-6">
              <a.icon className="h-8 w-8 text-primary" />
              <h3 className="mt-4 font-display text-xl">{a.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{a.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What to expect + fees */}
      <section className="bg-secondary/40 py-16">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl">What to expect at the clinic</h2>
            <ul className="mt-5 space-y-3">
              {whatToExpect.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-border bg-card p-6">
            <h2 className="font-display text-3xl">Fee guidance</h2>
            <p className="mt-2 text-sm text-muted-foreground">Fees are payable at the clinic. We do not sell packages during the first visit.</p>
            <div className="mt-5 divide-y divide-border">
              {fees.map((f) => (
                <div key={f.label} className="flex items-center justify-between py-3">
                  <span className="text-sm text-muted-foreground">{f.label}</span>
                  <span className="font-display text-sm">{f.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Location + hours */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl">Clinic location</h2>
            <div className="mt-5 overflow-hidden rounded-3xl border border-border">
              <img
                src={kolkataClinic.url}
                alt="Warm, child-friendly consultation room at the Institute of NeuroDevelopment Kolkata clinic"
                width={1200}
                height={800}
                loading="lazy"
                className="h-56 w-full object-cover md:h-64"
              />
            </div>
            <div className="mt-5 rounded-3xl border border-border bg-card p-6">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <p className="font-display">Institute of NeuroDevelopment</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    26, Raja Nabakrishna Street<br />
                    opposite Sobhabazar Rajbari<br />
                    Kolkata, West Bengal 700005
                  </p>
                </div>
              </div>
              <div className="mt-4 flex items-start gap-3">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <a href="tel:+919433308880" className="text-sm hover:text-primary">+91 94333 08880</a>
              </div>
              <div className="mt-4 flex items-start gap-3">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <a href="mailto:instituteofneurodevelopment@gmail.com" className="break-all text-sm hover:text-primary">
                  instituteofneurodevelopment@gmail.com
                </a>
              </div>
            </div>
            <div className="mt-6">
              <h3 className="font-display text-xl flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" /> Clinic hours
              </h3>
              <ul className="mt-3 space-y-2 text-sm">
                {hours.map((h) => (
                  <li key={h.day} className="flex items-center justify-between rounded-xl border border-border bg-card px-4 py-2">
                    <span className="text-muted-foreground">{h.day}</span>
                    <span>{h.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="overflow-hidden rounded-3xl border border-border">
            <iframe
              title="Institute of NeuroDevelopment Kolkata location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3683.9390238392246!2d88.3641900747526!3d22.596490632533408!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a02762c4f8d2f5d%3A0x4e1d6e1b4d8e6e1b!2sSobhabazar%20Rajbari!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ minHeight: "400px", border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* Booking CTA */}
      <section className="mx-auto max-w-3xl px-5 py-16 text-center">
        <Calendar className="mx-auto h-10 w-10 text-primary" />
        <h2 className="mt-4 font-display text-3xl">Book an in-person assessment</h2>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          Appointments are limited. Choose your preferred slot and our team will confirm within one working day.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg" className="rounded-full px-8">
            <Link to="/contact">Request appointment</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-full px-8">
            <Link to="/services">See all services</Link>
          </Button>
        </div>
      </section>
    </SiteLayout>
  );
}
