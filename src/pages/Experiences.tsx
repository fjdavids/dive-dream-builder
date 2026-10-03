import { Link, useSearchParams } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import ExperienceCard from '@/components/ExperienceCard';
import { Button } from '@/components/ui/button';
import SEO from '@/components/SEO';
import { CATEGORIES, catalog, itemsByCategory, type CategoryId } from '@/data/catalog';

/** Intent shortcuts — reproducible via ?filter= */
const INTENT_FILTERS: Record<string, string[]> = {
  certified: ['certified-local-diving', 'cenote-diving', 'cozumel-diving'],
  padi: ['padi-scuba-diver', 'padi-open-water-diver'],
  family: [
    'reef-snorkel-adventure',
    'tres-rios-herradura-snorkel',
    'family-cenote-snorkeling',
    'manatee-snorkeling',
    'hobie-cat-sailing',
    'hobie-cat-sailing-snorkel',
    'paddleboard-ojo-de-agua',
    'free-pool-scuba-demo',
    'scuba-kids',
  ],
};

export default function Experiences() {
  const { language } = useLanguage();
  const [params, setParams] = useSearchParams();
  const category = (params.get('category') ?? 'all') as CategoryId | 'all';
  const intent = params.get('filter');

  const valid = CATEGORIES.some((c) => c.id === category) ? category : 'all';
  let list = itemsByCategory(valid);
  if (intent && INTENT_FILTERS[intent]) {
    list = catalog.filter((c) => INTENT_FILTERS[intent].includes(c.slug));
  }

  const choose = (id: string) => {
    const next = new URLSearchParams();
    if (id !== 'all') next.set('category', id);
    setParams(next);
  };

  const title = language === 'en' ? 'Find Your Experience' : 'Encuentra tu experiencia';
  const intro =
    language === 'en'
      ? 'Explore diving, snorkeling, sailing and water activities in the Riviera Maya. Choose an experience to view the details and request availability for your date.'
      : 'Explora experiencias de buceo, snorkel, vela y actividades acuáticas en la Riviera Maya. Elige una experiencia para ver sus detalles y consultar disponibilidad para tu fecha.';

  return (
    <div className="flex flex-col">
      <SEO title={`${title} | DiveLife`} description={intro} path="/experiences" locale={language} />

      <section className="py-16 md:py-24 ocean-gradient-soft">
        <div className="container text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">{title}</h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">{intro}</p>
        </div>
      </section>

      <section className="py-8 border-b sticky top-16 bg-background/95 backdrop-blur z-40">
        <div className="container">
          <div className="flex flex-wrap gap-3 justify-center" role="group" aria-label={title}>
            {CATEGORIES.map((c) => {
              const active = !intent && valid === c.id;
              return (
                <Button
                  key={c.id}
                  variant={active ? 'default' : 'outline'}
                  aria-pressed={active}
                  onClick={() => choose(c.id)}
                >
                  {c.label[language]}
                </Button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {list.map((item) => (
              <ExperienceCard key={item.id} item={item} />
            ))}
          </div>

          {list.length === 0 && (
            <p className="text-center py-16 text-lg text-muted-foreground">
              {language === 'en' ? (
                <>No experiences match this selection. <button className="link-editorial" onClick={() => choose('all')}>View all experiences</button> or <Link className="link-editorial" to="/contact">contact us for assistance</Link>.</>
              ) : (
                <>No hay experiencias para esta selección. <button className="link-editorial" onClick={() => choose('all')}>Consulta todas las experiencias</button> o <Link className="link-editorial" to="/contact">contáctanos para recibir orientación</Link>.</>
              )}
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
