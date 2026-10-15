import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { BirthdayState } from '../types/birthday';
import { RotateCcw, Sliders } from 'lucide-react';

interface GatewayPageProps {
  data: BirthdayState;
  onNavigateNext: () => void;
  onNavigateToPage: (pageIndex: number) => void;
  onOpenCustomizer?: (tab?: 'global' | 'gateway' | 'gallery' | 'letter' | 'music' | 'hub' | 'quiz' | 'finale' | 'backup') => void;
}

export const GatewayPage: React.FC<GatewayPageProps> = ({
  data,
  onNavigateToPage,
  onOpenCustomizer,
}) => {
  // Directly start on 'question' just like in the reference video at 0:00!
  const [stage, setStage] = useState<'question' | 'pout' | 'celebrate'>('question');
  const gw = data?.gateway || {};

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#E63946', '#FF8BA7', '#FFCCD5', '#FFF176', '#4ECDC4'],
    });
  };

  const handleYes = () => {
    triggerConfetti();
    setStage('celebrate');
  };

  const handleNo = () => {
    setStage('pout');
  };

  const handleTryAgain = () => {
    setStage('question');
  };

  return (
    <div className="relative z-10 min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-6 overflow-hidden">
      {/* SCREEN 1 & 2: QUESTION & NO REACTION (Reference Video 0:00 - 0:06) */}
      {(stage === 'question' || stage === 'pout') && (
        <div className="relative w-full max-w-xl mx-auto flex flex-col items-center justify-center text-center animate-fadeIn">
          {/* Subtle Pink Oval / Heart halo as seen in the reference video */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10">
            <div className="w-[380px] sm:w-[460px] h-[320px] sm:h-[380px] rounded-[50%] bg-[#FCE8EE]/70 blur-2xl transform scale-110" />
          </div>

          {stage === 'question' && (
            <div className="space-y-4 sm:space-y-6 w-full flex flex-col items-center">
              {/* Cute 2-line title in rounded reddish font matching reference video */}
              <div className="space-y-1">
                <h1 className="font-bubble text-3xl sm:text-4xl md:text-5xl font-bold text-[#A93226] tracking-tight leading-tight">
                  {gw.heading || 'I made something special for u'}
                </h1>
                <h2 className="font-bubble text-3xl sm:text-4xl md:text-5xl font-bold text-[#A93226] tracking-tight">
                  {gw.subheading || 'do u wanna see it?'}
                </h2>
              </div>

              {/* Authentic Animated Bubu in Box & Dudu waving (clean cropped GIF from video) */}
              <div className="py-2 flex items-center justify-center">
                <img
                  src="/assets/bubu_dudu_welcome.gif"
                  alt="Bubu in box and Dudu waving"
                  className="w-56 sm:w-64 md:w-72 h-auto drop-shadow-sm select-none"
                  loading="eager"
                />
              </div>

              {/* Exact Pill Buttons: Coral Red with White bold text and underline style */}
              <div className="pt-2 flex items-center justify-center gap-6 sm:gap-8">
                <button
                  onClick={handleYes}
                  className="w-32 sm:w-36 py-3 rounded-full bg-[#D04848] hover:bg-[#B83232] active:scale-95 text-white font-bubble font-bold text-xl tracking-wider shadow-lg shadow-rose-200 transition-all hover:scale-105 cursor-pointer underline decoration-2 underline-offset-4"
                >
                  {gw.yesBtnText || 'YES'}
                </button>

                <button
                  onClick={handleNo}
                  className="w-32 sm:w-36 py-3 rounded-full bg-[#D04848] hover:bg-[#B83232] active:scale-95 text-white font-bubble font-bold text-xl tracking-wider shadow-lg shadow-rose-200 transition-all hover:scale-105 cursor-pointer underline decoration-2 underline-offset-4"
                >
                  {gw.noBtnText || 'NO'}
                </button>
              </div>

              {/* Inline Quick Customize button */}
              {onOpenCustomizer && (
                <div className="pt-4">
                  <button
                    onClick={() => onOpenCustomizer('gateway')}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/80 hover:bg-white text-xs font-cute font-medium text-pink-700 border border-pink-200 shadow-xs transition-all hover:scale-105 cursor-pointer"
                  >
                    <Sliders className="w-3.5 h-3.5" />
                    <span>Customize this text</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {stage === 'pout' && (
            <div className="space-y-4 sm:space-y-6 w-full flex flex-col items-center">
              {/* "Why did u click no!?" title matching reference video 0:03 */}
              <h2 className="font-bubble text-3xl sm:text-4xl md:text-5xl font-bold text-[#A93226] tracking-tight">
                {gw.noReactionTitle || 'Why did u click no!?'}
              </h2>

              {/* Authentic Animated Bubu sitting on Dudu and hitting him playfully */}
              <div className="py-2 flex items-center justify-center">
                <img
                  src="/assets/bubu_hitting_dudu.gif"
                  alt="Why did u click no!? Bubu hitting Dudu"
                  className="w-44 sm:w-52 h-auto drop-shadow-sm select-none"
                  loading="eager"
                />
              </div>

              {/* TRY AGAIN button (Exact red pill from video) */}
              <div className="pt-2 flex justify-center">
                <button
                  onClick={handleTryAgain}
                  className="px-8 sm:px-10 py-3 rounded-full bg-[#D04848] hover:bg-[#B83232] active:scale-95 text-white font-bubble font-bold text-lg tracking-wider shadow-lg shadow-rose-200 transition-all hover:scale-105 flex items-center gap-2 cursor-pointer underline decoration-2 underline-offset-4"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>{gw.tryAgainBtnText || 'TRY AGAIN'}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* SCREEN 3: "♡ happy ♡ Birthday" CELEBRATION (Reference Video 0:07 - 0:11) */}
      {stage === 'celebrate' && (
        <div className="relative w-full max-w-4xl mx-auto min-h-[500px] flex flex-col justify-between items-center text-center py-6 animate-fadeIn">
          {/* Pastel Pink Candy Striped Pattern Background with scattered stars */}
          <div className="absolute inset-0 bg-candy-stripes rounded-3xl -z-10 opacity-70" />

          {/* Floating Soft Pink & Yellow Stars */}
          <div className="absolute top-4 left-6 text-[#FFB6C1] text-2xl select-none animate-pulse">★</div>
          <div className="absolute top-16 left-16 text-[#FFD166] text-xl select-none">★</div>
          <div className="absolute top-6 right-8 text-[#FFB6C1] text-2xl select-none animate-pulse">★</div>
          <div className="absolute top-20 right-16 text-[#FFD166] text-xl select-none">★</div>

          {/* Main Title: "♡ happy ♡" then "Birthday" in pink 3D cursive lettering */}
          <div className="pt-6 sm:pt-10 space-y-1">
            <div className="flex items-center justify-center gap-2 sm:gap-4">
              <span className="text-[#FF4081] text-2xl sm:text-3xl animate-bounce">♡</span>
              <span className="font-script text-5xl sm:text-7xl md:text-8xl text-[#FF4081] tracking-wide select-none drop-shadow-md">
                happy
              </span>
              <span className="text-[#FF4081] text-2xl sm:text-3xl animate-bounce" style={{ animationDelay: '0.2s' }}>♡</span>
            </div>
            <h2 className="font-script text-5xl sm:text-7xl md:text-8xl text-[#FF4081] tracking-wide select-none drop-shadow-md -mt-2 sm:-mt-4">
              {data.global.recipientName ? `Birthday, ${data.global.recipientName}` : 'Birthday'}
            </h2>
          </div>

          {/* Center: "click me" button (matching 0:10 in video) */}
          <div className="my-6 z-20">
            <button
              onClick={() => onNavigateToPage(5)}
              className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-2xl bg-[#FFE4EC] hover:bg-[#FFD1DC] active:scale-95 text-[#D81B60] font-bubble font-bold text-sm sm:text-base border-2 border-[#FFB6C1] shadow-lg shadow-pink-200/60 transition-all hover:scale-105 cursor-pointer animate-pulse"
            >
              click me
            </button>
          </div>

          {/* Bottom Row with the Two Animated Character Scenes from Video (Frame 10): */}
          {/* Bottom Left: Bubu & Dudu with party hats blowing the cake! */}
          {/* Bottom Right: Bubu & Dudu with party hats dancing! */}
          <div className="w-full flex items-end justify-between px-4 sm:px-12 pb-2">
            <div className="flex flex-col items-center">
              <img
                src="/assets/bubu_dudu_cake.gif"
                alt="Bubu and Dudu blowing birthday cake"
                className="w-32 sm:w-44 md:w-52 h-auto drop-shadow-sm select-none"
                loading="eager"
              />
            </div>

            <div className="flex flex-col items-center">
              <img
                src="/assets/bubu_dudu_dancing.gif"
                alt="Bubu and Dudu dancing with party hats"
                className="w-28 sm:w-36 md:w-44 h-auto drop-shadow-sm select-none"
                loading="eager"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
