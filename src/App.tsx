/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  BirthdayState, 
  loadStoredBirthdayData, 
  saveStoredBirthdayData 
} from './types/birthday';
import { GoldenStarsBackground } from './components/GoldenStarsBackground';
import { TopNavbar } from './components/TopNavbar';
import { CustomizerModal } from './components/CustomizerModal';
import { Sliders } from 'lucide-react';

// 7 Distinct Pages
import { GatewayPage } from './pages/GatewayPage';
import { GalleryPage } from './pages/GalleryPage';
import { LetterPage } from './pages/LetterPage';
import { MusicRoomPage } from './pages/MusicRoomPage';
import { SurpriseRoomPage } from './pages/SurpriseRoomPage';
import { MiniGamePage } from './pages/MiniGamePage';
import { FinalePage } from './pages/FinalePage';

export default function App() {
  const [data, setData] = useState<BirthdayState>(loadStoredBirthdayData);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState<boolean>(false);
  const [customizerTab, setCustomizerTab] = useState<'global' | 'gateway' | 'gallery' | 'letter' | 'music' | 'hub' | 'quiz' | 'finale' | 'backup'>('global');

  // Sync title with recipient
  useEffect(() => {
    if (data.global.websiteTitle) {
      document.title = data.global.websiteTitle;
    }
  }, [data.global.websiteTitle]);

  // Keyboard navigation shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't hijack if user is typing in an input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }
      if (e.key === 'ArrowRight' && currentPage < 7) {
        setCurrentPage((p) => Math.min(7, p + 1));
      } else if (e.key === 'ArrowLeft' && currentPage > 1) {
        setCurrentPage((p) => Math.max(1, p - 1));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage]);

  const handleOpenCustomizer = (tab: 'global' | 'gateway' | 'gallery' | 'letter' | 'music' | 'hub' | 'quiz' | 'finale' | 'backup' = 'global') => {
    setCustomizerTab(tab);
    setIsCustomizerOpen(true);
  };

  const handleUpdateGallery = (updatedGallery: BirthdayState['gallery']) => {
    const updated = { ...data, gallery: updatedGallery };
    setData(updated);
    saveStoredBirthdayData(updated);
  };

  const handleUpdateMusic = (updatedMusic: BirthdayState['music']) => {
    const updated = { ...data, music: updatedMusic };
    setData(updated);
    saveStoredBirthdayData(updated);
  };

  const handleSaveData = (newData: BirthdayState) => {
    setData(newData);
    saveStoredBirthdayData(newData);
  };

  return (
    <div className="min-h-screen bg-[#FFF5F7] text-[#2D121F] flex flex-col relative selection:bg-[#FFB6C1]/50 selection:text-[#9A1750]">
      {/* Background Floating Pink Hearts & Sparkles */}
      <GoldenStarsBackground />

      {/* Top Navigation */}
      <TopNavbar
        currentPage={currentPage}
        data={data}
        onNavigateToPage={(p) => {
          setCurrentPage(p);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenCustomizer={() => handleOpenCustomizer('global')}
      />

      {/* Main Experience Viewport */}
      <main className="flex-1 relative z-10 pb-16">
        {currentPage === 1 && (
          <GatewayPage
            data={data}
            onNavigateNext={() => {
              setCurrentPage(2);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateToPage={(p) => {
              setCurrentPage(p);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenCustomizer={handleOpenCustomizer}
          />
        )}

        {currentPage === 2 && (
          <GalleryPage
            data={data}
            onUpdateGallery={handleUpdateGallery}
            onNavigateNext={() => {
              setCurrentPage(3);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigatePrev={() => {
              setCurrentPage(5);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenCustomizer={handleOpenCustomizer}
          />
        )}

        {currentPage === 3 && (
          <LetterPage
            data={data}
            onNavigateNext={() => {
              setCurrentPage(4);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigatePrev={() => {
              setCurrentPage(5);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenCustomizer={handleOpenCustomizer}
          />
        )}

        {currentPage === 4 && (
          <MusicRoomPage
            data={data}
            onUpdateMusic={handleUpdateMusic}
            onNavigateNext={() => {
              setCurrentPage(5);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigatePrev={() => {
              setCurrentPage(5);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenCustomizer={handleOpenCustomizer}
          />
        )}

        {currentPage === 5 && (
          <SurpriseRoomPage
            data={data}
            onNavigateToPage={(p) => {
              setCurrentPage(p);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateNext={() => {
              setCurrentPage(6);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigatePrev={() => {
              setCurrentPage(1);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenCustomizer={handleOpenCustomizer}
          />
        )}

        {currentPage === 6 && (
          <MiniGamePage
            data={data}
            onNavigateNext={() => {
              setCurrentPage(7);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigatePrev={() => {
              setCurrentPage(5);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentPage === 7 && (
          <FinalePage
            data={data}
            onNavigateToPage={(p) => {
              setCurrentPage(p);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigatePrev={() => {
              setCurrentPage(6);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}
      </main>

      {/* Floating Bottom Page Indicator */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/95 border border-pink-200 shadow-xl backdrop-blur-md">
          {[1, 2, 3, 4, 5, 6, 7].map((page) => (
            <button
              key={page}
              onClick={() => {
                setCurrentPage(page);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`h-2.5 rounded-full transition-all cursor-pointer ${
                currentPage === page
                  ? 'w-6 bg-gradient-to-r from-pink-500 to-rose-400'
                  : 'w-2.5 bg-pink-100 hover:bg-pink-300'
              }`}
              title={`Page ${page}`}
            />
          ))}
        </div>
      </div>

      {/* Always-Visible Floating Customize Option */}
      <div className="fixed bottom-4 right-4 z-30">
        <button
          onClick={() => handleOpenCustomizer('global')}
          className="px-4 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 text-white font-bubble text-xs sm:text-sm font-bold shadow-xl shadow-pink-300/60 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 border-2 border-white/90 cursor-pointer"
          title="Customize Recipient, Message, Photos & Music"
        >
          <Sliders className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span>Customize</span>
        </button>
      </div>

      {/* Customization Drawer / Modal */}
      <CustomizerModal
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        data={data}
        onSaveData={handleSaveData}
        initialTab={customizerTab}
      />
    </div>
  );
}
