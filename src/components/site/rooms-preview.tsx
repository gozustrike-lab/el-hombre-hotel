'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { rooms } from '@/lib/data';
import { Users, ChevronRight } from 'lucide-react';
import { useLang } from '@/lib/i18n-context';
import { sendRoomCardWA } from '@/lib/whatsapp';
import type { Lang } from '@/lib/i18n-context';

/* ─── WhatsApp SVG ───────────────────────────────────────────── */

function WAIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

/* ─── Room Card — Premium Deluxe ────────────────────────────── */

function RoomCard({
  room,
  index,
  guests,
  setGuests,
}: {
  room: (typeof rooms)[number];
  index: number;
  guests: number;
  setGuests: (g: number) => void;
}) {
  const { t, lang } = useLang();
  const galleryCount = room.gallery?.length || 0;
  const hasDynamicPricing = !!room.pricing;

  const displayName = t(room.name.es, room.name.en);
  const displayBadge = t(room.badge.es, room.badge.en);
  const displayFeatures = room.features.map((f) => t(f.es, f.en));

  const handleWhatsApp = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      const price = hasDynamicPricing
        ? (guests === 1 ? room.pricing!.price1 : room.pricing!.price2!)
        : room.price;
      const priceNote = hasDynamicPricing
        ? `${guests} ${guests === 1 ? (lang === 'es' ? 'persona' : 'guest') : (lang === 'es' ? 'personas' : 'guests')}`
        : undefined;

      sendRoomCardWA({
        roomName: displayName,
        badge: displayBadge,
        price: `${price}/${t('noche', 'night')}`,
        priceNote,
        features: displayFeatures,
        description: t(room.description.es, room.description.en),
      });
    },
    [room, lang, guests, displayName, displayBadge, displayFeatures, t, hasDynamicPricing],
  );

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
            alt={displayName}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
            draggable={false}
          />

          {/* Subtle gradient on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Badge */}
          <div className="absolute top-3 left-3">
            <span className="bg-orange-600 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-white rounded-[2px]">
              {displayBadge}
            </span>
          </div>

          {/* Photo count */}
          {galleryCount > 1 && (
            <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-md rounded-full px-2 py-1 text-white text-[10px] font-medium">
              {galleryCount} {t('fotos', 'photos')}
            </div>
          )}

          {/* Hover overlay CTA */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
            <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-md px-5 py-2.5 shadow-lg flex items-center gap-2 translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
              <span className="text-slate-900 dark:text-white text-sm font-semibold">
                {t('Ver detalles', 'View details')}
              </span>
              <ChevronRight className="h-4 w-4 text-orange-500" />
            </div>
          </div>
        </div>

        {/* Info — premium padding */}
        <div className="p-6">
          <h3 className="text-slate-900 dark:text-white text-sm md:text-base font-serif font-medium leading-tight mb-2 truncate">
            {displayName}
          </h3>

          {/* Price row */}
          <div className="flex items-center gap-3 flex-wrap">
            {hasDynamicPricing ? (
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-2">
                  <p className="text-orange-500 text-lg font-semibold">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={guests}
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        {guests === 1
                          ? room.pricing!.price1
                          : room.pricing!.price2}
                      </motion.span>
                    </AnimatePresence>
                    <span className="text-slate-400 dark:text-slate-500 text-xs font-normal">
                      {' '}
                      /{t('noche', 'night')}
                    </span>
                  </p>
                </div>

                {/* Guest toggle */}
                <div className="inline-flex rounded-md border border-orange-200 dark:border-orange-500/20 overflow-hidden">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setGuests(1);
                    }}
                    className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider transition-all ${
                      guests === 1
                        ? 'bg-orange-500 text-white'
                        : 'text-slate-500'
                    }`}
                  >
                    1 {t('Persona', 'Guest')}
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setGuests(2);
                    }}
                    className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider transition-all ${
                      guests === 2
                        ? 'bg-orange-500 text-white'
                        : 'text-slate-500'
                    }`}
                  >
                    2 {t('Personas', 'Guests')}
                  </button>
                </div>
              </div>
            ) : room.maxGuests === 3 ? (
              <p className="text-orange-500 text-lg font-semibold">
                {room.price}
                <span className="text-slate-400 dark:text-slate-500 text-xs font-normal">
                  {' '}
                  /3 {t('noches', 'nights')}
                </span>
                <span className="text-slate-400 dark:text-slate-500 text-xs font-normal ml-1">
                  ({t('3 pers.', '3 guests')})
                </span>
              </p>
            ) : (
              <p className="text-orange-500 text-lg font-semibold">
                {room.price === 'Consultar'
                  ? t('Consultar tarifa', 'Ask for rates')
                  : (
                    <>
                      {room.price}
                      <span className="text-slate-400 dark:text-slate-500 text-xs font-normal">
                        {' '}
                        /{t('noche', 'night')}
                      </span>
                    </>
                  )}
              </p>
            )}
          </div>

          {/* Key amenities — max 3 */}
          <div className="flex items-center gap-1.5 mt-4 flex-wrap">
            {displayFeatures.slice(0, 3).map((feature) => (
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

      {/* ═══ WHATSAPP RESERVE BUTTON — premium refined ═══ */}
      <button
        onClick={handleWhatsApp}
        className="w-full mt-2.5 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-[1.01] active:scale-[0.97] border border-[#25D366]/30 dark:border-[#25D366]/20 text-[#128C7E] dark:text-[#25D366] hover:text-white hover:border-transparent"
        style={{
          background: 'transparent',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)';
          e.currentTarget.style.color = 'white';
          e.currentTarget.style.boxShadow = '0 4px 16px -2px rgba(37, 211, 102, 0.4)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'transparent';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        <WAIcon className="h-4 w-4" />
        {t('Reservar por WhatsApp', 'Book via WhatsApp')}
      </button>
    </motion.div>
  );
}

/* ─── Rooms Preview Section ─────────────────────────────────── */

export function RoomsPreview() {
  const { t } = useLang();
  const [guests, setGuests] = useState(1);

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
              {t('Hospedaje', 'Lodging')}
            </motion.p>
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-serif font-light text-slate-900 dark:text-white"
          >
            {t('Nuestras Habitaciones', 'Our Rooms')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-500 dark:text-slate-400 text-base mt-4 max-w-2xl leading-relaxed font-light"
          >
            {t(
              'Todas incluyen WiFi gratis y desayuno americano. Cancelación gratuita disponible. Pago en el alojamiento.',
              'All include free Wi-Fi and American breakfast. Free cancellation available. Pay at the property.',
            )}
          </motion.p>
        </div>

        {/* Room grid — premium spacing */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {rooms.map((room, index) => (
            <RoomCard
              key={room.slug}
              room={room}
              index={index}
              guests={guests}
              setGuests={setGuests}
            />
          ))}
        </div>
      </div>
    </section>
  );
}