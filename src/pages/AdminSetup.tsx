import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser, SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, Loader2, CheckCircle2, XCircle } from "lucide-react";
import { toast } from "sonner";

const AdminSetup = () => {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();
  const [isSettingUp, setIsSettingUp] = useState(false);
  const [setupResult, setSetupResult] = useState<'success' | 'exists' | null>(null);

  const handleSetupAdmin = async () => {
    if (!user) return;

    setIsSettingUp(true);
    try {
      const { data, error } = await supabase.rpc('setup_first_admin', {
        _user_id: user.id
      });

      if (error) {
        console.error('Error setting up admin:', error);
        toast.error('Failed to set up admin access');
        return;
      }

      if (data === true) {
        setSetupResult('success');
        toast.success('You are now an admin!');
        // Navigate to admin after a short delay
        setTimeout(() => navigate('/admin'), 1500);
      } else {
        setSetupResult('exists');
        toast.info('An admin already exists. Contact them for access.');
      }
    } catch (err) {
      console.error('Error:', err);
      toast.error('Something went wrong');
    } finally {
      setIsSettingUp(false);
    }
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <ShieldCheck className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl">Admin Setup</CardTitle>
          <CardDescription>
            Set up admin access for your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <SignedOut>
            <p className="text-center text-muted-foreground mb-4">
              Please sign in to continue with admin setup.
            </p>
            <SignInButton mode="modal">
              <Button className="w-full">Sign In</Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            {setupResult === 'success' ? (
              <div className="text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="h-6 w-6 text-success" />
                </div>
                <p className="text-success font-medium">Admin access granted!</p>
                <p className="text-sm text-muted-foreground">Redirecting to admin panel...</p>
              </div>
            ) : setupResult === 'exists' ? (
              <div className="text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-secondary/50 flex items-center justify-center mx-auto">
                  <XCircle className="h-6 w-6 text-muted-foreground" />
                </div>
                <p className="font-medium">Admin already exists</p>
                <p className="text-sm text-muted-foreground">
                  Contact an existing admin to get access.
                </p>
                <Button variant="outline" onClick={() => navigate('/')}>
                  Return to Home
                </Button>
              </div>
            ) : (
              <>
                <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                  <p className="text-sm font-medium">Logged in as:</p>
                  <p className="text-sm text-muted-foreground">{user?.emailAddresses?.[0]?.emailAddress}</p>
                  <p className="text-xs text-muted-foreground">User ID: {user?.id}</p>
                </div>

                <p className="text-sm text-muted-foreground text-center">
                  If no admin exists yet, clicking the button below will make you the first admin.
                </p>

                <Button 
                  className="w-full gap-2" 
                  onClick={handleSetupAdmin}
                  disabled={isSettingUp}
                >
                  {isSettingUp ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Setting up...
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="h-4 w-4" />
                      Become Admin
                    </>
                  )}
                </Button>

                <Button 
                  variant="ghost" 
                  className="w-full" 
                  onClick={() => navigate('/')}
                >
                  Cancel
                </Button>
              </>
            )}
          </SignedIn>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSetup;
