import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { RoleGuard } from "@/components/site/RoleGuard";

export const Route = createFileRoute("/app/")({
  head: () => ({ meta: [{ title: "Staff Dashboard — IND" }] }),
  component: () => (
    <RoleGuard
      allow={["coordinator", "clinical_advisor", "sales", "content_manager", "admin"]}
      label="IND staff"
    >
      <Dash />
    </RoleGuard>
  ),
});

function Dash() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-5xl px-5 py-12">
        <h1 className="font-display text-4xl">Staff dashboard</h1>
        <p className="mt-2 text-muted-foreground">Internal tools for the IND team.</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <Link to="/app/leads" className="rounded-3xl border border-border bg-card p-6 hover:bg-muted">
            <div className="font-display text-xl">Leads</div>
            <div className="mt-1 text-sm text-muted-foreground">Parent inquiries from the AI chat and contact form.</div>
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
