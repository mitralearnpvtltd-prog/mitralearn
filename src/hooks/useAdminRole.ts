import { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { supabase } from "@/integrations/supabase/client";

export type AppRole = 'admin' | 'manager' | 'supporter' | 'viewer' | 'user';

export interface UserRolePermissions {
  canCreateCourse: boolean;
  canEditCourse: boolean;
  canDeleteCourse: boolean;
  canPublishCourse: boolean;
  canManageUsers: boolean;
  canManageRoles: boolean;
  canModerateComments: boolean;
  canViewReports: boolean;
}

const rolePermissions: Record<AppRole, UserRolePermissions> = {
  admin: {
    canCreateCourse: true,
    canEditCourse: true,
    canDeleteCourse: true,
    canPublishCourse: true,
    canManageUsers: true,
    canManageRoles: true,
    canModerateComments: true,
    canViewReports: true,
  },
  manager: {
    canCreateCourse: true,
    canEditCourse: true,
    canDeleteCourse: false,
    canPublishCourse: true,
    canManageUsers: false,
    canManageRoles: false,
    canModerateComments: true,
    canViewReports: true,
  },
  supporter: {
    canCreateCourse: false,
    canEditCourse: false,
    canDeleteCourse: false,
    canPublishCourse: false,
    canManageUsers: false,
    canManageRoles: false,
    canModerateComments: true,
    canViewReports: true,
  },
  viewer: {
    canCreateCourse: false,
    canEditCourse: false,
    canDeleteCourse: false,
    canPublishCourse: false,
    canManageUsers: false,
    canManageRoles: false,
    canModerateComments: false,
    canViewReports: true,
  },
  user: {
    canCreateCourse: false,
    canEditCourse: false,
    canDeleteCourse: false,
    canPublishCourse: false,
    canManageUsers: false,
    canManageRoles: false,
    canModerateComments: false,
    canViewReports: false,
  },
};

export const useAdminRole = () => {
  const { user, isLoaded } = useUser();
  const [isAdmin, setIsAdmin] = useState(false);
  const [userRole, setUserRole] = useState<AppRole>('user');
  const [permissions, setPermissions] = useState<UserRolePermissions>(rolePermissions.user);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAdminRole = async () => {
      if (!isLoaded) return;
      
      if (!user) {
        setIsAdmin(false);
        setUserRole('user');
        setPermissions(rolePermissions.user);
        setIsLoading(false);
        return;
      }

      try {
        // Check for admin role first
        const { data: isAdminData, error: adminError } = await supabase.rpc('check_is_admin', {
          _user_id: user.id
        });

        if (adminError) {
          console.error('Error checking admin role:', adminError);
        }

        if (isAdminData === true) {
          setIsAdmin(true);
          setUserRole('admin');
          setPermissions(rolePermissions.admin);
        } else {
          // Check for other roles
          const { data: rolesData, error: rolesError } = await supabase
            .from('user_roles')
            .select('role')
            .eq('user_id', user.id)
            .single();

          if (rolesError && rolesError.code !== 'PGRST116') {
            console.error('Error fetching user role:', rolesError);
          }

          if (rolesData) {
            const role = rolesData.role as AppRole;
            setUserRole(role);
            setPermissions(rolePermissions[role] || rolePermissions.user);
            setIsAdmin(role === 'admin');
          } else {
            setIsAdmin(false);
            setUserRole('user');
            setPermissions(rolePermissions.user);
          }
        }
      } catch (err) {
        console.error('Error checking admin role:', err);
        setIsAdmin(false);
        setUserRole('user');
        setPermissions(rolePermissions.user);
      } finally {
        setIsLoading(false);
      }
    };

    checkAdminRole();
  }, [user, isLoaded]);

  return { isAdmin, isLoading, user, userRole, permissions };
};
