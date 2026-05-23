"use client";

import { useState, useCallback, useMemo } from "react";
import type { HotelLocale } from "@/lib/hotel-experience";
import { t } from "@/lib/hotel-experience";
import { useLightbox, type LightboxImage } from "./ProLightbox";

type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageSrc: string;
};

type CartItem = {
  item: MenuItem;
  quantity: number;
};

type HotelRestaurantSectionProps = {
  locale?: HotelLocale;
};

const WHATSAPP_DIGITS = "51949090421";

const MENU_ITEMS: MenuItem[] = [
  {
    id: "ceviche-especial",
    name: "Ceviche Especial de la Casa",
    description: "Pescado fresco del día marinado en limón con cebolla morada, ají limo, camote y choclo. Nuestra especialidad que representa lo mejor de la costa peruana.",
    price: 35,
    imageSrc: "https://images.unsplash.com/photo-1535399831218-d5bd36d1a6b3?w=600&q=80",
  },
  {
    id: "jalea-marina",
    name: "Jalea Marina Familiar",
    description: "Selección de pescado, camarones, calamar y pulpo fritos acompañados de yuca, salsa criolla y limón. Perfecta para compartir en familia o entre amigos después del surf.",
    price: 45,
    imageSrc: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=600&q=80",
  },
  {
    id: "menu-ejecutivo",
    name: "Menú Ejecutivo Diario",
    description: "Plato del día con entrada, sopa o crema, plato principal a elegir y refresco. La mejor opción económica para un almuerzo completo y nutritivo frente al mar.",
    price: 15,
    imageSrc: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80",
  },
];

