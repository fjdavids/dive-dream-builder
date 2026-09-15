import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  CONTACT,
  catalog,
  getById,
  getBySlug,
  type CatalogItem,
} from '@/data/catalog';
import {
  CTA,
  ERRORS,
  FORM,
  GUEST_TYPES,
  PHONE_ALT,
  flowSubmit,
} from '@/i18n/requestCopy';

const STORAGE_KEY = 'divelife-availability-form';

interface FormState {
  experienceId: string;
  variant: string;
  preferredDate: string;
  alternativeDate: string;
  flexibleDates: boolean;
  preferredTime: string;
  adults: string;
  children: string;
  childAges: string;
  responsibleAdult: string;
  guestType: string;
  hotelName: string;
  accommodationArea: string;
  fullName: string;
  email: string;
  phone: string;
  certification: string;
  lastDiveDate: string;
  diveCount: string;
  priorExperience: string;
  drivers: string;
  passengers: string;
  desiredDuration: string;
  details: string;
  website: string;
}

const emptyForm: FormState = {
  experienceId: '',
  variant: '',
  preferredDate: '',
  alternativeDate: '',
  flexibleDates: false,
  preferredTime: '',
  adults: '',
  children: '',
  childAges: '',
  responsibleAdult: '',
  guestType: '',
  hotelName: '',
  accommodationArea: '',
  fullName: '',
  email: '',
  phone: '',
  certification: '',
  lastDiveDate: '',
  diveCount: '',
  priorExperience: '',
  drivers: '',
  passengers: '',
  desiredDuration: '',
  details: '',
  website: '',
};

/** Today's date in America/Cancun as YYYY-MM-DD. */
function todayCancun(): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: CONTACT.timezone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date());
}

function loadStored(): Partial<FormState> {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Partial<FormState>) : {};
  } catch {
    return {};
  }
}

