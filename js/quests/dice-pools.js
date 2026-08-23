/* Dice pool registry — maps a chapter id to its dice pool module.
   Mirrors js/quests/index.js's questDef() pattern.

   Session 1 (2026-08-21) swaps "stats" from the session-0b TEST-ONLY
   stub (js/quests/dice-stub.js — kept on disk as a harness-only
   fixture for verify-dice.html's generic-machinery checks, but no
   longer wired into the app anywhere) to the real Statistics recipe
   pool (js/quests/dice-stats.js, all 58 q1–q8 skills). Every other
   chapter has no entry yet, matching config.js's DICE_CHAPTERS
   (nothing dealable until a chapter both has a pool AND is
   allow-listed there). */
import { pool as diceStats } from "./dice-stats.js";
/* 2026-08-23 build: three more chapter pools, each built by its own
   session from the dice-stats.js recipe. Registered here up front
   (as stubs with no entries) so the sessions never share a file;
   config.js's DICE_CHAPTERS is what actually lights each one up. */
import { pool as diceFinance } from "./dice-finance.js";
import { pool as dicePatterns } from "./dice-patterns.js";
import { pool as diceTrig } from "./dice-trig.js";
/* Wave 2 (2026-08-23 overnight): three more pools, registered up front as
   foreman stubs (no entries) so the parallel sessions never share a file.
   config.js's DICE_CHAPTERS still decides what actually deals. */
import { pool as diceEqn } from "./dice-eqn.js";
import { pool as diceExp } from "./dice-exp.js";
import { pool as diceFunc } from "./dice-func.js";

const DICE_POOLS = {
  stats: diceStats,
  finance: diceFinance,
  pat: dicePatterns,          // config.js chapter id for Number Patterns is "pat"
  trig: diceTrig,
  eqn: diceEqn,
  exp: diceExp,
  func: diceFunc,
};

export function dicePool(chapterId) { return DICE_POOLS[chapterId] || null; }
