import { useState, useEffect, useRef, useCallback } from "react";
import { Play, Pause, RotateCcw, RotateCw } from "lucide-react";

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
  const [hasEnded, setHasEnded] = useState(false);
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
            autoplay: 0,
            enablejsapi: 1,
          },
          events: {
            onReady: (event: any) => {
              event.target.setVolume(70);
              setIsReady(true);
            },
            onStateChange: (event: any) => {
              const state = event.data;
              setIsPlaying(state === window.YT.PlayerState.PLAYING);
              
              // When video ends, show overlay to hide related videos
              if (state === window.YT.PlayerState.ENDED) {
                setHasEnded(true);
                event.target.seekTo(0, true);
                event.target.pauseVideo();
              } else if (state === window.YT.PlayerState.PLAYING) {
                setHasEnded(false);
              }
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

  const skipBackward = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (!playerRef.current || !isReady) return;
    const currentTime = playerRef.current.getCurrentTime();
    playerRef.current.seekTo(Math.max(0, currentTime - 10), true);
  }, [isReady]);

  const skipForward = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (!playerRef.current || !isReady) return;
    const currentTime = playerRef.current.getCurrentTime();
    const duration = playerRef.current.getDuration();
    playerRef.current.seekTo(Math.min(duration, currentTime + 10), true);
  }, [isReady]);

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
    <div className="flex justify-center w-full">
      <div
        ref={containerRef}
        className="relative w-full max-w-3xl rounded-xl overflow-hidden bg-muted cursor-pointer group aspect-video"
        onClick={togglePlay}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* YouTube Player Container - scaled up and cropped to hide YouTube UI */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            id={playerContainerId.current}
            className="absolute pointer-events-none"
            style={{
              top: '-60px',
              left: '-2px',
              right: '-2px',
              bottom: '-80px',
              width: 'calc(100% + 4px)',
              height: 'calc(100% + 140px)',
            }}
          />
        </div>

        {/* Solid overlay when paused to hide any YouTube UI */}
        {!isPlaying && isReady && (
          <div className="absolute inset-0 z-10 bg-transparent" />
        )}

        {/* End screen overlay to hide related videos */}
        {hasEnded && (
          <div className="absolute inset-0 z-15 bg-muted flex items-center justify-center">
            <p className="text-muted-foreground text-sm">Video ended - Click to replay</p>
          </div>
        )}

        {/* Custom Controls */}
        <div
          className={`absolute inset-0 z-20 flex items-center justify-center gap-6 transition-opacity duration-300 ${
            showControls || !isPlaying ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Skip Backward 10s */}
          <button
            className="w-12 h-12 rounded-full flex items-center justify-center bg-background/70 hover:bg-background/90 shadow-lg backdrop-blur-sm transition-all duration-200"
            onClick={skipBackward}
            aria-label="Skip backward 10 seconds"
          >
            <RotateCcw className="w-5 h-5 text-foreground" />
            <span className="absolute -bottom-5 text-xs text-foreground/80 font-medium">10</span>
          </button>

          {/* Play/Pause */}
          <button
            className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-200 ${
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
              <Pause className="w-6 h-6 text-foreground" />
            ) : (
              <Play className="w-6 h-6 text-primary-foreground ml-1" />
            )}
          </button>

          {/* Skip Forward 10s */}
          <button
            className="w-12 h-12 rounded-full flex items-center justify-center bg-background/70 hover:bg-background/90 shadow-lg backdrop-blur-sm transition-all duration-200"
            onClick={skipForward}
            aria-label="Skip forward 10 seconds"
          >
            <RotateCw className="w-5 h-5 text-foreground" />
            <span className="absolute -bottom-5 text-xs text-foreground/80 font-medium">10</span>
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
    </div>
  );
};
