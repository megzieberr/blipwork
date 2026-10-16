# briefs/af: the Afrikaans translation tables (AFRIKAANS-PLAN.md, tools/AF-TOOLS.md)

- `<unit>.en.json` is written by `node tools/af_extract.mjs --unit <unit> <files>`: the English strings, numbered, with where they sit. Nobody edits it by hand.
- `<unit>.af.json` is written by the Opus translator: a flat `{ "<key>": "<Afrikaans>" }`, same keys, same `${...}` and tags. It is the only file a translator writes.
- `node tools/af_inject.mjs <unit>` puts the Afrikaans into the code; the tables stay here as the record of what each row translated.
