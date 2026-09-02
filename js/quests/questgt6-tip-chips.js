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

const CON = "gtrigTipChips";

function reveal(q, frames, mode) { q.reveal = frames; if (mode) q.revealMode = mode; return q; }

/* ---- beat 1 — the three boxes, then "a negative angle turns…" ---- */
function threeBoxes() {
  const frame = `<div style="font-size:14px;line-height:2">
      <div><b style="color:var(--good)">positive angles</b> → anti-clockwise</div>
      <div><b style="color:var(--bad)">negative angles</b> → clockwise</div>
      <div><b style="color:var(--accent)">co-functions</b> → convert between sin and cos</div>
    </div>`;
  return reveal(
    mc(CON, "A negative angle turns…", "clockwise", ["anti-clockwise"],
      { hint: "Positive = anti-clockwise. Negative = clockwise.",
        answerLabel: "Negative angles turn clockwise; positive angles turn anti-clockwise." }),
    [frame]);
}

/* ---- beat 2 — Chip ① : positive angles > 360°, minus 360° ---- */
function chip1() {
  const fn = pick(["sin", "cos", "tan"]);
  const angle = randInt(76, 140) * 5;                 // 380..700
  const correct = `−360° → ${fn}${argDeg(angle - 360)}`;
  const wrongs = [`+360° → ${fn}${argDeg(angle + 360)}`, `−180° → ${fn}${argDeg(angle - 180)}`, "no move needed"];
  return mc(CON, `${fn} ${angle}° — first move?`, correct, wrongs,
    { hint: "TIP Chip ① — positive angles > 360°: minus 360°.",
      answerLabel: `${fn} ${angle}° = ${fn}${argDeg(angle - 360)} — take off 360° first.`,
      solution: [
        { s: `${angle}° is past 360°, so the arm has gone more than one full turn round`, r: "TIP Chip ① — positive angles > 360°" },
        { s: `Take one turn off: ${angle}° − 360° = ${angle - 360}°`, r: "she writes [−360] above the angle, one per turn" },
        { s: `${fn} ${angle}° = ${fn}${argDeg(angle - 360)}`, r: "same arm of the wheel, so the same value" },
      ] });
}

/* ---- beat 3 — Chip ② : negative angles < −90°, add 360°; PLUS the
   F10 contrast (an angle in (−90°,0°) needs no rotation at all) ---- */
function chip2Mc() {
  const fn = pick(["sin", "cos", "tan"]);
  const angle = -(randInt(19, 90) * 5);               // −95…−450
  const correct = `+360° → ${fn}${argDeg(angle + 360)}`;
  const wrongs = [`−360° → ${fn}${argDeg(angle - 360)}`, "no move needed", `+180° → ${fn}${argDeg(angle + 180)}`];
  return mc(CON, `${fn}(${fmtDeg(angle)}) — first move?`, correct, wrongs,
    { hint: "TIP Chip ② — negative angles < −90°: add 360°.",
      answerLabel: `${fn}(${fmtDeg(angle)}) = ${fn}${argDeg(angle + 360)} — add 360° first.`,
      solution: [
        { s: `${fmtDeg(angle)} is below −90°, so it has swung clockwise past the bottom of the wheel`, r: "TIP Chip ② — negative angles &lt; −90°" },
        { s: `Add one turn: ${fmtDeg(angle)} + 360° = ${fmtDeg(angle + 360)}`, r: "she writes [+360] above the angle" },
        { s: `${fn}(${fmtDeg(angle)}) = ${fn}${argDeg(angle + 360)}`, r: "a whole turn lands on the same arm" },
      ] });
}
function chip2Yn() {
  const fn = pick(["sin", "cos", "tan"]);
  const angle = -(randInt(1, 17) * 5);                // −5…−85, i.e. (−90°,0°)
  return ynQ(CON, `${fn}(${fmtDeg(angle)}): do you add 360° first?`, false,
    { hint: "The −90° threshold is deliberate — an angle here is a C-angle straight off the wheel.",
      answerLabel: `No — ${fmtDeg(angle)} is not below −90°, so it's read straight off the wheel, no rotation.`,
      solution: [
        { s: `Check the threshold first: is ${fmtDeg(angle)} below −90°?`, r: "TIP Chip ② only fires below −90°" },
        { s: `${fmtDeg(angle)} sits between −90° and 0°, so it is NOT below the threshold` },
        { s: `−θ is already a C form on the wheel, so it reduces straight away`, r: "no rotation needed — adding 360° here just makes extra work" },
      ] });
}
const chip2Pool = () => pick([chip2Mc, chip2Yn])();

