# Project status — updated 2026-10-17 18:55 (🚀 sw v99 LIVE `7bc7ece`: 🇿🇦 AF hub tiles T89 live (225 twins in js/config.js) on top of v98's S1–S6 + the Number Patterns pilot, switch still HIDDEN; gate G1 TICKED 18:36 by her word; the routine starts Sun 18 Oct 22:10 and takes T01 next; hub tabs = Paper 1 / Paper 2 since v97; f8–f13 live CLOSED, she opens each from the admin page as she teaches it)

## How this file works (since 2026-08-30)
Head only. The full session-by-session history — every old entry, every old
Decisions list — moved VERBATIM to **STATUS-ARCHIVE.md** on her ask (this
file had hit 280 KB and every session paid to read it). Nothing was deleted;
that archive stays append-only. Keep THIS file short: when an entry here
stops being current, move it to the top of the archive instead of letting
it pile up. Durable laws also live in CLAUDE.md and the auto-memory.

## Where we are
- **🚀 Sat 2026-10-17 18:49: sw v99 LIVE (`7bc7ece`): the 🇿🇦 hub tiles row T89 is live (`5fecaac`: 14 chapter names,
  98 round titles, 113 blurbs wrapped in `L(en, af)` in js/config.js), switch still hidden.** Her 18:36: G1 passes
  ("the wording of the questions looks fine") and "we can run the tiles now". Recipe as the routine's: af_extract
  (225 items, 1 469 words, nothing odd), baseline verify-wrap, ONE Opus translator (~60k, 173k with its tools; no
  `??term??`), af_inject (226 wrapped), af_check clean (1 WARN: Oats Are Healthy), Fable read all 225 lines and
  fixed one ("die moeilikes"), verify-wrap all passed in EN and `?lang=af` (its count moves with the random draws
  every run, so "all passed" is the signal, not the number), a real page import proved every chapter name flips
  under `?lang=af` and none without it (0 console errors). Ship: bump, `sw_check` OK, push 18:53, Pages v99 at
  18:49:37 (clock drift on the laptop, the poll line), live config.js carries `L("Finance", "Finansies")`.
  Debt line: twins 378 / items 11 792. G2 words the tiles lean on: mond-en-snor, vlerkies, onbepaald,
  inklinasiehoek, tweerigtingtabel, DP(p ; q) for TP, oppervlakreël, KGV for LCD (her own margin word).
- **🚀 Sat 2026-10-17 18:21: sw v98 LIVE (`98a02bd`): the AF rows S3–S6, the foreman review `a15f823`, the
  Number Patterns pilot and her keep-the-em-dashes ruling are live, the language switch still hidden
  (`SHOW_TOGGLE = false`).** Her "ship it" 18:20 in the catchup session (Fable typed it: bump, commit, sw_check OK,
  push 18:21, Pages served v98 at 18:22:54). Pre-flight: no migration in the 9 commits, public-repo scan clean,
  verify-patterns 41/41 in EN and `?lang=af` headless with 0 console errors before the bump. Live checks 18:23:
  sw.js says mhq-v98; `js/quests/questnp1-spot.js` carries its Afrikaans lines; `js/concepts.js` + the 13
  `js/concepts/<id>.js` files, `js/lang.js`, `tools/af_check.mjs`, AF-GLOSSARY.md all 200. 0 unpushed after the
  docs commit. Gate G1 is now a pure phone play (below).
- **🚀 Sat 2026-10-17 00:18: sw v97 LIVE (`5cf9433`): HUB TABS = PAPER 1 / PAPER 2 (`9ef7f91`), plus the AF
  queue's S1 (hidden language switch) and S2 (extract / inject tools).** Each tab lists its chapters in the
  paper's own order (js/screens.js PAPER_TABS); the chapter `term` field stays, nothing reads it. Shipped on
  her "ship it now" (00:13), sw_check OK, live checks 00:20 green at 375 px; the full write-up and the harness
  numbers are in STATUS-ARCHIVE.md 2026-10-16 23:45.
- **🇿🇦 Sat 2026-10-17 01:30: AFRIKAANS HEAD START DONE, S1–S6 + the pilot** (Fable foreman, one Opus worker
  per row): S1 `js/lang.js` (`L(en, af)`, `?lang=af`, `SHOW_TOGGLE`), S2 `tools/af_extract.mjs` + `af_inject.mjs`,
  S3 `tools/af_check.mjs` + `af_glossary_apply.mjs`, S4 concept cards split into `js/concepts/<id>.js`, S5
  `AF-GLOSSARY.md` (285 terms + 28 rules), S6 the pilot `questnp1-spot` (52 twins). Manual: `tools/AF-TOOLS.md`.
  Full write-up, commits and the cost line (≈1.3M worker tokens): STATUS-ARCHIVE.md 2026-10-16 23:20.
  Tracked: QUEUE.md, AF-LOG.md (one line per row, her morning view), AF-GLOSSARY.md; AFRIKAANS-PLAN.md stays local.
- 🚀 sw v96 (2026-10-11 `a4621b5`): finance part 2 (f8 the jug with a discovery slide, f9–f11, f12 Build the
  timeline, f13 the one equation), her play-test fixes and the harness numbers: STATUS-ARCHIVE.md 2026-10-11.
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

