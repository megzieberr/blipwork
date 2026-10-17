# Project status — updated 2026-10-17 21:50 (🇿🇦 AFRIKAANS SATURDAY PUSH DONE: 60 translation rows green and committed LOCAL on main, twins 378 → 8 070 of 11 792, 63 commits UNPUSHED, no sw bump, switch still HIDDEN; live site unchanged at sw v99 `7bc7ece`; the routine starts Sun 18 Oct 22:10 and takes S8 next; her decision open: S10 so the nine General Trig rounds can land)

## How this file works (since 2026-08-30)
Head only. The full session-by-session history — every old entry, every old
Decisions list — lives VERBATIM in **STATUS-ARCHIVE.md** (append-only, newest at
the top). Keep THIS file short: when an entry here stops being current, move it to
the archive. Durable laws also live in CLAUDE.md and the auto-memory.

## Where we are
- **🇿🇦 Sat 2026-10-17 19:14–21:43: the Afrikaans SATURDAY PUSH (Fable foreman, Opus workers three at a time inside
  this one session, her "Run it, up to 60 rows").** 60 translation rows green: Exponents, Equations (except T15),
  Patterns, Analytical, Functions, 2D Trig, Trig Graphs COMPLETE; General Trig except rounds 1–9 (T54, see S10).
  Every row: extract → Opus translate → inject → af_check exit 0 → the chapter's verify page ALL GOOD in EN and
  `?lang=af`; one commit per row on main (Opus trailer), nothing pushed, no sw bump. Two tool fixes on her yes:
  af_inject keeps the code inside `${...}` verbatim (`e62d038`) and S9 made verify-exam's hub checks language-aware
  (678/678 in both languages, `bc105aa`). AF-LOG.md holds one line per row: her wording list ("for your list"),
  the glossary conflicts between rows ("GLOSSARY CALL"), six English maths slips ("MATHS SLIP"), and the
  leftovers ("FOLLOW-UP ROW", collected into queue row T93). The foreman kit is in `tools/af-push/` (README).
  Full write-up: STATUS-ARCHIVE.md 2026-10-17 19:05.
- **🚀 Live site = sw v99 `7bc7ece` (2026-10-17 18:49):** hub tiles T89 + S1–S6 + the Number Patterns pilot live,
  hidden; hub tabs Paper 1 / Paper 2 since v97; f8–f13 live CLOSED (she opens each from the admin page).
  Her next ship (sw v100: bump, `sw_check` OK, push) carries the 63 commits live, still hidden.
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

## ⏳ Pending on Megan
- 🌐 1 word [your call, blocking T54]: "run S10" (one Opus worker, ~150k) so the nine General Trig rounds
  can land, or leave it for the routine (it will go red on T54 until S10 is done).
- 💻 2 min [Sunday morning]: read AF-LOG.md from the 19:23 line down, one line per row; the "for your list"
  words are your G2 input, nothing to act on tonight.
- 📱 [whenever]: any Afrikaans word you dislike as you play → tell a session the word and your word; it
  becomes a glossary row and `tools/af_glossary_apply.mjs --write` back-fills every chapter.
- 🌐 1 toggle each [as you teach]: admin page → open f8, then f9 … f13 (live but CLOSED).
- 💻 1 min [after exams]: admin page → Term toggle ON again (OFF since 2026-09-05).
- 📱 3 min [whenever]: 📝 Exam Focus → one card: your Blip's outline in his body colour; the exponential card
  reads y = a·b^(x − p) + q.
- 🌐 1 line [your call]: hide megzieberr from the class name-picker (one SQL line, reversible).
- 💻 1 line [whenever]: remove the stale worktree `.claude/worktrees/recursing-payne-2f126b` (137 MB).

## Next up
- **🇿🇦 Afrikaans queue (AFRIKAANS-PLAN.md + QUEUE.md + tools/AF-TOOLS.md + tools/af-push/):** the routine from
  Sun 18 Oct 22:10 takes S8 → T15 → S10 → T54 → T63 … T92 (Euclidean, Algebraic Expressions, Finance after S7,
  Statistics, Probability, Measurement, helpers, engines, libs) → T93 (leftovers). About 32 rows remain, so at
  two a night it ends mid-November; a second manual push (same kit, three workers at a time) would do it in
  one evening. Then G2: her wording sweep from the log's "for your list" and "GLOSSARY CALL" lines (extraneous,
  cross terms, Hence, midline, taking off / landing, the 90° split, landmark, decoy, WATCH OUT, trough,
  follow-through tick, wortel trek vs neem die wortel, tan branches takke vs vlerkies, the 137 "not yet hers"
  CAPS terms), `af_glossary_apply --write`, full `af_check --all`, `SHOW_TOGGLE` on, ship.
- **English maths slips found by the translators (both languages carry them, one Opus fix worker ≈ 150k):**
  `grep "MATHS SLIP" AF-LOG.md`: delta-in-p#23 (2√3 apart), nature-chain#11 (−288), func nature-of-roots#22
  (a steep negative gradient cuts), reflections#87 (x = 1, y = 2), exp-level4#21 (0/0), questag7-mixed#43
  (centre vs midpoint both middelpunt); plus the per-row "report only" lines (loose wording, "her" with no
  name on learner cards, an internal card id shown in rational-exponents-k#22).
- **Her next ship (sw v100)** when she says so: bump, commit, `sw_check` OK, push; 63 commits ride along,
  hidden; after it, her play-through with `?lang=af` can start chapter by chapter.
- **T92 lib prose** (`${ord()}` English ordinals in Patterns, FN_NAME sine/cosine in Trig Graphs, `${kind}`
  minimum/maximum, measlib / finlib / patternlib words) and **T93 leftovers** (file + line list in the row).
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
