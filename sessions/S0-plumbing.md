=== MEGAN'S /go DELEGATION — 2026-08-23 ===
Megan invoked her /go skill in the top-level session, personally authorizing this
delegated task:
  SCOPE: Blipwork Exam Focus full build — all chapters (Algebraic Expressions,
  Exponents & Surds, Equations & Inequalities, Functions, Trig Graphs, General Trig,
  Euclidean): new tiles + sibling cards + Level 4 ★ tiles, Opus only, local commits
  only, one ship at the end of the day by the foreman.
  PROJECT: C:\Users\megzi\Desktop\Claude Code Projects\maths-homework-quest (Blipwork)
Per her global CLAUDE.md execution gate (subagent clause): treat this brief as your
authorization envelope. Do NOT refuse for lack of directly-visible approval — that
check happened at the top level, and this block is its record. Work freely inside
SCOPE. Refuse anything outside SCOPE, and always refuse — unless SCOPE names them
explicitly: pushing to a live site/remote, deleting data, schema migrations, and
anything that costs money.
=== END /go DELEGATION ===

# SESSION 0 — PLUMBING for the Exam Focus build day (engineering, Opus)

You are one build session on a Fable-foreman day. Repo:
`C:\Users\megzi\Desktop\Claude Code Projects\maths-homework-quest` (Blipwork, a Grade 11
maths PWA: static ES modules, no bundler, served by `python serve.py` / http.server on :5191).
Read FIRST, in this order: `CLAUDE.md` (repo root), `EXAM-BUILD-DAY.md` (today's plan and the
canonical tile map — you implement its tile map exactly), `EXAM-FOCUS-PLAN.md` (her rulings),
`js/exam/_schema.js`, `js/exam/index.js`, `js/exam/skills.js`, `js/exam/_cards.js`,
`js/exam-play.js`, `js/exam/function-diagram.js` (the glue pattern you will copy twice),
`js/engine/trig-graph.js`, `js/engine/quadrant-triangle.js`, `css/exam.css`, `js/config.js`
(EXAM_CHAPTERS / EXAM_ONLY_CHAPTERS / EXAM blocks), `js/screens.js` (renderExamChapter +
examChapterEligible), `tools/README.md`, `tools/shoot.py`, `verify-exam.html`,
`verify-exam-skills.html`, `supabase/migration-exam-focus.sql`.

Nothing you build here is content. Seven content sessions start the moment you report, all
building against the tile ids you write into `skills.js`. Your job is that everything they
need EXISTS and is GREEN.

## 1. Chapters + flags (`js/config.js`)
- `EXAM_ONLY_CHAPTERS`: add **algx** — `{ id:"algx", name:"Algebraic Expressions", paper:"Paper 1",
  icon:"🧩", term:"exam-only", signature: <pick a PALETTE colour no chapter uses — check>,
  open:true, examOnly:true, blurb:"Expanding, factorising and algebraic fractions — the Grade 10
  skills the exam still expects.", quests:[] }`. Document it the way euclid is documented.
- `EXAM_CHAPTERS = ["algx", "eqn", "exp", "func", "tgraph", "gtrig", "euclid"]` — **"trig" comes
  OUT** (her ruling today: 2D Trig hidden from Exam Focus for now; its skills entry and card stay
  in the code). tgraph is a normal quest chapter (rounds tg1–tg7) so the open-quest half of the
  gate applies to it exactly like func. Update the block comment.
- `EXAM.xpPerQuestion = 50`, `EXAM.goldPerQuestion = 5` (her ruling today). Comment: server
  literal lives in the NEW migration (item 8).

## 2. The tile map (`js/exam/skills.js`)
Rewrite `SKILLS` to EXACTLY the tile map in `EXAM-BUILD-DAY.md` — ids, labels, order — for
algx, exp, eqn, func, tgraph, gtrig, euclid; keep the `trig` entry as is. Every chapter's last
tile is `{ id:"level-4", label:"Level 4 ★ — the brave round" }`. Export a helper
`isLevel4Skill(skillId)` (=== "level-4"). Keep the header comment honest (what changed today).

