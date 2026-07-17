import { beforeEach, describe, expect, it } from "vitest";
import {
  PIN_CACHE_KEY,
  cacheKey,
  clearCache,
  getFromCache,
  validatePin,
  writeCache,
} from "@/lib/pin-lookup";

beforeEach(() => localStorage.clear());

describe("validatePin", () => {
  it("accepts valid Indian 6-digit pincode", () => {
    expect(validatePin("560001", "IN").ok).toBe(true);
  });
  it("rejects short Indian pincode", () => {
    const r = validatePin("56001", "IN");
    expect(r.ok).toBe(false);
    expect(r.hint).toContain("6");
  });
  it("accepts US ZIP and ZIP+4", () => {
    expect(validatePin("90210", "US").ok).toBe(true);
    expect(validatePin("90210-1234", "US").ok).toBe(true);
  });
  it("rejects US ZIP with letters", () => {
    expect(validatePin("9021A", "US").ok).toBe(false);
  });
  it("accepts Canadian postal codes with or without space", () => {
    expect(validatePin("K1A 0B1", "CA").ok).toBe(true);
    expect(validatePin("K1A0B1", "CA").ok).toBe(true);
  });
  it("uses a permissive fallback for unknown countries", () => {
    expect(validatePin("ABC-123", "ZZ").ok).toBe(true);
    expect(validatePin("!!", "ZZ").ok).toBe(false);
  });
  it("treats empty as invalid", () => {
    expect(validatePin("", "IN").ok).toBe(false);
  });
});

describe("cache", () => {
  const payload = {
    area: "MG Road",
    district: "Bengaluru",
    state: "Karnataka",
    country: "India",
    countryCode: "IN",
  };

  it("writes and reads a cached entry", () => {
    const key = cacheKey("IN", "560001");
    writeCache(key, payload);
    const hit = getFromCache(key);
    expect(hit?.district).toBe("Bengaluru");
    expect(hit?.cachedAt).toBeTypeOf("number");
  });

  it("expires entries past TTL", () => {
    const key = cacheKey("IN", "560001");
    writeCache(key, { ...payload, cachedAt: Date.now() - 10_000 });
    expect(getFromCache(key, 5_000)).toBeNull();
    // expired entry is purged
    const raw = JSON.parse(localStorage.getItem(PIN_CACHE_KEY) || "{}");
    expect(raw[key]).toBeUndefined();
  });

  it("clearCache removes all entries", () => {
    writeCache(cacheKey("IN", "560001"), payload);
    clearCache();
    expect(localStorage.getItem(PIN_CACHE_KEY)).toBeNull();
    expect(getFromCache(cacheKey("IN", "560001"))).toBeNull();
  });

  it("survives corrupted storage", () => {
    localStorage.setItem(PIN_CACHE_KEY, "{not json");
    expect(getFromCache("IN:560001")).toBeNull();
    writeCache("IN:560001", payload);
    expect(getFromCache("IN:560001")?.state).toBe("Karnataka");
  });
});