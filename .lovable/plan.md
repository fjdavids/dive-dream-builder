
# Plan de implementación — DiveLife SEO + i18n

**Restricciones confirmadas:** no tocar diseño, no inventar datos, no reemplazar imágenes. Ejecución iterativa; entrego cada iteración y espero tu OK antes de la siguiente.

## Iteración 1 — Base SEO técnica (sin cambio de URLs todavía)

Objetivo: que cada ruta actual tenga head único, HTML pre-renderizado y datos estructurados válidos, sin romper nada.

1. **Prerender estático**
   - Añadir `vite-plugin-prerender` (o `react-snap`) al build.
   - Prerender de todas las rutas en `App.tsx` (Home, Experiences, Location, About, FAQs, Cancellation, Terms, Privacy, Contact).
   - Verificar que el HTML servido contiene `<title>`, `<meta description>`, `<h1>` y texto principal sin JS.

2. **react-helmet-async por ruta**
   - Provider en `main.tsx`.
   - Componente `<SEO>` reutilizable con title, description, canonical, og:*, twitter:*, hreflang, JSON-LD.
   - Insertarlo en cada página con títulos EN/ES según `LanguageContext`.

3. **JSON-LD**
   - `Organization` + `WebSite` en `index.html`.
   - `BreadcrumbList` en páginas internas.
   - `TouristAttraction`/`Service` + `Offer` en cada experiencia con precio real de `prices.ts`.
   - `FAQPage` en FAQs y en experiencias con FAQ real.

4. **Sitemap & robots**
   - Reemplazar `public/sitemap.xml` estático por `scripts/generate-sitemap.ts` en `prebuild`.
   - Corregir `robots.txt` (mantener bloques por bot, añadir Disallow para `/thank-you`, `/payment-canceled`).

5. **`noindex`** en `/thank-you` y `/payment-canceled` vía Helmet.

## Iteración 2 — Migración de rutas EN + `/es/`

Solo tras validar Iteración 1.

1. **Router bilingüe**
   - Nuevas rutas EN con slugs SEO:
     - `/scuba-diving-playa-del-carmen/` (nueva página de categoría diving)
     - `/cenote-diving/`, `/cozumel-diving-from-playa-del-carmen/`, `/discover-scuba-diving/`, `/reef-diving-playa-del-carmen/` (una por experiencia real de `allExperiences.ts`)
     - `/snorkeling-playa-del-carmen/` (categoría)
     - `/private-boat-experiences/`
     - `/water-activities-grand-velas/`, `/water-activities-kanai/`
     - `/about-dive-life/`, `/diving-safety/`, `/contact/`, `/faqs/`
   - Solo se crean si hay datos reales; el resto (PADI Open Water, Kids Programs, PADI Courses, Reef Diving certified-only) queda **fuera** hasta que envíes info. Te devuelvo la lista de "faltantes".
   - Duplicar bajo `/es/` con slugs en español.

2. **Plantilla `ExperiencePage`** reutilizando componentes actuales (ExperienceCard, PreBookNotice, BookingModal). El modal de detalle actual pasa a ser también una página propia.

3. **Redirects 301**
   - `/experiences` → `/scuba-diving-playa-del-carmen/`
   - `/about` y `/about-safety` → `/about-dive-life/`
   - `/cancellation-policy`, `/terms-conditions`, `/privacy-policy` se mantienen pero añaden equivalentes `/es/`.
   - Implementadas vía componente `<Navigate replace>` de react-router (SPA) **y** metadatos para prerender emitiendo canonical al destino.
   - Notarás: redirects 301 reales requieren config de hosting; en Lovable el SPA fallback devuelve 200. Documento esta limitación como acción externa.

4. **Selector de idioma** pasa de togglear estado a `<a href>` a la URL equivalente (mantiene el diseño del switcher actual).

5. **hreflang recíproco** en cada par EN/ES y `x-default` a EN.

## Iteración 3 — Contenido, accesibilidad, rendimiento

1. Revisión de jerarquía H1/H2/H3 en todas las páginas (un H1 por ruta).
2. Enlaces internos: cada experiencia enlaza 2-4 relacionadas; breadcrumbs visibles.
3. Imágenes: `width`/`height` explícitos, `loading="lazy"` fuera del hero, `fetchpriority="high"` en LCP. Sin cambiar archivos.
4. Accesibilidad: labels, focus, aria en menú, contraste de CTAs.
5. Analytics: eventos `select_activity`, `click_whatsapp`, `begin_booking`, `booking_complete` si GA4 está presente (verificar antes; no duplicar).
6. Auditoría Lighthouse móvil, corregir CLS/LCP.

## Detalles técnicos

- **Stack:** Vite 5 + React 18 + react-router-dom + Tailwind + shadcn. Sin cambio de framework.
- **Dependencias nuevas:** `react-helmet-async`, `vite-plugin-prerender` (o `react-snap`), nada más.
- **Datos:** consumidos de `src/data/allExperiences.ts`, `prices.ts`, `translations.ts`. Cero contenido nuevo inventado.
- **Componentes reutilizados al 100%:** Header, Footer, NoticeBar, ExperienceCard, ExperienceAccordion, BookingModal, PreBookNotice, HeroSlideshow, WhatsAppButton.
- **Base URL canónica:** `https://divelife.mx` (según robots.txt actual).

## Acciones externas (fuera del código, te las devuelvo al final)

- Config de hosting para 301 reales (Lovable sirve SPA 200).
- Envío de sitemap a Search Console.
- GBP, PADI, LinkedIn, backlinks Grand Velas/Kanai.

## Datos que necesitaré de ti (bloquean páginas específicas)

- ¿Reef Diving certified se ofrece? Falta detalle propio.
- PADI Open Water y otros cursos PADI: sin datos en el proyecto.
- Kids Programs: sin datos.
- Dirección física de operación (para LocalBusiness schema).
- Teléfono/email públicos confirmados.

---

**Confirma y arranco con la Iteración 1.** Si prefieres otro orden (p. ej. crear rutas primero), dímelo antes.
