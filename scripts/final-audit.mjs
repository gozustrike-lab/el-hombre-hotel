import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const BASE = 'https://el-hombre-hotel.vercel.app';
const out = '/home/z/my-project/download/final';

// Mobile
const m = await browser.newPage({ viewport: { width: 393, height: 852 }, deviceScaleFactor: 3 });

await m.goto(BASE + '/', { waitUntil: 'networkidle', timeout: 30000 });
await m.waitForTimeout(3500);
await m.screenshot({ path: `${out}/F1-mobile-hero.png` });

await m.evaluate(() => document.querySelector('#habitaciones')?.scrollIntoView({ behavior: 'instant' }));
await m.waitForTimeout(1500);
await m.screenshot({ path: `${out}/F2-mobile-rooms.png` });

await m.evaluate(() => window.scrollBy(0, 900));
await m.waitForTimeout(800);
await m.screenshot({ path: `${out}/F3-mobile-rooms-more.png` });

await m.goto(BASE + '/habitaciones/king-vista-al-mar', { waitUntil: 'networkidle', timeout: 30000 });
await m.waitForTimeout(3000);
await m.screenshot({ path: `${out}/F4-mobile-detail.png` });

await m.evaluate(() => window.scrollBy(0, 1300));
await m.waitForTimeout(800);
await m.screenshot({ path: `${out}/F5-mobile-detail-booking.png` });

await m.goto(BASE + '/restaurante', { waitUntil: 'networkidle', timeout: 30000 });
await m.waitForTimeout(3000);
await m.screenshot({ path: `${out}/F6-mobile-restaurante.png` });

// Desktop
const d = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await d.goto(BASE + '/', { waitUntil: 'networkidle', timeout: 30000 });
await d.waitForTimeout(3000);
await d.evaluate(() => document.querySelector('#habitaciones')?.scrollIntoView({ behavior: 'instant' }));
await d.waitForTimeout(2000);
await d.screenshot({ path: `${out}/F7-desktop-rooms.png` });

await d.goto(BASE + '/habitaciones/king-vista-al-mar', { waitUntil: 'networkidle', timeout: 30000 });
await d.waitForTimeout(3000);
await d.screenshot({ path: `${out}/F8-desktop-detail.png` });

await d.goto(BASE + '/restaurante', { waitUntil: 'networkidle', timeout: 30000 });
await d.waitForTimeout(3000);
await d.screenshot({ path: `${out}/F9-desktop-restaurante.png` });

await browser.close();
console.log('Final audit: 9 screenshots saved');