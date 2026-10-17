/* ============================================================
   GENERAL TRIG · gt6 — Reductions TIP Chips (revision round)
   ------------------------------------------------------------
   METHODS-trig.md Part F (p23–p25). A theory round — no `steps`
   chains here, just the five chips revised as mc/yesno picks plus
   two reveal cards (the three boxes; the "but why?" derivation).
   Keep her header "TIP Chips" as the round's words — never "tips".
   ============================================================ */
import { mc, ynQ, pick, randInt, quadAngle, argDeg } from "./_gtrig.js";
import { reduce, fmtDeg } from "../triglib.js";
import { L } from "../lang.js";

const CON = "gtrigTipChips";

function reveal(q, frames, mode) { q.reveal = frames; if (mode) q.revealMode = mode; return q; }
function revealAfter(q, frames) { q.revealAfter = frames; return q; }

/* ---- beat 1 — the three boxes, then "a negative angle turns…" ----
   The three boxes used to be printed FILLED IN above the two options, so
   "a negative angle turns…" answered itself (2026-09-04, build-report
   finding F1 — worst when the dice deals this beat on its own). The ask
   side now shows the three headings with their arrows empty, and the
   filled-in card comes back as the confirmation. */
function threeBoxes() {
  const box = (colour, name, fill) =>
    `<div><b style="color:var(--${colour})">${name}</b> → ${fill}</div>`;
  const boxes = fill => `<div style="font-size:14px;line-height:2">`
    + box("good", L("positive angles", "positiewe hoeke"), fill(L("anti-clockwise", "antikloksgewys")))
    + box("bad", L("negative angles", "negatiewe hoeke"), fill(L("clockwise", "kloksgewys")))
    + box("accent", L("co-functions", "ko-funksies"), fill(L("convert between sin and cos", "skakel om tussen sin en cos")))
    + `</div>`;
  const ask = L(`<div class="muted small" style="margin-bottom:6px">Three boxes decide every reduction:</div>`, `<div class="muted small" style="margin-bottom:6px">Drie blokkies besluit elke reduksie:</div>`)
    + boxes(() => `<span class="muted">?</span>`);
  return revealAfter(
    reveal(
      mc(CON, L("A negative angle turns…", "'n Negatiewe hoek draai…"), L("clockwise", "kloksgewys"), [L("anti-clockwise", "antikloksgewys")],
        { hint: L("Positive angles turn the way the quadrants are numbered — ① → ② → ③ → ④. A negative angle turns the other way.", "Positiewe hoeke draai soos die kwadrante genommer is: ① → ② → ③ → ④. 'n Negatiewe hoek draai die ander kant toe."),
          answerLabel: L("Negative angles turn clockwise; positive angles turn anti-clockwise.", "Negatiewe hoeke draai kloksgewys; positiewe hoeke draai antikloksgewys.") }),
      [ask]),
    [boxes(t => t)]);
}

/* ---- beat 2 — Chip ① : positive angles > 360°, minus 360° ---- */
function chip1() {
  const fn = pick([L("sin", "sin"), L("cos", "cos"), L("tan", "tan")]);
  const angle = randInt(76, 140) * 5;                 // 380..700
  const correct = `−360° → ${fn}${argDeg(angle - 360)}`;
  const wrongs = [`+360° → ${fn}${argDeg(angle + 360)}`, `−180° → ${fn}${argDeg(angle - 180)}`, L("no move needed", "geen stap nodig nie")];
  return mc(CON, L(`${fn} ${angle}° — first move?`, `${fn} ${angle}°: eerste stap?`), correct, wrongs,
    { hint: L("TIP Chip ① — positive angles > 360°: minus 360°.", "TIP Chip ① (positiewe hoeke > 360°): minus 360°."),
      answerLabel: L(`${fn} ${angle}° = ${fn}${argDeg(angle - 360)} — take off 360° first.`, `${fn} ${angle}° = ${fn}${argDeg(angle - 360)}: haal eers 360° af.`),
      solution: [
        { s: L(`${angle}° is past 360°, so the arm has gone more than one full turn round`, `${angle}° is verby 360°, dus het die arm meer as een volle draai gegee`), r: L("TIP Chip ① — positive angles > 360°", "TIP Chip ①: positiewe hoeke > 360°") },
        { s: L(`Take one turn off: ${angle}° − 360° = ${angle - 360}°`, `Haal een draai af: ${angle}° − 360° = ${angle - 360}°`), r: L("she writes [−360] above the angle, one per turn", "sy skryf [−360] bo die hoek, een per draai") },
        { s: `${fn} ${angle}° = ${fn}${argDeg(angle - 360)}`, r: L("same arm of the wheel, so the same value", "dieselfde arm van die wiel, dus dieselfde waarde") },
      ] });
}

