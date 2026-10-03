import { writeFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";

// The page is static, so Netlify serves a pre-rendered copy from dist/client
// (same HTML, styles and scripts as the Lovable-hosted version).
const mod = await import(pathToFileURL(resolve("dist/server/index.mjs")).href);
const handler = mod.default ?? mod;
const response = await handler.fetch(new Request("https://localhost/"), {}, { waitUntil() {}, passThroughOnException() {} });
const html = await response.text();
if (!response.ok || !html.includes("Kutanga")) throw new Error(`Pre-render failed (HTTP ${response.status}).`);
await writeFile("dist/client/index.html", html);
console.log("Pre-rendered dist/client/index.html");
