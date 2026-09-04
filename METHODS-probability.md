# METHODS — Probability (Grade 11)

**This document is binding for her VOICE.** Every hint, Esplain, drill round and exam
question generated for a Probability chapter of Blipwork must use the wording, sequencing,
worked shapes and notation below. They are transcribed from **Megan's own Grade 11 Term 3
booklet, "6. Probability" — her Chapter 10** — the pages her learners actually sit in front
of.

Standing law inherited from `METHODS-analytical.md`, `METHODS-algebra.md` and
`METHODS-trig.md`: never substitute a textbook explanation for hers. If a shorter or
"cleaner" route exists and it is not on these pages, it does not go in the app. Where the
notes and a plain memo genuinely differ, that is collected in **Part N — Where her notes
differ from a standard memo**.

Nothing in this file is inferred. Every method, formula variant and worked value carries its
PDF page number. Where a page is ambiguous, blank, self-contradictory or contains a slip, it
is an **F-flag** in Part P — never a guess.

---

## Sources

Read page-by-page as rendered page images on 2026-09-04.

| Tag | File | Pages | What it is |
|---|---|---|---|
| `PR` | `Wiskunde Boekies\2026\Grade 11\Term 3\6. Probability.pdf` | **41** | Her Grade 11 Term 3 Probability booklet, "Chapter 10". A mix of **her handwritten theory pages** (digital ink, GoodNotes-style, on a lined background) and **blank printed exercise pages** (typed OneNote-style question boxes in a rounded pastel frame). English throughout. |

Page numbers in this digest are **PDF page numbers**, cited as `PR p07`.

⚠️ **The brief said 172 pages. The file has 41.** Confirmed three ways: PyMuPDF
`page_count` = 41, a per-page inventory of 41 rows, and 41 rendered page images. **All 41
pages were read.** See flag **F1**.

---

## ⚠️ The single most important fact about this file

**The exercise pages are BLANK.** This booklet is the *unfilled learner copy*: her
handwritten theory pages are complete and rich, but **every worked-example answer box on
every exercise page is empty**. There are no memos, no ticks, no mark allocations, and no ink
on any of the "eg. 1) … eg. 3)" pages.

So this file gives Blipwork:

- **her full method vocabulary and every rule card** — from the ink pages (13 of them), and
- **her exact question bank and every Venn/tree/table layout** — from the printed pages
  (28 of them),

but **not a single one of her worked answers to those questions**. Any answer the app
generates for a `PR` exercise is the app's answer, not hers. See flag **F2** — this is the
one thing the foreman must know before a Probability dice pool is written.

Even on two of the *ink* pages she left working unfinished: `p21` ends two calculations at a
bare `=`, and `p13` is a fill-in-the-blank page whose numerators were never filled in.

---

## Page types, at a glance

| Type | Pages | Count |
|---|---|---|
| **Cover** | `p01` | 1 |
| **HER INK — theory / worked teaching pages** | `p02`, `p03`, `p04`, `p09`, `p10`, `p11`, `p12`, `p13`, `p14`, `p20`, `p21`, `p22`, `p26`, `p34` | 14 |
| **PRINTED — blank exercise pages** | `p05`–`p08`, `p15`–`p19`, `p23`–`p25`, `p27`–`p33`, `p35`–`p41` | 26 |

(14 + 26 + 1 = 41.)

The ink pages and the exercise pages **interleave in topic blocks**: theory → exercises →
theory → exercises. Every topic in the chapter follows that rhythm.

---

## Content map — pages → topic → likely app quest

| Pages | Type | Topic | App quest (proposed) |
|---|---|---|---|
| `p01` | cover | "PROBABILITY · Chapter 10" — her grumpy stick mascot | — |
| `p02` | ink | **definitions** — experiment, outcome, sample space, event, fair/biased, P(A), n(S) | **pr1** |
| `p03` | ink | **theoretical probability** — `P(Ɛ) = n(Ɛ)/n(S)`, the dice worked example | **pr1** |
| `p04` | ink | **relative frequency** — the coin worked example, theoretical vs actual | **pr1** |
| `p05` | printed | Revision eg.1 — `P(A and B)`, `P(A or B)`, `P(A' ∩ B)`, `P(A' ∪ B)` | **pr2** |
| `p06` | printed | Revision eg.2 — chocolate survey (two-circle Venn with an unknown `x`) | **pr4** |
| `p07` | printed | Revision eg.2 cont. — 8 probability parts, each with its own D/M Venn | **pr4** |
| `p08` | printed | Revision eg.3 (complementary?) · eg.4 (`P(B)`, `P(A ∩ B)'`, `P(A ∪ B')`) | **pr2** |
| `p09` | ink | **venn-diagrams** — intersection, union, complement, complementary event, the 3-event map | **pr3** |
| `p10` | ink | **rules** — addition rule, complement, mutually exclusive/inclusive, exhaustive, independent | **pr2** |
| `p11` | ink | **venn-diagrams** — S as a box, event as a circle; the FORMULA word in 3 representations | **pr3** |
| `p12` | ink | **two or more events** — the 12-sided dice, two Venns (elements → counts) | **pr3** |
| `p13` | ink | the same dice as **probabilities**, + a 9-card shaded-region reference (**blanks unfilled**) | **pr3** |
| `p14` | ink | **complement, intersection and union** — the symbol-to-word card (`∩` = and, `∪` = or) | **pr3** |
| `p15` | printed | Venn-Diagrams eg.1 — ice-cream 3-circle Venn, 10 counting parts | **pr4** |
| `p16` | printed | eg.1 cont. — 6 probability parts, each with its own C/V/M Venn | **pr4** |
| `p17` | printed | eg.1 cont. (2 parts + complementary?) · eg.2 advertising agency, draw the Venn | **pr4** |
| `p18` | printed | eg.2 cont. — 5 probability parts, each with its own T/R/M Venn | **pr4** |
| `p19` | printed | eg.3 — social-media percentages, **empty** 3-circle Venn to fill in | **pr4** |
| `p20` | ink | **tree diagrams** — 6 blue/8 green *without replacement*; biased coins. **Out of order, see F3** | **pr5** |
| `p21` | ink | **tree-diagram** eg.1 — coin twice; left-to-right ×, top-to-bottom + | **pr5** |
| `p22` | ink | **tree-diagram** eg.2 — 3-colour ball tree *with replacement*, 9 outcomes | **pr5** |
| `p23` | printed | Tree Diagrams eg.1 — 6 black / 4 white balls, replaced | **pr5** |
| `p24` | printed | eg.2 — three soccer tosses | **pr5** |
| `p25` | printed | eg.3 — 7 black / 9 white / 10 gray cell phones, replaced | **pr5** |
| `p26` | ink | **tree-diagram** eg.3 — the same 3-colour tree *without replacement*; "always add up to one" | **pr6** |
| `p27`–`p29` | printed | Tree Diagrams – No Replacement eg.1–3 (kittens, pencils, sweets) | **pr6** |
| `p30`–`p33` | printed | Independence eg.1–5 (cards, hearts, cyclist, two Venns, `x` case) | **pr7** |
| `p34` | ink | ⭐ **contingency tables** — the ONE fully worked page in the file (gender/age independence) | **pr8** |
| `p35`–`p38` | printed | Contingency Tables eg.1–3 (lung cancer, speeding fines, driving lessons) | **pr8** |
| `p39`–`p41` | printed | Exam Favourites eg.1–3 | **pr9** |

---

## Part 0 — Universal habits (apply to every generated probability solution)

Break one of these and the working reads as "not my teacher's" even when the maths is right.

### 0.1 Decimal comma, everywhere

`0,38` · `0,43` · `0,86` · `0,63` · `0,9` · `0,2` · `0,36` · `0,16` · `0,5` · `0,6`.
A **comma**, never a point — in her ink *and* in her typed question boxes. (`p03`, `p04`,
`p05`, `p08`, `p20`, `p40`.) The only decimal points in the whole file are inside the one
imported stock graphic on `p21` (`0.5`, `0.25`) — see **F6**.

### 0.2 Semicolon inside a set, curly braces

`{1 ; 2 ; 3 ; 4 ; 5 ; 6}` (`p02`), `{4 ; 8 ; 12}` and `{1 ; 2 ; 3 ; 4 ; 6 ; 12}` (`p12`),
`{1,3,5}` (`p03` — commas there, see **F7**). Her printed pages use semicolons too:
`{2; 4; 6; 8; 10}` (`p30`).

### 0.3 ⭐ "fractions, decimals or percentages" — all three, side by side

Her signature answer shape, written twice with slashes between the forms:

```
   P(A) = 3/6 = 1/2 / 0,5 / 50%              PR p03
        = 6/10 / 0,6 / 60%                   PR p04
```

Stated as a rule on both pages:
> `*` **all probabilities can be expressed as fractions, decimals or percentages** (`p03`)
> `P(A)` = probability that event A will occur **(decimal, percentage or fraction)** (`p02`)

⚙️ **Build note:** this is the answer-format ruling for the whole chapter. Her Venn work is
fractions (`3/7`, `4/7`, `1/12`, `2/12`); her algebraic-probability work is decimals
(`0,38`); her survey work is percentages. She does **not** pick one and enforce it — she
teaches that all three are the same answer. An app that marks `0,5` wrong when the key says
`1/2` is not teaching her chapter.

### 0.4 Fractions are left **unsimplified** when they came off a Venn or a tree

`2/12`, `4/12`, `5/12`, `1/12` (`p13`) · `49/400`, `56/400`, `35/400`, `64/400`, `40/400`,
`25/400` (`p22`) · `3/7` and `4/7` (`p11`). The denominator is the sample-space size and she
keeps it visible. She simplifies **only** in the `p03` teaching line where the point is that
`3/6 = 1/2 = 0,5 = 50%`.

### 0.5 She writes both notations, and glosses one into the other

The whole of `p14` exists to say it once:
> `*` **`∩` symbol = and**   ·   `*` **`∪` symbol = or**

and on the same page: **`A ∪ B = A or B`**. Her printed exercise pages then deliberately mix
the two dialects *inside one question* — `p05` asks `P(A and B)`, `P(A or B)`, then
`P(A' ∩ B)`, `P(A' ∪ B)`; `p07` asks everything in words (`P[not (D or M)]`), `p16` asks
everything in symbols (`P(C ∩ V)'`).

