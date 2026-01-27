-- ================================================
-- 2. Create referrals tracking table
-- ================================================
CREATE TABLE IF NOT EXISTS public.referrals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_user_id text NOT NULL,
  referee_user_id text NOT NULL,
  referral_code text NOT NULL,
  course_id uuid REFERENCES public.courses(id),
  discount_applied numeric DEFAULT 0,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'converted', 'expired', 'cancelled')),
  conversion_date timestamp with time zone,
  revenue_generated numeric DEFAULT 0,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;

-- RLS Policies for referrals
CREATE POLICY "Users can view their own referrals"
  ON public.referrals FOR SELECT
  USING (true);

CREATE POLICY "System can insert referrals"
  ON public.referrals FOR INSERT
  WITH CHECK (true);

CREATE POLICY "System can update referrals"
  ON public.referrals FOR UPDATE
  USING (true);

-- Add indexes
CREATE INDEX IF NOT EXISTS idx_referrals_referrer ON public.referrals(referrer_user_id);
CREATE INDEX IF NOT EXISTS idx_referrals_referee ON public.referrals(referee_user_id);
CREATE INDEX IF NOT EXISTS idx_referrals_status ON public.referrals(status);

-- ================================================
-- 3. Create referral_settings table
-- ================================================
CREATE TABLE IF NOT EXISTS public.referral_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  is_enabled boolean DEFAULT true,
  default_discount_percentage numeric DEFAULT 10,
  coupon_id uuid REFERENCES public.coupons(id),
  updated_by text,
  updated_at timestamp with time zone DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.referral_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view referral settings"
  ON public.referral_settings FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage referral settings"
  ON public.referral_settings FOR ALL
  USING (true);

-- Insert default settings
INSERT INTO public.referral_settings (is_enabled, default_discount_percentage)
VALUES (true, 10);

-- ================================================
-- 4. Create audit_logs table
-- ================================================
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id text NOT NULL,
  action text NOT NULL,
  entity_type text NOT NULL,
  entity_id text,
  old_values jsonb,
  new_values jsonb,
  ip_address text,
  user_agent text,
  created_at timestamp with time zone DEFAULT now()
);

ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view audit logs"
  ON public.audit_logs FOR SELECT
  USING (true);

CREATE POLICY "System can insert audit logs"
  ON public.audit_logs FOR INSERT
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_audit_logs_user ON public.audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_entity ON public.audit_logs(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created ON public.audit_logs(created_at DESC);

-- ================================================
-- 5. Helper functions
-- ================================================
CREATE OR REPLACE FUNCTION public.generate_referral_code(_user_id text)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _code text;
  _exists boolean;
BEGIN
  LOOP
    _code := upper(substr(md5(random()::text || clock_timestamp()::text), 1, 8));
    SELECT EXISTS(SELECT 1 FROM profiles WHERE referral_code = _code) INTO _exists;
    EXIT WHEN NOT _exists;
  END LOOP;
  
  UPDATE profiles SET referral_code = _code WHERE user_id = _user_id;
  RETURN _code;
END;
$$;

CREATE OR REPLACE FUNCTION public.soft_delete_candidate(_user_id text, _deleted_by text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE profiles 
  SET deleted_at = now(), deleted_by = _deleted_by
  WHERE user_id = _user_id AND deleted_at IS NULL;
  
  INSERT INTO audit_logs (user_id, action, entity_type, entity_id)
  VALUES (_deleted_by, 'SOFT_DELETE', 'candidate', _user_id);
  
  RETURN true;
END;
$$;

-- Add realtime for referrals
ALTER PUBLICATION supabase_realtime ADD TABLE public.referrals;