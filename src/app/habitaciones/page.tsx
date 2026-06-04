'use client';

import Link from 'next/link';
import { Navbar } from '@/components/site/navbar';
import { Footer } from '@/components/site/footer';
import { RoomsPreview } from '@/components/site/rooms-preview';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft } from 'lucide-react';

export default function HabitacionesPage() {
  return (
    <main className="w-full m-0 p-0 overflow-x-hidden min-h-screen flex flex-col">
      <Navbar />
      <div className="w-full max-w-6xl mx-auto px-5 md:px-8 pt-24">
        <Link href="/" className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-orange-500 text-sm transition-colors mb-6">
          <ArrowLeft className="h-4 w-4" />
          Inicio
        </Link>
        <div className="flex items-center gap-3 mb-3">
          <Badge className="bg-orange-500/10 text-orange-500 border-orange-500/20 text-xs uppercase tracking-wider">
            habitaciones
          </Badge>
          <span className="text-slate-500 dark:text-slate-400 text-sm">/</span>
          <span className="text-orange-500 text-sm uppercase tracking-[0.2em]">Hospedaje</span>
        </div>
      </div>
      <RoomsPreview />
      <Footer />
    </main>
  );
}
