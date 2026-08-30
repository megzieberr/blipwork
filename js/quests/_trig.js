/* Shared trig-quest helpers: turn solved triangle geometry into a
   to-scale diagram spec, plus builders for the composite figures
   (house/pentagon) and regular polygons used by the Area-rule quest.
   Rule we keep everywhere: only GIVEN (exact) measurements get a
   numeric label; unknowns are letters (x / y / θ) — so the engine's
   to-scale checks only ever see exact values. */
import { solveTriangle, rotatePts, sinD, cosD } from "../triglib.js";
/* rng, NOT Math.random: chip and option shuffles must run under js/rng.js
   so a dice round's seeded regeneration (genAt → resume) reproduces the
   SAME order. This file was the only one in js/quests still on raw
   Math.random — verify-dice-trig's "same salt twice → identical" check
   caught it on the 2026-08-30 audit day (it had been true of round 2's
   local helpers since 2026-08-27). Static play is unaffected: rng()
   defaults to Math.random. */
import { rng } from "../rng.js";
/* SLOT is the tokenpad's own marker for "a box to be filled" — imported
   rather than re-typed so a change to the glyph can never leave the frame
   builder drawing a character the pad no longer recognises. */
import { SLOT } from "../tokenpad.js";
import { computeTriangle } from "../engine/triangle-graph.js";

/* Solve + place a triangle, bound to display letters.
   given:  { sides:{a,b,c}, angles:{A,B,C} }   (side a is opposite A …)
   letters:[Aname,Bname,Cname]   rotate: degrees to spin the picture   */
export function placeTri(given, letters = ["A", "B", "C"], rotate = 0) {
  const sol = solveTriangle(given);
  const pts = rotate ? rotatePts(sol.pts, rotate) : sol.pts;
  const map = { A: letters[0], B: letters[1], C: letters[2] };
  const P = {}; ["A", "B", "C"].forEach(k => P[map[k]] = pts[k]);
  return {
    pts: P,
    poly: [map.A, map.B, map.C],
    map,
    sides: sol.sides,         // {a,b,c}
    angles: sol.angles,       // {A,B,C}
    side(g1, g2, label) { return { from: map[g1], to: map[g2], label }; },
    angle(g, label, opts = {}) { return { at: map[g], label, ...opts }; },
    L(g) { return map[g]; },
  };
}

/* Start point for a cevian drawn from vertex `from` towards `to`,
   nudged `px` PIXELS down the segment (converted to real units via the
   engine's own scale) so a dashed altitude never strikes through the
   angle label the engine hangs ≈27px out from the vertex.
   `spec` must already hold its final pts/poly (the nudged point lies on
   the segment, so adding it afterwards cannot change the fitted scale). */
export function segStartClear(spec, from, to, px = 40) {
  const g = computeTriangle(spec);
  const F = spec.pts[from], T = spec.pts[to];
  const L = Math.hypot(T.x - F.x, T.y - F.y) || 1e-6;
  const k = Math.min(0.45, px / (g.scale * L));
  return { x: F.x + (T.x - F.x) * k, y: F.y + (T.y - F.y) * k };
}

/* A "house" pentagon (rectangle + isosceles roof) — the Area-rule
   composite figure. roof side r, apex angle θ, wall height h.
   Returns { spec-ready pieces, area, w }. */
export function houseFigure(r, theta, h, accent) {
  const half = r * sinD(theta / 2);     // half the base
  const rh = r * cosD(theta / 2);       // roof height
  const w = 2 * half;
  const pts = {
    H: { x: 0, y: 0 }, J: { x: w, y: 0 },
    K: { x: w, y: h }, L: { x: w / 2, y: h + rh }, G: { x: 0, y: h },
  };
  return {
    graph: {
      type: "triangle", accent, w: 360, h: 240,
      pts, poly: ["H", "J", "K", "L", "G"],
      sides: [
        { from: "G", to: "L", label: String(r) },
        { from: "L", to: "K", label: String(r) },
        { from: "H", to: "G", label: String(h) },
        { from: "J", to: "K", label: String(h) },
      ],
      angles: [
        { at: "L", label: `${theta}°` },
        { at: "H", right: true }, { at: "J", right: true },
      ],
    },
    w,
    areaRoof: 0.5 * r * r * sinD(theta),
    areaWall: w * h,
  };
}

/* A regular n-gon with side s, drawn to scale (one flat side at the
   bottom). Labels two adjacent sides with s. */
export function regularPolygonFigure(n, s, accent) {
  const R = s / (2 * sinD(180 / n));        // circumradius
  const start = -90 - 180 / n;              // orient a flat side at the bottom
  const names = "ABCDEFGHIJ".slice(0, n).split("");
  const pts = {};
  names.forEach((nm, i) => {
    const a = (start + i * 360 / n) * Math.PI / 180;
    pts[nm] = { x: R * Math.cos(a), y: R * Math.sin(a) };
  });
  return {
    type: "triangle", accent, w: 320, h: 260,
    pts, poly: names,
    sides: [
      { from: names[0], to: names[1], label: String(s) },
      { from: names[1], to: names[2], label: String(s) },
    ],
  };
}

