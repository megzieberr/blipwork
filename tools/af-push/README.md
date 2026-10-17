# tools/af-push: the manual-push foreman kit (Saturday 2026-10-17, Fable foreman)

Used when Megan runs a big manual night on the Afrikaans queue (the nightly routine has its own prompt and does two rows a night; this kit ran 60 rows in one evening with three Opus workers at a time inside ONE session).

- `afq.py`: QUEUE.md / AF-LOG.md helper. `python afq.py claim T05 T06`, `tick T05`, `red T05 "reason"`, `log "<line>"`, `show T05`. Keeps line endings and BOM.
- `rows.py`: prints every T row as `ROW | status | verify page | words | files` (resolves "queses1-laws … queses5-surds" ranges), so a dispatch message is one line.
- `harness_fails.py`: like tools/harness_run.py but prints the failing check lines under the banner.
- `AF-WORKER-BRIEF.md`: the one brief every translation worker read (one row per worker; the worker runs extract, translates, injects, checks and runs the harness; the foreman commits). Its step 5b is history (closed by S9). The absolute scratchpad paths inside it belong to that session: point them here before reusing.
- `S9-BRIEF.md`: the setup-row brief that made verify-exam's hub checks language-aware (pattern for S10 on verify-gtrig).

Per row the foreman did one message: `afq claim <next>` + `afq tick <done>` + `afq log` + `git add <row files> briefs/af/<row>.*.json QUEUE.md AF-LOG.md` + `git commit -F` (Opus trailer), then dispatched the next worker. Cost: about 150k tokens a row; 60 rows moved the weekly meter about 8 points.

## Second push, 2026-10-17 22:24 onwards (Fable foreman, same shape: the rest of the queue in one evening)
- `AF-WORKER-BRIEF-2.md`: the Saturday brief with the second push's /go block and the closed 5b paragraph removed.
- `S8-BRIEF.md`, `S10-BRIEF.md`, `S7-BRIEF.md`: the three setup rows (af_check allow-list; verify-gtrig language-aware; the finance twin harness).
- `EUCLID-NOTE.md`: her instruction for the Euclid rows: Circle Quest's js/i18n.js first, then the SAG Appendix G reasons from her digest, then the glossary.
- `CODE-ROW-BRIEF.md` + `T93A-LIST.md` / `T93B-LIST.md` / `T93C-LIST.md`: the code rows (T90 to T93), where a worker wraps English by hand; T93 ran as three halves (algebra / trig-stats-prob-meas / finance).
- `commit_row.py`: tick + log + commit one green row in a single call (reads the row's files from its .en.json table; setup rows pass their files as extra arguments).
- Found on the way: S11 (the seven dice test pages parse English, red under ?lang=af before tonight) sits in QUEUE.md as a gated row, her call.
