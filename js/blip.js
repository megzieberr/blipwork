/* ============================================================
   BLIP SCREEN — the companion's home: preview, nickname, colour
   picker (locked with a hint before the first completed round),
   and the accessory shop (buy/equip, level-gated, gold-gated).
   All state comes from app.state (a fresh mhq_get_state/local
   getState); every action re-asks the backend and never trusts a
   locally-guessed outcome — errors always toast, never fail silently.
   ============================================================ */
import { api } from "./api.js";
import { getSession } from "./session.js";
import { el, clear, showToast } from "./ui.js";
import { renderCompanion } from "./companion/renderer.js";
import { renderSwatchGrid, equippedToAccessories, itemLabel } from "./companion/blip-ui.js";

export function renderBlip(app, host) {
  clear(host);
  const sess = getSession();
  const state = app.state || {};
  const blip = state.blip || { name: "Blip", colour: "cream", owned: [], equipped: {} };
  const shop = state.shop || [];
  const level = (state.levelInfo && state.levelInfo.level) || 1;
  const xp = state.xp || 0;

  const head = el("div", "blip-head");
  head.innerHTML = `<div><span class="eyebrow">Your companion</span><h1>Blip</h1></div>
    <div style="display:flex;gap:8px;align-items:center">
      <button class="link-btn gallery-link" title="Everyone's Blips" aria-label="Gallery">👥</button>
      <button class="link-btn back" aria-label="Back">←</button>
    </div>`;
  head.querySelector(".back").addEventListener("click", () => app.go("hub"));
  head.querySelector(".gallery-link").addEventListener("click", () => app.go("gallery"));
  host.appendChild(head);

  // ---- hero preview + nickname ----
  const hero = el("div", "card blip-hero-card");
  hero.innerHTML = `<div class="blip-hero-stage"></div>`;
  const nameRow = el("div", "blip-name-row");
  const nameInput = el("input", "blip-name-input");
  nameInput.maxLength = 24;
  nameInput.value = blip.name || "Blip";
  nameInput.setAttribute("aria-label", "Blip's nickname");
  const saveNameBtn = el("button", "btn small", "Save");
  nameRow.append(nameInput, saveNameBtn);
  hero.appendChild(nameRow);
  hero.appendChild(el("p", "muted small blip-name-hint", "Only you see this nickname — it never shows to other players."));
  host.appendChild(hero);
  renderCompanion(hero.querySelector(".blip-hero-stage"), { colour: blip.colour, accessories: equippedToAccessories(blip.equipped) });

  saveNameBtn.addEventListener("click", async () => {
    const nm = nameInput.value.trim();
    if (!nm) { showToast("Give Blip a name first.", "error"); return; }
    saveNameBtn.disabled = true;
    try {
      const r = await api.equip(sess.username, sess.password, { blipName: nm });
      if (!r || !r.ok) { showToast(equipErrMsg(r && r.error), "error"); saveNameBtn.disabled = false; return; }
      showToast("Nickname saved!", "good");
      await app.refresh();
      app.go("blip");
    } catch { showToast("Can't reach the server — try again.", "error"); saveNameBtn.disabled = false; }
  });

  // ---- colour ----
  host.appendChild(el("h2", "", "Colour"));
  const colourCard = el("div", "card colour-card");
  const locked = xp <= 0;
  if (locked) colourCard.appendChild(el("p", "colour-hint", "🔒 Finish your first round to unlock colours — cream stays free any time."));
  const swatches = renderSwatchGrid({
    current: blip.colour, locked,
    onPick: async (id) => {
      try {
        const r = await api.equip(sess.username, sess.password, { colour: id });
        if (!r || !r.ok) { showToast(equipErrMsg(r && r.error), "error"); return; }
        showToast("Colour updated!", "good");
        await app.refresh();
        app.go("blip");
      } catch { showToast("Can't reach the server — try again.", "error"); }
    },
  });
  colourCard.appendChild(swatches);
  host.appendChild(colourCard);

  // ---- shop ----
  host.appendChild(el("h2", "", "Shop"));
  const grid = el("div", "shop-grid");
  shop.forEach((item) => {
    const owned = (blip.owned || []).includes(item.id);
    const equippedHere = blip.equipped && blip.equipped[item.slot] === item.id;
    const lockedByLevel = level < item.minLevel;
    const card = el("div", "shop-item" + (equippedHere ? " equipped" : ""));
    card.innerHTML = `<div class="si-stage"></div>
      <div class="si-name">${itemLabel(item.id)}</div>
      <div class="si-meta">${owned ? (equippedHere ? "Equipped" : "Owned") : `🪙 ${item.price}${lockedByLevel ? ` · unlocks at level ${item.minLevel}` : ""}`}</div>`;
    renderCompanion(card.querySelector(".si-stage"), { colour: blip.colour, accessories: [item.id] });

    const actionBtn = el("button", "btn small");
    if (owned) {
      actionBtn.textContent = equippedHere ? "Unequip" : "Equip";
      actionBtn.className = "btn small" + (equippedHere ? " ghost" : " primary");
      actionBtn.addEventListener("click", async () => {
        actionBtn.disabled = true;
        const nextEquipped = { ...(blip.equipped || {}) };
        nextEquipped[item.slot] = equippedHere ? "" : item.id;
        try {
          const r = await api.equip(sess.username, sess.password, { equipped: nextEquipped });
          if (!r || !r.ok) { showToast(equipErrMsg(r && r.error), "error"); actionBtn.disabled = false; return; }
          showToast(equippedHere ? `${itemLabel(item.id)} unequipped.` : `${itemLabel(item.id)} equipped!`, "good");
          await app.refresh();
          app.go("blip");
        } catch { showToast("Can't reach the server — try again.", "error"); actionBtn.disabled = false; }
      });
    } else if (lockedByLevel) {
      actionBtn.textContent = `Unlocks at level ${item.minLevel}`;
      actionBtn.disabled = true;
      actionBtn.className = "btn small ghost";
    } else {
      actionBtn.textContent = `Buy for ${item.price} gold`;
      actionBtn.className = "btn small primary";
      actionBtn.addEventListener("click", async () => {
        actionBtn.disabled = true;
        try {
          const r = await api.buyItem(sess.username, sess.password, item.id);
          if (!r || !r.ok) { showToast(buyErrMsg(r && r.error, r), "error"); actionBtn.disabled = false; return; }
          showToast(`Bought ${itemLabel(item.id)}!`, "good");
          await app.refresh();
          app.go("blip");
        } catch { showToast("Can't reach the server — try again.", "error"); actionBtn.disabled = false; }
      });
    }
    card.appendChild(actionBtn);
    grid.appendChild(card);
  });
  host.appendChild(grid);
}

function equipErrMsg(code) {
  return ({
    auth: "Session problem — try logging in again.",
    bad_equipped: "That item can't be equipped there.",
    bad_colour: "That colour isn't available.",
    colour_locked: "Finish your first round to unlock colours.",
    bad_name: "Give Blip a name first.",
  })[code] || "Something went wrong — try again.";
}
function buyErrMsg(code, r) {
  return ({
    auth: "Session problem — try logging in again.",
    no_item: "That item isn't available.",
    owned: "You already own that.",
    locked: `Unlocks at level ${(r && r.minLevel) || "?"}.`,
    gold: `Not enough gold — you have ${(r && r.gold) || 0}, it costs ${(r && r.price) || "?"}.`,
  })[code] || "Something went wrong — try again.";
}
