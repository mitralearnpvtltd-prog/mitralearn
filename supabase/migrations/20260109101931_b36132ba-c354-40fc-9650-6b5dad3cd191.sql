-- Add project submission columns
ALTER TABLE public.user_progress
ADD COLUMN IF NOT EXISTS project_github_link TEXT,
ADD COLUMN IF NOT EXISTS project_video_link TEXT;