import React, { useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useTransform } from 'framer-motion';
import { 
  RotateCcw, 
  ArrowRight, 
  Sparkles,
  Flame,
  CheckCircle2,
  Terminal,
  Layers
} from 'lucide-react';
import confetti from 'canvas-confetti';
import SwipeCard from './SwipeCard';
import { storyline, operatorStatus, unlockedGrowthData } from '../content';

export default function Dashboard({ onResetToPdf }) {
  // Game states: 'intro' | 'playing' | 'pitches' | 'pipeline'
  const [gameState, setGameState] = useState('intro');

  // Index pointer into the full 8-step storyline array
  const [currentIndex, setCurrentIndex] = useState(0);

  // Motion value for horizontal drag synchronization
  const motionX = useMotionValue(0);

  // Dynamic ambient background glow intensities mapped to drag (shifts Red left, Green right)
  const bgRedGlow = useTransform(motionX, [-220, -30, 0], [0.55, 0.22, 0]);
  const bgGreenGlow = useTransform(motionX, [0, 30, 220], [0, 0.22, 0.55]);

  const currentStep = storyline[currentIndex];
  const isFinalStep = currentIndex === storyline.length - 1;

  // Handle wrong choice on dilemma
  const handleWrongChoice = () => {
    // Completely silent and minimal - card shakes visually in SwipeCard
  };

  // Handle correct choice on dilemma
  const handleCorrectChoice = () => {
    // Crisp confetti burst
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ffffff', '#e4e4e7', '#10b981', '#34d399']
    });

    setTimeout(() => {
      motionX.set(0);
      if (currentIndex < storyline.length - 1) {
        setCurrentIndex(prev => prev + 1);
      } else {
        setGameState('pitches');
      }
    }, 600);
  };

  // Handle clicking button on story card (swiping completely disabled)
  const handleAdvanceStory = () => {
    motionX.set(0);

    if (isFinalStep) {
      confetti({
        particleCount: 100,
        spread: 90,
        origin: { y: 0.5 },
        colors: ['#ffffff', '#a1a1aa', '#10b981', '#60a5fa']
      });
      setGameState('pitches');
    } else {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handleRestart = () => {
    motionX.set(0);
    setCurrentIndex(0);
    setGameState('playing');
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 flex flex-col font-sans relative overflow-x-hidden select-none">
      
      {/* ========================================================================= */}
      {/* AMBIENT ANIMATED GRADIENT BACKGROUND (Shifts Red on left, Green on right) */}
      {/* ========================================================================= */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Resting subtle ambient mesh */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[750px] h-[750px] bg-zinc-800/10 rounded-full blur-[140px]" />
        
        {/* Dynamic Red Glow (Dragging left) */}
        <motion.div 
          style={{ opacity: bgRedGlow }}
          className="absolute -top-32 -left-32 w-[650px] h-[650px] bg-red-600/25 rounded-full blur-[140px] transition-opacity duration-75"
        />

        {/* Dynamic Green Glow (Dragging right) */}
        <motion.div 
          style={{ opacity: bgGreenGlow }}
          className="absolute -top-32 -right-32 w-[650px] h-[650px] bg-emerald-600/25 rounded-full blur-[140px] transition-opacity duration-75"
        />
      </div>

      {/* ========================================================================= */}
      {/* TOP HEADER: SILENT & MINIMAL (NO RUNWAY BARS, NO CLUTTER) */}
      {/* ========================================================================= */}
      <header className="border-b border-white/5 bg-[#09090b]/80 backdrop-blur-xl px-4 sm:px-8 py-3.5 flex items-center justify-between sticky top-0 z-40">
        
        {/* Left: Minimal Branding */}
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-sm bg-white rotate-45" />
          <span className="font-mono text-xs uppercase tracking-widest text-zinc-400 font-semibold">
            WISPR FLOW <span className="text-zinc-600">//</span> GROWTH OPERATOR RPG
          </span>
        </div>

        {/* Right: Clean Step Status & Return to Landing */}
        <div className="flex items-center gap-4">
          {gameState === 'playing' && (
            <div className="text-[11px] font-mono text-zinc-400 bg-zinc-900/90 px-3 py-1 rounded-full border border-white/10">
              STEP {currentIndex + 1} OF {storyline.length}
            </div>
          )}

          <button
            type="button"
            onClick={onResetToPdf}
            className="px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-850 text-zinc-400 hover:text-white border border-white/10 text-xs font-medium transition flex items-center gap-1.5 cursor-pointer backdrop-blur"
          >
            <RotateCcw className="w-3.5 h-3.5 text-zinc-500" />
            <span className="hidden sm:inline">Landing Screen</span>
          </button>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* MAIN VIEWPORT: ACTIVE 3D CARD + OPERATOR LOADOUT SIDEBAR */}
      {/* ========================================================================= */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col lg:flex-row gap-8 items-center lg:items-start justify-center relative z-10">
        
        {/* ========================================================================= */}
        {/* CENTER VIEWPORT: REIGNS 3D CARD ARENA */}
        {/* ========================================================================= */}
        <main className="flex-1 w-full flex flex-col items-center justify-center my-auto min-h-[620px]">
          
          {/* ========================================================================= */}
          {/* 1. INTRO SCREEN STATE */}
          {/* ========================================================================= */}
          {gameState === 'intro' && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
              className="w-full max-w-xl text-center py-12 px-6 sm:px-10 rounded-3xl bg-zinc-900/60 backdrop-blur-2xl border border-white/10 shadow-[0_25px_80px_rgba(0,0,0,0.85)] my-auto relative overflow-hidden"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-400 text-xs font-mono uppercase tracking-widest mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>The Growth Operator RPG</span>
              </div>

              {/* Massive Punchy Header */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mb-6 leading-[1.08]">
                Oh you didn't want to read a boring PDF? Good. Let's play a game. What would Agnel do?
              </h1>

              <p className="text-sm sm:text-base text-zinc-400 max-w-md mx-auto leading-relaxed mb-9">
                8 progressive career battles. Startup pivots, winding down institutional partnerships, national case wins, and vibe-coding auto-dialers.
              </p>

              {/* Glowing "Start Swiping" Button */}
              <button
                type="button"
                onClick={() => setGameState('playing')}
                className="px-8 py-4 rounded-2xl bg-white hover:bg-zinc-200 text-zinc-950 font-bold text-sm tracking-wide transition-all duration-200 active:scale-95 cursor-pointer shadow-lg hover:shadow-2xl inline-flex items-center gap-2.5 animate-pulse-glow"
              >
                <span>Start Swiping</span>
                <ArrowRight className="w-4 h-4 text-zinc-950" />
              </button>

              <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-center gap-4 text-[11px] font-mono text-zinc-500">
                <span>Reigns 3D drag physics • Drag card left or right to inspect options</span>
              </div>
            </motion.div>
          )}

          {/* ========================================================================= */}
          {/* 2. PLAYING STATE: REIGNS 3D ARENA */}
          {/* ========================================================================= */}
          {gameState === 'playing' && (
            <div className="w-full flex flex-col items-center">
              
              {/* Stepper Progress Bar */}
              <div className="w-full max-w-2xl flex items-center justify-between mb-4 px-2">
                <span className="text-xs font-mono text-zinc-400 font-medium">
                  {currentStep.type === 'dilemma' ? 'DILEMMA' : 'LORE PROGRESSION'} • {currentIndex + 1} OF {storyline.length}
                </span>

                <div className="flex items-center gap-1.5">
                  {storyline.map((_, i) => (
                    <div 
                      key={i} 
                      className={`h-1.5 rounded-full transition-all duration-200 ${
                        i === currentIndex 
                          ? 'w-6 bg-white' 
                          : i < currentIndex 
                            ? 'w-2 bg-zinc-400' 
                            : 'w-2 bg-zinc-800'
                      }`} 
                    />
                  ))}
                </div>
              </div>

              {/* REIGNS ARENA CONTAINER (With 3D perspective) */}
              <div 
                style={{ perspective: 1200 }} 
                className="relative w-full max-w-2xl min-h-[520px] flex items-center justify-center"
              >
                
                {/* THE PHYSICAL 3D DILEMMA CARD WITH OVERLAY SWIPE MECHANIC */}
                {currentStep.type === 'dilemma' && (
                  <AnimatePresence mode="wait">
                    <SwipeCard
                      key={currentStep.id}
                      card={currentStep}
                      motionX={motionX}
                      onCorrectChoice={handleCorrectChoice}
                      onWrongChoice={handleWrongChoice}
                    />
                  </AnimatePresence>
                )}

                {/* STORY LORE CARD (Swipe completely disabled, click continue button only) */}
                {currentStep.type === 'story' && (
                  <motion.div
                    key={currentStep.id}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.25 }}
                    className="w-full max-w-2xl min-h-[500px] rounded-3xl bg-[#121214] border border-zinc-800 p-8 sm:p-11 flex flex-col justify-between shadow-2xl select-none relative z-20"
                  >
                    {/* Top Header: Timeline Tag */}
                    <div className="flex items-center justify-between gap-3 border-b border-zinc-800/80 pb-4">
                      <span className="inline-flex items-center font-mono text-xs text-zinc-300 bg-zinc-900 px-3.5 py-1 rounded-full border border-zinc-750">
                        {currentStep.tag}
                      </span>
                      <span className="text-[11px] font-mono text-zinc-500">LORE</span>
                    </div>

                    {/* Massive Title */}
                    <div className="py-2">
                      <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white leading-[1.05]">
                        {currentStep.title}
                      </h2>
                    </div>

                    {/* Narrative Text */}
                    <div className="py-2">
                      <p className="text-base sm:text-lg text-zinc-300 font-normal leading-relaxed">
                        {currentStep.text}
                      </p>
                    </div>

                    {/* Continue Button */}
                    <div className="pt-6 border-t border-zinc-800/80 flex items-center justify-between">
                      <span className="text-xs font-mono text-zinc-500">
                        Timeline log confirmed
                      </span>

                      <button
                        type="button"
                        onClick={handleAdvanceStory}
                        className="px-7 py-3.5 rounded-2xl bg-white hover:bg-zinc-200 text-zinc-950 font-bold text-xs uppercase tracking-wider transition-all duration-200 active:scale-95 cursor-pointer shadow-lg flex items-center gap-2"
                      >
                        <span>{currentStep.buttonText}</span>
                        <ArrowRight className="w-4 h-4 text-zinc-950" />
                      </button>
                    </div>
                  </motion.div>
                )}

              </div>

              {/* Bottom Instructions */}
              <div className="mt-8 flex items-center justify-between w-full max-w-2xl px-2 text-xs font-mono text-zinc-500">
                <span className="text-zinc-500">
                  {currentStep.type === 'dilemma' ? 'Drag card left or right to inspect choices' : 'Click continue to proceed'}
                </span>

                <button
                  type="button"
                  onClick={handleRestart}
                  className="hover:text-zinc-300 transition flex items-center gap-1 cursor-pointer text-[11px] text-zinc-500"
                >
                  <RotateCcw className="w-3 h-3 text-zinc-500" />
                  <span>Restart Campaign</span>
                </button>
              </div>

            </div>
          )}

          {/* ========================================================================= */}
          {/* 3. UNLOCKED VIEWS: AUDIO PITCHES */}
          {/* ========================================================================= */}
          {gameState === 'pitches' && (
            <div className="w-full max-w-2xl space-y-5 animate-in fade-in duration-200">
              
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setGameState('pitches')}
                    className="px-3.5 py-1.5 rounded-xl bg-white text-zinc-950 text-xs font-bold"
                  >
                    Audio Pitches
                  </button>
                  <button
                    type="button"
                    onClick={() => setGameState('pipeline')}
                    className="px-3.5 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-850 text-zinc-400 hover:text-white text-xs font-medium transition"
                  >
                    Creator Pipeline
                  </button>
                </div>
                <button
                  type="button"
                  onClick={handleRestart}
                  className="text-xs font-mono text-zinc-500 hover:text-zinc-300 flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Replay Campaign</span>
                </button>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {unlockedGrowthData.pitches.map((pitch, idx) => (
                  <div key={pitch.id} className="p-6 rounded-2xl bg-[#121214] border border-zinc-800 hover:border-zinc-700 transition">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">{pitch.tag}</span>
                      <span className="text-[11px] font-mono text-zinc-600">Track 0{idx + 1}</span>
                    </div>
                    <h2 className="text-base font-bold text-white capitalize">{pitch.title}</h2>
                    <p className="text-xs text-zinc-400 mt-2 leading-relaxed">{pitch.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* 4. UNLOCKED VIEWS: CREATOR PIPELINE */}
          {/* ========================================================================= */}
          {gameState === 'pipeline' && (
            <div className="w-full max-w-2xl space-y-5 animate-in fade-in duration-200">
              
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setGameState('pitches')}
                    className="px-3.5 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-850 text-zinc-400 hover:text-white text-xs font-medium transition"
                  >
                    Audio Pitches
                  </button>
                  <button
                    type="button"
                    onClick={() => setGameState('pipeline')}
                    className="px-3.5 py-1.5 rounded-xl bg-white text-zinc-950 text-xs font-bold"
                  >
                    Creator Pipeline
                  </button>
                </div>
                <button
                  type="button"
                  onClick={handleRestart}
                  className="text-xs font-mono text-zinc-500 hover:text-zinc-300 flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Replay Campaign</span>
                </button>
              </div>

              <div className="rounded-2xl border border-zinc-800 bg-[#121214] overflow-hidden shadow-2xl">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-zinc-800 bg-zinc-950/80 text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                      <th className="py-3 px-4">Creator</th>
                      <th className="py-3 px-4">Niche</th>
                      <th className="py-3 px-4">Reach</th>
                      <th className="py-3 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/60">
                    {unlockedGrowthData.pipeline.map((item) => (
                      <tr key={item.id} className="hover:bg-zinc-900/50">
                        <td className="py-3 px-4 font-medium text-white">
                          {item.name}
                          <span className="block text-[10px] font-mono text-zinc-500 font-normal">{item.handle}</span>
                        </td>
                        <td className="py-3 px-4 text-zinc-400">{item.niche}</td>
                        <td className="py-3 px-4 font-mono text-zinc-300">{item.reach}</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-zinc-900 text-zinc-300 border border-zinc-700">
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </main>

        {/* ========================================================================= */}
        {/* RIGHT SIDE: OPERATOR STATUS SIDEBAR (LOADOUT) - CLEAN & MINIMAL */}
        {/* ========================================================================= */}
        <aside className="w-full lg:w-80 shrink-0 space-y-4">
          <div className="p-6 rounded-3xl bg-[#121214] border border-zinc-800 shadow-2xl space-y-5">
            
            {/* Operator Card Header */}
            <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3.5">
              <div>
                <h2 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                  Operator Loadout
                </h2>
                <p className="text-[10px] text-zinc-500">Growth Specialist</p>
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>

            {/* Location */}
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">
                Location
              </span>
              <div className="flex items-center gap-2 text-xs font-medium text-zinc-200 bg-[#0d0d0f] p-2.5 rounded-xl border border-zinc-800">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>{operatorStatus.location}</span>
              </div>
            </div>

            {/* Mission */}
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">
                Mission
              </span>
              <div className="text-xs text-zinc-200 bg-[#0d0d0f] p-2.5 rounded-xl border border-zinc-800 leading-relaxed font-medium">
                {operatorStatus.mission}
              </div>
            </div>

            {/* Loadout */}
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">
                Loadout
              </span>
              <div className="text-xs text-zinc-300 bg-[#0d0d0f] p-3 rounded-xl border border-zinc-800 leading-relaxed">
                {operatorStatus.loadout}
              </div>
            </div>

            {/* Status footer */}
            <div className="pt-2 border-t border-zinc-850 flex items-center justify-between text-[10px] font-mono text-zinc-600">
              <span>ANTIGRAVITY ENGINE</span>
              <span className="text-emerald-400">ONLINE</span>
            </div>

          </div>
        </aside>

      </div>

    </div>
  );
}
