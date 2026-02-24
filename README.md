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
   ```bash
   npm install
   ```

3. **Site URL** is set in `config.json` (default: `http://shablolworld.com/`). You can change `siteUrl` if needed.

4. **Flash (for games):** Place the Pepper Flash DLL in the `flashver/` folder:
   - **Windows 64-bit:** `flashver/pepflashplayer64.dll`
   - **Windows 32-bit:** `flashver/pepflashplayer32.dll`  
   Get these from older Flash Browser releases or Flash Player archives.

5. Run the app:
   ```bash
   npm run start
   ```

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
```bash
npm install
npm run build
```

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
