export type Language = 'en' | 'te' | 'hi';

export interface TranslationSchema {
  nav: {
    brandName: string;
    whatItDoes: string;
    howItWorks: string;
    features: string;
    farmerStories: string;
    helpline: string;
    getStartedFree: string;
    freeBadge: string;
  };
  hero: {
    badge: string;
    headline: string;
    headlineHighlight: string;
    subtext: string;
    primaryCta: string;
    secondaryCta: string;
    freeForever: string;
    worksOffline: string;
    privateSecure: string;
    noDegree: string;
    receiptHeader: string;
    receiptSub: string;
    scannedTitle: string;
    autoTagged: string;
    itemTitle: string;
    itemCategory: string;
    costPerAcreLabel: string;
    costPerAcreValue: string;
    costStatus: string;
    estProfitLabel: string;
    estProfitValue: string;
    breakEvenText: string;
    smartAlertTitle: string;
    smartAlertText: string;
  };
  valueCards: {
    badge: string;
    title: string;
    subtitle: string;
    card1Title: string;
    card1Sub: string;
    card1Desc: string;
    card2Title: string;
    card2Sub: string;
    card2Desc: string;
    card3Title: string;
    card3Sub: string;
    card3Desc: string;
    card4Title: string;
    card4Sub: string;
    card4Desc: string;
    keyFeature: string;
    learnMore: string;
  };
  howItWorks: {
    badge: string;
    title: string;
    subtitle: string;
    step1Title: string;
    step1Desc: string;
    step1Detail: string;
    step1Header: string;
    step1Detected: string;
    step1Item: string;
    step1Category: string;
    step2Title: string;
    step2Desc: string;
    step2Detail: string;
    step2Header: string;
    step2Item1: string;
    step2Item2: string;
    step2TotalCost: string;
    step3Title: string;
    step3Desc: string;
    step3Detail: string;
    step3Header: string;
    step3StatusTitle: string;
    step3StatusSub: string;
    step3AlertTitle: string;
    step3AlertSub: string;
    benefitLabel: string;
  };
  features: {
    badge: string;
    title: string;
    subtitle: string;
    tryFree: string;
    showcase: string;
    f1Name: string;
    f1Tagline: string;
    f1Desc: string;
    f1B1: string;
    f1B2: string;
    f1B3: string;
    f1Title: string;
    f1Item1Name: string;
    f1Item1Sub: string;
    f1Item2Name: string;
    f1Item2Sub: string;
    f2Name: string;
    f2Tagline: string;
    f2Desc: string;
    f2B1: string;
    f2B2: string;
    f2B3: string;
    f2Target: string;
    f2Breakeven: string;
    f2Status: string;
    f2CostLabel: string;
    f2ProfitLabel: string;
    f3Name: string;
    f3Tagline: string;
    f3Desc: string;
    f3B1: string;
    f3B2: string;
    f3B3: string;
    f3Apr: string;
    f3Jul: string;
    f3Oct: string;
    f3Dec: string;
    f4Name: string;
    f4Tagline: string;
    f4Desc: string;
    f4B1: string;
    f4B2: string;
    f4B3: string;
    f4AlertHeader: string;
    f4AlertSub: string;
    f4Tip: string;
    f5Name: string;
    f5Tagline: string;
    f5Desc: string;
    f5B1: string;
    f5B2: string;
    f5B3: string;
    f5Header: string;
    f5Q1: string;
    f5A1: string;
    f5Placeholder: string;
  };
  trust: {
    freeTitle: string;
    freeDesc: string;
    offlineTitle: string;
    offlineDesc: string;
    privacyTitle: string;
    privacyDesc: string;
  };
  testimonials: {
    badge: string;
    title: string;
    subtitle: string;
    t1Quote: string;
    t1Name: string;
    t1Farm: string;
    t2Quote: string;
    t2Name: string;
    t2Farm: string;
    t3Quote: string;
    t3Name: string;
    t3Farm: string;
  };
  modal: {
    title: string;
    subtitle: string;
    q1Label: string;
    c1: string;
    c1Desc: string;
    c2: string;
    c2Desc: string;
    c3: string;
    c3Desc: string;
    q2Label: string;
    placeholder: string;
    privacyNote: string;
    submitBtn: string;
    callNote: string;
    successTitle: string;
    successSub: string;
    nextStepsTitle: string;
    step1: string;
    step2: string;
    step3: string;
    doneBtn: string;
  };
  footer: {
    badge: string;
    bannerTitle: string;
    bannerTitleHighlight: string;
    bannerSub: string;
    ctaBtn: string;
    helplineBtn: string;
    tagline: string;
    careNote: string;
    navTitle: string;
    supportTitle: string;
    timing: string;
    helplineDesc: string;
    copyright: string;
    privacy: string;
    terms: string;
    security: string;
  };
}

