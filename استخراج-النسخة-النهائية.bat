@echo off
chcp 65001 >nul
set "LOG=%~dp0build-log.txt"
cd /d "%~dp0"

echo. > "%LOG%"
echo ======================================== >> "%LOG%"
echo   استخراج النسخة النهائية - عالم شبلول   >> "%LOG%"
echo   %date% %time% >> "%LOG%"
echo ======================================== >> "%LOG%"
echo. >> "%LOG%"

echo ========================================
echo   استخراج النسخة النهائية - عالم شبلول
echo ========================================
echo.

if not exist "node_modules" (
    echo [1/2] تثبيت الحزم...
    call npm install >> "%LOG%" 2>&1
    if errorlevel 1 (
        echo فشل التثبيت. جاري فتح السجل...
        notepad "%LOG%"
        echo انسخ محتوى الملف build-log.txt وأرسله للمساعدة.
        pause
        exit /b 1
    )
    echo تم التثبيت.
) else (
    echo الحزم موجودة، جاري البناء...
)

echo.
echo [2/2] بناء المثبت...
call npm run build >> "%LOG%" 2>&1

if errorlevel 1 (
    echo.
    echo فشل البناء. جاري فتح السجل...
    notepad "%LOG%"
    echo انسخ محتوى build-log.txt وأرسله للمساعدة.
    pause
    exit /b 1
)

echo.
echo ========================================
echo   تم بنجاح.
echo   الملف النهائي في مجلد: dist\
echo   تشغيل مباشر: عالم شبلول 1.0.0.exe
echo ========================================
echo السجل محفوظ في: build-log.txt
if exist "%~dp0dist" explorer "%~dp0dist"
pause
