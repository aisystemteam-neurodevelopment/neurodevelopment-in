import type { ReactNode } from "react";
import { Check, Quote as QuoteIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function MSection({
  id,
  tone = "default",
  children,
  className,
}: {
  id?: string;
  tone?: "default" | "muted" | "accent";
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        "px-5 py-16 md:py-24",
        tone === "muted" && "bg-card/40",
        tone === "accent" && "bg-primary/10",
        className,
      )}
    >
      <div className="mx-auto max-w-3xl text-center">{children}</div>
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">
      {children}
    </span>
  );
}

export function MHeading({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <h2 className={cn("mt-5 font-display text-3xl leading-tight md:text-4xl", className)}>
      {children}
    </h2>
  );
}

export function MSub({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <h3 className={cn("mt-8 font-display text-xl leading-snug text-primary md:text-2xl", className)}>
      {children}
    </h3>
  );
}

export function MText({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("mt-4 text-base leading-relaxed text-muted-foreground md:text-lg", className)}>
      {children}
    </p>
  );
}

export function MEmphasis({ children }: { children: ReactNode }) {
  return <p className="mt-6 font-display text-2xl leading-snug md:text-3xl">{children}</p>;
}

export function MQuote({ children }: { children: ReactNode }) {
  return (
    <blockquote className="mx-auto mt-6 max-w-2xl rounded-2xl border border-border bg-card px-6 py-5 text-lg leading-relaxed md:text-xl">
      <QuoteIcon className="mx-auto mb-3 h-5 w-5 text-primary" aria-hidden="true" />
      {children}
    </blockquote>
  );
}

export function MList({ items }: { items: ReactNode[] }) {
  return (
    <ul className="mx-auto mt-8 grid max-w-2xl gap-3 text-left">
      {items.map((item, i) => (
        <li
          key={i}
          className="flex items-start gap-3 rounded-xl border border-border bg-card px-4 py-3 leading-relaxed"
        >
          <Check className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function MCards({
  items,
  columns = 2,
}: {
  items: { title: ReactNode; body?: ReactNode }[];
  columns?: 2 | 3;
}) {
  return (
    <div
      className={cn(
        "mt-8 grid gap-4 text-left",
        columns === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3",
      )}
    >
      {items.map((item, i) => (
        <div key={i} className="rounded-2xl border border-border bg-card p-5">
          <p className="font-display text-lg leading-snug">{item.title}</p>
          {item.body ? (
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
          ) : null}
        </div>
      ))}
    </div>
  );
}

export function MStats({ items }: { items: { value: string; label: string }[] }) {
  return (
    <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <div key={item.label} className="rounded-2xl border border-border bg-card px-4 py-5">
          <p className="font-display text-2xl text-primary">{item.value}</p>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{item.label}</p>
        </div>
      ))}
    </div>
  );
}

export function MDivider() {
  return <div className="mx-auto mt-10 h-px w-24 bg-border" aria-hidden="true" />;
}