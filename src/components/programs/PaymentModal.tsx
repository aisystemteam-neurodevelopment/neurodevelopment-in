import { useState, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Check, AlertTriangle, CreditCard, Wallet, ArrowRight, CalendarClock, Loader2, Download, PartyPopper } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { createRazorpayOrder, verifyRazorpayPayment } from "@/lib/payments.functions";
import { loadRazorpay } from "@/lib/razorpay";
import { generateReceiptPdf, type ReceiptOrder } from "@/lib/receiptPdf";

export type ProgramPayment = {
  programKey: string;
  name: string;
  tagline: string;
  priceINR: number;
  durationLabel: string;
  highlights: string[];
  /** Plain-language losses if NOT enrolled — loss-aversion framing */
  ifYouDoNotEnroll: string[];
};

type Props = {
  program: ProgramPayment | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const fmtINR = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

export function PaymentModal({ program, open, onOpenChange }: Props) {
  const [planType, setPlanType] = useState<"full" | "emi3" | "emi6">("full");
  const [method, setMethod] = useState<"upi" | "card" | "netbanking">("upi");
  const [buyerName, setBuyerName] = useState("");
  const [buyerEmail, setBuyerEmail] = useState("");
  const [buyerPhone, setBuyerPhone] = useState("");
  const [processing, setProcessing] = useState(false);
  const [paid, setPaid] = useState<ReceiptOrder | null>(null);

  const createOrder = useServerFn(createRazorpayOrder);
  const verifyPayment = useServerFn(verifyRazorpayPayment);

  const resetAndClose = (next: boolean) => {
    if (!next) {
      setPaid(null);
      setProcessing(false);
    }
    onOpenChange(next);
  };

  async function handlePay() {
    if (!program || !calc) return;
    if (!buyerName.trim() || !buyerEmail.trim() || !buyerPhone.trim()) {
      toast.error("Please fill in your name, email and phone.");
      return;
    }
    setProcessing(true);
    try {
      await loadRazorpay();
      const order = await createOrder({
        data: {
          programKey: program.programKey,
          programName: program.name,
          planType,
          baseAmount: calc.base,
          gstAmount: calc.gst,
          processingFee: calc.processingFee,
          totalAmount: calc.total,
          schedule: calc.schedule,
          buyerName: buyerName.trim(),
          buyerEmail: buyerEmail.trim(),
          buyerPhone: buyerPhone.trim(),
        },
      });

      const rzp = new window.Razorpay!({
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        name: "Institute of NeuroDevelopment",
        description: `${program.name} — ${
          planType === "full" ? "Pay in full" : planType === "emi3" ? "3-month plan" : "6-month plan"
        }`,
        order_id: order.razorpayOrderId,
        prefill: { name: buyerName, email: buyerEmail, contact: buyerPhone },
        theme: { color: "#0a0a0a" },
        notes: { program: program.programKey, plan: planType },
        modal: { ondismiss: () => setProcessing(false) },
        handler: async (resp) => {
          try {
            const r = resp as { razorpay_payment_id: string; razorpay_order_id: string; razorpay_signature: string };
            const { order: row } = await verifyPayment({
              data: {
                orderId: order.orderId,
                razorpayOrderId: r.razorpay_order_id,
                razorpayPaymentId: r.razorpay_payment_id,
                razorpaySignature: r.razorpay_signature,
              },
            });
            setPaid(row as ReceiptOrder);
            toast.success("Payment successful");
          } catch (e) {
            toast.error(e instanceof Error ? e.message : "Verification failed.");
          } finally {
            setProcessing(false);
          }
        },
      });
      rzp.open();
    } catch (e) {
      setProcessing(false);
      toast.error(e instanceof Error ? e.message : "Could not start checkout.");
    }
  }

  const calc = useMemo(() => {
    if (!program) return null;
    const base = program.priceINR;
    const gst = Math.round(base * 0.18);
    const subtotal = base + gst;

    if (planType === "full") {
      return {
        base,
        gst,
        subtotal,
        processingFee: 0,
        total: subtotal,
        installments: 1,
        perInstallment: subtotal,
        schedule: [{ n: 1, label: "Due today", amount: subtotal }],
      };
    }
    const months = planType === "emi3" ? 3 : 6;
    const emiRate = planType === "emi3" ? 0.02 : 0.04;
    const processingFee = Math.round(subtotal * emiRate);
    const total = subtotal + processingFee;
    const per = Math.round(total / months);
    // Adjust last installment to absorb rounding so the schedule sum === total
    const schedule = Array.from({ length: months }, (_, i) => {
      const due = new Date();
      due.setMonth(due.getMonth() + i);
      const amount = i === months - 1 ? total - per * (months - 1) : per;
      const label =
        i === 0
          ? "Due today"
          : due.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
      return { n: i + 1, label, amount };
    });
    return {
      base,
      gst,
      subtotal,
      processingFee,
      total,
      installments: months,
      perInstallment: per,
      schedule,
    };
  }, [program, planType]);

  if (!program || !calc) return null;

  // ===== Success / receipt view =====
  if (paid) {
    return (
      <Dialog open={open} onOpenChange={resetAndClose}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <Badge className="w-fit rounded-full bg-emerald-600 text-white hover:bg-emerald-600">
              Payment received
            </Badge>
            <DialogTitle className="font-display text-2xl flex items-center gap-2">
              <PartyPopper className="h-6 w-6 text-emerald-600" /> You're enrolled
            </DialogTitle>
            <DialogDescription>
              Thanks, {paid.buyer_name}. A confirmation will reach{" "}
              <span className="font-medium text-foreground">{paid.buyer_email}</span> shortly.
            </DialogDescription>
          </DialogHeader>

          <div className="rounded-2xl border border-border bg-muted/30 p-4 text-sm">
            <div className="flex justify-between py-1">
              <span className="text-muted-foreground">Program</span>
              <span className="font-medium">{paid.program_name}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-muted-foreground">Receipt #</span>
              <span className="font-mono">{paid.id.slice(0, 8).toUpperCase()}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-muted-foreground">Razorpay payment</span>
              <span className="font-mono text-xs">{paid.razorpay_payment_id}</span>
            </div>
            <div className="mt-2 flex items-baseline justify-between border-t border-border pt-2">
              <span className="font-medium">Amount paid</span>
              <span className="font-display text-2xl">{fmtINR(paid.total_amount)}</span>
            </div>
          </div>

          {paid.schedule.length > 1 && (
            <div className="rounded-2xl border border-border bg-card p-4 text-sm">
              <h4 className="text-xs uppercase tracking-wider text-muted-foreground">Your EMI schedule</h4>
              <ul className="mt-2 divide-y divide-border">
                {paid.schedule.map((r) => (
                  <li key={r.n} className="flex items-center justify-between py-2">
                    <span className="text-muted-foreground">#{r.n} · {r.label}</span>
                    <span className="font-medium tabular-nums">{fmtINR(r.amount)}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex flex-wrap gap-2 pt-2">
            <Button onClick={() => generateReceiptPdf(paid)} className="flex-1 rounded-full">
              <Download className="mr-1 h-4 w-4" /> Download PDF receipt
            </Button>
            <Button variant="outline" onClick={() => resetAndClose(false)} className="rounded-full">
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={resetAndClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <Badge className="w-fit rounded-full">Secure checkout</Badge>
          <DialogTitle className="font-display text-2xl">{program.name}</DialogTitle>
          <DialogDescription>{program.tagline}</DialogDescription>
        </DialogHeader>

        {/* Highlights */}
        <div className="rounded-2xl border border-border bg-card p-4">
          <h4 className="text-xs uppercase tracking-wider text-muted-foreground">What's included</h4>
          <ul className="mt-2 grid gap-1.5 text-sm">
            {program.highlights.map((h) => (
              <li key={h} className="flex items-start gap-2">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Payment plan */}
        <div>
          <h4 className="text-xs uppercase tracking-wider text-muted-foreground">Payment plan</h4>
          <RadioGroup
            value={planType}
            onValueChange={(v) => setPlanType(v as typeof planType)}
            className="mt-2 grid gap-2 sm:grid-cols-3"
          >
            {[
              { id: "full", label: "Pay in full", sub: "No extra fee" },
              { id: "emi3", label: "3-month plan", sub: "+2% processing" },
              { id: "emi6", label: "6-month plan", sub: "+4% processing" },
            ].map((opt) => (
              <Label
                key={opt.id}
                htmlFor={opt.id}
                className={`flex cursor-pointer items-start gap-2 rounded-xl border p-3 transition-all ${
                  planType === opt.id ? "border-primary bg-primary/5" : "border-border"
                }`}
              >
                <RadioGroupItem value={opt.id} id={opt.id} className="mt-0.5" />
                <div>
                  <div className="text-sm font-medium">{opt.label}</div>
                  <div className="text-xs text-muted-foreground">{opt.sub}</div>
                </div>
              </Label>
            ))}
          </RadioGroup>
        </div>

        {/* Payment method */}
        <div>
          <h4 className="text-xs uppercase tracking-wider text-muted-foreground">Payment method</h4>
          <RadioGroup
            value={method}
            onValueChange={(v) => setMethod(v as typeof method)}
            className="mt-2 grid gap-2 sm:grid-cols-3"
          >
            {[
              { id: "upi", label: "UPI", icon: Wallet },
              { id: "card", label: "Card", icon: CreditCard },
              { id: "netbanking", label: "Netbanking", icon: Wallet },
            ].map((opt) => {
              const Icon = opt.icon;
              return (
                <Label
                  key={opt.id}
                  htmlFor={`m-${opt.id}`}
                  className={`flex cursor-pointer items-center gap-2 rounded-xl border p-3 transition-all ${
                    method === opt.id ? "border-primary bg-primary/5" : "border-border"
                  }`}
                >
                  <RadioGroupItem value={opt.id} id={`m-${opt.id}`} />
                  <Icon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{opt.label}</span>
                </Label>
              );
            })}
          </RadioGroup>
        </div>

        {/* Calculation */}
        <div className="rounded-2xl border border-border bg-muted/30 p-4 text-sm">
          <div className="flex justify-between py-1">
            <span className="text-muted-foreground">Program fee</span>
            <span>{fmtINR(calc.base)}</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-muted-foreground">GST (18%)</span>
            <span>{fmtINR(calc.gst)}</span>
          </div>
          {calc.processingFee > 0 && (
            <div className="flex justify-between py-1">
              <span className="text-muted-foreground">EMI processing fee</span>
              <span>{fmtINR(calc.processingFee)}</span>
            </div>
          )}
          <div className="mt-2 flex items-baseline justify-between border-t border-border pt-2">
            <span className="font-medium">Total payable</span>
            <span className="font-display text-2xl">{fmtINR(calc.total)}</span>
          </div>
          {calc.installments > 1 && (
            <p className="mt-1 text-right text-xs text-muted-foreground">
              {calc.installments} × {fmtINR(calc.perInstallment)} / month
            </p>
          )}
          <p className="mt-1 text-right text-xs text-muted-foreground">
            Duration: {program.durationLabel}
          </p>
        </div>

        {/* EMI / payment schedule */}
        <div className="rounded-2xl border border-border bg-card p-4">
          <div className="flex items-center gap-2">
            <CalendarClock className="h-4 w-4 text-primary" />
            <h4 className="text-sm font-medium">
              {calc.installments > 1 ? "EMI schedule" : "Payment schedule"}
            </h4>
            <Badge variant="secondary" className="ml-auto rounded-full text-[10px]">
              {calc.installments} {calc.installments > 1 ? "installments" : "payment"}
            </Badge>
          </div>
          <ul className="mt-3 divide-y divide-border text-sm">
            {calc.schedule.map((row) => (
              <li key={row.n} className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-[11px] font-medium text-primary">
                    {row.n}
                  </span>
                  <span className="text-muted-foreground">{row.label}</span>
                </div>
                <span className="font-medium tabular-nums">{fmtINR(row.amount)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-2 flex items-center justify-between border-t border-border pt-2 text-xs text-muted-foreground">
            <span>Scheduled total</span>
            <span className="tabular-nums">{fmtINR(calc.total)}</span>
          </div>
        </div>


        {/* Loss aversion */}
        <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-destructive" />
            <h4 className="text-sm font-medium text-destructive">If you don't enroll now</h4>
          </div>
          <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
            {program.ifYouDoNotEnroll.map((line) => (
              <li key={line} className="flex items-start gap-2">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-destructive" />
                <span>{line}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-muted-foreground">
            We share this because the cost of waiting in a child's developmental
            window is real — not to pressure you.
          </p>
        </div>

        {/* Buyer details */}
        <div className="rounded-2xl border border-border bg-card p-4">
          <h4 className="text-xs uppercase tracking-wider text-muted-foreground">Your details</h4>
          <div className="mt-3 grid gap-2 sm:grid-cols-3">
            <Input
              placeholder="Full name"
              value={buyerName}
              onChange={(e) => setBuyerName(e.target.value)}
              maxLength={200}
            />
            <Input
              type="email"
              placeholder="Email"
              value={buyerEmail}
              onChange={(e) => setBuyerEmail(e.target.value)}
              maxLength={255}
            />
            <Input
              type="tel"
              placeholder="Phone (with country code)"
              value={buyerPhone}
              onChange={(e) => setBuyerPhone(e.target.value)}
              maxLength={20}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 pt-2">
          <Button onClick={handlePay} disabled={processing} className="flex-1 rounded-full">
            {processing ? (
              <>
                <Loader2 className="mr-1 h-4 w-4 animate-spin" /> Opening secure checkout…
              </>
            ) : (
              <>
                Pay {fmtINR(calc.total)} securely <ArrowRight className="ml-1 h-4 w-4" />
              </>
            )}
          </Button>
          <Button
            variant="outline"
            onClick={() => resetAndClose(false)}
            className="rounded-full"
            disabled={processing}
          >
            Cancel
          </Button>
        </div>
        <p className="text-center text-[11px] text-muted-foreground">
          Payments are processed by Razorpay (UPI, cards, netbanking, wallets).
          A PDF receipt is generated immediately after a successful payment.
        </p>
      </DialogContent>
    </Dialog>
  );
}
