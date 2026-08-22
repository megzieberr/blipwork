/* ============================================================
   TOKEN PAD  (the reduction-formula input)
   ------------------------------------------------------------
   Her round-5 ruling: the learner must TYPE the reduction formula
   — `180° −`, `360° +`, `180° − θ` — not pick it off a list. But
   the house input law is "never type words", so this is the number
   keypad with different keys on it: whole tokens, tapped in order.

   Deliberately the SAME CSS classes as js/keypad.js (keypad /
   kdisp / kgrid / key / submit) so it looks like one family; the
   extra `tokenpad` class on the wrapper is only there for tests
   and for the odd width tweak.

   mountTokenpad(host, { sym, onSubmit }) -> { value, raw, tokens,
                                               clear, disable }
     sym       "θ" (default) or "x" — swaps the unknown chip
     onSubmit  (raw, tokens) — raw is the tokens concatenated;
               compare it with normalizeTokens() in steps-check.js
   ============================================================ */
import { el } from "./ui.js";
import { normalizeTokens } from "./steps-check.js";

const THIN = " ";          // thin space — display only, never marked
const MAX_TOKENS = 6;           // length guard, same idea as the keypad's

export function mountTokenpad(host, opts = {}) {
  const { sym = "θ", onSubmit } = opts;
  let toks = [];

  const wrap = el("div", "keypad tokenpad");
  const disp = el("div", "kdisp empty");
  disp.innerHTML = `<span class="kval">…</span>`;
  const valEl = disp.querySelector(".kval");
  wrap.appendChild(disp);

  function paint() {
    valEl.textContent = toks.length ? toks.join(THIN) : "…";
    disp.classList.toggle("empty", toks.length === 0);
  }
  function push(t) {
    if (toks.length >= MAX_TOKENS) return;
    toks.push(t);
    paint();
  }

  const grid = el("div", "kgrid");
  const addKey = (label, cls, fn) => {
    const b = el("button", "key" + (cls ? " " + cls : ""), label);
    b.type = "button";
    b.addEventListener("click", fn);
    grid.appendChild(b);
    return b;
  };

  // row 1: the three angles she splits on ·  row 2: the two signs + the unknown
  ["90°", "180°", "360°"].forEach(t => addKey(t, "tok", () => push(t)));
  addKey("−", "tok", () => push("−"));          // real minus (U+2212), never a hyphen
  addKey("+", "tok", () => push("+"));
  addKey(sym, "tok", () => push(sym));
  // row 3: delete, then a submit spanning the remaining two columns
  addKey("⌫", "del", () => { toks.pop(); paint(); });
  const sub = addKey("Submit ✓", "submit", () => {
    const raw = toks.join("");
    onSubmit && onSubmit(raw, toks.slice());
  });
  sub.style.gridColumn = "span 2";

  wrap.appendChild(grid);
  host.appendChild(wrap);
  paint();

  return {
    /* the NORMALISED string — what marking compares ("180−θ") */
    get value() { return normalizeTokens(toks.join("")); },
    /* exactly what was tapped, glyphs and all ("180°−θ") */
    get raw() { return toks.join(""); },
    get tokens() { return toks.slice(); },
    clear() { toks = []; paint(); },
    disable() { grid.querySelectorAll(".key").forEach(b => (b.disabled = true)); },
    enable() { grid.querySelectorAll(".key").forEach(b => (b.disabled = false)); },
  };
}
