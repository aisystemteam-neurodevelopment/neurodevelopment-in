import { Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin } from "lucide-react";
import indLogo from "@/assets/ind-logo.png.asset.json";
import {
  FacebookIcon,
  InstagramIcon,
  YouTubeIcon,
  FACEBOOK_URL,
  INSTAGRAM_URL,
  YOUTUBE_URL,
} from "@/components/site/SocialIcons";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card/50">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <img
              src={indLogo.url}
              alt="Institute of NeuroDevelopment"
              className="h-9 w-9 rounded-full object-cover"
            />
            <span className="font-display text-lg leading-none">
              Institute of <span className="text-primary">NeuroDevelopment</span>
            </span>
          </div>
          <p className="mt-4 max-w-md text-sm text-muted-foreground">
            A parent-led neurodevelopment system. Founded by Dr. Diptanshu Das in 2020.
            10,000+ families served across 10+ countries.
          </p>
        </div>

        <div>
          <div className="font-display text-sm">Explore</div>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/approach" className="hover:text-foreground">Our approach</Link></li>
            <li><Link to="/services" className="hover:text-foreground">What we help with</Link></li>
            <li><Link to="/about" className="hover:text-foreground">About Dr. Das</Link></li>
            <li><Link to="/faq" className="hover:text-foreground">FAQ</Link></li>
            <li><Link to="/chat" className="hover:text-foreground">Talk to our assistant</Link></li>
          </ul>
        </div>

        <div>
          <div className="font-display text-sm">Reach us</div>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <Phone className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              <a href="tel:+919433308880" className="hover:text-foreground">+91 94333 08880</a>
            </li>
            <li className="flex items-start gap-2">
              <Mail className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              <a href="mailto:instituteofneurodevelopment@gmail.com" className="hover:text-foreground break-all">
                instituteofneurodevelopment@gmail.com
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              <span>26, Raja Nabakrishna Street,<br/>opposite Sobhabazar Rajbari,<br/>Kolkata 700005</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 py-5 text-xs text-muted-foreground sm:flex-row">
          <span>© {new Date().getFullYear()} Institute of NeuroDevelopment</span>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/privacy" className="hover:text-foreground">Privacy</Link>
            <Link to="/terms" className="hover:text-foreground">Terms</Link>
            <Link to="/refund" className="hover:text-foreground">Refund</Link>
            <span>Kolkata · India</span>
          </div>
          <div className="flex items-center gap-2">
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
          </div>
        </div>
      </div>
    </footer>
  );
}
