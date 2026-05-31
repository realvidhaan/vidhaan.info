import fs from "node:fs/promises";
import path from "node:path";

const repoRoot = process.cwd();
const distDir = path.join(repoRoot, "dist");
const distIndexPath = path.join(distDir, "index.html");
const outPath = path.join(repoRoot, "bundle.html");
const publicLogoPath = path.join(repoRoot, "public", "logo.png");
const outLogoPath = path.join(repoRoot, "logo.png");

function extractAttr(html, tagRegex, attrName) {
  const m = html.match(tagRegex);
  if (!m) return null;
  const tag = m[0];
  const attr = tag.match(new RegExp(`${attrName}="([^"]+)"`, "i"));
  return attr?.[1] ?? null;
}

function distPathFromPublicHref(href) {
  // Vite build outputs absolute-ish paths like "/assets/index-xxxx.js"
  const rel = href.startsWith("/") ? href.slice(1) : href;
  return path.join(distDir, rel);
}

const distIndex = await fs.readFile(distIndexPath, "utf8");

const jsHref = extractAttr(distIndex, /<script\b[^>]*type="module"[^>]*src="[^"]+"[^>]*><\/script>/i, "src");
const cssHref = extractAttr(distIndex, /<link\b[^>]*rel="stylesheet"[^>]*href="[^"]+"[^>]*>/i, "href");

if (!jsHref) throw new Error(`Could not find module script tag in ${distIndexPath}`);
if (!cssHref) throw new Error(`Could not find stylesheet link tag in ${distIndexPath}`);

const js = await fs.readFile(distPathFromPublicHref(jsHref), "utf8");
const css = await fs.readFile(distPathFromPublicHref(cssHref), "utf8");

const faviconHref = extractAttr(distIndex, /<link\b[^>]*rel="icon"[^>]*>/i, "href") ?? "/favicon.svg";
const iconsHref = extractAttr(distIndex, /<link\b[^>]*rel="apple-touch-icon"[^>]*>/i, "href");

// Make favicon work when opening bundle.html via file://
const faviconRel = faviconHref.startsWith("/") ? `dist${faviconHref}` : faviconHref;
const iconsRel = iconsHref ? (iconsHref.startsWith("/") ? `dist${iconsHref}` : iconsHref) : null;

let bundled = distIndex;

// IMPORTANT: Use function replacers to avoid `$` sequences in minified
// JS/CSS being interpreted as replace-substitutions (e.g. `$&`, `$1`).
bundled = bundled.replace(
  /<script\b[^>]*type="module"[^>]*src="[^"]+"[^>]*><\/script>\s*/i,
  () => `<script type="module">\n${js}\n</script>\n`
);

bundled = bundled.replace(
  /<link\b[^>]*rel="stylesheet"[^>]*href="[^"]+"[^>]*>\s*/i,
  () => `<style>\n${css}\n</style>\n`
);

bundled = bundled.replace(
  /<link\b[^>]*rel="icon"[^>]*href="[^"]+"[^>]*>/i,
  () => `<link rel="icon" type="image/svg+xml" href="${faviconRel}" />`
);

if (iconsRel) {
  bundled = bundled.replace(
    /<link\b[^>]*rel="apple-touch-icon"[^>]*href="[^"]+"[^>]*>/i,
    () => `<link rel="apple-touch-icon" href="${iconsRel}" />`
  );
}

// When opening bundle.html via file://, absolute URLs like "/logo.png" point to
// the filesystem root. The logo path actually lives inside the inlined JS, so
// rewrite the string itself.
bundled = bundled.replaceAll('"/logo.png"', '"./logo.png"');
bundled = bundled.replaceAll("'/logo.png'", "'./logo.png'");
bundled = bundled.replaceAll("`/logo.png`", "`./logo.png`");

await fs.writeFile(outPath, bundled, "utf8");

// Put logo next to bundle.html so the relative path works.
try {
  await fs.copyFile(publicLogoPath, outLogoPath);
} catch {
  // No logo in public/ yet — that's fine.
}

console.log(`Wrote ${path.relative(repoRoot, outPath)} from dist build.`);

