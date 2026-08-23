/* ============================================================
   LOCAL BACKEND — localStorage, same interface as SupabaseBackend.
   Self sign-up model. Used for offline play and `?local=1` testing.
   (Passwords are kept locally only; the admin view never exposes them.)

   BLIPWORK ADDITION (2026-07-19): mirrors the gold/XP/level/shop/
   equip/gallery RPCs added in supabase/migration-blipwork.sql.

   SL RESTYLE ADDITION (2026-07-19): mirrors supabase/migration-sl-
   restyle.sql — blue is now the free starting blip colour (cream is
   just a normal selectable colour; the first-completion xp>0 gate
   still applies, just re-anchored from cream to blue), and the
   cosmetic catalogue is the techy set from Megan's mockup. Old items
   are removed from the buyable SHOP_ITEMS list (mirrors active=false
   server-side) but are NEVER stripped from anyone's owned_items, and
   equip() never consults SHOP_ITEMS for ownership — only the blip's
   own owned_items array — so an already-owned old item keeps
   equipping fine, exactly like the server.

   PHASE 2 ADDITION (2026-07-19): mirrors supabase/migration-phase2-
   blip-care.sql 1:1 so `?local=1` behaves like production —
   feeding + growth, the computed sickness clock, pharmacy/recovery,
   the cosmetic locks and the second blip. Server behaviour reproduced:
     • Health is COMPUTED, never stored. A qualifying day = weekday AND
       the term toggle is ON. days_unfed = qualifying days since
       max(last_fed_day, term_on_since). Stages 0/1/2/3 at 0–2/3–4/5–6/7+.
       Turning the term ON stamps term_on_since = today (forgives all
       accrued sickness). Health is household-wide.
     • FREE cookie: one/day (guarded by its OWN last_cookie_day since
       S4), the ONLY thing that grows a blip (feed_count, +1 to EVERY
       blip), and it resets the sickness clock. Refused while sick.
     • S4b grocery (eatFood): consumes one food off TODAY'S TRAY (not the
       pantry — that's soup/medicine only) and resets the sickness clock
       (last_fed_day), but NEVER touches the cookie stamp and NEVER grows
       him — her ruling, so growth stays unbuyable. A stale tray (day
       rolled) reads as empty — no refund.
     • Paid treat: gold sink, no growth, no clock, refused while sick.
     • Care = soup + medicine (bought into the pantry, prices server-
       side); 3 consecutive qualifying care days fully heal; a skipped
       qualifying day resets the streak (weekends/term-off never do).
     • Locks: stage>=2 blocks equip; stage 3 blocks accessory buys +
       gallery reads — but soup/medicine buys ALWAYS work.
     • Second blip: level>=10, one claim, any colour, feed_count 0.
   Growth/sick thresholds + food prices come from the shared config
   (js/config.js BLIP) and level maths from js/companion/level.js —
   never recompute either curve here.

   S5v2 ADDITION (2026-08-08): mirrors supabase/migration-furniture-
   slots.sql — four new equip slots (bed/desk/window/door) carrying
   category-'furniture' rows. Bought and equipped through the SAME paths a
   cosmetic uses (per-blip owned_items, level gate, sick lock); served in
   their own `furnitureShop` payload array so the cosmetic shop and both
   treasure-box loot pools never see them.

   MOOD METER + CRAVINGS ADDITION (2026-08-21, foreman build day session B):
   mirrors supabase/migration-mood-cravings.sql (WRITTEN NOT RUN there —
   this file is the only place either currently executes). Two new fields
   per blip, `mood` (0-5, the last value WRITTEN) and `mood_day` (this
   file's own day-index, see today() below — NOT a calendar date, same
   convention as last_cookie_day/tray_day). Effective mood is computed at
   READ time, never stored decayed: moodEffective() below mirrors the
   server's _mhq_mood_effective exactly (decay MOOD.dailyDecay per day
   since mood_day, floored at 0). The day's craving is picked by
   cravingFor() — deterministic per blip per day, but its hash does NOT
   need to match Postgres hashtext (the migration says so explicitly):
   any deterministic per-day pick is correct offline, since the server is
   the sole authority on live. Gains: feed() +MOOD.cookieGain, eatFood()
   +MOOD.foodGain or +MOOD.cravingGain on a hit, care() +1 on a genuine
   care day — all household-wide, mirroring feed_count's existing shape
   (none of these RPCs has ever taken a blip-slot parameter).

   EXAM FOCUS ADDITION (2026-08-21, foreman build day session C): mirrors
   supabase/migration-exam-focus.sql (WRITTEN NOT RUN there — this file is
   the only place either RPC currently executes). examState/examOpenPart
   below are a straight 1:1 port of mhq_exam_state/mhq_exam_open_part —
   same dedupe (the row's own `completed` flag), same flat pay (EXAM.
   xpPerQuestion/goldPerQuestion from js/config.js, never a number this
   file invents on its own), same "content-shape, not an amount" trust
   note on totalParts. EXAM_CHAPTERS starts empty and js/exam/index.js's
   registry starts empty, so none of this is reachable through normal
   navigation yet either way — only verify-exam.html's local round-trip
   test and a harness-driven exam-play.js call these two directly.

   DEV: globalThis.__BLIP_DEV__.skipDays(n) advances the local clock so
   sick states can be tested without waiting a week; .reset() clears it.
   ============================================================ */
import { levelInfo, MILESTONE_LEVELS } from "./companion/level.js";
import { BLIP, CHAPTERS, XP, MOOD, EXAM } from "./config.js";

const LS = { students: "mhq.students", progress: "mhq.progress", struggles: "mhq.struggles", quests: "mhq.quests", meta: "mhq.meta", blips: "mhq.blips",
  // DICE-PLAN.md (session 0b, 2026-08-21): mirrors supabase's dice_plays
  // table — { [studentId]: { [chapterId]: { plays, metKinds, save } } }.
  dicePlays: "mhq.dicePlays",
  // EXAM-FOCUS-PLAN.md (session 0, 2026-08-21): mirrors supabase's
  // exam_progress table — { [studentId]: { [questionId]: { partsOpened,
  // completed, completedAt } } }.
  examProgress: "mhq.examProgress" };
const read = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } };
const write = (k, v) => localStorage.setItem(k, JSON.stringify(v));

const QUEST_IDS = ["q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8",
  "f1", "f2", "f3", "f4", "f5", "f6", "f7",
  "p1", "p2", "p3", "p4", "p5", "p6", "p7",
  "t1", "t2", "t3", "t4", "t5", "t6", "t7",
  "m1", "m2", "m3", "m4", "m5", "m6",
  "fn1", "fn2", "fn3", "fn4", "fn5", "fn6", "fn7",
  "tg1", "tg2", "tg3", "tg4", "tg5", "tg6", "tg7",
  "ag1", "ag2", "ag3", "ag4", "ag5", "ag6", "ag7",
  "np1", "np2", "np3", "np4", "np5", "np6", "np7",
  "es1", "es2", "es3", "es4", "es5", "es6", "es7", "es8",
  "eq1", "eq2", "eq3", "eq4", "eq5", "eq6", "eq7", "eq8", "eq9",
  "gt1", "gt2", "gt3", "gt4", "gt5", "gt6", "gt7", "gt8", "gt9", "gt10", "gt11", "gt12", "gt13"];
/* offline sandbox opens stats q1–q3 and every later chapter's quests, so each
   whole chapter is playable locally; on the live backend the teacher opens each.
   gt1–gt13 are all in DEFAULT_OPEN too (house rule), but only gt1–gt3 have a
   QUEST_DEFS entry yet — gt4–gt13 still show "Coming soon" until their stage. */
const DEFAULT_OPEN = ["q1", "q2", "q3", "f1", "f2", "f3", "f4", "f5", "f6", "f7",
  "p1", "p2", "p3", "p4", "p5", "p6", "p7",
  "t1", "t2", "t3", "t4", "t5", "t6", "t7",
  "m1", "m2", "m3", "m4", "m5", "m6",
  "fn1", "fn2", "fn3", "fn4", "fn5", "fn6", "fn7",
  "tg1", "tg2", "tg3", "tg4", "tg5", "tg6", "tg7",
  "ag1", "ag2", "ag3", "ag4", "ag5", "ag6", "ag7",
  "np1", "np2", "np3", "np4", "np5", "np6", "np7",
  "es1", "es2", "es3", "es4", "es5", "es6", "es7", "es8",
  "eq1", "eq2", "eq3", "eq4", "eq5", "eq6", "eq7", "eq8", "eq9",
  "gt1", "gt2", "gt3", "gt4", "gt5", "gt6", "gt7", "gt8", "gt9", "gt10", "gt11", "gt12", "gt13"];

/* Cosmetic shop — identical ids/slots/prices/minLevel to the live seed.
   SL restyle (2026-07-19): the techy catalogue from Megan's mockup. The old
   5 ids (round-glasses, cat-ears, party-hat, stubby-arms, angel-wings) are
   deliberately NOT listed here (mirrors active=false server-side, so they
   can't be bought) but are never stripped from anyone's owned_items, and
   equip() below never consults this list for ownership — so an
   already-owned old item still equips fine.

   PRICE THE FREE TIER (2026-08-21) — Megan's ruling, 2026-08-06: "nothing
   may be free once the kids are playing." No learner has the app yet.
   Two changes, mirroring supabase/migration-price-the-free-tier.sql:
     - the eight rows that used to sit at price 0 (one per slot: study-specs,
       beanie, ear-tufts, mitts, nub-wings, cape, light-ring, bead-necklace)
       now carry a real 8-15💎 price, still the cheapest in their own slot,
       same min_level 1.
     - two catalogue gaps closed: butterfly-wing 95/L12 -> 60/L4 (fills the
       gap between the new ex-free wings item and the L6 wings cluster);
       gold-shades 85/L20 -> 130/L8 (glasses' first rare-band item, was
       stuck below 120 with no aspirational top end). Both also moved out
       of their old collections ("girly"/"gangster" — whole-group mystery
       cards gated at L12/L20, which would have hidden the new lower level
       regardless of what this row says) into "basics" — see
       js/companion/collections.js.
   This array is also REGROUPED BY SLOT below (it used to be grouped by
   the historical order items shipped in — SL set / Tripo wave 1/2/3 —
   which is what put every free item first in its slot by accident and
   left real ordering violations everywhere else, e.g. star-shades 40
   ahead of sleepy-eyes 30). Each slot block here reads price-ascending,
   matching `sort` in the SQL and what the shop actually displays — array
   declaration order IS this mirror's display order, since (unlike the
   server) it carries no explicit sort column. itemRarity() (blip-ui.js)
   keys "free" strictly on price === 0, so once nothing below is priced 0
   no cosmetic can show a "Free" label — verified, not changed. */
