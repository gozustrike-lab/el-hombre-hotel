'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { testimonials } from '@/lib/data';

export function Testimonials() {
  return (
    <section className="w-full py-24 md:py-32">
      <div className="w-full max-w-6xl mx-auto px-5 md:px-8">
        {/* Section heading */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-orange-500 text-sm uppercase tracking-[0.2em] mb-3"
        >
          Testimonios
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl md:text-4xl lg:text-5xl font-serif font-light text-slate-900 dark:text-white mb-16"
        >
          Lo que dicen nuestros huéspedes
        </motion.h2>
      </div>

      {/* Desktop grid */}
      <div className="hidden md:grid w-full max-w-6xl mx-auto px-5 md:px-8 grid-cols-2 gap-x-12 gap-y-16">
        {testimonials.map((t, index) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="relative"
          >
            {/* Decorative quotation mark */}
            <span className="absolute -top-6 -left-2 text-orange-500/10 text-[120px] leading-none font-serif select-none pointer-events-none">
              ❝
            </span>

            {/* Stars */}
            <div className="flex gap-1 mb-4 relative z-10">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < t.rating
                      ? 'fill-orange-500 text-orange-500'
                      : 'fill-transparent text-orange-500/20'
                  }`}
                />
              ))}
            </div>

            {/* Text */}
            <p className="text-slate-700 dark:text-slate-300 text-base leading-relaxed mb-6 relative z-10">
              &ldquo;{t.text}&rdquo;
            </p>

            {/* Author */}
            <div className="flex items-center gap-3 relative z-10">
              <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-500 text-sm font-semibold shrink-0">
                {t.avatar}
              </div>
              <div>
                <p className="text-slate-900 dark:text-white text-sm font-medium">
                  {t.name}
                </p>
                <p className="text-slate-500 dark:text-slate-500 text-xs">
                  {t.location} · {t.platform}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Mobile horizontal scroll */}
      <div className="md:hidden overflow-x-auto pb-4 px-5">
        <div className="flex gap-6" style={{ minWidth: 'min-content' }}>
          {testimonials.map((t, idx) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="relative w-[300px] shrink-0"
            >
              <span className="absolute -top-6 -left-2 text-orange-500/10 text-[100px] leading-none font-serif select-none pointer-events-none">
                ❝
              </span>

              <div className="flex gap-1 mb-3 relative z-10">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < t.rating
                        ? 'fill-orange-500 text-orange-500'
                        : 'fill-transparent text-orange-500/20'
                    }`}
                  />
                ))}
              </div>

              <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed mb-5 relative z-10">
                &ldquo;{t.text}&rdquo;
              </p>

              <div className="flex items-center gap-3 relative z-10">
                <div className="w-9 h-9 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-500 text-xs font-semibold shrink-0">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-slate-900 dark:text-white text-sm font-medium">
                    {t.name}
                  </p>
                  <p className="text-slate-500 text-xs">
                    {t.location} · {t.platform}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