/* ---- beat 3 — Chip ② : negative angles < −90°, add 360°; PLUS the
   F10 contrast (an angle in (−90°,0°) needs no rotation at all) ---- */
function chip2Mc() {
  const fn = pick([L("sin", "sin"), L("cos", "cos"), L("tan", "tan")]);
  const angle = -(randInt(19, 90) * 5);               // −95…−450
  const correct = `+360° → ${fn}${argDeg(angle + 360)}`;
  const wrongs = [`−360° → ${fn}${argDeg(angle - 360)}`, L("no move needed", "geen stap nodig nie"), `+180° → ${fn}${argDeg(angle + 180)}`];
  return mc(CON, L(`${fn}(${fmtDeg(angle)}) — first move?`, `${fn}(${fmtDeg(angle)}): eerste stap?`), correct, wrongs,
    { hint: L("TIP Chip ② — negative angles < −90°: add 360°.", "TIP Chip ② (negatiewe hoeke < −90°): tel 360° by."),
      answerLabel: L(`${fn}(${fmtDeg(angle)}) = ${fn}${argDeg(angle + 360)} — add 360° first.`, `${fn}(${fmtDeg(angle)}) = ${fn}${argDeg(angle + 360)}: tel eers 360° by.`),
      solution: [
        { s: L(`${fmtDeg(angle)} is below −90°, so it has swung clockwise past the bottom of the wheel`, `${fmtDeg(angle)} is onder −90°, dus het dit kloksgewys verby die onderkant van die wiel geswaai`), r: L("TIP Chip ② — negative angles &lt; −90°", "TIP Chip ②: negatiewe hoeke &lt; −90°") },
        { s: L(`Add one turn: ${fmtDeg(angle)} + 360° = ${fmtDeg(angle + 360)}`, `Tel een draai by: ${fmtDeg(angle)} + 360° = ${fmtDeg(angle + 360)}`), r: L("she writes [+360] above the angle", "sy skryf [+360] bo die hoek") },
        { s: `${fn}(${fmtDeg(angle)}) = ${fn}${argDeg(angle + 360)}`, r: L("a whole turn lands on the same arm", "'n hele draai land op dieselfde arm") },
      ] });
}
function chip2Yn() {
  const fn = pick([L("sin", "sin"), L("cos", "cos"), L("tan", "tan")]);
  const angle = -(randInt(1, 17) * 5);                // −5…−85, i.e. (−90°,0°)
  return ynQ(CON, L(`${fn}(${fmtDeg(angle)}): do you add 360° first?`, `${fn}(${fmtDeg(angle)}): tel jy eers 360° by?`), false,
    { hint: L("The −90° threshold is deliberate — an angle here is a C-angle straight off the wheel.", "Die −90°-drempel is doelbewus: 'n hoek hier is 'n C-hoek reguit van die wiel af."),
      answerLabel: L(`No — ${fmtDeg(angle)} is not below −90°, so it's read straight off the wheel, no rotation.`, `Nee: ${fmtDeg(angle)} is nie onder −90° nie, dus lees jy dit reguit van die wiel af, sonder draai.`),
      solution: [
        { s: L(`Check the threshold first: is ${fmtDeg(angle)} below −90°?`, `Toets eers die drempel: is ${fmtDeg(angle)} onder −90°?`), r: L("TIP Chip ② only fires below −90°", "TIP Chip ② werk net onder −90°") },
        { s: L(`${fmtDeg(angle)} sits between −90° and 0°, so it is NOT below the threshold`, `${fmtDeg(angle)} lê tussen −90° en 0°, dus is dit NIE onder die drempel nie`) },
        { s: L(`−θ is already a C form on the wheel, so it reduces straight away`, `−θ is reeds 'n C-vorm op die wiel, dus reduseer dit dadelik`), r: L("no rotation needed — adding 360° here just makes extra work", "geen draai nodig nie: om hier 360° by te tel, gee net ekstra werk") },
      ] });
}
const chip2Pool = () => pick([chip2Mc, chip2Yn])();

