-- Add 'Editor' to role_name enum
ALTER TYPE public.role_name ADD VALUE IF NOT EXISTS 'Editor';

-- Add 'editor' to app_role enum
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'editor';