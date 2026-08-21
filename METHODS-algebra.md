# METHODS — Algebra (Equations & Inequalities · Exponents & Surds)

**This document is binding.** Every machine-generated worked solution for the Algebra
chapters of Blipwork must follow the methods below. They are transcribed from **Megan's
own handwritten Grade 11 class notes** — the ones her learners actually sit in front of.

⚖️ **Standing law (from DICE-PLAN.md, inherited from Fun Functions):** never substitute a
textbook method for hers. If a shorter or "cleaner" route exists and it is not on these
pages, it does not go in the app. Her kids reject apps that show alien methods (the
Photomath complaint) — that rejection is the whole reason this file exists.

---

## Sources

Read page-by-page as images on 2026-08-21. All in
`C:\Users\megzi\Desktop\Wiskunde Boekies\2026\Grade 11\Algebra Notes\`.

| Tag | File | Pages | What it is |
|---|---|---|---|
| `EXP` | `Gr11 Exponents_260204_165743.pdf` | 55 | Main **teaching notes**, Exponents & Surds. English. |
| `EQ` | `Equations & Inequalities_260514_092213.pdf` | 52 | Main **teaching notes**, Equations & Inequalities. English. |
| `ESREV` | `Gr11 Exponents & Surds Revision_260302_155841.pdf` | 28 | Worked revision set, Exponents & Surds. English (occasional "of" for "or"). |
| `REVMEMO` | `Revision MEMO_260124_100050.pdf` | 29 | Worked revision **memo**, mixed algebra. English. |
| `ESMEMO` | `Gr11 Exponents & Surds Memo_260113_162730.pdf` | 6 | **Marked memo**, ticks + mark allocations, total [50]. English. |
| `T11` | `Gr11 Test 11 Memo_260115_164900.pdf` | 7 | **Marked memo**, Test 1.1. English. |
| `T2122` | `Gr11 Toets 21 & 22_260206_200323.pdf` | 12 | Toets 2.1 worked (pp1–8) + Toets 2.2 **blank question paper** (pp9–12). **Afrikaans.** |
| `T23` | `Gr11 Toets 23 & Riller Toets_260206_200340.pdf` | 7 | Toets 2.3 worked (pp1–5) + "Riller/Ridder Toets" worked (pp6–7). **Afrikaans.** |

`EXP p53–55` and `EQ p37–39` are the **same three "exam favourites" pages**, appearing in
both books.

**Language:** the digest is in English because Blipwork is English-only. Her Afrikaans
terms are recorded where she uses them, so a generator recognises them if they surface
again — but generated app text stays English.

---

## Part 0 — Universal rules (apply to EVERY generated solution)

These are the habits that show up on page after page. Break one of these and the solution
reads as "not my teacher's" even when the maths is right.

### 0.1 Answer presentation

- **Decimal comma, always.** `2,41` · `−0,41` · `2,89` · `0,027`. Never a decimal point.
  (`EQ p23`, `T2122 p01`, `EXP p11`)
- **Round to 2 decimals** when a decimal answer is called for — and only at the very end.
  She writes the longer value first with `=`, then the rounded value with `≈`:
  `x = 2,886 ≈ 2,89` (`T2122 p01`). This matches the DICE-PLAN number-pad law
  (compute exact, round once at the end).
- **Surd form is kept** unless the question asks for decimals. `x = 5 ± √3` (`EQ p19`),
  `x = −4 ± 3√3` (`T23 p02`), `x = (2 ± 2√10)/3` (`REVMEMO p05`).
- **Two roots are written side by side with `or`**, in two columns, each column carrying
  its own working down the page (`REVMEMO p04`, `EXP p35`). The Afrikaans papers use
  **`of`** in the same slot (`T23 p01`, `T2122 p03`).
- **Coordinate answers use a SEMICOLON:** `(−1;−2)`, `(2;3)`. Never a comma — the comma is
  the decimal separator (`EQ p25–27`, `T2122 p06`).
- **Restrictions ride after a semicolon:** `−1 ≤ x ≤ 3 ; x ≠ 0` (`EQ p35`),
  `x ∈ ℝ ; x ≠ 3` (`EQ p34`).
- She sometimes lands the variable on the **right** (`−3/2 = x`, `9/5 = x`, `±3 = x`) and
  leaves it there (`EXP p31`, `REVMEMO p10`, `ESREV p16`). Do **not** "tidy" that — but do
  not generate it deliberately either; put x on the left, which is her more common form.
- Final answers are often **double-underlined** (`ESREV p16–17`).

### 0.2 The `∴` habit

`∴` opens the line where a conclusion is drawn — after factorising to the two factors,
after reaching the critical points, and before the final statement. It is not decoration;
it marks the step where the reasoning turns.

### 0.3 Her four "no answer" words — KNOW THE DIFFERENCE

`EQ p42` gives this its own titled box. A generator must pick the right one:

| Word | When | Her example |
|---|---|---|
| **no solution** | A positive base can't reach a negative value | `3ˣ = −1 ∴ no solution` |
| **undefined** | Denominator = 0 | `x/0` |
| **non-real** | Even root of a negative | `√−4` — she also writes "(no real solution)" |
| **not applicable (N.A.)** | A root of a **surd equation** that fails the check | `√…` equation `∴ N.A.` with `≠` |

Afrikaans equivalent for N.A. is **`nvt`** (`T2122 p03`, `T23 p02`).

⚠️ Her own memo `ESMEMO p05` writes "undefined" where this table says "no solution"
(`3ˣ = −1`). **The `EQ p42` table wins** — see Flag F1.

### 0.4 Calculator is allowed and taught

Her notes teach calculator routes explicitly (`SHIFT`+`FACT` for prime factors, `MODE 5:EQN`
for roots, `MODE ▾ 2:INEQ` for quadratic inequalities). A generated "show me the method"
may mention the calculator step **only where her notes do**, and must still show the full
written working — her memos award marks for the written steps, not the answer.

---

## PART A — EXPONENTS & SURDS

### A1. The exponent laws — her names and her order

`EXP p02–p03`. Use **these names** in any generated explanation. The header note on the
page: *"these rules only apply when the bases are the same."*

| Her name | Law | Her words |
|---|---|---|
| **Product rule** | xᵃ × xᵇ = xᵃ⁺ᵇ | "add exponents (base stays the same)" |
| **Quotient rule** | xᵃ ÷ xᵇ = xᵃ⁻ᵇ | "subtract exponents" |
| **Zero exponent** | x⁰ = 1 | "anything to the zero is always one" — `7x⁰ = 7(1) = 7` |
| **Power of one** | 1ˣ = 1 | "one to the power of anything is always one" |
| **Power of a power** | (xᵃ)ᵇ = xᵃˣᵇ | "multiply exponents" |
| **Fractional exponent** | ᵃ√(xᵇ) = x^(b/a) | "divide exponents" |
| **Power of a product** | (xy)ᵃ = xᵃyᵃ | "each base gets exponent" |
| **Power of a quotient** | (x/y)ᵃ = xᵃ/yᵃ | "each base gets exponent" |
| **Depressed exponents** | x⁻ᵃ = 1/xᵃ | "flip the fraction and change sign of exponent" |
| **Flipped fractions** | (x/y)⁻ᵃ = (y/x)ᵃ | "flip the fraction and change sign of exponent" |

**Never do:** call these "index laws", "law 1 / law 2", or introduce a law not on this list.
"Depressed exponents" and "flipped fractions" are her words and they must survive.

---

### A2. Numerical bases — "type 1: one term"

`EXP p04`. Used when the whole expression is a single product/quotient of numbers raised to
powers.

**Her steps:**
1. **Rewrite bases as a product of prime factors.** (Calculator: type the number, `=`,
   `SHIFT`, `FACT`.)
2. **Multiply the brackets out** (power of a power).
3. **Add / subtract exponents with the same bases.**
4. **Simplify.**

**Worked example — `EXP p04 eg.1`**

```
      4ⁿ⁺² · 9ⁿ⁻¹
      ───────────
      72ⁿ · 2¹⁻ⁿ

   =  (2²)ⁿ⁺² · (3²)ⁿ⁻¹
      ─────────────────
      (2³·3²)ⁿ · 2¹⁻ⁿ

   =  2²ⁿ⁺⁴ · 3²ⁿ⁻²
      ───────────────
      2³ⁿ · 3²ⁿ · 2¹⁻ⁿ

   =  2^(2n+4−3n−(1−n)) · 3^(2n−2−2n)
   =  2^(4−n−1+n) · 3⁻²
   =  2³ · 3⁻²   =  2³/3²   =  8/9
