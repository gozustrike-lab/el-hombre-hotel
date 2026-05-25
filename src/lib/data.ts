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

export interface Room {
  name: string;
  description: string;
  price: string;
  image: string;
  features: string[];
}

export const HOTEL_LOCATION = {
  city: "Puerto Chicama",
  province: "La Libertad",
  country: "Perú",
  address: "Calle Arica 803, Puerto Malabrigo (Puerto Chicama), La Libertad, Perú",
  phone: "+51 949 090 421",
  whatsapp: "51949090421",
  email: "info@elhombreperu.com",
};

export const featuredDishes: FeaturedDish[] = [
  {
    id: 1,
    name: "Ceviche Especial",
    description:
      "Ceviche de pescado fresco del Pacífico con camarón, limón de Chulucanas, cebolla morada y cilantro. Receta tradicional de la costa norte peruana.",
    price: "S/. 35",
    image:
      "https://images.unsplash.com/photo-1535399831218-d5bd36d1a6b3?w=400&q=80",
    category: "Mariscos",
  },
  {
    id: 2,
    name: "Jalea Marina",
    description:
      "Fritura de pescado, camarones, calamar y chita acompañada de yuca sancochada, salsa criolla y ají limo.",
    price: "S/. 45",
    image:
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&q=80",
    category: "Mariscos",
  },
  {
    id: 3,
    name: "Menú Ejecutivo Diario",
    description:
      "Sopa del día, plato principal entre tres opciones, jugo de fruta natural y postre. La mejor opción para recargar energía después del surf.",
    price: "S/. 15",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80",
    category: "Ejecutivo",
  },
];

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
        "El cóctel bandera del Perú. Pisco quebranta, limón, jarabe de goma y clara de huevo.",
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

export const testimonials: Testimonial[] = [
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
  {
    id: 6,
    name: "Mateo Ruiz",
    location: "Trujillo, Perú",
    avatar: "MR",
    rating: 4,
    text: "Muy buena relación calidad-precio. La ubicación es insuperable para los surfistas y el restaurante sorprende con platos de altura. Recomendado.",
    platform: "TripAdvisor",
  },
];

export const experiences: Experience[] = [
  {
    title: "Surf en Puerto Chicama",
    description:
      "Clases de surf en la ola izquierda más larga del mundo (2.2 km). Instructores locales experimentados, todo el año. Todas las niveles.",
    image:
      "https://images.unsplash.com/photo-1502680390548-bdbac40a5751?w=800&q=80",
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

export const rooms: Room[] = [
  {
    name: "Habitación Simple",
    description:
      "Habitación cómoda con cama individual, baño privado, agua caliente, ventilador y WiFi gratis. Ideal para viajeros en solitario.",
    price: "S/. 80",
    image:
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=600&q=80",
    features: ["WiFi", "Agua Caliente", "TV", "Baño Privado"],
  },
  {
    name: "Habitación Doble Surf Premium",
    description:
      "Habitación amplia con cama doble o twin, vista al mar, balcón privado con hamaca, minibar y amenities premium. La mejor opción para surfistas.",
    price: "S/. 140",
    image:
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&q=80",
    features: ["Vista al Mar", "Balcón + Hamaca", "Minibar", "A/C"],
  },
];
