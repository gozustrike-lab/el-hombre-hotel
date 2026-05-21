"use client";

import Image from "next/image";
import { useState } from "react";
import { renderBalancedSectionTitle } from "./headline-balance";
import { HOTEL_WHATSAPP_PHONE_DIGITS, type HotelLocale } from "@/lib/hotel-experience";
import { HotelTourPackageDetailModal } from "./HotelTourPackageDetailModal";

type HotelTourPackagesSectionProps = {
  locale: HotelLocale;
  hotelName: string;
};

export type HotelTourPackage = {
  badge: string;
  duration: string;
  imagePosition?: { x?: number; y?: number };
  location: string;
  coverImageSrc?: string;
  includes: string[];
  mediaFiles: string[];
  mediaFolder: string;
  notes?: string[];
  optional?: string[];
  price: string;
  recommendations: string[];
  schedule: string[];
  slug: string;
  summary: string;
  title: string;
};

export function HotelTourPackagesSection({ locale, hotelName }: HotelTourPackagesSectionProps) {
  const copy =
    locale === "en"
      ? {
          badgeLabels: ["Groups", "New", "Featured", "Top sale", "Recommended", "Hot"],
          detailsLabel: "\uD83D\uDD0E VIEW MORE",
          heading: "Tour Packages",
          location: "Peru, Puerto Malabrigo",
          starsLabel: "stars",
          whatsappLabel: "Open WhatsApp",
        }
      : {
          badgeLabels: ["Grupos", "Nuevo", "Destacado", "Top venta", "Recomendado", "Popular"],
          detailsLabel: "\uD83D\uDD0E VER M\u00c1S",
          heading: "Paquetes Tur\u00edsticos",
          location: "Peru, Puerto Malabrigo",
          starsLabel: "estrellas",
          whatsappLabel: "Abrir WhatsApp",
        };
  const packages = getTourPackages(copy.location, copy.badgeLabels);
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [brokenCoverImages, setBrokenCoverImages] = useState<Record<string, boolean>>({});
  const activePackage = packages.find((item) => item.slug === activeSlug) || null;

  return (
    <section className="scene hotel-tour-packages-section" id="paquetes-turisticos">
      <div className="hotel-reference-section-heading hotel-tour-packages-heading">
        <span className="scene-chip">{copy.heading}</span>
        <h2>{renderBalancedSectionTitle(copy.heading)}</h2>
      </div>

      <div className="hotel-tour-packages-grid">
        {packages.map((item, index) => {
          const whatsappHref = buildTourPackageWhatsappHref({
            locale,
            hotelName,
            packageName: item.title,
            price: item.price,
            summary: item.summary,
            duration: item.duration,
          });
          const coverImageSrc = brokenCoverImages[item.slug]
            ? buildTourPackageImagePath(item.mediaFolder, item.mediaFiles[0] || "")
            : item.coverImageSrc || getTourPackageCoverImageSrc(item.slug);

          return (
            <article className="hotel-tour-package-card" key={`${item.title}-${index + 1}`}>
              <div className="hotel-tour-package-media">
                <Image
                  alt={item.title}
                  className="hotel-tour-package-image"
                  fill
                  priority={index < 2}
                  sizes="(max-width: 680px) 92vw, (max-width: 1260px) 31vw, 24vw"
                  onError={() =>
                    setBrokenCoverImages((current) =>
                      current[item.slug]
                        ? current
                        : {
                            ...current,
                            [item.slug]: true,
                          },
                    )
                  }
                  src={coverImageSrc}
                  style={getPackageImageStyle(item.imagePosition)}
                />
                <div className="hotel-tour-package-media-overlay" />
                <span className="hotel-tour-package-badge">{item.badge}</span>

                <div className="hotel-tour-package-overlay">
                  <div aria-label={`5 ${copy.starsLabel}`} className="hotel-tour-package-stars">
                    <span>{"\u2605"}</span>
                    <span>{"\u2605"}</span>
                    <span>{"\u2605"}</span>
                    <span>{"\u2605"}</span>
                    <span>{"\u2605"}</span>
                  </div>

                  <h3>
                    {item.title}
                    <small>{item.duration}</small>
                  </h3>

                  <p className="hotel-tour-package-location">
                    <MapPinGlyph />
                    <span>{item.location}</span>
                  </p>

                  <div className="hotel-tour-package-footer">
                    <div className="hotel-tour-package-actions">
                      <a aria-label={copy.whatsappLabel} className="hotel-tour-package-whatsapp" href={whatsappHref} rel="noreferrer" target="_blank">
                        <WhatsAppGlyph />
                      </a>
                      <button className="hotel-tour-package-more" onClick={() => setActiveSlug(item.slug)} type="button">
                        {copy.detailsLabel}
                      </button>
                    </div>

                    <strong className="hotel-tour-package-price">{item.price}</strong>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <HotelTourPackageDetailModal
        activePackage={activePackage}
        hotelName={hotelName}
        locale={locale}
        onClose={() => setActiveSlug(null)}
      />

      <style jsx global>{`
        .hotel-tour-packages-section {
          width: min(100%, 1320px);
          padding-inline: clamp(16px, 3vw, 24px);
          padding-block: clamp(26px, 4.5vw, 44px);
          margin-inline: auto;
        }

        .hotel-tour-packages-heading {
          margin-bottom: clamp(18px, 3vw, 28px);
        }

        .hotel-tour-packages-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: clamp(14px, 1.8vw, 20px);
          width: 100%;
          max-width: 100%;
        }

        .hotel-tour-package-card {
          min-width: 0;
        }

        .hotel-tour-package-media {
          position: relative;
          min-height: clamp(300px, 28vw, 350px);
          border-radius: 22px;
          overflow: hidden;
          box-shadow: 0 24px 40px rgba(4, 8, 15, 0.2);
          display: flex;
          align-items: flex-end;
        }

        .hotel-tour-package-image {
          object-fit: cover;
        }

        .hotel-tour-package-media-overlay {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(180deg, rgba(4, 8, 15, 0.02) 14%, rgba(4, 8, 15, 0.46) 58%, rgba(4, 8, 15, 0.94) 100%),
            linear-gradient(90deg, rgba(0, 0, 0, 0.12), rgba(0, 0, 0, 0.03));
        }

        .hotel-tour-package-badge {
          position: absolute;
          left: 0;
          top: 18px;
          z-index: 2;
          min-width: 120px;
          padding: 6px 14px;
          border-radius: 0 9px 9px 0;
          background: linear-gradient(180deg, #ffe42d 0%, #f9d90f 100%);
          color: #0f172a;
          font-size: 0.82rem;
          font-weight: 800;
          letter-spacing: 0.01em;
          text-align: center;
          text-transform: capitalize;
        }

        .hotel-tour-package-overlay {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          gap: 8px;
          width: 100%;
          padding: 18px 16px 16px;
          min-height: 100%;
        }

        .hotel-tour-package-stars {
          display: flex;
          align-items: center;
          gap: 2px;
          color: #ffd447;
          font-size: 0.8rem;
          line-height: 1;
        }

        .hotel-tour-package-overlay h3 {
          margin: 0;
          display: grid;
          gap: 4px;
          color: #f8fafc;
          font-size: clamp(1.08rem, 1.5vw, 1.7rem);
          font-weight: 800;
          letter-spacing: 0.01em;
          text-transform: uppercase;
        }

        .hotel-tour-package-overlay h3 small {
          color: #f8fafc;
          font-size: 0.72em;
          font-weight: 800;
          letter-spacing: 0.06em;
        }

        .hotel-tour-package-location {
          margin: 0;
          display: flex;
          align-items: center;
          gap: 6px;
          color: rgba(255, 255, 255, 0.96);
          font-size: 0.92rem;
          font-weight: 600;
        }

        .hotel-tour-package-location svg {
          flex: none;
          width: 16px;
          height: 16px;
          color: #ffd22f;
        }

        .hotel-tour-package-footer {
          margin-top: 6px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        .hotel-tour-package-actions {
          display: flex;
          align-items: center;
          gap: 12px;
          min-width: 0;
        }

        .hotel-tour-package-whatsapp {
          flex: none;
          width: 32px;
          height: 32px;
          border-radius: 999px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: radial-gradient(circle at 32% 26%, #43e068 0%, #12a732 100%);
          color: #f8fafc;
          box-shadow: 0 8px 20px rgba(18, 167, 50, 0.42);
        }

        .hotel-tour-package-whatsapp svg {
          width: 17px;
          height: 17px;
        }

        .hotel-tour-package-more {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 36px;
          padding: 0 20px;
          border-radius: 10px;
          background: linear-gradient(180deg, #ffea38 0%, #f7d80f 100%);
          color: #0f172a;
          font-size: 1rem;
          font-weight: 800;
          letter-spacing: 0.01em;
          text-transform: uppercase;
          text-decoration: none;
        }

        .hotel-tour-package-price {
          flex: none;
          color: #f8fafc;
          font-size: clamp(1.12rem, 1.5vw, 1.55rem);
          font-weight: 900;
          letter-spacing: 0.01em;
          text-align: right;
          text-shadow: 0 6px 14px rgba(0, 0, 0, 0.34);
        }

        @media (min-width: 1024px) {
          .hotel-tour-package-overlay h3 {
            font-size: clamp(0.98rem, 1.22vw, 1.18rem);
            line-height: 1.08;
          }

          .hotel-tour-package-overlay h3 small {
            font-size: 0.68em;
          }

          .hotel-tour-package-price {
            font-size: clamp(1rem, 1.14vw, 1.22rem);
          }
        }

        @media (max-width: 1260px) {
          .hotel-tour-packages-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }

        @media (max-width: 940px) {
          .hotel-tour-packages-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 680px) {
          .hotel-tour-packages-grid {
            grid-template-columns: minmax(0, 1fr);
          }

          .hotel-tour-package-media {
            min-height: clamp(300px, 82vw, 360px);
          }

          .hotel-tour-package-badge {
            top: 14px;
          }

          .hotel-tour-package-overlay {
            padding: 16px 14px 14px;
          }
        }
      `}</style>
    </section>
  );
}

function getTourPackages(location: string, badgeLabels: string[]): HotelTourPackage[] {
  return [
    {
      slug: "clase-de-surf-para-principiantes",
      title: "CLASE DE SURF PARA PRINCIPIANTES",
      duration: "02H",
      location,
      badge: badgeLabels[0],
      price: "S/ 60.00",
      mediaFolder: "1 CLASE DE SURF",
      mediaFiles: ["1 clase de surf.jpg", "2 clase de surf.jpg", "3 clase de surf.jpg", "4 clase de surf.jpg"],
      imagePosition: { x: 50, y: 40 },
      schedule: ["Turno Mañana", "08:00 am - 10:00 am", "Turno Mediodía", "11:00 am - 01:00 pm", "Turno Tarde", "03:00 pm - 05:00 pm"],
      recommendations: ["Protector solar resistente al agua.", "Traer traje de baño o ropa cómoda.", "Hidratarse antes y después de la clase."],
      includes: ["INSTRUCTOR CALIFICADO.", "TABLA DE SURF INCLUIDA.", "NEOPRENO INCLUIDO.", "TEORÍA Y PRÁCTICA EN EL AGUA (APROX. 1 HORA)."],
      summary: "Aprende a surfear en las olas de Puerto Malabrigo con instructor calificado. Incluye tabla y neopreno.",
    },
    {
      slug: "surf-avanzado-guia-de-olas",
      title: "SURF AVANZADO - GUIA DE OLAS",
      duration: "03H",
      location,
      badge: badgeLabels[1],
      price: "S/ 80.00",
      mediaFolder: "2 SURF AVANZADO",
      mediaFiles: ["1 surf avanzado.jpg", "2 surf avanzado.jpg", "3 surf avanzado.jpg", "4 surf avanzado.jpg"],
      imagePosition: { x: 50, y: 45 },
      schedule: ["Turno Mañana", "07:00 am - 10:00 am", "Turno Tarde", "02:00 pm - 05:00 pm"],
      recommendations: ["Experiencia previa en surf requerida.", "Revisar condiciones del mar antes de salir.", "Traer su propia tabla si desea."],
      includes: ["GUIA LOCAL EXPERIMENTADO.", "RECORRIDO A LOS MEJORES PICOS.", "INDICACIONES SOBRE CORRIENTES Y SECCIONES.", "TRANSPORTE A PUNTAS CERCANAS."],
      summary: "Guía exclusiva para surfistas experimentados. Los mejores picos y secretos de la izquierda.",
    },
    {
      slug: "alquiler-de-tablas-de-surf",
      title: "ALQUILER DE TABLAS DE SURF",
      duration: "01D",
      location,
      badge: badgeLabels[2],
      price: "S/ 30.00",
      mediaFolder: "3 ALQUILER DE TABLAS",
      mediaFiles: ["1 alquiler tablas.jpg", "2 alquiler tablas.jpg", "3 alquiler tablas.jpg", "4 alquiler tablas.jpg"],
      imagePosition: { x: 48, y: 50 },
      schedule: ["Entrega", "07:00 am", "Devolución", "06:00 pm", "Media jornada disponible", "Consultar en recepción."],
      recommendations: ["Documentar el estado de la tabla al recibir.", "Cuidar la tabla de golpes y sol directo.", "Reportar cualquier daño de inmediato."],
      includes: ["TABLA DE SURF DE ACUERDO AL NIVEL.", "CUCHARA Y LEASH INCLUIDOS.", "NEOPRENO DISPONIBLE (OPCIONAL).", "ASESORÍA SOBRE EL MEJOR PUNTO DEL DÍA."],
      summary: "Tablas de todos los tamaños disponibles para cualquier nivel.",
    },
    {
      slug: "paseo-en-mototaxi-a-pacasmayo",
      title: "PASEO EN MOTOTAXI A PACASMAYO",
      duration: "02H",
      location,
      badge: badgeLabels[3],
      price: "S/ 15.00",
      mediaFolder: "4 PASEO MOTOTAXI",
      mediaFiles: ["1 paseo mototaxi.jpg", "2 paseo mototaxi.jpg", "3 paseo mototaxi.jpg", "4 paseo mototaxi.jpg"],
      imagePosition: { x: 50, y: 48 },
      schedule: ["Salida", "09:00 am", "Salida", "11:00 am", "Salida", "03:00 pm", "Retorno flexible."],
      recommendations: ["Llevar efectivo para compras.", "Protector solar y gorra.", "Preguntar por horarios de retorno."],
      includes: ["TRANSPORTE IDA Y VUELTA EN MOTOTAXI.", "RECORRIDO POR EL PUEBLO DE PACASMAYO.", "PARADAS EN MIRADORES Y PUNTOS DE INTERÉS.", "TIEMPO LIBRE PARA COMPRAS Y EXPLORACIÓN."],
      summary: "Recorrido hasta el pueblo de Pacasmayo para compras y exploración.",
    },
    {
      slug: "ruta-gastronomica-mariscos",
      title: "RUTA GASTRONÓMICA - MARISCOS Y CERVEZA ARTESANAL",
      duration: "03H",
      location,
      badge: badgeLabels[4],
      price: "S/ 45.00",
      mediaFolder: "5 RUTA GASTRONOMICA",
      mediaFiles: ["1 ruta gastronomica.jpg", "2 ruta gastronomica.jpg", "3 ruta gastronomica.jpg", "4 ruta gastronomica.jpg"],
      imagePosition: { x: 50, y: 50 },
      schedule: ["Inicio", "12:00 pm", "Recorrido por 3 restaurantes locales.", "Cierre", "03:00 pm"],
      recommendations: ["Llevar apetito.", "Alergias alimentarias informar con anticipación.", "Incluye degustaciones, no platos completos."],
      includes: ["GUIA GASTRONÓMICO LOCAL.", "DEGUSTACIÓN EN 3 RESTAURANTES.", "CERVEZA ARTESANAL DE LA ZONA.", "RECOMENDACIONES DE PLATOS TÍPICOS."],
      summary: "Tour por los mejores restaurantes de mariscos de la zona.",
    },
    {
      slug: "avistamiento-de-aves-marinas",
      title: "AVISTAMIENTO DE AVES MARINAS",
      duration: "03H",
      location,
      badge: badgeLabels[5],
      price: "S/ 50.00",
      mediaFolder: "6 AVISTAMIENTO AVES",
      mediaFiles: ["1 avistamiento aves.jpg", "2 avistamiento aves.jpg", "3 avistamiento aves.jpg", "4 avistamiento aves.jpg"],
      imagePosition: { x: 50, y: 46 },
      schedule: ["Turno Mañana", "06:00 am - 09:00 am", "Turno Tarde", "03:00 pm - 06:00 pm"],
      recommendations: ["Binoculares recomendados.", "Zapatos cómodos para caminar por los acantilados.", "No hacer ruido para no espantar las aves."],
      includes: ["GUIA ESPECIALISTA EN AVIFAUNA.", "RECORRIDO POR HUMEDALES Y ACANTILADOS.", "LISTA DE AVES OBSERVABLES DE LA ZONA.", "TRANSPORTE AL PUNTO DE OBSERVACIÓN."],
      summary: "Observación de aves nativas en los humedales y acantilados de la costa.",
    },
  ];
}

function buildTourPackageImagePath(folder: string, file: string) {
  return `/${["assets", "gallery", "Paquete tur\u00edstico", folder, file].map((part) => encodeURIComponent(part)).join("/")}`;
}

function buildTourPackageWhatsappHref({
  hotelName,
  locale,
  packageName,
  price,
  summary,
  duration,
}: {
  hotelName: string;
  locale: HotelLocale;
  packageName: string;
  price: string;
  summary: string;
  duration: string;
}) {
  const message =
    locale === "en"
      ? [
          "Hello",
          "I want information and booking details for this tour package:",
          `${packageName} - ${duration}`,
          `Reference price: ${price}`,
          `Summary: ${summary}`,
          `Hotel: ${hotelName}`,
          "Please share availability and payment details.",
        ].join("\n")
      : [
          "Hola",
          "Quiero informacion y reservar este paquete turistico:",
          `${packageName} - ${duration}`,
          `Precio referencial: ${price}`,
          `Resumen: ${summary}`,
          `Hotel: ${hotelName}`,
          "Por favor, comparteme disponibilidad y forma de pago.",
        ].join("\n");

  return `https://api.whatsapp.com/send/?phone=${HOTEL_WHATSAPP_PHONE_DIGITS}&text=${encodeURIComponent(message)}&type=phone_number&app_absent=0`;
}

function getPackageImageStyle(position?: { x?: number; y?: number }) {
  const x = typeof position?.x === "number" ? position.x : 50;
  const y = typeof position?.y === "number" ? position.y : 50;

  return {
    objectPosition: `${x}% ${y}%`,
  };
}

function getTourPackageCoverImageSrc(slug: string) {
  const coverImages: Record<string, string> = {
    "clase-de-surf-para-principiantes": "https://images.unsplash.com/photo-1502680390548-bdbac40b3029?auto=format&fit=crop&w=1600&q=80",
    "surf-avanzado-guia-de-olas": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80",
    "alquiler-de-tablas-de-surf": "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1600&q=80",
    "paseo-en-mototaxi-a-pacasmayo": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1600&q=80",
    "ruta-gastronomica-mariscos": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1600&q=80",
    "avistamiento-de-aves-marinas": "https://images.unsplash.com/photo-1468413253725-0d5181091126?auto=format&fit=crop&w=1600&q=80",
  };

  return coverImages[slug] || coverImages["clase-de-surf-para-principiantes"];
}

function MapPinGlyph() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path
        d="M12 2.25a7.25 7.25 0 0 0-7.25 7.25c0 5.2 5.88 11.62 6.13 11.9a1.5 1.5 0 0 0 2.24 0c.25-.28 6.13-6.7 6.13-11.9A7.25 7.25 0 0 0 12 2.25Zm0 9.6a2.35 2.35 0 1 1 0-4.7 2.35 2.35 0 0 1 0 4.7Z"
        fill="currentColor"
      />
    </svg>
  );
}

function WhatsAppGlyph() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path
        d="M20.52 3.5A11.7 11.7 0 0 0 2.84 18.16L1.5 22.5l4.48-1.3a11.7 11.7 0 0 0 5.95 1.62h.01A11.7 11.7 0 0 0 20.52 3.5Zm-8.58 17.3h-.01a9.71 9.71 0 0 1-4.95-1.35l-.35-.21-2.66.77.8-2.6-.23-.36a9.74 9.74 0 1 1 7.4 3.75Zm5.34-7.27c-.29-.15-1.74-.86-2.01-.95-.27-.1-.47-.15-.67.14-.2.29-.76.95-.93 1.14-.17.2-.34.22-.63.08-.29-.15-1.24-.46-2.35-1.47-.87-.78-1.46-1.75-1.63-2.05-.17-.29-.02-.45.13-.6.13-.13.29-.34.44-.51.15-.17.2-.29.29-.49.1-.2.05-.37-.02-.51-.07-.15-.67-1.62-.92-2.22-.24-.58-.48-.5-.67-.51l-.57-.01c-.2 0-.51.07-.78.37-.27.29-1.03 1.01-1.03 2.47 0 1.46 1.06 2.87 1.21 3.07.15.2 2.07 3.16 5.02 4.44.7.3 1.24.48 1.67.62.7.22 1.33.19 1.83.12.56-.08 1.74-.71 1.98-1.39.24-.68.24-1.27.17-1.39-.07-.12-.27-.2-.56-.34Z"
        fill="currentColor"
      />
    </svg>
  );
}
