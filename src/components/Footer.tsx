import React from 'react';
import { Sprout, Phone, ArrowRight, Heart } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface FooterProps {
  onOpenModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenModal }) => {
  const { t } = useLanguage();

  return (
    <footer className="bg-farm-dark text-white pt-16 pb-12 relative overflow-hidden">
      
      {/* Top Banner CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-gradient-to-r from-farm-green to-emerald-800 rounded-3xl p-8 sm:p-12 shadow-2xl border-4 border-farm-light/20 text-center space-y-6 relative">
          
          <span className="bg-farm-accent text-farm-dark font-extrabold text-xs uppercase tracking-widest px-4 py-1.5 rounded-full inline-block">
            {t.footer.badge}
          </span>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            {t.footer.bannerTitle} <br className="hidden sm:inline" />
            <span className="text-farm-accent">{t.footer.bannerTitleHighlight}</span>
          </h2>

          <p className="text-lg sm:text-xl text-farm-pale/90 max-w-2xl mx-auto font-medium">
            {t.footer.bannerSub}
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onOpenModal}
              className="bg-farm-accent hover:bg-yellow-400 text-farm-dark font-black text-xl px-10 py-5 rounded-2xl shadow-lifted transition-all flex items-center gap-3 active:scale-95"
            >
              <span>{t.footer.ctaBtn}</span>
              <ArrowRight className="w-6 h-6" />
            </button>
            <a
              href="tel:18001233276"
              className="bg-white/10 hover:bg-white/20 text-white font-bold text-base px-6 py-5 rounded-2xl border border-white/20 transition-all flex items-center gap-2"
            >
              <Phone className="w-5 h-5 text-farm-accent" />
              <span>{t.footer.helplineBtn}</span>
            </a>
          </div>

        </div>
      </div>

      {/* Footer Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-farm-medium/30">
          
          {/* Brand Col */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-farm-green text-farm-accent flex items-center justify-center shadow">
                <Sprout className="w-6 h-6 stroke-[2.5]" />
              </div>
              <span className="text-2xl font-black text-white">
                AgriFinance<span className="text-farm-light">AI</span>
              </span>
            </div>

            <p className="text-farm-pale/80 text-base font-normal max-w-md leading-relaxed">
              {t.footer.tagline}
            </p>

            <div className="flex items-center gap-2 text-xs text-farm-pale/70 font-semibold">
              <span>{t.footer.careNote}</span>
              <Heart className="w-4 h-4 text-red-400 fill-red-400" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-lg font-bold text-farm-accent">{t.footer.navTitle}</h4>
            <ul className="space-y-2 text-farm-pale/80 text-base font-medium">
              <li><a href="#what-it-does" className="hover:text-white transition-colors">{t.nav.whatItDoes}</a></li>
              <li><a href="#how-it-works" className="hover:text-white transition-colors">{t.nav.howItWorks}</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">{t.nav.features}</a></li>
              <li><a href="#reviews" className="hover:text-white transition-colors">{t.nav.farmerStories}</a></li>
            </ul>
          </div>

          {/* Help & Support */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-lg font-bold text-farm-accent">{t.footer.supportTitle}</h4>
            <div className="space-y-2 text-farm-pale/80 text-base font-medium">
              <p className="flex items-center gap-2 font-bold text-white">
                <Phone className="w-4 h-4 text-farm-light shrink-0" />
                <span>1800-123-FARM (3276)</span>
              </p>
              <p className="text-xs text-farm-pale/60">{t.footer.timing}</p>
              <p className="text-xs text-farm-pale/60">{t.footer.helplineDesc}</p>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-farm-pale/60 font-medium gap-4">
          <p>{t.footer.copyright}</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white">{t.footer.privacy}</a>
            <a href="#" className="hover:text-white">{t.footer.terms}</a>
            <a href="#" className="hover:text-white">{t.footer.security}</a>
          </div>
        </div>

      </div>

    </footer>
  );
};
