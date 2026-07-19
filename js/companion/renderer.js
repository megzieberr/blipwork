/* ============================================================
   COMPANION RENDERER — "Blip" (proof piece for the companion rebrand)
   ------------------------------------------------------------
   Composites code-drawn SVG accessories onto the fixed Blip base-body
   PNG. Pure ES module, no build step — matches the app's plain-JS idiom
   (see js/ui.js, js/engine/*.js).

   renderCompanion(el, state) mounts a full character into `el`:
     state = {
       colour?: one of the COLOURS keys below (default "blue" — the SL art),
       accessories?: array of accessory ids from ACCESSORIES (any order —
                     each accessory carries its own slot/z-order)
     }
   Returns { el, stage, layers, colour, accessories } for inspection/tests.

   PHASE 2 — renderBlip(el, opts), near the bottom of this file, is the
   growth/health-aware entry point added for feeding & sickness
   (PHASE-2-PLAN.md). It wraps renderCompanion (still the base
   compositor) and layers on: a growth-stage size scale, health-stage
   art (swapping to a dedicated sick/baby PNG once Megan draws one, or
   a code-drawn placeholder from health-fx.js until then), and the
   "he won't get up" dress-up lock. renderCompanion itself is
   unchanged and every existing call site (blip.js, gallery.js,
   screens.js, unlock-modal.js) keeps working exactly as before.

   Layer stack (back → front), per spec:
     wings (behind body) → body PNG → ears → glasses → hat → arms
   Attachment points (ATTACH, below) are fractions (0..1) of the stage box,
   so accessories stay correctly placed at any container size — the stage
   is a position:relative box sized by CSS (aspect-ratio locked to the art),
   and every layer is positioned with % left/top + a % transform anchor,
   never px.

   COLOUR SYSTEM: the base PNG is recoloured on an offscreen canvas.
   Every bright body pixel gets the target HUE with saturation scaled
   relative to the body blue's (so the paler gloss highlight stays paler
   in the new colour) while keeping its own brightness (V); the dark navy
   outline + navy eyes are untouched, with a smoothstep blend at the
   boundary instead of a hard cutoff — a hard classify-or-skip would leave
   the source art's anti-alias fringe as speckles around the strokes.
   Results are cached per colour id (as data-URLs) so repeated renders/
   tests never reprocess a colour twice.
   ============================================================ */
import { healthOverlaySpec, animatedHealthOverlaySpec, blipMood as _blipMood, HEALTH_ROTATE_DEG } from "./health-fx.js";
export { blipMood } from "./health-fx.js";

/* SL restyle 2026-07-19: base body swapped from the cream art to Megan's
   dark-Solo-Leveling blue art (assets/companion/blip-base-blue.png,
   extracted from "SL Blip Design.png"). The old cream PNG is kept on disk
   at assets/companion/blip-base.png as history/fallback but nothing points
   at it any more. Her blue body is used as-is (house rule — never redraw
   her character); accessories below are still code-drawn SVG. */
const BASE_SRC = "assets/companion/blip-base-blue.png";

/* Natural size of the SL blue base canvas (480x600, aspect-ratio 4:5 —
   unchanged from the cream base so the stage box, all ATTACH fractions,
   and every host CSS width keep working). Used only for the offscreen
   recolour canvas — on-page sizing is all %. */
const BASE_W = 480, BASE_H = 600;

/* ---------- Phase 2: growth/health base-image variants ----------
   All optional. Until Megan draws them, every one of these 404s and
   resolveRawBody() below falls back to BASE_SRC (grown/healthy) or,
   for growth, to the plain base at a smaller scale. Filenames are the
   contract with her art — see PHASE-2-PLAN.md §6. */
const IMAGE_SOURCES = {
  base: BASE_SRC,
  baby: "assets/companion/blip-baby.png",
  tired: "assets/companion/blip-tired.png",
  bedridden: "assets/companion/blip-bedridden.png",
  critical: "assets/companion/blip-critical.png",
  recovering: "assets/companion/blip-recovering.png",
};

/* Sampled directly from Megan's SL blue art (SL Blip Design.png): the
   navy outline/eye stroke, and the flat electric-blue body fill it's drawn
   over. The whole character is now monochromatic navy-on-blue, so this
   navy doubles as the shared accessory outline (matches her art's stroke
   weight — the SL restyle brief calls for exactly this hex on the
   code-drawn accessories too). */
export const OUTLINE = "#0062ac";
const BASE_BODY = "#62ceff";

/* ---------- colour presets ----------
   "blue" is the untouched original SL art (no canvas work — it's the base
   PNG's own colour) and the DEFAULT (slot-1 blips hatch blue; the server &
   local backend agree on the id "blue"). Every other preset is a target
   hex: recolouring derives that hex's hue+saturation and keeps each source
   pixel's own brightness, so one code path serves all recolours. NOTE
   "cream" is now a real recolour target (the base is no longer cream), so
   the old cream look is still reachable as a chosen colour. */
export const COLOURS = {
  blue: null,
  cream: "#fddb93",
  pink: "#ffc2d6",
  mint: "#bff7e0",
  sky: "#c0e4fb",
  lilac: "#e4cffb",
  peach: "#ffd2b0",
  lemon: "#fff3ae",
  seafoam: "#a9e8de",
  coral: "#ffb4a0",
  lavender: "#cdbffa",
};

/* ---------- attachment points ----------
   Fractions of the stage box (480x600, mirrors the full base canvas, not
   just the drawn blob's tighter bbox). RE-MEASURED 2026-07-19 off the SL
   blue base (blip-base-blue.png), where the face sits LOWER than the old
   cream art: eyes centred at y0.569 (x0.302 / x0.691), mouth centred
   (0.499, 0.644). (Old cream numbers were y0.494 eyes / 0.571 mouth — the
   blue body is squatter and bottom-aligned, so everything face-and-below
   shifted down ~0.075.) Body opaque bbox x0.023–0.975 / y0.155–0.880.
   Silhouette left edge by row (frac): x0.333@y0.25, x0.260@y0.30,
   x0.138@y0.40, x0.058@y0.50, x0.025@y0.60–0.68, x0.052@y0.75, x0.123@y0.82.

   PLACEMENT RULING — per-accessory (Megan's phone review 2026-07-19,
   carried over to the SL body):
   - hat, wings, glasses: FLOATY BY DESIGN — they hover clear of the
     body outline with visible gaps; she finds these cute as-is. (glasses
     still sit over the eyes — "floaty" here just means not force-welded.)
     Don't "fix" them by pulling them in to touch the outline.
   - ears, arms: ATTACHED BY DESIGN — they must visibly overlap the
     body outline (ears from the sloping upper sides, arm shoulders merge
     into the lower sides). Don't float them.
   An accessory may override its slot's point with its own `attach`
   (headphones and halo do — see ACCESSORIES) without disturbing the
   others sharing that slot.
   Single point = one centred accessory (hat, glasses).
   [left, right] pair = a symmetric accessory mirrored to both sides
   (ears, wings, arms). */
