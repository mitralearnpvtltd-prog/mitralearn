import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useProgress } from "@/contexts/ProgressContext";
import { Github, Video, CheckCircle2, ExternalLink, Rocket } from "lucide-react";
import { toast } from "sonner";

interface ProjectSubmissionProps {
  submoduleId: string;
  onComplete?: () => void;
}

export const ProjectSubmission = ({ submoduleId, onComplete }: ProjectSubmissionProps) => {
  const { progress, submitFinalProject, completeSubmodule } = useProgress();
  const [githubLink, setGithubLink] = useState(progress.projectGithubLink || "");
  const [videoLink, setVideoLink] = useState(progress.projectVideoLink || "");
  const [errors, setErrors] = useState<{ github?: string; video?: string }>({});

  const isSubmitted = progress.finalProjectSubmitted;

  const validateGithubUrl = (url: string): boolean => {
    if (!url.trim()) return false;
    const githubPattern = /^https?:\/\/(www\.)?github\.com\/[\w-]+\/[\w.-]+\/?.*$/i;
    return githubPattern.test(url.trim());
  };

  const validateVideoUrl = (url: string): boolean => {
    if (!url.trim()) return false;
    const videoPatterns = [
      /^https?:\/\/(www\.)?(youtube\.com|youtu\.be)\/.+$/i,
      /^https?:\/\/(www\.)?vimeo\.com\/.+$/i,
      /^https?:\/\/(www\.)?loom\.com\/.+$/i,
      /^https?:\/\/drive\.google\.com\/.+$/i,
      /^https?:\/\/.+\.(mp4|mov|avi|webm)(\?.*)?$/i,
    ];
    return videoPatterns.some(pattern => pattern.test(url.trim()));
  };

  const handleSubmit = () => {
    const newErrors: { github?: string; video?: string } = {};

    if (!validateGithubUrl(githubLink)) {
      newErrors.github = "Please enter a valid GitHub repository URL";
    }

    if (!validateVideoUrl(videoLink)) {
      newErrors.video = "Please enter a valid video URL (YouTube, Vimeo, Loom, or direct video link)";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      submitFinalProject(githubLink.trim(), videoLink.trim());
      completeSubmodule(submoduleId);
      toast.success("Project submitted successfully! 🎉");
      onComplete?.();
    }
  };

  if (isSubmitted) {
    return (
      <Card className="border-success/50 bg-success/5">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-success/20 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-success" />
            </div>
            <div>
              <CardTitle className="text-success">Project Submitted!</CardTitle>
              <p className="text-sm text-muted-foreground">
                Your capstone project has been submitted successfully.
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2 p-3 bg-background rounded-lg border">
              <Github className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm font-medium">GitHub Repository:</span>
              <a 
                href={progress.projectGithubLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline flex items-center gap-1 ml-auto"
              >
                View Repository
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <div className="flex items-center gap-2 p-3 bg-background rounded-lg border">
              <Video className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm font-medium">Demo Video:</span>
              <a 
                href={progress.projectVideoLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline flex items-center gap-1 ml-auto"
              >
                Watch Video
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <Rocket className="w-6 h-6 text-primary" />
          </div>
          <div>
            <CardTitle>Submit Your Project</CardTitle>
            <p className="text-sm text-muted-foreground">
              Share your GitHub repository and a demo video of your project.
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="github-link" className="flex items-center gap-2">
            <Github className="w-4 h-4" />
            GitHub Repository URL
          </Label>
          <Input
            id="github-link"
            type="url"
            placeholder="https://github.com/username/project-name"
            value={githubLink}
            onChange={(e) => {
              setGithubLink(e.target.value);
              if (errors.github) setErrors(prev => ({ ...prev, github: undefined }));
            }}
            className={errors.github ? "border-destructive" : ""}
          />
          {errors.github && (
            <p className="text-sm text-destructive">{errors.github}</p>
          )}
          <p className="text-xs text-muted-foreground">
            Link to your project's GitHub repository (e.g., https://github.com/username/data-pipeline)
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="video-link" className="flex items-center gap-2">
            <Video className="w-4 h-4" />
            Demo Video URL
          </Label>
          <Input
            id="video-link"
            type="url"
            placeholder="https://youtube.com/watch?v=..."
            value={videoLink}
            onChange={(e) => {
              setVideoLink(e.target.value);
              if (errors.video) setErrors(prev => ({ ...prev, video: undefined }));
            }}
            className={errors.video ? "border-destructive" : ""}
          />
          {errors.video && (
            <p className="text-sm text-destructive">{errors.video}</p>
          )}
          <p className="text-xs text-muted-foreground">
            Link to your project demo video (YouTube, Vimeo, Loom, or Google Drive)
          </p>
        </div>

        <Button onClick={handleSubmit} className="w-full gap-2" size="lg">
          <Rocket className="w-4 h-4" />
          Submit Project
        </Button>
      </CardContent>
    </Card>
  );
};
