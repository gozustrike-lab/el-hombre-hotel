'use client';

import Link from 'next/link';
import { Instagram, Facebook, Music, MapPin, Phone, Mail } from 'lucide-react';
import { HOTEL_LOCATION } from '@/lib/data';

export function Footer() {
  return (
    <footer id="contacto" className="w-full border-t border-black/5 dark:border-white/10">
      <div className="px-6 md:px-12 lg:px-20 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
          {/* About */}
          <div>
            <h3 className="text-slate-900 dark:text-white text-lg font-serif font-medium mb-4">
              Hospedaje Restaurante El Hombre
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed max-w-sm">
              Frente a la ola izquierda más larga del mundo en Puerto Chicama,
              La Libertad, Perú. Hospedaje cómodo, gastronomía peruana de
              altura y la mejor experiencia surf de tu vida.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-slate-900 dark:text-white text-lg font-serif font-medium mb-4">
              Enlaces
            </h3>
            <div className="flex flex-col gap-2.5">
              {[
                { href: '/', label: 'Inicio' },
                { href: '/#habitaciones', label: 'Habitaciones' },
                { href: '/restaurante', label: 'Restaurante' },
                { href: '/#experiencias', label: 'Experiencias' },
                { href: '/#contacto', label: 'Contacto' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-slate-600 dark:text-slate-400 text-sm hover:text-orange-500 dark:hover:text-orange-500 transition-colors inline-flex items-center gap-1.5 group"
                >
                  <span className="w-0 h-px bg-orange-500 transition-all duration-300 group-hover:w-3" />
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-slate-900 dark:text-white text-lg font-serif font-medium mb-4">
              Contacto
            </h3>
            <div className="flex flex-col gap-3 text-sm text-slate-600 dark:text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 shrink-0 mt-0.5 text-orange-500" />
                <span>{HOTEL_LOCATION.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-orange-500" />
                <a
                  href={`tel:${HOTEL_LOCATION.phone}`}
                  className="hover:text-orange-500 transition-colors"
                >
                  {HOTEL_LOCATION.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-orange-500" />
                <a
                  href={`mailto:${HOTEL_LOCATION.email}`}
                  className="hover:text-orange-500 transition-colors"
                >
                  {HOTEL_LOCATION.email}
                </a>
              </div>
            </div>

            {/* Social icons */}
            <div className="flex gap-3 mt-6">
              <a
                href="#"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center text-slate-500 dark:text-slate-500 hover:text-orange-500 hover:bg-orange-500/10 transition-all duration-300"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center text-slate-500 dark:text-slate-500 hover:text-orange-500 hover:bg-orange-500/10 transition-all duration-300"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="#"
                aria-label="TikTok"
                className="w-9 h-9 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center text-slate-500 dark:text-slate-500 hover:text-orange-500 hover:bg-orange-500/10 transition-all duration-300"
              >
                <Music className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 pt-6 border-t border-black/5 dark:border-white/10">
          <p className="text-slate-500 dark:text-slate-600 text-xs text-center">
            © {new Date().getFullYear()} Hospedaje Restaurante El Hombre — Puerto Chicama, La Libertad, Perú. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
