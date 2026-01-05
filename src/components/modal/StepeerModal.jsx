import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import CloseIcon from "@mui/icons-material/Close";

const StepperModal = ({ isOpen, onClose, stepsContent }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isChecked, setIsChecked] = useState(false);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const nextStep = () => {
    if (currentStep < stepsContent.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  if (!isOpen) return null;

  const modalContent = (
    <div
      className="fixed top-0 left-0 right-0 bottom-0 w-screen h-screen bg-black/50 backdrop-blur-sm flex justify-center items-center p-4"
      style={{ zIndex: 9999 }}
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-800 p-4 sm:p-6 md:p-8 rounded-lg shadow-xl w-full max-w-[90vw] sm:max-w-lg md:max-w-xl lg:max-w-2xl max-h-[85vh] relative flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-1.5 sm:p-2 rounded-full bg-red-300 text-gray-600 hover:text-gray-900 z-10"
        >
          <CloseIcon className="text-xl sm:text-2xl" />
        </button>

        {/* Stepper Navigation (Indicator with Line) */}
        <div className="flex items-center justify-center mb-4 sm:mb-6 pt-2">
          {stepsContent.map((_, index) => (
            <div key={index} className="flex items-center">
              <div
                className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full text-white text-sm sm:text-base
                  ${
                    currentStep > index
                      ? "bg-green-500"
                      : currentStep === index
                      ? "bg-blue-500"
                      : "bg-gray-300"
                  }
                  transition-colors duration-300`}
              >
                {index + 1}
              </div>
              {index < stepsContent.length - 1 && (
                <div
                  className={`h-1 w-4 sm:w-6 md:w-8 mx-1 sm:mx-2
                    ${
                      currentStep > index
                        ? "bg-green-500"
                        : currentStep === index
                        ? "bg-blue-500"
                        : "bg-gray-300"
                    } 
                    transition-all duration-300`}
                ></div>
              )}
            </div>
          ))}
        </div>

        {/* Stepper Content */}
        <div className="text-center overflow-y-auto flex-1 min-h-0 px-1 sm:px-2">
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-3 sm:mb-4 dark:text-white">
            {stepsContent[currentStep].title}
          </h2>
          <div className="text-gray-600 dark:text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base">
            <p>{stepsContent[currentStep].content}</p>
          </div>
        </div>

        {/* Footer - Checkbox and Navigation Buttons */}
        <div className="pt-4 border-t border-gray-200 dark:border-gray-600 mt-auto">
          {currentStep === stepsContent.length - 1 && (
            <div className="flex items-center justify-center mb-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                  className="form-checkbox h-4 w-4 sm:h-5 sm:w-5 text-blue-500"
                />
                <span className="text-xs sm:text-sm dark:text-gray-300">
                  Saya sudah mengerti
                </span>
              </label>
            </div>
          )}

          <div className="flex justify-between items-center">
            {currentStep > 0 && (
              <button
                onClick={prevStep}
                className="bg-gray-300 text-gray-700 py-1.5 px-3 sm:py-2 sm:px-4 rounded-md hover:bg-gray-400 text-sm sm:text-base"
              >
                Previous
              </button>
            )}

            <div className={`${currentStep === 0 ? "ml-auto" : ""}`}>
              {currentStep === stepsContent.length - 1 && isChecked ? (
                <button
                  onClick={onClose}
                  className="bg-blue-500 text-white py-1.5 px-3 sm:py-2 sm:px-4 rounded-md hover:bg-blue-600 text-sm sm:text-base"
                >
                  Finish
                </button>
              ) : (
                <button
                  onClick={nextStep}
                  disabled={
                    currentStep === stepsContent.length - 1 && !isChecked
                  }
                  className="bg-blue-500 text-white py-1.5 px-3 sm:py-2 sm:px-4 rounded-md hover:bg-blue-600 disabled:opacity-50 text-sm sm:text-base"
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default StepperModal;

export const StepRow = () => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center mt-6 space-y-4 sm:space-x-4 sm:space-y-0 text-lg font-medium">
      <div className="flex items-center space-x-2">
        <span className="px-2 py-1 bg-blue-100 rounded-md text-blue-600 font-semibold">
          1.
        </span>
        <span>Membuat Tabel Data Rating</span>
      </div>

      <KeyboardArrowRightIcon className="text-blue-600" />

      <div className="flex items-center space-x-2">
        <span className="px-2 py-1 bg-blue-100 rounded-md text-blue-600 font-semibold">
          2.
        </span>
        <span>Melihat Notasi dan Penjelasan</span>
      </div>

      <KeyboardArrowRightIcon className="text-blue-600" />

      <div className="flex items-center space-x-2">
        <span className="px-2 py-1 bg-blue-100 rounded-md text-blue-600 font-semibold">
          3.
        </span>
        <span>Memilih Metode yang Digunakan</span>
      </div>
    </div>
  );
};
