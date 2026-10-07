import React from 'react';
import { ArrowRight, Sparkles, Video, Instagram, BarChart3, ShieldCheck } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section id="home" className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
      {/* Background radial ambient glow inspired by logo palette */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-br from-indigo-100/60 via-purple-50/40 to-pink-100/30 blur-3xl -z-10 pointer-events-none rounded-full" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          
          {/* Subtle Agency Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-indigo-100 shadow-xs text-xs font-semibold text-indigo-950">
            <span className="w-2 h-2 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 animate-pulse" />
            <span>Influencer Marketing & Creator Management</span>
            <span className="text-slate-300">·</span>
            <span className="text-indigo-600 font-medium">B2B Agency</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12] text-balance">
            Connecting Brands with the{' '}
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
              Right Creators.
            </span>
          </h1>

          {/* Supporting Text */}
          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            CreatorPoint helps brands build impactful influencer campaigns and supports creators with meaningful partnership opportunities.
          </p>

          {/* Two Clear Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#brand-enquiry"
              className="w-full sm:w-auto px-8 py-4 text-base font-bold text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 hover:from-indigo-700 hover:via-purple-700 hover:to-indigo-800 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group"
            >
              <span>I'm a Brand</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#creator-registration"
              className="w-full sm:w-auto px-8 py-4 text-base font-bold text-slate-800 bg-white hover:bg-slate-50 border border-slate-200 hover:border-purple-300 rounded-xl shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-2 group"
            >
              <span>I'm a Creator</span>
              <Sparkles className="w-4 h-4 text-purple-600 transition-transform group-hover:rotate-12" />
            </a>
          </div>

          {/* Key Value Highlights */}
          <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
            <div className="bg-white/80 backdrop-blur-xs p-4 rounded-xl border border-slate-200/80 shadow-xs hover:border-indigo-200 transition-colors">
              <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3">
                <Video className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-900">YouTube Sponsorships</h4>
              <p className="text-xs text-slate-500 mt-1">Dedicated integrations & targeted audience reach</p>
            </div>

            <div className="bg-white/80 backdrop-blur-xs p-4 rounded-xl border border-slate-200/80 shadow-xs hover:border-purple-200 transition-colors">
              <div className="w-9 h-9 rounded-lg bg-pink-50 text-pink-600 flex items-center justify-center mb-3">
                <Instagram className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-900">Instagram Reels</h4>
              <p className="text-xs text-slate-500 mt-1">High-engagement short form creator campaigns</p>
            </div>

            <div className="bg-white/80 backdrop-blur-xs p-4 rounded-xl border border-slate-200/80 shadow-xs hover:border-indigo-200 transition-colors">
              <div className="w-9 h-9 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center mb-3">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-900">Creator Management</h4>
              <p className="text-xs text-slate-500 mt-1">Professional representation & deal curation</p>
            </div>

            <div className="bg-white/80 backdrop-blur-xs p-4 rounded-xl border border-slate-200/80 shadow-xs hover:border-purple-200 transition-colors">
              <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
                <BarChart3 className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-900">Coordination & ROI</h4>
              <p className="text-xs text-slate-500 mt-1">Transparent campaign briefs & deliverables</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
