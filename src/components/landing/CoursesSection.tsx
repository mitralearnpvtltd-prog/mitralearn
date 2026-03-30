import { motion } from "framer-motion";
import { Loader2, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePublishedCourses } from "@/hooks/useCourses";
import { useNavigate } from "react-router-dom";
import { CourseCard } from "@/components/CourseCard";

const CoursesSection = () => {
  const { courses: dbCourses, isLoading: isCoursesLoading } = usePublishedCourses();
  const navigate = useNavigate();

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dbCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <CourseCard course={course} />
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
