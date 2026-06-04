'use client';

import Link from 'next/link';
import { Instagram, Facebook, Music, MapPin, Phone, Mail, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { HOTEL_LOCATION, HOTEL_DESCRIPTION } from '@/lib/data';
import { sendGeneralWA } from '@/lib/whatsapp';

const footerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  },
};

export function Footer() {
  return (
    <footer id="contacto" className="w-full border-t border-black/5 dark:border-white/10">
      <div className="w-full max-w-6xl mx-auto px-5 md:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
          {/* About */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-slate-900 dark:text-white text-lg font-serif font-medium mb-4">
              Hospedaje Restaurante El Hombre
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed max-w-sm">
              {HOTEL_DESCRIPTION}
            </p>
          </motion.div>

          {/* Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-slate-900 dark:text-white text-lg font-serif font-medium mb-4">
              Enlaces
            </h3>
            <div className="flex flex-col gap-2.5">
              {[
                { href: '/', label: 'Inicio' },
                { href: '/habitaciones', label: 'Habitaciones' },
                { href: '/restaurante', label: 'Restaurante' },
                { href: '/experiencias', label: 'Experiencias' },
                { href: '/servicios', label: 'Servicios' },
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
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
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

            {/* WhatsApp CTA */}
            <button
              onClick={() => sendGeneralWA()}
              className="mt-5 w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl h-11 text-sm font-semibold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-[0_4px_16px_rgba(249,115,22,0.3)]"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp Directo
            </button>

            {/* Social icons */}
            <div className="flex gap-3 mt-5">
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
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 pt-6 border-t border-black/5 dark:border-white/10"
        >
          <p className="text-slate-500 dark:text-slate-600 text-xs text-center mb-2">
            © {new Date().getFullYear()} Hospedaje Restaurante El Hombre — Puerto Chicama, La Libertad, Perú. Todos los derechos reservados.
          </p>
          <p className="text-center text-xs">
            <a
              href="https://fastpagepro.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-400 transition-colors duration-300"
            >
              Diseño & Desarrollo por{' '}
              <span className="text-orange-500 font-semibold">fastpagepro.com</span>
            </a>
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