/* ---- beat 4 — Chip ③ : squaring — block brackets kill the minus ---- */
function chip3() {
  const fn = pick([L("sin", "sin"), L("cos", "cos")]);
  const quad = pick([3, 4]);
  const angle = quadAngle(quad);
  const r = reduce(fn, angle);
  const correct = L(`[${r.sign < 0 ? "−" : ""}${fn} ${r.ref}°]² = ${fn}²${r.ref}°, positive`, `[${r.sign < 0 ? "−" : ""}${fn} ${r.ref}°]² = ${fn}²${r.ref}°, positief`);
  const wrongs = [
    `−${fn}²${r.ref}°`,
    `${fn}²(−${r.ref}°)`,
    `[${fn} ${angle}°]² = ${fn}²${angle}°`,
  ];
  const split = quad === 3 ? `180 + ${r.ref}` : `360 − ${r.ref}`;
  const qname = quad === 3 ? L("T (only tan is positive)", "T (net tan is positief)") : L("C (only cos is positive)", "C (net cos is positief)");
  return mc(CON, `${fn}²${angle}° = ?`, correct, wrongs,
    { hint: L("TIP Chip ③ — reduce INSIDE block brackets first, then square: the minus dies.", "TIP Chip ③: reduseer EERS binne blokhakies, kwadreer dan: die minus sterf."),
      answerLabel: L(`${correct} — reduce first, then square; the sign disappears.`, `${correct}: reduseer eers, kwadreer dan; die teken verdwyn.`),
      solution: [
        { s: L(`Split the angle above the line: ${angle}° = ${split}`, `Verdeel die hoek bo die lyn: ${angle}° = ${split}`), r: L(`that lands in quadrant ${qname}`, `dit land in kwadrant ${qname}`) },
        { s: L(`Reduce inside block brackets: ${fn} ${angle}° = ${r.sign < 0 ? "−" : ""}${fn} ${r.ref}°`, `Reduseer binne blokhakies: ${fn} ${angle}° = ${r.sign < 0 ? "−" : ""}${fn} ${r.ref}°`), r: L(`${fn} is ${r.sign < 0 ? "negative" : "positive"} there`, `${fn} is daar ${r.sign < 0 ? "negatief" : "positief"}`) },
        { s: L(`Now square the bracket: [${r.sign < 0 ? "−" : ""}${fn} ${r.ref}°]² = ${fn}²${r.ref}°`, `Kwadreer nou die hakie: [${r.sign < 0 ? "−" : ""}${fn} ${r.ref}°]² = ${fn}²${r.ref}°`), r: L("(−x)² = +x², so the minus dies — that is the whole chip", "(−x)² = +x², dus sterf die minus: dit is die hele chip") },
      ] });
}

