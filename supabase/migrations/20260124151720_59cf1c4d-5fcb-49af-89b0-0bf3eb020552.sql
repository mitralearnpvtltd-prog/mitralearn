-- Add new columns to profiles table for onboarding data
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS phone text,
ADD COLUMN IF NOT EXISTS location text,
ADD COLUMN IF NOT EXISTS age_group text,
ADD COLUMN IF NOT EXISTS enrolled_course_id uuid REFERENCES public.courses(id),
ADD COLUMN IF NOT EXISTS onboarding_completed boolean DEFAULT false;

-- Drop and recreate the get_admin_dashboard_data function to include new fields
DROP FUNCTION IF EXISTS public.get_admin_dashboard_data();

CREATE OR REPLACE FUNCTION public.get_admin_dashboard_data()
RETURNS TABLE(
  user_id text,
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
  completed_modules_count integer,
  device_info text,
  phone text,
  location text,
  age_group text,
  enrolled_course_id uuid,
  enrolled_course_title text,
  onboarding_completed boolean
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
    COALESCE(array_length(up.completed_days, 1), 0) as completed_modules_count,
    p.device_info,
    p.phone,
    p.location,
    p.age_group,
    p.enrolled_course_id,
    co.title as enrolled_course_title,
    COALESCE(p.onboarding_completed, false) as onboarding_completed
  FROM public.profiles p
  LEFT JOIN public.user_progress up ON p.user_id = up.user_id
  LEFT JOIN public.certificates c ON p.user_id = c.user_id
  LEFT JOIN public.courses co ON p.enrolled_course_id = co.id
  ORDER BY p.created_at DESC;
$$;