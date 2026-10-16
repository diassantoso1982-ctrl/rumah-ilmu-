import {
  Subject,
  LearningMaterial,
  LKPD,
  EduGame,
  ParentGuideArticle,
  StudentProgress,
  ParentTeacherNote,
  DailyLearningRecommendation,
  StudentRecord,
  UserProfile
} from '../types';

export const SUBJECTS: Subject[] = [
  { id: 'matematika', name: 'Matematika', icon: '🔢', color: 'from-blue-500 to-indigo-600', description: 'Numerasi, logika, bangun ruang, dan pecahan', grades: [1, 2, 3, 4, 5, 6] },
  { id: 'b_indonesia', name: 'Bahasa Indonesia', icon: '📖', color: 'from-emerald-500 to-teal-600', description: 'Literasi, membaca nyaring, menyimak & menulis kreatif', grades: [1, 2, 3, 4, 5, 6] },
  { id: 'ipas', name: 'IPAS (Sains & Sosial)', icon: '🌱', color: 'from-amber-500 to-orange-600', description: 'Eksplorasi alam, ekosistem, energi, dan masyarakat', grades: [3, 4, 5, 6] },
  { id: 'pancasila', name: 'Pendidikan Pancasila', icon: '🇮🇩', color: 'from-rose-500 to-red-600', description: 'Nilai luhur, gotong royong, aturan, dan cinta tanah air', grades: [1, 2, 3, 4, 5, 6] },
  { id: 'seni', name: 'Seni & Prakarya', icon: '🎨', color: 'from-purple-500 to-pink-600', description: 'Seni rupa, musik, tari, dan kreasi imajinatif', grades: [1, 2, 3, 4, 5, 6] },
  { id: 'agama', name: 'Pendidikan Agama & Budi Pekerti', icon: '🕌', color: 'from-cyan-500 to-blue-600', description: 'Keimanan, akhlak mulia, dan toleransi', grades: [1, 2, 3, 4, 5, 6] },
  { id: 'b_inggris', name: 'Bahasa Inggris', icon: '🇬🇧', color: 'from-violet-500 to-purple-600', description: 'Fun English, vocabulary, daily conversation & storytelling', grades: [1, 2, 3, 4, 5, 6] },
  { id: 'b_jawa', name: 'Bahasa Daerah (Jawa)', icon: '🗣️', color: 'from-yellow-600 to-amber-700', description: 'Unggah-ungguh basa, tembang dolanan, aksara & cerita rakyat', grades: [1, 2, 3, 4, 5, 6] },
  { id: 'koding', name: 'Koding / KKA', icon: '💻', color: 'from-sky-500 to-cyan-600', description: 'Berpikir komputasional, logika algoritma, dan literasi digital', grades: [4, 5, 6] },
  { id: 'pjok', name: 'PJOK (Olahraga)', icon: '🏃', color: 'from-lime-500 to-green-600', description: 'Gerak lokomotor, kebugaran jasmani, dan pola hidup sehat', grades: [1, 2, 3, 4, 5, 6] },
  { id: 'plh', name: 'PLH (Lingkungan Hidup)', icon: '🌿', color: 'from-teal-500 to-emerald-700', description: 'Pilah sampah, hemat air, cinta tanaman, dan energi hijau', grades: [1, 2, 3, 4, 5, 6] },
];

