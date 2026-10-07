import React, { useState } from 'react';
import { Mail, Phone, MapPin, MessageCircle, Copy, Check, ExternalLink } from 'lucide-react';
import { AGENCY_DETAILS } from '../data/initialData';

export const Contact: React.FC = () => {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <section id="contact" className="py-24 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-2">
            Get In Touch
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Direct Agency Contact.
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            Have a project in mind or want to explore representation? Connect directly with CreatorPoint.
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          
          {/* Email Card */}
          <div className="bg-white p-7 rounded-2xl border border-slate-200/80 shadow-xs hover:border-indigo-300 transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-5">
                <Mail className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Official Email</span>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-1 break-all">
                <a
                  href={`mailto:${AGENCY_DETAILS.email}`}
                  className="hover:text-indigo-600 transition-colors"
                >
                  {AGENCY_DETAILS.email}
                </a>
              </h3>
              <p className="text-xs text-slate-500 mt-2">
                Brand proposals, media inquiries, and creator application reviews.
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
              <a
                href={`mailto:${AGENCY_DETAILS.email}`}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
              >
                <span>Send Mail</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={() => copyToClipboard(AGENCY_DETAILS.email, 'email')}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-md hover:bg-slate-50 transition-colors"
                title="Copy email address"
              >
                {copiedField === 'email' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Phone / WhatsApp Card */}
          <div className="bg-white p-7 rounded-2xl border border-slate-200/80 shadow-xs hover:border-purple-300 transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-5">
                <Phone className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Phone / WhatsApp</span>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-1">
                <a
                  href={`tel:${AGENCY_DETAILS.phone.replace(/\s+/g, '')}`}
                  className="hover:text-purple-600 transition-colors"
                >
                  {AGENCY_DETAILS.phone}
                </a>
              </h3>
              <p className="text-xs text-slate-500 mt-2">
                Direct phone line & WhatsApp business chat for quick campaign discussions.
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
              <a
                href={`tel:${AGENCY_DETAILS.phone.replace(/\s+/g, '')}`}
                className="text-xs font-bold text-purple-600 hover:text-purple-800 flex items-center gap-1"
              >
                <span>Call Directly</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={() => copyToClipboard(AGENCY_DETAILS.phone, 'phone')}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-md hover:bg-slate-50 transition-colors"
                title="Copy phone number"
              >
                {copiedField === 'phone' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Address Card */}
          <div className="bg-white p-7 rounded-2xl border border-slate-200/80 shadow-xs hover:border-pink-300 transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center mb-5">
                <MapPin className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Agency Address</span>
              <address className="not-italic text-sm font-semibold text-slate-800 mt-1 leading-snug">
                {AGENCY_DETAILS.address}
              </address>
              <p className="text-xs text-slate-500 mt-2">
                Registered office based in West Bengal, India.
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-400 font-mono">PIN: 721144</span>
              <button
                onClick={() => copyToClipboard(AGENCY_DETAILS.address, 'address')}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-md hover:bg-slate-50 transition-colors"
                title="Copy address"
              >
                {copiedField === 'address' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

        </div>

        {/* WhatsApp Highlight Action Bar */}
        <div className="mt-12 max-w-3xl mx-auto bg-gradient-to-r from-emerald-600 to-teal-700 rounded-2xl p-6 sm:p-8 text-white shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center shrink-0">
              <MessageCircle className="w-8 h-8 text-white" />
            </div>
            <div>
              <h4 className="text-lg font-bold">Fastest Response on WhatsApp</h4>
              <p className="text-xs sm:text-sm text-emerald-100 mt-0.5">
                Chat with Founder Bishnu Bhunia regarding creator slots, pricing, and campaign timelines.
              </p>
            </div>
          </div>

          <a
            href={AGENCY_DETAILS.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-3.5 bg-white text-emerald-800 hover:bg-emerald-50 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 shrink-0 group"
          >
            <span>Open WhatsApp Chat</span>
            <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>

      </div>
    </section>
  );
};
