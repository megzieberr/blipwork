"""Resolve every QUEUE.md translation row (T..) to its files and verify page.
Prints: ROW | status | page | words | files   (and complains when a file is missing or the count differs).
"""
import re, sys, os, glob
sys.stdout.reconfigure(encoding="utf-8")
REPO = r"C:\Users\megzi\Desktop\Claude Code Projects\maths-homework-quest"
os.chdir(REPO)

CHAPTER_PAGE = {"exp": "verify-exp", "eqn": "verify-eq", "pat": "verify-patterns", "analytical": "verify-analytical",
                "func": "verify-func", "trig": "verify-trig", "tgraph": "verify-tgraph", "gtrig": "verify-gtrig",
                "finance": "verify-finance", "stats": "verify", "prob": "verify-prob", "meas": "verify-meas"}

def numkey(path):
    stem = os.path.basename(path)
    return [int(t) if t.isdigit() else t for t in re.split(r"(\d+)", stem)]

def quests_between(a, b):
    """all js/quests/<prefix>N-*.js from a to b inclusive, numeric order; prefix = letters before the first digit"""
    pre = re.match(r"[a-z_]+", a).group(0)
    files = sorted((p.replace("\\", "/") for p in glob.glob(f"js/quests/{pre}[0-9]*.js")), key=numkey)
    stems = [os.path.basename(f)[:-3] for f in files]
    if a not in stems or b not in stems:
        return None, f"range ends not found: {a} {b} in {stems}"
    return files[stems.index(a): stems.index(b) + 1], None

rows = []
for ln in open("QUEUE.md", encoding="utf-8-sig"):
    m = re.match(r"^- (☐|⏳ [\d-]+ [\d:]+|☑ [\d-]+(?: [\d:]+)?) (T\d+) \| (concepts|hub rounds|exam): (.*?) \| ~?([\d ]+) words?.*?(?:\| (?:verify page: )?(verify[\w-]*)\.html)?", ln)
    if not m:
        continue
    mark, rid, kind, what, words, page = m.groups()
    pm = re.search(r"(verify[\w-]*)\.html", ln)
    page = pm.group(1) if pm else None
    status = mark[0]
    files, err = [], None
    if kind == "concepts":
        blk = re.search(r"`(\w+)` block", what).group(1)
        files = [f"js/concepts/{blk}.js"]
        page = page or CHAPTER_PAGE[blk]
    elif kind == "hub rounds":
        body = what.split("(")[0].strip()
        if "…" in body:
            a, b = [s.strip() for s in body.split("…")]
            files, err = quests_between(a, b)
        else:
            files = [f"js/quests/{body}.js"]
    elif kind == "exam":
        stems = [s.strip() for s in what.split("(")[0].split(",")]
        files = [f"js/exam/{s}.js" for s in stems]
        page = page or "verify-exam"
    n = re.search(r"\((\d+) files\)", what)
    if files and n and int(n.group(1)) != len(files):
        err = f"count says {n.group(1)}, resolved {len(files)}"
    missing = [f for f in (files or []) if not os.path.exists(f)]
    if missing:
        err = f"missing {missing}"
    rows.append((rid, status, page, words.strip(), files, err))

for rid, status, page, words, files, err in rows:
    line = f"{rid} | {status} | {page} | {words} | {' '.join(files or [])}"
    if err:
        line += f"   !! {err}"
    print(line)
