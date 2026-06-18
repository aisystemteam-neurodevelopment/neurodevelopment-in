## Goal
Add Bengali (বাংলা) translations alongside the existing English content on the **Testimonials** section and the **FAQ** page, so Bengali-speaking parents can read either version.

## UX approach
Add a small **language toggle** (`English / বাংলা`) at the top of each section. Clicking switches all testimonial cards / FAQ items between the two languages in place. No URL change, no full-page i18n framework — just local component state.

- Default language: **English**
- Toggle is a simple two-button pill, accessible (`aria-pressed`)
- Bengali text uses the same Tailwind typography; we'll let the system Bengali font render (no new web font import unless you ask)

## Scope

### 1. `src/components/site/TestimonialStories.tsx`
- Extend each `Story` object with `_bn` variants for all human-readable fields (`child`, `starting`, `phase`, `outcomes[]`, `quote`, `tier`, plus the section heading/intro/footer note).
- Add `useState<'en' | 'bn'>('en')` and a toggle button row.
- Render the active-language strings.

### 2. `src/routes/faq.tsx`
- For every FAQ question + answer, add Bengali equivalents.
- Add the same `en / bn` toggle at the top of the FAQ list.
- Page `<title>` / meta stay English (SEO).

### 3. Translation source
I'll translate the existing English copy into natural, parent-friendly Bengali. Clinical terms (ASD, OT, EMI, Phase 1/2/3/4) stay in English inside the Bengali text, since that's how Bengali-speaking parents in India/Bangladesh actually refer to them.

## Out of scope
- No site-wide i18n (header, footer, other pages stay English).
- No new fonts, no route changes, no URL-based locale (`/bn/...`).
- No backend / DB changes.

## Open question
Want me to also add the toggle to the **home page** testimonial section (same component is used on `/` and on dedicated pages), or keep it only where `TestimonialStories` already renders? Default: apply everywhere the component is used (single source of truth).
