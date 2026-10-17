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
import { L } from "../lang.js";

const CON = "gtrigReduceVar";
const H1 = L("which quadrant does the form land in? Read the sign off the story.", "in watter kwadrant land die vorm? Lees die teken van die storie af.");
const H2 = L("only 90 ± θ and θ − 90 convert; everything else stays.", "net 90 ± θ en θ − 90 skakel om; alles anders bly.");

const FORMS = [L("180−θ", "180−θ"), L("180+θ", "180+θ"), L("360−θ", "360−θ"), L("−θ", "−θ"), L("θ−360", "θ−360"), L("θ−180", "θ−180"), L("−180−θ", "−180−θ"), L("−360−θ", "−360−θ"), L("90−θ", "90−θ"), L("90+θ", "90+θ"), L("θ−90", "θ−90")];
const CO_FORMS = new Set([L("90−θ", "90−θ"), L("90+θ", "90+θ"), L("θ−90", "θ−90")]);
const LETTERS = [L("θ", "θ"), L("x", "x"), L("α", "α"), L("A", "A")];
const STAND_IN = 23;      // her stand-in θ the harness recomputes at
const ARM = {
  "180−θ": L("S", "S"), "180+θ": L("T", "T"), "360−θ": L("C", "C"), "−θ": L("C", "C"),
  "θ−360": L("A", "A"), "θ−180": L("T", "T"), "−180−θ": L("S", "S"), "−360−θ": L("C", "C"),
};
const ARM_WORD = { A: L("All", "All"), S: L("Strippers", "Strippers"), T: L("Take", "Take"), C: L("Cash", "Cash") };

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
  const fn = isCoFn ? pick([L("sin", "sin"), L("cos", "cos")]) : pick([L("sin", "sin"), L("cos", "cos"), L("tan", "tan")]);
  const letter = pick(LETTERS);
  const { sign, fn2 } = symbolicReduce(fn, form);
  const argText = FORM_TPL[form](letter);
  const armNote = isCoFn ? L("co-function — converts", "ko-funksie: skakel om") : L(`wheel arm ${ARM[form]} (${ARM_WORD[ARM[form]]})`, `wielarm ${ARM[form]} (${ARM_WORD[ARM[form]]})`);
  const reduced = `${sign < 0 ? "−" : ""}${fn2} ${letter}`;

  const otherFns = [L("sin", "sin"), L("cos", "cos"), L("tan", "tan")].filter(f => f !== fn2);
  return {
    type: "steps", concept: CON,
    _dbg: { fn, angle: applyForm(form, STAND_IN), theta: STAND_IN },   // harness-only recompute hook
    prompt: `${fn}(${argText}) = ?`,
    steps: [
      mcStep(L("What's the sign?", "Wat is die teken?"), sign > 0 ? "+" : "−", [sign > 0 ? "−" : "+"], H1),
      mcStep(L("Which ratio does it become?", "Watter verhouding word dit?"), fn2, otherFns, H2),
    ],
    hint: H1,
    answerLabel: `${fn}(${argText}) = ${reduced} — ${armNote}.`,
    solution: [
      { s: L(`Sign: ${sign < 0 ? "−" : "+"}`, `Teken: ${sign < 0 ? "−" : "+"}`), r: armNote },
      { s: L(`Ratio: ${fn} → ${fn2}`, `Verhouding: ${fn} → ${fn2}`), r: isCoFn ? L("co-functions convert sin ↔ cos.", "ko-funksies skakel sin ↔ cos om.") : L("a plain reduction never swaps the ratio.", "'n gewone reduksie ruil nooit die verhouding om nie.") },
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
