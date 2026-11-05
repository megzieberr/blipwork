"""Look-check for the calculator's tall signs (brief: briefs/CALC-TALL-SIGNS-BRIEF.md, her screenshot 5 Nov 2026).

usage:  python tools/shoot_calc_signs.py

The root sign and the brackets on the LCD are drawn shapes that grow with what is inside (a stacked fraction), the way
the real fx-991ZA draws them. This script mounts js/calculator.js the way the verify pages do (mountCalculator on a
host inside a page that loads css/styles.css), types each expression KEY BY KEY through the rendered buttons, saves the
LCD at 3x to tools/shots/calc-signs-NN.png (tools/shots is git-ignored), and MEASURES from the DOM:
  - each root sign's top-right corner meets the body's top edge (within 1 px), its bottom meets the body's bottom;
  - each bracket is at least as tall as the content of its group;
  - the cursor sits in the three places (inside after "(", inside before ")", outside after ")");
  - the LCD did not grow on the .lcd-pr-typing screen for a one-line input.
Serves the repo itself on 127.0.0.1:8812 (a fresh browser, service workers blocked). Exit code 1 on any failed check.
"""
import sys, subprocess, time, pathlib
sys.stdout.reconfigure(encoding="utf-8", errors="replace")
from playwright.sync_api import sync_playwright

ROOT = pathlib.Path(__file__).resolve().parent.parent
SHOTS = ROOT / "tools" / "shots"
PORT = 8812
BASE = f"http://127.0.0.1:{PORT}/"

HARNESS = """<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="stylesheet" href="./css/styles.css">
<style>body{padding:20px;margin:0} #host{width:340px} .calc-cursor{animation:none!important}</style>
</head><body><div id="host"></div>
<script type="module">
import { mountCalculator } from "./js/calculator.js";
window.__calc = mountCalculator(document.getElementById("host"));
window.__ready = true;
</script></body></html>"""

# key names as printed on the key face -> the rendered button's data-keyid (same table as verify-calc-casio.html)
KEY = {"+": "plus", "−": "minus", "×": "mult", "÷": "div", "=": "eq", "◀": "left", "▶": "right", "▲": "up", "▼": "down",
       "AC": "ac", "SHIFT": "shift", "ALPHA": "alpha", "(": "lparen", ")": "rparen", "x²": "x2", "x^": "pow", "√": "sqrt",
       "frac": "frac", "sin": "sin", "CALC": "calc", "MODE": "mode", "X": "alpha rparen", "³√": "shift sqrt", "ˣ√": "shift pow"}
def ids(seq):
    out = []
    for t in seq.split():
        if t.isdigit(): out += ["d" + c for c in t]
        else: out += KEY.get(t, t).split()
    return out

MEASURE = """() => {
  const ex = document.querySelector('#host .lcd-expr'); if (!ex) return { err: 'no .lcd-expr' };
  const R = e => e.getBoundingClientRect();
  const rads = [...ex.querySelectorAll('.calc-rad')].map(r => {
    const sign = r.querySelector(':scope > .calc-rad-sign'), body = r.querySelector(':scope > .calc-rad-body');
    const rise = sign.querySelector('.calc-rad-rise'), s = R(sign), b = R(body), ri = R(rise);
    return { topGap: Math.abs(ri.top - b.top), cornerGap: Math.abs(ri.right - b.left), botGap: Math.abs(s.bottom - b.bottom),
             signH: s.height, bodyH: b.height };
  });
  const groups = [...ex.querySelectorAll('.calc-br')].map(g => {
    const kids = [...g.children].filter(c => !c.classList.contains('calc-brk') && !c.classList.contains('calc-cursor'));
    let content = 0;
    // text runs are not elements: measure them with a range over the group's own text nodes
    for (const n of g.childNodes) if (n.nodeType === 3 && n.textContent) { const rg = document.createRange(); rg.selectNode(n); content = Math.max(content, rg.getBoundingClientRect().height); }
    kids.forEach(k => { content = Math.max(content, R(k).height); });
    const brk = [...g.children].filter(c => c.classList.contains('calc-brk')).map(c => R(c).height);
    return { content, brk, left: !!g.querySelector(':scope > .calc-brk-l'), right: !!g.querySelector(':scope > .calc-brk-r') };
  });
  const cur = ex.querySelector('.calc-cursor');
  let curAt = 'none';
  if (cur) {
    const p = cur.previousSibling, n = cur.nextSibling;   // NODES, not elements: a text run between counts
    const is = (x, c) => !!x && x.nodeType === 1 && x.classList.contains(c);
    if (cur.parentElement.classList.contains('calc-br') && is(p, 'calc-brk-l')) curAt = 'inside-after-open';
    else if (cur.parentElement.classList.contains('calc-br') && is(n, 'calc-brk-r')) curAt = 'inside-before-close';
    else if (is(p, 'calc-br')) curAt = 'outside-after-close';
    else curAt = 'other';
  }
  return { text: ex.textContent, rads, groups, curAt, lcdH: R(document.querySelector('#host .calc-lcd')).height };
}"""

