export const StepsBC = [
  {
    id: 1,
    title: "Pengantar Bhattacharyya Coefficient (BC)",
    description: "Memahami apa itu BC dan kegunaannya secara umum",
    content:
      "Bhattacharyya Coefficient (BC) adalah ukuran yang digunakan untuk mengukur kesamaan antara dua distribusi probabilitas. BC mengukur seberapa mirip dua distribusi probabilitas, dan sering digunakan dalam berbagai bidang seperti pengenalan pola, pengolahan citra, dan sistem rekomendasi. Nilai BC berkisar antara 0 hingga 1, di mana nilai 1 menunjukkan kesamaan sempurna antara dua distribusi, dan nilai 0 menunjukkan kesamaan yang sangat rendah.",
  },
  {
    id: 2,
    title: "Formula dan Perhitungan BC",
    description: "Mengetahui cara menghitung BC dengan rumus matematika",
    content:
      "Rumus Bhattacharyya Coefficient (BC) untuk dua distribusi probabilitas P dan Q adalah sebagai berikut:\n\n BC(P, Q) = Σ √(P(x) * Q(x)) \n\n Di mana P(x) dan Q(x) adalah nilai fungsi distribusi probabilitas dari masing-masing distribusi P dan Q untuk elemen x. BC mengukur jumlah akar dari hasil perkalian nilai-nilai distribusi probabilitas pada titik yang sama, dan memberikan ukuran kesamaan antara kedua distribusi tersebut.",
  },
  {
    id: 3,
    title: "Penerapan BC pada Data Empiris",
    description: "Menerapkan BC pada data nyata untuk analisis lebih lanjut",
    content:
      "BC sering digunakan dalam analisis data untuk mengukur kesamaan antara distribusi probabilitas dua variabel. Sebagai contoh, BC dapat digunakan untuk membandingkan distribusi probabilitas antara dua model statistik yang digunakan untuk memprediksi suatu fenomena, atau untuk membandingkan distribusi rating antara dua pengguna dalam sistem rekomendasi. BC juga digunakan dalam pengolahan citra untuk mengukur kesamaan antara dua gambar atau objek.",
  },
  {
    id: 4,
    title: "Interpretasi Nilai BC",
    description: "Menginterpretasi hasil BC untuk menarik kesimpulan",
    content:
      "Nilai Bhattacharyya Coefficient berkisar antara 0 hingga 1: \n\n- Nilai 1: Dua distribusi probabilitas sangat mirip atau identik. \n- Nilai 0: Dua distribusi probabilitas sangat berbeda. \n\n Nilai BC yang lebih tinggi menunjukkan kesamaan yang lebih besar antara distribusi P dan Q, sedangkan nilai yang lebih rendah menunjukkan perbedaan yang lebih besar. Interpretasi ini berguna dalam berbagai aplikasi analisis data untuk membandingkan model atau distribusi.",
  },
  {
    id: 5,
    title: "Kelebihan dan Kekurangan BC",
    description: "Menilai kelebihan dan keterbatasan BC",
    content:
      "BC memiliki beberapa kelebihan, seperti kemampuannya untuk mengukur kesamaan antara dua distribusi probabilitas dengan cara yang sederhana dan intuitif. BC juga tidak tergantung pada parameter yang memerlukan penyesuaian yang rumit. Namun, BC juga memiliki beberapa kekurangan, seperti ketergantungannya pada data yang tersedia. Jika data yang digunakan untuk menghitung BC tidak representatif atau terbatas, maka hasil BC bisa menjadi kurang akurat. Selain itu, BC lebih cocok untuk distribusi probabilitas daripada data yang bersifat diskrit atau non-numerik.",
  },
  {
    id: 6,
    title: "Contoh Kasus BC dalam Pengolahan Citra",
    description: "Menggunakan BC untuk analisis dalam konteks pengolahan citra",
    content:
      "Sebagai contoh, dalam pengolahan citra, BC dapat digunakan untuk mengukur kesamaan antara dua gambar. Misalnya, BC dapat digunakan untuk membandingkan distribusi warna atau intensitas antara dua gambar untuk menilai seberapa mirip keduanya. BC sering digunakan dalam aplikasi seperti pencocokan citra, pengenalan objek, dan pemrosesan citra medis untuk menentukan seberapa mirip dua citra atau objek yang dianalisis.",
  },
  {
    id: 7,
    title: "Kesimpulan dan Aplikasi Lanjutan",
    description: "Merangkum aplikasi BC dan potensi penggunaan lanjutan",
    content:
      "Bhattacharyya Coefficient adalah alat yang sangat berguna dalam analisis data yang melibatkan distribusi probabilitas. Meskipun memiliki keterbatasan, seperti ketergantungan pada data yang representatif, BC tetap merupakan metrik yang efektif untuk mengukur kesamaan dalam berbagai aplikasi, seperti pengenalan pola, pengolahan citra, dan sistem rekomendasi. Penggunaan lanjutan BC dapat mencakup analisis distribusi yang lebih kompleks, atau penggunaannya dalam kombinasi dengan algoritma lain untuk meningkatkan akurasi dan efisiensi.",
  },
];
