import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import ModalHomeFirst from "../../../components/modal/ModalHomeFirst";
import Img1 from "../../../assets/images/img1.png";
import Img7 from "../../../assets/images/img7.png";

const ScrollButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpenHome, setIsModalOpenHome] = useState(false);

  const scrollToSection = () => {
    const section = document.getElementById("belajar");
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

  const closeModal = () => setIsModalOpenHome(false); // Function to close modal

  return (
    <div className="flex flex-col sm:flex-row justify-center gap-4 mt-12 mb-8 px-4">
      {/* Scroll Button */}
      <div className="mb-4 sm:mb-0">
        <Link
          onClick={scrollToSection}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="font-bold font-poppins bg-yellow-btn-primary text-white px-8 py-4 rounded-full shadow-md hover:bg-yellow-300 flex items-center justify-center transition-colors duration-200"
        >
          Mulai Sekarang
          {isHovered ? (
            <ArrowDownwardIcon className="ml-2 text-xl transition-transform duration-300" />
          ) : (
            <ArrowForwardIcon className="ml-2 text-xl transition-transform duration-300" />
          )}
        </Link>
      </div>

      {/* Tutorial Button */}
      <div>
        <button
          onClick={() => setIsModalOpenHome(true)}
          className="mr-2 font-bold font-poppins border-2 bg-white border-yellow-btn-primary text-yellow-btn-primary px-8 py-4 rounded-full shadow-md hover:bg-yellow-50 flex items-center justify-center transition-colors duration-200"
        >
          <span className="hidden sm:inline">Tutorial</span>
          <PlayCircleFilledWhiteIcon />
        </button>
        {isModalOpenHome && (
          <ModalHomeFirst isOpen={isModalOpenHome} onClose={closeModal} />
        )}
      </div>
    </div>
  );
};

const HeaderHome = ({ children }) => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center px-4 sm:px-8 md:px-16 bg-gradient-to-b from-[#077efd] via-[#077efd] to-white overflow-x-hidden">
      {/* Latar belakang grid kotak */}
      <div className="absolute top-0 left-0 w-full h-full bg-box-grid-pattern animate-grid z-0"></div>

      {/* Konten utama */}
      <div className="max-w-7xl  relative z-10 px-4 sm:px-8 md:px-16 pt-20 sm:pt-32 md:pt-40">
        {/* Tempatkan gambar di sekitar H1 */}
        {/* <div className="absolute top-10 left-4 sm:left-16 z-20">
          <img src={Img1} alt="Gambar Kiri" className="w-24 sm:w-32 lg:w-40" />
        </div>

        <div className="absolute top-10 right-4 sm:right-16 z-20">
          <img src={Img7} alt="Gambar Kanan" className="w-24 sm:w-32 lg:w-40" />
        </div> */}

        {/* Judul */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-poppins text-white mb-6 relative animate__animated animate__fadeIn animate__delay-1s">
          {children}
        </h1>

        {/* Deskripsi */}
        <p className="mt-6 sm:mt-10 font-medium text-lg sm:text-xl lg:text-2xl font-poppins text-white opacity-90 mb-8 max-w-3xl mx-auto leading-relaxed tracking-wide">
          Platform pembelajaran berbasis <span className="italic">website</span>{" "}
          untuk meningkatkan pemahaman pengguna terkait perhitungan fungsi
          similaritas pada Sistem Rekomendasi <i>Collaborative Filtering</i>.
        </p>

        {/* Tombol scroll */}
        <ScrollButton />
      </div>
    </section>
  );
};

export default HeaderHome;
