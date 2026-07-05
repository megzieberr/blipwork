/* ============================================================
   ANALYTICAL GEOMETRY · Q1 — Which formula, and what it tells you
   ------------------------------------------------------------
   The formula-sheet round: match the job (length / midpoint /
   slope) to the right formula, and know what each answer LOOKS
   like (a length, a coordinate, or a slope number). No working —
   just choosing the tool. Diagram-backed where it helps.
   ============================================================ */
import { mc } from "./_shared.js";
import { winFor, layoutPointLabels, AG } from "./_analytical.js";
import { randSegment, randPoint, distance, ptStr, pick } from "../analyticslib.js";

const ACC = AG[0];

/* the three formula strings, written as the formula sheet writes them */
const F = {
  distance: "AB = √[(x<sub>B</sub> − x<sub>A</sub>)² + (y<sub>B</sub> − y<sub>A</sub>)²]",
  midpoint: "M = ( (x<sub>A</sub> + x<sub>B</sub>)/2 ; (y<sub>A</sub> + y<sub>B</sub>)/2 )",
  gradient: "m = (y<sub>B</sub> − y<sub>A</sub>) / (x<sub>B</sub> − x<sub>A</sub>)",
};

function segDiagram(A, B) {
  // pad 2: the full coordinate labels are ~2 units wide, so they need room
  // inside the frame; layoutPointLabels then picks a side clear of the segment.
  return layoutPointLabels({
    type: "analytic", accent: ACC, grid: true, win: winFor([A, B], { pad: 2 }),
    segs: [{ a: A, b: B }],
    points: [{ x: A.x, y: A.y, label: `A${ptStr(A)}`, place: "auto" }, { x: B.x, y: B.y, label: `B${ptStr(B)}`, place: "auto" }],
  });
}

const SKILLS = {
  /* job → which formula */
  whichFormula: () => {
    const { A, B } = randSegment();
    const jobs = [
      { q: "the <b>length</b> of line AB", key: "distance" },
      { q: "the <b>midpoint</b> of AB", key: "midpoint" },
      { q: "the <b>gradient</b> (slope) of AB", key: "gradient" },
    ];
    const j = pick(jobs);
    const wrongs = Object.keys(F).filter((k) => k !== j.key).map((k) => F[k]);
    return mc("whichFormula", `Which formula would you use to find ${j.q}?`,
      F[j.key], wrongs,
      { graph: segDiagram(A, B),
        hint: "Length → distance. Halfway point → midpoint. Steepness → gradient.",
        answerLabel: `Use the ${j.key} formula.` });
  },

  /* what the answer looks like */
  answerLooks: () => {
    const cases = [
      { p: "The <b>distance</b> between two points is…", c: "a length — one positive number (in units)", w: ["a coordinate (x ; y)", "an angle in degrees"] },
      { p: "The <b>midpoint</b> of a segment is…", c: "a coordinate (x ; y)", w: ["a single length", "a gradient (a slope number)"] },
      { p: "A <b>gradient</b> is…", c: "a number that tells you the slope (rise ÷ run)", w: ["a coordinate (x ; y)", "a length in units"] },
    ];
    const k = pick(cases);
    return mc("whichFormula", k.p, k.c, k.w,
      { hint: "Distance → a length. Midpoint → a point. Gradient → a slope number.", answerLabel: k.c });
  },

  /* lowercase m vs capital M */
  mVsM: () => {
    const ask = pick([
      { p: "On the formula sheet, lower-case <b>m</b> stands for…", c: "the gradient", w: ["the midpoint", "a length", "an angle"] },
      { p: "On the formula sheet, capital <b>M</b> stands for…", c: "the midpoint", w: ["the gradient", "a length", "the maximum"] },
    ]);
    return mc("whichFormula", ask.p, ask.c, ask.w,
      { hint: "Small m = gradient (m for ‘slope’). Big M = Midpoint.", answerLabel: ask.c });
  },

  /* pick the formula for a real job */
  forTheJob: () => {
    const cases = [
      { p: "To find the length of a circle’s <b>radius</b>, you use the…", c: "distance formula", w: ["midpoint formula", "gradient formula"] },
      { p: "The <b>centre</b> of a circle is the midpoint of a diameter, so you use the…", c: "midpoint formula", w: ["distance formula", "gradient formula"] },
      { p: "To check whether two lines are <b>parallel</b>, you compare their…", c: "gradients", w: ["lengths", "midpoints"] },
      { p: "To prove a triangle is <b>isosceles</b> (two equal sides), you use the…", c: "distance formula", w: ["midpoint formula", "gradient formula"] },
    ];
    const k = pick(cases);
    return mc("whichFormula", k.p, k.c, k.w,
      { hint: "Ask: am I after a length, a point, or a slope?", answerLabel: k.c });
  },

  /* the order/consistency rule */
  orderRule: () => {
    return mc("whichFormula",
      "In the gradient formula, if you write <b>y<sub>A</sub></b> first on the top, what must you write first on the bottom?",
      "x<sub>A</sub> (keep the same point first top and bottom)",
      ["x<sub>B</sub> (swap the order)", "either one — order never matters", "the bigger x-value"],
      { hint: "Keep the points in the SAME order top and bottom, or the sign of the gradient flips.",
        answerLabel: "x<sub>A</sub> — same point first, top and bottom." });
  },

  /* read a coordinate off the plane (pick the labelled point) */
  readPoint: () => {
    const pts = [];
    while (pts.length < 3) {
      const p = randPoint(-6, 6);
      if (pts.every((q) => distance(p, q) >= 3) && Math.abs(p.x) + Math.abs(p.y) > 1) pts.push(p);
    }
    const ids = ["P", "Q", "R"];
    const target = pick(pts.map((p, i) => ({ p, id: ids[i] })));
    const graph = {
      type: "analytic", accent: ACC, grid: true, win: winFor(pts),
      points: pts.map((p, i) => ({ x: p.x, y: p.y, id: ids[i], label: ids[i], place: "auto" })),
    };
    return mc("whichFormula", `Which point is at <b>${ptStr(target.p)}</b>?`,
      target.id, ids.filter((i) => i !== target.id),
      { graph,
        hint: "Count across for x, then up/down for y.",
        answerLabel: `${target.id} is at ${ptStr(target.p)}.` });
  },
};

export const questAg1 = {
  id: "ag1",
  skills: Object.entries(SKILLS).map(([id, gen]) => ({ id, concept: "whichFormula", gen })),
};
