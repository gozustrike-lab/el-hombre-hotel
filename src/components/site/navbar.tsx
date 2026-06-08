'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Phone, MapPin, Mail, ChevronRight, Menu } from 'lucide-react';
import { ThemeToggle } from '@/components/site/theme-toggle';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { HOTEL_LOCATION } from '@/lib/data';
import { sendGeneralWA } from '@/lib/whatsapp';
import { useTheme } from 'next-themes';
import { useScrollSpy, scrollToSection, SECTION_IDS, type SectionId } from '@/lib/use-scroll-spy';
import { usePathname } from 'next/navigation';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';

/* ─── Nav links config ──────────────────────────────────────────── */

interface NavLink {
  href: string;
  hash: string;
  label: string;
  sectionId?: SectionId;
}

const homeNavLinks: NavLink[] = [
  { href: '/#inicio', hash: 'inicio', label: 'Inicio', sectionId: 'inicio' },
  { href: '/#habitaciones', hash: 'habitaciones', label: 'Habitaciones', sectionId: 'habitaciones' },
  { href: '/#servicios', hash: 'servicios', label: 'Servicios', sectionId: 'servicios' },
  { href: '/#restaurante', hash: 'restaurante', label: 'Restaurante', sectionId: 'restaurante' },
  { href: '/#experiencias', hash: 'experiencias', label: 'Experiencias', sectionId: 'experiencias' },
  { href: '/#contacto', hash: 'contacto', label: 'Contacto', sectionId: 'contacto' },
];

const subpageNavLinks: NavLink[] = [
  { href: '/', hash: 'inicio', label: 'Inicio' },
  { href: '/habitaciones', hash: 'habitaciones', label: 'Habitaciones' },
  { href: '/restaurante', hash: 'restaurante', label: 'Restaurante' },
  { href: '/experiencias', hash: 'experiencias', label: 'Experiencias' },
  { href: '/servicios', hash: 'servicios', label: 'Servicios' },
  { href: '/#contacto', hash: 'contacto', label: 'Contacto' },
];

