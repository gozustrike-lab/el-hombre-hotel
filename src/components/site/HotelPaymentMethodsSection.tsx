import Image from "next/image";
import { renderBalancedSectionTitle } from "./headline-balance";
import { HotelBrandLogo } from "./HotelBrandLogo";
import type { HotelLocale } from "@/lib/hotel-experience";

type HotelPaymentMethodsSectionProps = {
  locale: HotelLocale;
};

export function HotelPaymentMethodsSection({ locale }: HotelPaymentMethodsSectionProps) {
  const copy =
    locale === "en"
      ? {
          heading: "Payment Methods",
          accountLabel: "BCP checking account in soles",
          cciLabel: "CCI",
          legalNameLabel: "Legal name",
          rucLabel: "RUC",
        }
      : {
          heading: "M\u00e9todos de Pago",
          accountLabel: "CTA CORRIENTE BCP SOLES",
          cciLabel: "CCI",
          legalNameLabel: "RAZ\u00d3N SOCIAL",
          rucLabel: "RUC",
        };

  return (
    <section className="scene hotel-payment-methods-section" id="metodos-pago">
      <div className="hotel-reference-section-heading hotel-payment-methods-heading">
        <span className="scene-chip">{copy.heading}</span>
        <h2>{renderBalancedSectionTitle(copy.heading)}</h2>
      </div>

      <article className="hotel-payment-method-card">
        <header className="hotel-payment-method-brand">
          <HotelBrandLogo className="hotel-payment-brand-logo" />
        </header>

        <div className="hotel-payment-method-body">
          <p>
            <strong>{copy.rucLabel}:</strong> 20601633966
          </p>
          <p>
            <strong>{copy.legalNameLabel}:</strong> Hospedaje Restaurante El Hombre E.I.R.L.
          </p>
          <div className="hotel-payment-bank-logo-wrap" aria-label="BCP">
            <Image
              alt="Logo BCP"
              className="hotel-payment-bank-logo"
              decoding="async"
              height={129}
              loading="lazy"
              src="/assets/payments/bcp-logo.svg"
              width={512}
            />
          </div>
          <p>
            <strong>{copy.accountLabel}:</strong> 550 - 2377781 - 0 - 43
          </p>
          <p>
            <strong>{copy.cciLabel}:</strong> 002 - 550 - 002377781043 - 25
          </p>
        </div>
      </article>

      <style jsx global>{`
        .hotel-payment-methods-section {
          padding-block: clamp(40px, 6vw, 80px);
        }

        .hotel-payment-methods-heading {
          margin-bottom: clamp(16px, 2.2vw, 22px);
        }

        .hotel-payment-method-card {
          padding: clamp(24px, 3vw, 40px);
          border-radius: 16px;
        }

        .hotel-payment-method-brand {
          display: flex;
          justify-content: center;
          margin-bottom: 16px;
        }

        .hotel-payment-brand-logo {
          width: clamp(148px, 20vw, 190px);
          max-width: 100%;
        }

        .hotel-payment-method-body {
          display: grid;
          gap: 12px;
          text-align: center;
        }

        .hotel-payment-method-body p {
          margin: 0;
          font-size: clamp(1rem, 1.4vw, 1.15rem);
          line-height: 1.45;
        }

        .hotel-payment-method-body strong {
          font-weight: 900;
          letter-spacing: 0.01em;
        }

        .hotel-payment-bank-logo-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 12px auto;
          width: 100%;
        }

        .hotel-payment-bank-logo {
          width: clamp(120px, 18vw, 180px);
          height: auto;
          max-width: 100%;
        }
      `}</style>
    </section>
  );
}
