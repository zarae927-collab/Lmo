import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { BirthdayState } from '../types/birthday';
import { CompanionCharacters } from '../components/CompanionCharacters';
import { 
  Sparkles, 
  RotateCcw, 
  Flame, 
  Wind, 
  Star, 
  Image as ImageIcon, 
  Mail, 
  Music, 
  ChevronLeft 
} from 'lucide-react';

interface FinalePageProps {
  data: BirthdayState;
  onNavigateToPage: (pageIndex: number) => void;
  onNavigatePrev: () => void;
}

export const FinalePage: React.FC<FinalePageProps> = ({
  data,
  onNavigateToPage,
  onNavigatePrev,
}) => {
  const { finale, global } = data;
  const [candlesLit, setCandlesLit] = useState(true);
  const [starUnlocked, setStarUnlocked] = useState(false);
  const [countdownText, setCountdownText] = useState<string | null>(null);

  useEffect(() => {
    if (!finale.countdownEnabled || !global.birthdayDate) return;

    const bday = new Date(global.birthdayDate);
    const now = new Date();
    const diffMs = bday.getTime() - now.getTime();

    if (diffMs > 0) {
      const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      setCountdownText(`${days} days, ${hours} hours until the official day!`);
    } else {
      setCountdownText('Today is the glorious celebration!');
    }
  }, [finale.countdownEnabled, global.birthdayDate]);

  const handleBlowCandles = () => {
    if (!candlesLit) return;
    setCandlesLit(false);

    confetti({
      particleCount: 130,
      spread: 95,
      origin: { y: 0.55 },
      colors: ['#FF5A82', '#FF8BA7', '#FFB6C1', '#FFFFFF', '#D81B60', '#FDE2E4'],
    });
  };

  const handleRelight = () => {
    setCandlesLit(true);
  };

  const handleStarClick = () => {
    setStarUnlocked(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#FF5A82', '#FF8BA7', '#FFD1DC'],
    });
  };

  return (
    <div className="relative z-10 max-w-5xl mx-auto px-4 py-8 md:py-12 text-center">
      {/* Grand Top Badge */}
      <div className="space-y-4 mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-pink-200 bg-white/80 text-xs tracking-[0.2em] text-pink-600 uppercase font-cinzel font-bold shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-pink-500" />
          <span>Page 7 of 7 · The Grand Finale</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif-title font-medium text-[#2D121F] tracking-tight leading-tight">
          {finale.heading}
        </h1>
        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-light leading-relaxed">
          {finale.subheading}
        </p>

        {countdownText && (
          <div className="pt-2">
            <span className="inline-block px-4 py-1 rounded-full bg-pink-50 border border-pink-200 text-xs text-pink-700 font-cinzel font-semibold shadow-xs">
              ⏳ {countdownText}
            </span>
          </div>
        )}
      </div>

      {/* INTERACTIVE CAKE & CANDLE SECTION (Pink & White Aesthetic) */}
      {finale.cakeEnabled && (
        <div className="max-w-xl mx-auto my-10 p-8 rounded-3xl border-2 border-pink-200 bg-white/95 backdrop-blur-xl shadow-2xl shadow-pink-100 relative overflow-hidden">
          {/* Cake Illustration SVG */}
          <div className="relative flex justify-center py-4">
            <svg viewBox="0 0 260 200" className="w-64 h-48 drop-shadow-xl" fill="none">
              {/* Stand / Plate */}
              <ellipse cx="130" cy="180" rx="90" ry="14" fill="#FFF0F5" stroke="#FFB6C1" strokeWidth="2.5" />
              <ellipse cx="130" cy="178" rx="80" ry="10" fill="#FFE4E8" />

              {/* Bottom Tier (Strawberry Pink & Cream) */}
              <rect x="55" y="115" width="150" height="55" rx="8" fill="#FFF5F7" stroke="#FFB6C1" strokeWidth="2" />
              {/* Strawberry Drip */}
              <path d="M 55 125 Q 70 140 85 125 Q 100 140 115 125 Q 130 140 145 125 Q 160 140 175 125 Q 190 140 205 125 L 205 115 L 55 115 Z" fill="#FF8BA7" />

              {/* Top Tier */}
              <rect x="80" y="70" width="100" height="48" rx="6" fill="#FFFFFF" stroke="#FFB6C1" strokeWidth="2" />
              <path d="M 80 78 Q 92 90 105 78 Q 118 90 130 78 Q 142 90 155 78 Q 168 90 180 78 L 180 70 L 80 70 Z" fill="#FFB6C1" />

              {/* Sugar Pearls around rims */}
              <circle cx="90" cy="116" r="3" fill="#FF6584" />
              <circle cx="110" cy="116" r="3" fill="#FF6584" />
              <circle cx="130" cy="116" r="3" fill="#FF6584" />
              <circle cx="150" cy="116" r="3" fill="#FF6584" />
              <circle cx="170" cy="116" r="3" fill="#FF6584" />

              {/* 3 Candles */}
              {/* Left Candle */}
              <rect x="100" y="44" width="6" height="26" rx="2" fill="#FFE4E8" stroke="#FF8BA7" strokeWidth="1" />
              <rect x="100" y="44" width="6" height="4" fill="#FF5A82" />
              {/* Center Candle */}
              <rect x="127" y="38" width="6" height="32" rx="2" fill="#FFE4E8" stroke="#FF8BA7" strokeWidth="1" />
              <rect x="127" y="38" width="6" height="4" fill="#FF5A82" />
              {/* Right Candle */}
              <rect x="154" y="44" width="6" height="26" rx="2" fill="#FFE4E8" stroke="#FF8BA7" strokeWidth="1" />
              <rect x="154" y="44" width="6" height="4" fill="#FF5A82" />

              {/* Candle Flames */}
              {candlesLit ? (
                <g className="animate-pulse">
                  <path d="M 103 26 C 99 32 101 38 103 42 C 105 38 107 32 103 26 Z" fill="#FF9F1C" />
                  <circle cx="103" cy="36" r="2" fill="#FFE49E" />
                  <path d="M 130 18 C 126 25 128 32 130 36 C 132 32 134 25 130 18 Z" fill="#FF9F1C" />
                  <circle cx="130" cy="28" r="2.5" fill="#FFE49E" />
                  <path d="M 157 26 C 153 32 155 38 157 42 C 159 38 161 32 157 26 Z" fill="#FF9F1C" />
                  <circle cx="157" cy="36" r="2" fill="#FFE49E" />
                </g>
              ) : (
                <g className="opacity-60">
                  <path d="M 103 40 Q 98 32 104 24" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" fill="none" />
                  <path d="M 130 34 Q 135 24 128 14" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" fill="none" />
                  <path d="M 157 40 Q 152 32 158 24" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" fill="none" />
                </g>
              )}
            </svg>
          </div>

          {/* Candle Action Controls */}
          <div className="space-y-3 pt-2">
            {candlesLit ? (
              <button
                onClick={handleBlowCandles}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-400 text-white font-bold text-sm shadow-lg shadow-pink-200 hover:scale-105 active:scale-95 transition-all"
              >
                <Wind className="w-4 h-4" />
                <span>Make a Wish & Blow the Candles! 🎂</span>
              </button>
            ) : (
              <div className="space-y-3 animate-fadeIn">
                <p className="font-script text-3xl text-pink-600">
                  Your wish has been carried to the stars! ✨
                </p>
                <button
                  onClick={handleRelight}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-pink-50 hover:bg-pink-100 text-xs text-pink-700 border border-pink-200 transition-colors"
                >
                  <Flame className="w-3.5 h-3.5 text-amber-500" />
                  <span>Relight Candles</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* FINAL CENTRAL BLESSING */}
      <div className="max-w-2xl mx-auto space-y-6 my-10 p-8 rounded-3xl bg-white border-2 border-pink-200 shadow-xl shadow-pink-100">
        <h3 className="font-serif text-3xl sm:text-4xl text-[#2D121F] font-bold">
          {finale.wishTitle}
        </h3>
        <p className="font-serif text-lg text-slate-600 leading-relaxed font-light">
          {finale.wishMessage}
        </p>

        {/* Secret Star Blessing */}
        <div className="pt-4 border-t border-pink-100">
          {!starUnlocked ? (
            <button
              onClick={handleStarClick}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-pink-50 hover:bg-pink-100 border border-pink-300 text-pink-600 text-xs font-cinzel uppercase tracking-wider font-bold transition-all hover:scale-105 shadow-xs"
            >
              <Star className="w-4 h-4 fill-current text-pink-500" />
              <span>Click the Sparkling Star for One Last Wish</span>
            </button>
          ) : (
            <div className="p-4 rounded-2xl bg-pink-50 border border-pink-300 text-pink-900 animate-fadeIn">
              <p className="font-serif text-base italic leading-relaxed text-[#2D121F]">
                {finale.secretStarWish}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Companion Celebration Badge */}
      <div className="flex justify-center my-6">
        <CompanionCharacters mood="celebrate" size="lg" />
      </div>

      <p className="font-script text-3xl sm:text-4xl text-pink-600 mb-10">
        {finale.finalQuote}
      </p>

      {/* Replay & Revisit Hub Buttons */}
      <div className="pt-6 border-t border-pink-200 flex flex-wrap items-center justify-center gap-4">
        <button
          onClick={() => onNavigateToPage(1)}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-400 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-pink-200 hover:scale-105 transition-all"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Replay The Surprise</span>
        </button>

        <button
          onClick={() => onNavigateToPage(2)}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white hover:bg-pink-50 border border-pink-200 text-slate-700 hover:text-pink-600 text-xs font-semibold shadow-xs transition-all"
        >
          <ImageIcon className="w-4 h-4 text-pink-500" />
          <span>Revisit Photo Gallery</span>
        </button>

        <button
          onClick={() => onNavigateToPage(3)}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white hover:bg-pink-50 border border-pink-200 text-slate-700 hover:text-pink-600 text-xs font-semibold shadow-xs transition-all"
        >
          <Mail className="w-4 h-4 text-pink-500" />
          <span>Re-read The Letter</span>
        </button>

        <button
          onClick={() => onNavigateToPage(4)}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white hover:bg-pink-50 border border-pink-200 text-slate-700 hover:text-pink-600 text-xs font-semibold shadow-xs transition-all"
        >
          <Music className="w-4 h-4 text-pink-500" />
          <span>Listen to Song</span>
        </button>
      </div>

      {/* Back to prev page */}
      <div className="mt-8 flex justify-start">
        <button
          onClick={onNavigatePrev}
          className="inline-flex items-center gap-2 text-xs text-slate-500 hover:text-pink-600 font-medium"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous: Birthday Quiz</span>
        </button>
      </div>
    </div>
  );
};
