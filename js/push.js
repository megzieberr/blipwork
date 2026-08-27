/* ============================================================
   PUSH REMINDERS (client side) — Blipwork
   ------------------------------------------------------------
   Asks the learner for permission, subscribes THIS DEVICE to push,
   and stores the subscription through the password-checked RPC
   (api.pushSubscribe). sw.js shows the notification when it arrives;
   supabase/functions/send-push decides who gets one and when.

   Ported from Circle Quest's js/push.js (2026-07-19). Two deliberate
   differences:
     • the card is a Blip-flavoured opt-in, rendered on the BLIP screen
       next to the feed button rather than on the hub — that is where
       the emotional context is. ⚠️ Since 2026-08-27 this ONE switch also
       controls homework notifications, so its wording says both things
       out loud: an opt-in that under-promises is still a lie, and a
       child who tapped "remind me about Blip" and then got buzzed about
       maths would be right to feel tricked. If a third kind of
       notification is ever added, this copy changes with it;
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
export function maybeShowReminderCard(hostEl, onChange) {
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

    /* ⭐ THE CARD IS NOW ONLY THE OFFER (her ruling 2026-08-27, seeing the
       ON state on her phone: "can we also maybe move this massive reminders
       banner to a small icon next to the question mark?").

       'on' and 'blocked' are STATUSES, and a status does not need a card —
       both are now the 🔔 bell in the room header (mountReminderBell below).
       'off' keeps the card, deliberately: that state is not a status, it is
       an INVITATION, and an invitation shrunk to an unlabelled icon is one
       no child will ever accept. */
    if (state === "on" || state === "blocked") { card.remove(); return; }

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
        <b>Get a nudge from Blipwork</b>
        <p class="muted small">When new homework goes up, and on the days Blip starts going hungry. Never more than one a day.</p>
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
        /* re-render rather than repaint in place: the card's job is done and
           the header bell is what represents the ON state now. */
        if (typeof onChange === "function") onChange(); else card.remove();
      } else {
        btn.disabled = false;
        btn.textContent = "Turn on";
        showToast(reasonText(r.reason), "error");
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

/* ------------------------------------------------------------------
   THE HEADER BELL  (her ruling, 2026-08-27)
   ------------------------------------------------------------------
   "can we also maybe move this massive reminders banner to a small icon
   next to the question mark?"

   Once reminders are ON, the card was a paragraph of text whose only
   function was an off-switch — a whole banner, every visit, in the room
   she opens most. This replaces it with one icon in the room header,
   beside ❓ and 👥.

   Only ever shows for a state the learner cannot mistake:
     on      🔔  tap → confirm → off
     blocked 🔕  tap → explain (we cannot re-ask; only phone settings can)
     off         nothing — maybeShowReminderCard's offer does that job,
                 because an invitation must not be an unlabelled icon.

   Same never-throws contract as maybeShowReminderCard: call it, it
   either appends a button or it doesn't. `onChange` re-renders the
   screen so the card and the bell swap cleanly — without it, turning
   reminders off from the bell would leave the learner with no visible
   way back on until they navigated away and returned.
   ------------------------------------------------------------------ */
export function mountReminderBell(hostEl, onChange) {
  if (!hostEl) return null;
  if (!pushConfigured() || !pushSupported()) return null;
  const sess = getSession();
  if (!sess || !sess.username) return null;

  const btn = el("button", "link-btn push-bell");
  btn.type = "button";
  btn.hidden = true;                       // no flicker while we await the state
  hostEl.appendChild(btn);
  refresh();
  return btn;

  async function refresh() {
    let state;
    try { state = await pushState(); } catch { state = "off"; }
    if (state === "on") return paintOn();
    if (state === "blocked") return paintBlocked();
    btn.remove();                          // 'off' / unsupported — the card's job
  }

  function paintOn() {
    btn.textContent = "🔔";
    btn.classList.add("is-on");
    btn.title = "Reminders are on — tap to turn them off";
    btn.setAttribute("aria-label", "Reminders are on. Tap to turn them off.");
    btn.hidden = false;
    btn.onclick = async () => {
      /* Confirm, because this is the only control and it is one tap from
         a curious thumb. Losing reminders silently would be a bad way to
         find out you have stopped hearing about homework. */
      if (!confirm("Turn reminders off?\n\nYou won't hear about new homework, or when Blip gets hungry.")) return;
      btn.disabled = true;
      const r = await disablePush(sess.username, sess.password);
      btn.disabled = false;
      if (!r.ok) { showToast("Couldn't turn reminders off — try again in a moment.", "error"); return; }
      showToast("Reminders off", "info");
      if (typeof onChange === "function") onChange(); else refresh();
    };
  }

  function paintBlocked() {
    btn.textContent = "🔕";
    btn.title = "Notifications are blocked for Blipwork";
    btn.setAttribute("aria-label", "Notifications are blocked. Tap to find out why.");
    btn.hidden = false;
    btn.onclick = () => showToast(
      "Your phone is blocking Blipwork's notifications. Turn them back on in your phone or browser settings.", "info");
  }
}
