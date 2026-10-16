import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Headphones, Play, Square, Sparkles, HelpCircle } from 'lucide-react';
import { voiceGuideService, CONTEXTUAL_VOICE_PROMPTS } from '../services/voiceGuideService';

interface VoiceGuideFloatingButtonProps {
  activeNav: string;
  onOpenFullGuide: () => void;
}

export const VoiceGuideFloatingButton: React.FC<VoiceGuideFloatingButtonProps> = ({
  activeNav,
  onOpenFullGuide,
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showQuickMenu, setShowQuickMenu] = useState(false);

  useEffect(() => {
    const unsub = voiceGuideService.subscribe((speaking) => {
      setIsSpeaking(speaking);
    });
    return unsub;
  }, []);

  const handleSpeakCurrentPage = () => {
    const prompt = CONTEXTUAL_VOICE_PROMPTS[activeNav] ||
      'Selamat datang di Rumah Ilmu! Pilih menu yang ingin kamu pelajari atau klik Tur Pemandu Suara untuk panduan lengkap.';
    voiceGuideService.toggle(prompt);
  };

  const handleStop = () => {
    voiceGuideService.stop();
  };

  return (
    <div className="fixed bottom-5 left-5 z-40">
      {/* Quick Menu Popover */}
      {showQuickMenu && (
        <div className="mb-3 bg-white rounded-3xl p-4 shadow-2xl border-4 border-amber-300 w-72 space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-150">
          <div className="flex items-center justify-between border-b border-amber-100 pb-2">
            <div className="flex items-center gap-1.5 text-xs font-black text-slate-800">
              <Headphones className="w-4 h-4 text-amber-600" />
              <span>Pemandu Suara Pintar</span>
            </div>
            <button
              onClick={() => setShowQuickMenu(false)}
              className="text-slate-400 hover:text-slate-600 text-xs font-bold"
            >
              ✕
            </button>
          </div>

          <p className="text-2xs text-slate-600 leading-snug">
            Tekan tombol di bawah ini jika kamu butuh bantuan suara untuk halaman ini atau ingin panduan lengkap:
          </p>

          <button
            onClick={() => {
              handleSpeakCurrentPage();
              setShowQuickMenu(false);
            }}
            className="w-full flex items-center justify-center gap-2 p-3 bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs rounded-2xl shadow-md transition active:scale-95"
          >
            <Volume2 className="w-4 h-4" />
            <span>{isSpeaking ? 'Hentikan Suara ⏹️' : 'Dengarkan Petunjuk Halaman 🔊'}</span>
          </button>

          <button
            onClick={() => {
              setShowQuickMenu(false);
              onOpenFullGuide();
            }}
            className="w-full flex items-center justify-center gap-2 p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-2xl border border-slate-200 transition active:scale-95"
          >
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>Buka Tur Suara Lengkap 🎙️</span>
          </button>
        </div>
      )}

      {/* Main Floating Audio Button */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setShowQuickMenu(!showQuickMenu)}
          className={`flex items-center gap-2 px-4 py-3 rounded-full font-black text-xs shadow-2xl border-2 transition active:scale-95 ${
            isSpeaking
              ? 'bg-rose-600 text-white border-white animate-pulse'
              : 'bg-white hover:bg-amber-50 text-slate-900 border-amber-300 shadow-amber-900/10'
          }`}
          title="Bantuan Suara Rumah Ilmu"
        >
          <div className="w-7 h-7 rounded-full bg-amber-100 flex items-center justify-center text-base shrink-0">
            {isSpeaking ? '🔊' : '🎙️'}
          </div>
          <div className="text-left hidden sm:block">
            <span className="block text-2xs uppercase tracking-wider font-extrabold text-amber-800">
              {isSpeaking ? 'Sedang Berbicara' : 'Bantuan Suara'}
            </span>
            <span className="block text-3xs text-slate-500 font-medium">
              {isSpeaking ? 'Klik untuk jeda' : 'Petunjuk Suara'}
            </span>
          </div>

          {/* Equalizer animation when speaking */}
          {isSpeaking && (
            <div className="flex items-center gap-0.5 ml-1 h-3">
              <span className="w-1 bg-white h-full animate-bounce" />
              <span className="w-1 bg-white h-2 animate-bounce delay-100" />
              <span className="w-1 bg-white h-full animate-bounce delay-200" />
            </div>
          )}
        </button>

        {isSpeaking && (
          <button
            onClick={handleStop}
            className="p-3 bg-slate-900 hover:bg-black text-white rounded-full shadow-lg text-xs"
            title="Hentikan Suara"
          >
            <Square className="w-3.5 h-3.5 fill-white" />
          </button>
        )}
      </div>
    </div>
  );
};
