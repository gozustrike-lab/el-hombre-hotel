'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { rooms } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { ChevronRight } from 'lucide-react';

<<<<<<< HEAD
/* ─── Room Card — Premium Minimal (Direct Link) ─────────────────── */
=======
/* ─── Premium Room Lightbox ────────────────────────────────────── */

function RoomLightbox({
  room,
  open,
  onClose,
}: {
  room: (typeof rooms)[number];
  open: boolean;
  onClose: () => void;
}) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
  const [mainSwiper, setMainSwiper] = useState<SwiperClass | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const galleryImages = room.gallery || [room.image, ...Array(4).fill(room.image)];
  const totalImages = galleryImages.length;

  // Update URL when lightbox opens/closes
  useEffect(() => {
    if (open) {
      const newUrl = `/habitaciones/${room.slug}`;
      window.history.replaceState(null, '', newUrl);
    } else {
      // Restore previous URL
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  }, [open, room.slug]);

  // Lock body scroll + ESC to close
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') mainSwiper?.slidePrev();
      if (e.key === 'ArrowRight') mainSwiper?.slideNext();
    };
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [open, onClose, mainSwiper]);

  // Reset index when room changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [room.name]);

  const handleReserve = useCallback(() => {
    sendRoomDirectWA({
      roomName: room.name,
      price: room.price.replace('S/. ', ''),
    });
  }, [room.name, room.price]);

  const handleShare = useCallback(async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: room.name, url });
      } catch {
        /* user cancelled */
      }
    } else {
      await navigator.clipboard.writeText(url);
    }
  }, [room.name]);

  // Amenity icon map
  const getAmenityIcon = (feature: string) => {
    const f = feature.toLowerCase();
    if (f.includes('wifi')) return <Wifi className="h-3.5 w-3.5" />;
    if (f.includes('desayuno')) return <Coffee className="h-3.5 w-3.5" />;
    if (f.includes('vista') || f.includes('mar')) return <Waves className="h-3.5 w-3.5" />;
    if (f.includes('cama') || f.includes('camas')) return <BedDouble className="h-3.5 w-3.5" />;
    if (f.includes('baño') || f.includes('bañera') || f.includes('ducha')) return <Bath className="h-3.5 w-3.5" />;
    if (f.includes('genius')) return <Heart className="h-3.5 w-3.5" />;
    if (f.includes('privado') && !f.includes('baño')) return <Users className="h-3.5 w-3.5" />;
    return <Clock className="h-3.5 w-3.5" />;
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-0 z-[100] bg-black flex flex-col"
        >
          {/* ═══ TOP BAR ═══ */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.35 }}
            className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-4 py-3"
          >
            {/* Photo counter badge */}
            <div className="bg-black/50 backdrop-blur-xl rounded-full px-3.5 py-1.5 text-white text-sm font-medium">
              {currentIndex + 1} / {totalImages}
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                className="w-9 h-9 rounded-full bg-black/50 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white/80 hover:text-white transition-colors active:scale-90"
                aria-label="Compartir"
              >
                <Share2 className="h-4 w-4" />
              </button>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-black/50 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white/80 hover:text-white transition-colors active:scale-90"
                aria-label="Cerrar"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </motion.div>

          {/* ═══ GALLERY AREA ═══ */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.05, duration: 0.4 }}
            className="flex-1 flex flex-col md:flex-row min-h-0"
          >
            {/* Main Swiper — full image */}
            <div className="relative flex-1 min-h-0">
              <Swiper
                modules={[Thumbs]}
                thumbs={{ swiper: thumbsSwiper }}
                onSwiper={setMainSwiper}
                onSlideChange={(s) => setCurrentIndex(s.activeIndex)}
                spaceBetween={0}
                speed={350}
                className="w-full h-full"
              >
                {galleryImages.map((img, i) => (
                  <SwiperSlide key={i}>
                    <div className="relative w-full h-full bg-black">
                      <img
                        src={img.replace('w=800', 'w=1200').replace('w=600', 'w=1200')}
                        alt={`${room.name} - Foto ${i + 1}`}
                        className="w-full h-full object-contain md:object-cover"
                        loading={i === 0 ? 'eager' : 'lazy'}
                        draggable={false}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Navigation arrows — desktop */}
              <button
                onClick={() => mainSwiper?.slidePrev()}
                className="hidden md:flex absolute left-3 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 items-center justify-center text-white hover:bg-black/60 transition-all active:scale-90"
                aria-label="Foto anterior"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => mainSwiper?.slideNext()}
                className="hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 items-center justify-center text-white hover:bg-black/60 transition-all active:scale-90"
                aria-label="Siguiente foto"
              >
                <ChevronRight className="h-5 w-5" />
              </button>

              {/* Dots indicator — mobile */}
              <div className="md:hidden absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5">
                {galleryImages.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => mainSwiper?.slideTo(i)}
                    className="transition-all duration-300 rounded-full"
                    style={{
                      width: i === currentIndex ? 20 : 6,
                      height: 6,
                      backgroundColor: i === currentIndex ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.3)',
                    }}
                    aria-label={`Foto ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Thumbnails — desktop only */}
            <div className="hidden md:block w-[140px] lg:w-[180px] bg-neutral-950 border-l border-white/5 overflow-y-auto">
              <Swiper
                modules={[Thumbs, FreeMode]}
                onSwiper={setThumbsSwiper}
                freeMode={true}
                watchSlidesProgress={true}
                direction="vertical"
                spaceBetween={4}
                slidesPerView={6}
                className="w-full h-full py-3 px-2"
              >
                {galleryImages.map((img, i) => (
                  <SwiperSlide key={i}>
                    <button
                      onClick={() => mainSwiper?.slideTo(i)}
                      className="relative w-full aspect-[4/3] rounded-lg overflow-hidden border-2 transition-all duration-200 cursor-pointer"
                      style={{
                        borderColor:
                          i === currentIndex
                            ? 'rgba(249,115,22,0.8)'
                            : 'rgba(255,255,255,0.08)',
                      }}
                    >
                      <img
                        src={img.replace('w=800', 'w=300').replace('w=600', 'w=300')}
                        alt={`Thumb ${i + 1}`}
                        className="w-full h-full object-cover"
                        draggable={false}
                      />
                    </button>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </motion.div>

          {/* ═══ BOTTOM DETAILS PANEL ═══ */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative z-20 bg-white dark:bg-slate-900 rounded-t-3xl md:rounded-t-none"
            style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}
          >
            <div className="max-w-3xl mx-auto px-5 pt-5 pb-3">
              {/* Badge + Name */}
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1 min-w-0">
                  <Badge className="bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20 text-[10px] uppercase tracking-wider mb-2">
                    {room.badge}
                  </Badge>
                  <h2 className="text-lg md:text-xl font-serif font-medium text-slate-900 dark:text-white leading-tight truncate">
                    {room.name}
                  </h2>
                </div>
                <p className="text-orange-500 text-xl md:text-2xl font-semibold shrink-0 ml-4">
                  {room.price}
                  <span className="text-slate-400 dark:text-slate-500 text-xs font-normal"> /noche</span>
                </p>
              </div>

              {/* Description — collapsed */}
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-3 line-clamp-2">
                {room.description}
              </p>

              {/* Key Amenities — max 4 with icons */}
              <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-1 -mx-1 px-1">
                {room.features.slice(0, 4).map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg px-2.5 py-1.5 shrink-0"
                  >
                    <span className="text-orange-500">{getAmenityIcon(feature)}</span>
                    <span className="text-[11px] text-slate-600 dark:text-slate-300 font-medium whitespace-nowrap">
                      {feature}
                    </span>
                  </div>
                ))}
                {room.features.length > 4 && (
                  <span className="text-[11px] text-slate-400 shrink-0 px-1">
                    +{room.features.length - 4} más
                  </span>
                )}
              </div>

              {/* CTA */}
              <button
                onClick={handleReserve}
                className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl h-12 text-base font-semibold transition-all duration-300 active:scale-[0.97] shadow-[0_4px_24px_rgba(249,115,22,0.35)]"
              >
                <Phone className="h-4 w-4" />
                Reservar por WhatsApp
              </button>

              {/* Ver detalles link */}
              <Link
                href={`/habitaciones/${room.slug}`}
                className="flex items-center justify-center gap-2 text-orange-500 hover:text-orange-600 text-sm font-medium mt-2 transition-colors"
              >
                Ver página completa
                <ExternalLink className="h-3.5 w-3.5" />
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── Room Card — Premium Minimal ──────────────────────────────── */
>>>>>>> e52834e (fix: URL updates when lightbox opens + Swiper CSS restored + all images display correctly)

function RoomCard({
  room,
  index,
}: {
  room: (typeof rooms)[number];
  index: number;
}) {
  const galleryCount = room.gallery?.length || 0;

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
      whileHover={{ y: -6 }}
      className="group"
    >
      <Link
        href={`/habitaciones/${room.slug}`}
        className="block relative rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-lg dark:shadow-black/20 hover:shadow-2xl hover:dark:shadow-black/40 transition-shadow duration-500"
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
            <Badge className="bg-orange-500/90 text-white border-none backdrop-blur-sm text-[10px] uppercase tracking-wider">
              {room.badge}
            </Badge>
          </div>

          {/* Photo count */}
          {galleryCount > 1 && (
            <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-md rounded-full px-2 py-1 text-white text-[10px] font-medium">
              {galleryCount} fotos
            </div>
          )}

          {/* Hover overlay CTA */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
            <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-full px-5 py-2.5 shadow-lg flex items-center gap-2 translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
              <span className="text-slate-900 dark:text-white text-sm font-semibold">Ver detalles</span>
              <ChevronRight className="h-4 w-4 text-orange-500" />
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="px-4 pt-3.5 pb-4">
          <h3 className="text-slate-900 dark:text-white text-sm md:text-base font-serif font-medium leading-tight mb-1.5 truncate">
            {room.name}
          </h3>

          {/* Price row */}
          <div className="flex items-center justify-between">
            <p className="text-orange-500 text-lg font-semibold">
              {room.price}
              <span className="text-slate-400 dark:text-slate-500 text-xs font-normal"> /noche</span>
            </p>
          </div>

          {/* Key amenities — max 3, compact */}
          <div className="flex items-center gap-1.5 mt-3 flex-wrap">
            {room.features.slice(0, 3).map((feature) => (
              <span
                key={feature}
                className="text-[10px] text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 rounded px-2 py-0.5"
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

/* ─── Rooms Preview Section ─────────────────────────────────────── */

export function RoomsPreview() {
  return (
    <section id="habitaciones" className="w-full py-24 md:py-32">
      <div className="w-full max-w-6xl mx-auto px-5 md:px-8">
        {/* Section heading */}
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-3">
            <Badge className="bg-orange-500/10 text-orange-500 border-orange-500/20 text-xs uppercase tracking-wider">
              habitaciones
            </Badge>
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
            className="text-slate-500 dark:text-slate-400 text-base mt-4 max-w-2xl leading-relaxed"
          >
            Todas incluyen WiFi gratis y desayuno excepcional. Cancelación gratuita disponible. Pago en el alojamiento.
          </motion.p>
        </div>

        {/* Room grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-6">
          {rooms.map((room, index) => (
            <RoomCard
              key={room.name}
              room={room}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
