"use strict";
(() => {
  // src/runtime/sw.ts
  var sw = globalThis;
  var nextId = 1;
  var kernels = /* @__PURE__ */ new Map();
  var lastKid = null;
  var portWaiters = [];
  var servedBy = /* @__PURE__ */ new Map();
  var SERVED_MAX = 2e4;
  var KID = /^[0-9a-f]{8,32}$/;
  sw.addEventListener("install", () => {
    sw.skipWaiting();
  });
  sw.addEventListener("activate", (ev) => {
    ev.waitUntil(sw.clients.claim());
  });
  var isRuntimeWindow = (c) => !!c && c.type === "window" && new URL(c.url).pathname.endsWith("/runtime.html");
  sw.addEventListener("message", (ev) => {
    const src = ev.source;
    if (!isRuntimeWindow(src)) return;
    const d = ev.data;
    if (d?.t === "kernel-port" && d.port instanceof MessagePort && typeof d.kid === "string" && KID.test(d.kid)) setPort(d.kid, d.port);
  });
  function setPort(kid, p) {
    const old = kernels.get(kid);
    if (old && old.port !== p) {
      old.retired = true;
      if (!old.pending.size) old.port.close();
    }
    const conn = { port: p, pending: /* @__PURE__ */ new Map(), retired: false };
    kernels.set(kid, conn);
    lastKid = kid;
    p.onmessage = (e) => {
      const m = e.data;
      const r = conn.pending.get(m?.id);
      if (r) {
        conn.pending.delete(m.id);
        r(m);
        if (conn.retired && !conn.pending.size) conn.port.close();
      }
    };
    const w = portWaiters;
    portWaiters = [];
    for (const x of w) {
      if (x.kid === null || x.kid === kid) x.resolve(conn);
      else portWaiters.push(x);
    }
  }
  async function getConn(kid) {
    const c = kid ? kernels.get(kid) : lastKid ? kernels.get(lastKid) : void 0;
    if (c) return c;
    const clients = await sw.clients.matchAll({ type: "window", includeUncontrolled: true });
    for (const cl of clients) if (isRuntimeWindow(cl)) cl.postMessage({ t: "need-kernel-port", kid });
    return new Promise((resolve, reject) => {
      const entry = { kid, resolve };
      portWaiters.push(entry);
      setTimeout(() => {
        portWaiters = portWaiters.filter((x) => x !== entry);
        reject(new Error("OpenVessel kernel is not connected"));
      }, 15e3);
    });
  }
  async function ask(kid, msg) {
    const conn = await getConn(kid);
    const id = nextId++;
    return new Promise((resolve) => {
      conn.pending.set(id, resolve);
      conn.port.postMessage({ ...msg, id });
    });
  }
  var FORBIDDEN_REQ = /* @__PURE__ */ new Set(["host", "connection", "content-length", "keep-alive", "transfer-encoding", "upgrade", "te", "trailer", "expect", "cookie", "cookie2", "origin", "referer", "accept-encoding", "access-control-request-headers", "access-control-request-method", "date", "dnt", "via", "proxy-connection"]);
  async function handleNet(req, url, kid) {
    const target = url.searchParams.get("url") ?? "";
    const by = decodeURIComponent(req.headers.get("x-ov-by") ?? "process");
    const token = req.headers.get("x-ov-k") ?? "";
    const method = req.headers.get("x-ov-method") ?? req.method;
    const check = async (u) => {
      let decision;
      try {
        decision = await ask(kid, { k: "net", url: u, initiator: by, token });
      } catch (e) {
        return errorResponse("network", String(e.message));
      }
      if (decision.timeout) return errorResponse("timeout", `OpenVessel: network access to ${safeHost(u)} was not answered in time`);
      if (!decision.allow) return errorResponse("denied", `OpenVessel: network access to ${safeHost(u)} was denied by the network policy`);
      return null;
    };
    const refused = await check(target);
    if (refused) return refused;
    let headers = [];
    try {
      headers = JSON.parse(decodeURIComponent(req.headers.get("x-ov-h") ?? "[]"));
    } catch {
    }
    const h = new Headers();
    for (const [k, v] of headers) {
      const lk = k.toLowerCase();
      if (FORBIDDEN_REQ.has(lk) || lk.startsWith("sec-") || lk.startsWith("proxy-")) continue;
      try {
        h.append(k, v);
      } catch {
      }
    }
    const body = method === "GET" || method === "HEAD" ? void 0 : await req.arrayBuffer();
    let res;
    try {
      res = await fetch(target, { method, headers: h, body, redirect: req.headers.get("x-ov-redirect") === "error" ? "error" : "follow", credentials: "omit", mode: "cors", cache: "no-store" });
    } catch (e) {
      return errorResponse("network", `request to ${safeHost(target)} failed: ${e.message}. The server may not allow cross-origin requests (CORS) from the browser.`);
    }
    if (res.redirected && res.url && res.url !== target) {
      const refusedFinal = await check(res.url);
      if (refusedFinal) {
        void res.body?.cancel();
        return refusedFinal;
      }
    }
    const rh = [...res.headers];
    const out = new Headers({
      "x-ov-status": String(res.status),
      "x-ov-status-text": encodeURIComponent(res.statusText),
      "x-ov-url": encodeURIComponent(res.url || target),
      "x-ov-redirected": res.redirected ? "1" : "0",
      "x-ov-rh": encodeURIComponent(JSON.stringify(rh)),
      "content-type": res.headers.get("content-type") ?? "application/octet-stream",
      "cache-control": "no-store"
    });
    const nullBody = res.status === 204 || res.status === 205 || res.status === 304 || method === "HEAD";
    return new Response(nullBody ? null : res.body, { status: 200, headers: out });
  }
  function safeHost(u) {
    try {
      return new URL(u).host;
    } catch {
      return u;
    }
  }
  function errorResponse(kind, message) {
    return new Response(message, { status: kind === "denied" ? 403 : kind === "timeout" ? 504 : 502, headers: { "x-ov-error": kind, "x-ov-message": encodeURIComponent(message), "content-type": "text/plain" } });
  }
  var SCOPE = new URL(sw.registration.scope).pathname;
  var NS = `${SCOPE}__ov/k/`;
  function splitKernel(pathname) {
    if (!pathname.startsWith(NS)) return null;
    const s = pathname.slice(NS.length);
    const i = s.indexOf("/");
    const kid = i < 0 ? s : s.slice(0, i);
    return KID.test(kid) ? { kid, rest: i < 0 ? "/" : s.slice(i) } : null;
  }
  function kernelOf(ev) {
    const ref = ev.request.referrer;
    if (ref) {
      try {
        const r = new URL(ref);
        if (r.origin === sw.location.origin) {
          const k = splitKernel(r.pathname);
          if (k) return k.kid;
          const s = servedBy.get(r.href);
          if (s) return s;
        }
      } catch {
      }
    }
    return lastKid;
  }
  var ISOLATION = {
    "cross-origin-opener-policy": "same-origin",
    "cross-origin-embedder-policy": "require-corp",
    "cross-origin-resource-policy": "cross-origin"
  };
  async function withIsolation(req, from) {
    const res = await fetch(from ? new Request(from, { method: req.method, headers: req.headers, credentials: req.credentials, cache: req.cache, redirect: "follow" }) : req);
    if (res.type === "opaque" || res.type === "opaqueredirect" || res.status === 0) return res;
    const missing = Object.keys(ISOLATION).filter((k) => !res.headers.has(k));
    if (!missing.length && !from) return res;
    const headers = new Headers(res.headers);
    for (const k of missing) headers.set(k, ISOLATION[k]);
    const nullBody = res.status === 204 || res.status === 205 || res.status === 304 || req.method === "HEAD";
    return new Response(nullBody ? null : res.body, { status: res.status, statusText: res.statusText, headers });
  }
  function remember(url, kid) {
    if (servedBy.size >= SERVED_MAX) servedBy.delete(servedBy.keys().next().value);
    servedBy.delete(url);
    servedBy.set(url, kid);
  }
  function moduleResponse(kid, path, search) {
    return ask(kid, { k: "esm", pathname: path, search }).then(
      (r) => new Response(r.body, { status: r.status, headers: { "content-type": `${r.type}; charset=utf-8`, "cache-control": "no-store", "cross-origin-resource-policy": "same-origin" } }),
      (e) => new Response(`throw new Error(${JSON.stringify(String(e?.message ?? e))});`, { status: 200, headers: { "content-type": "text/javascript" } })
    );
  }
  var isModulePath = (path) => path.startsWith("/__ov/esm/") || path.startsWith("/__ov/builtin/") || path.startsWith("/__ov/mw/") || path === "/__ov/esm-error";
  sw.addEventListener("fetch", (ev) => {
    const url = new URL(ev.request.url);
    if (url.origin !== sw.location.origin || !url.pathname.startsWith(SCOPE)) return;
    const ns = splitKernel(url.pathname);
    const path = ns ? ns.rest : "/" + url.pathname.slice(SCOPE.length);
    if (isModulePath(path) || path === "/__ov/net") {
      ev.respondWith(
        (async () => {
          const kid = ns ? ns.kid : kernelOf(ev);
          if (path === "/__ov/net") return handleNet(ev.request, url, kid);
          if (!ns && kid) remember(url.href, kid);
          return moduleResponse(kid, path, url.search);
        })()
      );
      return;
    }
    if (path === "/__ov/ping") {
      ev.respondWith(new Response("pong", { headers: { "content-type": "text/plain" } }));
      return;
    }
    if (ns) {
      const real = new URL(SCOPE + ns.rest.slice(1) + url.search, url).href;
      ev.respondWith(ev.request.method === "GET" || ev.request.method === "HEAD" ? withIsolation(ev.request, real) : fetch(new Request(real, ev.request)));
      return;
    }
    if (ev.request.method === "GET") ev.respondWith(withIsolation(ev.request));
  });
})();
//# sourceMappingURL=sw.js.map
