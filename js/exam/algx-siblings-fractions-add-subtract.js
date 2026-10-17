/* ============================================================
   EXAM FOCUS — Algebraic Expressions · SIBLING CARDS for the tile
   "fractions-add-subtract" (Algebraic fractions: + and −).
   (EXAM-BUILD-DAY.md, 2026-08-23, wave 1, session A.)
   ------------------------------------------------------------
   SIX cards, easiest first, levels 1 → 3. No level-4 part anywhere.

   WHAT THE SIX COVER (the brief's list):
     q1  LCD with MONOMIAL denominators (2x and 3x)
     q2  number denominators, then a denominator that is a power of
         another (x and x²)
     q3  BINOMIAL denominators, one of which must be FACTORISED first
     q4  a mixed “simplify” where one of the terms is a whole number
     q5  the negative-twin denominator — (x − 3) against (3 − x)
     q6  THREE terms, with the third denominator factorising into the
         other two

   HER METHOD, from METHODS-algebra.md Part B2, which she calls "the
   most consistently laid-out method in the whole book":
     1. factorise every denominator FIRST;
     2. write `LCD = …` with `limits: x ≠ …` beside it, before
        anything else happens;
     3. rewrite every term over its denominator — a whole number gets
        denominator 1;
     4. write the multiplier ×(…) each term needs to reach the LCD;
     5. combine over the single denominator, then simplify the top.

   ⚠️ ONE DELIBERATE DIFFERENCE FROM HER B2 PAGE. B2 is about
   EQUATIONS, where the denominators may be multiplied away. These are
   EXPRESSIONS: there is no equals sign, so the denominator STAYS. That
   confusion is the single biggest source of lost marks on this topic,
   so it is written into the trap cards rather than left to chance.

   HER WORDS: **limits** (the restrictions), **undefined** (denominator
   equal to zero — the right one of her four "no answer" words), and
   **caged** (a + or − is only safe to cancel once it is inside a
   bracket). Every number is fresh.

   NO DIAGRAMS. lostQuest is the documented exam-only placeholder (see
   js/exam/algx-siblings-expand.js's header for the mechanism).
   ============================================================ */

const PAPER = "siblings";
const CH = "algx";
const LOST = { chapter: CH, quest: "PENDING-algx-is-exam-only-no-drill-round" };

const sf = (n, d) => `<span class="sfrac"><span class="sf-n">${n}</span><span class="sf-d">${d}</span></span>`;

/* ---------------------------------------------------------------
   q1 — MONOMIAL DENOMINATORS.  3/(2x) + 5/(3x) = 19/(6x),  x ≠ 0
   --------------------------------------------------------------- */
