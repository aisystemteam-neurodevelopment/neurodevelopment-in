"""End-to-end tests for the qualifier quiz.

For each of the four scoring tracks (assessment, therapy, programme, consult)
we drive the quiz, then assert:
  - the recommendation title shown on the form step
  - the submit-button label
  - the `track` value POSTed to /api/public/quiz-lead, and the lead `source`
    the server is expected to record for that track.

The /api/public/quiz-lead call is intercepted so the test never writes to the
database. The source-mapping mirror below must stay in sync with
src/routes/api/public/quiz-lead.ts.

Run against a running dev server:
  BASE_URL=http://localhost:8080 python3 tests/e2e/quiz.spec.py
"""

import asyncio
import json
import os
import sys
from pathlib import Path

from playwright.async_api import async_playwright

BASE_URL = os.environ.get("BASE_URL", "http://localhost:8080")
SCREENSHOTS = Path("/tmp/browser/quiz-e2e/screenshots")
SCREENSHOTS.mkdir(parents=True, exist_ok=True)

# Mirror of the server-side mapping in src/routes/api/public/quiz-lead.ts.
SOURCE_BY_TRACK = {
    "assessment": "qualifier_quiz_assessment",
    "therapy": "qualifier_quiz_therapy",
    "programme": "qualifier_quiz_programme",
    "consult": "qualifier_quiz_care_team",
}

# Option indices (0-based) per question that deterministically score to each track.
# Verified against the weights in src/routes/quiz.tsx.
TRACK_ANSWERS = {
    "assessment": [0, 0, 1, 0, 0],
    "therapy":    [4, 1, 1, 2, 0],
    "programme":  [1, 3, 3, 1, 1],
    "consult":    [5, 0, 0, 3, 2],
}

EXPECTED_TITLE = {
    "assessment": "Start with a Developmental Assessment",
    "therapy":    "Targeted Therapy Sessions",
    "programme":  "A Structured NeuroDevelopment Programme",
    "consult":    "Clarity Call with Our Care Team",
}

EXPECTED_CTA = {
    "assessment": "Request my Clarity Call",
    "therapy":    "Request my Clarity Call",
    "programme":  "Request my Clarity Call",
    "consult":    "Book my Clarity Call",
}


async def run_track(context, track: str) -> dict:
    page = await context.new_page()
    captured: dict = {}

    async def handle_post(route):
        try:
            captured["body"] = json.loads(route.request.post_data or "{}")
        except Exception as e:  # noqa: BLE001
            captured["error"] = str(e)
        await route.fulfill(
            status=200,
            content_type="application/json",
            body=json.dumps({"ok": True}),
        )

    await page.route("**/api/public/quiz-lead", handle_post)
    await page.goto(f"{BASE_URL}/quiz", wait_until="networkidle")
    # Wait for React hydration so click handlers are bound.
    await page.wait_for_selector('div.grid > button[type="button"]')
    await page.wait_for_timeout(300)

    # Click one option per question. Options are rendered as <button type="button">
    # inside the question card (div.grid), in declaration order.
    for step_idx, opt_idx in enumerate(TRACK_ANSWERS[track]):
        want = step_idx + 1
        await page.wait_for_function(
            "() => { const m = document.body.innerText.match(/QUESTION\\s+(\\d+)\\s+OF\\s+5/);"
            f" return !!m && m[1] === '{want}'; }}"
        )
        buttons = page.locator('div.grid > button[type="button"]')
        await buttons.nth(opt_idx).click()

    # Form step: assert recommendation title + CTA label.
    await page.wait_for_selector('form')
    title_text = await page.locator('form .font-display').first.inner_text()
    cta_text = await page.locator('form button[type="submit"]').inner_text()

    # Fill the form.
    await page.fill('input[name="name"]', f"Test {track}")
    await page.fill('input[name="phone"]', "+91 9000000000")
    await page.fill('input[name="email"]', f"{track}@example.com")
    # Radix Select for preferredTime.
    await page.locator('[id="preferredTime"]').click()
    await page.get_by_role("option", name="Anytime today").click()

    await page.locator('form button[type="submit"]').click()
    # Wait until the API was intercepted.
    for _ in range(50):
        if "body" in captured:
            break
        await page.wait_for_timeout(100)

    await page.screenshot(path=str(SCREENSHOTS / f"{track}.png"))
    await page.close()
    return {"title": title_text.strip(), "cta": cta_text.strip(), "body": captured.get("body")}


async def main() -> int:
    failures: list[str] = []
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(viewport={"width": 1280, "height": 1800})
        for track in ["assessment", "therapy", "programme", "consult"]:
            try:
                result = await run_track(context, track)
            except Exception as e:  # noqa: BLE001
                failures.append(f"[{track}] threw: {e!r}")
                continue

            body = result["body"] or {}
            checks = [
                ("title", result["title"], EXPECTED_TITLE[track]),
                ("cta",   result["cta"],   EXPECTED_CTA[track]),
                ("track", body.get("track"), track),
                ("expected_source", SOURCE_BY_TRACK[body.get("track", "")], SOURCE_BY_TRACK[track]),
            ]
            for name, actual, expected in checks:
                if actual != expected:
                    failures.append(f"[{track}] {name}: expected {expected!r}, got {actual!r}")
                else:
                    print(f"[{track}] {name} ok: {actual!r}")
        await browser.close()

    if failures:
        print("\nFAILURES:")
        for f in failures:
            print("  -", f)
        return 1
    print("\nAll quiz tracks passed.")
    return 0


if __name__ == "__main__":
    sys.exit(asyncio.run(main()))