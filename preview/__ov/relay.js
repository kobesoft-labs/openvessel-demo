"use strict";
(() => {
  // src/preview/relay.ts
  var kernelPort = null;
  var defaultPort = 0;
  async function ensureSw() {
    const reg = await navigator.serviceWorker.register(new URL("../__ov-sw.js", location.href), { scope: new URL("../", location.href).pathname });
    await navigator.serviceWorker.ready;
    return reg;
  }
  async function handOver() {
    const reg = await ensureSw();
    const sw = reg.active;
    if (!sw || !kernelPort) return;
    sw.postMessage({ t: "kernel-port", port: kernelPort, defaultPort }, [kernelPort]);
    kernelPort = null;
  }
  navigator.serviceWorker.addEventListener("message", (ev) => {
    if (ev.data?.t === "need-kernel-port") window.parent.postMessage({ t: "openvessel-preview-need-port" }, "*");
  });
  var scope = new URL("../", location.href).pathname;
  var fromHost = window.parent !== window;
  try {
    const parent = window.parent.location;
    if (parent.origin === location.origin && parent.pathname.startsWith(scope)) fromHost = false;
  } catch {
  }
  window.addEventListener("message", async (ev) => {
    if (ev.source !== window.parent || !fromHost) return;
    const d = ev.data;
    if (d?.t === "openvessel-preview-connect" && d.port instanceof MessagePort) {
      kernelPort = d.port;
      if (typeof d.defaultPort === "number") defaultPort = d.defaultPort;
      await handOver();
      window.parent.postMessage({ t: "openvessel-preview-ready" }, "*");
    } else if (d?.t === "openvessel-preview-default-port") {
      defaultPort = d.port;
      const reg = await ensureSw();
      reg.active?.postMessage({ t: "default-port", port: defaultPort });
    }
  });
  ensureSw().then(() => window.parent.postMessage({ t: "openvessel-preview-loaded" }, "*"));
})();
//# sourceMappingURL=relay.js.map
