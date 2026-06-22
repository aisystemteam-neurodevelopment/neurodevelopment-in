import type { ReactNode } from "react";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 text-center [&_form]:text-left [&_table]:text-left [&_input]:text-left [&_textarea]:text-left">{children}</main>
      <SiteFooter />
    </div>
  );
}