```

Note the layout: the exponent arithmetic is written out **in the exponent** on its own line
before it is simplified. Do not skip that line.

---

### A3. Algebraic bases — "type 2: divorce"

`EXP p06`. **"Divorce"** is her word for splitting a power apart:

```
x^(a+b) = xᵃ × xᵇ          x^(a−b) = xᵃ × x⁻ᵇ
```

**Her steps:**
1. Rewrite bases as a product of prime factors.
2. **Only divorce when there is a `+` or `−` between bases** (i.e. when terms are being
   added or subtracted, not simply multiplied).
3. **Take out a common factor** — "always the base with the variable exponent".
4. **Only cancel out once `+` and `−` are caged** (caged = inside brackets).

**Worked example — `EXP p06 eg.1`** (labelled "common factor")

```
      3^(x+2) − 3ˣ
      ─────────────
      3^(x+1) − 3^(x−2)

   =  3ˣ·3² − 3ˣ
      ─────────────
      3ˣ·3¹ − 3ˣ·3⁻²

   =  3ˣ(3² − 1)
      ────────────        ← now the + / − are caged, so 3ˣ may cancel
      3ˣ(3 − 3⁻²)

   =  (9 − 1) ÷ (3 − 1/9)
   =  8 ÷ 26/9
   =  8 × 9/26  =  72/26  =  36/13
```

**Never do:** cancel a term across a `+` or `−` before it is bracketed. That is precisely
the error the "caged" rule exists to stop.

---

### A4. Factorising exponential expressions

`EXP p07`, `EXP p11`. Three factorising shapes, each with the substitution written to the
right of the working.

- **Difference of squares** — `EXP p07 eg.2`: `(2²ˣ − 9)/(2ˣ + 3)`, `let K = 2ˣ`, noting
  `K² = 2²ˣ`. → `(K−3)(K+3)/(K+3)` → `K − 3` → **`2ˣ − 3`**.
- **Trinomial** — `EXP p07 eg.3`: `(3²ˣ − 3ˣ − 6)/(3ˣ − 3)`, `let K = 3ˣ` →
  `(K−3)(K+2)/(K−3)` → `K + 2` → **`3ˣ + 2`**.
- **Common factor** — as in A3.

⚖️ **Substitution notation:** she writes **`let K = …`** (capital K) in a different colour
to the right of the line where the substitution starts, and she **always substitutes back**
at the end. A generated solution that leaves the answer in K is wrong.

---

### A5. The k-method for huge exponents

`EXP p09`, `REVMEMO p16`, `REVMEMO p18`.

**Her ruling, written on the page:** *"always let k be equal to the middle value."*

**Her steps:**
1. Pick the middle exponent; `let K = base^(that exponent)`.
2. Rewrite every other term as `K` times a small power of the base.
3. Common-factor `K` out of top and bottom and cancel.
4. Evaluate the small numbers.

**Worked example — `EXP p09 eg.1`**

```
      5²⁰⁰⁷ + 5²⁰¹⁰                       * always let k be equal
      ─────────────                         to the middle value
      5²⁰⁰⁸ + 5²⁰⁰⁹                       let K = 2008

   =  5^(K−1) + 5^(K+2)
      ───────────────────
      5^K + 5^(K+1)

   =  5^K·5⁻¹ + 5^K·5²
      ──────────────────
      5^K + 5^K·5¹

   =  5^K(5⁻¹ + 5²)
      ───────────────    =  21/5
      5^K(1 + 5)
```

Where the terms are not evenly spaced she picks whichever base-power makes the rest easy —
`let K = 5⁵⁰⁰` in `REVMEMO p16`, `let K = 3¹²⁰` in `REVMEMO p18`, with the conversions
listed in a box to the right (`then 5⁵⁰² = 5⁵⁰⁰·5²` …). Generate that little box; it is
part of the method.

---

### A6. Exponential fractions — LCD and KFC

`EXP p12` ("exam favourites"), `REVMEMO p15`.

**KFC = Keep, Flip, Change** — her name for dividing by a fraction.

Her annotation on `EXP p12 eg.1`, about the `+` sign in `1/(3⁻¹ + 2⁻¹)`:
*"stops you from taking 3 and 2 to the top → break it up with ÷ → find LCD and use KFC."*

```
      1                                    LCD = 6
   ────────────
   3⁻¹ + 2⁻¹

   =  1 ÷ (1/3 + 1/2)          ← ×2 under the 1/3, ×3 under the 1/2
   =  1 ÷ (2 + 3)/6
   =  1 ÷ 5/6
   =  6/5
