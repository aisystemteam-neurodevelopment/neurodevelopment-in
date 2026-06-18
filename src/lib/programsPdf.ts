export function downloadProgramsPdf() {
  const rows = [
    ["Program", "Duration", "Key benefit"],
    ["Masterclass / Webinar", "Live session", "Understand the system"],
    ["Block to Breakthrough", "6 weeks", "Clear mind blockage"],
    ["Pre-enrollment (B2B + Bootcamp)", "6 weeks + 2 days", "Boost Session weekly"],
    ["Flightpath - Core", "Enrollment", "Clarity Session + Progress Partner"],
    ["Flightpath - Essential", "Enrollment", "Core + Weekly Boost Session"],
    ["Flightpath - Elite", "Enrollment", "Essential + Strength Finder Session"],
  ];

  const lines = [
    "IND - Programs Guide",
    "Institute of NeuroDevelopment - Parent-led NeuroDevelopment System",
    "Sequence is law: Regulation -> Connection -> Communication -> Independence",
    "",
    ...rows.map((row) => row.join(" | ")),
    "",
    "Notes",
    "- The 2-day Bootcamp is only available inside the Pre-enrollment bundle.",
    "- All Flightpath tiers follow the same phase architecture; tiers differ in cadence and depth of support.",
    "- For program details and the right starting point for your family, reach out via the contact form on neurodevelopment.in/contact.",
    "",
    `Generated ${new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}`,
  ];

  const pdf = createSimplePdf(lines);
  const blob = new Blob([pdf], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "IND-Programs-Guide.pdf";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function createSimplePdf(lines: string[]) {
  const objects: string[] = [];
  const addObject = (body: string) => {
    objects.push(body);
    return objects.length;
  };

  const content = ["BT", "/F1 11 Tf", "40 790 Td", "14 TL"];
  lines.forEach((line, index) => {
    if (index > 0) content.push("T*");
    content.push(`(${escapePdfText(line)}) Tj`);
  });
  content.push("ET");
  const stream = content.join("\n");

  addObject("<< /Type /Catalog /Pages 2 0 R >>");
  addObject("<< /Type /Pages /Kids [3 0 R] /Count 1 >>");
  addObject("<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>");
  addObject("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>");
  addObject(`<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`);

  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  objects.forEach((object, index) => {
    offsets.push(pdf.length);
    pdf += `${index + 1} 0 obj\n${object}\nendobj\n`;
  });

  const xrefOffset = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n`;
  pdf += "0000000000 65535 f \n";
  offsets.slice(1).forEach((offset) => {
    pdf += `${String(offset).padStart(10, "0")} 00000 n \n`;
  });
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;
  return pdf;
}

function escapePdfText(value: string) {
  return value.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}
