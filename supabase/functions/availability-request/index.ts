import { createClient } from 'npm:@supabase/supabase-js@2';
import { z } from 'npm:zod@3.23.8';
import { checkRateLimit, getClientIp, rateLimitResponse } from '../_shared/rateLimit.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const TO_EMAIL = Deno.env.get('CONTACT_TO_EMAIL') ?? 'info@divelife.mx';
const FROM_EMAIL =
  Deno.env.get('CONTACT_FROM_EMAIL') ?? 'DiveLife Website <onboarding@resend.dev>';

const BodySchema = z.object({
  experienceId: z.string().trim().min(1).max(40),
  experienceSlug: z.string().trim().regex(/^[a-z0-9-]{1,64}$/),
  productName: z.string().trim().min(1).max(120),
  flow: z.enum(['availability', 'quote', 'complimentary']).default('availability'),
  variant: z.string().trim().max(120).optional().or(z.literal('')),
  preferredDate: z.string().trim().max(10).optional().or(z.literal('')),
  alternativeDate: z.string().trim().max(10).optional().or(z.literal('')),
  flexibleDates: z.boolean().default(false),
  preferredTime: z.string().trim().max(40).optional().or(z.literal('')),
  adults: z.number().int().min(0).max(60),
  children: z.number().int().min(0).max(60),
  childAges: z.string().trim().max(120).optional().or(z.literal('')),
  responsibleAdult: z.string().trim().max(120).optional().or(z.literal('')),
  guestType: z.string().trim().max(40).optional().or(z.literal('')),
  hotelName: z.string().trim().max(160).optional().or(z.literal('')),
  accommodationArea: z.string().trim().max(160).optional().or(z.literal('')),
  fullName: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(40).optional().or(z.literal('')),
  certification: z.string().trim().max(120).optional().or(z.literal('')),
  lastDiveDate: z.string().trim().max(40).optional().or(z.literal('')),
  diveCount: z.string().trim().max(40).optional().or(z.literal('')),
  priorExperience: z.string().trim().max(400).optional().or(z.literal('')),
  drivers: z.number().int().min(0).max(30).optional(),
  passengers: z.number().int().min(0).max(30).optional(),
  desiredDuration: z.string().trim().max(80).optional().or(z.literal('')),
  details: z.string().trim().max(2000).optional().or(z.literal('')),
  language: z.enum(['en', 'es']).default('en'),
  sourcePage: z.string().trim().max(200).optional().or(z.literal('')),
  idempotencyKey: z.string().trim().min(8).max(80),
  // accessible honeypot — must stay empty
  website: z.string().max(0).optional().or(z.literal('')),
});