export const translations: Record<Language, TranslationSchema> = {
  en: {
    nav: {
      brandName: 'AgriNexa',
      whatItDoes: 'What It Does',
      howItWorks: 'How It Works',
      features: 'App Features',
      farmerStories: 'Farmer Stories',
      helpline: 'Toll-Free Helpline: 1800-123-FARM',
      getStartedFree: 'Get 100% Free App',
      freeBadge: '100% FREE FOREVER',
    },
    hero: {
      badge: 'Built Specially for Indian Crop & Dairy Farmers',
      headline: "Know Your Farm's Money,",
      headlineHighlight: 'Anytime, Anywhere',
      subtext: 'AgriNexa is a 100% free app that tracks your farm expenses in Rupees, calculates real cost per acre, and protects your seasonal cash flow.',
      primaryCta: 'Get 100% Free App',
      secondaryCta: 'See How It Works',
      freeForever: '100% Free • No Hidden Charges',
      worksOffline: 'Works offline in fields',
      privateSecure: '100% Private & Secure',
      noDegree: 'No accounting degree needed',
      receiptHeader: 'Sri Lakshmi Agri Farm',
      receiptSub: 'Kharif Season 2026 • Paddy & Cotton',
      scannedTitle: 'Latest Bill Scanned',
      autoTagged: 'Auto-Tagged: Fertilizer Input',
      itemTitle: '5 Bags NPK Fertilizer',
      itemCategory: 'Agri Shop Invoice',
      costPerAcreLabel: 'Cost per Acre',
      costPerAcreValue: '₹14,800',
      costStatus: 'Within budget target',
      estProfitLabel: 'Est. Harvest Profit',
      estProfitValue: '+₹1,45,000',
      breakEvenText: 'Break-even: ₹1,850/quintal',
      smartAlertTitle: 'Smart Alert:',
      smartAlertText: 'Cash flow is clear for Cotton picking labor next month.',
    },
    valueCards: {
      badge: 'What This Does For You',
      title: 'Four Simple Ways AgriNexa Helps Your Farm',
      subtitle: 'Designed to take the headache out of farm math so you can focus on your crops and livestock.',
      card1Title: 'Track Every Expense & Sale',
      card1Sub: 'Just snap a photo of your shop receipt',
      card1Desc: 'No more lost paper bills or diary notes. Snap a photo of seed, fertilizer, or diesel bills and the app saves vendor and amount in Rupees automatically.',
      card2Title: 'Know Real Cost Per Acre / Animal',
      card2Sub: 'Clear numbers in Rupees for every plot',
      card2Desc: 'See exactly what seed, fertilizer, tractor fuel, and labor cost per acre or per cattle head. Make smart choices on where to spend next season.',
      card3Title: 'See Profit Before You Sell',
      card3Sub: 'Know your break-even price in ₹ / quintal',
      card3Desc: 'Calculate your exact break-even target price in Rupees per quintal so you know if mandi prices will give you a good profit before selling.',
      card4Title: 'Get Early Cash Shortage Warnings',
      card4Sub: 'Avoid unexpected money crunches',
      card4Desc: 'Maps out when land lease or fertilizer bills are due and warns you weeks ahead if cash will be tight before harvest checks arrive.',
      keyFeature: 'Key Feature',
      learnMore: 'Learn more →',
    },
    howItWorks: {
      badge: 'Simple 1-2-3 Process',
      title: 'How AgriNexa Works in 3 Easy Steps',
      subtitle: 'No complicated computer typing. Designed for busy hands between farm chores.',
      step1Title: '1. Snap a bill photo or voice it in',
      step1Desc: 'Point your phone camera at any paper bill or speak in your own language from the tractor cab.',
      step1Detail: 'Our camera reads shop name, rupee total, and date automatically.',
      step1Header: 'Step 1: Receipt Capture',
      step1Detected: 'BILL DETECTED',
      step1Item: 'Sri Rama Traders & Seeds',
      step1Category: '₹8,450.00 • 5 Bags NPK Fertilizer',
      step2Title: '2. The app does the math in Rupees',
      step2Desc: 'No calculator needed. The app automatically updates your total cost per acre and farm balance.',
      step2Detail: 'Combines seed, diesel, fertilizer, and labor costs into clear per-acre figures.',
      step2Header: 'Step 2: Automated Rupee Math',
      step2Item1: 'Seed & Fertilizer Total',
      step2Item2: 'Tractor Fuel & Labor',
      step2TotalCost: 'Total Cost Per Acre: ₹14,850 / acre',
      step3Title: '3. Get simple, clear answers',
      step3Desc: 'Get straight-to-the-point guidance: "You are on track" or "Watch out for cash next month."',
      step3Detail: 'Plain language advice in English, Telugu, or Hindi — zero bank jargon.',
      step3Header: 'Step 3: Plain-Language Guidance',
      step3StatusTitle: 'You are on track for harvest!',
      step3StatusSub: 'Estimated Profit: +₹1,45,000 at ₹2,180/quintal mandi rate',
      step3AlertTitle: 'Heads Up for October 15',
      step3AlertSub: 'Tractor EMI of ₹12,000 due. Harvest cotton check arriving Oct 22.',
      benefitLabel: 'Farmer Benefit:',
    },
    features: {
      badge: '100% Free Features',
      title: 'Built Simple for Indian Farmers',
      subtitle: 'Everything you need to manage your farm money without taking hours away from field work.',
      tryFree: 'Try This Feature Free',
      showcase: 'FEATURE SHOWCASE',
      f1Name: 'Expense & Sales Tracker',
      f1Tagline: 'Snap receipts in 3 seconds in Rupees.',
      f1Desc: 'Categorizes every Rupee spent on seeds, fertilizers, tractor diesel, or cattle feed automatically.',
      f1B1: 'Scan shop bills with mobile phone camera',
      f1B2: 'Auto-tags by field plot, crop, or dairy cattle',
      f1B3: 'Works 100% offline in remote fields',
      f1Title: 'Recent Farm Transactions',
      f1Item1Name: 'Farm Diesel (50 Liters)',
      f1Item1Sub: 'Field #2 Tractor • Yesterday',
      f1Item2Name: 'Mandi Paddy Grain Sale',
      f1Item2Sub: '45 Quintals Paddy • Sep 22',
      f2Name: 'Break-Even Calculator',
      f2Tagline: 'Will I make a profit this season?',
      f2Desc: 'Know your exact break-even target price in ₹ / quintal before selling your produce in mandi.',
      f2B1: 'Calculates minimum selling price needed per quintal',
      f2B2: 'Adjusts dynamically for rain & yield changes',
      f2B3: 'Instant cost-per-acre breakdown',
      f2Target: '2026 Paddy Crop Target',
      f2Breakeven: 'Break-Even Price: ₹1,850 / quintal',
      f2Status: 'PROFITABLE',
      f2CostLabel: 'Your Cost: ₹1,850/qtl',
      f2ProfitLabel: 'Mandi Rate: ₹2,180/qtl (+₹330 profit!)',
      f3Name: 'Cash Flow Calendar',
      f3Tagline: 'When money comes in and goes out',
      f3Desc: 'Aligns heavy sowing expense months with harvest sale checks so you never get caught off guard.',
      f3B1: '12-Month visual cash forecast',
      f3B2: 'Maps tractor EMI & land lease due dates',
      f3B3: 'Prevents unexpected seasonal cash shortages',
      f3Apr: 'APR (Sowing) -₹45,000',
      f3Jul: 'JUL (Pesticide) -₹15,000',
      f3Oct: 'OCT (Harvest) +₹1,85,000',
      f3Dec: 'DEC (Sales) +₹65,000',
      f4Name: 'Smart Alerts',
      f4Tagline: "We'll warn you before you run short on cash",
      f4Desc: 'Receive proactive alerts weeks in advance if big bills overlap before crop checks clear.',
      f4B1: 'Early liquidity warnings (30-60 days out)',
      f4B2: 'Fertilizer & diesel price change alerts',
      f4B3: 'Simple phone notifications in your language',
      f4AlertHeader: 'Alert: Land Lease Due Nov 1st',
      f4AlertSub: 'Payment: ₹25,000. Expected cotton check: Nov 8th (₹45,000).',
      f4Tip: 'Recommendation: Use ₹10,000 dairy savings buffer for 7 days until cotton check clears.',
      f5Name: 'Farm Assistant Voice Chat',
      f5Tagline: 'Ask questions like texting a knowledgeable neighbor',
      f5Desc: 'Have a conversation with your AI farm advisor in English, Telugu, or Hindi.',
      f5B1: 'Ask questions by typing or voice commands',
      f5B2: 'Get instant answers on fertilizer & seed costs',
      f5B3: 'Understands Indian crop cycles & dairy economics',
      f5Header: '💬 AgriNexa Voice AI Advisor',
      f5Q1: 'Will I have enough cash for diesel next month?',
      f5A1: 'Yes, Ramesh! After your cotton check on Oct 10th (₹35,000), you will have ₹18,000 remaining after buying 100L diesel.',
      f5Placeholder: "Ask or speak voice command (e.g. 'What is my cost per acre?')...",
    },
    trust: {
      freeTitle: '100% Free Forever',
      freeDesc: 'No hidden subscription fees, no credit cards required. Always 100% free for farmers.',
      offlineTitle: 'Works 100% Offline',
      offlineDesc: 'Record bills and check numbers anywhere — even out in fields without cell network.',
      privacyTitle: 'Private & Secure',
      privacyDesc: 'Your farm data is private to you. We never sell or share your financial records.',
    },
    testimonials: {
      badge: 'Farmer Tested & Trusted across India',
      title: 'Hear From Fellow Farmers',
      subtitle: 'Producers across India are managing their farm finances easily with AgriNexa.',
      t1Quote: 'I used to keep shop bills in a plastic bag. Now I snap a photo in 5 seconds right from the tractor. I know my cost per acre down to the rupee!',
      t1Name: 'Ramesh Reddy',
      t1Farm: 'Paddy & Cotton Farmer • 12 Acres',
      t2Quote: 'फसल काटने से पहले ही मुझे कुंतल का सही रेट और अपना लागत मूल्य पता चल जाता है। बहुत ही आसान ऐप है।',
      t2Name: 'Baldev Singh',
      t2Farm: 'Wheat & Sugarcane Grower • Punjab',
      t3Quote: 'పాడి పశువుల దాణా మరియు ఎరువుల ఖర్చులు పెరిగినప్పుడు ఈ యాప్ ముందే హెచ్చరిస్తుంది. రూపాయి కూడా కట్టక్కర్లేదు.',
      t3Name: 'Vijay Patil & Family',
      t3Farm: 'Dairy & Spices Farmer • Maharashtra',
    },
    modal: {
      title: 'Get AgriNexa Free App in 30 Sec',
      subtitle: '100% Free Forever for Indian Farmers. No credit card required.',
      q1Label: '1. What do you farm?',
      c1: '🌾 Crops',
      c1Desc: 'Paddy/Cotton/Wheat',
      c2: '🐄 Dairy',
      c2Desc: 'Cattle/Buffalo/Poultry',
      c3: '🚜 Both',
      c3Desc: 'Mixed Farming',
      q2Label: '2. Enter your 10-digit Mobile Number',
      placeholder: 'Enter 10-digit mobile number (e.g. 9876543210)',
      privacyNote: 'Your mobile number is 100% secure. Zero spam.',
      submitBtn: 'Get Free App Download Link',
      callNote: 'Prefer to talk? Call Toll-Free Helpline: 1800-123-FARM',
      successTitle: 'You are All Set!',
      successSub: 'We sent an SMS link to your mobile number with download instructions.',
      nextStepsTitle: 'What happens next?',
      step1: 'Open the SMS link on your smartphone',
      step2: 'Tap the link to activate your free account',
      step3: 'Snap your first bill photo in under 10 seconds!',
      doneBtn: 'Done — Return to Website',
    },
    footer: {
      badge: '100% FREE FOR FARMERS',
      bannerTitle: 'Start Managing Your Farm Money',
      bannerTitleHighlight: 'the Easy & Free Way',
      bannerSub: 'Join thousands of Indian crop and dairy producers who turned paper bill chaos into simple financial peace of mind.',
      ctaBtn: 'Get 100% Free App',
      helplineBtn: 'Call Helpline: 1800-123-FARM',
      tagline: 'AgriNexa is built to empower Indian farmers with simple, reliable financial software right in their own language.',
      careNote: 'Made with care for Indian Agriculture 🇮🇳',
      navTitle: 'Quick Links',
      supportTitle: 'Farmer Support',
      timing: 'Mon-Sat 7:00 AM - 8:00 PM IST',
      helplineDesc: 'Dedicated toll-free helpline for rural & field support',
      copyright: '© 2026 AgriNexa India. 100% Free Software for Farmers.',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
      security: 'Farmer Guarantee',
    }
  },

  te: {
    nav: {
      brandName: 'అగ్రిలెక్సా (AgriNexa)',
      whatItDoes: 'ఏమి చేస్తుంది',
      howItWorks: 'ఎలా పనిచేస్తుంది',
      features: 'యాప్ ఫీచర్లు',
      farmerStories: 'రైతుల అనుభవాలు',
      helpline: 'టోల్ ఫ్రీ హెల్ప్‌లైన్: 1800-123-FARM',
      getStartedFree: '100% ఉచిత యాప్ పొందండి',
      freeBadge: '100% ఎల్లప్పుడూ ఉచితం',
    },
    hero: {
      badge: 'భారతీయ పంట మరియు పాడి రైతుల కోసం ప్రత్యేకం',
      headline: "మీ పొలం ఖర్చులు, ఆదాయం —",
      headlineHighlight: 'ఎప్పుడైనా, ఎక్కడైనా తెలుసుకోండి',
      subtext: 'అగ్రిలెక్సా (AgriNexa) అనేది 100% ఉచిత యాప్. మీ వ్యవసాయ ఖర్చులను రూపాయిల్లో నమోదు చేసి, ఎకరాకి అయ్యే అసలు ఖర్చును సులభంగా తెలుసుకోండి.',
      primaryCta: '100% ఉచిత యాప్ పొందండి',
      secondaryCta: 'ఎలా పనిచేస్తుందో చూడండి',
      freeForever: '100% ఉచితం • ఏ ఛార్జీలు లేవు',
      worksOffline: 'సిగ్నల్ లేకున్నా పనిచేస్తుంది',
      privateSecure: '100% భద్రం & రహస్యం',
      noDegree: 'ఎలాంటి లెక్కల చదువు అక్కర్లేదు',
      receiptHeader: 'శ్రీ లక్ష్మి అగ్రి ఫార్మ్',
      receiptSub: 'ఖరీఫ్ సీజన్ 2026 • వరి & పత్తి',
      scannedTitle: 'తాజాగా స్కాన్ చేసిన రశీదు',
      autoTagged: 'ఆటో-ట్యాగ్: ఎరువుల ఖర్చు',
      itemTitle: '5 బస్తాల NPK ఎరువులు',
      itemCategory: 'ఎరువుల దుకాణం బిల్లు',
      costPerAcreLabel: 'ఎకరాకి అయ్యే ఖర్చు',
      costPerAcreValue: '₹14,800',
      costStatus: 'బడ్జెట్ పరిమితిలోనే ఉంది',
      estProfitLabel: 'అంచనా లాభం',
      estProfitValue: '+₹1,45,000',
      breakEvenText: 'క్వింటాల్‌కి కనీస ధర: ₹1,850',
      smartAlertTitle: 'ముఖ్య గమనిక:',
      smartAlertText: 'వచ్చే నెల పత్తి కోత కూలీల చెల్లింపులకు డబ్బులు సిద్ధంగా ఉన్నాయి.',
    },
    valueCards: {
      badge: 'మీకు లభించే ప్రయోజనాలు',
      title: 'అగ్రిలెక్సా (AgriNexa) మీ వ్యవసాయానికి సహాయపడే 4 మార్గాలు',
      subtitle: 'లేక్కల గోల లేకుండా మీ పంటలు మరియు పశువులపై పూర్తి దృష్టి పెట్టేందుకు రూపొందించబడింది.',
      card1Title: 'ప్రతి ఖర్చు & అమ్మకం నమోదు చేయండి',
      card1Sub: 'షాపు రశీదును ఫోటో తీస్తే చాలు',
      card1Desc: 'కాగితపు బిల్లులు పోగొట్టుకునే బాధ లేదు. విత్తనాలు, ఎరువులు లేదా డీజిల్ బిల్లు ఫోటో తీస్తే చాలు — రూపాయల్లో వివరాలు ఆటోమేటిక్‌గా సేవ్ అవుతాయి.',
      card2Title: 'ఎకరాకి/పశువుకి నిజమైన ఖర్చు తెలుసుకోండి',
      card2Sub: 'ప్రతి చేనుకి ఖచ్చితమైన రూపాయల వివరాలు',
      card2Desc: 'విత్తనం, ఎరువులు, ట్రాక్టర్ డీజిల్, కూలీలకు ఎకరాకి ఎంత అవుతుందో స్పష్టంగా చూడండి. వచ్చే సీజన్‌కి సరైన నిర్ణయాలు తీసుకోండి.',
      card3Title: 'పంట అమ్మక ముందే లాభం చూడండి',
      card3Sub: 'క్వింటాల్‌కి కనీస ధర (బ్రేక్-ఈవెన్) చూడండి',
      card3Desc: 'మార్కెట్ లేదా మండికి వెళ్లే ముందే క్వింటాల్‌కి ఎంత ధర వస్తే లాభం వస్తుందో ఖచ్చితంగా లెక్కించండి.',
      card4Title: 'డబ్బుల కొరత ముందే తెలుసుకోండి',
      card4Sub: 'అనుకోని ఆర్థిక ఇబ్బందుల నుండి తప్పుకోండి',
      card4Desc: 'కౌలు లేదా ఎరువుల బిల్లుల సమయానికి డబ్బులు అందుబాటులో ఉంటాయో లేదో వారాల ముందే హెచ్చరిస్తుంది.',
      keyFeature: 'ముఖ్య ఫీచర్',
      learnMore: 'మరిన్ని వివరాలు →',
    },
    howItWorks: {
      badge: 'సులువైన 1-2-3 విధానం',
      title: '3 సులువైన పద్ధతుల్లో అగ్రిలెక్సా (AgriNexa) ఎలా పనిచేస్తుంది',
      subtitle: 'కష్టమైన కంప్యూటర్ లెక్కలు లేవు. పొలం పనుల్లో ఉండే రైతుల కోసం ప్రత్యేకంగా చేసారు.',
      step1Title: '1. బిల్లు ఫోటో తీయండి లేదా మాట్లాడండి',
      step1Desc: 'మీ ఫోన్ కెమెరాతో రశీదు ఫోటో తీయండి లేదా ట్రాక్టర్ సీట్లో కూర్చునే మీ భాషలో చెప్పండి.',
      step1Detail: 'మా కెమెరా షాపు పేరు, రూపాయల మొత్తం, తేదీని ఆటోమేటిక్‌గా గుర్తిస్తుంది.',
      step1Header: 'స్టెప్ 1: బిల్లు ఫోటో క్యాప్చర్',
      step1Detected: 'బిల్లు లభించింది',
      step1Item: 'శ్రీ రామ సీడ్స్ & ట్రేడర్స్',
      step1Category: '₹8,450.00 • 5 బస్తాల NPK ఎరువులు',
      step2Title: '2. యాప్ ఆటోమేటిక్‌గా రూపాయల్లో లెక్కలు చేస్తుంది',
      step2Desc: 'కాలిక్యులేటర్ అవసరం లేదు. ఎకరాకి అయ్యే మొత్తం ఖర్చును యాప్ తక్షణమే అప్‌డేట్ చేస్తుంది.',
      step2Detail: 'విత్తనం, డీజిల్, ఎరువులు మరియు కూలీల ఖర్చులను ఎకరాకి రూపాయల్లో చూపుతుంది.',
      step2Header: 'స్టెప్ 2: ఆటోమేటిక్ రూపాయల లెక్కలు',
      step2Item1: 'విత్తనాలు & ఎరువుల మొత్తం',
      step2Item2: 'ట్రాక్టర్ డీజిల్ & కూలీలు',
      step2TotalCost: 'ఎకరాకి మొత్తం ఖర్చు: ₹14,850 / ఎకరా',
      step3Title: '3. స్పష్టమైన సమాధానాలు పొందండి',
      step3Desc: '"మీరు లాభాల్లో ఉన్నారు" లేదా "వచ్చే నెల జాగ్రత్త" అనే సులువైన సమాధానాలు పొందండి.',
      step3Detail: 'తెలుగు, ఇంగ్లీష్ లేదా హిందీలో సాధారణ మాటల్లో సమాధానం — బ్యాంక్ క్లిష్టమైన పదాలు ఉండవు.',
      step3Header: 'స్టెప్ 3: సరళమైన మార్గదర్శకత్వం',
      step3StatusTitle: 'కోత సమయానికి మీరు మంచి లాభాల్లో ఉన్నారు!',
      step3StatusSub: 'అంచనా లాభం: మండి ధర ₹2,180/క్వింటాల్‌ వద్ద +₹1,45,000 లాభం',
      step3AlertTitle: 'అక్టోబర్ 15 కొరకు ముందస్తు సమాచారం',
      step3AlertSub: 'ట్రాక్టర్ వాయిదా ₹12,000 చెల్లించాలి. పత్తి అమ్మకం డబ్బులు అక్టోబర్ 22న వస్తాయి.',
      benefitLabel: 'రైతుకి ప్రయోజనం:',
    },
    features: {
      badge: '100% ఉచిత ఫీచర్లు',
      title: 'భారతీయ రైతుల కోసం సులువైన ఫీచర్లు',
      subtitle: 'పొలం పనుల సమయం వృధా కాకుండా మీ డబ్బులను నిర్వహించడానికి కావలసినవన్నీ.',
      tryFree: 'ఈ ఫీచర్‌ని ఉచితంగా వాడండి',
      showcase: 'ఫీచర్ ప్రత్యక్ష రూపం',
      f1Name: 'ఖర్చులు & అమ్మకాల నమోదు',
      f1Tagline: '3 సెకన్లలో రూపాయల్లో రశీదు ఫోటో తీయండి.',
      f1Desc: 'విత్తనాలు, ఎరువులు, ట్రాక్టర్ డీజిల్ లేదా పశువుల దాణాకి ఖర్చు చేసిన ప్రతి రూపాయిని ఆటోమేటిక్‌గా వర్గీకరిస్తుంది.',
      f1B1: 'ఫోన్ కెమెరాతో షాపు బిల్లుల స్కాన్',
      f1B2: 'చేను, పంట లేదా పాడి పశువుల ఆధారంగా ట్యాగింగ్',
      f1B3: 'నెట్‌వర్క్ లేని చేలలో కూడా 100% ఆఫ్‌లైన్ వర్కింగ్',
      f1Title: 'ఇటీవలి వ్యవసాయ లావాదేవీలు',
      f1Item1Name: 'ట్రాక్టర్ డీజిల్ (50 లీటర్లు)',
      f1Item1Sub: 'చేను #2 • నిన్న',
      f1Item2Name: 'మండి వరి ధాన్యం అమ్మకం',
      f1Item2Sub: '45 క్వింటాళ్ల వరి • సెప్టెంబర్ 22',
      f2Name: 'లాభ నష్టాల కాలిక్యులేటర్',
      f2Tagline: 'ఈ సీజన్ నాకు లాభం వస్తుందా?',
      f2Desc: 'మండిలో ధాన్యం అమ్మే ముందే క్వింటాల్‌కి ఎంత ధర వస్తే లాభం ఉంటుందో ఖచ్చితంగా తెలుసుకోండి.',
      f2B1: 'క్వింటాల్‌కి కావలసిన కనీస ధర లెక్కంపు',
      f2B2: 'వర్షాలు మరియు దిగుబడి మార్పుల ఆధారంగా అప్‌డేట్',
      f2B3: 'ఎకరాకి అయ్యే ఖర్చు వివరాలు',
      f2Target: '2026 వరి పంట లక్ష్యం',
      f2Breakeven: 'కనీస ధర (బ్రేక్-ఈవెన్): ₹1,850 / క్వింటాల్',
      f2Status: 'లాభదాయకం',
      f2CostLabel: 'మీ ఖర్చు: ₹1,850/క్వింటాల్',
      f2ProfitLabel: 'మండి ధర: ₹2,180/క్వింటాల్ (+₹330 లాభం!)',
      f3Name: 'నగదు ప్రవాహ క్యాలెండర్',
      f3Tagline: 'డబ్బులు ఎప్పుడు వస్తాయి, ఎప్పుడు పోతాయి',
      f3Desc: 'విత్తనాల విత్తే సమయపు ఖర్చులను, పంట అమ్మకం డబ్బుల రాబడితో జత చేసి ఆర్థిక ఇబ్బందులు రాకుండా చూస్తుంది.',
      f3B1: '12 నెలల ప్రత్యక్ష నగదు అంచనా',
      f3B2: 'ట్రాక్టర్ లోన్ వాయిదాలు & కౌలు గడువు తేదీలు',
      f3B3: 'అనుకోని నగదు కొరత రాకుండా ముందస్తు రక్షణ',
      f3Apr: 'ఏప్రిల్ (విత్తనం) -₹45,000',
      f3Jul: 'జూలై (మందులు) -₹15,000',
      f3Oct: 'అక్టోబర్ (కోతలు) +₹1,85,000',
      f3Dec: 'డిసెంబర్ (అమ్మకాలు) +₹65,000',
      f4Name: 'స్మార్ట్ అలర్టులు',
      f4Tagline: 'డబ్బులు తగ్గక ముందే మేము హెచ్చరిస్తాం',
      f4Desc: 'పెద్ద బిల్లులు రాబోయే ముందు లేదా ఎరువుల ధరలు పెరిగినప్పుడు వారాల ముందే అలర్టులు పంపుతుంది.',
      f4B1: 'ముందస్తు నగదు కొరత హెచ్చరికలు (30-60 రోజుల ముందే)',
      f4B2: 'ఎరువులు & డీజిల్ ధరల మార్పు అలర్టులు',
      f4B3: 'మీ భాషలోనే సులువైన ఫోన్ మెసేజ్‌లు',
      f4AlertHeader: 'హెచ్చరిక: నవంబర్ 1న కౌలు డబ్బులు చెల్లించాలి',
      f4AlertSub: 'చెల్లించాల్సింది: ₹25,000. పత్తి డబ్బులు వచ్ఛేది: నవంబర్ 8 (₹45,000).',
      f4Tip: 'సూచన: పత్తి డబ్బులు వచ్చే వరకు పాడి ఆదాయం ₹10,000 నిల్వను ఉపయోగించండి.',
      f5Name: 'అగ్రిలెక్సా (AgriNexa) వాయిస్ అసిస్టెంట్',
      f5Tagline: 'తెలిసిన రైతు మిత్రునితో మాట్లాడినట్లే అడగండి',
      f5Desc: 'తెలుగు, ఇంగ్లీష్ లేదా హిందీలో మీ AI రైతు సలహాదారునితో మాట్లాడి సందేహాలు నివృత్తి చేసుకోండి.',
      f5B1: 'వాయిస్ కమాండ్‌లు లేదా టైపింగ్ ద్వారా అడగవచ్చు',
      f5B2: 'ఎరువులు మరియు విత్తనాల ఖర్చులపై తక్షణ సమాధానాలు',
      f5B3: 'భారతీయ పంటల చక్రం మరియు పాడి పరిశ్రమ అవగాహన',
      f5Header: '💬 అగ్రిలెక్సా (AgriNexa) వాయిస్ AI సలహాదారు',
      f5Q1: 'వచ్చే నెల డీజిల్‌కి సరిపడా డబ్బులు ఉంటాయా?',
      f5A1: 'అవును రమేష్ గారు! అక్టోబర్ 10న పత్తి డబ్బులు (₹35,000) వచ్చాక, 100 లీటర్ల డీజిల్ కొన్నాక మీ దగ్గర మిగిలేది ₹18,000.',
      f5Placeholder: "వాయిస్ కమాండ్ చెప్పండి (ఉదా: 'ఎకరా ఖర్చు ఎంత?')...",
    },
    trust: {
      freeTitle: '100% ఎల్లప్పుడూ ఉచితం',
      freeDesc: 'ఎలాంటి సబ్‌స్క్రిప్షన్ ఫీజులు లేవు, క్రెడిట్ కార్డులు అక్కర్లేదు. రైతులకు ఎల్లప్పుడూ 100% ఉచితం.',
      offlineTitle: '100% ఆఫ్‌లైన్‌లో పనిచేస్తుంది',
      offlineDesc: 'నెట్‌వర్క్ సిగ్నల్ లేని చేలలో కూడా బిల్లులు నమోదు చేసుకోవచ్చు.',
      privacyTitle: 'పూర్తి రహస్యం & భద్రత',
      privacyDesc: 'మీ లెక్కలు మీకు మాత్రమే పరిమితం. మేము మీ సమాచారాన్ని ఎవరికీ విక్రయించము.',
    },
    testimonials: {
      badge: 'భారతదేశ వ్యాప్తంగా రైతుల నమ్మకం',
      title: 'రైతుల అనుభవాలు వినండి',
      subtitle: 'దేశవ్యాప్తంగా వేలాది మంది రైతులు అగ్రిలెక్సా (AgriNexa) తో తమ లెక్కలను సులభంగా నిర్వహించుకుంటున్నారు.',
      t1Quote: 'కాగితపు బిల్లులు కవర్లో వేసి దాచేవాడిని. ఇప్పుడు ట్రాక్టర్ మీద కూర్చునే 5 సెకన్లలో ఫోటో తీస్తున్నాను. ఎకరాకి రూపాయి కూడా పొల్లు పోకుండా ఖర్చు తెలుస్తోంది!',
      t1Name: 'రమేష్ రెడ్డి',
      t1Farm: 'వరి & పత్తి రైతు • 12 ఎకరాలు (తెలంగాణ)',
      t2Quote: 'ఫసల్ కాట్నే సే పహ్లే హీ ముఝే కుంతల్ కా సహీ రేట్ ఔర్ మునాఫా పతా చల్ జాతా హై।',
      t2Name: 'బల్‌దేవ్ సింగ్',
      t2Farm: 'గోధుమ & చెరకు రైతు • పంజాబ్',
      t3Quote: 'పాడి పశువుల దాణా మరియు ఎరువుల ఖర్చులు పెరిగినప్పుడు ఈ యాప్ ముందే హెచ్చరిస్తుంది. రూపాయి కూడా కట్టక్కర్లేదు.',
      t3Name: 'విజయ్ పాటిల్ & కుటుంబం',
      t3Farm: 'పాడి & సుగంధ ద్రవ్యాల రైతు • మహారాష్ట్ర',
    },
    modal: {
      title: '30 సెకన్లలో అగ్రిలెక్సా (AgriNexa) ఉచిత యాప్ పొందండి',
      subtitle: 'భారతీయ రైతులకు 100% ఎల్లప్పుడూ ఉచితం. క్రెడిట్ కార్డ్ అవసరం లేదు.',
      q1Label: '1. మీరు ఏమి వ్యవసాయం చేస్తారు?',
      c1: '🌾 పంటలు',
      c1Desc: 'వరి/పత్తి/గోధుమ',
      c2: '🐄 పాడి',
      c2Desc: 'ఆవులు/గేదెలు/కోళ్ళు',
      c3: '🚜 రెండు',
      c3Desc: 'మిశ్రమ వ్యవసాయం',
      q2Label: '2. మీ 10 అంకెల మొబైల్ నంబర్ నమోదు చేయండి',
      placeholder: '10 అంకెల మొబైల్ నంబర్ (ఉదా: 9876543210)',
      privacyNote: 'మీ మొబైల్ నంబర్ 100% సురక్షితం. అనవసర సందేశాలు రావు.',
      submitBtn: 'ఉచిత యాప్ లింక్ పొందండి',
      callNote: 'మాట్లాడాలా? ఉచిత టోల్ ఫ్రీ హెల్ప్‌లైన్‌కి కాల్ చేయండి: 1800-123-FARM',
      successTitle: 'అభినందనలు!',
      successSub: 'యాప్ డౌన్‌లోడ్ లింక్‌ను మీ మొబైల్ నంబర్‌కు SMS ద్వారా పంపాము.',
      nextStepsTitle: 'తరువాత ఏమి చేయాలి?',
      step1: 'మీ ఫోన్లో వచ్చిన SMS లింక్ ఓపెన్ చేయండి',
      step2: 'లింక్ నొక్కి మీ ఉచిత ఖాతాను ప్రారంభించండి',
      step3: '10 సెకన్లలో మీ మొదటి బిల్లు ఫోటో తీయండి!',
      doneBtn: 'పూర్తయింది — వెబ్‌సైట్‌కి తిరిగి వెళ్ళండి',
    },
    footer: {
      badge: 'రైతులకు 100% ఉచితం',
      bannerTitle: 'మీ వ్యవసాయ లెక్కలను సులభంగా,',
      bannerTitleHighlight: '100% ఉచితంగా ప్రారంభించండి',
      bannerSub: 'కాగితపు బిల్లుల కంగారు వదిలేసి ప్రశాంతత పొందిన వేలాది మంది భారతీయ రైతులతో కలవండి.',
      ctaBtn: '100% ఉచిత యాప్ పొందండి',
      helplineBtn: 'హెల్ప్‌లైన్ కాల్ చేయండి: 1800-123-FARM',
      tagline: 'భారతీయ రైతులకు వారి స్వంత భాషలోనే సులువైన, నమ్మకమైన ఉచిత ఆర్థిక యాప్‌ను అందించడమే అగ్రిలెక్సా (AgriNexa) లక్ష్యం.',
      careNote: 'భారతీయ వ్యవసాయంపై ప్రత్యేక ప్రేమతో 🇮🇳',
      navTitle: 'లింక్‌లు',
      supportTitle: 'రైతు సహాయం',
      timing: 'సోమ-శని ఉదయం 7:00 నుండి రాత్రి 8:00 వరకు',
      helplineDesc: 'గ్రామీణ మరియు పొలం సహాయం కోసం ఉచిత టోల్ ఫ్రీ నంబర్',
      copyright: '© 2026 అగ్రిలెక్సా (AgriNexa) ఇండియా. రైతులకు 100% ఉచిత సోఫ్ట్‌వేర్.',
      privacy: 'గోప్యతా విధానం',
      terms: 'నిబంధనలు',
      security: 'రైతు భద్రతా హామీ',
    }
  },

  hi: {
    nav: {
      brandName: 'एग्रीनेक्सा (AgriNexa)',
      whatItDoes: 'यह क्या करता है',
      howItWorks: 'यह कैसे काम करता है',
      features: 'ऐप फीचर्स',
      farmerStories: 'किसानों के अनुभव',
      helpline: 'टोल-फ्री हेल्पलाइन: 1800-123-FARM',
      getStartedFree: '100% मुफ्त ऐप पाएं',
      freeBadge: '100% हमेशा मुफ्त',
    },
    hero: {
      badge: 'भारतीय फसल और डेयरी किसानों के लिए खास',
      headline: "अपने खेत का हिसाब-किताब,",
      headlineHighlight: 'कभी भी, कहीं भी जानें',
      subtext: 'एग्रीनेक्सा (AgriNexa) एक 100% मुफ्त ऐप है जो आपके खेती के खर्चों को रुपयों में दर्ज करता है और प्रति एकड़ वास्तविक लागत बताता है।',
      primaryCta: '100% मुफ्त ऐप पाएं',
      secondaryCta: 'देखें यह कैसे काम करता है',
      freeForever: '100% मुफ्त • कोई गुप्त शुल्क नहीं',
      worksOffline: 'खेतों में बिना इंटरनेट काम करता है',
      privateSecure: '100% सुरक्षित और निजी',
      noDegree: 'किसी अकाउंटिंग पढ़ाई की जरूरत नहीं',
      receiptHeader: 'श्री लक्ष्मी एग्री फार्म',
      receiptSub: 'खरीफ सीजन 2026 • धान और कपास',
      scannedTitle: 'हाल ही में स्कैन किया गया बिल',
      autoTagged: 'ऑटो-टैग: खाद का खर्च',
      itemTitle: '5 बोरी NPK खाद',
      itemCategory: 'खाद दुकान का बिल',
      costPerAcreLabel: 'प्रति एकड़ लागत',
      costPerAcreValue: '₹14,800',
      costStatus: 'बजट के भीतर है',
      estProfitLabel: 'अनुमानित लाभ',
      estProfitValue: '+₹1,45,000',
      breakEvenText: 'न्यूनतम दर (Break-even): ₹1,850/क्विंटल',
      smartAlertTitle: 'स्मार्ट अलर्ट:',
      smartAlertText: 'अगले महीने कपास तुड़ाई मजदूरी के लिए पैसे तैयार हैं।',
    },
    valueCards: {
      badge: 'आपके फायदे की बात',
      title: '4 आसान तरीकों से एग्रीनेक्सा (AgriNexa) आपके खेत में मदद करता है',
      subtitle: 'गणित के झंझट को खत्म करके आपको अपनी खेती पर ध्यान देने की आजादी देता है।',
      card1Title: 'हर खर्च और बिक्री दर्ज करें',
      card1Sub: 'दुकान के बिल की बस एक फोटो खींचें',
      card1Desc: 'कागज के बिल खोने का डर खत्म। बीज, खाद या डीजल के बिल की फोटो खींचें और रुपयों में हिसाब अपने आप सेव हो जाएगा।',
      card2Title: 'प्रति एकड़/पशु वास्तविक लागत जानें',
      card2Sub: 'हर खेत का सटीक हिसाब रुपयों में',
      card2Desc: 'बीज, खाद, ट्रैक्टर डीजल और मजदूरी पर प्रति एकड़ कितना खर्च हुआ, साफ-साफ देखें।',
      card3Title: 'फसल बेचने से पहले मुनाफा देखें',
      card3Sub: 'प्रति क्विंटल न्यूनतम दर (₹) जानें',
      card3Desc: 'मंडी जाने से पहले ही जान लें कि प्रति क्विंटल किस रेट पर आपको सही मुनाफा मिलेगा।',
      card4Title: 'पैसों की तंगी की पहले से चेतावनी पाएं',
      card4Sub: 'अचानक आने वाली तंगी से बचें',
      card4Desc: 'ठेके या खाद के बिल की तारीख आने से पहले ही चेतावनी देता है ताकि आप तैयार रह सकें।',
      keyFeature: 'मुख्य फीचर',
      learnMore: 'और जानें →',
    },
    howItWorks: {
      badge: 'सरल 1-2-3 तरीका',
      title: '3 आसान चरणों में एग्रीनेक्सा (AgriNexa) कैसे काम करता है',
      subtitle: 'कोई कठिन कंप्यूटर टाइपिंग नहीं। किसानों के लिए एकदम आसान।',
      step1Title: '1. बिल की फोटो खींचें या बोलकर बताएं',
      step1Desc: 'अपने फोन के कैमरे से रसीद की फोटो लें या ट्रैक्टर पर बैठे-बैठे अपनी भाषा में बोलें।',
      step1Detail: 'हमारा कैमरा दुकान का नाम, कुल रुपये और तारीख अपने आप पढ़ लेता है।',
      step1Header: 'स्टेप 1: बिल की फोटो',
      step1Detected: 'बिल मिल गया',
      step1Item: 'श्री राम सीड्स एंड ट्रेडर्स',
      step1Category: '₹8,450.00 • 5 बोरी NPK खाद',
      step2Title: '2. ऐप अपने आप रुपयों में हिसाब करता है',
      step2Desc: 'कैलकुलेटर की जरूरत नहीं। ऐप प्रति एकड़ कुल लागत तुरंत अपडेट कर देता है।',
      step2Detail: 'बीज, डीजल, खाद और मजदूरी के खर्च को मिलाकर एकड़ के हिसाब से दिखाता है।',
      step2Header: 'स्टेप 2: ऑटोमैटिक रुपयों की गणना',
      step2Item1: 'बीज और खाद का कुल खर्च',
      step2Item2: 'ट्रैक्टर डीजल और मजदूरी',
      step2TotalCost: 'प्रति एकड़ कुल लागत: ₹14,850 / एकड़',
      step3Title: '3. सीधे और आसान जवाब पाएं',
      step3Desc: '"आप फायदे में हैं" या "अगले महीने ध्यान रखें" जैसे सीधे जवाब पाएं।',
      step3Detail: 'हिंदी, तेलुगु या अंग्रेजी में आसान भाषा — कोई बैंक की कठिन शब्दावली नहीं।',
      step3Header: 'स्टेप 3: आसान मार्गदर्शन',
      step3StatusTitle: 'कटाई के समय आप अच्छे फायदे में हैं!',
      step3StatusSub: 'अनुमानित मुनाफा: मंडी रेट ₹2,180/क्विंटल पर +₹1,45,000 लाभ',
      step3AlertTitle: '15 अक्टूबर के लिए जरूरी सूचना',
      step3AlertSub: 'ट्रैक्टर की किस्त ₹12,000 देनी है। कपास बिक्री के पैसे 22 अक्टूबर को आएंगे।',
      benefitLabel: 'किसान को फायदा:',
    },
    features: {
      badge: '100% मुफ्त फीचर्स',
      title: 'भारतीय किसानों के लिए एकदम आसान',
      subtitle: 'खेत के काम का समय गंवाए बिना पैसों का प्रबंधन करने का सबसे सरल तरीका।',
      tryFree: 'यह फीचर मुफ्त इस्तेमाल करें',
      showcase: 'फीचर का लाइव रूप',
      f1Name: 'खर्च और बिक्री ट्रैकर',
      f1Tagline: '3 सेकंड में रुपयों में रसीद की फोटो खींचें।',
      f1Desc: 'बीज, खाद, ट्रैक्टर डीजल या पशु आहार पर खर्च हुए हर रुपये को अपने आप वर्गीकृत करता है।',
      f1B1: 'फोन कैमरे से दुकान के बिल की स्कैनिंग',
      f1B2: 'खेत के टुकड़े, फसल या पशु के हिसाब से टैगिंग',
      f1B3: 'बिना इंटरनेट के भी 100% ऑफलाइन काम करता है',
      f1Title: 'हाल के लेनदेन',
      f1Item1Name: 'फार्म डीजल (50 लीटर)',
      f1Item1Sub: 'खेत #2 ट्रैक्टर • कल',
      f1Item2Name: 'मंडी धान बिक्री',
      f1Item2Sub: '45 क्विंटल धान • 22 सितंबर',
      f2Name: 'लाभ-हानि कैलकुलेटर',
      f2Tagline: 'क्या इस सीजन मुझे मुनाफा होगा?',
      f2Desc: 'मंडी में उपज बेचने से पहले ही जान लें कि प्रति क्विंटल किस रेट पर आपको सही मुनाफा मिलेगा।',
      f2B1: 'प्रति क्विंटल न्यूनतम आवश्यक रेट की गणना',
      f2B2: 'बारिश और उपज में बदलाव के हिसाब से अपडेट',
      f2B3: 'प्रति एकड़ लागत का पूरा ब्यौरा',
      f2Target: '2026 धान फसल लक्ष्य',
      f2Breakeven: 'न्यूनतम दर (Break-even): ₹1,850 / क्विंटल',
      f2Status: 'लाभदायक',
      f2CostLabel: 'आपकी लागत: ₹1,850/क्विंटल',
      f2ProfitLabel: 'मंडी भाव: ₹2,180/क्विंटल (+₹330 फायदा!)',
      f3Name: 'कैश फ्लो कैलेंडर',
      f3Tagline: 'पैसा कब आएगा और कब जाएगा',
      f3Desc: 'बुवाई के समय होने वाले बड़े खर्चों को फसल बिक्री के पैसों के साथ मिलाकर तंगी से बचाता है।',
      f3B1: '12 महीने का कैश फ्लो अनुमान',
      f3B2: 'ट्रैक्टर लोन की किस्त और ठेके की तारीखें',
      f3B3: 'अचानक पैसों की कमी से बचाव',
      f3Apr: 'अप्रैल (बुवाई) -₹45,000',
      f3Jul: 'जुलाई (दवाई) -₹15,000',
      f3Oct: 'अक्टूबर (कटाई) +₹1,85,000',
      f3Dec: 'दिसंबर (बिक्री) +₹65,000',
      f4Name: 'स्मार्ट अलर्ट्स',
      f4Tagline: 'पैसों की कमी होने से पहले हम सचेत करेंगे',
      f4Desc: 'बड़े बिल या खाद के दाम बदलने पर हफ्तों पहले सचेत करता है।',
      f4B1: 'पैसों की कमी की अग्रिम चेतावनी (30-60 दिन पहले)',
      f4B2: 'खाद और डीजल के दामों में बदलाव का अलर्ट',
      f4B3: 'आपकी अपनी भाषा में आसान मोबाइल मैसेज',
      f4AlertHeader: 'अलर्ट: 1 नवंबर को जमीन का ठेका देना है',
      f4AlertSub: 'भुगतान: ₹25,000। कपास के पैसे आने की तारीख: 8 नवंबर (₹45,000)।',
      f4Tip: 'सुझाव: कपास के पैसे आने तक डेयरी बचत के ₹10,000 इस्तेमाल करें।',
      f5Name: 'एग्रीनेक्सा (AgriNexa) वॉइस अस्सिटेंट',
      f5Tagline: 'अनुभवी किसान साथी की तरह सवाल पूछें',
      f5Desc: 'हिंदी, तेलुगु या अंग्रेजी में अपने AI किसान सलाहकार से बात करें।',
      f5B1: 'बोलकर या टाइप करके सवाल पूछें',
      f5B2: 'खाद और बीज के खर्च पर तुरंत जवाब पाएं',
      f5B3: 'भारतीय फसलों और डेयरी पशुपालन की पूरी समझ',
      f5Header: '💬 एग्रीनेक्सा (AgriNexa) वॉइस AI सलाहकार',
      f5Q1: 'क्या अगले महीने डीजल के लिए पर्याप्त पैसे होंगे?',
      f5A1: 'हाँ बलदेव जी! 10 अक्टूबर को कपास का चेक (₹35,000) मिलने के बाद, 100 लीटर डीजल खरीदने के बाद भी आपके पास ₹18,000 बचेंगे।',
      f5Placeholder: "बोलें या सवाल टाइप करें (जैसे 'प्रति एकड़ मेरा खर्च क्या है?')...",
    },
    trust: {
      freeTitle: '100% हमेशा मुफ्त',
      freeDesc: 'कोई भी फीस या क्रेडिट कार्ड की जरूरत नहीं। किसानों के लिए हमेशा 100% मुफ्त।',
      offlineTitle: '100% ऑफलाइन काम करता है',
      offlineDesc: 'बिना मोबाइल नेटवर्क वाले दूरदराज खेतों में भी आसानी से काम करता है।',
      privacyTitle: 'सुरक्षित और निजी',
      privacyDesc: 'आपका हिसाब पूरी तरह सुरक्षित है। हम आपकी जानकारी किसी को नहीं बेचते।',
    },
    testimonials: {
      badge: 'पूरे भारत के किसानों का भरोसा',
      title: 'किसान भाइयों के अनुभव',
      subtitle: 'भारत भर के किसान एग्रीनेक्सा (AgriNexa) से अपने खेती के पैसों का हिसाब आसानी से रख रहे हैं।',
      t1Quote: 'రశీదు ఫోటో తీస్తే చాలు, ఎకరాకి ఎంత ఖర్చు అవుతుందో వెంటనే తెలిసిపోతుంది!',
      t1Name: 'रमेश रेड्डी',
      t1Farm: 'धान और कपास किसान • 12 एकड़ (तेलंगाना)',
      t2Quote: 'फसल काटने से पहले ही मुझे कुंतल का सही रेट और अपना लागत मूल्य पता चल जाता है। बहुत ही आसान ऐप है, वो भी 100% फ्री।',
      t2Name: 'बलदेव सिंह',
      t2Farm: 'गेहूं और गन्ना किसान • पंजाब',
      t3Quote: 'दूध और खाद का पूरा हिसाब बिना किसी फीस के 100% फ्री में मिल जाता है। बहुत मददगार है।',
      t3Name: 'विजय पाटिल और परिवार',
      t3Farm: 'डेयरी और मसाला किसान • महाराष्ट्र',
    },
    modal: {
      title: '30 सेकंड में एग्रीनेक्सा (AgriNexa) मुफ्त ऐप पाएं',
      subtitle: 'भारतीय किसानों के लिए 100% हमेशा मुफ्त। कोई क्रेडिट कार्ड आवश्यक नहीं।',
      q1Label: '1. आप क्या खेती करते हैं?',
      c1: '🌾 फसलें',
      c1Desc: 'धान/गेहूं/कपास',
      c2: '🐄 डेयरी/पशु',
      c2Desc: 'गाय/भैंस/मुर्गीपालन',
      c3: '🚜 दोनों',
      c3Desc: 'मिश्रित खेती',
      q2Label: '2. अपना 10 अंकों का मोबाइल नंबर दर्ज करें',
      placeholder: '10 अंकों का मोबाइल नंबर (जैसे 9876543210)',
      privacyNote: 'आपका नंबर 100% सुरक्षित है। कोई अनचाहा मैसेज नहीं।',
      submitBtn: 'मुफ्त ऐप लिंक पाएं',
      callNote: 'बात करना चाहते हैं? टोल-फ्री हेल्पलाइन पर कॉल करें: 1800-123-FARM',
      successTitle: 'बधाई हो!',
      successSub: 'हमने आपके मोबाइल नंबर पर ऐप डाउनलोड का मैसेज भेज दिया है।',
      nextStepsTitle: 'आगे क्या करें?',
      step1: 'अपने फोन में आया हुआ मैसेज (SMS) खोलें',
      step2: 'लिंक पर क्लिक करके अपना मुफ्त खाता शुरू करें',
      step3: '10 सेकंड में अपने पहले बिल की फोटो लें!',
      doneBtn: 'हो गया — वेबसाइट पर वापस जाएं',
    },
    footer: {
      badge: 'किसानों के लिए 100% मुफ्त',
      bannerTitle: 'अपने खेत का हिसाब-किताब',
      bannerTitleHighlight: 'आसान और 100% मुफ्त बनाएं',
      bannerSub: 'कागज के बिलों के झंझट को अलविदा कहकर मानसिक शांति पाने वाले हजारों किसान भाइयों से जुड़ें।',
      ctaBtn: '100% मुफ्त ऐप पाएं',
      helplineBtn: 'हेल्पलाइन पर कॉल करें: 1800-123-FARM',
      tagline: 'एग्रीनेक्सा (AgriNexa) का उद्देश्य भारतीय किसानों को उनकी अपनी भाषा में सरल और विश्वसनीय मुफ्त वित्तीय सॉफ्टवेयर देना है।',
      careNote: 'भारतीय कृषि के लिए विशेष प्रेम के साथ 🇮🇳',
      navTitle: 'ज़रूरी लिंक',
      supportTitle: 'किसान सहायता',
      timing: 'सोम-शनि सुबह 7:00 से रात 8:00 बजे तक',
      helplineDesc: 'ग्रामीण और खेत में सहायता के लिए समर्पित टोल-फ्री हेल्पलाइन',
      copyright: '© 2026 एग्रीनेक्सा (AgriNexa) इंडिया। किसानों के लिए 100% मुफ्त सॉफ्टवेयर।',
      privacy: 'गोपनीयता नीति',
      terms: 'सेवा की शर्तें',
      security: 'किसान सुरक्षा गारंटी',
    }
  }
};
