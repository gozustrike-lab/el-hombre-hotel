'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { featuredDishes } from '@/lib/data';

export function RestaurantPreview() {
  return (
    <section id="restaurante" className="w-full py-24 md:py-32">
      <div className="w-full max-w-6xl mx-auto px-5 md:px-8">
        {/* Section heading */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-orange-500 text-sm uppercase tracking-[0.2em] mb-3"
        >
          Gastronomía
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl md:text-4xl lg:text-5xl font-serif font-light text-slate-900 dark:text-white mb-20"
        >
          Sabores del Mar
        </motion.h2>
      </div>

      {/* Dishes */}
      {featuredDishes.map((dish, index) => {
        const isEven = index % 2 === 1;

        return (
          <motion.div
            key={dish.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className={`w-full max-w-6xl mx-auto px-5 md:px-8 py-12 lg:py-20 ${
              index > 0 ? 'border-t border-black/5 dark:border-white/5' : ''
            }`}
          >
            <div
              className={`flex flex-col ${
                isEven ? 'lg:flex-row-reverse' : 'lg:flex-row'
              } gap-8 lg:gap-16 items-center`}
            >
              {/* Image */}
              <div className="w-full lg:w-1/2 relative">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Text content */}
              <div className="w-full lg:w-1/2">
                <span className="text-orange-500 text-sm uppercase tracking-wider">
                  {dish.category}
                </span>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-serif font-medium text-slate-900 dark:text-white mt-2 mb-4">
                  {dish.name}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg leading-relaxed mb-6 max-w-lg">
                  {dish.description}
                </p>
                <span className="text-orange-500 text-3xl font-semibold">
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
          Ver Carta Completa
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </Link>
      </div>
    </section>
  );
}