⚙️ **Build note:** both dialects must exist in the app, and a hint should be able to
translate one into the other in her words — *"`∩` symbol = and"*. Do not standardise on one.

### 0.6 `n(…)` for a count, `P(…)` for a probability — she separates them on purpose

`p11` is built entirely around the difference: the same Venn drawn three times, first with
**letters** in it, then with **counts** (`3` and `4`), then with **probabilities**
(`3/7` and `4/7`), each labelled:

> • shows the **number of outcomes**
> • shows the **probability of** getting a vowel

`p12` → `p13` does the same move again on the 12-sided dice: a Venn of elements, a Venn of
counts, then a Venn of probabilities.

### 0.7 `n(S)` is written **above the box**, outside it

On every Venn she draws, `n(S) = 7` / `n(S) = 12` sits on the top edge of the rectangle,
outside the frame (`p11`, `p12`, `p13`). Her printed pages write `n = 100` in the top-right
corner instead (`p15`) — see **F8**.

### 0.8 The two "everything adds up" notes

> **all probabilities in venn diagrams add up to 1** — `p11`, boxed in purple, headed `note:`
> **must add up to 1** — `p20`, an arrow pointing at the first pair of branches
> **sum of probability of each branch must always = 1** — `p21`, with a `*` bullet
> **always add up to one** — `p26`, above a purple box round one node's three branches

**Four** phrasings of one law, on four pages. All four are hers.

### 0.9 `⤷` is her "leads to" arrow, `↦`/`-D` is her "means" arrow

Every definition line on `p02`, `p09`, `p10`, `p14` opens with a small arrow into the
explanation. Bullets are pink dots; sub-points are arrows. Cosmetic, but it is what makes the
Esplain layout read as hers.

### 0.10 Highlighter marks the **term being defined**, not the answer

`experiment`, `outcome`, `Sample space`, `event`, `P(A)`, `n(S)` (`p02` — pink);
`intersection`, `union`, `complement`, `exhaustive`, `independent`, `mutually exclusive`,
`mutually inclusive` (`p09`, `p10` — pink); `complement`, `intersection`, `union` (`p14` —
purple). The highlighted word is always the **vocabulary item**.

The one exception is a *rule* highlighted for memorising: `P(A ∩ B) = P(A) × P(B)` sits in a
pink-ringed box on `p10`, and `always write the probabilities on the branches` is a full pink
highlight bar on `p20`.

### 0.11 Colour is load-bearing in her tree diagrams

`p20`: **B** in blue, **G** in green, and the branch probabilities inherit the colour of the
letter they lead to. `p22`: **G** green, **Y** yellow/amber, **R** red, and the outcome
column (`GG`, `GY`, `GR` …) is written **letter by letter in each letter's own colour**, so
`GR` is a green G and a red R.

⚙️ **Build note:** an app tree that draws all branches in one colour loses her strongest
visual cue. The outcome label must be per-character coloured.

### 0.12 "atleast" — she writes it as one word

`P(atleast one H)` (`p21`), *"Probability of atleast on red ball"* (`p22`). Her printed
question boxes write it correctly as **"at least"** (`p06`, `p15`, `p18`, `p24`, `p25`,
`p27`, `p28`). Both are in the file. See **F9** — generated text uses *at least*.

---

## PART A — DEFINITIONS (`PR p02`) · Round: pr1

Her opening page. A dice doodle top-right; every bullet is a pink dot; the defined word is in
a pink highlight.

Opening line: **"Let's say we roll a dice"**

| Term | Her definition, verbatim |
|---|---|
| **experiment** | = every roll |
| **outcome** | = the result of the roll *(on which digit it lands)* |
| **S** = **sample space** | = all the possible outcomes  `{1 ; 2 ; 3 ; 4 ; 5 ; 6}` |
| **event** | = a group of outcomes  *eg. to roll an uneven number* |
| ⤷ **fair / unbiased** | = outcomes are equally likely |
| ⤷ **biased** | = some outcomes are more likely to occur than others *(dice or coin was tampered with)* |
| **P(A)** | = probability that event A will occur *(decimal, percentage or fraction)* |
| **n(S)** | = number of elements in sample space |

⚙️ Note **"uneven number"**, not "odd number" — that is the South African English she uses in
the definition. (She then writes **"odd number"** on the very next page, `p03`. Both are
hers; see **F10**.)

⚙️ `fair / unbiased` and `biased` are indented **under** *event*, as sub-arrows — they are
taught as properties of the experiment, not as their own top-level definitions.

---

## PART B — THEORETICAL PROBABILITY (`PR p03`) · Round: pr1

Header: **theoretical probabilty** *(her spelling — see F11)*

### B1. Her definition

> `=` **prediction** on how often an event might occur **before** conducting any experiments

*prediction* and *before* are the two highlighted words. **"before"** is the whole teaching
point of the page and it is what separates it from `p04`.

### B2. The formula card, with four annotations

```
                                    ↖ number of outcomes in event Ɛ
        P(Ɛ)  =   n(Ɛ)
                  ────
                  n(S)
   ↑                      ↖ number of outcomes in the sample space
   chance that event Ɛ will occur
```

Blue arrow into `P(Ɛ)` from the left labelled **"chance that event Ɛ will occur"**; an orange
arrow up-right off `n(Ɛ)`; a purple arrow down-right off `n(S)`.

⚠️ **She uses a script `Ɛ` (epsilon) for the event, not `E` or `A`.** It appears as `P(Ɛ)`,
`n(Ɛ)`, `Event (Ɛ)` on `p03` and again on `p11`. On `p02` the same idea is `P(A)`. Both
letters are hers. See **F12**.

Then the star rule and the four glosses:

> `*` **all probabilities can be expressed as fractions, decimals or percentages**
> ⤷ `S` = sample space
> ⤷ `P(Ɛ)` = probability that an element from set Ɛ will occur
> ⤷ `n(Ɛ)` = number of elements in set Ɛ
> ⤷ `n(S)` = number of elements in sample space

Each of the four glosses is written in its **own colour** with its own arrow (blue, blue,
orange, purple), matching the arrow colours on the formula above it.

### B3. ⭐ The worked example — the answer written three ways

> probability of event 'rolling an odd number' (event A)

```
             ↙ number of odd numbers {1,3,5}
   P(A) =   3  =  1  / 0,5 / 50%
            ─     ─
            6     2
             ↖ total number of sample space {1, 2, 3, 4, 5, 6}
```

**The beat worth naming:** the numerator carries an arrow to *what it counted*, the
denominator carries an arrow to *the whole sample space listed out*, and the answer is given
in **all three forms separated by slashes**. That is her house format for a probability
answer.

⚙️ Her phrase for the denominator is **"total number of sample space"** (`p03`) — awkward
English, but it is what is on the page.

---

## PART C — RELATIVE FREQUENCY (`PR p04`) · Round: pr1

Header: **relative frequency**. A coin-flip graphic and a thumbs-up sticker on the right.

### C1. Three definitions stacked, each opening with `=`

> `=` how often a event **occured** *(her spelling)* **after** collecting data from a certain
> number of trials
> `=` based on what **actually happened** in the conducted experiment
> `=` **number of times the event occured** / **total number of trials conducted**

The third one is her formula, written as a **word fraction** — numerator in orange,
denominator in purple, with a rule between them. She writes **no symbolic formula for
relative frequency anywhere.** The words *are* the formula.

Highlighted: **after** (line 1) and **actually happened** (line 2). Together with `p03`'s
**before**, that is the contrast the two pages exist to teach.

### C2. The worked example, and the punchline

> ⤷ if you **flip a coin 10 times** and it **lands on heads 6 times**, then the relative
> frequency of landing on heads is

```
   =  6  / 0,6 / 60%
      ──
      10
```

> where the theoretical probability of landing on heads would have been **50%**

⭐ **That closing line is the teaching moment of the page** — relative frequency `60%` next
to theoretical `50%`, same experiment. Any Esplain on relative frequency must end on that
comparison, in those words.

⚙️ Note `6/10` is **not** simplified to `3/5`. See 0.4.

---

## PART D — VENN DIAGRAMS: the vocabulary (`PR p09`) · Round: pr3

Header: **venn-diagrams** (pink). Each definition has a small boxed Venn to its right with
the named region **filled in hot pink**.

| Term | Her words | Her diagram |
|---|---|---|
| **intersection** of A and B | ⤷ `A ∩ B`  ⤷ where the circles overlap | rectangle, two overlapping circles labelled A (top-left) and B (top-right); **only the lens is pink** |
| **union** of A and B | ⤷ `A ∪ B`  ⤷ everything in A and everything in B | **two** diagrams: (i) overlapping circles, **both circles fully pink**; (ii) two **separate** non-touching circles, both fully pink |
| **complement** | ⤷ `A'` means **"not A"**  ⤷ everything not in A | rectangle **fully pink**, one white circle inside labelled `A`, the pink region labelled `A'` on the left |

⚙️ **The union card carries two pictures on purpose** — overlapping and disjoint — because
union does not require an overlap. Keep both.

### D1. Complementary event

> `*` **complementary event**
> `=` no intersection
> • `P(A) + P(A)' = 1`   ← written exactly like that; see **F13**
> • `P(A ∩ A') = 0`

⚠️ The prime in the first bullet is written **outside** the bracket: `P(A)'`. The standard
notation is `P(A')`, and the second bullet on the same line-pair writes `A'` correctly inside.
Transcribed as written, corrected to `P(A) + P(A') = 1` in this digest body. See **F13**.

### D2. ⭐ The three-event map — the picture the app has to be able to redraw

Bottom half of `p09`, and the most reusable diagram in the chapter. A rectangle; **three
circles in the classic 3-Venn arrangement** (A top-left, B top-right, C bottom-centre); every
one of the eight regions is **filled with its own flat colour and labelled in words**:

| Region | Her label | Fill |
|---|---|---|
| A only | `only A` | orange |
| B only | `only B` | dark blue |
| C only | `only C` | yellow |
| A ∩ B, not C | `only A and B` | purple |
| A ∩ C, not B | `only A and C` | light blue |
| B ∩ C, not A | `only B and C` | green |
| A ∩ B ∩ C | `A, B and C` | red |
| outside all three | `not A, B or C` | white (unfilled) |

