import { Link, useLocation, Navigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { getById, whatsappForRequest } from '@/data/catalog';
import { CTA, RECEIPT } from '@/i18n/requestCopy';

interface ReceiptState {
  reference?: string;
  experienceId?: string;
  variant?: string;
  preferredDate?: string;
  flexibleDates?: boolean;
  adults?: number;
  children?: number;
  email?: string;
  flow?: 'availability' | 'quote' | 'complimentary';
}

export default function RequestReceived() {
  const { language } = useLanguage();
  const location = useLocation();
  const state = (location.state ?? {}) as ReceiptState;

  // Only reachable after a request was actually stored.
  if (!state.reference) {
    return <Navigate to="/availability" replace />;
  }

  const item = state.experienceId ? getById(state.experienceId) : undefined;
  const productName = item?.name[language] ?? '';
  const body =
    state.flow === 'complimentary'
      ? RECEIPT.bodyComplimentary[language](state.reference)
      : RECEIPT.body[language](state.reference);

  const L = RECEIPT.labels;
  const rows: { label: string; value: string }[] = [
    productName ? { label: L.product[language], value: productName } : null,
    state.variant ? { label: L.option[language], value: state.variant } : null,
    {
      label: L.date[language],
      value: state.flexibleDates
        ? L.flexible[language]
        : state.preferredDate ?? '',
    },
    {
      label: L.participants[language],
      value:
        language === 'es'
          ? `${state.adults ?? 0} adultos, ${state.children ?? 0} menores`
          : `${state.adults ?? 0} adults, ${state.children ?? 0} children`,
    },
    state.email ? { label: L.email[language], value: state.email } : null,
    { label: L.reference[language], value: state.reference },
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <div className="flex flex-col">
      <SEO
        title={`${RECEIPT.title[language]} | DiveLife`}
        description={RECEIPT.title[language]}
        path="/request-received"
        locale={language}
        noindex
      />

      <section className="py-16 md:py-24">
        <div className="container max-w-2xl">
          <h1 className="mb-6 font-serif text-4xl font-normal leading-tight md:text-5xl">
            {RECEIPT.title[language]}
          </h1>
          <p className="mb-10 text-lg text-muted-foreground">{body}</p>

          <dl className="mb-10 divide-y divide-border/70 border-y border-border/70">
            {rows.map((row) => (
              <div key={row.label} className="flex flex-wrap gap-2 py-3">
                <dt className="w-56 text-sm font-medium">{row.label}</dt>
                <dd className="text-sm text-muted-foreground">{row.value}</dd>
              </div>
            ))}
          </dl>

          <div className="flex flex-wrap gap-4">
            <Button asChild>
              <a
                href={whatsappForRequest(state.reference, productName, language)}
                target="_blank"
                rel="noopener noreferrer"
              >
                {CTA.whatsapp[language]}
              </a>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/experiences">{CTA.backToExperiences[language]}</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