const SHOP_ITEMS = [
  // ---- hat ----
  { id: "beanie", slot: "hat", price: 12, minLevel: 1 },          // ex-free
  { id: "bolt-antenna", slot: "hat", price: 45, minLevel: 2 },
  { id: "horns", slot: "hat", price: 50, minLevel: 2 },
  { id: "wizard-hat", slot: "hat", price: 55, minLevel: 2 },
  { id: "bucket-hat", slot: "hat", price: 60, minLevel: 9 },
  { id: "backwards-cap", slot: "hat", price: 70, minLevel: 9 },
  { id: "hair-bow", slot: "hat", price: 75, minLevel: 12 },
  { id: "halo", slot: "hat", price: 80, minLevel: 3 },
  { id: "snapback", slot: "hat", price: 80, minLevel: 20 },
  { id: "flower-crown", slot: "hat", price: 90, minLevel: 16 },
  { id: "tiara", slot: "hat", price: 130, minLevel: 12 },         // rare
  { id: "royal-crown", slot: "hat", price: 170, minLevel: 8 },    // rare
  { id: "crown", slot: "hat", price: 180, minLevel: 8 },          // rare
  // ---- glasses ----
  { id: "study-specs", slot: "glasses", price: 10, minLevel: 1 }, // ex-free
  { id: "sleepy-eyes", slot: "glasses", price: 30, minLevel: 1 },
  { id: "visor", slot: "glasses", price: 35, minLevel: 2 },
  { id: "star-shades", slot: "glasses", price: 40, minLevel: 1 },
  { id: "eye-mask", slot: "glasses", price: 40, minLevel: 2 },
  { id: "happy-eyes", slot: "glasses", price: 40, minLevel: 5 },
  { id: "heart-eyes", slot: "glasses", price: 45, minLevel: 1 },
  { id: "angry-eyes", slot: "glasses", price: 45, minLevel: 5 },
  { id: "star-eyes", slot: "glasses", price: 50, minLevel: 5 },
  { id: "dreamy-eyes", slot: "glasses", price: 50, minLevel: 5 },
  { id: "hud-monocle", slot: "glasses", price: 55, minLevel: 2 },
  { id: "lash-eyes", slot: "glasses", price: 55, minLevel: 5 },
  { id: "wink-eyes", slot: "glasses", price: 60, minLevel: 5 },
  { id: "cyber-visor", slot: "glasses", price: 65, minLevel: 3 },
  { id: "sport-shades", slot: "glasses", price: 65, minLevel: 9 },
  { id: "gold-shades", slot: "glasses", price: 130, minLevel: 8 }, // rare (was 85/L20)
  // ---- ears ----
  { id: "ear-tufts", slot: "ears", price: 9, minLevel: 1 },       // ex-free
  { id: "tech-antenna", slot: "ears", price: 40, minLevel: 2 },
  { id: "bunny-ears", slot: "ears", price: 55, minLevel: 2 },
  { id: "headphones", slot: "ears", price: 60, minLevel: 2 },
  { id: "headset-cup", slot: "ears", price: 70, minLevel: 3 },
  { id: "data-fin", slot: "ears", price: 95, minLevel: 4 },
  // ---- arms ----
  { id: "mitts", slot: "arms", price: 13, minLevel: 1 },          // ex-free
  { id: "boxing-gloves", slot: "arms", price: 60, minLevel: 3 },
  { id: "mech-gauntlet", slot: "arms", price: 70, minLevel: 3 },
  { id: "grapple-claw", slot: "arms", price: 85, minLevel: 4 },
  { id: "power-gloves", slot: "arms", price: 100, minLevel: 4 },
  { id: "energy-blade", slot: "arms", price: 135, minLevel: 6 },  // rare
  // ---- wings ----
  { id: "nub-wings", slot: "wings", price: 8, minLevel: 1 },      // ex-free
  { id: "butterfly-wing", slot: "wings", price: 60, minLevel: 4 }, // was 95/L12
  { id: "bat-wings", slot: "wings", price: 140, minLevel: 6 },    // rare
  { id: "drone-wings", slot: "wings", price: 140, minLevel: 6 },  // rare
  { id: "dragon-wings", slot: "wings", price: 145, minLevel: 6 }, // rare
  { id: "aurora-wings", slot: "wings", price: 150, minLevel: 6 }, // rare
  { id: "gold-wings", slot: "wings", price: 150, minLevel: 6 },   // rare
  { id: "fairy-wing", slot: "wings", price: 150, minLevel: 16 },  // rare
  { id: "plasma-wings", slot: "wings", price: 155, minLevel: 6 }, // rare
  // ---- back ----
  { id: "cape", slot: "back", price: 15, minLevel: 1 },           // ex-free
  { id: "schoolbag", slot: "back", price: 50, minLevel: 2 },
  { id: "back-sword", slot: "back", price: 130, minLevel: 6 },    // rare
  { id: "jetpack", slot: "back", price: 200, minLevel: 10 },      // rare
  // ---- effects (Tripo wave 1, 2026-08-05 — new slot; mirrors
  // supabase/migration-effects-slot.sql, verify-store.html cross-checks it) ----
  { id: "light-ring", slot: "effects", price: 11, minLevel: 1 },  // ex-free
  { id: "flame-ring", slot: "effects", price: 45, minLevel: 2 },
  { id: "spark-halo", slot: "effects", price: 90, minLevel: 4 },  // rare
  // ---- neck (2026-08-07 — new slot; mirrors migration-neck-slot.sql /
  // migration-neck-necklaces.sql / migration-neck-chunky-chain.sql, the
  // last of which also DELETES the old 'gold-chain' seeded by the first —
  // an applied migration is never edited, so that removal lives there,
  // not here; 'gold-chain' has never been in this array) ----
  { id: "bead-necklace", slot: "neck", price: 14, minLevel: 1 }, // ex-free
  { id: "flower-garland", slot: "neck", price: 60, minLevel: 3 },
  { id: "star-chain", slot: "neck", price: 80, minLevel: 4 },
  { id: "heart-chain", slot: "neck", price: 95, minLevel: 5 },
  { id: "medal-choker", slot: "neck", price: 125, minLevel: 6 }, // rare
  { id: "chunky-chain", slot: "neck", price: 160, minLevel: 7 }, // rare
];
/* Trinkets — room build S2 (2026-08-08). category 'trinket' server-side:
   never in the shop payload, never equippable, price 0. They arrive only as
   milestone-box loot and live on the STUDENT (household-wide), not on a blip.
   Kept OUT of SHOP_ITEMS on purpose: that list feeds the shop payload AND the
   assignment-box cosmetic pool, and a trinket belongs in neither. Mirrors
   supabase/migration-level-curve-40.sql; labels/art in js/companion/trinkets.js. */
const TRINKET_ITEMS = [
  { id: "pen", price: 0, minLevel: 1 },
  { id: "old-sock", price: 0, minLevel: 1 },
  { id: "smooth-rock", price: 0, minLevel: 1 },
  { id: "paper-clip", price: 0, minLevel: 1 },
  { id: "rubber-duck", price: 0, minLevel: 1 },
  { id: "broken-ruler", price: 0, minLevel: 1 },
];
/* Furniture — room build S5v2 (2026-08-08). category 'furniture' server-side,
   four new slots (bed/desk/window/door). Mirrors
   supabase/migration-furniture-slots.sql row for row; verify-store.html
   parses that file and cross-checks every price and minLevel against this
   list. Which COLLECTION each belongs to (and so which locked "?" card hides
   it) lives in js/companion/collections.js; labels, art and placement live in
   js/companion/furniture.js.

   ⚠️ KEPT OUT OF SHOP_ITEMS ON PURPOSE, exactly like TRINKET_ITEMS. That list
   feeds the cosmetic shop payload AND both treasure-box loot pools — a
   milestone box's rare pool is "price >= 120, any level", which the canopy
   bed and both premium beds would have walked straight into. A box paying
   out a bed the reveal UI cannot draw on Blip is the bug this separation
   prevents; the server prevents it the same way, with category = 'cosmetic'
   on the payload query. */
const FURNITURE_ITEMS = [
  // basic — the free tier every room starts furnished with
  { id: "basic-bed", slot: "bed", price: 0, minLevel: 1 },
  { id: "basic-desk", slot: "desk", price: 0, minLevel: 1 },
  { id: "city-window", slot: "window", price: 0, minLevel: 1 },
  { id: "door-white", slot: "door", price: 0, minLevel: 1 },
  // techy, Lv 8
  { id: "techy-bed", slot: "bed", price: 150, minLevel: 8 },
  { id: "techy-desk", slot: "desk", price: 130, minLevel: 8 },
  { id: "space-window", slot: "window", price: 110, minLevel: 8 },
  // princess, Lv 14
  { id: "princess-bed", slot: "bed", price: 180, minLevel: 14 },
  { id: "princess-desk", slot: "desk", price: 160, minLevel: 14 },
  { id: "mountain-window", slot: "window", price: 130, minLevel: 14 },
  // door colours, Lv 1 — one drawing, tinted in code (never one PNG each)
  { id: "door-mint", slot: "door", price: 10, minLevel: 1 },
  { id: "door-sky", slot: "door", price: 10, minLevel: 1 },
  { id: "door-pink", slot: "door", price: 12, minLevel: 1 },
  { id: "door-lemon", slot: "door", price: 12, minLevel: 1 },
  { id: "door-peach", slot: "door", price: 15, minLevel: 1 },
  { id: "door-lilac", slot: "door", price: 15, minLevel: 1 },
  { id: "door-coral", slot: "door", price: 18, minLevel: 1 },
  { id: "door-seafoam", slot: "door", price: 20, minLevel: 1 },

  /* ---- room decor (2026-08-12) — mirrors migration-room-decor.sql ----
     Three themed SETS on the slots that already exist, plus four NEW slots.

     ⚠️ SHELVES AND THE BEAN BAG HAVE NO FREE DEFAULT. shelf-wood-* is free
     but is NOT a fallback: an empty shelf slot draws nothing (see
     DEFAULT_FURNITURE in js/companion/furniture.js). A bed you cannot remove
     makes sense; a shelf you cannot take down does not.
     ⚠️ A SHELF IS PRICED PER SIDE — left and right walls are two independent
     slots, which is what lets a room mix two shelf designs.
     ⚠️ `wall` is an ordinary equip slot that draws no LAYER: a wallpaper
     replaces the room shell rather than sitting on it. Only the client knows
     that; here it is a furniture row like any other. */
  // nerdy, Lv 4 — the gentlest step up from basic, filling the 1-to-8 gap
  { id: "nerdy-bed", slot: "bed", price: 80, minLevel: 4 },
  { id: "nerdy-desk", slot: "desk", price: 70, minLevel: 4 },
  { id: "nerdy-window", slot: "window", price: 60, minLevel: 4 },
  // sport, Lv 11 — between techy (8) and princess (14)
  { id: "sport-bed", slot: "bed", price: 160, minLevel: 11 },
  { id: "sport-desk", slot: "desk", price: 140, minLevel: 11 },
  { id: "sport-window", slot: "window", price: 120, minLevel: 11 },
  // emo, Lv 18 — past princess, something to aim at before the Lv 20 box
  { id: "emo-bed", slot: "bed", price: 200, minLevel: 18 },
  { id: "emo-desk", slot: "desk", price: 175, minLevel: 18 },
  { id: "emo-window", slot: "window", price: 145, minLevel: 18 },
  // shelves — per side, one drawing per wall (the suffix is the WALL)
  { id: "shelf-wood-left", slot: "shelf-left", price: 0, minLevel: 1 },
  { id: "shelf-wood-right", slot: "shelf-right", price: 0, minLevel: 1 },
  { id: "shelf-glossy-left", slot: "shelf-left", price: 60, minLevel: 7 },
  { id: "shelf-glossy-right", slot: "shelf-right", price: 60, minLevel: 7 },
  { id: "shelf-bracket-left", slot: "shelf-left", price: 90, minLevel: 13 },
  { id: "shelf-bracket-right", slot: "shelf-right", price: 90, minLevel: 13 },
  { id: "shelf-panel-left", slot: "shelf-left", price: 120, minLevel: 19 },
  { id: "shelf-panel-right", slot: "shelf-right", price: 120, minLevel: 19 },
  // bean bag, Lv 6 — one piece, no free version
  { id: "beanbag", slot: "beanbag", price: 90, minLevel: 6 },
  // wallpaper — plain is the shell the room has always had, and is free
  { id: "wall-plain", slot: "wall", price: 0, minLevel: 1 },
  { id: "wall-cloud", slot: "wall", price: 70, minLevel: 5 },
  { id: "wall-moons", slot: "wall", price: 100, minLevel: 10 },
  { id: "wall-mountains", slot: "wall", price: 140, minLevel: 16 },
  { id: "wall-stripes", slot: "wall", price: 170, minLevel: 22 },

  /* ---- closet designs (2026-08-12) — six of her Tripo closets ----
     The EXISTING door slot, so no VALID_SLOTS change and no constraint
     change: six new pictures for a slot that already works.
     ⚠️ Not a breach of "the door colours share one picture" — that is about
     COLOURS (one drawing tinted nine ways). A patterned closet is a
     different piece of furniture in the same slot. */
  { id: "closet-nerdy", slot: "door", price: 40, minLevel: 3 },
  { id: "closet-sport", slot: "door", price: 60, minLevel: 7 },
  { id: "closet-flower", slot: "door", price: 70, minLevel: 10 },
  { id: "closet-lines", slot: "door", price: 80, minLevel: 13 },
  { id: "closet-starry", slot: "door", price: 100, minLevel: 16 },
  { id: "closet-emo", slot: "door", price: 120, minLevel: 20 },
];
/* Pharmacy / grocery — prices mirror the server shop_items 'food' rows.
   `kind` is the item's own id on the server too (mhq_get_state builds the
   foodShop payload with 'kind', shop_items.item_id), so the two always
   coincide; it is kept as its own field because the client reads it. */
