import type { FlowType, Locale } from '@/data/catalog';

export const CTA = {
  viewExperience: { en: 'View Experience', es: 'Ver experiencia' },
  checkAvailability: { en: 'Check Availability', es: 'Consultar disponibilidad' },
  requestQuote: { en: 'Request a Quote', es: 'Solicitar cotización' },
  requestTime: { en: 'Request a Time', es: 'Solicitar horario' },
  exploreExperiences: { en: 'Explore Experiences', es: 'Explorar experiencias' },
  requestExperience: { en: 'Request an Experience', es: 'Solicitar una experiencia' },
  whatsapp: { en: 'Contact Us on WhatsApp', es: 'Contactar por WhatsApp' },
  backToExperiences: { en: 'Back to Experiences', es: 'Volver a experiencias' },
  sendMessage: { en: 'Send Message', es: 'Enviar mensaje' },
  close: { en: 'Close', es: 'Cerrar' },
  back: { en: 'Back', es: 'Volver' },
  continue: { en: 'Continue', es: 'Continuar' },
};

/** CTA label for a product card / detail page, by flow. */
export function flowCta(flow: FlowType, locale: Locale): string {
  if (flow === 'quote') return CTA.requestQuote[locale];
  if (flow === 'complimentary') return CTA.requestTime[locale];
  return CTA.checkAvailability[locale];
}

/** Submit button label for the shared request form, by flow. */
export function flowSubmit(flow: FlowType, locale: Locale): string {
  if (flow === 'quote') return locale === 'es' ? 'Solicitar cotización' : 'Request a Quote';
  if (flow === 'complimentary') return locale === 'es' ? 'Solicitar horario' : 'Request a Time';
  return locale === 'es'
    ? 'Enviar solicitud de disponibilidad'
    : 'Send Availability Request';
}

export const FORM = {
  pageTitle: { en: 'Plan Your Experience', es: 'Planea tu experiencia' },
  intro: {
    en: 'Choose your experience, preferred date and participants. Our team will confirm availability and send you a quote before payment.',
    es: 'Elige tu experiencia, fecha preferida y participantes. Nuestro equipo confirmará la disponibilidad y te enviará una cotización antes del pago.',
  },
  notice: {
    en: 'Sending this request does not confirm a booking.',
    es: 'Enviar esta solicitud no confirma una reserva.',
  },
  blockExperience: { en: 'Your experience', es: 'Tu experiencia' },
  blockStay: { en: 'Your stay', es: 'Tu estancia' },
  blockContact: { en: 'Your contact details', es: 'Tus datos de contacto' },

  experience: { en: 'Experience', es: 'Experiencia' },
  selectExperience: { en: 'Select an experience', es: 'Selecciona una experiencia' },
  preferredOption: { en: 'Preferred option', es: 'Opción preferida' },
  preferredDate: { en: 'Preferred date', es: 'Fecha preferida' },
  alternativeDate: {
    en: 'Alternative date — optional',
    es: 'Fecha alternativa — opcional',
  },
  preferredTime: { en: 'Preferred time — optional', es: 'Horario preferido — opcional' },
  flexible: { en: 'My dates are flexible.', es: 'Mis fechas son flexibles.' },
  adults: { en: 'Adults', es: 'Adultos' },
  children: { en: 'Children under 18', es: 'Menores de 18 años' },
  childAges: { en: 'Age of each child', es: 'Edad de cada menor' },
  responsibleAdult: {
    en: 'Responsible adult accompanying the children',
    es: 'Adulto responsable que acompaña a los menores',
  },
  whereStaying: { en: 'Where are you staying?', es: '¿Dónde te hospedas?' },
  hotel: { en: 'Hotel or accommodation', es: 'Hotel o alojamiento' },
  area: { en: 'Accommodation area', es: 'Zona del alojamiento' },
  fullName: { en: 'Full name', es: 'Nombre completo' },
  email: { en: 'Email address', es: 'Correo electrónico' },
  phone: { en: 'WhatsApp or phone — optional', es: 'WhatsApp o teléfono — opcional' },
  countryCode: { en: 'Country code', es: 'Código de país' },
  details: { en: 'Additional details — optional', es: 'Información adicional — opcional' },

  certification: { en: 'Certification', es: 'Certificación' },
  lastDive: {
    en: 'Approximate date of last dive',
    es: 'Fecha aproximada del último buceo',
  },
  diveCount: {
    en: 'Approximate number of dives — optional',
    es: 'Número aproximado de inmersiones — opcional',
  },
  snorkelExperience: {
    en: 'Previous snorkeling experience',
    es: 'Experiencia previa haciendo snorkel',
  },
  paddleboardExperience: {
    en: 'Previous paddleboard experience',
    es: 'Experiencia previa en paddleboard',
  },
  drivers: { en: 'Drivers', es: 'Conductores' },
  passengers: { en: 'Passengers', es: 'Acompañantes' },
  desiredDuration: { en: 'Desired duration', es: 'Duración deseada' },

  sending: { en: 'Sending…', es: 'Enviando…' },
  privacy: {
    en: 'Read our Privacy Policy to learn how we use your details to respond to this request.',
    es: 'Consulta nuestro Aviso de Privacidad para conocer cómo utilizamos tus datos para responder esta solicitud.',
  },
  privacyLink: { en: 'Privacy Policy', es: 'Aviso de Privacidad' },
};

