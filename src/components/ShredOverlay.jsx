import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { playShredSound } from '../utils/sound';

export default function ShredOverlay({ onComplete }) {
  // Generate 20 ribbon strips for the shredding effect
  const stripCount = 22;
  const strips = Array.from({ length: stripCount });

  useEffect(() => {
    // Play the mechanical paper shredding sound
    playShredSound();

    // Fire paper shred confetti particles
    const confettiColors = ['#ffffff', '#e4e4e7', '#a1a1aa', '#ef4444', '#f87171'];
    
    // First burst: center shred explosion
    confetti({
      particleCount: 85,
      spread: 100,
      origin: { y: 0.5 },
      colors: confettiColors,
      shapes: ['square'],
      scalar: 1.2,
      gravity: 1.4,
      ticks: 180,
    });

    // Secondary burst: paper ribbons flying outward
    const timer1 = setTimeout(() => {
      confetti({
        particleCount: 60,
        angle: 60,
        spread: 60,
        origin: { x: 0.2, y: 0.6 },
        colors: confettiColors,
        scalar: 1.1,
        gravity: 1.6,
      });
      confetti({
        particleCount: 60,
        angle: 120,
        spread: 60,
        origin: { x: 0.8, y: 0.6 },
        colors: confettiColors,
        scalar: 1.1,
        gravity: 1.6,
      });
    }, 200);

    // Complete transition after animation plays
    const timer2 = setTimeout(() => {
      if (onComplete) onComplete();
    }, 1400);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/90 backdrop-blur-sm overflow-hidden select-none animate-shake">
      
      {/* Laser Slice Beam */}
      <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent shadow-[0_0_20px_#ef4444] z-30 pointer-events-none animate-laser" />

      {/* Shredder Machine Top Grill */}
      <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-zinc-950 via-zinc-900 to-transparent flex justify-center items-end pb-2 z-20">
        <div className="flex gap-1.5 opacity-70">
          {Array.from({ length: 30 }).map((_, i) => (
            <div key={i} className="w-1.5 h-6 bg-zinc-700/80 rounded-t-sm shadow-inner" />
          ))}
        </div>
      </div>

      {/* Shredding Resume Document Slices */}
      <div className="relative w-full max-w-2xl h-[780px] flex px-6 pointer-events-none">
        {strips.map((_, i) => {
          // Randomized rotation angle between -15deg and +15deg
          const rot = `${(i % 2 === 0 ? 1 : -1) * (6 + (i * 1.5) % 18)}deg`;
          const delay = `${(i * 0.025).toFixed(3)}s`;
          const duration = `${(0.85 + (i % 3) * 0.1).toFixed(2)}s`;

          return (
            <div
              key={i}
              style={{
                '--rot': rot,
                animationDelay: delay,
                animationDuration: duration,
              }}
              className="flex-1 h-full bg-[#f4f4f5] border-r border-zinc-350 shadow-md animate-shred-slice overflow-hidden relative"
            >
              {/* Simulated text lines on each shredded slice */}
              <div 
                className="absolute inset-0 w-[600px] p-8 opacity-65"
                style={{
                  transform: `translateX(-${(i / stripCount) * 100}%)`,
                }}
              >
                <div className="h-4 w-48 bg-zinc-800 rounded mb-3" />
                <div className="h-2 w-72 bg-zinc-400 rounded mb-2" />
                <div className="h-2 w-64 bg-zinc-300 rounded mb-6" />

                <div className="space-y-2">
                  <div className="h-2 w-full bg-zinc-300 rounded" />
                  <div className="h-2 w-11/12 bg-zinc-300 rounded" />
                  <div className="h-2 w-10/12 bg-zinc-400 rounded" />
                  <div className="h-2 w-full bg-zinc-300 rounded" />
                </div>

                <div className="mt-8 space-y-2">
                  <div className="h-3 w-40 bg-zinc-700 rounded mb-2" />
                  <div className="h-2 w-full bg-zinc-300 rounded" />
                  <div className="h-2 w-9/12 bg-zinc-300 rounded" />
                  <div className="h-2 w-11/12 bg-zinc-400 rounded" />
                </div>
              </div>

              {/* Shred jagged bottom */}
              <div className="absolute bottom-0 inset-x-0 h-3 bg-gradient-to-t from-red-600/30 to-transparent" />
            </div>
          );
        })}
      </div>

      {/* Shredding text banner */}
      <div className="absolute bottom-20 z-40 bg-red-950/95 border border-red-500/60 px-6 py-2.5 rounded-full shadow-[0_0_35px_rgba(239,68,68,0.6)] flex items-center gap-3 animate-pulse">
        <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
        <span className="text-red-200 font-mono text-sm uppercase tracking-wider font-bold">
          Boring, right? Just go ahead and shred this BS.
        </span>
      </div>
    </div>
  );
}
