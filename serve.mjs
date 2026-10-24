// Serves site/ at /openvessel-demo/ with no special headers — like GitHub Pages — to try the demo locally.
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';

const root = new URL('./site', import.meta.url).pathname;
const BASE = '/openvessel-demo/';
const PORT = Number(process.env.PORT ?? 5180);
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json', '.wasm': 'application/wasm', '.svg': 'image/svg+xml', '.tgz': 'application/gzip', '.txt': 'text/plain; charset=utf-8', '.map': 'application/json' };

createServer(async (req, res) => {
  const url = new URL(req.url, 'http://x');
  if (url.pathname === '/' || url.pathname === BASE.slice(0, -1)) {
    res.writeHead(302, { location: BASE }).end();
    return;
  }
  if (!url.pathname.startsWith(BASE)) return res.writeHead(404).end('not found');
  let p = normalize(decodeURIComponent(url.pathname.slice(BASE.length))).replace(/^(\.\.[/\\])+/, '');
  if (p === '.' || p === '' || p.endsWith('/')) p = p.replace(/^\.$/, '') + 'index.html';
  try {
    const file = join(root, p);
    if (!(await stat(file)).isFile()) throw new Error('dir');
    res.writeHead(200, { 'content-type': TYPES[extname(file)] ?? 'application/octet-stream', 'cache-control': 'no-cache' });
    res.end(await readFile(file));
  } catch {
    res.writeHead(404).end('not found');
  }
}).listen(PORT, () => console.log(`http://localhost:${PORT}${BASE}`));
