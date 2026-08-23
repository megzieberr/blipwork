/* ============================================================
   EXAM FOCUS — seeded-question data shape + validator
   (EXAM-FOCUS-PLAN.md, session 0 infrastructure build, 2026-08-21).
   ------------------------------------------------------------
   The exam focus tab is a CURATED SHELF, not a generator (unlike the
   🎲 dice — see js/dice.js's header for that contrast). Every question is
   hand-authored, seeded once, and imported both by js/exam/index.js's
   registry (real content, session 1+) and this file's validateQuestion()
   (checked by verify-exam.html, and reusable by a future seeding session
   before a question ever reaches the registry).

   One module per question. See js/exam/_harness-stub.js for a fully
   worked reference example (HARNESS-ONLY — never registered, never
   learner-reachable — see that file's own header).

   Every learner-facing text field is a { en, af? } pair — en REQUIRED,
   af OPTIONAL (session E, 2026-08-21, her ruling: AF was too much work
   to keep fresh for now — the tab is English-only until she supplies
   proper Afrikaans material, her word, next year). Her AF wording rules
   (no "frase"; "Trek"/"Skuif" for drag, "Klik op" for taps; reasons in
   words) still apply to every `af` string WHEN ONE IS PRESENT — an
   omitted af is now normal, a present-but-wrong-style one is still
   caught. The four pilot questions' Afrikaans text stays in the file,
   dormant, her call — future seeding sessions compose EN-only.

   ---------------------------------------------------------------
   QUESTION
     id         string, unique across the WHOLE exam bank (every chapter)
     chapter    one of js/config.js CHAPTERS[].id
     topic      string slug — coverage/nav grouping within the chapter.
                Display label is title-cased from the slug by
                js/exam/index.js unless a future seeding session decides
                a real label is worth carrying alongside it.
     archetype  string — the paper-bank archetype tag this question is
                composed from (coverage tracking only; NEVER shown to
                a learner).
     marks      number — MUST equal the sum of every part's marks.
     lostQuest  { chapter, quest } — REQUIRED (session E, 2026-08-21, her
                ruling: "I'm lost" reteaches, it doesn't just hint — take
                the learner to the specific Blipwork round that teaches
                and drills this). `chapter`/`quest` are ids into
                js/config.js CHAPTERS — this file only checks they're
                non-empty strings; verify-exam.html additionally asserts
                they resolve to a real chapter and quest (the same
                "structure here, cross-file existence in the harness"
                split q.chapter/index.js's registry check already uses).
                js/exam-play.js renders the reteach link ONLY when that
                quest is currently open (state.openQuests) — never a
                bypass, never a dead-end.
     diagram    OPTIONAL. A to-scale figure, drawn by ONE of FOUR engines
                depending on `spec.type`:

                  (no type)   js/exam/circle-engine.js — Circle Quest's
                              engine, ported 2026-08-22; every
                              circle-geometry spec.
                  "function"  js/engine/function-graph.js — the Functions
                              chapter's own engine (2026-08-22).
                  "trigg"     js/engine/trig-graph.js — the Trig Graphs
                              chapter's engine (added 2026-08-23,
                              EXAM-BUILD-DAY.md, when tgraph joined the
                              tab).
                  "quadtri"   js/engine/quadrant-triangle.js — General
                              Trig's special-sums sketch (same day).

                Every spec here is run through ITS OWN engine's verify —
                verifyDiagram / verifyFunction / verifyTrig /
                verifyQuadTri — so a figure that does not measure what it
                claims fails validation instead of shipping. Each of the
                three non-circle engines has a small exam-only glue
                module beside this file (function-diagram.js,
                trig-diagram.js, quadtri-diagram.js) holding its
                highlight-set applier and structural checker; the engines
                themselves are shared with live quest rounds and stay
                exam-agnostic. Questions without a figure are unaffected
                — the field is simply absent.

                  diagram: {
                    spec: <engine spec>,          // default figure
                    parts: {
                      "a": {
                        spec:     <engine spec>,  // optional per-part override
                        question: <highlight set>,// drawn while the part is being worked
                        reveal:   <highlight set>,// optional; drawn once the memo is open
                      },
                    },
                  }

                A HIGHLIGHT SET is her per-part marker-pen design
                (EXAM-FOCUS-PLAN.md, "Circle geo diagrams": "find angle A"
                lights the wedge on angle A, "prove ABCD is cyclic" lights
                the four sides) — its shape depends on which engine the
                spec belongs to:

                  CIRCLE  (js/exam/circle-engine.js's extension block):
                    { angles?:[{at,legs,v,t?}], chords?:[[a,b,mark?]],
                      construction?:{ pts?:{C:90}, chords?:[[a,b,mark?]] },
                      bare? }
                  · every name a highlight references must exist in its
                    spec, and every chord ref must be a segment the spec
                    actually draws (diagramRefIssues);
                  · `construction` (2026-08-23, the Euclidean
                    bookwork-proofs tile) is the one thing that ADDS ink
                    rather than marking ink that is already there: the
                    points and lines a bookwork proof's construction
                    creates ("join OA and OB", "draw the diameter TC").
                    A printed bookwork figure never shows the
                    construction — drawing it is the candidate's own
                    first mark — so it belongs on the REVEAL side only,
                    which is why it cannot be a `chords` highlight (that
                    field must land on ink the figure already draws, and
                    stays exactly that strict). Construction geometry is
                    folded in before anything else looks at the spec, so
                    an angle may sit at a construction point and
                    verifyDiagram re-measures the whole figure as drawn;
                  · every highlighted angle declares its true value v, and
                    the highlighted spec is re-measured by verifyDiagram —
                    so a wedge on the wrong side of a leg is caught.

                  FUNCTION  (js/exam/function-diagram.js — deliberately
                  simpler: a function spec's points are bare {x,y} pairs,
                  not named vertices, so there is nothing to resolve, only
                  shapes to check):
                    { curves?:[{kind,…params,tone?,dash?,label?,labelAt?}],
                      points?:[{x,y,label?,on?,place?}],
                      asymptotes?:[{x?,y?,of?,label?}], shades?:[{x0,x1}],
                      vlines?:[{x,label?}],
                      segment?:{x,fromCurve,toCurve,label?},
                      bare? }
                  · curves/points/asymptotes/shades/vlines are APPENDED
                    to the base spec's own (cloned) arrays; `segment`
                    REPLACES the base spec's segment when given (only one
                    is ever drawn). Because appended curves land AFTER
                    the base spec's own, a highlight's `of`/`on` index
                    counts (base curve count + position in that array);
                  · `asymptotes` (SESSION 1b) is for the base spec that
                    deliberately withholds the dashed guide lines because
                    ONE part has to DERIVE them (Sept T2 3(a)) while every
                    later part is entitled to see them. Each entry sets x
                    OR y (never both), an optional `of: <curve index>` so
                    verifyFunction can prove the line matches the curve,
                    and an optional `label` ("x = −1") the engine sets in
                    the muted caption style beside the line;
                  · every labelled point that names a curve does so with
                    `on: <curve index>` (a number, NOT a name — the
                    function engine's curves are an array, not named
                    points) so verifyFunction can prove it really sits on
                    that curve; a reference point (e.g. a hyperbola's
                    asymptote-crossing centre, which is never ON the
                    curve) simply omits `on`.

                  TRIG GRAPH  (js/exam/trig-diagram.js — added 2026-08-23):
                    { curves?:[{fn,a,b,p,q,tone?,dash?,label?,labelAt?}],
                      points?:[{x,y,label?,on?,open?,dashTo?,place?}],
                      shades?:[{x0,x1}], vlines?:[{x,label?}],
                      hlines?:[{y,label?}], midline?:{y},
                      hmeasure?:{x0,x1,y,label?},
                      vmeasure?:{x,y0,y1,label?}, bare? }
                  · curves/points/shades/vlines/hlines are APPENDED to
                    the base spec's own (cloned); midline / hmeasure /
                    vmeasure REPLACE, because the engine only ever draws
                    ONE of each. Appended curves land AFTER the base
                    spec's, so a point's `on: <curve index>` counts
                    (base curve count + position in the highlight array)
                    — the same index rule the function engine uses;
                  · `bare` strips the base spec's own `points`, for a
                    part whose job IS finding a maximum / an intersection
                    / an intercept;
                  · x is in DEGREES throughout. verifyTrig proves every
                    shade, vline and hline falls inside the window and
                    that a shade has x1 > x0.

                  QUADRANT TRIANGLE  (js/exam/quadtri-diagram.js — added
                  2026-08-23; the ONE highlight set that overrides rather
                  than appends, because the spec has no arrays at all):
                    { labels?:{x?,y?,r?}, letters?:{x?,y?,r?},
                      theta?, thetaLabel?, refAngle?, refLabel?, bare? }
                  · `labels` / `letters` REPLACE wholesale, so an earlier
                    part's number can never linger on a later part's
                    picture;
                  · `bare` strips the numeric `labels` so only the
                    letters show — the bare-figure rule for a part whose
                    job is "find r";
                  · verifyQuadTri proves every numeric label equals the
                    length actually drawn, so a reveal cannot write 5 on
                    a hypotenuse the picture draws as 5,1.

                THE REVEAL DRAWS WHAT IT FOUND (SESSION 2a-FIX,
                2026-08-22 — her instruction that day: "spend more to
                make sure the graphs actually look good"). The rule, for
                every function question from here on:

                  the QUESTION side never shows the answer;
                  the REVEAL side always DRAWS it.

                Concretely, by kind of answer:
                  · an asymptote, an axis of symmetry, or a tangent →
                    a dashed CAPTIONED line (an `asymptotes` entry with
                    a `label`, a `vlines` entry with a `label`, or a
                    `curves` entry {kind:"line", dash:true, label});
                  · a shifted / reflected graph → a second curve in tone
                    "b", labelled with its name, together with its own
                    captioned asymptotes if it has any;
                  · an inequality in x → a shaded strip (`shades`)
                    bounded by the cut lines — her cut-line-and-paint
                    method, made visible;
                  · a point (an intercept, a turning point, the centre of
                    a hyperbola) → a labelled dot;
                  · a "for which k" answer → the boundary line(s) y = k,
                    dashed and labelled.
                And the other half of the same rule: every GIVEN
                asymptote or boundary line carries its caption on the
                QUESTION side, so a learner never has to guess which
                dashed line is which.
                Because the reveal highlight set REPLACES the question
                one (js/exam-play.js), a reveal must repeat whatever the
                question side showed that should stay on the picture.

                `question.bare: true` draws the figure WITHOUT the spec's
                own angle labels (circle) or its own marked points
                (function): the BARE-FIGURE RULE, for a part whose job
                IS finding that label/point (Sept T2 4(a) — a question
                diagram already carrying x, y, 2x, 2y hands the proof
                over; equally, a function part asking "find the turning
                point" must not already show it marked).

     parts      Part[], at least one.

   PART
     id      string, unique WITHIN the question (the sub-part letter,
             e.g. "a","b","c" — also the identifier the server's
             mhq_exam_open_part RPC records a reveal against).
     marks   number.
     level   1-4. The ★ badge and "bank the earlier marks first" line are
             DERIVED at render time from level === 4 — nothing here
             stores them separately, so they can never drift out of sync
             with the level.
     prompt  {en,af} — HTML. Real minus (−, U+2212), decimal comma.
     hint    {en,af} — shown on "I'm stuck"; never advances the part,
             never recorded server-side (hints are local-only — the
             server only ever hears about a DONE reveal).
     memo    MemoBlock[] — the reveal, rendered in order.
     esplain {en,af} — the 🤔 plain-words walkthrough (the deeper why,
             beyond the memo's method).

   MEMO BLOCK — one of three typed shapes:
     { type:"step",   text:{en,af}, ticks:[...], hl? }
       a worked-method line. `ticks` are the mark-earning ticks THIS
       line carries, in order — zero or more.
     { type:"answer", text:{en,af}, ticks:[...], hl? }
       the ANSWER bar — usually the line carrying the part's final ✓a.

     `hl` (OPTIONAL, session G3, 2026-08-23) is a HIGHLIGHT SET in the
     same shape as the part's `diagram.parts.<id>.reveal`: the picture
     that goes with THIS line while "Walk me through it" is running.
     It is cumulative — a block with no `hl` keeps the picture the
     block before it left on screen — and an `answer` block with no
     `hl` of its own resolves to the part's `reveal`, so the finished
     walk and the Done path show the identical figure. The resolver is
     js/exam/_walk.js; every `hl` is validated exactly like a reveal
     (validateMemoHighlights below). A trap card never carries one.
     { type:"trap",   text:{en,af} }
       the amber REMEMBER card. Optional — only present where the
       archetype actually has a common trap. Never carries ticks (a
       trap is a warning, not a mark).

   TICK LANGUAGE (her house style — see EXAM-FOCUS-PLAN.md): every tick
   in a `ticks` array is one of:
     "a"    — answer
     "ca"   — consequential accuracy (follow-through)
     "s/f"  — substitution / formula
   Every tick across a part's step+answer blocks MUST sum (by COUNT, one
   tick = one mark) to that part's `marks` — this is what keeps a memo
   honest against its own mark allocation, and is validated below.
   ---------------------------------------------------------------

   SCOPE WALLS (paper-bank hard bounds — e.g. "no annuities", "trig graphs
   max two parameters") are a per-chapter, per-seeding-session concern
   read from Desktop\Eksamen Vraestelle\Gr11 IEB Nov\GR11-IEB-PAPER-BANK.md
   — a document outside this repo, and outside this infrastructure
   session's scope (the registry is empty; there is nothing seeded yet to
   check a scope wall against). validateQuestion() below does NOT check
   scope walls for that reason — a future seeding session is the one that
   can actually verify a topic against its chapter's wall, and should add
   that check when it lands real content.
   ============================================================ */

