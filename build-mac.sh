#!/bin/bash
# استخراج نسخة macOS - عالم شبلول
# تشغيل هذا السكربت على جهاز Mac فقط

set -e
cd "$(dirname "$0")"
LOG="build-log-mac.txt"

echo "========================================" | tee "$LOG"
echo "  بناء نسخة Mac - عالم شبلول" | tee -a "$LOG"
echo "  $(date)" | tee -a "$LOG"
echo "========================================" | tee -a "$LOG"
echo "" | tee -a "$LOG"

if [ ! -d "node_modules" ]; then
    echo "[1/2] تثبيت الحزم..."
    npm install >> "$LOG" 2>&1
    echo "تم التثبيت."
else
    echo "الحزم موجودة، جاري البناء..."
fi

echo ""
echo "[2/2] بناء نسخة Mac (DMG + ZIP)..."
npm run build:mac >> "$LOG" 2>&1

echo ""
echo "========================================"
echo "  تم بنجاح."
echo "  الملفات في: dist/"
echo "  - عالم شبلول 1.0.0.dmg"
echo "  - عالم شبلول 1.0.0-mac.zip"
echo "========================================"
echo "السجل: $LOG"
[ -d "dist" ] && open dist
