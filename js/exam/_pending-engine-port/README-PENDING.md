# `js/exam/_pending-engine-port/` — Euclidean exam modules waiting on two decisions

Created by overnight run #1, stage 3b (2026-08-21).

Two fully-composed Euclidean exam-focus questions live here — Sept T2's Q4 and Q5.
They are **not** in `js/exam/` and they are **not** registered anywhere, because they
are blocked on two things that are not a module writer's call:

## Blocker 1 — the Circle Quest `engine.js` port

`EXAM-FOCUS-PLAN.md` build order step 3: port Circle Quest's `js/engine.js` into Blipwork,
then Euclidean exam questions carry a diagram spec with **per-part highlight flags**
(her design: "find angle A" lights the wedge on angle A; "prove ABCD is cyclic" lights the
four sides).

Both modules already carry their spec, exported and ready:

| File | exports | from |
|---|---|---|
| `euclid-circle-theorems.js` | `specQ4a`, `specQ4b` | `Sept-T2-euclid-specs.md` |
| `euclid-tangents-and-cyclic-quads.js` | `specQ5` | `Sept-T2-euclid-specs.md` |

Those specs are **drafts that have never been rendered** — the print paper's figures are
TikZ. What *has* been checked is the geometry: every `o.v` was derived from the point
degrees by arc arithmetic in `Sept-T2-verify.py`, so `verifyDiagram()` should pass without
any value being nudged.

**Port day must not change:** the degrees (every `v` was derived from them) · the
acute-case placement in Q4(a), D between A and C · C on the major arc in Q5 · Q4(b)'s
12 : 9 : 15 proportions. Adjust only label positions (`o.r`, `o.rot`).

**Two known port-day gaps**, both recorded in the spec document and repeated in the module
headers:

1. `o.mark` draws a chevron, not a right-angle square. Q4(b) needs a square at M.
   Either add a `square` flag to `angleSVG` (additive, opt-in, same pattern as `o.hl`) or
   accept the chevron — but **do not silently ship a chevron for a 90° angle**; Grade 11
   diagrams mark right angles with a square and learners read it as one.
2. Q5(a)'s highlight uses a tangent leg (`"tg-"`). A sits at 62°, so `"tg-"` is the −28°
   direction, the ray from A *towards* T. If the wedge renders on the far side, swap to
   `"tg+"`. `verifyDiagram` catches it: the measured value must be 90, not 270.

## Blocker 2 — the chapter tag

`EXAM-FOCUS-PLAN.md`'s Corrections section (2026-08-21 late night) is explicit: **"NO
Euclidean chapter" was never Megan's ruling.** Circle Quest owns circle-geo *teaching and
drill rounds*; Euclidean **exam questions absolutely belong in Exam Focus**.

But Blipwork today has no Euclidean chapter of any kind:

* `js/config.js` `CHAPTERS` has no `euclid` entry (stats, finance, prob, trig, meas, func,
  tgraph, analytical, pat, exp, eqn — that is all eleven).
* `js/exam/index.js`'s `REGISTRY` has no `euclid` key, and its header still carries the
  struck-through "Euclidean geometry has no key here on purpose" note — **that comment is
  now stale** and contradicts the plan's Corrections section. Worth fixing on the same day.
* So `lostQuest` cannot resolve to anything. Both modules carry the documented placeholder
  `{ chapter: "euclid", quest: "PENDING-no-euclid-chapter" }` — see the module headers for
  why a placeholder beats a wrong target, and for the proof that it degrades safely.

**What registering these two would need, beyond the port:**

1. A decision on the chapter tag itself — a real `euclid` chapter in `js/config.js`
   `CHAPTERS` (which implies quests, an icon, a term, and the hub gate), or some other
   home. This is Megan's call, not a build decision.
2. `js/exam/index.js` — a `euclid` key in `REGISTRY`, plus the stale-comment fix above.
3. `js/config.js` `EXAM_CHAPTERS` — add it, so `examChapterEligible()` lets learners in.
   ⚠️ Note the gate is `EXAM_CHAPTERS includes it AND at least one of its quests is open`.
   A chapter with **no quests** can never satisfy the second half — so either the chapter
   gets real quests, or `examChapterEligible()` needs a documented exception. **This is
   the sharpest edge of the whole Euclidean question and it needs her ruling, not a
   workaround.**
4. `verify-exam.html` Part 6 — a `euclid` scope wall. Proposed, from the paper bank's
   Grade 11 Euclidean wall (four examinable proofs, acute case only; everything else
   use-as-result; no similarity, no concurrency, no proof by contradiction):
   `circle-theorems` · `tangents-and-cyclic-quads`.
5. `verify-exam.html` Part 2 — the pilot-only assertions, as for every other module this
   run produced.
6. The lostQuest-resolves check must either be satisfied by real quests or carry a
   documented exception for these two.

Until all of that lands, nothing in this folder is imported by anything.
