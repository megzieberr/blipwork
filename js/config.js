/* ============================================================
   CONFIG — chapters, the shared colour palette, XP rules.
   ------------------------------------------------------------
   Colour system (revised again — Solo Leveling "system" style): a
   small curated set of luminous game-rarity accents on the near-black
   navy shell (see css/styles.css tokens). Same structure as before —
   no per-chapter hue families, the 5 accents cycle down the chapter
   list so neighbouring chapters read as visually distinct; every
   quest in a chapter shares its chapter's one accent. Values chosen
   to glow cleanly on #070b16 next to the electric-blue chrome.
   ============================================================ */
import { L } from "./lang.js";
const PALETTE = {
  blue:    "#3aa0ff",   // primary — the system's own electric blue
  violet:  "#8b5cf6",   // arcane violet (matches --accent2 family)
  cyan:    "#22d3ee",   // ice cyan
  gold:    "#fbbf24",   // legendary gold
  fuchsia: "#e879f9",   // rare-drop fuchsia
  /* SIXTH ACCENT, added 2026-08-23 for the new exam-only "algx" chapter
     (EXAM-BUILD-DAY.md). The brief asked for "a PALETTE colour no chapter
     uses" — there wasn't one left: blue is on stats/func/eqn, violet on
     finance/tgraph/gtrig/euclid, cyan on prob/analytical, gold on
     trig/pat, fuchsia on meas/exp. Rather than hand Algebraic
     Expressions a colour already worn by three other chapters, the
     curated set grows by one. Mint reads clean on #070b16 and is far
     enough from cyan to be told apart at a glance; it also stays clear
     of the amber ★ used by the Level 4 tiles. Nothing else uses it. */
  mint:    "#34d399",   // fresh-start mint (algx only)
};
const CYCLE = [PALETTE.blue, PALETTE.violet, PALETTE.cyan, PALETTE.gold, PALETTE.fuchsia];

