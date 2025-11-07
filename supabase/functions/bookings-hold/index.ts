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
    const body = await req.json();
    const {
      slug,
      title,
      date,
      time,
      guests,
      customerName,
      customerEmail,
      customerPhone,
      hotel,
      room,
      notes,
      locale,
      waiverChecked,
      waiverUrl,
      preNoticeAccepted
    } = body;

    // Validate required fields
    if (!slug || !title || !date || !time || !customerName || !customerEmail || !customerPhone || !locale) {
      return new Response(
        JSON.stringify({ ok: false, reason: 'missing_fields' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!waiverChecked) {
      return new Response(
        JSON.stringify({ ok: false, reason: 'waiver_not_checked' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Check if slot is available
    const { data: existing, error: checkError } = await supabase
      .from('bookings')
      .select('id')
      .eq('slug', slug)
      .eq('date', date)
      .eq('time', time)
      .neq('status', 'canceled')
      .maybeSingle();

    if (checkError) {
      console.error('Error checking availability:', checkError);
      return new Response(
        JSON.stringify({ ok: false, reason: 'database_error' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (existing) {
      return new Response(
        JSON.stringify({ ok: false, reason: 'taken' }),
        { status: 409, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Create hold booking
    const { data: booking, error: insertError } = await supabase
      .from('bookings')
      .insert({
        slug,
        title,
        date,
        time,
        guests: guests || 1,
        customer_name: customerName,
        customer_email: customerEmail,
        customer_phone: customerPhone,
        hotel: hotel || null,
        room: room || null,
        notes: notes || null,
        locale,
        status: 'hold',
        waiver_checked: waiverChecked,
        waiver_url: waiverUrl,
        pre_notice_accepted: preNoticeAccepted || false
      })
      .select('id')
      .single();

    if (insertError) {
      console.error('Error creating booking:', insertError);
      return new Response(
        JSON.stringify({ ok: false, reason: 'database_error' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Booking hold created:', booking.id);

    return new Response(
      JSON.stringify({ ok: true, bookingId: booking.id }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Hold booking error:', error);
    return new Response(
      JSON.stringify({ ok: false, reason: 'internal_error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
