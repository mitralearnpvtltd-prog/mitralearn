import { useEffect, useRef } from "react";
import { useUser } from "@clerk/clerk-react";
import { supabase } from "@/integrations/supabase/client";
import { captureUTMParams, persistUTMParams, syncUTMToProfile } from "@/hooks/useUTMTracking";

/**
 * Global component that syncs Clerk user data to Supabase profiles.
 * Ensures profile is created/updated regardless of sign-in method (modal or /auth page).
 */
const ClerkProfileSync = () => {
  const { user, isSignedIn } = useUser();
  const hasSynced = useRef(false);

  useEffect(() => {
    if (!isSignedIn || !user || hasSynced.current) return;

    const syncProfile = async () => {
      try {
        hasSynced.current = true;

        // Check if profile exists
        const { data: existingProfile } = await supabase
          .from("profiles")
          .select("user_id")
          .eq("user_id", user.id)
          .maybeSingle();

        if (!existingProfile) {
          // Create profile for new user
          await supabase.from("profiles").insert({
            user_id: user.id,
            name:
              user.fullName ||
              user.firstName ||
              user.emailAddresses?.[0]?.emailAddress ||
              "User",
            email: user.emailAddresses?.[0]?.emailAddress || "",
            email_verified:
              user.emailAddresses?.[0]?.verification?.status === "verified",
          });

          // Create progress record
          await supabase.from("user_progress").insert({
            user_id: user.id,
          });
        }

        // Sync UTM data
        const params = captureUTMParams();
        persistUTMParams(params);
        await syncUTMToProfile(user.id);

        // Update last login
        await supabase
          .from("profiles")
          .update({ last_login: new Date().toISOString() })
          .eq("user_id", user.id);
      } catch (error) {
        console.error("Error syncing Clerk profile to database:", error);
      }
    };

    syncProfile();
  }, [isSignedIn, user]);

  return null;
};

export default ClerkProfileSync;
