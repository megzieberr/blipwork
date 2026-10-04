# Casio fx-991ZA PLUS II: how the real calculator behaves (probe 2026-10-03)

Measured key by key on Megan's own fx-991ZA PLUS II emulator on Saturday night,
3 October 2026 (about 160 screens read). Nothing here is from memory or docs. This
file is the SPEC for rebuilding Blipwork's calculator (`js/calculator.js`). Earlier
device facts (STAT 1-VAR menus, FREQ walk, template arrows, 6÷2(1+2) = 1) are in
the comments of `js/calculator.js` and still hold.

Her rulings from tonight:
- Copy the calculator exactly. Functions school learners will not use may be skipped.
- Her emulator has never been changed from factory settings, and a factory reset
  confirmed it: **Norm 2, TABLE asks f(X) and g(X), STAT FREQ off, MthIO, Deg,
  improper fractions (d/c)**. Blipwork copies these defaults.
- Priority areas she named: the ALPHA key, the arrow-edit wipe, trig, exponents,
  SHIFT SOLVE, MODE 7 TABLE, MODE 5 EQN.

## For Megan, in plain words

The two things you reported:
1. **ALPHA does nothing** because no code was ever written for it. The key is just a
   picture. The real ALPHA types the red letters (A to F, X, Y, M), plus "=" and ":".
2. **The arrow-edit wipe:** after you press =, Blipwork still thinks "an answer is on
   the screen", so the next digit starts a fresh sum. The real Casio forgets the answer
   the moment you press ◀ or ▶ and lets you fix the sum.

Bigger gaps I found that learners will bump into:
- `sin(30` without the closing bracket gives Syntax ERROR in Blipwork. The Casio just
  closes the bracket for you. This one alone probably trips learners every day.
- Typing `3` then the fraction key: the Casio puts the 3 ON TOP of the fraction.
  Blipwork puts an empty fraction after the 3 (which then means 3 times it).
- SOLVE, CALC, TABLE (mode 7), EQN (mode 5), the ▲ history, log, ln, π, x⁻¹, x!, %,
  and the M memory are all missing.
- Some exact answers differ: the Casio shows 4^(−½) = ½ and sin 15° = (√6 − √2)/4.
  Blipwork shows decimals there.

In short: the rebuild is bigger than one evening. It splits naturally into about seven
builds (listed at the end), each its own fresh session. Start with the two you reported.

---

## 1. Editing, cursor and history (fixes her reported wipe)

- The cursor is a vertical bar. Typing always INSERTS at the cursor (MthIO has no
  overwrite).
