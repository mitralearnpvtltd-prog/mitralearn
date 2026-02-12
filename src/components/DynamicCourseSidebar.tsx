import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, ChevronUp, Play, CheckCircle2, ArrowLeft, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

interface CourseModule {
  module_id: string;
  module_order: number;
  title: string;
  description: string | null;
}

interface CourseLesson {
  lesson_id: string;
  module_id: string;
  lesson_order: number;
  title: string;
  lesson_type: string | null;
  duration_minutes: number | null;
}

interface DynamicCourseSidebarProps {
  courseId: string;
  courseTitle: string;
  modules: CourseModule[];
  lessons: CourseLesson[];
  currentLessonId?: string;
}

export const DynamicCourseSidebar = ({
  courseId,
  courseTitle,
  modules,
  lessons,
  currentLessonId,
}: DynamicCourseSidebarProps) => {
  const navigate = useNavigate();

  const currentModule = modules.find((m) =>
    lessons.some(
      (l) => l.module_id === m.module_id && l.lesson_id === currentLessonId
    )
  );

  const [expandedModules, setExpandedModules] = useState<string[]>(
    currentModule ? [currentModule.module_id] : modules.length > 0 ? [modules[0].module_id] : []
  );

  const toggleModule = (moduleId: string) => {
    setExpandedModules((prev) =>
      prev.includes(moduleId)
        ? prev.filter((m) => m !== moduleId)
        : [...prev, moduleId]
    );
  };

  const getLessonsForModule = (moduleId: string) =>
    lessons.filter((l) => l.module_id === moduleId).sort((a, b) => a.lesson_order - b.lesson_order);

  const totalLessons = lessons.length;

  return (
    <aside className="w-80 border-r border-border bg-card flex-shrink-0 h-[calc(100vh-64px)] overflow-y-auto hidden lg:block sticky top-0">
      {/* Back to Course */}
      <div className="p-4 border-b border-border">
        <button
          onClick={() => navigate(`/course/${courseId}`)}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Course
        </button>
      </div>

      {/* Course Content Header */}
      <div className="p-4 border-b border-border">
        <h2 className="font-semibold text-foreground mb-1 text-sm">{courseTitle}</h2>
        <p className="text-xs text-muted-foreground">
          {modules.length} modules • {totalLessons} lessons
        </p>
      </div>

      {/* Modules List */}
      <div className="py-2">
        {modules.map((mod) => {
          const isExpanded = expandedModules.includes(mod.module_id);
          const moduleLessons = getLessonsForModule(mod.module_id);

          return (
            <div key={mod.module_id} className="border-b border-border/50 last:border-b-0">
              {/* Module Header */}
              <button
                onClick={() => toggleModule(mod.module_id)}
                className="w-full px-4 py-3 flex items-start gap-3 hover:bg-muted/50 transition-colors"
              >
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 bg-primary/10 text-primary">
                  {mod.module_order}
                </div>

                <div className="flex-1 text-left">
                  <h3 className="font-medium text-sm text-foreground">
                    {mod.title}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {moduleLessons.length} lessons
                  </p>
                </div>

                {isExpanded ? (
                  <ChevronUp className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-1" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-1" />
                )}
              </button>

              {/* Lessons List */}
              {isExpanded && (
                <div className="pb-2">
                  {moduleLessons.map((lesson) => {
                    const isCurrent = lesson.lesson_id === currentLessonId;

                    return (
                      <button
                        key={lesson.lesson_id}
                        onClick={() =>
                          navigate(
                            `/course/${courseId}/lesson/${lesson.lesson_id}`
                          )
                        }
                        className={cn(
                          "w-full pl-12 pr-4 py-2.5 flex items-center gap-3 text-left transition-colors",
                          isCurrent
                            ? "bg-primary/10 text-primary"
                            : "hover:bg-muted/50 text-muted-foreground hover:text-foreground"
                        )}
                      >
                        <Play
                          className={cn(
                            "w-4 h-4 flex-shrink-0",
                            isCurrent
                              ? "text-primary"
                              : "text-muted-foreground"
                          )}
                        />
                        <div className="flex-1 min-w-0">
                          <p
                            className={cn(
                              "text-sm truncate",
                              isCurrent && "font-medium text-primary"
                            )}
                          >
                            {lesson.title}
                          </p>
                          {lesson.duration_minutes && (
                            <p className="text-xs text-muted-foreground">
                              {lesson.duration_minutes} min
                            </p>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
};
