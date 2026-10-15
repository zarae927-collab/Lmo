import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { BirthdayState } from '../types/birthday';
import { CompanionCharacters } from '../components/CompanionCharacters';
import { Sparkles, Heart, Gift, ArrowRight, RotateCcw } from 'lucide-react';

interface GatewayPageProps {
  data: BirthdayState;
  onNavigateNext: () => void;
  onNavigateToPage: (pageIndex: number) => void;
}

export const GatewayPage: React.FC<GatewayPageProps> = ({
  data,
  onNavigateNext,
  onNavigateToPage,
}) => {
  // Step 1: 'gate' -> Step 2: 'question' -> ('pout' if NO) -> Step 3: 'celebrate'
  const [stage, setStage] = useState<'gate' | 'question' | 'pout' | 'celebrate'>('gate');

  const triggerConfetti = () => {
    confetti({
      particleCount: 90,
      spread: 75,
      origin: { y: 0.6 },
      colors: ['#FF5A82', '#FF8BA7', '#FFB6C1', '#FFFFFF', '#D81B60', '#FDE2E4'],
    });
  };

  const handleOpenGate = () => {
    setStage('question');
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
    <div className="relative z-10 min-h-[calc(100vh-5rem)] flex items-center justify-center px-4 py-12">
      {/* Decorative Top Badge */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 flex items-center gap-3 text-xs tracking-[0.25em] text-pink-500 uppercase font-cinzel font-semibold">
        <span className="w-8 h-[1.5px] bg-gradient-to-r from-transparent to-pink-300" />
        <span>{data.gateway.teaserBadge}</span>
        <span className="w-8 h-[1.5px] bg-gradient-to-l from-transparent to-pink-300" />
      </div>

      <div className="max-w-3xl w-full mx-auto text-center">
        {/* STAGE 1: INTRO GATE */}
        {stage === 'gate' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Top Companion Duo */}
            <div className="flex justify-center">
              <div className="relative p-3 rounded-full border-2 border-pink-200 bg-white/90 backdrop-blur-md shadow-xl shadow-pink-100">
                <CompanionCharacters mood="idle" size="lg" />
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-sm md:text-base font-cinzel text-pink-600 tracking-wider uppercase font-semibold">
                Dedicated to {data.global.recipientName}
              </p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif-title font-medium text-[#2D121F] tracking-tight leading-tight">
                {data.gateway.heading}
              </h1>
              <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto font-light leading-relaxed">
                {data.gateway.subheading}
              </p>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={handleOpenGate}
                className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-400 to-pink-500 text-white font-semibold text-base shadow-xl shadow-pink-200 hover:shadow-pink-300 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <Gift className="w-5 h-5 transition-transform group-hover:scale-110" />
                <span>{data.gateway.openBtnText}</span>
                <Sparkles className="w-4 h-4 text-pink-100" />
              </button>
            </div>
          </div>
        )}

        {/* STAGE 2: THE PLAYFUL QUESTION (Reference Video) */}
        {stage === 'question' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="flex justify-center">
              <div className="relative p-5 rounded-3xl border-2 border-pink-200 bg-white/95 backdrop-blur-lg shadow-xl shadow-pink-100">
                <CompanionCharacters mood="question" size="xl" />
              </div>
            </div>

            <div className="space-y-3">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-title font-semibold text-[#2D121F]">
                {data.gateway.questionText}
              </h2>
              <p className="text-sm sm:text-base text-slate-500">
                Choose carefully... (hint: there is only one true answer!)
              </p>
            </div>

            <div className="pt-4 flex items-center justify-center gap-6">
              <button
                onClick={handleYes}
                className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-400 hover:from-pink-600 hover:to-rose-500 text-white font-bold text-lg shadow-lg shadow-pink-200 hover:scale-105 active:scale-95 transition-all duration-200 flex items-center gap-2"
              >
                <Heart className="w-5 h-5 fill-current" />
                <span>{data.gateway.yesBtnText}</span>
              </button>

              <button
                onClick={handleNo}
                className="px-8 py-3.5 rounded-2xl bg-white hover:bg-pink-50 border border-pink-200 text-slate-700 hover:text-pink-600 font-medium text-lg shadow-sm hover:scale-95 transition-all duration-200"
              >
                {data.gateway.noBtnText}
              </button>
            </div>
          </div>
        )}

        {/* STAGE 2-B: WHY DID YOU CLICK NO?! (Harmless Playful reaction) */}
        {stage === 'pout' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="flex justify-center">
              <div className="relative p-5 rounded-3xl border-2 border-rose-200 bg-white/95 backdrop-blur-lg shadow-xl shadow-rose-100">
                <CompanionCharacters mood="pout" size="xl" />
              </div>
            </div>

            <div className="space-y-3 max-w-lg mx-auto">
              <h2 className="text-3xl sm:text-4xl font-serif-title font-bold text-rose-500">
                {data.gateway.noReactionTitle}
              </h2>
              <p className="text-base text-slate-600 leading-relaxed">
                {data.gateway.noReactionSubtitle}
              </p>
            </div>

            <div className="pt-2 flex justify-center">
              <button
                onClick={handleTryAgain}
                className="inline-flex items-center gap-3 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-400 text-white font-bold text-base shadow-lg shadow-pink-200 hover:scale-105 active:scale-95 transition-all"
              >
                <RotateCcw className="w-5 h-5" />
                <span>{data.gateway.tryAgainBtnText}</span>
              </button>
            </div>
          </div>
        )}

        {/* STAGE 3: CELEBRATION UNVEILING */}
        {stage === 'celebrate' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="flex justify-center">
              <div className="relative p-5 rounded-3xl border-2 border-pink-200 bg-white/95 backdrop-blur-lg shadow-2xl shadow-pink-200/60">
                <CompanionCharacters mood="celebrate" size="xl" />
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-sm font-cinzel text-pink-500 tracking-widest uppercase font-bold">
                ✦ Official Celebration Time ✦
              </p>
              <h2 className="text-4xl sm:text-6xl md:text-7xl font-script text-pink-gradient py-2">
                {data.gateway.celebrationTitle}
              </h2>
              <p className="text-lg sm:text-xl text-slate-600 max-w-xl mx-auto font-light leading-relaxed">
                {data.gateway.celebrationSubtitle}
              </p>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={onNavigateNext}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-400 hover:from-pink-600 hover:to-rose-500 text-white font-bold text-base shadow-xl shadow-pink-200 hover:scale-105 transition-all"
              >
                <span>{data.gateway.enterSurpriseBtnText}</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={() => onNavigateToPage(5)}
                className="px-6 py-4 rounded-2xl bg-pink-50 hover:bg-pink-100 border border-pink-200 text-pink-700 font-medium text-sm transition-all shadow-sm"
              >
                Jump Straight to Surprise Room 🎁
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
