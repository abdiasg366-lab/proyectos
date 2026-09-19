import React, { useState } from 'react';
import { Heart, Sparkles, Send } from 'lucide-react';
import confetti from 'canvas-confetti';
import { romanticAudio } from '../utils/audioSynth';

interface RomanticFooterProps {
  recipientName: string;
  senderName: string;
  specialDate: string;
}

export const RomanticFooter: React.FC<RomanticFooterProps> = ({
  recipientName,
  senderName,
  specialDate,
}) => {
  const [hugSent, setHugSent] = useState(false);

  const handleSendHug = () => {
    setHugSent(true);
    romanticAudio.playChime();
    confetti({
      particleCount: 70,
      spread: 80,
      origin: { y: 0.8 },
      colors: ['#f43f5e', '#ec4899', '#f59e0b', '#fb7185', '#ffe4e6'],
    });

    setTimeout(() => {
      setHugSent(false);
    }, 3000);
  };

  return (
    <footer className="relative mt-20 border-t border-rose-200/60 bg-gradient-to-b from-[#fff9fa] via-rose-50/50 to-rose-100/40 py-16 px-4 text-center">
      <div className="mx-auto max-w-2xl">
        {/* Heart emblem */}
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-rose-600 text-white shadow-md">
          <Heart className="h-7 w-7 fill-white animate-pulse" />
        </div>

        <h3 className="mt-4 font-serif text-2xl sm:text-3xl font-bold text-rose-950">
          Hoy 20 de septiembre y cada uno de los días que vengan
        </h3>

        <p className="mt-2 font-script text-2xl sm:text-3xl text-rose-800">
          &ldquo;El amor no necesita una razón en el calendario, solo necesita ser verdadero.&rdquo;
        </p>

        <p className="mt-4 text-xs sm:text-sm text-stone-600 leading-relaxed max-w-lg mx-auto">
          Gracias por existir, por tu ternura, por tus sonrisas y por hacer que lo cotidiano se sienta extraordinario.
        </p>

        {/* Interactive Virtual Hug Button */}
        <div className="mt-8">
          <button
            onClick={handleSendHug}
            className="inline-flex items-center gap-2 rounded-full bg-rose-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-rose-700 active:scale-95"
          >
            {hugSent ? (
              <>
                <Sparkles className="h-4 w-4 animate-spin text-amber-300" />
                <span>¡Abrazo infinito enviado al corazón de {recipientName}!</span>
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                <span>Enviarte un abrazo apretado ahora mismo</span>
              </>
            )}
          </button>
        </div>

        <div className="mt-12 text-xs text-stone-400">
          <span>Detalle hecho con todo el corazón por </span>
          <strong className="text-stone-700">{senderName}</strong>
          <span> para </span>
          <strong className="text-stone-700">{recipientName}</strong>
          <span className="block mt-1">{specialDate} • Siempre juntos</span>
        </div>
      </div>
    </footer>
  );
};
