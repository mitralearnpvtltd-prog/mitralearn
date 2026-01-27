import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface UTMParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  referral_code?: string;
}

const UTM_STORAGE_KEY = 'innovskills_utm_params';
const LANDING_PAGE_KEY = 'innovskills_first_landing';

export const captureUTMParams = (): UTMParams => {
  if (typeof window === 'undefined') return {};

  const params = new URLSearchParams(window.location.search);
  const utmParams: UTMParams = {};

  // Capture UTM parameters
  const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'] as const;
  utmKeys.forEach((key) => {
    const value = params.get(key);
    if (value) {
      utmParams[key] = value;
    }
  });

  // Capture referral code
  const refCode = params.get('ref') || params.get('referral');
  if (refCode) {
    utmParams.referral_code = refCode;
  }

  return utmParams;
};

export const persistUTMParams = (params: UTMParams) => {
  if (Object.keys(params).length > 0) {
    // Only persist if we don't already have UTM params stored
    const existing = localStorage.getItem(UTM_STORAGE_KEY);
    if (!existing) {
      localStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(params));
    }
  }

  // Always capture first landing page
  if (!sessionStorage.getItem(LANDING_PAGE_KEY)) {
    sessionStorage.setItem(LANDING_PAGE_KEY, window.location.pathname + window.location.search);
  }
};

export const getStoredUTMParams = (): UTMParams => {
  try {
    const stored = localStorage.getItem(UTM_STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
};

export const getFirstLandingPage = (): string => {
  return sessionStorage.getItem(LANDING_PAGE_KEY) || '/';
};

export const clearUTMParams = () => {
  localStorage.removeItem(UTM_STORAGE_KEY);
};

export const getRegistrationSource = (): string => {
  const params = getStoredUTMParams();
  
  if (params.referral_code) return 'referral';
  if (params.utm_source) return params.utm_source;
  
  // Check document referrer
  if (typeof document !== 'undefined' && document.referrer) {
    try {
      const referrerUrl = new URL(document.referrer);
      const host = referrerUrl.hostname.toLowerCase();
      
      if (host.includes('google')) return 'google';
      if (host.includes('facebook') || host.includes('fb.')) return 'facebook';
      if (host.includes('instagram')) return 'instagram';
      if (host.includes('linkedin')) return 'linkedin';
      if (host.includes('twitter') || host.includes('x.com')) return 'twitter';
      if (host.includes('youtube')) return 'youtube';
      
      return referrerUrl.hostname;
    } catch {
      return 'direct';
    }
  }
  
  return 'direct';
};

export const syncUTMToProfile = async (userId: string) => {
  const params = getStoredUTMParams();
  const firstLandingPage = getFirstLandingPage();
  const registrationSource = getRegistrationSource();

  try {
    const updateData: Record<string, string | null> = {
      registration_source: registrationSource,
      first_landing_page: firstLandingPage,
    };

    if (params.utm_source) updateData.utm_source = params.utm_source;
    if (params.utm_medium) updateData.utm_medium = params.utm_medium;
    if (params.utm_campaign) updateData.utm_campaign = params.utm_campaign;
    if (params.utm_term) updateData.utm_term = params.utm_term;
    if (params.utm_content) updateData.utm_content = params.utm_content;
    if (params.referral_code) updateData.referred_by = params.referral_code;

    const { error } = await supabase
      .from('profiles')
      .update(updateData)
      .eq('user_id', userId);

    if (error) {
      console.error('Error syncing UTM params:', error);
    }
  } catch (err) {
    console.error('Error syncing UTM to profile:', err);
  }
};

export const useUTMTracking = () => {
  useEffect(() => {
    // Capture and persist UTM params on every page load
    const params = captureUTMParams();
    persistUTMParams(params);
  }, []);

  return {
    getStoredUTMParams,
    getFirstLandingPage,
    getRegistrationSource,
    clearUTMParams,
    syncUTMToProfile,
  };
};
