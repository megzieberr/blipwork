"""Shoot every card of ONE Exam Focus skill tile at 375 px.

usage:  python shoot.py <chapterId> <skillId> [cardIdSubstring]

    python shoot.py func find-equation
    python shoot.py tgraph sketch
    python shoot.py euclid level-4 t2q5

The chapter is now an ARGUMENT (2026-08-23, EXAM-BUILD-DAY.md session 0
— it used to be hard-coded to "func"). It is resolved through
js/config.js's examChapterById(), NOT chapterById(), so the EXAM-ONLY
chapters work too: euclid and algx own no drill quests and are therefore
absent from CHAPTERS entirely. An unknown chapter id exits cleanly with a
message rather than throwing inside the browser.

Writes full-page PNGs to  tools/shots/   (<cardId>-q.png, -rK.png)
and per-state SKETCH CROPS to tools/diags/
    <cardId>-q-N.png    question side, Nth .exam-diagram on screen
    <cardId>-rK-N.png   after the Kth "Done" tap
Clears the service worker + caches and logs itself in against the
http.server on :5191 serving the repo root.
"""
import sys, os, asyncio, re
from playwright.async_api import async_playwright

HERE = os.path.dirname(os.path.abspath(__file__))
DIAGS = os.path.join(HERE, "diags")
SHOTS = os.path.join(HERE, "shots")
os.makedirs(DIAGS, exist_ok=True)
os.makedirs(SHOTS, exist_ok=True)

if len(sys.argv) < 3:
    print(__doc__)
    sys.exit(2)

chapter = sys.argv[1]
skill = sys.argv[2]
only = sys.argv[3] if len(sys.argv) > 3 else None

# examChapterById = CHAPTERS + EXAM_ONLY_CHAPTERS (euclid, algx), which is
# the whole reason this is not chapterById().
JS_LIST = """async ([chapter, skill]) => {
  const {examChapterById} = await import('/js/config.js');
  const {examQuestionsForTopic} = await import('/js/exam/index.js');
  if (!examChapterById(chapter)) return {error: 'no such exam chapter: ' + chapter};
  return {ids: examQuestionsForTopic(chapter, skill).map(c => c.id)};
}"""

JS_OPEN = """async ([chapter, skill, id]) => {
  const {examChapterById} = await import('/js/config.js');
  const {examQuestionsForTopic} = await import('/js/exam/index.js');
  const ch = examChapterById(chapter);
  const q = examQuestionsForTopic(chapter, skill).find(c => c.id === id);
  window.__APP__.go('examPlay', {chapter: ch, skillId: skill, question: q, accent: ch.signature});
  await new Promise(r => setTimeout(r, 700));
  return q.parts.length;
}"""


async def crops(page, card, tag):
    els = await page.query_selector_all(".exam-diagram")
    n = 0
    for i, el in enumerate(els):
        try:
            await el.screenshot(path=os.path.join(DIAGS, f"{card}-{tag}-{i}.png"))
            n += 1
        except Exception as e:
            print("   skip", card, tag, i, e)
    return n


async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        ctx = await b.new_context(viewport={"width": 375, "height": 812},
                                  device_scale_factor=3, bypass_csp=True)
        page = await ctx.new_page()
        errs = []
        page.on("pageerror", lambda e: errs.append(str(e)[:300]))
        await page.goto("http://localhost:5191/?local=1", wait_until="networkidle")
        await page.evaluate("async()=>{for(const r of await navigator.serviceWorker.getRegistrations())await r.unregister();"
                            "for(const k of await caches.keys())await caches.delete(k)}")
        await page.reload(wait_until="networkidle")
        await page.evaluate("()=>localStorage.setItem('mhq.session', JSON.stringify({username:'lerato_test',password:'demo1234'}))")
        await page.goto("http://localhost:5191/?local=1", wait_until="networkidle")
        await page.wait_for_timeout(1200)

        res = await page.evaluate(JS_LIST, [chapter, skill])
        if res.get("error"):
            print(res["error"])
            await b.close()
            return
        ids = res["ids"]
        if only:
            ids = [i for i in ids if only in i]
        print(f"{chapter} / {skill}: {len(ids)} card(s)")

        for card in ids:
            n = await page.evaluate(JS_OPEN, [chapter, skill, card])
            sw = await page.evaluate("()=>document.documentElement.scrollWidth")
            got = await crops(page, card, "q")
            await page.screenshot(path=os.path.join(SHOTS, f"{card}-q.png"), full_page=True)
            revs = 0
            for k in range(n):
                btn = page.locator("button", has_text="Done")
                if await btn.count() == 0:
                    break
                await btn.first.click()
                await page.wait_for_timeout(800)
                revs += 1
                got += await crops(page, card, f"r{k+1}")
                await page.screenshot(path=os.path.join(SHOTS, f"{card}-r{k+1}.png"), full_page=True)
                nxt = page.locator("button", has_text=re.compile("next", re.I))
                if await nxt.count():
                    await nxt.first.click()
                    await page.wait_for_timeout(700)
            print(f"  {card}: parts={n} reveals={revs} crops={got} scrollW={sw}")

        if errs:
            print("PAGE ERRORS:")
            for e in errs:
                print("  ", e)
        else:
            print("no page errors")
        await b.close()

asyncio.run(main())
