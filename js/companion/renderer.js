/* ============================================================
   COMPANION RENDERER — "Blip" (proof piece for the companion rebrand)
   ------------------------------------------------------------
   Composites code-drawn SVG accessories onto the fixed Blip base-body
   PNG. Pure ES module, no build step — matches the app's plain-JS idiom
   (see js/ui.js, js/engine/*.js).

   renderCompanion(el, state) mounts a full character into `el`:
     state = {
       colour?: one of the COLOURS keys below (default "cream"),
       accessories?: array of accessory ids from ACCESSORIES (any order —
                     each accessory carries its own slot/z-order)
     }
   Returns { el, stage, layers, colour, accessories } for inspection/tests.

   Layer stack (back → front), per spec:
     wings (behind body) → body PNG → ears → glasses → hat → arms
   Attachment points (ATTACH, below) are fractions (0..1) of the stage box,
   so accessories stay correctly placed at any container size — the stage
   is a position:relative box sized by CSS (aspect-ratio locked to the art),
   and every layer is positioned with % left/top + a % transform anchor,
   never px.

   COLOUR SYSTEM: the base PNG is recoloured on an offscreen canvas.
   Every non-dark pixel gets the target HUE with saturation scaled
   relative to the body cream's (so the paler eye-highlight stays paler
   in the new colour) while keeping its own brightness (V); dark
   outline/pupil/smile pixels are untouched, with a smoothstep blend at
   the boundary instead of a hard cutoff — a hard classify-or-skip left
   the source art's anti-alias fringe as yellow speckles around the eyes
   and smile on recoloured bodies. Results are cached per colour id (as
   data-URLs) so repeated renders/tests never reprocess a colour twice.
   ============================================================ */

const BASE_SRC = "assets/companion/blip-base.png";

/* Natural size of the downscaled art (kept at the source's 1080:1350 = 4:5
   ratio). Used only for the offscreen canvas — on-page sizing is all %. */
const BASE_W = 480, BASE_H = 600;

/* Sampled directly from Blip Blank.png: the outline/eye/pupil dark brown,
   and the flat "cream" body fill it's drawn over. */
export const OUTLINE = "#2e1b0d";
const BASE_CREAM = "#fddb93";

/* ---------- colour presets ----------
   Soft pastel targets; "cream" is the untouched original art (no canvas
   work needed — it's the base PNG's own colour). Every other preset is
   just a target hex: recolouring derives that hex's hue+saturation and
   keeps each source pixel's own brightness, so one code path serves all
   nine recolours. */
