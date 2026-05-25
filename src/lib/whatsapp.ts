/**
 * Centralized WhatsApp redirect utility
 * All CTA messages flow through this single module.
 * Number: +51 949 090 421 → wa.me/51949090421
 *
 * CRITICAL: Every message MUST use native \n line breaks
 * and be wrapped in encodeURIComponent() before URL concatenation.
 * This ensures correct emoji rendering on WhatsApp Web (PC) and mobile.
 */

import { HOTEL_LOCATION } from '@/lib/data';

const WHATSAPP_NUMBER = '51949090421';

/* ─── Core: build URL with proper encoding ─────────────────────── */

function buildWhatsAppURL(rawMessage: string): string {
  // encodeURIComponent handles:
  // - Emojis (UTF-8 → percent-encoded, e.g. 🌊 → %F0%9F%8C%8A)
  // - Newlines (\n → %0A)
  // - Asterisks for bold (* → %2A)
  // - Underscores for italics (_ → %5F)
  // This is the ONLY encoding step. No manual %0A, no raw concatenation.
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
  const message = `¡Hola Hospedaje El Hombre! 🌊✨\n\nDeseo realizar una *reserva* para mi estancia en Puerto Malabrigo:\n\n🏨 *Habitación:* ${payload.roomName}\n📅 *Check-in:* ${payload.checkIn}\n📅 *Check-out:* ${payload.checkOut}\n🌙 *Noches:* ${payload.nights}\n👥 *Huéspedes:* ${payload.guests}\n\n💰 *Total Estimado:* S/. ${payload.total}\n\n¡Quedo atento para coordinar el depósito del 50% y confirmar mi estadía! 🤙🏄‍♂️`;

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
  const itemLines = items
    .map((i) => `  ${i.quantity}x _${i.name}_ — S/. ${i.unitPrice}`)
    .join('\n');

  const message = `¡Hola Restaurante El Hombre! 🌊🦐\n\nDeseo realizar un *pedido* de comida desde su carta digital:\n\n📝 *DETALLE DEL PEDIDO:*\n${itemLines}\n\n💰 *TOTAL A PAGAR:* S/. ${total}\n\n¡Quedo atento para confirmar el tiempo de preparación y pasar por mi pedido! 🤙🐟`;

  openWhatsApp(message);
}

/* ═══════════════════════════════════════════════════════════════════
   3. GENERAL — Info request (Navbar, Footer, etc.)
   ═══════════════════════════════════════════════════════════════════ */

export function sendGeneralWA() {
  const message = `¡Hola Equipo de El Hombre Puerto Malabrigo! 🌊🏄‍♂️\n\nVisité su sitio web y me gustaría recibir *información personalizada* sobre sus servicios, disponibilidad de habitaciones o clases de surf.\n\n¡Muchas gracias, quedo atento! 🤙✨`;

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
  const message = `¡Hola Hospedaje El Hombre! 🌊✨\n\nMe interesa la *${payload.roomName}* (${payload.price}/noche) en Puerto Chicama.\n\n¿Podrían confirmarme disponibilidad y tarifas para las fechas que tengo en mente?\n\n¡Quedo atento, gracias! 🤙🏄‍♂️`;

  openWhatsApp(message);
}

/* ═══════════════════════════════════════════════════════════════════
   5. EXPERIENCE DIRECT — Inquiry for a specific experience
   ═══════════════════════════════════════════════════════════════════ */

export function sendExperienceWA(experienceName: string) {
  const message = `¡Hola Equipo de El Hombre! 🌊✨\n\nMe interesa la experiencia _*${experienceName}*_ que vi en su sitio web.\n\n¿Podrían darme más información sobre disponibilidad, precios y cómo reservar?\n\n¡Muchas gracias, quedo atento! 🤙🏄‍♂️`;

  openWhatsApp(message);
}
