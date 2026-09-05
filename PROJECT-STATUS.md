# Project status — updated 2026-09-05 (🔎 READ-ONLY AUDIT DAY: nothing built, still live on sw v90; findings in AUDIT-2026-09-05.md, six worker briefs in FIX-DAY-2026-09-05-PLAN.md, her rulings recorded below)

## How this file works (since 2026-08-30)
Head only. The full session-by-session history — every old entry, every old
Decisions list — moved VERBATIM to **STATUS-ARCHIVE.md** on her ask (this
file had hit 280 KB and every session paid to read it). Nothing was deleted;
that archive stays append-only. Keep THIS file short: when an entry here
stops being current, move it to the top of the archive instead of letting
it pile up. Durable laws also live in CLAUDE.md and the auto-memory.

## Where we are
- **2026-09-05 FIX DAY IN PROGRESS (Fable foreman, dispatching one Opus worker at a
  time).** Her ticks a to e: ALL DEFAULTS. Term toggle OFF (live-verified). Look-back
  sheet phone-verified by her. Build 1 DONE + Fable-reviewed (commit 2c575ed, 228k tokens: migration WRITTEN not
  run, schema.sql byte-mirrored from live, docs corrected, 1.3 GB ignored output
  deleted, git gc). Build 2 DONE + Fable-reviewed (commit 6ad4b8f, 260k: gentle return, migration
  WRITTEN not run; the line lives in the ROOM under the mood hearts; PNG checked at
  375 px). Build 3 DONE + Fable-reviewed (Blipwork 12d52cb + graph-quest 5986454, 226k: exponential
  card teaches y = a·b^(x − p) + q, find-equation card matched, steepness reminder in
  hint rung 1 of q1b + gradSteeper, EN + her AF; PNGs checked at 375 px). Build 4
  DONE + Fable-reviewed (65d8d6f, 259k: outline + eyes follow the body colour, one rule
  for all eleven presets, blue byte-identical, nine PNG items opt in; contact sheet
  checked by eye). Build 5 DONE + Fable-reviewed (d4bbdd6, 243k: 176 companion sprites → WebP, 30.1 MB →
  9.9 MB, zero recolour delta, contact sheet + room shot checked). BOTH MIGRATIONS
  APPLIED LIVE 2026-09-05 via MCP (audit_seal_clamp_tidy + gentle_return; checks green:
  helpers sealed, send-push grants intact, shop_items 42501 to anon, tidy rows done).
  sw v91 ship in progress.
- **Live on sw v90** (2026-09-04 evening, fetch-verified again 2026-09-05): Fun
  Functions look-back sheet ("◀ Vorige" opens the finished question read-only,
  "Terug na my vraag" returns). Built in graph-quest 3f84d87, synced. **No SQL.**
- **2026-09-05 = read-only audit day (Fable).** Verdict: nothing broken. Verified
  clean: 0 log errors/24 h, cron 9/9, no secrets, RLS + grants right on 18/19
  tables, six node harnesses green, `tools/sweep.py 2` = 1 414 renders A=0 D=0
  real C=0, no console errors on live, no learner names in tracked files, no dead
  JS. Findings + her rulings: `AUDIT-2026-09-05.md`. Fix queue (approved in
  scope, NOT started): `FIX-DAY-2026-09-05-PLAN.md` — Build 1 seal + mirror +
  clamp + cleanup + docs · 2 gentle return · 3 exponential p card + steepness
  reminder (graph-quest, sync) · 4 outline follows body colour · 5 sprites→WebP ·
  6 lazy-load + service worker. ≈1.5M agent tokens, one Opus worker at a time,
  Fable reviews each; sw v91 once at ship.
- Previous ships: v89 (2026-09-04 fix day: snapshot fractions, method panel, gtrig
  asks-first, SHIFT tan sweep), v88 (feedback day), v87 (cookie hint), v86
  (methods day). Both wave-4 digests landed 2026-09-04 (Analytical UNBLOCKED,
  Probability waits on its prep step). 12 hub chapters + 2 exam-only; 🎲 dice on
  8 chapters; 📝 Exam Focus 7 chapters / 360 cards; 🔔 push live, 9 accounts
  subscribed; roster 20, megzieberr visible in the picker by her ruling.
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
- 2026-09-04 evening (hers): "ship it" → sw v90 live (look-back sheet).
- 2026-09-04 evening (mine, flagged): the redo feature CANNOT replay the exact
  question (unseeded dealing, interactive items carry closures), so REDO-PLAN.md
  proposes same skill with fresh numbers, no XP, device-local basket; her five
  rulings are pending.
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
  one render; MOOD is not topped up (he comes back well but with empty hearts). The rule
  is invisible while the Term toggle is OFF, by design.

