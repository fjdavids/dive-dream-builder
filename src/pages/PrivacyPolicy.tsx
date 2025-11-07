import { Shield } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Helmet } from 'react-helmet';

export default function PrivacyPolicy() {
  const { t } = useLanguage();

  const points = [
    t.privacy.point1,
    t.privacy.point2,
    t.privacy.point3,
    t.privacy.point4,
  ];

  return (
    <>
      <Helmet>
        <title>{t.privacy.metaTitle}</title>
        <meta name="description" content={t.privacy.metaDescription} />
        <meta property="og:title" content={t.privacy.metaTitle} />
        <meta property="og:description" content={t.privacy.metaDescription} />
      </Helmet>

      <div className="flex flex-col">
        {/* Header */}
        <section className="py-16 md:py-24 ocean-gradient text-white">
          <div className="container text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-6">
              <Shield className="h-5 w-5" />
              <span className="font-medium">{t.privacy.title}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">{t.privacy.title}</h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
              {t.privacy.subtitle}
            </p>
          </div>
        </section>

        {/* Privacy Content */}
        <section className="py-16 md:py-24">
          <div className="container max-w-4xl">
            <Card className="mb-8">
              <CardContent className="p-8">
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  {t.privacy.intro}
                </p>
                <ul className="space-y-4">
                  {points.map((point, idx) => (
                    <li key={idx} className="flex gap-3">
                      <span className="text-primary font-bold">•</span>
                      <span className="text-muted-foreground">{point}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </>
  );
}