import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export function downloadProgramsPdf() {
  const doc = new jsPDF({ unit: "pt", format: "a4" });

  // Header
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text("IND — Programs & Pricing", 40, 50);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(110);
  doc.text(
    "Institute of NeuroDevelopment — Parent-led NeuroDevelopment System",
    40,
    68,
  );
  doc.text(
    "Sequence is law: Regulation -> Connection -> Communication -> Independence",
    40,
    82,
  );
  doc.setTextColor(0);

  autoTable(doc, {
    startY: 110,
    head: [["Program", "Duration", "Key benefit", "Price (INR)"]],
    body: [
      ["Masterclass / Webinar", "Live session", "Understand the system", "Rs 249"],
      ["Block to Breakthrough", "6 weeks", "Clear mind blockage", "Rs 10,000"],
      [
        "Pre-enrollment (B2B + Bootcamp)",
        "6 weeks + 2 days",
        "Boost Session weekly",
        "Rs 20,000",
      ],
      [
        "Flightpath - Core",
        "Enrollment",
        "Clarity Session + Progress Partner",
        "Rs 1,20,000",
      ],
      [
        "Flightpath - Essential",
        "Enrollment",
        "Core + Weekly Boost Session",
        "Rs 2,00,000",
      ],
      [
        "Flightpath - Elite",
        "Enrollment",
        "Essential + Strength Finder Session",
        "Rs 2,40,000",
      ],
    ],
    styles: { fontSize: 10, cellPadding: 8 },
    headStyles: { fillColor: [30, 30, 30], textColor: 255 },
    alternateRowStyles: { fillColor: [248, 246, 242] },
    columnStyles: { 3: { halign: "right", fontStyle: "bold" } },
  });

  const finalY = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 24;

  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("Notes", 40, finalY);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  const notes = [
    "- The 2-day Bootcamp is only available inside the Pre-enrollment bundle.",
    "- All Flightpath tiers follow the same phase architecture; tiers differ in",
    "  cadence and depth of support.",
    "- GST (18%) is applicable on all programs.",
    "- EMI plans available: 3-month (+2% processing) or 6-month (+4% processing).",
  ];
  doc.text(notes, 40, finalY + 18);

  doc.setFontSize(9);
  doc.setTextColor(110);
  doc.text(
    `Generated ${new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}`,
    40,
    doc.internal.pageSize.getHeight() - 30,
  );

  doc.save("IND-Programs-Pricing.pdf");
}
