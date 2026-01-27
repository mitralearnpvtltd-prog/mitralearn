import { supabase } from '@/integrations/supabase/client';

export interface AuditLogEntry {
  course_id: string | null;
  user_id: string;
  action: string;
  target_table: string;
  old_data?: Record<string, any> | null;
  new_data?: Record<string, any> | null;
}

export const useAuditLog = () => {
  const logChange = async (entry: AuditLogEntry) => {
    try {
      const { error } = await supabase
        .from('course_change_logs')
        .insert([entry]);

      if (error) {
        console.error('Error logging change:', error);
      }
    } catch (err) {
      console.error('Failed to log change:', err);
    }
  };

  const logCourseCreate = (courseId: string, userId: string, courseData: Record<string, any>) => {
    return logChange({
      course_id: courseId,
      user_id: userId,
      action: 'CREATE',
      target_table: 'courses',
      new_data: courseData,
    });
  };

  const logCourseUpdate = (courseId: string, userId: string, oldData: Record<string, any>, newData: Record<string, any>) => {
    return logChange({
      course_id: courseId,
      user_id: userId,
      action: 'UPDATE',
      target_table: 'courses',
      old_data: oldData,
      new_data: newData,
    });
  };

  const logCourseDelete = (courseId: string, userId: string, courseData: Record<string, any>) => {
    return logChange({
      course_id: courseId,
      user_id: userId,
      action: 'DELETE',
      target_table: 'courses',
      old_data: courseData,
    });
  };

  const logCurriculumChange = (
    courseId: string, 
    userId: string, 
    action: 'CREATE' | 'UPDATE' | 'DELETE',
    targetTable: 'course_modules' | 'course_lessons' | 'lesson_resources',
    oldData?: Record<string, any> | null,
    newData?: Record<string, any> | null
  ) => {
    return logChange({
      course_id: courseId,
      user_id: userId,
      action,
      target_table: targetTable,
      old_data: oldData,
      new_data: newData,
    });
  };

  return {
    logChange,
    logCourseCreate,
    logCourseUpdate,
    logCourseDelete,
    logCurriculumChange,
  };
};
