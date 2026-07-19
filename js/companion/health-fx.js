/* ============================================================
   HEALTH-FX — TEMP-until-art code-drawn sick / recovery overlays
   ------------------------------------------------------------
   Stand-ins for the four base-PNG art pieces listed in
   PHASE-2-PLAN.md §6 (tired / bedridden / critical / recovering).
   Once Megan's real art lands at assets/companion/blip-tired.png etc.,
   renderer.js's resolveRawBody() swaps straight to that PNG for the
   matching health state and none of this file runs any more — nothing
   here needs to be deleted, it just goes dormant on its own.

   Style matches the existing accessory library in renderer.js: flat
   matte fills, OUTLINE-weight strokes, no gradients/glow. Storybook-
   sick, never gross — no blood, nothing frightening (PHASE-2-PLAN.md
   ruling, "no death").

   Every overlay entry below has the same shape renderer.js's
   ACCESSORIES entries do (x, y, anchor, widthPct, optional tiltDeg,
   svg) so a single positioning helper (makeFxLayer in renderer.js)
   can mount either kind.
   ============================================================ */

/* Must match renderer.js's exported OUTLINE constant (SL navy). Duplicated
   as a literal (not imported) so this file has zero dependency on
   renderer.js — renderer.js already imports FROM here, and a mutual
   import would be a needless circular edge for one hex string. */
const OUTLINE_HEX = "#0062ac";

/* Face landmarks, fractions of the stage box — RE-MEASURED 2026-07-19 off
   the SL blue base (blip-base-blue.png), where the face sits lower than
   the old cream art (eyes y0.569 x0.302/x0.691; mouth 0.499/0.644 — the
   ATTACH comment in renderer.js documents the same numbers). If the base
   PNG is redrawn again these must be re-measured. */
const EYE_L = { x: 0.302, y: 0.569 };
const EYE_R = { x: 0.691, y: 0.569 };
const MOUTH = { x: 0.499, y: 0.644 };

/* Rotation applied to the body+face-overlay group for the bedridden/
   critical placeholder ("rotate composition to horizontal" per the
   plan). A full 90° overflowed the portrait stage box on a phone-width
   host, so this leans hard rather than lying perfectly flat — reads
   as "in bed" while staying inside the stage. */
export const HEALTH_ROTATE_DEG = -78;

function eyelidSvg(bodyFill) {
  // a flat cap in the BODY's own colour, drawn over the top third of
  // the eye — reads as a droopy half-closed lid without touching the
  // painted pupil underneath.
  return `<svg viewBox="0 0 40 22" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 4 Q20 -3 38 4 L38 13 Q20 19 2 13 Z" fill="${bodyFill}" stroke="${OUTLINE_HEX}" stroke-width="3" stroke-linejoin="round"/>
  </svg>`;
}
function eyeBagSvg(strong) {
  const fill = strong ? "#6b4a3a" : "#8a7458";
  const op = strong ? 0.5 : 0.32;
  return `<svg viewBox="0 0 40 16" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 3 Q20 14 37 3 Q30 10 20 10 Q10 10 3 3 Z" fill="${fill}" opacity="${op}"/>
  </svg>`;
}
function thermometerSvg() {
  return `<svg viewBox="0 0 20 70" xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="4" width="8" height="52" rx="4" fill="#fdfdfd" stroke="${OUTLINE_HEX}" stroke-width="3"/>
    <rect x="8" y="30" width="4" height="22" rx="2" fill="#ff8a7a"/>
    <circle cx="10" cy="60" r="9" fill="#ff8a7a" stroke="${OUTLINE_HEX}" stroke-width="3"/>
  </svg>`;
}
function blanketSvg(lapOnly) {
  // lapOnly (recovering, sitting up): a shallow drape across the lap.
  // full (bedridden/critical): BUGFIX 2026-07-19 — re-drawn wide-and-flat
  // (was a tall dome, viewBox 220x130) for the new upright sick/veryill
  // animation frames. Measured the frown's actual on-canvas position in
  // Megan's hand-drawn sheets (Python+Pillow dark-pixel scan across all
  // 8 sick-*/veryill-* frames): the frown band runs y0.65-0.76 (deepest
  // in sick-3.png), well below where the old code-drawn placeholder's
  // MOUTH constant (y0.644) assumed. A dome sized/centred for that old
  // constant covered the face outright. This shape only needs to read
  // as "covers the lower body", not reach the ground, so it's now a
  // short wide band anchored by its TOP edge (see the two call sites in
  // healthOverlaySpec/animatedHealthOverlaySpec — anchor {x:0.5,y:0},
  // y:0.79) — comfortably below every frame's measured frown bottom.
  // SL restyle: the old light-blue blanket vanished against the blue body,
  // so it's now the violet accent (reads clearly on #62ceff, on-theme).
  return lapOnly
    ? `<svg viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 14 Q100 -6 196 14 L196 56 Q100 70 4 56 Z" fill="#7b5cf6" stroke="${OUTLINE_HEX}" stroke-width="5" stroke-linejoin="round"/>
      </svg>`
    : `<svg viewBox="0 0 300 60" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 22 Q150 -10 294 22 L294 52 Q150 64 6 52 Z" fill="#7b5cf6" stroke="${OUTLINE_HEX}" stroke-width="5" stroke-linejoin="round"/>
        <path d="M26 34 Q150 46 274 34" fill="none" stroke="#b9a9ff" stroke-width="3" opacity="0.5" stroke-linecap="round"/>
      </svg>`;
}
function heartMonitorSvg() {
  return `<svg viewBox="0 0 70 54" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="66" height="50" rx="8" fill="#2e2f38" stroke="${OUTLINE_HEX}" stroke-width="4"/>
    <polyline points="8,30 18,30 24,14 32,42 40,22 46,30 62,30" fill="none" stroke="#5be08a" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>
    <circle cx="60" cy="12" r="3" fill="#5be08a"/>
  </svg>`;
}