```

**Never do:** move `3⁻¹` and `2⁻¹` to the numerator as `3 + 2`. That is the mistake the
whole page is built to prevent.

---

### A7. Rational (fractional) exponents — converting

`EXP p11`, `EXP p14`.

The conversion box (`EXP p14`): **ᵇ√(xᵃ) = x^(a/b)**, with her memory hook:
- *"inside √ = top of fraction"*
- *"outside √ = bottom of fraction"*
- and a cloud note: `√ = ²√`

**Habits worth copying:**
- `(0,027)^(−1/3)`: *"type decimal number in calculator and work with fraction"* → `27/1000`
  → `(10³/3³)^(1/3)` → `10/3` (`EXP p11 eg.3`).
- Dividing by a fraction is KFC, written as a vertical `K F C` next to the line
  (`EXP p11 eg.2`).

**Negatives box (`EXP p14`):**

| Case | Result |
|---|---|
| (−x)^even | positive answer |
| ^even√(−x) | **non-real** |
| (−x)^odd | negative answer |
| ^odd√(−x) | negative answer |

**"Two answers" box (`EXP p14`):** `^even√(+x) = ± answer`, with `√9 = ±3`.

⚠️ This is the single biggest inconsistency in the notes — see Flag F2. In practice, across
every memo and revision page, she writes `√9 = 3` when **simplifying** (`T11 p03`,
`REVMEMO p13`, `T23 p04`) and uses `±` only when **solving an equation**. Generators must
follow the practice, not the box. Do not "correct" the box in any learner-facing text.

---

### A8. Simplifying surds without a calculator

`EXP p18`. Header on the page: **"simplify without calculator"**.

**Her steps:**
1. **Rewrite bases as a product of prime factors.**
2. **Let bases with tickets out.** ("Tickets" = an exponent that matches the root index, so
   that factor is allowed to leave the root.)
3. **Add / subtract same √.**

**Worked example — `EXP p18 eg.1`**

```
   √200
 = √(2³ × 5²)
 = √(2² · 2¹ · 5²)
 = 2 · 5 √(2¹)
 = 10√2
```

and `EXP p18 eg.2`: `∛375 = ∛(3 × 5³) = 5∛3`.

**"Tickets" is her word and it must be used** in generated hint text for this skill.

---

### A9. The surd laws

`EXP p17`. Numbered on the page as ①, ②, ④, ⑤, ⑥ — **there is no ③** (Flag F3).

| # | Law |
|---|---|
| ① | ᵃ√x × ᵃ√y = ᵃ√(x×y) and ᵃ√x ÷ ᵃ√y = ᵃ√(x/y) — *"× and ÷ same √"* |
| ② | ᵃ√x + ᵃ√x = 2ᵃ√x — *"+ and − same √; bases must be the same"*, "same thing as x + x = 2x" |
| ④ | ᵃ√(xᵇ) = (ᵃ√x)ᵇ |
| ⑤ | ᵇ√(ᵃ√x) = ᵃ√(ᵇ√x) |
| ⑥ | ᵇ√(ᵃ√x) = ^(a×b)√x |

**BIG NO-NO** (her capitals, `EXP p17`): **√x + √y ≠ √(x+y)**.

Adding/subtracting worked examples (`EXP p18–20`): she keeps the coefficient `1` visible —
`4√3 − 1√3 = 3√3` (`EXP p20 eg.6`), `1√15 + 1√15 = 2√15` (`EXP p19 eg.4`), and when the
coefficients cancel she writes the intermediate `0√5` before `0` (`EXP p19 eg.3`). Copy that
— dropping the `1` and the `0√5` line loses her scaffolding.

---

### A10. Products with surds

`EXP p22`.

- Difference of squares first: `(√2 − 1)(√2 + 1) = 2 − 1 = 1`.
- Squaring a binomial keeps the middle term: `(√x + 1)² = (√x)² + 2√x + 1 = x + 2√x + 1`,
  with a little `×2` arrow over the middle term.
- `(x^½ + 1)(x^½ − 1) = x¹ − 1`, with the exponent arithmetic shown.

---

### A11. Rationalising the denominator

`REVMEMO p14`, `T23 p06`, `EQ p37`.

**Her steps:**
1. Multiply the fraction by **(conjugate)/(conjugate)** — written as a separate factor with
   a `×` between, in its own colour.
2. Multiply out; the denominator becomes a difference of squares with no surd.
3. Simplify, then split or factor out if it tidies.

**Worked example — `REVMEMO p14 (4.6)`**

```
       8            √6 − 2
   ───────────  ×  ─────────
    √6 + 2          √6 − 2

   =  8(√6 − 2)
      ──────────
        6 − 4

   =  8(√6 − 2)
      ──────────
          2

   =  4(√6 − 2)
   =  4√6 − 8
```

For a **monomial** denominator she multiplies by the surd over itself:
`2/√27 × √27/√27` (`T23 p06`).

---

### A12. Exponential equations — same base ("guns and helmets")

`EXP p30`, headed **"exponential equations — type 1: one term"**.

**Her steps, verbatim from the page:**
1. Rewrite bases as a product of prime factors.
2. **Make bases the same** →
   - *"guns are equal"*
   - *"shoot each other"*
   - *"helmets fall to the ground"*
3. **Equate exponents.**
4. **Positive base cannot have a negative answer** → `3ˣ ≠ −3 ∴ no solution`.

⚖️ **The guns/helmets image is canon.** Bases = guns, exponents = helmets. When the bases
match they cancel ("shoot each other") and the exponents drop down to become the new
equation ("helmets fall to the ground"). Any generated hint for this skill uses that
picture. Do **not** replace it with "since the bases are equal, equate the exponents" alone
— though she does also write that sentence on the same page, in orange, as the formal
statement.

**Both directions are on the page:**

```
5ˣ = 25          →  5ˣ = 5²    "if the bases are the same, we can equate the exponents"  →  x = 5 (see Flag F4)
x² = 81          →  x² = 9²    "if the exponents are the same, we can equate the bases"   →  x = 9
```

**Same exponent → multiply bases** (`REVMEMO p24, 6.8`): `2ˣ · 3ˣ = 6ˣ`, annotated
*"same exponent = multiply bases"*.

**The "switch" move** (`REVMEMO p29, 8.5`): when x lands in a denominator of the exponent,
`2/x = 5` becomes `2/5 = x` with a green arrow labelled **"switch"**.

---

### A13. Exponential equations — the k-substitution (quadratic in k)

`EXP p35`, `REVMEMO p20–23`, `REVMEMO p28`.

**Her steps:**
1. Take everything to one side, `= 0`.
2. Rewrite so every exponential is a power of the **same** base, and spot the `K²` term.
3. **`let K = <base>ˣ`** (written to the right).
4. Factorise the quadratic in K.
5. `∴ K = … or K = …` — then **two columns**, each converting back to x.
6. A branch giving a **negative** value of `K` closes with `<base>ˣ ≠ −n ∴ no solution`.

**Worked example — `REVMEMO p20 (6.2)`**

```
   2ˣ − 4 = 2^(5−x)
   2ˣ − 4 = 2⁵ · 2⁻ˣ

   2ˣ   4        2⁵                LCD = 2ˣ
   ── − ──  =   ───
    1   1        2ˣ
   ×2ˣ  ×2ˣ      ✓

   2²ˣ − 4·2ˣ = 32
   2²ˣ − 4·2ˣ − 32 = 0             let K = 2ˣ

   K² − 4K − 32 = 0
   (K − 8)(K + 4) = 0

   ∴  K = 8              or        K = −4
      2ˣ = 2³                      2ˣ ≠ −4
      x = 3                        ∴ no solution
