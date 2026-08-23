# METHODS — Analytical Geometry (Grade 11)

**This document is binding for her VOICE.** Every hint, Esplain, drill round and exam
question generated for the Analytical Geometry chapters of Blipwork must use the wording,
sequencing, worked shapes and tips below. They are transcribed from **Megan's own Grade 11
class notes for Chapter 4**, digitally handwritten — the pages her learners actually sat in
front of.

Standing law inherited from `METHODS-algebra.md` and `METHODS-trig.md`: never substitute a
textbook explanation for hers. If a shorter or "cleaner" route exists and it is not on
these pages, it does not go in the app. Where the notes and a plain memo genuinely differ,
that is collected in **Part N — Where her notes differ from a standard memo**.

Nothing in this file is inferred. Every method, formula variant and worked value carries
its PDF page number. Where a page is ambiguous, self-contradictory or contains a slip, it
is an **F-flag** in Part P — never a guess.

---

## Sources

Read page-by-page as page images on 2026-08-23/24.

| Tag | File | Pages | What it is |
|---|---|---|---|
| `AG` | `Gr11 Analytic Geometry_260603_100512.pdf` | **31** | Main **teaching notes**, Analytical Geometry ("Chapter 4"). Digital handwriting (GoodNotes-style ink) over lined/boxed page templates. Mostly English. |

The file sits in the repo root and is gitignored. Page numbers in this digest are **PDF
page numbers**, cited as `AG p07`.

⚠️ **The brief said 228 pages. The file has 31.** It is the only Gr11 Analytic Geometry
notes PDF anywhere on her Desktop (searched), the page count is confirmed three ways
(PyMuPDF `page_count`, per-page image inventory, per-page render), and the chapter reads as
complete — cover → formulas → theory → guides → worked homework → exam favourites → a final
circle question. **All 31 pages were read.** See flag **F1**.

**Layout note.** Two kinds of page are mixed:
- **Note pages** (`p01–p10`, `p16`, `p18`, `p19`, `p23–p25`) — free ink on a lined
  background, her own headings in a bubble script.
- **Worked pages** (`p11–p15`, `p17`, `p20–p22`, `p26–p31`) — a typed OneNote question in a
  rounded box, her ink answer in the box beside or below it. These carry a
  hand-lettered **"Homework"** stamp on `p11`, `p12`, `p15`.

**Language.** English throughout, with **two Afrikaans words inside the formula card**
(`p02`): `bgtan` (= *boogtangens*, arctan) and `m sonder ⊖` (= "m **without** the minus").
See flag **F2** — they are the only Afrikaans in the file.

**Marked memos:** there are **none.** No ticks, no mark allocations anywhere. Everything is
a worked solution set. Same situation as the trig bank.

---

## Content map — pages → topic → app quest

| Pages | Topic | App quest |
|---|---|---|
| `p01` | Cover: "ANALYTICAL GEOMETRY · Chapter 4" | — |
| `p02` | **formulas** — the six-card formula sheet + the ✓/✱ legend | **ag1** |
| `p03` | **theory** — Median · Altitude · Perpendicular Bisector | **ag6 / ag7** |
| `p04` | **guide · distance** — formula, "order is important", when to use | **ag1** |
| `p05` | **midpoint** — formula, capital M, "no =, only ( )", when to use | **ag1 / ag5** |
| `p06` | **converse midpoint** — the **transformation** method, 2 examples | *(not in app)* |
| `p07` | **gradient** — formula, rise/run, ⊕m increasing / ⊖m decreasing | **ag2** |
| `p08` | horizontal (the car) · vertical (the car) · parallel · perpendicular | **ag2 / ag3** |
| `p09` | gradient — **when to use** (6 jobs, incl. collinearity) | **ag2 / ag3 / ag7** |
| `p10` | **4th point of ∥gram** (rectangle, rhombus or square) + **TIP Chips** | *(not in app)* |
| `p11` | Revision homework eg.1–4 (distance, midpoint, converse midpoint, 4th point) | **ag1 / ag5** |
| `p12` | **Equation of Straight Line** homework eg.1 (line, ∥ line, ⊥ line) | *(not in app)* |
| `p13` | Exam Favourites eg.1 (distance with a variable) · eg.2 (collinear with a variable) | **ag7** *(recall only)* |
| `p14` | Exam Favourites eg.3 ✱ (two standard-form lines ⊥, solve for `d`) | **ag3** *(partly)* |
| `p15` | Exam Favourites eg.4 (**show PQRS is a rectangle**) · eg.5 (`PR ⊥ RS`, solve for `k`) | **ag7** *(recall only)* |
| `p16` | **angle of inclination** — theory, the derivation triangle, obtuse rule | **ag4** |
| `p17` | Angle of Inclination eg.1–3 (from 2 points; from 2 equations) | **ag4** |
| `p18` | **works with any horizontal line** — angle at a vertex, two routes | *(not in app)* |
| `p19` | **exterior angle of triangle** — same angle, third route | *(not in app)* |
| `p20` | Angle of Inclination eg.4 (equation from 60°) · eg.5 (angle between 2 lines) | *(not in app)* |
| `p21` | Angle of Inclination eg.6 — θ and β on ΔABC | *(not in app)* |
| `p22` | Angle of Inclination eg.6 **repeated**, β done a second way — see **F3** | *(not in app)* |
| `p23` | **proofs** — the "prove that / show that" table | **ag7** |
| `p24` | **prove quads** — the ten-card quadrilateral table | **ag7** *(1 of 10)* |
| `p25` | **area** — ∥gram · rhombus · kite · "a rhombus is a kite" · trapezium | *(not in app)* |
| `p26–p27` | Exam Favourites eg.1 — ∥m ABCD, a–d (equation of DC, AD̂C, x of D, rhombus?) | *(not in app)* |
| `p28–p29` | Exam Favourites eg.2 — ∥m KLMN, a–f (m, LM̂K, diagonals, N, right angle?, **area of ΔKNM**) | **ag6** *(differently — see Part O)* |
| `p30–p31` | Exam Favourites eg.3 — circle, centre A, diameter BC (centre; ⊥ line through B) | **ag1 / ag7** *(recall only)* |

---

## Part 0 — Universal habits (apply to every generated analytical-geometry solution)

Break one of these and the working reads as "not my teacher's" even when the maths is right.

### 0.1 The two legends on the formula page

`AG p02` opens with a two-line key, top right:

> ✓ **formula sheet**   ✱ **memorize**

Cards ringed **purple** (Distance, Midpoint, Gradient) are the formula-sheet ones; cards
ringed **peach/pink** (Parallel, Perpendicular, Collinear, Angle of Inclination, Equation of
a line) are the memorize ones. The same ✱ reappears in the margin next to
**Perpendicular Bisector** (`p03`) and next to **eg.3** on `p14` and **eg.4** on `p15` —
her "know this one" mark.

### 0.2 Lower-case `m`, capital `M` — she says so on the page

- `AG p05`: **"capital letter M"** with an arrow to `M_AB`.
- `AG p07`: **"lower case letter m"** with an arrow to `m_AB`.

Both are written in pink beside the formula, not left implicit. The app's ag1 `mVsM` skill
is the right idea and its wording matches.

### 0.3 Subscript the line, not the points

She writes `m_AB`, `M_AB`, `m_CD`, `M_PR`, `M_KM` — the **two letters of the segment** as a
subscript on the letter. Never `m₁`, never "gradient of AB" in words in a working line.
(`p02`, `p05`, `p07`, `p15`, `p27`, `p29`, `p30`.)

### 0.4 "order is important" — stated twice, in two places

- **Distance** (`p04`, boxed in blue): *"if `x_A` is written 1st in the one bracket, then
  `y_A` must be written 1st in the other bracket"*.