/* Returns null when there's nothing to draw (healthy, not recovering),
   else { rotate, faceOverlays, envOverlays }:
     - faceOverlays rotate WITH the body (eye bags, the thermometer in
       his mouth) so they stay correctly placed on the face regardless
       of tilt — mount them inside the same rotated wrapper as the
       body image.
     - envOverlays stay upright regardless of body tilt (the blanket,
       the heart-rate monitor standing beside the bed) — mount them as
       plain stage children.
   `bodyFill` should be renderer.js's bodyFlatColour(colour) so the
   droopy eyelid (drawn in the body's own colour) blends seamlessly on
   any equipped colour. */
export function healthOverlaySpec(healthStage, recovering, bodyFill) {
  if (recovering) {
    return {
      rotate: false,
      faceOverlays: [],
      envOverlays: [
        { x: 0.5, y: 0.80, anchor: { x: 0.5, y: 0.5 }, widthPct: 62, svg: blanketSvg(true) },
      ],
    };
  }
  if (!healthStage || healthStage <= 0) return null;

  const droopy = [
    { x: EYE_L.x, y: EYE_L.y - 0.045, anchor: { x: 0.5, y: 0.3 }, widthPct: 11, svg: eyelidSvg(bodyFill) },
    { x: EYE_R.x, y: EYE_R.y - 0.045, anchor: { x: 0.5, y: 0.3 }, widthPct: 11, svg: eyelidSvg(bodyFill) },
    { x: EYE_L.x, y: EYE_L.y + 0.05, anchor: { x: 0.5, y: 0 }, widthPct: 11, svg: eyeBagSvg(healthStage >= 3) },
    { x: EYE_R.x, y: EYE_R.y + 0.05, anchor: { x: 0.5, y: 0 }, widthPct: 11, svg: eyeBagSvg(healthStage >= 3) },
  ];

  if (healthStage === 1) {
    // Tired: droopy eyes + bags only, no bed, no lock (warning stage).
    return { rotate: false, faceOverlays: droopy, envOverlays: [] };
  }

  // 2 (bedridden) and 3 (critical): lying down + blanket + thermometer;
  // 3 additionally gets the heart-rate monitor (the darker bag variant
  // is already selected above via the healthStage>=3 check).
  // Thermometer stays here (unlike animatedHealthOverlaySpec below) —
  // this placeholder path paints the PLAIN base body with no drawn sick
  // expression of its own, so it still needs the thermometer prop to
  // read as sick; MOUTH.y (0.644) is the right anchor for it here
  // because it's genuinely the plain base body's mouth, not one of
  // Megan's hand-drawn frames (whose frown sits lower — see the
  // blanket's own bugfix comment).
  const faceOverlays = [
    ...droopy,
    { x: MOUTH.x, y: MOUTH.y + 0.02, anchor: { x: 0.15, y: 1 }, widthPct: 9, tiltDeg: -18, svg: thermometerSvg() },
  ];
  // Blanket/monitor geometry BUGFIX 2026-07-19 — see blanketSvg()'s and
  // animatedHealthOverlaySpec()'s comments; kept identical to the live
  // animated path for consistency even though this rotate:true branch
  // is currently unreachable via renderBlip (idleAnimState always picks
  // the sick/veryill sprite loop for healthStage>=2, see renderer.js).
  const envOverlays = [
    { x: 0.5, y: 0.79, anchor: { x: 0.5, y: 0 }, widthPct: 90, svg: blanketSvg(false) },
  ];
  if (healthStage >= 3) {
    envOverlays.push({ x: 0.86, y: 0.20, anchor: { x: 0.5, y: 0.5 }, widthPct: 24, svg: heartMonitorSvg() });
  }
  return { rotate: true, faceOverlays, envOverlays };
}

