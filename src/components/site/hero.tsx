'use client';

import { BookingBar } from '@/components/site/booking-bar';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative w-full h-screen min-h-[600px] overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1920&q=80)',
        }}
      />

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 pb-32">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-white/80 text-sm md:text-base uppercase tracking-[0.3em] mb-4 drop-shadow-lg"
        >
          Puerto López, Manabí, Ecuador
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-light leading-tight drop-shadow-2xl max-w-4xl"
        >
          Hospedaje Restaurante
          <br />
          <span className="font-semibold italic">El Hombre</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-white/85 text-base md:text-lg max-w-xl mt-6 leading-relaxed drop-shadow-lg"
        >
          Frente al mar. Gastronomía local. Experiencias inolvidables.
          <br />
          Tu refugio costero en el corazón de Manabí.
        </motion.p>

        <motion.a
          href="#habitaciones"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-10 inline-flex items-center gap-2 text-white/90 hover:text-white text-sm uppercase tracking-widest transition-colors"
        >
          Explorar
          <ChevronDown className="h-4 w-4 animate-bounce" />
        </motion.a>
      </div>

      {/* Booking Bar positioned at bottom */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 w-full px-4">
        <BookingBar />
      </div>
    </section>
  );
}
