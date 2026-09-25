import React, { useState } from 'react';
import { X, CheckCircle2, ArrowRight, Sprout, PhoneCall, ShieldCheck, Gift, Download, Play } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface InteractiveDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLaunchWebApp: () => void;
}

export const InteractiveDemoModal: React.FC<InteractiveDemoModalProps> = ({ isOpen, onClose, onLaunchWebApp }) => {
  const { t } = useLanguage();
  const [farmType, setFarmType] = useState<string>('crops');
  const [mobileNumber, setMobileNumber] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);

  if (!isOpen) return null;

  const triggerDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([
      "AgriFinance AI Mobile App Installer (Free Edition)\nVersion: 1.0.0-IN\n100% Free for Farmers\nFeatures: Offline Receipt OCR, Rupee Calculator, Multilingual AI Chat."
    ], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = "AgriFinance_AI_v1.0_Free.apk";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    triggerDownload();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setMobileNumber('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border-4 border-farm-green relative">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-stone-100 text-stone-600 hover:bg-stone-200 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-6 h-6" />
        </button>

        {!submitted ? (
          <div className="space-y-6 text-left">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-farm-green text-farm-accent flex items-center justify-center shadow">
                <Sprout className="w-7 h-7" />
              </div>
              <div>
                <div className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 text-[10px] font-black px-2 py-0.5 rounded-full mb-1">
                  <Gift className="w-3 h-3" /> 100% FREE FOREVER FOR FARMERS
                </div>
                <h3 className="text-2xl font-black text-stone-900 leading-tight">{t.modal.title}</h3>
                <p className="text-xs font-bold text-farm-dark">{t.modal.subtitle}</p>
              </div>
            </div>

            {/* Instant Launch Action Button */}
            <div className="bg-farm-pale border-2 border-farm-medium/30 p-4 rounded-2xl text-stone-900 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase text-farm-green">Instant Web Access</span>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">NO INSTALL NEEDED</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onLaunchWebApp();
                }}
                className="w-full bg-farm-green hover:bg-farm-dark text-white font-extrabold py-3.5 px-4 rounded-xl shadow transition-all flex items-center justify-center gap-2 text-base active:scale-95"
              >
                <Play className="w-5 h-5 text-farm-accent fill-farm-accent" />
                <span>Launch App Instantly in Browser</span>
              </button>
            </div>

            <div className="relative text-center">
              <span className="bg-white px-3 text-xs font-bold text-stone-400 uppercase">OR GET MOBILE APP LINK</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Question 1: Farm Type */}
              <div className="space-y-2">
                <label className="block text-sm font-extrabold text-stone-900">
                  1. What do you farm?
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'crops', label: t.modal.c1, desc: t.modal.c1Desc },
                    { id: 'livestock', label: t.modal.c2, desc: t.modal.c2Desc },
                    { id: 'both', label: t.modal.c3, desc: t.modal.c3Desc },
                  ].map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setFarmType(option.id)}
                      className={`p-2.5 rounded-xl border-2 text-center transition-all ${
                        farmType === option.id
                          ? 'bg-farm-pale border-farm-green ring-2 ring-farm-green/30 text-stone-900 font-extrabold'
                          : 'bg-stone-50 border-stone-200 text-stone-700 font-medium hover:border-stone-400'
                      }`}
                    >
                      <div className="text-sm font-bold">{option.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Question 2: Mobile Number */}
              <div className="space-y-2">
                <label className="block text-sm font-extrabold text-stone-900">
                  2. Enter 10-digit Mobile Number for SMS Link:
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-4 text-stone-500 font-bold text-base">+91</span>
                  <input
                    type="tel"
                    required
                    pattern="[0-9]{10}"
                    maxLength={10}
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                    placeholder="9876543210"
                    className="w-full bg-stone-50 border-2 border-stone-300 rounded-xl pl-14 pr-4 py-3 text-stone-900 text-base font-bold tracking-wider focus:outline-none focus:border-farm-green focus:bg-white"
                  />
                </div>
                <p className="text-[11px] text-stone-600 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-farm-green shrink-0" />
                  <span>{t.modal.privacyNote}</span>
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-stone-900 hover:bg-black text-white text-base font-extrabold py-4 rounded-xl shadow transition-all flex items-center justify-center gap-2 active:scale-98"
              >
                <Download className="w-5 h-5 text-farm-accent" />
                <span>Get SMS Link & Download Mobile APK</span>
              </button>

            </form>

            <div className="pt-2 border-t border-stone-200 text-center">
              <a
                href="tel:18001233276"
                className="inline-flex items-center gap-2 text-xs font-extrabold text-farm-dark hover:text-farm-green"
              >
                <PhoneCall className="w-3.5 h-3.5 text-farm-green" />
                <span>{t.modal.callNote}</span>
              </a>
            </div>
          </div>
        ) : (
          <div className="py-4 text-center space-y-4 animate-fade-in">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h3 className="text-2xl font-black text-stone-900">{t.modal.successTitle}</h3>
            <p className="text-sm text-stone-700 font-medium">
              Mobile installer downloaded & SMS link sent to <strong className="text-stone-900">+91 {mobileNumber}</strong>.
            </p>

            <div className="pt-2 space-y-2">
              <button
                onClick={() => {
                  onClose();
                  onLaunchWebApp();
                }}
                className="w-full bg-farm-green hover:bg-farm-dark text-white font-extrabold py-4 rounded-xl shadow transition-all flex items-center justify-center gap-2 text-base"
              >
                <Play className="w-5 h-5 text-farm-accent fill-farm-accent" />
                <span>Open AgriFinance AI App Now</span>
              </button>

              <button
                onClick={handleReset}
                className="w-full bg-stone-100 text-stone-700 font-bold py-3 rounded-xl hover:bg-stone-200 transition-all text-sm"
              >
                {t.modal.doneBtn}
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
