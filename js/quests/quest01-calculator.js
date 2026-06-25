/* ============================================================
   QUEST 1 · Calculator skills
   The recall a learner needs before every stats question. All
   multiple-choice; options shuffle each time so siblings differ.
   Key sequences follow the Casio fx-STAT menus in the reference.
   ============================================================ */
import { mc } from "./_shared.js";

const CL = "calculator";

const SKILLS = {
  clear: () => mc(CL,
    "Which key sequence clears <b>everything</b> on the calculator?",
    "SHIFT, 9, 3 (All), = (Yes)",
    ["MODE, 3, = ", "SHIFT, 9, 1, =", "AC, AC, AC"],
    { hint: "Clear-all is SHIFT 9 (CLR) → 3 (All) → = (Yes)." }),

  freqOn: () => mc(CL,
    "Which steps switch the <b>frequency</b> column ON?",
    "SHIFT, MODE (SETUP), ↓, 4 (STAT), 1 (ON)",
    ["MODE, 4, 1", "SHIFT, 1, 4, 1", "MODE, 3, 1"],
    { hint: "Frequency lives in SETUP: SHIFT MODE → scroll down → 4 (STAT) → 1 (ON)." }),

  enterData: () => mc(CL,
    "Which puts the calculator into single-variable stats mode to type the data in?",
    "MODE, 3 (STAT), 1 (1-VAR)",
    ["MODE, 2 (CMPLX)", "SHIFT, 1 (STAT)", "MODE, 3, 2 (A+BX)"],
    { hint: "MODE → 3 (STAT) → 1 (1-VAR), then type the values and press AC." }),

  mean: () => mc(CL,
    "The Var menu reads <span class=\"num\">1:n  2:x̄  3:σx  4:sx</span>. Which gives the <b>mean</b>?",
    "2 (x̄)", ["1 (n)", "3 (σx)", "4 (sx)"],
    { hint: "x̄ is the symbol for the mean — option 2." }),

  sd: () => mc(CL,
    "The Var menu reads <span class=\"num\">1:n  2:x̄  3:σx  4:sx</span>. Which gives the <b>standard deviation</b>?",
    "3 (σx)", ["4 (sx)", "2 (x̄)", "1 (n)"],
    { hint: "Use σx (population standard deviation) — option 3, not sx.", answerLabel: "3 (σx) — the population standard deviation" }),

  count: () => mc(CL,
    "The Var menu reads <span class=\"num\">1:n  2:x̄  3:σx  4:sx</span>. Which gives the <b>number of values</b>, n?",
    "1 (n)", ["2 (x̄)", "3 (σx)", "4 (sx)"],
    { hint: "n is simply the count of data values — option 1." }),

  quartiles: () => mc(CL,
    "After entering the data, which menu gives <b>Q1, the median and Q3</b>?",
    "SHIFT, 1 (STAT), 6 (MinMax)",
    ["SHIFT, 1 (STAT), 4 (Var)", "SHIFT, 1 (STAT), 5", "MODE, 3, 6"],
    { hint: "MinMax lists minX, maxX, Q1, med, Q3 — SHIFT 1 → 6.", answerLabel: "SHIFT, 1, 6 (MinMax) — it lists minX, maxX, Q1, med, Q3" }),

  freqCols: () => mc(CL,
    "With frequency turned <b>ON</b>, how many columns does the data table show?",
    "Two — X and FREQ",
    ["One — just X", "Three — X, FREQ and CF", "It depends on the data"],
    { hint: "Frequency ON adds a second column so you type each value and how often it occurs." }),
};

export const quest01 = {
  id: "q1",
  skills: Object.entries(SKILLS).map(([id, gen]) => ({ id, concept: CL, gen })),
};
