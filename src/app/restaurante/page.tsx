"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import type { HotelLocale } from "@/lib/hotel-experience";
import { t } from "@/lib/hotel-experience";

type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageSrc: string;
  category: string;
};

type CartItem = {
  item: MenuItem;
  quantity: number;
};

const WHATSAPP_DIGITS = "51949090421";

const MENU_CATEGORIES = [
  { id: "especiales", labelEs: "Especiales Marinos", labelEn: "Seafood Specials" },
  { id: "ejecutivo", labelEs: "Menu Ejecutivo", labelEn: "Executive Menu" },
  { id: "bebidas", labelEs: "Bebidas", labelEn: "Drinks" },
];

const FULL_MENU: MenuItem[] = [
  // Especiales Marinos
  {
    id: "ceviche-especial",
    name: "Ceviche Especial de la Casa",
    description: "Pescado fresco del dia marinado en limon con cebolla morada, aji limo, camote y choclo. Nuestra especialidad que representa lo mejor de la costa peruana.",
    price: 35,
    imageSrc: "https://images.unsplash.com/photo-1535399831218-d5bd36d1a6b3?w=600&q=80",
    category: "especiales",
  },
  {
    id: "jalea-marina",
    name: "Jalea Marina Familiar",
    description: "Seleccion de pescado, camarones, calamar y pulpo fritos acompanados de yuca, salsa criolla y limon. Perfecta para compartir en familia o entre amigos despues del surf.",
    price: 45,
    imageSrc: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=600&q=80",
    category: "especiales",
  },
  {
    id: "arroz-con-mariscos",
    name: "Arroz con Mariscos",
    description: "Arroz preparado con una mezcla de mariscos frescos del dia, seasoned with our special blend of spices. Generous portions for a satisfying meal.",
    price: 38,
    imageSrc: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=600&q=80",
    category: "especiales",
  },
  {
    id: "pescado-frito",
    name: "Pescado Frito con Yucas",
    description: "Pescado entero frito acompanado de yucas doradas, ensalada criolla y salsa de aji. Un clasico de la costa peruana preparado con pescado fresco del dia.",
    price: 28,
    imageSrc: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&q=80",
    category: "especiales",
  },
  {
    id: "parihuela",
    name: "Parihuela de Mariscos",
    description: "Sopa espesa y sabrosa preparada con una variedad de mariscos frescos. Receta tradicional peruana con un toque casero que te hara sentir en casa.",
    price: 32,
    imageSrc: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&q=80",
    category: "especiales",
  },
  // Menu Ejecutivo
  {
    id: "menu-ejecutivo",
    name: "Menu Ejecutivo Diario",
    description: "Plato del dia con entrada, sopa o crema, plato principal a elegir y refresco. La mejor opcion economica para un almuerzo completo y nutritivo frente al mar.",
    price: 15,
    imageSrc: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80",
    category: "ejecutivo",
  },
  {
    id: "menu-ejecutivo-marino",
    name: "Menu Ejecutivo Marino",
    description: "Incluye entrada de mariscos, plato principal con pescado o mariscos a elegir, postre y refresco. La experiencia completa del restaurante a un precio accesible.",
    price: 20,
    imageSrc: "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=600&q=80",
    category: "ejecutivo",
  },
  // Bebidas
  {
    id: "pisco-sour",
    name: "Pisco Sour",
    description: "El coctel bandera del Peru. Preparado con pisco quebranta, limon de Pica, jarabe de goma, clara de huevo y amargo de angostura.",
    price: 18,
    imageSrc: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&q=80",
    category: "bebidas",
  },
  {
    id: "chicha-morada",
    name: "Chicha Morada",
    description: "Bebida tradicional peruana preparada con maiz morado, pia, canela, clavo de olor y limon. Refrescante y natural, perfecta para acompanar tu comida.",
    price: 6,
    imageSrc: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=600&q=80",
    category: "bebidas",
  },
  {
    id: "cerveza-artesanal",
    name: "Cerveza Artesanal Local",
    description: "Cerveza artesanal de la zona, seleccionada para maridar con nuestros platos de mariscos. Consulta las variedades disponibles del dia.",
    price: 12,
    imageSrc: "https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=600&q=80",
    category: "bebidas",
  },
  {
    id: "limonada",
    name: "Limonada Natural",
    description: "Limonada preparada con limones frescos de la region. Sin conservantes ni azucares anadidos, solo la frescura natural de los citricos peruanos.",
    price: 5,
    imageSrc: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=600&q=80",
    category: "bebidas",
  },
];

