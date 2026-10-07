import React from 'react';
import { Target, Users, Zap, CheckCircle2 } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-white border-y border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-2">
            Who We Are
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Bridging the Gap Between Ambitious Brands and Dedicated Creators
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            CreatorPoint is an influencer marketing and creator management agency. We connect high-growth brands with content creators through strategic influencer campaigns, authentic brand partnerships, structured campaign management, and dedicated creator representation.
          </p>
        </div>

        {/* Narrative & Pillars Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-indigo-300 transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-indigo-100/80 text-indigo-700 flex items-center justify-center mb-6">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Strategic Matchmaking</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                We believe influencer marketing succeeds when the brand's objective aligns naturally with the creator’s authentic voice and audience interest. No mismatched product pushes.
              </p>
            </div>
            <ul className="mt-6 pt-6 border-t border-slate-200 space-y-2 text-xs font-medium text-slate-700">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-600" /> Audience demographic relevance
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-600" /> Contextual niche alignment
              </li>
            </ul>
          </div>

          <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-purple-300 transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-purple-100/80 text-purple-700 flex items-center justify-center mb-6">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Creator Representation</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Creators should focus on storytelling and content creation. We manage communication, negotiations, contracts, timelines, and deliverable compliance so both sides thrive.
              </p>
            </div>
            <ul className="mt-6 pt-6 border-t border-slate-200 space-y-2 text-xs font-medium text-slate-700">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-600" /> Dedicated talent coordination
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-600" /> Fair agreements & clear briefs
              </li>
            </ul>
          </div>

          <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-pink-300 transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-pink-100/80 text-pink-700 flex items-center justify-center mb-6">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Flawless Execution</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                From initial campaign concept and creator briefing to draft review, link tracking, and final performance reporting, we ensure every collaboration delivers tangible impact.
              </p>
            </div>
            <ul className="mt-6 pt-6 border-t border-slate-200 space-y-2 text-xs font-medium text-slate-700">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-pink-600" /> Milestone & deadline tracking
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-pink-600" /> Post-campaign performance review
              </li>
            </ul>
          </div>

        </div>

      </div>
    </section>
  );
};
