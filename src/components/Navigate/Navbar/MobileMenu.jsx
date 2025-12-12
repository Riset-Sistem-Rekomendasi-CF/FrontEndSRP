import { Link } from "react-router-dom";
import SimilarityDropdown from "./DropdownMenu";
import StepperTutorialButton from "./StepperTutorialButton";

const MobileMenu = ({ isOpen, isActive }) => {
  if (!isOpen) return null;

  return (
    <div className="sm:hidden px-4 pb-4 font-poppins bg-white dark:bg-gray-800">
      <Link
        to="/"
        className={`block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-home hover:text-white dark:text-gray-300 transition-colors duration-200 ${isActive(
          "/"
        )}`}
      >
        Beranda
      </Link>
      <Link
        to="/tutorial"
        className={`block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-home hover:text-white dark:text-gray-300 transition-colors duration-200 ${isActive(
          "/tutorial"
        )}`}
      >
        Tutorial
      </Link>
      <Link
        to="/eksplorasi"
        className={`block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-home hover:text-white dark:text-gray-300 transition-colors duration-200 ${isActive(
          "/eksplorasi"
        )}`}
      >
        Eksplorasi
      </Link>

      <SimilarityDropdown isActive={isActive} />

      <div className="mt-4">
        <StepperTutorialButton />
      </div>
    </div>
  );
};

export default MobileMenu;
