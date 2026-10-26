"use strict";
(() => {
  // src/runtime/runtime.ts
  var allowedMeta = document.querySelector('meta[name="openvessel-allowed-hosts"]')?.content ?? "*";
  var allowed = allowedMeta.split(/[\s,]+/).filter(Boolean);
  function fail(msg) {
    window.parent.postMessage({ t: "openvessel-error", message: msg }, "*");
  }
  function originAllowed(origin) {
    return allowed.includes("*") || allowed.includes(origin);
  }
  async function waitForController() {
    const reg = await navigator.serviceWorker.register(new URL("./sw.js", location.href), { scope: "./", updateViaCache: "none" });
    await reg.update().catch(() => {
    });
    if (reg.installing || reg.waiting) {
      await new Promise((resolve) => navigator.serviceWorker.addEventListener("controllerchange", resolve, { once: true }));
    }
    await navigator.serviceWorker.ready;
    if (navigator.serviceWorker.controller) return navigator.serviceWorker.controller;
    return new Promise((resolve) => {
      navigator.serviceWorker.addEventListener("controllerchange", () => resolve(navigator.serviceWorker.controller), { once: true });
      reg.active?.postMessage({ t: "ping" });
    });
  }
  var KID = [...crypto.getRandomValues(new Uint8Array(8))].map((b) => b.toString(16).padStart(2, "0")).join("");
  var kernel = null;
  function connectSw() {
    const ctrl = navigator.serviceWorker.controller;
    if (!ctrl || !kernel) return;
    const ch = new MessageChannel();
    kernel.postMessage({ t: "sw-port", port: ch.port1 }, [ch.port1]);
    ctrl.postMessage({ t: "kernel-port", port: ch.port2, kid: KID }, [ch.port2]);
  }
  var NOT_ISOLATED = 'OpenVessel needs a cross-origin isolated page (COOP: same-origin and COEP: require-corp/credentialless on the host page, and allow="cross-origin-isolated" on the iframe).';
  async function start(hostPort, init) {
    try {
      await waitForController();
    } catch (e) {
      fail(`service worker registration failed: ${e.message}`);
      return;
    }
    if (!crossOriginIsolated) {
      fail(NOT_ISOLATED);
      return;
    }
    kernel = new Worker(new URL(`./__ov/k/${KID}/kernel.js`, location.href), { type: "module", name: "openvessel-kernel" });
    kernel.onerror = (e) => fail(`kernel failed: ${e.message}`);
    if (init.policy) kernel.postMessage({ t: "policy", policy: init.policy });
    connectSw();
    navigator.serviceWorker.addEventListener("message", (ev) => {
      if (ev.data?.t === "need-kernel-port" && (ev.data.kid == null || ev.data.kid === KID)) connectSw();
    });
    navigator.serviceWorker.addEventListener("controllerchange", connectSw);
    kernel.postMessage({ t: "host-port", port: hostPort }, [hostPort]);
  }
  var started = false;
  window.addEventListener("message", (ev) => {
    if (ev.source !== window.parent || started) return;
    const d = ev.data;
    if (d?.t !== "openvessel-connect" || !(d.port instanceof MessagePort)) return;
    if (!originAllowed(ev.origin)) {
      fail(`origin ${ev.origin} is not allowed to use this runtime`);
      return;
    }
    const ancestors = location.ancestorOrigins;
    if (ancestors ? ancestors.length > 1 : window.parent !== window.top) {
      fail("the runtime must be embedded directly by the host page");
      return;
    }
    started = true;
    start(d.port, d.init ?? {});
  });
  var RELOAD_FLAG = "openvessel-coi-reload";
  async function boot() {
    let reloaded = false;
    try {
      reloaded = sessionStorage.getItem(RELOAD_FLAG) === "1";
      sessionStorage.removeItem(RELOAD_FLAG);
    } catch {
    }
    if (!crossOriginIsolated && !reloaded && "serviceWorker" in navigator) {
      try {
        await waitForController();
        if (!crossOriginIsolated) {
          sessionStorage.setItem(RELOAD_FLAG, "1");
          location.reload();
          return;
        }
      } catch {
      }
    }
    window.parent.postMessage({ t: "openvessel-runtime-loaded" }, "*");
  }
  void boot();
})();
//# sourceMappingURL=runtime.js.map
