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
import { L } from "../lang.js";

const CL = "calculator";

/* a small, clean, distinct integer set for the read-off tasks */
const readSet = () => dataset(5, 2, 16);

const SKILLS = {
  clear: () => ({
    type: "calcdo", concept: CL,
    prompt: L("Clear the calculator completely, so nothing is left in its memory.", "Maak die sakrekenaar heeltemal skoon, sodat niks in sy geheue oorbly nie."),
    task: L("Do it on the calculator below — press the keys yourself.", "Doen dit op die sakrekenaar hieronder: druk self die knoppies."),
    goal: { type: "clear" },
    hint: L("Clear-all lives under SHIFT 9 (CLR): SHIFT, 9, then 3 (All), then = to confirm.", "Alles skoonmaak lê onder SHIFT 9 (CLR): SHIFT, 9, dan 3 (All), dan = om te bevestig."),
    answerLabel: L("SHIFT, 9, 3, = (Reset All → Yes)", "SHIFT, 9, 3, dan = (Reset All → Yes)"),
    solution: [
      { s: L("Press SHIFT, then 9 — that opens the CLR menu.", "Druk SHIFT, dan 9: dit maak die CLR-kieslys oop.") },
      { s: L("Choose 3 (All).", "Kies 3 (All).") },
      { s: L("Press = to confirm “Reset All?”.", "Druk = om “Reset All?” te bevestig.") },
    ],
  }),

  freqOn: () => ({
    type: "calcdo", concept: CL,
    prompt: L("Switch the frequency column (FREQ) <b>ON</b>, so you can record how often each value occurs.", "Stel die frekwensiekolom (FREQ) op <b>ON</b>, sodat jy kan aanteken hoe dikwels elke waarde voorkom."),
    task: L("Work through the SETUP menu on the calculator below.", "Werk deur die SETUP-kieslys op die sakrekenaar hieronder."),
    goal: { type: "freq", on: true },
    hint: L("Frequency lives in SETUP: SHIFT, MODE (SETUP), scroll ▼, 4 (STAT), then 1 (ON).", "Frekwensie sit in SETUP: SHIFT, MODE (SETUP), blaai ▼, 4 (STAT), dan 1 (ON)."),
    answerLabel: L("SHIFT, MODE, ▼, 4 (STAT), 1 (ON)", "SHIFT, MODE, ▼, 4 (STAT), 1 (ON)"),
    solution: [
      { s: L("Press SHIFT, MODE to open SETUP.", "Druk SHIFT, MODE om SETUP oop te maak.") },
      { s: L("Press ▼ to reach the second page.", "Druk ▼ om by die tweede bladsy te kom.") },
      { s: L("Choose 4 (STAT), then 1 (ON).", "Kies 4 (STAT), dan 1 (ON).") },
    ],
  }),

  statMode: () => ({
    type: "calcdo", concept: CL,
    prompt: L("Put the calculator into single-variable <b>Statistics</b> mode, ready to type a data set in.", "Sit die sakrekenaar in eenveranderlike <b>Statistiek</b>-modus, gereed om 'n datastel in te tik."),
    task: L("Use the MODE menu on the calculator below.", "Gebruik die MODE-kieslys op die sakrekenaar hieronder."),
    goal: { type: "statMode" },
    hint: L("MODE opens the list of modes: MODE, 3 (STAT), 1 (1-VAR).", "MODE maak die lys van modusse oop: MODE, 3 (STAT), 1 (1-VAR)."),
    answerLabel: L("MODE, 3 (STAT), 1 (1-VAR)", "MODE, 3 (STAT), 1 (1-VAR)"),
    solution: [
      { s: L("Press MODE.", "Druk MODE.") },
      { s: L("Choose 3 (STAT).", "Kies 3 (STAT).") },
      { s: L("Choose 1 (1-VAR) — now you can type the data.", "Kies 1 (1-VAR): nou kan jy die data intik.") },
    ],
  }),

  capture: () => {
    const data = readSet();
    return {
      type: "calcdo", concept: CL,
      prompt: L(`Capture this data set on the calculator: <b>${list(data)}</b>`, `Voer hierdie datastel op die sakrekenaar in: <b>${list(data)}</b>`),
      task: L("Get into 1-VAR mode, then type each value. It’s done once all of them are in.", "Gaan in 1-VAR-modus en tik dan elke waarde in. Dit is klaar sodra almal in is."),
      goal: { type: "data", expect: data },
      hint: L("MODE, 3, 1 for 1-VAR. Type a value, then = (or ▼) to drop to the next row. Repeat for every number.", "MODE, 3, 1 vir 1-VAR. Tik 'n waarde in, dan = (of ▼) om na die volgende ry te sak. Herhaal vir elke getal."),
      answerLabel: L(`MODE, 3, 1 → type ${list(data)}, each followed by =`, `MODE, 3, 1 → tik ${list(data)} in, elkeen gevolg deur =`),
      solution: [
        { s: L("MODE, 3 (STAT), 1 (1-VAR) opens the data table.", "MODE, 3 (STAT), 1 (1-VAR) maak die datatabel oop.") },
        { s: L("Type the first value, press = to move down a row.", "Tik die eerste waarde in en druk = om een ry af te gaan.") },
        { s: L("Repeat until every value is entered.", "Herhaal totdat elke waarde ingevoer is.") },
      ],
    };
  },

  readN: () => {
    const data = readSet();
    return {
      type: "calcdo", concept: CL, setup: { data },
      prompt: L(`The data <b>${list(data)}</b> is already captured. Read off <b>n</b> — how many values there are.`, `Die data <b>${list(data)}</b> is reeds ingevoer. Lees <b>n</b> af: hoeveel waardes daar is.`),
      task: L("Use the STAT → Var menu on the calculator below.", "Gebruik die STAT → Var-kieslys op die sakrekenaar hieronder."),
      goal: { type: "stat", tok: "n", value: data.length },
      hint: L("SHIFT, 1 (STAT), 4 (Var), 1 (n), then =.", "SHIFT, 1 (STAT), 4 (Var), 1 (n), dan =."),
      answerLabel: L(`n = ${data.length}`, `n = ${data.length}`),
      solution: [
        { s: L("Press SHIFT, 1 to open the STAT menu.", "Druk SHIFT, 1 om die STAT-kieslys oop te maak.") },
        { s: L("Choose 4 (Var), then 1 (n).", "Kies 4 (Var), dan 1 (n).") },
        { s: L("Press = to show the count.", "Druk = om die aantal te wys.") },
      ],
    };
  },

  readMean: () => {
    const data = readSet();
    const m = mean(data);
    return {
      type: "calcdo", concept: CL, setup: { data },
      prompt: L(`The data <b>${list(data)}</b> is already captured. Read off the <b>mean</b> (x̄).`, `Die data <b>${list(data)}</b> is reeds ingevoer. Lees die <b>gemiddelde</b> (x̄) af.`),
      task: L("Use the STAT → Var menu on the calculator below.", "Gebruik die STAT → Var-kieslys op die sakrekenaar hieronder."),
      goal: { type: "stat", tok: "x̄", value: m, tol: 5e-7 },
      hint: L("SHIFT, 1 (STAT), 4 (Var), 2 (x̄), then =.", "SHIFT, 1 (STAT), 4 (Var), 2 (x̄), dan =."),
      answerLabel: L(`x̄ = ${C(m)}`, `x̄ = ${C(m)}`),
      solution: [
        { s: L("Press SHIFT, 1 (STAT).", "Druk SHIFT, 1 (STAT).") },
        { s: L("Choose 4 (Var), then 2 (x̄) — the mean symbol.", "Kies 4 (Var), dan 2 (x̄): die simbool vir die gemiddelde.") },
        { s: L("Press = to show the mean.", "Druk = om die gemiddelde te wys.") },
      ],
    };
  },

  readSd: () => {
    const data = readSet();
    const sd = stdDev(data);
    return {
      type: "calcdo", concept: CL, setup: { data },
      prompt: L(`The data <b>${list(data)}</b> is already captured. Read off the <b>standard deviation</b> — use <b>σx</b>, not sx.`, `Die data <b>${list(data)}</b> is reeds ingevoer. Lees die <b>standaardafwyking</b> af: gebruik <b>σx</b>, nie sx nie.`),
      task: L("Use the STAT → Var menu on the calculator below.", "Gebruik die STAT → Var-kieslys op die sakrekenaar hieronder."),
      goal: { type: "stat", tok: "σx", value: sd, tol: 5e-4 },
      hint: L("SHIFT, 1 (STAT), 4 (Var), 3 (σx), then =. (σx is option 3; sx is the wrong one.)", "SHIFT, 1 (STAT), 4 (Var), 3 (σx), dan =. (σx is opsie 3; sx is die verkeerde een.)"),
      answerLabel: L(`σx = ${C(sd)}`, `σx = ${C(sd)}`),
      solution: [
        { s: L("Press SHIFT, 1 (STAT), 4 (Var).", "Druk SHIFT, 1 (STAT), 4 (Var).") },
        { s: L("Choose 3 (σx) — the population standard deviation, not 4 (sx).", "Kies 3 (σx): die populasie-standaardafwyking, nie 4 (sx) nie.") },
        { s: L("Press = to show σx.", "Druk = om σx te wys.") },
      ],
    };
  },

  readMedian: () => {
    const data = readSet();
    const med = quartilesExclusive(sortAsc(data)).med;
    return {
      type: "calcdo", concept: CL, setup: { data },
      prompt: L(`The data <b>${list(data)}</b> is already captured. Use <b>MinMax</b> to read off the <b>median</b>.`, `Die data <b>${list(data)}</b> is reeds ingevoer. Gebruik <b>MinMax</b> om die <b>mediaan</b> af te lees.`),
      task: L("Use the STAT → MinMax menu on the calculator below.", "Gebruik die STAT → MinMax-kieslys op die sakrekenaar hieronder."),
      goal: { type: "stat", tok: "med", value: med },
      hint: L("SHIFT, 1 (STAT), 6 (MinMax), 4 (med), then =.", "SHIFT, 1 (STAT), 6 (MinMax), 4 (med), dan =."),
      answerLabel: L(`median = ${C(med)}`, `mediaan = ${C(med)}`),
      solution: [
        { s: L("Press SHIFT, 1 (STAT), 6 (MinMax).", "Druk SHIFT, 1 (STAT), 6 (MinMax).") },
        { s: L("Choose 4 (med).", "Kies 4 (med).") },
        { s: L("Press = to show the median.", "Druk = om die mediaan te wys.") },
      ],
    };
  },
};

export const quest01 = {
  id: "q1",
  skills: Object.entries(SKILLS).map(([id, gen]) => ({ id, concept: CL, gen })),
};
