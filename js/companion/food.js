/* ============================================================
   FOOD — the grocery catalogue's client side.
   Room build S4 (2026-08-08), per ROOM-BUILD-PLAN.md.

   44 groceries, all of them Megan's own Tripo art already cut into
   assets/companion/food/ (2026-08-07). This file holds ONLY the label
   and the filename: prices and level gates come from the server
   (shop_items, seeded by supabase/migration-food-shop.sql and mirrored
   in js/local-backend.js), and which TIER a food belongs to lives in
   js/companion/collections.js so Megan can retune a gate without a
   migration.

   A grocery is NOT a cosmetic: it is never worn, has no attachment point
   and no ACCESSORIES entry — putting one there would fail
   verify-store.html's "every accessory has an ATTACH point" check, and
   rightly so. Same reasoning as js/companion/trinkets.js.

   soup / medicine / treat are deliberately ABSENT. They are also
   category 'food' server-side, but soup and medicine are care supplies
   (mhq_care eats them, as a pair, to make one care day) and `treat` is a
   pure gold sink that never lands in the pantry. None of the three is
   draggable, and mhq_eat_food refuses all three by name.
   ============================================================ */
import { el } from "../ui.js";

const DIR = "./assets/companion/food";

/* label only — the id IS the filename stem. Ordered by tier so a reader
   can see the shop's shape at a glance; the actual tiers are in
   collections.js and the actual order comes from the server's `sort`. */
export const FOODS = {
  // Fresh — fruit & veg (Lv 1)
  apple: "Apple",
  banana: "Banana",
  grapes: "Grapes",
  naartjie: "Naartjie",
  strawberry: "Strawberry",
  watermelon: "Watermelon",
  broccoli: "Broccoli",
  carrot: "Carrot",
  "green-pepper": "Green pepper",
  mielie: "Mielie",
  peas: "Peas",
  tomato: "Tomato",
  // Bakery — pastries (Lv 4)
  "choc-cookie": "Choc-chip cookie",
  croissant: "Croissant",
  doughnut: "Doughnut",
  cupcake: "Cupcake",
  "custard-tart": "Custard tart",
  koeksister: "Koeksister",
  // Hot meals (Lv 7)
  toastie: "Toastie",
  "hot-dog": "Hot dog",
  nuggets: "Nuggets",
  spaghetti: "Spaghetti",
  burger: "Burger",
  pizza: "Pizza",
  // Braai (Lv 11)
  biltong: "Biltong",
  drumstick: "Drumstick",
  boerewors: "Boerewors",
  sosatie: "Sosatie",
  "lamb-chop": "Lamb chop",
  steak: "Steak",
  // Sweets (Lv 14)
  lollipop: "Lollipop",
  "gummy-bear": "Gummy bears",
  marshmallow: "Marshmallow",
  "jelly-beans": "Jelly beans",
  toffee: "Toffee",
  "chocolate-bar": "Chocolate bar",
  // Drinks (Lv 17)
  "water-bottle": "Water",
  milk: "Milk",
  "juice-box": "Juice box",
  "cold-drink": "Cold drink",
  "orange-juice": "Orange juice",
  cola: "Cola",
  "hot-chocolate": "Hot chocolate",
  milkshake: "Milkshake",
};

export const FOOD_IDS = Object.keys(FOODS);

/* The three category-'food' rows that are NOT groceries. Kept here rather
   than inlined at each call site so the client and mhq_eat_food's refusal
   list can be read side by side. */
export const NON_GROCERY_FOOD = ["soup", "medicine", "treat"];

export function foodExists(id) { return Object.prototype.hasOwnProperty.call(FOODS, id); }
export function foodLabel(id) { return FOODS[id] || id; }
export function foodImgSrc(id) { return `${DIR}/${id}.png`; }

/* One picture, sized by its container. Used by the shop card, the fridge
   stash tile and the drag ghost, so all three always show the same art. */
export function foodArt(id) {
  const wrap = el("div", "food-art");
  const img = document.createElement("img");
  img.src = foodImgSrc(id);
  img.alt = "";
  img.draggable = false;          // the native HTML5 drag would fight our pointer drag
  wrap.appendChild(img);
  return wrap;
}
