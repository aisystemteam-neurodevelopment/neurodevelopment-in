## Goal

Convert the public marketing site from left-aligned to center-aligned content across all viewport sizes (mobile and desktop), while keeping functional layouts readable.

## Scope

All public marketing routes and shared section components:

- `src/routes/index.tsx` — hero, value props, 4-phase flightpath, invisible loss, proof/credibility, CTA
- `src/routes/about.tsx` — founder hero, pillars, authority signals, organizational sections
- `src/routes/approach.tsx`
- `src/routes/services.tsx`
- `src/routes/programs.tsx`
- `src/routes/treatments.$slug.tsx`
- `src/routes/faq.tsx`
- `src/routes/contact.tsx`
- `src/routes/chat.tsx`
- Shared section components: `InvisibleLossCalculator.tsx`, `LeadMagnetForm.tsx`, `TestimonialStories.tsx`

## Changes

1. **Section text containers**
   - Add `text-center` to every section heading/paragraph wrapper (`max-w-2xl`, `max-w-3xl`, etc.).
   - Change `max-w-xl`/`max-w-2xl` wrappers from `text-left` default to `text-center` and keep them centered with `mx-auto`.

2. **CTAs and buttons**
   - Wrap CTA button groups in `flex flex-wrap justify-center gap-3`.
   - Convert left-aligned `Link` CTAs to center layout.

3. **Grid cards**
   - Keep card internal content left-aligned for readability (lists, paragraphs).
   - Center the section header above each grid, and center any single cards or featured items.

4. **Hero sections**
   - Convert hero text blocks to `text-center`.
   - Center hero images/illustrations with `mx-auto` and `justify-items-center`/`place-items-center` where appropriate.

5. **Shared components**
   - Update `InvisibleLossCalculator`, `LeadMagnetForm`, and `TestimonialStories` to center their titles, descriptions, and CTAs.

6. **Tables/accordions**
   - Leave table cell text left-aligned for legibility.
   - Center FAQ section headers; keep accordion triggers left-aligned for readability.

## Verification

- Run `bun run build` to confirm no TypeScript or Tailwind class errors.
- Use Playwright to capture screenshots of `/`, `/about`, `/services`, `/programs`, `/faq` on desktop and mobile viewports and confirm visual center alignment.

## Out of scope

- Portal/authenticated routes (`family.*`, `staff.*`, `app.*`) — these are dashboard interfaces, not marketing content, and left-alignment aids data scanning.
- Header/footer navigation structure and social icon alignment.