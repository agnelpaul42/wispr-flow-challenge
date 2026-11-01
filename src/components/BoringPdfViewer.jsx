import React, { useState } from 'react';
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCw, 
  Download, 
  Printer, 
  FileText, 
  Search, 
  ChevronLeft, 
  ChevronRight,
  Flame,
  AlertTriangle,
  Info
} from 'lucide-react';

export default function BoringPdfViewer({ onShred }) {
  const [zoom, setZoom] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const [showTooltip, setShowTooltip] = useState(false);
  const [boringAlert, setBoringAlert] = useState(false);

  const handleReadBoring = () => {
    setBoringAlert(true);
    setTimeout(() => setBoringAlert(false), 4500);
  };

  return (
    <div className="relative w-full min-h-screen flex flex-col bg-zinc-900 text-zinc-300 font-sans select-none">
      {/* Top PDF Toolbar Chrome */}
      <header className="h-14 bg-zinc-850 border-b border-zinc-800 px-4 flex items-center justify-between shadow-md shrink-0 z-20">
        <div className="flex items-center gap-3">
          <div className="p-1.5 rounded bg-red-950/60 border border-red-800/40 text-red-400">
            <FileText className="w-5 h-5" />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-sm font-medium text-zinc-200 truncate max-w-[260px] md:max-w-md">
              John_Doe_Standard_Generic_Resume_v4_FINAL(1).pdf
            </h1>
            <p className="text-[11px] text-zinc-500">PDF Document • 142 KB • Standard Letter</p>
          </div>
        </div>

        {/* Center Page & Navigation Controls */}
        <div className="flex items-center gap-1 sm:gap-2 bg-zinc-900/90 px-3 py-1 rounded-lg border border-zinc-800">
          <button 
            type="button"
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            className="p-1 hover:bg-zinc-800 rounded text-zinc-400 hover:text-zinc-200 transition"
            title="Previous Page"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-xs font-mono text-zinc-300 px-1">
            {currentPage} <span className="text-zinc-600">/</span> 2
          </span>
          <button 
            type="button"
            onClick={() => setCurrentPage(p => Math.min(2, p + 1))}
            className="p-1 hover:bg-zinc-800 rounded text-zinc-400 hover:text-zinc-200 transition"
            title="Next Page"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <div className="h-4 w-[1px] bg-zinc-800 mx-1 hidden sm:block" />

          {/* Zoom controls */}
          <button 
            type="button"
            onClick={() => setZoom(z => Math.max(70, z - 10))}
            className="p-1 hover:bg-zinc-800 rounded text-zinc-400 hover:text-zinc-200 transition hidden sm:inline-flex"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="text-xs font-mono text-zinc-400 w-10 text-center hidden sm:inline-block">
            {zoom}%
          </span>
          <button 
            type="button"
            onClick={() => setZoom(z => Math.min(140, z + 10))}
            className="p-1 hover:bg-zinc-800 rounded text-zinc-400 hover:text-zinc-200 transition hidden sm:inline-flex"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
        </div>

        {/* Right Action Icons */}
        <div className="flex items-center gap-1">
          <button 
            type="button" 
            onClick={() => setBoringAlert(true)}
            className="p-2 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/80 rounded transition" 
            title="Print"
          >
            <Printer className="w-4 h-4" />
          </button>
          <button 
            type="button" 
            onClick={() => setBoringAlert(true)}
            className="p-2 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/80 rounded transition" 
            title="Download"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Boring Alert Banner */}
      {boringAlert && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-30 max-w-lg w-11/12 bg-amber-950/90 border border-amber-600/60 rounded-xl p-3.5 shadow-2xl backdrop-blur text-amber-200 text-xs sm:text-sm flex items-start gap-3 animate-in fade-in slide-in-from-top-2 duration-200">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-semibold text-amber-300">Warning: Terminal Boredom Ahead</p>
            <p className="text-amber-200/90 text-xs mt-0.5">
              This document contains 94 generic buzzwords, 0 real pipeline metrics, and 12 bullet points about "cross-functional synergy." Smash the red button below to see the actual growth engine!
            </p>
          </div>
          <button 
            type="button"
            onClick={() => setBoringAlert(false)}
            className="text-amber-400 hover:text-amber-100 text-xs font-bold px-1.5 py-0.5 rounded"
          >
            ✕
          </button>
        </div>
      )}

      {/* PDF Viewport Area */}
      <main className="flex-1 overflow-auto bg-zinc-950/80 p-4 sm:p-8 flex justify-center items-start pb-32">
        <div 
          id="pdf-paper-sheet"
          style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center', transition: 'transform 0.15s ease-out' }}
          className="w-full max-w-2xl bg-[#fafafa] text-zinc-900 shadow-2xl rounded-sm p-8 sm:p-12 font-serif min-h-[820px] border border-zinc-300 relative selection:bg-amber-200 selection:text-zinc-900"
        >
          {/* Watermark */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.035] rotate-[-25deg]">
            <span className="text-8xl font-black font-sans tracking-widest text-zinc-900">BORING PDF</span>
          </div>

          {/* Resume Header */}
          <div className="border-b-2 border-zinc-800 pb-4 text-center">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900 uppercase font-sans">
              John "Standard Candidate" Doe
            </h2>
            <p className="text-xs font-mono text-zinc-600 mt-1">
              San Francisco, CA • (555) 019-2834 • applicant.standard.corp@email.com
            </p>
            <p className="text-xs text-zinc-500 italic mt-0.5">
              "Dedicated, enthusiastic self-starter with 360-degree organizational competency"
            </p>
          </div>

          {/* Resume Body: Professional Summary */}
          <div className="mt-6">
            <h3 className="text-xs font-bold font-sans tracking-wider uppercase text-zinc-800 border-b border-zinc-300 pb-1">
              Executive Summary
            </h3>
            <p className="text-xs text-zinc-700 leading-relaxed mt-2 text-justify">
              Results-oriented growth generalist with a proven track record of synergizing cross-functional deliverables, orchestrating high-level stakeholder paradigms, and leveraging mission-critical KPIs in fast-paced corporate ecosystems. Adept at attending recurring status updates, producing slide decks with multiple arrows, and facilitating quarterly alignment syncs.
            </p>
          </div>

          {/* Resume Body: Experience */}
          <div className="mt-6">
            <h3 className="text-xs font-bold font-sans tracking-wider uppercase text-zinc-800 border-b border-zinc-300 pb-1">
              Professional Experience
            </h3>

            <div className="mt-3">
              <div className="flex justify-between items-baseline font-sans">
                <span className="text-xs font-bold text-zinc-900">Senior Growth & Strategy Associate</span>
                <span className="text-[11px] font-mono text-zinc-500">2022 - Present</span>
              </div>
              <p className="text-xs italic text-zinc-600">Enterprise Synergy Solutions LLC — New York, NY</p>
              <ul className="list-disc list-outside ml-4 mt-1.5 space-y-1 text-xs text-zinc-700 leading-normal">
                <li>Spearheaded deep-dive exploratory ideation sessions to unpack downstream bandwidth friction.</li>
                <li>Leveraged low-hanging fruit to optimize agile touchpoints across 14 matrixed departments.</li>
                <li>Pioneered holistic 30,000-foot-view operational readiness frameworks for Q3 deliverables.</li>
                <li>Monitored multi-channel stakeholder engagement dashboards utilizing Microsoft PowerPoint 365.</li>
              </ul>
            </div>

            <div className="mt-4">
              <div className="flex justify-between items-baseline font-sans">
                <span className="text-xs font-bold text-zinc-900">Junior Cross-Platform Pipeline Analyst</span>
                <span className="text-[11px] font-mono text-zinc-500">2020 - 2022</span>
              </div>
              <p className="text-xs italic text-zinc-600">OmniChannel Paradigms Inc — Chicago, IL</p>
              <ul className="list-disc list-outside ml-4 mt-1.5 space-y-1 text-xs text-zinc-700 leading-normal">
                <li>Consistently hit all nominal benchmarks while formulating non-disruptive feedback loops.</li>
                <li>Analyzed outbound pipeline metrics and generated comprehensive 62-page weekly PDF digests.</li>
                <li>Participated in cross-pod standups and nodded affirmatively when executives mentioned revenue.</li>
              </ul>
            </div>
          </div>

          {/* Resume Body: Skills & Core Competencies */}
          <div className="mt-6">
            <h3 className="text-xs font-bold font-sans tracking-wider uppercase text-zinc-800 border-b border-zinc-300 pb-1">
              Core Competencies & Tooling
            </h3>
            <p className="text-xs text-zinc-700 leading-relaxed mt-2">
              <strong className="font-sans font-semibold">Methodologies:</strong> Waterfall, Agile, Buzzword Syndication, Asynchronous Email Chains, Meeting Scheduling.<br />
              <strong className="font-sans font-semibold">Software:</strong> Microsoft Excel (Conditional Formatting), Google Docs, Zoom, Slack (Available Status).
            </p>
          </div>

          {/* Resume Body: Education */}
          <div className="mt-6 border-t border-zinc-200 pt-3">
            <div className="flex justify-between items-baseline font-sans">
              <span className="text-xs font-bold text-zinc-900">B.S. in Standard Business Administration</span>
              <span className="text-[11px] font-mono text-zinc-500">Graduated Magna Cum Average</span>
            </div>
            <p className="text-xs text-zinc-600">University of Traditional Corporate Pedigree</p>
          </div>

          {/* Footer note */}
          <div className="mt-8 text-center text-[10px] text-zinc-400 font-mono">
            --- End of Page 1 of 2 • References Available Upon Lengthy Request ---
          </div>
        </div>
      </main>

      {/* Bottom Sticky Action Bar */}
      <footer className="fixed bottom-0 inset-x-0 bg-zinc-950/90 backdrop-blur-md border-t border-zinc-800/80 px-4 py-4 sm:py-5 flex flex-col sm:flex-row items-center justify-center gap-4 z-40 shadow-2xl">
        
        {/* Button 1: Read Boring PDF */}
        <div className="relative">
          <button
            type="button"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            onClick={handleReadBoring}
            className="px-5 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700/80 hover:border-zinc-500 text-sm font-medium transition-all duration-200 flex items-center gap-2 shadow-lg active:scale-95 cursor-pointer"
          >
            <Info className="w-4 h-4 text-zinc-400" />
            <span>Read Boring PDF</span>
          </button>

          {/* Tooltip */}
          {showTooltip && (
            <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 w-72 sm:w-80 p-3 bg-zinc-850 text-zinc-200 text-xs rounded-xl shadow-2xl border border-zinc-700 pointer-events-none transition-all duration-200 z-50 text-center animate-in fade-in zoom-in-95">
              <p className="font-semibold text-rose-400 mb-0.5">⚠️ Recruiter Eye Strain Warning</p>
              <p className="leading-snug">
                You've read 2,000 resumes in the last hiring cycle. Let us spare your eyes
              </p>
              {/* Arrow */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[1px] border-solid border-t-zinc-700 border-t-8 border-x-transparent border-x-8 border-b-0" />
            </div>
          )}
        </div>

        {/* Button 2: Big Red "SHRED THIS BS" */}
        <button
          type="button"
          onClick={onShred}
          className="group relative px-8 py-3.5 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-500 hover:via-rose-500 hover:to-red-600 text-white font-extrabold text-base tracking-wider uppercase shadow-[0_0_25px_rgba(239,68,68,0.45)] hover:shadow-[0_0_35px_rgba(239,68,68,0.75)] active:scale-95 transition-all duration-200 flex items-center gap-2.5 border border-red-400/40 cursor-pointer animate-pulse-glow"
        >
          <Flame className="w-5 h-5 text-red-200 group-hover:scale-110 group-hover:rotate-12 transition-transform" />
          <span className="drop-shadow-md">SHRED THIS BS</span>
          <span className="text-xs bg-red-950/60 border border-red-400/30 px-2 py-0.5 rounded text-red-200 font-mono ml-1">
            ⚡ CLICK ME
          </span>
        </button>

      </footer>
    </div>
  );
}
