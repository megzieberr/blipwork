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

export const QUEST_DEFS = {
  q1: quest01, q2: quest02, q3: quest03, q4: quest04,
  q5: quest05, q6: quest06, q7: quest07, q8: quest08,
};
export function questDef(id) { return QUEST_DEFS[id] || null; }
