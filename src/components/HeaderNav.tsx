import React, { useState } from 'react';
import { Volume2, VolumeX, Heart, Settings, Sparkles } from 'lucide-react';
import { romanticAudio } from '../utils/audioSynth';

interface HeaderNavProps {
  onOpenCustomize: () => void;
  onReopenEnvelope: () => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  onOpenCustomize,
  onReopenEnvelope,
}) => {
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  const toggleMusic = () => {
    const status = romanticAudio.toggle();
    setIsPlayingMusic(status);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-rose-100/80 bg-[#fff9fa]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Brand / Date identifier */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onReopenEnvelope}
            title="Ver sobre de nuevo"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-rose-100 text-rose-600 transition hover:bg-rose-200 hover:scale-105"
          >
            <Heart className="h-4.5 w-4.5 fill-rose-500 text-rose-500" />
          </button>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-serif text-sm font-bold tracking-tight text-rose-950 sm:text-base">
                20 de Septiembre
              </span>
              <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-800">
                Solo porque sí ♥
              </span>
            </div>
            <p className="text-[11px] text-stone-500 hidden sm:block">
              Cualquier día es perfecto para recordarte cuánto te amo
            </p>
          </div>
        </div>

        {/* Quick Nav Anchors & Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          <nav className="hidden md:flex items-center gap-1 text-xs font-medium text-stone-600">
            <a
              href="#carta"
              className="rounded-lg px-3 py-1.5 transition hover:bg-rose-50 hover:text-rose-900"
            >
              Carta
            </a>
            <a
              href="#momentos"
              className="rounded-lg px-3 py-1.5 transition hover:bg-rose-50 hover:text-rose-900"
            >
              Fotos
            </a>
            <a
              href="#cupones"
              className="rounded-lg px-3 py-1.5 transition hover:bg-rose-50 hover:text-rose-900"
            >
              Vales & Robux
            </a>
            <a
              href="#flores"
              className="rounded-lg px-3 py-1.5 transition hover:bg-rose-50 hover:text-rose-900"
            >
              Flores
            </a>
            <a
              href="#10-razones"
              className="rounded-lg px-3 py-1.5 transition hover:bg-rose-50 hover:text-rose-900"
            >
              10 Razones
            </a>
          </nav>

          {/* Music box sound toggle */}
          <button
            id="btn-toggle-music"
            onClick={toggleMusic}
            title={isPlayingMusic ? 'Pausar melodía' : 'Reproducir melodía de cajita musical'}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition ${
              isPlayingMusic
                ? 'bg-rose-600 text-white shadow-sm ring-2 ring-rose-300'
                : 'bg-rose-50 text-rose-800 hover:bg-rose-100'
            }`}
          >
            {isPlayingMusic ? (
              <>
                <Volume2 className="h-3.5 w-3.5 animate-pulse" />
                <span className="hidden sm:inline">Música On</span>
              </>
            ) : (
              <>
                <VolumeX className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Música</span>
              </>
            )}
          </button>

          {/* Customize Button */}
          <button
            id="btn-customize-names"
            onClick={onOpenCustomize}
            className="flex items-center gap-1 rounded-full border border-rose-200 bg-white px-3 py-1.5 text-xs font-semibold text-rose-900 shadow-2xs transition hover:border-rose-300 hover:bg-rose-50"
            title="Personalizar nombres y mensaje"
          >
            <Settings className="h-3.5 w-3.5 text-rose-500" />
            <span className="hidden sm:inline">Personalizar</span>
          </button>
        </div>
      </div>
    </header>
  );
};
