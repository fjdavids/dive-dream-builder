import { FileText, AlertCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Helmet } from 'react-helmet';

export default function CancellationPolicy() {
  const { t } = useLanguage();

  const policies = [
    { title: t.cancellation.policy1Title, text: t.cancellation.policy1Text },
    { title: t.cancellation.policy2Title, text: t.cancellation.policy2Text },
    { title: t.cancellation.policy3Title, text: t.cancellation.policy3Text },
    { title: t.cancellation.policy4Title, text: t.cancellation.policy4Text },
    { title: t.cancellation.policy5Title, text: t.cancellation.policy5Text },
  ];

  return (
    <>
      <Helmet>
        <title>{t.cancellation.metaTitle}</title>
        <meta name="description" content={t.cancellation.metaDescription} />
        <meta property="og:title" content={t.cancellation.metaTitle} />
        <meta property="og:description" content={t.cancellation.metaDescription} />
      </Helmet>

      <div className="flex flex-col">
        {/* Header */}
        <section className="py-16 md:py-24 ocean-gradient text-white">
          <div className="container text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-6">
              <FileText className="h-5 w-5" />
              <span className="font-medium">{t.cancellation.title}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">{t.cancellation.title}</h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
              {t.cancellation.subtitle}
            </p>
          </div>
        </section>

        {/* Policy Content */}
        <section className="py-16 md:py-24">
          <div className="container max-w-4xl">
            <div className="grid gap-6 mb-12">
              {policies.map((policy, idx) => (
                <Card key={idx} className="hover:ocean-shadow smooth-transition">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2">{policy.title}</h3>
                    <p className="text-muted-foreground">{policy.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Important Note */}
            <Card className="border-amber-500/30 bg-amber-50/50 dark:bg-amber-950/20">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-6 w-6 text-amber-600 dark:text-amber-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-amber-900 dark:text-amber-100 mb-2">
                      {t.cancellation.noteTitle}
                    </h3>
                    <p className="text-sm text-amber-800 dark:text-amber-200 leading-relaxed">
                      {t.cancellation.noteText}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </>
  );
}