'use client';

import { motion } from 'framer-motion';
import { services, type ServiceCategory } from '@/lib/data';
import {
  Star,
  Plane,
  Wifi,
  Umbrella,
  UtensilsCrossed,
  Wine,
  Trees,
  Coffee,
  Sun,
  Waves,
  MountainSnow,
  Armchair,
  TreePine,
  ConciergeBell,
  Lock,
  Zap,
  MapPin,
  CircleDollarSign,
  Tv,
  CookingPot,
  Shirt,
  Wind,
  Package,
  ShieldCheck,
  Camera,
  FireExtinguisher,
  Shield,
  LockKeyhole,
  Bath,
  ShowerHead,
  Ruler,
  CircleDot,
  type LucideIcon,
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  Star, Plane, Wifi, Umbrella, UtensilsCrossed, Wine, Trees, Coffee,
  Sun, Waves, MountainSnow, Armchair, TreePine, ConciergeBell,
  Lock, Zap, MapPin, CircleDollarSign, Tv, CookingPot, Shirt,
  Wind, Package, ShieldCheck, Camera, FireExtinguisher, Shield,
  Bath, ShowerHead, Ruler, CircleDot,
  Safe: LockKeyhole,
  Palmtree: Trees,
  TreePalm: TreePine,
};

function ServiceIcon({ name, className }: { name: string; className?: string }) {
  const Icon = iconMap[name] || Star;
  return <Icon className={className} />;
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  },
};

export function Services() {
  return (
    <section id="servicios" className="w-full py-24 md:py-32">
      {/* Centered container */}
      <div className="w-full max-w-6xl mx-auto px-5 md:px-8">
        {/* Section heading */}
        <div className="mb-14">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-orange-500 text-sm uppercase tracking-[0.2em] mb-3"
          >
            Servicios
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-serif font-light text-slate-900 dark:text-white"
          >
            Todo lo que necesitas
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-500 dark:text-slate-400 text-base mt-4 max-w-2xl leading-relaxed"
          >
            Servicios verificados que hacen de tu estancia una experiencia completa. Frente a la Playa de Puerto Chicama, con todo lo que un viajero necesita.
          </motion.p>
        </div>

        {/* Services grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 md:gap-x-10 lg:gap-x-12">
            {services.map((cat: ServiceCategory, catIdx: number) => (
              <motion.div
                key={cat.title}
                variants={itemVariants}
                className={`
                  px-5
                  md:px-0
                  py-8
                  ${catIdx > 0 ? 'border-t border-black/5 dark:border-white/[0.06]' : ''}
                `}
              >
                {/* Category title */}
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center">
                    <ServiceIcon name={cat.icon} className="h-4 w-4 text-orange-500" />
                  </div>
                  <h3 className="text-slate-900 dark:text-white text-sm font-semibold uppercase tracking-wider">
                    {cat.title}
                  </h3>
                </div>

                {/* Items */}
                <div className="flex flex-col gap-3">
                  {cat.items.map((item) => (
                    <div
                      key={item.label}
                      className="flex items-start gap-3.5 group py-0.5"
                    >
                      <ServiceIcon
                        name={item.icon}
                        className="h-[18px] w-[18px] shrink-0 mt-0.5 text-slate-400 dark:text-slate-500 group-hover:text-orange-500 transition-colors duration-300"
                      />
                      <div className="flex items-start gap-2 min-w-0">
                        <span className="text-slate-700 dark:text-slate-300 text-sm leading-snug">
                          {item.label}
                        </span>
                        {item.paid && (
                          <span className="shrink-0 text-[10px] uppercase tracking-wider font-medium text-slate-400 dark:text-slate-600 bg-black/5 dark:bg-white/5 px-1.5 py-0.5 rounded">
                            De pago
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
