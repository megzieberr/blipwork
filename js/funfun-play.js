/* ============================================================
   FUN FUNCTIONS PLAY — one graph-quest quest, mounted inside blipwork
   (FUNFUN-PART2-BRIEF.md, session 2, 2026-08-23)
   ------------------------------------------------------------
   Fun Functions is its own app (the graph-quest repo, also live
   standalone). js/funfun/ is a SYNCED COPY of it — generated output,
   never hand-edited (see js/funfun/GENERATED.md). This file is the
   whole blipwork side of the seam:

     · funfunShadow(hostEl)   the isolation (brief D1). 60 class names
                              collide between the two apps (.view .card
                              .opt .btn .qn .muted .toast .fg-* .keypad …),
                              so Fun Functions is given a SHADOW ROOT of
                              its own and its stylesheet is linked INSIDE
                              that root. Neither app's CSS can reach the
                              other's DOM. Exported because verify-funfun.html
                              mounts exactly the way this screen does — one
                              shadow setup, not two that can drift.
     · renderFunfunPlay()     the "funfunPlay" route: a slim top bar and
                              the shadow host, no blipwork chrome (same
                              posture as the "play" screen).
     · destroyFunfunMount()   called from app.js's go(), the one choke
                              point every navigation runs through — so
                              back, finish and logout ALL tear the mount
                              down and a second mount can never start
                              while one is still alive.

   The learner is blipwork's: the host object's profile/saveResult/markMet
   go straight to js/api.js's funfun* wrappers, which are the RPCs in
   supabase/migration-funfun.sql (mirrored offline in js/local-backend.js).
   saveResult NEVER names an XP amount — it hands over the per-item
   outcomes and the server recomputes (the dice's rule, brief D2).
   ============================================================ */
import { mountFunFunctions } from "./funfun/mount.js";
import { getQuest } from "./funfun/quests/index.js";
import { L, setLang } from "./funfun/i18n.js";
import { api } from "./api.js";
import { getSession } from "./session.js";
import { el, showToast } from "./ui.js";

/* Seam fact (a) from the Part-1 review: graph-quest's own sheet carries
   `.ff-root .view{min-height:100vh}` because standalone it OWNS the page.
   Mounted, that would stretch the box to a full phone height under
   blipwork's own top bar. One override, inside the shadow root, so the
   synced file itself stays byte-identical to its source. */
const HOST_OVERRIDES = `.ff-root .view { min-height: 0; padding-bottom: 28px; }
/* Foreman review fix 2026-08-23: the mount draws its own "‹ Map" link, but
   inside blipwork there IS no map and the play screen's own ‹ bar already
   walks out through the same teardown. Hidden host-side rather than changing
   generated js/funfun/ output (the standalone keeps its link untouched). */
.ff-root .back-btn { display: none; }`;

/* the synced stylesheet, resolved off THIS module's own URL so the page
   that imports it may live anywhere (index.html and verify-funfun.html
   both sit at the repo root today, but nothing here depends on that) */
const FF_STYLES = new URL("./funfun/styles.css", import.meta.url).href;

/* Build the isolation box inside `hostEl` and return the element the
   mount should be handed. `ready` resolves once the stylesheet has
   actually loaded — the harness awaits it before measuring anything,
   and the play screen awaits it so the first paint is already styled.
   Re-callable on the same element: attachShadow() throws on a second
   call, so an existing root is reused and emptied. */
export function funfunShadow(hostEl) {
  const shadow = hostEl.shadowRoot || hostEl.attachShadow({ mode: "open" });
  while (shadow.firstChild) shadow.removeChild(shadow.firstChild);

  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = FF_STYLES;
  const ready = new Promise((resolve) => {
    link.addEventListener("load", resolve, { once: true });
    /* a missing sheet must not hang the screen forever — the mount still
       works, it just looks wrong, and that is visible immediately */
    link.addEventListener("error", resolve, { once: true });
  });

  const overrides = document.createElement("style");
  overrides.textContent = HOST_OVERRIDES;

  const rootEl = document.createElement("div");
  shadow.appendChild(link);
  shadow.appendChild(overrides);
  shadow.appendChild(rootEl);
  return { shadow, rootEl, ready };
}

/* ---------------- the live mount ----------------
   Module-level on purpose: exactly one Fun Functions quest may be alive
   at a time, and app.js's go() tears it down on EVERY navigation. */
let ACTIVE = null;

export function destroyFunfunMount() {
  if (!ACTIVE) return;
  const handle = ACTIVE;
  ACTIVE = null;                       // cleared FIRST — destroy() must never re-enter
  try { handle.destroy(); } catch (e) { console.warn("funfun destroy failed", e); }
}

