
## Goal

Rebuild the prior Institute of NeuroDevelopment (IND) site + portal from `wrangler.zip` inside this project. Same stack (TanStack Start v1, React 19, Tailwind v4, Supabase), so this is a code + schema port rather than a re-architecture. The Breakthrough Flightpath docs are content/source material — not migrated as code in this pass.

## What's in the source archive

- **Stack**: TanStack Start (matches current project), `@lovable.dev/vite-tanstack-config`, `@supabase/supabase-js`, `@tanstack/react-query`, jspdf, recharts, etc.
- **Routes** (flat file convention): public site (`index`, `about`, `approach`, `services`, `programs`, `treatments.$slug`, `faq`, `contact`, `chat`, `privacy`, `terms`, `refund`, `auth`, `profile`), family portal (`family` layout + `index/appointments/modules/products/progress`), staff portal (`staff` + `index/manage`), admin app (`app.index/admin/leads`), and API routes (`api/public/booking`, `chat`, `lead-magnet`).
- **Components**: site shell (`SiteHeader/Footer/Layout`, `PortalShell`, `RoleGuard`), marketing widgets (`InvisibleLossCalculator`, `LeadMagnetForm`, `TestimonialStories`), programs (`PaymentModal`, `PlanQuiz`), full shadcn `ui/` set.
- **Lib**: `auth-context`, `payments.functions.ts`, `razorpay.ts`, `programsPdf`/`receiptPdf`, `data/treatments.ts`.
- **Integrations**: Supabase `client.ts`, `client.server.ts`, `auth-middleware.ts`, `auth-attacher.ts`, `types.ts`; `lovable/index.ts`.
- **Schema** (7 migrations under `superbase/` — typo, will be placed at `supabase/migrations/`):
  - Enums: `app_role` (parent_prospect, parent_enrolled, coordinator, clinical_advisor, sales, content_manager, admin, employee), `lead_stage`, `escalation_type`, `escalation_status`
  - Tables: `profiles`, `user_roles`, `leads`, `lead_messages`, `departments`, `payment_orders`, escalations, etc., with RLS + `has_role`/`is_staff`/`is_department_*` security-definer functions and the standard GRANT blocks.

## Plan

1. **Enable Lovable Cloud** on this project (provisions a fresh Supabase). The archive's old project ref (`yumdtvljeretiowzuegb`) and keys are discarded — Cloud injects new `VITE_SUPABASE_*` / `SUPABASE_*` env.
2. **Copy source files** from the archive into the current project, preserving paths:
   - `src/routes/**` — overwrite this project's placeholder `index.tsx`/`__root.tsx`; rename the malformed `src/routes/api  public/` (double space) to `src/routes/api/public/`.
   - `src/components/{site,programs,ui}/**`, `src/hooks/use-mobile.tsx`, `src/lib/**`, `src/data/treatments.ts`.
   - `src/integrations/lovable/index.ts` (other `integrations/supabase/*` files are generated/managed by Cloud — do **not** overwrite those; reconcile any drift after Cloud is enabled).
   - `src/styles.css` (Tailwind v4 theme tokens) — overwrite.
3. **Install missing dependencies** via `bun add`: jspdf, jspdf-autotable, recharts, embla-carousel-react, input-otp, react-day-picker, react-resizable-panels, date-fns, cmdk, react-hook-form, @hookform/resolvers, sonner, vaul, tw-animate-css, and any Radix packages not already present. (Skip ones already in current `package.json`.)
4. **Apply database schema**: run the 7 migrations in order against the new Cloud project (kept verbatim except moved from `superbase/` → `supabase/migrations/`). They already include GRANTs and RLS per Lovable conventions.
5. **Wire start.ts**: ensure `attachSupabaseAuth` is appended to `functionMiddleware` (required by `requireSupabaseAuth` used in `payments.functions.ts` and likely loaders).
6. **Razorpay payment integration**: `payments.functions.ts` + `razorpay.ts` reference Razorpay keys. After build is green, surface that `RAZORPAY_KEY_ID` / `RAZORPAY_KEY_SECRET` (and webhook secret) need to be added as secrets — request via `add_secret` only after user confirms they want payments live now.
7. **Verify**: let the harness build; fix any import/path drift, especially around the renamed `api/public` folder and the Cloud-managed `integrations/supabase/*` types vs. what the ported code imports.

## Out of scope this pass

- The Breakthrough Flightpath PDFs/docs/markdown are **not** ingested into the app (no KB ingestion, no embeddings, no AI assistant). They remain reference material. We can do that as a follow-up if you want a parent-facing chat over the docs.
- No styling redesign — ports the existing visual system as-is.

## Confirm before I switch to build mode

- OK to provision a **new** Cloud backend (the old project's data does not transfer)?
- Defer Razorpay secrets until after the rebuild compiles (recommended), or set them up in the same pass?
