"""Foreman helper: decode the base64 image saved by the Browser pane's JS tool into a file.
usage: python decode.py <saved-json-file> <out.jpg>"""
import json,base64,re,sys
t=json.load(open(sys.argv[1],encoding="utf-8"))[0]["text"]
m=re.search(r'base64,([A-Za-z0-9+/=]+)',t)
open(sys.argv[2],"wb").write(base64.b64decode(m.group(1)))
print("wrote",sys.argv[2])
