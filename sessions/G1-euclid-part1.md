# SESSION G1 — EUCLIDEAN part 1 (`euclid`): the four bookwork proofs + chords-and-angles riders, Opus

Read `sessions/CONTENT-COMMON.md` first (it carries the /go block and every rule), then this,
then `EUCLID-ACCEPTABLE-REASONS.md` (the SAG short-form reasons — verbatim in every memo).

## Her design for Euclidean today (verbatim intent)
"Give them the sketch and then one question at a time. Let the questions in each round run
on ONE sketch: give the sketch, the first question is to find Ô₁ in that sketch, then the next
question shows Ô₁'s value that was just worked out ON the sketch, and asks another question
about that same sketch. And so on — 5–6 questions on the same sketch, each time adding the
value to the sketch." And, like Circle Quest's adventure rounds: "some rounds give the values
already and only ask for the reason, some give the reason and only ask for the value, others
ask for both." Pen-and-paper + reveal, NOT interactive. No "I'm lost" button (standing ruling;
`lostQuest = { chapter:"euclid", quest:"PENDING-euclid-is-exam-only-no-drill-round" }`).

## Where the chapter stands
Two seeded questions (`euclid.circ.t2q4`: ∠-at-centre bookwork proof + a chord/Pythagoras
calculation; `euclid.tan.t2q5`: tangents + cyclic quad + ∠ in terms of x). Session 0 re-tagged
their cards onto the new tiles as placeholders. READ both modules end to end — they are the
worked examples of the circle spec, highlight sets, the bare-figure rule and the memo style —
and `js/exam/circle-engine.js`'s header (spec fields: `pts`, `O`, `ext` tangent intersections,
`tang` tangent lines, `mid` midpoints, free `{x,y}` points, `chords`, `angles` with `t`/`o.v`/
`o.r`/`o.rot`/`o.mark:"square"`/`o.reflex`, `"tg+"/"tg-"` legs) and its additive extension block
at the bottom (`highlightedSpec`, `diagramRefIssues`, HIGHLIGHT SET shape
`{ angles:[{at,legs,v,t?}], chords:[[a,b]], bare? }`). Also read
`Desktop\Eksamen Vraestelle\Gr11 IEB Nov\Sept Practice\Sept-T2-euclid-specs.md` (how specs
were derived by arc arithmetic).

A sibling session (G2) builds cyclic-quads · tangents · level-4 at the same time. You own the
two tiles below and the re-home of the two seeded questions' parts that belong to them.

## You own
`js/exam/euclid-bookwork-proofs.js` (new), `js/exam/euclid-siblings-chords-and-angles.js` (new),
`js/exam/cards-euclid.js` (rewrite the bookwork-proofs and chords-and-angles sections; leave
G2's tangents / cyclic-quads / level-4 sections — append-safe: if the file changes under you,
re-read and merge), your blocks in `verify-exam-modules.mjs`. Do NOT edit
`euclid-circle-theorems.js` / `euclid-tangents-and-cyclic-quads.js` (source of truth; cut them
with `makeCard`). `verify-exam.html` Part 12 still asserts every part of those two questions
lands on ≥1 card — between you and G2 that must hold (you: circ.t2q4 a, b1, b2; G2: tan.t2q5).

## Tile 1 — `bookwork-proofs` (4 cards, one per examinable proof, acute case)
1. **Line from the centre ⊥ a chord bisects the chord** (construction: join the radii OA, OB;
   congruent triangles RHS). 5 marks.
2. **∠ at centre = 2 × ∠ at circumference** — re-home `euclid.circ.t2q4` part a via makeCard
   (it IS this proof). Don't rewrite it.
3. **Opposite angles of a cyclic quadrilateral are supplementary** (construction: join the
   centre to two opposite vertices; use ∠ at centre twice; angles round a point). 5–6 marks.
4. **Tan–chord theorem** (construction: the diameter from the point of contact; ∠ in
   semicircle; tan ⊥ radius; ∠s in same segment). 5–6 marks.
