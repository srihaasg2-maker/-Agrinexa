import React from 'react';
import { WifiOff, ShieldCheck, Gift, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const TrustStripSection: React.FC = () => {
  const { t } = useLanguage();

  const trustItems = [
    {
      icon: Gift,
      title: t.trust.freeTitle,
      description: t.trust.freeDesc,
    },
    {
      icon: WifiOff,
      title: t.trust.offlineTitle,
      description: t.trust.offlineDesc,
    },
    {
      icon: ShieldCheck,
      title: t.trust.privacyTitle,
      description: t.trust.privacyDesc,
    },
  ];

  return (
    <section className="py-14 bg-farm-dark text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {trustItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-farm-green/40 border border-farm-medium/30 p-6 rounded-2xl flex flex-col md:flex-row items-center md:items-start gap-4 shadow-sm"
              >
                <div className="p-3 bg-farm-accent text-farm-dark rounded-xl shrink-0 font-extrabold shadow-md">
                  <Icon className="w-8 h-8 stroke-[2.5]" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-extrabold text-white flex items-center justify-center md:justify-start gap-2">
                    <span>{item.title}</span>
                    <CheckCircle2 className="w-4 h-4 text-farm-accent" />
                  </h3>
                  <p className="text-farm-pale/90 text-sm leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
