import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, MailOpen } from 'lucide-react';
import { romanticAudio } from '../utils/audioSynth';

interface EnvelopeIntroProps {
  recipientName: string;
  senderName: string;
  onOpen: () => void;
}

export const EnvelopeIntro: React.FC<EnvelopeIntroProps> = ({
  recipientName,
  senderName,
  onOpen,
}) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    if (isOpening) return;
    setIsOpening(true);
    romanticAudio.playChime();

    // Trigger sweet confetti burst of hearts and warm colors
    confetti({
      particleCount: 75,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f43f5e', '#fb7185', '#f59e0b', '#fbbf24', '#fda4af'],
    });

    setTimeout(() => {
      onOpen();
    }, 700);
  };

  return (
    <div
      id="envelope-screen"
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-rose-950 via-stone-900 to-rose-900 p-4"
    >
      <div className="w-full max-w-md text-center">
        {/* Top date badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-rose-400/30 bg-rose-950/60 px-4 py-1.5 text-xs tracking-widest text-rose-200 uppercase backdrop-blur-sm">
          <Sparkles className="h-3.5 w-3.5 text-amber-300" />
          <span>20 de Septiembre</span>
          <span className="text-rose-400">•</span>
          <span>Un Detalle Especial</span>
        </div>

        {/* Envelope card */}
        <div
          onClick={handleOpen}
          className={`group relative mx-auto cursor-pointer transition-all duration-500 hover:scale-[1.02] ${
            isOpening ? 'scale-95 opacity-0' : 'opacity-100'
          }`}
        >
          {/* Subtle back envelope glow */}
          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-rose-500/20 via-amber-400/20 to-rose-500/20 blur-xl transition-all group-hover:from-rose-500/35 group-hover:to-amber-400/35" />

          <div className="relative overflow-hidden rounded-2xl border border-rose-200/20 bg-[#fffbf7] p-8 shadow-2xl transition-all">
            {/* Vintage postage stamp */}
            <div className="absolute top-4 right-4 flex h-14 w-12 flex-col items-center justify-center rounded border border-dashed border-rose-400 bg-rose-50 p-1 shadow-sm">
              <span className="text-[9px] font-semibold tracking-wider text-rose-500 uppercase">20 SEP</span>
              <Heart className="h-4 w-4 fill-rose-500 text-rose-500" />
              <span className="text-[7px] text-rose-400">AMOR</span>
            </div>

            {/* Postmark stamp */}
            <div className="absolute top-6 right-16 rotate-[-12deg] rounded-full border border-rose-300/60 px-2 py-0.5 text-[8px] tracking-wider text-rose-400 uppercase">
              Para ti ♥
            </div>

            <div className="pt-4 pb-2">
              <span className="text-xs font-medium tracking-wider text-stone-500 uppercase">
                Correspondencia con amor
              </span>
              <h2 className="mt-2 font-script text-4xl font-bold text-rose-900 md:text-5xl">
                Para: {recipientName}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-stone-600">
                &ldquo;Hoy 20 de septiembre no se celebra nada oficial... y precisamente por eso quiero darte este detalle.&rdquo;
              </p>
            </div>

            {/* Wax seal button */}
            <div className="mt-8 flex flex-col items-center justify-center gap-3">
              <button
                id="btn-open-envelope"
                type="button"
                className="wax-seal-shadow relative flex h-18 w-18 items-center justify-center rounded-full bg-gradient-to-tr from-rose-700 via-rose-600 to-red-500 text-white transition-all duration-300 group-hover:scale-110"
                aria-label="Abrir carta"
              >
                <Heart className="h-8 w-8 fill-rose-100 text-rose-100 animate-pulse" />
                <span className="absolute -bottom-1 rounded-full bg-amber-300 px-1.5 py-0.5 text-[9px] font-bold text-rose-950">
                  ABRIR
                </span>
              </button>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-rose-800">
                <MailOpen className="h-4 w-4" />
                <span>Haz clic en el sello para abrir</span>
              </div>
            </div>

            <div className="mt-6 border-t border-rose-100 pt-3 text-[11px] text-stone-400">
              De parte de: <span className="font-medium text-stone-700">{senderName}</span>
            </div>
          </div>
        </div>

        <p className="mt-6 text-xs text-rose-300/80">
          Toca la carta para comenzar esta sorpresa preparada para ti ✨
        </p>
      </div>
    </div>
  );
};
