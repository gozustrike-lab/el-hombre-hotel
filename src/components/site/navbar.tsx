'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { ThemeToggle } from '@/components/site/theme-toggle';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

const navLinks = [
  { href: '/', label: 'Inicio' },
  { href: '/#habitaciones', label: 'Habitaciones' },
  { href: '/#restaurante', label: 'Restaurante' },
  { href: '/#experiencias', label: 'Experiencias' },
  { href: '/#contacto', label: 'Contacto' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-500',
        scrolled
          ? 'backdrop-blur-xl bg-[#FDFBF7]/80 dark:bg-slate-950/80 border-b border-black/5 dark:border-white/10 shadow-sm'
          : 'bg-transparent'
      )}
    >
      <nav className="w-full h-full px-4 md:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <img
            src="/assets/branding/logo-horizontal-el-hombre.webp"
            alt="El Hombre"
            className={cn(
              'h-8 transition-all duration-500',
              scrolled ? 'opacity-100' : 'brightness-0 invert dark:brightness-0 dark:invert'
            )}
          />
          {!scrolled && (
            <span className="hidden md:block text-white font-serif text-xl tracking-wide drop-shadow-lg">
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
                'text-sm font-medium transition-all duration-300 hover:text-orange-500',
                scrolled
                  ? 'text-slate-900 dark:text-white'
                  : 'text-white drop-shadow-md'
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <div className={cn(
            'transition-all duration-300',
            scrolled ? 'opacity-100' : ''
          )}>
            <ThemeToggle />
          </div>

          <Button
            asChild
            className={cn(
              'hidden md:inline-flex bg-orange-500 hover:bg-orange-600 text-white rounded-xl px-5 transition-all duration-300',
              scrolled ? '' : 'shadow-lg shadow-orange-500/30'
            )}
          >
            <Link href="/#reservar">Reservar</Link>
          </Button>

          {/* Mobile hamburger */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                className={cn(
                  'md:hidden w-9 h-9 flex items-center justify-center rounded-lg transition-colors',
                  scrolled
                    ? 'text-slate-900 dark:text-white'
                    : 'text-white'
                )}
              >
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-72 bg-[#FDFBF7] dark:bg-slate-950 border-l border-black/5 dark:border-white/10"
            >
              <SheetTitle className="text-lg font-serif text-slate-900 dark:text-white">
                Menú
              </SheetTitle>
              <div className="flex flex-col gap-6 mt-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="text-lg font-medium text-slate-900 dark:text-white hover:text-orange-500 transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="pt-4 border-t border-black/10 dark:border-white/10">
                  <Button
                    asChild
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-xl"
                  >
                    <Link href="/#reservar" onClick={() => setOpen(false)}>
                      Reservar
                    </Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
