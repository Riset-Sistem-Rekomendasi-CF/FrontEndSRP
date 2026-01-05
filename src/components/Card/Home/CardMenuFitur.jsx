import { Link } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const CardMenuFitur = ({
  Image,
  bgColor,
  Heading,
  children,
  buttonName,
  anchor,
}) => {
  const handleLinkClick = () => {
    window.scrollTo(0, 0);
  };
  return (
    <div
      className={`flex flex-col md:flex-row items-center justify-between h-full ${bgColor} shadow-lg rounded-[20px] sm:rounded-[30px] border-2 border-black dark:border-gray-600 p-4 sm:p-5 md:p-6 space-y-4 md:space-y-0 md:space-x-6 hover:${bgColor} hover:shadow-xl bg-box-grid-pattern animate-grid z-0 transition-colors duration-200`}
    >
      {/* Left side with text and button */}
      <div className="flex-1 flex flex-col justify-between text-center md:text-left">
        <div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black dark:text-white mb-2">
            {Heading}
          </h2>
          <p className="text-black dark:text-gray-200 font-medium text-sm sm:text-base md:text-md mb-3 sm:mb-4 flex-grow leading-relaxed">
            {children}
          </p>
        </div>

        {/* Button */}
        <Link
          to={anchor}
          onClick={handleLinkClick}
          className="font-poppins font-medium text-center mt-3 sm:mt-4 px-4 sm:px-6 py-2 bg-purple-600 text-white text-sm sm:text-base rounded-full border-2 border-black hover:bg-purple-800 transition duration-300 w-full sm:w-auto"
        >
          {buttonName}
          <ArrowForwardIcon className="ml-1 sm:ml-2 text-base sm:text-lg" />
        </Link>
      </div>

      {/* Right side with image */}
      <div className="flex-1 w-full md:w-auto">
        <img
          src={Image}
          alt={Image}
          className="w-full h-auto object-contain max-h-48 sm:max-h-56 md:max-h-none"
        />
      </div>
    </div>
  );
};

export default CardMenuFitur;
