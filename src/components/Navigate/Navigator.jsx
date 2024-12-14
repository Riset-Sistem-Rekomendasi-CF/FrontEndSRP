import React from "react";
import { useLocation } from "react-router-dom";
import HeaderNavigate from "./HeaderNavigate";
import ChipNavigate from "./ChipNavigate";
import HomeIcon from "@mui/icons-material/Home";
import BookIcon from "@mui/icons-material/Book";
import EditIcon from "@mui/icons-material/Edit";

const Navigator = () => {
  const location = useLocation(); // Ambil lokasi saat ini

  // Fungsi untuk menentukan apakah link aktif
  const isActive = (path) => location.pathname === path;

  return (
    <HeaderNavigate>
      {/* Navigasi Homepage */}
      <ChipNavigate
        href="/"
        color={
          isActive("/") ? "bg-green-700 text-white" : "bg-green-500 text-white"
        } // Gaya berbeda jika aktif
        className="p-3 sm:rounded-full sm:p-4 flex-col items-center transition-all ease-in-out duration-300"
      >
        <div className="sm:hidden">
          <HomeIcon />
        </div>
        <div className="hidden sm:block">Homepage</div>
      </ChipNavigate>

      {/* Navigasi Tutorial */}
      <ChipNavigate
        href="/tutorial"
        color={
          isActive("/tutorial")
            ? "bg-card_green_primary text-white"
            : "bg-green-200 text-white"
        }
        className="p-3 sm:rounded-full sm:p-4 flex-col items-center transition-all ease-in-out duration-300"
      >
        <div className="sm:hidden">
          <BookIcon />
        </div>
        <div className="hidden sm:block">Tutorial</div>
      </ChipNavigate>

      {/* Navigasi Practice */}
      <ChipNavigate
        href="/latihan"
        color={
          isActive("/latihan")
            ? "bg-yellow-700 text-white"
            : "bg-yellow-200 text-white"
        }
        className="p-3 sm:rounded-full sm:p-4 flex-col items-center transition-all ease-in-out duration-300"
      >
        <div className="sm:hidden">
          <EditIcon />
        </div>
        <div className="hidden sm:block">Latihan</div>
      </ChipNavigate>
    </HeaderNavigate>
  );
};

export default Navigator;
