// App.jsx

const CardSteps = ({ icon, title, description, bgColor }) => (
  <div className="bg-white dark:bg-gray-800 shadow-lg rounded-[1.5rem] border-2 border-black dark:border-gray-600 p-4 sm:p-5 md:p-6 font-poppins transition-colors duration-200">
    <div
      className={`text-2xl sm:text-3xl md:text-4xl text-purple-600 mb-3 sm:mb-4 px-2 py-3 sm:py-4 ${bgColor} rounded-lg h-14 w-14 sm:h-16 sm:w-16 md:h-20 md:w-20 flex items-center justify-center`}
    >
      {icon}
    </div>
    <h3 className="text-start text-sm sm:text-base md:text-lg font-bold text-gray-800 dark:text-white mb-1 sm:mb-2">
      {title}
    </h3>
    <p className="text-start text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
      {description}
    </p>
  </div>
);

export default function CardsSteps() {
  const cards = [
    {
      icon: "📚",
      title: "Menyiapkan Data Rating",
      description:
        "Menyiapkan data rating yang akan digunakan untuk perhitungan fungsi similaritas.",
      bgColor: "bg-yellow-500",
    },
    {
      icon: "📖",
      title: "Sparsity",
      description:
        "Sparsity adalah data rating yang tidak ada, karena user belum memberikan nilai kepada item tetentu.",
      bgColor: "bg-green-500",
    },
    {
      icon: "📜",
      title: "Melihat Notasi dan Penjelasan",
      description:
        "Melihat Notasi dan Penjelasan secara detail untuk notasi yang digunakan.",
      bgColor: "bg-blue-500",
    },
    {
      icon: "💲",
      title: "Memilih Metode Digunakan",
      description:
        "Memilih metode yang ingin digunakan, apakah User-Based atau Item-Based.",
      bgColor: "bg-red-500",
    },
    {
      icon: "💡",
      title: "Top-K",
      description:
        "Pengguna dapat menentukan Top-K. Top-K yaitu tetangga terdekat yang akan digunakan untuk melihat seberapa mirip user target dari user yang lain",
      bgColor: "bg-purple-500",
    },
    {
      icon: "🎯",
      title: "Top-N",
      description:
        "Top-N yaitu data dari hasil prediksi digunakan untuk memberikan rekomendasi item terbaik kepada user.",
      bgColor: "bg-indigo-500",
    },
  ];

  return (
    <>
      <section className="min-h-screen mx-auto font-poppins px-4 sm:px-6">
        <div className="bg-white dark:bg-gray-900 max-w-5xl mx-auto flex flex-col items-center justify-center p-4 sm:p-6 transition-colors duration-200">
          <div className="text-center mb-6 sm:mb-8 md:mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black dark:text-white mb-3 sm:mb-4 md:mb-5">
              Informasi Perhitungan Prediksi Collaborative Filtering
            </h2>
            <p className="text-black dark:text-gray-300 font-medium text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed">
              Berikut adalah informasi Perhitungan Prediksi Colllaborative
              Filtering yang perlu diikuti untuk menghitung Metode Prediksi
              User-Based dan Item-Based Collaborative Filtering:
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 w-full max-w-6xl">
            {cards.map((card, index) => (
              <CardSteps
                key={index}
                icon={card.icon}
                title={card.title}
                description={card.description}
                bgColor={card.bgColor}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
