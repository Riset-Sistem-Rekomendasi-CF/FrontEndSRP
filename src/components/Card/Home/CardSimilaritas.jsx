import React from "react";
import pearson from "../../../assets/images/people.png";
import sinus from "../../../assets/images/sinus.png";
import probs from "../../../assets/images/probability.png";
import social from "../../../assets/images/social-distancing.png";
import { Link } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const FeatureCard = ({
  title,
  description,
  svgPath,
  buttonText,
  anchor,
  bgColor,
}) => {
  const handleLinkClick = () => {
    // Scroll halaman ke atas
    window.scrollTo(0, 0);
  };
  return (
    <div
      className={`${bgColor} shadow-md rounded-lg px-6 py-8 flex flex-col items-center justify-between h-full border-2 border-black bg-box-grid-pattern animate-grid z-0`}
    >
      {/* Title */}
      <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
        {title}
      </h2>

      {/* Icon */}
      <div className="relative h-24 w-24 rounded-full mb-4">
        {/* Gambar di tengah */}
        <img
          src={svgPath} // Ganti dengan URL gambar yang Anda inginkan
          alt="Icon"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-16 w-16 object-cover rounded-full"
        />
      </div>

      {/* Description */}
      <p className="mt-4 text-black text-justify flex-grow font-medium text-md">
        {description}
      </p>

      <Link
        to={anchor}
        onClick={handleLinkClick} // Menambahkan onClick untuk scroll ke atas
        className="mt-4 px-6 py-2 bg-card_purple_primary text-white rounded-lg hover:bg-blue-home transition duration-300 w-full sm:w-auto mx-auto"
      >
        {buttonText}
        <ArrowForwardIcon className="ml-2 text-lg" />
      </Link>
    </div>
  );
};

const CardSimilaritas = () => {
  return (
    <>
      <div className="min-h-screen mx-auto mt-10 font-poppins">
        <div className="max-w-7xl p-5 mx-auto text-center ">
          <div className=" mb-10">
            <div className="flex flex-col md:flex-row  mx-auto">
              {/* Heading dengan lebar 3/5 */}
              <h1 className="w-full md:w-2/4 text-3xl sm:text-xl md:text-2xl lg:text-5xl font-bold text-gray-800 leading-tight text-start">
                Fungsi Similaritas Collaborative Filtering
              </h1>

              {/* Paragraf dengan lebar 2/5 */}
              <p className="w-full md:w-2/4 font-medium text-gray-600 text-md sm:text-sm md:text-lg text-justify">
                Ini adalah platform pembelajaran berbasis website yang
                mengajarkan cara menghitung Fungsi Similaritas, baik untuk
                sistem rekomendasi berbasis pengguna (user-based) maupun
                berbasis item (item-based). Melalui aplikasi ini, pengguna dapat
                memahami secara mendalam bagaimana algoritma rekomendasi
                bekerja.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              title="PCC"
              description="Pearson Coefficient Correlation atau (PCC) adalah salah satu fungsi similaritas yang  digunakan untuk mengukur similaritas."
              svgPath={pearson}
              buttonText="Baca Lebih Detail"
              anchor={"/pccDetail"}
              bgColor={"bg-blue-400"}
            />
            <FeatureCard
              title="Cosine"
              description="Cosine digunakan untuk membandingkan kesamaan antara preferensi pengguna terhadap item yang ada."
              svgPath={sinus}
              buttonText="Baca Lebih Detail"
              anchor={"/cosineDetail"}
              bgColor={"bg-green-400"}
            />
            <FeatureCard
              title="Adjusted Cosine"
              description="ACos membantu mengatasi masalah bias yang mungkin muncul dari perbedaan skala rating antara user."
              svgPath={social}
              buttonText="Baca Lebih Detail"
              anchor={"/acosDetail"}
              bgColor={"bg-yellow-400"}
            />
            <FeatureCard
              title="BC"
              description="perhitungan BC dilakukan dengan mengukur similaritas antara dua distribusi probabilitas histogram rating."
              svgPath={probs}
              buttonText="Baca Lebih Detail"
              anchor={"/bcDetail"}
              bgColor={"bg-red-400"}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CardSimilaritas;
