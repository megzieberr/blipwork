/* ============================================================
   GENERAL TRIG · gt3 — Special angles & identities (discovery)
   ------------------------------------------------------------
   METHODS-trig.md Part C (p06, p25, p39–p43). The two triangles
   FIRST, then Oats Are Healthy built in her order, then picking
   values (unrationalised, flag F12), quadrantal angles read off
   the graph, reciprocals ("look at the 3rd letter"), and masked
   identities. Discovery round: xpOnce (first pass only).
   Every value is COMPUTED by triglib's specialExact — the table
   text is only how she WRITES the number, never how it's decided.
   Never a bare 9-value grid (her standing dislike) — two triangles,
   then the O-A-H table, built stage by stage.
   ============================================================ */
import { mc, pick, shuffled, oahTable, OAH_TABLE, special45Spec, special30Spec } from "./_gtrig.js";
import { specialExact } from "../triglib.js";
import { renderTriangle } from "../engine/triangle-graph.js";
import { L } from "../lang.js";

const CON = "gtrigSpecial";

function reveal(q, frames, mode) { q.reveal = frames; if (mode) q.revealMode = mode; return q; }

const TRIANGLE_FRAMES = [
  renderTriangle(special45Spec()),
  renderTriangle(special30Spec()),
  `<div style="font-size:14.5px;line-height:1.6">Where they come from: cut a <b>square</b> corner to corner and you get 45-45-90; cut an <b>equilateral triangle</b> straight down the middle and you get 30-60-90.</div>`,
];
const OAH_FRAMES = [0, 1, 2, 3, 4, 5].map(s => oahTable(s));

/* Each item's `sol` is the triangle's OWN story — the cut she describes in
   TRIANGLE_FRAMES frame 3, then Pythagoras. No value is restated without
   being built first (2026-09-02 methods batch, session S3). */
const CUT_EQUI = { s: L("Take an equilateral triangle with sides of 2 and cut it straight down the middle", "Neem 'n gelyksydige driehoek met sye van 2 en sny dit reg middeldeur"), r: L("that cut is where the 30-60-90 comes from", "daardie snit is waar die 30-60-90 vandaan kom") };
const CUT_SQUARE = { s: L("Take a square with sides of 1 and cut it corner to corner", "Neem 'n vierkant met sye van 1 en sny dit van hoek tot hoek"), r: L("that cut is where the 45-45-90 comes from", "daardie snit is waar die 45-45-90 vandaan kom") };
const TRI_ITEMS = [
  { prompt: L("In the 30-60-90 triangle, the side opposite 30° is…", "In die 30-60-90-driehoek is die sy teenoor 30°…"), correct: "1",
    sol: [CUT_EQUI,
      { s: L("The cut halves the 60° top angle into 30°, and halves the base of 2 into 1", "Die snit halveer die boonste hoek van 60° na 30°, en halveer die basis van 2 na 1") },
      { s: L("That half-base lies straight across from the 30° corner, so it is 1", "Daardie halwe basis lê reg oorkant die 30°-hoek, dus is dit 1") }] },
  { prompt: L("In the 30-60-90 triangle, the side opposite 60° is…", "In die 30-60-90-driehoek is die sy teenoor 60°…"), correct: "√3",
    sol: [CUT_EQUI,
      { s: L("Base = 1, slanted side = 2, so height² = 2² − 1² = 3", "Basis = 1, skuins sy = 2, dus hoogte² = 2² − 1² = 3"), r: L("(pyth)", "(pyth)") },
      { s: L("height = √3, and it sits across from the 60° corner, so that side is √3", "hoogte = √3, en dit lê oorkant die 60°-hoek, dus is daardie sy √3") }] },
  { prompt: L("In the 30-60-90 triangle, the side opposite 90° (the hypotenuse) is…", "In die 30-60-90-driehoek is die sy teenoor 90° (die skuinssy)…"), correct: "2",
    sol: [CUT_EQUI,
      { s: L("The cut does not touch the slanted side — it is still a whole side of the equilateral triangle", "Die snit raak nie die skuins sy nie: dit is steeds 'n hele sy van die gelyksydige driehoek") },
      { s: L("That slanted side faces the right angle, so the hypotenuse is 2", "Daardie skuins sy kyk na die regte hoek, dus is die skuinssy 2") }] },
  { prompt: L("In the 45-45-90 triangle, the side opposite a 45° angle is…", "In die 45-45-90-driehoek is die sy teenoor 'n 45°-hoek…"), correct: "1",
    sol: [CUT_SQUARE,
      { s: L("The two short sides of the new triangle are just sides of the square, so each is 1", "Die twee kort sye van die nuwe driehoek is net sye van die vierkant, dus is elkeen 1") },
      { s: L("Each of them faces one of the 45° corners, so that side is 1", "Elkeen kyk na een van die 45°-hoeke, dus is daardie sy 1") }] },
  { prompt: L("In the 45-45-90 triangle, the side opposite 90° (the hypotenuse) is…", "In die 45-45-90-driehoek is die sy teenoor 90° (die skuinssy)…"), correct: "√2",
    sol: [CUT_SQUARE,
      { s: L("The two short sides are 1 and 1, so hyp² = 1² + 1² = 2", "Die twee kort sye is 1 en 1, dus skuinssy² = 1² + 1² = 2"), r: L("(pyth)", "(pyth)") },
      { s: L("hyp = √2, and it faces the right angle, so the hypotenuse is √2", "skuinssy = √2, en dit kyk na die regte hoek, dus is die skuinssy √2") }] },
];
const ALL_SIDES = ["1", "√3", "2", "√2"];