export const COLOURS = {
  cream: null,
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
   Fractions of the stage box (which mirrors the full 1080x1350 canvas,
   not just the drawn blob's own tighter bounding box). Measured off
   Blip Blank.png: body bbox x11–1057/y110–1201, eyes centred at
   y0.494 (x0.300 / x0.689), mouth centred (0.494, 0.571).
   PLACEMENT RULING — per-accessory (Megan's phone review 2026-07-19):
   - hat, wings, glasses: FLOATY BY DESIGN — they hover clear of the
     body outline with visible gaps; she finds these cute as-is. Don't
     "fix" them by pulling them in to touch the outline.
   - ears, arms: ATTACHED BY DESIGN — they must visibly overlap the
     body outline (ears grow from the sloping upper sides like real cat
     ears, arm shoulders merge into the lower sides; style reference:
     "Blip with Hat.png" outline-on-outline joins). Don't float them.
   Body silhouette measurements used below: opaque bbox x0.012–0.977 /
   y0.083–0.887; left edge ≈ x0.289 at y0.195, ≈ x0.02 at y0.68.
   Single point = one centred accessory (hat, glasses).
   [left, right] pair = a symmetric accessory mirrored to both sides
   (ears, wings, arms). */
export const ATTACH = {
  hat: { x: 0.5, y: 0.05 },
  glasses: { x: 0.5, y: 0.487 },
  ears: [
    { x: 0.31, y: 0.195 }, // base straddles the upper-side outline (edge x≈0.289 here)
    { x: 0.69, y: 0.195 },
  ],
  wings: [
    { x: 0.05, y: 0.52 },
    { x: 0.95, y: 0.52 },
  ],
  arms: [
    { x: 0.115, y: 0.68 }, // shoulder buried inside the lower-side outline (edge x≈0.02 here); hand pokes out below
    { x: 0.885, y: 0.68 },
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
      <path d="M30 4 C10 20 4 46 10 64 C16 60 22 56 30 56 C38 56 44 60 50 64 C56 46 50 20 30 4 Z" fill="var(--blip-fill, ${BASE_CREAM})" stroke="${OUTLINE}" stroke-width="5" stroke-linejoin="round"/>
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
        fill="var(--blip-fill, ${BASE_CREAM})" stroke="${OUTLINE}" stroke-width="6"/>
    </svg>`,
    // a plain rounded capsule angled ~24° outward-down: the earlier
    // comma/claw path read as a hook once attached to the body (Megan's
    // "look a bit odd" review); a simple stub reads as a limb
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

/* Recolour tuning (0..1 HSV scale), measured off the art: the dark
   outline/pupils/smile sit at V≈0.18, body cream at V≈0.99 S≈0.42, the
   eye-highlight dot at V≈0.99 S≈0.33 (a paler cream, not white).
   The pass replaces HUE on every non-dark pixel and scales SATURATION
   proportionally (new_s = target_s * s / CREAM_S), keeping each pixel's
   own V. So: cream → exact target colour; the highlight keeps its
   "paler than the body" identity in the new hue; and the source art's
   anti-alias/ringing fringe hugging the dark strokes (≈1300 desaturated
   cream pixels — a hard classify-or-skip left them as yellow speckles
   on recoloured bodies) is pulled into the target hue too, so no cream
   can survive anywhere. Near-dark pixels blend on a smoothstep ramp
   over V (DARK_LO..DARK_HI) instead of a hard cutoff, keeping the
   stroke edges smooth. */
const CREAM_S = 0.419; // saturation of the flat body cream (253,219,147)
const CREAM_V = 253 / 255; // value of the flat body cream
const DARK_LO = 0.3; // V at/below this: outline / pupils — kept exactly
const DARK_HI = 0.6; // V at/above this: fully recoloured; between = smoothstep blend
function smoothstep(lo, hi, x) {
  const t = Math.min(1, Math.max(0, (x - lo) / (hi - lo)));
  return t * t * (3 - 2 * t);
}

let baseImagePromise = null;
function loadBaseImage() {
  if (!baseImagePromise) {
    baseImagePromise = new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error("blip-base.png failed to load"));
      img.src = BASE_SRC;
    });
  }
  return baseImagePromise;
}

const recolourCache = new Map(); // colourId -> Promise<string dataURL>

function buildRecolouredDataUrl(colourId) {
  return loadBaseImage().then((img) => {
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
      const ns = Math.min(1, ts * (s / CREAM_S)); // saturation scaled relative to cream, so paler-than-cream stays paler-than-body
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
  if (!colourId || colourId === "cream" || !COLOURS[colourId]) return BASE_CREAM;
  const t = hexToRgb(COLOURS[colourId]);
  const [th, ts] = rgbToHsv(t.r, t.g, t.b);
  const [r, g, b] = hsvToRgb(th, ts, CREAM_V);
  return `rgb(${r},${g},${b})`;
}

/* Returns a Promise<string> resolving to the image src to use for `colourId`
   (the plain base PNG path for "cream"/unknown, else a cached recoloured
   data-URL — built once per colour and reused forever). */
export function getBodySrc(colourId) {
  if (!colourId || colourId === "cream" || !COLOURS[colourId]) {
    return Promise.resolve(BASE_SRC);
  }
  if (!recolourCache.has(colourId)) {
    recolourCache.set(colourId, buildRecolouredDataUrl(colourId));
  }
  return recolourCache.get(colourId);
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
  const point = Array.isArray(ATTACH[def.slot])
    ? ATTACH[def.slot][side === "right" ? 1 : 0]
    : ATTACH[def.slot];
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

/* ============================================================
   public API
   ============================================================ */
export function renderCompanion(el, state = {}) {
  if (!el) throw new Error("renderCompanion: el is required");
  ensureStyles();

  const colour = state.colour && Object.prototype.hasOwnProperty.call(COLOURS, state.colour) ? state.colour : "cream";
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
      if (colour !== "cream") {
        getBodySrc(colour).then((src) => { bodyImg.src = src; });
      }
    }
  }

  return { el, stage, layers, colour, accessories };
}
