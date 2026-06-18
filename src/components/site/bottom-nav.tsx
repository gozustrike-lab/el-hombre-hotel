'use client';

import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BedDouble, UtensilsCrossed } from 'lucide-react';
import { useLang } from '@/lib/i18n-context';
import { rooms } from '@/lib/data';
import { sendBookingWA } from '@/lib/whatsapp';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';

/* ─── WhatsApp SVG Icon ──────────────────────────────────────── */

function WhatsAppIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

/* ─── Booking Bottom Sheet — Framer Motion (no Radix/tailwindcss-animate) ── */

function BookingSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t, lang } = useLang();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const panelRef = useRef<HTMLDivElement>(null);

  const [selectedRoom, setSelectedRoom] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('2');

  /* Lock body scroll when open */
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

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

    const priceStr = roomData.pricing?.price2 || roomData.price;
    const priceNum = parseInt(priceStr.replace(/[^0-9]/g, ''), 10) || 0;

    return { nights: diffDays, total: diffDays * priceNum, pricePerNight: priceNum };
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
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm"
          />

          {/* Panel */}
          <motion.div
            ref={panelRef}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30, mass: 0.8 }}
            className="fixed inset-x-0 bottom-0 z-[101] max-h-[92vh] overflow-y-auto rounded-t-2xl"
            style={{
              paddingBottom: 'env(safe-area-inset-bottom, 0px)',
              backgroundColor: isDark ? '#020617' : '#ffffff',
              borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'}`,
            }}
          >
            {/* Drag handle + close */}
            <div className="sticky top-0 z-10 flex items-center justify-between px-4 pt-3 pb-1"
              style={{ backgroundColor: isDark ? '#020617' : '#ffffff' }}
            >
              <div className="flex-1 flex justify-center">
                <div className="w-10 h-1 rounded-full"
                  style={{ backgroundColor: isDark ? '#334155' : '#e2e8f0' }}
                />
              </div>
              <button
                onClick={onClose}
                className="absolute right-4 top-3 w-9 h-9 rounded-full flex items-center justify-center transition-all active:scale-90"
                style={{
                  backgroundColor: isDark ? '#1e293b' : '#f1f5f9',
                  color: isDark ? '#94a3b8' : '#64748b',
                }}
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Header */}
            <div className="px-6 pb-3 pt-1 space-y-1.5">
              <h2 className={`text-lg font-serif text-left flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                <WhatsAppIcon className="h-5 w-5 text-green-500" />
                {t('Reservar Habitación', 'Book a Room')}
              </h2>
              <p className={`text-sm text-left ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                {t(
                  'Completa los datos y reserva directamente por WhatsApp.',
                  'Fill in the details and book directly via WhatsApp.'
                )}
              </p>
            </div>

            {/* Form */}
            <div className="px-6 pb-6 space-y-5">
              {/* Room selector */}
              <div>
                <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  {t('Habitación', 'Room')}
                </label>
                <select
                  value={selectedRoom}
                  onChange={(e) => setSelectedRoom(e.target.value)}
                  className="w-full rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/40 focus:border-orange-500 transition-all border"
                  style={{
                    backgroundColor: isDark ? '#0f172a' : '#f8fafc',
                    borderColor: isDark ? '#1e293b' : '#e2e8f0',
                    color: isDark ? '#ffffff' : '#0f172a',
                  }}
                >
                  <option value="">{t('Selecciona una habitación', 'Select a room')}</option>
                  {rooms.map((room) => {
                    const name = lang === 'es' ? room.name.es : room.name.en;
                    const price = room.pricing?.price2 || room.price;
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
                <label className={`flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider mb-2.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                  </svg>
                  {t('Huéspedes', 'Guests')}
                </label>
                <div className="inline-flex rounded-xl border overflow-hidden"
                  style={{ borderColor: isDark ? '#1e293b' : '#e2e8f0' }}
                >
                  {[1, 2, 3, 4].map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setGuests(String(n))}
                      className="flex items-center justify-center gap-1.5 px-4 py-2.5 text-sm font-semibold transition-all duration-200 min-w-[44px]"
                      style={{
                        backgroundColor: guests === String(n)
                          ? '#f97316'
                          : isDark ? '#020617' : '#ffffff',
                        color: guests === String(n)
                          ? '#ffffff'
                          : isDark ? '#94a3b8' : '#475569',
                      }}
                    >
                      <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor" style={{ opacity: guests === String(n) ? 1 : 0.4 }}>
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                      </svg>
                      {n === 4 ? '4+' : n}
                    </button>
                  ))}
                </div>
              </div>

              {/* Date inputs */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
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
                    className="w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/40 focus:border-orange-500 transition-all"
                    style={{
                      backgroundColor: isDark ? '#0f172a' : '#f8fafc',
                      borderColor: isDark ? '#1e293b' : '#e2e8f0',
                      color: isDark ? '#ffffff' : '#0f172a',
                      colorScheme: isDark ? 'dark' : 'light',
                    }}
                  />
                </div>
                <div>
                  <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    {t('Salida', 'Check-out')}
                  </label>
                  <input
                    type="date"
                    value={checkOut}
                    min={checkIn || today}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/40 focus:border-orange-500 transition-all"
                    style={{
                      backgroundColor: isDark ? '#0f172a' : '#f8fafc',
                      borderColor: isDark ? '#1e293b' : '#e2e8f0',
                      color: isDark ? '#ffffff' : '#0f172a',
                      colorScheme: isDark ? 'dark' : 'light',
                    }}
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
                    className="rounded-xl p-4 space-y-2 border"
                    style={{
                      backgroundColor: isDark ? 'rgba(249, 115, 22, 0.1)' : '#fff7ed',
                      borderColor: isDark ? 'rgba(249, 115, 22, 0.2)' : '#fed7aa',
                    }}
                  >
                    <div className="flex justify-between text-sm">
                      <span className={isDark ? 'text-slate-400' : 'text-slate-600'}>
                        {t('Precio por noche', 'Price per night')}
                      </span>
                      <span className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        S/. {pricePerNight}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className={isDark ? 'text-slate-400' : 'text-slate-600'}>
                        {t('Noches', 'Nights')}
                      </span>
                      <span className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {nights}
                      </span>
                    </div>
                    <div className="h-px my-1" style={{ backgroundColor: isDark ? 'rgba(249,115,22,0.2)' : '#fed7aa' }} />
                    <div className="flex justify-between">
                      <span className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
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
                type="button"
                onClick={handleReserve}
                disabled={!canReserve}
                className="w-full flex items-center justify-center gap-2.5 rounded-xl text-base font-semibold transition-all duration-300 active:scale-[0.97] py-3.5 disabled:cursor-not-allowed"
                style={{
                  background: canReserve
                    ? 'linear-gradient(135deg, #25D366 0%, #1da851 100%)'
                    : isDark ? '#1e293b' : '#f1f5f9',
                  color: canReserve ? 'white' : isDark ? '#475569' : '#94a3b8',
                  boxShadow: canReserve ? '0 4px 20px -2px rgba(37, 211, 102, 0.35)' : 'none',
                  opacity: canReserve ? 1 : 0.6,
                  border: canReserve ? 'none' : `1px solid ${isDark ? '#334155' : '#e2e8f0'}`,
                }}
              >
                <WhatsAppIcon className="h-5 w-5" />
                {nights > 0
                  ? `${t('Reservar', 'Book')} \u00B7 S/. ${total.toFixed(0)}`
                  : t('Reservar por WhatsApp', 'Book via WhatsApp')}
              </button>

              <p className={`text-[11px] text-center ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                {t('Pago en el alojamiento \u00B7 Cancelación gratuita', 'Pay at the property \u00B7 Free cancellation')}
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ═══ Bottom Navigation Bar ════════════════════════════════════ */

export function BottomNav() {
  const pathname = usePathname();
  const { t, lang } = useLang();
  const { resolvedTheme } = useTheme();
  const [bookingOpen, setBookingOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const rafRef = useRef(false);

  const isDark = resolvedTheme === 'dark';

  /* Active state detection */
  const isRoomsActive = pathname === '/' || pathname.startsWith('/habitaciones');
  const isCartaActive = pathname === '/restaurante';

  /* Show nav only after scrolling past the hero (homepage) or 200px (other pages) */
  const handleScroll = useCallback(() => {
    if (rafRef.current) return;
    rafRef.current = true;
    requestAnimationFrame(() => {
      rafRef.current = false;
      const scrollY = window.scrollY;
      const threshold = pathname === '/' ? window.innerHeight * 0.75 : 200;
      setVisible(scrollY > threshold);
    });
  }, [pathname]);

  useEffect(() => {
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <>
      {/* ═══ FIXED BOTTOM BAR — mobile only, scroll-aware ═══ */}
      <motion.nav
        animate={{
          y: visible ? 0 : 120,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          type: 'spring',
          stiffness: 260,
          damping: 28,
          mass: 0.8,
        }}
        className="md:hidden fixed bottom-0 left-0 right-0 z-40"
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

          {/* Reservar — pill button */}
          <button
            onClick={() => setBookingOpen(true)}
            className="flex items-center justify-center gap-1.5 px-5 py-2 rounded-full text-[#128C7E] dark:text-[#25D366] font-bold text-[13px] tracking-wide transition-all duration-300 active:scale-[0.95] border border-[#25D366]/25 dark:border-[#25D366]/15 bg-[#25D366]/8 dark:bg-[#25D366]/5"
          >
            <WhatsAppIcon className="h-4 w-4" />
            <span>{t('Reservar', 'Book')}</span>
          </button>
        </div>
      </motion.nav>

      {/* ═══ BOOKING SHEET ═══ */}
      <BookingSheet open={bookingOpen} onClose={() => setBookingOpen(false)} />
    </>
  );
}