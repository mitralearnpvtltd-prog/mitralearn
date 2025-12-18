import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useProgress } from "@/contexts/ProgressContext";
import {
  BookOpen,
  Award,
  BarChart3,
  Menu,
  X,
  GraduationCap,
  LogOut,
  User,
  Shield,
} from "lucide-react";
import { useState } from "react";

export const Navbar = () => {
  const location = useLocation();
  const { user, session, signOut, getOverallProgress } = useProgress();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = session ? [
    { label: "Courses", href: "/curriculum", icon: BookOpen },
    { label: "Dashboard", href: "/dashboard", icon: BarChart3 },
    { label: "Certificate", href: "/certificate", icon: Award },
  ] : [];

  const isActive = (href: string) => location.pathname.startsWith(href);

  const handleLogout = async () => {
    await signOut();
    setMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow">
              <GraduationCap className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <span className="font-display font-bold text-lg text-foreground">Innov Skills</span>
              <span className="text-xs text-muted-foreground block -mt-1">By Innovkaro</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
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
            <Link to="/verify">
              <Button variant="ghost" size="sm" className="gap-2">
                <Shield className="w-4 h-4" />
                Verify
              </Button>
            </Link>
          </div>

          {/* User Section */}
          <div className="hidden md:flex items-center gap-4">
            {session ? (
              <>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center">
                    <User className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <div className="text-sm">
                    <p className="font-medium text-foreground">{user?.name || 'User'}</p>
                    <p className="text-xs text-muted-foreground">{getOverallProgress()}% Complete</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={handleLogout}>
                  <LogOut className="w-4 h-4" />
                </Button>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/auth">
                  <Button variant="ghost" size="sm" className="font-medium">
                    Login
                  </Button>
                </Link>
                <Link to="/auth">
                  <Button variant="default" size="sm" className="font-semibold shadow-md hover:shadow-lg transition-shadow">
                    Register Now
                  </Button>
                </Link>
              </div>
            )}
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
              {navItems.map((item) => (
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
              <Link to="/verify" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <Shield className="w-4 h-4" />
                  Verify Certificate
                </Button>
              </Link>
              {session ? (
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-2 text-destructive"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </Button>
              ) : (
                <div className="flex flex-col gap-2 pt-2 border-t border-border">
                  <Link to="/auth" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full font-medium">
                      Login
                    </Button>
                  </Link>
                  <Link to="/auth" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="default" className="w-full font-semibold">
                      Register Now
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};