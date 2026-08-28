import { useRouteContext, Outlet, Link, createRootRouteWithContext, HeadContent, Scripts } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";

interface RouterContext {
  queryClient: QueryClient;
}

import appCss from "../styles.css?url";
import { Toaster } from "@/components/ui/sonner";
import { LeadCapturePopup } from "@/components/site/LeadCapturePopup";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl text-foreground">404</h1>
        <h2 className="mt-4 font-display text-xl text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<RouterContext>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "google-site-verification", content: "eJQnNTJ8KRiMS4DPU2IgUW-4ltVlg_38zVQE2F7TQGU" },
      { title: "Institute of NeuroDevelopment — Parent-Led System" },
      {
        name: "description",
        content:
          "Not a therapy centre. A structured, parent-led neurodevelopment system replacing fragmented intervention with measurable progress.",
      },
      { property: "og:title", content: "Institute of NeuroDevelopment — Parent-Led System" },
      {
        property: "og:description",
        content: "A structured, parent-led neurodevelopment system replacing fragmented intervention with measurable progress.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "Institute of NeuroDevelopment — Parent-Led System" },
      { property: "og:site_name", content: "Institute of NeuroDevelopment" },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/e615845d-d5d6-4842-81de-7874761f4644" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/e615845d-d5d6-4842-81de-7874761f4644" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600&display=swap",
      },
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              "@id": "https://neurodevelopment.in/#organization",
              name: "Institute of NeuroDevelopment",
              url: "https://neurodevelopment.in",
              email: "instituteofneurodevelopment@gmail.com",
              telephone: "+91-94333-08880",
              founder: { "@type": "Person", name: "Dr. Diptanshu Das" },
              address: {
                "@type": "PostalAddress",
                streetAddress: "26, Raja Nabakrishna Street, opposite Sobhabazar Rajbari",
                addressLocality: "Kolkata",
                postalCode: "700005",
                addressRegion: "West Bengal",
                addressCountry: "IN",
              },
            },
            {
              "@type": "WebSite",
              "@id": "https://neurodevelopment.in/#website",
              url: "https://neurodevelopment.in",
              name: "Institute of NeuroDevelopment",
              publisher: { "@id": "https://neurodevelopment.in/#organization" },
            },
          ],
        }),
      },
      {
        async: true,
        src: "https://www.googletagmanager.com/gtag/js?id=G-L9QG2MGQ48",
      },
      {
        children:
          "window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-L9QG2MGQ48');",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const router = useRouter();
  return (
    <QueryClientProvider client={router.context.queryClient}>
      <Outlet />
      <Toaster richColors position="top-center" />
      <LeadCapturePopup />
    </QueryClientProvider>
  );
}
