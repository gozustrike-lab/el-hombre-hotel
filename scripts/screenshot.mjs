import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });

// Mobile screenshots
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });

await page.goto('https://el-hombre-hotel.vercel.app/', { waitUntil: 'networkidle', timeout: 30000 });
await page.waitForTimeout(3000);
await page.screenshot({ path: '/home/z/my-project/download/screenshot-mobile-home.png', fullPage: false });
console.log('Screenshot 1: Mobile home saved');

await page.evaluate(() => {
  document.querySelector('#habitaciones')?.scrollIntoView({ behavior: 'instant' });
});
await page.waitForTimeout(2000);
await page.screenshot({ path: '/home/z/my-project/download/screenshot-mobile-rooms.png', fullPage: false });
console.log('Screenshot 2: Mobile rooms saved');

await page.goto('https://el-hombre-hotel.vercel.app/restaurante', { waitUntil: 'networkidle', timeout: 30000 });
await page.waitForTimeout(2000);
await page.screenshot({ path: '/home/z/my-project/download/screenshot-mobile-restaurante.png', fullPage: false });
console.log('Screenshot 3: Mobile restaurante saved');

// Desktop screenshot
const desktopPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await desktopPage.goto('https://el-hombre-hotel.vercel.app/', { waitUntil: 'networkidle', timeout: 30000 });
await desktopPage.waitForTimeout(3000);
await desktopPage.evaluate(() => {
  document.querySelector('#habitaciones')?.scrollIntoView({ behavior: 'instant' });
});
await desktopPage.waitForTimeout(2000);
await desktopPage.screenshot({ path: '/home/z/my-project/download/screenshot-desktop-rooms.png', fullPage: false });
console.log('Screenshot 4: Desktop rooms saved');

await browser.close();
console.log('Done!');