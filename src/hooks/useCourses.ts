import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Course {
  id: string;
  course_code: string | null;
  title: string;
  description: string;
  category: string;
  category_badge: string | null;
  concepts: string[];
  extra_concepts_count: number;
  duration: string;
  price: number;
  original_price: number | null;
  students_count: string;
  rating: number;
  reviews_count: string;
  badge: string | null;
  badge_color: string;
  icon_bg: string;
  icon_type: string;
  image_url: string | null;
  status: 'active' | 'coming_soon' | 'draft';
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface CourseFormData {
  course_code: string;
  title: string;
  description: string;
  category: string;
  category_badge: string;
  concepts: string[];
  extra_concepts_count: number;
  duration: string;
  price: number;
  original_price?: number | null;
  students_count: string;
  rating: number;
  reviews_count: string;
  badge: string;
  badge_color: string;
  icon_bg: string;
  icon_type: string;
  image_url?: string | null;
  status: 'active' | 'coming_soon' | 'draft';
  is_published: boolean;
}

// Validation helper
export function validateCourseData(data: CourseFormData): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (!data.title?.trim()) errors.push("Title is required");
  if (!data.description?.trim()) errors.push("Description is required");
  if (!data.category?.trim()) errors.push("Category is required");
  if (!data.duration?.trim()) errors.push("Duration is required");
  if (data.price < 0) errors.push("Price must be a positive number");
  if (data.rating < 0 || data.rating > 5) errors.push("Rating must be between 0 and 5");
  
  return { valid: errors.length === 0, errors };
}

// Upload course image to storage
export async function uploadCourseImage(file: File, courseId?: string): Promise<string> {
  const fileExt = file.name.split('.').pop();
  const fileName = `${courseId || crypto.randomUUID()}-${Date.now()}.${fileExt}`;
  const filePath = `courses/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from('course-images')
    .upload(filePath, file, { upsert: true });

  if (uploadError) throw uploadError;

  const { data: { publicUrl } } = supabase.storage
    .from('course-images')
    .getPublicUrl(filePath);

  return publicUrl;
}

// Hook to fetch published courses (for landing page)
export function usePublishedCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchCourses = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setCourses((data as Course[]) || []);
    } catch (err) {
      setError(err as Error);
      console.error('Error fetching courses:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCourses();

    // Real-time subscription
    const channel = supabase
      .channel('courses-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'courses' }, () => {
        fetchCourses();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchCourses]);

  return { courses, isLoading, error, refetch: fetchCourses };
}

// Hook to fetch all courses (for admin)
export function useAdminCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchCourses = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) throw error;
      setCourses((data as Course[]) || []);
    } catch (err) {
      setError(err as Error);
      console.error('Error fetching courses:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCourses();

    // Real-time subscription
    const channel = supabase
      .channel('admin-courses-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'courses' }, () => {
        fetchCourses();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchCourses]);

  const createCourse = async (courseData: CourseFormData): Promise<Course> => {
    // Validate before sending to database
    const validation = validateCourseData(courseData);
    if (!validation.valid) {
      throw new Error(validation.errors.join(', '));
    }

    // Prepare data for insertion - ensure proper types
    const insertData = {
      course_code: courseData.course_code || null,
      title: courseData.title.trim(),
      description: courseData.description.trim(),
      category: courseData.category.trim(),
      category_badge: courseData.category_badge || null,
      concepts: courseData.concepts || [],
      extra_concepts_count: courseData.extra_concepts_count || 0,
      duration: courseData.duration.trim(),
      price: Number(courseData.price) || 0,
      original_price: courseData.original_price ? Number(courseData.original_price) : null,
      students_count: courseData.students_count || '0',
      rating: Number(courseData.rating) || 0,
      reviews_count: courseData.reviews_count || '0',
      badge: courseData.badge || null,
      badge_color: courseData.badge_color || '#7C3AED',
      icon_bg: courseData.icon_bg || '#7C3AED',
      icon_type: courseData.icon_type || 'database',
      image_url: courseData.image_url || null,
      status: courseData.status || 'draft',
      is_published: courseData.is_published || false,
    };

    const { data, error } = await supabase
      .from('courses')
      .insert([insertData])
      .select()
      .single();

    if (error) {
      console.error('Create course error:', error);
      throw new Error(`Failed to create course: ${error.message}`);
    }
    
    if (!data) {
      throw new Error('Course created but no data returned');
    }

    return data as Course;
  };

  const updateCourse = async (id: string, courseData: Partial<CourseFormData>): Promise<Course> => {
    // Prepare update data - only include defined fields
    const updateData: Record<string, unknown> = {};
    
    if (courseData.course_code !== undefined) updateData.course_code = courseData.course_code || null;
    if (courseData.title !== undefined) updateData.title = courseData.title.trim();
    if (courseData.description !== undefined) updateData.description = courseData.description.trim();
    if (courseData.category !== undefined) updateData.category = courseData.category.trim();
    if (courseData.category_badge !== undefined) updateData.category_badge = courseData.category_badge || null;
    if (courseData.concepts !== undefined) updateData.concepts = courseData.concepts || [];
    if (courseData.extra_concepts_count !== undefined) updateData.extra_concepts_count = courseData.extra_concepts_count || 0;
    if (courseData.duration !== undefined) updateData.duration = courseData.duration.trim();
    if (courseData.price !== undefined) updateData.price = Number(courseData.price) || 0;
    if (courseData.original_price !== undefined) updateData.original_price = courseData.original_price ? Number(courseData.original_price) : null;
    if (courseData.students_count !== undefined) updateData.students_count = courseData.students_count || '0';
    if (courseData.rating !== undefined) updateData.rating = Number(courseData.rating) || 0;
    if (courseData.reviews_count !== undefined) updateData.reviews_count = courseData.reviews_count || '0';
    if (courseData.badge !== undefined) updateData.badge = courseData.badge || null;
    if (courseData.badge_color !== undefined) updateData.badge_color = courseData.badge_color || '#7C3AED';
    if (courseData.icon_bg !== undefined) updateData.icon_bg = courseData.icon_bg || '#7C3AED';
    if (courseData.icon_type !== undefined) updateData.icon_type = courseData.icon_type || 'database';
    if (courseData.image_url !== undefined) updateData.image_url = courseData.image_url || null;
    if (courseData.status !== undefined) updateData.status = courseData.status;
    if (courseData.is_published !== undefined) updateData.is_published = courseData.is_published;

    const { data, error } = await supabase
      .from('courses')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Update course error:', error);
      throw new Error(`Failed to update course: ${error.message}`);
    }
    
    return data as Course;
  };

  const deleteCourse = async (id: string) => {
    const { error } = await supabase
      .from('courses')
      .delete()
      .eq('id', id);

    if (error) throw error;
  };

  const togglePublish = async (id: string, isPublished: boolean) => {
    const { error } = await supabase
      .from('courses')
      .update({ is_published: isPublished })
      .eq('id', id);

    if (error) throw error;
  };

  const updateStatus = async (id: string, status: 'active' | 'coming_soon' | 'draft') => {
    const { error } = await supabase
      .from('courses')
      .update({ status })
      .eq('id', id);

    if (error) throw error;
  };

  return { 
    courses, 
    isLoading, 
    error, 
    refetch: fetchCourses,
    createCourse,
    updateCourse,
    deleteCourse,
    togglePublish,
    updateStatus
  };
}
