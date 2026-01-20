import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Coupon {
  id: string;
  code: string;
  discount_type: 'percentage' | 'fixed';
  discount_value: number;
  applicable_courses: string[] | null;
  applies_to_all: boolean;
  minimum_order_value: number;
  expiry_date: string | null;
  usage_limit: number | null;
  usage_count: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CouponFormData {
  code: string;
  discount_type: 'percentage' | 'fixed';
  discount_value: number;
  applicable_courses?: string[] | null;
  applies_to_all: boolean;
  minimum_order_value?: number;
  expiry_date?: string | null;
  usage_limit?: number | null;
  is_active: boolean;
}

// Hook to fetch all coupons (for admin)
export function useAdminCoupons() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchCoupons = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('coupons')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCoupons((data as Coupon[]) || []);
    } catch (err) {
      setError(err as Error);
      console.error('Error fetching coupons:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCoupons();

    // Real-time subscription
    const channel = supabase
      .channel('coupons-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'coupons' }, () => {
        fetchCoupons();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchCoupons]);

  const createCoupon = async (couponData: CouponFormData) => {
    const { data, error } = await supabase
      .from('coupons')
      .insert([couponData])
      .select()
      .single();

    if (error) throw error;
    return data;
  };

  const updateCoupon = async (id: string, couponData: Partial<CouponFormData>) => {
    const { data, error } = await supabase
      .from('coupons')
      .update(couponData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  };

  const deleteCoupon = async (id: string) => {
    const { error } = await supabase
      .from('coupons')
      .delete()
      .eq('id', id);

    if (error) throw error;
  };

  const toggleActive = async (id: string, isActive: boolean) => {
    const { error } = await supabase
      .from('coupons')
      .update({ is_active: isActive })
      .eq('id', id);

    if (error) throw error;
  };

  return { 
    coupons, 
    isLoading, 
    error, 
    refetch: fetchCoupons,
    createCoupon,
    updateCoupon,
    deleteCoupon,
    toggleActive
  };
}

// Hook to validate and apply a coupon code
export function useValidateCoupon() {
  const [isValidating, setIsValidating] = useState(false);
  
  const validateCoupon = async (code: string, courseId: string, orderValue: number): Promise<{
    valid: boolean;
    coupon?: Coupon;
    discountAmount?: number;
    message?: string;
  }> => {
    setIsValidating(true);
    try {
      const { data, error } = await supabase
        .from('coupons')
        .select('*')
        .eq('code', code.toUpperCase())
        .eq('is_active', true)
        .single();

      if (error || !data) {
        return { valid: false, message: 'Invalid coupon code' };
      }

      const coupon = data as Coupon;

      // Check expiry
      if (coupon.expiry_date && new Date(coupon.expiry_date) < new Date()) {
        return { valid: false, message: 'Coupon has expired' };
      }

      // Check usage limit
      if (coupon.usage_limit && coupon.usage_count >= coupon.usage_limit) {
        return { valid: false, message: 'Coupon usage limit reached' };
      }

      // Check minimum order value
      if (coupon.minimum_order_value && orderValue < coupon.minimum_order_value) {
        return { valid: false, message: `Minimum order value of ₹${coupon.minimum_order_value} required` };
      }

      // Check applicable courses
      if (!coupon.applies_to_all && coupon.applicable_courses) {
        if (!coupon.applicable_courses.includes(courseId)) {
          return { valid: false, message: 'Coupon not applicable for this course' };
        }
      }

      // Calculate discount
      let discountAmount: number;
      if (coupon.discount_type === 'percentage') {
        discountAmount = (orderValue * coupon.discount_value) / 100;
      } else {
        discountAmount = coupon.discount_value;
      }

      // Discount cannot exceed order value
      discountAmount = Math.min(discountAmount, orderValue);

      return { valid: true, coupon, discountAmount };
    } catch (err) {
      console.error('Error validating coupon:', err);
      return { valid: false, message: 'Error validating coupon' };
    } finally {
      setIsValidating(false);
    }
  };

  const incrementUsage = async (couponId: string) => {
    // Increment usage count directly
    const { data: coupon } = await supabase
      .from('coupons')
      .select('usage_count')
      .eq('id', couponId)
      .single();
    
    if (coupon) {
      const { error } = await supabase
        .from('coupons')
        .update({ usage_count: (coupon.usage_count || 0) + 1 })
        .eq('id', couponId);
      if (error) console.error('Error incrementing coupon usage:', error);
    }
  };

  return { validateCoupon, incrementUsage, isValidating };
}
