import React, { useState } from 'react';
import { Sparkles, Heart, Check, Unlock, Eye } from 'lucide-react';
import { twentyReasons } from '../data/romanticContent';
import { ReasonItem } from '../types';
import confetti from 'canvas-confetti';
import { romanticAudio } from '../utils/audioSynth';

export const TwentyReasons: React.FC = () => {
  const [unlockedIds, setUnlockedIds] = useState<number[]>([1, 2]); // First 2 already peeked
  const [activeCategory, setActiveCategory] = useState<string>('todas');

  const categories = [
    { key: 'todas', label: 'Todas las 10' },
    { key: 'detalles', label: 'Tus detalles' },
    { key: 'personalidad', label: 'Tu personalidad' },
    { key: 'momentos', label: 'Momentos juntos' },
    { key: 'futuro', label: 'Nuestro futuro' },
  ];

  const filteredReasons = activeCategory === 'todas'
    ? twentyReasons
    : twentyReasons.filter((r) => r.category === activeCategory);

  const handleUnlock = (id: number) => {
    if (!unlockedIds.includes(id)) {
      setUnlockedIds((prev) => [...prev, id]);
      romanticAudio.playTone(392 + (id * 30), 0.5, 0.08);

      if (unlockedIds.length + 1 === twentyReasons.length) {
        // Unlocked all 10!
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#f43f5e', '#ec4899', '#f59e0b', '#fbbf24'],
        });
      }
    }
  };

  const handleUnlockAll = () => {
    setUnlockedIds(twentyReasons.map((r) => r.id));
    romanticAudio.playChime();
    confetti({
      particleCount: 90,
      spread: 90,
      origin: { y: 0.6 },
    });
  };

  const progressPercent = Math.round((unlockedIds.length / twentyReasons.length) * 100);

  return (
    <section id="10-razones" className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="text-center">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-rose-100/70 px-3 py-1 text-xs font-semibold text-rose-800">
          <Sparkles className="h-3.5 w-3.5 text-rose-600" />
          <span>Especial 20 de Septiembre</span>
        </div>
        <h2 className="mt-3 font-serif text-3xl font-bold text-rose-950 sm:text-4xl">
          10 Razones por las que te Amo
        </h2>
        <p className="mt-2 text-sm text-stone-600 max-w-xl mx-auto">
          Porque siempre tienes tiempo para mí y haces que cada día a tu lado sea especial, aquí tienes 10 cosas que hacen que amarte sea lo más fácil y hermoso del mundo.
        </p>

        {/* Unlocked counter progress bar */}
        <div className="mt-6 mx-auto max-w-xs sm:max-w-md">
          <div className="flex items-center justify-between text-xs font-medium text-stone-600 mb-1.5">
            <span>Has descubierto: <strong className="text-rose-600 font-bold">{unlockedIds.length}</strong> de {twentyReasons.length} razones</span>
            <span>{progressPercent}%</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-rose-100">
            <div
              className="h-full rounded-full bg-gradient-to-r from-rose-500 to-amber-400 transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          {unlockedIds.length < twentyReasons.length && (
            <button
              onClick={handleUnlockAll}
              className="mt-2.5 text-xs text-rose-600 underline-offset-2 hover:underline font-medium"
            >
              Revelar todas con amor ✨
            </button>
          )}
        </div>
      </div>

      {/* Category filters */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
              activeCategory === cat.key
                ? 'bg-rose-600 text-white shadow-xs'
                : 'bg-white border border-stone-200 text-stone-600 hover:bg-rose-50'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Reasons Grid */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {filteredReasons.map((reason) => {
          const isUnlocked = unlockedIds.includes(reason.id);

          return (
            <div
              key={reason.id}
              onClick={() => handleUnlock(reason.id)}
              className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border p-5 transition-all duration-300 cursor-pointer ${
                isUnlocked
                  ? 'border-rose-200/90 bg-white shadow-sm hover:shadow-md hover:border-rose-300'
                  : 'border-dashed border-rose-200 bg-rose-50/40 hover:bg-rose-50/80'
              }`}
            >
              {/* Header inside card */}
              <div className="flex items-center justify-between">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-rose-100 text-xs font-bold text-rose-700">
                  #{reason.id}
                </span>

                <span
                  className={`text-xs ${
                    isUnlocked ? 'text-rose-400' : 'text-stone-400'
                  }`}
                >
                  {isUnlocked ? (
                    <Check className="h-4 w-4 text-emerald-500" />
                  ) : (
                    <Unlock className="h-4 w-4 text-rose-400 group-hover:scale-110 transition" />
                  )}
                </span>
              </div>

              {/* Card Content */}
              <div className="my-3">
                {isUnlocked ? (
                  <>
                    <h4 className="font-serif text-sm font-bold text-rose-950">
                      {reason.title}
                    </h4>
                    <p className="mt-2 text-xs leading-relaxed text-stone-600">
                      {reason.description}
                    </p>
                  </>
                ) : (
                  <div className="py-4 text-center">
                    <Heart className="mx-auto h-6 w-6 text-rose-300 group-hover:scale-110 transition animate-pulse" />
                    <p className="mt-2 text-xs font-medium text-stone-500">
                      Toca para revelar razón #{reason.id}
                    </p>
                  </div>
                )}
              </div>

              {/* Footer badge */}
              <div className="border-t border-stone-100 pt-2 flex items-center justify-between text-[10px] text-stone-400">
                <span className="capitalize">{reason.category}</span>
                <span className="text-rose-400">20 Sept ♥</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
