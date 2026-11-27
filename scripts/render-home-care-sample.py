#!/usr/bin/env python3
"""Render the reviewed public sample audit. Requires ReportLab."""
import argparse
import json
import os
from datetime import datetime, timezone
from pathlib import Path
from xml.sax.saxutils import escape, quoteattr

import reportlab
from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas
from reportlab.platypus import Paragraph

ROOT = Path(__file__).resolve().parents[1]
FONT_DIR = Path(reportlab.__file__).resolve().parent / "fonts"
pdfmetrics.registerFont(TTFont("Vera", str(FONT_DIR / "Vera.ttf")))
pdfmetrics.registerFont(TTFont("Vera-Bold", str(FONT_DIR / "VeraBd.ttf")))
INK, MUTED, BLUE, RULE, PALE = map(colors.HexColor, ["#14243A", "#4A5B70", "#1754A2", "#CBD7E4", "#EDF4FB"])
M, W = 45, 522

def rich(value):
    if isinstance(value, dict):
        return f'<a href={quoteattr(value["url"])} color="#1754A2"><u>{escape(value["text"])}</u></a>'
    return escape(value)

def paragraph(value, width, size, leading, color=INK, bold=False, markup=False):
    style = ParagraphStyle("audit", fontName="Vera-Bold" if bold else "Vera",
                           fontSize=size, leading=leading, textColor=color)
    p = Paragraph(value if markup else rich(value), style)
    _, h = p.wrap(width, 792)
    return p, h

def write(pdf, value, x, y, width=W, size=10.5, leading=15, color=INK, bold=False, markup=False):
    p, h = paragraph(value, width, size, leading, color, bold, markup)
    if y-h < 49:
        raise ValueError(f"Page overflow at {value}")
    p.drawOn(pdf, x, y-h)
    return y-h

def line(pdf, y):
    pdf.setStrokeColor(RULE)
    pdf.line(M, y, M+W, y)

def table(pdf, b, y):
    widths = [w*W for w in b["widths"]]
    assert abs(sum(widths)-W)<0.1
    dense = len(b["rows"])>10
    pad = 4 if dense else 7
    for i, row in enumerate([b["headers"], *b["rows"]]):
        assert len(row)==len(widths)
        parts = [paragraph(v, w-13, 8.5 if dense else 9.2, 11.3 if dense else 13, BLUE if i==0 else INK, i==0)
                 for v,w in zip(row,widths)]
        h=max(p[1] for p in parts)+pad*2
        if y-h<49:
            raise ValueError(f"Table overflows at {row}")
        if i % 2 == 0:
            pdf.setFillColor(PALE)
            pdf.rect(M,y-h,W,h,fill=1,stroke=0)
        x=M
        for (p,ph),w in zip(parts,widths):
            p.drawOn(pdf,x+6,y-pad-ph)
            x+=w
        y-=h
        line(pdf,y)
    return y-12

def frame(pdf, n, total):
    pdf.setFillColor(BLUE)
    pdf.rect(M,750,8,8,fill=1,stroke=0)
    write(pdf,"CALIPERWORKS",M+14,760,size=10,leading=12,bold=True)
    pdf.setFont("Vera",8)
    pdf.setFillColor(MUTED)
    pdf.drawRightString(M+W,751,"LOCAL SEO AUDIT  /  SAMPLE")
    line(pdf,43)
    pdf.drawString(M,27,"SCOTTSDALE HOME CARE  /  CALIPERWORKS.COM")
    pdf.drawRightString(M+W,27,f"{n:02d} / {total:02d}")

def block(pdf,b,y):
    k=b["kind"]
    if k=="table":
        return table(pdf,b,y)
    if k=="cards":
        for i,(v,name,detail) in enumerate(b["cards"]):
            col=(W-14)/3
            x=M+(col+7)*i
            pdf.setFillColor(PALE)
            pdf.roundRect(x,y-78,col,78,7,fill=1,stroke=0)
            q=write(pdf,v,x+9,y-7,width=col-18,size=20,leading=24,bold=True)
            q=write(pdf,name,x+9,q-1,width=col-18,size=8.5,leading=11,bold=True,color=BLUE)
            write(pdf,detail,x+9,q-3,width=col-18,size=8.1,leading=10.4,color=MUTED)
        return y-95
    if k=="example":
        line(pdf,y)
        y=write(pdf,b["title"],M,y-7,size=11,leading=14,bold=True)
        y=write(pdf,"Prompt: "+b["question"],M,y-2,size=8.6,leading=11,color=MUTED)
        y=write(pdf,"“"+b["excerpt"]+"”",M,y-3,size=9.5,leading=13)
        y=write(pdf,"Shown source: "+b["source"],M,y-2,size=8.4,leading=11,color=MUTED)
        score=f'Brand named: {"Yes" if b["named"] else "No"}  |  Agency site linked: {"Yes" if b["cited"] else "No"}'
        y=write(pdf,score,M,y-2,size=8.7,leading=12,bold=True,color=BLUE)
        return write(pdf,b["note"],M,y-2,size=8.5,leading=11,color=MUTED)-9
    if k=="links":
        for i in range(0,len(b["items"]),2):
            floors=[write(pdf,it,M+261*j,y,width=248,size=9,leading=12)
                    for j,it in enumerate(b["items"][i:i+2])]
            y=min(floors)-4
        return y
    style={
        "lead": (12,17,INK,False,15),
        "subhead": (13,17,INK,True,6),
        "body": (10.5,15,INK,False,12),
        "note": (9,12.5,MUTED,False,8),
    }
    size,leading,color,bold,gap=style[k]
    return write(pdf,b["text"],M,y,size=size,leading=leading,color=color,bold=bold)-gap

def render(data, output):
    output.parent.mkdir(parents=True,exist_ok=True)
    date=datetime.strptime(data["date"],"%B %d, %Y").replace(tzinfo=timezone.utc)
    os.environ["SOURCE_DATE_EPOCH"]=str(int(date.timestamp()))
    pdf=canvas.Canvas(str(output),pagesize=letter,invariant=True)
    pdf.setTitle(data["title"]); pdf.setAuthor("CaliperWorks"); pdf.setCreator("CaliperWorks")
    pdf.setSubject("Sample local SEO audit with real competitor research and simulated metrics")
    for n,page in enumerate(data["pages"],1):
        frame(pdf,n,len(data["pages"]))
        write(pdf,page["kicker"].upper(),M,723,size=9,leading=12,color=BLUE,bold=True)
        y=write(pdf,page["title"],M,703,size=27,leading=33,bold=True)-13
        for item in page["blocks"]:
            y=block(pdf,item,y)
        pdf.showPage()
    pdf.save()

if __name__=="__main__":
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--input",type=Path,default=ROOT/"src/data/homeCareSample.json")
    parser.add_argument("--output",type=Path,default=ROOT/"public/reports/scottsdale-home-care-search-sample.pdf")
    args=parser.parse_args()
    render(json.loads(args.input.read_text(encoding="utf-8")),args.output)
