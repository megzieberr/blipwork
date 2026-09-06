"""What does a screen cost on a SECOND visit, with the service worker on?
(fix day Build 6, 2026-09-06)

tools/count_requests.py answers "what does this screen pull off the network",
and to keep that reading honest it switches the service worker OFF. This
script is its other half: the same five screens, the same session, but with
the real worker installed, so the numbers are what a learner's phone actually
spends once the app has been opened before. It is the measure of what Build
6's cache-first change bought.

Three visits, in one browser session (same origin, same caches):

  visit 1  cold: nothing is cached and the worker is still installing, so
           almost everything is a real fetch. This is a learner's first ever
           open, and it should match count_requests.py closely.
  visit 2  warm: the worker controls the page from the first request. What
           it kept on visit 1 is served from the cache; what it missed
           (everything the page asked for before the worker claimed it) is
           fetched once here and kept.
  visit 3  warm, steady state: what every visit after that costs.

Columns, per screen:
  page req   requests the page itself made
  from sw    how many of those the worker answered out of its own cache
  wire req   requests that left the page: the worker's own fetch() calls plus
             anything it did not intercept (cross-origin, mostly)
  wire KB    bytes those actually transferred

A wire request costing 0 KB was answered by Chromium's OWN http cache rather
than the server, which is why visit 2 shows a lot of requests and no bytes: on
visit 1 the worker only claimed the page part way through the load, so the
files the page had already fetched are not in ITS cache yet and it re-asks for
them here. Visit 3 is the honest steady state.

usage: PYTHONIOENCODING=utf-8 python tools/sw_warm_requests.py
   (start the server first: python -m http.server 5191 from the repo root)
"""
import asyncio, json, os, sys
from playwright.async_api import async_playwright

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "_out"); os.makedirs(OUT, exist_ok=True)
JSON_PATH = os.path.join(OUT, "requests-warm.json")

BASE = "http://localhost:5191"
SESSION = '{"username":"lerato_test","password":"demo1234"}'


async def settle(seen, page, quiet_ms=1200, timeout_ms=25000):
    """Wait until no new request has finished for quiet_ms (or timeout)."""
    waited, last, still = 0, len(seen), 0
    while waited < timeout_ms:
        await page.wait_for_timeout(200)
        waited += 200
        if len(seen) != last:
            last, still = len(seen), 0
        else:
            still += 200
            if still >= quiet_ms:
                return


async def classify(reqs):
    """Split one screen's requests into what the worker answered and what
       actually went out on the wire, and add up the wire bytes."""
    page_reqs = sw_answered = wire_reqs = wire_bytes = 0
    for r in reqs:
        # a request whose initiator IS the service worker is the worker's own
        # fetch(): by definition it went to the network
        by_worker = r.service_worker is not None
        from_cache = False
        if not by_worker:
            page_reqs += 1
            try:
                res = await r.response()
                from_cache = bool(res and res.from_service_worker)
            except Exception:
                from_cache = False
            if from_cache:
                sw_answered += 1
        if by_worker or not from_cache:
            wire_reqs += 1
            try:
                s = await r.sizes()
                wire_bytes += (s.get("responseBodySize") or 0) + (s.get("responseHeadersSize") or 0)
            except Exception:
                pass
    return page_reqs, sw_answered, wire_reqs, wire_bytes


async def walk(page, mark):
    """The five screens, in count_requests.py's order."""
    await page.wait_for_selector(".view", timeout=30000)
    await mark("login")

    await page.evaluate(
        "async (s) => { localStorage.setItem('mhq.session', s);"
        " await window.__APP__.refresh(); window.__APP__.go('hub'); }", SESSION)
    await page.wait_for_selector(".hub-head", timeout=30000)
    await mark("hub")

    await page.evaluate("() => window.__APP__.go('chapter', { chapterId: 'stats' })")
    await page.wait_for_selector(".quest-grid", timeout=30000)
    await mark("chapter (stats)")

    await page.evaluate("() => window.__APP__.go('hub')")
    await page.wait_for_selector(".hub-tabs", timeout=30000)
    await page.evaluate("""() => {
      const tab = [...document.querySelectorAll('.hub-tab')].find(t => /Exam/i.test(t.textContent));
      if (!tab) throw new Error('no Exam Focus tab on the hub');
      tab.click();
    }""")
    await page.wait_for_timeout(400)
    await mark("exam tab")

    await page.evaluate("() => window.__APP__.go('examChapter', { chapterId: 'eqn' })")
    await page.wait_for_selector(".exam-skill-grid", timeout=30000)
    await mark("exam chapter (eqn)")


async def main():
    visits = []
    async with async_playwright() as p:
        b = await p.chromium.launch()
        ctx = await b.new_context(viewport={"width": 375, "height": 812}, service_workers="allow")
        finished = []
        ctx.on("requestfinished", lambda r: finished.append(r))
        page = await ctx.new_page()
        errs = []
        page.on("pageerror", lambda e: errs.append(str(e)[:160]))
        cursor = 0

        for n, label in ((1, "visit 1 (cold, worker installing)"),
                         (2, "visit 2 (warm)"),
                         (3, "visit 3 (warm, steady state)")):
            rows = []

            async def mark(screen):
                nonlocal cursor
                await settle(finished, page)
                chunk = finished[cursor:]
                cursor = len(finished)
                pr, sw, wr, wb = await classify(chunk)
                rows.append({"screen": screen, "page_requests": pr, "from_worker": sw,
                             "wire_requests": wr, "wire_bytes": wb})

            if n == 1:
                await page.goto(f"{BASE}/?local=1", wait_until="load", timeout=120000)
                # register explicitly so the wait below is deterministic rather
                # than racing js/pwa.js's load listener
                await page.evaluate("""async () => {
                  await navigator.serviceWorker.register('sw.js');
                  await navigator.serviceWorker.ready;
                }""")
            else:
                # the same starting point as visit 1: no session, so the first
                # screen really is the roster picker
                await page.evaluate("() => localStorage.removeItem('mhq.session')")
                await page.goto(f"{BASE}/?local=1", wait_until="load", timeout=120000)
                await page.wait_for_function("() => !!navigator.serviceWorker.controller", timeout=30000)
            await walk(page, mark)
            visits.append({"visit": label, "rows": rows})

        await ctx.close()
        await b.close()

    for v in visits:
        rows = v["rows"]
        w = max(len(r["screen"]) for r in rows) + 2
        print(f"\n{v['visit']}")
        print(f"{'screen'.ljust(w)}{'page req':>10}{'from sw':>10}{'wire req':>10}{'wire KB':>10}")
        cum_r = cum_b = 0
        for r in rows:
            cum_r += r["wire_requests"]; cum_b += r["wire_bytes"]
            print(f"{r['screen'].ljust(w)}{r['page_requests']:>10}{r['from_worker']:>10}"
                  f"{r['wire_requests']:>10}{r['wire_bytes']/1024:>10.0f}")
        print(f"{'  (cumulative wire)'.ljust(w)}{'':>10}{'':>10}{cum_r:>10}{cum_b/1024:>10.0f}")

    with open(JSON_PATH, "w", encoding="utf-8") as f:
        json.dump({"visits": visits}, f, indent=2)
    print(f"\nwrote {JSON_PATH}")

asyncio.run(main())