export const ATTACH = {
  hat: { x: 0.5, y: 0.10 },
  glasses: { x: 0.5, y: 0.569 }, // eye level on the blue base
  ears: [
    { x: 0.315, y: 0.255 }, // base straddles the upper-side outline (edge x≈0.30 here)
    { x: 0.685, y: 0.255 },
  ],
  wings: [
    { x: 0.05, y: 0.55 },
    { x: 0.95, y: 0.55 },
  ],
  arms: [
    { x: 0.115, y: 0.70 }, // shoulder buried inside the lower-side outline (edge x≈0.025 here); hand pokes out below
    { x: 0.885, y: 0.70 },
  ],
};

const SLOT_ORDER = ["wings", "ears", "glasses", "hat", "arms"]; // paint order relative to the body, which is inserted between "wings" and "ears"

/* ---------- accessory library ----------
   Each accessory is a self-contained inline SVG in its own local viewBox,
   flat matte fills, OUTLINE-weight strokes, no gradients/glow. `anchor` is
   the fraction *within the accessory's own box* that lands on the
   attachment point (e.g. a hat anchors by its bottom-centre). `widthPct`
   sizes it as a percentage of the stage width. Paired slots (ears/wings/
   arms) are drawn once here and mirrored (scaleX(-1)) for the second side —
   every paired SVG below is itself left-right symmetric so the mirror is a
   clean flip, no repositioning needed. */
