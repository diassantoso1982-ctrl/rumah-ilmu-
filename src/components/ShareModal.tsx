import React, { useState } from 'react';
import { Share2, Copy, Check, MessageCircle, X, Heart, Sparkles, BookOpen, Users, School } from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  url?: string;
  category?: string;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  title,
  url = window.location.href,
  category = 'Materi Belajar'
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const shareText = `Halo! Yuk belajar bersama di Rumah Ilmu: "${title}" (${category}). Klik tautan berikut: ${url}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleWhatsApp = () => {
    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
    window.open(waUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border-4 border-amber-200 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-4 border-b border-amber-100">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-700">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-800">Bagikan {category}</h3>
              <p className="text-xs text-slate-500">Ajak siswa dan orang tua belajar bersama</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="my-5 bg-amber-50/60 p-4 rounded-2xl border border-amber-100">
          <p className="text-xs font-semibold uppercase tracking-wider text-amber-700 mb-1">Judul Dibagikan</p>
          <p className="font-bold text-slate-800 text-sm line-clamp-2">{title}</p>
        </div>

        <div className="space-y-3">
          <button
            onClick={handleWhatsApp}
            className="w-full flex items-center justify-center gap-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-4 rounded-2xl shadow-md shadow-emerald-600/20 transition active:scale-98"
          >
            <MessageCircle className="w-5 h-5" />
            Bagikan ke WhatsApp
          </button>

          <button
            onClick={handleCopy}
            className="w-full flex items-center justify-center gap-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-3.5 px-4 rounded-2xl border border-slate-200 transition active:scale-98"
          >
            {copied ? (
              <>
                <Check className="w-5 h-5 text-emerald-600" />
                <span className="text-emerald-700">Tautan Berhasil Disalin!</span>
              </>
            ) : (
              <>
                <Copy className="w-5 h-5 text-slate-600" />
                <span>Salin Tautan Lengkap</span>
              </>
            )}
          </button>
        </div>

        <p className="text-center text-xs text-slate-400 mt-5">
          “Belajar di sekolah, lanjutkan di rumah.” 🏠 RUMAH ILMU
        </p>
      </div>
    </div>
  );
};

export const AboutModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 shadow-2xl border-4 border-amber-300">
        <div className="flex items-start justify-between pb-4 border-b border-amber-100">
          <div className="flex items-center gap-3">
            <span className="text-4xl">🏠</span>
            <div>
              <h2 className="text-2xl font-black text-slate-900 font-display">RUMAH ILMU</h2>
              <p className="text-sm font-semibold text-amber-700">“Teman Belajar Guru, Orang Tua, dan Anak”</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="mt-6 space-y-6 text-slate-700 text-sm md:text-base leading-relaxed">
          <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-slate-800 font-medium italic text-center">
            “Belajar di sekolah, lanjutkan di rumah.”
          </div>

          <p>
            <strong>Rumah Ilmu</strong> merupakan media pembelajaran digital terpadu untuk jenjang Sekolah Dasar (SD) kelas 1–6 yang menghubungkan <strong>guru, siswa, dan orang tua</strong> dalam menciptakan pengalaman belajar yang lebih mudah, bermakna, menyenangkan, dan berkelanjutan.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200">
              <div className="w-10 h-10 rounded-xl bg-blue-500 text-white flex items-center justify-center mb-3 text-lg font-bold">
                <School className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 mb-1">1. Guru</h4>
              <p className="text-xs text-slate-600">Menyediakan arah belajar, modul, LKPD digital, kuis interaktif, dan materi dengan bantuan AI.</p>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center mb-3 text-lg font-bold">
                <Users className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 mb-1">2. Orang Tua</h4>
              <p className="text-xs text-slate-600">Mendampingi anak lewat panduan 10–15 menit praktis tanpa perlu mengajarkan seperti guru formal.</p>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
              <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center mb-3 text-lg font-bold">
                <BookOpen className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 mb-1">3. Siswa</h4>
              <p className="text-xs text-slate-600">Mengeksplorasi ilmu dengan ceria lewat diferensiasi membaca, video, game, dan kuis ramah anak.</p>
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
            <h4 className="font-bold text-slate-900 flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-amber-500" /> Filosofi Rumah Ramah Anak
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Kami percaya setiap anak memiliki ritme dan gaya belajar unik. Tidak ada label gagal di Rumah Ilmu — setiap kesalahan adalah petunjuk untuk memahami konsep lebih baik lagi.
            </p>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-2xl shadow-sm transition active:scale-95"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
