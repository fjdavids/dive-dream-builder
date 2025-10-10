import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Clock, Users, Calendar, MapPin } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Experience } from '@/data/allExperiences';

interface ExperienceModalProps {
  experience: Experience;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultTab?: string;
}

export default function ExperienceModal({ experience, open, onOpenChange, defaultTab = 'overview' }: ExperienceModalProps) {
  const { language } = useLanguage();

  const title = experience.title[language];
  const sections = experience.sections;
  const meetingPoint = experience.meetingPoint[language];

  const scrollToContact = () => {
    onOpenChange(false);
    setTimeout(() => {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{title}</DialogTitle>
          <DialogDescription className="sr-only">
            {experience.shortDesc[language]}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-4">
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-primary" />
            <span>{experience.duration}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Users className="h-4 w-4 text-primary" />
            <span>{experience.level[language]}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-primary" />
            <span>{language === 'en' ? 'Min age' : 'Edad mín'}: {experience.minAge}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-primary" />
            <span className="truncate">{meetingPoint}</span>
          </div>
        </div>

        <Tabs defaultValue={defaultTab} className="w-full">
          <TabsList className="w-full grid grid-cols-4 lg:grid-cols-8 h-auto">
            <TabsTrigger value="overview" className="text-xs">
              {language === 'en' ? 'Overview' : 'Resumen'}
            </TabsTrigger>
            <TabsTrigger value="itinerary" className="text-xs">
              {language === 'en' ? 'Itinerary' : 'Itinerario'}
            </TabsTrigger>
            <TabsTrigger value="includes" className="text-xs">
              {language === 'en' ? 'Includes' : 'Incluye'}
            </TabsTrigger>
            <TabsTrigger value="bring" className="text-xs">
              {language === 'en' ? 'Bring' : 'Traer'}
            </TabsTrigger>
            <TabsTrigger value="requirements" className="text-xs">
              {language === 'en' ? 'Requirements' : 'Requisitos'}
            </TabsTrigger>
            <TabsTrigger value="meeting" className="text-xs">
              {language === 'en' ? 'Meeting' : 'Encuentro'}
            </TabsTrigger>
            <TabsTrigger value="cancellation" className="text-xs">
              {language === 'en' ? 'Policy' : 'Política'}
            </TabsTrigger>
            <TabsTrigger value="faqs" className="text-xs">FAQs</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-4 space-y-4">
            <p className="text-muted-foreground whitespace-pre-line">{sections.overview[language]}</p>
          </TabsContent>

          <TabsContent value="itinerary" className="mt-4 space-y-4">
            <p className="text-muted-foreground whitespace-pre-line">{sections.itinerary[language]}</p>
          </TabsContent>

          <TabsContent value="includes" className="mt-4 space-y-4">
            <p className="text-muted-foreground whitespace-pre-line">{sections.includes[language]}</p>
          </TabsContent>

          <TabsContent value="bring" className="mt-4 space-y-4">
            <p className="text-muted-foreground whitespace-pre-line">{sections.bring[language]}</p>
          </TabsContent>

          <TabsContent value="requirements" className="mt-4 space-y-4">
            <p className="text-muted-foreground whitespace-pre-line">{sections.requirements[language]}</p>
          </TabsContent>

          <TabsContent value="meeting" className="mt-4 space-y-4">
            <p className="text-muted-foreground whitespace-pre-line">{sections.meeting[language]}</p>
          </TabsContent>

          <TabsContent value="cancellation" className="mt-4 space-y-4">
            <p className="text-muted-foreground whitespace-pre-line">{sections.cancellation[language]}</p>
          </TabsContent>

          <TabsContent value="faqs" className="mt-4 space-y-4">
            {sections.faqs[language].map((faq, index) => (
              <div key={index} className="border-b pb-4 last:border-0">
                <h4 className="font-semibold mb-2">{faq.q}</h4>
                <p className="text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </TabsContent>
        </Tabs>

        <div className="flex gap-3 mt-6 pt-6 border-t">
          <Button onClick={() => onOpenChange(false)} variant="outline" className="flex-1">
            {language === 'en' ? 'Close' : 'Cerrar'}
          </Button>
          <Button 
            className="flex-1 ocean-gradient font-semibold" 
            onClick={scrollToContact}
          >
            {language === 'en' ? 'Book Now' : 'Reservar'} — ${experience.price} MXN
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
