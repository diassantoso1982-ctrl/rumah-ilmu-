import React, { useState } from 'react';
import { QuizQuestion } from '../types';
import { CheckCircle2, XCircle, Award, RotateCcw, ArrowRight, Sparkles, Star } from 'lucide-react';
import { AudioNarratorButton } from './AudioNarratorButton';
import { soundManager } from '../services/soundEffects';
import { voiceGuideService } from '../services/voiceGuideService';

interface QuizInteractiveProps {
  title: string;
  questions: QuizQuestion[];
  onComplete?: (score: number) => void;
  onAddStar?: () => void;
}

export const QuizInteractive: React.FC<QuizInteractiveProps> = ({
  title,
  questions,
  onComplete,
  onAddStar,
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, any>>({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState(0);

  const currentQ = questions[currentIdx];

  const handleSelectOption = (ans: any) => {
    if (showFeedback) return;
    setSelectedAnswers(prev => ({ ...prev, [currentIdx]: ans }));
    setShowFeedback(true);

    const isCorrect = String(ans).toLowerCase().trim() === String(currentQ.correctAnswer).toLowerCase().trim();
    if (isCorrect) {
      soundManager.playStarSuccess();
      const praise = currentQ.encouragement || 'Luar biasa! Jawabanmu tepat sekali!';
      voiceGuideService.speak(`Benar! ${praise}. ${currentQ.explanation}`);
      if (onAddStar) onAddStar();
    } else {
      soundManager.playGentleBell();
      voiceGuideService.speak(`Tidak apa-apa, kamu sudah hebat mencoba. Penjelasannya: ${currentQ.explanation}`);
    }
  };

  const handleNext = () => {
    soundManager.playPop();
    setShowFeedback(false);
    voiceGuideService.stop();
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      // Calculate final score
      let correctCount = 0;
      questions.forEach((q, idx) => {
        const userAns = selectedAnswers[idx];
        if (String(userAns).toLowerCase().trim() === String(q.correctAnswer).toLowerCase().trim()) {
          correctCount++;
        }
      });
      const finalScore = Math.round((correctCount / questions.length) * 100);
      setScore(finalScore);
      setIsFinished(true);
      soundManager.playFanfare();
      voiceGuideService.speak(`Selamat! Kamu telah menyelesaikan kuis ${title} dengan skor ${finalScore}! Kamu luar biasa!`);
      if (onComplete) onComplete(finalScore);
    }
  };

  const handleReset = () => {
    soundManager.playPop();
    setCurrentIdx(0);
    setSelectedAnswers({});
    setShowFeedback(false);
    setIsFinished(false);
    setScore(0);
    voiceGuideService.stop();
  };

  if (isFinished) {
    return (
      <div className="max-w-xl mx-auto bg-white rounded-3xl p-8 shadow-xl border-4 border-amber-300 text-center space-y-6 animate-in zoom-in-95 duration-200">
        <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-tr from-amber-400 to-yellow-300 flex items-center justify-center text-5xl shadow-lg animate-bounce">
          🎉
        </div>

        <div>
          <h2 className="text-3xl font-black text-slate-900 font-display">
            {score >= 80 ? '🎉 Hebat Luar Biasa!' : '🌟 Usaha yang Sangat Bagus!'}
          </h2>
          <p className="text-slate-600 text-sm mt-1">
            Kamu telah menyelesaikan kuis <strong>{title}</strong>
          </p>
        </div>

        <div className="inline-block p-6 bg-amber-50 rounded-3xl border-2 border-amber-200">
          <p className="text-xs uppercase font-extrabold tracking-wider text-amber-700">Skor Akhir</p>
          <div className="text-5xl font-black text-amber-600 font-display mt-1">
            {score}
          </div>
          <div className="flex items-center justify-center gap-1 mt-2 text-amber-500">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} className="w-5 h-5 fill-amber-400 text-amber-500" />
            ))}
          </div>
        </div>

        <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs md:text-sm text-emerald-900 leading-relaxed font-medium">
          {score >= 70
            ? '“Kamu sudah menguasai materi ini dengan sangat baik. Pertahankan semangat belajarmu!”'
            : '“Tidak apa-apa. Yuk, coba pahami kembali materi ini bersama guru atau orang tua. Setiap kali mencoba, kamu semakin pintar!”'}
        </div>

        <div className="flex gap-3 justify-center">
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl text-sm transition cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" /> Ulangi Kuis 🔄
          </button>
        </div>
      </div>
    );
  }

  const isCurrentCorrect =
    String(selectedAnswers[currentIdx]).toLowerCase().trim() ===
    String(currentQ.correctAnswer).toLowerCase().trim();

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-3xl p-6 md:p-8 shadow-md border-2 border-slate-100 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div>
          <span className="text-2xs font-extrabold uppercase bg-amber-100 text-amber-800 px-3 py-1 rounded-full">
            Kuis Interaktif Ceria
          </span>
          <h3 className="text-lg md:text-xl font-black text-slate-900 mt-1 font-display">
            {title}
          </h3>
        </div>
        <div className="text-right">
          <span className="text-xs font-bold text-slate-400">Soal</span>
          <div className="text-lg font-black text-amber-600 font-display">
            {currentIdx + 1} / {questions.length}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
        <div
          className="bg-amber-500 h-full rounded-full transition-all duration-300"
          style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* Question */}
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-3 bg-amber-50/50 p-4 rounded-2xl border border-amber-100">
          <p className="text-base md:text-lg font-bold text-slate-900 leading-snug">
            {currentQ.question}
          </p>
          <AudioNarratorButton
            textToSpeak={`Soal nomor ${currentIdx + 1}: ${currentQ.question}. ${currentQ.options ? `Pilihan jawabannya: ${currentQ.options.join(', ')}` : ''}`}
            label="Bacakan Soal"
            variant="amber"
            size="sm"
          />
        </div>

        {/* Options */}
        {currentQ.type === 'pilihan_ganda' && currentQ.options && (
          <div className="grid grid-cols-1 gap-2.5">
            {currentQ.options.map((opt, idx) => {
              const isSelected = selectedAnswers[currentIdx] === opt;
              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(opt)}
                  disabled={showFeedback}
                  className={`p-4 rounded-2xl text-left font-bold text-sm border-2 transition active:scale-98 flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? isCurrentCorrect
                        ? 'bg-emerald-500 border-emerald-500 text-white'
                        : 'bg-amber-500 border-amber-500 text-white'
                      : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800'
                  }`}
                >
                  <span>{opt}</span>
                  <div className="flex items-center gap-2">
                    <AudioNarratorButton
                      textToSpeak={`Pilihan: ${opt}`}
                      label=""
                      size="sm"
                      variant="ghost"
                    />
                    {isSelected && (
                      <span>{isCurrentCorrect ? '✅' : '💡'}</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {currentQ.type === 'benar_salah' && (
          <div className="grid grid-cols-2 gap-4">
            {[true, false].map((val) => {
              const label = val ? 'Benar ✅' : 'Salah ❌';
              const isSelected = selectedAnswers[currentIdx] === val;
              return (
                <button
                  key={label}
                  onClick={() => handleSelectOption(val)}
                  disabled={showFeedback}
                  className={`py-5 px-4 rounded-2xl font-black text-base border-2 transition active:scale-98 cursor-pointer ${
                    isSelected
                      ? isCurrentCorrect
                        ? 'bg-emerald-500 border-emerald-500 text-white'
                        : 'bg-amber-500 border-amber-500 text-white'
                      : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        )}

        {currentQ.type === 'isian' && (
          <div className="space-y-2">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Ketik jawabanmu di sini..."
                disabled={showFeedback}
                value={selectedAnswers[currentIdx] || ''}
                onChange={(e) => setSelectedAnswers(prev => ({ ...prev, [currentIdx]: e.target.value }))}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && selectedAnswers[currentIdx]) {
                    handleSelectOption(selectedAnswers[currentIdx]);
                  }
                }}
                className="flex-1 p-3.5 rounded-2xl border-2 border-slate-300 font-bold text-sm bg-white focus:outline-none focus:border-amber-500"
              />
              <button
                onClick={() => handleSelectOption(selectedAnswers[currentIdx] || '')}
                disabled={showFeedback || !selectedAnswers[currentIdx]}
                className="px-6 py-3.5 bg-amber-500 hover:bg-amber-600 disabled:opacity-40 text-white font-bold rounded-2xl text-sm cursor-pointer"
              >
                Cek Jawaban ✅
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Immediate Child-Friendly Feedback */}
      {showFeedback && (
        <div className={`p-4 rounded-2xl border-2 space-y-2 animate-in fade-in ${
          isCurrentCorrect
            ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
            : 'bg-amber-50 border-amber-200 text-amber-900'
        }`}>
          <div className="flex items-center gap-2 font-bold text-sm">
            {isCurrentCorrect ? (
              <>
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>🎉 {currentQ.encouragement || 'Hebat sekali! Jawabanmu benar!'}</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 text-amber-600" />
                <span>Tidak apa-apa. Yuk, coba pahami kembali materi ini.</span>
              </>
            )}
          </div>
          <p className="text-xs text-slate-700 leading-relaxed pl-7">
            {currentQ.explanation}
          </p>

          <div className="pt-2 flex justify-end">
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition cursor-pointer"
            >
              <span>{currentIdx < questions.length - 1 ? 'Soal Berikutnya' : 'Lihat Hasil Akhir'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
