import React, { useState } from 'react';
import { Camera, Calculator, CheckCircle2, ArrowRight, Sparkles, Check, AlertCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const HowItWorksSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const { t } = useLanguage();

  const steps = [
    {
      number: 1,
      icon: Camera,
      title: t.howItWorks.step1Title,
      description: t.howItWorks.step1Desc,
      detail: t.howItWorks.step1Detail,
      previewTitle: t.howItWorks.step1Header,
      previewComponent: (
        <div className="space-y-4 text-left">
          <div className="bg-stone-900 text-white p-4 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Camera className="w-5 h-5 text-farm-accent animate-pulse" />
              <span className="font-bold text-sm">{t.howItWorks.step1Detected}</span>
            </div>
            <span className="text-xs bg-farm-green px-2.5 py-1 rounded-full text-white font-bold">100% FREE</span>
          </div>
          
          <div className="border-2 border-dashed border-farm-green/40 bg-farm-pale/50 p-6 rounded-2xl text-center space-y-2">
            <div className="w-16 h-16 bg-white text-farm-green rounded-full flex items-center justify-center mx-auto shadow-md text-2xl">
              🧾
            </div>
            <p className="font-extrabold text-stone-900 text-lg">"{t.howItWorks.step1Item}"</p>
            <p className="text-sm font-semibold text-stone-700">{t.howItWorks.step1Category}</p>
            <div className="inline-flex items-center gap-1 text-emerald-800 bg-emerald-100 text-xs font-bold px-3 py-1 rounded-full">
              <Check className="w-3.5 h-3.5" /> Auto-Tagged: Fertilizer Input
            </div>
          </div>
        </div>
      )
    },
    {
      number: 2,
      icon: Calculator,
      title: t.howItWorks.step2Title,
      description: t.howItWorks.step2Desc,
      detail: t.howItWorks.step2Detail,
      previewTitle: t.howItWorks.step2Header,
      previewComponent: (
        <div className="space-y-4 text-left">
          <div className="bg-farm-dark text-white p-4 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-farm-accent" />
              <span className="font-bold text-sm">Calculating Field Economics</span>
            </div>
            <span className="text-xs text-farm-pale font-medium">5 Acres Paddy</span>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center p-3 bg-white rounded-xl border border-stone-200 text-sm font-semibold">
              <span>{t.howItWorks.step2Item1}</span>
              <span className="font-bold text-stone-900">₹42,500.00</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-white rounded-xl border border-stone-200 text-sm font-semibold">
              <span>{t.howItWorks.step2Item2}</span>
              <span className="font-bold text-stone-900">₹31,750.00</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-farm-pale border border-farm-medium/30 rounded-xl text-stone-900 font-extrabold text-base">
              <span>{t.howItWorks.step2TotalCost}</span>
            </div>
          </div>
        </div>
      )
    },
    {
      number: 3,
      icon: CheckCircle2,
      title: t.howItWorks.step3Title,
      description: t.howItWorks.step3Desc,
      detail: t.howItWorks.step3Detail,
      previewTitle: t.howItWorks.step3Header,
      previewComponent: (
        <div className="space-y-4 text-left">
          <div className="bg-emerald-600 text-white p-4 rounded-2xl flex items-center gap-3 shadow-md">
            <CheckCircle2 className="w-8 h-8 text-farm-accent shrink-0" />
            <div>
              <h4 className="font-extrabold text-base">{t.howItWorks.step3StatusTitle}</h4>
              <p className="text-xs text-emerald-100">{t.howItWorks.step3StatusSub}</p>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-300 p-4 rounded-2xl flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h5 className="font-bold text-amber-950 text-sm">{t.howItWorks.step3AlertTitle}</h5>
              <p className="text-xs text-amber-900 leading-relaxed mt-1">
                {t.howItWorks.step3AlertSub}
              </p>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-farm-tan relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-black uppercase tracking-widest text-farm-green bg-white px-4 py-1.5 rounded-full border border-farm-medium/20 shadow-sm">
            {t.howItWorks.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 tracking-tight">
            {t.howItWorks.title}
          </h2>
          <p className="text-xl text-stone-700 font-medium">
            {t.howItWorks.subtitle}
          </p>
        </div>

        {/* Steps + Preview Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Step Selectors Column */}
          <div className="lg:col-span-6 space-y-4">
            {steps.map((step) => {
              const Icon = step.icon;
              const isActive = activeStep === step.number;
              return (
                <div
                  key={step.number}
                  onClick={() => setActiveStep(step.number)}
                  className={`cursor-pointer p-6 rounded-3xl transition-all border-3 ${
                    isActive
                      ? 'bg-white border-farm-green shadow-lifted ring-2 ring-farm-green/20'
                      : 'bg-white/60 border-transparent hover:bg-white hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-2xl font-black text-xl flex items-center justify-center shrink-0 shadow-sm transition-colors ${
                        isActive
                          ? 'bg-farm-green text-farm-accent'
                          : 'bg-stone-200 text-stone-700'
                      }`}
                    >
                      {step.number}
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Icon className={`w-5 h-5 ${isActive ? 'text-farm-green' : 'text-stone-500'}`} />
                        <h3 className="text-xl font-extrabold text-stone-900">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-stone-700 text-base font-normal leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Interactive Live Screen Box */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-farm-green/20 space-y-6">
              
              <div className="flex items-center justify-between border-b border-stone-200 pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                  <span className="ml-2 text-xs font-bold text-stone-500 uppercase tracking-wider">
                    {steps[activeStep - 1].previewTitle}
                  </span>
                </div>
                <span className="text-xs font-bold bg-farm-pale text-farm-dark px-3 py-1 rounded-full">
                  STEP {activeStep} OF 3
                </span>
              </div>

              {/* Display Active Step Component */}
              <div className="py-2">
                {steps[activeStep - 1].previewComponent}
              </div>

              <div className="bg-farm-tan/80 p-4 rounded-2xl text-stone-700 text-xs sm:text-sm font-medium border border-farm-earth/10 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-farm-green shrink-0" />
                <span><strong>{t.howItWorks.benefitLabel}</strong> {steps[activeStep - 1].detail}</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