const ANGLES = [30, 45, 60], FNS = [L("sin", "sin"), L("cos", "cos"), L("tan", "tan")];
function pickValueQ() {
  const angle = pick(ANGLES), fn = pick(FNS);
  const correct = specialExact(fn, angle);
  const seen = [correct.value];
  const pool = [];
  ANGLES.forEach(a => FNS.forEach(f => {
    if (f === fn && a === angle) return;
    const r = specialExact(f, a);
    if (r.value == null || seen.some(v => Math.abs(v - r.value) < 1e-9)) return;
    seen.push(r.value); pool.push(r);
  }));
  const wrongs = shuffled(pool).slice(0, 3).map(p => p.text);
  // the finished O-A-H table sits ABOVE the question (her ruling 2026-08-22: the
  // table must be on screen when a value is asked — it is a reading exercise)
  /* the two O-A-H letters SOHCAHTOA hands you, then the cell values —
     tan 45° comes out as 1/1 and tan 60° as √3/1, written as fractions
     off the table exactly as she does (METHODS-trig C7) */
  const LETTERS = { sin: [L("O", "O"), L("H", "H")], cos: [L("A", "A"), L("H", "H")], tan: [L("O", "O"), L("A", "A")] }[fn];
  /* cellTop / cellBot, never `top` — her standing rule against a `top`
     binding anywhere in this app's JS, even a function-scoped one */
  const cellTop = OAH_TABLE[LETTERS[0]][angle], cellBot = OAH_TABLE[LETTERS[1]][angle];
  const raw = `${cellTop}/${cellBot}`;
  return mc(CON, `<div class="q-oah">${oahTable(5)}</div>${fn} ${angle}° = ?`, correct.text, wrongs,
    { hint: L("Pick the two letters SOHCAHTOA gives you, then read them off the table.", "Kies die twee letters wat SOHCAHTOA vir jou gee, lees hulle dan van die tabel af."),
      answerLabel: L(`${fn} ${angle}° = ${correct.text} (from the O-A-H table).`, `${fn} ${angle}° = ${correct.text} (uit die O-A-H-tabel).`),
      solution: [
        { s: `${fn === L("sin", "sin") ? L("SOH", "SOH") : fn === L("cos", "cos") ? L("CAH", "CAH") : L("TOA", "TOA")}: ${fn} = ${LETTERS[0]}/${LETTERS[1]}`, r: L("SOHCAHTOA picks the two letters", "SOHCAHTOA kies die twee letters") },
        { s: L(`In the ${angle}° column: ${LETTERS[0]} = ${cellTop} and ${LETTERS[1]} = ${cellBot}`, `In die ${angle}°-kolom: ${LETTERS[0]} = ${cellTop} en ${LETTERS[1]} = ${cellBot}`), r: L("read the two cells off the O-A-H table", "lees die twee selle van die O-A-H-tabel af") },
        { s: raw === correct.text ? `${fn} ${angle}° = ${raw}` : `${fn} ${angle}° = ${raw} = ${correct.text}` },
      ] });
}

const QANGLES = [0, 90, 180, 270, 360], QFNS = [L("sin", "sin"), L("cos", "cos")];
function quadrantalQ() {
  const angle = pick(QANGLES), fn = pick(QFNS);
  const correct = specialExact(fn, angle);
  const seen = [correct.value];
  const pool = [];
  QANGLES.forEach(a => QFNS.forEach(f => {
    if (f === fn && a === angle) return;
    const r = specialExact(f, a);
    if (r.value == null || seen.some(v => Math.abs(v - r.value) < 1e-9)) return;
    seen.push(r.value); pool.push(r);
  }));
  const wrongs = shuffled(pool).slice(0, 3).map(p => p.text);
  const graph = { type: "trigg", w: 380, h: 200, win: { xmin: 0, xmax: 360, ymin: -1.3, ymax: 1.3 }, xstep: 90, grid: true,
    curves: [{ fn, a: 1, b: 1, p: 0, q: 0, tone: "a" }] };   // no points[] — the picture never labels the answer
  return mc(CON, `${fn} ${angle}° = ?`, correct.text, wrongs,
    { hint: L("Read it straight off the picture (or type it into the calculator).", "Lees dit reguit van die prent af (of tik dit in die sakrekenaar in)."), graph,
      answerLabel: L(`${fn} ${angle}° = ${correct.text}, read off the graph.`, `${fn} ${angle}° = ${correct.text}, van die grafiek afgelees.`) });
}

