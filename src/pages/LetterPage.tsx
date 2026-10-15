import React, { useState } from 'react';
import { BirthdayState } from '../types/birthday';
import { Sparkles, Mail, Heart, ChevronLeft, ChevronRight, Key, Eye } from 'lucide-react';

interface LetterPageProps {
  data: BirthdayState;
  onNavigateNext: () => void;
  onNavigatePrev: () => void;
}

export const LetterPage: React.FC<LetterPageProps> = ({
  data,
  onNavigateNext,
  onNavigatePrev,
}) => {
  const { letter, global } = data;
  const [isOpen, setIsOpen] = useState(false);
  const [showHidden, setShowHidden] = useState(false);

  return (
    <div className="relative z-10 max-w-5xl mx-auto px-4 py-8 md:py-12">
      {/* Page Header */}
      <div className="text-center space-y-3 mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-pink-200 bg-white/80 text-xs tracking-widest text-pink-600 uppercase font-cinzel font-semibold shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-pink-500" />
          <span>Page 3 of 7 · Heartfelt Letter</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-title font-medium text-[#2D121F] tracking-tight">
          {letter.heading}
        </h2>
        <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto font-light">
          A personal note penned from the depths of the heart, waiting to be unsealed.
        </p>
      </div>

      {/* ENVELOPE INTERACTION CONTAINER */}
      {!isOpen ? (
        <div className="flex flex-col items-center justify-center py-10 space-y-8 animate-fadeIn">
          {/* Big Interactive Envelope (Pastel Pink & Cream Aesthetic) */}
          <div
            onClick={() => setIsOpen(true)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') setIsOpen(true);
            }}
            className="group relative cursor-pointer select-none transform hover:-translate-y-2 hover:scale-105 transition-all duration-300"
          >
            {/* Soft Pink Glow */}
            <div className="absolute -inset-4 bg-gradient-to-r from-pink-300/30 via-rose-300/40 to-pink-300/30 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity" />

            <div className="relative w-80 sm:w-96 h-56 rounded-3xl bg-gradient-to-b from-[#FFF0F4] to-[#FFE4EC] border-2 border-pink-300 shadow-2xl shadow-pink-200/60 p-6 flex flex-col items-center justify-center overflow-hidden">
              {/* Envelope Flap Lines */}
              <div className="absolute inset-0 pointer-events-none">
                <svg viewBox="0 0 384 224" className="w-full h-full" fill="none">
                  <path d="M 0 0 L 192 120 L 384 0" stroke="#FFB3C6" strokeWidth="2" fill="rgba(255,182,193,0.15)" />
                  <path d="M 0 224 L 140 100" stroke="#FFB3C6" strokeWidth="1.5" opacity="0.6" />
                  <path d="M 384 224 L 244 100" stroke="#FFB3C6" strokeWidth="1.5" opacity="0.6" />
                </svg>
              </div>

              {/* Center Wax Seal in Berry Rose */}
              <div className="relative z-10 w-20 h-20 rounded-full bg-gradient-to-br from-rose-400 via-pink-500 to-rose-600 p-1 shadow-lg shadow-pink-300 flex items-center justify-center transform group-hover:rotate-6 transition-transform">
                <div className="w-full h-full rounded-full border border-pink-200/50 flex flex-col items-center justify-center text-white">
                  <Heart className="w-6 h-6 fill-current text-white" />
                  <span className="text-[9px] font-bold tracking-wider font-cinzel mt-0.5">
                    {letter.envelopeSealText || 'SEALED'}
                  </span>
                </div>
              </div>

              <div className="relative z-10 mt-4 text-center">
                <p className="text-xs uppercase tracking-widest text-pink-700 font-cinzel font-bold">
                  For {global.recipientName}
                </p>
                <p className="text-[11px] text-pink-600 font-sans mt-0.5">
                  Click to break the seal and read
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsOpen(true)}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-400 text-white font-bold text-sm shadow-lg shadow-pink-200 hover:scale-105 transition-all"
          >
            <Mail className="w-4 h-4" />
            <span>Open The Letter</span>
          </button>
        </div>
      ) : (
        /* UNSEALED LETTER VIEW */
        <div className="animate-fadeIn space-y-8">
          <div className="relative bg-white text-slate-800 rounded-3xl p-6 sm:p-10 md:p-12 shadow-2xl shadow-pink-100/80 border-4 border-pink-200 max-w-4xl mx-auto overflow-hidden">
            {/* Background Parchment watermark & borders */}
            <div className="absolute top-4 left-4 right-4 bottom-4 border border-pink-200/80 rounded-2xl pointer-events-none" />
            <div className="absolute top-6 left-6 right-6 bottom-6 border border-pink-100 rounded-xl pointer-events-none" />

            {/* Corner Decorative flourishes */}
            <span className="absolute top-6 left-6 text-pink-400 text-xl select-none">✤</span>
            <span className="absolute top-6 right-6 text-pink-400 text-xl select-none">✤</span>
            <span className="absolute bottom-6 left-6 text-pink-400 text-xl select-none">✤</span>
            <span className="absolute bottom-6 right-6 text-pink-400 text-xl select-none">✤</span>

            <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
              {/* Left Column: Framed photo & signet */}
              <div className="w-full md:w-64 shrink-0 flex flex-col items-center">
                <div className="relative p-3 bg-white rounded-2xl shadow-lg border-2 border-pink-200 transform -rotate-2 hover:rotate-0 transition-transform">
                  <div className="w-48 h-56 sm:w-52 sm:h-60 overflow-hidden rounded-xl bg-pink-50">
                    <img
                      src={letter.photoUrl || (data.gallery.photos[0] ? data.gallery.photos[0].url : 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80')}
                      alt="Dedicated photograph"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="pt-3 text-center">
                    <p className="font-script text-2xl text-pink-600">
                      {letter.photoCaption || 'I love you! ❤️'}
                    </p>
                    <p className="text-xs text-slate-500 font-sans mt-0.5">
                      With love, {global.recipientName}
                    </p>
                  </div>
                </div>

                {/* Return Seal button */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="mt-6 text-xs text-pink-600 hover:text-pink-800 underline flex items-center gap-1 font-medium"
                >
                  <span>Close envelope</span>
                </button>
              </div>

              {/* Right Column: Letter Prose */}
              <div className="flex-1 space-y-6">
                <div>
                  <h3 className="font-script text-4xl sm:text-5xl text-pink-600 leading-tight">
                    {letter.letterTitle}
                  </h3>
                  <p className="font-serif text-lg font-semibold text-slate-700 mt-2">
                    {letter.salutation} {global.recipientName},
                  </p>
                </div>

                <div className="space-y-4 font-serif text-base sm:text-lg text-slate-700 leading-relaxed">
                  {letter.paragraphs.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>

                {/* Sign-off */}
                <div className="pt-4 border-t border-pink-100">
                  <p className="font-serif text-sm text-slate-500 italic">
                    {letter.signOff}
                  </p>
                  <p className="font-script text-3xl sm:text-4xl text-pink-600 mt-1">
                    {global.senderName}
                  </p>
                </div>

                {/* Secret Hidden Message Accordion */}
                <div className="pt-4">
                  {!showHidden ? (
                    <button
                      onClick={() => setShowHidden(true)}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-pink-50 hover:bg-pink-100 border border-pink-200 text-pink-700 font-semibold text-xs transition-colors shadow-xs"
                    >
                      <Key className="w-3.5 h-3.5 text-pink-500" />
                      <span>{letter.hiddenMessagePrompt}</span>
                    </button>
                  ) : (
                    <div className="p-4 rounded-2xl bg-pink-50/70 border border-pink-200 text-pink-900 space-y-2 animate-fadeIn shadow-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-xs uppercase font-cinzel font-bold tracking-wider text-pink-800 flex items-center gap-1.5">
                          <Eye className="w-3.5 h-3.5 text-pink-600" />
                          <span>Secret Unveiled</span>
                        </span>
                        <button
                          onClick={() => setShowHidden(false)}
                          className="text-xs text-pink-700 hover:text-pink-950 font-medium"
                        >
                          Hide
                        </button>
                      </div>
                      <p className="font-serif text-sm sm:text-base italic leading-relaxed text-[#2D121F]">
                        {letter.hiddenMessage}
                      </p>
                    </div>
                  )}
                </div>
              </div>
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
          <span>Previous: Memories</span>
        </button>

        <button
          onClick={onNavigateNext}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-400 text-white font-semibold text-sm shadow-md shadow-pink-200 hover:scale-105 transition-all"
        >
          <span>Next: Music & Vibe</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
