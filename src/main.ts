// The demo: boots OpenVessel, writes an Astro site into its file system, runs `npm install` and
// `astro dev` in it, and shows the site next to an editor. Editing a file writes it to the in-memory
// file system; Astro's dev server (Node.js in a Web Worker) picks it up and the preview updates.

import { EditorView, basicSetup } from 'codemirror';
import { EditorState, type Extension } from '@codemirror/state';
import { markdown } from '@codemirror/lang-markdown';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { javascript } from '@codemirror/lang-javascript';
import { json } from '@codemirror/lang-json';
import { oneDark } from '@codemirror/theme-one-dark';
import { Terminal } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';
import { OpenVessel, type VesselProcess } from 'openvessel';
import { FIRST_FILE, projectFor } from './template.ts';

const APP = '/home/user/app';
const here = new URL('./', location.href);
const RUNTIME = new URL('runtime/runtime.html', here).href;
const PREVIEW = new URL('preview/', here).href;
const ENV = { ASTRO_TELEMETRY_DISABLED: '1', FORCE_COLOR: '1', NODE_NO_WARNINGS: '1' };

// ---------------------------------------------------------------------------
// words

const ja = navigator.language.startsWith('ja');
const T = ja
  ? {
      tag: 'デモ',
      lead: 'Node.js・npm・Astro が<b>このタブの中で</b>動いています。ファイルを編集すると、右のサイトがその場で作り直されます。処理をするサーバーはありません。',
      files: 'ファイル',
      'hint-files': '<b>src/posts/hello.md</b> を開いて、タイトルや本文を書き換えてみてください。',
      't-terminal': 'ターミナル',
      't-server': 'astro dev',
      't-how': 'しくみ',
      's-editor': 'エディタ',
      's-editor-d': 'このページ',
      's-vfs': 'カーネル',
      's-vfs-d': 'メモリ上のファイルシステム · Web Worker',
      's-node-d': 'astro dev · 専用の Web Worker',
      's-sw': '仮想ポート 4321',
      's-sw-d': 'Service Worker · 実際の通信なし',
      's-preview': 'プレビュー',
      's-preview-d': '右の iframe',
      bootTitle: 'ブラウザの中で Node.js を起動しています',
      b1: 'カーネルを起動', b1d: 'ファイルシステム・プロセス・シェルを持つ Web Worker',
      b2: 'Astro のサイトを書き込む', b2d: 'メモリ上のファイルシステムへ',
      b3: 'npm install', b3d: '本物の npm レジストリから。ネイティブの部品は WebAssembly 版で',
      b4: 'astro dev を起動', b4d: 'Node.js 22 が、プロセスごとの Web Worker で',
      b5: 'プレビューをつなぐ', b5d: '仮想ポート 4321 へ、Service Worker 経由で',
      saved: '保存', bytes: 'バイト', rebuilt: '作り直して表示', packages: 'パッケージ',
      newFile: '新しいファイルのパス（例: src/posts/my-post.md）',
      failed: '起動に失敗しました',
      unsupported: 'このブラウザでは動きません（SharedArrayBuffer が必要です。Chrome・Edge などでお試しください）',
    }
  : {
      tag: 'demo',
      lead: 'Node.js, npm and Astro are running <b>inside this tab</b>. Edit a file — the site on the right rebuilds live. No server does the work.',
      files: 'Files',
      'hint-files': 'Open <b>src/posts/hello.md</b> and change the title or a paragraph.',
      't-terminal': 'Terminal',
      't-server': 'astro dev',
      't-how': 'How it works',
      's-editor': 'Editor',
      's-editor-d': 'this page',
      's-vfs': 'Kernel',
      's-vfs-d': 'in-memory file system · Web Worker',
      's-node-d': 'astro dev · its own Web Worker',
      's-sw': 'Virtual port 4321',
      's-sw-d': 'service worker · no real network',
      's-preview': 'Preview',
      's-preview-d': 'iframe on the right',
      bootTitle: 'Starting Node.js inside your browser',
      b1: 'Boot the kernel', b1d: 'a Web Worker with a file system, processes and a shell',
      b2: 'Write the Astro site', b2d: 'into the in-memory file system',
      b3: 'npm install', b3d: 'from the real npm registry; native parts as WebAssembly',
      b4: 'Start astro dev', b4d: 'Node.js 22, in a Web Worker per process',
      b5: 'Connect the preview', b5d: 'to virtual port 4321, through a service worker',
      saved: 'saved', bytes: 'bytes', rebuilt: 'rebuilt and shown', packages: 'packages',
      newFile: 'Path of the new file (e.g. src/posts/my-post.md)',
      failed: 'Failed to start',
      unsupported: "This browser can't run it (SharedArrayBuffer is required — try Chrome or Edge).",
    };
