CREATE TABLE public.availability_requests (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  reference text NOT NULL UNIQUE,
  idempotency_key text UNIQUE,
  experience_id text NOT NULL,
  experience_slug text NOT NULL,
  product_name text NOT NULL,
  flow text NOT NULL DEFAULT 'availability',
  variant text,
  preferred_date date,
  alternative_date date,
  flexible_dates boolean NOT NULL DEFAULT false,
  preferred_time text,
  adults integer NOT NULL DEFAULT 0,
  children integer NOT NULL DEFAULT 0,
  child_ages text,
  responsible_adult text,
  guest_type text,
  hotel_name text,
  accommodation_area text,
  full_name text NOT NULL,
  email text NOT NULL,
  phone text,
  certification text,
  last_dive_date text,
  dive_count text,
  prior_experience text,
  drivers integer,
  passengers integer,
  desired_duration text,
  details text,
  language text NOT NULL DEFAULT 'en',
  source_page text,
  status text NOT NULL DEFAULT 'received',
  internal_email_status text NOT NULL DEFAULT 'pending',
  client_email_status text NOT NULL DEFAULT 'pending',
  internal_provider_id text,
  client_provider_id text,
  email_error text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

GRANT ALL ON public.availability_requests TO service_role;

ALTER TABLE public.availability_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "No public access to availability requests"
ON public.availability_requests
FOR SELECT
USING (false);

CREATE TRIGGER set_availability_requests_updated_at
BEFORE UPDATE ON public.availability_requests
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE INDEX idx_availability_requests_created_at ON public.availability_requests (created_at DESC);
CREATE INDEX idx_availability_requests_status ON public.availability_requests (status);