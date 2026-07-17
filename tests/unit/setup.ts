import "@testing-library/jest-dom/vitest";

// Silence supabase env warnings in unit tests
process.env.VITE_SUPABASE_URL ||= "http://localhost";
process.env.VITE_SUPABASE_PUBLISHABLE_KEY ||= "test";