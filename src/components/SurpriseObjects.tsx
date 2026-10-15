import React from 'react';

interface SurpriseObjectProps {
  type: 'camera' | 'envelope' | 'cassette' | 'gift';
  unlocked?: boolean;
  onClick?: () => void;
  className?: string;
  isHovered?: boolean;
}

export const SurpriseObject: React.FC<SurpriseObjectProps> = ({
  type,
  unlocked = false,
  onClick,
  className = '',
}) => {
  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick?.();
        }
      }}
      className={`group relative cursor-pointer select-none transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 active:scale-95 focus:outline-none ${className}`}
    >
      {/* Soft Pink Aura Glow on Hover */}
      <div className="absolute -inset-4 bg-gradient-to-r from-pink-300/0 via-pink-400/25 to-pink-300/0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl pointer-events-none" />

      {/* Unlocked checkmark badge */}
      {unlocked && (
        <div className="absolute -top-2 -right-2 z-20 w-7 h-7 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 text-white flex items-center justify-center font-bold text-xs shadow-md border-2 border-white">
          ✓
        </div>
      )}

      {type === 'camera' && (
        <div className="w-36 h-36 md:w-44 md:h-44 relative flex items-center justify-center">
          <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-lg" fill="none">
            {/* Vintage Polaroid Camera (Pastel yellow with pink touches) */}
            <rect x="20" y="32" width="120" height="100" rx="20" fill="#FDE2E4" stroke="#FFB3C6" strokeWidth="2.5" />
            <rect x="25" y="37" width="110" height="90" rx="16" fill="#FFF0F3" />

            {/* Top view finder bar */}
            <path d="M 20 52 L 140 52" stroke="#FFB3C6" strokeWidth="2" />
            <rect x="35" y="24" width="28" height="12" rx="4" fill="#FFCCD5" stroke="#FFB3C6" strokeWidth="1.5" />
            <rect x="40" y="27" width="18" height="7" rx="2" fill="#2D121F" />

            {/* Flash Lamp */}
            <circle cx="120" cy="44" r="8" fill="#FFFFFF" stroke="#FFB3C6" strokeWidth="2" />
            <circle cx="120" cy="44" r="4" fill="#FF8BA7" />

            {/* Shutter Button (Pink) */}
            <rect x="30" y="42" width="12" height="6" rx="2" fill="#FF5A82" />

            {/* Main Center Lens with Rose Ring */}
            <circle cx="80" cy="88" r="32" fill="#59203B" stroke="#FFB3C6" strokeWidth="3" />
            <circle cx="80" cy="88" r="24" fill="#2D121F" stroke="#FF8BA7" strokeWidth="2" />
            <circle cx="80" cy="88" r="14" fill="#3D1828" />
            {/* Lens Reflection */}
            <ellipse cx="74" cy="82" rx="6" ry="3" fill="#FFFFFF" opacity="0.7" transform="rotate(-30 74 82)" />
            <circle cx="85" cy="94" r="2" fill="#FF8BA7" opacity="0.9" />

            {/* Photo Dispenser Slot at bottom */}
            <rect x="45" y="124" width="70" height="4" rx="2" fill="#FFB3C6" />

            {/* Cute mini heart badge */}
            <circle cx="122" cy="112" r="8" fill="#FFFFFF" stroke="#FFB3C6" strokeWidth="1" />
            <path d="M 122 110 C 122 108 125 108 125 110 C 125 112 122 114 122 114 C 122 114 119 112 119 110 C 119 108 122 108 122 110 Z" fill="#FF5A82" />
          </svg>
        </div>
      )}

      {type === 'envelope' && (
        <div className="w-36 h-36 md:w-44 md:h-44 relative flex items-center justify-center">
          <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-lg" fill="none">
            {/* Lavender-Pink Luxury Sealed Envelope */}
            <rect x="18" y="42" width="124" height="84" rx="12" fill="#FFF0F5" stroke="#FFB3C6" strokeWidth="2.5" />
            <rect x="22" y="46" width="116" height="76" rx="8" fill="#FFE4EC" />

            {/* Bottom folds */}
            <path d="M 18 126 L 80 86 L 142 126" fill="#FFCCD5" stroke="#FFB3C6" strokeWidth="2" />

            {/* Top Flap */}
            <path d="M 18 42 L 80 92 L 142 42 Z" fill="#FFF5F8" stroke="#FFB3C6" strokeWidth="2.5" />

            {/* Rose Wax Seal */}
            <circle cx="80" cy="92" r="15" fill="#FF5A82" stroke="#D81B60" strokeWidth="2" />
            <circle cx="80" cy="92" r="11" fill="#FF7597" />
            {/* Wax seal heart icon */}
            <path d="M 80 90 C 80 88 83.5 88 83.5 90 C 83.5 92.5 80 95 80 95 C 80 95 76.5 92.5 76.5 90 C 76.5 88 80 88 80 90 Z" fill="#FFFFFF" />

            {/* Floating sparkle hearts */}
            <path d="M 32 30 L 33 34 L 37 35 L 33 36 L 32 40 L 31 36 L 27 35 L 31 34 Z" fill="#FF8BA7" />
            <path d="M 134 32 L 135 35 L 138 36 L 135 37 L 134 40 L 133 37 L 130 36 L 133 35 Z" fill="#FF8BA7" />
          </svg>
        </div>
      )}

      {type === 'cassette' && (
        <div className="w-36 h-36 md:w-44 md:h-44 relative flex items-center justify-center">
          <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-lg" fill="none">
            {/* Retro Pastel Pink Cassette Tape */}
            <rect x="16" y="44" width="128" height="80" rx="10" fill="#FFF0F5" stroke="#FFB3C6" strokeWidth="2.5" />
            <rect x="22" y="50" width="116" height="68" rx="6" fill="#FFE4EC" />

            {/* Label area (pure white with rose border) */}
            <rect x="28" y="56" width="104" height="42" rx="5" fill="#FFFFFF" stroke="#FFB3C6" strokeWidth="1.5" />

            {/* Label Text "HAAREYA <3" */}
            <text x="80" y="66" textAnchor="middle" fill="#E02868" fontSize="8" fontWeight="bold" fontFamily="sans-serif">
              HAAREYA &lt;3
            </text>

            {/* Tape Window with spools */}
            <rect x="42" y="70" width="76" height="22" rx="4" fill="#FFF5F8" stroke="#FFB3C6" strokeWidth="1" />
            {/* Left Spool */}
            <circle cx="56" cy="81" r="7" fill="#FFFFFF" stroke="#FF8BA7" strokeWidth="1.5" />
            <circle cx="56" cy="81" r="3" fill="#FF5A82" />
            <line x1="56" y1="74" x2="56" y2="88" stroke="#FF8BA7" strokeWidth="1" />
            <line x1="49" y1="81" x2="63" y2="81" stroke="#FF8BA7" strokeWidth="1" />

            {/* Right Spool */}
            <circle cx="104" cy="81" r="7" fill="#FFFFFF" stroke="#FF8BA7" strokeWidth="1.5" />
            <circle cx="104" cy="81" r="3" fill="#FF5A82" />
            <line x1="104" y1="74" x2="104" y2="88" stroke="#FF8BA7" strokeWidth="1" />
            <line x1="97" y1="81" x2="111" y2="81" stroke="#FF8BA7" strokeWidth="1" />

            {/* Tape ribbon between spools */}
            <line x1="63" y1="81" x2="97" y2="81" stroke="#FF8BA7" strokeWidth="3" />

            {/* Bottom trapezoid base with holes */}
            <polygon points="36,124 44,106 116,106 124,124" fill="#FFE4EC" stroke="#FFB3C6" strokeWidth="1.5" />
            <circle cx="54" cy="115" r="3" fill="#FFFFFF" />
            <circle cx="106" cy="115" r="3" fill="#FFFFFF" />
            <rect x="70" y="112" width="20" height="6" rx="2" fill="#FFFFFF" />
          </svg>
        </div>
      )}

      {type === 'gift' && (
        <div className="w-36 h-36 md:w-44 md:h-44 relative flex items-center justify-center">
          <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-lg" fill="none">
            {/* Sweet White & Pink Gift Box */}
            <rect x="28" y="58" width="104" height="74" rx="10" fill="#FFF0F5" stroke="#FFB3C6" strokeWidth="2.5" />
            {/* Box Lid */}
            <rect x="22" y="46" width="116" height="20" rx="8" fill="#FFE4EC" stroke="#FFB3C6" strokeWidth="2.5" />

            {/* Vertical Rose Ribbon */}
            <rect x="73" y="46" width="14" height="86" fill="#FF5A82" />
            {/* Horizontal Rose Ribbon */}
            <rect x="28" y="86" width="104" height="14" fill="#FF5A82" />

            {/* Satin Pink Bow on top */}
            <path d="M 80 46 C 60 22 45 42 74 46 Z" fill="#FF7597" stroke="#FF5A82" strokeWidth="1.5" />
            <path d="M 80 46 C 100 22 115 42 86 46 Z" fill="#FF7597" stroke="#FF5A82" strokeWidth="1.5" />
            <circle cx="80" cy="46" r="6" fill="#FF5A82" stroke="#FFFFFF" strokeWidth="2" />

            {/* Hanging Ribbon Tails */}
            <path d="M 76 48 Q 66 65 58 72" stroke="#FF5A82" strokeWidth="3" strokeLinecap="round" />
            <path d="M 84 48 Q 94 65 102 72" stroke="#FF5A82" strokeWidth="3" strokeLinecap="round" />

            {/* Sparkles */}
            <path d="M 28 36 L 29 39 L 32 40 L 29 41 L 28 44 L 27 41 L 24 40 L 27 39 Z" fill="#FF8BA7" />
            <path d="M 135 44 L 136 47 L 139 48 L 136 49 L 135 52 L 134 49 L 131 48 L 134 47 Z" fill="#FF8BA7" />
          </svg>
        </div>
      )}
    </div>
  );
};
