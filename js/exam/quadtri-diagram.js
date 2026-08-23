/* ============================================================
   EXAM FOCUS — quadrant-triangle diagram helpers
   (EXAM-BUILD-DAY.md, session 0 plumbing, 2026-08-23 — General Trig's
   "special sums" sketch joins the exam diagram slot, so the validator
   and the player have to know a FOURTH engine:
   js/engine/quadrant-triangle.js.)
   ------------------------------------------------------------
   Same job as js/exam/function-diagram.js and js/exam/trig-diagram.js,
   and kept out of the engine for the same reason: that engine is SHARED
   with the live General Trig rounds (gt8 / gt10), and nothing exam-only
   belongs in it.

   THIS ONE IS DIFFERENT FROM THE OTHER THREE, and the difference is the
   engine's, not a design choice here. A quadrant-triangle spec has no
   arrays at all — it is ONE triangle, described by the point (x; y) and
   a handful of switches. So a highlight set here does not APPEND to
   anything: it OVERRIDES fields. The result is still a brand-new spec
   object, and the base spec is still never mutated.

     {
       labels?:     { x?, y?, r? },   // the GIVEN numeric side labels
       letters?:    { x?, y?, r? },   // the fallback letters (t, 1, k…)
       theta?:      true,             // the arc from +x anticlockwise to OT
       thetaLabel?: "θ",
       refAngle?:   true,             // the small acute arc at O
       refLabel?:   "β",
       bare?:       true,
     }

   `labels` and `letters` REPLACE wholesale (not a per-key merge) —
   a part that hands over `labels` is saying "these are the values this
   figure shows", and a merge would quietly leave an earlier part's
   number on the picture. That is exactly the leak the reveal/question
   split exists to prevent.

   `bare: true` strips the spec's own `labels`, so ONLY the letters show:
   the bare-figure rule for this engine. A part whose job is "find r"
   must not have r = 5 already written on the hypotenuse. It does not
   touch the triangle, the axes, the right-angle mark or the θ arc —
   those are the honest picture. `bare` with an explicit `labels` is a
   contradiction, and is reported as one below rather than silently
   resolved.

   THE REVEAL DRAWS WHAT IT FOUND, here as everywhere else: the question
   side gives (x; y) as letters or as the two given numbers, and the
   reveal adds the value it just worked out — usually r — as a numeric
   label. The engine's own verifyQuadTri then PROVES that number equals
   the length actually drawn, so a reveal cannot label a hypotenuse 5
   when the picture draws 5,1.
   ============================================================ */

const ANG_KEYS = ["theta", "refAngle"];
const TEXT_KEYS = ["thetaLabel", "refLabel"];
const SIDE_KEYS = ["x", "y", "r"];

/* Return a NEW spec with this part's highlights applied. `spec` is
   never mutated. */
export function applyQuadtriHighlights(spec, hl) {
  hl = hl || {};
  const out = { ...spec };
  if (hl.bare) out.labels = {};
  if (hl.labels) out.labels = { ...hl.labels };
  if (hl.letters) out.letters = { ...hl.letters };
  ANG_KEYS.forEach(k => { if (hl[k] !== undefined) out[k] = hl[k]; });
  TEXT_KEYS.forEach(k => { if (hl[k] !== undefined) out[k] = hl[k]; });
  return out;
}

/* Structural check for a highlight set: shapes only — strings for the
   labels a learner reads, booleans for the switches. Whether a numeric
   label matches the length actually drawn is a NUMERIC question and
   belongs to the engine's own verifyQuadTri, which js/exam/_schema.js
   runs on the rendered variant. Same split as the other three engines.
   Returns a list of human-readable issues (empty === clean). */
export function quadtriRefIssues(spec, hl, label) {
  const issues = [];
  hl = hl || {};

  if (hl.bare !== undefined && typeof hl.bare !== "boolean") issues.push(`${label}.bare: must be true/false`);
  if (hl.bare === true && hl.labels !== undefined) {
    issues.push(`${label}: bare:true strips the numeric labels, so setting bare AND labels contradicts itself — pick one`);
  }

  ["labels", "letters"].forEach(key => {
    const v = hl[key];
    if (v === undefined) return;
    const at = `${label}.${key}`;
    if (!v || typeof v !== "object" || Array.isArray(v)) { issues.push(`${at}: must be an object keyed by x / y / r`); return; }
    Object.keys(v).forEach(k => {
      if (!SIDE_KEYS.includes(k)) issues.push(`${at}.${k}: unknown side — only x, y and r exist on this figure`);
      else if (typeof v[k] !== "string" || !v[k].trim()) issues.push(`${at}.${k}: must be a non-empty string (the engine prints it as it stands)`);
      else if (/-\d/.test(v[k])) issues.push(`${at}.${k}: contains a hyphen before a digit — use the real minus sign −`);
    });
  });

  ANG_KEYS.forEach(k => {
    if (hl[k] !== undefined && typeof hl[k] !== "boolean") issues.push(`${label}.${k}: must be true/false`);
  });
  TEXT_KEYS.forEach(k => {
    if (hl[k] !== undefined && (typeof hl[k] !== "string" || !hl[k].trim())) issues.push(`${label}.${k}: must be a non-empty string`);
  });

  if (hl.thetaLabel !== undefined && !(hl.theta === true || (spec && spec.theta === true))) {
    issues.push(`${label}.thetaLabel: there is no θ arc to label — set theta:true here or on the base spec`);
  }
  if (hl.refLabel !== undefined && !(hl.refAngle === true || (spec && spec.refAngle === true))) {
    issues.push(`${label}.refLabel: there is no reference-angle arc to label — set refAngle:true here or on the base spec`);
  }

  return issues;
}
