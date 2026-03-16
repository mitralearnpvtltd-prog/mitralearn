import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useState } from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/clerk-react";
import mitraLearnLogo from "@/assets/mitra-learn-logo.png";

const LandingNavbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-32px)] max-w-[1100px]">
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex items-center justify-between px-4 sm:px-6 py-3 bg-card/95 backdrop-blur-xl rounded-full border border-border shadow-lg"
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={mitraLearnLogo} alt="Mitra Learn" className="h-8 w-auto" />
        </Link>

        {/* Desktop Nav Links */}
        <ul className="hidden lg:flex items-center gap-8">
          {[
            { label: "Home", href: "#" },
            { label: "About", href: "#about" },
            { label: "Courses", href: "#courses" },
            { label: "Blog", href: "#blog" },
          ].map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className="text-sm font-semibold text-foreground hover:text-primary transition-colors duration-200"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA Buttons */}
        <div className="flex items-center gap-2">
          <SignedOut>
            <SignUpButton mode="modal">
              <Button className="hidden sm:inline-flex bg-foreground text-background hover:bg-foreground/90 font-bold text-sm rounded-full px-5 py-2.5 h-auto gap-2">
                Get Started Now
                <span className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                  <ArrowUpRight className="h-3.5 w-3.5 text-primary-foreground" />
                </span>
              </Button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <Link to="/dashboard">
              <Button className="hidden sm:inline-flex bg-foreground text-background hover:bg-foreground/90 font-bold text-sm rounded-full px-5 py-2.5 h-auto gap-2">
                Dashboard
                <span className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                  <ArrowUpRight className="h-3.5 w-3.5 text-primary-foreground" />
                </span>
              </Button>
            </Link>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden w-10 h-10 rounded-full bg-muted flex items-center justify-center"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 bg-card/95 backdrop-blur-xl rounded-2xl border border-border shadow-lg p-4 lg:hidden"
        >
          <ul className="flex flex-col gap-3">
            {["Home", "About", "Courses", "Blog"].map((item) => (
              <li key={item}>
                <a
                  href="#"
                  onClick={() => setMobileOpen(false)}
                  className="block py-2 px-4 text-sm font-semibold text-foreground hover:text-primary rounded-lg hover:bg-muted transition-all"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
          <SignedOut>
            <div className="mt-3 flex gap-2">
              <SignInButton mode="modal">
                <Button variant="outline" size="sm" className="flex-1 rounded-full font-bold text-sm">
                  Log In
                </Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button size="sm" className="flex-1 bg-foreground text-background hover:bg-foreground/90 rounded-full font-bold text-sm">
                  Get Started
                </Button>
              </SignUpButton>
            </div>
          </SignedOut>
        </motion.div>
      )}
    </div>
  );
};

export default LandingNavbar;