const q1 = {
  id: "algx.sib.fas.q1",
  chapter: CH,
  topic: "fractions-add-subtract",
  archetype: "gr10-add-algebraic-fractions-monomial-denominators",
  paper: PAPER,
  lostQuest: LOST,
  marks: 4,
  parts: [
    {
      id: "a",
      marks: 1,
      level: 1,
      prompt: {
        en: `Consider the expression &nbsp;${sf("3", "2x")} &nbsp;+&nbsp; ${sf("5", "3x")}<br><br>Write down the value of x for which the expression is <b>undefined</b>.`, af: `Beskou die uitdrukking &nbsp;${sf("3", "2x")} &nbsp;+&nbsp; ${sf("5", "3x")}<br><br>Skryf die waarde van x neer waarvoor die uitdrukking <b>onbepaald</b> is.`,
      },
      hint: {
        en: "Look at what is on the bottom of each fraction and ask what would make it zero. The 2 and the 3 can never be zero, so only one thing can.", af: "Kyk wat onder in elke breuk staan en vra wat dit nul sal maak. Die 2 en die 3 kan nooit nul wees nie, so net een ding kan.",
      },
      memo: [
        { type: "step", text: { en: "2x = 0&nbsp; and&nbsp; 3x = 0&nbsp; both happen at the same place.", af: "2x = 0&nbsp; en&nbsp; 3x = 0&nbsp; gebeur albei by dieselfde plek." } },
        { type: "answer", text: { en: "∴&nbsp; x = 0", af: "∴&nbsp; x = 0" }, ticks: ["a"] },
      ],
      esplain: {
        en: "Every fraction in the expression has to exist, so every denominator gets checked. Here both of them contain an x multiplied by a number, and a product is only zero when one of its factors is zero. The 2 and the 3 are never zero, so the only thing that can break either fraction is the x itself. That gives one forbidden value, x equals zero, and it happens to break both fractions at once. Write it down before you start working, because in a moment the denominators will be replaced by a single one and it will be harder to see where the danger was.", af: "Elke breuk in die uitdrukking moet bestaan, so elke noemer word nagegaan. Hier bevat albei 'n x wat met 'n getal vermenigvuldig is, en 'n produk is net nul as een van sy faktore nul is. Die 2 en die 3 is nooit nul nie, so die enigste ding wat enige van die breuke kan breek, is die x self. Dit gee een verbode waarde, x is gelyk aan nul, en dit breek toevallig albei breuke tegelyk. Skryf dit neer voordat jy begin werk, want netnou word die noemers deur 'n enkele een vervang, en dan is dit moeiliker om te sien waar die gevaar was.",
      },
    },
    {
      id: "b",
      marks: 3,
      level: 1,
      prompt: {
        en: "Simplify the expression.", af: "Vereenvoudig die uitdrukking.",
      },
      hint: {
        en: "Find the lowest common denominator the same way you would with plain numbers, and then ask what each fraction has to be multiplied by to get there. Multiply the top by the same thing.", af: "Vind die KGV op dieselfde manier as met gewone getalle, en vra dan waarmee elke breuk vermenigvuldig moet word om daar te kom. Vermenigvuldig die bokant met dieselfde ding.",
      },
      memo: [
        { type: "step", text: { en: "LCD = 6x&nbsp;&nbsp;&nbsp;&nbsp;limits: &nbsp;x ≠ 0", af: "KGV = 6x&nbsp;&nbsp;&nbsp;&nbsp;beperkings: &nbsp;x ≠ 0" }, ticks: ["s/f"] },
        { type: "step", text: { en: `The first term needs ×3 and the second needs ×2: &nbsp;= ${sf("9", "6x")} + ${sf("10", "6x")}`, af: `Die eerste term het ×3 nodig en die tweede ×2: &nbsp;= ${sf("9", "6x")} + ${sf("10", "6x")}` }, ticks: ["ca"] },
        { type: "answer", text: { en: `∴&nbsp; ${sf("19", "6x")}&nbsp;&nbsp;&nbsp;(x ≠ 0)`, af: `∴&nbsp; ${sf("19", "6x")}&nbsp;&nbsp;&nbsp;(x ≠ 0)` }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: there is no equals sign here, so the denominator does NOT go away. This is an expression, not an equation — you may not multiply both sides by 6x, because there are no sides.", af: "PASOP: hier is geen gelykaanteken nie, so die noemer gaan NIE weg nie. Dit is 'n uitdrukking, nie 'n vergelyking nie: jy mag nie albei kante met 6x vermenigvuldig nie, want daar is geen kante nie.",
        } },
      ],
      esplain: {
        en: "Adding algebraic fractions is exactly adding ordinary fractions, letters included. You cannot add halves to thirds until they are both sixths, and you cannot add these until both are sixths of x. The lowest common denominator is the smallest thing both bottoms divide into: 6 for the numbers, and one x, so 6x. Now ask what each fraction was multiplied by to get there. The first bottom went from 2x to 6x, which is times three, so its top goes times three too. The second went times two. Nine plus ten is nineteen, and the bottom stays 6x. The x on the bottom never cancels with anything.", af: "Om algebraïese breuke op te tel, is presies dieselfde as om gewone breuke op te tel, letters en al. Jy kan nie halwes by derdes tel voordat albei sesdes is nie, en jy kan hierdie nie optel voordat albei sesdes van x is nie. Die KGV is die kleinste ding waarin albei onderkante deel: 6 vir die getalle, en een x, dus 6x. Vra nou waarmee elke breuk vermenigvuldig is om daar te kom. Die eerste onderkant het van 2x na 6x gegaan, dit is maal drie, so sy bokant gaan ook maal drie. Die tweede het maal twee gegaan. Nege plus tien is negentien, en die onderkant bly 6x. Die x onder kanselleer nooit met enigiets nie.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q2 — NUMBER DENOMINATORS, THEN x AND x².
   (a) (x + 2)/3 − (x − 4)/4 = (x + 20)/12
   (b) 2/x + 3/x²            = (2x + 3)/x²,  x ≠ 0
   --------------------------------------------------------------- */
const q2 = {
  id: "algx.sib.fas.q2",
  chapter: CH,
  topic: "fractions-add-subtract",
  archetype: "gr10-subtract-fractions-number-denominators-and-powers-of-x",
  paper: PAPER,
  lostQuest: LOST,
  marks: 5,
  parts: [
    {
      id: "a",
      marks: 3,
      level: 1,
      prompt: {
        en: `Simplify each of the following.<br><br>${sf("x + 2", "3")} &nbsp;−&nbsp; ${sf("x − 4", "4")}`, af: `Vereenvoudig elk van die volgende.<br><br>${sf("x + 2", "3")} &nbsp;−&nbsp; ${sf("x − 4", "4")}`,
      },
      hint: {
        en: "The bottoms are just numbers, so the common denominator is easy. Keep each numerator inside a bracket when you multiply it up — especially the one that is being subtracted.", af: "Die onderkante is net getalle, so die gemene noemer is maklik. Hou elke teller in 'n hakie as jy dit vermenigvuldig, veral die een wat afgetrek word.",
      },
      memo: [
        { type: "step", text: { en: `LCD = 12: &nbsp;= ${sf("4(x + 2)", "12")} − ${sf("3(x − 4)", "12")}`, af: `KGV = 12: &nbsp;= ${sf("4(x + 2)", "12")} − ${sf("3(x − 4)", "12")}` }, ticks: ["s/f"] },
        { type: "step", text: { en: `= ${sf("4x + 8 − 3x + 12", "12")}`, af: `= ${sf("4x + 8 − 3x + 12", "12")}` }, ticks: ["ca"] },
        { type: "answer", text: { en: `∴&nbsp; ${sf("x + 20", "12")}`, af: `∴&nbsp; ${sf("x + 20", "12")}` }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: the minus in the middle belongs to the WHOLE second numerator. − 3(x − 4) is −3x + 12, so the +12 is a plus. Forgetting to <b>cage</b> that numerator in a bracket before subtracting is how this question is usually lost.", af: "PASOP: die minus in die middel behoort aan die HELE tweede teller. − 3(x − 4) is −3x + 12, so die +12 is 'n plus. As jy vergeet om daardie teller in 'n hakie <b>vas te keer</b> voordat jy aftrek, verloor jy gewoonlik hierdie vraag.",
        } },
      ],
      esplain: {
        en: "There is no x on any bottom here, so there are no forbidden values at all and no limits line to write — a rare, restful moment on this tile. The lowest common denominator of 3 and 4 is 12. The first fraction is multiplied top and bottom by 4, the second by 3. Now the important bit: each numerator is more than one term, so it must travel inside a bracket, and the minus sitting in front of the second fraction has to reach every term in it. Minus three times x is minus three x, and minus three times minus four is plus twelve. Collect and you get x plus twenty over twelve, which will not simplify further.", af: "Hier is daar geen x in enige onderkant nie, so daar is glad geen verbode waardes nie en geen reël met beperkings om te skryf nie: 'n seldsame, rustige oomblik op hierdie teël. Die KGV van 3 en 4 is 12. Die eerste breuk word bo en onder met 4 vermenigvuldig, die tweede met 3. Nou die belangrike deel: elke teller is meer as een term, so dit moet in 'n hakie bly, en die minus voor die tweede breuk moet elke term daarin bereik. Minus drie maal x is minus drie x, en minus drie maal minus vier is plus twaalf. Versamel, en jy kry x plus twintig oor twaalf, wat nie verder vereenvoudig nie.",
      },
    },
    {
      id: "b",
      marks: 2,
      level: 1,
      prompt: {
        en: `${sf("2", "x")} &nbsp;+&nbsp; ${sf("3", "x²")}&nbsp;&nbsp;&nbsp;(x ≠ 0)`, af: `${sf("2", "x")} &nbsp;+&nbsp; ${sf("3", "x²")}&nbsp;&nbsp;&nbsp;(x ≠ 0)`,
      },
      hint: {
        en: "One bottom already divides into the other, so you do not need to multiply them together — the bigger one IS the common denominator.", af: "Die een onderkant deel reeds in die ander, so jy hoef hulle nie met mekaar te vermenigvuldig nie: die groter een IS die gemene noemer.",
      },
      memo: [
        { type: "step", text: { en: `LCD = x²&nbsp;&nbsp;&nbsp;&nbsp;limits: &nbsp;x ≠ 0. &nbsp;Only the first term needs multiplying, by x: &nbsp;= ${sf("2x", "x²")} + ${sf("3", "x²")}`, af: `KGV = x²&nbsp;&nbsp;&nbsp;&nbsp;beperkings: &nbsp;x ≠ 0. &nbsp;Net die eerste term moet vermenigvuldig word, met x: &nbsp;= ${sf("2x", "x²")} + ${sf("3", "x²")}` }, ticks: ["ca"] },
        { type: "answer", text: { en: `∴&nbsp; ${sf("2x + 3", "x²")}&nbsp;&nbsp;&nbsp;(x ≠ 0)`, af: `∴&nbsp; ${sf("2x + 3", "x²")}&nbsp;&nbsp;&nbsp;(x ≠ 0)` }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: 2x + 3 over x² does not simplify any further. You cannot cancel the x on top with an x on the bottom, because the + is not <b>caged</b> — the top is a sum, not a product.", af: "ONTHOU: 2x + 3 oor x² vereenvoudig nie verder nie. Jy kan nie die x bo met 'n x onder kanselleer nie, want die + is nie <b>vasgekeer</b> nie: die bokant is 'n som, nie 'n produk nie.",
        } },
      ],
      esplain: {
        en: "The lowest common denominator is the smallest expression both bottoms divide into, and sometimes one of the bottoms already is it. Here x divides into x squared, so x squared is the LCD and the second fraction does not have to change at all. Only the first one is multiplied top and bottom by x, turning 2 over x into 2x over x squared. Add the tops and you are finished. Resist the urge to cancel afterwards: an x on top of a plus sign is stuck there. Cancelling is dividing, and you can only divide the whole top, not one piece of it.", af: "Die KGV is die kleinste uitdrukking waarin albei onderkante deel, en soms is een van die onderkante dit reeds. Hier deel x in x kwadraat, so x kwadraat is die KGV en die tweede breuk hoef glad nie te verander nie. Net die eerste een word bo en onder met x vermenigvuldig, en 2 oor x word 2x oor x kwadraat. Tel die bokante op en jy is klaar. Weerstaan die drang om daarna te kanselleer: 'n x in 'n bokant met 'n plusteken sit vas. Kanselleer is deel, en jy kan net die hele bokant deel, nie een stuk daarvan nie.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q3 — BINOMIAL DENOMINATORS, ONE FACTORISED FIRST.
   4/(x − 3) − 2/(x² − 9) = (4x + 10)/((x − 3)(x + 3)),  x ≠ 3, x ≠ −3
   --------------------------------------------------------------- */
const q3 = {
  id: "algx.sib.fas.q3",
  chapter: CH,
  topic: "fractions-add-subtract",
  archetype: "gr10-subtract-fractions-binomial-denominators-one-factorised-first",
  paper: PAPER,
  lostQuest: LOST,
  marks: 5,
  parts: [
    {
      id: "a",
      marks: 2,
      level: 2,
      prompt: {
        en: `Consider the expression &nbsp;${sf("4", "x − 3")} &nbsp;−&nbsp; ${sf("2", "x² − 9")}<br><br>Write down the values of x for which the expression is <b>undefined</b>.`, af: `Beskou die uitdrukking &nbsp;${sf("4", "x − 3")} &nbsp;−&nbsp; ${sf("2", "x² − 9")}<br><br>Skryf die waardes van x neer waarvoor die uitdrukking <b>onbepaald</b> is.`,
      },
      hint: {
        en: "The second denominator hides more than it shows. Factorise it before you decide what is forbidden.", af: "Die tweede noemer steek meer weg as wat dit wys. Faktoriseer dit voordat jy besluit wat verbode is.",
      },
      memo: [
        { type: "step", text: { en: "x² − 9 = (x − 3)(x + 3) &nbsp;— a difference of two squares", af: "x² − 9 = (x − 3)(x + 3), &nbsp;'n verskil van twee vierkante" }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴&nbsp; x = 3&nbsp; or&nbsp; x = −3", af: "∴&nbsp; x = 3&nbsp; of&nbsp; x = −3" }, ticks: ["a"] },
      ],
      esplain: {
        en: "Always factorise a denominator before you decide what breaks it, because a factorised bottom shows every danger at once. The first fraction only warns you about x equals three. The second one looks like a single expression but is really two brackets multiplied together, so it breaks at three and again at minus three. Take the two lists together and throw out any repeats. Notice that this factorising is not extra work — it is the same factorising you need in a moment to find the lowest common denominator, so doing it here saves time later.", af: "Faktoriseer altyd 'n noemer voordat jy besluit wat dit breek, want 'n gefaktoriseerde onderkant wys elke gevaar tegelyk. Die eerste breuk waarsku jou net oor x is gelyk aan drie. Die tweede een lyk soos 'n enkele uitdrukking, maar is eintlik twee hakies wat met mekaar vermenigvuldig word, so dit breek by drie en weer by minus drie. Neem die twee lyste saam en gooi enige herhalings uit. Let op dat hierdie faktorisering nie ekstra werk is nie: dit is dieselfde faktorisering wat jy netnou nodig het om die KGV te vind, so as jy dit hier doen, spaar jy later tyd.",
      },
    },
    {
      id: "b",
      marks: 3,
      level: 2,
      prompt: {
        en: "Simplify the expression.", af: "Vereenvoudig die uitdrukking.",
      },
      hint: {
        en: "Once the second bottom is factorised you can see that it already contains the first bottom — so the LCD is the factorised one. Only the first fraction has to be multiplied up.", af: "Sodra die tweede onderkant gefaktoriseer is, kan jy sien dat dit reeds die eerste onderkant bevat, so die KGV is die gefaktoriseerde een. Net die eerste breuk moet vermenigvuldig word.",
      },
      memo: [
        { type: "step", text: { en: "LCD = (x − 3)(x + 3)&nbsp;&nbsp;&nbsp;&nbsp;limits: &nbsp;x ≠ 3, &nbsp;x ≠ −3", af: "KGV = (x − 3)(x + 3)&nbsp;&nbsp;&nbsp;&nbsp;beperkings: &nbsp;x ≠ 3, &nbsp;x ≠ −3" }, ticks: ["s/f"] },
        { type: "step", text: { en: `The first term needs ×(x + 3): &nbsp;= ${sf("4(x + 3) − 2", "(x − 3)(x + 3)")} = ${sf("4x + 12 − 2", "(x − 3)(x + 3)")}`, af: `Die eerste term het ×(x + 3) nodig: &nbsp;= ${sf("4(x + 3) − 2", "(x − 3)(x + 3)")} = ${sf("4x + 12 − 2", "(x − 3)(x + 3)")}` }, ticks: ["ca"] },
        { type: "answer", text: { en: `∴&nbsp; ${sf("4x + 10", "(x − 3)(x + 3)")}&nbsp;&nbsp;&nbsp;(x ≠ ±3)`, af: `∴&nbsp; ${sf("4x + 10", "(x − 3)(x + 3)")}&nbsp;&nbsp;&nbsp;(x ≠ ±3)` }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: leave the bottom in its factorised form. Multiplying it back out to x² − 9 is not wrong, but it makes it impossible to see whether anything cancels — and it is the factorised form a marker is looking for.", af: "ONTHOU: los die onderkant in sy gefaktoriseerde vorm. Om dit weer uit te vermenigvuldig na x² − 9 is nie verkeerd nie, maar dan kan jy nie sien of iets kanselleer nie, en 'n nasiener soek juis na die gefaktoriseerde vorm.",
        } },
      ],
      esplain: {
        en: "Factorising the second denominator does two jobs at once. It tells you the forbidden values, and it shows you that this bottom already contains the other bottom inside it. So there is no need to multiply the two denominators together; the bigger one is already the lowest common denominator. Only the first fraction has to change, and it needs the missing bracket, x plus three, on top and bottom. After that it is ordinary tidying: four times x plus three is four x plus twelve, then take away the two. The top will not factorise into anything the bottom contains, so four x plus ten over the two brackets is the finished answer.", af: "Faktorisering van die tweede noemer doen twee werke tegelyk. Dit gee vir jou die verbode waardes, en dit wys vir jou dat hierdie onderkant reeds die ander onderkant in hom bevat. Dus hoef jy nie die twee noemers met mekaar te vermenigvuldig nie; die groter een is reeds die KGV. Net die eerste breuk moet verander, en dit het die ontbrekende hakie, x plus drie, bo en onder nodig. Daarna is dit gewone netjiesmaak: vier maal x plus drie is vier x plus twaalf, trek dan die twee af. Die bokant faktoriseer nie in iets wat die onderkant bevat nie, so vier x plus tien oor die twee hakies is die finale antwoord.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q4 — A WHOLE NUMBER IN THE MIX.
   (a) 1 + 5/(x + 2)  = (x + 7)/(x + 2),  x ≠ −2
   (b) 3 − 2x/(x − 4) = (x − 12)/(x − 4),  x ≠ 4
   --------------------------------------------------------------- */
const q4 = {
  id: "algx.sib.fas.q4",
  chapter: CH,
  topic: "fractions-add-subtract",
  archetype: "gr10-combine-a-whole-number-with-an-algebraic-fraction",
  paper: PAPER,
  lostQuest: LOST,
  marks: 5,
  parts: [
    {
      id: "a",
      marks: 2,
      level: 1,
      prompt: {
        en: `Simplify each of the following, writing your answer as a single fraction.<br><br>1 &nbsp;+&nbsp; ${sf("5", "x + 2")}&nbsp;&nbsp;&nbsp;(x ≠ −2)`, af: `Vereenvoudig elk van die volgende en skryf jou antwoord as 'n enkele breuk.<br><br>1 &nbsp;+&nbsp; ${sf("5", "x + 2")}&nbsp;&nbsp;&nbsp;(x ≠ −2)`,
      },
      hint: {
        en: "A whole number is a fraction too — it is sitting over 1. Once you write it that way, the usual LCD method takes over.", af: "'n Heelgetal is ook 'n breuk: dit sit oor 1. Sodra jy dit so skryf, neem die gewone KGV-metode oor.",
      },
      memo: [
        { type: "step", text: { en: `Write the whole number over 1, so the LCD is (x + 2): &nbsp;= ${sf("x + 2", "x + 2")} + ${sf("5", "x + 2")}`, af: `Skryf die heelgetal oor 1, dan is die KGV (x + 2): &nbsp;= ${sf("x + 2", "x + 2")} + ${sf("5", "x + 2")}` }, ticks: ["ca"] },
        { type: "answer", text: { en: `∴&nbsp; ${sf("x + 7", "x + 2")}&nbsp;&nbsp;&nbsp;(x ≠ −2)`, af: `∴&nbsp; ${sf("x + 7", "x + 2")}&nbsp;&nbsp;&nbsp;(x ≠ −2)` }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: the x + 7 on top has nothing in common with the x + 2 on the bottom, so nothing cancels. Crossing out the two x's is the classic slip — a + between them means they are not factors.", af: "PASOP: die x + 7 bo het niks gemeen met die x + 2 onder nie, so niks kanselleer nie. Om die twee x'e deur te streep, is die klassieke fout: 'n + tussen hulle beteken hulle is nie faktore nie.",
        } },
      ],
      esplain: {
        en: "The only thing that makes this look strange is that one of the terms has no fraction bar. Give it one. Any number can be written over 1 without changing it, so the 1 becomes 1 over 1, and now you have two fractions to combine in the ordinary way. The lowest common denominator is x plus 2, so the first fraction is multiplied top and bottom by x plus 2 and becomes x plus 2 over x plus 2. Add the tops: x plus 2 plus 5 is x plus 7. Look at the answer once more and resist cancelling — the top and the bottom are sums, and sums have no factors to cross out.", af: "Die enigste ding wat dit vreemd laat lyk, is dat een van die terme geen breukstreep het nie. Gee vir hom een. Enige getal kan oor 1 geskryf word sonder om dit te verander, so die 1 word 1 oor 1, en nou het jy twee breuke om op die gewone manier saam te voeg. Die KGV is x plus 2, so die eerste breuk word bo en onder met x plus 2 vermenigvuldig en word x plus 2 oor x plus 2. Tel die bokante op: x plus 2 plus 5 is x plus 7. Kyk weer na die antwoord en weerstaan die drang om te kanselleer: die bokant en die onderkant is somme, en somme het geen faktore om deur te streep nie.",
      },
    },
    {
      id: "b",
      marks: 3,
      level: 2,
      prompt: {
        en: `3 &nbsp;−&nbsp; ${sf("2x", "x − 4")}&nbsp;&nbsp;&nbsp;(x ≠ 4)`, af: `3 &nbsp;−&nbsp; ${sf("2x", "x − 4")}&nbsp;&nbsp;&nbsp;(x ≠ 4)`,
      },
      hint: {
        en: "Same idea, but there is a minus this time. Put the 3 over 1, multiply it up, and keep the second numerator inside a bracket so the minus reaches all of it.", af: "Dieselfde idee, maar hierdie keer is daar 'n minus. Sit die 3 oor 1, vermenigvuldig dit, en hou die tweede teller in 'n hakie sodat die minus alles daarin bereik.",
      },
      memo: [
        { type: "step", text: { en: "LCD = (x − 4)&nbsp;&nbsp;&nbsp;&nbsp;limits: &nbsp;x ≠ 4", af: "KGV = (x − 4)&nbsp;&nbsp;&nbsp;&nbsp;beperkings: &nbsp;x ≠ 4" }, ticks: ["s/f"] },
        { type: "step", text: { en: `= ${sf("3(x − 4) − 2x", "x − 4")} = ${sf("3x − 12 − 2x", "x − 4")}`, af: `= ${sf("3(x − 4) − 2x", "x − 4")} = ${sf("3x − 12 − 2x", "x − 4")}` }, ticks: ["ca"] },
        { type: "answer", text: { en: `∴&nbsp; ${sf("x − 12", "x − 4")}&nbsp;&nbsp;&nbsp;(x ≠ 4)`, af: `∴&nbsp; ${sf("x − 12", "x − 4")}&nbsp;&nbsp;&nbsp;(x ≠ 4)` }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: 3 becomes 3(x − 4), not 3x − 4. The whole number is multiplied by the whole bracket. And the answer does not simplify — x − 12 over x − 4 is as far as it goes.", af: "ONTHOU: 3 word 3(x − 4), nie 3x − 4 nie. Die heelgetal word met die hele hakie vermenigvuldig. En die antwoord vereenvoudig nie: x − 12 oor x − 4 is so ver as wat dit gaan.",
        } },
      ],
      esplain: {
        en: "Two easy things to get wrong live in this one line. The first is what happens to the 3: it goes over 1, and to reach the common denominator it is multiplied by the whole bracket x minus 4, giving 3x minus 12. Multiplying only the x is the commonest error. The second is the minus in the middle, which belongs to the two x that follows it, so the top reads 3x minus 12 minus 2x. Collect the x terms and you are left with x minus 12 over x minus 4. Those two look similar enough to tempt you into cancelling the x's, but they are sums, not products, so nothing moves.", af: "In hierdie een reël lê twee dinge wat maklik verkeerd gaan. Die eerste is wat met die 3 gebeur: dit gaan oor 1, en om die gemene noemer te bereik, word dit met die hele hakie x minus 4 vermenigvuldig, wat 3x minus 12 gee. Om net die x te vermenigvuldig, is die algemeenste fout. Die tweede is die minus in die middel, wat aan die twee x daarna behoort, so die bokant lees 3x minus 12 minus 2x. Versamel die x-terme en jy bly met x minus 12 oor x minus 4. Daardie twee lyk genoeg eenders om jou te laat kanselleer, maar hulle is somme, nie produkte nie, so niks val weg nie.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q5 — THE NEGATIVE-TWIN DENOMINATOR.
   (x + 1)/(x − 3) + 2x/(3 − x) = (1 − x)/(x − 3),  x ≠ 3
   --------------------------------------------------------------- */
const q5 = {
  id: "algx.sib.fas.q5",
  chapter: CH,
  topic: "fractions-add-subtract",
  archetype: "gr10-add-fractions-with-negative-twin-denominators",
  paper: PAPER,
  lostQuest: LOST,
  marks: 4,
  parts: [
    {
      id: "a",
      marks: 1,
      level: 1,
      prompt: {
        en: `Consider the expression &nbsp;${sf("x + 1", "x − 3")} &nbsp;+&nbsp; ${sf("2x", "3 − x")}<br><br>Write down the value of x for which the expression is <b>undefined</b>.`, af: `Beskou die uitdrukking &nbsp;${sf("x + 1", "x − 3")} &nbsp;+&nbsp; ${sf("2x", "3 − x")}<br><br>Skryf die waarde van x neer waarvoor die uitdrukking <b>onbepaald</b> is.`,
      },
      hint: {
        en: "The two denominators look different but they break at the same place. Set each of them equal to zero and see.", af: "Die twee noemers lyk verskillend, maar hulle breek by dieselfde plek. Stel elkeen gelyk aan nul en kyk.",
      },
      memo: [
        { type: "step", text: { en: "x − 3 = 0 &nbsp;⟹&nbsp; x = 3, &nbsp;and&nbsp; 3 − x = 0 &nbsp;⟹&nbsp; x = 3 as well.", af: "x − 3 = 0 &nbsp;⟹&nbsp; x = 3, &nbsp;en&nbsp; 3 − x = 0 &nbsp;⟹&nbsp; ook x = 3." } },
        { type: "answer", text: { en: "∴&nbsp; x = 3", af: "∴&nbsp; x = 3" }, ticks: ["a"] },
      ],
      esplain: {
        en: "Two different-looking bottoms, one forbidden value. That is your first clue that these denominators are related. x minus 3 is zero when x is 3, and 3 minus x is zero at exactly the same place, because subtracting in the other order does not change where the answer is zero — it only changes the sign everywhere else. So there is a single restriction, x not equal to 3. Spotting that the two bottoms break together is worth doing consciously, because it is the same fact you are about to use to combine them.", af: "Twee onderkante wat verskillend lyk, een verbode waarde. Dit is jou eerste leidraad dat hierdie noemers verwant is. x minus 3 is nul as x 3 is, en 3 minus x is nul by presies dieselfde plek, want as jy in die ander volgorde aftrek, verander dit nie waar die antwoord nul is nie: dit verander net die teken oral anders. Daar is dus net een beperking, x is nie gelyk aan 3 nie. Dit is die moeite werd om doelbewus raak te sien dat die twee onderkante saam breek, want dit is dieselfde feit wat jy netnou gaan gebruik om hulle saam te voeg.",
      },
    },
    {
      id: "b",
      marks: 3,
      level: 3,
      prompt: {
        en: "Simplify the expression.", af: "Vereenvoudig die uitdrukking.",
      },
      hint: {
        en: "Do not multiply the two bottoms together — they are twins with the signs swapped. Change one of them into the other by taking out a −1, and you will only need one denominator.", af: "Moenie die twee onderkante met mekaar vermenigvuldig nie: hulle is 'n tweeling met die tekens omgeruil. Verander die een in die ander deur 'n −1 uit te haal, en jy het net een noemer nodig.",
      },
      memo: [
        { type: "step", text: { en: "(3 − x) is the reverse of (x − 3), so &nbsp;3 − x = −(x − 3). &nbsp;A minus on the bottom may be written in front of the fraction.", af: "(3 − x) is (x − 3) agterstevoor, so &nbsp;3 − x = −(x − 3). &nbsp;'n Minus onder mag voor die breuk geskryf word." }, ticks: ["s/f"] },
        { type: "step", text: { en: `= ${sf("x + 1", "x − 3")} − ${sf("2x", "x − 3")} = ${sf("x + 1 − 2x", "x − 3")}`, af: `= ${sf("x + 1", "x − 3")} − ${sf("2x", "x − 3")} = ${sf("x + 1 − 2x", "x − 3")}` }, ticks: ["ca"] },
        { type: "answer", text: { en: `∴&nbsp; ${sf("1 − x", "x − 3")}&nbsp;&nbsp;&nbsp;(x ≠ 3)`, af: `∴&nbsp; ${sf("1 − x", "x − 3")}&nbsp;&nbsp;&nbsp;(x ≠ 3)` }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: multiplying the two bottoms together gives an LCD of (x − 3)(3 − x), which is legal but doubles the work and hides the twin. And when you flip the second denominator the PLUS in the middle becomes a MINUS — that sign change is the mark.", af: "PASOP: as jy die twee onderkante met mekaar vermenigvuldig, kry jy 'n KGV van (x − 3)(3 − x), wat toegelaat word, maar die werk verdubbel en die tweeling wegsteek. En as jy die tweede noemer omdraai, word die PLUS in die middel 'n MINUS: daardie tekenverandering is die punt.",
        } },
      ],
      esplain: {
        en: "Whenever you meet two bottoms that are the same two things in the opposite order, stop before you find an LCD. They are only a minus apart: 3 minus x is exactly minus the bracket x minus 3. So the second fraction can be rewritten with the same bottom as the first, provided a minus sign moves out in front of it. The plus between the two fractions then becomes a minus. After that both fractions share the denominator x minus 3 and you simply combine the tops: x plus 1 minus 2x is 1 minus x. You may also write it as minus x minus 1 over x minus 3; both are accepted.", af: "Wanneer jy twee onderkante kry wat dieselfde twee dinge in die teenoorgestelde volgorde is, stop voordat jy 'n KGV soek. Hulle is net 'n minus van mekaar af: 3 minus x is presies minus die hakie x minus 3. Die tweede breuk kan dus met dieselfde onderkant as die eerste geskryf word, mits 'n minusteken voor die breuk kom. Die plus tussen die twee breuke word dan 'n minus. Daarna deel albei breuke die noemer x minus 3 en voeg jy eenvoudig die bokante saam: x plus 1 minus 2x is 1 minus x. Jy mag dit ook as minus x minus 1 oor x minus 3 skryf; albei word aanvaar.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q6 — THREE TERMS, THE THIRD DENOMINATOR CONTAINING THE OTHER TWO.
   2/(x + 2) + 3/(x − 2) − 12/(x² − 4) = 5/(x + 2),  x ≠ ±2
   --------------------------------------------------------------- */
const q6 = {
  id: "algx.sib.fas.q6",
  chapter: CH,
  topic: "fractions-add-subtract",
  archetype: "gr10-three-term-algebraic-fraction-sum-with-a-factorising-denominator",
  paper: PAPER,
  lostQuest: LOST,
  marks: 6,
  parts: [
    {
      id: "a",
      marks: 2,
      level: 2,
      prompt: {
        en: `Consider the expression &nbsp;${sf("2", "x + 2")} &nbsp;+&nbsp; ${sf("3", "x − 2")} &nbsp;−&nbsp; ${sf("12", "x² − 4")}<br><br>Write down the values of x for which the expression is <b>undefined</b>.`, af: `Beskou die uitdrukking &nbsp;${sf("2", "x + 2")} &nbsp;+&nbsp; ${sf("3", "x − 2")} &nbsp;−&nbsp; ${sf("12", "x² − 4")}<br><br>Skryf die waardes van x neer waarvoor die uitdrukking <b>onbepaald</b> is.`,
      },
      hint: {
        en: "Three denominators to check, but factorise the third one first — you may find it is only repeating what the first two already told you.", af: "Drie noemers om na te gaan, maar faktoriseer eers die derde een: dalk vind jy dat dit net herhaal wat die eerste twee jou reeds vertel het.",
      },
      memo: [
        { type: "step", text: { en: "x² − 4 = (x + 2)(x − 2), &nbsp;which is exactly the first two denominators multiplied together.", af: "x² − 4 = (x + 2)(x − 2), &nbsp;wat presies die eerste twee noemers met mekaar vermenigvuldig is." }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴&nbsp; x = −2&nbsp; or&nbsp; x = 2", af: "∴&nbsp; x = −2&nbsp; of&nbsp; x = 2" }, ticks: ["a"] },
      ],
      esplain: {
        en: "Three fractions could mean three different forbidden values, but factorising shows that the third denominator is just the first two multiplied together. So it adds nothing new: the whole expression breaks at x equals minus 2 and at x equals 2, and nowhere else. This is also the moment you learn what the lowest common denominator is going to be, so the factorising is doing double duty. Write both restrictions down now, before any combining, because once everything is over one denominator you will not be able to see which fraction contributed which danger.", af: "Drie breuke kan drie verskillende verbode waardes beteken, maar faktorisering wys dat die derde noemer net die eerste twee met mekaar vermenigvuldig is. Dit voeg dus niks nuuts by nie: die hele uitdrukking breek by x is gelyk aan minus 2 en by x is gelyk aan 2, en nêrens anders nie. Dit is ook die oomblik waarop jy leer wat die KGV gaan wees, so die faktorisering doen dubbel diens. Skryf albei beperkings nou neer, voor enige samevoeging, want sodra alles oor een noemer is, sal jy nie kan sien watter breuk watter gevaar bygedra het nie.",
      },
    },
    {
      id: "b",
      marks: 4,
      level: 3,
      prompt: {
        en: "Simplify the expression.", af: "Vereenvoudig die uitdrukking.",
      },
      hint: {
        en: "The factorised third denominator IS the lowest common denominator. Work out what each of the first two fractions must be multiplied by to reach it, keep every numerator caged in a bracket, and watch the minus in front of the last one.", af: "Die gefaktoriseerde derde noemer IS die KGV. Werk uit waarmee elk van die eerste twee breuke vermenigvuldig moet word om dit te bereik, hou elke teller in 'n hakie vasgekeer, en let op die minus voor die laaste een.",
      },
      memo: [
        { type: "step", text: { en: "LCD = (x + 2)(x − 2)&nbsp;&nbsp;&nbsp;&nbsp;limits: &nbsp;x ≠ −2, &nbsp;x ≠ 2", af: "KGV = (x + 2)(x − 2)&nbsp;&nbsp;&nbsp;&nbsp;beperkings: &nbsp;x ≠ −2, &nbsp;x ≠ 2" }, ticks: ["s/f"] },
        { type: "step", text: { en: `Multipliers: the first term ×(x − 2), the second ×(x + 2), the third needs none: &nbsp;= ${sf("2(x − 2) + 3(x + 2) − 12", "(x + 2)(x − 2)")}`, af: `Vermenigvuldigers: die eerste term ×(x − 2), die tweede ×(x + 2), die derde het niks nodig nie: &nbsp;= ${sf("2(x − 2) + 3(x + 2) − 12", "(x + 2)(x − 2)")}` }, ticks: ["ca"] },
        { type: "step", text: { en: `= ${sf("2x − 4 + 3x + 6 − 12", "(x + 2)(x − 2)")} = ${sf("5x − 10", "(x + 2)(x − 2)")}`, af: `= ${sf("2x − 4 + 3x + 6 − 12", "(x + 2)(x − 2)")} = ${sf("5x − 10", "(x + 2)(x − 2)")}` }, ticks: ["ca"] },
        { type: "step", text: { en: `Do not stop there — the top still factorises: &nbsp;= ${sf("5(x − 2)", "(x + 2)(x − 2)")}`, af: `Moenie daar stop nie, want die bokant faktoriseer nog: &nbsp;= ${sf("5(x − 2)", "(x + 2)(x − 2)")}` } },
        { type: "answer", text: { en: `The bracket (x − 2) cancels &nbsp;∴&nbsp; ${sf("5", "x + 2")}&nbsp;&nbsp;&nbsp;(x ≠ −2, x ≠ 2)`, af: `Die hakie (x − 2) kanselleer &nbsp;∴&nbsp; ${sf("5", "x + 2")}&nbsp;&nbsp;&nbsp;(x ≠ −2, x ≠ 2)` }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: keep going after you have combined. The top factorises to 5(x − 2), which cancels with the bottom — an answer of 5x − 10 over (x + 2)(x − 2) is correct but unfinished. And the restriction x ≠ 2 still stands even though that bracket has just disappeared.", af: "ONTHOU: hou aan nadat jy saamgevoeg het. Die bokant faktoriseer tot 5(x − 2), wat met die onderkant kanselleer: 'n antwoord van 5x − 10 oor (x + 2)(x − 2) is korrek, maar onvoltooid. En die beperking x ≠ 2 staan steeds, al het daardie hakie pas verdwyn.",
        } },
      ],
      esplain: {
        en: "Three fractions, one method, done in order. Factorise the last bottom and it turns out to be the other two multiplied together, so that is the lowest common denominator and the third fraction is already over it. The first fraction needs the missing bracket x minus 2, the second needs x plus 2, and every numerator travels inside a bracket so no sign gets lost. Combine, expand the top, and collect: 5x minus 10. Now the step people stop just short of — that top has a common factor of 5, giving 5 times x minus 2, which cancels with the same bracket on the bottom. The restrictions stay, because they belong to the original expression.", af: "Drie breuke, een metode, in volgorde gedoen. Faktoriseer die laaste onderkant, en dit blyk die ander twee met mekaar vermenigvuldig te wees, so dit is die KGV en die derde breuk is reeds daaroor. Die eerste breuk het die ontbrekende hakie x minus 2 nodig, die tweede x plus 2, en elke teller bly in 'n hakie sodat geen teken verlore gaan nie. Voeg saam, brei die bokant uit, en versamel: 5x minus 10. Nou die stap waar mense net te vroeg stop: daardie bokant het 'n gemene faktor 5, wat 5 maal x minus 2 gee, en dit kanselleer met dieselfde hakie onder. Die beperkings bly, want hulle behoort aan die oorspronklike uitdrukking.",
      },
    },
  ],
};

export const algxFractionsAddSubtractSiblingQuestions = [q1, q2, q3, q4, q5, q6];
