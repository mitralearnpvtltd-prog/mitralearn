import { SignIn, SignUp, useUser } from "@clerk/clerk-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { captureUTMParams, persistUTMParams, syncUTMToProfile } from "@/hooks/useUTMTracking";
import { supabase } from "@/integrations/supabase/client";

const Auth = () => {
  const [mode, setMode] = useState<"signIn" | "signUp">("signIn");
  const { user, isSignedIn } = useUser();
  const navigate = useNavigate();

  // Capture UTM params on auth page
  useEffect(() => {
    const params = captureUTMParams();
    persistUTMParams(params);
  }, []);

  // Sync profile and UTM data after sign in/up
  useEffect(() => {
    const syncUserProfile = async () => {
      if (isSignedIn && user) {
        try {
          // Check if profile exists
          const { data: existingProfile } = await supabase
            .from('profiles')
            .select('user_id')
            .eq('user_id', user.id)
            .maybeSingle();

          if (!existingProfile) {
            // Create profile for new user
            await supabase.from('profiles').insert({
              user_id: user.id,
              name: user.fullName || user.firstName || user.emailAddresses?.[0]?.emailAddress || 'User',
              email: user.emailAddresses?.[0]?.emailAddress || '',
              email_verified: user.emailAddresses?.[0]?.verification?.status === 'verified',
            });

            // Create progress record
            await supabase.from('user_progress').insert({
              user_id: user.id,
            });
          }

          // Sync UTM data to profile
          await syncUTMToProfile(user.id);

          // Update last login
          await supabase
            .from('profiles')
            .update({ last_login: new Date().toISOString() })
            .eq('user_id', user.id);

          navigate('/dashboard');
        } catch (error) {
          console.error('Error syncing profile:', error);
          navigate('/dashboard');
        }
      }
    };

    syncUserProfile();
  }, [isSignedIn, user, navigate]);

  return (
    <div className="min-h-screen bg-gradient-hero flex flex-col items-center justify-center p-4">
      <div className="text-center mb-8">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-primary flex items-center justify-center mb-4 shadow-glow">
          <GraduationCap className="w-8 h-8 text-primary-foreground" />
        </div>
        <h1 className="text-2xl font-display font-bold text-foreground">Welcome to Mitra Learn</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Start your tech learning journey today
        </p>
      </div>

      <div className="flex gap-2 mb-6">
        <Button
          variant={mode === "signIn" ? "default" : "outline"}
          onClick={() => setMode("signIn")}
        >
          Login
        </Button>
        <Button
          variant={mode === "signUp" ? "default" : "outline"}
          onClick={() => setMode("signUp")}
        >
          Register
        </Button>
      </div>

      {mode === "signIn" ? (
        <SignIn 
          routing="hash"
          afterSignInUrl="/auth"
          signUpUrl="/auth"
        />
      ) : (
        <SignUp 
          routing="hash"
          afterSignUpUrl="/auth"
          signInUrl="/auth"
        />
      )}
    </div>
  );
};

export default Auth;