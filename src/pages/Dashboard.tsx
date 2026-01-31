import { Navbar } from "@/components/Navbar";
import { Breadcrumb } from "@/components/Breadcrumb";
import { ProgressDashboard } from "@/components/ProgressDashboard";
import { StatsGrid } from "@/components/StatsGrid";
import { useProgress } from "@/contexts/ProgressContext";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getFirstUncompletedSubmodule, getSubmoduleContent, getModuleForSubmodule, getSlugFromSubmoduleId } from "@/data/curriculum";
import { CheckCircle2, Play, ArrowRight, Target, Award, Sparkles } from "lucide-react";
import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/clerk-react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const }
  }
};

const Dashboard = () => {
  const { user, progress, isLoading } = useProgress();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const nextSubmoduleId = getFirstUncompletedSubmodule(progress.completedSubmodules);
  const nextSubmoduleContent = getSubmoduleContent(nextSubmoduleId);
  const nextSubmoduleSlug = getSlugFromSubmoduleId(nextSubmoduleId);
  const recentActivity = progress.completedSubmodules.slice(-5).reverse();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      {/* Subtle pattern overlay */}
      <div className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM5QzkyQUMiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMS41Ii8+PC9nPjwvZz48L3N2Zz4=')] pointer-events-none" />
      
      <Navbar />
      <main className="container mx-auto px-3 sm:px-4 py-6 sm:py-10 relative z-10">
        <Breadcrumb />
        
        {/* Auth Required Message for Signed Out Users */}
        <SignedOut>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center py-10 sm:py-16 text-center px-2"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-primary flex items-center justify-center mb-4 sm:mb-6 shadow-glow animate-pulse-glow">
              <Award className="w-8 h-8 sm:w-10 sm:h-10 text-primary-foreground" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold mb-3 sm:mb-4">
              Track Your Learning Progress
            </h1>
            <p className="text-muted-foreground mb-6 sm:mb-8 max-w-md text-sm sm:text-base">
              Sign in to access your personalized dashboard, track your progress, and continue your learning journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
              <SignInButton mode="modal">
                <Button variant="outline" size="lg" className="w-full sm:w-auto min-h-[48px]">
                  Login
                </Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button size="lg" className="w-full sm:w-auto min-h-[48px]">
                  Register Now
                </Button>
              </SignUpButton>
            </div>
          </motion.div>
        </SignedOut>

        {/* Dashboard Content for Signed In Users */}
        <SignedIn>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6 sm:space-y-8"
          >
            {/* Welcome Header */}
            <motion.div variants={itemVariants} className="mb-2">
              <h1 className="text-xl sm:text-3xl font-display font-bold mb-1 sm:mb-2">
                Welcome back{user?.name ? `, ${user.name}` : ''}! <span className="inline-block animate-float">👋</span>
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base">
                Keep up the great work. Your consistency is building real skills.
              </p>
            </motion.div>

            {/* Progress Dashboard - Your Learning Journey */}
            <motion.div variants={itemVariants}>
              <ProgressDashboard />
            </motion.div>

            {/* Quick Actions - ABOVE STATS */}
            <motion.div variants={itemVariants}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5 lg:gap-6">
                {/* Continue Learning - Primary Gradient */}
                <motion.div
                  whileHover={{ y: -4, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Card className="bg-gradient-primary text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 overflow-hidden relative group h-full">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute -top-12 -right-12 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
                    <CardContent className="p-5 sm:p-6 relative z-10 flex flex-col h-full">
                      <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                        <Play className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <h3 className="font-display font-bold text-lg sm:text-xl mb-2">Continue Learning</h3>
                      <p className="text-primary-foreground/80 mb-4 text-sm flex-grow">
                        Pick up where you left off
                      </p>
                      <Link to={`/curriculum/lesson/${nextSubmoduleSlug}`} className="block">
                        <Button variant="heroOutline" className="w-full gap-2 text-sm sm:text-base group-hover:bg-white/20 transition-colors">
                          <Sparkles className="w-4 h-4" />
                          <span className="truncate">{nextSubmoduleContent?.title || "Get Started"}</span>
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Module Assessment - White with Purple outline */}
                <motion.div
                  whileHover={{ y: -4, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Card className="bg-card border-2 border-primary/20 hover:border-primary/50 hover:bg-primary/5 shadow-lg hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 overflow-hidden relative group h-full">
                    <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
                    <CardContent className="p-5 sm:p-6 relative z-10 flex flex-col h-full">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                        <Target className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                      </div>
                      <h3 className="font-display font-bold text-lg sm:text-xl mb-2">Module Assessment</h3>
                      <p className="text-muted-foreground mb-4 text-sm flex-grow">
                        Test your knowledge from this module
                      </p>
                      <Link to={`/curriculum/lesson/${nextSubmoduleSlug}?tab=quiz`} className="block">
                        <Button variant="outline" className="w-full gap-2 text-sm sm:text-base border-primary/30 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300">
                          Take Assessment
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Certificate Progress - Accent/Orange gradient */}
                <motion.div
                  whileHover={{ y: -4, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Card className="bg-gradient-secondary text-secondary-foreground shadow-lg shadow-secondary/20 hover:shadow-xl hover:shadow-secondary/30 transition-all duration-300 overflow-hidden relative group h-full">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute -top-12 -right-12 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
                    <CardContent className="p-5 sm:p-6 relative z-10 flex flex-col h-full">
                      <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                        <Award className="w-6 h-6 text-secondary-foreground" />
                      </div>
                      <h3 className="font-display font-bold text-lg sm:text-xl mb-2">Certification</h3>
                      <p className="text-secondary-foreground/80 mb-4 text-sm flex-grow">
                        Track your path to certification
                      </p>
                      <Link to="/certificate" className="block">
                        <Button variant="heroOutline" className="w-full gap-2 text-sm sm:text-base bg-white/10 border-white/30 hover:bg-white/20 transition-colors">
                          View Progress
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </motion.div>

            {/* Stats Grid - Below Action Cards */}
            <motion.div variants={itemVariants}>
              <StatsGrid />
            </motion.div>

            {/* Recent Activity */}
            <motion.div variants={itemVariants}>
              <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                <div className="p-5 sm:p-6 border-b border-border/50">
                  <h3 className="font-display font-bold text-lg sm:text-xl flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                    Recent Activity
                  </h3>
                </div>
                <CardContent className="p-5 sm:p-6 pt-4">
                  {recentActivity.length > 0 ? (
                    <div className="space-y-3">
                      {recentActivity.map((submoduleId, index) => {
                        const subContent = getSubmoduleContent(submoduleId);
                        const mod = getModuleForSubmodule(submoduleId);
                        const slug = getSlugFromSubmoduleId(submoduleId);
                        return (
                          <motion.div
                            key={submoduleId}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                          >
                            <Link
                              to={`/curriculum/lesson/${slug}`}
                              className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-muted/50 to-transparent hover:from-success/10 hover:to-success/5 border border-transparent hover:border-success/20 transition-all duration-300 gap-3 group"
                            >
                              <div className="flex items-center gap-3 min-w-0 flex-1">
                                <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0 group-hover:bg-success/20 group-hover:scale-110 transition-all duration-300">
                                  <CheckCircle2 className="w-5 h-5 text-success" />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <p className="font-medium text-sm sm:text-base truncate group-hover:text-success transition-colors">{subContent?.title || submoduleId}</p>
                                  <p className="text-xs sm:text-sm text-muted-foreground truncate">
                                    Module {mod?.module}: {mod?.title}
                                  </p>
                                </div>
                              </div>
                              <Badge className="bg-success/10 text-success border-success/30 text-xs flex-shrink-0 hidden sm:flex shadow-sm shadow-success/20">
                                <span className="w-1.5 h-1.5 rounded-full bg-success mr-1.5 animate-pulse" />
                                Completed
                              </Badge>
                            </Link>
                          </motion.div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-4">
                        <Play className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <p className="text-muted-foreground text-sm sm:text-base">
                        No completed lessons yet. Start your journey today!
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </SignedIn>
      </main>
    </div>
  );
};

export default Dashboard;
