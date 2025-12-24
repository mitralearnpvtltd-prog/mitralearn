-- Add last_login, email_verified, and course_opted to profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS last_login timestamp with time zone,
ADD COLUMN IF NOT EXISTS email_verified boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS course_opted boolean DEFAULT false;

-- Add course_name and status to certificates table
ALTER TABLE public.certificates 
ADD COLUMN IF NOT EXISTS course_name text DEFAULT 'Data Science Fundamentals',
ADD COLUMN IF NOT EXISTS status text DEFAULT 'VALID' CHECK (status IN ('VALID', 'INVALID'));

-- Create admin_users view for dashboard (no role required, just authenticated users can access)
CREATE OR REPLACE VIEW public.admin_user_dashboard AS
SELECT 
  p.user_id,
  p.name,
  p.email,
  p.email_verified,
  p.course_opted,
  p.last_login,
  p.created_at as registered_at,
  up.completed_days,
  up.completed_quizzes,
  up.final_assessment_score,
  up.final_project_submitted,
  up.certificate_earned,
  up.certificate_id,
  c.certificate_id as cert_id,
  c.status as certificate_status,
  c.completion_date,
  c.overall_band,
  -- Calculate course progress as percentage
  COALESCE(array_length(up.completed_days, 1), 0) as completed_modules_count
FROM public.profiles p
LEFT JOIN public.user_progress up ON p.user_id = up.user_id
LEFT JOIN public.certificates c ON p.user_id = c.user_id;

-- Enable RLS on the view is not possible, but we'll create a function to fetch admin data
CREATE OR REPLACE FUNCTION public.get_admin_dashboard_data()
RETURNS TABLE (
  user_id uuid,
  name text,
  email text,
  email_verified boolean,
  course_opted boolean,
  last_login timestamp with time zone,
  registered_at timestamp with time zone,
  completed_days integer[],
  completed_quizzes jsonb,
  final_assessment_score integer,
  final_project_submitted boolean,
  certificate_earned boolean,
  certificate_id text,
  cert_id text,
  certificate_status text,
  completion_date date,
  overall_band text,
  completed_modules_count integer
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT 
    p.user_id,
    p.name,
    p.email,
    p.email_verified,
    p.course_opted,
    p.last_login,
    p.created_at as registered_at,
    up.completed_days,
    up.completed_quizzes,
    up.final_assessment_score,
    up.final_project_submitted,
    up.certificate_earned,
    up.certificate_id,
    c.certificate_id as cert_id,
    c.status as certificate_status,
    c.completion_date,
    c.overall_band,
    COALESCE(array_length(up.completed_days, 1), 0) as completed_modules_count
  FROM public.profiles p
  LEFT JOIN public.user_progress up ON p.user_id = up.user_id
  LEFT JOIN public.certificates c ON p.user_id = c.user_id
  ORDER BY p.created_at DESC;
$$;