/* ═══════════════════════════════════════════════════════════════════
   DATA LAYER — Hospedaje Restaurante El Hombre
   i18n-ready: every text field has { es, en }
   ═══════════════════════════════════════════════════════════════════ */

/* ─── Bilingual Text Helper ─────────────────────────────────────── */

export interface Bilingual {
  es: string;
  en: string;
}

/* ─── Menu Item ─────────────────────────────────────────────────── */

export interface MenuItem {
  name: Bilingual;
  description?: Bilingual;
  price: string;
}

/* ─── Featured Dish (homepage) ──────────────────────────────────── */

export interface FeaturedDish {
  id: number;
  name: Bilingual;
  description: Bilingual;
  price: string;
  image: string;
  category: Bilingual;
}

/* ─── Testimonial ───────────────────────────────────────────────── */

export interface Testimonial {
  id: number;
  name: string;
  location: string;
  avatar: string;
  rating: number;
  text: string;
  platform: string;
}

/* ─── Experience ────────────────────────────────────────────────── */

export interface Experience {
  title: Bilingual;
  description: Bilingual;
  image: string;
  tag: string;
}

/* ─── Room Pricing (dynamic occupancy) ──────────────────────────── */

export interface RoomPricing {
  price1: string;  // 1 person
  price2?: string; // 2 persons (optional)
}

/* ─── Room ──────────────────────────────────────────────────────── */

export interface Room {
  name: Bilingual;
  slug: string;
  description: Bilingual;
  price: string; // fallback single price display
  pricing?: RoomPricing; // dynamic occupancy pricing
  image: string;
  badge: Bilingual;
  features: Bilingual[];
  gallery: string[];
  maxGuests?: number; // for triple room etc.
}

/* ─── Service Items ─────────────────────────────────────────────── */

export interface ServiceItem {
  icon: string;
  label: string;
  paid?: boolean;
}

export interface ServiceCategory {
  title: string;
  icon: string;
  items: ServiceItem[];
}

/* ═══ HOTEL IDENTITY ══════════════════════════════════════════════ */

export const HOTEL_NAME = "Hospedaje Restaurante El Hombre";

export const HOTEL_LOCATION = {
  city: "Puerto Chicama",
  province: "La Libertad",
  country: "Perú",
  address: "Arica 803, Puerto Malabrigo (Puerto Chicama), La Libertad, Perú",
  phone: "+51 949 090 421",
  whatsapp: "51949090421",
  email: "info@elhombreperu.com",
};

export const HOTEL_SCORE = {
  value: 9.2,
  label: "Fantástico",
  labelEn: "Fantastic",
  reviews: 74,
  subLabel: "Basado en opiniones reales",
  subLabelEn: "Based on real reviews",
  beachRating: 9.2,
  beachLabel: "Playa",
  beachLabelEn: "Beach",
};

export const HOTEL_DESCRIPTION: Bilingual = {
  es: "Ofrece zona de playa privada, salón de uso común, terraza panorámica frente al mar y restaurante en Malabrigo. Dispone de bar, cocina compartida, mostrador de información turística y cambio de moneda. A pocos pasos de la Playa de Puerto Chicama.",
  en: "Features a private beach area, shared lounge, panoramic terrace overlooking the sea, and a restaurant in Malabrigo. Includes a bar, shared kitchen, tourist information desk, and currency exchange. Just steps from Puerto Chicama Beach.",
};

export const HOTEL_POLICIES = {
  checkIn: "14:00",
  checkOut: "12:00",
  languages: ["Español"],
  smoking: "Prohibido fumar en todo el alojamiento",
};

/* ─── INTRO SECTION ─────────────────────────────────────────────── */

export const INTRO_TEXT: Bilingual = {
  es: "Hospedaje Restaurante El Hombre ofrece una atención cálida, cómoda y memorable. Fomenta un ambiente de confianza que invita al descanso y hace que los visitantes se sientan como en su propia casa.",
  en: "Hospedaje Restaurante El Hombre offers a warm, comfortable, and memorable hospitality. We foster an environment of trust that invites you to rest, making our guests feel right at home.",
};

/* ─── SERVICES & AMENITIES ════════════════════════════════════════ */

