/* Service worker — caches the app shell so it opens fast and works offline.
   Same-origin GETs are served cache-first (and refreshed in the background);
   everything cross-origin (Supabase, the supabase-js CDN, Google Fonts) goes
   straight to the network, since scores need the internet. */
const CACHE = "mhq-v4";   // bump on a shippable change to evict stale module caches
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

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  if (new URL(req.url).origin !== location.origin) return;   // network for Supabase / CDN / fonts
  e.respondWith(caches.open(CACHE).then(async cache => {
    const cached = await cache.match(req);
    const network = fetch(req).then(res => { if (res && res.status === 200) cache.put(req, res.clone()); return res; }).catch(() => cached);
    return cached || network;
  }));
});
