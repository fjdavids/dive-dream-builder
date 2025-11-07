-- Address security definer view linter warning
-- The booking_availability view uses SECURITY DEFINER to allow public access
-- to non-sensitive availability data while keeping PII protected in the bookings table.
-- This is safe because the view only exposes: date, time, slug, status (no customer information)

-- Explicitly set view as SECURITY DEFINER with proper ownership and comment
DROP VIEW IF EXISTS public.booking_availability;

CREATE VIEW public.booking_availability 
WITH (security_invoker = false) -- Explicitly use SECURITY DEFINER
AS
SELECT 
  date,
  time,
  slug,
  status
FROM public.bookings
WHERE status <> 'canceled';

-- Add explanatory comment for auditing
COMMENT ON VIEW public.booking_availability IS 
'Public availability view - exposes only non-PII fields (date, time, slug, status). SECURITY DEFINER is intentional and safe here.';

-- Re-grant access
GRANT SELECT ON public.booking_availability TO anon, authenticated;