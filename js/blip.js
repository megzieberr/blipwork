/* ============================================================
   BLIP SCREEN — the companion's home: preview, nickname, colour
   picker (locked with a hint before the first completed round),
   the accessory shop (buy/equip, level-gated, gold-gated), the
   grocery/pharmacy (feeding + sickness recovery), and the second-
   Blip unlock. All state comes from app.state (a fresh
   mhq_get_state/local getState); every action re-asks the backend
   and never trusts a locally-guessed outcome — errors always toast,
   never fail silently.

   PHASE 2 (2026-07-19) — feeding / growth / sickness / pharmacy /
   second Blip. Coded against the contract in PHASE-2-PLAN.md and
   the backend/renderer briefs while those land in parallel:
     state.blips = [{slot, name, colour, feedCount, growthStage}]
     state.health = {stage, recovering, daysUnfed, careStreak, locks:{dress,shop,gallery}}
     state.canFeedToday / state.canCareToday
     api.feed() / api.care() / api.claimSecondBlip(name, colour)
     api.buyItem(id) also accepts 'soup' | 'medicine' | treat ids
   Every read of these is defensive (normalizeBlips/normalizeHealth
   below) so this screen degrades gracefully to the pre-Phase-2
   single-blip shape if the backend hasn't shipped yet. See
   PROJECT-STATUS / the hand-off note for exact contract gaps found.
   ============================================================ */
import { api } from "./api.js";
import { getSession } from "./session.js";
import { el, clear, showToast } from "./ui.js";
/* renderBlip is aliased on import — this file's own exported screen
   function is ALSO conventionally named renderBlip(app, host) (matching
   renderHub/renderChapter/renderGallery elsewhere), which collides with
   the companion module's new renderBlip(el, opts) if imported under its
   own name into the same module scope. */
import { renderCompanion, renderBlip as mountCompanionBlip, blipMood, playMoment } from "./companion/renderer.js";
import { renderSwatchGrid, equippedToAccessories, itemLabel } from "./companion/blip-ui.js";

/* renderBlip (companion/renderer.js, landed 2026-07-19) owns the
   growth/health scale itself — applied via `transform` on whatever
   element it's given, origin bottom-centre, and it hides equipped
   accessories automatically once healthStage>=2/recovering. So the
   host we pass it just needs to be a plain block div nested inside
   the CSS-sized stage container (a bare div fills its parent's width
   by default) — no extra sizing helper needed here. Kept as a thin
   wrapper (not the stage container itself) so the refuse/happy shake
   animations below can animate the OUTER container's `transform`
   without fighting renderBlip's own inline transform on its target. */
function mountBlip(hostEl, opts) {
  const inner = el("div");
  hostEl.appendChild(inner);
  return mountCompanionBlip(inner, opts);
}

/* ---------------- state normalisation ----------------
   Backend contract: state.blips[] = {slot, name, colour, feedCount,
   growthStage} — note it does NOT carry owned/equipped, so accessory
   ownership stays a single shared pool (state.blip.owned) and
   equipped is per-slot only where the backend actually sends it;
   slot 0 falls back to the legacy state.blip.equipped. Flagged as a
   contract gap in the hand-off note — if the backend later adds
   per-blip owned/equipped this still reads it (b.owned/b.equipped
   checked first). */
function normalizeBlips(state) {
  const legacy = (state && state.blip) || { name: "Blip", colour: "cream", owned: [], equipped: {} };
  if (Array.isArray(state.blips) && state.blips.length) {
    return state.blips.map((b, i) => ({
      slot: b.slot != null ? b.slot : i,
      name: b.name || "Blip",
      colour: b.colour || "cream",
      feedCount: b.feedCount || 0,
      growthStage: b.growthStage || 0,
      owned: Array.isArray(b.owned) ? b.owned : (legacy.owned || []),
      equipped: (b.equipped && typeof b.equipped === "object") ? b.equipped : (i === 0 ? (legacy.equipped || {}) : {}),
    }));
  }
  return [{ slot: 0, name: legacy.name, colour: legacy.colour, feedCount: 0, growthStage: 0, owned: legacy.owned || [], equipped: legacy.equipped || {} }];
}
function normalizeHealth(state) {
  const h = (state && state.health) || {};
  const locks = h.locks || {};
  return {
    stage: h.stage || 0,
    recovering: !!h.recovering,
    daysUnfed: h.daysUnfed || 0,
    careStreak: Math.max(0, Math.min(3, h.careStreak || 0)),
    locks: { dress: !!locks.dress, shop: !!locks.shop, gallery: !!locks.gallery },
  };
}
/* Undefined (backend hasn't shipped the flag yet) reads as "yes" so
   the feed/care flow stays testable while the contract lands. */
