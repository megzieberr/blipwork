/* ============================================================
   LEVEL MATH — single source of truth for the client.
   Mirrors public._mhq_level(p_xp) in supabase/migration-level-
   curve-40.sql EXACTLY (same loop, same cap). Used by
   local-backend.js (which has no server to ask) and anywhere the UI
   wants to render a bar before a fresh getState/submitQuest reply
   has landed. Whenever the backend response carries its own
   levelInfo, trust THAT over a local recompute — this module is the
   fallback/mirror, not the authority.

   cost(L) = XP needed to go from level L to level L+1.

   NEW CURVE (room build S2, 2026-08-08). The old curve was
   cost(L) = round(300 * 1.5^(L-1) / 10) * 10 with a cap of 20; it
   needed ~120 rounds to reach level 10 and made level 20 effectively
   unreachable, so milestone pacing was impossible. XP is stored raw,
   so nothing had to be migrated — every account simply re-maps.
   Anchors, at the measured ~190 XP per fresh round:
     L10 = 3,960 XP (~21 rounds)   L20 = 14,060 (~74)
     L30 = 30,160  (~159)          L40 = 52,260 (~275, a year-long
                                                 aspiration on purpose)
   ============================================================ */
export const MAX_LEVEL = 40;

export function costForLevel(level) {
  return 200 + 60 * (level - 1);
}

/* {level, intoLevel, nextCost} for a lifetime xp total. nextCost is
   null once MAX_LEVEL is reached (no further level to climb to). */
export function levelInfo(xp) {
  let level = 1;
  let rem = Math.max(0, Math.floor(Number(xp) || 0));
  let cost;
  for (;;) {
    cost = costForLevel(level);
    if (rem < cost || level >= MAX_LEVEL) break;
    rem -= cost;
    level += 1;
  }
  return { level, intoLevel: rem, nextCost: level >= MAX_LEVEL ? null : cost };
}

/* The levels that pay a milestone mystery box. Mirrors the array in
   mhq_submit_quest; the SERVER decides and grants — this is here so the
   client can talk about them (and so verify-store can assert the two
   sides agree). */
export const MILESTONE_LEVELS = [10, 20, 30, 40];
