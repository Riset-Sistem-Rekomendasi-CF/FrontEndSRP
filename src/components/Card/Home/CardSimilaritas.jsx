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
    window.scrollTo(0, 0);
  };
  return (
    <div
      className={`${bgColor} shadow-md rounded-lg px-4 sm:px-5 md:px-6 py-5 sm:py-6 md:py-8 flex flex-col items-center justify-between h-full border-2 border-black dark:border-gray-600 bg-box-grid-pattern animate-grid z-0 transition-colors duration-200`}
    >
      {/* Title */}
      <h2 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white mb-3 sm:mb-4 text-center">
        {title}
      </h2>

      {/* Icon */}
      <div className="relative h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 rounded-full mb-3 sm:mb-4">
        <img
          src={svgPath}
          alt="Icon"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 object-cover rounded-full"
        />
      </div>

      {/* Description */}
      <p className="mt-3 sm:mt-4 text-black dark:text-gray-200 text-justify flex-grow font-medium text-xs sm:text-sm md:text-md leading-relaxed">
        {description}
      </p>

      <Link
        to={anchor}
        onClick={handleLinkClick}
        className="mt-3 sm:mt-4 px-4 sm:px-6 py-2 bg-card_purple_primary text-white text-sm sm:text-base rounded-lg hover:bg-blue-home transition duration-300 w-full sm:w-auto mx-auto text-center"
      >
        {buttonText}
        <ArrowForwardIcon className="ml-1 sm:ml-2 text-base sm:text-lg" />
      </Link>
    </div>
  );
};

const CardSimilaritas = () => {
  return (
    <>
      <div className="min-h-screen mx-auto mt-6 sm:mt-8 md:mt-10 font-poppins dark:bg-gray-900 transition-colors duration-200 px-4 sm:px-6">
        <div className="max-w-7xl p-3 sm:p-4 md:p-5 mx-auto text-center">
          <div className="mb-6 sm:mb-8 md:mb-10">
            <div className="flex flex-col md:flex-row gap-4 sm:gap-6 mx-auto">
              {/* Heading */}
              <h1 className="w-full md:w-2/4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 dark:text-white leading-tight text-center md:text-start">
                Fungsi Similaritas pada Collaborative Filtering
              </h1>

              {/* Paragraf */}
              <p className="w-full md:w-2/4 font-medium text-gray-600 dark:text-gray-300 text-sm sm:text-base md:text-lg text-center md:text-justify leading-relaxed">
                Website KoalaERS mengajarkan cara menghitung Fungsi Similaritas,
                baik untuk sistem rekomendasi collaborative filtering berbasis
                user-based maupun item-based. Melalui website ini, pengguna
                dapat memahami secara mendalam bagaimana algoritma rekomendasi
                bekerja pada sistem rekomendasi berbasis Collaborative
                Filtering.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
            <FeatureCard
              title="PCC"
              description="Pearson Coefficient Correlation atau (PCC) digunakan untuk menentukan sejauh mana dua variabel memiliki hubungan linear."
              svgPath={pearson}
              buttonText="Baca Lebih Detail"
              anchor={"/pccDetail"}
              bgColor={"bg-blue-400"}
            />
            <FeatureCard
              title="Cosine"
              description="Cosine digunakan untuk digunakan untuk membandingkan kesamaan antara preferensi."
              svgPath={sinus}
              buttonText="Baca Lebih Detail"
              anchor={"/cosineDetail"}
              bgColor={"bg-green-400"}
            />
            <FeatureCard
              title="Adjusted Cosine"
              description="ACos menghitung kesamaan tanpa terpengaruh oleh perbedaan skala rating yang digunakan oleh masing-masing pengguna."
              svgPath={social}
              buttonText="Baca Lebih Detail"
              anchor={"/acosDetail"}
              bgColor={"bg-yellow-400"}
            />
            <FeatureCard
              title="BC"
              description="perhitungan BC digunakan untuk membandingkan dua distribusi data yang dihasilkan dari penilaian pengguna terhadap item."
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
