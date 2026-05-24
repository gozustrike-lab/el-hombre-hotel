"use client";

import { Coffee, Snowflake, SquareParking, UtensilsCrossed, Waves, Wifi, Monitor, GlassWater, Clock3 } from "lucide-react";
import type { SiteContent } from "@/types/site";
import type { HotelHeroSlide } from "./HotelHeroShowcase";
import { HotelBookingBar } from "./HotelBookingBar";
import { HotelHeroShowcase } from "./HotelHeroShowcase";
import type { HotelLocale } from "@/lib/hotel-experience";
import { getHotelUi } from "@/lib/hotel-experience";
import { ScrollReveal, Sparkles } from "./MagicEffects";

type HeroBenefit = {
  icon: "air" | "breakfast" | "dining" | "parking" | "pool" | "reception" | "restobar" | "wifi" | "workspace";
  label: string;
};

type HotelPremiumHeroProps = {
  benefits?: HeroBenefit[];
  bookingWidget: NonNullable<SiteContent["bookingWidget"]>;
  brandName: string;
  contactPhone: string;
  detailsHref: string;
  heroHeadline: string;
  heroTag: string;
  locale: HotelLocale;
  reservationHref: string;
  slides: HotelHeroSlide[];
};

export function HotelPremiumHero({
  bookingWidget,
  brandName,
  contactPhone,
  detailsHref,
  heroHeadline,
  heroTag,
  locale,
  reservationHref,
  slides,
}: HotelPremiumHeroProps) {
  const ui = getHotelUi(locale);

  return (
    <section className="hero-fullbleed-section" id="inicio">
      <div className="hero-fullbleed-stage">
        <HotelHeroShowcase slides={slides} />
        <div className="hero-fullbleed-overlay" aria-hidden="true" />
      </div>

      <div className="hero-fullbleed-content">
        <ScrollReveal delay={0.3}>
          <span className="hero-fullbleed-chip">
            {heroTag}
            <Sparkles color="#d4a574" count={3} />
          </span>
        </ScrollReveal>

        <ScrollReveal delay={0.5}>
          <span className="hero-fullbleed-kicker">{ui.hero.directKicker}</span>
        </ScrollReveal>

        <ScrollReveal delay={0.7}>
          <div className="hero-fullbleed-textblock">
            <p className="hero-fullbleed-brand">{brandName}</p>
            <h1 className="hero-fullbleed-title">{heroHeadline}</h1>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={1.0}>
          <div className="hero-fullbleed-actions">
            <a className="hero-cta-primary" href={reservationHref}>
              {ui.hero.primaryCta}
            </a>
            <a className="hero-cta-secondary" href={detailsHref}>
              {ui.hero.secondaryCta}
            </a>
          </div>
        </ScrollReveal>
      </div>

      <div className="hero-booking-float">
        <HotelBookingBar
          bookingWidget={bookingWidget}
          brandName={brandName}
          contactPhone={contactPhone}
          hideNotes
          locale={locale}
          whatsappIntent="hero"
        />
      </div>
    </section>
  );
}
