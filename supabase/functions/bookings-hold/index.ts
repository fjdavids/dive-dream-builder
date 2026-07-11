import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { z } from 'https://esm.sh/zod@3.23.8';
import { checkRateLimit, getClientIp, rateLimitResponse } from '../_shared/rateLimit.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const bookingSchema = z.object({
  slug: z.string().trim().regex(/^[a-z0-9-]{1,64}$/, 'invalid slug'),
  title: z.string().trim().min(1).max(200),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'invalid date'),
  time: z.string().regex(/^\d{2}:\d{2}$/, 'invalid time'),
  guests: z.number().int().min(1).max(20).optional(),
  customerName: z.string().trim().min(1).max(100),
  customerEmail: z.string().trim().email().max(255),
  customerPhone: z.string().trim().min(5).max(30).regex(/^[+\d\s()-]+$/, 'invalid phone'),
  hotel: z.string().trim().max(200).optional().nullable(),
  room: z.string().trim().max(50).optional().nullable(),
  notes: z.string().trim().max(1000).optional().nullable(),
  locale: z.enum(['en', 'es']),
  waiverChecked: z.literal(true),
  waiverUrl: z.string().url().max(500).optional().nullable(),
  preNoticeAccepted: z.boolean().optional(),
});

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const ip = getClientIp(req);
  if (!checkRateLimit(`bookings-hold:${ip}`, 5, 60 * 60_000)) {
    return rateLimitResponse(corsHeaders);
  }

  try {
    const raw = await req.json();
    const parsed = bookingSchema.safeParse(raw);
    if (!parsed.success) {
      return new Response(
        JSON.stringify({ ok: false, reason: 'invalid_input', errors: parsed.error.flatten().fieldErrors }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    const data = parsed.data;

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    const { data: existing, error: checkError } = await supabase
      .from('bookings')
      .select('id')
      .eq('slug', data.slug)
      .eq('date', data.date)
      .eq('time', data.time)
      .neq('status', 'canceled')
      .maybeSingle();

    if (checkError) {
      console.error('[Internal] Availability check error:', checkError?.message);
      return new Response(
        JSON.stringify({ ok: false, reason: 'Unable to process request' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (existing) {
      return new Response(
        JSON.stringify({ ok: false, reason: 'taken' }),
        { status: 409, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { data: booking, error: insertError } = await supabase
      .from('bookings')
      .insert({
        slug: data.slug,
        title: data.title,
        date: data.date,
        time: data.time,
        guests: data.guests || 1,
        customer_name: data.customerName,
        customer_email: data.customerEmail,
        customer_phone: data.customerPhone,
        hotel: data.hotel || null,
        room: data.room || null,
        notes: data.notes || null,
        locale: data.locale,
        status: 'hold',
        waiver_checked: data.waiverChecked,
        waiver_url: data.waiverUrl || null,
        pre_notice_accepted: data.preNoticeAccepted || false,
      })
      .select('id')
      .single();

    if (insertError) {
      console.error('[Internal] Booking insert error:', insertError?.message);
      return new Response(
        JSON.stringify({ ok: false, reason: 'Unable to process request' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Booking hold created:', booking.id);

    return new Response(
      JSON.stringify({ ok: true, bookingId: booking.id }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('[Internal] Hold booking error:', error instanceof Error ? error.message : 'Unknown error');
    return new Response(
      JSON.stringify({ ok: false, reason: 'Unable to process request' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
