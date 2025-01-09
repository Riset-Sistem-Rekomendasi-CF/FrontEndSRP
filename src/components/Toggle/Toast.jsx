import React, { useState, useEffect } from "react";
import KoalaPage from "../../assets/icons/KoalaPage.png";

const Toast = ({ message, type, onClose }) => {
  const toastClasses = {
    success: "bg-blue-home text-white",
  };

  useEffect(() => {
    // Menutup toast setelah 4 detik
    const timer = setTimeout(() => {
      onClose();
    }, 4000); // 4 detik
    return () => clearTimeout(timer); // Clear timeout jika komponen di-unmount
  }, [onClose]);

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
      <div
        className={` max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl w-full px-2 py-4 mb-4 text-sm rounded-lg ${toastClasses[type]} shadow-lg transition-opacity duration-300 opacity-100`}
      >
        <div className="flex items-center">
          <img
            src={KoalaPage}
            alt="Icon"
            className="w-10 h-10 object-cover rounded-full mr-3"
          />
          <p className="font-poppins font-semibold text-md">{message}</p>
          <button
            onClick={onClose}
            className="ml-3 text-black focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Toast;
