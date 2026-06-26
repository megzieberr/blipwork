/* ============================================================
   QUEST 1 · Calculator skills  (HANDS-ON)
   The learner doesn't pick from a list — they actually work the
   embedded Casio fx-991ZA Plus II, pressing the real key sequences.
   Each task watches the calculator's milestone events to know when
   the step is genuinely done (or, for read-offs, that the WRONG
   measure was read). Sequences follow the menus the class is taught.
   Reactive help: 💡 Hint reveals the keys; a wrong read-off shows the
   worked steps and a fresh sibling.
   ============================================================ */
import { dataset, list, C } from "./_shared.js";
import { mean, stdDev, sortAsc, quartilesExclusive } from "../statlib.js";

const CL = "calculator";

/* a small, clean, distinct integer set for the read-off tasks */
const readSet = () => dataset(5, 2, 16);

const SKILLS = {
  clear: () => ({
    type: "calcdo", concept: CL,
    prompt: "Clear the calculator completely, so nothing is left in its memory.",
    task: "Do it on the calculator below — press the keys yourself.",
    goal: { type: "clear" },
    hint: "Clear-all lives under SHIFT 9 (CLR): SHIFT, 9, then 3 (All), then = to confirm.",
    answerLabel: "SHIFT, 9, 3, = (Reset All → Yes)",
    solution: [
      { s: "Press SHIFT, then 9 — that opens the CLR menu." },
      { s: "Choose 3 (All)." },
      { s: "Press = to confirm “Reset All?”." },
    ],
  }),

  freqOn: () => ({
    type: "calcdo", concept: CL,
    prompt: "Switch the frequency column (FREQ) <b>ON</b>, so you can record how often each value occurs.",
    task: "Work through the SETUP menu on the calculator below.",
    goal: { type: "freq", on: true },
    hint: "Frequency lives in SETUP: SHIFT, MODE (SETUP), scroll ▼, 4 (STAT), then 1 (ON).",
    answerLabel: "SHIFT, MODE, ▼, 4 (STAT), 1 (ON)",
    solution: [
      { s: "Press SHIFT, MODE to open SETUP." },
      { s: "Press ▼ to reach the second page." },
      { s: "Choose 4 (STAT), then 1 (ON)." },
    ],
  }),

  statMode: () => ({
    type: "calcdo", concept: CL,
    prompt: "Put the calculator into single-variable <b>Statistics</b> mode, ready to type a data set in.",
    task: "Use the MODE menu on the calculator below.",
    goal: { type: "statMode" },
    hint: "MODE opens the list of modes: MODE, 3 (STAT), 1 (1-VAR).",
    answerLabel: "MODE, 3 (STAT), 1 (1-VAR)",
    solution: [
      { s: "Press MODE." },
      { s: "Choose 3 (STAT)." },
      { s: "Choose 1 (1-VAR) — now you can type the data." },
    ],
  }),

  capture: () => {
    const data = readSet();
    return {
      type: "calcdo", concept: CL,
      prompt: `Capture this data set on the calculator: <b>${list(data)}</b>`,
      task: "Get into 1-VAR mode, then type each value. It’s done once all of them are in.",
      goal: { type: "data", expect: data },
      hint: "MODE, 3, 1 for 1-VAR. Type a value, then = (or ▼) to drop to the next row. Repeat for every number.",
      answerLabel: `MODE, 3, 1 → type ${list(data)}, each followed by =`,
      solution: [
        { s: "MODE, 3 (STAT), 1 (1-VAR) opens the data table." },
        { s: "Type the first value, press = to move down a row." },
        { s: "Repeat until every value is entered." },
      ],
    };
  },

  readN: () => {
    const data = readSet();
    return {
      type: "calcdo", concept: CL, setup: { data },
      prompt: `The data <b>${list(data)}</b> is already captured. Read off <b>n</b> — how many values there are.`,
      task: "Use the STAT → Var menu on the calculator below.",
      goal: { type: "stat", tok: "n", value: data.length },
      hint: "SHIFT, 1 (STAT), 4 (Var), 1 (n), then =.",
      answerLabel: `n = ${data.length}`,
      solution: [
        { s: "Press SHIFT, 1 to open the STAT menu." },
        { s: "Choose 4 (Var), then 1 (n)." },
        { s: "Press = to show the count." },
      ],
    };
  },

  readMean: () => {
    const data = readSet();
    const m = mean(data);
    return {
      type: "calcdo", concept: CL, setup: { data },
      prompt: `The data <b>${list(data)}</b> is already captured. Read off the <b>mean</b> (x̄).`,
      task: "Use the STAT → Var menu on the calculator below.",
      goal: { type: "stat", tok: "x̄", value: m, tol: 5e-7 },
      hint: "SHIFT, 1 (STAT), 4 (Var), 2 (x̄), then =.",
      answerLabel: `x̄ = ${C(m)}`,
      solution: [
        { s: "Press SHIFT, 1 (STAT)." },
        { s: "Choose 4 (Var), then 2 (x̄) — the mean symbol." },
        { s: "Press = to show the mean." },
      ],
    };
  },

  readSd: () => {
    const data = readSet();
    const sd = stdDev(data);
    return {
      type: "calcdo", concept: CL, setup: { data },
      prompt: `The data <b>${list(data)}</b> is already captured. Read off the <b>standard deviation</b> — use <b>σx</b>, not sx.`,
      task: "Use the STAT → Var menu on the calculator below.",
      goal: { type: "stat", tok: "σx", value: sd, tol: 5e-4 },
      hint: "SHIFT, 1 (STAT), 4 (Var), 3 (σx), then =. (σx is option 3; sx is the wrong one.)",
      answerLabel: `σx = ${C(sd)}`,
      solution: [
        { s: "Press SHIFT, 1 (STAT), 4 (Var)." },
        { s: "Choose 3 (σx) — the population standard deviation, not 4 (sx)." },
        { s: "Press = to show σx." },
      ],
    };
  },

  readMedian: () => {
    const data = readSet();
    const med = quartilesExclusive(sortAsc(data)).med;
    return {
      type: "calcdo", concept: CL, setup: { data },
      prompt: `The data <b>${list(data)}</b> is already captured. Use <b>MinMax</b> to read off the <b>median</b>.`,
      task: "Use the STAT → MinMax menu on the calculator below.",
      goal: { type: "stat", tok: "med", value: med },
      hint: "SHIFT, 1 (STAT), 6 (MinMax), 4 (med), then =.",
      answerLabel: `median = ${C(med)}`,
      solution: [
        { s: "Press SHIFT, 1 (STAT), 6 (MinMax)." },
        { s: "Choose 4 (med)." },
        { s: "Press = to show the median." },
      ],
    };
  },
};

export const quest01 = {
  id: "q1",
  skills: Object.entries(SKILLS).map(([id, gen]) => ({ id, concept: CL, gen })),
};
