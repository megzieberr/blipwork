# SESSION G2 — EUCLIDEAN part 2 (`euclid`): cyclic-quads · tangents · level-4, Opus

Read `sessions/CONTENT-COMMON.md` first (it carries the /go block and every rule), then
`sessions/G1-euclid-part1.md` IN FULL (her design for Euclidean, the chained-sketch recipe,
the notation, the engine reading list — all of it applies to you word for word), then this,
then `EUCLID-ACCEPTABLE-REASONS.md`.

## Split with G1
G1 owns `bookwork-proofs` + `chords-and-angles` and `euclid.circ.t2q4`'s parts. You own
`cyclic-quads` + `tangents` + `level-4` and `euclid.tan.t2q5`'s parts (a, b, c → tangents as
ONE re-homed card via makeCard with an intro; d (level 4) → level-4 via makeCard with an intro
carrying (b)'s and (c)'s results). Between you, `verify-exam.html` Part 12's "every part of
the two seeded questions lands on ≥1 card" must hold. `cards-euclid.js`: rewrite YOUR sections
only; re-read before each write and merge with G1's.

## You own
`js/exam/euclid-siblings-cyclic-quads.js`, `euclid-siblings-tangents.js`, `euclid-level4.js`,
your sections in `js/exam/cards-euclid.js`, your blocks in `verify-exam-modules.mjs`.

## Tile `cyclic-quads` — 6 chained riders (one sketch each, 5–6 parts, levels 1–3)
Theorems in play: opp ∠s of cyclic quad, ext ∠ of cyclic quad, ∠s in same segment, plus
everything from chords/centre. Shapes: a numeric angle-chase ending in "hence prove ABCD is
a cyclic quad" (the converse via `opp ∠s quad supp` — reasons verbatim); an "in terms of x"
chase (Ô₁ = 2x → … → an angle = 180° − 2x); "prove AB ∥ CD" via ext ∠ of cyclic quad + alt
∠s; "name 4 other angles equal to x, with reasons" (the SAG's own rider wording); a
two-circles-sharing-a-chord figure (∠s in same segment across circles); a "which of the
following quadrilaterals is cyclic — and why not the other" reasoning part. Mixed asks:
value+reason / reason only / value only, per G1's recipe. The "prove cyclic" part lights the
FOUR SIDES (`chords`) on both states, per her design note.

## Tile `tangents` — 6 chained riders (incl. the re-homed `tan.t2q5` a–c)
Theorems: tan ⊥ radius, tans from common pt, tan chord theorem (+ ∠s in same segment, ∠ in
semicircle, isosceles from equal tangents). Shapes: a tan-chord numeric chase (the Circle
Quest "Tangent–Chord Quest" shape: tangent STU at T, ∠UTA and ∠STB given → B̂, Â, ∠ATB);
a `2x` / `x + 25°` solve-for-x (tan-chord makes two expressions equal → solve → then the
other angles); two tangents from P with the kite / isosceles fetch; a tangent + diameter
(∠ in semicircle) chase; a tangent ⊥ radius Pythagoras calculation (length of the tangent
from an external point); "prove that PQ is a tangent" is NOT here — it is level 4 (below).

## Tile `level-4` — 6–8 cards (+ the re-homed `tan.t2q5` d)
The bank's hard finishers, fresh: **prove a line is a tangent** (converse tan-chord — "the
house favourite for the hardest geometry mark"); **prove a quad is cyclic with NO angle values**
(all in x and y); the nested-circles "show OT bisects XY then prove a length in terms of r"
(her Test 7 Q3 shape, fresh figure); "prove D̂ = 2x + y"; a two-theorem un-cued proof ending
in `∠ACB = 90° − x/2` style; "prove AB = AC" via tans from common pt + ∠s opp equal sides.
Every card ≥1 level-4 part; lead-ins only where the ★ part depends on them; all parts level
3–4. Each has its own sketch; the reveal lights what the proof is about (a tangent to be
proved lights the line AND the two equal angles).

## Figures
Same rules as G1: arc arithmetic so every wedge measures true (`verifyDiagram` tolerance
1,5°); `ext` for tangent intersections, `tang` for a tangent line at a contact point (both
in the engine header); numbered arcs for unknowns; values written onto the spec for later
parts (`specAfter`); the question side never carries a value the part asks for; the bare
rule for "find x" figures. `python tools/shoot.py euclid <tile>` and READ every state crop —
tangent lines must not run off the canvas, external points must stay inside `w × h`.

## Verify + report: per CONTENT-COMMON.md — shoot all three tiles; contact sheet per tile
with one full rider's question → reveal progression.
