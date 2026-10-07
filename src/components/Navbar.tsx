import React, { useState } from 'react';
import { Logo } from './Logo';
import { Menu, X, Inbox } from 'lucide-react';

interface NavbarProps {
  customLogoUrl?: string | null;
  onOpenInbox: () => void;
  submissionsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  customLogoUrl,
  onOpenInbox,
  submissionsCount
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Brands', href: '#brands' },
    { label: 'Creators', href: '#creators' },
    { label: 'Founder', href: '#founder' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Zone 1: Brand Wordmark */}
        <a href="#home" className="flex items-center gap-2 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-indigo-600 rounded-lg">
          <Logo customLogoUrl={customLogoUrl} size="md" />
        </a>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-indigo-600 transition-colors py-2"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Submissions Inbox quick-check */}
          <button
            onClick={onOpenInbox}
            title="Agency Submissions Inbox (business@creatorpoint.online)"
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-600 hover:text-indigo-600 bg-slate-100 hover:bg-slate-200/80 rounded-lg transition-colors"
          >
            <Inbox className="w-4 h-4 text-slate-500" />
            <span className="hidden xl:inline">Enquiries</span>
            {submissionsCount > 0 && (
              <span className="ml-1 px-1.5 py-0.2 bg-indigo-600 text-white rounded-full text-[10px] font-bold">
                {submissionsCount}
              </span>
            )}
          </button>

          <a
            href="#brand-enquiry"
            className="px-4 py-2.5 text-xs font-semibold text-slate-700 hover:text-indigo-600 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors whitespace-nowrap"
          >
            I'm a Brand
          </a>
          <a
            href="#creator-registration"
            className="px-4 py-2.5 text-xs font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-xs rounded-lg transition-all whitespace-nowrap"
          >
            I'm a Creator
          </a>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={onOpenInbox}
            title="Enquiries Inbox"
            className="p-2 text-slate-600 bg-slate-100 rounded-lg relative"
          >
            <Inbox className="w-5 h-5" />
            {submissionsCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-indigo-600 text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                {submissionsCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-700 hover:text-indigo-600 rounded-lg focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-indigo-600"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-6 space-y-3 animate-in fade-in slide-in-from-top-2">
          <nav className="flex flex-col space-y-2 pt-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 text-base font-medium text-slate-700 hover:text-indigo-600 hover:bg-slate-50 rounded-lg"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-3">
            <a
              href="#brand-enquiry"
              onClick={() => setMobileMenuOpen(false)}
              className="text-center px-4 py-3 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg"
            >
              I'm a Brand
            </a>
            <a
              href="#creator-registration"
              onClick={() => setMobileMenuOpen(false)}
              className="text-center px-4 py-3 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg"
            >
              I'm a Creator
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
