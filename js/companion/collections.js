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
   Furniture has its own map at the bottom of this file (S5v2). */

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
      "light-ring", "flame-ring", "spark-halo", "cyber-visor",
      // Tripo wave 2 (2026-08-06)
      "tech-antenna", "hud-monocle", "mech-gauntlet", "headset-cup", "grapple-claw",
      "data-fin", "energy-blade", "drone-wings", "plasma-wings",
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

/* ============================================================
   FOOD TIERS — room build S4 (2026-08-08).
   The grocery store uses the SAME locked-card pattern as the cosmetic
   shop: a tier below the learner's level collapses to one card (grey
   silhouette, "?", "Unlocks at Lv N"). Same reason it lives here rather
   than in SQL — Megan can move a gate without a migration.

   `unlockLevel` MUST equal the min_level on those rows in
   supabase/migration-food-shop.sql. The server enforces min_level (a
   client that offered a locked food would just get `locked` back); this
   map only decides what is SHOWN. verify-store.html asserts the two
   agree, item by item.

   soup / medicine / treat are category 'food' server-side but are not
   groceries and appear in no tier — the Pharmacy sells those, unchanged.
   ============================================================ */
export const FOOD_COLLECTIONS = {
  fresh: {
    label: "Fresh",
    unlockLevel: 1,
    items: ["apple", "banana", "grapes", "naartjie", "strawberry", "watermelon",
      "broccoli", "carrot", "green-pepper", "mielie", "peas", "tomato"],
  },
  bakery: {
    label: "Bakery",
    unlockLevel: 4,
    items: ["choc-cookie", "croissant", "doughnut", "cupcake", "custard-tart", "koeksister"],
  },
  hotmeals: {
    label: "Hot meals",
    unlockLevel: 7,
    items: ["toastie", "hot-dog", "nuggets", "spaghetti", "burger", "pizza"],
  },
  braai: {
    label: "Braai",
    unlockLevel: 11,
    items: ["biltong", "drumstick", "boerewors", "sosatie", "lamb-chop", "steak"],
  },
  sweets: {
    label: "Sweets",
    unlockLevel: 14,
    items: ["lollipop", "gummy-bear", "marshmallow", "jelly-beans", "toffee", "chocolate-bar"],
  },
  drinks: {
    label: "Drinks",
    unlockLevel: 17,
    items: ["water-bottle", "milk", "juice-box", "cold-drink", "orange-juice",
      "cola", "hot-chocolate", "milkshake"],
  },
};

export const FOOD_COLLECTION_ORDER = ["fresh", "bakery", "hotmeals", "braai", "sweets", "drinks"];

export function foodCollectionForItem(id) {
  for (const key of FOOD_COLLECTION_ORDER) {
    if (FOOD_COLLECTIONS[key].items.includes(id)) return key;
  }
  return null;
}

/* ============================================================
   FURNITURE COLLECTIONS — room build S5v2 (2026-08-08), per
   ROOM-BUILD-PLAN.md's REVISION ruling 5. Third map, same pattern as the
   two above: the Furniture panel groups by collection, and a collection
   below the learner's level collapses to ONE locked card (grey silhouette,
   "?", "Unlocks at Lv N") — no names, no prices, no count.

   A window belongs to the SAME collection as the bed and desk it matches
   (ruling 5), so a set arrives together rather than in pieces.

   `unlockLevel` MUST equal the min_level on those rows in
   supabase/migration-furniture-slots.sql. The server enforces min_level;
   this map only decides what is SHOWN. verify-store.html asserts the two
   agree, item by item.

   ⚠️ THE DOOR COLOURS ARE DELIBERATELY NOT A MYSTERY (her ruling: "their
   own 'Door colours' group, Lv 1, no mystery card"). They unlock at level
   1, so the locked-card branch can never fire on them anyway —
   `noMysteryCard` records the intent so a future retune does not quietly
   gate the one group that is meant to be open from the first minute. The
   door is the room's front door and the cheapest thing in the game to
   personalise; hiding it behind a "?" would be the opposite of the point.
   ============================================================ */
