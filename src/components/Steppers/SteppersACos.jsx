export const StepsACos = [
  {
    id: 1,
    title: "Pengantar Adjusted Cosine Similarity (ACos)",
    description: "Memahami apa itu ACos dan kegunaannya secara umum",
    content:
      "Adjusted Cosine Similarity (ACos) adalah metrik yang digunakan untuk mengukur kesamaan antara dua pengguna berdasarkan perbedaan rating mereka terhadap item. ACos disesuaikan dengan mengurangi pengaruh bias individu terhadap item yang mereka beri rating, sehingga memungkinkan perbandingan yang lebih adil antara pengguna yang memiliki preferensi yang berbeda. ACos sering digunakan dalam sistem rekomendasi berbasis kolaboratif untuk mengukur kesamaan antara pengguna.",
  },
  {
    id: 2,
    title: "Formula dan Perhitungan ACos",
    description: "Mengetahui cara menghitung ACos dengan rumus matematika",
    content:
      "Rumus dasar untuk menghitung Adjusted Cosine Similarity adalah sebagai berikut: \n\n ACos(u, v) = Σ (R_ui - μ_u) * (R_vi - μ_v) / √[Σ (R_ui - μ_u)² * Σ (R_vi - μ_v)²] \n\n di mana: \n- R_ui adalah rating yang diberikan oleh pengguna u terhadap item i, \n- μ_u adalah rata-rata rating yang diberikan oleh pengguna u, \n- R_vi adalah rating yang diberikan oleh pengguna v terhadap item i, \n- μ_v adalah rata-rata rating yang diberikan oleh pengguna v.\n\n Formula ini menghitung kesamaan antara dua pengguna dengan mempertimbangkan perbedaan bias individu mereka.",
  },
  {
    id: 3,
    title: "Penerapan ACos pada Data Empiris",
    description: "Menerapkan ACos pada data nyata untuk analisis lebih lanjut",
    content:
      "ACos banyak digunakan dalam sistem rekomendasi berbasis kolaboratif untuk mengukur kesamaan antara pengguna. Sebagai contoh, sistem rekomendasi film dapat menggunakan ACos untuk mencari pengguna dengan selera yang serupa, sehingga dapat memberikan rekomendasi film yang relevan. ACos menghilangkan pengaruh bias individu, seperti perbedaan dalam kebiasaan memberi rating antara pengguna, dan fokus pada kesamaan preferensi terhadap item tertentu.",
  },
  {
    id: 4,
    title: "Interpretasi Nilai ACos",
    description: "Menginterpretasi hasil ACos untuk menarik kesimpulan",
    content:
      "Nilai ACos berkisar antara -1 hingga 1: \n\n- Nilai 1: Dua pengguna sangat mirip dalam hal rating mereka terhadap item. \n- Nilai 0: Tidak ada kesamaan antara dua pengguna dalam preferensi mereka terhadap item. \n- Nilai -1: Dua pengguna sangat berbeda dalam hal rating mereka terhadap item.\n\n Nilai ACos yang lebih tinggi menunjukkan bahwa dua pengguna memiliki preferensi yang lebih mirip, dan ini dapat digunakan untuk membuat rekomendasi yang lebih baik dalam sistem berbasis kolaborasi.",
  },
  {
    id: 5,
    title: "Kelebihan dan Kekurangan ACos",
    description: "Menilai kelebihan dan keterbatasan ACos",
    content:
      "ACos memiliki beberapa kelebihan, seperti kemampuannya untuk menghilangkan bias individu dalam perhitungan kesamaan, sehingga lebih adil dalam membandingkan pengguna dengan preferensi yang sangat berbeda. Namun, ACos juga memiliki kekurangan, seperti ketergantungannya pada data yang ada. Jika pengguna tidak memberikan cukup banyak rating, maka perhitungan kesamaan antara pengguna bisa menjadi kurang akurat. Selain itu, ACos hanya efektif dalam konteks data numerik, dan tidak cocok untuk data kategorikal atau non-numerik.",
  },
  {
    id: 6,
    title: "Contoh Kasus ACos dalam Sistem Rekomendasi",
    description:
      "Menggunakan ACos untuk analisis dalam konteks sistem rekomendasi",
    content:
      "Sebagai contoh, dalam platform streaming musik, ACos dapat digunakan untuk mengidentifikasi pengguna yang memiliki preferensi musik yang mirip. Jika pengguna A dan pengguna B memiliki ACos yang tinggi, maka sistem dapat merekomendasikan lagu yang telah didengarkan oleh pengguna A kepada pengguna B, karena keduanya memiliki selera yang mirip. Pendekatan ini memungkinkan sistem untuk memberikan rekomendasi yang lebih personal dan relevan.",
  },
  {
    id: 7,
    title: "Kesimpulan dan Aplikasi Lanjutan",
    description: "Merangkum aplikasi ACos dan potensi penggunaan lanjutan",
    content:
      "ACos adalah metrik yang sangat berguna dalam analisis kesamaan antar pengguna dalam sistem rekomendasi berbasis kolaborasi. Meskipun memiliki keterbatasan, seperti ketergantungan pada jumlah data yang tersedia, ACos tetap menjadi salah satu metode utama untuk mengukur kesamaan dalam konteks aplikasi berbasis data pengguna. Penggunaan lanjutan ACos dapat mencakup penggabungan dengan teknik lain seperti Matrix Factorization atau penggunaan bersama algoritma lain untuk meningkatkan akurasi rekomendasi.",
  },
];
