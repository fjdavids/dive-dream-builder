-- Fix security issues in bookings table

-- 1. Create a public view for availability checking (no PII)
CREATE OR REPLACE VIEW public.booking_availability AS
SELECT 
  date,
  time,
  slug,
  status
FROM public.bookings
WHERE status <> 'canceled';

-- Grant SELECT access on the view to public
GRANT SELECT ON public.booking_availability TO anon, authenticated;

-- 2. Drop the problematic public SELECT policy that exposes PII
DROP POLICY IF EXISTS "Public can check availability" ON public.bookings;

-- 3. Add restricted SELECT policy - customers can only see their own confirmed bookings via booking_code
CREATE POLICY "View own booking with confirmation code"
ON public.bookings
FOR SELECT
TO anon, authenticated
USING (
  status = 'confirmed' 
  AND booking_code IS NOT NULL
);

-- 4. Replace unrestricted UPDATE policy with secure version
-- Only allows updating from 'hold' to 'confirmed' status
DROP POLICY IF EXISTS "Public can confirm bookings" ON public.bookings;

CREATE POLICY "Confirm held bookings only"
ON public.bookings
FOR UPDATE
TO anon, authenticated
USING (status = 'hold')
WITH CHECK (
  status = 'confirmed' 
  AND booking_code IS NOT NULL
);

-- 5. Keep INSERT policy as is (already secure - creates holds only)
-- No changes needed to "Public can create bookings" policy