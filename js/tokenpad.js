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

   mountTokenpad(host, { sym, keys, frame, onSubmit })
       -> { value, raw, tokens, clear, disable }
     sym       "θ" (default) or "x" — swaps the unknown chip
     onSubmit  (raw, tokens) — raw is the tokens concatenated;
               compare it with normalizeTokens() in steps-check.js

   ------------------------------------------------------------
   FRAME MODE (2026-08-27, her 2D-trig round-2 ask)
   ------------------------------------------------------------
   Her words: round 2 "simply gives the triangle, and then the kids
   need to do ALL the steps and just type in the final answer… I
   think we should change it so that they build the equation step by
   step". Only 2 of the class had finished it; she believes that is
   why.

   Pass `keys` (the chips to offer) and `frame` (the slotted skeleton,
   e.g. ["☐", "/", "☐", " = ", "☐", "/", "☐"]) and the pad stops
   being a free-form token strip and becomes FILL THE EQUATION: the
   skeleton is drawn with empty boxes, the next box glows, and a
   chip tap drops into it.

   Why a frame instead of free tokens: on a phone, building
   "x / sin 62° = 14 / sin 48°" out of loose pieces means seven taps
   where two of them are a ÷ and an =, and forgetting the = marks a
   child wrong for punctuation rather than for maths. The structure
   (side over the sine of its opposite angle) is already taught by
   the round's own multiple-choice questions — what is being learned
   HERE is which quantity goes in which box. So the boxes are given
   and only the contents are earned.

   Chips are NOT consumed: a chip may be tapped into more than one
   box. Nothing about the maths says a value can only appear once,
   and a vanishing chip would teach the wrong lesson by elimination.

   Marking is unchanged — the kind is still "tokenpad", the raw
   string is still the tokens joined, and checkStep still compares it
   through normalizeTokens with `alsoAccept`. That matters here: the
   sine rule is symmetric, so "14/sin48° = x/sin62°" is every bit as
   correct as "x/sin62° = 14/sin48°" and both are accepted.
   ============================================================ */
import { el } from "./ui.js";
import { normalizeTokens } from "./steps-check.js";

const THIN = " ";          // thin space — display only, never marked
const MAX_TOKENS = 6;           // length guard, same idea as the keypad's
export const SLOT = "☐";        // a frame entry that is a box to be filled

/* The chips and the frame are QUESTION-AUTHORED text ("sin 62°", "x"),
   not learner input, but they are dropped into innerHTML to keep the
   thin-space/degree glyphs looking right — so they are escaped. A quest
   file is trusted; an unescaped path that only happens to be safe today
   is the kind that stops being safe quietly. */
function esc(t) {
  return String(t).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
}

