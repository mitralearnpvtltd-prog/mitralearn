import { Navbar } from "@/components/Navbar";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CertificateSystem } from "@/components/CertificateSystem";
import { useProgress } from "@/contexts/ProgressContext";
import { Navigate } from "react-router-dom";

const Certificate = () => {
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
        <CertificateSystem />
      </main>
    </div>
  );
};

export default Certificate;