- **Gradient** (`p07`, pink arrow): *"if `y_A` is written 1st in the numerator, then `x_A`
  must be written 1st in the denominator"*.

This is her single most-repeated structural rule in the chapter. The app's ag1 `orderRule`
skill states the gradient half; the **distance half is not in the app** (Part O).

### 0.5 `M_AB( … ; … )` — no equals sign

`AG p05`, in pink under the formula: **"no `=`, only `( )`"**. So the midpoint line is
written `M_AB( (x_A+x_B)/2 ; (y_A+y_B)/2 )`, straight into the bracket, and only the *final*
tidy line carries an `=`:

```
   M_BD( (6+(−2))/2 ; (0+4)/2 ) = M_BD(2 ; 2)          AG p11 eg.2
   M_PR( (6+(−3))/2 ; (2+(−1))/2 ) = M_PR(3/2 ; 1/2)   AG p15 eg.4
```

### 0.6 Semicolon between coordinates, decimal comma in answers

Every coordinate is `(2 ; 2)`, `(−4 ; 3)`, `(7/2 ; 3/2)` — a **semicolon**, spaced.
Every decimal answer is a **comma**: `63,43°`, `141,34°`, `37,5 units²`, `59,04°`.

### 0.7 Full decimals mid-working, 2 dp at the end

`AG p18`, `p19`, `p21`, `p22`, `p28`:

```
   θ = 63,4349…          α = 57,5288…          α = 108,4349°
   ∴ LM̂K = 180 − 63,43 − 57,52 = 59,04°
```

She carries the trailing dots (`63,4349…`) while the angle is still an intermediate, and
rounds to **two decimals** only on the answer line. Identical to her trig ruling. Never
round an inclination angle before subtracting it.

### 0.8 The Euclidean reason in round brackets

Analytical geometry answers still carry **geometry reasons**, exactly as a Euclid proof
would:

| Reason, as she writes it | Where |
|---|---|
| `(diags of ∥m bisect)` | `p06` |
| `(∠s on str. line)` | `p18`, `p21` |
| `(ext. ∠ of Δ)` | `p19`, `p20`, `p21`, `p22`, `p28` |
| `(vert. opp. ∠s)` | `p19` |
| `(int ∠s of Δ)` | `p26` |
| `(∥m with one int. ∠ 90°)` | `p15`, `p29` |
| `(∥m with diags ⊥)` | `p27` |

⚙️ **Build note:** these strings must survive verbatim into any generated solution. They
are the same abbreviation style as `EUCLID-ACCEPTABLE-REASONS.md`.

### 0.9 `∴` opens the conclusion, one claim per line

`∴ AC ⊥ BD` then `∴ ABCD is a rhombus (∥m with diags ⊥)` (`p27`). Two separate lines. She
never merges the perpendicularity claim and the shape claim.

### 0.10 The curl arrow = "swap these two"

Her cross-multiplying shorthand is a small **hooked arrow** drawn between the two things
that trade places, not a written "×" step:

```
   28/2d = −1        →        28/(−1) = 2d          AG p14
   (k+2)/(2k−3) = −1 →        k + 2 = −2k + 3       AG p15
   −1 = −5/(x+4)     →        x + 4 = −5/(−1)       AG p27
```

On `p13 eg.2` the same idea is a big **red X** drawn across `3/4 = k/(k²−5)`.

### 0.11 Exact answers stay exact

`2√5` (`p11`), `5√5` and `3√5` (`p29`), `√3` (`p20`), `−3/11` (`p21`). Lengths are left as
surds; she never converts a distance to a decimal.

### 0.12 Areas carry `units²`

`= 37,5 units²` (`p29`). Not "u²", not bare.

### 0.13 "shift tan"

Her calculator instruction, written in blue on the page: **`shift tan (⅓)`** (`p17 eg.3`),
**`shift tan (7)`** (`p26`). Generated hints should use her phrase, not "tan⁻¹ on your
calculator".

---

## PART A — The formula page (`AG p02`) · Round: ag1

Six cards, in this reading order (left column then right, top to bottom):

| Card | Ring | What she writes |
|---|---|---|
| **Distance** | ✓ purple | `AB = √[(x_B − x_A)² + (y_B − y_A)²]` |
| **Midpoint** | ✓ purple | `M_AB( (x_A+x_B)/2 ; (y_A+y_B)/2 )` |
| **Gradient** | ✓ purple | `m_AB = Δy/Δx = (y_B − y_A)/(x_B − x_A)` |
| **Parallel lines ∦** | ✱ peach | *"If AB ∥ BC then* `m_AB = m_BC`*"* — see **F4** |
| **Perpendicular lines ⊥** | ✱ peach | *"If AB ⊥ BC, then* `m_AB × m_BC = −1`*"*, then **"(switch and change the sign)"** — see **F4** |
| **Collinear Points** | ✱ peach | *"Points on the same straight lines. If A, B and C are collinear, then* `m_AB = m_BC = m_AC`*"* |
| **Angle of Inclination** | ✱ peach | two mini-diagrams (rising line, falling line) + `tan θ = m_AB`; then *"obtuse angle (m < 0)"* `θ = 180° − bgtan(m_AB)`, with the green note **`m sonder ⊖`** |
| **Equation of a line** | ✱ peach | `y − y₁ = m(x − x₁)`, with two blue arrows from `y₁` and `x₁` down to **"coördinate of a point on the line"** |

⚠️ Note the **highlighted** parts: `m_AB = m_BC`, `m_AB × m_BC = −1`, and
`m_AB = m_BC = m_AC` all sit in a pink highlight — those are the three lines she wants
memorised as strings.

---

## PART B — The three lines inside a triangle (`AG p03`) · Rounds: ag6, ag7

Three cards, each a **drawing plus a one-sentence definition in colour-coded words**. The
colour coding is load-bearing: `vertex` is green, `midpoint` is blue, `perpendicular` is
purple, `opposite side` / `line segment` is orange.

### B1. Median
> = a line drawn from a **vertex** of a triangle to the **midpoint** of the **opposite side**

Drawn as an obtuse triangle with a **green dot at the apex**, the median in teal, and
**double tick marks (‖ ‖)** on the two halves of the base.

### B2. Altitude
> = a line drawn from a **vertex** of a triangle **perpendicular** to the **opposite side**

Same triangle, altitude in teal dropping to the base, with a **small square right-angle
mark**. No tick marks.

### B3. Perpendicular Bisector — ✱ marked
> = a line that passes through the **midpoint** of a **line segment** and is
> **perpendicular** to that **line segment**

Drawn as a **full line crossing the base**, extending past it both ways — not a segment
inside the triangle. Carries **both** the right-angle square **and** the double tick marks.