export const services: ServiceCategory[] = [
  {
    title: "Más Populares",
    icon: "Star",
    items: [
      { icon: "Plane", label: "Traslado aeropuerto", paid: true },
      { icon: "Wifi", label: "WiFi gratis" },
      { icon: "Umbrella", label: "Frente a la playa" },
      { icon: "UtensilsCrossed", label: "Restaurante a la carta" },
      { icon: "Wine", label: "Bar" },
      { icon: "Palmtree", label: "Zona privada de playa" },
      { icon: "Coffee", label: "Desayuno incluido" },
    ],
  },
  {
    title: "Exteriores & Actividades",
    icon: "Sun",
    items: [
      { icon: "Sun", label: "Terraza / solárium con vista panorámica 180°" },
      { icon: "Waves", label: "Zona de playa privada" },
      { icon: "MountainSnow", label: "Acceso directo para surfistas" },
      { icon: "TreePalm", label: "Jardín" },
      { icon: "Armchair", label: "Terraza / patio" },
    ],
  },
  {
    title: "Recepción",
    icon: "ConciergeBell",
    items: [
      { icon: "Lock", label: "Registro de entrada/salida privado" },
      { icon: "Zap", label: "Registro exprés" },
      { icon: "MapPin", label: "Información turística de Puerto Chicama" },
      { icon: "CircleDollarSign", label: "Cambio de moneda" },
    ],
  },
  {
    title: "Instalaciones",
    icon: "Building",
    items: [
      { icon: "Tv", label: "Zona TV / salón de uso compartido" },
      { icon: "CookingPot", label: "Cocina compartida" },
      { icon: "Shirt", label: "Servicio de lavandería" },
      { icon: "Wind", label: "Servicio de limpieza en seco" },
      { icon: "Package", label: "Almuerzos para llevar" },
    ],
  },
  {
    title: "Seguridad",
    icon: "ShieldCheck",
    items: [
      { icon: "Camera", label: "Cámaras de seguridad exteriores" },
      { icon: "FireExtinguisher", label: "Extintores" },
      { icon: "Shield", label: "Seguridad 24 horas" },
      { icon: "Lock", label: "Candado en la habitación" },
      { icon: "Safe", label: "Caja fuerte en la habitación" },
    ],
  },
  {
    title: "Baño",
    icon: "Bath",
    items: [
      { icon: "ShowerHead", label: "Ducha" },
      { icon: "Bath", label: "Bañera" },
      { icon: "Ruler", label: "Papel higiénico" },
      { icon: "CircleDot", label: "WC" },
    ],
  },
];

/* ─── ROOM AMENITIES ═════════════════════════════════════════════ */

export const roomAmenities = [
  "Vistas al mar",
  "Ventilador",
  "Ventilador de techo",
  "Calefacción",
  "Cama de matrimonio",
  "Cama individual",
  "Cama grande (+2 plazas)",
  "Toallas",
  "Ropa de cama",
  "Mosquitera",
];

/* ═══ FEATURED DISHES (Homepage) ══════════════════════════════════ */

export const featuredDishes: FeaturedDish[] = [
  {
    id: 1,
    name: { es: "Ceviche Simple Chicamero", en: "Classic Chicama Ceviche" },
    description: {
      es: "Ceviche de pescado fresco del Pacífico con limón de Chulucanas, cebolla morada y cilantro. Receta tradicional de la costa norte peruana.",
      en: "Fresh Pacific fish ceviche with Chulucanas lime, red onion, and cilantro. Traditional recipe from Peru's north coast.",
    },
    price: "S/. 25",
    image: "/images/restaurant/foto1.webp",
    category: { es: "Pescados y Mariscos", en: "Seafood" },
  },
  {
    id: 2,
    name: { es: "Chicharrón de Pescado", en: "Fried Fish Chunks" },
    description: {
      es: "Pescado fresco frito en tiras doradas acompañado de yuca sancochada, salsa criolla y limón.",
      en: "Fresh fried fish strips served with boiled yuca, criolla sauce, and lime.",
    },
    price: "S/. 28",
    image: "/images/restaurant/foto3.webp",
    category: { es: "Pescados y Mariscos", en: "Seafood" },
  },
  {
    id: 3,
    name: { es: "Lomo Saltado", en: "Traditional Stir-fried Beef Lomo" },
    description: {
      es: "El clásico plato peruano: beef salteado con cebolla, tomate, ají amarillo, arroz y papas fritas.",
      en: "The classic Peruvian dish: stir-fried beef with onion, tomato, yellow chili, rice, and french fries.",
    },
    price: "S/. 25",
    image: "/images/restaurant/foto5.webp",
    category: { es: "Platos Criollos", en: "Traditional Local Dishes" },
  },
];

