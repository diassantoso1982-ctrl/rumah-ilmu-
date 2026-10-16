import { GoogleGenAI } from '@google/genai';

let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI | null {
  if (aiClient) return aiClient;
  const apiKey = process.env.GEMINI_API_KEY;
  if (apiKey) {
    aiClient = new GoogleGenAI({ apiKey });
    return aiClient;
  }
  return null;
}

export async function handleGenerateMateri(body: {
  topic: string;
  grade: number;
  subject: string;
}) {
  const { topic, grade, subject } = body;
  const client = getAiClient();

  if (client) {
    try {
      const prompt = `Anda adalah pakar kurikulum SD Indonesia untuk Rumah Ilmu.
Buatkan materi pembelajaran lengkap dan terpadu untuk:
- Mata Pelajaran: ${subject}
- Kelas: ${grade} SD
- Topik / Materi: ${topic}

Berikan respons dalam format JSON murni (tanpa markdown backtick json):
{
  "title": "${topic} (Kelas ${grade})",
  "theme": "Tema Pembelajaran Tematik/Merdeka",
  "learningGoals": ["tujuan 1", "tujuan 2", "tujuan 3"],
  "apperception": "Pertanyaan pemantik atau apersepsi kontekstual kehidupan sehari-hari anak usia kelas ${grade}",
  "coreContent": [
    {
      "sectionTitle": "Bagian 1: Konsep Dasar",
      "text": "Penjelasan dengan bahasa sederhana dan ramah anak",
      "bulletPoints": ["poin 1", "poin 2", "poin 3"],
      "visualDescription": "Deskripsi gambar visual penjelas",
      "interactiveCheck": {
        "question": "Pertanyaan cek pemahaman cepat?",
        "answer": "Jawaban dan penjelasannya"
      }
    }
  ],
  "examples": [
    {
      "situation": "Contoh kasus sehari-hari di rumah atau sekolah",
      "explanation": "Penjelasan solusinya"
    }
  ],
  "studentActivity": {
    "title": "Aktivitas Praktis Siswa",
    "instructions": ["Langkah 1", "Langkah 2", "Langkah 3"],
    "deliverable": "Hasil karya atau ceritakan ke orang tua"
  },
  "video": {
    "title": "Video Eksplorasi: ${topic}",
    "duration": "3 menit 30 detik",
    "reflectionPrompt": "Pertanyaan refleksi setelah menonton"
  },
  "practiceQuestions": [
    {
      "id": "q1",
      "type": "pilihan_ganda",
      "question": "Soal pilihan ganda sederhana?",
      "options": ["A", "B", "C", "D"],
      "correctAnswer": "A",
      "explanation": "Penjelasan mengapa A benar",
      "encouragement": "Hebat! Kamu teliti sekali!"
    },
    {
      "id": "q2",
      "type": "benar_salah",
      "question": "Pernyataan benar atau salah?",
      "correctAnswer": true,
      "explanation": "Penjelasan",
      "encouragement": "Keren! Pemikiranmu sangat tajam."
    }
  ],
  "reflection": {
    "questions": ["Apa hal paling seru yang kamu pelajari?", "Bagaimana kamu menerapkannya di rumah?"],
    "reminder": "Pesan positif penguat karakter anak"
  },
  "summary": ["Kesimpulan 1", "Kesimpulan 2", "Kesimpulan 3"],
  "parentGuide": {
    "summary": "Ringkasan konsep untuk orang tua tanpa istilah teknis yang rumit",
    "guidance": "Cara orang tua mendampingi anak secara santai dan hangat",
    "promptQuestions": [
      "Pertanyaan pemantik 1 untuk anak",
      "Pertanyaan pemantik 2 untuk anak",
      "Pertanyaan pemantik 3 untuk anak"
    ],
    "homeActivityDuration": "10–15 Menit",
    "homeActivity": "Aktivitas praktis bersama orang tua di rumah tanpa alat khusus",
    "exampleScenario": "Contoh penerapan saat makan bersama atau di ruang tamu",
    "parentMindset": "Orang tua cukup mendengarkan, bertanya, dan memotivasi tanpa perlu menggurui"
  }
}`;

      const res = await client.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
      });

      const text = res.text?.trim() || '';
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        return { success: true, data: parsed };
      }
      const cleanJson = text.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/\s*```$/, '');
      const parsed = JSON.parse(cleanJson);
      return { success: true, data: parsed };
    } catch (err: any) {
      console.warn('Gemini API call failed, using smart curriculum template:', err.message);
    }
  }

  // High quality fallback
  return {
    success: true,
    data: {
      title: `${topic} (Kelas ${grade})`,
      theme: `Eksplorasi Terpadu ${subject}`,
      learningGoals: [
        `Memahami konsep dasar ${topic} dengan mengamati contoh nyata di sekitar kita.`,
        `Menerapkan pemahaman ${topic} dalam memecahkan tantangan sederhana.`,
        `Menumbuhkan rasa ingin tahu dan kerja sama saat belajar bersama guru dan orang tua.`
      ],
      apperception: `Pernahkah kamu melihat atau merasakan ${topic} saat berada di rumah atau bersama teman-temanmu? Mari kita selidiki bersama!`,
      coreContent: [
        {
          sectionTitle: `Mengenal ${topic} dengan Ceria`,
          text: `${topic} adalah bagian penting yang kita temukan dalam kehidupan sehari-hari pada pelajaran ${subject}. Ketika kita memahaminya, banyak hal di sekitar kita menjadi lebih jelas dan menyenangkan!`,
          bulletPoints: [
            `Konsep utama 1 dari ${topic}: mudah dipahami dan sangat dekat dengan keseharian.`,
            `Konsep utama 2: membantu kita menyelesaikan masalah dan melatih nalar berpikir.`,
            `Konsep utama 3: dapat dipraktikkan bersama teman di kelas dan ayah-bunda di rumah.`
          ],
          visualDescription: `Ilustrasi ramah anak tentang ${topic} dengan warna-warni ceria.`,
          interactiveCheck: {
            question: `Apakah kamu sudah siap menjelajah ${topic}?`,
            answer: `Tentu saja! Kuncinya adalah rasa ingin tahu dan tidak takut salah.`
          }
        }
      ],
      examples: [
        {
          situation: `Contoh di kehidupan sehari-hari anak kelas ${grade}:`,
          explanation: `Kita dapat melihat penerapan ${topic} saat beraktivitas di pagi hari atau sore hari.`
        }
      ],
      studentActivity: {
        title: `Eksplorasi Kreatif ${topic}`,
        instructions: [
          `Ambil buku tulismu dan catat 2 hal menarik tentang ${topic}.`,
          `Bicarakan dengan teman sebangkumu atau saudaramu di rumah.`,
          `Buat gambar sederhana atau ceritakan kepada ayah dan ibu!`
        ],
        deliverable: `Cerita lisan atau gambar hasil pengamatanmu.`
      },
      video: {
        title: `Video Edukatif: Mengenal ${topic}`,
        duration: '3 menit 15 detik',
        reflectionPrompt: `Setelah menonton, apa satu kata yang paling menggambarkan ${topic} menurutmu?`
      },
      practiceQuestions: [
        {
          id: 'q-gen-1',
          type: 'pilihan_ganda',
          question: `Manakah sikap yang paling tepat saat mempelajari ${topic}?`,
          options: ['Ceria dan teliti', 'Cepat menyerah', 'Tidak mau bertanya', 'Mengabaikan teman'],
          correctAnswer: 'Ceria dan teliti',
          explanation: 'Sikap ceria dan teliti membuat proses belajar menyenangkan dan bermakna.',
          encouragement: 'Luar biasa! Sikap belajarmu patut diacungi jempol!'
        },
        {
          id: 'q-gen-2',
          type: 'benar_salah',
          question: `Mempelajari ${topic} dapat membantu kita dalam kehidupan sehari-hari.`,
          correctAnswer: true,
          explanation: 'Benar sekali! Semua ilmu bermanfaat untuk kebaikan kita dan sesama.',
          encouragement: 'Tepat sekali! Kamu pemikir hebat.'
        }
      ],
      reflection: {
        questions: [
          'Bagian mana dari materi ini yang paling kamu sukai?',
          'Apa yang ingin kamu ceritakan kepada orang tuamu hari ini?'
        ],
        reminder: 'Belajar adalah petualangan seumur hidup. Setiap langkah kecilmu sangat berharga!'
      },
      summary: [
        `${topic} adalah bagian berharga dari ${subject} untuk kelas ${grade}.`,
        'Pahami konsep dasarnya, praktikkan dalam keseharian, dan bagikan kepada orang tua.'
      ],
      parentGuide: {
        summary: `Ananda sedang mempelajari topik ${topic} pada mata pelajaran ${subject}. Tujuannya adalah mengasah daya nalar dan pemahaman kontekstual.`,
        guidance: `Orang tua cukup mendengarkan cerita anak dan menanyakan pengalaman belajarnya dengan hangat tanpa perlu menguji secara kaku.`,
        promptQuestions: [
          `“Hari ini apa hal paling seru yang ananda pelajari tentang ${topic}?”`,
          `“Bisa ceritakan ke Ibu/Ayah contoh nyatanya di rumah?”`,
          `“Ada bagian yang masih membuatmu penasaran?”`
        ],
        homeActivityDuration: '10–15 Menit',
        homeActivity: `Ajak anak mengamati benda atau suasana di rumah yang berkaitan dengan ${topic} selama 10 menit, lalu beri apresiasi hangat.`,
        exampleScenario: `Bisa dilakukan saat makan malam atau duduk santai di teras rumah.`,
        parentMindset: `Dukungan dan senyuman orang tua adalah pendorong utama rasa percaya diri anak.`
      }
    }
  };
}

export async function handleGenerateLkpd(body: {
  topic: string;
  grade: number;
  subject: string;
  learningGoal?: string;
}) {
  const { topic, grade, subject, learningGoal } = body;
  const client = getAiClient();

  if (client) {
    try {
      const prompt = `Anda adalah ahli pengembang Lembar Kerja Peserta Didik (LKPD) Kurikulum Merdeka SD.
