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
