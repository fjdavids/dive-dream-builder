import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Shield, Users, Award, Wrench, ChevronRight, MapPin, Anchor } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import ExperienceCard from '@/components/ExperienceCard';
import { experiences } from '@/data/allExperiences';
import HeroSlideshow from '@/components/HeroSlideshow';
import { getImage } from '@/data/imageMap';
import ourFacilitiesImg from '@/assets/our-facilities.jpg';
import SEO from '@/components/SEO';

export default function Home() {
  const { t, language } = useLanguage();

  const trustFeatures = [
    {
      icon: Shield,
      title: t.trust.safety,
      description: t.trust.safetyDesc,
    },
    {
      icon: Award,
      title: t.trust.certified,
      description: t.trust.certifiedDesc,
    },
    {
      icon: Users,
      title: t.trust.boutique,
      description: t.trust.boutiqueDesc,
    },
    {
      icon: Wrench,
      title: t.trust.premium,
      description: t.trust.premiumDesc,
    },
  ];

  const safetyFeatures = [
    {
      title: t.safety.protocols,
      description: t.safety.protocolsDesc,
    },
    {
      title: t.safety.weather,
      description: t.safety.weatherDesc,
    },
    {
      title: t.safety.ratios,
      description: t.safety.ratiosDesc,
    },
    {
      title: t.safety.equipment,
      description: t.safety.equipmentDesc,
    },
  ];

  return (
    <div className="flex flex-col">
      <SEO
        title={language === 'en'
          ? 'Dive Life Premium PADI 5-Star Dive Center | Playa del Carmen'
          : 'Dive Life Premium Centro de Buceo PADI 5 Estrellas | Playa del Carmen'}
        description={language === 'en'
          ? 'Boutique diving, snorkeling & ocean adventures in Playa del Carmen. PADI 5-Star certified. Small groups, premium gear, unforgettable experiences.'
          : 'Buceo boutique, snorkel y aventuras oceánicas en Playa del Carmen. Centro PADI 5 Estrellas. Grupos pequeños, equipo premium, experiencias inolvidables.'}
        path="/"
        locale={language}
        alternatePath="/"
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
      {/* Hero Section with Slideshow */}
      <HeroSlideshow />

      {/* Intro / Brand positioning */}
      <section className="section surface-ivory" aria-labelledby="trust-heading">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-20">
            <div>
              <p className="eyebrow mb-6">{language === 'en' ? 'Playa del Carmen' : 'Playa del Carmen'}</p>
              <h2 id="trust-heading" className="max-w-[20ch]">
                {language === 'en' ? 'Why choose Dive Life' : 'Por qué elegir Dive Life'}
              </h2>
            </div>
            <div className="grid gap-y-10 sm:grid-cols-2 sm:gap-x-12">
              {trustFeatures.map((feature, index) => (
                <div key={index} className="border-t border-border pt-6">
                  <h3 className="mb-2 text-lg">{feature.title}</h3>
                  <p className="text-[0.9375rem] text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured experiences — editorial, alternating */}
      <section className="section surface-white">
        <div className="container">
          <div className="mb-16 max-w-[46rem]">
            <p className="eyebrow mb-6">{language === 'en' ? 'Curated collection' : 'Colección curada'}</p>
            <h2 className="mb-6">{t.experiences.title}</h2>
            <p className="lead">
              {language === 'en' 
                ? 'From beginner-friendly snorkeling to advanced cenote dives, discover your perfect ocean adventure.'
                : 'Desde snorkel para principiantes hasta buceos avanzados en cenotes, descubre tu aventura oceánica perfecta.'}
            </p>
          </div>

          <div className="space-y-20 md:space-y-28">
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
                      {language === 'en' ? `Explore ${exp.title[language]}` : `Explorar ${exp.title[language]}`}
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Experience collection */}
      <section className="section surface-ivory">
        <div className="container">
          <p className="eyebrow mb-10">{language === 'en' ? 'More experiences' : 'Más experiencias'}</p>

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
            {t.experiences.viewAll}
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Location / hotel experiences */}
      <section className="section surface-white">
        <div className="container">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-20">
            <div className="space-y-8">
              <div>
                <p className="eyebrow mb-6">
                  <MapPin className="h-4 w-4 text-sand" aria-hidden="true" />
                  {t.location.title}
                </p>
                <h2>{t.location.subtitle}</h2>
              </div>
              
              <div className="divide-y divide-border border-y border-border">
                <div className="py-5">
                  <h3 className="mb-1 text-lg">{t.location.kanai}</h3>
                  <p className="text-[0.9375rem] text-muted-foreground">
                    {language === 'en' ? 'Direct access for Kanai residents' : 'Acceso directo para residentes de Kanai'}
                  </p>
                </div>
                
                <div className="py-5">
                  <h3 className="mb-1 text-lg">{t.location.velas}</h3>
                  <p className="text-[0.9375rem] text-muted-foreground">
                    {language === 'en' ? 'On-site for Grand Velas guests' : 'En el lugar para huéspedes de Grand Velas'}
                  </p>
                </div>
                
                <div className="py-5">
                  <h3 className="mb-1 text-lg">{t.location.external}</h3>
                  <p className="text-[0.9375rem] text-muted-foreground">{t.location.externalDesc}</p>
                </div>
              </div>

              <Link to="/location" className="link-editorial">
                {language === 'en' ? 'View Full Map & Details' : 'Ver Mapa Completo y Detalles'}
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

      {/* Safety — Deep Ocean */}
      <section className="section surface-ocean">
        <div className="container">
          <div className="mb-14 max-w-[46rem]">
            <p className="eyebrow mb-6">{language === 'en' ? 'Safety-led operations' : 'Operación guiada por seguridad'}</p>
            <h2 className="mb-6">{t.safety.title}</h2>
            <p className="lead">{t.safety.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 gap-x-16 gap-y-10 md:grid-cols-2">
            {safetyFeatures.map((feature, index) => (
              <div key={index} className="border-t border-ivory/20 pt-6">
                <h3 className="mb-2 text-lg">{feature.title}</h3>
                <p className="text-[0.9375rem] text-ivory/70">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section surface-ivory">
        <div className="container">
          <div className="max-w-[42rem]">
            <h2 className="mb-6">{t.cta.title}</h2>
            <p className="lead mb-10">{t.cta.subtitle}</p>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
              <Button size="lg" asChild>
                <Link to="/experiences">{t.cta.button}</Link>
              </Button>
              <Link to="/contact" className="link-editorial">
                {language === 'en' ? 'Talk to our team' : 'Habla con nuestro equipo'}
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

