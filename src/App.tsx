import React, { useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ValueCardsSection } from './components/ValueCardsSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { FeaturesSection } from './components/FeaturesSection';
import { TrustStripSection } from './components/TrustStripSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { Footer } from './components/Footer';
import { InteractiveDemoModal } from './components/InteractiveDemoModal';
import { FarmAppDashboard } from './components/FarmAppDashboard';
import { LoginPage, FarmerProfile } from './components/LoginPage';

function MainContent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'landing' | 'login' | 'app'>('landing');

  // Active Farmer Profile State
  const [farmerProfile, setFarmerProfile] = useState<FarmerProfile>({
    name: 'Ramesh Reddy',
    mobile: '9876543210',
    village: 'Warangal, Telangana',
    farmType: 'Paddy & Cotton',
    photoUrl: 'https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?w=150&auto=format&fit=crop&q=80',
  });

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleLaunchWebApp = () => setViewMode('app');
  const handleGoToLogin = () => {
    setIsModalOpen(false);
    setViewMode('login');
  };

  const handleLoginSuccess = (profile: FarmerProfile) => {
    setFarmerProfile(profile);
    setViewMode('app');
  };

  const handleLogout = () => {
    setViewMode('login');
  };

  const handleBackToLanding = () => {
    setViewMode('landing');
  };

  if (viewMode === 'login') {
    return <LoginPage onLoginSuccess={handleLoginSuccess} onBackToLanding={handleBackToLanding} />;
  }

  if (viewMode === 'app') {
    return (
      <FarmAppDashboard
        profile={farmerProfile}
        onLogout={handleLogout}
        onBackToLanding={handleBackToLanding}
      />
    );
  }

  return (
    <div className="min-h-screen bg-farm-tan text-stone-900 font-sans antialiased selection:bg-farm-light selection:text-farm-dark">
      
      {/* Navigation */}
      <Navbar onOpenModal={handleOpenModal} />

      {/* Main Content */}
      <main>
        {/* 1. Hero Section */}
        <HeroSection onOpenModal={handleOpenModal} />

        {/* 2. What This Does For You Section */}
        <ValueCardsSection />

        {/* 3. How It Works Section */}
        <HowItWorksSection />

        {/* 4. Features Section */}
        <FeaturesSection onOpenModal={handleOpenModal} />

        {/* 5. Trust & Security Strip */}
        <TrustStripSection />

        {/* 6. Farmer Testimonials */}
        <TestimonialsSection />
      </main>

      {/* 7. Footer & Final CTA */}
      <Footer onOpenModal={handleOpenModal} />

      {/* Interactive Signup / App Launcher Modal */}
      <InteractiveDemoModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        onLaunchWebApp={handleGoToLogin}
      />

    </div>
  );
}

export function App() {
  return (
    <LanguageProvider>
      <MainContent />
    </LanguageProvider>
  );
}

export default App;
