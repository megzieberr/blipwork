/* Service worker — keeps the app fast and offline-capable WITHOUT serving
   stale code. Strategy:
     • app code (HTML / JS / CSS) and page navigations → NETWORK-FIRST:
       always fetch the latest when online, fall back to cache only offline.
       (This is the fix for the recurring "old version still shows" problem —
       a fresh deploy now lands on the very next load.)
     • images / icons / manifest → cache-first (they rarely change).
     • cross-origin (Supabase, supabase-js CDN, Google Fonts) → straight to
       the network; scores need the internet.
   Bump CACHE on a shippable change to evict the old cache on activate. */
const CACHE = "mhq-v11";
const SHELL = ["./", "./index.html", "./admin.html", "./css/styles.css", "./js/app.js", "./manifest.json",
  "./icon-192.png", "./icon-512.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).catch(() => {}));
  self.skipWaiting();
});

self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});

const isAppCode = url => /\.(?:js|css|html)$/.test(url.pathname) || url.pathname.endsWith("/");

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;   // network for Supabase / CDN / fonts

  // NETWORK-FIRST for app code + navigations: fresh when online, cache offline.
  if (req.mode === "navigate" || isAppCode(url)) {
    e.respondWith((async () => {
      const cache = await caches.open(CACHE);
      try {
        const res = await fetch(req);
        if (res && res.status === 200) cache.put(req, res.clone());
        return res;
      } catch {
        return (await cache.match(req)) || (req.mode === "navigate" ? cache.match("./index.html") : Response.error());
      }
    })());
    return;
  }

  // CACHE-FIRST for images / icons / manifest (refresh quietly in the background).
  e.respondWith(caches.open(CACHE).then(async cache => {
    const cached = await cache.match(req);
    const network = fetch(req).then(res => { if (res && res.status === 200) cache.put(req, res.clone()); return res; }).catch(() => cached);
    return cached || network;
  }));
});
