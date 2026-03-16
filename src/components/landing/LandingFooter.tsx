import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import mitraLearnLogo from "@/assets/mitra-learn-logo.png";

const LandingFooter = () => {
  return (
    <footer className="py-14 px-4 sm:px-10 lg:px-20 bg-card border-t border-border">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12"
        >
          {/* Brand */}
          <div>
            <Link to="/" className="inline-block mb-3.5">
              <img src={mitraLearnLogo} alt="LearnEdge" className="h-8 w-auto" />
            </Link>
            <p className="text-[13px] leading-relaxed max-w-[240px] text-muted-foreground">
              Empowering learners worldwide with quality education and skills for the future.
            </p>
            <div className="flex gap-3 mt-5">
              {[
                { icon: "𝕏", label: "Twitter" },
                { icon: "f", label: "Facebook" },
                { icon: "▶", label: "YouTube" },
                { icon: "in", label: "LinkedIn" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-sm text-foreground cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
                >
                  {s.icon}
                </div>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h5 className="text-[15px] font-extrabold text-foreground mb-4">Company</h5>
            {["Home", "About", "Course", "Blog", "Contact"].map((item) => (
              <a key={item} href="#" className="block text-[13px] mb-2.5 text-muted-foreground hover:text-primary transition-colors">
                {item}
              </a>
            ))}
          </div>

          {/* Template */}
          <div>
            <h5 className="text-[15px] font-extrabold text-foreground mb-4">Template</h5>
            {["Course Details", "Blog Details", "Style Guide", "Licenses", "Changelog"].map((item) => (
              <a key={item} href="#" className="block text-[13px] mb-2.5 text-muted-foreground hover:text-primary transition-colors">
                {item}
              </a>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h5 className="text-[15px] font-extrabold text-foreground mb-4">Contact</h5>
            {[
              "📞 (62) 1824617",
              "✉️ contact@learnedge.com",
              "📍 124 Elm St, Springfield, Illinois 07141",
            ].map((item) => (
              <p key={item} className="text-[13px] mb-2.5 text-muted-foreground">
                {item}
              </p>
            ))}
          </div>
        </motion.div>

        {/* Bottom */}
        <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-[13px] text-muted-foreground border-t border-border">
          <span>© All rights reserved. LearnEdge.</span>
          <span className="text-muted-foreground">Powered by <span className="font-bold text-foreground">Webflow</span></span>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;
