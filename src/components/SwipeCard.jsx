import React, { useState } from 'react';
import { motion, useTransform } from 'framer-motion';
import { X, Check, RotateCcw } from 'lucide-react';

export default function SwipeCard({ 
  card, 
  motionX,
  onCorrectChoice,
  onWrongChoice,
}) {
  // 3D Physical rotation: tilts into 3D plane on Y and Z as user drags
  const rotateY = useTransform(motionX, [-260, 0, 260], [-18, 0, 18]);
  const rotateZ = useTransform(motionX, [-260, 0, 260], [-9, 0, 9]);

  // Main situation text dims smoothly as user drags left or right
  const situationOpacity = useTransform(motionX, [-150, -40, 0, 40, 150], [0.15, 0.6, 1, 0.6, 0.15]);

  // Option overlay opacities while dragging (clean, readable text with no glow)
  const leftChoiceOpacity = useTransform(motionX, [-140, -25, 0], [1, 0.5, 0]);
  const rightChoiceOpacity = useTransform(motionX, [0, 25, 140], [0, 0.5, 1]);

  const leftChoiceScale = useTransform(motionX, [-140, 0], [1, 0.95]);
  const rightChoiceScale = useTransform(motionX, [0, 140], [0.95, 1]);

  // Decision state: null | { direction: 'left' | 'right', text: string, isCorrect: boolean }
  const [decisionState, setDecisionState] = useState(null);
  const [isViolentShaking, setIsViolentShaking] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [exitDirection, setExitDirection] = useState('right');

  const handleDragEnd = (_, info) => {
    if (decisionState) return;

    const threshold = 85;
    const velocityThreshold = 320;

    const swipedLeft = info.offset.x < -threshold || info.velocity.x < -velocityThreshold;
    const swipedRight = info.offset.x > threshold || info.velocity.x > velocityThreshold;

    if (!swipedLeft && !swipedRight) return;

    const chosenDirection = swipedLeft ? 'left' : 'right';
    executeChoice(chosenDirection);
  };

  const executeChoice = (chosenDirection) => {
    const chosenText = chosenDirection === 'left' ? card.leftChoice : card.rightChoice;
    const isCorrect = chosenDirection === card.correctDirection;

    // Lock in the decision state to reveal subtle glow
    setDecisionState({
      direction: chosenDirection,
      text: chosenText,
      isCorrect
    });

    if (isCorrect) {
      onCorrectChoice();

      // Card flies off after user sees the confirmed green glow
      setTimeout(() => {
        setExitDirection(chosenDirection);
        setIsExiting(true);
      }, 550);

    } else {
      // Violent shake
      setIsViolentShaking(true);
      onWrongChoice();

      setTimeout(() => {
        setIsViolentShaking(false);
      }, 420);

      // Hold decision state for 2.6s so user can read it, then reset
      setTimeout(() => {
        setDecisionState(null);
      }, 2600);
    }
  };

  const handleResetDecision = (e) => {
    e?.stopPropagation();
    setDecisionState(null);
  };

  return (
    <motion.div
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '640px',
        minHeight: '520px',
        x: motionX,
        rotateY: rotateY,
        rotateZ: rotateZ,
        zIndex: 20,
        transformStyle: 'preserve-3d',
        willChange: 'transform',
      }}
      drag={!decisionState ? 'x' : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.65}
      onDragEnd={handleDragEnd}
      animate={
        isExiting
          ? { 
              x: exitDirection === 'left' ? -1000 : 1000, 
              opacity: 0, 
              rotateZ: exitDirection === 'left' ? -18 : 18, 
              transition: { duration: 0.32, ease: 'easeOut' } 
            }
          : isViolentShaking
            ? { x: [0, -24, 24, -18, 18, -8, 8, 0], transition: { duration: 0.42 } }
            : { x: 0 }
      }
      className={`rounded-3xl bg-[#121214] border border-zinc-800 p-8 sm:p-11 flex flex-col justify-between shadow-2xl select-none overflow-hidden relative ${
        !decisionState ? 'cursor-grab active:cursor-grabbing hover:border-zinc-700' : 'pointer-events-none'
      }`}
    >
      {/* ========================================================================= */}
      {/* 1. POST-DECISION OVERLAY (Reveals AFTER release with subtle glow) */}
      {/* ========================================================================= */}
      {decisionState && decisionState.direction === 'left' && (
        <div className="absolute inset-0 bg-[#140a0a]/95 z-30 p-8 sm:p-10 flex flex-col justify-between border-2 border-red-500/50 rounded-3xl animate-in fade-in duration-150 shadow-[0_0_35px_rgba(239,68,68,0.25)] pointer-events-auto">
          <div className="flex items-center justify-between">
            <span className="px-3.5 py-1.5 rounded-full bg-red-950/90 border border-red-500/50 text-red-300 font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2">
              <X className="w-3.5 h-3.5 text-red-400" />
              <span>Boring Corporate Move</span>
            </span>
            <button
              type="button"
              onClick={handleResetDecision}
              className="text-xs font-mono text-red-300 hover:text-white px-3 py-1.5 rounded-full bg-red-900/40 border border-red-700/50 transition cursor-pointer flex items-center gap-1.5"
            >
              <span>Try Again</span>
              <RotateCcw className="w-3 h-3" />
            </button>
          </div>

          <div className="my-auto py-4">
            <span className="text-xs font-mono uppercase text-red-400/90 font-medium block mb-2 tracking-wider">
              Selected Move:
            </span>
            {/* Standard readable font size with subtle red glow */}
            <p className="text-lg sm:text-xl font-bold text-red-200 leading-relaxed [text-shadow:0_0_16px_rgba(239,68,68,0.5)]">
              "{decisionState.text}"
            </p>
            <p className="text-xs sm:text-sm text-red-300/80 mt-3 leading-relaxed">
              That's the predictable, low-leverage corporate path. Agnel doesn't play like that.
            </p>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-red-900/40 text-[11px] font-mono text-red-400/80">
            <span>Resetting card...</span>
            <span>Swipe right to execute Agnel's play</span>
          </div>
        </div>
      )}

      {decisionState && decisionState.direction === 'right' && (
        <div className="absolute inset-0 bg-[#07160e]/95 z-30 p-8 sm:p-10 flex flex-col justify-between border-2 border-emerald-500/50 rounded-3xl animate-in fade-in duration-150 shadow-[0_0_35px_rgba(16,185,129,0.25)] pointer-events-auto">
          <div className="flex items-center justify-between">
            <span className="px-3.5 py-1.5 rounded-full bg-emerald-950/90 border border-emerald-500/50 text-emerald-300 font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span>Agnel's Play</span>
            </span>
            <span className="text-xs font-mono text-emerald-400 font-bold">Correct ✓</span>
          </div>

          <div className="my-auto py-4">
            <span className="text-xs font-mono uppercase text-emerald-400/90 font-medium block mb-2 tracking-wider">
              Executing High-Leverage Move:
            </span>
            {/* Standard readable font size with subtle green glow */}
            <p className="text-lg sm:text-xl font-bold text-emerald-200 leading-relaxed [text-shadow:0_0_16px_rgba(16,185,129,0.5)]">
              "{decisionState.text}"
            </p>
          </div>

          <div className="text-[11px] font-mono text-emerald-400/80 pt-3 border-t border-emerald-900/40">
            Advancing to next timeline entry...
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. DRAG OVERLAYS (Smoothly fades in ON TOP of card while dragging - NO GLOW) */}
      {/* ========================================================================= */}
      {!decisionState && (
        <>
          {/* Drag Left: Option A Overlay */}
          <motion.div
            style={{ 
              opacity: leftChoiceOpacity,
              scale: leftChoiceScale,
            }}
            className="pointer-events-none absolute inset-4 sm:inset-6 z-20 flex flex-col items-center justify-center p-6 sm:p-8 rounded-2xl bg-zinc-950/90 backdrop-blur-md border border-white/10 shadow-2xl text-center"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-400 font-mono text-xs uppercase tracking-wider mb-4">
              <span>← Option A</span>
            </div>
            {/* Standard readable font size */}
            <p className="text-base sm:text-lg md:text-xl font-semibold text-zinc-100 leading-relaxed max-w-md">
              "{card.leftChoice}"
            </p>
            <span className="mt-5 text-[11px] font-mono text-zinc-500">
              Release to commit choice
            </span>
          </motion.div>

          {/* Drag Right: Option B Overlay */}
          <motion.div
            style={{ 
              opacity: rightChoiceOpacity,
              scale: rightChoiceScale,
            }}
            className="pointer-events-none absolute inset-4 sm:inset-6 z-20 flex flex-col items-center justify-center p-6 sm:p-8 rounded-2xl bg-zinc-950/90 backdrop-blur-md border border-white/10 shadow-2xl text-center"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-400 font-mono text-xs uppercase tracking-wider mb-4">
              <span>Option B →</span>
            </div>
            {/* Standard readable font size */}
            <p className="text-base sm:text-lg md:text-xl font-semibold text-zinc-100 leading-relaxed max-w-md">
              "{card.rightChoice}"
            </p>
            <span className="mt-5 text-[11px] font-mono text-zinc-500">
              Release to commit choice
            </span>
          </motion.div>
        </>
      )}

      {/* ========================================================================= */}
      {/* 3. CARD BODY (Situation text dims while dragging) */}
      {/* ========================================================================= */}
      <div className="relative z-10 flex flex-col justify-between h-full space-y-6">
        
        {/* Top Header: Timeline Tag */}
        <div className="flex items-center justify-between gap-3 border-b border-zinc-800/80 pb-4">
          <span className="inline-flex items-center font-mono text-xs text-zinc-300 bg-zinc-900 px-3.5 py-1 rounded-full border border-zinc-750">
            {card.tag}
          </span>
          <span className="text-[11px] font-mono text-zinc-500">DILEMMA</span>
        </div>

        {/* Massive Punchy Card Title */}
        <div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white leading-[1.05]">
            {card.title}
          </h2>
        </div>

        {/* Situation Text Body (Smoothly dims during drag) */}
        <motion.div 
          style={{ opacity: situationOpacity }}
          className="py-1 space-y-4"
        >
          <p className="text-base sm:text-lg text-zinc-300 font-normal leading-relaxed">
            {card.situation}
          </p>

          {/* Highly Visible Stylized Hook: "So, what did Agnel do?" */}
          <div className="pt-2">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-zinc-900 border border-zinc-700/80 text-zinc-200 text-sm sm:text-base font-extrabold tracking-tight shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-white">So, what did Agnel do?</span>
            </div>
          </div>
        </motion.div>

        {/* Card Footer Direction Hint */}
        <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between text-[11px] font-mono text-zinc-500">
          <span className="text-zinc-400">
            ← Drag card left
          </span>
          <span className="text-zinc-600">Reigns 3D Swipe Deck</span>
          <span className="text-zinc-400">
            Drag card right →
          </span>
        </div>

      </div>

    </motion.div>
  );
}
