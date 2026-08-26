import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause, Maximize2, Film } from 'lucide-react';

interface LazyVideoProps {
  src: string;
  poster?: string;
  title?: string;
  className?: string;
}

export function LazyVideo({
  src,
  poster,
  title,
  className = "w-full h-auto max-h-[480px] object-cover"
}: LazyVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = isMuted;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => {
            // Autoplay with sound might fail or be blocked by browser policy, keep muted
            video.muted = true;
            setIsMuted(true);
            video.play().catch(() => {});
          });
      }
    }
  }, [src]);

  const toggleSound = () => {
    if (videoRef.current) {
      const nextMuted = !isMuted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  return (
    <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-black border border-white/15 group">
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onLoadedData={() => setIsLoaded(true)}
        className={`${className} transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-90'}`}
      >
        Twoja przeglądarka nie obsługuje odtwarzacza wideo.
      </video>

      {/* Top title badge */}
      {title && (
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
          <span className="inline-flex items-center gap-2 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-semibold text-white/90 border border-white/10 shadow-sm">
            <Film size={13} className="text-gold" />
            <span className="truncate max-w-[240px] sm:max-w-xs">{title}</span>
          </span>
        </div>
      )}

      {/* Bottom sleek control bar */}
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3 bg-black/60 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/15 text-white shadow-lg transition-opacity duration-300">
        <div className="flex items-center gap-2">
          {/* Play/Pause */}
          <button
            type="button"
            onClick={togglePlay}
            className="p-2 rounded-xl bg-white/15 hover:bg-white/30 text-white transition-colors flex items-center gap-1.5 text-xs font-medium cursor-pointer"
            title={isPlaying ? "Wstrzymaj" : "Odtwórz"}
          >
            {isPlaying ? <Pause size={15} /> : <Play size={15} className="fill-white" />}
            <span className="hidden sm:inline">{isPlaying ? "Pauza" : "Odtwórz"}</span>
          </button>

          {/* Sound Toggle */}
          <button
            type="button"
            onClick={toggleSound}
            className="p-2 rounded-xl bg-white/15 hover:bg-white/30 text-white transition-colors flex items-center gap-1.5 text-xs font-medium cursor-pointer"
            title={isMuted ? "Włącz dźwięk" : "Wycisz dźwięk"}
          >
            {isMuted ? <VolumeX size={15} className="text-amber-300" /> : <Volume2 size={15} className="text-emerald-400" />}
            <span>{isMuted ? "Włącz dźwięk" : "Wycisz"}</span>
          </button>
        </div>

        {/* Fullscreen */}
        <button
          type="button"
          onClick={handleFullscreen}
          className="p-2 rounded-xl bg-white/15 hover:bg-white/30 text-white transition-colors flex items-center gap-1.5 text-xs font-medium cursor-pointer"
          title="Pełny ekran"
        >
          <Maximize2 size={15} />
          <span className="hidden sm:inline">Pełny ekran</span>
        </button>
      </div>
    </div>
  );
}
