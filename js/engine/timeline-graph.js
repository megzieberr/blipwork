/* ============================================================
   TIMELINE ENGINE  (time value of money)
   ------------------------------------------------------------
   A to-scale financial timeline: equally-spaced nodes T0..Tn, an
   amount placed on a node, and optional arrows showing a move
   (forward = ×(1+i), backward = ÷(1+i)). Like the stats engine it
   exposes compute / render / verify, and every node sits at a
   position derived from ONE linear scale, so the picture can't lie
   about how many periods lie between two points.

   spec: {
     type:"timeline", n,                       // nodes T0..Tn
     nodes:[ {t, amount?|label?, dp?, role?, id?, out?} ],
                                                // labels above a node; role "P"|"A"|"".
                                                // TWO entries may share one t (f8's
                                                // same-day deposit and total): their
                                                // labels STACK upwards, never overlapping.
                                                // out: true (f10, 2026-10-10): a WITHDRAWAL,
                                                // money OUT of savings. Its amount is drawn
                                                // with a leading minus, "−R2 000", in its own
                                                // colour (.tl-out); the minus is part of the
                                                // label, so every width, fit and overlap
                                                // check measures it.
     arc?:{ from, to, label?, dir? },           // a single curved arrow from→to
     title?, w?, h?,
     tap?:{ targets:[t...], correctId:t },      // optional tap-a-node question
     tapLabels?: true                           // f8 (2026-10-10): the learner taps an
                                                // AMOUNT, not a tick. Every amount label
                                                // gets a hit box (geo.labels[k].hit), keyed
                                                // by its entry's `id`; the question's
                                                // q.tap = { targets:[ids], correctId:id }.
     meet?: t,                                  // f9 (2026-10-10): the MEETING DAY, the one
                                                // T every amount is moved to. A flag on a
                                                // pole above that node with the words
                                                // "meeting day", a ring on the axis, and
                                                // its T label in the flag's colour.
     roads?: [ {from, to, rate, k?} ],          // f9: RATE ROADS. Each segment of the axis
                                                // is drawn in its own colour (road j wears
                                                // .tl-road-j) with its rate text ("8% p.a.")
                                                // written under it. One road = one colour; a
                                                // rate change = the road changes colour. k is
                                                // carried for the quest, never drawn.
     leaders?: true,                            // f9 review 1: a thin dashed line from each LONE
                                                // amount label (no role letter under it) down
                                                // to its own tick.
     stackLeaders?: true,                       // f10 review 1: a leader from each amount STACKED
                                                // above another on one node (the last deposit on
                                                // the day of A, above the "?" ring), down BESIDE
                                                // the stack and in to its own tick; the flag pole
                                                // then stops POLE_AIR above that amount.
   }
   Colours come from CSS (.tl-*); the per-quest accent is the --accent
   CSS var inherited from the screen.

   STACKING (2026-10-10, f8). A node carrying k amount labels draws them
   STACK units apart, bottom one at the old height (cy − 38), and the
   frame grows by (k − 1)·STACK at the top so the highest label lands
   exactly where a single label always sat. A spec with no shared t
   (every round before f8) computes byte-for-byte the old geometry.

   TAP BOXES GET AIR (f8 review 1, 2026-10-10). At a 360-px phone the
   two boxes of a stack touched and the top one was 29 px tall, and
   boxes on neighbouring days sat 2.7 px apart. Now: the boxes of a
   stack share one width (edges line up) and are each TAP_H tall with
   TAP_GAP between them; any two boxes keep TAP_AIR apart sideways.
   verifyTimeline asserts the minimums in PHONE pixels (TAP_MIN). A
   tap stack holds TWO labels (f8's same-day deposit and total); a
   third would not fit its box, and verify would say so.

   MEETING DAY AND ROADS (2026-10-10, f9 "Car or no car?"). The flag
   lives in the band above the amount labels (the same band an arc
   uses; f9 draws no arcs), so it never grows the frame: its pole drops
   from the flag to just above the highest thing on its node. The road
   labels get their own lane under the T labels, and only then does the
   frame grow (ROAD_LANE, at the bottom, so everything above it keeps
   its old y). A spec with neither key computes and renders byte-for-
   byte what it did before. verifyTimeline measures the flag, the
   "meeting day" words and every road label against the amounts, the
   role letters, the T labels and each other. A payment may share the
   total's day (the last deposit on the day of A): the total is then the
   BOTTOM label of the stack, right above its role letter, and verify
   says so if a role letter ever sits under somebody else's label.

   F9 REVIEW 1 (2026-10-10, her ruling: the total is a different KIND of
   thing from a payment). A "?" label that carries a role letter is the
   total: it draws in the accent colour inside a thin ring, its role
   letter (accent too) right under it, and its measured ink box IS the
   ring (labelInk), so every fit and overlap check measures the ring.
   f4 and f5 draw their "?" totals the same way. A road's rate never sits
   under the flagged T label: it slides along its own road (at an end of
   the line, into the empty margin past it) to the nearest place clear of
   that label, and verify measures it there.

   F10 REVIEW 1 (2026-10-10, spec.stackLeaders). A deposit stacked above
   the "?" ring on the meeting day read like a caption of the flag. Its
   leader now runs from just under it, straight down BESIDE the ring and
   the role letter (SLEAD_AIR clear of both), then in to the top of its
   own tick, so it reads as an amount on that day. The flag pole stops
   POLE_AIR above it instead of 3 units. verifyTimeline asserts that each
   stack leader starts under its own amount, ends on its own tick, and
   that no stretch of it crosses an amount, the ring, a role letter, a
   T label, a road rate, the flag, its words or its pole. A spec without
   the key computes and renders byte-for-byte what it did before.
   ============================================================ */
