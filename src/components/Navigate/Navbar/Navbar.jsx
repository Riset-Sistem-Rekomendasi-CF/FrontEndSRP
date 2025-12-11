// components/Navbar/Navbar.jsx
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import KoalaPage from "../../../assets/icons/KoalaPage.png";

import MobileMenu from "./MobileMenu";
import DesktopMenu from "./DesktopMenu";
import StepperModal from "../../modal/StepeerModal"; // Pastikan path-nya benar
import { StepperData } from "./StepperData";
import ThemeToggle from "../../Toggle/ThemeToggle";

const Navbar = () => {
  const location = useLocation();

  // State untuk menu mobile
  const [isOpen, setIsOpen] = useState(false);

  // Navbar visible saat scroll
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Modal panduan
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fungsi aktif menu
  const isActive = (path) =>
    location.pathname === path ? "bg-blue-home text-white" : "text-black";

  // Logic hide navbar saat scroll ke bawah
  useEffect(() => {
    let throttleTimeout = null;

    const handleScroll = () => {
      if (throttleTimeout) return;

      throttleTimeout = setTimeout(() => {
        const currentScrollY = window.scrollY;

        // Jangan sembunyikan navbar jika menu mobile sedang terbuka
        if (!isOpen) {
          if (currentScrollY > lastScrollY) {
            setIsVisible(false);
          } else {
            setIsVisible(true);
          }
          setLastScrollY(currentScrollY);
        }

        throttleTimeout = null;
      }, 1000);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (throttleTimeout) clearTimeout(throttleTimeout);
    };
  }, [lastScrollY, isOpen]);

  return (
    <nav
      className={`bg-white dark:bg-gray-800 shadow-sm dark:shadow-gray-700 sticky top-0 z-50 transition-all duration-200 ${
        isVisible ? "transform-none" : "-translate-y-full"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo + Brand */}
          <Link
            to="/"
            className="flex items-center space-x-3 text-black dark:text-white text-xl font-semibold"
          >
            <img
              src={KoalaPage}
              alt="Koala Icon"
              className="w-10 h-10 object-cover rounded-full"
            />
            <span className="hidden sm:inline">KoalaERS</span>{" "}
            {/* Sembunyi di <sm */}
          </Link>

          {/* Hamburger (Mobile Only) */}
          <div className="flex sm:hidden items-center space-x-2">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-black dark:text-white hover:bg-blue-home hover:text-white"
            >
              {isOpen ? (
                <CloseIcon className="h-6 w-6" />
              ) : (
                <MenuIcon className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Desktop Menu (Hidden on Mobile) */}
          <div className="hidden sm:flex sm:items-center sm:space-x-6">
            <DesktopMenu
              isActive={isActive}
              openModal={() => setIsModalOpen(true)}
            />
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* Mobile Menu (Only visible when open) */}
      {isOpen && (
        <div className="sm:hidden">
          <MobileMenu
            isOpen={isOpen}
            isActive={isActive}
            openModal={() => setIsModalOpen(true)}
          />
        </div>
      )}

      {/* Modal Stepper */}
      <StepperModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        stepsContent={StepperData}
      />
    </nav>
  );
};

export default Navbar;