export const ACCESSORIES = {
  "party-hat": {
    slot: "hat",
    widthPct: 26,
    anchor: { x: 0.5, y: 0.92 },
    svg: `<svg viewBox="0 0 100 118" xmlns="http://www.w3.org/2000/svg">
      <defs><clipPath id="blip-hat-cone-{{UID}}"><path d="M50 5 L79 96 L21 96 Z"/></clipPath></defs>
      <path d="M50 5 L79 96 L21 96 Z" fill="#fce7a6"/>
      <g clip-path="url(#blip-hat-cone-{{UID}})">
        <rect x="-15" y="14" width="140" height="17" fill="#ff9e92" transform="rotate(-10 50 50)"/>
        <rect x="-15" y="43" width="140" height="19" fill="#8fcbf2" transform="rotate(-10 50 50)"/>
        <rect x="-15" y="73" width="140" height="17" fill="#ff9e92" transform="rotate(-10 50 50)"/>
      </g>
      <path d="M14 91 Q50 108 86 91 L86 98 Q50 116 14 98 Z" fill="#fce7a6" stroke="${OUTLINE}" stroke-width="5" stroke-linejoin="round"/>
      <path d="M50 5 L79 96 L21 96 Z" fill="none" stroke="${OUTLINE}" stroke-width="5" stroke-linejoin="round" stroke-linecap="round"/>
    </svg>`,
  },
  "cat-ears": {
    slot: "ears",
    widthPct: 17,
    anchor: { x: 0.5, y: 0.86 },
    tiltDeg: -25, // lean the ear outward along the sloping outline (mirrored side flips automatically)
    svg: `<svg viewBox="0 0 60 70" xmlns="http://www.w3.org/2000/svg">
      <path d="M30 4 C10 20 4 46 10 64 C16 60 22 56 30 56 C38 56 44 60 50 64 C56 46 50 20 30 4 Z" fill="var(--blip-fill, ${BASE_BODY})" stroke="${OUTLINE}" stroke-width="5" stroke-linejoin="round"/>
      <path d="M30 20 C20 30 17 44 20 54 C24 51 27 49 30 49 C33 49 36 51 40 54 C43 44 40 30 30 20 Z" fill="#ffb6c9"/>
    </svg>`,
  },
  "round-glasses": {
    slot: "glasses",
    widthPct: 44,
    anchor: { x: 0.5, y: 0.5 },
    svg: `<svg viewBox="0 0 200 90" xmlns="http://www.w3.org/2000/svg">
      <line x1="86" y1="40" x2="114" y2="40" stroke="${OUTLINE}" stroke-width="6"/>
      <line x1="10" y1="34" x2="26" y2="30" stroke="${OUTLINE}" stroke-width="6" stroke-linecap="round"/>
      <line x1="190" y1="34" x2="174" y2="30" stroke="${OUTLINE}" stroke-width="6" stroke-linecap="round"/>
      <circle cx="55" cy="45" r="38" fill="rgba(255,255,255,0.35)" stroke="${OUTLINE}" stroke-width="6"/>
      <circle cx="145" cy="45" r="38" fill="rgba(255,255,255,0.35)" stroke="${OUTLINE}" stroke-width="6"/>
    </svg>`,
  },
  "angel-wings": {
    slot: "wings",
    widthPct: 32,
    anchor: { x: 0.82, y: 0.28 },
    svg: `<svg viewBox="0 0 100 140" xmlns="http://www.w3.org/2000/svg">
      <path d="M92 20 C70 10 40 20 22 46 C40 42 52 46 58 56 C38 58 24 70 16 92 C34 84 48 84 56 90 C40 98 30 112 26 132 C46 122 64 108 74 90 C82 68 88 44 92 20 Z"
        fill="#fff7e8" stroke="${OUTLINE}" stroke-width="5" stroke-linejoin="round" stroke-linecap="round"/>
    </svg>`,
  },
  "stubby-arms": {
    slot: "arms",
    widthPct: 15,
    anchor: { x: 0.76, y: 0.1 }, // top (shoulder) end of the capsule — buried in the body's lower side
    svg: `<svg viewBox="0 0 60 90" xmlns="http://www.w3.org/2000/svg">
      <rect x="14" y="6" width="32" height="80" rx="16" transform="rotate(24 30 45)"
        fill="var(--blip-fill, ${BASE_BODY})" stroke="${OUTLINE}" stroke-width="6"/>
    </svg>`,
    // a plain rounded capsule angled ~24° outward-down: the earlier
    // comma/claw path read as a hook once attached to the body (Megan's
    // "look a bit odd" review); a simple stub reads as a limb
  },

  /* ============================================================
     SL techy catalogue (2026-07-19) — the six items the shop now
     sells, code-drawn to match her blue art: navy ${OUTLINE} strokes,
     flat fills + restrained translucent glow accents (soft outer
     strokes, not SVG filters — the preview pane is flaky with those).
     Slots + floaty/attached follow the brief's per-item ruling.
     ============================================================ */

  // gold star-shaped sunglasses (glasses slot, FLOATY / sits over eyes)
  // widthPct sized so the lens centres (0.4286 of viewBox apart) land on the
  // eyes (0.389 of stage apart): 0.389/0.4286 ≈ 0.91 of the stage.
  "star-shades": {
    slot: "glasses",
    widthPct: 90,
    anchor: { x: 0.5, y: 0.5 },
    svg: `<svg viewBox="0 0 210 96" xmlns="http://www.w3.org/2000/svg">
      <line x1="86" y1="48" x2="124" y2="48" stroke="${OUTLINE}" stroke-width="7"/>
      <line x1="20" y1="40" x2="4" y2="34" stroke="${OUTLINE}" stroke-width="7" stroke-linecap="round"/>
      <line x1="190" y1="40" x2="206" y2="34" stroke="${OUTLINE}" stroke-width="7" stroke-linecap="round"/>
      <g stroke="${OUTLINE}" stroke-width="6" stroke-linejoin="round">
        <path d="M60.0,8.0 L70.0,34.2 L98.0,35.6 L76.2,53.3 L83.5,80.4 L60.0,65.0 L36.5,80.4 L43.8,53.3 L22.0,35.6 L50.0,34.2 Z" fill="#ffd23f"/>
        <path d="M150.0,8.0 L160.0,34.2 L188.0,35.6 L166.2,53.3 L173.5,80.4 L150.0,65.0 L126.5,80.4 L133.8,53.3 L112.0,35.6 L140.0,34.2 Z" fill="#ffd23f"/>
      </g>
      <path d="M60.0,20 L66.5,36.5 L84,37.5 L70.5,48.5 L75,66 L60,56 L45,66 L49.5,48.5 L36,37.5 L53.5,36.5 Z" fill="#fff0a8" opacity="0.55"/>
      <path d="M150.0,20 L156.5,36.5 L174,37.5 L160.5,48.5 L165,66 L150,56 L135,66 L139.5,48.5 L126,37.5 L143.5,36.5 Z" fill="#fff0a8" opacity="0.55"/>
    </svg>`,
  },

  // pink heart-shaped shades (glasses slot, FLOATY / sits over eyes)
  // same lens-centre maths as star-shades: 0.389/0.4286 ≈ 0.91 of the stage.
  "heart-eyes": {
    slot: "glasses",
    widthPct: 90,
    anchor: { x: 0.5, y: 0.5 },
    svg: `<svg viewBox="0 0 210 96" xmlns="http://www.w3.org/2000/svg">
      <line x1="92" y1="44" x2="118" y2="44" stroke="${OUTLINE}" stroke-width="7"/>
      <line x1="20" y1="40" x2="4" y2="34" stroke="${OUTLINE}" stroke-width="7" stroke-linecap="round"/>
      <line x1="190" y1="40" x2="206" y2="34" stroke="${OUTLINE}" stroke-width="7" stroke-linecap="round"/>
      <g stroke="${OUTLINE}" stroke-width="6" stroke-linejoin="round">
        <path d="M60.0,41.4 C60.0,23.8 20.4,15.0 20.4,37.0 C20.4,56.8 44.6,70.0 60.0,82.3 C75.4,70.0 99.6,56.8 99.6,37.0 C99.6,15.0 60.0,23.8 60.0,41.4 Z" fill="#ff6fa5"/>
        <path d="M150.0,41.4 C150.0,23.8 110.4,15.0 110.4,37.0 C110.4,56.8 134.6,70.0 150.0,82.3 C165.4,70.0 189.6,56.8 189.6,37.0 C189.6,15.0 150.0,23.8 150.0,41.4 Z" fill="#ff6fa5"/>
      </g>
      <ellipse cx="42" cy="34" rx="9" ry="6" fill="#ffd0e2" opacity="0.7" transform="rotate(-30 42 34)"/>
      <ellipse cx="132" cy="34" rx="9" ry="6" fill="#ffd0e2" opacity="0.7" transform="rotate(-30 132 34)"/>
    </svg>`,
  },

  // blue gamer headset (ears slot, ATTACHED). Drawn as one half — band
  // arcs from the crown down to an ear cup at the side; the paired-slot
  // mirror makes the second half, the two bands meeting over the top.
  // Own `attach`: cups sit lower than the cat-ears point (side-of-head,
  // not crown), so this overrides ATTACH.ears without moving cat-ears.
  //
  // BUGFIX 2026-07-19 (Megan's phone review — cups were rendering in the
  // MIDDLE of the face): the old attach x=0.235/y=0.52 landed the cup
  // rect fully inside the body silhouette (measured: 100% of the cup
  // rect was opaque body pixels — i.e. it sat ON the face, not the
  // side). Re-measured the silhouette programmatically (Python+Pillow
  // over assets/companion/blip-base-blue.png): the body's left/right
  // edges at y=0.50 sit at x=0.058 / x=0.935, vs the old cup centre
  // 0.235 which is well inside that (near the eyes, x0.302). New attach
  // (x=0.06/0.94, y=0.50 — just above eye height y0.569 per the
  // headphone-as-ear-level convention) puts the cup CENTRE on the edge,
  // so ~55% of the cup rect overlaps the silhouette and the rest pokes
  // outward — the same "straddles the outline" treatment ATTACH.ears
  // already uses (see its comment above), just measured fresh for the
  // headphone cup's own size. viewBox widened 120->160 and the band's
  // far end pushed out to x=150 (widthPct 35->60) so the two mirrored
  // bands still reach up and meet over the crown instead of stopping
  // short once the cups moved outward — pure "cup at eye-x" moves would
  // leave a ~20%-of-stage gap in the band at the top.
  "headphones": {
    slot: "ears",
    widthPct: 60,
    anchor: { x: 0.175, y: 0.62 }, // the ear cup (lower-left of the box) lands on the attach point; band sweeps up-and-inward to the box's top-right (= crown centre once mirrored)
    attach: [
      { x: 0.06, y: 0.50 },
      { x: 0.94, y: 0.50 },
    ],
    svg: `<svg viewBox="0 0 160 150" xmlns="http://www.w3.org/2000/svg">
      <path d="M28 58 C25 22 77 6 150 10" fill="none" stroke="#2f8fe0" stroke-width="17" stroke-linecap="round"/>
      <path d="M28 58 C25 22 77 6 150 10" fill="none" stroke="${OUTLINE}" stroke-width="7" stroke-linecap="round"/>
      <rect x="6" y="56" width="44" height="74" rx="18" fill="#2f8fe0" stroke="${OUTLINE}" stroke-width="7"/>
      <rect x="18" y="72" width="20" height="42" rx="10" fill="#0e2a4a"/>
      <rect x="24" y="76" width="6" height="34" rx="3" fill="#57c9ff" opacity="0.85"/>
    </svg>`,
  },

  // glowing golden halo (hat slot, FLOATY — the "floaty" ruling made
  // literal: a ring floating clear above the head)
  "halo": {
    slot: "hat",
    widthPct: 36,
    anchor: { x: 0.5, y: 0.78 }, // anchor below the ring so it floats just above the head with a clear gap (still in-frame)
    svg: `<svg viewBox="0 0 120 54" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="60" cy="27" rx="52" ry="17" fill="none" stroke="#ffe08a" stroke-width="16" opacity="0.35"/>
      <ellipse cx="60" cy="27" rx="52" ry="17" fill="none" stroke="#ffd23f" stroke-width="8"/>
      <ellipse cx="60" cy="27" rx="52" ry="17" fill="none" stroke="${OUTLINE}" stroke-width="2.5"/>
      <ellipse cx="42" cy="18" rx="10" ry="3.5" fill="#fff6d6" opacity="0.8" transform="rotate(-18 42 18)"/>
    </svg>`,
  },

  // luminous aurora wings (wings slot, FLOATY — her "Rainbow Glow"
  // folded into the wings slot; gradient fill + soft glow, the one place
  // the brief green-lights gradients for the SL world). {{UID}} keeps
  // each mirrored copy's gradient id unique.
  "aurora-wings": {
    slot: "wings",
    widthPct: 34,
    anchor: { x: 0.82, y: 0.30 },
    svg: `<svg viewBox="0 0 100 140" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="aurora-{{UID}}" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#5be0ff"/>
          <stop offset="0.5" stop-color="#7b5cf6"/>
          <stop offset="1" stop-color="#ff7fd0"/>
        </linearGradient>
      </defs>
      <path d="M92 20 C70 10 40 20 22 46 C40 42 52 46 58 56 C38 58 24 70 16 92 C34 84 48 84 56 90 C40 98 30 112 26 132 C46 122 64 108 74 90 C82 68 88 44 92 20 Z"
        fill="#7b5cf6" opacity="0.30" transform="translate(-3 3)"/>
      <path d="M92 20 C70 10 40 20 22 46 C40 42 52 46 58 56 C38 58 24 70 16 92 C34 84 48 84 56 90 C40 98 30 112 26 132 C46 122 64 108 74 90 C82 68 88 44 92 20 Z"
        fill="url(#aurora-{{UID}})" stroke="${OUTLINE}" stroke-width="5" stroke-linejoin="round" stroke-linecap="round"/>
      <path d="M80 34 C64 34 48 44 40 60" fill="none" stroke="#eafcff" stroke-width="3" opacity="0.5" stroke-linecap="round"/>
    </svg>`,
  },

  // small techy gauntlets (arms slot, ATTACHED — capsule-based like
  // stubby-arms but armoured with a plated cuff + glow seam)
  "power-gloves": {
    slot: "arms",
    widthPct: 17,
    anchor: { x: 0.76, y: 0.1 }, // top (shoulder) end — buried in the body's lower side, matches stubby-arms
    svg: `<svg viewBox="0 0 64 96" xmlns="http://www.w3.org/2000/svg">
      <g transform="rotate(24 32 48)">
        <rect x="14" y="6" width="34" height="82" rx="17" fill="#2f8fe0" stroke="${OUTLINE}" stroke-width="6"/>
        <rect x="12" y="40" width="38" height="16" rx="6" fill="#1c5fa0" stroke="${OUTLINE}" stroke-width="5"/>
        <line x1="31" y1="42" x2="31" y2="54" stroke="#57c9ff" stroke-width="4" stroke-linecap="round"/>
        <circle cx="31" cy="74" r="6" fill="#57c9ff" opacity="0.9"/>
      </g>
    </svg>`,
  },
};

