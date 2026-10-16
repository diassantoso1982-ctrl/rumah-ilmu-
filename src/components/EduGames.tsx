import React, { useState } from 'react';
import { EduGame } from '../types';
import { SAMPLE_GAMES } from '../data/mockData';
import { RotateCw, Sparkles, Star, Trophy, Award, CheckCircle2, ArrowRight, Dices, HelpCircle } from 'lucide-react';
import { AudioNarratorButton } from './AudioNarratorButton';
import { soundManager } from '../services/soundEffects';
import { voiceGuideService } from '../services/voiceGuideService';

interface EduGamesProps {
  onAddStar?: () => void;
}

export const EduGames: React.FC<EduGamesProps> = ({ onAddStar }) => {
  const [activeGameId, setActiveGameId] = useState<string>('game-roda-1');
  const [totalGamePoints, setTotalGamePoints] = useState(60);

  // 1. Roda Pertanyaan State
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [selectedSegment, setSelectedSegment] = useState<any>(null);
  const [showWheelAnswer, setShowWheelAnswer] = useState(false);

  // 2. Susun Kata State
  const [wordIdx, setWordIdx] = useState(0);
  const [selectedLetters, setSelectedLetters] = useState<string[]>([]);
  const [wordFeedback, setWordFeedback] = useState<string | null>(null);

  // 3. Detektif Konsep State
  const [detektifIdx, setDetektifIdx] = useState(0);
  const [detektifResult, setDetektifResult] = useState<string | null>(null);

  // 4. Dadu Edukasi State
  const [rollingDice, setRollingDice] = useState(false);
  const [diceNumber, setDiceNumber] = useState(3);
  const [diceMissionDone, setDiceMissionDone] = useState(false);

  // Wheel Spin Handler
  const spinWheel = () => {
    if (spinning) return;
    setSpinning(true);
    setShowWheelAnswer(false);
    setSelectedSegment(null);
    soundManager.playWhoosh();

    const extraDeg = 1440 + Math.floor(Math.random() * 360);
    const newRot = rotation + extraDeg;
    setRotation(newRot);

    setTimeout(() => {
      setSpinning(false);
      soundManager.playChime();
      const gameObj = SAMPLE_GAMES.find(g => g.id === 'game-roda-1');
      const segments = gameObj?.content.segments || [];
      const chosen = segments[Math.floor(Math.random() * segments.length)];
      setSelectedSegment(chosen);
      if (chosen) {
        voiceGuideService.speak(`Pertanyaan roda: ${chosen.question}`);
      }
    }, 2500);
  };

  const handleClaimWheelPoints = () => {
    if (selectedSegment) {
      soundManager.playStarSuccess();
      setTotalGamePoints(prev => prev + selectedSegment.points);
      if (onAddStar) onAddStar();
      setShowWheelAnswer(true);
      voiceGuideService.speak(`Hebat! Jawaban yang benar adalah: ${selectedSegment.answer}. Kamu mendapatkan ${selectedSegment.points} poin!`);
    }
  };

  // Word Unscramble Handlers
  const currentPuzzle = SAMPLE_GAMES.find(g => g.id === 'game-susun-kata-1')?.content.puzzles[wordIdx];
  const puzzleLetters = currentPuzzle ? currentPuzzle.scrambled.split(' - ') : [];

  const handlePickLetter = (letter: string) => {
    soundManager.playPop();
    setSelectedLetters(prev => [...prev, letter]);
  };

  const handleResetLetters = () => {
    soundManager.playPop();
    setSelectedLetters([]);
    setWordFeedback(null);
  };

  const handleCheckWord = () => {
    if (!currentPuzzle) return;
    const constructed = selectedLetters.join('');
    if (constructed.toUpperCase() === currentPuzzle.correct.toUpperCase()) {
      soundManager.playFanfare();
      setWordFeedback('🎉 TEPAT SEKALI! Keren banget susunan katamu!');
      setTotalGamePoints(prev => prev + 25);
      voiceGuideService.speak(`Tepat sekali! Kata yang terbentuk adalah ${currentPuzzle.correct}. Kamu mendapat dua puluh lima poin!`);
      if (onAddStar) onAddStar();
    } else {
      soundManager.playGentleBell();
      setWordFeedback('💡 Belum tepat, yuk susun ulang hurufnya!');
      voiceGuideService.speak('Belum tepat, jangan berkecil hati. Yuk kita coba susun kembali!');
    }
  };

  const handleNextWord = () => {
    soundManager.playPop();
    setWordIdx(prev => (prev + 1) % 4);
    setSelectedLetters([]);
    setWordFeedback(null);
  };

  // Dice Roller
  const rollDice = () => {
    if (rollingDice) return;
    setRollingDice(true);
    setDiceMissionDone(false);
    soundManager.playDice();

    let count = 0;
    const interval = setInterval(() => {
      setDiceNumber(Math.floor(Math.random() * 6) + 1);
      count++;
      if (count > 10) {
        clearInterval(interval);
        setRollingDice(false);
        soundManager.playChime();
        const face = SAMPLE_GAMES.find(g => g.id === 'game-dadu-1')?.content.diceFaces.find(
          (d: any) => d.number === diceNumber
        );
        if (face) {
          voiceGuideService.speak(`Dadu berhenti di angka ${diceNumber}! Misimu adalah: ${face.challenge}`);
        }
      }
    }, 100);
  };

  const currentDiceFace = SAMPLE_GAMES.find(g => g.id === 'game-dadu-1')?.content.diceFaces.find(
    (d: any) => d.number === diceNumber
  );

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      {/* Game Header */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 rounded-3xl p-6 md:p-8 text-white shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="bg-white/20 backdrop-blur-xs text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
            Ruang Bermain Edukatif
          </span>
          <h1 className="text-2xl md:text-4xl font-black font-display mt-2">
            🎮 Arena Game Rumah Ilmu
          </h1>
          <p className="text-white/90 text-sm mt-1">
            Belajar sambil bermain! Sentuh, dengarkan suara, dan kumpulkan bintang penghargaan!
          </p>
        </div>

        <div className="flex items-center gap-3 bg-white/20 backdrop-blur-xs p-3 px-5 rounded-2xl border border-white/30">
          <Trophy className="w-8 h-8 text-yellow-300" />
          <div>
            <p className="text-2xs font-extrabold uppercase text-white/80">Total Skor Game</p>
            <p className="text-2xl font-black font-display text-white">{totalGamePoints} Poin</p>
          </div>
        </div>
      </div>

      {/* Game Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {SAMPLE_GAMES.map((game) => (
          <button
            key={game.id}
            onClick={() => {
              soundManager.playPop();
              setActiveGameId(game.id);
            }}
            className={`p-4 rounded-2xl text-left border-2 transition active:scale-98 flex flex-col justify-between cursor-pointer ${
              activeGameId === game.id
                ? 'bg-amber-500 border-amber-500 text-white shadow-lg shadow-amber-500/20'
                : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800'
            }`}
          >
            <span className="text-2xl mb-2">{game.icon}</span>
            <div>
              <p className="font-extrabold text-sm leading-tight">{game.title}</p>
              <p className={`text-2xs mt-1 line-clamp-1 ${activeGameId === game.id ? 'text-white/80' : 'text-slate-500'}`}>
                {game.description}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Active Game Area */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-md border-2 border-slate-100">
        {/* GAME 1: RODA PERTANYAAN */}
        {activeGameId === 'game-roda-1' && (
          <div className="space-y-6 text-center">
            <h2 className="text-xl md:text-2xl font-black text-slate-900 font-display">
              🎡 Roda Putar Cerdas Numerasi
            </h2>
            <p className="text-sm text-slate-600 max-w-lg mx-auto">
              Putar roda untuk mendapatkan tantangan angka yang seru. Dengarkan suaranya, jawab, dan raih poinnya!
            </p>

            <div className="relative w-64 h-64 mx-auto my-6">
              {/* Pointer indicator */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-4 z-20 text-3xl">
                🔻
              </div>

              {/* Wheel circle */}
              <div
                className="w-full h-full rounded-full border-8 border-amber-300 shadow-2xl flex items-center justify-center transition-transform ease-out"
                style={{
                  transform: `rotate(${rotation}deg)`,
                  transitionDuration: spinning ? '2.5s' : '0s',
                  background: 'conic-gradient(#f59e0b 0% 16.6%, #3b82f6 16.6% 33.3%, #10b981 33.3% 50%, #ec4899 50% 66.6%, #8b5cf6 66.6% 83.3%, #f97316 83.3% 100%)'
                }}
              >
                <div className="w-20 h-20 rounded-full bg-white shadow-md flex items-center justify-center text-2xl font-black font-display text-slate-800 border-4 border-amber-200">
                  🎯
                </div>
              </div>
            </div>

            <div>
              <button
                onClick={spinWheel}
                disabled={spinning}
                className="px-8 py-4 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white font-black text-lg rounded-2xl shadow-xl shadow-amber-500/30 transition active:scale-95 cursor-pointer"
              >
                {spinning ? 'Roda Sedang Berputar... 🔄' : 'PUTAR RODA! 🎡'}
              </button>
            </div>

            {selectedSegment && (
              <div className="max-w-md mx-auto p-5 bg-amber-50 rounded-2xl border-2 border-amber-300 space-y-3 animate-in zoom-in-95">
                <span className="text-2xs font-extrabold uppercase bg-amber-200 text-amber-900 px-3 py-1 rounded-full">
                  Kategori: {selectedSegment.label} (+{selectedSegment.points} Poin)
                </span>
                <div className="flex items-center justify-between gap-2 mt-2">
                  <p className="text-base font-bold text-slate-900 text-left">
                    ❓ “{selectedSegment.question}”
                  </p>
                  <AudioNarratorButton
                    textToSpeak={`Tantangan kuis roda: ${selectedSegment.question}`}
                    label="Dengarkan"
                    variant="amber"
                  />
                </div>

                {showWheelAnswer ? (
                  <div className="p-3 bg-emerald-100 text-emerald-900 rounded-xl font-bold text-sm animate-in fade-in">
                    ✅ Jawaban: {selectedSegment.answer}! Poin sudah ditambahkan ke skormu!
                  </div>
                ) : (
                  <button
                    onClick={handleClaimWheelPoints}
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition cursor-pointer"
                  >
                    Buka Jawaban & Klaim Poin 🏆
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {/* GAME 2: SUSUN KATA */}
        {activeGameId === 'game-susun-kata-1' && currentPuzzle && (
          <div className="space-y-6 text-center max-w-xl mx-auto">
            <h2 className="text-xl md:text-2xl font-black text-slate-900 font-display">
              🧩 Susun Kata: Kosa Kata Sains
            </h2>
            <p className="text-xs text-slate-500">
              Kata {wordIdx + 1} dari 4 • Sentuh huruf-huruf di bawah untuk menyusun kata yang tepat!
            </p>

            <div className="p-4 bg-blue-50 rounded-2xl border border-blue-200 text-blue-900 text-sm flex items-center justify-between gap-3 text-left">
              <div>
                💡 <strong>Petunjuk:</strong> “{currentPuzzle.hint}”
              </div>
              <AudioNarratorButton
                textToSpeak={`Petunjuk kata rahasia: ${currentPuzzle.hint}`}
                label="Dengarkan Petunjuk"
                variant="blue"
              />
            </div>

            {/* Selected letters display */}
            <div className="min-h-[60px] p-3 rounded-2xl bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center gap-2 flex-wrap">
              {selectedLetters.length === 0 ? (
                <span className="text-slate-400 text-xs italic">Sentuh huruf di bawah ini untuk mulai menyusun</span>
              ) : (
                selectedLetters.map((l, idx) => (
                  <span
                    key={idx}
                    className="w-10 h-10 rounded-xl bg-amber-500 text-white font-black text-lg flex items-center justify-center shadow-md animate-in zoom-in-75"
                  >
                    {l}
                  </span>
                ))
              )}
            </div>

            {/* Letter pool buttons */}
            <div className="flex justify-center gap-2 flex-wrap">
              {puzzleLetters.map((letter: string, idx: number) => (
                <button
                  key={idx}
                  onClick={() => handlePickLetter(letter)}
                  className="w-12 h-12 rounded-2xl bg-white hover:bg-amber-100 text-slate-900 font-black text-lg border-2 border-slate-200 shadow-sm transition active:scale-90 cursor-pointer"
                >
                  {letter}
                </button>
              ))}
            </div>

            <div className="flex gap-3 justify-center pt-2">
              <button
                onClick={handleResetLetters}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl cursor-pointer"
              >
                Hapus Susunan 🔄
              </button>
              <button
                onClick={handleCheckWord}
                className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer"
              >
                Periksa Kata ✅
              </button>
              <button
                onClick={handleNextWord}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl cursor-pointer"
              >
                Kata Berikutnya ➡️
              </button>
            </div>

            {wordFeedback && (
              <div className="p-3 bg-amber-50 text-amber-950 rounded-xl text-sm font-bold border border-amber-200 animate-in fade-in">
                {wordFeedback}
              </div>
            )}
          </div>
        )}

        {/* GAME 3: DETEKTIF KONSEP */}
        {activeGameId === 'game-detektif-1' && (
          <div className="space-y-6 text-center max-w-xl mx-auto">
            <h2 className="text-xl md:text-2xl font-black text-slate-900 font-display">
              🔎 Detektif Fakta & Mitos
            </h2>
            <p className="text-sm text-slate-600">
              Uji ketelitianmu! Apakah pernyataan ini Fakta Benar atau Mitos Belaka?
            </p>

            {(() => {
              const gameObj = SAMPLE_GAMES.find(g => g.id === 'game-detektif-1');
              const statements = gameObj?.content.statements || [];
              const stmt = statements[detektifIdx] || statements[0];

              const handleChoice = (ans: boolean) => {
                if (ans === stmt.isTrue) {
                  soundManager.playFanfare();
                  setDetektifResult(`🎉 Hebat Detektif Cilik! ${stmt.explanation}`);
                  setTotalGamePoints(prev => prev + 20);
                  voiceGuideService.speak(`Tepat sekali! ${stmt.explanation}. Kamu mendapatkan dua puluh poin!`);
                  if (onAddStar) onAddStar();
                } else {
                  soundManager.playGentleBell();
                  setDetektifResult(`💡 Belum tepat. ${stmt.explanation}`);
                  voiceGuideService.speak(`Belum tepat ya. ${stmt.explanation}`);
                }
              };

              return (
                <div className="p-6 bg-slate-50 rounded-3xl border-2 border-slate-200 space-y-5">
                  <span className="text-4xl">🕵️‍♂️</span>
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-lg font-bold text-slate-900 text-left">
                      “{stmt.text}”
                    </p>
                    <AudioNarratorButton
                      textToSpeak={`Pernyataan detektif: ${stmt.text}. Apakah ini fakta atau mitos?`}
                      label="Bacakan"
                      variant="purple"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => handleChoice(true)}
                      className="py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-base rounded-2xl shadow-md transition active:scale-95 cursor-pointer"
                    >
                      FAKTA BENAR ✅
                    </button>
                    <button
                      onClick={() => handleChoice(false)}
                      className="py-4 bg-rose-600 hover:bg-rose-700 text-white font-black text-base rounded-2xl shadow-md transition active:scale-95 cursor-pointer"
                    >
                      MITOS SALAH ❌
                    </button>
                  </div>

                  {detektifResult && (
                    <div className="p-4 bg-amber-50 text-amber-950 rounded-2xl text-xs md:text-sm font-semibold border border-amber-200 animate-in fade-in">
                      {detektifResult}
                    </div>
                  )}

                  <div className="pt-2">
                    <button
                      onClick={() => {
                        soundManager.playPop();
                        setDetektifIdx(prev => (prev + 1) % statements.length);
                        setDetektifResult(null);
                      }}
                      className="text-xs text-blue-600 hover:underline font-bold cursor-pointer"
                    >
                      Kasus Berikutnya →
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* GAME 4: DADU EDUKASI */}
        {activeGameId === 'game-dadu-1' && (
          <div className="space-y-6 text-center max-w-xl mx-auto">
            <h2 className="text-xl md:text-2xl font-black text-slate-900 font-display">
              🎲 Dadu Edukasi & Misi Karakter
            </h2>
            <p className="text-sm text-slate-600">
              Kocok dadu dan tuntaskan aksi kebaikan atau tantangan belajar bersama keluarga!
            </p>

            <div className="my-6">
              <div className={`w-28 h-28 mx-auto rounded-3xl bg-amber-500 text-white shadow-xl flex items-center justify-center text-6xl font-black font-display border-4 border-amber-300 transition ${
                rollingDice ? 'animate-spin' : ''
              }`}>
                {diceNumber}
              </div>
            </div>

            <button
              onClick={rollDice}
              disabled={rollingDice}
              className="px-8 py-4 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white font-black text-lg rounded-2xl shadow-xl shadow-amber-500/30 transition active:scale-95 cursor-pointer"
            >
              {rollingDice ? 'Mengocok Dadu... 🎲' : 'KOCOK DADU! 🎲'}
            </button>

            {currentDiceFace && (
              <div className="p-5 bg-amber-50 rounded-2xl border-2 border-amber-200 space-y-3 mt-4">
                <span className="text-2xs font-extrabold uppercase bg-amber-200 text-amber-900 px-3 py-1 rounded-full">
                  Misi Dadu Nomor {diceNumber}
                </span>
                <div className="flex items-center justify-between gap-2">
                  <p className="text-base font-bold text-slate-900 text-left">
                    “{currentDiceFace.challenge}”
                  </p>
                  <AudioNarratorButton
                    textToSpeak={`Misi dadu nomor ${diceNumber}: ${currentDiceFace.challenge}`}
                    label="Bacakan Misi"
                    variant="amber"
                  />
                </div>

                {diceMissionDone ? (
                  <div className="p-3 bg-emerald-100 text-emerald-900 rounded-xl font-bold text-xs animate-in fade-in">
                    🌟 Misi selesai! Kamu anak hebat dan berhati mulia! (+15 Poin)
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      soundManager.playStarSuccess();
                      setDiceMissionDone(true);
                      setTotalGamePoints(prev => prev + 15);
                      voiceGuideService.speak('Misi berhasil kamu tuntaskan! Hebat sekali anak pintar!');
                      if (onAddStar) onAddStar();
                    }}
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition cursor-pointer"
                  >
                    ✅ Sudah Saya Lakukan!
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
