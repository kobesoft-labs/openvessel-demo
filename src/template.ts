// The Astro site the demo starts with: an ordinary project (OpenVessel's preview maps it to the
// path the demo is served under).

import LOCKFILE from './project-lock.txt';

export const PROJECT: Record<string, string> = {
  'package-lock.json': LOCKFILE,

  'package.json': JSON.stringify(
    {
      name: 'hello-openvessel',
      type: 'module',
      version: '0.0.1',
      private: true,
      scripts: { dev: 'astro dev', build: 'astro build', preview: 'astro preview' },
      // Everything here is pinned (the lockfile below pins the rest), so the demo installs the same tree it was
      // tested with. @napi-rs/wasm-runtime 1.2.6 needs emnapi 2.0.0-beta.2, but rolldown's WebAssembly build pins
      // emnapi 2.0.0-alpha.5: with 1.2.6 rolldown can't load.
      dependencies: { astro: '7.4.2' },
      overrides: { '@napi-rs/wasm-runtime': '1.2.5' },
    },
    null,
    2,
  ) + '\n',

  'astro.config.mjs': `import { defineConfig } from 'astro/config';

export default defineConfig({
  devToolbar: { enabled: false },
});
`,

  'README.md': `# hello-openvessel

An ordinary Astro site. Nothing about it knows it runs in a browser tab.

- \`src/posts/*.md\` — the posts on the home page (edit them!)
- \`src/styles/global.css\` — try changing \`--accent\`
- \`src/pages/index.astro\` — the page itself
`,

  'src/posts/hello.md': `---
title: Hello from inside your browser
emoji: 👋
order: 1
---

This page was rendered by **Astro**, running on **Node.js**, inside **this browser tab**.

Change this paragraph in the editor and watch it update on the right —
the file is written to an in-memory file system, Astro's dev server notices,
and the preview reloads. No server is involved.

- Try changing the \`title\` above.
- Try another \`emoji\`.
- Add a new file in \`src/posts/\` from the terminal:
  \`echo "# New post" > src/posts/new.md\`
`,

  'src/posts/what-is-running.md': `---
title: What is running right now?
emoji: 🧩
order: 2
---

| Piece | Where it runs |
|---|---|
| A small kernel: files, processes, pipes | a Web Worker |
| \`npm install\` (from the real npm registry) | the kernel |
| Node.js 22 — its own \`lib/\`, unmodified | one Web Worker per process |
| \`astro dev\` and Vite | that Node.js |
| \`localhost:4321\` | a virtual port, reached through a service worker |

Open the **Terminal** tab below and type \`ps\` to see the processes.
`,

  'src/posts/try-the-terminal.md': `---
title: Try the terminal
emoji: ⌨️
order: 3
---

The terminal below is a real shell with real Node.js:

\`\`\`sh
node -e "console.log(require('os').platform(), process.version)"
ls node_modules | wc -l
npx astro build && ls dist
\`\`\`
`,

  'src/styles/global.css': `:root {
  /* try another color: #f97316, #22c55e, #e11d48 … */
  --accent: #6366f1;
  --bg: #f8fafc;
  --text: #0f172a;
}

* { box-sizing: border-box; }
body {
  margin: 0;
  font: 16px/1.6 ui-sans-serif, system-ui, -apple-system, 'Hiragino Sans', sans-serif;
  background: var(--bg);
  color: var(--text);
}
main { max-width: 720px; margin: 0 auto; padding: 32px 20px 64px; }
.hero {
  padding: 28px;
  border-radius: 16px;
  color: #fff;
  background: linear-gradient(135deg, var(--accent), color-mix(in srgb, var(--accent) 55%, #000));
}
.hero h1 { margin: 0 0 8px; font-size: 30px; line-height: 1.2; }
.meta { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 14px; }
.meta span { padding: 2px 10px; border-radius: 999px; background: rgb(255 255 255 / .18); font: 13px ui-monospace, monospace; }
article { margin-top: 20px; padding: 20px 24px; border-radius: 14px; background: #fff; box-shadow: 0 1px 3px rgb(0 0 0 / .08); }
article h2 { margin: 0 0 8px; }
article .emoji { margin-right: 8px; }
table { border-collapse: collapse; width: 100%; font-size: 14px; }
th, td { text-align: left; padding: 6px 8px; border-bottom: 1px solid #e2e8f0; }
code { padding: 1px 5px; border-radius: 4px; background: #eef2ff; font-size: .9em; }
pre { padding: 12px; border-radius: 8px; background: #0f172a; color: #e2e8f0; overflow: auto; }
pre code { background: none; padding: 0; }
button.counter { margin-top: 12px; padding: 8px 14px; border: 0; border-radius: 10px; background: #fff; color: var(--accent); font-weight: 600; cursor: pointer; }
footer { margin-top: 28px; color: #64748b; font-size: 13px; }
`,

  'src/pages/index.astro': `---
import '../styles/global.css';
import os from 'node:os';

// rendered by Node.js — the one running inside this browser tab
const posts = Object.values(import.meta.glob('../posts/*.md', { eager: true }))
  .sort((a: any, b: any) => (a.frontmatter.order ?? 0) - (b.frontmatter.order ?? 0));
const renderedAt = new Date().toLocaleTimeString();
---
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Hello from OpenVessel</title>
  </head>
  <body>
    <main>
      <section class="hero">
        <h1>An Astro site, built in your browser</h1>
        <p>Every file here lives in memory in this tab. Edit one and this page follows.</p>
        <div class="meta">
          <span>Node {process.version}</span>
          <span>{os.platform()} / {os.arch()}</span>
          <span>rendered {renderedAt}</span>
        </div>
        <button class="counter" id="counter">clicked 0 times</button>
      </section>

      {posts.map((post: any) => (
        <article>
          <h2><span class="emoji">{post.frontmatter.emoji}</span>{post.frontmatter.title}</h2>
          <post.Content />
        </article>
      ))}

      <footer>Made with Astro · running on OpenVessel</footer>
    </main>
    <script>
      // client-side JavaScript works as usual
      let n = 0;
      const b = document.getElementById('counter')!;
      b.addEventListener('click', () => (b.textContent = \`clicked \${++n} time\${n === 1 ? '' : 's'}\`));
    </script>
  </body>
</html>
`,
};

