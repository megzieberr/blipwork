/* ============================================================
   PUSH REMINDERS (client side) — Blipwork
   ------------------------------------------------------------
   Asks the learner for permission, subscribes THIS DEVICE to push,
   and stores the subscription through the password-checked RPC
   (api.pushSubscribe). sw.js shows the notification when it arrives;
   supabase/functions/send-push decides who gets one and when.

   Ported from Circle Quest's js/push.js (2026-07-19). Two deliberate
   differences:
     • the card is a Blip-flavoured opt-in ("remind me when he's
       hungry"), rendered on the BLIP screen next to the feed button
       rather than on the hub — that is where the emotional context is;
     • it renders itself (maybeShowReminderCard) in the same
       conditional-render idiom as js/install.js, so the caller is a
       one-liner that can never throw into the screen render.

   iPhone note: PushManager only exists once the app has been ADDED TO
   THE HOME SCREEN and opened from that icon — so pushSupported() is
   naturally false in a plain Safari tab and the card hides itself.
   That is correct behaviour, not a bug: there is nothing useful to
   offer an iOS learner who hasn't installed yet (install.js already
   nags about that).

   The whole feature is DORMANT while VAPID_PUBLIC_KEY is empty. That
   is how it ships — see PUSH-SETUP.md.
   ============================================================ */
import { VAPID_PUBLIC_KEY } from "./push-config.js";
import { api } from "./api.js";
import { getSession } from "./session.js";
import { el, showToast } from "./ui.js";

const DISMISS_KEY = "mhq.pushDismissed";

export function pushSupported() {
  return "serviceWorker" in navigator && "PushManager" in window && "Notification" in window;
}

export function pushConfigured() { return !!VAPID_PUBLIC_KEY; }

/* Installed PWA, or a plain browser tab? Only used for the iOS hint —
   subscribing itself is gated by pushSupported() above. */
export function isStandalone() {
  return (window.matchMedia && window.matchMedia("(display-mode: standalone)").matches)
    || window.navigator.standalone === true;   // iOS Safari's own flag
}

/* VAPID public keys are base64url TEXT; the browser wants raw bytes. */
function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const raw = atob(base64);
  const out = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i++) out[i] = raw.charCodeAt(i);
  return out;
}

/* 'unsupported' | 'unconfigured' | 'blocked' | 'on' | 'off' */
export async function pushState() {
  if (!pushSupported()) return "unsupported";
  if (!pushConfigured()) return "unconfigured";
  if (Notification.permission === "denied") return "blocked";
  if (Notification.permission !== "granted") return "off";
  try {
    const reg = await navigator.serviceWorker.ready;
    return (await reg.pushManager.getSubscription()) ? "on" : "off";
  } catch { return "off"; }
}

/* Ask permission, subscribe this device, save it against the learner.
   Returns { ok:true } or { ok:false, reason }. Never throws. */
export async function enablePush(username, password) {
  if (!pushSupported()) return { ok: false, reason: "unsupported" };
  if (!pushConfigured()) return { ok: false, reason: "unconfigured" };

  const permission = await Notification.requestPermission();
  if (permission !== "granted") return { ok: false, reason: permission };  // 'denied' | 'default'

  try {
    const reg = await navigator.serviceWorker.ready;
    let sub = await reg.pushManager.getSubscription();
    if (!sub) {
      sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
      });
    }
    /* sub.toJSON() is the {endpoint, keys:{p256dh, auth}} shape the
       server's web-push library expects — the PushSubscription object
       itself does not survive JSON.stringify with its keys intact. */
    const r = await api.pushSubscribe(username, password, sub.toJSON());
    if (!r || !r.ok) return { ok: false, reason: (r && r.error) || "save-failed" };
    return { ok: true };
  } catch {
    /* Offline, or the browser refused the subscribe (an old service
       worker registered with a DIFFERENT VAPID key is the classic
       cause — see the troubleshooting section of PUSH-SETUP.md). */
    return { ok: false, reason: "error" };
  }
}

/* Turn reminders off for this device: unsubscribe locally AND forget
   the endpoint server-side, so the daily job stops aiming at a dead
   device. Local unsubscribe first — if the network call fails the
   learner still gets what she asked for, and send-push prunes the
   orphan endpoint on its next 404/410. */
export async function disablePush(username, password) {
  try {
    const reg = await navigator.serviceWorker.ready;
    const sub = await reg.pushManager.getSubscription();
    if (sub) {
      const endpoint = sub.endpoint;
      await sub.unsubscribe();
      try { await api.pushUnsubscribe(username, password, endpoint); } catch { /* best-effort */ }
    }
    return { ok: true };
  } catch { return { ok: false, reason: "error" }; }
}

