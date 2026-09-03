# Project status — updated 2026-09-03 (📸 FEEDBACK DAY shipped sw v88, live-verified: calc memory + q2 snap fix + feedback snapshots, migration applied)

## How this file works (since 2026-08-30)
Head only. The full session-by-session history — every old entry, every old
Decisions list — moved VERBATIM to **STATUS-ARCHIVE.md** on her ask (this
file had hit 280 KB and every session paid to read it). Nothing was deleted;
that archive stays append-only. Keep THIS file short: when an entry here
stops being current, move it to the top of the archive instead of letting
it pile up. Durable laws also live in CLAUDE.md and the auto-memory.

## Where we are
- **Live on sw v88** (2026-09-03, her "ship it"; feedback day, all three off the
  kids' first real 💬 notes): the calculator keeps its screen across close/
  reopen until page reload (singleton detach in js/calculator.js, synced
  verbatim to Stats Quest sw v10); q2 dropForX snaps where the answer is
  (graph-quest 2f699d2, sw v33 — was 99/300 rolls broken: wrong crossing /
  snap-through second spot / never-snaps NaN; now targetX + oneSpotAtY guard,
  2500/2500 clean, funfun re-synced); 💬 notes carry a SNAPSHOT of the
  on-screen question, shown folded in admin as "On their screen"
  (migration feedback_snapshot APPLIED + verified live BEFORE the push:
  one 6-arg mhq_send_feedback, grants/secdef/search_path checked, anon
  still can't read the table). 8/8 live-asset fetches verified post-deploy.
- Previous: **sw v87** (cookie
  hint, shipped 2026-09-02 evening on her "yes go ahead": room speech bubble
  "Feed <name> his cookie!" + hub 🍪 dot, both gone once fed, one shared
  cookieReady() in js/companion/blip-ui.js. Opus worker built it, foreman
  read the diff + phone-width screenshots; live sw/assets fetch-verified.
  No SQL). Earlier same day: methods day sw v86, commit 4f1cef3, all 16
  harnesses green against the live URL.
- 12 hub chapters (5 Term-3 + 7 Revision) + 2 exam-only; 🎲 dice on 8
  chapters; 📝 Exam Focus 7 chapters / 360 cards; 📈 Fun Functions strip;
  💬 feedback + 📄 papers live; 🔔 notifications LIVE (2 cron jobs, secrets
  set) — kids not opted in yet. Roster 20 (19 learners + megzieberr, still
  visible in the picker — her ruling keeps it until go-live). Class opt-in
  WhatsApp message went out 2026-08-27.
- 🧮 Calculator rounds 1–4 done (full fx-991ZA face, exact engine, Sum menu,
  editable table, `=` steps down the column). Blipwork is the MASTER copy;
  Stats Quest (graad9-statistiek) copies js/calculator.js verbatim.
- **"📖 Show me the method" now shows real working nearly everywhere**:
  pat 39/44, finance 22/51, eqn 68/68, exp 42/43, func 39/40, 2D trig and
  gtrig every non-chain skill; stats was already covered. The remainder are
  deliberate (pure-recall/definition skills whose bare answer IS the whole
  working) or step chains, which never carry a method link (guards intact).

## 🏗️ 2026-09-02 — METHODS DAY (Fable foreman; S1 Sonnet + S2/S3 Opus ≈ 1,26M agent tokens)
- **S1 fix batch (d736522):** `.ch-card` reserves the 💬 FAB's corner column
  (padding-right 56 px, fixes all hub tabs at once); ONE generic Escape
  handler in js/ui.js closes the topmost `.modal-scrim` by dispatching a
  synthetic click AT the scrim — every sheet's own background-tap guard
  (incl. treasure.js's busy gate) is reused, never duplicated; feedback.js's
  ad-hoc Escape listener removed.
- **S2 (141b015):** worked methods for Patterns 3→39/44 + Finance 8→22/51,
  built INSIDE each gen() from the same rolled values; 9 180 regenerated
  questions proven byte-identical to HEAD.
- **S3 (2d6ba9c + 7e72063):** methods for eqn/exp/func/trig/gtrig off
  METHODS-algebra.md, METHODS-trig and her functions digest; np6's Grade-12
  a + (n−1)d leak fixed in hint/answerLabel AND js/concepts.js's
  patConsecDiff "I'm lost" card (her standing Tₙ = an + c ruling decided
  it); verify-dice.html finally learned "steps" (136/136, red since the
  split day); gt3's `const top` renamed cellTop/cellBot before `${top}`
  could ever print "[object Window]". 32 560 regenerated questions
  byte-identical vs HEAD; the np6/concepts wording is the day's ONE
  sanctioned learner-visible text change.
- Foreman review was first-hand throughout: every diff read, 9 phone
  screenshots read by eye, every harness re-run locally AND against the
  live URL after the ship.

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

## ⏳ Pending on Megan
- 📱 2 min [whenever]: close + reopen Blipwork twice (sw v88) → open the 🧮,
  type something, close it, reopen — your typing is still there; then send
  yourself a 💬 note from inside a question and check it lands with "On
  their screen" in the admin Feedback tab.
- 💬 [whenever]: 6 unread learner notes in admin (5 Chichy M, 1 anon) — 3
  are maths questions to answer her in person; her f(x) > g(x) shift
  reasoning is CORRECT, and her q2 "-4 missing" bug report was REAL (fixed).
- 📱 1 min [whenever]: close + reopen Blipwork twice (sw v87) → see the 🍪
  dot on the hub Blip button and the "Feed … his cookie!" bubble in his
  room, feed the cookie, both vanish.
- 📱 5 min [whenever]: close + reopen Blipwork twice (sw v86), then one
  question each in stats q3, tree diagrams, hire purchase, eff↔nom,
  functions round 7 and measurement round 5 — the six split-day chains.
- 📱 3 min [whenever]: roll one dice round in Patterns and one in Equations
  and tap 📖 on a question or two — the method should read like YOUR method
  (TIP Chips, one equation, an + c), not a textbook's.
- 🌐 1 line [your call]: megzieberr is still visible in the class
  name-picker (re-checked live 09-02); say the word and I hide it (one SQL
  line, reversible).

## Next up
- **Her call — q2 dropForX parabolas now ALWAYS land on the turning point**
  (the only height a parabola meets once; measured: all 2502 surviving
  parabola draws are the TP case, parabola share ~26%→~8%). Correct but
  repetitive/gameable. Options: leave it, cut parabolas from that skill, or
  design a variant.
- **Her call — snapshot of a stacked fraction reads as broken-up text** in
  the admin fold (y = −1 over x+1 comes out as three stubby lines). Still
  identifiable; polish only if it bugs her.
- **Her call — gtrig build report findings (design questions, NOT
  cosmetics):** F1 two recall cards show their own answer in the reveal
  frame; F2 the method-link panel opens with the answer; F4 a
  nested-fraction decoy renders unreadably in gt10.
- **Her call — method panel "Answer:" duplication:** methodHtml prefixes
  every panel with "Answer: …" and the steps then repeat it; on eq9's solve
  skills the long worked line shows twice on one screen. One shared-file
  change if she wants it slimmed.
- (carried) Wave-4 dice — each blocked on her: Analytical Geometry (14
  F-flags in the digest), Probability (her material for a digest),
  Measurement (engine ruling), Trig Graphs (Soek-die-fout in graph-quest).
- (carried) CRON_SECRET tidy-up offer.
- Banked: the play.js method-link gate (render 📖 only once a chain is
  finished) — when it lands, delete the `q.type !== "steps"` clauses in
  dice-gtrig.js AND dice-trig.js.
- Stale-comment nits, one small pass: dice-gtrig.js's header says "the 48
  chains" (the pool holds 32); verify-dice-exp prints its ALL GOOD line
  twice.
