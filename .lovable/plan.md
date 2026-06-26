## Plan: Replace quiz "Consultation" track with "Clarity Call with Our Care Team"

### What will change
- In `src/routes/quiz.tsx`, update the `consult` track so the recommendation no longer suggests a consultation with Dr Diptanshu Das.
- The new label will be: **"Clarity Call with Our Care Team"**.
- The surrounding blurb will be rewritten to explain that a care team member will listen and guide the family to the right next step, without implying a medical consultation.
- The answer tag "General consultation" will be updated to "General guidance" for consistency.

### Exact text updates
- `RECOMMENDATIONS.consult.title`: change from "Book a Clarity Consultation with Dr Das" to "Clarity Call with Our Care Team".
- `RECOMMENDATIONS.consult.service`: change from "Consultation with Dr Diptanshu Das" to "Clarity Call with Our Care Team".
- `RECOMMENDATIONS.consult.blurb`: rewrite to focus on the care team, not a one-on-one consultation with Dr Das.
- First question option tag: change from "General consultation" to "General guidance".

### Files touched
- `src/routes/quiz.tsx` only.

### Verification
- Run `bun run build` and `bun run build:dev` to confirm no build errors after the text-only change.
- Optionally check the `/quiz` route in the preview to confirm the recommendation card displays the new wording.