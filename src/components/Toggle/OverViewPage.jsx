import React, { useState, useEffect } from "react";
import "../../index.css";
import UserBased from "../../assets/vidioAsset/userFGif.gif";
import UserBasedSvg from "../../assets/images/6.png";
import ItemBased from "../../assets/vidioAsset/itemFGif.gif";
import ItemBasedSvg from "../../assets/images/7.png";

import Img1 from "../../assets/images/img1.png";
import Img8 from "../../assets/images/img8.png";
import CachedIcon from "@mui/icons-material/Cached";
import { Settings, TrendingUp, PieChart, BarChart } from "@mui/icons-material";

// ===================================================== GIF IMAGE ========================================== //
const GifImage = ({ gifSrc, staticImgSrc, altText }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Fungsi untuk menangani hover (menyembunyikan GIF dan menampilkan gambar statis)
  const handleMouseEnter = () => {
    setIsHovered(true); // Menandakan bahwa gambar sedang di-hover
  };

  const handleMouseLeave = () => {
    setIsHovered(false); // Mengembalikan gambar ke GIF saat mouse keluar
  };

  return (
    <img
      src={isHovered ? staticImgSrc : gifSrc} // Mengganti src saat hover
      alt={altText}
      className="w-full h-full object-cover rounded-lg transition-all duration-300"
      onMouseEnter={handleMouseEnter} // Menangani event hover masuk
      onMouseLeave={handleMouseLeave} // Menangani event hover keluar
    />
  );
};

// ===================================================== END GIF IMAGE ========================================== //

// ===================================================== CARD FLIP ========================================== //

