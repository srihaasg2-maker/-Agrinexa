import React, { useState, useEffect, useRef } from 'react';
import { 
  Sprout, 
  Camera, 
  Plus, 
  IndianRupee, 
  TrendingUp, 
  MessageSquare, 
  Send, 
  ArrowLeft, 
  Download, 
  Check, 
  Sparkles,
  CheckCircle2,
  Trash2,
  Globe,
  LogOut,
  Mic,
  Volume2,
  VolumeX,
  Zap,
  Activity,
  ShieldCheck,
  Compass
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { FarmerProfile } from './LoginPage';
import { CameraScanner } from './CameraScanner';
import { RiskAlertBanner } from './RiskAlertBanner';
import { 
  speakText, 
  stopSpeaking, 
  ProfessionalVoiceManager, 
  VoiceCommandResult,
  parseVoiceCommand
} from '../utils/speechUtils';
import { queryHuggingFaceLLM } from '../utils/huggingfaceApi';

interface FarmAppDashboardProps {
  profile: FarmerProfile;
  onLogout: () => void;
  onBackToLanding: () => void;
}

interface ChatMessage {
  id: number;
  sender: 'user' | 'agent';
  text: string;
  isCommand?: boolean;
}

export const FarmAppDashboard: React.FC<FarmAppDashboardProps> = ({
  profile,
  onLogout,
  onBackToLanding,
}) => {
  const { language, setLanguage, t } = useLanguage();
  const [activeView, setActiveView] = useState<'overview' | 'scanner' | 'calculator' | 'chat'>('overview');

  // Interactive Ledger State
  const [transactions, setTransactions] = useState([
    { id: 1, title: '5 Bags NPK Fertilizer', vendor: 'Sri Lakshmi Seeds', category: 'Fertilizer', amount: 8450, type: 'expense', date: 'Today' },
    { id: 2, title: 'Farm Tractor Diesel (50L)', vendor: 'Bharat Petroleum', category: 'Fuel', amount: 4750, type: 'expense', date: 'Yesterday' },
    { id: 3, title: 'Paddy Grain Sale (45 Qtl)', vendor: 'Agricultural Mandi', category: 'Sales', amount: 98100, type: 'income', date: 'Sep 22' },
  ]);

  // Calculator & Farm Size State
  const [acres, setAcres] = useState<number>(5);
  const [expectedYieldQtl, setExpectedYieldQtl] = useState<number>(100);
  const [mandiRateQtl, setMandiRateQtl] = useState<number>(2180);

  // Professional Voice State
  const [isListening, setIsListening] = useState<boolean>(false);
  const [voiceError, setVoiceError] = useState<string | null>(null);
  const [autoSpeak, setAutoSpeak] = useState<boolean>(true);
  const [currentlySpeakingId, setCurrentlySpeakingId] = useState<number | null>(null);
  const [commandFeedback, setCommandFeedback] = useState<string | null>(null);

  // Chat State
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  // Update Chat Welcome Message dynamically when Language Changes
  useEffect(() => {
    const welcomeText = language === 'te'
      ? `నమస్కారం ${profile.name} గారూ! నేను మీ అగ్రిలెక్సా (AgriNexa) AI వాయిస్ అసిస్టెంట్‌ని. "డీజిల్‌కు 3500 ఖర్చు రాసుకో" లేదా "నా నికర నిల్వ ఎంత?" అని మాట్లాడి చెప్పండి.`
      : language === 'hi'
      ? `नमस्ते ${profile.name} जी! मैं आपका एग्रीनेक्सा (AgriNexa) AI वॉइस असिस्टेंट हूँ। "डीजल के लिए 3500 खर्च जोड़ो" या "मेरा शुद्ध बैलेंस क्या है?" बोलकर आदेश दें।`
      : `Welcome ${profile.name}! I am your AgriNexa AI Voice Assistant. Speak commands like "Add 3500 diesel expense", "What is my net balance?", or "Apply escape route".`;

    setMessages([
      { id: 1, sender: 'agent', text: welcomeText }
    ]);
  }, [language, profile.name]);

  // Voice Manager Instance Ref
  const voiceManagerRef = useRef<ProfessionalVoiceManager | null>(null);

  // Financial Calculations
  const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
  const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const netBalance = totalIncome - totalExpenses;
  
  const costPerAcre = acres > 0 ? Math.round(totalExpenses / acres) : 0;
  const targetCostPerAcre = 14500;
  const projectedRevenue = expectedYieldQtl * mandiRateQtl;
  const breakEvenPrice = expectedYieldQtl > 0 ? Math.round(totalExpenses / expectedYieldQtl) : 0;
  const estimatedProfit = projectedRevenue - totalExpenses;

  // Handle Text-to-Speech Output
  const handleSpeakMessage = (msgId: number, text: string) => {
    setCurrentlySpeakingId(msgId);
    speakText(text, language, () => {
      setCurrentlySpeakingId(null);
    });
  };

  useEffect(() => {
    return () => stopSpeaking();
  }, [activeView, language]);

  // Voice Recording & Command Processor
  const handleToggleVoiceRecording = () => {
    setVoiceError(null);
    setCommandFeedback(null);

    if (isListening && voiceManagerRef.current) {
      voiceManagerRef.current.stopListening();
      return;
    }

    const manager = new ProfessionalVoiceManager(
      language,
      (transcript, command) => {
        setIsListening(false);
        if (transcript) {
          executeVoiceCommand(transcript, command);
        }
      },
      (errMessage) => {
        setIsListening(false);
        setVoiceError(errMessage);
      },
      (listeningState) => {
        setIsListening(listeningState);
      }
    );

    voiceManagerRef.current = manager;
    manager.startListening();
  };

  // Execute All Voice Commands
  const executeVoiceCommand = (transcript: string, command: VoiceCommandResult) => {
    setChatInput(transcript);

    // 1. Navigation Commands
    if (command.action === 'nav_camera') {
      const feedback = language === 'te' ? 'కెమెరా బిల్లు స్కాన్ తెరవబడింది 📷' : language === 'hi' ? 'कैमरा स्कैनर खोला गया 📷' : 'Opening Camera Bill Scanner 📷';
      setCommandFeedback(feedback);
      setActiveView('scanner');
      speakText(feedback, language);
      return;
    }
    if (command.action === 'nav_calculator') {
      const feedback = language === 'te' ? 'పంట లాభాల కాలిక్యులేటర్ తెరవబడింది 📈' : language === 'hi' ? 'प्रॉफिट कैलकुलेटर खोला गया 📈' : 'Opening Crop Profit Calculator 📈';
      setCommandFeedback(feedback);
      setActiveView('calculator');
      speakText(feedback, language);
      return;
    }
    if (command.action === 'nav_ledger') {
      const feedback = language === 'te' ? 'ఫార్మ్ లేడ్జర్ తెరవబడింది 💳' : language === 'hi' ? 'फार्म खाता खोला गया 💳' : 'Opening Farm Ledger 💳';
      setCommandFeedback(feedback);
      setActiveView('overview');
      speakText(feedback, language);
      return;
    }
    if (command.action === 'nav_chat') {
      const feedback = language === 'te' ? 'వాయిస్ అసిస్టెంట్ తెరవబడింది 🎙️' : language === 'hi' ? 'वॉइस असिस्टेंट खोला गया 🎙️' : 'Opening Voice Assistant 🎙️';
      setCommandFeedback(feedback);
      setActiveView('chat');
      speakText(feedback, language);
      return;
    }

    // 2. Command: Apply Emergency Escape Route
    if (command.action === 'apply_escape_route') {
      const savingsAmount = 18500;
      const savingsTx = {
        id: Date.now(),
        title: '🛡️ Voice Command: Escape Route 1 Applied',
        vendor: 'AgriNexa Risk Escaper',
        category: 'Savings Credit',
        amount: savingsAmount,
        type: 'income',
        date: 'Just Now'
      };
      setTransactions([savingsTx, ...transactions]);

      const feedback = language === 'te'
        ? `అభినందనలు! అపాయం నుండి తప్పించుకునే మార్గం వర్తింపజేయబడింది (+₹18,500 ఆదా)!`
        : language === 'hi'
        ? `बधाई हो! जोखिम से बचने का रास्ता लागू किया गया (+₹18,500 बचत)!`
        : `Congratulations! Emergency Risk Escape Route Applied (+₹18,500 Savings)!`;

      setCommandFeedback(feedback);
      const botMsg: ChatMessage = { id: Date.now(), sender: 'agent', text: `🎉 ${feedback}`, isCommand: true };
      setMessages((prev) => [...prev, { id: Date.now() - 1, sender: 'user', text: transcript }, botMsg]);
      
      if (autoSpeak) speakText(feedback, language);
      return;
    }

    // 3. Command: Add Expense
    if (command.action === 'add_expense' && command.amount) {
      const newTx = {
        id: Date.now(),
        title: command.itemTitle || `🎙️ Voice Added Expense`,
        vendor: 'Voice Command',
        category: command.category || 'Input Expense',
        amount: command.amount,
        type: 'expense',
        date: 'Just Now'
      };
      setTransactions([newTx, ...transactions]);

      const feedbackText = language === 'te'
        ? `మీ ఖాతాలో ₹${command.amount.toLocaleString('en-IN')} ఖర్చు నమోదు చేయబడింది!`
        : language === 'hi'
        ? `₹${command.amount.toLocaleString('en-IN')} का खर्च आपके खाते में जोड़ा गया!`
        : `Added ₹${command.amount.toLocaleString('en-IN')} expense to your farm ledger!`;

      setCommandFeedback(feedbackText);
      const botMsg: ChatMessage = { id: Date.now(), sender: 'agent', text: `✅ ${feedbackText}`, isCommand: true };
      setMessages((prev) => [...prev, { id: Date.now() - 1, sender: 'user', text: transcript }, botMsg]);
      
      if (autoSpeak) speakText(feedbackText, language);
      return;
    }

    // 4. Command: Add Income
    if (command.action === 'add_income' && command.amount) {
      const newTx = {
        id: Date.now(),
        title: command.itemTitle || `🎙️ Voice Added Harvest Income`,
        vendor: 'Agricultural Mandi',
        category: 'Sales',
        amount: command.amount,
        type: 'income',
        date: 'Just Now'
      };
      setTransactions([newTx, ...transactions]);

      const feedbackText = language === 'te'
        ? `మీ ఖాతాలో ₹${command.amount.toLocaleString('en-IN')} అమ్మకం ఆదాయం జమ చేయబడింది!`
        : language === 'hi'
        ? `₹${command.amount.toLocaleString('en-IN')} की बिक्री आय आपके खाते में जोड़ी गई!`
        : `Added ₹${command.amount.toLocaleString('en-IN')} income to your farm ledger!`;

      setCommandFeedback(feedbackText);
      const botMsg: ChatMessage = { id: Date.now(), sender: 'agent', text: `🌾 ${feedbackText}`, isCommand: true };
      setMessages((prev) => [...prev, { id: Date.now() - 1, sender: 'user', text: transcript }, botMsg]);

      if (autoSpeak) speakText(feedbackText, language);
      return;
    }

    // 5. Query Total Expense Command
    if (command.action === 'query_total_expense') {
      const text = language === 'te'
        ? `మీ వ్యవసాయ మొత్తం ఖర్చులు ₹${totalExpenses.toLocaleString('en-IN')}.`
        : language === 'hi'
        ? `आपकी खेती के कुल खर्च ₹${totalExpenses.toLocaleString('en-IN')} हैं।`
        : `Your total farm expenses are ₹${totalExpenses.toLocaleString('en-IN')}.`;

      setCommandFeedback(text);
      const botMsg: ChatMessage = { id: Date.now(), sender: 'agent', text, isCommand: true };
      setMessages((prev) => [...prev, { id: Date.now() - 1, sender: 'user', text: transcript }, botMsg]);
      if (autoSpeak) speakText(text, language);
      return;
    }

    // 6. Query Net Balance Command
    if (command.action === 'query_net_balance') {
      const text = language === 'te'
        ? `మీ ప్రస్తుత నికర రూపాయల నిల్వ ₹${netBalance.toLocaleString('en-IN')}.`
        : language === 'hi'
        ? `आपका वर्तमान शुद्ध बैलेंस ₹${netBalance.toLocaleString('en-IN')} है।`
        : `Your net farm balance is ₹${netBalance.toLocaleString('en-IN')}.`;

      setCommandFeedback(text);
      const botMsg: ChatMessage = { id: Date.now(), sender: 'agent', text, isCommand: true };
      setMessages((prev) => [...prev, { id: Date.now() - 1, sender: 'user', text: transcript }, botMsg]);
      if (autoSpeak) speakText(text, language);
      return;
    }

    // 7. Query Risk Status Command
    if (command.action === 'query_risk_status') {
      const expRatio = projectedRevenue > 0 ? Math.round((totalExpenses / projectedRevenue) * 100) : 0;
      const isRisk = expRatio >= 85;

      const text = isRisk
        ? (language === 'te' ? `హెచ్చరిక! మీ ఖర్చులు 85% నికి చేరాయి. అపాయం నుండి తప్పించుకునే మార్గాన్ని ఎంచుకోండి.` : language === 'hi' ? `चेतावनी! आपके खर्च 85% तक पहुँच गए हैं। जोखिम से बचने का रास्ता चुनें।` : `Warning! Your farm expense ratio is ${expRatio}%. High financial risk!`)
        : (language === 'te' ? `మీ వ్యవసాయ ఖర్చులు బడ్జెట్ పరిమితిలోనే సురక్షితంగా ఉన్నాయి.` : language === 'hi' ? `आपके खेती के खर्च बजट के भीतर सुरक्षित हैं।` : `Your farm expenses are within healthy safe budget targets.`);

      setCommandFeedback(text);
      const botMsg: ChatMessage = { id: Date.now(), sender: 'agent', text, isCommand: true };
      setMessages((prev) => [...prev, { id: Date.now() - 1, sender: 'user', text: transcript }, botMsg]);
      if (autoSpeak) speakText(text, language);
      return;
    }

    // 8. Query Cost per Acre
    if (command.action === 'query_cost') {
      const costText = language === 'te'
        ? `మీ ${acres} ఎకరాలకు ఎకరా ఖర్చు ₹${costPerAcre.toLocaleString('en-IN')}/ఎకరా.`
        : language === 'hi'
        ? `आपकी ${acres} एकड़ फसल की प्रति एकड़ लागत ₹${costPerAcre.toLocaleString('en-IN')}/एकड़ है।`
        : `Your cost per acre for ${acres} acres is ₹${costPerAcre.toLocaleString('en-IN')}/acre.`;

      setCommandFeedback(costText);
      const botMsg: ChatMessage = { id: Date.now(), sender: 'agent', text: costText, isCommand: true };
      setMessages((prev) => [...prev, { id: Date.now() - 1, sender: 'user', text: transcript }, botMsg]);

      if (autoSpeak) speakText(costText, language);
      return;
    }

    // 9. Query Profit
    if (command.action === 'query_profit') {
      const profitText = language === 'te'
        ? `మండి ధర ₹${mandiRateQtl}/క్వింటాల్‌ వద్ద మీ అంచనా లాభం +₹${estimatedProfit.toLocaleString('en-IN')}. బ్రేక్-ఈవెన్ ధర ₹${breakEvenPrice}/క్వింటాల్.`
        : language === 'hi'
        ? `मंडी भाव ₹${mandiRateQtl}/क्विंटल पर आपका अनुमानित लाभ +₹${estimatedProfit.toLocaleString('en-IN')} है। ब्रेक-ईवन दर ₹${breakEvenPrice}/क्विंटल है।`
        : `At ₹${mandiRateQtl}/qtl mandi rate, your estimated harvest profit is +₹${estimatedProfit.toLocaleString('en-IN')}. Target break-even rate is ₹${breakEvenPrice}/qtl.`;

      setCommandFeedback(profitText);
      const botMsg: ChatMessage = { id: Date.now(), sender: 'agent', text: profitText, isCommand: true };
      setMessages((prev) => [...prev, { id: Date.now() - 1, sender: 'user', text: transcript }, botMsg]);

      if (autoSpeak) speakText(profitText, language);
      return;
    }

    // Default General AI Conversation
    processGeneralQuestion(transcript);
  };

  const processGeneralQuestion = async (userText: string) => {
    if (!userText.trim()) return;

    const userMsg: ChatMessage = { id: Date.now(), sender: 'user', text: userText };
    setMessages((prev) => [...prev, userMsg]);
    setChatInput('');

    try {
      const hfResult = await queryHuggingFaceLLM({
        prompt: userText,
        language,
        farmerName: profile.name,
        acres,
        totalExpenses,
        estimatedProfit
      });

      const botMsg: ChatMessage = { id: Date.now() + 1, sender: 'agent', text: hfResult.text };
      setMessages((prev) => [...prev, botMsg]);

      if (autoSpeak) {
        handleSpeakMessage(botMsg.id, hfResult.text);
      }
    } catch (err) {
      console.warn('Hugging Face AI query error:', err);
    }
  };

  // Add bill from Camera Scanner
  const handleBillCaptured = (item: string, vendor: string, amount: number) => {
    const newTx = {
      id: Date.now(),
      title: item,
      vendor: vendor || 'Local Agri Store',
      category: 'Input Expense',
      amount: amount,
      type: 'expense',
      date: 'Just Now'
    };
    setTransactions([newTx, ...transactions]);
    setActiveView('overview');
  };

  // Simulate High Expenses
  const handleSimulateHighExpense = () => {
    const highRiskTx = {
      id: Date.now(),
      title: '🚨 Emergency Tractor Repair & Extra Pesticide',
      vendor: 'Highland Farm Service',
      category: 'Heavy Maintenance',
      amount: 72000,
      type: 'expense',
      date: 'Today'
    };
    setTransactions([highRiskTx, ...transactions]);
  };

  // Reset Expenses
  const handleResetExpenses = () => {
    setTransactions([
      { id: 1, title: '5 Bags NPK Fertilizer', vendor: 'Sri Lakshmi Seeds', category: 'Fertilizer', amount: 8450, type: 'expense', date: 'Today' },
      { id: 2, title: 'Farm Tractor Diesel (50L)', vendor: 'Bharat Petroleum', category: 'Fuel', amount: 4750, type: 'expense', date: 'Yesterday' },
      { id: 3, title: 'Paddy Grain Sale (45 Qtl)', vendor: 'Agricultural Mandi', category: 'Sales', amount: 98100, type: 'income', date: 'Sep 22' },
    ]);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (chatInput.trim()) {
      const command = parseVoiceCommand(chatInput);
      executeVoiceCommand(chatInput, command);
    }
  };

  const handleTriggerApkDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([
      "AgriNexa Pro Enterprise Mobile Installer\nVersion: 2.0.0-IN Pro\n100% Free for Farmers\nFeatures: Voice Command Engine, Real Camera OCR, Risk Alert System, Multilingual AI Speech."
    ], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = "AgriNexa_Pro_Free.apk";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="min-h-screen bg-stone-100 text-stone-900 flex flex-col font-sans">
      
      {/* Top App Bar with Enterprise Styling */}
      <header className="bg-farm-dark text-white sticky top-0 z-50 shadow-lg border-b border-farm-medium/30">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          
          {/* Farmer Profile Badge */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={profile.photoUrl}
                alt={profile.name}
                className="w-11 h-11 rounded-full object-cover border-2 border-farm-accent shadow-md"
              />
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-farm-dark" />
            </div>

            <div className="text-left">
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-black leading-tight text-white">{profile.name}</h1>
                <span className="bg-farm-light/20 text-farm-accent text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider">
                  AgriNexa Pro
                </span>
              </div>
              <p className="text-xs text-farm-pale/90 font-medium">
                {profile.village} • <strong className="text-farm-accent">{profile.farmType}</strong>
              </p>
            </div>
          </div>

          {/* Controls Bar */}
          <div className="flex items-center gap-2">
            
            {/* Auto-Speak Voice Output Toggle Button */}
            <button
              onClick={() => {
                const nextState = !autoSpeak;
                setAutoSpeak(nextState);
                if (!nextState) stopSpeaking();
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 border transition-all ${
                autoSpeak ? 'bg-emerald-600 border-emerald-400 text-white shadow' : 'bg-stone-800 border-stone-700 text-stone-400'
              }`}
              title={autoSpeak ? 'AI Speech Output is ON' : 'AI Speech Output is MUTED'}
            >
              {autoSpeak ? <Volume2 className="w-4 h-4 text-farm-accent animate-pulse" /> : <VolumeX className="w-4 h-4" />}
              <span className="hidden sm:inline">{autoSpeak ? 'Voice ON' : 'Muted'}</span>
            </button>

            {/* Language Switcher Button */}
            <div className="flex items-center bg-stone-800 p-1 rounded-xl text-xs font-extrabold border border-stone-700">
              <Globe className="w-3.5 h-3.5 text-farm-accent mr-1 ml-1" />
              {(['en', 'te', 'hi'] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLanguage(l)}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    language === l ? 'bg-farm-green text-white shadow-sm ring-1 ring-farm-accent' : 'text-stone-300 hover:text-white'
                  }`}
                >
                  {l === 'en' ? 'ENG' : l === 'te' ? 'తెలుగు' : 'हिन्दी'}
                </button>
              ))}
            </div>

            <button
              onClick={handleTriggerApkDownload}
              className="bg-farm-accent hover:bg-yellow-400 text-farm-dark font-black px-3.5 py-1.5 rounded-xl text-xs hidden md:flex items-center gap-1 shadow"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download APK</span>
            </button>

            <button
              onClick={onLogout}
              className="p-2 rounded-xl bg-stone-800 hover:bg-red-700 text-stone-300 hover:text-white transition-colors flex items-center gap-1 text-xs font-bold"
              title="Logout profile"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

        </div>
      </header>

      {/* Main App Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-6 space-y-6">
        
        {/* Navigation Tabs */}
        <div className="grid grid-cols-4 gap-2 bg-white p-2 rounded-2xl shadow-md border border-stone-200 text-xs sm:text-sm font-black">
          <button
            onClick={() => setActiveView('overview')}
            className={`py-3 rounded-xl transition-all flex flex-col sm:flex-row items-center justify-center gap-1.5 ${
              activeView === 'overview' ? 'bg-farm-green text-white shadow-md' : 'text-stone-700 hover:bg-stone-100'
            }`}
          >
            <IndianRupee className="w-4 h-4" />
            <span>Farm Ledger</span>
          </button>
          
          <button
            onClick={() => setActiveView('scanner')}
            className={`py-3 rounded-xl transition-all flex flex-col sm:flex-row items-center justify-center gap-1.5 ${
              activeView === 'scanner' ? 'bg-farm-green text-white shadow-md' : 'text-stone-700 hover:bg-stone-100'
            }`}
          >
            <Camera className="w-4 h-4" />
            <span>Bill Camera</span>
          </button>

          <button
            onClick={() => setActiveView('calculator')}
            className={`py-3 rounded-xl transition-all flex flex-col sm:flex-row items-center justify-center gap-1.5 ${
              activeView === 'calculator' ? 'bg-farm-green text-white shadow-md' : 'text-stone-700 hover:bg-stone-100'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Profit Calc</span>
          </button>

          <button
            onClick={() => setActiveView('chat')}
            className={`py-3 rounded-xl transition-all flex flex-col sm:flex-row items-center justify-center gap-1.5 ${
              activeView === 'chat' ? 'bg-farm-green text-white shadow-md' : 'text-stone-700 hover:bg-stone-100'
            }`}
          >
            <Mic className="w-4 h-4 text-farm-accent" />
            <span>Voice Assistant</span>
          </button>
        </div>

        {/* 🚨 FINANCIAL RISK ALERT SYSTEM BANNER WITH CORRECT ESCAPE ROUTES */}
        <RiskAlertBanner
          totalExpenses={totalExpenses}
          projectedRevenue={projectedRevenue}
          costPerAcre={costPerAcre}
          targetCostPerAcre={targetCostPerAcre}
          onSimulateHighExpense={handleSimulateHighExpense}
          onResetExpenses={handleResetExpenses}
          onApplyRouteFix={(savingsAmount) => {
            const savingsTx = {
              id: Date.now(),
              title: '🛡️ Correct Route Applied: Defer Non-Essential Outflow',
              vendor: 'AgriNexa Risk Escaper',
              category: 'Savings Credit',
              amount: savingsAmount,
              type: 'income',
              date: 'Just Now'
            };
            setTransactions([savingsTx, ...transactions]);
          }}
        />

        {/* VOICE COMMAND FEEDBACK TOAST */}
        {commandFeedback && (
          <div className="bg-emerald-800 text-white p-3.5 rounded-2xl shadow-md border-2 border-emerald-400 flex items-center justify-between text-xs sm:text-sm font-black animate-fade-in text-left">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-farm-accent shrink-0 animate-bounce" />
              <span>{commandFeedback}</span>
            </div>
            <button onClick={() => setCommandFeedback(null)} className="text-xs text-emerald-200 underline ml-2">Dismiss</button>
          </div>
        )}

        {/* 1. OVERVIEW / LEDGER VIEW */}
        {activeView === 'overview' && (
          <div className="space-y-6 animate-fade-in">
            
            {/* Top Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-emerald-800 to-emerald-900 text-white p-5 rounded-2xl shadow-md space-y-1 text-left border border-emerald-700">
                <span className="text-xs font-extrabold uppercase opacity-80">Total Income</span>
                <p className="text-3xl font-black">₹{totalIncome.toLocaleString('en-IN')}</p>
                <span className="text-[11px] bg-emerald-950/70 text-emerald-200 px-2.5 py-0.5 rounded-full font-bold inline-block">Harvest Grain Sales</span>
              </div>

              <div className="bg-gradient-to-br from-red-800 to-red-900 text-white p-5 rounded-2xl shadow-md space-y-1 text-left border border-red-700">
                <span className="text-xs font-extrabold uppercase opacity-80">Total Expenses</span>
                <p className="text-3xl font-black">₹{totalExpenses.toLocaleString('en-IN')}</p>
                <span className="text-[11px] bg-red-950/70 text-red-200 px-2.5 py-0.5 rounded-full font-bold inline-block">Seeds, Fertilizer & Fuel</span>
              </div>

              <div className="bg-farm-dark text-white p-5 rounded-2xl shadow-md space-y-1 text-left border border-farm-medium/30">
                <span className="text-xs font-extrabold uppercase text-farm-accent">Net Balance</span>
                <p className="text-3xl font-black text-farm-accent">₹{netBalance.toLocaleString('en-IN')}</p>
                <span className="text-[11px] text-farm-pale font-bold">100% Tracked in Rupees</span>
              </div>
            </div>

            {/* Professional Voice Command Bar */}
            <div className="bg-farm-pale border-2 border-farm-medium/30 p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 text-left shadow-sm">
              <div className="flex items-center gap-3">
                
                {/* Voice Mic Trigger Button */}
                <button
                  onClick={handleToggleVoiceRecording}
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black shadow-lg transition-all active:scale-95 ${
                    isListening
                      ? 'bg-red-600 text-white animate-pulse ring-4 ring-red-400'
                      : 'bg-farm-green hover:bg-farm-dark text-farm-accent'
                  }`}
                  title="Click to speak voice commands"
                >
                  <Mic className={`w-7 h-7 ${isListening ? 'animate-bounce text-white' : 'text-farm-accent'}`} />
                </button>

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-black text-stone-900 text-base sm:text-lg">
                      {isListening ? 'Listening to Voice Command...' : 'AgriNexa Voice Command Engine'}
                    </h3>
                    {isListening && (
                      <span className="bg-red-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase animate-ping">
                        LIVE MIC
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-stone-700 font-semibold">
                    Tap mic 🎙️ and say <strong>"Add 3500 diesel"</strong>, <strong>"What is net balance?"</strong>, or <strong>"Apply escape route"</strong>.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => setActiveView('chat')}
                  className="flex-1 sm:flex-none bg-farm-green hover:bg-farm-dark text-white font-extrabold px-4 py-3 rounded-xl text-xs flex items-center justify-center gap-1 shadow"
                >
                  <Mic className="w-4 h-4 text-farm-accent" />
                  <span>Voice Chat</span>
                </button>

                <button
                  onClick={() => setActiveView('scanner')}
                  className="flex-1 sm:flex-none bg-stone-900 hover:bg-black text-white font-extrabold px-4 py-3 rounded-xl text-xs flex items-center justify-center gap-1 shadow"
                >
                  <Camera className="w-4 h-4 text-farm-accent" />
                  <span>Scan Bill</span>
                </button>
              </div>
            </div>

            {/* Expanded Voice Command Shortcut Chips */}
            <div className="space-y-2 text-left">
              <span className="text-xs font-black uppercase text-stone-500 tracking-wider">Tap To Test Voice Commands:</span>
              <div className="flex flex-wrap gap-2 text-xs font-bold">
                
                <button
                  onClick={() => executeVoiceCommand("Add expense 3500 for diesel", { action: 'add_expense', transcript: "Add expense 3500 for diesel", amount: 3500, category: 'Fuel', itemTitle: '🎙️ Voice: Diesel Expense' })}
                  className="bg-white border border-stone-300 hover:border-farm-green text-stone-800 px-3 py-2 rounded-xl shadow-sm flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5 text-farm-green" />
                  <span>"Add ₹3,500 Diesel"</span>
                </button>

                <button
                  onClick={() => executeVoiceCommand("Add income 50000 paddy sale", { action: 'add_income', transcript: "Add income 50000 paddy sale", amount: 50000, category: 'Sales', itemTitle: '🎙️ Voice Income: Paddy Sale' })}
                  className="bg-white border border-stone-300 hover:border-farm-green text-stone-800 px-3 py-2 rounded-xl shadow-sm flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5 text-emerald-600" />
                  <span>"Add ₹50,000 Income"</span>
                </button>

                <button
                  onClick={() => executeVoiceCommand("What is my net balance?", { action: 'query_net_balance', transcript: "What is my net balance?" })}
                  className="bg-white border border-stone-300 hover:border-farm-green text-stone-800 px-3 py-2 rounded-xl shadow-sm flex items-center gap-1.5"
                >
                  <IndianRupee className="w-3.5 h-3.5 text-farm-green" />
                  <span>"What is net balance?"</span>
                </button>

                <button
                  onClick={() => executeVoiceCommand("What is my cost per acre?", { action: 'query_cost', transcript: "What is my cost per acre?" })}
                  className="bg-white border border-stone-300 hover:border-farm-green text-stone-800 px-3 py-2 rounded-xl shadow-sm flex items-center gap-1.5"
                >
                  <TrendingUp className="w-3.5 h-3.5 text-farm-green" />
                  <span>"What is cost per acre?"</span>
                </button>

                <button
                  onClick={() => executeVoiceCommand("Apply escape route", { action: 'apply_escape_route', transcript: "Apply escape route" })}
                  className="bg-emerald-100 border border-emerald-300 hover:bg-emerald-200 text-emerald-900 px-3 py-2 rounded-xl shadow-sm flex items-center gap-1.5"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                  <span>"Apply Escape Route"</span>
                </button>

              </div>
            </div>

            {/* Transaction List */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200 space-y-4 text-left">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <h3 className="text-lg font-extrabold text-stone-900">Farm Ledger Records ({profile.name})</h3>
                <span className="text-xs font-bold bg-stone-100 text-stone-600 px-3 py-1 rounded-full">
                  {transactions.length} Records
                </span>
              </div>

              <div className="space-y-3">
                {transactions.map((tx) => (
                  <div
                    key={tx.id}
                    className="p-4 rounded-xl border border-stone-200 flex items-center justify-between hover:bg-stone-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg ${
                        tx.type === 'income' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {tx.type === 'income' ? '🌾' : '🧾'}
                      </div>
                      <div>
                        <h4 className="font-extrabold text-stone-900 text-base">{tx.title}</h4>
                        <p className="text-xs text-stone-500 font-medium">{tx.vendor} • {tx.date}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className={`text-lg font-black ${
                        tx.type === 'income' ? 'text-emerald-700' : 'text-stone-900'
                      }`}>
                        {tx.type === 'income' ? '+' : '-'}₹{tx.amount.toLocaleString('en-IN')}
                      </span>
                      <button
                        onClick={() => setTransactions(transactions.filter(t => t.id !== tx.id))}
                        className="text-stone-400 hover:text-red-600 p-1"
                        title="Delete entry"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* 2. REAL CAMERA SCANNER VIEW */}
        {activeView === 'scanner' && (
          <CameraScanner
            onBillCaptured={handleBillCaptured}
            onCancel={() => setActiveView('overview')}
          />
        )}

        {/* 3. PROFIT & BREAK-EVEN CALCULATOR VIEW */}
        {activeView === 'calculator' && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200 space-y-6 animate-fade-in text-left">
            <div className="border-b border-stone-200 pb-4">
              <h2 className="text-2xl font-black text-stone-900">Crop Break-Even & Profit Calculator</h2>
              <p className="text-xs font-semibold text-stone-600">Calculate exact break-even price in ₹ per quintal before selling in mandi.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              
              {/* Sliders Input */}
              <div className="space-y-5 bg-stone-50 p-5 rounded-2xl border border-stone-200">
                
                <div>
                  <div className="flex justify-between text-sm font-extrabold text-stone-900 mb-1">
                    <span>Farm Size (Acres):</span>
                    <span className="text-farm-green text-base">{acres} Acres</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={50}
                    value={acres}
                    onChange={(e) => setAcres(parseInt(e.target.value))}
                    className="w-full accent-farm-green cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-sm font-extrabold text-stone-900 mb-1">
                    <span>Expected Yield (Quintals):</span>
                    <span className="text-farm-green text-base">{expectedYieldQtl} Qtl</span>
                  </div>
                  <input
                    type="range"
                    min={10}
                    max={500}
                    step={5}
                    value={expectedYieldQtl}
                    onChange={(e) => setExpectedYieldQtl(parseInt(e.target.value))}
                    className="w-full accent-farm-green cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-sm font-extrabold text-stone-900 mb-1">
                    <span>Expected Mandi Rate (₹/Qtl):</span>
                    <span className="text-farm-green text-base">₹{mandiRateQtl}/qtl</span>
                  </div>
                  <input
                    type="range"
                    min={1000}
                    max={5000}
                    step={50}
                    value={mandiRateQtl}
                    onChange={(e) => setMandiRateQtl(parseInt(e.target.value))}
                    className="w-full accent-farm-green cursor-pointer"
                  />
                </div>

              </div>

              {/* Real-time Math Output Card */}
              <div className="bg-farm-pale border-2 border-farm-green/40 p-6 rounded-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-farm-medium/20 pb-3">
                  <span className="text-xs font-black uppercase text-farm-dark">Calculated Economics ({profile.name})</span>
                  <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-1 rounded-full">LIVE</span>
                </div>

                <div className="space-y-3">
                  <div className="bg-white p-4 rounded-xl shadow-sm">
                    <p className="text-xs font-bold text-stone-500 uppercase">Cost Per Acre</p>
                    <p className="text-2xl font-black text-stone-900">
                      ₹{costPerAcre.toLocaleString('en-IN')} <span className="text-xs text-stone-500 font-medium">/ acre</span>
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-xl shadow-sm">
                    <p className="text-xs font-bold text-stone-500 uppercase">Target Break-Even Rate</p>
                    <p className="text-2xl font-black text-amber-700">
                      ₹{breakEvenPrice.toLocaleString('en-IN')} <span className="text-xs text-stone-500 font-medium">/ quintal</span>
                    </p>
                    <p className="text-xs text-stone-600 font-semibold mt-1">Selling above ₹{breakEvenPrice} guarantees net profit!</p>
                  </div>

                  <div className="bg-emerald-800 text-white p-4 rounded-xl shadow-sm">
                    <p className="text-xs font-bold text-emerald-200 uppercase">Estimated Total Harvest Profit</p>
                    <p className="text-3xl font-black text-farm-accent">
                      +₹{estimatedProfit.toLocaleString('en-IN')}
                    </p>
                    <p className="text-xs text-emerald-100 font-medium mt-1">Based on ₹{mandiRateQtl}/qtl mandi rate</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* 4. AI VOICE ADVISOR CHAT VIEW */}
        {activeView === 'chat' && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200 space-y-4 animate-fade-in max-w-2xl mx-auto text-left">
            <div className="border-b border-stone-200 pb-3 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-black text-stone-900 flex items-center gap-2">
                  <span>AgriNexa Voice AI Assistant</span>
                  <Volume2 className="w-5 h-5 text-farm-green animate-pulse" />
                </h2>
                <div className="mt-1 flex items-center gap-2">
                  <span className="bg-amber-100 text-amber-900 border border-amber-300 text-[11px] font-extrabold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    🤗 Hugging Face Llama-3.2 Open-Source LLM
                  </span>
                </div>
                <p className="text-xs font-semibold text-stone-500 mt-1">
                  Tap mic 🎙️ to speak commands in {language === 'te' ? 'తెలుగు' : language === 'hi' ? 'హిन्दी' : 'English'}. AI talks back out loud!
                </p>
              </div>
              
              <button
                onClick={() => setAutoSpeak(!autoSpeak)}
                className={`text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 ${
                  autoSpeak ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-100 text-stone-600'
                }`}
              >
                {autoSpeak ? <Volume2 className="w-3.5 h-3.5 text-emerald-600" /> : <VolumeX className="w-3.5 h-3.5" />}
                <span>{autoSpeak ? 'Voice ON' : 'Muted'}</span>
              </button>
            </div>

            {/* Recording Active Wave Banner */}
            {isListening && (
              <div className="bg-red-50 border-2 border-red-500 p-4 rounded-2xl flex items-center justify-between animate-pulse">
                <div className="flex items-center gap-3 text-red-700 font-extrabold text-sm">
                  <Activity className="w-6 h-6 text-red-600 animate-spin" />
                  <span>Listening to voice... Speak now in {language === 'te' ? 'తెలుగు' : language === 'hi' ? 'హిन्दी' : 'English'}!</span>
                </div>
                <button onClick={handleToggleVoiceRecording} className="text-xs bg-red-600 text-white font-black px-3 py-1 rounded-full">
                  STOP MIC
                </button>
              </div>
            )}

            {voiceError && (
              <div className="bg-amber-50 border border-amber-300 text-amber-900 p-3 rounded-xl text-xs font-bold flex items-center justify-between">
                <span>{voiceError}</span>
                <button onClick={() => setVoiceError(null)} className="text-amber-700 underline">Dismiss</button>
              </div>
            )}

            {/* Chat Messages List */}
            <div className="bg-stone-50 rounded-2xl p-4 min-h-[250px] max-h-[350px] overflow-y-auto space-y-3 border border-stone-200 text-sm">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`p-3.5 rounded-2xl max-w-[85%] relative group ${
                    m.sender === 'user'
                      ? 'bg-farm-green text-white ml-auto font-medium text-right'
                      : 'bg-white text-stone-900 border border-stone-200 mr-auto font-normal shadow-sm'
                  }`}
                >
                  <p>{m.text}</p>
                  
                  {/* Replay Voice Button */}
                  {m.sender === 'agent' && (
                    <button
                      onClick={() => handleSpeakMessage(m.id, m.text)}
                      className={`mt-2 text-[11px] font-bold inline-flex items-center gap-1 px-2.5 py-1 rounded-lg transition-colors ${
                        currentlySpeakingId === m.id
                          ? 'bg-emerald-600 text-white animate-pulse'
                          : 'bg-farm-pale text-farm-dark hover:bg-farm-green hover:text-white border border-farm-medium/30'
                      }`}
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>{currentlySpeakingId === m.id ? 'Speaking...' : 'Listen Voice Advice 🔊'}</span>
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Chat & Voice Input Controls */}
            <form onSubmit={handleFormSubmit} className="flex gap-2">
              
              {/* Microphone Recording Button */}
              <button
                type="button"
                onClick={handleToggleVoiceRecording}
                className={`p-3.5 rounded-xl shadow transition-all flex items-center justify-center shrink-0 ${
                  isListening
                    ? 'bg-red-600 text-white animate-bounce ring-4 ring-red-300'
                    : 'bg-farm-accent hover:bg-yellow-400 text-farm-dark font-extrabold'
                }`}
                title="Tap to speak voice command in Telugu/Hindi/English"
              >
                <Mic className={`w-6 h-6 ${isListening ? 'text-white' : 'text-farm-dark'}`} />
              </button>

              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder={
                  language === 'te'
                    ? "మాట్లాడండి లేదా టైప్ చేయండి (ఉదా: డీజిల్‌కు 3500 ఖర్చు రాసుకో)..."
                    : language === 'hi'
                    ? "बोलें या टाइप करें (जैसे: डीजल के लिए 3500 खर्च जोड़ो)..."
                    : "Speak or type voice command..."
                }
                className="flex-1 bg-stone-50 border border-stone-300 rounded-xl px-4 py-3 text-stone-900 font-semibold focus:outline-none focus:border-farm-green text-sm"
              />

              <button
                type="submit"
                className="bg-farm-green hover:bg-farm-dark text-white font-bold px-5 py-3 rounded-xl shadow transition-colors flex items-center justify-center gap-1"
              >
                <Send className="w-4 h-4 text-farm-accent" />
              </button>
            </form>

            <p className="text-[11px] text-stone-500 font-semibold text-center">
              💡 <strong>AgriNexa Voice Commands:</strong> Try saying <strong>"Add 3500 diesel"</strong>, <strong>"Add 50000 income"</strong>, <strong>"What is net balance?"</strong>, or <strong>"Apply escape route"</strong>.
            </p>
          </div>
        )}

      </main>

      {/* Floating Quick Camera Action Button */}
      {activeView !== 'scanner' && (
        <button
          onClick={() => setActiveView('scanner')}
          className="fixed bottom-6 right-6 z-50 bg-farm-green hover:bg-farm-dark text-farm-accent border-2 border-farm-accent p-4 rounded-full shadow-2xl transition-all hover:scale-110 active:scale-95 flex items-center gap-2 font-black text-sm"
          title="Open Bill Camera Scanner"
        >
          <Camera className="w-6 h-6 text-farm-accent" />
          <span className="hidden sm:inline text-white">Snap Bill 📷</span>
        </button>
      )}

    </div>
  );
};
