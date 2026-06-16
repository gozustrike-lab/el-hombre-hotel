export interface MenuItem {
  name: string;
  description: string;
  price: string;
}

export interface FeaturedDish {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  category: string;
}

export interface Testimonial {
  id: number;
  name: string;
  location: string;
  avatar: string;
  rating: number;
  text: string;
  platform: string;
}

export interface Experience {
  title: string;
  description: string;
  image: string;
  tag: string;
}

export interface RoomPricing {
  price1: string;
  price2?: string;
}

export interface Room {
  name: string;
  slug: string;
  description: string;
  price: string;
  pricing?: RoomPricing;
  image: string;
  badge: string;
  features: string[];
  gallery?: string[];
}

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

/* ─── HOTEL IDENTITY ─────────────────────────────────────────── */

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
  reviews: 74,
  subLabel: "Basado en opiniones reales",
  beachRating: 9.2,
  beachLabel: "Playa",
};

export const HOTEL_DESCRIPTION =
  "Ofrece zona de playa privada, salón de uso común, terraza panorámica frente al mar y restaurante en Malabrigo. Dispone de bar, cocina compartida, mostrador de información turística y cambio de moneda. A pocos pasos de la Playa de Puerto Chicama.";

export const HOTEL_POLICIES = {
  checkIn: "14:00",
  checkOut: "12:00",
  languages: ["Español"],
  smoking: "Prohibido fumar en todo el alojamiento",
  parking: "No hay parking — aparcamiento público gratuito en las cercanías",
};

/* ─── SERVICES & AMENITIES (Booking.com verified) ──────────────── */

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

/* ─── ROOM AMENITIES (Booking.com verified) ───────────────────── */

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

/* ─── FEATURED DISHES ──────────────────────────────────────────── */

export const featuredDishes: FeaturedDish[] = [
  {
    id: 1,
    name: "Ceviche Especial",
    description:
      "Ceviche de pescado fresco del Pacífico con camarón, limón de Chulucanas, cebolla morada y cilantro. Receta tradicional de la costa norte peruana.",
    price: "S/. 35",
    image: "/images/restaurant/foto1.webp",
    category: "Mariscos",
  },
  {
    id: 2,
    name: "Jalea Marina",
    description:
      "Fritura de pescado, camarones, calamar y chita acompañada de yuca sancochada, salsa criolla y ají limo.",
    price: "S/. 45",
    image: "/images/restaurant/foto3.webp",
    category: "Mariscos",
  },
  {
    id: 3,
    name: "Menú Ejecutivo Diario",
    description:
      "Sopa del día, plato principal entre tres opciones, jugo de fruta natural y postre. La mejor opción para recargar energía después del surf.",
    price: "S/. 15",
    image: "/images/restaurant/foto5.webp",
    category: "Ejecutivo",
  },
];

/* ─── FULL MENU ────────────────────────────────────────────────── */

