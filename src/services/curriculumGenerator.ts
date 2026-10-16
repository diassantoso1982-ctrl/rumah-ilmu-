import { LearningMaterial, LKPD, GradeLevel } from '../types';
import { SUBJECTS } from '../data/mockData';
import { resolveYouTubeVideo } from './youtubeEducationService';

// Subject & Grade auto-detection helper from teacher's written command
export function detectCurriculumIntent(commandText: string, defaultGrade: GradeLevel = 5, defaultSubjectId: string = 'matematika') {
  const lower = commandText.toLowerCase();

  // Detect grade
  let detectedGrade: GradeLevel = defaultGrade;
  if (lower.includes('kelas 1') || lower.includes('kls 1') || lower.includes('grade 1')) detectedGrade = 1;
  else if (lower.includes('kelas 2') || lower.includes('kls 2') || lower.includes('grade 2')) detectedGrade = 2;
  else if (lower.includes('kelas 3') || lower.includes('kls 3') || lower.includes('grade 3')) detectedGrade = 3;
  else if (lower.includes('kelas 4') || lower.includes('kls 4') || lower.includes('grade 4')) detectedGrade = 4;
  else if (lower.includes('kelas 5') || lower.includes('kls 5') || lower.includes('grade 5')) detectedGrade = 5;
  else if (lower.includes('kelas 6') || lower.includes('kls 6') || lower.includes('grade 6')) detectedGrade = 6;

  // Detect subject
  let detectedSubjectId = defaultSubjectId;
  if (lower.includes('matematika') || lower.includes('pecahan') || lower.includes('hitung') || lower.includes('bangun datar') || lower.includes('bangun ruang') || lower.includes('perkalian') || lower.includes('pembagian') || lower.includes('geometri') || lower.includes('numerasi') || lower.includes('sudut')) {
    detectedSubjectId = 'matematika';
  } else if (lower.includes('ipas') || lower.includes('ipa ') || lower.includes('sains') || lower.includes('ekosistem') || lower.includes('daur air') || lower.includes('fotosintesis') || lower.includes('tata surya') || lower.includes('hewan') || lower.includes('tumbuhan') || lower.includes('energi') || lower.includes('magnet') || lower.includes('rantai makanan') || lower.includes('ips ') || lower.includes('kenampakan alam')) {
    detectedSubjectId = 'ipas';
  } else if (lower.includes('bahasa indonesia') || lower.includes('puisi') || lower.includes('fabel') || lower.includes('paragraf') || lower.includes('ide pokok') || lower.includes('cerita') || lower.includes('membaca') || lower.includes('menyimak') || lower.includes('surat')) {
    detectedSubjectId = 'b_indonesia';
  } else if (lower.includes('pancasila') || lower.includes('ppkn') || lower.includes('gotong royong') || lower.includes('toleransi') || lower.includes('sila ') || lower.includes('hak') || lower.includes('kewajiban') || lower.includes('musyawarah') || lower.includes('keberagaman')) {
    detectedSubjectId = 'pancasila';
  } else if (lower.includes('inggris') || lower.includes('english') || lower.includes('animal') || lower.includes('vocabulary') || lower.includes('family') || lower.includes('color') || lower.includes('fruit')) {
    detectedSubjectId = 'b_inggris';
  } else if (lower.includes('seni') || lower.includes('warna') || lower.includes('tari') || lower.includes('musik') || lower.includes('prakarya') || lower.includes('kolase') || lower.includes('gambar')) {
    detectedSubjectId = 'seni';
  } else if (lower.includes('pjok') || lower.includes('olahraga') || lower.includes('jasmani') || lower.includes('senam') || lower.includes('lari') || lower.includes('lokomotor') || lower.includes('kebugaran')) {
    detectedSubjectId = 'pjok';
  } else if (lower.includes('agama') || lower.includes('budi pekerti') || lower.includes('akhlak') || lower.includes('jujur') || lower.includes('santun') || lower.includes('doa')) {
    detectedSubjectId = 'agama';
  } else if (lower.includes('koding') || lower.includes('komputer') || lower.includes('algoritma') || lower.includes('digital')) {
    detectedSubjectId = 'koding';
  } else if (lower.includes('lingkungan') || lower.includes('plh') || lower.includes('sampah') || lower.includes('pohon')) {
    detectedSubjectId = 'plh';
  }

  // Extract clean topic by stripping common command verbs
  let cleanTopic = commandText
    .replace(/^buatkan\s+(materi|modul|bahan ajar|penjelasan)?\s*(tentang|mengenai)?/i, '')
    .replace(/^tolong\s+buatkan\s+(materi)?/i, '')
    .replace(/^bikin\s+(materi)?/i, '')
    .replace(/^jelaskan\s+(tentang)?/i, '')
    .replace(/untuk\s+anak\s+sd/i, '')
    .replace(/untuk\s+kelas\s+[1-6](\s*sd)?/i, '')
    .replace(/kelas\s+[1-6](\s*sd)?/i, '')
    .replace(/mata\s+pelajaran\s+[a-z\s]+/i, '')
    .replace(/mapel\s+[a-z\s]+/i, '')
    .trim();

  if (!cleanTopic || cleanTopic.length < 3) {
    cleanTopic = commandText.trim();
  }

  // Capitalize first letter
  cleanTopic = cleanTopic.charAt(0).toUpperCase() + cleanTopic.slice(1);

  return {
    detectedGrade,
    detectedSubjectId,
    cleanTopic,
    subjectName: SUBJECTS.find(s => s.id === detectedSubjectId)?.name || 'Mata Pelajaran SD'
  };
}

