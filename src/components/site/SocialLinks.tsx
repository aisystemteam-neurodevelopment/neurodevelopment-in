import { Facebook, Instagram, Youtube, MessageCircle } from "lucide-react";

const links = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/NeuroDevelopment.in",
    Icon: Facebook,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/institute_of_neurodevelopment",
    Icon: Instagram,
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@IND_Bengali",
    Icon: Youtube,
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/919433308880",
    Icon: MessageCircle,
  },
];

export function SocialLinks({
  className = "",
  size = "md",
}: {
  className?: string;
  size?: "sm" | "md";
}) {
  const dim = size === "sm" ? "h-9 w-9" : "h-10 w-10";
  const icon = size === "sm" ? "h-4 w-4" : "h-[18px] w-[18px]";
  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      {links.map(({ label, href, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          title={label}
          className={`${dim} grid place-items-center rounded-full border border-border bg-card text-muted-foreground transition hover:text-foreground hover:border-primary hover:bg-primary/5`}
        >
          <Icon className={icon} />
        </a>
      ))}
    </div>
  );
}