Circle name labels sit **outside** the circles: `A` top-left, `B` top-right, `c` at the
bottom (lower-case on this one page — see **F14**).

⚙️ **Build note:** the eight region names above are her wording, and *"only A and B"* is how
she says the pairwise-but-not-all-three region. An app that calls it "A and B only" or
"A ∩ B ∩ C′" is not using her words. The 3-circle geometry (two on top, one below, centred)
is also hers and matches every printed 3-Venn in the booklet (`p15`, `p18`, `p19`).

---

## PART E — THE RULES PAGE (`PR p10`) · Round: pr2 — **the formula card of the chapter**

Header: **rules**. Six cards, each with a small worked Venn on the right that uses the
letters `a b c` (in A), `b` (in the overlap), `d e f` (in B) and `g` (outside).

### E1. ⭐ The addition rule, taught by counting letters

```
   P(A ∪ B)
   = P(A) + P(B) − P(A ∩ B)
       ↓       ↓        ↓
   = a,b,c + b,d,e,f − b
   = a,b,c,d,e,f
```

`P(A)` in green, `P(B)` in blue, `P(A ∩ B)` in purple, with **three coloured arrows dropping
from each term to the letters it stands for**. The `b` appears twice in the addition line and
once in the subtraction line, and the final line has each letter once.

⭐ **This is her whole explanation of why you subtract the intersection** — not a sentence, a
substitution. The Esplain must do the letter-count, not assert "otherwise you double-count".

Diagram: rectangle; A circle outlined **green** containing `a`, `c`; B circle outlined
**blue** containing `d`, `e`, `f`; the lens outlined **purple** containing `b`; `g` sits
bottom-left, outside both.

### E2. Complement

> if B is the **complement** of A
> ⤷ `P(A) = 1 − P(B)`

Diagram: **whole rectangle pink**, two separate circles (`a b c` and `d e f`), nothing
outside them — i.e. A and B together fill S.

### E3. Mutually exclusive

> **mutually exclusive**
> ⤷ `P(A ∩ B) = 0`
> `=` no intersection

Diagram: two **separate** circles, `g` outside them.

### E4. Mutually inclusive

> **mutually inclusive**
> ⤷ `P(A ∩ B) ≠ 0`
> `=` intersection

Diagram: two **overlapping** circles, `b` in the pink lens, `g` outside.

⚙️ **"Mutually inclusive" is her term and it is on the card.** Many memos never name it.
It goes in the app.

### E5. Exhaustive events

> **exhaustive** events
> `=` no elements outside of events

Diagram: two separate circles filling the rectangle, **nothing outside** — contrast with E3,
which is the same picture *with* a `g`.

⚙️ The E3/E5 diagram pair is a deliberate spot-the-difference: mutually exclusive = no
overlap; exhaustive = nothing left over. Keep them adjacent in any Esplain.

### E6. ⭐ Independent events — the one boxed formula on the page

> **independent** events
> `=` if the outcome of one event does not influence the outcome of another event

```
   ┌─────────────────────────────┐
   │  P(A ∩ B) = P(A) × P(B)     │      ← pink-ringed box, pink fill
   └─────────────────────────────┘
```

This is the only formula on `p10` she boxed and highlighted. It is the memorise-this line of
the chapter.

⚠️ **There is no conditional-probability formula anywhere in the file.** No `P(A|B)`, no
`P(A and B) / P(B)`. Her printed exercises *do* ask given-that questions (`p25`, `p35`,
`p36`, `p37`) and she answers them off a tree/table instead. See **F15** and Part N.

---

## PART F — VENN DIAGRAMS: what the shapes mean (`PR p11`) · Round: pr3

Header: **venn-diagrams** (purple).

### F1. The two shape conventions, stated

```
                 n(S)
   ┌───────────────────────────┐
   │  Event (Ɛ)                │      ⤷ sample space (S)
   │      ◯                    │           = represented by a ▭
   │                           │      ⤷ events
   └───────────────────────────┘           = represented by a ◯
```

The rectangle is drawn in **blue** and the circle in **orange**, matching the colours of the
two bullet lines beside it. `n(S)` is written on the top edge, outside.

### F2. ⭐ The FORMULA example — one Venn, three representations

> ⤷ suppose the letters of the word **FORMULA** are written on cards and placed in a box,
> and one card is drawn randomly
> ⤷ let `Ɛ` be the event of drawing a vowel
> `=` **represent this in 3 different ways**

A ballot-box graphic with an `A` card going in sits to the right.

**Representation 1 — the elements**
```
             n(S) = 7
   ┌────────────────────────┐          • number of elements in sample
   │ Event (Ɛ)     F        │            space is 7  ∴ n(S) = 7
   │   ( U  O )      R      │
   │   (  A   )   m    L    │
   └────────────────────────┘
```
Vowels `U`, `O`, `A` inside the circle; `F`, `R`, `m`, `L` scattered outside it but inside
the box. (She writes the consonants in mixed case — `F`, `R`, lower-case `m`, and an `L` that
renders like a script `l`. Cosmetic.)

**Representation 2 — the counts**
```
             n(S) = 7
   ┌────────────────────────┐          • number of elements in event Ɛ
   │ Event (Ɛ)              │            is 3 (3 letters are vowels)
   │   (  3  )      4       │            ∴ n(Ɛ) = 3
   └────────────────────────┘
```
with a wiggly arrow off `n(S) = 7` to: **shows the number of outcomes**

**Representation 3 — the probabilities**
```
             n(S) = 7
   ┌────────────────────────┐
   │ Event (Ɛ)              │
   │  ( 3/7 )      4/7      │
   └────────────────────────┘
```
with a wiggly arrow to: **shows the probability of getting a vowel**

Then, boxed in purple and headed `note:` in orange:

> **all probabilities in venn diagrams add up to 1**

⚙️ **Build note:** "elements → counts → probabilities" is her ladder, and it is the same
ladder she climbs again on `p12`→`p13`. A `pr3` quest that asks a learner to move a Venn one
rung up that ladder is directly on her page.

---

## PART G — TWO OR MORE EVENTS: the 12-sided dice (`PR p12`, `p13`) · Round: pr3

Header: **two or more events** (in a purple highlight bar).

### G1. The set-up

> Suppose that a dice with 12 sides **are** rolled. *(her grammar — see F16)*
> • **Event A**: lands on a **multiple of 4** — `{4 ; 8 ; 12}`
> • **Event B**: lands on a **factor of 12** — `{1 ; 2 ; 3 ; 4 ; 6 ; 12}`

`Event A` and its set in **pink**; `Event B` and its set in **blue**.

### G2. Venn 1 — the elements

```
                  n(S) = 12
   ┌──────────────────────────────────┐
   │   A                B      5      │
   │  ⟋‾‾‾‾‾⟍  ⟋‾‾‾‾⟍          7      │
   │ (   8   ( 4  ) 1  2 )     9      │
   │ (       ( 12 ) 3  6 )     10     │
   │  ⟍_____⟋  ⟍____⟋         11      │
   └──────────────────────────────────┘
```

A circle outlined **pink**, B circle outlined **blue**, the **lens filled green** holding
`4` and `12`. `8` sits in A-only. `1`, `2`, `3`, `6` sit in B-only. `5`, `7`, `9`, `10`, `11`
sit outside both, inside the box, arranged in a loose column on the right.

Her two reading lines underneath:
> ⤷ **4 and 12 overlap in these 2 events** *(in green — the lens colour)*
> ⤷ rest of the number does not fall in either one of these 2 events *(her grammar — F16)*

### G3. Venn 2 — the counts

Same layout, now **fully coloured**: the whole rectangle **purple**, A-only **pink** holding
`1`, the lens **green** holding `2`, B-only **blue** holding `4`, and `5` written in the
purple region outside both circles.

Her four count lines below, each in the colour of its region:
> • number of elements in **only A** = 1     *(pink)*
> • number of elements in **only B** = 4     *(blue)*
> • number of elements in **A and B** = 2    *(green)*
> • number of elements in **not A or B** = 5 *(purple)*

⚙️ Her region names again: **only A**, **only B**, **A and B**, **not A or B**. Same
vocabulary as `p09`. This is the naming the app must use.

### G4. Venn 3 — the probabilities (`p13`, top)

The identical coloured Venn a third time, with `1/12`, `2/12`, `4/12`, `5/12` in the four
regions. **Denominators left as 12** — see 0.4.

### G5. ⚠️ The ten-card shaded-region reference — **and its blanks are empty**

The bottom two-thirds of `p13`: **ten** `P(…) = __/12` lines, each with a **small two-circle
Venn beside it showing exactly which region that expression means**, shaded. The
**denominator 12 is written; every numerator slot is blank.**

| Her expression | Its picture (what is shaded) | Colour |
|---|---|---|
| `P(only A)` | left circle only, overlap **not** shaded | pink |
| `P(A)` | whole left circle **including** the overlap | orange |
| `P(only B)` | right circle only, overlap not shaded | blue |
| `P(B)` | whole right circle including the overlap | orange |
| `P(A and B)` | the lens only | green |
| `P(not A and B)` | the whole rectangle **and** both circles shaded **except** the lens | orange (rectangle shaded, lens white) |
| `P(A or B)` | both circles, overlap included; rectangle white | orange |
| `P(not A or B)` | the whole rectangle shaded, **both circles white** | purple |
| `P(not A)` | rectangle + right circle shaded, left circle white | orange |
| `P(not B)` | rectangle + left circle shaded, right circle white | orange |

*(Ten rows, laid out in two columns at the top — `only A` beside `P(A)`, `only B` beside
`P(B)` — then single full-width rows for the rest.)*

⚠️ Two things the foreman must decide:

1. **Every numerator is blank.** This page is a fill-in-the-blank exercise she was going to
   do with the class, not a completed reference. The *pictures* are the answer key for
   "which region", but the *numbers* were never written. See **F2**, **F17**.
2. ⚠️ **The `P(not A and B)` picture does not match the words.** Her shading for it is
   "everything except the lens" — that is `P[not (A and B)]`, i.e. `(A ∩ B)'`. The words
   `P(not A and B)` normally mean `A' ∩ B` (the B-only region), which is the picture she
   would have shaded blue. See **F18** — do not build a skill off this row until she rules.

