/* ============================================================
   BLIP UI HELPERS — small bits shared by the hub tile, the Blip
   (shop/equip) screen, the gallery, and the first-round colour-unlock
   prompt. Pure DOM/data helpers, no backend calls in here.
   ============================================================ */
import { COLOURS, ACCESSORIES } from "./renderer.js";
import { el } from "../ui.js";

/* Friendly shop-item names (ids match ACCESSORIES/shop_items exactly).
   The six SL techy items are the current catalogue; the old five stay
   mapped so legacy owned items still display a friendly name. */
export const ITEM_LABELS = {
  // SL catalogue (2026-07-19)
  "star-shades": "Star shades",
  "heart-eyes": "Heart eyes",
  "headphones": "Headphones",
  "halo": "Halo",
  "power-gloves": "Power gloves",
  "aurora-wings": "Aurora wings",
  // legacy items (still owned by some blips)
  "round-glasses": "Round glasses",
  "cat-ears": "Cat ears",
  "party-hat": "Party hat",
  "stubby-arms": "Stubby arms",
  "angel-wings": "Angel wings",
};
export function itemLabel(id) { return ITEM_LABELS[id] || id; }

/* {hat:'party-hat', ears:'', ...} -> ['party-hat'] (server/local equip
   shape -> the flat id array renderCompanion expects). */
export function equippedToAccessories(equipped) {
  if (!equipped || typeof equipped !== "object") return [];
  return Object.values(equipped).filter(Boolean);
}

/* A row of round colour swatches. `current` = colour id, `locked` =
   true before the first completed round (only the default "blue" stays
   clickable — it's the hatch colour, changing to any other needs xp>0).
   Object.keys(COLOURS) order puts "blue" first, so it's the first swatch.
   onPick(colourId) fires on a legal tap; locked swatches are inert. */
export function renderSwatchGrid({ current, locked, onPick }) {
  const grid = el("div", "swatch-grid");
  Object.keys(COLOURS).forEach((id) => {
    const isLocked = locked && id !== "blue";
    const b = el("button", "swatch-btn" + (id === current ? " active" : "") + (isLocked ? " locked" : ""));
    b.type = "button";
    b.dataset.colour = id;
    b.title = isLocked ? `${id} — finish your first round to unlock colours` : id;
    b.style.background = COLOURS[id] || "#62ceff"; // "blue" has a null value (identity art) — show its electric-blue swatch
    b.disabled = isLocked;
    if (!isLocked) b.addEventListener("click", () => onPick(id));
    grid.appendChild(b);
  });
  return grid;
}

export function accessoryExists(id) { return !!ACCESSORIES[id]; }
