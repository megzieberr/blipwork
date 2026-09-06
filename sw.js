/* Service worker: keeps the app fast and offline-capable.

   WHAT CHANGED, AND WHY (fix day Build 6, 2026-09-06). App code used to be
   network-first, which fixed the old "the deploy is live but she still sees
   yesterday's app" problem. That worked while the app arrived in one lump
   at boot. It does not any more: since the lazy-loading half of Build 6 the
   app fetches a quest, a dice pool, an exam chapter or a Fun Functions
   quest at the moment a learner taps it, and network-first would put a real
   round trip on school data in front of every one of those taps. So app
   code is now CACHE-FIRST inside the versioned cache, and the freshness
   that network-first used to buy is bought instead by the cache name.

   Strategy:
     • app code (.js, .css) → CACHE-FIRST inside CACHE. Every stored copy
       carries the time it was stored (the x-sw-cached-at header below) and
       is served straight from the cache for up to 7 days. Older than that:
       fetched network-first, with the stale copy kept as the offline
       fallback, so a learner who has been away for a month is never left
       with nothing.
     • page navigations, any .html (index.html, admin.html, the verify
       harnesses) and js/app.js → NETWORK-FIRST. The entry points stay
       exactly as fresh as they were: open the app online and the current
       shell is what loads.
     • a URL carrying ?retry= → NETWORK-FIRST, and the answer is stored
       under the PLAIN url. A browser remembers a failed module URL and will
       not go near the network for it again, so js/lazy.js asks for a burned
       module under a fresh query string. That retry is precisely the
       request that must reach the network, and its answer is what heals the
       one cache entry every other importer reads. The retry variant is
       never kept as an entry of its own.
     • images / icons / manifest → cache-first, refreshed quietly
       (unchanged: they rarely change).
     • cross-origin (Supabase, supabase-js CDN, Google Fonts) → straight to
       the network; scores need the internet.

   BUMPING CACHE IS NOW LOAD-BEARING FOR CODE, exactly as it already was for
   images. Activate deletes every cache whose name is not CACHE, so the bump
   is the thing that makes a deploy land. Ship without it and learners keep
   the old code until the 7-day limit expires it, file by file.
   `python tools/sw_check.py` prints OK only when nothing under js/ or css/
   has changed since the commit that last touched the CACHE line; run it
   before every push.

   One rule holds everywhere below: app code is never answered with a
   made-up Response or an empty body. When there is no cached copy and the
   network fails, the fetch is allowed to reject. The browser then reports
   a real load failure, and the app shows its own "Can't reach the server"
   line. A hollow reply served as a module would be a silent break with
   nothing on screen to explain it. */
const CACHE = "mhq-v91";
const MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;    // 7 days
const STAMP = "x-sw-cached-at";                // written onto every copy we store
const SHELL = ["./", "./index.html", "./admin.html", "./css/styles.css", "./js/app.js", "./manifest.json",
  "./icon-192.png", "./icon-512.png",
  // Phase 3 stylesheets. What SHELL is for, since 2026-09-06: everything the
  // app cannot draw a first screen without, cached before anything is tapped.
  // The rest of the JS arrives through app.js's import graph and is cached as
  // it is asked for, so only these stylesheets need listing here.
  "./css/assignment.css", "./css/treasure.css", "./css/push.css",
  // css/exam.css was missing from this list (spotted 2026-08-23): the Exam
  // Focus tab has had its own stylesheet since 2026-08-21 and every other
  // feature stylesheet is here. The gap only ever showed OFFLINE, where the
  // exam screens came up unstyled.
  "./css/exam.css",
  // FUNFUN-PART2-BRIEF.md D13: js/funfun/ is the synced Fun Functions app.
  // Its JS is reached through the import graph, so only its stylesheet needs
  // listing, and it must be here because it is loaded into a SHADOW ROOT
  // where an unstyled fallback would leave the whole quest screen bare
  // offline.
  "./js/funfun/styles.css"];

/* ---------- small helpers the three strategies share ---------- */

/* The cache key for a request: its URL with js/lazy.js's ?retry= counter
   stripped off. A retry is the same file asked for again, so its answer
   must heal the one entry every other importer reads, never sit beside it
   as a second copy that nothing looks up. */
function cacheKey(url) {
  const u = new URL(url);
  u.searchParams.delete("retry");
  return u.href;
}

