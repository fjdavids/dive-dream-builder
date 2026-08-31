import { useState } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, Calendar, Info, MapPin } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Experience } from '@/data/allExperiences';
import ExperienceModal from './ExperienceModal';
import BookingModal from './BookingModal';

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
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBookNow = () => {
    if (price === 'contact') {
      scrollToContact();
      return;
    }

    // Open booking modal instead of direct PayPal
    setBookingModalOpen(true);
  };

  return (
    <>
      <article
        className="group flex h-full flex-col overflow-hidden rounded-sm border border-border/70 bg-white smooth-transition hover:border-primary/25"
        data-exp-price={experience.slug}
        data-amount={price !== 'contact' ? price : undefined}
      >
        <div
          className="relative aspect-[4/3] overflow-hidden cursor-pointer"
          onClick={() => setModalOpen(true)}
        >
          <img
            src={image}
            alt={language === 'en' 
              ? `${title} — DiveLife Playa del Carmen | Premium ocean adventure in the Mexican Caribbean`
              : `${title} — DiveLife Playa del Carmen | Aventura oceánica premium en el Caribe Mexicano`}
            className="h-full w-full object-cover smooth-transition group-hover:scale-[1.03]"
            loading="lazy"
          />
        </div>

        <div className="flex flex-1 flex-col p-6 md:p-7">
          {experience.category && (
            <p className="eyebrow mb-4">
              {experience.category.charAt(0).toUpperCase() + experience.category.slice(1)}
            </p>
          )}

          <h3 className="mb-3 font-serif text-[1.75rem] font-normal leading-tight tracking-tight">
            <button type="button" onClick={() => setModalOpen(true)} className="text-left hover:text-ocean-teal smooth-transition">
              {title}
            </button>
          </h3>

          <p className="mb-6 line-clamp-3 text-[0.9375rem] text-muted-foreground">
            {experience.shortDesc[language]}
          </p>

          <dl className="mb-7 grid grid-cols-2 gap-x-6 gap-y-3 border-t border-border/70 pt-5 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 flex-shrink-0 text-sand" />
              <span className="line-clamp-1">{duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 flex-shrink-0 text-sand" />
              <span className="line-clamp-1">{level}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 flex-shrink-0 text-sand" />
              <span className="line-clamp-1">{language === 'en' ? 'Age' : 'Edad'}: {minAge}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 flex-shrink-0 text-sand" />
              <span className="line-clamp-1">{experience.meetingPoint[language].split('/')[0].trim()}</span>
            </div>
          </dl>

          <div className="mt-auto flex flex-wrap items-center gap-x-7 gap-y-3">
            <Button
              onClick={handleBookNow}
              aria-label={price === 'contact'
                ? (language === 'en' ? `Request info: ${title}` : `Solicitar info: ${title}`)
                : (language === 'en' ? `Book now: ${title}` : `Reservar ahora: ${title}`)}
            >
              {price === 'contact' 
                ? (language === 'en' ? 'Request Info' : 'Solicitar Info')
                : (language === 'en' ? 'Book Now' : 'Reservar')}
            </Button>
            <button type="button" className="link-editorial" onClick={() => setModalOpen(true)}>
              {language === 'en' ? `Explore ${title}` : `Explorar ${title}`}
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </article>


      <ExperienceModal 
        experience={experience}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />

      <BookingModal
        slug={experience.slug}
        title={title}
        locale={language}
        open={bookingModalOpen}
        onOpenChange={setBookingModalOpen}
      />
    </>
  );
}
