/* ============================================================
   EXAM FOCUS — Equations & Inequalities · Nature of Roots
   (EXAM-FOCUS-PLAN.md, PILOT TOPIC, session D, 2026-08-21).
   ------------------------------------------------------------
   Four fresh, exam-style questions, graded easy → hard, chosen as the
   pilot because "eqn" sits in the T1 September test scope (11 Sep:
   algebraic expressions, exponents, equations & inequalities, functions)
   and METHODS-algebra.md digests her actual taught method for this skill
   (sections B11 "Nature of roots" and B12 "Nature of roots with an
   unknown k"). Every worked line below follows that digest's exact
   wording and step order — her table's four outcome phrases ("real,
   rational, equal" / "real, rational, unequal" / "real, irrational,
   unequal" / "non-real / imaginary"), her Δ-substitution-with-brackets
   habit, her "∴" habit (METHODS §0.2), and her B12 three question shapes
   (inequality-in-k, complete-the-square-on-Δ, trial-and-check for the
   largest integer k).

   Archetypes composed from GR11-IEB-PAPER-BANK.md's Paper 1 menu item
   "a nature-of-roots 'show that' (equal → rational-for-all-k →
   non-real-range → never-equal, in rising difficulty)" and its worked
   table rows (Nov-P1 2021 combined: "for which p equal roots?", "nature
   of roots if p=−3", "for which real k does … have real roots?") — same
   SHAPES, all-new numbers and contexts, per her standing "freshly
   composed only" ruling (public repo).

   Scope check: nature-of-roots touches neither of METHODS-algebra.md's
   two open flags for Megan (the √9 = ±3 simplify-vs-solve box, or the
   two-roads ordering for rational-exponent/surd equations) — no square
   roots are simplified or solved anywhere below, only discriminants,
   inequalities in k, and one complete-the-square-on-Δ proof.

   No diagram: nature of roots is honestly a Δ-and-words topic (per the
   brief's own steer) — nothing here needs a sketch to be true to an
   exam mark scheme, so none is spent.
   ============================================================ */

