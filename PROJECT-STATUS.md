# Project status — updated 2026-09-06 (🚀 BUILD 6 SHIPPED: sw v92 LIVE, fetch-verified; lazy-load + cache-first code; graph-quest gq-v35 LIVE)

## How this file works (since 2026-08-30)
Head only. The full session-by-session history — every old entry, every old
Decisions list — moved VERBATIM to **STATUS-ARCHIVE.md** on her ask (this
file had hit 280 KB and every session paid to read it). Nothing was deleted;
that archive stays append-only. Keep THIS file short: when an entry here
stops being current, move it to the top of the archive instead of letting
it pile up. Durable laws also live in CLAUDE.md and the auto-memory.

## Where we are
- **Live on sw v92** (2026-09-06, fetch-verified: sw.js reads mhq-v92; js/lazy.js,
  js/quests/load.js, js/exam/load.js, js/exam/_registry.js all 200; live screens.js
  uses the loader; Pages build 34028439392 success). **Build 6 shipped on her "ship it":**
  two Opus workers in sequence (bf32dc8 lazy-load, 53ecab8 service worker), ship commit
  7d95d67, about 630k worker tokens, each reviewed by Fable with fresh runs before the
  next. Numbers (375 px, ?local=1): login 317 files / 5 354 KB → **83 / 1 627 KB**; a
  chapter +9 files, an exam chapter +21; with the worker warm, the third visit onwards
  costs **5 requests / 0 KB for all five screens**.
- **What changed under the hood:** `js/quests/load.js`, `js/exam/load.js` and
  `loadDicePool` fetch content on the tap (chapter open prefetches its seven);
  `js/funfun/` is imported only when the Functions chapter opens; `local-backend.js` only
  under `?local=1`; `js/lazy.js` retries a failed module under a fresh `?retry=` URL
  (browsers REMEMBER a failed import for the whole session, proved headless);
  `js/exam/_registry.js` holds the pure card rules both doors share; the three registries
  keep their sync exports for the 30 verify pages. `sw.js`: app code cache-first with a
  7-day stamp, navigations + every .html + js/app.js network-first, every network trip
  conditional (`cache: "no-cache"`), retries heal the plain entry, activate still evicts.
- ⚠️ **EVERY SHIP FROM NOW ON: `python tools/sw_check.py` must print OK before the push.**
  It refuses when js/ or css/ changed since the last CACHE bump. Without the bump,
  learners keep old code for up to 7 days. ⚠️ Her own Chrome on localhost:5191 holds code
  7 days too (CLAUDE.md gotcha 10: F12 → Application → Service Workers → Unregister).
  The app's preview pane refuses service workers, and the headless tools start clean.
- New tools: `tools/count_requests.py` (cold request table), `tools/lazy_playthrough.py`
  (18 checks incl. the blocked-module retry), `tools/sw_offline_test.py` (25 checks:
  offline + eviction), `tools/sw_warm_requests.py`, `tools/sw_check.py`,
  `verify-lazy-load.mjs` (52-check loader/registry drift test). `PYTHONIOENCODING=utf-8`
  is required for `tools/harness_run.py` (documented in tools/README.md).
- **graph-quest gq-v35 LIVE** (2026-09-06, her "ship graph-quest"): the AF steepness
  reminder reaches the two standalone learners. **paper-seed deleted** by her 2026-09-06
  (the hub lists exactly four edge functions: collect-cq, paper-url, paper-admin,
  send-push).
- Previous ships: v91 (2026-09-05 fix day Builds 1–5: back-end seal + clamp, gentle
  return, exponential p + steepness reminder, Blip outline colour, WebP sprites; the
  audit + briefs in `AUDIT-2026-09-05.md` and `FIX-DAY-2026-09-05-PLAN.md`), v90 (look-back
  sheet), v89, v88, v87, v86. 12 hub chapters + 2 exam-only; 🎲 dice on 8 chapters;
  📝 Exam Focus 7 chapters / 360 cards; 🔔 push live, 9 accounts subscribed; roster 20,
  megzieberr visible in the picker by her ruling.