export const CHAPTERS = [
  {
    id: "stats", name: L("Statistics", "Statistiek"), paper: "Paper 2", icon: "📊", term: "term3",
    signature: PALETTE.blue, open: true,
    blurb: L("Data, spread, graphs and the shape of a distribution.", "Data, spreiding, grafieke en die vorm van 'n verspreiding."),
    quests: [
      { id: "q1", n: 1, title: L("Calculator skills", "Sakrekenaarvaardighede"), blurb: L("Clear it, frequency on/off, read values back.", "Maak dit skoon, frekwensie aan/af, lees waardes terug."), built: true },
      { id: "q2", n: 2, title: L("Centre & spread", "Sentrum & spreiding"), blurb: L("Mean, mode, median, range from a list.", "Gemiddelde, modus, mediaan, omvang uit 'n lys."), built: true },
      { id: "q3", n: 3, title: L("Quartiles & box plots", "Kwartiele & mond-en-snor"), blurb: L("Quartile positions, IQR, outliers, box-and-whisker.", "Kwartielposisies, interkwartielomvang, uitskieters, mond-en-snor."), built: true },
      { id: "q4", n: 4, title: L("Skewness & shape", "Skeefheid & vorm"), blurb: L("Normal vs skewed, the mean–median rule.", "Normaal vs skeef, die gemiddelde-mediaan-reël."), built: true },
      { id: "q5", n: 5, title: L("Grouped data", "Gegroepeerde data"), blurb: L("Estimated mean, modal & median class.", "Geskatte gemiddelde, modale klas & mediaanklas."), built: true },
      { id: "q6", n: 6, title: L("Ogives", "Ogiewe"), blurb: L("Plot points, read median, quartiles, percentiles.", "Stip punte, lees mediaan, kwartiele, persentiele af."), built: true },
      { id: "q7", n: 7, title: L("Standard deviation", "Standaardafwyking"), blurb: L("σ, variance, values within one σ.", "σ, variansie, waardes binne een σ."), built: true },
      { id: "q8", n: 8, title: L("Mixed exam favourites", "Gemengde eksamengunstelinge"), blurb: L("Compare plots, effect of changes, the tough ones.", "Vergelyk diagramme, effek van veranderinge, die moeilikes."), built: true },
    ],
  },
  {
    id: "finance", name: L("Finance", "Finansies"), paper: "Paper 1", icon: "💰", term: "term3",
    signature: PALETTE.violet, open: true,
    blurb: L("Interest, growth and the time value of money.", "Rente, groei en die tydwaarde van geld."),
    quests: [
      { id: "f1", n: 1, title: L("Words & formulas", "Woorde & formules"), blurb: L("P, A, i, n and which formula fits.", "P, A, i, n en watter formule pas."), built: true },
      { id: "f2", n: 2, title: L("Simple, compound & depreciation", "Enkelvoudig, saamgesteld & waardevermindering"), blurb: L("Interest on the original vs the growing balance; the two depreciation graphs.", "Rente op die oorspronklike vs die groeiende saldo; die twee grafieke van waardevermindering."), built: true },
      { id: "f3", n: 3, title: L("Compounding periods", "Samestellingsperiodes"), blurb: L("Rate per period and the exponent — monthly, quarterly, …", "Koers per periode en die eksponent: maandeliks, kwartaalliks, …"), built: true },
      { id: "f4", n: 4, title: L("Timelines: counting moves", "Tydlyne: tel die skuiwe"), blurb: L("How many periods, forward or backward.", "Hoeveel periodes, vorentoe of agtertoe."), built: true },
      { id: "f5", n: 5, title: L("Timelines: building the move", "Tydlyne: bou die skuif"), blurb: L("× or ÷, the exponent's sign, and rate changes.", "× of ÷, die eksponent se teken, en koersveranderinge."), built: true },
      { id: "f6", n: 6, title: L("Deposits & hire purchase", "Deposito's & huurkoop"), blurb: L("The deposit and what's still owed.", "Die deposito en wat jy nog skuld."), built: true },
      { id: "f7", n: 7, title: L("Effective vs nominal", "Effektief vs nominaal"), blurb: L("Annual vs a frequency, and the conversion formula.", "Jaarliks vs 'n frekwensie, en die omskakelingsformule."), built: true },
      { id: "f8", n: 8, title: L("Which one is the total?", "Watter een is die totaal?"), blurb: L("Payments are coins, the total is the jug: find the jug in the words first.", "Paaiemente is munte, die totaal is die beker: vind eers die beker in die woorde."), built: true },
      { id: "f9", n: 9, title: L("Car or no car?", "Kar of geen kar?"), blurb: L("The meeting day, forward or reverse gear, and one car per road.", "Die ontmoetingsdag, vorentoe of trurat, en een kar per pad."), built: true },
      { id: "f10", n: 10, title: L("In or out?", "In of uit?"), blurb: L("Deposits go in, withdrawals and repayments come out; the total stands alone on the left.", "Deposito's gaan in, onttrekkings en terugbetalings kom uit; die totaal staan alleen links."), built: true },
      { id: "f11", n: 11, title: L("Pick the meeting day", "Kies die ontmoetingsdag"), blurb: L("Any T can be the meeting day: count the cars and pick the day with the fewest. The answer is the same anywhere.", "Enige T kan die ontmoetingsdag wees: tel die karre en kies die dag met die minste. Die antwoord bly oral dieselfde."), built: true },
      { id: "f12", n: 12, title: L("Build the timeline", "Bou die tydlyn"), blurb: L("The exam hands you words: build the whole timeline, tap by tap, before any equation.", "Die eksamen gee jou woorde: bou die hele tydlyn, klik vir klik, voor enige vergelyking."), built: true },
      { id: "f13", n: 13, title: L("Build the one equation", "Bou die een vergelyking"), blurb: L("The exam shape: the whole equation in one line, typed once, rounded once.", "Die eksamenvorm: die hele vergelyking in een reël, een keer ingetik, een keer afgerond."), built: true },
    ],
  },
  {
    id: "prob", name: L("Probability", "Waarskynlikheid"), paper: "Paper 1", icon: "🎲", term: "term3",
    signature: PALETTE.cyan, open: true,
    blurb: L("Chance, Venn diagrams, tree diagrams and the rules that tie them together.", "Kans, Venn-diagramme, boomdiagramme en die reëls wat hulle saambind."),
    quests: [
      { id: "p1", n: 1, title: L("Chance & the scale", "Kans & die skaal"), blurb: L("Sample space, theoretical probability, relative frequency.", "Uitkomsruimte, teoretiese waarskynlikheid, relatiewe frekwensie."), built: true },
      { id: "p2", n: 2, title: L("Venn diagrams: regions", "Venn-diagramme: gebiede"), blurb: L("∩, ∪, complement and the regions of a Venn diagram.", "∩, ∪, komplement en die gebiede van 'n Venn-diagram."), built: true },
      { id: "p3", n: 3, title: L("Venn diagrams: probabilities", "Venn-diagramme: waarskynlikhede"), blurb: L("Sort outcomes into regions and read probabilities off.", "Sorteer uitkomste in gebiede en lees waarskynlikhede af."), built: true },
      { id: "p4", n: 4, title: L("The probability rules", "Die waarskynlikheidsreëls"), blurb: L("Addition rule, complement, mutually exclusive vs inclusive.", "Optelreël, komplement, onderling uitsluitend vs inklusief."), built: true },
      { id: "p5", n: 5, title: L("Independent events", "Onafhanklike gebeurtenisse"), blurb: L("The product rule, the test, and contingency tables.", "Die produkreël, die toets, en tweerigtingtabelle."), built: true },
      { id: "p6", n: 6, title: L("Tree diagrams", "Boomdiagramme"), blurb: L("Multiply along a path, add paths, ‘at least one’.", "Vermenigvuldig langs 'n pad, tel paaie op, ‘ten minste een’."), built: true },
      { id: "p7", n: 7, title: L("With & without replacement", "Met & sonder terugplasing"), blurb: L("When the denominators stay the same — and when they drop.", "Wanneer die noemers dieselfde bly, en wanneer hulle daal."), built: true },
    ],
  },
  {
    id: "trig", name: L("2D Trigonometry", "2D-trigonometrie"), paper: "Paper 2", icon: "📐", term: "term3",
    signature: PALETTE.gold, open: true,
    blurb: L("Sine, cosine and area rules — solving any triangle, drawn to scale.", "Sinus-, cosinus- en oppervlakreëls: enige driehoek oplos, op skaal geteken."),
    quests: [
      { id: "t1", n: 1, title: L("Which rule fits?", "Watter reël pas?"), blurb: L("Label the friends; choose sine, cosine or area for the given case.", "Benoem die vriende; kies sinus, cosinus of oppervlak vir die gegewe geval."), built: true },
      { id: "t2", n: 2, title: L("Sine rule: sides", "Sinusreël: sye"), blurb: L("Two angles and a side → find a missing side.", "Twee hoeke en 'n sy → vind 'n ontbrekende sy."), built: true },
      { id: "t3", n: 3, title: L("Sine rule: angles & the ambiguous case", "Sinusreël: hoeke & die dubbelsinnige geval"), blurb: L("Find an angle, and when two triangles are possible.", "Vind 'n hoek, en wanneer twee driehoeke moontlik is."), built: true },
      { id: "t4", n: 4, title: L("Cosine rule: sides", "Cosinusreël: sye"), blurb: L("Two sides and the included angle → the third side.", "Twee sye en die ingeslote hoek → die derde sy."), built: true },
      { id: "t5", n: 5, title: L("Cosine rule: angles", "Cosinusreël: hoeke"), blurb: L("All three sides → any angle, acute or obtuse.", "Al drie sye → enige hoek, skerp of stomp."), built: true },
      { id: "t6", n: 6, title: L("Area rule", "Oppervlakreël"), blurb: L("Triangles, quadrilaterals and regular polygons.", "Driehoeke, vierhoeke en reëlmatige veelhoeke."), built: true },
      { id: "t7", n: 7, title: L("Mixed problems", "Gemengde probleme"), blurb: L("Pick the rule, combine steps, shortest-distance and area.", "Kies die reël, kombineer stappe, kortste afstand en oppervlakte."), built: true },
    ],
  },
  {
    id: "meas", name: L("Measurement", "Meting"), paper: "Paper 2", icon: "📦", term: "term3",
    signature: PALETTE.fuchsia, open: true,
    blurb: L("Surface area and volume — read the solid, then choose the right formula.", "Buite-oppervlakte en volume: lees die liggaam, kies dan die regte formule."),
    quests: [
      { id: "m1", n: 1, title: L("Name it & its formula", "Benoem dit & sy formule"), blurb: L("Recognise each solid and match its volume / surface-area formula.", "Herken elke liggaam en koppel sy formule vir volume / buite-oppervlakte."), built: true },
      { id: "m2", n: 2, title: L("Slant vs perpendicular height", "Skuinshoogte vs loodregte hoogte"), blurb: L("Which height goes where — volume uses H, the slanted face uses h.", "Watter hoogte gaan waar: volume gebruik H, die skuins vlak gebruik h."), built: true },
      { id: "m3", n: 3, title: L("Open tops & bottoms", "Oop bokante & onderkante"), blurb: L("Closed, open-top, or a pipe — add a circle only for each closed end.", "Geslote, oop bo, of 'n pyp: tel net vir elke geslote ent 'n sirkel by."), built: true },
      { id: "m4", n: 4, title: L("Composite solids", "Saamgestelde liggame"), blurb: L("Join two solids: add volumes, but leave out the hidden joining face.", "Sit twee liggame aanmekaar: tel volumes op, maar los die verborge raakvlak uit."), built: true },
      { id: "m6", n: 5, title: L("Find the perpendicular height", "Vind die loodregte hoogte"), blurb: L("Slant vs perpendicular — find H with the hidden right-angled triangle (cone & pyramid).", "Skuins vs loodreg: vind H met die verborge reghoekige driehoek (keël & piramide)."), built: true },
      { id: "m5", n: 6, title: L("Mixed: read it & pick the formula", "Gemeng: lees dit & kies die formule"), blurb: L("All of it, plus scaling: ×k → area ×k², volume ×k³.", "Alles, plus skalering: ×k → oppervlakte ×k², volume ×k³."), built: true },
    ],
  },
  // ---- REVISION tab: chapters already taught this year, open for revision ----
  {
    id: "func", name: L("Functions", "Funksies"), paper: "Paper 1", icon: "📈", term: "revision",
    signature: PALETTE.blue, open: true,
    blurb: L("The four graphs — read them, transform them, and solve inequalities off them.", "Die vier grafieke: lees hulle, transformeer hulle, en los ongelykhede daarmee op."),
    quests: [
      { id: "fn1", n: 1, title: L("The four families", "Die vier families"), blurb: L("Line, parabola, hyperbola, exponential — from the equation and the graph.", "Lyn, parabool, hiperbool, eksponensieel: uit die vergelyking en die grafiek."), built: true },
      { id: "fn2", n: 2, title: L("Line & parabola", "Lyn & parabool"), blurb: L("Gradient, intercepts, happy/sad, turning point, axis of symmetry, range.", "Gradiënt, afsnitte, happy/sad, draaipunt, simmetrie-as, waardeversameling."), built: true },
      { id: "fn3", n: 3, title: L("Hyperbola & exponential", "Hiperbool & eksponensieel"), blurb: L("Asymptotes, branches, growth vs decay, domain & range.", "Asimptote, vlerkies, groei vs verval, definisie- & waardeversameling."), built: true },
      { id: "fn4", n: 4, title: L("Reading a graph", "Lees 'n grafiek"), blurb: L("Read intercepts, turning point, asymptotes, domain & range straight off the graph.", "Lees afsnitte, draaipunt, asimptote, definisie- & waardeversameling reguit van die grafiek af."), built: true },
      { id: "fn5", n: 5, title: L("Inequalities off a graph", "Ongelykhede uit 'n grafiek"), blurb: L("Increasing/decreasing, f(x) > 0 or < 0, and the f·g and x·f sign rules.", "Stygend/dalend, f(x) > 0 of < 0, en die tekenreëls vir f·g en x·f."), built: true },
      { id: "fn6", n: 6, title: L("Transformations", "Transformasies"), blurb: L("Shifts, reflections and stretches — the rule and what it does.", "Skuiwe, refleksies en rek: die reël en wat dit doen."), built: true },
      { id: "fn7", n: 7, title: L("Graphs together", "Grafieke saam"), blurb: L("Intersections, f vs g, nature of roots, average gradient, max length.", "Snypunte, f vs g, aard van die wortels, gemiddelde gradiënt, maksimum lengte."), built: true },
    ],
  },
  {
    id: "tgraph", name: L("Trig Graphs", "Trig-grafieke"), paper: "Paper 2", icon: "〰️", term: "revision",
    signature: PALETTE.violet, open: true,
    blurb: L("Sine, cosine and tangent graphs — period, amplitude, range, shifts, drawn to scale.", "Sin-, cos- en tan-grafieke: periode, amplitude, waardeversameling, skuiwe, op skaal geteken."),
    quests: [
      { id: "tg1", n: 1, title: L("The three parent graphs", "Die drie basisgrafieke"), blurb: L("Recognise sin, cos & tan and their key features.", "Herken sin, cos & tan en hul hoofkenmerke."), built: true },
      { id: "tg2", n: 2, title: L("What a, b and q do", "Wat a, b en q doen"), blurb: L("Reflect, stretch, squash and slide the graph.", "Reflekteer die grafiek, rek dit, druk dit saam en skuif dit."), built: true },
      { id: "tg3", n: 3, title: L("Period, amplitude & range", "Periode, amplitude & waardeversameling"), blurb: L("Find all three — from the equation and off the graph.", "Vind al drie: uit die vergelyking en van die grafiek af."), built: true },
      { id: "tg4", n: 4, title: L("Horizontal & vertical shifts", "Horisontale & vertikale skuiwe"), blurb: L("Which way and how far — and factoring b out first.", "Watter kant toe en hoe ver, en eers b as faktor uithaal."), built: true },
      { id: "tg5", n: 5, title: L("The tangent graph", "Die tan-grafiek"), blurb: L("Asymptotes, intercepts, period 180° and finding a.", "Asimptote, afsnitte, periode 180° en a vind."), built: true },
      { id: "tg6", n: 6, title: L("Find the equation", "Vind die vergelyking"), blurb: L("Read a, b and q off a graph and write the equation.", "Lees a, b en q van 'n grafiek af en skryf die vergelyking."), built: true },
      { id: "tg7", n: 7, title: L("Putting it together", "Alles saam"), blurb: L("Two graphs at once: higher/lower, positive, intersections.", "Twee grafieke tegelyk: hoër/laer, positief, snypunte."), built: true },
    ],
  },
  {
    id: "analytical", name: L("Analytical Geometry", "Analitiese Meetkunde"), paper: "Paper 2", icon: "📍", term: "revision",
    signature: PALETTE.cyan, open: true,
    blurb: L("Points, lines and gradients on the grid — the right formula, drawn to scale.", "Punte, lyne en gradiënte op die rooster: die regte formule, op skaal geteken."),
    quests: [
      { id: "ag1", n: 1, title: L("Which formula, and what it tells you", "Watter formule, en wat dit vir jou sê"), blurb: L("Gradient, distance or midpoint — and what each answer looks like.", "Gradiënt, afstand of middelpunt, en hoe elke antwoord lyk."), built: true },
      { id: "ag2", n: 2, title: L("Gradient: sign & special lines", "Gradiënt: teken & spesiale lyne"), blurb: L("Positive, negative, zero or undefined — and the horizontal/vertical traps.", "Positief, negatief, nul of onbepaald, en die horisontale/vertikale slaggate."), built: true },
      { id: "ag3", n: 3, title: L("Parallel & perpendicular", "Ewewydig & loodreg"), blurb: L("Equal gradients vs the −1 product, and the negative reciprocal.", "Gelyke gradiënte vs die produk −1, en die negatiewe resiprook."), built: true },
      { id: "ag4", n: 4, title: L("Angle of inclination", "Inklinasiehoek"), blurb: L("Acute or obtuse? When to take 180° − the SHIFT tan answer, and don’t type the negative in.", "Skerp of stomp? Wanneer om 180° − die SHIFT tan-antwoord te neem, en moenie die negatief intik nie."), built: true },
      { id: "ag5", n: 5, title: L("Perpendicular bisector", "Middelloodlyn"), blurb: L("Through the midpoint AND at right angles — spot it and tap it.", "Deur die middelpunt EN loodreg: sien dit raak en klik daarop."), built: true },
      { id: "ag6", n: 6, title: L("Area of a triangle", "Oppervlakte van 'n driehoek"), blurb: L("Read the base and the ⊥height — altitude vs median.", "Lees die basis en die ⊥hoogte: hoogtelyn vs swaartelyn."), built: true },
      { id: "ag7", n: 7, title: L("Putting it together", "Alles saam"), blurb: L("Median/altitude/bisector, and the ‘to prove…, show…’ table.", "Swaartelyn/hoogtelyn/middelloodlyn, en die ‘om te bewys…, toon aan…’-tabel."), built: true },
    ],
  },
  {
    id: "pat", name: L("Number Patterns", "Getalpatrone"), paper: "Paper 1", icon: "🔢", term: "revision",
    signature: PALETTE.gold, open: true,
    blurb: L("Linear, quadratic and geometric patterns — the difference pyramid and the general term.", "Lineêre, kwadratiese en meetkundige patrone: die verskilpiramide en die algemene term."),
    quests: [
      { id: "np1", n: 1, title: L("Spot the pattern", "Herken die patroon"), blurb: L("First & second differences, constant ratio — arithmetic, quadratic or geometric?", "Eerste & tweede verskille, konstante verhouding: rekenkundig, kwadraties of meetkundig?"), built: true },
      { id: "np2", n: 2, title: L("Arithmetic patterns", "Rekenkundige patrone"), blurb: L("Constant difference, Tₙ = an + c, find a term and which term.", "Konstante verskil, Tₙ = an + c, vind 'n term en watter term."), built: true },
      { id: "np3", n: 3, title: L("Quadratic patterns", "Kwadratiese patrone"), blurb: L("The difference pyramid → a, b, c and Tₙ = an² + bn + c.", "Die verskilpiramide → a, b, c en Tₙ = an² + bn + c."), built: true },
      { id: "np4", n: 4, title: L("Find a missing term", "Vind 'n ontbrekende term"), blurb: L("The second difference is constant — use it to fill the gap.", "Die tweede verskil is konstant: gebruik dit om die gaping te vul."), built: true },
      { id: "np5", n: 5, title: L("Minimum & maximum", "Minimum & maksimum"), blurb: L("The turning point of the pattern: which term, and its value.", "Die draaipunt van die patroon: watter term, en sy waarde."), built: true },
      { id: "np6", n: 6, title: L("Gaps between terms", "Gapings tussen terme"), blurb: L("The first differences are their own linear pattern.", "Die eerste verskille vorm hul eie lineêre patroon."), built: true },
      { id: "np7", n: 7, title: L("Geometric patterns", "Meetkundige patrone"), blurb: L("Constant ratio, Tₙ = a·rⁿ⁻¹, and the r-as-a-fraction traps.", "Konstante verhouding, Tₙ = a·rⁿ⁻¹, en die slaggate as r 'n breuk is."), built: true },
    ],
  },
  {
    id: "exp", name: L("Exponents & Surds", "Eksponente & Wortelvorme"), paper: "Paper 1", icon: "ⁿ√", term: "revision",
    signature: PALETTE.fuchsia, open: true,
    blurb: L("The laws, the traps, and the theory — which rule, which factorising, the conjugate, and when there's no solution.", "Die wette, die slaggate, en die teorie: watter reël, watter faktorisering, die toegevoegde wortelvorm, en wanneer daar geen oplossing is nie."),
    quests: [
      { id: "es1", n: 1, title: L("The exponent laws", "Die eksponentwette"), blurb: L("Name the law and say what happens to the exponents — zero, negative, fractional, brackets.", "Benoem die wet en sê wat met die eksponente gebeur: nul, negatief, breuk, hakies."), built: true },
      { id: "es2", n: 2, title: L("Spot the trap", "Vind die slaggat"), blurb: L("Is this step legal? The base that mustn't change, x⁰, negative ≠ negative, (x+y)² ≠ x²+y².", "Is hierdie stap wettig? Die grondtal wat nie mag verander nie, x⁰, negatief ≠ negatief, (x+y)² ≠ x²+y²."), built: true },
      { id: "es3", n: 3, title: L("First step & which method", "Eerste stap & watter metode"), blurb: L("Prime factors first; one-term simplify vs factorise when there's a + or −; the cancelling rule.", "Eers priemfaktore; vereenvoudig een term, maar faktoriseer by 'n + of −; die kanselleerreël."), built: true },
      { id: "es4", n: 4, title: L("Which “divorce”?", "Watter “egskeiding”?"), blurb: L("Classify the factorising: common factor, difference of squares, trinomial or grouping — and let k = baseˣ.", "Klassifiseer die faktorisering: gemene faktor, verskil van twee vierkante, drieterm of groepering, en stel k = grondtalˣ."), built: true },
      { id: "es5", n: 5, title: L("Surd laws & traps", "Wortelvormwette & slaggate"), blurb: L("Same-root × and ÷, the BIG NO-NO, like surds, inside/outside, non-real roots and ± answers.", "Dieselfde wortel × en ÷, die GROOT NEE-NEE, gelyksoortige wortelvorme, binne/buite, nie-reële wortels en ±-antwoorde."), built: true },
      { id: "es6", n: 6, title: L("Conjugates & rationalising", "Toegevoegde wortelvorme & rasionalisering"), blurb: L("What the conjugate is, why it works, rationalising one- and two-term denominators, the a + b√c form.", "Wat die toegevoegde wortelvorm is, hoekom dit werk, rasionaliseer noemers met een of twee terme, die a + b√c-vorm."), built: true },
      { id: "es7", n: 7, title: L("Rational-exponent equations", "Vergelykings met rasionale eksponente"), blurb: L("Raise to the reciprocal; when the answer is ±, a single (negative) value, or no real solution.", "Verhef tot die resiprook; wanneer die antwoord ± is, een (negatiewe) waarde, of daar geen reële oplossing is nie."), built: true },
      { id: "es8", n: 8, title: L("No-solution & strategy", "Geen oplossing & strategie"), blurb: L("Exponential & surd equations: same base, common factor, let k, isolate-square-TEST, and every no-solution trap.", "Eksponensiële & wortelvormvergelykings: dieselfde grondtal, gemene faktor, stel k, isoleer-kwadreer-TOETS, en elke slaggat sonder oplossing."), built: true },
    ],
  },
  {
    id: "eqn", name: L("Equations & Inequalities", "Vergelykings & Ongelykhede"), paper: "Paper 1", icon: "±", term: "revision",
    signature: PALETTE.blue, open: true,
    blurb: L("Which method, which move — brackets = 0, the k-method, restrictions, the bowl, and Δ. Theory and traps, no crunching.", "Watter metode, watter stap: hakies = 0, die k-metode, beperkings, die bak, en Δ. Teorie en slaggate, geen syferwerk nie."),
    quests: [
      { id: "eq1", n: 1, title: L("Standard form & brackets = 0", "Standaardvorm & hakies = 0"), blurb: L("Everything to one side; each bracket = 0 (don't multiply out!); roots ↔ factors; EQN mode.", "Alles na een kant; elke hakie = 0 (moenie uitvermenigvuldig nie!); wortels ↔ faktore; EQN-modus."), built: true },
      { id: "eq2", n: 2, title: L("The special cases", "Die spesiale gevalle"), blurb: L("No b, no c, x² = negative; same-base exponents, 2ˣ = −4, and where x^(2/3) = 16 gets its ±.", "Geen b, geen c, x² = negatief; eksponente met dieselfde grondtal, 2ˣ = −4, en waar x^(2/3) = 16 sy ± kry."), built: true },
      { id: "eq3", n: 3, title: L("The k-method", "Die k-metode"), blurb: L("A repeated bracket → let k stand for it. What k is, why you're not done at k, and the restriction that rides along.", "'n Herhaalde hakie → laat k daarvoor staan. Wat k is, hoekom jy nie by k klaar is nie, en die beperking wat saamry."), built: true },
      { id: "eq4", n: 4, title: L("Fractions & restrictions", "Breuke & beperkings"), blurb: L("Factorise the denominators, the negative twin, the LCD — and restrictions BEFORE you solve.", "Faktoriseer die noemers, die negatiewe tweeling, die KGV, en beperkings VOORDAT jy oplos."), built: true },
      { id: "eq5", n: 5, title: L("Perfect squares & the turning point", "Volkome vierkante & die draaipunt"), blurb: L("c = (b/2)² (only when a = 1!), the k sign trap, and reading TP(p ; q) — p flips, q doesn't.", "c = (b/2)² (net as a = 1!), die slaggat met k se teken, en DP(p ; q) aflees: p draai om, q nie."), built: true },
      { id: "eq6", n: 6, title: L("The formula & simultaneous", "Die formule & gelyktydige vergelykings"), blurb: L("When to use it, the two lines you must show, signs into the calculator, and the substitution method.", "Wanneer om dit te gebruik, die twee reëls wat jy moet wys, tekens in die sakrekenaar, en die vervangingsmetode."), built: true },
      { id: "eq7", n: 7, title: L("Inequalities: flip & the bowl", "Ongelykhede: omdraai & die bak"), blurb: L("Switch the sign on × or ÷ negative; CP; inside the bowl vs left/right — read it off the sketch.", "Draai die teken om by × of ÷ met 'n negatief; kritieke waardes; binne die bak vs links/regs: lees dit van die skets af."), built: true },
      { id: "eq8", n: 8, title: L("Nature of roots & know the difference", "Aard van die wortels & ken die verskil"), blurb: L("Δ = b² − 4ac, the three pictures, the three question types — and no solution vs undefined vs non-real vs N.A.", "Δ = b² − 4ac, die drie prentjies, die drie soorte vrae, en geen oplossing vs onbepaald vs nie-reëel vs n.v.t."), built: true },
      /* eq9 (2026-08-23) — her own two handwritten pages on equations with
         rational exponents, added because her Grade 11 learner kept confusing
         herself. Teaches first (reveal frames), then ten pick-the-outcome
         questions. Seeded CLOSED on live — supabase/migration-eq9-solution-count.sql. */
      { id: "eq9", n: 9, title: L("Two, one or no solution?", "Twee, een of geen oplossing?"), blurb: L("Rational-exponent equations: even numerator → ±, odd-only → a negative is fine, even anywhere with a negative → no solution.", "Vergelykings met rasionale eksponente: ewe teller → ±, net onewe → 'n negatief is reg, ewe iewers met 'n negatief → geen oplossing."), built: true },
    ],
  },
  /* GENERAL TRIG (id gtrig) — her 13 drill rounds, GENERAL-TRIG-BUILD-PLAN.md.
     Stage 2 (2026-08-22) built gt1–gt3 (discovery, XP-once); stage 3
     (same day) adds gt4–gt7 (co-functions, reductions ×2, TIP Chips).
     gt8–gt13 are listed here so the chapter map is complete, but stay
     `built: false` ("Coming soon") until their own stage lands.
     Colour note: the design plan said "gold is free" — it is NOT (2D
     Trigonometry and Number Patterns both already use PALETTE.gold). The
     5-colour CYCLE just keeps rolling: eqn took blue, so gtrig — the next
     chapter added — takes the next colour in the cycle, violet. */
  {
    id: "gtrig", name: L("General Trig", "Algemene Trig"), paper: "Paper 2", icon: "🔄", term: "revision",
    signature: PALETTE.violet, open: true,
    blurb: L("Reductions, co-functions, special angles, general solutions — the angle is the whole story.", "Reduksies, ko-funksies, spesiale hoeke, algemene oplossings: die hoek is die hele storie."),
    quests: [
      { id: "gt1", n: 1, title: L("Introduction", "Inleiding"), blurb: L("What trig means, and where the ratios come from.", "Wat trig beteken, en waar die verhoudings vandaan kom."), built: true },
      { id: "gt2", n: 2, title: L("The Cartesian plane", "Die Cartesiese vlak"), blurb: L("All Strippers Take Cash — why each ratio is + or −.", "All Strippers Take Cash: hoekom elke verhouding + of − is."), built: true },
      { id: "gt3", n: 3, title: L("Special angles & identities", "Spesiale hoeke & identiteite"), blurb: L("The two triangles, Oats Are Healthy, and the masked identities.", "Die twee driehoeke, Oats Are Healthy, en die gemaskerde identiteite."), built: true },
      { id: "gt4", n: 4, title: L("Co-functions", "Ko-funksies"), blurb: L("Convert between sin and cos — and the cos(90°+x) trap.", "Skakel om tussen sin en cos, en die cos(90°+x)-slaggat."), built: true },
      /* her reorder, 2026-08-22 evening: TIP Chips → variables → numbers ("it will
         flow better"). Ids stay (exam lostQuest → gt5, progress rows); only n and
         the live `sort` change (migration-gtrig-reorder.sql). */
      { id: "gt6", n: 5, title: L("Reductions TIP Chips", "Reduksies TIP Chips"), blurb: L("The five TIP Chips, revised.", "Die vyf TIP Chips, hersien."), built: true },
      { id: "gt7", n: 6, title: L("Reductions: variables", "Reduksies: veranderlikes"), blurb: L("Reductions with x or θ instead of a number.", "Reduksies met x of θ in plaas van 'n getal."), built: true },
      { id: "gt5", n: 7, title: L("Reductions: numbers", "Reduksies: getalle"), blurb: L("Quadrant, formula, sign, ratio — the reduction routine, step by step.", "Kwadrant, formule, teken, verhouding: die reduksieroetine, stap vir stap."), built: true },
      { id: "gt8", n: 8, title: L("Special sums", "Spesiale somme"), blurb: L("Pick the quadrant, the app draws the triangle, evaluate.", "Kies die kwadrant, die app teken die driehoek, bereken."), built: true },
      { id: "gt9", n: 9, title: L("Identities: the next step", "Identiteite: die volgende stap"), blurb: L("Spot the move — LCD, masked identity, what simplifies.", "Herken die stap: KGV, gemaskerde identiteit, wat vereenvoudig."), built: true },
      { id: "gt10", n: 10, title: L("Super special sums", "Superspesiale somme"), blurb: L("Where 1 and k (or t) go on the triangle.", "Waar 1 en k (of t) op die driehoek kom."), built: true },
      { id: "gt11", n: 11, title: L("General solution: the six types", "Algemene oplossing: die ses tipes"), blurb: L("Name the type, pick the method.", "Benoem die tipe, kies die metode."), built: true },
      { id: "gt12", n: 12, title: L("General solution: last steps", "Algemene oplossing: laaste stappe"), blurb: L("The quadrant cross, then the reference angle.", "Die kwadrantkruis, dan die verwysingshoek."), built: true },
      { id: "gt13", n: 13, title: L("Undefined values", "Onbepaalde waardes"), blurb: L("Which terms must be equated to zero.", "Watter terme aan nul gelykgestel moet word."), built: true },
    ],
  },
];

