import React, { useState } from 'react';
import { Heart, Sparkles, Copy, Check, Quote, Calendar } from 'lucide-react';
import { defaultLetter } from '../data/romanticContent';
import confetti from 'canvas-confetti';

interface LoveLetterProps {
  recipientName: string;
  senderName: string;
  customMessage?: string;
  specialDate: string;
}

export const LoveLetter: React.FC<LoveLetterProps> = ({
  recipientName,
  senderName,
  customMessage,
  specialDate,
}) => {
  const [copied, setCopied] = useState(false);
  const [heartExploded, setHeartExploded] = useState(false);

  const handleCopy = () => {
    const fullText = `Para mi amor ${recipientName}:\n\n${defaultLetter.headline}\n\n${defaultLetter.bodyParagraphs.join('\n\n')}\n\n${customMessage ? `${customMessage}\n\n` : ''}${defaultLetter.quote}\n\nCon todo mi amor,\n${senderName}\n${specialDate}`;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleHeartClick = () => {
    setHeartExploded(true);
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#e11d48', '#fb7185', '#f43f5e', '#ffe4e6'],
    });
    setTimeout(() => setHeartExploded(false), 1200);
  };

  return (
    <section id="carta" className="relative mx-auto max-w-4xl px-4 py-12 sm:px-6">
      {/* Visual background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-rose-200/30 rounded-full blur-3xl pointer-events-none" />

      {/* Date banner */}
      <div className="mb-6 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-4 py-1.5 text-xs font-semibold text-rose-800">
          <Calendar className="h-3.5 w-3.5 text-rose-500" />
          <span>{specialDate}</span>
          <span className="text-rose-300">•</span>
          <span>Un detalle sin necesidad de motivo</span>
        </div>
        <h1 className="mt-4 font-serif text-3xl font-bold tracking-tight text-rose-950 sm:text-4xl md:text-5xl">
          Para la persona que ilumina mi vida
        </h1>
        <p className="mt-2 max-w-xl text-sm sm:text-base text-stone-600">
          Hoy 20 de septiembre no viene marcado con fiestas oficiales... y es justo por eso que se siente tan sincero decirte lo mucho que te amo.
        </p>
      </div>

      {/* Main Parchment Letter Card */}
      <div className="relative overflow-hidden rounded-2xl border border-stone-200/80 bg-[#fffdfa] p-6 sm:p-10 md:p-12 shadow-xl">
        {/* Decorative corner ribbons/stamps */}
        <div className="absolute top-0 right-0 h-24 w-24 overflow-hidden pointer-events-none">
          <div className="absolute top-4 -right-10 w-36 rotate-45 bg-rose-500 py-1 text-center text-[10px] font-bold tracking-wider text-white shadow-xs uppercase">
            20 SEP ♥
          </div>
        </div>

        {/* Vintage Postmark stamp */}
        <div className="mb-8 flex items-center justify-between border-b border-rose-100 pb-6">
          <div>
            <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-[11px] font-semibold text-rose-700">
              <span>🎮 Jugando Roblox Juntos</span>
              <span className="text-rose-300">•</span>
              <span>Amor a Distancia</span>
            </div>
            <span className="block font-script text-3xl font-bold text-rose-800 sm:text-4xl">
              Mi adorada {recipientName},
            </span>
            <p className="mt-1 text-xs text-stone-500">
              Escrito con todo mi cariño desde la distancia para este 20 de septiembre
            </p>
          </div>

          <button
            onClick={handleHeartClick}
            title="Enviar amor"
            className={`flex h-12 w-12 items-center justify-center rounded-full border border-rose-200 bg-rose-50/80 text-rose-600 transition hover:scale-110 active:scale-95 ${
              heartExploded ? 'bg-rose-500 text-white' : ''
            }`}
          >
            <Heart className={`h-6 w-6 fill-current transition-transform duration-300 ${heartExploded ? 'scale-125' : ''}`} />
          </button>
        </div>

        {/* Poetic quote box */}
        <div className="mb-8 rounded-xl border-l-4 border-rose-400 bg-rose-50/50 p-4 text-rose-900">
          <div className="flex gap-2">
            <Quote className="h-5 w-5 shrink-0 text-rose-400" />
            <p className="font-serif text-sm sm:text-base italic leading-relaxed">
              {defaultLetter.quote}
            </p>
          </div>
        </div>

        {/* Letter Body */}
        <div className="space-y-4 text-stone-700 leading-relaxed font-sans text-base sm:text-lg">
          {defaultLetter.bodyParagraphs.map((para, idx) => (
            <p key={idx} className="text-justify sm:text-left">
              {para}
            </p>
          ))}

          {/* User's custom personal message if configured */}
          {customMessage && (
            <div className="my-6 rounded-xl border border-rose-200 bg-rose-50/60 p-4 sm:p-5">
              <span className="text-xs font-semibold uppercase tracking-wider text-rose-700">
                Mensaje especial para ti:
              </span>
              <p className="mt-2 font-script text-2xl sm:text-3xl text-rose-950">
                &ldquo;{customMessage}&rdquo;
              </p>
            </div>
          )}
        </div>

        {/* Sign-off & signature */}
        <div className="mt-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-t border-rose-100 pt-8">
          <div>
            <span className="text-xs font-medium text-stone-500 uppercase tracking-widest">
              Siempre tuyo,
            </span>
            <div className="mt-1 font-script text-3xl sm:text-4xl font-bold text-rose-900">
              {senderName}
            </div>
            <span className="text-xs text-stone-400">
              {specialDate} • Con amor infinito
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="btn-copy-letter"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 rounded-full border border-rose-200 bg-white px-4 py-2 text-xs font-semibold text-rose-800 shadow-2xs transition hover:bg-rose-50 active:scale-95"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                  <span>¡Carta copiada!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5 text-rose-500" />
                  <span>Copiar texto de la carta</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
