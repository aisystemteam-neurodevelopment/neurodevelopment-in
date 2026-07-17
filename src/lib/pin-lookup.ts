// Pure helpers for PIN/ZIP validation and caching. Kept framework-free so
// they can be unit tested with vitest without a DOM.

export type CachedPin = {
  area: string;
  district: string;
  state: string;
  country: string;
  countryCode?: string;
  cachedAt?: number;
};

export type CacheStore = Record<string, CachedPin>;

export const PIN_CACHE_KEY = "ind_pin_cache_v1";
// Default cache TTL: 30 days. Overridable via VITE_PIN_CACHE_TTL_MS.
const envTtl = Number(
  (typeof import.meta !== "undefined" && (import.meta as any).env?.VITE_PIN_CACHE_TTL_MS) || 0,
);
export const PIN_CACHE_TTL_MS =
  Number.isFinite(envTtl) && envTtl > 0 ? envTtl : 30 * 24 * 60 * 60 * 1000;

// Per-country PIN/ZIP validation rules. Fallback covers unknown countries.
// Each rule includes a human-readable hint used in error messages.
type Rule = { regex: RegExp; hint: string };

const RULES: Record<string, Rule> = {
  IN: { regex: /^\d{6}$/, hint: "6 digits" },
  US: { regex: /^\d{5}(-\d{4})?$/, hint: "5 digits (or 5+4)" },
  CA: { regex: /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/, hint: "A1A 1A1" },
  GB: {
    regex: /^[A-Za-z]{1,2}\d[A-Za-z\d]?\s*\d[A-Za-z]{2}$/,
    hint: "e.g. SW1A 1AA",
  },
  AU: { regex: /^\d{4}$/, hint: "4 digits" },
  DE: { regex: /^\d{5}$/, hint: "5 digits" },
  FR: { regex: /^\d{5}$/, hint: "5 digits" },
  NL: { regex: /^\d{4}\s?[A-Za-z]{2}$/, hint: "1234 AB" },
  BR: { regex: /^\d{5}-?\d{3}$/, hint: "12345-678" },
  JP: { regex: /^\d{3}-?\d{4}$/, hint: "123-4567" },
  SG: { regex: /^\d{6}$/, hint: "6 digits" },
  AE: { regex: /^\d{5,6}$/, hint: "5-6 digits" },
  PK: { regex: /^\d{5}$/, hint: "5 digits" },
  BD: { regex: /^\d{4}$/, hint: "4 digits" },
};

const FALLBACK: Rule = { regex: /^[A-Za-z0-9 -]{3,12}$/, hint: "3-12 letters/digits" };

export function validatePin(
  pin: string,
  countryCode?: string,
): { ok: boolean; hint: string } {
  const trimmed = (pin || "").trim();
  if (!trimmed) return { ok: false, hint: "Required" };
  const rule = (countryCode && RULES[countryCode.toUpperCase()]) || FALLBACK;
  return { ok: rule.regex.test(trimmed), hint: rule.hint };
}

// Try to guess a country from the raw PIN/ZIP shape. Returns the first ISO
// code whose rule matches. Useful when the user pastes an international ZIP
// before selecting a country in the dropdown.
export function detectCountryFromPin(pin: string): string | null {
  const trimmed = (pin || "").trim();
  if (!trimmed) return null;
  for (const [code, rule] of Object.entries(RULES)) {
    if (rule.regex.test(trimmed)) return code;
  }
  return null;
}

export function cacheKey(countryCode: string | undefined, pin: string): string {
  return `${(countryCode || "").toUpperCase()}:${pin.trim()}`;
}

export function readCache(storage: Storage = localStorage): CacheStore {
  try {
    return JSON.parse(storage.getItem(PIN_CACHE_KEY) || "{}") as CacheStore;
  } catch {
    return {};
  }
}

export function writeCache(
  key: string,
  value: CachedPin,
  storage: Storage = localStorage,
): void {
  try {
    const c = readCache(storage);
    c[key] = { ...value, cachedAt: value.cachedAt ?? Date.now() };
    storage.setItem(PIN_CACHE_KEY, JSON.stringify(c));
  } catch {
    /* quota / private mode - ignore */
  }
}

export function getFromCache(
  key: string,
  ttlMs: number = PIN_CACHE_TTL_MS,
  now: number = Date.now(),
  storage: Storage = localStorage,
): CachedPin | null {
  const c = readCache(storage);
  const hit = c[key];
  if (!hit) return null;
  if (hit.cachedAt && now - hit.cachedAt > ttlMs) {
    delete c[key];
    try {
      storage.setItem(PIN_CACHE_KEY, JSON.stringify(c));
    } catch {
      /* ignore */
    }
    return null;
  }
  return hit;
}

export function clearCache(storage: Storage = localStorage): void {
  try {
    storage.removeItem(PIN_CACHE_KEY);
  } catch {
    /* ignore */
  }
}