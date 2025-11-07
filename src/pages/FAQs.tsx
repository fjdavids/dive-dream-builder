import { HelpCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Helmet } from 'react-helmet';

export default function FAQs() {
  const { language, t } = useLanguage();
  
  const faqs = [
    { q: t.faqs.q1, a: t.faqs.a1 },
    { q: t.faqs.q2, a: t.faqs.a2 },
    { q: t.faqs.q3, a: t.faqs.a3 },
    { q: t.faqs.q4, a: t.faqs.a4 },
    { q: t.faqs.q5, a: t.faqs.a5 },
    { q: t.faqs.q6, a: t.faqs.a6 },
    { q: t.faqs.q7, a: t.faqs.a7 },
    { q: t.faqs.q8, a: t.faqs.a8 },
    { q: t.faqs.q9, a: t.faqs.a9 },
    { q: t.faqs.q10, a: t.faqs.a10 },
  ];

  return (
    <>
      <Helmet>
        <title>{t.faqs.metaTitle}</title>
        <meta name="description" content={t.faqs.metaDescription} />
        <meta property="og:title" content={t.faqs.metaTitle} />
        <meta property="og:description" content={t.faqs.metaDescription} />
        <meta property="og:type" content="website" />
        <link rel="canonical" href={`https://divelife.mx/${language === 'en' ? 'faqs' : 'preguntas-frecuentes'}`} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map(faq => ({
              "@type": "Question",
              "name": faq.q,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.a
              }
            }))
          })}
        </script>
      </Helmet>

      <div className="flex flex-col">
        {/* Header */}
        <section className="py-16 md:py-24 ocean-gradient text-white">
          <div className="container text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-6">
              <HelpCircle className="h-5 w-5" />
              <span className="font-medium">FAQs</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">{t.faqs.title}</h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
              {t.faqs.subtitle}
            </p>
          </div>
        </section>

        {/* FAQs Content */}
        <section className="py-16 md:py-24">
          <div className="container max-w-3xl">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, idx) => (
                <AccordionItem 
                  key={idx} 
                  value={`faq-${idx}`}
                  className="border rounded-lg px-6 bg-card hover:ocean-shadow smooth-transition"
                >
                  <AccordionTrigger className="text-left font-semibold py-6 hover:no-underline">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-6">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            {/* Related Links */}
            <div className="text-center space-y-4 mt-12">
              <p className="text-muted-foreground">{language === 'en' ? 'Related Information' : 'Información Relacionada'}</p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="/cancellation-policy" className="text-primary hover:underline">{t.footer.cancellation}</a>
                <a href="/terms-conditions" className="text-primary hover:underline">{t.footer.terms}</a>
                <a href="/privacy-policy" className="text-primary hover:underline">{t.footer.privacy}</a>
                <a href="/about-safety" className="text-primary hover:underline">{t.nav.about}</a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}