```

Note the `✓` under the fraction that already has the LCD — that tick is her notation for
"this one needs no multiplier" and appears in every LCD layout she writes.

---

### A14. Equations with rational exponents

`EXP p39–p42`, `REVMEMO p19`, `REVMEMO p24`, `ESREV p16`.

**Her method (`EXP p39`):**
- **Multiply with the reciprocal of the exponent** → *"switch numerator and denominator"* →
  `3/4 × 4/3 = 1 (cancels out)`.

**Her sign/solution rules — the "Important Notes" box on `EXP p39`.** These decide where the
`±` goes, and they are the crux of this skill:

| Original exponent | Result |
|---|---|
| **even numerator** → | **± answer** — `x^(2/3) = 2`, `x^(4/7) = 5` |
| **only odd numbers** in numerator **or** denominator → | ✓ **negative answer allowed** — `x^(1/3) = −2`, `x^(5/7) = −9` |
| **even number** in numerator **or** denominator → | ✗ negative answer **(no solution)** — `x^(1/2) = −3`, `x^(4/3) = −4` |

And the box above it: `x^(odd/even)` or `x^(even/odd)` **≠ negative number**, because
`16^(1/2) ≠ −4` — *"cannot be neg. only"*.

**⚖️ The `±` appears at the moment the even root is taken, and rides through to the final
answer.** It is attached to the number, not to the x: `x = ±2³`, then `x = ±8`.

**Worked example — `REVMEMO p19 (6.1)`**

```
   x^(4/3) = 13x^(2/3) − 36
   x^(4/3) − 13x^(2/3) + 36 = 0          let K = x^(2/3)

   K² − 13K + 36 = 0
   (K − 9)(K − 4) = 0

   ∴  K = 9                        or      K = 4
      (x^(2/3))^(3/2) = (3²)^(3/2)         (x^(2/3))^(3/2) = (2²)^(3/2)
      x = ±3³                              x = ±2³
      x = ±27                              x = ±8
```

**The contrast page she deliberately built — `REVMEMO p23`:**

```
   6.6)  x^(2/3) − x^(1/3) − 12 = 0        let K = x^(1/3)
         (K − 4)(K + 3) = 0
         K = 4                or   K = −3
         (x^(1/3))³ = (2²)³        (x^(1/3))³ = (−3)³      ← "ah! found one that works!!"
         x = 2⁶ = 64               x = −27

   6.7)  (√x)² − 5√x − 6 = 0               let K = √x
         (K − 6)(K + 1) = 0
         K = 6                or   K = −1
         (√x)² = (6)²              √x ≠ −1
         x = 36                    ∴ no solution
```

Her handwritten note *"ah! found one that works!!"* sits beside the `x = −27`. **That
contrast is the teaching point**: a cube root may be negative, a square root may not. A
generated round on this skill should be able to produce both branches.

**Alternate route she also shows (`EXP p39`, `ESREV p16`):** instead of the reciprocal
power, raise to the denominator then take the root —
`x^(2/3) = 4 → (∛(x²))³ = 4³ → √(x²) = √64 → x = ±8`.
**Both roads are hers** — see Flag F5 for which one the app should default to.

---

### A15. Surd equations

`EXP p45–p49`, `REVMEMO p25–26`, `ESREV p20–22`, `T23 p02`.

**Her steps (summarised on `EQ p41`):**
1. **Isolate the √** on one side.
2. **Square both sides** — brackets on both sides, `(…)² = (…)²`.
3. Watch the **middle term**: `(x+3)² = x² + 6x + 9`. Her summary box says this in exactly
   those words.
4. Solve the resulting equation.
5. **"ALWAYS test both answers!!"** (her capitals and her double exclamation, `EQ p41`).
6. Mark the failing root `N.A.` and write it with a struck equals: `x ≠ 3`.

**Worked example — `REVMEMO p25 (7.1)`**

```
   3√(x−2) + 6 = x
   (3√(x−2))² = (x − 6)²
   9(x − 2) = x² − 12x + 36
   9x − 18 = x² − 12x + 36
   0 = x² − 21x + 54
   0 = (x − 3)(x − 18)

   ∴  x ≠ 3          or      x = 18
      N.A.
```

**The explicit test layout — `T23 p02 (3.1 / 3.2)`**, side by side, one column per candidate:

```
   3.1)  √(5 − x) = x + 1        3.2)  √(5 − x) = x + 1
         √(5 − (−4)) = −4 + 1          √(5 − (1)) = 1 + 1
              3  ≠  −3                      2  =  2

         ∴ x = −4
           nvt
```

She substitutes into the **original** equation, writes both sides, and joins them with `=`
or the struck `≠`. **Generate that test — it is a marked step, not an optional check.**

**Second-surd case (`EXP p48`, starred):** with two surds, isolate one, square, isolate the
remaining surd, square again.

**Restriction case (`EXP p49`):** where the surd sits in a denominator, a root that makes
the radicand zero is **N.A.** even though it satisfies the squared equation.

**Two roads for the same equation** — `x − √x = 6` is solved on `EXP p47 eg.6` by isolating
and squaring, and elsewhere by `let K = √x`. Both are hers; see Flag F5.

---

### A16. "Show that" / "prove" questions

`ESREV p14`, `EQ p37`.

She works **one side only** — writes `= LHS` (Afrikaans papers: `LK`, `T11 p04`) and drives
it down to the given right-hand side. She does **not** work both sides toward the middle,
and she does **not** start from the answer.

**Worked example — `EQ p37`** (`* Show that √(a − 2 + a⁻¹) can be written as √a(a−1)/a, a>1`)

```
   = √(a − 2 + a⁻¹)

   = √( a/1 − 2/1 + 1/a )              * LCD = a
        ×a    ×a

   = √( (a² − 2a + 1) / a )
   = √( (a−1)² / a )
   = √((a−1)²) / √a
   = (a − 1)/√a  ×  √a/√a
   = √a(a − 1) / a
