type GtagArgs = [command: string, ...rest: unknown[]];

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: GtagArgs) => void;
  }
}

/** Send a Google Analytics (gtag.js) event. No-op during SSR or if gtag isn't loaded. */
export function trackEvent(name: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  if (typeof window.gtag === "function") {
    window.gtag("event", name, params);
    return;
  }
  // gtag script may still be loading — queue on dataLayer directly.
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(["event", name, params]);
}
