-- ================================================
-- 1. Add new profile fields for candidate tracking
-- ================================================
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS utm_source text,
ADD COLUMN IF NOT EXISTS utm_medium text,
ADD COLUMN IF NOT EXISTS utm_campaign text,
ADD COLUMN IF NOT EXISTS utm_term text,
ADD COLUMN IF NOT EXISTS utm_content text,
ADD COLUMN IF NOT EXISTS registration_source text DEFAULT 'direct',
ADD COLUMN IF NOT EXISTS first_landing_page text,
ADD COLUMN IF NOT EXISTS referral_code text,
ADD COLUMN IF NOT EXISTS referred_by text,
ADD COLUMN IF NOT EXISTS deleted_at timestamp with time zone,
ADD COLUMN IF NOT EXISTS deleted_by text;

-- Add indexes
CREATE INDEX IF NOT EXISTS idx_profiles_deleted_at ON public.profiles(deleted_at);
CREATE INDEX IF NOT EXISTS idx_profiles_referral_code ON public.profiles(referral_code);
CREATE INDEX IF NOT EXISTS idx_profiles_referred_by ON public.profiles(referred_by);