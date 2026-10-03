import { writeFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";

// The page is static, so Netlify serves a plain pre-rendered copy from
// dist/client. The app scripts are removed so nothing re-draws the page in the
// browser (no flickering images, jumping layout or FAQ items closing); only the
// Meta Pixel and a tiny countdown script remain.
const mod = await import(pathToFileURL(resolve("dist/server/index.mjs")).href);
const handler = mod.default ?? mod;
const response = await handler.fetch(new Request("https://localhost/"), {}, { waitUntil() {}, passThroughOnException() {} });
let html = await response.text();
if (!response.ok || !html.includes("Kutanga")) throw new Error(`Pre-render failed (HTTP ${response.status}).`);

html = html
  .replace(/<link rel="modulepreload"[^>]*>/g, "")
  .replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, (tag) => (tag.includes("fbq(") ? tag : ""));

const timerTag = /<span class="font-bold text-gold">47:08(?:<!-- -->)? restantes<\/span>/;
if (!timerTag.test(html)) throw new Error("Countdown not found in pre-rendered page.");
html = html.replace(timerTag, '<span id="kutanga-timer" class="font-bold text-gold">47:08 restantes</span>');

const countdown = `<script>(function(){var s=47*60+8,el=document.getElementById("kutanga-timer");if(!el)return;setInterval(function(){s=Math.max(0,s-1);var m=Math.floor(s/60),r=s%60;el.textContent=(m<10?"0":"")+m+":"+(r<10?"0":"")+r+" restantes";},1000);})();</script>`;
html = html.replace("</body>", `${countdown}</body>`);

if (!html.includes("fbq('init','1322341386776067')")) throw new Error("Meta Pixel missing from pre-rendered page.");
await writeFile("dist/client/index.html", html);
console.log("Pre-rendered dist/client/index.html");
