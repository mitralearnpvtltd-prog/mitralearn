-- Create a function to set first admin if none exists
CREATE OR REPLACE FUNCTION public.setup_first_admin(_user_id text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  admin_count integer;
BEGIN
  -- Check if any admin exists
  SELECT COUNT(*) INTO admin_count
  FROM public.user_roles
  WHERE role = 'admin';
  
  -- If no admin exists, make this user admin
  IF admin_count = 0 THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (_user_id, 'admin')
    ON CONFLICT (user_id, role) DO NOTHING;
    RETURN true;
  END IF;
  
  RETURN false;
END;
$$;

-- Create function to get admin dashboard stats
CREATE OR REPLACE FUNCTION public.get_admin_stats()
RETURNS TABLE(
  total_users bigint,
  active_users bigint,
  total_certificates bigint,
  completion_rate numeric
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT 
    (SELECT COUNT(*) FROM public.profiles) as total_users,
    (SELECT COUNT(*) FROM public.profiles WHERE last_login > now() - interval '30 days') as active_users,
    (SELECT COUNT(*) FROM public.certificates WHERE status = 'VALID') as total_certificates,
    COALESCE(
      (SELECT AVG(COALESCE(array_length(completed_days, 1), 0)::numeric / 30 * 100) 
       FROM public.user_progress), 
      0
    ) as completion_rate;
$$;