```

Note the rationalising step at the end — she does not leave a surd in the denominator.

---

## PART B — EQUATIONS & INEQUALITIES

### B0. Her summary of equations (`EQ p41`) — the routing table

This page tells a generator **which method to pick**. Reproduce its logic:

| Shape | Route |
|---|---|
| **x²** | everything LHS = 0 → factorise (GCF / diff in □'s / trinomial) · quadratic formula · **complete the square ("long way") — only if asked** |
| **2ˣ** | exponent on LHS = value (prime factors) · × or ÷ → + or − exponents with same base · + or − → **divorce** (common factor) |
| **√** | isolate √ and square both sides · middle term `(x+3)² = x² + 6x + 9` · **ALWAYS test both answers!!** |
| **fractions** | factorise denom and find LCD · once denom are the same = cancel out · **set limits!** → denom ≠ 0 |

⚖️ **"complete the square — only if asked"** is a ruling. A generated solution must not
complete the square on a quadratic that factorises or that the question didn't ask to be
completed.

---

### B1. Quadratic equations by factorising

`EQ p01–p05`.

**Her steps:**
1. Everything to the left, `= 0`.
2. Factorise (GCF, difference of squares, trinomial).
3. `∴` each factor `= 0`, on one line, split by `or`.
4. Solve each.

**Her calculator factorising trick (`EQ p01`)** — `MODE`, `5:EQN`, `3: aX²+bX+c=0`, type the
coefficients, read `X1` and `X2`, then:
- **"put opposite signs in brackets"**
- **"multiply denom to x"**
- **"take numerator over ="**

so roots `X1 = ½`, `X2 = −3` become `(2x − 1)(x + 3) = 0`.

**Zero-product with a mixed bracket (`EQ p05 eg.2`):** `(x + 2)(x^(2/3) − 16) = 0` → each
bracket separately, and the second one runs through the A14 rational-exponent rules to
`x = ±64`.

**Reconstructing the equation from its roots — `EQ p39` (an "exam favourite"):**

```
   * If −6 and 7 are roots of x² + bx + c = 0, determine b and c

     x² + bx + c = 0                       b = 6 − 7 = −1
     (x + 6)(x − 7) = 0                    c = 6 × 7 = −42
     ∴ x = −6 or x = 7
       → x² − 7x + 6x − 42 = 0
         x² − x − 42 = 0
```

(The `c = 6 × 7 = −42` line drops a sign in the middle but the value is right — Flag F6.)

---

### B2. Equations with fractions (algebraic fractions)

`EQ p06–p09`, `REVMEMO p09–p11`, `T2122 p01`. This is the most consistently laid-out method
in the whole book — copy the layout exactly.

**Her steps:**
1. **Factorise every denominator** first. Turn `3 + 2x` into `2x + 3`; turn `1 − x²` into
   `−(x² − 1)` and carry the minus into the numerator.
2. Write **`LCD = …`** on the left and **`limits: x ≠ …`** on the right, on the same line.
   (Afrikaans: `beperkings`; she uses the English word "limits" throughout.)
3. Rewrite the equation with every term over its denominator — **a whole number gets
   denominator `1`**.
4. **Under each term, write the multiplier** `×(…)` needed to reach the LCD. The term that
   already has the LCD gets a **`✓`** instead.
5. Denominators cancel; write the numerator-only equation.
6. Expand, collect, solve.

**Worked example — `REVMEMO p10 (3.4)`**

```
      x          x                  5x
   ─────── + ───────── − 1  =  ───────────
    3 + 2x     2x − 3            4x² − 9

      x          x                  5x
   ─────── + ───────── − 1  =  ──────────────────
    2x + 3     2x − 3           (2x+3)(2x−3)

   LCD = (2x+3)(2x−3)          limits:  x ≠ 3/2
                                        x ≠ −3/2

      x          x        1              5x
   ─────── + ───────── − ───  =  ──────────────────
    2x + 3     2x − 3     1       (2x+3)(2x−3)
   ×(2x−3)    ×(2x+3)   ×(2x+3)(2x−3)

   x(2x−3) + x(2x+3) − (2x+3)(2x−3) = 5x
   2x² − 3x + 2x² + 3x − (4x² − 9) = 5x
   4x² − 4x² + 9 = 5x
   9/5 = x
```

**Never do:** cross-multiply a three-term fraction equation, or drop the `limits` line. Her
memos mark the limits.

**The negative-denominator move (`T2122 p01`, `REVMEMO p11`):** `3 − x = −(x − 3)`, so
`−2/(3−x)` becomes `+2/(x−3)`. She highlights this in colour because it is where learners
lose the sign.

---

### B3. Completing the square — on an EXPRESSION

`EQ p10–p16`, `REVMEMO p02–p03`.

**Her language, from `EQ p12`:** *"let x and b/2 fall into new bracket, but their squares
get stuck on the outside; now let sign of b fall into bracket."*

**Her steps (a = 1):**
1. Compute `b/2` in a small **boxed working** at the top right: `b/2 = 6/2 = 3`.
2. **Add and subtract** `(b/2)²` inside the same expression (an expression has no `=`, so
   the value must be preserved).
3. Collapse `x² + bx + (b/2)²` into `(x ± b/2)²`, sign of b carried into the bracket.
4. Combine the leftover constants.

**Her steps (a ≠ 1) — `REVMEMO p02–p03`:**
1. **Factor `a` out of the whole expression first**, including out of the constant (accept
   the fractions this creates).
2. Complete the square **inside** the bracket.
3. Switch to **square brackets** `[ … ]` once the inner bracket is formed.
4. **Multiply `a` back in at the very end.**

**Worked example — `REVMEMO p03 (c)`**

```
   −2x² − 7x − 5                          b/2 = 7/2 ÷ 2 = 7/4

   i)  −2( x² + 7/2 x + 5/2 )

     = −2( x² + 7/2 x + (7/4)² − (7/4)² + 5/2 )

     = −2[ (x + 7/4)² − 49/16 + 5/2 ]

     = −2[ (x + 7/4)² − 9/16 ]

     = −2(x + 7/4)² + 9/8

   ii)  Sad parabola
        Maximum value of 9/8

   iii) x = −7/4
```

**Colour-coded arrows are part of her layout:** one arrow from `x²` and one from the `b/2`
term down into the new bracket, and a third from the `−(b/2)²` out to join the constants. A
generated step-by-step should mirror those three moves as three separate highlighted steps.

**Her follow-up questions on this skill are always the same three:**
i) complete the square · ii) **happy / sad parabola** + **minimum / maximum value** ·
iii) the **axis of symmetry / value of x**. Her words are **"Happy parabola / Minimum of −7"**
and **"Sad parabola / Maximum value of 9/8"** — use "happy" and "sad", they carry over from
her Functions notes.

---

### B4. Completing the square — to SOLVE an equation

`EQ p19`, `REVMEMO p04–p06`, `T2122 p04`, `T23 p02`.

⚖️ **The distinction she rules on (`T2122 p04`):**
- **Equation** (has `=`): add `(b/2)²` to **BOTH sides**.
- **Expression** (no `=`): add **and subtract** `(b/2)²` on the same side.

A generator must not blur these.

**Her steps:**
1. If `a ≠ 1`, **divide every term by a** (she writes the divisor under each term in orange).
2. Take the constant over the `=`.
3. `+(b/2)²` on **both** sides, shown as `(b/2)²` unevaluated on the first line.
4. Collapse the left; simplify the right.
5. **√ both sides** — she draws the root sign over both sides in pink: `√((x+3)²) = √1`.
6. **Remember the `±`** — it goes on the right-hand side, in pink/blue.
7. Solve.

**Worked example — `REVMEMO p04 (1.3-a)`**

```
   x² + 6x = −8                    b/2 = 6/2 = 3

   x² + 6x + 3² = −8 + 3²

   √((x + 3)²) = √1

   x + 3 = ±1

   ∴  x + 3 = 1       or     x + 3 = −1
      x = −2                 x = −4
