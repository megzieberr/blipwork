"""Screenshot real play rounds at 375 px: python shoot_round.py gt4 q3 p7 ...
For each quest: opens the play screen, screenshots the first N questions (question side with hint open,
and after pressing the first option / revealing), saving to rounds/<quest>-<i>-q.png / -r.png."""
import sys, os, asyncio
from playwright.async_api import async_playwright
HERE = os.path.dirname(os.path.abspath(__file__)); OUT = os.path.join(HERE, "_out", "rounds"); os.makedirs(OUT, exist_ok=True)
QUESTS = sys.argv[1:]; N = 3

JS_OPEN = """async (qid) => {
  const { CHAPTERS } = await import('/js/config.js');
  const { questDef } = await import('/js/quests/index.js');
  let chapter = null, quest = null;
  for (const ch of CHAPTERS) for (const q of (ch.quests || [])) if (q.id === qid) { chapter = ch; quest = q; }
  if (!quest) return 'no quest ' + qid;
  window.__APP__.go('play', { chapter, quest, def: questDef(qid), accent: chapter.signature || chapter.accent });
  await new Promise(r => setTimeout(r, 900));
  return 'ok';
}"""

async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        ctx = await b.new_context(viewport={"width": 375, "height": 812}, device_scale_factor=2, bypass_csp=True)
        page = await ctx.new_page()
        await page.goto("http://localhost:5191/?local=1", wait_until="networkidle")
        await page.evaluate("async()=>{for(const r of await navigator.serviceWorker.getRegistrations())await r.unregister();for(const k of await caches.keys())await caches.delete(k)}")
        await page.evaluate("()=>localStorage.setItem('mhq.session', JSON.stringify({username:'lerato_test',password:'demo1234'}))")
        await page.goto("http://localhost:5191/?local=1", wait_until="networkidle"); await page.wait_for_timeout(800)
        for qid in QUESTS:
            r = await page.evaluate(JS_OPEN, qid); print(qid, r)
            if r != 'ok': continue
            for i in range(N):
                # open hint if present
                hb = page.locator("button", has_text="Hint")
                if await hb.count():
                    try: await hb.first.click(timeout=1500)
                    except Exception: pass
                await page.wait_for_timeout(300)
                sw = await page.evaluate("document.body.scrollWidth")
                await page.screenshot(path=os.path.join(OUT, f"{qid}-{i}-q.png"), full_page=True)
                # answer: click first option if MCQ, else press the Check button with empty → skip
                opt = page.locator("button.opt")
                if await opt.count():
                    try: await opt.first.click(timeout=1500)
                    except Exception: pass
                await page.wait_for_timeout(500)
                sw2 = await page.evaluate("document.body.scrollWidth")
                await page.screenshot(path=os.path.join(OUT, f"{qid}-{i}-r.png"), full_page=True)
                print(f"  {qid} #{i}: scrollW {sw}/{sw2}")
                nxt = page.locator("button", has_text="Next")
                if await nxt.count():
                    try: await nxt.first.click(timeout=1500)
                    except Exception: pass
                else:
                    # retry/try similar or move on
                    tr = page.locator("button", has_text="similar")
                    if await tr.count():
                        try: await tr.first.click(timeout=1500)
                        except Exception: pass
                await page.wait_for_timeout(600)
        await b.close()
asyncio.run(main())