const FOOD_ITEMS = [
  { id: "soup", kind: "soup", price: BLIP.food.soup, minLevel: 1 },
  { id: "medicine", kind: "medicine", price: BLIP.food.medicine, minLevel: 1 },
  { id: "treat", kind: "treat", price: BLIP.food.treat, minLevel: 1 },
  /* Room build S4 (2026-08-08) — the 44 groceries. Mirrors
     supabase/migration-food-shop.sql row for row; verify-store.html parses
     that file and cross-checks every price and minLevel against this list,
     because an item added to only one side is the drift that actually
     happens. Which TIER each belongs to (and therefore which locked "?"
     card hides it) lives in js/companion/collections.js, not here — this
     list is only the server's own price/min_level. */
  // Fresh — fruit & veg, Lv 1
  { id: "apple", kind: "apple", price: 5, minLevel: 1 },
  { id: "banana", kind: "banana", price: 5, minLevel: 1 },
  { id: "grapes", kind: "grapes", price: 8, minLevel: 1 },
  { id: "naartjie", kind: "naartjie", price: 6, minLevel: 1 },
  { id: "strawberry", kind: "strawberry", price: 7, minLevel: 1 },
  { id: "watermelon", kind: "watermelon", price: 9, minLevel: 1 },
  { id: "broccoli", kind: "broccoli", price: 4, minLevel: 1 },
  { id: "carrot", kind: "carrot", price: 4, minLevel: 1 },
  { id: "green-pepper", kind: "green-pepper", price: 5, minLevel: 1 },
  { id: "mielie", kind: "mielie", price: 6, minLevel: 1 },
  { id: "peas", kind: "peas", price: 4, minLevel: 1 },
  { id: "tomato", kind: "tomato", price: 5, minLevel: 1 },
  // Bakery — pastries, Lv 4
  { id: "choc-cookie", kind: "choc-cookie", price: 12, minLevel: 4 },
  { id: "croissant", kind: "croissant", price: 14, minLevel: 4 },
  { id: "doughnut", kind: "doughnut", price: 15, minLevel: 4 },
  { id: "cupcake", kind: "cupcake", price: 16, minLevel: 4 },
  { id: "custard-tart", kind: "custard-tart", price: 18, minLevel: 4 },
  { id: "koeksister", kind: "koeksister", price: 20, minLevel: 4 },
  // Hot meals, Lv 7
  { id: "toastie", kind: "toastie", price: 22, minLevel: 7 },
  { id: "hot-dog", kind: "hot-dog", price: 24, minLevel: 7 },
  { id: "nuggets", kind: "nuggets", price: 26, minLevel: 7 },
  { id: "spaghetti", kind: "spaghetti", price: 28, minLevel: 7 },
  { id: "burger", kind: "burger", price: 30, minLevel: 7 },
  { id: "pizza", kind: "pizza", price: 32, minLevel: 7 },
  // Braai, Lv 11
  { id: "biltong", kind: "biltong", price: 34, minLevel: 11 },
  { id: "drumstick", kind: "drumstick", price: 36, minLevel: 11 },
  { id: "boerewors", kind: "boerewors", price: 38, minLevel: 11 },
  { id: "sosatie", kind: "sosatie", price: 40, minLevel: 11 },
  { id: "lamb-chop", kind: "lamb-chop", price: 44, minLevel: 11 },
  { id: "steak", kind: "steak", price: 48, minLevel: 11 },
  // Sweets, Lv 14
  { id: "lollipop", kind: "lollipop", price: 18, minLevel: 14 },
  { id: "gummy-bear", kind: "gummy-bear", price: 20, minLevel: 14 },
  { id: "marshmallow", kind: "marshmallow", price: 22, minLevel: 14 },
  { id: "jelly-beans", kind: "jelly-beans", price: 24, minLevel: 14 },
  { id: "toffee", kind: "toffee", price: 26, minLevel: 14 },
  { id: "chocolate-bar", kind: "chocolate-bar", price: 30, minLevel: 14 },
  // Drinks, Lv 17
  { id: "water-bottle", kind: "water-bottle", price: 20, minLevel: 17 },
  { id: "milk", kind: "milk", price: 24, minLevel: 17 },
  { id: "juice-box", kind: "juice-box", price: 26, minLevel: 17 },
  { id: "cold-drink", kind: "cold-drink", price: 28, minLevel: 17 },
  { id: "orange-juice", kind: "orange-juice", price: 30, minLevel: 17 },
  { id: "cola", kind: "cola", price: 32, minLevel: 17 },
  { id: "hot-chocolate", kind: "hot-chocolate", price: 38, minLevel: 17 },
  { id: "milkshake", kind: "milkshake", price: 45, minLevel: 17 },
];
/* The three category-'food' rows that are NOT groceries and can never be
   eaten by mhq_eat_food: soup and medicine are care supplies consumed as a
   PAIR by care(), and `treat` is a gold sink that never enters the pantry. */
const NOT_EDIBLE = ["soup", "medicine", "treat"];
const VALID_COLOURS = ["blue", "cream", "pink", "mint", "sky", "lilac", "peach", "lemon", "seafoam", "coral", "lavender"];
// Mirrors mhq_equip's hard-coded key list on the server. Adding a slot means
// changing BOTH, plus shop_items_slot_cat_check — miss one and equipping the
// new slot returns bad_equipped (that is exactly how `back` broke in July).
// S5v2 (2026-08-08) added the four furniture slots to the same list: a bed is
// equipped through exactly the machinery a hat is.
// Room decor (2026-08-12) added four more: two shelf walls, the bean bag and
// wallpaper. `wall` is here for the same reason it is in mhq_equip's list —
// a wallpaper is equipped exactly like a bed; that it swaps the room's
// background instead of painting a layer on it is a client-side detail.
const VALID_SLOTS = ["hat", "ears", "glasses", "wings", "arms", "back", "effects", "neck",
  "bed", "desk", "window", "door",
  "shelf-left", "shelf-right", "beanbag", "wall"];

/* Roster login (2026-08-21, CQ-BRIDGE-PLAN.md Part 1). Mirrors
   mhq_list_students / mhq_first_login so ?local=1 exercises the CQ-style
   picker offline. Fake names only, never persisted beyond localStorage —
   one already has a password (exercises the "enter your password" /
   returning-login branch), one does not (exercises first login / the "new"
   tag). Seeded into the students store (below, in seed()), merge-only —
   an account already promoted past first-login in this browser is never
   overwritten. */
/* CQ-BRIDGE-PLAN.md Part 3 (2026-08-21): Thabo stays UNLINKED (no cq_name)
   so the Collect panel's "no broken UI" rule is exercisable — Lerato is
   LINKED with a fake CQ total, so tapping Collect twice in a row exercises
   BOTH the "linked, something to collect" and "linked, nothing new" states
   on one account (250 XP at the seeded rate 30 pays 8, banking 10; the
   second tap has only that banked 10, which is short of another diamond).
   _cq_total is this file's own stand-in for "what Circle Quest would
   report" — real CQ is a separate project the edge function reads over
   REST; the local mirror has no second database to model, so it keeps the
   fake total on the same row. See collectCq() below and __BLIP_DEV__
   .setCqTotal() for the verify-store round-trip. */
const FAKE_ROSTER = [
  { username: "thabo_test", display_name: "Thabo Test", password: null, cq_name: null, cq_total: 0 },
  { username: "lerato_test", display_name: "Lerato Test", password: "demo1234", cq_name: "Lerato Test", cq_total: 250 },
];
const CQ_RATE = 30; // mirrors app_config.cq_rate's seeded value (migration-cq-bridge.sql)

/* Three fake classmates with VARIED blips + health, so the gallery has real
   layout content: a healthy solo grown blip, a tired two-blip household, and a
   bedridden learner. Never persisted, never real, purely for testing the grid.
   SL restyle (2026-07-19): dressed in the new techy catalogue, in blue-era
   colours (blue itself plus the rest of the palette — cream is no longer
   special so nobody needs to wear it here). */
const FAKE_CLASSMATES = [
  {
    username: "keabetswe", level: 8, stage: 0,
    blips: [{ slot: 1, colour: "blue", equipped: { hat: "halo" }, feedCount: 47, growthStage: 3 }],
  },
  {
    username: "sipho", level: 12, stage: 1,
    blips: [
      { slot: 1, colour: "sky", equipped: { glasses: "star-shades", ears: "headphones" }, feedCount: 30, growthStage: 2 },
      { slot: 2, colour: "coral", equipped: { arms: "power-gloves" }, feedCount: 4, growthStage: 0 },
    ],
  },
  {
    username: "amahle", level: 5, stage: 2,
    blips: [{ slot: 1, colour: "lilac", equipped: { glasses: "heart-eyes" }, feedCount: 12, growthStage: 1 }],
  },
];

/* ---------- clock (day-index; dev offset lets tests skip days) ---------- */
const DAY_MS = 86400000;
function dayOffset() { return read(LS.meta, {}).dayOffset || 0; }
function today() { return Math.floor(Date.now() / DAY_MS) + dayOffset(); }
function isWeekday(dayIdx) { const dow = new Date(dayIdx * DAY_MS).getUTCDay(); return dow >= 1 && dow <= 5; } // 1..5 = Mon..Fri
/* count qualifying weekdays d with fromExcl < d <= toIncl */
function countQualWeekdays(fromExcl, toIncl) { let n = 0; for (let d = fromExcl + 1; d <= toIncl; d++) if (isWeekday(d)) n++; return n; }
function growthStage(feed) { return BLIP.growthThresholds.filter(t => (feed || 0) >= t).length; }

/* ---------- MOOD METER + CRAVINGS (mirrors _mhq_mood_effective / _mhq_craving) ---------- */
/* Effective mood, read-time only — `mood` on the stored blip record is
   always the last value WRITTEN, never the decayed value. Mirrors the
   server's greatest(0, mood - dailyDecay * days_since) exactly, using
   this file's own day-index clock so __BLIP_DEV__.skipDays exercises it
   the same way it exercises the sickness clock. */
function moodEffective(mood, moodDay) {
  if (moodDay == null) return 0;
  return Math.max(0, (mood || 0) - MOOD.dailyDecay * Math.max(0, today() - moodDay));
}
/* A plain string hash — NOT Postgres's hashtext, and it does not need to
   be: migration-mood-cravings.sql is explicit that the local pick only
   needs to be deterministic per (blip, day), since the server is the
   sole authority once live. Keyed by student id + slot (this file's blip
   records have no separate uuid of their own) + today's day-index. */
function simpleDayHash(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
  return h;
}
/* The day's ONE deterministic craved food for one blip: active groceries
   (never soup/medicine/treat — see the migration's judgement-call note b;
   treat can never be eaten via eatFood, so craving it would make the
   cravingGain bonus unearnable) at or below the learner's level. */
function cravingFor(sid, slot, level) {
  const pool = FOOD_ITEMS.filter(f => !NOT_EDIBLE.includes(f.id) && (f.minLevel || 1) <= (level || 1));
  if (!pool.length) return null;
  const idx = simpleDayHash(`${sid}:${slot}:${today()}`) % pool.length;
  return pool[idx].id;
}
/* Backfills mood/mood_day on a blip record read from an older localStorage
   save (mirrors ensureBlipFields' role for the student record — but blips
   are always rewritten whole via writeBlips on any mutation, so a
   read-time default here is enough; nothing needs a one-time persisted
   migration pass). */
function withMoodFields(b) {
  return { ...b, mood: typeof b.mood === "number" ? b.mood : 0, mood_day: ("mood_day" in b) ? b.mood_day : null };
}

