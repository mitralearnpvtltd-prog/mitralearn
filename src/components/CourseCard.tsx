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
      className={`group bg-white relative cursor-pointer transition-all duration-200 hover:shadow-xl hover:-translate-y-1 overflow-hidden flex flex-col h-full ${
        showAdminControls && !course.is_published ? 'opacity-70' : ''
      }`}
      style={{ 
        borderRadius: '16px',
        border: '1px solid #E5E7EB',
      }}
    >
      {/* Admin Controls Overlay */}
      {showAdminControls && adminActions && (
        <div className="absolute top-3 right-3 z-20 flex gap-1">
          {adminActions}
        </div>
      )}

      {/* Image Section */}
      <div 
        className="relative h-48 w-full overflow-hidden"
        style={{ backgroundColor: course.icon_bg }}
      >
        {displayImage ? (
          <img 
            src={displayImage} 
            alt={course.title}
            className="w-full h-full object-cover object-center"
          />
        ) : (
          <div 
            className="w-full h-full flex items-center justify-center"
            style={{ 
              background: `linear-gradient(135deg, ${course.icon_bg}cc 0%, ${course.icon_bg} 100%)`,
            }}
          >
            <IconComponent className="h-16 w-16 text-white/80" />
          </div>
        )}
        
        {/* Badge (top-left) */}
        {course.badge && (
          <div className="absolute top-3 left-3">
            <span 
              className="text-white text-xs font-semibold px-3 py-1.5 rounded-md"
              style={{ backgroundColor: course.badge_color }}
            >
              {course.badge}
            </span>
          </div>
        )}

        {/* Published/Draft indicator for admin */}
        {showAdminControls && !course.is_published && (
          <div className="absolute bottom-3 left-3">
            <span className="text-xs font-medium px-2 py-1 rounded bg-white/90 text-muted-foreground">
              Draft
            </span>
          </div>
        )}
      </div>
      
      {/* Content Section */}
      <div className="p-5 flex flex-col flex-1">
        {/* Course Code (admin only) */}
        {showAdminControls && course.course_code && (
          <div className="mb-2">
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-muted text-muted-foreground">
              {course.course_code}
            </span>
          </div>
        )}
        
        {/* Title */}
        <h3 
          className="text-lg font-bold mb-3"
          style={{ color: '#0F172A' }}
        >
          {course.title}
        </h3>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4 min-h-[32px]">
          {course.concepts?.slice(0, 3).map((concept, i) => (
            <span 
              key={i} 
              className="text-xs px-3 py-1 rounded-full border"
              style={{ borderColor: '#E5E7EB', color: '#475569' }}
            >
              {concept}
            </span>
          ))}
          {((course.concepts?.length || 0) > 3 || (course.extra_concepts_count && course.extra_concepts_count > 0)) && (
            <span 
              className="text-xs px-3 py-1 rounded-full border"
              style={{ borderColor: '#E5E7EB', color: '#475569' }}
            >
              +{(course.extra_concepts_count || 0) + Math.max(0, (course.concepts?.length || 0) - 3)}
            </span>
          )}
        </div>
        
        {/* Duration & Students */}
        <div className="flex items-center gap-4 mb-4 text-sm" style={{ color: '#64748B' }}>
          <div className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="h-4 w-4" />
            <span>{course.students_count || '0'}</span>
          </div>
        </div>
        
        {/* Rating & Level */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1.5">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold" style={{ color: '#0F172A' }}>{course.rating}</span>
            <span className="text-sm" style={{ color: '#64748B' }}>({course.reviews_count || '0'})</span>
          </div>
          <span 
            className="text-xs font-medium px-2.5 py-1 rounded-full"
            style={{ 
              backgroundColor: '#EDE9FE',
              color: '#7C3AED',
            }}
          >
            Beginner to Advanced
          </span>
        </div>
        
        {/* CTA Button */}
        <div className="mt-auto pt-2">
      {isActive ? (
          <Link to={course.title === 'Data Engineering' ? '/curriculum' : `/course/${course.id}`} className="block">
            <button 
              className="w-full py-3 rounded-lg text-white font-semibold flex items-center justify-center gap-2 transition-all hover:opacity-90"
              style={{ 
                background: 'linear-gradient(90deg, #7C3AED 0%, #06B6D4 100%)',
              }}
            >
              Explore Course <ArrowRight className="h-4 w-4" />
            </button>
          </Link>
        ) : (
          <button 
            className="w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
            style={{ 
              backgroundColor: '#F1F5F9',
              color: '#64748B',
            }}
            disabled
          >
            <Clock className="h-4 w-4" /> Coming Soon
          </button>
        )}
      </div>
    </div>
  );
}
