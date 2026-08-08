/* ============================================================
   BLIP SCREEN — his ROOM (room build S1, 2026-08-08): a bed,
   closet and desk around Blip on his glow pedestal, an
   inline-editable nickname, a top-right daily cookie + today's
   grocery tray, and five round dock buttons (colours/shop/food/
   pharmacy/furniture) that each open a bottom sheet over the
   lower room. All state comes from app.state (a fresh
   mhq_get_state/local getState); every action re-asks the
   backend and never trusts a locally-guessed outcome — errors
   always toast, never fail silently.

   ROOM BUILD S4b (2026-08-08 revision) — the fridge is GONE.
   A bought grocery now lands on TODAY'S TRAY, shown top-right
   beside the daily cookie, draggable onto Blip the same way a
   fridge tile always was. Unfed groceries expire at midnight
   with no refund (her ruling) — see js/local-backend.js and
   supabase/migration-food-shop.sql.

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
   single-blip shape if the backend hasn't shipped yet.

   ROOM BUILD S1 (2026-08-08) — UI restructure only, no DB changes.
   Closet/Shop/Colour/Pharmacy content is the same data + API calls
   as before, just moved into bottom sheets (see ROOM-BUILD-PLAN.md
   in homework-hub-companion/). Furniture art is PLACEHOLDER
   (js/companion/room-art.js), swapped for Megan's Tripo art later.
   ============================================================ */
import { api } from "./api.js";
import { getSession } from "./session.js";
import { el, clear, showToast } from "./ui.js";
/* renderBlip is aliased on import — this file's own exported screen
   function is ALSO conventionally named renderBlip(app, host) (matching
   renderHub/renderChapter/renderGallery elsewhere), which collides with
   the companion module's new renderBlip(el, opts) if imported under its
   own name into the same module scope. */
import { renderCompanion, renderBlip as mountCompanionBlip, blipMood, playMoment, momentDurationMs } from "./companion/renderer.js";
import {
  renderSwatchGrid, itemLabel,
  SLOT_LABELS, COSMETIC_SLOTS, itemRarity, accessorySlot,
} from "./companion/blip-ui.js";
import { treasureBadge } from "./companion/treasure.js";
import {
  COLLECTIONS, COLLECTION_ORDER,
  FOOD_COLLECTIONS, FOOD_COLLECTION_ORDER,
} from "./companion/collections.js";
import { TRINKET_IDS, trinketExists, trinketTile } from "./companion/trinkets.js";
import { FOOD_IDS, foodExists, foodLabel, foodArt } from "./companion/food.js";
import { makeDraggable } from "./companion/drag-feed.js";
import { maybeShowReminderCard } from "./push.js";
import { BED_SVG, CLOSET_SVG, DESK_SVG } from "./companion/room-art.js";

/* Which slot tab the closet/shop is filtered to ("all" or a slot id).
   Module scope on purpose: every buy/wear action re-renders the whole
   screen via app.go("blip"), and losing the filter on each tap would
   make dressing Blip in one slot infuriating. Shared between the
   Inventory and Shop sheets, same as the old closet/shop split. */
let activeSlotTab = "all";

/* ---------------- room bottom-sheet machinery ----------------
   One shared bottom-sheet convention (reuses the app's existing
   .modal-scrim/.modal pattern — see css/styles.css "concept modal").
   Only one sheet is ever open; opening a new one replaces the old.
   activeSheetRerender lets an in-sheet control (slot-tab filter) redraw
   the sheet's body WITHOUT closing it or touching app state; any
   backend-mutating action inside a sheet instead closes it and does the
   app's normal full refresh + re-render — same convention every other
   action in this file already used before the room build. */
