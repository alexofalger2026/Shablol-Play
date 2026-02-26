const fs = require('fs');
const path = require('path');

const logoPath = path.join(__dirname, '..', 'logo.ico');
const outDir = path.join(__dirname, '..', 'build');
const outPath = path.join(outDir, 'icon.ico');
const outPathMac = path.join(outDir, 'icon.png');

const MIN_SIZE = 256;
const MAC_ICON_SIZE = 1024;

async function createDefaultIcon() {
  const sharp = require('sharp');
  const toIco = require('to-ico');
  const png = await sharp({
    create: { width: MIN_SIZE, height: MIN_SIZE, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } }
  }).png().toBuffer();
  const ico = await toIco([png]);
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(outPath, ico);
  const macPng = await sharp(png).resize(MAC_ICON_SIZE, MAC_ICON_SIZE).png().toBuffer();
  fs.writeFileSync(outPathMac, macPng);
  console.log('تم إنشاء أيقونة افتراضية في build/icon.ico و build/icon.png (لا يوجد logo.ico)');
}

async function resizeAndSave(images) {
  const sharp = require('sharp');
  const toIco = require('to-ico');

  const img = images.sort((a, b) => (b.width * b.height) - (a.width * a.height))[0];
  const { width, height, type, data, bpp } = img;
  const dataBuf = Buffer.from(data);

  let resized;
  if (type === 'png') {
    resized = await sharp(dataBuf).resize(MIN_SIZE, MIN_SIZE).png().toBuffer();
  } else {
    const channels = bpp === 32 ? 4 : 3;
    resized = await sharp(dataBuf, {
      raw: { width, height, channels }
    })
      .resize(MIN_SIZE, MIN_SIZE)
      .png()
      .toBuffer();
  }

  const ico = await toIco([resized]);
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(outPath, ico);
  const macPng = await sharp(resized).resize(MAC_ICON_SIZE, MAC_ICON_SIZE).png().toBuffer();
  fs.writeFileSync(outPathMac, macPng);
  console.log('تم تحجيم الأيقونة إلى 256×256 (و 1024×1024 لـ Mac) وحفظها في build/');
}

async function main() {
  try {
    if (!fs.existsSync(logoPath)) {
      await createDefaultIcon();
      return;
    }

    const decodeIco = require('decode-ico');
    const buf = fs.readFileSync(logoPath);
    const images = decodeIco(buf);
    if (!images.length) throw new Error('لا توجد صور في logo.ico');

    const largest = images.sort((a, b) => (b.width * b.height) - (a.width * a.height))[0];
    const w = largest.width || 0;
    const h = largest.height || 0;

    if (w >= MIN_SIZE && h >= MIN_SIZE) {
      fs.mkdirSync(outDir, { recursive: true });
      fs.copyFileSync(logoPath, outPath);
      const sharp = require('sharp');
      const dataBuf = Buffer.from(largest.data);
      const channels = (largest.bpp === 32) ? 4 : 3;
      const macPng = largest.type === 'png'
        ? await sharp(dataBuf).resize(MAC_ICON_SIZE, MAC_ICON_SIZE).png().toBuffer()
        : await sharp(dataBuf, { raw: { width: largest.width, height: largest.height, channels } })
            .resize(MAC_ICON_SIZE, MAC_ICON_SIZE).png().toBuffer();
      fs.writeFileSync(outPathMac, macPng);
      console.log('تم نسخ logo.ico إلى build/icon.ico وإنشاء build/icon.png لـ Mac');
      return;
    }

    await resizeAndSave(images);
  } catch (err) {
    console.error('تحضير الأيقونة:', err.message);
    process.exit(1);
  }
}

main();
