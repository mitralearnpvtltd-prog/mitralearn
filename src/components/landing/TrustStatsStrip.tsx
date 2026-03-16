import { motion } from "framer-motion";

const partners = [
  "Boltshift", "Nietzsche", "Polymath", "Lightbox", "Boltshift", "Nietzsche", "Polymath", "Lightbox",
];

const TrustStatsStrip = () => {
  return (
    <section className="py-8 border-y border-border bg-card overflow-hidden">
      <p className="text-center text-sm text-muted-foreground font-semibold mb-5">
        We collaborate with over 250 companies
      </p>
      <div className="relative overflow-hidden">
        <div className="flex animate-marquee gap-12 whitespace-nowrap">
          {[...partners, ...partners].map((name, i) => (
            <span
              key={i}
              className="text-lg font-black text-foreground/60 tracking-tight flex items-center gap-2 flex-shrink-0"
            >
              <span className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs text-foreground">
                {name[0]}
              </span>
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustStatsStrip;
