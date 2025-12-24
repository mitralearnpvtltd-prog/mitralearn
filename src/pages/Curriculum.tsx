import { Navbar } from "@/components/Navbar";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CurriculumOverview } from "@/components/CurriculumOverview";
import { useProgress } from "@/contexts/ProgressContext";
import { Navigate } from "react-router-dom";

const Curriculum = () => {
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

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Breadcrumb />
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold mb-2">
            Modules
          </h1>
          <p className="text-muted-foreground">
            Your complete roadmap to becoming a data engineer. Complete each module to unlock the next.
          </p>
        </div>
        <CurriculumOverview />
      </main>
    </div>
  );
};

export default Curriculum;
