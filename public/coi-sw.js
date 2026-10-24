// GitHub Pages can't set response headers, but OpenVessel needs cross-origin isolation
// (SharedArrayBuffer). This service worker adds the headers to the demo's own files. The runtime and
// the preview register their own service workers for their folders, which do the same there.
const ISOLATION = {
  'cross-origin-opener-policy': 'same-origin',
  'cross-origin-embedder-policy': 'require-corp',
  'cross-origin-resource-policy': 'cross-origin',
};

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  e.respondWith(
    fetch(req).then((res) => {
      if (res.type === 'opaque' || res.status === 0) return res;
      const headers = new Headers(res.headers);
      for (const [k, v] of Object.entries(ISOLATION)) if (!headers.has(k)) headers.set(k, v);
      return new Response(res.body, { status: res.status, statusText: res.statusText, headers });
    }),
  );
});
