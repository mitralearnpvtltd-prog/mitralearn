import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
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
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-40px)] max-w-[1200px]">
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex items-center justify-between px-5 sm:px-7 py-3.5 bg-card/97 backdrop-blur-xl rounded-2xl border border-border shadow-lg hover:shadow-xl transition-shadow duration-300"
      >
        <Link to="/" className="flex items-center">
          <motion.img
            src={mitraLearnLogo}
            alt="Mitra Learn"
            className="h-8 w-auto"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          />
        </Link>

        <ul className="hidden lg:flex items-center gap-8">
          {["Home", "About", "Courses", "Contact"].map((item) => (
            <li key={item}>
              <a
                href="#"
                className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <SignedOut>
            <SignInButton mode="modal">
              <Button
                variant="outline"
                size="sm"
                className="hidden sm:inline-flex font-bold text-sm border-2 border-border hover:border-primary hover:text-primary"
              >
                Log In
              </Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button
                size="sm"
                className="font-bold text-sm bg-primary hover:bg-primary/90 shadow-glow"
              >
                Get Started →
              </Button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <Link to="/dashboard">
              <Button variant="ghost" size="sm" className="font-bold">
                Dashboard
              </Button>
            </Link>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </motion.nav>
    </div>
  );
};

export default LandingNavbar;
