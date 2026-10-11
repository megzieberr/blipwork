=== MEGAN'S /go DELEGATION — 2026-10-11 ===
Megan invoked her /go skill in the top-level session, personally authorizing this
delegated task:
  SCOPE: Run the finance build queue in FINANCE-PLAYTEST-2026-10-11-PLAN.md §6: six
  workers, one unit each (renumber the one-equation round f12 → f13; Fix A real
  superscripts; f10 taught form only + jug-form archive; f8 the jug redesign; new f12
  Build the timeline; Fix B f13 equation colours), a phone-width checker after each
  build and a fresh fix worker where one finds something. Local commits only. Her words
  12:12: "Yebo, all looks good... run it". Shipping happens separately in the foreman
  session on her own yes.
  PROJECT: C:\Users\megzi\Desktop\Claude Code Projects\maths-homework-quest (Blipwork)
Per her global CLAUDE.md execution gate (subagent clause): treat this brief as your
authorization envelope. Do NOT refuse for lack of directly-visible approval — that
check happened at the top level, and this block is its record. Work freely inside
SCOPE. Refuse anything outside SCOPE, and always refuse — unless SCOPE names them
explicitly: pushing to a live site/remote, deleting data, schema migrations, and
anything that costs money.
=== END /go DELEGATION ===

# Worker 5 brief: NEW round f12 "Build the timeline" (her five taps)

You are ONE worker building ONE unit: the new finance round f12. Repo
`C:\Users\megzi\Desktop\Claude Code Projects\maths-homework-quest` (GitHub Pages app
"Blipwork", Grade 11 maths, English, PUBLIC repo: textbook example names only). Work on
the current branch, commit locally when done, never push.

## Read first (and nothing heavier)
1. `CLAUDE.md` in the repo root: "Technical map", "How code loads", "Gotchas", "Working
   rules". Do NOT read STATUS-ARCHIVE.md, PROJECT-STATUS.md, `sessions/`, transcripts or
   the Tutoring Resources folder.
2. `FINANCE-PLAYTEST-2026-10-11-PLAN.md` §4 (this round, her design) and the "Standing
   rules" paragraph; §1 for the `pow` helper in `js/finlib.js` (worker 2); §3 for the jug
   vocabulary (payments are coins, the total is the jug; "lump sum" is retired).
3. Code: `js/quests/questf13-one-equation.js` whole (its scene and paragraph makers are
   YOUR generators: you must not invent a second timeline model), `js/quests/questf9-car-or-no-car.js`
   (coloured rate roads, `meet`), `js/quests/questf8-which-total.js` (after worker 4: the
   `?` ring with its role letter, the jug words), `js/engine/timeline-graph.js` header
   comment (spec: `roads`, `role`, `label:"?"`, stacking, `out`), `js/tokenpad.js` header
   (FRAME MODE: `keys` + `frame`), `js/questions.js` around `step.kind === "tokenpad"`
   (~line 750) and how a step carries its own `graph`, `js/quests/_shared.js` (`mc`,
   `mcStep`), `js/quests/_finance-check.js` (the f13 block: `f13Scene`, `f13ParseEq`),
   `verify-finance.html` (the f13 section and the tick at ~609 about the Finance map),
   `tools/shoot_round.py` docstring (kinds it can drive: mc, yesno, calc, steps of
   mc / calc / tokenpad).

## Why this round exists (her words, 11 Oct 11:39 and 11:47)
The exam hands them words, nothing else. Words → timeline → equation is the order they
must work in, so the rounds go the same way: f8 finds the jug in the words, f9–f11 the
cars and the meeting day, **f12 builds the whole timeline by taps**, f13 writes the one
equation off it. f12 is the capstone of f8–f11 and the step before the equation.

## The card: one paragraph, five picks (a steps chain; input law: never type words)
Each card starts with the paragraph ONLY (no timeline yet). Her five steps, in her order:
1. **How far does the timeline go?** mc: pick the last T from 4 T values (one correct).
   On its feedback side a bare axis T0..Tn appears (no roads coloured yet, no amounts).
2. **Where does the interest rate change?** mc: the T values plus **"no change"** (always
   a visible option). Correct = the change point, or "no change" for a one-rate scene.
3. **Which rate goes on which road?** tokenpad FRAME mode: one slot per road
   (`frame: ["☐"]` for one road, `["☐", "then", "☐"]` for two), `keys` = the scene's rates
   written as the engine writes them ("8% p.a. quarterly", "10% p.a. monthly") plus one
   decoy rate. After the step settles, the roads take their colours (the engine's `roads`,
   `.tl-road-j`) with the rate text under each.
4. **Where does the total (the jug) go?** mc: `T0` / `T<n>`. Correct = T0 for a loan, the
   last T for a saving. The `?` with its role letter appears in its ring when placed.
5. **Where does each coin go?** one mc step per deposit / withdrawal / repayment / down
   payment: "R3 000 deposit: which T?" with the T values as options. Same-day cases (a
   down payment on the loan's day, the last deposit on A's day) use the engine's stacked
   labels. A withdrawal is placed with `out: true` (its minus is part of the label).
