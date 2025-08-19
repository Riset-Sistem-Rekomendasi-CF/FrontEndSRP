import React, { useState } from "react";
import FormControl from "@mui/material/FormControl";
import { Menu, MenuButton } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

export const DropdownMethodBased = React.memo(
  ({ onChange, turnDescription }) => {
    const [selectMetode, setSelectMetode] = useState("Pilih Metode");

    const handleChange = (method) => {
      setSelectMetode(method);
      onChange(method); // masih kirim ke parent
      if (turnDescription) turnDescription(false); // panggil di sini SAJA
    };

    return (
      <>
        <div className="font-poppins">
          <FormControl>
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <MenuButton className="outline outline-1 inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold font-poppins text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-white">
                  {selectMetode}
                  <ChevronDownIcon
                    aria-hidden="true"
                    className="-mr-1 h-5 w-5 text-gray-400"
                  />
                </MenuButton>
              </div>

              <Menu.Items
                transition
                className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              >
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => handleChange("User-Based")}
                        className={`block w-full text-left px-4 py-2 text-sm font-semibold  ${
                          active ? "bg-blue-300 text-gray-900" : "text-gray-700"
                        }`}
                      >
                        User-Based
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => handleChange("Item-Based")}
                        className={`block w-full text-left px-4 py-2 text-sm font-semibold ${
                          active ? "bg-blue-300 text-gray-900" : "text-gray-700"
                        }`}
                      >
                        Item-Based
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Menu>
          </FormControl>
        </div>
      </>
    );
  }
);

export const DropdownSimilarityMeasure = React.memo(
  ({ onChange, turnDescription }) => {
    const [selectSimilarity, setSelectSimilarity] = useState(
      "Pilih Fungsi Similaritas"
    );

    const handleChange = (method) => {
      setSelectSimilarity(method);
      onChange(method);
      if (turnDescription) turnDescription(false);
    };

    return (
      <FormControl className="font-poppins">
        <Menu as="div" className="relative  inline-block text-left ">
          <div>
            <MenuButton className=" outline outline-1 inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold font-poppins text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-white">
              {selectSimilarity}
              <ChevronDownIcon
                aria-hidden="true"
                className="-mr-1 h-5 w-5 text-gray-400"
              />
            </MenuButton>
          </div>

          <Menu.Items
            transition
            className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
          >
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() =>
                      handleChange("Pearson Correlation Coefficient")
                    }
                    className={`block w-full text-left px-4 py-2 text-sm font-semibold ${
                      active ? "bg-blue-300 text-gray-900" : "text-gray-700"
                    }`}
                  >
                    Pearson Correlation Coefficient
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => handleChange("Cosine")}
                    className={`block w-full text-left px-4 py-2 text-sm font-semibold ${
                      active ? "bg-blue-300 text-gray-900" : "text-gray-700"
                    }`}
                  >
                    Cosine
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => handleChange("Adjusted Cosine")}
                    className={`block w-full text-left px-4 py-2 text-sm  font-semibold ${
                      active ? "bg-blue-300 text-gray-900" : "text-gray-700"
                    }`}
                  >
                    Adjusted Cosine
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => handleChange("Bhattacharyya Coefficient")}
                    className={`block w-full text-left px-4 py-2 text-sm  font-semibold ${
                      active ? "bg-blue-300 text-gray-900" : "text-gray-700"
                    }`}
                  >
                    Bhattacharyya Coefficient
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Menu>
      </FormControl>
    );
  }
);
