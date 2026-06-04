'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { rooms } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { X, Phone } from 'lucide-react';
import { sendRoomDirectWA } from '@/lib/whatsapp';

function RoomLightbox({
  room,
  open,
  onClose,
}: {
  room: (typeof rooms)[number];
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;

  const handleReserve = (e: React.MouseEvent) => {
    e.preventDefault();
    sendRoomDirectWA({
      roomName: room.name,
      price: room.price.replace('S/. ', ''),
    });
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          onClick={onClose}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
            className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl md:rounded-3xl bg-white dark:bg-slate-900 shadow-2xl shadow-black/50"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-black/60 transition-all duration-300 active:scale-90"
              aria-label="Cerrar"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Image */}
            <div className="relative w-full aspect-[16/9] md:aspect-[2/1] overflow-hidden rounded-t-2xl md:rounded-t-3xl">
              <img
                src={room.image.replace('w=600', 'w=1200')}
                alt={room.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.dataset.retried) {
                    target.dataset.retried = '1';
                    target.src = `https://placehold.co/1200x600/0f172a/F97316?text=${encodeURIComponent(room.name)}`;
                  }
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-4 left-5 right-5">
                <h3 className="text-white text-xl md:text-2xl font-serif font-medium drop-shadow-lg">
                  {room.name}
                </h3>
              </div>
            </div>

            {/* Details */}
            <div className="p-5 md:p-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-orange-500 text-2xl md:text-3xl font-semibold">
                    {room.price}
                    <span className="text-slate-400 dark:text-slate-500 text-sm font-normal"> /noche</span>
                  </p>
                  <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">
                    Impuestos incluidos · Pago en el alojamiento
                  </p>
                </div>
              </div>

              <p className="text-slate-700 dark:text-slate-300 text-sm md:text-base leading-relaxed mb-6">
                {room.description}
              </p>

              {/* Features */}
              <div className="flex flex-wrap gap-2 mb-8">
                {room.features.map((feature) => (
                  <Badge
                    key={feature}
                    className="bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20 text-xs"
                  >
                    {feature}
                  </Badge>
                ))}
              </div>

              {/* CTA */}
              <button
                onClick={handleReserve}
                className="w-full flex items-center justify-center gap-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl h-12 text-base font-semibold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-[0_4px_24px_rgba(249,115,22,0.4)]"
              >
                <Phone className="h-4 w-4" />
                Reservar por WhatsApp
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function RoomsPreview() {
  const [lightboxRoom, setLightboxRoom] = useState<(typeof rooms)[number] | null>(null);

  return (
    <>
      <section id="habitaciones" className="w-full py-24 md:py-32">
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
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-slate-500 dark:text-slate-400 text-base mt-4 max-w-2xl leading-relaxed"
            >
              Todas incluyen WiFi gratis y desayuno. Precios con impuestos incluidos. Cancelación gratuita disponible.
            </motion.p>
          </div>
        </div>

        {/* Rooms grid — full-bleed images on mobile, centered on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 md:gap-5 lg:gap-6 max-w-6xl mx-auto">
          {rooms.map((room, index) => (
            <motion.div
              key={room.name}
              initial={{ opacity: 0, y: 50, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
              whileHover={{ y: -4 }}
              className="relative group rounded-none md:rounded-2xl overflow-hidden aspect-[4/3] cursor-pointer"
              onClick={() => setLightboxRoom(room)}
            >
              {/* Image */}
              <img
                src={room.image}
                alt={room.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.dataset.retried) {
                    target.dataset.retried = '1';
                    target.src = `https://placehold.co/800x600/0f172a/F97316?text=${encodeURIComponent(room.name)}`;
                  }
                }}
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/80 transition-all duration-500" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 px-5 pb-5 md:p-5">
                <div className="flex items-end justify-between mb-2">
                  <h3 className="text-white text-base md:text-lg font-serif font-medium leading-tight">
                    {room.name}
                  </h3>
                  <span className="text-orange-400 text-xl md:text-2xl font-semibold shrink-0 ml-3">
                    {room.price}
                    <span className="text-white/50 text-xs font-normal">/noche</span>
                  </span>
                </div>

                <p className="text-white/70 text-xs md:text-sm leading-relaxed mb-3 line-clamp-2">
                  {room.description}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {room.features.slice(0, 4).map((feature) => (
                    <Badge
                      key={feature}
                      className="bg-white/15 text-white/90 border-white/20 text-[10px] md:text-xs backdrop-blur-sm"
                    >
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Hover hint */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-white/20 backdrop-blur-md rounded-full px-4 py-2 text-white text-xs font-medium tracking-wider uppercase">
                  Ver detalles
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      {lightboxRoom && (
        <RoomLightbox
          room={lightboxRoom}
          open={!!lightboxRoom}
          onClose={() => setLightboxRoom(null)}
        />
      )}
    </>
  );
}
