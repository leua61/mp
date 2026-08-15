from __future__ import unicode_literals

import csv
import re
from dataclasses import dataclass
from datetime import datetime
from pathlib import Path

from .xlsxio import read_workbook, write_workbook

GRADE_NAMES = {"L": "清涧", "O": "林翳", "E": "蜃景", "F": "玄渊", "M": "杂项"}
MAIN_GRADE_ORDER = "LOEF"
GRADE_ORDER = "MLOEF"


def is_four_char_word(word):
    return len(re.findall(r"[\u3400-\u4dbf\u4e00-\u9fff]", str(word or ""))) == 4


def normalize_grade(word, grade):
    if not is_four_char_word(word):
        return "M"
    return grade if grade in MAIN_GRADE_ORDER else "L"


@dataclass
class Entry:
    word: str
    grade: str
    pronunciation: str = ""
    alternate_pronunciations: str = ""
    pronunciation_note: str = ""
    variants: str = ""
    literal: str = ""
    characters: str = ""
    morphemes: str = ""
    meaning: str = ""
    trap: str = ""
    source_paper: str = ""
    source_year: str = ""
    source_question: str = ""
    source_module: str = ""
    source_type: str = ""
    source_position: str = ""
    evidence_count: str = ""
    exam_count: str = ""
    source_status: str = ""
    source_url: str = ""


@dataclass
class Change:
    time: str
    word: str
    old_grade: str
    new_grade: str
    action: str


def _find_header(rows):
    for index, row in enumerate(rows[:20]):
        texts = [str(value or "") for value in row]
        if any(name in texts for name in ("成语", "成语／词语", "成语／难词", "词语")):
            return index, texts
    return -1, []


def load_entries(path):
    entries = []
    for sheet_name, rows in read_workbook(path).items():
        grade = sheet_name.strip()[:1]
        if grade not in GRADE_ORDER:
            continue
        head, headers = _find_header(rows)
        if head < 0:
            continue
        pos = {name: i for i, name in enumerate(headers)}

        def get(row, *names):
            for name in names:
                i = pos.get(name)
                if i is not None and i < len(row):
                    return str(row[i] or "")
            return ""

        for row in rows[head + 1:]:
            word = get(row, "成语／词语", "成语", "成语／难词", "词语")
            if not word:
                continue
            current = normalize_grade(word, get(row, "等级", "当前等级") or grade)
            entries.append(Entry(
                word=word,
                grade=current,
                pronunciation=get(row, "主读音", "拼音", "读音提示"),
                alternate_pronunciations=get(row, "规范异读", "异读"),
                pronunciation_note=get(row, "读音说明", "异读说明"),
                variants=get(row, "变体／异形", "变体"),
                literal=get(row, "字面直译"),
                characters=get(row, "逐字解释"),
                morphemes=get(row, "语素合义", "逐字／语素解释"),
                meaning=get(row, "实际含义"),
                trap=get(row, "望文生义陷阱"),
                source_paper=get(row, "代表出处试卷"),
                source_year=get(row, "年份"),
                source_question=get(row, "题号／位置"),
                source_module=get(row, "模块"),
                source_type=get(row, "题型"),
                source_position=get(row, "所在位置"),
                evidence_count=get(row, "证据条数"),
                exam_count=get(row, "命中试卷数"),
                source_status=get(row, "核验状态"),
                source_url=get(row, "来源URL"),
            ))
    return entries


def save_entries(path, entries):
    grouped = {grade: [] for grade in GRADE_ORDER}
    for entry in entries:
        entry.grade = normalize_grade(entry.word, entry.grade)
        grouped[entry.grade].append(entry)
    widths = [8, 20, 25, 25, 46, 28, 30, 60, 44, 38, 38, 42, 10, 20, 16, 28, 18, 12, 12, 28, 48]
    headers = [
        "序号", "成语／词语", "主读音", "规范异读", "读音说明", "变体／异形", "字面直译",
        "逐字解释", "语素合义", "实际含义", "望文生义陷阱", "代表出处试卷", "年份", "题号／位置",
        "模块", "题型", "所在位置", "证据条数", "命中试卷数", "核验状态", "来源URL"
    ]
    sheets = []
    for grade in GRADE_ORDER:
        rows = [headers]
        for index, item in enumerate(sorted(grouped[grade], key=lambda x: x.word), 1):
            rows.append([
                index, item.word, item.pronunciation, item.alternate_pronunciations,
                item.pronunciation_note, item.variants, item.literal, item.characters, item.morphemes,
                item.meaning, item.trap, item.source_paper, item.source_year, item.source_question, item.source_module,
                item.source_type, item.source_position, item.evidence_count, item.exam_count,
                item.source_status, item.source_url
            ])
        sheets.append((f"{grade} {GRADE_NAMES[grade]}", rows, widths))
    write_workbook(path, sheets)


def save_log(path, changes):
    with open(path, "w", encoding="utf-8-sig", newline="") as handle:
        writer = csv.writer(handle)
        writer.writerow(["时间", "成语", "原等级", "新等级", "操作"])
        for change in changes:
            writer.writerow([change.time, change.word, change.old_grade, change.new_grade, change.action])


def now_text():
    return datetime.now().strftime("%Y-%m-%d %H:%M:%S")


def counts(entries):
    result = {grade: 0 for grade in GRADE_ORDER}
    for entry in entries:
        result[entry.grade] += 1
    return result
