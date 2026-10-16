/* The finance concept pictures: the two jugs (f8 card), the discovery jug
   (jugDiscover, also used by js/quests/questf8-which-total.js) and the built
   timeline (f12/f13 cards, verify-finance). Moved verbatim from js/concepts.js
   on 2026-10-17 (AF row S4); js/concepts.js still re-exports jugDiscover and
   BUILD_TIMELINE_EXAMPLE, so no importer changed. */

/* ---------------------------------------------------------
   THE JUG PICTURE (f8 "Which one is the total?", 2026-10-11).
   Her ruling: payments are coins, the total is the jug. The jug is
   HER drawing (art-source/finance/jug-outline.png, used as is),
   painted through two masks that tools/jug_masks.py makes from it:
   the outline in a light tint of the chapter colour (her black line
   never shows black on the dark UI), the fill behind it in the
   chapter colour, inside the body only (css/styles.css, the .jug
   rules). One drawing, two jugs: savings fills partway (one rise per
   coin that goes in, a dip for the coin that comes out, then a little
   growth: the interest), the loan jug is full, to just under the rim
   and never into the spout. Coins and arrows are code-drawn: a gold
   rim going in, a red rim going out, short labels.
   Everything is in units of a 320 × 232 stage; the jug's box is 180
   units square and is placed by percent, so it stays lined up with
   the SVG at every width. Whole numbers only in the SVG. The captions
   keep "full jug" and "the total" together with a literal U+00A0.
   --------------------------------------------------------- */
const JUG_W = 320, JUG_H = 232, JUG_BOX = 180;
const jugPct = v => `${Math.round(v * 10000) / 100}%`;
/* an arrow along one quadratic curve, its head at the end */
function jugArrow(x1, y1, cx, cy, x2, y2, cls) {
  const a = Math.atan2(y2 - cy, x2 - cx), L = 13, W = 7, r = Math.round;
  const bx = x2 - L * Math.cos(a), by = y2 - L * Math.sin(a), px = -Math.sin(a) * W, py = Math.cos(a) * W;
  return `<g class="jug-arr ${cls}"><path d="M${x1} ${y1} Q${cx} ${cy} ${r(bx)} ${r(by)}"/>`
    + `<polygon points="${x2},${y2} ${r(bx + px)},${r(by + py)} ${r(bx - px)},${r(by - py)}"/></g>`;
}
/* a coin of radius rad, its label dy below the centre; a jug box of B units on
   a W × H stage. The library card's own sizes are jugCoin and jugBox. */
const jugCoinR = (rad, dy) => (x, y, label, cls) =>
  `<g class="jug-coin ${cls}"><circle cx="${x}" cy="${y}" r="${rad}"/><text x="${x}" y="${y + dy}">${label.replace(/ /g, " ")}</text></g>`;
const jugBoxIn = (W, H, B) => (x, y, cls) =>
  `<div class="jug ${cls}" style="left:${jugPct(x / W)};top:${jugPct(y / H)};width:${jugPct(B / W)}">`
  + `<div class="jug-fill"><div class="jug-lvl"></div></div><div class="jug-line"></div></div>`;
const jugCoin = jugCoinR(33, 7);
const jugBox = jugBoxIn(JUG_W, JUG_H, JUG_BOX);
const jugLetters = (x, yRole, role, yQ) =>
  `<text class="jug-role" x="${x}" y="${yRole}">${role}</text><text class="jug-q" x="${x}" y="${yQ}">?</text>`;
const JUG_SVG = inner => `<svg class="jug-svg" viewBox="0 0 ${JUG_W} ${JUG_H}" aria-hidden="true">${inner}</svg>`;
/* savings: the jug at x 128, coins on the left; two in (gold), one out (red) */
const JUG_SAVE = `<div class="jug-stage">${jugBox(128, 40, "jug-save")}${JUG_SVG(
  jugCoin(36, 50, "5 000", "in") + jugCoin(36, 122, "3 000", "in") + jugCoin(36, 196, "4 000", "out")
  + jugArrow(70, 54, 112, 60, 146, 112, "in a1") + jugArrow(70, 124, 110, 124, 143, 142, "in a2")
  + jugArrow(146, 186, 110, 206, 71, 200, "out a3")
  + jugLetters(204, 124, "A", 199))}</div>`;
/* a loan: the bank hands over the full jug (x 8); the repayments go out (red) */
const JUG_LOAN = `<div class="jug-stage">${jugBox(8, 40, "jug-loan")}${JUG_SVG(
  `<g class="jug-bank"><rect x="226" y="4" width="86" height="36" rx="7"/><text x="269" y="29">BANK</text></g>`
  + jugArrow(226, 24, 170, 8, 132, 40, "bank")
  + jugCoin(284, 100, "6 000", "out") + jugCoin(284, 180, "3 000", "out")
  + jugArrow(182, 98, 218, 90, 249, 100, "out") + jugArrow(142, 178, 198, 196, 249, 184, "out")
  + jugLetters(84, 94, "P", 141))}</div>`;