export function mountTokenpad(host, opts = {}) {
  const { sym = "θ", onSubmit, keys = null, frame = null } = opts;
  let toks = [];

  /* FRAME MODE only when BOTH a skeleton and a chip set are given.
     Either one alone is a caller bug, and silently half-applying it
     would produce a pad with no way to answer. */
  const slots = Array.isArray(frame) ? frame.filter(f => f === SLOT).length : 0;
  const framed = !!(slots && Array.isArray(keys) && keys.length);
  const cap = framed ? slots : MAX_TOKENS;

  const wrap = el("div", "keypad tokenpad" + (framed ? " framed" : ""));
  const disp = el("div", "kdisp empty");
  disp.innerHTML = `<span class="kval">…</span>`;
  const valEl = disp.querySelector(".kval");
  wrap.appendChild(disp);

  function paint() {
    if (framed) { paintFrame(); return; }
    valEl.textContent = toks.length ? toks.join(THIN) : "…";
    disp.classList.toggle("empty", toks.length === 0);
  }

  /* Draw the skeleton with what has been dropped in so far. The next
     empty box carries .is-next so there is never any doubt about where
     the following tap lands — the single most confusing thing a
     fill-in-the-boxes input can get wrong. */
  function paintFrame() {
    let n = 0;
    const cell = part => {
      if (part !== SLOT) return `<span class="kfx">${esc(part)}</span>`;
      const i = n++;
      const filled = i < toks.length;
      const cls = "kslot" + (filled ? " is-filled" : (i === toks.length ? " is-next" : ""));
      return `<span class="${cls}">${filled ? esc(toks[i]) : ""}</span>`;
    };
    /* Split at the "=" first, so each side is handled as one unit. */
    const sides = [[]];
    for (const part of frame) {
      if (part === "=") { sides.push("="); sides.push([]); continue; }
      sides[sides.length - 1].push(part);
    }
    /* A side that is exactly  ☐ / ☐  is drawn as a REAL STACKED FRACTION
       — her note, 2026-08-27: "can't this be a real fraction stacked on top
       of each other?". It can, and it should: the multiple-choice options
       directly below the pad are already drawn that way by the app's
       formula renderer, so an inline "x/sin 41°" here and a stacked one
       three centimetres lower were two spellings of the same maths on one
       screen. It is also how they write it on paper.

       Reuses .sfrac/.sf-n/.sf-d rather than inventing a look — .sf-n's
       border-bottom IS the fraction bar everywhere else in the app, so
       these boxes get the same bar, in the same weight, for free.

       Any other shape falls back to the inline row, so the pad stays
       general: a frame that is not a pair of fractions still renders. */
    const side = g => {
      const isFrac = g.length === 3 && g[0] === SLOT && g[1] === "/" && g[2] === SLOT;
      if (!isFrac) return `<span class="kside">${g.map(cell).join("")}</span>`;
      const num = cell(g[0]), den = cell(g[2]);      // in frame order: numerator first
      return `<span class="kside"><span class="sfrac kfrac">`
           + `<span class="sf-n">${num}</span><span class="sf-d">${den}</span></span></span>`;
    };
    valEl.innerHTML = sides.map(g => g === "=" ? `<span class="kfx keq">=</span>` : side(g)).join("");
    disp.classList.toggle("empty", toks.length === 0);
  }

  function push(t) {
    if (toks.length >= cap) return;
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

  if (framed) {
    /* Caller-supplied chips. The grid stays 3 columns like every other
       pad in the house; a chip set that does not divide by 3 leaves a
       gap on the last row, so the delete/submit row is pushed to a
       fresh line rather than tucking into that gap where a thumb
       reaching for the last chip would find Submit instead. */
    keys.forEach(t => addKey(t, "tok chip", () => push(t)));
    const pad = keys.length % 3;
    if (pad) { const filler = el("span", "key-gap"); filler.style.gridColumn = `span ${3 - pad}`; grid.appendChild(filler); }
  } else {
    // row 1: the three angles she splits on ·  row 2: the two signs + the unknown
    ["90°", "180°", "360°"].forEach(t => addKey(t, "tok", () => push(t)));
    addKey("−", "tok", () => push("−"));          // real minus (U+2212), never a hyphen
    addKey("+", "tok", () => push("+"));
    addKey(sym, "tok", () => push(sym));
  }
  // last row: delete, then a submit spanning the remaining two columns
  addKey("⌫", "del", () => { toks.pop(); paint(); });
  const sub = addKey("Submit ✓", "submit", () => {
    const raw = toks.join(framed ? THIN : "");
    onSubmit && onSubmit(raw, toks.slice());
  });
  sub.style.gridColumn = "span 2";

  wrap.appendChild(grid);
  host.appendChild(wrap);
  paint();

  return {
    /* the NORMALISED string — what marking compares ("180−θ") */
    get value() { return normalizeTokens(toks.join(framed ? THIN : "")); },
    /* exactly what was tapped, glyphs and all ("180°−θ"). In frame mode
       the chips are joined with the thin space so "sin 62°" and "14" cannot
       run together into "sin 62°14" — normalizeTokens strips it again before
       any comparison, so it is display-and-separation only, never marked. */
    get raw() { return toks.join(framed ? THIN : ""); },
    get tokens() { return toks.slice(); },
    clear() { toks = []; paint(); },
    disable() { grid.querySelectorAll(".key").forEach(b => (b.disabled = true)); },
    enable() { grid.querySelectorAll(".key").forEach(b => (b.disabled = false)); },
  };
}
