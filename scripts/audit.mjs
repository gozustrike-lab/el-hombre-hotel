import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const BASE = 'https://el-hombre-hotel.vercel.app';
const out = '/home/z/my-project/download/audit';

// ─── MOBILE (iPhone 14 Pro — 393x852) ───
const m = await browser.newPage({ viewport: { width: 393, height: 852 }, deviceScaleFactor: 3 });

// 1. Home hero
await m.goto(BASE + '/', { waitUntil: 'networkidle', timeout: 30000 });
await m.waitForTimeout(3000);
await m.screenshot({ path: `${out}/01-mobile-hero.png`, fullPage: false });
console.log('01 mobile hero');

// 2. Home intro section
await m.evaluate(() => document.querySelector('#inicio')?.scrollIntoView({ behavior: 'instant' }));
await m.waitForTimeout(1000);
await m.evaluate(() => window.scrollBy(0, -200));
await m.waitForTimeout(500);
await m.screenshot({ path: `${out}/02-mobile-intro.png`, fullPage: false });
console.log('02 mobile intro');

// 3. Home rooms section
await m.evaluate(() => document.querySelector('#habitaciones')?.scrollIntoView({ behavior: 'instant' }));
await m.waitForTimeout(1500);
await m.screenshot({ path: `${out}/03-mobile-rooms.png`, fullPage: false });
console.log('03 mobile rooms');

// 4. Scroll down to see more rooms + bottom nav
await m.evaluate(() => window.scrollBy(0, 800));
await m.waitForTimeout(1000);
await m.screenshot({ path: `${out}/04-mobile-rooms-scroll.png`, fullPage: false });
console.log('04 mobile rooms scroll');

// 5. Restaurant preview section
await m.evaluate(() => document.querySelector('#restaurante')?.scrollIntoView({ behavior: 'instant' }));
await m.waitForTimeout(1500);
await m.screenshot({ path: `${out}/05-mobile-restaurant-preview.png`, fullPage: false });
console.log('05 mobile restaurant preview');

// 6. Contact/footer
await m.evaluate(() => document.querySelector('#contacto')?.scrollIntoView({ behavior: 'instant' }));
await m.waitForTimeout(1500);
await m.screenshot({ path: `${out}/06-mobile-footer.png`, fullPage: false });
console.log('06 mobile footer');

// 7. Room detail page
await m.goto(BASE + '/habitaciones/king-vista-al-mar', { waitUntil: 'networkidle', timeout: 30000 });
await m.waitForTimeout(3000);
await m.screenshot({ path: `${out}/07-mobile-room-detail.png`, fullPage: false });
console.log('07 mobile room detail');

// 8. Room detail - scroll to booking card
await m.evaluate(() => window.scrollBy(0, 1200));
await m.waitForTimeout(1000);
await m.screenshot({ path: `${out}/08-mobile-room-detail-booking.png`, fullPage: false });
console.log('08 mobile room detail booking');

// 9. Restaurant page
await m.goto(BASE + '/restaurante', { waitUntil: 'networkidle', timeout: 30000 });
await m.waitForTimeout(3000);
await m.screenshot({ path: `${out}/09-mobile-restaurante.png`, fullPage: false });
console.log('09 mobile restaurante');

// 10. Restaurant menu
await m.evaluate(() => window.scrollBy(0, 800));
await m.waitForTimeout(1000);
await m.screenshot({ path: `${out}/10-mobile-restaurante-menu.png`, fullPage: false });
console.log('10 mobile restaurante menu');

// ─── DESKTOP (1440x900) ───
const d = await browser.newPage({ viewport: { width: 1440, height: 900 } });

// 11. Desktop hero
await d.goto(BASE + '/', { waitUntil: 'networkidle', timeout: 30000 });
await d.waitForTimeout(3000);
await d.screenshot({ path: `${out}/11-desktop-hero.png`, fullPage: false });
console.log('11 desktop hero');

// 12. Desktop rooms
await d.evaluate(() => document.querySelector('#habitaciones')?.scrollIntoView({ behavior: 'instant' }));
await d.waitForTimeout(2000);
await d.screenshot({ path: `${out}/12-desktop-rooms.png`, fullPage: false });
console.log('12 desktop rooms');

// 13. Desktop restaurant preview
await d.evaluate(() => document.querySelector('#restaurante')?.scrollIntoView({ behavior: 'instant' }));
await d.waitForTimeout(2000);
await d.screenshot({ path: `${out}/13-desktop-restaurant.png`, fullPage: false });
console.log('13 desktop restaurant');

// 14. Desktop footer
await d.evaluate(() => document.querySelector('#contacto')?.scrollIntoView({ behavior: 'instant' }));
await d.waitForTimeout(2000);
await d.screenshot({ path: `${out}/14-desktop-footer.png`, fullPage: false });
console.log('14 desktop footer');

// 15. Desktop room detail
await d.goto(BASE + '/habitaciones/king-vista-al-mar', { waitUntil: 'networkidle', timeout: 30000 });
await d.waitForTimeout(3000);
await d.screenshot({ path: `${out}/15-desktop-room-detail.png`, fullPage: false });
console.log('15 desktop room detail');

// 16. Desktop restaurant page
await d.goto(BASE + '/restaurante', { waitUntil: 'networkidle', timeout: 30000 });
await d.waitForTimeout(3000);
await d.screenshot({ path: `${out}/16-desktop-restaurante.png`, fullPage: false });
console.log('16 desktop restaurante');

await browser.close();
console.log('Audit complete! 16 screenshots saved.');