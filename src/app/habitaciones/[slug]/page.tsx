'use client';

import { useState, useEffect, useCallback } from 'react';
import { use } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Navbar } from '@/components/site/navbar';
import { Footer } from '@/components/site/footer';
import { rooms } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import {
  Phone,
  ArrowLeft,
  X,
  ChevronLeft,
  ChevronRight,
  Wifi,
  Coffee,
  Waves,
  BedDouble,
  Bath,
  Users,
  Clock,
  Check,
  Star,
  MapPin,
} from 'lucide-react';
import { sendRoomDirectWA } from '@/lib/whatsapp';
import { motion, AnimatePresence } from 'framer-motion';

/* ─── Fullscreen Gallery Lightbox ────────────────────────────── */

function GalleryLightbox({
  images,
  open,
  onClose,
  startIndex,
  roomName,
}: {
  images: string[];
  open: boolean;
  onClose: () => void;
  startIndex: number;
  roomName: string;
}) {
  const [current, setCurrent] = useState(startIndex);

  useEffect(() => {
    if (open) setCurrent(startIndex);
  }, [open, startIndex]);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') setCurrent((p) => (p > 0 ? p - 1 : images.length - 1));
      if (e.key === 'ArrowRight') setCurrent((p) => (p < images.length - 1 ? p + 1 : 0));
    };
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [open, onClose, images.length]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center"
        >
          {/* Top bar */}
          <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-5 py-4">
            <div className="bg-white/10 backdrop-blur-xl rounded-full px-4 py-2 text-white text-sm font-medium">
              {current + 1} / {images.length}
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/20 transition-all active:scale-90"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Main image */}
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="relative max-w-[90vw] max-h-[80vh] w-full h-full flex items-center justify-center"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={images[current]}
              alt={`${roomName} - Foto ${current + 1}`}
              className="max-w-full max-h-[80vh] object-contain rounded-xl"
              draggable={false}
            />
          </motion.div>

          {/* Arrows */}
          <button
            onClick={() => setCurrent((p) => (p > 0 ? p - 1 : images.length - 1))}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all active:scale-90"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={() => setCurrent((p) => (p < images.length - 1 ? p + 1 : 0))}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all active:scale-90"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Thumbnails */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 max-w-[90vw] overflow-x-auto px-2">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`relative w-16 h-12 shrink-0 rounded-lg overflow-hidden transition-all duration-200 ${
                  i === current
                    ? 'ring-2 ring-orange-500 opacity-100'
                    : 'opacity-50 hover:opacity-80'
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img}
                  alt={`Miniatura ${i + 1}`}
                  className="w-full h-full object-cover"
                  draggable={false}
                />
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── Room Detail Page ─────────────────────────────────────────── */