⚙️ **This card is the single most app-shaped thing in the chapter**: nine expressions, nine
shaded pictures, one Venn engine. A `pr3` quest that shows a shaded region and asks for the
expression (or the reverse) is her page, verbatim.

---

## PART H — COMPLEMENT, INTERSECTION AND UNION (`PR p14`) · Round: pr3

Header: **complement, intersection and union** (purple). A tidier restatement of `p09`, and
the page where she names the symbols.

| Term | Her words | Her diagram |
|---|---|---|
| **complement** of A | ⤷ `A'` means 'not A'  ⤷ everything that is not in A | rectangle **fully purple**, white circle `A` inside, `A'` labelled in the purple |
| **intersection** of A and B | ⤷ `A ∩ B`  ⤷ where the circles overlap  `*` **`∩` symbol = and** | overlapping circles, **only the lens purple** |
| **union** of A and B | ⤷ `A ∪ B = A or B`  ⤷ everything that is in A or B  `*` **`∪` symbol = or** | **two** diagrams: overlapping circles both purple; and two **separate** circles both purple |

⭐ The two `*` lines — **"`∩` symbol = and"** and **"`∪` symbol = or"** — are the
translation key for the whole chapter and must appear verbatim in any notation Esplain.

⚙️ Note the union line here reads `A ∪ B = A or B` (an equation), where `p09` read
*"everything in A and everything in B"* (a sentence with the word *and* in it, meaning
union). Both are hers; the `p14` wording is the safer one to reuse, because the `p09` phrasing
uses "and" to describe a union.

---

## PART I — TREE DIAGRAMS (`PR p20`, `p21`, `p22`) · Round: pr5

⚠️ **Page order is scrambled here.** `p20` (a *without-replacement* worked tree, plus a
biased-coin problem) sits **before** the introductory `p21` (coin tossed twice, the
left-to-right/top-to-bottom rule) and `p22` (the basic *with-replacement* three-colour tree).
Taught in file order, the hardest case comes first. See **F3**.

Presented below in **teaching order** (`p21` → `p22` → `p20`), with the page numbers kept.

### I1. ⭐ The two directions — her core tree rule (`PR p21`)

The page carries an imported full-colour stock diagram (First Flip / Second Flip / Outcomes /
Calculations) for a coin tossed twice, and she has drawn **two big arrows** on it in her own
ink:

> **left to right ×**   *(a long horizontal arrow under the whole diagram)*
> **top to bottom +**   *(a long vertical arrow down the right-hand edge)*

⭐ **That is the entire method for reading a tree diagram, in six words.** Multiply along a
branch; add down the outcomes. It must be the headline of every tree Esplain in the app.

Under it:
> `*` **sum of probability of each branch must always = 1**

### I2. The two standard tree questions (`PR p21`) — ⚠️ both left unfinished

```
   ⤷ Probability of land on atleast one H

      P(atleast one H)
      = P(HH) + P(HT) + P(TH)
      =                              ← blank, never completed

   ⤷ Probability of no H

      P(no H)
      = 1 − P(H)
      =                              ← blank, never completed
```

⚠️ Two problems here, both flagged:
- The working stops at `=` in both cases. The numbers (`0,75` and `0,25`) are **not on the
  page**. See **F2**, **F19**.
- `P(no H) = 1 − P(H)` is written loosely: the complement of "no H" is "**at least one** H",
  not "H". Correct statement: `P(no H) = 1 − P(at least one H)`. See **F20**.

⚙️ Her framing of the two questions as a pair — *list-and-add* versus *complement* — is the
teaching point, and it survives even though the arithmetic does not.

### I3. Tree with replacement, three colours (`PR p22`)

> eg.2) Suppose we have **7 green balls**, **8 yellow balls** and **5 red balls** in a bag.
> One ball is randomly chosen from the bag **and put back before another ball is chosen**.
> Let's visualize the outcomes.

Her first written line, on its own:
```
   Total = 7 + 8 + 5 = 20
```
⭐ **She computes the total before she draws anything.** That line opens every tree in the
chapter.

**The tree.** A dot at the left; **three** first-level branches (`7/20` → G, `8/20` → Y,
`5/20` → R); each node splits into the **same three** branches with the **same** fractions
(`7/20`, `8/20`, `5/20`) — because it is with replacement. Nine leaves. The G/Y/R nodes are
drawn as small **rounded coloured tiles** (green, amber, red) with the white letter inside.

**The outcome column**, to the right of the leaves, each outcome then multiplied out:

| Outcome | Her line | Correct? |
|---|---|---|
| GG | `7/20 × 7/20 = 49/400` | ✓ |
| GY | `7/20 × 8/20 = 56/400` | ✓ |
| GR | `7/20 × 5/20 = 35/400` | ✓ |
| YG | `8/20 × 7/20 = 56/400` | ✓ |
| YY | `8/20 × 8/20 = 64/400` | ✓ |
| YR | `8/20 × 5/20 = 40/400` | ✓ |
| RG | `5/20 × 7/20 = 56/400` | ⚠️ **should be 35/400** — see **F21** |
| RY | `5/20 × 8/20 = 40/400` | ✓ |
| RR | `5/20 × 5/20 = 25/400` | ✓ |

Then the last question, again left unfinished:
```
   ⤷ Probability of atleast on red ball        ("on" = "one", her typo)

      P(one red)
      = P(GR) + P(YR) + P(RG) + P(RY) + P(RR)
      =                                          ← blank
```

⭐ **The "at least one" recipe is the line that matters even without the total:** she lists
**every** outcome containing an R and adds them. She does **not** use `1 − P(no red)` here —
even though she teaches the complement route on `p21`. Both routes are hers; this page picks
the listing route. See Part N.

⚙️ Note the label `P(one red)` on a question about *at least one* red. Loose, and worth one
line from her — see **F22**.

### I4. ⭐ Tree WITHOUT replacement (`PR p20`, top)

> ⤷ A bag contains **6 blue** and **8 green** balls. **Two balls are taken out at the same
> time**

```
              5/13   B      P(BB) = 6/14 × 5/13
        6/14 ╱  B ╲
       ╱          ╲ 8/13   G      P(BG) = 6/14 × 8/13
      •
       ╲    6/13   B      P(GB) = 8/14 × 6/13
        8/14 ╲  G ╱
                  ╲ 7/13   G      P(GG) = 8/14 × 7/13
```

**The denominator drops 14 → 13 on the second level, and the matching numerator drops by 1.**
That is the whole without-replacement method and she shows it purely by writing the
fractions — there is no sentence explaining it anywhere on the page.

⭐ **"Taken out at the same time" = without replacement.** That phrasing is hers and it is the
only place in the chapter it appears. A learner who reads "at the same time" as "two
independent draws" gets it wrong; the app should teach that phrase.

Her two annotations:
- A **purple box** drawn around the first-level pair (the `6/14 B` and `8/14 G` branches),
  with a hooked arrow to: **must add up to 1**
- A full-width **pink highlight bar** across the page:
  > **always write the probabilities on the branches**

`B` is written in blue and `G` in green throughout, including inside `P(BG)`, `P(GB)`.

⚙️ She writes each outcome's product but **does not evaluate it**. `P(BB) = 6/14 × 5/13` and
stops. That compression is hers — the multiplication line *is* the answer at this stage.

### I5. The biased-coin problem (`PR p20`, bottom)

> ⤷ Two identical **biased coins** are tossed together and the outcomes are recorded. After a
> large number of trials, it is observed that the probability that **both** coins land on
> **heads** is **0,36**. Determine the probability that **both** coins land on **tails**.

Her tree, drawn with the answers already filled onto the branches:

```
              0,6   H      P(HH) = 0,36
        0,6 ╱  H ╲
       ╱         ╲ 0,4   T
      •
       ╲    0,6   H
        0,4 ╲  T ╱
                 ╲ 0,4   T   P(TT) = 0,4 × 0,4 = 0,16
```

`H` in blue, `T` in orange; the H-path drawn in blue ink and the T-path in orange.

⭐ **The method beat, unstated but visible:** `P(HH) = 0,36` ⟹ each branch is `√0,36 = 0,6`
⟹ tails is `1 − 0,6 = 0,4` ⟹ `P(TT) = 0,4 × 0,4 = 0,16`. **She never writes the square-root
step.** The `0,6` simply appears on the branches. See **F23** — if the app teaches this
question it has to supply a step she left silent, and it should do so in her voice
(`0,6 × 0,6 = 0,36`, working backwards), not by introducing `√` notation she does not use.

⚙️ This is the only place in the chapter where a probability is worked out **backwards from
an outcome to a branch**. It is a genuinely hard IEB/DBE-style beat and it is worth its own
app skill.

---

## PART J — TREE DIAGRAMS WITHOUT REPLACEMENT (`PR p26`) · Round: pr6

Her second three-colour tree, the *without-replacement* twin of `p22`. Same balls, same
colours, same layout — **only the second-level fractions change.** That deliberate pairing is
the teaching device of the whole tree block.

