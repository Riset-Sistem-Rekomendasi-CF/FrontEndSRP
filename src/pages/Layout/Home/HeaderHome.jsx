import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ScrollButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isHoveredMulai, setIsHoveredMulai] = useState(false);
  const [isModalOpenHome, setIsModalOpenHome] = useState(false);

  const scrollToSection = () => {
    const section = document.getElementById("belajar");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToSectionMulai = () => {
    const section = document.getElementById("mulai");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisited");
    if (!hasVisited) {
      setIsModalOpenHome(true);
      localStorage.setItem("hasVisited", "true");
    }
  }, []);

  const closeModal = () => setIsModalOpenHome(false);

  return (
    <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mt-8 sm:mt-10 md:mt-12 mb-6 sm:mb-8 px-4">
      {/* Scroll Button */}
      <div className="mb-2 sm:mb-0">
        <Link
          onClick={scrollToSectionMulai}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="font-bold font-poppins bg-greenDrak-btn-primary text-white text-sm sm:text-base px-5 sm:px-6 md:px-8 py-3 sm:py-4 rounded-full shadow-md hover:bg-yellow-300 flex items-center justify-center transition-colors duration-200"
        >
          Mulai Sekarang
          {isHovered ? (
            <ArrowDownwardIcon className="ml-1 sm:ml-2 text-lg sm:text-xl transition-transform duration-300" />
          ) : (
            <ArrowForwardIcon className="ml-1 sm:ml-2 text-lg sm:text-xl transition-transform duration-300" />
          )}
        </Link>
      </div>
      <div className="mb-2 sm:mb-0">
        <Link
          onClick={scrollToSection}
          onMouseEnter={() => setIsHoveredMulai(true)}
          onMouseLeave={() => setIsHoveredMulai(false)}
          className="font-bold font-poppins bg-card_purple_primary text-white text-sm sm:text-base px-5 sm:px-6 md:px-8 py-3 sm:py-4 rounded-full shadow-md hover:bg-yellow-300 flex items-center justify-center transition-colors duration-200"
        >
          Baca Deskripsi
          {isHoveredMulai ? (
            <ArrowDownwardIcon className="ml-1 sm:ml-2 text-lg sm:text-xl transition-transform duration-300" />
          ) : (
            <ArrowForwardIcon className="ml-1 sm:ml-2 text-lg sm:text-xl transition-transform duration-300" />
          )}
        </Link>
      </div>
    </div>
  );
};

const HeaderHome = ({ children }) => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center px-3 sm:px-6 md:px-12 lg:px-16 bg-gradient-to-b from-[#077efd] via-[#077efd] to-white dark:from-[#1e40af] dark:via-[#1e3a8a] dark:to-gray-900 overflow-x-hidden transition-colors duration-200">
      {/* Latar belakang grid kotak */}
      <div className="absolute top-0 left-0 w-full h-full bg-box-grid-pattern animate-grid z-0"></div>
      {/* Konten utama */}
      <div className="max-w-7xl relative z-10 px-3 sm:px-6 md:px-12 lg:px-16 pt-16 sm:pt-24 md:pt-32 lg:pt-40">
        {/* Judul */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold font-poppins text-white mb-4 sm:mb-5 md:mb-6 relative animate__animated animate__fadeIn animate__delay-1s leading-tight sm:leading-tight md:leading-snug text-center">
          {children}
        </h1>

        {/* Deskripsi */}
        <p className="mt-4 sm:mt-6 md:mt-8 lg:mt-10 font-medium text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-poppins text-white opacity-90 mb-6 sm:mb-8 max-w-4xl mx-auto leading-relaxed tracking-wide text-center px-2">
          KoalaERS adalah media pembelajaran berbasis website yang dirancang
          untuk mempermudah pemahaman pengguna mengenai cara perhitungan fungsi
          similaritas pada sistem rekomendasi berbasis Collaborative Filtering.
        </p>

        {/* Tombol scroll */}
        <ScrollButton />
      </div>
    </section>
  );
};

export default HeaderHome;
