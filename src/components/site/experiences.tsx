'use client';

import { motion } from 'framer-motion';
import { experiences } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { sendExperienceWA } from '@/lib/whatsapp';
import { Phone } from 'lucide-react';

export function Experiences() {
  return (
    <section id="experiencias" className="w-full py-24 md:py-32">
      <div className="w-full max-w-6xl mx-auto px-5 md:px-8 mb-16">
        <div className="flex items-center gap-3 mb-3">
          <Badge className="bg-orange-500/10 text-orange-500 border-orange-500/20 text-xs uppercase tracking-wider">
            experiencias
          </Badge>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-orange-500 text-sm uppercase tracking-[0.2em]"
          >
            Aventuras
          </motion.p>
        </div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl md:text-4xl lg:text-5xl font-serif font-light text-slate-900 dark:text-white"
        >
          Experiencias
        </motion.h2>
      </div>

      <div className="w-full max-w-6xl mx-auto px-5 md:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {experiences.map((exp, index) => (
          <motion.div
            key={exp.title}
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: index * 0.12, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
            whileHover={{ y: -6, scale: 1.02 }}
            className="relative group rounded-2xl overflow-hidden aspect-[3/4]"
          >
            {/* Image */}
            <img
              src={exp.image}
              alt={exp.title}
              className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-75"
              onError={(e) => {
                const target = e.currentTarget;
                if (!target.dataset.retried) {
                  target.dataset.retried = '1';
                  target.src = `https://placehold.co/800x1067/0f172a/F97316?text=${encodeURIComponent(exp.title)}`;
                }
              }}
            />

            {/* Tag */}
            <div className="absolute top-4 left-4 z-10">
              <Badge className="bg-orange-500/90 text-white border-none backdrop-blur-sm text-xs">
                {exp.tag}
              </Badge>
            </div>

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Text at bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <h3 className="text-white text-lg font-serif font-medium mb-2 leading-tight">
                {exp.title}
              </h3>
              <p className="text-white/70 text-sm leading-relaxed line-clamp-2 mb-4">
                {exp.description}
              </p>

              {/* WhatsApp CTA */}
              <button
                onClick={() => sendExperienceWA(exp.title)}
                className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg px-4 py-2.5 text-xs font-semibold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-[0_4px_16px_rgba(249,115,22,0.3)]"
              >
                <Phone className="h-3.5 w-3.5" />
                Consultar
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
