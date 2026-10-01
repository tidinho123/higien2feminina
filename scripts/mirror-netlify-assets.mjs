import { readFile, mkdir, writeFile } from "node:fs/promises";
import { join, dirname } from "node:path";

// Lovable serves these asset URLs automatically. On Netlify, copy the same
// public images into the published directory so the HTML needs no changes.
const origin = "https://higien2feminina.lovable.app";
const html = await readFile("src/reference-content.html", "utf8");
const assetPaths = [...new Set(html.match(/\/__l5e\/assets-v1\/[a-z0-9-]+\/[a-z0-9.-]+/g) ?? [])];

if (assetPaths.length === 0) throw new Error("No page images found to include in the Netlify deployment.");

for (const assetPath of assetPaths) {
  const response = await fetch(new URL(assetPath, origin));
  if (!response.ok || !response.headers.get("content-type")?.startsWith("image/")) {
    throw new Error(`Could not fetch page image ${assetPath} (HTTP ${response.status}).`);
  }
  const destination = join("dist", assetPath.slice(1));
  await mkdir(dirname(destination), { recursive: true });
  await writeFile(destination, Buffer.from(await response.arrayBuffer()));
  console.log(`Included ${assetPath}`);
}