export default function RoomDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug: roomSlug } = use(params);
  const room = rooms.find((r) => r.slug === roomSlug);

  if (!room) {
    notFound();
  }

  const galleryImages = room.gallery || [room.image];
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxStart, setLightboxStart] = useState(0);

  const handleReserve = useCallback(() => {
    sendRoomDirectWA({
      roomName: room.name,
      price: room.price.replace('S/. ', ''),
    });
  }, [room.name, room.price]);

  const openLightbox = (index: number) => {
    setLightboxStart(index);
    setLightboxOpen(true);
  };

  const getAmenityIcon = (feature: string) => {
    const f = feature.toLowerCase();
    if (f.includes('wifi')) return <Wifi className="h-4 w-4" />;
    if (f.includes('desayuno')) return <Coffee className="h-4 w-4" />;
    if (f.includes('vista') || f.includes('mar')) return <Waves className="h-4 w-4" />;
    if (f.includes('cama')) return <BedDouble className="h-4 w-4" />;
    if (f.includes('baño') || f.includes('bañera') || f.includes('ducha'))
      return <Bath className="h-4 w-4" />;
    if (f.includes('genius')) return <Star className="h-4 w-4" />;
    return <Users className="h-4 w-4" />;
  };

  return (
    <main className="w-full m-0 p-0 overflow-x-hidden min-h-screen flex flex-col bg-[#FDFBF7] dark:bg-slate-950">
      <Navbar />

      {/* ═══ HERO GALLERY ═══ */}
      <div className="w-full pt-16 md:pt-20">
        <div className="w-full max-w-6xl mx-auto px-3 md:px-6 pt-4 md:pt-6">
          {/* Back navigation */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-4"
          >
            <Link
              href="/#habitaciones"
              className="inline-flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-orange-500 text-sm transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver a habitaciones
            </Link>
          </motion.div>

          {/* Gallery grid — Instagram style */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid grid-cols-4 grid-rows-2 gap-1.5 md:gap-2 rounded-2xl md:rounded-3xl overflow-hidden"
            style={{ aspectRatio: '16/9' }}
          >
            {/* Main image — spans 2 cols, 2 rows */}
            <div
              className="col-span-2 row-span-2 relative cursor-pointer group"
              onClick={() => openLightbox(0)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={galleryImages[0]}
                alt={room.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-3 left-3 bg-black/40 backdrop-blur-md rounded-full px-3 py-1.5 text-white text-xs font-medium flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
                Ver {galleryImages.length} fotos
              </div>
            </div>

            {/* Remaining images — fill the 2x2 grid */}
            {galleryImages.slice(1, 5).map((img, i) => (
              <div
                key={i}
                className="relative cursor-pointer group"
                onClick={() => openLightbox(i + 1)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img}
                  alt={`${room.name} - Foto ${i + 2}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                  loading={i < 2 ? 'eager' : 'lazy'}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                {i === 3 && galleryImages.length > 5 && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center cursor-pointer">
                    <span className="text-white font-semibold text-lg md:text-xl">
                      +{galleryImages.length - 5}
                    </span>
                  </div>
                )}
              </div>
            ))}

            {/* Fill empty grid slots if fewer images */}
            {galleryImages.length < 5 &&
              Array.from({ length: 5 - galleryImages.length }).map((_, i) => (
                <div
                  key={`empty-${i}`}
                  className="bg-slate-200 dark:bg-slate-800"
                />
              ))}
          </motion.div>
        </div>
      </div>

      {/* ═══ CONTENT ═══ */}
      <div className="w-full max-w-6xl mx-auto px-5 md:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* ─── Left Column: Details (2 cols) ─── */}
          <div className="lg:col-span-2 space-y-8">
            {/* Title + Price */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <Badge className="bg-orange-500/10 text-orange-500 border-orange-500/20 text-xs uppercase tracking-wider">
                  {room.badge}
                </Badge>
                <div className="flex items-center gap-1 text-yellow-500">
                  <Star className="h-3.5 w-3.5 fill-current" />
                  <span className="text-xs font-medium">9.2</span>
                </div>
              </div>

              <h1 className="text-2xl md:text-3xl lg:text-4xl font-serif font-medium text-slate-900 dark:text-white leading-tight mb-3">
                {room.name}
              </h1>

              <div className="flex items-center gap-4 flex-wrap">
                <p className="text-orange-500 text-2xl md:text-3xl font-semibold">
                  {room.price}
                  <span className="text-slate-400 dark:text-slate-500 text-sm font-normal"> /noche</span>
                </p>
                <span className="text-slate-300 dark:text-slate-600">|</span>
                <span className="text-slate-500 dark:text-slate-400 text-sm">
                  Pago en el alojamiento · Cancelación gratuita
                </span>
              </div>
            </motion.div>

            {/* Divider */}
            <hr className="border-slate-200 dark:border-slate-800" />

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h2 className="text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-widest mb-4 flex items-center gap-2">
                <div className="w-1 h-4 bg-orange-500 rounded-full" />
                Descripción
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed">
                {room.description}
              </p>
            </motion.div>

            {/* Amenities */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
            >
              <h2 className="text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-widest mb-4 flex items-center gap-2">
                <div className="w-1 h-4 bg-orange-500 rounded-full" />
                Servicios incluidos
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {room.features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-3 py-3 px-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-orange-200 dark:hover:border-orange-500/20 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-orange-50 dark:bg-orange-500/10 flex items-center justify-center shrink-0">
                      <span className="text-orange-500">{getAmenityIcon(feature)}</span>
                    </div>
                    <span className="text-sm text-slate-700 dark:text-slate-300 font-medium">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Hotel Policies */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h2 className="text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-widest mb-4 flex items-center gap-2">
                <div className="w-1 h-4 bg-orange-500 rounded-full" />
                Políticas del alojamiento
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: 'Check-in', value: '14:00' },
                  { label: 'Check-out', value: '12:00' },
                  { label: 'Cancelación', value: 'Gratuita' },
                  { label: 'WiFi', value: 'Incluido' },
                ].map((policy) => (
                  <div
                    key={policy.label}
                    className="text-center py-4 px-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800"
                  >
                    <Clock className="h-5 w-5 text-orange-500 mx-auto mb-2" />
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">
                      {policy.label}
                    </p>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">
                      {policy.value}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ─── Right Column: Booking Card (1 col) ─── */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="sticky top-24 bg-white dark:bg-slate-900 rounded-2xl md:rounded-3xl shadow-xl dark:shadow-black/30 border border-slate-100 dark:border-slate-800 overflow-hidden"
            >
              {/* Price header */}
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 px-6 py-5">
                <p className="text-orange-100 text-xs uppercase tracking-wider mb-1">
                  Precio por noche
                </p>
                <p className="text-white text-3xl md:text-4xl font-bold">{room.price}</p>
                <p className="text-orange-200 text-xs mt-1">
                  Impuestos incluidos · Pago en el alojamiento
                </p>
              </div>

              <div className="p-6 space-y-4">
                {/* CTA Button */}
                <button
                  onClick={handleReserve}
                  className="w-full flex items-center justify-center gap-2.5 bg-green-500 hover:bg-green-600 text-white rounded-xl h-13 text-base font-semibold transition-all duration-300 active:scale-[0.97] shadow-[0_4px_24px_rgba(34,197,94,0.35)] py-3.5"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Reservar por WhatsApp
                </button>

                {/* Trust signals */}
                <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2.5 text-sm">
                    <div className="w-5 h-5 rounded-full bg-green-50 dark:bg-green-500/10 flex items-center justify-center shrink-0">
                      <Check className="h-3 w-3 text-green-500" />
                    </div>
                    <span className="text-slate-600 dark:text-slate-400">Cancelación gratuita</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-sm">
                    <div className="w-5 h-5 rounded-full bg-green-50 dark:bg-green-500/10 flex items-center justify-center shrink-0">
                      <Check className="h-3 w-3 text-green-500" />
                    </div>
                    <span className="text-slate-600 dark:text-slate-400">Sin pago por adelantado</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-sm">
                    <div className="w-5 h-5 rounded-full bg-green-50 dark:bg-green-500/10 flex items-center justify-center shrink-0">
                      <Check className="h-3 w-3 text-green-500" />
                    </div>
                    <span className="text-slate-600 dark:text-slate-400">Desayuno incluido</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-sm">
                    <div className="w-5 h-5 rounded-full bg-green-50 dark:bg-green-500/10 flex items-center justify-center shrink-0">
                      <Check className="h-3 w-3 text-green-500" />
                    </div>
                    <span className="text-slate-600 dark:text-slate-400">WiFi gratis</span>
                  </div>
                </div>

                {/* Location */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-start gap-2.5 text-sm">
                    <MapPin className="h-4 w-4 text-orange-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-slate-700 dark:text-slate-300 font-medium">
                        Puerto Chicama, La Libertad
                      </p>
                      <p className="text-slate-400 dark:text-slate-500 text-xs mt-0.5">
                        Frente a la playa · Puerto Malabrigo
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />

      {/* Gallery Lightbox */}
      <GalleryLightbox
        images={galleryImages}
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        startIndex={lightboxStart}
        roomName={room.name}
      />
    </main>
  );
}
