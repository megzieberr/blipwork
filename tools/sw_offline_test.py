"""Does the app still work with no signal, and does a CACHE bump still land?
(fix day Build 6, 2026-09-06)

Build 6 turned the service worker's app code from network-first into
CACHE-FIRST with a 7-day age limit, so two things now have to be proved by
running them, not by reading sw.js:

  PART 1  OFFLINE. With the worker really registered and controlling the page
          (no stubbing, unlike tools/count_requests.py), play a chapter
          online, then pull the plug with context.set_offline(True):
            - the chapter that was played still opens and a round starts
            - a chapter that was never opened shows the app's own
              "Can't reach the server" line, and its map stays on screen
            - the way back to the hub still works
          A probe first proves the offline switch reaches the WORKER's own
          fetch, not just the page's, so a pass cannot be a false pass.

  PART 2  EVICTION. The CACHE name is temporarily bumped in sw.js on disk,
          the page is reloaded, and the run asserts the old cache is gone,
          the new one exists, and the app code is in it: with the old cache
          deleted there is nowhere else it could have come from, so that IS
          the proof the deploy landed. sw.js is restored afterwards in a
          finally block, so a crashed run cannot leave a bumped file behind.

usage: PYTHONIOENCODING=utf-8 python tools/sw_offline_test.py
   (start the server first: python -m http.server 5191 from the repo root)
"""
import asyncio, os, re, sys
from playwright.async_api import async_playwright

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SW_PATH = os.path.join(ROOT, "sw.js")
BASE = "http://localhost:5191"
SESSION = '{"username":"lerato_test","password":"demo1234"}'
TEST_CACHE = "mhq-v91-evict-test"

PLAYED = "stats"        # opened and played while online
UNPLAYED = "finance"    # never opened before the connection drops

results = []


def tick(ok, label, note=""):
    note = str(note).encode("ascii", "replace").decode("ascii")
    results.append((bool(ok), label, note))
    print(("  ok   " if ok else "  FAIL ") + label + (f"   [{note}]" if note else ""), flush=True)


async def sw_boot(ctx, errs, reload_once=True):
    """A page with the REAL service worker installed, active and controlling."""
    page = await ctx.new_page()
    page.on("pageerror", lambda e: errs.append(str(e)[:200]))
    await page.goto(f"{BASE}/?local=1", wait_until="load", timeout=60000)
    await page.wait_for_selector(".view", timeout=30000)
    # js/pwa.js registers on window load; registering again is idempotent and
    # makes the wait deterministic instead of racing that listener.
    await page.evaluate("""async () => {
      await navigator.serviceWorker.register('sw.js');
      await navigator.serviceWorker.ready;
    }""")
    await page.wait_for_function("() => !!navigator.serviceWorker.controller", timeout=30000)
    if reload_once:
        # The first load ran before the worker controlled the page, so its
        # requests never reached it. Reload once and everything after this
        # line is genuinely served through sw.js.
        await page.reload(wait_until="load", timeout=60000)
        await page.wait_for_selector(".view", timeout=30000)
        await page.wait_for_function("() => !!navigator.serviceWorker.controller", timeout=30000)
    return page


async def login(page):
    await page.evaluate(
        "async (s) => { localStorage.setItem('mhq.session', s);"
        " await window.__APP__.refresh(); window.__APP__.go('hub'); }", SESSION)
    await page.wait_for_selector(".hub-head", timeout=30000)


async def cache_keys(page):
    return await page.evaluate("() => caches.keys()")


async def cache_urls(page, name):
    return await page.evaluate(
        "async (n) => { const c = await caches.open(n); return (await c.keys()).map(r => r.url); }", name)


async def stamp_of(page, name, path):
    return await page.evaluate("""async ([n, p]) => {
      const c = await caches.open(n);
      const res = await c.match(new URL(p, location.href).href);
      return res ? res.headers.get('x-sw-cached-at') : null;
    }""", [name, path])