export const fullMenu: Record<string, MenuItem[]> = {
  Entradas: [
    {
      name: "Ceviche de Camarón",
      description:
        "Camarones frescos del puerto marinados en limón con tomate, cebolla y ají limo.",
      price: "S/. 28",
    },
    {
      name: "Ceviche de Pescado",
      description:
        "Pescado fresco del día marinado en limón con cebolla morada, cilantro y camote.",
      price: "S/. 25",
    },
    {
      name: "Salpicón de Mariscos",
      description: "Mezcla de mariscos frescos con limón, cebolla y especias peruanas.",
      price: "S/. 30",
    },
    {
      name: "Tiradito Clásico",
      description: "Pescado en láminas finas con salsa de ají amarillo y leche de tigre.",
      price: "S/. 30",
    },
    {
      name: "Chicharrón de Calamar",
      description: "Aros de calamar dorados acompañados de salsa tartara y limón.",
      price: "S/. 22",
    },
  ],
  "Platos Principales": [
    {
      name: "Jalea Marina",
      description:
        "Fritura de pescado, camarones, calamar y chita con yuca y salsa criolla.",
      price: "S/. 45",
    },
    {
      name: "Ceviche Especial",
      description:
        "Ceviche de pescado y camarón con todos los aderezos de la casa.",
      price: "S/. 35",
    },
    {
      name: "Arroz con Mariscos",
      description: "Arroz cocinado con camarones, calamar, langostino y verduras.",
      price: "S/. 38",
    },
    {
      name: "Pescado Frito Entero",
      description:
        "Pescado frito acompañado de arroz, yuca, ensalada y salsa criolla.",
      price: "S/. 30",
    },
    {
      name: "Sudado de Pescado",
      description:
        "Pescado en salsa de tomate, cebolla, ají amarillo y culantro. Tradición costera.",
      price: "S/. 28",
    },
    {
      name: "Parihuela",
      description:
        "Sopa espesa de mariscos con pescado, camarones, conchas y langostinos.",
      price: "S/. 35",
    },
  ],
  Bebidas: [
    {
      name: "Jugo de Frutas Natural",
      description: "Jugo fresco de frutas de temporada (papaya, maracuyá, piña).",
      price: "S/. 8",
    },
    {
      name: "Cerveza Artesanal",
      description: "Cerveza artesanal peruana — Franca, Pilsen Callao o Cusqueña.",
      price: "S/. 10",
    },
    {
      name: "Agua Mineral",
      description: "Agua natural o con gas San Luis.",
      price: "S/. 5",
    },
    {
      name: "Pisco Sour",
      description:
        "El cóctil bandera del Perú. Pisco quebranta, limón, jarabe de goma y clara de huevo.",
      price: "S/. 18",
    },
    {
      name: "Chicha de Jora",
      description: "Bebida ancestral andina de maíz fermentado. Tradición peruana.",
      price: "S/. 8",
    },
  ],
  Postres: [
    {
      name: "Tres Leches",
      description: "Bizcocho bañado en leche evaporada, condensada y crema.",
      price: "S/. 15",
    },
    {
      name: "Suspiro a la Limeña",
      description: "Merengue sobre manjarblanco y canela. Clásico peruano.",
      price: "S/. 15",
    },
    {
      name: "Picarones",
      description: "Rosquitas de masa de camote y zapallo bañadas en miel de chancaca.",
      price: "S/. 12",
    },
    {
      name: "Fruta de Temporada",
      description: "Frutas frescas de la región norte: mango, chirimoya, lúcuma.",
      price: "S/. 10",
    },
  ],
};

/* ─── TESTIMONIALS ─────────────────────────────────────────────── */

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

/* ─── EXPERIENCES ──────────────────────────────────────────────── */

export const experiences: Experience[] = [
  {
    title: "Surf en Puerto Chicama",
    description:
      "Clases de surf en la ola izquierda más larga del mundo (2.2 km). Instructores locales experimentados, todo el año. Todas las niveles.",
    image:
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
    tag: "Todo el año",
  },
  {
    title: "Tours Culinarios Marinos",
    description:
      "Descubre los sabores de la costa norte peruana. Tour por mercados de pescadores, clase de ceviche y degustación de platos típicos.",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
    tag: "Gastronómico",
  },
  {
    title: "Sunset en Malecón",
    description:
      "Paseo al atardecer por el malecón de Puerto Chicama con vista a las olas y la cordillera. Foto profesional incluida.",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
    tag: "Experiencia",
  },
  {
    title: "Avistamiento de Fauna",
    description:
      "Excursión a los humedales y ecosistemas costeros de La Libertad. Flamencos, pelícanos y lobos marinos en su hábitat natural.",
    image:
      "https://images.unsplash.com/photo-1568430462989-44163eb1752f?w=800&q=80",
    tag: "Naturaleza",
  },
];

/* ─── ROOMS (Booking.com verified — official room types & prices) ── */