import { rand } from "../finlib.js";

const N = v => Math.round(v * 10) / 10;
const STACK = 34;            // vertical step between two amount labels stacked on one node
/* tap boxes (spec.tapLabels), in viewBox units */
const TAP_H = 46;            // each box of a stack: 46 → 42 px tall at a 360-px phone
const TAP_GAP = 8;           // air between the two boxes of a stack: 8 → 7.3 px
const TAP_AIR = 7;           // air between boxes on neighbouring nodes: 7 → 6.4 px
/* a 360-wide timeline draws 328 px wide in the question card at a 360-px
   viewport (measured 2026-10-10: 0.911×). verify checks tap boxes at that
   size against TAP_MIN, the minimums in real phone pixels. */
export const PHONE_360 = 0.911;
export const TAP_MIN = { h: 40, air: 6 };
const GLYPH = 6.3;           // ≈0.6 × 10.5px per glyph: the width estimate the clamp has always used
/* the estimated ink box of an amount label around its baseline (10.5px bold) */
const INK_UP = 9, INK_DOWN = 3;
/* f9: the meeting-day flag and the rate roads, in viewBox units */
const SMALL_GLYPH = 5.9;     // ≈0.62 × 9.5px bold: "meeting day" and the road rate text
const SMALL_UP = 8, SMALL_DOWN = 3;
const T_GLYPH = 6;           // the T labels (10px)
const T_UP = 8, T_DOWN = 3;
const ROLE_W = 8, ROLE_UP = 9, ROLE_DOWN = 2;   // the role letter (11px bold)
const ROAD_LANE = 14;        // the frame grows this much at the bottom when roads are drawn
const ROAD_Y = 36;           // road label baseline, below the axis (the T labels sit at +20)
const FLAG_TOP = 5, FLAG_H = 9, FLAG_W = 11;     // the pennant
const MEET_Y = 15;           // baseline of the words "meeting day"
const MEET_TEXT = "meeting day";
/* f9 review 1: the total's ring, the road rates' distance from the flagged
   T label, and the leader lines, in viewBox units */
const Q_R = 6.5;             // the ring around a "?" total (10.5px bold "?": ~6.3 wide, ~7.7 tall)
const Q_DY = 3.8;            // its centre above the label baseline (half the "?"'s cap height)
const Q_STROKE = 0.6;        // half the ring's stroke (CSS .tl-qring, 1.2)
const MEET_AIR = 4;          // sideways air between a road's rate and the flagged T label
const LEAD_GAP = 2;          // air between a leader line and its label, and its tick
/* f10 review 1 (spec.stackLeaders), in viewBox units */
const SLEAD_AIR = 5;         // a stack leader's air beside the labels and role letter below its amount
const POLE_AIR = 7;          // the flag pole's air above a stacked amount on the meeting day

function svgWrap(W, H, accent, inner, cls = "") {
  const style = accent ? ` style="--accent:${accent}"` : "";
  return `<svg class="sg tl ${cls}" viewBox="0 0 ${W} ${H}" role="img" preserveAspectRatio="xMidYMid meet"${style}>${inner}</svg>`;
}
const line = (x1, y1, x2, y2, cls) => `<line class="${cls}" x1="${N(x1)}" y1="${N(y1)}" x2="${N(x2)}" y2="${N(y2)}"/>`;
const text = (x, y, s, cls, anchor = "middle") => `<text class="${cls}" x="${N(x)}" y="${N(y)}" text-anchor="${anchor}">${s}</text>`;

/* how many amount labels the busiest node carries */
function maxStack(spec) {
  const per = new Map();
  (spec.nodes || []).forEach(d => {
    if (d.label == null && d.amount == null) return;
    if (!(d.t >= 0 && d.t <= spec.n)) return;
    per.set(d.t, (per.get(d.t) || 0) + 1);
  });
  return Math.max(1, ...per.values());
}