async def open_round(page, chapter_id, timeout=20000):
    """Open a chapter map and tap its first playable quest card.
       Returns (a round started?, the toast text, cards drawn, cards left after).

       The two outcomes are RACED rather than waited for in turn: the app's
       toast only lives 2,9 seconds (js/ui.js), so waiting out a timeout on
       .q-prompt first would miss the very line this test is here to read."""
    await page.evaluate("(id) => window.__APP__.go('chapter', { chapterId: id })", chapter_id)
    await page.wait_for_selector(".quest-grid", timeout=30000)
    drawn = len(await page.query_selector_all(".quest-grid .quest"))
    card = await page.query_selector(".quest-grid .quest:not(.dice-card):not(.locked)")
    if card is None:
        return (False, "", drawn, drawn)
    await card.click()
    started, toast_txt, waited = False, "", 0
    while waited < timeout:
        if await page.query_selector(".q-prompt"):
            started = True
            break
        t = await page.query_selector(".toast")
        if t:
            toast_txt = (await t.inner_text()).strip()
            break
        await page.wait_for_timeout(150)
        waited += 150
    left = len(await page.query_selector_all(".quest-grid .quest"))
    return (started, toast_txt, drawn, left)


# ============================================================
# PART 1 - offline
# ============================================================
async def part1(ctx):
    print("\n1. OFFLINE: the worker is real, then the connection drops")
    errs = []
    page = await sw_boot(ctx, errs)

    active = await page.evaluate("() => navigator.serviceWorker.controller.scriptURL")
    tick(active.endswith("/sw.js"), "the page is controlled by the real sw.js", active)
    await login(page)

    started, _, drawn, _ = await open_round(page, PLAYED)
    tick(started, f"ONLINE: the {PLAYED} chapter plays a round ({drawn} cards on the map)")

    names = await cache_keys(page)
    tick(names == ["mhq-v91"], "one cache, the versioned one", str(names))
    urls = await cache_urls(page, "mhq-v91")
    tick(any(u.endswith("/js/screens.js") for u in urls), f"app code is in the cache ({len(urls)} entries)")
    retries = [u for u in urls if "retry=" in u]
    tick(not retries, "no ?retry= variant was stored as its own entry", str(retries[:2]))
    stamp = await stamp_of(page, "mhq-v91", "js/screens.js")
    tick(bool(stamp) and stamp.isdigit(), "each stored copy carries x-sw-cached-at", stamp)

    # ---- pull the plug ----
    await ctx.set_offline(True)
    probe = await page.evaluate("""async () => {
      try { const r = await fetch('js/quests/questf1-words.js?probe=1'); return 'resolved ' + r.status; }
      catch (e) { return 'rejected'; }
    }""")
    tick(probe == "rejected",
         "the offline switch reaches the WORKER's own fetch, so this is a real test", probe)

    started, _, drawn, _ = await open_round(page, PLAYED)
    tick(started, f"OFFLINE: the played {PLAYED} chapter still opens and a round starts ({drawn} cards)")

    await page.evaluate("() => window.__APP__.go('hub')")
    await page.wait_for_selector(".hub-head", timeout=30000)
    started, toast, drawn, left = await open_round(page, UNPLAYED, timeout=15000)
    tick(not started, f"OFFLINE: the unplayed {UNPLAYED} chapter does not open a half-built player")
    tick("Can't reach the server" in toast,
         "OFFLINE: it shows the app's OWN can't-reach-the-server line", toast[:60])
    tick(left > 0, f"OFFLINE: the chapter map is still on screen, never blank ({drawn} drawn, {left} left)")

    await page.click(".chap-head .back")
    await page.wait_for_selector(".hub-head", timeout=30000)
    hub = await page.query_selector_all(".chapter-cards .ch-card")
    tick(len(hub) > 0, f"OFFLINE: back to the hub still works and the hub still draws ({len(hub)} chapters)")

    # ---- the signal comes back: the ?retry= rule, end to end ----
    # js/lazy.js asks for a burned module under a fresh ?retry=, which the
    # worker sends network-first and then stores under the PLAIN url. Both
    # halves are proved here, after a failure that really happened: the second
    # tap opens the round with no reload, and the cache gains one entry for
    # that module rather than a retry variant sitting beside it.
    await ctx.set_offline(False)
    started, _, drawn, _ = await open_round(page, UNPLAYED)
    tick(started, f"BACK ONLINE: a second tap on {UNPLAYED} opens the round, no reload needed")
    urls = await cache_urls(page, "mhq-v91")
    tick(any(u.endswith("/js/quests/questf1-words.js") for u in urls),
         "the retried module was stored under its PLAIN url")
    retries = [u for u in urls if "retry=" in u]
    tick(not retries, "still no ?retry= variant in the cache after a real retry", str(retries[:2]))

    tick(not errs, f"no uncaught page errors across part 1 ({len(errs)})", "; ".join(errs[:2]))
    await page.close()


