-- Create storage bucket for course images
INSERT INTO storage.buckets (id, name, public)
VALUES ('course-images', 'course-images', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public read access
CREATE POLICY "Public read access for course images"
ON storage.objects FOR SELECT
USING (bucket_id = 'course-images');

-- Allow authenticated users to upload (admins)
CREATE POLICY "Authenticated users can upload course images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'course-images');

-- Allow authenticated users to update their uploads
CREATE POLICY "Authenticated users can update course images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'course-images');

-- Allow authenticated users to delete
CREATE POLICY "Authenticated users can delete course images"
ON storage.objects FOR DELETE
USING (bucket_id = 'course-images');