const q1 = {
  id: "eqn.nor.q1",
  chapter: "eqn",
  topic: "nature-of-roots",
  archetype: "nor-basic-discriminant",
  lostQuest: { chapter: "eqn", quest: "eq8" },
  marks: 11,
  parts: [
    {
      id: "a",
      marks: 2,
      level: 1,
      prompt: {
        en: "The equation 2x² + 3 = 7x is not yet in standard form.<br>Rewrite it as ax² + bx + c = 0, and write down the values of a, b and c.",
        af: "Die vergelyking 2x² + 3 = 7x is nog nie in standaardvorm nie.<br>Herskryf dit as ax² + bx + c = 0, en skryf die waardes van a, b en c neer.",
      },
      hint: {
        en: "Move every term to one side so the equation equals zero — then a, b and c are just the numbers in front of x², x and the constant.",
        af: "Skuif elke term na een kant sodat die vergelyking gelyk is aan nul — dan is a, b en c net die getalle voor x², x en die konstante.",
      },
      memo: [
        { type: "step", text: { en: "2x² + 3 = 7x  →  2x² − 7x + 3 = 0", af: "2x² + 3 = 7x  →  2x² − 7x + 3 = 0" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "a = 2 ; b = −7 ; c = 3", af: "a = 2 ; b = −7 ; c = 3" }, ticks: ["a"] },
      ],
      esplain: {
        en: "a, b and c are nothing mysterious — they're just the numbers that sit in front of x², x and the constant once every term is on one side. Get the equation to equal zero first; the labels sort themselves out after that.",
        af: "a, b en c is niks geheimsinnig nie — dit is net die getalle wat voor x², x en die konstante staan sodra elke term aan een kant is. Kry eers die vergelyking gelyk aan nul; die etikette val dan vanself op hul plek.",
      },
    },
    {
      id: "b",
      marks: 3,
      level: 1,
      prompt: {
        en: "Calculate Δ, the discriminant of the equation.",
        af: "Bereken Δ, die diskriminant van die vergelyking.",
      },
      hint: {
        en: "Δ = b² − 4ac. Use the a, b and c you found in (a), and put every negative number in its own brackets before you square or multiply it.",
        af: "Δ = b² − 4ac. Gebruik die a, b en c wat jy in (a) gekry het, en sit elke negatiewe getal in sy eie hakies voordat jy dit kwadreer of vermenigvuldig.",
      },
      memo: [
        { type: "step", text: { en: "Δ = b² − 4ac = (−7)² − 4(2)(3)", af: "Δ = b² − 4ac = (−7)² − 4(2)(3)" }, ticks: ["s/f"] },
        { type: "step", text: { en: "= 49 − 24", af: "= 49 − 24" }, ticks: ["ca"] },
        { type: "answer", text: { en: "Δ = 25", af: "Δ = 25" }, ticks: ["a"] },
      ],
      esplain: {
        en: "The discriminant is just one number, but it packs in everything the roots are about to tell you — before you even solve the equation. Substitute carefully, bracket every negative, and this one calculation does all the work for the next two parts.",
        af: "Die diskriminant is net een getal, maar dit dra alles saam wat die wortels op die punt is om jou te vertel — nog voordat jy die vergelyking oplos. Vervang versigtig, sit elke negatiewe getal in hakies, en hierdie een berekening doen al die werk vir die volgende twee dele.",
      },
    },
    {
      id: "c",
      marks: 3,
      level: 2,
      prompt: {
        en: "Hence determine the nature of the roots of 2x² − 7x + 3 = 0. Give a full reason for your answer.",
        af: "Bepaal dus die aard van die wortels van 2x² − 7x + 3 = 0. Gee 'n volledige rede vir jou antwoord.",
      },
      hint: {
        en: "First check the SIGN of Δ (real or non-real), then check whether Δ is a perfect square (rational or irrational).",
        af: "Kyk eers na die TEKEN van Δ (reëel of nie-reëel), en kyk dan of Δ 'n volkome vierkant is (rasionaal of irrasionaal).",
      },
      memo: [
        { type: "step", text: { en: "Δ = 25 > 0, so the roots are real (and unequal, since Δ ≠ 0)", af: "Δ = 25 > 0, dus is die wortels reëel (en ongelyk, aangesien Δ ≠ 0)" }, ticks: ["ca"] },
        { type: "step", text: { en: "25 = 5², a perfect square, so the roots are rational", af: "25 = 5², 'n volkome vierkant, dus is die wortels rasionaal" }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴ the roots are real, rational and unequal", af: "∴ die wortels is reëel, rasionaal en ongelyk" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: Δ > 0 only tells you the roots are REAL. You still have to check whether Δ is a perfect square before you're allowed to say RATIONAL — skip that check and you've only answered half the question.",
          af: "ONTHOU: Δ > 0 vertel jou net dat die wortels REËEL is. Jy moet steeds kyk of Δ 'n volkome vierkant is voordat jy RASIONAAL mag sê — slaan daardie toets oor, en jy het net die helfte van die vraag beantwoord.",
        } },
      ],
      esplain: {
        en: "Nature-of-roots questions are really two yes/no checks stacked on top of each other. First: is Δ negative, zero, or positive — that tells you real vs non-real, and equal vs unequal. Second, only if Δ is positive: is it a perfect square — that tells you rational vs irrational. Answer both, in that order, and you've covered the whole question.",
        af: "Aard-van-wortels-vrae is eintlik twee ja/nee-toetse bo-op mekaar. Eerste: is Δ negatief, nul, of positief — dit vertel jou reëel teenoor nie-reëel, en gelyk teenoor ongelyk. Tweede, net as Δ positief is: is dit 'n volkome vierkant — dit vertel jou rasionaal teenoor irrasionaal. Beantwoord altwee, in daardie volgorde, en jy het die hele vraag gedek.",
      },
    },
    {
      id: "d",
      marks: 3,
      level: 2,
      prompt: {
        en: "Hence solve the equation 2x² + 3 = 7x, and confirm that your two solutions match the nature of the roots you found in (c).",
        af: "Los dus die vergelyking 2x² + 3 = 7x op, en bevestig dat jou twee oplossings ooreenstem met die aard van die wortels wat jy in (c) gekry het.",
      },
      hint: {
        en: "Factorise 2x² − 7x + 3 from (a) into two brackets — your two solutions should both come out as rational numbers, exactly as (c) predicted.",
        af: "Faktoriseer 2x² − 7x + 3 van (a) in twee hakies — jou twee oplossings behoort albei rasionale getalle te wees, presies soos (c) voorspel het.",
      },
      memo: [
        { type: "step", text: { en: "2x² − 7x + 3 = 0  →  (2x − 1)(x − 3) = 0", af: "2x² − 7x + 3 = 0  →  (2x − 1)(x − 3) = 0" }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴ x = 1/2  or  x = 3", af: "∴ x = 1/2  of  x = 3" }, ticks: ["a", "a"] },
      ],
      esplain: {
        en: "This is the part where the abstract 'rational, unequal' from (c) becomes two actual numbers. If you'd landed on ugly decimals or a repeated root here, that would mean either (c) was wrong or you've made an arithmetic slip somewhere — the two parts should always agree.",
        af: "Dit is die deel waar die abstrakte 'rasionaal, ongelyk' van (c) twee werklike getalle word. As jy hier op lelike desimale of 'n herhaalde wortel sou uitkom, sou dit beteken dat óf (c) verkeerd was óf jy iewers 'n rekenfout gemaak het — die twee dele moet altyd ooreenstem.",
      },
    },
  ],
};

