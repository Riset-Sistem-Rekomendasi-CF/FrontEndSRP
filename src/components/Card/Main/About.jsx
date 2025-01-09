import KoalaPage from "../../../assets/icons/KoalaPage.png";

const About = () => {
  const faqs = [
    {
      question: "Apa itu sistem rekomendasi?",
      answer:
        "Sistem rekomendasi adalah sistem yang digunakan untuk memberikan saran atau rekomendasi kepada pengguna berdasarkan data yang tersedia, seperti preferensi atau perilaku pengguna.",
    },
    {
      question: "Bagaimana cara kerja Collaborative Filtering?",
      answer:
        "Collaborative Filtering bekerja dengan menganalisis pola preferensi pengguna dan memberikan rekomendasi berdasarkan kemiripan antara pengguna atau item.",
    },
    {
      question: "Apa yang dimaksud dengan Memory-Based Filtering?",
      answer:
        "Memory-Based Filtering adalah metode yang mengandalkan data historis untuk memberikan rekomendasi, seperti User-Based dan Item-Based Collaborative Filtering.",
    },
    {
      question:
        "Apa kelebihan sistem rekomendasi berbasis collaborative filtering?",
      answer:
        "Sistem berbasis Collaborative Filtering dapat memberikan rekomendasi yang lebih relevan dengan mengandalkan interaksi antar pengguna dan item tanpa memerlukan informasi tentang item itu sendiri.",
    },
  ];

  return (
    <section className="py-16 px-4 bg-white overflow-x-hidden font-poppins">
      <div className="max-w-7xl mx-auto">
        {/* Grid Layout: 2 Kolom */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Kolom 1: Heading */}
          <div className="text-start text-lg">
            <h1 className="text-5xl mb-6 text-blue-home font-semibold">
              <span class="curved-underline">
                Tentang Aplikasi
                <svg viewBox="0 0 100 20" preserveAspectRatio="none">
                  <path
                    d="M0 20 Q 50 0, 100 20"
                    stroke="white"
                    stroke-width="4"
                    fill="none"
                  />
                </svg>
              </span>
            </h1>

            <p className="text-md font-meddium  text-black text-start">
              Aplikasi ini merupakan platform media pembelajaran berbasis
              website yang dirancang untuk mempermudah pembelajaran interaktif.
              Dengan menggunakan sistem rekomendasi berbasis User-Based dan
              Item-Based.
            </p>
            {/* Gambar */}

            <img
              src={KoalaPage} // Ganti dengan URL gambar yang sesuai
              alt="Deskripsi Gambar"
              className=" w-full h-auto" // Menambahkan styling untuk gambar
            />
          </div>

          {/* Kolom 2: Pertanyaan dan Jawaban */}
          <div className="text-start col-span-2 space-y-4 ">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="space-y-4 hover:bg-card_yellow_primary hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer p-4 rounded-lg"
              >
                <div className="text-xl font-semibold text-gray-800">
                  {faq.question}
                </div>
                <p className="text-base text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
