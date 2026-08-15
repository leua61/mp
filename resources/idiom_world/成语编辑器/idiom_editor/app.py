from __future__ import unicode_literals

import html
import sys
from pathlib import Path

from PySide6.QtCore import QPoint, QRect, QSize, QTimer, Qt
from PySide6.QtGui import QTextDocument
from PySide6.QtWidgets import (
    QApplication,
    QFileDialog,
    QFrame,
    QHBoxLayout,
    QLabel,
    QLayout,
    QLineEdit,
    QMainWindow,
    QPushButton,
    QScrollArea,
    QSizePolicy,
    QTabWidget,
    QTextBrowser,
    QVBoxLayout,
    QWidget,
)

from .core import (
    Change, GRADE_NAMES, GRADE_ORDER, MAIN_GRADE_ORDER, counts, is_four_char_word,
    load_entries, now_text, save_entries, save_log
)

COLORS = {
    "L": ("#E7F2ED", "#78A79B", "#214F46"),
    "O": ("#E8EDE3", "#95A28D", "#42513D"),
    "E": ("#EEEAF6", "#A292BE", "#554372"),
    "F": ("#E7EAF0", "#7F8998", "#303A49"),
    "M": ("#F2EEE8", "#B39C7D", "#5F4B32"),
}

LEVEL_HINTS = {
    "M": "杂项：只放非四字固定表达或确有保留价值的非常见短词",
    "L": "一级：常见，而且现代汉语一眼即可理解",
    "O": "二级：常见，或语文较好者可现场拆字、拆古义理解",
    "E": "三级：字面看似好懂，却很容易推出错误含义",
    "F": "四级：依赖生僻典故、冷僻专名，或含难读生僻字",
}


class Flow(QLayout):
    def __init__(self, parent=None, margin=0, gap=4):
        super().__init__(parent); self.items = []
        self.setContentsMargins(margin, margin, margin, margin); self.setSpacing(gap)

    def addItem(self, item): self.items.append(item)
    def count(self): return len(self.items)
    def itemAt(self, i): return self.items[i] if 0 <= i < len(self.items) else None
    def takeAt(self, i): return self.items.pop(i) if 0 <= i < len(self.items) else None
    def expandingDirections(self): return Qt.Orientations(Qt.Orientation(0))
    def hasHeightForWidth(self): return True
    def heightForWidth(self, w): return self.arrange(QRect(0, 0, w, 0), True)
    def setGeometry(self, r): super().setGeometry(r); self.arrange(r, False)
    def sizeHint(self): return self.minimumSize()

    def minimumSize(self):
        size = QSize()
        for item in self.items: size = size.expandedTo(item.minimumSize())
        margin = self.contentsMargins()
        return size + QSize(margin.left() + margin.right(), margin.top() + margin.bottom())

    def arrange(self, rect, test):
        x, y, height = rect.x(), rect.y(), 0
        right, gap = rect.right(), self.spacing()
        for item in self.items:
            hint = item.sizeHint(); next_x = x + hint.width() + gap
            if next_x - gap > right and height:
                x, y, height = rect.x(), y + height + gap, 0
                next_x = x + hint.width() + gap
            if not test: item.setGeometry(QRect(QPoint(x, y), hint))
            x, height = next_x, max(height, hint.height())
        return y + height - rect.y()


