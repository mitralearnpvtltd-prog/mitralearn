import loadingVideo from "@/assets/loading-animation.webm";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  fullScreen?: boolean;
  className?: string;
}

export const LoadingSpinner = ({ size = "md", fullScreen = false, className = "" }: LoadingSpinnerProps) => {
  const sizeMap = {
    sm: "w-8 h-8",
    md: "w-16 h-16",
    lg: "w-24 h-24",
  };

  const spinner = (
    <video
      src={loadingVideo}
      autoPlay
      loop
      muted
      playsInline
      className={`${sizeMap[size]} rounded-full object-cover ${className}`}
    />
  );

  if (fullScreen) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        {spinner}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center">
      {spinner}
    </div>
  );
};