/* ============================================================
   colour recolouring (offscreen canvas, cached data-URLs)
   ============================================================ */
function hexToRgb(hex) {
  const n = parseInt(hex.replace("#", ""), 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}
function rgbToHsv(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b), d = max - min;
  let h = 0;
  if (d !== 0) {
    if (max === r) h = ((g - b) / d) % 6;
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h *= 60;
    if (h < 0) h += 360;
  }
  const s = max === 0 ? 0 : d / max;
  return [h, s, max]; // v = max, already 0..1
}
function hsvToRgb(h, s, v) {
  const c = v * s, x = c * (1 - Math.abs(((h / 60) % 2) - 1)), m = v - c;
  let r1 = 0, g1 = 0, b1 = 0;
  if (h < 60) [r1, g1, b1] = [c, x, 0];
  else if (h < 120) [r1, g1, b1] = [x, c, 0];
  else if (h < 180) [r1, g1, b1] = [0, c, x];
  else if (h < 240) [r1, g1, b1] = [0, x, c];
  else if (h < 300) [r1, g1, b1] = [x, 0, c];
  else [r1, g1, b1] = [c, 0, x];
  return [Math.round((r1 + m) * 255), Math.round((g1 + m) * 255), Math.round((b1 + m) * 255)];
}

/* Recolour tuning (0..1 HSV scale), RE-MEASURED off the SL blue art:
   the whole character is monochromatic navy-on-blue, so the value ladder
   is different from the old cream art —
     - flat body fill  #62ceff : V≈1.00  S≈0.616  (≈115k px)
     - body gloss highlight     : V≈1.00  S≈0.49   (paler blue)
     - navy outline    #0062ac : V≈0.65  S≈0.99   (≈18k px)
     - eye ring / pupil         : V≈0.31  S≈0.88
     - white eye dot            : V≈0.99  S≈0.01
   The pass keeps the SAME idea as the cream version — recolour the bright
   body, preserve the fixed dark strokes — but the threshold sits BETWEEN
   the navy outline (V0.65) and the body/highlight (V1.0). So the navy
   outline + navy eyes are PRESERVED for every colour (the SL body keeps
   its signature navy line, matching the navy-outlined accessories), while
   body fill + gloss get the target HUE with SATURATION scaled relative to
   the body's own (new_s = target_s * s / BODY_S) at each pixel's own V —
   body → exact target, gloss stays "paler than the body" in the new hue,
   the near-white eye dot (s≈0) stays white. The anti-alias fringe between
   navy and body (V0.68..0.85) rides a smoothstep ramp instead of a hard
   cutoff, so no speckles form at the stroke edges. */
const BODY_S = 0.616; // saturation of the flat body blue (98,206,255)
const BODY_V = 1.0; // value of the flat body blue
const DARK_LO = 0.68; // V at/below this: navy outline / eyes — kept exactly
const DARK_HI = 0.85; // V at/above this: fully recoloured; between = smoothstep blend
function smoothstep(lo, hi, x) {
  const t = Math.min(1, Math.max(0, (x - lo) / (hi - lo)));
  return t * t * (3 - 2 * t);
}

const baseImagePromises = new Map(); // src -> Promise<HTMLImageElement>
function loadBaseImage(src = BASE_SRC) {
  if (!baseImagePromises.has(src)) {
    baseImagePromises.set(src, new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error(src + " failed to load"));
      img.src = src;
    }));
  }
  return baseImagePromises.get(src);
}

/* Phase 2: does an optional growth/health art variant actually exist?
   Cached per src (one network request per filename for the page's
   whole lifetime) and never throws — a missing file just resolves
   false so callers can fall back gracefully. */
const imageExistCache = new Map(); // src -> Promise<boolean>
function imageExists(src) {
  if (!imageExistCache.has(src)) {
    imageExistCache.set(src, new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = src;
    }));
  }
  return imageExistCache.get(src);
}

const recolourCache = new Map(); // "baseSrc::colourId" -> Promise<string dataURL>

