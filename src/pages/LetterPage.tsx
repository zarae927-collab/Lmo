import React, { useState } from 'react';
import { BirthdayState } from '../types/birthday';
import { ChevronLeft, ChevronRight, Key } from 'lucide-react';

interface LetterPageProps {
  data: BirthdayState;
  onNavigateNext: () => void;
  onNavigatePrev: () => void;
  onOpenCustomizer?: (tab?: 'global' | 'gateway' | 'gallery' | 'letter' | 'music' | 'hub' | 'quiz' | 'finale' | 'backup') => void;
}

export const LetterPage: React.FC<LetterPageProps> = ({
  data,
  onNavigatePrev,
  onOpenCustomizer,
}) => {
  const { letter, global } = data;
  const [showHidden, setShowHidden] = useState(false);

  return (
    <div className="relative z-10 min-h-[calc(100vh-4rem)] flex flex-col justify-center px-4 py-8 overflow-hidden">
      {/* Background: Pastel cyan & white vertical stripes with scattered pink stars (Video 0:31 - 0:33) */}
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

      <div className="max-w-4xl w-full mx-auto relative">
        {/* Main Card (Exact layout from Video Frame 32 & 34 "The sweet Letter") */}
        <div className="animate-fadeIn bg-white/95 border-2 border-pink-200 rounded-3xl p-6 sm:p-10 shadow-2xl shadow-pink-100/60 flex flex-col md:flex-row items-center gap-8 md:gap-12 relative">
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

          {/* Left Column: Stamp Framed photo with yellow stars & kissing Bubu & Dudu (Frame 32) */}
          <div className="w-full md:w-5/12 flex flex-col items-center relative">
            <div className="relative p-3 bg-white rounded-2xl shadow-lg border-4 border-[#F06292] max-w-xs w-full text-center relative">
              {/* Bright Yellow Decorative Stars at Corners (Frame 32) */}
              <span className="absolute -top-4 -left-4 text-[#FDD835] text-3xl drop-shadow select-none">★</span>
              <span className="absolute -top-4 -right-4 text-[#FDD835] text-3xl drop-shadow select-none">★</span>
              <span className="absolute -bottom-4 -right-4 text-[#FDD835] text-3xl drop-shadow select-none">★</span>

              <div className="aspect-square w-full overflow-hidden rounded-xl bg-pink-50 border border-pink-100">
                <img
                  src={letter.photoUrl || (data.gallery.photos[0] ? data.gallery.photos[0].url : 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80')}
                  alt="Dedicated person"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Speech bubble "I love you! 20/5" */}
              <div className="mt-2 inline-block bg-pink-50 border border-pink-200 rounded-full px-3 py-1 shadow-xs">
                <span className="font-bubble text-xs text-[#E91E63] font-bold">
                  {letter.photoCaption || 'I love you! 20/5'}
                </span>
              </div>

              {/* Signet: "With love, Betu" */}
              <div className="mt-1 text-center">
                <p className="font-cute text-xs text-slate-600 font-semibold">
                  {letter.signOff || 'With love,'} {global.recipientName}
                </p>
              </div>
            </div>

            {/* Authentic Kissing Bubu & Dudu at bottom-left of stamp photo (Frame 32 & 34) */}
            <div className="mt-3 flex items-center gap-2">
              <img
                src="/assets/bubu_dudu_kiss.gif"
                alt="Bubu and Dudu kissing"
                className="w-20 sm:w-24 h-auto drop-shadow-sm select-none"
                loading="eager"
              />
              <span className="font-cute text-xs text-[#E91E63] font-bold">
                Forever yours ♡
              </span>
            </div>
          </div>

          {/* Right Column: "The sweet Letter" Calligraphy and Prose (Frame 32 & 34) */}
          <div className="w-full md:w-7/12 space-y-4 text-left">
            <div>
              <h2 className="font-script text-4xl sm:text-5xl md:text-6xl text-[#E91E63] leading-tight">
                {letter.letterTitle || 'The sweet Letter'}
              </h2>
            </div>

            <div className="space-y-3 font-cute text-sm sm:text-base text-slate-800 leading-relaxed font-medium">
              {letter.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {/* Secret message toggle */}
            <div className="pt-2">
              {!showHidden ? (
                <button
                  onClick={() => setShowHidden(true)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-pink-100/80 hover:bg-pink-200 text-[#D81B60] font-bubble text-xs font-bold transition-all shadow-xs cursor-pointer"
                >
                  <Key className="w-3.5 h-3.5" />
                  <span>{letter.hiddenMessagePrompt || 'Click to reveal hidden message 💌'}</span>
                </button>
              ) : (
                <div className="p-4 rounded-2xl bg-gradient-to-r from-pink-50 via-rose-50 to-pink-50 border-2 border-pink-300 shadow-inner animate-fadeIn space-y-1">
                  <span className="font-bubble text-xs text-[#E91E63] font-bold">
                    A Little Secret for You:
                  </span>
                  <p className="font-cute text-sm text-slate-800 font-semibold">
                    {letter.hiddenMessage || 'P.S. You will always be my favorite person in the whole universe. Happy Birthday! ❤️'}
                  </p>
                </div>
              )}
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
              onClick={() => onOpenCustomizer('letter')}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-pink-500 to-rose-400 text-white font-bubble text-xs font-bold shadow-sm hover:scale-105 transition-all cursor-pointer"
            >
              💌 Edit Letter Text
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
