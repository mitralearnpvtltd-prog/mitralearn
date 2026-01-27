import { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { supabase } from "@/integrations/supabase/client";

export type RoleName = 'SuperAdmin' | 'Admin' | 'Manager' | 'Support' | 'Instructor';

export interface UserPermissions {
  'course.create': boolean;
  'course.edit': boolean;
  'course.delete': boolean;
  'course.publish': boolean;
  'curriculum.view': boolean;
  'curriculum.edit': boolean;
  'user.view': boolean;
  'user.manage': boolean;
  'role.manage': boolean;
  'coupon.manage': boolean;
  'certificate.manage': boolean;
  'reports.view': boolean;
}

const defaultPermissions: UserPermissions = {
  'course.create': false,
  'course.edit': false,
  'course.delete': false,
  'course.publish': false,
  'curriculum.view': false,
  'curriculum.edit': false,
  'user.view': false,
  'user.manage': false,
  'role.manage': false,
  'coupon.manage': false,
  'certificate.manage': false,
  'reports.view': false,
};

export const useAdminRole = () => {
  const { user, isLoaded } = useUser();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [userRole, setUserRole] = useState<RoleName | null>(null);
  const [permissions, setPermissions] = useState<UserPermissions>(defaultPermissions);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserRoleAndPermissions = async () => {
      if (!isLoaded) return;
      
      if (!user) {
        setIsAdmin(false);
        setIsSuperAdmin(false);
        setUserRole(null);
        setPermissions(defaultPermissions);
        setIsLoading(false);
        return;
      }

      try {
        // Fetch user's role with role name
        const { data: roleData, error: roleError } = await supabase
          .from('user_roles')
          .select(`
            role_id,
            roles:role_id (
              role_name
            )
          `)
          .eq('user_id', user.id)
          .maybeSingle();

        if (roleError) {
          console.error('Error fetching user role:', roleError);
          setIsLoading(false);
          return;
        }

        if (!roleData || !roleData.roles) {
          // User has no role assigned
          setIsAdmin(false);
          setIsSuperAdmin(false);
          setUserRole(null);
          setPermissions(defaultPermissions);
          setIsLoading(false);
          return;
        }

        const roleName = (roleData.roles as any).role_name as RoleName;
        setUserRole(roleName);
        setIsAdmin(['SuperAdmin', 'Admin'].includes(roleName));
        setIsSuperAdmin(roleName === 'SuperAdmin');

        // Fetch permissions for this role
        const { data: permData, error: permError } = await supabase
          .from('role_permissions')
          .select(`
            permissions:permission_id (
              key
            )
          `)
          .eq('role_id', roleData.role_id);

        if (permError) {
          console.error('Error fetching permissions:', permError);
          setIsLoading(false);
          return;
        }

        // Build permissions object
        const userPerms = { ...defaultPermissions };
        if (permData) {
          permData.forEach((rp: any) => {
            const key = rp.permissions?.key as keyof UserPermissions;
            if (key && key in userPerms) {
              userPerms[key] = true;
            }
          });
        }
        setPermissions(userPerms);

      } catch (err) {
        console.error('Error checking admin role:', err);
        setIsAdmin(false);
        setIsSuperAdmin(false);
        setUserRole(null);
        setPermissions(defaultPermissions);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserRoleAndPermissions();
  }, [user, isLoaded]);

  // Helper function to check specific permission
  const hasPermission = (permissionKey: keyof UserPermissions): boolean => {
    return permissions[permissionKey] || false;
  };

  // Helper to check if curriculum can be edited for a specific course
  const canEditCurriculum = async (courseId: string): Promise<boolean> => {
    if (!permissions['curriculum.edit']) return false;
    if (isSuperAdmin) return true;

    // Check if curriculum is locked
    const { data } = await supabase
      .from('course_settings')
      .select('curriculum_locked')
      .eq('course_id', courseId)
      .maybeSingle();

    return data?.curriculum_locked === false;
  };

  return { 
    isAdmin, 
    isSuperAdmin,
    isLoading, 
    user, 
    userRole, 
    permissions,
    hasPermission,
    canEditCurriculum
  };
};