export const GUEST_TYPES: { id: string; label: { en: string; es: string } }[] = [
  { id: 'kanai', label: { en: 'Kanai', es: 'Kanai' } },
  {
    id: 'grand-velas',
    label: { en: 'Grand Velas Riviera Maya', es: 'Grand Velas Riviera Maya' },
  },
  {
    id: 'other',
    label: {
      en: 'Another hotel or accommodation',
      es: 'Otro hotel o alojamiento',
    },
  },
  { id: 'undecided', label: { en: 'Not decided yet', es: 'Aún no lo he decidido' } },
];

export const ERRORS = {
  name: { en: 'Enter your name.', es: 'Escribe tu nombre.' },
  email: {
    en: 'Enter a valid email address.',
    es: 'Escribe un correo electrónico válido.',
  },
  experience: { en: 'Choose an experience.', es: 'Selecciona una experiencia.' },
  date: {
    en: 'Choose a date or select flexible dates.',
    es: 'Elige una fecha o indica que tus fechas son flexibles.',
  },
  pastDate: {
    en: 'Choose today or a future date.',
    es: 'Elige hoy o una fecha futura.',
  },
  participants: {
    en: 'Add at least one participant.',
    es: 'Añade al menos un participante.',
  },
  childAges: {
    en: 'Enter the age of each child.',
    es: 'Indica la edad de cada menor.',
  },
  countryCode: { en: 'Include the country code.', es: 'Incluye el código de país.' },
  save: {
    en: 'We couldn’t save your request. Your details are still here. Please try again or contact us on WhatsApp.',
    es: 'No pudimos guardar tu solicitud. Tus datos siguen aquí. Inténtalo de nuevo o contáctanos por WhatsApp.',
  },
};

export const RECEIPT = {
  title: { en: 'Request Received', es: 'Solicitud recibida' },
  body: {
    en: (ref: string) =>
      `Your reference is ${ref}. We’ll review your request and contact you with availability, the total price and the next steps. Your booking is not yet confirmed.`,
    es: (ref: string) =>
      `Tu referencia es ${ref}. Revisaremos tu solicitud y te contactaremos con la disponibilidad, el precio total y los próximos pasos. Tu reserva todavía no está confirmada.`,
  },
  bodyComplimentary: {
    en: (ref: string) =>
      `Your reference is ${ref}. We’ll review your request and contact you to confirm access, participation requirements and a time for your complimentary session.`,
    es: (ref: string) =>
      `Tu referencia es ${ref}. Revisaremos tu solicitud y te contactaremos para confirmar el acceso, los requisitos de participación y el horario de tu sesión gratuita.`,
  },
  labels: {
    product: { en: 'Experience', es: 'Experiencia' },
    option: { en: 'Preferred option', es: 'Opción preferida' },
    date: { en: 'Preferred date', es: 'Fecha preferida' },
    flexible: { en: 'My dates are flexible.', es: 'Mis fechas son flexibles.' },
    participants: { en: 'Participants', es: 'Participantes' },
    email: { en: 'Email address', es: 'Correo electrónico' },
    reference: { en: 'Reference', es: 'Referencia' },
  },
};

export const PHONE_ALT = {
  en: 'You can also contact us at +52 55 1357 2569.',
  es: 'También puedes contactarnos al +52 55 1357 2569.',
};

export function t<T extends { en: string; es: string }>(entry: T, locale: Locale): string {
  return entry[locale];
}
