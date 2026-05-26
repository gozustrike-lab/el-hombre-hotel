'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { X, Phone, MapPin, Mail } from 'lucide-react';
import { ThemeToggle } from '@/components/site/theme-toggle';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { HOTEL_LOCATION } from '@/lib/data';
import { sendGeneralWA } from '@/lib/whatsapp';

const navLinks = [
  { href: '/', label: 'Inicio' },
  { href: '/#habitaciones', label: 'Habitaciones' },
  { href: '/restaurante', label: 'Restaurante' },
  { href: '/#experiencias', label: 'Experiencias' },
  { href: '/#contacto', label: 'Contacto' },
];

/* ─── Mobile Menu — Complete rewrite ──────────────────────────── */

function MobileMenu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const handleReserve = () => {
    onClose();
    sendGeneralWA();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* ── BACKDROP: covers entire viewport, blocks interaction ── */}
          <motion.div
            key="mobile-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm md:hidden"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* ── PANEL: opaque sidebar, no bleed-through ── */}
          <motion.div
            key="mobile-panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{
              type: 'spring',
              damping: 32,
              stiffness: 320,
              mass: 0.8,
            }}
            className="fixed top-0 right-0 bottom-0 z-[70] w-[85vw] max-w-[360px] md:hidden
              flex flex-col justify-between
              bg-[#FDFBF7] dark:bg-slate-950/95 backdrop-blur-2xl
              border-l border-gray-200 dark:border-white/10
              shadow-[-8px_0_40px_rgba(0,0,0,0.12)] dark:shadow-[-8px_0_40px_rgba(0,0,0,0.5)]"
          >
            {/* ═══ BLOQUE SUPERIOR — Header ═══ */}
            <div className="shrink-0">
              <div className="flex items-center justify-between px-6 pt-7 pb-5">
                <div>
                  <p className="text-slate-400 dark:text-white/35 text-[10px] uppercase tracking-[0.3em] font-medium">
                    Menú
                  </p>
                  <p className="text-slate-900 dark:text-white font-serif text-xl tracking-wide mt-1">
                    El Hombre
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-full bg-black/[0.04] dark:bg-white/[0.06] border border-gray-200 dark:border-white/[0.08]
                    flex items-center justify-center
                    text-slate-500 dark:text-white/60 hover:text-slate-900 dark:hover:text-white hover:bg-black/[0.08] dark:hover:bg-white/[0.1] hover:border-gray-300 dark:hover:border-white/[0.15]
                    transition-all duration-300 active:scale-90"
                  aria-label="Cerrar menú"
                >
                  <X className="h-[18px] w-[18px]" />
                </button>
              </div>
              <div className="mx-6 h-px bg-gray-200 dark:bg-white/[0.08]" />
            </div>

            {/* ═══ BLOQUE CENTRAL — Nav Links ═══ */}
            <nav className="flex-1 flex flex-col justify-center px-6 py-6 gap-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.12 + i * 0.06,
                    duration: 0.35,
                    ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
                  }}
                >
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="flex items-center justify-between py-3.5 px-3 -mx-3 rounded-xl
                      text-slate-800 dark:text-white/90 text-[17px] font-medium tracking-wide
                      hover:text-orange-600 dark:hover:text-orange-400
                      hover:bg-orange-50 dark:hover:bg-white/[0.06]
                      active:bg-orange-100 dark:active:bg-white/[0.09]
                      transition-all duration-200"
                  >
                    {link.label}
                    <span className="text-transparent group-hover:text-orange-500 dark:group-hover:text-orange-400 text-sm transition-colors duration-200">
                      →
                    </span>
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* ═══ BLOQUE INFERIOR — Contact + CTA ═══ */}
            <div className="shrink-0 px-6 pb-8">
              {/* Divider */}
              <div className="mb-6 h-px bg-gray-200 dark:bg-white/[0.08]" />

              {/* Contact info */}
              <div className="flex flex-col gap-3 mb-6">
                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 shrink-0 mt-0.5 text-orange-500" />
                  <span className="text-slate-500 dark:text-white/50 text-xs leading-relaxed">
                    {HOTEL_LOCATION.address}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 shrink-0 text-orange-500" />
                  <a
                    href={`tel:${HOTEL_LOCATION.phone}`}
                    className="text-slate-500 dark:text-white/50 text-xs hover:text-orange-500 dark:hover:text-white/80 transition-colors"
                  >
                    {HOTEL_LOCATION.phone}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 shrink-0 text-orange-500" />
                  <span className="text-slate-500 dark:text-white/50 text-xs">
                    {HOTEL_LOCATION.email}
                  </span>
                </div>
              </div>

              {/* CTA Button */}
              <button
                onClick={handleReserve}
                className="flex items-center justify-center gap-2.5 w-full h-12 rounded-xl
                  text-white font-semibold text-[15px] tracking-wide
                  transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  background: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
                  boxShadow: '0 4px 24px -4px rgba(249, 115, 22, 0.4)',
                }}
              >
                <Phone className="h-4 w-4" />
                Reservar Ahora
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ─── Navbar ───────────────────────────────────────────────────── */

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const handleDesktopReserve = (e: React.MouseEvent) => {
    e.preventDefault();
    sendGeneralWA();
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 h-[72px] md:h-16 transition-all duration-500',
        scrolled
          ? 'backdrop-blur-xl bg-[#FDFBF7]/80 dark:bg-slate-950/80 border-b border-black/5 dark:border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.35)]'
          : 'bg-transparent'
      )}
    >
      <nav className="w-full h-full px-5 md:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <img
            src="/assets/branding/logo-horizontal-el-hombre.webp"
            alt="El Hombre"
            className={cn(
              'h-12 md:h-11 w-auto max-w-[200px] md:max-w-[240px] object-contain transition-all duration-500',
              scrolled ? 'opacity-100' : 'brightness-0 invert dark:brightness-0 dark:invert'
            )}
          />
          {!scrolled && (
            <span className="hidden md:block text-white font-serif text-xl tracking-wide drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)]">
              El Hombre
            </span>
          )}
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'text-sm font-medium transition-all duration-300 hover:text-orange-500 relative group',
                scrolled
                  ? 'text-slate-900 dark:text-white'
                  : 'text-white drop-shadow-[0_1px_8px_rgba(0,0,0,0.45)]'
              )}
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-orange-500 transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          <button
            onClick={handleDesktopReserve}
            className={cn(
              'hidden md:inline-flex items-center gap-2 text-white rounded-xl px-5 h-10 text-sm font-semibold transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] cursor-pointer',
              scrolled
                ? 'bg-orange-500 hover:bg-orange-600 shadow-md shadow-orange-500/20'
                : 'bg-orange-500/90 hover:bg-orange-500 backdrop-blur-md shadow-lg shadow-orange-500/30'
            )}
          >
            Reservar
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(true)}
            className={cn(
              'md:hidden w-11 h-11 flex items-center justify-center rounded-lg transition-all duration-300 active:scale-90',
              scrolled
                ? 'text-slate-900 dark:text-white hover:bg-black/5 dark:hover:bg-white/5'
                : 'text-white hover:bg-white/10'
            )}
            aria-label="Abrir menú"
          >
            <div className="flex flex-col gap-[5px]">
              <span className={cn(
                'block h-[2px] w-5 rounded-full transition-all duration-300',
                scrolled ? 'bg-current' : 'bg-white'
              )} />
              <span className={cn(
                'block h-[2px] w-4 rounded-full transition-all duration-300',
                scrolled ? 'bg-current' : 'bg-white'
              )} />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <MobileMenu isOpen={mobileOpen} onClose={closeMobile} />
    </header>
  );
}
