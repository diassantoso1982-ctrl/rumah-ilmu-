import React, { useState, useEffect } from 'react';
import {
  X,
  Volume2,
  VolumeX,
  Play,
  Square,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  School,
  Users,
  BookOpen,
  Headphones,
  CheckCircle2,
  HelpCircle,
  ExternalLink
} from 'lucide-react';
import { voiceGuideService, VOICE_GUIDE_SCRIPTS, GuideStep, VoiceCharacter } from '../services/voiceGuideService';
import { soundManager } from '../services/soundEffects';

interface AudioGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialRole?: 'guru' | 'orang_tua' | 'siswa' | 'umum';
  onNavigateToTab?: (tab: string) => void;
}

export const AudioGuideModal: React.FC<AudioGuideModalProps> = ({
  isOpen,
  onClose,
  initialRole = 'umum',
  onNavigateToTab,
}) => {
  const [selectedRole, setSelectedRole] = useState<'umum' | 'guru' | 'orang_tua' | 'siswa'>(initialRole);
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [spokenText, setSpokenText] = useState('');
  const [speechRate, setSpeechRate] = useState<number>(0.92);
  const [voiceChar, setVoiceChar] = useState<VoiceCharacter>('ceria');

  const scriptList: GuideStep[] = VOICE_GUIDE_SCRIPTS[selectedRole] || VOICE_GUIDE_SCRIPTS.umum;
  const currentStep = scriptList[currentStepIdx] || scriptList[0];

  useEffect(() => {
    const unsubscribe = voiceGuideService.subscribe((speaking, text) => {
      setIsSpeaking(speaking);
      setSpokenText(text);
    });
    return () => {
      unsubscribe();
      voiceGuideService.stop();
    };
  }, []);

  useEffect(() => {
    // When role changes, reset to step 0 and stop existing audio
    setCurrentStepIdx(0);
    voiceGuideService.stop();
  }, [selectedRole]);

  if (!isOpen) return null;

  const handlePlayVoice = () => {
    voiceGuideService.speak(currentStep.speechText);
  };

  const handleStopVoice = () => {
    voiceGuideService.stop();
  };

  const handleNextStep = () => {
    voiceGuideService.stop();
    if (currentStepIdx < scriptList.length - 1) {
      setCurrentStepIdx(prev => prev + 1);
    }
  };

  const handlePrevStep = () => {
    voiceGuideService.stop();
    if (currentStepIdx > 0) {
      setCurrentStepIdx(prev => prev - 1);
    }
  };

  const handleClose = () => {
    voiceGuideService.stop();
    onClose();
  };

  const handleRateChange = (newRate: number) => {
    setSpeechRate(newRate);
    voiceGuideService.setRate(newRate);
    soundManager.playPop();
  };

  const handleCharacterChange = (char: VoiceCharacter) => {
    setVoiceChar(char);
    voiceGuideService.setVoiceCharacter(char);
    soundManager.playPop();
  };

  const handleJumpToFeature = () => {
    if (currentStep.suggestedNav && onNavigateToTab) {
      voiceGuideService.stop();
      onNavigateToTab(currentStep.suggestedNav);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full my-auto overflow-hidden shadow-2xl border-4 border-amber-300 animate-in fade-in zoom-in-95 duration-200">
        {/* Header with Friendly Avatar */}
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 p-6 text-white relative">
          <button
            onClick={handleClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-2xl bg-white text-slate-900 flex items-center justify-center text-3xl shadow-lg border-2 border-white/60 relative animate-float">
              🎙️
              {isSpeaking && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-rose-500" />
                </span>
              )}
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 bg-white/20 px-2.5 py-0.5 rounded-full text-2xs font-extrabold uppercase tracking-wider mb-1">
                <Headphones className="w-3.5 h-3.5" /> Pemandu Audio Interaktif
              </div>
              <h2 className="text-xl md:text-2xl font-black font-display tracking-tight">
                Pemandu Suara Rumah Ilmu
              </h2>
              <p className="text-white/90 text-xs font-medium">
                Dengarkan suara pemandu agar guru, orang tua, dan murid tidak bingung menggunakan aplikasi!
              </p>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 md:p-8 space-y-6 max-h-[72vh] overflow-y-auto">
          {/* Role Filter Tabs */}
          <div>
            <label className="block text-2xs font-extrabold uppercase tracking-wider text-slate-500 mb-2">
              Pilih Siapa yang Ingin Dipandu:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'umum', label: 'Pengenalan', icon: '🏠' },
                { id: 'guru', label: 'Untuk Guru', icon: '👩‍🏫' },
                { id: 'orang_tua', label: 'Untuk Orang Tua', icon: '👨‍👩‍👧' },
                { id: 'siswa', label: 'Untuk Murid', icon: '🧒' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedRole(tab.id as any)}
                  className={`p-2.5 rounded-xl text-xs font-bold border-2 transition active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer ${
                    selectedRole === tab.id
                      ? 'bg-amber-500 border-amber-500 text-white shadow-md'
                      : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Audio Tone & Speed Settings */}
          <div className="p-3 bg-amber-50/60 rounded-2xl border border-amber-200/80 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-700 text-2xs uppercase">Karakter Suara:</span>
              <div className="flex gap-1">
                {[
                  { id: 'ceria', label: '👧 Ceria' },
                  { id: 'ramah', label: '👩‍🏫 Ramah' },
                  { id: 'cilik', label: '🧒 Cilik' },
                ].map((c) => (
                  <button
                    key={c.id}
                    onClick={() => handleCharacterChange(c.id as VoiceCharacter)}
                    className={`px-2.5 py-1 rounded-lg text-2xs font-bold transition cursor-pointer ${
                      voiceChar === c.id
                        ? 'bg-amber-500 text-white font-black'
                        : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-700 text-2xs uppercase">Kecepatan:</span>
              <div className="flex gap-1">
                {[
                  { val: 0.82, label: '0.8x Santai' },
                  { val: 0.95, label: '1.0x Normal' },
                  { val: 1.15, label: '1.2x Cepat' },
                ].map((s) => (
                  <button
                    key={s.label}
                    onClick={() => handleRateChange(s.val)}
                    className={`px-2 py-1 rounded-lg text-2xs font-bold transition cursor-pointer ${
                      Math.abs(speechRate - s.val) < 0.05
                        ? 'bg-slate-900 text-white'
                        : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Stepper Indicator */}
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 border-b border-slate-100 pb-3">
            <span className="flex items-center gap-1.5 text-amber-800">
              <span className="w-6 h-6 rounded-full bg-amber-200 text-amber-900 flex items-center justify-center text-xs font-black">
                {currentStepIdx + 1}
              </span>
              Langkah {currentStepIdx + 1} dari {scriptList.length}
            </span>
            <div className="flex gap-1">
              {scriptList.map((_, i) => (
                <span
                  key={i}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    i === currentStepIdx ? 'bg-amber-500 w-6' : 'bg-slate-200'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Spoken Text Presentation & Highlight */}
          <div className="bg-amber-50/70 p-5 rounded-2xl border-2 border-amber-200 space-y-3 relative">
            <div className="flex items-center justify-between">
              <h3 className="text-base md:text-lg font-black text-slate-900 font-display">
                {currentStep.title}
              </h3>
              {isSpeaking && (
                <div className="flex items-center gap-1 text-2xs font-extrabold text-rose-600 bg-rose-100 px-2.5 py-0.5 rounded-full animate-pulse">
                  <Volume2 className="w-3.5 h-3.5" /> Sedang Membacakan...
                </div>
              )}
            </div>

            {/* Spoken Narration Box with active voice visualizer */}
            <div className="p-4 bg-white rounded-xl border border-amber-200/80 shadow-2xs space-y-2">
              <p className="text-sm md:text-base text-slate-800 font-medium leading-relaxed italic">
                “{currentStep.speechText}”
              </p>
              <div className="pt-2 border-t border-slate-100 text-xs text-slate-600 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Ringkasan:</strong> {currentStep.displaySummary}</span>
              </div>
            </div>

            {currentStep.highlightAction && (
              <div className="p-3 bg-blue-50 text-blue-900 rounded-xl border border-blue-200 text-xs font-semibold flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-blue-600 shrink-0" />
                  <span><strong>Aksi Nyata:</strong> {currentStep.highlightAction}</span>
                </div>
                {currentStep.suggestedNav && onNavigateToTab && (
                  <button
                    onClick={handleJumpToFeature}
                    className="flex items-center gap-1 px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-2xs font-bold transition shrink-0 cursor-pointer"
                  >
                    <span>Coba Langsung</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Voice Audio Controls */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            {!isSpeaking ? (
              <button
                onClick={handlePlayVoice}
                className="flex items-center gap-2.5 px-6 py-3.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black text-sm rounded-2xl shadow-lg shadow-amber-500/30 transition active:scale-95 cursor-pointer"
              >
                <Play className="w-5 h-5 fill-white" />
                <span>PUTAR SUARA PEMANDU 🔊</span>
              </button>
            ) : (
              <button
                onClick={handleStopVoice}
                className="flex items-center gap-2.5 px-6 py-3.5 bg-rose-600 hover:bg-rose-700 text-white font-black text-sm rounded-2xl shadow-lg shadow-rose-600/30 transition active:scale-95 cursor-pointer"
              >
                <Square className="w-4 h-4 fill-white" />
                <span>HENTIKAN SUARA ⏹️</span>
              </button>
            )}
          </div>

          {/* Step Navigation Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              onClick={handlePrevStep}
              disabled={currentStepIdx === 0}
              className="flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-700 font-bold text-xs rounded-xl transition cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" /> Langkah Sebelumnya
            </button>

            <button
              onClick={handleNextStep}
              disabled={currentStepIdx === scriptList.length - 1}
              className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 disabled:opacity-40 text-white font-bold text-xs rounded-xl transition cursor-pointer"
            >
              Langkah Berikutnya <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Footer Note */}
        <div className="bg-slate-50 p-4 px-6 border-t border-slate-200 text-center">
          <p className="text-xs text-slate-500">
            💡 <em>Pemandu suara ini menggunakan Bahasa Indonesia yang ramah anak dan mudah dimengerti guru, orang tua, maupun murid.</em>
          </p>
        </div>
      </div>
    </div>
  );
};