import { verifyDiagram, highlightedSpec, diagramRefIssues } from "./circle-engine.js";
import { verifyFunction } from "../engine/function-graph.js";
import { applyFunctionHighlights, functionRefIssues } from "./function-diagram.js";
import { verifyTrig } from "../engine/trig-graph.js";
import { applyTrigHighlights, trigRefIssues } from "./trig-diagram.js";
import { verifyQuadTri } from "../engine/quadrant-triangle.js";
import { applyQuadtriHighlights, quadtriRefIssues } from "./quadtri-diagram.js";

const ALLOWED_TICKS = new Set(["a", "ca", "s/f"]);
const ALLOWED_MEMO_TYPES = new Set(["step", "answer", "trap"]);

function isNonEmptyString(v) { return typeof v === "string" && v.trim().length > 0; }

/* A {en,af} pair: en REQUIRED and non-empty; af OPTIONAL (session E,
   2026-08-21 — see this file's header). An OMITTED af is fine; a
   present-but-empty af is still flagged, same as a genuinely broken
   field. */
function isTextPair(v, label, issues) {
  if (!v || typeof v !== "object") { issues.push(`${label}: missing {en,af} pair`); return false; }
  let ok = true;
  if (!isNonEmptyString(v.en)) { issues.push(`${label}.en: missing or empty`); ok = false; }
  if (v.af !== undefined && !isNonEmptyString(v.af)) { issues.push(`${label}.af: present but empty`); ok = false; }
  return ok;
}

