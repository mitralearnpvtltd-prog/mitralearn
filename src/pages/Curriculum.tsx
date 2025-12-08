import { Navbar } from "@/components/Navbar";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CurriculumOverview } from "@/components/CurriculumOverview";

const Curriculum = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Breadcrumb />
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold mb-2">
            60-Day Curriculum
          </h1>
          <p className="text-muted-foreground">
            Your complete roadmap to becoming a data scientist. Complete each week to unlock the next.
          </p>
        </div>
        <CurriculumOverview />
      </main>
    </div>
  );
};

export default Curriculum;
