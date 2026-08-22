"""Whole-app formatting sweep at 375 px.
For every quest def (js/quests/index.js) x every skill x N generated questions, and every concept card:
render every authored string through the app's real fmt pipeline (formulaHtml / fracHtml / xbarHtml)
into the real play-screen CSS context, plus a real mountQuestion render, then check:
  A  BROKEN   — an .fml/.nowrap/.sfrac box split over >1 line while narrower than its container
  B  UNPROT   — a maths-looking text run outside any .fml (recogniser miss); flagged as B-BREAK if it spans lines
  C  SLASH    — visible a/b slash outside .sfrac/.frac/.efrac (not on the unit allow-list)
  D  OVERFLOW — container scrollWidth > 375
usage: python sweep.py [N] [questIdPrefix...]   -> prints a table, writes sweep.json + sweep/<png>
"""
import sys, os, json, asyncio
from playwright.async_api import async_playwright

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "_out", "sweep"); os.makedirs(OUT, exist_ok=True)
N = int(sys.argv[1]) if len(sys.argv) > 1 else 25
ONLY = sys.argv[2:]

JS = r"""
async ([N, only]) => {
  const { QUEST_DEFS } = await import('/js/quests/index.js');
  const { CONCEPTS } = await import('/js/concepts.js');
  const { fracHtml, formulaHtml, xbarHtml } = await import('/js/ui.js');
  const { mountQuestion } = await import('/js/questions.js');

  // a stage that mimics the play screen width at 375px
  let stage = document.getElementById('__sweep');
  if (!stage) { stage = document.createElement('div'); stage.id='__sweep'; document.body.appendChild(stage); }
  stage.innerHTML = '';
  stage.style.cssText = 'position:absolute;left:0;top:0;width:375px;box-sizing:border-box;padding:0 16px;background:#0b0f1c;z-index:99999';
  const playW = (() => { const p = document.querySelector('.q-prompt'); return p ? p.clientWidth : null; })();

  const UNITS = /^(km\/h|m\/s|km\/l|l\/100km|r\/kg|r\/km|r\/l|r\/m|c\/kwh|and\/or|sin\/cos|cos\/sin|m\/s²|rev\/min|km\/u|n\/a|p\/a|w\/m²|\/\/|https?:)/i;
  const MATHRUN = /[0-9A-Za-zθαβ°²³)\]]\s*[+−=×·÷<>≤≥±]\s*[0-9A-Za-z(√θαβ\[]/;

  function strings(q, path='q', out=[]) {
    if (q == null) return out;
    if (typeof q === 'string') { if (q.trim()) out.push([path, q]); return out; }
    if (typeof q !== 'object') return out;
    if (Array.isArray(q)) { q.forEach((v,i)=>strings(v, path+'['+i+']', out)); return out; }
    for (const k of Object.keys(q)) {
      if (k.startsWith('_') || ['graph','graphs','spec','diagram','answer','accept','check','correct','value','key','id','type','concept','kind','mode','targets','tap','unit','fn','tone','dashTo','place'].includes(k)) continue;
      strings(q[k], path+'.'+k, out);
    }
    return out;
  }
  function lineCount(el) { const r = el.getClientRects(); if (!r.length) return 0; let lines = 1, last = r[0].top; for (const b of r) { if (Math.abs(b.top - last) > 6) { lines++; last = b.top; } } return lines; }
  function checkContainer(box, where, findings) {
    // D
    if (box.scrollWidth > box.clientWidth + 1) findings.push({k:'D', where, text: box.textContent.slice(0,120), w: box.scrollWidth});
    // A
    box.querySelectorAll('.fml,.nowrap,.sfrac,.frac,.efrac').forEach(el => {
      const rects = el.getClientRects(); if (rects.length < 2) return;
      const lines = lineCount(el); if (lines < 2) return;
      const w = el.getBoundingClientRect().width;
      if (el.classList.contains('fml')) {
        // a .fml may wrap ONLY if wider than the container; and then only at = / before a sign — check pieces instead
        const pieces = el.querySelectorAll('.nowrap');
        let bad = false; pieces.forEach(p => { if (lineCount(p) > 1) bad = true; });
        if (bad) findings.push({k:'A', where, text: el.textContent.slice(0,120), note:'nowrap piece split'});
        else if (el.scrollWidth <= box.clientWidth - 2) findings.push({k:'A', where, text: el.textContent.slice(0,120), note:'fml wrapped though it fits'});
      } else if (el.classList.contains('nowrap')) {
        findings.push({k:'A', where, text: el.textContent.slice(0,120), note:'nowrap split'});
      } else {
        findings.push({k:'A', where, text: el.textContent.slice(0,120), note:'fraction split'});
      }
    });
    // B and C on text nodes
    const walker = document.createTreeWalker(box, NodeFilter.SHOW_TEXT);
    let n; while ((n = walker.nextNode())) {
      const t = n.textContent; if (!t.trim()) continue;
      const el = n.parentElement;
      const inFml = !!el.closest('.fml');
      const inFrac = !!el.closest('.sfrac,.frac,.efrac,.sf-n,.sf-d,.tr-pf');
      if (!inFml && MATHRUN.test(t)) {
        const m = t.match(MATHRUN); const idx = t.indexOf(m[0]);
        const rg = document.createRange(); rg.setStart(n, Math.max(0, idx-8)); rg.setEnd(n, Math.min(t.length, idx+m[0].length+8));
        const rects = rg.getClientRects(); let lines=1; if (rects.length) { let last=rects[0].top; for (const b of rects) if (Math.abs(b.top-last)>6) { lines++; last=b.top; } }
        findings.push({k: lines>1 ? 'B-BREAK' : 'B', where, text: t.slice(Math.max(0,idx-30), idx+40)});
      }
      if (!inFrac) {
        const sl = t.match(/\S+\/\S+/g);
        if (sl) sl.forEach(s => { if (!UNITS.test(s) && !/^\d{1,2}\/\d{1,2}\/\d{2,4}$/.test(s)) findings.push({k:'C', where, text: s + '   «' + t.slice(0,80) + '»'}); });
      }
    }
  }
  const results = {};
  const mk = (cls, html) => { const d = document.createElement('div'); d.className = cls; d.innerHTML = html; return d; };

  function renderStrings(q, fmt, tag, findings) {
    for (const [path, s] of strings(q)) {
      const box = mk('q', '');
      // mimic the most common wrappers
      const inner = mk(/hint/.test(path) ? 'hint-box' : /option|choices|opts/.test(path) ? 'opt' : /explain|why|feedback|reason/.test(path) ? 'feedback' : 'q-prompt', fmt(s));
      box.appendChild(inner); stage.appendChild(box);
      checkContainer(box, tag + ' ' + path, findings);
      box.remove();
    }
  }

  const ids = Object.keys(QUEST_DEFS).filter(id => !only.length || only.some(p => id.startsWith(p)));
  for (const id of ids) {
    const def = QUEST_DEFS[id]; const findings = []; let rendered = 0;
    const skills = def.skills || [];
    for (let si = 0; si < skills.length; si++) {
      const sk = skills[si]; if (typeof sk.gen !== 'function') continue;
      for (let i = 0; i < N; i++) {
        let q; try { q = sk.gen(); } catch (e) { findings.push({k:'GEN', where: id+'/'+(sk.id||si), text: String(e && e.message)}); break; }
        if (def.stackFractions) q.stackFractions = true;
        const fmt = (x => formulaHtml(fracHtml(xbarHtml(x))));   // universal, as js/questions.js
        renderStrings(q, fmt, id+'/'+(sk.id||si)+'#'+i, findings); rendered++;
        // real mount (prompt + input surface) on the first 3 seeds
        if (i < 3) {
          const host = mk('play', ''); stage.appendChild(host);
          try { mountQuestion(host, q, {}); host.querySelectorAll('[hidden]').forEach(h => h.hidden = false); checkContainer(host, id+'/'+(sk.id||si)+'#'+i+' MOUNT', findings); }
          catch (e) { findings.push({k:'MOUNT', where: id+'/'+(sk.id||si)+'#'+i, text: String(e && e.message).slice(0,120)}); }
          host.remove();
        }
      }
    }
    results[id] = { rendered, findings };
  }
  // concept cards
  if (!only.length || only.includes('concepts')) {
    const findings = []; let rendered = 0;
    for (const cid of Object.keys(CONCEPTS)) {
      const c = CONCEPTS[cid];
      const fmt = (x => formulaHtml(fracHtml(xbarHtml(x))));
      const box = mk('modal-card', `<h2>${fmt(c.title||'')}</h2><div class="concept">${fmt(c.body||'')}</div>`);
      stage.appendChild(box); checkContainer(box, 'concept '+cid, findings); box.remove(); rendered++;
    }
    results['concepts'] = { rendered, findings };
  }
  stage.remove();
  return results;
}
"""

