import { Shield, Users, Award, Heart, Leaf } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Helmet } from 'react-helmet';
import heroDivingImg from '@/assets/hero-diving.jpg';
import scubaDivingImg from '@/assets/scuba-diving.jpg';
import sunsetSurfaceImg from '@/assets/sunset-surface.jpg';
import briefingImg from '@/assets/briefing.jpg';
import oxygenKitImg from '@/assets/oxygen-kit.jpg';
import gearCheckImg from '@/assets/gear-check.jpg';
import radioImg from '@/assets/radio.jpg';
import cenoteImg from '@/assets/cenote.jpg';
import snorkelImg from '@/assets/reef-snorkel.jpg';
import hobieCatImg from '@/assets/hobie-sailing.jpg';
import seabobImg from '@/assets/seabob.jpg';

export default function AboutSafety() {
  const { language, t } = useLanguage();
  const isEN = language === 'en';

  const values = [
    { icon: Shield, label: t.about.value1 },
    { icon: Users, label: t.about.value2 },
    { icon: Award, label: t.about.value3 },
    { icon: Users, label: t.about.value4 },
    { icon: Leaf, label: t.about.value5 },
  ];

  return (
    <>
      <Helmet>
        <title>{t.about.metaTitle}</title>
        <meta name="description" content={t.about.metaDescription} />
        <meta property="og:title" content={t.about.metaTitle} />
        <meta property="og:description" content={t.about.metaDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={heroDivingImg} />
        <link rel="canonical" href={`https://divelife.mx/${language === 'en' ? 'about-safety' : 'sobre-seguridad'}`} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "DiveLife.mx",
            "description": language === 'en' 
              ? "PADI 5-Star Dive Center in Riviera Maya offering scuba diving, snorkeling, and sailing experiences" 
              : "Centro de Buceo PADI 5 Estrellas en Riviera Maya ofreciendo buceo, snorkel y experiencias de navegación",
            "image": heroDivingImg,
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Playa del Carmen",
              "addressRegion": "Quintana Roo",
              "addressCountry": "MX"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "20.6296",
              "longitude": "-87.0739"
            },
            "url": "https://divelife.mx",
            "telephone": "+525513572569",
            "priceRange": "$$",
            "openingHoursSpecification": [{
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
              "opens": "08:00",
              "closes": "18:00"
            }],
            "sameAs": [
              "https://www.instagram.com/divelife.mx/",
              "https://www.facebook.com/divelife.mx"
            ]
          })}
        </script>
      </Helmet>

      <div className="flex flex-col">
        {/* Hero Section */}
        <section className="relative h-[60vh] min-h-[500px] overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src={heroDivingImg} 
              alt="DiveLife Riviera Maya underwater diving"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
          </div>
          <div className="relative container h-full flex flex-col justify-center items-center text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in">
              {t.about.headline}
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mb-8 animate-fade-in">
              {t.about.subheadline}
            </p>
            <div className="flex gap-4">
              <Button size="lg" className="ocean-gradient hover:ocean-glow">
                {isEN ? 'Book Your Adventure' : 'Reserva tu Aventura'}
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                {isEN ? 'Contact Us' : 'Contáctanos'}
              </Button>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-16 md:py-24">
          <div className="container max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.about.aboutTitle}</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t.about.aboutText}
              </p>
            </div>

            {/* Team Strip */}
            <div className="grid grid-cols-3 gap-4 mb-12">
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden ocean-shadow">
                <img
                  src={briefingImg}
                  alt={isEN ? 'DiveLife team safety briefing on beach' : 'Equipo DiveLife dando briefing de seguridad en la playa'}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden ocean-shadow">
                <img
                  src={scubaDivingImg}
                  alt={isEN ? 'Professional dive instructor with guests' : 'Instructor de buceo profesional con huéspedes'}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden ocean-shadow">
                <img
                  src={radioImg}
                  alt={isEN ? 'Safety equipment and emergency communications' : 'Equipo de seguridad y comunicaciones de emergencia'}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>

            {/* Mission with Impact Image */}
            <div className="relative mb-12 rounded-2xl overflow-hidden ocean-shadow">
              <img
                src={sunsetSurfaceImg}
                alt={isEN ? 'Diver emerging at sunset - the magic of ocean exploration' : 'Buzo emergiendo al atardecer - la magia de la exploración oceánica'}
                className="w-full h-[400px] object-cover"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end">
                <div className="p-8 md:p-12 text-white">
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 flex items-center gap-2">
                    <Heart className="h-6 w-6" />
                    {t.about.missionTitle}
                  </h3>
                  <p className="text-lg leading-relaxed">
                    {t.about.missionText}
                  </p>
                </div>
              </div>
            </div>

            {/* Values */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-6 text-center">{t.about.valuesTitle}</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {values.map((value, idx) => (
                  <Card key={idx} className="hover:ocean-shadow smooth-transition">
                    <CardContent className="p-6 text-center">
                      <value.icon className="h-8 w-8 mx-auto mb-3 text-primary" />
                      <p className="font-semibold text-sm">{value.label}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Safety Standards with Equipment Grid */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
                <Shield className="h-5 w-5" />
                <span className="font-semibold">{isEN ? 'Safety First' : 'Seguridad Primero'}</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">{t.about.safetyTitle}</h2>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                {t.about.safetyText}
              </p>
            </div>

            {/* Safety Equipment Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              <Card className="overflow-hidden">
                <div className="relative aspect-[4/3]">
                  <img
                    src={oxygenKitImg}
                    alt={isEN ? 'Professional diving equipment and seabobs ready for use' : 'Equipo profesional de buceo y seabobs listos para usar'}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold">{isEN ? 'Premium Equipment' : 'Equipo Premium'}</h3>
                  <p className="text-sm text-muted-foreground">{isEN ? 'Regularly maintained and inspected gear' : 'Equipo mantenido e inspeccionado regularmente'}</p>
                </CardContent>
              </Card>

              <Card className="overflow-hidden">
                <div className="relative aspect-[4/3]">
                  <img
                    src={gearCheckImg}
                    alt={isEN ? 'Scuba regulators and equipment inspection' : 'Reguladores de buceo e inspección de equipo'}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold">{isEN ? 'Equipment Checks' : 'Revisión de Equipo'}</h3>
                  <p className="text-sm text-muted-foreground">{isEN ? 'Pre-dive safety inspections for every guest' : 'Inspecciones de seguridad pre-buceo para cada huésped'}</p>
                </CardContent>
              </Card>

              <Card className="overflow-hidden">
                <div className="relative aspect-[4/3]">
                  <img
                    src={radioImg}
                    alt={isEN ? 'Safety communications and emergency response' : 'Comunicaciones de seguridad y respuesta a emergencias'}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold">{isEN ? 'Emergency Communications' : 'Comunicaciones de Emergencia'}</h3>
                  <p className="text-sm text-muted-foreground">{isEN ? 'Always connected for your safety' : 'Siempre conectados para tu seguridad'}</p>
                </CardContent>
              </Card>

              <Card className="overflow-hidden">
                <div className="relative aspect-[4/3]">
                  <img
                    src={briefingImg}
                    alt={isEN ? 'Safety briefing before water activities' : 'Briefing de seguridad antes de actividades acuáticas'}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold">{isEN ? 'Safety Briefings' : 'Briefings de Seguridad'}</h3>
                  <p className="text-sm text-muted-foreground">{isEN ? 'Comprehensive instructions before every activity' : 'Instrucciones completas antes de cada actividad'}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Beyond Diving Gallery */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="text-center mb-12 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">{t.about.beyondTitle}</h2>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                {t.about.beyondText}
              </p>
            </div>

            {/* Experience Gallery */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              <div className="relative aspect-square rounded-xl overflow-hidden ocean-shadow group">
                <img
                  src={cenoteImg}
                  alt={isEN ? 'Cenote diving and snorkeling adventures' : 'Aventuras de buceo y snorkel en cenotes'}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                  <p className="text-white font-semibold">{isEN ? 'Cenote Adventures' : 'Aventuras en Cenotes'}</p>
                </div>
              </div>

              <div className="relative aspect-square rounded-xl overflow-hidden ocean-shadow group">
                <img
                  src={snorkelImg}
                  alt={isEN ? 'Reef snorkeling with tropical fish' : 'Snorkel en arrecife con peces tropicales'}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                  <p className="text-white font-semibold">{isEN ? 'Reef Snorkeling' : 'Snorkel en Arrecife'}</p>
                </div>
              </div>

              <div className="relative aspect-square rounded-xl overflow-hidden ocean-shadow group">
                <img
                  src={hobieCatImg}
                  alt={isEN ? 'Hobie Cat sailing experiences' : 'Experiencias de navegación en Hobie Cat'}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                  <p className="text-white font-semibold">{isEN ? 'Sailing Adventures' : 'Aventuras de Navegación'}</p>
                </div>
              </div>

              <div className="relative aspect-square rounded-xl overflow-hidden ocean-shadow group">
                <img
                  src={seabobImg}
                  alt={isEN ? 'Seabob underwater exploration' : 'Exploración submarina con Seabob'}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                  <p className="text-white font-semibold">{isEN ? 'Seabob Sessions' : 'Sesiones Seabob'}</p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <p className="text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
                {t.about.ctaText}
              </p>
              <Button size="lg" className="ocean-gradient hover:ocean-glow">
                {isEN ? 'Explore All Experiences' : 'Explorar Todas las Experiencias'}
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}