## Decisions (append-only; entries before 2026-10-15 are in STATUS-ARCHIVE.md)
- 2026-10-07 (hers): 2D Trig comes back into Exam Focus; round-two tile map agreed; build
  order = exam order (Paper 1 26 Oct first); the next fresh session does the three prep jobs
  BEFORE any cards.
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
- 2026-10-17 (hers, 00:17): "it looks great": the Paper 1 / Paper 2 hub is signed off.
- 2026-10-17 (hers, 06:38): "keep em-dashes": the em-dashes in her August nature-of-roots Afrikaans STAY; new
  translations still avoid them (plan rule); row S8 (an af_check allow-list) runs before T15. Play-test this afternoon.
- 2026-10-16 (hers, 23:20): the head start runs "QUEUE.md rows S1 to S6 and the pilot tonight one Opus worker at
  a time, you review each, claim each row with ⏳ first, commits local on main, no push, no sw bump" (S6 IS the
  pilot; G1 is her gate).
- 2026-10-17 (foreman, flagged, default keep): a screen tap is "klik op" (her Aug 2026 ruling), "tik … in" is
  typing only; "sywaarts" is out of the glossary's auto-replace column (not a drop-in word); her August
  Afrikaans in eqn-nature-of-roots holds 36 em-dashes in 31 cards: row T15 swaps them for commas or colons,
  words untouched, unless she says "keep"; queue gained S7 (the finance checker must read the af side before
  any finance row) and T92 (prose that lives in js/*lib.js); T66 / T73 closed (euclid and algx have no concept
  cards); workers' commit trailer is `Claude Opus 5.5`; `tools/lang_smoke.py`, `tools/concepts_split_check.mjs`
  and the banner-reading `tools/harness_run.py` are permanent.
- 2026-10-17 (hers, 18:20): "Ship it": sw v98 `98a02bd` pushed 18:21, live 18:22:54, live checks 18:23 green; the AF
  head start S3–S6 + the pilot are live, the switch stays hidden; the docs commit after it is pushed too (docs only,
  sw_check unaffected). The harness needs `PYTHONUTF8=1` on this laptop (its ✓ banner trips the console codec).
- 2026-10-17 (hers, 18:33): the hub tiles row T89 (js/config.js chapter names, round titles, blurbs) runs FIRST in the
  translation queue, before T01: she sees each tile in Afrikaans when she opens a round to play, so a weird name is
  caught chapter by chapter instead of at the end. Only the questions inside Number Patterns round 1 are Afrikaans
  so far; tiles and the pattern concept card (T22) are still English for tonight's G1 play.
- 2026-10-17 (hers, 18:36): G1 PASSES, "the wording of the questions looks fine" (round 1 on her Android, sw v98),
  and "we can run the tiles now": T89 ran at once (one Opus translator, Fable review) and shipped as sw v99
  `7bc7ece` (push 18:53, live checks green). Her phone is an ANDROID: play-test steps say Chrome, never Safari.
- 2026-10-17 (foreman, flagged, default keep): the translator's calls on the tiles follow the glossary (KGV for LCD
  is her own margin word; oppervlakreël; DP for TP, mond-en-snor, vlerkies, onbepaald, inklinasiehoek,
  tweerigtingtabel are CAPS forms "not yet hers", G2 rules on them); chapter names keep the English capitals
  ("Analitiese Meetkunde") except after a hyphen ("2D-trigonometrie", "Trig-grafieke"); "trap" = "slaggat";
  device names (Oats Are Healthy, All Strippers Take Cash, TIP Chips, happy/sad) and calculator words stay English.

## ⏳ Pending on Megan
- 📱 2 min [whenever, tonight if you like]: close Blipwork on your phone, open it, close it, open it again (v99 lands
  on the second open) → the hub tiles read Statistiek / Finansies / Getalpatrone … (the language setting from your
  18:36 play is still on the phone) → any tile word you hate: tell the next session the word and what you'd rather
  say, it becomes a glossary row and back-fills.
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
- **🇿🇦 Afrikaans queue (AFRIKAANS-PLAN.md + QUEUE.md + tools/AF-TOOLS.md):** Saturday night 17 Oct is hers
  (optional manual rows in a fresh session: T01 exp concepts, T02 …; T89 the hub tiles is DONE 18:52; S7 sits
  ahead of the finance rows, S8 ahead of T15; same recipe as the routine's prompt). From Sun 18 Oct 22:10 the routine works the queue top to bottom but waits at ⏸ G1 until she ticks
  it; then two rows a night. Her part = one AF round per chapter on her phone; wording she hates → a term
  row (and a Retired form only for a one-meaning word) in AF-GLOSSARY.md, `tools/af_glossary_apply.mjs
  --write` back-fills earlier chapters. G2 after the queue: the wording sweep (the 137 "not yet hers" rows,
  the source disagreements the glossary lists: undefined onbepaald / ongedefinieerd, hyperbola branches
  vlerkies / takke, IQR, box-and-whisker, contingency table, surface area, the sine rule's name), `SHOW_TOGGLE`
  on, ship. Known gaps for later rows: T91's exam engine files need a hand scan (af_extract reads js/exam
  pair-only); T44's "Area" pad cell is frame data (hand `L()`); the two jug captions in
  `js/concepts/_finance-pictures.js` (leftovers). DECEMBER: the Gr12 layer planning session
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
  fails, gt2 lone "Cash" step; the `tools/harness_run.py` last-line trick is FIXED 2026-10-17, it
  prints each page's own banner now).
