import { useParams, Navigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { DayLesson } from "@/components/DayLesson";
import { CourseSidebar } from "@/components/CourseSidebar";
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
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      {/* Auth Required Message for Signed Out Users */}
      <SignedOut>
        <main className="flex-1 flex items-center justify-center px-4">
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
        </main>
      </SignedOut>

      {/* Lesson Content for Signed In Users */}
      <SignedIn>
        <div className="flex flex-1 overflow-hidden">
          {/* Left Sidebar - Fixed */}
          <CourseSidebar currentSubmoduleId={submoduleId} />
          
          {/* Main Content - Scrollable */}
          <main className="flex-1 overflow-y-auto h-[calc(100vh-64px)]">
            <DayLesson content={content} />
          </main>
        </div>
      </SignedIn>
    </div>
  );
};

export default Day;