export function computeTimeline(spec) {
  const n = spec.n;
  const extra = (maxStack(spec) - 1) * STACK;
  const roadLane = Array.isArray(spec.roads) && spec.roads.length ? ROAD_LANE : 0;   // f9: 0 without roads
  const W = spec.w || 360, H = (spec.h || 132) + extra + roadLane;
  const L = 26, R = 26;
  const cy = H - 46 - roadLane;              // axis baseline, leaving room for T-labels below
  const span = (W - L - R);
  const xAt = t => L + (n === 0 ? 0 : (t / n) * span);
  const gap = n > 0 ? span / n : span;
  const nodes = [];
  for (let t = 0; t <= n; t++) nodes.push({ t, x: xAt(t), label: `T${t}`, labels: [] });
  // decorate nodes that carry an amount/role. node.amount / amountLabel /
  // role keep their old meaning (the node's FIRST entry); every entry's
  // label also lands in node.labels, in spec order, bottom of the stack first.
  (spec.nodes || []).forEach(d => {
    const node = nodes[d.t];
    if (!node) return;
    // f10: a withdrawal (d.out) carries its minus in the label itself, "−R2 000"
    const amountLabel = d.label != null ? d.label : (d.amount != null ? (d.out ? "−" : "") + rand(d.amount, d.dp ?? 2) : null);
    if (!node.decorated) {
      node.decorated = true;
      node.amount = d.amount;
      node.amountLabel = amountLabel;
    }
    node.role = node.role || d.role || "";
    if (amountLabel != null) node.labels.push({ d, text: String(amountLabel) });
  });
  // one entry per drawn amount label, in draw order (node by node, bottom up)
  const labels = [];
  nodes.forEach(node => {
    node.labels = node.labels.map(({ d, text: s }, j, arr) => {
      // f9 review 1: the total ("?" with a role letter) wears a ring, and its width is the ring's
      const ring = s === "?" && !!d.role;
      const w = ring ? 2 * (Q_R + Q_STROKE) : s.length * GLYPH, half = w / 2;
      // clamp the centred label into the viewBox (end nodes can carry labels wider than the margin)
      const x = Math.max(half + 2, Math.min(W - half - 2, node.x));
      const lb = {
        id: d.id != null ? String(d.id) : `${node.t}.${j}`,
        t: node.t, j, levels: arr.length, nodeX: node.x,
        x, y: cy - 38 - j * STACK, w, text: s, amount: d.amount, role: d.role || "", ring,
        out: !!d.out && d.label == null && d.amount != null,
      };
      labels.push(lb);
      return lb;
    });
  });
  // hit boxes for tappable amount labels: as wide as the label plus a margin
  // but never closer than TAP_AIR to the next node's box; every box on one
  // node shares the widest one's edges, so a stack lines up. A lone label's
  // box reaches from just above its tick up past the label; a stack is
  // TAP_H-tall boxes, bottom one down to the tick, TAP_GAP between them.
  if (spec.tapLabels) {
    const halfCap = (gap - TAP_AIR) / 2;
    nodes.forEach(node => {
      if (!node.labels.length) return;
      const spans = node.labels.map(lb => {
        const half = Math.min(halfCap, Math.max(lb.w / 2 + 6, 18));
        return [Math.max(1, lb.x - half), Math.min(W - 1, lb.x + half)];
      });
      const x0 = Math.min(...spans.map(s => s[0])), x1 = Math.max(...spans.map(s => s[1]));
      node.labels.forEach(lb => {
        const bottom = cy - 8 - (lb.levels > 1 ? lb.j * (TAP_H + TAP_GAP) : 0);
        const top = lb.levels > 1 ? bottom - TAP_H : Math.max(2, lb.y - 26);
        lb.hit = { x: x0, y: top, w: x1 - x0, h: bottom - top };
      });
    });
  }
  // f9: the rate roads, one colour each, the rate written under the middle
  // of its road (clamped into the frame like an amount label). f9 review 1:
  // never directly under the flagged T label. The rate slides to the nearer
  // spot just clear of it, its centre still over its own road, its ink on
  // its own road or in the empty margin past an end of the line.
  const meetNode = spec.meet != null ? nodes[spec.meet] : null;
  const roads = (Array.isArray(spec.roads) ? spec.roads : []).map((r, j) => {
    const x0 = xAt(r.from), x1 = xAt(r.to), mid = (x0 + x1) / 2;
    const s = String(r.rate == null ? "" : r.rate), w = s.length * SMALL_GLYPH, half = w / 2;
    let x = Math.max(half + 2, Math.min(W - half - 2, mid));
    if (meetNode) {
      const keep = meetNode.label.length * T_GLYPH / 2 + MEET_AIR + half;
      if (Math.abs(x - meetNode.x) < keep) {
        const lo = (r.from === 0 ? 2 : x0) + half, hi = (r.to === n ? W - 2 : x1) - half;
        const spots = [meetNode.x - keep, meetNode.x + keep]
          .filter(c => c >= lo && c <= hi && c >= x0 && c <= x1)
          .sort((a, b) => Math.abs(a - mid) - Math.abs(b - mid));
        if (spots.length) x = spots[0];
      }
    }
    return { j, from: r.from, to: r.to, rate: s, k: r.k, x0, x1, cls: j % 3, label: { x, y: cy + ROAD_Y, w, text: s } };
  });
  // f9: the meeting day. The words sit right of the pole, or left of it
  // when the right edge is too close; the pole stops just above the
  // highest thing its node carries (an amount, else the role, else the tick)
  let meet = null;
  if (spec.meet != null && nodes[spec.meet]) {
    const node = nodes[spec.meet], mx = node.x;
    const w = MEET_TEXT.length * SMALL_GLYPH;
    const side = mx + FLAG_W + 4 + w <= W - 2 ? 1 : -1;
    const top = node.labels.length ? labelInk(node.labels[node.labels.length - 1]).y0
      : node.role ? cy - 24 - ROLE_UP : cy - 6;
    const air = spec.stackLeaders && node.labels.length > 1 ? POLE_AIR : 3;   // f10 review 1: clear of a stacked amount
    meet = {
      t: node.t, x: mx, side,
      pole: { x: mx, y0: FLAG_TOP - 1, y1: top - air },
      flag: { x0: side > 0 ? mx : mx - FLAG_W, x1: side > 0 ? mx + FLAG_W : mx, y0: FLAG_TOP, y1: FLAG_TOP + FLAG_H },
      text: { x: mx + side * (FLAG_W + 4), y: MEET_Y, w, anchor: side > 0 ? "start" : "end", text: MEET_TEXT },
    };
  }
  // f9 review 1 (spec.leaders): a leader from each LONE amount label (no role
  // letter under it, no stack) down to its own tick
  const leaders = spec.leaders ? nodes.filter(nd => nd.labels.length === 1 && !nd.role).map(nd => {
    const lb = nd.labels[0];
    return { t: nd.t, x1: lb.x, y1: labelInk(lb).y1 + LEAD_GAP, x2: nd.x, y2: cy - 6 - LEAD_GAP };
  }) : [];
  // f10 review 1 (spec.stackLeaders): each amount stacked ABOVE another on one
  // node gets a leader: straight down beside everything under it (on the side
  // facing the middle of the line), then in to the top of its own tick
  const stackLeaders = spec.stackLeaders ? nodes.filter(nd => nd.labels.length > 1).flatMap(nd => {
    const side = nd.x > W / 2 ? -1 : 1;
    return nd.labels.slice(1).map(lb => {
      const under = nd.labels.slice(0, lb.j).map(labelInk);
      const reach = Math.max(nd.role ? ROLE_W / 2 : 0, ...under.map(b => (side < 0 ? nd.x - b.x0 : b.x1 - nd.x)));
      const xv = nd.x + side * (reach + SLEAD_AIR);
      const bend = nd.role ? cy - 24 + ROLE_DOWN + SLEAD_AIR : Math.max(...under.map(b => b.y1)) + SLEAD_AIR;
      return { t: nd.t, j: lb.j, pts: [[xv, labelInk(lb).y1 + LEAD_GAP], [xv, bend], [nd.x, cy - 6 - LEAD_GAP]] };
    });
  }) : [];
  return { type: "timeline", n, W, H, L, R, cy, xAt, gap, nodes, labels, roads, meet, leaders, stackLeaders };
}

