import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

interface AdminStats {
  totalUsers: number;
  activeUsers: number;
  totalCertificates: number;
  completionRate: number;
}

interface UserData {
  user_id: string;
  name: string;
  email: string;
  email_verified: boolean;
  course_opted: boolean;
  last_login: string | null;
  registered_at: string;
  completed_days: number[] | null;
  completed_quizzes: Record<string, number> | null;
  final_assessment_score: number | null;
  final_project_submitted: boolean | null;
  certificate_earned: boolean | null;
  certificate_id: string | null;
  cert_id: string | null;
  certificate_status: string | null;
  completion_date: string | null;
  overall_band: string | null;
  completed_modules_count: number;
  device_info: string | null;
}

interface CertificateData {
  id: string;
  certificate_id: string;
  student_name: string;
  user_id: string;
  course_name: string | null;
  completion_date: string;
  overall_band: string;
  status: string | null;
  verified: boolean | null;
  created_at: string;
}

export const useAdminStats = () => {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    try {
      const { data, error } = await supabase.rpc('get_admin_stats');
      
      if (error) throw error;
      
      if (data && data.length > 0) {
        const statsData = data[0];
        setStats({
          totalUsers: Number(statsData.total_users) || 0,
          activeUsers: Number(statsData.active_users) || 0,
          totalCertificates: Number(statsData.total_certificates) || 0,
          completionRate: Math.round(Number(statsData.completion_rate) || 0),
        });
      }
    } catch (err) {
      console.error('Error fetching admin stats:', err);
      setError('Failed to load stats');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();

    // Set up real-time subscription for stats updates
    const channel = supabase
      .channel('admin-stats')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'profiles' }, () => {
        fetchStats();
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'certificates' }, () => {
        fetchStats();
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'user_progress' }, () => {
        fetchStats();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchStats]);

  return { stats, isLoading, error, refetch: fetchStats };
};

export const useAdminUsers = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    try {
      const { data, error } = await supabase.rpc('get_admin_dashboard_data');
      
      if (error) throw error;
      
      setUsers((data as UserData[]) || []);
    } catch (err) {
      console.error('Error fetching users:', err);
      setError('Failed to load users');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();

    // Set up real-time subscription for user updates
    const channel = supabase
      .channel('admin-users')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'profiles' }, () => {
        fetchUsers();
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'user_progress' }, () => {
        fetchUsers();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchUsers]);

  return { users, isLoading, error, refetch: fetchUsers };
};

export const useAdminCertificates = () => {
  const [certificates, setCertificates] = useState<CertificateData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCertificates = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('certificates')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      setCertificates(data || []);
    } catch (err) {
      console.error('Error fetching certificates:', err);
      setError('Failed to load certificates');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCertificates();

    // Set up real-time subscription for certificate updates
    const channel = supabase
      .channel('admin-certificates')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'certificates' }, () => {
        fetchCertificates();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchCertificates]);

  return { certificates, isLoading, error, refetch: fetchCertificates };
};
