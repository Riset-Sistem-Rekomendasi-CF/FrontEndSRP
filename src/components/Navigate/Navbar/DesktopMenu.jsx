// components/Navbar/DesktopMenu.jsx
import { Link, useLocation } from "react-router-dom";
import SimilarityDropdown from "./DropdownMenu";
import StepperTutorialButton from "./StepperTutorialButton";

const DesktopMenu = () => {
  const location = useLocation();
  const isActive = (path) =>
    location.pathname === path
      ? "bg-blue-home text-white"
      : "text-black dark:text-gray-300";

  return (
    <div className="hidden sm:flex sm:ml-6 space-x-4 items-center font-poppins">
      {["/", "/tutorial", "/eksplorasi"].map((path, index) => (
        <Link
          key={index}
          to={path}
          className={`px-3 py-2 rounded-md text-lg font-medium hover:bg-blue-home hover:text-white transition-colors duration-200 ${isActive(
            path
          )}`}
        >
          {path === "/"
            ? "Beranda"
            : path.replace("/", "").charAt(0).toUpperCase() + path.slice(2)}
        </Link>
      ))}
      <SimilarityDropdown />
      <StepperTutorialButton />
    </div>
  );
};

export default DesktopMenu;
