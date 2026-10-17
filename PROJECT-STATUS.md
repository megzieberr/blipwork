# Project status — updated 2026-10-18 01:22 (🚀 sw v101 `f7d832b` LIVE 01:22: the WHOLE Afrikaans translation is on the live site, switch still HIDDEN, 0 unpushed; twins 12 071 of 12 074; open: T94 small leftovers (the routine takes it Sun 22:10), S11 dice test pages (her call), G2 her wording sweep; her play-through with ?lang=af can start)

## How this file works (since 2026-08-30)
Head only. The full session-by-session history — every old entry, every old
Decisions list — lives VERBATIM in **STATUS-ARCHIVE.md** (append-only, newest at
the top). Keep THIS file short: when an entry here stops being current, move it to
the archive. Durable laws also live in CLAUDE.md and the auto-memory.

## Where we are
- **🇿🇦 Sat 2026-10-17 22:24 – Sun 00:20: the SECOND PUSH (Fable foreman, Opus workers three at a time, her "Run it: the
  whole queue tonight").** All 33 open rows done: S8 (af_check allow-list), S10 (verify-gtrig language-aware), S7 (the finance
  twin harness: AF card built from recorded draws, English twin in a hidden frame, every check reads the twin; the foreman fixed
  its em-dash rule), T15, T54, T63–T65 (General Trig + 2D Trig complete), T67–T72 (Euclidean, from Circle Quest's words + the
  SAG Appendix G reasons, her 22:39 instruction), T74–T79 (Algebraic Expressions), T80–T88 (Finance, Stats, Prob, Measurement
  concepts + rounds), T90–T92 (helpers, exam tiles, libs) and T93 in three halves (leftovers: 295 hand-wrapped strings, two
  visible AF bugs fixed on the way: np7's answer in English, 'Skeefright'). 37 commits on main, nothing pushed, no sw bump.
  Final sweep: all 36 pages green at 00:11 (14 chapter pages EN + ?lang=af incl. verify-exam 678/678, verify-gtrig 1043485 / 1043535, verify-wrap 56594 / 55014; the 8 dice pages EN). Repo-wide af_check: 12 074 items / 12 071 twins / 0 errors / 88 WARN. New queue rows: T94
  (leftovers of the leftovers, 7 small items, ☐) and S11 (seven dice test pages parse English, red under ?lang=af since before
  tonight, ⏸ her call). AF-LOG.md from the 22:27 line down holds every row's wording list, GLOSSARY CALLs and MATHS SLIPs.
  Full write-up: STATUS-ARCHIVE.md 2026-10-17 22:24.
- **🇿🇦 Sat 2026-10-17 19:14–21:43: the Afrikaans SATURDAY PUSH (Fable foreman, Opus workers three at a time inside
  this one session, her "Run it, up to 60 rows").** 60 translation rows green: Exponents, Equations (except T15),
  Patterns, Analytical, Functions, 2D Trig, Trig Graphs COMPLETE; General Trig except rounds 1–9 (T54, see S10).
  Every row: extract → Opus translate → inject → af_check exit 0 → the chapter's verify page ALL GOOD in EN and
  `?lang=af`; one commit per row on main (Opus trailer); shipped as sw v100 at 22:16. Two tool fixes on her yes:
  af_inject keeps the code inside `${...}` verbatim (`e62d038`) and S9 made verify-exam's hub checks language-aware
  (678/678 in both languages, `bc105aa`). AF-LOG.md holds one line per row: her wording list ("for your list"),
  the glossary conflicts between rows ("GLOSSARY CALL"), six English maths slips ("MATHS SLIP"), and the
  leftovers ("FOLLOW-UP ROW", collected into queue row T93). The foreman kit is in `tools/af-push/` (README).
  Full write-up: STATUS-ARCHIVE.md 2026-10-17 19:05.
- **🚀 Live site = sw v101 `f7d832b` (2026-10-18 01:22):** the whole Afrikaans translation (both pushes, 93 rows) is LIVE,
  hidden (Pages built within 20 s; live sw.js reads mhq-v101; live js/lang.js SHOW_TOGGLE = false; index 200; live euclid-siblings-cyclic-quads.js and skills.js sha1 = local, live questf12-build-timeline.js sha1 = the committed blob b565c53fac56); before it sw v100 `d983c83` (22:16) carried the Saturday push. Still: `SHOW_TOGGLE` false, default "en", a phone shows Afrikaans only after it visited `?lang=af` once (her
  phone did, at the 18:36 tile sign-off) and `?lang=en` flips it back; learners see English. Hub tiles T89 + S1–S6 +
  the pilot since v99; hub tabs Paper 1 / Paper 2 since v97; f8–f13 live CLOSED (she opens each from the admin
  page). 0 unpushed; the routine's nightly `AF:` commits (T94 next) ride with whatever ship comes next.
- 🧮 Calculator Builds 9 + 10 live (v94), 📥 Inbox (v95), 💰 Finance part 2 f8–f13 (v96): STATUS-ARCHIVE.md.
  12 hub chapters + 2 exam-only; 📝 Exam Focus 7 chapters / 360 cards; 🔔 push live; roster 20.
- ⚠️ **EVERY SHIP: `python tools/sw_check.py` must print OK before the push** (it counts only a COMMITTED bump).
  Her own Chrome on localhost:5191 holds code 7 days (CLAUDE.md gotcha 10); the headless tools start clean.
  The harness needs `PYTHONUTF8=1` and `python -m http.server 5191` in the repo root.

## Decisions (append-only; entries before 2026-10-17 are in STATUS-ARCHIVE.md)
- 2026-10-17 (hers, 00:13 / 00:17): sw v97 shipped, Paper 1 / Paper 2 hub signed off.
- 2026-10-17 (hers, 06:38): keep the em-dashes in her August nature-of-roots Afrikaans; new translations avoid
  them; S8 (an af_check allow-list) runs before T15.
- 2026-10-17 (hers, 18:20 / 18:33 / 18:36 / 18:56): sw v98 shipped; hub tiles T89 run FIRST; G1 passes; T89
  shipped as v99 and signed off on her Android (Chrome, never Safari).
- 2026-10-17 (hers, 19:14): "Run it: the probe first, then waves of three, up to 60 rows tonight" (the Saturday
  push on the week's leftover budget; workers inside this one session, not worktree sessions).
- 2026-10-17 (hers, 19:17): after exams she plays Blipwork start to finish and gives feedback for fixes; the
  work stays invisible to learners meanwhile.
- 2026-10-17 (hers, 19:33): "yes please": fix af_inject (nested backtick templates inside `${...}`).
- 2026-10-17 (hers, 19:46): "yes, add it tonight": S9, verify-exam's hub checks read chapter names by id.
- 2026-10-17 (foreman, flagged, default keep): T04–T07 were accepted under an interim "exactly the 12 known AF
  failures" rule before S9 and are covered by S9's 678/678 run; eqn#32 keeps its `&mdash;` entity in the
  Afrikaans (the English writes the dash as an entity, af_check's tags rule); `??term??` is an af_check ERROR, so
  translators write the plainest safe word and LIST the term; S8 + T15 skipped tonight (S8 edits the checker
  every worker calls); S10 added before T54 after verify-gtrig parsed English step wording (2 862 AF failures,
  T54's 560-key table saved, inject-only after S10); rows with leftovers ticked "done, PARTIAL" and the
  leftovers collected in T93; the routine's next first open row is S8, then T15, S10, T54, T63 onwards.
- 2026-10-17 (hers, 22:14 / 22:15): the Afrikaans on her phone is that device's remembered `?lang=af`, learners see
  English (js/lang.js, live = local); "Ship sw v100: bump, sw_check, push. The Afrikaans switch stays hidden."
  Shipped `d983c83` 22:16, live-verified.
- 2026-10-17 (hers, 22:20 / 22:24): anything needed from her goes in a `Waiting on you:` block at the END of every message
  (CLAUDE.md + memory); "Run it: the whole queue tonight, S8 alone first, then waves of three, same kit as last night."
- 2026-10-17 (hers, 22:39): Euclid rows read Circle Quest's js/i18n.js first, then the Afrikaans SAGs (Appendix G reasons via
  her SAG-REDES-DIGEST.md), then the glossary.
- 2026-10-17/18 (foreman, flagged, default keep): S8 + S10 + S7 ran together (disjoint files; S10 / S7 never call af_check);
  T54 injected by the foreman for S10's test; the S7 twin check no longer counts em-dashes (her no-em-dash rule); T93 ran as
  three halves under one queue row; S11 added as a GATED row (her call), T94 as an open row; Circle Quest's reason bank won
  over the SAG where they differ (logged as GLOSSARY CALLs for G2); five workers overlapped for ten minutes at 22:33 (wave 1's
  setup rows + wave 2), three at a time after that.
- 2026-10-18 (hers, 01:20): "Ship sw v101: bump, sw_check, push. The Afrikaans switch stays hidden." Shipped `f7d832b`,
  live-verified 01:22.

## ⏳ Pending on Megan
- 🌐 1 word [your call, whenever]: "run S11" (one Opus worker, about 200k) so the seven dice test pages can check the
  Afrikaans dice rounds too, or leave it (the app renders them; only the harness can't read Afrikaans there).
- 📱 [after exams, your 19:17 ruling]: play Blipwork start to finish with `?lang=af` (your phone already remembers it) and
  tell a session every word you dislike; close and reopen the app twice first so the phone picks up v101.
- 📱 1 tap [whenever]: your phone remembers Afrikaans from tonight's test; open
  megzieberr.github.io/blipwork/?lang=en once to flip it back (or keep it on for the play-through).
- 💻 5 min [Sunday]: read AF-LOG.md from the 19:23 line down (both pushes, one line per row); the "for your list" and
  "GLOSSARY CALL" words are your G2 input, the "MATHS SLIP" lines are English fixes for one Opus worker.
- 📱 [whenever]: any Afrikaans word you dislike as you play → tell a session the word and your word; it
  becomes a glossary row and `tools/af_glossary_apply.mjs --write` back-fills every chapter.
- 🌐 1 toggle each [as you teach]: admin page → open f8, then f9 … f13 (live but CLOSED).
- 💻 1 min [after exams]: admin page → Term toggle ON again (OFF since 2026-09-05).
- 📱 3 min [whenever]: 📝 Exam Focus → one card: your Blip's outline in his body colour; the exponential card
  reads y = a·b^(x − p) + q.
- 🌐 1 line [your call]: hide megzieberr from the class name-picker (one SQL line, reversible).
- 💻 1 line [whenever]: remove the stale worktree `.claude/worktrees/recursing-payne-2f126b` (137 MB).

## Next up
- **🇿🇦 Afrikaans queue (AFRIKAANS-PLAN.md + QUEUE.md + tools/AF-TOOLS.md + tools/af-push/):** TRANSLATION DONE.
  Open: T94 (seven small leftovers: the Level 4 sub-line behind verify-exam.html:934, quest02/quest03 reason labels tied to
  ids, two tgraph 'period = …' labels, finlib COMPOUNDING keys vs labels, np7's L('quadratic','quadratic') option, the two
  'Total' strings after S11, the f8 jug reminder line behind verify-finance.html:725); the routine from Sun 18 Oct 22:10
  takes T94 (one row, then it finds nothing open: S11 and G2 are gated). S11 = her call. Then G2: her wording sweep from the log's "for your list" and "GLOSSARY CALL" lines (extraneous,
  cross terms, Hence, midline, taking off / landing, the 90° split, landmark, decoy, WATCH OUT, trough,
  follow-through tick, wortel trek vs neem die wortel, tan branches takke vs vlerkies, the 137 "not yet hers"
  CAPS terms), `af_glossary_apply --write`, full `af_check --all`, `SHOW_TOGGLE` on, ship.
- **English maths slips found by the translators (both languages carry them, one Opus fix worker ≈ 150k):**
  `grep "MATHS SLIP" AF-LOG.md` (about a dozen after tonight: bookwork-proofs#24 two centres, circle-theorems#2 and
  chords#34 'halves', algx expand#49 'two squared brackets', factorise-basics#68, fractions#60 and #69, and the earlier six):
  delta-in-p#23 (2√3 apart), nature-chain#11 (−288), func nature-of-roots#22
  (a steep negative gradient cuts), reflections#87 (x = 1, y = 2), exp-level4#21 (0/0), questag7-mixed#43
  (centre vs midpoint both middelpunt); plus the per-row "report only" lines (loose wording, "her" with no
  name on learner cards, an internal card id shown in rational-exponents-k#22).
- **Her play-through with `?lang=af`** (after exams, her 19:17 ruling) can start chapter by chapter: sw v100 is
  live. Nightly routine commits ride with whatever ship comes next.
- **Parked cosmetic lists, her one-line call:** `briefs/finance-2/brief-3b-f10-review.md`, `brief-4b-f8-review.md`,
  `brief-5b-f12-review.md` and the f3 / f5 / f7 / f8 nits listed in STATUS-ARCHIVE.md 2026-10-11.
- **📝 Exam Focus round two PLANNED 2026-10-07** (EXAM-BUILD-DAY.md "ROUND TWO"): prep jobs first, then Paper 1
  chapters before Paper 2, one chapter per session. **Stats Quest calculator copy**, her word, fresh session.
- **Optional, default leave:** calculator leftovers, shell trim, fix-day follow-ups, es1 card 5's raw caret,
  the floating calculator button over option rows / the f12 timeline, "False —" in yes/no feedback;
  schema.sql cannot rebuild the DB from scratch (a mirror-back build or the next audit); Analytical and
  Probability dice chapters UNBLOCKED; Measurement / Trig Graphs dice blockers; carried nits (CRON_SECRET,
  dice-gtrig.js header, verify-dice-exp double banner, verify-feedback-papers 4 stale fails, gt2 lone "Cash").
- DECEMBER: the Gr12 layer planning session (GR12-LAYER-PLAN.md, not started).
