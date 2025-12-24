import { Navbar } from "@/components/Navbar";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CertificateSystem } from "@/components/CertificateSystem";
import { Button } from "@/components/ui/button";
import { Award } from "lucide-react";
import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/clerk-react";

const Certificate = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Breadcrumb />
        
        {/* Auth Required Message for Signed Out Users */}
        <SignedOut>
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-20 h-20 rounded-2xl bg-gradient-primary flex items-center justify-center mb-6 shadow-glow">
              <Award className="w-10 h-10 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-display font-bold mb-4">
              Earn Your Certificate
            </h1>
            <p className="text-muted-foreground mb-8 max-w-md">
              Sign in to view your certification progress and earn your verified certificate upon course completion.
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

        {/* Certificate Content for Signed In Users */}
        <SignedIn>
          <CertificateSystem />
        </SignedIn>
      </main>
    </div>
  );
};

export default Certificate;