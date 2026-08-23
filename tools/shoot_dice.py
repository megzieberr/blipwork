"""Shoot REAL dice rounds of one chapter at 375 px (phone width).

usage:  python shoot_dice.py <chapterId> [rounds=2]

    python shoot_dice.py stats
    python shoot_dice.py finance 3

Written by the foreman for the 2026-08-23 dice build (Finance / Number
Patterns / 2D Trig pools). It launches js/dice-play.js's openDiceRound()
straight from page JS, so it works for a chapter whose pool is wired in
js/quests/dice-pools.js even while config.js's DICE_CHAPTERS flag is still
off (the hub 🎲 card is the ONLY thing the flag gates). Every question of
every round is photographed: the question side (hint open if there is
one), the method panel when the pool attached one, the feedback after a
deliberately WRONG answer (first option / empty Check), and the "Show me
the steps" panel — everything a stuck learner sees. It advances by bumping
the saved index and RESUMING (the production regenerate-from-seed path),
so a whole round is walked without solving anything. Writes
tools/_out/dice/<chapter>-r<round>-<i>-{q,m,r,s}.png, <chapter>-r<round>-
end.png (the results screen) and _manifest-<chapter>.json (skillId +
scrollWidth per question) so a reviewer can read "this crop = that skill". A scrollWidth above 375 means something overflowed
the phone — that is a finding, not a cosmetic.

Same posture as shoot_round.py: :5191, ?local=1, the demo learner, service
worker + caches cleared first, page errors reported at the end.
"""
import sys, os, json, asyncio
from playwright.async_api import async_playwright

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "_out", "dice"); os.makedirs(OUT, exist_ok=True)
if len(sys.argv) < 2: print(__doc__); sys.exit(2)
CH = sys.argv[1]; ROUNDS = int(sys.argv[2]) if len(sys.argv) > 2 else 2

JS_OPEN = """async (chId) => {
  const { chapterById } = await import('/js/config.js');
  const { dicePool } = await import('/js/quests/dice-pools.js');
  const { openDiceRound } = await import('/js/dice-play.js');
  const ch = chapterById(chId);
  if (!ch) return 'no chapter ' + chId;
  const pool = dicePool(chId);
  if (!pool) return 'no pool wired for ' + chId;
  if (!pool.entries.length) return 'pool has no entries';
  await openDiceRound(window.__APP__, ch);
  await new Promise(r => setTimeout(r, 900));
  return 'ok ' + pool.entries.length + ' entries, roundLength ' + pool.roundLength;
}"""
JS_ADVANCE = """([chId, nextIndex]) => {
  // resume trick: bump the saved index in the local backend's store so the
  // next openDiceRound() RESUMES at the following question (js/dice-play.js
  // regenerates it from roundSeed + skillIds — the exact production path).
  const all = JSON.parse(localStorage.getItem('mhq.dicePlays') || '{}');
  let out = null;
  for (const sid of Object.keys(all)) {
    const row = all[sid] && all[sid][chId];
    if (row && row.save && Array.isArray(row.save.skillIds)) {
      // ABSOLUTE, not +1: js/play.js's own checkpoint (dice.recordAnswer) has
      // usually already moved the saved index past the question just shot.
      row.save.index = nextIndex;
      row.save.answeredCorrect = Array.from({ length: nextIndex }, (_, k) => (row.save.answeredCorrect || [])[k] ?? true);
      out = { index: row.save.index, total: row.save.skillIds.length };
    }
  }
  localStorage.setItem('mhq.dicePlays', JSON.stringify(all));
  return out;
}"""
JS_CURRENT = """(chId) => {
  const all = JSON.parse(localStorage.getItem('mhq.dicePlays') || '{}');
  for (const sid of Object.keys(all)) {
    const row = all[sid] && all[sid][chId];
    if (row && row.save && Array.isArray(row.save.skillIds)) return { index: row.save.index || 0, skill: row.save.skillIds[row.save.index || 0], total: row.save.skillIds.length };
  }
  return null;
}"""
JS_CLEAR = """(ch) => {
  const all = JSON.parse(localStorage.getItem('mhq.dicePlays') || '{}');
  for (const sid of Object.keys(all)) { if (all[sid][ch]) all[sid][ch].save = null; }
  localStorage.setItem('mhq.dicePlays', JSON.stringify(all));
}"""

