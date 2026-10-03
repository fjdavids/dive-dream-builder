import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { CATEGORIES, firstSentence, type CatalogItem } from '@/data/catalog';
import { getImage } from '@/data/imageMap';
import { CTA, flowCta } from '@/i18n/requestCopy';

interface ExperienceCardProps {
  item: CatalogItem;
}

export default function ExperienceCard({ item }: ExperienceCardProps) {
  const { language } = useLanguage();
  const image = getImage(item.imageKey, language);
  const title = item.name[language];
  const detailHref = `/experiences/${item.slug}`;
  const requestHref = `/availability?experience=${item.id}&lang=${language}`;
  const categoryLabel = item.categories
    .map((c) => CATEGORIES.find((cat) => cat.id === c)?.label[language])
    .filter(Boolean)
    .join(' · ');

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-sm border border-border/70 bg-card smooth-transition hover:border-primary/25">
      <Link to={detailHref} className="relative block aspect-[4/3] overflow-hidden" tabIndex={-1} aria-hidden="true">
        <img
          src={image.src}
          alt=""
          className="h-full w-full object-cover smooth-transition group-hover:scale-[1.03]"
          loading="lazy"
          width={800}
          height={600}
        />
      </Link>

      <div className="flex flex-1 flex-col p-6 md:p-7">
        {categoryLabel && <p className="eyebrow mb-4">{categoryLabel}</p>}

        <h3 className="mb-3 font-serif text-[1.75rem] font-normal leading-tight tracking-tight">
          <Link to={detailHref} className="hover:text-ocean-teal smooth-transition">
            {title}
          </Link>
        </h3>

        <p className="mb-6 text-[0.9375rem] text-muted-foreground">
          {firstSentence(item.description[language])}
        </p>

        <div className="mt-auto flex flex-wrap items-center gap-x-7 gap-y-3">
          <Button asChild>
            <Link to={requestHref} aria-label={`${flowCta(item.flow, language)}: ${title}`}>
              {flowCta(item.flow, language)}
            </Link>
          </Button>
          <Link to={detailHref} className="link-editorial" aria-label={`${CTA.viewExperience[language]}: ${title}`}>
            {CTA.viewExperience[language]}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
