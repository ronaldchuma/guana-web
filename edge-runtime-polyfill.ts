// Shim __dirname for Edge Runtime — ua-parser-js (bundled by Next.js) references it.
// This must be a separate module imported before next/server so it evaluates first.
(globalThis as Record<string, unknown>).__dirname =
  (globalThis as Record<string, unknown>).__dirname || "";
