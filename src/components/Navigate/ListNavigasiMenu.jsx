import { useState, useEffect, useRef } from "react";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const AUTO_CLOSE_DELAY = 3000; // 3detik

const ListNavigasiMenu = ({ menuVersion = 1, scrollToSection }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const inactivityTimer = useRef(null);

  const handleScroll = (sectionId) => {
    if (scrollToSection) scrollToSection(sectionId);
    resetInactivityTimer(); // interaksi = reset timer
  };

  const resetInactivityTimer = () => {
    clearTimeout(inactivityTimer.current);
    inactivityTimer.current = setTimeout(() => {
      setMenuOpen(false);
    }, AUTO_CLOSE_DELAY);
  };

  // Saat menu dibuka, mulai timer & dengarkan event interaksi
  useEffect(() => {
    if (menuOpen) {
      resetInactivityTimer();

      const resetOnActivity = () => resetInactivityTimer();

      // Tambah event listener
      window.addEventListener("click", resetOnActivity);
      window.addEventListener("mousemove", resetOnActivity);
      window.addEventListener("keydown", resetOnActivity);
      window.addEventListener("scroll", resetOnActivity);

      // Cleanup
      return () => {
        clearTimeout(inactivityTimer.current);
        window.removeEventListener("click", resetOnActivity);
        window.removeEventListener("mousemove", resetOnActivity);
        window.removeEventListener("keydown", resetOnActivity);
        window.removeEventListener("scroll", resetOnActivity);
      };
    }
  }, [menuOpen]);

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
      {!menuOpen && (
        <div className="fixed top-[10rem] right-10 z-20">
          <button
            onClick={() => setMenuOpen(true)}
            className="p-3 rounded-full bg-gray-800 text-white hover:bg-gray-600 focus:outline-none"
          >
            <MenuBookIcon />
          </button>
        </div>
      )}

      {menuOpen && (
        <div className="fixed top-16 right-4 w-64 bg-white shadow-lg rounded-lg z-10 p-4">
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-2 right-2 p-2 text-gray-800 bg-red-200 rounded-full hover:text-black"
          >
            <CloseIcon />
          </button>

          <ul className="space-y-2">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Persyaratan
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

            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Urutan Perhitungan
            </h3>
            <div className="max-h-60 overflow-y-auto space-y-2 cursor-pointer">
              {[
                { label: "Mean Rating", scrollTo: "mean-rating-section" },
                { label: "Mean Centered", scrollTo: "mean-cen-section" },
                { label: "Similarity", scrollTo: "sim-section" },
                { label: "Prediction", scrollTo: "pred-section" },
                { label: "Top-N", scrollTo: "topN-section" },
              ].map((item, index) => (
                <li key={index}>
                  <a
                    onClick={() => handleScroll(item.scrollTo)}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-md"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </div>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default ListNavigasiMenu;
