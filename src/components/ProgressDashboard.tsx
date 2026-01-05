import { Progress } from "@/components/ui/progress";
import { useProgress } from "@/contexts/ProgressContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getTotalSubmodules, getTotalModules } from "@/data/curriculum";
import {
  Flame,
  Trophy,
  BookOpen,
  Code,
  Target,
  Calendar,
} from "lucide-react";

export const ProgressDashboard = () => {
  const { progress, getOverallProgress } = useProgress();

  const totalSubmodules = getTotalSubmodules();
  const totalModules = getTotalModules();

  const stats = [
    {
      label: "Submodules Completed",
      value: progress.completedSubmodules.length,
      total: totalSubmodules,
      icon: Calendar,
      color: "text-primary",
    },
    {
      label: "Quizzes Passed",
      value: Object.keys(progress.completedQuizzes).length,
      total: totalSubmodules,
      icon: BookOpen,
      color: "text-secondary",
    },
    {
      label: "Practice Challenges",
      value: progress.codingChallengesCompleted.length,
      total: totalSubmodules,
      icon: Code,
      color: "text-success",
    },
    {
      label: "Module Assessments",
      value: progress.completedModuleAssessments.length,
      total: totalModules,
      icon: Target,
      color: "text-accent-foreground",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Overall Progress */}
      <Card className="bg-gradient-hero text-primary-foreground overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <CardContent className="relative p-4 sm:p-6">
          <div className="flex flex-col gap-4">
            <div>
              <h2 className="text-lg sm:text-2xl font-display font-bold mb-1 sm:mb-2">
                Your Learning Journey
              </h2>
              <p className="text-primary-foreground/80 text-sm sm:text-base">
                {getOverallProgress()}% complete • {totalSubmodules - progress.completedSubmodules.length} submodules remaining
              </p>
            </div>
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="flex items-center gap-2 bg-primary-foreground/20 rounded-lg px-3 sm:px-4 py-2">
                <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-secondary" />
                <div>
                  <p className="text-xs text-primary-foreground/70">Streak</p>
                  <p className="font-bold text-sm sm:text-base">{progress.currentStreak} days</p>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-primary-foreground/20 rounded-lg px-3 sm:px-4 py-2">
                <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-secondary" />
                <div>
                  <p className="text-xs text-primary-foreground/70">Best</p>
                  <p className="font-bold text-sm sm:text-base">{progress.longestStreak} days</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <Progress value={getOverallProgress()} className="h-3 bg-primary-foreground/20" />
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="bg-card hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2 p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
                <span className="text-xs text-muted-foreground">
                  {stat.value}/{stat.total}
                </span>
              </div>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <p className="text-2xl font-display font-bold">{stat.value}</p>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">{stat.label}</p>
              <Progress
                value={(stat.value / stat.total) * 100}
                className="h-1.5 mt-3"
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