/* Glyph hygiene, mirrors the dice harness's dot-decimal regression guard
   (verify-dice.html) plus the repo's "real minus, not a hyphen" rule
   (CLAUDE.md gotcha #5) and the AF wording rule against "frase". Checked
   on both `en` and `af` sides of a pair. The hyphen check is a heuristic
   (a hyphen immediately before a digit) — good enough for hand-authored
   maths prose, where a real negative number is the only thing that
   pattern legitimately matches. */
function glyphIssues(v, label, issues) {
  if (!v) return;
  for (const lang of ["en", "af"]) {
    const s = v[lang];
    if (typeof s !== "string") continue;
    if (/\d\.\d/.test(s)) issues.push(`${label}.${lang}: contains a dot-decimal number (should be comma, e.g. 0,42)`);
    if (/-\d/.test(s)) issues.push(`${label}.${lang}: contains a hyphen directly before a digit (should be the real minus sign −, U+2212)`);
    if (lang === "af" && /\bfrase\b/i.test(s)) issues.push(`${label}.af: contains the banned word "frase"`);
  }
}

function validateMemoBlock(block, partId, idx, issues) {
  const label = `part "${partId}" memo[${idx}]`;
  if (!block || typeof block !== "object" || !ALLOWED_MEMO_TYPES.has(block.type)) {
    issues.push(`${label}: type must be one of step/answer/trap, got "${block && block.type}"`);
    return 0;
  }
  isTextPair(block.text, `${label}.text`, issues);
  glyphIssues(block.text, `${label}.text`, issues);
  if (block.type === "trap") {
    if (Array.isArray(block.ticks) && block.ticks.length) issues.push(`${label}: a trap card must not carry ticks (it's a warning, not a mark)`);
    if (block.hl !== undefined) issues.push(`${label}: a trap card must not carry a diagram highlight \`hl\` — it is a warning, not a step of the proof`);
    return 0;
  }
  /* WALK HIGHLIGHT (session G3, 2026-08-23). Shape only here — the
     against-the-spec checks need the part's figure, so they live in
     validateMemoHighlights below, beside validateDiagram. */
  if (block.hl !== undefined && (!block.hl || typeof block.hl !== "object" || Array.isArray(block.hl))) {
    issues.push(`${label}.hl: must be a highlight-set object (the same shape as the part's diagram reveal)`);
  }
  const ticks = Array.isArray(block.ticks) ? block.ticks : [];
  ticks.forEach(t => { if (!ALLOWED_TICKS.has(t)) issues.push(`${label}: unknown tick "${t}" (allowed: a, ca, s/f)`); });
  return ticks.length;
}

