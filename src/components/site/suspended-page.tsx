"use client";

import { useEffect, useState } from "react";

const WA_NUMBER = "51933667414";

export function SuspendedPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center"
      style={{
        background:
          "linear-gradient(145deg, #020617 0%, #0f172a 40%, #1e293b 100%)",
      }}
    >
      {/* Decorative blurred orbs */}
      <div
        className="pointer-events-none absolute -top-32 -left-32 h-[420px] w-[420px] rounded-full opacity-20"
        style={{
          background:
            "radial-gradient(circle, rgba(249,115,22,0.45) 0%, transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full opacity-15"
        style={{
          background:
            "radial-gradient(circle, rgba(249,115,22,0.35) 0%, transparent 70%)",
        }}
      />

      <div
        className={`relative z-10 max-w-xl transition-all duration-700 ${
          mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        {/* Warning icon */}
        <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-red-500/10 ring-2 ring-red-500/30">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="h-12 w-12 text-red-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
            />
          </svg>
        </div>

        {/* Title */}
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Sitio Suspendido
        </h1>

        {/* Divider */}
        <div className="mx-auto mb-6 h-1 w-20 rounded-full bg-orange-500" />

        {/* Message */}
        <p className="mb-3 text-lg leading-relaxed text-slate-300">
          Este sitio web se encuentra temporalmente{" "}
          <span className="font-semibold text-red-400">suspendido</span> por
          incumplimiento en los pagos administrativos.
        </p>
        <p className="mb-10 text-base leading-relaxed text-slate-400">
          Si desea continuar con el funcionamiento de la web, por favor
          contactarse con el administrador.
        </p>

        {/* WhatsApp CTA */}
        <a
          href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
            "Hola, escribo respecto al sitio web suspendido. Me gustaria hablar con el administrador sobre la reactivacion del servicio."
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-3 rounded-2xl bg-[#25D366] px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-[#25D366]/25 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#25D366]/35 active:scale-95"
        >
          {/* WhatsApp SVG icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-7 w-7 transition-transform duration-300 group-hover:rotate-12"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
          Contactar Administrador
          <span className="ml-1 text-sm font-normal opacity-90">
            +51 933 667 414
          </span>
        </a>

        {/* Subtle footer line */}
        <p className="mt-12 text-xs text-slate-600">
          Hospedaje Restaurante El Hombre &mdash; Puerto Chicama, La Libertad,
          Per&uacute;
        </p>
      </div>
    </div>
  );
}