// Generate smart, rich, and pedagogically sound Indonesian SD learning material
export function createInstantMaterial(commandText: string, gradeInput?: GradeLevel, subjectInput?: string): LearningMaterial {
  const { detectedGrade, detectedSubjectId, cleanTopic, subjectName } = detectCurriculumIntent(
    commandText,
    gradeInput,
    subjectInput
  );

  const grade = gradeInput || detectedGrade;
  const subjectId = subjectInput || detectedSubjectId;
  const timestamp = Date.now();
  const lower = commandText.toLowerCase() + ' ' + cleanTopic.toLowerCase();

  // Knowledge base topics
  let theme = `Eksplorasi Tematik Kurikulum Merdeka ${subjectName}`;
  let title = cleanTopic;
  let apperception = `Pernahkah kamu memperhatikan hal ini di sekitarmu saat bermain atau beraktivitas di rumah? Yuk kita cari tahu rahasianya!`;
  let section1Title = `Mengenal ${cleanTopic}`;
  let section1Text = `${cleanTopic} merupakan salah satu konsep penting yang sangat dekat dengan kehidupan sehari-hari anak kelas ${grade} SD. Ketika kita memahaminya, kita bisa menjelaskan banyak peristiwa menakjubkan di sekitar kita.`;
  let section1Points = [
    `Memahami pengertian dasar ${cleanTopic} secara mudah dan menyenangkan.`,
    `Mengamati bukti nyata ${cleanTopic} dalam lingkungan sekitar kita.`,
    `Melatih kebiasaan bertanya dan rasa ingin tahu yang tinggi.`
  ];
  let visualDesc = `Ilustrasi penuh warna yang menggambarkan konsep ${cleanTopic} dengan karakter anak-anak yang ceria.`;
  let interactiveQuestion = `Menurutmu, mengapa kita perlu mempelajari ${cleanTopic}?`;
  let interactiveAnswer = `Karena ilmu ini membantu kita memahami lingkungan dan memecahkan tantangan sehari-hari secara bijak!`;

  let section2Title = `Langkah & Cara Menerapkannya`;
  let section2Text = `Agar makin mahir, perhatikan cara mudah memahami ${cleanTopic} berikut ini. Lakukan bersama teman atau ayah-bunda di rumah!`;
  let section2Points = [
    `Langkah 1: Perhatikan contoh nyata di rumah atau kelas.`,
    `Langkah 2: Diskusikan apa yang kamu lihat dengan bahasa santun.`,
    `Langkah 3: Tuliskan atau gambarkan kesimpulanmu dalam buku catatan.`
  ];

  let example1Situation = `Contoh di lingkungan rumah:`;
  let example1Explanation = `Saat beraktivitas di pagi hari atau sore hari, kita bisa menemukan contoh nyata ${cleanTopic} tanpa perlu alat rumit.`;

  let example2Situation = `Contoh saat bersama teman di sekolah:`;
  let example2Explanation = `Bekerja sama dalam kelompok kecil untuk mengamati atau menyelesaikan tugas ${cleanTopic} dengan riang.`;

  let activityTitle = `Eksplorasi Praktis: Detektif ${cleanTopic}`;
  let activityInstructions = [
    `Siapkan buku catatan kecil dan pensil warna favoritmu.`,
    `Cari 2 contoh nyata yang berkaitan dengan ${cleanTopic} di sekitar rumah atau halaman.`,
    `Gambarkan atau tuliskan hasil temuanmu dalam 3 kalimat singkat.`,
    `Tunjukkan hasil karyamu kepada Guru atau ceritakan kepada Orang Tua di rumah!`
  ];
  let activityDeliverable = `Catatan pengamatan 3 kalimat dan gambar sederhana kreasi anak.`;

  let videoTitle = `Petualangan Edukatif: Rahasia ${cleanTopic}`;
  let videoDuration = '3 Menit 30 Detik';
  let videoPrompt = `Setelah menonton, apa satu hal paling seru yang baru kamu ketahui tentang ${cleanTopic}?`;

  let q1Text = `Apa manfaat utama mempelajari ${cleanTopic} dalam kehidupan sehari-hari?`;
  let q1Options = [
    'Membantu kita memahami lingkungan dan berpikir kritis',
    'Membuat kita cepat bosan dan mengantuk',
    'Hanya untuk dihafalkan saat ujian saja',
    'Tidak memiliki kaitan dengan keseharian'
  ];
  let q1Correct = 'Membantu kita memahami lingkungan dan berpikir kritis';
  let q1Expl = 'Belajar konsep ini mengasah nalar kritis dan kepedulian terhadap lingkungan sekitar.';

  let q2Text = `Kita bisa mempraktikkan konsep ${cleanTopic} bersama keluarga di rumah.`;
  let q2Correct = true;
  let q2Expl = 'Benar sekali! Belajar bersama orang tua membuat pemahaman kita semakin kuat dan menyenangkan.';

  let parentSummary = `Ananda sedang mempelajari topik “${cleanTopic}” pada mata pelajaran ${subjectName} Kelas ${grade} SD. Materi ini bertujuan membangun pemahaman konseptual dan karakter positif.`;
  let parentGuidance = `Ayah/Bunda cukup mengajak ananda berdialog santai tanpa perlu menghakimi atau menguji dengan rumus kaku. Berikan pujian saat ananda berani bercerita.`;
  let parentQuestions = [
    `“Apa hal paling menarik yang kamu pelajari tentang ${cleanTopic} hari ini?”`,
    `“Bisa ceritakan ke Ayah/Ibu contohnya yang pernah kamu lihat?”`,
    `“Ada bagian yang masih ingin kamu tanyakan ke Ibu/Bapak Guru besok?”`
  ];
  let parentHomeActivity = `Ajak ananda mengamati benda atau fenomena terkait ${cleanTopic} selama 10–15 menit di sekitar rumah, lalu minta ananda menceritakan kesimpulannya.`;

  // Tailored subject & topic enrichments
  if (lower.includes('daur air') || lower.includes('siklus air') || lower.includes('hujan')) {
    title = `Daur Air dan Terjadinya Hujan (Kelas ${grade} SD)`;
    theme = `Eksplorasi Alam & Siklus Kehidupan (IPAS)`;
    apperception = `Tahukah kamu dari mana asal air hujan yang jatuh membasahi genting rumah kita? Dan ke mana perginya genangan air setelah matahari bersinar terik?`;
    section1Title = `3 Tahap Utama Daur Air`;
    section1Text = `Air di bumi tidak pernah habis karena terus berputar dalam siklus daur air! Panas matahari mengubah air sungai, danau, dan laut menjadi uap air yang tak terlihat.`;
    section1Points = [
      `Evaporasi: Air di bumi menguap ke udara karena hangatnya sinar matahari.`,
      `Kondensasi: Uap air yang tinggi mendingin dan berkumpul membentuk awan mendung tebal.`,
      `Presipitasi: Butiran air di awan menjadi terlalu berat lalu jatuh sebagai hujan yang menyegarkan bumi!`
    ];
    visualDesc = `Diagram siklus air melingkar: laut menyinari matahari -> awan mengembun -> hujan turun ke pegunungan -> mengalir kembali ke laut.`;
    interactiveQuestion = `Apa yang terjadi jika tidak ada sinar matahari bagi siklus air?`;
    interactiveAnswer = `Proses penguapan (evaporasi) akan berhenti, sehingga awan hujan tidak dapat terbentuk dengan normal!`;
    example1Situation = `Saat merebus air atau melihat embun di kaca jendela mobil:`;
    example1Explanation = `Uap air yang menyentuh tutup panci atau kaca dingin akan berubah kembali menjadi butiran air (kondensasi), mirip seperti pembentukan awan di langit!`;
    activityTitle = `Eksperimen Mini: Siklus Hujan dalam Mangkok Kaca`;
    activityInstructions = [
      `Siapkan mangkok kaca tahan panas, air hangat, plastik wrap bening penutup, dan beberapa es batu.`,
      `Minta bantuan orang tua menuang sedikit air hangat ke mangkok lalu tutup rapat dengan plastik wrap.`,
      `Letakkan 2-3 es batu di atas plastik. Amati butiran air yang mengembun dan menetes seperti hujan kecil di dalam mangkok!`
    ];
    activityDeliverable = `Foto eksperimen atau cerita 3 baris tentang tetesan hujan buatanmu.`;
    videoTitle = `Animasi Petualangan Tetes Air Hujan Ceria`;
    parentHomeActivity = `Ajak ananda melihat uap air saat memasak air atau mengamati embun pagi di daun halaman rumah, diskusikan konsep kondensasi secara santai.`;
  } else if (lower.includes('pecahan') || lower.includes('pecahan senilai') || lower.includes('desimal')) {
    title = `Pecahan Senilai dan Operasi Hitung Praktis (Kelas ${grade} SD)`;
    theme = `Numerasi Kontekstual Sehari-hari`;
    apperception = `Bayangkan kamu membeli sebutir semangka manis dan ingin membaginya sama rata kepada 4 orang temanmu. Berapa bagian yang harus diterima setiap orang agar adil?`;
    section1Title = `Memahami Pecahan Senilai Tanpa Bingung`;
    section1Text = `Pecahan senilai adalah pecahan yang memiliki nilai atau luas yang persis sama, meskipun angka pembilang dan penyebutnya berbeda.`;
    section1Points = [
      `1/2 bagian sama besarnya dengan 2/4 bagian dan 4/8 bagian.`,
      `Angka di atas disebut Pembilang (bagian yang kita ambil/miliki).`,
      `Angka di bawah disebut Penyebut (jumlah seluruh potongan yang sama besar).`
    ];
    visualDesc = `Ilustrasi pizza dipotong 2 (diambil 1) vs pizza dipotong 4 (diambil 2) menunjukkan ukuran potongan yang sama persis.`;
    interactiveQuestion = `Jika ananda memakan 3 dari 6 potong martabak, berapa pecahan senilainya yang paling sederhana?`;
    interactiveAnswer = `Jawabannya adalah 1/2! Karena 3 dan 6 sama-sama bisa dibagi dengan angka 3.`;
    example1Situation = `Membagi sebatang cokelat bergaris di rumah:`;
    example1Explanation = `Jika cokelat berisi 8 kotak dan kamu mengambil 4 kotak (4/8), kamu sebenarnya telah memakan setengah (1/2) dari seluruh cokelat itu!`;
    activityTitle = `Aktivitas Origami: Melipat Kertas Pecahan Pelangi`;
    activityInstructions = [
      `Ambil selembar kertas origami persegi, lipat menjadi 2 bagian sama besar (warnai 1 sisi = 1/2).`,
      `Lipat kembali menjadi 4 bagian sama besar, amati bahwa 1/2 kertas tadi sekarang menjadi 2/4.`,
      `Lipat sekali lagi menjadi 8 bagian, buktikan bahwa 2/4 sama dengan 4/8!`
    ];
    activityDeliverable = `Kertas lipat origami yang telah diwarnai pecahan senilainya.`;
    parentHomeActivity = `Gunakan buah apel, jeruk, atau kue di rumah saat waktu camil bersama anak untuk memperagakan konsep pecahan 1/2, 1/4, dan 1/8.`;
  } else if (lower.includes('ekosistem') || lower.includes('rantai makanan') || lower.includes('jaring')) {
    title = `Rantai Makanan dan Keseimbangan Ekosistem Sawah & Hutan`;
    theme = `Interaksi Makhluk Hidup & Lingkungan (IPAS)`;
    apperception = `Pernahkah kamu berpikir apa jadinya jika semua katak di sawah menghilang? Mengapa jumlah serangga belalang dan wereng tiba-tiba melonjak sangat banyak?`;
    section1Title = `Tingkatan Peran dalam Rantai Makanan`;
    section1Text = `Rantai makanan adalah peristiwa makan dan dimakan antar makhluk hidup dengan urutan tertentu demi kelangsungan energi hidup.`;
    section1Points = [
      `Produsen: Tumbuhan hijau (seperti padi atau rumput) yang dapat membuat makanan sendiri lewat fotosintesis.`,
      `Konsumen I (Herbivora): Hewan pemakan tumbuhan (seperti belalang, ulat, atau tikus).`,
      `Konsumen II & III (Karnivora/Omnivora): Hewan pemangsa (seperti katak, ular, dan burung elang).`,
      `Pengurai (Dekomposer): Jamur dan bakteri yang menguraikan sisa makhluk hidup kembali ke tanah subur.`
    ];
    visualDesc = `Bagan panah energi: Padi -> Belalang -> Katak -> Ular -> Burung Elang -> Jamur Pengurai.`;
    interactiveQuestion = `Siapakah yang berperan sebagai produsen utama di ekosistem perairan kolam?`;
    interactiveAnswer = `Fitoplankton dan lumut air hijau karena mampu memasak makanannya sendiri dengan bantuan cahaya matahari!`;
    example1Situation = `Menjaga kebersihan taman atau sawah:`;
    example1Explanation = `Jika petani memakai pestisida berlebihan hingga membunuh semua laba-laba dan capung, hama lain justru akan bertambah banyak karena predator alaminya punah.`;
    activityTitle = `Membuat Kalung Rantai Makanan Kreatif`;
    activityInstructions = [
      `Gunting 5 kartu kertas kecil, tuliskan: Padi, Belalang, Katak, Ular, Elang.`,
      `Gambarlah hewan tersebut dengan warna menarik.`,
      `Hubungkan dengan tali benang sesuai urutan aliran energi makan dan dimakan.`,
      `Jelaskan cara kerjanya di depan kelas atau di depan orang tuamu!`
    ];
    activityDeliverable = `Peta rantai makanan berantai dari kertas berpita.`;
    parentHomeActivity = `Ajak ananda mengamati kebun/taman rumah atau tonton video dokumenter alam selama 10 menit untuk menemukan hewan herbivora dan predator kecil seperti laba-laba.`;
  } else if (lower.includes('pancasila') || lower.includes('gotong royong') || lower.includes('persatuan')) {
    title = `Nilai Luhur Pancasila dan Semangat Gotong Royong (Kelas ${grade} SD)`;
    theme = `Pendidikan Karakter & Kewarganegaraan`;
    apperception = `Apakah membersihkan ruang kelas atau halaman rumah terasa lebih ringan jika dikerjakan bersama-sama dibandingkan sendirian? Mengapa gotong royong membuat kita rukun?`;
    section1Title = `Pancasila Sebagai Panduan Hidup Berbangsa`;
    section1Text = `Pancasila bukan hanya untuk dihafal saat upacara bendera hari Senin, melainkan dipraktikkan dalam perbuatan nyata setiap hari di rumah, sekolah, dan lingkungan sekitar.`;
    section1Points = [
      `Sila ke-1: Menghargai teman yang beribadah sesuai agamanya masing-masing.`,
      `Sila ke-2: Bersikap sopan, menyayangi sesama, dan menolong teman yang kesusahan.`,
      `Sila ke-3: Mengutamakan kerukunan, tidak mengejek suku atau asal daerah teman.`,
      `Sila ke-4: Bermusyawarah secara damai saat mengambil keputusan bersama.`,
      `Sila ke-5: Bersikap adil, menghargai hasil karya orang lain, dan gemar menabung.`
    ];
    visualDesc = `Lambang Garuda Pancasila dengan lima perisai dan anak-anak dari berbagai suku bergandengan tangan dengan senyum bahagia.`;
    interactiveQuestion = `Ketika memilih ketua kelas dengan cara berdiskusi dan voting, sila ke berapa yang sedang kita terapkan?`;
    interactiveAnswer = `Sila ke-4 (Kerakyatan yang Dipimpin oleh Hikmat Kebijaksanaan dalam Permusyawaratan/Perwakilan)!`;
    activityTitle = `Pohon Kebaikan dan Kartu Terima Kasih`;
    activityInstructions = [
      `Tuliskan 1 tindakan gotong royong yang kamu lakukan di rumah minggu ini.`,
      `Tuliskan satu kartu ucapan terima kasih untuk ayah, ibu, atau teman sebangkumu.`,
      `Bacakan pesan positifmu saat makan bersama keluarga!`
    ];
    activityDeliverable = `Kartu ucapan terima kasih penuh warna.`;
    parentHomeActivity = `Libatkan ananda dalam tugas ringan rumah tangga (merapikan tempat tidur atau menyiram bunga) sebagai wujud gotong royong, lalu berikan apresiasi hangat.`;
  } else if (lower.includes('puisi') || lower.includes('fabel') || lower.includes('cerita') || lower.includes('paragraf')) {
    title = `Membaca Nyaring, Menulis Puisi & Mengenal Unsur Cerita`;
    theme = `Literasi Kreatif & Ekspresi Diri (Bahasa Indonesia)`;
    apperception = `Pernahkah kamu mendengar cerita tentang Kancil yang cerdik atau Semut yang rajin? Tahukah kamu bahwa sebuah puisi indah bisa diciptakan dari rasa syukurmu terhadap alam?`;
    section1Title = `Unsur Utama Cerita & Cara Menulis Puisi Ceria`;
    section1Text = `Setiap cerita yang kita baca memiliki tokoh (siapa pelakunya), latar tempat/waktu, dan amanat (pesan moral yang baik untuk kita tiru).`;
    section1Points = [
      `Tokoh Utama & Watak: Pelaku dalam cerita beserta sifat baik atau buruknya.`,
      `Amanat Cerita: Pesan kebaikan yang ingin disampaikan penulis kepada pembaca.`,
      `Rima dan Pilihan Kata Puisi: Menggunakan kata-kata indah penuh imajinasi dan perasaan tulus.`
    ];
    visualDesc = `Ilustrasi buku cerita terbuka dengan karakter fabel hewan yang lucu diiringi bait puisi tentang pelangi.`;
    interactiveQuestion = `Apa pesan moral yang biasanya kita dapatkan dari kisah Kura-kura dan Kelinci yang sombong?`;
    interactiveAnswer = `Ketekunan dan kerendahan hati akan membuahkan hasil, sedangkan kesombongan dan meremehkan orang lain akan membawa kekalahan!`;
    activityTitle = `Menulis 4 Baris Puisi Indah untuk Alam`;
    activityInstructions = [
      `Pilihlah salah satu tema: Matahari Pagi, Bunga Melati, atau Kucing Kesayangan.`,
      `Tuliskan 4 baris kalimat indah yang menggambarkan perasaan kagummu.`,
      `Bacakan puisi tersebut di depan cermin atau di depan keluargamu dengan intonasi riang!`
    ];
    activityDeliverable = `Lembar 1 bait puisi tulisan tangan berhias gambar tepi.`;
    parentHomeActivity = `Luangkan 10 menit sebelum tidur untuk membaca cerita bersama ananda atau dengarkan ananda membacakan bait puisi hasil karyanya.`;
  } else if (lower.includes('animal') || lower.includes('family') || lower.includes('english') || lower.includes('vocabulary')) {
    title = `Fun English: Exploring Animals, Family & Daily Expressions (Grade ${grade})`;
    theme = `Global Communication & Daily Vocabulary`;
    apperception = `Do you have a favorite pet at home like a cat or a rabbit? How do you greet your family members in English every morning?`;
    section1Title = `Essential Vocabulary & Sentences`;
    section1Text = `Learning English is super easy when we connect words with pictures, gestures, and sounds that we make every day!`;
    section1Points = [
      `Greetings: Good morning! How are you today? I am happy and healthy!`,
      `Family Members: Father, Mother, Brother, Sister, Grandfather, Grandmother.`,
      `Animals & Sounds: Cat (meow), Dog (woof), Bird (tweet), Fish (swimming fast).`
    ];
    visualDesc = `Colorful flashcards of smiling family members and cute friendly cartoon animals.`;
    interactiveQuestion = `How do you say "Saya sayang keluarga saya" in English?`;
    interactiveAnswer = `"I love my family!" with a big warm smile!`;
    activityTitle = `My English Mini Flashcard Set`;
    activityInstructions = [
      `Fold a sheet of paper into 4 small cards.`,
      `Draw one family member or pet on each card and write the English word underneath.`,
      `Practice saying the words out loud with your parents or classmates!`
    ];
    activityDeliverable = `4 cute English hand-drawn flashcards.`;
    parentHomeActivity = `Practice asking simple greeting questions at home: "Good morning! Are you ready for school today?" to build your child's confidence.`;
  }

  const newMaterial: LearningMaterial = {
    id: `mat-gen-${timestamp}`,
    title,
    subjectId,
    grade,
    theme,
    learningGoals: [
      `Memahami konsep esensial ${cleanTopic} dengan bahasa sederhana dan kontekstual.`,
      `Mampu mengidentifikasi contoh nyata dan mempraktikkannya dalam keseharian.`,
      `Menumbuhkan rasa ingin tahu, nalar kritis, dan karakter gotong royong.`
    ],
    apperception,
    coreContent: [
      {
        sectionTitle: section1Title,
        text: section1Text,
        bulletPoints: section1Points,
        visualDescription: visualDesc,
        interactiveCheck: {
          question: interactiveQuestion,
          answer: interactiveAnswer
        }
      },
      {
        sectionTitle: section2Title,
        text: section2Text,
        bulletPoints: section2Points,
        visualDescription: `Panduan visual berurutan yang memudahkan peserta didik memahami alur materi.`,
        interactiveCheck: {
          question: `Apa kesimpulan utama yang kamu peroleh dari bagian ini?`,
          answer: `Bahwa setiap ilmu dapat kita pelajari dengan mudah jika kita teliti dan mau berlatih!`
        }
      }
    ],
    examples: [
      {
        situation: example1Situation,
        explanation: example1Explanation
      },
      {
        situation: example2Situation,
        explanation: example2Explanation
      }
    ],
    studentActivity: {
      title: activityTitle,
      instructions: activityInstructions,
      deliverable: activityDeliverable
    },
    video: {
      title: videoTitle,
      duration: videoDuration,
      youtubeId: resolveYouTubeVideo(title || cleanTopic, subjectId, grade).youtubeId,
      reflectionPrompt: videoPrompt
    },
    practiceQuestions: [
      {
        id: `q-pilihan-${timestamp}-1`,
        type: 'pilihan_ganda',
        question: q1Text,
        options: q1Options,
        correctAnswer: q1Correct,
        explanation: q1Expl,
        encouragement: 'Hebat sekali! Pemahamanmu terhadap konsep ini sangat tajam!'
      },
      {
        id: `q-benar-${timestamp}-2`,
        type: 'benar_salah',
        question: q2Text,
        correctAnswer: q2Correct,
        explanation: q2Expl,
        encouragement: 'Tepat sekali! Sikap belajarmu patut diacungi jempol!'
      }
    ],
    reflection: {
      questions: [
        `Apa hal baru dan paling seru yang kamu temukan dari materi ${cleanTopic} ini?`,
        `Bagian mana yang paling ingin kamu ceritakan kepada orang tua saat pulang ke rumah?`
      ],
      reminder: 'Setiap anak adalah pembelajar hebat. Rasa ingin tahu dan ketekunanmu adalah kunci meraih masa depan cemerlang!'
    },
    summary: [
      `${cleanTopic} adalah konsep penting yang sangat dekat dengan kehidupan sehari-hari anak kelas ${grade} SD.`,
      `Memahaminya melatih kita berpikir kritis, berani bertanya, dan peduli terhadap lingkungan.`,
      `Belajar terasa menyenangkan ketika kita bekerja sama dengan guru, teman, dan orang tua.`
    ],
    parentGuide: {
      summary: parentSummary,
      guidance: parentGuidance,
      promptQuestions: parentQuestions,
      homeActivityDuration: '10–15 Menit',
      homeActivity: parentHomeActivity,
      exampleScenario: `Bisa dilakukan santai saat makan bersama di meja makan atau duduk di ruang keluarga.`,
      parentMindset: `Dukungan emosional, senyuman hangat, dan telinga yang mendengarkan jauh lebih berharga daripada tuntutan nilai sempurna.`
    }
  };

  return newMaterial;
}

