// components/Navbar/StepperTutorialButton.jsx
import { useState, useEffect } from "react";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";

import StepperModal from "../../modal/StepeerModal";
import { StepperData } from "./StepperData";

const StepperTutorialButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisited");
    if (!hasVisited) {
      setIsModalOpen(true);
      localStorage.setItem("hasVisited", "true");
    }
  }, []);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="flex items-center bg-card_yellow_primary text-white text-sm font-semibold px-3 py-1.5 rounded-md shadow hover:bg-yellow-500 whitespace-nowrap"
      >
        Panduan
        <PlayCircleFilledWhiteIcon className="ml-2 text-base" />
      </button>

      <StepperModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        stepsContent={StepperData}
      />
    </>
  );
};

export default StepperTutorialButton;
