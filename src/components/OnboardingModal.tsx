import { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, MapPin, Phone, Users } from "lucide-react";
import { toast } from "sonner";

const AGE_GROUPS = [
  { value: "18-24", label: "18-24 years" },
  { value: "25-34", label: "25-34 years" },
  { value: "35-44", label: "35-44 years" },
  { value: "45-54", label: "45-54 years" },
  { value: "55+", label: "55+ years" },
];

export default function OnboardingModal() {
  const { user, isLoaded } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    phone: "",
    location: "",
    ageGroup: "",
  });

  // Check if user needs onboarding (only for first-time users)
  useEffect(() => {
    const checkOnboardingStatus = async () => {
      if (!isLoaded || !user) return;

      const { data: profile } = await supabase
        .from("profiles")
        .select("onboarding_completed")
        .eq("user_id", user.id)
        .maybeSingle();

      // Only show if profile exists and onboarding not completed
      if (profile && profile.onboarding_completed === false) {
        setIsOpen(true);
      }
    };

    checkOnboardingStatus();
  }, [user, isLoaded]);

  const isFormValid = formData.phone && formData.location && formData.ageGroup;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !isFormValid) return;

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          phone: formData.phone,
          location: formData.location,
          age_group: formData.ageGroup,
          onboarding_completed: true,
        })
        .eq("user_id", user.id);

      if (error) throw error;

      toast.success("Profile updated successfully!");
      setIsOpen(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isLoaded || !user) return null;

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-md" onPointerDownOutside={(e) => e.preventDefault()} onEscapeKeyDown={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle className="text-xl">Welcome! Complete your profile</DialogTitle>
          <DialogDescription>
            Please provide your details to get started with your learning journey.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 py-4">
          <div className="space-y-2">
            <Label htmlFor="phone" className="flex items-center gap-2 text-sm">
              <Phone className="h-4 w-4 text-muted-foreground" />
              Phone Number <span className="text-destructive">*</span>
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+91 98765 43210"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location" className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              Location <span className="text-destructive">*</span>
            </Label>
            <Input
              id="location"
              type="text"
              placeholder="City, Country"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="ageGroup" className="flex items-center gap-2 text-sm">
              <Users className="h-4 w-4 text-muted-foreground" />
              Age Group <span className="text-destructive">*</span>
            </Label>
            <Select
              value={formData.ageGroup}
              onValueChange={(value) => setFormData({ ...formData, ageGroup: value })}
              required
            >
              <SelectTrigger id="ageGroup">
                <SelectValue placeholder="Select your age group" />
              </SelectTrigger>
              <SelectContent>
                {AGE_GROUPS.map((group) => (
                  <SelectItem key={group.value} value={group.value}>
                    {group.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" disabled={isSubmitting || !isFormValid} className="w-full mt-6">
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Continue"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