> eg.3) Suppose we have **7 green balls**, **8 yellow balls** and **5 red balls** in a bag.
> **2 balls are chosen randomly from the bag (the first ball is not placed back into the bag.**
> Let's visualize the outcomes.  *(her missing closing bracket — see F24)*

```
   Total = 7 + 8 + 5 = 20            ← again, the total line comes first
```

**The tree.** Identical geometry to `p22`: a dot, three first-level branches
(`7/20` G, `8/20` Y, `5/20` R), each node splitting into the same three coloured tiles.
The second-level fractions are now:

| From | → G | → Y | → R |
|---|---|---|---|
| **G** | `6/19` | `8/19` | `5/19` |
| **Y** | `7/19` | `7/19` | `5/19` |
| **R** | `7/19` | `8/19` | `4/19` |

⭐ **The rule the table makes visible:** every second-level denominator is **19**, and the
**numerator of the colour you already took drops by one**. She never writes that sentence —
the nine fractions are the explanation. An Esplain should point at the diagonal
(`6/19`, `7/19`, `4/19`) as "the one that changed".

Her annotation, in **purple**, above a **purple box drawn around the G-node's three
branches**:

> **always add up to one**

*(`6/19 + 8/19 + 5/19 = 19/19`.)* Note this is a **fourth** phrasing of the same law — `p11`
says "all probabilities in venn diagrams add up to 1", `p20` says "must add up to 1", `p21`
says "sum of probability of each branch must always = 1", `p26` says "always add up to one".
See 0.8.

**The outcome column**, nine rows, each written as a product **and then left unevaluated**:

```
   GG = 7/20 × 6/19 =              YG = 8/20 × 7/19 =         RG = 5/20 × 7/19 =
   GY = 7/20 × 8/19 =              YY = 8/20 × 7/19 =         RY = 5/20 × 8/19 =
   GR = 7/20 × 5/19 =              YR = 8/20 × 5/19 =         RR = 5/20 × 4/19 =
```

⚠️ **Every one of the nine `=` signs is followed by nothing.** All nine products are correct;
none is evaluated. See **F2**, **F25**.

⚙️ Per-character colouring again: `GY` is a green G and an amber Y; `RG` is a red R and a
green G. Same as `p22`.

---

## PART K — CONTINGENCY TABLES (`PR p34`) · Round: pr8 — ⭐ **the one fully worked page in the file**

Header: **contingency tables** (pink). This is the **only page in the whole booklet that
carries a complete question, complete working and a written conclusion.** Everything the app
knows about how she *finishes* a probability answer comes from here.

> Are the events of gender and age independent? Justify your answer with **relevent**
> calculations. *(her spelling — see F26)*

### K1. Her table, as drawn

|  | Older than 40 | Younger than 40 | Total |
|---|---|---|---|
| **Male** | **45** | 25 | **70** |
| **Female** | 35 | 45 | 80 |
| **Total** | **80** | 70 | **150** |

Drawn by hand with ruled lines: a vertical rule after the row-label column and after the
second data column, horizontal rules under the header row and under each data row. No outer
border.

**Her three highlights on the table** — and they are the method:
- the **Male row** highlighted **blue**, all the way across to the `70`
- the **Older than 40 column** highlighted **green**, from the header down through the `45`
- the `45` cell **ringed in purple** — the cell where the blue row and green column cross

and a pink hooked arrow to the bottom-right `150`, labelled:
> **grand total**

⭐ **That is the whole reading device.** Row = one event, column = the other event, the ringed
cell = the intersection, the corner = the denominator. Colour the row and the column and the
intersection announces itself. Any contingency-table Esplain must do this before it does any
arithmetic.

### K2. ⭐ Her four-box independence layout

Four boxes on the page, two up two down, each with its own coloured frame:

**Box 1 — blue frame — `Gender (male / female)`**
```
   P(M) =  70
          ───
          150
```

**Box 2 — green frame — `Age (older / younger than 40)`**
```
   P(O) =  80
          ───
          150
```

**Box 3 — purple frame — `Overlap`**
```
   P(M ∩ O) =  45   =  3
               ───     ──
               150     10
```

**Box 4 — pink frame — `P(M) × P(O)`**
```
   =  70  ×  80   =  56
     ───    ───     ───
     150    150     225
```

Then, under the boxes, in ink, the two conclusion lines:

```
   ∴ P(M ∩ O) ≠ P(M) × P(O)
   ∴ The events are not independent
```

⚙️ **Every load-bearing detail here goes into the app:**
- the boxes are **named in words** — `Gender`, `Age`, `Overlap`, `P(M) × P(O)` — not
  labelled (a), (b), (c), (d)
- the event letters are **the first letter of the category**: `M` for Male, `O` for Older.
  `M` is written in the blue of the Gender box and `O` in the green of the Age box **every
  time they appear**, including inside `P(M ∩ O)` and inside both conclusion lines
- the numerators are in **black**, the denominator `150` in **pink** — the grand total keeps
  its own colour throughout
- `45/150` **is** simplified to `3/10`; `56/225` is left as it is (it will not simplify)
- **two `∴` lines, one claim each** — first the inequality, then the verdict as a full
  sentence. She does not merge them.
- the verdict sentence is **"The events are not independent"** — not "they are dependent"

⭐ **This is the template for every independence question in the chapter** — and the printed
exercises ask it six more times (`p30`, `p31`, `p32`, `p35`, `p36`, `p37`). Build the app's
independence skill from this page and nothing else.

### K3. ⚠️ What is NOT on this page

- **No conditional-probability step.** She checks independence by comparing `P(A ∩ B)` with
  `P(A) × P(B)` — never by comparing `P(A|B)` with `P(A)`. See **F15**.
- **No decimal comparison.** `3/10` versus `56/225` is left as two fractions and declared
  unequal by inspection. She does not convert to `0,3` and `0,2489`. Keep the fractions.
- **No "therefore dependent" wording**, and no mention of mutual exclusivity.

---

## PART L — THE EXERCISE BANK (all printed pages) · **all answers absent**

Twenty-six blank exercise pages in seven colour-coded topic blocks. **The frame colour is the
topic marker** — a real navigation device in her booklet, and the app should reuse it.

| Block | Frame colour | Pages | Examples |
|---|---|---|---|
| **Revision** | pink | `p05`–`p08` | eg.1–4 |
| **Venn-Diagrams** | lilac / purple | `p15`–`p19` | eg.1–3 |
| **Tree Diagrams** | mint green | `p23`–`p25` | eg.1–3 |
| **Tree Diagrams – No Replacement** | mint green *(same)* | `p27`–`p29` | eg.1–3 |
| **Independence** | pale yellow | `p30`–`p33` | eg.1–5 |
| **Contingency Tables** | coral / salmon | `p35`–`p38` | eg.1–3 |
| **Exam Favourites** | teal | `p39`–`p41` | eg.1–3 |

⚙️ The two tree blocks share the **same** green frame but have **different headings**
("Tree Diagrams" / "Tree Diagrams - No Replacement"). Heading, not colour, separates them.

### L1. Revision (`p05`–`p08`) — pink

| Ref | Question | Parts asked |
|---|---|---|
| `p05` eg.1 | `P(A) = 0,38` ; `P(B) = 0,43` ; `P[not (A and B)] = 0,86` | `P(A and B)` · `P(A or B)` · `P(A' ∩ B)` · `P(A' ∪ B)` |
| `p06`–`p07` eg.2 | 150 people, dark chocolate (D) / milk (M); 20 like neither, 50 like D, 115 like M, `x` = both | draw the Venn · calculate `x` · `P(at least one type)` · `P(D but not M)` · then **8 more**: `P(D or M)`, `P(D and M)`, `P[not (D or M)]`, `P[not (D and M)]`, `P[(not D) and M]`, `P[(not D) or M]`, `P[(not D) and (not M)]`, `P[(not D) or (not M)]` |
| `p08` eg.3 | `P(A) = 0,63` ; `P(B) = 0,27` ; `P(A or B) = 0,9` | `P(A and B)` · **"Are these events complementary? Explain."** |
| `p08` eg.4 | `P(A) = 0,5` ; `P(not B) = 0,7` ; `P(A and B) = 0,2` | `P(B)` · `P(A ∩ B)'` · `(3) P(A ∪ B')` *(the stray "(3)" is on the page — see F27)* |

⭐ **`p05` eg.1 mixes her two dialects inside one question** — two parts in words
(`P(A and B)`, `P(A or B)`), two in symbols (`P(A' ∩ B)`, `P(A' ∪ B)`). `p07` asks all eight
parts **in words**. That contrast is deliberate and it is what `p14` exists to support.

⭐ **The `p07` eight-part sweep is the most app-shaped exercise in the booklet.** Eight
different not/and/or combinations over the *same* two-circle Venn, each printed **with its own
copy of the D/M Venn beside it** — exactly the shape of a drill round. Its Venn (printed with
`x` already resolved):

```
   ┌──────────────────────────────────┐
   │   D  ⟋‾‾‾‾⟍⟋‾‾‾‾⟍  M             │
   │     (  15  ( 35 )  80  )         │
   │      ⟍____⟋⟍____⟋                │
   │                            20    │
   └──────────────────────────────────┘
```
D-only `15`, overlap `35`, M-only `80`, outside `20` (bottom-right corner). `D` labelled
top-left outside its circle, `M` top-right outside.

⚙️ Note the *question* on `p06` says `x` is unknown, but the *diagram* on `p07` already shows
`35` in the overlap. `p06` gives an **empty rectangle** to draw into; `p07` gives the completed
Venn eight times. So the Venn is both the answer to `p06` and the given for `p07`.

### L2. Venn-Diagrams (`p15`–`p19`) — lilac

**eg.1 — ice cream (`p15`–`p17`), `n = 100`.** A three-circle Venn, printed complete:

| Region | Value |
|---|---|
| C only | 20 |
| C ∩ V only | 12 |
| V only | 18 |
| C ∩ M only | 10 |
| **C ∩ V ∩ M** | **15** |
| V ∩ M only | 5 |
| M only | 14 |
| outside all three | 6 |

*(Sums to 100.)* `C` labelled top-left, `V` top-right, `M` **below the bottom circle,
centred**; `n = 100` in the top-right corner outside the frame. Same 3-circle geometry as
`p09`.

- `p15` — **ten counting questions** (phrased "How many chose…"): Chocolate · Vanilla ·
  Mint choc chip · Mint choc chip **only** · Vanilla **and** Chocolate · Mint choc chip
  **and** vanilla · **all three** · Vanilla and Mint choc chip **but not** Chocolate ·
  **at least one** flavour · **did not choose any**
- `p16` — **six probability questions**, each with its own copy of the Venn:
  `P(C ∩ V)` · `P(M ∪ V)` · `P(C ∩ V)'` · `P(M ∪ V)'` · `P(C ∩ V ∩ M)` · `P(C ∪ V ∪ M)`
- `p17` — two more: `P(C ∩ V' ∩ M)` · `P(C' ∪ V ∪ M)`, then
  **"Are the events (C ∪ V) and M complementary? Explain."**

⭐ **`p15` → `p16` is her count-then-probability ladder again** (0.6): the same diagram
answered first in counts and then in `P(…)`. Third time she uses it in the chapter.

⚙️ `p16`/`p17` are the only place in the file she writes a **complement of a compound
expression** — `P(C ∩ V)'`, `P(M ∪ V)'` — with the prime outside a bracketed expression.
That is standard and correct (unlike the `P(A)'` on `p09`).

**eg.2 — advertising agency (`p17`–`p18`), 205 clients.** Given: 115 T, 110 R, 130 M, 85 T∧M,
75 T∧R, 95 R∧M, 70 all three. `p17` asks her to **draw** the Venn and supplies an **empty
three-circle skeleton** inside a box. `p18` then prints the completed Venn five times:

| Region | Value |
|---|---|
| T only | 25 |
| T ∩ R only | 5 |
| R only | 10 |
| T ∩ M only | 15 |
| **T ∩ R ∩ M** | **70** |
| R ∩ M only | 25 |
| M only | 20 |
| outside | 35 |

*(Sums to 205.)* Five probability parts: television · either radio or magazines · television
and magazines **but not** radio · radio **only** · **at least one** of the three.

**eg.3 — social media (`p19`), percentages.** 58% F, 53% Y, 29% I, 28% F∧Y, 7% F∧I, 8% Y∧I,
"applicable to all users worldwide using **one or more** of the three sites". Asks: draw the
Venn (**empty skeleton supplied**) · **find the percentage that use all three** ·
`P(F and Y but not I)` · `P(at least two sites)`.

⭐ **eg.3 is the inside-out one**: the triple overlap is the *unknown*, found from "one or
more" ⟹ nothing sits outside ⟹ the regions sum to 100%. It is the hardest Venn question in
the booklet and the only one stated in **percentages**.

### L3. Tree Diagrams — with replacement (`p23`–`p25`) — mint

| Ref | Set-up | Parts |
|---|---|---|
| `p23` eg.1 | 6 black + 4 white balls, **replaced** after each draw, 2 draws | draw the tree · black then white · white then white · **no** white balls · two of **different colour, in any order** |
| `p24` eg.2 | three consecutive soccer matches, captain wins the toss | **every time** · **only once** · **at least once** · in the next two **given that** he won the first toss |
| `p25` eg.3 | 7 black + 9 white + 10 gray cell phones, **replaced**, 2 draws | draw the tree · two white · **no** white · gray then white · black **given that** a white was selected first · two of different colour · **at least one** gray |

⚙️ `p24` is a **three-level** tree (three matches) — the only one in the with-replacement
block. `p25` is a **three-branch** tree like `p22`/`p26`. Between them they cover both ways a
tree grows.

⚙️ `p24` and `p25` each contain a **"given that"** part, and `p10` gives no conditional
formula. Her intended route is almost certainly "read it off the relevant sub-tree" — but that
is an inference, not something on a page. See **F15**.

### L4. Tree Diagrams – No Replacement (`p27`–`p29`) — mint

| Ref | Set-up | Parts |
|---|---|---|
| `p27` eg.1 | 7 kittens, 5 female 2 male, vet examines them **one by one** (first three) | draw the tree · first three all **female** · all **male** · include **at least one different sex** · include **two males** |
| `p28` eg.2 | 6 green + 5 purple pencils, James takes one and **doesn't replace it**, then another | draw the tree · both **purple** · both **green** · **a green and a purple** · **at least one green** |
| `p29` eg.3 | 10 sweets: 3 smarties, 4 astros, 3 jelly tots. **Three** taken out and eaten | draw the tree · **the three sweets eaten will not all be the same** |

⚙️ `p27` and `p29` are **three-level without-replacement** trees — `p29` is three levels *and*
three colours (27 leaves), the biggest tree in the booklet. Its single question is a complement
question in disguise: *not all the same* = `1 − P(all three the same)`.

⭐ Her phrasings for "without replacement" across the chapter, all different:
**"taken out at the same time"** (`p20`) · **"the first ball is not placed back"** (`p26`) ·
**"examines the kittens randomly one by one"** (`p27`) · **"doesn't replace it"** (`p28`) ·
**"taken out of the bag and eaten"** (`p29`). Five wordings, one mechanic. An app skill that
teaches learners to spot which mechanic a question is using has all five phrasings right here.

### L5. Independence (`p30`–`p33`) — pale yellow

| Ref | Question |
|---|---|
| `p30` eg.1 | A standard 52-card deck (the four suits and the 13 cards are spelled out in the question). Event A = drawing a **queen**; Event B = drawing a **spade**. **Show that A and B are independent.** |
| `p30` eg.2 | The 13 hearts only. `C` = even-numbered `{2; 4; 6; 8; 10}`; `D` = prime-numbered `{2; 3; 5; 7}`. **Show that C and D are NOT independent.** |
| `p31` eg.3 | Cyclist: falls with probability 20% when it rains, 4% in dry weather; rain on any day 25%. Draw the tree · calculate `P(the cyclist falls)` · decide whether rainy weather and falling are independent |
| `p32` eg.4 | **Two Venn diagrams, each with all four regions given as fractions.** Decide independent / not independent in each case |
| `p33` eg.5 | `P(X) = 0,5` ; `P(X or Y) = 0,9` ; `P(Y) = x`. Find `x` so that X and Y are **(a) mutually exclusive** and **(b) independent** |

**`p32`'s two Venns** — the app will need to draw exactly these:

*Case 1:* rectangle labelled `S` (the label sits **outside**, at the top-right corner of the
box), two overlapping circles `A` (top-left) and `B` (top-right).
A-only `16/81` · overlap `20/81` · B-only `25/81` · outside, bottom-right `20/81`.

*Case 2:* identical layout.
A-only `3/14` · overlap `1/14` · B-only `5/14` · outside, bottom-right `5/14`.

⚙️ **`p32` labels the rectangle `S`, while every ink Venn labels it `n(S)` above the box.**
Two conventions in one booklet — see **F8**.

⭐ `p33` is a **two-condition algebra question** and it deserves its own app skill: the same
unknown `x` gives one answer under "mutually exclusive" (`P(A ∪ B) = P(A) + P(B)`) and a
different one under "independent" (`P(A ∪ B) = P(A) + P(B) − P(A)·P(B)`). It reappears
essentially unchanged as `p41` eg.3.

### L6. Contingency Tables (`p35`–`p38`) — coral

**`p35` eg.1 — lung cancer, 2 000 deaths.**

|  | Died of lung cancer | Died from other causes | Total |
|---|---|---|---|
| Smoked cigarettes | 1 220 | 120 | 1 340 |
| Did not smoke | 55 | 605 | 660 |
| Total | 1 275 | 725 | 2 000 |

Parts: smoked cigarettes · died of lung cancer · smoked **and** died from other causes · died
of lung cancer **given that** the person had smoked · **"Are the events 'smoking' and 'death
caused by lung cancer' independent? Show all calculations to verify your answer."**

**`p36` eg.2 — speeding fines, 500 drivers, December 2018.**

|  | Men drivers | Women drivers | Total |
|---|---|---|---|
| Received Fines | 120 | 95 | 215 |
| Did not receive fines | 160 | 125 | 285 |
| Total | 280 | 220 | 500 |

Parts: received a speeding fine · was a woman · was a man **and** received a fine · received a
fine **given that** the driver was a man · independence check.

**`p37`–`p38` eg.3 — driving lessons, 60 tests. ⚠️ A partly-blank table.**

| Driving Lessons | Passed the test | Failed the test | Total |
|---|---|---|---|
| Less than 5 | 8 | 32 | 40 |
| Between 5 and 20 | 10 | **d)** | **c)** |
| More than 20 | **a)** | **l)** | **b)** |
| Total | 22 | **e)** | 60 |

