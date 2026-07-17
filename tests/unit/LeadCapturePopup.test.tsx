import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PIN_CACHE_KEY, cacheKey } from "@/lib/pin-lookup";

// Stub supabase to capture insert calls without hitting the network
const insertMock = vi.fn().mockResolvedValue({ error: null });
vi.mock("@/integrations/supabase/client", () => ({
  supabase: { from: () => ({ insert: insertMock }) },
}));

// Prevent external HTTP calls; each test seeds the cache instead
beforeEach(() => {
  insertMock.mockClear();
  localStorage.clear();
  vi.stubGlobal(
    "fetch",
    vi.fn(async () => ({ ok: false, json: async () => ({}) })) as unknown as typeof fetch,
  );
});

async function renderPopup() {
  const { LeadCapturePopup } = await import("@/components/site/LeadCapturePopup");
  vi.useFakeTimers();
  const utils = render(<LeadCapturePopup />);
  // The popup is scheduled after 5s
  vi.advanceTimersByTime(5100);
  vi.useRealTimers();
  await waitFor(() => screen.getByText(/progress/i));
  return utils;
}

describe("LeadCapturePopup", () => {
  it("auto-fills address from cached PIN and reaches the review step", async () => {
    const user = userEvent.setup();
    // Seed cache so no network is needed
    localStorage.setItem(
      PIN_CACHE_KEY,
      JSON.stringify({
        [cacheKey("IN", "560001")]: {
          area: "MG Road",
          district: "Bengaluru",
          state: "Karnataka",
          country: "India",
          countryCode: "IN",
          cachedAt: Date.now(),
        },
      }),
    );

    await renderPopup();

    await user.type(screen.getByLabelText(/child's name/i), "A");
    await user.type(screen.getByLabelText(/parent's name/i), "B");
    await user.type(screen.getByLabelText(/child's age/i), "4");
    await user.type(screen.getByLabelText(/PIN \/ ZIP code/i), "560001");

    await waitFor(() =>
      expect((screen.getByLabelText(/^District/i) as HTMLInputElement).value).toBe(
        "Bengaluru",
      ),
    );

    // Concern + phone
    fireEvent.change(screen.getByLabelText(/Primary concern/i), {
      target: { value: "Autism / ASD" },
    });
    const phone = document.querySelector<HTMLInputElement>(
      ".lead-phone-input input",
    )!;
    await user.type(phone, "9876543210");

    await user.click(screen.getByRole("button", { name: /review my details/i }));
    expect(await screen.findByText(/review your details/i)).toBeInTheDocument();
  });

  it("blocks lookup and shows a per-country validation error for a bad PIN", async () => {
    const user = userEvent.setup();
    const fetchSpy = globalThis.fetch as unknown as ReturnType<typeof vi.fn>;
    await renderPopup();

    await user.type(screen.getByLabelText(/PIN \/ ZIP code/i), "12"); // too short for IN

    // Trigger validation via submit path
    await user.click(screen.getByRole("button", { name: /review my details/i }));
    expect(await screen.findByText(/Invalid format/i)).toBeInTheDocument();
    // API not called for invalid pin
    const calledPostal = fetchSpy.mock.calls.some((c) =>
      String(c[0]).includes("postalpincode.in"),
    );
    expect(calledPostal).toBe(false);
  });

  it("Clear address cache empties localStorage", async () => {
    const user = userEvent.setup();
    localStorage.setItem(
      PIN_CACHE_KEY,
      JSON.stringify({ "IN:560001": { area: "x", district: "x", state: "x", country: "x" } }),
    );
    await renderPopup();
    await user.click(screen.getByRole("button", { name: /clear address cache/i }));
    expect(localStorage.getItem(PIN_CACHE_KEY)).toBeNull();
  });

  it("fallback dropdown lets user pick country and state manually", async () => {
    const user = userEvent.setup();
    await renderPopup();

    const country = screen.getByLabelText(/^Country/i) as HTMLSelectElement;
    fireEvent.change(country, { target: { value: "IN" } });
    const state = screen.getByLabelText(/^State/i) as HTMLSelectElement;
    await waitFor(() =>
      expect(state.querySelectorAll("option").length).toBeGreaterThan(1),
    );
    fireEvent.change(state, { target: { value: "Karnataka" } });
    expect(state.value).toBe("Karnataka");
  });
});