/* ---------- Phase 3: assignments ----------
   The assignment stores assigned_on as a DAY INDEX (this file's own clock, so
   __BLIP_DEV__.skipDays still works on it), but the contract hands the client
   ISO dates — convert on the way out. dayIdx*DAY_MS is UTC midnight, so the
   slice is exactly that day.
   The quest -> chapter lookup mirrors what the card does client-side; config
   is the single source of truth for the mapping, and the live `assignments`
   table deliberately stores no chapter column for the same reason. */
function isoDay(dayIdx) { return new Date(dayIdx * DAY_MS).toISOString().slice(0, 10); }
function questChapterId(questId) {
  for (const ch of CHAPTERS) if ((ch.quests || []).some(q => q.id === questId)) return ch.id;
  return null;
}
function activeAssignment() { return read(LS.meta, {}).assignment || null; }
/* Identity of one assignment, used as the box-grant key. Includes the day it
   was set, so re-assigning the same quest next week is a NEW assignment and
   legitimately earns a second box — matching the server, where a fresh row
   means a fresh assignment_id. */
function assignmentKey(a) { return a ? `${a.quest_id}@${a.assigned_on}` : null; }
/* Mirrors mhq_get_state's `assignment` key. `done` reads the grant, NOT
   progress.passed — passed stays true forever once earned, so it cannot say
   whether THIS assignment was completed. */
function assignmentView(rec) {
  const a = activeAssignment();
  if (!a || !a.quest_id) return null;
  const grants = (rec && Array.isArray(rec.box_grants)) ? rec.box_grants : [];
  return {
    questId: a.quest_id,
    chapterId: questChapterId(a.quest_id),
    note: a.note || null,
    assignedOn: isoDay(a.assigned_on),
    dueOn: a.due_on || null,
    done: grants.includes(assignmentKey(a)),
  };
}

/* ---------- Phase 3: treasure-box loot (mirrors loot_table + mhq_open_box) ----------
   In production the weights live in the `loot_table` table and never reach the
   client; these constants exist purely so ?local=1 behaves the same offline.
   Food loot is soup/medicine ONLY — the cookie is the free daily feed(), not a
   pantry item, so a cookie dropped in the pantry would be dead inventory with
   nothing to spend it on. Boxes stocking the pharmacy is also a kinder safety
   net for a learner whose Blip has fallen ill. */
const LOOT_WEIGHTS = { gold: 55, food: 30, cosmetic: 15 };
const LOOT_GOLD = { min: 15, max: 40 };
const LOOT_FOOD = ["soup", "medicine"];
/* Milestone-box weights (S2). Mirrors the loot_table rows whose `box` column
   is 'milestone': 50% diamonds / 25% rare cosmetic / 25% trinket. The gold
   figure is a RATE per milestone level, not a flat amount — 10 pays 100
   diamonds at level 10 and 400 at level 40, exactly like amount_min in SQL. */
const MILESTONE_WEIGHTS = { gold: 50, cosmetic: 25, trinket: 25 };
const MILESTONE_GOLD_PER_LEVEL = 10;
const MILESTONE_RARE_PRICE = 120;   // the rare pool's price floor (itemRarity's band)
function rollKind(weights) {
  const total = Object.values(weights).reduce((a, w) => a + w, 0);
  let r = Math.random() * total;
  for (const [kind, w] of Object.entries(weights)) { r -= w; if (r < 0) return kind; }
  return "gold";
}
function rollLootKind() { return rollKind(LOOT_WEIGHTS); }
const pickOne = (arr) => arr[Math.floor(Math.random() * arr.length)];

/* ---------- term config (mirrors app_config) ---------- */
function termConfig() { const m = read(LS.meta, {}); return { running: !!m.term_running, onSince: (typeof m.term_on_since === "number" ? m.term_on_since : null) }; }
function isQualDay() { const { running } = termConfig(); return running && isWeekday(today()); }

/* Household health, computed exactly like _mhq_health(). */
function computeHealth(lastFed, careStreak) {
  const { running, onSince } = termConfig();
  let du = 0;
  if (running && onSince != null) {
    const wstart = Math.max(lastFed == null ? onSince : lastFed, onSince);
    du = countQualWeekdays(wstart, today());
  }
  const stage = du >= 7 ? 3 : du >= 5 ? 2 : du >= 3 ? 1 : 0;
  const cs = careStreak || 0;
  return { stage, daysUnfed: du, recovering: cs >= 1 && stage >= 2, careStreak: cs,
    locks: { dress: stage >= 2, shop: stage >= 3, gallery: stage >= 3 } };
}

/* Adds the Blipwork fields to a student record in place (mutates); returns
   true if anything was missing/changed, so the caller knows to persist. */
function ensureBlipFields(s) {
  let changed = false;
  if (typeof s.gold !== "number") { s.gold = 0; changed = true; }
  if (typeof s.xp !== "number") { s.xp = 0; changed = true; }
  if (typeof s.blip_name !== "string" || !s.blip_name) { s.blip_name = "Blip"; changed = true; }
  if (typeof s.blip_colour !== "string" || !VALID_COLOURS.includes(s.blip_colour)) { s.blip_colour = "blue"; changed = true; }
  if (!Array.isArray(s.owned_items)) { s.owned_items = []; changed = true; }
  if (!s.equipped || typeof s.equipped !== "object" || Array.isArray(s.equipped)) { s.equipped = {}; changed = true; }
  // Phase 2 care/feeding bookkeeping
  if (!("last_fed_day" in s)) { s.last_fed_day = null; changed = true; }
  /* S4 (2026-08-08): the free cookie got its OWN day-stamp, because eating a
     bought grocery used to consume it (they shared last_fed_day). Now
     last_fed_day = "when did he last eat anything" (the sickness clock) and
     last_cookie_day = "has the free cookie been claimed today". Backfilled
     from last_fed_day, mirroring the migration, so nobody who already had
     their cookie today is handed a second one. */
  if (!("last_cookie_day" in s)) { s.last_cookie_day = s.last_fed_day ?? null; changed = true; }
  if (typeof s.care_streak !== "number") { s.care_streak = 0; changed = true; }
  if (!("last_care_day" in s)) { s.last_care_day = null; changed = true; }
  if (!s.pantry || typeof s.pantry !== "object" || Array.isArray(s.pantry)) { s.pantry = {}; changed = true; }
  // S4b (2026-08-08 revision): groceries moved OFF the pantry onto a
  // same-day tray, day-stamped the same way as last_cookie_day. `tray_day`
  // is this file's own day-index (see today()), not a calendar date.
  if (!s.tray || typeof s.tray !== "object" || Array.isArray(s.tray)) { s.tray = {}; changed = true; }
  if (!("tray_day" in s)) { s.tray_day = null; changed = true; }
  // Phase 3: treasure boxes. box_grants mirrors the server's box_grants TABLE
  // (one entry per assignment completed) and is what makes `done` and the box
  // count agree — see assignmentView.
  if (typeof s.boxes_pending !== "number") { s.boxes_pending = 0; changed = true; }
  if (!Array.isArray(s.box_grants)) { s.box_grants = []; changed = true; }
  // S2 (2026-08-08): milestone mystery boxes + the trinket shelf. Both are
  // household-wide, mirroring students.milestone_boxes / students.trinkets.
  // milestone_boxes is a QUEUE of milestone LEVELS ([10, 20]), not a count —
  // each box owes diamonds scaled to its own milestone. milestone_grants is
  // the dedupe list (mirrors the milestone_grants table's primary key) and is
  // never cleared by a progress reset, so re-climbing cannot re-farm boxes.
  if (!Array.isArray(s.milestone_boxes)) { s.milestone_boxes = []; changed = true; }
  if (!Array.isArray(s.milestone_grants)) { s.milestone_grants = []; changed = true; }
  if (!Array.isArray(s.trinkets)) { s.trinkets = []; changed = true; }
  // CQ-BRIDGE-PLAN.md Part 3: cq_name mirrors the roster-login column
  // (nullable — most students never played CQ); cq_xp_credited is the
  // collect watermark; cq_total is this file's own fake "what CQ would
  // report" stand-in (see FAKE_ROSTER's comment above) — real CQ is a
  // separate project with no local mirror of its own.
  if (!("cq_name" in s)) { s.cq_name = null; changed = true; }
  if (typeof s.cq_xp_credited !== "number") { s.cq_xp_credited = 0; changed = true; }
  if (typeof s.cq_total !== "number") { s.cq_total = 0; changed = true; }
  return changed;
}

/* ---------- blips store: { [studentId]: [ {slot,name,colour,feed_count,owned_items,equipped} ] } ---------- */
function allBlips() { return read(LS.blips, {}); }
function getBlips(sid) { return (read(LS.blips, {})[sid] || []).slice().sort((a, b) => a.slot - b.slot).map(withMoodFields); }
function ensureBlip(sid, rec) {
  // create the slot-1 blip from the (migrated) student record if missing
  const store = read(LS.blips, {});
  const arr = store[sid] || [];
  if (!arr.some(b => b.slot === 1)) {
    arr.push({ slot: 1, name: rec.blip_name || "Blip", colour: rec.blip_colour || "blue", feed_count: 0, owned_items: Array.isArray(rec.owned_items) ? rec.owned_items.slice() : [], equipped: (rec.equipped && typeof rec.equipped === "object") ? { ...rec.equipped } : {}, mood: 0, mood_day: null });
    store[sid] = arr; write(LS.blips, store);
  }
  return arr.slice().sort((a, b) => a.slot - b.slot).map(withMoodFields);
}
function writeBlips(sid, arr) { const store = read(LS.blips, {}); store[sid] = arr; write(LS.blips, store); }

function seed() {
  if (!read(LS.students, null)) write(LS.students, {});
  // create the quests store, and merge in any quest ids added since (e.g. a new chapter)
  const q = read(LS.quests, null) || {};
  let changed = !read(LS.quests, null);
  QUEST_IDS.forEach((id, i) => { if (!q[id]) { q[id] = { is_open: DEFAULT_OPEN.includes(id), sort: i + 1 }; changed = true; } });
  if (changed) write(LS.quests, q);
  if (!read(LS.progress, null)) write(LS.progress, {});
  if (!read(LS.struggles, null)) write(LS.struggles, {});
  // meta: admin pw + Phase 2 term config + dev clock offset
  const meta = read(LS.meta, null) || {};
  let metaChanged = read(LS.meta, null) == null;
  if (!("adminPassword" in meta)) { meta.adminPassword = "admin"; metaChanged = true; }
  if (!("term_running" in meta)) { meta.term_running = false; metaChanged = true; }   // starts OFF, like live
  if (!("term_on_since" in meta)) { meta.term_on_since = null; metaChanged = true; }
  if (!("dayOffset" in meta)) { meta.dayOffset = 0; metaChanged = true; }
  if (!("assignment" in meta)) { meta.assignment = null; metaChanged = true; }   // Phase 3
  if (metaChanged) write(LS.meta, meta);
  if (!read(LS.blips, null)) write(LS.blips, {});

  // Roster login (2026-08-21): merge in the FAKE_ROSTER, never overwriting an
  // account that already exists (e.g. one already promoted past first login
  // in this browser). Mirrors migration-roster-login.sql seeding a class list
  // server-side; `hidden` defaults false, exactly like the SQL column default.
  {
    const stR = read(LS.students, {});
    let rosterChanged = false;
    FAKE_ROSTER.forEach((r) => {
      if (Object.values(stR).some((s) => s.username === r.username)) return;
      const id = "s" + (Math.max(0, ...Object.keys(stR).map((k) => +k.slice(1) || 0)) + 1);
      stR[id] = {
        id, username: r.username, display_name: r.display_name, password: r.password, hidden: false,
        last_active_at: null,
        gold: 0, xp: 0, blip_name: "Blip", blip_colour: "blue", owned_items: [], equipped: {},
        last_fed_day: null, last_cookie_day: null, care_streak: 0, last_care_day: null, pantry: {},
        // CQ-BRIDGE-PLAN.md Part 3 — see FAKE_ROSTER's comment above.
        cq_name: r.cq_name ?? null, cq_xp_credited: 0, cq_total: r.cq_total || 0,
      };
      rosterChanged = true;
    });
    if (rosterChanged) write(LS.students, stR);
  }

  // Blipwork field migration + blips-table backfill (mirrors the live migrations).
  const st = read(LS.students, {});
  const progress = read(LS.progress, {});
  let stChanged = false;
  Object.values(st).forEach((s) => {
    const wasMigrated = typeof s.gold === "number";
    if (ensureBlipFields(s)) stChanged = true;
    if (!wasMigrated) {
      const sum = Object.values(progress[s.id] || {}).reduce((a, p) => a + (p.total_xp || 0), 0);
      if (s.xp === 0 && sum > 0) { s.xp = sum; stChanged = true; }
    }
    ensureBlip(s.id, s); // backfill slot-1 blip row
  });
  if (stChanged) write(LS.students, st);
}
const findByUser = u => Object.values(read(LS.students, {})).find(s => s.username === String(u).toLowerCase()) || null;
function verify(u, pw) { const s = findByUser(u); return (s && s.password != null && s.password === pw) ? s : null; }
function touch(id) { const st = read(LS.students, {}); if (st[id]) { st[id].last_active_at = Date.now(); write(LS.students, st); } }
const openQuests = () => { const q = read(LS.quests, {}); return Object.keys(q).filter(id => q[id].is_open).sort((a, b) => q[a].sort - q[b].sort); };
function shopCatalogue() { return SHOP_ITEMS.map(it => ({ id: it.id, slot: it.slot, price: it.price, minLevel: it.minLevel })); }
/* S4: `minLevel` joins the payload (mhq_get_state's foodShop select) so a
   food card can say "Unlocks at Lv N" and the grocery tiers can be shown
   the same way the cosmetic collections are. */
