import React from "react";
import HeaderNavigate from "./HeaderNavigate";
import ChipNavigate from "./ChipNavigate";
import HomeIcon from "@mui/icons-material/Home";
import BookIcon from "@mui/icons-material/Book";
import EditIcon from "@mui/icons-material/Edit";

const Navigator = () => {
  return (
    <HeaderNavigate>
      {/* Navigasi Homepage */}
      <ChipNavigate
        href={"/"}
        color={"bg-greenDrak-btn-primary text-white"}
        className="p-3 sm:rounded-full sm:p-4 flex-col items-center transition-all ease-in-out duration-300"
      >
        {/* Tampilkan ikon pada perangkat kecil, teks pada perangkat besar */}
        <div className="sm:hidden">
          <HomeIcon />
        </div>
        <div className="hidden sm:block">Homepage</div>
      </ChipNavigate>

      {/* Navigasi Tutorial */}
      <ChipNavigate
        href={"/tutorial"}
        color={"bg-card_green_primary text-white"}
        className="p-3 sm:rounded-full sm:p-4 flex-col items-center transition-all ease-in-out duration-300"
      >
        {/* Tampilkan ikon pada perangkat kecil, teks pada perangkat besar */}
        <div className="sm:hidden">
          <BookIcon />
        </div>
        <div className="hidden sm:block">Tutorial</div>
      </ChipNavigate>

      {/* Navigasi Practice */}
      <ChipNavigate
        href={"/latihan"}
        color={"bg-yellow-btn-primary text-white"}
        className="p-3 sm:rounded-full sm:p-4 flex-col items-center transition-all ease-in-out duration-300"
      >
        {/* Tampilkan ikon pada perangkat kecil, teks pada perangkat besar */}
        <div className="sm:hidden">
          <EditIcon />
        </div>
        <div className="hidden sm:block">Latihan</div>
      </ChipNavigate>
    </HeaderNavigate>
  );
};

export default Navigator;
