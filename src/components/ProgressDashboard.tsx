import { Progress } from "@/components/ui/progress";
import { useProgress } from "@/contexts/ProgressContext";
import { Card, CardContent } from "@/components/ui/card";
import { getTotalSubmodules, getTotalModules } from "@/data/curriculum";
import {
  Flame,
  Trophy,
  BookOpen,
  Code,
  Target,
  Calendar,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";

export const ProgressDashboard = () => {
  const { progress, getOverallProgress } = useProgress();

  const totalSubmodules = getTotalSubmodules();
  const totalModules = getTotalModules();
  const overallProgress = getOverallProgress();
  const isComplete = overallProgress === 100;

  const stats = [
    {
      label: "Submodules Completed",
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
      value: progress.codingChallengesCompleted.length,
      total: totalSubmodules,
      icon: Code,
      color: "text-success",
      bgColor: "bg-success/10",
      progressColor: "bg-success",
    },
    {
      label: "Module Assessments",
      value: progress.completedModuleAssessments.length,
      total: totalModules,
      icon: Target,
      color: "text-primary",
      bgColor: "bg-primary/10",
      progressColor: "bg-primary",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Overall Progress - Your Learning Journey */}
      <Card className={`overflow-hidden relative ${isComplete ? 'shadow-glow' : 'shadow-lg'}`}>
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-50" />
        
        {/* Glassmorphism overlay */}
        <div className="absolute inset-0 backdrop-blur-[1px] bg-gradient-to-br from-white/5 to-transparent" />
        
        {/* Glow effect on completion */}
        {isComplete && (
          <div className="absolute inset-0 bg-gradient-to-r from-success/20 via-primary/20 to-secondary/20 animate-pulse" />
        )}
        
        <CardContent className="relative p-5 sm:p-8">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  {isComplete && <Sparkles className="w-5 h-5 text-secondary animate-pulse" />}
                  <h2 className="text-lg sm:text-2xl font-display font-bold text-primary-foreground">
                    Your Learning Journey
                  </h2>
                </div>
                <p className="text-primary-foreground/70 text-sm sm:text-base">
                  {overallProgress}% complete • {totalSubmodules - progress.completedSubmodules.length} submodules remaining
                </p>
              </div>
              
              {/* Streak cards - floating style */}
              <div className="flex items-center gap-3">
                <motion.div 
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-xl px-4 py-3 border border-white/10 shadow-lg"
                >
                  <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center">
                    <Flame className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <p className="text-xs text-primary-foreground/60 font-medium">Current Streak</p>
                    <p className="font-bold text-lg text-primary-foreground">{progress.currentStreak} <span className="text-xs font-normal text-primary-foreground/60">days</span></p>
                  </div>
                </motion.div>
                
                <motion.div 
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-xl px-4 py-3 border border-white/10 shadow-lg"
                >
                  <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center">
                    <Trophy className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <p className="text-xs text-primary-foreground/60 font-medium">Best Streak</p>
                    <p className="font-bold text-lg text-primary-foreground">{progress.longestStreak} <span className="text-xs font-normal text-primary-foreground/60">days</span></p>
                  </div>
                </motion.div>
              </div>
            </div>
            
            {/* Animated progress bar */}
            <div className="space-y-2">
              <div className="relative h-4 w-full overflow-hidden rounded-full bg-white/10 backdrop-blur-sm">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${overallProgress}%` }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
                  className={`h-full rounded-full ${isComplete ? 'bg-gradient-to-r from-success via-primary to-secondary' : 'bg-gradient-to-r from-primary to-secondary'}`}
                  style={{ boxShadow: '0 0 20px rgba(var(--primary), 0.5)' }}
                />
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" 
                  style={{ animation: 'shimmer 2s infinite' }} />
              </div>
              <div className="flex justify-between text-xs text-primary-foreground/60">
                <span>0%</span>
                <span>50%</span>
                <span>100%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid - Enhanced */}
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
    </div>
  );
};
