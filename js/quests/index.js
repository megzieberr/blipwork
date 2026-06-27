/* Quest registry — maps a quest id to its playable definition (skills).
   Quests without an entry here show as "coming soon" on the map. */
import { quest01 } from "./quest01-calculator.js";
import { quest02 } from "./quest02-centre-spread.js";
import { quest03 } from "./quest03-quartiles.js";
import { quest04 } from "./quest04-skewness.js";
import { quest05 } from "./quest05-grouped.js";
import { quest06 } from "./quest06-ogives.js";
import { quest07 } from "./quest07-stddev.js";
import { quest08 } from "./quest08-mixed.js";
import { questF1 } from "./questf1-words.js";
import { questF2 } from "./questf2-types.js";
import { questF3 } from "./questf3-compounding.js";
import { questF4 } from "./questf4-timeline-count.js";
import { questF5 } from "./questf5-timeline-build.js";
import { questF6 } from "./questf6-deposits.js";
import { questF7 } from "./questf7-eff-nom.js";
import { questP1 } from "./questp1-basics.js";
import { questP2 } from "./questp2-venn-regions.js";
import { questP3 } from "./questp3-venn-prob.js";
import { questP4 } from "./questp4-rules.js";
import { questP5 } from "./questp5-independence.js";
import { questP6 } from "./questp6-trees.js";
import { questP7 } from "./questp7-replacement.js";
import { questT1 } from "./questt1-choose.js";
import { questT2 } from "./questt2-sine-sides.js";
import { questT3 } from "./questt3-sine-angles.js";
import { questT4 } from "./questt4-cosine-sides.js";
import { questT5 } from "./questt5-cosine-angles.js";
import { questT6 } from "./questt6-area.js";
import { questT7 } from "./questt7-mixed.js";
import { questM1 } from "./questm1-name-formula.js";
import { questM2 } from "./questm2-heights.js";
import { questM3 } from "./questm3-open.js";
import { questM4 } from "./questm4-composite.js";
import { questM5 } from "./questm5-mixed.js";
import { questM6 } from "./questm6-height.js";
import { questFn1 } from "./questfn1-families.js";
import { questFn2 } from "./questfn2-line-parabola.js";
import { questFn3 } from "./questfn3-hyperbola-exp.js";
import { questFn4 } from "./questfn4-read-graph.js";
import { questFn5 } from "./questfn5-inequalities.js";
import { questFn6 } from "./questfn6-transformations.js";
import { questFn7 } from "./questfn7-together.js";

export const QUEST_DEFS = {
  q1: quest01, q2: quest02, q3: quest03, q4: quest04,
  q5: quest05, q6: quest06, q7: quest07, q8: quest08,
  f1: questF1, f2: questF2, f3: questF3, f4: questF4,
  f5: questF5, f6: questF6, f7: questF7,
  p1: questP1, p2: questP2, p3: questP3, p4: questP4,
  p5: questP5, p6: questP6, p7: questP7,
  t1: questT1, t2: questT2, t3: questT3, t4: questT4,
  t5: questT5, t6: questT6, t7: questT7,
  m1: questM1, m2: questM2, m3: questM3, m4: questM4, m5: questM5, m6: questM6,
  fn1: questFn1, fn2: questFn2, fn3: questFn3, fn4: questFn4,
  fn5: questFn5, fn6: questFn6, fn7: questFn7,
};
export function questDef(id) { return QUEST_DEFS[id] || null; }
