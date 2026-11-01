import React, { useState } from 'react';
import { Mic, MicOff, Volume2, Sparkles } from 'lucide-react';

export default function FloatingMic() {
  const [isListening, setIsListening] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const toggleMic = () => {
    setIsListening(prev => !prev);
  };

  return (
    <aside aria-label="Voice Control" className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Voice Status Toast */}
      {isListening && (
        <div className="mb-3 px-4 py-2.5 rounded-2xl bg-zinc-900/95 border border-purple-500/40 text-purple-200 shadow-2xl backdrop-blur-md flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-4 bg-purple-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
            <span className="w-1.5 h-6 bg-purple-300 rounded-full animate-bounce [animation-delay:-0.15s]" />
            <span className="w-1.5 h-3 bg-purple-400 rounded-full animate-bounce" />
          </div>
          <div className="text-xs">
            <p className="font-semibold text-purple-300">Voice Control Active</p>
            <p className="text-[11px] text-zinc-400">Say "Open 10-7-3" or "Create Pipeline"</p>
          </div>
          <button 
            type="button"
            onClick={() => setIsListening(false)}
            className="text-zinc-500 hover:text-zinc-300 text-xs font-mono ml-1"
          >
            ✕
          </button>
        </div>
      )}

      {/* Floating Button with Tooltip */}
      <div className="relative group">
        {/* Tooltip on hover */}
        {showTooltip && !isListening && (
          <div className="absolute bottom-full right-0 mb-3 w-56 p-2.5 bg-zinc-900/95 border border-zinc-700/80 rounded-xl text-zinc-300 text-xs shadow-2xl backdrop-blur pointer-events-none text-center">
            <div className="flex items-center justify-center gap-1.5 font-semibold text-purple-400 mb-0.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Voice Control Hook</span>
            </div>
            <p className="text-[11px] text-zinc-400">
              Reserved for upcoming Wispr voice dictation & pipeline control.
            </p>
            <div className="absolute top-full right-6 -mt-[1px] border-solid border-t-zinc-700 border-t-6 border-x-transparent border-x-6 border-b-0" />
          </div>
        )}

        {/* Ambient Glow */}
        <div 
          className={`absolute -inset-1 rounded-full blur-md opacity-70 transition duration-300 ${
            isListening 
              ? 'bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 animate-pulse' 
              : 'bg-gradient-to-r from-purple-800 to-indigo-800 group-hover:opacity-100'
          }`} 
        />

        {/* The Action Button */}
        <button
          type="button"
          onClick={toggleMic}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          className={`relative w-14 h-14 rounded-full flex items-center justify-center text-white shadow-2xl transition-all duration-200 cursor-pointer ${
            isListening 
              ? 'bg-purple-600 border-2 border-purple-300 animate-mic-pulse scale-105' 
              : 'bg-zinc-900 hover:bg-zinc-850 border border-zinc-700/80 hover:border-purple-500/60 active:scale-95'
          }`}
          aria-label={isListening ? "Mute Voice Control" : "Activate Voice Control"}
          title="Voice Control"
        >
          {isListening ? (
            <Mic className="w-6 h-6 text-white animate-pulse" />
          ) : (
            <Mic className="w-6 h-6 text-purple-400 group-hover:text-purple-300 transition-colors" />
          )}

          {/* Micro status indicator dot */}
          <span 
            className={`absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full border-2 border-zinc-900 ${
              isListening ? 'bg-emerald-400 animate-ping' : 'bg-zinc-600'
            }`} 
          />
        </button>
      </div>
    </aside>
  );
}
