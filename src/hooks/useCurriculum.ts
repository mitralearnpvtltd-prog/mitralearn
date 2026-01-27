import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface CourseModule {
  module_id: string;
  course_id: string;
  module_order: number;
  title: string;
  description: string | null;
  created_at: string;
  updated_at: string;
  lessons?: CourseLesson[];
}

export interface CourseLesson {
  lesson_id: string;
  module_id: string;
  lesson_order: number;
  title: string;
  lesson_type: 'Video' | 'Reading' | 'Quiz' | 'Project';
  duration_minutes: number | null;
  created_at: string;
  updated_at: string;
  resources?: LessonResource[];
}

export interface LessonResource {
  resource_id: string;
  lesson_id: string;
  resource_type: 'Video' | 'PDF' | 'Link' | 'Table' | 'Markdown' | 'Image';
  resource_order: number;
  content: string | null;
  source: 'Notion' | 'YouTube' | 'Upload' | 'Manual';
  metadata: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface CourseSettings {
  course_id: string;
  curriculum_locked: boolean;
  allow_ai_changes: boolean;
}

// Fetch curriculum for a specific course
export function useCurriculum(courseId: string | null) {
  const [modules, setModules] = useState<CourseModule[]>([]);
  const [settings, setSettings] = useState<CourseSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchCurriculum = useCallback(async () => {
    if (!courseId) {
      setModules([]);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);

      // Fetch modules with lessons and resources
      const { data: modulesData, error: modulesError } = await supabase
        .from('course_modules')
        .select(`
          *,
          lessons:course_lessons (
            *,
            resources:lesson_resources (*)
          )
        `)
        .eq('course_id', courseId)
        .order('module_order', { ascending: true });

      if (modulesError) throw modulesError;

      // Sort lessons and resources within each module
      const sortedModules = (modulesData || []).map((module: any) => ({
        ...module,
        lessons: (module.lessons || [])
          .sort((a: any, b: any) => a.lesson_order - b.lesson_order)
          .map((lesson: any) => ({
            ...lesson,
            resources: (lesson.resources || []).sort(
              (a: any, b: any) => a.resource_order - b.resource_order
            ),
          })),
      }));

      setModules(sortedModules);

      // Fetch course settings
      const { data: settingsData } = await supabase
        .from('course_settings')
        .select('*')
        .eq('course_id', courseId)
        .maybeSingle();

      setSettings(settingsData);

    } catch (err) {
      setError(err as Error);
      console.error('Error fetching curriculum:', err);
    } finally {
      setIsLoading(false);
    }
  }, [courseId]);

  useEffect(() => {
    fetchCurriculum();
  }, [fetchCurriculum]);

  return { modules, settings, isLoading, error, refetch: fetchCurriculum };
}

// Hook for curriculum management (CRUD operations)
export function useCurriculumManagement() {
  
  const createModule = async (courseId: string, title: string, description?: string, order?: number) => {
    // Get the next order number if not provided
    if (order === undefined) {
      const { data: existing } = await supabase
        .from('course_modules')
        .select('module_order')
        .eq('course_id', courseId)
        .order('module_order', { ascending: false })
        .limit(1);
      
      order = existing && existing.length > 0 ? existing[0].module_order + 1 : 1;
    }

    const { data, error } = await supabase
      .from('course_modules')
      .insert([{ course_id: courseId, title, description, module_order: order }])
      .select()
      .single();

    if (error) throw error;
    return data;
  };

  const updateModule = async (moduleId: string, updates: Partial<CourseModule>) => {
    const { data, error } = await supabase
      .from('course_modules')
      .update(updates)
      .eq('module_id', moduleId)
      .select()
      .single();

    if (error) throw error;
    return data;
  };

  const deleteModule = async (moduleId: string) => {
    const { error } = await supabase
      .from('course_modules')
      .delete()
      .eq('module_id', moduleId);

    if (error) throw error;
  };

  const createLesson = async (
    moduleId: string, 
    title: string, 
    lessonType: CourseLesson['lesson_type'] = 'Reading',
    order?: number
  ) => {
    if (order === undefined) {
      const { data: existing } = await supabase
        .from('course_lessons')
        .select('lesson_order')
        .eq('module_id', moduleId)
        .order('lesson_order', { ascending: false })
        .limit(1);
      
      order = existing && existing.length > 0 ? existing[0].lesson_order + 1 : 1;
    }

    const { data, error } = await supabase
      .from('course_lessons')
      .insert([{ module_id: moduleId, title, lesson_type: lessonType, lesson_order: order }])
      .select()
      .single();

    if (error) throw error;
    return data;
  };

  const updateLesson = async (lessonId: string, updates: Partial<CourseLesson>) => {
    const { data, error } = await supabase
      .from('course_lessons')
      .update(updates)
      .eq('lesson_id', lessonId)
      .select()
      .single();

    if (error) throw error;
    return data;
  };

  const deleteLesson = async (lessonId: string) => {
    const { error } = await supabase
      .from('course_lessons')
      .delete()
      .eq('lesson_id', lessonId);

    if (error) throw error;
  };

  const createResource = async (
    lessonId: string,
    resourceType: LessonResource['resource_type'],
    content: string,
    source: LessonResource['source'] = 'Manual',
    order?: number
  ) => {
    if (order === undefined) {
      const { data: existing } = await supabase
        .from('lesson_resources')
        .select('resource_order')
        .eq('lesson_id', lessonId)
        .order('resource_order', { ascending: false })
        .limit(1);
      
      order = existing && existing.length > 0 ? existing[0].resource_order + 1 : 0;
    }

    const { data, error } = await supabase
      .from('lesson_resources')
      .insert([{ 
        lesson_id: lessonId, 
        resource_type: resourceType, 
        content, 
        source, 
        resource_order: order 
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  };

  const updateResource = async (resourceId: string, updates: Partial<LessonResource>) => {
    const { data, error } = await supabase
      .from('lesson_resources')
      .update(updates)
      .eq('resource_id', resourceId)
      .select()
      .single();

    if (error) throw error;
    return data;
  };

  const deleteResource = async (resourceId: string) => {
    const { error } = await supabase
      .from('lesson_resources')
      .delete()
      .eq('resource_id', resourceId);

    if (error) throw error;
  };

  const updateCourseSettings = async (courseId: string, settings: Partial<CourseSettings>) => {
    const { data, error } = await supabase
      .from('course_settings')
      .upsert({ course_id: courseId, ...settings })
      .select()
      .single();

    if (error) throw error;
    return data;
  };

  return {
    createModule,
    updateModule,
    deleteModule,
    createLesson,
    updateLesson,
    deleteLesson,
    createResource,
    updateResource,
    deleteResource,
    updateCourseSettings,
  };
}
