import React, { useEffect, useState } from 'react';

interface Particle {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  symbol: string;
  opacity: number;
}

export const FloatingPetals: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const symbols = ['🌸', '✨', '💛', '💖', '🌹', '🍂'];
    const items: Particle[] = Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      left: Math.random() * 96 + 2,
      size: Math.random() * 12 + 14,
      duration: Math.random() * 8 + 9,
      delay: Math.random() * 6,
      symbol: symbols[Math.floor(Math.random() * symbols.length)],
      opacity: Math.random() * 0.4 + 0.35,
    }));
    setParticles(items);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute select-none"
          style={{
            left: `${p.left}%`,
            top: '-5%',
            fontSize: `${p.size}px`,
            opacity: p.opacity,
            animation: `fallAndSway ${p.duration}s linear infinite`,
            animationDelay: `${p.delay}s`,
          }}
        >
          {p.symbol}
        </span>
      ))}
      <style>{`
        @keyframes fallAndSway {
          0% {
            transform: translateY(0) rotate(0deg) translateX(0px);
          }
          50% {
            transform: translateY(50vh) rotate(180deg) translateX(25px);
          }
          100% {
            transform: translateY(105vh) rotate(360deg) translateX(-25px);
          }
        }
      `}</style>
    </div>
  );
};
