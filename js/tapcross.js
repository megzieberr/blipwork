/* ============================================================
   TAP CROSS  (her quadrant cross, tapped)
   ------------------------------------------------------------
   This is literally the little cross she draws beside every
   general solution and every special sum (METHODS-trig 0.3, L1,
   p27–p30, p45–p68): two perpendicular lines, a ✓ in each chosen
   quadrant. No axis numbers, no Roman numerals by default —
   the bare cross, because that is what is on the page.

   Her numbering (0.3 / L1):
       ② │ ①        1 = top-right   2 = top-left
      ───┼───       3 = bottom-left 4 = bottom-right
       ③ │ ④

   mountTapcross(host, { single, noRef, labels, onSubmit })
     single  true  → exactly one tick, and the tap SUBMITS at once
             false → multi-select with a "Submit ✓" button
     noRef   true  → adds her "no reference angle" button (round 12,
                     the co-function items — METHODS-trig L3)
     labels  true  → faint I–IV in the corners (teaching frames only)
     onSubmit(value) — value is a SORTED array of quadrant numbers,
                     or the string "noref"
   returns { value, reset, disable, enable, reveal, svg }
     reveal(correct) paints the right quadrants green and any wrongly
     ticked one red, reusing the app's existing .hit CSS.
   ============================================================ */
import { el } from "./ui.js";

const SVGNS = "http://www.w3.org/2000/svg";
const VB = 220, MID = 110, ARM = 96;      // viewBox, centre, half-length of each arm

/* quadrant → the corner of the cross it owns (pixel box in the viewBox) */
const BOX = {
  1: { x: MID, y: MID - ARM, w: ARM, h: ARM },
  2: { x: MID - ARM, y: MID - ARM, w: ARM, h: ARM },
  3: { x: MID - ARM, y: MID, w: ARM, h: ARM },
  4: { x: MID, y: MID, w: ARM, h: ARM },
};
const ROMAN = { 1: "I", 2: "II", 3: "III", 4: "IV" };

function svgEl(tag, attrs) {
  const e = document.createElementNS(SVGNS, tag);
  for (const k in attrs) e.setAttribute(k, attrs[k]);
  return e;
}

export function mountTapcross(host, opts = {}) {
  const { single = false, noRef = false, labels = false, onSubmit } = opts;
  let ticked = [];            // quadrant numbers, kept sorted
  let locked = false;
  let norefOn = false;        // her "no reference angle" button is the answer

  const wrap = el("div", "tapcross");

  const svg = svgEl("svg", {
    class: "sg tc", viewBox: `0 0 ${VB} ${VB}`, role: "img",
    preserveAspectRatio: "xMidYMid meet",
    "data-mid": String(MID),
  });
  // the cross itself: two plain perpendicular lines, nothing else
  svg.appendChild(svgEl("line", { class: "tc-axis", x1: MID - ARM - 8, y1: MID, x2: MID + ARM + 8, y2: MID }));
  svg.appendChild(svgEl("line", { class: "tc-axis", x1: MID, y1: MID - ARM - 8, x2: MID, y2: MID + ARM + 8 }));

  if (labels) {
    [1, 2, 3, 4].forEach(q => {
      const b = BOX[q];
      const t = svgEl("text", {
        class: "tc-roman", x: b.x + b.w / 2, y: b.y + b.h / 2,
        "text-anchor": "middle", "dominant-baseline": "middle",
      });
      t.textContent = ROMAN[q];
      svg.appendChild(t);
    });
  }

  // the ✓ glyphs — one per quadrant, hidden until that quadrant is tapped
  const tickNodes = {};
  [1, 2, 3, 4].forEach(q => {
    const b = BOX[q];
    const t = svgEl("text", {
      class: "tc-tick", x: b.x + b.w / 2, y: b.y + b.h / 2,
      "text-anchor": "middle", "dominant-baseline": "middle",
      "data-tick": String(q),
    });
    t.textContent = "✓";
    t.style.display = "none";
    svg.appendChild(t);
    tickNodes[q] = t;
  });

  // the four hit regions LAST, so they sit on top of the drawing
  const hits = {};
  [1, 2, 3, 4].forEach(q => {
    const b = BOX[q];
    const n = svgEl("rect", {
      x: b.x + 3, y: b.y + 3, width: b.w - 6, height: b.h - 6, rx: 8,
      class: "hit", "data-shape": "fill", "data-id": String(q),
    });
    n.addEventListener("click", () => tap(q));
    svg.appendChild(n);
    hits[q] = n;
  });
  wrap.appendChild(svg);

  const btnRow = el("div", "tc-buttons");
  let noRefBtn = null, submitBtn = null;

  if (noRef) {
    noRefBtn = el("button", "btn ghost small tc-noref", "no reference angle");
    noRefBtn.type = "button";
    noRefBtn.addEventListener("click", () => {
      if (locked) return;
      ticked = [];
      norefOn = true;
      paint();
      noRefBtn.classList.add("is-on");
      submit("noref");
    });
    btnRow.appendChild(noRefBtn);
  }
  if (!single) {
    submitBtn = el("button", "btn primary tc-submit", "Submit ✓");
    submitBtn.type = "button";
    submitBtn.addEventListener("click", () => { if (!locked) submit(ticked.slice()); });
    btnRow.appendChild(submitBtn);
  }
  if (btnRow.children.length) wrap.appendChild(btnRow);

  host.appendChild(wrap);

  function paint() {
    [1, 2, 3, 4].forEach(q => {
      const on = ticked.includes(q);
      tickNodes[q].style.display = on ? "" : "none";
      hits[q].classList.toggle("is-ticked", on);
    });
  }

  function tap(q) {
    if (locked) return;
    norefOn = false;
    if (noRefBtn) noRefBtn.classList.remove("is-on");     // ticking un-highlights "no reference angle"
    if (single) {
      ticked = [q];
      paint();
      submit(ticked.slice());
      return;
    }
    ticked = ticked.includes(q) ? ticked.filter(v => v !== q) : ticked.concat(q);
    ticked.sort((a, b) => a - b);
    paint();
  }

  function submit(value) {
    onSubmit && onSubmit(value);
  }

  function disable() {
    locked = true;
    svg.querySelectorAll(".hit").forEach(n => n.classList.add("locked"));
    if (noRefBtn) noRefBtn.disabled = true;
    if (submitBtn) submitBtn.disabled = true;
  }
  function enable() {
    locked = false;
    svg.querySelectorAll(".hit").forEach(n => n.classList.remove("locked", "show-correct", "show-wrong"));
    norefOn = false;
    if (noRefBtn) { noRefBtn.disabled = false; noRefBtn.classList.remove("is-on"); }
    if (submitBtn) submitBtn.disabled = false;
  }
  function reset() { ticked = []; norefOn = false; paint(); if (noRefBtn) noRefBtn.classList.remove("is-on"); }

  /* after marking: green on every quadrant that SHOULD have a tick,
     red on any quadrant that was ticked but shouldn't be. */
  function reveal(correct) {
    const want = Array.isArray(correct) ? correct : [];
    [1, 2, 3, 4].forEach(q => {
      if (want.includes(q)) hits[q].classList.add("show-correct");
      else if (ticked.includes(q)) hits[q].classList.add("show-wrong");
    });
  }

  return {
    get value() { return norefOn ? "noref" : ticked.slice(); },
    svg, reset, disable, enable, reveal,
  };
}
