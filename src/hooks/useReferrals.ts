import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

type ReferralStatus = 'pending' | 'converted' | 'expired' | 'cancelled';

interface Referral {
  id: string;
  referrer_user_id: string;
  referee_user_id: string;
  referral_code: string;
  course_id: string | null;
  discount_applied: number;
  status: ReferralStatus;
  conversion_date: string | null;
  revenue_generated: number;
  created_at: string;
  updated_at: string;
  referrer_name?: string;
  referrer_email?: string;
  referee_name?: string;
  referee_email?: string;
  course_title?: string;
}

interface ReferralSettings {
  id: string;
  is_enabled: boolean;
  default_discount_percentage: number;
  coupon_id: string | null;
  updated_by: string | null;
  updated_at: string;
}

export const useReferrals = () => {
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReferrals = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('referrals')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Fetch additional data for referrals
      const enrichedReferrals = await Promise.all(
        (data || []).map(async (ref) => {
          // Get referrer info
          const { data: referrer } = await supabase
            .from('profiles')
            .select('name, email')
            .eq('user_id', ref.referrer_user_id)
            .maybeSingle();

          // Get referee info
          const { data: referee } = await supabase
            .from('profiles')
            .select('name, email')
            .eq('user_id', ref.referee_user_id)
            .maybeSingle();

          // Get course info if exists
          let course_title = null;
          if (ref.course_id) {
            const { data: course } = await supabase
              .from('courses')
              .select('title')
              .eq('id', ref.course_id)
              .maybeSingle();
            course_title = course?.title;
          }

          return {
            ...ref,
            status: ref.status as ReferralStatus,
            referrer_name: referrer?.name,
            referrer_email: referrer?.email,
            referee_name: referee?.name,
            referee_email: referee?.email,
            course_title,
          };
        })
      );

      setReferrals(enrichedReferrals);
    } catch (err) {
      console.error('Error fetching referrals:', err);
      setError('Failed to load referrals');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReferrals();

    // Real-time subscription
    const channel = supabase
      .channel('referrals-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'referrals' }, () => {
        fetchReferrals();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchReferrals]);

  return { referrals, isLoading, error, refetch: fetchReferrals };
};

export const useReferralSettings = () => {
  const [settings, setSettings] = useState<ReferralSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSettings = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('referral_settings')
        .select('*')
        .limit(1)
        .maybeSingle();

      if (error) throw error;
      setSettings(data);
    } catch (err) {
      console.error('Error fetching referral settings:', err);
      setError('Failed to load referral settings');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateSettings = async (updates: Partial<ReferralSettings>) => {
    if (!settings?.id) return false;

    try {
      const { error } = await supabase
        .from('referral_settings')
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq('id', settings.id);

      if (error) throw error;
      await fetchSettings();
      return true;
    } catch (err) {
      console.error('Error updating settings:', err);
      return false;
    }
  };

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  return { settings, isLoading, error, updateSettings, refetch: fetchSettings };
};

export const useUserReferrals = (userId: string | undefined) => {
  const [referralCode, setReferralCode] = useState<string | null>(null);
  const [referralCount, setReferralCount] = useState(0);
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const generateReferralCode = async () => {
    if (!userId) return null;

    try {
      const { data, error } = await supabase.rpc('generate_referral_code', {
        _user_id: userId,
      });

      if (error) throw error;
      setReferralCode(data);
      return data;
    } catch (err) {
      console.error('Error generating referral code:', err);
      return null;
    }
  };

  const fetchUserReferrals = useCallback(async () => {
    if (!userId) {
      setIsLoading(false);
      return;
    }

    try {
      // Get user's referral code
      const { data: profile } = await supabase
        .from('profiles')
        .select('referral_code')
        .eq('user_id', userId)
        .maybeSingle();

      setReferralCode(profile?.referral_code || null);

      // Get referrals made by this user
      const { data: refs } = await supabase
        .from('referrals')
        .select('*')
        .eq('referrer_user_id', userId)
        .order('created_at', { ascending: false });

      const typedRefs = (refs || []).map(r => ({
        ...r,
        status: r.status as ReferralStatus,
      }));
      setReferrals(typedRefs);
      setReferralCount(typedRefs.filter(r => r.status === 'converted').length);
    } catch (err) {
      console.error('Error fetching user referrals:', err);
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchUserReferrals();
  }, [fetchUserReferrals]);

  return {
    referralCode,
    referralCount,
    referrals,
    isLoading,
    generateReferralCode,
    refetch: fetchUserReferrals,
  };
};
