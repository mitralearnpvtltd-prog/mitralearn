import { Link } from "react-router-dom";
import { modules, getFirstUncompletedSubmodule, getSubmoduleContent, getSlugFromSubmoduleId } from "@/data/curriculum";
import { useProgress } from "@/contexts/ProgressContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Lock, Play, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";

export const CurriculumOverview = () => {
  const { progress } = useProgress();

  const getModuleProgress = (moduleSubmodules: string[]) => {
    const completedInModule = moduleSubmodules.filter(submoduleId =>
      progress.completedSubmodules.includes(submoduleId)
    ).length;
    return Math.round((completedInModule / moduleSubmodules.length) * 100);
  };

  const isModuleLocked = (moduleNum: number) => {
    if (moduleNum === 1) return false;
    const previousModule = modules.find(m => m.module === moduleNum - 1);
    if (!previousModule) return false;
    const prevModuleProgress = getModuleProgress(previousModule.submodules);
    return prevModuleProgress < 50;
  };

  const nextSubmoduleId = getFirstUncompletedSubmodule(progress.completedSubmodules);
  const nextSubmoduleContent = getSubmoduleContent(nextSubmoduleId);
  const nextTitle = nextSubmoduleContent?.title || "Get Started";
  const nextSlug = getSlugFromSubmoduleId(nextSubmoduleId);

  return (
    <div className="space-y-6">
      {/* Continue Learning Card */}
      <Card className="bg-gradient-primary text-primary-foreground shadow-glow">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-xl font-display font-bold mb-1">
                Continue Learning
              </h2>
              <p className="text-primary-foreground/80">
                Pick up where you left off
              </p>
            </div>
            <SignedIn>
              <Link to={`/curriculum/lesson/${nextSlug}`}>
                <Button variant="heroOutline" size="lg" className="gap-2">
                  <Play className="w-5 h-5" />
                  {nextTitle}
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <Button variant="heroOutline" size="lg" className="gap-2">
                  <Play className="w-5 h-5" />
                  Start Learning
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </SignInButton>
            </SignedOut>
          </div>
        </CardContent>
      </Card>

      {/* Modules Grid */}
      <div className="grid gap-6">
        {modules.map((mod) => {
          const moduleProgress = getModuleProgress(mod.submodules);
          const locked = isModuleLocked(mod.module);
          const isCompleted = moduleProgress === 100;

          return (
            <Card
              key={mod.module}
              className={`relative overflow-hidden transition-all duration-300 ${
                locked
                  ? "opacity-60 bg-muted"
                  : "hover:shadow-lg hover:-translate-y-0.5"
              }`}
            >
              {locked && (
                <div className="absolute inset-0 bg-background/50 backdrop-blur-sm z-10 flex items-center justify-center">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Lock className="w-5 h-5" />
                    <span>Complete Module {mod.module - 1} to unlock</span>
                  </div>
                </div>
              )}
              <CardHeader className="pb-3">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-display font-bold text-lg ${
                      isCompleted
                        ? "bg-success text-success-foreground"
                        : "bg-gradient-primary text-primary-foreground"
                    }`}>
                      {isCompleted ? (
                        <CheckCircle2 className="w-6 h-6" />
                      ) : (
                        mod.module
                      )}
                    </div>
                    <div>
                      <CardTitle className="text-lg">
                        Module {mod.module}: {mod.title}
                      </CardTitle>
                    </div>
                  </div>
                  <Badge variant={isCompleted ? "default" : "secondary"}>
                    {moduleProgress}% Complete
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <Progress value={moduleProgress} className="h-2 mb-4" />
                <div className="flex flex-wrap gap-2">
                {mod.submodules.map((submoduleId) => {
                    const isSubmoduleCompleted = progress.completedSubmodules.includes(submoduleId);
                    const subContent = getSubmoduleContent(submoduleId);
                    const lessonSlug = getSlugFromSubmoduleId(submoduleId);
                    const lessonTitle = subContent?.title || submoduleId;
                    
                    const SubmoduleButton = (
                      <div
                        className={`px-3 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-all cursor-pointer ${
                          isSubmoduleCompleted
                            ? "bg-success text-success-foreground"
                            : "bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground"
                        }`}
                        title={lessonTitle}
                      >
                        {isSubmoduleCompleted && (
                          <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                        )}
                        <span className="truncate">{lessonTitle}</span>
                      </div>
                    );

                    if (locked) {
                      return <div key={submoduleId} className="pointer-events-none">{SubmoduleButton}</div>;
                    }

                    return (
                      <div key={submoduleId}>
                        <SignedIn>
                          <Link to={`/curriculum/lesson/${lessonSlug}`}>
                            {SubmoduleButton}
                          </Link>
                        </SignedIn>
                        <SignedOut>
                          <SignInButton mode="modal">
                            {SubmoduleButton}
                          </SignInButton>
                        </SignedOut>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