let activeSheetScrim = null;
let activeSheetRerender = null;
function closeRoomSheet() {
  if (activeSheetScrim) { activeSheetScrim.remove(); activeSheetScrim = null; }
  activeSheetRerender = null;
  setDragging(false);   // a sheet can close mid-drag (a feed succeeds); never leave the class on
}
function openRoomSheet({ id, renderContent, cycleOrder, onCycle }) {
  closeRoomSheet();
  const scrim = el("div", "modal-scrim room-sheet-scrim");
  const modal = el("div", "modal room-sheet");
  const body = el("div", "room-sheet-body");
  modal.appendChild(body);
  const foot = el("div", "room-sheet-foot");
  if (cycleOrder) {
    const nextBtn = el("button", "btn ghost small", "Next →");
    nextBtn.type = "button";
    nextBtn.addEventListener("click", () => {
      const i = cycleOrder.indexOf(id);
      onCycle(cycleOrder[(i + 1) % cycleOrder.length]);
    });
    foot.appendChild(nextBtn);
  }
  const doneBtn = el("button", "btn primary small", "Done");
  doneBtn.type = "button";
  doneBtn.addEventListener("click", closeRoomSheet);
  foot.appendChild(doneBtn);
  modal.appendChild(foot);
  scrim.appendChild(modal);
  scrim.addEventListener("click", (e) => { if (e.target === scrim) closeRoomSheet(); });

  activeSheetRerender = () => { clear(body); renderContent(body); };
  activeSheetRerender();

  document.body.appendChild(scrim);
  activeSheetScrim = scrim;
}
const PANEL_ORDER = ["colours", "shop", "food", "pharmacy", "furniture"];
const PANEL_TITLES = { colours: "COLOURS", shop: "SHOP", food: "FOOD", pharmacy: "PHARMACY", furniture: "FURNITURE", inventory: "INVENTORY" };

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
    locked: `Unlocks at level ${(r && r.minLevel) || "?"}.`,
    gold: `Not enough crystals — you have ${(r && r.gold) || 0} 💎, it costs ${(r && r.price) || "?"} 💎.`,
    REFUSES_FOOD: "Blip doesn't feel like eating right now.",
    BLIP_TOO_SICK: "Blip won't get up right now…",
  })[code] || "Something went wrong — try again.";
}
/* S4b: eating (mhq_eat_food) has two failures of its own. `none_left` can
   mean two taps raced the same last apple (the per-render `feeding` guard
   already prevents that) or that the tray expired overnight — the server
   is the authority on what's on the tray, so the message stays generic. */
function eatErrMsg(code) {
  return ({
    auth: "Session problem — try logging in again.",
    no_item: "That isn't food.",
    not_edible: "That's medicine, not a snack — the Pharmacy gives those together.",
    none_left: "There's none of that left on the tray.",
    REFUSES_FOOD: "Blip doesn't feel like eating right now.",
  })[code] || "Something went wrong — try again.";
}

/* Drag-to-feed puts the open bottom sheet out of the way while a food is
   in the air, so the child can actually see Blip to aim at (the sheet
   covers the lower 2/3 of the screen). One body class, one CSS rule — see
   `body.feeding-drag` in css/styles.css. */
function setDragging(on) { document.body.classList.toggle("feeding-drag", !!on); }

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

/* Pharmacy is now ONLY reached from inside the PHARMACY sheet (room
   build S1) — a successful buy closes the sheet before the usual
   full refresh + re-render, same convention as every other sheet
   action below. closeRoomSheet() is a no-op if nothing is open, so
   this stays safe if pharmacyCard is ever mounted outside a sheet. */
function pharmacyCard(app, sess, state, health) {
  const card = el("div", "card pharmacy-card");
  const hearts = Array.from({ length: 3 }, (_, i) => (i < health.careStreak ? "❤️" : "🤍")).join(" ");
  card.innerHTML = `<h3>PHARMACY</h3>
    <p class="muted small">Grocery run — soup and medicine together make one care day — 3 care days and Blip's back to himself.</p>
    <div class="care-hearts">${hearts} <span class="muted small">(${health.careStreak}/3 care days)</span></div>
    <div class="stash-grid"></div>
    <p class="muted small">Soup and medicine are given together when Blip is ill — they aren't snacks, and unlike groceries, they never expire.</p>
    <div class="pharmacy-grid"></div>`;
  // room build S4b: moved here from the (now fridge-less) Food panel — soup
  // and medicine live in the pantry, not today's tray, and stay put forever.
  const stashGrid = card.querySelector(".stash-grid");
  const pantry = state.pantry || {};
  [["soup", "🍲", "Soup"], ["medicine", "💊", "Medicine"]].forEach(([id, icon, label]) => {
    const row = el("div", "stash-item");
    row.innerHTML = `<span class="si-icon">${icon}</span><span class="si-label">${label}</span><span class="si-count">×${pantry[id] || 0}</span>`;
    stashGrid.appendChild(row);
  });
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
        closeRoomSheet();
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

/* ---------------- inline-edit nickname ----------------
   Replaces the old permanent input + Save button: a plain button
   showing the name, tap it and it becomes an input; Enter/blur saves,
   Escape cancels and collapses back. Same api.equip(...blipName) call
   as before — only the chrome around it changed. */
function mountNameEditor(container, app, sess, activeBlip) {
  const renderView = () => {
    clear(container);
    const btn = el("button", "room-name-btn");
    btn.type = "button";
    btn.innerHTML = `${activeBlip.name || "Blip"} <span class="rn-edit-ic">✎</span>`;
    btn.setAttribute("aria-label", "Edit Blip's nickname");
    btn.addEventListener("click", renderEdit);
    container.appendChild(btn);
  };
  const renderEdit = () => {
    clear(container);
    const input = el("input", "room-name-input");
    input.maxLength = 24;
    input.value = activeBlip.name || "Blip";
    input.setAttribute("aria-label", "Blip's nickname");
    container.appendChild(input);
    input.focus();
    input.select();
    let settled = false;
    const save = async () => {
      if (settled) return;
      const nm = input.value.trim();
      if (!nm || nm === (activeBlip.name || "Blip")) { settled = true; renderView(); return; }
      settled = true;
      input.disabled = true;
      try {
        const r = await api.equip(sess.username, sess.password, { slot: activeBlip.slot, blipName: nm });
        if (!r || !r.ok) { showToast(equipErrMsg(r && r.error), "error"); settled = false; input.disabled = false; return; }
        showToast("Nickname saved!", "good");
        await app.refresh();
        app.go("blip");
      } catch { showToast("Can't reach the server — try again.", "error"); settled = false; input.disabled = false; }
    };
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") { e.preventDefault(); save(); }
      else if (e.key === "Escape") { settled = true; renderView(); }
    });
    input.addEventListener("blur", save);
  };
  renderView();
}

