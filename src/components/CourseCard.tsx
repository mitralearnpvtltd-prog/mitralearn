import { Link } from "react-router-dom";
import { Clock, Users, Star, ArrowRight, Database, Brain, Code, TrendingUp } from "lucide-react";
import { Course } from "@/hooks/useCourses";

// Static image imports for fallback
import courseDataEngineering from "@/assets/course-cover-data-engineering.jpg";
import courseAiEngineer from "@/assets/course-cover-ai-engineer.png";
import courseFullstack from "@/assets/course-cover-fullstack.png";
import coursePythonAi from "@/assets/course-cover-python-ai.png";
import courseJavaFullstack from "@/assets/course-cover-java-fullstack.png";
import courseMarketing from "@/assets/course-cover-marketing.png";

// Map icon types to components
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  database: Database,
  brain: Brain,
  code: Code,
  'trending-up': TrendingUp,
};

// Map course titles to fallback images
const imageMap: Record<string, string> = {
  'Data Engineering': courseDataEngineering,
  'AI Engineer': courseAiEngineer,
  'Fullstack Developer': courseFullstack,
  'Python AI Engineer': coursePythonAi,
  'Java Fullstack': courseJavaFullstack,
  'Product Marketing': courseMarketing,
};

interface CourseCardProps {
  course: Course;
  showAdminControls?: boolean;
  onEdit?: (course: Course) => void;
  onDelete?: (courseId: string) => void;
  adminActions?: React.ReactNode;
}

export function CourseCard({ 
  course, 
  showAdminControls = false,
  adminActions 
}: CourseCardProps) {
  const IconComponent = iconMap[course.icon_type] || Database;
  const fallbackImage = imageMap[course.title];
  const displayImage = course.image_url || fallbackImage;
  const isActive = course.status === 'active';

  return (
    <div 
      className={`group bg-white relative cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden flex flex-col h-full ${
        showAdminControls && !course.is_published ? 'opacity-70' : ''
      }`}
      style={{ 
        borderRadius: '14px',
        border: '1px solid #E5E7EB',
      }}
    >
      {/* Admin Controls Overlay */}
      {showAdminControls && adminActions && (
        <div className="absolute top-2 right-2 z-20 flex gap-1">
          {adminActions}
        </div>
      )}

      {/* Image Section - compact */}
      <div 
        className="relative h-36 w-full overflow-hidden"
        style={{ backgroundColor: course.icon_bg }}
      >
        {displayImage ? (
          <img 
            src={displayImage} 
            alt={course.title}
            className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div 
            className="w-full h-full flex items-center justify-center"
            style={{ 
              background: `linear-gradient(135deg, ${course.icon_bg}cc 0%, ${course.icon_bg} 100%)`,
            }}
          >
            <IconComponent className="h-12 w-12 text-white/80" />
          </div>
        )}
        
        {/* Badge (top-left) */}
        {course.badge && (
          <div className="absolute top-2 left-2">
            <span 
              className="text-white text-[10px] font-semibold px-2 py-1 rounded-md"
              style={{ backgroundColor: course.badge_color }}
            >
              {course.badge}
            </span>
          </div>
        )}

        {/* Price overlay (top-right) */}
        <div className="absolute top-2 right-2">
          <span className="text-xs font-bold px-2 py-1 rounded-md bg-white/90 text-foreground backdrop-blur-sm">
            {course.price > 0 ? `₹${Number(course.price).toLocaleString()}` : "Free"}
          </span>
        </div>

        {/* Published/Draft indicator for admin */}
        {showAdminControls && !course.is_published && (
          <div className="absolute bottom-2 left-2">
            <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-white/90 text-muted-foreground">
              Draft
            </span>
          </div>
        )}
      </div>
      
      {/* Content Section - tighter spacing */}
      <div className="p-4 flex flex-col flex-1">
        {/* Course Code (admin only) */}
        {showAdminControls && course.course_code && (
          <div className="mb-1.5">
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
              {course.course_code}
            </span>
          </div>
        )}
        
        {/* Title */}
        <h3 className="text-sm font-bold text-foreground mb-2 leading-snug line-clamp-2">
          {course.title}
        </h3>
        
        {/* Tags - compact */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {course.concepts?.slice(0, 2).map((concept, i) => (
            <span 
              key={i} 
              className="text-[10px] px-2 py-0.5 rounded-full border border-border text-muted-foreground"
            >
              {concept}
            </span>
          ))}
          {((course.concepts?.length || 0) > 2 || (course.extra_concepts_count && course.extra_concepts_count > 0)) && (
            <span className="text-[10px] px-2 py-0.5 rounded-full border border-border text-muted-foreground">
              +{(course.extra_concepts_count || 0) + Math.max(0, (course.concepts?.length || 0) - 2)}
            </span>
          )}
        </div>
        
        {/* Meta row */}
        <div className="flex items-center gap-3 mb-3 text-[11px] text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {course.duration}
          </span>
          <span className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            {course.students_count || '0'}
          </span>
          <span className="flex items-center gap-0.5 ml-auto">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold text-foreground">{course.rating}</span>
          </span>
        </div>
        
        {/* CTA Button */}
        <div className="mt-auto">
          {isActive ? (
            <Link to={course.title === 'Data Engineering' ? '/curriculum' : `/course/${course.id}`} className="block">
              <button 
                className="w-full py-2 rounded-lg text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all hover:opacity-90"
                style={{ 
                  background: 'linear-gradient(90deg, hsl(var(--primary)) 0%, hsl(var(--secondary)) 100%)',
                }}
              >
                Explore Course <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </Link>
          ) : (
            <button 
              className="w-full py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 bg-muted text-muted-foreground"
              disabled
            >
              <Clock className="h-3.5 w-3.5" /> Coming Soon
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
