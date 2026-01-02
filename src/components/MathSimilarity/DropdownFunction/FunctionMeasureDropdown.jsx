import React, { useState } from "react";
import MathJaxComponent from "../../../MathJaxComponent";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

export function FunctionMeasureDropdown({
  DetailRumus,
  title = "Keterangan Rumus",
}) {
  const [isOpen, setIsOpen] = useState(true);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="px-2 sm:px-3 md:px-5 w-full">
      {/* Tombol Keterangan */}
      <button
        onClick={toggleDropdown}
        className="flex items-start text-start font-semibold font-poppins text-white mt-2 focus:outline-none text-sm sm:text-base bg-purple-btn-primary p-2 rounded-md shadow-sm"
      >
        {title}
        {isOpen ? (
          <ExpandLessIcon className="ml-2" />
        ) : (
          <ExpandMoreIcon className="ml-2" />
        )}
      </button>

      {/* Konten Dropdown */}
      {isOpen && (
        <div className="w-full overflow-x-auto sm:overflow-x-visible mt-4 text-black">
          {DetailRumus.map((math, index) => (
            <div
              key={index}
              className="text-xs sm:text-sm md:text-base leading-relaxed mb-4 text-left"
            >
              <div className="keterangan-rumus text-[0.75rem] sm:text-sm md:text-base leading-[1.4] *:leading-relaxed">
                <MathJaxComponent>{math}</MathJaxComponent>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
