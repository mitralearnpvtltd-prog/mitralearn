import { useState } from "react";
import { useProgress } from "@/contexts/ProgressContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { getTotalSubmodules, getTotalModules } from "@/data/curriculum";
import {
  Award,
  Download,
  Share2,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Shield,
} from "lucide-react";
import certificateBadge from "@/assets/certificate-badge.png";
import { CertificateVerification } from "@/components/CertificateVerification";

export const CertificateSystem = () => {
  const {
    progress,
    user,
    isEligibleForCertificate,
    generateCertificate,
  } = useProgress();

  const totalSubmodules = getTotalSubmodules();
  const totalModules = getTotalModules();

  const requirements = [
    {
      label: "Complete all submodules",
      completed: progress.completedSubmodules.length >= totalSubmodules,
      current: progress.completedSubmodules.length,
      total: totalSubmodules,
    },
    {
      label: "Pass all quizzes",
      completed: Object.keys(progress.completedQuizzes).length >= totalSubmodules,
      current: Object.keys(progress.completedQuizzes).length,
      total: totalSubmodules,
    },
    {
      label: "Complete all module assessments",
      completed: progress.completedModuleAssessments.length >= totalModules,
      current: progress.completedModuleAssessments.length,
      total: totalModules,
    },
    {
      label: "Pass final assessment (≥60%)",
      completed: (progress.finalAssessmentScore || 0) >= 60,
      current: progress.finalAssessmentScore || 0,
      total: 100,
      suffix: "%",
    },
    {
      label: "Submit final project",
      completed: progress.finalProjectSubmitted,
      current: progress.finalProjectSubmitted ? 1 : 0,
      total: 1,
    },
  ];

  const completedRequirements = requirements.filter((r) => r.completed).length;
  const canEarnCertificate = isEligibleForCertificate();

  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateCertificate = async () => {
    if (canEarnCertificate) {
      setIsGenerating(true);
      try {
        const certId = await generateCertificate();
        toast.success("Certificate generated successfully!");
        console.log("Certificate generated:", certId);
      } catch (error) {
        toast.error("Failed to generate certificate. Please try again.");
        console.error("Error generating certificate:", error);
      } finally {
        setIsGenerating(false);
      }
    }
  };

  const getPerformanceBand = () => {
    const avgQuizScore =
      Object.values(progress.completedQuizzes).reduce((a, b) => a + b, 0) /
      Math.max(Object.keys(progress.completedQuizzes).length, 1);
    
    if (avgQuizScore >= 90) return "Job-Ready";
    if (avgQuizScore >= 75) return "Intermediate";
    return "Beginner";
  };

  const [activeTab, setActiveTab] = useState("certificate");

  return (
    <div className="space-y-6">
      {/* Tabs for Certificate and Verification */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
          <TabsTrigger value="certificate" className="gap-2">
            <Award className="w-4 h-4" />
            My Certificate
          </TabsTrigger>
          <TabsTrigger value="verify" className="gap-2">
            <Shield className="w-4 h-4" />
            Verify
          </TabsTrigger>
        </TabsList>

        {/* Certificate Tab */}
        <TabsContent value="certificate" className="mt-4 sm:mt-6">
          <div className="space-y-6 sm:space-y-8">
            {/* Header */}
            <div className="text-center px-2">
              <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-3 sm:mb-4 rounded-full bg-gradient-primary flex items-center justify-center shadow-glow animate-pulse-glow">
                <Award className="w-10 h-10 sm:w-12 sm:h-12 text-primary-foreground" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-display font-bold mb-2">
                Mitra Learn Certification
              </h1>
              <p className="text-muted-foreground max-w-xl mx-auto text-sm sm:text-base">
                Complete all requirements to earn your Data Scientist certification
                and showcase your skills to employers.
              </p>
            </div>

            {/* Requirements Progress */}
            <Card>
              <CardHeader className="px-4 sm:px-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <CardTitle className="text-base sm:text-lg">Certification Requirements</CardTitle>
                  <Badge variant={canEarnCertificate ? "default" : "secondary"} className="w-fit">
                    {completedRequirements}/{requirements.length} Complete
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="px-4 sm:px-6">
                <div className="space-y-3 sm:space-y-4">
                  {requirements.map((req, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between p-3 sm:p-4 rounded-lg border gap-2 ${
                        req.completed
                          ? "border-success/30 bg-success/5"
                          : "border-border bg-card"
                      }`}
                    >
                      <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                        {req.completed ? (
                          <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-success flex-shrink-0" />
                        ) : (
                          <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground flex-shrink-0" />
                        )}
                        <span className={`text-sm sm:text-base truncate ${req.completed ? "text-foreground" : "text-muted-foreground"}`}>
                          {req.label}
                        </span>
                      </div>
                      <Badge variant={req.completed ? "default" : "outline"} className="flex-shrink-0 text-xs">
                        {req.current}/{req.total}{req.suffix || ""}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Certificate Preview or Generation */}
            {progress.certificateEarned ? (
              <Card className="bg-gradient-hero text-primary-foreground overflow-hidden">
                <CardContent className="p-4 sm:p-8">
                  <div className="text-center space-y-4 sm:space-y-6">
                    {/* Certificate Design */}
                    <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-8 border border-primary-foreground/20 relative">
                      <div className="absolute top-2 right-2 sm:top-4 sm:right-4 opacity-20">
                        <img src={certificateBadge} alt="Badge" className="w-12 h-12 sm:w-20 sm:h-20" />
                      </div>
                      
                      <p className="text-primary-foreground/60 text-xs sm:text-sm uppercase tracking-widest mb-2">
                        Certificate of Completion
                      </p>
                      <h2 className="text-xl sm:text-3xl font-display font-bold mb-1">
                        Silk Miltra
                      </h2>
                      <p className="text-primary-foreground/80 mb-4 sm:mb-6 text-sm sm:text-base">
                        Data Scientist – 60 Day Internship-Prep Program
                      </p>
                      
                      <div className="text-base sm:text-xl font-medium mb-4 sm:mb-6">
                        This certifies that
                      </div>
                      <div className="text-xl sm:text-3xl font-display font-bold mb-4 sm:mb-6">
                        {user?.name || "Student Name"}
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 sm:gap-4 text-xs sm:text-sm mb-4 sm:mb-6">
                        <div className="p-2 sm:p-3 rounded-lg bg-primary-foreground/10">
                          <p className="text-primary-foreground/60">Certificate ID</p>
                          <p className="font-mono font-medium text-xs sm:text-sm truncate">{progress.certificateId}</p>
                        </div>
                        <div className="p-2 sm:p-3 rounded-lg bg-primary-foreground/10">
                          <p className="text-primary-foreground/60">Completion Date</p>
                          <p className="font-medium">{new Date().toLocaleDateString()}</p>
                        </div>
                        <div className="p-2 sm:p-3 rounded-lg bg-primary-foreground/10">
                          <p className="text-primary-foreground/60">Final Score</p>
                          <p className="font-medium">{progress.finalAssessmentScore}%</p>
                        </div>
                        <div className="p-2 sm:p-3 rounded-lg bg-primary-foreground/10">
                          <p className="text-primary-foreground/60">Performance</p>
                          <p className="font-medium">{getPerformanceBand()}</p>
                        </div>
                      </div>

                      <div className="border-t border-primary-foreground/20 pt-3 sm:pt-4 text-xs sm:text-sm text-primary-foreground/60">
                        Silk Miltra Certification Council – Innovkaro
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
                      <Button variant="heroOutline" className="gap-2 min-h-[48px]">
                        <Download className="w-4 h-4" />
                        Download PDF
                      </Button>
                      <Button variant="heroOutline" className="gap-2 min-h-[48px]">
                        <Share2 className="w-4 h-4" />
                        Share on LinkedIn
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-2 border-dashed border-muted">
                <CardContent className="p-4 sm:p-8 text-center">
                  <AlertCircle className="w-10 h-10 sm:w-12 sm:h-12 text-muted-foreground mx-auto mb-3 sm:mb-4" />
                  <h3 className="text-lg sm:text-xl font-display font-bold mb-2">
                    Certificate Not Yet Earned
                  </h3>
                  <p className="text-muted-foreground mb-4 sm:mb-6 max-w-md mx-auto text-sm sm:text-base">
                    Complete all the requirements above to unlock your Silk Miltra
                    Data Scientist certification.
                  </p>
                  <Button
                    onClick={handleGenerateCertificate}
                    disabled={!canEarnCertificate || isGenerating}
                    size="lg"
                    className="gap-2 min-h-[48px] w-full sm:w-auto"
                  >
                    <Award className="w-5 h-5" />
                    {isGenerating
                      ? "Generating..."
                      : canEarnCertificate
                      ? "Generate Certificate"
                      : `${completedRequirements}/${requirements.length} Requirements Met`}
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Badge Preview */}
            <Card>
              <CardHeader className="px-4 sm:px-6">
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <Award className="w-4 h-4 sm:w-5 sm:h-5 text-secondary" />
                  Your Achievement Badge
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 sm:px-6">
                <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
                  <img
                    src={certificateBadge}
                    alt="Certified Data Scientist Badge"
                    className={`w-24 h-24 sm:w-32 sm:h-32 ${!progress.certificateEarned && "opacity-30 grayscale"}`}
                  />
                  <div className="flex-1 text-center sm:text-left">
                    <h4 className="font-display font-bold mb-2 text-sm sm:text-base">
                      Certified Data Scientist – Silk Miltra
                    </h4>
                    <p className="text-muted-foreground text-xs sm:text-sm mb-4">
                      This badge certifies that the holder has successfully completed the
                      60-day Data Scientist Internship-Prep Program with demonstrated
                      proficiency in Python, data analysis, machine learning, and deep learning.
                    </p>
                    {progress.certificateEarned && (
                      <div className="p-2 sm:p-3 rounded-lg bg-muted text-xs sm:text-sm font-mono overflow-x-auto">
                        <code className="break-all">{`<img src="https://silkmiltra.com/badges/${progress.certificateId}" alt="Silk Miltra Certified" />`}</code>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Verification Tab */}
        <TabsContent value="verify" className="mt-6">
          <CertificateVerification />
        </TabsContent>
      </Tabs>
    </div>
  );
};