export default function RestaurantePage() {
  const [locale] = useState<HotelLocale>("es");
  const [activeCategory, setActiveCategory] = useState("especiales");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const filteredItems = FULL_MENU.filter((item) => item.category === activeCategory);
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
    setCart((prev) =>
      prev
        .map((ci) =>
          ci.item.id === itemId ? { ...ci, quantity: ci.quantity + delta } : ci,
        )
        .filter((ci) => ci.quantity > 0),
    );
  }, []);

  const removeFromCart = useCallback((itemId: string) => {
    setCart((prev) => prev.filter((ci) => ci.item.id !== itemId));
  }, []);

  const sendOrderWhatsApp = useCallback(() => {
    const restaurantName = "Restaurante El Hombre";
    const greeting = locale === "en" ? "Hello" : "Hola";
    const intro = locale === "en"
      ? `I would like to place an order from *${restaurantName}*.`
      : `Deseo realizar un pedido del *${restaurantName}*.`;
    const detailHeader = locale === "en" ? "Order details:" : "Detalle del pedido:";
    const totalLabel = "Total:";
    const closing = locale === "en"
      ? "Thank you. I remain attentive to your response."
      : "Muchas gracias. Quedo atento(a) a su respuesta.";

    const orderLines = cart.map(
      (ci) => `- ${ci.item.name} x${ci.quantity} = S/. ${ci.item.price * ci.quantity}`,
    );

    const message = [
      `${greeting}`,
      "",
      intro,
      "",
      `*${detailHeader}*`,
      ...orderLines,
      "",
      `*${totalLabel}* S/. ${totalPrice}`,
      "",
      closing,
    ].join("\n");

    const encoded = encodeURIComponent(message);
    const url = `https://api.whatsapp.com/send/?phone=${WHATSAPP_DIGITS}&text=${encoded}&type=phone_number&app_absent=0`;
    window.open(url, "_blank", "noopener");
  }, [cart, totalPrice, locale]);

  return (
    <>
      <div className="restaurante-page">
        {/* Hero */}
        <div className="restaurante-hero">
          <Link href="/" className="restaurante-back-link">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            {t(locale, "Volver al inicio", "Back to home")}
          </Link>
          <div className="restaurante-hero-content">
            <span className="restaurante-hero-chip">Carta Completa</span>
            <h1 className="restaurante-hero-title">
              {t(locale, "Restaurante El Hombre", "El Hombre Restaurant")}
            </h1>
            <p className="restaurante-hero-desc">
              {t(
                locale,
                "Sabores del mar preparados con pescado fresco del dia. Disfruta de nuestra carta marina frente al oceano en Puerto Malabrigo.",
                "Fresh-from-the-sea flavors prepared with the catch of the day. Enjoy our seafood menu right by the ocean in Puerto Malabrigo.",
              )}
            </p>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="restaurante-tabs">
          {MENU_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              className={`restaurante-tab${activeCategory === cat.id ? " is-active" : ""}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {locale === "en" ? cat.labelEn : cat.labelEs}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="restaurante-grid">
          {filteredItems.map((item) => (
            <div key={item.id} className="restaurante-card">
              <div className="restaurante-card-image">
                <img src={item.imageSrc} alt={item.name} loading="lazy" />
              </div>
              <div className="restaurante-card-body">
                <div className="restaurante-card-price">S/. {item.price}</div>
                <h3 className="restaurante-card-title">{item.name}</h3>
                <p className="restaurante-card-desc">{item.description}</p>
                <button
                  type="button"
                  className="restaurante-card-add"
                  onClick={() => addToCart(item)}
                >
                  <span>+</span> {t(locale, "Agregar al pedido", "Add to order")}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cart FAB */}
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
              <div className="hotel-deluxe-cart-panel" onClick={(e) => e.stopPropagation()}>
                <div className="hotel-deluxe-cart-header">
                  <h3>{t(locale, "Tu pedido", "Your order")}</h3>
                  <button type="button" className="hotel-deluxe-cart-close" onClick={() => setIsCartOpen(false)}>
                    X
                  </button>
                </div>
                <div className="hotel-deluxe-cart-items">
                  {cart.map((ci) => (
                    <div key={ci.item.id} className="hotel-deluxe-cart-item">
                      <div className="hotel-deluxe-cart-item-info">
                        <span className="hotel-deluxe-cart-item-name">{ci.item.name}</span>
                        <span className="hotel-deluxe-cart-item-subtotal">S/. {ci.item.price * ci.quantity}</span>
                      </div>
                      <div className="hotel-deluxe-cart-item-controls">
                        <button type="button" onClick={() => updateQuantity(ci.item.id, -1)}>-</button>
                        <span>{ci.quantity}</span>
                        <button type="button" onClick={() => updateQuantity(ci.item.id, 1)}>+</button>
                        <button type="button" className="hotel-deluxe-cart-item-remove" onClick={() => removeFromCart(ci.item.id)}>X</button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="hotel-deluxe-cart-footer">
                  <div className="hotel-deluxe-cart-total">
                    <span>{t(locale, "Total", "Total")}:</span>
                    <strong>S/. {totalPrice}</strong>
                  </div>
                  <button type="button" className="hotel-deluxe-cart-whatsapp-btn" onClick={sendOrderWhatsApp}>
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

      <style jsx global>{`
        .restaurante-page {
          position: relative;
          max-width: 1320px;
          margin: 0 auto;
          padding: 0 clamp(16px, 3vw, 24px) 60px;
        }

        .restaurante-hero {
          position: relative;
          padding: 100px 0 40px;
          text-align: center;
        }

        .restaurante-back-link {
          position: absolute;
          top: 20px;
          left: 0;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: rgba(248, 244, 234, 0.7);
          font-size: 0.88rem;
          font-weight: 500;
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .restaurante-back-link:hover {
          color: #f8f4ea;
        }

        .restaurante-hero-chip {
          display: inline-block;
          padding: 6px 20px;
          border: 1px solid rgba(184, 115, 51, 0.3);
          border-radius: 999px;
          background: rgba(184, 115, 51, 0.08);
          color: #d4a574;
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          margin-bottom: 16px;
        }

        .restaurante-hero-title {
          font-family: var(--font-serif, serif);
          font-size: clamp(2rem, 5vw, 3.2rem);
          font-weight: 600;
          color: #f8f4ea;
          letter-spacing: -0.04em;
          line-height: 1.15;
          margin: 0 0 16px;
        }

        .restaurante-hero-desc {
          color: rgba(249, 245, 237, 0.72);
          font-size: 1.02rem;
          line-height: 1.7;
          max-width: 640px;
          margin: 0 auto;
        }

        .restaurante-tabs {
          display: flex;
          gap: 8px;
          margin-bottom: 32px;
          overflow-x: auto;
          padding-bottom: 4px;
          -webkit-overflow-scrolling: touch;
        }

        .restaurante-tab {
          flex: none;
          padding: 10px 22px;
          border: 1px solid rgba(244, 235, 220, 0.1);
          border-radius: 999px;
          background: transparent;
          color: rgba(248, 244, 234, 0.65);
          font-size: 0.88rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
        }

        .restaurante-tab:hover {
          background: rgba(255, 255, 255, 0.04);
          color: #f8f4ea;
        }

        .restaurante-tab.is-active {
          background: rgba(184, 115, 51, 0.12);
          border-color: rgba(184, 115, 51, 0.25);
          color: #d4a574;
        }

        .restaurante-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 20px;
        }

        .restaurante-card {
          border: 1px solid rgba(244, 235, 220, 0.1);
          border-radius: 22px;
          background: rgba(247, 243, 236, 0.05);
          overflow: hidden;
          transition: transform 0.3s ease, border-color 0.3s ease;
        }

        .restaurante-card:hover {
          transform: translateY(-3px);
          border-color: rgba(184, 115, 51, 0.22);
        }

        .restaurante-card-image {
          width: 100%;
          height: 200px;
          overflow: hidden;
        }

        .restaurante-card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .restaurante-card:hover .restaurante-card-image img {
          transform: scale(1.05);
        }

        .restaurante-card-body {
          padding: 20px;
        }

        .restaurante-card-price {
          display: inline-block;
          padding: 4px 12px;
          border: 1px solid rgba(184, 115, 51, 0.25);
          border-radius: 10px;
          background: rgba(184, 115, 51, 0.1);
          color: #d4a574;
          font-size: 0.88rem;
          font-weight: 700;
          margin-bottom: 10px;
        }

        .restaurante-card-title {
          font-family: var(--font-serif, serif);
          font-size: 1.12rem;
          font-weight: 600;
          color: #f8f4ea;
          margin: 0 0 8px;
          line-height: 1.3;
        }

        .restaurante-card-desc {
          color: rgba(249, 245, 237, 0.62);
          font-size: 0.86rem;
          line-height: 1.6;
          margin: 0 0 16px;
        }

        .restaurante-card-add {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 10px 20px;
          border: 1px solid rgba(184, 115, 51, 0.28);
          border-radius: 14px;
          background: rgba(184, 115, 51, 0.08);
          color: #d4a574;
          font-size: 0.84rem;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
          width: 100%;
          justify-content: center;
        }

        .restaurante-card-add:hover {
          background: rgba(184, 115, 51, 0.18);
          border-color: rgba(184, 115, 51, 0.42);
          transform: translateY(-1px);
        }

        .restaurante-card-add span {
          font-size: 1.1rem;
          font-weight: 700;
        }

        @media (max-width: 860px) {
          .restaurante-grid {
            grid-template-columns: 1fr;
            max-width: 420px;
            margin: 0 auto;
          }

          .restaurante-hero {
            padding: 80px 0 32px;
          }
        }

        /* "Ver Carta Completa" CTA on Home */
        .hotel-deluxe-restaurant-cta-wrapper {
          display: flex;
          justify-content: center;
          margin-top: 32px;
        }

        .hotel-deluxe-restaurant-cta-full {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 14px 32px;
          border: 1px solid rgba(184, 115, 51, 0.3);
          border-radius: 999px;
          background: rgba(184, 115, 51, 0.08);
          color: #d4a574;
          font-size: 0.95rem;
          font-weight: 600;
          letter-spacing: 0.01em;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .hotel-deluxe-restaurant-cta-full:hover {
          background: rgba(184, 115, 51, 0.16);
          border-color: rgba(184, 115, 51, 0.45);
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(184, 115, 51, 0.15);
        }
      `}</style>
    </>
  );
}
