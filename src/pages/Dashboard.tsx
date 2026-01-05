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
      <main className="container mx-auto px-4 py-8">
        <Breadcrumb />
        
        {/* Auth Required Message for Signed Out Users */}
        <SignedOut>
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-20 h-20 rounded-2xl bg-gradient-primary flex items-center justify-center mb-6 shadow-glow">
              <Award className="w-10 h-10 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-display font-bold mb-4">
              Track Your Learning Progress
            </h1>
            <p className="text-muted-foreground mb-8 max-w-md">
              Sign in to access your personalized dashboard, track your progress, and continue your learning journey.
            </p>
            <div className="flex gap-4">
              <SignInButton mode="modal">
                <Button variant="outline" size="lg">
                  Login
                </Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button size="lg">
                  Register Now
                </Button>
              </SignUpButton>
            </div>
          </div>
        </SignedOut>

        {/* Dashboard Content for Signed In Users */}
        <SignedIn>
          {/* Welcome Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-display font-bold mb-2">
              Welcome back{user?.name ? `, ${user.name}` : ''}!
            </h1>
            <p className="text-muted-foreground">
              Keep up the great work. Your consistency is building real skills.
            </p>
          </div>

          {/* Progress Dashboard */}
          <ProgressDashboard />

          {/* Quick Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-6 sm:mt-8">
            {/* Continue Learning */}
            <Card className="bg-gradient-primary text-primary-foreground shadow-glow">
              <CardContent className="p-4 sm:p-6">
                <h3 className="font-display font-bold text-base sm:text-lg mb-1 sm:mb-2">Continue Learning</h3>
                <p className="text-primary-foreground/80 mb-3 sm:mb-4 text-sm">
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
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center gap-2 mb-1 sm:mb-2">
                  <Target className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  <h3 className="font-display font-bold text-base sm:text-lg">Module Assessment</h3>
                </div>
                <p className="text-muted-foreground mb-3 sm:mb-4 text-sm">
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
            <Card>
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center gap-2 mb-1 sm:mb-2">
                  <Award className="w-4 h-4 sm:w-5 sm:h-5 text-secondary" />
                  <h3 className="font-display font-bold text-base sm:text-lg">Certification</h3>
                </div>
                <p className="text-muted-foreground mb-3 sm:mb-4 text-sm">
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
          <Card className="mt-6 sm:mt-8">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              {recentActivity.length > 0 ? (
                <div className="space-y-2 sm:space-y-3">
                  {recentActivity.map((submoduleId) => {
                    const subContent = getSubmoduleContent(submoduleId);
                    const mod = getModuleForSubmodule(submoduleId);
                    const slug = getSlugFromSubmoduleId(submoduleId);
                    return (
                      <Link
                        key={submoduleId}
                        to={`/curriculum/lesson/${slug}`}
                        className="flex items-center justify-between p-2 sm:p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors gap-2"
                      >
                        <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                          <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-success flex-shrink-0" />
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
                <p className="text-muted-foreground text-center py-8">
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
