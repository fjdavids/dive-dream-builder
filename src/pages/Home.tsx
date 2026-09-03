import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronRight, MapPin } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import ExperienceCard from '@/components/ExperienceCard';
import { experiences } from '@/data/allExperiences';
import HeroSlideshow from '@/components/HeroSlideshow';
import { getImage } from '@/data/imageMap';
import ourFacilitiesImg from '@/assets/our-facilities.jpg';
import SEO from '@/components/SEO';

const copy = {
  en: {
    metaTitle: 'Dive Life Premium PADI 5-Star Dive Center | Playa del Carmen',
    metaDesc:
      'PADI 5-Star scuba diving, cenote diving and snorkeling in Playa del Carmen. Small groups, personal service and local Riviera Maya experience.',
    s1H2: 'Explore the Riviera Maya Below the Surface',
    s1P:
      'Playa del Carmen sits between the Caribbean Sea and the freshwater cenotes of the Yucatán Peninsula, making it possible to experience very different underwater environments in one destination. Dive Life brings those options together for certified divers, first-time divers, couples and families, combining local knowledge with personal attention and a practical approach to every day on the water.',
    s2H2: 'Ocean Experiences',
    s2P:
      'There is no single way to experience the Riviera Maya from the water. Certified divers can explore the reefs of Playa del Carmen, dive the freshwater cenotes or plan a dive day in Cozumel. First-time divers can begin with Discover Scuba Diving, while snorkeling and other water activities provide alternatives for families, couples and guests who prefer to stay closer to the surface.',
    s3H2: 'Water Activities at Grand Velas and Kanai',
    s3P1:
      'Dive Life provides water experiences for guests staying at Grand Velas Riviera Maya and Kanai, bringing the same approach to hotel guests as to every other Dive Life experience: clear information, personal attention and an operation designed around the activity rather than unnecessary complication.',
    s3P2:
      'Depending on the experience, guests can choose from scuba diving, snorkeling and selected private water activities. The objective is simple: understand what you are doing, prepare correctly and spend more time enjoying the water rather than managing logistics.',
    s4H2: 'Why Dive with Dive Life',
    s4P:
      'At Dive Life, premium service is not about adding unnecessary luxury. It means paying attention to the details that affect the experience: clear communication, punctual preparation, organized equipment, realistic planning and personal attention. We combine professional diving standards with the relaxed character of the Caribbean so guests can feel looked after without turning the day into something formal or complicated.',
    principles: [
      {
        h3: 'Personal Attention',
        p: 'Every group and every guest is different. The experience should reflect that.',
      },
      {
        h3: 'Local Knowledge',
        p: 'Understanding the reefs, cenotes and local conditions helps turn a good plan into a better day on the water.',
      },
      {
        h3: 'Professional Standards',
        p: 'Preparation, equipment, communication and organization matter before the experience even begins.',
      },
      {
        h3: 'Genuine Passion',
        p: 'The ocean is not simply where we work. It is why we continue doing this every day.',
      },
    ],
    s5H2: 'Safety First',
    s5P1:
      'Good diving starts before entering the water. Our team considers the activity, the guest’s experience and the day’s conditions when preparing each outing. Briefings, equipment checks and clear communication are part of the process whether you are a certified diver, trying scuba for the first time or joining a snorkeling experience.',
    s5P2:
      'The objective is not to make an activity feel complicated. It is to make sure guests understand what to expect, feel comfortable asking questions and can focus on enjoying the experience once they are in the water.',
    faqH2: 'Frequently Asked Questions',
    faqs: [
      {
        q: 'Do I need to be certified to dive with Dive Life?',
        a: 'No. Certified divers can choose from experiences designed for their certification and experience level, while Discover Scuba Diving provides an introduction for people who have never been certified.',
      },
      {
        q: 'Can non-divers enjoy Dive Life experiences?',
        a: 'Yes. Snorkeling and selected water activities provide options for guests who do not scuba dive, including couples and families who want to experience the water together.',
      },
      {
        q: 'Where does Dive Life operate?',
        a: 'Dive Life operates in Playa del Carmen and across the Riviera Maya, with water activities also available for guests staying at Grand Velas Riviera Maya and Kanai.',
      },
      {
        q: 'What happens if weather or port conditions affect an activity?',
        a: 'Ocean activities depend on weather, sea and port conditions. If conditions affect a planned activity, the Dive Life team will explain the available options and any necessary changes.',
      },
      {
        q: 'How do I choose between reef diving, cenotes and Cozumel?',
        a: 'The right choice depends on your certification, recent diving experience, interests and available time. Reef diving, cenotes and Cozumel offer very different experiences, so the Dive Life team can help you identify which option best fits your plans.',
      },
      {
        q: 'How can I reserve an experience?',
        a: 'Use the contact options on this website to tell us your preferred dates, number of guests and diving experience. The Dive Life team can then help you identify the appropriate activity and availability.',
      },
    ],
    finalH2: 'Ready to Explore?',
    finalP:
      'Tell us who is traveling, your diving experience and the kind of day you have in mind. We will help you identify the Dive Life experience that best fits your group and plans in the Riviera Maya.',
    ctaPrimary: 'Contact Dive Life',
    ctaSecondary: 'Explore Ocean Experiences',
    linkExperiences: 'Explore Ocean Experiences',
    linkLocation: 'See Where We Operate',
    linkFaqs: 'Read Frequently Asked Questions',
    explore: (name: string) => `Explore ${name}`,
  },
  es: {
    metaTitle: 'Dive Life Premium Centro de Buceo PADI 5 Estrellas | Playa del Carmen',
    metaDesc:
      'Buceo PADI 5 Estrellas, buceo en cenotes y snorkel en Playa del Carmen. Grupos pequeños, atención personal y experiencia local en la Riviera Maya.',
    s1H2: 'Explora la Riviera Maya bajo la superficie',
    s1P:
      'Playa del Carmen se encuentra entre el mar Caribe y los cenotes de agua dulce de la península de Yucatán, lo que permite descubrir ambientes submarinos muy diferentes dentro de un mismo destino. Dive Life reúne esas posibilidades para buzos certificados, personas que bucean por primera vez, parejas y familias, combinando conocimiento local, atención personal y un enfoque práctico para cada día en el agua.',
    s2H2: 'Experiencias acuáticas',
    s2P:
      'No existe una sola forma de conocer la Riviera Maya desde el agua. Los buzos certificados pueden explorar los arrecifes de Playa del Carmen, bucear en los cenotes de agua dulce o planear un día de buceo en Cozumel. Quienes bucean por primera vez pueden comenzar con Discover Scuba Diving, mientras que el snorkel y otras actividades acuáticas ofrecen alternativas para familias, parejas y huéspedes que prefieren mantenerse más cerca de la superficie.',
    s3H2: 'Actividades acuáticas en Grand Velas y Kanai',
    s3P1:
      'Dive Life ofrece experiencias acuáticas para huéspedes de Grand Velas Riviera Maya y Kanai, aplicando el mismo enfoque que en cualquier otra experiencia Dive Life: información clara, atención personal y una operación diseñada alrededor de la actividad, sin complicaciones innecesarias.',
    s3P2:
      'Según la experiencia, los huéspedes pueden elegir entre buceo, snorkel y determinadas actividades acuáticas privadas. El objetivo es simple: entender qué vas a hacer, prepararte correctamente y dedicar más tiempo a disfrutar del agua que a resolver la logística.',
    s4H2: '¿Por qué bucear con Dive Life?',
    s4P:
      'En Dive Life, un servicio premium no significa añadir lujo innecesario. Significa prestar atención a los detalles que realmente afectan la experiencia: comunicación clara, preparación puntual, equipo organizado, planificación realista y atención personal. Combinamos estándares profesionales de buceo con el carácter relajado del Caribe para que nuestros huéspedes se sientan atendidos sin convertir el día en algo formal o complicado.',
    principles: [
      {
        h3: 'Atención personal',
        p: 'Cada grupo y cada huésped son diferentes. La experiencia debe reflejarlo.',
      },
      {
        h3: 'Conocimiento local',
        p: 'Conocer los arrecifes, los cenotes y las condiciones locales ayuda a convertir un buen plan en un mejor día en el agua.',
      },
      {
        h3: 'Estándares profesionales',
        p: 'La preparación, el equipo, la comunicación y la organización importan incluso antes de comenzar la experiencia.',
      },
      {
        h3: 'Pasión genuina',
        p: 'El mar no es simplemente nuestro lugar de trabajo. Es la razón por la que seguimos haciendo esto cada día.',
      },
    ],
    s5H2: 'La seguridad primero',
    s5P1:
      'Una buena experiencia de buceo comienza antes de entrar al agua. Nuestro equipo considera la actividad, la experiencia del huésped y las condiciones del día al preparar cada salida. Los briefings, las revisiones de equipo y una comunicación clara forman parte del proceso tanto para buzos certificados como para quienes prueban el buceo por primera vez o participan en una experiencia de snorkel.',
    s5P2:
      'El objetivo no es hacer que una actividad parezca complicada. Es asegurarnos de que los huéspedes sepan qué esperar, se sientan cómodos haciendo preguntas y puedan concentrarse en disfrutar la experiencia una vez que están en el agua.',
    faqH2: 'Preguntas frecuentes',
    faqs: [
      {
        q: '¿Necesito estar certificado para bucear con Dive Life?',
        a: 'No. Los buzos certificados pueden elegir experiencias adecuadas a su nivel de certificación y experiencia, mientras que Discover Scuba Diving ofrece una introducción para personas que nunca han obtenido una certificación de buceo.',
      },
      {
        q: '¿Hay experiencias para personas que no bucean?',
        a: 'Sí. El snorkel y determinadas actividades acuáticas ofrecen opciones para huéspedes que no practican buceo, incluidas parejas y familias que quieren disfrutar juntas del agua.',
      },
      {
        q: '¿Dónde opera Dive Life?',
        a: 'Dive Life opera en Playa del Carmen y diferentes puntos de la Riviera Maya, con actividades acuáticas también disponibles para huéspedes de Grand Velas Riviera Maya y Kanai.',
      },
      {
        q: '¿Qué sucede si el clima o las condiciones del puerto afectan una actividad?',
        a: 'Las actividades en el mar dependen del clima, las condiciones del agua y las disposiciones del puerto. Si las condiciones afectan una actividad programada, el equipo de Dive Life explicará las opciones disponibles y cualquier cambio necesario.',
      },
      {
        q: '¿Cómo elijo entre buceo en arrecifes, cenotes y Cozumel?',
        a: 'La mejor opción depende de tu certificación, experiencia reciente de buceo, intereses y tiempo disponible. Los arrecifes, los cenotes y Cozumel ofrecen experiencias muy diferentes, por lo que el equipo de Dive Life puede ayudarte a identificar cuál se adapta mejor a tus planes.',
      },
      {
        q: '¿Cómo puedo reservar una experiencia?',
        a: 'Utiliza las opciones de contacto de este sitio para indicarnos tus fechas preferidas, número de huéspedes y experiencia de buceo. El equipo de Dive Life podrá ayudarte a identificar la actividad y disponibilidad adecuadas.',
      },
    ],
    finalH2: '¿Listo para explorar?',
    finalP:
      'Cuéntanos quiénes viajan, su experiencia de buceo y qué tipo de día tienen en mente. Te ayudaremos a identificar la experiencia Dive Life que mejor se adapte a tu grupo y a tus planes en la Riviera Maya.',
    ctaPrimary: 'Contacta a Dive Life',
    ctaSecondary: 'Explora las experiencias acuáticas',
    linkExperiences: 'Explora las experiencias acuáticas',
    linkLocation: 'Conoce dónde operamos',
    linkFaqs: 'Lee las preguntas frecuentes',
    explore: (name: string) => `Explorar ${name}`,
  },
} as const;

