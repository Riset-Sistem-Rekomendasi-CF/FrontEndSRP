// components/Navbar/SimilarityDropdown.jsx
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const SimilarityDropdown = () => {
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const isActive = (path) =>
    location.pathname === path ? "bg-blue-home text-white" : "text-black";

  return (
    <div className="relative" onClick={() => setDropdownOpen(!dropdownOpen)}>
      <button className="text-black px-3 py-2 rounded-md text-lg font-medium flex items-center hover:bg-blue-home hover:text-white">
        Similaritas
        {dropdownOpen ? (
          <KeyboardArrowUpIcon className="ml-2 h-5 w-5" />
        ) : (
          <KeyboardArrowDownIcon className="ml-2 h-5 w-5" />
        )}
      </button>
      {dropdownOpen && (
        <div className="absolute left-1/2 transform -translate-x-1/2 w-48 mt-2 origin-top-left rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            {["pccDetail", "cosineDetail", "acosDetail", "bcDetail"].map(
              (route) => (
                <Link
                  key={route}
                  to={`/${route}`}
                  className={`block px-4 py-2 text-base hover:bg-blue-400 ${isActive(
                    `/${route}`
                  )}`}
                >
                  {route.toUpperCase().replace("DETAIL", "")}
                </Link>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SimilarityDropdown;
