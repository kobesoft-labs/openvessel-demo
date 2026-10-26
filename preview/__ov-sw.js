"use strict";
(() => {
  // src/shared/policy.ts
  function canonicalHost(h) {
    try {
      return new URL(`http://${h.includes(":") ? `[${h}]` : h}/`).hostname.replace(/^\[|\]$/g, "");
    } catch {
      return null;
    }
  }
  function isLoopbackHost(hostname) {
    const h = canonicalHost(hostname.toLowerCase().replace(/^\[|\]$/g, "").replace(/\.$/, ""));
    if (h === null) return false;
    return h === "localhost" || h.endsWith(".localhost") || /^127\./.test(h) || h === "0.0.0.0" || h === "::1" || h === "::" || /^::ffff:7f[0-9a-f]{2}:/.test(h);
  }

  // src/preview/sw.ts
  var sw = globalThis;
  var SCOPE = new URL(sw.registration.scope).pathname;
  var RELAY = `${SCOPE}__ov/relay.html`;
  var OWN = /* @__PURE__ */ new Set([...["relay.html", "relay.js", "inject.js"].map((f) => `${SCOPE}__ov/${f}`), `${SCOPE}__ov-sw.js`]);
  var kernel = null;
  var defaultPort = 0;
  var nextId = 1;
  var waiters = [];
  var streams = /* @__PURE__ */ new Map();
  var netChecks = /* @__PURE__ */ new Map();
  var sockets = /* @__PURE__ */ new Map();
  var allowCache = /* @__PURE__ */ new Set();
  sw.addEventListener("install", () => sw.skipWaiting());
  sw.addEventListener("activate", (ev) => ev.waitUntil(sw.clients.claim()));
  function isRelay(src) {
    if (!src || src.type !== "window" || new URL(src.url).pathname !== RELAY) return false;
    const frameType = src.frameType;
    return !frameType || frameType === "nested";
  }
  sw.addEventListener("message", (ev) => {
    const d = ev.data;
    const src = ev.source;
    if (d?.t === "kernel-port" && d.port instanceof MessagePort && isRelay(src)) {
      attach(d.port);
      if (typeof d.defaultPort === "number" && d.defaultPort) setDefaultPort(d.defaultPort);
    } else if (d?.t === "default-port" && typeof d.port === "number" && isRelay(src)) {
      setDefaultPort(d.port);
    } else if (d?.t === "ws-connect" && d.port instanceof MessagePort) {
      ev.waitUntil(openSocket(d, src));
    } else if (d?.t === "ws-check" && d.port instanceof MessagePort && typeof d.url === "string") {
      const reply = d.port;
      ev.waitUntil(netCheck(d.url).then((v) => reply.postMessage({ allow: v.allow })));
    }
  });
  function attach(p) {
    if (kernel && kernel !== p) kernel.close();
    kernel = p;
    allowCache.clear();
    p.onmessage = (e) => onKernel(e.data);
    const w = waiters;
    waiters = [];
    for (const fn of w) fn(p);
  }
  async function getKernel() {
    if (kernel) return kernel;
    const clients = await sw.clients.matchAll({ type: "window", includeUncontrolled: true });
    for (const c of clients) if (isRelay(c)) c.postMessage({ t: "need-kernel-port" });
    return new Promise((resolve, reject) => {
      waiters.push(resolve);
      setTimeout(() => {
        waiters = waiters.filter((w) => w !== resolve);
        reject(new Error("preview is not connected to OpenVessel"));
      }, 15e3);
    });
  }
  function onKernel(m) {
    switch (m.k) {
      case "head": {
        const s = streams.get(m.id);
        s?.head?.(m);
        return;
      }
      case "data":
        streams.get(m.id)?.ctrl?.enqueue(m.data);
        return;
      case "end": {
        const s = streams.get(m.id);
        streams.delete(m.id);
        try {
          s?.ctrl?.close();
        } catch {
        }
        return;
      }
      case "error": {
        const s = streams.get(m.id);
        streams.delete(m.id);
        s?.fail?.(m.msg);
        try {
          s?.ctrl?.error(new Error(m.msg));
        } catch {
        }
        return;
      }
      case "net-result": {
        const r = netChecks.get(m.id);
        netChecks.delete(m.id);
        r?.({ allow: !!m.allow, cache: !!m.cache, timeout: !!m.timeout });
        return;
      }
      case "net-flush":
        allowCache.clear();
        return;
      case "ws-opened":
        sockets.get(m.id)?.postMessage({ t: "open", protocol: m.protocol });
        return;
      case "ws-msg":
        sockets.get(m.id)?.postMessage({ t: "msg", data: m.data, binary: m.binary });
        return;
      case "ws-closed": {
        const p = sockets.get(m.id);
        sockets.delete(m.id);
        p?.postMessage({ t: "close", code: m.code, reason: m.reason });
        return;
      }
    }
  }
  var clientPorts = /* @__PURE__ */ new Map();
  var PORTS_CACHE = "openvessel-preview-ports";
  var portKey = (id) => new URL(`${SCOPE}__ov/port/${encodeURIComponent(id)}`, sw.location.origin).href;
  var DEFAULT_KEY = new URL(`${SCOPE}__ov/default-port`, sw.location.origin).href;
  var loaded = (async () => {
    try {
      const cache = await caches.open(PORTS_CACHE);
      const d = await cache.match(DEFAULT_KEY);
      if (d && !defaultPort) defaultPort = Number(await d.text()) || 0;
      const prefix = portKey("");
      const live = new Set((await sw.clients.matchAll({ includeUncontrolled: true })).map((c) => c.id));
      for (const req of await cache.keys()) {
        if (!req.url.startsWith(prefix)) continue;
        const id = decodeURIComponent(req.url.slice(prefix.length));
        if (clientPorts.has(id)) continue;
        if (!live.has(id)) {
          void cache.delete(req);
          continue;
        }
        const r = await cache.match(req);
        const port = Number(await r?.text());
        if (port && !clientPorts.has(id)) clientPorts.set(id, port);
      }
    } catch {
    }
  })();
  function persist(key, value) {
    void caches.open(PORTS_CACHE).then((c) => c.put(key, new Response(String(value)))).catch(() => {
    });
  }
  function setClientPort(id, port) {
    if (clientPorts.get(id) === port) return;
    clientPorts.set(id, port);
    persist(portKey(id), port);
  }
  function setDefaultPort(port) {
    defaultPort = port;
    persist(DEFAULT_KEY, port);
  }
  async function portFor(clientId) {
    await loaded;
    if (clientId && clientPorts.has(clientId)) return clientPorts.get(clientId);
    return defaultPort;
  }
  var INJECT_SCRIPT = `<script src="${SCOPE}__ov/inject.js"><\/script>`;
  var MOUNTED = SCOPE !== "/";
  var toServerPath = (p) => MOUNTED && p.startsWith(SCOPE) ? "/" + p.slice(SCOPE.length) : p;
  var toPreviewPath = (p) => MOUNTED && p.startsWith("/") && !p.startsWith("//") && !p.startsWith(SCOPE) ? SCOPE + p.slice(1) : p;
  var IMPORT_MAP = `<script type="importmap">${JSON.stringify({ imports: { "/": SCOPE, [SCOPE]: SCOPE } })}<\/script>`;
  function mountHtml(html) {
    if (!MOUNTED) return html;
    return html.replace(/(\s(?:src|href|action|poster|formaction)\s*=\s*)(["'])(\/[^"']*)\2/gi, (_m, a, q, v) => `${a}${q}${toPreviewPath(v)}${q}`).replace(/(\ssrcset\s*=\s*)(["'])([^"']*)\2/gi, (_m, a, q, v) => `${a}${q}${v.replace(/(^|,\s*)(\/[^\s,]*)/g, (_x, sep, u) => sep + toPreviewPath(u))}${q}`);
  }
  function injectHtml(html) {
    html = mountHtml(html);
    const INJECT = MOUNTED ? IMPORT_MAP + INJECT_SCRIPT : INJECT_SCRIPT;
    const m = /<head[^>]*>/i.exec(html);
    if (m) return html.slice(0, m.index + m[0].length) + INJECT + html.slice(m.index + m[0].length);
    const d = /<!doctype[^>]*>/i.exec(html);
    if (d) return html.slice(0, d.index + d[0].length) + INJECT + html.slice(d.index + d[0].length);
    return INJECT + html;
  }
  async function forward(req, port, isNavigation, loopback = false, attempt = 0) {
    const k = await getKernel();
    const url = new URL(req.url);
    const id = nextId++;
    const headers = [...req.headers].filter(([n]) => !/^(sec-|cookie$|accept-encoding$)/.test(n));
    headers.push(["host", `localhost:${port}`]);
    const hasBody = req.method !== "GET" && req.method !== "HEAD";
    let resolveHead;
    let rejectHead;
    const head = new Promise((res, rej) => {
      resolveHead = res;
      rejectHead = rej;
    });
    let ctrl;
    const body = new ReadableStream({
      start(c) {
        ctrl = c;
      },
      cancel() {
        streams.delete(id);
        k.postMessage({ k: "abort", id });
      }
    });
    streams.set(id, { head: resolveHead, ctrl, fail: (msg) => rejectHead(new Error(msg)) });
    k.postMessage({ k: "req", id, port, method: req.method, url: (loopback ? url.pathname : toServerPath(url.pathname)) + url.search, headers, hasBody });
    if (hasBody) {
      const reqBody = new Uint8Array(await req.arrayBuffer());
      if (reqBody.length) k.postMessage({ k: "body", id, data: reqBody }, [reqBody.buffer]);
      k.postMessage({ k: "body-end", id });
    }
    let h;
    try {
      h = await head;
    } catch (e) {
      if (!hasBody && attempt < 15 && /ECONNREFUSED/.test(String(e.message))) {
        await new Promise((r) => setTimeout(r, 200));
        return forward(req, port, isNavigation, loopback, attempt + 1);
      }
      return new Response(errorPage(port, String(e.message)), { status: 502, headers: { "content-type": "text/html; charset=utf-8", ...isolationHeaders() } });
    }
    const out = new Headers();
    for (const [n, v] of h.headers) {
      const ln = n.toLowerCase();
      if (ln === "content-length" || ln === "transfer-encoding" || ln === "connection" || ln === "keep-alive" || ln === "content-encoding") continue;
      try {
        out.append(n, ln === "location" && !loopback ? toPreviewPath(v) : v);
      } catch {
      }
    }
    for (const [n, v] of Object.entries(isolationHeaders())) if (!out.has(n)) out.set(n, v);
    const status = h.status === 101 ? 200 : h.status;
    const nullBody = status === 204 || status === 205 || status === 304 || req.method === "HEAD";
    const ct = out.get("content-type") ?? "";
    if (isNavigation && ct.includes("text/html") && !nullBody) {
      const text = await new Response(body).text();
      return new Response(injectHtml(text), { status, statusText: h.statusText, headers: out });
    }
    return new Response(nullBody ? null : body, { status, statusText: h.statusText, headers: out });
  }
  async function withIsolation(req) {
    const res = await fetch(req);
    if (res.type === "opaque" || res.type === "opaqueredirect" || res.status === 0) return res;
    const headers = new Headers(res.headers);
    for (const [n, v] of Object.entries(isolationHeaders())) if (!headers.has(n)) headers.set(n, v);
    return new Response(res.body, { status: res.status, statusText: res.statusText, headers });
  }
  function isolationHeaders() {
    return { "cross-origin-embedder-policy": "credentialless", "cross-origin-resource-policy": "cross-origin", "cross-origin-opener-policy": "same-origin" };
  }
  function errorPage(port, msg) {
    const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
    return `<!doctype html><meta charset="utf-8"><title>Preview unavailable</title><body style="font:14px system-ui;padding:24px;color:#444"><h3>Nothing is listening on port ${port}</h3><p>${esc(msg)}</p><p>Start a dev server (for example <code>npm run dev</code>) and reload.</p></body>`;
  }
  async function netCheck(url) {
    let origin;
    try {
      const u = new URL(url);
      if (u.protocol === "ws:") u.protocol = "http:";
      else if (u.protocol === "wss:") u.protocol = "https:";
      url = u.href;
      origin = u.origin;
    } catch {
      return { allow: false };
    }
    if (allowCache.has(origin)) return { allow: true };
    let k;
    try {
      k = await getKernel();
    } catch {
      return { allow: false };
    }
    const id = nextId++;
    const v = await new Promise((resolve) => {
      netChecks.set(id, resolve);
      k.postMessage({ k: "net", id, url });
    });
    if (v.allow && v.cache && k === kernel) allowCache.add(origin);
    return v;
  }
  function blocked(v, why = "Blocked by OpenVessel network policy") {
    return new Response("", { status: 403, statusText: v?.timeout ? "Blocked by OpenVessel network policy (not answered in time)" : why });
  }
  async function outside(req) {
    const first = await netCheck(req.url);
    if (!first.allow) return blocked(first);
    const res = await fetch(req);
    if (res.redirected && res.url && res.url !== req.url) {
      const final = await netCheck(res.url);
      if (!final.allow) {
        void res.body?.cancel();
        return blocked(final);
      }
    }
    return res;
  }
  async function openSocket(d, src) {
    const port = d.port;
    const id = nextId++;
    sockets.set(id, port);
    const target = Number(d.vport) || await portFor(src?.id) || defaultPort;
    let k;
    try {
      k = await getKernel();
    } catch {
      sockets.delete(id);
      port.postMessage({ t: "close", code: 1006, reason: "not connected" });
      return;
    }
    k.postMessage({ k: "ws-open", id, port: target, url: d.vport ? String(d.path) : toServerPath(String(d.path)), headers: [["sec-websocket-protocol", (d.protocols ?? []).join(", ")], ["host", `localhost:${target}`], ["origin", d.origin ?? ""]].filter(([, v]) => v) });
    port.onmessage = (e) => {
      const m = e.data;
      if (m.t === "send") k.postMessage({ k: "ws-msg", id, data: m.data, binary: m.binary });
      else if (m.t === "close") {
        k.postMessage({ k: "ws-close", id, code: m.code ?? 1e3, reason: m.reason ?? "" });
        sockets.delete(id);
      }
    };
  }
  sw.addEventListener("fetch", (ev) => {
    const req = ev.request;
    const url = new URL(req.url);
    if (url.origin !== sw.location.origin) {
      if (!/^https?:$/.test(url.protocol)) return;
      if (isLoopbackHost(url.hostname)) {
        ev.respondWith(portFor(ev.clientId).then((p) => forward(req, Number(url.port) || p, false, true)));
        return;
      }
      ev.respondWith(outside(req));
      return;
    }
    if (OWN.has(url.pathname)) {
      ev.respondWith(withIsolation(req));
      return;
    }
    if (url.pathname === `${SCOPE}__ov/open`) {
      const port = Number(url.searchParams.get("port")) || defaultPort;
      const p = url.searchParams.get("path") || "/";
      if (ev.resultingClientId) setClientPort(ev.resultingClientId, port);
      ev.respondWith(new Response(null, { status: 302, headers: { location: new URL(toPreviewPath(p), sw.location.origin).href, ...isolationHeaders() } }));
      return;
    }
    const isNav = req.mode === "navigate";
    ev.respondWith(
      (async () => {
        let port;
        if (isNav) {
          await loaded;
          port = ev.resultingClientId && clientPorts.get(ev.resultingClientId) || await portFor(ev.clientId);
          if (ev.resultingClientId) setClientPort(ev.resultingClientId, port);
        } else port = await portFor(ev.clientId);
        return forward(req, port, isNav);
      })()
    );
  });
})();
//# sourceMappingURL=__ov-sw.js.map