export default function Home() {
  const { t, language } = useLanguage();
  const c = copy[language];

  return (
    <div className="flex flex-col">
      <SEO
        title={c.metaTitle}
        description={c.metaDesc}
        path="/"
        locale={language}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'LocalBusiness',
          '@id': 'https://divelife.mx/#business',
          name: 'Dive Life',
          image: 'https://divelife.mx/favicon-512.png',
          url: 'https://divelife.mx',
          telephone: '+52 55 1357 2569',
          email: 'info@divelife.mx',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Playa del Carmen',
            addressRegion: 'Quintana Roo',
            addressCountry: 'MX',
          },
          areaServed: ['Playa del Carmen', 'Riviera Maya', 'Cozumel'],
          priceRange: '$$',
        }}
      />

      {/* Hero Section with Slideshow — holds the single H1 + intro paragraph */}
      <HeroSlideshow />

      {/* Section 1 */}
      <section className="section surface-ivory" aria-labelledby="riviera-heading">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-20">
            <h2 id="riviera-heading" className="max-w-[24ch]">
              {c.s1H2}
            </h2>
            <p className="max-w-[62ch] text-[1.0625rem] leading-relaxed text-muted-foreground">
              {c.s1P}
            </p>
          </div>
        </div>
      </section>

      {/* Section 2 — Ocean Experiences */}
      <section className="section surface-white" aria-labelledby="experiences-heading">
        <div className="container">
          <div className="mb-16 max-w-[62ch]">
            <h2 id="experiences-heading" className="mb-6">{c.s2H2}</h2>
            <p className="text-[1.0625rem] leading-relaxed text-muted-foreground">{c.s2P}</p>
          </div>

          <div className="mb-20 space-y-20 md:mb-28 md:space-y-28">
            {experiences.slice(0, 2).map((exp, index) => {
              const imageData = getImage(exp.slug, language);
              return (
                <article
                  key={exp.id}
                  className={`grid items-center gap-8 md:gap-14 lg:grid-cols-2 ${index % 2 === 1 ? 'lg:[&>figure]:order-2' : ''}`}
                >
                  <figure className="overflow-hidden rounded-sm">
                    <img
                      src={imageData.src}
                      alt={typeof imageData.alt === "string" ? imageData.alt : (imageData.alt?.[language] ?? exp.title[language])}
                      className="aspect-[4/3] w-full object-cover"
                      loading="lazy"
                    />
                  </figure>
                  <div className="max-w-[34rem]">
                    {exp.category && <p className="eyebrow mb-5">{exp.category}</p>}
                    <h3 className="mb-5 font-serif text-3xl font-normal leading-tight tracking-tight md:text-[2.75rem]">
                      {exp.title[language]}
                    </h3>
                    <p className="mb-8 text-[1.0625rem] leading-relaxed text-muted-foreground">
                      {exp.shortDesc[language]}
                    </p>
                    <Link to="/experiences" className="link-editorial">
                      {c.explore(exp.title[language])}
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="mb-14 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
            {experiences.slice(2, 6).map((exp) => {
              const imageData = getImage(exp.slug, language);

              return (
                <ExperienceCard
                  key={exp.id}
                  experience={exp}
                  title={exp.title[language]}
                  slug={exp.slug}
                  image={imageData.src}
                  duration={exp.duration}
                  level={exp.level[language]}
                  minAge={exp.minAge}
                  price={exp.price}
                />
              );
            })}
          </div>

          <Link to="/experiences" className="link-editorial">
            {c.linkExperiences}
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Section 3 — Grand Velas & Kanai */}
      <section className="section surface-ivory" aria-labelledby="hotels-heading">
        <div className="container">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-20">
            <div className="space-y-8">
              <div>
                <p className="eyebrow mb-6">
                  <MapPin className="h-4 w-4 text-sand" aria-hidden="true" />
                  {t.location.title}
                </p>
                <h2 id="hotels-heading" className="mb-6">{c.s3H2}</h2>
                <p className="mb-5 max-w-[62ch] text-[1.0625rem] leading-relaxed text-muted-foreground">
                  {c.s3P1}
                </p>
                <p className="max-w-[62ch] text-[1.0625rem] leading-relaxed text-muted-foreground">
                  {c.s3P2}
                </p>
              </div>

              <Link to="/location" className="link-editorial">
                {c.linkLocation}
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="overflow-hidden rounded-sm">
              <img
                src={ourFacilitiesImg}
                alt={language === 'en'
                  ? "DiveLife team of divers on shore with full gear, group photo"
                  : "Equipo de buzos de DiveLife en tierra con equipo completo, foto grupal"}
                className="aspect-[5/4] w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 4 — Why Dive with Dive Life */}
      <section className="section surface-white" aria-labelledby="why-heading">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-20">
            <div>
              <h2 id="why-heading" className="mb-6 max-w-[22ch]">{c.s4H2}</h2>
              <p className="max-w-[62ch] text-[1.0625rem] leading-relaxed text-muted-foreground">
                {c.s4P}
              </p>
            </div>
            <div className="grid gap-y-10 sm:grid-cols-2 sm:gap-x-12">
              {c.principles.map((item) => (
                <div key={item.h3} className="border-t border-border pt-6">
                  <h3 className="mb-2 text-lg">{item.h3}</h3>
                  <p className="text-[0.9375rem] leading-relaxed text-muted-foreground">{item.p}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 5 — Safety First */}
      <section className="section surface-ocean" aria-labelledby="safety-heading">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-20">
            <h2 id="safety-heading" className="max-w-[16ch]">{c.s5H2}</h2>
            <div className="max-w-[62ch] space-y-5">
              <p className="text-[1.0625rem] leading-relaxed text-ivory/80">{c.s5P1}</p>
              <p className="text-[1.0625rem] leading-relaxed text-ivory/80">{c.s5P2}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6 — FAQ (always present in the HTML, no JS required) */}
      <section className="section surface-ivory" aria-labelledby="faq-heading">
        <div className="container">
          <h2 id="faq-heading" className="mb-12 max-w-[24ch]">{c.faqH2}</h2>

          <div className="grid gap-x-16 gap-y-10 md:grid-cols-2">
            {c.faqs.map((faq) => (
              <div key={faq.q} className="border-t border-border pt-6">
                <p className="mb-2 font-medium text-foreground">{faq.q}</p>
                <p className="max-w-[62ch] text-[0.9375rem] leading-relaxed text-muted-foreground">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <Link to="/faqs" className="link-editorial">
              {c.linkFaqs}
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Final section */}
      <section className="section surface-white" aria-labelledby="final-heading">
        <div className="container">
          <div className="max-w-[42rem]">
            <h2 id="final-heading" className="mb-6">{c.finalH2}</h2>
            <p className="mb-10 max-w-[62ch] text-[1.0625rem] leading-relaxed text-muted-foreground">
              {c.finalP}
            </p>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
              <Button size="lg" asChild>
                <Link to="/contact">{c.ctaPrimary}</Link>
              </Button>
              <Link to="/experiences" className="link-editorial">
                {c.ctaSecondary}
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