export const SAMPLE_MATERIALS: LearningMaterial[] = [
  {
    id: 'mat-5-pecahan',
    title: 'Mengenal Pecahan Senilai dan Operasi Hitung',
    subjectId: 'matematika',
    grade: 5,
    theme: 'Numerasi Praktis Sehari-hari',
    learningGoals: [
      'Memahami konsep pecahan senilai menggunakan benda konkret di sekitar kita.',
      'Menentukan pecahan senilai dengan mengalikan atau membagi pembilang dan penyebut.',
      'Menyelesaikan masalah sehari-hari yang berkaitan dengan pembagian kue atau buah.'
    ],
    apperception: 'Pernahkah kamu membagi satu loyang martabak manis atau pizza kepada 4 orang teman dengan adil? Berapa bagian yang didapatkan masing-masing temanmu?',
    coreContent: [
      {
        sectionTitle: 'Apa itu Pecahan Senilai?',
        text: 'Pecahan senilai adalah pecahan yang memiliki nilai atau besar yang sama meskipun angka pembilang dan penyebutnya berbeda. Bayangkan kue yang dipotong 2 bagian (1/2) memiliki luas yang sama persis dengan kue yang dipotong 4 bagian lalu kamu ambil 2 potong (2/4).',
        bulletPoints: [
          '1/2 sama besarnya dengan 2/4 dan 4/8.',
          'Pembilang adalah angka di atas (menunjukkan bagian yang diambil).',
          'Penyebut adalah angka di bawah (menunjukkan total seluruh potongan).'
        ],
        visualDescription: 'Ilustrasi lingkaran kue: setengah kue utuh sama besarnya dengan 2 dari 4 potong kue.',
        interactiveCheck: {
          question: 'Jika kamu memiliki 3/6 batang cokelat, apakah nilainya sama dengan 1/2?',
          answer: 'Ya, betul sekali! Karena jika 3/6 disederhanakan dengan dibagi 3 pada atas dan bawah, hasilnya adalah 1/2.'
        }
      },
      {
        sectionTitle: 'Cara Menemukan Pecahan Senilai',
        text: 'Untuk mencari pecahan yang senilai, kita bisa mengalikan atau membagi pembilang dan penyebut dengan angka yang SAMA (bukan nol).',
        bulletPoints: [
          'Contoh Perkalian: 1/2 x (2/2) = 2/4',
          'Contoh Perkalian: 2/3 x (3/3) = 6/9',
          'Contoh Pembagian: 4/8 : (4/4) = 1/2'
        ]
      }
    ],
    examples: [
      {
        situation: 'Ibu memotong semangka menjadi 8 potong sama besar. Kakak memakan 2 potong.',
        explanation: 'Bagian yang dimakan Kakak adalah 2/8. Jika kita sederhanakan (dibagi 2), 2/8 sama nilainya dengan 1/4 semangka.'
      },
      {
        situation: 'Budi memiliki 1/3 gelas susu, Rani memiliki 2/6 gelas susu yang ukurannya sama persis.',
        explanation: 'Apakah susu mereka sama banyak? Ya! 1/3 dan 2/6 adalah pecahan senilai, sehingga susunya sama banyak.'
      }
    ],
    studentActivity: {
      title: 'Aktivitas Kertas Lipat Pecahan',
      instructions: [
        'Ambil selembar kertas HVS atau buku tulis bekas.',
        'Lipat menjadi 2 bagian yang sama besar, warnai 1 bagian (ini adalah 1/2).',
        'Lipat lagi kertas tersebut menjadi 4 bagian. Lihat bagian yang diwarnai, sekarang menjadi berapa per berapa?',
        'Tuliskan kesimpulanmu di buku catatan atau LKPD!'
      ],
      deliverable: 'Foto atau perlihatkan lipatan kertas pecahanmu saat bercerita kepada orang tua.'
    },
    video: {
      title: 'Petualangan Pecahan Bersama Robot Pintar',
      duration: '4 menit 30 detik',
      youtubeId: 'p8kZ2T1M6vM',
      reflectionPrompt: 'Setelah menonton video, coba sebutkan 2 contoh pecahan senilai yang kamu temukan di sekitarmu!'
    },
    practiceQuestions: [
      {
        id: 'q1',
        type: 'pilihan_ganda',
        question: 'Pecahan berikut yang senilai dengan 1/2 adalah...',
        options: ['2/3', '2/4', '3/5', '1/4'],
        correctAnswer: '2/4',
        explanation: '1/2 senilai dengan 2/4 karena pembilang dan penyebut dikalikan 2.',
        encouragement: 'Hebat! Kamu paham konsep perbandingan pecahan.'
      },
      {
        id: 'q2',
        type: 'benar_salah',
        question: 'Pecahan 3/6 senilai dengan 1/3.',
        correctAnswer: false,
        explanation: 'Pecahan 3/6 senilai dengan 1/2 (dibagi 3/3), bukan 1/3.',
        encouragement: 'Bagus sudah mencoba! Ingat, 3 dibagi 3 adalah 1, dan 6 dibagi 3 adalah 2.'
      },
      {
        id: 'q3',
        type: 'isian',
        question: 'Lengkapilah: 2/5 = ... / 10',
        correctAnswer: '4',
        explanation: 'Penyebut 5 dikali 2 menjadi 10, maka pembilang 2 juga dikali 2 menjadi 4.',
        encouragement: 'Super teliti! Kamu jago numerasi.'
      }
    ],
    reflection: {
      questions: [
        'Bagian mana yang paling mudah kamu pahami hari ini?',
        'Apakah kamu sudah bisa menemukan benda pecahan di dapur rumahmu?'
      ],
      reminder: 'Ingat, matematika ada di mana-mana di sekitar kita saat kita saling berbagi!'
    },
    summary: [
      'Pecahan senilai bernilai sama besar walau angkanya berbeda.',
      'Dapat dicari dengan mengalikan atau membagi pembilang dan penyebut dengan angka yang sama.',
      'Konsep pecahan sangat membantu kita berbagi makanan secara adil.'
    ],
    parentGuide: {
      summary: 'Ananda sedang mempelajari konsep pecahan senilai (misal: 1/2 sama besarnya dengan 2/4). Tujuannya agar ananda memahami konsep berbagi adil dengan logika visual.',
      guidance: 'Orang tua tidak perlu mengajarkan rumus rumit. Cukup gunakan benda nyata di rumah seperti buah, roti tawar, atau cokelat batang. Dampingi ananda dengan penuh senyuman dan apresiasi setiap jawabannya.',
      promptQuestions: [
        '“Kak/Dek, kalau roti tawar ini dipotong jadi dua, satu potongnya disebut apa ya?”',
        '“Kalau satu potong tadi dipotong lagi jadi dua, sekarang rotinya jadi berapa potong?”',
        '“Menurutmu, lebih besar 1/2 potong roti atau 2/4 potong roti? Mengapa?”'
      ],
      homeActivityDuration: '10–15 Menit',
      homeActivity: 'Ambil 1 lembar roti tawar atau sebutir telur dadar. Minta anak memotongnya menjadi 2 bagian, lalu potong lagi menjadi 4 bagian. Ajak anak melihat bahwa 1/2 potong besarnya persis sama dengan 2 potong dari 4 bagian.',
      exampleScenario: 'Saat makan malam, ajak anak membagi tahu goreng atau tempe untuk anggota keluarga sambil menghitung bagian pecahannya.',
      parentMindset: 'Fokuslah pada rasa ingin tahu anak. Jika anak keliru menjawab, jangan marahi, katakan: “Yuk kita potong bersama dan kita buktikan!”'
    }
  },
  {
    id: 'ipas-4-fotosintesis',
    title: 'Bagaimana Tumbuhan Memasak: Proses Fotosintesis',
    subjectId: 'ipas',
    grade: 4,
    theme: 'Keajaiban Alam Sekitar',
    learningGoals: [
      'Mengidentifikasi kebutuhan tumbuhan untuk melakukan fotosintesis (cahaya, air, klorofil, karbon dioksida).',
      'Menjelaskan hasil dari proses fotosintesis (karbohidrat dan oksigen) bagi kehidupan di bumi.',
      'Menumbuhkan rasa syukur dan kepedulian terhadap kelestarian tanaman di sekitar rumah.'
    ],
    apperception: 'Pernahkah kamu berpikir, hewan dan manusia harus makan nasi atau buah. Tapi mengapa pohon mangga yang diam saja di halaman bisa tumbuh besar dan berbuah lezat? Dari mana makanannya?',
    coreContent: [
      {
        sectionTitle: 'Dapur Alami di Daun Hijau',
        text: 'Tumbuhan adalah makhluk hidup ajaib yang dapat memasak makanannya sendiri! Proses ini disebut fotosintesis (foto = cahaya, sintesis = penggabungan). Daun hijau memiliki zat warna bernama klorofil yang berfungsi seperti koki di dapur.',
        bulletPoints: [
          'Akar menyerap air dan mineral dari dalam tanah.',
          'Daun menyerap karbon dioksida dari udara melalui lubang kecil bernama stomata.',
          'Klorofil menangkap sinar matahari sebagai sumber energi panas untuk memasak.'
        ],
        visualDescription: 'Bagan fotosintesis: Matahari + Air + CO2 diserap daun, menghasilkan Oksigen yang kita hirup dan Glukosa cadangan makanan.',
        interactiveCheck: {
          question: 'Apa gas penting yang dikeluarkan tumbuhan saat fotosintesis dan sangat kita butuhkan untuk bernapas?',
          answer: 'Oksigen (O2)! Itulah mengapa berada di bawah pohon rindang saat siang terasa sejuk dan segar.'
        }
      }
    ],
    examples: [
      {
        situation: 'Tanaman di pot dalam kamar gelap terlihat layu dan pucat setelah seminggu.',
        explanation: 'Tanaman tersebut kekurangan sinar matahari sehingga tidak bisa memasak makanannya (fotosintesis terhambat).'
      }
    ],
    studentActivity: {
      title: 'Detektif Daun di Pekarangan Rumah',
      instructions: [
        'Cari 2 helai daun tanaman yang berbeda di pekarangan rumahmu.',
        'Raba permukaannya, apakah halus atau berbulu? Amati urat-urat daunnya di bawah cahaya.',
        'Jelaskan kepada ayah atau ibu bagian mana yang menyerap sinar matahari!'
      ],
      deliverable: 'Ceritakan hasil pengamatan daunmu dengan ceria.'
    },
    video: {
      title: 'Animasi Seru: Perjalanan Air dan Cahaya di Tubuh Pohon',
      duration: '3 menit 45 detik',
      youtubeId: 'UPBMG5EYydo',
      reflectionPrompt: 'Mengapa kita harus rajin menyiram tanaman di rumah setiap hari?'
    },
    practiceQuestions: [
      {
        id: 'q-ipas-1',
        type: 'pilihan_ganda',
        question: 'Zat hijau daun yang menangkap energi cahaya matahari disebut...',
        options: ['Stomata', 'Klorofil', 'Akar', 'Oksigen'],
        correctAnswer: 'Klorofil',
        explanation: 'Klorofil adalah pigmen hijau daun yang berfungsi menyerap cahaya matahari.',
        encouragement: 'Luar biasa! Pengetahuan sainsmu mantap.'
      },
      {
        id: 'q-ipas-2',
        type: 'benar_salah',
        question: 'Fotosintesis menghasilkan oksigen yang bermanfaat untuk pernapasan manusia.',
        correctAnswer: true,
        explanation: 'Benar sekali, fotosintesis menghasilkan glukosa (makanan tumbuhan) dan melepaskan oksigen.',
        encouragement: 'Hebat! Kamu peduli pada alam sekitar.'
      }
    ],
    reflection: {
      questions: [
        'Bagaimana perasaanmu setelah tahu pohon memberikan oksigen gratis untuk kita setiap hari?',
        'Aksi apa yang bisa kamu lakukan untuk merawat tanaman di rumah?'
      ],
      reminder: 'Menjaga satu tanaman berarti menjaga napas bumi!'
    },
    summary: [
      'Fotosintesis butuh: Air, Cahaya Matahari, Klorofil, dan Karbon Dioksida.',
      'Hasil fotosintesis: Makanan (Glukosa) dan Oksigen (O2).',
      'Tumbuhan sangat berjasa bagi kehidupan seluruh makhluk hidup di bumi.'
    ],
    parentGuide: {
      summary: 'Ananda belajar tentang fotosintesis — bagaimana tumbuhan membuat makanan dan menghasilkan oksigen bagi kita.',
      guidance: 'Ajak ananda berjalan ke teras atau halaman rumah. Amati tanaman bersama anak tanpa harus menghafal istilah teknis secara kaku.',
      promptQuestions: [
        '“Menurutmu, kenapa daun kebanyakan berwarna hijau ya?”',
        '“Kalau tanaman tidak disiram dan ditaruh di tempat gelap, apa yang akan terjadi?”',
        '“Mengapa kita merasa segar saat berteduh di bawah pohon rindang?”'
      ],
      homeActivityDuration: '10 Menit',
      homeActivity: 'Ajak anak menyiram tanaman di rumah bersama sambil mengamati titik air di daun dan menghirup udara segar bersama-sama.',
      exampleScenario: 'Ambil sehelai daun, terawang ke arah cahaya bersama anak dan tunjukkan tulang daun tempat mengalirkan air.',
      parentMindset: 'Apresiasi rasa ingin tahu anak terhadap ciptaan Tuhan dan biasakan mencintai lingkungan sejak dini.'
    }
  },
  {
    id: 'bind-1-huruf-vokal',
    title: 'Mengenal Huruf Vokal A, I, U, E, O dengan Ceria',
    subjectId: 'b_indonesia',
    grade: 1,
    theme: 'Literasi Awal Menyenangkan',
    learningGoals: [
      'Mengenal bentuk dan bunyi huruf vokal (A, I, U, E, O).',
      'Menyebutkan benda dan nama hewan yang berawalan huruf vokal.',
      'Menuliskan huruf vokal dengan gerakan tangan yang tepat dan gembira.'
    ],
    apperception: 'Buka mulutmu lebar-lebar: AAAA! Seperti dokter memeriksa gigimu. Huruf apa itu?',
    coreContent: [
      {
        sectionTitle: '5 Sahabat Huruf Vokal',
        text: 'Ada lima huruf istimewa yang membuat kata-kata bisa bersuara merdu: A, I, U, E, O.',
        bulletPoints: [
          'A untuk AYAM dan APEL',
          'I untuk IKAN dan ITIK',
          'U untuk UDANG dan ULAR',
          'E untuk ELANG dan EMAS',
          'O untuk OBAT dan ONTA'
        ],
        visualDescription: 'Gambar huruf A I U E O dengan warna-warni ceria dan karakter kartun binatang lucu.',
        interactiveCheck: {
          question: 'Hewan yang bisa berenang di air, berawalan huruf I... apa ya?',
          answer: 'IKAN! Pintar sekali!'
        }
      }
    ],
    examples: [
      {
        situation: 'Kata: A - Y - A - H',
        explanation: 'Huruf pertamanya adalah huruf vokal A.'
      }
    ],
    studentActivity: {
      title: 'Tebak Bunyi Suara Huruf',
      instructions: [
        'Ucapkan huruf A dengan suara berbisik.',
        'Ucapkan huruf I dengan senyum lebar.',
        'Bentuk bibirmu bulat seperti donat untuk membunyikan O!'
      ],
      deliverable: 'Tunjukkan senyum terlebar saat membunyikan huruf I di depan ayah atau ibu!'
    },
    video: {
      title: 'Lagu Ceria Huruf Vokal A-I-U-E-O',
      duration: '2 menit 15 detik',
      youtubeId: '1g37o1V2n2U',
      reflectionPrompt: 'Huruf vokal mana yang paling kamu sukai bunyinya?'
    },
    practiceQuestions: [
      {
        id: 'q-vokal-1',
        type: 'pilihan_ganda',
        question: 'Kata "APEL" diawali oleh huruf vokal...',
        options: ['A', 'I', 'U', 'O'],
        correctAnswer: 'A',
        explanation: 'Huruf pertama dari kata Apel adalah A.',
        encouragement: 'Bintang lima untukmu! Kamu pintar membaca.'
      }
    ],
    reflection: {
      questions: [
        'Apakah kamu senang bernyanyi huruf vokal hari ini?'
      ],
      reminder: 'Membaca itu seperti membuka pintu petualangan baru!'
    },
    summary: [
      'Huruf vokal ada 5: A, I, U, E, O.',
      'Setiap huruf punya bunyi dan bentuk yang unik.'
    ],
    parentGuide: {
      summary: 'Ananda kelas 1 sedang menguatkan fondasi literasi awal dengan mengenali bunyi (fonemik) dan bentuk huruf vokal A, I, U, E, O.',
      guidance: 'Gunakan intonasi yang ceria dan ekspresif. Hindari memaksa anak menghafal cepat; ajak bermain tebak-tebakan kata di sekitar rumah.',
      promptQuestions: [
        '“Adek, coba tebak benda di kulkas yang depannya E apa ya? (Es batu/Es krim)”',
        '“Kalau mama bilang U-D-A-N-G, huruf depannya apa ya sayang?”'
      ],
      homeActivityDuration: '10 Menit',
      homeActivity: 'Buat bentuk huruf A, I, U, E, O menggunakan plastisin, sendok di meja makan, atau menggambar di udara bersama anak.',
      exampleScenario: 'Saat membaca buku dongeng sebelum tidur, minta anak menunjuk huruf O yang bentuknya bulat seperti roda.',
      parentMindset: 'Pujian yang hangat seperti: “Wah, telingamu jeli sekali mendengar bunyi huruf!” akan membuat anak percaya diri mencintai buku.'
    }
  },
  {
    id: 'pancasila-3-gotong-royong',
    title: 'Indahnya Gotong Royong dan Kerja Sama di Rumah & Sekolah',
    subjectId: 'pancasila',
    grade: 3,
    theme: 'Profil Pelajar Pancasila',
    learningGoals: [
      'Menjelaskan arti penting kerja sama dan gotong royong.',
      'Mencontohkan perilaku gotong royong di lingkungan keluarga dan sekolah.',
      'Menerapkan sikap peduli dan saling membantu tanpa membeda-bedakan.'
    ],
    apperception: 'Bisa kamu mengangkat meja belajar yang berat sendirian? Tapi bagaimana jika diangkat bersama 3 orang temanmu?',
    coreContent: [
      {
        sectionTitle: 'Berat Sama Dipikul, Ringan Sama Dijinjing',
        text: 'Gotong royong adalah warisan budaya luhur bangsa Indonesia yang tercermin dalam sila ketiga Pancasila: Persatuan Indonesia. Ketika kita bekerja sama, pekerjaan berat menjadi ringan dan pekerjaan lama selesai lebih cepat.',
        bulletPoints: [
          'Di Rumah: Membantu ibu merapikan meja makan, menyapu halaman bersama kakak.',
          'Di Sekolah: Melaksanakan piket kelas, merapikan buku perpustakaan bersama kawan.'
        ]
      }
    ],
    examples: [
      {
        situation: 'Warga desa membersihkan selokan menjelang musim hujan secara sukarela.',
        explanation: 'Kerja bakti ini mencegah banjir dan menjaga lingkungan tetap sehat untuk semua orang.'
      }
    ],
    studentActivity: {
      title: 'Misi Ksatria Bantuan di Rumah',
      instructions: [
        'Pilih 1 tugas rumah tangga hari ini (misal: menyiram tanaman atau membereskan mainan).',
        'Lakukan tanpa disuruh dengan senyum ikhlas.',
        'Rasakan bagaimana rasanya membuat orang tua bahagia!'
      ],
      deliverable: 'Tuliskan satu kebaikan yang kamu lakukan hari ini di jurnal belajarmu.'
    },
    video: {
      title: 'Cerita Animasi: Semut Kecil dan Gula Besar',
      duration: '3 menit 10 detik',
      youtubeId: '6eQfE9xH4lI',
      reflectionPrompt: 'Pelajaran apa yang bisa kita ambil dari kawanan semut yang saling membantu?'
    },
    practiceQuestions: [
      {
        id: 'q-pan-1',
        type: 'benar_salah',
        question: 'Gotong royong membuat pekerjaan yang berat terasa lebih ringan.',
        correctAnswer: true,
        explanation: 'Benar! Gotong royong meringankan beban dan mempererat kerukunan.',
        encouragement: 'Hebat! Kamu anak berhati mulia.'
      }
    ],
    reflection: {
      questions: ['Siapa yang sudah kamu bantu hari ini?'],
      reminder: 'Satu kebaikan kecil setiap hari membuat dunia lebih bersinar!'
    },
    summary: [
      'Gotong royong adalah bekerja bersama-sama untuk kepentingan bersama.',
      'Menciptakan kerukunan, persaudaraan, dan kedamaian.'
    ],
    parentGuide: {
      summary: 'Materi ini melatih empati, tanggung jawab sosial, dan kemandirian anak melalui budaya gotong royong di keluarga.',
      guidance: 'Libatkan anak dalam kegiatan rumah tangga kecil tanpa nada memerintah, jadikan momen kebersamaan yang menyenangkan.',
      promptQuestions: [
        '“Menurutmu, kalau kita beres-beres rumah bareng, enakan kerja sendiri atau rame-rame?”',
        '“Apa yang bisa kita bantu saat kakek atau tetangga sedang kerepotan?”'
      ],
      homeActivityDuration: '15 Menit',
      homeActivity: 'Adakan “Operasi Semut 10 Menit” di rumah: putar musik ceria, semua anggota keluarga merapikan barang masing-masing selama 10 menit.',
      exampleScenario: 'Minta anak membantu menaruh piring plastik ke tempat cuci atau melipat selimut sendiri setelah bangun tidur.',
      parentMindset: 'Beri apresiasi tulus pada niat membantu anak, meskipun hasilnya belum sesempurna orang dewasa.'
    }
  },
  {
    id: 'mat-6-lingkaran',
    title: 'Menjelajahi Unsur dan Keliling Lingkaran',
    subjectId: 'matematika',
    grade: 6,
    theme: 'Geometri dan Pengukuran',
    learningGoals: [
      'Mengidentifikasi unsur-unsur lingkaran (titik pusat, jari-jari, diameter, busur, tali busur, juring, dan tembereng).',
      'Memahami nilai pendekatan pi (π ≈ 22/7 atau 3,14).',
      'Menghitung keliling lingkaran pada benda berbentuk bundar di kehidupan sehari-hari.'
    ],
    apperception: 'Mengapa roda sepeda, mobil, dan gerobak semuanya berbentuk lingkaran? Bayangkan jika roda berbentuk kotak!',
    coreContent: [
      {
        sectionTitle: 'Unsur Penting Lingkaran',
        text: 'Lingkaran adalah kumpulan titik yang berjarak sama dari suatu titik pusat.',
        bulletPoints: [
          'Titik Pusat (O): Titik yang tepat berada di tengah lingkaran.',
          'Jari-jari (r): Jarak dari titik pusat ke tepi lingkaran.',
          'Diameter (d): Garis lurus yang menghubungkan dua titik pada tepi lingkaran melalui titik pusat (d = 2 x r).',
          'Keliling (K): Panjang garis lengkung tepi lingkaran. Rumus: K = 2 x π x r atau K = π x d.'
        ]
      }
    ],
    examples: [
      {
        situation: 'Sebuah piring bundar memiliki diameter 14 cm. Berapakah kelilingnya?',
        explanation: 'K = π x d = 22/7 x 14 cm = 44 cm. Jadi panjang tepi piring tersebut adalah 44 cm.'
      }
    ],
    studentActivity: {
      title: 'Eksperimen Benang dan Tutup Panci',
      instructions: [
        'Cari benda bundar di rumah (tutup toples, koin, atau tutup botol).',
        'Lilitkan benang pada tepiannya satu putaran penuh lalu ukur panjang benang dengan penggaris.',
        'Ukur pula diameter benda tersebut dan bandingkan Keliling : Diameter! Kamu akan menemukan keajaiban angka 3,14!'
      ],
      deliverable: 'Catat hasil perbandingan Keliling terhadap Diameter benda yang kamu ukur.'
    },
    video: {
      title: 'Misteri Angka Pi (π) dan Lingkaran Ajaib',
      duration: '4 menit 10 detik',
      youtubeId: 'Wk6Jm-Cqg48',
      reflectionPrompt: 'Mengapa nilai pi kira-kira selalu 3,14 untuk lingkaran ukuran apa pun?'
    },
    practiceQuestions: [
      {
        id: 'q-lingk-1',
        type: 'pilihan_ganda',
        question: 'Jika jari-jari lingkaran (r) adalah 7 cm, berapakah panjang diameternya?',
        options: ['7 cm', '14 cm', '21 cm', '28 cm'],
        correctAnswer: '14 cm',
        explanation: 'Diameter adalah dua kali jari-jari (d = 2 x r = 2 x 7 = 14 cm).',
        encouragement: 'Tepat sekali! Pemahaman geometrimu sangat baik.'
      }
    ],
    reflection: {
      questions: ['Benda lingkaran apa saja yang kamu temukan di sekitarmu hari ini?'],
      reminder: 'Setiap putaran roda membawa kita melangkah lebih jauh menuju cita-cita!'
    },
    summary: [
      'Diameter sama dengan 2 kali jari-jari.',
      'Rumus keliling lingkaran adalah K = 2 × π × r atau π × d.'
    ],
    parentGuide: {
      summary: 'Ananda kelas 6 mempelajari geometri lingkaran dan menghitung keliling menggunakan perbandingan pi (22/7 atau 3,14).',
      guidance: 'Bantu anak menghubungkan konsep dengan benda riil seperti roda sepeda, jam dinding bundar, atau piring.',
      promptQuestions: [
        '“Menurutmu kalau roda sepeda berputar 1 kali, seberapa jauh sepedamu meluncur?”',
        '“Bagaimana cara mengukur keliling tutup toples tanpa penggaris melingkar?”'
      ],
      homeActivityDuration: '15 Menit',
      homeActivity: 'Ajak anak mengukur roda sepeda atau piring menggunakan tali rafia atau meteran baju, lalu hitung perkiraan kelilingnya bersama.',
      exampleScenario: 'Saat bersepeda di sore hari, diskusikan bahwa putaran roda berhubungan langsung dengan keliling lingkaran roda.',
      parentMindset: 'Fokus pada pemahaman mengapa rumusnya bekerja, bukan sekadar menghafal angka.'
    }
  }
];

