import { useState } from "react";
import AdjustIcon from "@mui/icons-material/Adjust";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocationOffIcon from "@mui/icons-material/LocationOff";
import PanoramaFishEyeIcon from "@mui/icons-material/PanoramaFishEye";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

export const KeteranganScatterPlotFilter = ({ opsional }) => {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    setOpen((prev) => !prev);
  };

  return (
    <div className="mt-6 mx-auto w-full max-w-full px-4 font-poppins text-justify">
      <button
        onClick={toggleOpen}
        className="flex items-start text-start font-semibold font-poppins text-white mt-2 focus:outline-none text-sm sm:text-base bg-purple-btn-primary p-2 rounded-md shadow-sm"
      >
        Keterangan
        {open ? (
          <ExpandLessIcon className="ml-2" />
        ) : (
          <ExpandMoreIcon className="ml-2" />
        )}
      </button>

      {open && (
        <ul className="flex flex-col sm:flex-row sm:flex-wrap gap-4 justify-center px-4">
          <li className="flex items-center text-sm sm:text-base border border-gray-300 rounded-md p-2 bg-white shadow-sm">
            <AdjustIcon className="text-black mr-2" />
            <span>{opsional === "user-based" ? "User" : "Item"} target</span>
          </li>

          <li className="flex items-center text-sm sm:text-base border border-gray-300 rounded-md p-2 bg-white shadow-sm">
            <LocationOnIcon className="text-green-800 mr-2" />
            <span>Tetangga yang terpilih</span>
          </li>

          <li className="flex items-center text-sm sm:text-base border border-gray-300 rounded-md p-2 bg-white shadow-sm">
            <PanoramaFishEyeIcon className="text-green-700 mr-2" />
            <span>
              Himpunan {opsional === "user-based" ? "user" : "item"} yang
              terpilih sebagai tetangga
            </span>
          </li>

          <li className="flex items-center text-sm sm:text-base border border-gray-300 rounded-md p-2 bg-white shadow-sm">
            <LocationOffIcon className="text-red-500 mr-2" />
            <span>Tetangga yang tidak terpilih</span>
          </li>

          <li className="flex items-center text-sm sm:text-base border border-gray-300 rounded-md p-2 bg-white shadow-sm">
            <PanoramaFishEyeIcon className="text-red-500 mr-2" />
            <span>
              Himpunan {opsional === "user-based" ? "user" : "item"} yang tidak
              terpilih sebagai tetangga
            </span>
          </li>
        </ul>
      )}
    </div>
  );
};
