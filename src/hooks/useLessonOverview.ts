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
 * Hook to fetch and manage lesson overview content from lesson_resources table.
 * Supports two modes:
 * 1. submoduleId lookup (legacy "1.1" format)
 * 2. directLessonId (UUID for dynamic courses)
 */
export function useLessonOverview(submoduleId?: string, directLessonId?: string): UseLessonOverviewResult {
  const [content, setContent] = useState<string>('');
  const [lessonId, setLessonId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchOverview = useCallback(async () => {
    if (!submoduleId && !directLessonId) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      let resolvedLessonId: string | null = null;

      if (directLessonId) {
        // Direct lessonId mode — just use it
        resolvedLessonId = directLessonId;
      } else if (submoduleId) {
        // Legacy submodule lookup
        const [moduleOrder, lessonOrder] = submoduleId.split('.').map(Number);

        const { data: modules, error: moduleError } = await supabase
          .from('course_modules')
          .select('module_id, course_id')
          .eq('module_order', moduleOrder)
          .limit(1);

        if (moduleError) throw moduleError;
        if (!modules || modules.length === 0) {
          setLessonId(null);
          setContent('');
          setIsLoading(false);
          return;
        }

        const { data: lessons, error: lessonError } = await supabase
          .from('course_lessons')
          .select('lesson_id')
          .eq('module_id', modules[0].module_id)
          .eq('lesson_order', lessonOrder)
          .limit(1);

        if (lessonError) throw lessonError;
        if (!lessons || lessons.length === 0) {
          setLessonId(null);
          setContent('');
          setIsLoading(false);
          return;
        }

        resolvedLessonId = lessons[0].lesson_id;
      }

      setLessonId(resolvedLessonId);

      if (!resolvedLessonId) {
        setContent('');
        setIsLoading(false);
        return;
      }

      // Fetch the overview resource (Markdown type, Manual source)
      const { data: resources, error: resourceError } = await supabase
        .from('lesson_resources')
        .select('content')
        .eq('lesson_id', resolvedLessonId)
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
  }, [submoduleId, directLessonId]);

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
