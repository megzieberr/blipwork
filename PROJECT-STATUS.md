# Project status — updated 2026-10-17 00:25 (🚀 sw v97 LIVE `5cf9433`: hub tabs = Paper 1 / Paper 2, the hidden AF switch (S1) and the S2 tools; 🇿🇦 Afrikaans routine nightly from Sun 18 Oct, S1–S2 done; f8–f13 live CLOSED, she opens each from the admin page as she teaches it)

## How this file works (since 2026-08-30)
Head only. The full session-by-session history — every old entry, every old
Decisions list — moved VERBATIM to **STATUS-ARCHIVE.md** on her ask (this
file had hit 280 KB and every session paid to read it). Nothing was deleted;
that archive stays append-only. Keep THIS file short: when an entry here
stops being current, move it to the top of the archive instead of letting
it pile up. Durable laws also live in CLAUDE.md and the auto-memory.

## Where we are
- **🚀 Sat 2026-10-17 00:18: sw v97 LIVE (`5cf9433`): HUB TABS = PAPER 1 / PAPER 2 (`9ef7f91`), plus the AF
  queue's S1 (hidden language switch) and S2 (extract / inject tools, no app code).** The
  Term 3 / Revision pair is gone; each tab lists its chapters in the paper's own order (js/screens.js
  PAPER_TABS: P1 exp, eqn, pat, func, finance, prob; P2 stats, analytical, gtrig, tgraph, trig, meas; an
  unlisted id follows in CHAPTERS order). The chapter `term` field in js/config.js is untouched, nothing
  reads it. Checks: verify-exam 678/678 (new order ticks), verify-wrap 56658/56658, verify-store only its
  6 old dress-lock / care-day failures; hub DOM + render at 375 px: two tabs per row, six cards each, no
  page errors. Shipped on her "ship it now" (00:13): bump commit `5cf9433`, sw_check OK, push `9f073ba..5cf9433`;
  live checks 00:20: live sw.js mhq-v97 on the second poll; sw.js / js/screens.js / js/app.js / js/lang.js /
  css/styles.css / index.html byte-identical to HEAD; the LIVE hub at 375 px shows Paper 1 / Paper 2 with the
  paper order under each, no page errors.
- **🇿🇦 Fri 2026-10-16 23:20: AFRIKAANS TRANSLATION planned, nothing built.** For her 2027 Gr11s, done by
  the START of January: the UI stays English, only the maths content gets Afrikaans twins in the same
  files (`L(en, af)` in hub rounds, `af:` beside `en:` in exam cards, hub tiles too), behind a HIDDEN
  Circle Quest style device toggle (`mhq.lang`; `?lang=af` on the URL is how she tests). Runs as the LOCAL
  scheduled task `blipwork-afrikaans-night`: nightly 22:10 from Sun 18 Oct (start-date guard), up to two
  QUEUE.md rows a night, one Opus worker each, commits LOCAL on main, never pushes, never bumps sw.js.
  Files in the root: AFRIKAANS-PLAN.md (the brief, its rulings are law, stays untracked), QUEUE.md (6 setup
  rows S1–S6, pilot gate G1, 91 translation rows of ≤ 4 000 words, gate G2) and AF-LOG.md (one line per
  row), both committed by the routine's first green row. Head start Fri 16 + Sat 17 Oct in a fresh Fable
  session (S1–S3, then S4–S6 + the pilot). Measured ~225k English words; a night ≈ 150–280k tokens.
- **🚀 Sun 2026-10-11 19:12: sw v96 LIVE (`a4621b5`), 26 commits since the inbox ship
  (v95, 4 Oct).** The finance chapter now holds f1–f13: the 10 Oct rounds (f9 Car or no car,
  f10 In or out, f11 Pick the meeting day), the 11 Oct foreman day (renumber, Fix A real
  superscripts, f10 taught form only, f8 the jug with her drawing, f12 Build the timeline,
  f13 the one equation with road colours) and the play-test fixes from this evening (below).
  Live DB seeded 19:04: f8–f13 CLOSED, sort 94–99 (93 → 99 rows; grants unchanged: quests
  is postgres + service_role only, as after the inbox ship). Live checks 19:15: live `sw.js`
  mhq-v96 one second after the push; questf8 / questf12 / questf13 / finlib / styles.css /
  questions.js / feedback.js / sw.js byte-identical to HEAD; both jug WebPs served as
  image/webp; the live page loads at 375 px with no page errors.
