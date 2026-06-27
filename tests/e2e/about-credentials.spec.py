"""E2E: verify the Dr. Das credentials block on the About page.

Asserts the section heading and every credential chip renders with the
exact expected text, on both desktop and mobile viewports.

Run against a running dev server:
  BASE_URL=http://localhost:8080 python3 tests/e2e/about-credentials.spec.py
"""

import asyncio
import os
import sys
from pathlib import Path

from playwright.async_api import async_playwright

BASE_URL = os.environ.get("BASE_URL", "http://localhost:8080")
SCREENSHOTS = Path("/tmp/browser/about-credentials/screenshots")
SCREENSHOTS.mkdir(parents=True, exist_ok=True)

EXPECTED_HEADING = "Credentials & registrations"
EXPECTED_CREDENTIALS = [
    "MBBS (Cal)",
    "MHSc Clinical Child Development (Kerala University)",
    "MD Paediatric Neurology (Rome, Italy)",
    "PDCR",
    "PGPN (Boston, USA)",
    "IPPN (Western Australia)",
    "Reg. 61474 (WBMC)",
]

VIEWPORTS = {
    "desktop": {"width": 1280, "height": 1800},
    "mobile": {"width": 390, "height": 1800},
}


async def check_viewport(browser, name: str, viewport: dict) -> list[str]:
    failures: list[str] = []
    context = await browser.new_context(viewport=viewport)
    page = await context.new_page()
    await page.goto(f"{BASE_URL}/about", wait_until="networkidle")

    # Heading present.
    heading = page.get_by_text(EXPECTED_HEADING, exact=True)
    try:
        await heading.wait_for(timeout=5000)
    except Exception as e:  # noqa: BLE001
        failures.append(f"[{name}] heading not found: {e!r}")

    # Locate the credentials card via the heading, then assert chip text + visibility.
    card = heading.locator(
        "xpath=ancestor::div[contains(@class,'rounded-3xl')][1]"
    )
    for cred in EXPECTED_CREDENTIALS:
        chip = card.get_by_text(cred, exact=True)
        count = await chip.count()
        if count != 1:
            failures.append(f"[{name}] credential {cred!r} count={count}, expected 1")
            continue
        if not await chip.first.is_visible():
            failures.append(f"[{name}] credential {cred!r} not visible")

    # Order matches the spec.
    chip_texts = await card.locator("span.inline-flex").all_inner_texts()
    chip_texts = [t.strip() for t in chip_texts]
    if chip_texts != EXPECTED_CREDENTIALS:
        failures.append(
            f"[{name}] order mismatch:\n  expected={EXPECTED_CREDENTIALS}\n  got={chip_texts}"
        )

    await card.screenshot(path=str(SCREENSHOTS / f"{name}.png"))
    await context.close()
    return failures


async def main() -> int:
    failures: list[str] = []
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        for name, viewport in VIEWPORTS.items():
            failures.extend(await check_viewport(browser, name, viewport))
        await browser.close()

    if failures:
        print("FAILURES:")
        for f in failures:
            print("  -", f)
        return 1
    print("Credentials block matches on desktop and mobile.")
    return 0


if __name__ == "__main__":
    sys.exit(asyncio.run(main()))