export const FIRST_FILE = 'src/posts/hello.md';

/** The same site in Japanese (chosen when the browser's language is Japanese). */
const JA: Record<string, string> = {
  'src/posts/hello.md': `---
title: ブラウザの中からこんにちは
emoji: 👋
order: 1
---

このページは **Astro** が描いています。Astro は **Node.js** の上で動き、その Node.js は**このブラウザのタブの中**で動いています。

左のエディタでこの段落を書き換えてみてください。右がすぐに変わります。
ファイルはメモリ上のファイルシステムに書かれ、Astro の開発サーバーがそれに気づき、
プレビューが読み込み直されます。サーバーは関わっていません。

- 上の \`title\` を変えてみる
- \`emoji\` を別の絵文字にしてみる
- 下のターミナルで \`src/posts/\` に新しいファイルを作ってみる:
  \`echo "# 新しい記事" > src/posts/new.md\`
`,
  'src/posts/what-is-running.md': `---
title: いま何が動いている？
emoji: 🧩
order: 2
---

| 部品 | 動いている場所 |
|---|---|
| 小さなカーネル: ファイル・プロセス・パイプ | Web Worker |
| \`npm install\`（本物の npm レジストリから） | カーネル |
| Node.js 22（自身の \`lib/\` を書き換えずに） | プロセスごとの Web Worker |
| \`astro dev\` と Vite | その Node.js |
| \`localhost:4321\` | 仮想ポート。Service Worker 経由でつながる |

下の**ターミナル**のタブで \`ps\` と打つと、プロセスが見られます。
`,
  'src/posts/try-the-terminal.md': `---
title: ターミナルを使ってみる
emoji: ⌨️
order: 3
---

下のターミナルは、本物のシェルと本物の Node.js です。

\`\`\`sh
node -e "console.log(require('os').platform(), process.version)"
ls node_modules | wc -l
npx astro build && ls dist
\`\`\`
`,
};

const JA_PAGE: [string, string][] = [
  ['<html lang="en">', '<html lang="ja">'],
  ['<title>Hello from OpenVessel</title>', '<title>OpenVessel からこんにちは</title>'],
  ['<h1>An Astro site, built in your browser</h1>', '<h1>ブラウザの中で作った Astro のサイト</h1>'],
  ['<p>Every file here lives in memory in this tab. Edit one and this page follows.</p>', '<p>ここのファイルは、すべてこのタブのメモリの中にあります。どれかを編集すると、このページが追いかけます。</p>'],
  ['<span>rendered {renderedAt}</span>', '<span>描画 {renderedAt}</span>'],
  ['clicked 0 times', '0 回クリック'],
  ['<footer>Made with Astro · running on OpenVessel</footer>', '<footer>Astro で作成 · OpenVessel の上で動作</footer>'],
  ["(b.textContent = `clicked ${++n} time${n === 1 ? '' : 's'}`)", '(b.textContent = `${++n} 回クリック`)'],
];

export function projectFor(lang: string): Record<string, string> {
  if (!lang.startsWith('ja')) return PROJECT;
  let page = PROJECT['src/pages/index.astro'];
  for (const [en, ja] of JA_PAGE) page = page.replace(en, ja);
  return { ...PROJECT, ...JA, 'src/pages/index.astro': page };
}
