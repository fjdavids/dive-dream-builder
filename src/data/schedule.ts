// Schedule rules for DiveLife experiences (America/Cancun timezone)

const TZ = 'America/Cancun';

const DEFAULT_SLOTS = ['09:00', '11:00', '13:00', '15:00'];
const HOURLY_SLOTS_9_16 = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'];
const TWO_SLOTS_8_14 = ['08:00', '14:00'];
const ONLY_08 = ['08:00'];
const ONLY_11 = ['11:00'];

export const NIGHT_SNORKEL_NOTE = {
  en: "Night dives depend on season and weather. Please contact us on WhatsApp to confirm availability.",
  es: "Las inmersiones nocturnas dependen de la temporada y el clima. Contáctanos por WhatsApp para confirmar disponibilidad."
};

export const SMARTWAIVER_ES = "https://waiver.smartwaiver.com/w/omphcbcjfadsuzpjlbkejd/web/";
export const SMARTWAIVER_EN = "https://waiver.smartwaiver.com/v/DIVELIFE/";

interface SlotResult {
  slots: string[];
  requiresConfirmation: boolean;
}

export function getSlotsForSlug(slug: string, dateISO: string): SlotResult {
  // Night snorkel requires manual confirmation
  if (slug === 'night-snorkel') {
    return { slots: [], requiresConfirmation: true };
  }

  // Two departures (08:00 & 14:00)
  const twoSlotServices = [
    'manatee-snorkeling',
    'cenote-family-snorkel',
    'cozumel-dive',
    'cenote-dive',
    'luxury-sailing-catamaran'
  ];

  // Only 08:00
  const only08Services = ['mexican-panga-fishing'];

  // Hourly 09:00–16:00
  const hourlyServices = [
    'paddleboard-ojo-agua-eaglerays',
    'paddleboard-ojo-agua',
    'paddleboard-marina',
    'jetski-30',
    'jetski-tour',
    'seabob-session'
  ];

  // Only 11:00
  const only11Services = ['free-pool-demo', 'pool-demo', 'scuba-kids'];

  let slots: string[] = [];

  if (twoSlotServices.includes(slug)) {
    slots = TWO_SLOTS_8_14;
  } else if (only08Services.includes(slug)) {
    slots = ONLY_08;
  } else if (hourlyServices.includes(slug)) {
    slots = HOURLY_SLOTS_9_16;
  } else if (only11Services.includes(slug)) {
    slots = ONLY_11;
  } else {
    slots = DEFAULT_SLOTS;
  }

  // Filter out past times if date is today
  const now = new Date();
  const selectedDate = new Date(dateISO + 'T00:00:00');
  
  if (selectedDate.toDateString() === now.toDateString()) {
    const currentTime = now.toTimeString().slice(0, 5); // HH:mm
    slots = slots.filter(slot => slot > currentTime);
  }

  return { slots, requiresConfirmation: false };
}

export function getSlotDuration(slug: string): number {
  // Return duration in hours
  const hourlyServices = [
    'paddleboard-ojo-agua-eaglerays',
    'paddleboard-ojo-agua',
    'paddleboard-marina',
    'jetski-30',
    'jetski-tour',
    'seabob-session'
  ];

  return hourlyServices.includes(slug) ? 1 : 2;
}
