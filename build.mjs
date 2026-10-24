// Builds the demo into site/: the app (bundled with OpenVessel's host API), and OpenVessel's runtime and
// preview files under runtime/ and preview/. Everything is relative, so site/ can be served under any
// path (GitHub Pages serves it at /openvessel-demo/).
//
//   OPENVESSEL=../openvessel node build.mjs     (OpenVessel must be built first: npm run build there)
import { cpSync, existsSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { build } from 'esbuild';

const root = new URL('.', import.meta.url).pathname;
const ov = resolve(root, process.env.OPENVESSEL ?? '../openvessel');
const out = join(root, 'site');
if (!existsSync(join(ov, 'dist/runtime/runtime.html'))) throw new Error(`OpenVessel isn't built at ${ov} (run npm run build there)`);

rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });
await build({
  entryPoints: { app: join(root, 'src/main.ts') },
  bundle: true,
  format: 'esm',
  target: 'es2022',
  minify: true,
  sourcemap: true,
  outdir: out,
  alias: { openvessel: join(ov, 'src/host/index.ts') },
  loader: { '.css': 'css' },
});
for (const f of ['index.html', 'style.css', 'coi-sw.js', 'favicon.svg']) cpSync(join(root, 'public', f), join(out, f));
cpSync(join(root, 'node_modules/@xterm/xterm/css/xterm.css'), join(out, 'xterm.css'));
cpSync(join(ov, 'dist/runtime'), join(out, 'runtime'), { recursive: true });
cpSync(join(ov, 'dist/preview'), join(out, 'preview'), { recursive: true });
writeFileSync(join(out, '.nojekyll'), '');
console.log(`built ${out}`);