- **Her play-test 16:49–17:02 → three fixes, all built, checked and in the ship:**
  `40e6d97` f8 opens with a DISCOVERY SLIDE (three `q.reveal` frames, replace mode, no
  engine change: empty jug + "the total (the lumpsum)" lines → tap: savings fills, "the total
  sits at the END" → tap: the loan jug drains, "the total sits at the beginning"; the chips
  appear only after; a tap on the jug itself advances; `tools/shoot_round.py` now clicks
  reveal Next buttons before answering); `52956bf` f12 keeps ONE timeline pinned under the
  paragraph and every answered step folds to a line (two opt-in steps-engine flags
  `q.stepGraphPinned` + `q.collapseSteps` in js/questions.js, only f12 sets them; card height
  at 360 px 2 675 → 1 041 px); `5840846` f8 polish (the loan jug drains to EMPTY; once the
  drain ends the caption fades to "Payments are coins. The total is the jug." with its height
  held so the chips never jump); `926c86e` the parked 2b list (the "Tell your teacher"
  snapshot writes every sup back with its caret `)^36` / `)^(−12)`; f5 money and "N% p.a."
  unbreakable, option labels with the thousands space; concept-card wraps; `i<sub>eff</sub>`;
  half‑yearly / T‑points with U+2011; f13's "a car is the …" line unbracketed).
- Harness at the ship: verify-finance **692/692**, verify-feedback-snapshot 136/136,
  verify-exam 673/673, verify-steps-ux 33/33, verify-store 4074, verify-inbox-learner
  131/131, verify-dice-finance 89/89, verify-lazy-load 52/52, verify-wrap green.
  Four capped checkers (f8; f12 + f10/f13 untouched; f5 + f8 slide + f13 snapshot): nothing
  blocking at 390 and 360 px. Cost of the evening ≈ 1.45M worker tokens (Opus 248k / 271k /
  179k / 279k, Sonnet checkers 152k / 141k / 182k).
- **📥 Inbox for the 💬 notes LIVE as sw v95 (2026-10-04)**, 🧮 Calculator Builds 9 + 10
  LIVE as v94: details in STATUS-ARCHIVE.md. 12 hub chapters + 2 exam-only; 🎲 dice on 8
  chapters; 📝 Exam Focus 7 chapters / 360 cards; 🔔 push live; roster 20, megzieberr visible
  in the picker by her ruling. Blipwork is the calculator's MASTER copy (Stats Quest copies
  js/calculator.js verbatim; its copy is on hold, her word).
- ⚠️ **EVERY SHIP: `python tools/sw_check.py` must print OK before the push** (it counts only a
  COMMITTED bump: commit the bump, then run it, then push). ⚠️ Her own Chrome on
  localhost:5191 holds code 7 days too (CLAUDE.md gotcha 10: F12 → Application → Service
  Workers → Unregister); the app's preview pane refuses service workers, the headless tools
  start clean.

## Decisions (append-only; entries before 2026-10-10 are in STATUS-ARCHIVE.md)
- 2026-10-07 (hers): 2D Trig comes back into Exam Focus; round-two tile map agreed; build
  order = exam order (Paper 1 26 Oct first); the next fresh session does the three prep jobs
  BEFORE any cards.
- 2026-10-10 (hers, 17:55 / 19:10 / 19:19 / 18:02): Fable manages the finance workers, she
  play-tests each round; f8 NOT approved (total drawn like a payment), a payment CAN land on
  the total's day; one real learner's name removed from the plan file (public repo); the
  Stats Quest calculator copy waits (on hold).
- 2026-10-10 (mine, flagged): saving jug form was `deposits − withdrawal = A` (now archived);
  f13 writes exponents worked out, f9 keeps `3×4`; workers' commits carry the model's own
  co-author line.
- 2026-10-11 (hers, 11:22–12:02): real superscripts; f10 jug form = HOW SHE TEACHES IN 2027,
  archived, this year taught form only; words → timeline → equation, so Build the timeline =
  f12 and the one equation = f13; f8 = the jug ("lump sum" retired: it means ONE payment;
  the total = the one amount worth all the payments together on one day; coins = payments,
  jug = the total; words first, timeline after); she draws the jug PNG; a fresh session runs
  the build.
- 2026-10-11 (hers, 12:12): "Yebo, all looks good... run it": Fable dispatches the six-worker
  queue itself, one at a time, reviews each; the ship stays its own yes.