/* A copy of a response carrying the moment it was stored. It CONSUMES the
   response it is handed, so callers pass a clone and keep the original for
   the page. Headers are copied across, so a module keeps its content type. */
async function stamped(res) {
  const body = await res.arrayBuffer();
  const headers = new Headers(res.headers);
  headers.set(STAMP, String(Date.now()));
  return new Response(body, { status: res.status, statusText: res.statusText, headers });
}

/* Young enough to serve without asking the network? A copy with no stamp on
   it counts as old, so it gets revalidated once and then stored stamped. */
function fresh(res) {
  const at = res && Number(res.headers.get(STAMP));
  return !!at && (Date.now() - at) < MAX_AGE_MS;
}

/* Go to the network for real. The browser's OWN http cache sits underneath
   this worker, so a plain fetch can be answered with a file from before the
   deploy, which cache-first would then pin for a week: exactly the bug the
   bump exists to prevent. "no-cache" makes it ask the server every time
   (a conditional request, so an unchanged file still costs no bytes) and
   only the server's answer is stored. A navigation request cannot be rebuilt
   this way (constructing a Request from one throws), and it is network-first
   anyway, so it is passed through untouched. */
function wire(req) {
  if (req.mode === "navigate") return req;
  try { return new Request(req, { cache: "no-cache" }); } catch { return req; }
}

/* Store a stamped copy. Only a 200 is ever kept: a 404 or a captive-portal
   redirect saved as a module would be worse than no entry at all. */
async function keep(cache, key, res) {
  if (!res || res.status !== 200) return;
  try { await cache.put(key, await stamped(res.clone())); } catch {}
}

/* ---------- install / activate ---------- */

self.addEventListener("install", e => {
  /* Precache the shell, each file stamped as it lands, so the first load
     after an install already counts as fresh and nothing is fetched twice.
     One file failing (a typo in SHELL, a flaky moment) loses only that
     file, not the whole precache the way addAll would. */
  e.waitUntil(caches.open(CACHE).then(async cache => {
    await Promise.all(SHELL.map(async path => {
      try {
        const res = await fetch(new Request(path, { cache: "reload" }));
        await keep(cache, cacheKey(new URL(path, self.location.href).href), res);
      } catch {}
    }));
  }).catch(() => {}));
  self.skipWaiting();
});

self.addEventListener("activate", e => {
  /* The bump. Every cache that is not the current CACHE goes, which is what
     makes a deploy land now that code is cache-first. */
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});

/* ---------- the three strategies ---------- */

/* NETWORK-FIRST: navigations, pages, the entry module, and every retry. */
async function networkFirst(req, url) {
  const cache = await caches.open(CACHE);
  const key = cacheKey(url);
  try {
    const res = await fetch(wire(req));
    await keep(cache, key, res);
    return res;
  } catch (err) {
    const hit = await cache.match(key);
    if (hit) return hit;
    if (req.mode === "navigate") {
      const shell = await cache.match("./index.html");
      if (shell) return shell;
    }
    throw err;                 // a real failure, reported as one
  }
}

/* CACHE-FIRST WITH AN AGE LIMIT: the code the app runs on. */
async function codeFirst(req, url) {
  const cache = await caches.open(CACHE);
  const key = cacheKey(url);
  const hit = await cache.match(key);
  if (hit && fresh(hit)) return hit;
  try {
    const res = await fetch(wire(req));
    await keep(cache, key, res);
    return res;
  } catch (err) {
    if (hit) return hit;       // over a week old, but a week-old module beats no app
    throw err;
  }
}

/* CACHE-FIRST, refreshed quietly in the background: images, icons,
   manifest. Unchanged from before this build. */
async function assetFirst(req) {
  const cache = await caches.open(CACHE);
  const cached = await cache.match(req);
  const network = fetch(req).then(res => { if (res && res.status === 200) cache.put(req, res.clone()); return res; }).catch(() => cached);
  return cached || network;
}

const isPage = url => url.pathname.endsWith("/") || url.pathname.endsWith(".html");
const isEntry = url => url.pathname.endsWith("/js/app.js");
const isCode = url => /\.(?:js|css)$/.test(url.pathname);

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;   // network for Supabase / CDN / fonts

  if (req.mode === "navigate" || isPage(url) || isEntry(url) || url.searchParams.has("retry")) {
    e.respondWith(networkFirst(req, url));
    return;
  }
  if (isCode(url)) {
    e.respondWith(codeFirst(req, url));
    return;
  }
  e.respondWith(assetFirst(req));
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
