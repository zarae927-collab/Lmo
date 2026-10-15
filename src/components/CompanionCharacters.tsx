import React from 'react';

interface EmblemProps {
  mood?: 'idle' | 'question' | 'pout' | 'celebrate' | 'music' | 'letter' | 'cake';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const CompanionCharacters: React.FC<EmblemProps> = ({
  mood = 'idle',
  size = 'md',
  className = '',
}) => {
  const sizeMap = {
    sm: 'w-20 h-20',
    md: 'w-32 h-32',
    lg: 'w-44 h-44',
    xl: 'w-56 h-56',
  };

  const containerClass = `${sizeMap[size]} relative flex items-center justify-center select-none ${className}`;

  if (mood === 'pout') {
    // Playful aesthetic: Romantic Mended Heart with soft blush and sparkle
    return (
      <div className={containerClass}>
        <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-xl" fill="none">
          {/* Soft background halo */}
          <circle cx="100" cy="100" r="75" fill="rgba(255, 182, 193, 0.2)" />
          <circle cx="100" cy="100" r="60" fill="rgba(255, 255, 255, 0.85)" stroke="#FFCCD5" strokeWidth="2" />

          {/* Broken / Pouting Heart with cute bandage */}
          <g transform="translate(100, 95)">
            {/* Heart Left Half */}
            <path
              d="M 0 -8 C -18 -38 -55 -28 -55 5 C -55 35 -10 60 0 72 C -3 45 -12 25 0 8 Z"
              fill="url(#poutHeartGrad)"
              stroke="#FF7597"
              strokeWidth="2"
            />
            {/* Heart Right Half */}
            <path
              d="M 0 -8 C 18 -38 55 -28 55 5 C 55 35 10 60 0 72 C 4 45 14 25 0 8 Z"
              fill="url(#poutHeartGrad)"
              stroke="#FF7597"
              strokeWidth="2"
            />

            {/* Cute pastel bandage holding the crack */}
            <g transform="rotate(-20)">
              <rect x="-24" y="14" width="48" height="18" rx="6" fill="#FFF0F3" stroke="#FF8BA7" strokeWidth="2" />
              <circle cx="-12" cy="23" r="2" fill="#FF8BA7" />
              <circle cx="0" cy="23" r="2" fill="#FF8BA7" />
              <circle cx="12" cy="23" r="2" fill="#FF8BA7" />
            </g>

            {/* Sweet playful expression: Soft teardrop jewel */}
            <path d="M 28 8 C 24 16 20 22 26 27 C 32 27 30 20 28 8 Z" fill="#64B5F6" opacity="0.85" />
            <circle cx="27" cy="22" r="1.5" fill="#FFFFFF" />

            {/* Rosy Cheeks */}
            <ellipse cx="-26" cy="22" rx="7" ry="4" fill="#FF8BA7" opacity="0.6" />
            <ellipse cx="26" cy="22" rx="7" ry="4" fill="#FF8BA7" opacity="0.6" />
          </g>

          {/* Floating tiny sorrow sparkles */}
          <path d="M 40 45 L 42 50 L 47 52 L 42 54 L 40 59 L 38 54 L 33 52 L 38 50 Z" fill="#FF8BA7" />
          <path d="M 160 55 L 162 59 L 166 60 L 162 61 L 160 65 L 158 61 L 154 60 L 158 59 Z" fill="#FFB3C6" />

          <defs>
            <linearGradient id="poutHeartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFAAA6" />
              <stop offset="100%" stopColor="#FF6B8B" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    );
  }

  if (mood === 'question') {
    // Aesthetic Question: Luxury Gift Box with a Golden Heart Key and Floating Love Note
    return (
      <div className={containerClass}>
        <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-xl" fill="none">
          {/* Radiant Soft Halo */}
          <circle cx="100" cy="100" r="75" fill="rgba(255, 182, 193, 0.25)" />
          <circle cx="100" cy="100" r="62" fill="rgba(255, 255, 255, 0.9)" stroke="#FFCCD5" strokeWidth="2" />

          {/* Sealed Note Peeking Out */}
          <g transform="translate(100, 72)">
            <rect x="-35" y="-22" width="70" height="44" rx="6" fill="#FFF0F5" stroke="#FF8BA7" strokeWidth="2" />
            <path d="M -35 -22 L 0 6 L 35 -22" stroke="#FF8BA7" strokeWidth="1.5" fill="none" />
            <circle cx="0" cy="6" r="6" fill="#FF5A82" />
            <path d="M 0 4 C 0 3 1.5 3 1.5 4 C 1.5 5 0 6.5 0 6.5 C 0 6.5 -1.5 5 -1.5 4 C -1.5 3 0 3 0 4 Z" fill="#FFFFFF" />
          </g>

          {/* Luxury Gift Box Base */}
          <g transform="translate(100, 115)">
            <rect x="-42" y="-20" width="84" height="54" rx="8" fill="#FFF5F8" stroke="#FF8BA7" strokeWidth="2.5" />
            <rect x="-46" y="-28" width="92" height="16" rx="6" fill="#FFE4EC" stroke="#FF8BA7" strokeWidth="2.5" />

            {/* Satin Ribbon */}
            <rect x="-6" y="-28" width="12" height="62" fill="#FF5A82" />
            <rect x="-42" y="2" width="84" height="12" fill="#FF5A82" />

            {/* Ribbon Bow */}
            <path d="M 0 -28 C -18 -48 -32 -32 -8 -28 Z" fill="#FF7597" stroke="#FF5A82" strokeWidth="1.5" />
            <path d="M 0 -28 C 18 -48 32 -32 8 -28 Z" fill="#FF7597" stroke="#FF5A82" strokeWidth="1.5" />
            <circle cx="0" cy="-28" r="5" fill="#FF5A82" />
          </g>

          {/* Floating Sparkles & Question Glint */}
          <path d="M 45 45 L 47 51 L 53 53 L 47 55 L 45 61 L 43 55 L 37 53 L 43 51 Z" fill="#FF5A82" />
          <path d="M 155 45 L 157 51 L 163 53 L 157 55 L 155 61 L 153 55 L 147 53 L 153 51 Z" fill="#FF5A82" />
        </svg>
      </div>
    );
  }

  if (mood === 'celebrate') {
    // Grand Celebration: Aesthetic Floating Pastel Balloons with Satin Ribbons & Sparklers
    return (
      <div className={containerClass}>
        <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-xl" fill="none">
          <circle cx="100" cy="100" r="75" fill="rgba(255, 182, 193, 0.25)" />
          <circle cx="100" cy="100" r="65" fill="rgba(255, 255, 255, 0.9)" stroke="#FFCCD5" strokeWidth="2" />

          {/* Confetti & Sparkles */}
          <circle cx="45" cy="45" r="3" fill="#FF5A82" />
          <circle cx="155" cy="40" r="3.5" fill="#FF8BA7" />
          <rect x="50" y="140" width="4" height="7" rx="1" fill="#FFCCD5" transform="rotate(30 50 140)" />
          <rect x="150" y="135" width="4" height="8" rx="1" fill="#FF7597" transform="rotate(-25 150 135)" />

          {/* Left Balloon (Soft Pearl Pink) */}
          <g transform="translate(75, 80)">
            <ellipse cx="0" cy="0" rx="26" ry="32" fill="url(#balloonGrad1)" stroke="#FF8BA7" strokeWidth="2" />
            <ellipse cx="-8" cy="-10" rx="6" ry="12" fill="#FFFFFF" opacity="0.6" transform="rotate(-20 -8 -10)" />
            <polygon points="0,32 -4,37 4,37" fill="#FF8BA7" />
            <path d="M 0 37 Q -5 55 10 75" stroke="#FF8BA7" strokeWidth="1.5" fill="none" strokeDasharray="2 2" />
          </g>

          {/* Right Balloon (Rose Pink) */}
          <g transform="translate(125, 75)">
            <ellipse cx="0" cy="0" rx="26" ry="32" fill="url(#balloonGrad2)" stroke="#FF5A82" strokeWidth="2" />
            <ellipse cx="-8" cy="-10" rx="6" ry="12" fill="#FFFFFF" opacity="0.6" transform="rotate(-20 -8 -10)" />
            <polygon points="0,32 -4,37 4,37" fill="#FF5A82" />
            <path d="M 0 37 Q 10 55 -5 75" stroke="#FF5A82" strokeWidth="1.5" fill="none" strokeDasharray="2 2" />
          </g>

          {/* Center Heart Balloon in Front */}
          <g transform="translate(100, 95)">
            <path
              d="M 0 -10 C -20 -35 -45 -22 -45 5 C -45 30 -5 50 0 60 C 5 50 45 30 45 5 C 45 -22 20 -35 0 -10 Z"
              fill="url(#balloonGradHeart)"
              stroke="#D81B60"
              strokeWidth="2"
            />
            <ellipse cx="-12" cy="0" rx="5" ry="9" fill="#FFFFFF" opacity="0.7" transform="rotate(-25 -12 0)" />
            <polygon points="0,60 -3,64 3,64" fill="#D81B60" />
            <path d="M 0 64 Q -6 80 5 95" stroke="#D81B60" strokeWidth="1.5" fill="none" />
          </g>

          {/* Star Sparkles */}
          <path d="M 100 25 L 102 31 L 108 33 L 102 35 L 100 41 L 98 35 L 92 33 L 98 31 Z" fill="#FF5A82" />

          <defs>
            <linearGradient id="balloonGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF0F5" />
              <stop offset="100%" stopColor="#FFB6C1" />
            </linearGradient>
            <linearGradient id="balloonGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFCCD5" />
              <stop offset="100%" stopColor="#FF7597" />
            </linearGradient>
            <linearGradient id="balloonGradHeart" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF6584" />
              <stop offset="100%" stopColor="#D81B60" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    );
  }

  // Default: Idle Luxury Gift Crest
  return (
    <div className={containerClass}>
      <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-xl" fill="none">
        <circle cx="100" cy="100" r="75" fill="rgba(255, 182, 193, 0.2)" />
        <circle cx="100" cy="100" r="62" fill="rgba(255, 255, 255, 0.9)" stroke="#FFCCD5" strokeWidth="2" />

        {/* Botanical Laurel Flourish */}
        <g stroke="#FF8BA7" strokeWidth="1.5" fill="none" opacity="0.7">
          <path d="M 50 120 C 45 95 60 70 80 60" />
          <path d="M 150 120 C 155 95 140 70 120 60" />
        </g>

        {/* Elegant Gift Box with Satin Bow */}
        <g transform="translate(100, 100)">
          {/* Main Box */}
          <rect x="-35" y="-15" width="70" height="46" rx="8" fill="#FFF5F8" stroke="#FF8BA7" strokeWidth="2.5" />
          {/* Lid */}
          <rect x="-39" y="-23" width="78" height="14" rx="5" fill="#FFE4EC" stroke="#FF8BA7" strokeWidth="2.5" />

          {/* Satin Ribbons */}
          <rect x="-5" y="-23" width="10" height="54" fill="#FF5A82" />
          <rect x="-35" y="4" width="70" height="10" fill="#FF5A82" />

          {/* Bow on Top */}
          <path d="M 0 -23 C -16 -40 -26 -26 -6 -23 Z" fill="#FF7597" stroke="#FF5A82" strokeWidth="1.5" />
          <path d="M 0 -23 C 16 -40 26 -26 6 -23 Z" fill="#FF7597" stroke="#FF5A82" strokeWidth="1.5" />
          <circle cx="0" cy="-23" r="4.5" fill="#FF5A82" />

          {/* Little Heart Tag */}
          <g transform="translate(16, -10) rotate(15)">
            <path d="M 0 0 C 0 -4 5 -4 5 0 C 5 4 0 7 0 7 C 0 7 -5 4 -5 0 C -5 -4 0 -4 0 0 Z" fill="#FF6584" />
          </g>
        </g>

        {/* Floating Sparkles */}
        <path d="M 45 50 L 47 55 L 52 57 L 47 59 L 45 64 L 43 59 L 38 57 L 43 55 Z" fill="#FF8BA7" />
        <path d="M 155 50 L 157 55 L 162 57 L 157 59 L 155 64 L 153 59 L 148 57 L 153 55 Z" fill="#FF8BA7" />
      </svg>
    </div>
  );
};
