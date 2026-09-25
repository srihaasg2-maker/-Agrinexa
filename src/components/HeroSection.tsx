import React from 'react';
import { Camera, CheckCircle2, ShieldCheck, WifiOff, ArrowRight, Sparkles, IndianRupee, TrendingUp, Gift } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface HeroSectionProps {
  onOpenModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenModal }) => {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-14 md:pb-24 bg-gradient-to-b from-farm-tan via-farm-pale/30 to-farm-tan">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* 100% Free Badge */}
            <div className="inline-flex items-center gap-2 bg-emerald-100 border border-emerald-300 px-4 py-2 rounded-full shadow-sm text-emerald-950 font-bold text-sm sm:text-base">
              <Gift className="w-5 h-5 text-emerald-700" />
              <span>{t.hero.badge} • <strong className="text-farm-green uppercase">100% FREE FOREVER</strong></span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-stone-900 tracking-tight leading-[1.15]">
              {t.hero.headline} <span className="text-farm-green underline decoration-farm-accent underline-offset-8">{t.hero.headlineHighlight}</span>
            </h1>

            {/* Subtext */}
            <p className="text-xl sm:text-2xl text-stone-700 font-normal leading-relaxed max-w-2xl">
              {t.hero.subtext}
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={onOpenModal}
                className="bg-farm-green hover:bg-farm-dark text-white font-extrabold text-xl px-8 py-5 rounded-2xl shadow-lifted hover:shadow-xl transition-all flex items-center justify-center gap-3 active:scale-98 group"
              >
                <span>{t.hero.primaryCta}</span>
                <ArrowRight className="w-6 h-6 text-farm-accent group-hover:translate-x-1 transition-transform" />
              </button>
              
              <a
                href="#how-it-works"
                className="bg-white hover:bg-farm-pale text-stone-800 font-bold text-lg px-6 py-5 rounded-2xl border-2 border-stone-300 hover:border-farm-green transition-all text-center flex items-center justify-center gap-2 shadow-sm"
              >
                <span>{t.hero.secondaryCta}</span>
              </a>
            </div>

            {/* Reassurance Micro-Badges */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-stone-800 font-bold text-sm sm:text-base border-t border-stone-200/80">
              <div className="flex items-center gap-2">
                <Gift className="w-5 h-5 text-farm-green shrink-0" />
                <span>{t.hero.freeForever}</span>
              </div>
              <div className="flex items-center gap-2">
                <WifiOff className="w-5 h-5 text-farm-green shrink-0" />
                <span>{t.hero.worksOffline}</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-farm-green shrink-0" />
                <span>{t.hero.privateSecure}</span>
              </div>
            </div>

          </div>

          {/* Right Visual Phone Mockup / Snapshot Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border-4 border-farm-green/20 space-y-5">
              
              {/* Phone Header Mock */}
              <div className="bg-farm-dark text-white p-4 rounded-2xl flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-farm-accent/20 text-farm-accent flex items-center justify-center font-bold text-xl">
                    🌾
                  </div>
                  <div>
                    <h3 className="font-bold text-base leading-tight">{t.hero.receiptHeader}</h3>
                    <p className="text-xs text-farm-pale/80">{t.hero.receiptSub}</p>
                  </div>
                </div>
                <span className="bg-emerald-500 text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
                  100% FREE
                </span>
              </div>

              {/* Receipt Snap Demo Box */}
              <div className="bg-farm-pale/60 border border-farm-medium/20 rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between text-stone-800">
                  <div className="flex items-center gap-2">
                    <Camera className="w-5 h-5 text-farm-green" />
                    <span className="font-bold text-xs uppercase tracking-wide text-farm-dark">{t.hero.scannedTitle}</span>
                  </div>
                  <span className="text-[11px] font-semibold text-stone-500">Today, 9:15 AM</span>
                </div>
                
                <div className="bg-white p-3 rounded-xl shadow-sm border border-stone-200 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-stone-900 text-base">{t.hero.itemTitle}</p>
                    <p className="text-xs text-emerald-800 font-semibold">{t.hero.autoTagged}</p>
                  </div>
                  <span className="font-black text-stone-900 text-xl">₹8,450.00</span>
                </div>
              </div>

              {/* Real-time Rupee Math Summary Badges */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-left">
                  <div className="flex items-center gap-1 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-1">
                    <IndianRupee className="w-4 h-4 text-emerald-600" /> {t.hero.costPerAcreLabel}
                  </div>
                  <p className="text-2xl font-black text-emerald-950">{t.hero.costPerAcreValue}<span className="text-xs font-semibold text-emerald-700"> /acre</span></p>
                  <p className="text-xs text-emerald-700 font-medium mt-1">{t.hero.costStatus}</p>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-left">
                  <div className="flex items-center gap-1 text-amber-800 text-xs font-bold uppercase tracking-wider mb-1">
                    <TrendingUp className="w-4 h-4 text-amber-600" /> {t.hero.estProfitLabel}
                  </div>
                  <p className="text-2xl font-black text-amber-950">{t.hero.estProfitValue}</p>
                  <p className="text-xs text-amber-800 font-medium mt-1">{t.hero.breakEvenText}</p>
                </div>
              </div>

              {/* Status Alert Badge */}
              <div className="bg-stone-900 text-white p-4 rounded-2xl flex items-center gap-3 shadow-md">
                <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                <p className="text-xs sm:text-sm font-medium leading-snug">
                  <strong className="text-farm-accent font-bold">{t.hero.smartAlertTitle}</strong> {t.hero.smartAlertText}
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