/* ---- beat 5 — Chip ④ : THE co-functions trap ---- */
function chip4trap() {
  const letter = pick([L("θ", "θ"), L("x", "x")]);
  return mc(CON, L(`cos(90° + ${letter}) = ?`, `cos(90° + ${letter}) = ?`), L(`−sin ${letter}`, `−sin ${letter}`), [L(`+sin ${letter}`, `+sin ${letter}`), L(`−cos ${letter}`, `−cos ${letter}`), L(`+cos ${letter}`, `+cos ${letter}`)],
    { hint: L("TIP Chip ④ — the co-functions trap.", "TIP Chip ④: die ko-funksie-slaggat."),
      answerLabel: L(`cos(90° + ${letter}) = −sin ${letter} — 90° + ${letter} is quadrant S, and cosine isn't sine.`, `cos(90° + ${letter}) = −sin ${letter}: 90° + ${letter} is kwadrant S, en cos is nie sin nie.`),
      solution: [
        { s: L(`90° + ${letter} is an S angle`, `90° + ${letter} is 'n S-hoek`), r: L("quadrant ②, where only sin is positive", "kwadrant ②, waar net sin positief is") },
        { s: L(`cos is not sine, so in S it comes out negative`, `cos is nie sin nie, dus is dit in S negatief`) },
        { s: L(`A 90° form also swaps the ratio: cos becomes sin`, `'n 90°-vorm ruil ook die verhouding om: cos word sin`), r: L(`∴ cos(90° + ${letter}) = −sin ${letter}`, `∴ cos(90° + ${letter}) = −sin ${letter}`) },
      ] });
}

/* ---- beat 6 — Chip ⑤ : co-functions with negative angles (pool) ---- */
function chip5Sin() {
  const letter = pick([L("θ", "θ"), L("x", "x")]);
  return mc(CON, L(`sin(${letter} − 90°) = ?`, `sin(${letter} − 90°) = ?`), L(`−cos ${letter}`, `−cos ${letter}`), [L(`+cos ${letter}`, `+cos ${letter}`), L(`−sin ${letter}`, `−sin ${letter}`), L(`+sin ${letter}`, `+sin ${letter}`)],
    { hint: L("TIP Chip ⑤ — co-functions with negative angles.", "TIP Chip ⑤: ko-funksies met negatiewe hoeke."), answerLabel: L(`sin(${letter} − 90°) = −cos ${letter}.`, `sin(${letter} − 90°) = −cos ${letter}.`),
      solution: [
        { s: L(`sin(${letter} − 90°) = sin[−(90° − ${letter})]`, `sin(${letter} − 90°) = sin[−(90° − ${letter})]`), r: L("take the minus outside", "haal die minus uit") },
        { s: L(`let K = 90° − ${letter}, so this is sin(−K)`, `stel K = 90° − ${letter}, dus is dit sin(−K)`), r: L("−K is a IV-quadrant angle", "−K is 'n hoek in kwadrant IV") },
        { s: L(`In IV cos survives and sin flips: sin(−K) = −sin K = −sin(90° − ${letter})`, `In IV oorleef cos en sin draai om: sin(−K) = −sin K = −sin(90° − ${letter})`) },
        { s: L(`90° − ${letter} is an A angle and swaps the ratio: sin(90° − ${letter}) = cos ${letter}`, `90° − ${letter} is 'n A-hoek en ruil die verhouding om: sin(90° − ${letter}) = cos ${letter}`), r: L(`∴ sin(${letter} − 90°) = −cos ${letter}`, `∴ sin(${letter} − 90°) = −cos ${letter}`) },
      ] });
}
function chip5Cos() {
  const letter = pick([L("θ", "θ"), L("x", "x")]);
  return mc(CON, L(`cos(${letter} − 90°) = ?`, `cos(${letter} − 90°) = ?`), L(`sin ${letter}`, `sin ${letter}`), [L(`−sin ${letter}`, `−sin ${letter}`), L(`cos ${letter}`, `cos ${letter}`), L(`−cos ${letter}`, `−cos ${letter}`)],
    { hint: L("TIP Chip ⑤ — co-functions with negative angles.", "TIP Chip ⑤: ko-funksies met negatiewe hoeke."), answerLabel: L(`cos(${letter} − 90°) = sin ${letter}.`, `cos(${letter} − 90°) = sin ${letter}.`),
      solution: [
        { s: L(`cos(${letter} − 90°) = cos[−(90° − ${letter})]`, `cos(${letter} − 90°) = cos[−(90° − ${letter})]`), r: L("take the minus outside", "haal die minus uit") },
        { s: L(`let K = 90° − ${letter}, so this is cos(−K)`, `stel K = 90° − ${letter}, dus is dit cos(−K)`), r: L("−K is a IV-quadrant angle", "−K is 'n hoek in kwadrant IV") },
        { s: L(`In IV cos survives, so cos(−K) = cos K = cos(90° − ${letter})`, `In IV oorleef cos, dus cos(−K) = cos K = cos(90° − ${letter})`), r: L("no minus this time", "dié keer geen minus nie") },
        { s: L(`90° − ${letter} is an A angle and swaps the ratio: cos(90° − ${letter}) = sin ${letter}`, `90° − ${letter} is 'n A-hoek en ruil die verhouding om: cos(90° − ${letter}) = sin ${letter}`), r: L(`∴ cos(${letter} − 90°) = sin ${letter}`, `∴ cos(${letter} − 90°) = sin ${letter}`) },
      ] });
}
const chip5Pool = () => pick([chip5Sin, chip5Cos])();