/* ═══ FULL MENU (2 Categories, 16 Dishes) ════════════════════════ */

export const fullMenu: Record<string, MenuItem[]> = {
  "Pescados y Mariscos": [
    {
      name: { es: "Ceviche Simple Chicamero", en: "Classic Chicama Ceviche" },
      description: {
        es: "Pescado fresco del día marinado en limón con cebolla morada, cilantro y camote.",
        en: "Fresh daily fish marinated in lime with red onion, cilantro, and sweet potato.",
      },
      price: "S/. 25",
    },
    {
      name: { es: "Chicharrón de Pescado", en: "Fried Fish Chunks" },
      description: {
        es: "Pescado fresco dorado acompañado de yuca sancochada y salsa criolla.",
        en: "Golden fried fish served with boiled yuca and criolla sauce.",
      },
      price: "S/. 28",
    },
    {
      name: { es: "Pescado Apanado", en: "Breaded Fish Fillet" },
      description: {
        es: "Filete de pescado empanizado y frito, acompañado de arroz y ensalada.",
        en: "Breaded and fried fish fillet, served with rice and salad.",
      },
      price: "S/. 22",
    },
    {
      name: { es: "Pescado a la Plancha", en: "Grilled Fish Fillet" },
      description: {
        es: "Filete de pescado a la plancha con limón, arroz y ensalada fresca.",
        en: "Grilled fish fillet with lime, rice, and fresh salad.",
      },
      price: "S/. 25",
    },
    {
      name: { es: "Sudado de Cabrilla", en: "Steamed Cabrilla Fish Stew" },
      description: {
        es: "Cabrilla en salsa de tomate, cebolla, ají amarillo y culantro. Tradición costera.",
        en: "Cabrilla fish in tomato, onion, yellow chili, and cilantro broth. Coastal tradition.",
      },
      price: "S/. 30",
    },
    {
      name: { es: "Arroz con Mariscos", en: "Seafood Rice" },
      description: {
        es: "Arroz cocinado con camarones, calamar, langostino y verduras de temporada.",
        en: "Rice cooked with shrimp, squid, langoustine, and seasonal vegetables.",
      },
      price: "S/. 30",
    },
    {
      name: { es: "Pescado Frito", en: "Pan-Fried Whole Fish" },
      description: {
        es: "Pescado entero frito acompañado de arroz, yuca, ensalada y salsa criolla.",
        en: "Whole pan-fried fish served with rice, yuca, salad, and criolla sauce.",
      },
      price: "S/. 25",
    },
  ],
  "Platos Criollos": [
    {
      name: { es: "Arroz Chaufa de Pollo", en: "Peruvian Chicken Fried Rice" },
      description: {
        es: "Arroz salteado al wok con pollo, huevo, cebollín, sillao y kión.",
        en: "Wok-fried rice with chicken, egg, scallion, soy sauce, and ginger.",
      },
      price: "S/. 18",
    },
    {
      name: { es: "Pollo Saltado", en: "Stir-fried Chicken" },
      description: {
        es: "Pollo salteado con cebolla, tomate, ají amarillo, acompañado de arroz y papas fritas.",
        en: "Stir-fried chicken with onion, tomato, yellow chili, served with rice and french fries.",
      },
      price: "S/. 18",
    },
    {
      name: { es: "Pollo a la Plancha", en: "Grilled Chicken Breast" },
      description: {
        es: "Pechuga de pollo a la plancha con arroz, ensalada y papas fritas.",
        en: "Grilled chicken breast with rice, salad, and french fries.",
      },
      price: "S/. 18",
    },
    {
      name: { es: "Milanesa de Pollo", en: "Chicken Milanesa" },
      description: {
        es: "Pollo empanizado y frito, acompañado de arroz y ensalada fresca.",
        en: "Breaded and fried chicken, served with rice and fresh salad.",
      },
      price: "S/. 18",
    },
    {
      name: { es: "Arroz a la Cubana", en: "Cuban-style Rice" },
      description: {
        es: "Arroz con huevo frito, plátano maduro y carne. Un clásico peruano.",
        en: "Rice with fried egg, ripe plantain, and beef. A Peruvian classic.",
      },
      price: "S/. 18",
    },
    {
      name: { es: "Chicharrón de Pollo", en: "Deep-fried Chicken Chunks" },
      description: {
        es: "Trozos de pollo crujientes fritos a la perfección, con yuca y salsa criolla.",
        en: "Crispy deep-fried chicken chunks, served with yuca and criolla sauce.",
      },
      price: "S/. 18",
    },
    {
      name: { es: "Lomo Saltado", en: "Traditional Stir-fried Beef Lomo" },
      description: {
        es: "Lomo de res salteado con cebolla, tomate, ají amarillo, arroz y papas fritas.",
        en: "Stir-fried beef tenderloin with onion, tomato, yellow chili, rice, and french fries.",
      },
      price: "S/. 25",
    },
    {
      name: { es: "Tallarín Saltado de Pollo", en: "Stir-fried Chicken Noodles" },
      description: {
        es: "Tallarines saltados con pollo, verduras y salsa de soja al wok.",
        en: "Wok-stir-fried noodles with chicken, vegetables, and soy sauce.",
      },
      price: "S/. 18",
    },
    {
      name: { es: "Tallarín Saltado de Carne", en: "Stir-fried Beef Noodles" },
      description: {
        es: "Tallarines saltados con lomo de res, verduras y salsa de soja al wok.",
        en: "Wok-stir-fried noodles with beef, vegetables, and soy sauce.",
      },
      price: "S/. 22",
    },
  ],
};

