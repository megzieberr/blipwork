# Project status — updated 2026-10-10 22:55 (💰 Finance rounds part 2 BUILT locally f8–f12, NOT pushed, sw NOT bumped; 🚫 f8 not approved, parked; her play-test of f9/f10/f11/f12 + the ship on her yes = next; inbox LIVE as sw v95)

## How this file works (since 2026-08-30)
Head only. The full session-by-session history — every old entry, every old
Decisions list — moved VERBATIM to **STATUS-ARCHIVE.md** on her ask (this
file had hit 280 KB and every session paid to read it). Nothing was deleted;
that archive stays append-only. Keep THIS file short: when an entry here
stops being current, move it to the top of the archive instead of letting
it pile up. Durable laws also live in CLAUDE.md and the auto-memory.

## Where we are
- **💰 Finance rounds part 2 BUILT locally, Sat 2026-10-10 17:57–23:00 (Fable foreman, her
  "run it" 17:57 + /go; one Opus worker per unit; nothing pushed, sw NOT bumped).** Local
  commits: f8 `66498aa`+`12018be`, concept fix `6505cf1`, f9 `c6f5cec`+`7ecefa2`, f10
  `55e5c6a`+`cf85183`, f12 `fc8efef`+`2d8ffe2`, f11 `b39a7fa`+`8ddb325`.
  Loop per round: Opus build → Sonnet phone-width checker (390 + 360 px, screenshots in ITS
  context only) → fresh Opus fix worker → Fable rerun. verify-finance green at every step,
  now f1–f12: **586/586 (91 skills, 18 200 gens)**; verify-dice-finance 89/89; steps-ux, wrap,
  exam (673/673), lazy-load green after the shared-code changes.
  Plan correction: `verify-finance.html` existed since 23 Aug (146/146 at 17:52), so prep job
  F0 was already done and the queue started at f8.
- 🚫 **f8 "Which one is the total?" NOT APPROVED (her play 19:10).** It drew the total as a
  bare money amount among the payments (the worker dropped the P/A role letters) = THE
  class confusion; a payment on the total's day "breaks everyone" before the kids can tell
  the two apart. Her clarification 19:19: same-day payments are a real exam shape and stay;
  f8's job is to make total vs payment look like two different KINDS of thing FIRST. f8 stays
  built but parked for a redesign talk; before the ship decide: ship it CLOSED (the seed
  hides it) or `built:false`.
