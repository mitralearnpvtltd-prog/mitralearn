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
      <main className="container mx-auto px-3 sm:px-4 py-4 sm:py-8">
        <Breadcrumb />
        
        {/* Auth Required Message for Signed Out Users */}
        <SignedOut>
          <div className="flex flex-col items-center justify-center py-10 sm:py-16 text-center px-2">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-primary flex items-center justify-center mb-4 sm:mb-6 shadow-glow">
              <Award className="w-8 h-8 sm:w-10 sm:h-10 text-primary-foreground" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold mb-3 sm:mb-4">
              Earn Your Certificate
            </h1>
            <p className="text-muted-foreground mb-6 sm:mb-8 max-w-md text-sm sm:text-base">
              Sign in to view your certification progress and earn your verified certificate upon course completion.
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