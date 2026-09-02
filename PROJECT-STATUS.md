# Project status — updated 2026-09-02 (🏗️ METHODS DAY: worked methods across all 8 dice chapters + fix batch — ✅ SHIPPED sw v86, commit 4f1cef3, LIVE-VERIFIED)

## How this file works (since 2026-08-30)
Head only. The full session-by-session history — every old entry, every old
Decisions list — moved VERBATIM to **STATUS-ARCHIVE.md** on her ask (this
file had hit 280 KB and every session paid to read it). Nothing was deleted;
that archive stays append-only. Keep THIS file short: when an entry here
stops being current, move it to the top of the archive instead of letting
it pile up. Durable laws also live in CLAUDE.md and the auto-memory.

## Where we are
- **Live** at https://megzieberr.github.io/blipwork/ on **sw v86** (shipped
  2026-09-02 on her "ship it", commit 4f1cef3; Pages built in ~40 s and ALL
  SIXTEEN harnesses ran GREEN against the live URL — incl. verify-gtrig's
  1 037 051 checks and verify-dice 136/136, green for the first time since
  the split day). No SQL.
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

## ⏳ Pending on Megan
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
