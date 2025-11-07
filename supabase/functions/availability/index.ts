import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const slug = url.searchParams.get('slug');
    const date = url.searchParams.get('date'); // YYYY-MM-DD

    if (!slug || !date) {
      return new Response(
        JSON.stringify({ error: 'Missing slug or date parameter' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get all bookings for this slug and date (excluding canceled)
    const { data: bookings, error } = await supabase
      .from('bookings')
      .select('time, status')
      .eq('slug', slug)
      .eq('date', date)
      .neq('status', 'canceled');

    if (error) {
      console.error('Error fetching bookings:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to check availability' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Create a map of taken time slots
    const takenSlots = new Set(
      (bookings || []).map((b: any) => b.time.slice(0, 5)) // HH:mm format
    );

    // Import schedule logic (simplified here - in production, sync with frontend)
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

    if (twoSlotServices.includes(slug)) {
      availableSlots = TWO_SLOTS_8_14;
    } else if (only08Services.includes(slug)) {
      availableSlots = ONLY_08;
    } else if (hourlyServices.includes(slug)) {
      availableSlots = HOURLY_SLOTS_9_16;
    } else if (only11Services.includes(slug)) {
      availableSlots = ONLY_11;
    } else {
      availableSlots = DEFAULT_SLOTS;
    }

    const slots = availableSlots.map(time => ({
      time,
      status: takenSlots.has(time) ? 'taken' : 'free'
    }));

    return new Response(
      JSON.stringify({ slots, previewMode: false }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Availability error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
