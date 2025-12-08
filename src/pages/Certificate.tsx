import { Navbar } from "@/components/Navbar";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CertificateSystem } from "@/components/CertificateSystem";

const Certificate = () => {
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
