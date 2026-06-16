'use client';

import { motion } from 'framer-motion';
import { experiences } from '@/lib/data';
import { sendExperienceWA } from '@/lib/whatsapp';
import { Phone } from 'lucide-react';
import { useLang } from '@/lib/i18n-context';

export function Experiences() {
  const { t } = useLang();
  return (
    <section id="experiencias" className="w-full py-24 md:py-32">
      <div className="w-full max-w-6xl mx-auto px-5 md:px-8 mb-16">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange-500 bg-orange-500/10 px-3 py-1 rounded-[2px]">
            experiencias
          </span>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-orange-500 text-sm uppercase tracking-[0.2em]"
          >
            {t('Aventuras', 'Adventures')}
          </motion.p>
        </div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl md:text-4xl lg:text-5xl font-serif font-light text-slate-900 dark:text-white"
        >
          {t('Experiencias', 'Experiences')}
        </motion.h2>
      </div>

      <div className="w-full max-w-6xl mx-auto px-5 md:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
        {experiences.map((exp, index) => (
          <motion.div
            key={exp.title.es}
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: index * 0.12, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
            whileHover={{ y: -4 }}
            className="relative group overflow-hidden rounded-xl border border-gray-100/50 dark:border-white/5 bg-neutral-900 shadow-sm transition-all duration-500 hover:shadow-xl"
          >
            {/* Image */}
            <div className="relative h-[400px] overflow-hidden">
              <img
                src={exp.image}
                alt={t(exp.title.es, exp.title.en)}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.dataset.retried) {
                    target.dataset.retried = '1';
                    target.src = `https://placehold.co/800x1067/0f172a/F97316?text=${encodeURIComponent(t(exp.title.es, exp.title.en))}`;
                  }
                }}
              />

              {/* Premium dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
            </div>

            {/* Tag — top left */}
            <div className="absolute top-4 left-4 z-10">
              <span className="bg-orange-600 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-white rounded-[2px]">
                {exp.tag}
              </span>
            </div>

            {/* Inner Content — premium padding */}
            <div className="absolute bottom-0 left-0 w-full p-7 flex flex-col gap-3.5">
              {/* Title with high contrast */}
              <h3 className="text-xl font-semibold text-white tracking-tight leading-snug">
                {t(exp.title.es, exp.title.en)}
              </h3>

              {/* Light, readable description */}
              <p className="text-sm text-gray-200/90 font-light leading-relaxed max-w-[95%] line-clamp-2">
                {t(exp.description.es, exp.description.en)}
              </p>

              {/* Deluxe action button — semi-straight borders */}
              <button
                onClick={() => sendExperienceWA(t(exp.title.es, exp.title.en))}
                className="mt-2 flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-500 px-5 py-3 rounded-md text-xs font-semibold uppercase tracking-wider text-white transition-all duration-300 w-max shadow-sm hover:shadow-md active:scale-[0.98]"
              >
                <Phone className="h-4 w-4" />
                {t('Consultar', 'Inquire')}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
