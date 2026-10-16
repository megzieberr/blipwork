"""Does the hidden EN/AF switch work end to end? (AFRIKAANS-PLAN.md, QUEUE.md row S1, 2026-10-16)

js/lang.js keeps the device's maths language in localStorage "mhq.lang". Its header
button is hidden (SHOW_TOGGLE = false) until the whole translation is done, so the
address bar is the switch: ?lang=af sets the device to Afrikaans and it sticks,
?lang=en flips it back. This drives the real app at 375 x 812 against
http://localhost:5191/?local=1 with the demo learner and proves it:

  1  /?local=1&lang=af   the key reads "af", and there is NO language button anywhere
  2  Fun Functions       a Functions-chapter round mounts with Afrikaans chrome
                         (Fun Functions is already bilingual), so the mount got "af"
  3  /?local=1           no lang param: the key still reads "af" (it stuck)
  4  /?local=1&lang=en   the key reads "en" and the same round shows English chrome

Nothing is asserted from a screenshot: every check reads the live DOM, and any page
error at all fails the run. One PASS/FAIL line per step; exit 1 on any failure.

usage: python tools/lang_smoke.py
   (start the server first: python -m http.server 5191 from the repo root)
"""
import asyncio, sys
from playwright.async_api import async_playwright

BASE = "http://localhost:5191"
SESSION = '{"username":"lerato_test","password":"demo1234"}'
NO_SW = """
  try { ServiceWorkerContainer.prototype.register = () => Promise.reject(new Error('sw off for the test')); } catch (e) {}
"""
# Fun Functions' own chrome (js/funfun/i18n.js UI): intro buttons, hint ladder, start.
AF_MARKERS = ["Volgende", "Slaan oor", "Ek's verlore", "Begin", "Kyk eers een saam", "Kontroleer"]
EN_MARKERS = ["Next", "Skip this one", "I'm lost", "Start", "Watch one first", "Check"]

steps = []
def step(ok, label, note=""):
    steps.append(bool(ok))
    print(("PASS " if ok else "FAIL ") + label + (f"   [{note}]" if note else ""), flush=True)


async def open_app(ctx, errs, query):
    page = await ctx.new_page()
    page.on("pageerror", lambda e: errs.append(str(e)[:200]))
    await page.goto(f"{BASE}/?local=1{query}", wait_until="load", timeout=60000)
    await page.wait_for_selector(".view", timeout=30000)
    return page


async def key(page):
    return await page.evaluate("() => localStorage.getItem('mhq.lang')")


async def login_to_hub(page):
    await page.evaluate(
        "async (s) => { localStorage.setItem('mhq.session', s);"
        " await window.__APP__.refresh(); window.__APP__.go('hub'); }", SESSION)
    await page.wait_for_selector(".hub-head", timeout=30000)


async def lang_buttons(page):
    """Any language toggle in the DOM: js/lang.js's .lang-btn, or a button reading AF / EN."""
    return await page.evaluate("""() => [...document.querySelectorAll('button')]
      .filter(b => b.classList.contains('lang-btn') || b.classList.contains('exam-lang-btn')
                   || /^\\s*(AF|EN|EN \\/ AF)\\s*$/.test(b.textContent))
      .map(b => b.outerHTML.slice(0, 80))""")


async def funfun_round_chrome(page):
    """Open the Functions chapter, tap the first open Fun Functions tile, and return the
    text of every button inside the mounted round's shadow root."""
    await page.evaluate("() => window.__APP__.go('chapter', { chapterId: 'func' })")
    await page.wait_for_selector(".ff-tiles .ff-tile", timeout=30000)
    tiles = await page.query_selector_all(".ff-tiles .ff-tile:not(.locked)")
    if not tiles:
        return None
    await tiles[0].click()
    await page.wait_for_selector(".ff-host", timeout=30000)
    await page.wait_for_timeout(2500)
    return await page.evaluate("""() => {
      const h = document.querySelector('.ff-host');
      if (!h || !h.shadowRoot) return null;
      return [...h.shadowRoot.querySelectorAll('button')].map(b => (b.textContent || '').trim()).filter(Boolean);
    }""")


def has_any(texts, markers):
    return [m for m in markers if any(m in t for t in texts)]


async def main():
    errs = []
    async with async_playwright() as p:
        b = await p.chromium.launch()
        ctx = await b.new_context(viewport={"width": 375, "height": 812})
        await ctx.add_init_script(NO_SW)

        # ---- 1. ?lang=af sets the device; no toggle button ---------------------
        page = await open_app(ctx, errs, "&lang=af")
        k = await key(page)
        await login_to_hub(page)
        btns = await lang_buttons(page)
        step(k == "af" and not btns,
             "1  /?local=1&lang=af sets mhq.lang to \"af\" and no language button renders (hub)",
             f"key={k!r}, toggles={btns}")

        # ---- 2. the Fun Functions mount receives "af" ---------------------------
        texts = await funfun_round_chrome(page) or []
        af, en = has_any(texts, AF_MARKERS), has_any(texts, EN_MARKERS)
        step(bool(af) and not en,
             "2  a Fun Functions round mounts with Afrikaans chrome",
             f"af={af}, en={en}, buttons={texts[:6]}")
        await page.close()

        # ---- 3. no param: it stuck ----------------------------------------------
        page = await open_app(ctx, errs, "")
        k = await key(page)
        step(k == "af", "3  /?local=1 (no lang param) still reads \"af\": the device remembered it", f"key={k!r}")
        await page.close()

        # ---- 4. ?lang=en flips it back -------------------------------------------
        page = await open_app(ctx, errs, "&lang=en")
        k = await key(page)
        await login_to_hub(page)
        texts = await funfun_round_chrome(page) or []
        af, en = has_any(texts, AF_MARKERS), has_any(texts, EN_MARKERS)
        step(k == "en" and bool(en) and not af,
             "4  /?local=1&lang=en sets mhq.lang to \"en\" and the same round shows English chrome",
             f"key={k!r}, en={en}, af={af}, buttons={texts[:6]}")
        await page.close()

        step(not errs, f"   no page errors across the run ({len(errs)})", "; ".join(errs[:2]))
        await ctx.close()
        await b.close()

    bad = steps.count(False)
    print(f"\n===== {len(steps) - bad}/{len(steps)} steps passed =====")
    if bad:
        sys.exit(1)
    print("ALL GOOD")

asyncio.run(main())
