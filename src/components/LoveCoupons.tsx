import React, { useState, useEffect } from 'react';
import {
  Gift,
  CheckCircle,
  RotateCcw,
  Heart,
  Sparkles,
  Film,
  Gamepad2,
  Coins,
  Moon,
  Utensils,
  Wifi,
  ExternalLink
} from 'lucide-react';
import { defaultCoupons } from '../data/romanticContent';
import { LoveCoupon } from '../types';
import confetti from 'canvas-confetti';
import { romanticAudio } from '../utils/audioSynth';

export const LoveCoupons: React.FC = () => {
  const [coupons, setCoupons] = useState<LoveCoupon[]>(() => {
    try {
      const saved = localStorage.getItem('romantic_coupons_distance_v3');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length === 5) {
          return parsed;
        }
      }
    } catch {
      // localStorage fallback
    }
    return defaultCoupons;
  });

  useEffect(() => {
    try {
      localStorage.setItem('romantic_coupons_distance_v3', JSON.stringify(coupons));
    } catch {
      // localStorage fallback
    }
  }, [coupons]);

  const handleRedeem = (id: string, isRobux: boolean = false) => {
    romanticAudio.playChime();
    confetti({
      particleCount: isRobux ? 90 : 65,
      spread: isRobux ? 85 : 70,
      origin: { y: 0.7 },
      colors: isRobux
        ? ['#f59e0b', '#fbbf24', '#f43f5e', '#10b981', '#ffffff']
        : ['#e11d48', '#f59e0b', '#ec4899', '#f43f5e'],
    });

    const nowStr = new Date().toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
    });

    setCoupons((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, redeemed: true, redeemedAt: nowStr }
          : c
      )
    );
  };

  const handleResetCoupons = () => {
    setCoupons(defaultCoupons);
  };

  const getIcon = (name: string) => {
    switch (name) {
      case 'Coins':
        return <Coins className="h-5 w-5 text-amber-500" />;
      case 'Gamepad2':
        return <Gamepad2 className="h-5 w-5 text-rose-500" />;
      case 'Moon':
        return <Moon className="h-5 w-5 text-indigo-500" />;
      case 'Film':
        return <Film className="h-5 w-5 text-purple-500" />;
      case 'Utensils':
        return <Utensils className="h-5 w-5 text-emerald-500" />;
      default:
        return <Gift className="h-5 w-5 text-rose-500" />;
    }
  };

  const redeemedTotal = coupons.filter((c) => c.redeemed).length;

  return (
    <section id="cupones" className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-300 bg-amber-50 px-4 py-1.5 text-xs font-semibold text-amber-900 shadow-2xs">
          <Wifi className="h-3.5 w-3.5 text-amber-600" />
          <span>Amor a Distancia & Roblox</span>
          <span className="text-amber-400">•</span>
          <span>5 Vales Especiales</span>
        </div>
        <h2 className="mt-3 font-serif text-3xl font-bold text-rose-950 sm:text-4xl">
          5 Vales de Amor a Distancia para Nashalie
        </h2>
        <p className="mt-2 text-sm text-stone-600 max-w-xl mx-auto">
          Porque nuestro amor cruza cualquier distancia y nos divertimos como nadie jugando Roblox. Canjea cualquiera de estos 5 vales cuando tú quieras.
        </p>
      </div>

      {/* Coupons grid (5 custom distance coupons) */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {coupons.map((coupon, idx) => {
          const isRobuxCoupon = coupon.iconName === 'Coins';

          return (
            <div
              key={coupon.id}
              className={`relative flex flex-col justify-between rounded-2xl border-2 border-dashed p-6 transition-all duration-300 ${
                coupon.redeemed
                  ? 'border-stone-300 bg-stone-50/80 opacity-90'
                  : isRobuxCoupon
                  ? 'border-amber-400 bg-gradient-to-br from-amber-50/70 via-white to-rose-50/50 shadow-md hover:shadow-lg hover:border-amber-500 md:col-span-2 lg:col-span-1 ring-1 ring-amber-200'
                  : 'border-rose-300 bg-white shadow-sm hover:shadow-md hover:border-rose-400'
              }`}
            >
              {/* Ticket notch visual decorations */}
              <div className="absolute -left-3 top-1/2 -translate-y-1/2 h-6 w-6 rounded-full bg-[#fff9fa] border-r-2 border-dashed border-rose-300 pointer-events-none" />
              <div className="absolute -right-3 top-1/2 -translate-y-1/2 h-6 w-6 rounded-full bg-[#fff9fa] border-l-2 border-dashed border-rose-300 pointer-events-none" />

              <div>
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getIcon(coupon.iconName)}
                    <span className="text-[11px] font-bold uppercase tracking-wider text-stone-600">
                      {coupon.category}
                    </span>
                  </div>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                      isRobuxCoupon
                        ? 'bg-amber-100 text-amber-900 border border-amber-300'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {coupon.tag}
                  </span>
                </div>

                {/* Title & description */}
                <div className="mt-3 flex items-start gap-2">
                  <h3 className="font-serif text-lg font-bold text-rose-950">
                    {coupon.title}
                  </h3>
                  {isRobuxCoupon && (
                    <span className="rounded bg-amber-400/30 px-1.5 py-0.5 text-[10px] font-bold text-amber-900 shrink-0">
                      ⭐ VIP
                    </span>
                  )}
                </div>

                <p className="mt-2 text-xs leading-relaxed text-stone-600">
                  {coupon.description}
                </p>

                {isRobuxCoupon && !coupon.redeemed && (
                  <div className="mt-3 rounded-lg border border-amber-200 bg-amber-50/80 p-2 text-[11px] text-amber-900 flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5 text-amber-600 shrink-0" />
                    <span>¡Abdias se encarga de recargártelos a tu cuenta cuando lo canjees!</span>
                  </div>
                )}
              </div>

              {/* Bottom action or stamp */}
              <div className="mt-6 pt-4 border-t border-dashed border-stone-200 flex items-center justify-between">
                <span className="text-[10px] text-stone-400">
                  Vale #{idx + 1} de 5 • Sin caducidad
                </span>

                {coupon.redeemed ? (
                  <div className="flex items-center gap-1 rounded border border-rose-400/60 bg-rose-50 px-2.5 py-1 text-xs font-bold text-rose-700 uppercase rotate-[-2deg]">
                    <CheckCircle className="h-3.5 w-3.5 text-rose-600" />
                    <span>¡Canjeado por Nashalie!</span>
                  </div>
                ) : (
                  <button
                    onClick={() => handleRedeem(coupon.id, isRobuxCoupon)}
                    className={`rounded-full px-4 py-1.5 text-xs font-semibold text-white shadow-2xs transition active:scale-95 ${
                      isRobuxCoupon
                        ? 'bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600'
                        : 'bg-rose-600 hover:bg-rose-700'
                    }`}
                  >
                    Canjear este vale
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Reset options */}
      {redeemedTotal > 0 && (
        <div className="mt-8 text-center">
          <button
            onClick={handleResetCoupons}
            className="inline-flex items-center gap-1.5 text-xs text-stone-500 hover:text-stone-800 transition"
          >
            <RotateCcw className="h-3 w-3" />
            <span>Restaurar los 5 vales ({redeemedTotal} canjeados)</span>
          </button>
        </div>
      )}
    </section>
  );
};
