-- Create bookings table for DiveLife reservations
CREATE TABLE IF NOT EXISTS public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL,
  title TEXT NOT NULL,
  date DATE NOT NULL,
  time TIME NOT NULL,
  guests INTEGER NOT NULL DEFAULT 1,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  hotel TEXT,
  room TEXT,
  notes TEXT,
  locale TEXT NOT NULL CHECK (locale IN ('en', 'es')),
  status TEXT NOT NULL DEFAULT 'hold' CHECK (status IN ('hold', 'confirmed', 'canceled', 'hold:admin')),
  waiver_checked BOOLEAN NOT NULL DEFAULT false,
  waiver_url TEXT,
  booking_code TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create index for availability queries
CREATE INDEX IF NOT EXISTS idx_bookings_availability ON public.bookings(slug, date, time, status);

-- Create index for booking code lookups
CREATE INDEX IF NOT EXISTS idx_bookings_code ON public.bookings(booking_code);

-- Enable RLS
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Allow public read access to check availability (only non-canceled bookings)
CREATE POLICY "Public can check availability"
  ON public.bookings
  FOR SELECT
  USING (status != 'canceled');

-- Allow public insert for new bookings
CREATE POLICY "Public can create bookings"
  ON public.bookings
  FOR INSERT
  WITH CHECK (true);

-- Allow public update for confirming bookings
CREATE POLICY "Public can confirm bookings"
  ON public.bookings
  FOR UPDATE
  USING (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger for updated_at
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.bookings
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();