- **DEL deletes the character to the LEFT of the cursor.**
- After a result:
  - **◀ puts the cursor at the END of the expression**, the result disappears, and
    you are editing. Typing inserts at the cursor.
  - **▶ puts the cursor at the START** of the expression, same edit state.
  - **DEL does nothing at all** (screen unchanged). Blipwork currently clears the line.
  - A digit, a prefix key (√, sin, (, (−), log, π ...) starts a FRESH line.
  - **Postfix keys chain from Ans**, exactly like + − × ÷ already do:
    x² → `Ans²`, x^ → `Ans^□`, x⁻¹ → `Ans⁻¹`. (Blipwork resets on x², which gives a
    lone "²" and then Syntax ERROR.) x³, x!, % are postfix too and should chain the same
    way (not separately tested).
  - S⇔D and °'" act ON the result (toggle its form), they do not start a new line.
- **History (replay):** after any =, a small **▲** shows at the top right of the
  status line. ▲ shows the previous calculation WITH its result; ▲ again goes older,
  ▼ newer. Inside the history the indicator shows **▲▼**. ◀/▶ on a history entry edits
  it; = makes a new entry.
- **AC clears the screen but keeps the history.** After AC:
  - ◀ or ▶ recalls the LAST expression in edit mode (no result).
  - ▲ shows the last calculation with its result.
- **AC screen = empty line plus cursor, no "0" anywhere.** Blipwork shows a 0 under an
  empty line; the device does not.
- Long input scrolls left; a **◀ marker at the left edge** shows hidden content.
- History contains normal = results, CALC results and RCL lines. **SOLVE runs are NOT
  added to history.**

## 2. ALPHA, variables, STO, RCL, memory

- ALPHA lights a boxed **A** at the far left of the status line (SHIFT lights a boxed
  **S** in the same spot). ALPHA is ONE-SHOT: the next key types its red letter, then
  ALPHA switches off.
- Red letters (read off the key face; Blipwork's key table already has most of them):
  (−) → A, °'" → B, hyp → C, sin → D, cos → E, tan → F, ) → **X**, S⇔D → **Y**,
  M+ → **M**, CALC → **=**, ∫ → **:** (colon), ×10^x → **e**.
  Blipwork's FUNC_KEYS is missing the red "=" on CALC and ":" on ∫, and the red "e"
  exists on ×10^x but the key is dead.
- ALPHA then a key with no red letter (e.g. 7): nothing is typed, ALPHA switches off.
- ALPHA ALPHA: off. SHIFT then ALPHA: ALPHA on, SHIFT off.
- Every variable starts at 0 (`A` = gives 0).
- **STO:** type a value, SHIFT RCL (the word **STO** appears in the status line), then
  the letter key (no ALPHA needed). Screen shows `5→A` and the result 5 at once; no =.
- **RCL:** RCL (word **RCL** appears), then the letter key. Screen shows `A` on the
  input line and its value as the result. It goes into the history.
- Variables multiply implicitly like brackets do: `2A²` with A=5 gives 50 (the square
  binds to A first, then the 2 multiplies). The implicit-multiply triggers must include
  variables, π and e.
- **M memory:** `5 M+` shows `5M+` with result 5 (M+ evaluates like =, then adds to M).
  An **M** indicator sits in the status line while M is not 0. SHIFT M+ = M−
  (`2M−`). RCL M+ shows `M` and its value.

## 3. Errors

- Three-line error screens, exactly this layout:
  `Syntax ERROR` / `[AC] :Cancel` / `[◀][▶]:Goto`
  Same for `Math ERROR`, `Can't Solve`, `Insufficient MEM`.
- The ▲ history indicator hides on an error screen.
- On an error screen only AC, ◀ and ▶ do anything; other keys are ignored.
- **◀ or ▶ (Goto) returns to the expression with the cursor placed just BEFORE the
  token that caused the error.** Example: `2+×3+4` = gives Syntax ERROR; ◀ puts the
  cursor between + and ×, so one DEL removes the +.
- Seen: tan(90 → Math ERROR; ((−)4)^0,5 → Math ERROR; sin⁻¹ of more than 1 → Math ERROR;
  `(2+3)4` → Syntax ERROR (a NUMBER straight after ")" is NOT implicit ×, Blipwork
  already agrees); `2+3)` → Syntax ERROR.

## 4. Brackets and auto-close (very important)

- **Missing ")" at the end is fine: the device closes every open bracket.**
  `sin(30` = gives ½. `(2+3` = gives 5. `log(100` = gives 2.
- So `sin(30+1` means sin(31) = 0,5150380749 (the open bracket swallows the rest).
- `sin(30)+1` = 3/2.
- Blipwork today throws Syntax ERROR whenever a function or "(" is left open
  (`parseAtom` demands ")"). Fix: at the END of the top-level box (and at the end of
  each template box), treat missing ")" as closed.

## 5. Trig (Deg)

- Function keys insert `sin(`, `cos(`, `tan(`; SHIFT gives `sin⁻¹(` etc. (raised −1).
- Exact results for **multiples of 15°**, otherwise decimals:
  sin(30 = ½ · tan(30 = √3/3 · cos(150 = −√3/2 · sin(−30 = −½ ·
  **sin(15 = (√6 − √2)/4** · **tan(15 = 2 − √3** · sin(18 = 0,3090169944 (decimal).
  tan(90 = Math ERROR.
- Inverse: sin⁻¹(0,5 = 30 · sin⁻¹(√3÷2 = 60 · tan⁻¹(2 = 63,43494882 · cos⁻¹(−0,5 = 120.
- `sin(30)²` = ¼ · `2sin(30` = 1 · `sin(30)cos(60` = ¼ · `10÷sin(30` = 20.
- SHIFT sin right after a result starts a fresh `sin⁻¹(` (does NOT use Ans).
- Negative numbers typed with (−) show a short raised "-", different from the
  subtraction "−". Results use the same short "-".
- Blipwork's special-angle table covers 30/45/60 multiples only. Adding the 15°
  family needs a **two-term surd value type** (see section 7).

## 6. Exponents and roots

- x^ after a base opens an empty exponent box (small dotted square, raised). The cursor
  goes inside; ▶ leaves it.
- 2^10 = 1024 · 2^(−1) = ½ · 4^(½) = 2 · 8^(⅔) = 4 · 4^0,5 = 2.
- **A fraction or decimal exponent gives a DECIMAL unless the answer is rational:**
  2^0,5 = 1,414213562 and 2^(½) = 1,414213562 (not √2), BUT
  **4^(−½) = ½ and 27^(−⅔) = 1/9** (stacked fractions). Blipwork shows 0,5 and
  0,1111111111 here. Fix: for exponent p/q with a rational base, take the exact q-th
  root when numerator and denominator are perfect q-th powers.
- Whole-number powers keep surds: (√2)^3 = 2√2, and (√2)³ via x³ = 2√2.
- **(−8)^(⅓) = −2** (odd root of a negative works). Blipwork gives Math ERROR
  (Math.pow returns NaN). ((−)4)^0,5 = Math ERROR.
- (−)2 x² = −4 (shows `-2²`); ((−)2)² = 4.
- Power key twice nests: `2 x^ 3 x^ 2` puts the second exponent inside the first:
  2^(3²) = 512.
- ³√ (SHIFT √): ³√27 = 3. ˣ√ (SHIFT x^): template with the INDEX box first (small,
  upper left), then the radicand. ⁴√16 = 2.
- 10^□ (SHIFT log): 10³ = 1000. e^□ (SHIFT ln): e¹ = 2,718281828.

## 7. Exact answers and display rules

- Decimal INPUT still gives exact output: 0,5 + 0,25 = ¾ · √0,5 = √2/2 ·
  2,5×10⁻³ = 1/400.
- Surd answers can have TWO terms: √2 + √3 shows **√3+√2** (bigger root first),
  1/(√2+1) shows **−1+√2** (whole number first), roots of x²−2x−1 show 1+√2 and 1−√2.
- Surd limit: √999 = 3√111 (exact), √1001 = 31,63858404 (decimal). Roughly: the
  number under the root must stay below 1000 after simplifying.
- **Fraction size limit: digits(top) + digits(bottom) + 1 must be 10 or less.**
  1234÷56789 = 1234/56789 (4+5+1 = 10). 12345÷67891 = 0,1818355894 (11, so decimal).
  Blipwork shows any fraction at all; it needs this limit.
- Decimals show 10 significant digits, rounded: 2/3 → 0,6666666667;
  12345÷678901 = 0,01818379999.
- **π forms:** 2π = 2π. π÷2 shows as **½π** (the stacked fraction FIRST, then π).
  π+1 = 4,141592654 (decimal). S⇔D on 2π gives 6,283185307.
- **Big numbers:** 2^40 = 1,099511628×10¹². The "×10" is small and the power is
  raised. More than 10 digits switches to this form.
- **Small numbers (Norm 2, the factory setting):** 1÷2000 = 1/2000, S⇔D gives
  **0,0005** (not 5×10⁻⁴). Norm 2 only switches below 10⁻⁹. (Norm 1 would show
  5×10⁻⁴; she does not need it.)
- Fix mode (SHIFT MODE 6, then 0 to 9): a **FIX** tag shows in the status line. It
  only rounds DECIMAL display: 2÷3 = still ⅔, S⇔D → 0,67; sin(40 = 0,64.
- S⇔D toggles fraction/surd ↔ decimal. SHIFT S⇔D toggles improper ↔ mixed.

## 8. Fractions and which keys "grab" what is before them

- **▫/▫ after a typed operand GRABS it as the numerator; the cursor lands in the
  denominator.**
  - `3` then ▫/▫ → 3/□
  - `2+3` then ▫/▫ → 2 + 3/□ (only the last number)
  - `(2+3)` then ▫/▫ → (2+3)/□ (the whole bracket group)
  - `2²` then ▫/▫ → 2²/□
  - `sin(30)` then ▫/▫ → sin(30)/□
  - On an empty line, or right after an operator: an empty □/□, cursor in the top.
- **√ does NOT grab:** `9` then √ → 9√□ (implicit ×).
- **ˣ√ DOES grab, as the index:** `5` then SHIFT x^ → ⁵√□.
- x^ obviously takes the previous operand as its base.
- Mixed number: SHIFT ▫/▫ gives a template with a whole box, then top and bottom.
  1¾ = gives **7/4** (results are improper by default). S⇔D → 1,75. SHIFT S⇔D → 1¾.
  100÷3 = 100/3; SHIFT S⇔D → 33⅓.
- INS (SHIFT DEL) in MthIO: the cursor changes shape; the next template key wraps
  ONLY the next operand (`2+3`, cursor at start, INS, √ → √2+3). Rarely used.

## 9. Other keys learners use

- log key → `log(` function: log(100 = 2.
- log□ key → `log□(□)` template, BASE box first (low, small), then into the bracket
  (the closing bracket is part of the template): log₂(8) = 3.
- ln key → `ln(`. ALPHA ×10^x = the constant e. ln(e = 1.
- SHIFT ×10^x = π.
- ×10^x key inserts ONE small "×10" glyph (not a template); the digits after it are
  typed inline: `3×10 5` = 300000.
- x⁻¹: 2, =, x⁻¹ → Ans⁻¹ = ½.
- x! = SHIFT x⁻¹: 5! = 120.
- nCr = SHIFT ÷: `5C2` = 10 (special C sign). nPr = SHIFT ×: `5P2` = 20.
- % = SHIFT (: postfix, divides by 100: `20%×50` = 10.
- Abs = SHIFT hyp: template |□| with straight bars: |−5| = 5.
- °'" key: `30°15°` shows `30°15'`, = gives **30°15'0"**; °'" pressed on that result
  gives 30,25 (and back).
- Skipped as not school use: hyp, CONST, CONV, ∫, d/dx, Σ, Pol, Rec, GCD, LCM, ÷R, Rnd,
  Ran#, RanInt, ENG, DRG▶, PreAns, CMPLX, BASE-N, MATRIX, VECTOR, DIST, RATIO.

## 10. CALC (plug a value into a letter)

- Type an expression with letters, press CALC. Screen: `X?` top left, the letter's
  current value bottom right.
- Typing a number shows it big at top left (the old value stays bottom right until =).
- = with nothing typed keeps the shown value.
- Several letters: prompts in the ORDER THEY APPEAR in the expression
  (`AX+B` asks A?, then X?, then B?). Typed values are stored in the letters.
- After the answer, = (or CALC) asks again from the first letter, so the learner can
  try the next value. AC leaves.
- CALC answers ARE added to the history.

## 11. SOLVE (SHIFT CALC)

- Works with or without "=" (ALPHA CALC). Without "=" it solves expression = 0.
- SHIFT CALC → screen `Solve for X`, with X's CURRENT value bottom right as the start
  guess. Typing replaces the guess (shown big top left). = solves.
- Answer screen, three lines in the small font:
  line 1 the equation, line 2 `X=` with the value right-aligned, line 3 `L−R=` with
  the difference right-aligned (0 when exact).
  - X²−4 from 0 → X= 2 · from −5 → X= −2
  - 1000(1,08)^X=2000 → X= 9,006468342, L−R= 0
  - 2X+1=7 → X= 3
- **X keeps the answer** (RCL X shows it), so the next SOLVE starts from it.
- = on the answer screen → back to `Solve for X` with the new X as the guess.
- ◀ on the answer screen → back to the equation, editable.
- AC → blank screen.
- No answer (X²+1): `Can't Solve` / `[AC] :Cancel` / `[◀][▶]:Goto`. ◀ returns to the
  equation.
- SOLVE runs are NOT in the history.
- Root choice: the device finds the root reached from the starting guess (Newton-style).
  From 0 on X²−4 it found +2. A secant/Newton from the current X, with a "Can't Solve"
  fallback when it does not converge, matches this.

## 12. TABLE (MODE 7)

- Screen `f(X)=` with cursor. X is typed with ALPHA ).
- = → `g(X)=` (factory setting asks both). Leaving g(X) empty and pressing = skips it.
- = → `Start?` (default 1) → `End?` (default 5) → `Step?` (default 1). Each prompt
  shows the current value bottom right; typing shows big top left. **Start, End and
  Step remember the last values used.**
- Table screen: a narrow column of small row numbers, then **X | F(X)** (and **G(X)**
  when g was given), vertical lines between columns, a heading row. **3 rows visible.**
  The selected cell is in reverse colours AND its column heading lights up. The bottom
  line shows the selected cell's full value, big and right-aligned.
- Starts on row 1, X column. ▶ goes to F(X) (then G(X)). ▼ moves down, scrolling one
  row at a time.
- ▼ past the last row shows an empty lit row; typing there does nothing.
- **View only:** typing on any row does nothing.
- Cells show DECIMALS and are CUT OFF, not rounded, to about 6 characters
  (⅔ shows `0,6666`); the bottom line shows the rounded full value 0,6666666667.
  2^X from −2 shows 0,25 / 0,5 / 1 (bottom also 0,25, not ¼).
- Example f(X)=X²−2X−3 from −2 to 4: (−2, 5) (−1, 0) (0, −3) (1, −4) (2, −3) (3, 0) (4, 5).
- **Row limit 20** (with the f and g setting). 21 rows → `Insufficient MEM` /
  `[AC] :Cancel` / `[◀][▶]:Goto`; ◀ goes back to `f(X)=` with the function kept.
- AC in the table → back to `f(X)=<function>` with the cursor at the START of the
  function. AC again clears it to an empty `f(X)=`.

## 13. EQN (MODE 5)

- Menu, four plain lines: `1:anX+bnY=cn` / `2:anX+bnY+cnZ=dn` / `3:aX²+bX+c=0` /
  `4:aX³+bX²+cX+d=0`.
- Picking a type opens the coefficient grid with **every coefficient 0** (picking the
  mode again always resets them).
- Grid: headings `a b c` (`a b c d` for the cubic), matrix brackets `[ ]`, row numbers
  1, 2 at the far left for the systems (none for one-row types). The selected cell is
  reversed; its value shows big bottom right. The cubic's 4 columns do not fit, so the
  view slides sideways.
- Typing shows the number at the BOTTOM LEFT; the cell keeps its old value until =.
- **= with something typed:** stores it and moves RIGHT (a → b → c), wrapping to the
  next row's a. On the very last cell it stores and stays.
- **= with nothing typed (any cell): SOLVES.** The arrows move without changing a cell.
  (Note: STAT walks DOWN on =; EQN walks RIGHT.)
- Answers, one per screen: label top left, value big bottom right, with ▼ / ▲▼ / ▲
  showing what is above and below. = steps forward, ▲ steps back. After the last
  answer, = goes back to the grid (cell a, numbers kept). AC also goes back to the grid.
  Typing digits on an answer screen does nothing. S⇔D works on answers.
- 2x+3y=13, x−y=−1 → `X=` 2, `Y=` 3.
- Quadratic x²−5x+6 → `X₁=` 3, `X₂=` 2, `X-Value Minimum=` 5/2, `Y-Value Minimum=` −¼.
  **The bigger root is X₁.**
- −x²+4x−3 → X₁= 3, X₂= 1, `X-Value Maximum=` 2, `Y-Value Maximum=` 1 (Maximum when
  a is negative).
- x²−2x−1 → X₁= 1+√2, X₂= 1−√2 (exact). S⇔D on X₂ → −0,4142135624.
- No real roots, x²+x+1 → X₁= −½+(√3/2)i, X₂= −½−(√3/2)i, then the min/max lines as
  usual. **There is no "no real roots" message**; the "i" is how a learner sees it.
- Double root x²−4x+4 → a single `X=` 2 (no 1 or 2 underneath), then the min/max lines.
- Cubic x³−6x²+11x−6 → X₁= 1, X₂= 3, X₃= 2 (NOT in size order: it seems to find one
  root first, then the other two bigger first). No turning points for cubics.

## 14. INEQ (MODE ▼ 2), for Gr11 quadratic inequalities (optional)

- `1:aX²+bX+c` / `2:aX³+bX²+cX+d`, then `1:aX²+bX+c>0` / `2:<0` / `3:≥0` / `4:≤0`.
- Grid `[a b c]` with the chosen inequality written under it; same = rules as EQN.
- x²−5x+6<0 → top `A<X<B`, bottom `2<X<3`.
- x²−5x+6>0 → top `X<A;B<X`, bottom `X<2;3<X` (a SEMICOLON, because the comma is the
  decimal sign).

## 15. STAT regression (Gr12 line of best fit)

- MODE 3 menu, two columns: `1:1-VAR 2:A+BX / 3:_+CX² 4:ln X / 5:e^X 6:A·B^X /
  7:A·X^B 8:1/X`.
- A+BX grid: columns **X | Y** (FREQ off). = walks DOWN the X column; entering an X
  fills its Y with 0. ▶ goes to Y on the same row; ▲ back to row 1 for the Y values.
- SHIFT 1 for two-variable data: `1:Type 2:Data / 3:Sum 4:Var / 5:Reg 6:MinMax`
  (1-VAR has 5:Distr instead).
- 5:Reg → `1:A 2:B / 3:r 4:x̂ / 5:ŷ`.
- Picking one PASTES the token onto an EDITABLE line with the cursor after it (the
  learner can keep typing), and = evaluates. The previous answer stays bottom right
  until =. Blipwork pastes a fixed line today.
- X 1,2,3,4 / Y 2,4,5,8 → A = 0, B = 1,9, r = 0,981155781 (decimals).
- `5ŷ` (type 5, then SHIFT 1 5 5) = 9,5 (the predicted y when x = 5).

## 16. Menus and screens to correct

- **MODE** is two pages, two columns, digits in reversed boxes:
  page 1 `1:COMP 2:CMPLX / 3:STAT 4:BASE-N / 5:EQN 6:MATRIX / 7:TABLE 8:VECTOR` with ▼;
  page 2 `1:DIST 2:INEQ / 3:RATIO` with ▲. (Blipwork: 7 items, no page 2.)
- **SETUP** (SHIFT MODE) page 1: `1:MthIO 2:LineIO / 3:Deg 4:Rad / 5:Gra 6:Fix /
  7:Sci 8:Norm` with ▼; page 2: `1:ab/c 2:d/c / 3:CMPLX 4:STAT / 5:TABLE 6:APO /
  7:◀CONT▶`. (Blipwork page 1 is missing 8:Norm.)
  Sub-prompts: `Fix 0~9?`, `Norm 1~2?`, `Select Type?` / `1:f(x)` / `2:f(x),g(x)`.
  None show the current choice. AC cancels without changing.
- **CLR** (SHIFT 9): title `Clear?`, then `1:Setup 2:Memory` / `3:All`. 3 →
  `Reset All?` / `[=] :Yes` / `[AC] :Cancel`. = → centred `Reset All` /
  `Press [AC] key` (lower-case k, corrected by §19.8), and AC returns to COMP. (Blipwork
  has no title and skips the last screen.)
- Status-line words: boxed S / A at the far left, then M, STO, RCL, STAT, FIX; D on the
  right next to `Math`; ▲ / ▼ / ▲▼ at the far right.

## 17. Where Blipwork's code stands (read tonight, nothing changed)

- `js/calculator.js` (986 lines). ALPHA: `press("alpha")` falls through `compKey` and
  does nothing. CALC, x⁻¹, log□, log, ln, °'", hyp, RCL, ENG, M+, ×10^x are `dead: true`.
  SHIFT on x^, ▫/▫, S⇔D, (, ) maps to `noop`.
- The wipe: `compKey` resets the line when `S.result != null` and a digit arrives;
  `moveHoriz` never clears `S.result`. Fix: ◀/▶/DEL-after-result rules from section 1.
- Auto-close: `parseAtom` throws SyntaxErr when ")" is missing after `func` or "(".
- Fraction grab: `insertTemplate` always inserts an empty template at the cursor.
- Values: `rat`, single-term `surd`, `float`. Needs: two-term surds, π multiples, the
  fraction size limit, exact rational powers, odd roots of negatives, Norm 2 / Fix
  formatting, ×10 display.
- Stats Quest copies `js/calculator.js` verbatim (master copy is Blipwork), so every
  calculator build should be re-copied there afterwards.
- `calculator.js` sits in the static app shell; it will grow a lot. Worth splitting into
  an engine module and lazy mode modules (TABLE, EQN, SOLVE) behind `lazyImport`.
  Remember the sw CACHE bump (`python tools/sw_check.py` must print OK).

## 18. Suggested build order (one unit per worker, each a fresh session)

1. **Editing + history + ALPHA + variables** (her two reports): ◀/▶/DEL after a
   result, ▲▼ history with the indicator, AC recall, no "0" on an empty line, ALPHA
   one-shot with all red letters, variables A–F X Y M, STO, RCL, M+/M−, implicit ×
   with letters.
2. **Parser and display**: auto-close brackets, fraction-key grab (and ˣ√ index grab),
   Ans-chaining for postfix keys, error Goto cursor, fraction size limit, Norm 2 and
   ×10 display, 10 significant digits.
3. **Exact maths**: two-term surds (15° trig family, √3+√2, −1+√2), exact rational
   powers (4^(−½) = ½), odd roots of negatives, π forms (½π).
4. **More keys**: log, log□, ln, 10^□, e^□, π, e, ×10^x, x⁻¹, x!, nCr, nPr, %, Abs, °'",
   mixed fractions, SHIFT S⇔D, Fix, INS.
5. **CALC + SOLVE** (sections 10 and 11).
6. **TABLE** (section 12).
7. **EQN** (section 13), then optionally INEQ (section 14).
8. **STAT regression** (section 15) and the menu corrections (section 16).

Each build: test against the examples in this file (they are the device's own answers),
then `tools/sw_check.py`, then copy `calculator.js` to Stats Quest.

## 19. Second probe, Sun 2026-10-04 morning (after her phone test of sw v93)

Her reports from the live app, each measured on the emulator (factory settings except
STAT FREQ was ON). Nothing built yet; build plan at the end.

### 19.1 GCD and LCM (her ask: they must work; §9 had skipped them)
- ALPHA × → `GCD(`. ALPHA ÷ → `LCM(`. The separator is SHIFT ) and it shows as `;`
  (the decimal comma is taken). Blipwork's key table already labels these (red GCD/LCM,
  shift `;`); only the behaviour is missing.
- `GCD(12;18` = 6 (closing bracket optional, the screen keeps the line as typed).
  `LCM(4;6` = 12. `GCD(−12;18)+1` = 7 (negatives fine, answer positive).
- Exactly two arguments: `GCD(12;18;24` → **Syntax ERROR**.
- A non-whole argument: `GCD(12,5;3` → **Argument ERROR**, a new error screen with the
  usual layout: `Argument ERROR` / `[AC] :Cancel` / `[◀][▶]:Goto`. (Blipwork has no
  Argument ERROR yet.)

### 19.2 STAT data editor (her report: no wrap, no "which line am I on")
Measured on 1-VAR with FREQ on (X 5, 7, 9) and on A+BX.
- Rows are 1…n plus ONE open row (n+1). **▼ on the open row wraps to row 1. ▲ on row 1
  wraps to the open row.** Same in the FREQ and Y columns. (Blipwork `statNav` clamps.)
- The selected cell is drawn **inverted: a solid dark cell with light digits, steady, not
  blinking.** Its full value also shows **bottom right** of the screen (e.g. `7`). The
  screen shows three data rows and scrolls to keep the cursor row in view. (Blipwork
  `renderTable` only wraps the cell in `<u>`, which reads as no cursor at all on a phone.)
- Typing: the bottom-right value disappears and the typed number shows **bottom LEFT with
  a blinking cursor** after it. = stores it and steps down (already right).
- **AC while typing cancels the typing** (the cell keeps its old value, you stay in the
  editor). AC with nothing typed leaves to the STAT calculation screen (empty line, 0
  bottom right). (Blipwork `statKey`: AC STORES the typed digits and leaves.)
- **DEL with nothing typed deletes the whole row**; the rows below move up and the cursor
  stays on that row number. (Not measured: DEL while typing; keep "remove the last typed
  character".)
- **SHIFT 9 works inside the editor too:** `Clear?` / `1:Setup 2:Memory` / `3:All`.
  2 → `Clear Memory?` / `[=] :Yes` / `[AC] :Cancel` → = → `Complete!` / `Press [AC] key`
  → AC goes back to WHERE YOU WERE (the editor, cursor on row 1).
  **Memory clear does NOT clear the STAT data.** (Blipwork `statKey` has no `clr`, so
  SHIFT 9 does nothing there: her report. MODE and SETUP are missing there as well.)
- **SHIFT 1 inside the editor is a short menu:** `1:Type 2:Data` / `3:Edit`.
  3 → `1:Ins 2:Del-A`. Ins puts a new row at the cursor holding 0 (FREQ 1) and pushes the
  rest down. Del-A empties the table at once, no question, cursor on row 1. (Blipwork
  shows the full six-item menu inside the editor and has no Edit.)
- SHIFT 1 on the calculation screen, 1-VAR: `1:Type 2:Data / 3:Sum 4:Var / 5:Distr
  6:MinMax`; Sum `1:Σx² 2:Σx`; Var `1:n 2:x̄ / 3:σx 4:sx`; MinMax `1:minX 2:maxX / 3:Q1
  4:med / 5:Q3`; Distr `1:P( 2:Q( / 3:R( 4:▶t`. **All already match Blipwork.**
- A+BX with FREQ on: the grid is **X | Y | FREQ** (Blipwork keeps X | Y; factory is FREQ
  off, so this matters only after a learner switches FREQ on).

### 19.3 Two-variable Sum / Var / MinMax (probe-list item 1; "why does it do nothing?")
They did nothing because they had not been measured yet. Now measured, A+BX:
- Sum: `1:Σx² 2:Σx / 3:Σy² 4:Σy / 5:Σxy 6:Σx³ / 7:Σx²y 8:Σx⁴` (one screen, four lines).
- Var: `1:n 2:x̄ / 3:σx 4:sx / 5:ȳ 6:σy / 7:sy`.
- MinMax: `1:minX 2:maxX / 3:minY 4:maxY`.
- Picking pastes the token on the editable line; = evaluates (same as Reg).
  Check values with X 1,2,3,4 / Y 2,4,5,8: `maxY` = 8, `σy` = 2,165063509.

### 19.4 SOLVE with other letters (probe-list item 2)
- `A×X+B` then SHIFT SOLVE asks only `Solve for X`. A and B are NOT asked; their stored
  values are used. Blipwork already does this: no change.

### 19.5 Tiny decimals (probe-list item 3)
- `1÷3000000 =` gives the fraction 1/3000000; S⇔D gives `0,00000033333`.
- `1÷7000000` S⇔D → `0,00000014285`. `2÷3000` S⇔D → `0,00066666666`.
  `1÷70000000` S⇔D → `0,00000001428`. `1÷7000000000` S⇔D → `1,428571429×10⁻¹⁰`.
- Rule (Norm 2): a decimal shows **at most 12 digits counting the leading 0** (so at most
  11 decimal places), and the extra digits are **cut off, NOT rounded** (14285, not
  14286). The ×10 form below 10⁻⁹ is already right. Blipwork shows 0,0000003333333333.
  Note: 10 significant digits still applies first (1÷3 = 0,3333333333 is 11 digits).

### 19.6 DEL inside fractions and roots (probe-list item 4)
DEL deletes what is LEFT of the cursor. Measured:
- `3` ▫/▫ gives 3/□, cursor in the empty bottom. DEL → nothing is deleted; **the cursor
  jumps to the end of the top** (3▮ over □). DEL again → deletes the 3, leaving an empty
  □/□. DEL again (cursor in the empty top) → removes the whole fraction. Her "it only
  deletes the 3 and leaves the fraction blank" is what the second press shows.
- `3/4` with the cursor before the 4 (start of a NON-empty bottom): DEL → the cursor jumps
  to the end of the top, nothing deleted (typing 7 then gives 37/4).
- `2+3/4` with the cursor at the start of the TOP: DEL → **the fraction frame goes, its
  contents stay inline**: 2+34 (typing 7 there gives 2+734).
- `2√□` (empty root): DEL removes the empty √. `2√9` with the cursor before the 9: DEL
  removes the √ and keeps the 9 inline (typing 7 gives 279).
- General rule: at the start of a template's FIRST box, DEL removes the frame and spills
  its contents inline; at the start of a LATER box, DEL only moves the cursor to the end
  of the box before it. (Blipwork deletes the whole fraction.)

### 19.7 Build plan (one unit per worker, fresh sessions, read this section only)
- **Build 9, STAT editor:** 19.2 + 19.3. Code: `statNav` (wrap), `statKey` (AC cancel,
  DEL row, clr / mode / setup), `renderTable` + `renderRegTable` (inverted cell, value
  bottom right, typing bottom left with a blinking cursor, three visible rows if the
  phone layout allows, otherwise keep all rows but the inverted cell is a must), the
  SHIFT 1 menu from the grid (short menu + Edit), the A+BX Sum / Var / MinMax menus.
  Re-check the stats quests' `calcdo` steps still pass.
- **Build 10, COMP:** 19.1 + 19.5 + 19.6 (GCD/LCM + Argument ERROR, the 12-digit cut,
  the DEL template rules).
- Each: new rows in `verify-calc-casio.html` from the device answers above, all verify
  pages green, sw CACHE bump + `tools/sw_check.py` OK, then the Stats Quest copy.

### 19.8 Third probe, Sun 2026-10-04 10:05 (foreman review of Builds 9 + 10)
Measured on the emulator at full scale, to settle choices the Build 9 worker had to guess.
- **Typing in the STAT editor:** the inverted cell KEEPS its old value while a number is
  typed; the typed number shows bottom left only (X 5, 7, 9; cursor on 5; typing 12 leaves
  the cell reading 5). = stores it. BUILT in the review.
- **CLR words:** 1 → `Clear Setup?` / `[=] :Yes` / `[AC] :Cancel` → `Complete!` /
  `Press [AC] key`. 2 → `Clear Memory?` → `Complete!` / `Press [AC] key`. 3 →
  `Reset All?` → `Reset All` / `Press [AC] key`. Every last screen has a lower-case "key"
  (§16 had "Key" for All: a misread). BUILT in the review.
- **STAT calculation screen:** after AC it shows the cursor top left and a **0 bottom
  right**, and the 0 stays while a line is typed (5, then 58, with 0 under it) until =
  gives a result. COMP (MthIO) after AC shows NO 0. NOT built: Blipwork's STAT screen is
  blank there, and many test rows assert that; optional, her call, default leave.
- Driving note: her "the emulator takes no numbers from my keyboard" was Num Lock (off
  after a restart), not the emulator; the number pad types digits again with it on.
