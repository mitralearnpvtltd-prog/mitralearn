-- Drop existing restrictive policies on courses table
DROP POLICY IF EXISTS "Anyone can view published courses" ON public.courses;
DROP POLICY IF EXISTS "Admins can view all courses" ON public.courses;
DROP POLICY IF EXISTS "Admins can insert courses" ON public.courses;
DROP POLICY IF EXISTS "Admins can update courses" ON public.courses;
DROP POLICY IF EXISTS "Admins can delete courses" ON public.courses;

-- Create permissive policies for courses (auth handled by Clerk at app level)
CREATE POLICY "Allow public read courses"
ON public.courses
FOR SELECT
USING (true);

CREATE POLICY "Allow insert courses"
ON public.courses
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Allow update courses"
ON public.courses
FOR UPDATE
USING (true);

CREATE POLICY "Allow delete courses"
ON public.courses
FOR DELETE
USING (true);

-- Drop existing restrictive policies on coupons table
DROP POLICY IF EXISTS "Anyone can view active coupons" ON public.coupons;
DROP POLICY IF EXISTS "Admins can view all coupons" ON public.coupons;
DROP POLICY IF EXISTS "Admins can insert coupons" ON public.coupons;
DROP POLICY IF EXISTS "Admins can update coupons" ON public.coupons;
DROP POLICY IF EXISTS "Admins can delete coupons" ON public.coupons;

-- Create permissive policies for coupons (auth handled by Clerk at app level)
CREATE POLICY "Allow public read coupons"
ON public.coupons
FOR SELECT
USING (true);

CREATE POLICY "Allow insert coupons"
ON public.coupons
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Allow update coupons"
ON public.coupons
FOR UPDATE
USING (true);

CREATE POLICY "Allow delete coupons"
ON public.coupons
FOR DELETE
USING (true);