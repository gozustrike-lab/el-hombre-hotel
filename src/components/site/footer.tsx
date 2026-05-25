'use client';

import Link from 'next/link';
import { Instagram, Facebook, Music } from 'lucide-react';

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
              Frente al mar en Puerto López, Manabí. Ofrecemos hospedaje cómodo
              y gastronomía local con los mejores ingredientes del Pacífico
              ecuatoriano.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-slate-900 dark:text-white text-lg font-serif font-medium mb-4">
              Enlaces
            </h3>
            <div className="flex flex-col gap-2">
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
                  className="text-slate-600 dark:text-slate-400 text-sm hover:text-orange-500 dark:hover:text-orange-500 transition-colors"
                >
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
            <div className="flex flex-col gap-2 text-sm text-slate-600 dark:text-slate-400">
              <p>Puerto López, Manabí, Ecuador</p>
              <p>Playa Machalilla, frente al malecón</p>
              <p className="mt-2">+593 5 123 4567</p>
              <p>info@elhombre.ec</p>
            </div>

            {/* Social icons */}
            <div className="flex gap-4 mt-6">
              <a
                href="#"
                aria-label="Instagram"
                className="text-slate-500 dark:text-slate-500 hover:text-orange-500 dark:hover:text-orange-500 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="text-slate-500 dark:text-slate-500 hover:text-orange-500 dark:hover:text-orange-500 transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                aria-label="TikTok"
                className="text-slate-500 dark:text-slate-500 hover:text-orange-500 dark:hover:text-orange-500 transition-colors"
              >
                <Music className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 pt-6 border-t border-black/5 dark:border-white/10">
          <p className="text-slate-500 dark:text-slate-600 text-xs text-center">
            © {new Date().getFullYear()} Hospedaje Restaurante El Hombre. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
