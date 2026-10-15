import React, { useState, useEffect, useRef } from 'react';
import { BirthdayState } from '../types/birthday';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Heart, 
  ChevronLeft, 
  ChevronRight,
  Upload,
  RotateCcw
} from 'lucide-react';

interface MusicRoomPageProps {
  data: BirthdayState;
  onUpdateMusic: (updatedMusic: BirthdayState['music']) => void;
  onNavigateNext: () => void;
  onNavigatePrev: () => void;
  onOpenCustomizer?: (tab?: 'global' | 'gateway' | 'gallery' | 'letter' | 'music' | 'hub' | 'quiz' | 'finale' | 'backup') => void;
}

export const MusicRoomPage: React.FC<MusicRoomPageProps> = ({
  data,
  onUpdateMusic,
  onNavigatePrev,
  onOpenCustomizer,
}) => {
  const { music } = data;
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(33.5);
  const [volume, setVolume] = useState(0.85);
  const [isMuted, setIsMuted] = useState(false);
  const [isLiked, setIsLiked] = useState(true);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.warn('Audio play error', err);
      });
    }
  };

  const handleAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        onUpdateMusic({
          ...music,
          audioUrl: result,
          currentTrackTitle: file.name.replace(/\.[^/.]+$/, ''),
        });
      }
    };
    reader.readAsDataURL(file);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="relative z-10 min-h-[calc(100vh-4rem)] flex flex-col justify-center px-4 py-8 overflow-hidden">
      {/* Background: Pastel cyan & white vertical stripes with scattered pink stars (Video 0:24 - 0:28) */}
      <div 
        className="absolute inset-0 -z-10"
        style={{
          background: 'repeating-linear-gradient(90deg, #E8F4F8, #E8F4F8 28px, #F4FAFC 28px, #F4FAFC 56px)',
        }}
      />

      {/* Decorative Pastel Pink Stars */}
      <div className="absolute top-10 left-6 text-[#F48FB1] text-3xl select-none animate-pulse">★</div>
      <div className="absolute bottom-16 left-8 text-[#F06292] text-3xl select-none">★</div>
      <div className="absolute top-10 right-6 text-[#F06292] text-3xl select-none animate-pulse">★</div>
      <div className="absolute bottom-16 right-8 text-[#F48FB1] text-3xl select-none">★</div>

      {/* Hidden Audio Element playing soundtrack extracted from video */}
      <audio
        ref={audioRef}
        src={music.audioUrl || '/assets/birthday_music.mp3'}
        onTimeUpdate={() => {
          if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
            setDuration(audioRef.current.duration || 33.5);
          }
        }}
        onEnded={() => setIsPlaying(false)}
      />

      <div className="max-w-2xl w-full mx-auto relative">
        {/* Retro Music Player Card (Exact layout from Video Frame 25 & 28) */}
        <div className="animate-fadeIn bg-white/95 border-2 border-pink-200 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-pink-100/60 space-y-5 relative">
          {/* Left Arrow to go back to previous slide / hub */}
          <button
            onClick={onNavigatePrev}
            className="absolute -left-4 sm:-left-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#D04848] hover:bg-[#B83232] text-white flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all cursor-pointer z-20"
            title="Return to Surprise Hub"
          >
            <ChevronLeft className="w-7 h-7" />
          </button>

          {/* Right Arrow to go to items / next */}
          <button
            onClick={onNavigatePrev}
            className="absolute -right-4 sm:-right-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#D04848] hover:bg-[#B83232] text-white flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all cursor-pointer z-20"
            title="Return to Surprise Hub"
          >
            <ChevronRight className="w-7 h-7" />
          </button>

          {/* Video / Lyric Card Canvas matching Frame 25 in Reference Video */}
          <div className="relative aspect-16/9 w-full rounded-2xl overflow-hidden bg-slate-900 border-2 border-pink-200 shadow-inner flex items-center justify-center">
            {/* Romantic Sunset / Haareya Lyric visual from video */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#2D121F] via-[#3E2723] to-[#455A64] flex flex-col items-center justify-center p-6 text-center">
              <span className="font-bubble text-2xl sm:text-3xl text-white font-bold tracking-wider drop-shadow-md">
                O HAAREYA MAIN DIL HAAREYA
              </span>
              <span className="font-cute text-xs sm:text-sm text-pink-200 mt-2">
                Arijit Singh · Meri Pyaari Bindu
              </span>
              <span className="text-[11px] text-pink-300/80 font-mono mt-1">
                Dedicated especially for you with all my heart ♡
              </span>
            </div>

            {/* Big Play / Pause Overlay Button */}
            <button
              onClick={togglePlay}
              className="relative z-10 w-16 h-16 rounded-full bg-[#D04848] hover:bg-[#B83232] text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all cursor-pointer"
            >
              {isPlaying ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 fill-current ml-1" />}
            </button>
          </div>

          {/* Song Meta & Controls matching Frame 25 */}
          <div className="space-y-3 pt-1">
            {/* Title & Heart Button */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bubble text-2xl font-bold text-[#2D121F] tracking-wide">
                  {music.currentTrackTitle || 'HAAREYA <3'}
                </h3>
                <p className="font-cute text-xs text-slate-500 font-semibold">
                  {music.currentArtist || 'Arijit Singh'}
                </p>
              </div>

              <button
                onClick={() => setIsLiked(!isLiked)}
                className="p-2 rounded-full hover:bg-pink-50 transition-colors cursor-pointer"
              >
                <Heart className={`w-7 h-7 ${isLiked ? 'fill-[#D04848] text-[#D04848]' : 'text-slate-400'}`} />
              </button>
            </div>

            {/* Progress Bar with current time and duration */}
            <div className="space-y-1">
              <div
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const pos = (e.clientX - rect.left) / rect.width;
                  if (audioRef.current) {
                    audioRef.current.currentTime = pos * duration;
                  }
                }}
                className="w-full h-2.5 bg-pink-100 rounded-full overflow-hidden cursor-pointer relative"
              >
                <div
                  className="h-full bg-[#D04848] rounded-full transition-all"
                  style={{ width: `${Math.min(100, (currentTime / (duration || 1)) * 100)}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Bottom Row: Bubu & Dudu resting sticker at bottom left (Frame 25) + Secondary Controls */}
            <div className="pt-2 flex items-center justify-between border-t border-pink-100">
              {/* Authentic Bubu & Dudu resting sticker from Video Frame 25 */}
              <div className="flex items-center gap-2">
                <img
                  src="/assets/bubu_dudu_rest.gif"
                  alt="Bubu and Dudu resting together"
                  className="w-16 sm:w-20 h-auto drop-shadow-xs select-none"
                  loading="eager"
                />
                <span className="font-cute text-xs text-pink-700 font-semibold hidden sm:inline">
                  our favorite song ♡
                </span>
              </div>

              {/* Volume & Replay controls */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    if (audioRef.current) {
                      audioRef.current.currentTime = 0;
                      audioRef.current.play();
                      setIsPlaying(true);
                    }
                  }}
                  className="p-1.5 rounded-full hover:bg-pink-100 text-slate-600 transition-colors"
                  title="Replay from start"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => {
                      setIsMuted(!isMuted);
                      if (audioRef.current) audioRef.current.muted = !isMuted;
                    }}
                    className="text-slate-500 hover:text-pink-600"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={isMuted ? 0 : volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    className="w-16 sm:w-20 accent-[#D04848] cursor-pointer"
                  />
                </div>

                <label className="cursor-pointer inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-pink-50 hover:bg-pink-100 text-pink-700 font-bubble text-xs font-bold transition-all shadow-xs">
                  <Upload className="w-3 h-3" />
                  <span className="hidden sm:inline">Change Song</span>
                  <input
                    type="file"
                    accept="audio/*"
                    onChange={handleAudioUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Return & Customization Controls */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => onNavigatePrev()}
            className="px-6 py-2.5 rounded-full bg-white hover:bg-pink-50 border border-pink-300 text-pink-700 font-bubble text-xs font-bold shadow-sm transition-all hover:scale-105 cursor-pointer"
          >
            ← Return to Surprise Items Hub
          </button>

          {onOpenCustomizer && (
            <button
              onClick={() => onOpenCustomizer('music')}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-pink-500 to-rose-400 text-white font-bubble text-xs font-bold shadow-sm hover:scale-105 transition-all cursor-pointer"
            >
              🎵 Edit Song & Track
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