function buildRecolouredDataUrl(colourId, baseSrc = BASE_SRC) {
  return loadBaseImage(baseSrc).then((img) => {
    const canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth || BASE_W;
    canvas.height = img.naturalHeight || BASE_H;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imgData.data;
    const target = hexToRgb(COLOURS[colourId]);
    const [th, ts] = rgbToHsv(target.r, target.g, target.b);
    for (let i = 0; i < data.length; i += 4) {
      if (data[i + 3] === 0) continue; // transparent
      const [, s, v] = rgbToHsv(data[i], data[i + 1], data[i + 2]);
      const w = smoothstep(DARK_LO, DARK_HI, v);
      if (w === 0) continue; // dark outline / pupils / smile — untouched
      const ns = Math.min(1, ts * (s / BODY_S)); // saturation scaled relative to body blue, so paler-than-body stays paler-than-body
      const [nr, ng, nb] = hsvToRgb(th, ns, v);
      data[i] = Math.round(data[i] + (nr - data[i]) * w);
      data[i + 1] = Math.round(data[i + 1] + (ng - data[i + 1]) * w);
      data[i + 2] = Math.round(data[i + 2] + (nb - data[i + 2]) * w);
    }
    ctx.putImageData(imgData, 0, 0);
    return canvas.toDataURL("image/png");
  });
}

/* The exact flat colour the recoloured body's cream areas end up as —
   target hue+sat at CREAM's value, NOT the raw preset hex (the preset's
   own V can differ by a few %, which reads as a seam where attached
   accessories like ears/arms overlap the body). Used for --blip-fill. */
export function bodyFlatColour(colourId) {
  if (!colourId || colourId === "blue" || !COLOURS[colourId]) return BASE_BODY;
  const t = hexToRgb(COLOURS[colourId]);
  const [th, ts] = rgbToHsv(t.r, t.g, t.b);
  const [r, g, b] = hsvToRgb(th, ts, BODY_V);
  return `rgb(${r},${g},${b})`;
}

/* Returns a Promise<string> resolving to the image src to use for `colourId`
   on top of `baseSrc` (the plain base PNG path for "cream"/unknown, else a
   cached recoloured data-URL — built once per base+colour pair and reused
   forever). `baseSrc` defaults to the normal grown/healthy body so every
   pre-Phase-2 call site (`getBodySrc(colour)`) is unaffected; Phase 2 passes
   whichever growth/health base won (see resolveRawBody below) so baby/sick
   art recolours through the exact same pixel math as the normal body. */
export function getBodySrc(colourId, baseSrc = BASE_SRC) {
  if (!colourId || colourId === "blue" || !COLOURS[colourId]) {
    return Promise.resolve(baseSrc);
  }
  const key = baseSrc + "::" + colourId;
  if (!recolourCache.has(key)) {
    recolourCache.set(key, buildRecolouredDataUrl(colourId, baseSrc));
  }
  return recolourCache.get(key);
}

/* ============================================================
   Animation frame-cycler (2026-07-19) — Megan's hand-drawn 4-frame
   sprite-sheet animations, sliced by tools/slice_sprites.py (the first
   rows were cut by a scratchpad script that was never kept — the tool is
   now in the repo, so re-cutting a row is reproducible) into
   assets/companion/anim/<state>-<n>.png, canvased to the same
   480x600 / ground-line convention as blip-base-blue.png so swapping the
   body img's src between a static base and an animation frame never
   shifts scale or position.
   ============================================================ */
const ANIM_DIR = "assets/companion/anim";
const ANIM_FRAME_COUNT = 4;
function animFramePaths(state) {
  const paths = [];
  for (let i = 1; i <= ANIM_FRAME_COUNT; i++) paths.push(`${ANIM_DIR}/${state}-${i}.png`);
  return paths;
}
/* Which loops recolour through the SAME getBodySrc() cache the static
   body uses (so a pink Blip stays pink while jumping — the sheets are
   monochromatic in the same navy-on-blue palette the tuned recolour
   thresholds were measured against) vs render exactly as Megan drew
   them. SICK STATES (sick, veryill, recovering) are deliberately NOT
   recoloured — "sickness overrides colour": the pale/green tint on those
   sheets is part of what reads as sick, and would look wrong forced into
   a custom hue. Recovering is in that family for a second reason too —
   its drawn blanket is cream, and the recolour thresholds would drag the
   blanket toward the body hue along with everything else. */
const ANIM_RECOLOURS = {
  sleeping: true, excited: true, jumping: true, hungry: true, wink: true,
  sick: false, veryill: false, recovering: false,
};

const FRAME_INTERVAL_MS = 520; // "gentle loop", 450-600ms/frame per spec
const reducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* One entry per currently-animating <img>, so a second runFrameLoop call
   on the SAME element (e.g. playMoment finishing and handing back to the
   idle loop) always clears its own previous interval first. Keyed by the
   element itself (WeakMap, not the stage or a module-level id) so two
   Blips on screen — each with their own <img> — animate independently
   and never see each other's interval. */
const frameLoopState = new WeakMap();
function stopFrameLoop(bodyImg) {
  const running = frameLoopState.get(bodyImg);
  if (running) { clearInterval(running.intervalId); frameLoopState.delete(bodyImg); }
}

/* Runs (or one-shots, via `loops`) a frame loop on `bodyImg`.
   NEVER requestAnimationFrame — the preview pane never fires rAF (recorded
   browser-pane gotcha), so this is setInterval, same as the existing
   blip-bop CSS keyframe sidesteps rAF entirely via CSS instead.
   Self-cleans on unmount: every tick checks bodyImg.isConnected — once
   renderCompanion's el.innerHTML="" (a fresh render/re-render) or a
   screen navigation detaches this exact <img> from the document, the
   very next tick notices and clears itself. No caller anywhere needs to
   remember to call an unmount hook — verified by the DOM/interval-count
   checks in companion-test.html's ANIMATIONS section. */
function runFrameLoop(bodyImg, frames, { colour, recolour, loops = Infinity, onDone } = {}) {
  stopFrameLoop(bodyImg);
  const resolved = frames.map((src) => (recolour ? getBodySrc(colour, src) : Promise.resolve(src)));
  let i = 0;
  let completedLoops = 0;
  const showFrame = () => { resolved[i].then((src) => { if (bodyImg.isConnected) bodyImg.src = src; }); };

  if (reducedMotion()) {
    showFrame(); // freeze on frame 1, no interval at all
    if (onDone) onDone();
    return;
  }
  showFrame();
  const intervalId = setInterval(() => {
    if (!bodyImg.isConnected) { stopFrameLoop(bodyImg); return; } // self-clean on unmount
    i++;
    if (i >= frames.length) {
      i = 0;
      completedLoops++;
      if (completedLoops >= loops) { stopFrameLoop(bodyImg); if (onDone) onDone(); return; }
    }
    showFrame();
  }, FRAME_INTERVAL_MS);
  frameLoopState.set(bodyImg, { intervalId });
}