/* ============================================================
   EXAM-FOCUS-ONLY CHAPTERS (her ruling, morning of 2026-08-22 —
   EXAM-FOCUS-PLAN.md, "Her rulings, morning of 2026-08-22"):
   "Euclidean gets ITS OWN CHAPTER inside Blipwork — an EXAM-FOCUS-ONLY
   chapter. No drill quests (Circle Quest still owns those), so it
   appears in the Exam Focus tab only, never as a hub quest chapter."

   THIS IS A SEPARATE LIST ON PURPOSE, and that separation IS the
   mechanism. Everything that draws the rest of the app — the hub's
   Term 3 / Revision quest cards, the 🎲 dice, the admin quest
   open/close grid, assigned homework, the dashboard chips — iterates
   CHAPTERS and only CHAPTERS, so a chapter listed here is structurally
   invisible to all of them; there is no flag to forget to set. Only the
   Exam Focus screens (js/screens.js) look at both lists, through
   examChapters() / examChapterById() below.

   An entry mirrors a CHAPTERS entry's shape so the exam tab can render
   it with the identical card code, with two differences: `quests` is
   empty (it owns none, by design) and `examOnly: true` marks it for
   examChapterEligible()'s documented exception in js/screens.js.

   Icon: 🧭 rather than ⭕ — the hub already has an "⭕ Circle Geo" tab
   pointing at Circle Quest, and two circles side by side in the same
   hub would read as the same destination. Flag it if she'd rather have
   a different one; nothing else depends on the choice.
   ============================================================ */