export const SAMPLE_LKPDS: LKPD[] = [
  {
    id: 'lkpd-mat-5-pecahan',
    title: 'LKPD Interaktif: Ekspedisi Berbagi Pecahan Senilai',
    subjectId: 'matematika',
    grade: 5,
    learningGoal: 'Peserta didik mampu membuktikan dan menentukan pecahan senilai melalui model konkret dan representasi visual.',
    estimatedTime: '25 Menit',
    instructions: [
      'Tuliskan identitas namamu dengan lengkap dan rapi.',
      'Bacalah setiap petunjuk aktivitas dengan teliti.',
      'Gunakan alat bantu konkret (seperti kertas lipat atau penggaris) jika diperlukan.',
      'Tuliskan jawaban langsung pada lembar digital ini atau cetak jika ingin dikerjakan di kertas bersama orang tua.'
    ],
    activities: [
      {
        id: 'act-1',
        stepNumber: 1,
        title: 'Aktivitas Lipatan Kertas',
        instruction: 'Jika satu kertas persegi dilipat 2 dan diarsir 1 bagian, nilainya 1/2. Jika dilipat lagi menjadi 4 bagian sama besar, berapa banyak bagian yang terarsir sekarang?',
        promptQuestion: 'Berapa pecahan baru yang senilai dengan 1/2?',
        studentInputType: 'choice',
        choices: ['1/4 bagian', '2/4 bagian', '3/4 bagian', '4/4 bagian']
      },
      {
        id: 'act-2',
        stepNumber: 2,
        title: 'Misi Pembagian Martabak Manis',
        instruction: 'Ibu membeli 1 martabak dan memotongnya menjadi 6 bagian sama besar. Adik memakan 2 bagian martabak.',
        promptQuestion: 'Tuliskan pecahan bagian adik dan tentukan pecahan paling sederhana yang senilai dengannya!',
        studentInputType: 'text'
      },
      {
        id: 'act-3',
        stepNumber: 3,
        title: 'Ceklis Pemahaman Mandiri',
        instruction: 'Beri tanda centang pada pernyataan yang kamu setujui:',
        studentInputType: 'checklist',
        checklistItems: [
          'Saya mengerti bahwa 1/3 sama besarnya dengan 2/6.',
          'Saya bisa mengalikan pembilang dan penyebut dengan angka yang sama.',
          'Saya sudah mencoba menjelaskan pecahan kepada orang tua di rumah.'
        ]
      }
    ],
    reflectionQuestions: [
      'Apa hal paling berkesan saat kamu mempraktikkan pecahan hari ini?',
      'Apakah kamu merasa lebih percaya diri menyelesaikan soal pecahan?'
    ],
    createdBy: 'Ibu Ratna Dewi, S.Pd. (Guru SD Negeri Cempaka 01)',
    createdAt: '2026-10-01'
  },
  {
    id: 'lkpd-ipas-4-fotosintesis',
    title: 'LKPD Eksplorasi: Detektif Dapur Tumbuhan',
    subjectId: 'ipas',
    grade: 4,
    learningGoal: 'Membuktikan kebutuhan dan hasil fotosintesis pada tumbuhan hijau di sekitar lingkungan sekolah dan rumah.',
    estimatedTime: '20 Menit',
    instructions: [
      'Amati tanaman hidup di sekitarmu.',
      'Jawab pertanyaan investigasi berdasarkan petunjuk klorofil dan fotosintesis.'
    ],
    activities: [
      {
        id: 'act-ipas-1',
        stepNumber: 1,
        title: 'Bahan Baku Masakan Tumbuhan',
        instruction: 'Tuliskan 4 bahan utama yang diperlukan tanaman untuk melakukan fotosintesis!',
        promptQuestion: 'Ketikkan 4 bahan tersebut:',
        studentInputType: 'text'
      },
      {
        id: 'act-ipas-2',
        stepNumber: 2,
        title: 'Pilihan Analisis Logika',
        instruction: 'Mengapa rumput yang tertutup terpal selama beberapa hari warnanya menguning atau memutih?',
        studentInputType: 'choice',
        choices: [
          'Karena rumput kedinginan',
          'Karena tidak mendapatkan sinar matahari untuk fotosintesis',
          'Karena terlalu banyak air',
          'Karena dimakan serangga'
        ]
      }
    ],
    reflectionQuestions: [
      'Bagaimana cara kamu membalas kebaikan tumbuhan yang telah memberimu oksigen?'
    ],
    createdBy: 'Pak Bambang Hermanto, M.Pd.',
    createdAt: '2026-10-03'
  }
];

