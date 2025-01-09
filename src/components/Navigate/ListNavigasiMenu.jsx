import { useState } from "react";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const ListNavigasiMenu = ({ menuVersion = 1, scrollToSection }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleToggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleScroll = (sectionId) => {
    if (scrollToSection) {
      scrollToSection(sectionId);
    }
  };

  const langkahLangkahVersion1 = [
    { label: "Data Rating", scrollTo: "data_ratingTutorial" },
    { label: "Metode Rekomendasi", scrollTo: "metode_ratingTutorial" },
    { label: "Fungsi Similaritas", scrollTo: "metode_ratingTutorial" },
  ];

  const langkahLangkahVersion2 = [
    { label: "Data Rating", scrollTo: "data_ratingLatihan" },
    { label: "Sparsity", scrollTo: "data_ratingLatihan" },
    { label: "Metode Rekomendasi", scrollTo: "metode_ratingLatihan" },
    { label: "Fungsi Similaritas", scrollTo: "metode_ratingLatihan" },
  ];

  const langkahItems =
    menuVersion === 1 ? langkahLangkahVersion1 : langkahLangkahVersion2;

  return (
    <nav className="relative p-4">
      {/* Button Navigasi di Pojok Kanan */}
      <div className="fixed top-[10rem] right-10 z-20">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-3 rounded-full bg-gray-800 text-white hover:bg-gray-600 focus:outline-none"
        >
          <MenuBookIcon />
        </button>
      </div>

      {/* Menu Navigasi yang Tersembunyi */}
      {menuOpen && (
        <div className="fixed top-16 right-4 w-64 bg-white shadow-lg rounded-lg z-10 p-4">
          {/* Tombol Close */}
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-2 right-2 p-2 text-gray-800 bg-red-200 rounded-full hover:text-black"
          >
            <CloseIcon />
          </button>

          {/* Menu items (Menu Utama) */}
          <ul className="space-y-2">
            {/* Langkah-Langkah */}
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Langkah-Langkah
            </h3>
            {langkahItems.map((item, index) => (
              <li key={index}>
                <a
                  onClick={() => handleScroll(item.scrollTo)}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-md cursor-pointer"
                >
                  {item.label}
                </a>
              </li>
            ))}

            <hr />
            {/* Daftar Perhitungan dengan Scroll */}
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Daftar Perhitungan
            </h3>
            <div className="max-h-60 overflow-y-auto space-y-2 cursor-pointer">
              {/* mean rating */}
              <li>
                <a
                  onClick={() => handleScroll("mean-rating-section")}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-md"
                >
                  Mean Rating
                </a>
              </li>
              {/* mean centered */}
              <li>
                <a
                  onClick={() => handleScroll("mean-cen-section")}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-md"
                >
                  Mean Centered
                </a>
              </li>
              {/* similarity */}
              <li>
                <a
                  onClick={() => handleScroll("sim-section")}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-md"
                >
                  Similarity
                </a>
              </li>
              {/* prediction */}
              <li>
                <a
                  onClick={() => handleScroll("pred-section")}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-md"
                >
                  Prediction
                </a>
              </li>
              <li>
                <a
                  onClick={() => handleScroll("topN-section")}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-md"
                >
                  Top-N
                </a>
              </li>
            </div>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default ListNavigasiMenu;
