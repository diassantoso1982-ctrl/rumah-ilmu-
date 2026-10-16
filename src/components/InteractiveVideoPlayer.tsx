import React, { useState, useEffect } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Sparkles,
  CheckCircle2,
  X,
  Star,
  Film,
  Tv,
  ArrowRight,
  ExternalLink,
  Search,
  Youtube,
  ShieldCheck
} from 'lucide-react';
import { voiceGuideService } from '../services/voiceGuideService';
import { soundManager } from '../services/soundEffects';
import { resolveYouTubeVideo, OFFICIAL_YOUTUBE_CHANNELS } from '../services/youtubeEducationService';

interface InteractiveVideoPlayerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  duration: string;
  topicId?: string;
  subjectId?: string;
  grade?: number;
  reflectionPrompt: string;
  youtubeId?: string;
  onAddStar?: () => void;
}

export const InteractiveVideoPlayer: React.FC<InteractiveVideoPlayerProps> = ({
  isOpen,
  onClose,
  title,
  duration,
  topicId = 'mat-5-pecahan',
  subjectId = 'matematika',
  grade = 5,
  reflectionPrompt,
  youtubeId,
  onAddStar,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // 0 to 100
  // Default mode connects directly to YouTube
  const [mode, setMode] = useState<'youtube' | 'animasi'>('youtube');
  const [isMuted, setIsMuted] = useState(false);
  const [currentCaption, setCurrentCaption] = useState('');
  const [hasCompleted, setHasCompleted] = useState(false);
  const [studentReflectionText, setStudentReflectionText] = useState('');
  const [reflectionSubmitted, setReflectionSubmitted] = useState(false);
  const [youtubeWatched, setYoutubeWatched] = useState(false);

  // Resolve authentic YouTube video for this material
  const videoInfo = resolveYouTubeVideo(title, subjectId, grade, youtubeId);

  // Scripted video story narration for the animated player fallback
  const videoNarrations: Record<string, { time: number; text: string; visualPhase: string }[]> = {
    'mat-5-pecahan': [
      { time: 0, text: 'Halo Sahabat Pintar! Hari ini kita berpetualang ke dunia pecahan senilai!', visualPhase: 'intro' },
      { time: 20, text: 'Bayangkan ada satu loyang pizza lezat. Kita potong menjadi dua bagian sama besar. Satu potong ini adalah satu per dua (1/2).', visualPhase: 'half' },
      { time: 50, text: 'Sekarang, bagaimana jika pizza yang sama kita potong menjadi empat bagian? Dua potong dari empat (2/4) ukurannya persis sama dengan satu per dua!', visualPhase: 'quarter' },
      { time: 80, text: 'Itulah pecahan senilai! Nilainya sama besar meskipun angka pembilang dan penyebutnya berbeda. Hebat sekali bukan?', visualPhase: 'conclusion' },
    ],
    'ipas-4-fotosintesis': [
      { time: 0, text: 'Pernahkah kamu berpikir bagaimana pohon hijau di pekarangan rumah memasak makanannya?', visualPhase: 'intro' },
      { time: 20, text: 'Akar pohon menyerap air dari dalam tanah, dan daun menyerap gas karbon dioksida dari udara.', visualPhase: 'absorb' },
      { time: 50, text: 'Zat hijau klorofil menangkap sinar matahari yang hangat. Di daun inilah dapur ajaib fotosintesis bekerja!', visualPhase: 'cook' },
      { time: 80, text: 'Hasilnya adalah makanan glukosa untuk tumbuhan dan gas oksigen segar untuk kita bernapas setiap hari!', visualPhase: 'oxygen' },
    ],
    'bind-1-huruf-vokal': [
      { time: 0, text: 'Ayo bernyanyi dan bersuara riang bersama lima sahabat huruf vokal: A, I, U, E, dan O!', visualPhase: 'vokal-all' },
      { time: 25, text: 'A untuk Ayam dan Apel! Buka mulutmu lebar-lebar: AAAA!', visualPhase: 'vokal-a' },
      { time: 50, text: 'I untuk Ikan dan Itik! Tersenyumlah lebar-lebar: IIII!', visualPhase: 'vokal-i' },
      { time: 75, text: 'U, E, dan O membuat kata-kata menjadi bersuara indah!', visualPhase: 'vokal-ueo' },
    ],
    'pancasila-3-gotong-royong': [
      { time: 0, text: 'Pernahkah kamu melihat kawanan semut kecil membawa remah kue yang besar?', visualPhase: 'gotong-intro' },
      { time: 25, text: 'Satu semut tidak sanggup mengangkatnya. Tapi saat bergotong royong bersama-sama, beban berat terasa sangat ringan!', visualPhase: 'gotong-semut' },
      { time: 55, text: 'Di rumah dan sekolah, berat sama dipikul, ringan sama dijinjing! Kita piket kelas dan membantu orang tua dengan riang.', visualPhase: 'gotong-rumah' },
      { time: 80, text: 'Gotong royong adalah warisan luhur bangsa Indonesia yang membuat hidup rukun dan damai!', visualPhase: 'gotong-conclusion' },
    ],
    'mat-6-lingkaran': [
      { time: 0, text: 'Selamat datang di penjelajahan lingkaran dan roda ajaib!', visualPhase: 'circle-intro' },
      { time: 30, text: 'Dari titik pusat ke tepi lingkaran disebut jari-jari. Garis lurus yang membelah lingkaran disebut diameter.', visualPhase: 'diameter' },
      { time: 60, text: 'Ketika roda berputar satu putaran penuh, panjang lintasannya adalah keliling lingkaran yang dikalikan angka pi, yaitu 3 koma 14.', visualPhase: 'pi' },
      { time: 85, text: 'Sekarang kamu bisa mengukur keliling benda bundar apa saja di sekitarmu!', visualPhase: 'measure' },
    ]
  };

  const defaultStory = [
    { time: 0, text: `Selamat datang di video pembelajaran: ${title}. Mari kita amati konsepnya bersama!`, visualPhase: 'intro' },
    { time: 25, text: `Perhatikan baik-baik prinsip dasar topik ini dalam kehidupan sehari-hari kita.`, visualPhase: 'concept' },
    { time: 55, text: `Kita bisa mempraktikkannya dengan mudah di sekolah maupun di rumah bersama orang tua.`, visualPhase: 'practice' },
    { time: 80, text: `Luar biasa! Kamu telah mempelajari konsep ${title} dengan sangat baik hari ini!`, visualPhase: 'conclusion' },
  ];

  const currentStory = videoNarrations[topicId] || defaultStory;

  // Update animated video playback
  useEffect(() => {
    let interval: any;
    if (isPlaying && mode === 'animasi') {
      interval = setInterval(() => {
        setProgress(prev => {
          const next = prev + 1;
          if (next >= 100) {
            setIsPlaying(false);
            setHasCompleted(true);
            soundManager.playFanfare();
            if (onAddStar) onAddStar();
            voiceGuideService.stop();
            return 100;
          }

          const activeSegment = [...currentStory].reverse().find(s => next >= s.time);
          if (activeSegment && activeSegment.text !== currentCaption) {
            setCurrentCaption(activeSegment.text);
            if (!isMuted) {
              voiceGuideService.speak(activeSegment.text);
            }
          }

          return next;
        });
      }, 350);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, mode, isMuted, currentCaption, currentStory, onAddStar]);

  if (!isOpen) return null;

  const handleTogglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
      voiceGuideService.stop();
    } else {
      setIsPlaying(true);
      soundManager.playChime();
      if (progress >= 100) setProgress(0);
      const activeSegment = currentStory.find(s => progress >= s.time) || currentStory[0];
      if (activeSegment && !isMuted) {
        voiceGuideService.speak(activeSegment.text);
      }
    }
  };

  const handleRestart = () => {
    setProgress(0);
    setIsPlaying(true);
    setHasCompleted(false);
    voiceGuideService.stop();
    const firstSegment = currentStory[0];
    setCurrentCaption(firstSegment.text);
    if (!isMuted) {
      voiceGuideService.speak(firstSegment.text);
    }
  };

  const handleClose = () => {
    setIsPlaying(false);
    voiceGuideService.stop();
    onClose();
  };

  const handleSpeakReflectionPrompt = () => {
    voiceGuideService.speak(`Refleksi setelah menonton: ${reflectionPrompt}. Coba ceritakan dengan bahasamu sendiri!`);
  };

  const handleSubmitReflection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentReflectionText.trim()) return;
    setReflectionSubmitted(true);
    soundManager.playStarSuccess();
    voiceGuideService.speak('Hebat sekali! Jawaban refleksimu luar biasa dan kamu mendapatkan sepuluh bintang belajar!');
    if (onAddStar) onAddStar();
  };

  const handleClaimYoutubeStar = () => {
    if (!youtubeWatched) {
      setYoutubeWatched(true);
      soundManager.playStarSuccess();
      if (onAddStar) onAddStar();
    }
  };

  // Determine visual phase
  const activePhase = [...currentStory].reverse().find(s => progress >= s.time)?.visualPhase || 'intro';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 text-white rounded-3xl max-w-4xl w-full my-auto overflow-hidden shadow-2xl border-4 border-amber-400 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Header */}
        <div className="p-4 px-6 bg-slate-800/95 border-b border-slate-700 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-red-600 text-white flex items-center justify-center text-xl shadow-md">
              <Youtube className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xs font-extrabold uppercase bg-red-500/20 text-red-400 border border-red-500/30 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <span>📺 YouTube Edukasi</span>
                  <span>•</span>
                  <span>Kelas {grade} SD</span>
                </span>
                <span className="text-2xs text-slate-400 font-mono hidden sm:inline">⏱️ {duration}</span>
              </div>
              <h3 className="text-base sm:text-lg font-black font-display text-white mt-0.5 truncate max-w-sm sm:max-w-md">
                {title}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Mode switch: YouTube Edukasi vs Animasi Narasi */}
            <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-700 text-2xs font-bold">
              <button
                onClick={() => {
                  setMode('youtube');
                  setIsPlaying(false);
                  voiceGuideService.stop();
                }}
                className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
                  mode === 'youtube' ? 'bg-red-600 text-white font-black shadow-xs' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Youtube className="w-3.5 h-3.5" />
                <span>YouTube</span>
              </button>
              <button
                onClick={() => {
                  setMode('animasi');
                  voiceGuideService.stop();
                }}
                className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
                  mode === 'animasi' ? 'bg-amber-500 text-slate-900 font-black shadow-xs' : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>🎙️ Animasi Suara</span>
              </button>
            </div>

            <button
              onClick={handleClose}
              className="p-2 rounded-full hover:bg-slate-700 text-slate-400 hover:text-white transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Video Screen Area */}
        <div className="relative aspect-video w-full bg-slate-950 overflow-hidden flex flex-col items-center justify-center">
          {mode === 'youtube' ? (
            /* DIRECT YOUTUBE IFRAME PLAYER */
            <div className="w-full h-full relative">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${videoInfo.youtubeId}?autoplay=1&rel=0&modestbranding=1&enablejsapi=1`}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          ) : (
            /* BUILT-IN ANIMATED VIDEO SIMULATION */
            <div className="relative w-full h-full flex flex-col items-center justify-between p-6 select-none bg-gradient-to-b from-slate-900 via-indigo-950/70 to-slate-950">
              {/* Animated Canvas Graphics */}
              <div className="flex-1 w-full flex items-center justify-center">
                {topicId.includes('pecahan') && (
                  <div className="flex items-center justify-center gap-6 sm:gap-8 animate-in fade-in">
                    <div className="text-center space-y-2">
                      <div className="relative w-28 sm:w-36 h-28 sm:h-36 rounded-full border-4 border-amber-400 bg-amber-200 overflow-hidden shadow-2xl flex items-center justify-center">
                        <div className="absolute left-0 top-0 w-1/2 h-full bg-orange-500 border-r-2 border-white flex items-center justify-center text-white font-black text-lg sm:text-xl">
                          1/2
                        </div>
                        <div className="absolute right-3 text-slate-600 font-bold text-xs opacity-50">
                          kosong
                        </div>
                      </div>
                      <span className="text-xs font-black text-amber-300">1 dari 2 Bagian</span>
                    </div>

                    <span className="text-3xl font-black text-white">=</span>

                    <div className="text-center space-y-2">
                      <div className="relative w-28 sm:w-36 h-28 sm:h-36 rounded-full border-4 border-amber-400 bg-amber-200 overflow-hidden shadow-2xl flex items-center justify-center">
                        <div className="absolute left-0 top-0 w-1/2 h-full bg-orange-500 border-r-2 border-white grid grid-rows-2">
                          <div className="border-b border-white flex items-center justify-center text-white font-bold text-xs">1/4</div>
                          <div className="flex items-center justify-center text-white font-bold text-xs">1/4</div>
                        </div>
                        <div className="absolute right-3 text-slate-600 font-bold text-xs opacity-50">
                          2/4 kosong
                        </div>
                      </div>
                      <span className="text-xs font-black text-emerald-300">2 dari 4 Bagian (Senilai!)</span>
                    </div>
                  </div>
                )}

                {topicId.includes('fotosintesis') && (
                  <div className="text-center space-y-4 animate-in fade-in">
                    <div className="inline-flex items-center gap-4 bg-slate-800/80 p-4 rounded-3xl border-2 border-emerald-500/50">
                      <div className="text-center">
                        <span className="text-4xl">☀️</span>
                        <p className="text-3xs text-amber-300 font-bold">Cahaya</p>
                      </div>
                      <span className="text-xl font-bold">+</span>
                      <div className="text-center">
                        <span className="text-4xl">💧</span>
                        <p className="text-3xs text-sky-300 font-bold">Air</p>
                      </div>
                      <span className="text-xl font-bold">+</span>
                      <div className="text-center">
                        <span className="text-4xl">🌱</span>
                        <p className="text-3xs text-emerald-300 font-bold">Klorofil</p>
                      </div>
                      <span className="text-xl font-bold text-emerald-400">➡️</span>
                      <div className="text-center bg-emerald-950/70 p-2 rounded-2xl border border-emerald-400">
                        <span className="text-4xl">💨🍎</span>
                        <p className="text-3xs text-emerald-300 font-black">Oksigen & Makanan</p>
                      </div>
                    </div>
                  </div>
                )}

                {!topicId.includes('pecahan') && !topicId.includes('fotosintesis') && (
                  <div className="text-center space-y-3 p-6 bg-slate-800/60 rounded-3xl border border-slate-700 max-w-md">
                    <span className="text-5xl">🎓</span>
                    <h4 className="text-base font-black text-white">
                      Eksplorasi Konsep {title}
                    </h4>
                    <p className="text-xs text-slate-300">
                      Dengarkan narasi suara dan perhatikan konsep visual edukatif!
                    </p>
                  </div>
                )}
              </div>

              {/* Subtitles & Captions Bar */}
              <div className="w-full bg-black/75 backdrop-blur-md p-3 sm:p-4 rounded-2xl border border-white/10 text-center max-w-2xl mx-auto min-h-[58px] flex items-center justify-center">
                <p className="text-xs sm:text-sm font-semibold text-amber-200 leading-snug">
                  {currentCaption || 'Klik tombol Putar (▶️) untuk memulai animasi video edukatif bersama suara pemandu!'}
                </p>
              </div>

              {!isPlaying && progress === 0 && (
                <div
                  onClick={handleTogglePlay}
                  className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center cursor-pointer group"
                >
                  <div className="w-20 h-20 rounded-full bg-amber-500 group-hover:scale-110 flex items-center justify-center shadow-2xl transition duration-300 border-4 border-white/50">
                    <Play className="w-10 h-10 fill-slate-900 text-slate-900 ml-1.5" />
                  </div>
                  <span className="mt-3 text-xs font-black uppercase tracking-wider text-white bg-black/70 px-4 py-1.5 rounded-full border border-white/20 shadow-md">
                    Klik untuk Memutar Video Animasi 🔊
                  </span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Action Center Bar (YouTube Links & Official Channels) */}
        <div className="p-3.5 px-6 bg-slate-950 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-2xs font-bold text-slate-400 flex items-center gap-1">
              <span>Sumber:</span>
              <strong className="text-white">{videoInfo.channel}</strong>
            </span>

            <a
              href={videoInfo.watchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl text-2xs transition shadow-sm active:scale-95"
            >
              <Youtube className="w-3.5 h-3.5" />
              <span>Buka di YouTube (Tab Baru)</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            <a
              href={videoInfo.searchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-semibold rounded-xl text-2xs border border-slate-700 transition"
            >
              <Search className="w-3 h-3" />
              <span>Cari Video Serupa di YouTube</span>
            </a>
          </div>

          <div className="flex items-center gap-2">
            {!youtubeWatched ? (
              <button
                onClick={handleClaimYoutubeStar}
                className="px-3.5 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-xl text-2xs flex items-center gap-1 shadow-md transition active:scale-95"
              >
                <Star className="w-3.5 h-3.5 fill-slate-950" />
                <span>Klaim 10 Bintang Menonton!</span>
              </button>
            ) : (
              <span className="text-2xs font-bold text-emerald-400 bg-emerald-950/80 px-3 py-1.5 rounded-xl border border-emerald-500/30 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Bintang Menonton Diterima! (+10 ⭐)</span>
              </span>
            )}
          </div>
        </div>

        {/* Animated Mode Scrubber (Only visible in animation mode) */}
        {mode === 'animasi' && (
          <div className="p-4 bg-slate-800 border-t border-slate-700 space-y-3">
            <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
              <span className="w-10 text-right">{Math.round((progress / 100) * 35)}s</span>
              <div
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickX = e.clientX - rect.left;
                  const newPct = Math.round((clickX / rect.width) * 100);
                  setProgress(Math.max(0, Math.min(100, newPct)));
                }}
                className="flex-1 bg-slate-700 h-2.5 rounded-full overflow-hidden cursor-pointer relative group"
              >
                <div
                  className="bg-amber-400 h-full rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="w-10">35s</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleTogglePlay}
                  className="flex items-center gap-1.5 px-4 py-2 bg-amber-400 hover:bg-amber-500 text-slate-900 font-black rounded-xl text-xs transition active:scale-95"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-4 h-4 fill-slate-900" />
                      <span>Jeda</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-slate-900" />
                      <span>Putar Animasi 🔊</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleRestart}
                  className="p-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-white text-xs transition"
                  title="Putar Ulang dari Awal"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    if (!isMuted) voiceGuideService.stop();
                    setIsMuted(!isMuted);
                  }}
                  className={`p-2 rounded-xl transition ${
                    isMuted ? 'bg-rose-600 text-white' : 'bg-slate-700 hover:bg-slate-600 text-white'
                  }`}
                  title={isMuted ? 'Nyalakan Suara' : 'Bisukan Suara'}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
              </div>

              {hasCompleted && (
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300 bg-amber-500/20 px-3 py-1.5 rounded-xl border border-amber-400/40 animate-pulse">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>Selesai Menonton! (+10 ⭐ Bintang)</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Post-Video Interactive Reflection */}
        <div className="p-5 bg-slate-900/90 border-t border-slate-800 space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-2.5">
              <span className="text-2xl">🤔</span>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-extrabold text-sm text-white">
                    Tantangan Refleksi Setelah Menonton
                  </h4>
                  <button
                    onClick={handleSpeakReflectionPrompt}
                    className="p-1 px-2.5 rounded-lg bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 text-2xs font-bold flex items-center gap-1 border border-amber-400/40"
                  >
                    <Volume2 className="w-3 h-3" /> Dengarkan Pertanyaan 🔊
                  </button>
                </div>
                <p className="text-xs text-amber-200 mt-1 italic font-medium">
                  “{reflectionPrompt}”
                </p>
              </div>
            </div>
          </div>

          {!reflectionSubmitted ? (
            <form onSubmit={handleSubmitReflection} className="flex gap-2">
              <input
                type="text"
                value={studentReflectionText}
                onChange={(e) => setStudentReflectionText(e.target.value)}
                placeholder="Ceritakan dengan bahasamu: Apa yang baru saja kamu pelajari dari video YouTube ini?"
                className="flex-1 text-xs p-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:border-amber-400"
                required
              />
              <button
                type="submit"
                className="px-5 py-3 bg-amber-500 hover:bg-amber-600 text-slate-900 font-black text-xs rounded-xl shadow-md transition active:scale-95"
              >
                Kirim Refleksi 🚀
              </button>
            </form>
          ) : (
            <div className="p-3 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs font-bold flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Hebat sekali! Cerita refleksimu tersimpan dan membuatmu semakin memahami materi! ⭐ +10 Bintang!</span>
            </div>
          )}

          {/* Official Channel Links Footer */}
          <div className="pt-2 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2 text-2xs text-slate-400">
            <span className="font-bold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Saluran Resmi Rekomendasi Pendidik:
            </span>
            <div className="flex flex-wrap gap-2">
              {OFFICIAL_YOUTUBE_CHANNELS.map((ch, idx) => (
                <a
                  key={idx}
                  href={ch.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-300 transition flex items-center gap-1"
                >
                  <span>{ch.icon}</span>
                  <span>{ch.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