// Generate companion LKPD based on material or command
export function createInstantLkpdFromMaterial(mat: LearningMaterial): LKPD {
  return {
    id: `lkpd-${mat.id}`,
    title: `LKPD Eksplorasi: ${mat.title}`,
    subjectId: mat.subjectId,
    grade: mat.grade,
    learningGoal: mat.learningGoals[0] || 'Memahami konsep materi dan menerapkannya dalam aktivitas nyata',
    estimatedTime: '20–25 Menit',
    instructions: [
      'Tuliskan nama lengkap, kelas, dan nama guru pendampingmu.',
      'Bacalah setiap petunjuk aktivitas dengan teliti.',
      'Diskusikan bersama teman di kelas atau ayah/bunda di rumah jika ada hal yang ingin kamu tanyakan.'
    ],
    activities: [
      {
        id: `act-step-1`,
        stepNumber: 1,
        title: mat.studentActivity.title,
        instruction: mat.studentActivity.instructions.join(' '),
        promptQuestion: 'Tuliskan hasil pengamatan atau analisismu di sini:',
        studentInputType: 'text'
      },
      {
        id: `act-step-2`,
        stepNumber: 2,
        title: 'Cek Pemahaman Cepat',
        instruction: 'Pilih jawaban yang paling tepat sesuai dengan pemahaman materi:',
        promptQuestion: mat.practiceQuestions[0]?.question || 'Apa manfaat utama materi ini?',
        studentInputType: 'choice',
        choices: (mat.practiceQuestions[0] as any)?.options || ['Sangat Bermanfaat', 'Cukup Bermanfaat', 'Perlu Belajar Lagi']
      }
    ],
    reflectionQuestions: mat.reflection.questions,
    createdBy: 'Bapak/Ibu Guru (Bantuan AI Kilat Rumah Ilmu)',
    createdAt: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
  };
}