export const SAMPLE_GAMES: EduGame[] = [
  {
    id: 'game-roda-1',
    type: 'roda_pertanyaan',
    title: 'Roda Putar Cerdas Numerasi',
    description: 'Putar roda keberuntungan dan jawab tantangan matematika seru!',
    subjectId: 'matematika',
    grade: 5,
    icon: '🎡',
    content: {
      segments: [
        { label: 'Pecahan Senilai', question: 'Berapakah pecahan yang senilai dengan 3/5 jika dikali 2?', answer: '6/10', points: 15 },
        { label: 'Tantangan Cepat', question: 'Setengah dari 50 adalah...?', answer: '25', points: 10 },
        { label: 'Soal Cerita', question: 'Roti dipotong 8, kamu makan 4. Berapa pecahan sederhananya?', answer: '1/2', points: 20 },
        { label: 'Bintang Bonus', question: 'Sebutkan angka pembilang dari 7/9!', answer: '7', points: 10 },
        { label: 'Tebak Simbol', question: 'Apakah 2/4 > 1/2 atau 2/4 = 1/2?', answer: '=', points: 15 },
        { label: 'Super Genius', question: '1/4 + 2/4 = berapa?', answer: '3/4', points: 20 }
      ]
    }
  },
  {
    id: 'game-susun-kata-1',
    type: 'susun_kata',
    title: 'Susun Kata: Kosa Kata Sains',
    description: 'Acak dan susun huruf-huruf menjadi istilah ilmiah yang tepat!',
    subjectId: 'ipas',
    grade: 4,
    icon: '🧩',
    content: {
      puzzles: [
        { scrambled: 'K - L - O - R - O - F - I - L', correct: 'KLOROFIL', hint: 'Zat hijau daun penyerap cahaya' },
        { scrambled: 'S - T - O - M - A - T - A', correct: 'STOMATA', hint: 'Mulut daun untuk pertukaran udara' },
        { scrambled: 'O - K - S - I - G - E - N', correct: 'OKSIGEN', hint: 'Gas segar yang kita hirup untuk bernapas' },
        { scrambled: 'A - K - A - R', correct: 'AKAR', hint: 'Bagian tumbuhan yang menyerap air dari tanah' }
      ]
    }
  },
  {
    id: 'game-detektif-1',
    type: 'detektif_konsep',
    title: 'Detektif Fakta & Konsep',
    description: 'Pilih apakah fakta berikut Benar atau Mitos belaka!',
    subjectId: 'pancasila',
    grade: 3,
    icon: '🔎',
    content: {
      statements: [
        { text: 'Gotong royong hanya boleh dilakukan saat ada bencana besar.', isTrue: false, explanation: 'Salah. Gotong royong bisa dilakukan setiap hari dari hal kecil seperti merapikan rumah.' },
        { text: 'Pekerjaan berat menjadi lebih ringan jika dikerjakan bersama-sama.', isTrue: true, explanation: 'Benar! Itulah manfaat utama kerja sama.' },
        { text: 'Membantu orang tua di rumah merupakan contoh pengamalan nilai Pancasila.', isTrue: true, explanation: 'Tepat sekali! Gotong royong dan berbakti adalah nilai luhur bangsa.' }
      ]
    }
  },
  {
    id: 'game-dadu-1',
    type: 'dadu_edukasi',
    title: 'Dadu Edukasi Karakter',
    description: 'Kocok dadu dan selesaikan misi kebaikan serta kuis spontan!',
    subjectId: 'pancasila',
    grade: 1,
    icon: '🎲',
    content: {
      diceFaces: [
        { number: 1, challenge: 'Ucapkan kata tolong kepada ayah/ibu dengan sopan!' },
        { number: 2, challenge: 'Sebutkan 3 nama teman sekelasmu yang paling ramah!' },
        { number: 3, challenge: 'Tersenyum dan rapikan 1 barang di meja belajarmu!' },
        { number: 4, challenge: 'Ucapkan: “Terima kasih telah membantuku belajar!”' },
        { number: 5, challenge: 'Sebutkan warna bendera Indonesia dan artinya!' },
        { number: 6, challenge: 'Lakukan tos bersama orang tuamu karena kamu hebat!' }
      ]
    }
  }
];