export const EXAM_ONLY_CHAPTERS = [
  {
    id: "euclid", name: L("Euclidean Geometry", "Euklidiese Meetkunde"), paper: "Paper 2", icon: "🧭", term: "exam-only",
    signature: PALETTE.violet, open: true, examOnly: true,
    blurb: L("Circle theorems, tangents and cyclic quads — real exam questions, one part at a time.", "Sirkelstellings, raaklyne en koordevierhoeke: regte eksamenvrae, een deel op 'n slag."),
    quests: [],
  },
  /* ALGEBRAIC EXPRESSIONS (her ruling, 2026-08-23 morning —
     EXAM-BUILD-DAY.md ruling 2): "Algebraic expressions (Gr10 revision)
     gets its own exam-only chapter — that is where the 30%-learners will
     earn their marks." The SECOND exam-focus-only chapter, and it works
     exactly like euclid above: no drill quests of its own (Blipwork has
     no Grade-10 expanding/factorising rounds, and none are planned), so
     it is structurally invisible to the hub's Term 3 / Revision tabs,
     the 🎲 dice, the admin open/close grid, assignments and the
     dashboard — all of which iterate CHAPTERS and only CHAPTERS. Its
     examOnly:true flag is what lets examChapterEligible() reach it on
     the build flag alone, since the "at least one open quest" half of
     the gate can never be satisfied for a chapter that owns none.
     Icon 🧩 — the pieces-fitting-together one, and unused elsewhere in
     the app. Colour: PALETTE.mint, added above for it. */
  {
    id: "algx", name: L("Algebraic Expressions", "Algebraïese Uitdrukkings"), paper: "Paper 1", icon: "🧩", term: "exam-only",
    signature: PALETTE.mint, open: true, examOnly: true,
    blurb: L("Expanding, factorising and algebraic fractions — the Grade 10 skills the exam still expects.", "Uitbrei, faktoriseer en algebraïese breuke: die Graad 10-vaardighede wat die eksamen steeds verwag."),
    quests: [],
  },
];

