/**
 * scripts/build-lib.mjs
 * Cross-platform library build driver.
 *
 * Runs the Vite library build twice (once per module format) so the
 * shared `render` chunk gets a format-specific filename and the two
 * passes never overwrite each other. Then copies the standalone
 * stylesheet into dist/lib.
 *
 * Usage: node scripts/build-lib.mjs
 */

import { execSync } from 'node:child_process';
import { copyFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

function run(command, env = {}) {
  execSync(command, {
    cwd: root,
    stdio: 'inherit',
    env: { ...process.env, ...env },
  });
}

// 1. ESM build (clears dist/lib first).
run('npx vite build --config vite.lib.config.ts', { LIB_FORMAT: 'es' });

// 2. CJS build (appends to dist/lib).
run('npx vite build --config vite.lib.config.ts', { LIB_FORMAT: 'cjs' });

// 3. Copy the standalone stylesheet.
const cssSrc = resolve(root, 'src/katex-arabic.css');
const cssDest = resolve(root, 'dist/lib/katex-arabic.css');
mkdirSync(dirname(cssDest), { recursive: true });
copyFileSync(cssSrc, cssDest);
console.log('✓ copied katex-arabic.css → dist/lib/katex-arabic.css');
