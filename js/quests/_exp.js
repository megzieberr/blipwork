/* ============================================================
   Shared Exponents & Surds helpers.
   ------------------------------------------------------------
   This chapter is THEORY only — no graph engine. Questions are
   multiple-choice ("which rule / which method / what is the
   conjugate") and yes/no trap-spotters ("is this step legal?").
   So the helpers here are just light formatting + a yes/no
   builder + a "pick one item from a curated pool" pattern.

   Formatting note: prompts and option labels are rendered with
   innerHTML (see ui.el), so <sup>, √, ·, ½ etc. all work.
   ============================================================ */
import { mc } from "./_shared.js";
import { pick, shuffled, randInt } from "../ui.js";

/* eight rose/red shades, light → deep (Exponents & Surds quests 1 → 8) —
   matches EXP_SHADES in config.js */
export const EXP = [
  "#fda4af", "#fb7185", "#f43f5e", "#e11d48",
  "#c81e3a", "#be123c", "#9f1239", "#881337",
];

/* ---- tiny formatting helpers (HTML; safe inside prompts & options) ---- */
export const sup = (s) => `<sup>${s}</sup>`;
export const pw = (b, e) => `${b}<sup>${e}</sup>`;          // power:  x²  →  pw("x","2")
export const pwp = (inner, e) => `(${inner})<sup>${e}</sup>`; // bracket power
export const root = (rad, idx) => (idx ? `<sup>${idx}</sup>√${rad}` : `√${rad}`);
export const frac = (n, d) => `<span class="efrac"><sup>${n}</sup>⁄<sub>${d}</sub></span>`;
export const b = (s) => `<b>${s}</b>`;

export { mc, pick, shuffled, randInt };

/* ---- rolled-number helpers (dice wave 2, 2026-08-23) ----
   The CARE skills in this chapter were hand-written with UNICODE
   superscripts (2³, x⁻², (xy)ᵃ⁺ᵇ). usup() builds the same characters
   from a rolled value, so a parametrised prompt is indistinguishable
   from the vetted fixed text it replaces — and js/ui.js's expression
   scanner keeps treating the power as part of its atom, exactly as
   before (its atom class already lists ² ³ ¹ and U+2070–U+209C).
   Only digits, + , − and the letters a/b/k/m/n/p/x are ever passed in;
   anything else falls through unchanged. */
const SUPMAP = {
  "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴", "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹",
  "-": "⁻", "−": "⁻", "+": "⁺", "(": "⁽", ")": "⁾",
  a: "ᵃ", b: "ᵇ", k: "ᵏ", m: "ᵐ", n: "ⁿ", p: "ᵖ", x: "ˣ",
};
export const usup = (s) => String(s).split("").map((c) => SUPMAP[c] || c).join("");
export const upw = (base, e) => `${base}${usup(e)}`;      // upw(2,3) → "2³", upw("x","-2") → "x⁻²"

/* SA minus sign (U+2212) on any rolled negative — the house rule
   everywhere a number is shown (same as check.js's fmtComma). */
export const sgn = (n) => (n < 0 ? `−${Math.abs(n)}` : `${n}`);

/* Radicands that are NOT perfect squares. A rolled √4 would quietly be
   an integer and break every "the surd disappears" / conjugate answer,
   so every rolled surd draws from here. */
export const NONSQ = [2, 3, 5, 6, 7, 10, 11, 13, 14, 15];

export const gcd = (a, c) => (c ? gcd(c, a % c) : Math.abs(a));

/* yes/no trap builder — render reads {type:"yesno", yes, prompt, ...}.
   `yes` is whether the STATEMENT is correct, not whether the maths is "yes". */
export function ynQ(concept, prompt, yes, opts = {}) {
  return {
    type: "yesno", concept, prompt, yes,
    hint: opts.hint, answerLabel: opts.answerLabel,
    solution: opts.solution || (opts.answerLabel ? [{ s: opts.answerLabel }] : undefined),
  };
}

/* Build a multiple-choice question from a curated pool item.
   item = { q, correct, wrongs, hint, ans }  →  mc(...) */
export function poolMC(concept, poolItem) {
  return mc(concept, poolItem.q, poolItem.correct, poolItem.wrongs,
    { hint: poolItem.hint, answerLabel: poolItem.ans, layout: poolItem.layout });
}

/* Build a yes/no question from a curated pool item.
   item = { q, yes, hint, ans } */
export function poolYN(concept, poolItem) {
  return ynQ(concept, poolItem.q, poolItem.yes, { hint: poolItem.hint, answerLabel: poolItem.ans });
}
