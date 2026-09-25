import React from 'react';
import { Camera, Scale, TrendingUp, AlertTriangle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const ValueCardsSection: React.FC = () => {
  const { t } = useLanguage();

  const cards = [
    {
      icon: Camera,
      title: t.valueCards.card1Title,
      subtitle: t.valueCards.card1Sub,
      description: t.valueCards.card1Desc,
      bgColor: 'bg-emerald-50',
      iconBg: 'bg-emerald-600',
      borderColor: 'border-emerald-200',
    },
    {
      icon: Scale,
      title: t.valueCards.card2Title,
      subtitle: t.valueCards.card2Sub,
      description: t.valueCards.card2Desc,
      bgColor: 'bg-amber-50',
      iconBg: 'bg-amber-600',
      borderColor: 'border-amber-200',
    },
    {
      icon: TrendingUp,
      title: t.valueCards.card3Title,
      subtitle: t.valueCards.card3Sub,
      description: t.valueCards.card3Desc,
      bgColor: 'bg-blue-50',
      iconBg: 'bg-blue-600',
      borderColor: 'border-blue-200',
    },
    {
      icon: AlertTriangle,
      title: t.valueCards.card4Title,
      subtitle: t.valueCards.card4Sub,
      description: t.valueCards.card4Desc,
      bgColor: 'bg-orange-50',
      iconBg: 'bg-orange-600',
      borderColor: 'border-orange-200',
    },
  ];

  return (
    <section id="what-it-does" className="py-16 md:py-24 bg-white border-y border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <h2 className="text-xs font-black uppercase tracking-widest text-farm-green bg-farm-pale inline-block px-4 py-1.5 rounded-full border border-farm-medium/20">
            {t.valueCards.badge}
          </h2>
          <p className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 tracking-tight">
            {t.valueCards.title}
          </p>
          <p className="text-xl text-stone-600 font-medium">
            {t.valueCards.subtitle}
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className={`${card.bgColor} ${card.borderColor} border-2 rounded-3xl p-8 shadow-card hover:shadow-lifted transition-all duration-300 flex flex-col justify-between group`}
              >
                <div className="space-y-4">
                  
                  {/* Icon & Title Row */}
                  <div className="flex items-start gap-4">
                    <div className={`${card.iconBg} text-white p-4 rounded-2xl shadow-md shrink-0 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-8 h-8 stroke-[2.5]" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-stone-900 leading-snug">
                        {card.title}
                      </h3>
                      <p className="text-base font-bold text-farm-dark mt-1">
                        {card.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-stone-700 text-lg font-normal leading-relaxed pt-2">
                    {card.description}
                  </p>

                </div>

                <div className="pt-6 border-t border-stone-900/10 flex items-center justify-between">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-stone-500">
                    {t.valueCards.keyFeature} #{idx + 1}
                  </span>
                  <span className="text-sm font-bold text-farm-green flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    {t.valueCards.learnMore}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