export const PARENT_GUIDE_ARTICLES: ParentGuideArticle[] = [
  {
    id: 'guide-1',
    title: 'Cara Mendampingi Anak Belajar Tanpa Stres',
    icon: '🧘',
    category: 'Pendampingan Harian',
    summary: 'Orang tua bukan guru pengganti yang harus tahu segalanya. Kunci utamanya adalah menjadi fasilitator, pendengar aktif, dan pemberi semangat.',
    actionSteps: [
      'Siapkan suasana yang tenang dan bebas gangguan gawai televisi saat jam belajar.',
      'Duduk sejajar di samping anak, bukan berdiri di atasnya seperti pengawas.',
      'Tanyakan: “Bagian mana yang paling seru hari ini?” alih-alih “Dapat nilai berapa?”.',
      'Bila anak bingung, jangan langsung memberi tahu jawabannya; pancing dengan pertanyaan kecil.'
    ],
    dosAndDonts: [
      { do: 'Mendengarkan cara berpikir anak dengan sabar.', dont: 'Merebut pensil dan mengerjakan soal untuk anak.' },
      { do: 'Mengapresiasi usaha keras dan ketekunan anak.', dont: 'Membandingkan kecepatan anak dengan saudara atau temannya.' }
    ],
    realLifeExample: 'Ketika anak kesulitan soal pecahan, katakan: “Bunda juga penasaran nih. Yuk kita bayangkan kalau ini adalah pizza favoritmu, gimana cara motongnya ya?”'
  },
  {
    id: 'guide-2',
    title: 'Membangun Jadwal Belajar yang Realistis & Menyenangkan',
    icon: '⏰',
    category: 'Manajemen Waktu',
    summary: 'Jadwal yang kaku sering memicu konflik. Libatkan anak dalam menyusun ritme harian agar mereka merasa memiliki tanggung jawab.',
    actionSteps: [
      'Sepakati waktu belajar tetap yang pendek namun rutin (misal 20–30 menit setelah ashar atau mandi sore).',
      'Sertakan jeda istirahat (teknik Pomodoro anak: 15 menit belajar, 5 menit peregangan/minum air).',
      'Buat papan jadwal visual bersama anak menggunakan stiker atau gambar kartun kesukaannya.'
    ],
    dosAndDonts: [
      { do: 'Fleksibel bila anak tampak sangat lelah setelah beraktivitas.', dont: 'Menambah jam belajar sebagai hukuman bila anak berbuat salah.' }
    ],
    realLifeExample: 'Ajak anak mewarnai jadwal belajarnya sendiri: warna biru untuk membaca, kuning untuk berhitung, dan hijau untuk bermain bebas.'
  },
  {
    id: 'guide-3',
    title: 'Membantu Anak Belajar Membaca dengan Ceria',
    icon: '📖',
    category: 'Literasi',
    summary: 'Membaca bukanlah ujian kecepatan mengeja, melainkan petualangan imajinasi dan penemuan makna.',
    actionSteps: [
      'Gunakan teknik Membaca Nyaring (Read Aloud) 10 menit setiap hari sebelum tidur.',
      'Gunakan jari untuk menunjuk kata-kata sambil bersuara dengan intonasi hidup.',
      'Tanyakan perasaan tokoh cerita: “Kira-kira si kancil takut nggak ya waktu ketemu buaya?”'
    ],
    dosAndDonts: [
      { do: 'Biarkan anak memilih buku yang ia sukai.', dont: 'Memaksa anak membaca buku teks berat yang tidak menarik minatnya.' }
    ],
    realLifeExample: 'Jika anak salah mengeja, ulangi kata tersebut dengan benar dalam kalimat yang natural tanpa memotong dengan kata “Salah!”.'
  },
  {
    id: 'guide-4',
    title: 'Membantu Anak Gemar Berhitung (Numerasi Tanpa Takut)',
    icon: '🔢',
    category: 'Numerasi',
    summary: 'Matematika bukan cuma angka di kertas, melainkan bahasa untuk memahami pola di dunia sekitar.',
    actionSteps: [
      'Libatkan anak saat berbelanja di warung: menghitung uang kembalian atau jumlah telur.',
      'Gunakan balok, sendok, atau kancing baju untuk memahami penjumlahan dan pengurangan nyata.',
      'Ajak anak mencari pola angka di nomor rumah, pelat kendaraan, atau kalender dinding.'
    ],
    dosAndDonts: [
      { do: 'Fokus pada pemahaman konsep dan logika.', dont: 'Menuntut kecepatan menghafal rumus secara instan.' }
    ],
    realLifeExample: '“Adek, kita butuh 6 buah pisang. Di keranjang baru ada 2. Berapa buah lagi yang harus kita ambil ya?”'
  },
  {
    id: 'guide-5',
    title: 'Menghadapi Anak yang Sulit Fokus Saat Belajar',
    icon: '🎯',
    category: 'Perhatian & Konsentrasi',
    summary: 'Rentang konsentrasi anak SD berkisar antara 15 hingga 25 menit sesuai usia. Kesulitan fokus sering kali tanda kelelahan atau stimulasi berlebih.',
    actionSteps: [
      'Rapikan meja belajar dari mainan, ponsel, dan barang yang tidak berhubungan.',
      'Pecah tugas besar menjadi langkah-langkah kecil (misal: selesaikan 2 soal dulu, lalu minum air).',
      'Berikan kesempatan bergerak (lompat bintang 5 kali atau minum air dingin) sebelum melanjutkan.'
    ],
    dosAndDonts: [
      { do: 'Memberikan jeda singkat saat anak mulai gelisah.', dont: 'Mengecap anak sebagai pemalas atau tidak punya niat.' }
    ],
    realLifeExample: '“Ayah lihat matamu sudah mulai capek nih. Yuk kita rehat 3 menit, jalan ke dapur ambil air putih bareng!”'
  },
  {
    id: 'guide-6',
    title: 'Memberikan Pujian yang Tepat (Praise the Process)',
    icon: '⭐',
    category: 'Motivasi & Mental',
    summary: 'Memuji kecerdasan bawaan (“Kamu pintar banget!”) dapat membuat anak takut gagal. Pujilah usahanya (“Kamu gigih sekali mencoba lagi!”).',
    actionSteps: [
      'Puji spesifik pada usaha: “Bunda bangga kamu tidak menyerah waktu soalnya sulit.”',
      'Puji strategi yang digunakan: “Idemu melipat kertas untuk pecahan tadi keren sekali!”',
      'Tunjukkan perhatian pada progres: “Lihat deh tulisanmu hari ini jauh lebih rapi dibanding minggu lalu.”'
    ],
    dosAndDonts: [
      { do: 'Memuji ketekunan, strategi, dan perbaikan.', dont: 'Hanya memuji saat anak mendapatkan nilai 100.' }
    ],
    realLifeExample: 'Alih-alih berkata “Kamu anak jenius!”, katakan: “Kamu teliti sekali memeriksa kembali jawabanmu sebelum dikumpulkan!”'
  },
  {
    id: 'guide-7',
    title: 'Menggunakan Teknologi & Gawai Secara Bijak',
    icon: '📱',
    category: 'Literasi Digital',
    summary: 'Gawai bisa menjadi gerbang ilmu yang luar biasa bila digunakan secara berimbang dan didampingi orang tua.',
    actionSteps: [
      'Gunakan aplikasi seperti Rumah Ilmu bersama-sama, bukan membiarkan anak terisolasi di kamar.',
      'Terapkan aturan Screen Time yang adil untuk seluruh keluarga (misal: tanpa gawai saat makan bersama).',
      'Ajak anak berdiskusi tentang keamanan data: jangan membagikan foto atau info pribadi di internet.'
    ],
    dosAndDonts: [
      { do: 'Menjadikan gawai sarana eksplorasi edukasi aktif.', dont: 'Menjadikan ponsel sebagai penenang instan saat anak tantrum.' }
    ],
    realLifeExample: 'Setelah anak menonton video sains di Rumah Ilmu, ajak mendiskusikan apa hal baru yang baru saja ia lihat.'
  },
  {
    id: 'guide-8',
    title: 'Mendampingi Anak Mengerjakan Tugas & PR Tanpa Berantem',
    icon: '📝',
    category: 'Pekerjaan Rumah',
    summary: 'PR adalah tanggung jawab anak kepada gurunya. Tugas orang tua adalah mendampingi lingkungan belajarnya, bukan menggantikan tugasnya.',
    actionSteps: [
      'Biarkan anak membaca instruksi soal sendiri terlebih dahulu dengan suara nyaring.',
      'Bila anak bertanya “Ini gimana?”, balas dengan “Menurutmu dari kalimat ini apa yang dimaksud?”.',
      'Jika ada materi yang sama sekali belum dipahami, tuliskan catatan santun di Rumah Ilmu untuk guru.'
    ],
    dosAndDonts: [
      { do: 'Mendorong kemandirian anak.', dont: 'Mendiktekan kata per kata hingga anak hanya tinggal menyalin.' }
    ],
    realLifeExample: 'Gunakan fitur “Catatan untuk Guru” di aplikasi untuk memberitahu guru jika topik tertentu butuh pengulangan di kelas.'
  },
  {
    id: 'guide-9',
    title: 'Membangun Kebiasaan Membaca Sejak Dini',
    icon: '📚',
    category: 'Keluarga Literat',
    summary: 'Anak yang suka membaca lahir dari rumah yang ramah buku dan melihat orang tuanya juga gemar membaca.',
    actionSteps: [
      'Letakkan buku-buku cerita di tempat yang mudah dijangkau tangan anak (rak bawah atau meja kecil).',
      'Jadikan kunjungan ke perpustakaan atau toko buku sebagai liburan akhir pekan yang ditunggu.',
      'Perlihatkan bahwa orang tua juga membaca buku atau artikel positif di depan anak.'
    ],
    dosAndDonts: [
      { do: 'Menyediakan sudut baca yang nyaman dengan bantal empuk.', dont: 'Mengharuskan anak merangkum isi buku setiap kali selesai membaca.' }
    ],
    realLifeExample: 'Sisihkan waktu 15 menit setiap malam di mana seluruh keluarga membaca buku masing-masing dalam keheningan yang nyaman.'
  },
  {
    id: 'guide-10',
    title: 'Menciptakan Suasana Rumah yang Menyenangkan untuk Belajar',
    icon: '🏡',
    category: 'Lingkungan Belajar',
    summary: 'Rumah yang penuh kehangatan, minim bentakan, dan menghargai kesalahan adalah laboratorium belajar terbaik di dunia.',
    actionSteps: [
      'Ciptakan sudut belajar yang terang dengan sirkulasi udara yang baik.',
      'Jadikan kesalahan sebagai peluang belajar: “Salah itu biasa, dari situ kita tahu cara yang benar!”',
      'Sering-seringlah memeluk dan mengapresiasi keberadaan anak di penghujung hari.'
    ],
    dosAndDonts: [
      { do: 'Menciptakan rasa aman secara emosional.', dont: 'Mengancam atau menakut-nakuti anak dengan nilai jelek atau masa depan suram.' }
    ],
    realLifeExample: 'Ketika anak menumpahkan air atau salah menghitung, tanggapi dengan tenang: “Yuk kita bersihkan bareng, nanti kita coba lagi ya!”'
  },
  {
    id: 'guide-11',
    title: 'Mendukung Diferensiasi: Memahami Gaya Belajar Unik Anak',
    icon: '🎨',
    category: 'Gaya Belajar',
    summary: 'Setiap anak istimewa. Ada yang belajar lewat visual, audio cerita, gerak fisik (kinestetik), atau permainan interaktif.',
    actionSteps: [
      'Amati apakah anak lebih suka melihat gambar, mendengarkan dongeng, atau mempraktikkan langsung dengan tangan.',
      'Gunakan fitur “Diferensiasi Pembelajaran” di Rumah Ilmu untuk memilih gaya yang paling disukai ananda.',
      'Kombinasikan beberapa pendekatan untuk memperkaya pengalaman indrawi anak.'
    ],
    dosAndDonts: [
      { do: 'Menghargai keunikan minat dan bakat setiap anak.', dont: 'Memaksa anak belajar dengan satu metode yang membosankan baginya.' }
    ],
    realLifeExample: 'Anak yang kinestetik akan lebih cepat paham perkalian jika sambil melompati ubin berlantai bernomor.'
  }
];

