/* Registers the service worker (makes the app installable + offline-capable).
   Relative path so it works under a GitHub Pages sub-path too. */
export function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return;
  window.addEventListener("load", () => { navigator.serviceWorker.register("sw.js").catch(() => {}); });
}