export function HotelRestaurantSection({ locale = "es" }: HotelRestaurantSectionProps) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { open: openLightbox } = useLightbox();

  const lightboxImages = useMemo<LightboxImage[]>(
    () => MENU_ITEMS.map((item) => ({ src: item.imageSrc, alt: item.name })),
    [],
  );

  const totalItems = cart.reduce((sum, ci) => sum + ci.quantity, 0);
  const totalPrice = cart.reduce((sum, ci) => sum + ci.item.price * ci.quantity, 0);

  const addToCart = useCallback((item: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((ci) => ci.item.id === item.id);
      if (existing) {
        return prev.map((ci) =>
          ci.item.id === item.id ? { ...ci, quantity: ci.quantity + 1 } : ci,
        );
      }
      return [...prev, { item, quantity: 1 }];
    });
  }, []);

  const updateQuantity = useCallback((itemId: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((ci) =>
          ci.item.id === itemId ? { ...ci, quantity: ci.quantity + delta } : ci,
        )
        .filter((ci) => ci.quantity > 0);
    });
  }, []);

  const removeFromCart = useCallback((itemId: string) => {
    setCart((prev) => prev.filter((ci) => ci.item.id !== itemId));
  }, []);

  const sendOrderWhatsApp = useCallback(() => {
    const restaurantName = "Restaurante El Hombre";
    const greeting = locale === "en" ? "Hello" : "Hola";
    const intro =
      locale === "en"
        ? `I would like to place an order from *${restaurantName}*.`
        : `Deseo realizar un pedido del *${restaurantName}*.`;
    const detailHeader =
      locale === "en" ? "Order details:" : "Detalle del pedido:";
    const totalLabel =
      locale === "en" ? "Total:" : "Total:";
    const closing =
      locale === "en"
        ? "Thank you. I remain attentive to your response."
        : "Muchas gracias. Quedo atento(a) a su respuesta.";

    const orderLines = cart.map(
      (ci) =>
        `- ${ci.item.name} x${ci.quantity} = S/. ${ci.item.price * ci.quantity}`,
    );

    const message = [
      `${greeting} \u{1F44B}`,
      "",
      intro,
      "",
      `\uD83C\uDF7D\uFE0F *${detailHeader}*`,
      ...orderLines,
      "",
      `\uD83D\uDCB0 *${totalLabel}* S/. ${totalPrice}`,
      "",
      closing,
    ].join("\n");

    const encoded = encodeURIComponent(message);
    const url = `https://api.whatsapp.com/send/?phone=${WHATSAPP_DIGITS}&text=${encoded}&type=phone_number&app_absent=0`;
    window.open(url, "_blank", "noopener");
  }, [cart, totalPrice, locale]);

  return (
    <section id="restaurante" className="hotel-deluxe-restaurant-section">
      <div className="hotel-deluxe-restaurant-inner">
        <div className="hotel-deluxe-restaurant-header">
          <span className="hotel-deluxe-restaurant-chip">
            {t(locale, "Carta Marina", "Seafood Menu")}
          </span>
          <h2 className="hotel-deluxe-restaurant-title">
            {t(locale, "Restaurante El Hombre", "El Hombre Restaurant")}
          </h2>
          <p className="hotel-deluxe-restaurant-subtitle">
            {t(
              locale,
              "Sabores del mar preparados con pescado fresco del día. Disfruta de nuestra carta marina frente al océano en Puerto Malabrigo.",
              "Fresh-from-the-sea flavors prepared with the catch of the day. Enjoy our seafood menu right by the ocean in Puerto Malabrigo.",
            )}
          </p>
        </div>

        <div className="hotel-deluxe-restaurant-grid">
          {MENU_ITEMS.map((item, idx) => (
            <div key={item.id} className="hotel-deluxe-restaurant-card">
              <div className="hotel-deluxe-restaurant-card-image" onClick={() => openLightbox(lightboxImages, idx)} style={{ cursor: "zoom-in" }}>
                <img src={item.imageSrc} alt={item.name} loading="lazy" />
              </div>
              <div className="hotel-deluxe-restaurant-card-body">
                <div className="hotel-deluxe-restaurant-card-price">S/. {item.price}</div>
                <h3 className="hotel-deluxe-restaurant-card-title">{item.name}</h3>
                <p className="hotel-deluxe-restaurant-card-desc">{item.description}</p>
                <button
                  type="button"
                  className="hotel-deluxe-restaurant-add-btn"
                  onClick={() => addToCart(item)}
                >
                  <span>+</span> {t(locale, "Agregar al pedido", "Add to order")}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="hotel-deluxe-restaurant-cta-wrapper">
          <a href="/restaurante" className="hotel-deluxe-restaurant-cta-full">
            {t(locale, "Ver Carta Completa", "View Full Menu")}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>

      {totalItems > 0 && (
        <>
          <button
            type="button"
            className="hotel-deluxe-cart-fab"
            onClick={() => setIsCartOpen(true)}
            aria-label={t(locale, "Ver carrito", "View cart")}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            <span className="hotel-deluxe-cart-fab-badge">{totalItems}</span>
          </button>

          {isCartOpen && (
            <div className="hotel-deluxe-cart-overlay" onClick={() => setIsCartOpen(false)}>
              <div
                className="hotel-deluxe-cart-panel"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="hotel-deluxe-cart-header">
                  <h3>{t(locale, "Tu pedido", "Your order")}</h3>
                  <button
                    type="button"
                    className="hotel-deluxe-cart-close"
                    onClick={() => setIsCartOpen(false)}
                  >
                    ✕
                  </button>
                </div>

                <div className="hotel-deluxe-cart-items">
                  {cart.map((ci) => (
                    <div key={ci.item.id} className="hotel-deluxe-cart-item">
                      <div className="hotel-deluxe-cart-item-info">
                        <span className="hotel-deluxe-cart-item-name">{ci.item.name}</span>
                        <span className="hotel-deluxe-cart-item-subtotal">
                          S/. {ci.item.price * ci.quantity}
                        </span>
                      </div>
                      <div className="hotel-deluxe-cart-item-controls">
                        <button
                          type="button"
                          onClick={() => updateQuantity(ci.item.id, -1)}
                        >
                          -
                        </button>
                        <span>{ci.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(ci.item.id, 1)}
                        >
                          +
                        </button>
                        <button
                          type="button"
                          className="hotel-deluxe-cart-item-remove"
                          onClick={() => removeFromCart(ci.item.id)}
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="hotel-deluxe-cart-footer">
                  <div className="hotel-deluxe-cart-total">
                    <span>{t(locale, "Total", "Total")}:</span>
                    <strong>S/. {totalPrice}</strong>
                  </div>
                  <button
                    type="button"
                    className="hotel-deluxe-cart-whatsapp-btn"
                    onClick={sendOrderWhatsApp}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    {t(locale, "Enviar pedido por WhatsApp", "Send order via WhatsApp")}
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </section>
  );
}