/* ---------------- the screen ---------------- */
export function renderFunfunPlay(app, host, params) {
  const { chapter, questId } = params || {};
  const q = getQuest(questId);
  const sess = getSession();
  const toChapter = () => app.go("chapter", { chapterId: chapter && chapter.id });

  if (!q || !chapter || !sess) { toChapter(); return; }

  /* whatever was alive is not this — a stale handle here would mean two
     live mounts, which is the one thing D8 forbids outright */
  destroyFunfunMount();

  const accent = q.accent || chapter.signature;
  const screen = el("div", "ff-play");
  screen.style.setProperty("--accent", accent);

  /* the mount sets the language itself, but only once mountFunFunctions runs
     — and the top bar's title is read BEFORE that. Fun Functions defaults to
     Afrikaans from a localStorage key it shares with its standalone on this
     same origin, so set English for this read too (persist:false, never
     written back — brief D6). */
  setLang("en", { persist: false });
  const topbar = el("div", "ff-play-top");     // NOT `top`: a global by that name shadows window.top
  topbar.innerHTML = `<button class="link-btn ff-back" aria-label="Back">‹</button>
    <div class="ptitle">${L(q.title)}</div>`;
  const back = topbar.querySelector(".ff-back");
  let leaving = false;
  back.addEventListener("click", () => {
    /* her double-submit rule: flag and disable BEFORE anything async */
    if (leaving) return;
    leaving = true;
    back.disabled = true;
    toChapter();
  });
  screen.appendChild(topbar);

  const hostEl = el("div", "ff-host");
  screen.appendChild(hostEl);
  host.appendChild(screen);

  const { rootEl, ready } = funfunShadow(hostEl);
  const u = sess.username, p = sess.password;

  /* the submit payload from THIS play — kept here rather than read back
     off the profile, so a results card can show the real payout even if
     the follow-up profile fetch is the thing that failed */
  let submitted = null;
  let saveFailed = false;

  const mountHost = {
    questId,
    /* brief D6 — blipwork is English and IEB Grade 11: no semicircles,
       and Fun Functions' own AF/EN toggle is never shown (mounted mode
       does not draw the chrome that carries it) */
    lang: "en",
    semicircles: false,

    async profile() {
      const r = await api.funfunState(u, p);
      if (!r || !r.ok) throw new Error("funfunState failed");
      return r;
    },

    /* score/xp are handed over by the mount and DELIBERATELY dropped:
       only `answered` crosses the wire, and the server recomputes both
       (brief D2 — the dice's "the client never names an amount" rule) */
    async saveResult(qid, _score, _total, _xp, answered) {
      const res = await api.funfunSubmit(u, p, qid, answered);
      if (!res || !res.ok) { saveFailed = true; throw new Error((res && res.error) || "funfunSubmit failed"); }
      submitted = res;
      const fresh = await api.funfunState(u, p);
      return (fresh && fresh.ok) ? fresh : { xp: res.xp, quests: {}, met: {} };
    },

    async markMet(qid, skillId) {
      const r = await api.funfunMet(u, p, qid, skillId);
      if (!r || !r.ok) throw new Error("funfunMet failed");
      return r;
    },

    onFinished: (res) => {
      /* async body, deliberately not awaited by the mount: mount.js calls
         this AFTER saveResult has settled and after play.js has already
         dropped its session (S = null), so navigating away — which
         destroys this very mount — is safe from here. */
      (async () => {
        if (saveFailed) showToast("Couldn’t save this round — check your connection.", "error");
        await app.refresh();
        const ok = !!submitted;
        app.go("results", {
          funfun: true, chapter, accent, questId,
          correct: ok ? submitted.correct : res.score,
          total: ok ? submitted.total : res.total,
          ok,
          xpAwarded: ok ? submitted.xpAwarded : 0,
          goldAwarded: ok ? submitted.goldAwarded : 0,
          levelUp: !!(ok && submitted.levelUp),
          level: (ok && submitted.levelInfo && submitted.levelInfo.level) || null,
        });
      })();
    },

    onExit: () => { if (!leaving) { leaving = true; toChapter(); } },
    /* seam fact (c): the mount never touches the host's scroll unless asked */
    onScrollTop: () => window.scrollTo(0, 0),
  };

  /* mount as soon as the sheet is in — the DOM the mount builds is the
     first thing the learner sees, and an unstyled flash of a graph screen
     at 375px is worse than a beat of nothing */
  ready.then(() => {
    if (!hostEl.isConnected) return;             // walked out during the load
    ACTIVE = mountFunFunctions(rootEl, mountHost);
  });
}