for (const el of document.querySelectorAll<HTMLElement>('[data-i18n]')) {
  const v = (T as Record<string, string>)[el.dataset.i18n!];
  if (v) el.innerHTML = v;
}
if (ja) document.documentElement.lang = 'ja';

const $ = <E extends HTMLElement = HTMLElement>(id: string) => document.getElementById(id) as E;

// ---------------------------------------------------------------------------
// boot steps (shown where the preview will be)

const steps = [
  ['b1', 'b1d'],
  ['b2', 'b2d'],
  ['b3', 'b3d'],
  ['b4', 'b4d'],
  ['b5', 'b5d'],
] as const;
const bootBox = $('boot');
bootBox.innerHTML = `<h2>${T.bootTitle}</h2>` + steps.map(([k, d], i) => `<div class="step" id="step${i}"><span class="mark"></span><div>${T[k]}<small>${T[d]}</small></div><span class="ms"></span></div>`).join('');
let stepStart = 0;
// which parts of the "How it works" picture each boot step brings up
const STEP_STAGES = [['vfs'], ['editor', 'vfs'], ['vfs'], ['node'], ['sw', 'preview']];
function step(i: number, state: 'run' | 'done' | 'fail', note = '') {
  if (state === 'done') light(...STEP_STAGES[i]);
  const el = $(`step${i}`);
  el.className = `step ${state}`;
  if (state === 'run') stepStart = performance.now();
  else el.querySelector('.ms')!.textContent = note || `${((performance.now() - stepStart) / 1000).toFixed(1)} s`;
}

// ---------------------------------------------------------------------------
// terminals

