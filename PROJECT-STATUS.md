# Project status — updated 2026-10-04 11:00 (🧮 calculator Builds 9 + 10 BUILT and reviewed, LOCAL only; live is still sw v93; ship waits on her word)

## How this file works (since 2026-08-30)
Head only. The full session-by-session history — every old entry, every old
Decisions list — moved VERBATIM to **STATUS-ARCHIVE.md** on her ask (this
file had hit 280 KB and every session paid to read it). Nothing was deleted;
that archive stays append-only. Keep THIS file short: when an entry here
stops being current, move it to the top of the archive instead of letting
it pile up. Durable laws also live in CLAUDE.md and the auto-memory.

## Where we are
- **🧮 Calculator rebuild LIVE as sw v93 (Sun 2026-10-04 08:40, her "please push the new
  calculator").** Ship commit `48a2a91`; fresh 827/827 + 77/77 before the push, sw_check OK,
  Pages build success, live `js/calculator.js` byte-identical to HEAD. Blipwork only:
  **Stats Quest still has the old calculator** (and the old tan(20) Math ERROR).
- **Builds 9 + 10 BUILT and reviewed Sun 2026-10-04 (her "you will be running as foreman
  for builds 9 and 10 ... you may start"), LOCAL only, main is 4 ahead of origin:**
  `d40c276` Build 9 (STAT editor: wrap, inverted cursor cell with its value bottom right,
  typing bottom left, AC cancels, DEL deletes a row, SHIFT 9 / MODE / SETUP inside the
  editor, short SHIFT 1 menu with Edit → Ins / Del-A, X | Y | FREQ, the two-variable
  Sum / Var / MinMax lists), `52bd8e1` Build 10 (GCD / LCM + Argument ERROR, the 12-digit
  cut, DEL inside fractions and roots), `6b9739c` review fixes from a third emulator
  probe (spec §19.8). Fresh after the last edit: verify-calc-casio 1030/1030,
  verify-calculator 77/77, verify-calc-sum-edit 30/30, verify-steps-ux 33/33, verify-dice
  146/146, the four other dice pages green, verify-lazy-load 52/52. sw.js NOT bumped yet.
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

- 2026-10-03 (hers): the in-app calculator must work EXACTLY like her fx-991ZA PLUS II;
  functions school learners won't use may be skipped. Priority: ALPHA, the arrow-edit wipe,
  trig, exponents, SHIFT SOLVE, MODE 7 TABLE, MODE 5 EQN.
- 2026-10-03 (hers): copy the FACTORY settings (her emulator was never changed; a reset
  confirmed Norm 2, TABLE asks f(X) and g(X), STAT FREQ off, d/c improper results).
- 2026-10-04 (hers): "/go ... see how far you get tonight with the usage limit ... shut the
  laptop down when you're done". Fable foreman, one Opus worker per build, local commits.
- 2026-10-04 (mine, flagged): the calculator stays ONE file (`js/calculator.js`, 945 → 3043
  lines) because Stats Quest copies it verbatim; a split into lazy modules is a
  separate optional build. Where the spec was silent the workers kept the old behaviour or
  the simplest reading and gave each choice its own test row; the list is in
  STATUS-ARCHIVE.md (2026-10-04) as "probe list".
- 2026-10-04 (mine, flagged): STAT read-offs are now real editable lines and show 10
  significant digits like the device (x̄ 3,33333333 → 3,333333333). Safe because the stats
  quests (`calcdo`) compare the NUMBER with a tolerance, never the text (checked, tested).
- 2026-10-04 (hers): "please push the new calculator" → sw v93 live, Blipwork only (she tests
  on her phone instead of a laptop try-out). GCD and LCM ARE wanted (reverses the §9 skip).
  Second emulator probe on her /go → spec §19.
- 2026-10-04 (mine, flagged): not measured = not built. STAT types 3 to 8, the two-variable
  Sum / Var / MinMax menus, INEQ for cubics and for one or no real root, ab/c, LineIO, Sci
  do nothing or give Math ERROR rather than a guessed screen. Skipped by her ruling: hyp,
  ENG, INS, ∫, CONST, CONV and friends. The short raised minus of the (−) key is NOT copied
  (house rule: the real minus sign).
- 2026-10-04 (hers): "you will be running as foreman for builds 9 and 10 ... you may start":
  Fable foreman, one Opus worker per build (402k + 272k tokens), local commits, no push.
- 2026-10-04 (mine, flagged): workers do NOT bump sw.js; one bump at ship time (v94 covers
  both builds). Third probe (spec §19.8) overruled three Build 9 guesses, fixed in the
  review: the cursor cell keeps its old value while typing; CLR Setup says Clear Setup? →
  Complete!; every CLR last screen says "Press [AC] key" (small k). Measured but NOT built:
  the STAT calculation screen's 0 bottom right. The workers' other unmeasured choices are
  listed in STATUS-ARCHIVE.md (2026-10-04, "probe list 2").
- 2026-10-04 (mine, flagged): on the device SHIFT 1 INSIDE the data editor is the short
  menu, so a read-off needs AC first. Blipwork's read-off quests start on the calculation
  screen and the concept card already says "type the values, AC"; any Stats Quest hint
  that goes straight from typing to SHIFT 1 must gain the AC at the copy.

## ⏳ Pending on Megan
- 💻 1 line [blocking the fixes going live]: say "ship it" → sw v94 (Builds 9 + 10, GitHub
  only, no Supabase), then test GCD and the stats table on your phone.
- 💻 1 line [whenever]: say "copy it to Stats Quest" (best after v94 ships).
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
- **Ship v94 on her "ship it" (Builds 9 + 10 + review fixes, 4 local commits).** Plan: run
  every verify page + `node verify-lazy-load.mjs` fresh, public-repo scan of the 4-commit
  range, bump `sw.js` CACHE mhq-v93 → mhq-v94, ship commit, push (GitHub Pages only, no
  migration), `python tools/sw_check.py` OK, Pages build `built`, live sw reads v94, live
  calculator.js matches HEAD. Then her phone test: GCD / LCM, the stats table.
- **Stats Quest copy after that, her word:** `js/calculator.js` WITH the new calculator
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
