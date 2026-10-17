"""Queue helper for the Blipwork Afrikaans night: claim / tick / red / log / show.
Usage (from anywhere):
  python afq.py claim T01 T02      -> "- ☐ T01 |" becomes "- ⏳ 2026-10-17 19:20 T01 |"
  python afq.py tick T01           -> "- ⏳ <stamp> T01 |" becomes "- ☑ 2026-10-17 T01 |"
  python afq.py red T01 "reason"   -> back to "- ☐ T01 | ... ⚠ reason"
  python afq.py log "<line>"       -> appends one line to AF-LOG.md
  python afq.py show T01 T02       -> prints the rows
Line endings and BOM are preserved.
"""
import re, sys, datetime
sys.stdout.reconfigure(encoding="utf-8")
REPO = r"C:\Users\megzi\Desktop\Claude Code Projects\maths-homework-quest"
Q = REPO + r"\QUEUE.md"
LOG = REPO + r"\AF-LOG.md"

def read(path):
    raw = open(path, "rb").read()
    bom = raw.startswith(b"\xef\xbb\xbf")
    txt = raw.decode("utf-8-sig")
    nl = "\r\n" if "\r\n" in txt else "\n"
    return txt, nl, bom

def write(path, txt, bom):
    data = txt.encode("utf-8")
    if bom:
        data = b"\xef\xbb\xbf" + data
    open(path, "wb").write(data)

def now(fmt="%Y-%m-%d %H:%M"):
    return datetime.datetime.now().strftime(fmt)

def edit_row(rid, fn):
    txt, nl, bom = read(Q)
    lines = txt.split(nl)
    hits = 0
    for i, ln in enumerate(lines):
        m = re.match(r"^- (☐|⏳ \d{4}-\d{2}-\d{2} \d{2}:\d{2}|☑ \d{4}-\d{2}-\d{2}(?: \d{2}:\d{2})?) " + re.escape(rid) + r" \| (.*)$", ln)
        if m:
            new = fn(m.group(1), m.group(2))
            if new is not None:
                lines[i] = new
                hits += 1
    if hits != 1:
        print(f"afq: {rid}: {hits} matching rows (expected 1), nothing written")
        sys.exit(1)
    write(Q, nl.join(lines), bom)

def main():
    cmd, args = sys.argv[1], sys.argv[2:]
    if cmd == "claim":
        for rid in args:
            def f(mark, rest):
                if mark != "☐":
                    print(f"afq: {rid} is not open ({mark})"); sys.exit(1)
                return f"- ⏳ {now()} {rid} | {rest}"
            edit_row(rid, f); print(f"claimed {rid}")
    elif cmd == "tick":
        for rid in args:
            def f(mark, rest):
                if not mark.startswith("⏳"):
                    print(f"afq: {rid} is not claimed ({mark})"); sys.exit(1)
                rest = re.sub(r" ⚠ .*$", "", rest)   # a red note from an earlier try is cleared by the tick
                return f"- ☑ {now('%Y-%m-%d')} {rid} | {rest}"
            edit_row(rid, f); print(f"ticked {rid}")
    elif cmd == "red":
        rid, reason = args[0], " ".join(args[1:])
        def f(mark, rest):
            return f"- ☐ {rid} | {rest} ⚠ {reason}"
        edit_row(rid, f); print(f"red {rid}: {reason}")
    elif cmd == "log":
        txt, nl, bom = read(LOG)
        if not txt.endswith(nl):
            txt += nl
        txt += " ".join(args) + nl
        write(LOG, txt, bom); print("logged")
    elif cmd == "show":
        txt, nl, bom = read(Q)
        for ln in txt.split(nl):
            if any(re.search(r"\b" + re.escape(r) + r" \|", ln) for r in args):
                print(ln)
    else:
        print(__doc__)

main()
