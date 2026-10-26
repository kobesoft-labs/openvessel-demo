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

  // src/preview/inject.ts
  (() => {
    const scope = new URL("../", document.currentScript?.src ?? location.href).pathname;
    if (scope !== "/" && !window.fetch.__openvessel) {
      const fix = (u) => u.startsWith("/") && !u.startsWith("//") && !u.startsWith(scope) ? scope + u.slice(1) : u;
      const nativeFetch = window.fetch.bind(window);
      const patched = (input, init) => nativeFetch(typeof input === "string" ? fix(input) : input, init);
      patched.__openvessel = true;
      window.fetch = patched;
      const open = XMLHttpRequest.prototype.open;
      XMLHttpRequest.prototype.open = function(method, url, ...rest) {
        return open.call(this, method, typeof url === "string" ? fix(url) : url, ...rest);
      };
    }
    const Native = window.WebSocket;
    if (Native.__openvessel) return;
    const isLocal = (u) => u.host === location.host || isLoopbackHost(u.hostname);
    class OvWebSocket extends EventTarget {
      static CONNECTING = 0;
      static OPEN = 1;
      static CLOSING = 2;
      static CLOSED = 3;
      CONNECTING = 0;
      OPEN = 1;
      CLOSING = 2;
      CLOSED = 3;
      url;
      protocol = "";
      extensions = "";
      readyState = 0;
      onopen = null;
      onmessage = null;
      onclose = null;
      onerror = null;
      port = null;
      native = null;
      type = "blob";
      constructor(u, protocols, tunnel) {
        super();
        this.url = u.href;
        const list = protocols === void 0 ? [] : Array.isArray(protocols) ? protocols : [protocols];
        const ctrl = navigator.serviceWorker?.controller;
        if (!ctrl) {
          setTimeout(() => this.finish(1006, "no service worker"), 0);
          return;
        }
        const ch = new MessageChannel();
        if (tunnel) {
          this.port = ch.port1;
          this.port.onmessage = (e) => this.onPort(e.data);
          const vport = u.host === location.host ? 0 : Number(u.port) || 0;
          ctrl.postMessage({ t: "ws-connect", port: ch.port2, path: u.pathname + u.search, protocols: list, vport, origin: location.origin }, [ch.port2]);
          return;
        }
        ch.port1.onmessage = (e) => {
          ch.port1.close();
          if (this.readyState !== 0) {
            this.finish(1006, "");
          } else if (!e.data?.allow) {
            this.finish(1006, "blocked by OpenVessel network policy");
          } else {
            this.connectNative(list);
          }
        };
        ctrl.postMessage({ t: "ws-check", url: this.url, port: ch.port2 }, [ch.port2]);
      }
      get binaryType() {
        return this.type;
      }
      set binaryType(v) {
        if (v !== "blob" && v !== "arraybuffer") return;
        this.type = v;
        if (this.native) this.native.binaryType = v;
      }
      get bufferedAmount() {
        return this.native?.bufferedAmount ?? 0;
      }
      connectNative(protocols) {
        let ws;
        try {
          ws = new Native(this.url, protocols);
        } catch {
          this.finish(1006, "");
          return;
        }
        this.native = ws;
        ws.binaryType = this.type;
        ws.onopen = () => {
          if (this.readyState !== 0) return;
          this.readyState = 1;
          this.protocol = ws.protocol;
          this.extensions = ws.extensions;
          this.fire("open", new Event("open"));
        };
        ws.onmessage = (e) => this.fire("message", new MessageEvent("message", { data: e.data, origin: e.origin }));
        ws.onerror = () => this.fire("error", new Event("error"));
        ws.onclose = (e) => {
          this.readyState = 3;
          this.fire("close", new CloseEvent("close", { code: e.code, reason: e.reason, wasClean: e.wasClean }));
        };
      }
      fire(type, ev) {
        const h = this["on" + type];
        if (typeof h === "function") h.call(this, ev);
        this.dispatchEvent(ev);
      }
      onPort(m) {
        if (m.t === "open") {
          if (this.readyState !== 0) return;
          this.readyState = 1;
          this.protocol = m.protocol ?? "";
          this.fire("open", new Event("open"));
        } else if (m.t === "msg") {
          let data = m.data;
          if (m.binary) data = this.type === "arraybuffer" ? m.data.slice().buffer : new Blob([m.data]);
          this.fire("message", new MessageEvent("message", { data, origin: new URL(this.url).origin }));
        } else if (m.t === "close") {
          this.finish(m.code ?? 1005, m.reason ?? "");
        }
      }
      finish(code, reason) {
        if (this.readyState === 3) return;
        const wasOpen = this.readyState === 1;
        this.readyState = 3;
        if (!wasOpen || code === 1006) this.fire("error", new Event("error"));
        this.fire("close", new CloseEvent("close", { code, reason, wasClean: code === 1e3 }));
        this.port?.close();
      }
      send(data) {
        if (this.readyState === 0) throw new DOMException("WebSocket is not open", "InvalidStateError");
        if (this.readyState !== 1) return;
        if (this.native) return this.native.send(data);
        const port = this.port;
        if (typeof data === "string") port.postMessage({ t: "send", data, binary: false });
        else if (data instanceof Blob) data.arrayBuffer().then((b) => port.postMessage({ t: "send", data: new Uint8Array(b), binary: true }));
        else if (ArrayBuffer.isView(data)) port.postMessage({ t: "send", data: new Uint8Array(data.buffer, data.byteOffset, data.byteLength).slice(), binary: true });
        else port.postMessage({ t: "send", data: new Uint8Array(data).slice(), binary: true });
      }
      close(code = 1e3, reason = "") {
        if (this.readyState >= 2) return;
        if (this.native) {
          this.readyState = 2;
          this.native.close(code, reason);
          return;
        }
        if (!this.port) {
          this.readyState = 2;
          return;
        }
        this.readyState = 2;
        this.port.postMessage({ t: "close", code, reason });
        setTimeout(() => this.finish(code, reason), 0);
      }
    }
    const Patched = function(url, protocols) {
      let u;
      try {
        u = new URL(String(url), location.href);
      } catch {
        return new Native(url, protocols);
      }
      if (!/^(wss?|https?):$/.test(u.protocol) || u.hash) return new Native(url, protocols);
      if (u.protocol === "http:") u.protocol = "ws:";
      else if (u.protocol === "https:") u.protocol = "wss:";
      return new OvWebSocket(u, protocols, isLocal(u));
    };
    Object.assign(Patched, { CONNECTING: 0, OPEN: 1, CLOSING: 2, CLOSED: 3, __openvessel: true });
    Patched.prototype = Native.prototype;
    Object.defineProperty(Patched, Symbol.hasInstance, { value: (o) => o instanceof OvWebSocket || o instanceof Native });
    window.WebSocket = Patched;
  })();
})();
//# sourceMappingURL=inject.js.map