export const INITIAL_STUDENT_PROGRESS: StudentProgress = {
  literasi: 85,
  numerasi: 78,
  pemahaman: 82,
  kemandirian: 90,
  kolaborasi: 88,
  kreativitas: 92,
  karakter: 95,
  totalStars: 140,
  streakDays: 4,
  completedMaterials: ['mat-5-pecahan', 'ipas-4-fotosintesis'],
  completedLkpd: ['lkpd-mat-5-pecahan'],
  quizScores: [
    { quizId: 'mat-5-pecahan', score: 95, date: '2026-10-06' },
    { quizId: 'ipas-4-fotosintesis', score: 90, date: '2026-10-05' }
  ],
  badges: [
    { id: 'b1', title: 'Sahabat Buku', icon: '📚', unlocked: true, unlockedAt: '2026-10-02', description: 'Rajin membaca dan menyimak materi literasi.' },
    { id: 'b2', title: 'Jago Numerasi', icon: '🔢', unlocked: true, unlockedAt: '2026-10-04', description: 'Menyelesaikan tantangan logika dan pecahan dengan tekun.' },
    { id: 'b3', title: 'Pemikir Hebat', icon: '🧠', unlocked: true, unlockedAt: '2026-10-05', description: 'Berani bertanya dan mengeksplorasi konsep baru.' },
    { id: 'b4', title: 'Anak Kreatif', icon: '🎨', unlocked: true, unlockedAt: '2026-10-06', description: 'Menghasilkan karya lipatan dan karya seni orisinal.' },
    { id: 'b5', title: 'Peduli Lingkungan', icon: '🌱', unlocked: true, unlockedAt: '2026-10-06', description: 'Menyayangi tanaman dan menjaga kebersihan bumi.' },
    { id: 'b6', title: 'Anak Hebat', icon: '❤️', unlocked: true, unlockedAt: '2026-10-07', description: 'Santun, suka menolong, dan menghormati sesama.' },
    { id: 'b7', title: 'Rajin Belajar', icon: '🏆', unlocked: true, unlockedAt: '2026-10-07', description: 'Menjaga streak belajar 4 hari berturut-turut!' }
  ],
  positiveNotes: [
    'Ananda sangat antusias saat memperagakan pecahan dengan kertas lipat!',
    'Ananda sudah berani mengungkapkan pendapat dan bertanya dengan santun saat belajar sains.',
    'Kerja sama ananda bersama orang tua saat kegiatan 15 menit berjalan sangat hangat dan harmonis.'
  ]
};

