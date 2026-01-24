import { Navbar } from "@/components/Navbar";
import { Breadcrumb } from "@/components/Breadcrumb";
import { ProgressDashboard } from "@/components/ProgressDashboard";
import { useProgress } from "@/contexts/ProgressContext";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { modules, getFirstUncompletedSubmodule, getSubmoduleContent, getModuleForSubmodule, getSlugFromSubmoduleId } from "@/data/curriculum";
import { CheckCircle2, Play, ArrowRight, Target, Award } from "lucide-react";
import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/clerk-react";

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
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-3 sm:px-4 py-4 sm:py-8">
        <Breadcrumb />
        
        {/* Auth Required Message for Signed Out Users */}
        <SignedOut>
          <div className="flex flex-col items-center justify-center py-10 sm:py-16 text-center px-2">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-primary flex items-center justify-center mb-4 sm:mb-6 shadow-glow">
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
          </div>
        </SignedOut>

        {/* Dashboard Content for Signed In Users */}
        <SignedIn>
          {/* Welcome Header */}
          <div className="mb-6 sm:mb-8">
            <h1 className="text-xl sm:text-3xl font-display font-bold mb-1 sm:mb-2">
              Welcome back{user?.name ? `, ${user.name}` : ''}!
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              Keep up the great work. Your consistency is building real skills.
            </p>
          </div>

          {/* Progress Dashboard */}
          <ProgressDashboard />

          {/* Quick Actions */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6 mt-6 sm:mt-8">
            {/* Continue Learning */}
            <Card className="bg-gradient-primary text-primary-foreground shadow-glow">
              <CardContent className="p-5 sm:p-6">
                <h3 className="font-display font-bold text-base sm:text-lg mb-2">Continue Learning</h3>
                <p className="text-primary-foreground/80 mb-4 text-sm">
                  Pick up where you left off
                </p>
                <Link to={`/curriculum/lesson/${nextSubmoduleSlug}`}>
                  <Button variant="heroOutline" className="w-full gap-2 text-sm sm:text-base">
                    <Play className="w-4 h-4" />
                    <span className="truncate">{nextSubmoduleContent?.title || "Get Started"}</span>
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Module Assessment */}
            <Card>
              <CardContent className="p-5 sm:p-6">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-5 h-5 text-primary" />
                  <h3 className="font-display font-bold text-base sm:text-lg">Module Assessment</h3>
                </div>
                <p className="text-muted-foreground mb-4 text-sm">
                  Test your knowledge from this module
                </p>
                <Link to={`/curriculum/lesson/${nextSubmoduleSlug}?tab=quiz`}>
                  <Button variant="outline" className="w-full gap-2 text-sm sm:text-base">
                    Take Assessment
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Certificate Progress */}
            <Card className="sm:col-span-2 lg:col-span-1">
              <CardContent className="p-5 sm:p-6">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="w-5 h-5 text-secondary" />
                  <h3 className="font-display font-bold text-base sm:text-lg">Certification</h3>
                </div>
                <p className="text-muted-foreground mb-4 text-sm">
                  Track your path to certification
                </p>
                <Link to="/certificate">
                  <Button variant="secondary" className="w-full gap-2 text-sm sm:text-base">
                    View Progress
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card className="mt-5 sm:mt-8">
            <CardHeader className="pb-2 sm:pb-4">
              <CardTitle className="text-base sm:text-lg">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              {recentActivity.length > 0 ? (
                <div className="space-y-3">
                  {recentActivity.map((submoduleId) => {
                    const subContent = getSubmoduleContent(submoduleId);
                    const mod = getModuleForSubmodule(submoduleId);
                    const slug = getSlugFromSubmoduleId(submoduleId);
                    return (
                      <Link
                        key={submoduleId}
                        to={`/curriculum/lesson/${slug}`}
                        className="flex items-center justify-between p-3 sm:p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors gap-3"
                      >
                        <div className="flex items-center gap-3 min-w-0 flex-1">
                          <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
                          <div className="min-w-0 flex-1">
                            <p className="font-medium text-sm sm:text-base truncate">{subContent?.title || submoduleId}</p>
                            <p className="text-xs sm:text-sm text-muted-foreground truncate">
                              Module {mod?.module}: {mod?.title}
                            </p>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-success border-success text-xs flex-shrink-0 hidden sm:flex">
                          Completed
                        </Badge>
                      </Link>
                    );
                  })}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-8 text-sm sm:text-base">
                  No completed lessons yet. Start your journey today!
                </p>
              )}
            </CardContent>
          </Card>
        </SignedIn>
      </main>
    </div>
  );
};

export default Dashboard;