const RECIP_ITEMS = [
  { prompt: L("tan θ = ?", "tan θ = ?"), correct: L("sin θ / cos θ", "sin θ / cos θ"), wrongs: [L("cos θ / sin θ", "cos θ / sin θ"), L("1 / sin θ", "1 / sin θ"), L("sin θ · cos θ", "sin θ · cos θ")], hint: L("tan is the ratio of sin to cos.", "tan is die verhouding van sin tot cos.") },
  { prompt: L("sec θ = 1 / ?", "sec θ = 1 / ?"), correct: L("cos θ", "cos θ"), wrongs: [L("sin θ", "sin θ"), L("tan θ", "tan θ")], hint: L("“Look at the 3rd letter” — se<b>c</b> → cos.", "“Kyk na die 3de letter”: se<b>c</b> → cos.") },
  { prompt: L("cosec θ = 1 / ?", "cosec θ = 1 / ?"), correct: L("sin θ", "sin θ"), wrongs: [L("cos θ", "cos θ"), L("tan θ", "tan θ")], hint: L("“Look at the 3rd letter” — co<b>s</b>ec → sin.", "“Kyk na die 3de letter”: co<b>s</b>ec → sin.") },
  { prompt: L("cot θ = 1 / ?", "cot θ = 1 / ?"), correct: L("tan θ", "tan θ"), wrongs: [L("sin θ", "sin θ"), L("cos θ", "cos θ")], hint: L("“Look at the 3rd letter” — co<b>t</b> → tan.", "“Kyk na die 3de letter”: co<b>t</b> → tan.") },
];

const MASK_ITEMS = [
  { prompt: L("sin²θ + cos²θ = ?", "sin²θ + cos²θ = ?"), correct: "1", wrongs: ["0", L("sin θ · cos θ", "sin θ · cos θ"), "2"], hint: L("The one identity that's true for every single θ.", "Die een identiteit wat vir elke enkele θ waar is."),
    sol: [
      { s: L("Take any point on the circle: sin θ = y/r and cos θ = x/r", "Neem enige punt op die sirkel: sin θ = y/r en cos θ = x/r") },
      { s: L("sin²θ + cos²θ = (y² + x²)/r², and x² + y² = r²", "sin²θ + cos²θ = (y² + x²)/r², en x² + y² = r²"), r: L("(pyth)", "(pyth)") },
      { s: L("So sin²θ + cos²θ = r²/r² = 1", "Dus sin²θ + cos²θ = r²/r² = 1"), r: L("true for every θ, which is why it is THE identity", "waar vir elke θ, daarom is dit DIE identiteit") },
    ] },
  { prompt: L("Which of these is a masked identity?", "Watter een hiervan is 'n gemaskerde identiteit?"), correct: L("cos²θ = 1 − sin²θ", "cos²θ = 1 − sin²θ"),
    wrongs: [L("tan²θ = 1 − sin²θ", "tan²θ = 1 − sin²θ"), L("sin²θ = 1 + cos²θ", "sin²θ = 1 + cos²θ"), L("sin²θ − cos²θ = 1", "sin²θ − cos²θ = 1")],
    hint: L("Rearrange sin²θ + cos²θ = 1 — swap one squared term for “1 minus the other”.", "Herrangskik sin²θ + cos²θ = 1: ruil een kwadraatterm vir “1 minus die ander”."),
    sol: [
      { s: L("Start from sin²θ + cos²θ = 1", "Begin by sin²θ + cos²θ = 1") },
      { s: L("Take sin²θ across to the other side: cos²θ = 1 − sin²θ", "Bring sin²θ oor na die ander kant: cos²θ = 1 − sin²θ"), r: L("the same identity wearing a mask", "dieselfde identiteit met 'n masker op") },
      { s: L("The two wrong-looking ones bring in tan, or turn the − into a +", "Die twee wat verkeerd lyk, bring tan in, of maak die − 'n +"), r: L("only one term ever moves, and it changes sign", "net een term skuif ooit, en dit verander van teken") },
    ] },
  { prompt: L("Which of these is a masked identity?", "Watter een hiervan is 'n gemaskerde identiteit?"), correct: L("sin²θ = 1 − cos²θ", "sin²θ = 1 − cos²θ"),
    wrongs: [L("tan²θ = 1 − cos²θ", "tan²θ = 1 − cos²θ"), L("cos²θ = 1 + sin²θ", "cos²θ = 1 + sin²θ"), L("cos²θ − sin²θ = 1", "cos²θ − sin²θ = 1")],
    hint: L("Rearrange sin²θ + cos²θ = 1 the other way round.", "Herrangskik sin²θ + cos²θ = 1 andersom."),
    sol: [
      { s: L("Start from sin²θ + cos²θ = 1", "Begin by sin²θ + cos²θ = 1") },
      { s: L("This time take cos²θ across: sin²θ = 1 − cos²θ", "Bring dié keer cos²θ oor: sin²θ = 1 − cos²θ"), r: L("the other mask of the same identity", "die ander masker van dieselfde identiteit") },
      { s: L("Crossing the = always flips the sign, so it is 1 MINUS the other one", "Oor die = draai die teken altyd om, dus is dit 1 MINUS die ander een"), r: L("never 1 + …", "nooit 1 + … nie") },
    ] },
  { prompt: L("1 − sin²θ = ?", "1 − sin²θ = ?"), correct: L("cos²θ", "cos²θ"), wrongs: [L("sin²θ", "sin²θ"), L("1 + cos²θ", "1 + cos²θ"), L("−cos²θ", "−cos²θ")],
    hint: L("A masked identity — swap it back to sin²θ + cos²θ = 1.", "'n Gemaskerde identiteit: ruil dit terug na sin²θ + cos²θ = 1."),
    sol: [
      { s: L("sin²θ + cos²θ = 1, so cos²θ = 1 − sin²θ", "sin²θ + cos²θ = 1, dus cos²θ = 1 − sin²θ") },
      { s: L("Read that backwards: wherever you see 1 − sin²θ you may write cos²θ", "Lees dit agterstevoor: waar jy ook al 1 − sin²θ sien, mag jy cos²θ skryf"), r: L("spotting the mask is the whole skill", "om die masker raak te sien, is die hele vaardigheid") },
    ] },
];