/* ─── Menu category i18n labels ─────────────────────────────────── */

export const menuCategoryLabels: Record<string, Bilingual> = {
  "Pescados y Mariscos": { es: "Pescados y Mariscos", en: "Seafood" },
  "Platos Criollos": { es: "Platos Criollos", en: "Traditional Local Dishes" },
};

/* ═══ TESTIMONIALS ═══════════════════════════════════════════════ */

export const testimonials: Testimonial[] = [
  {
    id: 0,
    name: "Julio",
    location: "México",
    avatar: "JU",
    rating: 5,
    text: "Excelente lugar y servicio. Luis y su hermana te hacen sentir en casa.",
    platform: "Booking.com",
  },
  {
    id: 1,
    name: "Diego Alvarado",
    location: "Trujillo, Perú",
    avatar: "DA",
    rating: 5,
    text: "Puerto Chicama a su máximo. Las habitaciones están justo frente a la ola, el ceviche es de primera y la onda del lugar es incomparable. Cada surfista debería pasar por aquí.",
    platform: "Google",
  },
  {
    id: 2,
    name: "Sarah Mitchell",
    location: "California, USA",
    avatar: "SM",
    rating: 5,
    text: "I came for the longest left wave in the world and found a perfect home base. The food is incredible — best ceviche I've had in South America. Already planning my next trip.",
    platform: "TripAdvisor",
  },
  {
    id: 3,
    name: "Carlos Bejarano",
    location: "Lima, Perú",
    avatar: "CB",
    rating: 5,
    text: "Un paraíso escondido en La Libertad. La jalea marina del restaurante es espectacular, las habitaciones son cómodas y la atención es de primera. Volveremos siempre.",
    platform: "Booking.com",
  },
  {
    id: 4,
    name: "Jake Thompson",
    location: "Gold Coast, Australia",
    avatar: "JT",
    rating: 5,
    text: "Chicama is legendary and this place does it justice. Woke up, checked the surf, paddled out, came back to an amazing meal. The hospitality here is genuine and warm.",
    platform: "Google",
  },
  {
    id: 5,
    name: "Lucía Navarro",
    location: "Chiclayo, Perú",
    avatar: "LN",
    rating: 5,
    text: "Fuimos en familia y fue perfecto. Las habitaciones limpias, el personal muy atento y la comida deliciosa. Los niños disfrutaron la playa y nosotros la tranquilidad.",
    platform: "Booking.com",
  },
];

/* ═══ EXPERIENCES ═════════════════════════════════════════════════ */

