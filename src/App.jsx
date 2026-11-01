import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import ShredOverlay from './components/ShredOverlay';
import Dashboard from './components/Dashboard';
import FloatingMic from './components/FloatingMic';

export default function App() {
  // viewState can be: 'landing' | 'shredding' | 'dashboard'
  const [viewState, setViewState] = useState('landing');

  const handleStartShred = () => {
    setViewState('shredding');
  };

  const handleShredComplete = () => {
    setViewState('dashboard');
  };

  const handleResetToLanding = () => {
    setViewState('landing');
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col relative selection:bg-rose-500/30 selection:text-rose-200">
      {/* 1. Landing Screen: Clean Centered Glassmorphism Ultimatum */}
      {viewState === 'landing' && (
        <LandingPage onShred={handleStartShred} />
      )}

      {/* 2. Transition: Paper Shredding & Shatter Animation */}
      {viewState === 'shredding' && (
        <>
          <LandingPage onShred={() => {}} />
          <ShredOverlay onComplete={handleShredComplete} />
        </>
      )}

      {/* 3. Main Growth Operations Dashboard */}
      {viewState === 'dashboard' && (
        <div className="animate-in fade-in zoom-in-95 duration-300">
          <Dashboard onResetToPdf={handleResetToLanding} />
        </div>
      )}

      {/* Floating Microphone Icon for Voice Control */}
      <FloatingMic />
    </div>
  );
}
