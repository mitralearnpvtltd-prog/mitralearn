import { InlineOverviewEditor } from './InlineOverviewEditor';
import { useLessonOverview } from '@/hooks/useLessonOverview';
import { Skeleton } from '@/components/ui/skeleton';

interface LessonOverviewSectionProps {
  submoduleId: string;
}

/**
 * Wrapper component that handles fetching overview content
 * and renders the inline editor for admin users
 */
export const LessonOverviewSection = ({ submoduleId }: LessonOverviewSectionProps) => {
  const { content, lessonId, isLoading, refetch } = useLessonOverview(submoduleId);

  if (isLoading) {
    return (
      <div className="space-y-4 mb-8">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-24 w-full" />
      </div>
    );
  }

  // If no lessonId found, the lesson doesn't exist in DB yet
  // Don't show the editor in this case
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