const CardFlip = () => {
  // State terpisah untuk kartu kiri dan kanan
  const [isLeftFlipped, setIsLeftFlipped] = useState(false);
  const [isRightFlipped, setIsRightFlipped] = useState(false);

  // Fungsi untuk membalik kartu kiri
  const flipLeftCard = () => {
    setIsLeftFlipped(!isLeftFlipped);
  };

  // Fungsi untuk membalik kartu kanan
  const flipRightCard = () => {
    setIsRightFlipped(!isRightFlipped);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center  gap-4">
      {/* Kartu Kiri */}
      <div
        onClick={flipLeftCard}
        className="relative w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl h-[450px] sm:h-[500px] md:h-[550px] lg:h-[600px] perspective-[1000px] cursor-pointer"
      >
        <div
          className={`absolute w-full h-full border-2 border-black rounded-xl transition-transform duration-500 ${
            isLeftFlipped ? "rotate-y-180" : ""
          } transform-style-preserve-3d`}
        >
          {/* Front */}
          <div className="w-full h-full absolute bg-white text-white flex flex-col justify-start items-center p-5  rounded-xl shadow-lg backface-hidden ">
            <div className="flex flex-row items-center ">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-black mb-2">
                User-Based Filtering
              </h2>
              <CachedIcon className="text-gray-800 text-xl ml-4" />
            </div>
            <div className="w-full h-full flex justify-center items-center overflow-hidden">
              <GifImage
                gifSrc={UserBased} // Ganti dengan path gambar GIF
                staticImgSrc={UserBasedSvg} // Ganti dengan path gambar statis (frame pertama)
                altText="User-based GIF"
                className="object-contain w-full h-full" // Gambar responsif dan tidak keluar batas
              />
            </div>
          </div>

          {/* Back */}
          <div
            className={`w-full h-full absolute bg-white text-white flex justify-center items-start p-6 rounded-xl shadow-lg backface-hidden rotate-y-180 overflow-auto`}
          >
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed">
              Pada user-based filtering , rekomendasi diberikan berdasarkan
              kesamaan antara pengguna. Jika dua pengguna memiliki pola
              interaksi yang serupa (misalnya, mereka menyukai materi atau item
              yang sama), maka sistem akan merekomendasikan item yang disukai
              oleh pengguna serupa tersebut kepada pengguna yang sedang
              dipertimbangkan.
            </p>
          </div>
        </div>
      </div>

      {/* Kartu Kanan */}
      <div
        onClick={flipRightCard}
        className="relative w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl h-[450px] sm:h-[500px] md:h-[550px] lg:h-[600px] perspective-[1000px] cursor-pointer"
      >
        <div
          className={`absolute w-full h-full border-2 border-black rounded-xl transition-transform duration-500 ${
            isRightFlipped ? "rotate-y-180" : ""
          } transform-style-preserve-3d`}
        >
          {/* Front */}
          <div className="w-full h-full absolute bg-white text-white flex flex-col justify-start items-center p-5 rounded-xl shadow-lg backface-hidden">
            <div className="flex flex-row items-center ">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-black mb-2">
                Item-Based Filtering
              </h2>
              <CachedIcon className="text-gray-800 text-xl ml-4" />
            </div>
            <div className="w-full h-full flex justify-center items-center overflow-hidden">
              <GifImage
                gifSrc={ItemBased} // Ganti dengan path gambar GIF
                staticImgSrc={ItemBasedSvg} // Ganti dengan path gambar statis (frame pertama)
                altText="Item-Based GIF"
                className="object-contain w-full h-full" // Gambar responsif dan tidak keluar batas
              />
            </div>
          </div>

          {/* Back */}
          <div
            className={`w-full h-full absolute bg-white text-white flex justify-center items-start p-6 rounded-xl shadow-lg backface-hidden rotate-y-180 overflow-auto`}
          >
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed">
              Di sisi lain, item-based filtering mengukur kesamaan antar item
              atau materi pembelajaran. Dalam pendekatan ini, rekomendasi
              diberikan berdasarkan kesamaan antara item yang telah dipilih atau
              disukai oleh pengguna sebelumnya dengan item lainnya. Jika
              pengguna menyukai item A, dan item B memiliki kesamaan yang tinggi
              dengan item A, maka item B akan direkomendasikan.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ===================================================== END CARD FLIP ========================================== //

// ===================================================== OVERRVIEW ========================================== //

const ContentOverview = () => {
  return (
    <>
      <div className="bg-card_purple_secondary rounded-xl p-6 md:p-10 mb-6 max-w-4xl mx-auto hover:bg-card_purple_secondary hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer bg-box-grid-pattern animate-grid z-0">
        <h1 className="text-start text-xl font-semibold font-poppins mb-5">
          Sistem Rekomendasi
        </h1>
        <p className="text-base sm:text-md md:text-lg text-black text-justify">
          <a
            href="https://www.bing.com/ck/a?!&&p=024c8e5d90fb32c16daaec06b7404838325313e0097f7340e2a37bb95b0a5cadJmltdHM9MTczMjA2MDgwMA&ptn=3&ver=2&hsh=4&fclid=333afb95-0e41-6f3e-3613-eb710fbc6e24&psq=IMPLEMENTASI+METODE+COLLABORATIVE+FILTERING+UNTUK+SISTEM+REKOMENDASI+PENJUALAN+PADA+TOKO+MEBEL&u=a1aHR0cHM6Ly9lam91cm5hbC5ic2kuYWMuaWQvZWp1cm5hbC9pbmRleC5waHAva2hhdHVsaXN0aXdhL2FydGljbGUvZG93bmxvYWQvOTg1OS80ODcz&ntb=1"
            className="text-italic font-semibold no-underline hover:underline text-card_blue_primary decoration-card_blue_primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            Sistem Rekomendasi
          </a>{" "}
          merupakan sistem yang dibuat untuk menyediakan dan memberikan
          rekomendasi terhadap suatu item di mana nilai rating tersebut belum
          diberikan oleh user tertentu. Kemudian, sistem akan membuatkan suatu
          prediksi yang diinginkan oleh user tersebut.
        </p>
      </div>

      {/* Bottom Section: Single Column */}
      <div className="bg-card_yellow_primary rounded-xl p-6 md:p-10 mb-6 max-w-4xl mx-auto hover:bg-card_yellow_primary hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer bg-box-grid-pattern animate-grid z-0">
        <h1 className="text-start text-xl font-semibold font-poppins  mb-5">
          Collaborative Filtering
        </h1>
        <p className="text-base sm:text-md md:text-lg text-black text-justify my-3">
          <a
            href="https://www.researchgate.net/publication/365477302_Sistem_Rekomendasi_Produk_Aplikasi_Marketplace_Berdasarkan_Karakteristik_Pembeli_Menggunakan_Metode_User_Based_Collaborative_Filtering"
            className="text-italic font-semibold no-underline hover:underline text-card_blue_primary decoration-card_blue_primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            Collaborative Filtering
          </a>{" "}
          adalah metode yang digunakan dalam sistem rekomendasi untuk
          menghasilkan rekomendasi khusus kepada user tentang item berdasarkan
          pola penilaian atau penggunaan. Teknik ini terbagi menjadi dua
          pendekatan utama: <span className="font-semibold">user-based</span>{" "}
          dan <span className="font-semibold">item-based</span>. Metode ini
          menghasilkan prediksi atau rekomendasi untuk pengguna tertentu
          terhadap satu atau banyak item.
        </p>
        <p className="text-base sm:text-md md:text-lg text-black text-justify">
          <span className="text-italic font-semibold no-underline hover:underline text-card_blue_primary decoration-card_blue_primary">
            Rating
          </span>{" "}
          mengacu pada nilai atau penilaian yang diberikan oleh user terhadap
          suatu item atau produk, yang menggambarkan seberapa besar user
          menyukai atau tidak menyukai item tersebut. Sistem rekomendasi
          kemudian menggunakan informasi ini untuk mencari pola dan membuat
          prediksi rekomendasi untuk pengguna lain yang memiliki preferensi
          serupa.
        </p>
      </div>

      <CardFlip />
    </>
  );
};

// ===================================================== END OVERVIEEW ========================================== //

export default function OverViewRekomendasi() {
  const TypingEffect = () => {
    const [currentText, setCurrentText] = useState("User-Based");
    const transitionDuration = 1000;

    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentText((prevText) =>
          prevText === "User-Based" ? "Item-Based" : "User-Based"
        );
      }, transitionDuration * 2);

      return () => clearInterval(interval);
    }, []);

    return (
      <section className="mt-[4rem] sm:mt-0 relative flex items-center justify-center">
        <h1 className="font-bold font-poppins mb-5 md:mb-8 text-3xl sm:text-4xl md:text-5xl text-gray-800">
          <span className="text-slider inline-block">
            <span className="slide-text">{`Bagaimana Sistem Rekomendasi Bekerja di ${currentText} ?`}</span>
          </span>
        </h1>
      </section>
    );
  };

  return (
    <div
      id="belajar"
      className="relative min-h-screen  py-10 px-4 sm:px-8 md:px-16 font-poppins overflow-x-hidden"
    >
      <div className="max-w-4xl mx-auto text-center">
        <TypingEffect />
        <ContentOverview />
      </div>
    </div>
  );
}
