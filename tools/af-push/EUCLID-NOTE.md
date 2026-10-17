# Euclidean geometry rows (T67 to T72): where the Afrikaans words come from (her instruction 2026-10-17 22:39)

Read this AFTER AF-GLOSSARY.md and BEFORE translating. It adds two sources the glossary was only partly seeded from. Megan's words are law; invent nothing for circle geometry.

## Pecking order for every term
1. **Circle Quest, her own live Afrikaans app for this exact topic:** `C:\Users\megzi\Desktop\Claude Code Projects\circle-geometry-game\js\i18n.js` (360 `{ en: "...", af: "..." }` pairs; read the whole file once, it is 43 KB). Whatever wording Circle Quest uses for a circle-geometry idea, use the same: theorem names, "subtended by", "on the same side of", "opposite angles", "exterior angle", "tangent from a point", "alternate segment", "converse", "prove that", "hence", "RTP"-style phrases, the shapes of reason lines. The glossary rows tagged CQ came from here; the file has more than the glossary.
2. **The SAG reasons, verbatim:** `C:\Users\megzi\Desktop\Tutoring Resources\Graad 12 Curro\Notas & Beplanning\SAG-REDES-DIGEST.md`, section 1 "Aanvaarbare redes (SAG, verbatim)" = IEB Appendix G in Afrikaans (STELLING / AANVAARBARE REDE). Every REASON string in a card (the bracketed reason after a statement, the "reason" field, the ✓ reason lines of a proof) uses the SAG's "verkorte vorm" exactly as the digest prints it. Where the English card's reason is the IEB English short form, map it to the Afrikaans short form on the same table row. Read only section 1 (stop at section 2).
3. **AF-GLOSSARY.md** for everything else (her rulings: middelloodlyn, koordevierhoek, kvh only inside a reason, Midpt∠ / Omtreks∠ inside a reason, raaklyn koord stelling, and so on).
4. Still unsure: the plainest safe everyday word, listed under "Glossary calls Megan should rule on" with the English term and where Circle Quest / the SAG were silent.

## Things that trip translators here
- "Angle" inside a reason is the symbol ∠ in both languages where the English card uses it; keep symbols, letters and labels (A, B, O, ∠ABC, AB ∥ CD) byte-identical.
- "Centre" = middelpunt; "midpoint" is ALSO middelpunt: when a card contrasts the two, say "middelpunt van die sirkel" vs "middelpunt van die koord" so the Afrikaans does not give the answer away or confuse it (a MATHS SLIP of this kind is listed in AF-LOG.md for questag7).
- Her app says "bewys" (prove) and "stelling" (theorem); "converse" = "omgekeerde"; check Circle Quest before using any of these in a new shape.
- Reasons stay SHORT: a reason line must fit a 360 px phone like the English does.

Report, as usual, every Circle-Quest-vs-glossary disagreement you meet (which word you used and why) under "Glossary calls Megan should rule on".