export function chapterById(id) { return CHAPTERS.find(c => c.id === id) || null; }

/* THE EXAM FOCUS TAB'S DISPLAY ORDER (session A of the exam build day,
   2026-08-23). Plain English: this is the order the chapter cards appear
   in when a learner opens the 📝 Exam Focus tab — BASICS FIRST.

   It exists because the natural order was wrong for the learners this
   tab was widened for. examChapters() used to hand back CHAPTERS in
   their hub order and then the exam-only ones on the end, which put
   Algebraic Expressions LAST, after Euclidean geometry — the Grade 10
   revision chapter that her weakest learners have to meet FIRST was the
   one they had to scroll furthest to reach (EXAM-BUILD-DAY.md ruling 2:
   "that is where the 30%-learners will earn their marks").

   "trig" is deliberately absent: 2D Trig is hidden from Exam Focus for
   now (her ruling 9), so it never renders. Nothing can vanish by being
   left off this list either — a flagged chapter whose id is missing
   simply falls to the END, in its existing order, which is what the
   stable sort below guarantees. */
export const EXAM_TAB_ORDER = ["algx", "exp", "eqn", "func", "tgraph", "gtrig", "euclid"];

/* Every chapter the EXAM FOCUS tab may show — quest chapters and
   exam-only ones together, in EXAM_TAB_ORDER. Exam-focus screens use
   this and examChapterById() instead of CHAPTERS / chapterById; nothing
   else does. The sort is STABLE and total: anything not named in
   EXAM_TAB_ORDER keeps its relative position at the back rather than
   disappearing. */
