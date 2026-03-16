import { motion } from "framer-motion";
import { ArrowUpRight, Calendar, Clock } from "lucide-react";
import blog1 from "@/assets/blog-1.jpg";
import blog2 from "@/assets/blog-2.jpg";
import blog3 from "@/assets/blog-3.jpg";

const blogPosts = [
  {
    title: "How to Stay Motivated During Online Classes",
    desc: "Discover proven techniques to maximize your online learning experience and achieve your educational goals.",
    date: "December 1, 2025",
    duration: "5 hours 50 min",
    img: blog1,
    featured: true,
  },
  {
    title: "How Coding Can Transform Your Career Path",
    desc: "Discover proven techniques to maximize your online learning experience and achieve your educational goals.",
    img: blog2,
  },
  {
    title: "AI Skills Every Student Should Master",
    desc: "Discover proven techniques to maximize your online learning experience and achieve your educational goals.",
    img: blog3,
  },
];

const BlogSection = () => {
  const featured = blogPosts[0];
  const side = blogPosts.slice(1);

  return (
    <section id="blog" className="py-20 px-4 sm:px-10 lg:px-20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground">
            A Look At The Most Recent
            <br />
            Events And News
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Featured post */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300"
          >
            <div className="h-[240px] overflow-hidden">
              <img src={featured.img} alt={featured.title} className="w-full h-full object-cover" />
            </div>
            <div className="p-5">
              <div className="flex items-center gap-4 mb-3 text-[12px] text-muted-foreground">
                <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {featured.date}</span>
                <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {featured.duration}</span>
              </div>
              <h4 className="text-lg font-extrabold text-foreground leading-snug mb-2 font-sans">{featured.title}</h4>
              <p className="text-[13px] text-muted-foreground leading-relaxed mb-4">{featured.desc}</p>
              <button className="bg-foreground text-background text-[13px] font-bold px-5 py-2.5 rounded-full hover:bg-foreground/90 transition-all duration-200 flex items-center gap-2">
                Read More
                <span className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                  <ArrowUpRight className="h-3 w-3 text-primary-foreground" />
                </span>
              </button>
            </div>
          </motion.div>

          {/* Side posts */}
          <div className="flex flex-col gap-6">
            {side.map((post, i) => (
              <motion.div
                key={post.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-row"
              >
                <div className="w-[140px] sm:w-[180px] flex-shrink-0 overflow-hidden">
                  <img src={post.img} alt={post.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-4 flex flex-col justify-center">
                  <h4 className="text-[15px] font-extrabold text-foreground leading-snug mb-2 font-sans">{post.title}</h4>
                  <p className="text-[12px] text-muted-foreground leading-relaxed line-clamp-2">{post.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
