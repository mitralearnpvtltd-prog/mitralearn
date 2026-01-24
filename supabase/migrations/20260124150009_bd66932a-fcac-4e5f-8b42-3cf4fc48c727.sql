-- Add course_code column to courses table
ALTER TABLE public.courses 
ADD COLUMN course_code text UNIQUE;

-- Create index for faster lookups
CREATE INDEX idx_courses_course_code ON public.courses(course_code);

-- Update app_role enum to include new roles
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'manager';
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'supporter';
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'viewer';