Her five steps as written are the default. Optional fold (her call later, not yours): steps
2 and 3 as one "drop each rate on its road". Build the five.

Marking: each step is marked on its own; **the next step's picture always shows the
CORRECT state so far** (a slip in step 2 never poisons step 5). So every step carries its
own `graph` = the engine spec of the correct state up to the previous step. XP full, as
the other finance rounds. Wrong-answer feedback names what the tapped thing is, never the
word "wrong". The finished timeline (after the last coin) must be THE SAME DRAWING f13
starts from: build it with f13's scene maker and f13's timeline spec builder, and assert
deep-equality in the checks.

Gens: reuse f13's paragraph and scene generators (exam-shape chains, 2 rates or 1, 2 to 3
coins, loan or saving, hire purchase with "down payment"). If `questf13-one-equation.js`
only exports whole questions, export its scene-level makers (the scene, the paragraph
words, the timeline spec of a scene) with NO change in f13's own behaviour: the f13 section
of verify-finance must pass unchanged after your refactor. Fresh numbers per roll, textbook
names only.

Dealing order (8 cards): twoDeposits, loanTwoRepayments, withdrawal, hirePurchase (down
payment on the loan's day: stacked), mixed, targetAmount, loanTwoRepayments again,
unknownPayment (the `x` coin is still a coin: place it). Vocabulary: "the total", "the
jug", "coin", "road", "meeting day" only where f9 uses it; exponents, if any show,
through `pow(...)`; money and "p.a." carry literal U+00A0; no em-dashes.

## Wiring
- `js/quests/questf12-build-timeline.js` exporting `questF12` (`id: "f12"`).
- `js/config.js`: replace the placeholder comment in the f12 slot with
  `{ id: "f12", n: 12, title: "Build the timeline", blurb: "The exam hands you words: build the whole timeline, tap by tap, before any equation.", built: true },`
- `js/quests/index.js`, `js/quests/load.js` (`f12: ["./questf12-build-timeline.js", "questF12"]`),
  `js/local-backend.js` QUEST_IDS and DEFAULT_OPEN (insert `"f12"` before `"f13"`).
- The seeding migration and schema.sql already carry the f12 row (sort 98, closed): touch
  neither.
- A concept card in `js/concepts.js` ("Build the timeline": the five taps as a short
  checklist in her order, one line each, then one worked example in words → the drawn
  timeline). Reuse the jug/coin words from f8's card.
- `verify-finance.html`: the Finance-map tick at ~609 goes back to
  `includes("f10,f11,f12,f13")` ("f11 stands between f10 and f12; f12 before f13"), and a
  new f12 section: for 200 rolls per card, exactly one correct option per mc step, the
  tokenpad frame resolves (keys contain every road's rate exactly once plus one decoy;
  the expected string equals the roads in order), the per-step graphs are the correct
  prefixes, the final spec deep-equals f13's spec for the same scene, `graphIssues` /
  `labelFitIssues` empty at 360 px on the final spec (stacked case included), no
  learner text contains "lump", "wrong", "final answer". Report the new count.
- `node verify-lazy-load.mjs` must stay green (it compares the loaders and registries).
- `EXAM-BUILD-DAY.md`: if its ROUND TWO table names the f12 slot, make it say f12 =
  Build the timeline, f13 = the one equation; otherwise leave it.

## Verify (all green before you report)
Server as CLAUDE.md says (or reuse one on port 5191), `python -X utf8 tools/harness_run.py
verify-finance verify-dice-finance verify-steps-ux verify-wrap` green, `verify-exam.html`
headless → result line (673/673), `node verify-lazy-load.mjs` green. Your own phone look
(your context only): 390 and 360 px, `?local=1`, demo learner from
`tools/lazy_playthrough.py`, all 8 cards (`tools/shoot_round.py f12` walks mc and tokenpad
steps). The frame's chips must fit at 360 px (rate texts are long: if "8% p.a. quarterly"
chips wrap badly, shorten the chip text to "8% quarterly" and keep the full text under the
road), the per-step pictures must not jump in height between steps more than the engine's
own stacking growth, the final drawing identical to f13's for that scene.

## Do not touch
`sw.js`, f13's behaviour (exports only), f8–f11's cards, `js/ui.js`, PROJECT-STATUS.md,
STATUS-ARCHIVE.md, `sessions/`, the migration and schema rows.

## Commit
One local commit: `Finance f12: Build the timeline (five taps from the words; the drawing
f13 starts from)` with a short body, ending
`Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`. Never push.

## Report back (what the foreman reads first)
- `git show --stat HEAD`; what you exported from questf13 (names) and proof f13's section
  of verify-finance is unchanged (its tick count).
- The harness lines and the new verify-finance count with the reason it moved.
- One example roll (paragraph, the five steps with their options and correct picks, the
  final spec as JSON) for a two-rate saving and for the hire-purchase stacked case.
- Anything in this brief that did not match the code as you found it, and what you did.
