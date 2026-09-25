import React from 'react';
import { Star, Quote } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const TestimonialsSection: React.FC = () => {
  const { t } = useLanguage();

  const testimonials = [
    {
      quote: t.testimonials.t1Quote,
      name: t.testimonials.t1Name,
      farm: t.testimonials.t1Farm,
      avatar: "🌾"
    },
    {
      quote: t.testimonials.t2Quote,
      name: t.testimonials.t2Name,
      farm: t.testimonials.t2Farm,
      avatar: "👳‍♂️"
    },
    {
      quote: t.testimonials.t3Quote,
      name: t.testimonials.t3Name,
      farm: t.testimonials.t3Farm,
      avatar: "🚜"
    }
  ];

  return (
    <section id="reviews" className="py-16 md:py-24 bg-farm-tan/60 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <span className="text-xs font-black uppercase tracking-widest text-farm-green bg-white px-4 py-1.5 rounded-full border border-farm-medium/20 shadow-sm">
            {t.testimonials.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 tracking-tight">
            {t.testimonials.title}
          </h2>
          <p className="text-xl text-stone-700 font-medium">
            {t.testimonials.subtitle}
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-8 border-2 border-stone-200 shadow-card hover:shadow-lifted transition-all flex flex-col justify-between space-y-6 relative"
            >
              <div className="space-y-4">
                
                {/* 5-Star Rating */}
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 stroke-amber-400" />
                  ))}
                  <span className="ml-2 text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">100% FREE</span>
                </div>

                <Quote className="w-10 h-10 text-farm-green/20 shrink-0" />

                <p className="text-stone-800 text-lg font-normal leading-relaxed italic">
                  "{item.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-stone-100 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-farm-pale text-2xl flex items-center justify-center shrink-0 border border-farm-medium/20">
                  {item.avatar}
                </div>
                <div>
                  <h3 className="font-extrabold text-stone-900 text-lg leading-tight">
                    {item.name}
                  </h3>
                  <p className="text-xs font-bold text-farm-dark mt-0.5">
                    {item.farm}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