export const FURNITURE_COLLECTIONS = {
  basic: {
    label: "Basics",
    unlockLevel: 1,
    items: ["basic-bed", "basic-desk", "city-window"],
  },
  techy: {
    label: "Techy",
    unlockLevel: 8,
    items: ["techy-bed", "techy-desk", "space-window"],
  },
  princess: {
    label: "Princess",
    unlockLevel: 14,
    items: ["princess-bed", "princess-desk", "mountain-window"],
  },
  doors: {
    label: "Door colours",
    unlockLevel: 1,
    noMysteryCard: true,
    items: ["door-white", "door-mint", "door-sky", "door-pink", "door-lemon",
      "door-peach", "door-lilac", "door-coral", "door-seafoam"],
  },

  /* ---- room decor (2026-08-12) ----
     THE THREE THEMED SETS slot into the gaps between the sets that already
     exist, so a new room look arrives roughly every 3-4 levels: 1 (basic),
     4, 8 (techy), 11, 14 (princess), 18. That is the same rhythm the food
     tiers run on (1/4/7/11/14/17), and it was the deciding argument — Megan
     asked what the levels should be and this is the answer she took. Each
     set is bed + desk + window, so it arrives whole (ruling 5). */
  nerdy: {
    label: "Nerdy",
    unlockLevel: 4,
    items: ["nerdy-bed", "nerdy-desk", "nerdy-window"],
  },
  sport: {
    label: "Sporty",
    unlockLevel: 11,
    items: ["sport-bed", "sport-desk", "sport-window"],
  },
  emo: {
    label: "Midnight",
    unlockLevel: 18,
    items: ["emo-bed", "emo-desk", "emo-window"],
  },

  /* ⚠️ SHELVES ARE ONE COLLECTION SPANNING FOUR LEVELS, which every other
     collection in this file is not — the rest gate as a block. A shelf is a
     PAIR of rows (one per wall) and the two must never be split across two
     unlock levels, or a learner unlocks half a shelf. Grouping all eight in
     one collection and letting `unlockLevel` be the FIRST gate keeps that
     honest at the cost of the mystery card being wrong for the later
     designs — which is why this collection sets noMysteryCard: the wooden
     pair is free at Lv 1, so the group is open from the first minute and
     the locked-card branch could never fire on it anyway. Individual cards
     still show "Unlocks at level N" from their own min_level, which is the
     server's number and the one that is enforced.

     ⚠️ THE GATE ASSERTION IS PER ITEM, NOT PER COLLECTION, for this group.
     verify-store.html checks unlockLevel == min_level for every collection
     whose items share one gate; shelves and wallpaper are checked against
     their own rows instead. If that check is ever tightened to "every
     collection's items share its unlockLevel", these two are the exceptions
     it will trip on — that is a known and deliberate shape, not a bug. */
  shelves: {
    label: "Shelves",
    unlockLevel: 1,
    noMysteryCard: true,
    perItemGate: true,
    items: ["shelf-wood-left", "shelf-wood-right",
      "shelf-glossy-left", "shelf-glossy-right",
      "shelf-bracket-left", "shelf-bracket-right",
      "shelf-panel-left", "shelf-panel-right"],
  },
  beanbag: {
    label: "Bean bag",
    unlockLevel: 6,
    items: ["beanbag"],
  },
  /* Her six Tripo closet designs (2026-08-12). Its OWN group, kept apart
     from "Door colours" deliberately: the colours are the cheapest fiddle
     in the game and are meant to be open from the first minute, so folding
     six levelled designs in beside them would put a "?" over a group whose
     whole point is that it never has one. Per-item gates, same shape as
     shelves and wallpaper — the designs ladder 3/7/10/13/16/20 while the
     group itself opens at 3. */
  closets: {
    label: "Closet designs",
    unlockLevel: 3,
    noMysteryCard: true,
    perItemGate: true,
    items: ["closet-nerdy", "closet-sport", "closet-flower",
      "closet-lines", "closet-starry", "closet-emo"],
  },
  /* Wallpaper: same per-item shape as shelves. The plain walls are free at
     Lv 1 (they are the room that shipped), so the group is open from the
     start and each patterned shell carries its own gate. */
  wallpaper: {
    label: "Wallpaper",
    unlockLevel: 1,
    noMysteryCard: true,
    perItemGate: true,
    items: ["wall-plain", "wall-cloud", "wall-moons", "wall-mountains", "wall-stripes"],
  },
};

/* Panel order — roughly "the room itself, then what you put in it": the
   three original sets, then the new themed ones in level order, then the
   surfaces and decor, with the door colours last as the cheapest fiddle. */
export const FURNITURE_COLLECTION_ORDER = ["basic", "nerdy", "techy", "sport",
  "princess", "emo", "wallpaper", "shelves", "beanbag", "closets", "doors"];

export function furnitureCollectionForItem(id) {
  for (const key of FURNITURE_COLLECTION_ORDER) {
    if (FURNITURE_COLLECTIONS[key].items.includes(id)) return key;
  }
  return null;
}
