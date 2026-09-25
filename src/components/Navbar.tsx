import React, { useState } from 'react';
import { Sprout, Menu, X, Phone, ArrowRight, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Language } from '../data/translations';

interface NavbarProps {
  onOpenModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const languages: Array<{ code: Language; label: string }> = [
    { code: 'en', label: 'English' },
    { code: 'te', label: 'తెలుగు' },
    { code: 'hi', label: 'हिन्दी' },
  ];

  return (
    <nav className="sticky top-0 z-40 bg-farm-tan/95 backdrop-blur-md border-b border-farm-earth/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo - AgriNexa */}
          <a href="#" className="flex items-center gap-3 group focus:outline-none">
            <div className="w-12 h-12 rounded-2xl bg-farm-green text-farm-accent flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <Sprout className="w-7 h-7 stroke-[2.5]" />
            </div>
            <div className="flex flex-col text-left">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-extrabold text-farm-dark tracking-tight">
                  Agri<span className="text-farm-light font-black">Nexa</span>
                </span>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2 py-0.5 rounded-full border border-emerald-300 uppercase">
                  {t.nav.freeBadge}
                </span>
              </div>
              <span className="text-xs font-semibold text-farm-earth/80 tracking-wider">
                100% Free Farm App
              </span>
            </div>
          </a>

          {/* Desktop Nav Links - Bound to t */}
          <div className="hidden lg:flex items-center gap-6">
            <a href="#what-it-does" className="text-base font-semibold text-stone-800 hover:text-farm-green transition-colors">
              {t.nav.whatItDoes}
            </a>
            <a href="#how-it-works" className="text-base font-semibold text-stone-800 hover:text-farm-green transition-colors">
              {t.nav.howItWorks}
            </a>
            <a href="#features" className="text-base font-semibold text-stone-800 hover:text-farm-green transition-colors">
              {t.nav.features}
            </a>
            <a href="#reviews" className="text-base font-semibold text-stone-800 hover:text-farm-green transition-colors">
              {t.nav.farmerStories}
            </a>
          </div>

          {/* Right Controls: Language Selector & CTA */}
          <div className="hidden md:flex items-center gap-3">
            
            {/* Language Selector */}
            <div className="flex items-center bg-white border border-stone-300 rounded-xl p-1 shadow-sm">
              <Globe className="w-4 h-4 text-farm-green ml-2 mr-1" />
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    language === lang.code
                      ? 'bg-farm-green text-white shadow-sm ring-2 ring-farm-green/30'
                      : 'text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>

            {/* Helpline button */}
            <a 
              href="tel:18001233276" 
              className="hidden xl:flex items-center gap-1.5 text-stone-800 hover:text-farm-green font-bold text-xs bg-farm-pale px-3 py-2.5 rounded-xl border border-farm-medium/20"
              title="Toll-Free Helpline"
            >
              <Phone className="w-4 h-4 text-farm-green shrink-0" />
              <span>1800-123-FARM</span>
            </a>

            {/* CTA button */}
            <button
              onClick={onOpenModal}
              className="bg-farm-green hover:bg-farm-dark text-white font-extrabold px-5 py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2 text-sm active:scale-95"
            >
              <span>{t.nav.getStartedFree}</span>
              <ArrowRight className="w-4 h-4 text-farm-accent" />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            
            {/* Mobile quick language toggle */}
            <div className="flex items-center bg-white border border-stone-300 rounded-lg p-0.5">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={`px-2 py-1 rounded text-[11px] font-extrabold ${
                    language === lang.code ? 'bg-farm-green text-white' : 'text-stone-700'
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-farm-pale text-farm-dark hover:bg-farm-green hover:text-white transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-stone-200 px-4 pt-4 pb-6 space-y-4 shadow-xl animate-fade-in text-left">
          
          <div className="flex items-center justify-between pb-2 border-b border-stone-100">
            <span className="text-xs font-bold text-stone-500 uppercase">Select Language:</span>
            <div className="flex gap-1">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-extrabold ${
                    language === lang.code
                      ? 'bg-farm-green text-white'
                      : 'bg-stone-100 text-stone-800'
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>

          <a
            href="#what-it-does"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-lg font-bold text-stone-800 hover:text-farm-green py-2 border-b border-stone-100"
          >
            {t.nav.whatItDoes}
          </a>
          <a
            href="#how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-lg font-bold text-stone-800 hover:text-farm-green py-2 border-b border-stone-100"
          >
            {t.nav.howItWorks}
          </a>
          <a
            href="#features"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-lg font-bold text-stone-800 hover:text-farm-green py-2 border-b border-stone-100"
          >
            {t.nav.features}
          </a>
          <a
            href="#reviews"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-lg font-bold text-stone-800 hover:text-farm-green py-2 border-b border-stone-100"
          >
            {t.nav.farmerStories}
          </a>
          <div className="pt-2 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenModal();
              }}
              className="w-full bg-farm-green text-white text-lg font-extrabold py-3.5 rounded-xl shadow-md flex items-center justify-center gap-2"
            >
              <span>{t.nav.getStartedFree}</span>
              <ArrowRight className="w-5 h-5 text-farm-accent" />
            </button>
            <a 
              href="tel:18001233276"
              className="flex items-center justify-center gap-2 text-stone-800 py-3 font-bold bg-farm-tan rounded-xl border border-stone-300"
            >
              <Phone className="w-4 h-4 text-farm-green" />
              <span>Toll-Free Helpline: 1800-123-FARM</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};
