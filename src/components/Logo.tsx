import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  customLogoUrl?: string | null;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
  customLogoUrl
}) => {
  // If user uploaded a custom logo image file
  if (customLogoUrl) {
    return (
      <div className={`flex items-center gap-3 select-none ${className}`}>
        <img
          src={customLogoUrl}
          alt="CreatorPoint Logo"
          className="h-10 w-auto object-contain"
        />
        {showText && (
          <span className="text-xl font-extrabold tracking-tight text-slate-900">
            Creator<span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">Point</span>
          </span>
        )}
      </div>
    );
  }

  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl'
  };

  return (
    <div className={`flex items-center gap-3 select-none group ${className}`}>
      {/* CreatorPoint Emblem */}
      <div className={`relative ${iconSizes[size]} shrink-0 transition-transform duration-300 group-hover:scale-105`}>
        <svg
          viewBox="0 0 120 120"
          className="w-full h-full drop-shadow-xs"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Primary C-ribbon gradient */}
            <linearGradient id="cp_gradient_main" x1="10%" y1="0%" x2="90%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="35%" stopColor="#6366F1" />
              <stop offset="70%" stopColor="#8B5CF6" />
              <stop offset="95%" stopColor="#EC4899" />
            </linearGradient>

            {/* Inner play facet gradient */}
            <linearGradient id="cp_gradient_facet" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4F46E5" />
              <stop offset="100%" stopColor="#D946EF" />
            </linearGradient>

            {/* Sparkle gradient */}
            <linearGradient id="cp_sparkle" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#C084FC" />
              <stop offset="100%" stopColor="#F43F5E" />
            </linearGradient>
          </defs>

          {/* Stylized 'C' circular ribbon with play button cutout */}
          <path
            d="M 68 22 C 38 22 18 42 18 68 C 18 94 38 112 68 112 C 86 112 96 102 96 90 L 76 90 C 76 96 70 98 64 98 C 45 98 34 85 34 68 C 34 50 46 36 65 36 C 73 36 82 40 86 46 L 98 34 C 90 26 80 22 68 22 Z"
            fill="url(#cp_gradient_main)"
          />

          {/* Dynamic Play / Creator Notch in center */}
          <path
            d="M 52 52 L 74 65 L 52 78 Z"
            fill="url(#cp_gradient_facet)"
            opacity="0.95"
          />

          {/* 4-point Sparkle Star at upper right corner of the emblem */}
          <path
            d="M 98 12 Q 98 22 108 22 Q 98 22 98 32 Q 98 22 88 22 Q 98 22 98 12 Z"
            fill="url(#cp_sparkle)"
          />
        </svg>
      </div>

      {showText && (
        <div className="flex items-baseline tracking-tight">
          <span className={`${textSizes[size]} font-extrabold text-slate-900 leading-none`}>
            Creator
          </span>
          <span className={`${textSizes[size]} font-extrabold ml-1 leading-none bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent`}>
            Point
          </span>
        </div>
      )}
    </div>
  );
};
