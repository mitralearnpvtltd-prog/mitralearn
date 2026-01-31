import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import mitraLearnLogo from "@/assets/mitra-learn-logo.png";

const LandingFooter = () => {
  return (
    <footer className="py-12 bg-muted/30 border-t border-border/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col lg:flex-row justify-between items-center gap-8"
        >
          {/* Logo and description */}
          <div className="flex flex-col items-center lg:items-start gap-4">
            <Link to="/">
              <img 
                src={mitraLearnLogo} 
                alt="Mitra Learn" 
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-sm text-muted-foreground text-center lg:text-left max-w-xs">
              Empowering careers through quality tech education
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
            <Link 
              to="/curriculum" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Courses
            </Link>
            <Link 
              to="/verify-certificate" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Verify Certificate
            </Link>
            <a 
              href="mailto:support@mitralearn.com" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Contact
            </a>
          </div>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            © 2025 Mitra Learn. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default LandingFooter;
