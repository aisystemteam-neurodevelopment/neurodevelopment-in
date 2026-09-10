# Theme & Colour Refresh Plan

## Goal
Replace the current dark purple/black theme with a lighter, warmer, more hopeful design built around the Autism Awareness colour gradient, suitable for a neurodevelopment / autism care service.

## Design decisions
- **Background**: move from `#0d0b1a` to a warm off-white (`#FFFBF7`) so the site feels open and readable.
- **Primary brand**: use the Autism Awareness gradient as the new colour system.
  - Primary action: `#822FAF` (vibrant purple)
  - Accent/highlight: `#EA698B` (warm pink)
  - Secondary surfaces: `#F3E8F3` / `#FCE7EC` (soft lavender/pink tints)
  - Muted text: `#5A4A5C` (warm purple-grey)
  - Dark text/ink: `#2E1A3B` (deep purple-black)
- **Mood**: hopeful and energetic — brighter buttons, warmer gradients, friendly but still professional.
- **Typography**: keep Fraunces + Inter; they already work, just recoloured.
- **Logo**: keep the phoenix logo; recolour or leave as-is depending on contrast against the light background.

## Work to do
1. **Update design tokens in `src/styles.css`**
   - Replace `:root` background, foreground, card, primary, secondary, muted, accent, border, and chart colours with the new light + gradient palette.
   - Keep the `.dark` mode block for users who prefer dark, but make it a softer dark purple rather than the current heavy theme.
   - Add CSS custom properties for the gradient stops if useful for hero/button gradients.

2. **Update homepage hero (`src/routes/index.tsx`)**
   - Remove or lighten the dark mountain-hero overlay so the new background feels airy.
   - Use a subtle gradient overlay from the awareness palette (e.g., pink-to-purple) for energy.
   - Ensure headline, CTA buttons, and stats remain readable on the lighter background.

3. **Update shared components**
   - `SiteHeader.tsx`: adjust background, text, and social icon colours for the light theme.
   - `SiteFooter.tsx`: adjust background and link colours.
   - `LeadCapturePopup.tsx`, forms, cards: update borders, backgrounds, and accent colours.
   - `MSection`, `MHeading`, `MSub`, `MText`, `MList`, `MCards`, `MStats` primitives: replace dark-card surfaces with light-card surfaces and update primary/accent text colours.

4. **Update other public routes**
   - `/about`, `/services`, `/approach`, `/programs`, `/kolkata`, `/careers`, `/faq`, `/contact`, `/refund`, `/quiz`, `/science-of-stuck`, `/chat`
   - Sweep for hardcoded dark colours or violet/gold references and align to the new tokens.

5. **Verify accessibility**
   - Check contrast ratios for primary buttons and text on the light background.
   - Ensure links remain distinguishable.

6. **Build & preview check**
   - Run `bun run build` and `bun run build:dev`.
   - Capture desktop and mobile screenshots of the homepage and one inner page to confirm the new theme renders correctly.

## Out of scope
- No layout restructuring.
- No new pages or features.
- No changes to fonts unless contrast issues force a change.

## Success criteria
- Homepage no longer reads as dark/purple-black.
- Autism Awareness gradient is visible in primary buttons, accents, or hero overlay.
- Site feels hopeful, energetic, and appropriate for families seeking autism/neurodevelopment support.
- Production builds pass.