export function examChapters() {
  const all = CHAPTERS.concat(EXAM_ONLY_CHAPTERS);
  const rank = id => { const i = EXAM_TAB_ORDER.indexOf(id); return i === -1 ? EXAM_TAB_ORDER.length : i; };
  return all
    .map((c, i) => ({ c, i }))
    .sort((a, b) => (rank(a.c.id) - rank(b.c.id)) || (a.i - b.i))
    .map(x => x.c);
}
export function examChapterById(id) { return chapterById(id) || EXAM_ONLY_CHAPTERS.find(c => c.id === id) || null; }
/* every quest in a chapter shares its chapter's one flat accent —
   no per-quest shade ramp in the solid-colour palette. */
export function questAccent(chapter) {
  return (chapter && chapter.signature) || PALETTE.blue;
}

/* XP economy — small, understanding-first. Streak multiplier caps low (×1–×3)
   so grinding the same skill never out-earns genuine progress. No leaderboard. */
export const XP = {
  perCorrect: 10,
  firstTryBonus: 5,
  streakCap: 3,          // streak multiplier on the base, capped at ×3
};

/* answer tolerances. Calc answers match to the question's stated decimal
   places within a tiny epsilon (so a legit rounding step never fails). Values
   read off a graph are inherently approximate — accept a small band. */
