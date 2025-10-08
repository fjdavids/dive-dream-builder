import { useState } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Users, Calendar, Info } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Experience } from '@/data/experiences';
import ExperienceModal from './ExperienceModal';

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

  return (
    <>
      <Card className="overflow-hidden hover:ocean-shadow smooth-transition group">
        <div className="relative aspect-[4/3] overflow-hidden cursor-pointer" onClick={() => setModalOpen(true)}>
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 smooth-transition"
          />
          <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/90 text-primary font-semibold text-sm">
            {language === 'en' ? 'From' : 'Desde'} ${price} MXN
          </div>
        </div>
        
        <CardContent className="p-6">
          <h3 className="text-xl font-bold mb-4">{title}</h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>{level}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{language === 'en' ? 'Min age' : 'Edad mín'}: {minAge}</span>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="p-6 pt-0 gap-3">
          <Button 
            variant="ghost" 
            className="flex-1"
            onClick={() => setModalOpen(true)}
          >
            <Info className="h-4 w-4 mr-2" />
            {language === 'en' ? 'Details' : 'Detalles'}
          </Button>
          <Button className="flex-1 ocean-gradient">
            {language === 'en' ? 'Book' : 'Reservar'}
          </Button>
        </CardFooter>
      </Card>

      <ExperienceModal 
        experience={experience}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </>
  );
}
