-- Add overview_content column to courses table for rich text content
ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS overview_content TEXT;

-- Add a comment for clarity
COMMENT ON COLUMN public.courses.overview_content IS 'HTML rich text content for course overview, editable by admins';