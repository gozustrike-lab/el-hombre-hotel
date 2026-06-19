'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BedDouble, UtensilsCrossed } from 'lucide-react';
import { useLang } from '@/lib/i18n-context';
import { useBookingContext } from '@/lib/booking-context';
import { useTheme } from 'next-themes';

/* ─── WhatsApp SVG Icon ──────────────────────────────────────── */

function WhatsAppIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

/* ═══ Bottom Navigation Bar ════════════════════════════════════ */

export function BottomNav() {
  const pathname = usePathname();
  const { t } = useLang();
  const { resolvedTheme } = useTheme();
  const { openBooking } = useBookingContext();
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
      {/* ═══ FIXED BOTTOM BAR — mobile only, scroll-aware ═══
          Using plain <nav> with CSS transition instead of motion.nav
          to avoid Framer Motion transform stacking context breaking
          click events on mobile browsers. */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-40"
        style={{
          paddingBottom: 'env(safe-area-inset-bottom, 0px)',
          transform: visible ? 'translateY(0)' : 'translateY(120px)',
          opacity: visible ? 1 : 0,
          transition: 'transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease-out',
          willChange: 'transform, opacity',
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
            type="button"
            onClick={openBooking}
            className="flex items-center justify-center gap-1.5 px-5 py-2 rounded-full text-[#128C7E] dark:text-[#25D366] font-bold text-[13px] tracking-wide transition-all duration-300 active:scale-[0.95] border border-[#25D366]/25 dark:border-[#25D366]/15 bg-[#25D366]/8 dark:bg-[#25D366]/5 cursor-pointer"
          >
            <WhatsAppIcon className="h-4 w-4" />
            <span>{t('Reservar', 'Book')}</span>
          </button>
        </div>
      </nav>
    </>
  );
}