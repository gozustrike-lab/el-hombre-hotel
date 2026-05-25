'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronRight, Phone } from 'lucide-react';
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

const linkVariants = {
  hidden: { opacity: 0, x: 30 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.15 + i * 0.07,
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  }),
  exit: {
    opacity: 0,
    x: 20,
    transition: { duration: 0.2 },
  },
};

function MobileMenuOverlay({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const handleReserveClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onClose();
    sendGeneralWA();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-[60] md:hidden"
        >
          {/* Backdrop with blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{
              type: 'spring',
              damping: 30,
              stiffness: 300,
              mass: 0.8,
            }}
            className="absolute top-0 right-0 bottom-0 w-[85vw] max-w-[380px] h-screen z-[70] flex flex-col"
          >
            <div className="flex-1 bg-slate-950/70 backdrop-blur-2xl border-l border-white/[0.08] shadow-2xl shadow-black/40 flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between px-6 pt-6 pb-4">
                <div>
                  <p className="text-white/40 text-[10px] uppercase tracking-[0.3em] font-medium">
                    Menú
                  </p>
                  <p className="text-white/90 font-serif text-xl tracking-wide mt-0.5">
                    El Hombre
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 active:scale-90"
                  aria-label="Cerrar menú"
                >
                  <X className="h-[18px] w-[18px]" />
                </button>
              </div>

              {/* Thin divider */}
              <div className="mx-6 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

              {/* Nav links with staggered animation */}
              <nav className="flex-1 flex flex-col justify-center px-6 py-8 gap-1">
                <AnimatePresence>
                  {navLinks.map((link, i) => (
                    <motion.div
                      key={link.href}
                      custom={i}
                      variants={linkVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <Link
                        href={link.href}
                        onClick={onClose}
                        className="group flex items-center justify-between py-3.5 px-2 -mx-2 rounded-lg transition-all duration-300 hover:bg-white/[0.04]"
                      >
                        <span className="text-white/85 text-lg font-medium tracking-wide group-hover:text-white transition-colors duration-300">
                          {link.label}
                        </span>
                        <ChevronRight className="h-4 w-4 text-white/0 group-hover:text-orange-400 transition-all duration-300 group-hover:translate-x-0.5" />
                      </Link>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </nav>

              {/* Bottom section */}
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                  className="px-6 pb-8 space-y-4"
                >
                  {/* CTA Button */}
                  <button
                    onClick={handleReserveClick}
                    className="group flex items-center justify-center gap-2.5 w-full h-12 rounded-xl text-white font-semibold text-[15px] tracking-wide transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                    style={{
                      background: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
                      boxShadow: '0 4px 24px -4px rgba(249, 115, 22, 0.4)',
                    }}
                  >
                    <Phone className="h-4 w-4" />
                    Reservar Ahora
                  </button>

                  {/* WhatsApp direct */}
                  <a
                    href={`tel:${HOTEL_LOCATION.phone}`}
                    className="flex items-center justify-center gap-2 text-white/40 text-xs tracking-wider hover:text-white/70 transition-colors"
                  >
                    <Phone className="h-3 w-3" />
                    {HOTEL_LOCATION.phone}
                  </a>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

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
        {/* Logo — bigger on both mobile and desktop */}
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
      <MobileMenuOverlay isOpen={mobileOpen} onClose={closeMobile} />
    </header>
  );
}
