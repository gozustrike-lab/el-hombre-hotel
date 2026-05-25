/**
 * Centralized WhatsApp redirect utility
 * All CTA messages flow through this single module.
 * Number: +51 949 090 421 → wa.me/51949090421
 */

import { HOTEL_LOCATION } from '@/lib/data';

const WHATSAPP_BASE = `https://wa.me/${HOTEL_LOCATION.whatsapp}?text=`;

/* ─── Helper: open WhatsApp in new tab ─────────────────────────── */

function openWhatsApp(encodedMessage: string) {
  window.open(`${WHATSAPP_BASE}${encodedMessage}`, '_blank', 'noopener,noreferrer');
}

/* ─── Helper: build a message array → URI-encoded string ──────── */

function encode(lines: string[]): string {
  return encodeURIComponent(lines.join('\n'));
}

/* ═══════════════════════════════════════════════════════════════════
   1. HOSPEDAJE — Room Reservation
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
  const msg = encode([
    '¡Hola Hospedaje El Hombre! 🌊✨',
    '',
    'Deseo realizar una *reserva* para mi estancia en Puerto Malabrigo:',
    '',
    `🏨 *Habitación:* ${payload.roomName}`,
    `📅 *Check-in:* ${payload.checkIn}`,
    `📅 *Check-out:* ${payload.checkOut}`,
    `🌙 *Noches:* ${payload.nights}`,
    `👥 *Huéspedes:* ${payload.guestes}`,
    '',
    `💰 *Total Estimado:* S/. ${payload.total}`,
    '',
    '¡Quedo atento para coordinar el depósito del 50% y confirmar mi estadía! 🤙🏄‍♂️',
  ]);
  openWhatsApp(msg);
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
  const itemLines = items.map(
    (i) => `  ${i.quantity}x _${i.name}_ — S/. ${i.unitPrice}`,
  );

  const msg = encode([
    '¡Hola Restaurante El Hombre! 🌊🦐',
    '',
    'Deseo realizar un *pedido* de comida desde su carta digital:',
    '',
    '📝 *DETALLE DEL PEDIDO:*',
    ...itemLines,
    '',
    `💰 *TOTAL A PAGAR:* S/. ${total}`,
    '',
    '¡Quedo atento para confirmar el tiempo de preparación y pasar por mi pedido! 🤙🐟',
  ]);
  openWhatsApp(msg);
}

/* ═══════════════════════════════════════════════════════════════════
   3. EXPERIENCIAS / GENERAL — Info request (navbar, footer, etc.)
   ═══════════════════════════════════════════════════════════════════ */

export function sendGeneralWA() {
  const msg = encode([
    '¡Hola Equipo de El Hombre Puerto Malabrigo! 🌊🏄‍♂️',
    '',
    'Visité su sitio web y me gustaría recibir *información personalizada* sobre sus servicios, disponibilidad de habitaciones o clases de surf.',
    '',
    '¡Muchas gracias, quedo atento! 🤙✨',
  ]);
  openWhatsApp(msg);
}

/* ═══════════════════════════════════════════════════════════════════
   4. ROOM DIRECT — Quick room inquiry from lightbox card
   ═══════════════════════════════════════════════════════════════════ */

export interface RoomDirectPayload {
  roomName: string;
  price: string;
}

export function sendRoomDirectWA(payload: RoomDirectPayload) {
  const msg = encode([
    '¡Hola Hospedaje El Hombre! 🌊✨',
    '',
    `Me interesa la *${payload.roomName}* (${payload.price}/noche) en Puerto Chicama.`,
    '',
    '¿Podrían confirmarme disponibilidad y tarifas para las fechas que tengo en mente?',
    '',
    '¡Quedo atento, gracias! 🤙🏄‍♂️',
  ]);
  openWhatsApp(msg);
}

/* ═══════════════════════════════════════════════════════════════════
   5. EXPERIENCE DIRECT — Inquiry for a specific experience
   ═══════════════════════════════════════════════════════════════════ */

export function sendExperienceWA(experienceName: string) {
  const msg = encode([
    '¡Hola Equipo de El Hombre! 🌊✨',
    '',
    `Me interesa la experiencia *_${experienceName}_* que vi en su sitio web.`,
    '',
    '¿Podrían darme más información sobre disponibilidad, precios y cómo reservar?',
    '',
    '¡Muchas gracias, quedo atento! 🤙🏄‍♂️',
  ]);
  openWhatsApp(msg);
}