function esc(v: unknown): string {
  return String(v ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function makeReference(): string {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const bytes = crypto.getRandomValues(new Uint8Array(6));
  const code = Array.from(bytes, (b) => alphabet[b % alphabet.length]).join('');
  const y = new Date().getFullYear().toString().slice(-2);
  return `DL-${y}-${code}`;
}

async function sendEmail(
  key: string,
  payload: Record<string, unknown>
): Promise<{ ok: boolean; id: string | null; error: string | null }> {
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const text = await res.text();
    if (!res.ok) {
      console.error('[availability-request] Resend error', res.status, text.slice(0, 300));
      return { ok: false, id: null, error: `RESEND_${res.status}` };
    }
    let id: string | null = null;
    try {
      id = JSON.parse(text)?.id ?? null;
    } catch { /* ignore */ }
    return { ok: true, id, error: null };
  } catch (e) {
    console.error(
      '[availability-request] Resend network error:',
      e instanceof Error ? e.message : String(e)
    );
    return { ok: false, id: null, error: 'RESEND_NETWORK' };
  }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ success: false, error: 'METHOD_NOT_ALLOWED' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const ip = getClientIp(req);
  if (!checkRateLimit(`availability-request:${ip}`, 8, 60_000)) {
    return rateLimitResponse(corsHeaders);
  }

  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return new Response(JSON.stringify({ success: false, error: 'INVALID_JSON' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const parsed = BodySchema.safeParse(payload);
  if (!parsed.success) {
    return new Response(
      JSON.stringify({
        success: false,
        error: 'VALIDATION_ERROR',
        details: parsed.error.flatten().fieldErrors,
      }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  const d = parsed.data;
  const es = d.language === 'es';

  // Honeypot: pretend nothing happened, store nothing, send nothing.
  if (d.website && d.website.length > 0) {
    return new Response(JSON.stringify({ success: true, reference: 'IGNORED' }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  );

  // ---- Idempotency: same key = same request, never duplicated -------------
  const { data: existing } = await supabase
    .from('availability_requests')
    .select('id, reference, internal_email_status, client_email_status')
    .eq('idempotency_key', d.idempotencyKey)
    .maybeSingle();

  let recordId: string;
  let reference: string;
  let alreadySaved = false;

  if (existing) {
    recordId = existing.id as string;
    reference = existing.reference as string;
    alreadySaved = true;
  } else {
    reference = makeReference();
    const { data: inserted, error: insertErr } = await supabase
      .from('availability_requests')
      .insert({
        reference,
        idempotency_key: d.idempotencyKey,
        experience_id: d.experienceId,
        experience_slug: d.experienceSlug,
        product_name: d.productName,
        flow: d.flow,
        variant: d.variant || null,
        preferred_date: d.preferredDate || null,
        alternative_date: d.alternativeDate || null,
        flexible_dates: d.flexibleDates,
        preferred_time: d.preferredTime || null,
        adults: d.adults,
        children: d.children,
        child_ages: d.childAges || null,
        responsible_adult: d.responsibleAdult || null,
        guest_type: d.guestType || null,
        hotel_name: d.hotelName || null,
        accommodation_area: d.accommodationArea || null,
        full_name: d.fullName,
        email: d.email,
        phone: d.phone || null,
        certification: d.certification || null,
        last_dive_date: d.lastDiveDate || null,
        dive_count: d.diveCount || null,
        prior_experience: d.priorExperience || null,
        drivers: d.drivers ?? null,
        passengers: d.passengers ?? null,
        desired_duration: d.desiredDuration || null,
        details: d.details || null,
        language: d.language,
        source_page: d.sourcePage || null,
        status: 'received',
        internal_email_status: 'pending',
        client_email_status: 'pending',
      })
      .select('id')
      .single();

    if (insertErr || !inserted) {
      console.error('[availability-request] insert failed:', insertErr?.message);
      return new Response(
        JSON.stringify({ success: false, error: 'STORAGE_FAILED' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    recordId = inserted.id as string;
  }

  // ---- Notifications ------------------------------------------------------
  const notApplicable = es ? 'No indicado' : 'Not provided';
  const row = (label: string, value?: string | number | null) =>
    value === undefined || value === null || value === ''
      ? ''
      : `<tr><td style="padding:4px 12px 4px 0"><strong>${esc(label)}</strong></td><td style="padding:4px 0">${esc(value)}</td></tr>`;

  const participants = `${d.adults} ${es ? 'adultos' : 'adults'}, ${d.children} ${
    es ? 'menores' : 'children'
  }`;
  const dateText = d.flexibleDates
    ? es
      ? 'Fechas flexibles'
      : 'Flexible dates'
    : d.preferredDate || notApplicable;

  const internalHtml = `
    <h2>DiveLife — ${esc(es ? 'Nueva solicitud' : 'New request')} ${esc(reference)}</h2>
    <table>
      ${row('Referencia', reference)}
      ${row('Experiencia', d.productName)}
      ${row('Opción', d.variant || notApplicable)}
      ${row('Flujo', d.flow)}
      ${row('Fecha preferida', d.preferredDate || (d.flexibleDates ? (es ? 'Fechas flexibles' : 'Flexible dates') : notApplicable))}
      ${row('Fecha alternativa', d.alternativeDate || notApplicable)}
      ${row('Horario preferido', d.preferredTime || notApplicable)}
      ${row('Adultos', d.adults)}
      ${row('Menores', d.children)}
      ${row('Edades de menores', d.childAges || notApplicable)}
      ${row('Adulto responsable', d.responsibleAdult || notApplicable)}
      ${row('Alojamiento', d.guestType || notApplicable)}
      ${row('Hotel', d.hotelName || notApplicable)}
      ${row('Zona', d.accommodationArea || notApplicable)}
      ${row('Nombre', d.fullName)}
      ${row('Correo', d.email)}
      ${row('Teléfono', d.phone || notApplicable)}
      ${row('Idioma', d.language)}
      ${row('Certificación', d.certification || notApplicable)}
      ${row('Último buceo', d.lastDiveDate || notApplicable)}
      ${row('Inmersiones', d.diveCount || notApplicable)}
      ${row('Experiencia previa', d.priorExperience || notApplicable)}
      ${row('Conductores', d.drivers ?? undefined)}
      ${row('Acompañantes', d.passengers ?? undefined)}
      ${row('Duración deseada', d.desiredDuration || notApplicable)}
      ${row('Comentarios', d.details || notApplicable)}
      ${row('source_page', d.sourcePage || notApplicable)}
      ${row('created_at', new Date().toISOString())}
    </table>
    <p><strong>${esc(es ? 'Estado' : 'Status')}:</strong> solicitud recibida; reserva no confirmada.</p>
  `;

  const quoteParagraph =
    d.flow === 'complimentary'
      ? es
        ? 'Nuestro equipo revisará tu fecha preferida y te contactará para confirmar un horario. Esta sesión es gratuita.'
        : 'Our team will review your preferred date and contact you to confirm a time. This is a complimentary session.'
      : es
        ? 'Nuestro equipo revisará la disponibilidad y te contactará con una cotización y los próximos pasos. En esta etapa no necesitas realizar ningún pago.'
        : 'Our team will review availability and contact you with a quote and the next steps. No payment is required at this stage.';

  const ackHtml = es
    ? `<p>Hola ${esc(d.fullName)}:</p>
       <p>Recibimos tu solicitud para ${esc(d.productName)}.</p>
       <p>Fecha preferida: ${esc(dateText)}<br/>Participantes: ${esc(participants)}<br/>Referencia: ${esc(reference)}</p>
       <p>${esc(quoteParagraph)}</p>
       <p>Este correo confirma la recepción de tu solicitud. No confirma una reserva.</p>
       <p>DiveLife<br/>info@divelife.mx<br/>+52 55 1357 2569</p>`
    : `<p>Hello ${esc(d.fullName)},</p>
       <p>We received your request for ${esc(d.productName)}.</p>
       <p>Preferred date: ${esc(dateText)}<br/>Participants: ${esc(participants)}<br/>Reference: ${esc(reference)}</p>
       <p>${esc(quoteParagraph)}</p>
       <p>This email acknowledges your request. It does not confirm a booking.</p>
       <p>DiveLife<br/>info@divelife.mx<br/>+52 55 1357 2569</p>`;

  const resendKey = Deno.env.get('RESEND_API_KEY');
  let internalStatus = 'pending';
  let clientStatus = 'pending';
  let internalId: string | null = null;
  let clientId: string | null = null;
  let emailError: string | null = null;

  if (resendKey) {
    const internal = await sendEmail(resendKey, {
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      reply_to: d.email,
      subject: `[DiveLife] Nueva solicitud ${reference} — ${d.productName}`.slice(0, 180),
      html: internalHtml,
    });
    internalStatus = internal.ok ? 'sent' : 'failed';
    internalId = internal.id;
    emailError = internal.error;

    const ack = await sendEmail(resendKey, {
      from: FROM_EMAIL,
      to: [d.email],
      reply_to: TO_EMAIL,
      subject: es
        ? `Tu solicitud de DiveLife — ${reference}`
        : `Your DiveLife request — ${reference}`,
      html: ackHtml,
    });
    clientStatus = ack.ok ? 'sent' : 'failed';
    clientId = ack.id;
    emailError = emailError ?? ack.error;
  } else {
    console.warn('[availability-request] RESEND_API_KEY missing — notifications stay pending.');
  }

  await supabase
    .from('availability_requests')
    .update({
      internal_email_status: internalStatus,
      client_email_status: clientStatus,
      internal_provider_id: internalId,
      client_provider_id: clientId,
      email_error: emailError,
    })
    .eq('id', recordId);

  return new Response(
    JSON.stringify({
      success: true,
      reference,
      alreadySaved,
      internalEmailStatus: internalStatus,
      clientEmailStatus: clientStatus,
    }),
    { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
});