⚠️ **The tick-mark / right-angle-mark contrast is the whole teaching device**: median =
ticks only, altitude = square only, perpendicular bisector = both. The app's ag7
`identifyLine` skill already copies this exactly ("Right-angle mark → altitude. Equal tick
marks → median.") — keep it.

⚠️ The perpendicular bisector is **defined here and never used again in the file**. There
is no worked perpendicular-bisector question anywhere in the 31 pages. See Part O and
flag **F5**.

---

## PART C — DISTANCE (`AG p04`, worked `p11`, `p13`) · Round: ag1

### C1. Her formula, and the order rule

`AG p04` writes the formula **A-first**:

```
   AB = √[(x_A − x_B)² + (y_A − y_B)²]
```

(The `p02` formula card writes it **B-first**: `(x_B − x_A)² + (y_B − y_A)²`.
`AG p13` uses a **third** notation, `(x₂ − x₁)² + (y₂ − y₁)²`. All three are the same
number because the bracket is squared — but the app must pick one. See **F6**.)

Boxed underneath, in blue:

> **order is important**
> if `x_A` is written 1st in the one bracket, then `y_A` must be written 1st in the other
> bracket

### C2. "when to use:" — her four jobs

`AG p04`, under a mint-highlighted **"when to use:"** header:

- **length of a line segment**
- **prove that point P is equally distant from A and B** — drawn as a shallow V, `A—P—B`,
  with tick marks on both arms
- **prove two sides / lines are equal in length**
  - **isosceles** Δ = 2 sides with equal length
  - **equilateral** Δ = all sides with equal length
  - **scalene** Δ = no sides with equal length
  - opposite sides of ∥gram
  - adjacent sides of rhombus
- **length of a circle's radius**

⚙️ The "equally distant from A and B" bullet is her only nod at the equidistance property
(the app's ag5 `equidistant` skill) — and she attaches it to the **distance formula**, not
to the perpendicular bisector.

### C3. Worked — a plain length (`AG p11 eg.1`)

```
   Find the distance between A(2 ; 2) and B(6 ; 0)

   AB = √[(2 − 6)² + (2 − 0)²]
      = 2√5
```

Two lines only. She substitutes **A first** and goes **straight to the simplified surd** —
no `√(16+4)`, no `√20` line. Keep that compression.

### C4. Worked — distance with an unknown (`AG p13 eg.1`)

> The point `(k + 1 ; 3)` is `√5 k` units from the point `(2 ; 2k + 1)`. Determine the
> value(s) of `k`.

```
   Distance = √[(x₂ − x₁)² + (y₂ − y₁)²]
   (√5 k)² = ( √[(2 − (k+1))² + (2k+1 − 3)²] )²        ← square BOTH sides, brackets and all
   5k²     = (2 − k − 1)² + (2k − 2)²
   5k²     = (1 − k)² + (2k − 2)²
   5k²     = 1 − 2k + k² + 4k² − 8k + 4
   0       = −10k + 5
   10k     = 5
   k       = 1/2
```

**The method beat:** she writes the whole right-hand side **inside a bracket with an outer
square** before the root disappears. The `5k²` term is re-written in a second colour on the
line where the squares get expanded, so the learner sees it survive. She uses a **capital
K** in the working while the question uses lower-case `k` — same habit as her trig notes.

---

## PART D — MIDPOINT (`AG p05`, worked `p11`, `p15`, `p29`, `p30`) · Rounds: ag1, ag5

### D1. Her formula card (`AG p05`)

```
                    x-coordinate ↓
   M_AB( (x_A + x_B)/2  ;  (y_A + y_B)/2 )
      ↑                              ↑ y-coordinate
   capital letter M      "no =, only ( )"
```

Four annotations round one formula — she labels the capital M, the two coordinates, and the
bracket rule. All four should appear in the app's formula Esplain.

### D2. "when to use:"

- **determine the coordinates of the midpoint of a line segment**
- **prove that AB bisects CD** — drawn as an X with tick marks on both halves of CD
- **midpoint of a circle** ↳ **radius = ½ diameter** — drawn as a circle with two crossed
  chords, ticks on all four halves
- **when the midpoint is given or `AC = BC`** — then `C(x ; y)` is
  `M_AB( (x_A+x_B)/2 ; (y_A+y_B)/2 )`, and she splits it out:
  `∴ x_C = (x_A + x_B)/2` **and** `y_C = (y_A + y_B)/2`

⚙️ Note her phrase is **"midpoint of a circle"**, not "centre". The app's ag1 `forTheJob`
and ag7 `circleFormulas` skills both say "centre". Not wrong — but her word is *midpoint*.

### D3. ⭐ CONVERSE MIDPOINT — **the transformation method** (`AG p06`)

**This is the single biggest thing in the file that the app does not have.** When the
midpoint is known and an endpoint is missing, she does **not** rearrange
`x_M = (x_A + x_B)/2` into `x_B = 2x_M − x_A`. She reads the **step**:

> **The transformation from `A → M` = `M → B`**

```
   If M(2 ; 3) is the midpoint of AB, determine the coordinates of B.     [A(−3 ; 2)]

   The transformation from  A → M  =  M → B
   ∴  x_A → x_M = +5
      y_A → y_M = +1
   ∴  B(2 + 5 ; 3 + 1)
    = B(7 ; 4)
```

Drawn beside it: the segment `A—M—B` with **two pink swoop arrows**, `A→M` and `M→B`, and
tick marks on both halves.

Second example on the same page, a parallelogram:

```
   ABCD is a ∥m where the diagonals intersect at M. Determine the coordinates of B.
                                                     [M(−2 ; 1), D(0 ; −2)]
   BM = MD   (diags of ∥m bisect)

   The transformation from  D → M  =  M → B
   ∴  x_D → x_M = −2
      y_D → y_M = +3
   ∴  B(−2 + (−2) ; 1 + 3)
    = B(−4 ; 4)
```

**Her language, verbatim, to reuse:** *"The transformation from A → M = M → B"*.

### D4. Worked — converse midpoint on the homework page (`AG p11 eg.3`)

Here she compresses the same method to two lines, and annotates the *arrow* rather than
writing the words:

```
   A → M :   4 → 1 = −3   (x)
             5 → 3 = −2   (y)

   B(1 − 3 ; 3 − 2)
   = B(−2 ; 1)
```

with `MB = MA` written under the diagram, and `x = −3` / `y = −2` written on the arrow
itself. Both compressions are hers — the long form on `p06`, the arrow form on `p11`.

### D5. Worked — midpoint used to prove a ∥m (`AG p15 eg.4`, `AG p29`)

Diagonals sharing a midpoint is her go-to parallelogram proof:

```
   M_PR( (6+(−3))/2 ; (2+(−1))/2 ) = M_PR(3/2 ; 1/2)
   M_QS( (3+0)/2 ; (−4+5)/2 )      = M_QS(3/2 ; 1/2)      ← labelled M_QR on the page, see F7
   ∴ diagonals bisect, so PQRS is a ∥m
```

And on `AG p29` the same formula answers "where do the diagonals meet":

```
   M_KM( (7+0)/2 ; (−4+7)/2 ) = M_KM(7/2 ; 3/2)
```

⚙️ Note: for "where do the diagonals meet", she takes the midpoint of **one** diagonal and
stops. She does not compute both and compare — that is the *proof* shape, not the
*find-the-point* shape.

---

## PART E — GRADIENT (`AG p07–p09`, worked throughout) · Rounds: ag2, ag3

### E1. Her formula and her definition (`AG p07`)

```
   m_AB = (y_A − y_B)/(x_A − x_B)          ↕ rise
                                            ↔ run
   lower case letter m       "order is important"
```

> `=` **gradient refers to how steep a line is**

(Again A-first here, B-first on the `p02` card — see **F6**.)

### E2. Increasing and decreasing — with the walk

Two boxes, each with two worked pictures drawn to scale (the rise arm in pink, the run arm
in purple):

| Box header | Examples | Her reading |
|---|---|---|
| **⊕ m / m > 0 = line is increasing** | `m = 2/3` | *"2 units **up** and 3 units **right**"* |
| | `m = 3/1` | *"3 units up and 1 unit right"* |
| **⊖ m / m < 0 = line is decreasing** | `m = −2/3` | *"2 units **down** 3 units right"* |
| | `m = −3/1` | *"3 units down and 1 unit right"* |

**The run is always "right".** The sign lives entirely in the up/down word. That is the
teaching point of the box, and it is what makes `−3/1` read as "down 3, right 1" rather
than "up 3, left 1".

⚙️ She writes `3/1` and `−3/1` **as fractions**, never as `3` and `−3`, in this box. Same
habit as her trig `tan45 = 1/1`.

### E3. Horizontal and vertical — **the car** (`AG p08`)

Two mini-graphs, each with a **little red hatchback drawn on the line**: flat on the
horizontal, standing on its nose on the vertical.

| | Her words | Her arithmetic | Verdict |
|---|---|---|---|
| **horizontal line** | *"not walking up or down, just to the right"* | `∴ 0/6 = 0` | **gradient is zero** |
| **vertical line** | *"just going down"* | `∴ 6/0 = undefined` | **gradient is undefined** |

⚙️ The `0/6` and `6/0` are hers — she shows the *fraction*, not a rule. Any Esplain must
show the division, not assert the answer. The word is **undefined**, never "no gradient",
never "infinite".

### E4. Parallel (`AG p08`, `p09`)

```
   if AB ∥ CD, then m_AB = m_CD
   (gradients of ∥ lines are the same)
```

Drawn as two short parallel arrows with the ∥ arrowheads. Note: on `p08` and `p09` she uses
**AB and CD** (two separate lines) — only the `p02` formula card uses the AB/BC form.
See **F4**.

### E5. Perpendicular (`AG p08`) — **"switch and change the sign"**

```
   if AB ⊥ CD, then m_AB × m_CD = −1

   ∴ if m_AB = 2/3   then   m_CD = −3/2
```

with a to-scale crossing-lines diagram carrying a **blue right-angle square**, and the rule
spelled out as two bullets:

> • **switch numerator and denominator**
> • **and change the sign**

⚠️ Her phrase on the `p02` card is the shorter **"(switch and change the sign)"**. The app's
ag3 says "negative reciprocal: turn the fraction upside-down AND flip the sign" — same idea,
**wrong words**. Use hers. See Part O.

### E6. "when to use:" — the six gradient jobs (`AG p09`)

- **slope of a line**
- **prove two lines are parallel** = if `m_AB = m_CD` then `AB ∥ CD`
- **prove two lines are perpendicular** = if `m_AB × m_CD = −1` then `AB ⊥ CD`
- **equation of a straight line** ↳ `y = mx + c`
- **prove collinear points** = if `m_AB = m_BC = m_AC` then points are collinear
  *(drawn as A—B—C on one straight line with three coloured arcs bulging off it)*
- **find variable when collinear points are given** = if A, B and C are collinear then
  `m_AB = m_BC = m_AC`, **∴ equate gradients**

**"equate gradients"** is her instruction word for the variable case. Use it.

### E7. Worked — collinear with a variable (`AG p13 eg.2`)

> The points `P(1 ; −2)`, `Q(5 ; 1)` and `R(k² ; k + 1)` are collinear. Calculate the
> value(s) of `k`.

```
   m_PQ = m_QR = m_PR                        ← she writes the full chain first, every time

   (1 − (−2))/(5 − 1) = (k + 1 − 1)/(k² − 5)
            3/4       =  k/(k² − 5)          ← big red X across the two fractions
   3(k² − 5) = 4k
   3k² − 15  = 4k
   3k² − 4k − 15 = 0
   (k − 3)(3k + 5) = 0
   k = 3   or   k = −5/3
```

Habits: the **chain line `m_PQ = m_QR = m_PR` opens the answer** even though she only uses
two of the three; each point's coordinates are **highlighted in its own colour** in the
question box and the same colours reappear in the substitution; two roots are written
**side by side separated by `or`**.

### E8. Worked — gradient from standard form, with a variable (`AG p14 eg.3` ✱)

> The straight lines `7x + 2y = 0` and `dy + 4x = −3` are perpendicular to eachother.
> *(her spelling)* Calculate the value of `d`.

The two lines are made `y`-subject **side by side, separated by a hand-drawn vertical
rule**:

```
   7x + 2y = 0        |   dy + 4x = −3
   2y = −7x           |   dy = −4x − 3
   y = −(7/2)x        |   y = −(4/d)x − 3/d
   ∴ m = −7/2         |   ∴ m = −4/d

   ∴  −7/2 × −4/d = −1
              28/2d = −1          ↷
              28/(−1) = 2d
              −28 = 2d
              −14 = d
```

**The side-by-side vertical rule is her layout for "two lines, same treatment"** — it
reappears on `p31`. Keep it in any generated multi-line working.

### E9. Worked — solve for a variable from a ⊥ condition (`AG p15 eg.5`)

```
   m_PR × m_RS = −1                          ← the condition line comes FIRST

   m_PR = (5 − 2)/(6 − 3) = 3/3 = 1     m_RS = (k + 4 − 2)/(2k − 3) = (k + 2)/(2k − 3)

   1 × (k + 2)/(2k − 3) = −1
        (k + 2)/(2k − 3) = −1      ↷
        k + 2 = −2k + 3
        k + 2k = 3 − 2
        3k = 1
        k = 1/3
```

Note `3/3 = 1` is written out — she does not silently simplify.

---

## PART F — EQUATION OF A STRAIGHT LINE (`AG p12`, `p20`, `p26`, `p31`) · *not in app*

### F1. She teaches BOTH forms, and writes BOTH out

`AG p12` and `AG p31` both show the same question answered **twice on one page**, the two
methods separated by a horizontal rule (`p12`) or a vertical rule (`p31`):

**Method 1 — the point-gradient form** (the `p02` card):
```
   A(1 ; 3) ↝ y − y₁ = m(x − x₁)
              y − 3 = −½(x − 1)
              y = −½x + ½ + 3
              y = −½x + 7/2
```

**Method 2 — `y = mx + c`**:
```
   A(1 ; 3) ↝ y = mx + c
              3 = −½(1) + c
              3 = −½ + c
              7/2 = c   →   y = −½x + 7/2
```

⚙️ Both are hers and both must survive. The `↝` squiggle-arrow between the point and the
formula is her notation for "substitute this point into this".

### F2. Parallel through a point (`AG p12`)

She writes the transferred gradient **first, on its own line, with an arrow from the
highlighted phrase in the question**:

```
   [parallel with line AB]  ↳ m = −½

   (−2 ; 1) ↝ y − y₁ = m(x − x₁)
              y − 1 = −½(x + 2)
              y = −½x − 1 + 1
              y = −½x
```
(then the same answer again via `y = mx + c`.)

### F3. Perpendicular through a point (`AG p12`)

```
   [perpendicular to line AB]  ↳ m_AB × m = −1   ∴ m_AB = −½
                                              ∴ m = 2

   (2 ; 7) ↝ y − y₁ = m(x − x₁)
             y − 7 = 2(x − 2)
             y = 2x − 4 + 7
             y = 2x + 3
```

⚠️ The `y = mx + c` re-run of this one ends **`∴ y = 2x + c`** — a slip; `c` was already
found to be `3` on the line above. See **F8**.

### F4. Equation from a given inclination (`AG p20 eg.4`)

> Determine the equation of a line with an inclination angle of 60° and goes through the
> point `P(0 ; 4)`.

```
   m = tan 60 = √3
   y = √3x + 4
```

**Two lines.** Because `P` is on the y-axis she reads `c = 4` straight off and never
substitutes. The exact value `√3` is kept — not `1,73`.

### F5. Equation from a given inclination, off-axis point (`AG p26`)

```
   m_CD = tan 135 = −1
   C(−4 ; 3) ↝ y − y₁ = m(x − x₁)
               y − 3 = −1(x + 4)
               y = −x − 4 + 3
               y = −x − 1
```

---

## PART G — 4th POINT OF A ∥GRAM (`AG p10`, worked `p11`, `p27`) · *not in app*

### G1. Her heading

> **4th point of ∥gram**
> *(rectangle, rhombus or square)*

i.e. **one method covers all four shapes**. She says so in the subtitle.

### G2. The method — the same transformation as D3

```
   Find the coordinates of D if ABDC is a ∥gram.       [A(−3;1), B(3;4), C(0;−4)]

   The transformation from  A → B  =  C → D
   ∴  x_A → x_B = +6
      y_A → y_B = +3
   ∴  D(0 + 6 ; −4 + 3)
    = D(6 ; −1)
```

### G3. ⚠️ "order makes a difference" — the same three points, a different answer

Written in blue with an arrow pointing at the **letter order** in the question:

```
   Find the coordinates of D if ABCD is a ∥gram.       [same A, B, C]

   The transformation from  B → C  =  A → D
   ∴  x_B → x_C = −3
      y_B → y_C = −8
   ∴  D(−3 − 3 ; 1 − 8)
    = D(−6 ; −7)
```

`ABDC` gives `D(6 ; −1)`; `ABCD` gives `D(−6 ; −7)`. **Same points, different naming order,
different fourth vertex.** This is the trap of the page.

### G4. ⭐ TIP Chips (`AG p10`)

Under her hand-lettered **TIP Chips** header with a row of tortilla-chip doodles — the same
device as her trig notes:

> ↳ **arrows must show in the same direction**
> ↳ **let the arrow go to the unknown point**

These two lines *are* the method. Rule 2 is what picks which pairing to use; rule 1 is what
stops the learner reversing one of them.

### G5. Worked (`AG p11 eg.4`, `AG p27`)

```
   If PRQS is a ∥m, determine the coordinates of S.    [P(−4;3), R(−2;−3), Q(3;2)]
   R → Q :  x = +5 ,  y = +5
   S(−4 + 5 ; 3 + 5) = S(1 ; 8)
```

```
   AG p27:  C → B  =  D → A ,  x = +1 , y = +7
            A(1 + 1 ; −2 + 7) = A(2 ; 5)
```

On `p11` and `p27` the `x = +5 / y = +5` labels are written **on the swoop arrow itself**,
in purple/blue, rather than as separate lines.

---

## PART H — ANGLE OF INCLINATION (`AG p16`, `p17`, `p20`) · Round: ag4

### H1. Where it comes from (`AG p16`) — two panels side by side

**Left panel:** `A(1 ; 0)`, `B(7 ; 7)`, and the plain gradient:
```
   m_AB = (7 − 0)/(7 − 1) = 7/6
```
**Right panel:** the *same* picture with the run and rise drawn in as `a = 6` (purple) and
`o = 7` (blue), a right-angle square, and θ at A:
```
   tan θ = o/a = 7/6
```

That is the whole derivation: **the gradient triangle IS the trig triangle.** Then, boxed:

> **tan θ = m_AB**
> • **angle between line and positive x-axis**
> • **works anti-clockwise**  *(with a small circled anticlockwise arrow)*

### H2. ⚠️ The obtuse rule and the calculator warning (`AG p16`)

Header: **"obtuse angle ↝ negative gradient"**. Worked with `A(3 ; 0)`, `B(−2 ; 4)`:

```
   m_AB = (4 − 0)/(−2 − 3) = ⊖ 4/5          ← the minus circled, a green arrow strips it
   tan α = 4/5
   ∴ α = 38,66°
   θ = 180 − 38,66°
     = 141,34°
```

Below it, in a **green highlight**:

> ## DO NOT type the negative into calc

This is the single most-emphasised warning in the chapter. The app's ag4 `dontTypeNeg`
skill exists for exactly this — but the app's wording is "should you type the negative
gradient straight into tan⁻¹". **Her line is `DO NOT type the negative into calc`.**

⚙️ Her letters: **α is the acute reference angle, θ is the inclination.** The app's ag4 uses
`ref` and `θ`. Keep α in learner-facing text.

⚠️ On `p21`/`p22` she *does* write `tan α = −3` on the line and then jumps to
`α = 180 − 71,565`. So the negative appears **in the written equation** but never **in the
calculator**. Both habits are hers; do not "fix" one to match the other.

### H3. Worked — from two points (`AG p17 eg.1`)

```
   m_AB = (−6 − 4)/(−1 − 4) = −10/−5 = 2
   tan θ = m_AB
   tan θ = 2
       θ = 63,43°
```

**Three separate lines** — the rule `tan θ = m_AB`, then the substituted `tan θ = 2`, then
the answer. She never collapses them.

### H4. Worked — from an equation (`AG p17 eg.2, eg.3`)

```
   eg.2   3y − 15 = 2x          eg.3   3y + x = 6
          3y = 2x + 15                 3y = −x + 6
          y = (2/3)x + 5               y = −(1/3)x + 2

          tan θ = 2/3                  tan θ = −1/3      ↷ (red curl strips the minus)
              θ = 33,69°                   θ = 180 − 18,43      [shift tan (⅓)]
                                             = 161,57°
```

**Always make `y` the subject in full before reading `m`.** She never uses `m = −a/b`
directly from standard form for an inclination question. (She *does* use the same
make-y-the-subject route on `p14` for the perpendicular question — so the rearrangement is
her universal move.) The app's ag3 `fromStandard` skill teaches `m = −a/b` as a shortcut —
see Part O.

---

## PART I — ANGLE AT A VERTEX (`AG p18`, `p19`, `p20`, `p21`, `p22`, `p26`, `p28`) · *not in app*

The chapter's hardest and most-repeated skill: an angle **inside a figure**, not on the
x-axis. She gives it **four named routes**, all on the same worked example
(`K(0;7)`, `L(10;2)`, `M(7;−4)`, find `LM̂K` — answer `59,04°` every time).

### I1. Why it needs a method at all (`AG p18`)

Her own framing, written beside the first diagram:

> Find the size of `LM̂K`
> ↳ **not on x-axis**
> ↳ **values of other angles are unknown**
> ↳ **can calculate gradients of lines**

### I2. ⭐ ROUTE 1 — **"works with any horizontal line"** (`AG p18`, the page heading)

**Draw a dashed horizontal line through the vertex**, marked with **double-chevron parallel
arrows (»)** matching the x-axis. Both lines out of the vertex now have their own
inclination, measured against that dashed line.

```
   m_ML = (2 − (−4))/(10 − 7) = 2
   tan θ = 2          ∴ θ = 63,4349…

   m_KM = (7 − (−4))/(0 − 7) = −11/7
   tan α = 11/7       ∴ α = 57,5288…

   ∴ LM̂K = 180 − θ − α
          = 180 − 63,43 − 57,52
          = 59,04°              (∠s on str. line)
```

### I3. ROUTE 2 — the obtuse inclination, then subtract (`AG p18`, under **OR**)

Same page, below a hand-drawn `OR` and a rule:

```
   θ = 63,4349…
   α = 180 − 57,5288 = 122,4712…
   ∴ LM̂K = α − θ
          = 122,47 − 63,43
          = 59,04°
```

### I4. ⭐ ROUTE 3 — **exterior angle of a triangle** (`AG p19`, the page heading)

Boxed at the top, in blue, with a small triangle where the two opposite interior angles are
marked as a **pink dot** and a **green dot**:

> **Exterior ∠ = ● + ●**

Then, on the same worked figure:

```
   α = LM̂K + θ
   ∴ LM̂K = α − θ         (ext. ∠ of Δ)
```

with **`vert. opp. ∠s`** highlighted in pink at the point where the line crosses the x-axis
(that is what licenses using the inclination angle as an interior angle of the triangle).

Her note beside it: **"obtuse angle = negative falls down to 180° −"**.

### I5. ROUTE 4 — interior angles of a triangle (`AG p26`)

Used when one angle is given rather than computed:

```
   tan θ = 7
       θ = 81,8698°
   AD̂C = 180 − 45 − 81,8698     (int ∠s of Δ)
       = 53,13°
```

### I6. Angle **between two lines** — the helper triangle (`AG p20 eg.5`)

Given `y = x + 2` and `y = 3x − 4`, find the angle θ between them:

```
   tan β = 1        ∴ β = 45°
   tan α = 3        ∴ α = 71,565°
```

Then she **draws a separate small triangle to the side**, off the axes, with `45°` at one
base corner and `71,57` as the exterior angle at the other, and θ at the apex:

```
   71,57 = 45 + θ        (ext. ∠ of Δ)
        θ = 71,57 − 45
          = 26,57°
```

⚙️ **The separate helper sketch is the method.** She does not reason on the main diagram —
she redraws the triangle alone, clean, and works there. Same device as the small sketch in
the margin of `p26`.

### I7. Worked — two angles on one triangle (`AG p21`)

`A(−4 ; 2)`, `B(−2 ; −4)`, `C(7 ; −1)`.

```
   θ:   m_AB = (−4 − 2)/(−2 − (−4)) = −3
        tan α = −3   →  α = 180 − 71,565 = 108,4349°
        m_AC = (−1 − 2)/(7 − (−4)) = −3/11
        tan β = −3/11 →  β = 180 − 15,255 = 164,7448°
        θ = β − α        (ext. ∠ of Δ)
          = 164,7448 − 108,4349
          = 56,31°

   β:   m_BC = (−4 − (−1))/(−2 − 7) = 1/3
        tan α = 1/3   →  α = 18,4349°
        m_AB = −3
        tan θ = −3    →  θ = 71,565
        β = 180 − 71,565 − 18,43        (∠s on str. line)
          = 90°
```

⚠️ `AG p22` is **the same eg.6 again**, and the `β` half is done differently there:
`θ = 180 − 71,565 = 108,4349°` then `β = 108,4349 − 18,4349 = 90°` — with **no reason
cited**. See **F3**.

### I8. Worked — inclination inside a parallelogram (`AG p28`)

```
   tan θ = m_KM = (−4 − 7)/(7 − 0) = −11/7
       θ = 180 − 57,5288 = 122,4711°

   tan α = m_LM = (−4 − 2)/(7 − 10) = 2
       α = 63,4349°

   LM̂K = θ − α        (ext. ∠ of Δ)
        = 122,4711° − 63,4349°
        = 59,04°
```

Note she keeps the **degree symbol on the intermediate values** in this one
(`122,4711°`), unlike `p18` where they are bare. Both appear; do not standardise silently.

---

## PART J — PROOFS: "prove that / show that" (`AG p23`) · Round: ag7

Her page header is **proofs**, and the sub-header is **"Prove that / Show that:"** — she
treats the two question words as interchangeable.

| Statement to prove | What she says to show |
|---|---|
| **AB ∥ CD** | prove `m_AB = m_CD` |
| **AB ⊥ CD** | prove `m_AB × m_CD = −1` |
| **AB and CD bisect at M** | *"Show that M is the midpoint of both lines"* ↳ **midpoint formula** ↳ **properties of ∥m** ↳ `CD = MD` and `AM = MB` **(long way)** — see **F9** |
| **AB bisect CB̂D** | prove `B̂₁ = B̂₂` *(the two angles at B numbered 1 and 2, orange dots)* |
| **ΔABC = equalateral** *(her spelling)* | ↳ **all 3 angles = 60°** ↳ `AB = BC = AC` |
| **ΔABC = right-angled** | ↳ **converse pyth** ↳ **prove ⊥** |

⚙️ The bisect-at-M card gives **three** routes in her own preference order, with the
distance route explicitly labelled **"(long way)"**. The app's ag7 `proveParallelogram`
skill teaches only the first (diagonals share a midpoint) — correct, but it is one of six
cards on this page.

---

## PART K — PROVE QUADS (`AG p24`) · Round: ag7 — **the app has 1 of these 10**

Ten colour-ringed cards. Where two cards carry the same shape name, they are **alternative
routes** — either one proves it.

| Shape | Route ① | Route ② |
|---|---|---|
| **Parallelogram** | prove **diagonals bisect** *(same midpoint)* | prove **one pair opp. sides ∥ and =** |
| **Rectangle** | • prove **∥m** • prove **one interior angle is 90°** | — |
| **Trapezium** | **one pair opp. sides ∥** | — |
| **Rhombus** | • prove **∥m** • prove **diagonals bisect ⊥** | • prove **∥m** • prove **one pair of adj. sides =** |
| **Square** | • prove **rectangle** • prove **diagonals bisect ⊥** | • prove **rectangle** • prove **one pair of adj. sides =** |
| **Kite** | **2 pairs adj. sides =** | **one diagonal bisect the other ⊥** |

⚙️ Note the **build-up structure**: rectangle needs ∥m first, square needs rectangle first,
rhombus needs ∥m first. Nothing is proved from scratch. Any generated proof question must
respect that order.

### K1. Worked — rectangle (`AG p15 eg.4`)

The shape of the answer, exactly:

```
   To prove: PQRS is a ∥m
   M_PR( (6+(−3))/2 ; (2+(−1))/2 ) = M_PR(3/2 ; 1/2)
   M_QS( (3+0)/2 ; (−4+5)/2 )      = M_QS(3/2 ; 1/2)
   ∴ diagonals bisect, so PQRS is a ∥m

   m_PQ = (2−5)/(6−3) = −1   ⎫  ∴ m_PQ × m_PS = −1 × 1 = −1
   m_PS = (−4−2)/(0−6) = 1   ⎬  ∴ QP̂S = 90°
                             ⎭  ∴ PQRS is a rectangle (∥m with one int. ∠ 90°)
```

The two gradient lines are joined by a **hand-drawn brace `}`** to the three conclusion
lines. Keep the "**To prove:**" opener — she writes it.

### K2. Worked — rhombus (`AG p27`)

```
   m_BD = (−2 − 10)/(1 − (−3)) = −3
   m_AC × m_BD
   = 1/3 × −3
   = −1
   ∴ AC ⊥ BD
   ∴ ABCD is a rhombus (∥m with diags ⊥)
```

(The `∥m` half was established earlier in the question, so she leans on it rather than
re-proving it — the build-up structure of K in action.)

---

## PART L — AREA (`AG p25`, worked `p29`) · *quads not in app; triangle differs*

### L1. Her area table — **quadrilaterals only**

| Shape | Her formula |
|---|---|
| **Parallelogram** | `A = b × ⊥h` |
| **Rhombus** | `A = b × ⊥h` |
| **Kite** | `A = ½ (product of diags)` — with a small **`×`** written above "product" |
| **A rhombus is a kite** | `A = ½ (product of diags)` |
| **Trapezium** | `A = ½ (sum of ∥ sides) × ⊥h` — with a small **`+`** written above "sum" |

Each card carries a to-scale drawing with the base in pink, the perpendicular height as a
**purple dashed segment with a right-angle square**, and the diagonals in blue.

⚠️ **There is no triangle-area card on this page.** Her `⊥h` symbol (a ⊥ sign written as
part of the letter, i.e. "perpendicular height") is her shorthand throughout.

⚙️ The little `×` above "product" and `+` above "sum" are deliberate — she is glossing the
two English words for learners who mix them up. Keep them.

### L2. ⭐ Area of a triangle — **her route is the right angle, not an altitude** (`AG p29`)

> Calculate the area of `ΔKNM`.

```
   KNML is a rectangle (∥m with one int. ∠ = 90°)
   ∴ KN̂M = 90°

   ΔKNM = ½ · NM · KN                 NM = √[(−3−7)² + (1+4)²] = 5√5
        = ½ · (5√5)(3√5)              KN = √[(−3−0)² + (1−7)²] = 3√5
        = 37,5 units²
```

**This is the whole triangle-area method in the chapter:** establish a right angle, then
take **half the product of the two perpendicular sides**, each found with the distance
formula. She never constructs an altitude, never finds the foot of a perpendicular, never
uses `½ × base × ⊥height` on a slanted triangle.

The two distance calculations sit in a **second column to the right of a vertical rule** —
same layout device as `p14` and `p31`.

⚠️ This is a **direct conflict with the app's ag6**, which is built entirely around
"which side is the base / which dashed line is the altitude". See Part O and flag **F10**.

---

## PART M — THE CIRCLE QUESTION (`AG p30–p31`) · Round: ag1, ag7

Her only circle work in the chapter, and it uses nothing new — just distance, midpoint,
gradient and the perpendicular rule.

```
   Circle, centre A, diameter BC. The line cuts the x-axis at −3 and the circle at
   B(−4 ; −1) and C.

   (a) Calculate the coordinates of A.
       m_BD = (−1 − 0)/(−4 + 3) = 1          [D(−3 ; 0), read off the x-intercept]
       m_BC = (−1 − y)/(−4 − 0)
         1  = (−1 − y)/(−4)
        −4  = −1 − y
         y  = −1 + 4
         y  = 3                              ∴ C(0 ; 3)

       A( (−4 + 0)/2 ; (−1 + 3)/2 )
       A(−2 ; 1)

   (b) Equation of the line ⊥ to BC through B.
       m_BC = 1   ∴ m = −1
       B(−4 ; −1) ↝ y − y₁ = m(x − x₁)   |  B(−4 ; −1) ↝ y = mx + c
                    y + 1 = −1(x + 4)    |               −1 = −1(−4) + c
                    y = −x − 4 − 1       |               −1 = 4 + c
                    y = −x − 5           |               −5 = c
                                         |          ∴ y = −x − 5
```

**The beat worth naming:** to find `C`, she uses the fact that `B`, `D` and `C` are on one
line — computes `m_BD` from the two known points, then sets `m_BC` equal to it and solves
for the missing coordinate. That is the **collinearity/equate-gradients move (E6)** applied
to a circle diagram. The centre then falls straight out of the midpoint formula, because
**the centre is the midpoint of a diameter** (`p05`, `p30`).

Both equation methods appear side by side again on `p31`.

---

## PART N — Where her notes differ from a standard memo

Small, real, and worth the foreman knowing before an Esplain gets "corrected".

1. **Endpoint from a midpoint = a transformation, not a rearrangement.** A memo writes
   `x_B = 2x_M − x_A`. She writes *"the transformation from A → M = M → B"* and adds the
   step twice (`p06`, `p11`). Both give the same answer; only hers is on the page.
2. **Fourth vertex of a ∥gram = the same transformation**, governed by *"arrows must show
   in the same direction"* (`p10`). A memo would use `A + C = B + D`.
3. **Triangle area = ½ × the two perpendicular sides** once a right angle exists (`p29`).
   A memo may use the shoelace/determinant formula or a constructed altitude. Neither is
   in the file.
4. **Both line-equation forms, always.** Where a memo picks one, she writes the answer
   twice (`p12`, `p31`).
5. **`y` is always made the subject in full** before a gradient is read off standard form
   (`p14`, `p17`) — no `m = −a/b` shortcut anywhere in the file.
6. **Euclidean reasons in analytical geometry.** `(∠s on str. line)`, `(ext. ∠ of Δ)`,
   `(vert. opp. ∠s)`, `(int ∠s of Δ)`, `(diags of ∥m bisect)` — a memo often omits these in
   an analytical question. She never does.
7. **Four separate named routes for one vertex angle** (`p18`, `p19`, `p20`, `p26`), all
   demonstrated on the same numbers. A memo shows one.
8. **Lengths stay surds** (`2√5`, `5√5`) and are never decimalised, even inside an area
   calculation.

---

## PART O — Digest vs app (report only — no app code was changed)

Cross-checked against `DICE-AUDIT.md` §9 and `js/quests/questag1-formulas.js` …
`questag7-mixed.js` (49 skills, 34 CLEAN / 15 CARE / 0 STATIC).

### O1. Where the app matches her page

| App skill | Page it matches |
|---|---|
| ag1 `mVsM` ("Small m = gradient. Big M = Midpoint.") | `p05`, `p07` — her own annotations |
| ag1 `orderRule` (same point first, top and bottom) | `p07` |
| ag1 `forTheJob` (radius → distance; centre → midpoint) | `p04`, `p05` |
| ag2 `horizontal` / `vertical` / `zeroVsUndef` | `p08` |
| ag2 `incDec` (positive rises, negative falls) | `p07` |
| ag3 `perpRule` (`m₁ × m₂ = −1`) | `p02`, `p08` |
| ag3 `parallelTest` / `classify` | `p08`, `p09` |
| ag4 `tanTheta`, `acuteObtuse`, `addRule`, `dontTypeNeg`, `cleanValue` | `p16`, `p17` |
| ag6 `medianVsAltitude` | `p03` |
| ag7 `lineNames`, `identifyLine` (ticks vs right-angle mark) | `p03` |
| ag7 `proveParallel` / `provePerp` / `proveCollinear` | `p23`, `p09` |
| ag7 `proveParallelogram` (diagonals share a midpoint) | `p24` route ① |
| ag7 `circleFormulas` | `p05`, `p30` |

### O2. Where the app teaches it differently from the PDF

| # | App | PDF | Note |
|---|---|---|---|
| **1** | **ag6 is built on "½ × base × ⊥height", constructed altitudes, altitude-vs-median, "which side is the base"** (7 skills, 3 of them on a 300-iteration `niceTriangle()` engine) | `p25` gives **quadrilateral** areas only; the one triangle area worked (`p29`) is **½ × the two perpendicular sides** after proving a right angle | The biggest divergence in the chapter. ag6 is not *wrong* maths, but no page teaches it. **F10** |
| **2** | ag3 `fromStandard` teaches the shortcut `m = −a/b` from `ax + by = 0` | `p14`, `p17` always **make `y` the subject in full**, line by line | Her route is longer and is the one she drills |
| **3** | ag3 wording: *"negative reciprocal: turn the fraction upside-down AND flip the sign"* | `p08`: **"switch numerator and denominator"** / **"and change the sign"**; `p02`: **"(switch and change the sign)"** | Same rule, different words. Hers wins |
| **4** | ag4 `dontTypeNeg` hint: *"Typing a negative gives a negative angle…"* | `p16`, green highlight: **"DO NOT type the negative into calc"** | Use her sentence verbatim |
| **5** | ag4 uses `ref` for the acute angle | `p16`, `p18`–`p22` use **α** for the acute angle and **θ** for the inclination | Rename in learner-facing text |
| **6** | ag1 `answerLooks` calls the circle's centre "centre" | `p05` heading: **"midpoint of a circle"** | Minor; her word is *midpoint* |
| **7** | ag1 `orderRule` covers the **gradient** order rule only | `p04` states the **distance** order rule in its own blue box | A whole stated rule is missing |
| **8** | ag5 is a 7-skill quest on the **perpendicular bisector** | `p03` **defines** it (✱-marked) and the chapter **never uses it again** — no worked example, no exam-favourite | ag5 has no grounding beyond the definition card. **F5** |

### O3. What is in the PDF and **not in the app at all**

These are the recipe gaps for an Analytical Geometry dice pool / exam set:

1. **Equation of a straight line** — both forms, ∥-through-a-point, ⊥-through-a-point
   (`p12`, `p26`, `p31`). *The app has zero equation-of-a-line skills.*
2. **Converse midpoint / find the missing endpoint** — the transformation (`p06`, `p11`).
3. **Fourth vertex of a ∥gram** + the "order makes a difference" trap + TIP Chips (`p10`).
4. **Angle at a vertex** — all four routes (`p18`, `p19`, `p20`, `p26`, `p28`).
   *The app's ag4 stops at "θ from a gradient".*
5. **Angle between two lines** and the separate helper triangle (`p20 eg.5`).
6. **Prove-quads table** — 9 of the 10 cards (`p24`).
7. **Area of quadrilaterals** — all five cards (`p25`).
8. **Distance / gradient with an unknown variable** — square-both-sides, equate-gradients,
   solve for `k` or `d` (`p13`, `p14`, `p15`, `p27`, `p30`).
9. **The "when to use:" lists** for distance, midpoint and gradient (`p04`, `p05`, `p09`) —
   the app's ag1 `forTheJob` samples 4 of roughly 15 jobs.
10. **Euclidean reasons in brackets** — the app's ag-chapter generates no reason strings at
    all.

⚙️ **Mechanic note for whoever writes the recipe:** DICE-AUDIT §9 records that AG uses
**zero `calc` and zero `tap`** — every answer is multiple-choice. Almost everything in O3
is *pen-and-paper working*, so a dice pool built from this digest will either need the
`calc` mechanic switched on for AG or will have to stay at the "pick the next step / pick
the reason" altitude, the way her trig round 9 does.

---

## PART P — FLAGS for Megan

One line each. Nothing below was guessed at — where the page is unclear it is left unclear.

| # | Where | What | How the digest handled it |
|---|---|---|---|
| **F1** | whole file | The brief says **228 pages**; the PDF has **31** (confirmed by page count, per-page image inventory and render). No larger Gr11 Analytic Geometry PDF exists on her Desktop. | All 31 read, nothing skipped. **Needs one line from her**: is this the whole chapter, or is a second file (worksheets/memo) still to come? |
| **F2** | `p02` | Two Afrikaans words inside an otherwise-English file: **`bgtan`** (boogtangens = arctan) and **`m sonder ⊖`** ("m without the minus"). | Transcribed as written. **Worth one line**: does the app write `bgtan` or `tan⁻¹` in an English hint? |
| **F3** | `p21` vs `p22` | `eg.6` appears **twice**, identical question. The `β` half differs: `p21` uses `β = 180 − 71,565 − 18,43 (∠s on str. line)`; `p22` uses `θ = 180 − 71,565 = 108,4349°` then `β = 108,4349 − 18,4349`, **with no reason cited**. Both give 90°. | Both recorded. **Worth one line**: is `p22` a redo that should replace `p21`, or two routes she wanted side by side? |
| **F4** | `p02` | The Parallel and Perpendicular formula cards are written **`AB ∥ BC`** and **`AB ⊥ BC`** — two lines that share the point B. `p08` and `p09` use the correct `AB` and `CD`. | Recorded as written and corrected to `AB`/`CD` in the digest body, matching her own gradient page. *(Already flagged independently in `theory references/analytical_geometry_reference.md`.)* |
| **F5** | `p03` vs app | The **perpendicular bisector** is defined (✱-marked) and then **never used** in the chapter — no worked example. The app has a whole 7-skill quest (ag5) on it. | Recorded. **Needs her ruling**: keep ag5 as-is (it is correct Gr11 content), or does she have a second page of perpendicular-bisector examples that is not in this file? |
| **F6** | `p02` vs `p04` vs `p13` | Distance is written **three ways**: `(x_B − x_A)² + (y_B − y_A)²` (`p02`), `(x_A − x_B)² + (y_A − y_B)²` (`p04`), `(x₂ − x₁)² + (y₂ − y₁)²` (`p13`). Gradient likewise flips between `p02` (B-first) and `p07` (A-first). | All three recorded. Mathematically identical. **Worth one line**: which one does the app print on its formula card? |
| **F7** | `p15 eg.4` | The second midpoint is labelled **`M_QR`** but the numbers substituted are `Q(3;5)` and `S(0;−4)` — it is `M_QS`. The value `(3/2 ; 1/2)` is correct. | Transcribed as `M_QS` in the digest with the slip noted. **Do not generate this example with the `M_QR` label.** |
| **F8** | `p12` | The `y = mx + c` re-run of the perpendicular part ends **`∴ y = 2x + c`**. The line above already gives `3 = c`, and the point-gradient method on the same page gives `y = 2x + 3`. | Transcribed as written and flagged. **Do not reproduce that line**; the answer is `y = 2x + 3`. |
| **F9** | `p23` | The "bisect at M" long way is written **`CD = MD` and `AM = MB`**. If M is the midpoint of CD the equal halves are `CM = MD`; `CD` is the whole segment. | Recorded as written, corrected to `CM = MD` in the digest body. *(Already flagged in `theory references/analytical_geometry_reference.md`.)* |
| **F10** | `p25`, `p29` vs ag6 | The chapter has **no** "½ × base × ⊥height / find the altitude" triangle-area content. The app's ag6 (7 skills, 3 on a `niceTriangle()` engine) is built entirely on it. Her one triangle area (`p29`) is `½ × two perpendicular sides` after proving a right angle. | Recorded in Part O. **Needs her ruling**: does ag6 stay (valid Gr11 content, just not on these pages), or should it be re-pointed at her `p29` method and the `p25` quad-area table? |
| **F11** | `p14` | Her spelling **"eachother"** in the typed question box (OneNote layer, not ink). | Left as-is; it is in her own question text. Not reproduced in generated questions. |
| **F12** | `p23` | Her spelling **"equalateral"**. | Recorded as written in the transcript; generated text uses *equilateral*. |
| **F13** | `p24` | Rhombus and Square each get **two** cards (alternative routes) and Kite gets two; Rectangle and Trapezium get one each. It is not stated whether a learner may pick either route or must use route ①. | Recorded as alternatives. **Worth one line**: in her marking, is either route full marks? |
| **F14** | `p26` | The helper sketch in the left margin (a small triangle with `θ`, `45`-ish marks and `−2` on the axis) is drawn very small and its labels are not fully legible at 2.2× render. | Not transcribed. The main working on the page is complete without it, so nothing is missing from the method. |

---

## Appendix — her vocabulary, one place

| Her word / phrase | Means | Page |
|---|---|---|
| **"order is important"** | keep the same point first in both brackets / top and bottom | `p04`, `p07` |
| **"no `=`, only `( )`"** | the midpoint answer goes straight into the bracket | `p05` |
| **"the transformation from A → M = M → B"** | the converse-midpoint / 4th-vertex step method | `p06`, `p10` |
| **"arrows must show in the same direction"** | TIP Chip ①, 4th vertex | `p10` |
| **"let the arrow go to the unknown point"** | TIP Chip ②, 4th vertex | `p10` |
| **"order makes a difference"** | ABDC ≠ ABCD when naming a ∥gram | `p10` |
| **"not walking up or down, just to the right"** | horizontal line, `m = 0` | `p08` |
| **"just going down"** | vertical line, `m` undefined | `p08` |
| **"switch and change the sign"** | perpendicular gradient | `p02`, `p08` |
| **"gradient refers to how steep a line is"** | her definition of gradient | `p07` |
| **"equate gradients"** | the collinear-with-a-variable move | `p09` |
| **"DO NOT type the negative into calc"** | the obtuse-inclination warning | `p16` |
| **"shift tan (…)"** | her calculator instruction for `tan⁻¹` | `p17`, `p26` |
| **"works with any horizontal line"** | the dashed-horizontal route for a vertex angle | `p18` |
| **"obtuse angle = negative falls down to 180° −"** | why a negative gradient gives `180 − α` | `p19` |
| **"Exterior ∠ = ● + ●"** | exterior angle of a triangle | `p19` |
| **"To prove:"** | the opening line of a quad proof | `p15` |
| **"(long way)"** | the distance route to a bisection proof | `p23` |
| **"a rhombus is a kite"** | why the kite area formula also works on a rhombus | `p25` |
| **`⊥h`** | perpendicular height | `p25` |
| **"midpoint of a circle"** | the centre | `p05` |
| **`bgtan`** | *boogtangens* — arctan | `p02` |
| **`m sonder ⊖`** | "m **without** the minus" | `p02` |
| **"units²"** | the unit on every area answer | `p29` |
| **✓ / ✱** | on the formula sheet / memorize | `p02` |
| **TIP Chips** | her tip-box header, with tortilla-chip doodles | `p10` |
