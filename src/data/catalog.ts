// ============================================================================
// SINGLE SOURCE OF TRUTH — DiveLife experience catalog (22 products)
// Used by: home, /experiences, /experiences/{slug}, /availability, emails.
// Commercial data that is not verified is NOT invented here: it is rendered
// with the approved "confirmed with your quote" placeholders.
// ============================================================================

export type Locale = 'en' | 'es';

export type CategoryId =
  | 'snorkeling'
  | 'diving'
  | 'sailing'
  | 'pool'
  | 'trips';

/** availability = ask for dates; quote = ask for a proposal; complimentary = free session */
export type FlowType = 'availability' | 'quote' | 'complimentary';

export type ExtraField =
  | 'certification'
  | 'snorkelExperience'
  | 'paddleboardExperience'
  | 'jetSkiRiders'
  | 'desiredDuration';

export interface Variant {
  id: string;
  label: { en: string; es: string };
}

export interface CatalogItem {
  /** stable internal id — never translated, never changed */
  id: string;
  slug: string;
  /** old routes/slugs that must redirect to the current slug */
  legacySlugs: string[];
  /** key into src/data/imageMap.ts (existing photography is preserved) */
  imageKey: string;
  name: { en: string; es: string };
  /** first sentence is used on cards; the whole text on the detail page */
  description: { en: string; es: string };
  categories: CategoryId[];
  flow: FlowType;
  variants?: Variant[];
  extraFields?: ExtraField[];
  /** verified, approved note shown on the detail page */
  note?: { en: string; es: string };
  /** only set when a price is commercially verified for the public visitor */
  price?: { amount: string; currency: string; unit: 'person' | 'boat' | 'jetski' | 'session' };
  complimentary?: boolean;
}

export const CATEGORIES: { id: CategoryId | 'all'; label: { en: string; es: string } }[] = [
  { id: 'all', label: { en: 'All Experiences', es: 'Todas las experiencias' } },
  { id: 'snorkeling', label: { en: 'Snorkeling', es: 'Snorkel' } },
  { id: 'diving', label: { en: 'Diving', es: 'Buceo' } },
  { id: 'sailing', label: { en: 'Sailing', es: 'Vela' } },
  { id: 'pool', label: { en: 'Pool Activities', es: 'Actividades en piscina' } },
  { id: 'trips', label: { en: 'Special Trips', es: 'Excursiones y otras actividades' } },
];

