import React, { useState } from 'react';
import { PARENT_GUIDE_ARTICLES } from '../data/mockData';
import { ParentGuideArticle } from '../types';
import { Heart, Search, Check, X, Sparkles, BookOpen, Clock, Lightbulb, Volume2 } from 'lucide-react';
import { AudioNarratorButton } from './AudioNarratorButton';

export const ParentGuideView: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<ParentGuideArticle>(PARENT_GUIDE_ARTICLES[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');

  const categories = ['Semua', ...Array.from(new Set(PARENT_GUIDE_ARTICLES.map(a => a.category)))];

  const filteredArticles = PARENT_GUIDE_ARTICLES.filter(a => {
    const matchesCat = selectedCategory === 'Semua' || a.category === selectedCategory;
    const matchesSearch = a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          a.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* Banner */}
      <div className="bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 rounded-3xl p-6 md:p-8 text-white shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="bg-white/20 backdrop-blur-xs text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
            Sahabat Orang Tua
          </span>
          <h1 className="text-2xl md:text-4xl font-black font-display mt-2">
            👨‍👩‍👧 Panduan Orang Tua Belajar di Rumah
          </h1>
          <p className="text-white/90 text-sm mt-1 max-w-xl">
            Tips praktis dan hangat mendampingi ananda tanpa stres, tanpa membentak, dan penuh kasih sayang. Dilengkapi pemandu audio lisan!
          </p>
        </div>
        <div className="text-5xl hidden md:block">
          🏡
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-200 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-x-auto py-1 max-w-full">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-rose-500 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative min-w-[200px] flex-1 sm:flex-initial">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari topik panduan..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs p-2 pl-9 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-400"
          />
        </div>
      </div>

      {/* Main Layout: List & Reader */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Articles List */}
        <div className="lg:col-span-5 space-y-2.5 max-h-[750px] overflow-y-auto pr-1">
          {filteredArticles.map((art) => {
            const isSelected = selectedArticle.id === art.id;
            return (
              <button
                key={art.id}
                onClick={() => setSelectedArticle(art)}
                className={`w-full text-left p-4 rounded-2xl border-2 transition active:scale-98 cursor-pointer ${
                  isSelected
                    ? 'bg-rose-50 border-rose-400 shadow-sm'
                    : 'bg-white hover:bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl p-2 rounded-xl bg-white shadow-2xs border border-slate-100">
                    {art.icon}
                  </span>
                  <div className="flex-1 min-w-0">
                    <span className="text-2xs font-extrabold uppercase text-rose-700 bg-rose-100/70 px-2 py-0.5 rounded-md">
                      {art.category}
                    </span>
                    <h3 className="font-bold text-slate-900 text-sm mt-1 leading-snug">
                      {art.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                      {art.summary}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Article Detailed Reader */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 md:p-8 shadow-md border-2 border-slate-100 space-y-6">
          <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-4">
            <div className="flex items-start gap-3">
              <span className="text-4xl p-2 bg-rose-50 rounded-2xl border border-rose-200">
                {selectedArticle.icon}
              </span>
              <div>
                <span className="text-2xs font-extrabold uppercase bg-rose-100 text-rose-800 px-3 py-1 rounded-full">
                  {selectedArticle.category}
                </span>
                <h2 className="text-xl md:text-2xl font-black text-slate-900 font-display mt-1">
                  {selectedArticle.title}
                </h2>
              </div>
            </div>

            <AudioNarratorButton
              textToSpeak={`Panduan Orang Tua: ${selectedArticle.title}. Prinsip utama: ${selectedArticle.summary}. Langkah pendampingan: ${selectedArticle.actionSteps.join('. ')}. Contoh percakapan: ${selectedArticle.realLifeExample}`}
              label="Dengarkan Seluruh Panduan"
              variant="rose"
              size="md"
            />
          </div>

          {/* Summary Box */}
          <div className="p-4 bg-amber-50/80 rounded-2xl border border-amber-200 text-amber-950 text-sm leading-relaxed font-medium flex items-start justify-between gap-3">
            <div>
              💡 <strong>Prinsip Utama:</strong> {selectedArticle.summary}
            </div>
            <AudioNarratorButton
              textToSpeak={`Prinsip utama: ${selectedArticle.summary}`}
              label="Dengarkan"
              variant="amber"
              size="sm"
            />
          </div>

          {/* Action Steps */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black uppercase tracking-wider text-slate-800 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-rose-500 text-white flex items-center justify-center text-xs">✓</span>
                Langkah Nyata Pendampingan di Rumah:
              </h3>
              <AudioNarratorButton
                textToSpeak={`Langkah pendampingan: ${selectedArticle.actionSteps.join('. ')}`}
                label="Bacakan Langkah"
                variant="ghost"
                size="sm"
              />
            </div>
            <ul className="space-y-2">
              {selectedArticle.actionSteps.map((step, idx) => (
                <li key={idx} className="flex items-start justify-between gap-2.5 text-sm text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-rose-600 mt-0.5">{idx + 1}.</span>
                    <span>{step}</span>
                  </div>
                  <AudioNarratorButton
                    textToSpeak={`Langkah ${idx + 1}: ${step}`}
                    label=""
                    variant="ghost"
                    size="sm"
                  />
                </li>
              ))}
            </ul>
          </div>

          {/* Do's & Don'ts */}
          {selectedArticle.dosAndDonts && selectedArticle.dosAndDonts.length > 0 && (
            <div className="space-y-3 pt-2">
              <h3 className="text-sm font-black uppercase tracking-wider text-slate-800">
                Yang Dianjurkan vs Perlu Dihindari:
              </h3>
              <div className="space-y-2.5">
                {selectedArticle.dosAndDonts.map((item, idx) => (
                  <div key={idx} className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div className="p-3 bg-emerald-50 text-emerald-950 rounded-xl border border-emerald-200 flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-emerald-800">Lakukan:</strong>
                        {item.do}
                      </div>
                    </div>
                    <div className="p-3 bg-rose-50 text-rose-950 rounded-xl border border-rose-200 flex items-start gap-2">
                      <X className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-rose-800">Hindari:</strong>
                        {item.dont}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Real Life Example */}
          <div className="p-4 bg-purple-50/70 rounded-2xl border border-purple-200 text-xs md:text-sm text-purple-950 space-y-2">
            <div className="flex items-center justify-between">
              <p className="font-bold uppercase tracking-wider text-purple-800 text-2xs">
                Contoh Kalimat Percakapan Hangat:
              </p>
              <AudioNarratorButton
                textToSpeak={`Contoh kalimat percakapan hangat bersama anak: ${selectedArticle.realLifeExample}`}
                label="Dengarkan Contoh"
                variant="purple"
                size="sm"
              />
            </div>
            <p className="italic bg-white/80 p-3 rounded-xl border border-purple-100">
              “{selectedArticle.realLifeExample}”
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