- 🧮 Calculator: Blipwork is the MASTER copy; Stats Quest copies
  js/calculator.js verbatim (its sw v10 matches v88's calc-memory build).

## Decisions (append-only; entries before 2026-09-05 are in STATUS-ARCHIVE.md)
- 2026-09-05 (hers): **no class join code at first login, 4-char minimum
  passwords, default bcrypt cost, no login throttle = DELIBERATE** ("I know my
  kids"), not a security risk. CLOSED, never re-raise.
- 2026-09-05 (hers): low usage = mid-exams, she is deliberately not pushing;
  the 💬 box is one learner's channel answered on WhatsApp — no reply field,
  never rebuild the app around one learner. CLOSED.
- 2026-09-05 (hers): fix queue APPROVED IN SCOPE (see FIX-DAY-2026-09-05-PLAN.md);
  build-go, migrations and ship still need her word on the day.
- 2026-09-05 (hers): exponential concept card gets its p; one-line steepness
  reminder beside the steeper/flatter questions (reminder, not a lesson);
  gentle return for lapsed learners; **Blip outline follows the body colour:
  automatic outline, eyes follow.**
- 2026-09-05 (mine, flagged): the shop_items grants came back because a later
  migration re-created the table — new gotcha: recreating a table re-runs its
  revoke. `_mhq_is_qual_day` + `_mhq_health` keep an explicit service_role
  grant when sealed (send-push calls them). Her three cleanup calls default to
  LEAVE (art-source tracked, "Hayley's way" wording, root planning docs).
- 2026-09-05 (hers): fix-day ticks a to e all DEFAULT: gold on every submit stays;
  exponential written y = a·b^(x − p) + q; stage-3 shop/gallery lock stays on gentle
  return; the three cleanup calls LEAVE; Fable dispatches the workers (one Opus at a
  time). Term toggle switched OFF for exam season (2026-09-05).
- 2026-09-05 (mine, flagged): gentle return counts CALENDAR days (current_date minus
  last_active_at::date >= 7, UTC like every other date rule); it uses the Blip's
  nickname like the cookie hint does; the welcome line replaces the cookie hint for that
  one render; MOOD is not topped up. Invisible while the Term toggle is OFF, by design.
- 2026-09-05 (mine, flagged): the steepness reminder sits in HINT RUNG 1 (tap 💡, or
  auto-open in Boost), not on the face of the question. Exam Focus is EN-only (her
  2026-08-21 ruling), so the concept card has no AF twin. `func-siblings-sketch.js`
  still writes the hyperbola and parabola as (x + p) on purpose ("her p10 order").
- 2026-09-05 (mine, flagged): outline colour = body hue + 7°, full saturation, 67 %
  brightness, read in HSL. PNG items follow only when flagged `outlineFollows` (nine of
  44). Lemon's olive-gold outline and the backwards cap going whole-cap maroon on pink:
  both shown, both reversible one line each.
- 2026-09-05 (hers): "ship after 5, keep both": Builds 1 to 5 shipped as sw v91; Build 6
  in a fresh session as v92; lemon outline + backwards cap STAY.
- 2026-09-06 (hers): **"you run them, two workers, /go"**: Build 6 split into two Opus
  workers in sequence (Fable's recommendation, the service-worker half being the risky
  one); "ship it" → sw v92 live. "ship graph-quest" → gq-v35 live. paper-seed deleted.
- 2026-09-06 (mine, flagged): app code is CACHE-FIRST with a 7-day `x-sw-cached-at`
  stamp; navigations, every .html and js/app.js stay network-first; every network trip
  is a conditional request so the browser's own HTTP cache can never pin a pre-deploy
  file for a week; `?retry=` loads go network-first and are stored under the PLAIN url;
  no localhost bypass (worker 2's call, accepted: the preview pane refuses service
  workers and the headless tools start clean, so only her own Chrome could see a stale
  file, and CLAUDE.md gotcha 10 carries the fix); images unchanged.
- 2026-09-06 (mine, flagged): the plan's "login ≈ 15 files" was a guess. The five lazy
  boundaries give 83; the rest is the app shell that `js/app.js` still imports
  statically (blip.js, concepts.js, calculator.js, questions.js, the ten engines, the
  companion renderer, styles.css, the Blip sprite, two Google fonts). Trimming the shell
  is a separate build, her call, default leave.
- 2026-09-06 (mine, flagged): `verify-exam-skills`' stub fixture card 2 went level 1 → 3
  because the app now runs the REAL easiest-first rule over the fixture (the old stub
  replaced the sorted helper wholesale); the harness exercises more real code, not less.
  `QUEST_META` ships with `xpOnce` false everywhere (no quest has set it since
  2026-08-22); the drift check catches the day one returns.

## ⏳ Pending on Megan
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