export const INITIAL_TEACHER_NOTES: ParentTeacherNote[] = [
  {
    id: 'note-1',
    senderName: 'Ibu Ratna Dewi (Wali Kelas 5)',
    senderRole: 'guru',
    date: '2026-10-06',
    studentName: 'Ahmad Faiz Fadillah',
    grade: 5,
    subjectName: 'Matematika',
    category: 'apresiasi',
    message: 'Selamat siang Bapak/Ibu! Faiz hari ini sangat aktif di kelas saat kita membahas pecahan senilai. Pendampingan Bapak/Ibu dengan roti tawar kemarin di rumah sangat membantunya memahami konsep. Terima kasih banyak atas kerja sama yang hebat!',
    status: 'selesai'
  },
  {
    id: 'note-2',
    senderName: 'Bunda Faiz (Orang Tua)',
    senderRole: 'orang_tua',
    date: '2026-10-05',
    studentName: 'Ahmad Faiz Fadillah',
    grade: 5,
    subjectName: 'Matematika',
    category: 'saran',
    message: 'Terima kasih Bu Ratna. Faiz sangat senang dengan aktivitas 10 menit bersama orang tua di Rumah Ilmu. Tadi dia minta tambahan contoh soal pembagian kue di rumah.',
    status: 'selesai'
  },
  {
    id: 'note-3',
    senderName: 'Pak Bambang Hermanto (Guru IPAS)',
    senderRole: 'guru',
    date: '2026-10-07',
    studentName: 'Ahmad Faiz Fadillah',
    grade: 5,
    subjectName: 'IPAS',
    category: 'perkembangan',
    message: 'Untuk materi Fotosintesis esok hari, mohon orang tua mengajak ananda mengamati tanaman berdaun hijau di teras rumah sebentar ya. Panduan lengkap ada di tombol “Belajar Bersama Orang Tua” di aplikasi.',
    status: 'baru'
  }
];

export const DAILY_RECOMMENDATIONS: DailyLearningRecommendation[] = [
  { id: 'rec-1', taskType: 'membaca', title: 'Baca materi pilihan selama 10 menit', duration: '10 Menit', completed: true },
  { id: 'rec-2', taskType: 'numerasi', title: 'Latihan 5 soal numerasi seru', duration: '8 Menit', completed: true },
  { id: 'rec-3', taskType: 'video', title: 'Tonton 1 video sains inspiratif', duration: '5 Menit', completed: false },
  { id: 'rec-4', taskType: 'aktivitas', title: 'Praktikkan 1 aktivitas kertas lipat atau daun', duration: '12 Menit', completed: false },
  { id: 'rec-5', taskType: 'cerita_ortu', title: 'Ceritakan kepada orang tua apa yang kamu temukan hari ini', duration: '5 Menit', completed: false }
];

export const INITIAL_USER_PROFILE: UserProfile = {
  teacherName: 'Ibu Ratna Dewi, S.Pd.',
  parentName: 'Ibu Siti Rahmawati (Bunda)',
  activeStudentId: 'std-1',
  schoolName: 'SD Negeri Cempaka 01'
};

