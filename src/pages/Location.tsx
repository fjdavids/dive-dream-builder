import { MapPin, Clock, Car, Anchor } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import DiveLifeMap from '@/components/DiveLifeMap';
import sailingImage from '@/assets/sailing.jpg';

export default function Location() {
  const { language } = useLanguage();

  const locations = [
    {
      title: language === 'en' ? 'Inside Kanai Complex' : 'Dentro del Complejo Kanai',
      description: language === 'en' 
        ? 'Direct beach access for Kanai residents. Walk to our dive center within the complex.'
        : 'Acceso directo a la playa para residentes de Kanai. Camina a nuestro centro de buceo dentro del complejo.',
      time: language === 'en' ? '5 min walk' : '5 min caminando',
      icon: Anchor,
    },
    {
      title: language === 'en' ? 'Inside Grand Velas Riviera Maya' : 'Dentro de Grand Velas Riviera Maya',
      description: language === 'en'
        ? 'On-site operations for Grand Velas guests. Meet us at the beach activities area.'
        : 'Operaciones en el lugar para huéspedes de Grand Velas. Encuéntranos en el área de actividades de playa.',
      time: language === 'en' ? 'On property' : 'En la propiedad',
      icon: Anchor,
    },
    {
      title: language === 'en' ? 'External Guests Welcome' : 'Huéspedes Externos Bienvenidos',
      description: language === 'en'
        ? 'Pick-up available in Playa del Carmen and nearby areas upon availability. Contact us to arrange.'
        : 'Pick-up disponible en Playa del Carmen y áreas cercanas según disponibilidad. Contáctanos para coordinar.',
      time: language === 'en' ? '15-30 min from PDC' : '15-30 min desde PDC',
      icon: Car,
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="py-16 md:py-24 ocean-gradient text-white">
        <div className="container text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-6">
            <MapPin className="h-5 w-5" />
            <span className="font-medium">
              {language === 'en' ? 'Location & Access' : 'Ubicación y Acceso'}
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {language === 'en' ? 'Easy Access from Anywhere' : 'Fácil Acceso desde Cualquier Lugar'}
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
            {language === 'en'
              ? 'We operate inside Kanai complex and Grand Velas Riviera Maya, with pick-up service available for external guests in Playa del Carmen and surrounding areas.'
              : 'Operamos dentro del complejo Kanai y Grand Velas Riviera Maya, con servicio de pick-up disponible para huéspedes externos en Playa del Carmen y áreas circundantes.'}
          </p>
        </div>
      </section>

      {/* Interactive Map */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-4">
              {language === 'en' ? 'Find Us' : 'Encuéntranos'}
            </h2>
            <div className="flex flex-wrap gap-2 justify-center">
              <Badge variant="outline" className="gap-2">
                <MapPin className="h-3 w-3" />
                {language === 'en' ? 'Inside Kanai' : 'Dentro de Kanai'}
              </Badge>
              <Badge variant="outline" className="gap-2">
                <MapPin className="h-3 w-3" />
                {language === 'en' ? 'Inside Grand Velas' : 'Dentro de Grand Velas'}
              </Badge>
              <Badge variant="outline" className="gap-2">
                <Car className="h-3 w-3" />
                {language === 'en' ? 'Pick-up: Playa del Carmen & nearby' : 'Pick-up: PDC y cercanías'}
              </Badge>
            </div>
          </div>
          <DiveLifeMap height="500px" />
        </div>
      </section>

      {/* Location Cards */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {locations.map((location, index) => (
              <Card key={index} className="hover:ocean-shadow smooth-transition">
                <CardContent className="p-6 space-y-4">
                  <div className="inline-flex p-3 rounded-full ocean-gradient">
                    <location.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold">{location.title}</h3>
                  <p className="text-muted-foreground">{location.description}</p>
                  <div className="flex items-center gap-2 text-sm text-primary font-medium">
                    <Clock className="h-4 w-4" />
                    {location.time}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Additional Info */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">
                {language === 'en' ? 'Getting Here' : 'Cómo Llegar'}
              </h2>
              
              <div className="space-y-4">
                <div className="p-4 rounded-xl border bg-card">
                  <h3 className="font-bold mb-2">
                    {language === 'en' ? 'From Cancun Airport (CUN)' : 'Desde el Aeropuerto de Cancún (CUN)'}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {language === 'en'
                      ? '45-60 minutes south along Highway 307. We recommend booking airport transfer in advance.'
                      : '45-60 minutos al sur por la Carretera 307. Recomendamos reservar traslado del aeropuerto con anticipación.'}
                  </p>
                </div>

                <div className="p-4 rounded-xl border bg-card">
                  <h3 className="font-bold mb-2">
                    {language === 'en' ? 'From Playa del Carmen Center' : 'Desde el Centro de Playa del Carmen'}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {language === 'en'
                      ? '15-20 minutes north. Pick-up service available upon request for external guests.'
                      : '15-20 minutos al norte. Servicio de pick-up disponible bajo solicitud para huéspedes externos.'}
                  </p>
                </div>

                <div className="p-4 rounded-xl border bg-card">
                  <h3 className="font-bold mb-2">
                    {language === 'en' ? 'Check-in Time' : 'Hora de Check-in'}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {language === 'en'
                      ? 'Please arrive 15-20 minutes before your scheduled activity for equipment fitting and briefing.'
                      : 'Por favor llega 15-20 minutos antes de tu actividad programada para ajuste de equipo y briefing.'}
                  </p>
                </div>
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden ocean-shadow aspect-[4/3]">
              <img
                src={sailingImage}
                alt="DiveLife location"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
