import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
//
// Demo-app build: emits index.html + a separate JS bundle + a separate
// CSS file (no inlining). The publishable library is built with
// `vite.lib.config.ts` (npm run build:lib).
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    outDir: "dist",
    // The demo shares the `dist/` root with the publishable library
    // (`dist/lib/`, built by vite.lib.config.ts). Vite's default
    // `emptyOutDir: true` would wipe the whole `dist/` tree — including
    // `dist/lib/` — every time the demo builds. Because the demo emits
    // deterministic, unhashed asset names (see output.*FileNames below),
    // re-building always overwrites the same files, so it is safe to
    // skip the clean and leave `dist/lib/` untouched.
    emptyOutDir: false,
    rollupOptions: {
      output: {
        // Deterministic, unhashed asset names.
        entryFileNames: "assets/index.js",
        chunkFileNames: "assets/[name].js",
        assetFileNames: (info) =>
          info.names?.some((n) => n.endsWith(".css"))
            ? "assets/index.css"
            : "assets/[name][extname]",
      },
    },
  },
});
