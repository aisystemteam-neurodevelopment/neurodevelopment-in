import { unzipSync, strFromU8 } from "fflate";

export type ParsedResume = {
  name: string | null;
  experience: string | null;
  skills: string[];
  summary: string | null;
};

/** Extract plain text from a resume buffer. Returns "" when nothing readable is found. */
export async function extractResumeText(bytes: Uint8Array, ext: string): Promise<string> {
  try {
    if (ext === "pdf") {
      const { extractText, getDocumentProxy } = await import("unpdf");
      const pdf = await getDocumentProxy(new Uint8Array(bytes));
      const { text } = await extractText(pdf, { mergePages: true });
      return normalize(Array.isArray(text) ? text.join("\n") : text);
    }
    if (ext === "docx") {
      const files = unzipSync(bytes);
      const doc = files["word/document.xml"];
      if (!doc) return "";
      const xml = strFromU8(doc);
      return normalize(
        xml
          .replace(/<\/w:p>/g, "\n")
          .replace(/<w:tab[^>]*\/>/g, " ")
          .replace(/<[^>]+>/g, ""),
      );
    }
    // Legacy .doc — best-effort: pull readable ASCII runs out of the binary.
    const ascii = new TextDecoder("latin1").decode(bytes);
    const runs = ascii.match(/[\x20-\x7e]{6,}/g) ?? [];
    return normalize(runs.join(" "));
  } catch (err) {
    console.error("Resume text extraction failed", err);
    return "";
  }
}

function normalize(text: string): string {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\r/g, "")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
    .slice(0, 12000);
}

const SYSTEM_PROMPT =
  "You extract structured data from resumes. Reply with JSON only, no prose. " +
  'Shape: {"name": string|null, "experience": string|null, "skills": string[], "summary": string|null}. ' +
  '"experience" is total professional experience as a short phrase like "4 years". ' +
  '"skills" holds at most 15 short skill keywords. "summary" is at most two sentences. ' +
  "Use null when the resume does not state something. Never invent details.";

/** Ask Lovable AI to pull structured fields out of resume text. Falls back to heuristics. */
export async function extractResumeFields(text: string): Promise<ParsedResume> {
  const fallback = heuristicFields(text);
  if (!text) return fallback;

  const apiKey = process.env["LOVABLE_API_KEY"];
  if (!apiKey) return fallback;

  try {
    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: text.slice(0, 8000) },
        ],
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      console.error(`Resume AI extraction failed (${res.status})`, body.slice(0, 300));
      return fallback;
    }

    const json = (await res.json()) as { choices?: Array<{ message?: { content?: string } }> };
    const content = json.choices?.[0]?.message?.content ?? "";
    const match = content.match(/\{[\s\S]*\}/);
    if (!match) return fallback;
    const parsed = JSON.parse(match[0]) as Partial<ParsedResume>;
    return {
      name: str(parsed.name) ?? fallback.name,
      experience: str(parsed.experience) ?? fallback.experience,
      skills: Array.isArray(parsed.skills)
        ? parsed.skills.filter((s): s is string => typeof s === "string").map((s) => s.trim().slice(0, 60)).slice(0, 15)
        : fallback.skills,
      summary: str(parsed.summary) ?? fallback.summary,
    };
  } catch (err) {
    console.error("Resume AI extraction error", err);
    return fallback;
  }
}

function str(v: unknown): string | null {
  return typeof v === "string" && v.trim() ? v.trim().slice(0, 500) : null;
}

function heuristicFields(text: string): ParsedResume {
  if (!text) return { name: null, experience: null, skills: [], summary: null };
  const firstLine = text.split("\n").map((l) => l.trim()).find((l) => l.length > 2 && l.length < 60) ?? null;
  const looksLikeName = firstLine && /^[A-Za-z.\-' ]+$/.test(firstLine) ? firstLine : null;
  const yrs = text.match(/(\d{1,2}(?:\.\d)?)\s*\+?\s*(?:years?|yrs?)\b/i);
  return {
    name: looksLikeName,
    experience: yrs ? `${yrs[1]} years` : null,
    skills: [],
    summary: text.slice(0, 240),
  };
}
