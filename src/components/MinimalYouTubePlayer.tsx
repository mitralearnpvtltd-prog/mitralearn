import { useState, useEffect, useRef, useCallback } from "react";
import { Play, Pause } from "lucide-react";

interface MinimalYouTubePlayerProps {
  videoId: string;
  title?: string;
}

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export const MinimalYouTubePlayer = ({ videoId, title }: MinimalYouTubePlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const playerContainerId = useRef(`yt-player-${videoId}-${Math.random().toString(36).substr(2, 9)}`);
  const hideControlsTimeout = useRef<NodeJS.Timeout>();

  // Load YouTube IFrame API
  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    }

    const initPlayer = () => {
      if (window.YT && window.YT.Player) {
        playerRef.current = new window.YT.Player(playerContainerId.current, {
          videoId,
          playerVars: {
            controls: 0,
            modestbranding: 1,
            rel: 0,
            fs: 0,
            iv_load_policy: 3,
            disablekb: 1,
            showinfo: 0,
            cc_load_policy: 0,
            playsinline: 1,
            origin: window.location.origin,
          },
          events: {
            onReady: (event: any) => {
              event.target.setVolume(70);
              setIsReady(true);
            },
            onStateChange: (event: any) => {
              setIsPlaying(event.data === window.YT.PlayerState.PLAYING);
            },
          },
        });
      }
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      window.onYouTubeIframeAPIReady = initPlayer;
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, [videoId]);

  const togglePlay = useCallback(() => {
    if (!playerRef.current || !isReady) return;

    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  }, [isPlaying, isReady]);

  const handleMouseMove = () => {
    setShowControls(true);
    if (hideControlsTimeout.current) {
      clearTimeout(hideControlsTimeout.current);
    }
    if (isPlaying) {
      hideControlsTimeout.current = setTimeout(() => {
        setShowControls(false);
      }, 2500);
    }
  };

  const handleMouseLeave = () => {
    if (isPlaying) {
      setShowControls(false);
    }
  };

  useEffect(() => {
    if (!isPlaying) {
      setShowControls(true);
    }
  }, [isPlaying]);

  return (
    <div
      ref={containerRef}
      className="relative w-full rounded-xl overflow-hidden bg-muted cursor-pointer group"
      style={{ height: "480px" }}
      onClick={togglePlay}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* YouTube Player Container */}
      <div
        id={playerContainerId.current}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* Overlay to block YouTube interactions */}
      <div className="absolute inset-0 z-10" />

      {/* Custom Play/Pause Button */}
      <div
        className={`absolute inset-0 z-20 flex items-center justify-center transition-opacity duration-300 ${
          showControls || !isPlaying ? "opacity-100" : "opacity-0"
        }`}
      >
        <button
          className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-200 ${
            isPlaying
              ? "bg-background/80 hover:bg-background/90"
              : "bg-primary hover:bg-primary/90"
          } shadow-lg backdrop-blur-sm`}
          onClick={(e) => {
            e.stopPropagation();
            togglePlay();
          }}
          aria-label={isPlaying ? "Pause video" : "Play video"}
        >
          {isPlaying ? (
            <Pause className="w-8 h-8 text-foreground" />
          ) : (
            <Play className="w-8 h-8 text-primary-foreground ml-1" />
          )}
        </button>
      </div>

      {/* Loading State */}
      {!isReady && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-muted">
          <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
        </div>
      )}

      {/* Title Overlay */}
      {title && (
        <div
          className={`absolute bottom-0 left-0 right-0 z-20 p-4 bg-gradient-to-t from-background/80 to-transparent transition-opacity duration-300 ${
            showControls || !isPlaying ? "opacity-100" : "opacity-0"
          }`}
        >
          <p className="text-sm font-medium text-foreground truncate">{title}</p>
        </div>
      )}
    </div>
  );
};
