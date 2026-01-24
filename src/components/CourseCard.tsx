import { Link } from "react-router-dom";
import { Clock, Users, Star, ArrowRight } from "lucide-react";

export interface CourseCardData {
  id?: string;
  title: string;
  description?: string;
  concepts: string[];
  extraConceptsCount?: number;
  duration: string;
  students: string;
  rating: number;
  reviews: string;
  status: string;
  badge?: string;
  badgeColor?: string;
  iconBg?: string;
  image?: string;
}

interface CourseCardProps {
  course: CourseCardData;
  onClick?: () => void;
}

export default function CourseCard({ course, onClick }: CourseCardProps) {
  const handleClick = () => {
    if (onClick) onClick();
  };

  return (
    <div 
      className="group bg-white relative cursor-pointer transition-all duration-200 hover:shadow-xl hover:-translate-y-1 overflow-hidden"
      style={{ 
        borderRadius: '16px',
        border: '1px solid #E5E7EB',
      }}
      onClick={handleClick}
    >
      {/* Image Section */}
      <div 
        className="relative h-48 w-full overflow-hidden"
        style={{ 
          backgroundColor: course.iconBg || '#7C3AED',
        }}
      >
        {course.image ? (
          <img 
            src={course.image} 
            alt={course.title}
            className="w-full h-full object-cover object-center"
          />
        ) : (
          <div 
            className="w-full h-full"
            style={{ 
              background: `linear-gradient(135deg, ${course.iconBg || '#7C3AED'}cc 0%, ${course.iconBg || '#7C3AED'} 100%)`,
            }}
          />
        )}
        
        {/* Badge (top-left) */}
        {course.badge && (
          <div className="absolute top-3 left-3">
            <span 
              className="text-white text-xs font-semibold px-3 py-1.5 rounded-md"
              style={{ backgroundColor: course.badgeColor || '#7C3AED' }}
            >
              {course.badge}
            </span>
          </div>
        )}
      </div>
      
      {/* Content Section */}
      <div className="p-5">
        {/* Title */}
        <h3 
          className="text-lg font-bold mb-3"
          style={{ color: '#0F172A' }}
        >
          {course.title}
        </h3>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {course.concepts?.map((concept, i) => (
            <span 
              key={i} 
              className="text-xs px-3 py-1 rounded-full border"
              style={{ borderColor: '#E5E7EB', color: '#475569' }}
            >
              {concept}
            </span>
          ))}
          {course.extraConceptsCount && course.extraConceptsCount > 0 && (
            <span 
              className="text-xs px-3 py-1 rounded-full border"
              style={{ borderColor: '#E5E7EB', color: '#475569' }}
            >
              +{course.extraConceptsCount}
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
            <span>{course.students}</span>
          </div>
        </div>
        
        {/* Rating & Level */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1.5">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold" style={{ color: '#0F172A' }}>{course.rating}</span>
            <span className="text-sm" style={{ color: '#64748B' }}>({course.reviews})</span>
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
        {course.status === 'active' ? (
          <Link to="/curriculum" className="block" onClick={(e) => e.stopPropagation()}>
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