class MainWindow(QMainWindow):
    def __init__(self):
        super().__init__(); self.setWindowTitle("LOEF 成语与杂项分类编辑器")
        self.resize(1120, 680); self.setMinimumSize(860, 500)
        self.entries, self.path, self.sel, self.changes = [], None, -1, []
        self.flows, self.pages, self.btns, self.grade_btns = {}, {}, {}, {}
        self.timer = QTimer(self); self.timer.setSingleShot(True); self.timer.setInterval(120)
        self.timer.timeout.connect(self.build_all); self.make_ui(); self.bind(); self.style()
        sample = Path(__file__).resolve().parents[1] / "当前成语分级表.xlsx"
        if sample.exists(): self.load(sample)

    def make_ui(self):
        self.open_btn, self.save_btn = QPushButton("打开"), QPushButton("保存")
        self.save_as_btn, self.log_btn = QPushButton("另存"), QPushButton("记录")
        self.search, self.stats = QLineEdit(), QLabel("未载入")
        self.search.setPlaceholderText("搜索词语"); self.search.setClearButtonEnabled(True)
        self.stats.setAlignment(Qt.AlignRight | Qt.AlignVCenter)
        self.stats.setSizePolicy(QSizePolicy.Minimum, QSizePolicy.Preferred)
        root = QWidget(); layout = QVBoxLayout(root)
        layout.setContentsMargins(6, 6, 6, 6); layout.setSpacing(4)
        layout.addLayout(self.make_top()); layout.addWidget(self.make_tabs(), 1)
        layout.addWidget(self.make_detail()); self.setCentralWidget(root)

    def make_top(self):
        top = QHBoxLayout(); top.setSpacing(6)
        for btn in (self.open_btn, self.save_btn, self.save_as_btn, self.log_btn): top.addWidget(btn)
        top.addWidget(self.search, 1); top.addWidget(self.stats); return top

    def make_tabs(self):
        self.tabs = QTabWidget()
        for grade in GRADE_ORDER:
            index = self.tabs.addTab(self.make_page(grade), grade)
            self.tabs.setTabToolTip(index, LEVEL_HINTS[grade])
        return self.tabs

    def make_detail(self):
        self.word, self.grade = QLabel("未选择词语"), QLabel("当前等级：—")
        self.word.setStyleSheet("font-size:20px;font-weight:bold;color:#263238")
        self.word.setTextInteractionFlags(Qt.TextSelectableByMouse | Qt.TextSelectableByKeyboard)
        self.grade.setStyleSheet("color:#54616A")
        title = QHBoxLayout(); title.addWidget(self.word); title.addSpacing(7)
        title.addWidget(self.grade); title.addStretch(1)
        flags = Qt.TextSelectableByMouse | Qt.TextSelectableByKeyboard | Qt.LinksAccessibleByMouse
        self.detail_left, self.detail_right = QTextBrowser(), QTextBrowser()
        for detail in (self.detail_left, self.detail_right):
            detail.setOpenExternalLinks(True); detail.setFrameShape(QFrame.NoFrame)
            detail.setReadOnly(True); detail.setTextInteractionFlags(flags)
            detail.setFocusPolicy(Qt.StrongFocus)
            detail.setHorizontalScrollBarPolicy(Qt.ScrollBarAlwaysOff)
        self.detail_left.setVerticalScrollBarPolicy(Qt.ScrollBarAlwaysOff)
        columns = QHBoxLayout(); columns.setContentsMargins(0, 0, 0, 0); columns.setSpacing(12)
        columns.addWidget(self.detail_left, 1)
        divider = QFrame(); divider.setFrameShape(QFrame.VLine); divider.setFrameShadow(QFrame.Sunken)
        columns.addWidget(divider)
        columns.addWidget(self.detail_right, 1)
        panel = QFrame(); panel.setFrameShape(QFrame.StyledPanel)
        box = QVBoxLayout(panel); box.setContentsMargins(8, 6, 8, 6); box.setSpacing(2)
        box.addLayout(title); box.addLayout(self.make_levels()); box.addLayout(columns, 1)
        panel.setFixedHeight(272); return panel

    def make_levels(self):
        levels = QHBoxLayout(); levels.setSpacing(4); levels.addWidget(QLabel("切换等级："))
        for grade in GRADE_ORDER:
            btn = QPushButton(f"{grade} {GRADE_NAMES[grade]}")
            btn.setToolTip(LEVEL_HINTS[grade])
            btn.clicked.connect(lambda checked=False, g=grade: self.switch_grade(g))
            self.grade_btns[grade] = btn; levels.addWidget(btn)
        levels.addStretch(1); return levels

    def make_page(self, grade):
        scroll = QScrollArea(); scroll.setWidgetResizable(True)
        scroll.setFrameShape(QFrame.NoFrame)
        scroll.setHorizontalScrollBarPolicy(Qt.ScrollBarAlwaysOff)
        page = QWidget(); flow = Flow(page, 5, 4); page.setLayout(flow); scroll.setWidget(page)
        self.pages[grade], self.flows[grade] = page, flow; return scroll

    def bind(self):
        self.open_btn.clicked.connect(self.open_file); self.save_btn.clicked.connect(self.save)
        self.save_as_btn.clicked.connect(self.save_as); self.log_btn.clicked.connect(self.export_log)
        self.search.textChanged.connect(self.timer.start)

    def style(self):
        self.setStyleSheet(
            "QMainWindow{background:#F3F4F5}"
            "QPushButton{padding:4px 7px;border:1px solid #C7CCD1;border-radius:4px;background:white}"
            "QPushButton:hover{background:#F0F3F5}"
            "QLineEdit{padding:5px;border:1px solid #C7CCD1;border-radius:4px;background:white}"
            "QTextBrowser{background:transparent;border:none;color:#263238}"
            "QTabWidget::pane{border:1px solid #C7CCD1;background:white}"
            "QTabBar::tab{min-width:66px;padding:6px 7px;margin-right:2px;background:#E8EAEC;"
            "border:1px solid #C7CCD1;border-bottom:none}"
            "QTabBar::tab:selected{background:white;font-weight:bold}"
        )

    def load(self, path):
        self.entries, self.path = load_entries(path), Path(path)
        self.sel, self.changes = -1, []; self.build_all()
        self.statusBar().showMessage(f"已载入：{self.path}")

    def open_file(self):
        path, _ = QFileDialog.getOpenFileName(self, "打开成语 Excel", str(Path.cwd()), "Excel 文件 (*.xlsx)")
        if path: self.load(path)

    def indices(self, grade):
        query = self.search.text().strip().lower()
        return [
            i for i, entry in enumerate(self.entries)
            if entry.grade == grade and (not query or query in entry.word.lower())
        ]

    def clear_grade(self, grade):
        flow = self.flows[grade]
        while flow.count():
            item = flow.takeAt(0); btn = item.widget()
            self.btns.pop(btn.property("idx"), None); btn.deleteLater()

    def btn_css(self, grade, selected):
        bg, border, strong = COLORS[grade]; line = strong if selected else border
        return (
            "QPushButton{background:%s;border:2px solid %s;border-radius:4px;"
            "padding:2px 6px;font-size:14px;color:#202428}"
            "QPushButton:hover{border-color:%s}" % (bg, line, strong)
        )

    def build_grade(self, grade):
        self.clear_grade(grade); flow = self.flows[grade]
        for i in self.indices(grade):
            btn = QPushButton(self.entries[i].word); btn.setProperty("idx", i)
            btn.setSizePolicy(QSizePolicy.Fixed, QSizePolicy.Fixed); btn.setToolTip(self.entries[i].word)
            btn.setStyleSheet(self.btn_css(grade, i == self.sel))
            btn.clicked.connect(lambda checked=False, n=i: self.select(n))
            flow.addWidget(btn); self.btns[i] = btn

    def update_tabs(self):
        for i, grade in enumerate(GRADE_ORDER):
            self.tabs.setTabText(i, f"{grade} {GRADE_NAMES[grade]}（{len(self.indices(grade))}）")

    def update_stats(self):
        num = counts(self.entries)
        self.stats.setText(
            f"{len(self.entries)}｜杂项{num['M']} L{num['L']} O{num['O']} E{num['E']} F{num['F']}"
        )

    def build_all(self):
        for grade in GRADE_ORDER: self.build_grade(grade)
        self.update_tabs(); self.update_stats(); self.update_panel()

    def mark(self, i, selected):
        btn = self.btns.get(i)
        if btn: btn.setStyleSheet(self.btn_css(self.entries[i].grade, selected))

    def select(self, i):
        old = self.sel; self.sel = i
        if old >= 0: self.mark(old, False)
        self.mark(i, True); self.update_panel()

    def line_html(self, title, text):
        return (
            "<div style=\"margin:0 0 10px 0;line-height:1.42\">"
            f"<b>{html.escape(title)}</b><br>{html.escape(text or '—')}"
            "</div>"
        )

    def source_html(self, entry):
        first = "｜".join(x for x in (entry.source_year, entry.source_paper, entry.source_question) if x)
        second = "｜".join(
            x for x in (entry.source_module, entry.source_type, entry.source_position, entry.source_status) if x
        )
        parts = [html.escape(x) for x in (first, second) if x]
        if entry.source_url:
            url = html.escape(entry.source_url, quote=True)
            parts.append(f'<a href="{url}">打开来源网页</a>')
        return "<br>".join(parts) or "—"

    def detail_items(self, entry):
        pairs = [
            ("主读音", entry.pronunciation),
            ("规范异读", entry.alternate_pronunciations),
            ("读音说明", entry.pronunciation_note),
            ("变体／异形", entry.variants),
            ("字面直译", entry.literal),
            ("逐字解释", entry.characters),
            ("语素合义", entry.morphemes),
            ("完整释义", entry.meaning),
            ("望文生义陷阱", entry.trap),
        ]
        items = [(title, text, False) for title, text in pairs if text]
        items.append(("真题出处", self.source_html(entry), True))
        return items

    def source_block_html(self, source_html):
        return (
            "<div style=\"margin:0 0 8px 0;line-height:1.42\">"
            f"<b>真题出处</b><br>{source_html}</div>"
        )

    def html_height(self, blocks, width):
        doc = QTextDocument(self)
        doc.setDocumentMargin(1)
        doc.setDefaultStyleSheet("body{margin:0;font-size:13px;color:#263238}")
        doc.setHtml("".join(blocks) or "—")
        doc.setTextWidth(max(160, width))
        return doc.size().height()

    def split_text_block(self, left, title, text, width, height):
        low, high, best = 1, len(text), 0
        while low <= high:
            middle = (low + high) // 2
            block = self.line_html(title, text[:middle])
            if self.html_height(left + [block], width) <= height:
                best = middle; low = middle + 1
            else:
                high = middle - 1
        if best <= 0 or best >= len(text):
            return None
        floor = max(1, best - 28)
        natural = max((text.rfind(mark, floor, best + 1) for mark in "；。！？：，、 "), default=-1)
        cut = natural + 1 if natural >= floor else best
        return self.line_html(title, text[:cut]), self.line_html(title + "（续）", text[cut:])

    def detail_html(self, entry):
        items = self.detail_items(entry)
        width = max(190, self.detail_left.viewport().width() - 8)
        height = max(100, self.detail_left.viewport().height() - 6)
        left, right, overflow = [], [], False
        for title, text, rich in items:
            block = self.source_block_html(text) if rich else self.line_html(title, text)
            if overflow:
                right.append(block)
                continue
            if not left or self.html_height(left + [block], width) <= height:
                left.append(block)
                continue
            split = None if rich else self.split_text_block(left, title, text, width, height)
            if split:
                left.append(split[0]); right.append(split[1])
            else:
                right.append(block)
            overflow = True
        return "".join(left) or "—", "".join(right) or "—"

    def update_panel(self):
        if self.sel < 0:
            self.word.setText("未选择词语"); self.grade.setText("当前等级：—")
            self.detail_left.setPlainText("—"); self.detail_right.setPlainText("—")
            for btn in self.grade_btns.values(): btn.setEnabled(False)
            return
        entry = self.entries[self.sel]; self.word.setText(entry.word)
        self.grade.setText(f"当前等级：{entry.grade} {GRADE_NAMES[entry.grade]}")
        left, right = self.detail_html(entry)
        self.detail_left.setHtml(left); self.detail_right.setHtml(right)
        self.update_grade_btns(entry)

    def update_grade_btns(self, entry):
        current = entry.grade
        four_chars = is_four_char_word(entry.word)
        for grade, btn in self.grade_btns.items():
            allowed = (four_chars and grade in MAIN_GRADE_ORDER) or (not four_chars and grade == "M")
            btn.setEnabled(allowed)
            bg, border, strong = COLORS[grade]
            line = strong if grade == current else border
            btn.setStyleSheet(
                "QPushButton{background:%s;border:2px solid %s;border-radius:4px;padding:4px 7px}"
                % (bg, line)
            )

    def switch_grade(self, grade):
        entry = self.entries[self.sel]; old = entry.grade
        four_chars = is_four_char_word(entry.word)
        if not four_chars and grade in MAIN_GRADE_ORDER:
            self.statusBar().showMessage("非四字词只能放在 M 杂项")
            return
        if four_chars and grade == "M":
            self.statusBar().showMessage("四字词必须放在 L／O／E／F")
            return
        if old == grade: return
        entry.grade = grade
        self.changes.append(Change(now_text(), entry.word, old, grade, "切换等级"))
        self.build_grade(old); self.build_grade(grade); self.update_tabs(); self.update_stats()
        self.tabs.setCurrentIndex(GRADE_ORDER.index(grade)); self.update_panel()
        self.statusBar().showMessage(f"{entry.word}：{old} → {grade}")

    def resizeEvent(self, event):
        super().resizeEvent(event)
        if hasattr(self, "detail_left") and self.sel >= 0:
            QTimer.singleShot(0, self.update_panel)

    def save_to(self, path):
        save_entries(path, self.entries); self.path = Path(path)
        self.statusBar().showMessage(f"已保存：{path}")

    def save(self):
        if self.path: self.save_to(self.path)
        else: self.save_as()

    def save_as(self):
        name = self.path.name if self.path else "成语与杂项分级表.xlsx"
        path, _ = QFileDialog.getSaveFileName(
            self, "另存成语 Excel", str(Path.cwd() / name), "Excel 文件 (*.xlsx)"
        )
        if path: self.save_to(path if path.lower().endswith(".xlsx") else path + ".xlsx")

    def export_log(self):
        path, _ = QFileDialog.getSaveFileName(
            self, "导出修改记录", str(Path.cwd() / "分类修改记录.csv"), "CSV 文件 (*.csv)"
        )
        if path: save_log(path if path.lower().endswith(".csv") else path + ".csv", self.changes)


def main():
    app = QApplication(sys.argv); win = MainWindow(); win.show()
    area = app.primaryScreen().availableGeometry()
    win.move(area.left() + 24, area.top() + (area.height() - win.height()) // 2)
    return app.exec()


if __name__ == "__main__": sys.exit(main())
