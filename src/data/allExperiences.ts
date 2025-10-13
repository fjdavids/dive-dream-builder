export interface ExperienceFAQ {
  q: string;
  a: string;
}

export interface Experience {
  id: number;
  slug: string;
  title: { en: string; es: string };
  shortDesc: { en: string; es: string };
  priceFrom: string;
  duration: string;
  level: { en: string; es: string };
  minAge: string;
  meetingPoint: { en: string; es: string };
  category: string;
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
  price: string;
}

const commonPolicies = {
  en: "Free cancellation up to 24 hours before start time. Weather or port authority closures: we reschedule or offer full refund. All guests must follow guide instructions at all times for safety.",
  es: "Cancelación gratis hasta 24 horas antes del inicio. Si el clima o la capitanía cierran el puerto: reprogramamos u ofrecemos reembolso completo. Todos los participantes deben seguir las instrucciones del guía en todo momento por seguridad."
};

const commonBring = {
  en: "Swimwear, towel, reef-safe sunscreen, hat/sunglasses, water bottle. Certification card if applicable.",
  es: "Traje de baño, toalla, bloqueador biodegradable, gorra/lentes de sol, botella de agua. Credencial de certificación si aplica."
};

const commonMeetingNote = {
  en: "We operate INSIDE Etereo Kanai and INSIDE Grand Velas Riviera Maya. External guests welcome by availability; pick-up from Playa del Carmen & nearby areas available on request.",
  es: "Operamos DENTRO de Etereo Kanai y DENTRO de Grand Velas Riviera Maya. Externos bienvenidos según disponibilidad; pick-up desde Playa del Carmen y zonas cercanas disponible bajo solicitud."
};