/* ------------------------------------------------------------------
   THE CARD
   ------------------------------------------------------------------
   Same contract as install.js's maybeShowInstall(host): call it, it
   either appends a card or it doesn't, and it never throws.

   One structural difference: deciding WHICH card to show needs an
   await (pushManager.getSubscription()). Rather than make every
   caller async, we append an empty hidden shell synchronously — so it
   keeps its place in the screen's flow — and reveal it once the state
   is known. If there is nothing to show, the shell removes itself and
   the learner never sees a flicker.
   ------------------------------------------------------------------ */
export function maybeShowReminderCard(hostEl) {
  if (!hostEl) return null;
  /* Cheap synchronous bail-outs first: dormant build, no push in this
     browser (incl. an un-installed iPhone), or nobody logged in. */
  if (!pushConfigured() || !pushSupported()) return null;
  const sess = getSession();
  if (!sess || !sess.username) return null;

  const card = el("div", "push-card card");
  card.hidden = true;
  hostEl.appendChild(card);
  refresh();
  return card;

  async function refresh() {
    let state;
    try { state = await pushState(); } catch { state = "off"; }

    if (state === "unsupported" || state === "unconfigured") { card.remove(); return; }

    /* 'blocked' = the learner (or a parent) said Block at the browser
       prompt. We CANNOT re-ask — only phone settings can undo it — so
       show a quiet one-liner instead of a button that would do nothing
       when tapped. Silence would be worse: she'd wonder why reminders
       never arrive. */
    if (state === "blocked") {
      card.innerHTML = `
        <div class="push-ico">🔕</div>
        <div class="push-body">
          <b>Reminders are blocked</b>
          <p class="muted small">Your phone is blocking notifications for Blipwork. You can switch them back on in your browser or phone settings.</p>
        </div>`;
      card.hidden = false;
      return;
    }

    if (state === "on") { renderOn(); return; }

    /* 'off' — the offer. Dismissable, and the dismissal sticks, because
       a permanent "turn this on" card on the screen she visits every
       day is nagging by another name. The quiet ON state below is NOT
       dismissable: that one is the off-switch. */
    try { if (localStorage.getItem(DISMISS_KEY) === "1") { card.remove(); return; } } catch {}
    renderOff();
  }

  function renderOff() {
    card.classList.remove("is-on");
    card.innerHTML = `
      <button class="push-x" aria-label="Dismiss">✕</button>
      <div class="push-ico">🔔</div>
      <div class="push-body">
        <b>Get a nudge when Blip's hungry</b>
        <p class="muted small">One gentle reminder on the days he starts going hungry. Never more than one a day.</p>
      </div>
      <div class="push-foot"></div>`;
    card.hidden = false;
    card.querySelector(".push-x").addEventListener("click", () => {
      try { localStorage.setItem(DISMISS_KEY, "1"); } catch {}
      card.remove();
    });

    const btn = el("button", "btn primary small", "Turn on");
    btn.addEventListener("click", async () => {
      btn.disabled = true;
      btn.textContent = "…";
      const r = await enablePush(sess.username, sess.password);
      if (r.ok) {
        /* Clear any old dismissal: she's opted in, so if she ever turns
           it off again she should get the offer back, not silence. */
        try { localStorage.removeItem(DISMISS_KEY); } catch {}
        showToast("Reminders on — Blip will let you know 🔔", "good");
        renderOn();
      } else {
        btn.disabled = false;
        btn.textContent = "Turn on";
        showToast(reasonText(r.reason), "error");
      }
    });
    card.querySelector(".push-foot").appendChild(btn);
  }

  function renderOn() {
    card.classList.add("is-on");
    card.innerHTML = `
      <div class="push-ico">🔔</div>
      <div class="push-body">
        <b>Reminders on</b>
        <p class="muted small">Blip will send a quiet nudge on the days he's peckish.</p>
      </div>
      <div class="push-foot"></div>`;
    card.hidden = false;

    const btn = el("button", "btn ghost small", "Turn off");
    btn.addEventListener("click", async () => {
      btn.disabled = true;
      btn.textContent = "…";
      const r = await disablePush(sess.username, sess.password);
      if (r.ok) {
        showToast("Reminders off", "info");
        renderOff();
      } else {
        btn.disabled = false;
        btn.textContent = "Turn off";
        showToast("Couldn't turn reminders off — try again in a moment.", "error");
      }
    });
    card.querySelector(".push-foot").appendChild(btn);
  }
}

/* Plain-English failure messages — never fail silently on an opt-in
   (same ruling as the shop/equip toasts in ui.js). */
function reasonText(reason) {
  if (reason === "denied") return "Notifications are blocked — you can allow them in your phone settings.";
  if (reason === "default") return "No problem — you can turn reminders on any time.";
  if (reason === "unsupported") return "This browser can't do reminders. On iPhone, add Blipwork to your home screen first.";
  if (reason === "unconfigured") return "Reminders aren't switched on for this app yet.";
  return "Couldn't turn reminders on just now — check your internet and try again.";
}
