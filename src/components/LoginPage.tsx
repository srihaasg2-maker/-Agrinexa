import React, { useState } from 'react';
import { Sprout, User, MapPin, Phone, ShieldCheck, ArrowRight, Camera, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export interface FarmerProfile {
  name: string;
  mobile: string;
  village: string;
  farmType: string;
  photoUrl: string;
}

interface LoginPageProps {
  onLoginSuccess: (profile: FarmerProfile) => void;
  onBackToLanding: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess, onBackToLanding }) => {
  const { t } = useLanguage();

  const [name, setName] = useState('Ramesh Reddy');
  const [mobile, setMobile] = useState('9876543210');
  const [village, setVillage] = useState('Warangal, Telangana');
  const [farmType, setFarmType] = useState('Paddy & Cotton');
  
  // Preset Farmer Avatar photos
  const avatarPresets = [
    { id: '1', name: 'Farmer 1', url: 'https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?w=150&auto=format&fit=crop&q=80', emoji: '👨‍🌾' },
    { id: '2', name: 'Farmer 2', url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80', emoji: '👩‍🌾' },
    { id: '3', name: 'Farmer 3', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', emoji: '🤠' },
  ];

  const [selectedPhoto, setSelectedPhoto] = useState(avatarPresets[0].url);

  const handleCustomPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setSelectedPhoto(event.target.result as string);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const profile: FarmerProfile = {
      name: name.trim(),
      mobile: mobile.trim(),
      village: village.trim() || 'India',
      farmType,
      photoUrl: selectedPhoto,
    };

    onLoginSuccess(profile);
  };

  return (
    <div className="min-h-screen bg-farm-tan flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border-4 border-farm-green space-y-6 text-left relative animate-fade-in">
        
        {/* Back Button */}
        <button
          onClick={onBackToLanding}
          className="text-xs font-bold text-stone-500 hover:text-stone-900 underline mb-2 inline-block"
        >
          ← Return to Website
        </button>

        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-farm-green text-farm-accent flex items-center justify-center shadow">
            <Sprout className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-stone-900 leading-tight">Farmer Login</h1>
            <p className="text-xs font-bold text-farm-dark">Enter details to access your farm dashboard</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Photo Selector / Upload */}
          <div className="space-y-2 text-center">
            <label className="block text-xs font-extrabold uppercase tracking-wider text-stone-700">
              Select or Upload Farmer Profile Photo
            </label>

            <div className="flex items-center justify-center gap-4">
              <div className="relative">
                <img
                  src={selectedPhoto}
                  alt="Farmer Profile"
                  className="w-20 h-20 rounded-full object-cover border-4 border-farm-green shadow-md"
                />
                <label className="absolute bottom-0 right-0 p-1.5 bg-farm-accent text-stone-900 rounded-full cursor-pointer shadow hover:scale-110 transition-transform">
                  <Camera className="w-4 h-4" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleCustomPhotoUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Avatar Preset Buttons */}
              <div className="flex gap-2">
                {avatarPresets.map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => setSelectedPhoto(preset.url)}
                    className={`w-10 h-10 rounded-full overflow-hidden border-2 transition-all ${
                      selectedPhoto === preset.url ? 'border-farm-green ring-2 ring-farm-green' : 'border-stone-300 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={preset.url} alt={preset.name} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Farmer Name */}
          <div className="space-y-1">
            <label className="block text-xs font-extrabold text-stone-900 uppercase">
              Farmer Name
            </label>
            <div className="relative flex items-center">
              <User className="w-5 h-5 text-stone-400 absolute left-3" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Ramesh Reddy"
                className="w-full bg-stone-50 border-2 border-stone-300 rounded-xl pl-10 pr-4 py-3 text-stone-900 font-bold focus:outline-none focus:border-farm-green"
              />
            </div>
          </div>

          {/* Village / Location */}
          <div className="space-y-1">
            <label className="block text-xs font-extrabold text-stone-900 uppercase">
              Village / District
            </label>
            <div className="relative flex items-center">
              <MapPin className="w-5 h-5 text-stone-400 absolute left-3" />
              <input
                type="text"
                required
                value={village}
                onChange={(e) => setVillage(e.target.value)}
                placeholder="e.g. Warangal, Telangana"
                className="w-full bg-stone-50 border-2 border-stone-300 rounded-xl pl-10 pr-4 py-3 text-stone-900 font-bold focus:outline-none focus:border-farm-green"
              />
            </div>
          </div>

          {/* Mobile Number */}
          <div className="space-y-1">
            <label className="block text-xs font-extrabold text-stone-900 uppercase">
              10-Digit Mobile Number
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3 font-bold text-stone-500">+91</span>
              <input
                type="tel"
                required
                pattern="[0-9]{10}"
                maxLength={10}
                value={mobile}
                onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
                className="w-full bg-stone-50 border-2 border-stone-300 rounded-xl pl-12 pr-4 py-3 text-stone-900 font-bold focus:outline-none focus:border-farm-green"
              />
            </div>
          </div>

          {/* Crop Type */}
          <div className="space-y-1">
            <label className="block text-xs font-extrabold text-stone-900 uppercase">
              Primary Crop / Livestock
            </label>
            <select
              value={farmType}
              onChange={(e) => setFarmType(e.target.value)}
              className="w-full bg-stone-50 border-2 border-stone-300 rounded-xl px-4 py-3 text-stone-900 font-bold focus:outline-none focus:border-farm-green"
            >
              <option value="Paddy & Cotton">🌾 Paddy & Cotton</option>
              <option value="Wheat & Sugarcane">🌽 Wheat & Sugarcane</option>
              <option value="Dairy & Cattle">🐄 Dairy & Cattle</option>
              <option value="Spices & Vegetables">🌶️ Spices & Vegetables</option>
            </select>
          </div>

          {/* Login Submit Button */}
          <button
            type="submit"
            className="w-full bg-farm-green hover:bg-farm-dark text-white font-extrabold text-lg py-4 rounded-xl shadow-lifted transition-all flex items-center justify-center gap-2 active:scale-98"
          >
            <span>Welcome & Enter Dashboard</span>
            <ArrowRight className="w-5 h-5 text-farm-accent" />
          </button>

        </form>

        <p className="text-center text-xs text-stone-500 font-medium flex items-center justify-center gap-1">
          <ShieldCheck className="w-4 h-4 text-farm-green" />
          <span>100% Free Forever • Zero Charges</span>
        </p>

      </div>
    </div>
  );
};
