import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface UseLessonOverviewResult {
  content: string;
  lessonId: string | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

/**
 * Hook to fetch and manage lesson overview content from lesson_resources table
 * Uses Markdown resource type with Manual source for admin-edited content
 */
export function useLessonOverview(submoduleId: string): UseLessonOverviewResult {
  const [content, setContent] = useState<string>('');
  const [lessonId, setLessonId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchOverview = useCallback(async () => {
    if (!submoduleId) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      // First, find the lesson that matches this submodule
      // The submodule format is like "1.1", "1.2", etc.
      // We need to map this to the actual lesson in the database
      const [moduleOrder, lessonOrder] = submoduleId.split('.').map(Number);

      // Find the course module first (assuming we're looking at the Data Engineering course)
      const { data: modules, error: moduleError } = await supabase
        .from('course_modules')
        .select('module_id, course_id')
        .eq('module_order', moduleOrder)
        .limit(1);

      if (moduleError) throw moduleError;

      if (!modules || modules.length === 0) {
        // No module found, return empty
        setLessonId(null);
        setContent('');
        setIsLoading(false);
        return;
      }

      const module = modules[0];

      // Find the lesson within this module
      const { data: lessons, error: lessonError } = await supabase
        .from('course_lessons')
        .select('lesson_id')
        .eq('module_id', module.module_id)
        .eq('lesson_order', lessonOrder)
        .limit(1);

      if (lessonError) throw lessonError;

      if (!lessons || lessons.length === 0) {
        setLessonId(null);
        setContent('');
        setIsLoading(false);
        return;
      }

      const lesson = lessons[0];
      setLessonId(lesson.lesson_id);

      // Fetch the overview resource (Markdown type, Manual source)
      const { data: resources, error: resourceError } = await supabase
        .from('lesson_resources')
        .select('content')
        .eq('lesson_id', lesson.lesson_id)
        .eq('resource_type', 'Markdown')
        .eq('source', 'Manual')
        .limit(1);

      if (resourceError) throw resourceError;

      if (resources && resources.length > 0 && resources[0].content) {
        setContent(resources[0].content);
      } else {
        setContent('');
      }
    } catch (err) {
      console.error('Error fetching lesson overview:', err);
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, [submoduleId]);

  useEffect(() => {
    fetchOverview();
  }, [fetchOverview]);

  return {
    content,
    lessonId,
    isLoading,
    error,
    refetch: fetchOverview,
  };
}
