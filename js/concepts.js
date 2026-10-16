/* ============================================================
   CONCEPT CARDS  ("I'm lost" — re-teach the idea from scratch)
   ------------------------------------------------------------
   Opened from any question via the "I'm lost" button. Re-teaches
   the underlying idea, then the learner returns to a FRESH sibling
   question on the same skill. Wording follows CAPS conventions;
   example numbers are original (never from the planning PDFs).
   2026-10-17 (AF row S4): the cards now live one file per chapter,
   js/concepts/<chapter id>.js, each exporting CONCEPTS_<ID>. This file
   only assembles them, in the old chapter order, into the same CONCEPTS
   object; the finance pictures are js/concepts/_finance-pictures.js.
   tools/concepts_split_check.mjs proves the object did not change.
   ============================================================ */
import { CONCEPTS_STATS } from "./concepts/stats.js";
import { CONCEPTS_FINANCE } from "./concepts/finance.js";
import { CONCEPTS_PROB } from "./concepts/prob.js";
import { CONCEPTS_TRIG } from "./concepts/trig.js";
import { CONCEPTS_MEAS } from "./concepts/meas.js";
import { CONCEPTS_FUNC } from "./concepts/func.js";
import { CONCEPTS_TGRAPH } from "./concepts/tgraph.js";
import { CONCEPTS_ANALYTICAL } from "./concepts/analytical.js";
import { CONCEPTS_PAT } from "./concepts/pat.js";
import { CONCEPTS_EXP } from "./concepts/exp.js";
import { CONCEPTS_EQN } from "./concepts/eqn.js";
import { CONCEPTS_GTRIG } from "./concepts/gtrig.js";

export { jugDiscover, BUILD_TIMELINE_EXAMPLE } from "./concepts/_finance-pictures.js";

export const CONCEPTS = {
  ...CONCEPTS_STATS,
  ...CONCEPTS_FINANCE,
  ...CONCEPTS_PROB,
  ...CONCEPTS_TRIG,
  ...CONCEPTS_MEAS,
  ...CONCEPTS_FUNC,
  ...CONCEPTS_TGRAPH,
  ...CONCEPTS_ANALYTICAL,
  ...CONCEPTS_PAT,
  ...CONCEPTS_EXP,
  ...CONCEPTS_EQN,
  ...CONCEPTS_GTRIG,
};

export function getConcept(id) { return CONCEPTS[id] || null; }
