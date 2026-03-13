import { useParams, Navigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { DayLesson } from "@/components/DayLesson";
import { CourseSidebar } from "@/components/CourseSidebar";
import { Button } from "@/components/ui/button";
import { getSubmoduleContent, getSubmoduleIdFromSlug } from "@/data/curriculum";
import { useProgress } from "@/contexts/ProgressContext";
import { BookOpen } from "lucide-react";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/clerk-react";

const Day = () => {
  const { slug } = useParams<{ slug: string }>();
  const { isLoading } = useProgress();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <LoadingSpinner size="lg" />
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
        <main className="flex-1 flex items-center justify-center px-3 sm:px-4">
          <div className="flex flex-col items-center justify-center py-10 sm:py-16 text-center px-2">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-primary flex items-center justify-center mb-4 sm:mb-6 shadow-glow">
              <BookOpen className="w-8 h-8 sm:w-10 sm:h-10 text-primary-foreground" />
            </div>
            <h1 className="text-xl sm:text-3xl font-display font-bold mb-3 sm:mb-4 px-2">
              {content.title}
            </h1>
            <p className="text-muted-foreground mb-6 sm:mb-8 max-w-md text-sm sm:text-base">
              Sign in to access this lesson, track your progress, and complete quizzes.
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
        </main>
      </SignedOut>

      {/* Lesson Content for Signed In Users */}
      <SignedIn>
        <div className="flex flex-1 overflow-hidden">
          {/* Left Sidebar - Hidden on mobile */}
          <CourseSidebar currentSubmoduleId={submoduleId} />
          
          {/* Main Content - Scrollable, full width on mobile */}
          <main className="flex-1 overflow-y-auto h-[calc(100vh-80px)] w-full">
            <DayLesson content={content} />
          </main>
        </div>
      </SignedIn>
    </div>
  );
};

export default Day;
