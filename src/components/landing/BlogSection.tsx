import { motion } from "framer-motion";

const blogPosts = [
  {
    tag: "Education",
    title: "How to Stay Motivated While Learning Online Classes in 2025",
    desc: "Discover proven strategies to keep your motivation high and stay on track with your online learning goals.",
    author: "Robert David",
    date: "March 10, 2025",
    comments: "12 Comments",
    featured: true,
    gradient: "from-accent to-primary/20",
  },
  {
    tag: "Technology",
    title: "How Cutting-Edge Tech Transforms Our Learning Experience",
    date: "Feb 20, 2025",
    gradient: "from-green-light to-success/20",
  },
  {
    tag: "Career",
    title: "A Disciplinary Student Should Master These Core Skills",
    date: "Feb 15, 2025",
    gradient: "from-blue-light to-info/20",
  },
  {
    tag: "Tips",
    title: "5 Tips to Maximize Your Learning Potential Every Day",
    date: "Feb 10, 2025",
    gradient: "from-accent to-destructive/10",
  },
  {
    tag: "Industry",
    title: "Top Industries Hiring Online-Educated Professionals in 2025",
    date: "Feb 5, 2025",
    gradient: "from-yellow-light to-secondary/20",
  },
];

const BlogSection = () => {
  const featured = blogPosts[0];
  const col2 = blogPosts.slice(1, 3);
  const col3 = blogPosts.slice(3, 5);

  return (
    <section className="py-20 px-4 sm:px-10 lg:px-20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block text-xs font-bold text-primary bg-accent px-3.5 py-1 rounded-full mb-3">
            LATEST NEWS
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground">
            A Look At The Most Recent
            <br />
            Events And <span className="text-primary">News</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr_1fr] gap-6">
          {/* Featured */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="border border-border rounded-xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            <div className={`h-[260px] bg-gradient-to-br ${featured.gradient} flex items-center justify-center text-5xl`}>
              📰
            </div>
            <div className="p-5 bg-card">
              <span className="inline-block text-[11px] font-bold text-primary bg-accent px-2.5 py-0.5 rounded-md mb-2.5">
                {featured.tag}
              </span>
              <h4 className="text-[15px] font-extrabold text-foreground leading-snug mb-2 font-sans">{featured.title}</h4>
              <p className="text-[12px] text-muted-foreground leading-relaxed mb-3">{featured.desc}</p>
              <div className="flex items-center gap-3 text-[12px] text-muted-foreground">
                <span>👤 {featured.author}</span>
                <span>📅 {featured.date}</span>
                <span>💬 {featured.comments}</span>
              </div>
            </div>
          </motion.div>

          {/* Column 2 */}
          <div className="flex flex-col gap-6">
            {col2.map((post, i) => (
              <motion.div
                key={post.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="border border-border rounded-xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className={`h-[130px] bg-gradient-to-br ${post.gradient} flex items-center justify-center text-4xl`}>
                  {post.tag === "Technology" ? "🚀" : "🎓"}
                </div>
                <div className="p-4 bg-card">
                  <span className="inline-block text-[11px] font-bold text-primary bg-accent px-2.5 py-0.5 rounded-md mb-2">
                    {post.tag}
                  </span>
                  <h4 className="text-sm font-extrabold text-foreground leading-snug font-sans">{post.title}</h4>
                  <p className="text-[12px] text-muted-foreground mt-2">📅 {post.date}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Column 3 */}
          <div className="flex flex-col gap-6">
            {col3.map((post, i) => (
              <motion.div
                key={post.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="border border-border rounded-xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className={`h-[130px] bg-gradient-to-br ${post.gradient} flex items-center justify-center text-4xl`}>
                  {post.tag === "Tips" ? "💡" : "📊"}
                </div>
                <div className="p-4 bg-card">
                  <span className="inline-block text-[11px] font-bold text-primary bg-accent px-2.5 py-0.5 rounded-md mb-2">
                    {post.tag}
                  </span>
                  <h4 className="text-sm font-extrabold text-foreground leading-snug font-sans">{post.title}</h4>
                  <p className="text-[12px] text-muted-foreground mt-2">📅 {post.date}</p>
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
