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

/* Must match renderer.js's exported OUTLINE constant. Duplicated as a
   literal (not imported) so this file has zero dependency on
   renderer.js — renderer.js already imports FROM here, and a mutual
   import would be a needless circular edge for one hex string. */
const OUTLINE_HEX = "#2e1b0d";

/* Face landmarks, fractions of the stage box — mirrors the
   measurements documented in renderer.js's ATTACH comment (eyes
   centred at y0.494, x0.300/x0.689; mouth centred 0.494/0.571). The
   body art these sit on doesn't move, so these never need retuning
   unless the base PNG itself is redrawn. */
const EYE_L = { x: 0.300, y: 0.494 };
const EYE_R = { x: 0.689, y: 0.494 };
const MOUTH = { x: 0.494, y: 0.571 };

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
  // full (bedridden/critical, lying down): a taller drape with one
  // soft fold line, sized to cover most of the horizontal body.
  return lapOnly
    ? `<svg viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 14 Q100 -6 196 14 L196 56 Q100 70 4 56 Z" fill="#bcd8f5" stroke="${OUTLINE_HEX}" stroke-width="5" stroke-linejoin="round"/>
      </svg>`
    : `<svg viewBox="0 0 220 130" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 30 Q110 -10 216 30 L216 122 Q110 140 4 122 Z" fill="#bcd8f5" stroke="${OUTLINE_HEX}" stroke-width="5" stroke-linejoin="round"/>
        <path d="M22 46 Q110 68 198 46" fill="none" stroke="${OUTLINE_HEX}" stroke-width="3" opacity="0.35" stroke-linecap="round"/>
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
  const faceOverlays = [
    ...droopy,
    { x: MOUTH.x, y: MOUTH.y + 0.02, anchor: { x: 0.15, y: 1 }, widthPct: 9, tiltDeg: -18, svg: thermometerSvg() },
  ];
  const envOverlays = [
    { x: 0.5, y: 0.62, anchor: { x: 0.5, y: 0.5 }, widthPct: 78, svg: blanketSvg(false) },
  ];
  if (healthStage >= 3) {
    envOverlays.push({ x: 0.87, y: 0.30, anchor: { x: 0.5, y: 0.5 }, widthPct: 24, svg: heartMonitorSvg() });
  }
  return { rotate: true, faceOverlays, envOverlays };
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
