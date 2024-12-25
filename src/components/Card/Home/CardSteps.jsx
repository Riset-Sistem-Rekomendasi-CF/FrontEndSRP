// App.jsx
import React from "react";

const CardSteps = ({ icon, title, description, bgColor }) => (
  <div className="bg-white shadow-lg rounded-[1.5rem] border-2 border-black p-6 font-poppins">
    <div
      className={`text-4xl text-purple-600 mb-4 px-2 py-4 ${bgColor} rounded-lg h-20 w-20`}
    >
      {icon}
    </div>
    <h3 className="text-start text-lg font-bold text-gray-800 mb-2">{title}</h3>
    <p className="text-start text-gray-600">{description}</p>
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
        "Sparsity adalah data rating yang memiliki nilai kosong atau tidak memiliki nilai, karena user tidak memberikan nilai pada item tertentu.",
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
        "Top-K adalah tetangga terdekat yang akan digunakan untuk memberikan rekomendasi item terbaik kepada user.",
      bgColor: "bg-purple-500",
    },
    {
      icon: "🎯",
      title: "Top-N",
      description:
        "Top-N adalah metode yang digunakan untuk memberikan rekomendasi item terbaik kepada user.",
      bgColor: "bg-indigo-500",
    },
  ];

  return (
    <>
      <section className="min-h-screen mx-auto font-poppins">
        <div className="bg-white max-w-5xl mx-auto  flex flex-col items-center justify-center p-6">
          <div className="text-center mb-10">
            <h2 className="text-5xl font-bold text-black mb-5">
              Langkah-langkah
            </h2>
            <p className="text-black font-medium text-xl min-w-lg mx-auto">
              Berikut adalah langkah-langkah yang perlu diikuti untuk menghitung
              fungsi similaritas berdasarkan data rating yang akan digunakan:
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
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
