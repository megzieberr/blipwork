/* ============================================================
   BLIP UI HELPERS — small bits shared by the hub tile, the Blip
   (shop/equip) screen, the gallery, and the first-round colour-unlock
   prompt. Pure DOM/data helpers, no backend calls in here.
   ============================================================ */
import { COLOURS, ACCESSORIES } from "./renderer.js";
import { el } from "../ui.js";

/* Friendly shop-item names (ids match ACCESSORIES/shop_items exactly). */
export const ITEM_LABELS = {
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
   true before the first completed round (only cream stays clickable).
   onPick(colourId) fires on a legal tap; locked swatches are inert. */
export function renderSwatchGrid({ current, locked, onPick }) {
  const grid = el("div", "swatch-grid");
  Object.keys(COLOURS).forEach((id) => {
    const isLocked = locked && id !== "cream";
    const b = el("button", "swatch-btn" + (id === current ? " active" : "") + (isLocked ? " locked" : ""));
    b.type = "button";
    b.dataset.colour = id;
    b.title = isLocked ? `${id} — finish your first round to unlock colours` : id;
    b.style.background = COLOURS[id] || "#fddb93";
    b.disabled = isLocked;
    if (!isLocked) b.addEventListener("click", () => onPick(id));
    grid.appendChild(b);
  });
  return grid;
}

export function accessoryExists(id) { return !!ACCESSORIES[id]; }
