import React from 'react';

interface BrandLogoProps {
  svgKey?: string;
  name: string;
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ svgKey, name, className = 'h-10' }) => {
  switch (svgKey) {
    case 'flipkart':
      return (
        <div className={`flex items-center gap-2 select-none ${className}`}>
          <span className="text-xl sm:text-2xl font-black italic tracking-tight text-[#2874F0]">
            Flipkart
          </span>
          <div className="w-8 h-8 rounded-md bg-[#FFE11B] flex items-center justify-center relative shadow-xs shrink-0">
            <span className="text-sm font-black text-[#2874F0] italic">f</span>
            <div className="absolute -top-1 w-3.5 h-1.5 border-t-2 border-[#2874F0] rounded-t-full"></div>
          </div>
        </div>
      );

    case 'amazon':
      return (
        <div className={`flex flex-col items-center justify-center select-none ${className}`}>
          <div className="relative inline-block">
            <span className="text-2xl sm:text-3xl font-extrabold tracking-tighter text-[#131921] leading-none">
              amazon
            </span>
            {/* Amazon orange smile arrow curve */}
            <svg
              viewBox="0 0 100 24"
              className="w-full h-4 -mt-1 text-[#FF9900]"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
            >
              <path d="M 10,8 Q 55,24 88,10" />
              <path d="M 82,6 L 90,10 L 86,16" fill="currentColor" strokeWidth="1" />
            </svg>
          </div>
        </div>
      );

    case 'godrej':
      return (
        <div className={`flex items-center justify-center select-none ${className}`}>
          <div className="flex items-center gap-1.5 font-bold tracking-tight text-slate-800 text-2xl sm:text-3xl">
            <div className="w-8 h-8 rounded-full border-4 border-[#83267d] border-t-[#5c5c5c] flex items-center justify-center text-xs text-[#83267d] font-serif">
              G
            </div>
            <span className="text-slate-700 tracking-tight font-serif italic text-2xl font-bold">
              Godrej
            </span>
          </div>
        </div>
      );

    case 'purplle':
      return (
        <div className={`flex flex-col items-center justify-center select-none ${className}`}>
          <div className="flex items-baseline text-2xl sm:text-3xl font-extrabold tracking-tight">
            <span className="text-[#6c2890]">purp</span>
            <span className="text-[#d92288]">lle</span>
            <span className="text-xs font-semibold text-slate-800 ml-0.5">.com</span>
          </div>
          <span className="text-[9px] tracking-wide text-[#6c2890] font-semibold uppercase">
            India's #1 Beauty Destination
          </span>
        </div>
      );

    case 'mamaearth':
      return (
        <div className={`flex items-center justify-center select-none ${className}`}>
          <div className="flex items-center text-2xl sm:text-3xl font-black tracking-tight">
            <span className="text-[#00A3E0]">mama</span>
            <span className="text-[#60B634]">earth</span>
            <span className="text-[10px] text-[#60B634] ml-0.5 align-super">™</span>
          </div>
        </div>
      );

    case 'be10x':
      return (
        <div className={`flex items-center justify-center gap-1 select-none ${className}`}>
          <span className="text-2xl sm:text-3xl font-extrabold text-black tracking-tighter">
            be
          </span>
          <div className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center font-black text-sm tracking-tighter">
            10x
          </div>
        </div>
      );

    case 'hostinger':
      return (
        <div className={`flex items-center gap-2 select-none ${className}`}>
          {/* Hostinger geometric H symbol */}
          <svg className="w-7 h-7 text-[#673DE6]" viewBox="0 0 40 40" fill="currentColor">
            <path d="M12 4 L22 4 L22 15 L28 15 L28 4 L38 4 L38 36 L28 36 L28 25 L22 25 L22 36 L12 36 Z" />
            <polygon points="12,18 20,18 28,22 20,22" fill="#4B20C4" />
          </svg>
          <span className="text-xl sm:text-2xl font-black tracking-wider text-[#673DE6] uppercase font-mono">
            HOSTINGER
          </span>
        </div>
      );

    case 'emergent':
      return (
        <div className={`flex items-center justify-center select-none ${className}`}>
          <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-black font-sans">
            emergent
          </span>
        </div>
      );

    case 'aisle':
      return (
        <div className={`flex items-center justify-center select-none ${className}`}>
          <div className="relative flex items-center">
            <span className="font-serif italic text-3xl sm:text-4xl font-extrabold text-black tracking-normal">
              aisle
            </span>
            {/* Heart symbol over 'i' */}
            <div className="absolute top-0.5 left-5 text-[#FF3366] text-sm animate-pulse">
              ♥
            </div>
          </div>
        </div>
      );

    case 'custom':
    default:
      return (
        <div className={`flex items-center gap-2 select-none text-slate-700 ${className}`}>
          <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 font-bold text-sm">
            +
          </div>
          <span className="text-base font-bold text-slate-800">{name}</span>
        </div>
      );
  }
};
