import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Course {
  id: string;
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
  title: string;
  description: string;
  category: string;
  category_badge: string;
  concepts: string[];
  extra_concepts_count: number;
  duration: string;
  price: number;
  original_price?: number;
  students_count: string;
  rating: number;
  reviews_count: string;
  badge: string;
  badge_color: string;
  icon_bg: string;
  icon_type: string;
  image_url?: string;
  status: 'active' | 'coming_soon' | 'draft';
  is_published: boolean;
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

  const createCourse = async (courseData: CourseFormData) => {
    const { data, error } = await supabase
      .from('courses')
      .insert([courseData])
      .select()
      .single();

    if (error) throw error;
    return data;
  };

  const updateCourse = async (id: string, courseData: Partial<CourseFormData>) => {
    const { data, error } = await supabase
      .from('courses')
      .update(courseData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  };

  const deleteCourse = async (id: string) => {
    // Soft delete by setting is_published to false and status to draft
    const { error } = await supabase
      .from('courses')
      .update({ is_published: false, status: 'draft' })
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
