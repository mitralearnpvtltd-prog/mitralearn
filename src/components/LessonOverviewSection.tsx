import { InlineOverviewEditor } from './InlineOverviewEditor';
import { useLessonOverview } from '@/hooks/useLessonOverview';
import { Skeleton } from '@/components/ui/skeleton';

interface LessonOverviewSectionProps {
  /** submoduleId like "1.1" for legacy lookup */
  submoduleId?: string;
  /** Direct lessonId UUID for dynamic courses */
  directLessonId?: string;
}

/**
 * Wrapper component that handles fetching overview content
 * and renders the inline editor for admin users.
 * Supports both legacy submodule lookup and direct lessonId.
 */
export const LessonOverviewSection = ({ submoduleId, directLessonId }: LessonOverviewSectionProps) => {
  const { content, lessonId, isLoading, refetch } = useLessonOverview(submoduleId, directLessonId);

  if (isLoading) {
    return (
      <div className="space-y-4 mb-8">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-24 w-full" />
      </div>
    );
  }

  if (!lessonId) {
    return null;
  }

  return (
    <div className="mb-8">
      <InlineOverviewEditor
        lessonId={lessonId}
        initialContent={content}
        onContentChange={() => refetch()}
      />
    </div>
  );
};
