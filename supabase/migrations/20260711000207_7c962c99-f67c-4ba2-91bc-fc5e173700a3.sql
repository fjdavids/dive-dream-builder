
DROP POLICY IF EXISTS "View own booking with confirmation code" ON public.bookings;
DROP POLICY IF EXISTS "Public can create bookings" ON public.bookings;
DROP POLICY IF EXISTS "Confirm held bookings only" ON public.bookings;

REVOKE ALL ON public.bookings FROM anon, authenticated;
GRANT ALL ON public.bookings TO service_role;