function validatePart(part, qid, issues, seenIds) {
  if (!part || typeof part !== "object") { issues.push("a part is missing or not an object"); return 0; }
  const label = `question "${qid}" part "${part.id}"`;
  if (!isNonEmptyString(part.id)) issues.push(`${label}: missing id`);
  else if (seenIds.has(part.id)) issues.push(`${label}: duplicate part id within this question`);
  else seenIds.add(part.id);

  if (typeof part.marks !== "number" || part.marks <= 0) issues.push(`${label}: marks must be a positive number`);
  if (![1, 2, 3, 4].includes(part.level)) issues.push(`${label}: level must be 1, 2, 3 or 4 (got ${part.level})`);

  isTextPair(part.prompt, `${label}.prompt`, issues); glyphIssues(part.prompt, `${label}.prompt`, issues);
  isTextPair(part.hint, `${label}.hint`, issues); glyphIssues(part.hint, `${label}.hint`, issues);
  isTextPair(part.esplain, `${label}.esplain`, issues); glyphIssues(part.esplain, `${label}.esplain`, issues);

  if (!Array.isArray(part.memo) || !part.memo.length) {
    issues.push(`${label}: memo must be a non-empty array`);
    return 0;
  }
  let tickTotal = 0;
  part.memo.forEach((block, i) => { tickTotal += validateMemoBlock(block, part.id, i, issues); });
  if (typeof part.marks === "number" && tickTotal !== part.marks) {
    issues.push(`${label}: memo ticks sum to ${tickTotal}, but the part is worth ${part.marks}`);
  }
  return typeof part.marks === "number" ? part.marks : 0;
}