Asked: *"Complete the table and find value of a, b, c, d and e."* Then: passed the test · took
between 5 and 20 lessons · took less than 5 **and** passed · failed **given that** they took
more than 20 lessons · independence check. `p38` reprints the same table and asks two more:
**"Are the events 'passing the test' and 'failing the test' mutually exclusive? Explain."** and
**"Are the events 'passing the test' and 'taking more than 20 lessons' mutually exclusive?
Explain."**

⚠️ **Two problems with this table, both flagged:**
1. There are **six** blanks (`a`, `b`, `c`, `d`, `e` and a stray **`l)`**) but the instruction
   names only **five**. `l)` looks like a mis-typed `f)`. See **F28**.
2. ⚠️ **The table cannot be uniquely completed.** *(Digest arithmetic, not on the page:
   `a = 4` and `e = 38` follow immediately, but the remaining equations reduce to the single
   relation `d + l = 6` — every value of `d` from 0 to 6 satisfies every row and column total.)*
   At least one more given number is missing. See **F29** — **do not build an app round on this
   table until she supplies it.**

⭐ **`p38`'s two mutually-exclusive questions are the only "explain in words" pair in the
chapter where the two parts have different answers** (pass/fail are mutually exclusive;
pass/more-than-20-lessons are not). That contrast is a ready-made app skill.

### L7. Exam Favourites (`p39`–`p41`) — teal

| Ref | Question | Parts |
|---|---|---|
| `p39` eg.1 | `P(A) = 0,33` ; `P(B) = 0,67` ; `P(A or B) = 0,89` | `P(A and B)` · `P(A')` · `P(A' ∪ B)` |
| `p40` eg.2 | `P(A) = 0,3` ; `P(B) = 0,4` ; `P(both) = 0,13` | Are A and B **mutually exclusive**? Explain. · **complementary**? Explain. · **independent**? Explain. |
| `p41` eg.3 | `P(A) = 0,4` ; `P(A or B) = 0,7` ; `P(B) = x` | find `x` for **mutually exclusive** · for **independent** |

⭐ **What her "Exam Favourites" tells the app to drill.** Three pages, and between them they
name only four things:
1. the **addition rule rearranged** to find `P(A and B)` (`p39`, and `p05`/`p08` before it),
2. the **complement** `P(A')`,
3. the three **"is it …? Explain."** verdicts — mutually exclusive / complementary /
   independent (`p40`, and `p08`/`p17` before it),
4. the **`P(B) = x` two-condition algebra** (`p41`, a rerun of `p33`).

**None of the three Exam Favourites is a Venn, a tree or a table.** Her exam-favourite set is
entirely the **algebraic-probability** half of the chapter. That is a direct instruction about
how a `pr9` mixed round should be weighted.

⚙️ `p39` eg.1 is `p05` eg.1 with different numbers; `p41` eg.3 is `p33` eg.5 with different
letters. She repeats the two shapes on purpose.

---

## PART M — DIAGRAM SPECS (what an app engine has to be able to draw)

Everything below is measured off her pages, not invented. Three engines cover the chapter.

### M1. The Venn engine

**Two-circle layout** (`p07`, `p09`, `p10`, `p12`, `p13`, `p14`, `p32`):
- an outer **rectangle**, landscape, roughly 2 : 1
- **two equal circles** side by side, overlapping by about **one third of a radius**,
  vertically centred, together spanning about 70% of the box width