export const TOL = {
  calcEps: 0.001,        // numeric equality slack at the stated dp
  graphRead: 2,          // ±2 on a value read off an ogive / box plot
};

export const PASS = 0.8;           // 80% (first-try) to pass a quest and earn its badge
export const INACTIVE_DAYS = 7;    // admin inactivity flag (used later)

/* DICE-PLAN.md — chapters where the 🎲 dice (generative practice rounds)
   shows on the chapter screen. A chapter id only ever belongs here once
   it has BOTH a real recipe pool wired into js/quests/dice-pools.js AND
   Megan's phone-test green light (her rhythm, one chapter at a time —
   see DICE-PLAN's build order). Session 0b (2026-08-21) built the
   infrastructure only. Session 1 (2026-08-21) wires the real Statistics
   pool and flips it on here — the STATISTICS PILOT going live at the
   next ship; Megan phone-tests on live before any other chapter lights
   up (DICE-PLAN's rhythm — this is not a green light for chapter 2).
   2026-08-23 (her brief for the day: "dice rounds for other chapters"):
   Finance, Number Patterns ("pat") and 2D Trigonometry pools built by
   three parallel sessions from the Stats recipe, each harnessed and
   PNG-reviewed; all three lit here at the same ship, her phone-test
   per chapter follows on live.
   Wave 2 (2026-08-24 ship): eqn, exp, func — built overnight 2026-08-23/24,
   foreman-reviewed (own harness runs + own 375px crop reads), lit here.
   Wave 3 (2026-08-24 midday ship): gtrig — 67 entries, roundLength 5
   (deliberate, not the house median — see dice-gtrig.js's header),
   gt1 out by her ruling, quadrantal + chip3 in by her rulings. */
export const DICE_CHAPTERS = ["stats", "finance", "pat", "trig", "eqn", "exp", "func", "gtrig"];

/* FUNFUN-PART2-BRIEF.md — the 📈 Fun Functions strip on the Functions
   chapter screen. Fun Functions is its own app (the graph-quest repo,
   also live standalone at megzieberr.github.io/graph-quest); blipwork
   mounts one of its 15 quests at a time inside a shadow root and pays out
   its own XP. This one switch gates the strip, and the strip renders only
   when it is true AND the chapter is "func".

   The server side (supabase/migration-funfun.sql) is safe to apply before
   any of this ships — nothing calls those RPCs until the client does, so
   this flag is the seeded-closed equivalent. Session 1 (2026-08-23) built
   the plumbing; the strip and the play screen are session 2's, and the
   flag only earns its `true` once Megan has phone-tested the whole loop
   at 375px (her one-chapter-at-a-time rhythm, same as the dice). */
export const FUNFUN_ENABLED = true;

/* Circle Geo tab (CQ-BRIDGE-PLAN.md Part 2, 2026-08-21). Circle Quest stays
   its own app, reached by a plain out-link — never merged, never iframed. */
export const CQ_URL = "https://megzieberr.github.io/circle-geo-quest/";

/* FEEDBACK-PAPERS-BRIEF.md (2026-08-24) — the two things the learners
   asked for. Both ship CLOSED and the foreman flips them at ship, the
   same seeded-closed posture FUNFUN_ENABLED had.

   FEEDBACK_ENABLED gates the 💬 button (js/feedback.js) on every
   logged-in screen AND the Feedback section in admin.html. The server
   side (supabase/migration-feedback-papers.sql) is safe to apply before
   any of this ships — nothing calls those RPCs until this flag is true. */
export const FEEDBACK_ENABLED = true;

/* PAPERS_ENABLED gates the 📄 Papers hub tab (js/papers.js) and the
   Papers section in admin.html. It stays false until the two edge
   functions (paper-url, paper-admin) are DEPLOYED and at least one
   paper is uploaded — a lit tab over an empty private bucket is a dead
   end, and the learner cannot tell "nothing here yet" from "broken". */
export const PAPERS_ENABLED = true;

/* ============================================================
   BLIP — Phase 2 feeding/growth/sickness constants (2026-07-19).
   THESE ARE A DISPLAY MIRROR ONLY. The server (supabase/schema.sql +
   migration-phase2-blip-care.sql) is the single source of truth for
   health, growth, prices, and every guard — the same relationship
   level.js has with _mhq_level. local-backend.js imports these so the
   offline (?local=1) mirror computes the identical numbers; never let
   the UI trust a client-side recompute over a backend reply.
   ============================================================ */
export const BLIP = {
  // cumulative free-cookie feedings needed for growth stage 1 / 2 / 3
  // (stage 0 = tiny). growthStage = count of thresholds <= feedCount.
  growthThresholds: [10, 25, 45],
  // days_unfed (qualifying weekdays) at which each sickness stage begins:
  // 0 healthy 0–2 · 1 tired 3–4 · 2 bedridden 5–6 · 3 critical 7+.
  sickThresholds: { tired: 3, bedridden: 5, critical: 7 },
  // pharmacy / grocery prices — MIRROR of the server shop_items rows.
  food: { soup: 15, medicine: 20, treat: 8 },
  /* Level milestone that unlocks the 2nd blip. HER CALL 2026-08-12: 10 -> 20.
     Level 10 arrived too soon once the curve capped at 40 and the milestone
     boxes landed at 10/20/30/40 — a second Blip at 20 is a milestone reward
     rather than something that turns up while the first one is still new.
     ⚠️ THIS CONSTANT IS NOT THE ENFORCED ONE. mhq_claim_second_blip's own
     `lvl < 20` is what actually refuses, and js/local-backend.js mirrors it
     by reading this value. Change one, change both — and js/blip.js must
     READ this rather than hard-code a number, which it used to do (it said
     `level >= 10` outright, so the card could appear at a level the server
     would refuse). */
  secondBlipLevel: 20,
  careDaysToHeal: 3,               // consecutive qualifying care days to fully heal
};

