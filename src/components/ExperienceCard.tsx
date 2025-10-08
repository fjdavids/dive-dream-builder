import { Clock, Users, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';

interface ExperienceCardProps {
  title: string;
  slug: string;
  image: string;
  duration: string;
  level: string;
  minAge: string;
  price: string;
}

export default function ExperienceCard({
  title,
  slug,
  image,
  duration,
  level,
  minAge,
  price,
}: ExperienceCardProps) {
  const { t } = useLanguage();

  return (
    <Card className="overflow-hidden group hover:ocean-shadow smooth-transition">
      <Link to={`/experiences/${slug}`}>
        <div className="relative overflow-hidden aspect-[4/3]">
          <img
            src={image}
            alt={title}
            className="object-cover w-full h-full group-hover:scale-110 smooth-transition"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 smooth-transition" />
        </div>
      </Link>

      <CardContent className="p-6">
        <Link to={`/experiences/${slug}`}>
          <h3 className="text-xl font-bold mb-4 group-hover:text-primary smooth-transition">
            {title}
          </h3>
        </Link>

        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{t.experiences.duration}: {duration}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>{t.experiences.level}: {level}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{t.experiences.minAge}: {minAge}</span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t">
          <p className="text-2xl font-bold text-primary">
            {t.experiences.from} ${price} <span className="text-sm font-normal text-muted-foreground">MXN</span>
          </p>
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0">
        <Button asChild className="w-full ocean-gradient">
          <Link to={`/experiences/${slug}`}>{t.experiences.book}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
