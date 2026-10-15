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
      {/* Soft Glow on Hover */}
      <div className="absolute -inset-4 bg-pink-300/25 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl pointer-events-none" />

      {/* Unlocked checkmark badge */}
      {unlocked && (
        <div className="absolute -top-2 -right-2 z-20 w-7 h-7 rounded-full bg-[#E63946] text-white flex items-center justify-center font-bold text-xs shadow-md border-2 border-white">
          ✓
        </div>
      )}

      {/* 1. YELLOW RETRO POLAROID CAMERA (Exact yellow camera from reference video Frame 13) */}
      {type === 'camera' && (
        <div className="w-36 h-36 md:w-44 md:h-44 relative flex items-center justify-center">
          <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-md" fill="none">
            {/* Camera Body - Bright Sunshine Yellow */}
            <rect x="22" y="38" width="116" height="92" rx="22" fill="#FDD835" stroke="#F57F17" strokeWidth="2.5" />
            <rect x="26" y="42" width="108" height="84" rx="18" fill="#FFEE58" />

            {/* Shutter Button (Black / Dark Grey) on top left */}
            <rect x="36" y="30" width="18" height="9" rx="3" fill="#37474F" stroke="#263238" strokeWidth="1.5" />

            {/* Flash / Sensor on top right */}
            <rect x="106" y="46" width="18" height="12" rx="3" fill="#FFF9C4" stroke="#FBC02D" strokeWidth="1.5" />
            <circle cx="115" cy="52" r="3.5" fill="#FDD835" />

            {/* Viewfinder window */}
            <rect x="42" y="48" width="22" height="10" rx="3" fill="#37474F" />
            <rect x="44" y="50" width="18" height="6" rx="2" fill="#78909C" />

            {/* Main Round Camera Lens with realistic depth rings */}
            <circle cx="80" cy="90" r="32" fill="#424242" stroke="#212121" strokeWidth="3" />
            <circle cx="80" cy="90" r="26" fill="#263238" stroke="#37474F" strokeWidth="1.5" />
            <circle cx="80" cy="90" r="18" fill="#1A237E" />
            <circle cx="80" cy="90" r="10" fill="#000000" />
            
            {/* Lens Glint / Light Reflection */}
            <ellipse cx="73" cy="83" rx="7" ry="3.5" fill="#FFFFFF" opacity="0.75" transform="rotate(-35 73 83)" />
            <circle cx="86" cy="96" r="2.5" fill="#90CAF9" opacity="0.8" />

            {/* Cute white heart accent */}
            <circle cx="38" cy="98" r="4.5" fill="#FFFFFF" opacity="0.8" />
          </svg>
        </div>
      )}

      {/* 2. LAVENDER / PURPLE ENVELOPE (Exact lavender open envelope from reference video Frame 13) */}
      {type === 'envelope' && (
        <div className="w-36 h-36 md:w-44 md:h-44 relative flex items-center justify-center">
          <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-md" fill="none">
            {/* Open Envelope Flap in back */}
            <polygon points="26,82 80,24 134,82" fill="#B39DDB" stroke="#9575CD" strokeWidth="2" />

            {/* White Letter Card Peeking Out */}
            <rect x="36" y="42" width="88" height="64" rx="4" fill="#FFFFFF" stroke="#EDE7F6" strokeWidth="1.5" />
            {/* Letter Lines */}
            <line x1="46" y1="54" x2="114" y2="54" stroke="#D1C4E9" strokeWidth="2" strokeLinecap="round" />
            <line x1="46" y1="62" x2="98" y2="62" stroke="#D1C4E9" strokeWidth="2" strokeLinecap="round" />

            {/* Main Envelope Body - Lavender Purple */}
            <rect x="22" y="60" width="116" height="74" rx="8" fill="#9575CD" stroke="#7E57C2" strokeWidth="2" />

            {/* Envelope Front Folds */}
            <polygon points="22,134 80,92 138,134" fill="#7E57C2" stroke="#673AB7" strokeWidth="1.5" />
            <polygon points="22,60 80,102 22,134" fill="#8561C5" />
            <polygon points="138,60 80,102 138,134" fill="#8561C5" />

            {/* Pink Heart Seal at center */}
            <g transform="translate(80, 94)">
              <path
                d="M 0 -2 C 0 -6 6 -6 6 -2 C 6 2 0 6 0 6 C 0 6 -6 2 -6 -2 C -6 -6 0 -6 0 -2 Z"
                fill="#FF4081"
                stroke="#F50057"
                strokeWidth="1"
              />
            </g>
          </svg>
        </div>
      )}

      {/* 3. RETRO CASSETTE TAPE (Exact black and beige cassette with spools from reference video Frame 13) */}
      {type === 'cassette' && (
        <div className="w-36 h-36 md:w-44 md:h-44 relative flex items-center justify-center">
          <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-md" fill="none">
            {/* Cassette Shell - Vintage Dark Charcoal/Black with rounded corners */}
            <rect x="18" y="44" width="124" height="74" rx="8" fill="#212121" stroke="#424242" strokeWidth="2" />

            {/* Screws in 4 corners */}
            <circle cx="25" cy="51" r="2" fill="#9E9E9E" />
            <circle cx="135" cy="51" r="2" fill="#9E9E9E" />
            <circle cx="25" cy="111" r="2" fill="#9E9E9E" />
            <circle cx="135" cy="111" r="2" fill="#9E9E9E" />

            {/* Center Beige / Warm Cream Label */}
            <rect x="30" y="54" width="100" height="46" rx="5" fill="#D7CCC8" stroke="#BCAAA4" strokeWidth="1" />

            {/* Tape Window / Spool Cutout */}
            <rect x="44" y="64" width="72" height="26" rx="4" fill="#212121" />

            {/* Left Tape Spool */}
            <circle cx="60" cy="77" r="9" fill="#EEEEEE" stroke="#9E9E9E" strokeWidth="1.5" />
            <circle cx="60" cy="77" r="4.5" fill="#212121" />
            {/* Left Spool Teeth */}
            <line x1="60" y1="70" x2="60" y2="84" stroke="#212121" strokeWidth="1.5" />
            <line x1="53" y1="77" x2="67" y2="77" stroke="#212121" strokeWidth="1.5" />

            {/* Center Tape Window Glass */}
            <rect x="74" y="70" width="12" height="14" rx="1" fill="#424242" />

            {/* Right Tape Spool */}
            <circle cx="100" cy="77" r="9" fill="#EEEEEE" stroke="#9E9E9E" strokeWidth="1.5" />
            <circle cx="100" cy="77" r="4.5" fill="#212121" />
            {/* Right Spool Teeth */}
            <line x1="100" y1="70" x2="100" y2="84" stroke="#212121" strokeWidth="1.5" />
            <line x1="93" y1="77" x2="107" y2="77" stroke="#212121" strokeWidth="1.5" />

            {/* Bottom Trapezoid Tape Guide */}
            <polygon points="40,118 48,104 112,104 120,118" fill="#1B1B1B" stroke="#424242" strokeWidth="1" />
            <circle cx="56" cy="111" r="2.5" fill="#424242" />
            <circle cx="104" cy="111" r="2.5" fill="#424242" />

            {/* Mini Cute Heart on label */}
            <g transform="translate(122, 60)">
              <path
                d="M 0 0 C 0 -2 3 -2 3 0 C 3 2 0 3.5 0 3.5 C 0 3.5 -3 2 -3 0 C -3 -2 0 -2 0 0 Z"
                fill="#FF4081"
              />
            </g>
          </svg>
        </div>
      )}

      {/* 4. BONUS GIFT BOX */}
      {type === 'gift' && (
        <div className="w-36 h-36 md:w-44 md:h-44 relative flex items-center justify-center">
          <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-md" fill="none">
            {/* Cute Gift Box */}
            <rect x="36" y="58" width="88" height="66" rx="10" fill="#FFF0F5" stroke="#FF80AB" strokeWidth="2.5" />
            <rect x="30" y="46" width="100" height="18" rx="6" fill="#FF80AB" />
            <rect x="74" y="46" width="12" height="78" fill="#FF4081" />
            <circle cx="80" cy="42" r="8" fill="#FF4081" />
          </svg>
        </div>
      )}
    </div>
  );
};
