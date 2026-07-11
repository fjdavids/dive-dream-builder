import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { checkRateLimit, getClientIp, rateLimitResponse } from '../_shared/rateLimit.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const ip = getClientIp(req);
  if (!checkRateLimit(`availability:${ip}`, 60, 60_000)) {
    return rateLimitResponse(corsHeaders);
  }

  try {
    const { slug, date } = await req.json();

    if (typeof slug !== 'string' || typeof date !== 'string'
        || !/^[a-z0-9-]{1,64}$/.test(slug) || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return new Response(
        JSON.stringify({ error: 'Invalid request' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    const { data: bookings, error } = await supabase
      .from('booking_availability')
      .select('time, status')
      .eq('slug', slug)
      .eq('date', date);

    if (error) {
      console.error('[Internal] Availability fetch error:', error?.message);
      return new Response(
        JSON.stringify({ error: 'Unable to check availability' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const takenSlots = new Set(
      (bookings || []).map((b: any) => b.time.slice(0, 5))
    );

    const DEFAULT_SLOTS = ['09:00', '11:00', '13:00', '15:00'];
    const HOURLY_SLOTS_9_16 = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'];
    const TWO_SLOTS_8_14 = ['08:00', '14:00'];
    const ONLY_08 = ['08:00'];
    const ONLY_11 = ['11:00'];

    const twoSlotServices = ['manatee-snorkeling', 'cenote-family-snorkel', 'cozumel-dive', 'cenote-dive', 'luxury-sailing-catamaran'];
    const only08Services = ['mexican-panga-fishing'];
    const hourlyServices = ['paddleboard-ojo-agua-eaglerays', 'paddleboard-ojo-agua', 'paddleboard-marina', 'jetski-30', 'jetski-tour', 'seabob-session'];
    const only11Services = ['free-pool-demo', 'pool-demo', 'scuba-kids'];

    let availableSlots: string[] = [];

    if (twoSlotServices.includes(slug)) availableSlots = TWO_SLOTS_8_14;
    else if (only08Services.includes(slug)) availableSlots = ONLY_08;
    else if (hourlyServices.includes(slug)) availableSlots = HOURLY_SLOTS_9_16;
    else if (only11Services.includes(slug)) availableSlots = ONLY_11;
    else availableSlots = DEFAULT_SLOTS;

    const slots = availableSlots.map((time) => ({
      time,
      status: takenSlots.has(time) ? 'taken' : 'free',
    }));

    return new Response(
      JSON.stringify({ slots, previewMode: false }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('[Internal] Availability error:', error instanceof Error ? error.message : 'Unknown error');
    return new Response(
      JSON.stringify({ error: 'Unable to check availability' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
