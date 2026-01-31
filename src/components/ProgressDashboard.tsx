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
      value: progress.codingChallengesCompleted.length,
      total: totalSubmodules,
      icon: Code,
      color: "text-success",
      bgColor: "bg-success/10",
      progressColor: "bg-success",
    },
    {
      label: "Projects Completed",
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
      <Card className={`overflow-hidden relative border-0 ${isComplete ? 'shadow-glow' : 'shadow-xl'}`}>
        {/* Rich gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-primary/80" />
        
        {/* Decorative circles */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-secondary/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-primary-foreground/10 rounded-full blur-3xl" />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNCI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySC0yNHYtMmgxMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-60" />
        
        {/* Glow effect on completion */}
        {isComplete && (
          <div className="absolute inset-0 bg-gradient-to-r from-success/30 via-secondary/30 to-success/30 animate-pulse" />
        )}
        
        <CardContent className="relative p-6 sm:p-8">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    {isComplete ? (
                      <Sparkles className="w-5 h-5 text-secondary" />
                    ) : (
                      <Trophy className="w-5 h-5 text-secondary" />
                    )}
                  </div>
                  <h2 className="text-xl sm:text-2xl font-display font-bold text-primary-foreground">
                    Your Learning Journey
                  </h2>
                </div>
                <p className="text-primary-foreground/80 text-sm sm:text-base ml-0 sm:ml-13">
                  <span className="font-semibold text-secondary">{overallProgress}%</span> complete • {totalSubmodules - progress.completedSubmodules.length} lessons remaining
                </p>
              </div>
              
              {/* Streak cards - floating style */}
              <div className="flex items-center gap-3">
                <motion.div 
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="flex items-center gap-3 bg-white/15 backdrop-blur-md rounded-2xl px-4 py-3 border border-white/20 shadow-lg"
                >
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-secondary to-secondary/80 flex items-center justify-center shadow-lg shadow-secondary/30">
                    <Flame className="w-5 h-5 text-secondary-foreground" />
                  </div>
                  <div>
                    <p className="text-xs text-primary-foreground/60 font-medium">Current Streak</p>
                    <p className="font-bold text-lg text-primary-foreground">{progress.currentStreak} <span className="text-xs font-normal text-primary-foreground/60">days</span></p>
                  </div>
                </motion.div>
                
                <motion.div 
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="flex items-center gap-3 bg-white/15 backdrop-blur-md rounded-2xl px-4 py-3 border border-white/20 shadow-lg"
                >
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-secondary to-secondary/80 flex items-center justify-center shadow-lg shadow-secondary/30">
                    <Trophy className="w-5 h-5 text-secondary-foreground" />
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
