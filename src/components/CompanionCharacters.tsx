import React from 'react';

export type CompanionMood = 
  | 'idle' 
  | 'question' 
  | 'welcome' 
  | 'pout' 
  | 'hit' 
  | 'celebrate' 
  | 'cake' 
  | 'dance' 
  | 'party' 
  | 'hug' 
  | 'music' 
  | 'rest' 
  | 'letter' 
  | 'kiss';

interface CompanionProps {
  mood?: CompanionMood;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'custom';
  className?: string;
  speechBubble?: string;
}

export const CompanionCharacters: React.FC<CompanionProps> = ({
  mood = 'question',
  size = 'md',
  className = '',
  speechBubble,
}) => {
  // Map moods to the authentic Bubu & Dudu animations extracted from reference video
  const getAssetForMood = (m: CompanionMood) => {
    switch (m) {
      case 'pout':
      case 'hit':
        return {
          src: '/assets/bubu_hitting_dudu.gif',
          alt: 'Bubu hitting Dudu playfully',
          aspectRatio: '100 / 98',
        };
      case 'cake':
      case 'celebrate':
        return {
          src: '/assets/bubu_dudu_cake.gif',
          alt: 'Bubu and Dudu with Birthday Cake',
          aspectRatio: '110 / 78',
        };
      case 'dance':
      case 'party':
        return {
          src: '/assets/bubu_dudu_dancing.gif',
          alt: 'Bubu and Dudu dancing with party hats',
          aspectRatio: '105 / 75',
        };
      case 'hug':
        return {
          src: '/assets/bubu_dudu_hug.gif',
          alt: 'Bubu and Dudu hugging',
          aspectRatio: '90 / 72',
        };
      case 'music':
      case 'rest':
        return {
          src: '/assets/bubu_dudu_rest.gif',
          alt: 'Bubu and Dudu resting together',
          aspectRatio: '80 / 70',
        };
      case 'letter':
      case 'kiss':
        return {
          src: '/assets/bubu_dudu_kiss.gif',
          alt: 'Bubu and Dudu kissing',
          aspectRatio: '85 / 65',
        };
      case 'idle':
      case 'question':
      case 'welcome':
      default:
        return {
          src: '/assets/bubu_dudu_welcome.gif',
          alt: 'Bubu in box and Dudu waving',
          aspectRatio: '160 / 105',
        };
    }
  };

  const asset = getAssetForMood(mood);

  const sizeClass = {
    sm: 'w-24 max-w-full',
    md: 'w-48 sm:w-56 max-w-full',
    lg: 'w-64 sm:w-72 max-w-full',
    xl: 'w-80 sm:w-96 max-w-full',
    custom: '',
  }[size];

  return (
    <div className={`relative inline-flex flex-col items-center justify-center select-none ${className}`}>
      {speechBubble && (
        <div className="mb-2 px-3 py-1.5 rounded-full bg-white text-[#C92A2A] text-xs sm:text-sm font-bubble font-semibold shadow-md border border-pink-200 animate-bounce relative">
          {speechBubble}
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-r border-b border-pink-200 rotate-45" />
        </div>
      )}
      <div className={`relative flex items-center justify-center ${sizeClass}`}>
        <img
          src={asset.src}
          alt={asset.alt}
          className="w-full h-auto object-contain drop-shadow-md rounded-2xl"
          style={{ imageRendering: 'auto' }}
          loading="eager"
        />
      </div>
    </div>
  );
};
