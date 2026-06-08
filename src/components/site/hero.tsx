'use client';

import { useState, useEffect, useCallback } from 'react';
import { BookingBar } from '@/components/site/booking-bar';
import { HOTEL_SCORE } from '@/lib/data';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Waves, Sparkles } from 'lucide-react';

/* ─── Hero Background Slider Images ──────────────────────────── */

const HERO_SLIDES = [
  '/images/hero-fachada-el-hombre.webp',
  '/images/rooms/individual-vistas-al-mar/foto1.webp',
  '/images/hero-ceviche-peruano.webp',
] as const;

const SLIDE_INTERVAL = 5500; // 5.5 seconds per slide

/* ─── Hero Component ──────────────────────────────────────────── */

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const advanceSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(advanceSlide, SLIDE_INTERVAL);
    return () => clearInterval(timer);
  }, [advanceSlide]);

  return (
    <section id="inicio" className="relative w-full h-screen min-h-[600px] overflow-hidden">
      {/* ═══ BACKGROUND SLIDER ═══ */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${HERO_SLIDES[currentSlide]})`,
            }}
          />
        </AnimatePresence>

        {/* Dark overlay for text readability — always on top of slider */}
        <div className="absolute inset-0 bg-black/25" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/70" />
      </div>

      {/* ═══ SLIDE INDICATORS ═══ */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className="transition-all duration-500 rounded-full"
            style={{
              width: i === currentSlide ? 24 : 8,
              height: 8,
              backgroundColor:
                i === currentSlide
                  ? 'rgba(249, 115, 22, 0.9)'
                  : 'rgba(255, 255, 255, 0.35)',
            }}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      {/* ═══ CONTENT — persistent above slider ═══ */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 pb-36">
        {/* Floating Score Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1, type: 'spring', stiffness: 200 }}
          className="mb-6"
        >
          <div className="inline-flex items-center gap-2.5 bg-white/15 backdrop-blur-xl border border-white/20 rounded-full px-4 py-2 shadow-[0_4px_24px_rgba(0,0,0,0.25)] shadow-white/[0.03]">
            <Sparkles className="h-4 w-4 text-orange-400" />
            <span className="text-white text-lg font-bold tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)]">
              {HOTEL_SCORE.value}
            </span>
            <span className="text-white/70 text-xs font-medium uppercase tracking-wider drop-shadow-[0_4px_16px_rgba(0,0,0,0.7)]">
              {HOTEL_SCORE.label}
            </span>
            <span className="inline-flex text-white/40 text-[10px] drop-shadow-[0_4px_16px_rgba(0,0,0,0.7)]">
              · {HOTEL_SCORE.reviews} opiniones
            </span>
          </div>
        </motion.div>

        {/* Location */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex items-center gap-2 mb-4"
        >
          <Waves className="h-4 w-4 text-orange-400 drop-shadow-[0_4px_16px_rgba(0,0,0,0.7)]" />
          <span className="text-orange-400 text-xs md:text-sm uppercase tracking-[0.2em] font-medium drop-shadow-[0_4px_16px_rgba(0,0,0,0.7)]">
            Puerto Chicama, La Libertad, Perú
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-serif font-light leading-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.7)] max-w-4xl"
        >
          Hospedaje Restaurante
          <br />
          <span className="font-semibold italic drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]">El Hombre</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-white/90 text-sm sm:text-base md:text-lg max-w-xl mt-5 leading-relaxed drop-shadow-[0_4px_16px_rgba(0,0,0,0.7)]"
        >
          Frente a la ola izquierda más larga del mundo.
          <br />
          Gastronomía peruana. Experiencias inolvidables.
        </motion.p>

        {/* CTA */}
        <motion.a
          href="#habitaciones"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-10 inline-flex items-center gap-2 text-white/90 hover:text-white text-sm uppercase tracking-widest transition-colors drop-shadow-[0_4px_16px_rgba(0,0,0,0.7)]"
        >
          Explorar
          <ChevronDown className="h-4 w-4 animate-bounce" />
        </motion.a>
      </div>

      {/* ═══ BOOKING BAR — floating at bottom ═══ */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 w-full px-4">
        <BookingBar />
      </div>

      {/* Bottom transition gradient — smooth blend to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-b from-transparent via-slate-950/15 to-[#FDFBF7] dark:to-slate-950 z-[5]" />
    </section>
  );
}
