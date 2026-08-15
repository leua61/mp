from __future__ import print_function

import sys


def show_error(text):
    try:
        import ctypes
        ctypes.windll.user32.MessageBoxW(0, text, "LOEF 成语分类编辑器", 0x10)
    except Exception:
        print(text)


try:
    import PySide6  # noqa: F401
except ImportError:
    show_error(
        "本机没有检测到 PySide6。\n\n"
        "程序不会联网、不会安装、不会触发下载。\n"
        "请使用电脑中已经安装 PySide6 的 Python 运行。"
    )
    sys.exit(1)

from idiom_editor.app import main

sys.exit(main())
