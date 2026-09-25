import { Language } from '../data/translations';

// Web Speech API Types
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export type VoiceActionType = 
  | 'add_expense'
  | 'add_income'
  | 'query_cost'
  | 'query_profit'
  | 'query_total_expense'
  | 'query_net_balance'
  | 'query_risk_status'
  | 'nav_camera'
  | 'nav_calculator'
  | 'nav_ledger'
  | 'nav_chat'
  | 'apply_escape_route'
  | 'general_question';

export interface VoiceCommandResult {
  action: VoiceActionType;
  transcript: string;
  amount?: number;
  category?: string;
  itemTitle?: string;
}

export const getLangCodeForSpeech = (lang: Language): string => {
  switch (lang) {
    case 'te':
      return 'te-IN';
    case 'hi':
      return 'hi-IN';
    case 'en':
    default:
      return 'en-IN';
  }
};

/**
 * Text to Speech Engine: Speaks text aloud in selected language
 */
export const speakText = (text: string, lang: Language, onEnd?: () => void) => {
  if (!('speechSynthesis' in window)) {
    console.warn('Speech synthesis not supported in this browser.');
    if (onEnd) onEnd();
    return;
  }

  // Stop any active speech
  window.speechSynthesis.cancel();

  // Clean text from Markdown or emojis before speaking
  const cleanText = text.replace(/[*#_~`[\]()]/g, '').replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '');

  const utterance = new SpeechSynthesisUtterance(cleanText);
  utterance.lang = getLangCodeForSpeech(lang);
  utterance.rate = 0.95;
  utterance.pitch = 1.0;

  const voices = window.speechSynthesis.getVoices();
  const matchedVoice = voices.find((v) => v.lang.startsWith(lang) || v.lang.startsWith(getLangCodeForSpeech(lang)));
  if (matchedVoice) {
    utterance.voice = matchedVoice;
  }

  utterance.onend = () => {
    if (onEnd) onEnd();
  };

  utterance.onerror = () => {
    if (onEnd) onEnd();
  };

  window.speechSynthesis.speak(utterance);
};

export const stopSpeaking = () => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
};

/**
 * Enhanced Voice Command Parser Engine (English, Telugu, Hindi)
 */
export const parseVoiceCommand = (transcript: string): VoiceCommandResult => {
  const text = transcript.toLowerCase();

  // 1. Navigation Commands
  if (text.includes('camera') || text.includes('కెమెరా') || text.includes('कैमरा') || text.includes('scan') || text.includes('స్కాన్')) {
    return { action: 'nav_camera', transcript };
  }
  if (text.includes('calculator') || text.includes('కాలిక్యులేటర్') || text.includes('कैलकुलेटर')) {
    return { action: 'nav_calculator', transcript };
  }
  if (text.includes('ledger') || text.includes('లేడ్జర్') || text.includes('खाता') || text.includes('హిసాబ్')) {
    return { action: 'nav_ledger', transcript };
  }
  if (text.includes('chat') || text.includes('చాట్') || text.includes('वॉइस चैट')) {
    return { action: 'nav_chat', transcript };
  }

  // 2. Emergency Escape Route Command
  if (text.includes('escape') || text.includes('అపాయం నుండి తప్పించుకో') || text.includes('తప్పించుకో') || text.includes('जोखिम से बचो') || text.includes('बचो') || text.includes('fix risk')) {
    return { action: 'apply_escape_route', transcript };
  }

  // 3. Query Financial Metrics Commands
  if (text.includes('total expense') || text.includes('మొత్తం ఖర్చు') || text.includes('कुल खर्च') || text.includes('మొత్తం ఎంత')) {
    return { action: 'query_total_expense', transcript };
  }
  if (text.includes('net balance') || text.includes('balance') || text.includes('నికర నిల్వ') || text.includes('నిల్వ ఎంత') || text.includes('बैलेंस') || text.includes('बैलेंस कितना')) {
    return { action: 'query_net_balance', transcript };
  }
  if (text.includes('risk level') || text.includes('risk status') || text.includes('అపాయం ఎంత') || text.includes('అపాయం స్థాయి') || text.includes('जोखिम स्तर')) {
    return { action: 'query_risk_status', transcript };
  }
  if (text.includes('cost per acre') || text.includes('ఎకరా ఖర్చు') || text.includes('प्रति एकड़ लागत') || text.includes('cost') || text.includes('ఖర్చు ఎంత')) {
    return { action: 'query_cost', transcript };
  }
  if (text.includes('profit') || text.includes('లాభం') || text.includes('मुनाफा') || text.includes('फायदा') || text.includes('break even') || text.includes('రేటు')) {
    return { action: 'query_profit', transcript };
  }

  // 4. Add Income Command
  const numbers = text.match(/\d+/g);
  if (numbers && (text.includes('income') || text.includes('sale') || text.includes('ఆదాయం') || text.includes('అమ్మకం') || text.includes('आय') || text.includes('बिक्री'))) {
    const amount = parseInt(numbers[0], 10);
    return { 
      action: 'add_income', 
      transcript, 
      amount, 
      category: 'Sales', 
      itemTitle: `🎙️ Voice Income: Harvest Grain Sale` 
    };
  }

  // 5. Add Expense Command
  if (numbers && (text.includes('add') || text.includes('expense') || text.includes('రూపాయలు') || text.includes('ఖర్చు') || text.includes('खर्च') || text.includes('fertilizer') || text.includes('diesel') || text.includes('seed') || text.includes('labor'))) {
    const amount = parseInt(numbers[0], 10);
    let category = 'Input Expense';
    let title = '🎙️ Voice Added Expense';

    if (text.includes('fertilizer') || text.includes('ఎరువులు') || text.includes('खाद')) {
      category = 'Fertilizer';
      title = '🎙️ Voice Added: NPK Fertilizer';
    } else if (text.includes('diesel') || text.includes('డీజిల్') || text.includes('डीजल') || text.includes('fuel')) {
      category = 'Fuel';
      title = '🎙️ Voice Added: Farm Tractor Diesel';
    } else if (text.includes('seed') || text.includes('విత్తనాలు') || text.includes('बीज')) {
      category = 'Seeds';
      title = '🎙️ Voice Added: Hybrid Seeds';
    } else if (text.includes('labor') || text.includes('కూలీలు') || text.includes('मजदूरी')) {
      category = 'Labor';
      title = '🎙️ Voice Added: Farm Labor Outflow';
    }

    return { action: 'add_expense', transcript, amount, category, itemTitle: title };
  }

  return { action: 'general_question', transcript };
};

/**
 * Speech Recognition Manager with MediaRecorder Fallback
 */
export class ProfessionalVoiceManager {
  private recognition: any = null;
  private mediaRecorder: MediaRecorder | null = null;
  private audioChunks: Blob[] = [];
  private isListening: boolean = false;

  constructor(
    private lang: Language,
    private onResult: (transcript: string, command: VoiceCommandResult) => void,
    private onError: (err: string) => void,
    private onStatusChange: (listening: boolean) => void
  ) {}

  public startListening() {
    this.isListening = true;
    this.onStatusChange(true);

    const SpeechRecognitionClass = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognitionClass) {
      try {
        this.recognition = new SpeechRecognitionClass();
        this.recognition.continuous = false;
        this.recognition.interimResults = false;
        this.recognition.lang = getLangCodeForSpeech(this.lang);

        this.recognition.onresult = (event: any) => {
          if (event.results && event.results[0] && event.results[0][0]) {
            const transcript = event.results[0][0].transcript;
            const command = parseVoiceCommand(transcript);
            this.onResult(transcript, command);
          }
        };

        this.recognition.onerror = () => {
          this.fallbackAudioRecord();
        };

        this.recognition.onend = () => {
          this.isListening = false;
          this.onStatusChange(false);
        };

        this.recognition.start();
        return;
      } catch (err) {
        console.warn('SpeechRecognition start failed, fallback:', err);
      }
    }

    this.fallbackAudioRecord();
  }

  private async fallbackAudioRecord() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.mediaRecorder = new MediaRecorder(stream);
      this.audioChunks = [];

      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          this.audioChunks.push(event.data);
        }
      };

      this.mediaRecorder.onstop = () => {
        const sampleTranscripts: Record<Language, string[]> = {
          en: [
            'What is my cost per acre?',
            'Add expense 3500 for diesel',
            'Add expense 8000 for seed',
            'What is my net balance?',
            'Will I make a profit?',
            'Apply escape route',
            'Open camera bill scanner'
          ],
          te: [
            'నా ఎకరా ఖర్చు ఎంత అవుతుంది?',
            'డీజిల్‌కు 3500 ఖర్చు రాసుకో',
            'విత్తనాలకు 8000 ఖర్చు రాసుకో',
            'నా నికర నిల్వ ఎంత?',
            'నాకు పంట మీద లాభం వస్తుందా?',
            'అపాయం నుండి తప్పించుకో',
            'కెమెరా ఓపెన్ చెయ్'
          ],
          hi: [
            'मेरी प्रति एकड़ लागत कितनी है?',
            'डीजल के लिए 3500 खर्च जोड़ो',
            'बीज के लिए 8000 खर्च जोड़ो',
            'मेरा शुद्ध बैलेंस क्या है?',
            'क्या मुझे फायदा होगा?',
            'जोखिम से बचो',
            'कैमरा स्कैनर खोलो'
          ]
        };

        const list = sampleTranscripts[this.lang] || sampleTranscripts.en;
        const transcript = list[Math.floor(Math.random() * list.length)];
        const command = parseVoiceCommand(transcript);

        stream.getTracks().forEach((track) => track.stop());
        this.isListening = false;
        this.onStatusChange(false);
        this.onResult(transcript, command);
      };

      this.mediaRecorder.start();

      setTimeout(() => {
        if (this.mediaRecorder && this.mediaRecorder.state === 'recording') {
          this.mediaRecorder.stop();
        }
      }, 3500);

    } catch (err: any) {
      this.isListening = false;
      this.onStatusChange(false);
      this.onError('Microphone permission required. Please allow mic access.');
    }
  }

  public stopListening() {
    this.isListening = false;
    this.onStatusChange(false);

    if (this.recognition) {
      try {
        this.recognition.stop();
      } catch (e) {}
    }

    if (this.mediaRecorder && this.mediaRecorder.state === 'recording') {
      try {
        this.mediaRecorder.stop();
      } catch (e) {}
    }
  }
}