/* Automatic idle-loop mapping from renderBlip's existing health/growth
   options plus the new `hungry` hint (host passes canFeedToday):
     recovering -> recovering (checked FIRST: it is reported while
     healthStage is still 2-3, so testing health first would show a sick
     loop for a Blip who is meant to be visibly on the mend);
     healthStage 1 -> sleeping, 2 -> sick, 3 -> veryill;
     healthy + hungry -> hungry loop as the idle instead of the static
     base; otherwise null (static base, exactly today's behaviour). */
function idleAnimState({ healthStage, recovering, hungry }) {
  if (recovering) return "recovering";
  if (healthStage === 1) return "sleeping";
  if (healthStage === 2) return "sick";
  if (healthStage >= 3) return "veryill";
  if (hungry) return "hungry";
  return null;
}

/* One-shot "moment" animations — feed success (excited) / round passed
   (jumping). `handle` is renderBlip's own return value: it already
   carries `layers.body` (the <img> to animate) and `colour` (for the
   recolour cache), plus a stashed `_applyIdleBodyArt` callback (set by
   renderBlip below) that puts the right idle art back once the moment's
   two loops finish — reusing the exact same idle-resolution code path
   renderBlip used on mount, so a moment always hands back to whatever
   was actually showing (static base, hungry loop, or a sick loop),
   never hard-coding "back to the plain base". Both moments are
   healthy-only actions (feeding / passing a quest can't happen while
   locked out sick), so both always recolour. */
const MOMENT_LOOPS = 2;
/* Per-moment loop counts. "jumping" doubling up is what reads as Megan's
   "small hop hop"; a wink repeated twice reads twitchy, so it plays once. */
const MOMENT_LOOP_OVERRIDES = { wink: 1 };
const MOMENTS = ["excited", "jumping", "wink"];
export function playMoment(handle, name) {
  if (!handle || !handle.layers || !handle.layers.body) return;
  if (!MOMENTS.includes(name)) return;
  runFrameLoop(handle.layers.body, animFramePaths(name), {
    colour: handle.colour,
    recolour: true,
    loops: MOMENT_LOOP_OVERRIDES[name] || MOMENT_LOOPS,
    onDone: () => { if (typeof handle._applyIdleBodyArt === "function") handle._applyIdleBodyArt(); },
  });
}

/* ---------- tap-to-react (2026-07-19) ----------
   Tapping Blip anywhere he's shown makes him react: a wink, then a hop,
   alternating so repeat taps don't feel canned.

   The wink row may not be on disk yet (it is a separate GPT generation
   from the recovering row). Rather than 404 four <img> loads and flash a
   broken frame, the wink is probed ONCE with the same imageExists helper
   resolveRawBody uses, and simply isn't offered until the frames land —
   at which point it starts working with no further code change.

   Taps are ignored while Blip is sick, sleeping or recovering: a
   bedridden Blip cheerfully hopping undercuts the whole care mechanic,
   and playMoment would hand back to the sick loop a beat later anyway. */
let winkAvailable = null; // null = not probed yet, then a Promise<boolean>
function hasWinkArt() {
  if (winkAvailable === null) winkAvailable = imageExists(animFramePaths("wink")[0]);
  return winkAvailable;
}
let tapIndex = 0;
const tapHandles = new WeakMap(); // host el -> its most recent renderBlip handle
export function playTapReaction(handle) {
  if (!handle || !handle.layers || !handle.layers.body) return;
  if (handle.recovering || handle.healthStage > 0) return; // let him rest
  hasWinkArt().then((wink) => {
    const choices = wink ? ["wink", "jumping"] : ["jumping"];
    playMoment(handle, choices[tapIndex++ % choices.length]);
  });
}

/* ---------- Phase 2: which UNCOLOURED base PNG to actually paint ----------
   Priority per PHASE-2-PLAN.md: a dedicated sick/recovery PNG (full
   swap, drawn by Megan to already show the scene) beats a code-drawn
   placeholder; growth stage 0 additionally prefers blip-baby.png over
   the normal body. Both checks gracefully no-op (imageExists → false)
   until the matching file exists, so this is safe to call today.
   Returns { src, needsOverlay } — needsOverlay tells the caller a
   code-drawn health-fx overlay is needed to stand in for missing art
   (only true when a sick/recovering state was requested but its PNG
   isn't there yet). */
function healthArtKey(healthStage, recovering) {
  if (recovering) return "recovering";
  if (healthStage === 1) return "tired";
  if (healthStage === 2) return "bedridden";
  if (healthStage === 3) return "critical";
  return null;
}
async function resolveRawBody({ growthStage, healthStage, recovering }) {
  const sickKey = healthArtKey(healthStage, recovering);
  if (sickKey) {
    const ok = await imageExists(IMAGE_SOURCES[sickKey]);
    if (ok) return { src: IMAGE_SOURCES[sickKey], needsOverlay: false };
  }
  let src = IMAGE_SOURCES.base;
  if (growthStage === 0) {
    const ok = await imageExists(IMAGE_SOURCES.baby);
    if (ok) src = IMAGE_SOURCES.baby;
  }
  return { src, needsOverlay: !!sickKey };
}

/* ============================================================
   styles (injected once — this module never touches css/*.css)
   ============================================================ */
let stylesInjected = false;
function ensureStyles() {
  if (stylesInjected) return;
  stylesInjected = true;
  const style = document.createElement("style");
  style.id = "blip-companion-styles";
  style.textContent = `
.blip-companion { display: block; } /* no width here — the HOST controls sizing; this injected sheet loads after page CSS and a width rule would clobber the host's own (that's how the hero once rendered 1900px wide) */
.blip-stage { position: relative; width: 100%; aspect-ratio: ${BASE_W} / ${BASE_H}; }
.blip-layer { position: absolute; pointer-events: none; }
.blip-layer svg { display: block; width: 100%; height: auto; overflow: visible; }
.blip-body { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: contain; }
.blip-bop { animation: blip-bop 2.1s ease-in-out infinite; transform-origin: 50% 100%; }
@keyframes blip-bop {
  0%, 100% { transform: scale(1, 1); }
  30% { transform: scale(1.03, 0.955); }
  55% { transform: scale(0.975, 1.03); }
  78% { transform: scale(1.012, 0.99); }
}
`;
  document.head.appendChild(style);
}

/* ============================================================
   layer construction
   ============================================================ */
let uidCounter = 0;
function nextUid() { return "u" + (uidCounter++); }