/* f9: verify's ink models of the things the flag and the roads must not
   touch, and of the flag and road labels themselves */
export function tLabInk(g, node) {
  const w = node.label.length * T_GLYPH;
  return { x0: node.x - w / 2, x1: node.x + w / 2, y0: g.cy + 20 - T_UP, y1: g.cy + 20 + T_DOWN };
}
export function roleInk(g, node) {
  return { x0: node.x - ROLE_W / 2, x1: node.x + ROLE_W / 2, y0: g.cy - 24 - ROLE_UP, y1: g.cy - 24 + ROLE_DOWN };
}
export function roadInk(rd) {
  const l = rd.label;
  return { x0: l.x - l.w / 2, x1: l.x + l.w / 2, y0: l.y - SMALL_UP, y1: l.y + SMALL_DOWN };
}
export function meetInks(m) {
  const t = m.text;
  return {
    flag: { x0: m.flag.x0, x1: m.flag.x1, y0: m.flag.y0, y1: m.flag.y1 },
    text: { x0: m.side > 0 ? t.x : t.x - t.w, x1: m.side > 0 ? t.x + t.w : t.x, y0: t.y - SMALL_UP, y1: t.y + SMALL_DOWN },
    pole: { x0: m.pole.x - 0.7, x1: m.pole.x + 0.7, y0: m.pole.y0, y1: m.pole.y1 },
  };
}

