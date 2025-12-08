import { Navbar } from "@/components/Navbar";
import { Breadcrumb } from "@/components/Breadcrumb";
import { ProgressDashboard } from "@/components/ProgressDashboard";
import { useProgress } from "@/contexts/ProgressContext";
import { Link, Navigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { weeks } from "@/data/curriculum";
import { CheckCircle2, Play, ArrowRight, Target, Award } from "lucide-react";

const Dashboard = () => {
  const { user, progress } = useProgress();

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  const getNextDay = () => {
    for (let i = 1; i <= 60; i++) {
      if (!progress.completedDays.includes(i)) return i;
    }
    return 60;
  };

  const recentActivity = progress.completedDays.slice(-5).reverse();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Breadcrumb />
        
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold mb-2">
            Welcome back, {user.name}!
          </h1>
          <p className="text-muted-foreground">
            Keep up the great work. Your consistency is building real skills.
          </p>
        </div>

        {/* Progress Dashboard */}
        <ProgressDashboard />

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {/* Continue Learning */}
          <Card className="bg-gradient-primary text-primary-foreground shadow-glow">
            <CardContent className="p-6">
              <h3 className="font-display font-bold text-lg mb-2">Continue Learning</h3>
              <p className="text-primary-foreground/80 mb-4">
                Pick up where you left off
              </p>
              <Link to={`/curriculum/day/${getNextDay()}`}>
                <Button variant="heroOutline" className="w-full gap-2">
                  <Play className="w-4 h-4" />
                  Day {getNextDay()}
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Weekly Assessment */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-5 h-5 text-primary" />
                <h3 className="font-display font-bold text-lg">Weekly Assessment</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Test your knowledge from this week
              </p>
              <Button variant="outline" className="w-full gap-2">
                Take Assessment
                <ArrowRight className="w-4 h-4" />
              </Button>
            </CardContent>
          </Card>

          {/* Certificate Progress */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <Award className="w-5 h-5 text-secondary" />
                <h3 className="font-display font-bold text-lg">Certification</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Track your path to certification
              </p>
              <Link to="/certificate">
                <Button variant="secondary" className="w-full gap-2">
                  View Progress
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            {recentActivity.length > 0 ? (
              <div className="space-y-3">
                {recentActivity.map((day) => {
                  const week = weeks.find((w) => w.days.includes(day));
                  return (
                    <Link
                      key={day}
                      to={`/curriculum/day/${day}`}
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-success" />
                        <div>
                          <p className="font-medium">Day {day}</p>
                          <p className="text-sm text-muted-foreground">
                            Week {week?.week}: {week?.title}
                          </p>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-success border-success">
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
      </main>
    </div>
  );
};

export default Dashboard;
