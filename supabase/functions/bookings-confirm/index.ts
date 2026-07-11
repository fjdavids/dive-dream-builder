import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { z } from 'https://esm.sh/zod@3.23.8';
import { checkRateLimit, getClientIp, rateLimitResponse } from '../_shared/rateLimit.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const schema = z.object({
  bookingId: z.string().uuid(),
});

function generateBookingCode(): string {
  return crypto.randomUUID();
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const ip = getClientIp(req);
  if (!checkRateLimit(`bookings-confirm:${ip}`, 20, 60_000)) {
    return rateLimitResponse(corsHeaders);
  }

  try {
    const raw = await req.json();
    const parsed = schema.safeParse(raw);
    if (!parsed.success) {
      return new Response(
        JSON.stringify({ ok: false, error: 'invalid_input' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    const { bookingId } = parsed.data;

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    const { data: booking, error: fetchError } = await supabase
      .from('bookings')
      .select('*')
      .eq('id', bookingId)
      .single();

    if (fetchError || !booking) {
      console.error('[Internal] Booking fetch error:', fetchError?.message);
      return new Response(
        JSON.stringify({ ok: false, error: 'Unable to process request' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const bookingCode = booking.booking_code || generateBookingCode();

    const { error: updateError } = await supabase
      .from('bookings')
      .update({
        status: 'confirmed',
        booking_code: bookingCode,
      })
      .eq('id', bookingId);

    if (updateError) {
      console.error('[Internal] Booking update error:', updateError?.message);
      return new Response(
        JSON.stringify({ ok: false, error: 'Unable to process request' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Booking confirmed:', bookingId);

    return new Response(
      JSON.stringify({
        ok: true,
        booking: {
          ...booking,
          booking_code: bookingCode,
          status: 'confirmed',
        },
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('[Internal] Confirm booking error:', error instanceof Error ? error.message : 'Unknown error');
    return new Response(
      JSON.stringify({ ok: false, error: 'Unable to process request' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
