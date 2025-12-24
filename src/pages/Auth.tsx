import { SignIn, SignUp } from "@clerk/clerk-react";
import { useState } from "react";
import { GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";

const Auth = () => {
  const [mode, setMode] = useState<"signIn" | "signUp">("signIn");

  return (
    <div className="min-h-screen bg-gradient-hero flex flex-col items-center justify-center p-4">
      <div className="text-center mb-8">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-primary flex items-center justify-center mb-4 shadow-glow">
          <GraduationCap className="w-8 h-8 text-primary-foreground" />
        </div>
        <h1 className="text-2xl font-display font-bold text-foreground">Welcome to Innov Skills</h1>
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
          afterSignInUrl="/dashboard"
          signUpUrl="/auth"
        />
      ) : (
        <SignUp 
          routing="hash"
          afterSignUpUrl="/dashboard"
          signInUrl="/auth"
        />
      )}
    </div>
  );
};

export default Auth;