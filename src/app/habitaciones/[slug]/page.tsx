'use client';

import { use } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Navbar } from '@/components/site/navbar';
import { Footer } from '@/components/site/footer';
import { rooms } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Phone, ArrowLeft } from 'lucide-react';
import { sendRoomDirectWA } from '@/lib/whatsapp';
import { motion } from 'framer-motion';

export default function RoomDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug: roomSlug } = use(params);
  const room = rooms.find((r) => r.slug === roomSlug);

  if (!room) {
    notFound();
  }

  const handleReserve = (e: React.MouseEvent) => {
    e.preventDefault();
    sendRoomDirectWA({
      roomName: room.name,
      price: room.price.replace('S/. ', ''),
    });
  };

  return (
    <main className="w-full m-0 p-0 overflow-x-hidden min-h-screen flex flex-col">
      <Navbar />

      {/* Back link + breadcrumb */}
      <div className="w-full max-w-4xl mx-auto px-5 md:px-8 pt-24">
        <Link href="/habitaciones" className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-orange-500 text-sm transition-colors mb-4">
          <ArrowLeft className="h-4 w-4" />
          Habitaciones
        </Link>
        <div className="flex items-center gap-3 mb-4">
          <Badge className="bg-orange-500/10 text-orange-500 border-orange-500/20 text-xs uppercase tracking-wider">
            habitaciones
          </Badge>
          <span className="text-slate-500 dark:text-slate-400 text-sm">/</span>
          <Badge className="bg-orange-500/10 text-orange-500 border-orange-500/20 text-xs uppercase tracking-wider">
            {roomSlug}
          </Badge>
        </div>
      </div>

      {/* Room detail */}
      <div className="w-full max-w-4xl mx-auto px-5 md:px-8 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Image */}
          <div className="relative w-full aspect-[16/9] md:aspect-[2/1] overflow-hidden rounded-2xl md:rounded-3xl mb-8">
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
              <Badge className="bg-orange-500/90 text-white border-none backdrop-blur-sm text-xs mb-2">
                {room.badge}
              </Badge>
              <h1 className="text-white text-2xl md:text-3xl font-serif font-medium drop-shadow-lg">
                {room.name}
              </h1>
            </div>
          </div>

          {/* Details card */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl md:rounded-3xl p-6 md:p-10 shadow-lg dark:shadow-black/20">
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <p className="text-orange-500 text-3xl md:text-4xl font-semibold">
                    {room.price}
                    <span className="text-slate-400 dark:text-slate-500 text-base font-normal"> /noche</span>
                  </p>
                  <Badge className="bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20 text-xs">
                    {room.badge}
                  </Badge>
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-sm">
                  Pago en el alojamiento · Cancelación gratuita
                </p>
              </div>
            </div>

            <p className="text-slate-700 dark:text-slate-300 text-base md:text-lg leading-relaxed mb-8">
              {room.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-10">
              {room.features.map((feature) => (
                <Badge
                  key={feature}
                  className="bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20 text-sm"
                >
                  {feature}
                </Badge>
              ))}
            </div>

            <button
              onClick={handleReserve}
              className="w-full flex items-center justify-center gap-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl h-14 text-lg font-semibold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-[0_4px_24px_rgba(249,115,22,0.4)]"
            >
              <Phone className="h-5 w-5" />
              Reservar por WhatsApp
            </button>
          </div>
        </motion.div>
      </div>

      <Footer />
    </main>
  );
}
