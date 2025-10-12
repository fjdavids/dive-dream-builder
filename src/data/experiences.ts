export interface ExperienceFAQ {
  q: string;
  a: string;
}

export interface Experience {
  id: string;
  slug: string;
  title: {
    en: string;
    es: string;
  };
  shortDesc: {
    en: string;
    es: string;
  };
  duration: string;
  level: {
    en: string;
    es: string;
  };
  minAge: string;
  price: string;
  image: string;
  category: 'snorkeling' | 'diving' | 'sailing' | 'pool' | 'trips';
  meetingPoint: {
    en: string;
    es: string;
  };
  sections: {
    overview: { en: string; es: string };
    itinerary: { en: string; es: string };
    includes: { en: string; es: string };
    bring: { en: string; es: string };
    requirements: { en: string; es: string };
    meeting: { en: string; es: string };
    cancellation: { en: string; es: string };
    faqs: { en: ExperienceFAQ[]; es: ExperienceFAQ[] };
  };
}

export const experiences: Experience[] = [
  {
    id: '1',
    slug: 'snorkeling-local-reef',
    title: {
      en: 'Snorkeling – Local Reef (Motorboat)',
      es: 'Snorkel – Arrecife Local (Lancha)',
    },
    shortDesc: {
      en: 'Family-friendly guided reef & "ojo de agua" stops. Certified guide, gear included.',
      es: 'Tour familiar guiado por arrecife y "ojo de agua". Guía certificado, equipo incluido.',
    },
    duration: '1 hour',
    level: { en: 'All levels', es: 'Todos los niveles' },
    minAge: '6 years',
    price: '1,800',
    image: '/placeholder.svg',
    category: 'snorkeling',
    meetingPoint: {
      en: 'Etereo Kanai or Grand Velas beach area',
      es: 'Área de playa Etereo Kanai o Grand Velas',
    },
    sections: {
      overview: {
        en: 'Experience the vibrant marine life of the Riviera Maya with our guided snorkeling tour. Perfect for families and beginners, this motorboat excursion takes you to pristine local reefs and a unique "ojo de agua" (freshwater spring). Our certified guides ensure a safe, educational, and unforgettable adventure.',
        es: 'Experimenta la vibrante vida marina de la Riviera Maya con nuestro tour guiado de snorkel. Perfecto para familias y principiantes, esta excursión en lancha te lleva a arrecifes locales prístinos y un único "ojo de agua". Nuestros guías certificados garantizan una aventura segura, educativa e inolvidable.',
      },
      itinerary: {
        en: '• Meet at beach area (15 min before)\n• Safety briefing & equipment fitting (15 min)\n• Motorboat ride to reef (10 min)\n• First snorkel stop - Local reef (45 min)\n• Second stop - Ojo de agua freshwater spring (30 min)\n• Return to shore',
        es: '• Encuentro en área de playa (15 min antes)\n• Briefing de seguridad y ajuste de equipo (15 min)\n• Viaje en lancha al arrecife (10 min)\n• Primera parada snorkel - Arrecife local (45 min)\n• Segunda parada - Ojo de agua (30 min)\n• Regreso a la orilla',
      },
      includes: {
        en: '• Certified bilingual guide\n• All snorkel equipment (mask, snorkel, fins, vest)\n• Motorboat transport\n• Biodegradable sunscreen\n• Bottled water',
        es: '• Guía certificado bilingüe\n• Todo el equipo de snorkel (máscara, snorkel, aletas, chaleco)\n• Transporte en lancha\n• Bloqueador biodegradable\n• Agua embotellada',
      },
      bring: {
        en: '• Swimsuit (wear under clothes)\n• Towel\n• Waterproof camera (optional)\n• Cash for tips',
        es: '• Traje de baño (usar debajo de la ropa)\n• Toalla\n• Cámara acuática (opcional)\n• Efectivo para propinas',
      },
      requirements: {
        en: '• Minimum age: 6 years\n• Must know how to swim\n• Not recommended for pregnant women\n• No serious medical conditions (asthma, heart problems)\n• Maximum weight: 120 kg',
        es: '• Edad mínima: 6 años\n• Debe saber nadar\n• No recomendado para mujeres embarazadas\n• Sin condiciones médicas graves (asma, problemas cardíacos)\n• Peso máximo: 120 kg',
      },
      meeting: {
        en: 'Kanai residents: Meet at Etereo Kanai beach activities area.\nGrand Velas guests: Meet at main beach palapa.\nExternal guests: Pick-up available in Playa del Carmen (availability on request).',
        es: 'Residentes Kanai: Encuentro en área de actividades de playa Etereo Kanai.\nHuéspedes Grand Velas: Encuentro en palapa principal de playa.\nHuéspedes externos: Pick-up disponible en Playa del Carmen (sujeto a disponibilidad).',
      },
      cancellation: {
        en: 'Free cancellation up to 24 hours before. Weather cancellations receive full refund or reschedule.',
        es: 'Cancelación gratuita hasta 24 horas antes. Cancelaciones por clima reciben reembolso completo o reprogramación.',
      },
      faqs: {
        en: [
          { q: 'What if I\'ve never snorkeled before?', a: 'Our guides provide complete instruction and stay with you throughout the tour.' },
          { q: 'Can children participate?', a: 'Yes! Minimum age is 6 years with adult supervision.' },
          { q: 'What about prescription glasses?', a: 'We have prescription masks available upon request.' },
        ],
        es: [
          { q: '¿Qué pasa si nunca he hecho snorkel?', a: 'Nuestros guías proporcionan instrucción completa y permanecen contigo durante todo el tour.' },
          { q: '¿Pueden participar niños?', a: '¡Sí! La edad mínima es 6 años con supervisión de un adulto.' },
          { q: '¿Qué hay de los lentes con prescripción?', a: 'Tenemos máscaras con prescripción disponibles bajo solicitud.' },
        ],
      },
    },
  },
  // Add default sections for remaining experiences
  {
    id: '2',
    slug: 'discover-scuba-diving',
    title: {
      en: 'Discover Scuba Diving (DSD)',
      es: 'Descubre el Buceo (DSD)',
    },
    shortDesc: {
      en: 'Pool skills + 1 guided ocean dive up to 12m. PADI instructor supervision.',
      es: 'Habilidades en piscina + 1 inmersión guiada hasta 12m. Supervisión de instructor PADI.',
    },
    duration: '3-4 hours',
    level: { en: 'Beginner', es: 'Principiante' },
    minAge: '10 years',
    price: '5,000',
    image: '/placeholder.svg',
    category: 'diving',
    meetingPoint: { en: 'Pool area, then beach', es: 'Área de piscina, luego playa' },
    sections: {
      overview: { en: 'To be confirmed', es: 'Por confirmar' },
      itinerary: { en: 'To be confirmed', es: 'Por confirmar' },
      includes: { en: 'All equipment included', es: 'Todo el equipo incluido' },
      bring: { en: 'Swimsuit, towel', es: 'Traje de baño, toalla' },
      requirements: { en: 'Min age 10 years', es: 'Edad mínima 10 años' },
      meeting: { en: 'Pool area', es: 'Área de piscina' },
      cancellation: { en: 'Free cancellation 24h before', es: 'Cancelación gratuita 24h antes' },
      faqs: { en: [], es: [] },
    },
  },
  {
    id: '3',
    slug: 'hobie-cat-sailing-cruise',
    title: {
      en: 'Hobie Cat Sailing – Cruise',
      es: 'Navegación en Hobie Cat – Paseo',
    },
    shortDesc: {
      en: 'Silent wind-powered coastal ride. Relaxing, scenic ocean experience.',
      es: 'Paseo costero silencioso impulsado por viento. Experiencia oceánica relajante.',
    },
    duration: '1 hour',
    level: { en: 'All levels', es: 'Todos los niveles' },
    minAge: '8 years',
    price: '4,300',
    image: '/placeholder.svg',
    category: 'sailing',
    meetingPoint: { en: 'Beach area', es: 'Área de playa' },
    sections: {
      overview: { en: 'To be confirmed', es: 'Por confirmar' },
      itinerary: { en: 'To be confirmed', es: 'Por confirmar' },
      includes: { en: 'Hobie Cat, safety equipment', es: 'Hobie Cat, equipo de seguridad' },
      bring: { en: 'Swimsuit, sunscreen', es: 'Traje de baño, bloqueador' },
      requirements: { en: 'Min age 8 years', es: 'Edad mínima 8 años' },
      meeting: { en: 'Beach area', es: 'Área de playa' },
      cancellation: { en: 'Free cancellation 24h before', es: 'Cancelación gratuita 24h antes' },
      faqs: { en: [], es: [] },
    },
  },
  {
    id: '4',
    slug: 'cenote-dive',
    title: {
      en: 'Cenote Dive (Certified)',
      es: 'Buceo en Cenote (Certificados)',
    },
    shortDesc: {
      en: 'Two guided cavern dives. Transport & entrance included. Min PADI Open Water.',
      es: 'Dos inmersiones guiadas en caverna. Transporte y entrada incluidos. Mín PADI Open Water.',
    },
    duration: '5-6 hours',
    level: { en: 'Certified divers', es: 'Buzos certificados' },
    minAge: '12 years',
    price: '13,000',
    image: '/placeholder.svg',
    category: 'diving',
    meetingPoint: { en: 'Hotel lobby pickup', es: 'Recogida en lobby del hotel' },
    sections: {
      overview: { en: 'To be confirmed', es: 'Por confirmar' },
      itinerary: { en: 'To be confirmed', es: 'Por confirmar' },
      includes: { en: 'Transport, equipment, entrance fees', es: 'Transporte, equipo, entradas' },
      bring: { en: 'Certification card, swimsuit', es: 'Tarjeta de certificación, traje de baño' },
      requirements: { en: 'PADI Open Water or equivalent', es: 'PADI Open Water o equivalente' },
      meeting: { en: 'Hotel pickup', es: 'Recogida en hotel' },
      cancellation: { en: 'Free cancellation 24h before', es: 'Cancelación gratuita 24h antes' },
      faqs: { en: [], es: [] },
    },
  },
  {
    id: '5',
    slug: 'pool-seabob',
    title: {
      en: 'Pool – Underwater Scooter',
      es: 'Piscina – Scooter Submarino',
    },
    shortDesc: {
      en: 'Fun propulsion session in pool or confined waters. No certification required.',
      es: 'Sesión de propulsión divertida en piscina. No requiere certificación.',
    },
    duration: '30 minutes',
    level: { en: 'All levels', es: 'Todos los niveles' },
    minAge: '8 years',
    price: '700',
    image: '/placeholder.svg',
    category: 'pool',
    meetingPoint: { en: 'Pool area', es: 'Área de piscina' },
    sections: {
      overview: { en: 'To be confirmed', es: 'Por confirmar' },
      itinerary: { en: 'To be confirmed', es: 'Por confirmar' },
      includes: { en: 'UW/Scooter equipment, instruction', es: 'Scooter subacuático, instrucción' },
      bring: { en: 'Swimsuit', es: 'Traje de baño' },
      requirements: { en: 'Min age 7 years', es: 'Edad mínima 7 años' },
      meeting: { en: 'Pool area', es: 'Área de piscina' },
      cancellation: { en: 'Free cancellation 24h before', es: 'Cancelación gratuita 24h antes' },
      faqs: { en: [], es: [] },
    },
  },
  {
    id: '6',
    slug: 'luxury-yacht-rental',
    title: {
      en: 'Luxury Yacht Rental',
      es: 'Renta de Yate de Lujo',
    },
    shortDesc: {
      en: 'Half-day/full-day private charters. Snorkel stops, premium service, custom catering.',
      es: 'Charters privados medio día/día completo. Paradas snorkel, servicio premium, catering personalizado.',
    },
    duration: '4-8 hours',
    level: { en: 'All levels', es: 'Todos los niveles' },
    minAge: 'All ages',
    price: 'Ask for info',
    image: '/placeholder.svg',
    category: 'trips',
    meetingPoint: { en: 'Marina pickup', es: 'Recogida en marina' },
    sections: {
      overview: { en: 'To be confirmed', es: 'Por confirmar' },
      itinerary: { en: 'To be confirmed', es: 'Por confirmar' },
      includes: { en: 'Yacht, crew, snorkel equipment', es: 'Yate, tripulación, equipo de snorkel' },
      bring: { en: 'Swimsuit, sunscreen, camera', es: 'Traje de baño, bloqueador, cámara' },
      requirements: { en: 'All ages welcome', es: 'Todas las edades bienvenidas' },
      meeting: { en: 'Marina', es: 'Marina' },
      cancellation: { en: 'Free cancellation 48h before', es: 'Cancelación gratuita 48h antes' },
      faqs: { en: [], es: [] },
    },
  },
];