function foodCatalogue() { return FOOD_ITEMS.map(it => ({ id: it.id, kind: it.kind, price: it.price, minLevel: it.minLevel })); }
/* S5v2: its own payload array (mhq_get_state's furnitureShop), same four
   fields as the cosmetic shop, so the furniture panel can reuse the cards
   the cosmetic shop already draws. */
function furnitureCatalogue() { return FURNITURE_ITEMS.map(it => ({ id: it.id, slot: it.slot, price: it.price, minLevel: it.minLevel })); }
/* MOOD + CRAVINGS: reads the owning student's level straight from the
   students store (mirrors mhq_get_state's own lvl lookup) so callers don't
   have to thread it through — blipsView(sid) keeps its original one-arg
   shape every existing caller already uses. */
function blipsView(sid) {
  const rec = read(LS.students, {})[sid];
  const lvl = rec ? levelInfo(rec.xp || 0).level : 1;
  return getBlips(sid).map(b => ({
    slot: b.slot, name: b.name, colour: b.colour, feedCount: b.feed_count, growthStage: growthStage(b.feed_count),
    owned: b.owned_items, equipped: b.equipped,
    mood: moodEffective(b.mood, b.mood_day), craving: cravingFor(sid, b.slot, lvl),
  }));
}

/* dev clock control — advance/reset the local "today" so sick states are testable */
globalThis.__BLIP_DEV__ = {
  skipDays(n) { const m = read(LS.meta, {}); m.dayOffset = (m.dayOffset || 0) + (Number(n) || 0); write(LS.meta, m); return { dayOffset: m.dayOffset, today: today() }; },
  reset() { const m = read(LS.meta, {}); m.dayOffset = 0; write(LS.meta, m); return { dayOffset: 0, today: today() }; },
  today,
  /* Phase 3: hand yourself a box so the treasure modal can be exercised
     offline without setting an assignment and playing it. Takes the first
     student if no username is given (the usual ?local=1 case). */
  grantBox(n = 1, username) {
    const stAll = read(LS.students, {});
    const rec = username ? Object.values(stAll).find(s => s.username === String(username).toLowerCase()) : Object.values(stAll)[0];
    if (!rec) return { error: "no student — log in once first" };
    ensureBlipFields(rec);
    rec.boxes_pending = (rec.boxes_pending || 0) + (Number(n) || 1);
    write(LS.students, stAll);
    return { username: rec.username, boxesPending: rec.boxes_pending };
  },
  /* S2: queue a MILESTONE mystery box without grinding to level 10, so the
     "Mystery box" variant of the modal can be exercised offline. Does NOT
     write a milestone_grants entry — this is a test prop, not a real grant,
     so it can be used over and over. */
  grantMysteryBox(milestone = 10, username) {
    const stAll = read(LS.students, {});
    const rec = username ? Object.values(stAll).find(s => s.username === String(username).toLowerCase()) : Object.values(stAll)[0];
    if (!rec) return { error: "no student — log in once first" };
    ensureBlipFields(rec);
    rec.milestone_boxes.push(Number(milestone) || 10);
    write(LS.students, stAll);
    return { username: rec.username, milestoneBoxes: rec.milestone_boxes.slice() };
  },
  /* CQ-BRIDGE-PLAN.md Part 3: set (or link) a student's fake "what Circle
     Quest would report" total for verify-store's controlled round-trip —
     raising it between two collectCq() calls is how the remainder-banked
     case is exercised without waiting on real CQ data. Links cq_name to
     the display_name if the student isn't already linked, so a fresh
     verify-store test account (never in FAKE_ROSTER) can be turned into a
     linked one on demand. */
  setCqTotal(total, username) {
    const stAll = read(LS.students, {});
    const rec = username ? Object.values(stAll).find(s => s.username === String(username).toLowerCase()) : Object.values(stAll)[0];
    if (!rec) return { error: "no student — log in once first" };
    ensureBlipFields(rec);
    if (!rec.cq_name) rec.cq_name = rec.display_name;
    rec.cq_total = Number(total) || 0;
    write(LS.students, stAll);
    return { username: rec.username, cqName: rec.cq_name, cqTotal: rec.cq_total, cqXpCredited: rec.cq_xp_credited };
  },
};

