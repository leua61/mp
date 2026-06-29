@echo off
chcp 65001 >nul
setlocal
cd /d "%~dp0"

echo ========================================
echo 课程内部清单扫描与自动修复
echo ========================================
echo.

where node >nul 2>nul
if errorlevel 1 (
  echo [失败] 没有检测到 Node.js。
  echo 请先安装 Node.js，然后重新双击本文件。
  echo.
  pause
  exit /b 1
)

node tools\check_fix_lesson_catalogs.js
set EXIT_CODE=%ERRORLEVEL%

echo.
if not "%EXIT_CODE%"=="0" (
  echo [失败] 脚本运行出错，错误码：%EXIT_CODE%
) else (
  echo [完成] 已扫描并修复每个课程文件夹内的 _lesson_files.js。
)
echo.
pause
exit /b %EXIT_CODE%