/* ============================================================
   THE SINE-RULE SET-UP STEP  (her 2026-08-27 ask)
   ------------------------------------------------------------
   Round 2 used to hand over the triangle and take one number. Her
   words: "it is too intense… I think we should change it so that
   they build the equation step by step each time". Two of the class
   had finished it; she believes that is why.

   This is the BUILD step: a slotted skeleton  ☐/☐ = ☐/☐  and a set
   of chips. The learner drops a quantity into each box. It is the
   same `tokenpad` kind the reduction rounds use, so js/steps-check.js
   marks it with no new code and the harness tests it the same way.

   ⚠️ THE SINE RULE IS SYMMETRIC, so the mirrored fill is EQUALLY
   CORRECT and is always accepted:
        x / sin B̂ = a / sin Â      and      a / sin Â = x / sin B̂
   Marking one of those wrong would be marking a child wrong for the
   order they happened to read the triangle in.

   NOT accepted, deliberately: the sines-on-top form. It is true
   maths, so the step PROMPT says "sides on top" out loud — the round
   has a whole multiple-choice question teaching exactly that, and a
   step may only mark what it asked for.

   pair:   { side, sin }  the unknown's side chip and its angle chip
   known:  { side, sin }  the known pair
   decoys: extra chips (usually the third angle's sine)
   ============================================================ */
export function sineSetupStep(pair, known, decoys, hint) {
  const frame = [SLOT, "/", SLOT, "=", SLOT, "/", SLOT];
  /* The pad joins its chips with a thin space, so the expected string must
     too. normalizeTokens() strips all whitespace before comparing, so this
     separator is never marked — it only stops "14" and "sin 48°" running
     together into an unreadable expected value. */
  const join = xs => xs.join(" ");
  /* ⚠️ DEDUPE. The decoy is normally the third angle's sine, and a
     triangle can perfectly well have two equal angles — Â = 50°, B̂ = 80°
     puts Ĉ at 50° too, and the pad would then show "sin 50°" twice. Two
     identical chips are not a harder question, they are a confusing one:
     a learner who taps the second copy and gets it right learns that the
     duplicate mattered. The generators also avoid the collision up front;
     this is the safety net under them. */
  const chips = [];
  for (const c of [pair.side, known.side, pair.sin, known.sin, ...(decoys || [])]) {
    if (c != null && c !== "" && !chips.includes(c)) chips.push(c);
  }
  return {
    kind: "tokenpad",
    prompt: "Build the set-up, <b>sides on top</b>. Tap a piece to drop it into the next box.",
    frame,
    keys: shuffleChips(chips),
    expected: join([pair.side, pair.sin, known.side, known.sin]),
    alsoAccept: [join([known.side, known.sin, pair.side, pair.sin])],
    hint,
  };
}

/* The chip order is shuffled so the answer can never be "tap them left
   to right" — a fresh order per question in static play, the SAME order
   on a seeded dice regeneration (see the rng import note above). */
