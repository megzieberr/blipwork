"""Foreman helper: tick + log + commit ONE green row in a single call (second push, 2026-10-17).

usage (from anywhere):
  python commit_row.py <ROW> "<title words>" "<items> items, <words> words" "<log line after the row id>" [extra files...]

What it does, in order:
  1. afq tick <ROW>                      (QUEUE.md: ⏳ -> ☑ today)
  2. afq log "<stamp> | <ROW> | done | <log line>"
  3. git add <the row's files from briefs/af/<ROW>.en.json> briefs/af/<ROW>.en.json briefs/af/<ROW>.af.json
             QUEUE.md AF-LOG.md [extra files]
  4. git commit -F <msg>  with the message "AF: <ROW> <title> (<items> items, <words> words)" + the Opus trailer
Setup rows (S..) have no table: pass their files as extra files and "" for the items/words part.
Prints the short sha. Nothing is pushed.
"""
import json, os, subprocess, sys, datetime, tempfile
sys.stdout.reconfigure(encoding="utf-8")
REPO = r"C:\Users\megzi\Desktop\Claude Code Projects\maths-homework-quest"
KIT = os.path.dirname(os.path.abspath(__file__))
os.chdir(REPO)

row, title, counts, logline = sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4]
extra = sys.argv[5:]

def run(*args, check=True):
    r = subprocess.run(args, capture_output=True, text=True, encoding="utf-8", errors="replace")
    if check and r.returncode != 0:
        print("FAILED:", " ".join(args), "\n", r.stdout, r.stderr); sys.exit(1)
    return r.stdout.strip()

files = []
table = os.path.join("briefs", "af", f"{row}.en.json")
if os.path.exists(table):
    files = json.load(open(table, encoding="utf-8")).get("files", [])
    files.append(table)
    af = os.path.join("briefs", "af", f"{row}.af.json")
    if os.path.exists(af):            # a code row (hand-wrapped twins) may have no .af.json
        files.append(af)
files += extra
files += ["QUEUE.md", "AF-LOG.md"]

print(run(sys.executable, os.path.join(KIT, "afq.py"), "tick", row))
stamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M")
print(run(sys.executable, os.path.join(KIT, "afq.py"), "log", f"{stamp} | {row} | done | {logline}"))
run("git", "add", "--", *files)
msg = f"AF: {row} {title}" + (f" ({counts})" if counts else "") + "\n\nCo-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>\n"
with tempfile.NamedTemporaryFile("w", suffix=".txt", delete=False, encoding="utf-8") as f:
    f.write(msg); p = f.name
run("git", "commit", "-q", "-F", p)
os.unlink(p)
print(run("git", "log", "-1", "--format=%h %s"))
staged_left = run("git", "status", "--short", check=False)
print("tree after commit:", "clean" if not staged_left.strip() else "\n" + staged_left)