export const INITIAL_STUDENTS: StudentRecord[] = [
  {
    id: 'std-1',
    name: 'Ahmad Faiz Fadillah',
    nisn: '0129384711',
    grade: 5,
    parentName: 'Ibu Siti Rahmawati & Bapak Fadil',
    teacherName: 'Ibu Ratna Dewi, S.Pd.',
    avatar: '👦',
    attendanceRate: 98,
    progress: INITIAL_STUDENT_PROGRESS,
    activityLogs: [
      {
        id: 'act-1',
        timestamp: '07 Okt 2026, 14:30',
        activityType: 'pendampingan_ortu',
        title: 'Belajar Bersama Orang Tua: Pecahan Senilai',
        subjectName: 'Matematika',
        details: 'Praktik memotong roti tawar menjadi 4 bagian dan membuktikan kesamaan 1/2 = 2/4.',
        accompaniedByParent: true,
        parentNote: 'Faiz sangat senang dan langsung paham dengan analogi potongan roti!',
        teacherFeedback: 'Luar biasa pendampingannya Bu Siti! Pemahaman konsep Faiz di kelas sangat mantap.',
        starsEarned: 15
      },
      {
        id: 'act-2',
        timestamp: '07 Okt 2026, 11:15',
        activityType: 'kuis',
        title: 'Kuis Evaluasi Pecahan Senilai',
        subjectName: 'Matematika',
        score: 95,
        details: 'Mengerjakan 5 soal pilihan ganda pecahan senilai (Benar 5 dari 5).',
        accompaniedByParent: true,
        starsEarned: 20
      },
      {
        id: 'act-3',
        timestamp: '07 Okt 2026, 09:40',
        activityType: 'video',
        title: 'Petualangan Pizza & Kue Pecahan',
        subjectName: 'Matematika',
        details: 'Menonton video interaktif tuntas hingga refleksi pembagian adil bersama teman.',
        accompaniedByParent: false,
        starsEarned: 10
      },
      {
        id: 'act-4',
        timestamp: '06 Okt 2026, 16:20',
        activityType: 'lkpd',
        title: 'LKPD Digital: Eksplorasi Pecahan Konkret',
        subjectName: 'Matematika',
        details: 'Menyelesaikan 3 misi belajar dan mengisi lembar kerja digital mandiri.',
        accompaniedByParent: true,
        teacherFeedback: 'Tulisan dan penjelasan Faiz sangat runtut. Pertahankan ya nak!',
        starsEarned: 15
      },
      {
        id: 'act-5',
        timestamp: '05 Okt 2026, 15:10',
        activityType: 'game',
        title: 'Roda Putar Cerdas & Susun Kata',
        subjectName: 'Tematik & Sains',
        score: 90,
        details: 'Memutar roda pertanyaan sains dan menyusun kosakata fotosintesis.',
        accompaniedByParent: true,
        starsEarned: 10
      }
    ]
  },
  {
    id: 'std-2',
    name: 'Aisyah Putri Rahma',
    nisn: '0129384712',
    grade: 5,
    parentName: 'Ibu Nurhayati (Bunda)',
    teacherName: 'Ibu Ratna Dewi, S.Pd.',
    avatar: '👧',
    attendanceRate: 100,
    progress: {
      ...INITIAL_STUDENT_PROGRESS,
      literasi: 95,
      numerasi: 86,
      pemahaman: 90,
      kemandirian: 92,
      kolaborasi: 94,
      totalStars: 175,
      streakDays: 6,
      completedMaterials: ['mat-5-pecahan', 'bind-5-cerita', 'ipas-4-fotosintesis'],
      completedLkpd: ['lkpd-mat-5-pecahan', 'lkpd-bind-5-pantun']
    },
    activityLogs: [
      {
        id: 'act-21',
        timestamp: '07 Okt 2026, 15:10',
        activityType: 'kuis',
        title: 'Kuis Literasi Membaca Nyaring',
        subjectName: 'Bahasa Indonesia',
        score: 98,
        details: 'Menjawab pertanyaan pemahaman teks bacaan dengan sempurna.',
        accompaniedByParent: true,
        parentNote: 'Aisyah membaca di depan keluarga dengan percaya diri.',
        teacherFeedback: 'Intonasi dan ekspresi Aisyah sudah sangat bagus!',
        starsEarned: 20
      },
      {
        id: 'act-22',
        timestamp: '07 Okt 2026, 10:05',
        activityType: 'lkpd',
        title: 'LKPD Mandiri: Menulis Pantun Nasihat',
        subjectName: 'Bahasa Indonesia',
        details: 'Membuat 2 bait pantun tentang gotong royong di sekolah.',
        accompaniedByParent: false,
        teacherFeedback: 'Pilihan kata pantunnya sangat puitis dan bermakna.',
        starsEarned: 15
      },
      {
        id: 'act-23',
        timestamp: '06 Okt 2026, 14:00',
        activityType: 'video',
        title: 'Menyimak Cerita Rakyat Nusantara',
        subjectName: 'Bahasa Indonesia',
        details: 'Menonton video animasi dan mencatat pesan moral tokoh.',
        accompaniedByParent: true,
        starsEarned: 10
      }
    ]
  },
  {
    id: 'std-3',
    name: 'Bima Satria Wicaksono',
    nisn: '0129384713',
    grade: 5,
    parentName: 'Bapak Haryono (Ayah)',
    teacherName: 'Ibu Ratna Dewi, S.Pd.',
    avatar: '👦',
    attendanceRate: 95,
    progress: {
      ...INITIAL_STUDENT_PROGRESS,
      literasi: 80,
      numerasi: 92,
      pemahaman: 85,
      kemandirian: 84,
      kolaborasi: 90,
      totalStars: 130,
      streakDays: 3,
      completedMaterials: ['mat-5-pecahan'],
      completedLkpd: ['lkpd-mat-5-pecahan']
    },
    activityLogs: [
      {
        id: 'act-31',
        timestamp: '07 Okt 2026, 13:45',
        activityType: 'game',
        title: 'Arena Detektif Angka & Bilangan',
        subjectName: 'Matematika',
        score: 92,
        details: 'Menyelesaikan teka-teki logika matematika dengan kecepatan tinggi.',
        accompaniedByParent: true,
        parentNote: 'Bima sangat kompetitif dan menyukai tantangan angka.',
        teacherFeedback: 'Bima punya bakat luar biasa di bidang logika matematika!',
        starsEarned: 15
      },
      {
        id: 'act-32',
        timestamp: '06 Okt 2026, 16:30',
        activityType: 'pendampingan_ortu',
        title: 'Praktik Menghitung Uang Belanja',
        subjectName: 'Matematika',
        details: 'Menghitung total kembalian belanja bersama Ayah.',
        accompaniedByParent: true,
        starsEarned: 15
      }
    ]
  },
  {
    id: 'std-4',
    name: 'Cantika Dewi Anjani',
    nisn: '0129384714',
    grade: 5,
    parentName: 'Ibu Maya Lestari (Bunda)',
    teacherName: 'Ibu Ratna Dewi, S.Pd.',
    avatar: '👧',
    attendanceRate: 97,
    progress: {
      ...INITIAL_STUDENT_PROGRESS,
      literasi: 88,
      numerasi: 82,
      kreativitas: 96,
      karakter: 94,
      totalStars: 145,
      streakDays: 5,
      completedMaterials: ['ipas-4-fotosintesis'],
      completedLkpd: ['lkpd-ipas-fotosintesis']
    },
    activityLogs: [
      {
        id: 'act-41',
        timestamp: '07 Okt 2026, 12:20',
        activityType: 'materi',
        title: 'Eksperimen Fotosintesis Daun Hijau',
        subjectName: 'IPAS',
        details: 'Membaca materi dan mengamati daun di pekarangan rumah.',
        accompaniedByParent: true,
        parentNote: 'Cantika membuat sketsa daun yang cantik sekali di buku gambar.',
        teacherFeedback: 'Perpaduan sains dan seni yang sangat indah, Cantika!',
        starsEarned: 15
      },
      {
        id: 'act-42',
        timestamp: '05 Okt 2026, 10:15',
        activityType: 'kuis',
        title: 'Kuis IPAS Tumbuhan',
        subjectName: 'IPAS',
        score: 90,
        details: 'Menjawab 5 pertanyaan siklus klorofil dan fotosintesis.',
        accompaniedByParent: false,
        starsEarned: 15
      }
    ]
  },
  {
    id: 'std-5',
    name: 'Dimas Bagus Pratama',
    nisn: '0129384715',
    grade: 5,
    parentName: 'Bapak Sugeng & Ibu Dian',
    teacherName: 'Ibu Ratna Dewi, S.Pd.',
    avatar: '👦',
    attendanceRate: 92,
    progress: {
      ...INITIAL_STUDENT_PROGRESS,
      literasi: 76,
      numerasi: 80,
      kemandirian: 78,
      kolaborasi: 82,
      totalStars: 110,
      streakDays: 2,
      completedMaterials: ['mat-5-pecahan'],
      completedLkpd: []
    },
    activityLogs: [
      {
        id: 'act-51',
        timestamp: '07 Okt 2026, 08:30',
        activityType: 'video',
        title: 'Menonton Video Pecahan Senilai',
        subjectName: 'Matematika',
        details: 'Menyimak kembali penjelasan visual tentang pecahan 1/2 dan 2/4.',
        accompaniedByParent: false,
        teacherFeedback: 'Hebat Dimas mau mengulang video agar makin paham!',
        starsEarned: 10
      },
      {
        id: 'act-52',
        timestamp: '06 Okt 2026, 15:40',
        activityType: 'kuis',
        title: 'Kuis Latihan Pecahan',
        subjectName: 'Matematika',
        score: 80,
        details: 'Mengerjakan kuis latihan pecahan (Benar 4 dari 5).',
        accompaniedByParent: true,
        parentNote: 'Dimas perlu sedikit bimbingan pada soal cerita pecahan.',
        starsEarned: 10
      }
    ]
  }
];