const JUG_PICTURE = `<div class="jugs">`
  + `<div class="jug-pane">${JUG_SAVE}<div class="jug-cap"><b>SAVINGS</b><br>you fill the jug<br>the jug at the <b>end</b> is the total</div></div>`
  + `<div class="jug-pane">${JUG_LOAN}<div class="jug-cap"><b>LOAN</b><br>the bank hands you a full jug<br>the jug at the <b>start</b> is the total</div></div>`
  + `</div>`;

/* ---------------------------------------------------------
   THE DISCOVERY JUG (f8 card 1, her note 11 Oct 16:56: "make the first
   slide just the jug"). ONE jug per frame, large and centred, the same
   drawing, masks and colours as the picture above. jugDiscover(mode):
     "empty"  the empty jug, nothing moves;
     "save"   three coins come IN one by one (gold rim) and the level
              rises as each lands, then a little more (the interest):
              the jug at the END is the total;
     "loan"   the BANK hands over the full jug (87%, never into the
              spout) and three coins go OUT one by one (red rim), each
              lowering the level, EMPTY at the end (frame 1's level).
   The coins sit in ONE column on the left in both, so a coin keeps its
   slot and only its direction changes (her handle is on the right). The
   timing is css/styles.css .jug-discover: keyframes on the level's
   HEIGHT, started when the frame mounts (the reveal engine builds a fresh
   frame on every Next), played once, still under reduced motion.
   A 320 × 250 stage; the jug's box is 206 units (64% of the stage),
   centred, and the stage runs into the frame's side padding (styles.css),
   so the jug is about 63% of the card at 360 and 390 px. Whole numbers only in the SVG; an arrow's tip stops just
   outside her line.
   --------------------------------------------------------- */
const JD_W = 320, JD_H = 250, JD_BOX = 206, JD_X = 57, JD_Y = 40;
const jdBox = jugBoxIn(JD_W, JD_H, JD_BOX);
const jdCoin = jugCoinR(24, 5);
/* per coin: its centre, then its arrow as [coin end, curve control, jug end] */
const JD_COINS = [
  { x: 29, y: 86, arrow: [[55, 84], [76, 82], [92, 97]] },
  { x: 29, y: 152, arrow: [[54, 147], [66, 138], [80, 133]] },
  { x: 29, y: 218, arrow: [[54, 215], [68, 216], [82, 210]] },
];
const JD_LABELS = { save: ["2 000", "3 000", "1 000"], loan: ["5 000", "5 000", "5 000"] };
export function jugDiscover(mode) {
  const coins = !JD_LABELS[mode] ? "" : JD_COINS.map(({ x, y, arrow: [a, c, b] }, j) => {
    const arrow = mode === "loan"
      ? jugArrow(b[0], b[1], c[0], c[1], a[0], a[1], "out")
      : jugArrow(a[0], a[1], c[0], c[1], b[0], b[1], "in");
    return `<g class="jd-c${j + 1}">${jdCoin(x, y, JD_LABELS[mode][j], mode === "loan" ? "out" : "in")}${arrow}</g>`;
  }).join("");
  const bank = mode !== "loan" ? "" :
    `<g class="jug-bank"><rect x="226" y="4" width="86" height="34" rx="7"/><text x="269" y="28">BANK</text></g>`
    + jugArrow(226, 21, 198, 10, 178, 38, "bank");
  return `<div class="jug-discover jd-${mode}"><div class="jug-stage">${jdBox(JD_X, JD_Y, "jug-d")}`
    + `<svg class="jug-svg" viewBox="0 0 ${JD_W} ${JD_H}" aria-hidden="true">${bank}${coins}</svg></div></div>`;
}

/* ---------------------------------------------------------
   THE BUILT TIMELINE (f12 "Build the timeline", 2026-10-11).
   Brenda's bank example (f13's own FIX.twoDeposits scene), drawn by
   the timeline engine exactly as f13 draws that scene (f13GraphOf):
   verify-finance asserts the two specs are the same, and draws this
   one at a 360-px phone. The engine already loads with the shell
   (js/questions.js imports it), so this import costs no request.
   --------------------------------------------------------- */
export const BUILD_TIMELINE_EXAMPLE = {
  type: "timeline", n: 7, meet: 7,
  nodes: [{ t: 7, label: "?", role: "A" }, { t: 0, amount: 5500, dp: 0 }, { t: 5, amount: 4000, dp: 0 }],
  roads: [{ from: 0, to: 3, rate: "14% p.a.", k: 2 }, { from: 3, to: 7, rate: "12% p.a.", k: 12 }],
  leaders: true, stackLeaders: true,
};

export { JUG_PICTURE };   // the f8 card in ./finance.js draws it
