/**
 * Centralized WhatsApp redirect utility
 * All CTA messages flow through this single module.
 * Number: +51 949 090 421 -> wa.me/51949090421
 *
 * CRITICAL: All emojis use Unicode escape sequences (\u{XXXX})
 * instead of literal characters to guarantee correct encoding
 * regardless of file encoding, git transfer, or build system.
 * encodeURIComponent() handles the final URL encoding.
 */

import { HOTEL_LOCATION } from '@/lib/data';

const WHATSAPP_NUMBER = '51949090421';

/* ─── Emoji constants (Unicode escape sequences) ──────────────── */

const E = {
  wave:      '\u{1F30A}',  // 🌊
  spark:     '\u2728',     // ✨
  shrimp:    '\u{1F990}',  // 🦐
  call:      '\u{1F919}',  // 🤙
  surf:      '\u{1F3C4}',  // 🏄
  surfZwj:   '\u200D',     // ZWJ
  male:      '\u2642',     // ♂
  maleVs16:  '\uFE0F',     // variation selector
  hotel:     '\u{1F3E8}',  // 🏨
  cal:       '\u{1F4C5}',  // 📅
  moon:      '\u{1F319}',  // 🌙
  people:    '\u{1F465}',  // 👥
  money:     '\u{1F4B0}',  // 💰
  memo:      '\u{1F4DD}',  // 📝
  fish:      '\u{1F41F}',  // 🐟
  surfFull:  '\u{1F3C4}\u200D\u2642\uFE0F', // 🏄‍♂️
  check:     '\u2705',     // ✅
  bed:       '\u{1F6CF}',  // 🛏️
  bath:      '\u{1F6BF}',  // 🛁
  coffee:    '\u2615',     // ☕
  wifi:      '\u{1F4F6}',  // 📶
  tv:        '\u{1F4FA}',  // 📺
  lock:      '\u{1F512}',  // 🔒
  pin:       '\u{1F4CC}',  // 📌
  star:      '\u2B50',     // ⭐
  soap:      '\u{1F9FC}',  // 🧼
  key:       '\u{1F511}',  // 🔑
  sunset:    '\u{1F305}',  // 🌅
};

/* ─── Core: build URL with proper encoding ─────────────────────── */