export const rooms: Room[] = [
  {
    name: "Habitación Individual con vistas al mar",
    slug: "individual-vistas-al-mar",
    description: "Habitación individual con 1 cama individual, baño compartido equipado con bañera, ducha y WC. Incluye WiFi gratis, desayuno excepcional, toallas y papel higiénico. Ideal para viajeros en solitario con vistas al mar.",
    price: "S/. 68",
    image: "/images/rooms/individual-vistas-al-mar/foto1.webp",
    badge: "Económica",
    features: ["1 Cama Individual", "Baño Compartido", "Bañera", "Ducha", "WiFi Gratis", "Desayuno Incluido", "Vistas al Mar"],
    gallery: [
      "/images/rooms/individual-vistas-al-mar/foto1.webp",
      "/images/rooms/individual-vistas-al-mar/foto2.webp",
      "/images/rooms/individual-vistas-al-mar/foto3.webp",
      "/images/rooms/individual-vistas-al-mar/foto4.webp",
    ],
  },
  {
    name: "Habitación Doble - 2 camas",
    slug: "doble-2-camas",
    description: "Dos camas individuales, baño compartido con bañera, ducha y WC. Incluye WiFi gratis, desayuno excepcional, toallas y papel higiénico. Cancelación gratuita y pago en el alojamiento. Capacidad: 1 persona.",
    price: "S/. 72",
    image: "/images/rooms/doble-2-camas/foto1.webp",
    badge: "Económica",
    features: ["2 Camas Individuales", "Baño Compartido", "Bañera", "Ducha", "WiFi Gratis", "Desayuno Incluido"],
    gallery: [
      "/images/rooms/doble-2-camas/foto1.webp",
      "/images/rooms/doble-2-camas/foto2.webp",
      "/images/rooms/doble-2-camas/foto3.webp",
      "/images/rooms/doble-2-camas/foto4.webp",
    ],
  },
  {
    name: "Habitación Deluxe - 1 cama grande",
    slug: "deluxe-1-cama-grande",
    description: "1 cama doble grande, baño compartido con bañera, ducha y WC. Incluye WiFi gratis, desayuno excepcional, toallas y papel higiénico. Cancelación gratuita y pago en el alojamiento. Capacidad: 1 persona.",
    price: "S/. 84",
    image: "/images/rooms/deluxe-1-cama-grande/foto1.webp",
    badge: "Popular",
    features: ["1 Cama Doble Grande", "Baño Compartido", "Bañera", "Ducha", "WiFi Gratis", "Desayuno Incluido"],
    gallery: [
      "/images/rooms/deluxe-1-cama-grande/foto1.webp",
      "/images/rooms/deluxe-1-cama-grande/foto2.webp",
      "/images/rooms/deluxe-1-cama-grande/foto3.webp",
      "/images/rooms/deluxe-1-cama-grande/foto4.webp",
    ],
  },
  {
    name: "Habitación con cama grande y vistas al mar",
    slug: "cama-grande-vistas-al-mar",
    description: "1 cama doble grande, baño privado con bañera, ducha y WC. Incluye WiFi gratis, desayuno excepcional, toallas y papel higiénico. Cancelación gratuita y pago en el alojamiento. Las mejores vistas al mar de Puerto Chicama.",
    price: "S/. 103",
    image: "/images/rooms/cama-grande-vistas-al-mar/foto1.webp",
    badge: "Vista al Mar",
    features: ["1 Cama Doble Grande", "Baño Privado", "Bañera", "Ducha", "WiFi Gratis", "Desayuno Incluido", "Vistas al Mar"],
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
  {
    name: "Habitación Deluxe - 1 cama grande (Baño Privado)",
    slug: "deluxe-1-cama-grande-bano-privado",
    description: "1 cama doble grande, baño privado con bañera, ducha y WC. Incluye WiFi gratis, desayuno excepcional, toallas y papel higiénico. Cancelación gratuita y pago en el alojamiento. Capacidad: 1 persona.",
    price: "S/. 103",
    image: "/images/rooms/deluxe-1-cama-grande/foto1.webp",
    badge: "Baño Privado",
    features: ["1 Cama Doble Grande", "Baño Privado", "Bañera", "Ducha", "WiFi Gratis", "Desayuno Incluido"],
    gallery: [
      "/images/rooms/deluxe-1-cama-grande/foto2.webp",
      "/images/rooms/deluxe-1-cama-grande/foto3.webp",
      "/images/rooms/deluxe-1-cama-grande/foto4.webp",
      "/images/rooms/deluxe-1-cama-grande/foto1.webp",
    ],
  },
  {
    name: "Habitación Deluxe",
    slug: "deluxe-extragrande",
    description: "1 cama doble extragrande, baño compartido con bañera, ducha y WC. Incluye WiFi gratis, desayuno excepcional, toallas y papel higiénico. Cancelación gratuita y pago en el alojamiento. Máximo espacio y confort.",
    price: "S/. 120",
    image: "/images/rooms/deluxe-1-cama-grande/foto1.webp",
    badge: "Premium",
    features: ["1 Cama Doble Extragrande", "Baño Compartido", "Bañera", "Ducha", "WiFi Gratis", "Desayuno Incluido"],
    gallery: [
      "/images/rooms/deluxe-1-cama-grande/foto1.webp",
      "/images/rooms/deluxe-1-cama-grande/foto2.webp",
      "/images/rooms/deluxe-1-cama-grande/foto3.webp",
      "/images/rooms/deluxe-1-cama-grande/foto4.webp",
    ],
  },
  {
    name: "Habitación Triple Básica con baño compartido",
    slug: "triple-basica-bano-compartido",
    description: "3 camas individuales, baño compartido con bañera, ducha y WC. Incluye WiFi gratis, desayuno excepcional y papel higiénico. Cancelación gratuita y pago en el alojamiento. Perfecta para grupos pequeños.",
    price: "S/. 151",
    image: "/images/rooms/triple-basica-bano-compartido/foto1.webp",
    badge: "Grupo",
    features: ["3 Camas Individuales", "Baño Compartido", "Bañera", "Ducha", "WiFi Gratis", "Desayuno Incluido"],
    gallery: [
      "/images/rooms/triple-basica-bano-compartido/foto1.webp",
      "/images/rooms/triple-basica-bano-compartido/foto2.webp",
      "/images/rooms/triple-basica-bano-compartido/foto3.webp",
      "/images/rooms/triple-basica-bano-compartido/foto4.webp",
      "/images/rooms/triple-basica-bano-compartido/foto5.webp",
      "/images/rooms/triple-basica-bano-compartido/foto6.webp",
    ],
  },
  {
    name: "Habitación Doble - 2 camas (2 personas)",
    slug: "doble-2-camas-2-personas",
    description: "Dos camas individuales, baño compartido con bañera, ducha y WC. Incluye WiFi gratis, desayuno excepcional y papel higiénico. Cancelación gratuita, pago en el alojamiento. Descuento Genius disponible. Capacidad: hasta 2 personas.",
    price: "S/. 103",
    image: "/images/rooms/doble-2-camas/foto1.webp",
    badge: "Genius",
    features: ["2 Camas Individuales", "Baño Compartido", "Bañera", "Ducha", "WiFi Gratis", "Desayuno Incluido", "Genius"],
    gallery: [
      "/images/rooms/doble-2-camas/foto2.webp",
      "/images/rooms/doble-2-camas/foto3.webp",
      "/images/rooms/doble-2-camas/foto1.webp",
    ],
  },
  {
    name: "Habitación Doble con aseo compartido - 2 camas",
    slug: "doble-aseo-compartido-2-camas",
    description: "Dos camas individuales, baño compartido con bañera, ducha y WC. Incluye WiFi gratis, desayuno excepcional y papel higiénico. Cancelación gratuita y pago en el alojamiento. Capacidad: hasta 2 personas.",
    price: "S/. 120",
    image: "/images/rooms/doble-aseo-compartido-2-camas/foto1.webp",
    badge: "Económica",
    features: ["2 Camas Individuales", "Baño Compartido", "Bañera", "Ducha", "WiFi Gratis", "Desayuno Incluido"],
    gallery: [
      "/images/rooms/doble-aseo-compartido-2-camas/foto1.webp",
      "/images/rooms/doble-aseo-compartido-2-camas/foto2.webp",
      "/images/rooms/doble-aseo-compartido-2-camas/foto3.webp",
      "/images/rooms/doble-aseo-compartido-2-camas/foto4.webp",
      "/images/rooms/doble-aseo-compartido-2-camas/foto5.webp",
    ],
  },
  {
    name: "Habitación Doble - 2 camas dobles",
    slug: "doble-2-camas-dobles",
    description: "Dos camas individuales, baño compartido con bañera, ducha y WC. Incluye WiFi gratis, desayuno excepcional, toallas y papel higiénico. Cancelación gratuita y pago en el alojamiento. Capacidad: hasta 2 personas.",
    price: "S/. 120",
    image: "/images/rooms/doble-2-camas/foto2.webp",
    badge: "Económica",
    features: ["2 Camas Individuales", "Baño Compartido", "Bañera", "Ducha", "WiFi Gratis", "Desayuno Incluido"],
    gallery: [
      "/images/rooms/doble-2-camas/foto1.webp",
      "/images/rooms/doble-2-camas/foto2.webp",
      "/images/rooms/doble-2-camas/foto3.webp",
      "/images/rooms/doble-2-camas/foto4.webp",
    ],
  },
];
