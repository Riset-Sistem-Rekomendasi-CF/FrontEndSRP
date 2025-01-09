// src/App.js

import React from "react";
import { useState } from "react";

function TabelView() {
  const data = [
    ["1", "5", "?", "4", "3", "5", "4"],
    ["2", "4", "5", "?", "3", "2", "3"],
    ["3", "?", "3", "?", "2", "1", "?"],
    ["4", "1", "2", "2", "?", "3", "4"],
    ["5", "1", "?", "1", "2", "3", "3"],
  ];

  const headers = ["U/I", "1", "2", "3", "4", "5", "6"];

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

  return (
    <div className="flex flex-col items-center justify-center p-4">
      {/* Contain the table in a scrollable wrapper */}
      <div className="overflow-x-auto w-full">
        <table className="min-w-full border-collapse border border-black">
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th
                  key={index}
                  className="border border-black px-4 py-2 bg-blue-home text-white"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, colIndex) => {
                  // Menentukan kelas berdasarkan nilai sel
                  const isFirstColumn = colIndex === 0; // Mengecek apakah kolom pertama
                  const cellClass =
                    cell === "?" || cell === ""
                      ? "border border-black px-4 py-2 text-center bg-red-300"
                      : `border border-black px-4 py-2 text-center ${
                          isFirstColumn ? "bg-blue-200" : ""
                        }`; // Warnai kolom pertama

                  return (
                    <td key={colIndex} className={cellClass}>
                      {cell}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Keterangan Section */}
      <div className="mt-6 text-left w-full font-poppins">
        <p className="font-bold text-xl ">Keterangan:</p>
        <ul className="flex flex-col sm:flex-row space-x-0 sm:space-x-4 sm:space-y-0 space-y-4">
          <li className="flex items-center">
            <div className="w-10 h-5 bg-red-300 border border-1 border-black mr-2 flex items-center justify-center text-black">
              ?
            </div>
            <p>
              Data <i>sparsity</i>{" "}
              <span
                className="p-1 bg-red-200 rounded-md font-bold curosr-pointer hover:bg-red-300 hover:text-black hover:underline "
                onClick={handleOpenModalSparsity}
              >
                23.33%
              </span>
            </p>
          </li>
          <li className="flex items-center">
            <div className="w-10 h-5 bg-blue-200 border border-1 border-black mr-2"></div>
            Index <i className="ml-1">User</i>
          </li>
          <li className="flex items-center">
            <div className="w-10 h-5 bg-blue-home border border-1 border-black mr-2"></div>
            Index <i className="ml-1">Item</i>
          </li>
        </ul>
      </div>

      {/* Modal Sparsity */}
      {isModalSparsityOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
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
    </div>
  );
}

export default TabelView;
