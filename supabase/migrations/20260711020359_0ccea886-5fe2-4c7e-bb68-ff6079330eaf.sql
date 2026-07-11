CREATE TABLE public.contact_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  topic TEXT,
  guest_type TEXT,
  preferred_date DATE,
  message TEXT NOT NULL,
  language TEXT NOT NULL DEFAULT 'en',
  source_page TEXT,
  status TEXT NOT NULL DEFAULT 'received',
  provider_message_id TEXT,
  error_code TEXT,
  user_agent TEXT
);

GRANT ALL ON public.contact_submissions TO service_role;

ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- No anon/authenticated policies: only service_role (edge functions) can access.
CREATE INDEX contact_submissions_created_at_idx ON public.contact_submissions (created_at DESC);