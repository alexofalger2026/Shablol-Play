# بناء نسخة Mac - عالم شبلول

## ✅ بناء من GitHub بدون جهاز Mac (مُوصى به)

المستودع جاهز لبناء نسخة macOS على **GitHub Actions** — لا تحتاج جهاز Mac.

1. افتح المستودع على GitHub: **https://github.com/alexofalger2026/Shablol-Play**
2. اذهب إلى تبويب **Actions**.
3. من القائمة اليسرى اختر **Build Mac**.
4. اضغط **Run workflow** (ثم **Run workflow** في النافذة).
5. انتظر حتى يكتمل التشغيل (علامة خضراء).
6. في نفس الصفحة انزل إلى **Artifacts** → حمّل **mac-build** (ملف مضغوط فيه DMG و ZIP).
7. فك الضغط واستخدم ملف **عالم شبلول x.x.x.dmg** للتثبيت على Mac.

يُشغّل الـ workflow تلقائياً أيضاً عند الدفع (push) إلى فرع **main** (ما عدا تغييرات الملفات النصية فقط).

---

## متطلبات (للبناء المحلي على Mac)

- **جهاز Mac** (macOS) — بناء تطبيق Mac يعمل بشكل صحيح فقط على نظام macOS.
- Node.js مثبت ([nodejs.org](https://nodejs.org)).

## الطريقة 1: من الطرفية (Terminal)

1. افتح **Terminal** على الماك.
2. انتقل لمجلد المشروع:
   ```bash
   cd /المسار/إلى/shablol-world
   ```
3. شغّل أحد الأمرين:
   ```bash
   npm run build:mac
   ```
   أو استخدم السكربت الجاهز:
   ```bash
   chmod +x build-mac.sh
   ./build-mac.sh
   ```
4. بعد انتهاء البناء ستجد الملفات في مجلد **dist/**:
   - `عالم شبلول 1.0.0.dmg` — للتثبيت بالسحب والإفلات.
   - `عالم شبلول 1.0.0-mac.zip` — أرشيف للتوزيع.

## ⚠️ من Windows لا يعمل

عند تشغيل `npm run build:mac` على Windows يظهر:

```
Build for macOS is supported only on macOS
```

هذا **مقصود**: حزمة electron-builder لا تدعم بناء تطبيق Mac إلا على نظام **macOS** نفسه (لا يوجد حل من ويندوز مباشرة).

**خياراتك:**
1. **استخدام جهاز Mac** — انقل المشروع إلى ماك وشغّل فيه `npm run build:mac` (الطريقة 1 أعلاه).
2. **استخدام CI على ماك** — المشروع يتضمن ملف `.github/workflows/build-mac.yml`. بعد رفع المشروع إلى GitHub: اذهب إلى **Actions** → **Build Mac** → **Run workflow**. عند انتهاء البناء حمّل ملفات DMG/ZIP من تبويب **Artifacts** دون الحاجة لامتلاك جهاز Mac.

## ملخص الأوامر

| الأمر | الوصف |
|--------|--------|
| `npm run build` | بناء كل المنصات (ويندوز + ماك إن وُجدت إعداداتها) |
| `npm run build:win` | بناء ويندوز فقط |
| `npm run build:mac` | بناء Mac فقط (DMG + ZIP) |

---
تم إعداد الإعدادات في **package.json** وأيقونة Mac في **build/icon.png** (تُنشأ تلقائياً عند `npm run prebuild` أو قبل البناء).
