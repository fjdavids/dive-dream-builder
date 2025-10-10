import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Experience } from '@/data/allExperiences';

interface ExperienceAccordionProps {
  experience: Experience;
}

export default function ExperienceAccordion({ experience }: ExperienceAccordionProps) {
  const { language } = useLanguage();
  
  const sections = experience.sections;
  
  return (
    <div className="w-full" id="experience-details">
      <Accordion type="multiple" className="w-full">
        <AccordionItem value="overview">
          <AccordionTrigger className="text-lg font-semibold">
            {language === 'en' ? 'Overview' : 'Descripción'}
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground whitespace-pre-line">
            {sections.overview[language]}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="itinerary">
          <AccordionTrigger className="text-lg font-semibold">
            {language === 'en' ? 'Itinerary' : 'Itinerario'}
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground whitespace-pre-line">
            {sections.itinerary[language]}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="includes">
          <AccordionTrigger className="text-lg font-semibold">
            {language === 'en' ? 'What\'s Included' : 'Qué Incluye'}
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground whitespace-pre-line">
            {sections.includes[language]}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="bring">
          <AccordionTrigger className="text-lg font-semibold">
            {language === 'en' ? 'What to Bring' : 'Qué Llevar'}
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground whitespace-pre-line">
            {sections.bring[language]}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="requirements">
          <AccordionTrigger className="text-lg font-semibold">
            {language === 'en' ? 'Requirements' : 'Requisitos'}
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground whitespace-pre-line">
            {sections.requirements[language]}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="meeting">
          <AccordionTrigger className="text-lg font-semibold">
            {language === 'en' ? 'Meeting Point & Access' : 'Punto de Encuentro y Acceso'}
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground whitespace-pre-line">
            {sections.meeting[language]}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="cancellation">
          <AccordionTrigger className="text-lg font-semibold">
            {language === 'en' ? 'Cancellation Policy' : 'Política de Cancelación'}
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground whitespace-pre-line">
            {sections.cancellation[language]}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="faqs">
          <AccordionTrigger className="text-lg font-semibold">
            {language === 'en' ? 'Frequently Asked Questions' : 'Preguntas Frecuentes'}
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              {sections.faqs[language].map((faq, index) => (
                <div key={index} className="border-b pb-4 last:border-0">
                  <h4 className="font-semibold mb-2">{faq.q}</h4>
                  <p className="text-muted-foreground">{faq.a}</p>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