/* ---- beat 7 — "but why?" — the K derivation behind Chip ⑤ ----
   Same F1 shape as threeBoxes above (2026-09-04, her word): the full
   derivation used to sit ABOVE the true/false, and its "in quadrant IV
   … −sin K" lines ARE the answer. The ask side now stops right at the
   pivot the question asks about; the finished derivation comes back as
   the confirmation (q.revealAfter). */
function butWhy() {
  const askFrame = L(`<div style="font-size:13.5px;line-height:1.7">
      <b>but why?</b><br>
      sin(θ − 90°) = sin[−(90° − θ)]<br>
      let K = 90° − θ<br>
      = sin(−K) — and −K sits in quadrant IV…<br>
      = ?
    </div>`, `<div style="font-size:13.5px;line-height:1.7">
      <b>maar hoekom?</b><br>
      sin(θ − 90°) = sin[−(90° − θ)]<br>
      stel K = 90° − θ<br>
      = sin(−K), en −K lê in kwadrant IV…<br>
      = ?
    </div>`);
  const frame = L(`<div style="font-size:13.5px;line-height:1.7">
      <b>but why?</b><br>
      sin(θ − 90°) = sin[−(90° − θ)]<br>
      let K = 90° − θ<br>
      = sin(−K) — in quadrant IV<br>
      = −sin K = −sin(90° − θ) = −cos θ
    </div>`, `<div style="font-size:13.5px;line-height:1.7">
      <b>maar hoekom?</b><br>
      sin(θ − 90°) = sin[−(90° − θ)]<br>
      stel K = 90° − θ<br>
      = sin(−K): in kwadrant IV<br>
      = −sin K = −sin(90° − θ) = −cos θ
    </div>`);
  return revealAfter(
    reveal(
      ynQ(CON, L("In quadrant IV, cos survives and sin flips. True or false?", "In kwadrant IV oorleef cos en sin draai om. Waar of onwaar?"), true,
        { hint: L("That's the pivot of the whole derivation — −K sits in quadrant IV.", "Dit is die spil van die hele afleiding: −K lê in kwadrant IV."),
          answerLabel: L("True — that's why sin(θ − 90°) ends up as −cos θ.", "Waar: daarom word sin(θ − 90°) uiteindelik −cos θ.") }),
      [askFrame]),
    [frame]);
}

const SKILLS = { threeBoxes, chip1, chip2Pool, chip3, chip4trap, chip5Pool, butWhy };

export const questGt6 = {
  id: "gt6",
  stackFractions: true,
  skills: Object.entries(SKILLS).map(([id, gen]) => ({ id, concept: CON, gen })),
};
