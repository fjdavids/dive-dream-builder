// Generate iCalendar (.ics) files for booking confirmations

interface ICSParams {
  title: string;
  description: string;
  location: string;
  startDate: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  durationHours: number;
  bookingCode?: string;
}

export function generateICS(params: ICSParams): string {
  const { title, description, location, startDate, startTime, durationHours, bookingCode } = params;

  // Parse date and time (America/Cancun timezone)
  const [year, month, day] = startDate.split('-');
  const [hour, minute] = startTime.split(':');

  // Format: YYYYMMDDTHHMMSS
  const startDateTime = `${year}${month}${day}T${hour}${minute}00`;

  // Calculate end time
  const start = new Date(`${startDate}T${startTime}:00`);
  const end = new Date(start.getTime() + durationHours * 60 * 60 * 1000);
  const endYear = end.getFullYear();
  const endMonth = String(end.getMonth() + 1).padStart(2, '0');
  const endDay = String(end.getDate()).padStart(2, '0');
  const endHour = String(end.getHours()).padStart(2, '0');
  const endMinute = String(end.getMinutes()).padStart(2, '0');
  const endDateTime = `${endYear}${endMonth}${endDay}T${endHour}${endMinute}00`;

  // Current timestamp for DTSTAMP
  const now = new Date();
  const timestamp = now.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//DiveLife//Booking System//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `DTSTART;TZID=America/Cancun:${startDateTime}`,
    `DTEND;TZID=America/Cancun:${endDateTime}`,
    `DTSTAMP:${timestamp}`,
    `UID:${bookingCode || timestamp}@divelife.mx`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${location}`,
    'STATUS:CONFIRMED',
    'BEGIN:VALARM',
    'TRIGGER:-PT24H',
    'ACTION:DISPLAY',
    'DESCRIPTION:Reminder: DiveLife booking tomorrow',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  return icsContent;
}

export function downloadICS(icsContent: string, filename: string = 'divelife-booking.ics') {
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
}