const readyFlag = (v) => (v === undefined ? true : !!v);

const MOOD_ICON = { 0: null, 1: "😴", 2: "🛌", 3: "💔" };
/* Text comes from the renderer's own blipMood() (companion/health-fx.js)
   so the caption always matches whatever art/overlay is actually
   showing; only the emoji + "no chip when healthy" framing is ours. */
function moodCopy(health) {
  if (!health.recovering && health.stage === 0) return null;
  const icon = health.recovering ? "🩹" : MOOD_ICON[health.stage];
  return { icon, text: blipMood(health.stage, health.recovering) };
}

function triggerAnim(stageEl, cls, ms) {
  if (!stageEl) return;
  stageEl.classList.remove(cls); void stageEl.offsetWidth; stageEl.classList.add(cls);
  setTimeout(() => stageEl.classList.remove(cls), ms);
}
const triggerRefuse = (elm) => triggerAnim(elm, "blip-refuse", 700);
const triggerHappy = (elm) => triggerAnim(elm, "blip-happy", 900);

/* ---------------- pharmacy / treats catalogue ----------------
   The backend serves food in state.foodShop ([{id, kind, price}]),
   kept separate from the cosmetic state.shop on purpose. Merge live
   prices from there, falling back to the plan's TUNABLE defaults
   (soup 15 / medicine 20) so the flow stays testable standalone. */
const PHARMACY_DEFAULTS = {
  soup: { id: "soup", label: "Soup", icon: "🍲", price: 15 },
  medicine: { id: "medicine", label: "Medicine", icon: "💊", price: 20 },
};
function pharmacyItems(state) {
  const food = state.foodShop || [];
  return ["soup", "medicine"].map((id) => {
    const live = food.find((it) => it.id === id || it.kind === id);
    return live ? { ...PHARMACY_DEFAULTS[id], price: live.price } : PHARMACY_DEFAULTS[id];
  });
}
const TREAT_FALLBACK = [{ id: "treat", label: "Extra treat", icon: "🍪", price: 8 }];
function treatLabel(id) { return id === "treat" ? "Extra treat" : id.replace(/^treat-/, "").replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()); }
function treatItems(state) {
  const food = state.foodShop || [];
  const live = food.filter((it) => it.kind === "treat" || (it.id && it.id.startsWith("treat")));
  return live.length ? live.map((it) => ({ id: it.id, label: treatLabel(it.id), icon: "🍬", price: it.price })) : TREAT_FALLBACK;
}

function foodErrMsg(code, r) {
  return ({
    auth: "Session problem — try logging in again.",
    no_item: "That item isn't available.",
    gold: `Not enough crystals — you have ${(r && r.gold) || 0} 💎, it costs ${(r && r.price) || "?"} 💎.`,
    REFUSES_FOOD: "Blip doesn't feel like eating right now.",
    BLIP_TOO_SICK: "Blip won't get up right now…",
  })[code] || "Something went wrong — try again.";
}

/* Soup + medicine together make one care day (PHASE-2-PLAN §2). Kept
   as a module-level flag (not per-render) so it survives the
   app.go("blip") remount that follows each successful purchase —
   only reset once both have been given (or on a fresh page load). */
let sessionCare = { soup: false, medicine: false };
async function maybeLogCareDay(app, sess, itemId) {
  if (itemId === "soup") sessionCare.soup = true;
  if (itemId === "medicine") sessionCare.medicine = true;
  if (!(sessionCare.soup && sessionCare.medicine)) return;
  sessionCare = { soup: false, medicine: false };
  await app.refresh();
  if (app.state && app.state.canCareToday === false) {
    showToast("You've already cared for Blip today — come back tomorrow to keep it going.", "info");
    return;
  }
  try {
    const r = await api.care(sess.username, sess.password);
    if (r && r.ok) {
      await app.refresh();
      const streak = normalizeHealth(app.state).careStreak;
      showToast(`Care day logged — ${streak}/3. Blip's on the mend.`, "good");
    }
  } catch { /* non-fatal — soup/medicine already landed; next visit can retry the care day */ }
}

