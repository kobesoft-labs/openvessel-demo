# OpenVessel demo

An [Astro](https://astro.build) site you can edit in the browser — with Node.js, npm and Astro's dev
server running **inside the browser tab**, on [OpenVessel](https://github.com/kobesoft-labs/openvessel).

- **Left:** the project's files (they live in an in-memory file system)
- **Middle:** an editor — every keystroke is written to that file system
- **Right:** the site, served by `astro dev` on a virtual port; it updates as you type
- **Bottom:** a real shell (`ls`, `cat`, `node -e …`, `npx astro build`), the dev server's output,
  and a "How it works" view that lights up as each edit travels from the editor to the preview

Nothing is sent to a server: `npm install` downloads from the npm registry into the tab, and everything
after that runs on your machine.

## Run it locally

```bash
git clone https://github.com/kobesoft-labs/openvessel ../openvessel
(cd ../openvessel && npm install && npm run build)
npm install
npm run dev          # builds site/ and serves it at http://localhost:5180/openvessel-demo/
```

`serve.mjs` sends no special headers, like GitHub Pages. The page's service worker (`coi-sw.js`) adds
the cross-origin isolation headers OpenVessel needs, and OpenVessel's runtime and preview do the same
for their folders (`runtime/`, `preview/`).

## Deploying to GitHub Pages

`npm run build` writes a static site to `site/`; `npm run deploy` builds it and pushes it to the
`gh-pages` branch (set GitHub Pages to serve that branch). Every path is relative, so it works under
`/openvessel-demo/` or any other path.

On GitHub Pages the page, OpenVessel's runtime and the preview share one origin. That is fine for a
demo you edit yourself; for running untrusted code, serve them from three origins as described in
OpenVessel's [security notes](https://github.com/kobesoft-labs/openvessel/blob/main/docs/SECURITY.md).

## License

Apache License 2.0.
