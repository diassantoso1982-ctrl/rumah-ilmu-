import React from 'react';
import { StudentProgress, UserRole } from '../types';
import { Award, Star, Flame, Trophy, CheckCircle, TrendingUp, Sparkles, Heart } from 'lucide-react';

interface StudentProgressViewProps {
  progress: StudentProgress;
  userRole: UserRole;
  onOpenMaterial?: (id: string) => void;
}

export const StudentProgressView: React.FC<StudentProgressViewProps> = ({
  progress,
  userRole,
  onOpenMaterial,
}) => {
  const indicators = [
    { label: '📖 Literasi Membaca', value: progress.literasi, color: 'bg-emerald-500', note: 'Ananda sangat lancar memahami ide pokok bacaan.' },
    { label: '🔢 Numerasi & Logika', value: progress.numerasi, color: 'bg-blue-500', note: 'Ananda menguasai pecahan dan bangun ruang dengan baik.' },
    { label: '🧠 Pemahaman Konsep', value: progress.pemahaman, color: 'bg-indigo-500', note: 'Daya nalar ananda berkembang pesat melalui analogi visual.' },
    { label: '🎯 Kemandirian Belajar', value: progress.kemandirian, color: 'bg-amber-500', note: 'Mampu mengerjakan instruksi awal tanpa harus selalu diingatkan.' },
    { label: '🤝 Kolaborasi & Berbagi', value: progress.kolaborasi, color: 'bg-rose-500', note: 'Senang berbagi ide dan berdiskusi dengan orang tua & teman.' },
    { label: '🎨 Kreativitas & Seni', value: progress.kreativitas, color: 'bg-purple-500', note: 'Sangat imajinatif saat membuat karya lipat dan sketsa.' },
    { label: '❤️ Karakter & Budi Pekerti', value: progress.karakter, color: 'bg-teal-500', note: 'Santun, menghormati orang tua, dan rajin mengucap terima kasih.' },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-3xl p-6 md:p-8 text-white shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="bg-white/20 backdrop-blur-xs text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
            Portofolio & Kemajuan Ceria
          </span>
          <h1 className="text-2xl md:text-4xl font-black font-display mt-2">
            📊 Perkembangan Belajar Siswa
          </h1>
          <p className="text-white/90 text-sm mt-1">
            Bahasa positif yang membangkitkan rasa percaya diri ananda.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-white/20 backdrop-blur-xs p-3 px-4 rounded-2xl flex items-center gap-2 border border-white/30">
            <Flame className="w-6 h-6 text-orange-300" />
            <div>
              <p className="text-2xs font-extrabold uppercase text-white/80">Streak Belajar</p>
              <p className="text-xl font-black font-display text-white">{progress.streakDays} Hari 🔥</p>
            </div>
          </div>
          <div className="bg-white/20 backdrop-blur-xs p-3 px-4 rounded-2xl flex items-center gap-2 border border-white/30">
            <Star className="w-6 h-6 text-yellow-300 fill-yellow-300" />
            <div>
              <p className="text-2xs font-extrabold uppercase text-white/80">Bintang</p>
              <p className="text-xl font-black font-display text-white">{progress.totalStars} ⭐</p>
            </div>
          </div>
        </div>
      </div>

      {/* Positive Feedback for Parents */}
      <div className="bg-rose-50 border-2 border-rose-200 rounded-3xl p-6 space-y-3">
        <div className="flex items-center gap-2 text-rose-900 font-extrabold text-base">
          <Heart className="w-5 h-5 text-rose-600 fill-rose-600" />
          <span>Catatan Apresiasi Positif untuk Orang Tua</span>
        </div>
        <div className="space-y-2">
          {progress.positiveNotes.map((note, idx) => (
            <p key={idx} className="text-sm text-slate-800 bg-white/80 p-3 rounded-2xl border border-rose-100 flex items-start gap-2.5">
              <span className="text-rose-500 font-bold">✨</span>
              <span>{note}</span>
            </p>
          ))}
        </div>
      </div>

      {/* Progress Bars Indicator */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100 space-y-6">
        <h2 className="text-xl font-black text-slate-900 font-display flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-emerald-600" />
          Dimensi Perkembangan Profil Pelajar
        </h2>

        <div className="space-y-4">
          {indicators.map((ind, idx) => (
            <div key={idx} className="space-y-1.5 p-3 rounded-2xl hover:bg-slate-50 transition">
              <div className="flex items-center justify-between text-sm">
                <span className="font-bold text-slate-800">{ind.label}</span>
                <span className="font-black text-slate-900 font-display">{ind.value}%</span>
              </div>
              <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${ind.color} transition-all duration-500`}
                  style={{ width: `${ind.value}%` }}
                />
              </div>
              <p className="text-xs text-slate-500 italic pl-1">
                💬 {ind.note}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Badges Collection */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100 space-y-5">
        <h2 className="text-xl font-black text-slate-900 font-display flex items-center gap-2">
          <Trophy className="w-5 h-5 text-amber-500" />
          Koleksi Lencana & Apresiasi
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5">
          {progress.badges.map((badge) => (
            <div
              key={badge.id}
              className={`p-4 rounded-2xl border-2 text-center transition ${
                badge.unlocked
                  ? 'bg-amber-50/60 border-amber-300 text-slate-900'
                  : 'bg-slate-50 border-slate-200 opacity-60 text-slate-500'
              }`}
            >
              <div className="text-3xl mb-1">{badge.icon}</div>
              <h4 className="font-extrabold text-sm">{badge.title}</h4>
              <p className="text-2xs text-slate-500 mt-1 line-clamp-2">{badge.description}</p>
              {badge.unlocked && (
                <span className="inline-block mt-2 text-2xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                  Diraih 🎉
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Rekomendasi Kegiatan Selanjutnya */}
      <div className="bg-amber-50 border border-amber-200 rounded-3xl p-6 space-y-3">
        <h3 className="font-bold text-amber-950 text-base flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-600" />
          Rekomendasi Aktivitas Berikutnya di Rumah:
        </h3>
        <p className="text-sm text-amber-900 leading-relaxed">
          “Ananda sudah sangat paham konsep dasar pecahan. Untuk penguatan, ajak ananda memotong buah apel atau semangka saat sarapan pagi menjadi 4 bagian lalu minta ananda menjelaskan pecahan senilai 2/4!”
        </p>
      </div>
    </div>
  );
};