```

When the root is **rational** she splits `±` into two explicit lines as above. When it is
**irrational** she leaves the single combined form: `x = −4 ± 3√3` (`T23 p02`),
`x = (9 ± √129)/2` (`REVMEMO p06`), `x = (2 ± 2√10)/3` (`REVMEMO p05`).

When the right-hand side goes negative she writes `x = −1 ± √−2 ∴ no real solution`
(`REVMEMO p04 b`, `REVMEMO p11`).

---

### B5. The quadratic formula

`EQ p23`.

**Her rules, verbatim from the page:**
- **use when trinomial cannot factorize**
- **always write formula**
- **show substitution step**
- **use EQN on calculator**
- **always round to 2 decimals**

**Her steps:**
1. Write the equation, and directly under it write `ax² + bx + c = 0` with a, b, c
   colour-matched to the coefficients above.
2. Write the formula.
3. Write the substitution line with every negative in **its own brackets**:
   `−(−2) ± √((−2)² − 4(1)(−1)) / 2(1)`.
4. Give the exact/surd root, and name the nature: *"roots are real and irrational"*.
5. Then `∴ x = 1 + √2 or x = 1 − √2`, with `≈ 2,41` and `≈ −0,41` **on the line below** each.

**Worked example — `EQ p23 eg.1`**

```
   1x² − 2x − 1 = 0
   ax² + bx + c = 0

        −b ± √(b² − 4ac)
   x =  ─────────────────
              2a

        −(−2) ± √((−2)² − 4(1)(−1))
     =  ──────────────────────────────
                  2(1)

   x = 1 ± √2        → roots are real and irrational

   ∴  x = 1 + √2          or        x = 1 − √2
        ≈ 2,41                        ≈ −0,41
```

(The calculator inset on that page shows `c = 1`; the equation has `c = −1` — Flag F7.)

---

### B6. Simultaneous equations (one linear, one quadratic)

`EQ p25–p27`, `T2122 p05–p06`, `T23 p03`.

**Her steps:**
1. **Make one variable the subject of the LINEAR equation.**
2. **Substitute into the other equation.**
3. Solve the resulting quadratic (factorise, or formula).
4. **Substitute each x back into the linear equation** to get its y — she re-writes the
   linear equation fresh each time, boxes the substituted bracket, and works down.
5. **Answer as coordinate pairs with a semicolon:** `(−1;−2)` and `(−9;2)`.

**Her protip (`T2122 p05`, verbatim in Afrikaans):**
*"protip = antwoorde gaan altyd rasionaal wees → heelgetal of breuk"*
— *the answers are always rational: a whole number or a fraction.* Use this as a
sanity-check constraint when rolling numbers for a generated simultaneous-equations round:
**if a rolled pair gives irrational answers, re-roll** — unless the question deliberately
asks for 2 decimals, as `EQ p27 eg.3` does.

**Substitution-back layout — `T23 p03 (4.2)`**

```
   y = −1   →   x − 3y = 1
                x  −3(−1)  = 1        ← the substituted part is boxed in blue
                x + 3 = 1
                x = −2
```

**Never do:** solve by elimination, or by matrices. Her notes use substitution only, and
they always start from the linear equation.

---

### B7. Linear inequalities

`EQ p28` and her number-line pages.

- Solve as a normal equation; **flip the inequality sign when multiplying or dividing by a
  negative**.
- Show the answer on a **number line**: open circle for `<` / `>`, closed dot for `≤` / `≥`,
  shaded in the direction of the solution.
- Then write the answer in words/symbols.

---

### B8. Quadratic inequalities — the "TIP Chips" sketch method

`EQ p29–p34`, `T23 p04`. **This is her method and it replaces the sign table.**

**Her checklist (`EQ p29`, headed "TIP Chips" with little chip icons):**
1. ✔ **take everything to left**
2. **no negative in front of x²**
   - ✔ → **divide negative away**
   - → **change direction of inequality signs**
3. **factorize** (trinomial, common factor, diff in □'s)
4. ✔ **CP must be `=`** — the critical points come from setting each factor equal to zero

**Then read the answer off a sketch:**

| Sign | Picture | Answer shape | Her words |
|---|---|---|---|
| `x < 0` | shaded **inside** the bowl, between the roots | `… < x < …` | *"inside of bowl"* · *"x lies between"* |
| `x > 0` | shaded **outside**, both arms | `x < …  or  x > …` | *"outside of bowl"* · *"< > shows direction"*: `x<` = to the left ←, `x>` = to the right → |

**Worked example — `EQ p30 eg.1`**

```
   x² − 5x − 6 < 0
   (x − 6)(x + 1) ⟨< 0⟩          ← she circles the inequality sign

   CP:  x − 6 = 0    or    x + 1 = 0
        x = 6              x = −1

        ∴  −1 < x < 6                    [sketch: happy parabola through −1 and 6,
                                          hatched between the roots, below the axis]
```

**Worked example — `EQ p30 eg.3` (negative leading coefficient)**

```
   −x² + 3x − 2  ≥  0
   ───   ───  ──     ─
    −1    −1   −1    −1

   x² − 3x + 2  ≤  0            ← sign flipped
   (x − 2)(x − 1) ≤ 0

   CP:  x = 2  or  x = 1
        ∴  1 ≤ x ≤ 2
