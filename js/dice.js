/* ============================================================
   DICE — chapter-agnostic generative-round engine (DICE-PLAN.md,
   session 0b build, 2026-08-21).
   ------------------------------------------------------------
   RESUME DESIGN (the foreman's call, DICE-PLAN §"Engineering notes" +
   the session-0b brief): a dice round is never serialized question-
   by-question. Instead every question is REGENERATED from a small
   seed: seed = hash(roundSeed, questionIndex, skillId). Regenerating
   at the same index always reproduces the exact same question — so
   resume is just "call genAt() again for the saved index", not a
   replay of the whole round.

   POOL MODULE INTERFACE (session 1 implements the real Statistics
   pool this way; js/quests/dice-stub.js is the TEST-ONLY example):

     export const pool = {
       chapterId:   "stats",     // must match config.js CHAPTERS[].id
       roundLength: 8,           // this chapter's normal round length
                                  // (question count) — read from HERE,
                                  // never hardcoded in this file.
       entries: [
         { skillId: "q2.mean", kind: "q2.mean", concept: "mean", gen: () => ({ ...question... }) },
         ...
       ],
     };

   entries[].skillId — stable, unique within the pool; stored in the
     save (dice_plays.save.skillIds) so a dealt round can be re-dealt
     identically and "met" coverage can be tracked per skill.
   entries[].kind — the coverage bucket for "deal every kind once,
     then go fully random" (DICE-PLAN's dealing ruling). Usually
     kind === skillId; a pool MAY group several skillIds under one
     kind if it wants coarser first-pass coverage.
   entries[].concept — optional; feeds the existing "I'm lost" concept
     card and struggle log, exactly like a static skill's `concept`.
   entries[].gen — a zero-arg function returning the SAME question
     shape play.js/questions.js already render (mc/reason/yesno/calc/
     tap/calcdo). May optionally set `q.method` (worked-method text,
     plain HTML string) — the dice player renders an always-available
     "Show me the method" link when it is present, and simply omits
     the link when it isn't (DICE-PLAN's method-reveal ruling).
   ============================================================ */
import { setRng, resetRng } from "./rng.js";

/* ---------- seeded PRNG (mulberry32 — small, fast, good-enough
   distribution for question generation, not cryptographic) ---------- */
function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* deterministic 32-bit string hash (FNV-1a) — turns any list of parts
   (roundSeed, index, skillId, ...) into one integer seed. */
function hashSeed(...parts) {
  let h = 0x811c9dc5;
  const s = parts.join("|");
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

/* A fresh round seed. Rolled ONCE when a round starts (via plain
   Math.random — nothing needs to reproduce which round a learner got,
   only reproduce ONE already-dealt round's questions), then stored in
   the save. Nothing downstream ever re-rolls it. */
export function newRoundSeed() {
  return Math.floor(Math.random() * 0xffffffff) >>> 0;
}

/* Run fn() with a deterministic RNG installed for exactly this call,
   then restore Math.random-backed randomness. This is the ONLY place
   in the app that calls setRng()/resetRng() — every skill.gen() call
   in a dice round goes through here (see genAt below), and static
   play never calls withSeed at all. Wrapped in try/finally so a
   generator that throws still leaves rng() back on Math.random. */
export function withSeed(seed, fn) {
  setRng(mulberry32(seed));
  try { return fn(); }
  finally { resetRng(); }
}

/* Regenerate question `index` of a dealt round. THE ONE function both
   a fresh deal and a resume call — so they can never drift apart.
   `dealtSkill` is one of the entries returned by dealRound() (or the
   equivalent {id, gen} shape play.js builds from it — see js/dice-
   play.js), matched to the save's skillIds[index] by the caller.

   `salt` (playtest fix, 2026-08-21): an optional per-question attempt
   counter. salt 0 (the default, and what every existing call site —
   resume included — still passes) reproduces the EXACT same hash as
   before this parameter existed, so nothing about resume changes.
   salt N>0 folds the attempt count into the hash, giving a genuinely
   DIFFERENT-but-still-deterministic question — used by js/play.js's
   dice branch so a same-index re-present (wrong-answer retry, or
   returning from "I'm lost") rolls a fresh "similar one" instead of
   reproducing byte-identical values. Determinism holds per (roundSeed,
   index, salt): calling genAt with the same three always reproduces
   the same question twice. */
export function genAt(roundSeed, index, dealtSkill, salt = 0) {
  const id = dealtSkill.id || dealtSkill.skillId;
  const seed = salt ? hashSeed(roundSeed, index, id, salt) : hashSeed(roundSeed, index, id);
  return withSeed(seed, () => dealtSkill.gen());
}

/* ---------- dealing: coverage-first, then fully random ----------
   pool: [{ skillId, kind, gen, concept? }]
   roundLength: this chapter's normal round length (from the pool's
     own config — see the interface doc above)
   metKinds: kinds this learner has ever completed in this chapter's
     dice pool (persisted server-side in dice_plays.met_kinds, read
     back through mhq_get_state's `dice` payload)

   DICE-PLAN's ruling: "first play(s) deal one round of each kind;
   once a learner has met every kind, fully random." This is NOT
   seeded — WHICH skills land in a round is a genuinely fresh choice
   every deal (stored explicitly in skillIds afterwards, so resume
   doesn't need it to be reproducible); only the CONTENT of each dealt
   question is seeded (via genAt). */
export function dealRound(pool, roundLength, metKinds) {
  const met = new Set(metKinds || []);
  const unmet = pool.filter(e => !met.has(e.kind));
  const rest = pool.filter(e => met.has(e.kind));
  const deck = shuffleFresh(unmet).slice(0, roundLength);
  const pad = shuffleFresh(rest.length ? rest : pool);
  let i = 0;
  while (deck.length < roundLength) {
    deck.push(pad[i % pad.length]);
    i++;
  }
  return deck.slice(0, roundLength);
}

/* plain (unseeded) Fisher–Yates — used only to decide WHICH skills are
   dealt, never to generate a question's numbers. */
function shuffleFresh(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}
