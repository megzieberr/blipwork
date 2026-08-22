/* ============================================================
   GENERAL TRIG · gt1 — Introduction (discovery)
   ------------------------------------------------------------
   METHODS-trig.md Part A (p02–p04). Discovery round: XP pays the
   first time through only (xpOnce, below — the play.js hook is
   already built, this quest just sets the flag). Seven beats, her
   order: the word → ratios need a right triangle → O/A/H follow θ
   → SOHCAHTOA → where the ratios come from (the circle) → what
   each one means → the one check that matters (a ratio means
   nothing without its angle).
   ============================================================ */
import { mc, ynQ, pick, rightTriangleThetaSpec, circleFrame } from "./_gtrig.js";

const CON = "gtrigIntro";

function reveal(q, frames, mode) { q.reveal = frames; if (mode) q.revealMode = mode; return q; }

const WORD_FRAMES = [
  `<div style="font-size:16px"><b style="color:var(--accent)">tri</b>gonometry &nbsp;→&nbsp; <b>three</b></div>`,
  `<div style="font-size:16px">trigo<b style="color:var(--accent)">no</b>metry &nbsp;→&nbsp; <b>angled</b></div>`,
  `<div style="font-size:16px">trigono<b style="color:var(--accent)">metry</b> &nbsp;→&nbsp; <b>measurement</b></div>`,
];

const SOHCAHTOA_FRAMES = [
  `<div style="border-left:4px solid #3aa0ff;padding-left:10px"><b>SOH</b> — Sine · Opposite · Hypotenuse<br>sin θ = O/H</div>`,
  `<div style="border-left:4px solid #8b5cf6;padding-left:10px"><b>CAH</b> — Cosine · Adjacent · Hypotenuse<br>cos θ = A/H</div>`,
  `<div style="border-left:4px solid #22c55e;padding-left:10px"><b>TOA</b> — Tangent · Opposite · Adjacent<br>tan θ = O/A</div>`,
];

const CIRCLE_DEGS = [20, 50, 75, 110];
const CIRCLE_FRAMES = CIRCLE_DEGS.map(d =>
  `${circleFrame(d)}<div class="muted small" style="margin-top:6px">As the point moves along the circle (now at θ = ${d}°) the radius stays the same — but θ, the x-coordinate and the y-coordinate all change.</div>`);

