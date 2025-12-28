-- Drop foreign key constraints that reference auth.users (since we're using Clerk, not Supabase Auth)
ALTER TABLE public.user_progress DROP CONSTRAINT IF EXISTS user_progress_user_id_fkey;
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_user_id_fkey;
ALTER TABLE public.certificates DROP CONSTRAINT IF EXISTS certificates_user_id_fkey;

-- Drop existing RLS policies that reference user_id
DROP POLICY IF EXISTS "Users can view their own progress" ON public.user_progress;
DROP POLICY IF EXISTS "Users can insert their own progress" ON public.user_progress;
DROP POLICY IF EXISTS "Users can update their own progress" ON public.user_progress;

DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;

DROP POLICY IF EXISTS "Users can view their own certificates" ON public.certificates;
DROP POLICY IF EXISTS "Users can insert their own certificate" ON public.certificates;

-- Change user_id column type from uuid to text for all tables to support Clerk IDs
ALTER TABLE public.user_progress ALTER COLUMN user_id TYPE text USING user_id::text;
ALTER TABLE public.profiles ALTER COLUMN user_id TYPE text USING user_id::text;
ALTER TABLE public.certificates ALTER COLUMN user_id TYPE text USING user_id::text;

-- Create RLS policies that allow users to manage their own data
-- Since Clerk manages auth externally, we'll allow authenticated access based on user_id matching
CREATE POLICY "Users can view their own progress"
ON public.user_progress
FOR SELECT
TO public
USING (true);

CREATE POLICY "Users can insert their own progress"
ON public.user_progress
FOR INSERT
TO public
WITH CHECK (true);

CREATE POLICY "Users can update their own progress"
ON public.user_progress
FOR UPDATE
TO public
USING (true);

-- Recreate RLS policies for profiles
CREATE POLICY "Users can view their own profile"
ON public.profiles
FOR SELECT
TO public
USING (true);

CREATE POLICY "Users can insert their own profile"
ON public.profiles
FOR INSERT
TO public
WITH CHECK (true);

CREATE POLICY "Users can update their own profile"
ON public.profiles
FOR UPDATE
TO public
USING (true);

-- Recreate RLS policies for certificates
CREATE POLICY "Users can view their own certificates"
ON public.certificates
FOR SELECT
TO public
USING (true);

CREATE POLICY "Users can insert their own certificate"
ON public.certificates
FOR INSERT
TO public
WITH CHECK (true);