function buildWhatsAppURL(rawMessage: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(rawMessage)}`;
}

function openWhatsApp(rawMessage: string) {
  const url = buildWhatsAppURL(rawMessage);
  window.open(url, '_blank', 'noopener,noreferrer');
}

/* ═══════════════════════════════════════════════════════════════════
   1. HOSPEDAJE — Room Reservation (Booking Bar)
   ═══════════════════════════════════════════════════════════════════ */

export interface BookingPayload {
  roomName: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  nights: number;
  total: string;
}

export function sendBookingWA(payload: BookingPayload) {
  const g = E.wave + E.spark;
  const s = E.call + E.surfFull;

  const message =
    `Hola Hospedaje El Hombre! ${g}\n\n` +
    `Deseo realizar una *reserva* para mi estancia en Puerto Malabrigo:\n\n` +
    `${E.hotel} *Habitacion:* ${payload.roomName}\n` +
    `${E.cal} *Check-in:* ${payload.checkIn}\n` +
    `${E.cal} *Check-out:* ${payload.checkOut}\n` +
    `${E.moon} *Noches:* ${payload.nights}\n` +
    `${E.people} *Huespedes:* ${payload.guests}\n\n` +
    `${E.money} *Total Estimado:* S/. ${payload.total}\n\n` +
    `Quedo atento para coordinar el deposito del 50% y confirmar mi estadia! ${s}`;

  openWhatsApp(message);
}

/* ═══════════════════════════════════════════════════════════════════
   2. RESTAURANTE — Cart / Food Order
   ═══════════════════════════════════════════════════════════════════ */

export interface CartItemPayload {
  name: string;
  quantity: number;
  unitPrice: string;
}

export function sendRestaurantWA(items: CartItemPayload[], total: string) {
  const g = E.wave + E.shrimp;
  const s = E.call + E.fish;

  const itemLines = items
    .map((i) => `  ${i.quantity}x _${i.name}_ - S/. ${i.unitPrice}`)
    .join('\n');

  const message =
    `Hola Restaurante El Hombre! ${g}\n\n` +
    `Deseo realizar un *pedido* de comida desde su carta digital:\n\n` +
    `${E.memo} *DETALLE DEL PEDIDO:*\n${itemLines}\n\n` +
    `${E.money} *TOTAL A PAGAR:* S/. ${total}\n\n` +
    `Quedo atento para confirmar el tiempo de preparacion y pasar por mi pedido! ${s}`;

  openWhatsApp(message);
}

/* ═══════════════════════════════════════════════════════════════════
   3. GENERAL — Info request (Navbar, Footer, etc.)
   ═══════════════════════════════════════════════════════════════════ */

export function sendGeneralWA() {
  const g = E.wave + E.surfFull;
  const s = E.call + E.spark;

  const message =
    `Hola Equipo de El Hombre Puerto Malabrigo! ${g}\n\n` +
    `Visite su sitio web y me gustaria recibir *informacion personalizada* sobre sus servicios, disponibilidad de habitaciones o clases de surf.\n\n` +
    `Muchas gracias, quedo atento! ${s}`;

  openWhatsApp(message);
}

/* ═══════════════════════════════════════════════════════════════════
   4. ROOM DIRECT — Quick room inquiry from lightbox card
   ═══════════════════════════════════════════════════════════════════ */

export interface RoomDirectPayload {
  roomName: string;
  price: string;
}

export function sendRoomDirectWA(payload: RoomDirectPayload) {
  const g = E.wave + E.spark;
  const s = E.call + E.surfFull;

  const message =
    `Hola Hospedaje El Hombre! ${g}\n\n` +
    `Me interesa la *${payload.roomName}* (${payload.price}/noche) en Puerto Chicama.\n\n` +
    `Podrian confirmarme disponibilidad y tarifas para las fechas que tengo en mente?\n\n` +
    `Quedo atento, gracias! ${s}`;

  openWhatsApp(message);
}

/* ═══════════════════════════════════════════════════════════════════
   5. EXPERIENCE DIRECT — Inquiry for a specific experience
   ═══════════════════════════════════════════════════════════════════ */

export function sendExperienceWA(experienceName: string) {
  const g = E.wave + E.spark;
  const s = E.call + E.surfFull;

  const message =
    `Hola Equipo de El Hombre! ${g}\n\n` +
    `Me interesa la experiencia _*${experienceName}*_ que vi en su sitio web.\n\n` +
    `Podrian darme mas informacion sobre disponibilidad, precios y como reservar?\n\n` +
    `Muchas gracias, quedo atento! ${s}`;

  openWhatsApp(message);
}

/* ═══════════════════════════════════════════════════════════════════
   6. ROOM CARD — Detailed room info from card/preview
   ═══════════════════════════════════════════════════════════════════ */

export interface RoomCardPayload {
  roomName: string;
  badge: string;
  price: string;
  priceNote?: string;
  features: string[];
  description: string;
}

/* Map feature keywords to emojis */
function featureEmoji(text: string): string {
  const t = text.toLowerCase();
  if (t.includes('wifi'))            return E.wifi;
  if (t.includes('desayuno'))        return E.coffee;
  if (t.includes('vista') || t.includes('mar')) return E.wave;
  if (t.includes('cama') || t.includes('king') || t.includes('queen')) return E.bed;
  if (t.includes('baño') || t.includes('bañera') || t.includes('ducha')) return E.bath;
  if (t.includes('toalla'))          return E.soap;
  if (t.includes('jab'))             return E.soap;
  if (t.includes('tv'))              return E.tv;
  if (t.includes('privad'))          return E.lock;
  return E.check;
}

export function sendRoomCardWA(payload: RoomCardPayload) {
  const g = E.wave + E.spark;
  const s = E.call + E.surfFull;

  const featureLines = payload.features
    .map((f) => `   ${featureEmoji(f)}  ${f}`)
    .join('\n');

  const priceBlock = payload.priceNote
    ? `${E.money} *PRECIO:* ${payload.price} (${payload.priceNote})`
    : `${E.money} *PRECIO:* ${payload.price}`;

  const message =
    `${g} Hola Hospedaje El Hombre!\n\n` +
    `${E.hotel} *HABITACION:*\n` +
    `   *${payload.roomName}*\n` +
    `   ${payload.badge}\n\n` +
    `${priceBlock}\n\n` +
    `${E.star} *CARACTERISTICAS:*\n${featureLines}\n\n` +
    `${E.pin} *UBICACION:*\n` +
    `   Puerto Chicama, La Libertad, Peru\n\n` +
    `${E.sunset} Me gustaria verificar disponibilidad y reservar esta habitacion.\n` +
    `Quedo atento, gracias! ${s}`;

  openWhatsApp(message);
}

/* ═══════════════════════════════════════════════════════════════════
   7. ROOM DETAIL — Full room info from detail page
   ═══════════════════════════════════════════════════════════════════ */

export interface RoomDetailPayload {
  roomName: string;
  badge: string;
  description: string;
  price: string;
  priceNote?: string;
  features: string[];
  guests: number;
}

export function sendRoomDetailWA(payload: RoomDetailPayload) {
  const g = E.wave + E.spark;
  const s = E.call + E.surfFull;

  const featureLines = payload.features
    .map((f) => `   ${featureEmoji(f)}  ${f}`)
    .join('\n');

  const priceBlock = payload.priceNote
    ? `${E.money} *PRECIO:* ${payload.price} (${payload.priceNote})`
    : `${E.money} *PRECIO:* ${payload.price}`;

  const guestText = payload.guests === 1
    ? `${E.people} *HUESPEDES:* 1 persona`
    : `${E.people} *HUESPEDES:* ${payload.guests} personas`;

  const message =
    `${g} Hola Hospedaje El Hombre!\n\n` +
    `${E.hotel} *HABITACION:*\n` +
    `   *${payload.roomName}*\n` +
    `   ${payload.badge}\n\n` +
    `${E.memo} *DESCRIPCION:*\n` +
    `   ${payload.description}\n\n` +
    `${priceBlock}\n\n` +
    `${guestText}\n\n` +
    `${E.star} *CARACTERISTICAS INCLUIDAS:*\n${featureLines}\n\n` +
    `${E.pin} *UBICACION:*\n` +
    `   Puerto Chicama, La Libertad, Peru\n\n` +
    `${E.key} *POLITICAS:*\n` +
    `   Check-in: 14:00  |  Check-out: 12:00\n` +
    `   Cancelacion gratuita  |  Pago en el alojamiento\n\n` +
    `${E.sunset} Me gustaria reservar esta habitacion.\n` +
    `Por favor confirmen disponibilidad para mis fechas.\n` +
    `Quedo atento, gracias! ${s}`;

  openWhatsApp(message);
}