export default function Availability() {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [form, setForm] = useState<FormState>(() => ({ ...emptyForm, ...loadStored() }));
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const idempotencyKey = useRef<string>(
    `${Date.now()}-${Math.random().toString(36).slice(2, 12)}`
  );
  const errorBoxRef = useRef<HTMLDivElement>(null);

  // Preselect from ?experience=<id or slug>
  useEffect(() => {
    const requested = params.get('experience');
    if (!requested) return;
    const item = getById(requested) ?? getBySlug(requested);
    if (item) setForm((f) => (f.experienceId ? f : { ...f, experienceId: item.id }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep the visitor's answers across language switches and back navigation
  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ ...form, website: '' }));
    } catch { /* storage unavailable */ }
  }, [form]);

  const selected: CatalogItem | undefined = useMemo(
    () => getById(form.experienceId),
    [form.experienceId]
  );
  const flow = selected?.flow ?? 'availability';
  const extras = selected?.extraFields ?? [];
  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const adults = Number(form.adults || 0);
  const children = Number(form.children || 0);

  function validate(): Record<string, string> {
    const e: Record<string, string> = {};
    if (!selected) e.experienceId = ERRORS.experience[language];
    if (!form.fullName.trim()) e.fullName = ERRORS.name[language];
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim()))
      e.email = ERRORS.email[language];
    if (!form.flexibleDates && !form.preferredDate) e.preferredDate = ERRORS.date[language];
    if (form.preferredDate && form.preferredDate < todayCancun())
      e.preferredDate = ERRORS.pastDate[language];
    if (form.alternativeDate && form.alternativeDate < todayCancun())
      e.alternativeDate = ERRORS.pastDate[language];
    if (adults + children < 1) e.participants = ERRORS.participants[language];
    if (children > 0 && !form.childAges.trim()) e.childAges = ERRORS.childAges[language];
    if (form.phone.trim() && !form.phone.trim().startsWith('+'))
      e.phone = ERRORS.countryCode[language];
    return e;
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (submitting) return;
    setSubmitError(null);
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) {
      errorBoxRef.current?.focus();
      return;
    }
    if (!selected) return;

    setSubmitting(true);
    try {
      const { data, error } = await supabase.functions.invoke('availability-request', {
        body: {
          experienceId: selected.id,
          experienceSlug: selected.slug,
          productName: selected.name[language],
          flow: selected.flow,
          variant: form.variant,
          preferredDate: form.preferredDate,
          alternativeDate: form.alternativeDate,
          flexibleDates: form.flexibleDates,
          preferredTime: form.preferredTime,
          adults,
          children,
          childAges: form.childAges,
          responsibleAdult: form.responsibleAdult,
          guestType: form.guestType,
          hotelName: form.hotelName,
          accommodationArea: form.accommodationArea,
          fullName: form.fullName.trim(),
          email: form.email.trim(),
          phone: form.phone,
          certification: form.certification,
          lastDiveDate: form.lastDiveDate,
          diveCount: form.diveCount,
          priorExperience: form.priorExperience,
          drivers: form.drivers ? Number(form.drivers) : undefined,
          passengers: form.passengers ? Number(form.passengers) : undefined,
          desiredDuration: form.desiredDuration,
          details: form.details,
          language,
          sourcePage: window.location.pathname + window.location.search,
          idempotencyKey: idempotencyKey.current,
          website: form.website,
        },
      });

      if (error || !data?.success || !data?.reference) {
        throw new Error('save-failed');
      }

      // Success is only shown once the request is stored.
      sessionStorage.removeItem(STORAGE_KEY);
      navigate('/request-received', {
        state: {
          reference: data.reference,
          experienceId: selected.id,
          variant: form.variant,
          preferredDate: form.preferredDate,
          flexibleDates: form.flexibleDates,
          adults,
          children,
          email: form.email.trim(),
          flow: selected.flow,
        },
      });
    } catch {
      setSubmitError(ERRORS.save[language]);
      errorBoxRef.current?.focus();
    } finally {
      setSubmitting(false);
    }
  }

  const fieldError = (key: string) =>
    errors[key] ? (
      <p id={`${key}-error`} className="mt-1 text-sm text-destructive">
        {errors[key]}
      </p>
    ) : null;

  return (
    <div className="flex flex-col">
      <SEO
        title={`${FORM.pageTitle[language]} | DiveLife`}
        description={FORM.intro[language]}
        path="/availability"
        locale={language}
      />

      <section className="border-b border-border/70 py-14 md:py-20">
        <div className="container max-w-3xl">
          <h1 className="mb-5 font-serif text-4xl font-normal leading-tight md:text-5xl">
            {FORM.pageTitle[language]}
          </h1>
          <p className="mb-4 text-lg text-muted-foreground">{FORM.intro[language]}</p>
          <p className="text-sm font-medium">{FORM.notice[language]}</p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <form onSubmit={handleSubmit} noValidate className="container max-w-3xl space-y-12">
          <div
            ref={errorBoxRef}
            tabIndex={-1}
            role="alert"
            aria-live="polite"
            className="outline-none"
          >
            {submitError && (
              <div className="rounded-sm border border-destructive/40 bg-destructive/5 p-4 text-sm">
                <p>{submitError}</p>
                <p className="mt-2">
                  <a
                    className="link-editorial"
                    href={CONTACT.whatsappBase}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {CTA.whatsapp[language]}
                  </a>
                </p>
              </div>
            )}
          </div>

          {/* ---------------- Your experience ---------------- */}
          <fieldset className="space-y-6">
            <legend className="mb-2 font-serif text-2xl">{FORM.blockExperience[language]}</legend>

            <div>
              <Label htmlFor="experience">{FORM.experience[language]}</Label>
              <select
                id="experience"
                value={form.experienceId}
                onChange={(e) => {
                  set('experienceId', e.target.value);
                  set('variant', '');
                }}
                aria-invalid={!!errors.experienceId}
                aria-describedby={errors.experienceId ? 'experienceId-error' : undefined}
                className="mt-1 h-11 w-full rounded-sm border border-input bg-background px-3 text-base"
              >
                <option value="">{FORM.selectExperience[language]}</option>
                {catalog.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name[language]}
                  </option>
                ))}
              </select>
              {fieldError('experienceId')}
            </div>

            {selected?.variants && (
              <div>
                <Label htmlFor="variant">{FORM.preferredOption[language]}</Label>
                <select
                  id="variant"
                  value={form.variant}
                  onChange={(e) => set('variant', e.target.value)}
                  className="mt-1 h-11 w-full rounded-sm border border-input bg-background px-3 text-base"
                >
                  <option value="">—</option>
                  {selected.variants.map((v) => (
                    <option key={v.id} value={v.label[language]}>
                      {v.label[language]}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <Label htmlFor="preferredDate">{FORM.preferredDate[language]}</Label>
                <Input
                  id="preferredDate"
                  type="date"
                  min={todayCancun()}
                  value={form.preferredDate}
                  onChange={(e) => set('preferredDate', e.target.value)}
                  aria-invalid={!!errors.preferredDate}
                  aria-describedby={errors.preferredDate ? 'preferredDate-error' : undefined}
                  className="mt-1"
                />
                {fieldError('preferredDate')}
              </div>
              <div>
                <Label htmlFor="alternativeDate">{FORM.alternativeDate[language]}</Label>
                <Input
                  id="alternativeDate"
                  type="date"
                  min={todayCancun()}
                  value={form.alternativeDate}
                  onChange={(e) => set('alternativeDate', e.target.value)}
                  className="mt-1"
                />
                {fieldError('alternativeDate')}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Checkbox
                id="flexibleDates"
                checked={form.flexibleDates}
                onCheckedChange={(v) => set('flexibleDates', v === true)}
              />
              <Label htmlFor="flexibleDates" className="font-normal">
                {FORM.flexible[language]}
              </Label>
            </div>

            <div>
              <Label htmlFor="preferredTime">{FORM.preferredTime[language]}</Label>
              <Input
                id="preferredTime"
                value={form.preferredTime}
                onChange={(e) => set('preferredTime', e.target.value)}
                className="mt-1"
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <Label htmlFor="adults">{FORM.adults[language]}</Label>
                <Input
                  id="adults"
                  type="number"
                  min={0}
                  inputMode="numeric"
                  value={form.adults}
                  onChange={(e) => set('adults', e.target.value)}
                  aria-invalid={!!errors.participants}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="children">{FORM.children[language]}</Label>
                <Input
                  id="children"
                  type="number"
                  min={0}
                  inputMode="numeric"
                  value={form.children}
                  onChange={(e) => set('children', e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
            {errors.participants && (
              <p id="participants-error" className="text-sm text-destructive">
                {errors.participants}
              </p>
            )}

            {children > 0 && (
              <>
                <div>
                  <Label htmlFor="childAges">{FORM.childAges[language]}</Label>
                  <Input
                    id="childAges"
                    value={form.childAges}
                    onChange={(e) => set('childAges', e.target.value)}
                    aria-invalid={!!errors.childAges}
                    aria-describedby={errors.childAges ? 'childAges-error' : undefined}
                    className="mt-1"
                  />
                  {fieldError('childAges')}
                </div>
                <div>
                  <Label htmlFor="responsibleAdult">{FORM.responsibleAdult[language]}</Label>
                  <Input
                    id="responsibleAdult"
                    value={form.responsibleAdult}
                    onChange={(e) => set('responsibleAdult', e.target.value)}
                    className="mt-1"
                  />
                </div>
              </>
            )}

            {extras.includes('certification') && (
              <div className="grid gap-6 md:grid-cols-3">
                <div>
                  <Label htmlFor="certification">{FORM.certification[language]}</Label>
                  <Input
                    id="certification"
                    value={form.certification}
                    onChange={(e) => set('certification', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="lastDiveDate">{FORM.lastDive[language]}</Label>
                  <Input
                    id="lastDiveDate"
                    value={form.lastDiveDate}
                    onChange={(e) => set('lastDiveDate', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="diveCount">{FORM.diveCount[language]}</Label>
                  <Input
                    id="diveCount"
                    value={form.diveCount}
                    onChange={(e) => set('diveCount', e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>
            )}

            {(extras.includes('snorkelExperience') ||
              extras.includes('paddleboardExperience')) && (
              <div>
                <Label htmlFor="priorExperience">
                  {extras.includes('snorkelExperience')
                    ? FORM.snorkelExperience[language]
                    : FORM.paddleboardExperience[language]}
                </Label>
                <Textarea
                  id="priorExperience"
                  value={form.priorExperience}
                  onChange={(e) => set('priorExperience', e.target.value)}
                  className="mt-1"
                  rows={3}
                />
              </div>
            )}

            {extras.includes('jetSkiRiders') && (
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <Label htmlFor="drivers">{FORM.drivers[language]}</Label>
                  <Input
                    id="drivers"
                    type="number"
                    min={0}
                    value={form.drivers}
                    onChange={(e) => set('drivers', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="passengers">{FORM.passengers[language]}</Label>
                  <Input
                    id="passengers"
                    type="number"
                    min={0}
                    value={form.passengers}
                    onChange={(e) => set('passengers', e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>
            )}

            {extras.includes('desiredDuration') && (
              <div>
                <Label htmlFor="desiredDuration">{FORM.desiredDuration[language]}</Label>
                <Input
                  id="desiredDuration"
                  value={form.desiredDuration}
                  onChange={(e) => set('desiredDuration', e.target.value)}
                  className="mt-1"
                />
              </div>
            )}
          </fieldset>

          {/* ---------------- Your stay ---------------- */}
          <fieldset className="space-y-6">
            <legend className="mb-2 font-serif text-2xl">{FORM.blockStay[language]}</legend>

            <div>
              <Label htmlFor="guestType">{FORM.whereStaying[language]}</Label>
              <select
                id="guestType"
                value={form.guestType}
                onChange={(e) => set('guestType', e.target.value)}
                className="mt-1 h-11 w-full rounded-sm border border-input bg-background px-3 text-base"
              >
                <option value="">—</option>
                {GUEST_TYPES.map((g) => (
                  <option key={g.id} value={g.label[language]}>
                    {g.label[language]}
                  </option>
                ))}
              </select>
            </div>

            {(form.guestType === GUEST_TYPES[0].label[language] ||
              form.guestType === GUEST_TYPES[2].label[language]) && (
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <Label htmlFor="hotelName">{FORM.hotel[language]}</Label>
                  <Input
                    id="hotelName"
                    value={form.hotelName}
                    onChange={(e) => set('hotelName', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="accommodationArea">{FORM.area[language]}</Label>
                  <Input
                    id="accommodationArea"
                    value={form.accommodationArea}
                    onChange={(e) => set('accommodationArea', e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>
            )}
          </fieldset>

          {/* ---------------- Your contact details ---------------- */}
          <fieldset className="space-y-6">
            <legend className="mb-2 font-serif text-2xl">{FORM.blockContact[language]}</legend>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <Label htmlFor="fullName">{FORM.fullName[language]}</Label>
                <Input
                  id="fullName"
                  value={form.fullName}
                  onChange={(e) => set('fullName', e.target.value)}
                  aria-invalid={!!errors.fullName}
                  aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                  className="mt-1"
                />
                {fieldError('fullName')}
              </div>
              <div>
                <Label htmlFor="email">{FORM.email[language]}</Label>
                <Input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => set('email', e.target.value)}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  className="mt-1"
                />
                {fieldError('email')}
              </div>
            </div>

            <div>
              <Label htmlFor="phone">{FORM.phone[language]}</Label>
              <Input
                id="phone"
                inputMode="tel"
                placeholder="+52"
                value={form.phone}
                onChange={(e) => set('phone', e.target.value)}
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? 'phone-error' : undefined}
                className="mt-1"
              />
              <p className="mt-1 text-xs text-muted-foreground">
                {FORM.countryCode[language]}
              </p>
              {fieldError('phone')}
            </div>

            <div>
              <Label htmlFor="details">{FORM.details[language]}</Label>
              <Textarea
                id="details"
                rows={4}
                maxLength={2000}
                value={form.details}
                onChange={(e) => set('details', e.target.value)}
                className="mt-1"
              />
            </div>

            {/* accessible honeypot: hidden from assistive tech and keyboard */}
            <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
              <label htmlFor="website">Website</label>
              <input
                id="website"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                value={form.website}
                onChange={(e) => set('website', e.target.value)}
              />
            </div>
          </fieldset>

          <div className="space-y-4 border-t border-border/70 pt-8">
            <Button type="submit" size="lg" disabled={submitting}>
              {submitting ? FORM.sending[language] : flowSubmit(flow, language)}
            </Button>
            <p className="text-sm text-muted-foreground">
              {FORM.privacy[language]}{' '}
              <Link className="link-editorial" to="/privacy-policy">
                {FORM.privacyLink[language]}
              </Link>
            </p>
            <p className="text-sm text-muted-foreground">{PHONE_ALT[language]}</p>
            <p className="text-sm font-medium">{FORM.notice[language]}</p>
          </div>
        </form>
      </section>
    </div>
  );
}
