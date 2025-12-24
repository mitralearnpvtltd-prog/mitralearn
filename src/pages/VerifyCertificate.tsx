import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/Navbar";
import { supabase } from "@/integrations/supabase/client";
import { Search, CheckCircle, XCircle, Award, Calendar, Trophy, Shield } from "lucide-react";

interface CertificateData {
  certificate_id: string;
  student_name: string;
  completion_date: string;
  final_mcq_score: number;
  coding_challenge_score: number;
  capstone_submitted: boolean;
  overall_band: string;
  verified: boolean;
}

const VerifyCertificate = () => {
  const { certificateId: urlCertId } = useParams<{ certificateId: string }>();
  const [certificateId, setCertificateId] = useState(urlCertId || "");
  const [isSearching, setIsSearching] = useState(false);
  const [certificate, setCertificate] = useState<CertificateData | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (urlCertId) {
      setCertificateId(urlCertId);
      searchCertificate(urlCertId);
    }
  }, [urlCertId]);

  const searchCertificate = async (certId: string) => {
    setIsSearching(true);
    setNotFound(false);
    setCertificate(null);
    setHasSearched(true);

    const { data, error } = await supabase.rpc("verify_certificate", {
      cert_id: certId.trim().toUpperCase(),
    });

    if (error) {
      console.error("Error searching certificate:", error);
      setNotFound(true);
    } else if (data && data.length > 0) {
      setCertificate(data[0]);
    } else {
      setNotFound(true);
    }

    setIsSearching(false);
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    await searchCertificate(certificateId);
  };

  const getBandColor = (band: string) => {
    switch (band) {
      case "Job-Ready":
        return "bg-green-500";
      case "Intermediate":
        return "bg-blue-500";
      default:
        return "bg-amber-500";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-primary flex items-center justify-center mb-4 shadow-glow">
              <Shield className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-display font-bold text-foreground mb-2">
              Certificate Verification
            </h1>
            <p className="text-muted-foreground">
              Verify the authenticity of Skill Mitra certificates
            </p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Enter Certificate ID</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSearch} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cert-id">Certificate ID</Label>
                  <Input
                    id="cert-id"
                    type="text"
                    placeholder="SM-XXXXXXX-XXXX"
                    value={certificateId}
                    onChange={(e) => setCertificateId(e.target.value)}
                    required
                    className="text-center text-lg tracking-wider"
                  />
                </div>
                <Button type="submit" className="w-full gap-2" disabled={isSearching}>
                  {isSearching ? "Verifying..." : "Verify Certificate"}
                  <Search className="w-4 h-4" />
                </Button>
              </form>
            </CardContent>
          </Card>

          {notFound && hasSearched && (
            <Card className="border-destructive/50 bg-destructive/10">
              <CardContent className="py-8 text-center">
                <XCircle className="w-16 h-16 mx-auto text-destructive mb-4" />
                <h3 className="text-xl font-semibold text-destructive mb-2">
                  Certificate Not Found
                </h3>
                <p className="text-muted-foreground">
                  The certificate ID you entered does not exist in our records. Please
                  check the ID and try again.
                </p>
              </CardContent>
            </Card>
          )}

          {certificate && (
            <Card className="border-green-500/50 bg-green-500/10">
              <CardContent className="py-8">
                <div className="text-center mb-6">
                  <CheckCircle className="w-16 h-16 mx-auto text-green-500 mb-4" />
                  <h3 className="text-xl font-semibold text-green-600 mb-2">
                    Certificate Verified ✓
                  </h3>
                  <p className="text-muted-foreground">
                    This is an authentic Skill Mitra certificate
                  </p>
                </div>

                <div className="space-y-4 mt-8">
                  <div className="flex items-center justify-between p-4 bg-background rounded-lg">
                    <div className="flex items-center gap-3">
                      <Award className="w-5 h-5 text-primary" />
                      <span className="text-muted-foreground">Student Name</span>
                    </div>
                    <span className="font-semibold">{certificate.student_name}</span>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-background rounded-lg">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-primary" />
                      <span className="text-muted-foreground">Completion Date</span>
                    </div>
                    <span className="font-semibold">
                      {new Date(certificate.completion_date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-background rounded-lg">
                    <div className="flex items-center gap-3">
                      <Trophy className="w-5 h-5 text-primary" />
                      <span className="text-muted-foreground">Overall Band</span>
                    </div>
                    <Badge className={getBandColor(certificate.overall_band)}>
                      {certificate.overall_band}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="p-4 bg-background rounded-lg text-center">
                      <p className="text-2xl font-bold text-primary">
                        {certificate.final_mcq_score}%
                      </p>
                      <p className="text-sm text-muted-foreground">Final MCQ Score</p>
                    </div>
                    <div className="p-4 bg-background rounded-lg text-center">
                      <p className="text-2xl font-bold text-primary">
                        {certificate.coding_challenge_score}
                      </p>
                      <p className="text-sm text-muted-foreground">Coding Challenges</p>
                    </div>
                  </div>

                  {certificate.verified && (
                    <div className="flex items-center justify-center gap-2 mt-6 pt-4 border-t text-green-600">
                      <Shield className="w-5 h-5" />
                      <span className="font-medium">Officially Verified</span>
                    </div>
                  )}

                  <div className="text-center text-xs text-muted-foreground mt-4">
                    Certificate ID:{" "}
                    <span className="font-mono">{certificate.certificate_id}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default VerifyCertificate;
