/* Dice pool registry — maps a chapter id to its dice pool module.
   Mirrors js/quests/index.js's questDef() pattern.

   ⚠️ TEST-ONLY WIRING (session 0b, 2026-08-21): "stats" currently
   points at js/quests/dice-stub.js, a stub pool that proves the dice
   loop end-to-end (dealing, seeded resume, XP, the harness) — it is
   NOT the real Statistics recipes. Session 1 replaces this import
   with the real Statistics pool module. Every other chapter has no
   entry yet, matching config.js's DICE_CHAPTERS = [] (nothing dealable
   until a chapter both has a pool AND is allow-listed there). */
import { pool as diceStub } from "./dice-stub.js";

const DICE_POOLS = {
  stats: diceStub,
};

export function dicePool(chapterId) { return DICE_POOLS[chapterId] || null; }