/* ---- beat 4 — Chip ③ : squaring — block brackets kill the minus ---- */
function chip3() {
  const fn = pick(["sin", "cos"]);
  const quad = pick([3, 4]);
  const angle = quadAngle(quad);
  const r = reduce(fn, angle);
  const correct = `[${r.sign < 0 ? "−" : ""}${fn} ${r.ref}°]² = ${fn}²${r.ref}°, positive`;
  const wrongs = [
    `−${fn}²${r.ref}°`,
    `${fn}²(−${r.ref}°)`,
    `[${fn} ${angle}°]² = ${fn}²${angle}°`,
  ];
  const split = quad === 3 ? `180 + ${r.ref}` : `360 − ${r.ref}`;
  const qname = quad === 3 ? "T (only tan is positive)" : "C (only cos is positive)";
  return mc(CON, `${fn}²${angle}° = ?`, correct, wrongs,
    { hint: "TIP Chip ③ — reduce INSIDE block brackets first, then square: the minus dies.",
      answerLabel: `${correct} — reduce first, then square; the sign disappears.`,
      solution: [
        { s: `Split the angle above the line: ${angle}° = ${split}`, r: `that lands in quadrant ${qname}` },
        { s: `Reduce inside block brackets: ${fn} ${angle}° = ${r.sign < 0 ? "−" : ""}${fn} ${r.ref}°`, r: `${fn} is ${r.sign < 0 ? "negative" : "positive"} there` },
        { s: `Now square the bracket: [${r.sign < 0 ? "−" : ""}${fn} ${r.ref}°]² = ${fn}²${r.ref}°`, r: "(−x)² = +x², so the minus dies — that is the whole chip" },
      ] });
}

/* ---- beat 5 — Chip ④ : THE co-functions trap ---- */
function chip4trap() {
  const letter = pick(["θ", "x"]);
  return mc(CON, `cos(90° + ${letter}) = ?`, `−sin ${letter}`, [`+sin ${letter}`, `−cos ${letter}`, `+cos ${letter}`],
    { hint: "TIP Chip ④ — the co-functions trap.",
      answerLabel: `cos(90° + ${letter}) = −sin ${letter} — 90° + ${letter} is quadrant S, and cosine isn't sine.`,
      solution: [
        { s: `90° + ${letter} is an S angle`, r: "quadrant ②, where only sin is positive" },
        { s: `cos is not sine, so in S it comes out negative` },
        { s: `A 90° form also swaps the ratio: cos becomes sin`, r: `∴ cos(90° + ${letter}) = −sin ${letter}` },
      ] });
}

/* ---- beat 6 — Chip ⑤ : co-functions with negative angles (pool) ---- */
function chip5Sin() {
  const letter = pick(["θ", "x"]);
  return mc(CON, `sin(${letter} − 90°) = ?`, `−cos ${letter}`, [`+cos ${letter}`, `−sin ${letter}`, `+sin ${letter}`],
    { hint: "TIP Chip ⑤ — co-functions with negative angles.", answerLabel: `sin(${letter} − 90°) = −cos ${letter}.`,
      solution: [
        { s: `sin(${letter} − 90°) = sin[−(90° − ${letter})]`, r: "take the minus outside" },
        { s: `let K = 90° − ${letter}, so this is sin(−K)`, r: "−K is a IV-quadrant angle" },
        { s: `In IV cos survives and sin flips: sin(−K) = −sin K = −sin(90° − ${letter})` },
        { s: `90° − ${letter} is an A angle and swaps the ratio: sin(90° − ${letter}) = cos ${letter}`, r: `∴ sin(${letter} − 90°) = −cos ${letter}` },
      ] });
}
function chip5Cos() {
  const letter = pick(["θ", "x"]);
  return mc(CON, `cos(${letter} − 90°) = ?`, `sin ${letter}`, [`−sin ${letter}`, `cos ${letter}`, `−cos ${letter}`],
    { hint: "TIP Chip ⑤ — co-functions with negative angles.", answerLabel: `cos(${letter} − 90°) = sin ${letter}.`,
      solution: [
        { s: `cos(${letter} − 90°) = cos[−(90° − ${letter})]`, r: "take the minus outside" },
        { s: `let K = 90° − ${letter}, so this is cos(−K)`, r: "−K is a IV-quadrant angle" },
        { s: `In IV cos survives, so cos(−K) = cos K = cos(90° − ${letter})`, r: "no minus this time" },
        { s: `90° − ${letter} is an A angle and swaps the ratio: cos(90° − ${letter}) = sin ${letter}`, r: `∴ cos(${letter} − 90°) = sin ${letter}` },
      ] });
}
const chip5Pool = () => pick([chip5Sin, chip5Cos])();

/* ---- beat 7 — "but why?" — the K derivation behind Chip ⑤ ---- */
function butWhy() {
  const frame = `<div style="font-size:13.5px;line-height:1.7">
      <b>but why?</b><br>
      sin(θ − 90°) = sin[−(90° − θ)]<br>
      let K = 90° − θ<br>
      = sin(−K) — in quadrant IV<br>
      = −sin K = −sin(90° − θ) = −cos θ
    </div>`;
  return reveal(
    ynQ(CON, "In quadrant IV, cos survives and sin flips. True or false?", true,
      { hint: "That's the pivot of the whole derivation — −K sits in quadrant IV.",
        answerLabel: "True — that's why sin(θ − 90°) ends up as −cos θ." }),
    [frame]);
}

const SKILLS = { threeBoxes, chip1, chip2Pool, chip3, chip4trap, chip5Pool, butWhy };

export const questGt6 = {
  id: "gt6",
  stackFractions: true,
  skills: Object.entries(SKILLS).map(([id, gen]) => ({ id, concept: CON, gen })),
};
