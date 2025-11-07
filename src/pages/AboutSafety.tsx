import { Shield, Users, Award, Heart, Leaf } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Helmet } from 'react-helmet';
import heroDivingImg from '@/assets/hero-diving.jpg';
import scubaDivingImg from '@/assets/scuba-diving.jpg';

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

            {/* Mission */}
            <Card className="mb-8">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Heart className="h-6 w-6 text-primary" />
                  {t.about.missionTitle}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t.about.missionText}
                </p>
              </CardContent>
            </Card>

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

        {/* Safety Standards */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary">
                  <Shield className="h-5 w-5" />
                  <span className="font-semibold">{isEN ? 'Safety First' : 'Seguridad Primero'}</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold">{t.about.safetyTitle}</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {t.about.safetyText}
                </p>
              </div>
              <div className="relative rounded-2xl overflow-hidden ocean-shadow aspect-[4/3]">
                <img
                  src={scubaDivingImg}
                  alt="PADI certified diving equipment"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Beyond Diving */}
        <section className="py-16 md:py-24">
          <div className="container text-center max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">{t.about.beyondTitle}</h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              {t.about.beyondText}
            </p>
            <p className="text-lg leading-relaxed mb-8">
              {t.about.ctaText}
            </p>
            <Button size="lg" className="ocean-gradient hover:ocean-glow">
              {isEN ? 'Explore All Experiences' : 'Explorar Todas las Experiencias'}
            </Button>
          </div>
        </section>
      </div>
    </>
  );
}