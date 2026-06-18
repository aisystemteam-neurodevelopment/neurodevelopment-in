import { Link } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";
import indLogo from "@/assets/ind-logo.asset.json";

const nav = [
  { to: "/", label: "Home" },
  { to: "/approach", label: "Approach" },
  { to: "/services", label: "Services" },
  { to: "/programs", label: "Programs" },
  { to: "/about", label: "About" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const { user, portalPath, signOut } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link to="/" className="flex items-center gap-2">
          <img
            src={indLogo.url}
            alt="Institute of NeuroDevelopment"
            className="h-9 w-9 rounded-full object-cover"
          />
          <span className="font-display text-lg leading-none">
            Institute of <span className="text-primary">NeuroDevelopment</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground font-medium" }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          {user && (
            <>
              <Button asChild variant="ghost" size="sm">
                <Link to="/profile">Profile</Link>
              </Button>
              <Button asChild variant="outline" size="sm" className="rounded-full">
                <Link to={portalPath}>Portal</Link>
              </Button>
              <Button variant="ghost" size="sm" onClick={() => signOut()}>Sign out</Button>
            </>
          )}
          {!user && (
            <Button asChild variant="ghost" size="sm">
              <Link to="/auth">Sign in</Link>
            </Button>
          )}
          <Button asChild size="sm" className="rounded-full px-5">
            <Link to="/contact">Book appointment</Link>
          </Button>
        </div>

        <button
          className="grid h-9 w-9 place-items-center rounded-md border border-border md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <Menu className="h-4 w-4" />
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-3">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="rounded px-2 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                activeProps={{ className: "text-foreground font-medium bg-muted" }}
                activeOptions={{ exact: n.to === "/" }}
              >
                {n.label}
              </Link>
            ))}
            <div className="mt-2 flex flex-col gap-2 border-t border-border pt-3">
              {user && (
                <>
                  <Button asChild variant="outline" size="sm">
                    <Link to="/profile" onClick={() => setOpen(false)}>Profile</Link>
                  </Button>
                  <Button asChild variant="outline" size="sm">
                    <Link to={portalPath} onClick={() => setOpen(false)}>Open portal</Link>
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => { setOpen(false); signOut(); }}>Sign out</Button>
                </>
              )}
              {!user && (
                <Button asChild variant="outline" size="sm">
                  <Link to="/auth" onClick={() => setOpen(false)}>Sign in</Link>
                </Button>
              )}
              <Button asChild size="sm" className="rounded-full">
                <Link to="/contact" onClick={() => setOpen(false)}>Book appointment</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