export function renderTimeline(spec) {
  const g = computeTimeline(spec);
  let out = "";

  // baseline + end caps
  out += line(g.xAt(0), g.cy, g.xAt(g.n), g.cy, "tl-axis");

  // f9: the rate roads, over the plain axis and under the ticks
  g.roads.forEach(rd => { out += line(rd.x0, g.cy, rd.x1, g.cy, `tl-road tl-road-${rd.cls}`); });

  // ticks + T-labels + node decorations
  const meetT = g.meet ? g.meet.t : null;
  g.nodes.forEach(node => {
    out += line(node.x, g.cy - 6, node.x, g.cy + 6, "tl-tick");
    out += text(node.x, g.cy + 20, node.label, node.t === meetT ? "tl-tlab tl-tmeet" : "tl-tlab");
    if (node.role) out += text(node.x, g.cy - 24, node.role, "tl-role");
    node.labels.forEach(lb => {
      if (!lb.ring) { out += text(lb.x, lb.y, lb.text, lb.out ? "tl-amt tl-out" : "tl-amt"); return; }   // f10: a withdrawal in its own colour
      // the total: "?" in the accent colour inside its ring (f9 review 1)
      out += `<g class="tl-qmark"><circle class="tl-qring" cx="${N(lb.x)}" cy="${N(lb.y - Q_DY)}" r="${Q_R}"/>${text(lb.x, lb.y, lb.text, "tl-amt tl-q")}</g>`;
    });
  });
  // f9 review 1: the leader lines (spec.leaders)
  g.leaders.forEach(l => { out += line(l.x1, l.y1, l.x2, l.y2, "tl-lead"); });
  // f10 review 1: a stacked amount's leader, down beside the stack and in to its tick
  g.stackLeaders.forEach(l => { out += `<polyline class="tl-lead tl-slead" fill="none" points="${l.pts.map(([x, y]) => `${N(x)},${N(y)}`).join(" ")}"/>`; });

  // f9: the meeting day: a ring on the axis, a pole, a pennant, the words
  if (g.meet) {
    const m = g.meet, f = m.flag;
    out += `<circle class="tl-meetdot" cx="${N(m.x)}" cy="${N(g.cy)}" r="4"/>`;
    out += line(m.pole.x, m.pole.y0, m.pole.x, m.pole.y1, "tl-pole");
    const tipX = m.side > 0 ? f.x1 : f.x0;
    out += `<path class="tl-flag" d="M ${N(m.x)} ${N(f.y0)} L ${N(tipX)} ${N((f.y0 + f.y1) / 2)} L ${N(m.x)} ${N(f.y1)} Z"/>`;
    out += text(m.text.x, m.text.y, m.text.text, "tl-meet", m.text.anchor);
  }
  // f9: each road's rate, written under its own stretch of road
  g.roads.forEach(rd => { out += text(rd.label.x, rd.label.y, rd.label.text, `tl-roadlab tl-roadlab-${rd.cls}`); });

  // optional arc (a curved arrow from→to)
  if (spec.arc) {
    const a = spec.arc;
    const x1 = g.xAt(a.from), x2 = g.xAt(a.to);
    const dir = a.dir || (a.to >= a.from ? "fwd" : "back");
    const top = g.cy - 54;                                  // arc apex height
    const cxm = (x1 + x2) / 2;
    // quadratic arc above the line
    out += `<path class="tl-arc" d="M ${N(x1)} ${N(g.cy - 12)} Q ${N(cxm)} ${N(top)} ${N(x2)} ${N(g.cy - 12)}" fill="none"/>`;
    // arrowhead at the destination, pointing in the travel direction
    const ax = x2, ay = g.cy - 12, s = 6;
    const tipDx = dir === "back" ? -1 : 1;
    out += `<path class="tl-arrow" d="M ${N(ax)} ${N(ay)} L ${N(ax - tipDx * s)} ${N(ay - s)} L ${N(ax - tipDx * s)} ${N(ay + s - 4)} Z"/>`;
    if (a.label) out += text(cxm, top - 4, a.label, "tl-arclab");
  }

  if (spec.title) out += text(g.W / 2, g.H - 6, spec.title, "tl-title");
  return svgWrap(g.W, g.H, spec.accent, out, (spec.tap || spec.tapLabels) ? "tl-tappable" : "");
}

/* the estimated ink box of one amount label (verify's model of it) */
export function labelInk(lb) {
  if (lb.ring) {                                  // the total's ring, stroke included (f9 review 1)
    const cyR = lb.y - Q_DY, e = Q_R + Q_STROKE;
    return { x0: lb.x - e, x1: lb.x + e, y0: cyR - e, y1: cyR + e };
  }
  return { x0: lb.x - lb.w / 2, x1: lb.x + lb.w / 2, y0: lb.y - INK_UP, y1: lb.y + INK_DOWN };
}
const overlaps = (a, b, m = 0) => a.x0 < b.x1 - m && b.x0 < a.x1 - m && a.y0 < b.y1 - m && b.y0 < a.y1 - m;
const boxOf = h => ({ x0: h.x, x1: h.x + h.w, y0: h.y, y1: h.y + h.h });