/* ---------------------------------------------------------------
   DIAGRAM (optional, added 2026-08-22 with the Circle Quest engine
   port). Absent on every question seeded before this date, so this
   whole block is a no-op for them — validateQuestion() returns
   immediately when q.diagram is undefined.

   Two kinds of check, deliberately kept apart:
     · STRUCTURAL — does every name a highlight uses exist in its
       spec (js/exam/circle-engine.js's diagramRefIssues);
     · NUMERIC — does every drawn angle measure what it claims
       (the engine's own verifyDiagram, the "diagrams cannot lie"
       guarantee, run on the base spec AND on every highlighted
       variant a part will actually render).
   --------------------------------------------------------------- */
const DIAGRAM_TOL = 1.5;      // the engine's own default tolerance

/* CIRCLE spec measure check (verifyDiagram — one result per marked angle). */
function checkCircleMeasures(spec, label, issues) {
  let results;
  try { results = verifyDiagram(spec, DIAGRAM_TOL); }
  catch (e) { issues.push(`${label}: spec failed to render (${e && e.message})`); return; }
  results.forEach(r => {
    if (!r.ok) issues.push(`${label}: angle at ${r.at}${r.t ? ` ("${r.t}")` : ""} is drawn as ${r.drawn}° but declares v = ${r.v}° (out by ${r.diff}°, tolerance ${DIAGRAM_TOL}°)`);
  });
}

