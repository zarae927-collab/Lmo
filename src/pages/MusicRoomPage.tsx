import React, { useState, useEffect, useRef } from 'react';
import { BirthdayState } from '../types/birthday';
import { birthdaySynth } from '../utils/audioSynthesizer';
import { 
  Sparkles, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  RotateCcw, 
  Music, 
  Disc, 
  Heart, 
  ChevronLeft, 
  ChevronRight,
  Upload
} from 'lucide-react';

interface MusicRoomPageProps {
  data: BirthdayState;
  onUpdateMusic: (updatedMusic: BirthdayState['music']) => void;
  onNavigateNext: () => void;
  onNavigatePrev: () => void;
}

export const MusicRoomPage: React.FC<MusicRoomPageProps> = ({
  data,
  onUpdateMusic,
  onNavigateNext,
  onNavigatePrev,
}) => {
  const { music, global } = data;
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(180);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [useCustomAudio, setUseCustomAudio] = useState(Boolean(music.audioUrl));

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    setUseCustomAudio(Boolean(music.audioUrl));
  }, [music.audioUrl]);

  // Audio Visualizer Canvas effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let running = true;
    const barCount = 32;

    const draw = () => {
      if (!running) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const width = canvas.width;
      const height = canvas.height;
      const barWidth = width / barCount - 2;

      for (let i = 0; i < barCount; i++) {
        const baseHeight = isPlaying 
          ? Math.sin(Date.now() * 0.008 + i * 0.3) * (height * 0.35) + (height * 0.4)
          : 6;

        const x = i * (barWidth + 2);
        const y = height - baseHeight;

        const gradient = ctx.createLinearGradient(0, height, 0, 0);
        gradient.addColorStop(0, '#FF8BA7');
        gradient.addColorStop(1, '#FF5A82');

        ctx.fillStyle = isPlaying ? gradient : 'rgba(255, 182, 193, 0.4)';
        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, baseHeight, [2, 2, 0, 0]);
        ctx.fill();
      }

      animFrameRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      running = false;
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isPlaying]);

  const togglePlay = () => {
    if (useCustomAudio && audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch((err) => {
          console.warn('Audio play prevented or file missing, switching to built-in melody synth', err);
          birthdaySynth.play((step, total) => {
            setCurrentTime(step * 2);
            setDuration(total * 2);
          });
          setIsPlaying(true);
        });
      }
    } else {
      if (isPlaying) {
        birthdaySynth.pause();
        setIsPlaying(false);
      } else {
        birthdaySynth.setVolume(isMuted ? 0 : volume);
        birthdaySynth.play((step, total) => {
          setCurrentTime(step * 4);
          setDuration(total * 4);
        }, () => {
          setIsPlaying(false);
        });
        setIsPlaying(true);
      }
    }
  };

  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    setIsMuted(newVol === 0);
    birthdaySynth.setVolume(newVol);
    if (audioRef.current) {
      audioRef.current.volume = newVol;
    }
  };

  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      birthdaySynth.setVolume(volume);
      if (audioRef.current) audioRef.current.volume = volume;
    } else {
      setIsMuted(true);
      birthdaySynth.setVolume(0);
      if (audioRef.current) audioRef.current.volume = 0;
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
        setUseCustomAudio(true);
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
    <div className="relative z-10 max-w-5xl mx-auto px-4 py-8 md:py-12">
      {/* Header */}
      <div className="text-center space-y-3 mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-pink-200 bg-white/80 text-xs tracking-widest text-pink-600 uppercase font-cinzel font-semibold shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-pink-500" />
          <span>Page 4 of 7 · Musical Serenade</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-title font-medium text-[#2D121F] tracking-tight">
          {music.heading}
        </h2>
        <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto font-light">
          {music.subheading}
        </p>
      </div>

      {/* Hidden HTML5 Audio Element */}
      {music.audioUrl && (
        <audio
          ref={audioRef}
          src={music.audioUrl}
          onTimeUpdate={() => {
            if (audioRef.current) {
              setCurrentTime(audioRef.current.currentTime);
              setDuration(audioRef.current.duration || 180);
            }
          }}
          onEnded={() => setIsPlaying(false)}
        />
      )}

      {/* Main Music Player Card (White & Pink Aesthetic) */}
      <div className="max-w-3xl mx-auto rounded-3xl border-2 border-pink-200 bg-white/95 backdrop-blur-xl shadow-2xl shadow-pink-100/70 p-6 sm:p-10 space-y-8">
        {/* Cassette Graphic & Visualizer */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
          {/* Retro Pastel Pink Cassette Tape */}
          <div className="relative w-72 sm:w-80 h-48 rounded-2xl bg-gradient-to-b from-[#FFF5F8] to-[#FFE4EC] border-2 border-pink-300 shadow-xl p-3 flex flex-col justify-between overflow-hidden">
            {/* Top pink bar */}
            <div className="flex items-center justify-between text-[10px] text-pink-600 font-cinzel px-2 pt-1 border-b border-pink-200 pb-1">
              <span>A-SIDE · STEREO</span>
              <span className="font-bold tracking-widest text-pink-700">SPECIAL EDITION</span>
            </div>

            {/* Cassette Label Card */}
            <div className="bg-white text-[#2D121F] rounded-lg p-2.5 shadow-xs border border-pink-200 text-center">
              <span className="text-[10px] uppercase font-bold text-pink-600 tracking-wider flex items-center justify-center gap-1">
                <Heart className="w-2.5 h-2.5 fill-pink-500 text-pink-500" />
                FOR {global.recipientName} WITH ALL MY HEART
              </span>
              <h4 className="font-serif text-sm font-semibold truncate text-[#2D121F] mt-0.5">
                {music.currentTrackTitle}
              </h4>
            </div>

            {/* Tape Window with Spools */}
            <div className="relative h-14 bg-white/80 rounded-md border border-pink-200 flex items-center justify-around px-8 shadow-inner">
              {/* Left Spool */}
              <div className={`w-10 h-10 rounded-full border-2 border-pink-300 bg-pink-100 flex items-center justify-center ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '3s' }}>
                <div className="w-3 h-3 rounded-full bg-pink-500" />
              </div>

              {/* Tape Ribbon */}
              <div className="flex-1 h-2 bg-pink-300 mx-2 rounded-full" />

              {/* Right Spool */}
              <div className={`w-10 h-10 rounded-full border-2 border-pink-300 bg-pink-100 flex items-center justify-center ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '3s' }}>
                <div className="w-3 h-3 rounded-full bg-pink-500" />
              </div>
            </div>

            {/* Bottom Holes */}
            <div className="flex items-center justify-between px-6 pb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-pink-200" />
              <span className="text-[9px] text-pink-600 font-mono tracking-widest font-semibold">
                {isPlaying ? '▶ PLAYING' : '❚❚ PAUSED'}
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-pink-200" />
            </div>
          </div>

          {/* Visualizer Canvas & Track info */}
          <div className="flex-1 space-y-4 w-full">
            <div className="space-y-1">
              <span className="text-xs uppercase font-cinzel text-pink-600 tracking-widest font-bold">
                Dedicated Melody
              </span>
              <h3 className="text-2xl font-serif text-[#2D121F] font-semibold">
                {music.currentTrackTitle}
              </h3>
              <p className="text-sm text-slate-500 font-sans">
                {music.currentArtist}
              </p>
            </div>

            {/* Audio Visualizer Waves */}
            <div className="h-16 w-full bg-pink-50/70 rounded-2xl border border-pink-200 p-2 flex items-center justify-center overflow-hidden">
              <canvas
                ref={canvasRef}
                width={300}
                height={50}
                className="w-full h-full"
              />
            </div>

            {/* Progress Bar & Timers */}
            <div className="space-y-1.5">
              <div className="relative w-full h-2 bg-pink-100 rounded-full overflow-hidden cursor-pointer">
                <div
                  className="h-full bg-gradient-to-r from-pink-400 to-rose-500 rounded-full transition-all"
                  style={{ width: `${Math.min(100, (currentTime / (duration || 1)) * 100)}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Player Controls Bar */}
        <div className="pt-4 border-t border-pink-100 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={togglePlay}
              className="w-14 h-14 rounded-full bg-gradient-to-r from-pink-500 to-rose-400 text-white flex items-center justify-center shadow-lg shadow-pink-200 hover:scale-105 active:scale-95 transition-all"
            >
              {isPlaying ? (
                <Pause className="w-6 h-6 fill-current" />
              ) : (
                <Play className="w-6 h-6 fill-current ml-0.5" />
              )}
            </button>

            <button
              onClick={() => {
                if (audioRef.current) audioRef.current.currentTime = 0;
                birthdaySynth.seek(0);
                setCurrentTime(0);
              }}
              title="Restart Song"
              className="p-2.5 rounded-full bg-pink-50 hover:bg-pink-100 border border-pink-200 text-slate-700 hover:text-pink-600 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Volume Control */}
          <div className="flex items-center gap-2">
            <button onClick={toggleMute} className="text-slate-500 hover:text-pink-600">
              {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
              className="w-24 accent-pink-500 cursor-pointer"
            />
          </div>

          {/* Upload Custom Audio Button */}
          <label className="cursor-pointer inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-pink-50 hover:bg-pink-100 border border-pink-200 text-xs text-pink-700 font-medium transition-colors shadow-xs">
            <Upload className="w-3.5 h-3.5" />
            <span>Upload Your Song (.mp3)</span>
            <input
              type="file"
              accept="audio/*"
              onChange={handleAudioUpload}
              className="hidden"
            />
          </label>
        </div>

        {/* Dedication Text Note */}
        <div className="p-4 rounded-2xl bg-pink-50/70 border border-pink-200 space-y-1 text-center">
          <p className="text-xs uppercase font-cinzel text-pink-600 tracking-wider font-bold">
            {music.dedicationTitle}
          </p>
          <p className="font-serif text-sm text-slate-700 italic">
            "{music.dedicationText}"
          </p>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="mt-12 pt-6 border-t border-pink-200 flex items-center justify-between">
        <button
          onClick={onNavigatePrev}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl border border-pink-200 bg-white text-slate-700 hover:text-pink-600 hover:bg-pink-50 text-sm shadow-sm transition-all"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous: The Letter</span>
        </button>

        <button
          onClick={onNavigateNext}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-400 text-white font-semibold text-sm shadow-md shadow-pink-200 hover:scale-105 transition-all"
        >
          <span>Next: Surprise Room</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
