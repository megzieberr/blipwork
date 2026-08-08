/* ============================================================
   COLLECTIONS — room build S3 (2026-08-08). One tunable file, per
   ROOM-BUILD-PLAN.md: which sellable cosmetics group into which themed
   collection, and the LEVEL each collection unlocks at. Purely a client
   grouping — it changes what the Shop panel shows, never what a learner
   can equip (per-item minLevel from shop_items still applies once a
   collection is unlocked).

   Below its unlock level, a collection renders as ONE locked card: grey
   silhouette, "?", "Unlocks at Lv N" — no names, no prices, no item count
   (js/blip.js's collectionLockedCard). Megan can retune a threshold here
   without a migration.

   Every ACTIVE, SELLABLE cosmetic id (category 'cosmetic' in shop_items —
   food and trinkets never reach this) must appear in EXACTLY ONE
   collection below. verify-store.html asserts that against the live shop
   payload.

   "techy" and "basics" were a JUDGEMENT CALL (rule 9, ROOM-BUILD-PLAN.md):
   the plan's table names "wave 1+2 tech items (visors, mech arms,
   effects…)" without listing all ~48 pre-S3 ids. Read literally against
   the actual catalogue: the Tripo-wave-1/2 items that are overtly
   sci-fi/tech (the whole effects slot, both visors, both crowns-of-tech,
   the mech arms, the tech ears, both tech wings) go in "techy"; the
   SAME waves also drew unmistakably FANTASY pieces (wizard-hat,
   royal-crown, back-sword, gold-wings, dragon-wings, eye-mask) that read
   nothing like "techy", so those join "basics" alongside the pre-Tripo
   SL catalogue, the store-expansion set and the neck necklaces (except
   chunky-chain, which the plan's table explicitly places in "gangster").
   Furniture collections (basic/techy/princess, S5 scope) are NOT listed
   here yet — no furniture shop_items exist until S5 ships them. */

export const COLLECTIONS = {
  basics: {
    label: "Basics",
    unlockLevel: 1,
    items: [
      // free tier + store expansion (2026-07-28)
      "study-specs", "beanie", "ear-tufts", "mitts", "nub-wings", "cape",
      "sleepy-eyes", "visor", "bolt-antenna", "horns", "bunny-ears",
      "boxing-gloves", "schoolbag", "bat-wings", "crown", "jetpack",
      // SL techy catalogue (2026-07-19)
      "star-shades", "heart-eyes", "headphones", "halo", "power-gloves", "aurora-wings",
      // Tripo wave 1 — the fantasy pieces, not the tech ones
      "eye-mask", "wizard-hat", "royal-crown", "back-sword", "gold-wings", "dragon-wings",
      // neck necklaces (2026-08-07), excluding chunky-chain (-> gangster)
      "bead-necklace", "flower-garland", "star-chain", "heart-chain", "medal-choker",
    ],
  },
  techy: {
    label: "Techy",
    unlockLevel: 6,
    items: [
      // Tripo wave 1 (2026-08-05) — effects slot + the visor
      "light-ring", "flame-ring", "crystal-orbit", "spark-halo", "cyber-visor",
      // Tripo wave 2 (2026-08-06)
      "tech-antenna", "hud-monocle", "mech-gauntlet", "headset-cup", "grapple-claw",
      "data-fin", "energy-blade", "drone-wings", "plasma-wings", "neural-crown",
    ],
  },
  eyes: {
    label: "Eye pairs",
    unlockLevel: 5,
    items: ["star-eyes", "angry-eyes", "happy-eyes", "lash-eyes", "dreamy-eyes", "wink-eyes"],
  },
  tomboy: {
    label: "Tomboy",
    unlockLevel: 9,
    items: ["backwards-cap", "sport-shades", "bucket-hat"],
  },
  girly: {
    label: "Girly",
    unlockLevel: 12,
    items: ["hair-bow", "tiara", "butterfly-wing"],
  },
  fairy: {
    label: "Fairy",
    unlockLevel: 16,
    // star-wand stays CUT (no hands, no slot) — never listed here
    items: ["fairy-wing", "flower-crown"],
  },
  gangster: {
    label: "Gangster",
    unlockLevel: 20,
    items: ["gold-shades", "snapback", "chunky-chain"],
  },
};

/* Display order for the shop panel. */
export const COLLECTION_ORDER = ["basics", "techy", "eyes", "tomboy", "girly", "fairy", "gangster"];

/* item id -> collection key, or null if it belongs to none (should never
   happen for an active cosmetic — see the verify-store.html assertion). */
export function collectionForItem(id) {
  for (const key of COLLECTION_ORDER) {
    if (COLLECTIONS[key].items.includes(id)) return key;
  }
  return null;
}
