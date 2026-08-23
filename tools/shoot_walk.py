"""Shoot the WALK of every card of ONE Exam Focus skill tile at 375 px.

usage:  python shoot_walk.py <chapterId> <skillId> [cardIdSubstring]

    python shoot_walk.py euclid bookwork-proofs
    python shoot_walk.py euclid bookwork-proofs bw.q1

WHY THIS EXISTS (session G3, 2026-08-23). shoot.py captures the two
states a card's figure USED to have: the question side, and the reveal
after each "Done! Show me the answer" tap. From today a bookwork proof's
figure also has a state per memo step while "Walk me through it" is
running (js/exam/_walk.js), and those states are the ones her learners
see for most of the proof. shoot.py never taps the walk button, so it
cannot see any of them. This does: it opens each card, taps "Walk me
through it", and photographs the sketch after EVERY "Next step ->",
including the last one — which flips the part to fully revealed and is
therefore the shot that proves the walk ends on the same picture the
Done path draws.

Writes per-step SKETCH CROPS to  tools/diags-walk/
    <cardId>-<partId>-w<NN>.png    NN = memo blocks revealed (00 = none yet)
    <cardId>-<partId>-done.png     the figure after the final click
plus a full-page PNG of each walk step to  tools/shots-walk/
and a per-card manifest line naming, for every crop, the memo line it
belongs to — so a reviewer can read "step -> picture" without counting.

Same posture as shoot.py: :5191, ?local=1, the demo learner, service
worker and caches cleared first, page errors reported at the end.
"""
import sys, os, re, json, asyncio
from playwright.async_api import async_playwright

HERE = os.path.dirname(os.path.abspath(__file__))
DIAGS = os.path.join(HERE, "diags-walk")
SHOTS = os.path.join(HERE, "shots-walk")
os.makedirs(DIAGS, exist_ok=True)
os.makedirs(SHOTS, exist_ok=True)

if len(sys.argv) < 3:
    print(__doc__)
    sys.exit(2)

chapter = sys.argv[1]
skill = sys.argv[2]
only = sys.argv[3] if len(sys.argv) > 3 else None

JS_LIST = """async ([chapter, skill]) => {
  const {examChapterById} = await import('/js/config.js');
  const {examQuestionsForTopic} = await import('/js/exam/index.js');
  if (!examChapterById(chapter)) return {error: 'no such exam chapter: ' + chapter};
  return {cards: examQuestionsForTopic(chapter, skill).map(c => ({
    id: c.id,
    parts: c.parts.map(p => ({
      id: p.id,
      /* the memo lines, stripped to plain text, so the manifest can say
         WHICH sentence each crop belongs to */
      memo: p.memo.map(b => ({
        type: b.type,
        hl: !!b.hl,
        text: String(b.text.en).replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').replace(/\\s+/g, ' ').trim().slice(0, 90),
      })),
    })),
  }))};
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

# the diagram box of the part currently being walked, plus the state
# attributes the player stamps on it -- read back so a crop can never be
# mislabelled by this script guessing.
JS_FIG = """() => {
  const boxes = [...document.querySelectorAll('.exam-diagram')];
  const walking = boxes.filter(b => b.getAttribute('data-state') === 'walk');
  const b = walking.length ? walking[walking.length - 1] : boxes[boxes.length - 1];
  if (!b) return null;
  return {part: b.getAttribute('data-part'), state: b.getAttribute('data-state'),
          step: b.getAttribute('data-walk-step'), svg: b.innerHTML.length};
}"""


async def shoot_fig(page, path):
    boxes = await page.query_selector_all(".exam-diagram")
    if not boxes:
        return False
    # the walking part's box is the last one on screen (earlier parts are
    # revealed and sit above it)
    await boxes[-1].screenshot(path=path)
    return True


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
        cards = res["cards"]
        if only:
            cards = [c for c in cards if only in c["id"]]
        print(f"{chapter} / {skill}: {len(cards)} card(s)")

        manifest = {}
        for card in cards:
            cid = card["id"]
            await page.evaluate(JS_OPEN, [chapter, skill, cid])
            rows = []
            for part in card["parts"]:
                pid, memo = part["id"], part["memo"]
                # tap "Walk me through it" on the active part
                walkBtn = page.locator("button.exam-walk-btn")
                if await walkBtn.count() == 0:
                    print(f"  {cid}({pid}): no walk button (part already revealed?) — skipped")
                    break
                await walkBtn.first.click()
                await page.wait_for_timeout(500)

                info = await page.evaluate(JS_FIG)
                f = os.path.join(DIAGS, f"{cid}-{pid}-w00.png")
                got = await shoot_fig(page, f)
                await page.screenshot(path=os.path.join(SHOTS, f"{cid}-{pid}-w00.png"), full_page=True)
                rows.append({"crop": os.path.basename(f), "blocks": 0, "state": info and info["state"],
                             "line": "(nothing revealed yet — the printed figure)", "hasHl": None, "shot": got})

                for k in range(len(memo)):
                    nxt = page.locator("button.exam-walk-next-btn")
                    if await nxt.count() == 0:
                        break
                    await nxt.first.click()
                    await page.wait_for_timeout(650)
                    blocks = k + 1
                    info = await page.evaluate(JS_FIG)
                    last = blocks == len(memo)
                    name = f"{cid}-{pid}-" + ("done" if last else f"w{blocks:02d}") + ".png"
                    f = os.path.join(DIAGS, name)
                    got = await shoot_fig(page, f)
                    await page.screenshot(path=os.path.join(SHOTS, name), full_page=True)
                    rows.append({"crop": name, "blocks": blocks, "state": info and info["state"],
                                 "line": memo[k]["text"], "hasHl": memo[k]["hl"], "shot": got})
                    if last:
                        break
                break   # only the FIRST part of a card is reachable without answering
            manifest[cid] = rows
            print(f"  {cid}: {len(rows)} walk crop(s)")
            for r in rows:
                flag = "hl" if r["hasHl"] else ("--" if r["hasHl"] is False else "  ")
                print(f"      {r['crop']:<42} [{str(r['state']):<8}] {flag}  {r['line']}")

        with open(os.path.join(DIAGS, f"_manifest-{chapter}-{skill}.json"), "w", encoding="utf-8") as fh:
            json.dump(manifest, fh, indent=1, ensure_ascii=False)

        if errs:
            print("PAGE ERRORS:")
            for e in errs:
                print("  ", e)
        else:
            print("no page errors")
        await b.close()

asyncio.run(main())