const SKILLS = {
  /* A1 — the word */
  theWord: () => reveal(
    mc(CON, "So trigonometry is the study of…",
      "angles and the angle relationships of triangles",
      ["circles and their radii", "the areas of triangles only", "the sides of a right triangle, never the angles"],
      { hint: "Put the three pieces together: three · angled · measurement.",
        answerLabel: "tri (three) + gono (angled) + metry (measurement) = the study of angles and of the angular relationships of triangles." }),
    WORD_FRAMES),

  /* A2 — ratios need a right triangle */
  rightTriangleOnly: () => ynQ(CON,
    "Trig ratios (SOHCAHTOA) can only be used with right triangles. True or false?", true,
    { hint: "The boxed rule from class: ratios can ONLY be used with right triangles.", answerLabel: "True — SOHCAHTOA only works inside a right triangle." }),

  /* A2 — O/A/H follow θ, tapped on a to-scale (unlabelled) triangle */
  tapSide: () => {
    const { spec, ids } = rightTriangleThetaSpec();
    const which = pick(["opp", "adj", "hyp"]);
    const prompts = { opp: "Tap the side that is OPPOSITE θ.", adj: "Tap the side that is ADJACENT to θ.", hyp: "Tap the HYPOTENUSE." };
    const nudge = { opp: "Opposite = the side “across from” θ.", adj: "Adjacent = the side “next to” θ (not the hypotenuse).", hyp: "The hypotenuse is “across from” the right angle." };
    const answerLabel = {
      opp: "Opposite θ is the side straight across from it.",
      adj: "Adjacent to θ is the side that touches θ but isn't the hypotenuse.",
      hyp: "The hypotenuse is across from the right angle — the longest side, and it never touches it.",
    };
    spec.tap = { correctId: ids[which] };
    return {
      type: "tap", concept: CON,
      prompt: prompts[which],
      graph: spec,
      tap: { mode: "side", correctId: ids[which], targets: [ids.adj, ids.opp, ids.hyp] },
      tapHint: nudge[which],
      hint: "Opposite = across from θ; adjacent = next to θ; hypotenuse = across from the right angle.",
      answerLabel: answerLabel[which],
    };
  },

  /* A3 — SOHCAHTOA cards, then pick the ratio (cycles sin/cos/tan) */
  sohcahtoa: () => {
    const items = {
      sin: { ratio: "O/H", wrongs: ["A/H", "O/A", "H/A"] },
      cos: { ratio: "A/H", wrongs: ["O/H", "O/A", "H/A"] },
      tan: { ratio: "O/A", wrongs: ["O/H", "A/H", "H/A"] },
    };
    const fn = pick(["sin", "cos", "tan"]);
    const it = items[fn];
    return reveal(
      mc(CON, `${fn} θ = ?`, it.ratio, it.wrongs,
        { hint: "SOH · CAH · TOA — sine is O/H, cosine is A/H, tangent is O/A.", answerLabel: `${fn} θ = ${it.ratio} (SOH-CAH-TOA).` }),
      SOHCAHTOA_FRAMES);
  },

  /* A4 — the discovery beat: where the ratios come from */
  whereFrom: () => reveal(
    mc(CON, "What stays the same as the point moves round the circle?",
      "the radius r", ["the x-coordinate", "the y-coordinate", "the size of θ"],
      { hint: "Everything changes except one thing — the length from the centre to the point.",
        answerLabel: "The radius r stays the same — only θ, x and y change. That's why a ratio needs its angle: fix r, move the point, watch x and y." }),
    CIRCLE_FRAMES, "replace"),

  /* A5 — what each ratio MEANS (pool: 3 mc + her tan closing line as a yesno) */
  whatItMeans: () => pick([
    () => mc(CON, "sin θ = ?", "y/r", ["x/r", "y/x", "r/y"],
      { hint: "sin is the y-coordinate over the radius.", answerLabel: "sin θ = y/r — how the y-coordinate changes as θ changes (r stays the same)." }),
    () => mc(CON, "cos θ = ?", "x/r", ["y/r", "y/x", "r/x"],
      { hint: "cos is the x-coordinate over the radius.", answerLabel: "cos θ = x/r — how the x-coordinate changes as θ changes." }),
    () => mc(CON, "tan θ = ?", "y/x", ["x/r", "y/r", "r/y"],
      { hint: "tan compares the y- and x-coordinates directly — no r involved.", answerLabel: "tan θ = y/x = sin θ / cos θ." }),
    () => ynQ(CON, "On the circle (r fixed): as the x-value gets bigger, the y-value gets smaller — and the other way round. True or false?", true,
      { hint: "Think of the point on the circle: r is fixed, so when x grows, y has to shrink.", answerLabel: "True — as x grows, y shrinks (and back). That's exactly what tan θ = y/x is tracking." }),
  ])(),

  /* the check that matters */
  ratioAlone: () => mc(CON,
    `Blip says: “the sine is 0,6.” What does that number tell you on its own?`,
    "Nothing until you know the angle — a ratio only means something for its θ",
    ["The triangle's height is 0,6", "θ = 0,6°", "r = 0,6"],
    { hint: "A ratio is a relationship, not a length or an angle by itself.",
      answerLabel: "Fix the radius, move the point, watch x and y — the ratio IS the angle. On its own, 0,6 means nothing." }),
};

export const questGt1 = {
  id: "gt1",
  xpOnce: true,
  skills: Object.entries(SKILLS).map(([id, gen]) => ({ id, concept: CON, gen })),
};
