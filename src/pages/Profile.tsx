import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { supabase } from "@/integrations/supabase/client";
import { useUserReferrals } from "@/hooks/useReferrals";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { 
  Loader2,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  BookOpen,
  Award,
  Share2,
  Copy,
  Check,
  Edit2,
  Save,
  X
} from "lucide-react";
import { toast } from "sonner";
import { Navbar } from "@/components/Navbar";

interface ProfileData {
  name: string;
  email: string;
  phone: string | null;
  location: string | null;
  age_group: string | null;
  enrolled_course_id: string | null;
  enrolled_course_title?: string;
  created_at: string;
  certificate_earned?: boolean;
  overall_band?: string;
  referral_code: string | null;
}

export default function CandidateProfile() {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();
  const { referralCode, referralCount, generateReferralCode, isLoading: referralsLoading } = useUserReferrals(user?.id);
  
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [copied, setCopied] = useState(false);
  const [editData, setEditData] = useState({
    name: '',
    phone: '',
    location: '',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user?.id) return;

      try {
        // Fetch profile with course info
        const { data: profileData, error } = await supabase
          .from('profiles')
          .select(`
            name,
            email,
            phone,
            location,
            age_group,
            enrolled_course_id,
            created_at,
            referral_code
          `)
          .eq('user_id', user.id)
          .maybeSingle();

        if (error) throw error;

        // Fetch course title if enrolled
        let enrolled_course_title;
        if (profileData?.enrolled_course_id) {
          const { data: course } = await supabase
            .from('courses')
            .select('title')
            .eq('id', profileData.enrolled_course_id)
            .maybeSingle();
          enrolled_course_title = course?.title;
        }

        // Fetch certificate info
        const { data: certData } = await supabase
          .from('certificates')
          .select('overall_band')
          .eq('user_id', user.id)
          .maybeSingle();

        setProfile({
          ...profileData,
          enrolled_course_title,
          certificate_earned: !!certData,
          overall_band: certData?.overall_band,
        } as ProfileData);

        setEditData({
          name: profileData?.name || '',
          phone: profileData?.phone || '',
          location: profileData?.location || '',
        });
      } catch (err) {
        console.error('Error fetching profile:', err);
        toast.error('Failed to load profile');
      } finally {
        setIsLoading(false);
      }
    };

    if (isLoaded) {
      fetchProfile();
    }
  }, [user?.id, isLoaded]);

  const handleSaveProfile = async () => {
    if (!user?.id) return;

    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          name: editData.name,
          phone: editData.phone || null,
          location: editData.location || null,
        })
        .eq('user_id', user.id);

      if (error) throw error;

      setProfile(prev => prev ? {
        ...prev,
        name: editData.name,
        phone: editData.phone,
        location: editData.location,
      } : null);

      setIsEditing(false);
      toast.success('Profile updated successfully');
    } catch (err) {
      console.error('Error updating profile:', err);
      toast.error('Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCopyReferralLink = () => {
    const code = referralCode || profile?.referral_code;
    if (!code) return;

    const link = `${window.location.origin}?ref=${code}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
    toast.success('Referral link copied!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGenerateCode = async () => {
    const code = await generateReferralCode();
    if (code) {
      toast.success('Referral code generated!');
      setProfile(prev => prev ? { ...prev, referral_code: code } : null);
    } else {
      toast.error('Failed to generate code');
    }
  };

  if (!isLoaded || isLoading) {
    return (
      <>
        <Navbar />
        <LoadingSpinner fullScreen />
      </>
    );
  }

  if (!user) {
    navigate('/auth');
    return null;
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background py-8 px-4">
        <div className="container max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">My Profile</h1>
              <p className="text-muted-foreground text-sm">Manage your account and view your progress</p>
            </div>
            {!isEditing ? (
              <Button variant="outline" onClick={() => setIsEditing(true)} className="gap-2">
                <Edit2 className="h-4 w-4" /> Edit
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button variant="ghost" onClick={() => setIsEditing(false)}>
                  <X className="h-4 w-4" />
                </Button>
                <Button onClick={handleSaveProfile} disabled={isSaving} className="gap-2">
                  {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                  Save
                </Button>
              </div>
            )}
          </div>

          {/* Profile Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-muted-foreground">
                    <User className="h-4 w-4" /> Name
                  </Label>
                  {isEditing ? (
                    <Input 
                      value={editData.name}
                      onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                    />
                  ) : (
                    <p className="font-medium">{profile?.name}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="h-4 w-4" /> Email
                  </Label>
                  <p className="font-medium">{profile?.email}</p>
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="h-4 w-4" /> Phone
                  </Label>
                  {isEditing ? (
                    <Input 
                      value={editData.phone}
                      onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                      placeholder="Enter phone number"
                    />
                  ) : (
                    <p className="font-medium">{profile?.phone || 'Not provided'}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" /> Location
                  </Label>
                  {isEditing ? (
                    <Input 
                      value={editData.location}
                      onChange={(e) => setEditData({ ...editData, location: e.target.value })}
                      placeholder="Enter location"
                    />
                  ) : (
                    <p className="font-medium">{profile?.location || 'Not provided'}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" /> Member Since
                  </Label>
                  <p className="font-medium">
                    {profile?.created_at ? new Date(profile.created_at).toLocaleDateString() : '-'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Enrolled Course Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <BookOpen className="h-5 w-5" /> Enrolled Course
              </CardTitle>
            </CardHeader>
            <CardContent>
              {profile?.enrolled_course_title ? (
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{profile.enrolled_course_title}</p>
                    <p className="text-sm text-muted-foreground">Currently enrolled</p>
                  </div>
                  {profile.certificate_earned && (
                    <Badge variant="default" className="gap-1">
                      <Award className="h-3 w-3" />
                      {profile.overall_band}
                    </Badge>
                  )}
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-muted-foreground">No course enrolled yet</p>
                  <Button variant="link" onClick={() => navigate('/')}>
                    Browse Courses
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Referral Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Share2 className="h-5 w-5" /> Referral Program
              </CardTitle>
              <CardDescription>
                Share your referral link and earn rewards when friends enroll
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {referralCode || profile?.referral_code ? (
                <>
                  <div className="space-y-2">
                    <Label>Your Referral Code</Label>
                    <div className="flex gap-2">
                      <Input 
                        value={`${window.location.origin}?ref=${referralCode || profile?.referral_code}`}
                        readOnly
                        className="font-mono text-sm"
                      />
                      <Button variant="outline" onClick={handleCopyReferralLink} className="shrink-0">
                        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 rounded-lg bg-muted/50">
                      <div className="text-2xl font-bold text-primary">{referralCount}</div>
                      <div className="text-sm text-muted-foreground">Successful Referrals</div>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-muted/50">
                      <div className="text-2xl font-bold text-primary">10%</div>
                      <div className="text-sm text-muted-foreground">Discount for Friends</div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-4">
                  <p className="text-muted-foreground mb-4">
                    Generate your referral code to start earning rewards
                  </p>
                  <Button onClick={handleGenerateCode} className="gap-2">
                    <Share2 className="h-4 w-4" /> Generate Referral Code
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
