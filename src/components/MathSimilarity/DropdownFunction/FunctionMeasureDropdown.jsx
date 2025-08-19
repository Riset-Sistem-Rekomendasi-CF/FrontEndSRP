import React, { useState } from "react";
import MathJaxComponent from "../../../MathJaxComponent";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

export function FunctionMeasureDropdown({ DetailRumus }) {
  const [isOpen, setIsOpen] = useState(true);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="px-4 sm:px-6 md:px-10 w-full">
      {/* Tombol Keterangan */}
      <button
        onClick={toggleDropdown}
        className="flex items-center text-start font-semibold font-poppins text-red-500 mt-4 focus:outline-none text-sm sm:text-base"
      >
        Keterangan
        {isOpen ? (
          <ExpandLessIcon className="ml-2" />
        ) : (
          <ExpandMoreIcon className="ml-2" />
        )}
      </button>

      {/* Konten Dropdown */}
      {isOpen && (
        <div className="w-full overflow-x-auto sm:overflow-x-visible">
          {DetailRumus.map((math, index) => (
            <div
              key={index}
              className="text-xs sm:text-sm md:text-base leading-relaxed mb-4 text-center sm:text-left"
            >
              <MathJaxComponent>{math}</MathJaxComponent>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
