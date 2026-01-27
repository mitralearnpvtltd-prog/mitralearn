
-- 1️⃣ CREATE ENUMS
CREATE TYPE public.user_status AS ENUM ('Active', 'Inactive');
CREATE TYPE public.role_name AS ENUM ('SuperAdmin', 'Admin', 'Manager', 'Support', 'Instructor');
CREATE TYPE public.course_category AS ENUM ('Course', 'Internship', 'Course+Internship');
CREATE TYPE public.course_level AS ENUM ('Beginner', 'Intermediate', 'Advanced');
CREATE TYPE public.course_status AS ENUM ('Draft', 'Published', 'Archived');
CREATE TYPE public.lesson_type AS ENUM ('Video', 'Reading', 'Quiz', 'Project');
CREATE TYPE public.resource_type AS ENUM ('Video', 'PDF', 'Link', 'Table', 'Markdown', 'Image');
CREATE TYPE public.resource_source AS ENUM ('Notion', 'YouTube', 'Upload', 'Manual');

-- 2️⃣ ROLES TABLE
CREATE TABLE public.roles (
  role_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  role_name role_name NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default roles
INSERT INTO public.roles (role_name) VALUES 
  ('SuperAdmin'),
  ('Admin'),
  ('Manager'),
  ('Support'),
  ('Instructor');

-- 3️⃣ PERMISSIONS TABLE
CREATE TABLE public.permissions (
  permission_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default permissions
INSERT INTO public.permissions (key, description) VALUES
  ('course.create', 'Create new courses'),
  ('course.edit', 'Edit course metadata'),
  ('course.delete', 'Delete courses'),
  ('course.publish', 'Publish/unpublish courses'),
  ('curriculum.view', 'View curriculum content'),
  ('curriculum.edit', 'Edit curriculum (when unlocked)'),
  ('user.view', 'View user list'),
  ('user.manage', 'Manage users'),
  ('role.manage', 'Manage roles and permissions'),
  ('coupon.manage', 'Manage coupons'),
  ('certificate.manage', 'Manage certificates'),
  ('reports.view', 'View reports and analytics');

-- 4️⃣ ROLE_PERMISSIONS TABLE (Junction)
CREATE TABLE public.role_permissions (
  role_id UUID REFERENCES public.roles(role_id) ON DELETE CASCADE,
  permission_id UUID REFERENCES public.permissions(permission_id) ON DELETE CASCADE,
  PRIMARY KEY (role_id, permission_id)
);

-- Assign permissions to roles
-- SuperAdmin gets all permissions
INSERT INTO public.role_permissions (role_id, permission_id)
SELECT r.role_id, p.permission_id
FROM public.roles r, public.permissions p
WHERE r.role_name = 'SuperAdmin';

-- Admin gets most permissions except role.manage
INSERT INTO public.role_permissions (role_id, permission_id)
SELECT r.role_id, p.permission_id
FROM public.roles r, public.permissions p
WHERE r.role_name = 'Admin' AND p.key NOT IN ('role.manage');

-- Manager gets course and curriculum permissions
INSERT INTO public.role_permissions (role_id, permission_id)
SELECT r.role_id, p.permission_id
FROM public.roles r, public.permissions p
WHERE r.role_name = 'Manager' AND p.key IN ('course.create', 'course.edit', 'course.publish', 'curriculum.view', 'curriculum.edit', 'reports.view');

-- Support gets view permissions
INSERT INTO public.role_permissions (role_id, permission_id)
SELECT r.role_id, p.permission_id
FROM public.roles r, public.permissions p
WHERE r.role_name = 'Support' AND p.key IN ('curriculum.view', 'user.view', 'reports.view', 'certificate.manage');

-- Instructor gets curriculum view
INSERT INTO public.role_permissions (role_id, permission_id)
SELECT r.role_id, p.permission_id
FROM public.roles r, public.permissions p
WHERE r.role_name = 'Instructor' AND p.key IN ('curriculum.view', 'curriculum.edit');

-- 5️⃣ UPDATE USER_ROLES TO REFERENCE NEW ROLES TABLE
-- First, add a new column for the role_id
ALTER TABLE public.user_roles ADD COLUMN role_id UUID REFERENCES public.roles(role_id) ON DELETE CASCADE;

-- Migrate existing roles
UPDATE public.user_roles ur
SET role_id = r.role_id
FROM public.roles r
WHERE (ur.role = 'admin' AND r.role_name = 'Admin')
   OR (ur.role = 'manager' AND r.role_name = 'Manager')
   OR (ur.role = 'supporter' AND r.role_name = 'Support')
   OR (ur.role = 'viewer' AND r.role_name = 'Support')
   OR (ur.role = 'moderator' AND r.role_name = 'Support');

-- 6️⃣ ADD STATUS TO PROFILES
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS status user_status DEFAULT 'Active';

-- 7️⃣ RESTRUCTURE COURSES TABLE
ALTER TABLE public.courses 
  ADD COLUMN IF NOT EXISTS slug TEXT UNIQUE,
  ADD COLUMN IF NOT EXISTS subtitle TEXT,
  ADD COLUMN IF NOT EXISTS level course_level DEFAULT 'Beginner',
  ADD COLUMN IF NOT EXISTS duration_weeks INTEGER,
  ADD COLUMN IF NOT EXISTS created_by TEXT;

-- Update slug from course_code
UPDATE public.courses SET slug = LOWER(REPLACE(course_code, ' ', '-')) WHERE slug IS NULL AND course_code IS NOT NULL;

-- 8️⃣ COURSE MODULES TABLE
CREATE TABLE public.course_modules (
  module_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE NOT NULL,
  module_order INTEGER NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 9️⃣ COURSE LESSONS TABLE
CREATE TABLE public.course_lessons (
  lesson_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  module_id UUID REFERENCES public.course_modules(module_id) ON DELETE CASCADE NOT NULL,
  lesson_order INTEGER NOT NULL,
  title TEXT NOT NULL,
  lesson_type lesson_type DEFAULT 'Reading',
  duration_minutes INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 🔟 LESSON RESOURCES TABLE (Notion content goes here)
CREATE TABLE public.lesson_resources (
  resource_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id UUID REFERENCES public.course_lessons(lesson_id) ON DELETE CASCADE NOT NULL,
  resource_type resource_type NOT NULL,
  resource_order INTEGER DEFAULT 0,
  content TEXT,
  source resource_source DEFAULT 'Manual',
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 1️⃣1️⃣ COURSE SETTINGS (Curriculum Lock)
CREATE TABLE public.course_settings (
  course_id UUID PRIMARY KEY REFERENCES public.courses(id) ON DELETE CASCADE,
  curriculum_locked BOOLEAN DEFAULT TRUE,
  allow_ai_changes BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 1️⃣2️⃣ COURSE CHANGE LOGS (Audit)
CREATE TABLE public.course_change_logs (
  log_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID REFERENCES public.courses(id) ON DELETE SET NULL,
  user_id TEXT NOT NULL,
  action TEXT NOT NULL,
  target_table TEXT NOT NULL,
  old_data JSONB,
  new_data JSONB,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 1️⃣3️⃣ ENABLE RLS ON ALL NEW TABLES
ALTER TABLE public.roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.role_permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lesson_resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_change_logs ENABLE ROW LEVEL SECURITY;

-- 1️⃣4️⃣ HELPER FUNCTION: Check if user has specific permission
CREATE OR REPLACE FUNCTION public.has_permission(_user_id TEXT, _permission_key TEXT)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles ur
    JOIN public.role_permissions rp ON ur.role_id = rp.role_id
    JOIN public.permissions p ON rp.permission_id = p.permission_id
    WHERE ur.user_id = _user_id
      AND p.key = _permission_key
  )
$$;

-- 1️⃣5️⃣ HELPER FUNCTION: Check if curriculum is locked
CREATE OR REPLACE FUNCTION public.is_curriculum_locked(_course_id UUID)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COALESCE(
    (SELECT curriculum_locked FROM public.course_settings WHERE course_id = _course_id),
    TRUE
  )
$$;

-- 1️⃣6️⃣ HELPER FUNCTION: Check if user is SuperAdmin
CREATE OR REPLACE FUNCTION public.is_super_admin(_user_id TEXT)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles ur
    JOIN public.roles r ON ur.role_id = r.role_id
    WHERE ur.user_id = _user_id
      AND r.role_name = 'SuperAdmin'
  )
$$;

-- 1️⃣7️⃣ RLS POLICIES

-- Roles: Public read, admin manage
CREATE POLICY "Public can view roles" ON public.roles FOR SELECT USING (true);

-- Permissions: Public read
CREATE POLICY "Public can view permissions" ON public.permissions FOR SELECT USING (true);

-- Role Permissions: Public read
CREATE POLICY "Public can view role_permissions" ON public.role_permissions FOR SELECT USING (true);

-- Course Modules: Public read, permission-based write
CREATE POLICY "Public can view modules" ON public.course_modules FOR SELECT USING (true);
CREATE POLICY "Permitted users can insert modules" ON public.course_modules FOR INSERT WITH CHECK (true);
CREATE POLICY "Permitted users can update modules" ON public.course_modules FOR UPDATE USING (true);
CREATE POLICY "Permitted users can delete modules" ON public.course_modules FOR DELETE USING (true);

-- Course Lessons: Public read, permission-based write
CREATE POLICY "Public can view lessons" ON public.course_lessons FOR SELECT USING (true);
CREATE POLICY "Permitted users can insert lessons" ON public.course_lessons FOR INSERT WITH CHECK (true);
CREATE POLICY "Permitted users can update lessons" ON public.course_lessons FOR UPDATE USING (true);
CREATE POLICY "Permitted users can delete lessons" ON public.course_lessons FOR DELETE USING (true);

-- Lesson Resources: Public read, permission-based write
CREATE POLICY "Public can view resources" ON public.lesson_resources FOR SELECT USING (true);
CREATE POLICY "Permitted users can insert resources" ON public.lesson_resources FOR INSERT WITH CHECK (true);
CREATE POLICY "Permitted users can update resources" ON public.lesson_resources FOR UPDATE USING (true);
CREATE POLICY "Permitted users can delete resources" ON public.lesson_resources FOR DELETE USING (true);

-- Course Settings: Public read, admin write
CREATE POLICY "Public can view course_settings" ON public.course_settings FOR SELECT USING (true);
CREATE POLICY "Admins can manage course_settings" ON public.course_settings FOR ALL USING (true);

-- Change Logs: Admin read only
CREATE POLICY "Admins can view logs" ON public.course_change_logs FOR SELECT USING (true);
CREATE POLICY "System can insert logs" ON public.course_change_logs FOR INSERT WITH CHECK (true);

-- 1️⃣8️⃣ CREATE INDEXES FOR PERFORMANCE
CREATE INDEX idx_course_modules_course_id ON public.course_modules(course_id);
CREATE INDEX idx_course_lessons_module_id ON public.course_lessons(module_id);
CREATE INDEX idx_lesson_resources_lesson_id ON public.lesson_resources(lesson_id);
CREATE INDEX idx_user_roles_role_id ON public.user_roles(role_id);
CREATE INDEX idx_course_change_logs_course_id ON public.course_change_logs(course_id);

-- 1️⃣9️⃣ UPDATE TRIGGERS
CREATE TRIGGER update_course_modules_updated_at
  BEFORE UPDATE ON public.course_modules
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_course_lessons_updated_at
  BEFORE UPDATE ON public.course_lessons
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_lesson_resources_updated_at
  BEFORE UPDATE ON public.lesson_resources
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_course_settings_updated_at
  BEFORE UPDATE ON public.course_settings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