/* FUNCTION spec measure check (verifyFunction — one result per structural
   fact: window validity, curve visibility, points-on-curve, asymptotes,
   the segment). Each result already carries its own human-readable label. */
function checkFunctionMeasures(spec, label, issues) {
  let results;
  try { results = verifyFunction(spec); }
  catch (e) { issues.push(`${label}: spec failed to render (${e && e.message})`); return; }
  results.forEach(r => { if (!r.ok) issues.push(`${label}: ${r.label}`); });
}

/* TRIG GRAPH spec measure check (verifyTrig — one result per structural
   fact: window validity, one affine map, curve visibility, amplitude /
   midline / asymptotes honest, points-on-curve, shades and boundary
   lines inside the window, the period and amplitude arrows). Added
   2026-08-23 with the tgraph leg of the exam build. */
function checkTrigMeasures(spec, label, issues) {
  let results;
  try { results = verifyTrig(spec); }
  catch (e) { issues.push(`${label}: spec failed to render (${e && e.message})`); return; }
  results.forEach(r => { if (!r.ok) issues.push(`${label}: ${r.label}`); });
}

/* QUADRANT TRIANGLE spec measure check (verifyQuadTri — legs non-zero,
   the point drawn in the quadrant it claims, ONE uniform scale, every
   numeric label equal to the length actually drawn, a real 90° at the
   foot, the θ arc ending on the hypotenuse, the whole figure in frame).
   Added 2026-08-23. */
function checkQuadTriMeasures(spec, label, issues) {
  let results;
  try { results = verifyQuadTri(spec); }
  catch (e) { issues.push(`${label}: spec failed to render (${e && e.message})`); return; }
  results.forEach(r => { if (!r.ok) issues.push(`${label}: ${r.label}`); });
}

/* Dispatches on spec.type — every OTHER caller in this file (validateDiagram
   below) goes through this one function, so a spec is always measured by
   the engine that actually drew it. A circle spec carries no `type` at
   all, which is why it is the fall-through rather than a named branch. */
function checkSpecMeasures(spec, label, issues) {
  const type = spec && spec.type;
  if (type === "function") checkFunctionMeasures(spec, label, issues);
  else if (type === "trigg") checkTrigMeasures(spec, label, issues);
  else if (type === "quadtri") checkQuadTriMeasures(spec, label, issues);
  else checkCircleMeasures(spec, label, issues);
}

