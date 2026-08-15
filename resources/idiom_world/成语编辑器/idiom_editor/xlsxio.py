from __future__ import unicode_literals

import html
import re
from datetime import datetime
from pathlib import Path
from xml.etree import ElementTree as ET
from zipfile import ZIP_DEFLATED, ZipFile

NS_MAIN = "http://schemas.openxmlformats.org/spreadsheetml/2006/main"
NS_REL = "http://schemas.openxmlformats.org/officeDocument/2006/relationships"
NS_PKG_REL = "http://schemas.openxmlformats.org/package/2006/relationships"
NS_CT = "http://schemas.openxmlformats.org/package/2006/content-types"


def _col_index(ref):
    letters = re.match(r"[A-Z]+", ref).group(0)
    value = 0
    for char in letters:
        value = value * 26 + ord(char) - 64
    return value - 1


def _col_name(index):
    out = ""
    index += 1
    while index:
        index, remain = divmod(index - 1, 26)
        out = chr(65 + remain) + out
    return out


def _relationships(zf, path):
    if path not in zf.namelist():
        return {}
    root = ET.fromstring(zf.read(path))
    result = {}
    for node in root:
        rid = node.attrib.get("Id")
        target = node.attrib.get("Target")
        if rid and target:
            result[rid] = target
    return result


def read_workbook(path):
    path = Path(path)
    with ZipFile(path, "r") as zf:
        workbook = ET.fromstring(zf.read("xl/workbook.xml"))
        rels = _relationships(zf, "xl/_rels/workbook.xml.rels")
        strings = []
        if "xl/sharedStrings.xml" in zf.namelist():
            root = ET.fromstring(zf.read("xl/sharedStrings.xml"))
            for item in root.findall("{%s}si" % NS_MAIN):
                strings.append("".join(node.text or "" for node in item.iter("{%s}t" % NS_MAIN)))

        result = {}
        sheets = workbook.find("{%s}sheets" % NS_MAIN)
        for sheet in sheets:
            name = sheet.attrib.get("name", "Sheet")
            rid = sheet.attrib.get("{%s}id" % NS_REL)
            target = rels.get(rid, "")
            if target.startswith("/"):
                xml_path = target.lstrip("/")
            else:
                xml_path = "xl/" + target.replace("\\", "/")
            root = ET.fromstring(zf.read(xml_path))
            rows = []
            for row_node in root.findall(".//{%s}row" % NS_MAIN):
                row = []
                for cell in row_node.findall("{%s}c" % NS_MAIN):
                    ref = cell.attrib.get("r", "A1")
                    col = _col_index(ref)
                    while len(row) <= col:
                        row.append("")
                    cell_type = cell.attrib.get("t", "")
                    value = ""
                    if cell_type == "inlineStr":
                        value = "".join(node.text or "" for node in cell.iter("{%s}t" % NS_MAIN))
                    else:
                        node = cell.find("{%s}v" % NS_MAIN)
                        raw = node.text if node is not None and node.text is not None else ""
                        if cell_type == "s" and raw:
                            value = strings[int(raw)]
                        elif cell_type == "b":
                            value = raw == "1"
                        else:
                            value = raw
                            if raw:
                                try:
                                    num = float(raw)
                                    value = int(num) if num.is_integer() else num
                                except ValueError:
                                    pass
                    row[col] = value
                rows.append(row)
            result[name] = rows
        return result


def _cell(ref, value):
    if value is None or value == "":
        return '<c r="%s"/>' % ref
    if isinstance(value, bool):
        return '<c r="%s" t="b"><v>%s</v></c>' % (ref, 1 if value else 0)
    if isinstance(value, (int, float)) and not isinstance(value, bool):
        return '<c r="%s"><v>%s</v></c>' % (ref, value)
    text = html.escape(str(value), quote=False)
    return '<c r="%s" t="inlineStr"><is><t xml:space="preserve">%s</t></is></c>' % (ref, text)


def _sheet_xml(rows, widths):
    xml_rows = []
    for r_index, row in enumerate(rows, 1):
        cells = []
        for c_index, value in enumerate(row):
            cells.append(_cell("%s%s" % (_col_name(c_index), r_index), value))
        xml_rows.append('<row r="%s">%s</row>' % (r_index, "".join(cells)))
    max_col = max([len(row) for row in rows] + [1])
    cols = []
    for i in range(1, max_col + 1):
        width = widths[i - 1] if i - 1 < len(widths) else 20
        cols.append('<col min="%s" max="%s" width="%s" customWidth="1"/>' % (i, i, width))
    return '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' \
        '<worksheet xmlns="%s"><sheetViews><sheetView workbookViewId="0">' \
        '<pane ySplit="1" topLeftCell="A2" activePane="bottomLeft" state="frozen"/>' \
        '</sheetView></sheetViews><sheetFormatPr defaultRowHeight="18"/><cols>%s</cols>' \
        '<sheetData>%s</sheetData></worksheet>' % (NS_MAIN, "".join(cols), "".join(xml_rows))


def write_workbook(path, sheets):
    path = Path(path)
    path.parent.mkdir(parents=True, exist_ok=True)
    sheets = list(sheets)
    overrides = "".join(
        '<Override PartName="/xl/worksheets/sheet%s.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>' % i
        for i in range(1, len(sheets) + 1)
    )
    content_types = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' \
        '<Types xmlns="%s"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>' \
        '<Default Extension="xml" ContentType="application/xml"/>' \
        '<Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>' \
        '%s</Types>' % (NS_CT, overrides)
    workbook_sheets = "".join(
        '<sheet name="%s" sheetId="%s" r:id="rId%s"/>' % (html.escape(name, quote=True), i, i)
        for i, (name, _, _) in enumerate(sheets, 1)
    )
    workbook = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' \
        '<workbook xmlns="%s" xmlns:r="%s"><sheets>%s</sheets></workbook>' % (NS_MAIN, NS_REL, workbook_sheets)
    rels = "".join(
        '<Relationship Id="rId%s" Type="%s/worksheet" Target="worksheets/sheet%s.xml"/>' % (i, NS_REL, i)
        for i in range(1, len(sheets) + 1)
    )
    workbook_rels = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' \
        '<Relationships xmlns="%s">%s</Relationships>' % (NS_PKG_REL, rels)
    root_rels = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' \
        '<Relationships xmlns="%s"><Relationship Id="rId1" Type="%s/officeDocument" Target="xl/workbook.xml"/></Relationships>' % (NS_PKG_REL, NS_REL)
    with ZipFile(path, "w", ZIP_DEFLATED) as zf:
        zf.writestr("[Content_Types].xml", content_types)
        zf.writestr("_rels/.rels", root_rels)
        zf.writestr("xl/workbook.xml", workbook)
        zf.writestr("xl/_rels/workbook.xml.rels", workbook_rels)
        for i, (_, rows, widths) in enumerate(sheets, 1):
            zf.writestr("xl/worksheets/sheet%s.xml" % i, _sheet_xml(rows, widths))
