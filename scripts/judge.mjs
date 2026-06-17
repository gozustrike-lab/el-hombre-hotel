import { readFileSync, existsSync } from 'fs';
import { execSync } from 'child_process';

const shots = [
  { id: 'F1', file: 'F1-mobile-hero.png', label: 'Mobile Hero' },
  { id: 'F2', file: 'F2-mobile-rooms.png', label: 'Mobile Rooms' },
  { id: 'F3', file: 'F3-mobile-rooms-more.png', label: 'Mobile Rooms +WhatsApp' },
  { id: 'F4', file: 'F4-mobile-detail.png', label: 'Mobile Room Detail' },
  { id: 'F5', file: 'F5-mobile-detail-booking.png', label: 'Mobile Detail Booking' },
  { id: 'F6', file: 'F6-mobile-restaurante.png', label: 'Mobile Restaurante' },
  { id: 'F7', file: 'F7-desktop-rooms.png', label: 'Desktop Rooms' },
  { id: 'F8', file: 'F8-desktop-detail.png', label: 'Desktop Room Detail' },
  { id: 'F9', file: 'F9-desktop-restaurante.png', label: 'Desktop Restaurante' },
];

const PROMPT = `Eres un juez de Awwwards. Califica esta captura 1-10 y di si es "NIVEL PREMIUM" o necesita arreglos.
Solo lista PROBLEMAS reales que afecten la calidad. Si esta perfecto di "NIVEL PREMIUM - 10/10". Español, 2 lineas max.`;

for (const s of shots) {
  const path = `/home/z/my-project/download/final/${s.file}`;
  if (!existsSync(path)) { console.log(`${s.id}. ${s.label}: (no file)`); continue; }
  try {
    const outPath = `/home/z/my-project/download/final/r${s.id}.json`;
    execSync(`z-ai vision -p "${PROMPT.replace(/"/g, '\\"')}" -i "${path}" -o "${outPath}"`, { stdio: 'pipe', timeout: 30000 });
    const json = JSON.parse(readFileSync(outPath, 'utf-8'));
    console.log(`${s.id}. ${s.label}: ${json.choices?.[0]?.message?.content || '(no response)'}`);
  } catch (e) {
    console.log(`${s.id}. ${s.label}: (error)`);
  }
}