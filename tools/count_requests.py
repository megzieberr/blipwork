"""How much does each screen cost to open? (fix day Build 6, 2026-09-06)

Counts the HTTP requests and the transferred bytes the browser makes, screen by
screen, in ONE browser session at 375 x 812 against http://localhost:5191/?local=1
with the demo learner. Same shape as tools/harness_run.py: headless Chromium, the
service worker deliberately switched off so every count is a real network fetch and
never a cached reply.

Screens, in order (each row is the DELTA that screen cost, plus the running total):

  login        the roster picker, no session in localStorage
  hub          the chapter hub, after a local login
  chapter      one chapter's quest map (Statistics)
  exam tab     the hub's the Exam Focus tab (chapter cards only)
  exam chapter one exam chapter's skill tiles (Equations) - where the cards load

usage: python tools/count_requests.py [--json path]
   (start the server first: python -m http.server 5191 from the repo root)

Prints a table and writes tools/_out/requests.json (git-ignored), so a before/after
pair can be diffed by eye or by script.
"""
import asyncio, json, os, sys
from playwright.async_api import async_playwright

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "_out"); os.makedirs(OUT, exist_ok=True)
JSON_PATH = os.path.join(OUT, "requests.json")
if "--json" in sys.argv:
    JSON_PATH = sys.argv[sys.argv.index("--json") + 1]

BASE = "http://localhost:5191"
SESSION = '{"username":"lerato_test","password":"demo1234"}'

# The service worker would answer some of these requests from its own cache, which
# is exactly what Build 6's second half changes - so it is switched off here and the
# numbers stay a straight "what does this screen pull off the network" reading.
NO_SW = """
  try {
    // leave the API itself in place (js/pwa.js feature-tests `"serviceWorker" in
    // navigator`) and only make registering a no-op that resolves to nothing.
    ServiceWorkerContainer.prototype.register = () => Promise.reject(new Error('sw off for the count'));
  } catch (e) {}
"""


async def settle(page, seen, quiet_ms=1200, timeout_ms=25000):
    """Wait until no new request has finished for quiet_ms (or timeout)."""
    waited = 0
    last = len(seen)
    still = 0
    while waited < timeout_ms:
        await page.wait_for_timeout(200)
        waited += 200
        if len(seen) != last:
            last = len(seen); still = 0
        else:
            still += 200
            if still >= quiet_ms:
                return


async def main():
    rows = []
    async with async_playwright() as p:
        b = await p.chromium.launch()
        ctx = await b.new_context(viewport={"width": 375, "height": 812})
        await ctx.add_init_script(NO_SW)
        page = await ctx.new_page()
        errs = []
        page.on("pageerror", lambda e: errs.append(str(e)[:160]))

        finished = []
        page.on("requestfinished", lambda r: finished.append(r))

        cursor = 0

        async def mark(label):
            """Close off one screen: its own delta, and the running total."""
            nonlocal cursor
            await settle(page, finished)
            new = finished[cursor:]
            cursor = len(finished)
            nbytes = 0
            for r in new:
                try:
                    s = await r.sizes()
                    nbytes += (s.get("responseBodySize") or 0) + (s.get("responseHeadersSize") or 0)
                except Exception:
                    pass
            row = {"screen": label, "requests": len(new), "bytes": nbytes,
                   "cum_requests": cursor, "cum_bytes": (rows[-1]["cum_bytes"] if rows else 0) + nbytes}
            rows.append(row)

        # ---- 1. login (no session) -------------------------------------------
        await page.goto(f"{BASE}/?local=1", wait_until="load", timeout=120000)
        await page.wait_for_selector(".view", timeout=30000)
        await mark("login")

        # ---- 2. hub (after a local login) ------------------------------------
        # The session is set the way tools/shoot_round.py sets it, then the app's
        # own refresh() + go() run - no page reload, so nothing is counted twice.
        await page.evaluate(
            "async (s) => { localStorage.setItem('mhq.session', s);"
            " await window.__APP__.refresh(); window.__APP__.go('hub'); }", SESSION)
        await page.wait_for_selector(".hub-head", timeout=30000)
        await mark("hub")

        # ---- 3. one chapter (Statistics) -------------------------------------
        await page.evaluate("() => window.__APP__.go('chapter', { chapterId: 'stats' })")
        await page.wait_for_selector(".quest-grid", timeout=30000)
        await mark("chapter (stats)")

        # ---- 4. the Exam Focus tab on the hub --------------------------------
        await page.evaluate("() => window.__APP__.go('hub')")
        await page.wait_for_selector(".hub-tabs", timeout=30000)
        await page.evaluate("""() => {
          const tab = [...document.querySelectorAll('.hub-tab')].find(t => /Exam/i.test(t.textContent));
          if (!tab) throw new Error('no Exam Focus tab on the hub');
          tab.click();
        }""")
        await page.wait_for_timeout(400)
        await mark("exam tab")

        # ---- 5. one exam chapter's skill tiles -------------------------------
        await page.evaluate("() => window.__APP__.go('examChapter', { chapterId: 'eqn' })")
        await page.wait_for_selector(".exam-skill-grid", timeout=30000)
        await mark("exam chapter (eqn)")

        await ctx.close()
        await b.close()

    w = max(len(r["screen"]) for r in rows) + 2
    print(f"{'screen'.ljust(w)}{'requests':>10}{'KB':>10}{'cum req':>10}{'cum KB':>10}")
    for r in rows:
        print(f"{r['screen'].ljust(w)}{r['requests']:>10}{r['bytes']/1024:>10.0f}"
              f"{r['cum_requests']:>10}{r['cum_bytes']/1024:>10.0f}")
    if errs:
        print("\nPAGE ERRORS:")
        for e in errs:
            print("  " + e)
    else:
        print("\nno page errors")
    with open(JSON_PATH, "w", encoding="utf-8") as f:
        json.dump({"rows": rows, "pageErrors": errs}, f, indent=2)
    print(f"wrote {JSON_PATH}")

asyncio.run(main())
