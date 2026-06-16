'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BedDouble, UtensilsCrossed, ChevronDown, X } from 'lucide-react';
import { useLang } from '@/lib/i18n-context';
import { rooms, HOTEL_LOCATION } from '@/lib/data';
import { sendBookingWA } from '@/lib/whatsapp';
import { useTheme } from 'next-themes';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { motion, AnimatePresence } from 'framer-motion';

/* ─── WhatsApp SVG Icon ──────────────────────────────────────── */

function WhatsAppIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

/* ─── Booking Sheet Content ──────────────────────────────────── */

function BookingSheetContent({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const { t, lang } = useLang();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const [selectedRoom, setSelectedRoom] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('1');

  /* Reset form when sheet closes */
  const handleClose = (v: boolean) => {
    if (!v) {
      // Keep state so user can re-open and see their selection
    }
    onOpenChange(v);
  };

  /* Get room data */
  const roomData = rooms.find((r) => r.slug === selectedRoom);

  /* Calculate nights & total */
  const { nights, total, pricePerNight } = useMemo(() => {
    if (!roomData || !checkIn || !checkOut) return { nights: 0, total: 0, pricePerNight: 0 };

    const start = new Date(checkIn + 'T12:00:00');
    const end = new Date(checkOut + 'T12:00:00');
    const diffMs = end.getTime() - start.getTime();
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays <= 0) return { nights: 0, total: 0, pricePerNight: 0 };

    /* Extract numeric price */
    const priceStr = roomData.pricing
      ? roomData.pricing.price1
      : roomData.price;
    const priceNum = parseInt(priceStr.replace(/[^0-9]/g, ''), 10) || 0;

    return {
      nights: diffDays,
      total: diffDays * priceNum,
      pricePerNight: priceNum,
    };
  }, [roomData, checkIn, checkOut]);

  const formatForDisplay = (dateStr: string) => {
    if (!dateStr) return '';
    const d = new Date(dateStr + 'T12:00:00');
    const locale = lang === 'en' ? 'en-US' : 'es-PE';
    return d.toLocaleDateString(locale, { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
  };

  const handleReserve = () => {
    if (!roomData || !checkIn || !checkOut || nights <= 0) return;

    const roomName = lang === 'es' ? roomData.name.es : roomData.name.en;

    sendBookingWA({
      roomName,
      checkIn: formatForDisplay(checkIn),
      checkOut: formatForDisplay(checkOut),
      guests: parseInt(guests, 10),
      nights,
      total: total.toFixed(0),
    });
  };

  const canReserve = !!roomData && !!checkIn && !!checkOut && nights > 0;
  const today = new Date().toISOString().split('T')[0];

  return (
    <Sheet open={open} onOpenChange={handleClose}>
      <SheetContent
        side="bottom"
        className="rounded-t-2xl max-h-[90vh] overflow-y-auto p-0
          bg-white dark:bg-slate-950 border-t border-black/5 dark:border-white/10
          [&>button]:hidden"
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 rounded-full bg-slate-200 dark:bg-slate-700" />
        </div>

        <SheetHeader className="px-6 pb-2 pt-0 space-y-2">
          <SheetTitle className="text-lg font-serif text-slate-900 dark:text-white text-left flex items-center gap-2">
            <WhatsAppIcon className="h-5 w-5 text-green-500" />
            {t('Reservar Habitación', 'Book a Room')}
          </SheetTitle>
          <SheetDescription className="text-slate-500 dark:text-slate-400 text-sm text-left">
            {t(
              'Completa los datos y reserva directamente por WhatsApp.',
              'Fill in the details and book directly via WhatsApp.'
            )}
          </SheetDescription>
        </SheetHeader>

        <div className="px-6 py-5 space-y-5">
          {/* Room selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
              {t('Habitación', 'Room')}
            </label>
            <select
              value={selectedRoom}
              onChange={(e) => setSelectedRoom(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500/40 focus:border-orange-500 transition-all"
            >
              <option value="">
                {t('Selecciona una habitación', 'Select a room')}
              </option>
              {rooms.map((room) => {
                const name = lang === 'es' ? room.name.es : room.name.en;
                const price = room.pricing
                  ? `${room.pricing.price1} - ${room.pricing.price2}`
                  : room.price;
                return (
                  <option key={room.slug} value={room.slug}>
                    {name} — {price}/{t('noche', 'night')}
                  </option>
                );
              })}
            </select>
          </div>

          {/* Guests */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
              {t('Huéspedes', 'Guests')}
            </label>
            <div className="inline-flex rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
              {[1, 2, 3, 4].map((n) => (
                <button
                  key={n}
                  onClick={() => setGuests(String(n))}
                  className={`px-5 py-2.5 text-sm font-semibold transition-all duration-200 ${
                    guests === String(n)
                      ? 'bg-orange-500 text-white'
                      : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  {n} {n === 1 ? t('persona', 'guest') : t('personas', 'guests')}
                </button>
              ))}
            </div>
          </div>

          {/* Date inputs */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                {t('Entrada', 'Check-in')}
              </label>
              <input
                type="date"
                value={checkIn}
                min={today}
                onChange={(e) => {
                  setCheckIn(e.target.value);
                  if (checkOut && e.target.value >= checkOut) setCheckOut('');
                }}
                className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/40 focus:border-orange-500 transition-all ${
                  isDark
                    ? 'bg-slate-900 border-slate-800 text-white [color-scheme:dark]'
                    : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                {t('Salida', 'Check-out')}
              </label>
              <input
                type="date"
                value={checkOut}
                min={checkIn || today}
                onChange={(e) => setCheckOut(e.target.value)}
                className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/40 focus:border-orange-500 transition-all ${
                  isDark
                    ? 'bg-slate-900 border-slate-800 text-white [color-scheme:dark]'
                    : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
              />
            </div>
          </div>

          {/* Summary */}
          <AnimatePresence>
            {canReserve && (
              <motion.div
                initial={{ opacity: 0, y: 10, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, y: -10, height: 0 }}
                className="bg-orange-50 dark:bg-orange-500/10 border border-orange-200 dark:border-orange-500/20 rounded-xl p-4 space-y-2"
              >
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-400">
                    {t('Precio por noche', 'Price per night')}
                  </span>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    S/. {pricePerNight}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-400">
                    {t('Noches', 'Nights')}
                  </span>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {nights}
                  </span>
                </div>
                <div className="h-px bg-orange-200 dark:bg-orange-500/20 my-1" />
                <div className="flex justify-between">
                  <span className="font-bold text-slate-900 dark:text-white">
                    {t('Total estimado', 'Estimated total')}
                  </span>
                  <span className="text-xl font-bold text-orange-500">
                    S/. {total.toFixed(0)}
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* CTA Button */}
          <button
            onClick={handleReserve}
            disabled={!canReserve}
            className="w-full flex items-center justify-center gap-2.5 rounded-xl h-13 text-base font-semibold transition-all duration-300 active:scale-[0.97] py-3.5 disabled:opacity-40 disabled:cursor-not-allowed"
            style={{
              background: canReserve
                ? 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)'
                : '#94a3b8',
              boxShadow: canReserve ? '0 6px 24px -4px rgba(37, 211, 102, 0.5)' : 'none',
              color: 'white',
            }}
          >
            <WhatsAppIcon className="h-5 w-5" />
            {nights > 0
              ? `${t('Reservar', 'Book')} \u00B7 S/. ${total.toFixed(0)}`
              : t('Reservar por WhatsApp', 'Book via WhatsApp')}
          </button>

          <p className="text-[11px] text-center text-slate-400 dark:text-slate-500">
            {t('Pago en el alojamiento \u00B7 Cancelación gratuita', 'Pay at the property \u00B7 Free cancellation')}
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}

/* ═══ Bottom Navigation Bar ════════════════════════════════════ */

export function BottomNav() {
  const pathname = usePathname();
  const { t, lang } = useLang();
  const { resolvedTheme } = useTheme();
  const [bookingOpen, setBookingOpen] = useState(false);

  const isDark = resolvedTheme === 'dark';

  /* Active state detection */
  const isRoomsActive = pathname === '/' || pathname.startsWith('/habitaciones');
  const isCartaActive = pathname === '/restaurante';

  return (
    <>
      {/* ═══ FIXED BOTTOM BAR ═══ */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-40 transition-all duration-300"
        style={{
          paddingBottom: 'env(safe-area-inset-bottom, 0px)',
        }}
      >
        {/* Glass background */}
        <div
          className="absolute inset-0 backdrop-blur-2xl border-t"
          style={{
            backgroundColor: isDark ? 'rgba(2, 6, 23, 0.88)' : 'rgba(253, 251, 247, 0.88)',
            borderTopColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
          }}
        />

        <div className="relative max-w-lg mx-auto flex items-center justify-around h-16 px-2">
          {/* Habitaciones */}
          <Link
            href="/#habitaciones"
            className="flex flex-col items-center justify-center gap-0.5 w-20 py-1.5 rounded-xl transition-all duration-200 active:scale-90"
          >
            <BedDouble
              className={`h-5 w-5 transition-colors duration-200 ${
                isRoomsActive ? 'text-orange-500' : isDark ? 'text-slate-400' : 'text-slate-500'
              }`}
            />
            <span
              className={`text-[10px] font-semibold tracking-wide transition-colors duration-200 ${
                isRoomsActive ? 'text-orange-500' : isDark ? 'text-slate-400' : 'text-slate-500'
              }`}
            >
              {t('Habitaciones', 'Rooms')}
            </span>
          </Link>

          {/* Carta */}
          <Link
            href="/restaurante"
            className="flex flex-col items-center justify-center gap-0.5 w-20 py-1.5 rounded-xl transition-all duration-200 active:scale-90"
          >
            <UtensilsCrossed
              className={`h-5 w-5 transition-colors duration-200 ${
                isCartaActive ? 'text-orange-500' : isDark ? 'text-slate-400' : 'text-slate-500'
              }`}
            />
            <span
              className={`text-[10px] font-semibold tracking-wide transition-colors duration-200 ${
                isCartaActive ? 'text-orange-500' : isDark ? 'text-slate-400' : 'text-slate-500'
              }`}
            >
              {t('Carta', 'Menu')}
            </span>
          </Link>

          {/* Reservar — prominent green button */}
          <button
            onClick={() => setBookingOpen(true)}
            className="flex items-center justify-center gap-2 w-auto px-6 py-2.5 rounded-full text-white font-bold text-sm transition-all duration-300 hover:scale-[1.03] active:scale-[0.95] shadow-lg"
            style={{
              background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
              boxShadow: '0 4px 20px -2px rgba(37, 211, 102, 0.5)',
            }}
          >
            <WhatsAppIcon className="h-4 w-4" />
            <span>{t('Reservar', 'Book')}</span>
          </button>
        </div>
      </nav>

      {/* ═══ BOOKING SHEET ═══ */}
      <BookingSheetContent open={bookingOpen} onOpenChange={setBookingOpen} />
    </>
  );
}