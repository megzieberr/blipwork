/* ============================================================
   DICE STUB POOL — TEST ONLY. Not a real recipe chapter.
   ------------------------------------------------------------
   Proves the dice infrastructure loop (dealing, seeded resume, XP,
   the harness) end-to-end before session 1 writes the real
   Statistics recipes. Session 1 REPLACES this module's registration
   in js/quests/dice-pools.js with the real Statistics pool — this
   file itself can stay (harmless, harness-only) or be deleted once
   the real pool exists; nothing else references it directly.

   Deliberately exercises: an mc skill with a real concept id (to
   prove the "I'm lost" card works in dice mode), a calc skill that
   carries q.method (to prove the "Show me the method" link renders),
   a yesno skill, and a second mc skill using mcNum's value-collision
   dedup — four distinct `kind`s, so the coverage-first dealing
   property (first rounds show every kind) is actually checkable.
   ============================================================ */
import { randInt, pick } from "../ui.js";
import { C, mc, mcNum, dataset } from "./_shared.js";
import { L } from "../lang.js";

function genPickBigger() {
  const a = randInt(2, 40), b = randInt(2, 40);
  if (a === b) return genPickBigger();
  const correct = Math.max(a, b);
  return mc("mean", L(`Which is bigger: <b>${a}</b> or <b>${b}</b>?`, `Watter een is groter: <b>${a}</b> of <b>${b}</b>?`), String(correct), [String(Math.min(a, b))],
    { hint: L("Compare the two numbers.", "Vergelyk die twee getalle."), solution: [{ s: `${correct} > ${Math.min(a, b)}` }] });
}

function genSum() {
  const data = dataset(randInt(3, 5), 1, 20);
  const total = data.reduce((s, v) => s + v, 0);
  return {
    type: "calc", concept: null, dp: 0, expected: total, answerLabel: `${total}`,
    prompt: L(`Find the sum of:<br><span class="num">${data.join("  ;  ")}</span>`, `Vind die som van:<br><span class="num">${data.join("  ;  ")}</span>`),
    hint: L("Add every value.", "Tel elke waarde op."),
    method: L(`Add every value in the list: ${data.join(" + ")} = ${total}. That is the whole method — nothing else to it.`, `Tel elke waarde in die lys op: ${data.join(" + ")} = ${total}. Dis die hele metode, niks meer nie.`),
    solution: [{ s: L(`sum = ${data.join(" + ")} = ${total}`, `som = ${data.join(" + ")} = ${total}`) }],
  };
}

function genIsEven() {
  const n = randInt(1, 99);
  const isEven = n % 2 === 0;
  return {
    type: "yesno", concept: null, yes: isEven,
    prompt: L(`Is <b>${n}</b> even?`, `Is <b>${n}</b> ewe?`),
    solution: [{ s: L(`${n} is ${isEven ? "even" : "odd"}.`, `${n} is ${isEven ? "ewe" : "onewe"}.`) }],
  };
}

function genNearestTen() {
  const n = randInt(1, 990);
  const correct = Math.round(n / 10) * 10;
  const decoys = [correct + 10, correct - 10, n];
  return {
    type: "mc", concept: null,
    prompt: L(`Round <b>${n}</b> to the nearest 10.`, `Rond <b>${n}</b> af tot die naaste 10.`),
    options: mcNum(correct, decoys),
    answerLabel: C(correct),
    solution: [{ s: L(`${n} rounds to ${correct}.`, `${n} word afgerond tot ${correct}.`) }],
  };
}

export const pool = {
  chapterId: "stats",
  roundLength: 4,
  entries: [
    { skillId: "stub.pickBigger", kind: "stub.pickBigger", concept: "mean", gen: genPickBigger },
    { skillId: "stub.sum",        kind: "stub.sum",        concept: null,   gen: genSum },
    { skillId: "stub.isEven",     kind: "stub.isEven",     concept: null,   gen: genIsEven },
    { skillId: "stub.nearestTen", kind: "stub.nearestTen", concept: null,   gen: genNearestTen },
  ],
};
