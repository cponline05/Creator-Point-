import React, { useState } from 'react';
import { Logo } from './Logo';
import { Youtube, Instagram, Twitter, Linkedin, MessageCircle, Edit2, Check } from 'lucide-react';
import { AGENCY_DETAILS } from '../data/initialData';

interface FooterProps {
  customLogoUrl?: string | null;
}

export const Footer: React.FC<FooterProps> = ({ customLogoUrl }) => {
  const currentYear = new Date().getFullYear();

  // Editable social links state
  const [socialLinks, setSocialLinks] = useState({
    youtube: 'https://youtube.com',
    instagram: 'https://instagram.com',
    twitter: 'https://x.com',
    linkedin: 'https://linkedin.com',
    whatsapp: AGENCY_DETAILS.whatsappUrl,
  });

  const [isEditingSocials, setIsEditingSocials] = useState(false);
  const [tempSocials, setTempSocials] = useState(socialLinks);

  const handleSaveSocials = () => {
    setSocialLinks(tempSocials);
    setIsEditingSocials(false);
  };

  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-900 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Col 1 & 2: Brand Lockup & Bio */}
          <div className="lg:col-span-2 space-y-4">
            <a href="#home" className="inline-block">
              <Logo customLogoUrl={customLogoUrl} size="md" />
            </a>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              CreatorPoint is an influencer marketing and creator management agency connecting brands with targeted content creators across India and global markets.
            </p>
            
            {/* Social Links */}
            <div className="pt-2">
              <div className="flex items-center gap-3">
                <a
                  href={socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-red-600 hover:text-white flex items-center justify-center transition-colors text-slate-300"
                  title="YouTube"
                >
                  <Youtube className="w-4 h-4" />
                </a>
                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-pink-600 hover:text-white flex items-center justify-center transition-colors text-slate-300"
                  title="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href={socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-slate-700 hover:text-white flex items-center justify-center transition-colors text-slate-300"
                  title="X / Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-blue-600 hover:text-white flex items-center justify-center transition-colors text-slate-300"
                  title="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href={socialLinks.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-emerald-600 hover:text-white flex items-center justify-center transition-colors text-slate-300"
                  title="WhatsApp"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
                
                {/* Edit Socials Button */}
                <button
                  onClick={() => {
                    setTempSocials(socialLinks);
                    setIsEditingSocials(true);
                  }}
                  className="p-1.5 text-slate-500 hover:text-indigo-400 hover:bg-slate-900 rounded-md transition-colors"
                  title="Edit social media links"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Col 3: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Quick Navigation</h4>
            <ul className="space-y-2">
              <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Our Services</a></li>
              <li><a href="#brands" className="hover:text-white transition-colors">Brands Collaborated</a></li>
              <li><a href="#creators" className="hover:text-white transition-colors">Managed Creators</a></li>
              <li><a href="#founder" className="hover:text-white transition-colors">Meet the Founder</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact Details</a></li>
            </ul>
          </div>

          {/* Col 4: Action Portals */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Campaign Hubs</h4>
            <ul className="space-y-2">
              <li>
                <a href="#brand-enquiry" className="hover:text-indigo-400 transition-colors">
                  Brand Campaign Brief
                </a>
              </li>
              <li>
                <a href="#creator-registration" className="hover:text-purple-400 transition-colors">
                  Creator Application Form
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  YouTube Sponsorships
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Instagram Collaborations
                </a>
              </li>
            </ul>
          </div>

          {/* Col 5: Contact Details */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Agency Office</h4>
            <div className="space-y-2 text-slate-400 leading-relaxed">
              <p>
                <strong className="text-white block font-medium">Email:</strong>
                <a href={`mailto:${AGENCY_DETAILS.email}`} className="text-indigo-400 hover:underline">
                  {AGENCY_DETAILS.email}
                </a>
              </p>
              <p>
                <strong className="text-white block font-medium">WhatsApp / Phone:</strong>
                <a href={`tel:${AGENCY_DETAILS.phone.replace(/\s+/g, '')}`} className="text-purple-400 hover:underline">
                  {AGENCY_DETAILS.phone}
                </a>
              </p>
              <p>
                <strong className="text-white block font-medium">Address:</strong>
                <span>{AGENCY_DETAILS.address}</span>
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500">
          <p>© {currentYear} CreatorPoint. All rights reserved.</p>
          <p className="text-[11px]">
            Influencer Marketing & Creator Management Agency
          </p>
        </div>

      </div>

      {/* Edit Socials Modal */}
      {isEditingSocials && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 text-slate-900">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">Edit Social Media Links</h3>
              <button onClick={() => setIsEditingSocials(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>
            <div className="py-4 space-y-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">YouTube URL</label>
                <input
                  type="text"
                  value={tempSocials.youtube}
                  onChange={(e) => setTempSocials({ ...tempSocials, youtube: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Instagram URL</label>
                <input
                  type="text"
                  value={tempSocials.instagram}
                  onChange={(e) => setTempSocials({ ...tempSocials, instagram: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">X / Twitter URL</label>
                <input
                  type="text"
                  value={tempSocials.twitter}
                  onChange={(e) => setTempSocials({ ...tempSocials, twitter: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">LinkedIn URL</label>
                <input
                  type="text"
                  value={tempSocials.linkedin}
                  onChange={(e) => setTempSocials({ ...tempSocials, linkedin: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">WhatsApp URL</label>
                <input
                  type="text"
                  value={tempSocials.whatsapp}
                  onChange={(e) => setTempSocials({ ...tempSocials, whatsapp: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300"
                />
              </div>
            </div>
            <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
              <button
                onClick={() => setIsEditingSocials(false)}
                className="px-3 py-1.5 text-xs text-slate-500 hover:bg-slate-100 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveSocials}
                className="px-4 py-1.5 bg-indigo-600 text-white rounded-md text-xs font-bold flex items-center gap-1"
              >
                <Check className="w-3.5 h-3.5" /> Save Links
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
