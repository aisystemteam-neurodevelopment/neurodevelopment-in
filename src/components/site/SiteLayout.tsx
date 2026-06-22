import type { ReactNode } from "react";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 text-center [&_ul]:inline-block [&_ul]:text-left [&_ol]:inline-block [&_ol]:text-left [&_dl]:inline-block [&_dl]:text-left [&_form]:text-left [&_table]:text-left">{children}</main>
      <SiteFooter />
    </div>
  );
}
