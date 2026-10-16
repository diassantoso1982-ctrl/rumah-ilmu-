import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, X, Sparkles, MessageCircle, Minimize2, Maximize2, User, HelpCircle } from 'lucide-react';
import { UserRole, GradeLevel } from '../types';
import { chatWithSahabatIlmu } from '../services/geminiService';

interface SahabatIlmuChatProps {
  currentGrade: GradeLevel;
  userRole: UserRole;
  currentTopic?: string;
}

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  time: string;
}

export const SahabatIlmuChat: React.FC<SahabatIlmuChatProps> = ({
  currentGrade,
  userRole,
  currentTopic,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'ai',
      text: `Halo Sahabat Hebat! 🌟 Aku SAHABAT ILMU, teman belajarmu di Rumah Ilmu. Mau bertanya tentang materi, butuh contoh seru, atau tips belajar? Tanyakan saja ya! Aku siap memandumu!`,
      time: 'Baru saja'
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      const historyPayload = messages.slice(-4).map(m => ({
        role: m.sender === 'user' ? 'user' : 'model',
        content: m.text
      }));

      const reply = await chatWithSahabatIlmu(
        text,
        userRole,
        currentGrade,
        currentTopic,
        historyPayload
      );

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: reply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const samplePrompts = [
    'Apa itu pecahan senilai?',
    'Bagaimana tumbuhan fotosintesis?',
    'Bantu saya memahami soal ini langkah demi langkah',
    'Tips mendampingi anak belajar 15 menit'
  ];

  return (
    <>
      {/* Floating Action Bubble */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-5 right-5 z-40 flex items-center gap-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-extrabold px-4 py-3 rounded-full shadow-2xl shadow-amber-500/40 border-2 border-white transition-all transform hover:scale-105 active:scale-95 animate-bounce-subtle"
        >
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-lg">
            🤖
          </div>
          <div className="text-left">
            <span className="block text-xs font-black uppercase tracking-wider">Sahabat Ilmu</span>
            <span className="block text-2xs text-amber-100 font-medium">Tanya AI Pembimbing</span>
          </div>
        </button>
      )}

      {/* Chat Window Modal */}
      {isOpen && (
        <div className="fixed bottom-5 right-3 sm:right-6 z-50 w-[94vw] sm:w-[420px] h-[550px] max-h-[85vh] bg-white rounded-3xl shadow-2xl border-4 border-amber-300 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center text-2xl">
                🤖
              </div>
              <div>
                <h3 className="font-black text-sm md:text-base font-display">SAHABAT ILMU</h3>
                <p className="text-2xs text-white/90">
                  AI Pendamping Kelas {currentGrade} • Panduan Berpikir Mandiri
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full hover:bg-white/20 text-white transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scaffolding Notice */}
          <div className="bg-amber-50/80 px-4 py-2 border-b border-amber-200 text-2xs text-amber-900 font-semibold flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span>Sahabat Ilmu membimbing dengan petunjuk & langkah berpikir!</span>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/50">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'ai' && (
                  <div className="w-7 h-7 rounded-xl bg-amber-500 text-white flex items-center justify-center text-xs shrink-0 mt-1 shadow-2xs">
                    🤖
                  </div>
                )}
                <div
                  className={`max-w-[82%] p-3.5 rounded-2xl text-xs md:text-sm leading-relaxed shadow-2xs ${
                    m.sender === 'user'
                      ? 'bg-amber-500 text-white rounded-br-none font-medium'
                      : 'bg-white text-slate-800 rounded-bl-none border border-slate-200'
                  }`}
                >
                  <p className="whitespace-pre-line">{m.text}</p>
                  <span
                    className={`block text-3xs mt-1 text-right ${
                      m.sender === 'user' ? 'text-amber-100' : 'text-slate-400'
                    }`}
                  >
                    {m.time}
                  </span>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-2 text-xs text-amber-700 bg-amber-50 p-3 rounded-2xl w-fit">
                <div className="w-2 h-2 rounded-full bg-amber-500 animate-bounce" />
                <div className="w-2 h-2 rounded-full bg-amber-500 animate-bounce delay-100" />
                <div className="w-2 h-2 rounded-full bg-amber-500 animate-bounce delay-200" />
                <span className="font-semibold text-2xs">Sahabat Ilmu sedang berpikir...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Quick Questions */}
          {messages.length <= 3 && (
            <div className="px-3 py-2 bg-white border-t border-slate-100 flex gap-1.5 overflow-x-auto no-scrollbar">
              {samplePrompts.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(q)}
                  className="px-2.5 py-1 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 rounded-lg text-2xs font-semibold whitespace-nowrap transition"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input Box */}
          <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Tanyakan konsep atau minta petunjuk..."
              className="flex-1 text-xs md:text-sm p-3 rounded-2xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <button
              onClick={() => handleSend()}
              disabled={isLoading || !inputText.trim()}
              className="p-3 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white rounded-2xl shadow-md transition active:scale-95"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
