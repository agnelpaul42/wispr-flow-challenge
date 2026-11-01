// Web Speech API Narrator Utility with Preloaded Natural Voice Cache
let cachedVoices = [];
let currentUtterance = null;

function loadVoices() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    cachedVoices = window.speechSynthesis.getVoices() || [];
  }
}

if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  loadVoices();
  window.speechSynthesis.onvoiceschanged = loadVoices;
}

function findBestVoice() {
  if (!cachedVoices.length) {
    loadVoices();
  }

  // Priority 1: High-fidelity natural neural / online voices
  const naturalKeywords = [
    'natural', 'online', 'neural', 'guy', 'christopher', 'ryan', 'daniel', 'google', 'alex', 'samantha'
  ];

  for (const keyword of naturalKeywords) {
    const match = cachedVoices.find(v => 
      v.lang.startsWith('en') && v.name.toLowerCase().includes(keyword)
    );
    if (match) return match;
  }

  // Priority 2: Any English voice
  const englishVoice = cachedVoices.find(v => v.lang.startsWith('en'));
  if (englishVoice) return englishVoice;

  return cachedVoices[0] || null;
}

export function speakText(text, onStart, onEnd, onError) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    if (onError) onError(new Error("Speech synthesis not supported in this browser"));
    return;
  }

  // Stop any active speech first
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  currentUtterance = utterance;

  const bestVoice = findBestVoice();
  if (bestVoice) {
    utterance.voice = bestVoice;
  }

  // Paced rate and calm pitch to avoid robotic tinny tone
  utterance.rate = 0.94;
  utterance.pitch = 0.97;
  utterance.volume = 1.0;

  utterance.onstart = () => {
    if (onStart) onStart();
  };

  utterance.onend = () => {
    currentUtterance = null;
    if (onEnd) onEnd();
  };

  utterance.onerror = (e) => {
    currentUtterance = null;
    if (onError) onError(e);
  };

  window.speechSynthesis.speak(utterance);
}

export function stopSpeaking() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    currentUtterance = null;
  }
}
