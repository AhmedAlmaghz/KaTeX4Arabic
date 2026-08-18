/**
 * scripts/build-cdn.mjs
 * Cross-platform single-file bundle build.
 *
 * Produces the "one JS + one CSS" artifacts in dist/cdn — a drop-in pair
 * that needs ZERO configuration on the consumer side, whether the file is
 * served from jsDelivr, unpkg, your own website, or imported from npm:
 *
 *   1. dist/cdn/katex-arabic.min.js   — UMD bundle (browser global
 *      `window.KaTeXArabic`, plus bundler/CommonJS support). KaTeX is
 *      BUNDLED INSIDE, so no separate KaTeX <script> is required.
 *   2. dist/cdn/katex-arabic.min.cjs  — identical UMD for plain Node
 *      `require()` (the `.js` would be treated as ESM because
 *      package.json has "type": "module").
 *   3. dist/cdn/katex-arabic.min.mjs  — single-file ESM module with the
 *      same `default` namespace export, for `import` without a bundler.
 *   4. dist/cdn/katex-arabic.min.css  — ONE stylesheet: katex.min.css
 *      (fonts pointed at the jsDelivr npm CDN so they always resolve)
 *      concatenated with our minified Arabic overrides.
 *
 * A self-check loads all three JS flavors and asserts the public API
 * works, so a broken bundle fails the build.
 *
 * Usage: node scripts/build-cdn.mjs
 */

import { execSync } from "node:child_process";
import { readFileSync, writeFileSync, copyFileSync, rmSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve, basename } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

function run(command, env = {}) {
  execSync(command, {
    cwd: root,
    stdio: "inherit",
    env: { ...process.env, ...env },
  });
}

// ─────────────────────────────────────────────────────────────
// 1. JS bundles — UMD (.js + .cjs) and single-file ESM (.mjs).
// ─────────────────────────────────────────────────────────────
// UMD pass (also clears dist/cdn). Produces katex-arabic.min.js.
run("npx vite build --config vite.cdn.config.ts", { SINGLE_FORMAT: "umd" });

// Same UMD payload under a .cjs name so bare Node require() works
// (package "type": "module" would mis-parse a .js as ESM).
const umd = resolve(root, "dist/cdn/katex-arabic.min.js");
copyFileSync(umd, resolve(root, "dist/cdn/katex-arabic.min.cjs"));
console.log("✓ copied katex-arabic.min.js → katex-arabic.min.cjs");

// Single-file ESM pass.
run("npx vite build --config vite.cdn.config.ts", { SINGLE_FORMAT: "es" });

// ─────────────────────────────────────────────────────────────
// 2. CSS bundle — katex.min.css + katex-arabic.css, one file.
// ─────────────────────────────────────────────────────────────
const katexCssPath = resolve(root, "node_modules/katex/dist/katex.min.css");
const katexPkg = JSON.parse(
  readFileSync(resolve(root, "node_modules/katex/package.json"), "utf8"),
);
const katexVersion = katexPkg.version;

// Our own package version — the single source of truth that the
// namespace's VERSION constant must always match (see self-check).
const ourPkg = JSON.parse(
  readFileSync(resolve(root, "package.json"), "utf8"),
);
const ourVersion = ourPkg.version;

