import React, { useState } from 'react';
import { 
  AlertOctagon, 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  Compass, 
  ShieldCheck, 
  TrendingUp, 
  DollarSign, 
  IndianRupee, 
  Lightbulb, 
  Sparkles,
  Volume2,
  ChevronRight,
  RotateCcw,
  Check
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { speakText } from '../utils/speechUtils';

interface RiskAlertBannerProps {
  totalExpenses: number;
  projectedRevenue: number;
  costPerAcre: number;
  targetCostPerAcre: number;
  onSimulateHighExpense: () => void;
  onResetExpenses: () => void;
  onApplyRouteFix?: (savingsAmount: number) => void;
}

export const RiskAlertBanner: React.FC<RiskAlertBannerProps> = ({
  totalExpenses,
  projectedRevenue,
  costPerAcre,
  targetCostPerAcre,
  onSimulateHighExpense,
  onResetExpenses,
  onApplyRouteFix,
}) => {
  const { t, language } = useLanguage();
  const [selectedRoute, setSelectedRoute] = useState<number | null>(null);
  const [routeApplied, setRouteApplied] = useState<boolean>(false);
  const [appliedSavings, setAppliedSavings] = useState<number>(0);

  // Financial Risk Calculations
  const expenseRatio = projectedRevenue > 0 ? (totalExpenses / projectedRevenue) * 100 : 0;
  const isExtremeRisk = expenseRatio >= 85 || costPerAcre > targetCostPerAcre * 1.25;
  const isModerateRisk = expenseRatio >= 65 && expenseRatio < 85;

  // 4 Correct Escape Routes tailored for Indian Farmers
  const escapeRoutes = [
    {
      id: 1,
      title: language === 'te' ? 'మార్గం 1: అనవసర ఖర్చులను వాయిదా వేయండి' : language === 'hi' ? 'रास्ता 1: गैर-जरूरी खर्चों को टालें' : 'Route 1: Defer Non-Essential Outflows',
      savingsText: '₹18,500',
      savingsNum: 18500,
      badge: language === 'te' ? 'అత్యంత సులభం' : language === 'hi' ? 'सबसे आसान' : 'EASIEST & FASTEST',
      description: language === 'te' 
        ? 'ట్రాక్టర్ కలర్/సర్వీసింగ్ మరియు అదనపు స్ప్రేలను కోతల వరకు వాయిదా వేయండి.' 
        : language === 'hi' 
        ? 'ट्रैक्टर पेंट/सर्विसिंग और अतिरिक्त स्प्रे को फसल कटाई तक टालें।' 
        : 'Delay non-essential tractor servicing & extra pesticide sprays until harvest checks clear.',
      steps: [
        language === 'te' ? 'ట్రాక్టర్ మెయింటెనెన్స్ పోస్ట్‌పోన్ చేయండి (₹12,000 ఆదా)' : 'Postpone tractor maintenance (Save ₹12,000)',
        language === 'te' ? 'అనవసర మైక్రోన్యూట్రియెంట్ స్ప్రే నిలిపివేయండి (₹6,500 ఆదా)' : 'Pause extra micronutrient spray (Save ₹6,500)',
      ],
      speech: language === 'te'
        ? 'అపాయం నుండి తప్పించుకునే మార్గం 1: ట్రాక్టర్ సర్వీసింగ్ మరియు అదనపు మందుల స్ప్రేలను కోతల వరకు వాయిదా వేయండి. దీనివల్ల 18 వేల 5 వందల రూపాయలు ఆదా అవుతాయి.'
        : language === 'hi'
        ? 'जोखिम से बचने का रास्ता 1: ट्रैक्टर सर्विसिंग और अतिरिक्त स्प्रे को कटाई तक टालें। इससे 18 हजार 5 सौ रुपये की बचत होगी।'
        : 'Escape Route 1: Postpone tractor servicing and extra pesticide sprays until harvest. This saves 18 thousand 5 hundred Rupees immediately.'
    },
    {
      id: 2,
      title: language === 'te' ? 'మార్గం 2: ప్రభుత్వ సబ్సిడీ & PM-కిసాన్ నిధులు పొందండి' : language === 'hi' ? 'रास्ता 2: सरकारी सब्सिडी और पीएम-किसान फंड पाएं' : 'Route 2: Unlock Govt Subsidy & PM-KISAN Funds',
      savingsText: '₹12,000',
      savingsNum: 12000,
      badge: language === 'te' ? 'ప్రభుత్వ సహాయం' : language === 'hi' ? 'सरकारी मदद' : 'GOVT BENEFIT',
      description: language === 'te'
        ? 'PM-KISAN వాయిదా మరియు ఎరువుల సబ్సిడీ అడ్వాన్స్ క్లెయిమ్ చేయండి.'
        : language === 'hi'
        ? 'पीएम-किसान किस्त और खाद सब्सिडी एडवांस तुरंत क्लेम करें।'
        : 'Claim PM-KISAN installment & advance fertilizer subsidy credit from cooperative society.',
      steps: [
        language === 'te' ? 'PM-KISAN ఇన్స్టాల్మెంట్ పొందండి (₹6,000 క్రెడిట్)' : 'Claim PM-KISAN installment (₹6,000 credit)',
        language === 'te' ? 'సొసైటీ ఎరువుల సబ్సిడీ క్లెయిమ్ చేయండి (₹6,000 ఆదా)' : 'Claim society fertilizer subsidy (₹6,000 saved)',
      ],
      speech: language === 'te'
        ? 'అపాయం నుండి తప్పించుకునే మార్గం 2: పిఎం కిసాన్ డబ్బులు మరియు ఎరువుల సబ్సిడీ క్లెయిమ్ చేసుకోండి. 12 వేల రూపాయల అదనపు నిధులు లభిస్తాయి.'
        : language === 'hi'
        ? 'जोखिम से बचने का रास्ता 2: पीएम किसान किस्त और खाद सब्सिडी क्लेम करें। 12 हजार रुपये का फंड मिलेगा।'
        : 'Escape Route 2: Claim PM-KISAN funds and fertilizer subsidy. Gives you 12 thousand Rupees cash support.'
    },
    {
      id: 3,
      title: language === 'te' ? 'మార్గం 3: మండిలో కనీస మద్దతు ధర లాక్ చేయండి' : language === 'hi' ? 'रास्ता 3: मंडी में न्यूनतम समर्थन मूल्य लॉक करें' : 'Route 3: Lock Minimum Mandi Selling Price',
      savingsText: '₹22,000',
      savingsNum: 22000,
      badge: language === 'te' ? 'మార్కెట్ రక్షణ' : language === 'hi' ? 'बाजार सुरक्षा' : 'PRICE GUARANTEE',
      description: language === 'te'
        ? 'ధరలు తగ్గక ముందే క్వింటాల్‌కి ₹2,180 కనీస ధరతో మండి వ్యాపారితో ఒప్పందం చేసుకోండి.'
        : language === 'hi'
        ? 'दाम गिरने से पहले मंडी व्यापारी से ₹2,180/क्विंटल की न्यूनतम दर तय करें।'
        : 'Lock in minimum guaranteed sale contract of ₹2,180/qtl with local elevator before price drops.',
      steps: [
        language === 'te' ? 'వరి/పత్తి క్వింటాల్‌కి ₹2,180 లాక్ చేయండి' : 'Lock Paddy/Cotton rate at ₹2,180/qtl',
        language === 'te' ? 'మార్కెట్ పతనం నుండి ₹22,000 లాభం కాపాడుకోండి' : 'Protect ₹22,000 profit against price drop',
      ],
      speech: language === 'te'
        ? 'అపాయం నుండి తప్పించుకునే మార్గం 3: ధరలు పడిపోకముందే మండిలో క్వింటాల్‌కి 2180 రూపాయల ధర లాక్ చేసుకోండి. 22 వేల రూపాయల లాభం సురక్షితం అవుతుంది.'
        : language === 'hi'
        ? 'जोखिम से बचने का रास्ता 3: दाम गिरने से पहले मंडी में ₹2180/क्विंटल का भाव तय करें। ₹22000 का मुनाफा सुरक्षित होगा।'
        : 'Escape Route 3: Lock in minimum selling rate of 2180 Rupees per quintal in mandi to guarantee your harvest profit.'
    },
    {
      id: 4,
      title: language === 'te' ? 'మార్గం 4: పాడి ఆవుల రోజువారీ రాబడిని వాడండి' : language === 'hi' ? 'रास्ता 4: डेयरी दूध की दैनिक आय का उपयोग करें' : 'Route 4: Use Dairy Daily Cash Flow Bridge',
      savingsText: '₹15,000',
      savingsNum: 15000,
      badge: language === 'te' ? 'పాడి ఆదాయం' : language === 'hi' ? 'डेयरी आय' : 'DAIRY BRIDGE',
      description: language === 'te'
        ? 'పంట డబ్బులు వచ్చే 15 రోజుల గ్యాప్ కోసం పాల సొసైటీ రోజువారీ రాబడిని (₹500/రోజు) ఉపయోగించండి.'
        : language === 'hi'
        ? 'फसल के पैसे आने तक डेयरी दूध की दैनिक आय (₹500/दिन) का उपयोग करें।'
        : 'Use daily milk dairy center payouts (₹500/day) to bridge the 15-day gap until harvest checks clear.',
      steps: [
        language === 'te' ? 'రోజువారీ పాల ఆదాయం ₹500/రోజు వాడండి' : 'Utilize ₹500/day milk sales',
        language === 'te' ? '15 రోజుల గ్యాప్‌కి ₹15,000 ప్రత్యామ్నాయ నిధి' : '15-Day bridge fund of ₹15,000',
      ],
      speech: language === 'te'
        ? 'అపాయం నుండి తప్పించుకునే మార్గం 4: పంట డబ్బులు వచ్చే వరకు పాడి ఆవుల రోజువారీ పాల ఆదాయాన్ని ఉపయోగించండి.'
        : language === 'hi'
        ? 'जोखिम से बचने का रास्ता 4: फसल के पैसे आने तक डेयरी दूध की दैनिक आय का उपयोग करें।'
        : 'Escape Route 4: Use daily dairy milk sales as a cash bridge until harvest checks arrive.'
    }
  ];

  const handleApplyRoute = (route: typeof escapeRoutes[0]) => {
    setSelectedRoute(route.id);
    setRouteApplied(true);
    setAppliedSavings(route.savingsNum);
    speakText(route.speech, language);

    if (onApplyRouteFix) {
      onApplyRouteFix(route.savingsNum);
    }
  };

  const handleResetRoute = () => {
    setRouteApplied(false);
    setSelectedRoute(null);
    setAppliedSavings(0);
    onResetExpenses();
  };

  return (
    <div className="space-y-4 text-left">
      
      {/* 🔴 EXTREME RISK CRITICAL ALERT CARD */}
      {isExtremeRisk && !routeApplied && (
        <div className="bg-red-50 border-4 border-red-600 rounded-3xl p-6 shadow-2xl space-y-5 animate-pulse-gentle">
          
          {/* Header Warning */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="p-3.5 bg-red-600 text-white rounded-2xl shadow shrink-0">
                <AlertOctagon className="w-9 h-9 stroke-[2.5]" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="bg-red-600 text-white text-[11px] font-black px-3 py-0.5 rounded-full uppercase tracking-wider">
                    🔴 CRITICAL FINANCIAL RISK
                  </span>
                  <span className="text-xs font-black text-red-700 uppercase">EXPENSES OUT OF HAND</span>
                </div>
                <h3 className="text-2xl font-black text-red-950 leading-tight">
                  {language === 'te' 
                    ? `అపాయ హెచ్చరిక: వ్యవసాయ ఖర్చులు (₹${totalExpenses.toLocaleString('en-IN')}) ఆదాయంలో ${Math.round(expenseRatio)}% కి చేరాయి!` 
                    : language === 'hi' 
                    ? `जोखिम अलर्ट: खेती के खर्च (₹${totalExpenses.toLocaleString('en-IN')}) आय के ${Math.round(expenseRatio)}% तक पहुँच गए हैं!` 
                    : `CRITICAL RISK: Farm expenses (₹${totalExpenses.toLocaleString('en-IN')}) have crossed ${Math.round(expenseRatio)}% of harvest income!`}
                </h3>
                <p className="text-sm font-semibold text-red-800 leading-relaxed">
                  {language === 'te'
                    ? `మీ ఎకరా ఖర్చు (₹${costPerAcre.toLocaleString('en-IN')}/ఎకరా) పరిమితి దాటిపోయింది. పంట కోతల ముందే నష్టం వచ్చే ప్రమాదం ఉంది!`
                    : language === 'hi'
                    ? `आपकी प्रति एकड़ लागत (₹${costPerAcre.toLocaleString('en-IN')}/एकड़) बजट से ज्यादा है। कटाई से पहले नुकसान का जोखिम है!`
                    : `Cost per acre (₹${costPerAcre.toLocaleString('en-IN')}/acre) has exceeded target budget. High risk of cash loss before harvest!`}
                </p>
              </div>
            </div>

            <button
              onClick={() => speakText(
                language === 'te'
                  ? `హెచ్చరిక! మీ వ్యవసాయ ఖర్చులు చాలా ఎక్కువగా ఉన్నాయి. అపాయం నుండి తప్పించుకోవడానికి కింద ఉన్న సరైన మార్గాలను ఎంచుకోండి.`
                  : language === 'hi'
                  ? `चेतावनी! आपके खेती के खर्च बहुत ज्यादा हैं। जोखिम से बचने के लिए नीचे दिए गए सही रास्तों को चुनें।`
                  : `Warning! Your farm expenses are out of hand. Select a correct escape route below to protect your money.`,
                language
              )}
              className="p-3 bg-red-600 text-white hover:bg-red-700 rounded-2xl shadow flex items-center gap-1.5 text-xs font-extrabold shrink-0"
              title="Listen to Risk Diagnosis"
            >
              <Volume2 className="w-5 h-5 text-farm-accent animate-pulse" />
              <span className="hidden sm:inline">Listen Diagnosis 🔊</span>
            </button>
          </div>

          {/* 🧭 CORRECT ROUTE TO ESCAPE RISK SELECTOR */}
          <div className="bg-white p-5 rounded-2xl border-2 border-red-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-farm-green text-farm-accent flex items-center justify-center font-bold">
                  <Compass className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-black text-stone-900">
                  {language === 'te' ? '🧭 అపాయం నుండి తప్పించుకునే సరైన మార్గం ఎంచుకోండి' : language === 'hi' ? '🧭 जोखिम से बचने का सही रास्ता चुनें' : '🧭 Select Correct Route to Escape Financial Risk'}
                </h4>
              </div>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                4 ACTIONABLE ROUTES
              </span>
            </div>

            {/* 4 Escape Route Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {escapeRoutes.map((route) => (
                <div
                  key={route.id}
                  className="p-4 rounded-2xl border-2 border-stone-200 hover:border-farm-green bg-stone-50 hover:bg-farm-pale/60 transition-all flex flex-col justify-between space-y-3 group text-left"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase bg-farm-green text-white px-2.5 py-0.5 rounded-full">
                        {route.badge}
                      </span>
                      <span className="text-xs font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                        Saves {route.savingsText}
                      </span>
                    </div>

                    <h5 className="font-extrabold text-stone-900 text-base leading-snug">
                      {route.title}
                    </h5>

                    <p className="text-xs text-stone-600 font-medium">
                      {route.description}
                    </p>

                    <div className="pt-1 space-y-1">
                      {route.steps.map((s, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 text-[11px] font-semibold text-stone-800">
                          <Check className="w-3.5 h-3.5 text-farm-green shrink-0" />
                          <span>{s}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => handleApplyRoute(route)}
                    className="w-full bg-farm-green hover:bg-farm-dark text-white font-extrabold text-xs py-2.5 rounded-xl shadow transition-all flex items-center justify-center gap-1.5 group-hover:scale-102"
                  >
                    <span>{language === 'te' ? 'ఈ మార్గాన్ని వర్తింపజేయండి' : language === 'hi' ? 'यह रास्ता अपनाएं' : 'Apply This Escape Route'}</span>
                    <ArrowRight className="w-4 h-4 text-farm-accent" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end pt-1">
            <button
              onClick={onResetExpenses}
              className="bg-stone-800 hover:bg-black text-white font-bold text-xs px-4 py-2 rounded-xl transition-colors"
            >
              Reset Expenses Baseline
            </button>
          </div>

        </div>
      )}

      {/* 🎉 SUCCESS: RISK ESCAPED SAFE STATE CARD */}
      {routeApplied && (
        <div className="bg-emerald-800 text-white rounded-3xl p-6 shadow-2xl border-4 border-emerald-400 space-y-4 animate-fade-in">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-farm-accent text-farm-dark flex items-center justify-center font-black text-2xl shadow">
                <ShieldCheck className="w-9 h-9" />
              </div>
              <div>
                <span className="bg-farm-accent text-farm-dark text-[11px] font-black px-3 py-0.5 rounded-full uppercase tracking-wider">
                  🎉 RISK SUCCESSFULLY ESCAPED!
                </span>
                <h3 className="text-2xl font-black text-white mt-1">
                  {language === 'te' 
                    ? `అభినందనలు! మీ వ్యవసాయ అపాయం తొలగిపోయింది (ఆదా: +₹${appliedSavings.toLocaleString('en-IN')})` 
                    : language === 'hi' 
                    ? `बधाई हो! खेती का जोखिम दूर हो गया है (बचत: +₹${appliedSavings.toLocaleString('en-IN')})` 
                    : `Congratulations! Financial Risk Level Reduced to SAFE (Savings: +₹${appliedSavings.toLocaleString('en-IN')})`}
                </h3>
                <p className="text-xs text-farm-pale font-medium mt-1">
                  Correct route applied. Expenses are now within safe limits and your harvest profit is protected!
                </p>
              </div>
            </div>

            <button
              onClick={handleResetRoute}
              className="p-2.5 bg-emerald-900 hover:bg-emerald-950 text-white rounded-xl text-xs font-extrabold flex items-center gap-1 border border-emerald-600"
              title="Reset Escape Route"
            >
              <RotateCcw className="w-4 h-4" />
              <span className="hidden sm:inline">Change Route</span>
            </button>
          </div>

          <div className="bg-emerald-950/80 p-4 rounded-2xl border border-emerald-700/60 flex items-center justify-between text-xs sm:text-sm font-bold">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-farm-accent" />
              <span>Current Status: <strong>SAFE & PROFITABLE (100% On Track)</strong></span>
            </div>
            <span className="text-farm-accent font-black">Net Savings: +₹{appliedSavings.toLocaleString('en-IN')}</span>
          </div>
        </div>
      )}

      {/* 🟠 MODERATE RISK WARNING CARD */}
      {isModerateRisk && !routeApplied && (
        <div className="bg-amber-50 border-3 border-amber-400 rounded-2xl p-5 shadow space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <div className="p-3 bg-amber-500 text-white rounded-xl shadow shrink-0">
                <AlertTriangle className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <span className="bg-amber-500 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  🟠 MODERATE RISK WARNING
                </span>
                <h3 className="text-lg font-black text-amber-950">
                  Expenses Crossing 65% Threshold (₹{totalExpenses.toLocaleString('en-IN')})
                </h3>
                <p className="text-xs font-semibold text-amber-900">
                  Keep a close watch on diesel and pesticide bills over the next 30 days to avoid cash shortages.
                </p>
              </div>
            </div>

            <button
              onClick={onSimulateHighExpense}
              className="bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-xs px-3 py-2 rounded-xl shadow shrink-0"
            >
              Simulate High Risk
            </button>
          </div>
        </div>
      )}

      {/* 🟢 HEALTHY STATUS CARD */}
      {!isExtremeRisk && !isModerateRisk && !routeApplied && (
        <div className="bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-600 text-white rounded-xl shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-extrabold text-emerald-950 text-base">Farm Expenses Are Within Healthy Budget Target</h4>
              <p className="text-xs text-emerald-800 font-semibold">
                Cost per acre: ₹{costPerAcre.toLocaleString('en-IN')}/acre • Expense Ratio: {Math.round(expenseRatio)}% of harvest revenue.
              </p>
            </div>
          </div>

          {/* Simulator Toggle Button for User Testing */}
          <button
            onClick={onSimulateHighExpense}
            className="bg-amber-100 hover:bg-amber-200 text-amber-950 border border-amber-300 font-extrabold text-xs px-3.5 py-2 rounded-xl transition-colors shadow-sm shrink-0 w-full sm:w-auto"
            title="Test Risk Alert system"
          >
            ⚠️ Test Risk Alert (Simulate High Expense)
          </button>
        </div>
      )}

    </div>
  );
};
