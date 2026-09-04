# Project status — updated 2026-09-04 (🔧 FIX DAY shipped sw v89: snapshot fractions · method panel · gtrig asks-first · SHIFT tan sweep; both wave-4 digests landed, Analytical UNBLOCKED)

## How this file works (since 2026-08-30)
Head only. The full session-by-session history — every old entry, every old
Decisions list — moved VERBATIM to **STATUS-ARCHIVE.md** on her ask (this
file had hit 280 KB and every session paid to read it). Nothing was deleted;
that archive stays append-only. Keep THIS file short: when an entry here
stops being current, move it to the top of the archive instead of letting
it pile up. Durable laws also live in CLAUDE.md and the auto-memory.

## Where we are
- **Live on sw v89** (2026-09-04, her "ship it"; foreman day, 5 Opus workers
  ≈ 1,25M agent tokens, all four fix rounds + both digests reviewed
  first-hand before committing): 💬 feedback snapshots show stacked
  fractions as ONE readable line in the admin fold; the 📖 method panel
  says the answer once and never opens with it (gtrig F2 + the eq9
  duplication); gtrig's three self-answering recall cards (gt2.wheelWord,
  gt6.threeBoxes, gt6.butWhy) now ASK with blanks and hand the filled-in
  frame back AFTER the answer (new `q.revealAfter` in js/questions.js);
  gt10's nested-fraction decoy is one bar deep (`flipRatio`, same value,
  the classic upside-down error); and ALL learner-visible tan⁻¹/sin⁻¹/cos⁻¹
  notation is gone — the app speaks **"SHIFT tan"** (her ruling; calculator
  key faces stay the real fx-991ZA). ui.js's Escape listener wears a
  typeof-document guard so the node verify-*.mjs harnesses run again.
  Harnesses re-run by the foreman: verify-gtrig 1 043 655/1 043 655,
  verify-dice 146/146, verify-feedback-snapshot 131/131, dice suite green;
  cards read by eye at 375 px. **No SQL today.**
- **Both wave-4 digests are in.** METHODS-analytical.md's Part P now opens
  with her seven 2026-09-04 rulings — the Analytical chapter is UNBLOCKED
  (ag5 mines the surveyed paper-bank mds, ag6 stays, both β routes stay,
  x₂−x₁ formula card, either quad-proof route full marks).
  METHODS-probability.md is NEW: her 41-page Term 3 booklet digested
  (14 ink theory pages, 26 blank exercise pages, NO memo pages, 30 flags;
  transcription spot-checked against rendered pages). The Probability
  chapter waits ONLY on her two answers under Pending.
- Previous ships: sw v88 (2026-09-03 feedback day: calc memory, q2 snap
  fix, feedback snapshots, migration applied+verified), v87 (cookie hint),
  v86 (methods day). 12 hub chapters + 2 exam-only; 🎲 dice on 8 chapters;
  📝 Exam Focus 7 chapters / 360 cards; 🔔 notifications LIVE (kids not
  opted in); roster 20, megzieberr visible in the picker by her ruling.