- 2026-10-11 (hers, 16:32): wrap now; she play-tests locally in a bit; a FRESH session ships.
- 2026-10-11 (foreman, flagged, default keep): f12 answers a down payment "nowhere" (never
  enters the account; matches f10/f13); f8's concept card rides on card 1 via `q.reveal` and
  "I'm lost"; checker briefs get a budget section after the first one spent 400k.
- 2026-10-11 (hers, 16:54–17:02, play-test): "lumpsum" is PHASED OUT, not cold-turkeyed: f8's
  first frame says "the total (the lumpsum)" plus one line that the lumpsum is the total and
  from now on we call it the total; nowhere else. f8 opens with a discovery slide, just the
  jug (tap: savings fills, the total at the END; tap: the loan drains, the total at the
  START), the questions after. f12: an answered step collapses; only the paragraph and ONE
  timeline stay. "The rest looks perfect."
- 2026-10-11 (hers, 18:12–18:13): the two f8 polish items (drain to empty; neutral caption
  once the chips appear) and the 2b list run BEFORE the ship; 3b / 4b / 5b stay parked;
  f12's auto-scroll (the paragraph scrolls off at the rates step) stays as is; then ship.
- 2026-10-11 (mine, flagged, default keep): `q.stepGraphPinned` / `q.collapseSteps` are opt-in
  engine flags (only f12 sets them; with both off every branch is the old code); in pinned
  mode the next-step scroll keeps the picture at the top; f8's reminder caption swaps on the
  drain's `animationend` (6 s fallback) with the caption height held; the 2b worker also
  made "times‑per‑year" unbreakable in f5/f3.
- 2026-10-11 19:12: SHIPPED sw v96 `a4621b5` (migration 19:04, sw_check OK, live checks
  19:15). `FINANCE-ROUNDS-2-PLAN.md` stays untracked/local (her 10 Oct call stands).
- 2026-10-15 (hers): Blipwork for Afrikaans learners = app UI English, maths content Afrikaans; never a
  copy of the app.