- circle name labels sit **outside the circles, at the top corners** — `A` upper-left,
  `B` upper-right. Never inside.
- region values sit **centred in each of the three regions**; the outside value sits in the
  **bottom-right corner** of the rectangle
- sample-space label: `n(S) = …` **on the top edge, outside the box** (her ink pages), or a
  bare `S` **outside the top-right corner** (`p32`), or `n = 100` above the frame (`p15`)

**Three-circle layout** (`p09`, `p15`, `p17`, `p18`, `p19`):
- two circles on top (left and right), **one circle below and centred**; all three equal, all
  three pairwise overlapping, with a common central region
- labels **outside**: first circle top-left, second top-right, third **below the bottom circle,
  centred** — `C`/`V`/`M`, `T`/`R`/`M`, `A`/`B`/`c`
- the outside-all-three value sits at the **middle-right** of the rectangle, level with the
  bottom circle (`6` on `p15`, `35` on `p18`)
- seven region values, one per region, each centred in its region

**Shading conventions** (`p09`, `p13`, `p14`):
- one flat colour per shaded region — no gradients, no hatching
- an unshaded region is left **white**, never greyed
- when the *complement* is the answer, **the rectangle itself is filled** and the circles are
  left white (`P(not A or B)` on `p13`; the complement cards on `p09` and `p14`)
- her palette on the ink pages: hot pink (`p09`), purple (`p13` outside region, `p14`), orange
  (`p13` general), green (intersections on `p12`, `p13`), blue and pink (single circles)

### M2. The tree engine

- **grows left to right**, from a single dot at the left
- branches are **straight line segments** in dark navy/black; node markers are **small rounded
  coloured tiles** with a white capital letter (`p22`, `p26`) or bare coloured letters (`p20`)
- **the probability sits on the branch**, above it, as a **stacked fraction** — her rule
  *"always write the probabilities on the branches"* (`p20`)
- the **outcome column** sits to the right of the leaves: the outcome word (`GG`, `BG`, `HH`)
  with **each character in its own colour**, then `=`, then the product of the branch
  fractions, then `=`, then (sometimes) the answer
- **two-level** trees on `p20`, `p21`, `p22`, `p26`; **three-level** on `p24`, `p27`, `p29`
- **two-branch** nodes for two-outcome experiments; **three-branch** for three colours
- her two reading arrows go **outside** the tree: a long horizontal arrow beneath it labelled
  **`left to right ×`**, and a long vertical arrow down the right labelled **`top to bottom +`**
  (`p21`)
