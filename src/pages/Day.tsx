import { useParams, Navigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Breadcrumb } from "@/components/Breadcrumb";
import { DayLesson } from "@/components/DayLesson";
import { Button } from "@/components/ui/button";
import { getSubmoduleContent, getSubmoduleIdFromSlug } from "@/data/curriculum";
import { useProgress } from "@/contexts/ProgressContext";
import { BookOpen } from "lucide-react";
import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/clerk-react";

const Day = () => {
  const { slug } = useParams<{ slug: string }>();
  const { isLoading } = useProgress();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const submoduleId = slug ? getSubmoduleIdFromSlug(slug) : undefined;
  
  if (!submoduleId) {
    return <Navigate to="/curriculum" replace />;
  }

  const content = getSubmoduleContent(submoduleId);
  
  if (!content) {
    return <Navigate to="/curriculum" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Breadcrumb />
        
        {/* Auth Required Message for Signed Out Users */}
        <SignedOut>
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-20 h-20 rounded-2xl bg-gradient-primary flex items-center justify-center mb-6 shadow-glow">
              <BookOpen className="w-10 h-10 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-display font-bold mb-4">
              {content.title}
            </h1>
            <p className="text-muted-foreground mb-8 max-w-md">
              Sign in to access this lesson, track your progress, and complete quizzes.
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

        {/* Lesson Content for Signed In Users */}
        <SignedIn>
          <DayLesson content={content} />
        </SignedIn>
      </main>
    </div>
  );
};

export default Day;
