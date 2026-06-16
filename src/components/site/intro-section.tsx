'use client';

import { useLang } from '@/lib/i18n-context';
import { INTRO_TEXT } from '@/lib/data';
import { motion } from 'framer-motion';

export function IntroSection() {
  const { t } = useLang();

  return (
    <motion.section
      id="intro"
      className="py-20 md:py-28"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-6xl mx-auto px-5 md:px-8 flex items-start gap-4">
        <div className="w-1 h-12 bg-orange-500 rounded-full shrink-0 mt-1" />
        <p className="text-lg md:text-xl font-light text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
          {t(INTRO_TEXT.es, INTRO_TEXT.en)}
        </p>
      </div>
    </motion.section>
  );
}
