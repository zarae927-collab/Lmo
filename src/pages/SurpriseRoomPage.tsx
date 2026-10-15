import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { BirthdayState, SurpriseItem } from '../types/birthday';
import { SurpriseObject } from '../components/SurpriseObjects';
import { Sparkles, Trophy, ArrowRight, ChevronLeft, ChevronRight, X, ExternalLink } from 'lucide-react';

interface SurpriseRoomPageProps {
  data: BirthdayState;
  onNavigateToPage: (pageIndex: number) => void;
  onNavigateNext: () => void;
  onNavigatePrev: () => void;
}

export const SurpriseRoomPage: React.FC<SurpriseRoomPageProps> = ({
  data,
  onNavigateToPage,
  onNavigateNext,
  onNavigatePrev,
}) => {
  const { surpriseHub } = data;
  const [unlockedIds, setUnlockedIds] = useState<string[]>(['camera']);
  const [selectedItem, setSelectedItem] = useState<SurpriseItem | null>(null);

  const handleItemClick = (item: SurpriseItem) => {
    if (!unlockedIds.includes(item.id)) {
      setUnlockedIds([...unlockedIds, item.id]);
      confetti({
        particleCount: 60,
        spread: 65,
        origin: { y: 0.6 },
        colors: ['#FF5A82', '#FF8BA7', '#FFB6C1', '#FFFFFF'],
      });
    }
    setSelectedItem(item);
  };

  const discoveredCount = unlockedIds.length;
  const totalCount = surpriseHub.items.length;

  return (
    <div className="relative z-10 max-w-6xl mx-auto px-4 py-8 md:py-12">
      {/* Header */}
      <div className="text-center space-y-3 mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-pink-200 bg-white/80 text-xs tracking-widest text-pink-600 uppercase font-cinzel font-semibold shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-pink-500" />
          <span>Page 5 of 7 · The Interactive Surprise Vault</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-title font-medium text-[#2D121F] tracking-tight">
          {surpriseHub.heading}
        </h2>
        <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto font-light">
          {surpriseHub.subheading}
        </p>

        {/* Discovery Progress Tracker */}
        <div className="pt-2 flex items-center justify-center">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-white border border-pink-200 shadow-sm">
            <Trophy className="w-4 h-4 text-pink-500" />
            <span className="text-xs font-cinzel uppercase tracking-wider text-slate-700 font-bold">
              {discoveredCount} of {totalCount} Surprises Discovered
            </span>
            <div className="w-20 h-2 bg-pink-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-pink-400 to-rose-500 rounded-full transition-all duration-500"
                style={{ width: `${(discoveredCount / totalCount) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* The 4 Interactive Objects Hub (Directly inspired by Reference Video 0:10 "CLICK ON ANY ITEM TO OPEN") */}
      <div className="py-8">
        <div className="p-8 sm:p-12 rounded-3xl border-2 border-pink-200 bg-white/90 backdrop-blur-xl shadow-2xl shadow-pink-100">
          <div className="text-center mb-10">
            <h3 className="font-cinzel text-xs sm:text-sm tracking-[0.2em] text-pink-600 uppercase font-bold">
              ✦ CLICK ON ANY ITEM TO UNVEIL ITS SECRET ✦
            </h3>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 items-center justify-items-center">
            {surpriseHub.items.map((item) => (
              <div key={item.id} className="flex flex-col items-center space-y-3">
                <SurpriseObject
                  type={item.id}
                  unlocked={unlockedIds.includes(item.id)}
                  onClick={() => handleItemClick(item)}
                />
                <div className="text-center">
                  <h4 className="font-serif text-base sm:text-lg text-[#2D121F] font-semibold">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-500 font-sans">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* REVEAL MODAL */}
      {selectedItem && (
        <div
          onClick={() => setSelectedItem(null)}
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-md w-full bg-white border-2 border-pink-300 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl text-center"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Object Graphic in Modal */}
            <div className="flex justify-center -mt-2">
              <SurpriseObject type={selectedItem.id} unlocked={true} />
            </div>

            <div className="space-y-2">
              <span className="text-xs uppercase font-cinzel text-pink-600 tracking-widest font-bold">
                Surprise Unlocked
              </span>
              <h3 className="text-2xl font-serif text-[#2D121F] font-bold">
                {selectedItem.revealTitle}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-light">
                {selectedItem.revealContent}
              </p>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  onNavigateToPage(selectedItem.targetPage);
                  setSelectedItem(null);
                }}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-400 text-white font-bold text-sm shadow-md shadow-pink-200 flex items-center justify-center gap-2 hover:scale-[1.02] transition-all"
              >
                <span>Jump to this Experience</span>
                <ExternalLink className="w-4 h-4" />
              </button>
              <button
                onClick={() => setSelectedItem(null)}
                className="w-full py-2.5 rounded-2xl bg-pink-50 hover:bg-pink-100 text-pink-700 text-xs font-medium transition-colors"
              >
                Keep Exploring Room
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Controls */}
      <div className="mt-12 pt-6 border-t border-pink-200 flex items-center justify-between">
        <button
          onClick={onNavigatePrev}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl border border-pink-200 bg-white text-slate-700 hover:text-pink-600 hover:bg-pink-50 text-sm shadow-sm transition-all"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous: Music Room</span>
        </button>

        <button
          onClick={onNavigateNext}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-400 text-white font-semibold text-sm shadow-md shadow-pink-200 hover:scale-105 transition-all"
        >
          <span>Next: Birthday Challenge</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
