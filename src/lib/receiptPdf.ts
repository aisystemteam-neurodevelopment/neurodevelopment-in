import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export type ReceiptOrder = {
  id: string;
  program_name: string;
  plan_type: "full" | "emi3" | "emi6";
  base_amount: number;
  gst_amount: number;
  processing_fee: number;
  total_amount: number;
  schedule: Array<{ n: number; label: string; amount: number }>;
  buyer_name: string | null;
  buyer_email: string | null;
  buyer_phone: string | null;
  paid_at: string | null;
  razorpay_payment_id: string | null;
  razorpay_order_id: string | null;
};

const fmtINR = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

const planLabel = (p: ReceiptOrder["plan_type"]) =>
  p === "full" ? "Pay in full" : p === "emi3" ? "3-month plan" : "6-month plan";

export function generateReceiptPdf(order: ReceiptOrder) {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const W = doc.internal.pageSize.getWidth();

  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text("Payment Receipt", 40, 56);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(110);
  doc.text("IND — Parent-Led NeuroDevelopment System", 40, 74);

  doc.setTextColor(20);
  doc.setFontSize(10);
  const paid = order.paid_at ? new Date(order.paid_at).toLocaleString("en-IN") : "—";
  const meta: Array<[string, string]> = [
    ["Receipt #", order.id.slice(0, 8).toUpperCase()],
    ["Date", paid],
    ["Razorpay payment", order.razorpay_payment_id ?? "—"],
    ["Razorpay order", order.razorpay_order_id ?? "—"],
  ];
  let y = 100;
  meta.forEach(([k, v]) => {
    doc.setTextColor(110);
    doc.text(k, 40, y);
    doc.setTextColor(20);
    doc.text(v, 160, y);
    y += 16;
  });

  // Buyer
  y += 8;
  doc.setFont("helvetica", "bold");
  doc.text("Billed to", 40, y);
  doc.setFont("helvetica", "normal");
  y += 16;
  doc.text(order.buyer_name ?? "—", 40, y); y += 14;
  if (order.buyer_email) { doc.text(order.buyer_email, 40, y); y += 14; }
  if (order.buyer_phone) { doc.text(order.buyer_phone, 40, y); y += 14; }

  // Program block
  y += 12;
  doc.setFont("helvetica", "bold");
  doc.text("Program", 40, y);
  doc.setFont("helvetica", "normal");
  y += 16;
  doc.text(order.program_name, 40, y); y += 14;
  doc.setTextColor(110);
  doc.text(`Plan: ${planLabel(order.plan_type)}`, 40, y); y += 14;
  doc.setTextColor(20);

  // Amount table
  autoTable(doc, {
    startY: y + 10,
    margin: { left: 40, right: 40 },
    head: [["Line item", "Amount"]],
    body: [
      ["Program fee", fmtINR(order.base_amount)],
      ["GST (18%)", fmtINR(order.gst_amount)],
      ...(order.processing_fee > 0
        ? [["EMI processing fee", fmtINR(order.processing_fee)] as [string, string]]
        : []),
      [{ content: "Total paid", styles: { fontStyle: "bold" } }, { content: fmtINR(order.total_amount), styles: { fontStyle: "bold" } }],
    ],
    theme: "grid",
    headStyles: { fillColor: [30, 30, 30] },
  });

  const afterAmount = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY;

  // Schedule
  if (order.schedule.length > 1) {
    autoTable(doc, {
      startY: afterAmount + 20,
      margin: { left: 40, right: 40 },
      head: [["#", "Due", "Amount"]],
      body: order.schedule.map((r) => [String(r.n), r.label, fmtINR(r.amount)]),
      theme: "striped",
      headStyles: { fillColor: [60, 60, 60] },
    });
  }

  doc.setFontSize(9);
  doc.setTextColor(120);
  doc.text(
    "This is a system-generated receipt. For support, contact your IND coordinator.",
    40,
    doc.internal.pageSize.getHeight() - 30,
    { maxWidth: W - 80 },
  );

  doc.save(`IND-Receipt-${order.id.slice(0, 8)}.pdf`);
}
