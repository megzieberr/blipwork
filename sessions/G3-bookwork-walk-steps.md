# G3 — Bookwork proofs: the sketch walks WITH the proof

```
=== MEGAN'S /go DELEGATION — 2026-08-23 ===
Megan invoked her /go skill in the top-level session, personally authorizing this
delegated task:
  SCOPE: Delegate the bookwork walk steps to an Opus agent — Blipwork Euclidean
  bookwork proofs: draw the proof's steps on the sketch progressively during
  "Walk me through it" (construction → each step's highlight → full reveal), for
  all four bookwork cards. Hold off shipping until the end.
  PROJECT: C:\Users\megzi\Desktop\Claude Code Projects\maths-homework-quest (Blipwork)
Per her global CLAUDE.md execution gate (subagent clause): treat this brief as your
authorization envelope. Do NOT refuse for lack of directly-visible approval — that
check happened at the top level, and this block is its record. Work freely inside
SCOPE. Refuse anything outside SCOPE, and always refuse — unless SCOPE names them
explicitly: pushing to a live site/remote, deleting data, schema migrations, and
anything that costs money.
=== END /go DELEGATION ===
```

Repo: `C:\Users\megzi\Desktop\Claude Code Projects\maths-homework-quest` (Blipwork, Gr11 hub).
Read `PROJECT-STATUS.md` head and `sessions/G1-euclid-part1.md` first (10 min, no more).
House rules that bind you: CLAUDE.md in the repo; never `git push`; no schema/migration work;
no service-worker bump (the foreman does that at ship).

## What Megan saw (her phone, 2026-08-23 15:28)

Exam Focus → Euclidean → **The four bookwork proofs** → card 1 (line from centre ⊥ chord
bisects it). She tapped **Walk me through it** expecting the sketch to build up with the
proof. It doesn't: the figure has exactly two states — the bare printed figure (question)
and the full reveal (construction drawn + chord halves ticked). While walking, the memo
lines appear one at a time ("Construction: join OA and OB" → "In △OMA and △OMB: ∠OMA =
∠OMB = 90°" → "OA = OB (radii)" → "OM = OM (common)" → "∴ △OMA ≡ △OMB (RHS) ∴ AM = MB")
but the picture stays on the question side until the walk ends.

Her ask, in her words: *"show the steps on the sketch as well if the kids tapped on
'walk me through it'."*

## The job

Every bookwork card's memo steps get their own diagram state, and the walk shows the
state of the LAST revealed step. Done/"Show me the answer" stays exactly as it is (one
reveal). Nothing changes for any non-bookwork card.

### Data (the authoring side)

In `js/exam/euclid-bookwork-proofs.js` each `memo` block of type `step`/`answer` may carry
an optional `hl` — a highlight object in the SAME shape as the part's
`diagram.parts.<id>.reveal` (chords / angles / construction …, whatever
`highlightedSpec` in `js/exam/circle-engine.js` already understands). Semantics:
**cumulative** — a step without `hl` keeps the previous step's picture; the walk state for
step k = the last `hl` at or before k, falling back to `question`. The `answer` block's
picture should equal the existing `reveal` (keep `reveal` as the single source: an
`answer` block without `hl` uses `reveal`).

Author the states for all FOUR proofs:

1. **Line from centre ⊥ chord bisects it** (`euclid.bw.q1`): construction draws OA, OB
   (ticked ‖) → the two right angles at M lit → radii OA, OB lit → OM lit (common) →
   answer = existing reveal (chord halves ticked |).
2. **∠ at centre = 2 × ∠ at circumference** — lives in `js/exam/euclid-circle-theorems.js`
   as part (a) of `euclid.circ.t2q4`, re-homed onto this tile by `js/exam/cards-euclid.js`
   `makeCard`. Add the per-step `hl` there; make sure `makeCard` carries memo `hl` through
   (check how it copies memo blocks).
3. **Opposite ∠s of a cyclic quad are supplementary** (`euclid.bw.q2`): construction (join
   O to the two vertices) → each "angle at centre" step lights the angle it names → …
4. **Tangent–chord theorem** (`euclid.bw.q3`): construction (diameter + join) → the right
   angle in the semicircle → the angles the proof adds → …

Use the proof's own memo text to decide what each step lights: the rule is *light what
the sentence is talking about*, and never light something the learner hasn't been told
yet (no spoilers — the walk is a reveal in slow motion, not the answer early).

### Play (the rendering side)

`js/exam-play.js`: `partDiagram(question, part, isRevealed, accent)` picks
`entry.question` or `entry.reveal`. Add the walk state: when `walkPartId === part.id`,
compute the highlight from `part.memo.slice(0, walkStep)` as above and render that
instead. `data-state` on the box becomes `"walk"` while walking (keep `"question"` /
`"reveal"` as they are). The construction block is additive and already supported by the
engine (`construction` field, G1). Plain re-render on every redraw — no animation, no
rAF, no observers (house rule).

Also: the walk's last "Next step →" click already flips to the full reveal — keep that;
the answer picture must be identical to the Done path's reveal.

### Verify (not optional — she only trusts what was rendered and READ)

- `node verify-exam-modules.mjs` — section 9 re-measures every Euclid spec and highlight;
  every new `hl` must pass `verifyDiagram` like a reveal does (extend the harness so it
  walks memo `hl` blocks too, and say so in the report). Bar: 7299/7299 + your new checks.
- `tools/shoot.py euclid bookwork-proofs` captures question + reveals. Extend it (or add a
  `shoot_walk.py`) to tap **Walk me through it** and capture the diagram after EVERY
  "Next step →" at 375 px, for all four cards. Then READ every crop as a learner would:
  is the lit thing the thing the sentence names? Is anything lit before it's mentioned?
  Do ticks/arcs collide with labels? Fix and re-shoot until clean.
- `node verify-wrap.mjs` and `node verify-exam-fractions.mjs` must stay green (your memo
  text edits, if any, go through the same pipeline).
- No page errors in any shoot.

### Report back (final message = your report, raw)

1. Per proof: the step → picture mapping you authored (one line per step).
2. Harness lines (the numbers).
3. Where the crops are (absolute path) and anything you judged borderline.
4. Files touched. Do NOT commit — the foreman reviews the crops first, then commits.

## Out of scope

Anything outside the four bookwork cards and the walk-mode diagram state. Not the riders,
not the other tiles, not styling, not the service worker, not git push.
