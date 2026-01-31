import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/clerk-react";
import mitraLearnLogo from "@/assets/mitra-learn-logo.png";

const LandingNavbar = () => {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50"
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <motion.img 
            src={mitraLearnLogo} 
            alt="Mitra Learn" 
            className="h-8 w-auto"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          />
        </Link>

        <div className="flex items-center gap-3 sm:gap-4">
          <SignedOut>
            <SignInButton mode="modal">
              <Button 
                variant="ghost"
                size="sm"
                className="hidden sm:flex items-center gap-2"
              >
                <Users className="w-4 h-4" />
                Login
              </Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button 
                variant="default"
                size="sm"
                className="px-4 sm:px-6"
              >
                Register
              </Button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <Link to="/dashboard">
              <Button 
                variant="ghost"
                size="sm"
              >
                Dashboard
              </Button>
            </Link>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </div>
    </motion.nav>
  );
};

export default LandingNavbar;
