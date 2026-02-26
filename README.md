<<<<<<< HEAD
# متصفح موقعي - فلاش | My Site Flash Browser

برنامج صغير يعرض **موقعك فقط** مع دعم ألعاب فلاش (Adobe Flash). مبني على Electron 9 مع Pepper Flash.

---

## ⚠️ تحذير أمني | SECURITY WARNING

هذا التطبيق يستخدم **Electron 9.4.4** و**Adobe Flash Player**، وكلاهما انتهى دعمهما ولا يتلقى تحديثات أمنية.

- **Electron 9.4.4:** انتهى الدعم آذار 2021
- **Adobe Flash Player:** انتهى الدعم 12 كانون الثاني 2021

**استخدم البرنامج فقط:**
- لتشغيل موقعك/لعبتك المحلية أو الأرشيفية
- في بيئة معزولة (مثل جهاز قديم أو VM) إن أمكن
- **لا** تستخدمه للبنوك أو البريد أو كلمات مرور حساسة

---

## التثبيت | Setup

### المتطلبات
- **Node.js** إصدار 12 إلى 15 (متوافق مع Electron 9)
- ملفات **مشغل فلاش** (انظر أدناه)

### الخطوات

1. افتح مجلد المشروع في الطرفية (Terminal / PowerShell).

2. تثبيت الحزم:
=======
# Shablol-Play

**Windows desktop launcher for [Shablol World](http://shablolworld.com/).** Opens the site in its own window with **PPAPI Flash** support so Flash games run without modern browser restrictions. Built with Electron 9.

---

## ⚠️ Security Warning

This app uses **Electron 9.4.4** and **Adobe Flash Player**, both of which are end-of-life and no longer receive security updates.

- **Electron 9.4.4:** EOL March 2021
- **Adobe Flash Player:** EOL January 12, 2021

**Use this app only for:**
- Running Shablol World / legacy Flash games
- In an isolated environment (e.g. a VM) when possible
- **Do not** use for banking, email, or sensitive accounts

---

## Setup

### Requirements
- **Node.js** 12–15 (for Electron 9)
- **Flash plugin** files (see below)

### Steps

1. Open the project folder in a terminal (PowerShell or CMD).

2. Install dependencies:
>>>>>>> 9e5b624da73b17e9cd60456070ad0e850e7511b9
   ```bash
   npm install
   ```

<<<<<<< HEAD
3. **تعديل رابط موقعك:**  
   افتح `config.json` وغيّر `siteUrl` إلى رابط صفحة لعبة فلاش أو موقعك:
   ```json
   {
     "siteUrl": "https://yoursite.com/game.html"
   }
   ```
   يمكنك استخدام رابط محلي مثل `file:///C:/path/to/game.html` أيضاً.

4. **ملف فلاش (مهم لتشغيل فلاش):**  
   ضع أحد الملفات في مجلد `flashver/`:
   - **Windows 64-bit:** `flashver/pepflashplayer64.dll`
   - **Windows 32-bit:** `flashver/pepflashplayer32.dll`  
   يمكنك الحصول عليها من إصدارات سابقة من Flash Browser أو أرشيفات Flash Player.

5. تشغيل البرنامج:
=======
3. **Site URL** is set in `config.json` (default: `http://shablolworld.com/`). You can change `siteUrl` if needed.

4. **Flash (for games):** Place the Pepper Flash DLL in the `flashver/` folder:
   - **Windows 64-bit:** `flashver/pepflashplayer64.dll`
   - **Windows 32-bit:** `flashver/pepflashplayer32.dll`  
   Get these from older Flash Browser releases or Flash Player archives.

5. Run the app:
>>>>>>> 9e5b624da73b17e9cd60456070ad0e850e7511b9
   ```bash
   npm run start
   ```

<<<<<<< HEAD
سيتم فتح نافذة واحدة تعرض **موقعك فقط** (الرابط الموجود في `config.json`).

---

## البنية | Structure

- `main.js` — نقطة الدخول، تفعيل فلاش وفتح الموقع
- `config.json` — رابط الموقع (غيّره هنا)
- `flashver/` — مجلد ملفات Pepper Flash (غير مضمنة بسبب الترخيص)

---

## استخراج النسخة النهائية

### الطريقة الأسهل (من Windows)
1. شغّل الملف **`استخراج-النسخة-النهائية.bat`** (دبل-كليك).
2. انتظر حتى ينتهي التثبيت والبناء.
3. سيُفتح مجلد **`dist`** — الملف الجاهز: **عالم شبلول 1.0.0.exe** (نسخة portable، تشغيل مباشر بدون تثبيت).

### من الطرفية
=======
---

## Project structure

- `main.js` — Entry point, Flash setup, window
- `config.json` — Site URL
- `logo.ico` — App icon (auto-resized to 256×256 on build if smaller)
- `flashver/` — Pepper Flash plugin files (not included; add your own)

---

## Building a release

### Easiest (Windows)
1. Double-click **`استخراج-النسخة-النهائية.bat`** (or run it from a terminal).
2. Wait for install and build to finish.
3. The **`dist`** folder opens. The output file is **عالم شبلول 1.0.0.exe** (portable, no installer).

### From terminal
>>>>>>> 9e5b624da73b17e9cd60456070ad0e850e7511b9
```bash
npm install
npm run build
```

<<<<<<< HEAD
النسخة النهائية في **`dist\`**:
- **عالم شبلول 1.0.0.exe** — تشغيل مباشر (portable)، مناسب للتوزيع.

---

## ملاحظة: معالج التثبيت (NSIS)

إذا كان مجلد المشروع يحتوي على **حروف عربية** في المسار (مثل «برنامج شبلول»)، فإن بناء معالج التثبيت (Setup.exe) يفشل بسبب خطأ في ترميز المسار.

- **الحل الحالي:** البناء الافتراضي ينتج **نسخة portable** (ملف exe واحد يعمل بدون تثبيت) — وهذا يعمل من أي مسار.
- **إذا أردت ملف Setup للتثبيت (NSIS):** انسخ المشروع إلى مجلد بمسار إنجليزي فقط، مثلاً:
  ```text
  C:\shablol-world
  ```
  ثم من داخل ذلك المجلد نفّذ:
  ```bash
  npm run build:nsis
  ```
  ستحصل على **عالم شبلول Setup 1.0.0.exe** في `dist\`.

بعد التثبيت، الإعدادات وملف فلاش يمكن وضعها في:
`%APPDATA%\عالم شبلول\` (مجلد `config.json` و `flashver\`).
=======
Output in **`dist/`**:
- **عالم شبلول 1.0.0.exe** — Portable executable, ready to share.

---

## NSIS installer (optional)

If the project path contains **non-ASCII characters** (e.g. Arabic folder names), the NSIS installer build may fail due to encoding.

- **Default build** produces a **portable** exe only — works from any path.
- **To get an NSIS Setup:** Copy the project to a path with ASCII-only characters, e.g. `C:\shablol-world`, then run:
  ```bash
  npm run build:nsis
  ```
  You get **عالم شبلول Setup 1.0.0.exe** in `dist/`.

After install, config and Flash files can go in:  
`%APPDATA%\عالم شبلول\` (`config.json` and `flashver\`).
>>>>>>> 9e5b624da73b17e9cd60456070ad0e850e7511b9
