import { useParams, Navigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Breadcrumb } from "@/components/Breadcrumb";
import { DayLesson } from "@/components/DayLesson";
import { getSubmoduleContent, getAllSubmodulesOrdered } from "@/data/curriculum";
import { useProgress } from "@/contexts/ProgressContext";

const Day = () => {
  const { submoduleId } = useParams<{ submoduleId: string }>();
  const { session, isLoading } = useProgress();

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

  const allSubmodules = getAllSubmodulesOrdered();
  
  if (!submoduleId || !allSubmodules.includes(submoduleId)) {
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
        <DayLesson content={content} />
      </main>
    </div>
  );
};

export default Day;
