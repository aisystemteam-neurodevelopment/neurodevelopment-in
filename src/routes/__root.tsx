import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { AuthProvider } from "@/lib/auth-context";
import { Toaster } from "@/components/ui/sonner";

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
      { title: "Institute of NeuroDevelopment" },
      {
        name: "description",
        content:
          "IND helps parents create real developmental progress in children through a structured, parent-led system. Founded by Dr. Diptanshu Das, Kolkata.",
      },
      { property: "og:title", content: "Institute of NeuroDevelopment" },
      {
        property: "og:description",
        content: "A parent-led neurodevelopment system. Structured guidance, daily action, real progress.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "Institute of NeuroDevelopment" },
      { name: "description", content: "Parent-led progress for your child" },
      { property: "og:description", content: "Parent-led progress for your child" },
      { name: "twitter:description", content: "Parent-led progress for your child" },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/d9111706-4d0b-44a5-9739-c24edd07e4d9/id-preview-06a26015--55b144ef-3179-4811-b5f3-5fc7beedd4db.lovable.app-1781778412885.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/d9111706-4d0b-44a5-9739-c24edd07e4d9/id-preview-06a26015--55b144ef-3179-4811-b5f3-5fc7beedd4db.lovable.app-1781778412885.png" },
    ],
    links: [
      { rel: "icon", type: "image/png", href: "/__l5e/assets-v1/ee3fbd46-c053-48d3-a2f5-bcb5d4bd286f/ind-favicon.png" },
      { rel: "apple-touch-icon", href: "/__l5e/assets-v1/ee3fbd46-c053-48d3-a2f5-bcb5d4bd286f/ind-favicon.png" },
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
    </AuthProvider>
  );
}
