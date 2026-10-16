# Project status — updated 2026-10-17 01:30 (🇿🇦 AF HEAD START DONE: S1–S6 + the pilot green, S3–S6 sit LOCAL and ride her next ship; the routine waits at gate G1 = her phone play; 🚀 sw v97 LIVE `5cf9433`: hub tabs = Paper 1 / Paper 2 + the hidden AF switch (S1) + the S2 tools; f8–f13 live CLOSED, she opens each from the admin page as she teaches it)

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
- **🇿🇦 Sat 2026-10-17 01:30: AFRIKAANS HEAD START DONE, S1–S6 + the pilot all green** (Fable foreman, one
  Opus worker per row, each reviewed with fresh proof before the next): S1 `f3cc903` `js/lang.js` (key
  `mhq.lang`, `L(en, af)`, `?lang=af` sets the device, button hidden behind `SHOW_TOGGLE`; exam + Fun Functions
  read it; `tools/lang_smoke.py` 5/5) · S2 `96f85ad` `tools/af_extract.mjs` + `af_inject.mjs` + the round trip
  (acorn; tables `briefs/af/<row>.en.json` / `.af.json`; manual `tools/AF-TOOLS.md`; English bytes identical
  by construction) · S3 `20951e0` `tools/af_check.mjs` (twins, placeholders, tags, English leak, her wording
  rules, length ratio; `--unit <row>` must exit 0, `--all` = the debt report) + `af_glossary_apply.mjs`
  (Retired column, dry by default) · S4 `78847d2` the 150 concept cards split into `js/concepts/<id>.js`
  (`tools/concepts_split_check.mjs`: identical, key by key; login loads 13 more small files, +9 KB) · S5
  `512a268` `AF-GLOSSARY.md` (285 terms + 28 rules; 137 CAPS terms "not yet hers" for G2) · S6 `581b78d`
  the PILOT: `questnp1-spot` has its 52 twins, af_check clean, verify-patterns 41/41 in EN and `?lang=af`;
  Fable read all 52 lines and tightened two. Foreman review commit `a15f823` (harness_run prints each page's
  real banner; CLAUDE.md points new cards at `js/concepts/<id>.js`). S1 + S2 went LIVE hidden in HER sw v97
  ship (00:18); S3–S6 + `a15f823` are the 5 unpushed commits, they ride her next ship. Tracked from now on:
  QUEUE.md, AF-LOG.md (one line per row, her morning view), AF-GLOSSARY.md; AFRIKAANS-PLAN.md stays local.
  Debt line at 01:20: twins 153 / items 11 792. Cost: ≈1.3M worker tokens (S1 180k, S2 314k, S3 269k, S4 166k,
  S5 271k, S6 117k) plus the foreman session; the weekly meter moved 31 → 37 %, the 5-hour window 24 → ~47 %.
  The routine `blipwork-afrikaans-night` (nightly 22:10, does nothing before Sun 18 Oct 21:30) has the real
  commands in its prompt now and STOPS at the ⏸ G1 gate until she ticks it.
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
- 2026-10-17 (hers, 00:17): "it looks great": the Paper 1 / Paper 2 hub is signed off.
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

## ⏳ Pending on Megan
- 💻 5 min then 📱 3 min [blocks the routine from Sunday night]: "ship it" in a fresh session (sw v98 carries
  S3–S6 live, still hidden; sw_check OK first) → open Blipwork with `?lang=af` in Safari on your phone (the
  home-screen app has its own storage) → play Number Patterns round 1 in Afrikaans → tick row G1 in QUEUE.md
  (or write the fixes under it). Until G1 is ticked the routine logs "waiting on Megan" each night.
- 💬 one word [whenever, before row T15 in a few weeks]: "keep" if the em-dashes in your August nature-of-roots
  Afrikaans must stay; silence = that row turns them into commas or colons, words untouched.
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
  (optional manual rows in a fresh session: S7, then T01 exp concepts, T02 …; same recipe as the routine's
  prompt). From Sun 18 Oct 22:10 the routine works the queue top to bottom but waits at ⏸ G1 until she ticks
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
