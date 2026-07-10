import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

const SITE_URL = "https://divelife.mx";
const DEFAULT_OG = "https://storage.googleapis.com/gpt-engineer-file-uploads/JIvW1aULlVdgtVAtaoG1QUe5R312/social-images/social-1762355639043-Divemaster-1-scaled.jpg";

export interface SEOProps {
  title: string;
  description: string;
  /** Path only, no domain, e.g. "/experiences". Defaults to current pathname. */
  path?: string;
  image?: string;
  noindex?: boolean;
  /** Locale of the current page: "en" or "es". */
  locale?: "en" | "es";
  /** Optional path of the equivalent page in the other language. */
  alternatePath?: string;
  /** Any extra JSON-LD objects to inject. */
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>;
}

export default function SEO({
  title,
  description,
  path,
  image = DEFAULT_OG,
  noindex = false,
  locale = "en",
  alternatePath,
  jsonLd,
}: SEOProps) {
  const location = useLocation();
  const pathname = path ?? location.pathname;
  const url = `${SITE_URL}${pathname}`;
  const ogLocale = locale === "es" ? "es_MX" : "en_US";
  const altLocale = locale === "es" ? "en" : "es";
  const jsonLdArray = jsonLd
    ? Array.isArray(jsonLd)
      ? jsonLd
      : [jsonLd]
    : [];

  return (
    <Helmet>
      <html lang={locale} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content={ogLocale} />
      {alternatePath && (
        <meta
          property="og:locale:alternate"
          content={altLocale === "es" ? "es_MX" : "en_US"}
        />
      )}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* hreflang */}
      <link rel="alternate" hrefLang={locale} href={url} />
      {alternatePath && (
        <link
          rel="alternate"
          hrefLang={altLocale}
          href={`${SITE_URL}${alternatePath}`}
        />
      )}
      <link
        rel="alternate"
        hrefLang="x-default"
        href={`${SITE_URL}${locale === "en" ? pathname : alternatePath ?? "/"}`}
      />

      {jsonLdArray.map((obj, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(obj)}
        </script>
      ))}
    </Helmet>
  );
}
