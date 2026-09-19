import React, { useState, useEffect } from 'react';
import { EnvelopeIntro } from './components/EnvelopeIntro';
import { FloatingPetals } from './components/FloatingPetals';
import { HeaderNav } from './components/HeaderNav';
import { LoveLetter } from './components/LoveLetter';
import { VirtualBouquet } from './components/VirtualBouquet';
import { TwentyReasons } from './components/TwentyReasons';
import { RomanticMoments } from './components/RomanticMoments';
import { LoveCoupons } from './components/LoveCoupons';
import { RomanticFooter } from './components/RomanticFooter';
import { CustomizeModal } from './components/CustomizeModal';
import { CoupleConfig } from './types';

const defaultCoupleConfig: CoupleConfig = {
  recipientName: 'Nashalie',
  senderName: 'Abdias',
  customMessage: 'Para mi reina Nashalie en este 20 de septiembre. Te amo con toda mi alma.',
  specialDate: '20 de Septiembre',
};

export default function App() {
  const [config, setConfig] = useState<CoupleConfig>(() => {
    // Check URL query parameters first (e.g. ?para=Camila&de=Mateo)
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const toParam = urlParams.get('para') || urlParams.get('to');
      const fromParam = urlParams.get('de') || urlParams.get('from');
      const msgParam = urlParams.get('msg') || urlParams.get('mensaje');

      if (toParam || fromParam || msgParam) {
        return {
          recipientName: toParam || defaultCoupleConfig.recipientName,
          senderName: fromParam || defaultCoupleConfig.senderName,
          customMessage: msgParam || '',
          specialDate: '20 de Septiembre',
        };
      }

      // Check localStorage next
      try {
        const saved = localStorage.getItem('romantic_couple_config_sept20');
        if (saved) return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return defaultCoupleConfig;
  });

  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);

  const handleSaveConfig = (newConfig: CoupleConfig) => {
    setConfig(newConfig);
    try {
      localStorage.setItem('romantic_couple_config_sept20', JSON.stringify(newConfig));
    } catch {
      // ignore
    }
  };

  return (
    <div className="relative min-h-screen bg-[#fff9fa] text-stone-800 font-sans selection:bg-rose-200 selection:text-rose-900">
      {/* Floating Petals and Hearts Background */}
      <FloatingPetals />

      {/* Intro Envelope Screen (shows first before letter opens) */}
      {!envelopeOpen && (
        <EnvelopeIntro
          recipientName={config.recipientName}
          senderName={config.senderName}
          onOpen={() => setEnvelopeOpen(true)}
        />
      )}

      {/* Main Experience content */}
      <div className={`transition-opacity duration-700 ${envelopeOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <HeaderNav
          onOpenCustomize={() => setIsCustomizeOpen(true)}
          onReopenEnvelope={() => setEnvelopeOpen(false)}
        />

        <main className="relative z-10">
          {/* Main Love Letter */}
          <LoveLetter
            recipientName={config.recipientName}
            senderName={config.senderName}
            customMessage={config.customMessage}
            specialDate={config.specialDate}
          />

          {/* Romantic Moments / Carousel of Nashalie & Abdias right after the letter */}
          <RomanticMoments
            recipientName={config.recipientName}
            senderName={config.senderName}
          />

          {/* 5 Vales de Amor a Distancia & Roblox */}
          <LoveCoupons />

          {/* Interactive Virtual Bouquet / Yellow & Rose Flowers */}
          <VirtualBouquet />

          {/* 20 Reasons on September 20th */}
          <TwentyReasons />
        </main>

        {/* Romantic Footer & Virtual Hug */}
        <RomanticFooter
          recipientName={config.recipientName}
          senderName={config.senderName}
          specialDate={config.specialDate}
        />
      </div>

      {/* Customize Modal */}
      <CustomizeModal
        config={config}
        isOpen={isCustomizeOpen}
        onClose={() => setIsCustomizeOpen(false)}
        onSave={handleSaveConfig}
      />
    </div>
  );
}
