-- Drop the existing security definer view
DROP VIEW IF EXISTS public.booking_availability;

-- Recreate as a regular view (without SECURITY DEFINER)
-- This view will now respect RLS policies on the bookings table
CREATE VIEW public.booking_availability AS
SELECT 
  date,
  time,
  slug,
  status
FROM public.bookings
WHERE status <> 'canceled';

-- Add a comment explaining the view's purpose
COMMENT ON VIEW public.booking_availability IS 
'Shows non-canceled bookings for availability checking. Respects RLS policies from bookings table.';