- a **box drawn around one node's fan of branches**, annotated **"must add up to 1"** /
  **"always add up to one"** (`p20` around the root pair; `p26` around the G-node's three)

### M3. The contingency-table engine

- **rows = one event's two categories, columns = the other event's two categories**, plus a
  `Total` row and a `Total` column, with the grand total bottom-right
- her hand-drawn version (`p34`) uses **ruled lines with no outer border**; the printed
  versions (`p35`–`p38`) use a **full grid with an outer border**
- category labels are **full phrases**, not letters — "Older than 40", "Did not smoke",
  "Between 5 and 20", "Received Fines"
- ⭐ **the highlight trio** (`p34`): the relevant **row** in one colour, the relevant **column**
  in a second, the **intersection cell ringed** in a third, plus an arrow to the grand total
  labelled **"grand total"**
- large numbers use a **space** as the thousands separator: `1 220`, `1 340`, `1 275`, `2 000`
  (`p35`) — never a comma

---

## PART N — Where her notes differ from a standard memo

Small, real, and worth the foreman knowing before an Esplain gets "corrected".

1. **All three answer forms are equal.** `3/6 = 1/2 / 0,5 / 50%` (`p03`), `6/10 / 0,6 / 60%`
   (`p04`). A memo picks one. She writes all three with slashes between them, and states it as
   a rule twice (`p02`, `p03`).
2. **Fractions off a Venn or a tree stay unsimplified.** `2/12`, `4/12`, `56/400`. A memo
   simplifies. She keeps the sample-space denominator visible.
3. **The addition rule is taught by counting letters, not by a sentence.** `p10` substitutes
   `a,b,c + b,d,e,f − b = a,b,c,d,e,f`. A memo says "otherwise the overlap is counted twice".
4. **Independence is checked as `P(A ∩ B)` vs `P(A) × P(B)`, in fractions, never converted to
   decimals** (`p34`). A memo often compares decimals, or uses `P(A|B) = P(A)`.
5. **There is no conditional-probability formula in the chapter** — no `P(A|B)` anywhere,
   despite five "given that" questions in the exercise bank. See **F15**.
6. **"At least one" gets two routes and she uses both.** `p21` uses the complement; `p22` lists
   every favourable outcome and adds. A memo picks the complement route every time.
7. **"Mutually inclusive" is a named term on her rules card** (`p10`). Most memos never use the
   phrase at all.
8. **She uses five different phrasings for "without replacement"** and never once writes the
   phrase inside a question — only in the heading of `p27`–`p29`.
9. **The centre of a tree answer is the product line, not the number.** `P(BB) = 6/14 × 5/13`
   and stop (`p20`); nine unevaluated products (`p26`). A memo evaluates.
10. **Two `∴` lines, one claim each**, and the verdict written as a full sentence — "The events
    are not independent" (`p34`).

---

## PART O — Digest vs app (report only — no app code was read or changed)

**Blipwork has no Probability chapter yet.** This digest is written *ahead of* wave 4, so there
is nothing to cross-check. What follows is a proposed split derived only from the page
inventory above.

### O1. Proposed quest split

| Quest | Built from | Mechanic it needs |
|---|---|---|
| **pr1 · the words** | `p02`, `p03`, `p04` | multiple choice — definitions, fair/biased, theoretical vs relative frequency, the three answer forms |
| **pr2 · the rules card** | `p10`, `p05`, `p08`, `p39`, `p40` | `calc` — addition rule rearranged, complement, and the "is it …? Explain." verdicts |
| **pr3 · read a Venn** | `p09`, `p11`, `p12`, `p13`, `p14` | **Venn engine** + tap-a-region / name-the-region; her `p13` ten-card shaded reference is the whole quest |
| **pr4 · fill a Venn** | `p06`–`p07`, `p15`–`p19` | Venn engine + `calc`; two-circle with an unknown `x`, then three-circle |
| **pr5 · trees, with replacement** | `p20`, `p21`, `p22`, `p23`–`p25` | **tree engine**; `left to right ×` / `top to bottom +`; "at least one" via both routes |
| **pr6 · trees, without replacement** | `p26`, `p27`–`p29` | tree engine with the drop-by-one rule; the five "spot the mechanic" phrasings |
| **pr7 · independence** | `p10`, `p30`–`p33` | `calc`; `P(A ∩ B)` vs `P(A) × P(B)` in fractions |
| **pr8 · contingency tables** | `p34`, `p35`–`p38` | **table engine** + her highlight-row/column/cell device |
| **pr9 · exam favourites** | `p39`–`p41` | mixed, weighted to algebraic probability per L7 |

### O2. What this chapter needs that Analytical Geometry did not

- **Three new drawing engines** — Venn, tree, contingency table. None exists in Blipwork
  today. The Venn engine is the biggest single build and it serves both `pr3` and `pr4`.
- **Per-character colouring of outcome labels** in the tree engine (0.11) — `GR` must render
  as a green G beside a red R.
- **Stacked fractions on branches.** A tree with inline `7/20` loses her look.
- **A fraction-comparison answer check** that accepts `1/2`, `0,5` and `50%` as the same answer,
  and accepts `2/12` as well as `1/6` (0.3, 0.4).
- **Region-tap input** for `pr3` — her `p13` card is "which picture matches this expression",
  which is a tap mechanic, not multiple choice.

### O3. What the digest cannot give the app

1. **Any of her worked answers to the 26 exercise pages.** See **F2**.
2. **A conditional-probability method** for the five "given that" questions. See **F15**.
3. **The `p13` numerators** (blank) and the `p21`/`p22`/`p26` answer lines (blank).
4. **A ruling on the `p13` `P(not A and B)` picture/words mismatch.** See **F18**.
5. **The missing number in the `p37` table.** See **F29**.

---

## PART P — FLAGS for Megan

One line each. Nothing below was guessed at — where the page is unclear it is left unclear.

| # | Where | What | How the digest handled it |
|---|---|---|---|
| **F1** | whole file | The brief says **172 pages**; the PDF has **41** (page count, per-page inventory and per-page render all agree). | All 41 read, nothing skipped. **Needs one line from her**: is this the whole Probability chapter, or is a second file (a worked memo, extra worksheets) still to come? |
| **F2** | ⭐ **26 pages** | **Every exercise page in the booklet is blank.** No answers, no ticks, no marks anywhere. Two ink pages are unfinished too (`p21` two blank `=` lines; `p26` nine blank `=` lines; `p13` all numerators blank). | Recorded as the headline fact of the file. **This is the ruling wave 4 waits on**: does the app generate its own answers to her questions, or does a worked copy of this booklet exist somewhere else? |
| **F3** | `p20` vs `p21`, `p22` | **The tree-diagram pages are out of teaching order.** `p20` (a *without-replacement* worked tree plus a hard biased-coin problem) comes **before** the introductory `p21` (coin tossed twice) and `p22` (basic with-replacement). | Digest presents them in teaching order `p21` → `p22` → `p20`, page numbers kept. **Worth one line**: is `p20` misfiled, or does she teach it first on purpose? |
| **F4** | `p13` | The shaded-region reference card has **every numerator blank** — the `/12` denominators are printed but no value was ever written. | Pictures transcribed (they are unambiguous); numbers left blank. See F2. |
| **F5** | `p03`, `p11` | Her `Ɛ` glyph renders as a script epsilon in the ink. It is legible and consistent, but it is **not** a standard `E`. | Transcribed as `Ɛ` throughout so the digest matches the page. See also F12. |
| **F6** | `p21` | The imported stock tree graphic uses **decimal points** (`0.5`, `0.25`) — the only decimal points in the file; everything in her own hand is a comma. | Recorded. Generated content uses her comma. **Worth one line**: replace that graphic when the app draws its own? |
| **F7** | `p03` | Sets use **semicolons** everywhere (`{1 ; 2 ; 3 ; 4 ; 5 ; 6}`) except the two annotation arrows on `p03`, which use **commas** (`{1,3,5}`, `{1, 2, 3, 4, 5, 6}`). | Both recorded. Generated content uses semicolons, matching the rest of the file and every printed page. |
| **F8** | `p11`–`p13` vs `p32`, `p15` | The sample space is labelled **three ways**: `n(S) = 12` above the box (her ink), a bare `S` outside the corner (`p32`), and `n = 100` above the frame (`p15`, `p17`). | All three recorded. **Worth one line**: which one does the app print? |
| **F9** | `p21`, `p22` | She writes **"atleast"** as one word in her ink; her printed question boxes write **"at least"** correctly. | Transcribed as written inside the quotes; generated text uses *at least*. |
| **F10** | `p02` vs `p03` | `p02` defines an event as *"to roll an **uneven** number"*; `p03` works the example as *"rolling an **odd** number"*. | Both recorded — same thing in SA English. **Worth one line**: which word for the app? |
| **F11** | `p03` | Page heading reads **"theoretical probabilty"** — missing an `i`. | Transcribed as written, corrected to *probability* in the digest body. Not reproduced in generated text. |
| **F12** | `p03`, `p11` vs `p02` | The event is a script **`Ɛ`** on `p03`/`p11` (`P(Ɛ)`, `n(Ɛ)`, `Event (Ɛ)`) but **`A`** on `p02` (`P(A)`), and her printed pages use `A`, `B`, `C`, `D`, `X`, `Y`. | Both recorded. **Worth one line**: the app almost certainly wants plain `A`/`B` — confirm the `Ɛ` is only her theory-page letter. |
| **F13** | `p09` | Complementary event is written **`P(A) + P(A)' = 1`** — the prime sits **outside** the bracket. The correct form is `P(A) + P(A') = 1`, and the very next bullet on the same card writes `P(A ∩ A')` correctly. | Transcribed as written and **corrected to `P(A) + P(A') = 1`** in the digest body. **Do not generate the `P(A)'` form.** |
| **F14** | `p09` | In the three-event map the third circle is labelled **lower-case `c`** while the first two are capital `A` and `B`; the outside region is labelled **`not A, B or C'`** with a stray trailing apostrophe. | Transcribed as written, corrected to `C` and `not A, B or C` in the digest body. |
| **F15** | ⭐ `p10` vs `p24`, `p25`, `p35`, `p36`, `p37` | **There is no conditional-probability formula anywhere in the file** — no `P(A\|B)`, no `P(A ∩ B)/P(B)` — yet five exercise questions ask "given that". | Recorded as a gap, **not filled in**. **Needs her ruling**: does she teach "given that" off a sub-tree / a table row with no formula, or is the formula on a page not in this file? A `pr5`/`pr8` round cannot be written without this. |
| **F16** | `p12` | Two grammar slips in her ink: *"a dice with 12 sides **are** rolled"* and *"rest of the **number** does not fall"*. | Transcribed as written inside the quotes; generated question text uses *is rolled* and *numbers*. |
| **F17** | `p13` | The card lists **ten** expressions (`only A`, `A`, `only B`, `B`, `A and B`, `not A and B`, `A or B`, `not A or B`, `not A`, `not B`) — the first four sit in two columns, which makes it read as fewer at a glance. | Counted and listed as ten, so the count is not re-litigated later. |
| **F18** | ⭐ `p13` | **The `P(not A and B)` row's picture does not match its words.** Her shading is "the whole rectangle and both circles except the lens" — that is `P[not (A and B)]`, i.e. `(A ∩ B)'`. The words `P(not A and B)` normally mean `A' ∩ B`, which is the B-only region. | Both recorded, neither silently corrected. **Needs her ruling before any `pr3` skill is built off this row.** |
| **F19** | `p21` | Both worked questions stop at a bare `=`. `P(atleast one H) = P(HH) + P(HT) + P(TH) =` … nothing. `P(no H) = 1 − P(H) =` … nothing. | Method shape recorded; no numbers invented. See F2. |
| **F20** | `p21` | **`P(no H) = 1 − P(H)` is loosely stated.** The complement of "no H" is "at least one H", not "H". | Transcribed as written and **corrected to `P(no H) = 1 − P(at least one H)`** in the digest body. **Do not reproduce her line.** |
| **F21** | ⭐ `p22` | **Arithmetic slip:** `RG = 5/20 × 7/20 = 56/400`. `5 × 7 = 35`, so it should be **`35/400`**. (The `GR` row two blocks above has the same product and is correct at `35/400`.) Confirmed at 6× zoom. | Transcribed as written and corrected in the digest table. **Do not generate this example with `56/400`.** |
| **F22** | `p22` | The last question is headed *"Probability of atleast **on** red ball"* (typo for *one*) and the working line beneath is labelled **`P(one red)`** — but it lists five outcomes, i.e. *at least one* red. | Recorded. **Worth one line**: is `P(one red)` her shorthand for "at least one red"? An app that copies that label would teach a real misconception. |
| **F23** | `p20` | The biased-coin answer needs `√0,36 = 0,6` to get from `P(HH) = 0,36` to a branch probability — **she never writes that step**; `0,6` simply appears on the branches. | Recorded as a silent step. **Worth one line**: how does she say it in class? The app has to supply this and should use her words, not `√` notation she uses nowhere in the file. |
| **F24** | `p26` | *"2 balls are chosen randomly from the bag (the first ball is not placed back into the bag."* — the closing bracket is missing. | Transcribed as written. Not reproduced. |
| **F25** | `p26` | All **nine** outcome products are written and **none is evaluated** — nine trailing `=` signs. All nine products are themselves correct. | Recorded. See F2. |
| **F26** | `p34` | Her spelling **"relevent"** (for *relevant*) in the question line. | Transcribed as written; generated text uses *relevant*. |
| **F27** | `p08` | The third part of eg.4 is printed as **"(3) P(A ∪ B')"** — a stray "(3)" the other parts do not have. Looks like a leftover numbering fragment, not a mark allocation (no other part in the booklet carries marks). | Transcribed as written. **Worth one line**: is `(3)` a mark allocation or a typo? |
| **F28** | `p37`, `p38` | The table has **six** lettered blanks (`a`, `b`, `c`, `d`, `e` and a stray **`l)`**) but the instruction asks for *"a, b, c, d and e"* — five. `l)` is almost certainly a mis-typed `f)`. | Transcribed as written. Not guessed at. |
| **F29** | ⭐ `p37`, `p38` | **The eg.3 table cannot be uniquely completed.** *(Digest arithmetic: `a = 4` and `e = 38` follow at once, but the rest reduces to the single relation `d + l = 6` — any `d` from 0 to 6 satisfies every row and column total.)* At least one more given number is missing. | Recorded, nothing invented. **Needs her ruling before any `pr8` round uses this question.** |
| **F30** | `p24` | eg.2 asks for the probability that a captain wins the toss across three matches but gives **no probability for a single toss**. A fair coin (`1/2`) is implied and never stated. | Recorded. **Worth one line**: is the fair-coin assumption meant to be read in, or is a line missing from the question? |

---

## Appendix — her vocabulary, one place

| Her word / phrase | Means | Page |
|---|---|---|
| **"Let's say we roll a dice"** | her opening line for the whole chapter | `p02` |
| **experiment** | every roll | `p02` |
| **outcome** | the result of the roll *(on which digit it lands)* | `p02` |
| **sample space (S)** | all the possible outcomes | `p02`, `p03`, `p11` |
| **event** | a group of outcomes | `p02` |
| **fair / unbiased** | outcomes are equally likely | `p02` |
| **biased** | some outcomes more likely *(dice or coin was tampered with)* | `p02` |
| **"uneven number"** | odd number | `p02` |
| **"prediction … before conducting any experiments"** | theoretical probability | `p03` |
| **"based on what actually happened"** | relative frequency | `p04` |
| **"total number of sample space"** | the denominator `n(S)` | `p03` |
| **"fractions, decimals or percentages"** | all three answer forms are equal | `p02`, `p03` |
| **"where the circles overlap"** | intersection | `p09`, `p14` |
| **"everything not in A"** | complement | `p09`, `p14` |
| **"`∩` symbol = and"** | her translation key | `p14` |
| **"`∪` symbol = or"** | her translation key | `p14` |
| **"only A" / "only B" / "A and B" / "not A or B"** | her four two-circle region names | `p12` |
| **"only A and B"** | the pairwise-but-not-all-three region | `p09` |
| **"no intersection"** | mutually exclusive / complementary | `p09`, `p10` |
| **mutually inclusive** | `P(A ∩ B) ≠ 0` — there IS an intersection | `p10` |
| **exhaustive events** | no elements outside of events | `p10` |
| **independent events** | one outcome does not influence the other | `p10` |
| **"shows the number of outcomes" / "shows the probability of"** | the two rungs of her count→probability ladder | `p11` |
| **"all probabilities in venn diagrams add up to 1"** | the Venn total law | `p11` |
| **"must add up to 1"** | the branch total law | `p20` |
| **"sum of probability of each branch must always = 1"** | the same law again | `p21` |
| **"always add up to one"** | and again | `p26` |
| **"always write the probabilities on the branches"** | the tree-drawing law | `p20` |
| **"left to right ×"** | multiply along a branch | `p21` |
| **"top to bottom +"** | add down the outcomes | `p21` |
| **"Total = 7 + 8 + 5 = 20"** | the line that opens every tree | `p22`, `p26` |
| **"taken out at the same time"** | without replacement | `p20` |
| **"the first ball is not placed back"** | without replacement | `p26` |
| **"one by one" / "doesn't replace it"** | without replacement | `p27`, `p28` |
| **"atleast"** | at least *(her one-word spelling)* | `p21`, `p22` |
| **"grand total"** | the bottom-right cell of a contingency table | `p34` |
| **"Overlap"** | her box heading for `P(A ∩ B)` in an independence check | `p34` |
| **"The events are not independent"** | her verdict sentence | `p34` |
| **"Show all calculations to verify your answer."** | her printed instruction on every independence question | `p35`–`p37` |
| **"Explain."** | her printed instruction on every verdict question | `p08`, `p17`, `p38`, `p40` |
