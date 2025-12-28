import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useProgress } from "@/contexts/ProgressContext";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import {
  BookOpen,
  Award,
  BarChart3,
  Menu,
  X,
  Shield,
} from "lucide-react";
import { useState } from "react";
import innovskillsLogo from "@/assets/innovskills-logo.png";

export const Navbar = () => {
  const location = useLocation();
  const { getOverallProgress } = useProgress();
  const { user } = useUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Courses", href: "/curriculum", icon: BookOpen },
    { label: "Dashboard", href: "/dashboard", icon: BarChart3 },
    { label: "Certificate", href: "/certificate", icon: Award },
  ];

  const isActive = (href: string) => location.pathname.startsWith(href);

  return (
    <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src={innovskillsLogo} 
              alt="InnovSkills" 
              className="h-8 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            <Link to="/curriculum">
              <Button
                variant={isActive("/curriculum") ? "default" : "ghost"}
                size="sm"
                className="gap-2"
              >
                <BookOpen className="w-4 h-4" />
                Courses
              </Button>
            </Link>
            <SignedIn>
              {navItems.filter(item => item.href !== "/curriculum").map((item) => (
                <Link key={item.href} to={item.href}>
                  <Button
                    variant={isActive(item.href) ? "default" : "ghost"}
                    size="sm"
                    className="gap-2"
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </Button>
                </Link>
              ))}
            </SignedIn>
            <Link to="/verify-certificate">
              <Button variant="ghost" size="sm" className="gap-2">
                <Shield className="w-4 h-4" />
                Verify
              </Button>
            </Link>
          </div>

          {/* User Section */}
          <div className="hidden md:flex items-center gap-4">
            <SignedIn>
              <div className="flex items-center gap-3">
                <div className="text-sm text-right">
                  <p className="font-medium text-foreground">{user?.firstName || 'User'}</p>
                  <p className="text-xs text-muted-foreground">{getOverallProgress()}% Complete</p>
                </div>
                <UserButton afterSignOutUrl="/" />
              </div>
            </SignedIn>
            <SignedOut>
              <div className="flex items-center gap-3">
                <SignInButton mode="modal">
                  <Button variant="ghost" size="sm" className="font-medium">
                    Login
                  </Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button variant="default" size="sm" className="font-semibold shadow-md hover:shadow-lg transition-shadow">
                    Register Now
                  </Button>
                </SignUpButton>
              </div>
            </SignedOut>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-slide-up">
            <div className="flex flex-col gap-2">
              <Link
                to="/curriculum"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Button
                  variant={isActive("/curriculum") ? "default" : "ghost"}
                  className="w-full justify-start gap-2"
                >
                  <BookOpen className="w-4 h-4" />
                  Courses
                </Button>
              </Link>
              <SignedIn>
                {navItems.filter(item => item.href !== "/curriculum").map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Button
                      variant={isActive(item.href) ? "default" : "ghost"}
                      className="w-full justify-start gap-2"
                    >
                      <item.icon className="w-4 h-4" />
                      {item.label}
                    </Button>
                  </Link>
                ))}
              </SignedIn>
              <Link to="/verify-certificate" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <Shield className="w-4 h-4" />
                  Verify Certificate
                </Button>
              </Link>
              <SignedIn>
                <div className="pt-2 border-t border-border flex items-center gap-3 px-2">
                  <UserButton afterSignOutUrl="/" />
                  <span className="text-sm text-foreground">{user?.firstName}</span>
                </div>
              </SignedIn>
              <SignedOut>
                <div className="flex flex-col gap-2 pt-2 border-t border-border">
                  <SignInButton mode="modal">
                    <Button variant="ghost" className="w-full font-medium">
                      Login
                    </Button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <Button variant="default" className="w-full font-semibold">
                      Register Now
                    </Button>
                  </SignUpButton>
                </div>
              </SignedOut>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};