import { useState } from "react";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import CloseIcon from "@mui/icons-material/Close"; // Menambahkan ikon Close
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const ListNavigasiMenu = ({ menuVersion = 1, scrollToSection }) => {
  const [menuOpen, setMenuOpen] = useState(false); // Mengatur status buka/tutup menu
  const [dropdownOpen, setDropdownOpen] = useState(false); // Untuk membuka/menutup dropdown Similaritas

  const handleToggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleScroll = (sectionId) => {
    if (scrollToSection) {
      scrollToSection(sectionId);
    }
  };

  // Menu utama (menu yang tidak berubah antara versi 1 dan versi 2)
  const menuItems = [
    { label: "Home", link: "/" },
    { label: "Tutorial", link: "/tutorial" },
    { label: "Latihan", link: "/latihan" },
  ];

  // Langkah-langkah yang berbeda untuk versi 1 dan 2
  const langkahLangkahVersion1 = [
    { label: "Data Rating", scrollTo: "data_ratingTutorial" },
    { label: "Metode Rekomendasi", scrollTo: "metode_ratingTutorial" },
    { label: "Fungsi Similaritas", scrollTo: "metode_ratingTutorial" },
  ];

  const langkahLangkahVersion2 = [
    { label: "Data Rating", scrollTo: "data_ratingLatihan" },
    { label: "Metode Rekomendasi", scrollTo: "metode_ratingLatihan" },
    { label: "Fungsi Similaritas", scrollTo: "metode_ratingLatihan" },
  ];

  // Pilih langkah-langkah berdasarkan versi yang diberikan
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

          {/* Heading Menu */}
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            List Menu
          </h3>

          {/* Menu items (Menu Utama) */}
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                <a
                  href={item.link}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-md"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <div className="relative" onClick={handleToggleDropdown}>
                <button className="block px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-md">
                  Similaritas
                  {dropdownOpen ? (
                    <KeyboardArrowUpIcon className="ml-2 h-5 w-5" />
                  ) : (
                    <KeyboardArrowDownIcon className="ml-2 h-5 w-5" />
                  )}
                </button>
                {dropdownOpen && (
                  <ul className="space-y-2 pl-4">
                    <li>
                      <a
                        href="/pccDetail"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-md"
                      >
                        PCC
                      </a>
                    </li>
                    <li>
                      <a
                        href="/cosineDetail"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-md"
                      >
                        Cosine
                      </a>
                    </li>
                    <li>
                      <a
                        href="/acosDetail"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-md"
                      >
                        ACos
                      </a>
                    </li>
                    <li>
                      <a
                        href="/bcDetail"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-md"
                      >
                        BC
                      </a>
                    </li>
                  </ul>
                )}
              </div>
            </li>

            <hr />
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
          </ul>
        </div>
      )}
    </nav>
  );
};

export default ListNavigasiMenu;
