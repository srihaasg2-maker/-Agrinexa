import React, { useState, useEffect } from 'react';
import { 
  Receipt, 
  Calculator, 
  CalendarDays, 
  BellRing, 
  MessageSquare, 
  Check, 
  Send,
  ArrowRight
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface FeaturesSectionProps {
  onOpenModal: () => void;
}

export const FeaturesSection: React.FC<FeaturesSectionProps> = ({ onOpenModal }) => {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<number>(0);
  const [chatMessage, setChatMessage] = useState<string>('');
  const [chatLog, setChatLog] = useState<Array<{ sender: 'user' | 'agent'; text: string }>>([]);

  // Update initial chat log whenever language changes
  useEffect(() => {
    setChatLog([
      { sender: 'user', text: t.features.f5Q1 },
      { sender: 'agent', text: t.features.f5A1 }
    ]);
  }, [language, t]);

  const features = [
    {
      id: 'tracker',
      icon: Receipt,
      name: t.features.f1Name,
      tagline: t.features.f1Tagline,
      description: t.features.f1Desc,
      bullets: [t.features.f1B1, t.features.f1B2, t.features.f1B3],
      demoUI: (
        <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm space-y-3">
          <div className="flex justify-between items-center pb-2 border-b border-stone-100">
            <span className="font-bold text-stone-900 text-base">{t.features.f1Title}</span>
            <span className="text-xs bg-farm-pale text-farm-green font-bold px-2.5 py-1 rounded-full">AUTO-TAGGED IN ₹</span>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 bg-farm-tan/50 rounded-xl text-sm">
              <div className="flex items-center gap-3">
                <span className="text-xl">⛽</span>
                <div>
                  <p className="font-bold text-stone-900">{t.features.f1Item1Name}</p>
                  <p className="text-xs text-stone-500">{t.features.f1Item1Sub}</p>
                </div>
              </div>
              <span className="font-black text-stone-900 text-base">-₹4,750.00</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-emerald-50/60 rounded-xl text-sm border border-emerald-100">
              <div className="flex items-center gap-3">
                <span className="text-xl">🌾</span>
                <div>
                  <p className="font-bold text-stone-900">{t.features.f1Item2Name}</p>
                  <p className="text-xs text-stone-500">{t.features.f1Item2Sub}</p>
                </div>
              </div>
              <span className="font-black text-emerald-700 text-base">+₹98,100.00</span>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'breakeven',
      icon: Calculator,
      name: t.features.f2Name,
      tagline: t.features.f2Tagline,
      description: t.features.f2Desc,
      bullets: [t.features.f2B1, t.features.f2B2, t.features.f2B3],
      demoUI: (
        <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-stone-500 uppercase">{t.features.f2Target}</p>
              <h4 className="text-xl font-extrabold text-stone-900">{t.features.f2Breakeven}</h4>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full">{t.features.f2Status}</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="w-full bg-stone-100 h-4 rounded-full overflow-hidden flex">
              <div className="bg-farm-green h-full text-[10px] text-white font-bold flex items-center justify-center" style={{ width: '65%' }}>₹1,850</div>
              <div className="bg-farm-accent h-full text-[10px] text-farm-dark font-bold flex items-center justify-center" style={{ width: '35%' }}>Profit</div>
            </div>
            <div className="flex justify-between text-xs text-stone-600 font-semibold">
              <span>{t.features.f2CostLabel}</span>
              <span>{t.features.f2ProfitLabel}</span>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'cashflow',
      icon: CalendarDays,
      name: t.features.f3Name,
      tagline: t.features.f3Tagline,
      description: t.features.f3Desc,
      bullets: [t.features.f3B1, t.features.f3B2, t.features.f3B3],
      demoUI: (
        <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm space-y-3">
          <p className="font-bold text-stone-900 text-sm">Monthly Inflows & Outflows in ₹</p>
          <div className="grid grid-cols-4 gap-2 text-center text-xs">
            <div className="bg-stone-50 p-2 rounded-xl border border-stone-200">
              <p className="text-red-600 font-bold font-mono">{t.features.f3Apr}</p>
            </div>
            <div className="bg-stone-50 p-2 rounded-xl border border-stone-200">
              <p className="text-red-600 font-bold font-mono">{t.features.f3Jul}</p>
            </div>
            <div className="bg-emerald-50 p-2 rounded-xl border border-emerald-300">
              <p className="text-emerald-700 font-black font-mono">{t.features.f3Oct}</p>
            </div>
            <div className="bg-stone-50 p-2 rounded-xl border border-stone-200">
              <p className="text-emerald-700 font-bold font-mono">{t.features.f3Dec}</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'alerts',
      icon: BellRing,
      name: t.features.f4Name,
      tagline: t.features.f4Tagline,
      description: t.features.f4Desc,
      bullets: [t.features.f4B1, t.features.f4B2, t.features.f4B3],
      demoUI: (
        <div className="bg-amber-50 rounded-2xl p-5 border border-amber-300 shadow-sm space-y-3">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-amber-500 text-white rounded-xl shadow-sm">
              <BellRing className="w-6 h-6" />
            </div>
            <div>
              <h5 className="font-extrabold text-amber-950 text-base">{t.features.f4AlertHeader}</h5>
              <p className="text-xs text-amber-800">{t.features.f4AlertSub}</p>
            </div>
          </div>
          <div className="bg-white p-3 rounded-xl text-xs font-semibold text-stone-700 border border-amber-200">
            💡 {t.features.f4Tip}
          </div>
        </div>
      )
    },
    {
      id: 'chat',
      icon: MessageSquare,
      name: t.features.f5Name,
      tagline: t.features.f5Tagline,
      description: t.features.f5Desc,
      bullets: [t.features.f5B1, t.features.f5B2, t.features.f5B3],
      demoUI: (
        <div className="bg-stone-900 text-white rounded-2xl p-4 shadow-sm space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-stone-800 text-xs text-stone-400 font-semibold">
            <span>{t.features.f5Header}</span>
            <span className="text-farm-accent">Online</span>
          </div>

          <div className="space-y-2 max-h-40 overflow-y-auto text-xs">
            {chatLog.map((msg, index) => (
              <div
                key={index}
                className={`p-2.5 rounded-xl ${
                  msg.sender === 'user'
                    ? 'bg-farm-green text-white ml-6 text-right font-medium'
                    : 'bg-stone-800 text-stone-100 mr-6 border border-stone-700'
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!chatMessage.trim()) return;
              setChatLog((prev) => [
                ...prev,
                { sender: 'user', text: chatMessage },
                { sender: 'agent', text: language === 'te' ? 'ఈ వివరాలను పరిశీలించి మీకు సమాధానం ఇస్తున్నాను.' : language === 'hi' ? 'जानकारी जांचकर उत्तर दे रहा हूँ।' : 'Processing your query...' }
              ]);
              setChatMessage('');
            }}
            className="flex gap-2 pt-1"
          >
            <input
              type="text"
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              placeholder={t.features.f5Placeholder}
              className="flex-1 bg-stone-800 border border-stone-700 text-xs px-3 py-2 rounded-xl text-white focus:outline-none focus:border-farm-light"
            />
            <button
              type="submit"
              className="bg-farm-green text-farm-accent font-bold px-3 py-2 rounded-xl text-xs hover:bg-farm-medium transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )
    }
  ];

  return (
    <section id="features" className="py-16 md:py-24 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <span className="text-xs font-black uppercase tracking-widest text-farm-green bg-farm-pale px-4 py-1.5 rounded-full border border-farm-medium/20">
            {t.features.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 tracking-tight">
            {t.features.title}
          </h2>
          <p className="text-xl text-stone-700 font-medium">
            {t.features.subtitle}
          </p>
        </div>

        {/* Interactive Feature Tabs + Preview Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Tabs Selector List */}
          <div className="lg:col-span-5 space-y-3">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              const isActive = activeTab === idx;
              return (
                <button
                  key={feature.id}
                  onClick={() => setActiveTab(idx)}
                  className={`w-full text-left p-4 sm:p-5 rounded-2xl transition-all border-2 flex items-start gap-4 ${
                    isActive
                      ? 'bg-farm-pale border-farm-green shadow-md ring-2 ring-farm-green/20'
                      : 'bg-white border-stone-200 hover:border-stone-400 hover:bg-stone-50'
                  }`}
                >
                  <div
                    className={`p-3 rounded-xl shrink-0 transition-colors ${
                      isActive ? 'bg-farm-green text-farm-accent' : 'bg-stone-100 text-stone-700'
                    }`}
                  >
                    <Icon className="w-6 h-6 stroke-[2.5]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-stone-900 leading-snug">
                      {feature.name}
                    </h3>
                    <p className="text-sm font-bold text-farm-dark mt-0.5">
                      {feature.tagline}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Feature Detail Card */}
          <div className="lg:col-span-7 bg-farm-tan/70 rounded-3xl p-6 sm:p-8 border-3 border-farm-earth/10 shadow-xl space-y-6">
            
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 bg-farm-green text-white text-xs font-bold px-3 py-1 rounded-full">
                <span>{t.features.showcase}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-stone-900">
                {features[activeTab].name}
              </h3>
              <p className="text-lg text-stone-700 font-medium leading-relaxed">
                {features[activeTab].description}
              </p>
            </div>

            {/* Bullets */}
            <div className="space-y-2.5 pt-2">
              {features[activeTab].bullets.map((bullet, index) => (
                <div key={index} className="flex items-center gap-3 text-stone-800 font-semibold text-base">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 font-bold text-xs">
                    <Check className="w-4 h-4" />
                  </div>
                  <span>{bullet}</span>
                </div>
              ))}
            </div>

            {/* Interactive Demo UI Card */}
            <div className="pt-2">
              {features[activeTab].demoUI}
            </div>

            {/* CTA */}
            <div className="pt-2 flex justify-end">
              <button
                onClick={onOpenModal}
                className="bg-farm-green text-white font-extrabold text-base px-6 py-3 rounded-xl shadow hover:bg-farm-dark transition-all flex items-center gap-2"
              >
                <span>{t.features.tryFree}</span>
                <ArrowRight className="w-4 h-4 text-farm-accent" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
