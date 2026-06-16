'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLang } from '@/lib/i18n-context';
import { featuredDishes } from '@/lib/data';

export function RestaurantPreview() {
  const { t } = useLang();

  return (
    <section id="restaurante" className="w-full py-24 md:py-32">
      <div className="w-full max-w-6xl mx-auto px-5 md:px-8">
        {/* Section heading */}
        <div className="flex items-center gap-3 mb-3">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange-500 bg-orange-500/10 px-3 py-1 rounded-[2px]">
            restaurante
          </span>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-orange-500 text-sm uppercase tracking-[0.2em]"
          >
            {t('Gastronomía', 'Cuisine')}
          </motion.p>
        </div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl md:text-4xl lg:text-5xl font-serif font-light text-slate-900 dark:text-white mb-20"
        >
          {t('Sabores del Mar', 'Flavors of the Sea')}
        </motion.h2>
      </div>

      {/* Dishes */}
      {featuredDishes.map((dish, index) => {
        const isEven = index % 2 === 1;

        return (
          <motion.div
            key={dish.id}
            initial={{ opacity: 0, x: isEven ? 60 : -60, y: 30 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
            className={`w-full max-w-6xl mx-auto px-5 md:px-8 py-12 lg:py-20 ${
              index > 0 ? 'border-t border-black/5 dark:border-white/5' : ''
            }`}
          >
            <div
              className={`flex flex-col ${
                isEven ? 'lg:flex-row-reverse' : 'lg:flex-row'
              } gap-8 lg:gap-16 items-center`}
            >
              {/* Image — premium card style */}
              <motion.div
                className="w-full lg:w-1/2 relative"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              >
                <div className="relative overflow-hidden rounded-xl border border-gray-100/50 dark:border-white/5 shadow-sm transition-all duration-500 hover:shadow-xl">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={dish.image}
                      alt={typeof dish.name === 'string' ? dish.name : t(dish.name.es, dish.name.en)}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (!target.dataset.retried) {
                          target.dataset.retried = '1';
                          target.src = `https://placehold.co/800x600/0f172a/F97316?text=${encodeURIComponent(typeof dish.name === 'string' ? dish.name : t(dish.name.es, dish.name.en))}`;
                        }
                      }}
                    />
                  </div>
                </div>
              </motion.div>

              {/* Text content */}
              <div className="w-full lg:w-1/2">
                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-orange-500 bg-orange-500/10 px-3 py-1 rounded-[2px]">
                  {typeof dish.category === 'string' ? dish.category : t(dish.category.es, dish.category.en)}
                </span>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-serif font-medium text-slate-900 dark:text-white mt-3 mb-4 tracking-tight">
                  {typeof dish.name === 'string' ? dish.name : t(dish.name.es, dish.name.en)}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg font-light leading-relaxed mb-6 max-w-lg opacity-90">
                  {typeof dish.description === 'string' ? dish.description : t(dish.description.es, dish.description.en)}
                </p>
                <span className="text-orange-500 text-3xl font-semibold tracking-tight">
                  {dish.price}
                </span>
              </div>
            </div>
          </motion.div>
        );
      })}

      {/* View full menu link */}
      <div className="w-full max-w-6xl mx-auto px-5 md:px-8 pt-8 pb-4">
        <Link
          href="/restaurante"
          className="inline-flex items-center gap-2 text-slate-900 dark:text-white text-lg font-medium group hover:text-orange-500 dark:hover:text-orange-500 transition-colors duration-300"
        >
          {t('Ver Carta Completa', 'View Full Menu')}
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </Link>
      </div>
    </section>
  );
}
