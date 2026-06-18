import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Menu, MessageCircle } from "lucide-react";
import { useState } from "react";
import indLogo from "@/assets/ind-logo.png.asset.json";
import {
  FacebookIcon,
  InstagramIcon,
  YouTubeIcon,
  FACEBOOK_URL,
  INSTAGRAM_URL,
  YOUTUBE_URL,
} from "@/components/site/SocialIcons";

const WHATSAPP_URL = "https://wa.me/message/PZQJYUEGGXGZE1";

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
          <a
            href={FACEBOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit Institute of NeuroDevelopment on Facebook"
            className="grid h-8 w-8 place-items-center rounded-full bg-[#1877F2] text-white transition-transform hover:scale-110 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
          >
            <FacebookIcon className="h-4 w-4" />
          </a>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit Institute of NeuroDevelopment on Instagram"
            className="grid h-8 w-8 place-items-center rounded-full bg-[#E4405F] text-white transition-transform hover:scale-110 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
          >
            <InstagramIcon className="h-4 w-4" />
          </a>
          <a
            href={YOUTUBE_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit Institute of NeuroDevelopment on YouTube"
            className="grid h-8 w-8 place-items-center rounded-full bg-[#FF0000] text-white transition-transform hover:scale-110 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
          >
            <YouTubeIcon className="h-4 w-4" />
          </a>
          <Button asChild variant="outline" size="sm" className="rounded-full gap-1.5">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
          </Button>
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
              <div className="flex items-center gap-2">
                <a
                  href={FACEBOOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  aria-label="Visit Institute of NeuroDevelopment on Facebook"
                  className="grid h-8 w-8 place-items-center rounded-full bg-[#1877F2] text-white transition-transform hover:scale-110 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
                >
                  <FacebookIcon className="h-4 w-4" />
                </a>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  aria-label="Visit Institute of NeuroDevelopment on Instagram"
                  className="grid h-8 w-8 place-items-center rounded-full bg-[#E4405F] text-white transition-transform hover:scale-110 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
                >
                  <InstagramIcon className="h-4 w-4" />
                </a>
                <a
                  href={YOUTUBE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  aria-label="Visit Institute of NeuroDevelopment on YouTube"
                  className="grid h-8 w-8 place-items-center rounded-full bg-[#FF0000] text-white transition-transform hover:scale-110 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
                >
                  <YouTubeIcon className="h-4 w-4" />
                </a>
              </div>
              <Button asChild variant="outline" size="sm" className="gap-1.5">
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </a>
              </Button>
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
