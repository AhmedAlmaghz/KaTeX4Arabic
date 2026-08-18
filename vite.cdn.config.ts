import path from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Single-file (bundle) build — minified, self-contained, KaTeX INSIDE.
 *
 * This is the complement of the multi-file npm build (vite.lib.config.ts,
 * where `katex` is a peer dependency). Here katex is bundled on purpose so
 * consumers can use the whole library as ONE JavaScript file (plus ONE CSS
 * file) with zero configuration:
 *
 *   - UMD (`SINGLE_FORMAT=umd`, default) → dist/cdn/katex-arabic.min.js
 *     works as a classic <script> tag (global `window.KaTeXArabic`) AND in
 *     bundlers. The build script copies it to `katex-arabic.min.cjs` so
 *     plain Node `require()` picks the right extension.
 *
 *   - ES  (`SINGLE_FORMAT=es`)            → dist/cdn/katex-arabic.min.mjs
 *     a single-file ESM module with the same `default` namespace export.
 *
 * Both expose the same public namespace object (default export), which
 * mirrors the `katex` API:
 *
 *   KaTeXArabic.renderToString('x^2')
 *   KaTeXArabic.render(el, 'x^2')
 *
 * React hooks are intentionally NOT included — DOM-only. React users
 * install the npm package and use `katex-arabic/hooks`.
 */
const singleFormat = (process.env.SINGLE_FORMAT ?? "umd") as "umd" | "es";

export default defineConfig({
  build: {
    outDir: "dist/cdn",
    target: "es2018",
    // The directory is exclusively owned by this build; only the first
    // (UMD) pass clears it so consecutive passes never delete each other.
    emptyOutDir: singleFormat === "umd",
    sourcemap: false,
    minify: "esbuild",
    lib: {
      entry: path.resolve(__dirname, "src/lib/katex-arabic/cdn.ts"),
      name: "KaTeXArabic",
      formats: [singleFormat],
      fileName: () =>
        singleFormat === "es" ? "katex-arabic.min.mjs" : "katex-arabic.min.js",
    },
    rollupOptions: {
      // Nothing is external here: katex is bundled on purpose so the
      // single file is 100% self-contained.
      output: {
        // Expose the default namespace object directly (for UMD it becomes
        // the global / module.exports; for ES the default export).
        exports: "default",
      },
    },
  },
});