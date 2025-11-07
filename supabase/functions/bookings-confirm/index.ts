import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

function generateBookingCode(date: string): string {
  // Format: DL-YYYYMMDD-XXXX
  const dateStr = date.replace(/-/g, '');
  const random = Math.floor(1000 + Math.random() * 9000);
  return `DL-${dateStr}-${random}`;
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
      console.error('Error fetching booking:', fetchError);
      return new Response(
        JSON.stringify({ ok: false, error: 'Booking not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Generate booking code if not exists
    const bookingCode = booking.booking_code || generateBookingCode(booking.date);

    // Update booking status
    const { error: updateError } = await supabase
      .from('bookings')
      .update({
        status: 'confirmed',
        booking_code: bookingCode
      })
      .eq('id', bookingId);

    if (updateError) {
      console.error('Error confirming booking:', updateError);
      return new Response(
        JSON.stringify({ ok: false, error: 'Failed to confirm booking' }),
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
    console.error('Confirm booking error:', error);
    return new Response(
      JSON.stringify({ ok: false, error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