export const LocalBackend = {
  // ---- Roster login (2026-08-21) — mirrors mhq_list_students / mhq_first_login ----
  async listStudents() {
    seed();
    const st = read(LS.students, {});
    return Object.values(st)
      .filter((s) => !s.hidden)
      .map((s) => ({ username: s.username, display_name: s.display_name, has_password: s.password != null }))
      .sort((a, b) => a.display_name.localeCompare(b.display_name));
  },
  async firstLogin(name, password) {
    seed();
    if ((password || "").length < 4) return { ok: false, error: "too_short" };
    const st = read(LS.students, {});
    const s = Object.values(st).find((x) => x.display_name === name && !x.hidden);
    if (!s) return { ok: false, error: "no_such_user" };
    if (s.password != null) return { ok: false, error: "already_set" };
    s.password = password; s.last_active_at = Date.now(); write(LS.students, st);
    ensureBlip(s.id, s); // create the slot-1 blip up front, mirroring signup()
    return { ok: true, username: s.username };
  },
  /* Kept for the several existing fixtures in verify-store.html, which use it
     purely as a test-account creator — it never called the retired sign-up
     RPC (that call lived only in js/supabase.js, now removed) and is
     untouched by the roster-login change. Real learners never reach this
     path any more: the picker only calls listStudents/firstLogin above. */
  async signup(username, name, password) {
    seed();
    const u = String(username).trim().toLowerCase();
    if (u.length < 3) return { ok: false, error: "username_short" };
    if (!/^[a-z0-9_.]+$/.test(u)) return { ok: false, error: "username_chars" };
    if ((password || "").length < 4) return { ok: false, error: "too_short" };
    if (!String(name).trim()) return { ok: false, error: "no_name" };
    if (findByUser(u)) return { ok: false, error: "username_taken" };
    const st = read(LS.students, {});
    const id = "s" + (Math.max(0, ...Object.keys(st).map(k => +k.slice(1) || 0)) + 1);
    st[id] = {
      id, username: u, display_name: String(name).trim(), password, last_active_at: Date.now(),
      gold: 0, xp: 0, blip_name: "Blip", blip_colour: "blue", owned_items: [], equipped: {},
      last_fed_day: null, last_cookie_day: null, care_streak: 0, last_care_day: null, pantry: {},
    };
    write(LS.students, st);
    ensureBlip(id, st[id]); // create the slot-1 blip up front
    return { ok: true };
  },
  async login(username, password) {
    seed();
    const s = findByUser(username);
    if (!s) return { ok: false, error: "no_such_user" };
    if (s.password == null) return { ok: false, needsReset: true };
    if (s.password !== password) return { ok: false, error: "wrong_password" };
    touch(s.id); return { ok: true };
  },
  async setPassword(username, password) {
    seed();
    if ((password || "").length < 4) return { ok: false, error: "too_short" };
    const st = read(LS.students, {});
    const s = Object.values(st).find(x => x.username === String(username).toLowerCase());
    if (!s) return { ok: false, error: "no_such_user" };
    if (s.password != null) return { ok: false, error: "already_set" };
    s.password = password; s.last_active_at = Date.now(); write(LS.students, st);
    return { ok: true };
  },
  async getState(username, password) {
    const s = verify(username, password);
    if (!s) return { ok: false, error: "auth" };
    touch(s.id);
    const stAll = read(LS.students, {});
    const rec = stAll[s.id];
    if (ensureBlipFields(rec)) write(LS.students, stAll);
    ensureBlip(s.id, rec);
    // S4b: a stale tray (yesterday's groceries) is discarded here too — no
    // refund — and the clearing is persisted, mirroring mhq_get_state.
    if (rec.tray_day != null && rec.tray_day < today() && Object.keys(rec.tray || {}).length) {
      rec.tray = {};
      write(LS.students, stAll);
    }
    const progress = read(LS.progress, {})[s.id] || {};
    const totalXp = Object.values(progress).reduce((a, p) => a + (p.total_xp || 0), 0);
    const health = computeHealth(rec.last_fed_day, rec.care_streak);
    const blips = blipsView(s.id);
    const slot1 = blips.find(b => b.slot === 1) || null;
    const { running } = termConfig();
    // S4: the cookie's availability reads its OWN stamp, so eating a bought
    // grocery (which sets last_fed_day) leaves the free cookie waiting.
    const canFeedToday = health.stage < 2 && (rec.last_cookie_day == null || rec.last_cookie_day < today());
    const canCareToday = health.stage >= 2 && isQualDay() && (rec.last_care_day == null || rec.last_care_day < today());
    return {
      ok: true, student: { id: s.id, name: s.display_name, username: s.username }, progress, totalXp, openQuests: openQuests(),
      gold: rec.gold, xp: rec.xp, levelInfo: levelInfo(rec.xp),
      blip: slot1 ? { name: slot1.name, colour: slot1.colour, owned: slot1.owned, equipped: slot1.equipped } : { name: "Blip", colour: "blue", owned: [], equipped: {} },
      blips, shop: shopCatalogue(), foodShop: foodCatalogue(), furnitureShop: furnitureCatalogue(),
      pantry: rec.pantry || {}, tray: rec.tray || {},
      health, canFeedToday, canCareToday, termRunning: running,
      // CQ-BRIDGE-PLAN.md Part 3: mirrors mhq_get_state's one new field —
      // the Collect panel renders only when this is true.
      cqLinked: !!rec.cq_name,
      // DICE-PLAN.md (session 0b): { [chapterId]: { plays, metKinds, save } }
      // — mirrors mhq_get_state's additive `dice` field.
      dice: read(LS.dicePlays, {})[s.id] || {},
      // Phase 3
      assignment: assignmentView(rec),
      // S2: `pending` is the TOTAL number of unopened boxes so the existing
      // 🎁 badge keeps working untouched; `mystery` is how many of those are
      // milestone boxes, which is what titles the modal (milestone boxes are
      // always opened first — the server and this file share that rule).
      boxes: {
        pending: (rec.boxes_pending || 0) + (rec.milestone_boxes || []).length,
        mystery: (rec.milestone_boxes || []).length,
      },
      trinkets: (rec.trinkets || []).slice(),
    };
  },
  async submitQuest(username, password, quest, { score, xp }) {
    const s = verify(username, password);
    if (!s) return { ok: false, error: "auth" };
    const all = read(LS.progress, {});
    const p = all[s.id] || {};
    const prev = p[quest] || { best_score: 0, attempts: 0, total_xp: 0, passed: false };
    const wasPassed = prev.passed, passed = score >= 0.8;
    const clamped = Math.max(0, Math.min(Math.round(xp) || 0, 1000));
    const xpGain = wasPassed ? Math.round(clamped * 0.25) : clamped;   // first completion = full XP, replay = 25%
    const goldGain = 10;                                              // flat, every completed round
    p[quest] = { best_score: Math.max(prev.best_score, score), attempts: prev.attempts + 1, total_xp: prev.total_xp + xpGain, passed: prev.passed || passed, last_played_at: Date.now() };
    all[s.id] = p; write(LS.progress, all); touch(s.id);

    const stAll = read(LS.students, {});
    const rec = stAll[s.id];
    ensureBlipFields(rec);
    const oldLevel = levelInfo(rec.xp).level;
    rec.xp += xpGain;
    rec.gold += goldGain;

    // Phase 3: one treasure box the first time she PASSES the assigned quest.
    // The grant list is the dedupe (mirrors the server's box_grants primary
    // key), so replays award nothing.
    let boxAwarded = false;
    const asg = activeAssignment();
    if (passed && asg && asg.quest_id === quest) {
      const key = assignmentKey(asg);
      if (!rec.box_grants.includes(key)) {
        rec.box_grants.push(key);
        rec.boxes_pending = (rec.boxes_pending || 0) + 1;
        boxAwarded = true;
      }
    }

    const info = levelInfo(rec.xp);

    /* S2: milestone mystery boxes at 10/20/30/40. Mirrors mhq_submit_quest —
       and note the test is `>=`, not "crossed on this submit". The curve
       change re-maps the existing test account to exactly level 10 without
       any submit ever crossing it, so a strict crossing test would owe that
       account a box it could never receive. The grant list gives the same
       one-box-per-milestone-ever guarantee, so `>=` is simply kinder to
       anyone already past a milestone. A replay awards nothing. */
    let mysteryAwarded = 0;
    for (const ms of MILESTONE_LEVELS) {
      if (info.level < ms) break;                       // MILESTONE_LEVELS is ascending
      if (rec.milestone_grants.includes(ms)) continue;
      rec.milestone_grants.push(ms);
      rec.milestone_boxes.push(ms);
      mysteryAwarded += 1;
    }

    write(LS.students, stAll);

    return {
      ok: true, passed, badgeEarned: passed && !wasPassed, xpAwarded: xpGain, alreadyPassed: wasPassed,
      goldAwarded: goldGain, xp: rec.xp, gold: rec.gold, level: info.level, levelUp: info.level > oldLevel, levelInfo: info,
      boxAwarded, mysteryAwarded,
      boxes: {
        pending: (rec.boxes_pending || 0) + rec.milestone_boxes.length,
        mystery: rec.milestone_boxes.length,
      },
    };
  },

  // ---- DICE-PLAN.md: generative practice rounds (session 0b, 2026-08-21) ----
  // Mirrors supabase/migration-dice.sql's mhq_dice_save / mhq_submit_dice
  // (WRITTEN, NOT RUN there — this file is the ONLY place either currently
  // executes). dice_plays row shape here: { plays, metKinds, save }.
  async diceSave(username, password, chapter, save) {
    const s = verify(username, password);
    if (!s) return { ok: false, error: "auth" };
    const all = read(LS.dicePlays, {});
    const forStudent = all[s.id] || (all[s.id] = {});
    const row = forStudent[chapter] || (forStudent[chapter] = { plays: 0, metKinds: [], save: null });
    row.save = save || null;
    write(LS.dicePlays, all);
    touch(s.id);
    return { ok: true };
  },
  async submitDice(username, password, chapter) {
    const s = verify(username, password);
    if (!s) return { ok: false, error: "auth" };
    const all = read(LS.dicePlays, {});
    const forStudent = all[s.id] || (all[s.id] = {});
    const row = forStudent[chapter] || (forStudent[chapter] = { plays: 0, metKinds: [], save: null });
    const save = row.save;
    if (!save || !Array.isArray(save.skillIds) || !save.skillIds.length) return { ok: false, error: "no_active_round" };
    const answered = Array.isArray(save.answeredCorrect) ? save.answeredCorrect : [];
    if (answered.length < save.skillIds.length) return { ok: false, error: "round_incomplete" };

    // THE mechanism, mirrored from js/play.js's onResult accumulator (and
    // supabase/migration-dice.sql's _mhq_dice_xp) — NOT a client-reported
    // total (DICE-PLAN.md "the client never names an amount"): every
    // correct answer counts as first-try in dice mode (no mastery loop),
    // so the streak-capped bonus always applies.
    let streak = 0, xpGain = 0;
    for (let i = 0; i < save.skillIds.length; i++) {
      if (answered[i]) { streak++; xpGain += XP.perCorrect * Math.min(streak, XP.streakCap) + XP.firstTryBonus; }
      else streak = 0;
    }
    const goldGain = 10;   // flat, every completed dice round — matches mhq_submit_quest's flat gold

    const stAll = read(LS.students, {});
    const rec = stAll[s.id];
    ensureBlipFields(rec);
    const oldLevel = levelInfo(rec.xp).level;
    rec.xp += xpGain;
    rec.gold += goldGain;
    write(LS.students, stAll);

    const metKinds = new Set(row.metKinds || []);
    // save.kinds is the coverage bucket per dealt question (parallel to
    // skillIds — a pool MAY group several skillIds under one kind); falls
    // back to skillIds for a save written before this field existed.
    (save.kinds && save.kinds.length === save.skillIds.length ? save.kinds : save.skillIds).forEach(k => metKinds.add(k));
    row.plays = (row.plays || 0) + 1;
    row.metKinds = [...metKinds];
    row.save = null;
    write(LS.dicePlays, all);
    touch(s.id);

    const info = levelInfo(rec.xp);
    const correct = answered.filter(Boolean).length;
    return {
      ok: true, xpAwarded: xpGain, goldAwarded: goldGain, correct, total: save.skillIds.length,
      xp: rec.xp, gold: rec.gold, level: info.level, levelUp: info.level > oldLevel, levelInfo: info, plays: row.plays,
    };
  },

  // ---- EXAM-FOCUS-PLAN.md: the tab's server surface (session 0,
  // 2026-08-21). Mirrors supabase/migration-exam-focus.sql's
  // mhq_exam_state / mhq_exam_open_part (WRITTEN, NOT RUN there — this
  // file is the ONLY place either currently executes). exam_progress row
  // shape here: { partsOpened, completed, completedAt }. No correctness
  // signal anywhere — the app never marks, by design.
  async examState(username, password) {
    const s = verify(username, password);
    if (!s) return { ok: false, error: "auth" };
    return { ok: true, progress: read(LS.examProgress, {})[s.id] || {} };
  },
  async examOpenPart(username, password, questionId, partId, totalParts) {
    const s = verify(username, password);
    if (!s) return { ok: false, error: "auth" };
    if (!questionId || !partId) return { ok: false, error: "bad_request" };
    // content-shape data, not an amount — see migration-exam-focus.sql's
    // header judgement-call note (same posture mirrored here).
    const total = Math.max(1, Math.min(Number(totalParts) || 1, 40));

    const all = read(LS.examProgress, {});
    const forStudent = all[s.id] || (all[s.id] = {});
    const row = forStudent[questionId] || (forStudent[questionId] = { partsOpened: [], completed: false, completedAt: null });

    // the completed flag IS the dedupe — a replayed call after completion
    // records nothing further and pays nothing (her ruling: paid once
    // per question ever).
    if (row.completed) {
      return { ok: true, partsOpened: row.partsOpened.slice(), completed: true, justCompleted: false, xpAwarded: 0, goldAwarded: 0 };
    }

    if (!row.partsOpened.includes(partId)) row.partsOpened.push(partId);
    const justCompleted = row.partsOpened.length >= total;

    let xpGain = 0, goldGain = 0;
    const stAll = read(LS.students, {});
    const rec = stAll[s.id];
    ensureBlipFields(rec);
    const oldLevel = levelInfo(rec.xp).level;

    if (justCompleted) {
      row.completed = true;
      row.completedAt = Date.now();
      xpGain = EXAM.xpPerQuestion;
      goldGain = EXAM.goldPerQuestion;
      rec.xp += xpGain;
      rec.gold += goldGain;
      write(LS.students, stAll);
    }
    write(LS.examProgress, all);
    touch(s.id);

    const info = levelInfo(rec.xp);
    return {
      ok: true, partsOpened: row.partsOpened.slice(), completed: row.completed, justCompleted,
      xpAwarded: xpGain, goldAwarded: goldGain,
      xp: rec.xp, gold: rec.gold, level: info.level, levelUp: info.level > oldLevel, levelInfo: info,
    };
  },

  async logStruggle(username, password, concept) {
    const s = verify(username, password);
    if (!s) return { ok: false, error: "auth" };
    const all = read(LS.struggles, {});
    const g = all[s.id] || (all[s.id] = {});
    g[concept] = { count: ((g[concept] && g[concept].count) || 0) + 1, last_ts: Date.now() };
    write(LS.struggles, all);
    return { ok: true };
  },

  // ---- Blip: shop / equip / gallery ----
  async buyItem(username, password, item, slot = 1) {
    const s = verify(username, password);
    if (!s) return { ok: false, error: "auth" };
    slot = (slot === 1 || slot === 2) ? slot : 1;
    const stAll = read(LS.students, {});
    const rec = stAll[s.id];
    ensureBlipFields(rec);
    ensureBlip(s.id, rec);
    const stage = computeHealth(rec.last_fed_day, rec.care_streak).stage;

    const food = FOOD_ITEMS.find(f => f.id === item);
    if (food) {
      if (food.id === "treat") {
        if (stage >= 2) return { ok: false, error: "REFUSES_FOOD" };
        if (rec.gold < food.price) return { ok: false, error: "gold", price: food.price, gold: rec.gold };
        rec.gold -= food.price; write(LS.students, stAll);
        return { ok: true, gold: rec.gold, treat: true };
      }
      if (food.id === "soup" || food.id === "medicine") {
        // pharmacy supplies — the PANTRY, unchanged by S4b, never expire.
        // Pharmacy is ALWAYS open, even at critical (both are minLevel 1).
        if (levelInfo(rec.xp).level < (food.minLevel || 1)) return { ok: false, error: "locked", minLevel: food.minLevel };
        if (rec.gold < food.price) return { ok: false, error: "gold", price: food.price, gold: rec.gold };
        rec.gold -= food.price;
        rec.pantry = { ...(rec.pantry || {}) };
        rec.pantry[food.id] = (rec.pantry[food.id] || 0) + 1;
        write(LS.students, stAll);
        return { ok: true, gold: rec.gold, pantry: rec.pantry };
      }
      // S4b: a grocery lands on TODAY'S TRAY. A stale tray (yesterday's
      // leftovers) is discarded first — no refund, her ruling.
      if (levelInfo(rec.xp).level < (food.minLevel || 1)) return { ok: false, error: "locked", minLevel: food.minLevel };
      if (rec.gold < food.price) return { ok: false, error: "gold", price: food.price, gold: rec.gold };
      rec.gold -= food.price;
      const tray = (rec.tray_day != null && rec.tray_day >= today()) ? { ...(rec.tray || {}) } : {};
      tray[food.id] = (tray[food.id] || 0) + 1;
      rec.tray = tray;
      rec.tray_day = today();
      write(LS.students, stAll);
      return { ok: true, gold: rec.gold, tray: rec.tray };
    }

    /* S5v2: furniture is bought exactly like a cosmetic — same per-blip
       owned_items, same level gate, same sick lock — so the two lists are
       simply searched in turn. A TRINKET is in neither, and so still comes
       back `no_item`, which is what mhq_buy_item's category guard does. */
    const itm = SHOP_ITEMS.find(x => x.id === item) || FURNITURE_ITEMS.find(x => x.id === item);
    if (!itm) return { ok: false, error: "no_item" };
    if (stage >= 3) return { ok: false, error: "BLIP_TOO_SICK" };
    const blips = ensureBlip(s.id, rec);
    const blip = blips.find(b => b.slot === slot);
    if (!blip) return { ok: false, error: "no_blip" };
    if (blip.owned_items.includes(item)) return { ok: false, error: "owned" };
    const lvl = levelInfo(rec.xp).level;
    if (lvl < itm.minLevel) return { ok: false, error: "locked", minLevel: itm.minLevel };
    if (rec.gold < itm.price) return { ok: false, error: "gold", price: itm.price, gold: rec.gold };
    rec.gold -= itm.price;
    blip.owned_items = [...blip.owned_items, item];
    write(LS.students, stAll); writeBlips(s.id, blips);
    return { ok: true, gold: rec.gold, owned: blip.owned_items, slot };
  },
  async equip(username, password, { equipped, colour, blipName, slot = 1 } = {}) {
    const s = verify(username, password);
    if (!s) return { ok: false, error: "auth" };
    slot = (slot === 1 || slot === 2) ? slot : 1;
    const stAll = read(LS.students, {});
    const rec = stAll[s.id];
    ensureBlipFields(rec);
    const stage = computeHealth(rec.last_fed_day, rec.care_streak).stage;
    if (stage >= 2) return { ok: false, error: "BLIP_TOO_SICK" };  // he won't get up
    const blips = ensureBlip(s.id, rec);
    const blip = blips.find(b => b.slot === slot);
    if (!blip) return { ok: false, error: "no_blip" };

    if (equipped != null) {
      if (typeof equipped !== "object" || Array.isArray(equipped)) return { ok: false, error: "bad_equipped" };
      const bad = Object.entries(equipped).some(([k, v]) => !VALID_SLOTS.includes(k) || (!!v && !blip.owned_items.includes(v)));
      if (bad) return { ok: false, error: "bad_equipped" };
      blip.equipped = { ...equipped };
    }
    if (colour != null) {
      if (!VALID_COLOURS.includes(colour)) return { ok: false, error: "bad_colour" };
      // slot-1's first non-blue colour needs xp>0 (blue is the free starting
      // colour; the 2nd blip is any colour at hatch)
      if (colour !== "blue" && slot === 1 && rec.xp <= 0) return { ok: false, error: "colour_locked" };
      blip.colour = colour;
    }
    if (blipName != null) {
      const nm = String(blipName).trim().slice(0, 24);
      if (!nm) return { ok: false, error: "bad_name" };
      blip.name = nm;
    }
    writeBlips(s.id, blips);
    return { ok: true, slot, blip: { name: blip.name, colour: blip.colour, owned: blip.owned_items, equipped: blip.equipped } };
  },
  async gallery(username, password) {
    const s = verify(username, password);
    if (!s) return { ok: false, error: "auth" };
    const stAll = read(LS.students, {});
    const rec = stAll[s.id];
    ensureBlipFields(rec);
    ensureBlip(s.id, rec);
    const myStage = computeHealth(rec.last_fed_day, rec.care_streak).stage;
    if (myStage >= 3) return { ok: false, error: "BLIP_TOO_SICK" };  // gallery locked at critical
    const myBlips = blipsView(s.id).map(b => ({ slot: b.slot, colour: b.colour, equipped: b.equipped, feedCount: b.feedCount, growthStage: b.growthStage }));
    const slot1 = myBlips.find(b => b.slot === 1) || { colour: rec.blip_colour, equipped: {} };
    const mine = { username: rec.username, level: levelInfo(rec.xp).level, me: true, stage: myStage, colour: slot1.colour, equipped: slot1.equipped, blips: myBlips };
    const others = FAKE_CLASSMATES.map(c => {
      const s1 = c.blips.find(b => b.slot === 1) || c.blips[0];
      return { username: c.username, level: c.level, me: false, stage: c.stage, colour: s1.colour, equipped: s1.equipped, blips: c.blips };
    });
    const rows = [mine, ...others].sort((a, b) => a.username.localeCompare(b.username));
    return { ok: true, gallery: rows };
  },

  // ---- CQ-BRIDGE-PLAN.md Part 3: the XP -> diamonds bridge ----
  // Mirrors the combined effect of the edge function + mhq_cq_link +
  // mhq_credit_cq — this file has no separate "CQ project" to model, so it
  // does the whole round trip against the fake cq_total on the student's
  // own row (see FAKE_ROSTER / __BLIP_DEV__.setCqTotal). Same contract as
  // SupabaseBackend.collectCq: {ok, paid, gold} or {ok:false, error}.
  async collectCq(username, password) {
    const s = verify(username, password);
    if (!s) return { ok: false, error: "auth" };
    const stAll = read(LS.students, {});
    const rec = stAll[s.id];
    ensureBlipFields(rec);
    if (!rec.cq_name) return { ok: false, error: "not_linked" };

    const delta = Math.max(0, (Number(rec.cq_total) || 0) - (Number(rec.cq_xp_credited) || 0));
    const diamonds = Math.floor(delta / CQ_RATE);
    if (diamonds > 0) {
      rec.gold = (rec.gold || 0) + diamonds;
      rec.cq_xp_credited = (rec.cq_xp_credited || 0) + diamonds * CQ_RATE;
      write(LS.students, stAll);
    }
    return { ok: true, paid: diamonds, gold: rec.gold };
  },

  // ---- Blip: Phase 2 feeding / care / second blip ----
  async feed(username, password) {
    const s = verify(username, password);
    if (!s) return { ok: false, error: "auth" };
    const stAll = read(LS.students, {});
    const rec = stAll[s.id];
    ensureBlipFields(rec);
    const blips = ensureBlip(s.id, rec);
    const stage = computeHealth(rec.last_fed_day, rec.care_streak).stage;
    if (stage >= 2) return { ok: false, error: "REFUSES_FOOD" };
    // S4: guarded by the cookie's OWN stamp — a bought apple sets
    // last_fed_day (it resets the sickness clock) but never eats the cookie.
    if (rec.last_cookie_day != null && rec.last_cookie_day >= today()) return { ok: false, error: "already_fed" };
    blips.forEach(b => {
      b.feed_count = (b.feed_count || 0) + 1; // household growth
      // MOOD (2026-08-21): the cookie is also worth +MOOD.cookieGain,
      // same household-wide update as feed_count — mirrors mhq_feed.
      b.mood = Math.min(MOOD.max, moodEffective(b.mood, b.mood_day) + MOOD.cookieGain);
      b.mood_day = today();
    });
    rec.last_cookie_day = today();
    rec.last_fed_day = today();
    write(LS.students, stAll); writeBlips(s.id, blips);
    return { ok: true, blips: blipsView(s.id).map(b => ({ slot: b.slot, name: b.name, colour: b.colour, feedCount: b.feedCount, growthStage: b.growthStage, mood: b.mood, craving: b.craving })),
      health: computeHealth(rec.last_fed_day, rec.care_streak), canFeedToday: false };
  },
  /* ---- S4b: eat a grocery off TODAY'S TRAY (mirrors mhq_eat_food) ----
     The tray is server state, so "the food disappeared" has to be a
     server fact — the drag gesture only asks for it. A stale tray (day
     rolled since the buy) reads as empty here, same as a fresh state read
     — none_left, no refund.

     HER RULING (2026-08-08): eating a bought grocery
       DOES     consume the food and reset the SICKNESS CLOCK (it is real
                food — a learner who feeds him a steak must not still find
                him starving), and
       DOES NOT touch the free daily cookie (its own stamp,
                last_cookie_day) and does NOT grow him. Growth stays
                cookie-only, so growth can never be bought. */
  async eatFood(username, password, item) {
    const s = verify(username, password);
    if (!s) return { ok: false, error: "auth" };
    const stAll = read(LS.students, {});
    const rec = stAll[s.id];
    ensureBlipFields(rec);
    const blips = ensureBlip(s.id, rec);

    const food = FOOD_ITEMS.find(f => f.id === item);
    if (!food) return { ok: false, error: "no_item" };
    if (NOT_EDIBLE.includes(item)) return { ok: false, error: "not_edible" };

    const stage = computeHealth(rec.last_fed_day, rec.care_streak).stage;
    if (stage >= 2) return { ok: false, error: "REFUSES_FOOD" };

    const tray = (rec.tray_day != null && rec.tray_day >= today()) ? { ...(rec.tray || {}) } : {};
    const have = tray[item] || 0;
    if (have < 1) return { ok: false, error: "none_left" };
    if (have - 1 <= 0) delete tray[item];
    else tray[item] = have - 1;
    rec.tray = tray;
    rec.tray_day = today();

    // the clock resets; the cookie stamp and feed_count are left alone
    rec.last_fed_day = today();

    // MOOD + CRAVINGS (2026-08-21): any bought food is +MOOD.foodGain, the
    // day's CRAVED food (for EITHER blip in the household — mirrors
    // mhq_eat_food's judgement call, see migration-mood-cravings.sql's
    // header note c) is +MOOD.cravingGain instead. Household-wide, same
    // shape as feed() above.
    const lvl = levelInfo(rec.xp || 0).level;
    const craved = blips.some(b => cravingFor(s.id, b.slot, lvl) === item);
    const moodGain = craved ? MOOD.cravingGain : MOOD.foodGain;
    blips.forEach(b => {
      b.mood = Math.min(MOOD.max, moodEffective(b.mood, b.mood_day) + moodGain);
      b.mood_day = today();
    });

    write(LS.students, stAll); writeBlips(s.id, blips);
    return {
      ok: true, item, tray: rec.tray,
      blips: blipsView(s.id),
      health: computeHealth(rec.last_fed_day, rec.care_streak),
      // the cookie survives a grocery feeding — that is the whole point
      canFeedToday: (rec.last_cookie_day == null || rec.last_cookie_day < today()),
      // lets the client show +1 vs +2 and play the excited moment on a hit
      moodGain, craved,
    };
  },
  async care(username, password) {
    const s = verify(username, password);
    if (!s) return { ok: false, error: "auth" };
    const stAll = read(LS.students, {});
    const rec = stAll[s.id];
    ensureBlipFields(rec);
    const blips = ensureBlip(s.id, rec);
    const stage = computeHealth(rec.last_fed_day, rec.care_streak).stage;
    if (stage < 2) return { ok: false, error: "not_sick" };
    if (!isQualDay()) return { ok: false, error: "not_care_day" };
    if (rec.last_care_day != null && rec.last_care_day >= today()) return { ok: false, error: "already_cared" };
    const nSoup = (rec.pantry && rec.pantry.soup) || 0;
    const nMed = (rec.pantry && rec.pantry.medicine) || 0;
    if (nSoup < 1 || nMed < 1) return { ok: false, error: "need_supplies", needSoup: nSoup < 1, needMedicine: nMed < 1 };
    rec.pantry = { ...(rec.pantry || {}), soup: nSoup - 1, medicine: nMed - 1 };

    const { onSince } = termConfig();
    let newStreak;
    if (rec.last_care_day == null) {
      newStreak = 1;
    } else {
      const from = Math.max(rec.last_care_day, onSince == null ? rec.last_care_day : onSince);
      const skipped = countQualWeekdays(from, today() - 1);
      newStreak = skipped === 0 ? (rec.care_streak || 0) + 1 : 1;
    }
    let healed = false;
    rec.last_care_day = today();
    if (newStreak >= BLIP.careDaysToHeal) {
      healed = true; newStreak = 0; rec.last_fed_day = today(); // back to healthy; growth kept
    }
    rec.care_streak = newStreak;

    // MOOD (2026-08-21): a genuine care day (every guard above passed, both
    // supplies actually consumed) is worth +1 mood too — "being cared for
    // feels good". Household-wide, same shape as feed()/eatFood(). Nothing
    // else about care/heal changed.
    blips.forEach(b => {
      b.mood = Math.min(MOOD.max, moodEffective(b.mood, b.mood_day) + 1);
      b.mood_day = today();
    });

    write(LS.students, stAll); writeBlips(s.id, blips);
    return { ok: true, healed, pantry: rec.pantry, health: computeHealth(rec.last_fed_day, rec.care_streak) };
  },

  /* ---- Phase 3: treasure box ----
     Mirrors mhq_open_box. The box count is authoritative state (server-owned
     in production), so this refuses rather than improvising when there is
     no box: the UI must never decrement a count of its own. */
  async openBox(username, password) {
    const s = verify(username, password);
    if (!s) return { ok: false, error: "auth" };
    const stAll = read(LS.students, {});
    const rec = stAll[s.id];
    ensureBlipFields(rec);
    const blips = ensureBlip(s.id, rec);

    /* S2: MILESTONE BOXES OPEN FIRST. That rule is shared with the server so
       the modal can title itself "Mystery box" BEFORE the learner taps — the
       tap is what calls this, so the title cannot wait for the answer. */
    const boxKind = rec.milestone_boxes.length ? "milestone" : "assignment";
    const milestone = boxKind === "milestone" ? rec.milestone_boxes[0] : null;
    if (boxKind === "assignment" && !(rec.boxes_pending > 0)) return { ok: false, error: "no_box" };

    const level = levelInfo(rec.xp).level;
    const blip = blips.find(b => b.slot === 1) || blips[0];
    let kind = boxKind === "milestone" ? rollKind(MILESTONE_WEIGHTS) : rollLootKind();
    let loot = null;

    if (kind === "trinket") {
      // Guaranteed-new, like cosmetics: six trinkets against four milestone
      // boxes makes duplicates genuinely likely, and a second identical sock
      // on the shelf is the same let-down as a duplicate hat. Empty pool
      // pays diamonds.
      const pool = TRINKET_ITEMS.filter(it => !rec.trinkets.includes(it.id));
      if (pool.length) {
        const item = pickOne(pool);
        rec.trinkets = [...rec.trinkets, item.id];
        loot = { kind: "trinket", id: item.id, amount: 1, isNew: true };
      } else {
        kind = "gold";
      }
    }
    if (kind === "cosmetic") {
      // GUARANTEED-NEW: the pool is filtered to unowned items at or below her
      // level, so isNew is true by construction. A box that hands back a hat
      // she already owns is a punishment, not a prize — empty pool pays gold.
      // Cosmetics are per-blip since Phase 2; slot 1 receives, matching the SQL.
      // price > 0 (2026-07-28): free-tier items are excluded from the loot
      // pool — a treasure box handing you something the shop gives away is
      // the same let-down as a duplicate, which the pool already guards.
      // S2: the two boxes draw from different pools. A milestone box pays a
      // RARE (price >= 120) at ANY level — a rare above your level is the fun
      // of it; it waits in the closet until the gate opens.
      const pool = SHOP_ITEMS.filter(it => (boxKind === "milestone"
        ? it.price >= MILESTONE_RARE_PRICE
        : (it.price > 0 && it.minLevel <= level)) && !(blip.owned_items || []).includes(it.id));
      if (pool.length) {
        const item = pickOne(pool);
        blip.owned_items = [...(blip.owned_items || []), item.id];
        writeBlips(s.id, blips);
        loot = { kind: "cosmetic", id: item.id, amount: 1, isNew: true };
      } else {
        kind = "gold";
      }
    }
    if (kind === "food") {
      const id = pickOne(LOOT_FOOD);
      rec.pantry = { ...(rec.pantry || {}) };
      rec.pantry[id] = (rec.pantry[id] || 0) + 1;
      loot = { kind: "food", id, amount: 1, isNew: false };
    }
    if (kind === "gold") {
      // A milestone box pays a flat 10 diamonds per milestone level (100 at
      // level 10 … 400 at level 40); the homework chest keeps its 15–40 roll.
      const amount = boxKind === "milestone"
        ? MILESTONE_GOLD_PER_LEVEL * milestone
        : LOOT_GOLD.min + Math.floor(Math.random() * (LOOT_GOLD.max - LOOT_GOLD.min + 1));
      rec.gold += amount;
      loot = { kind: "gold", id: "gold", amount, isNew: false };
    }

    if (boxKind === "milestone") rec.milestone_boxes = rec.milestone_boxes.slice(1);
    else rec.boxes_pending = Math.max(0, (rec.boxes_pending || 0) - 1);
    write(LS.students, stAll);
    return {
      ok: true, loot, boxKind, milestone,
      boxes: {
        pending: (rec.boxes_pending || 0) + rec.milestone_boxes.length,
        mystery: rec.milestone_boxes.length,
      },
      gold: rec.gold, pantry: rec.pantry || {}, trinkets: rec.trinkets.slice(),
      blips: blipsView(s.id),
    };
  },

  async claimSecondBlip(username, password, name, colour) {
    const s = verify(username, password);
    if (!s) return { ok: false, error: "auth" };
    const stAll = read(LS.students, {});
    const rec = stAll[s.id];
    ensureBlipFields(rec);
    const blips = ensureBlip(s.id, rec);
    if (levelInfo(rec.xp).level < BLIP.secondBlipLevel) return { ok: false, error: "level_locked", minLevel: BLIP.secondBlipLevel };
    if (blips.some(b => b.slot === 2)) return { ok: false, error: "already_claimed" };
    const col = colour || "blue";
    if (!VALID_COLOURS.includes(col)) return { ok: false, error: "bad_colour" };
    const nm = String(name || "").trim().slice(0, 24);
    if (!nm) return { ok: false, error: "bad_name" };
    blips.push({ slot: 2, name: nm, colour: col, feed_count: 0, owned_items: [], equipped: {}, mood: 0, mood_day: null });
    writeBlips(s.id, blips);
    return { ok: true, blips: blipsView(s.id) };
  },

  // ---- admin ----
  async adminLogin(pw) { seed(); return { ok: read(LS.meta, {}).adminPassword === pw }; },
  async adminData(pw) {
    if (read(LS.meta, {}).adminPassword !== pw) return { ok: false, error: "auth" };
    const students = read(LS.students, {}), progress = read(LS.progress, {}), struggles = read(LS.struggles, {}), quests = read(LS.quests, {});
    const rows = Object.values(students).map(s => {
      ensureBlipFields(s);
      const blips = getBlips(s.id);
      const slot1 = blips.find(b => b.slot === 1);
      return {
        id: s.id, name: s.display_name, username: s.username, hasPassword: s.password != null, lastActive: s.last_active_at,
        totalXp: Object.values(progress[s.id] || {}).reduce((a, p) => a + (p.total_xp || 0), 0),
        health: computeHealth(s.last_fed_day, s.care_streak),
        growthStage: slot1 ? growthStage(slot1.feed_count) : 0,
        blipCount: blips.length,
        quests: progress[s.id] || {},
      };
    }).sort((a, b) => a.name.localeCompare(b.name));
    const qs = Object.keys(quests).sort((a, b) => quests[a].sort - quests[b].sort).map(q => ({ quest_id: q, is_open: quests[q].is_open }));
    const cByConcept = {};
    Object.values(struggles).forEach(byC => Object.entries(byC).forEach(([c, v]) => {
      const g = cByConcept[c] || (cByConcept[c] = { concept: c, count: 0, students: 0 });
      g.count += v.count; g.students += 1;
    }));
    const { running, onSince } = termConfig();
    // Phase 3: the teacher's real question is "who has done it?", and the
    // box-grant list already knows — same shape the server returns, `done`
    // swapped for `doneCount` because this is a class-wide view.
    const asgA = activeAssignment();
    const asgV = asgA ? assignmentView(null) : null;
    const assignment = asgV ? {
      questId: asgV.questId, chapterId: asgV.chapterId, note: asgV.note,
      assignedOn: asgV.assignedOn, dueOn: asgV.dueOn,
      doneCount: Object.values(students).filter(s => Array.isArray(s.box_grants) && s.box_grants.includes(assignmentKey(asgA))).length,
    } : null;
    // DICE-PLAN.md (session 0b): per-chapter play totals ACROSS the whole
    // class — mirrors mhq_admin_data's additive `dicePlays` field. One
    // sum per chapter id that has ANY dice_plays rows, nothing per-student.
    const dicePlays = {};
    Object.values(read(LS.dicePlays, {})).forEach(byChapter => {
      Object.entries(byChapter).forEach(([chId, row]) => {
        dicePlays[chId] = (dicePlays[chId] || 0) + (row.plays || 0);
      });
    });
    return { ok: true, rows, quests: qs, struggles: Object.values(cByConcept).sort((a, b) => b.count - a.count), inactiveDays: 7,
      termRunning: running, termOnSince: onSince, assignment, dicePlays };
  },
  /* Phase 3 — one active assignment at a time; setting a new one replaces it.
     Refuses a closed quest exactly as the server does: assigning must never
     open a quest, and a card pointing at something she cannot play would be
     worse than no card at all. */
  async adminSetAssignment(pw, questId, due, note) {
    if (read(LS.meta, {}).adminPassword !== pw) return { ok: false, error: "auth" };
    const q = read(LS.quests, {});
    if (!q[questId]) return { ok: false, error: "unknown_quest" };
    if (!q[questId].is_open) return { ok: false, error: "quest_closed" };
    const m = read(LS.meta, {});
    m.assignment = {
      quest_id: questId,
      note: note ? String(note).trim().slice(0, 80) || null : null,
      due_on: due ? String(due).slice(0, 10) : null,
      assigned_on: today(),
    };
    write(LS.meta, m);
    const a = assignmentView(null);
    return { ok: true, assignment: { questId: a.questId, chapterId: a.chapterId, note: a.note, assignedOn: a.assignedOn, dueOn: a.dueOn } };
  },
  async adminClearAssignment(pw) {
    if (read(LS.meta, {}).adminPassword !== pw) return { ok: false, error: "auth" };
    const m = read(LS.meta, {}); m.assignment = null; write(LS.meta, m);
    return { ok: true };
  },

  /* Push is a no-op offline: ?local=1 has no push service and no VAPID key,
     so the reminder card stays hidden. Honest {ok:true} keeps every caller
     from needing a backend check of its own. */
  async pushSubscribe() { return { ok: true, local: true }; },
  async pushUnsubscribe() { return { ok: true, local: true }; },

  async adminSetQuestOpen(pw, quest, open) {
    if (read(LS.meta, {}).adminPassword !== pw) return { ok: false, error: "auth" };
    const q = read(LS.quests, {}); if (q[quest]) { q[quest].is_open = !!open; write(LS.quests, q); } return { ok: true };
  },
  async adminSetTerm(pw, running) {
    if (read(LS.meta, {}).adminPassword !== pw) return { ok: false, error: "auth" };
    const m = read(LS.meta, {});
    m.term_running = !!running;
    if (running) m.term_on_since = today(); // turning ON stamps today = forgives accrued sickness
    write(LS.meta, m);
    return { ok: true, termRunning: !!running, termOnSince: m.term_on_since };
  },
  async setTerm(pw, running) { return this.adminSetTerm(pw, running); },
  async adminResetPassword(pw, id) {
    if (read(LS.meta, {}).adminPassword !== pw) return { ok: false, error: "auth" };
    const st = read(LS.students, {}); if (st[id]) { st[id].password = null; write(LS.students, st); } return { ok: true };
  },
  async adminRemoveStudent(pw, id) {
    if (read(LS.meta, {}).adminPassword !== pw) return { ok: false, error: "auth" };
    const st = read(LS.students, {}); delete st[id]; write(LS.students, st);
    const bl = read(LS.blips, {}); delete bl[id]; write(LS.blips, bl); return { ok: true };
  },
  async adminResetProgress(pw, id) {
    if (read(LS.meta, {}).adminPassword !== pw) return { ok: false, error: "auth" };
    const pr = read(LS.progress, {}); delete pr[id]; write(LS.progress, pr);
    const sg = read(LS.struggles, {}); delete sg[id]; write(LS.struggles, sg);
    // mirrors mhq_admin_reset_progress: XP (level) drops to 0, but gold,
    // owned items, equipped set, colour, nickname AND the blip(s) are all kept.
    const st = read(LS.students, {}); if (st[id]) { st[id].xp = 0; write(LS.students, st); }
    return { ok: true };
  },
  async adminResolveStruggle(pw, concept) {
    if (read(LS.meta, {}).adminPassword !== pw) return { ok: false, error: "auth" };
    const all = read(LS.struggles, {}); Object.values(all).forEach(byC => delete byC[concept]); write(LS.struggles, all); return { ok: true };
  },
};
