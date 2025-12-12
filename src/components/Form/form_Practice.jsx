import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

export const DropdownMethodBased = React.memo(
  ({ onChange, turnDescription }) => {
    const [selectMetode, setSelectMetode] = useState("Pilih Metode");
    const [isOpen, setIsOpen] = useState(false);
    const [dropdownStyle, setDropdownStyle] = useState({});
    const buttonRef = useRef(null);

    const updateDropdownPosition = () => {
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        setDropdownStyle({
          position: "fixed",
          top: rect.bottom + 8,
          left: rect.left,
          width: rect.width > 224 ? rect.width : 224,
          zIndex: 9999,
        });
      }
    };

    useEffect(() => {
      if (isOpen) {
        updateDropdownPosition();
        window.addEventListener("scroll", updateDropdownPosition, true);
        window.addEventListener("resize", updateDropdownPosition);
        return () => {
          window.removeEventListener("scroll", updateDropdownPosition, true);
          window.removeEventListener("resize", updateDropdownPosition);
        };
      }
    }, [isOpen]);

    const handleToggle = () => {
      if (!isOpen) {
        updateDropdownPosition();
      }
      setIsOpen(!isOpen);
    };

    const handleChange = (method) => {
      setSelectMetode(method);
      setIsOpen(false);
      onChange(method);
      if (turnDescription) turnDescription(false);
    };

    const dropdownMenu = isOpen
      ? createPortal(
          <>
            {/* Backdrop untuk menutup dropdown saat klik di luar */}
            <div
              className="fixed inset-0"
              style={{ zIndex: 9998 }}
              onClick={() => setIsOpen(false)}
            />
            {/* Dropdown Menu */}
            <div
              style={dropdownStyle}
              className="rounded-md bg-white dark:bg-gray-700 shadow-lg ring-1 ring-black ring-opacity-5 dark:ring-gray-600"
            >
              <div className="py-1">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleChange("User-Based");
                  }}
                  className="block w-full text-left px-4 py-3 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-blue-300 dark:hover:bg-blue-600 hover:text-gray-900 dark:hover:text-white active:bg-blue-400 cursor-pointer"
                >
                  User-Based
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleChange("Item-Based");
                  }}
                  className="block w-full text-left px-4 py-3 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-blue-300 dark:hover:bg-blue-600 hover:text-gray-900 dark:hover:text-white active:bg-blue-400 cursor-pointer"
                >
                  Item-Based
                </button>
              </div>
            </div>
          </>,
          document.body
        )
      : null;

    return (
      <div className="font-poppins w-full sm:w-auto relative">
        <button
          ref={buttonRef}
          type="button"
          onClick={handleToggle}
          className="outline outline-1 inline-flex w-full justify-between sm:justify-center gap-x-1.5 rounded-md bg-white dark:bg-gray-700 px-4 py-3 text-sm font-semibold font-poppins text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 active:bg-gray-100 dark:active:bg-gray-500 transition-colors duration-200"
        >
          {selectMetode}
          <ChevronDownIcon
            aria-hidden="true"
            className={`-mr-1 h-5 w-5 text-gray-400 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>
        {dropdownMenu}
      </div>
    );
  }
);

export const DropdownSimilarityMeasure = React.memo(
  ({ onChange, turnDescription }) => {
    const [selectSimilarity, setSelectSimilarity] = useState(
      "Pilih Fungsi Similaritas"
    );
    const [isOpen, setIsOpen] = useState(false);
    const [dropdownStyle, setDropdownStyle] = useState({});
    const buttonRef = useRef(null);

    const similarityOptions = [
      "Pearson Correlation Coefficient",
      "Cosine",
      "Adjusted Cosine",
      "Bhattacharyya Coefficient",
    ];

    const updateDropdownPosition = () => {
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        setDropdownStyle({
          position: "fixed",
          top: rect.bottom + 8,
          left: rect.left,
          width: rect.width > 288 ? rect.width : 288,
          zIndex: 9999,
        });
      }
    };

    useEffect(() => {
      if (isOpen) {
        updateDropdownPosition();
        window.addEventListener("scroll", updateDropdownPosition, true);
        window.addEventListener("resize", updateDropdownPosition);
        return () => {
          window.removeEventListener("scroll", updateDropdownPosition, true);
          window.removeEventListener("resize", updateDropdownPosition);
        };
      }
    }, [isOpen]);

    const handleToggle = () => {
      if (!isOpen) {
        updateDropdownPosition();
      }
      setIsOpen(!isOpen);
    };

    const handleChange = (method) => {
      setSelectSimilarity(method);
      setIsOpen(false);
      onChange(method);
      if (turnDescription) turnDescription(false);
    };

    const dropdownMenu = isOpen
      ? createPortal(
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0"
              style={{ zIndex: 9998 }}
              onClick={() => setIsOpen(false)}
            />
            {/* Dropdown Menu */}
            <div
              style={dropdownStyle}
              className="rounded-md bg-white dark:bg-gray-700 shadow-lg ring-1 ring-black ring-opacity-5 dark:ring-gray-600 max-h-60 overflow-y-auto"
            >
              <div className="py-1">
                {similarityOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleChange(option);
                    }}
                    className="block w-full text-left px-4 py-3 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-blue-300 dark:hover:bg-blue-600 hover:text-gray-900 dark:hover:text-white active:bg-blue-400 cursor-pointer"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </>,
          document.body
        )
      : null;

    return (
      <div className="font-poppins w-full sm:w-auto relative">
        <button
          ref={buttonRef}
          type="button"
          onClick={handleToggle}
          className="outline outline-1 inline-flex w-full justify-between sm:justify-center gap-x-1.5 rounded-md bg-white dark:bg-gray-700 px-4 py-3 text-sm font-semibold font-poppins text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 active:bg-gray-100 dark:active:bg-gray-500 transition-colors duration-200"
        >
          {selectSimilarity}
          <ChevronDownIcon
            aria-hidden="true"
            className={`-mr-1 h-5 w-5 text-gray-400 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>
        {dropdownMenu}
      </div>
    );
  }
);
