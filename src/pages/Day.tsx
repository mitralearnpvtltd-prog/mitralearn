import { useParams, Navigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Breadcrumb } from "@/components/Breadcrumb";
import { DayLesson } from "@/components/DayLesson";
import { getDayContent } from "@/data/curriculum";
import { useProgress } from "@/contexts/ProgressContext";

const Day = () => {
  const { dayNumber } = useParams<{ dayNumber: string }>();
  const { session, isLoading } = useProgress();
  const day = parseInt(dayNumber || "1", 10);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/auth" replace />;
  }
  
  if (isNaN(day) || day < 1 || day > 60) {
    return <Navigate to="/curriculum" replace />;
  }

  const content = getDayContent(day);
  
  if (!content) {
    return <Navigate to="/curriculum" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Breadcrumb />
        <DayLesson content={content} />
      </main>
    </div>
  );
};

export default Day;