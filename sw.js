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
const CACHE = "mhq-v32";
const SHELL = ["./", "./index.html", "./admin.html", "./css/styles.css", "./js/app.js", "./manifest.json",
  "./icon-192.png", "./icon-512.png",
  // Phase 3 stylesheets (the JS is reached through app.js's import graph and
  // is network-first anyway, so only the CSS needs listing here).
  "./css/assignment.css", "./css/treasure.css", "./css/push.css"];

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

/* ============================================================
   PUSH REMINDERS (2026-07-19)
   The daily nudge from supabase/functions/send-push arrives here even
   when the app is closed — a service worker is the only thing allowed
   to show one. Payload shape: { title, body, url, tag }.

   Everything is defensive: a push whose data isn't JSON (or is empty,
   which some push services send as a wake-up) must STILL show a
   notification. Chrome punishes a push event that resolves without
   showNotification() by eventually revoking the subscription, so the
   fallbacks below are load-bearing, not politeness.
   ============================================================ */
self.addEventListener("push", e => {
  let data = {};
  try { if (e.data) data = e.data.json(); } catch { data = {}; }

  const title = data.title || "Blipwork";
  const options = {
    body: data.body || "Blip is waiting for you.",
    icon: "./icon-192.png",
    badge: "./icon-192.png",
    /* One tag for the whole sick-stage series: a later nudge REPLACES
       an unread earlier one rather than stacking, so she never wakes
       to a pile of them. renotify makes the replacement buzz. */
    tag: data.tag || "blipwork-blip",
    renotify: true,
    data: { url: data.url || "./" },
  };

  e.waitUntil(self.registration.showNotification(title, options));
});

/* Tapping the notification focuses an already-open Blipwork window
   rather than opening a second one (a duplicate tab would show stale
   state and confuse the "come feed him" call to action). */
self.addEventListener("notificationclick", e => {
  e.notification.close();
  const target = (e.notification.data && e.notification.data.url) || "./";
  e.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then(clients => {
      for (const c of clients) { if ("focus" in c) return c.focus(); }
      if (self.clients.openWindow) return self.clients.openWindow(target);
    })
  );
});
