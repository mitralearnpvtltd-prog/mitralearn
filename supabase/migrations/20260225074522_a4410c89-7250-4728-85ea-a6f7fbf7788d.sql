
-- Create storage bucket for lesson content images
INSERT INTO storage.buckets (id, name, public)
VALUES ('lesson-content', 'lesson-content', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public read access
CREATE POLICY "Public can view lesson content"
ON storage.objects FOR SELECT
USING (bucket_id = 'lesson-content');

-- Allow authenticated users to upload
CREATE POLICY "Authenticated users can upload lesson content"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'lesson-content');

-- Allow authenticated users to delete their uploads
CREATE POLICY "Authenticated users can delete lesson content"
ON storage.objects FOR DELETE
USING (bucket_id = 'lesson-content');
