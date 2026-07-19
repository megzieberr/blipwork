/* ============================================================
   LEVEL MATH — single source of truth for the client.
   Mirrors public._mhq_level(p_xp) in supabase/migration-blipwork.sql
   EXACTLY (same loop, same rounding, same level-20 cap). Used by
   local-backend.js (which has no server to ask) and anywhere the UI
   wants to render a bar before a fresh getState/submitQuest reply
   has landed. Whenever the backend response carries its own
   levelInfo, trust THAT over a local recompute — this module is the
   fallback/mirror, not the authority.

   cost(L) = XP needed to go from level L to level L+1.
   ============================================================ */
export const MAX_LEVEL = 20;

export function costForLevel(level) {
  return Math.round((300 * Math.pow(1.5, level - 1)) / 10) * 10;
}

/* {level, intoLevel, nextCost} for a lifetime xp total. nextCost is
   null once level 20 is reached (no further level to climb to). */
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