- Rule applied from f9 on: the total is `?` with its role letter (engine: accent colour, bold,
  ring since f9's fix); never a bare money label; payments may share its day.
- Shared code riding with the rounds (one sw bump covers all): timeline engine (stacked
  labels + label hit boxes, `meet` flag, coloured `roads`, `out` withdrawals, leader lines,
  ring air, 6 px label air), keypad `maxDigits` (opt-in, default 6; f12 asks 9), mc option
  `note` chips (f11 car counts), unbreakable-term wrapping, concept cards use U+00A0.
- Live DB read 20:58: 93 quest rows, max sort 93, f1–f6 open, f7 closed, none of f8–f12
  present. Seeding migration drafted (f8–f12 closed, sort 94–98) in the session scratchpad;
  ship plan there too (SHIP-PLAN-finance-2.md). NOTHING run.
  Background for the wording (do not re-read the transcripts): `Tutoring Resources/Graad 11
  Curro/Gr11 Finance Explainers/CLASS-DIGEST-2026.md` and `GR11-FINANCE-REDESIGN.md`.
- **📥 Inbox for the 💬 notes LIVE as sw v95 (Sun 2026-10-04 12:10, her "yes to both").**
  Opus 5.5 foreman, three Opus workers one at a time (186k + 172k + 200k tokens):
  `db43d99` back end, `d1c9a8c` admin page, `8c1c084` learner inbox, ship `7d3fc3c`.
  Migration `feedback_inbox_2026_10_04` applied BEFORE the push: live base checked first
  (mhq_admin_feedback matched the snapshot copy), sanity checks green (one of each
  function, definer + pinned path + anon EXECUTE, table still revoked, 15 notes all open),
  throwaway-learner smoke test green (inbox, unseen, seen clears, B sees nothing, wrong
  password refused, check blocks a bad status; both learners + the note deleted after).
  Foreman reruns: verify-inbox 220/220, verify-inbox-admin 86/86, verify-inbox-learner
  131/131. Live: Pages `built` 7d3fc3c, sw mhq-v95, inbox.js/admin.js/screens.js/styles.css
  byte-identical to HEAD.
- **🧮 Calculator Builds 9 + 10 LIVE as sw v94 (Sun 2026-10-04 10:35).** Ship `1dc72c9`; STAT editor,
  GCD/LCM, review fixes from the third emulator probe; all harnesses green before the push. Full
  write-up in STATUS-ARCHIVE.md (2026-10-04). Stats Quest still has the OLD calculator.
- v93 (same morning, 08:40, `48a2a91`) was the eight-build rebuild; details in the archive.
- Her goal in her words: the kids "really suck at calculator work" and felt overwhelmed
  by the stats steps, so the app must not throw them off.
- ⚠️ **EVERY SHIP FROM NOW ON: `python tools/sw_check.py` must print OK before the push.**
  It refuses when js/ or css/ changed since the last CACHE bump. Without the bump,
  learners keep old code for up to 7 days. ⚠️ Her own Chrome on localhost:5191 holds code
  7 days too (CLAUDE.md gotcha 10: F12 → Application → Service Workers → Unregister).
  The app's preview pane refuses service workers, and the headless tools start clean.
- Previous ships: v92 (2026-09-06, Build 6 lazy-load + cache-first code), v91, v90 and
  earlier: details in STATUS-ARCHIVE.md. 12 hub chapters + 2 exam-only; 🎲 dice on 8
  chapters; 📝 Exam Focus 7 chapters / 360 cards; 🔔 push live; roster 20, megzieberr
  visible in the picker by her ruling.
- 🧮 Calculator: Blipwork is the MASTER copy; Stats Quest copies
  js/calculator.js verbatim (its sw v10 matches v88's calc-memory build).

## Decisions (append-only; entries before 2026-10-10 are in STATUS-ARCHIVE.md)
- 2026-09-05 / 09-06 one-liners: rolled to STATUS-ARCHIVE.md (2026-10-04 12:15 roll).

- 2026-10-07 (hers): 2D Trig comes back into Exam Focus; the round-two tile map (7 chapters,
  EXAM-BUILD-DAY.md "ROUND TWO") is agreed as proposed; build order = exam order (Paper 1
  26 Oct first); the next fresh session does the three prep jobs BEFORE any cards.
- 2026-10-03 / 10-04 one-liners (calculator rebuild, inbox): rolled to STATUS-ARCHIVE.md (2026-10-10 23:00 roll).

- 2026-10-10 (hers, 17:55): Fable manages the finance-round workers; she play-tests each round
  before the next; ship at the end of the night. 19:10: carry on without her play-tests while
  she is out; she plays them all when back, then "we talk about what we can do to fix f8".
- 2026-10-10 (hers, 19:10 + 19:19): f8 NOT approved (total drawn like a payment). A payment CAN
  land on the total's day; f8 must first make total vs payment distinguishable.
- 2026-10-10 (hers, 18:02): one real learner's first name removed from the plan file; the
  other names in it are textbook example names and stay (public repo).
- 2026-10-10 (hers, 17:55): the Stats Quest calculator copy waits for her next Stats Quest
  update (on hold).
- 2026-10-10 (mine, flagged): saving jug form is `deposits − withdrawal = A` (f10 worker's
  catch, my brief had a minus on a deposit); f10's closing line is kind-specific (loan:
  payments positive on the right; saving: deposits plus, withdrawal minus, A on the left);
  f12 writes exponents worked out (`^36`), f9 keeps the teaching form `^(3×12)`.
- 2026-10-10 (mine, flagged): f9 road-rate label may reach into the margin past a short end
  road; f12 two-car terms fall back to a split with a visible "×" on ~8% of rolls at 12 px;
  f11 only deals timelines with a unique fewest-cars day. Workers' commits carry an Opus 5.5
  co-author line (accurate), not the brief's Fable line.

## ⏳ Pending on Megan
- 💻 15 min **[blocking the ship]**: incognito → `http://localhost:5191/?local=1` (a local
  server must be running: `python -m http.server 5191` in the repo root) → log in as Lerato
  Test / demo1234 → Finance map → play f9, f10, f11, f12 once each → "ship it" or fix notes.
- 💻 1 line **[blocking the ship]**: f8: ship it CLOSED (hidden by the seed) or pull it from
  the map (`built:false`) until the redesign talk.
- 💻 (on hold, her word 10 Oct): "copy it to Stats Quest" waits for the next Stats Quest update.
- 📱 3 min [whenever]: close + reopen Blipwork twice (sw v92) → play one round in any
  chapter → 📝 Exam Focus → one card. While there: your Blip's outline in his body colour,
  the exponential card reads y = a·b^(x − p) + q. Optional: airplane mode, reopen a
  chapter you just played (opens), tap one you have not (the can't-reach line, no blank).
- 💻 1 min [after exams]: admin page → Term toggle ON again (OFF since 2026-09-05;
  ON restarts the sickness clock from that day, and gentle return starts mattering).
- 📱 5 min [whenever]: roll a gtrig round: the bow-tie / three-boxes / but-why cards
  should ASK and hand the filled frame back; tap 📖 on an eq9 question: the answer
  reads once. (v86–v88 spot-checks still unticked if you want them.)
- 🌐 1 line [your call]: megzieberr is still visible in the class name-picker; say the
  word and I hide it (one SQL line, reversible).
- 💻 1 line [whenever]: a stale git worktree sits at `.claude/worktrees/recursing-payne-2f126b`
  (137 MB, git-excluded, never ships); say the word and I remove it.

## Next up
- **The ship (her "yes, ship it"):** per the session's SHIP-PLAN-finance-2.md: f8 decision →
  migration f8–f12 closed at sort 94–98 (re-check max(sort) first; mirror into schema.sql +
  supabase/migration-finance-quests-2.sql) → /migration-check → sw CACHE mhq-v95 → v96 →
  `python tools/sw_check.py` OK → full harness sweep → commit + push → live checks (sw v96,
  the new quest files byte-identical, map shows 8–12 closed) → she opens rounds as she teaches.
- **The f8 redesign talk** (her idea first): how to make the total look like a different KIND
  of thing from a payment so the round teaches the distinction before same-day cases.
- **📝 Exam Focus round two PLANNED 2026-10-07 (her "write it down"):** the tile map for
  the seven remaining chapters (finance, prob, pat, trig UNHIDDEN by her word, stats, meas,
  analytical) is in EXAM-BUILD-DAY.md "ROUND TWO". **Next fresh session = the three prep
  jobs first, her word:** Probability SAG + memo reads into METHODS-probability.md (Parts S
  and M), ~~build `verify-finance.html`~~ (it exists, DONE), decide the straight-line helper for Analytical. Then
  Paper 1 chapters (26 Oct) before Paper 2 (16 Nov), one chapter per session.
- **Her phone test of v94** (GCD / LCM, the stats table); anything she finds gets measured
  on the emulator first, then built (one unit per worker).
- **Stats Quest copy, her word, fresh session:** `js/calculator.js` WITH the new calculator
  CSS from `css/styles.css` (`.calc-ind` slots, error screen, `.calc-logb-base`,
  `.calc-abs-body`, `.calc-comb`, `.calc-mixed-whole`, `.ind-fix`, `.lcd-pr*`,
  `.lcd-solve`, `.lcd-sv-*`, `.lcd-tbl*`, `.lcd-eqn*`, `.lcd-ineq`, `.lcd-menu-*`,
  `.lcd-mi-n`, `.lcd-hat`, `.lcd-done`, `.lcd-ov`; Builds 9 + 10 added no new rules, only
  the bare class `lcd-stat` and a CSS comment), re-check Stats Quest's own calculator
  consumers AND its hints (SHIFT 1 inside the data editor now needs AC first), bump its
  sw, push.
- **Optional calculator leftovers, her one-line call, default leave:** the 0 bottom right
  on the STAT calculation screen (spec §19.8, measured, many test rows assert the blank);
  1-VAR 5:Distr does nothing; the FREQ tag lights only in 1-VAR; SHIFT DEL acts as DEL in
  the editor; inside SOLVE a bad GCD argument shows Math ERROR; dead leftovers
  (`.lcd-tab u` rule, `fromGrid` path).
- **Optional shell trim, her one-line call, default leave:** lazy-load the ten engines,
  `concepts.js`, `calculator.js` and the companion renderer behind their first use;
  login could drop from 83 files toward 40. Same two-worker pattern, one sw bump.
- **Optional follow-ups from the fix day, each her one-line call, default leave:** mood
  hearts topped up on gentle return; the steepness reminder always visible on the
  question face instead of hint rung 1; `basic-bed` has ~430 leftover magenta keying
  specks (an art pass); a new health-art PNG needs `tools/to_webp.py`.
- **schema.sql still cannot rebuild the DB from scratch** (found by Build 1): it never
  creates `assignments`, `box_grants`, `loot_table`, `push_subscriptions`. A small
  mirror-back build, or the next audit. verify-store's drift assertion should be
  re-pointed at live-vs-schema in that build.
- **Analytical Geometry dice chapter — UNBLOCKED.** Digest + her seven rulings sit in
  METHODS-analytical.md; ag5 mines the paper-bank mds. Needs a build day on her word.
- **Redo basket ("remember what I got wrong, let me do it again")** — planned, NOT
  built: graph-quest/REDO-PLAN.md (two Opus sessions; her five one-line rulings first).
- **Probability dice chapter — UNBLOCKED, one prep step first.** Her rulings sit at the
  TOP of METHODS-probability.md; a worker digests the SAG's Gr11 Probability section +
  the surveyed papers' memo working into that file, THEN the build day. Her word.
- Remaining wave-4 blockers: Measurement (engine ruling), Trig Graphs (Soek-die-fout
  mechanic landing in graph-quest first).
- (carried) CRON_SECRET tidy-up offer; banked play.js method-link gate (render 📖 only
  once a chain is finished; when it lands, delete the `q.type !== "steps"` clauses in
  dice-gtrig.js AND dice-trig.js).
- Stale nits, one small pass: dice-gtrig.js's header says "the 48 chains" (the pool
  holds 32); verify-dice-exp prints its ALL GOOD line twice; verify-feedback-papers
  still asserts ship-day states from v68 (4 stale fails, 181/185); gt2's wrong path
  prints a lone "Cash" solution step; `tools/harness_run.py` prints the LAST line
  matching passed|FAIL, which on verify-exam and verify-funfun-backend is a prose line,
  not the result (read the page text for those two).
