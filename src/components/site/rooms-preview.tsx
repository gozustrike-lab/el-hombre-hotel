'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { rooms } from '@/lib/data';
import { Users } from 'lucide-react';

import { ChevronRight } from 'lucide-react';
/* ─── Room Card — Premium Deluxe ────────────────────────────── */

function RoomCard({
  room,
  index,
}: {
  room: (typeof rooms)[number];
  index: number;
}) {
  const galleryCount = room.gallery?.length || 0;
  const hasDynamicPricing = 'pricing' in room;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{
        duration: 0.6,
        delay: index * 0.06,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{ y: -4 }}
      className="group"
    >
      <Link
        href={`/habitaciones/${room.slug}`}
        className="block relative rounded-xl overflow-hidden bg-white dark:bg-slate-900 shadow-sm border border-gray-100/50 dark:border-white/5 hover:shadow-xl transition-all duration-500"
      >
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={room.image}
            alt={room.name}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
            draggable={false}
          />

          {/* Subtle gradient on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Badge */}
          <div className="absolute top-3 left-3">
            <span className="bg-orange-600 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-white rounded-[2px]">
              {room.badge}
            </span>
          </div>

          {/* Photo count */}
          {galleryCount > 1 && (
            <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-md rounded-full px-2 py-1 text-white text-[10px] font-medium">
              {galleryCount} fotos
            </div>
          )}

          {/* Hover overlay CTA */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
            <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-md px-5 py-2.5 shadow-lg flex items-center gap-2 translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
              <span className="text-slate-900 dark:text-white text-sm font-semibold">Ver detalles</span>
              <ChevronRight className="h-4 w-4 text-orange-500" />
            </div>
          </div>
        </div>

        {/* Info — premium padding */}
        <div className="p-6">
          <h3 className="text-slate-900 dark:text-white text-sm md:text-base font-serif font-medium leading-tight mb-2 truncate">
            {room.name}
          </h3>

          {/* Price row */}
          <div className="flex items-center gap-3 flex-wrap">
            {hasDynamicPricing ? (
              <div className="flex items-center gap-3 flex-wrap">
                <p className="text-orange-500 text-lg font-semibold">
                  {room.pricing!.price1}
                  <span className="text-slate-400 dark:text-slate-500 text-xs font-normal"> /noche</span>
                </p>
                <span className="text-slate-300 dark:text-slate-600 text-xs">|</span>
                <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                  <Users className="h-3 w-3" />
                  <span>2 pers: {room.pricing!.price2}/noche</span>
                </div>
              </div>
            ) : (
              <p className="text-orange-500 text-lg font-semibold">
                {room.price === 'Consultar' ? 'Consultar tarifa' : (
                  <>
                    {room.price}
                    <span className="text-slate-400 dark:text-slate-500 text-xs font-normal"> /noche</span>
                  </>
                )}
              </p>
            )}
          </div>

          {/* Key amenities — max 3 */}
          <div className="flex items-center gap-1.5 mt-4 flex-wrap">
            {room.features.slice(0, 3).map((feature) => (
              <span
                key={feature}
                className="text-[10px] text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 rounded-[2px] px-2 py-0.5 tracking-wide"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/* ─── Rooms Preview Section ─────────────────────────────────── */

export function RoomsPreview() {
  return (
    <section id="habitaciones" className="w-full py-24 md:py-32">
      <div className="w-full max-w-6xl mx-auto px-5 md:px-8">
        {/* Section heading */}
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange-500 bg-orange-500/10 px-3 py-1 rounded-[2px]">
              habitaciones
            </span>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-orange-500 text-sm uppercase tracking-[0.2em]"
            >
              Hospedaje
            </motion.p>
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-serif font-light text-slate-900 dark:text-white"
          >
            Nuestras Habitaciones
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-500 dark:text-slate-400 text-base mt-4 max-w-2xl leading-relaxed font-light"
          >
            Todas incluyen WiFi gratis y desayuno americano. Cancelación gratuita disponible. Pago en el alojamiento.
          </motion.p>
        </div>

        {/* Room grid — premium spacing */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {rooms.map((room, index) => (
            <RoomCard
              key={room.slug}
              room={room}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}