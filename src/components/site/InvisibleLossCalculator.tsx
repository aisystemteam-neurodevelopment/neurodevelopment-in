import { useState } from "react";
import { Calculator, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

const FLIGHTPATH_CORE_INR = 120000; // 6-month structured pathway

function fmt(n: number) {
  return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(Math.round(n));
}

export function InvisibleLossCalculator() {
  const [hours, setHours] = useState(6); // hours/week across therapies
  const [fee, setFee] = useState(1200); // INR per session/hour
  const [months, setMonths] = useState(12);

  const weekly = hours * fee;
  const monthly = weekly * 4.33;
  const total = monthly * months;
  const gap = total - FLIGHTPATH_CORE_INR;

  return (
    <section className="mx-auto max-w-6xl px-5 py-20">
      <div className="rounded-3xl border border-border bg-card p-6 md:p-10">
        <div className="flex items-start gap-3">
          <Calculator className="mt-1 h-6 w-6 text-primary" />
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground">
              Interactive · The Invisible Loss
            </span>
            <h2 className="mt-3 font-display text-3xl md:text-4xl">
              See what fragmented intervention actually costs you
            </h2>
            <p className="mt-2 max-w-2xl text-muted-foreground">
              Enter your current weekly therapy load. Compare it to a single, structured
              Flightpath pathway. The bill is rarely the full story &mdash; but it&apos;s a start.
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="space-y-5 rounded-2xl border border-border bg-background p-6">
            <div>
              <label className="flex items-center justify-between text-sm font-medium">
                <span>Therapy hours per week</span>
                <span className="font-display text-primary">{hours} hrs</span>
              </label>
              <input
                type="range"
                min={1}
                max={20}
                value={hours}
                onChange={(e) => setHours(Number(e.target.value))}
                className="mt-2 w-full accent-[var(--primary)]"
              />
            </div>
            <div>
              <label className="flex items-center justify-between text-sm font-medium">
                <span>Average fee per session (₹)</span>
                <span className="font-display text-primary">₹{fmt(fee)}</span>
              </label>
              <input
                type="range"
                min={500}
                max={5000}
                step={100}
                value={fee}
                onChange={(e) => setFee(Number(e.target.value))}
                className="mt-2 w-full accent-[var(--primary)]"
              />
            </div>
            <div>
              <label className="flex items-center justify-between text-sm font-medium">
                <span>Time horizon</span>
                <span className="font-display text-primary">{months} months</span>
              </label>
              <input
                type="range"
                min={3}
                max={36}
                value={months}
                onChange={(e) => setMonths(Number(e.target.value))}
                className="mt-2 w-full accent-[var(--primary)]"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              This calculator estimates direct session cost only. It does not include travel,
              parent work hours, coordination overhead, or the developmental window itself.
            </p>
          </div>

          <div className="space-y-3">
            <div className="rounded-2xl border border-border bg-background p-5">
              <div className="text-xs uppercase tracking-wide text-muted-foreground">
                Fragmented intervention
              </div>
              <div className="mt-1 font-display text-3xl">₹{fmt(weekly)}<span className="text-base text-muted-foreground">/week</span></div>
              <div className="mt-1 text-sm text-muted-foreground">
                ≈ ₹{fmt(monthly)}/month &middot; over {months} months
              </div>
              <div className="mt-3 font-display text-4xl text-foreground">₹{fmt(total)}</div>
              <p className="mt-2 text-xs text-muted-foreground">
                Stacked, uncoordinated sessions with no single owner of the trajectory.
              </p>
            </div>

            <div className="rounded-2xl border-2 border-primary/40 bg-secondary/40 p-5">
              <div className="text-xs uppercase tracking-wide text-primary">
                Flightpath Core — structured pathway
              </div>
              <div className="mt-3 font-display text-4xl text-primary">₹{fmt(FLIGHTPATH_CORE_INR)}</div>
              <p className="mt-2 text-xs text-muted-foreground">
                One system, one architect, one sequenced plan. Parent-led, weekly drivers,
                measurable signals.
              </p>
            </div>

            {gap > 0 ? (
              <div className="rounded-2xl border border-border bg-card p-5">
                <div className="text-xs uppercase tracking-wide text-muted-foreground">
                  Potential structural saving
                </div>
                <div className="mt-1 font-display text-2xl text-primary">
                  ₹{fmt(gap)} <span className="text-sm text-muted-foreground">vs. fragmented spend</span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  Plus the harder-to-bill cost: time inside the developmental window.
                </p>
              </div>
            ) : (
              <div className="rounded-2xl border border-border bg-card p-5 text-sm text-muted-foreground">
                Even when the direct fees are similar, fragmented intervention rarely buys a
                sequenced trajectory. Flightpath does.
              </div>
            )}

            <Button asChild size="lg" className="mt-2 w-full rounded-full">
              <Link to="/programs">
                See Flightpath tiers <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