let activeSlot = 0; // which blip's name/colour/equip panel is showing (two-blip households)

export function renderBlip(app, host) {
  clear(host);
  closeRoomSheet(); // a fresh screen render always starts with no sheet open
  const sess = getSession();
  const state = app.state || {};
  const blips = normalizeBlips(state);
  const health = normalizeHealth(state);
  const level = (state.levelInfo && state.levelInfo.level) || 1;
  const xp = state.xp || 0;
  if (!blips.some((b) => b.slot === activeSlot)) activeSlot = blips[0].slot;
  const activeBlip = blips.find((b) => b.slot === activeSlot) || blips[0];
  const canFeedToday = readyFlag(state.canFeedToday);

  const head = el("div", "blip-head");
  head.innerHTML = `<div><span class="eyebrow">System</span></div>
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

  // ============================================================
  // THE ROOM
  // ============================================================
  const roomCard = el("div", "card room-card");
  host.appendChild(roomCard);

  // ---- room layout: bed / closet / desk / Blip on his pedestal ----
  // Built before the header so the header's cookie button can trigger the
  // same happy/refuse shake on the Blip stage the old feed button used.
  const room = el("div", "room");
  const mkFurniture = (cls, svg, label) => {
    const f = el("div", "room-furniture " + cls);
    f.tabIndex = 0;
    f.setAttribute("role", "button");
    f.setAttribute("aria-label", label);
    f.title = label;
    f.innerHTML = `<div class="rf-art">${svg}</div><span class="rf-label">${label}</span>`;
    return f;
  };
  const bindTap = (elm, fn) => {
    elm.addEventListener("click", fn);
    elm.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); fn(); } });
  };

  const bedEl = mkFurniture("bed", BED_SVG, "Bed");
  const closetEl = mkFurniture("closet", CLOSET_SVG, "Closet");
  const deskEl = mkFurniture("desk", DESK_SVG, "Desk");
  room.append(bedEl, closetEl, deskEl);

  const roomStage = el("div", "room-blip-stage");
  roomStage.innerHTML = `<div class="blip-pedestal"><i></i></div>`;
  room.appendChild(roomStage);
  const blipHandle = mountBlip(roomStage, {
    colour: activeBlip.colour,
    equipped: activeBlip.equipped,
    growthStage: activeBlip.growthStage,
    healthStage: health.stage,
    recovering: health.recovering,
    hungry: canFeedToday,
    // poke him: alternates a wink and a hop (renderer ignores taps while
    // he's sleeping/sick/recovering).
    tappable: true,
  });

  bindTap(closetEl, () => openPanel("inventory", false));
  bindTap(bedEl, () => triggerAnim(bedEl, "rf-wiggle", 500));
  bindTap(deskEl, () => triggerAnim(deskEl, "rf-wiggle", 500));

  // ---- header: nickname (tap to edit), subtitle, mood chip ----
  const titleWrap = el("div", "room-titlewrap");
  const nameWrap = el("div", "room-name-wrap");
  mountNameEditor(nameWrap, app, sess, activeBlip);
  titleWrap.appendChild(nameWrap);
  titleWrap.appendChild(el("p", "muted small room-subtitle", "Your study companion"));
  const mood = moodCopy(health);
  if (mood) titleWrap.appendChild(el("div", "blip-mood", `${mood.icon} ${mood.text}`));
  roomCard.appendChild(titleWrap);

  // ---- daily cookie (top-right) — the household's one free daily feed ----
  const cookieBtn = el("button", "cookie-badge" + (canFeedToday ? "" : " done"), canFeedToday ? "🍪" : "✅");
  cookieBtn.type = "button";
  cookieBtn.title = canFeedToday ? "Feed Blip" : "Fed today — come back tomorrow";
  cookieBtn.setAttribute("aria-label", cookieBtn.title);
  cookieBtn.disabled = !canFeedToday;
  /* S4: the cookie is DRAGGABLE too, with exactly the same rules as a
     tray tile — drop it on him and he eats it, drop it elsewhere and it
     floats back with the sad face. Tap still works (bindFeedDrag treats a
     press that never moved as a tap), and so does keyboard Enter/Space.
     A spent cookie is a disabled <button>, which dispatches no pointer
     events at all, so "fed today" needs no separate drag guard. */
  const eatCookie = async () => {
    if (cookieBtn.disabled) return;
    cookieBtn.disabled = true;
    try {
      const r = await api.feed(sess.username, sess.password);
      if (!r || !r.ok) {
        const code = r && r.error;
        if (code === "REFUSES_FOOD") { triggerRefuse(roomStage); showToast(`${blips[0].name} doesn't feel like eating… maybe soup?`, "error"); }
        else if (code === "BLIP_TOO_SICK") { showToast("Blip won't get up right now…", "error"); }
        else showToast("Something went wrong — try again.", "error");
        cookieBtn.disabled = false; return;
      }
      triggerHappy(roomStage);
      playMoment(blipHandle, "eating");
      showToast(blips.length > 1 ? `${blips[0].name} and ${blips[1].name} shared a cookie!` : `${blips[0].name} enjoyed a cookie!`, "good");
      // wait for the eating frames before the re-render swaps the <img> out
      await new Promise((res) => setTimeout(res, momentDurationMs("eating")));
      await app.refresh();
      app.go("blip");
    } catch { showToast("Can't reach the server — try again.", "error"); cookieBtn.disabled = false; }
  };
  bindFeedDrag(cookieBtn, eatCookie, () => el("div", "fg-emoji", "🍪"));

  /* Room build S4b (2026-08-08 revision): the fridge is gone. A bought
     grocery lands on TODAY'S TRAY instead, shown here beside the cookie —
     every tile draggable onto Blip exactly like the old fridge tiles
     (stashTile/bindFeedDrag, unchanged). Read app.state FRESH (not the
     outer `state` closure) so a purchase made while the Food sheet is
     still open (it deliberately stays open — see foodCard below) shows up
     here the moment it lands, same reasoning renderFoodPanel already uses
     for its own reads. */
  const trayWrap = el("div", "room-tray");
  function renderTray() {
    clear(trayWrap);
    trayWrap.appendChild(cookieBtn);
    const st = app.state || {};
    const trayObj = st.tray || {};
    const hl = normalizeHealth(st);
    const trayIds = FOOD_IDS.filter((id) => (trayObj[id] || 0) > 0);
    if (trayIds.length) {
      const strip = el("div", "tray-strip" + (hl.stage >= 2 ? " is-locked" : ""));
      trayIds.forEach((id) => strip.appendChild(stashTile(id, trayObj[id], hl.stage >= 2)));
      trayWrap.appendChild(strip);
    }
  }
  renderTray();
  roomCard.appendChild(trayWrap);

  // Phase 3: unopened treasure boxes ride top-left of the room card, so
  // they never collide with the cookie button top-right.
  try { treasureBadge(app, roomCard); } catch { /* non-critical */ }

  roomCard.appendChild(room);

  // Daily-reminder opt-in — was under the old feed button; the room card
  // is the closest equivalent home for it now. Stays hidden until the
  // VAPID key is set, so it is dormant until Megan finishes setup.
  try { maybeShowReminderCard(roomCard); } catch { /* non-critical */ }

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

  // ============================================================
  // shared catalogue data — same computation as the old closet/shop
  // split, now feeding the Inventory sheet (owned) and Shop sheet
  // (buyable) instead of two stacked page sections.
  // ============================================================
  const shopItems = (state.shop || []).filter((it) => COSMETIC_SLOTS.includes(it.slot));
  const shopById = new Map(shopItems.map((it) => [it.id, it]));
  const closetItems = (activeBlip.owned || [])
    .map((id) => shopById.get(id) || { id, slot: accessorySlot(id), price: null, minLevel: 1, retired: true })
    .filter((it) => it.slot && COSMETIC_SLOTS.includes(it.slot));
  const buyableItems = shopItems.filter((it) => !(activeBlip.owned || []).includes(it.id));
  const liveSlots = COSMETIC_SLOTS.filter((s) =>
    closetItems.some((it) => it.slot === s) || buyableItems.some((it) => it.slot === s));
  const inTab = (it) => activeSlotTab === "all" || it.slot === activeSlotTab;

  /* One card renderer for both Inventory and Shop sheets — the only
     difference is which action button it gets. */
  const cosmeticCard = (item, owned) => {
    const equippedHere = activeBlip.equipped && activeBlip.equipped[item.slot] === item.id;
    const lockedByLevel = level < item.minLevel;
    const lockedByDress = health.locks.dress;
    const lockedByShop = health.locks.shop;
    const rarity = item.retired ? "common" : itemRarity(item.price);
    const card = el("div", "shop-item rarity-" + rarity + (equippedHere ? " equipped" : ""));
    const meta = owned
      ? (equippedHere ? "Equipped" : (item.retired ? "Owned · no longer sold" : "Owned"))
      : (rarity === "free"
          ? "Free"
          : `<span class="crystal">💎</span> ${item.price}${lockedByLevel ? ` · unlocks at level ${item.minLevel}` : ""}`);
    card.innerHTML = `<div class="si-stage"></div>
      ${rarity === "rare" ? '<div class="si-tag rare">RARE</div>' : rarity === "free" && !owned ? '<div class="si-tag free">FREE</div>' : ""}
      <div class="si-name">${itemLabel(item.id)}</div>
      <div class="si-meta">${meta}</div>`;
    renderCompanion(card.querySelector(".si-stage"), { colour: activeBlip.colour, accessories: [item.id] });

    const actionBtn = el("button", "btn small");
    if (owned) {
      actionBtn.textContent = lockedByDress ? "Blip won't get up…" : (equippedHere ? "Take off" : "Wear");
      actionBtn.className = "btn small" + (lockedByDress ? " ghost" : equippedHere ? " ghost" : " primary");
      actionBtn.disabled = lockedByDress;
      if (!lockedByDress) actionBtn.addEventListener("click", async () => {
        actionBtn.disabled = true;
        const nextEquipped = { ...(activeBlip.equipped || {}) };
        nextEquipped[item.slot] = equippedHere ? "" : item.id;
        try {
          const r = await api.equip(sess.username, sess.password, { slot: activeBlip.slot, equipped: nextEquipped });
          if (!r || !r.ok) { showToast(equipErrMsg(r && r.error), "error"); actionBtn.disabled = false; return; }
          showToast(equippedHere ? `${itemLabel(item.id)} taken off.` : `${itemLabel(item.id)} on!`, "good");
          closeRoomSheet();
          await app.refresh();
          app.go("blip");
        } catch { showToast("Can't reach the server — try again.", "error"); actionBtn.disabled = false; }
      });
    } else if (lockedByLevel) {
      actionBtn.textContent = `Unlocks at level ${item.minLevel}`;
      actionBtn.disabled = true;
      actionBtn.className = "btn small ghost";
    } else {
      actionBtn.innerHTML = lockedByShop
        ? "Shop's closed for now"
        : (rarity === "free" ? "Get it free" : `Buy · ${item.price} <span class="crystal">💎</span>`);
      actionBtn.className = "btn small primary";
      actionBtn.disabled = lockedByShop;
      if (!lockedByShop) actionBtn.addEventListener("click", async () => {
        actionBtn.disabled = true;
        try {
          const r = await api.buyItem(sess.username, sess.password, item.id, activeBlip.slot);
          if (!r || !r.ok) { showToast(buyErrMsg(r && r.error, r), "error"); actionBtn.disabled = false; return; }
          showToast(rarity === "free" ? `${itemLabel(item.id)} is yours!` : `Bought ${itemLabel(item.id)}!`, "good");
          closeRoomSheet();
          await app.refresh();
          app.go("blip");
        } catch { showToast("Can't reach the server — try again.", "error"); actionBtn.disabled = false; }
      });
    }
    card.appendChild(actionBtn);
    return card;
  };

  const renderSlotTabs = (container) => {
    if (!liveSlots.includes(activeSlotTab)) activeSlotTab = "all";
    const tabs = el("div", "slot-tabs");
    [["all", "All"], ...liveSlots.map((s) => [s, SLOT_LABELS[s]])].forEach(([id, label]) => {
      const t = el("button", "slot-tab" + (id === activeSlotTab ? " active" : ""), label);
      t.type = "button";
      t.addEventListener("click", () => { activeSlotTab = id; if (activeSheetRerender) activeSheetRerender(); });
      tabs.appendChild(t);
    });
    container.appendChild(tabs);
    const activeTabEl = tabs.querySelector(".slot-tab.active");
    if (activeTabEl && activeSlotTab !== "all") {
      // setTimeout, not requestAnimationFrame: the preview pane never fires
      // rAF (known, see the browser-pane note in PROJECT-STATUS).
      setTimeout(() => activeTabEl.scrollIntoView({ block: "nearest", inline: "center" }), 0);
    }
  };

  const renderCosmeticList = (container, owned) => {
    renderSlotTabs(container);
    const items = (owned ? closetItems : buyableItems).filter(inTab);
    if (items.length) {
      const grid = el("div", "shop-grid");
      items.forEach((item) => grid.appendChild(cosmeticCard(item, owned)));
      container.appendChild(grid);
    } else {
      container.appendChild(el("p", "muted small", owned
        ? (closetItems.length ? "Nothing in this part of the closet yet." : "The closet's empty — everything marked FREE below costs nothing.")
        : "You own everything here — nice."));
    }
  };

  /* Room build S3 (2026-08-08): a whole locked collection renders as ONE
     card — grey silhouette, "?", "Unlocks at Lv N" — no names, no prices,
     no item count, per ROOM-BUILD-PLAN.md. The silhouette reuses the real
     renderer (undressed, colour "blue") rather than a fake drawing, then
     desaturates it with CSS, so it always matches Blip's actual shape. */
  const collectionLockedCard = (coll) => {
    const card = el("div", "shop-item collection-locked");
    card.innerHTML = `<div class="si-stage silhouette"></div>
      <div class="si-question">?</div>
      <div class="si-meta">Unlocks at Lv ${coll.unlockLevel}</div>`;
    renderCompanion(card.querySelector(".si-stage"), { colour: "blue", accessories: [] });
    return card;
  };

  /* Shop-only: groups buyable cosmetics by collection (js/companion/
     collections.js). A collection the learner hasn't reached yet collapses
     to one locked card; an unlocked collection shows its items exactly as
     the flat list always has (per-item minLevel still applies inside it).
     Inventory (renderCosmeticList above, owned=true) is UNCHANGED — a
     learner's own closet is never collection-gated, only the shop is. */
  const renderShopCosmetics = (container) => {
    renderSlotTabs(container);
    let shownAny = false;
    COLLECTION_ORDER.forEach((key) => {
      const coll = COLLECTIONS[key];
      const collBuyable = buyableItems.filter((it) => coll.items.includes(it.id) && inTab(it));
      if (!collBuyable.length) return;
      shownAny = true;
      if (level < coll.unlockLevel) {
        const group = el("div", "shop-grid collection-group");
        group.appendChild(collectionLockedCard(coll));
        container.appendChild(group);
      } else {
        container.appendChild(el("h3", "collection-label", coll.label));
        const grid = el("div", "shop-grid");
        collBuyable.forEach((item) => grid.appendChild(cosmeticCard(item, false)));
        container.appendChild(grid);
      }
    });
    if (!shownAny) container.appendChild(el("p", "muted small", "You own everything here — nice."));
  };

  // ============================================================
  // sheet content builders
  // ============================================================
  function renderColoursPanel(container) {
    container.appendChild(el("h2", "", "COLOUR"));
    const xpLocked = xp <= 0;
    const colourLocked = xpLocked || health.locks.dress;
    if (xpLocked) container.appendChild(el("p", "colour-hint", "🔒 Finish your first round to unlock colours — blue stays free any time."));
    if (!xpLocked && health.locks.dress) container.appendChild(el("p", "colour-hint", "🛌 Blip won't get up to change today — try again once he's feeling better."));
    const swatches = renderSwatchGrid({
      current: activeBlip.colour, locked: colourLocked,
      onPick: async (id) => {
        try {
          const r = await api.equip(sess.username, sess.password, { slot: activeBlip.slot, colour: id });
          if (!r || !r.ok) { showToast(equipErrMsg(r && r.error), "error"); return; }
          showToast("Colour updated!", "good");
          closeRoomSheet();
          await app.refresh();
          app.go("blip");
        } catch { showToast("Can't reach the server — try again.", "error"); }
      },
    });
    container.appendChild(swatches);
  }

  function renderShopPanel(container) {
    container.appendChild(el("h2", "", "SHOP"));
    if (health.stage >= 2) {
      container.appendChild(el("p", "muted small", "The shop's quiet for now — Blip needs some care first. Try Pharmacy for soup and medicine."));
      return;
    }
    renderShopCosmetics(container);

    const treats = treatItems(state);
    if (treats.length) {
      container.appendChild(el("h3", "", "TREATS"));
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
              if (code === "REFUSES_FOOD") { triggerRefuse(roomStage); showToast(`${blips[0].name} doesn't feel like eating right now.`, "error"); }
              else showToast(foodErrMsg(code, r), "error");
              btn.disabled = false; return;
            }
            triggerHappy(roomStage);
            showToast(`${blips[0].name} loved that treat!`, "good");
            closeRoomSheet();
            await app.refresh(); app.go("blip");
          } catch { showToast("Can't reach the server — try again.", "error"); btn.disabled = false; }
        });
        card.appendChild(btn);
        tgrid.appendChild(card);
      });
      container.appendChild(tgrid);
    }
  }

  function renderInventoryPanel(container) {
    container.appendChild(el("h2", "", "INVENTORY"));
    renderCosmeticList(container, true);
    container.appendChild(el("h3", "", "SHELF"));
    /* Trinkets are HOUSEHOLD property (state.trinkets), not per-blip, so the
       shelf reads the same whichever blip is showing — a shelf belongs to the
       room. They are never worn and never sold, so there is no action button:
       the shelf is a display case, and that is the whole joke. */
    const owned = (state.trinkets || []).filter(trinketExists);
    if (owned.length) {
      const shelf = el("div", "trinket-shelf has-items");
      // TRINKET_IDS order (= the SQL `sort` order), not arrival order, so the
      // shelf doesn't reshuffle itself every time a box is opened.
      TRINKET_IDS.filter((id) => owned.includes(id)).forEach((id) => shelf.appendChild(trinketTile(id)));
      container.appendChild(shelf);
      container.appendChild(el("p", "muted small",
        owned.length === TRINKET_IDS.length
          ? "Every last piece of junk. Magnificent."
          : `${owned.length} of ${TRINKET_IDS.length} — mystery boxes hold the rest.`));
    } else {
      container.appendChild(el("div", "trinket-shelf",
        "The shelf is empty. Milestone mystery boxes leave odd little things up here."));
    }
  }

  /* ============================================================
     FOOD sheet — room build S4b (2026-08-08 revision): the fridge is
     gone; this panel is now the grocery store only. What's currently on
     the tray shows top-right of the room (renderTray above), and the
     soup/medicine readout moved to the Pharmacy panel.

     ⚠️ This panel reads app.state FRESH on every render rather than the
     `state` captured at screen-render time, because a grocery buy
     deliberately KEEPS THE SHEET OPEN and re-renders only the sheet body
     (see the buy handler). Reading the stale closure would show the old
     tray counts the moment you bought a second apple.
     ============================================================ */
  function renderFoodPanel(container) {
    const st = app.state || {};
    const tray = st.tray || {};
    const lvl = (st.levelInfo && st.levelInfo.level) || 1;
    const hl = normalizeHealth(st);

    container.appendChild(el("h2", "", "FOOD"));
    container.appendChild(el("h3", "", "GROCERY STORE"));
    container.appendChild(el("p", "muted small",
      "⏰ Whatever you buy lands on today's tray, top-right — give it to Blip TODAY. Anything left there at midnight is gone, no refund."));

    if (hl.locks.shop) {
      container.appendChild(el("p", "muted small", "The shop's quiet for now — Blip needs some care first."));
      return;
    }
    const groceries = (st.foodShop || []).filter((it) => foodExists(it.id));
    const byId = new Map(groceries.map((it) => [it.id, it]));
    let shownAny = false;
    FOOD_COLLECTION_ORDER.forEach((key) => {
      const tier = FOOD_COLLECTIONS[key];
      const rows = tier.items.map((id) => byId.get(id)).filter(Boolean);
      if (!rows.length) return;
      shownAny = true;
      if (lvl < tier.unlockLevel) {
        const group = el("div", "shop-grid collection-group");
        group.appendChild(collectionLockedCard(tier));
        container.appendChild(group);
      } else {
        container.appendChild(el("h3", "collection-label", tier.label));
        const grid = el("div", "shop-grid food-grid");
        rows.forEach((it) => grid.appendChild(foodCard(it, tray[it.id] || 0, lvl)));
        container.appendChild(grid);
      }
    });
    if (!shownAny) container.appendChild(el("p", "muted small", "The grocery store is empty — that shouldn't happen; try reloading."));
  }

  /* One grocery card. Buying KEEPS THE SHEET OPEN (a shopping trip is
     several items — the S1 "every mutation closes the sheet" convention
     was already flagged as worth smoothing, and this is the panel where
     it hurt) and re-renders the sheet body from the refreshed state. */
  function foodCard(item, owned, lvl) {
    const lockedByLevel = lvl < item.minLevel;
    const card = el("div", "shop-item food-item");
    card.innerHTML = `<div class="si-stage food-stage"></div>
      <div class="si-name">${foodLabel(item.id)}</div>
      <div class="si-meta">${lockedByLevel
        ? `unlocks at level ${item.minLevel}`
        : `<span class="crystal">💎</span> ${item.price}`}${owned ? ` · ×${owned} on today's tray` : ""}</div>`;
    card.querySelector(".food-stage").appendChild(foodArt(item.id));

    const btn = el("button", "btn small");
    if (lockedByLevel) {
      btn.textContent = `Unlocks at level ${item.minLevel}`;
      btn.disabled = true;
      btn.className = "btn small ghost";
    } else {
      btn.innerHTML = `Buy · ${item.price} <span class="crystal">💎</span>`;
      btn.className = "btn small primary";
      btn.addEventListener("click", async () => {
        btn.disabled = true;
        try {
          const r = await api.buyItem(sess.username, sess.password, item.id);
          if (!r || !r.ok) { showToast(foodErrMsg(r && r.error, r), "error"); btn.disabled = false; return; }
          showToast(`${foodLabel(item.id)} is on today's tray — give it to him today!`, "good");
          await app.refresh();
          renderTray();
          if (activeSheetRerender) activeSheetRerender();   // stay in the shop
        } catch { showToast("Can't reach the server — try again.", "error"); btn.disabled = false; }
      });
    }
    card.appendChild(btn);
    return card;
  }

  /* One tray tile — the thing the child actually drags (room build S4b:
     used only in the top-right tray now, the fridge is gone).
     Tap (and keyboard Enter/Space) feeds him too: a drag-only control is
     unusable with a keyboard, and the daily cookie was always tappable. */
  function stashTile(id, count, tooSick) {
    const tile = el("div", "stash-food");
    tile.tabIndex = 0;
    tile.setAttribute("role", "button");
    tile.setAttribute("aria-label", `Feed ${activeBlip.name || "Blip"} a ${foodLabel(id).toLowerCase()}`);
    tile.title = tooSick ? "Blip won't eat right now" : `Drag ${foodLabel(id).toLowerCase()} onto Blip`;
    tile.appendChild(foodArt(id));
    tile.appendChild(el("span", "sf-name", foodLabel(id)));
    tile.appendChild(el("span", "sf-count", "×" + count));
    if (!tooSick) bindFeedDrag(tile, () => feedFood(id), () => foodArt(id));
    return tile;
  }

  /* ---------------- drag-to-feed ----------------
     Shared by every tray tile AND the daily cookie, so both behave
     identically: drop him and he eats it, drop anywhere else and it
     floats home with no penalty while he pulls the sad face (Megan's
     ruling, 2026-08-07). Pointer events only — rAF never fires in the
     preview pane, so an rAF drag would be untestable. */
  function bindFeedDrag(handleEl, act, makeArt) {
    makeDraggable(handleEl, {
      target: () => roomStage,
      ghost: () => {
        const g = el("div");
        const inner = el("div", "fg-inner");
        inner.appendChild(makeArt());
        g.appendChild(inner);
        return g;
      },
      onStart: () => setDragging(true),
      onEnd: () => setDragging(false),
      onTap: act,
      onDropOn: act,
      onDropAway: () => {
        playMoment(blipHandle, "sad");
        showToast(`${activeBlip.name || "Blip"} was hoping for that…`, "info");
      },
    });
  }

  /* One feed at a time. Set BEFORE the await, per the double-submit rule:
     two quick drags of the last apple would otherwise both be in flight,
     and the second would come back `none_left` after the first had already
     played the eating moment. */
  let feeding = false;
  async function feedFood(id) {
    if (feeding) return;
    feeding = true;
    try {
      const r = await api.eatFood(sess.username, sess.password, id);
      if (!r || !r.ok) {
        const code = r && r.error;
        if (code === "REFUSES_FOOD") triggerRefuse(roomStage);
        showToast(eatErrMsg(code), "error");
        feeding = false;
        return;
      }
      closeRoomSheet();                       // get out of the way and watch him
      triggerHappy(roomStage);
      playMoment(blipHandle, "eating");
      showToast(`${activeBlip.name || "Blip"} ate the ${foodLabel(id).toLowerCase()}!`, "good");
      // Let the eating moment finish before the re-render replaces the <img>
      // it is animating — without this the whole point of the gesture is a
      // single frame. (Same reason the cookie waits, below.)
      await new Promise((res) => setTimeout(res, momentDurationMs("eating")));
      await app.refresh();
      app.go("blip");
    } catch {
      showToast("Can't reach the server — try again.", "error");
      feeding = false;
    }
  }

  function renderFurniturePanel(container) {
    container.appendChild(el("h2", "", "FURNITURE"));
    container.appendChild(el("div", "furniture-placeholder", "🛋️ New beds, desks and wallpaper are coming in a later update."));
  }

  function renderPanelContent(id, container) {
    if (id === "colours") return renderColoursPanel(container);
    if (id === "shop") return renderShopPanel(container);
    if (id === "food") return renderFoodPanel(container);
    if (id === "pharmacy") return void container.appendChild(pharmacyCard(app, sess, state, health));
    if (id === "furniture") return renderFurniturePanel(container);
    if (id === "inventory") return renderInventoryPanel(container);
  }

  function openPanel(id, cycle) {
    openRoomSheet({
      id,
      renderContent: (body) => renderPanelContent(id, body),
      cycleOrder: cycle ? PANEL_ORDER : null,
      onCycle: (nextId) => openPanel(nextId, true),
    });
  }

  // ---- bottom dock: colours / shop / food / pharmacy / furniture ----
  const dock = el("div", "room-dock");
  const DOCK_BUTTONS = [
    ["colours", "🎨", "Colours"],
    ["shop", "🛍️", "Shop"],
    ["food", "🍽️", "Food"],
    ["pharmacy", "💊", "Pharmacy"],
    ["furniture", "🛋️", "Furniture"],
  ];
  DOCK_BUTTONS.forEach(([id, icon, label]) => {
    const b = el("button", "dock-btn");
    b.type = "button";
    b.innerHTML = `<span class="db-icon">${icon}</span><span class="db-label">${label}</span>`;
    b.setAttribute("aria-label", label);
    b.addEventListener("click", () => openPanel(id, true));
    dock.appendChild(b);
  });
  host.appendChild(dock);
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