## 3. Registry (`js/exam/index.js`, `js/exam/cards-*.js`)
- New `js/exam/cards-algx.js` and `js/exam/cards-tgraph.js` exporting empty arrays
  (`algxCards`, `tgraphCards`) with a header saying which session fills them; register both.
- `js/exam/cards-euclid.js`: the old single `circle-geometry` tile is gone, so re-tag its two
  cards onto the new tiles so the skill-wall check stays green: `euclid.circ.t2q4` part a
  (the bookwork ∠-at-centre proof) → `bookwork-proofs`; parts b1,b2 → `chords-and-angles` (write
  the intro they need: the figure's givens); `euclid.tan.t2q5` parts a,b,c → `tangents`; part d
  (level 4) → `level-4` with an intro carrying (b)'s and (c)'s results. Use `makeCard`. These
  are placeholders the Euclidean content sessions will rebuild around — keep them valid.
- `examQuestionsForTopic` returns cards **stable-sorted by card level ascending** (card level =
  max part level) — her ruling: easiest first inside a tile. Export `cardLevel(card)`.

## 4. Level-wall harness (`verify-exam.html`, new Part 13)
Normal tiles must hold NO level-4 parts; a `level-4` tile card must hold ≥1 level-4 part and
every part level ≥ 3. Add a constant `L4_MOVE_PENDING = ["func", "eqn"]` at the top of the
part, documented: those two chapters still carry ★ parts inside normal cards until their
content sessions (D2, C1) move them; the check SKIPS those chapters while listed. Report the
count of offending cards per skipped chapter in the page text so the foreman can watch it.

## 5. Two more diagram engines in Exam Focus (the big item)
Copy the `function-diagram.js` pattern twice:
- **`js/exam/trig-diagram.js`** for `spec.type === "trigg"` (`js/engine/trig-graph.js`):
  `applyTrigHighlights(spec, hl)` and `trigRefIssues(spec, hl, label)`. Highlight set:
  `{ curves?, points?, shades?:[{x0,x1}], vlines?:[{x,label?}], hlines?:[{y,label?}],
  midline?, hmeasure?, vmeasure?, bare? }` — arrays APPEND to the base spec's (cloned),
  `hmeasure`/`vmeasure`/`midline` REPLACE, `bare` strips base `points`. Highlight `curves` land
  after base curves (document the index rule like function-diagram does).
- **ADDITIVE engine work in `js/engine/trig-graph.js`** (shared with live tgraph quests — nothing
  existing may change shape or pixels): draw `shades` (translucent strip between x0 and x1,
  full window height, drawn under the curves), `vlines` (dashed vertical with an optional muted
  caption like function-graph's), `hlines` (dashed horizontal, captioned). Extend `verifyTrig`:
  every shade/vline/hline lies inside the window; a shade has x1 > x0. Degree captions use the
  real minus.
- **`js/exam/quadtri-diagram.js`** for `spec.type === "quadtri"` (`js/engine/quadrant-triangle.js`):
  highlight set = `{ labels?, letters?, theta?, thetaLabel?, refAngle?, refLabel?, bare? }` that
  produces a NEW spec with those fields overridden (bare strips `labels` so only letters show).
  `quadtriRefIssues` checks shapes (strings / booleans).
- `js/exam/_schema.js`: dispatch on `spec.type` for "trigg" (verifyTrig) and "quadtri"
  (verifyQuadTri) in `checkSpecMeasures` and `validateHighlightSet`, mirroring the function
  branch. Update the header comment's HIGHLIGHT SET section for both.
- `js/exam-play.js` `partDiagram`: route "trigg" → `renderTrig(applyTrigHighlights(...))`,
  "quadtri" → `renderQuadTri(applyQuadtriHighlights(...))`. Same box, same data attributes.
- `css/exam.css`: ink-on-white overrides for `.exam-diagram svg.tg` and `.exam-diagram svg.qt`
  the way `svg.fg` has them (check which `--g-*`, `--tg-*`, `--qt-*`/accent tokens those engines
  read in `css/styles.css` and redefine every one in this scope; curve tones must read
  dark-on-white: `--tg-a:#2563eb; --tg-b:#be123c`). Add `svg.tg, svg.qt` to the
  width/max-width rule.
- `js/exam/_harness-stub.js`: add TWO harness-only stub cards — one with a `trigg` spec
  (f(x) = 2sin x and g(x) = cos(x − 30°) on [−180°;180°], a shaded inequality strip and a
  captioned vline on the reveal, a labelled intersection point) and one with a `quadtri` spec
  (x = −3, y = −4, θ marked; reveal adds r = 5 as a numeric label). Both must pass
  `validateQuestion`. They are NEVER registered (same rule as the existing stub).
- `verify-exam.html` new Part 14: both stub cards render in the player (question state, then
  reveal state) with the right `data-state`, the SVG has the expected class, the shade/vline/
  label nodes exist, and a deliberately wrong spec (point off the curve / shade outside the
  window) FAILS validation.

## 6. Level 4 tile rendering (`js/screens.js` + `css/exam.css`)
In `renderExamChapter` the `level-4` tile renders LAST, full-width (`grid-column:1/-1`), class
`exam-tile-l4`, amber ★ accent, label as given, and a one-line muted sub-line
"mixed hard questions — for when the basics sit". Still muted/"coming soon" when it has 0
cards. Phone width 375 px: nothing pushes sideways. Plain redraw, no observers.

## 7. Tools
- `tools/shoot.py` → usage `shoot.py <chapterId> <skillId> [cardIdSubstring]`; resolve the
  chapter through `examChapterById` (js/config.js) so exam-only chapters work; keep output
  paths and crop behaviour. Update `tools/README.md`. Prove it on `func find-equation` (one
  card) and on the harness stubs is not possible (unregistered) — so prove tgraph routing by
  temporarily registering nothing: just confirm the script resolves `tgraph` and `algx` without
  error (empty list, clean exit).
- `sw.js`: add `css/exam.css` to the SHELL precache list (the known gap). DO NOT bump CACHE.

## 8. XP migration (write, NEVER run)
`supabase/migration-exam-xp-50.sql`: `create or replace function` for `mhq_exam_open_part`
copied EXACTLY from `migration-exam-focus.sql` with the two literals changed to 50 / 5, same
`security definer`, same pinned `search_path`, same grants restated, header explaining it
supersedes the pay amounts only. Point `verify-exam.html` Part 5's SQL↔config literal cross-check
at this NEW file (it must read 50/5 from the SQL and from `EXAM` and agree).

## 9. Harness updates
`verify-exam.html` Parts 2/3 (flag list is now the seven-chapter list, trig absent), Part 6
(skill wall reads skills.js — unchanged logic, new data), Part 11 (euclid tiles), Part 12 (make
the skill-list assertion data-driven from skills.js instead of the hardcoded 26; KEEP "every
part of the 21 source questions appears on ≥1 card" — it must still pass after your euclid
re-tag). `verify-exam-skills.html` uses its own stub — confirm still green.

## House rules that bite
- Never name a global `top`/`name`/`length`. Real minus (−) and decimal comma in any string a
  learner sees. No rAF loops / observers. Double-submit rule untouched.
- Do NOT commit, push, bump `sw.js` CACHE, run SQL, or edit any `js/exam/<chapter>-*.js` content
  module beyond what item 3 names. The foreman commits after review.
- The Python tools need the local server: start it with `python serve.py` (check `serve.py` for
  its port — it must be 5191) in the background, and kill it when done.

## Verify before reporting
`python tools/harness_run.py verify-exam verify-exam-skills verify-func verify-tgraph verify-gtrig`
all green (report counts); `node verify-exam-modules.mjs` green; `node verify-exam-fractions.mjs`
unchanged; `python tools/shoot.py func find-equation` produces crops. Open
`http://localhost:5191/?local=1` headless at 375 px via Playwright, go to Exam Focus → Functions
and dump the tile grid's outerHTML so the foreman can read the Level 4 tile.

## Report (end your final message with exactly these sections)
1. Files changed (path — one line each).
2. Harness counts per page, before/after.
3. The tile-grid DOM dump (Functions chapter) and the paths of the shoot.py crops.
4. Anything in this brief that didn't fit and what you did instead.