/* ============================================================
   MOOD METER + CRAVINGS (build day 2026-08-21, session B).
   THIS IS A DISPLAY MIRROR ONLY — the server (supabase/migration-mood-
   cravings.sql, WRITTEN NOT RUN as of this session; supabase/schema.sql
   mirrors it) is the single source of truth. Same relationship BLIP
   above has with the real health/growth RPCs: never let the UI trust a
   client-side recompute over a backend reply.

   Design (her ruling, 2026-08-21): buying food changed nothing visible
   — growth stays cookie-only (can never be bought, standing rule) — so
   food needed its own job. That job is MOOD: 0-5 hearts, per blip.
   Effective mood decays `dailyDecay` per day since it was last topped
   up (never below 0), computed at READ time, never stored. Gains are
   applied server-side at eat time: any bought food is `foodGain`, the
   day's ONE deterministic CRAVED food (js/local-backend.js /
   _mhq_craving in the SQL) is `cravingGain`, the free daily cookie is
   `cookieGain`. Capped at `max`. */
export const MOOD = {
  max: 5,
  dailyDecay: 2,
  foodGain: 1,
  cravingGain: 2,
  cookieGain: 1,
};

/* ============================================================
   EXAM FOCUS — infrastructure build (EXAM-FOCUS-PLAN.md, session 0,
   2026-08-21). THIS FLAG IS THE SWITCH, exactly like DICE_CHAPTERS above:
   a chapter id only ever belongs here once BOTH real seeded questions
   exist for it (js/exam/index.js's registry) AND — same relationship as
   examChapterEligible() in js/screens.js adds on top — at least one of
   its quests is open, which the flag alone does not control.

   PILOT SEEDED (session D, 2026-08-21): eqn / nature-of-roots, four
   questions. WIDENED (day session, 2026-08-22, registering overnight
   run #1 — OVERNIGHT-1-REPORT.md): exp, func and trig now carry real
   seeded questions too (js/exam/index.js), so all four flip on here.
   EUCLIDEAN ADDED (day session, 2026-08-22): the Circle Quest engine
   port landed, its two composed modules are registered, and her
   morning ruling gave Euclidean its own EXAM-FOCUS-ONLY chapter
   (EXAM_ONLY_CHAPTERS above). It is the first id here that owns no
   quests at all, which is why examChapterEligible() in js/screens.js
   carries a documented exception for exam-only chapters — for them
   this flag is the whole gate. The class
   still is not invited to the app at all (a separate, earlier gate), so
   nothing here is learner-visible on live regardless — this flag only
   controls what's REACHABLE once she opens the app up.

   GENERAL TRIG ADDED (stage 4 of the gtrig build, 2026-08-22): her
   ruling that morning — "I see the exam focus listed the reductions,
   ratios and general solutions under 2D Trig. Once you're done with the
   General Trig Rounds, you can just list these exam focus questions
   under the General Trig tab and connect it to the correct rounds." The
   two questions moved chapter in js/exam/index.js; this flag is what
   makes the gtrig exam tab reachable at all. It still shows only once
   she has opened at least one gtrig round — examChapterEligible() in
   js/screens.js adds that half of the gate on top, exactly as it does
   for every non-exam-only chapter.

   THE EXAM BUILD DAY LIST (2026-08-23, EXAM-BUILD-DAY.md). Seven
   chapters, and two changes from yesterday's six:

     · "algx" JOINS — Algebraic Expressions, the second EXAM-FOCUS-ONLY
       chapter (EXAM_ONLY_CHAPTERS above). Like euclid it owns no
       quests, so this flag is its whole gate.
     · "tgraph" JOINS — Trig Graphs. An ORDINARY quest chapter (rounds
       tg1–tg7 in CHAPTERS above), so the open-quest half of the gate
       applies to it exactly as it does to func: its Exam Focus screens
       only appear once she has opened at least one of tg1–tg7.
     · "trig" LEAVES — her ruling this morning (EXAM-BUILD-DAY.md ruling
       9): "2D Trig is HIDDEN from Exam Focus for now." Nothing was
       deleted — the chapter's one card (js/exam/cards-trig.js) and its
       skills.js entry both stay exactly where they are, so putting it
       back later is a one-word edit here. It simply stops being
       reachable in the tab.
   */
export const EXAM_CHAPTERS = ["algx", "eqn", "exp", "func", "tgraph", "gtrig", "euclid"];

/* Pay-per-completed-question, her kickoff ruling (2026-08-21), re-rated
   2026-08-23 to 50 XP + 5 gold (see the block at the end of this comment):
   flat pay, ONCE per question ever (re-opening an already-completed
   question pays nothing — the served RPC's `completed` flag is the
   dedupe). THIS IS A DISPLAY MIRROR ONLY, same relationship BLIP/MOOD
   above have with their RPCs — supabase/migration-exam-focus.sql
   (WRITTEN NOT RUN) carries the real, server-side literal amounts;
   js/local-backend.js's offline mirror and verify-exam.html's SQL↔config
   literal cross-check both read THIS block, never a hardcoded number of
   their own. "Completed" = every part's memo has been revealed (the
   client reports each part-reveal as it happens; the server derives
   completion and pays once — there is no correctness signal, by design:
   the app never marks the learner's own work).

   PAY CHANGED 2026-08-23 (her ruling, EXAM-BUILD-DAY.md ruling 7):
   75 XP + 10 💎 → 50 XP + 5 💎 per completed card. The exam bank is
   about to go from ~50 cards to several hundred, and the old rate would
   have made Exam Focus by far the fastest way to earn in the whole app.
   THE SERVER LITERAL LIVES IN THE NEW MIGRATION —
   supabase/migration-exam-xp-50.sql (WRITTEN, NOT RUN as of this
   session): it re-creates mhq_exam_open_part with 50 / 5 in place of
   75 / 10 and changes nothing else. verify-exam.html Part 5 cross-checks
   THIS block against THAT file. The original
   supabase/migration-exam-focus.sql keeps its 75 / 10 on purpose — it is
   the applied history of what ran on 2026-08-21, not a live mirror. */
export const EXAM = {
  xpPerQuestion: 50,
  goldPerQuestion: 5,
};
