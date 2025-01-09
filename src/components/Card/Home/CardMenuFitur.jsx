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
    // Scroll halaman ke atas
    window.scrollTo(0, 0);
  };
  return (
    <div
      className={`flex flex-col md:flex-row items-center justify-between h-full ${bgColor} shadow-lg rounded-[30px] border-2 border-black p-6 space-y-4 md:space-y-0 md:space-x-6 hover:${bgColor} hover:shadow-xl  bg-box-grid-pattern animate-grid z-0`}
    >
      {/* Left side with text and button */}
      <div className="flex-1 flex flex-col justify-between text-center md:text-left">
        <div>
          <h2 className="text-3xl font-bold text-black mb-2">{Heading}</h2>
          <p className="text-black font-medium text-md mb-4 flex-grow">
            {children}
          </p>
        </div>

        {/* Button */}
        <Link
          to={anchor}
          onClick={handleLinkClick} // Menambahkan onClick untuk scroll ke atas
          className="font-poppins font-medium text-center mt-4 px-6 py-2 bg-purple-600 text-white rounded-full border-2 border-black hover:bg-purple-800 transition duration-300 w-auto sm:w-auto "
        >
          {buttonName}
          <ArrowForwardIcon className="ml-2 text-lg" />
        </Link>
      </div>

      {/* Right side with image */}
      <div className="flex-1">
        <img src={Image} alt={Image} className="w-full h-auto object-contain" />
      </div>
    </div>
  );
};

export default CardMenuFitur;
