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

/* ============================================================
   DOUBLE TICK  (her round-8 teaching move, ruling 2026-08-22 evening:
   "the idea was actually to have the kids MAKE the 2 ticks")
   ------------------------------------------------------------
   One cross, three beats, all on screen at once:
     pass A — tick every quadrant the RATIO'S SIGN allows   (green ✓, left)
     pass B — tick every quadrant the INTERVAL allows       (blue ✓, right)
     pass C — tap the quadrant that carries BOTH ticks
   A wrong pass calls onMiss() (the step shows its hint and counts the
   miss) and that pass's ticks clear for another go; the earlier pass's
   ticks stay. onSubmit(q) fires with the final quadrant.
   mountDoubleTick(host, { passes:[{prompt, correct}, {prompt, correct}],
                           finalPrompt, onMiss, onSubmit })
   ============================================================ */
export function mountDoubleTick(host, opts = {}) {
  const { passes = [], finalPrompt = "Tap the quadrant with TWO ticks.", onMiss, onSubmit } = opts;
  const wrap = el("div", "tapcross doubletick");
  const label = el("p", "tc-pass-prompt", "");
  wrap.appendChild(label);
  const svg = svgEl("svg", { class: "sg tc", viewBox: `0 0 ${VB} ${VB}`, role: "img", preserveAspectRatio: "xMidYMid meet", "data-mid": String(MID) });
  svg.appendChild(svgEl("line", { class: "tc-axis", x1: MID - ARM - 8, y1: MID, x2: MID + ARM + 8, y2: MID }));
  svg.appendChild(svgEl("line", { class: "tc-axis", x1: MID, y1: MID - ARM - 8, x2: MID, y2: MID + ARM + 8 }));
  const ticks = { a: {}, b: {} };
  [1, 2, 3, 4].forEach(q => {
    const b = BOX[q];
    ["a", "b"].forEach((col, i) => {
      const t = svgEl("text", { class: `tc-tick ${col}`, x: b.x + b.w / 2 + (i ? 22 : -22), y: b.y + b.h / 2, "text-anchor": "middle", "dominant-baseline": "middle", "data-tick": `${col}${q}` });
      t.textContent = "✓"; t.style.display = "none"; svg.appendChild(t); ticks[col][q] = t;
    });
  });
  const hits = {};
  [1, 2, 3, 4].forEach(q => {
    const b = BOX[q];
    const n = svgEl("rect", { x: b.x + 3, y: b.y + 3, width: b.w - 6, height: b.h - 6, rx: 8, class: "hit", "data-shape": "fill", "data-id": String(q) });
    n.addEventListener("click", () => tap(q));
    svg.appendChild(n); hits[q] = n;
  });
  wrap.appendChild(svg);
  const row = el("div", "tc-buttons");
  const submitBtn = el("button", "btn primary tc-submit", "Submit ✓"); submitBtn.type = "button";
  submitBtn.addEventListener("click", () => submitPass());
  row.appendChild(submitBtn); wrap.appendChild(row);
  host.appendChild(wrap);

  let pass = 0;               // 0 = A, 1 = B, 2 = final tap
  let cur = [];               // this pass's ticks
  let locked = false;
  const col = () => (pass === 0 ? "a" : "b");
  wrap.dataset.pass = "0";

  function showPrompt() {
    label.innerHTML = pass < 2 ? `<span class="tc-pass ${col()}">${pass === 0 ? "1" : "2"}</span> ${passes[pass].prompt}` : `<span class="tc-pass c">3</span> ${finalPrompt}`;
    submitBtn.hidden = pass === 2;
    wrap.dataset.pass = String(pass);
  }
  function paint() {
    [1, 2, 3, 4].forEach(q => { ticks[col()][q].style.display = cur.includes(q) ? "" : "none"; hits[q].classList.toggle("is-ticked", cur.includes(q)); });
  }
  function tap(q) {
    if (locked) return;
    if (pass === 2) {
      locked = true;
      hits[q].classList.add(q === opts.correct ? "show-correct" : "show-wrong");
      if (q !== opts.correct) { onMiss && onMiss(); locked = false; setTimeout(() => hits[q].classList.remove("show-wrong"), 600); return; }
      svg.querySelectorAll(".hit").forEach(n => n.classList.add("locked"));
      onSubmit && onSubmit(q);
      return;
    }
    cur = cur.includes(q) ? cur.filter(v => v !== q) : cur.concat(q).sort((x, y) => x - y);
    paint();
  }
  function submitPass() {
    if (locked || pass >= 2) return;
    const want = (passes[pass].correct || []).slice().sort((x, y) => x - y);
    const ok = want.length === cur.length && want.every((v, i) => v === cur[i]);
    if (!ok) { onMiss && onMiss(); cur = []; paint(); return; }
    // lock this pass's ticks in place and move on
    [1, 2, 3, 4].forEach(q => hits[q].classList.remove("is-ticked"));
    pass += 1; cur = []; showPrompt();
  }
  showPrompt();
  return {
    svg,
    get value() { return pass; },
    disable() { locked = true; svg.querySelectorAll(".hit").forEach(n => n.classList.add("locked")); submitBtn.disabled = true; },
  };
}
