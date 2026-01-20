import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
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

export const CertificateVerification = () => {
  const [certificateId, setCertificateId] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [certificate, setCertificate] = useState<CertificateData | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

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
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-primary flex items-center justify-center mb-4 shadow-glow">
          <Shield className="w-8 h-8 text-primary-foreground" />
        </div>
        <h2 className="text-2xl font-display font-bold text-foreground mb-2">
          Verify a Certificate
        </h2>
        <p className="text-muted-foreground">
          Enter a certificate ID to verify its authenticity
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Enter Certificate ID</CardTitle>
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
            <XCircle className="w-12 h-12 mx-auto text-destructive mb-4" />
            <h3 className="text-lg font-semibold text-destructive mb-2">
              Certificate Not Found
            </h3>
            <p className="text-muted-foreground text-sm">
              The certificate ID you entered does not exist in our records.
            </p>
          </CardContent>
        </Card>
      )}

      {certificate && (
        <Card className="border-green-500/50 bg-green-500/10">
          <CardContent className="py-6">
            <div className="text-center mb-6">
              <CheckCircle className="w-12 h-12 mx-auto text-green-500 mb-3" />
              <h3 className="text-lg font-semibold text-green-600 mb-1">
                Certificate Verified ✓
              </h3>
              <p className="text-muted-foreground text-sm">
                This is an authentic Skill Mitra certificate
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-background rounded-lg">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-primary" />
                  <span className="text-muted-foreground text-sm">Student Name</span>
                </div>
                <span className="font-semibold text-sm">{certificate.student_name}</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-background rounded-lg">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span className="text-muted-foreground text-sm">Completion Date</span>
                </div>
                <span className="font-semibold text-sm">
                  {new Date(certificate.completion_date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-background rounded-lg">
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-primary" />
                  <span className="text-muted-foreground text-sm">Overall Band</span>
                </div>
                <Badge className={getBandColor(certificate.overall_band)}>
                  {certificate.overall_band}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-4">
                <div className="p-3 bg-background rounded-lg text-center">
                  <p className="text-xl font-bold text-primary">
                    {certificate.final_mcq_score}%
                  </p>
                  <p className="text-xs text-muted-foreground">Final MCQ Score</p>
                </div>
                <div className="p-3 bg-background rounded-lg text-center">
                  <p className="text-xl font-bold text-primary">
                    {certificate.coding_challenge_score}
                  </p>
                  <p className="text-xs text-muted-foreground">Coding Challenges</p>
                </div>
              </div>

              {certificate.verified && (
                <div className="flex items-center justify-center gap-2 mt-4 pt-3 border-t text-green-600">
                  <Shield className="w-4 h-4" />
                  <span className="font-medium text-sm">Officially Verified</span>
                </div>
              )}

              <div className="text-center text-xs text-muted-foreground mt-3">
                Certificate ID:{" "}
                <span className="font-mono">{certificate.certificate_id}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};