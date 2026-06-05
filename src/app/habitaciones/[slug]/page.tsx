'use client';

import { useState, useEffect, useCallback } from 'react';
import { use } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Navbar } from '@/components/site/navbar';
import { Footer } from '@/components/site/footer';
import { rooms } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import {
  Phone, ArrowLeft, X, ChevronLeft, ChevronRight,
  Wifi, Coffee, Waves, BedDouble, Bath, Users, Clock,
} from 'lucide-react';
import { sendRoomDirectWA } from '@/lib/whatsapp';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Thumbs, FreeMode } from 'swiper/modules';
import type { SwiperClass } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/thumbs';
import 'swiper/css/free-mode';

/* ─── Fullscreen Lightbox (gallery viewer) ─────────────────────── */

function RoomGalleryLightbox({
  images,
  open,
  onClose,
  roomName,
}: {
  images: string[];
  open: boolean;
  onClose: () => void;
  roomName: string;
}) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
  const [mainSwiper, setMainSwiper] = useState<SwiperClass | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

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

  useEffect(() => { setCurrentIndex(0); }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] bg-black flex flex-col"
        >
          {/* Top bar */}
          <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-4 py-3">
            <div className="bg-black/50 backdrop-blur-xl rounded-full px-3.5 py-1.5 text-white text-sm font-medium">
              {currentIndex + 1} / {images.length}
            </div>
            <button onClick={onClose} className="w-9 h-9 rounded-full bg-black/50 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white/80 hover:text-white transition-colors active:scale-90">
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Gallery */}
          <div className="flex-1 flex flex-col md:flex-row min-h-0">
            <div className="relative flex-1 min-h-0">
              <Swiper
                modules={[Thumbs]}
                thumbs={{ swiper: thumbsSwiper }}
                onSwiper={setMainSwiper}
                onSlideChange={(s) => setCurrentIndex(s.activeIndex)}
                spaceBetween={0}
                speed={300}
                className="w-full h-full"
              >
                {images.map((img, i) => (
                  <SwiperSlide key={i}>
                    <div className="relative w-full h-full bg-black">
                      <img src={img} alt={`${roomName} - Foto ${i + 1}`} className="w-full h-full object-contain md:object-cover" draggable={false} />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              <button onClick={() => mainSwiper?.slidePrev()} className="hidden md:flex absolute left-3 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 items-center justify-center text-white hover:bg-black/60 transition-all active:scale-90">
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button onClick={() => mainSwiper?.slideNext()} className="hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 items-center justify-center text-white hover:bg-black/60 transition-all active:scale-90">
                <ChevronRight className="h-5 w-5" />
              </button>

              {/* Mobile dots */}
              <div className="md:hidden absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5">
                {images.map((_, i) => (
                  <button key={i} onClick={() => mainSwiper?.slideTo(i)} className="transition-all duration-300 rounded-full"
                    style={{ width: i === currentIndex ? 20 : 6, height: 6, backgroundColor: i === currentIndex ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.3)' }}
                  />
                ))}
              </div>
            </div>

            {/* Desktop thumbnails */}
            <div className="hidden md:block w-[140px] lg:w-[180px] bg-neutral-950 border-l border-white/5 overflow-y-auto">
              <Swiper modules={[Thumbs, FreeMode]} onSwiper={setThumbsSwiper} freeMode watchSlidesProgress direction="vertical" spaceBetween={4} slidesPerView={6} className="w-full h-full py-3 px-2">
                {images.map((img, i) => (
                  <SwiperSlide key={i}>
                    <button onClick={() => mainSwiper?.slideTo(i)} className="relative w-full aspect-[4/3] rounded-lg overflow-hidden border-2 transition-all duration-200 cursor-pointer"
                      style={{ borderColor: i === currentIndex ? 'rgba(249,115,22,0.8)' : 'rgba(255,255,255,0.08)' }}
                    >
                      <img src={img} alt={`Thumb ${i + 1}`} className="w-full h-full object-cover" draggable={false} />
                    </button>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── Room Detail Page ─────────────────────────────────────────── */

export default function RoomDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug: roomSlug } = use(params);
  const room = rooms.find((r) => r.slug === roomSlug);

  if (!room) {
    notFound();
  }

  const galleryImages = room.gallery || [room.image, ...Array(3).fill(room.image)];
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const handleReserve = useCallback(() => {
    sendRoomDirectWA({ roomName: room.name, price: room.price.replace('S/. ', '') });
  }, [room.name, room.price]);

  const getAmenityIcon = (feature: string) => {
    const f = feature.toLowerCase();
    if (f.includes('wifi')) return <Wifi className="h-4 w-4" />;
    if (f.includes('desayuno')) return <Coffee className="h-4 w-4" />;
    if (f.includes('vista') || f.includes('mar')) return <Waves className="h-4 w-4" />;
    if (f.includes('cama')) return <BedDouble className="h-4 w-4" />;
    if (f.includes('baño') || f.includes('bañera') || f.includes('ducha')) return <Bath className="h-4 w-4" />;
    return <Users className="h-4 w-4" />;
  };

  return (
    <main className="w-full m-0 p-0 overflow-x-hidden min-h-screen flex flex-col bg-[#FDFBF7] dark:bg-slate-950">
      <Navbar />

      {/* Back link + breadcrumb */}
      <div className="w-full max-w-5xl mx-auto px-5 md:px-8 pt-24 md:pt-20">
        <Link href="/habitaciones" className="inline-flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-orange-500 text-sm transition-colors mb-4">
          <ArrowLeft className="h-4 w-4" />
          Habitaciones
        </Link>
        <div className="flex items-center gap-2 mb-6">
          <Badge className="bg-orange-500/10 text-orange-500 border-orange-500/20 text-[10px] uppercase tracking-wider">
            habitaciones
          </Badge>
          <span className="text-slate-300 dark:text-slate-600">/</span>
          <span className="text-slate-500 dark:text-slate-400 text-xs">{room.slug}</span>
        </div>
      </div>

      {/* Room Content */}
      <div className="w-full max-w-5xl mx-auto px-5 md:px-8 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* ═══ GALLERY SECTION ═══ */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3 mb-8">
            {/* Main image */}
            <div
              className="relative aspect-[4/3] md:aspect-[3/2] overflow-hidden rounded-xl md:rounded-2xl cursor-pointer group"
              onClick={() => setLightboxOpen(true)}
            >
              <img
                src={galleryImages[0]}
                alt={room.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
              <div className="absolute top-3 left-3">
                <Badge className="bg-orange-500/90 text-white border-none backdrop-blur-sm text-[10px] uppercase tracking-wider">
                  {room.badge}
                </Badge>
              </div>
              <div className="absolute bottom-3 right-3 bg-black/40 backdrop-blur-md rounded-full px-2.5 py-1 text-white text-[11px] font-medium">
                {galleryImages.length} fotos
              </div>
            </div>

            {/* Thumbnail grid */}
            <div className="hidden md:grid grid-cols-2 gap-2 md:gap-3">
              {galleryImages.slice(1, 5).map((img, i) => (
                <div
                  key={i}
                  className="relative aspect-[4/3] overflow-hidden rounded-xl md:rounded-2xl cursor-pointer group"
                  onClick={() => setLightboxOpen(true)}
                >
                  <img src={img} alt={`${room.name} - ${i + 2}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                  {i === 3 && galleryImages.length > 5 && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <span className="text-white font-semibold text-lg">+{galleryImages.length - 5}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile: show thumbnails as horizontal scroll */}
            <div className="flex md:hidden gap-2 overflow-x-auto pb-2 -mx-1 px-1">
              {galleryImages.slice(1).map((img, i) => (
                <div
                  key={i}
                  className="relative w-24 shrink-0 aspect-[4/3] overflow-hidden rounded-lg cursor-pointer"
                  onClick={() => setLightboxOpen(true)}
                >
                  <img src={img} alt={`${room.name} - ${i + 2}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* ═══ INFO GRID (Desktop: 2 columns) ═══ */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {/* Left: Details (3 cols) */}
            <div className="md:col-span-3 space-y-6">
              {/* Title + Price */}
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-2xl md:text-3xl font-serif font-medium text-slate-900 dark:text-white">
                    {room.name}
                  </h1>
                </div>
                <div className="flex items-center gap-3 mt-3">
                  <p className="text-orange-500 text-2xl md:text-3xl font-semibold">
                    {room.price}
                    <span className="text-slate-400 dark:text-slate-500 text-sm font-normal"> /noche</span>
                  </p>
                  <Badge className="bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20 text-xs">
                    {room.badge}
                  </Badge>
                </div>
                <p className="text-slate-400 dark:text-slate-500 text-xs mt-2">
                  Pago en el alojamiento · Cancelación gratuita
                </p>
              </div>

              {/* Description */}
              <div>
                <h2 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-3">Descripción</h2>
                <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed">
                  {room.description}
                </p>
              </div>

              {/* Amenities */}
              <div>
                <h2 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-3">Servicios incluidos</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {room.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2.5 py-2 px-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800">
                      <span className="text-orange-500 shrink-0">{getAmenityIcon(feature)}</span>
                      <span className="text-sm text-slate-700 dark:text-slate-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Booking card (2 cols) */}
            <div className="md:col-span-2">
              <div className="sticky top-24 bg-white dark:bg-slate-900 rounded-2xl md:rounded-3xl p-6 shadow-lg dark:shadow-black/20 border border-slate-100 dark:border-slate-800">
                {/* Price */}
                <div className="mb-4">
                  <p className="text-orange-500 text-3xl font-semibold">{room.price}</p>
                  <p className="text-slate-400 dark:text-slate-500 text-xs mt-0.5">por noche</p>
                </div>

                {/* CTA */}
                <button
                  onClick={handleReserve}
                  className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl h-12 text-base font-semibold transition-all duration-300 active:scale-[0.97] shadow-[0_4px_24px_rgba(249,115,22,0.35)] mb-4"
                >
                  <Phone className="h-4 w-4" />
                  Reservar por WhatsApp
                </button>

                {/* Quick info */}
                <div className="space-y-2 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500 dark:text-slate-400">Check-in</span>
                    <span className="text-slate-900 dark:text-white font-medium">14:00</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500 dark:text-slate-400">Check-out</span>
                    <span className="text-slate-900 dark:text-white font-medium">12:00</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500 dark:text-slate-400">Cancelación</span>
                    <span className="text-green-600 font-medium">Gratuita</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />

      {/* Gallery Lightbox */}
      <RoomGalleryLightbox
        images={galleryImages}
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        roomName={room.name}
      />
    </main>
  );
}
