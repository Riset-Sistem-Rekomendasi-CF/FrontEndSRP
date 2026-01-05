import React, { useState } from "react";
import ReplayIcon from "@mui/icons-material/Replay";
import { staticRatingData, staticTableHeaders } from "../../data";

function TabelViewDataStatis() {
  const [animationKey, setAnimationKey] = useState(0); // State to trigger animation restart

  const data = staticRatingData;
  const headersData = staticTableHeaders;
  const m = headersData.length - 1; // Number of items (excluding U/I)
  const n = data.length; // Number of users

  const [showModal, setShowModal] = useState(false);
  const [selectedData, setSelectedData] = useState({
    user: null,
    itemIndex: null,
    value: null,
  });

  const handleCellClick = (userIndex, itemIndex, value) => {
    setSelectedData({
      user: userIndex + 1,
      itemIndex: itemIndex,
      value: value,
    }); // Set nilai cell yang diklik
    setShowModal(true); // Tampilkan modal
  };

  const closeModal = () => {
    setShowModal(false); // Tutup modal
    setSelectedData({ user: null, itemIndex: null, value: null }); // Reset nilai yang dipilih
  };

  const restartAnimation = () => {
    setAnimationKey((prevKey) => prevKey + 1); // Increment key to restart animation
  };

  return (
    <div className="flex flex-col mb-5">
      <button
        onClick={restartAnimation}
        className="mb-5 p-2 bg-blue-500 text-white rounded items-center"
      >
        <ReplayIcon /> Ulangi Animasi
      </button>
      <h1 className="font-poppins text-center items-center">
        Matriks data rating dibentuk berdasarkan data rating
      </h1>
      <p className="font-poppins text-center">
        Catatan : Data rating yang tidak diketahui{" "}
        <span className={"font-semibold text-red-600 "}>direpresentasikan</span>{" "}
        dengan nilai <span className="italic">rating</span> 0{" "}
      </p>
      <h1 className="font-bold font-poppins my-5 text-center">
        MATRIKS RATING
      </h1>
      <table className="min-w-full border-collapse border border-black">
        <thead>
          <tr key={animationKey}>
            {headersData.map((header, index) => (
              <th
                key={index}
                className="border border-black px-4 py-2 bg-yellow-btn-primary table-header"
                style={{ animationDelay: `${index * 0.2}s` }} // Delay based on index
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
                const isFirstColumn = colIndex === 0;
                const cellClass =
                  cell === "0" || cell === ""
                    ? "border border-black px-4 py-2 text-center bg-red-500 table-cell"
                    : `border border-black px-4 py-2 text-center table-cell ${
                        isFirstColumn
                          ? "bg-blue-200"
                          : "hover:bg-yellow-200 hover:border-yellow-500 cursor-pointer"
                      }`;

                return (
                  <td
                    key={colIndex}
                    className={cellClass}
                    onClick={
                      !isFirstColumn
                        ? () => handleCellClick(rowIndex, colIndex, cell)
                        : null
                    } // Handle only first column clicks
                    style={{
                      animationDelay: `${
                        headersData.length * 0.2 +
                        rowIndex * 0.1 +
                        colIndex * 0.05
                      }s`,
                    }}
                  >
                    {cell}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      {/*show modal*/}
      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg font-poppins">
            <h2 className="text-lg font-semibold mb-4">
              Detail Data Rating r<sub className={"italic"}>ui</sub>
            </h2>
            <p className="mb-2 font-semibold text-md text-black">
              r
              <sub className={"italic"}>
                {selectedData.user}
                {headersData[selectedData.itemIndex]}
              </sub>{" "}
              = {selectedData.value}
            </p>
            <p className="my-2 font-medium text-md text-black">
              User {selectedData.user}, Item{" "}
              {headersData[selectedData.itemIndex]} = {selectedData.value}
            </p>

            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
              onClick={closeModal}
            >
              Tutup
            </button>
          </div>
        </div>
      )}
      <div>
        <h3 className="text-lg font-semibold my-2">
          Informasi Data Rating Matrix
        </h3>
        <h3 className="text-md font-semibold mb-2">
          Matrix data rating dibentuk berdasarkan data rating.
        </h3>

        <div className="flex items-start justify-start space-x-6">
          {/* Left Column */}
          <div className="w-1/2   space-y-2">
            <p>
              <strong>n</strong>: {n}
            </p>
            <p>
              <strong>m</strong>: {m}
            </p>
          </div>

          {/* Right Column */}
          <div className="w-1/2 space-y-2">
            <div className="flex justify-between">
              <div className="w-1/2">
                <p>
                  <strong className="italic">I</strong>
                  <sub>13</sub>: {"{ 4,3,5 }"}
                </p>
              </div>
              <div className="w-1/2">
                <p>
                  <strong className="italic">U</strong>
                  <sub>11</sub>: 5
                </p>
                <p>
                  <strong className="italic">U</strong>
                  <sub>13</sub>: 4
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TabelViewDataStatis;
