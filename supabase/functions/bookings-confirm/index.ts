import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

function generateBookingCode(): string {
  // Use cryptographically secure UUID instead of predictable codes
  return crypto.randomUUID();
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { bookingId } = body;

    if (!bookingId) {
      return new Response(
        JSON.stringify({ ok: false, error: 'Missing bookingId' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get booking details
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

    // Generate booking code if not exists
    const bookingCode = booking.booking_code || generateBookingCode();

    // Update booking status
    const { error: updateError } = await supabase
      .from('bookings')
      .update({
        status: 'confirmed',
        booking_code: bookingCode
      })
      .eq('id', bookingId);

    if (updateError) {
      console.error('[Internal] Booking update error:', updateError?.message);
      return new Response(
        JSON.stringify({ ok: false, error: 'Unable to process request' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Booking confirmed:', bookingId, bookingCode);

    // Return full booking details
    return new Response(
      JSON.stringify({
        ok: true,
        booking: {
          ...booking,
          booking_code: bookingCode,
          status: 'confirmed'
        }
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
