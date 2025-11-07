import { FileCheck } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Helmet } from 'react-helmet';

export default function TermsConditions() {
  const { t, language } = useLanguage();

  const terms = [
    t.terms.term1,
    t.terms.term2,
    t.terms.term3,
    t.terms.term4,
    t.terms.term5,
    t.terms.term6,
    t.terms.term7,
    t.terms.term8,
    t.terms.term9,
  ];

  return (
    <>
      <Helmet>
        <title>{t.terms.metaTitle}</title>
        <meta name="description" content={t.terms.metaDescription} />
        <meta property="og:title" content={t.terms.metaTitle} />
        <meta property="og:description" content={t.terms.metaDescription} />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://divelife.mx/terms-conditions" />
      </Helmet>

      <div className="flex flex-col">
        {/* Header */}
        <section className="py-16 md:py-24 ocean-gradient text-white">
          <div className="container text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-6">
              <FileCheck className="h-5 w-5" />
              <span className="font-medium">{t.terms.title}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">{t.terms.title}</h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
              {t.terms.subtitle}
            </p>
          </div>
        </section>

        {/* Terms Content */}
        <section className="py-16 md:py-24">
          <div className="container max-w-4xl">
            <Card>
              <CardContent className="p-8">
                <ol className="space-y-4">
                  {terms.map((term, idx) => (
                    <li key={idx} className="flex gap-3">
                      <span className="font-bold text-primary min-w-[2rem]">{idx + 1}.</span>
                      <span className="text-muted-foreground">{term}</span>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>

            {/* Related Links */}
            <div className="text-center space-y-4 mt-8">
              <p className="text-muted-foreground">{language === 'en' ? 'Related Information' : 'Información Relacionada'}</p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="/cancellation-policy" className="text-primary hover:underline">{t.footer.cancellation}</a>
                <a href="/privacy-policy" className="text-primary hover:underline">{t.footer.privacy}</a>
                <a href="/faqs" className="text-primary hover:underline">{t.nav.faqs}</a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}