function shuffleChips(xs) {
  const a = xs.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* ============================================================
   CHAPTER-WIDE STEP BUILDERS  (the audit-day widening, 2026-08-30)
   ------------------------------------------------------------
   Round 2's rebuild (sineSetupStep above) proved the shape; her ask
   this audit day widened it to the rest of the chapter: "split those
   intense questions up in smaller questions so the kids actually
   build the questions, not try to do everything in their head."
   The same laws hold for every builder here:
     · the question, its diagram and its numbers DO NOT change — the
       existing worked `solution` becomes the steps, answered;
     · a symmetric fill is equally correct and is accepted (marking a
       child wrong for the order they read the triangle in would be
       marking reading order, not maths);
     · a STRUCTURAL wrong (the opposite side not subtracted, sines
       swapped) is a real wrong and marks wrong;
     · callers must feed DISTINCT side values wherever two sides
       become chips — the generators guard it, dedupe is the net.
   mcStep/calcStep — round 2's local helpers, promoted here first —
   moved a level further on this same audit day, to js/quests/_shared.js,
   so every chapter's step chains share ONE copy, not five. This file
   just re-exports the two names below so t2–t7's existing imports keep
   working untouched.
   ============================================================ */

export { mcStep, calcStep } from "./_shared.js";

/* one dedupe for every builder — two identical chips are not a harder
   question, they are a confusing one (see sineSetupStep's note) */
function chipsOf(list) {
  const chips = [];
  for (const c of list) {
    if (c != null && c !== "" && !chips.includes(c)) chips.push(c);
  }
  return chips;
}
/* U+2009 THIN SPACE — the SAME separator the pad itself joins with, so a
   harness can split expected back into its pieces (a chip like "sin 43°"
   contains a real space, so splitting on plain whitespace shreds it).
   normalizeTokens strips it before marking; it is never marked. */
const joinThin = xs => xs.join(" ");

/* ---------- sine rule, SINES ON TOP (finding an angle) ----------
   pair:  { sin: "sin θ",  side } — the unknown's sine over its side
   known: { sin: "sin 43°", side }
   The mirrored fill is equally correct; the sides-on-top form is true
   maths but NOT accepted — the prompt says "sines on top" out loud,
   exactly as sineSetupStep's prompt says "sides on top". */
export function sineAngleSetupStep(pair, known, decoys, hint) {
  const frame = [SLOT, "/", SLOT, "=", SLOT, "/", SLOT];
  return {
    kind: "tokenpad",
    prompt: "Build the set-up, <b>sines on top</b>. Tap a piece to drop it into the next box.",
    frame,
    keys: shuffleChips(chipsOf([pair.sin, known.sin, pair.side, known.side, ...(decoys || [])])),
    expected: joinThin([pair.sin, pair.side, known.sin, known.side]),
    alsoAccept: [joinThin([known.sin, known.side, pair.sin, pair.side])],
    hint,
  };
}

/* ---------- substituted cosine rule for a SIDE ----------
   lhs² = ☐² + ☐² − 2·☐·☐·cos ☐   with chips s1, s2, angTxt.
   "cos" sits IN the frame so the last box takes the bare angle — the
   sin-for-cos mix-up is taught by the round's own formula MC, not
   trapped here. All four s1/s2 arrangements are the same maths. */
export function cosineSideSetupStep(lhs, s1, s2, angTxt, hint) {
  const frame = [`${lhs}²`, "=", SLOT, "²", "+", SLOT, "²", "−", "2", "·", SLOT, "·", SLOT, "·", "cos", SLOT];
  const fills = [[s1, s2, s1, s2], [s2, s1, s1, s2], [s1, s2, s2, s1], [s2, s1, s2, s1]]
    .map(f => joinThin([...f, angTxt]));
  const accepted = [...new Set(fills)];       // s1 === s2 would collapse these; callers keep them distinct
  return {
    kind: "tokenpad",
    prompt: `Build the cosine rule for <b>${lhs}</b>. Tap a piece to drop it into the next box.`,
    frame,
    keys: shuffleChips(chipsOf([s1, s2, angTxt])),
    expected: accepted[0],
    alsoAccept: accepted.slice(1),
    hint,
  };
}

/* ---------- rearranged cosine rule for an ANGLE ----------
   cos θ = ( ☐² + ☐² − ☐² ) / ( 2 · ☐ · ☐ )   with chips o1, o2, opp.
   The one thing this step exists to teach: the side OPPOSITE the angle
   is the one subtracted. opp in a plus-slot marks wrong, as it should. */
export function cosineAngleSetupStep(lhsTxt, opp, o1, o2, hint) {
  /* the "/" cell makes the pad draw this as a REAL STACKED FRACTION
     (tokenpad.js paintFrame) — no parentheses needed, the bar does that
     job, and inline this frame was wider than a phone */
  const frame = [`cos ${lhsTxt}`, "=", SLOT, "²", "+", SLOT, "²", "−", SLOT, "²", "/", "2", "·", SLOT, "·", SLOT];
  const fills = [[o1, o2, opp, o1, o2], [o2, o1, opp, o1, o2], [o1, o2, opp, o2, o1], [o2, o1, opp, o2, o1]]
    .map(f => joinThin(f));
  const accepted = [...new Set(fills)];
  return {
    kind: "tokenpad",
    prompt: `Build the rearranged cosine rule for <b>${lhsTxt}</b>. Which side is subtracted?`,
    frame,
    keys: shuffleChips(chipsOf([o1, o2, opp])),
    expected: accepted[0],
    alsoAccept: accepted.slice(1),
    hint,
  };
}

/* ---------- area rule ----------
   Area = ½ · ☐ · ☐ · sin ☐   with chips s1, s2, angTxt. */
export function areaSetupStep(s1, s2, angTxt, hint) {
  const frame = ["Area", "=", "½", "·", SLOT, "·", SLOT, "·", "sin", SLOT];
  const fills = [[s1, s2, angTxt], [s2, s1, angTxt]].map(f => joinThin(f));
  const accepted = [...new Set(fills)];
  return {
    kind: "tokenpad",
    prompt: "Build the area rule. Tap a piece to drop it into the next box.",
    frame,
    keys: shuffleChips(chipsOf([s1, s2, angTxt])),
    expected: accepted[0],
    alsoAccept: accepted.slice(1),
    hint,
  };
}
