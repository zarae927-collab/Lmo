import React from 'react';
import confetti from 'canvas-confetti';
import { BirthdayState, SurpriseItem } from '../types/birthday';
import { SurpriseObject } from '../components/SurpriseObjects';
import { ChevronLeft } from 'lucide-react';

interface SurpriseRoomPageProps {
  data: BirthdayState;
  onNavigateToPage: (pageIndex: number) => void;
  onNavigateNext: () => void;
  onNavigatePrev: () => void;
  onOpenCustomizer?: (tab?: 'global' | 'gateway' | 'gallery' | 'letter' | 'music' | 'hub' | 'quiz' | 'finale' | 'backup') => void;
}

export const SurpriseRoomPage: React.FC<SurpriseRoomPageProps> = ({
  data,
  onNavigateToPage,
  onNavigatePrev,
  onOpenCustomizer,
}) => {
  const { surpriseHub } = data;

  const handleItemClick = (item: SurpriseItem) => {
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FF4081', '#FF80AB', '#FFD166', '#FFFFFF'],
    });
    // Navigate into the chosen surprise experience just like the video
    onNavigateToPage(item.targetPage);
  };

  return (
    <div className="relative z-10 min-h-[calc(100vh-4rem)] flex flex-col justify-center px-4 py-8 overflow-hidden">
      {/* Background: Pastel cyan & white vertical stripes with scattered pink stars (Video 0:12 - 0:14) */}
      <div 
        className="absolute inset-0 -z-10"
        style={{
          background: 'repeating-linear-gradient(90deg, #E8F4F8, #E8F4F8 28px, #F4FAFC 28px, #F4FAFC 56px)',
        }}
      />

      {/* Decorative Pastel Pink Stars scattered on the sides */}
      <div className="absolute top-10 left-6 sm:left-12 text-[#F48FB1] text-3xl select-none animate-pulse">★</div>
      <div className="absolute top-28 left-16 sm:left-24 text-[#F06292] text-2xl select-none">★</div>
      <div className="absolute bottom-16 left-8 sm:left-14 text-[#F48FB1] text-4xl select-none">★</div>

      <div className="absolute top-10 right-6 sm:right-12 text-[#F48FB1] text-3xl select-none animate-pulse">★</div>
      <div className="absolute top-28 right-16 sm:right-24 text-[#F06292] text-2xl select-none">★</div>
      <div className="absolute bottom-16 right-8 sm:right-14 text-[#F48FB1] text-4xl select-none">★</div>

      <div className="max-w-4xl w-full mx-auto text-center space-y-12">
        {/* Banner Title: "CLICK ON ANY ITEM TO OPEN" in cute rounded pink font with shadow */}
        <div className="space-y-2">
          <h1 className="font-bubble text-3xl sm:text-5xl md:text-6xl font-bold text-[#EC407A] tracking-wider drop-shadow-[0_2px_4px_rgba(236,64,122,0.3)] uppercase">
            {surpriseHub.heading || 'CLICK ON ANY ITEM TO OPEN'}
          </h1>
          <p className="font-cute text-sm sm:text-base text-slate-600 font-semibold">
            Choose a surprise to begin your birthday journey ✨
          </p>
        </div>

        {/* The 3 Interactive Items directly in a row (Matching Reference Video Frame 13) */}
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 md:gap-20 max-w-3xl mx-auto py-4">
          {/* 1. Yellow Camera -> Photos */}
          <div
            onClick={() => handleItemClick({
              id: 'camera',
              title: 'Memories & Photos',
              subtitle: 'Click to open photos',
              icon: 'camera',
              revealTitle: 'To my love,',
              revealContent: '',
              targetPage: 2,
            })}
            className="group cursor-pointer flex flex-col items-center transition-all duration-300"
          >
            <SurpriseObject type="camera" />
            <span className="mt-3 px-4 py-1.5 rounded-full bg-white/90 text-[#37474F] font-bubble text-sm font-bold shadow-md border border-pink-100 group-hover:bg-[#FF4081] group-hover:text-white transition-all">
              Photos & Memories 📷
            </span>
          </div>

          {/* 2. Lavender Envelope -> Letter */}
          <div
            onClick={() => handleItemClick({
              id: 'envelope',
              title: 'The sweet Letter',
              subtitle: 'Click to read letter',
              icon: 'envelope',
              revealTitle: 'The sweet Letter',
              revealContent: '',
              targetPage: 3,
            })}
            className="group cursor-pointer flex flex-col items-center transition-all duration-300"
          >
            <SurpriseObject type="envelope" />
            <span className="mt-3 px-4 py-1.5 rounded-full bg-white/90 text-[#37474F] font-bubble text-sm font-bold shadow-md border border-pink-100 group-hover:bg-[#7E57C2] group-hover:text-white transition-all">
              Birthday Letter 💌
            </span>
          </div>

          {/* 3. Cassette Tape -> Music */}
          <div
            onClick={() => handleItemClick({
              id: 'cassette',
              title: 'Birthday Song',
              subtitle: 'Click to play song',
              icon: 'cassette',
              revealTitle: 'HAAREYA <3',
              revealContent: '',
              targetPage: 4,
            })}
            className="group cursor-pointer flex flex-col items-center transition-all duration-300"
          >
            <SurpriseObject type="cassette" />
            <span className="mt-3 px-4 py-1.5 rounded-full bg-white/90 text-[#37474F] font-bubble text-sm font-bold shadow-md border border-pink-100 group-hover:bg-[#E63946] group-hover:text-white transition-all">
              Special Song 🎵
            </span>
          </div>
        </div>

        {/* Navigation & Customization controls */}
        <div className="pt-6 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={onNavigatePrev}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white text-slate-700 hover:text-pink-600 border border-pink-200 text-xs font-bubble font-bold shadow-sm transition-all hover:scale-105 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to Gateway</span>
          </button>

          {onOpenCustomizer && (
            <button
              onClick={() => onOpenCustomizer('hub')}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-pink-500 to-rose-400 text-white text-xs font-bubble font-bold shadow-sm hover:scale-105 transition-all cursor-pointer"
            >
              <span>⚙️ Customize Surprise Items</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
