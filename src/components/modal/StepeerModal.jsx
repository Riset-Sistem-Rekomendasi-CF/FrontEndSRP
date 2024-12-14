import React, { useState } from "react";

import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import CloseIcon from "@mui/icons-material/Close";

const StepperModal = ({ isOpen, onClose, stepsContent }) => {
  const [currentStep, setCurrentStep] = useState(0); // Menyimpan langkah saat ini
  const [isChecked, setIsChecked] = useState(false); // Untuk checkbox "Anda sudah mengerti"

  // Fungsi untuk berpindah ke langkah selanjutnya
  const nextStep = () => {
    if (currentStep < stepsContent.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  // Fungsi untuk kembali ke langkah sebelumnya
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Fungsi untuk menangani perubahan checkbox
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg w-full sm:max-w-3xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl max-h-screen relative">
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
            >
              <CloseIcon className="text-2xl" />
            </button>

            {/* Stepper Navigation (Indicator with Line) */}
            <div className="flex items-center justify-center mb-6 relative">
              {stepsContent.map((_, index) => (
                <div key={index} className="flex items-center">
                  {/* Step Number Circle */}
                  <div
                    className={`w-12 h-12 flex items-center justify-center rounded-full text-white 
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

                  {/* Garis penghubung antar langkah */}
                  {index < stepsContent.length - 1 && (
                    <div
                      className={`h-1 flex-1 mx-2
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
            <div className="text-center overflow-y-auto max-h-[60vh] sm:max-h-[70vh] md:max-h-[80vh] lg:max-h-[90vh]">
              {" "}
              {/* Responsif scroll */}
              <h2 className="text-2xl font-semibold mb-4">
                {stepsContent[currentStep].title}
              </h2>
              <div className="text-gray-600 mb-6">
                <p>{stepsContent[currentStep].content}</p>
              </div>
              {/* Checkbox for last step */}
              {currentStep === stepsContent.length - 1 && (
                <div className="flex items-center justify-center mb-6">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={handleCheckboxChange}
                      className="form-checkbox h-5 w-5 text-blue-500"
                    />
                    <span className="text-sm">Saya sudah mengerti</span>
                  </label>
                </div>
              )}
              {/* Stepper Navigation Buttons */}
              <div className="flex justify-between items-center">
                {currentStep > 0 && (
                  <button
                    onClick={prevStep}
                    className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400"
                  >
                    Previous
                  </button>
                )}

                {/* Conditionally align Next button to the right */}
                <div className={`${currentStep === 0 ? "ml-auto" : ""}`}>
                  {currentStep === stepsContent.length - 1 && isChecked ? (
                    <button
                      onClick={onClose}
                      className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                    >
                      Finish
                    </button>
                  ) : (
                    <button
                      onClick={nextStep}
                      disabled={
                        currentStep === stepsContent.length - 1 && !isChecked
                      }
                      className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:opacity-50"
                    >
                      Next
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StepperModal;
export const StepRow = () => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center mt-6 space-y-4 sm:space-x-4 sm:space-y-0 text-lg font-medium">
      {/* Langkah 1 */}
      <div className="flex items-center space-x-2">
        <span className="px-2 py-1 bg-blue-100 rounded-md text-blue-600 font-semibold">
          1.
        </span>
        <span>Membuat Tabel Data Rating</span>
      </div>

      {/* Panah Icon */}
      <KeyboardArrowRightIcon className="text-blue-600" />

      {/* Langkah 2 */}
      <div className="flex items-center space-x-2">
        <span className="px-2 py-1 bg-blue-100 rounded-md text-blue-600 font-semibold">
          2.
        </span>
        <span>Melihat Notasi dan Penjelasan</span>
      </div>

      {/* Panah Icon */}
      <KeyboardArrowRightIcon className="text-blue-600" />

      {/* Langkah 3 */}
      <div className="flex items-center space-x-2">
        <span className="px-2 py-1 bg-blue-100 rounded-md text-blue-600 font-semibold">
          3.
        </span>
        <span>Memilih Metode yang Digunakan</span>
      </div>
    </div>
  );
};