# the exponent after a tall thing (5 Nov, "Fix the ² first"): where each ² / ³ glyph and ^□ box sits, against the
# .calc-supw wrap's element (its first child); glyph rects come from a range over the character
EXP = """() => {
  const ex = document.querySelector('#host .lcd-expr'), e = ex.getBoundingClientRect();
  const out = [], w = document.createTreeWalker(ex, NodeFilter.SHOW_TEXT); let n;
  while ((n = w.nextNode())) for (let i = 0; i < n.textContent.length; i++) if ('²³'.includes(n.textContent[i])) {
    const r = document.createRange(); r.setStart(n, i); r.setEnd(n, i + 1); const b = r.getBoundingClientRect();
    const wrap = n.parentElement.closest('.calc-supw'), el = wrap && wrap.firstElementChild;
    out.push({ ch: n.textContent[i], top: b.top - e.top, bottom: b.bottom - e.top, wrapped: !!wrap,
               elTop: el ? el.getBoundingClientRect().top - e.top : null }); }
  ex.querySelectorAll('.calc-supw > .calc-pow-exp').forEach(s => { const b = s.getBoundingClientRect(), el = s.parentElement.firstElementChild;
    out.push({ ch: '^', top: b.top - e.top, bottom: b.bottom - e.top, wrapped: true, elTop: el.getBoundingClientRect().top - e.top }); });
  const cur = ex.querySelector('.calc-cursor');
  return { exps: out, curInWrap: !!cur && cur.parentElement.classList.contains('calc-supw'),
           curNext: cur && cur.nextSibling ? (cur.nextSibling.nodeType === 3 ? cur.nextSibling.textContent[0] : cur.nextSibling.className) : null };
}"""
# TABLE mode (MODE 7): the selected cell's row number and column heading, and whether it shows inside the LCD
TBL = """() => {
  const sel = document.querySelector('#host .lcd-tbl .lcd-tbl-sel'); if (!sel) return { sel: null };
  const tr = sel.parentElement, n = tr.querySelector('.lcd-tbl-n'), lit = document.querySelector('#host .lcd-tbl th.lcd-tbl-lit');
  const lcd = document.querySelector('#host .calc-lcd').getBoundingClientRect(), b = sel.getBoundingClientRect();
  return { row: n ? n.textContent : null, col: lit ? lit.textContent : null,
           visible: b.height > 0 && b.top >= lcd.top - 0.5 && b.bottom <= lcd.bottom + 0.5,
           rows: [...document.querySelectorAll('#host .lcd-tbl tr')].slice(1).map(r => r.querySelector('.lcd-tbl-n').textContent) };
}"""

# (6-5)^2 measured BEFORE the change (5 Nov, the tall-signs commit 21a3f23): the 2 glyph's top and bottom from the line's top
PLAIN_SQ = (2.0, 17.0)

fails, notes = [], []
def check(ok, what, info=""):
    (notes if ok else fails).append(f"{'OK  ' if ok else 'FAIL'} {what}{'  ' + str(info) if info else ''}")

