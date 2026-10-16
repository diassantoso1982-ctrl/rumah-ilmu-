import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Square } from 'lucide-react';
import { voiceGuideService } from '../services/voiceGuideService';

interface AudioNarratorButtonProps {
  textToSpeak: string;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'amber' | 'emerald' | 'blue' | 'purple' | 'rose' | 'ghost';
  className?: string;
}

export const AudioNarratorButton: React.FC<AudioNarratorButtonProps> = ({
  textToSpeak,
  label = 'Dengarkan',
  size = 'sm',
  variant = 'amber',
  className = '',
}) => {
  const [isSpeakingThis, setIsSpeakingThis] = useState(false);

  useEffect(() => {
    const unsub = voiceGuideService.subscribe((speaking, text) => {
      // Check if current utterance text matches this button's text
      if (speaking && text === textToSpeak) {
        setIsSpeakingThis(true);
      } else {
        setIsSpeakingThis(false);
      }
    });
    return unsub;
  }, [textToSpeak]);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSpeakingThis) {
      voiceGuideService.stop();
    } else {
      voiceGuideService.speak(textToSpeak);
    }
  };

  const variantStyles = {
    amber: isSpeakingThis
      ? 'bg-rose-600 text-white border-rose-600'
      : 'bg-amber-100 hover:bg-amber-200 text-amber-900 border-amber-300',
    emerald: isSpeakingThis
      ? 'bg-rose-600 text-white border-rose-600'
      : 'bg-emerald-100 hover:bg-emerald-200 text-emerald-900 border-emerald-300',
    blue: isSpeakingThis
      ? 'bg-rose-600 text-white border-rose-600'
      : 'bg-blue-100 hover:bg-blue-200 text-blue-900 border-blue-300',
    purple: isSpeakingThis
      ? 'bg-rose-600 text-white border-rose-600'
      : 'bg-purple-100 hover:bg-purple-200 text-purple-900 border-purple-300',
    rose: isSpeakingThis
      ? 'bg-slate-900 text-white border-slate-900'
      : 'bg-rose-100 hover:bg-rose-200 text-rose-900 border-rose-300',
    ghost: isSpeakingThis
      ? 'bg-rose-500 text-white border-rose-500'
      : 'bg-white/80 hover:bg-white text-slate-700 border-slate-200',
  };

  const sizeStyles = {
    sm: 'text-2xs py-1 px-2.5 rounded-lg gap-1.5',
    md: 'text-xs py-1.5 px-3 rounded-xl gap-2',
    lg: 'text-sm py-2 px-4 rounded-2xl gap-2.5',
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-3.5 h-3.5',
    lg: 'w-4 h-4',
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      className={`inline-flex items-center font-bold border transition-all active:scale-95 shadow-2xs cursor-pointer ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      title={isSpeakingThis ? 'Hentikan Audio' : `Dengarkan: ${label}`}
    >
      {isSpeakingThis ? (
        <>
          <Square className={`${iconSizes[size]} fill-current animate-pulse`} />
          <span>Hentikan</span>
          <span className="flex items-center gap-0.5 h-2.5 ml-0.5">
            <span className="w-0.5 bg-current h-full animate-bounce" />
            <span className="w-0.5 bg-current h-1.5 animate-bounce delay-100" />
            <span className="w-0.5 bg-current h-full animate-bounce delay-200" />
          </span>
        </>
      ) : (
        <>
          <Volume2 className={iconSizes[size]} />
          {label && <span>{label}</span>}
        </>
      )}
    </button>
  );
};