export const experiences: Experience[] = [
  {
    id: 1,
    slug: "reef-snorkel",
    title: { en: "Reef Snorkel Adventure", es: "Aventura de Snorkel en Arrecife" },
    shortDesc: { en: "Family-friendly guided snorkel on Playa reefs", es: "Snorkel familiar guiado en arrecifes de Playa" },
    priceFrom: "1800",
    duration: "1h",
    level: { en: "Easy", es: "Fácil" },
    minAge: "6+",
    meetingPoint: { en: "Etereo Kanai / Grand Velas", es: "Etereo Kanai / Grand Velas" },
    category: "snorkeling",
    sections: {
      overview: {
        en: "Family-friendly guided snorkel on Playa del Carmen reefs with calm and crystal clear waters. Perfect for first-timers and families with children.",
        es: "Snorkel guiado en los arrecifes de Playa del Carmen con aguas tranquilas y cristalinas. Perfecto para principiantes y familias con niños."
      },
      itinerary: {
        en: "Safety briefing and gear fitting → Boat ride to reef sites → 2 guided reef stops with marine life viewing → Hydration break → Return to meeting point.",
        es: "Briefing de seguridad y ajuste de equipo → Viaje en lancha a sitios de arrecife → 2 paradas guiadas en arrecife con observación de vida marina → Descanso para hidratación → Regreso al punto de encuentro."
      },
      includes: {
        en: "Mask, snorkel, fins, flotation vest, professional guide, boat transportation, bottled water.",
        es: "Máscara, snorkel, aletas, chaleco de flotación, guía profesional, transporte en lancha, agua embotellada."
      },
      bring: commonBring,
      requirements: {
        en: "Basic water comfort required. Children 6+ must be accompanied by an adult. No prior snorkeling experience necessary.",
        es: "Se requiere comodidad básica en el agua. Niños de 6+ deben estar acompañados por un adulto. No se necesita experiencia previa en snorkel."
      },
      meeting: {
        en: `Meeting at Etereo Kanai or Grand Velas beach. ${commonMeetingNote.en}`,
        es: `Encuentro en la playa de Etereo Kanai o Grand Velas. ${commonMeetingNote.es}`
      },
      cancellation: commonPolicies,
      faqs: {
        en: [
          { q: "Do I need to be a strong swimmer?", a: "Basic comfort in the water is enough. We provide flotation vests and close guide supervision." },
          { q: "What happens with bad weather?", a: "If the port is closed or conditions are unsafe, we reschedule or provide a full refund." },
          { q: "Are photos available?", a: "Photo packages may be added as an optional extra during checkout." }
        ],
        es: [
          { q: "¿Debo nadar muy bien?", a: "Basta con estar cómodo en el agua. Proporcionamos chalecos de flotación y supervisión cercana del guía." },
          { q: "¿Qué pasa con mal clima?", a: "Si el puerto cierra o las condiciones no son seguras, reprogramamos o proporcionamos un reembolso completo." },
          { q: "¿Incluye fotos?", a: "Los paquetes de fotos se pueden añadir como extra opcional durante el checkout." }
        ]
      }
    },
    price: "1800"
  },
  {
    id: 2,
    slug: "tres-rios-snorkel",
    title: { en: "Tres Ríos & Herradura Snorkel", es: "Snorkel Tres Ríos & Herradura" },
    shortDesc: { en: "Unique fresh-to-salt halocline experience", es: "Experiencia en manglar donde se mezclan el agua dulce de los cenotes y el mar" },
    priceFrom: "2500",
    duration: "1.5h",
    level: { en: "Easy", es: "Fácil" },
    minAge: "6+",
    meetingPoint: { en: "Kanai / Grand Velas", es: "Kanai / Grand Velas" },
    category: "snorkeling",
    sections: {
      overview: {
        en: "Unique fresh-to-salt halocline experience across river mouths and reef horseshoe. Witness the magical blend where freshwater meets the Caribbean Sea.",
        es: "Experiencia única de haloclina de agua dulce a salada a través de desembocaduras de ríos y herradura de arrecife. Presencia la mágica mezcla donde el agua dulce se encuentra con el Mar Caribe."
      },
      itinerary: {
        en: "Safety briefing → Drift snorkel over halocline layers → Reef horseshoe exploration stop → Marine life viewing → Return with refreshments.",
        es: "Briefing de seguridad → Snorkel a la deriva sobre capas de haloclina → Paramos a explorar el arrecife de la herradura → Observación de vida marina → Regreso con refrescos."
      },
      includes: {
        en: "Full snorkel gear (mask, fins, vest), professional guide, boat transportation, bottled water.",
        es: "Equipo completo de snorkel (máscara, aletas, chaleco), guía profesional, transporte en lancha, agua embotellada."
      },
      bring: {
        en: `${commonBring.en} Reef-safe sunscreen is mandatory.`,
        es: `${commonBring.es} El bloqueador biodegradable es obligatorio.`
      },
      requirements: {
        en: "Comfortable swimmer recommended. Children 6+ with adult supervision. Ability to float and follow guide instructions.",
        es: "Se recomienda ser nadador cómodo. Niños de 6+ con supervisión adulta. Capacidad para flotar y seguir instrucciones del guía."
      },
      meeting: {
        en: `Meeting at Etereo Kanai or Grand Velas. ${commonMeetingNote.en}`,
        es: `Encuentro en Etereo Kanai o Grand Velas. ${commonMeetingNote.es}`
      },
      cancellation: commonPolicies,
      faqs: {
        en: [
          { q: "What is a halocline?", a: "It's a natural phenomenon where freshwater and saltwater meet but don't mix, creating a blurred visual effect underwater." },
          { q: "Is this safe for beginners?", a: "Yes! The drift is gentle and guides stay close to all participants." },
          { q: "Can I take my own camera?", a: "Yes, waterproof cameras are welcome. Professional photo packages are also available." }
        ],
        es: [
          { q: "¿Qué es una haloclina?", a: "Es un fenómeno natural donde el agua dulce y salada se encuentran pero no se mezclan, creando un efecto visual borroso bajo el agua." },
          { q: "¿Es seguro para principiantes?", a: "¡Sí! La deriva es suave y los guías permanecen cerca de todos los participantes." },
          { q: "¿Puedo llevar mi propia cámara?", a: "Sí, las cámaras sumergibles son bienvenidas. También disponemos de paquetes de fotos profesionales." }
        ]
      }
    },
    price: "2500"
  },
  {
    id: 3,
    slug: "night-snorkel",
    title: { en: "Night Snorkel Experience", es: "Experiencia de Snorkel Nocturno" },
    shortDesc: { en: "Discover nocturnal marine life with torches", es: "Descubre vida marina nocturna con linternas" },
    priceFrom: "2500",
    duration: "2h",
    level: { en: "Intermediate", es: "Intermedio" },
    minAge: "10+",
    meetingPoint: { en: "Etereo Kanai / Grand Velas", es: "Etereo Kanai / Grand Velas" },
    category: "snorkeling",
    sections: {
      overview: {
        en: "Glow of torches reveals nocturnal reef life in calm protected sites. Experience the reef's transformation as diurnal fish sleep and nocturnal creatures emerge.",
        es: "El brillo de las linternas revela la vida nocturna del arrecife en sitios protegidos y tranquilos. Experimenta la transformación del arrecife mientras los peces diurnos duermen y emergen las criaturas nocturnas."
      },
      itinerary: {
        en: "Sunset safety briefing → Night entry with underwater torches → Guided reef tour observing nocturnal species → Hot tea service → Return to shore.",
        es: "Briefing de seguridad al atardecer → Entrada nocturna con linternas submarinas → Tour guiado del arrecife observando especies nocturnas → Servicio de té caliente → Regreso a la orilla."
      },
      includes: {
        en: "Snorkel set, flotation vest, underwater torches, professional night guide, boat transportation, hot beverages.",
        es: "Set de snorkel, chaleco de flotación, linternas submarinas, guía nocturno profesional, transporte en lancha, bebidas calientes."
      },
      bring: commonBring,
      requirements: {
        en: "Previous snorkeling experience recommended. Minimum age 10 years. Must be comfortable in water at night with limited visibility.",
        es: "Se recomienda experiencia previa en snorkel. Edad mínima 10 años. Debe estar cómodo en el agua de noche con visibilidad limitada."
      },
      meeting: {
        en: `Meeting at Etereo Kanai or Grand Velas before sunset. ${commonMeetingNote.en}`,
        es: `Encuentro en Etereo Kanai o Grand Velas antes del atardecer. ${commonMeetingNote.es}`
      },
      cancellation: commonPolicies,
      faqs: {
        en: [
          { q: "Is it scary snorkeling at night?", a: "Not at all! With our guides and torches, it's magical. You'll see creatures you'd never see during the day." },
          { q: "What if I lose sight of my group?", a: "Guides use glow sticks and maintain close proximity. Surface and wave your torch if needed." },
          { q: "What animals might we see?", a: "Octopus, lobster, moray eels, sleeping parrotfish, and bioluminescent plankton." }
        ],
        es: [
          { q: "¿Da miedo hacer snorkel de noche?", a: "¡Para nada! Con nuestros guías y linternas, es mágico. Verás criaturas que nunca verías durante el día." },
          { q: "¿Qué pasa si pierdo de vista a mi grupo?", a: "Los guías usan barras luminosas y mantienen proximidad cercana. Sal a la superficie y agita tu linterna si es necesario." },
          { q: "¿Qué animales podríamos ver?", a: "Pulpo, langosta, morenas, peces loro durmiendo y plancton bioluminiscente." }
        ]
      }
    },
    price: "2500"
  },
  {
    id: 4,
    slug: "discover-scuba",
    title: { en: "Discover Scuba Diving (DSD)", es: "Descubre el Buceo (DSD)" },
    shortDesc: { en: "First breath underwater with PADI instructor", es: "Primera respiración bajo el agua con instructor PADI" },
    priceFrom: "5000",
    duration: "Half-day",
    level: { en: "Beginner", es: "Principiante" },
    minAge: "10+",
    meetingPoint: { en: "Etereo Kanai / Grand Velas", es: "Etereo Kanai / Grand Velas" },
    category: "diving",
    sections: {
      overview: {
        en: "Pool skills session followed by 1 guided ocean dive up to 12 meters with a PADI Instructor. Perfect introduction to scuba diving with no certification required.",
        es: "Sesión de habilidades en alberca seguida de 1 buceo guiado en el océano hasta 12 metros con un Instructor PADI. Introducción perfecta al buceo con tanque sin necesidad de certificación."
      },
      itinerary: {
        en: "Paperwork and health questionnaire → Pool/confined water skills training → Equipment setup → Boat ride to dive site → Guided ocean dive (30-40 min) → Debrief and certificate.",
        es: "Papeleo y cuestionario de salud → Entrenamiento de habilidades en alberca/agua confinada → Configuración de equipo → Viaje en lancha al sitio de buceo → Buceo guiado en océano (30-40 min) → Debriefing y certificado."
      },
      includes: {
        en: "Full scuba gear (BCD, regulator, tank, wetsuit), PADI instructor, boat transportation, bottled water, DSD certificate.",
        es: "Equipo completo de buceo (BCD, regulador, tanque, traje de neopreno), instructor PADI, transporte en lancha, agua embotellada, certificado DSD."
      },
      bring: commonBring,
      requirements: {
        en: "Health questionnaire must be completed. Minimum age 10 years. No flight within 18-24 hours after diving. Basic swimming ability required.",
        es: "Se debe completar un cuestionario de salud. Edad mínima 10 años. No volar dentro de 18-24 horas después del buceo. Se requiere habilidad básica de natación."
      },
      meeting: {
        en: `Meeting at Etereo Kanai or Grand Velas pool area. ${commonMeetingNote.en}`,
        es: `Encuentro en el área de alberca de Etereo Kanai o Grand Velas. ${commonMeetingNote.es}`
      },
      cancellation: commonPolicies,
      faqs: {
        en: [
          { q: "Will I get certified?", a: "You'll receive a DSD certificate, but this is not a full scuba certification. You can upgrade to Open Water Diver course." },
          { q: "What if I panic underwater?", a: "Your instructor is trained for this. You can signal to surface at any time. We go at your pace." },
          { q: "How deep will we go?", a: "Maximum depth is 12 meters (40 feet) for DSD participants." }
        ],
        es: [
          { q: "¿Obtendré una certificación?", a: "Recibirás un certificado DSD, pero esta no es una certificación completa de buceo. Puedes actualizar al curso Open Water Diver." },
          { q: "¿Qué pasa si entro en pánico bajo el agua?", a: "Tu instructor está capacitado para esto. Puedes señalar para subir a la superficie en cualquier momento. Vamos a tu ritmo." },
          { q: "¿Qué tan profundo iremos?", a: "La profundidad máxima es de 12 metros para participantes de DSD." }
        ]
      }
    },
    price: "5000"
  },
  {
    id: 5,
    slug: "local-dive",
    title: { en: "Certified Local Dive", es: "Buceo Local para Certificados" },
    shortDesc: { en: "Guided boat dives on Playa reefs", es: "Buceos guiados en lancha en arrecifes de Playa" },
    priceFrom: "3000",
    duration: "Half-day",
    level: { en: "Certified Diver", es: "Buzo Certificado" },
    minAge: "10+",
    meetingPoint: { en: "Etereo Kanai / Grand Velas", es: "Etereo Kanai / Grand Velas" },
    category: "diving",
    sections: {
      overview: {
        en: "Guided boat dive(s) on Playa del Carmen reefs with small groups and relaxed dive profiles. Perfect for certified divers wanting to explore local reefs.",
        es: "Buceo(s) guiado(s) en lancha en los arrecifes de Playa del Carmen con grupos pequeños y perfiles de buceo relajados. Perfecto para buzos certificados que desean explorar arrecifes locales."
      },
      itinerary: {
        en: "Check-in and gear setup → Boat ride to dive sites → 1-2 guided boat dives (depending on package) → Surface interval with refreshments → Return and equipment rinse.",
        es: "Check-in y configuración de equipo → Viaje en lancha a sitios de buceo → 1-2 buceos guiados en lancha (según paquete) → Intervalo de superficie con refrescos → Regreso y enjuague de equipo."
      },
      includes: {
        en: "Tanks, weights, dive guide, boat transportation, bottled water. BCD and regulator rental available.",
        es: "Tanques, plomos, guía de buceo, transporte en lancha, agua embotellada. Renta de BCD y regulador disponible."
      },
      bring: {
        en: `${commonBring.en} Certification card (C-card) and recent dive log required.`,
        es: `${commonBring.es} Se requiere credencial de certificación (C-card) y bitácora de buceo reciente.`
      },
      requirements: {
        en: "PADI Open Water Diver certification (or equivalent) required. Recent diving experience recommended. No flight within 18-24 hours after last dive.",
        es: "Se requiere certificación PADI Open Water Diver (o equivalente). Se recomienda experiencia de buceo reciente. No volar dentro de 18-24 horas después del último buceo."
      },
      meeting: {
        en: `Meeting at Etereo Kanai or Grand Velas. ${commonMeetingNote.en}`,
        es: `Encuentro en Etereo Kanai o Grand Velas. ${commonMeetingNote.es}`
      },
      cancellation: commonPolicies,
      faqs: {
        en: [
          { q: "Can I rent equipment?", a: "Yes! BCD, regulator, wetsuit, and other equipment available for rent." },
          { q: "What's the maximum depth?", a: "Typical depths are 12-18 meters depending on your certification level and dive site." },
          { q: "How many divers per guide?", a: "Maximum 4 divers per guide for optimal safety and experience." }
        ],
        es: [
          { q: "¿Puedo rentar equipo?", a: "¡Sí! BCD, regulador, traje de neopreno y otro equipo disponible para renta." },
          { q: "¿Cuál es la profundidad máxima?", a: "Las profundidades típicas son de 12-18 metros dependiendo de tu nivel de certificación y sitio de buceo." },
          { q: "¿Cuántos buzos por guía?", a: "Máximo 4 buzos por guía para seguridad y experiencia óptimas." }
        ]
      }
    },
    price: "3000"
  },
  {
    id: 6,
    slug: "padi-scuba-diver",
    title: { en: "PADI Scuba Diver Course", es: "Curso PADI Scuba Diver" },
    shortDesc: { en: "Entry-level certification for guided dives to 12m", es: "Certificación básica para buceos guiados a 12m" },
    priceFrom: "13000",
    duration: "1-1.5 days",
    level: { en: "Beginner", es: "Principiante" },
    minAge: "10+",
    meetingPoint: { en: "Etereo Kanai / Grand Velas", es: "Etereo Kanai / Grand Velas" },
    category: "diving",
    sections: {
      overview: {
        en: "Entry-level PADI certification allowing guided dives to 40 feet with a dive professional. A great stepping stone toward your Open Water Diver certification.",
        es: "Certificación PADI de nivel básico que permite buceos guiados a 12 metros con un profesional de buceo. Un gran escalón hacia tu certificación Open Water Diver."
      },
      itinerary: {
        en: "Day 1: Theory sessions and confined water skills (pool). Day 2: Two open water training dives with instructor → Certification processing and card issuance.",
        es: "Día 1: Sesiones de teoría y habilidades en agua confinada (alberca). Día 2: Dos buceos de entrenamiento en aguas abiertas con instructor → Procesamiento de certificación y emisión de credencial."
      },
      includes: {
        en: "PADI instructor, all scuba gear, tanks/weights, training materials, certification processing and digital card.",
        es: "Instructor PADI, todo el equipo de buceo, tanques/plomos, materiales de entrenamiento, procesamiento de certificación y credencial digital."
      },
      bring: commonBring,
      requirements: {
        en: "Health questionnaire required. Minimum age 10 years. Basic swimming skills. PADI eLearning not included unless stated (can be purchased separately).",
        es: "Se requiere cuestionario de salud. Edad mínima 10 años. Habilidades básicas de natación. PADI eLearning no incluido a menos que se indique (se puede comprar por separado)."
      },
      meeting: {
        en: `Meeting at Etereo Kanai or Grand Velas over 2 days. ${commonMeetingNote.en}`,
        es: `Encuentro en Etereo Kanai o Grand Velas durante 2 días. ${commonMeetingNote.es}`
      },
      cancellation: commonPolicies,
      faqs: {
        en: [
          { q: "What's the difference from Open Water?", a: "Scuba Diver is a subset requiring less time. You can dive to 12m with a professional. Open Water allows independent diving to 18m." },
          { q: "Can I upgrade later?", a: "Yes! Scuba Diver training counts toward your Open Water certification." },
          { q: "How long is the certification valid?", a: "PADI certifications never expire, but we recommend refreshers if you haven't dived in over a year." }
        ],
        es: [
          { q: "¿Cuál es la diferencia con Open Water?", a: "Scuba Diver es un subconjunto que requiere menos tiempo. Puedes bucear a 12m con un profesional. Open Water permite buceo independiente a 18m." },
          { q: "¿Puedo actualizar más tarde?", a: "¡Sí! El entrenamiento Scuba Diver cuenta para tu certificación Open Water." },
          { q: "¿Cuánto tiempo es válida la certificación?", a: "Las certificaciones PADI nunca expiran, pero recomendamos refrescos si no has buceado en más de un año." }
        ]
      }
    },
    price: "13000"
  },
  {
    id: 7,
    slug: "padi-open-water",
    title: { en: "PADI Open Water Diver Course", es: "Curso PADI Open Water Diver" },
    shortDesc: { en: "World's most popular dive certification", es: "La certificación de buceo más popular del mundo" },
    priceFrom: "18000",
    duration: "2-2.5 days",
    level: { en: "Beginner", es: "Principiante" },
    minAge: "10+",
    meetingPoint: { en: "Etereo Kanai / Grand Velas", es: "Etereo Kanai / Grand Velas" },
    category: "diving",
    sections: {
      overview: {
        en: "The world's most popular dive course—independent diver certification to 60 feet. Become a certified diver and explore the underwater world anywhere in the world.",
        es: "El curso de buceo más popular del mundo—certificación de buzo independiente a 18 metros. Conviértete en un buzo certificado y explora el mundo submarino en cualquier parte del mundo."
      },
      itinerary: {
        en: "Day 1: Theory sessions and pool/confined water skills. Days 2-3: Four open water training dives covering essential skills → Final exam → Certification processing and digital card issuance.",
        es: "Día 1: Sesiones de teoría y habilidades en alberca/agua confinada. Días 2-3: Cuatro buceos de entrenamiento en aguas abiertas cubriendo habilidades esenciales → Examen final → Procesamiento de certificación y emisión de credencial digital."
      },
      includes: {
        en: "PADI instructor, all scuba gear, tanks/weights, training materials, certification processing and digital card, boat transportation for ocean dives.",
        es: "Instructor PADI, todo el equipo de buceo, tanques/plomos, materiales de entrenamiento, procesamiento de certificación y credencial digital, transporte en lancha para buceos oceánicos."
      },
      bring: commonBring,
      requirements: {
        en: "Health questionnaire required. Minimum age 10 years. Basic swimming skills and water comfort. PADI eLearning not included unless stated (can be purchased separately).",
        es: "Se requiere cuestionario de salud. Edad mínima 10 años. Habilidades básicas de natación y comodidad en el agua. PADI eLearning no incluido a menos que se indique (se puede comprar por separado)."
      },
      meeting: {
        en: `Meeting at Etereo Kanai or Grand Velas over 3 days. ${commonMeetingNote.en}`,
        es: `Encuentro en Etereo Kanai o Grand Velas durante 3 días. ${commonMeetingNote.es}`
      },
      cancellation: commonPolicies,
      faqs: {
        en: [
          { q: "Is this certification recognized worldwide?", a: "Yes! PADI Open Water is the most widely recognized dive certification globally." },
          { q: "What if I can't complete it in 3 days?", a: "We can accommodate flexible scheduling. Your training can be completed over multiple visits." },
          { q: "Do I need to buy my own equipment?", a: "Not required. All equipment is included. Many divers purchase their own mask, snorkel, and fins for comfort." }
        ],
        es: [
          { q: "¿Esta certificación es reconocida mundialmente?", a: "¡Sí! PADI Open Water es la certificación de buceo más ampliamente reconocida a nivel global." },
          { q: "¿Qué pasa si no puedo completarlo en 3 días?", a: "Podemos acomodar horarios flexibles. Tu entrenamiento puede completarse en múltiples visitas." },
          { q: "¿Necesito comprar mi propio equipo?", a: "No es requerido. Todo el equipo está incluido. Muchos buzos compran su propia máscara, snorkel y aletas para comodidad." }
        ]
      }
    },
    price: "18000"
  },
  {
    id: 8,
    slug: "scuba-kids",
    title: { en: "Scuba Kids Program (6-10 yrs)", es: "Programa Scuba Kids (6-10 años)" },
    shortDesc: { en: "Fun underwater try-outs for children", es: "Pruebas submarinas divertidas para niños" },
    priceFrom: "1800",
    duration: "1.5h",
    level: { en: "Kids Beginner", es: "Niños Principiantes" },
    minAge: "6-10",
    meetingPoint: { en: "Pool @ Etereo Kanai/Grand Velas", es: "Alberca @ Etereo Kanai/Grand Velas" },
    category: "pool",
    sections: {
      overview: {
        en: "Fun, safe underwater try-outs with kid-sized gear and specialized instructors. Perfect introduction to scuba diving for young adventurers in a controlled pool environment.",
        es: "Pruebas submarinas divertidas y seguras con equipo de tamaño infantil e instructores especializados. Introducción perfecta al buceo para jóvenes aventureros en un ambiente controlado de alberca."
      },
      itinerary: {
        en: "Parent briefing → Kid-friendly safety introduction → Shallow pool skills practice → Underwater games and exploration → Certificate sticker and photos.",
        es: "Briefing para padres → Introducción a seguridad amigable para niños → Práctica de habilidades en alberca poco profunda → Juegos y exploración submarina → Calcomanía de certificado y fotos."
      },
      includes: {
        en: "Kid-sized scuba gear, specialized instructor, pool access, certificate sticker, supervision.",
        es: "Equipo de buceo de tamaño infantil, instructor especializado, acceso a alberca, calcomanía de certificado, supervisión."
      },
      bring: commonBring,
      requirements: {
        en: "Ages 6-10 years. Parent or guardian must be present at poolside. Child must be comfortable in water.",
        es: "Edades 6-10 años. Padre o tutor debe estar presente en la orilla de la alberca. El niño debe estar cómodo en el agua."
      },
      meeting: {
        en: `Resort pool at Etereo Kanai or Grand Velas. ${commonMeetingNote.en}`,
        es: `Alberca del resort en Etereo Kanai o Grand Velas. ${commonMeetingNote.es}`
      },
      cancellation: commonPolicies,
      faqs: {
        en: [
          { q: "Is this a real scuba certification?", a: "It's an introductory experience. Children 8+ can pursue PADI Bubblemaker certification." },
          { q: "Will my child go deep?", a: "No. Maximum depth is 3-5 feet in the shallow end of the pool." },
          { q: "Can parents join?", a: "Parents must supervise from poolside. Separate adult DSD or courses available." }
        ],
        es: [
          { q: "¿Es una certificación real de buceo?", a: "Es una experiencia introductoria. Niños de 8+ pueden buscar certificación PADI Bubblemaker." },
          { q: "¿Mi hijo irá a profundidad?", a: "No. La profundidad máxima es de 1-1.5 metros en la parte poco profunda de la alberca." },
          { q: "¿Pueden unirse los padres?", a: "Los padres deben supervisar desde la orilla de la alberca. DSD o cursos para adultos por separado disponibles." }
        ]
      }
    },
    price: "1800"
  },
  {
    id: 9,
    slug: "pool-demo",
    title: { en: "Free Pool Scuba Demo Session", es: "Demo de Buceo en Alberca (Gratis)" },
    shortDesc: { en: "Complimentary scuba breathing introduction", es: "Introducción gratuita a respirar bajo el agua" },
    priceFrom: "0",
    duration: "10-15 min",
    level: { en: "Try-out", es: "Prueba" },
    minAge: "10+",
    meetingPoint: { en: "Pool @ Etereo Kanai/Grand Velas", es: "Alberca @ Etereo Kanai/Grand Velas" },
    category: "pool",
    sections: {
      overview: {
        en: "Complimentary introduction to breathing underwater in a safe pool environment. Try scuba before committing to a course or tour. Perfect for hesitant beginners.",
        es: "Introducción gratuita a respirar bajo el agua en un ambiente seguro de alberca. Prueba el buceo antes de comprometerte a un curso o tour. Perfecto para principiantes indecisos."
      },
      itinerary: {
        en: "Quick sign-up and health check → Short safety briefing → Pool entry with instructor → Breathing practice underwater → Discussion of next steps (DSD, courses, tours).",
        es: "Registro rápido y revisión de salud → Briefing corto de seguridad → Entrada a alberca con instructor → Práctica de respiración bajo el agua → Discusión de siguientes pasos (DSD, cursos, tours)."
      },
      includes: {
        en: "Regulator, tank, mask, instructor supervision. Completely complimentary.",
        es: "Regulador, tanque, máscara, supervisión de instructor. Completamente gratuito."
      },
      bring: commonBring,
      requirements: {
        en: "Health questionnaire required. Minimum age 10 years. Subject to instructor availability and schedule.",
        es: "Se requiere cuestionario de salud. Edad mínima 10 años. Sujeto a disponibilidad y horario del instructor."
      },
      meeting: {
        en: `Resort pool at Etero or Grand Velas. ${commonMeetingNote.en}`,
        es: `Alberca del resort en Etereo o Grand Velas. ${commonMeetingNote.es}`
      },
      cancellation: commonPolicies,
      faqs: {
        en: [
          { q: "Is this really free?", a: "Yes! It's our gift to help you discover scuba diving." },
          { q: "Do I need to book a course after?", a: "Absolutely not. There's no obligation. Try it and decide if it's for you." },
          { q: "How deep will I go?", a: "Just 3-5 feet in the shallow pool. It's about experiencing breathing underwater." }
        ],
        es: [
          { q: "¿Es realmente gratis?", a: "¡Sí! Es nuestro regalo para ayudarte a descubrir el buceo." },
          { q: "¿Necesito reservar un curso después?", a: "Absolutamente no. No hay obligación. Pruébalo y decide si es para ti." },
          { q: "¿Qué tan profundo iré?", a: "Solo 1-1.5 metros en la alberca poco profunda. Se trata de experimentar respirar bajo el agua." }
        ]
      }
    },
    price: "0"
  },
  {
    id: 10,
    slug: "hobie-sailing",
    title: { en: "Hobie Cat Sailing Experience", es: "Experiencia en Velero Hobie Cat" },
    shortDesc: { en: "Silent wind-powered coastal sailing", es: "Navegación costera silenciosa impulsada por viento" },
    priceFrom: "4300",
    duration: "1-2h",
    level: { en: "Easy", es: "Fácil" },
    minAge: "6+",
    meetingPoint: { en: "Beach @ Etereo Kanai/Grand Velas", es: "Playa @ Etereo Kanai/Grand Velas" },
    category: "sailing",
    sections: {
      overview: {
        en: "Silent wind-powered coastal sailing on a Hobie Cat catamaran—relaxing, scenic and premium. Feel the Caribbean breeze as you glide across crystal waters.",
        es: "Navegación costera silenciosa impulsada por viento en un catamarán Hobie Cat—relajante, escénica y premium. Siente la brisa caribeña mientras te deslizas sobre aguas cristalinas."
      },
      itinerary: {
        en: "Beach safety briefing → Set up sails and rigging → Coastal sailing cruise along the Riviera Maya → Return to beach.",
        es: "Briefing de seguridad en playa → Configuración de velas y aparejo → Crucero de navegación costera a lo largo de la Riviera Maya → Regreso a la playa."
      },
      includes: {
        en: "Hobie Cat catamaran, experienced skipper/guide, life vests, safety equipment.",
        es: "Catamarán Hobie Cat, capitán/guía experimentado, chalecos salvavidas, equipo de seguridad."
      },
      bring: commonBring,
      requirements: {
        en: "Basic mobility required. Must follow skipper's safety commands. Children 6+ with adult supervision.",
        es: "Se requiere movilidad básica. Debe seguir comandos de seguridad del capitán. Niños de 6+ con supervisión adulta."
      },
      meeting: {
        en: `Beach at Etereo Kanai or Grand Velas. ${commonMeetingNote.en}`,
        es: `Playa en Etereo Kanai o Grand Velas. ${commonMeetingNote.es}`
      },
      cancellation: commonPolicies,
      faqs: {
        en: [
          { q: "Will I get wet?", a: "Possibly! Splash from waves is part of the fun. Bring a change of clothes if preferred." },
          { q: "What if there's no wind?", a: "We monitor conditions carefully. If wind is insufficient, we'll reschedule or offer alternatives." },
          { q: "Can I help sail?", a: "Absolutely! The skipper will teach you basic sailing if you're interested." }
        ],
        es: [
          { q: "¿Me mojaré?", a: "¡Posiblemente! Las salpicaduras de las olas son parte de la diversión. Trae ropa de cambio si lo prefieres." },
          { q: "¿Qué pasa si no hay viento?", a: "Monitoreamos las condiciones cuidadosamente. Si el viento es insuficiente, reprogramaremos u ofreceremos alternativas." },
          { q: "¿Puedo ayudar a navegar?", a: "¡Absolutamente! El capitán te enseñará navegación básica si estás interesado." }
        ]
      }
    },
    price: "4300"
  },
  {
    id: 11,
    slug: "hobie-sailing-snorkel",
    title: { en: "Hobie Cat Sailing + Snorkel", es: "Hobie Cat + Snorkel" },
    shortDesc: { en: "Sailing and reef snorkeling combo", es: "Combo de navegación y snorkel en arrecife" },
    priceFrom: "5500",
    duration: "2-3h",
    level: { en: "Easy", es: "Fácil" },
    minAge: "6+",
    meetingPoint: { en: "Beach @ Etereo Kanai/Grand Velas", es: "Playa @ Etereo Kanai/Grand Velas" },
    category: "sailing",
    sections: {
      overview: {
        en: "Best of both worlds: coastal Hobie Cat sailing plus a guided reef snorkel stop. Experience wind-powered adventure followed by underwater exploration.",
        es: "Lo mejor de ambos mundos: navegación costera en Hobie Cat más una parada guiada de snorkel en arrecife. Experimenta aventura impulsada por viento seguida de exploración submarina."
      },
      itinerary: {
        en: "Beach briefing → Sail to reef snorkel spot → Anchor and guided snorkel session → Return sail to beach with refreshments.",
        es: "Briefing en playa → Navegar hasta punto de snorkel en arrecife → Anclar y sesión guiada de snorkel → Regreso navegando a la playa con refrescos."
      },
      includes: {
        en: "Hobie Cat catamaran, skipper/guide, snorkel gear (mask, fins, vest), life vests, bottled water.",
        es: "Catamarán Hobie Cat, capitán/guía, equipo de snorkel (máscara, aletas, chaleco), chalecos salvavidas, agua embotellada."
      },
      bring: commonBring,
      requirements: {
        en: "Comfortable in water for snorkeling. Children 6+ must be accompanied by an adult. Basic mobility for boarding catamaran.",
        es: "Cómodo en el agua para snorkel. Niños de 6+ deben estar acompañados por un adulto. Movilidad básica para abordar el catamarán."
      },
      meeting: {
        en: `Beach at Etereo Kanai or Grand Velas. ${commonMeetingNote.en}`,
        es: `Playa en Etereo Kanai o Grand Velas. ${commonMeetingNote.es}`
      },
      cancellation: commonPolicies,
      faqs: {
        en: [
          { q: "How long do we snorkel?", a: "Typically 45 minutes to 1 hour at the reef site." },
          { q: "What if I only want to sail or snorkel?", a: "We offer individual experiences too! This combo saves you money." },
          { q: "Is lunch included?", a: "Light refreshments and water are included. Full lunch can be arranged for private groups." }
        ],
        es: [
          { q: "¿Cuánto tiempo hacemos snorkel?", a: "Típicamente 45 minutos a 1 hora en el sitio del arrecife." },
          { q: "¿Qué pasa si solo quiero navegar o hacer snorkel?", a: "¡También ofrecemos experiencias individuales! Este combo te ahorra dinero." },
          { q: "¿Incluye almuerzo?", a: "Se incluyen refrescos ligeros y agua. Se puede organizar almuerzo completo para grupos privados." }
        ]
      }
    },
    price: "5500"
  },
  {
    id: 12,
    slug: "sailing-lessons",
    title: { en: "Sailing Lessons (Beginner)", es: "Lecciones de Vela (Principiantes)" },
    shortDesc: { en: "Learn to sail with expert instruction", es: "Aprende a navegar con instrucción experta" },
    priceFrom: "13000",
    duration: "1.5-2h",
    level: { en: "Beginner", es: "Principiante" },
    minAge: "10+",
    meetingPoint: { en: "Beach @ Etereo Kanai/Grand Velas", es: "Playa @ Etereo Kanai/Grand Velas" },
    category: "sailing",
    sections: {
      overview: {
        en: "Hands-on sailing basics with expert instruction: rigging, helm control, understanding wind, tacking and gybing. Learn the fundamentals of sailing a catamaran.",
        es: "Fundamentos de navegación prácticos con instrucción experta: aparejo, control del timón, comprensión del viento, viradas y trasluchadas. Aprende los fundamentos de navegar un catamarán."
      },
      itinerary: {
        en: "On-beach theory briefing → Rigging and safety instruction → On-water practice with instructor → Hands-on helm control → Feedback and next steps discussion.",
        es: "Briefing de teoría en playa → Instrucción de aparejo y seguridad → Práctica en agua con instructor → Control práctico del timón → Discusión de retroalimentación y siguientes pasos."
      },
      includes: {
        en: "Hobie Cat catamaran, certified sailing instructor, safety gear, learning materials.",
        es: "Catamarán Hobie Cat, instructor de vela certificado, equipo de seguridad, materiales de aprendizaje."
      },
      bring: commonBring,
      requirements: {
        en: "Basic mobility and ability to follow coaching instructions. Minimum age 10 years. No prior sailing experience required.",
        es: "Movilidad básica y capacidad para seguir instrucciones de entrenamiento. Edad mínima 10 años. No se requiere experiencia previa en navegación."
      },
      meeting: {
        en: `Beach at Etereo Kanai or Grand Velas. ${commonMeetingNote.en}`,
        es: `Playa en Etereo Kanai o Grand Velas. ${commonMeetingNote.es}`
      },
      cancellation: commonPolicies,
      faqs: {
        en: [
          { q: "Can I get certified?", a: "This is an introductory lesson. We can refer you to certification programs if interested." },
          { q: "What if I capsize?", a: "Hobie Cats are stable, but capsizing is part of learning! Your instructor will show you recovery techniques." },
          { q: "Can I take multiple lessons?", a: "Yes! We offer lesson packages for continued learning." }
        ],
        es: [
          { q: "¿Puedo obtener certificación?", a: "Esta es una lección introductoria. Podemos referirte a programas de certificación si estás interesado." },
          { q: "¿Qué pasa si volcamos?", a: "Los Hobie Cats son estables, ¡pero volcar es parte del aprendizaje! Tu instructor te mostrará técnicas de recuperación." },
          { q: "¿Puedo tomar múltiples lecciones?", a: "¡Sí! Ofrecemos paquetes de lecciones para aprendizaje continuo." }
        ]
      }
    },
    price: "13000"
  },
  {
    id: 13,
    slug: "luxury-catamaran",
    title: { en: "Luxury Sailing Experience (Catamaran 12-15 pax)", es: "Experiencia de Vela de Lujo (Catamarán 12-15 pax)" },
    shortDesc: { en: "Private premium catamaran charter", es: "Charter privado de catamarán premium" },
    priceFrom: "contact",
    duration: "Half-day/Full-day",
    level: { en: "Private Charter", es: "Charter Privado" },
    minAge: "All ages",
    meetingPoint: { en: "External (Pickup PDC)", es: "Externo (Pickup PDC)" },
    category: "sailing",
    sections: {
      overview: {
        en: "Private premium catamaran charter for 12-15 guests with snorkel stops, onboard service, and optional catering. Perfect for celebrations, corporate events, or luxury family outings.",
        es: "Charter privado de catamarán premium para 12-15 invitados con paradas de snorkel, servicio a bordo y catering opcional. Perfecto para celebraciones, eventos corporativos o salidas familiares de lujo."
      },
      itinerary: {
        en: "Private marina boarding → Coastal sailing cruise → Swimming and snorkel stops → Onboard relaxation with service → Optional beach club stop → Return to marina.",
        es: "Abordaje en marina privada → Crucero de navegación costera → Paradas para nadar y hacer snorkel → Relajación a bordo con servicio → Parada opcional en club de playa → Regreso a la marina."
      },
      includes: {
        en: "Professional crew, fuel, soft drinks and ice, snorkel gear for all guests, sound system. Optional add-ons: catering, open bar, photographer.",
        es: "Tripulación profesional, combustible, refrescos y hielo, equipo de snorkel para todos los invitados, sistema de sonido. Complementos opcionales: catering, barra libre, fotógrafo."
      },
      bring: commonBring,
      requirements: {
        en: "Group charter booking required. Itinerary subject to weather and port authority conditions. Advance booking recommended.",
        es: "Se requiere reserva de charter grupal. Itinerario sujeto a condiciones climáticas y de capitanía. Se recomienda reserva anticipada."
      },
      meeting: {
        en: `Private marina (pickup/transfer available from Playa del Carmen hotels). ${commonMeetingNote.en}`,
        es: `Marina privada (pickup/traslado disponible desde hoteles en Playa del Carmen). ${commonMeetingNote.es}`
      },
      cancellation: commonPolicies,
      faqs: {
        en: [
          { q: "Can we customize the route?", a: "Absolutely! Work with our captain to create your perfect sailing experience." },
          { q: "Is a DJ available?", a: "Yes! We can arrange DJ service or use the onboard sound system with your playlist." },
          { q: "What about food and drinks?", a: "Soft drinks included. Premium catering, open bar, and chef service available as add-ons." }
        ],
        es: [
          { q: "¿Podemos personalizar la ruta?", a: "¡Absolutamente! Trabaja con nuestro capitán para crear tu experiencia perfecta de navegación." },
          { q: "¿Hay DJ disponible?", a: "¡Sí! Podemos organizar servicio de DJ o usar el sistema de sonido a bordo con tu lista de reproducción." },
          { q: "¿Qué hay de comida y bebidas?", a: "Refrescos incluidos. Catering premium, barra libre y servicio de chef disponibles como complementos." }
        ]
      }
    },
    price: "contact"
  },
  {
    id: 14,
    slug: "jetski-tour",
    title: { en: "Jet Ski Tour (30 min Ride)", es: "Tour en Moto Acuática (30 min)" },
    shortDesc: { en: "Adrenaline coastal jet ski adventure", es: "Aventura de adrenalina en moto acuática" },
    priceFrom: "1800",
    duration: "30 min",
    level: { en: "Thrill", es: "Emoción" },
    minAge: "Driver 16+",
    meetingPoint: { en: "Beach @ Etereo Kanai/Grand Velas", es: "Playa @ Etereo Kanai/Grand Velas" },
    category: "trips",
    sections: {
      overview: {
        en: "Adrenaline-pumping coastal jet ski ride with safety briefing and supervised riding area. Experience speed and freedom on Caribbean waters.",
        es: "Paseo en moto acuática costera lleno de adrenalina con briefing de seguridad y área de conducción supervisada. Experimenta velocidad y libertad en aguas caribeñas."
      },
      itinerary: {
        en: "Safety briefing and riding instructions → Equipment fitting and jet ski orientation → 30-minute supervised ride in designated coastal zone → Return and debrief.",
        es: "Briefing de seguridad e instrucciones de conducción → Ajuste de equipo y orientación de moto acuática → Paseo supervisado de 30 minutos en zona costera designada → Regreso y debriefing."
      },
      includes: {
        en: "Jet ski rental, life vests, safety supervision, riding area access.",
        es: "Renta de moto acuática, chalecos salvavidas, supervisión de seguridad, acceso a área de conducción."
      },
      bring: commonBring,
      requirements: {
        en: "Driver must be 16+ years old. Passenger allowed per local regulations. Must follow safety instructions and speed limits.",
        es: "Conductor debe tener 16+ años. Pasajero permitido según regulaciones locales. Debe seguir instrucciones de seguridad y límites de velocidad."
      },
      meeting: {
        en: `Beach water sports station at Etereo Kanai or Grand Velas. ${commonMeetingNote.en}`,
        es: `Estación de deportes acuáticos en playa de Etereo Kanai o Grand Velas. ${commonMeetingNote.es}`
      },
      cancellation: commonPolicies,
      faqs: {
        en: [
          { q: "Do I need a license?", a: "No boating license required. We provide full orientation and safety training." },
          { q: "Can two people ride together?", a: "Yes! One driver and one passenger per jet ski." },
          { q: "What's the speed limit?", a: "Speed limits vary by zone for safety. Your guide will brief you on all restrictions." }
        ],
        es: [
          { q: "¿Necesito licencia?", a: "No se requiere licencia náutica. Proporcionamos orientación completa y entrenamiento de seguridad." },
          { q: "¿Pueden dos personas montar juntas?", a: "¡Sí! Un conductor y un pasajero por moto acuática." },
          { q: "¿Cuál es el límite de velocidad?", a: "Los límites de velocidad varían por zona por seguridad. Tu guía te informará sobre todas las restricciones." }
        ]
      }
    },
    price: "1800"
  },
  {
    id: 15,
    slug: "seabob-session",
    title: { en: "Seabob Underwater Scooter Session", es: "Sesión con Scooter Subacuático (Seabob)" },
    shortDesc: { en: "Playful underwater propulsion device", es: "Dispositivo de propulsión submarina lúdico" },
    priceFrom: "3000",
    duration: "30-45 min",
    level: { en: "Easy/Fun", es: "Fácil/Divertido" },
    minAge: "10+",
    meetingPoint: { en: "Pool or calm sea", es: "Alberca o mar tranquilo" },
    category: "trips",
    sections: {
      overview: {
        en: "Playful underwater propulsion in pool or calm sea with instructor supervision. Glide effortlessly underwater like a dolphin with this electric underwater scooter.",
        es: "Propulsión submarina lúdica en alberca o mar tranquilo con supervisión de instructor. Deslízate sin esfuerzo bajo el agua como un delfín con este scooter eléctrico submarino."
      },
      itinerary: {
        en: "Equipment briefing and controls demonstration → Gear fitting (mask, Seabob) → Guided supervised session in pool or calm sea → Free practice time → Equipment return.",
        es: "Briefing de equipo y demostración de controles → Ajuste de equipo (máscara, Seabob) → Sesión supervisada guiada en alberca o mar tranquilo → Tiempo de práctica libre → Devolución de equipo."
      },
      includes: {
        en: "Seabob underwater scooter unit, mask, instructor supervision, safety equipment.",
        es: "Unidad de scooter submarino Seabob, máscara, supervisión de instructor, equipo de seguridad."
      },
      bring: commonBring,
      requirements: {
        en: "Comfortable in water. Minimum age 10 years. Must follow instructor safety instructions. No prior scuba/snorkel experience required.",
        es: "Cómodo en el agua. Edad mínima 10 años. Debe seguir instrucciones de seguridad del instructor. No se requiere experiencia previa de buceo/snorkel."
      },
      meeting: {
        en: `Pool or calm sea location at resort. ${commonMeetingNote.en}`,
        es: `Ubicación de alberca o mar tranquilo en resort. ${commonMeetingNote.es}`
      },
      cancellation: commonPolicies,
      faqs: {
        en: [
          { q: "Is it hard to control?", a: "Not at all! The Seabob is very intuitive. Most people master it within 5 minutes." },
          { q: "How fast does it go?", a: "Speed is controlled by you. Maximum speeds vary by model but are safe for all skill levels." },
          { q: "Do I need to hold my breath?", a: "You can surface anytime. Many people dive down briefly and come up for air naturally." }
        ],
        es: [
          { q: "¿Es difícil de controlar?", a: "¡Para nada! El Seabob es muy intuitivo. La mayoría de las personas lo dominan en 5 minutos." },
          { q: "¿Qué tan rápido va?", a: "La velocidad es controlada por ti. Las velocidades máximas varían según el modelo pero son seguras para todos los niveles de habilidad." },
          { q: "¿Necesito contener la respiración?", a: "Puedes salir a la superficie en cualquier momento. Muchas personas se sumergen brevemente y suben a respirar naturalmente." }
        ]
      }
    },
    price: "3000"
  },
  {
    id: 16,
    slug: "surface-supply",
    title: { en: "Surface-Supply Diving (Snuba-style)", es: "Buceo con Aire desde Superficie (tipo Snuba)" },
    shortDesc: { en: "Breathe underwater without heavy tank", es: "Respira bajo el agua sin tanque pesado" },
    priceFrom: "1200",
    duration: "1-1.5h",
    level: { en: "Beginner", es: "Principiante" },
    minAge: "8+",
    meetingPoint: { en: "Pool or calm sea", es: "Alberca o mar tranquilo" },
    category: "diving",
    sections: {
      overview: {
        en: "Breathe underwater from a surface-supplied air hose—no heavy tank on your back. Guided shallow dive experience perfect for those intimidated by full scuba gear.",
        es: "Respira bajo el agua desde una manguera de aire suministrada desde la superficie—sin tanque pesado en tu espalda. Experiencia de buceo poco profundo guiado perfecto para quienes se intimidan con equipo completo de buceo."
      },
      itinerary: {
        en: "Safety briefing and equipment explanation → Shallow descent with guide and surface-supply rig → Guided underwater exploration (max 6m depth) → Gradual ascent → Debrief.",
        es: "Briefing de seguridad y explicación de equipo → Descenso poco profundo con guía y equipo de suministro de superficie → Exploración submarina guiada (profundidad máx 6m) → Ascenso gradual → Debriefing."
      },
      includes: {
        en: "All surface-supply diving gear, mask, fins, instructor/supervision, safety equipment.",
        es: "Todo el equipo de buceo con suministro de superficie, máscara, aletas, instructor/supervisión, equipo de seguridad."
      },
      bring: commonBring,
      requirements: {
        en: "Basic health questionnaire. Minimum age 8 years. Ability to equalize ear pressure. Comfortable in water.",
        es: "Cuestionario básico de salud. Edad mínima 8 años. Capacidad para equalizar presión en oídos. Cómodo en el agua."
      },
      meeting: {
        en: `Pool or calm sea location. ${commonMeetingNote.en}`,
        es: `Ubicación de alberca o mar tranquilo. ${commonMeetingNote.es}`
      },
      cancellation: commonPolicies,
      faqs: {
        en: [
          { q: "How is this different from scuba?", a: "Air comes from a hose connected to the surface, so you don't wear a heavy tank. Easier and less intimidating!" },
          { q: "Can I go deep?", a: "Maximum depth is 6 meters due to the hose length and safety protocols." },
          { q: "Is it safe for kids?", a: "Yes! Minimum age is 8. It's a great introduction to underwater breathing for children." }
        ],
        es: [
          { q: "¿En qué se diferencia del buceo con tanque?", a: "El aire viene de una manguera conectada a la superficie, así que no llevas un tanque pesado. ¡Más fácil y menos intimidante!" },
          { q: "¿Puedo ir a profundidad?", a: "La profundidad máxima es de 6 metros debido a la longitud de la manguera y protocolos de seguridad." },
          { q: "¿Es seguro para niños?", a: "¡Sí! La edad mínima es 8 años. Es una gran introducción a la respiración submarina para niños." }
        ]
      }
    },
    price: "1200"
  },
  {
    id: 17,
    slug: "cenote-dive",
    title: { en: "Cenote Dive Adventure (Certified)", es: "Aventura de Buceo en Cenote (Certificados)" },
    shortDesc: { en: "Two guided cavern dives in famous cenotes", es: "Dos buceos guiados en caverna en cenotes famosos" },
    priceFrom: "14000",
    duration: "Full day",
    level: { en: "Certified Diver", es: "Buzo Certificado" },
    minAge: "12+",
    meetingPoint: { en: "External (Pickup PDC)", es: "Externo (Pickup PDC)" },
    category: "trips",
    sections: {
      overview: {
        en: "Two guided cavern dives with stunning light beams and haloclines in famous Yucatan cenotes. Experience the otherworldly beauty of underwater cave systems.",
        es: "Dos buceos guiados en caverna con impresionantes rayos de luz y haloclinas en cenotes famosos de Yucatán. Experimenta la belleza de otro mundo de los sistemas de cuevas submarinas."
      },
      itinerary: {
        en: "Pickup from Playa del Carmen → Drive to cenote region → Safety briefing → First cenote dive → Surface interval and snacks → Second cenote dive → Lunch → Return to Playa del Carmen.",
        es: "Pickup desde Playa del Carmen → Viaje a región de cenotes → Briefing de seguridad → Primer buceo en cenote → Intervalo de superficie y snacks → Segundo buceo en cenote → Almuerzo → Regreso a Playa del Carmen."
      },
      includes: {
        en: "Round-trip transportation, cenote entrance fees, tanks/weights, professional dive guide, lunch, snacks and water.",
        es: "Transporte redondo, tarifas de entrada a cenotes, tanques/plomos, guía profesional de buceo, almuerzo, snacks y agua."
      },
      bring: {
        en: `${commonBring.en} Wetsuit recommended (available for rent). C-card and dive log required.`,
        es: `${commonBring.es} Se recomienda traje de neopreno (disponible para renta). Se requieren C-card y bitácora de buceo.`
      },
      requirements: {
        en: "PADI Open Water certification or equivalent. Good buoyancy control essential. Recent diving experience recommended. Minimum age 12 years.",
        es: "Certificación PADI Open Water o equivalente. Control de flotabilidad bueno esencial. Se recomienda experiencia de buceo reciente. Edad mínima 12 años."
      },
      meeting: {
        en: `Pickup from Playa del Carmen hotels and meeting points. ${commonMeetingNote.en}`,
        es: `Pickup desde hoteles y puntos de encuentro en Playa del Carmen. ${commonMeetingNote.es}`
      },
      cancellation: commonPolicies,
      faqs: {
        en: [
          { q: "Is this cave diving?", a: "No, it's cavern diving—always within sight of natural light. No overhead environment training required." },
          { q: "What cenotes will we visit?", a: "Popular options include Dos Ojos, Tajma Ha, and Chikin Ha. Selection depends on conditions and group level." },
          { q: "Is it claustrophobic?", a: "Caverns are spacious with excellent visibility. Not recommended if you're truly claustrophobic, but most divers love it!" }
        ],
        es: [
          { q: "¿Es buceo en cuevas?", a: "No, es buceo en cavernas—siempre a la vista de luz natural. No se requiere entrenamiento en ambiente techado." },
          { q: "¿Qué cenotes visitaremos?", a: "Opciones populares incluyen Dos Ojos, Tajma Ha y Chikin Ha. La selección depende de condiciones y nivel del grupo." },
          { q: "¿Es claustrofóbico?", a: "Las cavernas son espaciosas con excelente visibilidad. No recomendado si eres verdaderamente claustrofóbico, ¡pero a la mayoría de buzos les encanta!" }
        ]
      }
    },
    price: "14000"
  },
  {
    id: 18,
    slug: "cozumel-dive",
    title: { en: "Cozumel Dive Excursion (Certified)", es: "Excursión de Buceo en Cozumel (Certificados)" },
    shortDesc: { en: "Two drift dives in Cozumel Marine Park", es: "Dos buceos a la deriva en Parque Marino Cozumel" },
    priceFrom: "contact",
    duration: "Full day",
    level: { en: "Certified Diver", es: "Buzo Certificado" },
    minAge: "12+",
    meetingPoint: { en: "External (Pickup PDC)", es: "Externo (Pickup PDC)" },
    category: "trips",
    sections: {
      overview: {
        en: "Two exhilarating drift dives in Cozumel's world-famous national marine park with stunning visibility and abundant marine life. Experience some of the best diving in the Caribbean.",
        es: "Dos emocionantes buceos a la deriva en el mundialmente famoso parque marino nacional de Cozumel con impresionante visibilidad y abundante vida marina. Experimenta algunos de los mejores buceos del Caribe."
      },
      itinerary: {
        en: "Pickup from Playa del Carmen → Ferry to Cozumel → Boat to dive sites → Two guided drift dives → Surface interval with lunch → Return ferry → Playa del Carmen drop-off.",
        es: "Pickup desde Playa del Carmen → Ferry a Cozumel → Lancha a sitios de buceo → Dos buceos guiados a la deriva → Intervalo de superficie con almuerzo → Ferry de regreso → Drop-off en Playa del Carmen."
      },
      includes: {
        en: "Round-trip transportation and ferry tickets, boat transportation in Cozumel, marine park fees, dive guide, tanks/weights, lunch.",
        es: "Transporte redondo y boletos de ferry, transporte en lancha en Cozumel, tarifas de parque marino, guía de buceo, tanques/plomos, almuerzo."
      },
      bring: {
        en: `${commonBring.en} C-card and log book required. Cash for tips and extras.`,
        es: `${commonBring.es} Se requieren C-card y bitácora. Efectivo para propinas y extras.`
      },
      requirements: {
        en: "Open Water certification required. Recent diving experience recommended for drift diving. Minimum age 12 years. Good buoyancy control.",
        es: "Se requiere certificación Open Water. Se recomienda experiencia de buceo reciente para buceo a la deriva. Edad mínima 12 años. Buen control de flotabilidad."
      },
      meeting: {
        en: `Pickup from Playa del Carmen hotels and meeting points. ${commonMeetingNote.en}`,
        es: `Pickup desde hoteles y puntos de encuentro en Playa del Carmen. ${commonMeetingNote.es}`
      },
      cancellation: commonPolicies,
      faqs: {
        en: [
          { q: "What's drift diving?", a: "The current carries you along the reef—effortless and exhilarating! The boat follows and picks you up." },
          { q: "What sites will we dive?", a: "Popular sites include Palancar, Santa Rosa, and Columbia. Selection depends on conditions and certification levels." },
          { q: "Is Cozumel better than local reefs?", a: "Cozumel offers world-class visibility (often 30m+) and dramatic wall diving. It's a bucket-list dive destination!" }
        ],
        es: [
          { q: "¿Qué es buceo a la deriva?", a: "La corriente te lleva a lo largo del arrecife—sin esfuerzo y emocionante! La lancha te sigue y recoge." },
          { q: "¿Qué sitios bucearemos?", a: "Sitios populares incluyen Palancar, Santa Rosa y Columbia. La selección depende de condiciones y niveles de certificación." },
          { q: "¿Es Cozumel mejor que arrecifes locales?", a: "Cozumel ofrece visibilidad de clase mundial (a menudo 30m+) y buceo dramático en paredes. ¡Es un destino de buceo de lista de deseos!" }
        ]
      }
    },
    price: "contact"
  },
  {
    id: 19,
    slug: "cenote-family-snorkel",
    title: { en: "Cenote Family Snorkeling Tour", es: "Tour Familiar de Snorkel en Cenote" },
    shortDesc: { en: "Gentle cenote snorkeling for families", es: "Snorkel suave en cenote para familias" },
    priceFrom: "13000",
    duration: "Half-day",
    level: { en: "Easy/Family", es: "Fácil/Familiar" },
    minAge: "4+",
    meetingPoint: { en: "External (Pickup PDC)", es: "Externo (Pickup PDC)" },
    category: "trips",
    sections: {
      overview: {
        en: "Gentle, shallow cenote snorkeling ideal for families with young children—clear, calm freshwater with magical light. Experience the beauty of cenotes safely.",
        es: "Snorkel suave y poco profundo en cenote ideal para familias con niños pequeños—agua dulce clara y tranquila con luz mágica. Experimenta la belleza de los cenotes de manera segura."
      },
      itinerary: {
        en: "Pickup from Playa del Carmen → Drive to family-friendly cenote → Safety briefing → Guided snorkel session in shallow areas → Snacks and refreshments → Photo time → Return to Playa del Carmen.",
        es: "Pickup desde Playa del Carmen → Viaje a cenote familiar → Briefing de seguridad → Sesión guiada de snorkel en áreas poco profundas → Snacks y refrescos → Tiempo para fotos → Regreso a Playa del Carmen."
      },
      includes: {
        en: "Round-trip transportation, cenote entrance fee, snorkel gear (mask, fins, vest), professional guide, snacks and water.",
        es: "Transporte redondo, tarifa de entrada a cenote, equipo de snorkel (máscara, aletas, chaleco), guía profesional, snacks y agua."
      },
      bring: commonBring,
      requirements: {
        en: "Children must be comfortable in water with flotation devices. Minimum age 4 years with adult supervision. Life vests provided for all.",
        es: "Los niños deben estar cómodos en el agua con dispositivos de flotación. Edad mínima 4 años con supervisión adulta. Chalecos salvavidas proporcionados para todos."
      },
      meeting: {
        en: `Pickup from Playa del Carmen hotels and meeting points. ${commonMeetingNote.en}`,
        es: `Pickup desde hoteles y puntos de encuentro en Playa del Carmen. ${commonMeetingNote.es}`
      },
      cancellation: commonPolicies,
      faqs: {
        en: [
          { q: "Is it safe for young children?", a: "Yes! We choose calm, shallow cenotes perfect for families. Life vests provided and guides stay close." },
          { q: "Will we see fish?", a: "Cenotes have different ecosystems than the ocean. You may see small fish and unique freshwater species." },
          { q: "How cold is the water?", a: "Cenote water is around 24-25°C (75-77°F) year-round. Refreshing but comfortable!" }
        ],
        es: [
          { q: "¿Es seguro para niños pequeños?", a: "¡Sí! Elegimos cenotes tranquilos y poco profundos perfectos para familias. Chalecos salvavidas proporcionados y guías permanecen cerca." },
          { q: "¿Veremos peces?", a: "Los cenotes tienen ecosistemas diferentes al océano. Puedes ver peces pequeños y especies únicas de agua dulce." },
          { q: "¿Qué tan fría es el agua?", a: "El agua del cenote está alrededor de 24-25°C durante todo el año. ¡Refrescante pero cómoda!" }
        ]
      }
    },
    price: "13000"
  },
  {
    id: 20,
    slug: "manatee-snorkel",
    title: { en: "Manatee Snorkeling Adventure (Family)", es: "Aventura de Snorkel con Manatí (Familiar)" },
    shortDesc: { en: "Guided mangrove snorkel for manatee sightings", es: "Snorkel guiado en manglar para avistamiento de manatí" },
    priceFrom: "13000",
    duration: "Half-day",
    level: { en: "Easy/Family", es: "Fácil/Familiar" },
    minAge: "6+",
    meetingPoint: { en: "External (Pickup PDC)", es: "Externo (Pickup PDC)" },
    category: "trips",
    sections: {
      overview: {
        en: "Guided mangrove and snorkel area where manatee sightings may occur. Strict wildlife-respect protocols ensure safe observation of these gentle giants.",
        es: "Área guiada de manglar y snorkel donde pueden ocurrir avistamientos de manatí. Protocolos estrictos de respeto a la vida silvestre aseguran observación segura de estos gigantes gentiles."
      },
      itinerary: {
        en: "Pickup from Playa del Carmen → Drive to manatee habitat area → Wildlife briefing and respectful observation guidelines → Kayak/SUP access to viewing area → Guided snorkel with manatee watch → Return to Playa del Carmen.",
        es: "Pickup desde Playa del Carmen → Viaje a área de hábitat de manatí → Briefing de vida silvestre y pautas de observación respetuosa → Acceso en kayak/SUP al área de observación → Snorkel guiado con observación de manatí → Regreso a Playa del Carmen."
      },
      includes: {
        en: "Round-trip transportation, professional guide, snorkel gear, kayak/SUP support equipment, entrance fees, snacks and water.",
        es: "Transporte redondo, guía profesional, equipo de snorkel, equipo de soporte de kayak/SUP, tarifas de entrada, snacks y agua."
      },
      bring: commonBring,
      requirements: {
        en: "Quiet behavior required near wildlife. Must follow distance and non-touch guidelines. Minimum age 6 years. Comfortable in water.",
        es: "Se requiere comportamiento silencioso cerca de vida silvestre. Debe seguir pautas de distancia y no tocar. Edad mínima 6 años. Cómodo en el agua."
      },
      meeting: {
        en: `Pickup from Playa del Carmen hotels and meeting points. ${commonMeetingNote.en}`,
        es: `Pickup desde hoteles y puntos de encuentro en Playa del Carmen. ${commonMeetingNote.es}`
      },
      cancellation: commonPolicies,
      faqs: {
        en: [
          { q: "Are manatee sightings guaranteed?", a: "They're wild animals, so we can't guarantee sightings. However, our guides know the best areas and times for encounters." },
          { q: "Can we touch the manatees?", a: "Absolutely not. Touching is prohibited by law and disturbs these protected animals. Observation only." },
          { q: "What else will we see?", a: "Mangrove ecosystems are rich with birds, fish, turtles, and unique plant life." }
        ],
        es: [
          { q: "¿Los avistamientos de manatí están garantizados?", a: "Son animales salvajes, así que no podemos garantizar avistamientos. Sin embargo, nuestros guías conocen las mejores áreas y momentos para encuentros." },
          { q: "¿Podemos tocar los manatíes?", a: "Absolutamente no. Tocar está prohibido por ley y perturba a estos animales protegidos. Solo observación." },
          { q: "¿Qué más veremos?", a: "Los ecosistemas de manglar son ricos con aves, peces, tortugas y vida vegetal única." }
        ]
      }
    },
    price: "13000"
  },
  {
    id: 21,
    slug: "paddleboard-ojo-agua",
    title: { en: "Paddleboard Adventure to Ojo de Agua & Eagle Rays", es: "Aventura en Paddleboard al Ojo de Agua y Rayas Águila" },
    shortDesc: { en: "SUP to natural spring and eagle ray area", es: "SUP a manantial natural y área de rayas águila" },
    priceFrom: "600",
    duration: "1.5-2h",
    level: { en: "Easy/Active", es: "Fácil/Activo" },
    minAge: "10+",
    meetingPoint: { en: "Etereo Kanai / Grand Velas", es: "Etereo Kanai / Grand Velas" },
    category: "trips",
    sections: {
      overview: {
        en: "Guided stand-up paddleboard journey along the coast to a natural freshwater spring (Ojo de Agua) and common eagle ray viewing area. Combine fitness with nature exploration.",
        es: "Viaje guiado en paddleboard a lo largo de la costa hasta un manantial de agua dulce natural (Ojo de Agua) y área común de observación de rayas águila. Combina fitness con exploración de la naturaleza."
      },
      itinerary: {
        en: "Beach briefing and SUP basics → Paddle along coastline to Ojo de Agua freshwater spring → Eagle ray viewing and rest stop → Paddle return to beach → Refreshments.",
        es: "Briefing en playa y básicos de SUP → Remar a lo largo de la costa hasta manantial de agua dulce Ojo de Agua → Observación de rayas águila y parada de descanso → Remar de regreso a la playa → Refrescos."
      },
      includes: {
        en: "Stand-up paddleboard, leash, personal flotation device (PFD), professional guide, bottled water.",
        es: "Paddleboard, correa, dispositivo de flotación personal (PFD), guía profesional, agua embotellada."
      },
      bring: {
        en: `${commonBring.en} Strong sun protection is highly recommended (long sleeve rash guard ideal).`,
        es: `${commonBring.es} Se recomienda encarecidamente protección solar fuerte (playera de licra de manga larga ideal).`
      },
      requirements: {
        en: "Basic balance and fitness. Prior SUP experience helpful but not required—instruction provided. Minimum age 10 years. Comfortable in water.",
        es: "Balance y condición física básicos. Experiencia previa en SUP útil pero no requerida—se proporciona instrucción. Edad mínima 10 años. Cómodo en el agua."
      },
      meeting: {
        en: `Beach at Etereo Kanai or Grand Velas. ${commonMeetingNote.en}`,
        es: `Playa en Etereo Kanai o Grand Velas. ${commonMeetingNote.es}`
      },
      cancellation: commonPolicies,
      faqs: {
        en: [
          { q: "Is paddleboarding hard?", a: "Most people pick it up quickly! We start with basics and go at a comfortable pace." },
          { q: "What if I fall off?", a: "It happens to everyone! The leash keeps your board close. Just climb back on and keep going." },
          { q: "Will we definitely see eagle rays?", a: "Eagle rays are commonly seen in this area, but they're wild animals. Sightings are frequent but not guaranteed." }
        ],
        es: [
          { q: "¿Es difícil el paddleboard?", a: "¡La mayoría de las personas lo aprenden rápido! Empezamos con los básicos y vamos a un ritmo cómodo." },
          { q: "¿Qué pasa si me caigo?", a: "¡Le pasa a todos! La correa mantiene tu tabla cerca. Solo sube de nuevo y continúa." },
          { q: "¿Veremos definitivamente rayas águila?", a: "Las rayas águila se ven comúnmente en esta área, pero son animales salvajes. Los avistamientos son frecuentes pero no garantizados." }
        ]
      }
    },
    price: "600"
  },
  {
    id: 22,
    slug: "panga-fishing",
    title: { en: "Mexican Panga Fishing", es: "Pesca en Panga Mexicana" },
    shortDesc: { en: "Authentic local panga deep sea fishing", es: "Pesca auténtica local en panga en mar profundo" },
    priceFrom: "13000",
    duration: "Half-day/Full-day",
    level: { en: "All levels", es: "Todos los niveles" },
    minAge: "8+",
    meetingPoint: { en: "External (Pickup PDC)", es: "Externo (Pickup PDC)" },
    category: "trips",
    sections: {
      overview: {
        en: "Authentic local panga charter—deep sea or trolling depending on season. Target species include mahi-mahi, wahoo, kingfish, barracuda, and sailfish.",
        es: "Charter auténtico de panga local—mar profundo o curricán según temporada. Especies objetivo incluyen dorado, peto, sierra, barracuda y pez vela."
      },
      itinerary: {
        en: "Marina meeting with captain → Safety briefing and gear setup → Head to fishing grounds → Lines in the water (troll/jig/live bait techniques) → Catch care with ice → Return to marina with your catch.",
        es: "Encuentro en marina con capitán → Briefing de seguridad y configuración de equipo → Ir a zonas de pesca → Líneas al agua (técnicas de curricán/jigging/carnada viva) → Cuidado de captura con hielo → Regreso a marina con tu captura."
      },
      includes: {
        en: "Experienced captain and deckhand, all fishing tackle and bait, fishing licenses, ice for catch care, water and soft drinks.",
        es: "Capitán y marinero experimentados, todo el equipo de pesca y carnada, licencias de pesca, hielo para cuidado de captura, agua y refrescos."
      },
      bring: {
        en: `${commonBring.en} Motion-sickness medication if prone to seasickness. Cooler if you want to take fish home.`,
        es: `${commonBring.es} Medicamento para mareo si eres propenso. Hielera si quieres llevar pescado a casa.`
      },
      requirements: {
        en: "Sea conditions can be choppy. Not recommended for those with severe back or mobility issues. All experience levels welcome—captain provides instruction. Minimum age 8 years.",
        es: "Las condiciones del mar pueden ser agitadas. No recomendado para personas con problemas severos de espalda o movilidad. Todos los niveles de experiencia bienvenidos—capitán proporciona instrucción. Edad mínima 8 años."
      },
      meeting: {
        en: `Marina pickup location in Playa del Carmen. ${commonMeetingNote.en}`,
        es: `Ubicación de pickup en marina en Playa del Carmen. ${commonMeetingNote.es}`
      },
      cancellation: commonPolicies,
      faqs: {
        en: [
          { q: "Can we keep our catch?", a: "Yes! Your catch is yours to keep. Captain can recommend local restaurants that will cook it for you." },
          { q: "What if we don't catch anything?", a: "Fishing is never guaranteed, but our captains have decades of experience and know the best spots." },
          { q: "Is gear included?", a: "Yes! All rods, reels, tackle, bait, and licenses are included. Just bring yourself and enthusiasm!" }
        ],
        es: [
          { q: "¿Podemos quedarnos con nuestra captura?", a: "¡Sí! Tu captura es tuya. El capitán puede recomendar restaurantes locales que la cocinarán para ti." },
          { q: "¿Qué pasa si no pescamos nada?", a: "La pesca nunca está garantizada, pero nuestros capitanes tienen décadas de experiencia y conocen los mejores lugares." },
          { q: "¿Está incluido el equipo?", a: "¡Sí! Todas las cañas, carretes, aparejos, carnada y licencias están incluidos. ¡Solo trae tu entusiasmo!" }
        ]
      }
    },
    price: "13000"
  }
];