const SKILLS = {
  /* C2 — the two triangles first */
  triangles: () => {
    const it = pick(TRI_ITEMS);
    const wrongs = ALL_SIDES.filter(s => s !== it.correct);
    return reveal(
      mc(CON, it.prompt, it.correct, wrongs,
        { hint: L("Read the side straight across from the named angle.", "Lees die sy reg oorkant die genoemde hoek."), answerLabel: `${it.prompt.replace(/…$/, "")} ${it.correct}.`,
          solution: it.sol }),
      TRIANGLE_FRAMES);
  },

  /* C3 — Oats Are Healthy, built in her order */
  oahRead: () => {
    const rows = [L("O", "O"), L("A", "A"), L("H", "H")], cols = [30, 45, 60];
    const row = pick(rows), col = pick(cols);
    const correct = OAH_TABLE[row][col];
    const decoys = ALL_SIDES.filter(v => v !== correct);
    return reveal(
      mc(CON, L(`Read the table: the ${row} value for ${col}° is…`, `Lees die tabel: die ${row}-waarde vir ${col}° is…`), correct, decoys,
        { hint: L("Oats Are Healthy — O, A, H down the side; 30°, 45°, 60° across the top.", "Oats Are Healthy: O, A, H langs die kant af; 30°, 45°, 60° bo dwarsoor."), answerLabel: L(`${row} at ${col}° = ${correct}.`, `${row} by ${col}° = ${correct}.`) }),
      OAH_FRAMES, "replace");
  },

  /* C3 — pick the value (two slides drawing from the same 9 combos) */
  pickValue1: () => pickValueQ(),
  pickValue2: () => pickValueQ(),

  /* C4 — quadrantal angles, read off the graph */
  quadrantal: () => quadrantalQ(),

  /* C5/C6 — the tan identity + reciprocals */
  reciprocals: () => { const it = pick(RECIP_ITEMS); return mc(CON, it.prompt, it.correct, it.wrongs, { hint: it.hint, answerLabel: `${it.prompt.replace("?", "")}${it.correct}.` }); },

  /* C6 — masked identities */
  masked: () => { const it = pick(MASK_ITEMS); return mc(CON, it.prompt, it.correct, it.wrongs, { hint: it.hint, answerLabel: L(`${it.prompt.replace("?", "")}${it.correct} — a masked identity.`, `${it.prompt.replace("?", "")}${it.correct}: 'n gemaskerde identiteit.`), solution: it.sol }); },
};

export const questGt3 = {
  id: "gt3",
  stackFractions: true,
  // xpOnce REMOVED 2026-08-22 evening — her ruling: the questions rotate every
  // play, so the discovery rounds pay like any other round (full first time, 25% on replay).
  skills: Object.entries(SKILLS).map(([id, gen]) => ({ id, concept: CON, gen })),
};