# ============================================================
# PART 2 - eviction (a temporary CACHE bump, restored afterwards)
# ============================================================
async def part2(ctx, original):
    print("\n2. EVICTION: bump CACHE and watch the old cache go")
    errs = []
    page = await sw_boot(ctx, errs)
    await login(page)
    before = await cache_keys(page)
    before_urls = await cache_urls(page, "mhq-v91")
    tick(before == ["mhq-v91"], f"before the bump: {before} ({len(before_urls)} entries)")

    # the bump, on disk, exactly as a ship would write it
    with open(SW_PATH, "w", encoding="utf-8", newline="") as f:
        f.write(original.replace('const CACHE = "mhq-v91";', f'const CACHE = "{TEST_CACHE}";'))
    print(f"  ..  sw.js temporarily bumped to {TEST_CACHE}")

    # reload once so the browser picks up the new worker script, then wait for
    # the new cache to appear (install) and the old one to go (activate)
    await page.reload(wait_until="load", timeout=60000)
    await page.evaluate("""async () => {
      const reg = await navigator.serviceWorker.getRegistration();
      if (reg) await reg.update();
    }""")
    swapped = False
    for _ in range(60):
        names = await cache_keys(page)
        if TEST_CACHE in names and "mhq-v91" not in names:
            swapped = True
            break
        await page.wait_for_timeout(500)
    names = await cache_keys(page)
    tick(swapped, f"after the bump: {names}")
    tick("mhq-v91" not in names, "the OLD cache is gone (activate evicted it)")
    tick(TEST_CACHE in names, "the NEW cache exists")

    # the second reload is served by the new worker off an EMPTY cache, so
    # every module in it now was refetched from the network
    fetched = []
    ctx.on("requestfinished", lambda r: fetched.append(r.url))
    await page.reload(wait_until="load", timeout=60000)
    await page.wait_for_selector(".view", timeout=30000)
    await login(page)
    await page.evaluate("(id) => window.__APP__.go('chapter', { chapterId: id })", PLAYED)
    await page.wait_for_selector(".quest-grid", timeout=30000)
    await page.wait_for_timeout(1500)

    after_urls = await cache_urls(page, TEST_CACHE)
    tick(any(u.endswith("/js/screens.js") for u in after_urls),
         f"app code was refetched into the new cache ({len(after_urls)} entries)")
    stamp = await stamp_of(page, TEST_CACHE, "js/screens.js")
    tick(bool(stamp) and stamp.isdigit(), "the refetched copy is stamped fresh", stamp)
    code_hits = [u for u in fetched if u.endswith(".js") or u.endswith(".css")]
    print(f"  ..  {len(code_hits)} code requests seen on the wire during the post-bump reload")
    cards = await page.query_selector_all(".quest-grid .quest")
    tick(len(cards) > 0, f"the app still works on the new version ({len(cards)} cards on the map)")
    tick(not errs, f"no uncaught page errors across part 2 ({len(errs)})", "; ".join(errs[:2]))
    await page.close()


async def main():
    with open(SW_PATH, encoding="utf-8", newline="") as f:
        original = f.read()
    if 'const CACHE = "mhq-v91";' not in original:
        print("sw.js does not hold `const CACHE = \"mhq-v91\";` - refusing to guess at the bump")
        return 1
    async with async_playwright() as p:
        b = await p.chromium.launch()
        try:
            ctx = await b.new_context(viewport={"width": 375, "height": 812},
                                      service_workers="allow")
            await part1(ctx)
            await ctx.close()

            ctx = await b.new_context(viewport={"width": 375, "height": 812},
                                      service_workers="allow")
            try:
                await part2(ctx, original)
            finally:
                # whatever happened, sw.js goes back exactly as it was
                with open(SW_PATH, "w", encoding="utf-8", newline="") as f:
                    f.write(original)
                print("  ..  sw.js restored")
            await ctx.close()
        finally:
            await b.close()

    with open(SW_PATH, encoding="utf-8", newline="") as f:
        back = f.read()
    tick(back == original, "sw.js is byte-for-byte back to where it started")

    bad = [r for r in results if not r[0]]
    print(f"\n===== {len(results) - len(bad)}/{len(results)} checks passed =====")
    if bad:
        print("FAIL:")
        for _, label, note in bad:
            print("  x " + label + (f"   [{note}]" if note else ""))
        return 1
    print("ALL GOOD")
    return 0


sys.exit(asyncio.run(main()))
