#!/usr/bin/env node
// Publish preflight: runs `build` and `build:dev` sequentially.
// Exits non-zero if either fails, printing the failing step's output so
// the publish flow can surface a clear error.
import { spawn } from "node:child_process";

const steps = [
  { name: "build", cmd: "vite", args: ["build"] },
  { name: "build:dev", cmd: "vite", args: ["build", "--mode", "development"] },
];

function run({ name, cmd, args }) {
  return new Promise((resolve) => {
    const started = Date.now();
    console.log(`\n▶ preflight: ${name}`);
    const child = spawn(cmd, args, { stdio: ["ignore", "pipe", "pipe"] });
    let stdout = "";
    let stderr = "";
    child.stdout.on("data", (d) => {
      stdout += d;
    });
    child.stderr.on("data", (d) => {
      stderr += d;
    });
    child.on("close", (code) => {
      const ms = Date.now() - started;
      resolve({ name, code: code ?? 1, stdout, stderr, ms });
    });
    child.on("error", (err) => {
      resolve({ name, code: 1, stdout, stderr: String(err), ms: Date.now() - started });
    });
  });
}

let hadFailure = false;
for (const step of steps) {
  const result = await run(step);
  if (result.code === 0) {
    console.log(`✔ ${step.name} passed in ${result.ms}ms`);
    continue;
  }
  hadFailure = true;
  console.error(`\n✗ ${step.name} FAILED (exit ${result.code}) in ${result.ms}ms`);
  console.error("──── stdout ────");
  console.error(result.stdout.trim() || "(empty)");
  console.error("──── stderr ────");
  console.error(result.stderr.trim() || "(empty)");
  console.error(
    `\nBlocking publish: \`${step.name}\` must succeed before this project can be deployed.`,
  );
  break; // stop at first failure — fix it before re-running
}

if (hadFailure) process.exit(1);
console.log("\n✅ Publish preflight passed — safe to publish.");