import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { SiteLayout } from "./SiteLayout";

type NavItem = { to: string; label: string };

export function PortalShell({
  title,
  subtitle,
  nav,
  children,
}: {
  title: string;
  subtitle?: string;
  nav: NavItem[];
  children: ReactNode;
}) {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-7xl px-5 py-10">
        <header className="mb-6">
          <h1 className="font-display text-3xl text-foreground">{title}</h1>
          {subtitle ? (
            <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
          ) : null}
        </header>

        <div className="grid gap-8 md:grid-cols-[200px_1fr]">
          <aside className="md:sticky md:top-24 md:self-start">
            <nav className="flex flex-row gap-2 overflow-x-auto md:flex-col md:overflow-visible">
              {nav.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  className="whitespace-nowrap rounded-md border border-transparent px-3 py-2 text-sm text-muted-foreground transition-colors hover:border-border hover:bg-muted hover:text-foreground"
                  activeProps={{
                    className:
                      "whitespace-nowrap rounded-md border border-border bg-secondary px-3 py-2 text-sm text-foreground font-medium",
                  }}
                  activeOptions={{ exact: true }}
                >
                  {n.label}
                </Link>
              ))}
            </nav>
          </aside>

          <div>{children}</div>
        </div>
      </section>
    </SiteLayout>
  );
}
