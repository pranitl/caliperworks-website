#!/usr/bin/env python3
"""Render the public sample PDF from reviewed evidence. Requires reportlab."""
import argparse
import json
import os
from datetime import datetime, timezone
from pathlib import Path
from xml.sax.saxutils import escape, quoteattr

import reportlab
from reportlab.lib import colors
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from reportlab.platypus import Paragraph

ROOT = Path(__file__).resolve().parents[1]
INK = colors.HexColor("#14243A")
MUTED = colors.HexColor("#4A5B70")
BLUE = colors.HexColor("#1754A2")
RULE = colors.HexColor("#CBD7E4")
PALE = colors.HexColor("#EDF4FB")
M = 48
W = 516
FONT_DIR = Path(reportlab.__file__).resolve().parent / "fonts"
pdfmetrics.registerFont(TTFont("Vera", str(FONT_DIR / "Vera.ttf")))
pdfmetrics.registerFont(TTFont("Vera-Bold", str(FONT_DIR / "VeraBd.ttf")))

def text(pdf, value, x, top, width=W, size=11, leading=15, color=INK, bold=False, markup=False):
    style = ParagraphStyle("report", fontName="Vera-Bold" if bold else "Vera",
                           fontSize=size, leading=leading, textColor=color, alignment=TA_LEFT,
                           splitLongWords=False)
    para = Paragraph(value if markup else escape(value), style)
    _, h = para.wrap(width, 700)
    if top - h < 52:
        raise ValueError(f"Page overflow: {value[:60]}")
    para.drawOn(pdf, x, top - h)
    return top - h

def label(pdf, value, x, top):
    return text(pdf, value, x, top, size=9, leading=12, color=BLUE, bold=True)

def rule(pdf, y):
    pdf.setStrokeColor(RULE)
    pdf.line(M, y, M + W, y)

def frame(pdf, page, pages):
    pdf.setFillColor(BLUE)
    pdf.rect(M, 750, 9, 9, fill=1, stroke=0)
    text(pdf, "CALIPERWORKS", M + 16, 760, size=10, leading=12, bold=True)
    rule(pdf, 46)
    text_footer = pdf.beginText(M, 29)
    text_footer.setFont("Vera", 8)
    text_footer.setFillColor(MUTED)
    text_footer.textLine("SAMPLE LOCAL SEARCH REVIEW   |   CALIPERWORKS.COM")
    pdf.drawText(text_footer)
    pdf.setFont("Vera-Bold", 8)
    pdf.setFillColor(BLUE)
    pdf.drawRightString(M + W, 29, f"{page:02d} / {pages:02d}")

def render(data, output):
    output.parent.mkdir(parents=True, exist_ok=True)
    source_date = datetime.strptime(data["date"], "%B %d, %Y").replace(tzinfo=timezone.utc)
    os.environ["SOURCE_DATE_EPOCH"] = str(int(source_date.timestamp()))
    pdf = canvas.Canvas(str(output), pagesize=letter, invariant=True)
    pdf.setTitle("CaliperWorks | " + data["title"])
    pdf.setAuthor("CaliperWorks")
    pdf.setCreator("CaliperWorks")
    pdf.setSubject("Sample local search review with linked primary sources")
    pages = 3 if data.get("aeo") else 2
    frame(pdf, 1, pages)
    label(pdf, f"MARKET REVIEW  /  {data['date'].upper()}", M, 724)
    y = text(pdf, data["title"], M, 703, size=30, leading=34, bold=True) - 11
    y = text(pdf, data["scope"], M, y, size=10, leading=14, color=MUTED) - 18
    pdf.setFillColor(PALE)
    pdf.roundRect(M, y-91, W, 91, 8, fill=1, stroke=0)
    label(pdf, "THE FIRST CHANGE WE’D MAKE", M+15, y-11)
    text(pdf, data["summary"], M+15, y-30, width=W-30, size=11, leading=15)
    y -= 109
    y = text(pdf, "What the published pages answer", M, y, size=19, leading=24, bold=True) - 10
    label(pdf, "PROVIDER / PAGE", M+8, y)
    label(pdf, "WHAT WE FOUND ON THE PAGE", M+169, y)
    y -= 17
    for i, page in enumerate(data["pages"], 1):
        rule(pdf, y)
        y -= 7
        link = f'<a href={quoteattr(page["url"])} color="#1754A2"><u>[{i}] {escape(page["provider"])}</u></a>'
        next_left = text(pdf, link, M+8, y, width=151, size=9.5, leading=12, bold=True, markup=True)
        next_left = text(pdf, page["service"], M+8, next_left-2, width=151, size=9, leading=11, color=MUTED)
        next_right = text(pdf, page["evidence"], M+169, y, width=W-177, size=9.7, leading=13)
        y = min(next_left, next_right)-8
    rule(pdf, y)
    text(pdf, data["comparison"], M, y-12, size=10.5, leading=14)
    pdf.showPage()

    frame(pdf, 2, pages)
    label(pdf, "PAGE PLAN  /  FICTIONAL AGENCY", M, 724)
    y = text(pdf, "What Sonoran Path could publish", M, 703, size=27, leading=32, bold=True) - 12
    y = text(pdf, data["baseline"], M, y, size=10.5, leading=15, color=MUTED) - 20
    for i, item in enumerate(data["plan"], 1):
        label(pdf, f"0{i}", M, y-3)
        y = text(pdf, item["name"], M+33, y, width=W-33, size=14, leading=18, bold=True) - 4
        y = text(pdf, item["detail"], M+33, y, width=W-33) - 14
    pdf.setFillColor(PALE)
    pdf.roundRect(M, y-121, W, 121, 8, fill=1, stroke=0)
    label(pdf, "DRAFT FOR THE DEMENTIA PAGE", M+15, y-12)
    d = text(pdf, data["draftTitle"], M+15, y-29, width=W-30, size=15, leading=19, bold=True) - 3
    d = text(pdf, data["draftCopy"], M+15, d, width=W-30, size=10.5, leading=14) - 5
    text(pdf, "Button: " + data["draftButton"], M+15, d, width=W-30, size=10, leading=12, bold=True, color=BLUE)
    y -= 140
    y = text(pdf, "How we’d check whether it helped", M, y, size=14, leading=19, bold=True) - 5
    y = text(pdf, data["measurement"], M, y, size=10.5, leading=14) - 17
    rule(pdf, y)
    y -= 12
    y = label(pdf, "SEARCHES USED TO FIND THE PAGES", M, y) - 3
    for query in data["queries"]:
        y = text(pdf, f"• {query}", M, y, size=9, leading=12, color=MUTED) - 4
    text(pdf, data["limits"], M, y-6, size=9, leading=12, color=MUTED)
    pdf.showPage()
    if data.get("aeo"):
        render_aeo(pdf, data["aeo"], pages)
    pdf.save()


