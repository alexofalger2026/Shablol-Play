const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');
const fs = require('fs');

const userDataRoot = app.getPath('userData');

function getConfigPath() {
  const inUserData = path.join(userDataRoot, 'config.json');
  const inApp = path.join(__dirname, 'config.json');
  if (fs.existsSync(inUserData)) return inUserData;
  if (fs.existsSync(inApp)) return inApp;
  return inUserData;
}

function ensureUserConfig() {
  const target = path.join(userDataRoot, 'config.json');
  if (fs.existsSync(target)) return;
  const defaultConfig = { siteUrl: 'http://shablolworld.com/' };
  try {
    fs.writeFileSync(target, JSON.stringify(defaultConfig, null, 2), 'utf8');
  } catch (e) {
    console.error('لم يتم إنشاء config في userData:', e.message);
  }
}

// تحميل رابط الموقع من config.json
let siteUrl = 'http://shablolworld.com/';
try {
  if (app.isPackaged) ensureUserConfig();
  const configPath = getConfigPath();
  if (fs.existsSync(configPath)) {
    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    if (config.siteUrl && config.siteUrl.trim()) {
      siteUrl = config.siteUrl.trim();
    }
  }
} catch (e) {
  console.error('خطأ في قراءة config.json:', e.message);
}

// مسار مشغل فلاش: أولاً userData ثم resources (مع التثبيت)
const is64 = process.arch === 'x64';
const flashDll = is64 ? 'pepflashplayer64.dll' : 'pepflashplayer32.dll';
const flashPathUser = path.join(userDataRoot, 'flashver', flashDll);
const flashPathApp = app.isPackaged
  ? path.join(process.resourcesPath, 'flashver', flashDll)
  : path.join(__dirname, 'flashver', flashDll);
const flashPath = fs.existsSync(flashPathUser) ? flashPathUser : flashPathApp;

if (fs.existsSync(flashPath)) {
  app.commandLine.appendSwitch('ppapi-flash-path', flashPath);
  app.commandLine.appendSwitch('ppapi-flash-version', '32.0.0.465');
  console.log('تم تفعيل فلاش:', flashPath);
} else {
  console.warn('تحذير: لم يتم العثور على ملف فلاش.');
  console.warn('ضع', flashDll, 'في مجلد flashver (بجانب البرنامج أو في:', path.join(userDataRoot, 'flashver') + ').');
}

let mainWindow = null;

app.on('window-all-closed', () => app.quit());

const iconPath = path.join(__dirname, 'logo.ico');

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    show: false,
    icon: fs.existsSync(iconPath) ? iconPath : undefined,
    webPreferences: {
      plugins: true,
      nodeIntegration: false,
      contextIsolation: true
    },
    title: 'عالم شبلول | Shablol World'
  });

  mainWindow.once('ready-to-show', () => mainWindow.show());
  mainWindow.loadURL(siteUrl);
  mainWindow.on('closed', () => { mainWindow = null; });

  // قائمة مخصصة بدون Help، مع زر تكبير كامل
  const menuTemplate = [
    {
      label: 'عرض',
      submenu: [
        {
          label: 'تكبير كامل',
          accelerator: 'F11',
          click: () => mainWindow.setFullScreen(!mainWindow.isFullScreen())
        }
      ]
    }
  ];
  Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplate));
});
