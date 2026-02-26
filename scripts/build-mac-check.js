#!/usr/bin/env node
// يتحقق من النظام: بناء Mac يعمل فقط على macOS

if (process.platform === 'darwin') {
  require('child_process').spawn('npx', ['electron-builder', '--mac'], {
    stdio: 'inherit',
    shell: true
  }).on('exit', code => process.exit(code));
} else {
  console.error('');
  console.error('  ⨯ بناء نسخة Mac غير مدعوم على هذا النظام (يعمل فقط على macOS).');
  console.error('');
  console.error('  الخيارات:');
  console.error('  • تشغيل الأمر على جهاز Mac:  npm run build:mac');
  console.error('  • استخدام GitHub Actions: ارفع المشروع ثم Actions → Build Mac → Run workflow');
  console.error('  • اقرأ: تعليمات-نسخة-Mac.md');
  console.error('');
  process.exit(1);
}