function validateHighlightSet(spec, hl, label, issues) {
  if (hl === undefined) return;
  if (!hl || typeof hl !== "object" || Array.isArray(hl)) { issues.push(`${label}: must be a highlight-set object`); return; }
  /* One branch per engine, all built the same way: the glue module's
     STRUCTURAL check first (shapes and, for circles, names), then the
     highlighted variant is built and re-measured by the engine that
     drew it — so a highlight that moves a line off the window, or puts
     a wedge on the wrong side of a leg, is caught here rather than on
     the learner's screen. */
  const type = spec && spec.type;
  if (type === "function" || type === "trigg" || type === "quadtri") {
    const refIssues = type === "function" ? functionRefIssues
                    : type === "trigg"    ? trigRefIssues
                    : quadtriRefIssues;
    const apply = type === "function" ? applyFunctionHighlights
                : type === "trigg"    ? applyTrigHighlights
                : applyQuadtriHighlights;
    refIssues(spec, hl, label).forEach(i => issues.push(i));
    let variant;
    try { variant = apply(spec, hl); }
    catch (e) { issues.push(`${label}: highlights could not be applied (${e && e.message})`); return; }
    checkSpecMeasures(variant, `${label} (as rendered)`, issues);
    return;
  }
  diagramRefIssues(spec, hl, label).forEach(i => issues.push(i));
  let variant;
  try { variant = highlightedSpec(spec, hl); }
  catch (e) { issues.push(`${label}: highlights could not be applied (${e && e.message})`); return; }
  checkSpecMeasures(variant, `${label} (as rendered)`, issues);
}

function validateDiagram(q, issues) {
  const d = q.diagram;
  if (d === undefined) return;
  const label = `question "${q.id}" diagram`;
  if (!d || typeof d !== "object" || Array.isArray(d)) { issues.push(`${label}: must be an object`); return; }
  if (d.spec !== undefined) {
    if (!d.spec || typeof d.spec !== "object") issues.push(`${label}.spec: must be an engine spec object`);
    else checkSpecMeasures(d.spec, `${label}.spec`, issues);
  }
  if (!d.parts || typeof d.parts !== "object" || Array.isArray(d.parts)) { issues.push(`${label}.parts: must be an object keyed by part id`); return; }

  const partIds = new Set((q.parts || []).map(p => p && p.id));
  Object.entries(d.parts).forEach(([partId, entry]) => {
    const pl = `${label}.parts["${partId}"]`;
    if (!partIds.has(partId)) { issues.push(`${pl}: no part with that id exists in this question`); return; }
    if (!entry || typeof entry !== "object") { issues.push(`${pl}: must be an object`); return; }
    const spec = entry.spec || d.spec;
    if (!spec || typeof spec !== "object") { issues.push(`${pl}: no spec — set one here or a default on diagram.spec`); return; }
    if (entry.spec) checkSpecMeasures(entry.spec, `${pl}.spec`, issues);
    validateHighlightSet(spec, entry.question, `${pl}.question`, issues);
    validateHighlightSet(spec, entry.reveal, `${pl}.reveal`, issues);
  });
}

/* ---------------------------------------------------------------
   MEMO WALK HIGHLIGHTS (session G3, 2026-08-23 — her ask: "show the
   steps on the sketch as well if the kids tapped on 'walk me through
   it'"). A `step`/`answer` memo block may carry an `hl` in exactly the
   same shape as its part's `reveal`, and js/exam/_walk.js resolves
   which one a given walk step renders.

   THE POINT OF CHECKING IT HERE: a walk highlight is a PICTURE A
   LEARNER SEES, so it earns exactly the same two guarantees a reveal
   does — every name it uses exists in the figure (structural), and
   every wedge it lights really measures the value it declares
   (verifyDiagram, on the highlighted variant). A walk state that lies
   about the figure now fails validateQuestion instead of shipping.
   Plus the one rule that only applies here: an `hl` on a part with no
   figure at all is authoring nonsense, and says so.
   --------------------------------------------------------------- */
function validateMemoHighlights(q, issues) {
  const d = q.diagram;
  (q.parts || []).forEach(part => {
    if (!part || !Array.isArray(part.memo)) return;
    const withHl = part.memo.filter(b => b && b.hl !== undefined);
    if (!withHl.length) return;
    const entry = d && d.parts && d.parts[part.id];
    const spec = entry && (entry.spec || d.spec);
    if (!spec) {
      issues.push(`question "${q.id}" part "${part.id}": memo blocks carry \`hl\` but the part has no diagram to draw them on`);
      return;
    }
    part.memo.forEach((block, i) => {
      if (!block || block.hl === undefined) return;
      if (!block.hl || typeof block.hl !== "object" || Array.isArray(block.hl)) return;   // shape already reported
      validateHighlightSet(spec, block.hl, `question "${q.id}" part "${part.id}" memo[${i}].hl`, issues);
    });
  });
}