/* ============================================================
   Animation-era overlay spec (2026-07-19) — for the NEW sick/veryill
   sprite-sheet animation loops (renderer.js's frame-cycler, sliced from
   Megan's hand-drawn sheets). Those frames already draw the droopy/
   closed eyes and eye-bags themselves, so this drops the code-drawn
   eyelid+eyebag placeholder (redundant with the real art now) and keeps
   only the PHYSICAL PROPS a sick Blip still needs regardless of which
   body art is under them: blanket, thermometer, heart monitor. Always
   rotate:false — unlike the old "lying flat" placeholder body, the new
   animated frames are drawn upright (sitting/standing), so there's
   nothing to rotate into a bed composition.
   healthOverlaySpec() above is UNCHANGED and still serves as a graceful
   fallback if a caller ever renders healthStage>=1 without opting into
   animation.
   RECOVERING (2026-07-19, later): her recovering row landed, and she drew
   the blanket INTO those four frames. Recovering is reported while
   healthStage is still 2-3 (local-backend: `recovering: cs >= 1 && stage
   >= 2`), so without this guard the stage-2 blanket below would mount a
   second, code-drawn blanket on top of the drawn one — and at stage 3 a
   heart monitor beside a Blip who is visibly sitting up and smiling. */
export function animatedHealthOverlaySpec(healthStage, recovering) {
  if (recovering) return null; // props are part of the recovering art itself
  if (!healthStage || healthStage < 2) return null; // stage 1 = sleeping loop only, no props
  // BUGFIX 2026-07-19 (Megan's phone review — "featureless triangle
  // poking out of a purple blob"): the old blanket (y0.62 centre,
  // widthPct 78, tall dome) covered from mid-chest to well past the
  // chin, burying the sick face the new frames draw as the centrepiece.
  // Re-measured the frown's actual position across all 8 sick-*/
  // veryill-*.png frames (Python+Pillow dark-pixel row scan): deepest
  // extent is y0.65-0.76 (sick-3.png), not the base body's plain-face
  // MOUTH constant (y0.644) the old numbers were built around. New
  // blanket is anchored by its TOP edge at y0.79 — clears every frame's
  // measured frown with margin — and re-drawn wide-and-flat (blanketSvg)
  // so it still reads as wrapping the lower body instead of a thin
  // strip. Thermometer DROPPED per the brief ("the drawn frames already
  // read sick" — the old mouth-level prop was calibrated to the base
  // body's y0.644 mouth and would sit mid-frown on the real art anyway).
  // Monitor moved up from y0.30 to y0.20 — verified via a Pillow
  // silhouette-overlap check that the old box's LOWER edge (body widens
  // fast through y0.30) clipped into the body; y0.20's box clears the
  // silhouette at every row with margin.
  const envOverlays = [
    { x: 0.5, y: 0.79, anchor: { x: 0.5, y: 0 }, widthPct: 90, svg: blanketSvg(false) },
  ];
  if (healthStage >= 3) {
    envOverlays.push({ x: 0.86, y: 0.20, anchor: { x: 0.5, y: 0.5 }, widthPct: 24, svg: heartMonitorSvg() });
  }
  return { rotate: false, faceOverlays: [], envOverlays };
}

/* Short mood string for the UI (e.g. a caption under the hub tile). */
export function blipMood(healthStage, recovering) {
  if (recovering) return "Recovering — needs a few more care days";
  switch (healthStage) {
    case 1: return "A little tired";
    case 2: return "Poorly — resting in bed";
    case 3: return "Very sick — needs medicine";
    default: return "Happy and healthy";
  }
}