export const experiences: Experience[] = [
  {
    title: { es: "Surf en Puerto Chicama", en: "Surfing in Puerto Chicama" },
    description: {
      es: "Hospedaje Restaurante El Hombre, ubicado frente a la ola izquierda más larga del mundo. Contamos con el equipo completo de tablas y trajes de surf, con instructores certificados para una buena sesión de surf y así tengas una tarde mágica sobre las olas.",
      en: "Hospedaje Restaurante El Hombre, located right in front of the longest left-breaking wave in the world. We offer complete gear rental (surfboards and wetsuits) along with certified instructors for an outstanding surf session, ensuring a magical afternoon riding the waves.",
    },
    image:
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
    tag: "Todo el año",
  },
  {
    title: { es: "Tours Culinarios Marinos", en: "Coastal Culinary Tours" },
    description: {
      es: "Descubre los sabores de la costa norte peruana. Tour por mercados de pescadores, clase de ceviche y degustación de platos típicos.",
      en: "Discover the flavors of Peru's north coast. Fisherman's market tour, ceviche class, and tasting of typical dishes.",
    },
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
    tag: "Gastronómico",
  },
  {
    title: { es: "Sunset en Malecón", en: "Sunset at the Boardwalk" },
    description: {
      es: "Paseo al atardecer por el malecón de Puerto Chicama con vista a las olas y la cordillera. Foto profesional incluida.",
      en: "Sunset stroll along the Puerto Chicama boardwalk with views of the waves and the mountain range. Professional photo included.",
    },
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
    tag: "Experiencia",
  },
  {
    title: { es: "Avistamiento de Fauna", en: "Wildlife Watching" },
    description: {
      es: "Excursión a los humedales y ecosistemas costeros de La Libertad. Flamencos, pelícanos y lobos marinos en su hábitat natural.",
      en: "Excursion to the wetlands and coastal ecosystems of La Libertad. Flamingos, pelicans, and sea lions in their natural habitat.",
    },
    image:
      "https://images.unsplash.com/photo-1568430462989-44163eb1752f?w=800&q=80",
    tag: "Naturaleza",
  },
];

/* ═══ ROOMS (7 Official Rooms — Booking.com Verified) ════════════ */

