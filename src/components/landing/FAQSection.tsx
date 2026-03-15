import { useState } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import faqImage from "@/assets/faq-image.jpg";

const faqs = [
  {
    q: "How do I enroll with Mitra Learn?",
    a: "Simply create a free account, browse our course catalogue and click 'Enroll Now' on any course that interests you. You'll get instant access to all course materials.",
  },
  {
    q: "Can I access courses on mobile devices?",
    a: "Yes! Mitra Learn is fully responsive so you can learn anywhere, anytime from any device.",
  },
  {
    q: "How can I get help if I have issues?",
    a: "Our dedicated support team is available via email and chat. You can also find answers in our comprehensive help centre.",
  },
  {
    q: "Do you offer refunds on subscriptions?",
    a: "We offer a 7-day money-back guarantee on all course purchases. If you're not satisfied, contact us within 7 days for a full refund.",
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
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20 items-start">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative rounded-[20px] h-[350px] sm:h-[420px] overflow-hidden"
        >
          <img src={faqImage} alt="FAQ" className="w-full h-full object-cover" />
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-card rounded-xl px-5 py-3.5 text-center shadow-lg">
            <p className="text-2xl font-black text-primary">98%</p>
            <p className="text-[12px] text-muted-foreground">Satisfaction Rate</p>
          </div>
        </motion.div>

        {/* FAQ List */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-block text-xs font-bold text-primary bg-accent px-3.5 py-1 rounded-full mb-3">
            FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-8">
            Answers To Frequently
            <br />
            Asked <span className="text-primary">Questions</span>
          </h2>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-border rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left text-sm font-bold text-foreground bg-card hover:bg-muted transition-colors font-sans"
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
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
