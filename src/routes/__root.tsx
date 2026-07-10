import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { AuthProvider } from "@/lib/auth-context";
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

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Institute of NeuroDevelopment — A Parent-Led NeuroDevelopment System" },
      {
        name: "description",
        content:
          "IND is not a therapy centre. It is a structured, parent-led neurodevelopment system that replaces fragmented intervention with measurable developmental progress. Founded by Dr. Diptanshu Das.",
      },
      { property: "og:title", content: "Institute of NeuroDevelopment — A Parent-Led NeuroDevelopment System" },
      {
        property: "og:description",
        content: "IND is not a therapy centre. It is a structured, parent-led neurodevelopment system that replaces fragmented intervention with measurable developmental progress. Founded by Dr. Diptanshu Das.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "Institute of NeuroDevelopment — A Parent-Led NeuroDevelopment System" },
      { name: "description", content: "IND is not a therapy centre. It is a structured, parent-led neurodevelopment system that replaces fragmented intervention with measurable developmental progress. Founded by Dr. Diptanshu Das." },
      { property: "og:description", content: "IND is not a therapy centre. It is a structured, parent-led neurodevelopment system that replaces fragmented intervention with measurable developmental progress. Founded by Dr. Diptanshu Das." },
      { name: "twitter:description", content: "IND is not a therapy centre. It is a structured, parent-led neurodevelopment system that replaces fragmented intervention with measurable developmental progress. Founded by Dr. Diptanshu Das." },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/e52d7742-ba0f-488f-bfbb-4d7d48f33674" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/e52d7742-ba0f-488f-bfbb-4d7d48f33674" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600&display=swap",
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
  return (
    <AuthProvider>
      <Outlet />
      <Toaster richColors position="top-center" />
      <LeadCapturePopup />
    </AuthProvider>
  );
}