function pharmacyCard(app, sess, state, health) {
  const card = el("div", "card pharmacy-card");
  const hearts = Array.from({ length: 3 }, (_, i) => (i < health.careStreak ? "❤️" : "🤍")).join(" ");
  card.innerHTML = `<h3>PHARMACY</h3>
    <p class="muted small">Grocery run — soup and medicine together make one care day — 3 care days and Blip's back to himself.</p>
    <div class="care-hearts">${hearts} <span class="muted small">(${health.careStreak}/3 care days)</span></div>
    <div class="pharmacy-grid"></div>`;
  const grid = card.querySelector(".pharmacy-grid");
  pharmacyItems(state).forEach((item) => {
    const row = el("div", "pharmacy-item");
    row.innerHTML = `<div class="ph-name">${item.icon} ${item.label}</div><div class="ph-price"><span class="crystal">💎</span> ${item.price}</div>`;
    const btn = el("button", "btn small primary", `Give ${item.label.toLowerCase()}`);
    btn.addEventListener("click", async () => {
      btn.disabled = true;
      try {
        const r = await api.buyItem(sess.username, sess.password, item.id);
        if (!r || !r.ok) { showToast(foodErrMsg(r && r.error, r), "error"); btn.disabled = false; return; }
        showToast(`Gave Blip ${item.label.toLowerCase()}.`, "good");
        await maybeLogCareDay(app, sess, item.id);
        await app.refresh(); app.go("blip");
      } catch { showToast("Can't reach the server — try again.", "error"); btn.disabled = false; }
    });
    row.appendChild(btn);
    grid.appendChild(row);
  });
  return card;
}

/* ---------------- second Blip ---------------- */
function openSecondBlipModal(app) {
  const sess = getSession();
  let colour = "cream", name = "";

  const scrim = el("div", "modal-scrim");
  const modal = el("div", "modal unlock-modal");
  modal.innerHTML = `
    <div class="mhead"><span class="meyebrow">New Blip</span><button class="link-btn close" aria-label="Close">✕</button></div>
    <h2>Name your new Blip</h2>
    <input class="blip-name-input second-blip-name" maxlength="24" placeholder="Give them a name" />
    <div class="unlock-stage"></div>`;
  const stage = modal.querySelector(".unlock-stage");
  renderCompanion(stage, { colour, accessories: [] });

  const nameInput = modal.querySelector(".second-blip-name");
  nameInput.addEventListener("input", () => { name = nameInput.value; });

  const swatches = renderSwatchGrid({
    current: colour, locked: false,
    onPick: (id) => {
      colour = id;
      [...swatches.children].forEach((b) => b.classList.toggle("active", b.dataset.colour === id));
      renderCompanion(stage, { colour, accessories: [] });
    },
  });
  modal.appendChild(swatches);

  const btn = el("button", "btn primary big", "Hatch!");
  modal.appendChild(btn);
  scrim.appendChild(modal);

  const close = () => scrim.remove();
  modal.querySelector(".close").addEventListener("click", close);
  scrim.addEventListener("click", (e) => { if (e.target === scrim) close(); });

  btn.addEventListener("click", async () => {
    const nm = name.trim();
    if (!nm) { showToast("Give the new Blip a name first.", "error"); return; }
    btn.disabled = true;
    try {
      const r = await api.claimSecondBlip(sess.username, sess.password, nm, colour);
      if (!r || !r.ok) { showToast("Couldn't claim a second Blip — try again.", "error"); btn.disabled = false; return; }
      showToast(`${nm} joined the household!`, "good");
      close();
      await app.refresh(); app.go("blip");
    } catch { showToast("Can't reach the server — try again.", "error"); btn.disabled = false; }
  });

  document.body.appendChild(scrim);
}