export const rooms: Room[] = [
  /* ── Room 1: NÚMERO 6 ── Individual ── */
  {
    name: { es: "NÚMERO 6 — Habitación Individual", en: "No. 6 — Single Room" },
    slug: "numero-6",
    description: {
      es: "1 cama individual de plaza y media con baño compartido, ducha y WC. Incluye wifi gratis, toalla y desayuno americano.",
      en: "1 twin bed (1.5 pl.) with shared bathroom, shower, and WC. Free Wi-Fi, towel, and American breakfast included.",
    },
    price: "S/. 55",
    image: "/images/rooms/individual-vistas-al-mar/foto1.webp",
    badge: { es: "Individual", en: "Single" },
    features: [
      { es: "1 Cama Individual", en: "1 Twin Bed" },
      { es: "Baño Compartido", en: "Shared Bathroom" },
      { es: "Ducha", en: "Shower" },
      { es: "WiFi Gratis", en: "Free Wi-Fi" },
      { es: "Toalla", en: "Towel" },
      { es: "Desayuno Americano", en: "American Breakfast" },
    ],
    gallery: [
      "/images/rooms/individual-vistas-al-mar/foto1.webp",
      "/images/rooms/individual-vistas-al-mar/foto2.webp",
      "/images/rooms/individual-vistas-al-mar/foto3.webp",
      "/images/rooms/individual-vistas-al-mar/foto4.webp",
    ],
  },

  /* ── Room 2: NÚMERO 3 ── Doble ── */
  {
    name: { es: "NÚMERO 3 — Habitación Doble", en: "No. 3 — Double Room" },
    slug: "numero-3",
    description: {
      es: "Dos camas individuales de plaza y media, baño compartido, ducha y WC. Incluye wifi gratis y desayuno americano.",
      en: "Two twin beds (1.5 pl.) with shared bathroom, shower, and WC. Free Wi-Fi and American breakfast included.",
    },
    price: "S/. 110",
    image: "/images/rooms/doble-2-camas/foto1.webp",
    badge: { es: "Doble", en: "Double" },
    features: [
      { es: "2 Camas Individuales", en: "2 Twin Beds" },
      { es: "Baño Compartido", en: "Shared Bathroom" },
      { es: "Ducha", en: "Shower" },
      { es: "WiFi Gratis", en: "Free Wi-Fi" },
      { es: "Desayuno Americano", en: "American Breakfast" },
    ],
    gallery: [
      "/images/rooms/doble-2-camas/foto1.webp",
      "/images/rooms/doble-2-camas/foto2.webp",
      "/images/rooms/doble-2-camas/foto3.webp",
      "/images/rooms/doble-2-camas/foto4.webp",
    ],
  },

  /* ── Room 3: KING VISTA AL MAR ── Dynamic Pricing ── */
  {
    name: { es: "Habitación Cama King con Vista al Mar", en: "King Bed Room with Ocean View" },
    slug: "king-vista-al-mar",
    description: {
      es: "1 cama grande con baño compartido, ducha y WC. Incluye wifi gratis, toalla y desayuno americano.",
      en: "1 king-size bed with shared bathroom, shower, and WC. Free Wi-Fi, towel, and American breakfast included.",
    },
    price: "S/. 80",
    pricing: {
      price1: "S/. 80",
      price2: "S/. 160",
    },
    image: "/images/rooms/cama-grande-vistas-al-mar/foto1.webp",
    badge: { es: "Vista al Mar", en: "Ocean View" },
    features: [
      { es: "1 Cama King", en: "1 King Bed" },
      { es: "Vista al Mar", en: "Ocean View" },
      { es: "Baño Compartido", en: "Shared Bathroom" },
      { es: "Ducha", en: "Shower" },
      { es: "WiFi Gratis", en: "Free Wi-Fi" },
      { es: "Toalla", en: "Towel" },
      { es: "Desayuno Americano", en: "American Breakfast" },
    ],
    gallery: [
      "/images/rooms/cama-grande-vistas-al-mar/foto1.webp",
      "/images/rooms/cama-grande-vistas-al-mar/foto2.webp",
      "/images/rooms/cama-grande-vistas-al-mar/foto3.webp",
      "/images/rooms/cama-grande-vistas-al-mar/foto4.webp",
      "/images/rooms/cama-grande-vistas-al-mar/foto5.webp",
      "/images/rooms/cama-grande-vistas-al-mar/foto6.webp",
      "/images/rooms/cama-grande-vistas-al-mar/foto7.webp",
    ],
  },

  /* ── Room 4: QUEEN PRIVADA VISTA AL MAR ── Dynamic Pricing ── */
  {
    name: { es: "Habitación Cama Queen con Vista al Mar (Privada)", en: "Private Queen Bed Room with Ocean View" },
    slug: "queen-privada-vista-al-mar",
    description: {
      es: "1 cama grande Queen con baño privado, ducha y WC. Incluye wifi gratis, desayuno, toalla, jabón y papel higiénico.",
      en: "1 queen-size bed with private bathroom, shower, and WC. Free Wi-Fi, breakfast, towel, soap, and amenities included.",
    },
    price: "S/. 80",
    pricing: {
      price1: "S/. 80",
      price2: "S/. 160",
    },
    image: "/images/rooms/cama-grande-vistas-al-mar/foto2.webp",
    badge: { es: "Baño Privado", en: "Private Bath" },
    features: [
      { es: "1 Cama Queen", en: "1 Queen Bed" },
      { es: "Vista al Mar", en: "Ocean View" },
      { es: "Baño Privado", en: "Private Bathroom" },
      { es: "Ducha", en: "Shower" },
      { es: "WiFi Gratis", en: "Free Wi-Fi" },
      { es: "Toalla", en: "Towel" },
      { es: "Jabón", en: "Soap" },
      { es: "Desayuno Incluido", en: "Breakfast Included" },
    ],
    gallery: [
      "/images/rooms/cama-grande-vistas-al-mar/foto3.webp",
      "/images/rooms/cama-grande-vistas-al-mar/foto4.webp",
      "/images/rooms/cama-grande-vistas-al-mar/foto5.webp",
      "/images/rooms/cama-grande-vistas-al-mar/foto6.webp",
      "/images/rooms/cama-grande-vistas-al-mar/foto7.webp",
    ],
  },

  /* ── Room 5: PRIVADA CAMAS DOBLES ── Consultar ── */
  {
    name: { es: "Habitación Privada Camas Dobles", en: "Private Double Bed Room" },
    slug: "privada-camas-dobles",
    description: {
      es: "1 cama grande y una de plaza y media, baño privado, ducha, WC, jabón y toalla. Wifi gratis y desayuno incluido.",
      en: "1 full bed and 1 twin bed, private bathroom, shower, WC, soap, and towel. Free Wi-Fi and breakfast included.",
    },
    price: "Consultar",
    image: "/images/rooms/deluxe-1-cama-grande/foto1.webp",
    badge: { es: "Privada", en: "Private" },
    features: [
      { es: "1 Cama Grande + 1 Individual", en: "1 Full Bed + 1 Twin Bed" },
      { es: "Baño Privado", en: "Private Bathroom" },
      { es: "Ducha", en: "Shower" },
      { es: "Jabón y Toalla", en: "Soap & Towel" },
      { es: "WiFi Gratis", en: "Free Wi-Fi" },
      { es: "Desayuno Incluido", en: "Breakfast Included" },
    ],
    gallery: [
      "/images/rooms/deluxe-1-cama-grande/foto1.webp",
      "/images/rooms/deluxe-1-cama-grande/foto2.webp",
      "/images/rooms/deluxe-1-cama-grande/foto3.webp",
      "/images/rooms/deluxe-1-cama-grande/foto4.webp",
    ],
  },

  /* ── Room 6: TRIPLE ── */
  {
    name: { es: "Habitación Triple", en: "Triple Room" },
    slug: "triple",
    description: {
      es: "3 camas individuales con baño compartido, bañera, ducha, WC, toallas. Incluye wifi gratis y desayuno incluido.",
      en: "3 twin beds with shared bathroom, bathtub, shower, WC, and towels. Free Wi-Fi and breakfast included.",
    },
    price: "S/. 170",
    image: "/images/rooms/triple-basica-bano-compartido/foto1.webp",
    badge: { es: "Triple", en: "Triple" },
    maxGuests: 3,
    features: [
      { es: "3 Camas Individuales", en: "3 Twin Beds" },
      { es: "Baño Compartido", en: "Shared Bathroom" },
      { es: "Bañera", en: "Bathtub" },
      { es: "Ducha", en: "Shower" },
      { es: "Toallas", en: "Towels" },
      { es: "WiFi Gratis", en: "Free Wi-Fi" },
      { es: "Desayuno Incluido", en: "Breakfast Included" },
    ],
    gallery: [
      "/images/rooms/triple-basica-bano-compartido/foto1.webp",
      "/images/rooms/triple-basica-bano-compartido/foto2.webp",
      "/images/rooms/triple-basica-bano-compartido/foto3.webp",
      "/images/rooms/triple-basica-bano-compartido/foto4.webp",
      "/images/rooms/triple-basica-bano-compartido/foto5.webp",
      "/images/rooms/triple-basica-bano-compartido/foto6.webp",
    ],
  },

  /* ── Room 7: QUEEN VISTA AL MAR (COMPARTIDA) ── Dynamic Pricing ── */
  {
    name: { es: "Habitación Queen con Vista al Mar", en: "Queen Bed Room with Ocean View" },
    slug: "queen-vista-al-mar",
    description: {
      es: "1 cama Queen individual grande con baño compartido, bañera, WC, toalla y papel higiénico. Incluye wifi gratis, TV y desayuno.",
      en: "1 large queen bed with shared bathroom, bathtub, WC, towel, and amenities. Free Wi-Fi, TV, and breakfast included.",
    },
    price: "S/. 60",
    pricing: {
      price1: "S/. 60",
      price2: "S/. 120",
    },
    image: "/images/rooms/doble-aseo-compartido-2-camas/foto1.webp",
    badge: { es: "Vista al Mar", en: "Ocean View" },
    features: [
      { es: "1 Cama Queen Grande", en: "1 Large Queen Bed" },
      { es: "Vista al Mar", en: "Ocean View" },
      { es: "Baño Compartido", en: "Shared Bathroom" },
      { es: "Bañera", en: "Bathtub" },
      { es: "WiFi Gratis", en: "Free Wi-Fi" },
      { es: "TV", en: "TV" },
      { es: "Toalla", en: "Towel" },
      { es: "Desayuno Incluido", en: "Breakfast Included" },
    ],
    gallery: [
      "/images/rooms/doble-aseo-compartido-2-camas/foto1.webp",
      "/images/rooms/doble-aseo-compartido-2-camas/foto2.webp",
      "/images/rooms/doble-aseo-compartido-2-camas/foto3.webp",
      "/images/rooms/doble-aseo-compartido-2-camas/foto4.webp",
      "/images/rooms/doble-aseo-compartido-2-camas/foto5.webp",
    ],
  },
];