Each proof card: prompt = the theorem statement as the exam words it ("Prove the theorem
that states…"), `intro` names the given figure and what must be proved; diagram: the figure
BARE on the question side (no angle labels — the learner constructs x/y), the reveal restores
the full labelling and lights the two angles / sides the statement is about. Memo = the exam
proof line by line: construction line (✓), each statement with its SAG reason in italics (✓
where the paper pays), the conclusion. Trap card: "the construction line earns a mark — write
it". Levels: 1 (it is recall) — yes, level 1, that is how the grid classifies bookwork.

## Tile 2 — `chords-and-angles` (6 riders on ONE sketch each, chained)
Riders built on chord/centre/angle theorems only (no tangents, no cyclic-quad proofs — those
are G2's): ∠ at centre, ∠s in same segment, ∠ in semicircle, line from centre ⊥ chord (+
Pythagoras), equal chords equal ∠s, isosceles radii, exterior ∠ of triangle, ∠s on a str line.
Include `euclid.circ.t2q4` parts b1,b2 as ONE of the six (via makeCard with an intro).

THE CHAINED-SKETCH RECIPE (this is the build):
- One `spec` per rider with letters on the points, given values as angle labels
  (`t:"52°"`), and every UNKNOWN angle the parts will ask about drawn as an arc with its
  exam name as label (`t:"1"` at O for Ô₁, the way IEB figures number angles at a vertex —
  `o.r` small so two numbered arcs at one vertex read cleanly).
- Write a helper in the module: `specAfter(base, found)` → a DEEP CLONE of the base spec in
  which each angle named in `found` has its label REPLACED by its value (`"1"` → `"52°"`).
  Part n's entry: `spec: specAfter(base, valuesFoundInParts 1..n−1)`.
- Part n's `question` highlight lights the angle it is about (`angles:[{at, legs, v}]` — v is
  the TRUE value; `verifyDiagram` re-measures it); its `reveal` highlight lights the same angle
  with `t` set to the value (`t:"52°"`), so the reveal writes the answer onto the sketch.
  A "prove AB ∥ CD" or "show OM bisects AB" part lights chords instead.
- Part types, mixed across the six riders: VALUE+REASON ("Determine, with reasons, the size
  of Ô₁"), REASON ONLY ("Ô₁ = 52°. Give a reason." — the value is already on the sketch from
  the first part, so the spec for that part labels it), VALUE ONLY ("Use ∠s in the same segment
  to write down B̂₂"), and the occasional calculation (a chord length by Pythagoras, a radius).
  5–6 parts per rider, marks 1–3 each, levels 1–3 ramping inside the rider. NO level-4 parts
  (those belong to G2's level-4 tile).
- Every number on the figure is REAL: pick point angles on the circle so that every stated
  angle measures exactly (arc arithmetic — inscribed angle = half the arc); `validateQuestion`
  fails the module if a wedge's drawn value is off by > 1,5°. Check with `verifyDiagram`
  yourself before the harness does.
- Notation in prompts/memos: `Ô₁`, `∠ABC`, `B̂` (Unicode combining hat + subscript digits) —
  match the SAG figures. Reasons verbatim from `EUCLID-ACCEPTABLE-REASONS.md`, in italics
  after the statement, each reason its own ✓ where the paper pays for it (IEB: statement ✓,
  reason ✓ — say so in the first trap card of the tile).
- Diagrams-cannot-leak rule: the figure never carries a value a part is asked to find until
  that part is revealed.

## Verify + report: exactly as CONTENT-COMMON.md says — `python tools/shoot.py euclid
bookwork-proofs` and `… euclid chords-and-angles`; read EVERY crop (question state AND each
reveal state): numbered arcs must not overlap, value labels must not sit on lines, the bare
proof figure must show letters only. One contact sheet per tile showing question → reveal
progression for at least one full rider (all its states in a row).
