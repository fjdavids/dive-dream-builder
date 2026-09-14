# DiveLife implementation roadmap

## Phase 1 — Data + request pipeline
- [x] `availability_requests` table (server-only access, reference, email statuses)
- [x] Single source of truth catalog: 22 products, slugs, EN/ES copy, categories, flow, variants, extra fields
- [x] Shared bilingual copy for /availability, receipt, errors
- [x] Edge function `availability-request`: validate → save → reference → notify info@divelife.mx → client ack → record provider result
- [x] `/availability` shared form page (not a modal)
- [x] `/request-received` receipt page (noindex)

## Phase 2 — Pages and navigation
- [x] `/experiences/{slug}` individual pages + legacy slug redirects
- [x] Catalog copy, filters (multi-category), empty state
- [x] Header / mobile menu "Check Availability" → /availability, `/#contact` removed
- [x] Card CTAs by flow, Cozumel + Private Catamaran repaired, old pre-booking modal removed
- [x] Single cancellation policy (48h/24h rules) centralized + published
- [x] FAQ exact 6 questions, Contact page copy + topics, About/safety wording

## Phase 3 — QA
- [x] Build + prerender
- [x] Playwright route/CTA/form checks EN/ES, mobile + desktop
- [x] One controlled test email to info@divelife.mx

## Open (blocked)
- Admin panel for quote/payment states: needs an authenticated staff login decision from the owner.
- Verified commercial data (prices, durations, capacities, meeting points) — not supplied, so pages show "confirmed in your quote" wording.
- Verified email sender domain for Resend (`info@divelife.mx`) — delivery cannot be confirmed until the domain is verified.
