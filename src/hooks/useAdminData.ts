import { useState, useEffect } from "react";
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

  useEffect(() => {
    const fetchStats = async () => {
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
    };

    fetchStats();
  }, []);

  return { stats, isLoading, error };
};

export const useAdminUsers = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
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
    };

    fetchUsers();
  }, []);

  const refetch = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.rpc('get_admin_dashboard_data');
      if (error) throw error;
      setUsers((data as UserData[]) || []);
    } catch (err) {
      console.error('Error refetching users:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return { users, isLoading, error, refetch };
};

export const useAdminCertificates = () => {
  const [certificates, setCertificates] = useState<CertificateData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCertificates = async () => {
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
    };

    fetchCertificates();
  }, []);

  return { certificates, isLoading, error };
};
