import { Link, Navigate, useParams } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { getImage } from '@/data/imageMap';
import {
  CANCELLATION_SUMMARY,
  CATEGORIES,
  HOW_TO_BOOK,
  UNKNOWN,
  firstSentence,
  getBySlug,
  resolveLegacySlug,
  whatsappForProduct,
} from '@/data/catalog';
import { CTA, PHONE_ALT, flowCta } from '@/i18n/requestCopy';

export default function ExperienceDetail() {
  const { slug = '' } = useParams();
  const { language } = useLanguage();

  const item = getBySlug(slug);
  if (!item) {
    const legacy = resolveLegacySlug(slug);
    if (legacy) return <Navigate to={`/experiences/${legacy.slug}`} replace />;
    return <Navigate to="/experiences" replace />;
  }

  const image = getImage(item.imageKey, language);
  const categoryLabels = item.categories
    .map((c) => CATEGORIES.find((cat) => cat.id === c)?.label[language])
    .filter(Boolean)
    .join(' · ');

  const requestHref = `/availability?experience=${item.id}&lang=${language}`;

  const facts: { label: string; value: string }[] = [
    {
      label: language === 'en' ? 'Duration' : 'Duración',
      value: UNKNOWN.duration[language],
    },
    {
      label: language === 'en' ? 'Meeting point' : 'Punto de encuentro',
      value: UNKNOWN.meeting[language],
    },
    {
      label: language === 'en' ? 'Price' : 'Precio',
      value: item.complimentary
        ? language === 'en'
          ? 'Complimentary'
          : 'Gratuita'
        : UNKNOWN.price[language],
    },
    {
      label: language === 'en' ? 'What’s included' : 'Qué incluye',
      value: UNKNOWN.includes[language],
    },
    {
      label: language === 'en' ? 'Requirements' : 'Requisitos',
      value: UNKNOWN.requirements[language],
    },
  ];

  return (
    <div className="flex flex-col">
      <SEO
        title={`${item.name[language]} | DiveLife`}
        description={firstSentence(item.description[language])}
        path={`/experiences/${item.slug}`}
        locale={language}
      />

      <article>
        <section className="border-b border-border/70">
          <div className="container grid gap-10 py-12 md:grid-cols-2 md:py-16">
            <img
              src={image.src}
              alt={image.alt[language]}
              className="aspect-[4/3] w-full rounded-sm object-cover"
              width={800}
              height={600}
            />
            <div>
              {categoryLabels && <p className="eyebrow mb-4">{categoryLabels}</p>}
              <h1 className="mb-5 font-serif text-4xl font-normal leading-tight md:text-5xl">
                {item.name[language]}
              </h1>
              <p className="mb-8 text-lg text-muted-foreground">
                {item.description[language]}
              </p>
              {item.note && (
                <p className="mb-8 border-l-2 border-sand pl-4 text-sm">
                  {item.note[language]}
                </p>
              )}
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg">
                  <Link to={requestHref}>{flowCta(item.flow, language)}</Link>
                </Button>
                <Button variant="outline" asChild>
                  <a
                    href={whatsappForProduct(item.name[language], language)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {CTA.whatsapp[language]}
                  </a>
                </Button>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">{PHONE_ALT[language]}</p>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="container grid gap-12 md:grid-cols-2">
            <div>
              <h2 className="mb-6 font-serif text-3xl font-normal">
                {language === 'en' ? 'Activity details' : 'Detalles de la actividad'}
              </h2>
              <dl className="divide-y divide-border/70 border-y border-border/70">
                {facts.map((f) => (
                  <div key={f.label} className="py-4">
                    <dt className="text-sm font-medium">{f.label}</dt>
                    <dd className="text-sm text-muted-foreground">{f.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div>
              <h2 className="mb-6 font-serif text-3xl font-normal">
                {language === 'en' ? 'How to book' : 'Cómo reservar'}
              </h2>
              <ol className="mb-10 list-decimal space-y-3 pl-5 text-muted-foreground">
                {HOW_TO_BOOK[language].map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>

              <h2 className="mb-4 font-serif text-3xl font-normal">
                {language === 'en' ? 'Cancellation' : 'Cancelación'}
              </h2>
              <p className="text-muted-foreground">
                {CANCELLATION_SUMMARY[language]}{' '}
                <Link className="link-editorial" to="/cancellation-policy">
                  {language === 'en' ? 'Cancellation Policy' : 'Política de cancelación'}
                </Link>
              </p>

              <div className="mt-10">
                <Button asChild>
                  <Link to={requestHref}>{flowCta(item.flow, language)}</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </article>
    </div>
  );
}
