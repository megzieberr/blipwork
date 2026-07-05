/* ============================================================
   ANALYTICAL GEOMETRY · Q5 — Perpendicular bisector  ★★ TRAP
   ------------------------------------------------------------
   A perpendicular bisector must do TWO things: pass through the
   midpoint of the segment AND meet it at a right angle. Spot it,
   tap it, and know its gradient is the negative reciprocal.
   ============================================================ */
import { mc } from "./_shared.js";
import { yesnoQ, bisectorCandidate, winFor, letterLines, layoutPointLabels, AG } from "./_analytical.js";
import { midpoint, gradFracOf, gradFrac, randSegment, ptStr, C, neg, pick } from "../analyticslib.js";

const ACC = AG[4];

/* the perpendicular gradient of AB as a fraction string */
function perpStr(A, B) {
  const dy = B.y - A.y, dx = B.x - A.x;       // m_AB = dy/dx → perp = −dx/dy
  return gradFrac(-dx, dy).str;
}

const SKILLS = {
  /* the definition — both conditions */
  definition: () => {
    return mc("perpBisector",
      "A <b>perpendicular bisector</b> of AB must…",
      "pass through the midpoint of AB AND be perpendicular to AB",
      ["pass through the midpoint only", "be perpendicular to AB only", "pass through A and through B"],
      { hint: "Two jobs at once: cut AB exactly in half, AND cross it at 90°.",
        answerLabel: "Through the midpoint AND perpendicular." });
  },

  /* judge a single candidate by eye (to scale, no helper marks) */
  isIt: () => {
    const { A, B } = randSegment(-5, 5, 4);
    const throughMid = pick([true, false]), perpendicular = pick([true, false]);
    const d = bisectorCandidate(A, B, { accent: ACC, throughMid, perpendicular, marks: false });
    const why = d.isBisector ? "" :
      !throughMid && !perpendicular ? "it misses the midpoint and isn’t at 90°" :
      !throughMid ? "it doesn’t pass through the midpoint" : "it isn’t perpendicular to AB";
    return yesnoQ("perpBisector",
      "Is the orange line the <b>perpendicular bisector</b> of AB?", d.isBisector,
      { graph: d.spec,
        hint: "Check BOTH: does it cut AB in half, and does it cross at a right angle?",
        answerLabel: d.isBisector ? "Yes — through the midpoint and at 90°." : `No — ${why}.` });
  },

  /* its gradient is the negative reciprocal of AB */
  gradientOf: () => {
    let A, B;
    // skip horizontal, vertical AND |m| = 1 — for m = ±1 the "kept the sign" /
    // "didn't switch" decoys collapse into the answer, leaving 2 buttons
    do { ({ A, B } = randSegment(-5, 5, 4)); }
    while (B.y - A.y === 0 || B.x - A.x === 0 || Math.abs(B.y - A.y) === Math.abs(B.x - A.x));
    const correct = perpStr(A, B);
    const mab = gradFracOf(A, B).str;
    return mc("perpBisector",
      `AB has gradient <b>${mab}</b>. The <b>perpendicular bisector</b> of AB has gradient…`,
      correct, [mab, gradFrac(B.y - A.y, A.x - B.x).str, gradFrac(B.x - A.x, B.y - A.y).str],
      { graph: layoutPointLabels({ type: "analytic", accent: ACC, grid: true, win: winFor([A, B]), segs: [{ a: A, b: B }],
          points: [{ x: A.x, y: A.y, label: "A", place: "auto" }, { x: B.x, y: B.y, label: "B", place: "auto" }] }),
        hint: "It is perpendicular to AB → use the negative reciprocal of AB’s gradient.",
        answerLabel: `Gradient = ${correct} (negative reciprocal of ${mab}).` });
  },

  /* find the midpoint it must pass through (formula → substitute → simplify) */
  findMidpoint: () => {
    let A, B, M, wrongs;
    do {
      ({ A, B } = randSegment(-5, 5, 4));
      M = midpoint(A, B);
      wrongs = [
        ptStr({ x: (B.x - A.x) / 2, y: (B.y - A.y) / 2 }),   // subtracted instead of added
        ptStr({ x: A.x + B.x, y: A.y + B.y }),               // forgot the ÷2
        ptStr({ x: M.y, y: M.x }),                           // swapped x and y
      ];
    } while (new Set([ptStr(M), ...wrongs]).size < 4);       // all four buttons distinct
    const wrap = (v) => (v < 0 ? `(${neg(C(v))})` : C(v));
    return mc("perpBisector",
      `A${ptStr(A)} and B${ptStr(B)}. The perpendicular bisector of AB passes through the midpoint M. Find <b>M</b>.`,
      ptStr(M), wrongs,
      { graph: layoutPointLabels({ type: "analytic", accent: ACC, grid: true, win: winFor([A, B], { pad: 2 }),
          segs: [{ a: A, b: B }],
          points: [{ x: A.x, y: A.y, label: `A${ptStr(A)}`, place: "auto" }, { x: B.x, y: B.y, label: `B${ptStr(B)}`, place: "auto" }] }),
        hint: "Midpoint = the AVERAGE of the two x’s and the two y’s: add them, then divide by 2.",
        answerLabel: `M = ${ptStr(M)}.`,
        solution: [
          { s: "M = ( (x<sub>A</sub> + x<sub>B</sub>)/2 ; (y<sub>A</sub> + y<sub>B</sub>)/2 )" },
          { s: `= ( (${neg(C(A.x))} + ${wrap(B.x)})/2 ; (${neg(C(A.y))} + ${wrap(B.y)})/2 )` },
          { s: `= ${ptStr(M)}` },
        ] });
  },

  /* which point it passes through */
  passesThrough: () => {
    let A, B, M;
    // the bisector is the set of points equidistant from A and B — if the
    // origin happens to be equidistant too (OA = OB), the "origin" decoy
    // would ALSO be a correct answer, so regenerate those cases away
    do { ({ A, B } = randSegment(-5, 5, 4)); M = midpoint(A, B); }
    while (A.x * A.x + A.y * A.y === B.x * B.x + B.y * B.y);
    return mc("perpBisector",
      `The perpendicular bisector of AB passes through which point?`,
      `the midpoint M${ptStr(M)}`,
      [`A${ptStr(A)}`, `B${ptStr(B)}`, "the origin O(0 ; 0)"],
      { graph: layoutPointLabels({ type: "analytic", accent: ACC, grid: true, win: winFor([A, B]),
          segs: [{ a: A, b: B }], ticks: [{ a: A, b: M, n: 1 }, { a: M, b: B, n: 1 }],
          points: [{ x: A.x, y: A.y, label: "A", place: "auto" }, { x: B.x, y: B.y, label: "B", place: "auto" }, { x: M.x, y: M.y, label: "M", place: "below" }] }),
        hint: "‘Bisector’ → it goes through the midpoint M.",
        answerLabel: `Through the midpoint M${ptStr(M)}.` });
  },

  /* which candidate line is the perpendicular bisector (pick line 1 or 2) */
  whichBisector: () => {
    const { A, B } = randSegment(-4, 4, 4);
    const M = midpoint(A, B);
    const d = { x: B.x - A.x, y: B.y - A.y };
    const u = (v) => { const l = Math.hypot(v.x, v.y) || 1; return { x: v.x / l, y: v.y / l }; };
    const perpDir = u({ x: -d.y, y: d.x });
    const skewDir = u({ x: -d.y + d.x * 0.8, y: d.x + d.y * 0.8 });
    const L = 3;
    // candidate: true perpendicular bisector (through M, perpendicular)
    const pb = { a: { x: M.x - perpDir.x * L, y: M.y - perpDir.y * L }, b: { x: M.x + perpDir.x * L, y: M.y + perpDir.y * L }, kind: "line", id: "pb", tone: "b", perp: 0 };
    // candidate: through M but NOT perpendicular (a decoy bisector)
    const decoy = { a: { x: M.x - skewDir.x * L, y: M.y - skewDir.y * L }, b: { x: M.x + skewDir.x * L, y: M.y + skewDir.y * L }, kind: "line", id: "skew", tone: "c" };
    const letter = letterLines([pb, decoy], ["1", "2"]);   // "1"/"2" so they don't clash with points A, B
    const graph = layoutPointLabels({
      type: "analytic", accent: ACC, grid: true,
      win: winFor([A, B, pb.a, pb.b, decoy.a, decoy.b], { min: 9 }),
      segs: [{ a: A, b: B, id: "AB", tone: "a" }, pb, decoy],
      points: [{ x: A.x, y: A.y, label: "A", place: "auto" }, { x: B.x, y: B.y, label: "B", place: "auto" }],
    });
    return mc("perpBisector",
      "Both lines <b>1</b> and <b>2</b> cut AB in half. Which one is the <b>perpendicular bisector</b>?",
      `Line ${letter.pb}`, [`Line ${letter.skew}`],
      { graph,
        hint: "The perpendicular bisector also crosses AB at a right angle (90°).",
        answerLabel: `Line ${letter.pb} — the one that meets AB at 90°.` });
  },

  /* the equidistant property */
  equidistant: () => {
    return mc("perpBisector",
      "Every point on the perpendicular bisector of AB is…",
      "the same distance from A as from B",
      ["closer to A than to B", "on the line AB", "the midpoint of AB"],
      { hint: "That’s the whole point of it — it’s the set of points equidistant from A and B.",
        answerLabel: "Equally far from A and from B." });
  },
};

export const questAg5 = {
  id: "ag5",
  skills: Object.entries(SKILLS).map(([id, gen]) => ({ id, concept: "perpBisector", gen })),
};
