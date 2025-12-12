-- Drop the overly permissive SELECT policy
DROP POLICY IF EXISTS "Anyone can view certificates for verification" ON public.certificates;

-- Create a secure RPC function for certificate verification
-- This prevents full table scans while allowing specific certificate lookups
CREATE OR REPLACE FUNCTION public.verify_certificate(cert_id text)
RETURNS TABLE (
  student_name text,
  completion_date date,
  overall_band text,
  final_mcq_score integer,
  coding_challenge_score integer,
  capstone_submitted boolean,
  verified boolean,
  certificate_id text
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT 
    c.student_name,
    c.completion_date,
    c.overall_band,
    c.final_mcq_score,
    c.coding_challenge_score,
    c.capstone_submitted,
    c.verified,
    c.certificate_id
  FROM public.certificates c
  WHERE c.certificate_id = cert_id
  LIMIT 1;
$$;

-- Users can still view their own certificates
CREATE POLICY "Users can view their own certificates"
ON public.certificates
FOR SELECT
USING (auth.uid() = user_id);