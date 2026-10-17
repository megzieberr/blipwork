/* ============================================================
   EXAM FOCUS — Equations & Inequalities · THE LEVEL 4 ★ TILE
   ("Level 4 ★ — the brave round".)
   (EXAM-BUILD-DAY.md, 2026-08-23, her ruling 5: "Levels 1–3 on the
   normal tiles; every chapter gets a last tile Level 4 ★ holding mixed
   Level-4 questions for that chapter. The low achievers must never
   meet a ★ while drilling basics." Wave 2, session C2.)
   ------------------------------------------------------------
   SIX cards composed here. Session C1 appends the chapter's EXISTING
   ★ parts to this tile afterwards — the ones that were written inside
   normal cards before the Level 4 tiles existed — so the tile ends up
   longer than six. Nothing in this file is one of those: every
   question below is fresh.

   EVERY card carries at least one level-4 part, and no part anywhere
   here is below level 3 — the wall verify-exam.html Part 13 enforces
   once eqn comes off its L4_MOVE_PENDING list (session C1's job, since
   C1 is the session doing the moving).

   WHAT LEVEL 4 MEANS HERE: un-cued, multi-step, "show that",
   real-world wrappers, and questions asked backwards.
     q1  un-cued "prove the roots are real for all p", with the
         completing-the-square-on-Δ move that is distinctively hers
         (METHODS-algebra B12(b), `EQ p48`)
     q2  a k-question with TWO conditions — real AND unequal, then the
         smallest positive integer k that satisfies both; the Δ
         inequality has to be read off her bowl (B12(a) into B8)
     q3  a simultaneous system whose quadratic only appears once you
         see that 4ˣ is (2ˣ)² — the k-method, un-cued (B6 into A13)
     q4  a surd equation inside a real-world wrapper, where BOTH roots
         survive the substitution test and the CONTEXT does the
         rejecting (A15 into a word problem)
     q5  the equation reconstructed from its roots, then pushed one
         step further: for which k does it have equal roots
         (`EQ p39`, her "exam favourite", into B12)
     q6  a rational inequality: an always-positive denominator, two
         critical values from factorising, and the limit that must
         ride along after a semicolon (B9 into B8)

   ⚖️ TWO NOTES FOR THE FOREMAN, both recorded rather than silently
   decided (sessions/C2-eqn-new-tiles.md asked for something slightly
   different in each case, and METHODS-algebra.md outranks the brief on
   method — EXAM-FOCUS-PLAN.md, "Whose methods"):

     · q2's second condition. The brief asked for "real AND unequal AND
       the sum of the roots positive". METHODS-algebra.md Part E item 1
       lists "sum and product of roots (x₁ + x₂ = −b/a)" among the
       skills her notes do NOT cover, under the heading "Do not invent a
       method for any of these" — she only ever reconstructs an equation
       from its roots by multiplying the brackets out. So the second
       condition here is an INTEGER condition instead ("the smallest
       positive integer value of k"), which is her own taught habit
       from `T2122 p08`. Same two-condition shape, her method.
     · q6's answer format. The brief asked for interval notation.
       METHODS-algebra.md B8 rules it out in as many words — "Never do:
       a sign table, a test-point table, or interval notation" — and
       Part E item 8 repeats it. The answer is therefore written her
       way: &nbsp;x ≤ … or x ≥ … , with the limit after a semicolon.

   METHOD + VOICE: METHODS-algebra.md throughout. Every number is fresh.
   No diagrams — nothing on this tile would carry a figure on a real
   paper. lostQuest is eq8 / eq3 / eq7 by card, and exp/es8 for the
   surd wrapper (the round that teaches isolate-square-TEST lives in
   the Exponents & Surds chapter; the schema allows the cross-chapter
   link and js/exam-play.js resolves it the same way).
   ============================================================ */

const PAPER = "siblings";
const CH = "eqn";

const sf = (n, d) => `<span class="sfrac"><span class="sf-n">${n}</span><span class="sf-d">${d}</span></span>`;

/* The rational-inequality expression of q6, pre-built: fracHtml
   (js/ui.js) cannot stack a denominator that ends in a superscript,
   so (x + 2)² would be left as a bare slash on the page. */
const Q6_EXPR = sf("2x² − 5x − 3", "(x + 2)²");

/* ---------------------------------------------------------------
   q1 — UN-CUED "REAL FOR ALL p" (B12(b)).
   x² − (p + 1)x + (p − 2) = 0
   Δ = (p + 1)² − 4(p − 2) = p² − 2p + 9 = (p − 1)² + 8 ≥ 8 > 0
   --------------------------------------------------------------- */