Buatkan LKPD interaktif, ramah anak, dan kontekstual untuk:
- Mata Pelajaran: ${subject}
- Kelas: ${grade} SD
- Materi: ${topic}
- Tujuan: ${learningGoal || 'Memahami konsep dan menerapkannya dalam aktivitas nyata'}

Format keluaran JSON murni:
{
  "title": "LKPD: Petualangan Menjelajah ${topic}",
  "learningGoal": "Tujuan pembelajaran spesifik",
  "estimatedTime": "20–25 Menit",
  "instructions": [
    "Tuliskan namamu dengan bangga",
    "Baca petunjuk tiap langkah",
    "Bisa dikerjakan secara mandiri atau bersama orang tua di rumah"
  ],
  "activities": [
    {
      "id": "act-1",
      "stepNumber": 1,
      "title": "Misi Awal: Pengamatan",
      "instruction": "Instruksi langkah 1",
      "promptQuestion": "Pertanyaan pemandu",
      "studentInputType": "choice",
      "choices": ["Pilihan A", "Pilihan B", "Pilihan C"]
    },
    {
      "id": "act-2",
      "stepNumber": 2,
      "title": "Misi Analisis",
      "instruction": "Instruksi langkah 2",
      "promptQuestion": "Pertanyaan reflektif",
      "studentInputType": "text"
    },
    {
      "id": "act-3",
      "stepNumber": 3,
      "title": "Ceklis Mandiri",
      "instruction": "Centang hal yang sudah kamu kuasai:",
      "studentInputType": "checklist",
      "checklistItems": ["Saya paham konsep dasar", "Saya sudah mencoba mempraktikkan", "Saya sudah bercerita ke orang tua"]
    }
  ],
  "reflectionQuestions": [
    "Apa yang paling kamu sukai dari aktivitas ini?",
    "Siapa yang membantumu belajar hari ini?"
  ]
}`;

      const res = await client.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
      });

      const text = res.text?.trim() || '';
      const cleanJson = text.replace(/^```json\s*/, '').replace(/\s*```$/, '');
      const parsed = JSON.parse(cleanJson);
      return { success: true, data: parsed };
    } catch (err: any) {
      console.warn('Gemini API call for LKPD failed, using smart fallback:', err.message);
    }
  }

  // Fallback
  return {
    success: true,
    data: {
      title: `LKPD Eksplorasi: Menjelajahi ${topic}`,
      learningGoal: learningGoal || `Peserta didik mampu memahami dan menerapkan konsep ${topic} pada kelas ${grade}.`,
      estimatedTime: '20 Menit',
      instructions: [
        'Tuliskan nama lengkap dan kelasmu di kolom identitas.',
        'Bacalah setiap instruksi aktivitas dengan cermat dan riang gembira.',
        'Diskusikan dengan guru di sekolah atau orang tua di rumah jika memerlukan pendampingan.',
        'Ketikkan jawabanmu di lembar digital atau cetak untuk ditulis tangan.'
      ],
      activities: [
        {
          id: 'act-ai-1',
          stepNumber: 1,
          title: `Langkah 1: Mengamati Contoh Nyata ${topic}`,
          instruction: `Perhatikan keadaan di sekitarmu yang berkaitan dengan materi ${topic}. Manakah pernyataan yang paling tepat?`,
          promptQuestion: `Pilih jawaban yang paling sesuai:`,
          studentInputType: 'choice',
          choices: [
            `${topic} sangat berguna dalam keseharian kita`,
            `${topic} hanya ada di buku tanpa contoh nyata`,
            `${topic} tidak perlu dipelajari bersama`
          ]
        },
        {
          id: 'act-ai-2',
          stepNumber: 2,
          title: `Langkah 2: Menuliskan Penemuanmu`,
          instruction: `Jelaskan dengan bahasamu sendiri, apa manfaat yang kamu rasakan setelah mempelajari ${topic}?`,
          promptQuestion: `Ketikkan penjelasanmu di sini:`,
          studentInputType: 'text'
        },
        {
          id: 'act-ai-3',
          stepNumber: 3,
          title: `Langkah 3: Ceklis Belajar Ceria`,
          instruction: `Beri tanda centang pada pernyataan yang kamu setujui:`,
          studentInputType: 'checklist',
          checklistItems: [
            `Saya sudah membaca materi ${topic} dengan teliti.`,
            `Saya sudah mencoba latihan dan berani bertanya jika belum paham.`,
            `Saya telah berbagi cerita tentang hal ini kepada orang tua di rumah.`
          ]
        }
      ],
      reflectionQuestions: [
        `Hal baru apa yang paling membuatmu takjub hari ini?`,
        `Bagaimana perasaanmu setelah berhasil menyelesaikan LKPD ini?`
      ]
    }
  };
}

export async function handleSahabatChat(body: {
  message: string;
  role: string;
  grade: number;
  topic?: string;
  history?: { role: string; content: string }[];
}) {
  const { message, role, grade, topic, history = [] } = body;
  const client = getAiClient();

  const systemInstructions = `Anda adalah "🤖 SAHABAT ILMU", asisten AI pendidikan di portal "🏠 RUMAH ILMU (Teman Belajar Guru, Orang Tua, dan Anak)".
Peran pengguna saat ini: ${role.toUpperCase()} (Kelas anak/siswa: ${grade} SD).
Materi yang sedang dipelajari: ${topic || 'Materi Umum SD'}.

ATURAN PENTING & PRINSIP UTAMA:
1. JIKA SISWA BERTANYA TENTANG TUGAS ATAU SOAL: JANGAN LANGSUNG MEMBERIKAN JAWABAN AKHIR ATAU MEMBOCORKAN KUNCI JAWABAN!
2. Berikan:
   - Petunjuk bertahap (scaffolding)
   - Pertanyaan pemantik yang membimbing anak berpikir mandiri
   - Contoh sederhana yang mirip dari kehidupan sehari-hari
   - Langkah penyelesaian yang logis
3. Bahasa harus sangat hangat, santun, ceria, mendukung, dan disesuaikan dengan bahasa anak SD kelas ${grade} (atau orang tua jika penggunanya orang tua).
4. Jika orang tua yang bertanya, berikan tips pendampingan praktis 5–10 menit di rumah tanpa membuat orang tua merasa terbebani.
5. Gunakan sapaan bersahabat seperti: "Halo Sahabat Hebat!", "Wah pertanyaan yang bagus!", "Yuk kita telusuri bareng-bareng!".
6. Selalu akhiri dengan kata-kata apresiasi dan penguat motivasi.`;

  if (client) {
    try {
      const formattedHistory = history.map(h => `${h.role === 'user' ? 'User' : 'Sahabat Ilmu'}: ${h.content}`).join('\n');
      const fullPrompt = `${systemInstructions}\n\nRiwayat Percakapan:\n${formattedHistory}\nUser: ${message}\nSahabat Ilmu:`;

      const res = await client.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: fullPrompt,
      });

      return {
        success: true,
        reply: res.text || 'Halo! Sahabat Ilmu siap menemanimu belajar dengan riang gembira!'
      };
    } catch (err: any) {
      console.warn('Gemini chat failed, using fallback:', err.message);
    }
  }

  // Contextual fallback response
  let fallbackReply = `Halo Sahabat Hebat! 🌟 `;
  const lower = message.toLowerCase();
  if (lower.includes('pecahan')) {
    fallbackReply += `Pertanyaan seru tentang pecahan! Coba bayangkan kamu punya 1 loyang pizza yang dipotong jadi 4 potong sama besar. Kalau kamu makan 1 potong, itu namanya 1/4. Menurutmu, kalau dipotong jadi 8 potong, harus makan berapa potong biar sama kenyangnya? Coba tebak yuk! 🍕`;
  } else if (lower.includes('fotosintesis') || lower.includes('tumbuhan')) {
    fallbackReply += `Wah, kamu sedang menyelidiki rahasia tumbuhan hijau! Ingat 4 bahan penting koki daun: Air dari tanah, Matahari yang hangat, Klorofil di daun, dan Karbon Dioksida dari udara. Hasilnya adalah oksigen segar untuk kita hirup! Keren kan ciptaan Tuhan? 🌱`;
  } else if (lower.includes('tugas') || lower.includes('jawaban') || lower.includes('soal')) {
    fallbackReply += `Sahabat Ilmu tidak boleh membocorkan jawaban langsung ya, supaya otak hebatmu makin kuat dan cerdas! Tapi coba ceritakan: bagian mana yang paling membuatmu bingung? Nanti kita pecahkan langkah demi langkah bersama-sama! 💪✨`;
  } else if (role === 'orang_tua') {
    fallbackReply += `Terima kasih Ayah/Bunda sudah mendampingi ananda! Kunci mendampingi anak kelas ${grade} adalah mendengarkan dan mengaitkan materi dengan benda di rumah selama 10–15 menit. Tidak perlu cemas jika belum tahu semua rumus, apresiasi usaha dan rasa ingin tahu anak adalah hal paling berharga! ❤️`;
  } else {
    fallbackReply += `Senang sekali bisa belajar bersamamu! Kamu ingin kita bahas bagian konsep yang mana dulu nih? Yuk kita cari tahu bersama! 🚀📚`;
  }

  return { success: true, reply: fallbackReply };
}
