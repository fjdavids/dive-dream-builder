-- Add pre_notice_accepted field to bookings table
ALTER TABLE public.bookings 
ADD COLUMN IF NOT EXISTS pre_notice_accepted BOOLEAN NOT NULL DEFAULT false;