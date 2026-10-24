// Publishes site/ to the gh-pages branch of this repository's origin (GitHub Pages serves it).
//   npm run build && node deploy.mjs
import { execFileSync } from 'node:child_process';
import { existsSync, mkdtempSync, rmSync, cpSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const root = new URL('.', import.meta.url).pathname;
const site = join(root, 'site');
if (!existsSync(join(site, 'index.html'))) throw new Error('site/ is missing: run npm run build first');
const git = (args, cwd) => execFileSync('git', args, { cwd, stdio: ['ignore', 'pipe', 'inherit'], encoding: 'utf8' }).trim();
const origin = git(['remote', 'get-url', 'origin'], root);
const rev = git(['rev-parse', '--short', 'HEAD'], root);

const work = mkdtempSync(join(tmpdir(), 'ov-pages-'));
cpSync(site, work, { recursive: true });
git(['init', '-q', '-b', 'gh-pages'], work);
git(['add', '-A'], work);
git(['commit', '-q', '-m', `Deploy ${rev}`], work);
git(['push', '-f', origin, 'gh-pages'], work);
rmSync(work, { recursive: true, force: true });
console.log(`published site/ (${rev}) to ${origin} gh-pages`);
