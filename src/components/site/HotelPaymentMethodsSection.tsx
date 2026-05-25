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
    <section className="hotel-payment-methods-section" id="metodos-pago">
      <div className="hotel-reference-section-heading hotel-payment-methods-heading">
        <span className="scene-chip">{copy.heading}</span>
        <h2 className="hotel-payment-methods-title">{renderBalancedSectionTitle(copy.heading)}</h2>
      </div>

      <div className="hotel-payment-method-content">
        <header className="hotel-payment-method-brand">
          <HotelBrandLogo className="hotel-payment-brand-logo" />
        </header>

        <div className="hotel-payment-method-body">
          <p className="hotel-payment-method-row">
            <strong>{copy.rucLabel}:</strong> 20601633966
          </p>
          <p className="hotel-payment-method-row">
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
          <p className="hotel-payment-method-row">
            <strong>{copy.accountLabel}:</strong> 550 - 2377781 - 0 - 43
          </p>
          <p className="hotel-payment-method-row">
            <strong>{copy.cciLabel}:</strong> 002 - 550 - 002377781043 - 25
          </p>
        </div>
      </div>
    </section>
  );
}
