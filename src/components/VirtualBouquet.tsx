import React, { useState } from 'react';
import { Sparkles, Heart, Flower2, Check } from 'lucide-react';
import { flowersCollection } from '../data/romanticContent';
import { FlowerNote } from '../types';
import confetti from 'canvas-confetti';
import { romanticAudio } from '../utils/audioSynth';

export const VirtualBouquet: React.FC = () => {
  const [selectedFlower, setSelectedFlower] = useState<FlowerNote>(flowersCollection[1]); // yellow flower by default
  const [collectedCount, setCollectedCount] = useState<number[]>([1]);

  const handleSelectFlower = (flower: FlowerNote) => {
    setSelectedFlower(flower);
    romanticAudio.playTone(523.25 + flower.id * 50, 0.7, 0.1);

    if (!collectedCount.includes(flower.id)) {
      setCollectedCount((prev) => [...prev, flower.id]);
    }

    confetti({
      particleCount: 30,
      spread: 50,
      origin: { y: 0.6 },
      colors: ['#f59e0b', '#fbbf24', '#f43f5e', '#fb7185'],
    });
  };

  const handleSendAllFlowers = () => {
    romanticAudio.playChime();
    setCollectedCount(flowersCollection.map((f) => f.id));
    confetti({
      particleCount: 80,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#f59e0b', '#f43f5e', '#fb7185', '#ec4899', '#fbbf24'],
    });
  };

  return (
    <section id="flores" className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <div className="text-center">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-800 border border-amber-200">
          <Flower2 className="h-3.5 w-3.5 text-amber-600" />
          <span>Flores que nunca se marchitan</span>
        </div>
        <h2 className="mt-3 font-serif text-3xl font-bold text-rose-950 sm:text-4xl">
          Un Ramillete de Detalles para Ti
        </h2>
        <p className="mt-2 text-sm text-stone-600 max-w-lg mx-auto">
          En septiembre las flores tienen magia. Toca cada flor para abrir un mensaje especial que florece solo para ti.
        </p>
      </div>

      {/* Flower selector buttons */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        {flowersCollection.map((flower) => {
          const isSelected = selectedFlower.id === flower.id;
          const isCollected = collectedCount.includes(flower.id);

          return (
            <button
              key={flower.id}
              onClick={() => handleSelectFlower(flower)}
              className={`group flex items-center gap-2 rounded-full border px-4 py-2 text-xs sm:text-sm font-semibold transition-all ${
                isSelected
                  ? 'border-rose-400 bg-rose-500 text-white shadow-md scale-105'
                  : 'border-stone-200 bg-white text-stone-700 hover:border-rose-300 hover:bg-rose-50/50'
              }`}
            >
              <span className="text-base sm:text-lg">
                {flower.id === 2 ? '🌼' : flower.id === 1 ? '🌹' : flower.id === 4 ? '🌻' : flower.id === 5 ? '🪻' : '🌸'}
              </span>
              <span>{flower.name}</span>
              {isCollected && (
                <span className={`rounded-full p-0.5 ${isSelected ? 'bg-white/20' : 'bg-emerald-100 text-emerald-700'}`}>
                  <Check className="h-3 w-3" />
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Flower spotlight card */}
      <div className="mt-8 overflow-hidden rounded-2xl border border-rose-100 bg-gradient-to-b from-white to-rose-50/30 p-6 sm:p-8 shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Flower Visual Animation */}
          <div className="md:col-span-5 flex flex-col items-center justify-center">
            <div className="relative flex h-48 w-48 sm:h-56 sm:w-56 items-center justify-center">
              {/* Pulsing halo */}
              <div
                className={`absolute inset-0 rounded-full bg-gradient-to-tr ${selectedFlower.color} opacity-20 blur-2xl animate-pulse`}
              />
              
              {/* Petal circle graphic */}
              <div className="relative flex h-36 w-36 sm:h-40 sm:w-40 items-center justify-center rounded-full bg-white border border-rose-100 shadow-md">
                <span className="text-6xl sm:text-7xl animate-float-slow select-none">
                  {selectedFlower.id === 2 ? '🌼' : selectedFlower.id === 1 ? '🌹' : selectedFlower.id === 4 ? '🌻' : selectedFlower.id === 5 ? '🪻' : '🌸'}
                </span>
              </div>
            </div>

            <span className="mt-2 text-xs font-semibold tracking-wider uppercase text-rose-500">
              {selectedFlower.meaning}
            </span>
          </div>

          {/* Message Content */}
          <div className="md:col-span-7 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-rose-100/70 px-3 py-1 text-xs font-semibold text-rose-800">
              <Sparkles className="h-3 w-3 text-rose-600" />
              <span>Significado de esta flor</span>
            </div>

            <h3 className="mt-3 font-serif text-2xl sm:text-3xl font-bold text-rose-950">
              {selectedFlower.name}
            </h3>

            <p className="mt-4 font-script text-2xl sm:text-3xl leading-relaxed text-rose-900">
              &ldquo;{selectedFlower.note}&rdquo;
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center md:justify-start gap-3">
              <button
                onClick={() => handleSelectFlower(selectedFlower)}
                className="inline-flex items-center gap-1.5 rounded-full bg-rose-600 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-sm transition hover:bg-rose-700 active:scale-95"
              >
                <Heart className="h-4 w-4 fill-white" />
                <span>Regalar esta flor</span>
              </button>

              <button
                onClick={handleSendAllFlowers}
                className="inline-flex items-center gap-1.5 rounded-full border border-rose-200 bg-white px-5 py-2.5 text-xs sm:text-sm font-semibold text-rose-900 transition hover:bg-rose-50 active:scale-95"
              >
                <Sparkles className="h-4 w-4 text-amber-500" />
                <span>Entregar todo el ramo ({collectedCount.length}/5)</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