export const catalog: CatalogItem[] = [
  {
    id: 'exp-01',
    slug: 'reef-snorkel-adventure',
    legacySlugs: ['reef-snorkel'],
    imageKey: 'reef-snorkel',
    name: { en: 'Reef Snorkel Adventure', es: 'Snorkel en arrecife' },
    description: {
      en: 'Explore the reefs of Playa del Carmen on a guided snorkeling experience. Tell us your preferred date and who is joining so we can confirm the departure details for your group.',
      es: 'Explora los arrecifes de Playa del Carmen en una experiencia guiada de snorkel. Indícanos tu fecha preferida y quiénes participarán para confirmar los detalles de salida de tu grupo.',
    },
    categories: ['snorkeling'],
    flow: 'availability',
  },
  {
    id: 'exp-02',
    slug: 'tres-rios-herradura-snorkel',
    legacySlugs: ['tres-rios-snorkel'],
    imageKey: 'tres-rios-snorkel',
    name: { en: 'Tres Ríos & Herradura Snorkel', es: 'Snorkel Tres Ríos y Herradura' },
    description: {
      en: 'Discover snorkeling locations around Tres Ríos and Herradura. We’ll confirm the route and selected sites according to the conditions for your requested date.',
      es: 'Descubre los sitios de snorkel de la zona de Tres Ríos y Herradura. Confirmaremos el recorrido y los sitios seleccionados según las condiciones de la fecha solicitada.',
    },
    categories: ['snorkeling'],
    flow: 'availability',
  },
  {
    id: 'exp-03',
    slug: 'night-snorkel',
    legacySlugs: [],
    imageKey: 'night-snorkel',
    name: { en: 'Night Snorkel Experience', es: 'Snorkel nocturno' },
    description: {
      en: 'Discover the reef after dark on a guided snorkeling experience. Tell us about your snorkeling experience so we can review whether the activity is suitable for your group.',
      es: 'Descubre el arrecife después del anochecer en una experiencia guiada de snorkel. Cuéntanos tu experiencia haciendo snorkel para revisar si la actividad es adecuada para tu grupo.',
    },
    categories: ['snorkeling'],
    flow: 'availability',
    extraFields: ['snorkelExperience'],
  },
  {
    id: 'exp-04',
    slug: 'discover-scuba-diving',
    legacySlugs: ['discover-scuba'],
    imageKey: 'discover-scuba',
    name: { en: 'Discover Scuba Diving', es: 'Descubre el buceo' },
    description: {
      en: 'Take your first steps in scuba diving with a PADI instructor. This introductory experience combines preparation and supervised practice before the planned ocean dive. It is not a certification course.',
      es: 'Da tus primeros pasos en el buceo con un instructor PADI. Esta experiencia introductoria combina preparación y práctica supervisada antes del buceo en el mar previsto. No es un curso de certificación.',
    },
    categories: ['diving'],
    flow: 'availability',
  },
  {
    id: 'exp-05',
    slug: 'certified-local-diving',
    legacySlugs: ['local-dive'],
    imageKey: 'local-dive',
    name: { en: 'Local Diving for Certified Divers', es: 'Buceo local para certificados' },
    description: {
      en: 'Explore the reefs of Playa del Carmen on guided boat dives. Share your certification and recent diving experience so we can confirm a suitable plan.',
      es: 'Explora los arrecifes de Playa del Carmen en buceos guiados desde embarcación. Comparte tu certificación y experiencia reciente para confirmar un plan adecuado.',
    },
    categories: ['diving'],
    flow: 'availability',
    variants: [
      { id: 'one-tank', label: { en: 'One-tank dive', es: 'Buceo de un tanque' } },
      { id: 'two-tank', label: { en: 'Two-tank dive', es: 'Buceo de dos tanques' } },
    ],
    extraFields: ['certification'],
  },
  {
    id: 'exp-06',
    slug: 'padi-scuba-diver',
    legacySlugs: [],
    imageKey: 'padi-scuba-diver',
    name: { en: 'PADI Scuba Diver Course', es: 'Curso PADI Scuba Diver' },
    description: {
      en: 'Begin your certification training with the PADI Scuba Diver course. This certification is designed for diving under professional supervision. Ask about completing the additional training for Open Water Diver.',
      es: 'Inicia tu formación con el curso PADI Scuba Diver. Esta certificación está orientada al buceo bajo supervisión profesional. Consulta cómo completar la formación adicional para Open Water Diver.',
    },
    categories: ['diving'],
    flow: 'availability',
  },
  {
    id: 'exp-07',
    slug: 'padi-open-water-diver',
    legacySlugs: ['padi-open-water'],
    imageKey: 'padi-open-water',
    name: { en: 'PADI Open Water Diver Course', es: 'Curso PADI Open Water Diver' },
    description: {
      en: 'Work toward your PADI Open Water Diver certification through knowledge development, confined-water practice and open-water training. We’ll coordinate the schedule and explain the requirements for each participant before enrollment.',
      es: 'Fórmate para obtener tu certificación PADI Open Water Diver mediante teoría, práctica en aguas confinadas y formación en aguas abiertas. Coordinaremos el calendario y explicaremos los requisitos de cada participante antes de la inscripción.',
    },
    categories: ['diving'],
    flow: 'availability',
  },
  {
    id: 'exp-08',
    slug: 'scuba-kids',
    legacySlugs: [],
    imageKey: 'scuba-kids',
    name: { en: 'Scuba Kids', es: 'Scuba Kids' },
    description: {
      en: 'Ask about a pool-based introduction to the underwater world for children. Tell us each child’s age and comfort in the water so our team can identify the appropriate activity and participation requirements.',
      es: 'Consulta las actividades de introducción al mundo subacuático en piscina para niños. Indícanos la edad de cada menor y su comodidad en el agua para identificar la actividad adecuada y sus requisitos.',
    },
    categories: ['pool'],
    flow: 'quote',
  },
  {
    id: 'exp-09',
    slug: 'free-pool-scuba-demo',
    legacySlugs: ['pool-demo'],
    imageKey: 'pool-demo',
    name: {
      en: 'Complimentary Pool Scuba Demo',
      es: 'Demostración gratuita de buceo en piscina',
    },
    description: {
      en: 'Try breathing with scuba equipment during a brief supervised pool introduction. Send us your accommodation and preferred date to check access and scheduling.',
      es: 'Prueba la respiración con equipo de buceo durante una breve introducción supervisada en piscina. Indícanos tu alojamiento y fecha preferida para consultar acceso y horario.',
    },
    categories: ['pool'],
    flow: 'complimentary',
    complimentary: true,
    note: {
      en: 'Request a time. Our team will confirm access, participation requirements and the schedule. No payment is required.',
      es: 'Solicita un horario. Nuestro equipo confirmará el acceso, los requisitos de participación y la programación. No se requiere pago.',
    },
  },
  {
    id: 'exp-10',
    slug: 'hobie-cat-sailing',
    legacySlugs: ['hobie-sailing'],
    imageKey: 'hobie-sailing',
    name: { en: 'Hobie Cat Sailing', es: 'Paseo en velero Hobie Cat' },
    description: {
      en: 'Enjoy a sailing experience along the Riviera Maya coast. Share your date and group size so we can confirm the duration, departure location and conditions.',
      es: 'Disfruta una experiencia de navegación a vela por la costa de la Riviera Maya. Comparte tu fecha y tamaño del grupo para confirmar duración, punto de salida y condiciones.',
    },
    categories: ['sailing'],
    flow: 'availability',
  },
  {
    id: 'exp-11',
    slug: 'hobie-cat-sailing-snorkel',
    legacySlugs: ['hobie-sailing-snorkel'],
    imageKey: 'hobie-sailing-snorkel',
    name: { en: 'Hobie Cat Sailing & Snorkel', es: 'Velero Hobie Cat y snorkel' },
    description: {
      en: 'Combine coastal sailing with a guided snorkeling stop. The route and the operation of both activities will be confirmed according to sea and wind conditions.',
      es: 'Combina navegación costera a vela con una parada de snorkel guiado. El recorrido y la realización de ambas actividades se confirmarán según las condiciones del mar y el viento.',
    },
    categories: ['sailing', 'snorkeling'],
    flow: 'availability',
  },
  {
    id: 'exp-12',
    slug: 'sailing-lessons',
    legacySlugs: [],
    imageKey: 'sailing-lessons',
    name: { en: 'Sailing Lessons', es: 'Clases de vela' },
    description: {
      en: 'Learn sailing fundamentals through practical instruction. Tell us your experience and the number of participants so we can propose the appropriate lesson format.',
      es: 'Aprende los fundamentos de la navegación a vela mediante instrucción práctica. Cuéntanos tu experiencia y el número de participantes para proponer el formato de clase adecuado.',
    },
    categories: ['sailing'],
    flow: 'availability',
  },
  {
    id: 'exp-13',
    slug: 'private-catamaran',
    legacySlugs: ['luxury-catamaran'],
    imageKey: 'luxury-catamaran',
    name: { en: 'Private Catamaran Experience', es: 'Experiencia privada en catamarán' },
    description: {
      en: 'Plan a private catamaran outing for your group. Request a quote with your preferred date, number of guests and desired duration. Vessel capacity and included services will be specified in the proposal.',
      es: 'Planea una salida privada en catamarán para tu grupo. Solicita una cotización con fecha preferida, número de personas y duración deseada. La propuesta especificará la capacidad de la embarcación y los servicios incluidos.',
    },
    categories: ['sailing'],
    flow: 'quote',
    extraFields: ['desiredDuration'],
  },
  {
    id: 'exp-14',
    slug: 'jet-ski',
    legacySlugs: ['jetski-tour', 'jetski-30'],
    imageKey: 'jetski-tour',
    name: { en: 'Jet Ski Experience', es: 'Experiencia en moto acuática' },
    description: {
      en: 'Enjoy a supervised jet ski experience on the Caribbean coast. Tell us how many people would like to drive or ride as passengers so we can confirm the available arrangement and requirements.',
      es: 'Disfruta una experiencia supervisada en moto acuática en la costa del Caribe. Indícanos cuántas personas desean conducir o viajar como acompañantes para confirmar la modalidad y los requisitos.',
    },
    categories: ['trips'],
    flow: 'availability',
    extraFields: ['jetSkiRiders'],
  },
  {
    id: 'exp-15',
    slug: 'seabob',
    legacySlugs: ['seabob-session'],
    imageKey: 'seabob-session',
    name: { en: 'Seabob Experience', es: 'Experiencia Seabob' },
    description: {
      en: 'Discover underwater movement with a Seabob and supervision. Request your preferred date so we can confirm the location, session duration and participation requirements.',
      es: 'Descubre el movimiento subacuático con Seabob y supervisión. Solicita tu fecha preferida para confirmar ubicación, duración de la sesión y requisitos de participación.',
    },
    categories: ['trips', 'pool'],
    flow: 'availability',
  },
  {
    id: 'exp-16',
    slug: 'surface-supplied-diving',
    legacySlugs: ['surface-supply'],
    imageKey: 'surface-supply',
    name: {
      en: 'Surface-Supplied Diving',
      es: 'Buceo con suministro de aire desde superficie',
    },
    description: {
      en: 'Ask about a guided underwater experience using air supplied from the surface. Our team will confirm whether this activity is available and explain the equipment, location and participation requirements.',
      es: 'Consulta una experiencia subacuática guiada con aire suministrado desde la superficie. Nuestro equipo confirmará si la actividad está disponible y explicará el equipo, la ubicación y los requisitos.',
    },
    categories: ['diving', 'pool'],
    flow: 'availability',
  },
  {
    id: 'exp-17',
    slug: 'cenote-diving',
    legacySlugs: ['cenote-dive'],
    imageKey: 'cenote-dive',
    name: { en: 'Cenote Diving for Certified Divers', es: 'Buceo en cenotes para certificados' },
    description: {
      en: 'Explore the freshwater environments of the Riviera Maya on a guided cenote diving experience. Share your certification and recent diving history so our team can assess suitable sites and the requirements for the proposed route.',
      es: 'Explora los entornos de agua dulce de la Riviera Maya en una experiencia guiada de buceo en cenotes. Comparte tu certificación y experiencia reciente para evaluar los sitios adecuados y los requisitos del recorrido propuesto.',
    },
    categories: ['diving', 'trips'],
    flow: 'availability',
    extraFields: ['certification'],
    note: {
      en: 'Cavern and cave diving have different requirements. An Open Water certification alone does not qualify a diver for cave diving.',
      es: 'El buceo en caverna y el buceo en cueva tienen requisitos distintos. Una certificación Open Water por sí sola no habilita para bucear en cuevas.',
    },
  },
  {
    id: 'exp-18',
    slug: 'cozumel-diving',
    legacySlugs: ['cozumel-dive'],
    imageKey: 'cozumel-dive',
    name: { en: 'Cozumel Diving Excursion', es: 'Excursión de buceo en Cozumel' },
    description: {
      en: 'Plan a guided diving day in Cozumel. Send us your certification, recent diving experience and accommodation so we can confirm the diving plan, transport arrangements and total price.',
      es: 'Planea una jornada de buceo guiado en Cozumel. Envíanos tu certificación, experiencia reciente y alojamiento para confirmar el plan de buceo, los traslados y el precio total.',
    },
    categories: ['diving', 'trips'],
    flow: 'quote',
    extraFields: ['certification'],
  },
  {
    id: 'exp-19',
    slug: 'family-cenote-snorkeling',
    legacySlugs: ['cenote-family-snorkel'],
    imageKey: 'cenote-family-snorkel',
    name: { en: 'Family Cenote Snorkeling', es: 'Snorkel familiar en cenote' },
    description: {
      en: 'Discover freshwater snorkeling with your family. Tell us the participants’ ages and your accommodation so we can confirm a suitable location, schedule and access arrangements.',
      es: 'Descubre el snorkel en agua dulce con tu familia. Indícanos las edades de los participantes y tu alojamiento para confirmar un sitio adecuado, horario y condiciones de acceso.',
    },
    categories: ['snorkeling', 'trips'],
    flow: 'availability',
  },
  {
    id: 'exp-20',
    slug: 'manatee-snorkeling',
    legacySlugs: ['manatee-snorkel'],
    imageKey: 'manatee-snorkel',
    name: { en: 'Manatee Habitat Snorkeling', es: 'Snorkel en hábitat de manatíes' },
    description: {
      en: 'Explore a snorkeling environment associated with manatee habitat. Our team will confirm the location and access conditions. Wildlife sightings are not guaranteed.',
      es: 'Explora un entorno de snorkel asociado al hábitat de manatíes. Nuestro equipo confirmará la ubicación y las condiciones de acceso. Los avistamientos de fauna no están garantizados.',
    },
    categories: ['snorkeling', 'trips'],
    flow: 'availability',
  },
  {
    id: 'exp-21',
    slug: 'paddleboard-ojo-de-agua',
    legacySlugs: ['paddleboard-ojo-agua', 'paddleboard-ojo-agua-eaglerays'],
    imageKey: 'paddleboard-ojo-agua',
    name: { en: 'Paddleboard to Ojo de Agua', es: 'Paddleboard a Ojo de Agua' },
    description: {
      en: 'Explore the coast on a guided stand-up paddleboard outing toward Ojo de Agua. The route depends on wind and sea conditions. Eagle ray and other wildlife sightings are not guaranteed.',
      es: 'Explora la costa en una salida guiada de paddleboard hacia Ojo de Agua. El recorrido depende del viento y las condiciones del mar. Los avistamientos de rayas águila y otros animales no están garantizados.',
    },
    categories: ['trips'],
    flow: 'availability',
    extraFields: ['paddleboardExperience'],
  },
  {
    id: 'exp-22',
    slug: 'panga-fishing',
    legacySlugs: ['mexican-panga-fishing'],
    imageKey: 'panga-fishing',
    name: { en: 'Mexican Panga Fishing', es: 'Pesca en panga mexicana' },
    description: {
      en: 'Plan a fishing outing aboard a local panga. Tell us your preferred date, group size and desired duration. The proposal will confirm the fishing format, departure point and included services.',
      es: 'Planea una salida de pesca a bordo de una panga local. Indícanos fecha preferida, tamaño del grupo y duración deseada. La propuesta confirmará la modalidad de pesca, el punto de salida y los servicios incluidos.',
    },
    categories: ['trips'],
    flow: 'quote',
    extraFields: ['desiredDuration'],
  },
];