function makeAccessoryLayer(accId, side) {
  const def = ACCESSORIES[accId];
  if (!def) return null;
  // an accessory may carry its own `attach` (single point or [L,R] pair)
  // to override its slot's shared ATTACH point without disturbing the
  // other items in that slot (e.g. headphones cups sit lower than cat-ears).
  const attachSpec = def.attach || ATTACH[def.slot];
  const point = Array.isArray(attachSpec)
    ? attachSpec[side === "right" ? 1 : 0]
    : attachSpec;
  const anchor = def.anchor || { x: 0.5, y: 0.5 };
  const wrap = document.createElement("div");
  wrap.className = `blip-layer blip-acc blip-acc-${accId}${side ? ` blip-side-${side}` : ""}`;
  wrap.dataset.accessory = accId;
  wrap.dataset.slot = def.slot;
  if (side) wrap.dataset.side = side;
  wrap.style.left = point.x * 100 + "%";
  wrap.style.top = point.y * 100 + "%";
  wrap.style.width = def.widthPct + "%";
  const mirror = side === "right" ? " scaleX(-1)" : "";
  // tilt is listed AFTER the mirror so it applies in mirrored space —
  // the right-hand copy of a paired accessory leans symmetrically without
  // needing a per-side angle. Pivot = the anchor (transform-origin below),
  // so tilting never moves the attachment point off the body.
  const tilt = def.tiltDeg ? ` rotate(${def.tiltDeg}deg)` : "";
  wrap.style.transform = `translate(-${anchor.x * 100}%, -${anchor.y * 100}%)${mirror}${tilt}`;
  wrap.style.transformOrigin = `${anchor.x * 100}% ${anchor.y * 100}%`;
  // {{UID}} lets an accessory's own SVG carry internal ids (e.g. a <clipPath>)
  // without colliding with every other instance of it rendered on the page —
  // url(#id) references resolve document-wide, not scoped to their own <svg>.
  wrap.innerHTML = def.svg.includes("{{UID}}") ? def.svg.split("{{UID}}").join(nextUid()) : def.svg;
  return wrap;
}

/* Phase 2: mounts one health-fx overlay spec (see health-fx.js — same
   {x, y, anchor, widthPct, tiltDeg?, svg} shape as an ACCESSORIES
   entry, just not keyed through ATTACH/ACCESSORIES since these aren't
   equippable items). `host` is normally the stage, or the rotated
   bed-group div for face overlays on the bedridden/critical layout. */
function makeFxLayer(spec, extraClass) {
  const wrap = document.createElement("div");
  wrap.className = `blip-layer blip-health-fx${extraClass ? " " + extraClass : ""}`;
  const anchor = spec.anchor || { x: 0.5, y: 0.5 };
  wrap.style.left = spec.x * 100 + "%";
  wrap.style.top = spec.y * 100 + "%";
  wrap.style.width = spec.widthPct + "%";
  const tilt = spec.tiltDeg ? ` rotate(${spec.tiltDeg}deg)` : "";
  wrap.style.transform = `translate(-${anchor.x * 100}%, -${anchor.y * 100}%)${tilt}`;
  wrap.style.transformOrigin = `${anchor.x * 100}% ${anchor.y * 100}%`;
  wrap.innerHTML = spec.svg;
  return wrap;
}

/* ============================================================
   public API
   ============================================================ */
export function renderCompanion(el, state = {}) {
  if (!el) throw new Error("renderCompanion: el is required");
  ensureStyles();

  // Stop any frame-cycler running on a PREVIOUSLY mounted body <img> in
  // this host before el.innerHTML="" below detaches it — belt-and-
  // suspenders alongside runFrameLoop's own isConnected self-check: that
  // check only fires on the NEXT tick (up to FRAME_INTERVAL_MS later),
  // this makes cleanup immediate/deterministic for the common case (the
  // same host re-rendering via app.render()), which is also what makes
  // the interval-count leak check in companion-test.html reliable
  // without an artificial wait.
  const prevBody = el.querySelector && el.querySelector(".blip-body");
  if (prevBody) stopFrameLoop(prevBody);

  const colour = state.colour && Object.prototype.hasOwnProperty.call(COLOURS, state.colour) ? state.colour : "blue";
  const requested = Array.isArray(state.accessories) ? state.accessories : [];
  const accessories = requested.filter((id) => ACCESSORIES[id]);

  el.innerHTML = "";
  el.classList.add("blip-companion");

  const stage = document.createElement("div");
  stage.className = "blip-stage blip-bop";
  stage.style.setProperty("--blip-fill", bodyFlatColour(colour)); // exact on-body flat colour, so attached ears/arms fills merge seamlessly
  el.appendChild(stage);

  const layers = {}; // slot -> element (or [left,right] for paired slots)
  const bySlot = (slot) => accessories.filter((id) => ACCESSORIES[id] && ACCESSORIES[id].slot === slot);

  for (const slot of SLOT_ORDER) {
    for (const accId of bySlot(slot)) {
      if (Array.isArray(ATTACH[slot])) {
        const left = makeAccessoryLayer(accId, "left");
        const right = makeAccessoryLayer(accId, "right");
        stage.appendChild(left);
        stage.appendChild(right);
        layers[slot] = [left, right];
      } else {
        const single = makeAccessoryLayer(accId, null);
        stage.appendChild(single);
        layers[slot] = single;
      }
    }
    if (slot === "wings") {
      const bodyImg = document.createElement("img");
      bodyImg.className = "blip-layer blip-body";
      bodyImg.alt = "Blip";
      bodyImg.src = BASE_SRC; // paint immediately with the base art; swapped below once recoloured (cached after the first time per colour)
      stage.appendChild(bodyImg);
      layers.body = bodyImg;
      if (colour !== "blue") {
        getBodySrc(colour).then((src) => { bodyImg.src = src; });
      }
    }
  }

  return { el, stage, layers, colour, accessories };
}

/* ============================================================
   renderBlip — Phase 2 entry point (feeding/growth/sickness)
   ------------------------------------------------------------
   Wraps renderCompanion and layers on:
     - a growth-stage size scale (0.60/0.75/0.88/1.00 of the host size,
       PHASE-2-PLAN.md §3), applied via CSS transform on `el` itself
       (NOT on `stage` — stage already carries the blip-bop keyframe
       animation on `transform`, and a plain inline transform on the
       same property would just be clobbered by the running animation
       every frame rather than composing with it);
     - health-stage art: swaps to a dedicated sick/recovery PNG once
       Megan draws one (full-swap, same style as blip-baby.png), else
       falls back to the normal grown/baby body plus a code-drawn
       health-fx overlay (droopy eyes, bed + blanket + thermometer,
       heart monitor, recovering sit-up — see health-fx.js);
     - the "he won't get up" dress-up lock: while healthStage>=2 (or
       recovering) equipped accessories are never rendered, colour
       always is (PHASE-2-PLAN.md §2 refusal behaviours).

   renderBlip(el, {
     colour?: string (see COLOURS),
     equipped?: {slot: accessoryId} (server/local shape) OR a flat
                accessoryId[] — either is accepted,
     size?: number — px. The "host size" the growth/sick scale
            multiplies. Omit to let the host's own CSS size `el`
            (unscaled — same as renderCompanion has always worked).
     growthStage?: 0-3, default 3 (grown) — matches PHASE-2-PLAN.md's
                   Baby/Small/Medium/Grown table.
     healthStage?: 0-3, default 0 (healthy) — matches the sickness
                   ladder (0 healthy, 1 tired, 2 bedridden, 3 critical).
     recovering?: boolean, default false.
   })
   Defaults are healthy/grown/undressed-lock-off, so every existing
   call site that still calls renderCompanion directly is completely
   unaffected — nothing about renderCompanion changed.
   Returns { ...renderCompanion's result, growthStage, healthStage,
             recovering, scale, mood }. `mood` is blipMood()'s output,
   handed back ready-made so callers don't need a second import.
   ============================================================ */