/* ---------------------------------------------------------------
   SOURCE + INTRO (optional, added 2026-08-22 with the SKILL CARDS
   build — EXAM-SKILLS-BRIEF.md). Absent on every one of the 21 SOURCE
   questions in js/exam/*.js (they stay exactly as composed); present
   on every CARD built out of them by js/exam/_cards.js.

     source  { questionId, partIds[] } — which seeded question this card
             was cut from, and which of its parts it carries. SHAPE ONLY
             here: whether the question id resolves, and whether every
             part id really appears in this card's parts[], is a
             cross-file question and belongs in the harness
             (verify-exam.html Part 12), the same split q.chapter and
             lostQuest already use.
     intro   {en, af?} — the GIVEN information the card's parts lean on
             once they are away from their original question's stem
             ("h is the hyperbola h(x) = 6/(x + 2) + 1…"). Optional: a
             card whose first part already states its own setup gets
             NO intro, so nothing is said twice.
   --------------------------------------------------------------- */
function validateSource(q, issues) {
  const s = q.source;
  if (s === undefined) return;
  const label = `question "${q.id}" source`;
  if (!s || typeof s !== "object" || Array.isArray(s)) { issues.push(`${label}: must be a { questionId, partIds } object`); return; }
  if (!isNonEmptyString(s.questionId)) issues.push(`${label}.questionId: missing or empty`);
  if (!Array.isArray(s.partIds) || !s.partIds.length) { issues.push(`${label}.partIds: must be a non-empty array of part ids`); return; }
  s.partIds.forEach((pid, i) => {
    if (!isNonEmptyString(pid)) issues.push(`${label}.partIds[${i}]: must be a non-empty string`);
  });
}

function validateIntro(q, issues) {
  if (q.intro === undefined) return;
  const label = `question "${q.id}" intro`;
  isTextPair(q.intro, label, issues);
  glyphIssues(q.intro, label, issues);
}

/* The one function both a future seeding session and this build's harness
   (verify-exam.html) import — checked in exactly one place, per the
   brief, so the two can never drift apart. Returns {ok, issues}. */
export function validateQuestion(q) {
  const issues = [];
  if (!q || typeof q !== "object") return { ok: false, issues: ["question is missing or not an object"] };

  if (!isNonEmptyString(q.id)) issues.push("question: missing id");
  if (!isNonEmptyString(q.chapter)) issues.push(`question "${q.id}": missing chapter`);
  if (!isNonEmptyString(q.topic)) issues.push(`question "${q.id}": missing topic`);
  if (!isNonEmptyString(q.archetype)) issues.push(`question "${q.id}": missing archetype tag`);
  if (typeof q.marks !== "number" || q.marks <= 0) issues.push(`question "${q.id}": marks must be a positive number`);

  if (!q.lostQuest || typeof q.lostQuest !== "object") {
    issues.push(`question "${q.id}": missing lostQuest {chapter, quest} — the round "I'm lost" reteaches into`);
  } else {
    if (!isNonEmptyString(q.lostQuest.chapter)) issues.push(`question "${q.id}": lostQuest.chapter missing`);
    if (!isNonEmptyString(q.lostQuest.quest)) issues.push(`question "${q.id}": lostQuest.quest missing`);
  }

  if (!Array.isArray(q.parts) || !q.parts.length) {
    issues.push(`question "${q.id}": parts must be a non-empty array`);
    return { ok: issues.length === 0, issues };
  }

  const seenIds = new Set();
  let markTotal = 0;
  q.parts.forEach(part => { markTotal += validatePart(part, q.id, issues, seenIds); });
  if (typeof q.marks === "number" && markTotal !== q.marks) {
    issues.push(`question "${q.id}": parts sum to ${markTotal} marks, but the question is worth ${q.marks}`);
  }

  validateDiagram(q, issues);
  validateMemoHighlights(q, issues);
  validateSource(q, issues);
  validateIntro(q, issues);

  return { ok: issues.length === 0, issues };
}