/** First sentence of the approved description — used on cards and meta descriptions. */
export function firstSentence(text: string): string {
  const match = text.match(/^[^.]*\./);
  return match ? match[0].trim() : text;
}

export function getBySlug(slug: string): CatalogItem | undefined {
  return catalog.find((c) => c.slug === slug);
}

export function getById(id: string): CatalogItem | undefined {
  return catalog.find((c) => c.id === id);
}

export function resolveLegacySlug(slug: string): CatalogItem | undefined {
  return catalog.find((c) => c.legacySlugs.includes(slug));
}

export function itemsByCategory(category: CategoryId | 'all'): CatalogItem[] {
  if (category === 'all') return catalog;
  return catalog.filter((c) => c.categories.includes(category));
}

// ---------------------------------------------------------------------------
// Verified contact data
// ---------------------------------------------------------------------------
export const CONTACT = {
  email: 'info@divelife.mx',
  phoneDisplay: '+52 55 1357 2569',
  phoneTel: '+525513572569',
  whatsappBase: 'https://wa.me/525513572569',
  timezone: 'America/Cancun',
  site: 'https://divelife.mx',
};

export function whatsappForProduct(product: string, locale: Locale): string {
  const text =
    locale === 'es'
      ? `Hola, quisiera consultar disponibilidad para ${product}.`
      : `Hello, I’d like to check availability for ${product}.`;
  return `${CONTACT.whatsappBase}?text=${encodeURIComponent(text)}`;
}

