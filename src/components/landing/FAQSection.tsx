import { useState } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import faqImage from "@/assets/faq-image.jpg";

const faqs = [
  {
    q: "How do I get started with LearnEdge?",
    a: "Simply create a free account, browse our course catalogue and click 'Enroll Now' on any course that interests you. You'll get instant access to all course materials.",
  },
  {
    q: "Can I access courses on mobile devices?",
    a: "Yes! Our platform is fully responsive so you can learn anywhere, anytime from any device.",
  },
  {
    q: "How can I contact support if I have issues?",
    a: "Our dedicated support team is available via email and chat. You can also find answers in our comprehensive help centre.",
  },
  {
    q: "Do you offer corporate or team subscriptions?",
    a: "Yes, we offer corporate plans with bulk pricing and team management features. Contact us for more details.",
  },
  {
    q: "Will I receive a certificate upon course completion?",
    a: "Absolutely! Upon completing any course you'll receive a verified digital certificate that you can share on LinkedIn and with employers.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="py-20 px-4 sm:px-10 lg:px-20 bg-muted">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground">
            Answers To Frequently
            <br />
            Asked Questions
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-16 items-start">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-[20px] h-[350px] sm:h-[420px] overflow-hidden"
          >
            <img src={faqImage} alt="FAQ" className="w-full h-full object-cover" />
          </motion.div>

          {/* FAQ List */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-3"
          >
            {faqs.map((faq, i) => (
              <div key={i} className="border border-border rounded-xl overflow-hidden bg-card">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left text-sm font-bold text-foreground hover:bg-muted/50 transition-colors font-sans"
                >
                  {faq.q}
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                      openIndex === i ? "bg-primary text-primary-foreground rotate-45" : "bg-accent text-primary"
                    }`}
                  >
                    <Plus className="h-4 w-4" />
                  </div>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === i ? "max-h-40 pb-4 px-5" : "max-h-0"
                  }`}
                >
                  <p className="text-[13px] text-muted-foreground leading-relaxed">{faq.a}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
