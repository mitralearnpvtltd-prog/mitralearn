import { motion } from "framer-motion";
import { Loader2, Clock, BookOpen, User, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePublishedCourses } from "@/hooks/useCourses";
import { useNavigate } from "react-router-dom";

const CoursesSection = () => {
  const { courses: dbCourses, isLoading: isCoursesLoading } = usePublishedCourses();
  const navigate = useNavigate();

  const tagColors = [
    "bg-accent text-primary",
    "bg-blue-light text-info",
    "bg-green-light text-green-dark",
    "bg-yellow-light text-secondary",
  ];

  return (
    <section className="py-20 px-4 sm:px-10 lg:px-20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-9">
          <div>
            <span className="inline-block text-xs font-bold text-primary bg-accent px-3.5 py-1 rounded-full mb-3">
              FEATURED COURSES
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground">
              Check Out Our <span className="text-primary">Courses</span>
            </h2>
          </div>
          <Button
            onClick={() => navigate("/curriculum")}
            className="bg-primary hover:bg-primary/90 font-bold text-sm shadow-glow"
          >
            See All Courses →
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
                className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                onClick={() => navigate(`/curriculum/${course.id}`)}
              >
                {/* Thumbnail */}
                <div className="h-[180px] relative overflow-hidden">
                  {course.image_url ? (
                    <img src={course.image_url} alt={course.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-accent to-primary/20 flex items-center justify-center">
                      <BookOpen className="h-12 w-12 text-primary/40" />
                    </div>
                  )}
                  <span className={`absolute top-3 left-3 text-[11px] font-bold px-2.5 py-1 rounded-md ${tagColors[index % tagColors.length]}`}>
                    {course.category_badge || course.category}
                  </span>
                </div>

                {/* Body */}
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-2.5 text-[12px] text-muted-foreground">
                    <span className="flex items-center gap-1"><User className="h-3 w-3" /> {course.students_count || "0"} students</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {course.duration}</span>
                  </div>
                  <h3 className="text-base font-extrabold text-foreground mb-2 leading-snug font-sans">{course.title}</h3>
                  <p className="text-[13px] text-muted-foreground leading-relaxed mb-3.5 line-clamp-2">{course.description}</p>

                  <div className="flex items-center justify-between pt-3.5 border-t border-border">
                    <div>
                      {course.rating && (
                        <div className="flex items-center gap-1 text-[13px] font-bold text-secondary mb-0.5">
                          <Star className="h-3.5 w-3.5 fill-secondary text-secondary" />
                          {course.rating}
                          {course.reviews_count && (
                            <span className="text-muted-foreground font-normal">({course.reviews_count})</span>
                          )}
                        </div>
                      )}
                      <div className="text-lg font-extrabold text-foreground">
                        {course.price > 0 ? `₹${course.price.toLocaleString()}` : "Free"}
                        {course.original_price && course.original_price > course.price && (
                          <span className="text-sm text-muted-foreground line-through ml-2 font-normal">
                            ₹{course.original_price.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>
                    <button className="bg-accent text-primary text-[13px] font-bold px-4 py-2 rounded-lg hover:bg-primary hover:text-primary-foreground transition-all duration-200">
                      Enroll Now →
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
