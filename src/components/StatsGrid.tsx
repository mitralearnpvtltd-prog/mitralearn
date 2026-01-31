import { useProgress } from "@/contexts/ProgressContext";
import { Card, CardContent } from "@/components/ui/card";
import { getTotalSubmodules, getTotalPracticeChallenges, getTotalProjects, SUBMODULES_WITH_PRACTICE } from "@/data/curriculum";
import {
  BookOpen,
  Code,
  Target,
  Calendar,
} from "lucide-react";
import { motion } from "framer-motion";

export const StatsGrid = () => {
  const { progress } = useProgress();

  const totalSubmodules = getTotalSubmodules();
  const totalPracticeChallenges = getTotalPracticeChallenges();
  const totalProjects = getTotalProjects();

  // Count only practice challenges that are in the valid list
  const completedPracticeChallenges = progress.codingChallengesCompleted.filter(
    id => SUBMODULES_WITH_PRACTICE.includes(id)
  ).length;

  // Projects completed = module assessments for module 9 (capstone)
  const projectsCompleted = progress.completedModuleAssessments.includes(9) ? 1 : 0;

  const stats = [
    {
      label: "Lessons Completed",
      value: progress.completedSubmodules.length,
      total: totalSubmodules,
      icon: Calendar,
      color: "text-primary",
      bgColor: "bg-primary/10",
      progressColor: "bg-primary",
    },
    {
      label: "Quizzes Passed",
      value: Object.keys(progress.completedQuizzes).length,
      total: totalSubmodules,
      icon: BookOpen,
      color: "text-secondary",
      bgColor: "bg-secondary/10",
      progressColor: "bg-secondary",
    },
    {
      label: "Practice Challenges",
      value: completedPracticeChallenges,
      total: totalPracticeChallenges,
      icon: Code,
      color: "text-success",
      bgColor: "bg-success/10",
      progressColor: "bg-success",
    },
    {
      label: "Projects Completed",
      value: projectsCompleted,
      total: totalProjects,
      icon: Target,
      color: "text-primary",
      bgColor: "bg-primary/10",
      progressColor: "bg-primary",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 + 0.5 }}
          whileHover={{ y: -4, scale: 1.02 }}
        >
          <Card className="bg-card hover:shadow-lg transition-all duration-300 h-full border border-border/50 hover:border-primary/20 group">
            <CardContent className="p-4 sm:p-5">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl ${stat.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <span className="text-xs font-medium text-muted-foreground bg-muted/50 px-2 py-1 rounded-full">
                  {stat.value}/{stat.total}
                </span>
              </div>
              
              <div className="space-y-2">
                <p className="text-2xl sm:text-3xl font-display font-bold">{stat.value}</p>
                <p className="text-xs sm:text-sm text-muted-foreground leading-tight">{stat.label}</p>
              </div>
              
              {/* Progress bar with animation */}
              <div className="mt-4 relative h-2 w-full overflow-hidden rounded-full bg-muted/50">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(stat.value / stat.total) * 100}%` }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 + index * 0.1 }}
                  className={`h-full rounded-full ${stat.progressColor}`}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};
