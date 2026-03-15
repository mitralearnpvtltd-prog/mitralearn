import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import mitraLearnLogo from "@/assets/mitra-learn-logo.png";

const LandingFooter = () => {
  return (
    <footer className="py-14 px-4 sm:px-10 lg:px-20" style={{ background: "hsl(var(--foreground))", color: "rgba(255,255,255,0.7)" }}>
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
              <img src={mitraLearnLogo} alt="Mitra Learn" className="h-8 w-auto brightness-0 invert" />
            </Link>
            <p className="text-[13px] leading-relaxed max-w-[240px]" style={{ color: "rgba(255,255,255,0.5)" }}>
              Empowering learners worldwide with industry-leading courses, expert instructors, and flexible learning paths.
            </p>
            <div className="flex gap-2.5 mt-5">
              {["𝕏", "f", "in", "▶"].map((icon) => (
                <div
                  key={icon}
                  className="w-[34px] h-[34px] rounded-lg flex items-center justify-center text-sm cursor-pointer transition-colors duration-200 hover:bg-primary"
                  style={{ background: "rgba(255,255,255,0.1)" }}
                >
                  {icon}
                </div>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h5 className="text-[15px] font-extrabold mb-4" style={{ color: "white" }}>Company</h5>
            {["About Us", "Careers", "Blog", "Press", "Affiliate"].map((item) => (
              <a
                key={item}
                href="#"
                className="block text-[13px] mb-2.5 transition-colors duration-200 hover:text-primary"
                style={{ color: "rgba(255,255,255,0.55)" }}
              >
                {item}
              </a>
            ))}
          </div>

          {/* Courses */}
          <div>
            <h5 className="text-[15px] font-extrabold mb-4" style={{ color: "white" }}>Courses</h5>
            {["Data Engineering", "AI Engineering", "Full Stack Dev", "Python Dev", "Marketing"].map((item) => (
              <a
                key={item}
                href="#"
                className="block text-[13px] mb-2.5 transition-colors duration-200 hover:text-primary"
                style={{ color: "rgba(255,255,255,0.55)" }}
              >
                {item}
              </a>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h5 className="text-[15px] font-extrabold mb-4" style={{ color: "white" }}>Contact</h5>
            {[
              "📍 Bangalore, India",
              "📞 +91 (XXX) XXX-XXXX",
              "✉️ hello@mitralearn.com",
              "🕐 Mon–Fri, 9am–6pm",
            ].map((item) => (
              <a
                key={item}
                href="#"
                className="block text-[13px] mb-2.5 transition-colors duration-200 hover:text-primary"
                style={{ color: "rgba(255,255,255,0.55)" }}
              >
                {item}
              </a>
            ))}
          </div>
        </motion.div>

        {/* Bottom */}
        <div
          className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-[13px]"
          style={{ borderTop: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.4)" }}
        >
          <span>© 2025 Mitra Learn. All rights reserved.</span>
          <div className="flex gap-5">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
              <a key={item} href="#" className="hover:text-primary transition-colors" style={{ color: "rgba(255,255,255,0.4)" }}>
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;