```

**The bracket-flip trick (`EQ p33 eg.2`):** `(x + 3)(4 − x) < 0` — multiplying the second
bracket by −1 flips the inequality: `(x + 3)(x − 4) > 0`. She flags this on the summary
page too: *"look out for (x−3)(4−x) ≥ 0 → (x−3)(x−4) ≤ 0"* with `−x²` written above it.

**Perfect-square case (`EQ p34`):** `(x − 3)(x − 3) > 0` → **`x ∈ ℝ ; x ≠ 3`**.

**Calculator route (`EQ p31`, taught alongside):** `MODE` → down arrow ▾ → `2:INEQ` →
`1: aX² + bX + c` → choose `1: aX²+bX+c > 0` → input values. The calculator returns
`X < −2 ; 3 < X`, and her ruling in a highlighted box:

> `x ≤ 0 ; 6 ≤ x` **must be written as** `x ≤ 0 or x ≥ 6`
> *"remember to write 'or'"*

⚖️ **Never emit the calculator's semicolon form as a final answer, and never write a bound
with x on the right.** Rewrite it with `or`, x on the left.

**Never do:** a sign table (`tekentabel`), a test-point table, or interval notation
(`(−∞, −1) ∪ (6, ∞)`). None of these appear anywhere in her notes.

---

### B9. Inequalities with fractions

`EQ p35–p36`.

**Her steps:**
1. If the denominator is a **bare number**, multiply both sides by it — flipping the sign if
   it is negative. She writes the multiplier under the fraction with an arrow.
2. If the denominator **contains x**, note the sign rules in a small box
   (`− / + = −`, `+ / − = −`) and set the restriction.
3. Where the denominator is a **guaranteed-positive** square (`x²`), drop it and carry
   `x ≠ 0` (`EQ p36`).
4. Solve the resulting quadratic inequality by B8.
5. Attach the restriction after a semicolon: `−1 ≤ x ≤ 3 ; x ≠ 0`.

**Never do:** cross-multiply an inequality whose denominator can change sign.

---

### B10. Undefined / non-real / zero — reading an expression

`REVMEMO p07`, `EQ p40`.

Her layout is a two-column list: the **condition in words** on the left with a `↳` arrow
naming what must happen, and the **algebra** on the right.

```
   2.3)  K = √(x + 3) / (x + 5)

   a)  undefined                 x + 5 = 0
       ↳ denominator = 0         x = −5

   b)  K = 0                     √(x + 3) = 0
       ↳ numerator = 0           x + 3 = 0
                                 x = −3

   c)  real                      x + 3 ≥ 0
       ↳ √K, where K ≥ 0         x ≥ −3
```

`EQ p40` gives the pictures: **undefined** = "ghost under bed" (`a/b` with `b = 0`);
**non-real** = a negative inside the √.

---

### B11. Nature of roots

`EQ p43`. Header: *"nature of roots ↳ where the graph intersects the x-axis"*, with
`Δ = b² − 4ac` named **discriminant / delta / Δ** and pointed out as *"x-intercept of
parabola"*.

**Her table — reproduce these exact wordings:**

| Δ | Nature of the roots | Graph |
|---|---|---|
| `Δ < 0` | **Non-real / Imaginary** (no x-intercepts) | parabola above the axis |
| `Δ ≥ 0` | **Real** (touches the x-axis) | |
| `Δ = 0` | **Real, rational, equal** (only the turning point touches the x-axis) | |
| `Δ > 0` **and perfect □** | **Real, rational, unequal** (x-intercepts are rational numbers) | roots at −1 and 3 |
| `Δ > 0` **and non-perfect □** | **Real, irrational, unequal** (x-intercepts are irrational numbers) | roots at ±√10 |

"□" is her shorthand for **square** (also used in "diff in □'s"). Afrikaans on the test
papers: *"reël, ongelyk"* → real, unequal (`T2122 p07`).

**Her steps for a plain "determine the nature of the roots" question (`EQ p44–p45`):**
1. Write the equation in standard form, `= 0`.
2. Identify a, b, c.
3. `Δ = b² − 4ac`, then substitute with brackets around negatives.
4. Evaluate.
5. State the nature **in her words from the table**, not a paraphrase.

---

### B12. Nature of roots with an unknown k

`EQ p46–p52`, `T2122 p07–p08`.

**Three question shapes appear, each with its own route:**

**(a) "For which values of k will the roots be …" — set up an inequality in k.**

```
   EQ p47 eg.3:   x² − 2x = 4 − k        (real roots)
                  x² − 2x + k − 4 = 0
                  Δ = (−2)² − 4(1)(k − 4)
                    = 4 − 4k + 16
                    = 20 − 4k  ≥ 0
                  −4k ≥ −20
                  k ≤ 5                  ← dividing by −4 flips the sign
