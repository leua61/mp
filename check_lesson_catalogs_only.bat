@echo off
chcp 65001 >nul
setlocal
cd /d "%~dp0"

echo ========================================
echo 课程内部清单只检查，不修改
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

node tools\check_fix_lesson_catalogs.js --check
set EXIT_CODE=%ERRORLEVEL%

echo.
echo [完成] 检查结束。
echo.
pause
exit /b %EXIT_CODE%
