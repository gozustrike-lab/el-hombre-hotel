import { readFileSync, writeFileSync, existsSync } from 'fs';
import { execSync } from 'child_process';

const screenshots = [
  { id: '01', file: '01-mobile-hero.png', label: 'Mobile Hero' },
  { id: '02', file: '02-mobile-intro.png', label: 'Mobile Intro' },
  { id: '04', file: '04-mobile-rooms-scroll.png', label: 'Mobile Rooms Scroll' },
  { id: '05', file: '05-mobile-restaurant-preview.png', label: 'Mobile Restaurant Preview' },
  { id: '06', file: '06-mobile-footer.png', label: 'Mobile Footer' },
  { id: '07', file: '07-mobile-room-detail.png', label: 'Mobile Room Detail' },
  { id: '08', file: '08-mobile-room-detail-booking.png', label: 'Mobile Room Booking' },
  { id: '09', file: '09-mobile-restaurante.png', label: 'Mobile Restaurante' },
  { id: '10', file: '10-mobile-restaurante-menu.png', label: 'Mobile Restaurante Menu' },
  { id: '11', file: '11-desktop-hero.png', label: 'Desktop Hero' },
  { id: '12', file: '12-desktop-rooms.png', label: 'Desktop Rooms' },
  { id: '13', file: '13-desktop-restaurant.png', label: 'Desktop Restaurant' },
  { id: '14', file: '14-desktop-footer.png', label: 'Desktop Footer' },
  { id: '15', file: '15-desktop-room-detail.png', label: 'Desktop Room Detail' },
  { id: '16', file: '16-desktop-restaurante.png', label: 'Desktop Restaurante' },
];

const PROMPT = `Eres un auditor senior de diseño web premium (nivel Awwwards). Analiza esta captura de pantalla de un sitio web de hotel boutique. 

Lista SOLAMENTE problemas reales que afecten la calidad premium:
- Tipografía ilegible o tamaños inconsistentes
- Elementos cortados o fuera de lugar
- Superposiciones incorrectas que tapen contenido
- Bordes rotos, sombras inconsistentes
- Colores que choquen o no armonicen
- Espaciado inconsistentes o desalineacion
- Botones que no se vean clickeables
- Texto que no contraste bien con el fondo
- Cualquier cosa que no se vea "de ultimo nivel"

Si no hay problemas reales, responde EXACTAMENTE: "Todo OK"
Responde en español, maximo 3 lineas.`;

const results = [];

for (const s of screenshots) {
  const path = `/home/z/my-project/download/audit/${s.file}`;
  if (!existsSync(path)) {
    results.push(`${s.id}. ${s.label}: (archivo no encontrado)`);
    continue;
  }

  try {
    const outPath = `/home/z/my-project/download/audit/r${s.id}.json`;
    execSync(
      `z-ai vision -p "${PROMPT.replace(/"/g, '\\"')}" -i "${path}" -o "${outPath}"`,
      { stdio: 'pipe', timeout: 30000 }
    );

    const json = JSON.parse(readFileSync(outPath, 'utf-8'));
    const content = json.choices?.[0]?.message?.content || '(sin respuesta)';
    results.push(`${s.id}. ${s.label}: ${content}`);
  } catch (e) {
    results.push(`${s.id}. ${s.label}: (error: ${e.message?.slice(0, 60)})`);
  }
}

console.log('═══ AUDITORÍA VISUAL COMPLETA ═══\n');
results.forEach(r => console.log(r));
console.log('\n═══ FIN ═══');