async def shot(page, path):
    await page.screenshot(path=path, full_page=True)

async def click_text(page, pattern, wait=400):
    loc = page.locator("button", has_text=pattern)
    if await loc.count():
        try:
            await loc.first.click(timeout=1500); await page.wait_for_timeout(wait); return True
        except Exception: return False
    return False

async def main():
    errs = []; manifest = []
    async with async_playwright() as p:
        b = await p.chromium.launch()
        ctx = await b.new_context(viewport={"width": 375, "height": 812}, device_scale_factor=2, bypass_csp=True)
        page = await ctx.new_page()
        page.on("pageerror", lambda e: errs.append(str(e)[:160]))
        HUB = "http://localhost:5191/?local=1"
        await page.goto(HUB, wait_until="networkidle")
        await page.evaluate("async()=>{for(const r of await navigator.serviceWorker.getRegistrations())await r.unregister();for(const k of await caches.keys())await caches.delete(k)}")
        await page.evaluate("()=>localStorage.setItem('mhq.session', JSON.stringify({username:'lerato_test',password:'demo1234'}))")
        await page.evaluate(JS_CLEAR, CH)          # no half-finished round from an earlier run
        await page.goto(HUB, wait_until="networkidle"); await page.wait_for_timeout(800)
        for r in range(ROUNDS):
            res = await page.evaluate(JS_OPEN, CH); print(f"round {r}: {res}")
            if not res.startswith("ok"): break
            for i in range(60):
                cur = await page.evaluate(JS_CURRENT, CH)
                if not cur: break
                skill = cur["skill"]; tag = f"{CH}-r{r}-{i:02d}"
                await click_text(page, "Hint", 300)                      # question side, hint open
                sw = await page.evaluate("document.body.scrollWidth")
                await shot(page, os.path.join(OUT, f"{tag}-q.png"))
                mshot = await click_text(page, "Show me the method", 300)  # the method panel, when present
                if mshot: await shot(page, os.path.join(OUT, f"{tag}-m.png"))
                # answer WRONG on purpose (first option / empty Check): the feedback
                # and the steps panel are what a stuck learner sees
                opt = page.locator("button.opt")
                if await opt.count():
                    try: await opt.first.click(timeout=1500)
                    except Exception: pass
                else:
                    await click_text(page, "Submit", 200)   # the number pad's button is "Submit ✓" (trig session's find)
                await page.wait_for_timeout(500)
                sw2 = await page.evaluate("document.body.scrollWidth")
                await shot(page, os.path.join(OUT, f"{tag}-r.png"))
                sshot = await click_text(page, "Show me the steps", 400)
                if sshot: await shot(page, os.path.join(OUT, f"{tag}-s.png"))
                manifest.append({"round": r, "i": i, "skill": skill, "method": mshot, "steps": sshot, "scrollW": [sw, sw2]})
                flag = "" if max(sw, sw2) <= 375 else "  <-- OVERFLOW"
                print(f"  {tag}  {skill:<28} scrollW {sw}/{sw2}{' method' if mshot else ''}{' steps' if sshot else ''}{flag}")
                # advance: bump the saved index, reload the hub (re-reads the store), resume
                adv = await page.evaluate(JS_ADVANCE, [CH, i + 1])
                await page.goto(HUB, wait_until="networkidle"); await page.wait_for_timeout(500)
                res2 = await page.evaluate(JS_OPEN, CH)
                await page.wait_for_timeout(600)
                if not adv or adv["index"] >= adv["total"]:
                    # index == total -> openDiceRound pays the round out: the results screen
                    await shot(page, os.path.join(OUT, f"{CH}-r{r}-end.png"))
                    print(f"  {CH}-r{r}-end  ({res2})")
                    break
                if not res2.startswith("ok"): print("  resume failed:", res2); break
            await page.goto(HUB, wait_until="networkidle"); await page.wait_for_timeout(500)
        await b.close()
    with open(os.path.join(OUT, f"_manifest-{CH}.json"), "w", encoding="utf-8") as f: json.dump(manifest, f, indent=1, ensure_ascii=False)
    print("page errors:", errs if errs else "none")
asyncio.run(main())