const q2 = {
  id: "eqn.nor.q2",
  chapter: "eqn",
  topic: "nature-of-roots",
  archetype: "nor-irrational-and-equal-k",
  lostQuest: { chapter: "eqn", quest: "eq8" },
  marks: 12,
  parts: [
    {
      id: "a",
      marks: 2,
      level: 1,
      prompt: {
        en: "The equation x(x − 4) = 3 is not yet in standard form.<br>Write it as ax² + bx + c = 0, and write down the values of a, b and c.",
        af: "Die vergelyking x(x − 4) = 3 is nog nie in standaardvorm nie.<br>Skryf dit as ax² + bx + c = 0, en skryf die waardes van a, b en c neer.",
      },
      hint: {
        en: "Multiply out the bracket first, then move the 3 across so the equation equals zero.",
        af: "Vermenigvuldig eers die hakie uit, en skuif dan die 3 oor sodat die vergelyking gelyk is aan nul.",
      },
      memo: [
        { type: "step", text: { en: "x(x − 4) = 3  →  x² − 4x = 3  →  x² − 4x − 3 = 0", af: "x(x − 4) = 3  →  x² − 4x = 3  →  x² − 4x − 3 = 0" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "a = 1 ; b = −4 ; c = −3", af: "a = 1 ; b = −4 ; c = −3" }, ticks: ["a"] },
      ],
      esplain: {
        en: "Multiplying out first is what turns a 'disguised' quadratic into one you can actually read a, b and c off. Do that one step before anything else and the rest of the question stops looking scary.",
        af: "Om eers uit te vermenigvuldig is wat 'n 'vermomde' kwadratiese vergelyking verander in een waarvan jy werklik a, b en c kan aflees. Doen daardie een stap voor enigiets anders, en die res van die vraag lyk nie meer skrikwekkend nie.",
      },
    },
    {
      id: "b",
      marks: 3,
      level: 1,
      prompt: {
        en: "Calculate Δ, the discriminant of the equation.",
        af: "Bereken Δ, die diskriminant van die vergelyking.",
      },
      hint: {
        en: "Δ = b² − 4ac, using the a, b and c from (a). Bracket the negative c before you multiply.",
        af: "Δ = b² − 4ac, met die a, b en c van (a). Sit die negatiewe c in hakies voordat jy vermenigvuldig.",
      },
      memo: [
        { type: "step", text: { en: "Δ = b² − 4ac = (−4)² − 4(1)(−3)", af: "Δ = b² − 4ac = (−4)² − 4(1)(−3)" }, ticks: ["s/f"] },
        { type: "step", text: { en: "= 16 + 12", af: "= 16 + 12" }, ticks: ["ca"] },
        { type: "answer", text: { en: "Δ = 28", af: "Δ = 28" }, ticks: ["a"] },
      ],
      esplain: {
        en: "Watch the double negative here: −4 times a negative c flips to addition. That's the exact spot this kind of question likes to catch a rushed substitution.",
        af: "Let op die dubbele negatief hier: −4 keer 'n negatiewe c word 'n optelling. Dit is presies die plek waar hierdie tipe vraag 'n haastige vervanging betrap.",
      },
    },
    {
      id: "c",
      marks: 3,
      level: 2,
      prompt: {
        en: "Hence determine the nature of the roots of x(x − 4) = 3. Give a full reason for your answer.",
        af: "Bepaal dus die aard van die wortels van x(x − 4) = 3. Gee 'n volledige rede vir jou antwoord.",
      },
      hint: {
        en: "Δ is positive here — the only question left is whether 28 is a perfect square.",
        af: "Δ is hier positief — die enigste vraag wat oorbly, is of 28 'n volkome vierkant is.",
      },
      memo: [
        { type: "step", text: { en: "Δ = 28 > 0, so the roots are real and unequal", af: "Δ = 28 > 0, dus is die wortels reëel en ongelyk" }, ticks: ["ca"] },
        { type: "step", text: { en: "28 is not a perfect square (5² = 25 and 6² = 36), so the roots are irrational", af: "28 is nie 'n volkome vierkant nie (5² = 25 en 6² = 36), dus is die wortels irrasionaal" }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴ the roots are real, irrational and unequal", af: "∴ die wortels is reëel, irrasionaal en ongelyk" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: 'not a perfect square' does not mean 'go check again' — once Δ > 0 is confirmed real, the perfect-square check is the ONLY thing deciding rational vs irrational. There's no third option to worry about.",
          af: "ONTHOU: 'nie 'n volkome vierkant nie' beteken nie 'gaan weer kyk nie' — sodra Δ > 0 bevestig is as reëel, is die volkome-vierkant-toets die ENIGSTE ding wat rasionaal teenoor irrasionaal bepaal. Daar is geen derde opsie om oor te bekommer nie.",
        } },
      ],
      esplain: {
        en: "Same two checks as before, different result — that's the point of pairing this question with the last one. Δ > 0 both times, but 25 is a perfect square and 28 isn't, so one gives rational roots and the other gives irrational ones. The sign of Δ and the perfect-square check answer two completely different questions.",
        af: "Dieselfde twee toetse as voorheen, 'n ander uitkoms — dit is die punt daarvan om hierdie vraag langs die vorige een te sit. Δ > 0 is albei kere waar, maar 25 is 'n volkome vierkant en 28 nie, so die een gee rasionale wortels en die ander irrasionale. Die teken van Δ en die volkome-vierkant-toets beantwoord twee heeltemal verskillende vrae.",
      },
    },
    {
      id: "d",
      marks: 4,
      level: 3,
      prompt: {
        en: "The equation x(x − 4) = k has EQUAL roots for one particular value of k.<br>Determine this value of k, and write down the equal root (the value of x).",
        af: "Die vergelyking x(x − 4) = k het GELYKE wortels vir een spesifieke waarde van k.<br>Bepaal hierdie waarde van k, en skryf die gelyke wortel (die waarde van x) neer.",
      },
      hint: {
        en: "Write the equation with k instead of 3, find Δ in terms of k, then set Δ = 0 — equal roots always mean the discriminant is exactly zero.",
        af: "Skryf die vergelyking met k in plaas van 3, vind Δ in terme van k, en stel dan Δ = 0 — gelyke wortels beteken altyd dat die diskriminant presies nul is.",
      },
      memo: [
        { type: "step", text: { en: "x(x − 4) = k  →  x² − 4x − k = 0, so Δ = (−4)² − 4(1)(−k) = 16 + 4k", af: "x(x − 4) = k  →  x² − 4x − k = 0, dus Δ = (−4)² − 4(1)(−k) = 16 + 4k" }, ticks: ["s/f"] },
        { type: "step", text: { en: "for equal roots, Δ = 0:  16 + 4k = 0", af: "vir gelyke wortels, Δ = 0:  16 + 4k = 0" }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴ k = −4", af: "∴ k = −4" }, ticks: ["a"] },
        { type: "answer", text: { en: "the equal root is x = −b/(2a) = −(−4)/2(1) = 2", af: "die gelyke wortel is x = −b/(2a) = −(−4)/2(1) = 2" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: EQUAL roots means Δ = 0 exactly — one single value of k, not a range. Don't confuse this with 'for which k are the roots real', which would give an inequality like k ≥ −4.",
          af: "ONTHOU: GELYKE wortels beteken Δ = 0 presies — een enkele waarde van k, nie 'n reeks nie. Moenie dit verwar met 'vir watter k is die wortels reëel' nie, wat 'n ongelykheid soos k ≥ −4 sou gee.",
        } },
      ],
      esplain: {
        en: "Swapping the fixed 3 for an unknown k turns Δ from a number into a small expression — but the rule for equal roots doesn't change: Δ still has to equal exactly zero. Once k is pinned down, the formula's ± disappears (there's nothing left to add or subtract), so the one root left standing is just −b/(2a).",
        af: "Om die vaste 3 met 'n onbekende k te vervang, verander Δ van 'n getal in 'n klein uitdrukking — maar die reël vir gelyke wortels verander nie: Δ moet steeds presies nul wees. Sodra k vasgepen is, verdwyn die formule se ±-teken (daar is niks meer om by te tel of af te trek nie), so die een oorblywende wortel is net −b/(2a).",
      },
    },
  ],
};

