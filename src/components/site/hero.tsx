'use client';

import { BookingBar } from '@/components/site/booking-bar';
import { HOTEL_SCORE } from '@/lib/data';
import { motion } from 'framer-motion';
import { ChevronDown, Waves, Sparkles } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative w-full h-screen min-h-[600px] overflow-hidden">
      {/* Background Image — Puerto Chicama beach */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80)',
        }}
      />

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 pb-32">
        {/* Floating Score Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1, type: 'spring', stiffness: 200 }}
          className="mb-6"
        >
          <div className="inline-flex items-center gap-2.5 bg-white/15 backdrop-blur-xl border border-white/20 rounded-full px-4 py-2 shadow-lg shadow-black/20">
            <Sparkles className="h-4 w-4 text-orange-400" />
            <span className="text-white text-lg font-bold tracking-tight">
              {HOTEL_SCORE.value}
            </span>
            <span className="text-white/70 text-xs font-medium uppercase tracking-wider">
              {HOTEL_SCORE.label}
            </span>
            <span className="hidden sm:inline-flex text-white/40 text-[10px]">
              · {HOTEL_SCORE.reviews} opiniones
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex items-center gap-2 mb-4"
        >
          <Waves className="h-4 w-4 text-orange-400" />
          <span className="text-orange-400 text-sm md:text-base uppercase tracking-[0.3em] font-medium drop-shadow-lg">
            Puerto Chicama, La Libertad, Perú
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-light leading-tight drop-shadow-2xl max-w-4xl"
        >
          Hospedaje Restaurante
          <br />
          <span className="font-semibold italic">El Hombre</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-white/85 text-base md:text-lg max-w-xl mt-6 leading-relaxed drop-shadow-lg"
        >
          Frente a la ola izquierda más larga del mundo.
          <br />
          Gastronomía peruana. Experiencias inolvidables.
        </motion.p>

        <motion.a
          href="#habitaciones"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
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
