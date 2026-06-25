/* ============================================================
   NUMBER KEYPAD  (the only typed input in the game)
   ------------------------------------------------------------
   On-screen keys only — no device keyboard. Digits, a decimal
   COMMA, a minus (when negatives are allowed), delete, submit.
   Shows the value with a comma; a pasted point becomes a comma.
   mountKeypad(host, { unit, allowNeg, onSubmit }) -> { value, clear }
   ============================================================ */
import { el } from "./ui.js";
import { parseNum } from "./check.js";

export function mountKeypad(host, opts = {}) {
  const { unit = "", allowNeg = false, onSubmit } = opts;
  let buf = "";   // e.g. "-8,2"

  const wrap = el("div", "keypad");
  const disp = el("div", "kdisp empty");
  disp.innerHTML = `<span class="kval">0</span>${unit ? `<span class="unit">${unit}</span>` : ""}`;
  const valEl = disp.querySelector(".kval");
  wrap.appendChild(disp);

  function paint() {
    valEl.textContent = buf === "" || buf === "-" ? (buf === "-" ? "-" : "0") : buf;
    disp.classList.toggle("empty", buf === "" );
  }
  function press(k) {
    if (k === "del") buf = buf.slice(0, -1);
    else if (k === "neg") buf = buf.startsWith("-") ? buf.slice(1) : "-" + buf;
    else if (k === ",") { if (!buf.includes(",") && buf !== "" && buf !== "-") buf += ","; }
    else { if (buf.replace("-", "").replace(",", "").length < 6) buf += k; }   // length guard
    paint();
  }

  const grid = el("div", "kgrid");
  const addKey = (label, cls, fn) => { const b = el("button", "key" + (cls ? " " + cls : ""), label); b.type = "button"; b.addEventListener("click", fn); grid.appendChild(b); return b; };

  ["7","8","9","4","5","6","1","2","3"].forEach(d => addKey(d, "", () => press(d)));
  addKey(",", "", () => press(","));
  addKey("0", "", () => press("0"));
  addKey("⌫", "del", () => press("del"));
  if (allowNeg) addKey("±", "", () => press("neg"));
  addKey("Submit ✓", "submit" + (allowNeg ? " wide2" : " wide"), () => {
    const v = parseNum(buf);
    onSubmit && onSubmit(v, buf);
  });
  // when negatives are allowed the submit spans the remaining 2 cols
  if (allowNeg) grid.lastChild.style.gridColumn = "span 2";

  wrap.appendChild(grid);
  host.appendChild(wrap);
  paint();

  return {
    get value() { return parseNum(buf); },
    get raw() { return buf; },
    clear() { buf = ""; paint(); },
    disable() { grid.querySelectorAll(".key").forEach(b => b.disabled = true); },
  };
}