export function verifyTimeline(spec, tol = 0.5) {
  const g = computeTimeline(spec), r = [];
  // 1) correct number of nodes
  r.push({ label: `${g.n + 1} nodes drawn (T0..T${g.n})`, ok: g.nodes.length === g.n + 1 });
  // 2) nodes are EQUALLY spaced (to scale) — every gap matches the first
  const gaps = [];
  for (let i = 1; i < g.nodes.length; i++) gaps.push(g.nodes[i].x - g.nodes[i - 1].x);
  const even = gaps.every(d => Math.abs(d - gaps[0]) <= tol);
  r.push({ label: "all periods equally spaced", ok: even && gaps[0] > 0 });
  // 3) node index reads back from its pixel via the same scale
  g.nodes.forEach(node => {
    const back = g.n * (node.x - g.xAt(0)) / (g.xAt(g.n) - g.xAt(0));
    r.push({ label: `${node.label} reads back as T${Math.round(back)}`, ok: Math.abs(back - node.t) <= tol });
  });
  // 4) arc endpoints are in range and the arrow points the stated way
  if (spec.arc) {
    const a = spec.arc;
    const inRange = a.from >= 0 && a.from <= g.n && a.to >= 0 && a.to <= g.n;
    const dir = a.dir || (a.to >= a.from ? "fwd" : "back");
    const dirOk = (dir === "fwd" && a.to >= a.from) || (dir === "back" && a.to <= a.from);
    r.push({ label: `arc T${a.from}→T${a.to} in range and points ${dir}`, ok: inRange && dirOk });
  }
  // 5) no two amount labels overlap — neighbours on the line, or two
  //    amounts stacked on one node (f8's same-day deposit and total)
  if (g.labels.length > 1) {
    const clash = [];
    for (let i = 0; i < g.labels.length; i++)
      for (let j = i + 1; j < g.labels.length; j++)
        if (overlaps(labelInk(g.labels[i]), labelInk(g.labels[j]), 0.5)) clash.push(`"${g.labels[i].text}" × "${g.labels[j].text}"`);
    const stacked = g.nodes.filter(nd => nd.labels.length > 1).map(nd => `T${nd.t}`);
    r.push({ label: `${g.labels.length} amount labels, none overlapping${stacked.length ? ` (stacked on ${stacked.join(", ")})` : ""}${clash.length ? ": " + clash.join("; ") : ""}`, ok: clash.length === 0 });
  }
  // 6) tappable labels: every label has a unique id and a hit box that sits
  //    in the frame, holds its own label, is big enough for a finger
  //    (TAP_MIN.h phone px tall), keeps TAP_MIN.air phone px from every
  //    other box (so a tap is never ambiguous), and the boxes of a stack
  //    share their left and right edges and their height
  if (spec.tapLabels) {
    const ids = g.labels.map(lb => lb.id);
    r.push({ label: `${ids.length} tappable amount labels, ids unique`, ok: ids.length > 0 && new Set(ids).size === ids.length });
    const bad = [];
    g.labels.forEach(lb => {
      const h = lb.hit;
      if (!h) { bad.push(`"${lb.text}" has no hit box`); return; }
      const hb = boxOf(h), ink = labelInk(lb);
      if (hb.x0 < -tol || hb.x1 > g.W + tol || hb.y0 < -tol || hb.y1 > g.H + tol) bad.push(`"${lb.text}" hit box leaves the frame`);
      if (!(hb.x0 <= ink.x0 + tol && hb.x1 >= ink.x1 - tol && hb.y0 <= ink.y0 + tol && hb.y1 >= ink.y1 - tol)) bad.push(`"${lb.text}" hit box does not hold its label`);
      if (h.w < 28 || h.h * PHONE_360 < TAP_MIN.h - 0.01) bad.push(`"${lb.text}" hit box only ${N(h.w)}×${N(h.h)} (${N(h.h * PHONE_360)} px tall at 360)`);
    });
    for (let i = 0; i < g.labels.length; i++)
      for (let j = i + 1; j < g.labels.length; j++) {
        const a = g.labels[i].hit, b = g.labels[j].hit;
        if (!a || !b) continue;
        const A = boxOf(a), B = boxOf(b);
        const air = Math.max(A.x0 - B.x1, B.x0 - A.x1, A.y0 - B.y1, B.y0 - A.y1);
        if (air * PHONE_360 < TAP_MIN.air - 0.01) bad.push(`hit boxes of "${g.labels[i].text}" and "${g.labels[j].text}" only ${N(air * PHONE_360)} px apart at 360`);
      }
    g.nodes.filter(nd => nd.labels.length > 1).forEach(nd => {
      const [a, ...rest] = nd.labels.map(lb => lb.hit).filter(Boolean);
      if (a && rest.some(b => Math.abs(b.x - a.x) > 0.01 || Math.abs(b.w - a.w) > 0.01 || Math.abs(b.h - a.h) > 0.01))
        bad.push(`stacked boxes on T${nd.t} differ in edges or height`);
    });
    r.push({ label: `every amount label has its own finger-sized hit box${bad.length ? ": " + bad.join("; ") : ""}`, ok: bad.length === 0 });
  }
  // 6b) a role letter on a SHARED day (f9, 2026-10-10: the last deposit on
  //     the day of A) belongs to the bottom label of the stack, the one it
  //     sits right under, and to no other label on that node
  g.nodes.filter(nd => nd.labels.length > 1 && nd.role).forEach(nd => {
    const own = nd.labels[0].role === nd.role && nd.labels.slice(1).every(lb => !lb.role);
    r.push({ label: `on T${nd.t} the role ${nd.role} belongs to the bottom label of the stack ("${nd.labels[0].text}"), the one right above it`, ok: own });
  });
  // 6c) the total's ring (f9 review 1) holds the "?", and stays clear of the
  //     role letter right under it
  g.labels.filter(lb => lb.ring).forEach(lb => {
    const nd = g.nodes[lb.t], ink = labelInk(lb);
    const clear = !nd.role || !overlaps(ink, roleInk(g, nd), 0);
    const holds = ink.x0 <= lb.x - GLYPH / 2 && ink.x1 >= lb.x + GLYPH / 2 && ink.y0 <= lb.y - INK_UP + 1 && ink.y1 >= lb.y;
    r.push({ label: `the total "?" on T${lb.t} sits in its ring, clear of its role letter ${nd.role || ""}`, ok: clear && holds });
  });
  // 6d) a withdrawal (f10, spec node out: true) is a real amount drawn with
  //     its minus in front, "−R2 000", and is never the total (no role letter
  //     of its own). Its box (minus included) is measured by checks 5 and 9.
  g.labels.filter(lb => lb.out).forEach(lb => {
    const ok = lb.text === "−" + rand(lb.amount, (spec.nodes.find(d => d.out && d.t === lb.t && d.amount === lb.amount) || {}).dp ?? 2)
      && lb.amount > 0 && !lb.role;
    r.push({ label: `the withdrawal on T${lb.t} is drawn "${lb.text}", minus in front, and is not the total`, ok });
  });
  // the things a flag or a road label must never touch (f9)
  const inFrame = b => b.x0 >= -tol && b.x1 <= g.W + tol && b.y0 >= -tol && b.y1 <= g.H + tol;
  const others = () => {
    const o = g.labels.map(lb => ({ what: `amount "${lb.text}"`, box: labelInk(lb) }));
    g.nodes.forEach(nd => {
      o.push({ what: `T label ${nd.label}`, box: tLabInk(g, nd) });
      if (nd.role) o.push({ what: `role ${nd.role} on T${nd.t}`, box: roleInk(g, nd) });
    });
    if (spec.arc && spec.arc.label) {
      const a = spec.arc, xm = (g.xAt(a.from) + g.xAt(a.to)) / 2, w = String(a.label).length * T_GLYPH, y = g.cy - 58;
      o.push({ what: "the arc label", box: { x0: xm - w / 2, x1: xm + w / 2, y0: y - T_UP, y1: y + T_DOWN } });
    }
    return o;
  };
  // 7) the meeting day (f9): a real node, the pole on it by the same scale,
  //    flag and words inside the frame and clear of every label
  if (spec.meet != null) {
    const m = g.meet;
    const real = !!m && Number.isInteger(spec.meet) && spec.meet >= 0 && spec.meet <= g.n;
    r.push({ label: `meeting day T${spec.meet} is a node on the line`, ok: real });
    if (real) {
      const back = g.n * (m.pole.x - g.xAt(0)) / (g.xAt(g.n) - g.xAt(0));
      r.push({ label: `the meeting-day flag stands on T${m.t} (reads back as T${Math.round(back)})`, ok: Math.abs(back - m.t) <= tol });
      const ink = meetInks(m), bad = [];
      if (!inFrame(ink.flag) || !inFrame(ink.text) || !inFrame(ink.pole)) bad.push("leaves the frame");
      if (!(ink.pole.y1 - ink.pole.y0 >= 6)) bad.push("pole too short");
      if (!(ink.text.y0 <= ink.flag.y1 && ink.flag.y0 <= ink.text.y1)) bad.push("the words are not beside the flag");
      const parts = [["flag", ink.flag], ["words", ink.text], ["pole", ink.pole]];
      others().concat(g.roads.map(rd => ({ what: `road label "${rd.label.text}"`, box: roadInk(rd) })))
        .forEach(o => parts.forEach(([nm, b]) => { if (overlaps(b, o.box, 0.5)) bad.push(`${nm} touches ${o.what}`); }));
      r.push({ label: `"${MEET_TEXT}" flag clear of every label${bad.length ? ": " + bad.join("; ") : ""}`, ok: bad.length === 0 });
    }
  }
  // 8) the rate roads (f9): whole-T segments in order, never overlapping, a
  //    colour change only where the rate changes, each rate written under
  //    its OWN road, inside the frame, clear of every label and each other
  if (Array.isArray(spec.roads) && spec.roads.length) {
    const bad = [];
    spec.roads.forEach((rd, j) => {
      if (!(Number.isInteger(rd.from) && Number.isInteger(rd.to) && rd.from >= 0 && rd.to <= g.n && rd.from < rd.to)) bad.push(`road ${j} T${rd.from}–T${rd.to} is not a stretch of the line`);
      if (j > 0 && rd.from < spec.roads[j - 1].to) bad.push(`roads ${j - 1} and ${j} overlap`);
      if (j > 0 && rd.from === spec.roads[j - 1].to && String(rd.rate) === String(spec.roads[j - 1].rate)) bad.push(`roads ${j - 1} and ${j} change colour without a rate change`);
    });
    r.push({ label: `${spec.roads.length} rate road${spec.roads.length > 1 ? "s" : ""}, in order, one colour each${bad.length ? ": " + bad.join("; ") : ""}`, ok: bad.length === 0 });
    const fit = [], all = others();
    if (g.meet) all.push({ what: `"${MEET_TEXT}"`, box: meetInks(g.meet).text });
    g.roads.forEach((rd, j) => {
      const b = roadInk(rd);
      if (!inFrame(b)) fit.push(`"${rd.label.text}" leaves the frame`);
      // its centre over its own road; its ink on its own road, or in the empty margin past an end of the line
      const lo = rd.from === 0 ? 0 : rd.x0, hi = rd.to === g.n ? g.W : rd.x1;
      if (b.x0 < lo - tol || b.x1 > hi + tol || rd.label.x < rd.x0 - tol || rd.label.x > rd.x1 + tol) fit.push(`"${rd.label.text}" is not under its own road (T${rd.from}–T${rd.to})`);
      // f9 review 1: never directly under the flagged meeting-day T label
      if (g.meet) {
        const tm = tLabInk(g, g.nodes[g.meet.t]);
        if (b.x0 < tm.x1 + MEET_AIR - 1 && tm.x0 - MEET_AIR + 1 < b.x1) fit.push(`"${rd.label.text}" sits under the flagged T${g.meet.t}`);
      }
      all.forEach(o => { if (overlaps(b, o.box, 0.5)) fit.push(`"${rd.label.text}" touches ${o.what}`); });
      g.roads.slice(j + 1).forEach(o => { if (overlaps(b, roadInk(o), 0.5)) fit.push(`"${rd.label.text}" × "${o.label.text}"`); });
    });
    r.push({ label: `every road's rate sits under its own road, clear of every label and of the flagged T${fit.length ? ": " + fit.join("; ") : ""}`, ok: fit.length === 0 });
  }
  // 9) the leader lines (f9 review 1): each runs from its lone amount down to
  //    its own tick, and crosses no label, role letter, T label, road rate or flag
  if (g.leaders.length) {
    const bad = [];
    const things = [
      ...g.labels.map(lb => ({ what: `amount "${lb.text}"`, box: labelInk(lb) })),
      ...g.nodes.map(nd => ({ what: `T label ${nd.label}`, box: tLabInk(g, nd) })),
      ...g.nodes.filter(nd => nd.role).map(nd => ({ what: `role ${nd.role} on T${nd.t}`, box: roleInk(g, nd) })),
      ...g.roads.map(rd => ({ what: `road label "${rd.label.text}"`, box: roadInk(rd) })),
    ];
    if (g.meet) { const mi = meetInks(g.meet); things.push({ what: "the flag", box: mi.flag }, { what: `"${MEET_TEXT}"`, box: mi.text }, { what: "the flag pole", box: mi.pole }); }
    g.leaders.forEach(l => {
      const nd = g.nodes[l.t];
      const b = { x0: Math.min(l.x1, l.x2) - 0.5, x1: Math.max(l.x1, l.x2) + 0.5, y0: Math.min(l.y1, l.y2), y1: Math.max(l.y1, l.y2) };
      if (Math.abs(l.x2 - nd.x) > tol || !(l.y2 < g.cy - 6) || l.y2 - l.y1 < 4) bad.push(`the leader on T${l.t} does not run down to its own tick`);
      things.forEach(o => { if (overlaps(b, o.box, 0)) bad.push(`the leader on T${l.t} crosses ${o.what}`); });
    });
    r.push({ label: `${g.leaders.length} leader line${g.leaders.length > 1 ? "s" : ""}, each from its amount down to its own T, crossing no label${bad.length ? ": " + bad.join("; ") : ""}`, ok: bad.length === 0 });
  }
  // 10) the stack leaders (f10 review 1): each starts right under its own
  //     stacked amount, ends on the top of its own tick, and no stretch of it
  //     crosses an amount (the "?" ring included), a role letter, a T label, a
  //     road rate, the flag, its words or its pole; the pole keeps POLE_AIR
  //     above the top amount of a stacked meeting day
  if (g.stackLeaders.length) {
    const bad = [];
    const things = [
      ...g.labels.map(lb => ({ what: lb.ring ? `the ring around "${lb.text}"` : `amount "${lb.text}"`, box: labelInk(lb) })),
      ...g.nodes.map(nd => ({ what: `T label ${nd.label}`, box: tLabInk(g, nd) })),
      ...g.nodes.filter(nd => nd.role).map(nd => ({ what: `role ${nd.role} on T${nd.t}`, box: roleInk(g, nd) })),
      ...g.roads.map(rd => ({ what: `road label "${rd.label.text}"`, box: roadInk(rd) })),
    ];
    if (g.meet) { const mi = meetInks(g.meet); things.push({ what: "the flag", box: mi.flag }, { what: `"${MEET_TEXT}"`, box: mi.text }, { what: "the flag pole", box: mi.pole }); }
    g.stackLeaders.forEach(l => {
      const nd = g.nodes[l.t], lb = nd.labels[l.j], ink = labelInk(lb), p = l.pts, end = p[p.length - 1];
      if (!(p[0][0] > ink.x0 && p[0][0] < ink.x1 && p[0][1] > ink.y1 && p[0][1] - ink.y1 <= LEAD_GAP + tol)) bad.push(`the leader of "${lb.text}" does not start right under it`);
      if (Math.abs(end[0] - nd.x) > tol || !(end[1] < g.cy - 6) || g.cy - 6 - end[1] > LEAD_GAP + tol) bad.push(`the leader of "${lb.text}" does not end on its own tick T${l.t}`);
      for (let i = 1; i < p.length; i++) {
        const b = { x0: Math.min(p[i - 1][0], p[i][0]) - 0.5, x1: Math.max(p[i - 1][0], p[i][0]) + 0.5, y0: Math.min(p[i - 1][1], p[i][1]), y1: Math.max(p[i - 1][1], p[i][1]) };
        things.forEach(o => { if (overlaps(b, o.box, 0)) bad.push(`the leader of "${lb.text}" crosses ${o.what}`); });
      }
    });
    if (g.meet) {
      const nd = g.nodes[g.meet.t];
      if (nd.labels.length > 1 && !(labelInk(nd.labels[nd.labels.length - 1]).y0 - g.meet.pole.y1 >= POLE_AIR - tol)) bad.push(`the flag pole comes within ${POLE_AIR} of "${nd.labels[nd.labels.length - 1].text}"`);
    }
    r.push({ label: `${g.stackLeaders.length} stacked amount${g.stackLeaders.length > 1 ? "s" : ""} with a leader down beside the stack to its own T, crossing no label, ring or flag; the pole stays clear${bad.length ? ": " + bad.join("; ") : ""}`, ok: bad.length === 0 });
  }
  return r;
}
