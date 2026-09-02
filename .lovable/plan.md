# Photo Strategy & Implementation Plan

## Goal
Add meaningful, trust-building photos across the website while respecting family privacy and keeping the existing dark-purple/gold design consistent.

## Photo Strategy by Page

### 1. Homepage
- **Hero**: Keep the current mountain background; optionally overlay a subtle, respectful image of a parent-child activity in the lower-right fade area, or leave as-is if the background already feels complete.
- **Parent-led system section**: Add a warm photo of a parent and child doing a structured activity (puzzle, reading, drawing) — faces optional/back-of-head.
- **Social proof / testimonials band**: Add 1–2 parent/family photos with consent, or soft illustrated avatars if consent is unavailable.

### 2. About Page
- **Dr. Das portrait**: Replace or enhance the existing PNG with a high-resolution, professionally lit photo that matches the dark theme.
- **Credentials block**: Add small thumbnail photos of certificates/diplomas or conference appearances behind each credential chip.
- **Clinic/team**: If available, add a group or workplace photo of Dr. Das with coordinators.

### 3. Services / Approach / Programs
- **Method cards**: Add 3–4 respectful activity photos showing structured play, communication practice, sensory work, and daily routines — no identifiable faces unless consented.
- **Masterclass landing page**: Add a banner image or Dr. Das teaching photo.

### 4. Kolkata Clinic Page
- **Clinic exterior/interior**: 1–2 photos of the assessment space at 26, Raja Nabakrishna Street.
- **Local context**: A calm Kolkata/neighbourhood shot near Sobhabazar if it adds local trust.
- **Dr. Das at clinic**: A candid consultation photo, only with consent.

### 5. Testimonials + Careers
- **Testimonials**: Parent/family photos with explicit consent, or fallback to initials-based avatars.
- **Careers**: Team culture or workplace environment photo; avoid patient-facing areas.

## Image Requirements

- **Format**: JPG or WebP for photos; PNG only if transparency is needed.
- **Resolution**: Minimum 1200px wide for hero/banner use; 600–800px wide for inline cards.
- **Aspect ratios**:
  - Hero/banner: 16:9 or 21:9
  - Cards/thumbnails: 4:3 or 1:1
  - Portrait (Dr. Das): 3:4 or 2:3
- **File size**: Preferably under 300 KB each after compression; use TinyPNG/Squoosh before upload.
- **Style**: Warm, natural lighting; avoid sterile white clinic stock. Match the site’s dignified, parent-led tone.
- **Privacy**: No identifiable child or family faces without written consent. When in doubt, use back-of-head, hands-in-frame, silhouettes, or no people.

## Sourcing Plan

1. **User-supplied real photos** (preferred for authenticity):
   - Dr. Das professional portrait
   - Clinic interior/exterior
   - Consented parent/family activity shots
   - Certificate/conference photos
2. **Generated/illustrated imagery** where real photos are missing:
   - Warm parent-child activity scenes
   - Structured play/communication visuals
   - Team/careers culture imagery

## Implementation Steps

1. Collect and review uploaded images; rename descriptively (e.g., `dr-das-portrait.jpg`, `kolkata-clinic-interior.jpg`).
2. Compress/resize images to web-friendly dimensions.
3. Upload images to the project as CDN assets using `lovable-assets`.
4. Update route files to import and place images:
   - `src/routes/index.tsx` — homepage sections
   - `src/routes/about.tsx` — portrait and credentials
   - `src/routes/services.tsx`, `src/routes/approach.tsx`, `src/routes/programs.tsx` — method/service cards
   - `src/routes/kolkata.tsx` — clinic visuals
   - `src/routes/careers.tsx` — team/culture photo
   - `src/components/site/TestimonialStories.tsx` — testimonial avatars
5. Add descriptive `alt` text for accessibility and SEO.
6. Verify responsive behavior and that images do not break the centered layout on mobile/desktop.
7. Run `bun run publish:preflight` to confirm production and dev builds pass.

## Privacy & Safety Checklist

- Confirm written consent before publishing any identifiable person, especially children.
- Use blurred faces, silhouettes, or cropped frames when consent is unclear.
- Avoid showing sensitive documents with full personal details; blur ID numbers if needed.
- Keep clinic photos free of patient-identifying backgrounds (name boards, files, screens).

## Next Step
Please upload the photos you already have (Dr. Das portrait, clinic photos, consented family shots, certificates), and I will process, optimize, and place them across the selected pages. For any gaps, I can generate respectful, privacy-safe imagery.