```

**(b) "Prove the roots are real for all values of p" — complete the square ON the
discriminant.** `EQ p48 eg.1`

She reduces Δ to a quadratic in p, completes the square on it, and sketches the resulting
parabola with its turning point marked — `(p − 2)² + 4`, TP `(2;4)` — to show Δ can never
be negative. **This is a distinctive method of hers; keep it.**

**(c) "Determine the largest integer value of k for rational unequal roots" — test values
downward.** `T2122 p08 (2.3.2)`

She first gets the bound from `Δ ≥ 0` (`k ≤ 19`), then **tests k = 19, 18, 17 … in turn**,
computing Δ each time until it is a perfect square. Trial-and-check is her taught method
here — do not replace it with an algebraic shortcut.

**Reading Δ straight off a given root expression (`EQ p52`):** given
`x = (−2 ± √(12 − 2k))/3`, she takes `Δ = 12 − 2k` directly from under the root and works
with that. Fast and hers.

---

## Part C — Marking cues (from the marked memos)

Her memos are **tick-per-mark**. `ESMEMO`, `T11`.

- **A tick sits at the end of each credited line**, to the right — one tick, one mark.
- **The mark total for the question is in round brackets at the right margin**: `(3)`, `(5)`.
  The paper total is in **square brackets**: `[50]` (`ESMEMO p06`).
- **Marks are for the written steps, not the final answer.** A 5-mark simplification has
  ticks on the prime-factorisation line, the exponent-collection line and so on.
- ⚖️ **She writes "(any other method is acceptable)" / "any other method = full marks"** on
  the memo where two routes exist (`ESMEMO p01–p02`). Two routes are shown **side by side
  separated by `OR` and a vertical rule**. So: a generated round must **accept a correct
  answer reached another way** and must present the alternate route without calling it wrong.
- **Credited steps a generator should therefore always show:**
  - the prime-factorisation / same-base line,
  - the `let K = …` line,
  - the `LCD = …` and `limits: x ≠ …` line,
  - the substitution line of the quadratic formula,
  - the **CP** line for inequalities,
  - the **substitution test** for surd equations,
  - the substitute-back line that converts K back to x.
- **What loses marks (visible from the memo layout):** stopping at K without converting
  back; omitting the limits line; giving the calculator's `;` form instead of `or`; wrong
  rounding (she rounds to 2 decimals and marks it).

---

## Part D — Flags for Megan (things I could not resolve from the pages)

These are transcription-fidelity issues. **Nothing here has been silently "fixed"** — the
document follows her pages, and where two pages disagree the conflict is named.

| # | Where | The issue | What the doc currently does |
|---|---|---|---|
| **F1** | `ESMEMO p05 (4a)` vs `EQ p42` | `3ˣ = −1`: the memo concludes **"undefined"**; the KNOW THE DIFFERENCE box says **"no solution"**. | ✅ **RULED by Megan 2026-08-21: "no solution."** Undefined is reserved for division by zero. |
| **F2** | `EXP p14` vs everywhere else | The "two answers" box says `^even√(+x) = ± answer`, `√9 = ±3`. But `T11 p03`, `REVMEMO p13`, `T23 p04` all simplify `√9 = 3`, `√4 = 2` with no `±`. | ✅ **CONFIRMED by Megan 2026-08-21:** `±` only when **solving**, never when **simplifying** (the ± comes from the equation having two solutions — her parabola-x-intercepts picture — not from the √ symbol). |
| **F3** | `EXP p17` | The surd laws are numbered **①②④⑤⑥** — no ③. Either a law is missing or the numbering skipped. | Recorded as-is with the gap noted. |
| **F4** | `EXP p30` | `5ˣ = 25 → 5ˣ = 5² → x = 5`. Should be `x = 2`. | Transcribed as written and flagged. **Do not generate this example.** |
| **F5** | `EXP p39` vs `EXP p40`; `EXP p42` vs `EXP p47` | **Two roads, both hers.** Rational exponents: reciprocal-power vs raise-then-root. Surd equations: `let K = √x` vs isolate-and-square. | ✅ **RULED by Megan 2026-08-21: ALWAYS show both.** Reciprocal-power leads for rational exponents; `let K` substitution leads for surd equations; the other rides under OR every time (some of her kids prefer road 2 — never drop it). |
| **F6** | `EQ p39` | `c = 6 × 7 = −42` — the sign is dropped mid-line (should be `6 × −7`). Answer is right. | Transcribed as written. |
| **F7** | `EQ p23` | The calculator inset shows `a=1, b=−2, c=1`; the equation is `x² − 2x − 1 = 0`, so `c = −1`. | Transcribed as written, flagged. |
| **F8** | `REVMEMO p16 (5.2)` | Exponents sum to 4, so `2⁴ = 16`; the page writes **`= 8`**. | Flagged, not used as an example. |
| **F9** | `EQ p13 eg.3` | `x² − 13x + c = (x + k)²` gives `c = 169/4` ✓, but `k` is written as `13/2` where `(x + k)²` needs `−13/2`. | Flagged. |
| **F10** | `EQ p51 eg.2 b)` | `Δ = k² + 8k = 0 → k = 0 or k = −8`. `k = 0` arguably has to be rejected (the equation stops being quadratic). Her page keeps both. | Transcribed as written; **her call**. |
| **F11** | `ESREV p09 (3.1)` | `3x = 2` is followed by `x = 3/2`. The "OR" route on the next page gets `x = 2/3`. | Flagged; `2/3` is the one that checks out. |
| **F12** | `T23 p04 (5.1)` | Her method says divide the negative away (making a happy parabola), but the sketch drawn is a **sad** parabola — i.e. the original's shape. Answer `x < 0 or x > 2` is right either way. | Doc teaches the divide-away route per `EQ p29`. Worth one line from her on which sketch the app should draw. |
| **F13** | `REVMEMO p16` | Heading reads **"Question 8"** but the numbering under it is 5.1, 5.2, 5.3, 5.4; a second "Question 8" appears at `p27`. | Cited by page, not by her question number. |
| **F14** | `T23 p06` heading | Reads as "RIdLER / RIddER TOETS" in her handwriting; the **filename** says **"Riller Toets"**. | Filename treated as authoritative. |
| **F15** | `T23 p06 (1.2)`, `REVMEMO p18 (5.4)` | Answers left one step short: `(9 − 3√3 − 4√3)/18` (→ `(9 − 7√3)/18`, which she does complete on `p07`) and `√(2/3)` left unrationalised. | Noted; a generated final answer should be fully simplified and rationalised, consistent with `EQ p37`. |

**Also worth one line from her:** `T2122 pp9–12` is a **blank question paper** (Toets 2.2)
with no worked solutions, and `EQ p50 b), c)` and `EQ p52 b), c)` are **struck through** —
so those questions carry no method and were not mined.

---

## Part E — Skills the notes do NOT cover

Do **not** invent a method for any of these. If a generated Algebra round would need one,
the round does not get built until she supplies notes.

1. **Sum and product of roots** (`x₁ + x₂ = −b/a`, `x₁x₂ = c/a`) as a named formula. She
   only reconstructs an equation from given roots by multiplying the brackets out
   (`EQ p39`).
2. **Logarithms** — nothing anywhere, including for exponential equations that don't resolve
   to equal bases.
3. **Simultaneous equations with two non-linear equations.**
4. **Three-variable / three-equation systems.**
5. **Word problems / applications** for any equation type — no "the length is 3 more than
   the width" pages exist in this bank.
6. **Cubic equations** and the factor theorem.
7. **Absolute-value equations or inequalities.**
8. **Interval / set-builder notation** as an answer format (she uses `<`, `or`, `;` and
   `x ∈ ℝ`).
9. **Simultaneous inequalities** (a system of two inequalities solved together).
10. **Exponential graphs / functions** — those live in her Functions notes, digested
    separately as `graph-quest/reference/GR11-FUNCTIONS-NOTES-DIGEST.md`.
11. **Surd equations with an unknown index** beyond the single `ˣ√9 = 243` example
    (`REVMEMO p29`).
12. **Nature of roots of a non-quadratic.**

---

## Appendix — her vocabulary, one place

| Her word | Means |
|---|---|
| **guns / helmets** | bases / exponents (equating exponential equations) |
| **divorce** | splitting `x^(a+b)` into `xᵃ · xᵇ` |
| **caged** | inside brackets (safe to cancel) |
| **tickets out** | factors whose exponent matches the root index, so they leave the surd |
| **depressed exponents** | negative exponents |
| **flipped fractions** | `(x/y)⁻ᵃ = (y/x)ᵃ` |
| **KFC** | Keep, Flip, Change (dividing by a fraction) |
| **LCD** | lowest common denominator |
| **limits** | the restrictions `x ≠ …` on a fraction equation |
| **CP** | critical points (inequalities). Afrikaans **KP** = kritieke punte |
| **TIP Chips** | her checklist header for the quadratic-inequality method |
| **inside of bowl / outside of bowl** | the two regions of a quadratic inequality |
| **happy / sad parabola** | `a > 0` / `a < 0` |
| **N.A.** | not applicable (a rejected root). Afrikaans **nvt** |
| **diff in □'s** | difference of squares |
| **k-method** | the substitution `let K = …` |
| **□** | square (as in perfect square) |
| **exam favourites** | her label for the starred high-frequency questions |
| **of** (Afrikaans) | or |
| **LK** (Afrikaans) | linkerkant = left-hand side (LHS) |
| **Toets** (Afrikaans) | test |
| **kwadraatsvoltooiing** (Afrikaans) | completing the square |

---

*Digested 2026-08-21 from 196 pages of her handwritten notes. Fidelity over completeness:
where her handwriting or two of her pages disagree, the conflict is in Part D rather than
resolved silently.*