const q3 = {
  id: "eqn.nor.q3",
  chapter: "eqn",
  topic: "nature-of-roots",
  archetype: "nor-k-inequality-ladder",
  lostQuest: { chapter: "eqn", quest: "eq8" },
  marks: 13,
  parts: [
    {
      id: "a",
      marks: 3,
      level: 2,
      prompt: {
        en: "For which value of k will the equation 2x² − 4x + k = 0 have equal roots?",
        af: "Vir watter waarde van k sal die vergelyking 2x² − 4x + k = 0 gelyke wortels hê?",
      },
      hint: {
        en: "Equal roots means Δ = 0. Write Δ in terms of k using a = 2, b = −4, c = k, then solve for k.",
        af: "Gelyke wortels beteken Δ = 0. Skryf Δ in terme van k met a = 2, b = −4, c = k, en los dan vir k op.",
      },
      memo: [
        { type: "step", text: { en: "Δ = b² − 4ac = (−4)² − 4(2)(k) = 16 − 8k", af: "Δ = b² − 4ac = (−4)² − 4(2)(k) = 16 − 8k" }, ticks: ["s/f"] },
        { type: "step", text: { en: "for equal roots, Δ = 0:  16 − 8k = 0", af: "vir gelyke wortels, Δ = 0:  16 − 8k = 0" }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴ k = 2", af: "∴ k = 2" }, ticks: ["a"] },
      ],
      esplain: {
        en: "This is the exact same move as the last question's (d) — build Δ in terms of the unknown, then set it to zero. The only difference is k is now the coefficient of x², not a plain constant, so it appears once you multiply out 4ac.",
        af: "Dit is presies dieselfde stap as die vorige vraag se (d) — bou Δ in terme van die onbekende, en stel dit dan gelyk aan nul. Die enigste verskil is dat k nou die koëffisiënt van x² is, nie 'n gewone konstante nie, so dit verskyn sodra jy 4ac uitvermenigvuldig.",
      },
    },
    {
      id: "b",
      marks: 3,
      level: 2,
      prompt: {
        en: "For which values of k will the roots of the equation be real and unequal?",
        af: "Vir watter waardes van k sal die wortels van die vergelyking reëel en ongelyk wees?",
      },
      hint: {
        en: "Real and unequal means Δ > 0, not Δ = 0. Use that same Δ, but this time solve an inequality.",
        af: "Reëel en ongelyk beteken Δ > 0, nie Δ = 0 nie. Gebruik dieselfde Δ, maar los hierdie keer 'n ongelykheid op.",
      },
      memo: [
        { type: "step", text: { en: "real and unequal roots need Δ > 0:  16 − 8k > 0", af: "reële en ongelyke wortels benodig Δ > 0:  16 − 8k > 0" }, ticks: ["s/f"] },
        { type: "step", text: { en: "−8k > −16", af: "−8k > −16" }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴ k < 2   (dividing by a negative flips the sign)", af: "∴ k < 2   (deur 'n negatiewe getal te deel, draai die teken om)" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: dividing (or multiplying) an inequality by a NEGATIVE number flips the sign. −8k > −16 becomes k < 2, not k > 2 — the exact same rule as solving any other inequality.",
          af: "ONTHOU: as jy 'n ongelykheid deur 'n NEGATIEWE getal deel (of vermenigvuldig), draai die teken om. −8k > −16 word k < 2, nie k > 2 nie — presies dieselfde reël as om enige ander ongelykheid op te los.",
        } },
      ],
      esplain: {
        en: "'Real and unequal' is Δ > 0, and 'equal' is Δ = 0 exactly — together those two boundaries are about to carve up every possible value of k into three neat regions. Watch the sign flip closely here; it's the one place this whole ladder likes to trip people up.",
        af: "'Reëel en ongelyk' is Δ > 0, en 'gelyk' is Δ = 0 presies — saam gaan hierdie twee grense elke moontlike waarde van k in drie netjiese gebiede verdeel. Let noukeurig op die tekenomkering hier; dit is die een plek waar hierdie hele leer mense laat struikel.",
      },
    },
    {
      id: "c",
      marks: 2,
      level: 3,
      prompt: {
        en: "Hence, without further calculation, write down the values of k for which the equation has non-real roots.",
        af: "Skryf dus, sonder verdere berekening, die waardes van k neer waarvoor die vergelyking nie-reële wortels het nie.",
      },
      hint: {
        en: "Non-real is simply everything (a) and (b) didn't already cover. Where does 'equal' at k = 2 and 'real, unequal' at k < 2 leave off?",
        af: "Nie-reëel is bloot alles wat (a) en (b) nog nie gedek het nie. Waar hou 'gelyk' by k = 2 en 'reëel, ongelyk' by k < 2 op?",
      },
      memo: [
        { type: "step", text: { en: "the roots are real — equal at k = 2, unequal for k < 2 — for every k ≤ 2, so non-real roots need k > 2", af: "die wortels is reëel — gelyk by k = 2, ongelyk vir k < 2 — vir elke k ≤ 2, dus benodig nie-reële wortels k > 2" }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴ k > 2", af: "∴ k > 2" }, ticks: ["a"] },
      ],
      esplain: {
        en: "You never had to touch Δ again for this one — real, equal and non-real between them cover every possible value of k with no gaps and no overlaps. Once you know two of the three boundaries, the third is just 'whatever's left over'.",
        af: "Jy hoef nie weer Δ vir hierdie een aan te raak nie — reëel, gelyk en nie-reëel dek saam elke moontlike waarde van k, sonder gapings en sonder oorvleueling. Sodra jy twee van die drie grense ken, is die derde net 'wat oorbly'.",
      },
    },
    {
      id: "d",
      marks: 5,
      level: 4,
      prompt: {
        en: "Determine the LARGEST integer value of k for which the roots of 2x² − 4x + k = 0 are rational and unequal.",
        af: "Bepaal die GROOTSTE heelgetalwaarde van k waarvoor die wortels van 2x² − 4x + k = 0 rasionaal en ongelyk is.",
      },
      hint: {
        en: "From (b), real and unequal needs k < 2. Starting at the largest integer below 2, test each one in turn — you need Δ to come out as a perfect square, not just positive.",
        af: "Van (b) af, benodig reëel en ongelyk k < 2. Begin by die grootste heelgetal onder 2, en toets elkeen een vir een — jy benodig dat Δ 'n volkome vierkant is, nie net positief nie.",
      },
      memo: [
        { type: "step", text: { en: "from (b), k must be an integer less than 2 — start testing from the largest one down: k = 1", af: "van (b) af, moet k 'n heelgetal kleiner as 2 wees — begin toets van die grootste een af: k = 1" }, ticks: ["ca"] },
        { type: "step", text: { en: "k = 1:  Δ = 16 − 8(1) = 8 — not a perfect square, so these roots are irrational. Reject.", af: "k = 1:  Δ = 16 − 8(1) = 8 — nie 'n volkome vierkant nie, dus is hierdie wortels irrasionaal. Verwerp." }, ticks: ["ca"] },
        { type: "step", text: { en: "k = 0:  Δ = 16 − 8(0) = 16 = 4² — a perfect square, so these roots are rational", af: "k = 0:  Δ = 16 − 8(0) = 16 = 4² — 'n volkome vierkant, dus is hierdie wortels rasionaal" }, ticks: ["ca"] },
        { type: "step", text: { en: "check: 2x² − 4x = 0  →  2x(x − 2) = 0  →  x = 0 or x = 2 — rational and unequal ✓", af: "toets: 2x² − 4x = 0  →  2x(x − 2) = 0  →  x = 0 of x = 2 — rasionaal en ongelyk ✓" }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴ the largest integer value is k = 0", af: "∴ die grootste heelgetalwaarde is k = 0" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: 'real and unequal' (Δ > 0) is not the same test as 'rational' (Δ is a perfect square). k = 1 passes the first test and fails the second — you can't stop checking just because Δ came out positive.",
          af: "ONTHOU: 'reëel en ongelyk' (Δ > 0) is nie dieselfde toets as 'rasionaal' nie (Δ is 'n volkome vierkant). k = 1 slaag die eerste toets en druip die tweede — jy kan nie ophou toets net omdat Δ positief uitgekom het nie.",
        } },
      ],
      esplain: {
        en: "This is the tricky one, and it's tricky on purpose: there's no formula that spits out 'the largest k with a perfect-square discriminant' directly, because perfect squares aren't evenly spaced (4, then 9, then 16, then 25 — the gaps keep changing). So you test, starting from the boundary and working inward, until Δ finally lands on a perfect square. Bank the earlier marks first — (a), (b) and (c) are all straightforward Δ work, and this one is the reward round at the end.",
        af: "Dit is die lastige een, en dit is met opset lastig: daar is geen formule wat direk 'die grootste k met 'n volkome-vierkant-diskriminant' uitspoeg nie, want volkome vierkante is nie eweredig versprei nie (4, dan 9, dan 16, dan 25 — die gapings verander heeltyd). Jy toets dus, van die grens af na binne toe, totdat Δ uiteindelik op 'n volkome vierkant land. Verseker eers die vorige punte — (a), (b) en (c) is almal eenvoudige Δ-werk, en hierdie een is die beloningsronde aan die einde.",
      },
    },
  ],
};

const q4 = {
  id: "eqn.nor.q4",
  chapter: "eqn",
  topic: "nature-of-roots",
  archetype: "nor-prove-real-for-all-p",
  lostQuest: { chapter: "eqn", quest: "eq8" },
  marks: 13,
  parts: [
    {
      id: "a",
      marks: 2,
      level: 1,
      prompt: {
        en: "Write down Δ, the discriminant of the equation x² + px + (p − 2) = 0, in terms of p.",
        af: "Skryf Δ, die diskriminant van die vergelyking x² + px + (p − 2) = 0, in terme van p neer.",
      },
      hint: {
        en: "Use a = 1, b = p and c = p − 2 in Δ = b² − 4ac — you don't need to simplify yet.",
        af: "Gebruik a = 1, b = p en c = p − 2 in Δ = b² − 4ac — jy hoef nog nie te vereenvoudig nie.",
      },
      memo: [
        { type: "step", text: { en: "Δ = b² − 4ac = p² − 4(1)(p − 2)", af: "Δ = b² − 4ac = p² − 4(1)(p − 2)" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "Δ = p² − 4p + 8", af: "Δ = p² − 4p + 8" }, ticks: ["a"] },
      ],
      esplain: {
        en: "Nothing new here — it's the exact same Δ = b² − 4ac substitution as every other part of this topic, just with p standing in for a number. Multiply out the bracket carefully and you get a normal quadratic EXPRESSION in p, which is what the next part works with.",
        af: "Niks nuuts hier nie — dit is presies dieselfde Δ = b² − 4ac-vervanging as elke ander deel van hierdie onderwerp, net met p wat vir 'n getal instaan. Vermenigvuldig die hakie versigtig uit en jy kry 'n gewone kwadratiese uitdrukking in p, waarmee die volgende deel werk.",
      },
    },
    {
      id: "b",
      marks: 4,
      level: 3,
      prompt: {
        en: "By completing the square on your answer to (a), show that Δ = (p − 2)² + 4.",
        af: "Deur die vierkant op jou antwoord vir (a) te voltooi, wys dat Δ = (p − 2)² + 4.",
      },
      hint: {
        en: "Treat p² − 4p + 8 like any completing-the-square expression: find (b/2)², then add it and subtract it on the same line.",
        af: "Hanteer p² − 4p + 8 soos enige vierkant-voltooiing-uitdrukking: vind (b/2)², en tel dit dan by en trek dit af op dieselfde lyn.",
      },
      memo: [
        { type: "step", text: { en: "p² − 4p + 8, with b/2 = −4/2 = −2", af: "p² − 4p + 8, met b/2 = −4/2 = −2" }, ticks: ["s/f"] },
        { type: "step", text: { en: "= p² − 4p + (−2)² − (−2)² + 8", af: "= p² − 4p + (−2)² − (−2)² + 8" }, ticks: ["ca"] },
        { type: "step", text: { en: "= (p − 2)² − 4 + 8", af: "= (p − 2)² − 4 + 8" }, ticks: ["ca"] },
        { type: "answer", text: { en: "= (p − 2)² + 4", af: "= (p − 2)² + 4" }, ticks: ["a"] },
      ],
      esplain: {
        en: "This is exactly her completing-the-square method from the Functions/Equations work — let x and b/2 fall into a new bracket, but their squares get stuck outside — except this time the 'expression' you're completing the square on is Δ itself, not the original equation. Same method, new target.",
        af: "Dit is presies haar vierkant-voltooiing-metode van die Funksies/Vergelykings-werk — laat x en b/2 in 'n nuwe hakie val, maar hulle vierkante bly buite vassteek — behalwe dat die 'uitdrukking' waarop jy die vierkant voltooi hierdie keer Δ self is, nie die oorspronklike vergelyking nie. Dieselfde metode, 'n nuwe teiken.",
      },
    },
    {
      id: "c",
      marks: 3,
      level: 3,
      prompt: {
        en: "Hence prove that the equation x² + px + (p − 2) = 0 has real roots for EVERY real value of p.",
        af: "Bewys dus dat die vergelyking x² + px + (p − 2) = 0 reële wortels het vir ELKE reële waarde van p.",
      },
      hint: {
        en: "A squared real number can never be negative. What does that tell you about the smallest possible value of (p − 2)² + 4?",
        af: "'n Gekwadreerde reële getal kan nooit negatief wees nie. Wat vertel dit jou van die kleinste moontlike waarde van (p − 2)² + 4?",
      },
      memo: [
        { type: "step", text: { en: "(p − 2)² ≥ 0 for every real value of p (a square can never be negative)", af: "(p − 2)² ≥ 0 vir elke reële waarde van p ('n vierkant kan nooit negatief wees nie)" }, ticks: ["ca"] },
        { type: "step", text: { en: "so Δ = (p − 2)² + 4 ≥ 0 + 4 = 4, meaning Δ ≥ 4 for every real p", af: "dus Δ = (p − 2)² + 4 ≥ 0 + 4 = 4, wat beteken Δ ≥ 4 vir elke reële p" }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴ since Δ is always at least 4, Δ > 0 for every real p, so the equation always has real roots", af: "∴ aangesien Δ altyd ten minste 4 is, is Δ > 0 vir elke reële p, en het die vergelyking altyd reële wortels" }, ticks: ["a"] },
      ],
      esplain: {
        en: "This is her other distinctive nature-of-roots method: instead of testing values of p one at a time forever, you find the SMALLEST Δ can ever be (by completing the square on it) and check that even that smallest value is still positive. One inequality proves it for every real p at once.",
        af: "Dit is haar ander kenmerkende aard-van-wortels-metode: in plaas daarvan om vir ewig een vir een waardes van p te toets, vind jy die KLEINSTE wat Δ ooit kan wees (deur die vierkant daarop te voltooi) en kyk of selfs daardie kleinste waarde nog positief is. Een ongelykheid bewys dit vir elke reële p op een slag.",
      },
    },
    {
      id: "d",
      marks: 4,
      level: 4,
      prompt: {
        en: "Hence, or otherwise, determine the value(s) of p for which the equation has EQUAL roots. If no such value exists, explain why.",
        af: "Bepaal dus, of andersins, die waarde(s) van p waarvoor die vergelyking GELYKE wortels het. As geen sodanige waarde bestaan nie, verduidelik hoekom.",
      },
      hint: {
        en: "Equal roots need Δ = 0. Set (p − 2)² + 4 equal to zero — what would (p − 2)² have to equal, and is that possible for a real number?",
        af: "Gelyke wortels benodig Δ = 0. Stel (p − 2)² + 4 gelyk aan nul — waaraan sou (p − 2)² gelyk moes wees, en is dit moontlik vir 'n reële getal?",
      },
      memo: [
        { type: "step", text: { en: "for equal roots, Δ = 0:  (p − 2)² + 4 = 0", af: "vir gelyke wortels, Δ = 0:  (p − 2)² + 4 = 0" }, ticks: ["ca"] },
        { type: "step", text: { en: "(p − 2)² = −4", af: "(p − 2)² = −4" }, ticks: ["ca"] },
        { type: "step", text: { en: "a squared real number can never equal a negative number, so no real value of p satisfies this", af: "'n gekwadreerde reële getal kan nooit gelyk wees aan 'n negatiewe getal nie, dus voldoen geen reële waarde van p hieraan nie" }, ticks: ["a"] },
        { type: "answer", text: { en: "∴ the equation NEVER has equal roots, for any real value of p", af: "∴ die vergelyking het NOOIT gelyke wortels nie, vir enige reële waarde van p" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: EQUAL roots means Δ = 0 EXACTLY — not 'Δ gets close to zero'. From (c) you know Δ ≥ 4 always, so it can get as low as 4 but never reach 0. Don't be tempted to give p = 2 (where Δ is smallest) as your answer — that value gives Δ = 4, real and UNEQUAL roots, not equal ones.",
          af: "ONTHOU: GELYKE wortels beteken Δ = 0 PRESIES — nie 'Δ kom naby nul nie'. Van (c) af weet jy Δ ≥ 4 altyd, so dit kan so laag as 4 gaan maar nooit 0 bereik nie. Moenie in die versoeking kom om p = 2 (waar Δ die kleinste is) as jou antwoord te gee nie — daardie waarde gee Δ = 4, reële en ONGELYKE wortels, nie gelyke wortels nie.",
        } },
      ],
      esplain: {
        en: "This part is the payoff for (b) and (c): once you know the MINIMUM value Δ can ever take is 4, 'can Δ = 0 happen' becomes a one-line check instead of a fresh calculation. This is exactly why she has you complete the square on Δ itself, not just on the original equation — it turns an abstract 'for every p' question into one concrete number you can reason from.",
        af: "Hierdie deel is die beloning vir (b) en (c): sodra jy weet die MINIMUM waarde wat Δ ooit kan aanneem 4 is, word 'kan Δ = 0 gebeur' 'n een-lyn-toets in plaas van 'n vars berekening. Dit is presies hoekom sy jou die vierkant op Δ self laat voltooi, nie net op die oorspronklike vergelyking nie — dit verander 'n abstrakte 'vir elke p'-vraag in een konkrete getal waaruit jy kan redeneer.",
      },
    },
  ],
};

export const eqnNatureOfRootsQuestions = [q1, q2, q3, q4];
