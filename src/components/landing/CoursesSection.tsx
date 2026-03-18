import { motion } from "framer-motion";
import { Loader2, Clock, BookOpen, Star, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePublishedCourses } from "@/hooks/useCourses";
import { useNavigate } from "react-router-dom";

const CoursesSection = () => {
  const { courses: dbCourses, isLoading: isCoursesLoading } = usePublishedCourses();
  const navigate = useNavigate();

  const getCourseLink = (course: any) => {
    // Data Engineering course goes to the hardcoded curriculum page
    if (course.title?.toLowerCase().includes("data engineering")) {
      return "/curriculum";
    }
    // All other courses use dynamic routing
    return `/course/${course.id}`;
  };

  return (
    <section id="courses" className="py-20 px-4 sm:px-10 lg:px-20 bg-muted">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-10">
          <div>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-2">
              Check Out Our Courses
            </h2>
            <p className="text-muted-foreground text-[14px] leading-relaxed max-w-md">
              Join our learning community to enhance your skills and knowledge, paving the way for a successful future.
            </p>
          </div>
          <Button
            onClick={() => navigate("/curriculum")}
            className="bg-foreground text-background hover:bg-foreground/90 font-bold text-sm rounded-full px-5 py-2.5 h-auto gap-2"
          >
            All Courses
            <span className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
              <ArrowUpRight className="h-3.5 w-3.5 text-primary-foreground" />
            </span>
          </Button>
        </div>

        {isCoursesLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
          </div>
        ) : dbCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {dbCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                onClick={() => navigate(`/curriculum/${course.id}`)}
              >
                {/* Thumbnail */}
                <div className="h-[200px] relative overflow-hidden">
                  {course.image_url ? (
                    <img src={course.image_url} alt={course.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-accent to-primary/20 flex items-center justify-center">
                      <BookOpen className="h-12 w-12 text-primary/40" />
                    </div>
                  )}
                </div>

                {/* Body */}
                <div className="p-5">
                  {/* Meta row */}
                  <div className="flex items-center gap-4 mb-3 text-[12px] text-muted-foreground">
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {course.duration}</span>
                    <span className="flex items-center gap-1"><BookOpen className="h-3 w-3" /> 11 Lessons</span>
                    <span className="ml-auto font-bold text-foreground text-sm">
                      {course.price > 0 ? `₹${course.price.toLocaleString()}` : "Free"}
                    </span>
                    {course.rating && (
                      <span className="flex items-center gap-0.5 text-[12px] font-bold text-secondary">
                        {course.rating} <Star className="h-3 w-3 fill-secondary text-secondary" />
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-extrabold text-foreground mb-2 leading-snug font-sans">{course.title}</h3>
                  <p className="text-[13px] text-muted-foreground leading-relaxed mb-4 line-clamp-2">{course.description}</p>

                  <div className="flex items-center justify-between">
                    <button className="bg-foreground text-background text-[13px] font-bold px-5 py-2.5 rounded-full hover:bg-foreground/90 transition-all duration-200 flex items-center gap-2">
                      View Courses
                      <span className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                        <ArrowUpRight className="h-3 w-3 text-primary-foreground" />
                      </span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">No courses available yet. Check back soon!</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default CoursesSection;
