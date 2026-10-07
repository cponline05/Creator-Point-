import React from 'react';
import { 
  Megaphone, 
  UserCheck, 
  Handshake, 
  Youtube, 
  Instagram, 
  LineChart, 
  ArrowUpRight 
} from 'lucide-react';

export const Services: React.FC = () => {
  const servicesList = [
    {
      title: 'Influencer Marketing Campaigns',
      description: 'End-to-end strategic campaign design connecting your brand with targeted content creators across high-performing digital channels.',
      icon: Megaphone,
      accent: 'indigo',
      deliverables: ['Creator selection & vetting', 'Creative briefing & storyboards', 'Audience demographic validation']
    },
    {
      title: 'Creator Management',
      description: 'Dedicated representation and business management for digital creators, handling inbound brand inquiries, deal negotiations, and career growth.',
      icon: UserCheck,
      accent: 'purple',
      deliverables: ['Contract negotiation & pricing', 'Brand partnership filtering', 'Scheduling & deadline management']
    },
    {
      title: 'Brand Partnerships',
      description: 'Long-term and multi-phase brand ambassadorships that build genuine audience loyalty rather than single-off transactional mentions.',
      icon: Handshake,
      accent: 'pink',
      deliverables: ['Multi-month ambassadorships', 'Exclusive category integration', 'Cross-platform content synergies']
    },
    {
      title: 'YouTube Sponsorships',
      description: 'Integrated and dedicated video placements on YouTube channels with engaged viewers, strong search discoverability, and high watch time.',
      icon: Youtube,
      accent: 'indigo',
      deliverables: ['Dedicated video features', '60-90s integrated segments', 'Pinned link & description placement']
    },
    {
      title: 'Instagram Collaborations',
      description: 'Dynamic Reels, interactive Stories, and carousel posts designed to maximize engagement, visual aesthetic, and social proof.',
      icon: Instagram,
      accent: 'purple',
      deliverables: ['High-retention Reels creation', 'Interactive Story CTA sequences', 'Collaborator tag integrations']
    },
    {
      title: 'Campaign Coordination and Reporting',
      description: 'Comprehensive campaign logistics from script draft approvals and FTC/ASCI compliance to final delivery metrics and consolidated reporting.',
      icon: LineChart,
      accent: 'pink',
      deliverables: ['Deliverable compliance check', 'Real-time timeline tracking', 'Post-campaign consolidated report']
    }
  ];

  return (
    <section id="services" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-2">
            Tailored Capabilities
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Our Services
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            Comprehensive influencer marketing and creator solutions crafted for predictable, measurable outcomes.
          </p>
        </div>

        {/* 6 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {servicesList.map((service, idx) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="group bg-white rounded-2xl p-7 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-indigo-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 group-hover:bg-gradient-to-br group-hover:from-indigo-500 group-hover:to-purple-600 text-slate-700 group-hover:text-white flex items-center justify-center transition-all">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono text-slate-400">
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors mb-2.5">
                    {service.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <div className="text-xs font-semibold text-slate-900 mb-2">Key Deliverables:</div>
                  <ul className="space-y-1.5 text-xs text-slate-500">
                    {service.deliverables.map((item, dIdx) => (
                      <li key={dIdx} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500/80" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href="#brand-enquiry"
                    className="mt-5 inline-flex items-center gap-1 text-xs font-bold text-indigo-600 group-hover:text-purple-600 transition-colors"
                  >
                    <span>Enquire for this service</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Callout */}
        <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-xl font-bold">Looking for a custom influencer campaign structure?</h4>
            <p className="text-slate-300 text-sm mt-1 max-w-xl">
              We customize campaign scope, creator rosters, and deliverables based on your specific industry and conversion goals.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#brand-enquiry"
              className="px-6 py-3 rounded-xl bg-white text-slate-900 font-bold text-sm hover:bg-slate-100 transition-colors shadow-xs"
            >
              Start Brand Campaign
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