const q1 = {
  id: "eqn.l4.q1",
  chapter: CH,
  topic: "level-4",
  archetype: "prove-roots-real-for-all-p-by-completing-the-square-on-delta",
  paper: PAPER,
  lostQuest: { chapter: CH, quest: "eq8" },
  marks: 5,
  parts: [
    {
      id: "a",
      marks: 5,
      level: 4,
      prompt: {
        en: "Prove that the roots of &nbsp;x² − (p + 1)x + (p − 2) = 0 &nbsp;are real for every real value of p.", af: "Bewys dat die wortels van &nbsp;x² − (p + 1)x + (p − 2) = 0 &nbsp;reëel is vir elke reële waarde van p.",
      },
      hint: {
        en: "“Real roots” is a statement about Δ. Work Δ out in terms of p, and then ask yourself how you could possibly show that a whole expression in p is never negative — you have met a shape that is never negative before.", af: "“Reële wortels” is 'n bewering oor Δ. Werk Δ uit in terme van p, en vra jouself dan af hoe jy ooit kan wys dat 'n hele uitdrukking in p nooit negatief is nie: jy het al voorheen 'n vorm gesien wat nooit negatief is nie.",
      },
      memo: [
        { type: "step", text: { en: "a = 1, &nbsp;b = −(p + 1), &nbsp;c = p − 2. Substitute into Δ, with brackets around every negative:", af: "a = 1, &nbsp;b = −(p + 1), &nbsp;c = p − 2. Vervang in Δ, met hakies om elke negatief:" } },
        { type: "step", text: { en: "Δ = b² − 4ac = (−(p + 1))² − 4(1)(p − 2)", af: "Δ = b² − 4ac = (−(p + 1))² − 4(1)(p − 2)" }, ticks: ["s/f"] },
        { type: "step", text: { en: "= p² + 2p + 1 − 4p + 8 = p² − 2p + 9", af: "= p² + 2p + 1 − 4p + 8 = p² − 2p + 9" }, ticks: ["ca"] },
        { type: "step", text: { en: "complete the square on Δ: &nbsp;&nbsp;b/2 = −2/2 = −1, &nbsp;so&nbsp; Δ = (p² − 2p + 1) − 1 + 9", af: "voltooi die vierkant op Δ: &nbsp;&nbsp;b/2 = −2/2 = −1, &nbsp;dus&nbsp; Δ = (p² − 2p + 1) − 1 + 9" }, ticks: ["ca"] },
        { type: "step", text: { en: "Δ = (p − 1)² + 8", af: "Δ = (p − 1)² + 8" }, ticks: ["ca"] },
        { type: "answer", text: { en: "(p − 1)² is a square, so it is never negative &nbsp;∴&nbsp; Δ ≥ 8, which is greater than 0, for every real value of p &nbsp;∴&nbsp; the roots are real (and unequal) for every real value of p.", af: "(p − 1)² is 'n kwadraat, dus is dit nooit negatief nie &nbsp;∴&nbsp; Δ ≥ 8, wat groter as 0 is, vir elke reële waarde van p &nbsp;∴&nbsp; die wortels is reëel (en ongelyk) vir elke reële waarde van p." }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: &nbsp;b = −(p + 1), so &nbsp;b² = (−(p + 1))² = (p + 1)² = p² + 2p + 1. The minus disappears when you square it, and the bracket must be squared as a whole — &nbsp;p² + 1&nbsp; is not it. Also note &nbsp;−4(1)(p − 2) = −4p + 8: the &nbsp;−4&nbsp; reaches BOTH terms.", af: "PASOP: &nbsp;b = −(p + 1), dus &nbsp;b² = (−(p + 1))² = (p + 1)² = p² + 2p + 1. Die minus verdwyn as jy dit kwadreer, en die hakie moet as 'n geheel gekwadreer word, so &nbsp;p² + 1&nbsp; is nie reg nie. Let ook op dat &nbsp;−4(1)(p − 2) = −4p + 8: die &nbsp;−4&nbsp; bereik ALBEI terme.",
        } },
      ],
      esplain: {
        en: "Nothing in this question tells you what to do, which is what makes it a level 4. The word “real” is the clue: roots are real when the discriminant is not negative, so the whole job is to show that this discriminant can never dip below zero, no matter what p you choose. Working it out gives p squared minus two p plus nine, and you cannot tell at a glance whether that could ever go negative. Completing the square is what settles it. Once it is written as p minus one, squared, plus eight, the answer is obvious: a square is never negative, so the smallest the discriminant can ever be is eight. Eight is comfortably above zero, so the roots are real every single time — in fact real and unequal, since Δ is never actually zero.", af: "Niks in hierdie vraag sê vir jou wat om te doen nie, en dit is wat dit 'n vlak 4 maak. Die woord “reëel” is die leidraad: wortels is reëel as die diskriminant nie negatief is nie, so die hele taak is om te wys dat hierdie diskriminant nooit onder nul kan sak nie, watter p jy ook al kies. As jy dit uitwerk, kry jy p kwadraat minus twee p plus nege, en jy kan nie met die eerste oogopslag sien of dit ooit negatief kan word nie. Die voltooiing van die vierkant gee die antwoord. Sodra dit geskryf is as p minus een, gekwadreer, plus agt, is die antwoord voor die hand liggend: 'n kwadraat is nooit negatief nie, so die kleinste wat die diskriminant ooit kan wees, is agt. Agt is gemaklik bo nul, so die wortels is elke keer reëel, trouens reëel en ongelyk, want Δ is nooit werklik nul nie.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q2 — TWO CONDITIONS ON k (B12(a) into B8).
   x² + (k − 3)x + 4 = 0, Δ = (k − 3)² − 16 = k² − 6k − 7 = (k − 7)(k + 1)
   real & unequal ⟹ k < −1 or k > 7; smallest positive integer ⟹ k = 8
   --------------------------------------------------------------- */
const q2 = {
  id: "eqn.l4.q2",
  chapter: CH,
  topic: "level-4",
  archetype: "k-for-real-and-unequal-through-a-quadratic-inequality-then-an-integer",
  paper: PAPER,
  lostQuest: { chapter: CH, quest: "eq8" },
  marks: 7,
  parts: [
    {
      id: "a",
      marks: 5,
      level: 4,
      prompt: {
        en: "Determine the values of k for which the roots of &nbsp;x² + (k − 3)x + 4 = 0 &nbsp;are real and unequal.", af: "Bepaal die waardes van k waarvoor die wortels van &nbsp;x² + (k − 3)x + 4 = 0 &nbsp;reëel en ongelyk is.",
      },
      hint: {
        en: "Real and unequal means Δ &gt; 0. Work Δ out in terms of k and you will find you are holding a quadratic INEQUALITY in k — so finish it the way you finish any quadratic inequality: critical points, then the bowl.", af: "Reëel en ongelyk beteken Δ &gt; 0. Werk Δ uit in terme van k, en jy sal sien jy hou 'n kwadratiese ONGELYKHEID in k vas, so maak dit klaar soos jy enige kwadratiese ongelykheid klaarmaak: kritieke waardes, dan die bak.",
      },
      memo: [
        { type: "step", text: { en: "a = 1, &nbsp;b = k − 3, &nbsp;c = 4:", af: "a = 1, &nbsp;b = k − 3, &nbsp;c = 4:" } },
        { type: "step", text: { en: "Δ = (k − 3)² − 4(1)(4)", af: "Δ = (k − 3)² − 4(1)(4)" }, ticks: ["s/f"] },
        { type: "step", text: { en: "= k² − 6k + 9 − 16 = k² − 6k − 7", af: "= k² − 6k + 9 − 16 = k² − 6k − 7" }, ticks: ["ca"] },
        { type: "step", text: { en: "real and unequal &nbsp;⟹&nbsp; Δ &gt; 0: &nbsp;&nbsp;k² − 6k − 7 &gt; 0", af: "reëel en ongelyk &nbsp;⟹&nbsp; Δ &gt; 0: &nbsp;&nbsp;k² − 6k − 7 &gt; 0" }, ticks: ["ca"] },
        { type: "step", text: { en: "(k − 7)(k + 1) &gt; 0 &nbsp;&nbsp;&nbsp;CP: &nbsp;k = 7 &nbsp;or&nbsp; k = −1", af: "(k − 7)(k + 1) &gt; 0 &nbsp;&nbsp;&nbsp;kritieke waardes: &nbsp;k = 7 &nbsp;of&nbsp; k = −1" }, ticks: ["ca"] },
        { type: "answer", text: { en: "happy parabola, and the sign is &gt;, so read OUTSIDE the bowl: &nbsp;&nbsp;∴&nbsp; k &lt; −1 &nbsp;&nbsp;or&nbsp;&nbsp; k &gt; 7", af: "happy parabool, en die teken is &gt;, so lees BUITE die bak: &nbsp;&nbsp;∴&nbsp; k &lt; −1 &nbsp;&nbsp;of&nbsp;&nbsp; k &gt; 7" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: the answer to a &gt; 0 inequality with two critical points is TWO pieces joined by “or” — never a single sandwich like &nbsp;−1 &lt; k &lt; 7, which is the “inside the bowl” answer and is exactly wrong here. And never hand in the calculator's semicolon form &nbsp;k &lt; −1 ; 7 &lt; k&nbsp; — rewrite it with “or”, with k on the left.", af: "PASOP: die antwoord op 'n ongelykheid met &gt; 0 en twee kritieke waardes is TWEE stukke wat met “of” verbind word, nooit 'n enkele toebroodjie soos &nbsp;−1 &lt; k &lt; 7 nie, want dit is die “binne die bak”-antwoord en presies verkeerd hier. En gee nooit die sakrekenaar se kommapuntvorm &nbsp;k &lt; −1 ; 7 &lt; k&nbsp; in nie: skryf dit oor met “of”, met k aan die linkerkant.",
        } },
      ],
      esplain: {
        en: "There are two layers here and both have to be seen. The first is that “real and unequal” is a statement about the discriminant being strictly greater than zero. The second is what the discriminant turns out to be: not a number, but a quadratic in k. So the moment you write Δ greater than zero you are holding a quadratic inequality, and the method for that is her TIP Chips routine — everything on the left, nothing negative in front of the squared term, factorise, and set each factor equal to zero to get the critical points. Seven and negative one. Then the picture decides: a happy parabola is above the axis on the two outside arms, so the answer is k below negative one or k above seven, joined by the word or.", af: "Daar is twee lae hier, en jy moet albei raaksien. Die eerste is dat “reëel en ongelyk” 'n bewering is dat die diskriminant streng groter as nul is. Die tweede is wat die diskriminant blyk te wees: nie 'n getal nie, maar 'n kwadratiese uitdrukking in k. So die oomblik dat jy Δ groter as nul skryf, hou jy 'n kwadratiese ongelykheid vas, en die metode daarvoor is haar TIP Chips-roetine: alles aan die linkerkant, niks negatief voor die kwadraatterm nie, faktoriseer, en stel elke faktor gelyk aan nul om die kritieke waardes te kry. Sewe en negatief een. Dan besluit die prentjie: 'n happy parabool is bo die as op die twee buitenste arms, so die antwoord is k kleiner as negatief een of k groter as sewe, verbind met die woord of.",
      },
    },
    {
      id: "b",
      marks: 2,
      level: 3,
      prompt: {
        en: "Hence write down the smallest INTEGER value of k, greater than 0, for which the roots are real and unequal.", af: "Skryf gevolglik die kleinste HEELGETAL-waarde van k neer, groter as 0, waarvoor die wortels reëel en ongelyk is.",
      },
      hint: {
        en: "You have two branches from (a). Only one of them contains positive numbers at all — so look there, and remember that the critical value itself is not part of the answer.", af: "Jy het twee gevalle uit (a). Net een van hulle bevat enige positiewe getalle, so kyk daar, en onthou dat die kritieke waarde self nie deel van die antwoord is nie.",
      },
      memo: [
        { type: "step", text: { en: "k must be positive, so the branch &nbsp;k &lt; −1&nbsp; is out. That leaves &nbsp;k &gt; 7.", af: "k moet positief wees, so die geval &nbsp;k &lt; −1&nbsp; val weg. Dan bly net &nbsp;k &gt; 7 oor." }, ticks: ["ca"] },
        { type: "answer", text: { en: "the smallest integer bigger than 7 is 8 &nbsp;&nbsp;∴&nbsp; k = 8 &nbsp;&nbsp;(check: Δ = (8 − 3)² − 16 = 25 − 16 = 9, which is &gt; 0)", af: "die kleinste heelgetal groter as 7 is 8 &nbsp;&nbsp;∴&nbsp; k = 8 &nbsp;&nbsp;(toets: Δ = (8 − 3)² − 16 = 25 − 16 = 9, wat &gt; 0 is)" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: &nbsp;k = 7&nbsp; is NOT allowed. At k = 7 the discriminant is exactly 0, which gives roots that are real and EQUAL — the one thing the question rules out. A strict &nbsp;&gt;&nbsp; always means the critical value itself is excluded.", af: "PASOP: &nbsp;k = 7&nbsp; is NIE toegelaat nie. By k = 7 is die diskriminant presies 0, en dit gee wortels wat reëel en GELYK is: die een ding wat die vraag uitsluit. 'n Streng &nbsp;&gt;&nbsp; beteken altyd dat die kritieke waarde self uitgesluit is.",
        } },
      ],
      esplain: {
        en: "This part is quick, but it is quick only if part (a) is right, and it is easy to answer too fast. Two branches came out of (a): everything below negative one and everything above seven. The question asks for a value bigger than zero, so the whole left branch is irrelevant. On the right branch you need the first whole number strictly past seven, and that is eight, not seven itself. Seven is the boundary, where the discriminant lands exactly on zero and the roots become equal instead of unequal. Checking is worth the ten seconds it takes: put eight back in and the discriminant comes out as nine, safely positive.", af: "Hierdie deel is vinnig, maar net as deel (a) reg is, en dit is maklik om te vinnig te antwoord. Twee gevalle het uit (a) gekom: alles onder negatief een en alles bo sewe. Die vraag vra 'n waarde groter as nul, so die hele linkerkantste geval is nie ter sake nie. In die regterkantste geval het jy die eerste heelgetal streng verby sewe nodig, en dit is agt, nie sewe self nie. Sewe is die grens, waar die diskriminant presies op nul land en die wortels gelyk word in plaas van ongelyk. Die toets is die tien sekondes werd: sit agt terug en die diskriminant kom uit as nege, veilig positief.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q3 — SIMULTANEOUS, WITH THE k-METHOD HIDDEN IN IT.
   y = 2ˣ and 4ˣ − 3y = 4 → y² − 3y − 4 = 0 → y = 4 (x = 2) or y = −1 (out)
   --------------------------------------------------------------- */
const q3 = {
  id: "eqn.l4.q3",
  chapter: CH,
  topic: "level-4",
  archetype: "simultaneous-exponential-system-needing-the-k-method",
  paper: PAPER,
  lostQuest: { chapter: CH, quest: "eq3" },
  marks: 6,
  parts: [
    {
      id: "a",
      marks: 6,
      level: 4,
      prompt: {
        en: "Solve for x and y simultaneously:<br>&nbsp;&nbsp;y = 2<sup>x</sup> &nbsp;&nbsp;and&nbsp;&nbsp; 4<sup>x</sup> − 3y = 4", af: "Los gelyktydig op vir x en y:<br>&nbsp;&nbsp;y = 2<sup>x</sup> &nbsp;&nbsp;en&nbsp;&nbsp; 4<sup>x</sup> − 3y = 4",
      },
      hint: {
        en: "The first equation already tells you what y is, so everything in the second one needs to be written in terms of y. That means finding a way to say 4<sup>x</sup> using 2<sup>x</sup> — what is 4, written as a power of 2?", af: "Die eerste vergelyking sê reeds vir jou wat y is, so alles in die tweede een moet in terme van y geskryf word. Dit beteken jy moet 'n manier vind om 4<sup>x</sup> met 2<sup>x</sup> te skryf: wat is 4, as 'n mag van 2 geskryf?",
      },
      memo: [
        { type: "step", text: { en: "Everything in the second equation must be written in terms of y. The key is that 4 = 2²:", af: "Alles in die tweede vergelyking moet in terme van y geskryf word. Die sleutel is dat 4 = 2²:" }, ticks: ["s/f"] },
        { type: "step", text: { en: "4<sup>x</sup> = (2²)<sup>x</sup> = (2<sup>x</sup>)² = y²", af: "4<sup>x</sup> = (2²)<sup>x</sup> = (2<sup>x</sup>)² = y²" }, ticks: ["ca"] },
        { type: "step", text: { en: "y² − 3y = 4 &nbsp;&nbsp;⟹&nbsp;&nbsp; y² − 3y − 4 = 0", af: "y² − 3y = 4 &nbsp;&nbsp;⟹&nbsp;&nbsp; y² − 3y − 4 = 0" }, ticks: ["ca"] },
        { type: "step", text: { en: "(y − 4)(y + 1) = 0 &nbsp;&nbsp;∴&nbsp; y = 4 &nbsp;or&nbsp; y = −1", af: "(y − 4)(y + 1) = 0 &nbsp;&nbsp;∴&nbsp; y = 4 &nbsp;of&nbsp; y = −1" }, ticks: ["ca"] },
        { type: "answer", text: { en: "y = 4: &nbsp;2<sup>x</sup> = 4 = 2² &nbsp;— same base, so the exponents are equal &nbsp;∴&nbsp; x = 2 &nbsp;&nbsp;∴&nbsp; (2 ; 4)", af: "y = 4: &nbsp;2<sup>x</sup> = 4 = 2², &nbsp;dieselfde grondtal, dus is die eksponente gelyk &nbsp;∴&nbsp; x = 2 &nbsp;&nbsp;∴&nbsp; (2 ; 4)" }, ticks: ["a"] },
        { type: "answer", text: { en: "y = −1: &nbsp;2<sup>x</sup> = −1 has <b>no solution</b> — a positive base can never give a negative value &nbsp;∴&nbsp; (2 ; 4) is the only answer", af: "y = −1: &nbsp;2<sup>x</sup> = −1 het <b>geen oplossing</b> nie: 'n positiewe grondtal kan nooit 'n negatiewe waarde gee nie &nbsp;∴&nbsp; (2 ; 4) is die enigste antwoord" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: &nbsp;2<sup>x</sup> = −1&nbsp; is “<b>no solution</b>”, not “undefined” and not “non-real”. Undefined is only for a denominator of zero; non-real is for an even root of a negative. Here the graph of 2<sup>x</sup> simply lives above the x-axis and never comes down to −1.", af: "ONTHOU: &nbsp;2<sup>x</sup> = −1&nbsp; is “<b>geen oplossing</b>”, nie “onbepaald” nie en nie “nie-reëel” nie. Onbepaald is net vir 'n noemer van nul; nie-reëel is vir 'n ewe wortel van 'n negatief. Hier lê die grafiek van 2<sup>x</sup> eenvoudig bo die x-as en kom nooit af tot by −1 nie.",
        } },
      ],
      esplain: {
        en: "This is a simultaneous system and a k-method question at the same time, and nothing on the page says so. The first equation hands you y equal to two to the x, so the plan is to rewrite the second equation entirely in y. Four to the x is the only obstacle, and it falls the moment you write four as two squared: two squared, to the x, is the same as two to the x, all squared, which is y squared. Now the second equation is an ordinary trinomial in y. Factorise it and you get four and negative one. Four is fine and takes you back to x equal to two. Negative one is impossible, because two to a power is always positive, so that branch simply has no solution.", af: "Dit is 'n stelsel gelyktydige vergelykings en 'n k-metode-vraag tegelyk, en niks op die bladsy sê so nie. Die eerste vergelyking gee vir jou y gelyk aan twee tot die mag x, so die plan is om die tweede vergelyking heeltemal in y oor te skryf. Vier tot die mag x is die enigste struikelblok, en dit val weg die oomblik dat jy vier as twee kwadraat skryf: twee kwadraat, tot die mag x, is dieselfde as twee tot die mag x, alles gekwadreer, en dit is y kwadraat. Nou is die tweede vergelyking 'n gewone drieterm in y. Faktoriseer dit en jy kry vier en negatief een. Vier is reg en neem jou terug na x gelyk aan twee. Negatief een is onmoontlik, want twee tot 'n mag is altyd positief, so daardie geval het eenvoudig geen oplossing nie.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q4 — A SURD EQUATION INSIDE A WORD PROBLEM.
   width x − 4, length √(4x − 4), length = width + 3
   ⟹ √(4x − 4) = x − 1 ⟹ x² − 6x + 5 = 0 ⟹ x = 1 or x = 5
   BOTH pass the substitution test; x = 1 is rejected by the CONTEXT
   (it would make the bed −3 m wide).
   --------------------------------------------------------------- */
const q4 = {
  id: "eqn.l4.q4",
  chapter: CH,
  topic: "level-4",
  archetype: "surd-equation-in-a-real-world-wrapper-rejected-by-context",
  paper: PAPER,
  lostQuest: { chapter: "exp", quest: "es8" },
  marks: 7,
  parts: [
    {
      id: "a",
      marks: 2,
      level: 3,
      prompt: {
        en: "A rectangular flower bed is &nbsp;(x − 4) metres wide. Its length, in metres, is &nbsp;√(4x − 4). &nbsp;The bed is 3 metres longer than it is wide.<br><br>Show that this information gives the equation &nbsp;√(4x − 4) = x − 1.", af: "'n Reghoekige blombedding is &nbsp;(x − 4) meter breed. Sy lengte, in meter, is &nbsp;√(4x − 4). &nbsp;Die bedding is 3 meter langer as wat dit breed is.<br><br>Toon aan dat hierdie inligting die vergelyking &nbsp;√(4x − 4) = x − 1 gee.",
      },
      hint: {
        en: "Turn the sentence into symbols one piece at a time. “3 metres longer than it is wide” is a sentence about the LENGTH — write it as an equation and then tidy the right-hand side.", af: "Skryf die sin stuk vir stuk in simbole oor. “3 meter langer as wat dit breed is” is 'n sin oor die LENGTE: skryf dit as 'n vergelyking en maak dan die regterkant netjies.",
      },
      memo: [
        { type: "step", text: { en: "“3 metres longer than it is wide” means &nbsp;length = width + 3:", af: "“3 meter langer as wat dit breed is” beteken &nbsp;lengte = breedte + 3:" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "√(4x − 4) = (x − 4) + 3 &nbsp;&nbsp;∴&nbsp; √(4x − 4) = x − 1", af: "√(4x − 4) = (x − 4) + 3 &nbsp;&nbsp;∴&nbsp; √(4x − 4) = x − 1" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: in a “show that” question the answer is printed for you, so every mark is for the working that reaches it. Start from the sentence, not from the given line, and let the given line be your LAST line.", af: "PASOP: in 'n “toon aan”-vraag is die antwoord vir jou gedruk, so elke punt is vir die werk wat daarheen lei. Begin by die sin, nie by die gegewe reël nie, en laat die gegewe reël jou LAASTE reël wees.",
        } },
      ],
      esplain: {
        en: "Word problems are translation, and translation goes best one phrase at a time. The bed's width is x minus four metres and its length is the root expression, and the sentence tells you how the two compare: the length is three more than the width. Written down, that is the root expression equals x minus four plus three, and the right-hand side tidies to x minus one. Notice that you are not solving anything yet, so resist the urge to square. A show-that question is asking you to build the equation, and the marks sit on the line where you turn the English into symbols and on the line where you simplify it into the exact form printed in the question.", af: "Woordprobleme is vertaalwerk, en vertaling gaan die beste een stukkie op 'n slag. Die bedding se breedte is x minus vier meter en sy lengte is die worteluitdrukking, en die sin sê hoe die twee vergelyk: die lengte is drie meer as die breedte. Neergeskryf is dit: die worteluitdrukking is gelyk aan x minus vier plus drie, en die regterkant word netjies x minus een. Let op dat jy nog niks oplos nie, so weerstaan die drang om te kwadreer. 'n Toon-aan-vraag vra jou om die vergelyking te bou, en die punte sit op die reël waar jy die woorde in simbole omsit en op die reël waar jy dit vereenvoudig tot die presiese vorm wat in die vraag gedruk is.",
      },
    },
    {
      id: "b",
      marks: 5,
      level: 4,
      prompt: {
        en: "Solve for x, and hence write down the width and the length of the bed.<br>Give a reason for rejecting any value of x that you do not use.", af: "Los op vir x, en skryf gevolglik die breedte en die lengte van die bedding neer.<br>Gee 'n rede waarom jy enige waarde van x wat jy nie gebruik nie, verwerp.",
      },
      hint: {
        en: "Solve the surd equation as usual, and test both answers. Then do the thing the algebra cannot do for you: put each answer back into the STORY and ask whether a real flower bed could look like that.", af: "Los die wortelvormvergelyking soos gewoonlik op, en toets albei antwoorde. Doen dan die ding wat die algebra nie vir jou kan doen nie: sit elke antwoord terug in die STORIE en vra of 'n regte blombedding so kan lyk.",
      },
      memo: [
        { type: "step", text: { en: "Square both sides: &nbsp;&nbsp;4x − 4 = (x − 1)² = x² − 2x + 1", af: "Kwadreer albei kante: &nbsp;&nbsp;4x − 4 = (x − 1)² = x² − 2x + 1" }, ticks: ["s/f"] },
        { type: "step", text: { en: "0 = x² − 6x + 5 = (x − 1)(x − 5) &nbsp;&nbsp;∴&nbsp; x = 1 &nbsp;or&nbsp; x = 5", af: "0 = x² − 6x + 5 = (x − 1)(x − 5) &nbsp;&nbsp;∴&nbsp; x = 1 &nbsp;of&nbsp; x = 5" }, ticks: ["ca"] },
        { type: "step", text: { en: "Test both in the original equation: at &nbsp;x = 1&nbsp; both sides are 0, and at &nbsp;x = 5&nbsp; both sides are 4. So the substitution test keeps BOTH — the story is what decides.", af: "Toets albei in die oorspronklike vergelyking: by &nbsp;x = 1&nbsp; is albei kante 0, en by &nbsp;x = 5&nbsp; is albei kante 4. Die vervangingstoets hou dus ALBEI: die storie besluit." } },
        { type: "answer", text: { en: "x = 1 is rejected: the width would be &nbsp;1 − 4 = −3 m, and a flower bed cannot have a negative width.", af: "x = 1 word verwerp: die breedte sou &nbsp;1 − 4 = −3 m wees, en 'n blombedding kan nie 'n negatiewe breedte hê nie." }, ticks: ["a"] },
        { type: "answer", text: { en: "x = 5: &nbsp;width = 5 − 4 = 1 m", af: "x = 5: &nbsp;breedte = 5 − 4 = 1 m" }, ticks: ["a"] },
        { type: "answer", text: { en: "length = √(20 − 4) = √16 = 4 m &nbsp;&nbsp;(and 4 = 1 + 3, exactly as the question says)", af: "lengte = √(20 − 4) = √16 = 4 m &nbsp;&nbsp;(en 4 = 1 + 3, presies soos die vraag sê)" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: this is the surd equation where the substitution test does NOT do the rejecting. Both answers pass it, so a learner who tests and stops hands in an impossible flower bed. In any word problem, the LAST check is always the story: no negative lengths, no negative masses, no fractional people.", af: "PASOP: dit is die wortelvormvergelyking waar die vervangingstoets NIE die verwerping doen nie. Albei antwoorde slaag, so 'n leerder wat toets en stop, gee 'n onmoontlike blombedding in. In enige woordprobleem is die LAASTE toets altyd die storie: geen negatiewe lengtes nie, geen negatiewe massas nie, geen halwe mense nie.",
        } },
      ],
      esplain: {
        en: "Solving is the easy half. Square both sides, watch the middle term, collect into a quadratic and factorise, and out come one and five. Both of them genuinely satisfy the equation — put each one in and the two sides really do match — so the usual surd-equation test cannot separate them. That is what makes this a level 4. The separating has to be done by the situation. If x is one, the bed is one minus four, which is negative three metres wide, and no bed is minus three metres wide. So one goes, with that reason written down, because the question asks for the reason. Five leaves a bed one metre wide and four metres long, and four really is three more than one.", af: "Oplos is die maklike helfte. Kwadreer albei kante, hou die middelterm dop, versamel in 'n kwadratiese vergelyking en faktoriseer, en een en vyf kom uit. Albei voldoen werklik aan die vergelyking (sit elkeen in en die twee kante pas regtig), so die gewone toets vir wortelvormvergelykings kan hulle nie skei nie. Dit is wat dit 'n vlak 4 maak. Die situasie moet die skeiding doen. As x een is, is die bedding een minus vier, dit is negatief drie meter breed, en geen bedding is minus drie meter breed nie. So een val weg, met daardie rede neergeskryf, want die vraag vra die rede. Vyf gee 'n bedding een meter breed en vier meter lank, en vier is werklik drie meer as een.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q5 — THE EQUATION REBUILT FROM ITS ROOTS, THEN PUSHED (EQ p39 → B12).
   roots 4 and −6 ⟹ x² + 2x − 24 = 0 ⟹ p = 2, q = −24
   x² + 2x − 24 = k has equal roots ⟹ Δ = 100 + 4k = 0 ⟹ k = −25, x = −1
   --------------------------------------------------------------- */
const q5 = {
  id: "eqn.l4.q5",
  chapter: CH,
  topic: "level-4",
  archetype: "rebuild-the-equation-from-its-roots-then-find-k-for-equal-roots",
  paper: PAPER,
  lostQuest: { chapter: CH, quest: "eq8" },
  marks: 7,
  parts: [
    {
      id: "a",
      marks: 3,
      level: 3,
      prompt: {
        en: "The equation &nbsp;x² + px + q = 0 &nbsp;has roots 4 and −6.<br>Determine the values of p and q.", af: "Die vergelyking &nbsp;x² + px + q = 0 &nbsp;het wortels 4 en −6.<br>Bepaal die waardes van p en q.",
      },
      hint: {
        en: "Roots and factors are two ways of saying the same thing. If 4 is a root, which bracket must be a factor? Build the equation from its brackets and then multiply out.", af: "Wortels en faktore is twee maniere om dieselfde ding te sê. As 4 'n wortel is, watter hakie moet 'n faktor wees? Bou die vergelyking uit sy hakies en vermenigvuldig dan uit.",
      },
      memo: [
        { type: "step", text: { en: "If 4 and −6 are the roots, then (x − 4) and (x + 6) are the factors:", af: "As 4 en −6 die wortels is, dan is (x − 4) en (x + 6) die faktore:" } },
        { type: "step", text: { en: "(x − 4)(x + 6) = 0", af: "(x − 4)(x + 6) = 0" }, ticks: ["ca"] },
        { type: "step", text: { en: "x² + 6x − 4x − 24 = 0 &nbsp;&nbsp;⟹&nbsp;&nbsp; x² + 2x − 24 = 0", af: "x² + 6x − 4x − 24 = 0 &nbsp;&nbsp;⟹&nbsp;&nbsp; x² + 2x − 24 = 0" }, ticks: ["ca"] },
        { type: "answer", text: { en: "comparing with &nbsp;x² + px + q = 0: &nbsp;&nbsp;p = 2 &nbsp;&nbsp;and&nbsp;&nbsp; q = −24", af: "vergelyk met &nbsp;x² + px + q = 0: &nbsp;&nbsp;p = 2 &nbsp;&nbsp;en&nbsp;&nbsp; q = −24" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: the signs flip going from root to factor. A root of &nbsp;−6&nbsp; gives the factor &nbsp;(x + 6), not &nbsp;(x − 6). Check by putting the root back into your bracket — it must come out as zero.", af: "PASOP: die tekens draai om van wortel na faktor. 'n Wortel van &nbsp;−6&nbsp; gee die faktor &nbsp;(x + 6), nie &nbsp;(x − 6) nie. Toets deur die wortel terug in jou hakie te sit: dit moet nul gee.",
        } },
      ],
      esplain: {
        en: "This is the question she calls an exam favourite, and it runs backwards to the usual one. Normally you factorise to find the roots; here you are handed the roots and have to rebuild the equation. The link is that a root is the value that makes its bracket zero, so a root of four comes from the bracket x minus four, and a root of negative six comes from x plus six. Multiply the two brackets out and you have the equation itself, with everything in the right place. Reading p and q off it is then just a matter of comparing your line with the one in the question, term by term. Watch the sign on q — it is negative twenty four, not twenty four.", af: "Dit is die vraag wat sy 'n eksamengunsteling noem, en dit werk andersom as die gewone een. Gewoonlik faktoriseer jy om die wortels te kry; hier kry jy die wortels en moet jy die vergelyking herbou. Die skakel is dat 'n wortel die waarde is wat sy hakie nul maak, so 'n wortel van vier kom van die hakie x minus vier, en 'n wortel van negatief ses kom van x plus ses. Vermenigvuldig die twee hakies uit en jy het die vergelyking self, met alles op die regte plek. Om p en q daarvan af te lees, is dan net 'n kwessie van jou reël met die een in die vraag vergelyk, term vir term. Hou die teken van q dop: dit is negatief vier-en-twintig, nie vier-en-twintig nie.",
      },
    },
    {
      id: "b",
      marks: 4,
      level: 4,
      prompt: {
        en: "Hence determine the value of k for which &nbsp;x² + px + q = k &nbsp;has EQUAL roots, and write down that equal root.", af: "Bepaal gevolglik die waarde van k waarvoor &nbsp;x² + px + q = k &nbsp;GELYKE wortels het, en skryf daardie gelyke wortel neer.",
      },
      hint: {
        en: "You cannot read a, b and c off an equation that is not equal to zero yet — so move the k across first. Then “equal roots” tells you exactly what Δ has to be.", af: "Jy kan nie a, b en c aflees van 'n vergelyking wat nog nie gelyk aan nul is nie, so bring die k eers oor. Dan sê “gelyke wortels” vir jou presies wat Δ moet wees.",
      },
      memo: [
        { type: "step", text: { en: "Standard form first — the k must come across: &nbsp;&nbsp;x² + 2x − 24 = k &nbsp;&nbsp;⟹&nbsp;&nbsp; x² + 2x − (24 + k) = 0", af: "Eers standaardvorm, so die k moet oorkom: &nbsp;&nbsp;x² + 2x − 24 = k &nbsp;&nbsp;⟹&nbsp;&nbsp; x² + 2x − (24 + k) = 0" }, ticks: ["s/f"] },
        { type: "step", text: { en: "Δ = (2)² − 4(1)(−(24 + k)) = 4 + 96 + 4k = 100 + 4k", af: "Δ = (2)² − 4(1)(−(24 + k)) = 4 + 96 + 4k = 100 + 4k" }, ticks: ["ca"] },
        { type: "step", text: { en: "equal roots &nbsp;⟹&nbsp; Δ = 0: &nbsp;&nbsp;100 + 4k = 0 &nbsp;&nbsp;∴&nbsp; k = −25", af: "gelyke wortels &nbsp;⟹&nbsp; Δ = 0: &nbsp;&nbsp;100 + 4k = 0 &nbsp;&nbsp;∴&nbsp; k = −25" }, ticks: ["ca"] },
        { type: "answer", text: { en: "then the equation is &nbsp;x² + 2x + 1 = 0 &nbsp;⟹&nbsp; (x + 1)² = 0 &nbsp;&nbsp;∴&nbsp; the equal root is &nbsp;x = −1", af: "dan is die vergelyking &nbsp;x² + 2x + 1 = 0 &nbsp;⟹&nbsp; (x + 1)² = 0 &nbsp;&nbsp;∴&nbsp; die gelyke wortel is &nbsp;x = −1" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: reading &nbsp;c = −24&nbsp; straight off &nbsp;x² + 2x − 24 = k&nbsp; is the wreck. Nothing may be read off until the equation says &nbsp;= 0, and once the k crosses over, c becomes &nbsp;−(24 + k). Two negatives then meet inside Δ, which is why the 96 comes out positive.", af: "PASOP: om &nbsp;c = −24&nbsp; reguit van &nbsp;x² + 2x − 24 = k&nbsp; af te lees, is die ramp. Niks mag afgelees word voordat die vergelyking &nbsp;= 0 sê nie, en sodra die k oorkom, word c &nbsp;−(24 + k). Twee negatiewe ontmoet dan binne Δ, en dit is hoekom die 96 positief uitkom.",
        } },
      ],
      esplain: {
        en: "Two ideas have to be joined here, and neither one is hinted at. The first is that a, b and c only exist once an equation is written as something equals zero, so the k has to be carried across before anything else happens — and when it crosses, it joins the twenty four inside a single negative bracket. The second is that equal roots is the same statement as the discriminant being exactly zero. Substituting carefully gives one hundred plus four k, and setting that to zero gives k equal to negative twenty five. Putting it back turns the equation into x squared plus two x plus one, which is a perfect square, so both roots are negative one. Geometrically you have slid the parabola down until it just touches the axis.", af: "Twee idees moet hier saamgevoeg word, en nie een word aangedui nie. Die eerste is dat a, b en c eers bestaan sodra 'n vergelyking geskryf is as iets is gelyk aan nul, so die k moet oorgebring word voordat enigiets anders gebeur, en wanneer dit oorkom, sluit dit by die vier-en-twintig aan binne een negatiewe hakie. Die tweede is dat gelyke wortels dieselfde bewering is as dat die diskriminant presies nul is. Versigtige vervanging gee honderd plus vier k, en as jy dit gelyk aan nul stel, kry jy k gelyk aan negatief vyf-en-twintig. Sit dit terug en die vergelyking word x kwadraat plus twee x plus een, wat 'n volkome vierkant is, so albei wortels is negatief een. Meetkundig het jy die parabool afgeskuif totdat dit net-net aan die as raak.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q6 — A RATIONAL INEQUALITY (B9 into B8).
   (2x² − 5x − 3)/(x + 2)² ≥ 0 → 2x² − 5x − 3 ≥ 0 ; x ≠ −2
   → (2x + 1)(x − 3) ≥ 0 → x ≤ −1/2 or x ≥ 3 ; x ≠ −2
   --------------------------------------------------------------- */
const q6 = {
  id: "eqn.l4.q6",
  chapter: CH,
  topic: "level-4",
  archetype: "rational-inequality-with-an-always-positive-denominator",
  paper: PAPER,
  lostQuest: { chapter: CH, quest: "eq7" },
  marks: 6,
  parts: [
    {
      id: "a",
      marks: 2,
      level: 3,
      prompt: {
        en: `Consider the expression &nbsp;${Q6_EXPR}<br><br>Write down the value of x for which the expression is undefined, and explain why &nbsp;(x + 2)²&nbsp; can never be negative.`, af: `Beskou die uitdrukking &nbsp;${Q6_EXPR}<br><br>Skryf die waarde van x neer waarvoor die uitdrukking onbepaald is, en verduidelik waarom &nbsp;(x + 2)²&nbsp; nooit negatief kan wees nie.`,
      },
      hint: {
        en: "A fraction dies when its bottom becomes zero — that is the only value that has to be excluded. For the second half, think about what squaring does to a number, whichever sign it started with.", af: "'n Breuk gaan dood as sy onderste deel nul word: dit is die enigste waarde wat uitgesluit moet word. Vir die tweede helfte, dink aan wat kwadreer aan 'n getal doen, watter teken dit ook al gehad het.",
      },
      memo: [
        { type: "step", text: { en: "A fraction is undefined when its denominator is zero:", af: "'n Breuk is onbepaald as sy noemer nul is:" } },
        { type: "answer", text: { en: "(x + 2)² = 0 &nbsp;⟹&nbsp; x + 2 = 0 &nbsp;&nbsp;∴&nbsp; the expression is undefined at &nbsp;x = −2", af: "(x + 2)² = 0 &nbsp;⟹&nbsp; x + 2 = 0 &nbsp;&nbsp;∴&nbsp; die uitdrukking is onbepaald by &nbsp;x = −2" }, ticks: ["a"] },
        { type: "answer", text: { en: "(x + 2)² is a square, and no real number multiplied by itself gives a negative &nbsp;∴&nbsp; (x + 2)² &gt; 0 for every other value of x", af: "(x + 2)² is 'n kwadraat, en geen reële getal maal homself gee 'n negatief nie &nbsp;∴&nbsp; (x + 2)² &gt; 0 vir elke ander waarde van x" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: <b>undefined</b> is the right word for a zero denominator — she calls it the ghost under the bed. It is NOT “no solution” (that is for something like 3<sup>x</sup> = −1) and NOT “non-real” (that is for an even root of a negative).", af: "ONTHOU: <b>onbepaald</b> is die regte woord vir 'n noemer van nul; sy noem dit die spook onder die bed. Dit is NIE “geen oplossing” nie (dit is vir iets soos 3<sup>x</sup> = −1) en NIE “nie-reëel” nie (dit is vir 'n ewe wortel van 'n negatief).",
        } },
      ],
      esplain: {
        en: "Two small facts, and the whole of part (b) rests on them. The first is that a fraction has no value at all when its bottom is zero, because dividing by nothing is not a thing you can do. Setting the bottom to zero gives x equal to negative two, and that value has to be excluded from every answer that follows. The second is that a square can never be negative, whatever you started with: a positive times itself is positive, and a negative times itself is also positive. So apart from that one forbidden value, this denominator is always strictly positive. Being certain of its sign is what makes the next part possible, because a term whose sign you know cannot cause any trouble.", af: "Twee klein feite, en die hele deel (b) rus daarop. Die eerste is dat 'n breuk glad geen waarde het as sy onderste deel nul is nie, want deling deur niks is nie iets wat jy kan doen nie. As jy die onderste deel gelyk aan nul stel, kry jy x gelyk aan negatief twee, en daardie waarde moet uit elke antwoord wat volg, uitgesluit word. Die tweede is dat 'n kwadraat nooit negatief kan wees nie, waarmee jy ook al begin het: 'n positief maal homself is positief, en 'n negatief maal homself is ook positief. Behalwe vir daardie een verbode waarde is hierdie noemer dus altyd streng positief. Omdat jy seker is van sy teken, is die volgende deel moontlik, want 'n term waarvan jy die teken ken, kan geen moeilikheid veroorsaak nie.",
      },
    },
    {
      id: "b",
      marks: 4,
      level: 4,
      prompt: {
        en: `Hence solve for x: &nbsp;${Q6_EXPR} ≥ 0`, af: `Los gevolglik op vir x: &nbsp;${Q6_EXPR} ≥ 0`,
      },
      hint: {
        en: "You proved in (a) that the denominator is always positive. What does multiplying an inequality by something you KNOW is positive do to the inequality sign? Once you have used that, you are left with an ordinary quadratic inequality.", af: "Jy het in (a) bewys dat die noemer altyd positief is. Wat doen dit aan die ongelykheidsteken as jy 'n ongelykheid vermenigvuldig met iets wat jy WEET positief is? Sodra jy dit gebruik het, bly 'n gewone kwadratiese ongelykheid oor.",
      },
      memo: [
        { type: "step", text: { en: "From (a) the denominator is positive everywhere except at &nbsp;x = −2. Multiplying an inequality by a positive number leaves the sign alone, so the denominator can be dropped — as long as its limit rides along:", af: "Uit (a) is die noemer oral positief behalwe by &nbsp;x = −2. As jy 'n ongelykheid met 'n positiewe getal vermenigvuldig, bly die teken dieselfde, so die noemer kan weggelaat word, solank sy beperking saamry:" }, ticks: ["s/f"] },
        { type: "step", text: { en: "2x² − 5x − 3 ≥ 0 &nbsp;&nbsp;;&nbsp;&nbsp; x ≠ −2", af: "2x² − 5x − 3 ≥ 0 &nbsp;&nbsp;;&nbsp;&nbsp; x ≠ −2" }, ticks: ["ca"] },
        { type: "step", text: { en: "(2x + 1)(x − 3) ≥ 0 &nbsp;&nbsp;&nbsp;CP: &nbsp;x = −1/2 &nbsp;or&nbsp; x = 3", af: "(2x + 1)(x − 3) ≥ 0 &nbsp;&nbsp;&nbsp;kritieke waardes: &nbsp;x = −1/2 &nbsp;of&nbsp; x = 3" }, ticks: ["ca"] },
        { type: "answer", text: { en: "happy parabola, and the sign is ≥, so read OUTSIDE the bowl: &nbsp;&nbsp;∴&nbsp; x ≤ −1/2 &nbsp;&nbsp;or&nbsp;&nbsp; x ≥ 3 &nbsp;&nbsp;;&nbsp;&nbsp; x ≠ −2", af: "happy parabool, en die teken is ≥, so lees BUITE die bak: &nbsp;&nbsp;∴&nbsp; x ≤ −1/2 &nbsp;&nbsp;of&nbsp;&nbsp; x ≥ 3 &nbsp;&nbsp;;&nbsp;&nbsp; x ≠ −2" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: the limit is not decoration on this one. &nbsp;x = −2&nbsp; sits right inside &nbsp;x ≤ −1/2, so leaving &nbsp;; x ≠ −2&nbsp; off really does make the answer wrong — you would be claiming a value at which the expression does not exist. And never cross-multiply an inequality by a denominator whose sign you have not proved.", af: "PASOP: die beperking is nie versiering hier nie. &nbsp;x = −2&nbsp; lê reg binne &nbsp;x ≤ −1/2, so as jy &nbsp;; x ≠ −2&nbsp; weglaat, is die antwoord regtig verkeerd: jy sou 'n waarde insluit waar die uitdrukking nie bestaan nie. En moet nooit 'n ongelykheid kruisvermenigvuldig met 'n noemer waarvan jy die teken nie bewys het nie.",
        } },
      ],
      esplain: {
        en: "Everything turns on the fact you established in part (a): the bottom of this fraction is positive, always, except at the one forbidden value. A fraction with a positive bottom has the same sign as its top, so asking when the fraction is at least zero is the same as asking when the top is at least zero — and that is an ordinary quadratic inequality. Factorise it, set each factor to zero for the critical points, and picture the happy parabola cutting the axis at negative a half and at three. Since you want it above the axis, the answer is the two outside arms. The last move is the one that is always forgotten: carry the forbidden value along after a semicolon, because negative two really does sit inside one of those arms.", af: "Alles draai om die feit wat jy in deel (a) vasgestel het: die onderste deel van hierdie breuk is positief, altyd, behalwe by die een verbode waarde. 'n Breuk met 'n positiewe onderste deel het dieselfde teken as sy boonste deel, so om te vra wanneer die breuk minstens nul is, is dieselfde as om te vra wanneer die boonste deel minstens nul is, en dit is 'n gewone kwadratiese ongelykheid. Faktoriseer dit, stel elke faktor gelyk aan nul vir die kritieke waardes, en stel jou die happy parabool voor wat die as by negatief 'n half en by drie sny. Omdat jy dit bo die as wil hê, is die antwoord die twee buitenste arms. Die laaste stap is die een wat altyd vergeet word: dra die verbode waarde saam ná 'n kommapunt, want negatief twee lê regtig binne een van daardie arms.",
      },
    },
  ],
};

export const eqnLevel4Questions = [q1, q2, q3, q4, q5, q6];
