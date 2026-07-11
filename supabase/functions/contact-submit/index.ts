import { createClient } from 'npm:@supabase/supabase-js@2';
import { z } from 'npm:zod@3.23.8';
import { checkRateLimit, getClientIp, rateLimitResponse } from '../_shared/rateLimit.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const BodySchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().min(3).max(30).optional().or(z.literal('')),
  topic: z.string().trim().max(50).optional().or(z.literal('')),
  guestType: z.string().trim().max(30).optional().or(z.literal('')),
  preferredDate: z.string().trim().max(20).optional().or(z.literal('')),
  message: z.string().trim().min(20).max(2000),
  language: z.enum(['en', 'es']).default('en'),
  sourcePage: z.string().trim().max(200).optional().or(z.literal('')),
  // Honeypot — must be empty
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

const TO_EMAIL = Deno.env.get('CONTACT_TO_EMAIL') ?? 'info@divelife.mx';
const FROM_EMAIL = Deno.env.get('CONTACT_FROM_EMAIL') ?? 'Dive Life Website <onboarding@resend.dev>';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ success: false, error: 'METHOD_NOT_ALLOWED' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const ip = getClientIp(req);
  if (!checkRateLimit(`contact-submit:${ip}`, 5, 60_000)) {
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
        message: 'Please check the form and try again.',
        details: parsed.error.flatten().fieldErrors,
      }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  const d = parsed.data;

  // Honeypot triggered
  if (d.website && d.website.length > 0) {
    return new Response(JSON.stringify({ success: true, submissionId: 'ignored', emailStatus: 'skipped' }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  );

  // 1) Persist submission first — this is the real backend confirmation.
  const { data: inserted, error: insertErr } = await supabase
    .from('contact_submissions')
    .insert({
      name: d.name,
      email: d.email,
      phone: d.phone || null,
      topic: d.topic || null,
      guest_type: d.guestType || null,
      preferred_date: d.preferredDate || null,
      message: d.message,
      language: d.language,
      source_page: d.sourcePage || null,
      user_agent: req.headers.get('user-agent')?.slice(0, 500) ?? null,
      status: 'received',
    })
    .select('id')
    .single();

  if (insertErr || !inserted) {
    console.error('[contact-submit] DB insert failed:', insertErr?.message);
    return new Response(
      JSON.stringify({
        success: false,
        error: 'STORAGE_FAILED',
        message: 'Unable to save your message at this time. Please contact us via email or WhatsApp.',
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  const submissionId = inserted.id as string;

  // 2) Try to send email via Resend if configured.
  const resendKey = Deno.env.get('RESEND_API_KEY');
  let emailStatus: 'sent' | 'skipped' | 'failed' = 'skipped';
  let providerMessageId: string | null = null;
  let errorCode: string | null = null;

  if (resendKey) {
    const subject = `New Dive Life inquiry — ${d.topic || 'general'} — ${d.name}`.slice(0, 180);
    const html = `
      <h1>New Dive Life inquiry</h1>
      <p><strong>Submission ID:</strong> ${esc(submissionId)}</p>
      <ul>
        <li><strong>Name:</strong> ${esc(d.name)}</li>
        <li><strong>Email:</strong> ${esc(d.email)}</li>
        <li><strong>Phone:</strong> ${esc(d.phone || '-')}</li>
        <li><strong>Topic:</strong> ${esc(d.topic || '-')}</li>
        <li><strong>Guest type:</strong> ${esc(d.guestType || '-')}</li>
        <li><strong>Preferred date:</strong> ${esc(d.preferredDate || '-')}</li>
        <li><strong>Language:</strong> ${esc(d.language)}</li>
        <li><strong>Source page:</strong> ${esc(d.sourcePage || '-')}</li>
      </ul>
      <h2>Message</h2>
      <p style="white-space:pre-wrap">${esc(d.message)}</p>
    `;

    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: FROM_EMAIL,
          to: [TO_EMAIL],
          reply_to: d.email,
          subject,
          html,
        }),
      });
      const bodyText = await res.text();
      if (!res.ok) {
        emailStatus = 'failed';
        errorCode = `RESEND_${res.status}`;
        console.error('[contact-submit] Resend error', res.status, bodyText.slice(0, 300));
      } else {
        try {
          const j = JSON.parse(bodyText);
          providerMessageId = j?.id ?? null;
        } catch { /* ignore */ }
        emailStatus = 'sent';
      }
    } catch (e) {
      emailStatus = 'failed';
      errorCode = 'RESEND_NETWORK';
      console.error('[contact-submit] Resend network error:', e instanceof Error ? e.message : String(e));
    }
  } else {
    console.warn('[contact-submit] RESEND_API_KEY not configured — submission stored, email not sent.');
  }

  // 3) Update record with email status.
  await supabase
    .from('contact_submissions')
    .update({
      status: emailStatus === 'sent' ? 'sent' : emailStatus === 'failed' ? 'failed' : 'received',
      provider_message_id: providerMessageId,
      error_code: errorCode,
    })
    .eq('id', submissionId);

  // Submission stored counts as success; email status is reported honestly.
  return new Response(
    JSON.stringify({
      success: true,
      submissionId,
      emailStatus,
    }),
    { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
});
