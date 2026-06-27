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

export const QUEST_DEFS = {
  q1: quest01, q2: quest02, q3: quest03, q4: quest04,
  q5: quest05, q6: quest06, q7: quest07, q8: quest08,
  f1: questF1, f2: questF2, f3: questF3, f4: questF4,
  f5: questF5, f6: questF6, f7: questF7,
};
export function questDef(id) { return QUEST_DEFS[id] || null; }