def main():
    SHOTS.mkdir(parents=True, exist_ok=True)
    srv = subprocess.Popen([sys.executable, "-m", "http.server", str(PORT), "--bind", "127.0.0.1"], cwd=str(ROOT),
                           stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    time.sleep(1.2)
    try:
        with sync_playwright() as pw:
            b = pw.chromium.launch()
            ctx = b.new_context(viewport={"width": 420, "height": 700}, device_scale_factor=3, service_workers="block")
            pg = ctx.new_page(); errs = []
            pg.on("pageerror", lambda e: errs.append(str(e)[:200]))
            pg.route(BASE + "__shoot_calc.html", lambda r: r.fulfill(status=200, body=HARNESS, content_type="text/html"))
            pg.goto(BASE + "__shoot_calc.html"); pg.wait_for_function("window.__ready === true", timeout=20000)

            def press(seq):
                for k in ids(seq): pg.click(f'#host [data-keyid="{k}"]')
            def shoot(name):
                pg.locator("#host .calc-lcd").screenshot(path=str(SHOTS / name))
            def measure(): return pg.evaluate(MEASURE)
            def geometry(tag, m, want_text=None):
                if want_text is not None: check(m["text"] == want_text, f"{tag}: the line's text still reads {want_text!r}", m["text"])
                for i, r in enumerate(m["rads"]):
                    check(r["topGap"] <= 1 and r["cornerGap"] <= 1, f"{tag}: root {i + 1}'s rising line meets the body's top-left corner", f"top {r['topGap']:.2f}px, side {r['cornerGap']:.2f}px")
                    check(r["botGap"] <= 1, f"{tag}: root {i + 1}'s sign reaches the body's bottom", f"{r['botGap']:.2f}px (sign {r['signH']:.1f}, body {r['bodyH']:.1f})")
                for i, g in enumerate(m["groups"]):
                    check(all(h >= g["content"] - 0.5 for h in g["brk"]), f"{tag}: bracket group {i + 1} is at least as tall as its content",
                          f"content {g['content']:.1f}px, brackets {[round(h, 1) for h in g['brk']]}")

            # 01: her expression, key by key
            press("AC √ ( ( frac 1 ▼ 2 ▶ + 6 ) x² + ( 6 − 5 ) x² )")
            m = measure(); geometry("01 her expression", m, "√((1/2+6)²+(6−5)²)".replace("1/2", "12"))
            check(len(m["groups"]) == 3 and all(g["left"] and g["right"] for g in m["groups"]), "01: three closed bracket groups", len(m["groups"]))
            shoot("calc-signs-01.png")
            # 02: √2 alone
            press("AC √ 2"); m = measure(); geometry("02 √2", m, "√2"); shoot("calc-signs-02.png")
            # 03: (2+3)×4, nothing tall inside
            press("AC ( 2 + 3 ) × 4"); m = measure(); geometry("03 (2+3)×4", m, "(2+3)×4")
            if m["groups"]: check(m["groups"][0]["brk"][0] <= m["groups"][0]["content"] + 1, "03: with nothing tall inside the bracket is line height", m["groups"][0])
            shoot("calc-signs-03.png")
            # 04: unclosed (1/2 + while typing
            press("AC ( frac 1 ▼ 2 ▶ +"); m = measure(); geometry("04 unclosed", m, "(12+")
            check(len(m["groups"]) == 1 and m["groups"][0]["left"] and not m["groups"][0]["right"], "04: an unclosed opener draws the left bracket only", m["groups"])
            shoot("calc-signs-04.png")
            # 05: ³√ and ˣ√ of a fraction
            press("AC ³√ frac 1 ▼ 2 ▶ ▶ + ˣ√ 4 ▶ frac 1 ▼ 3"); m = measure(); geometry("05 ³√ ˣ√", m)
            check(len(m["rads"]) == 2, "05: two roots on the line", len(m["rads"]))
            shoot("calc-signs-05.png")
            # 06: sin(1/2)
            press("AC sin frac 1 ▼ 2 ▶ )"); m = measure(); geometry("06 sin(1/2)", m, "sin(12)"); shoot("calc-signs-06.png")
            # 07: the cursor in the three places, ( 2 + 1/2 ) × 3
            press("AC ( 2 + frac 1 ▼ 2 ▶ ) × 3")
            seen = {}
            for _ in range(20):
                m = measure()
                if m["curAt"] in ("inside-after-open", "inside-before-close", "outside-after-close") and m["curAt"] not in seen:
                    seen[m["curAt"]] = True
                    tag = {"outside-after-close": "07a", "inside-before-close": "07b", "inside-after-open": "07c"}[m["curAt"]]
                    geometry(f"{tag} cursor {m['curAt']}", m, "(2+12)×3")
                    shoot(f"calc-signs-{tag}.png")
                if len(seen) == 3: break
                press("◀")
            check(len(seen) == 3, "07: the cursor was found in all three places", list(seen))

            # 09-13: the exponent after a tall thing sits level with its top; (6−5)² keeps the normal superscript
            def top_exp(tag, seq, png, want_text):
                press(seq); m = measure(); geometry(tag, m, want_text); x = pg.evaluate(EXP)
                ok = bool(x["exps"]) and all(e["wrapped"] and abs(e["top"] - e["elTop"]) <= 1 for e in x["exps"])
                check(ok, f"{tag}: the exponent's top is level with the element's top (within 1 px)",
                      [(e["ch"], round(e["top"], 2), e["elTop"] and round(e["elTop"], 2)) for e in x["exps"]])
                shoot(png); return x
            top_exp("09 (½+6)²", "AC ( frac 1 ▼ 2 ▶ + 6 ) x²", "calc-signs-09.png", "(12+6)²")
            top_exp("10 ½ then x²", "AC frac 1 ▼ 2 ▶ x²", "calc-signs-10.png", "12²")
            top_exp("11 √½ then x²", "AC √ frac 1 ▼ 2 ▶ ▶ x²", "calc-signs-11.png", "√12²")
            top_exp("12 (½)^3 then x²", "AC ( frac 1 ▼ 2 ▶ ) x^ 3 ▶ x²", "calc-signs-12.png", "(12)3²")
            press("AC ( 6 − 5 ) x²"); x = pg.evaluate(EXP)
            e0 = x["exps"][0] if x["exps"] else None
            check(e0 is not None and not e0["wrapped"] and abs(e0["top"] - PLAIN_SQ[0]) < 0.01 and abs(e0["bottom"] - PLAIN_SQ[1]) < 0.01,
                  "13 (6−5)²: the ² is unchanged (not wrapped, same place as before the change)", e0)
            shoot("calc-signs-13.png")
            # the cursor between the tall element and its ², then after the ²
            press("AC ( frac 1 ▼ 2 ▶ + 6 ) x² ◀"); x = pg.evaluate(EXP)
            check(x["curInWrap"] and x["curNext"] == "²", "14: ◀ from the end puts the cursor between the bracket and the ², inside the wrap", x)
            shoot("calc-signs-14.png")
            press("▶"); x = pg.evaluate(EXP); m = measure()
            check(not x["curInWrap"] and m["text"] == "(12+6)²", "14: ▶ puts it back after the ², outside the wrap", x)

            # 15-16: TABLE mode ▲ / ▼ wrap (her measurement 5 Nov 2026): f(X)=X, Start 1, End 12, Step 1, column F(X)
            press("AC MODE 7 X = = 1 = 12 = 1 = ▶ " + " ".join(["▼"] * 12))
            t = pg.evaluate(TBL)
            check(t["row"] == "13" and t["col"] == "F(X)" and t["visible"], "15 set-up: 12 rows, ▼ ×12 reaches the bottom (empty) row 13 in F(X)", t)
            press("▼"); t = pg.evaluate(TBL)
            check(t["row"] == "1" and t["col"] == "F(X)" and t["visible"] and t["rows"][0] == "1", "15: ▼ on the bottom row lands on row 1, same column, the window at the top", t)
            shoot("calc-signs-15-table-down-wrap.png")
            press("▲"); t = pg.evaluate(TBL)
            check(t["row"] == "13" and t["col"] == "F(X)" and t["visible"], "16: ▲ on row 1 lands on the bottom row 13, same column, on screen", t)
            shoot("calc-signs-16-table-up-wrap.png")
            press("▲"); t = pg.evaluate(TBL)
            check(t["row"] == "12" and t["visible"], "16: a normal ▲ step after the wrap goes to row 12", t)
            press("AC AC MODE 1")   # back to COMP for the prompt checks below

            # the .lcd-pr-typing screen: a one-line typed value may not make the LCD taller (styles.css's rule)
            press("AC X x² + 1 CALC"); h0 = measure()["lcdH"] if pg.query_selector("#host .lcd-expr") else pg.evaluate("document.querySelector('#host .calc-lcd').getBoundingClientRect().height")
            for typed in ("3", "( 3 )", "√ 3", "( 3 ) x²"):
                press("AC X x² + 1 CALC " + typed)
                typing = pg.query_selector("#host .lcd-pr-typing") is not None
                h = pg.evaluate("document.querySelector('#host .calc-lcd').getBoundingClientRect().height")
                check(typing and abs(h - h0) <= 0.5, f"prompt screen: typing {typed!r} keeps the LCD at its height", f"{h0:.1f} -> {h:.1f}px, typing screen {typing}")
            press("AC X x² + 1 CALC ( frac 1 ▼ 2 ▶ )"); shoot("calc-signs-08-prompt.png")
            h = pg.evaluate("document.querySelector('#host .calc-lcd').getBoundingClientRect().height")
            print(f"info: prompt screen with (1/2) typed: LCD {h0:.1f} -> {h:.1f}px (a fraction, not a one-line input)")
            check(not errs, "no page errors", errs[:2])
            ctx.close(); b.close()
    finally:
        srv.terminate()
    for n in notes + fails: print(n)
    print(f"\nshoot_calc_signs: {len(notes)} ok, {len(fails)} failed; PNGs in {SHOTS}")
    sys.exit(1 if fails else 0)

if __name__ == "__main__":
    main()
