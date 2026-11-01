import React, { useState } from 'react';
import { Flame, FileText, AlertCircle, Eye } from 'lucide-react';

export default function LandingPage({ onShred }) {
  const [showBoringWarning, setShowBoringWarning] = useState(false);
  const [isTerrifyingPeek, setIsTerrifyingPeek] = useState(false);

  const handleReadResume = () => {
    // 1. Unblur background for exactly 1 second to reveal the terrifying wall of text
    setIsTerrifyingPeek(true);
    
    setTimeout(() => {
      // 2. Instantly snap blur back on
      setIsTerrifyingPeek(false);
      // 3. Show the requested text prompt/button
      setShowBoringWarning(true);
    }, 1000);
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4 sm:p-6 overflow-hidden bg-[#09090b] select-none font-sans">
      
      {/* ========================================================================= */}
      {/* FULL-SCREEN RESUME BACKGROUND TEXTURE */}
      {/* Floating real document layer that blurs heavily, but unblurs for 500ms */}
      {/* ========================================================================= */}
      <div 
        aria-hidden="true"
        className={`fixed inset-0 overflow-y-auto pointer-events-none transition-all duration-150 flex justify-center py-8 px-4 ${
          isTerrifyingPeek 
            ? 'blur-none opacity-95 scale-100 z-30 bg-[#f4f4f5]' 
            : 'blur-2xl opacity-25 scale-105 z-0'
        }`}
      >
        <div className="max-w-4xl w-full bg-[#fafafa] text-zinc-900 shadow-2xl p-8 sm:p-14 font-serif text-[11px] sm:text-xs leading-relaxed border border-zinc-400">
          
          {/* Resume Header */}
          <div className="border-b-2 border-zinc-900 pb-4 text-center">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 uppercase font-sans">
              JOHN "ENTERPRISE SYNERGY" DOE, MBA, PMP, CSM, SIX SIGMA
            </h2>
            <p className="font-mono text-[10px] sm:text-xs text-zinc-700 mt-1">
              San Francisco, CA • (555) 019-2834 • dynamic.paradigm.shifter@corporate-buzzword.corp • linkedin.com/in/synergy
            </p>
            <p className="italic text-zinc-600 mt-1 font-serif text-[10px] sm:text-[11px]">
              "Seasoned strategic change-management catalyst specialized in 360-degree matrixed stakeholder optimization"
            </p>
          </div>

          {/* Terrifying Wall of Text: Executive Summary */}
          <div className="mt-5">
            <h3 className="font-sans font-bold uppercase tracking-wider text-[11px] text-zinc-900 border-b border-zinc-400 pb-0.5">
              Executive Core Summary & Value-Add Proposition
            </h3>
            <p className="text-zinc-800 text-justify mt-2 text-[10.5px] sm:text-[11px] leading-normal">
              High-impact, multifaceted enterprise alignment executive with 14+ years of cross-departmental experience orchestrating mission-critical deliverables, fostering agile cross-pollination across 17 siloed business units, and synthesizing high-level slide deck narratives for senior leadership oversight committees. Adept at navigating complex bureaucratic topologies, standardizing non-disruptive touchpoints, and driving bottom-up buy-in while harmonizing quarterly OKRs through iterative weekly check-ins and structured stakeholder alignment briefings.
            </p>
          </div>

          {/* Terrifying Wall of Text: Core Competencies (Dense Buzzword Soup) */}
          <div className="mt-4">
            <h3 className="font-sans font-bold uppercase tracking-wider text-[11px] text-zinc-900 border-b border-zinc-400 pb-0.5">
              Core Competencies & Theoretical Paradigms
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 mt-2 text-[10px] text-zinc-700 font-sans">
              <div>• Cross-Functional Synergy</div>
              <div>• Downstream Friction Mitigation</div>
              <div>• 360-Degree Feedback Loops</div>
              <div>• Low-Hanging Fruit Capitalization</div>
              <div>• Bandwidth Optimization</div>
              <div>• Paradigm Shift Facilitation</div>
              <div>• Slide Deck Typography</div>
              <div>• Stakeholder Buy-In Syndication</div>
              <div>• Matrixed Agility Orchestration</div>
              <div>• Value-Add Deliverable Auditing</div>
              <div>• Waterfall-to-Agile Translation</div>
              <div>• Asynchronous Email Escalation</div>
            </div>
          </div>

          {/* Terrifying Wall of Text: Experience */}
          <div className="mt-4">
            <h3 className="font-sans font-bold uppercase tracking-wider text-[11px] text-zinc-900 border-b border-zinc-400 pb-0.5">
              Professional Experience History
            </h3>

            <div className="mt-2.5">
              <div className="flex justify-between font-sans font-bold text-zinc-900">
                <span>Senior Principal Global Alignment Officer</span>
                <span className="font-mono font-normal text-zinc-600">2021 – Present</span>
              </div>
              <p className="italic text-zinc-700 text-[10.5px]">MegaCorp Enterprise Solutions LLC — New York, NY</p>
              <ul className="list-disc list-outside ml-4 mt-1 space-y-1 text-zinc-800 text-[10px] sm:text-[10.5px]">
                <li>Spearheaded enterprise-wide operationalization of holistic cross-pod synchronization mechanisms, resulting in 42 recurring bi-weekly status syncs across 17 regional time zones.</li>
                <li>Orchestrated high-level strategic alignment between upstream ideation cohorts and downstream execution vectors to mitigate cognitive bandwidth fatigue.</li>
                <li>Leveraged best-of-breed industry paradigms to synthesize quantitative deliverables into 84-slide executive summary decks for senior VP review committees.</li>
                <li>Facilitated quarterly retrospectives to analyze non-value-add conversational touchpoints and instituted mandatory pre-meeting alignment briefings.</li>
              </ul>
            </div>

            <div className="mt-3">
              <div className="flex justify-between font-sans font-bold text-zinc-900">
                <span>Director of Holistic Paradigm Modernization</span>
                <span className="font-mono font-normal text-zinc-600">2018 – 2021</span>
              </div>
              <p className="italic text-zinc-700 text-[10.5px]">Synergy Ventures International — Chicago, IL</p>
              <ul className="list-disc list-outside ml-4 mt-1 space-y-1 text-zinc-800 text-[10px] sm:text-[10.5px]">
                <li>Championed enterprise digital agility through systematic re-engineering of legacy email thread topologies into structured spreadsheet matrices.</li>
                <li>Authored comprehensive 114-page whitepaper on mitigating stakeholder friction in matrixed environments without impacting scheduled deliverables.</li>
                <li>Coordinated with 23 disparate sub-committees to evaluate cloud-native synergy platforms before ultimately deciding to maintain existing workflow unchanged.</li>
                <li>Achieved 100% compliance with corporate acronym utilization standards across all outward-facing internal memorandums.</li>
              </ul>
            </div>

            <div className="mt-3">
              <div className="flex justify-between font-sans font-bold text-zinc-900">
                <span>Lead Cross-Functional Value Creation Specialist</span>
                <span className="font-mono font-normal text-zinc-600">2015 – 2018</span>
              </div>
              <p className="italic text-zinc-700 text-[10.5px]">Apex Industrial Holdings — Boston, MA</p>
              <ul className="list-disc list-outside ml-4 mt-1 space-y-1 text-zinc-800 text-[10px] sm:text-[10.5px]">
                <li>Established baseline operational benchmarks for recurring standup durations and implemented automated timer protocols to enforce strict 45-minute limits.</li>
                <li>Synthesized disparate cross-departmental feedback into actionable Venn diagrams and Gantt charts for quarterly board presentations.</li>
              </ul>
            </div>
          </div>

          {/* Education & Pedigree */}
          <div className="mt-4 border-t border-zinc-300 pt-2 text-[10px] text-zinc-600 font-sans">
            <span className="font-bold text-zinc-900">Education: </span>
            MBA in Theoretical Corporate Synergies • B.S. in Generic Management Administration (Magna Cum Mediocre)
          </div>

        </div>
      </div>

      {/* Dark Vignette Overlay for floating aesthetic */}
      <div 
        className={`fixed inset-0 transition-opacity duration-150 pointer-events-none ${
          isTerrifyingPeek 
            ? 'opacity-0' 
            : 'bg-gradient-to-b from-[#09090b]/80 via-[#09090b]/85 to-[#09090b]/95 opacity-100 z-10'
        }`} 
      />

      {/* Subtle Ambient Radial Glow */}
      <div className="absolute w-[520px] h-[520px] rounded-full bg-rose-600/10 blur-[130px] pointer-events-none z-10" />

      {/* ========================================================================= */}
      {/* CENTER SLEEK GLASSMORPHISM CARD */}
      {/* ========================================================================= */}
      <div 
        className={`relative z-20 w-full max-w-xl mx-auto rounded-3xl bg-zinc-900/65 backdrop-blur-2xl border border-zinc-800/80 p-8 sm:p-12 shadow-[0_25px_80px_rgba(0,0,0,0.85)] text-center transition-all duration-200 ${
          isTerrifyingPeek ? 'opacity-20 scale-95 pointer-events-none' : 'opacity-100 scale-100'
        }`}
      >
        
        {/* Top Kicker Tag */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-zinc-800/80 border border-zinc-700/60 text-zinc-400 text-xs font-mono uppercase tracking-widest mb-6 shadow-inner">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
          <span>The Ultimatum</span>
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-4 leading-tight">
          You've read 2,000 hire resumes this past hiring cycle.
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base text-zinc-300 max-w-md mx-auto leading-relaxed mb-8">
          You can either go ahead and read the boring resume, or shred this BS.
        </p>

        {/* Pop-up text banner & button after reading boring resume */}
        {showBoringWarning && (
          <div className="mb-6 p-3.5 sm:p-4 rounded-2xl bg-amber-950/70 border border-amber-500/50 text-amber-200 text-xs sm:text-sm flex items-center justify-between gap-3 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex items-center gap-2.5 text-left font-semibold">
              <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />
              <span>Boring, right? Just go ahead and shred this BS.</span>
            </div>
            <button 
              type="button" 
              onClick={onShred}
              className="px-3.5 py-1.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider shrink-0 transition shadow-lg shadow-red-600/30 flex items-center gap-1.5 cursor-pointer active:scale-95"
            >
              <Flame className="w-3.5 h-3.5" />
              <span>Shred It</span>
            </button>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TWO LARGE BUTTONS SIDE BY SIDE */}
        {/* ========================================================================= */}
        <div className="flex flex-col sm:flex-row items-stretch gap-4 justify-center">
          
          {/* Button 1: Read my resume (Dull gray outline, triggers 500ms terrifying peek) */}
          <button
            type="button"
            onClick={handleReadResume}
            className="flex-1 py-4 px-6 rounded-2xl bg-transparent hover:bg-zinc-850/50 text-zinc-400 hover:text-zinc-200 border border-zinc-700/70 hover:border-zinc-500 text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 active:scale-98 cursor-pointer shadow-sm group"
          >
            <FileText className="w-4 h-4 text-zinc-500 group-hover:text-zinc-300" />
            <span>Read my resume</span>
          </button>

          {/* Button 2: Shred this BS (Bright red, glowing hover effect) */}
          <button
            type="button"
            onClick={onShred}
            className="flex-1 py-4 px-6 rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-red-600 hover:from-red-500 hover:via-rose-500 hover:to-red-500 text-white font-extrabold text-sm tracking-wider uppercase shadow-[0_0_25px_rgba(239,68,68,0.5)] hover:shadow-[0_0_45px_rgba(239,68,68,0.9)] border border-red-400/40 transition-all duration-200 flex items-center justify-center gap-2.5 active:scale-95 cursor-pointer animate-pulse-glow"
          >
            <Flame className="w-4 h-4 text-red-200" />
            <span>Shred this BS</span>
          </button>

        </div>

        {/* Micro footer */}
        <p className="text-[11px] font-mono text-zinc-500 mt-6 flex items-center justify-center gap-2">
          <span>Fast</span>
          <span>•</span>
          <span>Zero Fluff</span>
          <span>•</span>
          <span>Live Pipeline Operations</span>
        </p>

      </div>
    </div>
  );
}
