"""Screenshot real play rounds at 375 px: python shoot_round.py gt4 q3 p7 ...
For each quest: opens the play screen, walks the first N questions by ANSWERING
THEM CORRECTLY, and saves two shots per question to rounds/<quest>-<i>-q.png
(question side, hint open) and -r.png (the answered/feedback side).

REBUILT 2026-08-30 (the split day found it silently broken): the old version
waited for a button labelled "Next", but the app's real feedback button says
"Continue →" (questions.js) — so it re-shot question 1 forever. And a locator fix
alone is not enough any more: since the step-chain rebuilds, a round's questions
can only be advanced past by answering them (wrong answers loop into "Try a
similar one →"), so the walker now answers for real. It can, because THIS SCRIPT
builds the quest def it hands to __APP__.go — each skill's gen() is wrapped to
drop its rolled question object on window.__SHOOT_Q__, and the in-page driver
reads the correct answer straight off that object (options[].correct, expected,
steps[].expected split on the pad's U+2009 join).

Kinds handled: mc, yesno, calc, and steps chains of mc / calc / tokenpad.
Anything else (tap, calcdo, gtrig's tapcross/doubletick/... widgets) makes the
round stop with a plain warning instead of silently re-shooting — shoot those
rounds' specialised harness pages instead."""
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
  const def = questDef(qid);
  // wrap every gen so the driver can read the mounted question's own answers
  const skills = def.skills.map(s => ({ ...s, gen: () => { const q = s.gen(); window.__SHOOT_Q__ = q; return q; } }));
  window.__APP__.go('play', { chapter, quest, def: { ...def, skills }, accent: chapter.signature || chapter.accent });
  await new Promise(r => setTimeout(r, 900));
  return 'ok';
}"""

# Answers the currently-mounted question from window.__SHOOT_Q__. Runs wholly
# in the page so clicks land on live elements. Returns "ok" or "unsupported:<kind>".
JS_ANSWER = """async () => {
  const q = window.__SHOOT_Q__;
  if (!q) return 'no question object';
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  const visible = el => !!(el && el.offsetParent !== null);

  // type a number on the LAST visible number keypad (never the tokenpad)
  const typeNumber = async (value, dp) => {
    const pads = [...document.querySelectorAll('.keypad:not(.tokenpad)')].filter(visible);
    const pad = pads[pads.length - 1];
    if (!pad) return 'no keypad on screen';
    const keys = [...pad.querySelectorAll('.key')];
    const key = label => keys.find(k => k.textContent.trim() === label);
    let txt = String(Number(value.toFixed(dp ?? 2))).replace('.', ',');
    if (txt.startsWith('-')) { const pm = key('±'); if (!pm) return 'negative answer but no ± key'; pm.click(); txt = txt.slice(1); }
    for (const ch of txt) { const k = key(ch); if (!k) return 'no key for "' + ch + '"'; k.click(); }
    const sub = keys.find(k => k.classList.contains('submit'));
    if (!sub) return 'no submit key'; sub.click();
    return 'ok';
  };

  // click the correct option in the LAST option group (answered steps keep
  // their mc options visible, so earlier groups are still in the DOM)
  const clickOption = (options, correctIndex) => {
    const all = [...document.querySelectorAll('button.opt')].filter(visible);
    const cur = all.slice(-options.length);
    if (cur.length !== options.length) return 'option count mismatch';
    cur[correctIndex].click();
    return 'ok';
  };

  const fillTokenpad = async step => {
    const pads = [...document.querySelectorAll('.tokenpad')].filter(visible);
    const pad = pads[pads.length - 1];
    if (!pad) return 'no tokenpad on screen';
    const chips = [...pad.querySelectorAll('.key.tok')];
    for (const tok of String(step.expected).split('\\u2009')) {
      const want = tok.trim();
      const chip = chips.find(c => c.textContent.trim() === want);
      if (!chip) return 'no chip for "' + want + '"';
      chip.click(); await sleep(60);
    }
    const sub = [...pad.querySelectorAll('.key.submit')][0];
    if (!sub) return 'no tokenpad submit'; sub.click();
    return 'ok';
  };

  const answerOne = async (kind, spec) => {
    if (kind === 'mc') return clickOption(spec.options, spec.options.findIndex(o => o.correct));
    if (kind === 'yesno') {
      const all = [...document.querySelectorAll('button.opt')].filter(visible);
      const btn = all.reverse().find(b => b.textContent.trim() === (spec.yes ? 'Yes' : 'No'));
      if (!btn) return 'no Yes/No button'; btn.click(); return 'ok';
    }
    if (kind === 'calc') return await typeNumber(spec.expected, spec.dp);
    if (kind === 'tokenpad') return await fillTokenpad(spec);
    return 'unsupported:' + kind;
  };

  if (q.type === 'steps') {
    for (const step of q.steps) {
      const r = await answerOne(step.kind, step);
      if (r !== 'ok') return r;
      await sleep(450);                       // next step (or the feedback) mounts
    }
    return 'ok';
  }
  return await answerOne(q.type, q);
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
                hb = page.locator("button", has_text="Hint")
                if await hb.count():
                    try: await hb.first.click(timeout=1500)
                    except Exception: pass
                await page.wait_for_timeout(300)
                sw = await page.evaluate("document.body.scrollWidth")
                await page.screenshot(path=os.path.join(OUT, f"{qid}-{i}-q.png"), full_page=True)
                ans = await page.evaluate(JS_ANSWER)
                if ans != 'ok':
                    print(f"  {qid} #{i}: STOPPED — {ans} (shoot this round's own harness page instead)")
                    break
                await page.wait_for_timeout(600)
                sw2 = await page.evaluate("document.body.scrollWidth")
                await page.screenshot(path=os.path.join(OUT, f"{qid}-{i}-r.png"), full_page=True)
                print(f"  {qid} #{i}: answered, scrollW {sw}/{sw2}")
                # the feedback button is "Continue →" (a correct answer never
                # offers "Try a similar one →" — that is the WRONG-answer button)
                nxt = page.locator("button", has_text="Continue")
                if await nxt.count():
                    try: await nxt.first.click(timeout=2000)
                    except Exception as e: print(f"  {qid} #{i}: Continue click failed: {str(e)[:60]}"); break
                else:
                    print(f"  {qid} #{i}: no Continue button after a correct answer"); break
                await page.wait_for_timeout(700)
        await b.close()
asyncio.run(main())