const GROWTH_SCALE = [0.60, 0.75, 0.88, 1.00]; // index = growthStage, PHASE-2-PLAN.md §3
const SICK_SHRINK = 0.85; // temporary shrink while bedridden/critical, PHASE-2-PLAN.md §1 ("definitely a bit smaller")

function clampStage(v, fallback) {
  const n = Math.round(Number(v));
  if (!Number.isFinite(n)) return fallback;
  return Math.min(3, Math.max(0, n));
}

/* {slot: accessoryId} (server/local `equipped` shape) -> flat id[]
   renderCompanion expects. Also accepts an already-flat array as a
   convenience (renderBlip's `equipped` option is documented as either
   shape). Deliberately NOT imported from blip-ui.js's identical
   equippedToAccessories — blip-ui.js imports FROM renderer.js already,
   so importing back would be a circular edge for four lines. */
function toAccessoryList(equipped) {
  if (Array.isArray(equipped)) return equipped;
  if (!equipped || typeof equipped !== "object") return [];
  return Object.values(equipped).filter(Boolean);
}

function mountHealthOverlay(stage, layers, spec) {
  const faceHost = spec.rotate ? document.createElement("div") : stage;
  if (spec.rotate) {
    faceHost.className = "blip-layer blip-bed-group";
    faceHost.style.position = "absolute";
    faceHost.style.inset = "0";
    faceHost.style.transform = `rotate(${HEALTH_ROTATE_DEG}deg)`;
    faceHost.style.transformOrigin = "50% 50%";
    stage.insertBefore(faceHost, layers.body); // keep the body's original z-order slot (after wings, before ears/glasses/hat/arms)
    faceHost.appendChild(layers.body); // move the body img INTO the rotated group so the face tilts as one piece
  }
  spec.faceOverlays.forEach((o) => faceHost.appendChild(makeFxLayer(o)));
  spec.envOverlays.forEach((o) => stage.appendChild(makeFxLayer(o)));
}

export function renderBlip(el, opts = {}) {
  if (!el) throw new Error("renderBlip: el is required");
  const growthStage = clampStage(opts.growthStage, 3);
  const healthStage = clampStage(opts.healthStage, 0);
  const recovering = !!opts.recovering;
  // "he won't get up": bedridden/critical (and the still-fragile
  // recovering state right after) never show equipped accessories.
  // Colour is untouched by this — it flows through renderCompanion
  // below exactly as normal.
  const hideAccessories = healthStage >= 2 || recovering;
  const accessories = hideAccessories ? [] : toAccessoryList(opts.equipped);

  const result = renderCompanion(el, { colour: opts.colour, accessories });
  const { stage, layers, colour } = result;

  // ---- size + growth/sick scale ----
  // Applied to `el`, not `stage` — see the big comment above this
  // function for why stage's own bop animation rules that out.
  if (typeof opts.size === "number" && opts.size > 0) {
    el.style.width = opts.size + "px";
  }
  const scale = GROWTH_SCALE[growthStage] * (healthStage >= 2 ? SICK_SHRINK : 1);
  el.style.transform = scale === 1 ? "" : `scale(${scale})`;
  el.style.transformOrigin = "50% 100%"; // shrink toward the ground line, not the centre, so smaller stages don't float upward
  stage.dataset.growthStage = String(growthStage);
  stage.dataset.healthStage = String(healthStage);
  if (recovering) stage.dataset.recovering = "true";

  // ---- body art ----
  // Animation (2026-07-19) takes priority over the old static/placeholder
  // path whenever idleAnimState() has a loop for this combination
  // (recovering/sleeping/sick/veryill/hungry) — the pre-animation
  // resolveRawBody + health-fx placeholder path is left COMPLETELY INTACT
  // below for every other case (healthy+not-hungry static base, or a
  // future dedicated bedridden.png/critical.png landing on disk), so
  // nothing about pre-animation behaviour changes when it returns null.
  // Factored into a named function (not an inline .then chain) so
  // playMoment's onDone can call the exact same "what should be showing
  // right now" resolution once a one-shot moment finishes.
  const hungry = !!opts.hungry;
  const animState = idleAnimState({ healthStage, recovering, hungry });

  function applyIdleBodyArt() {
    if (animState) {
      runFrameLoop(layers.body, animFramePaths(animState), { colour, recolour: ANIM_RECOLOURS[animState] });
      // clear any previously-mounted health-fx props before remounting —
      // applyIdleBodyArt can run twice on the same stage (initial mount,
      // then again from playMoment's onDone), and mountHealthOverlay has
      // no built-in idempotency of its own (renderCompanion's own
      // el.innerHTML="" wipe is what normally keeps it a one-shot).
      stage.querySelectorAll(".blip-health-fx").forEach((n) => n.remove());
      const spec = animatedHealthOverlaySpec(healthStage, recovering);
      if (spec) mountHealthOverlay(stage, layers, spec);
    } else {
      // paint now with the default grown/healthy body (already done by
      // renderCompanion above), then swap once the real growth/health
      // art is resolved — same "paint immediately, swap once ready"
      // pattern renderCompanion already uses for colour.
      stopFrameLoop(layers.body);
      resolveRawBody({ growthStage, healthStage, recovering }).then(({ src: rawSrc, needsOverlay }) => {
        getBodySrc(colour, rawSrc).then((finalSrc) => { layers.body.src = finalSrc; });
        if (!needsOverlay) return; // dedicated art exists for this state now — no placeholder needed
        const spec = healthOverlaySpec(healthStage, recovering, bodyFlatColour(colour));
        if (spec) mountHealthOverlay(stage, layers, spec);
      });
    }
  }
  applyIdleBodyArt();

  const out = { ...result, growthStage, healthStage, recovering, scale, mood: _blipMood(healthStage, recovering) };
  out._applyIdleBodyArt = applyIdleBodyArt;

  // ---- tap-to-react opt-in ----
  // The listener goes on `el` (the host's own box), NOT on anything
  // renderCompanion builds: every re-render wipes el.innerHTML, so a
  // listener on the stage or body img would die on the next state
  // change. `el` survives, so it is bound exactly once and reads the
  // CURRENT handle out of tapHandles each time it fires — otherwise a
  // re-rendered Blip would keep reacting through its stale first handle
  // and animate an <img> that is no longer in the document.
  if (opts.tappable) {
    tapHandles.set(el, out);
    if (!el.dataset.blipTappable) {
      el.dataset.blipTappable = "1";
      el.style.cursor = "pointer";
      el.addEventListener("click", () => playTapReaction(tapHandles.get(el)));
    }
  }
  return out;
}