const termTheme = { background: '#0a0e1a', foreground: '#e5e7eb', cursor: '#38bdf8', selectionBackground: '#334155' };
function makeTerm(el: HTMLElement) {
  const term = new Terminal({ fontSize: 12.5, fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', cursorBlink: true, theme: termTheme, scrollback: 5000 });
  const fit = new FitAddon();
  term.loadAddon(fit);
  term.open(el);
  return { term, fit };
}
const shellTerm = makeTerm($('term'));
const serverTerm = makeTerm($('server-term'));
const fitAll = () => {
  for (const t of [shellTerm, serverTerm]) if (t.term.element?.offsetParent) t.fit.fit();
};
new ResizeObserver(fitAll).observe($('bottom'));
fitAll();

function pipe(proc: VesselProcess, term: Terminal, onText?: (s: string) => void) {
  (async () => {
    const reader = proc.output.getReader();
    for (;;) {
      const { value, done } = await reader.read();
      if (done) break;
      term.write(value);
      onText?.(value);
    }
  })();
}

// tabs
const tabs = document.querySelectorAll<HTMLButtonElement>('[role=tab]');
function showTab(name: string) {
  for (const t of tabs) t.classList.toggle('active', t.dataset.tab === name);
  for (const b of document.querySelectorAll<HTMLElement>('.tab-body')) b.hidden = b.id !== `tab-${name}`;
  requestAnimationFrame(fitAll);
}
for (const t of tabs) t.onclick = () => showTab(t.dataset.tab!);

// ---------------------------------------------------------------------------
// "how it works": light up the stages as an edit travels through them

const activity = $('activity');
function log(html: string) {
  const li = document.createElement('li');
  li.innerHTML = `<span>${new Date().toLocaleTimeString()}</span> ${html}`;
  activity.prepend(li);
  while (activity.children.length > 40) activity.lastChild!.remove();
}
function light(...ids: string[]) {
  for (const id of ids) {
    const el = $(`st-${id}`);
    el.classList.add('lit');
    setTimeout(() => el.classList.remove('lit'), 900);
  }
}

// ---------------------------------------------------------------------------
// editor

const langs: Record<string, () => Extension> = { md: markdown, astro: html, html, css, js: javascript, mjs: javascript, ts: () => javascript({ typescript: true }), json };
let current = '';
let saveTimer = 0;
let pendingSave: { path: string; at: number } | null = null;
const editor = new EditorView({ parent: $('editor') });
const saveState = $('save-state');

function stateFor(path: string, text: string) {
  const ext = path.split('.').pop()!;
  return EditorState.create({
    doc: text,
    extensions: [
      basicSetup,
      oneDark,
      EditorView.lineWrapping,
      langs[ext]?.() ?? [],
      EditorView.updateListener.of((u) => {
        if (!u.docChanged) return;
        saveState.textContent = '●';
        saveState.className = 'saving';
        clearTimeout(saveTimer);
        saveTimer = window.setTimeout(() => save(path, u.state.doc.toString()), 250);
      }),
    ],
  });
}

let vessel: OpenVessel;

async function open(path: string) {
  current = path;
  const text = await vessel.fs.readFile(`${APP}/${path}`, 'utf8');
  editor.setState(stateFor(path, text));
  $('file-name').textContent = path;
  saveState.textContent = '';
  for (const li of $('tree').querySelectorAll<HTMLElement>('li[data-path]')) li.classList.toggle('active', li.dataset.path === path);
}

async function save(path: string, text: string) {
  const at = performance.now();
  await vessel.fs.writeFile(`${APP}/${path}`, text);
  saveState.textContent = '✓';
  saveState.className = 'saved';
  pendingSave = { path, at };
  light('editor', 'vfs');
  log(`✎ <b>${T.saved}</b> ${path} (${new TextEncoder().encode(text).length} ${T.bytes}) → /home/user/app`);
}

/** The preview changed (reloaded, or patched by HMR) after a save: the edit made the whole trip. */
function previewUpdated() {
  const p = pendingSave;
  if (!p) return;
  pendingSave = null;
  light('node', 'sw');
  setTimeout(() => light('preview'), 150);
  log(`⚡ <b>${T.rebuilt}</b> ${p.path} <span class="ms">${Math.round(performance.now() - p.at)} ms</span>`);
}

/** Watches the preview document (same origin here) for reloads and HMR patches. */
function watchPreview(frame: HTMLIFrameElement) {
  let observer: MutationObserver | null = null;
  const attach = () => {
    observer?.disconnect();
    const doc = frame.contentDocument;
    if (!doc) return; // a preview on another origin: only reloads are seen
    observer = new MutationObserver(() => previewUpdated());
    observer.observe(doc.documentElement, { subtree: true, childList: true, characterData: true, attributes: true });
  };
  frame.addEventListener('load', () => {
    previewUpdated();
    attach();
  });
}

// ---------------------------------------------------------------------------
// file explorer

const SKIP = new Set(['node_modules', '.astro', 'dist', '.git', 'package-lock.json']);
async function listTree(dir = '', depth = 0): Promise<{ path: string; name: string; dir: boolean; depth: number }[]> {
  const entries: { name: string; type: string }[] = await vessel.fs.readdir(dir ? `${APP}/${dir}` : APP, { withFileTypes: true });
  entries.sort((a, b) => Number(b.type === 'dir') - Number(a.type === 'dir') || a.name.localeCompare(b.name));
  const out: { path: string; name: string; dir: boolean; depth: number }[] = [];
  for (const e of entries) {
    if (SKIP.has(e.name)) continue;
    const path = dir ? `${dir}/${e.name}` : e.name;
    out.push({ path, name: e.name, dir: e.type === 'dir', depth });
    if (e.type === 'dir') out.push(...(await listTree(path, depth + 1)));
  }
  return out;
}
async function renderTree(flash?: string) {
  const items = await listTree();
  const tree = $('tree');
  tree.innerHTML = '';
  for (const it of items) {
    const li = document.createElement('li');
    li.style.paddingLeft = `${10 + it.depth * 14}px`;
    li.textContent = `${it.dir ? '▾ ' : ''}${it.name}`;
    if (it.dir) li.className = 'dir';
    else {
      li.dataset.path = it.path;
      if (it.path === current) li.classList.add('active');
      if (it.path === flash) li.classList.add('flash');
      li.onclick = () => open(it.path);
    }
    tree.appendChild(li);
  }
}

// ---------------------------------------------------------------------------
// boot

async function main() {
  if (!crossOriginIsolated) {
    // the page reloads itself once with coi-sw.js; if that didn't help, the browser can't do it
    if (sessionStorage.getItem('ov-coi-reload') || !('serviceWorker' in navigator)) bootBox.innerHTML = `<h2>${T.unsupported}</h2>`;
    return;
  }

  step(0, 'run');
  vessel = await OpenVessel.boot({
    runtimeUrl: RUNTIME,
    previewUrl: PREVIEW,
    network: { mode: 'allowlist', presets: ['npm', 'fonts', 'cdn'] },
    onPermissionRequest: (req) => {
      log(`🚫 ${req.host} (network policy)`);
      return 'deny';
    },
    locale: ja ? 'ja' : 'en',
  });
  (window as any).vessel = vessel;
  step(0, 'done');

  step(1, 'run');
  // run processes on OpenVessel's ported Node.js runtime
  await vessel.mount({ node: 'port' }, { path: '/etc/openvessel' });
  await vessel.mount(projectFor(navigator.language), { path: APP });
  await renderTree();
  await open(FIRST_FILE);
  step(1, 'done');

  // the shell in the Terminal tab
  const shell = await vessel.spawn('/bin/sh', ['-i'], { cwd: APP, env: ENV, terminal: { cols: shellTerm.term.cols, rows: shellTerm.term.rows } });
  pipe(shell, shellTerm.term);
  shellTerm.term.onData((d) => shell.write(d));
  shellTerm.term.onResize(({ cols, rows }) => shell.resize(cols, rows));
  for (const b of document.querySelectorAll<HTMLButtonElement>('[data-cmd]')) {
    b.onclick = () => {
      showTab('terminal');
      shell.write(b.dataset.cmd + '\r');
      shellTerm.term.focus();
    };
  }
  vessel.exec('node -p process.version', { cwd: APP }).then((r) => ($('node-ver').textContent = `Node.js ${r.output.trim()}`));

  // npm install and astro dev in the astro dev tab
  step(2, 'run');
  serverTerm.term.writeln('\x1b[2m$ npm install\x1b[0m');
  const size = { cols: serverTerm.term.cols || 100, rows: serverTerm.term.rows || 12 };
  const install = await vessel.spawn('npm', ['install'], { cwd: APP, env: ENV, terminal: size });
  let installOut = '';
  pipe(install, serverTerm.term, (s) => (installOut += s));
  if ((await install.exit) !== 0) throw new Error('npm install failed');
  const added = /added (\d+) packages/.exec(installOut.replace(/\x1b\[[0-9;]*m/g, ''));
  step(2, 'done', added ? `${added[1]} ${T.packages} · ${((performance.now() - stepStart) / 1000).toFixed(1)} s` : '');

  step(3, 'run');
  const ready = new Promise<number>((resolve) => vessel.on('server-ready', ({ port }) => resolve(port)));
  serverTerm.term.writeln('\x1b[2m$ npm run dev\x1b[0m');
  const dev = await vessel.spawn('npm', ['run', 'dev'], { cwd: APP, env: ENV, terminal: size });
  pipe(dev, serverTerm.term);
  const port = await ready;
  step(3, 'done');

  step(4, 'run');
  $('preview-addr').textContent = `localhost:${port}/`;
  const frame = await vessel.createPreview(port, { container: $('preview') });
  watchPreview(frame);
  frame.addEventListener('load', () => {
    if (bootBox.isConnected) {
      step(4, 'done');
      setTimeout(() => bootBox.remove(), 600);
    }
  });
  $('server-dot').classList.add('on');
  $('reload').onclick = () => (frame.src = frame.src);
  log(`▶ <b>astro dev</b> → localhost:${port}`);

  // the explorer follows the file system (files made in the terminal show up too)
  let treeTimer = 0;
  await vessel.fs.watch(APP, (ev) => {
    const rel = ev.path.slice(APP.length + 1);
    if (!rel || rel.split('/').some((p) => SKIP.has(p))) return;
    clearTimeout(treeTimer);
    treeTimer = window.setTimeout(() => renderTree(ev.type === 'rename' ? rel : undefined), 150);
  });

  $('new-file').onclick = async () => {
    const path = prompt(T.newFile, 'src/posts/my-post.md');
    if (!path) return;
    const name = path.split('/').pop()!.replace(/\.\w+$/, '');
    await vessel.fs.mkdir(`${APP}/${path.split('/').slice(0, -1).join('/')}`, { recursive: true });
    await vessel.fs.writeFile(`${APP}/${path}`, path.endsWith('.md') ? `---\ntitle: ${name}\nemoji: ✨\norder: 9\n---\n\nWritten in the browser.\n` : '');
    await renderTree(path);
    await open(path);
  };
}

main().catch((e) => {
  console.error(e);
  const running = bootBox.querySelector('.step.run');
  if (running) running.className = 'step fail';
  bootBox.insertAdjacentHTML('beforeend', `<p style="color:#f87171">${T.failed}: ${String(e?.message ?? e)}</p>`);
});
