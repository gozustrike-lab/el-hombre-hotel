'use client';

import { useState, useMemo } from 'react';
import { Search, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import { sendBookingWA } from '@/lib/whatsapp';

const roomOptions = [
  { value: '', label: 'Tipo de habitación', name: '', pricePerNight: 0 },
  { value: 'numero-6', label: 'Nº 6 Individual — S/. 55/noche', name: 'NÚMERO 6 — Habitación Individual', pricePerNight: 55 },
  { value: 'numero-3', label: 'Nº 3 Doble — S/. 110/noche', name: 'NÚMERO 3 — Habitación Doble', pricePerNight: 110 },
  { value: 'king-vista-al-mar', label: 'King Vista al Mar — S/. 80–160/noche', name: 'Habitación Cama King con Vista al Mar', pricePerNight: 80 },
  { value: 'queen-privada-vista-al-mar', label: 'Queen Privada Vista al Mar — S/. 80–160/noche', name: 'Habitación Cama Queen con Vista al Mar (Privada)', pricePerNight: 80 },
  { value: 'privada-camas-dobles', label: 'Privada Camas Dobles — Consultar', name: 'Habitación Privada Camas Dobles', pricePerNight: 0 },
  { value: 'triple', label: 'Triple — S/. 170/noche', name: 'Habitación Triple', pricePerNight: 170 },
  { value: 'queen-vista-al-mar', label: 'Queen Vista al Mar — S/. 60–120/noche', name: 'Habitación Queen con Vista al Mar', pricePerNight: 60 },
];

export function BookingBar() {
  const [room, setRoom] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('1');

  /* Calculate nights & total dynamically */
  const { nights, total } = useMemo(() => {
    const selectedRoom = roomOptions.find((r) => r.value === room);
    if (!selectedRoom || !checkIn || !checkOut) return { nights: 0, total: 0 };

    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffMs = end.getTime() - start.getTime();
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays <= 0) return { nights: 0, total: 0 };

    return {
      nights: diffDays,
      total: diffDays * selectedRoom.pricePerNight,
    };
  }, [room, checkIn, checkOut]);

  const selectedRoom = roomOptions.find((r) => r.value === room);

  const formatForDisplay = (dateStr: string) => {
    if (!dateStr) return '';
    const d = new Date(dateStr + 'T12:00:00');
    return d.toLocaleDateString('es-PE', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
  };

  const handleReserve = () => {
    if (!selectedRoom || !checkIn || !checkOut || nights <= 0) return;

    sendBookingWA({
      roomName: selectedRoom.name,
      checkIn: formatForDisplay(checkIn),
      checkOut: formatForDisplay(checkOut),
      guests: parseInt(guests, 10),
      nights,
      total: total.toFixed(0),
    });
  };

  return (
    <motion.div
      className="w-full max-w-5xl mx-auto"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.1, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="backdrop-blur-2xl bg-white/15 dark:bg-slate-900/40 rounded-2xl border border-white/10 p-3 md:p-4 shadow-[0_8px_32px_rgba(0,0,0,0.25)] shadow-white/[0.03] ring-1 ring-inset ring-white/[0.08]">
        {/* Desktop layout */}
        <div className="hidden md:flex items-center gap-0">
          <div className="flex-1 min-w-[160px] px-3">
            <label className="block text-white/60 text-xs uppercase tracking-wider mb-1">
              Habitación
            </label>
            <select
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              className="w-full bg-transparent text-white text-sm py-2 rounded-lg appearance-none cursor-pointer focus:outline-none"
            >
              {roomOptions.map((opt) => (
                <option key={opt.value} value={opt.value} className="bg-slate-900 text-white">
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div className="w-px h-8 bg-white/10 shrink-0" />

          <div className="flex-1 min-w-[160px] px-3">
            <label className="block text-white/60 text-xs uppercase tracking-wider mb-1">
              Fecha Entrada
            </label>
            <input
              type="date"
              value={checkIn}
              min={new Date().toISOString().split('T')[0]}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full bg-transparent text-white text-sm py-2 rounded-lg focus:outline-none [color-scheme:dark]"
            />
          </div>

          <div className="w-px h-8 bg-white/10 shrink-0" />

          <div className="flex-1 min-w-[160px] px-3">
            <label className="block text-white/60 text-xs uppercase tracking-wider mb-1">
              Fecha Salida
            </label>
            <input
              type="date"
              value={checkOut}
              min={checkIn || new Date().toISOString().split('T')[0]}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full bg-transparent text-white text-sm py-2 rounded-lg focus:outline-none [color-scheme:dark]"
            />
          </div>

          <div className="w-px h-8 bg-white/10 shrink-0" />

          <div className="flex-1 min-w-[160px] px-3">
            <label className="block text-white/60 text-xs uppercase tracking-wider mb-1">
              Huéspedes
            </label>
            <select
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="w-full bg-transparent text-white text-sm py-2 rounded-lg appearance-none cursor-pointer focus:outline-none"
            >
              {[1, 2, 3, 4].map((n) => (
                <option key={n} value={n} className="bg-slate-900 text-white">
                  {n} {n === 1 ? 'huésped' : 'huéspedes'}
                </option>
              ))}
            </select>
          </div>

          <div className="w-px h-8 bg-white/10 shrink-0" />

          <button
            onClick={handleReserve}
            disabled={!selectedRoom || !checkIn || !checkOut || nights <= 0}
            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-500/40 disabled:cursor-not-allowed text-white rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-300 shrink-0 ml-2 hover:scale-[1.02] active:scale-[0.98] shadow-[0_4px_20px_rgba(249,115,22,0.35)]"
          >
            <Search className="h-4 w-4" />
            {nights > 0 ? `Reservar · S/. ${total.toFixed(0)}` : 'Buscar'}
          </button>
        </div>

        {/* Mobile layout */}
        <div className="md:hidden grid grid-cols-2 gap-3">
          <div className="bg-white/10 rounded-xl px-3 py-2 ring-1 ring-inset ring-white/[0.06]">
            <label className="block text-white/60 text-xs uppercase tracking-wider mb-1">
              Habitación
            </label>
            <select
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              className="w-full bg-transparent text-white text-sm rounded-lg appearance-none cursor-pointer focus:outline-none"
            >
              <option value="" className="bg-slate-900 text-white">Tipo</option>
              {roomOptions.filter(r => r.value).map((opt) => (
                <option key={opt.value} value={opt.value} className="bg-slate-900 text-white">
                  {opt.name}
                </option>
              ))}
            </select>
          </div>

          <div className="bg-white/10 rounded-xl px-3 py-2 ring-1 ring-inset ring-white/[0.06]">
            <label className="block text-white/60 text-xs uppercase tracking-wider mb-1">
              Huéspedes
            </label>
            <select
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="w-full bg-transparent text-white text-sm rounded-lg appearance-none cursor-pointer focus:outline-none"
            >
              {[1, 2, 3, 4].map((n) => (
                <option key={n} value={n} className="bg-slate-900 text-white">
                  {n} {n === 1 ? 'huésped' : 'huéspedes'}
                </option>
              ))}
            </select>
          </div>

          <div className="bg-white/10 rounded-xl px-3 py-2 ring-1 ring-inset ring-white/[0.06]">
            <label className="block text-white/60 text-xs uppercase tracking-wider mb-1">
              Entrada
            </label>
            <input
              type="date"
              value={checkIn}
              min={new Date().toISOString().split('T')[0]}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full bg-transparent text-white text-sm rounded-lg focus:outline-none [color-scheme:dark]"
            />
          </div>

          <div className="bg-white/10 rounded-xl px-3 py-2 ring-1 ring-inset ring-white/[0.06]">
            <label className="block text-white/60 text-xs uppercase tracking-wider mb-1">
              Salida
            </label>
            <input
              type="date"
              value={checkOut}
              min={checkIn || new Date().toISOString().split('T')[0]}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full bg-transparent text-white text-sm rounded-lg focus:outline-none [color-scheme:dark]"
            />
          </div>

          <button
            onClick={handleReserve}
            disabled={!selectedRoom || !checkIn || !checkOut || nights <= 0}
            className="col-span-2 flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-500/40 disabled:cursor-not-allowed text-white rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-300 shadow-[0_4px_20px_rgba(249,115,22,0.35)]"
          >
            <Phone className="h-4 w-4" />
            {nights > 0 ? `Reservar · S/. ${total.toFixed(0)}` : 'Reservar por WhatsApp'}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
