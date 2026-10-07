import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { Brands } from './components/Brands';
import { Creators } from './components/Creators';
import { CreatorForm } from './components/CreatorForm';
import { BrandForm } from './components/BrandForm';
import { Founder } from './components/Founder';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { EnquiriesModal } from './components/EnquiriesModal';
import { INITIAL_BRANDS, INITIAL_CREATORS, AGENCY_DETAILS } from './data/initialData';
import { BrandItem, CreatorItem } from './types';
import { MessageCircle } from 'lucide-react';

export default function App() {
  // State with localStorage persistence
  const [brands, setBrands] = useState<BrandItem[]>(() => {
    try {
      const saved = localStorage.getItem('creatorpoint_brands');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_BRANDS;
  });

  const [creators, setCreators] = useState<CreatorItem[]>(() => {
    try {
      const saved = localStorage.getItem('creatorpoint_creators');
      if (saved) {
        const parsed: CreatorItem[] = JSON.parse(saved);
        // If stored was old placeholder list, prefer the real creators
        if (parsed.length > 0 && parsed[0]?.id === 'creator-1') {
          return INITIAL_CREATORS;
        }
        return parsed;
      }
    } catch (e) {
      console.error(e);
    }
    return INITIAL_CREATORS;
  });

  const [customLogoUrl, setCustomLogoUrl] = useState<string | null>(() => {
    return localStorage.getItem('creatorpoint_custom_logo') || null;
  });

  const [customFounderPhoto, setCustomFounderPhoto] = useState<string | null>(() => {
    return localStorage.getItem('creatorpoint_founder_photo') || null;
  });

  const [inboxOpen, setInboxOpen] = useState(false);
  const [submissionsCount, setSubmissionsCount] = useState(0);

  // Sync state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('creatorpoint_brands', JSON.stringify(brands));
    } catch (e) {
      console.error(e);
    }
  }, [brands]);

  useEffect(() => {
    try {
      localStorage.setItem('creatorpoint_creators', JSON.stringify(creators));
    } catch (e) {
      console.error(e);
    }
  }, [creators]);

  const updateFounderPhoto = (photo: string | null) => {
    setCustomFounderPhoto(photo);
    if (photo) {
      localStorage.setItem('creatorpoint_founder_photo', photo);
    } else {
      localStorage.removeItem('creatorpoint_founder_photo');
    }
  };

  const handleUpdateBrand = (updated: BrandItem) => {
    setBrands((prev) => prev.map((b) => (b.id === updated.id ? updated : b)));
  };

  const handleResetBrands = () => {
    if (window.confirm('Reset all 10 brand spaces to default partners?')) {
      setBrands(INITIAL_BRANDS);
      localStorage.removeItem('creatorpoint_brands');
    }
  };

  const handleUpdateCreator = (updated: CreatorItem) => {
    setCreators((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
  };

  const handleResetCreators = () => {
    if (window.confirm('Reset creator profiles to default placeholders?')) {
      setCreators(INITIAL_CREATORS);
      localStorage.removeItem('creatorpoint_creators');
    }
  };

  const fetchSubmissionsCount = async () => {
    try {
      const res = await fetch('/api/enquiries');
      if (res.ok) {
        const data = await res.json();
        setSubmissionsCount(data.totalCount || 0);
      }
    } catch (e) {
      // offline / quiet
    }
  };

  useEffect(() => {
    fetchSubmissionsCount();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      
      {/* 1. Header & Top Bar */}
      <Navbar
        customLogoUrl={customLogoUrl}
        onOpenInbox={() => setInboxOpen(true)}
        submissionsCount={submissionsCount}
      />

      {/* Main Page Flow */}
      <main className="flex-1">
        {/* 1. Hero & Value Proposition */}
        <Hero />

        {/* 2. About CreatorPoint */}
        <About />

        {/* 3. Our Services (6 cards) */}
        <Services />

        {/* 4. Previous Brand Collaborations (10 editable spaces) */}
        <Brands
          brands={brands}
          onUpdateBrand={handleUpdateBrand}
          onResetBrands={handleResetBrands}
        />

        {/* 5. Creators We Currently Manage (5 editable spaces) */}
        <Creators
          creators={creators}
          onUpdateCreator={handleUpdateCreator}
          onResetCreators={handleResetCreators}
        />

        {/* 6. Creator Registration Form */}
        <CreatorForm onSuccessSubmit={fetchSubmissionsCount} />

        {/* 7. Brand Campaign Enquiry Form */}
        <BrandForm onSuccessSubmit={fetchSubmissionsCount} />

        {/* 8. Meet the Founder (Bishnu Bhunia) */}
        <Founder
          customFounderPhoto={customFounderPhoto}
          onUpdateFounderPhoto={updateFounderPhoto}
        />

        {/* 9. Contact Section */}
        <Contact />
      </main>

      {/* 10. Footer */}
      <Footer customLogoUrl={customLogoUrl} />

      {/* Floating WhatsApp Quick Action Button */}
      <a
        href={AGENCY_DETAILS.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-emerald-600 hover:bg-emerald-700 text-white p-3.5 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all flex items-center gap-2 group"
        aria-label="Direct WhatsApp Chat with CreatorPoint"
      >
        <MessageCircle className="w-6 h-6 fill-current" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 text-xs font-bold pr-1">
          Chat on WhatsApp
        </span>
      </a>

      {/* Internal Inquiries Inbox Modal */}
      <EnquiriesModal
        isOpen={inboxOpen}
        onClose={() => setInboxOpen(false)}
        onRefreshCount={fetchSubmissionsCount}
      />

    </div>
  );
}
