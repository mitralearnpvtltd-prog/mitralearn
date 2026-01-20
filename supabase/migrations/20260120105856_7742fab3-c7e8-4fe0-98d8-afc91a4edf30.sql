-- Create courses table
CREATE TABLE public.courses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  category_badge TEXT,
  concepts TEXT[] NOT NULL DEFAULT '{}',
  extra_concepts_count INTEGER DEFAULT 0,
  duration TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL DEFAULT 0,
  original_price DECIMAL(10,2),
  students_count TEXT DEFAULT '0',
  rating DECIMAL(2,1) DEFAULT 0,
  reviews_count TEXT DEFAULT '0',
  badge TEXT,
  badge_color TEXT DEFAULT '#7C3AED',
  icon_bg TEXT DEFAULT '#7C3AED',
  icon_type TEXT DEFAULT 'database',
  image_url TEXT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('active', 'coming_soon', 'draft')),
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;

-- Create policies for courses (public read for published, admin write)
CREATE POLICY "Anyone can view published courses"
ON public.courses
FOR SELECT
USING (is_published = true);

CREATE POLICY "Admins can view all courses"
ON public.courses
FOR SELECT
USING (public.has_role(auth.uid()::text, 'admin'::app_role));

CREATE POLICY "Admins can insert courses"
ON public.courses
FOR INSERT
WITH CHECK (public.has_role(auth.uid()::text, 'admin'::app_role));

CREATE POLICY "Admins can update courses"
ON public.courses
FOR UPDATE
USING (public.has_role(auth.uid()::text, 'admin'::app_role));

CREATE POLICY "Admins can delete courses"
ON public.courses
FOR DELETE
USING (public.has_role(auth.uid()::text, 'admin'::app_role));

-- Create coupons table
CREATE TABLE public.coupons (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  discount_type TEXT NOT NULL CHECK (discount_type IN ('percentage', 'fixed')),
  discount_value DECIMAL(10,2) NOT NULL,
  applicable_courses TEXT[] DEFAULT NULL,
  applies_to_all BOOLEAN DEFAULT true,
  minimum_order_value DECIMAL(10,2) DEFAULT 0,
  expiry_date TIMESTAMP WITH TIME ZONE,
  usage_limit INTEGER,
  usage_count INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.coupons ENABLE ROW LEVEL SECURITY;

-- Create policies for coupons
CREATE POLICY "Anyone can view active coupons"
ON public.coupons
FOR SELECT
USING (is_active = true);

CREATE POLICY "Admins can view all coupons"
ON public.coupons
FOR SELECT
USING (public.has_role(auth.uid()::text, 'admin'::app_role));

CREATE POLICY "Admins can insert coupons"
ON public.coupons
FOR INSERT
WITH CHECK (public.has_role(auth.uid()::text, 'admin'::app_role));

CREATE POLICY "Admins can update coupons"
ON public.coupons
FOR UPDATE
USING (public.has_role(auth.uid()::text, 'admin'::app_role));

CREATE POLICY "Admins can delete coupons"
ON public.coupons
FOR DELETE
USING (public.has_role(auth.uid()::text, 'admin'::app_role));

-- Create trigger for automatic timestamp updates on courses
CREATE TRIGGER update_courses_updated_at
BEFORE UPDATE ON public.courses
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create trigger for automatic timestamp updates on coupons
CREATE TRIGGER update_coupons_updated_at
BEFORE UPDATE ON public.coupons
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert existing courses as initial data
INSERT INTO public.courses (title, description, category, category_badge, concepts, extra_concepts_count, duration, price, badge, badge_color, icon_bg, icon_type, status, is_published) VALUES
('Data Engineering', 'Build scalable data pipelines and infrastructures for big data processing.', 'DATA ENGINEERING', 'Tech Fundamentals', ARRAY['Python', 'SQL', 'ETL'], 1, '12 weeks', 24999, 'Project + Internship', '#7C3AED', '#7C3AED', 'database', 'active', true),
('AI Engineer', 'Master NLP, chatbots, and build intelligent systems with cutting-edge technologies.', 'ARTIFICIAL INTELLIGENCE', 'AI & ML', ARRAY['ML', 'DL', 'NLP'], 2, '16 weeks', 29999, 'Project + Internship', '#7C3AED', '#F97316', 'brain', 'coming_soon', true),
('Fullstack Developer', 'Build complete web applications from frontend to backend with modern frameworks.', 'WEB DEVELOPMENT', 'Full Stack', ARRAY['React', 'Node.js', 'APIs'], 1, '14 weeks', 24999, 'Project + Internship', '#7C3AED', '#06B6D4', 'code', 'coming_soon', true),
('Python AI Engineer', 'Specialize in Python for AI, machine learning, and data science applications.', 'AI & PYTHON', 'Python', ARRAY['Python', 'TensorFlow', 'PyTorch'], 2, '16 weeks', 29999, 'Project + Internship', '#7C3AED', '#6366F1', 'brain', 'coming_soon', true),
('Java Fullstack', 'Build enterprise-grade applications with Java and Spring ecosystem.', 'ENTERPRISE DEVELOPMENT', 'Enterprise', ARRAY['Java', 'Spring', 'Microservices'], 2, '18 weeks', 29999, 'Advanced', '#7C3AED', '#F97316', 'code', 'coming_soon', true),
('Product Marketing', 'Drive product adoption, market positioning, and growth strategies.', 'MARKETING & GROWTH', 'Marketing', ARRAY['GTM', 'Research', 'Positioning'], 2, '10 weeks', 19999, 'Project + Internship', '#7C3AED', '#EC4899', 'trending-up', 'coming_soon', true);