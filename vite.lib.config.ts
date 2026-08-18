import path from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Library build — produces the publishable npm artifacts.
 *
 * Because the `index` and `hooks` entries both import the shared
 * `render` module, Rollup emits a shared chunk. ESM and CJS versions
 * of that chunk have different contents, so the two formats MUST be
 * built in separate passes (otherwise the second overwrites the first).
 * The build script therefore invokes Vite twice, selecting the format
 * via the `LIB_FORMAT` env var:
 *
 *   LIB_FORMAT=es  → dist/lib/*.mjs  (+ shared render.mjs)
 *   LIB_FORMAT=cjs → dist/lib/*.cjs  (+ shared render.cjs)
 *
 * TypeScript declarations are emitted separately by
 * `tsc -p tsconfig.lib.json` (see the build:types script).
 *
 * `katex` and `react` are peer dependencies and are intentionally NOT
 * bundled — consumers provide their own copies.
 */
const format = (process.env.LIB_FORMAT ?? "es") as "es" | "cjs";
const isEsm = format === "es";
const entryExt = isEsm ? "mjs" : "cjs";
// Shared chunks get a format-specific extension so the ESM and CJS
// builds never overwrite each other's `render` chunk.
const chunkExt = isEsm ? "mjs" : "cjs";

export default defineConfig({
  build: {
    outDir: "dist/lib",
    // Only the first (ESM) pass clears the output directory.
    emptyOutDir: isEsm,
    sourcemap: true,
    minify: false,
    lib: {
      entry: {
        index: path.resolve(__dirname, "src/lib/katex-arabic/index.ts"),
        hooks: path.resolve(__dirname, "src/lib/katex-arabic/hooks.ts"),
      },
      formats: [format],
      fileName: (_fmt, entryName) => `${entryName}.${entryExt}`,
    },
    rollupOptions: {
      external: ["katex", "react", "react/jsx-runtime"],
      output: {
        // Deterministic, format-scoped names for shared chunks.
        chunkFileNames: `[name].${chunkExt}`,
        // The index entry mixes named + default exports; "named" keeps
        // both accessible without the chunk.default indirection.
        exports: "named",
      },
    },
  },
});