- 2026-09-05 (mine, flagged): the steepness reminder sits in HINT RUNG 1 (tap 💡, or
  auto-open in Boost), not on the face of the question: q1b is a discovery beat (no
  spoilers on the face) and an always-visible slot would need new play.js + CSS. Her
  call if she wants it always visible. Exam Focus is EN-only (her 2026-08-21 ruling), so
  the concept card has no AF twin. `func-siblings-sketch.js` still writes the hyperbola
  and parabola as (x + p) on purpose ("her p10 order").

- 2026-09-05 (mine, flagged): outline colour = body hue + 7°, full saturation, 67 %
  brightness (measured off her own #62ceff / #0062ac pair), read in HSL not HSV so the
  pastels ink instead of greying. PNG items follow only when flagged `outlineFollows`
  (nine of 44: the rest have their own dark colours, hair-bow, shades, snapback).
  Her eye: LEMON's olive-gold outline and the BACKWARDS-CAP going whole-cap maroon on
  pink; both shown, both reversible one line each.

- 2026-09-05 (hers): "ship after 5, keep both": Builds 1 to 5 ship today as sw v91;
  Build 6 (lazy-load + service worker) runs in a FRESH session as v92; lemon's
  olive-gold outline and the backwards cap recolouring whole STAY.

## ⏳ Pending on Megan
- 💻 1 min [at ship]: Supabase dashboard → Edge Functions → delete `paper-seed`
  (neutralised 2026-08-24, answers 410; the MCP cannot delete and the CLI is not installed).
- 📱 5 min [whenever]: roll a gtrig round: the bow-tie / three-boxes / but-why
  cards should ASK and hand the filled frame back after you answer; tap 📖 on
  an eq9 question: the answer reads once, not twice. (The v86–v88 spot-checks,
  calc memory, cookie, six split-day chains, are still unticked if you want them.)
- 🌐 1 line [your call]: megzieberr is still visible in the class
  name-picker; say the word and I hide it (one SQL line, reversible).

## Next up
- **SHIP CHECKLIST for this fix day (Fable, on her "ship it"):** (1) apply
  `supabase/migration-audit-2026-09-05.sql` then `migration-gentle-return-2026-09-05.sql`
  via the MCP `apply_migration`; (2) `paper-seed` (still ACTIVE, v6) is HERS in the
  dashboard: no Supabase CLI on the laptop, the MCP cannot delete; (3) `/migration-check`;
  (4) `sw.js:11` `const CACHE = "mhq-v90"` → `"mhq-v91"`; (5) commit + push;
  (6) fetch-verify live; (7) then the phone;
  (8) graph-quest is 1 commit ahead (5986454, the AF reminder): its own sw bump (gq-v35)
  + push if the two standalone learners should get it, her call.
- **schema.sql still cannot rebuild the DB from scratch** (found by Build 1, pre-existing):
  it never creates `assignments`, `box_grants`, `loot_table`, `push_subscriptions`. A
  small mirror-back build, or the next audit. Also: live has ELEVEN `exam_*` functions +
  `keepalive` = twelve server-only (the plan said thirteen); schema.sql lists the real ones.
- **Build 6 (lazy-load + service worker), ≈500–700k, in a FRESH foreman session as
  sw v92:** the brief is the Build 6 section of FIX-DAY-2026-09-05-PLAN.md, same
  ground rules, same /go shape as today (Fable mints it on her word). Memory-file trim
  DONE 2026-09-05 (96 KB → 36 KB, flagged rulings kept).
- **Analytical Geometry dice chapter — UNBLOCKED.** Digest + her seven
  rulings sit in METHODS-analytical.md; ag5 mines the paper-bank mds.
  Needs a build day on her word.
- **Redo basket ("remember what I got wrong, let me do it again")** — planned, NOT
  built: graph-quest/REDO-PLAN.md (two Opus sessions; her five one-line rulings
  first; same skill with fresh numbers, no XP, device-local basket).
- **Probability dice chapter — UNBLOCKED, one prep step first.** Her rulings
  sit at the TOP of METHODS-probability.md with the file pointers: a worker
  digests the SAG's Gr11 Probability section + the surveyed papers' memo
  working (page-cited) into that file, THEN the build day. Both on her word.
- **verify-store drift — re-measured 2026-09-05:** live == schema.sql for
  mhq_get_state / mhq_credit_cq / mhq_cq_link; the OLDER migration files are the
  stale side (expected). The real mirror gaps are the 3 drifted + 7 missing
  functions, covered by Build 1 step A4. verify-store's assertion should be
  re-pointed at live-vs-schema in that build.
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