def render_aeo(pdf, data, pages):
    frame(pdf, 3, pages)
    label(pdf, data["label"].upper(), M, 724)
    y = text(pdf, data["title"], M, 703, size=27, leading=32, bold=True) - 10
    y = text(pdf, data["scope"], M, y, size=10.5, leading=15, color=MUTED) - 7
    per_prompt = len(data["engines"]) * data["repeats"]
    prompts = data["prompts"]
    total = len(prompts) * per_prompt
    mentions = sum(p["mentions"] for p in prompts)
    tracked = mentions + sum(p["competitorMentions"] for p in prompts)
    citations = sum(p["ownCitations"] for p in prompts)
    setup = f'{len(prompts)} prompts × {len(data["engines"])} engines × {data["repeats"]} repeats = {total} simulated answers. Example engines: ' + ", ".join(data["engines"]) + "."
    y = text(pdf, setup, M, y, size=9.5, leading=13, color=MUTED) - 14
    cards = [
        (f"{mentions/total:.0%}", "AI visibility", f"{mentions}/{total} answers named you"),
        (f"{mentions/tracked:.0%}", "Share of voice", f"{mentions}/{tracked} tracked brand mentions"),
        (f"{citations}/{total}", "Website citations", "Answers that linked to your site"),
    ]
    for i, (value, name, detail) in enumerate(cards):
        x = M + 174*i
        pdf.setFillColor(PALE)
        pdf.roundRect(x, y-70, 168, 70, 7, fill=1, stroke=0)
        v = text(pdf, value, x+10, y-7, width=148, size=19, leading=23, bold=True)
        v = text(pdf, name, x+10, v-1, width=148, size=9.5, leading=12, bold=True)
        text(pdf, detail, x+10, v-3, width=148, size=8, leading=10, color=MUTED)
    y -= 88
    y = text(pdf, "Which questions expose the gap?", M, y, size=16, leading=21, bold=True) - 8
    label(pdf, "EXAMPLE PROMPT", M+5, y)
    label(pdf, "MENTIONED", M+349, y)
    label(pdf, "SITE CITED", M+440, y)
    y -= 15
    for p in prompts:
        rule(pdf, y)
        y -= 7
        down = text(pdf, p["question"], M+5, y, width=327, size=9.5, leading=13)
        text(pdf, f'{p["mentions"]}/{per_prompt}', M+349, y, width=80, size=9.5, leading=13)
        text(pdf, f'{p["ownCitations"]}/{per_prompt}', M+440, y, width=70, size=9.5, leading=13)
        y = down-7
    rule(pdf, y)
    y = text(pdf, data["finding"], M, y-12, size=10.4, leading=14, bold=True) - 8
    y = text(pdf, data["action"], M, y, size=10.4, leading=14) - 8
    y = text(pdf, data["retest"], M, y, size=10.2, leading=14, color=MUTED) - 8
    link = f'<a href={quoteattr(data["methodUrl"])} color="#1754A2"><u>Elmo metric definitions</u></a>'
    text(pdf, link, M, y, width=W, markup=True, size=9, leading=12)
    pdf.showPage()

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--input", type=Path, default=ROOT/"src/data/homeCareSample.json")
    parser.add_argument("--output", type=Path, default=ROOT/"public/reports/scottsdale-home-care-search-sample.pdf")
    args = parser.parse_args()
    render(json.loads(args.input.read_text(encoding="utf-8")), args.output)