/* ─── Navbar ───────────────────────────────────────────────────── */

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const isHomePage = pathname === '/';
  const activeId = useScrollSpy(isHomePage);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  useEffect(() => {
    if (isHomePage && window.location.hash) {
      const hash = window.location.hash.replace('#', '');
      if (SECTION_IDS.includes(hash as typeof SECTION_IDS[number])) {
        setTimeout(() => scrollToSection(hash, 80), 200);
      }
    }
  }, [isHomePage]);

  const handleDesktopReserve = (e: React.MouseEvent) => {
    e.preventDefault();
    sendGeneralWA();
  };

  const handleDesktopNavClick = (e: React.MouseEvent<HTMLAnchorElement>, link: NavLink) => {
    if (isHomePage && link.sectionId) {
      e.preventDefault();
      scrollToSection(link.sectionId, 80);
    }
  };

  const currentNavLinks = isHomePage ? homeNavLinks : subpageNavLinks;

  const isTransparent = isHomePage && !scrolled;

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 h-[72px] md:h-16 transition-all duration-500',
        isTransparent
          ? 'bg-transparent'
          : 'backdrop-blur-xl bg-[#FDFBF7]/90 dark:bg-slate-950/90 border-b border-black/5 dark:border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.3)]',
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
              isTransparent ? 'brightness-0 invert dark:brightness-0 dark:invert' : 'opacity-100',
            )}
          />
          {isTransparent && (
            <span className="hidden md:block text-white font-serif text-xl tracking-wide drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)]">
              El Hombre
            </span>
          )}
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {currentNavLinks.map((link) => {
            const isActive = isHomePage && link.sectionId === activeId;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={(e) => handleDesktopNavClick(e, link)}
                className={cn(
                  'text-sm font-medium transition-all duration-300 relative group',
                  isActive
                    ? 'text-orange-500'
                    : isTransparent
                      ? 'text-white drop-shadow-[0_1px_8px_rgba(0,0,0,0.45)] hover:text-orange-400'
                      : 'text-slate-900 dark:text-white hover:text-orange-500',
                )}
              >
                {link.label}
                <span
                  className={cn(
                    'absolute -bottom-1 left-0 h-px transition-all duration-300',
                    isActive ? 'w-full bg-orange-500' : 'w-0 group-hover:w-full bg-orange-500',
                  )}
                />
              </Link>
            );
          })}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          <button
            onClick={handleDesktopReserve}
            className={cn(
              'hidden md:inline-flex items-center gap-2 text-white rounded-xl px-5 h-10 text-sm font-semibold transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] cursor-pointer',
              isTransparent
                ? 'bg-orange-500/90 hover:bg-orange-500 backdrop-blur-md shadow-lg shadow-orange-500/30'
                : 'bg-orange-500 hover:bg-orange-600 shadow-md shadow-orange-500/20',
            )}
          >
            Reservar
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(true)}
            className={cn(
              'md:hidden w-11 h-11 flex items-center justify-center rounded-lg transition-all duration-300 active:scale-90',
              isTransparent
                ? 'text-white hover:bg-white/10'
                : 'text-slate-900 dark:text-white hover:bg-black/5 dark:hover:bg-white/5',
            )}
            aria-label="Abrir menú"
          >
            <Menu className="h-5 w-5" strokeWidth={2} />
          </button>
        </div>
      </nav>

      {/* ═══════════════════════════════════════════════════════════
          MOBILE MENU — Shadcn Sheet (Right-Side Drawer)
          ═══════════════════════════════════════════════════════════ */}
      <Sheet open={mobileOpen} onOpenChange={(open) => !open && closeMobile()}>
        <SheetContent
          side="right"
          className="w-[85vw] max-w-[360px] h-screen fixed top-0 right-0 z-[100]
            bg-slate-950/95 backdrop-blur-2xl border-l border-white/10 text-white
            dark:bg-slate-950/95 dark:border-white/10 dark:text-white
            p-0 flex flex-col overflow-hidden
            [&>button]:hidden"
        >
          {/* ── HEADER: Brand left, X right ── */}
          <SheetHeader className="shrink-0 pt-6 pb-4 px-6 border-b border-white/10 flex-row items-center justify-between space-y-0">
            <div className="flex flex-col">
              <SheetTitle className="text-[22px] font-bold tracking-wide text-white text-left">
                El Hombre
              </SheetTitle>
              <SheetDescription className="text-[11px] uppercase tracking-[0.25em] font-medium text-white/40 text-left mt-0.5">
                Puerto Chicama
              </SheetDescription>
            </div>
            <button
              onClick={closeMobile}
              className="w-9 h-9 rounded-full flex items-center justify-center shrink-0
                border border-white/12 text-white/60 hover:text-white hover:border-white/25
                transition-all duration-200 active:scale-90"
              aria-label="Cerrar menú"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
          </SheetHeader>

          {/* ── NAV LINKS — Clean vertical list ── */}
          <nav className="flex-1 flex flex-col px-3 pt-5 overflow-y-auto">
            {(isHomePage ? homeNavLinks : subpageNavLinks).map((link, i) => {
              const isActive = isHomePage && link.sectionId === activeId;
              return (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 + i * 0.04, duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <Link
                    href={link.href}
                    onClick={() => {
                      closeMobile();
                      if (isHomePage && link.sectionId) {
                        setTimeout(() => scrollToSection(link.sectionId!), 150);
                      }
                    }}
                    className={cn(
                      'group relative flex items-center justify-between py-3.5 px-4 -mx-1 rounded-xl transition-all duration-200 active:scale-[0.98]',
                      isActive
                        ? 'text-orange-400 bg-orange-500/10'
                        : 'text-white/90 hover:text-white hover:bg-white/5',
                    )}
                  >
                    <span className="text-[16px] font-medium tracking-[0.02em]">{link.label}</span>
                    <ChevronRight className="h-4 w-4 transition-all duration-250 opacity-0 -translate-x-1.5 group-hover:opacity-100 group-hover:translate-x-0 text-orange-400" />
                  </Link>
                </motion.div>
              );
            })}
          </nav>

          {/* ── FOOTER: Contact info + WhatsApp CTA ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.4 }}
            className="shrink-0 px-6 pb-6"
            style={{ paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom))' }}
          >
            {/* Divider */}
            <div className="h-px bg-white/10 mb-5" />

            {/* Contact info */}
            <div className="flex flex-col gap-3 mb-5">
              <div className="flex items-start gap-2.5">
                <MapPin className="h-3.5 w-3.5 shrink-0 mt-0.5 text-orange-400" />
                <span className="text-[11px] leading-relaxed text-white/40">{HOTEL_LOCATION.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="h-3.5 w-3.5 shrink-0 text-orange-400" />
                <a
                  href={`tel:${HOTEL_LOCATION.phone}`}
                  className="text-[11px] text-white/40 hover:text-orange-400 transition-colors duration-200"
                >
                  {HOTEL_LOCATION.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="h-3.5 w-3.5 shrink-0 text-orange-400" />
                <span className="text-[11px] text-white/40">{HOTEL_LOCATION.email}</span>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/51949090421?text=Hola%2C%20quiero%20reservar%20en%20El%20Hombre%20-%20Puerto%20Chicama"
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMobile}
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-center text-white font-bold tracking-wide shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.97]"
              style={{ background: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)', boxShadow: '0 6px 24px -4px rgba(249, 115, 22, 0.5)' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Reservar por WhatsApp
            </a>
          </motion.div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