async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        ctx = await b.new_context(viewport={"width": 375, "height": 812}, device_scale_factor=2, bypass_csp=True)
        page = await ctx.new_page()
        errs = []
        page.on("pageerror", lambda e: errs.append(str(e)))
        await page.goto("http://localhost:5191/?local=1", wait_until="networkidle")
        await page.evaluate("async()=>{for(const r of await navigator.serviceWorker.getRegistrations())await r.unregister();for(const k of await caches.keys())await caches.delete(k)}")
        await page.evaluate("()=>localStorage.setItem('mhq.session', JSON.stringify({username:'lerato_test',password:'demo1234'}))")
        await page.goto("http://localhost:5191/?local=1", wait_until="networkidle")
        await page.wait_for_timeout(800)
        res = await page.evaluate(JS, [N, ONLY])
        await b.close()
    json.dump(res, open(os.path.join(HERE, "_out", "sweep.json"), "w", encoding="utf8"), ensure_ascii=False, indent=1)
    tot = {}
    print(f"{'round':10} {'strings':>7}  A  B-BRK  B   C   D  other")
    for qid, r in res.items():
        c = {}
        for f in r["findings"]: c[f["k"]] = c.get(f["k"], 0) + 1
        for k, v in c.items(): tot[k] = tot.get(k, 0) + v
        other = sum(v for k, v in c.items() if k not in ("A", "B-BREAK", "B", "C", "D"))
        if any(c.values()):
            print(f"{qid:10} {r['rendered']:7}  {c.get('A',0):2} {c.get('B-BREAK',0):5} {c.get('B',0):3} {c.get('C',0):3} {c.get('D',0):3}  {other}")
    print("TOTAL", tot)
    if errs: print("page errors:", errs[:5])

asyncio.run(main())
