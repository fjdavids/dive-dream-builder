import { useState } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, Calendar, Info, MapPin } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Experience } from '@/data/allExperiences';
import ExperienceModal from './ExperienceModal';
import PayPalCheckout from './PayPalCheckout';

interface ExperienceCardProps {
  experience: Experience;
  title: string;
  slug: string;
  image: string;
  duration: string;
  level: string;
  minAge: string;
  price: string;
}

export default function ExperienceCard({
  experience,
  title,
  image,
  duration,
  level,
  minAge,
  price,
}: ExperienceCardProps) {
  const { language } = useLanguage();
  const [modalOpen, setModalOpen] = useState(false);
  const [paypalOpen, setPaypalOpen] = useState(false);

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <Card className="overflow-hidden hover:ocean-shadow smooth-transition group h-full flex flex-col">
        <div className="relative aspect-[16/10] overflow-hidden cursor-pointer" onClick={() => setModalOpen(true)}>
          <img
            src={image}
            alt={language === 'en' 
              ? `${title} — DiveLife Playa del Carmen | Premium ocean adventure in the Mexican Caribbean`
              : `${title} — DiveLife Playa del Carmen | Aventura oceánica premium en el Caribe Mexicano`}
            className="w-full h-full object-cover group-hover:scale-110 smooth-transition"
            loading="lazy"
          />
          <div className="absolute top-4 right-4 px-4 py-2 rounded-full bg-white/95 text-primary font-bold shadow-lg">
            {language === 'en' ? 'From' : 'Desde'} ${price} MXN
          </div>
          {experience.category && (
            <Badge className="absolute top-4 left-4 ocean-gradient text-white border-none">
              {experience.category.charAt(0).toUpperCase() + experience.category.slice(1)}
            </Badge>
          )}
        </div>
        
        <CardContent className="p-6 flex-1 flex flex-col">
          <h3 className="text-2xl font-bold mb-4 line-clamp-2">{title}</h3>
          
          <div className="grid grid-cols-2 gap-3 text-sm mb-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4 text-primary flex-shrink-0" />
              <span className="line-clamp-1">{duration}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="h-4 w-4 text-primary flex-shrink-0" />
              <span className="line-clamp-1">{level}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4 text-primary flex-shrink-0" />
              <span className="line-clamp-1">{language === 'en' ? 'Age' : 'Edad'}: {minAge}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
              <span className="line-clamp-1">{experience.meetingPoint[language].split('/')[0].trim()}</span>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">
            {experience.shortDesc[language]}
          </p>
        </CardContent>
        
        <CardFooter className="p-6 pt-0 gap-3 flex-col sm:flex-row">
          <Button 
            variant="outline" 
            className="flex-1 w-full sm:w-auto"
            onClick={() => setModalOpen(true)}
          >
            <Info className="h-4 w-4 mr-2" />
            {language === 'en' ? 'Details' : 'Detalles'}
          </Button>
          <Button 
            className="flex-1 w-full sm:w-auto ocean-gradient font-semibold"
            onClick={() => price === 'contact' ? scrollToContact() : setPaypalOpen(true)}
          >
            {price === 'contact' 
              ? (language === 'en' ? 'Request Info' : 'Solicitar Info')
              : (language === 'en' ? 'Book Now' : 'Reservar')}
          </Button>
        </CardFooter>
      </Card>

      <ExperienceModal 
        experience={experience}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
      
      <PayPalCheckout
        open={paypalOpen}
        onOpenChange={setPaypalOpen}
        amount={price}
        description={title}
        experienceTitle={title}
      />
    </>
  );
}
