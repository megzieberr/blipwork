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
      answerLabel: `${fn} ${angle}° = ${fn}${argDeg(angle - 360)} — take off 360° first.` });
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
      answerLabel: `${fn}(${fmtDeg(angle)}) = ${fn}${argDeg(angle + 360)} — add 360° first.` });
}
function chip2Yn() {
  const fn = pick(["sin", "cos", "tan"]);
  const angle = -(randInt(1, 17) * 5);                // −5…−85, i.e. (−90°,0°)
  return ynQ(CON, `${fn}(${fmtDeg(angle)}): do you add 360° first?`, false,
    { hint: "The −90° threshold is deliberate — an angle here is a C-angle straight off the wheel.",
      answerLabel: `No — ${fmtDeg(angle)} is not below −90°, so it's read straight off the wheel, no rotation.` });
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
  return mc(CON, `${fn}²${angle}° = ?`, correct, wrongs,
    { hint: "TIP Chip ③ — reduce INSIDE block brackets first, then square: the minus dies.",
      answerLabel: `${correct} — reduce first, then square; the sign disappears.` });
}

/* ---- beat 5 — Chip ④ : THE co-functions trap ---- */
function chip4trap() {
  const letter = pick(["θ", "x"]);
  return mc(CON, `cos(90° + ${letter}) = ?`, `−sin ${letter}`, [`+sin ${letter}`, `−cos ${letter}`, `+cos ${letter}`],
    { hint: "TIP Chip ④ — the co-functions trap.",
      answerLabel: `cos(90° + ${letter}) = −sin ${letter} — 90° + ${letter} is quadrant S, and cosine isn't sine.` });
}

/* ---- beat 6 — Chip ⑤ : co-functions with negative angles (pool) ---- */
function chip5Sin() {
  const letter = pick(["θ", "x"]);
  return mc(CON, `sin(${letter} − 90°) = ?`, `−cos ${letter}`, [`+cos ${letter}`, `−sin ${letter}`, `+sin ${letter}`],
    { hint: "TIP Chip ⑤ — co-functions with negative angles.", answerLabel: `sin(${letter} − 90°) = −cos ${letter}.` });
}
function chip5Cos() {
  const letter = pick(["θ", "x"]);
  return mc(CON, `cos(${letter} − 90°) = ?`, `sin ${letter}`, [`−sin ${letter}`, `cos ${letter}`, `−cos ${letter}`],
    { hint: "TIP Chip ⑤ — co-functions with negative angles.", answerLabel: `cos(${letter} − 90°) = sin ${letter}.` });
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
