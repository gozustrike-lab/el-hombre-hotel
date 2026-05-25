'use client';

import { motion } from 'framer-motion';
import { rooms } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export function RoomsPreview() {
  return (
    <section id="habitaciones" className="w-full py-24 md:py-32">
      {/* Section heading */}
      <div className="px-6 md:px-12 lg:px-20 mb-16">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-orange-500 text-sm uppercase tracking-[0.2em] mb-3"
        >
          Hospedaje
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl md:text-4xl lg:text-5xl font-serif font-light text-slate-900 dark:text-white"
        >
          Nuestras Habitaciones
        </motion.h2>
      </div>

      {/* Rooms grid */}
      <div className="px-0 md:px-12 lg:px-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map((room, index) => (
          <motion.div
            key={room.name}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: index * 0.15 }}
            className="relative group rounded-none md:rounded-2xl overflow-hidden aspect-[4/3]"
          >
            {/* Image */}
            <img
              src={room.image}
              alt={room.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 px-5 pb-5 md:p-6">
              <div className="flex items-end justify-between mb-3">
                <h3 className="text-white text-xl font-serif font-medium">
                  {room.name}
                </h3>
                <span className="text-orange-400 text-2xl font-semibold">
                  {room.price}
                  <span className="text-white/60 text-sm font-normal">/noche</span>
                </span>
              </div>

              <p className="text-white/75 text-sm leading-relaxed mb-4 line-clamp-2">
                {room.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {room.features.map((feature) => (
                  <Badge
                    key={feature}
                    className="bg-white/15 text-white/90 border-white/20 text-xs backdrop-blur-sm"
                  >
                    {feature}
                  </Badge>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <div className="px-6 md:px-12 lg:px-20 mt-12 text-center">
        <Button
          asChild
          className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl px-8 h-12 text-base"
          id="reservar"
        >
          <a href="#reservar">Reservar Ahora</a>
        </Button>
      </div>
    </section>
  );
}
