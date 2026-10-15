import React, { useState } from 'react';
import { BirthdayState } from '../types/birthday';
import { Sliders, Sparkles, Menu, X, Heart } from 'lucide-react';

interface TopNavbarProps {
  currentPage: number;
  data: BirthdayState;
  onNavigateToPage: (page: number) => void;
  onOpenCustomizer: () => void;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({
  currentPage,
  data,
  onNavigateToPage,
  onOpenCustomizer,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { page: 1, label: 'Gateway' },
    { page: 2, label: 'Memories' },
    { page: 3, label: 'Letter' },
    { page: 4, label: 'Music' },
    { page: 5, label: 'Surprise Hub' },
    { page: 6, label: 'Quiz' },
    { page: 7, label: 'Finale' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/85 backdrop-blur-md border-b border-pink-100/80 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4 md:gap-8">
        {/* Zone 1: Brand title (One single text element) */}
        <button
          onClick={() => onNavigateToPage(1)}
          className="text-lg font-serif-title font-bold tracking-tight text-pink-600 hover:text-pink-700 whitespace-nowrap shrink-0 transition-colors flex items-center gap-2"
        >
          <Heart className="w-4 h-4 fill-pink-500 text-pink-500" />
          <span>{data.global.websiteTitle || 'Pink Birthday Surprise'}</span>
        </button>

        {/* Zone 2: Nav Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-cinzel font-medium text-slate-600">
          {navItems.map((item) => {
            const isActive = currentPage === item.page;
            return (
              <button
                key={item.page}
                onClick={() => onNavigateToPage(item.page)}
                className={`whitespace-nowrap shrink-0 py-1 transition-all ${
                  isActive
                    ? 'text-pink-600 font-bold border-b-2 border-pink-500'
                    : 'text-slate-600 hover:text-pink-600'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 Primary Action (Customize Website) */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onOpenCustomizer}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-rose-400 hover:from-pink-600 hover:to-rose-500 text-white font-bold text-xs shadow-md shadow-pink-200 hover:scale-105 active:scale-95 transition-all whitespace-nowrap shrink-0"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Customize Surprise</span>
            <span className="sm:hidden">Edit</span>
          </button>

          {/* Mobile hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-pink-50 text-pink-700 hover:bg-pink-100 border border-pink-200"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/95 border-b border-pink-200 px-4 py-4 space-y-2 animate-fadeIn shadow-lg">
          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => {
              const isActive = currentPage === item.page;
              return (
                <button
                  key={item.page}
                  onClick={() => {
                    onNavigateToPage(item.page);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full py-2.5 px-3 rounded-lg text-left text-xs font-cinzel transition-colors ${
                    isActive
                      ? 'bg-gradient-to-r from-pink-500 to-rose-400 text-white font-bold'
                      : 'bg-pink-50/70 text-slate-700 hover:bg-pink-100 hover:text-pink-700'
                  }`}
                >
                  {item.page}. {item.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
