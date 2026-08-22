/* ============================================================
   GENERAL TRIG · gt7 — Reductions: unknown variables
   ------------------------------------------------------------
   METHODS-trig.md Part G (p10–p12, p14–p16, p18–p20). Same machine
   as gt5, but the answer is an EXPRESSION, so the chain is only two
   steps — sign, then ratio; the value is just the letter itself
   (her design: no number pad here, D6/G).

   Every item comes from ONE generator (symbolicReduce in _gtrig.js)
   drawing a random form × random fn × random letter, across ALL 11
   wheel forms (both wheels — positive/negative reductions AND the
   three co-function arms), so "mix 90-forms in as siblings" is true
   by construction rather than a special case. tan is excluded from
   the three co-function forms (90−θ/90+θ/θ−90): her rounds only
   ever ask co-functions of sin and cos (triglib's cofunction() turns
   tan into cot, which never appears in her rounds).
   ============================================================ */
import { pick, mcStep, symbolicReduce, applyForm } from "./_gtrig.js";

const CON = "gtrigReduceVar";
const H1 = "which quadrant does the form land in? Read the sign off the story.";
const H2 = "only 90 ± θ and θ − 90 convert; everything else stays.";

const FORMS = ["180−θ", "180+θ", "360−θ", "−θ", "θ−360", "θ−180", "−180−θ", "−360−θ", "90−θ", "90+θ", "θ−90"];
const CO_FORMS = new Set(["90−θ", "90+θ", "θ−90"]);
const LETTERS = ["θ", "x", "α", "A"];
const STAND_IN = 23;      // her stand-in θ the harness recomputes at
const ARM = {
  "180−θ": "S", "180+θ": "T", "360−θ": "C", "−θ": "C",
  "θ−360": "A", "θ−180": "T", "−180−θ": "S", "−360−θ": "C",
};
const ARM_WORD = { A: "All", S: "Strippers", T: "Take", C: "Cash" };

/* the form written her way, WITH the learner's own letter dropped in */
const FORM_TPL = {
  "180−θ": l => `180° − ${l}`,
  "180+θ": l => `180° + ${l}`,
  "360−θ": l => `360° − ${l}`,
  "−θ": l => `−${l}`,
  "θ−360": l => `${l} − 360°`,
  "θ−180": l => `${l} − 180°`,
  "−180−θ": l => `−180° − ${l}`,
  "−360−θ": l => `−360° − ${l}`,
  "90−θ": l => `90° − ${l}`,
  "90+θ": l => `90° + ${l}`,
  "θ−90": l => `${l} − 90°`,
};

function randomReduceVarQ() {
  const form = pick(FORMS);
  const isCoFn = CO_FORMS.has(form);
  const fn = isCoFn ? pick(["sin", "cos"]) : pick(["sin", "cos", "tan"]);
  const letter = pick(LETTERS);
  const { sign, fn2 } = symbolicReduce(fn, form);
  const argText = FORM_TPL[form](letter);
  const armNote = isCoFn ? "co-function — converts" : `wheel arm ${ARM[form]} (${ARM_WORD[ARM[form]]})`;
  const reduced = `${sign < 0 ? "−" : ""}${fn2} ${letter}`;

  const otherFns = ["sin", "cos", "tan"].filter(f => f !== fn2);
  return {
    type: "steps", concept: CON,
    _dbg: { fn, angle: applyForm(form, STAND_IN), theta: STAND_IN },   // harness-only recompute hook
    prompt: `${fn}(${argText}) = ?`,
    steps: [
      mcStep("What's the sign?", sign > 0 ? "+" : "−", [sign > 0 ? "−" : "+"], H1),
      mcStep("Which ratio does it become?", fn2, otherFns, H2),
    ],
    hint: H1,
    answerLabel: `${fn}(${argText}) = ${reduced} — ${armNote}.`,
    solution: [
      { s: `Sign: ${sign < 0 ? "−" : "+"}`, r: armNote },
      { s: `Ratio: ${fn} → ${fn2}`, r: isCoFn ? "co-functions convert sin ↔ cos." : "a plain reduction never swaps the ratio." },
    ],
  };
}

/* seven slots, one generator — every play draws a fresh random
   form × fn × letter per slot (siblings are the SAME generator) */
const SKILLS = {
  item1: randomReduceVarQ, item2: randomReduceVarQ, item3: randomReduceVarQ,
  item4: randomReduceVarQ, item5: randomReduceVarQ, item6: randomReduceVarQ,
  item7: randomReduceVarQ,
};

export const questGt7 = {
  id: "gt7",
  stackFractions: true,
  skills: Object.entries(SKILLS).map(([id, gen]) => ({ id, concept: CON, gen })),
};
