// src/App.js

import React from "react";
import { useState } from "react";
import SwitchToggle from "../Toggle/SwitchToggle";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import OnlyTabel from "./OnlyTabel";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

const TabelView = ({ changeFunny, headers, columns }) => {
  const data = [
    ["5", "?", "4", "3", "5", "4"],
    ["4", "5", "?", "3", "2", "3"],
    ["?", "3", "?", "2", "1", "?"],
    ["1", "2", "2", "?", "3", "4"],
    ["1", "?", "1", "2", "3", "3"],
  ];

  const numerator = 7;
  const denominator = 30;
  const percentage = ((numerator / denominator) * 100).toFixed(2);

  // modal sparsity
  const [isModalSparsityOpen, setIsModalSparsityOpen] = useState(false);

  // open modal sparsity
  const handleOpenModalSparsity = () => {
    setIsModalSparsityOpen(true);
  };

  // close modal sparsity
  const handleCloseModalSparsity = () => {
    setIsModalSparsityOpen(false);
  };

  // modal full page
  const [isFullPageOpen, setIsFullPageOpen] = useState(false);

  const handleOpenFullPageModal = () => {
    setIsFullPageOpen(true);
  };

  const handleCloseFullPageModal = () => {
    setIsFullPageOpen(false);
  };

  return (
    <div className="bg-yellow-100 p-2 m-2 rounded-md shadow-sm">
      <div className="flex flex-col items-center justify-center p-4">
        <div className="flex items-center justify-between w-full">
          <SwitchToggle title={"Funny Mode"} changeToggle={changeFunny} />

          <div className="border border-black bg-green-200 rounded-md shadow-md hover:bg-green-500 transition-colors flex items-center px-3">
            <FullscreenIcon className="text-gray-600 inline-block mr-2" />
            <button
              className="p-1 font-semibold"
              onClick={handleOpenFullPageModal}
            >
              Full Page
            </button>
          </div>
        </div>
        <OnlyTabel headers={headers} columns={columns} data={data} />
        {/* <div className=" bg-blue-200 rounded-md shadow-sm border border-black p-2 flex justify-between mt-2 mb-2 hover:bg-blue-600 transition-colors">
          <p className="font-poppins font-semibold">Animasi Tabel Rating</p>
          <PlayArrowIcon className="text-gray-600 inline-block mr-2" />
        </div> */}

        {/* Keterangan Section */}
        <div className="mt-6 text-left w-full font-poppins">
          <p className="font-bold text-xl ">Keterangan:</p>
          <ul className="flex flex-col sm:flex-row space-x-0 sm:space-x-4 sm:space-y-0 space-y-4">
            <li className="flex items-center">
              <div className="w-10 h-5 bg-red-300 border border-1 border-black mr-2 flex items-center justify-center text-black">
                ?
              </div>
              <p>
                Data Sparsity
                <span
                  className="ml-2 p-1 bg-red-200 rounded-md font-bold curosr-pointer hover:bg-red-300 hover:text-black hover:underline "
                  onClick={handleOpenModalSparsity}
                >
                  23.33%
                </span>
              </p>
            </li>
            <li className="flex items-center">
              <div className="w-10 h-5 bg-blue-200 border border-1 border-black mr-2"></div>
              Index User
            </li>
            <li className="flex items-center">
              <div className="w-10 h-5 bg-blue-home border border-1 border-black mr-2"></div>
              Index Item
            </li>
          </ul>
        </div>

        {/* Modal Sparsity */}
        {isModalSparsityOpen && (
          <div className="p-5 fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
                Rumus untuk Mencari Persentase Sparsity
              </h2>
              <p className="text-blue-home mb-4 font-bold">
                (Jumlah Data yang belum di Rating / Total Data Rating) * 100 %{" "}
              </p>
              <div className="flex justify-center items-center bg-gray-100 p-4 rounded-lg border border-gray-200">
                <p className="text-xl font-semibold text-gray-800">
                  {numerator} / {denominator} = {percentage}%
                </p>
              </div>
              <button
                onClick={handleCloseModalSparsity}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md"
              >
                Tutup
              </button>
            </div>
          </div>
        )}
        {/* Modal Full Page */}
        {isFullPageOpen && (
          <div className="p-5 fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-60 overflow-y-auto">
            <div className="bg-white max-w-6xl w-full max-h-[90vh] overflow-auto p-6 rounded-lg shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-blue-home">
                  Tabel Full Page Data Rating Yang Digunakan
                </h2>
                <button
                  onClick={handleCloseFullPageModal}
                  className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                >
                  Tutup
                </button>
              </div>
              <div>
                <SwitchToggle title={"Funny Mode"} changeToggle={changeFunny} />
              </div>
              <OnlyTabel headers={headers} columns={columns} data={data} />
              <div className="mt-6 text-left w-full font-poppins">
                <p className="font-bold text-xl ">Keterangan:</p>
                <ul className="flex flex-col sm:flex-row space-x-0 sm:space-x-4 sm:space-y-0 space-y-4">
                  <li className="flex items-center">
                    <div className="w-10 h-5 bg-red-300 border border-1 border-black mr-2 flex items-center justify-center text-black">
                      ?
                    </div>
                    <p>
                      Data Sparsity
                      <span className="p-1 bg-red-200 rounded-md font-bold curosr-pointer hover:bg-red-300 hover:text-black hover:underline ">
                        23.33%
                      </span>
                    </p>
                  </li>
                  <li className="flex items-center">
                    <div className="w-10 h-5 bg-blue-200 border border-1 border-black mr-2"></div>
                    Index User
                  </li>
                  <li className="flex items-center">
                    <div className="w-10 h-5 bg-blue-home border border-1 border-black mr-2"></div>
                    Index Item
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TabelView;
