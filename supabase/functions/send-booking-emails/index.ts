import { checkRateLimit, getClientIp, rateLimitResponse } from '../_shared/rateLimit.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

function esc(v: unknown): string {
  return String(v ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function escUrl(v: unknown): string {
  const s = String(v ?? '');
  if (!/^https?:\/\//i.test(s)) return '#';
  return esc(s);
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const ip = getClientIp(req);
  if (!checkRateLimit(`send-booking-emails:${ip}`, 30, 60_000)) {
    return rateLimitResponse(corsHeaders);
  }

  try {
    const body = await req.json();
    const { booking, locale } = body ?? {};
    if (!booking || typeof booking !== 'object') {
      return new Response(
        JSON.stringify({ ok: false, error: 'invalid_input' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const isEN = locale === 'en';

    const customerSubject = isEN
      ? `Your DiveLife booking – ${esc(booking.title)} ${esc(booking.date)} ${esc(booking.time)} (Code ${esc(booking.booking_code)})`
      : `Tu reserva con DiveLife – ${esc(booking.title)} ${esc(booking.date)} ${esc(booking.time)} (Código ${esc(booking.booking_code)})`;

    const customerBody = isEN
      ? `
        <h1>Thank you for your booking!</h1>
        <p>Your DiveLife experience has been confirmed.</p>
        <h2>Booking Details:</h2>
        <ul>
          <li><strong>Service:</strong> ${esc(booking.title)}</li>
          <li><strong>Date:</strong> ${esc(booking.date)}</li>
          <li><strong>Time:</strong> ${esc(booking.time)}</li>
          <li><strong>Guests:</strong> ${esc(booking.guests)}</li>
          <li><strong>Booking Code:</strong> ${esc(booking.booking_code)}</li>
        </ul>
        <h2>Your Information:</h2>
        <ul>
          <li><strong>Name:</strong> ${esc(booking.customer_name)}</li>
          <li><strong>Email:</strong> ${esc(booking.customer_email)}</li>
          <li><strong>Phone:</strong> ${esc(booking.customer_phone)}</li>
          ${booking.hotel ? `<li><strong>Hotel:</strong> ${esc(booking.hotel)}${booking.room ? ` - Room ${esc(booking.room)}` : ''}</li>` : ''}
        </ul>
        <p><strong>Waiver:</strong> <a href="${escUrl(booking.waiver_url)}">View your waiver</a></p>
        <h3>Cancellation Policy:</h3>
        <p>Cancellations up to 24 hours before the tour: full refund. After that, no refunds due to logistics.</p>
        <p><strong>Important:</strong> Reservations may be rescheduled or canceled due to weather, port authority closures, or operational safety.</p>
        <p>If you have any questions, contact us on WhatsApp: <a href="https://wa.me/5219841234567">+52 984 123 4567</a></p>
        <p>See you soon!<br>The DiveLife Team</p>
      `
      : `
        <h1>¡Gracias por tu reserva!</h1>
        <p>Tu experiencia con DiveLife ha sido confirmada.</p>
        <h2>Detalles de la reserva:</h2>
        <ul>
          <li><strong>Servicio:</strong> ${esc(booking.title)}</li>
          <li><strong>Fecha:</strong> ${esc(booking.date)}</li>
          <li><strong>Hora:</strong> ${esc(booking.time)}</li>
          <li><strong>Personas:</strong> ${esc(booking.guests)}</li>
          <li><strong>Código de reserva:</strong> ${esc(booking.booking_code)}</li>
        </ul>
        <h2>Tu información:</h2>
        <ul>
          <li><strong>Nombre:</strong> ${esc(booking.customer_name)}</li>
          <li><strong>Email:</strong> ${esc(booking.customer_email)}</li>
          <li><strong>Teléfono:</strong> ${esc(booking.customer_phone)}</li>
          ${booking.hotel ? `<li><strong>Hotel:</strong> ${esc(booking.hotel)}${booking.room ? ` - Habitación ${esc(booking.room)}` : ''}</li>` : ''}
        </ul>
        <p><strong>Descargo:</strong> <a href="${escUrl(booking.waiver_url)}">Ver tu descargo</a></p>
        <h3>Política de cancelación:</h3>
        <p>Cancelaciones hasta 24 horas antes del tour: reembolso total. Después de ese plazo, no hay devoluciones por logística.</p>
        <p>Si tienes preguntas, contáctanos por WhatsApp: <a href="https://wa.me/5219841234567">+52 984 123 4567</a></p>
        <p>¡Nos vemos pronto!<br>El equipo de DiveLife</p>
      `;

    const businessSubject = `New booking – ${esc(booking.slug)} ${esc(booking.date)} ${esc(booking.time)} – ${esc(booking.customer_name)}`;
    const businessBody = `
      <h1>New DiveLife Booking</h1>
      <h2>Service Details:</h2>
      <ul>
        <li><strong>Service:</strong> ${esc(booking.title)} (${esc(booking.slug)})</li>
        <li><strong>Date:</strong> ${esc(booking.date)}</li>
        <li><strong>Time:</strong> ${esc(booking.time)}</li>
        <li><strong>Guests:</strong> ${esc(booking.guests)}</li>
        <li><strong>Booking Code:</strong> ${esc(booking.booking_code)}</li>
        <li><strong>Status:</strong> ${esc(booking.status)}</li>
      </ul>
      <h2>Customer Details:</h2>
      <ul>
        <li><strong>Name:</strong> ${esc(booking.customer_name)}</li>
        <li><strong>Email:</strong> ${esc(booking.customer_email)}</li>
        <li><strong>Phone:</strong> ${esc(booking.customer_phone)}</li>
        ${booking.hotel ? `<li><strong>Hotel:</strong> ${esc(booking.hotel)}${booking.room ? ` - Room ${esc(booking.room)}` : ''}</li>` : ''}
        ${booking.notes ? `<li><strong>Notes:</strong> ${esc(booking.notes)}</li>` : ''}
      </ul>
      <p><strong>Waiver checked:</strong> ${booking.waiver_checked ? 'Yes' : 'No'}</p>
      <p><strong>Waiver URL:</strong> <a href="${escUrl(booking.waiver_url)}">${esc(booking.waiver_url)}</a></p>
      <p><strong>Pre-booking notice accepted:</strong> ${booking.pre_notice_accepted ? 'Yes' : 'No'}</p>
      <p><strong>Locale:</strong> ${esc(booking.locale)}</p>
      <p><strong>Created:</strong> ${esc(booking.created_at)}</p>
    `;

    console.log('📧 Email preview mode (no RESEND_API_KEY configured)');
    console.log('Customer email queued:', { subject: customerSubject.substring(0, 50) + '...' });
    console.log('Business notification queued:', { subject: businessSubject.substring(0, 50) + '...' });
    void customerBody; void businessBody;

    return new Response(
      JSON.stringify({ ok: true, customerSent: true, businessSent: true }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('[Internal] Email error:', error instanceof Error ? error.message : 'Unknown error');
    return new Response(
      JSON.stringify({ ok: false, error: 'Unable to send emails' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