- 2026-10-16 (hers): translate bit by bit, done by the START of January 2027, for her 2027 Gr11s (chapter
  order = teaching order); EN/AF toggle like Circle Quest's, HIDDEN until the whole queue is done; hub
  tiles are content (Finance → Finansies); the work runs as a nightly 22:00 scheduled task from Sunday
  18 Oct (Saturday night = her own manual push); ship as we go: night commits on main, her ships carry
  them live, hidden; a Gr11/Gr12 grade toggle (Circle Quest's eweredigheid pattern) = a DECEMBER planning
  session, nothing before; `mindbourne-gr4-textbook` stays local, nothing online.
- 2026-10-16 (mine, flagged, default keep): the night run never pushes (a push without an sw bump in exam
  weeks could mix old and new files on a phone); a row = one table ≤ 4 000 words, several small files may
  share one ("translation chapter" is a unit in her one-unit rule); two rows a night, a third only when
  both were small, hard stop ~300k; translators never read code (extract → table → Opus → inject →
  af_check → the chapter's verify page in EN and AF).
- 2026-10-16 (hers, 23:48): the hub's Term 3 / Revision tabs become Paper 1 / Paper 2, chapters in the
  paper's own order; Fable typed it itself (tiny), committed local as its own commit, no push.
- 2026-10-17 (hers, 00:13): "ship it now": sw v97 `5cf9433` pushed 00:18, live checks 00:20; the ship carries the
  AF queue's S1 + S2 live (the switch stays hidden), as the 16 Oct "ship as we go" ruling says.

## ⏳ Pending on Megan
- 📱 3 min [after the head start; blocks the routine]: open Blipwork with `?lang=af` on your phone → play
  Number Patterns round 1 in Afrikaans → tick row G1 in QUEUE.md (or write the fixes under it).
- 💻 1 min [Sunday morning, whenever]: read AF-LOG.md, one line per row the night did.
- 🌐 1 toggle each [as you teach]: admin page → open f8, then f9 … f13, one at a time, the
  day you teach it (they are live but CLOSED, learners cannot see them yet).
- 📱 3 min [whenever]: on your phone close Blipwork, open it, close it, open it again (v97
  lands on the second open) → the hub shows Paper 1 / Paper 2 → then round 8's first card as
  a learner would: tap the jug twice, read the three captions, answer the chips.
- 💻 1 min [after exams]: admin page → Term toggle ON again (OFF since 2026-09-05).
- 📱 3 min [whenever]: 📝 Exam Focus → one card; your Blip's outline in his body colour; the
  exponential card reads y = a·b^(x − p) + q.
- 🌐 1 line [your call]: hide megzieberr from the class name-picker (one SQL line, reversible).
- 💻 1 line [whenever]: remove the stale worktree `.claude/worktrees/recursing-payne-2f126b`
  (137 MB, git-excluded, never ships).

## Next up
- **🇿🇦 Afrikaans queue (nightly from 18 Oct, AFRIKAANS-PLAN.md + QUEUE.md):** the routine works the queue
  top to bottom; her part = the pilot gate, then one AF round per chapter on her phone; wording she hates →
  a row in AF-GLOSSARY.md (`tools/af_glossary_apply.mjs` back-fills earlier chapters). G2 after the
  queue: wording sweep, `SHOW_TOGGLE` on, ship. DECEMBER: the Gr12 layer planning session
  (GR12-LAYER-PLAN.md, not started).
- **Parked cosmetic lists, her one-line call, nothing blocking:** `briefs/finance-2/
  brief-3b-f10-review.md`, `brief-4b-f8-review.md`, `brief-5b-f12-review.md` (H4 is done by
  the collapse; H1–H3 remain), plus this evening's leftovers: f8's reminder line wraps
  "the jug." onto its own row at 360 px; f5 card 4's end label sits ~18 px past the T6 tick;
  f5's wrong-answer panel says "so it is the same value" before naming the claim; f3 card 4
  still splits "8%" / "p.a." and "(half-" / "yearly)" (f3 and f7 print finlib's plain-hyphen
  label; same treatment as f5, or change `COMPOUNDING` in js/finlib.js); f7's prompts write
  "i_eff" / "i_nom" with underscores. One Opus fix worker ≈ 250–300k.
- **📝 Exam Focus round two PLANNED 2026-10-07:** tile map in EXAM-BUILD-DAY.md "ROUND TWO";
  next fresh session = the prep jobs first (Probability SAG + memo reads into
  METHODS-probability.md; decide the straight-line helper for Analytical), then Paper 1
  chapters (26 Oct) before Paper 2 (16 Nov), one chapter per session. The
  `timeline-equation` tile can deal `F13_SCENES` now.
- **Stats Quest calculator copy, her word, fresh session:** `js/calculator.js` + the calculator
  CSS block from `css/styles.css` (the `.calc-*` / `.lcd-*` rules listed in STATUS-ARCHIVE
  2026-10-04), re-check its hints (SHIFT 1 in the data editor needs AC first), bump its sw.
- **Optional, her one-line call, default leave:** calculator leftovers (STAT 0 bottom right,
  1-VAR 5:Distr, FREQ tag, SHIFT DEL, Math ERROR in SOLVE, dead `.lcd-tab u` / `fromGrid`);
  shell trim (lazy-load the engines, concepts.js, calculator.js; login 83 → ~40 files); fix-day
  follow-ups (mood hearts on gentle return, steepness reminder on the face, basic-bed specks,
  health-art via `tools/to_webp.py`); es1 card 5's raw caret `x^½`; the floating calculator
  button over the right edge of option rows AND over the pinned timeline's top-right corner
  in f12 (hides the meeting-day flag at 360 px); "False —" em-dash in yes/no feedback.
- **schema.sql still cannot rebuild the DB from scratch** (never creates `assignments`,
  `box_grants`, `loot_table`, `push_subscriptions`): a mirror-back build or the next audit.
- **Analytical Geometry dice chapter — UNBLOCKED** (METHODS-analytical.md). **Probability dice
  chapter — UNBLOCKED, one prep step first** (METHODS-probability.md). **Redo basket** planned
  in graph-quest/REDO-PLAN.md. Wave-4 blockers: Measurement (engine ruling), Trig Graphs
  (Soek-die-fout mechanic in graph-quest first).
- (carried) CRON_SECRET tidy-up; banked play.js method-link gate; stale nits (dice-gtrig.js
  "48 chains" header, verify-dice-exp prints ALL GOOD twice, verify-feedback-papers 4 stale
  fails, gt2 lone "Cash" step, `tools/harness_run.py` last-line trick on verify-exam /
  verify-funfun-backend: read the page's `#banner` for those two, a Playwright wait on
  "ALL GOOD — n/n" works).