let activeSlot = 0; // which blip's name/colour/equip panel is showing (two-blip households)

export function renderBlip(app, host) {
  clear(host);
  const sess = getSession();
  const state = app.state || {};
  const blips = normalizeBlips(state);
  const health = normalizeHealth(state);
  const level = (state.levelInfo && state.levelInfo.level) || 1;
  const xp = state.xp || 0;
  if (!blips.some((b) => b.slot === activeSlot)) activeSlot = blips[0].slot;
  const activeBlip = blips.find((b) => b.slot === activeSlot) || blips[0];
  // hoisted above the hero mount (was computed down by the feed card) —
  // the hero's idle animation needs it too, to show the hungry loop
  // instead of the static base when healthy + feedable today.
  const canFeedToday = readyFlag(state.canFeedToday);

  const head = el("div", "blip-head");
  head.innerHTML = `<div><span class="eyebrow">System</span><h1><span class="sparkle">✦</span> STATUS <span class="sparkle">✦</span></h1><p class="muted small">Your companion, Blip</p></div>
    <div style="display:flex;gap:8px;align-items:center">
      <button class="link-btn gallery-link" title="Everyone's Blips" aria-label="Gallery">👥</button>
      <button class="link-btn back" aria-label="Back">←</button>
    </div>`;
  head.querySelector(".back").addEventListener("click", () => app.go("hub"));
  const galleryBtn = head.querySelector(".gallery-link");
  if (health.locks.gallery) { galleryBtn.title = "Blip is too sick to go out"; galleryBtn.style.opacity = ".5"; }
  galleryBtn.addEventListener("click", () => app.go("gallery"));
  host.appendChild(head);

  // ---- two-blip slot switcher ----
  if (blips.length > 1) {
    const tabs = el("div", "blip-slot-tabs");
    blips.forEach((b) => {
      const t = el("button", "blip-slot-tab" + (b.slot === activeSlot ? " active" : ""), b.name || "Blip");
      t.type = "button";
      t.addEventListener("click", () => { activeSlot = b.slot; app.render(); });
      tabs.appendChild(t);
    });
    host.appendChild(tabs);
  }

  // ---- hero preview + mood + nickname ----
  const hero = el("div", "card blip-hero-card");
  hero.innerHTML = `<div class="blip-hero-stage"><div class="blip-pedestal"><i></i></div></div>`;
  const heroStage = hero.querySelector(".blip-hero-stage");
  const heroHandle = mountBlip(heroStage, {
    colour: activeBlip.colour,
    equipped: activeBlip.equipped,
    growthStage: activeBlip.growthStage,
    healthStage: health.stage,
    recovering: health.recovering,
    hungry: canFeedToday,
    // poke him: alternates a wink and a hop (renderer ignores taps while
    // he's sleeping/sick/recovering). Deliberately NOT set on the hub
    // tile's Blips — that tile's own click navigates here, and a tap
    // that both hops and changes screen reads as a misfire.
    tappable: true,
  });

  const mood = moodCopy(health);
  if (mood) hero.appendChild(el("div", "blip-mood", `${mood.icon} ${mood.text}`));

  const nameRow = el("div", "blip-name-row");
  const nameInput = el("input", "blip-name-input");
  nameInput.maxLength = 24;
  nameInput.value = activeBlip.name || "Blip";
  nameInput.setAttribute("aria-label", "Blip's nickname");
  const saveNameBtn = el("button", "btn small", "Save");
  nameRow.append(nameInput, saveNameBtn);
  hero.appendChild(nameRow);
  hero.appendChild(el("p", "muted small blip-name-hint", "Only you see this nickname — it never shows to other players."));
  host.appendChild(hero);

  saveNameBtn.addEventListener("click", async () => {
    const nm = nameInput.value.trim();
    if (!nm) { showToast("Give Blip a name first.", "error"); return; }
    saveNameBtn.disabled = true;
    try {
      const r = await api.equip(sess.username, sess.password, { slot: activeBlip.slot, blipName: nm });
      if (!r || !r.ok) { showToast(equipErrMsg(r && r.error), "error"); saveNameBtn.disabled = false; return; }
      showToast("Nickname saved!", "good");
      await app.refresh();
      app.go("blip");
    } catch { showToast("Can't reach the server — try again.", "error"); saveNameBtn.disabled = false; }
  });

  // ---- feed (household action — one cookie feeds every Blip) ----
  // (canFeedToday itself is computed up near activeBlip now — the hero
  // mount needs it for the idle hungry-loop hint)
  const feedCard = el("div", "card feed-card");
  const feedBtn = el("button", "btn primary big" + (canFeedToday ? "" : " ghost"), canFeedToday ? "🍪 Feed Blip" : "Fed today — come back tomorrow");
  feedBtn.disabled = !canFeedToday;
  feedCard.appendChild(feedBtn);
  host.appendChild(feedCard);
  feedBtn.addEventListener("click", async () => {
    feedBtn.disabled = true;
    try {
      const r = await api.feed(sess.username, sess.password);
      if (!r || !r.ok) {
        const code = r && r.error;
        if (code === "REFUSES_FOOD") { triggerRefuse(heroStage); showToast(`${blips[0].name} doesn't feel like eating… maybe soup?`, "error"); }
        else if (code === "BLIP_TOO_SICK") { showToast("Blip won't get up right now…", "error"); }
        else showToast("Something went wrong — try again.", "error");
        feedBtn.disabled = false; return;
      }
      triggerHappy(heroStage);
      playMoment(heroHandle, "excited");
      showToast(blips.length > 1 ? `${blips[0].name} and ${blips[1].name} shared a cookie!` : `${blips[0].name} enjoyed a cookie!`, "good");
      await app.refresh();
      app.go("blip");
    } catch { showToast("Can't reach the server — try again.", "error"); feedBtn.disabled = false; }
  });

  // ---- second Blip unlock (quiet moment, not a nag) ----
  if (level >= 10 && blips.length < 2) {
    const sb = el("div", "card second-blip-card");
    sb.innerHTML = `<div class="sb-icon">🥚</div>
      <div><h3>Blip would love a friend…</h3><p class="muted small">You've reached level ${level} — hatch a second Blip to join the household.</p></div>`;
    const hatchBtn = el("button", "btn primary small", "Hatch a friend");
    hatchBtn.addEventListener("click", () => openSecondBlipModal(app));
    sb.appendChild(hatchBtn);
    host.appendChild(sb);
  }

  // ---- colour ----
  host.appendChild(el("h2", "", "COLOUR"));
  const colourCard = el("div", "card colour-card");
  const xpLocked = xp <= 0;
  const colourLocked = xpLocked || health.locks.dress;
  if (xpLocked) colourCard.appendChild(el("p", "colour-hint", "🔒 Finish your first round to unlock colours — blue stays free any time."));
  if (!xpLocked && health.locks.dress) colourCard.appendChild(el("p", "colour-hint", "🛌 Blip won't get up to change today — try again once he's feeling better."));
  const swatches = renderSwatchGrid({
    current: activeBlip.colour, locked: colourLocked,
    onPick: async (id) => {
      try {
        const r = await api.equip(sess.username, sess.password, { slot: activeBlip.slot, colour: id });
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
  host.appendChild(el("h2", "", "SHOP"));
  if (health.stage >= 2) {
    // Critical-adjacent: the cosmetic layer steps aside for the pharmacy.
    host.appendChild(el("p", "muted small", "The shop's quiet for now — Blip needs some care first."));
    host.appendChild(pharmacyCard(app, sess, state, health));
  } else {
    const grid = el("div", "shop-grid");
    (state.shop || []).filter((it) => ["hat", "ears", "glasses", "wings", "arms"].includes(it.slot)).forEach((item) => {
      const owned = (activeBlip.owned || []).includes(item.id);
      const equippedHere = activeBlip.equipped && activeBlip.equipped[item.slot] === item.id;
      const lockedByLevel = level < item.minLevel;
      const lockedByDress = health.locks.dress;
      const lockedByShop = health.locks.shop;
      const card = el("div", "shop-item" + (equippedHere ? " equipped" : ""));
      card.innerHTML = `<div class="si-stage"></div>
        <div class="si-name">${itemLabel(item.id)}</div>
        <div class="si-meta">${owned ? (equippedHere ? "Equipped" : "Owned") : `<span class="crystal">💎</span> ${item.price}${lockedByLevel ? ` · unlocks at level ${item.minLevel}` : ""}`}</div>`;
      renderCompanion(card.querySelector(".si-stage"), { colour: activeBlip.colour, accessories: [item.id] });

      const actionBtn = el("button", "btn small");
      if (owned) {
        actionBtn.textContent = lockedByDress ? "Blip won't get up…" : (equippedHere ? "Unequip" : "Equip");
        actionBtn.className = "btn small" + (lockedByDress ? " ghost" : equippedHere ? " ghost" : " primary");
        actionBtn.disabled = lockedByDress;
        if (!lockedByDress) actionBtn.addEventListener("click", async () => {
          actionBtn.disabled = true;
          const nextEquipped = { ...(activeBlip.equipped || {}) };
          nextEquipped[item.slot] = equippedHere ? "" : item.id;
          try {
            const r = await api.equip(sess.username, sess.password, { slot: activeBlip.slot, equipped: nextEquipped });
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
        actionBtn.innerHTML = lockedByShop ? "Shop's closed for now" : `Buy · ${item.price} <span class="crystal">💎</span>`;
        actionBtn.className = "btn small primary";
        actionBtn.disabled = lockedByShop;
        if (!lockedByShop) actionBtn.addEventListener("click", async () => {
          actionBtn.disabled = true;
          try {
            // cosmetics are per-blip server-side — buy onto the ACTIVE blip's slot
            const r = await api.buyItem(sess.username, sess.password, item.id, activeBlip.slot);
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

    // treats (paid, cosmetic-food — animate him but never accelerate growth)
    const treats = treatItems(state);
    if (treats.length) {
      host.appendChild(el("h3", "", "TREATS"));
      const tgrid = el("div", "shop-grid");
      treats.forEach((item) => {
        const lockedByShop = health.locks.shop;
        const card = el("div", "shop-item");
        card.innerHTML = `<div class="si-stage" style="font-size:30px;display:grid;place-items:center">${item.icon}</div>
          <div class="si-name">${item.label}</div>
          <div class="si-meta"><span class="crystal">💎</span> ${item.price}</div>`;
        const btn = el("button", "btn small primary", lockedByShop ? "Shop's closed for now" : `Buy · ${item.price} <span class="crystal">💎</span>`);
        btn.disabled = lockedByShop;
        if (!lockedByShop) btn.addEventListener("click", async () => {
          btn.disabled = true;
          try {
            const r = await api.buyItem(sess.username, sess.password, item.id);
            if (!r || !r.ok) {
              const code = r && r.error;
              if (code === "REFUSES_FOOD") { triggerRefuse(heroStage); showToast(`${blips[0].name} doesn't feel like eating right now.`, "error"); }
              else showToast(foodErrMsg(code, r), "error");
              btn.disabled = false; return;
            }
            triggerHappy(heroStage);
            showToast(`${blips[0].name} loved that treat!`, "good");
            await app.refresh(); app.go("blip");
          } catch { showToast("Can't reach the server — try again.", "error"); btn.disabled = false; }
        });
        card.appendChild(btn);
        tgrid.appendChild(card);
      });
      host.appendChild(tgrid);
    }

    host.appendChild(pharmacyCard(app, sess, state, health));
  }
}

function equipErrMsg(code) {
  return ({
    auth: "Session problem — try logging in again.",
    bad_equipped: "That item can't be equipped there.",
    bad_colour: "That colour isn't available.",
    colour_locked: "Finish your first round to unlock colours.",
    bad_name: "Give Blip a name first.",
    BLIP_TOO_SICK: "Blip won't get up right now…",
  })[code] || "Something went wrong — try again.";
}
function buyErrMsg(code, r) {
  return ({
    auth: "Session problem — try logging in again.",
    no_item: "That item isn't available.",
    owned: "You already own that.",
    locked: `Unlocks at level ${(r && r.minLevel) || "?"}.`,
    gold: `Not enough crystals — you have ${(r && r.gold) || 0} 💎, it costs ${(r && r.price) || "?"} 💎.`,
    BLIP_TOO_SICK: "Blip won't get up right now…",
  })[code] || "Something went wrong — try again.";
}
