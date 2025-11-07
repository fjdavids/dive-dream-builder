import { Resend } from 'npm:resend@4.0.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const resend = new Resend(Deno.env.get('RESEND_API_KEY'));

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { booking, locale, icsContent } = body;

    const isEN = locale === 'en';

    // Customer email
    const customerSubject = isEN
      ? `Your DiveLife booking – ${booking.title} ${booking.date} ${booking.time} (Code ${booking.booking_code})`
      : `Tu reserva con DiveLife – ${booking.title} ${booking.date} ${booking.time} (Código ${booking.booking_code})`;

    const customerBody = isEN
      ? `
        <h1>Thank you for your booking!</h1>
        <p>Your DiveLife experience has been confirmed.</p>
        <h2>Booking Details:</h2>
        <ul>
          <li><strong>Service:</strong> ${booking.title}</li>
          <li><strong>Date:</strong> ${booking.date}</li>
          <li><strong>Time:</strong> ${booking.time}</li>
          <li><strong>Guests:</strong> ${booking.guests}</li>
          <li><strong>Booking Code:</strong> ${booking.booking_code}</li>
        </ul>
        <h2>Your Information:</h2>
        <ul>
          <li><strong>Name:</strong> ${booking.customer_name}</li>
          <li><strong>Email:</strong> ${booking.customer_email}</li>
          <li><strong>Phone:</strong> ${booking.customer_phone}</li>
          ${booking.hotel ? `<li><strong>Hotel:</strong> ${booking.hotel}${booking.room ? ` - Room ${booking.room}` : ''}</li>` : ''}
        </ul>
        <p><strong>Waiver:</strong> <a href="${booking.waiver_url}">View your waiver</a></p>
        <h3>Cancellation Policy:</h3>
        <p>Cancellations up to 24 hours before the tour: full refund. After that, no refunds due to logistics.</p>
        <p>If you have any questions, contact us on WhatsApp: <a href="https://wa.me/5219841234567">+52 984 123 4567</a></p>
        <p>See you soon!<br>The DiveLife Team</p>
      `
      : `
        <h1>¡Gracias por tu reserva!</h1>
        <p>Tu experiencia con DiveLife ha sido confirmada.</p>
        <h2>Detalles de la reserva:</h2>
        <ul>
          <li><strong>Servicio:</strong> ${booking.title}</li>
          <li><strong>Fecha:</strong> ${booking.date}</li>
          <li><strong>Hora:</strong> ${booking.time}</li>
          <li><strong>Personas:</strong> ${booking.guests}</li>
          <li><strong>Código de reserva:</strong> ${booking.booking_code}</li>
        </ul>
        <h2>Tu información:</h2>
        <ul>
          <li><strong>Nombre:</strong> ${booking.customer_name}</li>
          <li><strong>Email:</strong> ${booking.customer_email}</li>
          <li><strong>Teléfono:</strong> ${booking.customer_phone}</li>
          ${booking.hotel ? `<li><strong>Hotel:</strong> ${booking.hotel}${booking.room ? ` - Habitación ${booking.room}` : ''}</li>` : ''}
        </ul>
        <p><strong>Descargo:</strong> <a href="${booking.waiver_url}">Ver tu descargo de responsabilidad</a></p>
        <h3>Política de cancelación:</h3>
        <p>Cancelaciones hasta 24 horas antes del tour: reembolso total. Después de ese plazo, no hay devoluciones por logística.</p>
        <p>Si tienes preguntas, contáctanos por WhatsApp: <a href="https://wa.me/5219841234567">+52 984 123 4567</a></p>
        <p>¡Nos vemos pronto!<br>El equipo de DiveLife</p>
      `;

    // Send customer email
    const { error: customerError } = await resend.emails.send({
      from: 'DiveLife <info@divelife.mx>',
      to: [booking.customer_email],
      subject: customerSubject,
      html: customerBody
    });

    if (customerError) {
      console.error('Customer email error:', customerError);
    } else {
      console.log('Customer email sent to:', booking.customer_email);
    }

    // Business notification email
    const businessSubject = `New booking – ${booking.slug} ${booking.date} ${booking.time} – ${booking.customer_name}`;
    const businessBody = `
      <h1>New DiveLife Booking</h1>
      <h2>Service Details:</h2>
      <ul>
        <li><strong>Service:</strong> ${booking.title} (${booking.slug})</li>
        <li><strong>Date:</strong> ${booking.date}</li>
        <li><strong>Time:</strong> ${booking.time}</li>
        <li><strong>Guests:</strong> ${booking.guests}</li>
        <li><strong>Booking Code:</strong> ${booking.booking_code}</li>
        <li><strong>Status:</strong> ${booking.status}</li>
      </ul>
      <h2>Customer Details:</h2>
      <ul>
        <li><strong>Name:</strong> ${booking.customer_name}</li>
        <li><strong>Email:</strong> ${booking.customer_email}</li>
        <li><strong>Phone:</strong> ${booking.customer_phone}</li>
        ${booking.hotel ? `<li><strong>Hotel:</strong> ${booking.hotel}${booking.room ? ` - Room ${booking.room}` : ''}</li>` : ''}
        ${booking.notes ? `<li><strong>Notes:</strong> ${booking.notes}</li>` : ''}
      </ul>
      <p><strong>Waiver checked:</strong> ${booking.waiver_checked ? 'Yes' : 'No'}</p>
      <p><strong>Waiver URL:</strong> <a href="${booking.waiver_url}">${booking.waiver_url}</a></p>
      <p><strong>Locale:</strong> ${booking.locale}</p>
      <p><strong>Created:</strong> ${booking.created_at}</p>
    `;

    // Send business email
    const { error: businessError } = await resend.emails.send({
      from: 'DiveLife Bookings <info@divelife.mx>',
      to: ['info@divelife.mx'],
      subject: businessSubject,
      html: businessBody
    });

    if (businessError) {
      console.error('Business email error:', businessError);
    } else {
      console.log('Business email sent');
    }

    return new Response(
      JSON.stringify({ ok: true, customerSent: !customerError, businessSent: !businessError }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Email sending error:', error);
    return new Response(
      JSON.stringify({ ok: false, error: 'Failed to send emails' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
