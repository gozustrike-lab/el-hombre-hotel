'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { X, Phone, MapPin, Mail, ChevronRight } from 'lucide-react';
import { ThemeToggle } from '@/components/site/theme-toggle';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { HOTEL_LOCATION } from '@/lib/data';
import { sendGeneralWA } from '@/lib/whatsapp';
import { useTheme } from 'next-themes';

const navLinks = [
  { href: '/', label: 'Inicio' },
  { href: '/#habitaciones', label: 'Habitaciones' },
  { href: '/restaurante', label: 'Restaurante' },
  { href: '/#experiencias', label: 'Experiencias' },
  { href: '/#contacto', label: 'Contacto' },
];

/* ─── Premium Mobile Menu — Theme-safe with useTheme() ────────── */

function MobileMenu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const handleReserve = () => {
    onClose();
    sendGeneralWA();
  };

  /* Inline style tokens — guaranteed to work on fixed elements */
  const panelBg = isDark ? '#0f172a' : '#FDFBF7';
  const textPrimary = isDark ? '#f8fafc' : '#0f172a';
  const textSecondary = isDark ? 'rgba(255,255,255,0.45)' : '#64748b';
  const textLink = isDark ? 'rgba(255,255,255,0.85)' : '#1e293b';
  const textLinkHover = isDark ? '#ffffff' : '#0f172a';
  const borderColor = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';
  const dividerColor = isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.06)';
  const iconColor = isDark ? 'rgba(255,255,255,0.4)' : '#94a3b8';
  const hoverBg = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(249,115,22,0.06)';
  const closeBtnBg = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)';
  const closeBtnBorder = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';
  const closeBtnText = isDark ? 'rgba(255,255,255,0.5)' : '#64748b';

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* ── BACKDROP ── */}
          <motion.div
            key="mob-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-0 z-[60] md:hidden"
            style={{ backgroundColor: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)' }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* ── PANEL ── */}
          <motion.div
            key="mob-panel"
            initial={{ x: '100%', opacity: 0.8 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0.6 }}
            transition={{
              type: 'spring',
              damping: 28,
              stiffness: 300,
              mass: 0.85,
            }}
            className="fixed top-0 right-0 bottom-0 z-[70] w-[85vw] max-w-[380px] md:hidden
              flex flex-col overflow-hidden"
            style={{
              backgroundColor: panelBg,
              borderLeft: `1px solid ${borderColor}`,
              boxShadow: isDark
                ? '-12px 0 48px rgba(0,0,0,0.6), -2px 0 12px rgba(0,0,0,0.3)'
                : '-12px 0 48px rgba(0,0,0,0.1), -2px 0 8px rgba(0,0,0,0.04)',
              backdropFilter: 'blur(40px)',
              WebkitBackdropFilter: 'blur(40px)',
            }}
          >
            {/* ═══ ACCENT LINE — premium brand touch ═══ */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="absolute top-0 left-0 right-0 h-[2px] origin-left"
              style={{
                background: 'linear-gradient(90deg, #F97316 0%, #EA580C 40%, #F97316 70%, transparent 100%)',
              }}
            />

            {/* ═══ BLOQUE SUPERIOR — Header ═══ */}
            <div className="shrink-0 pt-8 pb-5 px-6">
              <div className="flex items-center justify-between">
                <div>
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.4 }}
                    className="text-[10px] uppercase tracking-[0.35em] font-medium"
                    style={{ color: textSecondary }}
                  >
                    Menú
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                    className="font-serif text-xl tracking-wide mt-1"
                    style={{ color: textPrimary }}
                  >
                    El Hombre
                  </motion.p>
                </div>
                <motion.button
                  initial={{ opacity: 0, scale: 0.8, rotate: -90 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ delay: 0.1, duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
                  onClick={onClose}
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 active:scale-90"
                  style={{
                    backgroundColor: closeBtnBg,
                    border: `1px solid ${closeBtnBorder}`,
                    color: closeBtnText,
                  }}
                  aria-label="Cerrar menú"
                >
                  <X className="h-[18px] w-[18px]" />
                </motion.button>
              </div>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.25, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="mt-4 h-px origin-left"
                style={{ backgroundColor: dividerColor }}
              />
            </div>

            {/* ═══ BLOQUE CENTRAL — Nav Links ═══ */}
            <nav className="flex-1 flex flex-col justify-center px-5 py-4 gap-0.5">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 28, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, x: 20, filter: 'blur(2px)' }}
                  transition={{
                    delay: 0.18 + i * 0.065,
                    duration: 0.45,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                >
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="group relative flex items-center justify-between py-3.5 px-4 -mx-1 rounded-xl transition-all duration-250 active:scale-[0.98]"
                    style={{ color: textLink }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.backgroundColor = hoverBg;
                      (e.currentTarget as HTMLElement).style.color = textLinkHover;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
                      (e.currentTarget as HTMLElement).style.color = textLink;
                    }}
                  >
                    <span className="text-[17px] font-medium tracking-wide">
                      {link.label}
                    </span>
                    <ChevronRight
                      className="h-4 w-4 transition-all duration-300 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                      style={{ color: '#F97316' }}
                    />
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* ═══ BLOQUE INFERIOR — Contact + CTA ═══ */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="shrink-0 px-6 pb-8"
            >
              {/* Divider */}
              <div className="mb-5 h-px" style={{ backgroundColor: dividerColor }} />

              {/* Contact info */}
              <div className="flex flex-col gap-3.5 mb-6">
                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 shrink-0 mt-0.5" style={{ color: '#F97316' }} />
                  <span className="text-xs leading-relaxed" style={{ color: textSecondary }}>
                    {HOTEL_LOCATION.address}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 shrink-0" style={{ color: '#F97316' }} />
                  <a
                    href={`tel:${HOTEL_LOCATION.phone}`}
                    className="text-xs transition-colors duration-200"
                    style={{ color: textSecondary }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#F97316'; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = textSecondary; }}
                  >
                    {HOTEL_LOCATION.phone}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 shrink-0" style={{ color: '#F97316' }} />
                  <span className="text-xs" style={{ color: textSecondary }}>
                    {HOTEL_LOCATION.email}
                  </span>
                </div>
              </div>

              {/* CTA Button */}
              <motion.button
                onClick={handleReserve}
                whileHover={{ scale: 1.025, y: -1 }}
                whileTap={{ scale: 0.975 }}
                className="relative flex items-center justify-center gap-2.5 w-full h-12 rounded-xl
                  text-white font-semibold text-[15px] tracking-wide overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
                  boxShadow: '0 4px 24px -4px rgba(249, 115, 22, 0.45), 0 0 0 0 rgba(249, 115, 22, 0)',
                }}
              >
                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0"
                  initial={{ x: '-100%' }}
                  animate={{ x: '200%' }}
                  transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1.5, ease: 'linear' }}
                  style={{
                    background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)',
                    width: '50%',
                  }}
                />
                <Phone className="h-4 w-4 relative z-10" />
                <span className="relative z-10">Reservar Ahora</span>
              </motion.button>
            </motion.div>
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