- 🧮 Calculator: Blipwork is the MASTER copy; Stats Quest copies
  js/calculator.js verbatim (its sw v10 matches v88's calc-memory build).

## Decisions (append-only; entries before 2026-08-30 are in STATUS-ARCHIVE.md)
- 2026-08-30 (hers): **the game outside Exam Focus must be playable on the
  phone alone — guided discovery, puzzles, "not feel like they are actually
  doing math". Exam Focus stays the pen-and-paper place.** This is the bar
  every future round is audited against.
- 2026-08-30 (hers): intense multi-step questions get SPLIT into build-steps
  ("so the kids actually build the questions, not try to do everything in
  their head") — t3–t7 done that day under it.
- 2026-08-30 (hers): dead-code deletions were delegated to the auditor's
  judgment; PROJECT-STATUS.md is head + archive from now on.
- 2026-08-30 (mine, flagged): tokenpad frames may stack any single-"/" side
  as a fraction and wrap sides only before a sign; `_trig.js` shuffles are
  seeded. Both follow existing laws rather than making new ones.
- 2026-09-02 (hers): methods-day queue approved (fix batch + worked
  methods), foreman dispatches the workers, and "ship it" at the end.
- 2026-09-02 (mine, flagged): Escape-to-close = a synthetic click at the
  scrim, so it can never disagree with the background tap; verify-dice's
  tokenpad piece-count splits on ANY whitespace (the pad joins with U+2009
  THIN SPACE — invisible in an editor, lost in copy-paste); np6 +
  concepts.js rewritten under her standing Gr11 Tₙ = an + c ruling.
- 2026-09-02 evening (hers): cookie hint approved ("yes go ahead, and add
  the hub dot too") — this reverses the BADGE half of the 08-08 "no cookie
  badge on the hub" line; feeding still lives only in the room.
- 2026-09-02 evening (mine, flagged): the bubble stays visible when
  groceries are on the tray — a kid feeding groceries but never the cookie
  is exactly the hint's audience. Cost: bubble clips ~7px of the 5th mood
  heart in that state, and with a 20+ char nickname clips the wrapped name
  tail (that long-name overflow predates this change). Her call if she
  wants it polished or the bubble suppressed on a loaded tray instead.
- 2026-09-03 (hers): feedback day approved off the kids' first real notes —
  calc memory build, q2 dig+fix, snapshot plan+build, then "ship it".
- 2026-09-03 (mine, flagged): a feedback snapshot is CONTENT, not identity —
  stored for anonymous notes too, same law as `context`; the capture strips
  name-bearing chrome AND strikes the learner's own name/username out.
- 2026-09-03 (mine, flagged): calculator state persists until page RELOAD
  (like a real fx-991ZA put down); no reset between questions, and on a
  shared device the next kid may see the previous kid's arithmetic — judged
  harmless, same as sharing a physical calculator.
- 2026-09-04 (hers): **q2's parabola always-turning-point repetition STAYS**
  — "it's a good skill to practice".
- 2026-09-04 (hers): **the app WRITES no inverse-trig notation.** Questions,
  hints, cards and memos say "SHIFT tan" — the words they say in class;
  the inverse step is never written in working ("too many fights with
  teachers over this"). Calculator key faces keep the real fx-991ZA
  labels. Any tan⁻¹ returning in learner-visible text is a regression.
- 2026-09-04 (hers): all seven open analytical flags ruled — recorded at
  the TOP of METHODS-analytical.md Part P (a build session reads that block
  first); ag5's perpendicular-bisector content draws question shapes from
  the surveyed paper-bank mds, never re-opening the paper PDFs.
- 2026-09-04 (hers): gt6.butWhy gets the same ask-then-confirm treatment
  as the two F1 recall cards.
- 2026-09-04 (mine, flagged): new `q.revealAfter` = teaching frames held
  back to the feedback panel; the method panel keeps its "Answer:" header
  only when the method is stepless. Side effect surfaced to her and kept:
  the five stats calcdo panels are now pure key-press recipes — the value
  is read off the learner's own calculator.
- 2026-09-04 (mine, flagged): ui.js's Escape listener is guarded with
  `typeof document !== "undefined"` — every node harness imports ui.js via
  _shared.js and had crashed since d736522.

- 2026-09-04 evening (hers): **Probability follows the SAG + the IEB memo
  methods** ("I just follow the SAGs and memo methods"); no booklet memo
  exists, the app computes its own answers; "given that" is laid out the
  way the memos do it. Prep before build: one page-cited read of the SAG
  section + the surveyed papers' probability memo pages into
  METHODS-probability.md.
- 2026-09-04 evening (hers): the learner's swipe-back request is approved
  for build (one Opus worker, graph-quest, sync + ship on her word).
- 2026-09-04 evening (mine, flagged): swipe-back is a visible "◀ Vorige"
  button, not a swipe gesture (a swipe fights the drag controls and the
  phone's edge-swipe); the finished screen is KEPT and shown inert, never
  re-rendered, so she sees the option she tapped and the feedback she got.

## ⏳ Pending on Megan
(one close-and-reopen does it all — v89 carries every earlier version's changes)
- 📱 5 min [whenever]: close + reopen Blipwork twice (sw v89) → roll a
  gtrig round — the bow-tie / three-boxes / but-why cards should ASK
  (blank "?" corners) and hand the filled frame back after you answer;
  then tap 📖 on an eq9 question — the answer reads once, not twice.
- 📱 3 min [whenever]: open Angle of inclination (ag4) and one 2D-trig
  chain — hints should say "SHIFT tan/sin/cos" everywhere, no ⁻¹ outside
  the calculator keys.
- 📱 2 min [whenever]: send yourself a 💬 note from inside a fraction-heavy
  question (Fun Functions fn1 is ideal) → the admin fold shows the
  fraction on ONE line. (The v86–v88 spot-checks — calc memory, cookie,
  six split-day chains — are still unticked if you want them.)
- 💬 [whenever]: all of C.M.'s notes are read and answered in person (she
  confirmed 2026-09-04 evening). ONE unread note remains: the anonymous
  2026-09-04 10:12 UTC swipe-back request from funfun:qK, which is being
  built; mark it read once it ships.
- 🌐 1 line [your call]: megzieberr is still visible in the class
  name-picker — say the word and I hide it (one SQL line, reversible).

## Next up
- **Analytical Geometry dice chapter — UNBLOCKED.** Digest + her seven
  rulings sit in METHODS-analytical.md; ag5 mines the paper-bank mds.
  Needs a build day on her word.
- **Fun Functions swipe-back (BUILT + foreman-reviewed in graph-quest, NOT shipped).** Learner request
  2026-09-04: look back at the previous question after Next. Design: a
  "◀ Vorige" button (no swipe gesture), finished screens kept as-is and
  shown inert in a review sheet; live question untouched. One Opus worker
  in graph-quest; then tools/sync-to-blipwork.py + blipwork sw v90 +
  graph-quest gq-v34 on her "ship it".
- **Probability dice chapter — UNBLOCKED, one prep step first.** Her rulings
  sit at the TOP of METHODS-probability.md with the file pointers: a worker
  digests the SAG's Gr11 Probability section + the surveyed papers' memo
  working (page-cited) into that file, THEN the build day. Both on her word.
- **verify-store drift** (pre-existing, measured at HEAD too): the bodies
  of mhq_get_state / mhq_credit_cq / mhq_cq_link differ between their
  migration files and schema.sql's mirror-back. Its own small tidy
  session before the next database day.
- Remaining wave-4 blockers: Measurement (engine ruling), Trig Graphs
  (Soek-die-fout mechanic landing in graph-quest first).
- (carried) CRON_SECRET tidy-up offer; banked play.js method-link gate
  (render 📖 only once a chain is finished — when it lands, delete the
  `q.type !== "steps"` clauses in dice-gtrig.js AND dice-trig.js).
- Stale nits, one small pass: dice-gtrig.js's header says "the 48 chains"
  (the pool holds 32); verify-dice-exp prints its ALL GOOD line twice;
  verify-feedback-papers still asserts ship-day states from v68 (4 stale
  fails: flags asserted false, sw asserted v68, one FAB-geometry probe);
  gt2's wrong path prints a lone "Cash" solution step (solSteps keeps the
  answer-only step when answerLabel ≠ correct).