export function whatsappForRequest(reference: string, product: string, locale: Locale): string {
  const text =
    locale === 'es'
      ? `Hola, escribo por mi solicitud de DiveLife ${reference} para ${product}.`
      : `Hello, I’m contacting you about my DiveLife request ${reference} for ${product}.`;
  return `${CONTACT.whatsappBase}?text=${encodeURIComponent(text)}`;
}

// ---------------------------------------------------------------------------
// Single cancellation policy (applies to new bookings only)
// ---------------------------------------------------------------------------
export const CANCELLATION_SUMMARY = {
  en: 'Review our cancellation policy. Any special conditions will appear in your quote before payment.',
  es: 'Consulta nuestra política de cancelación. Cualquier condición especial aparecerá en tu cotización antes del pago.',
};

// ---------------------------------------------------------------------------
// Approved placeholders for data that is not commercially verified
// ---------------------------------------------------------------------------
export const UNKNOWN = {
  duration: { en: 'Confirmed with your quote.', es: 'Confirmada en tu cotización.' },
  meeting: {
    en: 'Confirmed according to your accommodation and activity.',
    es: 'Confirmado según tu alojamiento y actividad.',
  },
  price: {
    en: 'Request a quote for your date and group.',
    es: 'Solicita una cotización para tu fecha y grupo.',
  },
  includes: {
    en: 'Your quote will list the equipment, transport and other services included.',
    es: 'Tu cotización detallará el equipo, transporte y demás servicios incluidos.',
  },
  requirements: {
    en: 'Participant requirements will be checked before booking confirmation.',
    es: 'Los requisitos de los participantes se revisarán antes de confirmar la reserva.',
  },
};

export const HOW_TO_BOOK = {
  en: [
    'Send your preferred date and participant details.',
    'Receive availability, a quote and the activity details from DiveLife.',
    'Complete the payment requested in your quote, if applicable.',
    'Receive your booking confirmation.',
  ],
  es: [
    'Envía tu fecha preferida y los datos de los participantes.',
    'Recibe de DiveLife la disponibilidad, cotización y detalles de la actividad.',
    'Realiza el pago indicado en tu cotización, cuando corresponda.',
    'Recibe la confirmación de tu reserva.',
  ],
};