// katex.min.css references its fonts as relative urls (`fonts/...`).
// The published files on jsDelivr live in the repo, not next to the
// CSS, so rewrite those to the canonical npm CDN location to keep
// the single-CSS-file promise (no font folder shipment needed).
const fontsBase = `https://cdn.jsdelivr.net/npm/katex@${katexVersion}/dist/fonts/`;
const katexCss = readFileSync(katexCssPath, "utf8").replace(
  /url\(fonts\//g,
  () => `url(${fontsBase}`,
);

// Minify our own stylesheet through the esbuild CLI (ships with Vite).
const kaTmp = resolve(root, "dist/cdn/_katex-arabic.tmp.css");
run(`npx esbuild src/katex-arabic.css --minify --outfile="${kaTmp}"`);
const ourCss = readFileSync(kaTmp, "utf8");
rmSync(kaTmp, { force: true });

const banner =
  `/*!\n` +
  ` * katex-arabic CDN bundle — katex-arabic.css\n` +
  ` * Includes: KaTeX v${katexVersion} (katex.min.css) + katex-arabic overrides.\n` +
  ` * Repository: https://github.com/AhmedAlmaghz/KaTeX4Arabic\n` +
  ` * License: MIT\n` +
  ` */\n`;

const cssDest = resolve(root, "dist/cdn/katex-arabic.min.css");
writeFileSync(cssDest, banner + katexCss + "\n" + ourCss, "utf8");

// ─────────────────────────────────────────────────────────────
// 3. Self-verification — load every built JS flavor and assert the
//    public API really works. The build fails loudly if a bundle is
//    broken (e.g. a bad katex interop after an upgrade).
// ─────────────────────────────────────────────────────────────
{
  const { readFileSync: rf } = await import("node:fs");
  const { runInNewContext, createContext } = await import("node:vm");
  const { pathToFileURL } = await import("node:url");
  const { createRequire } = await import("node:module");

  const requires = createRequire(import.meta.url);
  const asserts = [];

  // ── 3a. Browser global — evaluate the UMD in a sandbox where the
  // vm context global behaves like `window` (as it does in a browser).
  const umdCode = rf(resolve(root, "dist/cdn/katex-arabic.min.js"), "utf8");
  const sandbox = { document: {} };
  sandbox.window = sandbox;
  sandbox.self = sandbox;
  runInNewContext(umdCode, createContext(sandbox));
  const browserNs = sandbox.window.KaTeXArabic;
  asserts.push([
    "browser global window.KaTeXArabic",
    !!browserNs && typeof browserNs.renderToString === "function",
  ]);

  // ── 3b. CommonJS — real Node require of the .cjs artifact.
  const cjsPath = resolve(root, "dist/cdn/katex-arabic.min.cjs");
  const cjsNs = requires(cjsPath);
  asserts.push([
    "CommonJS require(.cjs) exports default namespace",
    !!cjsNs && typeof cjsNs.renderToString === "function",
  ]);

  // ── 3c. ESM — real dynamic import of the single-file .mjs artifact.
  const mjsPath = resolve(root, "dist/cdn/katex-arabic.min.mjs");
  const esmModule = await import(pathToFileURL(mjsPath).href);
  const esmNs = esmModule.default;
  asserts.push([
    "ESM import(.mjs) default namespace",
    !!esmNs && typeof esmNs.renderToString === "function",
  ]);

  // The namespace used for the functional assertions below.
  const ns = esmNs ?? browserNs ?? cjsNs;

  const html = ns.renderToString("\\sin^2(x) + \\cos^2(x) = 1");
  asserts.push(
    ["katex-arabic wrapper class", html.includes("katex-arabic")],
    ["Arabic-Indic digit ١", html.includes("١")],
    ["translated function جا", html.includes("جا")],
    ["RTL direction", html.includes('dir="rtl"')],
    ["full namespace (VERSION)", ns.VERSION === ourVersion],
    ["toArabicNumerals", ns.toArabicNumerals("123") === "١٢٣"],
    [
      "translateFunctions (LaTeX)",
      ns.translateFunctions("\\sin(x)") === "\\operatorname{جا}(x)",
    ],
    ["isArabicDigit", ns.isArabicDigit("٥") === true],
    ["formatArabicNumber", ns.formatArabicNumber("1234") === "١٢٣٤"],
  );

  for (const [label, ok] of asserts) {
    if (!ok) throw new Error(`bundle self-check failed: ${label}`);
  }
  console.log(`✓ bundle self-check passed (${asserts.length} asserts)`);
}

// ─────────────────────────────────────────────────────────────
// Summary
// ─────────────────────────────────────────────────────────────
const summary = [
  "dist/cdn/katex-arabic.min.js",
  "dist/cdn/katex-arabic.min.cjs",
  "dist/cdn/katex-arabic.min.mjs",
  "dist/cdn/katex-arabic.min.css",
];
console.log("✓ bundle ready:");
for (const file of summary) {
  console.log(`  ${file}  (${basename(file)})`);
}