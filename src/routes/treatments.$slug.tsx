import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { getTreatment, TREATMENTS, type Treatment } from "@/data/treatments";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/treatments/$slug")({
  loader: ({ params }) => {
    const t = getTreatment(params.slug);
    if (!t) throw notFound();
    return { treatment: t };
  },
  head: ({ params, loaderData }) => {
    const t = loaderData?.treatment;
    const title = t ? `${t.title} — Institute of NeuroDevelopment` : "Treatment — IND";
    const desc = t?.short ?? "Concise overview of how IND helps families.";
    const url = `https://neurodevelopment.in/treatments/${params.slug}`;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: desc },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: t?.title ?? "Treatment",
            description: desc,
            url,
            areaServed: "IN",
            provider: {
              "@type": "Organization",
              name: "Institute of NeuroDevelopment",
              url: "https://neurodevelopment.in",
            },
          }),
        },
      ],
    };
  },
  component: TreatmentPage,
  notFoundComponent: () => (
    <SiteLayout>
      <section className="mx-auto max-w-2xl px-5 py-24 text-center">
        <h1 className="font-display text-4xl">Treatment not found</h1>
        <p className="mt-3 text-muted-foreground">
          That page doesn't exist. Browse what we help with.
        </p>
        <div className="mt-6">
          <Button asChild className="rounded-full">
            <Link to="/services">See all areas</Link>
          </Button>
        </div>
      </section>
    </SiteLayout>
  ),
  errorComponent: ({ error }) => (
    <SiteLayout>
      <section className="mx-auto max-w-2xl px-5 py-24 text-center">
        <h1 className="font-display text-3xl">Something went wrong</h1>
        <p className="mt-3 text-sm text-muted-foreground">{error.message}</p>
      </section>
    </SiteLayout>
  ),
});

function TreatmentPage() {
  const { treatment: t } = Route.useLoaderData() as { treatment: Treatment };
  const others = TREATMENTS.filter((x) => x.slug !== t.slug).slice(0, 4);

  return (
    <SiteLayout>
      <section className="mx-auto max-w-3xl px-5 pt-16 pb-6">
        <Link to="/services" className="text-sm text-muted-foreground hover:text-foreground">
          ← All areas we help with
        </Link>
        <h1 className="mt-4 font-display text-5xl">{t.title}</h1>
        <p className="mt-4 text-lg text-muted-foreground">{t.short}</p>
      </section>

      <section className="mx-auto grid max-w-5xl gap-6 px-5 py-10 md:grid-cols-3">
        <div className="rounded-3xl border border-border bg-card p-6">
          <h2 className="font-display text-xl">Signs we hear about</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {t.signs.map((s) => (
              <li key={s} className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <span className="text-muted-foreground">{s}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl border border-border bg-card p-6">
          <h2 className="font-display text-xl">What we work on</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {t.drivers.map((d) => (
              <li key={d} className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <span className="text-muted-foreground">{d}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl border border-border bg-card p-6">
          <h2 className="font-display text-xl">Outcomes families pursue</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {t.outcomes.map((o) => (
              <li key={o} className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span className="text-muted-foreground">{o}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-10 text-center">
        <h2 className="font-display text-3xl">Tell us about your child</h2>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          A short conversation is the fastest way to know if our system is the right fit.
          Evaluation can start online, and we never push.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg" className="rounded-full px-8">
            <Link to="/contact">Book an appointment</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="rounded-full px-8">
            <Link to="/chat">Talk to our assistant</Link>
          </Button>
        </div>
      </section>

      <section className="bg-secondary/40 py-14">
        <div className="mx-auto max-w-5xl px-5">
          <h2 className="font-display text-2xl">Other areas we help with</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((o) => (
              <Link
                key={o.slug}
                to="/treatments/$slug"
                params={{ slug: o.slug }}
                className="group flex items-center justify-between rounded-2xl border border-border bg-background px-4 py-3 text-sm hover:bg-card"
              >
                <span>{o.title}</span>
                <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
