import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ChevronDown, ChevronUp, Play, FileText, CheckCircle2, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { modules, submodules, getSlugFromSubmoduleId } from "@/data/curriculum";
import { useProgress } from "@/contexts/ProgressContext";
import { Progress } from "@/components/ui/progress";

interface CourseSidebarProps {
  currentSubmoduleId?: string;
}

export const CourseSidebar = ({ currentSubmoduleId }: CourseSidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { progress } = useProgress();
  
  // Find which module the current submodule belongs to
  const currentModule = modules.find(m => 
    m.submodules.includes(currentSubmoduleId || "")
  );
  
  // Track expanded modules
  const [expandedModules, setExpandedModules] = useState<number[]>(
    currentModule ? [currentModule.module] : [1]
  );

  const toggleModule = (moduleNum: number) => {
    setExpandedModules(prev => 
      prev.includes(moduleNum) 
        ? prev.filter(m => m !== moduleNum)
        : [...prev, moduleNum]
    );
  };

  // Calculate progress
  const totalLessons = submodules.length;
  const completedLessons = progress.completedSubmodules.length;
  const progressPercent = Math.round((completedLessons / totalLessons) * 100);

  // Get submodule details
  const getSubmoduleDetails = (submoduleId: string) => {
    return submodules.find(s => s.submodule === submoduleId);
  };

  const isSubmoduleCompleted = (submoduleId: string) => {
    return progress.completedSubmodules.includes(submoduleId);
  };

  const isCurrentSubmodule = (submoduleId: string) => {
    return currentSubmoduleId === submoduleId;
  };

  return (
    <aside className="w-80 border-r border-border bg-card flex-shrink-0 h-[calc(100vh-64px)] overflow-y-auto hidden lg:block sticky top-0">
      {/* Back to Course */}
      <div className="p-4 border-b border-border">
        <button 
          onClick={() => navigate("/curriculum")}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Course
        </button>
      </div>

      {/* Course Content Header */}
      <div className="p-4 border-b border-border">
        <h2 className="font-semibold text-foreground mb-3">Course Content</h2>
        
        {/* Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Your Progress</span>
            <span className="text-primary font-medium">{completedLessons}/{totalLessons} lessons</span>
          </div>
          <Progress value={progressPercent} className="h-2" />
          <p className="text-xs text-muted-foreground text-right">{progressPercent}% Complete</p>
        </div>
      </div>

      {/* Modules List */}
      <div className="py-2">
        {modules.map((module) => {
          const isExpanded = expandedModules.includes(module.module);
          const moduleSubmodules = module.submodules;
          const completedInModule = moduleSubmodules.filter(s => 
            progress.completedSubmodules.includes(s)
          ).length;
          const allCompleted = completedInModule === moduleSubmodules.length;

          return (
            <div key={module.module} className="border-b border-border/50 last:border-b-0">
              {/* Module Header */}
              <button
                onClick={() => toggleModule(module.module)}
                className="w-full px-4 py-3 flex items-start gap-3 hover:bg-muted/50 transition-colors"
              >
                {/* Module Number Badge */}
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0",
                  allCompleted 
                    ? "bg-success text-success-foreground" 
                    : "bg-primary/10 text-primary"
                )}>
                  {allCompleted ? <CheckCircle2 className="w-4 h-4" /> : module.module}
                </div>
                
                <div className="flex-1 text-left">
                  <h3 className="font-medium text-sm text-foreground">{module.title}</h3>
                  <p className="text-xs text-muted-foreground">{moduleSubmodules.length} lessons</p>
                </div>
                
                {isExpanded ? (
                  <ChevronUp className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-1" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-1" />
                )}
              </button>

              {/* Submodules List */}
              {isExpanded && (
                <div className="pb-2">
                  {moduleSubmodules.map((submoduleId) => {
                    const submodule = getSubmoduleDetails(submoduleId);
                    if (!submodule) return null;
                    
                    const isCompleted = isSubmoduleCompleted(submoduleId);
                    const isCurrent = isCurrentSubmodule(submoduleId);
                    const slug = getSlugFromSubmoduleId(submoduleId);

                    return (
                      <button
                        key={submoduleId}
                        onClick={() => navigate(`/curriculum/lesson/${slug}`)}
                        className={cn(
                          "w-full pl-12 pr-4 py-2.5 flex items-center gap-3 text-left transition-colors",
                          isCurrent 
                            ? "bg-primary/10 text-primary" 
                            : "hover:bg-muted/50 text-muted-foreground hover:text-foreground"
                        )}
                      >
                        <Play className={cn(
                          "w-4 h-4 flex-shrink-0",
                          isCurrent ? "text-primary" : "text-muted-foreground"
                        )} />
                        <div className="flex-1 min-w-0">
                          <p className={cn(
                            "text-sm truncate",
                            isCurrent && "font-medium text-primary"
                          )}>
                            {submodule.title}
                          </p>
                        </div>
                        {isCompleted && (
                          <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0" />
                        )}
                      </button>
                    );
                  })}

                  {/* Module Quiz/Assessment */}
                  {module.assessment && (
                    <div className="pl-12 pr-4 py-2.5 flex items-center gap-3 text-muted-foreground">
                      <FileText className="w-4 h-4 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm truncate">{module.assessment.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {module.assessment.type === 'quiz' ? `${module.assessment.passingScore}% to pass` : 'Project'}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
};
