import { motion } from "framer-motion";

const TrustStatsStrip = () => {
  const partners = [
    { name: "Udemy", color: "bg-primary" },
    { name: "Skillshare", color: "bg-success" },
    { name: "Lightfoot", color: "bg-info" },
    { name: "Udacourse", color: "bg-secondary" },
    { name: "Purposeful", color: "bg-destructive" },
    { name: "Coursify", color: "bg-success" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="border-t border-b border-border py-4 px-4 sm:px-10 lg:px-20 flex flex-col sm:flex-row items-center justify-between gap-4 bg-card"
    >
      <p className="text-[13px] text-muted-foreground font-semibold whitespace-nowrap">
        Trusted by 1000+ companies
      </p>
      <div className="flex items-center gap-6 sm:gap-8 flex-wrap justify-center">
        {partners.map((p) => (
          <div key={p.name} className="flex items-center gap-1.5 font-extrabold text-sm text-muted-foreground">
            <span className={`w-2 h-2 rounded-full ${p.color}`} />
            {p.name}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default TrustStatsStrip;
